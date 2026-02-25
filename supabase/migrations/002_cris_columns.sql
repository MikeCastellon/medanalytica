-- ============================================================
-- MedAnalytica / CRIS GOLD™ — Additional Report Columns
-- Run this AFTER 001_initial_schema.sql
-- ============================================================

alter table reports
  add column if not exists blood_pressure         text,
  add column if not exists pulse_pressure         text,
  add column if not exists chief_complaints       text,
  add column if not exists hrv_markers            jsonb,
  add column if not exists hrv_summary            text,
  add column if not exists polyvagal_rule_of_3    boolean,
  add column if not exists polyvagal_interpretation text,
  add column if not exists adrenal_urine_drops    integer,
  add column if not exists adrenal_interpretation text,
  add column if not exists tfi                    numeric(5,2),
  add column if not exists adrenal_summary        text,
  add column if not exists brain_gauge            jsonb,
  add column if not exists brain_gauge_summary    text,
  add column if not exists therapeutic_selections jsonb,
  add column if not exists neurovizr_programs     jsonb,
  add column if not exists psychosomatic_findings text,
  add column if not exists patient_friendly_summary text,
  add column if not exists cri_category           text;
