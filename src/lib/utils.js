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

/** Convert File to base64 string */
export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/** CRI score → color + category */
export const criMeta = (score) => {
  if (score === null || score === undefined) return { color: '#8896aa', bg: '#eef1f5', label: 'N/A' };
  if (score <= 2)  return { color: '#0e7a55', bg: '#e6f5ef', label: 'Low Vascular Load' };
  if (score <= 5)  return { color: '#b45309', bg: '#fef3e2', label: 'Mild Strain' };
  if (score <= 8)  return { color: '#c0392b', bg: '#fdecea', label: 'High Cardiovascular Stress' };
  return            { color: '#7b1111', bg: '#fdecea', label: 'Critical Cardiovascular Risk' };
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

/** ELI/ARI thresholds and quadrant computation (v1.0 LOCKED) */
export const computeELI = (questionnaireScore) =>
  questionnaireScore != null ? Math.round((questionnaireScore / 40) * 100) : null;

export const computeQuadrant = (questionnaireScore, ari) => {
  if (questionnaireScore == null || ari == null) return null;
  const highELI = questionnaireScore >= 20;
  const highARI = ari >= 60;
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
