-- 005_admin_policies.sql
-- Adds RLS policies so super_admin users can manage all data

-- Super admin can read ALL doctor_profiles
CREATE POLICY "admin_read_all_profiles" ON public.doctor_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      WHERE dp.id = auth.uid() AND dp.role = 'super_admin'
    )
  );

-- Super admin can update ALL doctor_profiles
CREATE POLICY "admin_update_all_profiles" ON public.doctor_profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      WHERE dp.id = auth.uid() AND dp.role = 'super_admin'
    )
  );

-- Super admin can insert doctor_profiles (create users)
CREATE POLICY "admin_insert_profiles" ON public.doctor_profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      WHERE dp.id = auth.uid() AND dp.role = 'super_admin'
    )
  );

-- Super admin can read ALL patients
CREATE POLICY "admin_read_all_patients" ON public.patients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      WHERE dp.id = auth.uid() AND dp.role = 'super_admin'
    )
  );

-- Super admin can read ALL reports
CREATE POLICY "admin_read_all_reports" ON public.reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      WHERE dp.id = auth.uid() AND dp.role = 'super_admin'
    )
  );

-- Super admin can manage ALL teams
CREATE POLICY "admin_read_all_teams" ON public.teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      WHERE dp.id = auth.uid() AND dp.role = 'super_admin'
    )
  );

CREATE POLICY "admin_read_all_team_members" ON public.team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.doctor_profiles dp
      WHERE dp.id = auth.uid() AND dp.role = 'super_admin'
    )
  );
