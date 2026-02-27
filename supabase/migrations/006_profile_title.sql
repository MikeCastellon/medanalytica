-- 006_profile_title.sql
-- Adds a professional title field to doctor_profiles (e.g. "Physician", "NP", "DO")

ALTER TABLE public.doctor_profiles
  ADD COLUMN IF NOT EXISTS title TEXT DEFAULT '';
