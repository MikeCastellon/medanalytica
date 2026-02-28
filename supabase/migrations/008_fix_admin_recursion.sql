-- 008_fix_admin_recursion.sql
-- Fix: "infinite recursion detected in policy for relation doctor_profiles"
--
-- Problem: admin policies on patients/reports/teams/team_members check
--   doctor_profiles.role = 'super_admin', but doctor_profiles has its own
--   RLS policies, causing circular evaluation.
--
-- Solution: Use a SECURITY DEFINER function to check admin status
-- without triggering RLS on doctor_profiles.

-- Helper: check if a user is super_admin (bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_super_admin(uid uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.doctor_profiles WHERE id = uid AND role = 'super_admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

-- ── Recreate all admin policies using the helper function ──

-- doctor_profiles
DROP POLICY IF EXISTS "admin_read_all_profiles" ON public.doctor_profiles;
CREATE POLICY "admin_read_all_profiles" ON public.doctor_profiles
  FOR SELECT USING (public.is_super_admin(auth.uid()));

DROP POLICY IF EXISTS "admin_update_all_profiles" ON public.doctor_profiles;
CREATE POLICY "admin_update_all_profiles" ON public.doctor_profiles
  FOR UPDATE USING (public.is_super_admin(auth.uid()));

DROP POLICY IF EXISTS "admin_insert_profiles" ON public.doctor_profiles;
CREATE POLICY "admin_insert_profiles" ON public.doctor_profiles
  FOR INSERT WITH CHECK (public.is_super_admin(auth.uid()));

-- patients
DROP POLICY IF EXISTS "admin_read_all_patients" ON public.patients;
CREATE POLICY "admin_read_all_patients" ON public.patients
  FOR SELECT USING (public.is_super_admin(auth.uid()));

-- reports
DROP POLICY IF EXISTS "admin_read_all_reports" ON public.reports;
CREATE POLICY "admin_read_all_reports" ON public.reports
  FOR SELECT USING (public.is_super_admin(auth.uid()));

-- teams
DROP POLICY IF EXISTS "admin_read_all_teams" ON public.teams;
CREATE POLICY "admin_read_all_teams" ON public.teams
  FOR SELECT USING (public.is_super_admin(auth.uid()));

-- team_members
DROP POLICY IF EXISTS "admin_read_all_team_members" ON public.team_members;
CREATE POLICY "admin_read_all_team_members" ON public.team_members
  FOR SELECT USING (public.is_super_admin(auth.uid()));
