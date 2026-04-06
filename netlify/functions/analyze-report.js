/**
 * MedAnalytica / CRIS GOLD™ — Netlify Serverless Function
 * POST /.netlify/functions/analyze-report
 *
 * Receives a base64-encoded report file (PDF or image) plus manually
 * entered clinical data, sends to OpenAI GPT-4o with the full CRIS GOLD™
 * v1.0 locked operating system prompt, returns structured JSON.
 *
 * OPENAI_API_KEY never touches the browser.
 */

import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { CHAVITA_DESCRIPTIONS, EMVITA_DESCRIPTIONS } from '../../src/lib/rubimed.js';
import { generatePromptReference } from './nutrient-protocols.js';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 24000, // 24s — leave 2s buffer for Netlify's 26s function timeout
});

// Background mode: if SUPABASE_SERVICE_ROLE_KEY is set, we can use async processing
const canRunAsync = () => !!process.env.SUPABASE_SERVICE_ROLE_KEY;
const getSupabaseAdmin = () => createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ── HARDCODED RUBIMED PSE DESCRIPTIONS ──────────────────────────────────────
// Source: "Practitioner's Guide — Psychosomatic Energetics" by Dr. Reimar Banis
// These OVERRIDE any AI-generated text. The AI must never write its own Chavita/Emvita descriptions.

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
You must ONLY use data from the submitted screenshots, HQB structured data, and form inputs. Do NOT use any external knowledge, internet data, or reference databases to fill in values. If a value is not present in the submitted data, set it to null. Never fabricate, infer, or look up values from outside sources.

When HQB structured data is provided, use those exact numeric values for all HRV markers — treat them with the same authority as screenshot pixel readings. HQB data is direct sensor output from the HeartQuest device.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANALYSIS CALCULATION FLOW (follow this order)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Review Screens — Extract all values from submitted screenshots: Rule of 3 (Polyvagal freeze check), Adrenal Results, HRV markers, blood pressure, etc.
2. Emvita / Chavita — Identify the PSE conflict (Emvita 1–28) and paired chakra remedy (Chavita 1–7) from submitted data.
3. Determine Quadrant — Compute ELI from extracted values, combine with practitioner-entered ARI to assign CRIS GOLD™ Quadrant (Q1–Q4).
4. If This Then That — Apply quadrant-specific therapeutic logic and product selections based on the determined quadrant and clinical findings.
5. Provide Report — Assemble final structured JSON output with all sections populated.

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
8. ARI (Autonomic Regulation Index) — COMPUTED SERVER-SIDE from HQP values:
   ARI = (SDNN_score × 0.30) + (RMSSD_score × 0.25) + (TP_score × 0.25) + (HF_score × 0.10) + (LF_score × 0.10)

   Normalization (each to 0–100):
   - SDNN_score  = min(100, SDNN / 70 × 100)
   - RMSSD_score = min(100, RMSSD / 50 × 100)
   - TP_score    = min(100, TP / 3500 × 100)
   - HF_score    = max(0, 100 − |HF − 27| / 27 × 100)
   - LF_score    = max(0, 100 − |LF − 47| / 47 × 100)

   Guardrails (applied before quadrant routing):
   - If Total Power < 600 → ARI ≤ 50
   - If SDNN < 25 AND RMSSD < 20 → ARI ≤ 40
   - If Total Power < 300 → ARI ≤ 30

   ARI is computed by the server after HRV extraction. Do NOT compute ARI yourself.
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
  High ELI = computed ELI ≥ 40
  Low ELI  = computed ELI < 40

ARI (Autonomic Regulation Index):
  Computed server-side from SDNN, RMSSD, Total Power, HF%, LF% using the weighted formula with guardrails.
  High ARI = ARI ≥ 70
  Low ARI  = ARI < 70

Quadrant Assignment:
  Q1: High ELI + Low ARI  → "Overloaded & Dysregulated"       (sub: Stress Dominant / Exhausted)
  Q2: High ELI + High ARI → "High Load / Resilient"            (sub: Regulated but Stressed)
  Q3: Low ELI  + Low ARI  → "Physiological Exhaustion"         (sub: Fatigue Dominant / Depleted)
  Q4: Low ELI  + High ARI → "Optimal / Strong Regulation"      (sub: Balanced / Optimal)

ARI and ELI are both computed server-side. The quadrant is determined from Final ARI + Final ELI — this is LOCKED and cannot be overridden by visual interpretation of the document.
Never route depleted physiology (low SDNN, low RMSSD, low Total Power) to Q4.

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
- LF%:          40–55%        (<40% = reduced baroreflex activity / low sympathetic modulation; used as baroreflex indicator)

CRITICAL: VLF%, LF%, HF% must be returned as WHOLE NUMBER PERCENTAGES (e.g. 85, 14, 1), NOT as decimals (0.85, 0.14, 0.01). The pie chart on HQP shows "85%" — return 85, not 0.85.

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
2. LF% (Baroreflex Load):             0 pts: ≥50 | 1 pt: 40–49 | 2 pts: <40
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

BRAIN GAUGE — set brainGauge: null and brainGaugeSummary: null UNLESS:
  The practitioner explicitly confirmed Brain Gauge was tested (flag: brainGaugeTested=true).
  Brain Gauge is a SEPARATE device from HQP — it will NEVER appear in HQP screenshots.
  If Brain Gauge IS tested, extract the EXACT scores from the provided Brain Gauge screenshots.
  Do NOT generate Brain Gauge scores under any circumstances if not tested.

