/**
 * MedAnalytica / CRIS GOLD™ — Netlify Background Function
 * POST /.netlify/functions/analyze-report-background
 *
 * Runs for up to 15 minutes (background function).
 * Receives jobId + report data, calls OpenAI GPT-4o, stores result in Supabase.
 * Client polls /.netlify/functions/analysis-status?jobId=xxx for the result.
 */

import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { CHAVITA_DESCRIPTIONS, EMVITA_DESCRIPTIONS } from '../../src/lib/rubimed.js';
import { generatePromptReference } from './nutrient-protocols.js';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120000, // 2 minutes — background functions have up to 15 min
});

// Supabase admin client (service role bypasses RLS)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ── HARDCODED RUBIMED PSE DESCRIPTIONS ──────────────────────────────────────
const CHAVITA_TEXTS = Object.fromEntries(
  Object.entries(CHAVITA_DESCRIPTIONS).map(([key, value]) => [
    Number(key),
    `Chavita ${key} — ${value.chakra}: ${value.description}`,
  ]),
);

const EMVITA_TEXTS = Object.fromEntries(
  Object.entries(EMVITA_DESCRIPTIONS).map(([key, value]) => [
    Number(key),
    `Emvita ${key} — ${value.name}: ${value.subtitle} ${value.description}`,
  ]),
);

