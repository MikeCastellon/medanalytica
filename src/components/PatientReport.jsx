import { useState, useEffect, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell, LabelList,
} from 'recharts';
import {
  ini, age, fmtDate,
  criMeta, STATUS_COLOR,
  CRISGOLD_QUADRANTS,
  BRAIN_GAUGE_METRICS, CRI_BREAKDOWN_PARAMS, computeCRI,
} from '../lib/utils';
import { MASTER_PROTOCOL_LIST } from '../lib/protocols';
import { CHAVITA_DESCRIPTIONS, EMVITA_DESCRIPTIONS } from '../lib/rubimed';
import Badge from './Badge';

// ── HRV Metric Descriptions (info tooltips) ──
const HRV_INFO = {
  'Rate':   'Heart Rate — average beats per minute. Reflects overall cardiac pacing.',
  'SDNN':   'SDNN — standard deviation of NN intervals. Measures total HRV and overall autonomic nervous system health. Low values indicate reduced adaptability.',
  'RMSSD':  'RMSSD — root mean square of successive differences. Reflects parasympathetic (vagal) activity and short-term HRV. Low values suggest reduced vagal tone.',
  'Ratio':  'LF/HF Ratio — low-frequency to high-frequency power ratio. Indicates sympathovagal balance. Values >2 suggest sympathetic dominance; <0.5 suggest parasympathetic dominance.',
  'Power':  'Total Power — sum of all frequency-domain power (VLF+LF+HF). Represents total autonomic nervous system energy and reserve capacity. Very low values indicate severely depleted reserves.',
  'Index':  'Stress Index (Baevsky) — geometric measure of sympathetic stress on the heart. Higher values indicate greater physiological stress burden.',
  'VLF%':   'VLF% — very low frequency percentage. Reflects thermoregulation, hormonal, and renin-angiotensin activity. Elevated values may indicate chronic stress or metabolic burden.',
  'HF%':    'HF% — high-frequency percentage. Represents parasympathetic (vagal) activity. Higher values indicate stronger rest-and-digest function.',
  'LF%':    'LF% — low-frequency percentage. Reflects a mix of sympathetic and parasympathetic activity, including baroreflex function.',
};

// ── PSE: 28 Emvita Conflict Definitions (VERBATIM from Rubimed Practitioner Guide by Dr. Reimar Banis) ──
const EMVITA_CONFLICTS = {
  1:  { name: 'Independence',                   chakra: 1, description: 'A feeling of "not being good enough", feelings of inferiority, disrupted basic trust, often puberty conflicts. One feels not good enough, has identity problems. Primary emotional orientation, in the sense of sufficient self-confidence is lacking. Basic trust has been lost or was never there. A frequent tendency to melancholy.' },
  2:  { name: 'Lack of Concentration',          chakra: 1, description: 'Easily distracted, unable to concentrate, unfocused, daydreaming. One has difficulty staying focused and centered. The mind wanders easily and one is constantly distracted. There is a lack of grounding that makes sustained mental effort difficult.' },
  3:  { name: 'At the Mercy of, Helpless',      chakra: 1, description: 'Weak-willed, helpless as a child. One feels helpless and in every way paralyzed. The stronger the demands, the more unable one feels to arrive at any kind of solution. Life is experienced as a never-ending struggle. One tends to lethargy and immobility, has the tendency to dither, be undecided, play for time, leave things up in the air, postpone everything to the last minute or, in the extreme case, give up altogether.' },
  4:  { name: 'Extremely Self-Controlled',      chakra: 1, description: 'Numbness, suppression of joie de vivre, exaggerated sense of duty and responsibility. One does not allow oneself to grow and live one\'s own life. One was held back from the normal childhood joy of expansion and was possibly too rigidly disciplined. Only compulsion, rationality and good behavior have top priority. One is afraid of yielding to spontaneity, freedom and joy in life.' },
  5:  { name: 'Hectic, Nervous',                chakra: 2, description: 'Hectic, hyperkinetic symptoms, upset, nervous, driven and restless. Nervousness and drivenness. High physical tension with a tendency to react with physical symptoms to inner stress. One engages in hypernormal activity, is ambitious and often hyperactive. Tendency to obsessive perfection. One believes in only having a right to live by pushing oneself to peak performance.' },
  6:  { name: 'Perseverance',                   chakra: 2, description: 'Wanting to be self-controlled and show no weakness despite a feeling of helplessness; tendency to express anxiety through physical symptoms. One tries to maintain control and show no weakness despite deep helplessness.' },
  7:  { name: 'Show of Strength, Stubborn',     chakra: 2, description: 'Goes beyond one\'s limits; always showing strength despite secretly feeling inferior; obstinate, arrogant, cocky. One\'s actual existence does not match up with one\'s self-image. Secretly, one feels uncertain and inferior, but conceals it behind a facade of strong self-confidence. There is a constant alternation between feelings of strength and weakness.' },
  8:  { name: 'Isolated',                       chakra: 3, description: 'Joyless, feeling abandoned, unhappy, self-pitying. Emotionally, one lives on an island, surrounded by strangers. One would like to make contact but cannot get close to the others. One feels isolated, like an outcast. One lacks the capability to communicate with others in a satisfactory manner. The resulting feeling of isolation leads to inner paralysis and lethargy.' },
  9:  { name: 'Pent-up Emotions',               chakra: 3, description: 'Extremely pent-up destructive rage, all too ready to conform and sacrifice. One tries to win the sympathy and affection of others with an especially pleasant and obliging personality. One constantly adapts oneself to the needs of others. In the process, one denies one\'s own goals, which leads to subliminal resentment and, in time, to a mountain of unfulfilled desires.' },
  10: { name: 'Wanting More',                   chakra: 3, description: 'Insatiable due to a nagging feeling of dissatisfaction and greed, constantly dissatisfied, driven, overly aggressive. Due to a nagging feeling of dissatisfaction and a lack of happy feelings, one constantly wants more out of life. At bottom, one feels desperately poor and needy. What one has or has achieved is never enough.' },
  11: { name: 'Craving Good Feelings',          chakra: 3, description: 'Deeply dissatisfied, frustrated, profoundly unhappy, in the extreme addiction, anorexia, bulimia. One is deeply dissatisfied and empty. The feeling of constant emotional hunger develops into unreal fantasies and a nagging feeling of drivenness. Sometimes tendency to addiction and dependencies of various kinds.' },
  12: { name: 'Mental Overexertion',            chakra: 4, description: 'Because trust is disrupted, constant thoughts of problems and failure; difficulty gathering one\'s thoughts. One thinks that an effort of will can bring all moods and emotions under control. One overburdens oneself constantly. Thoughts of problems or failure predominate, and there is a lack of trust in oneself and others.' },
  13: { name: 'Withdrawn, Deeply Injured',      chakra: 4, description: 'Gutshot, deeply injured and withdrawn, uninterested, self-involved. One feels deeply offended and believes that one can never again get over a severe injury and offense. One withdraws anxiously from other people because one expects nothing good to come of it. One begins to put up walls around one\'s tender soul.' },
  14: { name: 'Introverted, Compulsive',        chakra: 4, description: 'Cramped and tense; fear of going crazy; difficulty breathing; feeling of isolation behind walls of hopelessness. One has isolated oneself from the outside world and feels trapped behind walls, hopeless. One\'s thoughts go around in circles. The suffocating feeling can be felt physically, emotionally or mentally.' },
  15: { name: 'Apprehensive',                   chakra: 4, description: 'Eerie-frightful, abandoned, extremely anxious, phobias, woebegone and full of sorrow. One feels abandoned and extremely anxious. The world feels eerie and frightful. Phobias and deep sorrow dominate the emotional landscape.' },
  16: { name: 'Panic',                          chakra: 4, description: 'My heart is breaking, as if overrun by a dreadful huge wave, panic attacks, fear of death. One feels overwhelmed by an overpowering fear of death like a gigantic tidal wave. One cannot put up any resistance whatsoever to this powerful fear, but rather feels totally paralyzed.' },
  17: { name: 'Emotional Emptiness',            chakra: 5, description: 'Empty of thoughts and feelings, no initiative, indifferent, emotions feel frozen. The neck, the "gateway to feelings", can choke off rising emotions in such a manner as to bring about a condition of complete emotional rigidity. One is then completely dominated and guided by the head, as if nothing really affected one anymore. Many patients with this conflict feel a great inner emptiness that can have a very depressive feeling-tone.' },
  18: { name: 'Rushed',                         chakra: 5, description: 'Impulsive, overexcited, stuttering; the feeling of living a life that is false at its core; thoughts outrunning actions. In the neck region strong impulses and drives can build up like a torrent, so that a frightened feeling rises up and one feels literally overrun. Those affected suffer from not being able to make themselves clearly understood.' },
  19: { name: 'Timid, Faint-hearted',           chakra: 6, description: 'Not wanting to see things clearly, diplomatic, undecided, poor decision-making ability; fear of making a mistake. The actual underlying causes of indecisiveness are the fear of making mistakes and the hope that there might be a better option.' },
  20: { name: 'Self-sufficient',                chakra: 6, description: 'Narcissistic, self-absorbed, egotistical, mood swings. One views the outside world exclusively as an extension of oneself. One\'s self-satisfaction can degenerate into narcissism. Deep inside, one is unsure of oneself and feels unloved, which one tries to compensate with exaggerated self-love.' },
  21: { name: 'Physical Overexertion',          chakra: 6, description: 'Restlessly tense; sympathicotonically overdriven, irritable; unable to relax; physically restless, constantly overburdened. One feels rushed and exhausted because one is overstressed. One constantly exceeds one\'s limits to a harmful degree. Way down deep, one feels unloved and worthless.' },
  22: { name: 'Restless, Mentally Hyperactive',chakra: 6, description: 'Constant worry without letup, mental nervousness, restlessness due to constant drivenness and a torrent of thoughts. Thoughts whirl nonstop through one\'s head, leading to a condition of inner unrest and drivenness. One has a constant feeling of uncertainty and great worrying.' },
  23: { name: 'Tense',                          chakra: 6, description: 'Completely tensed up, helpless, impulsive, thoughts race ahead of actions, tics, inner tension due to high demands on oneself. One feels constantly tensed up and incapable of relaxing. The emotional background of the tension is due to an overly strict Superego. The tension is actually based on a fear of making mistakes.' },
  24: { name: 'Uneasiness, Discomfort',         chakra: 6, description: 'Disturbing malaise on the somatic level, hopelessness, depressive tendency. One feels unwell in one\'s own body, as if having to wear the wrong clothing, uncomfortable and annoying. The prevailing mood varies from hopelessness all the way to distinct depression.' },
  25: { name: 'Mistrust',                       chakra: 7, description: 'Withdrawn, grim, unwilling to give, lack of basic trust, obstinate, questioning everything. Because of disappointing experiences, one believes that other people basically have it in for one. One imagines oneself surrounded by a hostile environment. Inside, one refuses to open oneself up emotionally.' },
  26: { name: 'Materialistic',                  chakra: 7, description: 'Wanting everything for oneself, acquisitiveness, miserliness, sees life as a permanent struggle for survival. People with this conflict often have a great fear of change. They find it very difficult to let go of things and modes of behavior. One is constantly seeking and, way down deep, not really satisfied.' },
  27: { name: 'Unwilling to Face Reality',      chakra: 7, description: 'Imagining things; incapable of clear sensory perception; flight into dream worlds because reality is felt to be intolerable. One cannot tolerate reality and therefore removes it from perception. Underlying this are emotional misery and intolerable frustration which generate a gloomy and joyless fundamental feeling-tone.' },
  28: { name: 'Wrong Thinking',                 chakra: 7, description: 'Obsessive, exaggerated mental fantasies, false dogmas and overly rigid beliefs, deep-seated self-esteem problems. The basic problem of wrong thinking is based on the refusal to acknowledge reality as such. One tends to think dogmatically and is preoccupied with particular convictions.' },
};