NEUROVIZR SESSION MAPPING — ALWAYS generate neuroVizrPrograms (does NOT require Brain Gauge).
  Use the CRIS GOLD quadrant + Brain Gauge deficits (if available) + special conditions to select sessions.
  Clinical rule: when possible, begin with Brain Gym preparation sequence before heavier sessions.

  SESSION LIMITS (MANDATORY — do not exceed):
  - MAX 2 Core sessions
  - MAX 1 Optional session
  - MAX 1 Advanced session
  - If duplicates across categories → show only once
  - Do NOT use "Speed Exercise" — it does not exist. Use "Pattern Exercise" if clinically needed.

  SELECTION ORDER:
  1. Quadrant (always)
  2. Brain Gauge (if data exists)
  3. Condition (only if clinically needed, do not exceed limits)

  BRAIN GYM RULE:
  - If Quadrant = Q1 or Q3: show Brain Gym Foundation first (Coordination 1, Flexibility 1, Strength 1, Endurance 1)

  QUADRANT SESSION MAP (LOCKED — use these exact sessions):
  - Q1: Core: Calm Down, Peaceful Heart | Optional: Now Just Relax | Advanced: Alpha 10Hz
  - Q2: Core: Emotional Flow, Shifting Into Task | Optional: Calm Down | Advanced: Gamma Gamma
  - Q3: Core: Gentle Movers, Alpha 8-12Hz | Optional: Beta 12-15Hz | Advanced: Focused Attention
  - Q4: Core: Laser Focus, Target Focus | Optional: Task Mode | Advanced: Gamma 30-40Hz

  BRAIN GAUGE DEFICIT MAPPING (only when brainGaugeTested=true):
  - Speed → Laser Focus
  - Accuracy → Still Point
  - TOJ → Coordination 1
  - Fatigue → Gentle Movers
  - Plasticity → Shifting Into Task
  - Focus → Laser Focus

  SPECIAL CONDITIONS (add only if clinically needed, do not exceed session limits):
  - Anxiety / High Stress: Core: Calm Down, Peaceful Heart | Optional: Now Just Relax | Advanced: Alpha 10Hz
  - Brain Fog / Cognitive Slowness: Core: Crystal Clear, Laser Focus | Optional: Beta 15Hz | Advanced: Focused Attention
  - TBI / Concussion: Core: Coordination 1, Coordination 2 | Optional: Pattern Exercise | Advanced: Gamma Processor
  - Sleep Issues: Core: Now Just Relax, Peaceful Heart | Optional: Delta 1-4Hz | Advanced: Theta 4Hz
  - Burnout / Exhaustion: Core: Gentle Movers, Unwind | Optional: Kick Back | Advanced: Recover from Burnout

  OUTPUT RULES:
  - brainGymFoundation: ALWAYS ['Coordination 1', 'Flexibility 1', 'Strength 1', 'Endurance 1'] — show first for Q1/Q3
  - quadrantPrograms: Use ONLY the locked quadrant sessions above (max 2 core + 1 optional + 1 advanced)
  - sessionFlow: Ordered sequence: Brain Gym (if Q1/Q3) → Core → Optional → Advanced
  - clinicalIntention: One sentence describing the therapeutic goal
  - frequency: Recommended frequency (e.g. "4-6x/week", "Daily or near-daily")
  - miniProtocol: AM/midday/PM session suggestions (optional, only if pattern detected)

ADRENAL URINE TEST — set adrenalUrineDrops: null, adrenalInterpretation: null, and adrenalSummary: null UNLESS:
  The practitioner explicitly confirmed the Adrenal Urine Test was performed (flag: adrenalTested=true).
  The adrenal urine drop count is a specific physical test — do NOT infer or estimate from HRV markers.
  If adrenalTested is false or not set, ALL adrenal fields MUST be null. No exceptions.

ADRENAL INTERPRETATION PATTERNS (use VERBATIM when applicable):
- HYPERADRENAL PATTERN (very low drop count, typically ≤ 5):
  adrenalInterpretation: "Hyperadrenal Pattern"
  adrenalSummary must include: "A very low drop count indicates increased adrenal stress hormone output and heightened sympathetic activation, commonly seen with chronic stress, anxiety, restlessness, and difficulty relaxing."
- HYPOADRENAL PATTERN (very high drop count, typically ≥ 15):
  adrenalInterpretation: "Hypoadrenal Pattern"
  adrenalSummary: describe adrenal fatigue, reduced cortisol output, low stress hormone reserve.
- NORMAL RANGE (6–14 drops): adrenalInterpretation: "Normal Adrenal Function" with brief positive note.

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

PSE is a diagnostic and therapeutic method developed by Dr. Reimar Banis that addresses repressed emotional traumas (conflicts) which store life energy and block its normal flow. Four energy levels are tested: Vital, Emotional, Mental, Causal. NEVER mention any test device name (RebaPad, Reba, etc.) — the method is simply called PSE.

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
    "quadrantPrograms": string[],
    "sessionFlow": string[],
    "clinicalIntention": string,
    "frequency": string,
    "miniProtocol": { "am": string, "midday": string, "pm": string } | null
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

// ── In-memory rate limiter (per IP, resets on cold start) ─────────────────
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX       = 10;        // max 10 requests per minute per IP

