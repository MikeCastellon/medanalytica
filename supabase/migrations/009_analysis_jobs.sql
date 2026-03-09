-- Analysis jobs table for async background processing
-- The Netlify background function writes results here; the client polls for completion.

CREATE TABLE IF NOT EXISTS analysis_jobs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id      text UNIQUE NOT NULL,
  doctor_id   uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status      text NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'complete', 'error')),
  result      jsonb,
  error       text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- Auto-cleanup: delete jobs older than 1 hour (they're ephemeral)
-- Run this manually or via a cron if needed:
-- DELETE FROM analysis_jobs WHERE created_at < now() - interval '1 hour';

-- RLS: doctors can only read their own jobs
ALTER TABLE analysis_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can read own jobs"
  ON analysis_jobs FOR SELECT
  USING (auth.uid() = doctor_id);

-- Service role (used by Netlify function) bypasses RLS to insert/update
-- No INSERT/UPDATE policy needed for authenticated users — only the server writes.
