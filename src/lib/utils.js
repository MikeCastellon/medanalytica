export const ini = (name = '') =>
  name.split(' ').map((x) => x[0]).join('').toUpperCase().slice(0, 2);

export const age = (dob) => {
  if (!dob) return '—';
  return new Date().getFullYear() - new Date(dob).getFullYear();
};

export const tod = () =>
  new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const fmtDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

/** Compress an image File to JPEG, max 1600px wide, to stay under Netlify's 6 MB payload limit */
export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    // PDFs and non-image files: send as-is
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const MAX_W = 1200;
      const MAX_H = 1200;
      let w = img.width, h = img.height;
      if (w > MAX_W) { h = Math.round(h * MAX_W / w); w = MAX_W; }
      if (h > MAX_H) { w = Math.round(w * MAX_H / h); h = MAX_H; }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      // Quality 0.7 — still readable for HQP values, much smaller payload
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      resolve(dataUrl.split(',')[1]);
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });

/** CRI-HQP score → color + category */
export const criMeta = (score) => {
  if (score === null || score === undefined) return { color: '#8896aa', bg: '#eef1f5', label: 'N/A' };
  if (score <= 2)  return { color: '#0e7a55', bg: '#e6f5ef', label: 'Low Vascular Load' };
  if (score <= 5)  return { color: '#b45309', bg: '#fef3e2', label: 'Mild Autonomic/Vascular Strain' };
  if (score <= 8)  return { color: '#c0392b', bg: '#fdecea', label: 'Moderate Cardiovascular Risk Pattern' };
  return            { color: '#7b1111', bg: '#fdecea', label: 'High Cardiovascular Stress Pattern' };
};

/** CRI-HQP per-parameter breakdown labels */
export const CRI_BREAKDOWN_PARAMS = [
  { key: 'pulsePressure', label: 'Pulse Pressure',    unit: 'mmHg' },
  { key: 'lfPercent',     label: 'LF%',               unit: '%' },
  { key: 'vlfPercent',    label: 'VLF%',              unit: '%' },
  { key: 'stressIndex',   label: 'Stress Index',      unit: '' },
  { key: 'totalPower',    label: 'Total Power',       unit: 'ms²' },
  { key: 'sdnn',          label: 'SDNN',              unit: 'ms' },
];

/**
 * Server-side CRI-HQP scoring (deterministic — no AI ambiguity).
 * Each parameter scores 0–2 pts. Total 0–12.
 * Boundary values go to the HIGHER severity score (conservative for patient safety).
 */
export const computeCRI = ({ pulsePressure, lfPercent, vlfPercent, stressIndex, totalPower, sdnn } = {}) => {
  const scorePP = (v) => { if (v == null) return null; if (v < 40) return 0; if (v <= 60) return 1; return 2; };
  const scoreLF = (v) => { if (v == null) return null; if (v >= 50) return 0; if (v >= 40) return 1; return 2; };
  const scoreVLF = (v) => { if (v == null) return null; if (v < 35) return 0; if (v <= 45) return 1; return 2; };
  const scoreSI = (v) => { if (v == null) return null; if (v < 40) return 0; if (v <= 80) return 1; return 2; };
  const scoreTP = (v) => { if (v == null) return null; if (v >= 1500) return 0; if (v >= 1000) return 1; return 2; };
  const scoreSDNN = (v) => { if (v == null) return null; if (v >= 49) return 0; if (v >= 40) return 1; return 2; };

  const params = {
    pulsePressure: { value: pulsePressure, score: scorePP(pulsePressure) },
    lfPercent:     { value: lfPercent,     score: scoreLF(lfPercent) },
    vlfPercent:    { value: vlfPercent,    score: scoreVLF(vlfPercent) },
    stressIndex:   { value: stressIndex,   score: scoreSI(stressIndex) },
    totalPower:    { value: totalPower,    score: scoreTP(totalPower) },
    sdnn:          { value: sdnn,          score: scoreSDNN(sdnn) },
  };

  // Sum only non-null scores
  const scores = Object.values(params).map(p => p.score).filter(s => s !== null);
  if (scores.length === 0) return null;
  const total = scores.reduce((a, b) => a + b, 0);

  return { score: total, breakdown: params };
};

export const STATUS_COLOR = { high: '#c0392b', low: '#b45309', normal: '#0e7a55' };

