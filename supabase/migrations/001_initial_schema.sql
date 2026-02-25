-- ============================================================
-- MedAnalytica — Initial Schema
-- Run this in your Supabase SQL Editor (Database > SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Patients ──────────────────────────────────────────────
create table if not exists patients (
  id          uuid primary key default uuid_generate_v4(),
  doctor_id   uuid references auth.users(id) on delete cascade not null,
  first_name  text not null,
  last_name   text not null,
  dob         date,
  gender      text,
  mrn         text unique,
  phone       text,
  email       text,
  notes       text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Reports ───────────────────────────────────────────────
create table if not exists reports (
  id              uuid primary key default uuid_generate_v4(),
  patient_id      uuid references patients(id) on delete cascade not null,
  doctor_id       uuid references auth.users(id) on delete cascade not null,
  report_type     text,                       -- e.g. 'HRV', 'CBC', 'Lipid Panel'
  collection_date date,
  file_path       text,                       -- Supabase Storage path
  file_name       text,
  status          text default 'pending',     -- pending | processing | complete | error
  -- AI-extracted results
  cri_score       numeric(4,1),               -- Cardiovascular Risk Index 0-12
  hrq_ari         numeric(5,2),               -- Autonomic Regulation Index
  hrq_eli         numeric(5,2),               -- Emotional Load Index
  hrq_quadrant    text,                       -- Q1 | Q2 | Q3 | Q4
  cv_quadrant     text,                       -- Q1 | Q2 | Q3 | Q4
  ai_summary      text,                       -- AI-generated clinical summary
  markers         jsonb,                      -- Array of extracted lab markers
  raw_extraction  jsonb,                      -- Full Claude response
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ── Doctor Profiles (extends auth.users) ──────────────────
create table if not exists doctor_profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  role          text default 'Physician',
  clinic_name   text,
  initials      text,
  -- Custom clinical rules stored as text (injected into AI prompt)
  custom_rules  text,
  created_at    timestamptz default now()
);

-- ── Row Level Security ─────────────────────────────────────
alter table patients       enable row level security;
alter table reports        enable row level security;
alter table doctor_profiles enable row level security;

-- Doctors can only see their own patients
create policy "doctors_own_patients" on patients
  for all using (auth.uid() = doctor_id);

-- Doctors can only see their own reports
create policy "doctors_own_reports" on reports
  for all using (auth.uid() = doctor_id);

-- Doctors can only see/edit their own profile
create policy "doctors_own_profile" on doctor_profiles
  for all using (auth.uid() = id);

-- ── Storage Bucket ─────────────────────────────────────────
-- Run this separately in Supabase Dashboard > Storage > New Bucket
-- Name: "reports" | Private bucket (not public)
-- Then add this policy via SQL:
insert into storage.buckets (id, name, public) values ('reports', 'reports', false)
  on conflict (id) do nothing;

create policy "doctor_report_uploads" on storage.objects
  for all using (
    bucket_id = 'reports' and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ── Auto-update timestamps ─────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger patients_updated_at before update on patients
  for each row execute function update_updated_at();
create trigger reports_updated_at  before update on reports
  for each row execute function update_updated_at();

-- ── Trigger: create doctor profile on signup ───────────────
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into doctor_profiles (id, full_name, initials)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Doctor'),
    coalesce(new.raw_user_meta_data->>'initials', 'DR')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
