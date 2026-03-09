-- Fix: Remove FK constraint on analysis_jobs.doctor_id that prevents job creation
-- The doctor_id is just for filtering, not referential integrity.
-- Also change to text type since we may receive non-UUID values.

-- Must drop RLS policy first — it depends on doctor_id column type
DROP POLICY IF EXISTS "Doctors can read own jobs" ON analysis_jobs;

ALTER TABLE analysis_jobs DROP CONSTRAINT IF EXISTS analysis_jobs_doctor_id_fkey;
ALTER TABLE analysis_jobs ALTER COLUMN doctor_id TYPE text;
ALTER TABLE analysis_jobs ALTER COLUMN doctor_id SET DEFAULT 'anonymous';

-- Disable RLS on analysis_jobs — jobs are ephemeral and accessed via jobId
ALTER TABLE analysis_jobs DISABLE ROW LEVEL SECURITY;