/** CRIS GOLD™ Quadrant definitions — v1.0 LOCKED (from CRIS GPT Operating System Block) */
export const CRISGOLD_QUADRANTS = {
  Q1: {
    label: 'Overloaded & Dysregulated',
    sub: 'High ELI + Low ARI — Stress Dominant / Exhausted',
    description: 'Your nervous system is carrying a high emotional and stress load while its ability to regulate and recover is compromised. The primary clinical priority is drainage, calming, and rebuilding foundational energy before advancing any therapies.',
    color: '#c0392b',
    bg: '#fdecea',
    icon: '⚡',
  },
  Q2: {
    label: 'High Load / Resilient',
    sub: 'High ELI + High ARI — Regulated but Stressed',
    description: 'Your nervous system is under high emotional stress but still regulating reasonably well. Your body is stressed yet maintains some balance and resilience. Focus is on reducing the stress load and supporting continued recovery.',
    color: '#b45309',
    bg: '#fef3e2',
    icon: '🔶',
  },
  Q3: {
    label: 'Physiological Exhaustion',
    sub: 'Low ELI + Low ARI — Fatigue Dominant / Depleted',
    description: 'Emotional load is not the primary issue, but autonomic regulation is weak. Your system is less resilient to stress and fatigue is common. Focus is on building resilience, energy reserves, and recovery capacity.',
    color: '#7b6d00',
    bg: '#fffde6',
    icon: '🔋',
  },
  Q4: {
    label: 'Optimal / Strong Regulation',
    sub: 'Low ELI + High ARI — Balanced / Optimal',
    description: 'Your nervous system is regulating effectively and emotional stress load is low. This reflects a balanced, resilient state. Continue prioritizing healthy habits to maintain your stress regulation and wellness.',
    color: '#0e7a55',
    bg: '#e6f5ef',
    icon: '⚖️',
  },
};

/** ELI/ARI thresholds and quadrant computation — REVISED per CRIS GOLD ELI Developer Spec */

/**
 * HQP Stress Index → ELI points (bucketed)
 * <100 = 0, 100–200 = 5, 200–400 = 10, >400 = 15
 */
export const hqpStressToELI = (si) => {
  if (si == null) return 0;
  if (si < 100) return 0;
  if (si <= 200) return 5;
  if (si <= 400) return 10;
  return 15;
};

/**
 * Questionnaire score (0–40) → ELI points (bucketed)
 * 0–10 = 0, 11–20 = 5, 21–30 = 10, 31–40 = 15
 */
export const questionnaireToELI = (score) => {
  if (score == null) return 0;
  if (score <= 10) return 0;
  if (score <= 20) return 5;
  if (score <= 30) return 10;
  return 15;
};

/**
 * Full ELI formula (REVISED spec):
 * ELI = (VLF% × 0.5) + (Polyvagal_all3red × 30) + ((1 - (TotalPower / 3500)) × 20)
 *       + HQP_StressIndex_Component + Questionnaire_Component
 * Clamped 0–100.
 *
 * @param {object} params
 * @param {number|null} params.vlfPercent       - VLF% from HQP
 * @param {number|null} params.totalPower       - Total Power (ms²)
 * @param {number}      params.polyvagalAll3Red - 1 if all 3 Polyvagal sections red, else 0
 * @param {number|null} params.hqpStressIndex   - HQP Stress Index value
 * @param {number|null} params.questionnaireScore - Questionnaire total (0–40)
 */
export const computeELI = ({ vlfPercent, totalPower, polyvagalAll3Red = 0, hqpStressIndex, questionnaireScore } = {}) => {
  // Need at least VLF% or Total Power to compute anything meaningful
  if (vlfPercent == null && totalPower == null && questionnaireScore == null) return null;

  const vlfComponent = (vlfPercent ?? 0) * 0.5;
  const polyvagalComponent = (polyvagalAll3Red ? 1 : 0) * 30;
  const tpComponent = totalPower != null ? (1 - (totalPower / 3500)) * 20 : 0;
  const siComponent = hqpStressToELI(hqpStressIndex);
  const qComponent = questionnaireToELI(questionnaireScore);

  const raw = vlfComponent + polyvagalComponent + tpComponent + siComponent + qComponent;
  return Math.round(Math.max(0, Math.min(100, raw)));
};

