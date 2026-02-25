/**
 * MedAnalytica / CRIS GOLD™ — Netlify Serverless Function
 * POST /.netlify/functions/analyze-report
 *
 * Receives a base64-encoded report file (PDF or image),
 * sends it to OpenAI GPT-4o with the full CRIS GOLD™ extraction prompt,
 * returns a structured JSON report covering all 9 CRIS sections.
 *
 * The OpenAI API key never touches the browser.
 */

import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are the CRIS GOLD™ clinical extraction AI for MedAnalytica.
Your job is to analyze uploaded HRV test results and lab reports, then extract ALL structured clinical data.

You MUST respond with valid JSON only — no markdown fences, no prose outside the JSON object.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRIS GOLD™ REFERENCE KNOWLEDGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HRV MARKER REFERENCE RANGES:
- Heart Rate:   60–84 bpm     (optimal resting)
- SDNN:         49–70 ms      (overall HRV / autonomic resilience)
- RMSSD:        25–50+ ms     (parasympathetic / recovery capacity)
- LF/HF Ratio:  1.0–3.0       (sympathovagal balance; >3 = sympathetic dominance)
- Total Power:  1500–3500 ms² (overall energy reserve)
- Stress Index: 10–100        (autonomic load; >100 = elevated)
- VLF%:         25–40%        (chronic emotional/neurohormonal load; >45% = elevated)
- HF%:          30–50%        (parasympathetic tone; <25% = low)
- LF%:          30–50%        (sympathetic drive; >55% = elevated)

CRIS GOLD™ QUADRANT CLASSIFICATION (based on ELI + ARI):
- Q1: High Emotional Load + Low Autonomic Resilience  → "Stress Dominant / Exhausted System"
- Q2: High Emotional Load + High Autonomic Resilience → "Regulated but Stressed"
- Q3: Low Emotional Load + Low Autonomic Resilience   → "Fatigue Dominant / Depleted"
- Q4: Low Emotional Load + High Autonomic Resilience  → "Balanced / Optimal"

ELI (Emotional Load Index): derived from VLF% + Stress Index + SDNN (high VLF, high Stress, low SDNN = high ELI)
ARI (Autonomic Regulation Index): derived from SDNN + RMSSD + Total Power (higher = better regulation)
Score ELI and ARI on a 0–100 scale. Threshold: >50 = High ELI, >50 = High ARI.

CARDIOVASCULAR (CV) QUADRANT (based on Blood Pressure / Pulse Pressure / LF%):
- Q1: Parasympathetic dominant, Low vascular load
- Q2: Vascular-Cardio stress (high PP, high LF%, stiff vessels)
- Q3: Energy Reserve / Resilience-Fatigue (depleted but low load)
- Q4: Autonomic-Stress pattern (sympathetic overdrive)

CRI SCORE (Cardiovascular Risk Index, 0–12):
- 0–2:  Low Vascular Load
- 3–5:  Mild Strain
- 6–8:  High Cardiovascular Stress Pattern
- 9–12: Critical Cardiovascular Risk
Derive CRI from: Pulse Pressure, LF%, SDNN, Stress Index, Resting HR, Total Power.

POLYVAGAL RULE OF 3:
All THREE of these must simultaneously be in the red zone for a true dorsal vagal freeze pattern:
1. SDNN < 20 ms
2. RMSSD < 15 ms
3. Total Power < 200 ms²
If all 3 met: "TRUE FREEZE — dorsal vagal shutdown physiology"
If NOT all 3 met: "Exhausted/stressed system — NOT true freeze. Focus on stabilization."

BRAIN GAUGE REFERENCE RANGES (Cortical Performance):
- Speed:               >40 (optimal >70)
- Accuracy:            >70 (optimal >85)
- Time Order Judgment: >20 (optimal >50)
- Time Perception:     >70 (optimal >85)
- Plasticity:          >50 (optimal >70)
- Fatigue:             >30 (low number = high fatigue; optimal >60)
- Focus:               >60 (optimal >75)
- Overall Cortical:    >50 (optimal >70)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JSON RESPONSE SCHEMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return ALL fields. Use null for any that cannot be extracted from the document.

