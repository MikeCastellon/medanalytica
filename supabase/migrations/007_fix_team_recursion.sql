-- 007_fix_team_recursion.sql
-- Fix: "infinite recursion detected in policy for relation team_members"
--
-- Problem: team_member_view on "teams" queries team_members,
--          team_owner_manage_members on "team_members" queries teams → infinite loop.
--
-- Solution: Use a SECURITY DEFINER function to look up team membership
-- without triggering RLS on team_members, breaking the cycle.

-- Helper function that bypasses RLS to check team membership
CREATE OR REPLACE FUNCTION public.get_user_team_ids(uid uuid)
RETURNS SETOF uuid AS $$
  SELECT team_id FROM public.team_members WHERE user_id = uid;
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

-- Drop the recursive policy on teams and replace it
DROP POLICY IF EXISTS "team_member_view" ON public.teams;
CREATE POLICY "team_member_view" ON public.teams
  FOR SELECT USING (
    id IN (SELECT public.get_user_team_ids(auth.uid()))
  );

-- Also fix the team-aware patient/report policies that have the same pattern
DROP POLICY IF EXISTS "team_patients_read" ON public.patients;
CREATE POLICY "team_patients_read" ON public.patients
  FOR SELECT USING (
    doctor_id = auth.uid()
    OR doctor_id IN (
      SELECT tm.user_id FROM public.team_members tm
      WHERE tm.team_id IN (SELECT public.get_user_team_ids(auth.uid()))
    )
  );

DROP POLICY IF EXISTS "team_reports_read" ON public.reports;
CREATE POLICY "team_reports_read" ON public.reports
  FOR SELECT USING (
    doctor_id = auth.uid()
    OR doctor_id IN (
      SELECT tm.user_id FROM public.team_members tm
      WHERE tm.team_id IN (SELECT public.get_user_team_ids(auth.uid()))
    )
  );