/**
 * ELI interpretation label
 */
export const eliLabel = (eli) => {
  if (eli == null) return null;
  if (eli < 30) return 'Low Emotional Load';
  if (eli <= 60) return 'Moderate Emotional Load';
  if (eli <= 80) return 'High Emotional Load';
  return 'Freeze / Trauma Load';
};

/**
 * ARI (Autonomic Regulation Index) — REVISED v1.0 (LOCKED)
 * Computed from 5 HQP inputs: SDNN (30%), RMSSD (25%), Total Power (25%), HF% (10%), LF% (10%)
 *
 * Normalization (0–100 subscores):
 *   SDNN_score  = min(100, SDNN / 70 × 100)
 *   RMSSD_score = min(100, RMSSD / 50 × 100)
 *   TP_score    = min(100, TP / 3500 × 100)
 *   HF_score    = max(0, 100 − |HF − 27| / 27 × 100)
 *   LF_score    = max(0, 100 − |LF − 47| / 47 × 100)
 *
 * Guardrails (applied in sequence, lowest cap wins):
 *   Guardrail A: TP < 600 → ARI ≤ 50
 *   Guardrail B: SDNN < 25 AND RMSSD < 20 → ARI ≤ 40
 *   Guardrail C: TP < 300 → ARI ≤ 30
 *
 * @param {object} params
 * @param {number|null} params.sdnn       - SDNN (ms)
 * @param {number|null} params.rmssd      - RMSSD (ms)
 * @param {number|null} params.totalPower - Total Power (ms²)
 * @param {number|null} params.hfPercent  - HF% (0–100)
 * @param {number|null} params.lfPercent  - LF% (0–100)
 * @returns {number|null} Final ARI (0–100, rounded) or null if required inputs missing
 */
export const computeARI = ({ sdnn, rmssd, totalPower, hfPercent, lfPercent } = {}) => {
  // Require the 3 primary anchors
  if (sdnn == null || rmssd == null || totalPower == null) return null;

  // Normalize each input to 0–100
  const sdnnScore  = Math.min(100, (sdnn / 70) * 100);
  const rmssdScore = Math.min(100, (rmssd / 50) * 100);
  const tpScore    = Math.min(100, (totalPower / 3500) * 100);
  const hfScore    = hfPercent != null ? Math.max(0, 100 - (Math.abs(hfPercent - 27) / 27) * 100) : 0;
  const lfScore    = lfPercent != null ? Math.max(0, 100 - (Math.abs(lfPercent - 47) / 47) * 100) : 0;

  // Weighted ARI formula
  let rawARI = (sdnnScore * 0.30) + (rmssdScore * 0.25) + (tpScore * 0.25) + (hfScore * 0.10) + (lfScore * 0.10);

  // Apply guardrails (sequence: A → B → C, lowest cap wins)
  let ariCap = 100;
  if (totalPower < 600) ariCap = Math.min(ariCap, 50);                      // Guardrail A
  if (sdnn < 25 && rmssd < 20) ariCap = Math.min(ariCap, 40);              // Guardrail B
  if (totalPower < 300) ariCap = Math.min(ariCap, 30);                      // Guardrail C

  const finalARI = Math.min(rawARI, ariCap);
  return Math.round(Math.max(0, Math.min(100, finalARI)));
};

/**
 * ARI interpretation label
 */
export const ariLabel = (ari) => {
  if (ari == null) return null;
  if (ari >= 70) return 'High ARI (Strong Reserve)';
  if (ari >= 40) return 'Moderate ARI (Borderline)';
  return 'Low ARI (Depleted)';
};

/**
 * Quadrant computation — REVISED thresholds (LOCKED):
 * High ARI = ARI >= 70, High ELI = ELI >= 40
 */
export const computeQuadrant = (eli, ari) => {
  if (eli == null || ari == null) return null;
  const highELI = eli >= 40;
  const highARI = ari >= 70;
  if (highELI && !highARI) return 'Q1';
  if (highELI && highARI)  return 'Q2';
  if (!highELI && !highARI) return 'Q3';
  return 'Q4';
};

// Keep HRQ_QUADRANTS as alias for backwards compatibility
export const HRQ_QUADRANTS = CRISGOLD_QUADRANTS;