// ── PSE: 7 Chavita Chakra Remedy Descriptions (VERBATIM from Rubimed Practitioner Guide) ──
const CHAVITA_CHAKRAS = {
  1: { name: 'Root / Base Chakra',    color: '#c0392b', description: 'The first energy center in the lower pelvis connects a person to the ground through the legs, just as it stands emotionally for grounding and independence. A disturbed first Chakra is associated with insufficient grounding, disrupted self-confidence, identity problems and a lack of basic trust.' },
  2: { name: 'Sacral Chakra',         color: '#e67e22', description: 'The second Chakra has to do with the realization of one\'s own interests in a social context. Should one fight or flee, invest more or less energy to attain one\'s goals? Whoever does not know this becomes restless and disoriented, fights things out convulsively or compensates weakness with a show of strength.' },
  3: { name: 'Solar Plexus Chakra',   color: '#f1c40f', description: 'The third Chakra has to do with becoming sated and satisfied by absorbing the outside world; one is nourished materially and emotionally from outside and thereby satisfied. One takes what one needs, asserting one\'s will and getting one\'s way. When the third Chakra is disturbed, it leads to aggression inhibition and frustration.' },
  4: { name: 'Heart Chakra',          color: '#27ae60', description: 'The heart represents the energetic center of the "Self", an emotional core of individual perception and personal development, having to do with loving trust, mental power and playful-spontaneous self-realization. When the heart center is disturbed, it leads to a feeling of total retreat, of being captive, and of crippling and strenuous lack of orientation.' },
  5: { name: 'Throat Chakra',         color: '#2980b9', description: 'The neck, as control center in the confrontation between reason and emotion, rational and irrational, duty and desire, has two conflicts which are quite contrary. If the confrontation tends toward the rational pole, then a conflict forms with an overexcited hyperactivity; if it tends toward the emotional pole, it gives rise to a conflict with a great inner emptiness and rigidity.' },
  6: { name: 'Third Eye Chakra',      color: '#8e44ad', description: 'In the sixth energy Center, a person\'s individual needs are coordinated with the outside world. This involves a complex regulatory system and, ultimately, the "fight or flight" decision. When this harmonious equilibrium breaks down, it gives rise to restlessness, tension, discomfort, timidity, egotism or, as compensation, subservience.' },
  7: { name: 'Crown Chakra',          color: '#6c3483', description: 'The seventh Chakra presents a very accurate portrayal of the world, depicting one\'s own place in the world sensibly and true to scale. Via this energy center, the content of attitudes and feelings are properly balanced out, so that everything is realistically represented. Disturbances lead to misperceptions of reality in the form of imaginary and unreal idealizations.' },
};

// ── PSE: Acute Remedy Descriptions (verbatim from Rubimed Practitioner Guide) ──
const ACUTE_REMEDY_INFO = {
  'Anxiovita': 'Eases anxiety, panic, and phobias. Indicated when the patient experiences acute anxiety states, irrational fears, or panic attacks. Supports the nervous system in re-establishing calm and safety.',
  'Neurovita': 'Homeopathic neuroleptic for sedation and tension relief. Indicated for nervous system overstimulation, agitation, and emotional tension that does not resolve with rest.',
  'Simvita':   'For sympathicotonic conditions including diarrhea, cardiac arrhythmia, and restlessness. Indicated when sympathetic nervous system overdrive is the predominant pattern.',
  'Paravita':  'For parasympathicotonic / vagotonic conditions including constipation, cramps, and sluggishness. Indicated when the parasympathetic system is overactive or dysregulated.',
  'Geovita':   'For chronic exhaustion, geopathic stress, and electrosmog sensitivity. Indicated when environmental energy fields are contributing to depletion and recovery failure.',
};

// ── PSE: Standard Dosage (verbatim from Rubimed Practitioner Guide) ─────────
const PSE_DOSAGE = '2× daily — 12 drops directly on tongue (adults). Children: 2× daily — 6 drops. Small children: 1 drop per year of age. Acute remedies / Geovita: 2× 12 drops, or 5 drops several times per day for acute symptoms. No known side effects. Does not replace medical or psychotherapeutic care.';

// ── Quadrant Clinical Focus (from CRIS GOLD™ Protocol Matrix docs) ───────────
const QUADRANT_CLINICAL_FOCUS = {
  Q1: [
    'Adrenal overactivation / elevated cortisol pattern',
    'Stress-induced energy crashes and wired-but-tired state',
    'Sympathetic overdrive with compromised recovery',
    'Priority: Drainage, calming, and foundational energy restoration',
  ],
  Q2: [
    'High emotional stress load with maintained regulation',
    'Inflammatory or oxidative mitochondrial stress pattern',
    'Nervous system regulation preserved — load reduction needed',
    'Priority: Reduce stress burden, protect energy reserves',
  ],
  Q3: [
    'Low cardiac output and orthostatic symptom patterns',
    'Mitochondrial insufficiency and fatigue dominance',
    'Cognitive hypoperfusion — reduced cerebral oxygen delivery',
    'Priority: Build resilience, energy reserves, and recovery capacity',
  ],
  Q4: [
    'High Pulse Pressure and vascular stiffness pattern',
    'Long-term endothelial injury and microcirculatory dysfunction',
    'Chronic degenerative / autonomic-stress pattern',
    'Priority: Vascular support, NO signaling, cardiac workload reduction',
  ],
};

// ── CV Protocol Objectives by CRI-HQP Category ──────────────────────────────
const CV_PROTOCOL_OBJECTIVES = {
  'Low Vascular Load':                    ['Maintain endothelial function', 'Support nitric oxide production', 'Continue cardiovascular wellness routine'],
  'Mild Strain':                          ['Reduce arterial stiffness progression', 'Improve baroreflex sensitivity', 'Lifestyle modifications + periodic monitoring'],
  'Mild Autonomic/Vascular Strain':       ['Reduce arterial stiffness progression', 'Improve baroreflex sensitivity', 'Lifestyle modifications + periodic monitoring'],
  'Moderate Cardiovascular Risk Pattern': ['Reduce Pulse Pressure', 'Support endothelial NO signaling', 'Lower cardiac workload', 'Close monitoring recommended'],
  'High Cardiovascular Stress':           ['Reduce Pulse Pressure', 'Support endothelial NO signaling', 'Lower cardiac workload', 'Close monitoring recommended'],
  'High Cardiovascular Stress Pattern':   ['Urgent cardiovascular evaluation', 'Aggressive Pulse Pressure reduction', 'Endothelial and microcirculatory repair', 'Referral to cardiologist'],
  'Critical Cardiovascular Risk':         ['Urgent cardiovascular evaluation', 'Aggressive Pulse Pressure reduction', 'Endothelial and microcirculatory repair', 'Referral to cardiologist'],
};

// ── Therapeutic Category Rationale ───────────────────────────────────────────
const CATEGORY_RATIONALE = {
  drainage:              'Always foundational — lymphatic, liver & kidney clearance before any other protocol',
  cellMembraneSupport:   'Indicated: phospholipid integrity, receptor sensitivity, RJL Phase Angle <5°',
  mitochondrialSupport:  'Indicated: low Total Power, fatigue pattern, neuro-metabolic load',
  neurocognitiveSupport: 'Indicated: Brain Gauge deficits, brain fog, cognitive hypoperfusion',
  oxidativeStressSupport:'Indicated: elevated free radical activity, antioxidant depletion',
  cardiovascularSupport: 'Indicated: CRI ≥3, elevated Pulse Pressure, CV Quadrant Q2/Q4',
};

// ── HRV Pattern Definitions (from HQP Patient-Friendly HRV Handout) ──────────
const HRV_PATTERNS = [
  {
    id: 'heavy-stress',
    name: 'Heavy Stress / Low Reserves',
    color: '#c0392b',
    bg: '#fdecea',
    icon: '⚡',
    description: 'Nervous system is overworked and under-recovered. Classic exhausted-but-wired pattern.',
    symptoms: ['Anxious fatigue — wired but exhausted', 'Poor sleep and poor recovery', 'Hormone and digestive disruption', 'Brain fog with exertion'],
    test: (markers) => {
      const lf  = markers.find(m => /LF%/i.test(m.name));
      const vlf = markers.find(m => /VLF%/i.test(m.name));
      const hf  = markers.find(m => /HF%/i.test(m.name));
      const tp  = markers.find(m => /Total Power/i.test(m.name));
      return (lf?.status === 'high' || vlf?.status === 'high') &&
             hf?.status === 'low' &&
             tp?.status === 'low';
    },
  },
  {
    id: 'constant-stress',
    name: 'Constant Stress / Weak Calming',
    color: '#b45309',
    bg: '#fef3e2',
    icon: '🔶',
    description: 'Stress drive dominating, recovery not keeping up. Autonomic balance tilted toward sympathetic.',
    symptoms: ['Anxiety, tension, and insomnia', 'Blood pressure dysregulation', 'Muscle tightness and jaw clenching', 'Adrenaline-dominant pattern'],
    test: (markers) => {
      const lf = markers.find(m => /LF%/i.test(m.name));
      const hf = markers.find(m => /HF%/i.test(m.name));
      const si = markers.find(m => /Stress Index/i.test(m.name));
      return lf?.status === 'high' && hf?.status === 'low' && si?.status === 'high';
    },
  },
  {
    id: 'depleted',
    name: 'Depleted Energy Reserves',
    color: '#7b6d00',
    bg: '#fffde6',
    icon: '🔋',
    description: 'Fuel tank running low. Low stress drive but insufficient recovery power to rebuild.',
    symptoms: ['Persistent fatigue without obvious cause', 'Slow recovery from illness or stress', 'Brain fog and reduced cognitive output', 'Low stamina and motivation'],
    test: (markers) => {
      const tp  = markers.find(m => /Total Power/i.test(m.name));
      const si  = markers.find(m => /Stress Index/i.test(m.name));
      const sdnn = markers.find(m => /SDNN/i.test(m.name));
      return tp?.status === 'low' && sdnn?.status === 'low' && si?.status !== 'high';
    },
  },
];

