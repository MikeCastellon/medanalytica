-- 003_subscriptions.sql
-- Adds billing/subscription columns to doctor_profiles

ALTER TABLE public.doctor_profiles
  ADD COLUMN IF NOT EXISTS subscription_tier       text    DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS subscription_status     text    DEFAULT 'inactive',
  ADD COLUMN IF NOT EXISTS paypal_subscription_id  text,
  ADD COLUMN IF NOT EXISTS plan_start_date         timestamptz,
  ADD COLUMN IF NOT EXISTS plan_end_date           timestamptz,
  ADD COLUMN IF NOT EXISTS billing_email           text;