function checkRateLimit(ip) {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return entry.count <= RATE_LIMIT_MAX;
}

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

// ── Format HQB data as structured text block for AI prompt ────────────────
function buildHqbDataBlock(hqb) {
  if (!hqb) return '';
  const h = hqb.hrv || {};
  const b = hqb.bioMarkers || {};
  const bs = hqb.brainSpectrum || null;
  const rr = hqb.rrSummary || {};

  const fmt = (v, unit = '') => v != null ? `${v}${unit}` : 'N/A';

  const lines = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'HQB DEVICE DATA (HeartQuest structured output — treat as direct sensor readings)',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '── HRV Time Domain ──',
    `Heart Rate (Mean): ${fmt(h.meanHr, ' bpm')}`,
    `SDNN: ${fmt(h.sdnn, ' ms')}`,
    `RMSSD: ${fmt(h.rmssd, ' ms')}`,
    `Min HR: ${fmt(h.minHr, ' bpm')} | Max HR: ${fmt(h.maxHr, ' bpm')}`,
    '',
    '── HRV Frequency Domain ──',
    `LF/HF Ratio: ${fmt(h.lfHfRatio)}`,
    `Total Power: ${fmt(h.totalPower, ' ms²')}`,
    `VLF%: ${fmt(h.vlfPct, '%')} | LF%: ${fmt(h.lfPct, '%')} | HF%: ${fmt(h.hfPct, '%')}`,
    `VLF (abs): ${fmt(h.vlf, ' ms²')} | LF (abs): ${fmt(h.lf, ' ms²')} | HF (abs): ${fmt(h.hf, ' ms²')}`,
    '',
    '── Indices ──',
    `Stress Index: ${fmt(h.stressIndex)}`,
    `Health Index (ARI proxy): ${fmt(h.healthIndex)}`,
    `HRV Index: ${fmt(h.hrvIndex)}`,
    `BPM: ${fmt(b.bpm)} | ICP: ${fmt(b.icp)} | MO: ${fmt(b.mo)} | AMO: ${fmt(b.amo)}`,
    `ANS Balance: ${fmt(b.ans)} | TFI: ${fmt(b.tfi)} | RSAI: ${fmt(b.rsai)} | MXDMN: ${fmt(b.mxdmn)}`,
    '',
    '── Autonomic / Polyvagal Indicators ──',
    `Dorsal Vagus: ${fmt(b.dorsalVagus)} | CNS/ANS: ${fmt(b.cns_ans)} | Yin/Yang: ${fmt(b.yin_yang)}`,
    `Cardio-Vascular Adaptation: ${fmt(b.cardio_vasc_adapt)}`,
    `Neuro-Hormonal Regulation: ${fmt(b.neuro_hormonal_reg)}`,
    `Inflammation Index: ${fmt(b.inflamIndex)}`,
    `Bio Age: ${fmt(b.bioAge)} yrs | Age Diff: ${fmt(b.ageDiff)} yrs`,
  ];

  if (bs) {
    lines.push('', '── Brain Spectrum ──');
    lines.push(`Delta: ${fmt(bs.delta)} | Theta: ${fmt(bs.theta)} | Alpha: ${fmt(bs.alpha)} | Beta: ${fmt(bs.beta)} | HBeta: ${fmt(bs.hbeta)}`);
  }

  if (b.doshas) {
    lines.push('', '── Ayurvedic Doshas ──');
    lines.push(`Vata: ${fmt(b.doshas.vata)} | Pitta: ${fmt(b.doshas.pitta)} | Kapha: ${fmt(b.doshas.kapha)}`);
  }

  if (b.hormones) {
    lines.push('', '── Hormones ──');
    lines.push(`DHEA: ${fmt(b.hormones.dhea)} | T3/T4: ${fmt(b.hormones.t3_t4)} | Insulin: ${fmt(b.hormones.insulin)}`);
    lines.push(`Cortisol: ${fmt(b.hormones.cortisol)} | Estradiol: ${fmt(b.hormones.estradiol)} | Pregnenolone: ${fmt(b.hormones.pregnenolone)}`);
  }

  if (b.minerals) {
    lines.push('', '── Minerals ──');
    lines.push(`K: ${fmt(b.minerals.k)} | Ca: ${fmt(b.minerals.ca)} | Mg: ${fmt(b.minerals.mg)} | Na: ${fmt(b.minerals.na)}`);
  }

  if (b.meridians) {
    const m = b.meridians;
    lines.push('', '── Meridians ──');
    lines.push(`BL:${fmt(m.bl)} GB:${fmt(m.gb)} HT:${fmt(m.ht)} KI:${fmt(m.ki)} LI:${fmt(m.li)} LU:${fmt(m.lu)}`);
    lines.push(`LV:${fmt(m.lv)} PC:${fmt(m.pc)} SI:${fmt(m.si)} SP:${fmt(m.sp)} ST:${fmt(m.st)} TW:${fmt(m.tw)}`);
  }

  if (b.chakras) {
    const c = b.chakras;
    lines.push('', '── Chakras ──');
    lines.push(`EP1:${fmt(c.ep1)} EP2:${fmt(c.ep2)} EP3:${fmt(c.ep3)} EP4:${fmt(c.ep4)} EP5:${fmt(c.ep5)} EP6:${fmt(c.ep6)} EP7:${fmt(c.ep7)}`);
  }

  if (b.fiveElements) {
    const f = b.fiveElements;
    lines.push('', '── Five Elements ──');
    lines.push(`Air:${fmt(f.air)} Fire:${fmt(f.fire)} Earth:${fmt(f.earth)} Ether:${fmt(f.ether)} Water:${fmt(f.water)}`);
  }

  if (b.bnt) {
    lines.push('', '── Neurotransmitters (BNT) ──');
    lines.push(`ACh:${fmt(b.bnt.ach)} Dopa:${fmt(b.bnt.dopa)} GABA:${fmt(b.bnt.gaba)} Sert:${fmt(b.bnt.sert)} CT-E:${fmt(b.bnt.ct_e)} CT-NE:${fmt(b.bnt.ct_ne)}`);
  }

  lines.push('', '── RR Metadata ──');
  lines.push(`Total RR: ${fmt(rr.totalRr)} | Filtered: ${fmt(rr.totalFilteredRr)} | Rejected: ${fmt(rr.totalRejected)}`);
  lines.push(`Mean RR: ${fmt(rr.mean, ' ms')} | Min: ${fmt(rr.min, ' ms')} | Max: ${fmt(rr.max, ' ms')}`);
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return '\n' + lines.join('\n') + '\n';
}