/* ── Info Tooltip (hover icon ⓘ) ─────────────────────────────────────────── */
function InfoTip({ text }) {
  const [show, setShow] = useState(false);
  if (!text) return null;
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '4px', cursor: 'help' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <span style={{ fontSize: '11px', color: 'var(--text3)', fontWeight: '700', width: '14px', height: '14px', borderRadius: '50%', border: '1px solid var(--text3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>i</span>
      {show && (
        <div style={{ position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)', background: 'var(--navy)', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '11.5px', lineHeight: '1.5', width: '240px', zIndex: 100, boxShadow: 'var(--shadow2)', pointerEvents: 'none', textAlign: 'left', fontWeight: '400' }}>
          {text}
        </div>
      )}
    </span>
  );
}

/* ── Custom X-axis tick ──────────────────────────── */
function HrvAxisTick({ x, y, payload }) {
  const name = payload?.value;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={14} textAnchor="middle" fill="var(--text3)" fontSize={11}>{name}</text>
    </g>
  );
}

export default function PatientReport({ patient, report, saveError, onBack, doctorName, user, onViewHistory }) {
  // Patient summary tab removed — clinician view only
  if (!report) return null;
  const r = report;
  const markers = r.hrvMarkers?.length ? r.hrvMarkers : (r.markers || []);
  const patName = `${patient.first_name} ${patient.last_name}`;
  // Recompute CRI from raw VALUES using deterministic scoring (not AI scores which can be wrong)
  // This ensures the total AND individual scores are always correct, even for old reports
  const criRecomputed = r.criBreakdown ? computeCRI({
    pulsePressure: r.criBreakdown.pulsePressure?.value ?? r.pulsePressure,
    lfPercent:     r.criBreakdown.lfPercent?.value,
    vlfPercent:    r.criBreakdown.vlfPercent?.value,
    stressIndex:   r.criBreakdown.stressIndex?.value,
    totalPower:    r.criBreakdown.totalPower?.value,
    sdnn:          r.criBreakdown.sdnn?.value,
  }) : null;
  const correctedCriScore = criRecomputed ? criRecomputed.score : r.criScore;
  // Build corrected breakdown with deterministic scores + AI notes
  const correctedBreakdown = criRecomputed ? Object.fromEntries(
    Object.entries(criRecomputed.breakdown).map(([k, v]) => [k, {
      ...v,
      note: r.criBreakdown?.[k]?.note || '',
    }])
  ) : r.criBreakdown;
  const overallStatus = r.overallStatus || (correctedCriScore >= 6 ? 'critical' : correctedCriScore >= 3 ? 'warning' : 'normal');
  const cri = criMeta(correctedCriScore);
  const cgQ = r.crisgoldQuadrant ? CRISGOLD_QUADRANTS[r.crisgoldQuadrant] : null;
  const polyFreeze = r.polyvagalAll3Red === 1 || r.polyvagalRuleOf3Met;
  const eli = r.eli ?? r.hrqEli;
  const ari = r.ari ?? r.hrqAri;

  const chartData = markers.map(m => ({
    name:     m.name.split(' ').slice(-1)[0],
    fullName: m.name,
    value:    m.value,
    pct:      Math.min(Math.round((m.value / (m.high || 1)) * 100), 140),
    status:   m.status,
    unit:     m.unit,
    low:      m.low,
    high:     m.high,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    const info = HRV_INFO[d.name];
    return (
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px', boxShadow: '0 4px 20px rgba(0,0,0,.15)', fontSize: '12.5px', maxWidth: '280px', zIndex: 9999, position: 'relative' }}>
        <div style={{ fontWeight: '600', color: 'var(--navy)', marginBottom: '4px' }}>{d.fullName}</div>
        <div style={{ color: STATUS_COLOR[d.status] }}>Value: <strong>{d.value} {d.unit}</strong></div>
        <div style={{ color: 'var(--text2)' }}>Range: {d.low}–{d.high} {d.unit}</div>
        <div style={{ color: 'var(--text2)' }}>{d.pct}% of upper reference</div>
        {info && <div style={{ color: 'var(--text3)', marginTop: '6px', fontSize: '11.5px', lineHeight: '1.5', borderTop: '1px solid var(--border)', paddingTop: '6px' }}>{info}</div>}
      </div>
    );
  };

  const generatedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const reportId = `CG-${Date.now().toString(36).toUpperCase().slice(-8)}`;

  return (
    <div className="fade-in">
      <div className="report-toolbar no-print">
        <button className="back-btn" onClick={onBack} style={{ margin: 0 }}>← Back to Dashboard</button>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--navy)', padding: '7px 16px' }}>🩺 Clinician View</span>
        </div>
        {onViewHistory && (
          <button className="btn btn-nv" style={{ fontSize: '12.5px', padding: '8px 18px', background: 'var(--teal, #0e8a7a)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }} onClick={onViewHistory}>
            📋 View History
          </button>
        )}
        <button className="btn btn-nv" style={{ fontSize: '12.5px', padding: '8px 18px' }} onClick={() => window.print()}>
          ⬇ Export PDF
        </button>
      </div>

      {/* ── CRIS GOLD™ Branded Report Header ── */}
      <div className="report-header" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderTop: '4px solid #c9a227', borderRadius: '12px', padding: '28px 32px', marginBottom: '16px', color: 'var(--navy)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', boxShadow: '0 2px 8px rgba(10,22,40,.08)' }}>
        <div style={{ flex: 1 }}>
          {/* Brand line — White label for Clinic tier */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {user?.tier === 'clinic' && user?.clinicName ? (
              <>
                {(() => { try { const logo = localStorage.getItem('medanalytica_custom_logo'); return logo ? <img src={logo} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} /> : null; } catch { return null; } })() || (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#7a5209', border: '2px solid #c9a227', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>🏥</div>
                )}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--navy)', lineHeight: 1 }}>{user.clinicName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>Clinical Report · Powered by CRIS GOLD™</div>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#7a5209', border: '2px solid #c9a227', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>❤</div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.14em', color: '#7a5209', lineHeight: 1 }}>CRIS GOLD™</div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>Clinical Report Intelligence System · v1.0</div>
                </div>
              </>
            )}
            {doctorName && (
              <span style={{ fontSize: '11px', color: 'var(--text2)', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px', padding: '3px 10px', marginLeft: 'auto' }}>
                Attending: {doctorName}
              </span>
            )}
            {r.extractionConfidence && (
              <span style={{
                fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.06em',
                borderRadius: '20px', padding: '3px 10px',
                background: r.extractionConfidence === 'high' ? 'rgba(14,122,85,.12)' : r.extractionConfidence === 'medium' ? 'rgba(180,83,9,.12)' : 'rgba(192,57,43,.12)',
                color: r.extractionConfidence === 'high' ? '#0e7a55' : r.extractionConfidence === 'medium' ? '#b45309' : '#c0392b',
                border: `1px solid ${r.extractionConfidence === 'high' ? '#0e7a5540' : r.extractionConfidence === 'medium' ? '#b4530940' : '#c0392b40'}`,
              }}>
                {r.extractionConfidence === 'high' ? '🟢' : r.extractionConfidence === 'medium' ? '🟡' : '🔴'} {r.extractionConfidence} confidence
              </span>
            )}
          </div>
          {/* Patient name + status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '26px', fontWeight: '700', color: 'var(--navy)', lineHeight: 1 }}>{patName}</div>
            <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', background: overallStatus === 'critical' ? 'rgba(192,57,43,.12)' : overallStatus === 'warning' ? 'rgba(180,83,9,.12)' : 'rgba(14,122,85,.12)', color: overallStatus === 'critical' ? '#c0392b' : overallStatus === 'warning' ? '#b45309' : '#0e7a55', border: `1px solid ${overallStatus === 'critical' ? '#c0392b40' : overallStatus === 'warning' ? '#b4530940' : '#0e7a5540'}` }}>
              {overallStatus === 'critical' ? '⚠ Critical' : overallStatus === 'warning' ? '⚠ Review' : '✓ Normal'}
            </span>
          </div>
          {/* Meta row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '12px', color: 'var(--text2)' }}>
            {patient.mrn       && <span>📋 {patient.mrn}</span>}
            {patient.dob       && <span>Age {age(patient.dob)}</span>}
            {patient.gender    && <span>{patient.gender}</span>}
            {r.collection_date && <span>📅 {fmtDate(r.collection_date)}</span>}
            {r.report_type     && <span>🧬 {r.report_type}</span>}
            {r.bloodPressure   && <span>💓 BP {r.bloodPressure}</span>}
            {r.pulsePressure   && <span>PP {r.pulsePressure} mmHg</span>}
          </div>
          {r.chiefComplaints && (
            <div style={{ marginTop: '10px', fontSize: '12.5px', color: 'var(--text2)', fontStyle: 'italic' }}>
              "{r.chiefComplaints}"
            </div>
          )}
        </div>
        {/* Right side: key scores */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', flexShrink: 0 }}>
          {r.criScore != null && (
            <div style={{ textAlign: 'center', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 16px', minWidth: '80px' }}>
              <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text3)', marginBottom: '2px' }}>CRI</div>
              <div style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '32px', fontWeight: '700', color: cri.color, lineHeight: 1 }}>{correctedCriScore}</div>
              <div style={{ fontSize: '9px', color: 'var(--text3)' }}>/ 12</div>
            </div>
          )}
          {cgQ && (
            <div style={{ textAlign: 'center', background: cgQ.bg, border: `1px solid ${cgQ.color}30`, borderRadius: '10px', padding: '8px 16px', minWidth: '80px' }}>
              <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.1em', color: cgQ.color, marginBottom: '2px', opacity: 0.7 }}>Quadrant</div>
              <div style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '26px', fontWeight: '700', color: cgQ.color, lineHeight: 1 }}>{r.crisgoldQuadrant}</div>
              <div style={{ fontSize: '9px', color: cgQ.color, fontWeight: '600' }}>{cgQ.sub || cgQ.label}</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Score Bar ── */}
      {(eli != null || ari != null || r.criScore != null || cgQ) && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
          {r.criScore != null && <ScorePill label="CRI-HQP" value={`${correctedCriScore}/12`} sub={cri.label} color={cri.color} />}
          {eli != null && <ScorePill label="ELI" value={eli} sub={eli >= 50 ? 'High Emotional Load' : 'Low Emotional Load'} color={eli >= 50 ? '#c0392b' : '#0e7a55'} />}
          {ari != null && <ScorePill label="ARI" value={ari} sub={ari >= 60 ? 'High Regulation' : 'Low Regulation'} color={ari >= 60 ? '#0e7a55' : '#c0392b'} />}
          {cgQ && <ScorePill label="CRIS GOLD™ Quadrant" value={r.crisgoldQuadrant} sub={cgQ.label} color={cgQ.color} />}
          {/* CV Quadrant removed per doctor's request — only CRIS GOLD™ Quadrant shown */}
          {r.adrenalUrineDrops != null && <ScorePill label="Adrenal (Urine)" value={`${r.adrenalUrineDrops} drops`} sub={r.adrenalInterpretation} color="var(--amber)" />}
        </div>
      )}

      {/* ── Save Error Banner ── */}
      {saveError && (
        <div className="no-print" style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderLeft: '4px solid #ef4444', borderRadius: '8px', padding: '8px 14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11.5px', color: '#991b1b' }}>
          <span style={{ fontSize: '14px' }}>❌</span>
          <span><strong>Report generated but not saved to patient records.</strong> {saveError}</span>
        </div>
      )}

      {/* ── HIPAA Notice ── */}
      <div className="no-print" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderLeft: '4px solid #3b82f6', borderRadius: '8px', padding: '8px 14px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11.5px', color: '#1e40af' }}>
        <span>🔒</span>
        <span><strong>HIPAA PHI.</strong> Intended solely for the authorized treating practitioner. Handle per your facility's PHI policies (45 CFR §§ 164.502–164.514).</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: '10.5px', color: '#93c5fd', flexShrink: 0 }}>Report ID: {reportId}</span>
      </div>

      {/* ── CLINICIAN VIEW ── */}
      <div>

      {/* ── Filtration Warning ── */}

      {r.filtrationWarning && (
        <div style={{ background: '#fff8e1', border: '1px solid #f59e0b', borderLeft: '4px solid #f59e0b', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color: '#b45309', marginBottom: '4px' }}>
            ⚠️ HQP Filtration Warning
          </div>
          <div style={{ fontSize: '13px', color: 'var(--navy2)' }}>
            Filtration rejections: <strong>{r.filtrationRejections}</strong> (exceeds 20). Results may be affected by stimulants (coffee, energy drinks).
            Advise patient to avoid stimulants and re-test for accurate interpretation.
          </div>
        </div>
      )}

      {/* ── §1 AI Clinical Summary ── */}
      <SectionLabel number={1} title="AI Clinical Summary" />
      <div className="cc" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--navy)' }}>🤖 AI Clinical Summary</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {cgQ && <span style={{ fontSize: '10.5px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', background: cgQ.bg, color: cgQ.color, border: `1px solid ${cgQ.color}40` }}>{r.crisgoldQuadrant}: {cgQ.sub || cgQ.label}</span>}
            {cri.label !== 'N/A' && <span style={{ fontSize: '10.5px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', background: cri.bg, color: cri.color, border: `1px solid ${cri.color}40` }}>CRI-HQP {correctedCriScore} — {cri.label}</span>}
            <span style={{ fontSize: '10.5px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', background: overallStatus === 'critical' ? '#fdecea' : overallStatus === 'warning' ? '#fef3e2' : '#e6f5ef', color: overallStatus === 'critical' ? '#c0392b' : overallStatus === 'warning' ? '#b45309' : '#0e7a55', border: '1px solid currentColor' }}>
              {overallStatus === 'critical' ? '⚠ Critical' : overallStatus === 'warning' ? '⚠ Review' : '✓ Normal'}
            </span>
            {r.extractionConfidence && <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '20px', background: 'var(--bg3)', color: 'var(--text3)' }}>
              {r.extractionConfidence === 'high' ? '🟢' : r.extractionConfidence === 'medium' ? '🟡' : '🔴'} {r.extractionConfidence} confidence
            </span>}
          </div>
        </div>
        <div style={{ fontSize: '13.5px', color: 'var(--navy2)', lineHeight: '1.85', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>{r.aiSummary}</div>
        <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text3)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span>📅 Generated: {generatedDate}</span>
          {doctorName && <span>👨‍⚕️ {doctorName}</span>}
          <span style={{ marginLeft: 'auto', fontFamily: 'monospace' }}>ID: {reportId}</span>
        </div>
      </div>

      {/* ── §2 CRI Score ── */}
      {r.criScore != null && <><SectionLabel number={2} title="Cardiovascular Stress Index (CRI-HQP)" /><CRICard cri={cri} score={correctedCriScore} category={r.criCategory} breakdown={correctedBreakdown} /><CVPatternPanel report={r} markers={markers} criLabel={cri.label} criScore={correctedCriScore} /></>}

      {/* ── §3 CRIS GOLD™ Quadrant (CV Quadrant removed per doctor) ── */}
      {cgQ && <SectionLabel number={3} title="Quadrant Placement" />}
      {cgQ && (
        <div className="rg">
          <QuadrantCard
            title="CRIS GOLD™ Quadrant"
            subtitle="Emotional Load Index (ELI) vs Autonomic Regulation Index (ARI)"
            quadrant={r.crisgoldQuadrant}
            meta={cgQ}
            qDefs={CRISGOLD_QUADRANTS}
            ari={ari}
            eli={eli}
            qScore={r.questionnaireScore}
          />
        </div>
      )}

      {/* ── §4 HRV Markers Chart ── */}
      {chartData.length > 0 && <SectionLabel number={4} title="HRV Markers & Reference Ranges" />}
      {chartData.length > 0 && (
        <div className="rg">
          <div className="cc">
            <div className="ct">HRV Values vs. Reference Range</div>
            <div className="cs">% of upper reference limit — dashed line = 100% (upper normal)</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <ResponsiveContainer width="100%" height={272}>
                <BarChart data={chartData} margin={{ top: 4, right: 0, left: -22, bottom: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={<HrvAxisTick />} axisLine={false} tickLine={false} height={42} />
                  <YAxis tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 9999, pointerEvents: 'none' }} offset={20} />
                  <ReferenceLine y={100} stroke="var(--border2)" strokeDasharray="5 3" />
                  <Bar dataKey="pct" radius={[4, 4, 0, 0]} maxBarSize={34} minPointSize={8}>
                    {chartData.map((e, i) => <Cell key={i} fill={STATUS_COLOR[e.status]} fillOpacity={0.72} />)}
                    <LabelList dataKey="pct" position="top" style={{ fill: 'var(--text2)', fontSize: '10px', fontWeight: '600' }} formatter={v => `${v}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="cc">
            <div className="ct">Marker Detail</div>
            <div className="cs">Values with reference intervals</div>
            <div className="ml">
              {markers.map((m, i) => {
                const pct = Math.min(Math.max(((m.value - m.low) / ((m.high - m.low) || 1)) * 100, 0), 100);
                return (
                  <div key={i} className="mr" style={{ display: 'block', padding: '8px 0', borderBottom: i < markers.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div className="mn" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>{m.name}<InfoTip text={HRV_INFO[m.name.split(' ').slice(-1)[0]]} /></div>
                      <div className="mv" style={{ color: STATUS_COLOR[m.status], flexShrink: 0 }}>{m.value} <span style={{ fontSize: '10px', color: 'var(--text3)' }}>{m.unit}</span></div>
                    </div>
                    <div className="mb" style={{ marginBottom: '3px' }}><div className="mbi" style={{ width: `${pct}%`, background: STATUS_COLOR[m.status], opacity: .7 }} /></div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text3)' }}>Ref: {m.low}–{m.high} {m.unit}</div>
                    {m.clinicalNote && (
                      <div style={{ fontSize: '11.5px', color: 'var(--text2)', marginTop: '4px', lineHeight: '1.55', fontStyle: 'italic', paddingLeft: '2px', borderLeft: `2px solid ${STATUS_COLOR[m.status]}40` }}>
                        {m.clinicalNote}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── HRV Clinical Table ── */}
      {markers.length > 0 && <HRVTable markers={markers} />}

      {/* ── HRV Pattern Recognition ── */}
      {markers.length > 0 && <HRVPatternCard markers={markers} />}

      {/* ── §5 HRV Summary ── */}
      {r.hrvSummary && <SectionLabel number={5} title="Autonomic Nervous System Interpretation" />}
      {r.hrvSummary && (
        <InfoCard icon="🫀" title="Autonomic Nervous System Summary" color="var(--blue)" bg="var(--blue-lt)">
          {r.hrvSummary}
        </InfoCard>
      )}

      {/* ── §6 Polyvagal (only when ALL 3 red) + Adrenal ── */}
      {(polyFreeze || r.adrenalSummary) && <SectionLabel number={6} title={polyFreeze ? 'Polyvagal Freeze & Adrenal Assessment' : 'Adrenal Assessment'} />}
      {(polyFreeze || r.adrenalSummary) && (
        <div className="rg" style={{ gridTemplateColumns: polyFreeze && r.adrenalSummary ? '1fr 1fr' : '1fr' }}>
          {polyFreeze && (
            <InfoCard
              icon="🔴"
              title="Polyvagal Freeze Detected — All 3 Sections Red"
              color="var(--red)"
              bg="var(--red-lt)"
            >
              {r.polyvagalInterpretation || 'All three Polyvagal gauge sections (Parasympathetic Activity, Energy Index, Poly-Vagal) are in the red zone, indicating a freeze physiology state. This contributes 30 points to the ELI score.'}
            </InfoCard>
          )}
          {r.adrenalSummary && (
            <div className="cc">
              <div className="ct">Adrenal & Hormonal</div>
              <div className="cs">Stress axis assessment</div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                {r.adrenalUrineDrops != null && (
                  <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: '8px', padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.07em' }}>Adrenal Urine</div>
                    <div style={{ fontSize: '30px', fontWeight: '700', color: 'var(--navy)', fontFamily: 'Libre Baskerville, serif' }}>{r.adrenalUrineDrops}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text3)' }}>drops</div>
                    {r.adrenalInterpretation && <div style={{ fontSize: '11px', color: 'var(--text2)', marginTop: '4px' }}>{r.adrenalInterpretation}</div>}
                  </div>
                )}
                {r.thyroidFunctionalIndex != null && (
                  <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: '8px', padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.07em' }}>Thyroid (TFI)</div>
                    <div style={{ fontSize: '30px', fontWeight: '700', color: 'var(--navy)', fontFamily: 'Libre Baskerville, serif' }}>{r.thyroidFunctionalIndex}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text3)' }}>TFI</div>
                  </div>
                )}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7' }}>{r.adrenalSummary}</div>
            </div>
          )}
        </div>
      )}

      {/* ── §7 Rubimed PSE ── */}
      {(r.chavita || r.emvita) && <SectionLabel number={7} title="Psychosomatic Energetics — Rubimed" />}
      {(r.chavita || r.emvita) && (
        <RubimedCard chavita={r.chavita} emvita={r.emvita} method={r.ermMethod}
          chavitaText={r.chavitaText} emvitaText={r.emvitaText}
          acuteRemedies={r.acuteRemedies} acuteRemedyTexts={r.acuteRemedyTexts} />
      )}

      {/* ── RJL BIA ── */}
      {r.rjlBia && Object.values(r.rjlBia).some(v => v != null) && (
        <RjlBiaCard bia={r.rjlBia} summary={r.rjlBiaSummary} />
      )}

      {/* ── Oxidative Stress ── */}
      {(r.oxidativeStressScore != null || r.oxidativeStressSummary) && (
        <InfoCard icon="⚗️" title="Oxidative Stress Test" color="var(--amber)" bg="var(--amber-lt)">
          {r.oxidativeStressScore != null && (
            <div style={{ marginBottom: '8px' }}>
              <strong>Score: {r.oxidativeStressScore}</strong>
              {r.oxidativeStressScore >= 3 && ' — Elevated free radical activity. Antioxidant and membrane support recommended.'}
            </div>
          )}
          {r.oxidativeStressSummary}
        </InfoCard>
      )}

      {/* ── §8 Brain Gauge ── */}
      {r.brainGauge && Object.values(r.brainGauge).some(v => v != null) && <SectionLabel number={8} title="Brain Gauge — Cortical Performance" />}
      {r.brainGauge && Object.values(r.brainGauge).some(v => v != null) && (
        <BrainGaugeCard brainGauge={r.brainGauge} summary={r.brainGaugeSummary} />
      )}

      {/* ── Flagged Results ── */}
      {markers.filter(m => m.status !== 'normal').length > 0 && (
        <div className="card">
          <div className="card-hdr">
            <span className="card-title">Flagged Results</span>
            <span className="badge b-r">{markers.filter(m => m.status !== 'normal').length} flags</span>
          </div>
          <table>
            <thead>
              <tr><th>Marker</th><th>Result</th><th>Reference</th><th>Units</th><th>Flag</th><th>Clinical Note</th></tr>
            </thead>
            <tbody>
              {markers.filter(m => m.status !== 'normal').map((m, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: '600', color: 'var(--navy)' }}>{m.name}</td>
                  <td style={{ color: STATUS_COLOR[m.status], fontWeight: '700' }}>{m.value}</td>
                  <td style={{ color: 'var(--text2)', fontFamily: 'monospace', fontSize: '12.5px' }}>{m.low} – {m.high}</td>
                  <td style={{ color: 'var(--text3)' }}>{m.unit}</td>
                  <td><Badge status={m.status} /></td>
                  <td style={{ color: 'var(--text2)', fontSize: '12.5px' }}>{m.clinicalNote || (m.status === 'high' ? 'Above upper reference limit' : 'Below lower reference limit')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── §9 Therapeutic Selections ── */}
      <SectionLabel number={9} title="Therapeutic Selections" />
      <TherapeuticCard selections={r.therapeuticSelections || {}} quadrant={r.crisgoldQuadrant} therapeuticPriorities={r.therapeuticPriorities} />

      {/* ── NeuroVIZR (feature-flagged) ── */}
      {r.neuroVizrPrograms && user?.featureFlags?.neurovizr && (
        <>
          <SectionLabel number={10} title="NeuroVIZR Session Recommendations" />
          <NeuroVizrCard programs={r.neuroVizrPrograms} quadrant={r.crisgoldQuadrant} />
        </>
      )}

      {/* ── Follow-up ── */}
      {r.recommendedFollowUp && (
        <div style={{ marginTop: '16px', background: 'var(--teal-lt)', border: '1px solid rgba(14,138,122,.2)', borderLeft: '4px solid var(--teal)', borderRadius: '8px', padding: '16px 20px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--teal)', marginBottom: '6px' }}>📅 Recommended Follow-Up</div>
          <div style={{ fontSize: '13.5px', color: 'var(--navy2)', lineHeight: '1.7' }}>{r.recommendedFollowUp}</div>
        </div>
      )}

      <DisclaimerSection />

      </div>
    </div>
  );
}

/* ── CRI Score Card ─────────────────────────────────────── */
function CRICard({ cri, score, category, breakdown }) {
  const bands = [
    { label: '9–12', color: '#7b1111', range: [9, 12] },
    { label: '6–8',  color: '#c0392b', range: [6, 8]  },
    { label: '3–5',  color: '#b45309', range: [3, 5]  },
    { label: '0–2',  color: '#0e7a55', range: [0, 2]  },
  ];
  const pct = Math.min((score / 12) * 100, 100);
  const scoreColor = (s) => s === 0 ? '#0e7a55' : s === 1 ? '#b45309' : '#c0392b';

  return (
    <div className="cc" style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '28px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {bands.map((b, i) => {
            const active = score >= b.range[0] && score <= b.range[1];
            const width = 55 + i * 22;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row-reverse' }}>
                <div style={{ fontSize: '10.5px', color: 'var(--text3)', width: '30px', textAlign: 'right' }}>{b.label}</div>
                <div style={{ width: `${width}px`, height: '22px', background: b.color, opacity: active ? 1 : 0.22, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {active && <span style={{ fontSize: '11px', color: '#fff', fontWeight: '700' }}>▶ {score}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--text3)', marginBottom: '6px' }}>
            Cardiovascular Stress Index (CRI-HQP)
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '52px', color: cri.color, lineHeight: 1 }}>{score}</span>
            <span style={{ fontSize: '14px', color: 'var(--text2)' }}>/ 12</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', background: cri.bg, border: `1.5px solid ${cri.color}40`, borderRadius: '20px', fontSize: '12.5px', fontWeight: '600', color: cri.color }}>
              {category || cri.label}
            </span>
          </div>
          <div style={{ background: 'var(--bg3)', borderRadius: '6px', height: '8px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: cri.color, borderRadius: '6px', transition: 'width .5s ease' }} />
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7' }}>
            CRI-HQP of <strong>{score}</strong> — <strong style={{ color: cri.color }}>{category || cri.label}</strong>.
            {score >= 9 && ' Urgent cardiovascular evaluation recommended.'}
            {score >= 6 && score < 9 && ' Cardiovascular intervention and close monitoring recommended.'}
            {score >= 3 && score < 6 && ' Lifestyle modifications and periodic monitoring advised.'}
            {score < 3 && ' Continue healthy habits and routine monitoring.'}
          </div>
        </div>
      </div>
      {/* ── CRI-HQP Per-Parameter Breakdown ── */}
      {breakdown && (
        <div style={{ marginTop: '18px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--text3)', marginBottom: '10px' }}>
            Parameter Breakdown
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '8px' }}>
            {CRI_BREAKDOWN_PARAMS.map(({ key, label, unit }) => {
              const p = breakdown[key];
              if (!p) return null;
              return (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'var(--bg3)', borderRadius: '6px', borderLeft: `3px solid ${scoreColor(p.score)}` }}>
                  <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: scoreColor(p.score) + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: scoreColor(p.score) }}>
                    {p.score}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text1)' }}>
                      {label}{p.value != null && <span style={{ fontWeight: '400', color: 'var(--text2)', marginLeft: '6px' }}>{p.value}{unit ? ` ${unit}` : ''}</span>}
                    </div>
                    {p.note && <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: '1.4', marginTop: '2px' }}>{p.note}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── 2×2 Quadrant Card ──────────────────────────────────── */
function QuadrantCard({ title, subtitle, quadrant, meta, qDefs, ari, eli, qScore }) {
  return (
    <div className="cc">
      <div className="ct">{title}</div>
      <div className="cs">{subtitle}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '14px' }}>
        {['Q1', 'Q2', 'Q3', 'Q4'].map(id => {
          const qm = qDefs[id];
          const active = id === quadrant;
          return (
            <div key={id} style={{ padding: '10px 12px', borderRadius: '8px', border: `2px solid ${active ? qm.color : 'var(--border)'}`, background: active ? qm.bg : 'var(--bg)', transition: 'all .2s' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: active ? qm.color : 'var(--text3)', marginBottom: '3px' }}>
                {id} {qm.icon || ''}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: active ? qm.color : 'var(--text2)', lineHeight: '1.3' }}>
                {qm.sub || qm.label}
              </div>
            </div>
          );
        })}
      </div>
      {(eli != null || ari != null || qScore != null) && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          {qScore != null && (
            <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: '6px', padding: '8px 12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.07em' }}>Questionnaire</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--navy)' }}>{qScore}<span style={{ fontSize: '12px', color: 'var(--text3)' }}>/40</span></div>
            </div>
          )}
          {eli != null && (
            <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: '6px', padding: '8px 12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.07em' }}>ELI</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: eli >= 50 ? '#c0392b' : '#0e7a55' }}>{eli}</div>
              <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{eli >= 50 ? 'HIGH' : 'LOW'}</div>
            </div>
          )}
          {ari != null && (
            <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: '6px', padding: '8px 12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.07em' }}>ARI</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: ari >= 60 ? '#0e7a55' : '#c0392b' }}>{ari}</div>
              <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{ari >= 60 ? 'HIGH' : 'LOW'}</div>
            </div>
          )}
        </div>
      )}
      {meta && (
        <div style={{ background: meta.bg, border: `1px solid ${meta.color}30`, borderLeft: `4px solid ${meta.color}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: meta.color, marginBottom: '5px' }}>
            {quadrant}: {meta.label}
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--navy2)', lineHeight: '1.7' }}>{meta.description}</div>
        </div>
      )}
      {QUADRANT_CLINICAL_FOCUS[quadrant] && (
        <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)', marginBottom: '7px' }}>Clinical Focus</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {QUADRANT_CLINICAL_FOCUS[quadrant].map((point, i) => (
              <li key={i} style={{ fontSize: '12px', color: 'var(--navy2)', padding: '3px 0', display: 'flex', gap: '6px', borderBottom: i < QUADRANT_CLINICAL_FOCUS[quadrant].length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ color: meta?.color || 'var(--teal)', flexShrink: 0 }}>▸</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Brain Gauge Card ───────────────────────────────────── */
function BrainGaugeCard({ brainGauge, summary }) {
  return (
    <div className="cc" style={{ marginBottom: '16px' }}>
      <div className="ct">🧠 Brain Gauge — Cortical Performance</div>
      <div className="cs">Neural processing metrics • Low score indicates impaired function</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', marginBottom: '14px' }}>
        {BRAIN_GAUGE_METRICS.map(({ key, label, low }) => {
          const val = brainGauge[key];
          if (val == null) return null;
          const pct = Math.min((val / 100) * 100, 100);
          const status = val < low ? 'low' : 'normal';
          return (
            <div key={key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text2)' }}>{label}</span>
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: STATUS_COLOR[status] }}>{val}</span>
              </div>
              <div className="mb">
                <div className="mbi" style={{ width: `${pct}%`, background: STATUS_COLOR[status], opacity: .75 }} />
              </div>
            </div>
          );
        })}
      </div>
      {summary && (
        <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
          {summary}
        </div>
      )}
    </div>
  );
}

