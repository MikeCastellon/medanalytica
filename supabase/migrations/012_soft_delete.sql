-- 012: Add soft-delete support (deleted_at) to patients and reports

ALTER TABLE patients ADD COLUMN IF NOT EXISTS deleted_at timestamptz DEFAULT NULL;
ALTER TABLE reports  ADD COLUMN IF NOT EXISTS deleted_at timestamptz DEFAULT NULL;

-- Index for fast filtering of non-deleted rows
CREATE INDEX IF NOT EXISTS idx_patients_not_deleted ON patients (doctor_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_reports_not_deleted  ON reports  (patient_id) WHERE deleted_at IS NULL;