{
  "reportType": "CRIS GOLD HRV" | "CBC" | "Lipid Panel" | "Thyroid" | "Metabolic" | "Other",

  "patientName": string | null,
  "patientAge": number | null,
  "bloodPressure": string | null,
  "pulsePressure": string | null,
  "chiefComplaints": string | null,

  "criScore": number | null,
  "criCategory": "Low Vascular Load" | "Mild Strain" | "High Cardiovascular Stress Pattern" | "Critical Cardiovascular Risk" | null,

  "crisgoldQuadrant": "Q1" | "Q2" | "Q3" | "Q4" | null,
  "crisgoldQuadrantLabel": string | null,
  "crisgoldQuadrantDescription": string | null,

  "hrqAri": number | null,
  "hrqEli": number | null,
  "cvQuadrant": "Q1" | "Q2" | "Q3" | "Q4" | null,
  "cvQuadrantLabel": string | null,
  "cvQuadrantDescription": string | null,

  "hrvMarkers": [
    {
      "name": string,
      "value": number,
      "unit": string,
      "low": number,
      "high": number,
      "status": "normal" | "high" | "low",
      "clinicalNote": string
    }
  ],
  "hrvSummary": string | null,

  "polyvagalRuleOf3Met": boolean | null,
  "polyvagalInterpretation": string | null,

  "adrenalUrineDrops": number | null,
  "adrenalInterpretation": string | null,
  "thyroidFunctionalIndex": number | null,
  "adrenalSummary": string | null,

  "brainGauge": {
    "speed": number | null,
    "accuracy": number | null,
    "timeOrderJudgment": number | null,
    "timePerception": number | null,
    "plasticity": number | null,
    "fatigue": number | null,
    "focus": number | null,
    "overallCorticalMetric": number | null
  } | null,
  "brainGaugeSummary": string | null,

  "therapeuticSelections": {
    "drainage": string[],
    "cellMembraneSupport": string[],
    "mitochondrialSupport": string[],
    "neurocognitiveSupport": string[],
    "cardiovascularSupport": string[]
  } | null,

  "neuroVizrPrograms": {
    "brainGymFoundation": string[],
    "quadrantPrograms": string[]
  } | null,

  "psychosomaticFindings": string | null,

  "markers": [
    {
      "name": string,
      "value": number,
      "unit": string,
      "low": number,
      "high": number,
      "status": "normal" | "high" | "low",
      "clinicalNote": string
    }
  ],

  "aiSummary": string,
  "patientFriendlySummary": string | null,
  "overallStatus": "normal" | "warning" | "critical",
  "recommendedFollowUp": string | null,
  "extractionConfidence": "high" | "medium" | "low"
}`;

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { fileBase64, fileType, reportType, patientInfo, customRules } = body;

    if (!fileBase64) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'fileBase64 is required' }) };
    }

    const isPDF = fileType?.includes('pdf');
    const mediaType = isPDF
      ? 'application/pdf'
      : fileType?.includes('png')
      ? 'image/png'
      : (fileType?.includes('jpg') || fileType?.includes('jpeg'))
      ? 'image/jpeg'
      : 'image/png';

    const userPromptText = `Analyze this CRIS GOLD™ / HRV / lab report and extract all clinical data into the required JSON format.

Report Type (if known): ${reportType || 'Determine from document'}
Patient: ${patientInfo?.firstName || ''} ${patientInfo?.lastName || ''}, ${patientInfo?.gender || ''}, DOB: ${patientInfo?.dob || 'Unknown'}
${customRules ? `\nCustom Clinical Rules:\n${customRules}\n` : ''}

Instructions:
- Extract EVERY marker, score, and recommendation present in the document
- Calculate CRIS GOLD™ Quadrant (Q1-Q4) from ELI/ARI
- Calculate CRI score (0-12) from cardiovascular markers
- Apply Polyvagal Rule of 3
- If therapeutic selections appear in the document, include them
- If NeuroVIZR programs are listed, include them
- Write the aiSummary as a concise clinician-facing summary (3-5 sentences)
- Write patientFriendlySummary in plain language (2-3 sentences)
- Return ONLY valid JSON, no other text`;

    // Build the content array for GPT-4o
    let fileContent;
    if (isPDF) {
      // GPT-4o supports PDF via file content type
      fileContent = {
        type: 'file',
        file: {
          filename: 'report.pdf',
          file_data: `data:application/pdf;base64,${fileBase64}`,
        },
      };
    } else {
      // Images sent as base64 via image_url
      fileContent = {
        type: 'image_url',
        image_url: {
          url: `data:${mediaType};base64,${fileBase64}`,
          detail: 'high',
        },
      };
    }

    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 6000,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'text', text: userPromptText },
            fileContent,
          ],
        },
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
        body: JSON.stringify({ success: false, error: 'Failed to parse response as JSON', rawResponse: rawText }),
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