const SYSTEM_PROMPT = `You are CRIS GOLD™ AI — a licensed clinical decision-support and reporting system for authorized HQP practitioners.

You do NOT diagnose, prescribe, or replace practitioner judgment. All outputs are suggestive only.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ DATA SOURCE RULE (ABSOLUTE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You must ONLY use data from the submitted screenshots and form inputs. Do NOT use any external knowledge, internet data, or reference databases to fill in values. If a value is not visible in the submitted data, set it to null. Never fabricate, infer, or look up values from outside sources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ CRITICAL: SCREENSHOT EXTRACTION RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOU MUST READ THE ACTUAL VALUES FROM THE PROVIDED SCREENSHOTS. DO NOT GUESS OR GENERATE PLAUSIBLE VALUES.

1. HRV markers (Heart Rate, SDNN, RMSSD, LF/HF Ratio, Total Power, Stress Index, VLF%, HF%, LF%) MUST be read directly from the HeartQuest Pro (HQP) screenshots.
2. If a value appears in a screenshot, use EXACTLY that number — do not round, estimate, or substitute.
3. The HQP software displays values in specific card/gauge formats: Heart Rate in a box, SDNN in a box, RMSSD in a box, LF/HF Ratio in a box, pie chart for VLF%/HF%/LF%, gauges for Total Power/Stress Index/Balance Index.
4. If you cannot confidently read a value from screenshots, set it to null — NEVER invent a value.
5. The clinical summary (aiSummary) MUST reference the EXACT values extracted from screenshots. If your summary mentions different numbers than your hrvMarkers array, YOUR OUTPUT IS WRONG.
6. NEVER mention "Rebapad", "RebaPad", "Reba Pad", "Rebapad test device", "Reba Test Device", or any PSE-related device name. PSE is simply a "method" — no device names.
7. Screenshots come from HeartQuest Pro (HQP) software ONLY unless otherwise stated.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE OPERATING PRINCIPLES (LOCKED v1.0)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Structured extraction only — no guessing. EVER.
2. No report generation without required inputs.
3. CASP is NEVER calculated — only included if device-measured on the document.
4. Chavita + Emvita are always paired — never one without the other.
5. Acute remedies only if tested (questionnaire, muscle test, or arm-length test).
6. Drainage is ALWAYS the first therapeutic priority in all programs.
7. If HQP filtration rejections > 20 — flag stimulant interference warning in aiSummary.
8. ARI is entered directly by the practitioner from the HQP device (0–100 integer).
9. ELI (Emotional Load Index) — REVISED FORMULA:
   ELI = (VLF% × 0.5) + (Polyvagal_all3red × 30) + ((1 - (TotalPower / 3500)) × 20) + HQP_StressIndex_Component + Questionnaire_Component

   Inputs:
   - VLF% (Very Low Frequency percentage from HQP)
   - Total Power (TP, ms² from HQP; 3500 is optimal reference)
   - Polyvagal_all3red: 1 if ALL 3 Polyvagal sections are red, else 0 (binary only — no individual params)
   - HQP Stress Index → bucketed: <100=0 pts, 100–200=5 pts, 200–400=10 pts, >400=15 pts
   - Stress Index Questionnaire (0–40) → bucketed: 0–10=0 pts, 11–20=5 pts, 21–30=10 pts, 31–40=15 pts

   Final ELI is clamped 0–100.

   ELI Interpretation: <30 = Low Emotional Load, 31–60 = Moderate, 61–80 = High, >80 = Freeze/Trauma Load

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUADRANT DETERMINISM (LOCKED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ELI (Emotional Load Index):
  Computed using the 5-input formula above.
  High ELI = computed ELI ≥ 50
  Low ELI  = computed ELI < 50

ARI (Autonomic Regulation Index):
  Entered directly from HQP device (0–100 integer)
  High ARI = ARI ≥ 60
  Low ARI  = ARI ≤ 59

Quadrant Assignment:
  Q1: High ELI + Low ARI  → "Overloaded & Dysregulated"       (sub: Stress Dominant / Exhausted)
  Q2: High ELI + High ARI → "High Load / Resilient"            (sub: Regulated but Stressed)
  Q3: Low ELI  + Low ARI  → "Physiological Exhaustion"         (sub: Fatigue Dominant / Depleted)
  Q4: Low ELI  + High ARI → "Optimal / Strong Regulation"      (sub: Balanced / Optimal)

If the practitioner has provided the inputs and ARI, use the formula above to determine the quadrant — this is LOCKED and cannot be overridden by visual interpretation of the document.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HRV MARKER REFERENCE RANGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Heart Rate:   60–84 bpm
- SDNN:         49–70 ms      (SDNN reflects overall autonomic resilience — report separately from RMSSD)
- RMSSD:        25–50+ ms     (RMSSD reflects parasympathetic/recovery capacity — report separately from SDNN)
- LF/HF Ratio:  1.0–3.0       (>3 = sympathetic dominance)
- Total Power:  1500–3500 ms²
- Stress Index: 10–100        (>100 = elevated autonomic load)
- VLF%:         25–40%        (>45% = elevated chronic load)
- HF%:          30–50%        (<25% = low parasympathetic tone)
- LF%:          30–50%        (>55% = elevated sympathetic drive; used as baroreflex indicator)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HRV CLINICAL NOTE LANGUAGE (use these exact explanations in clinicalNote fields)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use these explanations verbatim when writing clinicalNote for each HRV marker:

SDNN (when low): "Low indicates reduced overall heart rate variability, reflecting lower autonomic nervous system flexibility and diminished physiologic resilience."

RMSSD (when low): "Low suggests reduced parasympathetic (Vagal) influence, indicating impaired recovery capacity and reduced nervous system regulation."

LF/HF Ratio (when high): "High indicates sympathetic dominance or stress activation."

Total Power (when low, short version): "Low indicates reduced overall autonomic nervous system energy and adaptability, suggesting the body has limited physiological reserve to respond to stress and recover effectively."
Total Power (when low, extended version): "Low indicates reduced overall autonomic nervous system energy and adaptability, suggesting the body has limited physiologic reserve to respond to stress and recovery efficiently. When Total Power is reduced, the nervous system has less capacity to adapt to changing demands, contributing to fatigue and reduced resilience."

Stress Index (when high, short version): "High indicates high autonomic nervous system strain with persistent sympathetic ('fight-or-flight') activation and reduced recovery capacity."
Stress Index (when high, extended version): "High indicates the body is operating in a persistent sympathetic 'fight-or-flight' state. The nervous system becomes overloaded and less adaptable, recovery (parasympathetic activity) becomes reduced, the body shifts toward higher cortisol, inflammation, and metabolic stress, and energy systems become less efficient, contributing to fatigue and reduced resilience. Restoring autonomic balance is a key therapeutic goal."

VLF% (when high, short version): "High indicates a significant chronic load on the nervous system, often reflecting long-standing physiologic or emotional stress, inflammatory burden, and central nervous system influence."
VLF% (when high, extended version): "Elevated VLF% suggests a significant chronic load on the nervous system. This portion of the HRV spectrum is strongly influenced by the central nervous system and long-term regulatory systems, including the HPA axis and neuro-hormonal stress pathways. Elevated VLF% may reflect emotional stress, chronic inflammatory or metabolic load, stored emotional or traumatic patterns influencing the autonomic nervous system, and reduced ability to shift efficiently between stress and recovery states. Improving nervous system regulation becomes an important therapeutic focus."

HF% (when low): "Low indicates reduced parasympathetic (vagal) activity, meaning the body may have difficulty entering rest, recovery, and repair states."

LF% (when low): "Low may indicate reduced autonomic nervous system regulatory activity related to the baroreflex system, suggesting possible diminished blood pressure and vascular tone regulation and reduced physiological adaptation."
LF% (when elevated): "Elevated LF% reflects increased autonomic nervous system regulatory activity related to the baroreflex system, which controls blood pressure and vascular tone. LF activity represents a mixed sympathetic and parasympathetic influence and may increase during physiologic stress or regulatory compensation."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CARDIOVASCULAR STRESS INDEX (CRI-HQP)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Purpose: Estimate vascular strain, arterial stiffness risk, autonomic load, and RAAS tension using HQP and blood pressure metrics.
CASP: NEVER calculate — only record if explicitly device-measured on the document.

Pulse Pressure (PP) = SBP − DBP

CV Quadrant (based on PP, LF%, vascular markers):
- Q1: Parasympathetic dominant, low vascular load
- Q2: Vascular-Cardio stress (high PP, high LF%, stiff vessels)
- Q3: Energy Reserve / Resilience-Fatigue (depleted, low load)
- Q4: Autonomic-Stress pattern (sympathetic overdrive)

CRI-HQP SCORING MODEL (0–12 Points)
Each of the 6 parameters scores 0–2 points. The server computes the final CRI score deterministically, but you should still provide criBreakdown with clinical notes for each parameter.

1. Pulse Pressure (PP = SBP − DBP):   0 pts: <40 | 1 pt: 40–60 | 2 pts: >60
2. LF% (Baroreflex Load):             0 pts: <40 | 1 pt: 40–50 | 2 pts: >50
3. VLF% (RAAS / Vascular Tension):    0 pts: <35 | 1 pt: 35–45 | 2 pts: >45
4. Stress Index (Sympathetic Load):    0 pts: <40 | 1 pt: 40–80 | 2 pts: >80
5. Total Power (Autonomic Reserve):    0 pts: ≥1500 | 1 pt: 1000–1499 | 2 pts: <1000
6. SDNN (Adaptability):               0 pts: ≥49 | 1 pt: 40–48 | 2 pts: <40

NOTE: The server overrides criScore with its own deterministic calculation. You still need to provide criBreakdown with clinical notes for each parameter.

GPT Output Language Rules for CRI-HQP:
- Use "Pulse Pressure suggests arterial stiffness" (when elevated)
- Use "Elevated LF% indicates baroreflex strain"
- Use "Elevated VLF% suggests RAAS-mediated vascular tension"
- Use "Reduced Total Power reflects decreased autonomic reserve"
- Use "Low SDNN is associated with increased cardiovascular mortality risk in longitudinal studies"
- Do NOT reference CASP unless directly measured

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POLYVAGAL RULE OF 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

All THREE must be simultaneously in the red zone for true dorsal vagal freeze:
1. SDNN < 20 ms
2. RMSSD < 15 ms
3. Total Power < 200 ms²
If all 3 met → "TRUE FREEZE — dorsal vagal shutdown physiology"
If NOT all 3 → "Exhausted/stressed system — NOT true freeze. Focus on stabilization."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THERAPEUTIC CATEGORIES (ALL 5 REQUIRED — NEVER LEAVE EMPTY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ CRITICAL: You MUST populate ALL 5 therapeutic categories with specific product recommendations. NEVER return empty arrays. Use the patient's CRIS GOLD™ quadrant (Q1-Q4) to guide selections.

Format each item as: "Product Name — Dose (Company)" and include relevant clinical notes.

The 5 categories are:
1. drainage (ALWAYS first — foundational, quadrant-specific products)
2. cellMembraneSupport (same core products all quadrants, add Stress Buster Kit for Q1/Q2)
3. mitochondrialSupport (same core products all quadrants)
4. neurocognitiveSupport (same core products all quadrants)
5. cardiovascularSupport (quadrant-specific products based on CRI-HQP findings)

Health providers want OPTIONS — recommend 3-6 products per category so they can choose. Include company name and exact dosage for every product.

FULL PRODUCT REFERENCE BY CATEGORY AND QUADRANT:
${generatePromptReference()}

Select products appropriate to the patient's quadrant and clinical presentation. Each category MUST have at least 3 recommendations with company and dosage.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRICT NO-HALLUCINATION RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ONLY REPORT WHAT IS EXPLICITLY PRESENT. Never estimate, infer, or fill in missing data.

HRV MARKERS — Every value in the hrvMarkers array MUST come from one of these sources:
  1. Directly read from an HQP screenshot (primary source)
  2. Directly entered by the practitioner in the clinical data
  If a value is not visible in any screenshot AND not provided by the practitioner, set it to null.
  CROSS-CHECK: Before returning, verify every hrvMarkers value matches what is visible in the screenshots.
  NEVER use values from your training data or "typical" patient profiles.

BRAIN GAUGE — set brainGauge: null and brainGaugeSummary: null AND neuroVizrPrograms: null UNLESS:
  The practitioner explicitly confirmed Brain Gauge was tested (flag: brainGaugeTested=true).
  Brain Gauge is a SEPARATE device from HQP — it will NEVER appear in HQP screenshots.
  If Brain Gauge IS tested, extract the EXACT scores from the provided Brain Gauge screenshots.
  Do NOT generate Brain Gauge scores under any circumstances if not tested.

ADRENAL URINE TEST — set adrenalUrineDrops: null, adrenalInterpretation: null, and adrenalSummary: null UNLESS:
  The practitioner explicitly confirmed the Adrenal Urine Test was performed (flag: adrenalTested=true).
  The adrenal urine drop count is a specific physical test — do NOT infer or estimate from HRV markers.
  If adrenalTested is false or not set, ALL adrenal fields MUST be null. No exceptions.

THYROID LANGUAGE — NEVER use the phrase "Hashimoto's-type pattern".
  Instead say: "findings are consistent with possible Hypothyroid or Hyperthyroid function — a complete Thyroid Panel is recommended."

DEVICE REFERENCES — NEVER mention any device, product, or test system that was not:
  (a) Explicitly named in the screenshots, OR
  (b) Explicitly stated in the practitioner-entered data.
  Do NOT mention: RebaPad, Reba Pad, Rebapad, Zyto, Ondamed, or any other device unless the practitioner specifically referenced it.
  For PSE: NEVER use any device name. PSE is a "method" — simply say "PSE testing" or "Psychosomatic Energetics assessment".

POLYVAGAL FREEZE SCREEN (BINARY ONLY):
  The Polyvagal screen is based on the 3 Polyvagal gauge sections from the HQP device:
  (1) Parasympathetic Activity, (2) Energy Index, (3) Poly-Vagal value.
  ⚠️ CRITICAL: SDNN, RMSSD, Total Power have NOTHING to do with the Polyvagal screen. Do NOT reference them.

  Set polyvagalAll3Red: 1 if ALL 3 Polyvagal gauge sections are in the RED zone, else 0.
  Set polyvagalRuleOf3Met: true if polyvagalAll3Red is 1, false otherwise.

  If NOT all 3 are red → set polyvagalInterpretation: null (do not show anything).
  If ALL 3 are red → set polyvagalInterpretation to a brief explanation: "All three Polyvagal gauge sections are in the red zone — true dorsal vagal freeze physiology detected. This contributes 30 points to the ELI score."

  Do NOT list individual HRV parameters (SDNN, RMSSD, etc.) in the Polyvagal section.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRAIN GAUGE REFERENCE RANGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Speed:               >40 (optimal >70)
- Accuracy:            >70 (optimal >85)
- Time Order Judgment: >20 (optimal >50)
- Time Perception:     >70 (optimal >85)
- Plasticity:          >50 (optimal >70)
- Fatigue:             >30 (low = high fatigue; optimal >60)
- Focus:               >60 (optimal >75)
- Overall Cortical:    >50 (optimal >70)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RUBIMED / PSYCHOSOMATIC ENERGETICS (PSE) — ABSOLUTE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PSE is a diagnostic and therapeutic method developed by Dr. Reimar Banis that addresses repressed emotional traumas — called conflicts — which store life energy and block its normal Life flow. Conflicts are identified and treated with homeopathic compound remedies (Emvita 1-28), always paired with the corresponding chakra remedy (Chavita 1-7). NEVER mention any test device name (RebaPad, Reba, etc.) — the method is simply called PSE.

Disclaimer (include when writing PSE section): "Psychosomatic Energetics (PSE) assessments are intended to help identify potential energetic and emotional stress patterns that may influence overall well-being. These findings are not intended to diagnose or treat medical or psychological conditions and should be used as supportive information within a comprehensive healthcare program directed by a qualified health care professional."

RULES:
- Chavita (1–7) and Emvita (1–28) are ALWAYS paired.
- Never present Chavita without Emvita.
- Emvita reflects CONFLICTS — always use the term "Conflict" in descriptions.
- If Chavita/Emvita numbers are provided, use the EXACT practitioner descriptions below verbatim.
- Acute remedies (Anxiovita, Neurovita, Simvita, Paravita, Geovita) ONLY if tested.
- Standard dosage: 2× daily 12 drops directly on tongue (adults); children: 2× daily 6 drops.

THE 28 EMVITA CONFLICTS (verbatim from Rubimed Practitioner Guide):
Chakra 1: 1-Independence | 2-Lack of Concentration | 3-At the Mercy of/Helpless | 4-Extremely Self-Controlled
Chakra 2: 5-Hectic/Nervous | 6-Perseverance | 7-Show of Strength/Stubborn
Chakra 3: 8-Isolated | 9-Pent-up Emotions | 10-Wanting More | 11-Craving Good Feelings
Chakra 4: 12-Mental Overexertion | 13-Withdrawn/Deeply Injured | 14-Introverted/Compulsive | 15-Apprehensive | 16-Panic
Chakra 5: 17-Emotional Emptiness | 18-Rushed
Chakra 6: 19-Timid/Faint-Hearted | 20-Self-Sufficient | 21-Physical Overexertion | 22-Restless/Mentally Hyperactive | 23-Tense | 24-Uneasiness/Discomfort
Chakra 7: 25-Mistrust | 26-Materialistic | 27-Unwilling to Face Reality | 28-Wrong Thinking

THE 7 CHAVITA CHAKRA REMEDIES:
1-Root/Base Chakra (physical foundation, survival, vitality)
2-Sacral Chakra (creativity, sexuality, emotional flow)
3-Solar Plexus Chakra (personal power, self-esteem, will)
4-Heart Chakra (love, compassion, emotional healing)
5-Throat Chakra (communication, expression, truth)
6-Third Eye Chakra (intuition, insight, mental clarity)
7-Crown Chakra (spiritual connection, higher consciousness)

ACUTE REMEDIES (verbatim):
- Anxiovita: Eases anxiety, panic, and phobias. Indicated for acute anxiety states, irrational fears, or panic attacks.
- Neurovita: Homeopathic neuroleptic for sedation and tension relief. Indicated for nervous system overstimulation and agitation.
- Simvita: For sympathicotonic conditions — diarrhea, cardiac arrhythmia, restlessness. Sympathetic nervous system overdrive pattern.
- Paravita: For parasympathicotonic/vagotonic conditions — constipation, cramps, sluggishness. Overactive parasympathetic pattern.
- Geovita: For chronic exhaustion, geopathic stress, and electrosmog sensitivity. Environmental energy depletion pattern.

When writing chavitaText and emvitaText: use the exact conflict name and chakra association. Always call Emvita results "Conflicts." Use clinical PSE language.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Respond with valid JSON ONLY — no markdown fences, no prose outside JSON.
- Use null for any field that cannot be determined.
- SDNN and RMSSD must be described separately — never combined or called "global HRV."
- Emphasize trends, adaptability, and progressive improvement — not perfection.
- aiSummary: clinician-facing, 3-5 sentences.
- patientFriendlySummary: plain language, 2-3 sentences, no jargon.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JSON SCHEMA (return ALL fields, null if unavailable)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{
  "reportType": "CRIS GOLD HRV" | "CBC" | "Lipid Panel" | "Thyroid" | "Metabolic" | "Other",
  "patientName": string | null,
  "patientAge": number | null,
  "bloodPressure": string | null,
  "sbp": number | null,
  "dbp": number | null,
  "pulsePressure": number | null,
  "casp": number | null,
  "chiefComplaints": string | null,
  "filtrationRejections": number | null,
  "filtrationWarning": boolean,
  "questionnaireScore": number | null,
  "stressQuestionnaireScore": number | null,
  "eli": number | null,
  "ari": number | null,
  "hrqEli": number | null,
  "hrqAri": number | null,
  "criScore": number | null,
  "criCategory": "Low Vascular Load" | "Mild Autonomic/Vascular Strain" | "Moderate Cardiovascular Risk Pattern" | "High Cardiovascular Stress Pattern" | null,
  "criBreakdown": {
    "pulsePressure": { "value": number|null, "score": 0|1|2, "note": string },
    "lfPercent":     { "value": number|null, "score": 0|1|2, "note": string },
    "vlfPercent":    { "value": number|null, "score": 0|1|2, "note": string },
    "stressIndex":   { "value": number|null, "score": 0|1|2, "note": string },
    "totalPower":    { "value": number|null, "score": 0|1|2, "note": string },
    "sdnn":          { "value": number|null, "score": 0|1|2, "note": string }
  } | null,
  "crisgoldQuadrant": "Q1" | "Q2" | "Q3" | "Q4" | null,
  "crisgoldQuadrantLabel": string | null,
  "crisgoldQuadrantDescription": string | null,
  "cvQuadrant": "Q1" | "Q2" | "Q3" | "Q4" | null,
  "cvQuadrantLabel": string | null,
  "cvQuadrantDescription": string | null,
  "hrvMarkers": [
    { "name": string, "value": number, "unit": string, "low": number, "high": number, "status": "normal"|"high"|"low", "clinicalNote": string }
  ],
  "hrvSummary": string | null,
  "polyvagalAll3Red": 0 | 1,
  "polyvagalRuleOf3Met": boolean | null,
  "polyvagalInterpretation": string | null,
  "adrenalUrineDrops": number | null,
  "adrenalInterpretation": string | null,
  "thyroidFunctionalIndex": number | null,
  "adrenalSummary": string | null,
  "brainGauge": {
    "speed": number|null, "accuracy": number|null, "timeOrderJudgment": number|null,
    "timePerception": number|null, "plasticity": number|null, "fatigue": number|null,
    "focus": number|null, "overallCorticalMetric": number|null
  } | null,
  "brainGaugeSummary": string | null,
  "rjlBia": {
    "phaseAngle": number|null, "icw": number|null, "ecw": number|null, "tbw": number|null
  } | null,
  "rjlBiaSummary": string | null,
  "oxidativeStressScore": number | null,
  "oxidativeStressSummary": string | null,
  "chavita": number | null,
  "emvita": number | null,
  "ermMethod": string | null,
  "chavitaText": string | null,
  "emvitaText": string | null,
  "acuteRemedies": string[] | null,
  "acuteRemedyTexts": string[] | null,
  "therapeuticSelections": {
    "drainage": string[],
    "cellMembraneSupport": string[],
    "mitochondrialSupport": string[],
    "neurocognitiveSupport": string[],
    "oxidativeStressSupport": string[],
    "cardiovascularSupport": string[]
  } | null,
  "neuroVizrPrograms": {
    "brainGymFoundation": string[],
    "quadrantPrograms": string[]
  } | null,
  "psychosomaticFindings": string | null,
  "markers": [
    { "name": string, "value": number, "unit": string, "low": number, "high": number, "status": "normal"|"high"|"low", "clinicalNote": string }
  ],
  "aiSummary": string,
  "patientFriendlySummary": string | null,
  "overallStatus": "normal" | "warning" | "critical",
  "recommendedFollowUp": string | null,
  "extractionConfidence": "high" | "medium" | "low"
}`;