/* ── Expandable Text — "Read more / Read less" toggle ────────────────────── */
function ExpandableText({ subtitle, description, previewLength = 120 }) {
  const [expanded, setExpanded] = useState(false);
  const previewBody = description || '';
  const full = [subtitle, previewBody].filter(Boolean).join(' ');
  const needsToggle = full.length > previewLength;

  return (
    <div style={{ fontSize: '12.5px', color: 'var(--navy2)', lineHeight: '1.75' }}>
      {subtitle && (
        <div style={{ fontWeight: '600', fontStyle: 'italic', marginBottom: expanded ? '6px' : '0', color: 'var(--navy)' }}>
          {subtitle}
        </div>
      )}
      {expanded ? (
        <div style={{ marginTop: subtitle ? '0' : undefined }}>{previewBody}</div>
      ) : (
        <span>{full.slice(0, previewLength)}{needsToggle ? '...' : ''}</span>
      )}
      {needsToggle && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--blue)', fontWeight: '600', fontSize: '11.5px',
            padding: '2px 0', marginLeft: expanded ? '0' : '4px',
            marginTop: expanded ? '4px' : '0', display: expanded ? 'block' : 'inline',
            textDecoration: 'none',
          }}
          onMouseEnter={e => e.target.style.textDecoration = 'underline'}
          onMouseLeave={e => e.target.style.textDecoration = 'none'}
        >
          {expanded ? '▲ Read less' : '▼ Read more'}
        </button>
      )}
    </div>
  );
}

