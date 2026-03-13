# HQB Data Replaces Screenshots — Design Doc
**Date:** 2026-03-12

## Goal
When a doctor imports a patient from HQB, pass all 40+ biomarkers directly to the AI as structured text. Screenshots become optional — only needed for external labs (adrenal, Brain Gauge, RJL BIA).

## Data Flow (new)
1. Doctor searches HQB → clicks "Apply to Form" → full recording stored in state
2. On submit, `hqbData` (full recording) included in AI payload
3. AI prompt receives structured text block with ALL HQB values instead of reading pixels
4. Server computes polyvagalAll3Red from SDNN/RMSSD/TP (no screenshot needed)
5. Screenshots remain optional for external tests only

## Files Changed
1. **`netlify/functions/fetch-hqb-data.js`** — return all recording fields (doshas, chakras, meridians, hormones, minerals, CV fields, brain, polyvagal indicators)
2. **`src/components/NewPatient.jsx`** — store full hqb recording on apply; pass via onSubmit
3. **`src/components/Processing.jsx`** — include `hqbData` in AI payload
4. **`netlify/functions/analyze-report.js`** — accept hqbData; inject as text block; compute polyvagal server-side
5. **`netlify/functions/analyze-report-background.js`** — same changes as above

## Polyvagal Derivation
When hqbData present: `polyvagalAll3Red = (sdnn < 20 && rmssd < 15 && totalPower < 200) ? 1 : 0`
This matches the CRIS "Rule of 3" freeze criteria already in the system prompt.

## HQB → CRIS Field Mapping
| HQB field | CRIS field |
|---|---|
| hrv.vlfPct | VLF% (ELI input) |
| hrv.totalPower | Total Power (ELI input) |
| hrv.stressIndex | Stress Index (ELI input) |
| hrv.sdnn | SDNN |
| hrv.rmssd | RMSSD |
| hrv.lfHfRatio | LF/HF Ratio |
| hrv.lfPct | LF% |
| hrv.hfPct | HF% |
| hrv.meanHr | Heart Rate |
| brainSpectrum | Brain wave data |
| cardio_vasc_adapt + neuro_hormonal_reg | CV pattern context |
| dorsalVagus, cns_ans | Polyvagal context |
| doshas, chakras, meridians | Extended biomarkers |