export const CV_QUADRANTS = {
  Q1: {
    label: 'Parasympathetic Rest/Recovery',
    description: 'Cardiovascular system is in a rest and recovery state with strong parasympathetic activity. Low vascular load.',
    color: '#0e7a55',
    bg: '#e6f5ef',
  },
  Q2: {
    label: 'Vascular-Cardio Stress',
    description: 'Your cardiovascular system, including heart and blood vessels, is currently under strain. This may reflect higher blood pressure, arterial stiffness, or general cardiac stress. Steps to reduce cardiovascular load are recommended.',
    color: '#c0392b',
    bg: '#fdecea',
  },
  Q3: {
    label: 'Energy Reserve / Resilience-Fatigue',
    description: 'Cardiovascular system shows fatigue dominance with reduced energy reserve and resilience. Low load but depleted adaptive capacity.',
    color: '#b45309',
    bg: '#fef3e2',
  },
  Q4: {
    label: 'Energy Reserve / Autonomic-Stress',
    description: 'Cardiovascular system shows autonomic stress with energy reserve depletion. Sympathetic overdrive with compensatory mechanisms.',
    color: '#7b6d00',
    bg: '#fffde6',
  },
};

/** Brain Gauge metric reference ranges and display config */
export const BRAIN_GAUGE_METRICS = [
  { key: 'speed',                 label: 'Processing Speed',    low: 40, note: 'Neural processing speed; optimal >70' },
  { key: 'accuracy',              label: 'Accuracy',            low: 70, note: 'Response precision; optimal >85' },
  { key: 'timeOrderJudgment',     label: 'Time Order Judgment', low: 20, note: 'Temporal sequencing ability; optimal >50' },
  { key: 'timePerception',        label: 'Time Perception',     low: 70, note: 'Time estimation accuracy; optimal >85' },
  { key: 'plasticity',            label: 'Plasticity',          low: 50, note: 'Neural adaptability; optimal >70' },
  { key: 'fatigue',               label: 'Fatigue Index',       low: 30, note: 'Low score = high fatigue; optimal >60' },
  { key: 'focus',                 label: 'Focus',               low: 60, note: 'Attentional capacity; optimal >75' },
  { key: 'overallCorticalMetric', label: 'Overall Cortical',    low: 50, note: 'Global cortical resilience; optimal >70' },
];

/* ── Therapeutic Priority Engine ─────────────────────────────────
 * Deterministic ordering of 6 therapy categories based on:
 *   1. Drainage is ALWAYS Priority 1
 *   2. Red Flag overrides (CRI, Total Power, Stress Index, Polyvagal)
 *   3. Quadrant-specific default ordering
 *
 * Returns: { priorities: [...], redFlags: [...], primaryRisk: string|null }
 *   Each priority: { priority: 1-6, key, label, icon, reason, isRedFlag }
 * ────────────────────────────────────────────────────────────────*/

const THERAPY_CATEGORIES = {
  drainage:              { label: 'Drainage (Foundation)',       icon: '🚿' },
  cardiovascularSupport: { label: 'Cardiovascular Stabilization', icon: '💓' },
  cellMembraneSupport:   { label: 'Cell Membrane Restoration',  icon: '🧬' },
  mitochondrialSupport:  { label: 'Mitochondrial Energy Support', icon: '⚡' },
  neurocognitiveSupport: { label: 'Neurocognitive Support',     icon: '🧠' },
  oxidativeStressSupport:{ label: 'Oxidative Stress Support',   icon: '⚗️' },
};

/** Quadrant-specific default ordering (positions 2–6, after drainage) */
const QUADRANT_DEFAULT_ORDER = {
  Q1: ['cardiovascularSupport', 'neurocognitiveSupport', 'cellMembraneSupport', 'mitochondrialSupport', 'oxidativeStressSupport'],
  Q2: ['cardiovascularSupport', 'oxidativeStressSupport', 'cellMembraneSupport', 'mitochondrialSupport', 'neurocognitiveSupport'],
  Q3: ['cardiovascularSupport', 'mitochondrialSupport', 'cellMembraneSupport', 'neurocognitiveSupport', 'oxidativeStressSupport'],
  Q4: ['cellMembraneSupport', 'mitochondrialSupport', 'neurocognitiveSupport', 'cardiovascularSupport', 'oxidativeStressSupport'],
};

