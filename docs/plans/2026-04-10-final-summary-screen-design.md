# CRIS GOLD Final Summary Screen — Design Doc
**Date:** 2026-04-10  
**Status:** Approved  
**Section:** §12 Patient Action Plan

## Purpose
Convert clinical findings into a clear, prioritized, patient-friendly action plan. This is the final section of every CRIS GOLD report. Structured execution plan — not a recommendation list.

## Files
- **Create:** `src/components/FinalSummaryCard.jsx`
- **Edit:** `src/components/PatientReport.jsx` — add §12 at the end

## Data Sources (all from existing `report` object)
| Data | Source |
|------|--------|
| Chavita | `r.chavita` |
| Emvita | `r.emvita` |
| Acute remedy | `r.acuteRemedies[0]` |
| Drainage | Always Pekana Detox Kit (apo-HEPAT + Renelix + Itires) |
| Core support | `r.therapeuticPriorities.priorities[0]` (first non-drainage) |
| NeuroVIZR sessions | `r.neuroVizrPrograms.quadrantPrograms` |
| Quadrant | `r.crisgoldQuadrant` |

## Section Structure

### Section 1 — Priority Therapeutic Action Plan
- Numbered 1–5, only show rows where data exists
- Practitioner can toggle any item off (no-print control)
- Toggling off removes item from schedule + remedy summary

### Section 2 — Daily Patient Schedule
- Morning: Chavita + Pekana Detox Kit
- Midday: Emvita + NeuroVIZR Brain Gym
- Evening: Acute remedy + Core physiological support
- Optional: Secondary items
- Note on every slot: "Allow 10–15 minutes between remedies"

### Section 3 — NeuroVIZR Program
- Phase 1 (mandatory): Coordination/Flexibility/Strength/Endurance 1→2→3
- Rule note: "Must complete all levels before progressing"
- Phase 2: from `r.neuroVizrPrograms.quadrantPrograms`
- Footer: "Active engagement drives neuroplastic change"

### Section 4 — Remedy Summary
- One row per active Priority 1–3 item
- Patient-friendly language from CHAVITA_DESCRIPTIONS, EMVITA_DESCRIPTIONS, PSE_REMEDY_INFO
- Max 2 sentences each

### Section 5 — Follow Instructions
- Static 4-point card: start gradually, one at a time, 3–4 weeks, re-evaluate

## Dev Rules
- Auto-height containers, no fixed heights
- No orphan headers
- Practitioner toggle on all items (no-print)
- Max 5 primary items enforced
- Brain Gym always first in NeuroVIZR
- No forced page breaks inside sections
