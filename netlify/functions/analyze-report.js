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

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are CRIS GOLD™ AI — a licensed clinical decision-support and reporting system for authorized HQP practitioners.

You do NOT diagnose, prescribe, or replace practitioner judgment. All outputs are suggestive only.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE OPERATING PRINCIPLES (LOCKED v1.0)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Structured extraction only — no guessing.
2. No report generation without required inputs.
3. CASP is NEVER calculated — only included if device-measured on the document.
4. Chavita + Emvita are always paired — never one without the other.
5. Acute remedies only if tested (questionnaire, muscle test, or arm-length test).
6. Drainage is ALWAYS the first therapeutic priority in all programs.
7. If HQP filtration rejections > 20 — flag stimulant interference warning in aiSummary.
8. ARI is entered directly by the practitioner from the HQP device (0–100 integer).
9. ELI is calculated ONLY from the Stress Index Questionnaire score (formula: round((score / 40) × 100)).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUADRANT DETERMINISM (LOCKED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ELI (Emotional Load Index):
  Formula: ELI = round((Questionnaire Score / 40) × 100)
  High ELI = Questionnaire Score ≥ 20 (ELI ≥ 50)
  Low ELI  = Questionnaire Score ≤ 19 (ELI < 50)

ARI (Autonomic Regulation Index):
  Entered directly from HQP device (0–100 integer)
  High ARI = ARI ≥ 60
  Low ARI  = ARI ≤ 59

Quadrant Assignment:
  Q1: High ELI + Low ARI  → "Overloaded & Dysregulated"       (sub: Stress Dominant / Exhausted)
  Q2: High ELI + High ARI → "High Load / Resilient"            (sub: Regulated but Stressed)
  Q3: Low ELI  + Low ARI  → "Physiological Exhaustion"         (sub: Fatigue Dominant / Depleted)
  Q4: Low ELI  + High ARI → "Optimal / Strong Regulation"      (sub: Balanced / Optimal)

If the practitioner has provided Questionnaire Score AND ARI, use the formula above to determine the quadrant — this is LOCKED and cannot be overridden by visual interpretation of the document.

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
CARDIOVASCULAR ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pulse Pressure (PP) = SBP − DBP
CASP: NEVER calculate — only record if explicitly device-measured on the document.

CV Quadrant (based on PP, LF%, vascular markers):
- Q1: Parasympathetic dominant, low vascular load
- Q2: Vascular-Cardio stress (high PP, high LF%, stiff vessels)
- Q3: Energy Reserve / Resilience-Fatigue (depleted, low load)
- Q4: Autonomic-Stress pattern (sympathetic overdrive)

CRI Score (Cardiovascular Risk Index, 0–12):
  0–2:  Low Vascular Load
  3–5:  Mild Strain
  6–8:  High Cardiovascular Stress Pattern
  9–12: Critical Cardiovascular Risk
  Derive from: Pulse Pressure, LF%, SDNN, Stress Index, Resting HR, Total Power.

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
THERAPEUTIC CATEGORIES (6 REQUIRED — ALL DISPLAYED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Drainage (ALWAYS first — foundational)
   Primary vendors: Bioresource/Pekana, Unda, Physica Energetics, Marco Pharma
   - Q1: Mundipur 1-2 tsp; Stress Buster Kit if high ELI
   - Q2: Stress Buster Kit + Detox Kit (Apo-HEPAT, RENELIX, ITIRES)
   - Q3: Neu-regen 1-2 tsp 2x/day; JUVE-CAL 1 tsp 3-4x/day
   - Q4: Full Detox Kit + TOXEX (start at 1-5 drops, work up)

2. Cell Membrane Support
   Addresses: phospholipid integrity, receptor sensitivity, ion channel function

3. Mitochondrial Support
   Addresses: ATP production, electron transport chain, NAD+/NADH, oxidative stress

4. Neuro-Cognitive Support
   Addresses: neurotransmitter balance, synaptic plasticity, BDNF, neuroinflammation

5. Oxidative Stress Support
   Addresses: free radical burden, antioxidant capacity, membrane protection

6. Vascular / Cardiovascular Support
   Addresses: endothelial NO signaling, arterial stiffness, microcirculation

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

PSE is a method developed by Dr. Reimar Banis & Dr. Birgitt Holschuh-Lorang addressing repressed emotional traumas (conflicts) that store life energy and block its normal flow. Four energy levels tested: Vital, Emotional, Mental, Causal.

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
  "eli": number | null,
  "ari": number | null,
  "hrqEli": number | null,
  "hrqAri": number | null,

  "criScore": number | null,
  "criCategory": "Low Vascular Load" | "Mild Strain" | "High Cardiovascular Stress Pattern" | "Critical Cardiovascular Risk" | null,

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

export const handler = async (event) => {
  const securityHeaders = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || 'https://medanalytica-cris.netlify.app',
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

    // ── Sanitize clinical inputs ───────────────────────────────────────────
    if (body.clinicalData) {
      const cd = body.clinicalData;
      cd.questionnaireScore  = cd.questionnaireScore  != null ? sanitizeNumber(cd.questionnaireScore, 0, 40)     : null;
      cd.ari                 = cd.ari                 != null ? sanitizeNumber(cd.ari, 0, 100)                   : null;
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
    // screenshots: array of base64 image strings (PNG/JPG/TIFF)

    // Pre-compute ELI and quadrant from form data (LOCKED logic)
    let lockedELI = null, lockedQuadrant = null;
    const qScore = clinicalData?.questionnaireScore;
    const ariVal = clinicalData?.ari;
    if (qScore != null) {
      lockedELI = Math.round((qScore / 40) * 100);
    }
    if (lockedELI != null && ariVal != null) {
      const highELI = qScore >= 20;
      const highARI = ariVal >= 60;
      if (highELI && !highARI)  lockedQuadrant = 'Q1';
      else if (highELI && highARI) lockedQuadrant = 'Q2';
      else if (!highELI && !highARI) lockedQuadrant = 'Q3';
      else lockedQuadrant = 'Q4';
    }

    const sbp = clinicalData?.sbp;
    const dbp = clinicalData?.dbp;
    const pp  = sbp && dbp ? sbp - dbp : null;

    const userPromptText = `Analyze this CRIS GOLD™ / HRV / lab report and extract all clinical data into the required JSON format.

PRACTITIONER-ENTERED DATA (treat as ground truth — do not contradict):
Patient: ${patientInfo?.firstName || ''} ${patientInfo?.lastName || ''}, ${patientInfo?.gender || ''}, DOB: ${patientInfo?.dob || 'Not provided'}
Report Type: ${reportType || 'Determine from document'}
${sbp ? `SBP: ${sbp} mmHg` : ''}${dbp ? ` | DBP: ${dbp} mmHg` : ''}${pp ? ` | Pulse Pressure: ${pp} mmHg` : ''}
${clinicalData?.filtrationRejections != null ? `Filtration Rejections: ${clinicalData.filtrationRejections}${clinicalData.filtrationRejections > 20 ? ' ⚠️ EXCEEDS 20 — FLAG STIMULANT WARNING' : ''}` : ''}
${qScore != null ? `Stress Index Questionnaire Score: ${qScore} / 40` : ''}
${lockedELI != null ? `ELI (calculated from score): ${lockedELI} — ${qScore >= 20 ? 'HIGH ELI' : 'LOW ELI'}` : ''}
${ariVal != null ? `ARI (from HQP device): ${ariVal} — ${ariVal >= 60 ? 'HIGH ARI' : 'LOW ARI'}` : ''}
${lockedQuadrant ? `QUADRANT (LOCKED — do not override): ${lockedQuadrant}` : ''}
${clinicalData?.chavita ? `Chavita: ${clinicalData.chavita} | Emvita: ${clinicalData.emvita || 'REQUIRED — MUST PAIR'}` : ''}
${clinicalData?.ermMethod ? `ERM Method: ${clinicalData.ermMethod}` : ''}
${clinicalData?.acuteRemedies ? `Acute Remedies: ${clinicalData.acuteRemedies}` : ''}
${clinicalData?.rjlPhaseAngle ? `RJL BIA — Phase Angle: ${clinicalData.rjlPhaseAngle} | ICW: ${clinicalData.rjlIcw || '?'} | ECW: ${clinicalData.rjlEcw || '?'} | TBW: ${clinicalData.rjlTbw || '?'}` : ''}
${clinicalData?.oxidativeStressScore ? `Oxidative Stress Test Score: ${clinicalData.oxidativeStressScore}` : ''}
${customRules ? `\nCustom Clinical Rules:\n${customRules}\n` : ''}

EXTRACTION INSTRUCTIONS:
- ${screenshots.length > 0 ? `You are provided with ${screenshots.length} HQP screenshot(s). Read ALL of them together to extract the complete clinical picture.` : 'No screenshots provided — generate report from practitioner-entered clinical data only.'}
- Extract ALL HRV markers, scores, and recommendations visible across all screenshots
- SDNN and RMSSD must be interpreted separately — never combined
- Set filtrationWarning: true if filtrationRejections > 20
- Set eli and hrqEli to the LOCKED calculated value if questionnaire score was provided
- Set ari and hrqAri to the practitioner-entered ARI if provided
- Set crisgoldQuadrant to the LOCKED value if provided above
- CASP: only include if explicitly device-measured on the document — NEVER calculate it
- Include ALL 6 therapeutic categories in therapeuticSelections (use [] for empty)
- Drainage must always be populated first
- If Chavita and Emvita numbers were provided, write the full Rubimed practitioner manual description for each
- Write aiSummary as a clinician-facing summary (3-5 sentences, specific values)
- Write patientFriendlySummary in plain language (2-3 sentences)
- Return ONLY valid JSON, no other text`;

    // Build image content blocks for each screenshot
    const imageBlocks = screenshots.map(b64 => ({
      type: 'image_url',
      image_url: { url: `data:image/png;base64,${b64}`, detail: 'high' },
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

    // Enforce locked values from form data
    if (lockedELI != null) { parsed.eli = lockedELI; parsed.hrqEli = lockedELI; }
    if (ariVal != null)    { parsed.ari = ariVal;    parsed.hrqAri = ariVal; }
    if (lockedQuadrant)    { parsed.crisgoldQuadrant = lockedQuadrant; }
    if (pp != null)        { parsed.pulsePressure = pp; }
    if (clinicalData?.filtrationRejections != null) {
      parsed.filtrationRejections = clinicalData.filtrationRejections;
      parsed.filtrationWarning = clinicalData.filtrationRejections > 20;
    }
    if (clinicalData?.chavita) parsed.chavita = clinicalData.chavita;
    if (clinicalData?.emvita)  parsed.emvita  = clinicalData.emvita;
    if (clinicalData?.ermMethod) parsed.ermMethod = clinicalData.ermMethod;

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