export const handler = async (event) => {
  // Allow requests from both the custom domain and the Netlify subdomain
  const requestOrigin = event.headers['origin'] || '';
  const allowedOrigins = [
    'https://kesslercris.com',
    'https://www.kesslercris.com',
    'https://medanalytica-cris.netlify.app',
    ...(process.env.ALLOWED_ORIGIN ? [process.env.ALLOWED_ORIGIN] : []),
  ];
  const allowedOrigin = allowedOrigins.includes(requestOrigin)
    ? requestOrigin
    : allowedOrigins[0];

  const securityHeaders = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
  };
  const headers = securityHeaders;

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // ── Rate limiting ────────────────────────────────────────────────────────
  const clientIP = event.headers['x-forwarded-for']?.split(',')[0]?.trim()
                || event.headers['client-ip']
                || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return { statusCode: 429, headers, body: JSON.stringify({ error: 'Too many requests. Please wait before submitting again.' }) };
  }

  // ── API key guard ─────────────────────────────────────────────────────────
  if (!process.env.OPENAI_API_KEY) {
    return { statusCode: 503, headers, body: JSON.stringify({ error: 'AI service not configured. Contact your administrator.' }) };
  }

  // ── Body size guard (max 20 MB) ──────────────────────────────────────────
  const bodyLen = event.body ? Buffer.byteLength(event.body, 'utf8') : 0;
  if (bodyLen > 20 * 1024 * 1024) {
    return { statusCode: 413, headers, body: JSON.stringify({ error: 'Request too large. Maximum file size is 20 MB.' }) };
  }

  // ── HIPAA audit log (server-side only — never returned to client) ─────────
  console.log(JSON.stringify({
    event: 'analyze-report-request',
    timestamp: new Date().toISOString(),
    ip: clientIP,
    bodyBytes: bodyLen,
  }));

  try {
    const body = JSON.parse(event.body || '{}');

    // ── ASYNC MODE: create job record, client will call background function directly ──
    if (body.mode === 'async' && canRunAsync()) {
      const jobId = randomUUID();
      const supabaseAdmin = getSupabaseAdmin();

      const { error: insertError } = await supabaseAdmin.from('analysis_jobs').insert({
        job_id: jobId,
        doctor_id: body.doctorId || '00000000-0000-0000-0000-000000000000',
        status: 'processing',
      });

      if (insertError) {
        console.error('Failed to create analysis job:', insertError);
        // Fall through to synchronous mode
      } else {
        return {
          statusCode: 202,
          headers,
          body: JSON.stringify({ mode: 'async', jobId }),
        };
      }
    }

    // ── SYNCHRONOUS MODE (fallback) ──────────────────────────────────────────

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
    const { screenshots = [], reportType, patientInfo, clinicalData, customRules, hqbData } = body;
    // screenshots: array of base64 image strings (PNG/JPG/TIFF)
    // hqbData: full HQB recording object (replaces screenshots for HQB patients)

    // Pre-compute ELI inputs from form data (full ELI computed after AI extraction)
    // Prefer stressQuestionnaireScore (from ELI questionnaire) over manual questionnaireScore
    const qScore = clinicalData?.stressQuestionnaireScore ?? clinicalData?.questionnaireScore;
    const ariVal = clinicalData?.ari;

    // ── Polyvagal Rule of 3 — CANNOT be derived from HRV values ────────────────
    // The 3 Polyvagal gauges (Parasympathetic Activity, Energy Index, Poly-Vagal)
    // are separate HQP device readings, NOT SDNN/RMSSD/TP. The HQP API does not
    // expose these gauge values, so we let the AI read them from screenshots.
    // When only API data is available (no screenshots), default to 0.
    const hqbPolyAll3Red = hqbData?.hrv ? null : null;

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
${ariVal != null ? `ARI (practitioner override): ${ariVal}` : ''}
NOTE: ARI, ELI, and Quadrant will be computed server-side from HRV values. Do NOT compute ARI or ELI yourself — just populate HRV values accurately.
${clinicalData?.chavita ? `Chavita: ${clinicalData.chavita} | Emvita: ${clinicalData.emvita || 'REQUIRED — MUST PAIR'}` : ''}
${clinicalData?.ermMethod ? `ERM Method: ${clinicalData.ermMethod}` : ''}
${clinicalData?.acuteRemedies ? `Acute Remedies: ${clinicalData.acuteRemedies}` : ''}
${clinicalData?.rjlPhaseAngle ? `RJL BIA — Phase Angle: ${clinicalData.rjlPhaseAngle} | ICW: ${clinicalData.rjlIcw || '?'} | ECW: ${clinicalData.rjlEcw || '?'} | TBW: ${clinicalData.rjlTbw || '?'}` : ''}
${clinicalData?.oxidativeStressScore ? `Oxidative Stress Test Score: ${clinicalData.oxidativeStressScore}` : ''}
${hqbData ? buildHqbDataBlock(hqbData) : ''}
TESTS PERFORMED THIS SESSION:
- Adrenal Urine Test: ${clinicalData?.adrenalTested ? `YES — Drop Count: ${clinicalData.adrenalDropCount ?? 'not entered'}${clinicalData.thyroidFunctionalIndex != null ? ` | Thyroid Functional Index: ${clinicalData.thyroidFunctionalIndex}` : ''} — interpret these values and include adrenal/thyroid findings` : 'NOT PERFORMED — set adrenalUrineDrops: null, adrenalInterpretation: null, adrenalSummary: null'}
- Brain Gauge Test: ${clinicalData?.brainGaugeTested && clinicalData?.brainGauge ? `YES — use these EXACT scores: Speed:${clinicalData.brainGauge.speed ?? 'N/A'} | Accuracy:${clinicalData.brainGauge.accuracy ?? 'N/A'} | Time Order Judgment:${clinicalData.brainGauge.timeOrderJudgment ?? 'N/A'} | Time Perception:${clinicalData.brainGauge.timePerception ?? 'N/A'} | Plasticity:${clinicalData.brainGauge.plasticity ?? 'N/A'} | Fatigue:${clinicalData.brainGauge.fatigue ?? 'N/A'} | Focus:${clinicalData.brainGauge.focus ?? 'N/A'} | Overall Cortical:${clinicalData.brainGauge.overallCorticalMetric ?? 'N/A'} — do NOT read from screenshots, use these numbers directly` : 'NOT PERFORMED — set brainGauge: null, brainGaugeSummary: null, neuroVizrPrograms: null'}
${customRules ? `\nCustom Clinical Rules:\n${customRules}\n` : ''}

EXTRACTION INSTRUCTIONS:
${hqbData ? `- HQB structured data is provided above. Use those EXACT values to populate all HRV markers (Heart Rate, SDNN, RMSSD, LF/HF Ratio, Total Power, Stress Index, VLF%, LF%, HF%). Do NOT read from screenshots for these values — the HQB data IS the device output.
- polyvagalAll3Red CANNOT be derived from HRV values. ${screenshots.length > 0 ? `READ the Polyvagal gauge sections from the screenshot(s) — set polyvagalAll3Red to 1 ONLY if ALL 3 Polyvagal gauges (Parasympathetic Activity, Energy Index, Poly-Vagal) are in the red zone.` : `No screenshots provided — set polyvagalAll3Red to 0 (cannot determine without visual Polyvagal gauges).`}` : `- ${screenshots.length > 0 ? `You are provided with ${screenshots.length} HQP screenshot(s). READ THE ACTUAL PIXEL VALUES FROM THESE SCREENSHOTS. Do NOT use example values, training data values, or "typical" values. Every HRV number must come from what you SEE in the images.` : 'No screenshots provided — generate report from practitioner-entered clinical data only.'}`}
${!hqbData ? `- The HQP screenshots show: (1) Card boxes with Heart Rate, SDNN, RMSSD, LF/HF Ratio and reference ranges beneath each value, (2) A pie chart showing VLF%, HF%, LF% with percentages labeled on each slice, (3) Gauge bars for Total Power, Stress Index, and Nervous System Balance Index with the exact numeric value shown, (4) Polyvagal section with Parasympathetic Activity, Energy Index, and Poly-Vagal values on gauge bars
- Extract ALL HRV markers, scores, and recommendations visible across all screenshots` : ''}
- SDNN and RMSSD must be interpreted separately — never combined
- Set filtrationWarning: true if filtrationRejections > 20
- Do NOT set eli, hrqEli, ari, or hrqAri — the server computes both ARI and ELI after HRV extraction
- Extract polyvagalAll3Red: set to 1 ONLY if ALL 3 Polyvagal gauge sections (Parasympathetic Activity, Energy Index, Poly-Vagal) are visually in the red zone on the HQP screenshot, else 0. Do NOT infer Polyvagal status from SDNN, RMSSD, or Total Power — these are unrelated
- Do NOT set crisgoldQuadrant — the server computes it from ARI + ELI
- CASP: only include if explicitly device-measured on the document — NEVER calculate it
- CRITICAL: Include ALL 6 therapeutic categories in therapeuticSelections — EVERY category MUST have at least 1-3 product recommendations. Format each as "Product — Dose (Brand)". NEVER leave any category as an empty array []. Use the quadrant to guide product selection.
- Drainage must always be populated first with quadrant-specific protocols
- If Chavita and Emvita numbers were provided, write the EXACT Rubimed practitioner manual description for each using the conflict names from the system prompt
- CRITICAL: Your aiSummary MUST use the EXACT same numbers as your hrvMarkers array. If hrvMarkers shows Total Power: 106, your aiSummary must say "Total Power 106ms²" — not any other number.
- Write aiSummary as a clinician-facing summary (3-5 sentences, specific values from screenshots)
- Write patientFriendlySummary in plain language (2-3 sentences)
- Return ONLY valid JSON, no other text`;

    // Build image content blocks for each screenshot
    // Use 'auto' detail — GPT-4o picks low/high based on image size.
    // Images are pre-compressed to 1200px client-side for faster processing.
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
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: false, error: 'Failed to parse AI response as JSON', rawResponse: rawText }),
      };
    }

    // ── ENFORCE locked values from form data (server-side, AI cannot override) ──
    if (pp != null)        { parsed.pulsePressure = pp; }

    // ── Normalize AI-extracted HRV %: if AI returned decimal (0.14) instead of % (14), fix it ──
    if (Array.isArray(parsed.hrvMarkers)) {
      for (const m of parsed.hrvMarkers) {
        if (['VLF%', 'LF%', 'HF%'].includes(m.name) && m.value != null && m.value > 0 && m.value < 1) {
          m.value = Math.round(m.value * 100);
        }
      }
    }

    // ── When HQB data present, enforce HRV marker values from device (overrides AI extraction) ──
    if (hqbData?.hrv) {
      const h = hqbData.hrv;
      const markerOverrides = [
        { name: 'Heart Rate', value: h.meanHr,     unit: 'bpm',  low: 60,   high: 84 },
        { name: 'SDNN',       value: h.sdnn,        unit: 'ms',   low: 49,   high: 70 },
        { name: 'RMSSD',      value: h.rmssd,       unit: 'ms',   low: 25,   high: 50 },
        { name: 'LF/HF Ratio',value: h.lfHfRatio,   unit: '',     low: 1.0,  high: 3.0 },
        { name: 'Total Power', value: h.totalPower,  unit: 'ms²',  low: 1500, high: 3500 },
        { name: 'Stress Index',value: h.stressIndex, unit: '',     low: 10,   high: 100 },
        { name: 'VLF%',        value: h.vlfPct,      unit: '%',    low: 25,   high: 40 },
        { name: 'LF%',         value: h.lfPct,       unit: '%',    low: 40,   high: 55 },
        { name: 'HF%',         value: h.hfPct,       unit: '%',    low: 30,   high: 50 },
      ].filter(m => m.value != null);

      if (markerOverrides.length > 0) {
        const statusOf = (v, lo, hi) => v < lo ? 'low' : v > hi ? 'high' : 'normal';
        if (!Array.isArray(parsed.hrvMarkers)) parsed.hrvMarkers = [];
        for (const mo of markerOverrides) {
          // Normalize: if % value looks like a decimal (e.g. 0.14 instead of 14), multiply by 100
          if (['VLF%', 'LF%', 'HF%'].includes(mo.name) && mo.value != null && mo.value > 0 && mo.value < 1) {
            mo.value = Math.round(mo.value * 100);
          }
          const idx = parsed.hrvMarkers.findIndex(m => m.name === mo.name);
          const status = statusOf(mo.value, mo.low, mo.high);
          if (idx >= 0) {
            parsed.hrvMarkers[idx].value = mo.value;
            parsed.hrvMarkers[idx].status = status;
          } else {
            parsed.hrvMarkers.push({ name: mo.name, value: mo.value, unit: mo.unit, low: mo.low, high: mo.high, status, clinicalNote: '' });
          }
        }
      }
    }
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
      // Polyvagal is determined by the AI from screenshots (not from HRV values).
      // hqbPolyAll3Red is always null — the AI sets polyvagalAll3Red in its response.

      // Prefer HQB values for computation (more reliable than AI screenshot extraction)
      // Normalize % values: if AI returned decimal (0.14) instead of percentage (14), multiply by 100
      const normPct = (v) => (v != null && v > 0 && v < 1) ? Math.round(v * 100) : v;
      const extractedVLF  = normPct(hqbData?.hrv?.vlfPct     ?? parsed.hrvMarkers?.find(m => m.name === 'VLF%')?.value);
      const extractedTP   = hqbData?.hrv?.totalPower  ?? parsed.hrvMarkers?.find(m => m.name === 'Total Power')?.value;
      const extractedSI   = hqbData?.hrv?.stressIndex ?? parsed.hrvMarkers?.find(m => m.name === 'Stress Index')?.value;
      const extractedSDNN = hqbData?.hrv?.sdnn        ?? parsed.hrvMarkers?.find(m => m.name === 'SDNN')?.value;
      const extractedRMSSD= hqbData?.hrv?.rmssd       ?? parsed.hrvMarkers?.find(m => m.name === 'RMSSD')?.value;
      const extractedHF   = normPct(hqbData?.hrv?.hfPct       ?? parsed.hrvMarkers?.find(m => m.name === 'HF%')?.value);
      const extractedLF   = normPct(hqbData?.hrv?.lfPct       ?? parsed.hrvMarkers?.find(m => m.name === 'LF%')?.value);
      const polyAll3Red   = parsed.polyvagalAll3Red ?? 0;

      // ── COMPUTE ARI (Autonomic Regulation Index) — REVISED v1.0 ──────────
      // ARI = (SDNN_score×0.30) + (RMSSD_score×0.25) + (TP_score×0.25) + (HF_score×0.10) + (LF_score×0.10)
      // Guardrails: TP<600→≤50, SDNN<25 AND RMSSD<20→≤40, TP<300→≤30
      let computedARI = null;
      if (extractedSDNN != null && extractedRMSSD != null && extractedTP != null) {
        const sdnnScore  = Math.min(100, (extractedSDNN / 70) * 100);
        const rmssdScore = Math.min(100, (extractedRMSSD / 50) * 100);
        const tpScore    = Math.min(100, (extractedTP / 3500) * 100);
        const hfScore    = extractedHF != null ? Math.max(0, 100 - (Math.abs(extractedHF - 27) / 27) * 100) : 0;
        const lfScore    = extractedLF != null ? Math.max(0, 100 - (Math.abs(extractedLF - 47) / 47) * 100) : 0;

        let rawARI = (sdnnScore * 0.30) + (rmssdScore * 0.25) + (tpScore * 0.25) + (hfScore * 0.10) + (lfScore * 0.10);

        // Apply guardrails (lowest cap wins)
        let ariCap = 100;
        if (extractedTP < 600)                            ariCap = Math.min(ariCap, 50);  // Guardrail A
        if (extractedSDNN < 25 && extractedRMSSD < 20)   ariCap = Math.min(ariCap, 40);  // Guardrail B
        if (extractedTP < 300)                            ariCap = Math.min(ariCap, 30);  // Guardrail C

        computedARI = Math.round(Math.max(0, Math.min(100, Math.min(rawARI, ariCap))));
      }

      // Use computed ARI, fall back to practitioner-entered ARI if HRV values unavailable
      const finalARI = computedARI ?? (ariVal != null ? ariVal : null);
      if (finalARI != null) {
        parsed.ari = finalARI;
        parsed.hrqAri = finalARI;
      }

      // Compute ELI if we have at least one HRV input or questionnaire
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

        // Quadrant: REVISED thresholds — ELI ≥ 40 = High, ARI ≥ 70 = High
        if (finalARI != null) {
          const highELI = computedELI >= 40;
          const highARI = finalARI >= 70;
          if (highELI && !highARI)       parsed.crisgoldQuadrant = 'Q1';
          else if (highELI && highARI)   parsed.crisgoldQuadrant = 'Q2';
          else if (!highELI && !highARI) parsed.crisgoldQuadrant = 'Q3';
          else                           parsed.crisgoldQuadrant = 'Q4';
        }
      }
    }
    // ARI computed server-side from HRV values; quadrant from ELI + ARI

    // ── Enforce adrenal + Brain Gauge values from form (overrides AI) ─────────
    if (clinicalData?.adrenalTested) {
      if (clinicalData.adrenalDropCount != null) {
        const drops = Number(clinicalData.adrenalDropCount);
        parsed.adrenalUrineDrops = drops;
        // Hyperadrenal Pattern — server-side locked interpretation (verbatim clinical text)
        if (drops <= 5) {
          parsed.adrenalInterpretation = 'Hyperadrenal Pattern';
          parsed.adrenalSummary = `Drop count of ${drops} — Hyperadrenal Pattern detected. A very low drop count indicates increased adrenal stress hormone output and heightened sympathetic activation, commonly seen with chronic stress, anxiety, restlessness, and difficulty relaxing.${parsed.adrenalSummary && !parsed.adrenalSummary.includes('Hyperadrenal') ? ' ' + parsed.adrenalSummary : ''}`;
        } else if (drops >= 15) {
          parsed.adrenalInterpretation = parsed.adrenalInterpretation || 'Hypoadrenal Pattern';
        } else {
          parsed.adrenalInterpretation = parsed.adrenalInterpretation || 'Normal Adrenal Function';
        }
      }
      if (clinicalData.thyroidFunctionalIndex != null) parsed.thyroidFunctionalIndex = clinicalData.thyroidFunctionalIndex;
    }
    if (clinicalData?.brainGaugeTested && clinicalData?.brainGauge) {
      parsed.brainGauge = { ...clinicalData.brainGauge };
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
        // Build breakdown object with notes from AI (if available) + server scores
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
      // neuroVizrPrograms is NOT nulled here — it works with quadrant + HQP alone
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
    // Build psychosomaticFindings from hardcoded texts
    if (clinicalData?.chavita && clinicalData?.emvita) {
      const ct = CHAVITA_TEXTS[clinicalData.chavita];
      const et = EMVITA_TEXTS[clinicalData.emvita];
      if (ct && et) {
        parsed.psychosomaticFindings = `${ct}\n\n${et}`;
      }
    }
    // Polyvagal: BINARY ONLY — based on 3 Polyvagal gauge sections from HQP (NOT SDNN/RMSSD/TP)
    // The AI extracts polyvagalAll3Red from the Polyvagal gauge sections in the screenshot
    const polyAll3RedFinal = parsed.polyvagalAll3Red ?? 0;
    parsed.polyvagalRuleOf3Met = polyAll3RedFinal === 1;
    if (!parsed.polyvagalRuleOf3Met) {
      // Not all 3 red — do NOT show any polyvagal interpretation
      parsed.polyvagalInterpretation = null;
    } else {
      // All 3 red — show freeze message (AI may have already set this, or use default)
      parsed.polyvagalInterpretation = parsed.polyvagalInterpretation ||
        'All three Polyvagal gauge sections (Parasympathetic Activity, Energy Index, Poly-Vagal) are in the red zone — true dorsal vagal freeze physiology detected. This contributes 30 points to the ELI score.';
    }

    // ── THERAPEUTIC PRIORITY ENGINE (deterministic ordering) ───────────
    {
      const tpCriScore     = parsed.criScore;
      const tpTotalPower   = parsed.hrvMarkers?.find(m => m.name === 'Total Power')?.value;
      const tpStressIndex  = parsed.hrvMarkers?.find(m => m.name === 'Stress Index')?.value;
      const tpPolyFreeze   = parsed.polyvagalRuleOf3Met || false;
      const tpQuadrant     = parsed.crisgoldQuadrant || 'Q3';

      // Red flag detection
      const redFlags = [];
      if (tpCriScore != null && tpCriScore >= 8) {
        redFlags.push({ category: 'cardiovascularSupport', reason: `Priority elevated: CRI score of ${tpCriScore} indicates significant cardiovascular stress`, type: 'cardiovascular' });
      }
      if (tpStressIndex != null && tpStressIndex > 300) {
        redFlags.push({ category: 'cardiovascularSupport', reason: `Priority elevated: Stress Index of ${Math.round(tpStressIndex)} indicates extreme sympathetic activation`, type: 'sympathetic' });
      }
      if (tpTotalPower != null && tpTotalPower < 400) {
        redFlags.push({ category: 'mitochondrialSupport', reason: `Priority elevated: Total Power of ${Math.round(tpTotalPower)} indicates severely depleted autonomic reserve`, type: 'energy' });
      }
      if (tpPolyFreeze) {
        redFlags.push({ category: 'cardiovascularSupport', reason: 'Polyvagal Freeze detected — dorsal vagal shutdown physiology present', type: 'freeze' });
      }

      // Primary risk banner
      let primaryRisk = null;
      if (redFlags.some(f => f.type === 'cardiovascular'))  primaryRisk = 'Cardiovascular Stress';
      else if (redFlags.some(f => f.type === 'sympathetic')) primaryRisk = 'Extreme Sympathetic Activation';
      else if (redFlags.some(f => f.type === 'energy'))      primaryRisk = 'Severe Energy Depletion';
      else if (redFlags.some(f => f.type === 'freeze'))      primaryRisk = 'Polyvagal Freeze / Dorsal Vagal Shutdown';

      // Quadrant default orders
      const qDefaults = {
        Q1: ['cardiovascularSupport', 'neurocognitiveSupport', 'cellMembraneSupport', 'mitochondrialSupport', 'oxidativeStressSupport'],
        Q2: ['cardiovascularSupport', 'oxidativeStressSupport', 'cellMembraneSupport', 'mitochondrialSupport', 'neurocognitiveSupport'],
        Q3: ['cardiovascularSupport', 'mitochondrialSupport', 'cellMembraneSupport', 'neurocognitiveSupport', 'oxidativeStressSupport'],
        Q4: ['cellMembraneSupport', 'mitochondrialSupport', 'neurocognitiveSupport', 'cardiovascularSupport', 'oxidativeStressSupport'],
      };
      const catMeta = {
        drainage:              { label: 'Drainage (Foundation)',         icon: '🚿' },
        cardiovascularSupport: { label: 'Cardiovascular Stabilization', icon: '💓' },
        cellMembraneSupport:   { label: 'Cell Membrane Restoration',    icon: '🧬' },
        mitochondrialSupport:  { label: 'Mitochondrial Energy Support', icon: '⚡' },
        neurocognitiveSupport: { label: 'Neurocognitive Support',       icon: '🧠' },
        oxidativeStressSupport:{ label: 'Oxidative Stress Support',     icon: '⚗️' },
      };

      const defaultOrder = qDefaults[tpQuadrant] || qDefaults.Q3;
      const flaggedCats = [...new Set(redFlags.map(f => f.category))];
      const flagPriority = ['cardiovascularSupport', 'mitochondrialSupport', 'neurocognitiveSupport'];
      const sortedFlags = flaggedCats.sort((a, b) => flagPriority.indexOf(a) - flagPriority.indexOf(b));
      const remaining = defaultOrder.filter(k => !sortedFlags.includes(k));
      const orderedKeys = [...sortedFlags, ...remaining];

      const reasonMap = {};
      for (const f of redFlags) {
        if (!reasonMap[f.category]) reasonMap[f.category] = [];
        reasonMap[f.category].push(f.reason);
      }

      parsed.therapeuticPriorities = {
        priorities: [
          { priority: 1, key: 'drainage', ...catMeta.drainage, reason: 'Always first — prepares lymphatic, liver, and kidney clearance before other therapies', isRedFlag: false },
          ...orderedKeys.map((key, idx) => ({
            priority: idx + 2,
            key,
            ...catMeta[key],
            reason: reasonMap[key] ? reasonMap[key].join('. ') : `${catMeta[key].label} — ${tpQuadrant} default sequence`,
            isRedFlag: !!reasonMap[key],
          })),
        ],
        redFlags,
        primaryRisk,
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: parsed }),
    };
  } catch (err) {
    console.error('analyze-report error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal server error' }),
    };
  }
};
