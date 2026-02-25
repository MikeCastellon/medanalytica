-- ============================================================
-- CRIS GOLD™ / MedAnalytica — Full Database Setup
-- Paste this entire file into:
--   Supabase Dashboard → SQL Editor → New Query → Run
--
-- Safe to run multiple times (uses IF NOT EXISTS / OR REPLACE)
-- ============================================================

-- ── Extensions ─────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Doctor Profiles ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.doctor_profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     text,
  role          text DEFAULT 'Physician',
  clinic_name   text,
  initials      text,
  custom_rules  text,
  created_at    timestamptz DEFAULT now()
);
ALTER TABLE public.doctor_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "doctors_own_profile" ON public.doctor_profiles;
CREATE POLICY "doctors_own_profile" ON public.doctor_profiles
  FOR ALL USING (auth.uid() = id);

-- ── Patients ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.patients (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id   uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name  text NOT NULL,
  last_name   text NOT NULL,
  dob         date,
  gender      text,
  mrn         text,
  phone       text,
  email       text,
  notes       text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "doctors_own_patients" ON public.patients;
CREATE POLICY "doctors_own_patients" ON public.patients
  FOR ALL USING (auth.uid() = doctor_id);

-- ── Reports ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reports (
  id                        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id                uuid REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  doctor_id                 uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  report_type               text,
  collection_date           date,
  file_path                 text,
  file_name                 text,
  status                    text DEFAULT 'pending',
  cri_score                 numeric(4,1),
  hrq_ari                   numeric(5,2),
  hrq_eli                   numeric(5,2),
  hrq_quadrant              text,
  cv_quadrant               text,
  ai_summary                text,
  markers                   jsonb,
  raw_extraction            jsonb,
  -- Extended CRIS GOLD™ columns
  blood_pressure            text,
  pulse_pressure            text,
  chief_complaints          text,
  hrv_markers               jsonb,
  hrv_summary               text,
  polyvagal_rule_of_3       boolean,
  polyvagal_interpretation  text,
  adrenal_urine_drops       integer,
  adrenal_interpretation    text,
  tfi                       numeric(5,2),
  adrenal_summary           text,
  brain_gauge               jsonb,
  brain_gauge_summary       text,
  therapeutic_selections    jsonb,
  neurovizr_programs        jsonb,
  psychosomatic_findings    text,
  patient_friendly_summary  text,
  cri_category              text,
  overall_status            text,
  created_at                timestamptz DEFAULT now(),
  updated_at                timestamptz DEFAULT now()
);
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "doctors_own_reports" ON public.reports;
CREATE POLICY "doctors_own_reports" ON public.reports
  FOR ALL USING (auth.uid() = doctor_id);

-- ── Add any missing columns to existing tables ──────────────
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS blood_pressure text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS pulse_pressure text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS chief_complaints text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS hrv_markers jsonb;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS hrv_summary text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS polyvagal_rule_of_3 boolean;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS polyvagal_interpretation text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS adrenal_urine_drops integer;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS adrenal_interpretation text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tfi numeric(5,2);
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS adrenal_summary text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS brain_gauge jsonb;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS brain_gauge_summary text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS therapeutic_selections jsonb;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS neurovizr_programs jsonb;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS psychosomatic_findings text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS patient_friendly_summary text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS cri_category text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS overall_status text;

-- ── Storage Bucket ─────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
  VALUES ('reports', 'reports', false)
  ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS "doctor_report_uploads" ON storage.objects;
CREATE POLICY "doctor_report_uploads" ON storage.objects
  FOR ALL USING (
    bucket_id = 'reports' AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ── Auto-update timestamps ─────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN new.updated_at = now(); RETURN new; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS patients_updated_at ON public.patients;
CREATE TRIGGER patients_updated_at BEFORE UPDATE ON public.patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS reports_updated_at ON public.reports;
CREATE TRIGGER reports_updated_at BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── CRITICAL: Robust user creation trigger ─────────────────
-- Uses EXCEPTION handling so it NEVER blocks new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.doctor_profiles (id, full_name, initials)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Doctor'),
    COALESCE(NEW.raw_user_meta_data->>'initials', 'DR')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'handle_new_user skipped: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── Done ───────────────────────────────────────────────────
SELECT 'CRIS GOLD™ database setup complete ✓' AS status;
