-- 004_teams.sql
-- Teams schema for Clinic tier multi-practitioner support

-- Teams table (one per Clinic subscription)
CREATE TABLE IF NOT EXISTS public.teams (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        text NOT NULL,
  owner_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  max_members integer DEFAULT 5,
  created_at  timestamptz DEFAULT now()
);

-- Team members (practitioners within a clinic)
CREATE TABLE IF NOT EXISTS public.team_members (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id     uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role        text DEFAULT 'practitioner',  -- 'owner' | 'practitioner'
  invited_by  uuid REFERENCES auth.users(id),
  joined_at   timestamptz DEFAULT now(),
  UNIQUE(team_id, user_id)
);

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Team owner can manage their team
CREATE POLICY "team_owner_all" ON public.teams
  FOR ALL USING (auth.uid() = owner_id);

-- Team members can view their own team
CREATE POLICY "team_member_view" ON public.teams
  FOR SELECT USING (
    id IN (SELECT team_id FROM public.team_members WHERE user_id = auth.uid())
  );

-- Team owner manages members
CREATE POLICY "team_owner_manage_members" ON public.team_members
  FOR ALL USING (
    team_id IN (SELECT id FROM public.teams WHERE owner_id = auth.uid())
  );

-- Team members can view their own membership
CREATE POLICY "team_member_view_self" ON public.team_members
  FOR SELECT USING (user_id = auth.uid());

-- ── Team-aware patient/report read access ──
-- Allow team members to READ each other's patients
CREATE POLICY "team_patients_read" ON public.patients
  FOR SELECT USING (
    doctor_id = auth.uid()
    OR doctor_id IN (
      SELECT tm.user_id FROM public.team_members tm
      WHERE tm.team_id IN (
        SELECT tm2.team_id FROM public.team_members tm2 WHERE tm2.user_id = auth.uid()
      )
    )
  );

-- Allow team members to READ each other's reports
CREATE POLICY "team_reports_read" ON public.reports
  FOR SELECT USING (
    doctor_id = auth.uid()
    OR doctor_id IN (
      SELECT tm.user_id FROM public.team_members tm
      WHERE tm.team_id IN (
        SELECT tm2.team_id FROM public.team_members tm2 WHERE tm2.user_id = auth.uid()
      )
    )
  );

-- NOTE: The existing "doctors_own_patients" and "doctors_own_reports" policies
-- from 001_initial_schema.sql use FOR ALL. PostgreSQL RLS uses OR logic between
-- multiple policies for the same operation, so these team read policies will
-- extend access without breaking existing write behavior.
-- If you encounter issues, you may need to split the existing FOR ALL policies
-- into separate SELECT/INSERT/UPDATE/DELETE policies.
