# CRIS GOLD Therapeutic Priority Engine — Design Document

**Date:** 2026-03-12
**Source:** Dr. Kessler AI conversation (kessler-ai.docx)
**Status:** Approved

## Problem

The Therapeutic Selections page shows all 6 categories as equal-weight grid cards. Dr. Kessler's specification requires therapies displayed in a numbered priority order (Priority 1-6) with dynamic ordering based on patient physiology, red flag overrides, and quadrant-specific defaults.

## Solution

Add a deterministic `computeTherapeuticPriority()` function (server-side, like CRI/ELI) that produces an ordered list of therapeutic categories with priority numbers and reasoning text.

## Priority Algorithm

### Step 1 — Drainage Always First
Drainage is Priority 1. No exceptions.

### Step 2 — Detect Red Flags
- CRI >= 8 → flag cardiovascularSupport
- Total Power < 400 → flag mitochondrialSupport
- Stress Index > 300 → flag cardiovascularSupport
- Polyvagal Freeze (all 3 red) → informational flag only, raises nervous system note

### Step 3 — Quadrant Default Order (positions 2-6)
- Q1: CV → Neuro → CellMembrane → Mito → Oxidative
- Q2: CV → Oxidative → CellMembrane → Mito → Neuro
- Q3: CV → Mito → CellMembrane → Neuro → Oxidative
- Q4: CellMembrane → Mito → Neuro → CV → Oxidative

### Step 4 — Red Flag Override
Flagged categories move to Priority 2. If multiple flags hit different categories, CV wins tiebreak (highest clinical risk). If both CV and Mito flagged, CV=P2, Mito=P3.

### Step 5 — Generate Reasoning
Each priority gets a reason string explaining why it was placed there.

## Red Flag Reason Templates
| Flag | Text |
|------|------|
| CRI >= 8 | "Priority elevated: CRI score of {X} indicates significant cardiovascular stress" |
| TP < 400 | "Priority elevated: Total Power of {X} indicates severely depleted autonomic reserve" |
| SI > 300 | "Priority elevated: Stress Index of {X} indicates extreme sympathetic activation" |
| Freeze | "Polyvagal Freeze detected — dorsal vagal shutdown physiology present" |

## UI Changes
1. Replace flat grid with vertical priority stack (Priority 1, 2, 3...)
2. Add "Primary Physiological Risk" banner when red flags detected
3. Each card: priority badge + category name + reason + products
4. Keep practitioner edit functionality
5. Stress Buster Kit banner remains for Q1/Q2

## Files
- `src/lib/utils.js` — add `computeTherapeuticPriority()`
- `src/components/PatientReport.jsx` — redesign TherapeuticCard
- `netlify/functions/analyze-report.js` — call priority engine, include in response

## Deferred
- Chief Complaint modifier
- PAB composite metric
- Therapeutic pyramid visual
