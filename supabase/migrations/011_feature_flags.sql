-- ── Feature Flags ─────────────────────────────────────────
-- JSONB column on doctor_profiles for per-account feature toggles.
-- Super admins can enable/disable features per user.
-- Example: { "neurovizr": true, "brainGauge": true }

ALTER TABLE public.doctor_profiles
  ADD COLUMN IF NOT EXISTS feature_flags jsonb DEFAULT '{}'::jsonb;

-- Enable NeuroVIZR for all existing accounts
UPDATE public.doctor_profiles
  SET feature_flags = COALESCE(feature_flags, '{}'::jsonb) || '{"neurovizr": true}'::jsonb;