/* ── Psychosomatic Energetics — Rubimed Card (PSE Guide verbatim) ─────────── */
function RubimedCard({ chavita, emvita, method, chavitaText, emvitaText, acuteRemedies, acuteRemedyTexts }) {
  const chavitaInfo = chavita ? CHAVITA_CHAKRAS[chavita] : null;
  const emvitaInfo  = emvita  ? EMVITA_CONFLICTS[emvita]  : null;
  // Full descriptions from rubimed.js (longer + subtitles)
  const chavitaFull = chavita ? CHAVITA_DESCRIPTIONS[chavita] : null;
  const emvitaFull  = emvita  ? EMVITA_DESCRIPTIONS[emvita]  : null;
  const resolvedChavitaText = chavitaFull?.description || chavitaText || CHAVITA_CHAKRAS[chavita]?.description;
  const resolvedEmvitaText = emvitaFull?.description || emvitaText || EMVITA_CONFLICTS[emvita]?.description;
  const chakraColor = chavitaInfo?.color || 'var(--teal)';

  return (
    <div className="cc" style={{ marginBottom: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <div className="ct" style={{ margin: 0 }}>🔮 Psychosomatic Energetics — Rubimed</div>
      </div>
      <div className="cs" style={{ marginBottom: '16px' }}>
        Emotional Regulation Matrix (ERM) — Psychosomatic Energetics (PSE) by Dr. Reimar Banis &amp; Dr. Birgitt Holschuh-Lorang
        {method && <span style={{ marginLeft: '8px', color: 'var(--text3)' }}>· Testing method: <strong>{method}</strong></span>}
      </div>

      {/* PSE Intro */}
      <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '12.5px', color: 'var(--navy2)', lineHeight: '1.75' }}>
        <strong>What is Psychosomatic Energetics (PSE)?</strong> PSE is an evaluation and therapeutic method developed by Dr. Reimar Banis that addresses repressed emotional traumas — called <em>conflicts</em> — which store life energy and block its normal Life flow. Conflicts are identified and treated with homeopathic compound remedies (Emvita 1–28), always paired with the corresponding chakra remedy (Chavita 1–7). Psychosomatic Energetics (PSE) assessments are intended to help identify potential energetic and emotional stress patterns that may influence overall well-being. These findings are not intended to diagnose or treat medical or psychological conditions and should be used as supportive information within a comprehensive healthcare program directed by a qualified health care professional.
      </div>

      {/* Structured Clinical Table */}
      {(chavita || emvita || (acuteRemedies?.length > 0)) && (
        <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '700', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.07em', width: '18%' }}>Component</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '700', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.07em', width: '28%' }}>Selection</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: '700', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.07em' }}>Clinical Meaning</th>
              </tr>
            </thead>
            <tbody>
              {chavita && CHAVITA_CHAKRAS[chavita] && (
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: CHAVITA_CHAKRAS[chavita].color, verticalAlign: 'top' }}>Chavita {chavita}</td>
                  <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                    <div style={{ fontWeight: '600', color: 'var(--navy)' }}>Chakra {chavita}: {CHAVITA_CHAKRAS[chavita].name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>Chakra Remedy · {method || 'Questionnaire'}</div>
                  </td>
                  <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                    <ExpandableText subtitle={chavitaFull?.theme} description={resolvedChavitaText} previewLength={100} />
                  </td>
                </tr>
              )}
              {emvita && EMVITA_CONFLICTS[emvita] && (
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg3)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: CHAVITA_CHAKRAS[EMVITA_CONFLICTS[emvita].chakra]?.color || 'var(--teal)', verticalAlign: 'top' }}>Emvita {emvita}</td>
                  <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                    <div style={{ fontWeight: '600', color: 'var(--navy)' }}>Conflict: {EMVITA_CONFLICTS[emvita].name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>Emvita {emvita} · Emotional Conflict</div>
                  </td>
                  <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                    <ExpandableText subtitle={`Emvita ${emvita} — ${EMVITA_CONFLICTS[emvita].name} Conflict`} description={resolvedEmvitaText} previewLength={100} />
                  </td>
                </tr>
              )}
              {acuteRemedies?.map((remedy, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: '#c0392b', verticalAlign: 'top' }}>Acute {i + 1}</td>
                  <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                    <div style={{ fontWeight: '600', color: 'var(--navy)' }}>{remedy}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>Acute Stabilization Remedy</div>
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text2)', lineHeight: '1.6', verticalAlign: 'top', fontSize: '12px' }}>{ACUTE_REMEDY_INFO[remedy] || acuteRemedyTexts?.[i] || remedy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Clinical Integration Notes */}
      <div style={{ background: 'var(--blue-lt)', border: '1px solid rgba(26,111,181,.2)', borderLeft: '4px solid var(--blue)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '12.5px', color: 'var(--navy2)', lineHeight: '1.7' }}>
        <strong>Clinical Integration Notes:</strong> Rubimed findings correlate with elevated Stress Index and reduced HRV coherence. Emotional conflict resolution is expected to progressively improve parasympathetic recovery capacity and enhance protocol response across Vascular, Mitochondrial, and Neurocognitive therapeutic categories. Monitor ELI reduction at follow-up.
      </div>

      {/* Dosage */}
      <div style={{ background: '#f0fdf4', border: '1px solid rgba(14,122,85,.2)', borderLeft: '4px solid var(--green)', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px', fontSize: '12px', color: 'var(--navy2)', lineHeight: '1.7' }}>
        <strong>Standard Dosage (Rubimed Protocol):</strong> {PSE_DOSAGE}
      </div>

      {/* Acute Remedies */}
      {acuteRemedies?.length > 0 && (
        <div>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '10px' }}>
            Acute Remedies — Tested &amp; Indicated
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {acuteRemedies.map((remedy, i) => {
              const info = ACUTE_REMEDY_INFO[remedy];
              const customText = acuteRemedyTexts?.[i];
              return (
                <div key={i} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy)', marginBottom: '4px' }}>{remedy}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text2)', lineHeight: '1.6' }}>
                    {customText || info || remedy}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── RJL BIA Card ───────────────────────────────────────── */
function RjlBiaCard({ bia, summary }) {
  const fields = [
    { key: 'phaseAngle', label: 'Phase Angle', unit: '°', note: '<5 suggests membrane repair needed' },
    { key: 'icw',        label: 'ICW',         unit: 'L', note: 'Intracellular Water' },
    { key: 'ecw',        label: 'ECW',         unit: 'L', note: 'Extracellular Water' },
    { key: 'tbw',        label: 'TBW',         unit: 'L', note: 'Total Body Water' },
  ];
  return (
    <div className="cc" style={{ marginBottom: '16px' }}>
      <div className="ct">📊 RJL BIA — Bioimpedance Analysis</div>
      <div className="cs">Body composition and cellular hydration markers</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '12px' }}>
        {fields.map(({ key, label, unit, note }) => {
          const val = bia[key];
          if (val == null) return null;
          const warn = key === 'phaseAngle' && val < 5;
          return (
            <div key={key} style={{ background: 'var(--bg3)', borderRadius: '8px', padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: 'var(--text3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '2px' }}>{label}</div>
              <div style={{ fontSize: '22px', fontWeight: '700', color: warn ? '#c0392b' : 'var(--navy)' }}>{val}</div>
              <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{unit}</div>
            </div>
          );
        })}
      </div>
      {summary && <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7' }}>{summary}</div>}
    </div>
  );
}

/* ── Therapeutic Selections Card (Priority Engine + Editable) ── */
function TherapeuticCard({ selections, quadrant, therapeuticPriorities }) {
  // Fallback categories if no priority engine data
  const fallbackCategories = [
    { key: 'drainage',              icon: '🚿', label: 'Drainage (Foundation)',         priority: 1 },
    { key: 'cardiovascularSupport', icon: '💓', label: 'Cardiovascular Stabilization', priority: 2 },
    { key: 'cellMembraneSupport',   icon: '🧬', label: 'Cell Membrane Restoration',   priority: 3 },
    { key: 'mitochondrialSupport',  icon: '⚡', label: 'Mitochondrial Energy Support', priority: 4 },
    { key: 'neurocognitiveSupport', icon: '🧠', label: 'Neurocognitive Support',      priority: 5 },
    { key: 'oxidativeStressSupport',icon: '⚗️', label: 'Oxidative Stress Support',     priority: 6 },
  ];

  // Use priority engine ordering if available, else fallback
  const priorities  = therapeuticPriorities?.priorities || fallbackCategories;
  const redFlags    = therapeuticPriorities?.redFlags || [];
  const primaryRisk = therapeuticPriorities?.primaryRisk || null;

  const allKeys = priorities.map(p => p.key);

  const [editSels, setEditSels]         = useState(() => {
    const s = {};
    allKeys.forEach(k => { s[k] = [...(selections?.[k] || [])]; });
    return s;
  });
  const [editCols, setEditCols]         = useState({});
  const [addTab, setAddTab]             = useState({});
  const [customInput, setCustomInput]   = useState({});
  const [searchText, setSearchText]     = useState({});

  const isEditing  = (key) => !!editCols[key];
  const anyEditing = Object.values(editCols).some(Boolean);
  const toggleEdit = (key) => setEditCols(prev => ({ ...prev, [key]: !prev[key] }));

  const removeItem = (catKey, idx) =>
    setEditSels(prev => ({ ...prev, [catKey]: prev[catKey].filter((_, i) => i !== idx) }));

  const addFromList = (catKey, p) => {
    const label = `${p.product} — ${p.dose} (${p.brand})`;
    if (editSels[catKey]?.some(x => x === label)) return;
    setEditSels(prev => ({ ...prev, [catKey]: [...prev[catKey], label] }));
  };

  const addCustom = (catKey) => {
    const val = (customInput[catKey] || '').trim();
    if (!val) return;
    setEditSels(prev => ({ ...prev, [catKey]: [...prev[catKey], val] }));
    setCustomInput(prev => ({ ...prev, [catKey]: '' }));
  };

  const getMasterList = (catKey) => {
    const list = MASTER_PROTOCOL_LIST[catKey] || [];
    const qf   = list.filter(p => !quadrant || p.quadrants.includes(quadrant));
    const q    = (searchText[catKey] || '').toLowerCase().trim();
    if (!q) return qf;
    return qf.filter(p => p.product.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  };

  const isAdded = (catKey, p) =>
    editSels[catKey]?.some(x => x === `${p.product} — ${p.dose} (${p.brand})`);

  // Priority badge colors
  const priorityColors = {
    1: { bg: '#c0392b', text: '#fff' },
    2: { bg: '#e67e22', text: '#fff' },
    3: { bg: '#f1c40f', text: '#333' },
    4: { bg: '#27ae60', text: '#fff' },
    5: { bg: '#2980b9', text: '#fff' },
    6: { bg: '#8e44ad', text: '#fff' },
  };

  return (
    <div className="card" style={{ marginBottom: '16px' }}>
      <div className="card-hdr">
        <span className="card-title">💊 Therapeutic Priority Engine</span>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
          {quadrant && <span className="badge b-bl">{quadrant} Protocol</span>}
          <span style={{ fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', background: 'var(--bg3)', color: 'var(--text3)', border: '1px solid var(--border)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Protocol Library v1.0 LOCKED</span>
        </div>
      </div>

      {/* Primary Physiological Risk Banner */}
      {primaryRisk && (
        <div style={{ margin: 0, padding: '10px 22px', background: '#fdecea', borderBottom: '1px solid #c0392b30', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#7f1d1d' }}>
          <span style={{ fontSize: '18px', flexShrink: 0 }}>&#9888;</span>
          <div>
            <strong>Primary Physiological Risk: {primaryRisk}</strong>
            {redFlags.length > 0 && (
              <span style={{ fontSize: '11px', marginLeft: '8px', color: '#991b1b' }}>
                ({redFlags.length} red flag{redFlags.length > 1 ? 's' : ''} detected)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Stress Buster Kit for Q1/Q2 */}
      {(quadrant === 'Q1' || quadrant === 'Q2') && (
        <div style={{ margin: 0, padding: '10px 22px', background: '#fff8e1', borderBottom: '1px solid #f59e0b30', display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12.5px', color: '#92400e' }}>
          <span style={{ fontSize: '16px', flexShrink: 0 }}>&#9889;</span>
          <div>
            <strong>Stress Buster Kit auto-indicated for {quadrant}</strong> — Psy-Stabil + Dalectro + Neu-Regen (Bioresource) should be included under Drainage. Primary nervous system calming protocol for high emotional load states.
          </div>
        </div>
      )}

      {/* Clinical Sequence Summary */}
      <div style={{ padding: '12px 22px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontSize: '11px', color: 'var(--text3)' }}>
        <strong>Clinical Sequence:</strong> Drain &rarr; Stabilize &rarr; Repair &rarr; Energize &rarr; Optimize
      </div>

      {/* Priority Stack */}
      <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {priorities.map((p) => {
          const key        = p.key;
          const items      = editSels[key] || [];
          const tab        = addTab[key] || 'browse';
          const masterList = getMasterList(key);
          const editing    = isEditing(key);
          const pColor     = priorityColors[p.priority] || priorityColors[6];

          return (
            <div key={key} style={{ border: `1px solid ${p.isRedFlag ? '#c0392b40' : 'var(--border)'}`, borderRadius: '10px', overflow: 'hidden', background: p.isRedFlag ? '#fef2f2' : 'var(--bg2)' }}>
              {/* Priority header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: p.isRedFlag ? '#fdecea' : 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Priority badge */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: pColor.bg, color: pColor.text,
                    fontSize: '13px', fontWeight: '800', flexShrink: 0,
                  }}>{p.priority}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                      {p.icon} {p.label}
                    </div>
                    {/* AI Reasoning Line */}
                    <div style={{ fontSize: '11px', color: p.isRedFlag ? '#991b1b' : 'var(--text3)', marginTop: '2px', lineHeight: '1.4' }}>
                      {p.isRedFlag && <span style={{ fontWeight: '700', marginRight: '4px' }}>&#9888;</span>}
                      {p.reason}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleEdit(key)}
                  title={editing ? 'Done editing' : 'Edit this category'}
                  style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '5px', border: `1px solid ${editing ? 'var(--navy)' : 'var(--border)'}`, background: editing ? 'var(--navy)' : '#fff', color: editing ? '#fff' : 'var(--text3)', cursor: 'pointer', fontWeight: '600', flexShrink: 0 }}
                >
                  {editing ? '✓ Done' : '✏️'}
                </button>
              </div>

              {/* Products list */}
              <div style={{ padding: '10px 16px' }}>
                {items.length === 0 && !editing && (
                  <div style={{ fontSize: '11.5px', color: 'var(--text3)', fontStyle: 'italic' }}>No products assigned</div>
                )}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12.5px', color: 'var(--navy)', padding: '4px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      {editing ? (
                        <input
                          value={item}
                          onChange={e => {
                            const val = e.target.value;
                            setEditSels(prev => ({ ...prev, [key]: prev[key].map((x, j) => j === i ? val : x) }));
                          }}
                          style={{ flex: 1, fontSize: '12px', padding: '3px 6px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg3)', color: 'var(--navy)', lineHeight: '1.5', fontFamily: 'inherit' }}
                        />
                      ) : (
                        <span style={{ flex: 1, lineHeight: '1.5' }}>&bull; {item}</span>
                      )}
                      {editing && (
                        <button
                          onClick={() => removeItem(key, i)}
                          title="Remove"
                          style={{ flexShrink: 0, fontSize: '11px', lineHeight: 1, padding: '2px 6px', borderRadius: '4px', border: '1px solid #e3342f40', background: '#fef2f2', color: '#e3342f', cursor: 'pointer' }}
                        >&#10005;</button>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Add panel — edit mode only */}
                {editing && (
                  <div style={{ marginTop: '10px', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg3)' }}>
                      {[{ id: 'browse', lbl: 'Master List' }, { id: 'custom', lbl: 'Custom' }].map(({ id, lbl }) => (
                        <button
                          key={id}
                          onClick={() => setAddTab(prev => ({ ...prev, [key]: id }))}
                          style={{
                            flex: 1, padding: '5px 6px', fontSize: '10.5px', fontWeight: '700',
                            border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '.04em',
                            background: tab === id ? '#fff' : 'transparent',
                            color: tab === id ? 'var(--blue)' : 'var(--text3)',
                            borderBottom: tab === id ? '2px solid var(--blue)' : '2px solid transparent',
                          }}
                        >{lbl}</button>
                      ))}
                    </div>

                    {tab === 'browse' && (
                      <div>
                        <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--border)' }}>
                          <input
                            placeholder="Filter products..."
                            value={searchText[key] || ''}
                            onChange={e => setSearchText(prev => ({ ...prev, [key]: e.target.value }))}
                            style={{ width: '100%', fontSize: '11.5px', padding: '4px 6px', border: '1px solid var(--border)', borderRadius: '5px', background: 'var(--bg3)', color: 'var(--navy)', boxSizing: 'border-box' }}
                          />
                        </div>
                        {quadrant && (
                          <div style={{ padding: '3px 8px', fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-lt)', fontWeight: '600' }}>
                            Filtered to {quadrant} products
                          </div>
                        )}
                        <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                          {masterList.length === 0 ? (
                            <div style={{ padding: '10px 8px', fontSize: '11.5px', color: 'var(--text3)', textAlign: 'center' }}>
                              No products found
                            </div>
                          ) : masterList.map((mp, i) => {
                            const added = isAdded(key, mp);
                            return (
                              <div
                                key={i}
                                onClick={() => !added && addFromList(key, mp)}
                                style={{
                                  padding: '7px 8px', fontSize: '11.5px',
                                  borderBottom: i < masterList.length - 1 ? '1px solid var(--border)' : 'none',
                                  cursor: added ? 'default' : 'pointer',
                                  background: added ? 'var(--bg3)' : 'transparent',
                                  opacity: added ? 0.55 : 1,
                                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px',
                                }}
                                onMouseEnter={e => { if (!added) e.currentTarget.style.background = 'var(--blue-lt)'; }}
                                onMouseLeave={e => { if (!added) e.currentTarget.style.background = 'transparent'; }}
                              >
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: '600', color: added ? 'var(--text3)' : 'var(--navy)', lineHeight: '1.3' }}>{mp.product}</div>
                                  <div style={{ color: 'var(--text3)', fontSize: '10.5px', marginTop: '1px' }}>{mp.dose} &middot; {mp.brand}</div>
                                  {mp.indication && <div style={{ color: 'var(--text3)', fontSize: '10px', marginTop: '2px', fontStyle: 'italic', lineHeight: '1.3' }}>{mp.indication}</div>}
                                </div>
                                {added
                                  ? <span style={{ fontSize: '10px', color: 'var(--green)', fontWeight: '700', flexShrink: 0 }}>&#10003;</span>
                                  : <span style={{ fontSize: '10px', color: 'var(--blue)', flexShrink: 0 }}>+ Add</span>
                                }
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {tab === 'custom' && (
                      <div style={{ padding: '8px' }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <input
                            value={customInput[key] || ''}
                            onChange={e => setCustomInput(prev => ({ ...prev, [key]: e.target.value }))}
                            onKeyDown={e => { if (e.key === 'Enter') addCustom(key); }}
                            placeholder="Type custom item..."
                            style={{ flex: 1, fontSize: '11.5px', padding: '5px 8px', borderRadius: '5px', border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--navy)', minWidth: 0 }}
                          />
                          <button
                            onClick={() => addCustom(key)}
                            style={{ fontSize: '13px', padding: '5px 10px', borderRadius: '5px', border: '1px solid var(--teal)', background: 'var(--teal-lt)', color: 'var(--teal)', cursor: 'pointer', fontWeight: '700' }}
                          >+</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {anyEditing && (
        <div style={{ padding: '0 22px 14px', fontSize: '11px', color: 'var(--text3)' }}>
          Changes are session-only and not saved to the patient record.
        </div>
      )}
    </div>
  );
}

/* ── NeuroVIZR Card (rich clinical mapping) ─────────────── */
function NeuroVizrCard({ programs, quadrant }) {
  const hasBgf = programs.brainGymFoundation?.length > 0;
  const hasQp  = programs.quadrantPrograms?.length > 0;
  const hasFlow = programs.sessionFlow?.length > 0;
  const hasMini = programs.miniProtocol && (programs.miniProtocol.am || programs.miniProtocol.midday || programs.miniProtocol.pm);
  if (!hasBgf && !hasQp && !hasFlow) return null;

  const catColors = {
    'Calm':        { bg: '#ecfdf5', border: '#a7f3d0', text: '#065f46' },
    'Focus':       { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
    'Performance': { bg: '#fef3c7', border: '#fcd34d', text: '#92400e' },
    'Brain Gym':   { bg: '#f5f3ff', border: '#c4b5fd', text: '#5b21b6' },
  };
  const sessionMeta = {
    'Peaceful Heart': { icon: '💚', cat: 'Calm' }, 'Big Peace': { icon: '🕊️', cat: 'Calm' },
    'Gentle Movers': { icon: '🌊', cat: 'Calm' }, 'Calm Down': { icon: '😌', cat: 'Calm' },
    'Still Point': { icon: '🧘', cat: 'Calm' }, 'Heart Space': { icon: '❤️', cat: 'Calm' },
    'Gamma Gamma': { icon: '⚡', cat: 'Focus' }, 'Crystal Clear': { icon: '💎', cat: 'Focus' },
    'Laser Focus': { icon: '🎯', cat: 'Focus' }, 'Focused Attention': { icon: '🔬', cat: 'Focus' },
    'Centered': { icon: '⚖️', cat: 'Performance' },
  };
  const getSessionStyle = (name) => {
    const meta = sessionMeta[name];
    if (meta) { const c = catColors[meta.cat]; return { bg: c.bg, border: c.border, text: c.text, icon: meta.icon }; }
    if (name?.toLowerCase().includes('brain gym') || name?.toLowerCase().includes('coordination') || name?.toLowerCase().includes('flexibility') || name?.toLowerCase().includes('strength') || name?.toLowerCase().includes('endurance')) {
      const c = catColors['Brain Gym']; return { bg: c.bg, border: c.border, text: c.text, icon: '🏋️' };
    }
    return { bg: 'var(--bg3)', border: 'var(--border)', text: 'var(--navy)', icon: '🎧' };
  };

  return (
    <div className="cc" style={{ marginBottom: '16px' }}>
      <div className="ct">🎧 NeuroVIZR Clinical Session Plan</div>
      <div className="cs">AI-recommended sessions based on quadrant, HQP patterns, and Brain Gauge data</div>

      {/* Clinical Intention banner */}
      {programs.clinicalIntention && (
        <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)', border: '1px solid #c4b5fd', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: '#7c3aed', marginBottom: '4px' }}>Clinical Intention</div>
          <div style={{ fontSize: '13px', color: 'var(--navy)', lineHeight: '1.6' }}>{programs.clinicalIntention}</div>
          {programs.frequency && <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>📅 Recommended: {programs.frequency}</div>}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Brain Gym Foundation */}
        {hasBgf && (
          <div style={{ background: catColors['Brain Gym'].bg, border: `1px solid ${catColors['Brain Gym'].border}`, borderRadius: '10px', padding: '14px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: catColors['Brain Gym'].text, marginBottom: '10px' }}>
              🏋️ Brain Gym Foundation <span style={{ fontWeight: 400, fontSize: '9.5px', opacity: .7 }}>(Required First)</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {programs.brainGymFoundation.map((p, i) => (
                <span key={i} style={{ padding: '4px 10px', background: '#fff', border: `1px solid ${catColors['Brain Gym'].border}`, borderRadius: '20px', fontSize: '11.5px', color: catColors['Brain Gym'].text, fontWeight: 600 }}>
                  {i + 1}. {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quadrant Programs */}
        {hasQp && (
          <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '10px' }}>
              📋 {quadrant ? `${quadrant} ` : ''}Quadrant Sessions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {programs.quadrantPrograms.map((p, i) => {
                const s = getSessionStyle(p);
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: s.bg, border: `1px solid ${s.border}`, borderRadius: '8px' }}>
                    <span style={{ fontSize: '14px' }}>{s.icon}</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: s.text }}>{p}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Session Flow */}
      {hasFlow && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '10px' }}>
            🔄 Recommended Session Flow
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
            {programs.sessionFlow.map((step, i) => {
              const s = getSessionStyle(step);
              return (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {i > 0 && <span style={{ color: 'var(--text3)', fontSize: '14px', margin: '0 2px' }}>→</span>}
                  <span style={{ padding: '5px 12px', background: s.bg, border: `1px solid ${s.border}`, borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: s.text }}>
                    {s.icon} {step}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Mini Protocol */}
      {hasMini && (
        <div style={{ marginTop: '16px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px' }}>
          <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '10px' }}>
            ⏰ Daily Session Protocol
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[['🌅 AM', programs.miniProtocol.am], ['☀️ Midday', programs.miniProtocol.midday], ['🌙 PM', programs.miniProtocol.pm]].map(([label, val]) => val && (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text3)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navy)', padding: '6px', background: '#fff', borderRadius: '8px', border: '1px solid var(--border)' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Disclaimer Section ─────────────────────────────────── */
function DisclaimerSection() {
  const [open, setOpen] = useState(false);
  const sections = [
    { title: 'Section 1 – Scope & Intended Use', text: 'CRIS GOLD™ is a clinical decision-support tool intended solely for use by licensed healthcare professionals. It is not a medical device, does not diagnose disease, and does not replace clinical judgment.' },
    { title: 'Section 2 – AI & Algorithmic Limitations', text: 'AI-generated outputs are based on rule-based logic and probabilistic pattern recognition. They may contain errors or omissions. All outputs must be independently verified by the treating practitioner.' },
    { title: 'Section 3 – Not for Emergency Use', text: 'CRIS GOLD™ is not appropriate for medical emergencies, acute psychiatric crises, active cardiac events, or trauma. Seek emergency services immediately in life-threatening situations.' },
    { title: 'Section 4 – Integrative & Bioenergetic Framework', text: 'CRIS GOLD™ integrates conventional physiology with complementary frameworks (including psychosomatic energetics). These frameworks are not universally accepted in conventional medicine. Practitioners must exercise independent clinical judgment.' },
    { title: 'Section 5 – Liability Limitation', text: 'The developers and licensors of CRIS GOLD™ disclaim all liability for clinical decisions made in reliance on system outputs. The treating practitioner bears sole responsibility for all patient care decisions.' },
    { title: 'Section 6 – Intellectual Property', text: 'CRIS GOLD™, all report templates, protocol libraries, and scoring algorithms are proprietary. Unauthorized reproduction or distribution is prohibited.' },
    { title: 'Section 7 – Patient-Facing Notice', text: 'This report was generated using an AI-assisted clinical decision-support system. It is intended for review with your licensed healthcare provider and does not constitute a diagnosis or treatment plan.' },
  ];

  return (
    <div style={{ marginTop: '20px', border: '1px solid var(--border)', borderLeft: '4px solid var(--text3)', borderRadius: '8px', background: 'var(--bg3)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text2)' }}>
          ⚖️ Legal & Clinical Disclaimer — CRIS GOLD™ v1.0
        </span>
        <span style={{ fontSize: '14px', color: 'var(--text3)', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: '0 18px 18px', borderTop: '1px solid var(--border)' }}>
          {sections.map((s, i) => (
            <div key={i} style={{ marginTop: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--navy)', marginBottom: '3px' }}>{s.title}</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text2)', lineHeight: '1.7' }}>{s.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Section Label ──────────────────────────────────────── */
function SectionLabel({ number, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0 10px', pageBreakBefore: 'auto' }}>
      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--navy)', color: '#fff', fontSize: '10px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{number}</div>
      <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--navy)' }}>{title}</div>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </div>
  );
}

/* ── Score Pill ─────────────────────────────────────────── */
function ScorePill({ label, value, sub, color }) {
  return (
    <div style={{ background: 'var(--bg2)', border: `1.5px solid ${color}40`, borderTop: `3px solid ${color}`, borderRadius: '8px', padding: '8px 14px', minWidth: '90px', flex: '1 1 90px', maxWidth: '160px' }}>
      <div style={{ fontSize: '9.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--text3)', marginBottom: '3px' }}>{label}</div>
      <div style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '22px', fontWeight: '700', color, lineHeight: 1, marginBottom: '2px' }}>{value}</div>
      {sub && <div style={{ fontSize: '10px', color: 'var(--text3)', lineHeight: 1.3 }}>{sub}</div>}
    </div>
  );
}

/* ── Generic Info Card ──────────────────────────────────── */
function InfoCard({ icon, title, color, bg, children }) {
  return (
    <div style={{ background: bg, border: `1px solid ${color}25`, borderLeft: `4px solid ${color}`, borderRadius: '8px', padding: '16px 20px', marginBottom: '16px' }}>
      <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color, marginBottom: '8px' }}>
        {icon} {title}
      </div>
      <div style={{ fontSize: '13.5px', color: 'var(--navy2)', lineHeight: '1.8' }}>{children}</div>
    </div>
  );
}

/* ── HRV Clinical Table ─────────────────────────────────── */
function HRVTable({ markers }) {
  const [open, setOpen] = useState(false);
  if (!markers?.length) return null;
  return (
    <div className="card" style={{ marginBottom: '16px' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--navy)' }}>
          📋 Complete HRV Clinical Reference Table
        </span>
        <span style={{ fontSize: '13px', color: 'var(--text3)', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>▾</span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid var(--border)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: 'var(--bg3)' }}>
                <th style={{ padding: '8px 14px', textAlign: 'left', fontWeight: '700', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Marker</th>
                <th style={{ padding: '8px 14px', textAlign: 'right', fontWeight: '700', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Value</th>
                <th style={{ padding: '8px 14px', textAlign: 'right', fontWeight: '700', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Units</th>
                <th style={{ padding: '8px 14px', textAlign: 'center', fontWeight: '700', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Reference</th>
                <th style={{ padding: '8px 14px', textAlign: 'center', fontWeight: '700', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Status</th>
                <th style={{ padding: '8px 14px', textAlign: 'left', fontWeight: '700', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text3)', borderBottom: '1px solid var(--border)' }}>Clinical Note</th>
              </tr>
            </thead>
            <tbody>
              {markers.map((m, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? '#fff' : 'var(--bg3)' }}>
                  <td style={{ padding: '9px 14px', fontWeight: '600', color: 'var(--navy)' }}>{m.name}</td>
                  <td style={{ padding: '9px 14px', textAlign: 'right', fontWeight: '700', color: STATUS_COLOR[m.status], fontFamily: 'monospace', fontSize: '13px' }}>{m.value}</td>
                  <td style={{ padding: '9px 14px', textAlign: 'right', color: 'var(--text3)', fontSize: '11px' }}>{m.unit}</td>
                  <td style={{ padding: '9px 14px', textAlign: 'center', color: 'var(--text3)', fontFamily: 'monospace', fontSize: '11.5px' }}>{m.low}–{m.high}</td>
                  <td style={{ padding: '9px 14px', textAlign: 'center' }}>
                    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '12px', fontSize: '10.5px', fontWeight: '700', background: `${STATUS_COLOR[m.status]}22`, color: STATUS_COLOR[m.status] }}>
                      {m.status === 'high' ? '↑ High' : m.status === 'low' ? '↓ Low' : '✓ Normal'}
                    </span>
                  </td>
                  <td style={{ padding: '9px 14px', color: 'var(--text2)', fontSize: '11.5px', lineHeight: '1.5', fontStyle: 'italic' }}>{m.clinicalNote || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── HRV Pattern Recognition ────────────────────────────── */
function HRVPatternCard({ markers }) {
  const detected = HRV_PATTERNS.find(p => p.test(markers));
  if (!detected) return null;
  return (
    <div style={{ background: detected.bg, border: `1px solid ${detected.color}30`, borderLeft: `4px solid ${detected.color}`, borderRadius: '8px', padding: '14px 18px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '18px' }}>{detected.icon}</span>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: detected.color }}>HRV Pattern Detected</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--navy)' }}>{detected.name}</div>
        </div>
      </div>
      <div style={{ fontSize: '13px', color: 'var(--navy2)', lineHeight: '1.7', marginBottom: '10px' }}>{detected.description}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {detected.symptoms.map((s, i) => (
          <span key={i} style={{ fontSize: '11.5px', padding: '3px 10px', background: `${detected.color}18`, border: `1px solid ${detected.color}30`, borderRadius: '20px', color: detected.color }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── CV Pattern Flags Panel ─────────────────────────────── */
function CVPatternPanel({ report: r, markers, criLabel, criScore }) {
  const stressMarker = markers.find(m => /Stress Index/i.test(m.name));
  const lfMarker     = markers.find(m => /LF%/i.test(m.name));

  const flags = [
    { key: 'highPP',  label: 'High Pulse Pressure',    color: '#c0392b', active: r?.pulsePressure >= 60 },
    { key: 'stiff',   label: 'Arterial Stiffness',      color: '#7b1111', active: r?.pulsePressure >= 70 },
    { key: 'autoLoad',label: 'Elevated Autonomic Load', color: '#b45309', active: stressMarker?.status === 'high' },
    { key: 'baro',    label: 'Baroreflex Dysfunction',  color: '#b45309', active: lfMarker?.status === 'high' },
    { key: 'endo',    label: 'Endothelial Concern',     color: '#c0392b', active: criScore >= 6 },
  ].filter(f => f.active);

  const objectives = CV_PROTOCOL_OBJECTIVES[criLabel] || CV_PROTOCOL_OBJECTIVES['Mild Strain'];

  if (!flags.length && !objectives) return null;

  return (
    <div className="cc" style={{ marginBottom: '16px' }}>
      <div className="ct">💓 Cardiovascular Clinical Pattern</div>
      <div className="cs">Active flags based on HRV and blood pressure data</div>
      {flags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          {flags.map(f => (
            <span key={f.key} style={{ fontSize: '11.5px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', background: `${f.color}18`, color: f.color, border: `1px solid ${f.color}40` }}>
              ⚠ {f.label}
            </span>
          ))}
        </div>
      )}
      {objectives && (
        <div>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text3)', marginBottom: '8px' }}>Protocol Objectives</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {objectives.map((obj, i) => (
              <li key={i} style={{ fontSize: '12.5px', color: 'var(--navy2)', padding: '4px 0', display: 'flex', gap: '8px', borderBottom: i < objectives.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ color: 'var(--teal)', flexShrink: 0 }}>→</span> {obj}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