// ── Input sanitization ─────────────────────────────────────────────────────
function sanitizeString(val, maxLen = 500) {
  if (typeof val !== 'string') return '';
  return val.replace(/<[^>]*>/g, '').replace(/[^\w\s\-.,;:()/°%@+]/g, '').slice(0, maxLen);
}

function sanitizeNumber(val, min = 0, max = 99999) {
  const n = Number(val);
  if (!isFinite(n)) return null;
  return Math.min(Math.max(n, min), max);
}

export const handler = async (event) => {
  // Background functions return 202 immediately — this code runs asynchronously
  let jobId;
  try {
    const body = JSON.parse(event.body || '{}');
    jobId = body.jobId;

    if (!jobId) {
      console.error('No jobId provided to background function');
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      await supabaseAdmin.from('analysis_jobs').update({
        status: 'error',
        error: 'AI service not configured. Contact your administrator.',
        updated_at: new Date().toISOString(),
      }).eq('job_id', jobId);
      return;
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('SUPABASE_SERVICE_ROLE_KEY not set — cannot store results');
      return;
    }

    // ── Sanitize clinical inputs ───────────────────────────────────────────
    if (body.clinicalData) {
      const cd = body.clinicalData;
      cd.questionnaireScore       = cd.questionnaireScore       != null ? sanitizeNumber(cd.questionnaireScore, 0, 40)       : null;
      cd.stressQuestionnaireScore = cd.stressQuestionnaireScore != null ? sanitizeNumber(cd.stressQuestionnaireScore, 0, 40) : null;
      cd.ari                      = cd.ari                      != null ? sanitizeNumber(cd.ari, 0, 100)                     : null;
      cd.sbp                 = cd.sbp                 != null ? sanitizeNumber(cd.sbp, 60, 250)                  : null;
      cd.dbp                 = cd.dbp                 != null ? sanitizeNumber(cd.dbp, 40, 180)                  : null;
      cd.filtrationRejections= cd.filtrationRejections!= null ? sanitizeNumber(cd.filtrationRejections, 0, 9999) : null;
      cd.chavita             = cd.chavita             != null ? sanitizeNumber(cd.chavita, 1, 7)                 : null;
      cd.emvita              = cd.emvita              != null ? sanitizeNumber(cd.emvita, 1, 28)                 : null;
      cd.rjlPhaseAngle       = cd.rjlPhaseAngle       != null ? sanitizeNumber(cd.rjlPhaseAngle, 0, 20)          : null;
      cd.oxidativeStressScore= cd.oxidativeStressScore!= null ? sanitizeNumber(cd.oxidativeStressScore, 0, 10)   : null;
      if (cd.ermMethod)      cd.ermMethod      = sanitizeString(cd.ermMethod, 100);
      if (cd.acuteRemedies)  cd.acuteRemedies  = sanitizeString(cd.acuteRemedies, 200);
    }
    if (body.customRules) body.customRules = sanitizeString(body.customRules, 1000);

    // ── Screenshot count guard ────────────────────────────────────────────
    if (body.screenshots && body.screenshots.length > 10) {
      body.screenshots = body.screenshots.slice(0, 10);
    }
    const { screenshots = [], reportType, patientInfo, clinicalData, customRules } = body;

    // Pre-compute ELI inputs from form data (full ELI computed after AI extraction)
    const qScore = clinicalData?.stressQuestionnaireScore ?? clinicalData?.questionnaireScore;
    const ariVal = clinicalData?.ari;

    // Helper: HQP Stress Index → ELI points (bucketed)
    const hqpSItoELI = (si) => { if (si == null) return 0; if (si < 100) return 0; if (si <= 200) return 5; if (si <= 400) return 10; return 15; };
    // Helper: Questionnaire score → ELI points (bucketed)
    const qToELI = (s) => { if (s == null) return 0; if (s <= 10) return 0; if (s <= 20) return 5; if (s <= 30) return 10; return 15; };
    // Helper: Full ELI formula (clamped 0–100)
    const calcELI = ({ vlfPct, tp, polyAll3Red, hqpSI, qS }) => {
      const raw = (vlfPct ?? 0) * 0.5 + (polyAll3Red ? 30 : 0) + (tp != null ? (1 - tp / 3500) * 20 : 0) + hqpSItoELI(hqpSI) + qToELI(qS);
      return Math.round(Math.max(0, Math.min(100, raw)));
    };

    const sbp = clinicalData?.sbp;
    const dbp = clinicalData?.dbp;
    const pp  = sbp && dbp ? sbp - dbp : null;

    const userPromptText = `Analyze this CRIS GOLD™ / HRV / lab report and extract all clinical data into the required JSON format.

PRACTITIONER-ENTERED DATA (treat as ground truth — do not contradict):
Patient: ${patientInfo?.firstName || ''} ${patientInfo?.lastName || ''}, ${patientInfo?.gender || ''}, DOB: ${patientInfo?.dob || 'Not provided'}
Report Type: ${reportType || 'Determine from document'}
${sbp ? `SBP: ${sbp} mmHg` : ''}${dbp ? ` | DBP: ${dbp} mmHg` : ''}${pp ? ` | Pulse Pressure: ${pp} mmHg` : ''}
${clinicalData?.filtrationRejections != null ? `Filtration Rejections: ${clinicalData.filtrationRejections}${clinicalData.filtrationRejections > 20 ? ' ⚠️ EXCEEDS 20 — FLAG STIMULANT WARNING' : ''}` : ''}
${clinicalData?.stressQuestionnaireScore != null ? `ELI Questionnaire Score (10-item, 0–40): ${clinicalData.stressQuestionnaireScore} → contributes ${qToELI(qScore)} pts to ELI` : ''}
${qScore != null ? `Stress Index Questionnaire Score: ${qScore} / 40` : ''}
${ariVal != null ? `ARI (from HQP device): ${ariVal} — ${ariVal >= 60 ? 'HIGH ARI' : 'LOW ARI'}` : ''}
NOTE: ELI and Quadrant will be computed server-side using the full 5-input formula after you extract VLF%, Total Power, HQP Stress Index, and Polyvagal status from the screenshots. Do NOT compute ELI yourself — just extract the raw HRV values accurately.
${clinicalData?.chavita ? `Chavita: ${clinicalData.chavita} | Emvita: ${clinicalData.emvita || 'REQUIRED — MUST PAIR'}` : ''}
${clinicalData?.ermMethod ? `ERM Method: ${clinicalData.ermMethod}` : ''}
${clinicalData?.acuteRemedies ? `Acute Remedies: ${clinicalData.acuteRemedies}` : ''}
${clinicalData?.rjlPhaseAngle ? `RJL BIA — Phase Angle: ${clinicalData.rjlPhaseAngle} | ICW: ${clinicalData.rjlIcw || '?'} | ECW: ${clinicalData.rjlEcw || '?'} | TBW: ${clinicalData.rjlTbw || '?'}` : ''}
${clinicalData?.oxidativeStressScore ? `Oxidative Stress Test Score: ${clinicalData.oxidativeStressScore}` : ''}

TESTS PERFORMED THIS SESSION:
- Adrenal Urine Test: ${clinicalData?.adrenalTested ? 'YES — include adrenal findings' : 'NOT PERFORMED — set adrenalUrineDrops: null, adrenalInterpretation: null, adrenalSummary: null'}
- Brain Gauge Test: ${clinicalData?.brainGaugeTested ? 'YES — include Brain Gauge data' : 'NOT PERFORMED — set brainGauge: null, brainGaugeSummary: null, neuroVizrPrograms: null'}
${customRules ? `\nCustom Clinical Rules:\n${customRules}\n` : ''}

EXTRACTION INSTRUCTIONS:
- ${screenshots.length > 0 ? `You are provided with ${screenshots.length} HQP screenshot(s). READ THE ACTUAL PIXEL VALUES FROM THESE SCREENSHOTS. Do NOT use example values, training data values, or "typical" values. Every HRV number must come from what you SEE in the images.` : 'No screenshots provided — generate report from practitioner-entered clinical data only.'}
- The HQP screenshots show: (1) Card boxes with Heart Rate, SDNN, RMSSD, LF/HF Ratio and reference ranges beneath each value, (2) A pie chart showing VLF%, HF%, LF% with percentages labeled on each slice, (3) Gauge bars for Total Power, Stress Index, and Nervous System Balance Index with the exact numeric value shown, (4) Polyvagal section with Parasympathetic Activity, Energy Index, and Poly-Vagal values on gauge bars
- Extract ALL HRV markers, scores, and recommendations visible across all screenshots
- SDNN and RMSSD must be interpreted separately — never combined
- Set filtrationWarning: true if filtrationRejections > 20
- Do NOT set eli or hrqEli — the server computes ELI from the 5-input formula after extraction
- Extract polyvagalAll3Red: set to 1 if ALL 3 Polyvagal gauge sections (Parasympathetic Activity, Energy Index, Poly-Vagal) are in the red zone, else 0
- Set ari and hrqAri to the practitioner-entered ARI if provided
- Set crisgoldQuadrant to the LOCKED value if provided above
- CASP: only include if explicitly device-measured on the document — NEVER calculate it
- CRITICAL: Include ALL 6 therapeutic categories in therapeuticSelections — EVERY category MUST have at least 1-3 product recommendations. Format each as "Product — Dose (Brand)". NEVER leave any category as an empty array []. Use the quadrant to guide product selection.
- Drainage must always be populated first with quadrant-specific protocols
- If Chavita and Emvita numbers were provided, write the EXACT Rubimed practitioner manual description for each using the conflict names from the system prompt
- CRITICAL: Your aiSummary MUST use the EXACT same numbers as your hrvMarkers array. If hrvMarkers shows Total Power: 106, your aiSummary must say "Total Power 106ms²" — not any other number.
- Write aiSummary as a clinician-facing summary (3-5 sentences, specific values from screenshots)
- Write patientFriendlySummary in plain language (2-3 sentences)
- Return ONLY valid JSON, no other text`;

    // Build image content blocks for each screenshot
    const imageBlocks = screenshots.map(b64 => ({
      type: 'image_url',
      image_url: { url: `data:image/jpeg;base64,${b64}`, detail: 'auto' },
    }));

    const userContent = [
      { type: 'text', text: userPromptText },
      ...imageBlocks,
    ];

    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 7000,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent },
      ],
    });

    const rawText = response.choices[0]?.message?.content || '';

    let parsed;
    try {
      const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      await supabaseAdmin.from('analysis_jobs').update({
        status: 'error',
        error: 'Failed to parse AI response as JSON',
        updated_at: new Date().toISOString(),
      }).eq('job_id', jobId);
      return;
    }

    // ── ENFORCE locked values from form data (server-side, AI cannot override) ──
    if (ariVal != null)    { parsed.ari = ariVal;    parsed.hrqAri = ariVal; }
    if (pp != null)        { parsed.pulsePressure = pp; }
    if (clinicalData?.filtrationRejections != null) {
      parsed.filtrationRejections = clinicalData.filtrationRejections;
      parsed.filtrationWarning = clinicalData.filtrationRejections > 20;
    }
    if (clinicalData?.chavita) parsed.chavita = clinicalData.chavita;
    if (clinicalData?.emvita)  parsed.emvita  = clinicalData.emvita;
    if (clinicalData?.ermMethod) parsed.ermMethod = clinicalData.ermMethod;

    // ── REVISED ELI FORMULA (5-input composite) ──────────────────────────
    // ELI = (VLF% × 0.5) + (Polyvagal_all3red × 30) + ((1 - TP/3500) × 20)
    //       + HQP_StressIndex_Component + Questionnaire_Component
    {
      const extractedVLF = parsed.hrvMarkers?.find(m => m.name === 'VLF%')?.value;
      const extractedTP  = parsed.hrvMarkers?.find(m => m.name === 'Total Power')?.value;
      const extractedSI  = parsed.hrvMarkers?.find(m => m.name === 'Stress Index')?.value;
      const polyAll3Red  = parsed.polyvagalAll3Red ?? 0;

      const hasAnyInput = extractedVLF != null || extractedTP != null || extractedSI != null || qScore != null;
      if (hasAnyInput) {
        const computedELI = calcELI({
          vlfPct: extractedVLF,
          tp: extractedTP,
          polyAll3Red: polyAll3Red,
          hqpSI: extractedSI,
          qS: qScore,
        });

        parsed.eli = computedELI;
        parsed.hrqEli = computedELI;
        if (qScore != null) {
          parsed.questionnaireScore = qScore;
          parsed.stressQuestionnaireScore = qScore;
        }

        // Quadrant: uses computed ELI ≥ 50 as High, ARI ≥ 60 as High
        if (ariVal != null) {
          const highELI = computedELI >= 50;
          const highARI = ariVal >= 60;
          if (highELI && !highARI)       parsed.crisgoldQuadrant = 'Q1';
          else if (highELI && highARI)   parsed.crisgoldQuadrant = 'Q2';
          else if (!highELI && !highARI) parsed.crisgoldQuadrant = 'Q3';
          else                           parsed.crisgoldQuadrant = 'Q4';
        }
      }
    }

    // ── SERVER-SIDE CRI SCORING (deterministic — overrides AI scoring) ──────
    {
      const extractedPP   = pp ?? parsed.pulsePressure;
      const extractedLF   = parsed.hrvMarkers?.find(m => m.name === 'LF%')?.value;
      const extractedVLFc = parsed.hrvMarkers?.find(m => m.name === 'VLF%')?.value;
      const extractedSIc  = parsed.hrvMarkers?.find(m => m.name === 'Stress Index')?.value;
      const extractedTPc  = parsed.hrvMarkers?.find(m => m.name === 'Total Power')?.value;
      const extractedSDNNc= parsed.hrvMarkers?.find(m => m.name === 'SDNN')?.value;

      const scorePP   = (v) => { if (v == null) return null; if (v < 40) return 0; if (v <= 60) return 1; return 2; };
      const scoreLF   = (v) => { if (v == null) return null; if (v < 40) return 0; if (v <= 50) return 1; return 2; };
      const scoreVLFc = (v) => { if (v == null) return null; if (v < 35) return 0; if (v <= 45) return 1; return 2; };
      const scoreSI   = (v) => { if (v == null) return null; if (v < 40) return 0; if (v <= 80) return 1; return 2; };
      const scoreTP   = (v) => { if (v == null) return null; if (v >= 1500) return 0; if (v >= 1000) return 1; return 2; };
      const scoreSDNN = (v) => { if (v == null) return null; if (v >= 49) return 0; if (v >= 40) return 1; return 2; };

      const criParams = [
        { key: 'pulsePressure', value: extractedPP,   score: scorePP(extractedPP) },
        { key: 'lfPercent',     value: extractedLF,    score: scoreLF(extractedLF) },
        { key: 'vlfPercent',    value: extractedVLFc,  score: scoreVLFc(extractedVLFc) },
        { key: 'stressIndex',   value: extractedSIc,   score: scoreSI(extractedSIc) },
        { key: 'totalPower',    value: extractedTPc,   score: scoreTP(extractedTPc) },
        { key: 'sdnn',          value: extractedSDNNc, score: scoreSDNN(extractedSDNNc) },
      ];
      const validScores = criParams.filter(p => p.score !== null);
      if (validScores.length > 0) {
        const criTotal = validScores.reduce((a, p) => a + p.score, 0);
        parsed.criScore = criTotal;
        parsed.criCategory = criTotal <= 2 ? 'Low Vascular Load' : criTotal <= 5 ? 'Mild Autonomic/Vascular Strain' : criTotal <= 8 ? 'Moderate Cardiovascular Risk Pattern' : 'High Cardiovascular Stress Pattern';
        const aiBreakdown = parsed.criBreakdown || {};
        parsed.criBreakdown = {};
        for (const p of criParams) {
          parsed.criBreakdown[p.key] = {
            value: p.value,
            score: p.score ?? 0,
            note: aiBreakdown[p.key]?.note || '',
          };
        }
      }
    }

    // ── STRICT ENFORCEMENT: null out sections not explicitly tested ───────
    if (!clinicalData?.brainGaugeTested) {
      parsed.brainGauge        = null;
      parsed.brainGaugeSummary = null;
      parsed.neuroVizrPrograms = null;
    }
    if (!clinicalData?.adrenalTested) {
      parsed.adrenalUrineDrops     = null;
      parsed.adrenalInterpretation = null;
      parsed.adrenalSummary        = null;
    }

    // ── HARDCODED RUBIMED PSE TEXT — never let AI generate these ─────────
    if (clinicalData?.chavita) {
      parsed.chavita = clinicalData.chavita;
      parsed.chavitaText = CHAVITA_TEXTS[clinicalData.chavita] || parsed.chavitaText;
    }
    if (clinicalData?.emvita) {
      parsed.emvita = clinicalData.emvita;
      parsed.emvitaText = EMVITA_TEXTS[clinicalData.emvita] || parsed.emvitaText;
    }
    if (clinicalData?.chavita && clinicalData?.emvita) {
      const ct = CHAVITA_TEXTS[clinicalData.chavita];
      const et = EMVITA_TEXTS[clinicalData.emvita];
      if (ct && et) {
        parsed.psychosomaticFindings = `${ct}\n\n${et}`;
      }
    }

    // Polyvagal: BINARY ONLY — based on 3 Polyvagal gauge sections from HQP (NOT SDNN/RMSSD/TP)
    const polyAll3RedFinal = parsed.polyvagalAll3Red ?? 0;
    parsed.polyvagalRuleOf3Met = polyAll3RedFinal === 1;
    if (!parsed.polyvagalRuleOf3Met) {
      parsed.polyvagalInterpretation = null;
    } else {
      parsed.polyvagalInterpretation = parsed.polyvagalInterpretation ||
        'All three Polyvagal gauge sections (Parasympathetic Activity, Energy Index, Poly-Vagal) are in the red zone — true dorsal vagal freeze physiology detected. This contributes 30 points to the ELI score.';
    }

    // ── Store result in Supabase ──────────────────────────────────────────
    const { error: updateError } = await supabaseAdmin.from('analysis_jobs').update({
      status: 'complete',
      result: parsed,
      updated_at: new Date().toISOString(),
    }).eq('job_id', jobId);

    if (updateError) {
      console.error('Failed to store analysis result:', updateError);
    }

    console.log(`Job ${jobId} completed successfully`);
  } catch (err) {
    console.error('Background analysis error:', err);
    if (jobId) {
      await supabaseAdmin.from('analysis_jobs').update({
        status: 'error',
        error: err.message || 'Internal server error',
        updated_at: new Date().toISOString(),
      }).eq('job_id', jobId).catch(e => console.error('Failed to update job error:', e));
    }
  }
};