/**
 * Compute therapeutic priority ordering.
 * @param {object} params
 * @param {number|null} params.criScore       - CRI score (0–12)
 * @param {number|null} params.totalPower     - Total Power (ms²)
 * @param {number|null} params.stressIndex    - HQP Stress Index
 * @param {boolean}     params.polyvagalFreeze - true if all 3 Polyvagal sections red
 * @param {string}      params.quadrant       - Q1, Q2, Q3, or Q4
 * @returns {{ priorities: Array, redFlags: Array, primaryRisk: string|null }}
 */
export const computeTherapeuticPriority = ({ criScore, totalPower, stressIndex, polyvagalFreeze = false, quadrant = 'Q3' } = {}) => {
  const redFlags = [];

  // Detect red flags
  if (criScore != null && criScore >= 8) {
    redFlags.push({
      category: 'cardiovascularSupport',
      reason: `Priority elevated: CRI score of ${criScore} indicates significant cardiovascular stress`,
      type: 'cardiovascular',
    });
  }
  if (stressIndex != null && stressIndex > 300) {
    redFlags.push({
      category: 'cardiovascularSupport',
      reason: `Priority elevated: Stress Index of ${Math.round(stressIndex)} indicates extreme sympathetic activation`,
      type: 'sympathetic',
    });
  }
  if (totalPower != null && totalPower < 400) {
    redFlags.push({
      category: 'mitochondrialSupport',
      reason: `Priority elevated: Total Power of ${Math.round(totalPower)} indicates severely depleted autonomic reserve`,
      type: 'energy',
    });
  }
  if (polyvagalFreeze) {
    redFlags.push({
      category: 'cardiovascularSupport',
      reason: 'Polyvagal Freeze detected — dorsal vagal shutdown physiology present',
      type: 'freeze',
    });
  }

  // Determine primary physiological risk for banner
  let primaryRisk = null;
  if (redFlags.some(f => f.type === 'cardiovascular'))  primaryRisk = 'Cardiovascular Stress';
  else if (redFlags.some(f => f.type === 'sympathetic')) primaryRisk = 'Extreme Sympathetic Activation';
  else if (redFlags.some(f => f.type === 'energy'))      primaryRisk = 'Severe Energy Depletion';
  else if (redFlags.some(f => f.type === 'freeze'))      primaryRisk = 'Polyvagal Freeze / Dorsal Vagal Shutdown';

  // Start with quadrant default order
  const defaultOrder = QUADRANT_DEFAULT_ORDER[quadrant] || QUADRANT_DEFAULT_ORDER.Q3;

  // Collect which categories are red-flagged (deduplicate)
  const flaggedCategories = [...new Set(redFlags.map(f => f.category))];

  // Build ordered list: flagged categories first (CV before Mito if both), then remaining in default order
  const flagPriority = ['cardiovascularSupport', 'mitochondrialSupport', 'neurocognitiveSupport'];
  const sortedFlags = flaggedCategories.sort((a, b) => flagPriority.indexOf(a) - flagPriority.indexOf(b));
  const remaining = defaultOrder.filter(k => !sortedFlags.includes(k));
  const orderedKeys = [...sortedFlags, ...remaining];

  // Build reason map (combine reasons if multiple flags for same category)
  const reasonMap = {};
  for (const f of redFlags) {
    if (!reasonMap[f.category]) reasonMap[f.category] = [];
    reasonMap[f.category].push(f.reason);
  }

  // Assemble final priorities array
  const priorities = [
    {
      priority: 1,
      key: 'drainage',
      ...THERAPY_CATEGORIES.drainage,
      reason: 'Always first — prepares lymphatic, liver, and kidney clearance before other therapies',
      isRedFlag: false,
    },
    ...orderedKeys.map((key, idx) => ({
      priority: idx + 2,
      key,
      ...THERAPY_CATEGORIES[key],
      reason: reasonMap[key]
        ? reasonMap[key].join('. ')
        : `${THERAPY_CATEGORIES[key].label} — quadrant ${quadrant} default sequence`,
      isRedFlag: !!reasonMap[key],
    })),
  ];

  return { priorities, redFlags, primaryRisk };
};

export { THERAPY_CATEGORIES };
