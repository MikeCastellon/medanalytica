import { useState, useEffect, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';
import {
  ini, age, fmtDate,
  criMeta, STATUS_COLOR,
  CRISGOLD_QUADRANTS, CV_QUADRANTS,
  BRAIN_GAUGE_METRICS,
} from '../lib/utils';
import { MASTER_PROTOCOL_LIST } from '../lib/protocols';
import Badge from './Badge';

// ── PSE: 28 Emvita Conflict Definitions (verbatim from Rubimed Practitioner Guide) ──
const EMVITA_CONFLICTS = {
  1:  { name: 'Independence',                   chakra: 1, description: 'Conflict of independence and self-determination. Patient suppresses the need for autonomy, often compensating with over-compliance or rigidity. May experience fatigue and muscular tension in the lower back and legs.' },
  2:  { name: 'Lack of Concentration',          chakra: 1, description: 'Difficulty sustaining focus and mental clarity. Repressed conflict around cognitive performance expectations. May present with scattered thinking, forgetfulness, and grounding difficulties.' },
  3:  { name: 'At the Mercy of / Helpless',     chakra: 1, description: 'Conflict of feeling controlled or powerless. Deep helplessness pattern, often rooted in early loss of control experiences. Physical manifestations may include immune suppression and lower extremity weakness.' },
  4:  { name: 'Extremely Self-Controlled',      chakra: 1, description: 'Rigid self-regulation pattern with suppressed spontaneity. Chronically held tension from constant self-monitoring. May manifest as constipation, rigidity, and adrenal overload.' },
  5:  { name: 'Hectic / Nervous',               chakra: 2, description: 'Chronic internal restlessness and nervous agitation. Patient cannot allow stillness; driven by unconscious urgency. Associated with kidney/adrenal stress and creative/sexual energy dysregulation.' },
  6:  { name: 'Perseverance',                   chakra: 2, description: 'Compulsive drive to push through at all costs. Inability to rest or accept limitations. Often linked to burnout patterns, lower abdominal tension, and reproductive system stress.' },
  7:  { name: 'Show of Strength / Stubborn',    chakra: 2, description: 'Compensatory strength display masking inner vulnerability. Stubbornness as a defense against perceived weakness. May present with hip tension, sacral pain, and hormonal imbalance.' },
  8:  { name: 'Isolated',                       chakra: 3, description: 'Deep conflict of social disconnection and belonging. Feels fundamentally separate from others. Solar plexus tension, digestive disorders, and weakened immune identity are common.' },
  9:  { name: 'Pent-up Emotions',               chakra: 3, description: 'Chronically suppressed emotional expression. Emotions are held internally, creating physiological tension. Associated with upper digestive disorders, liver stress, and diaphragmatic holding.' },
  10: { name: 'Wanting More',                   chakra: 3, description: 'Insatiable desire pattern; never enough. Driven by an inner void seeking external fulfillment. May manifest as compulsive behaviors, metabolic dysregulation, and spleen/stomach imbalance.' },
  11: { name: 'Craving Good Feelings',          chakra: 3, description: 'Conflict of dependency on pleasurable states to regulate inner discomfort. Avoidance of difficult emotions through sensation-seeking. Associated with blood sugar dysregulation and pancreatic stress.' },
  12: { name: 'Mental Overexertion',            chakra: 4, description: 'Chronic mental over-engagement with inability to disengage. The mind cannot rest. Heart rhythm irregularities, hypertension, and thoracic tension are frequently observed.' },
  13: { name: 'Withdrawn / Deeply Injured',     chakra: 4, description: 'Profound emotional withdrawal following deep wounding. Protective isolation from further hurt. May present with cardiac vulnerability, immune dysregulation, and thymus stress.' },
  14: { name: 'Introverted / Compulsive',       chakra: 4, description: 'Turned inward with compulsive internal repetition. Rumination cycles prevent resolution. Associated with cardiac tension, breathing restrictions, and mid-thoracic holding patterns.' },
  15: { name: 'Apprehensive',                   chakra: 4, description: 'Persistent low-grade anxiety and anticipatory fear. Constant vigilance for threat. Heart palpitations, shallow breathing, and adrenal activation are common presentations.' },
  16: { name: 'Panic',                          chakra: 4, description: 'Acute overwhelm response with complete regulatory collapse. Trauma-rooted freeze/flight activation. Severe cardiac and respiratory involvement; ANS dysregulation pattern.' },
  17: { name: 'Emotional Emptiness',            chakra: 5, description: 'Profound depletion of emotional reserves. The patient feels hollow and unable to access genuine feeling. Throat and thyroid involvement; communication and expression are compromised.' },
  18: { name: 'Rushed',                         chakra: 5, description: 'Chronically time-pressured with inability to be present. Speed and urgency override authentic expression. Associated with thyroid overstimulation and neck/shoulder tension.' },
  19: { name: 'Timid / Faint-Hearted',          chakra: 6, description: 'Suppressed courage and assertiveness; withdraws under pressure. Inner voice is silenced. May present with tension headaches, visual disturbances, and pituitary/pineal dysregulation.' },
  20: { name: 'Self-Sufficient',                chakra: 6, description: 'Compulsive self-reliance as defense against vulnerability. Cannot receive help or nurturing from others. Associated with chronic tension headaches and overactivated prefrontal patterns.' },
  21: { name: 'Physical Overexertion',          chakra: 6, description: 'Drives the body past its limits repeatedly. Disconnected from physical warning signals. Chronic fatigue, adrenal exhaustion, and musculoskeletal breakdown are common.' },
  22: { name: 'Restless / Mentally Hyperactive',chakra: 6, description: 'Racing mind with inability to quiet mental activity. Excessive mental processing blocks intuition and rest. Associated with insomnia, migraines, and sympathetic overdrive.' },
  23: { name: 'Tense',                          chakra: 6, description: 'Chronic whole-body tension pattern; bracing against life. Cannot release and trust. Manifests as widespread myofascial tension, jaw clenching, and cortisol dysregulation.' },
  24: { name: 'Uneasiness / Discomfort',        chakra: 6, description: 'Persistent nameless discomfort and inner unease. Cannot identify the source of distress. Associated with diffuse somatic complaints, neuralgia, and autonomic sensitivity.' },
  25: { name: 'Mistrust',                       chakra: 7, description: 'Fundamental inability to trust life, others, or the universe. Hypervigilance rooted in early safety failures. May present with immune dysregulation, neurological sensitivity, and CNS overactivation.' },
  26: { name: 'Materialistic',                  chakra: 7, description: 'Over-identification with material reality; blocks spiritual and intuitive dimensions. Creates existential emptiness masked by acquisition. Associated with neurological tension and crown/head pressure.' },
  27: { name: 'Unwilling to Face Reality',      chakra: 7, description: 'Avoidance of difficult truths; reality denial as a coping mechanism. Associated with dissociation, perceptual distortions, and neurological vulnerabilities.' },
  28: { name: 'Wrong Thinking',                 chakra: 7, description: 'Distorted cognitive patterns and belief systems that perpetuate suffering. Difficulty correcting ingrained negative conclusions about self and world. Associated with cerebral tension and higher cortical dysregulation.' },
};

// ── PSE: 7 Chavita Chakra Remedy Descriptions ──────────────────────────────
const CHAVITA_CHAKRAS = {
  1: { name: 'Root / Base Chakra',    color: '#c0392b', description: 'Physical foundation, survival instincts, vitality, and grounding. Governs the legs, feet, lower back, immune system, and adrenal glands. Balances the energy of security and physical existence.' },
  2: { name: 'Sacral Chakra',         color: '#e67e22', description: 'Creative expression, sexuality, emotional fluidity, and pleasure. Governs reproductive organs, kidneys, and lower abdomen. Balances desire, creativity, and relational energy.' },
  3: { name: 'Solar Plexus Chakra',   color: '#f1c40f', description: 'Personal power, self-esteem, will, and digestion. Governs the stomach, liver, pancreas, and upper abdomen. Balances autonomy, identity, and metabolic vitality.' },
  4: { name: 'Heart Chakra',          color: '#27ae60', description: 'Love, compassion, emotional healing, and connection. Governs the heart, lungs, thymus, and circulatory system. Balances giving and receiving, self-love, and cardiac coherence.' },
  5: { name: 'Throat Chakra',         color: '#2980b9', description: 'Communication, authentic expression, truth, and listening. Governs the throat, thyroid, parathyroid, and cervical spine. Balances voice, boundaries, and self-expression.' },
  6: { name: 'Third Eye Chakra',      color: '#8e44ad', description: 'Intuition, insight, mental clarity, and perception. Governs the pituitary gland, eyes, and prefrontal cortex. Balances inner vision, cognitive function, and intuitive intelligence.' },
  7: { name: 'Crown Chakra',          color: '#6c3483', description: 'Spiritual connection, higher consciousness, and universal awareness. Governs the pineal gland and cerebral cortex. Balances transcendence, meaning, and the integration of body and spirit.' },
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

export default function PatientReport({ patient, report, saveError, onBack, doctorName }) {
  const [reportTab, setReportTab] = useState('clinician');
  if (!report) return null;
  const r = report;
  const markers = r.hrvMarkers?.length ? r.hrvMarkers : (r.markers || []);
  const patName = `${patient.first_name} ${patient.last_name}`;
  const overallStatus = r.overallStatus || (r.criScore >= 6 ? 'critical' : r.criScore >= 3 ? 'warning' : 'normal');
  const cri = criMeta(r.criScore);
  const cgQ = r.crisgoldQuadrant ? CRISGOLD_QUADRANTS[r.crisgoldQuadrant] : null;
  const cvQ = r.cvQuadrant       ? CV_QUADRANTS[r.cvQuadrant]             : null;
  const eli = r.eli ?? r.hrqEli;
  const ari = r.ari ?? r.hrqAri;

  const chartData = markers.map(m => ({
    name:     m.name.split(' ').slice(-1)[0],
    fullName: m.name,
    value:    m.value,
    pct:      Math.min(Math.max(((m.value - m.low) / ((m.high - m.low) || 1)) * 100, 0), 140),
    status:   m.status,
    unit:     m.unit,
    low:      m.low,
    high:     m.high,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px', boxShadow: 'var(--shadow2)', fontSize: '12.5px' }}>
        <div style={{ fontWeight: '600', color: 'var(--navy)', marginBottom: '4px' }}>{d.fullName}</div>
        <div style={{ color: STATUS_COLOR[d.status] }}>Value: <strong>{d.value} {d.unit}</strong></div>
        <div style={{ color: 'var(--text2)' }}>Range: {d.low}–{d.high} {d.unit}</div>
      </div>
    );
  };

  const generatedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const reportId = `CG-${Date.now().toString(36).toUpperCase().slice(-8)}`;

  return (
    <div className="fade-in">
      <div className="report-toolbar no-print">
        <button className="back-btn" onClick={onBack} style={{ margin: 0 }}>← Back to Dashboard</button>
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg3)', borderRadius: '8px', padding: '4px', border: '1px solid var(--border)' }}>
          {[{ id: 'clinician', label: '🩺 Clinician View' }, { id: 'patient', label: '👤 Patient Summary' }].map(({ id, label }) => (
            <button key={id} onClick={() => setReportTab(id)} style={{ padding: '7px 16px', fontSize: '12.5px', fontWeight: '600', borderRadius: '6px', border: 'none', cursor: 'pointer', background: reportTab === id ? 'var(--navy)' : 'transparent', color: reportTab === id ? '#fff' : 'var(--text2)', transition: 'all .15s' }}>{label}</button>
          ))}
        </div>
        <button className="btn btn-nv" style={{ fontSize: '12.5px', padding: '8px 18px' }} onClick={() => window.print()}>
          ⬇ Export PDF
        </button>
      </div>

      {/* ── CRIS GOLD™ Branded Report Header ── */}
      <div className="report-header" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a3a5c 60%, #7a5209 100%)', borderRadius: '12px', padding: '28px 32px', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', boxShadow: '0 4px 20px rgba(10,22,40,.35)' }}>
        <div style={{ flex: 1 }}>
          {/* Brand line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#7a5209', border: '2px solid #f5c842', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>❤</div>
            <div>
              <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.14em', color: '#f5c842', lineHeight: 1 }}>CRIS GOLD™</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.55)', marginTop: '2px' }}>by MedAnalytica · Clinical Report Intelligence System</div>
            </div>
          </div>
          {/* Patient name + status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '26px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>{patName}</div>
            <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', background: overallStatus === 'critical' ? 'rgba(192,57,43,.35)' : overallStatus === 'warning' ? 'rgba(180,83,9,.35)' : 'rgba(14,122,85,.35)', color: overallStatus === 'critical' ? '#f87171' : overallStatus === 'warning' ? '#fbbf24' : '#6ee7b7', border: `1px solid ${overallStatus === 'critical' ? '#f8717160' : overallStatus === 'warning' ? '#fbbf2460' : '#6ee7b760'}` }}>
              {overallStatus === 'critical' ? '⚠ Critical' : overallStatus === 'warning' ? '⚠ Review' : '✓ Normal'}
            </span>
          </div>
          {/* Meta row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '12px', color: 'rgba(255,255,255,.7)' }}>
            {patient.mrn       && <span>📋 {patient.mrn}</span>}
            {patient.dob       && <span>Age {age(patient.dob)}</span>}
            {patient.gender    && <span>{patient.gender}</span>}
            {r.collection_date && <span>📅 {fmtDate(r.collection_date)}</span>}
            {r.report_type     && <span>🧬 {r.report_type}</span>}
            {r.bloodPressure   && <span>💓 BP {r.bloodPressure}</span>}
            {r.pulsePressure   && <span>PP {r.pulsePressure} mmHg</span>}
          </div>
          {r.chiefComplaints && (
            <div style={{ marginTop: '10px', fontSize: '12.5px', color: 'rgba(255,255,255,.8)', fontStyle: 'italic' }}>
              "{r.chiefComplaints}"
            </div>
          )}
        </div>
        {/* Right side: key scores */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', flexShrink: 0 }}>
          {r.criScore != null && (
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,.1)', borderRadius: '10px', padding: '10px 16px', minWidth: '80px' }}>
              <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.55)', marginBottom: '2px' }}>CRI</div>
              <div style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '32px', fontWeight: '700', color: cri.color, lineHeight: 1 }}>{r.criScore}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.45)' }}>/ 12</div>
            </div>
          )}
          {cgQ && (
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,.1)', borderRadius: '10px', padding: '8px 16px', minWidth: '80px' }}>
              <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.55)', marginBottom: '2px' }}>Quadrant</div>
              <div style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '26px', fontWeight: '700', color: cgQ.color, lineHeight: 1 }}>{r.crisgoldQuadrant}</div>
              <div style={{ fontSize: '9px', color: cgQ.color, fontWeight: '600' }}>{cgQ.sub || cgQ.label}</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Score Bar ── */}
      {(eli != null || ari != null || r.criScore != null || cgQ) && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
          {r.criScore != null && <ScorePill label="CRI Score" value={`${r.criScore}/12`} sub={cri.label} color={cri.color} />}
          {eli != null && <ScorePill label="ELI" value={eli} sub={eli >= 50 ? 'High Emotional Load' : 'Low Emotional Load'} color={eli >= 50 ? '#c0392b' : '#0e7a55'} />}
          {ari != null && <ScorePill label="ARI" value={ari} sub={ari >= 60 ? 'High Regulation' : 'Low Regulation'} color={ari >= 60 ? '#0e7a55' : '#c0392b'} />}
          {cgQ && <ScorePill label="CRIS GOLD™ Quadrant" value={r.crisgoldQuadrant} sub={cgQ.label} color={cgQ.color} />}
          {cvQ && <ScorePill label="CV Quadrant" value={r.cvQuadrant} sub={cvQ.label} color={cvQ.color} />}
          {r.adrenalUrineDrops != null && <ScorePill label="Adrenal (Urine)" value={`${r.adrenalUrineDrops} drops`} sub={r.adrenalInterpretation} color="var(--amber)" />}
        </div>
      )}

      {/* ── Save Error Banner ── */}
      {saveError && (
        <div style={{ background: '#fffbeb', border: '1px solid #f59e0b', borderLeft: '4px solid #f59e0b', borderRadius: '8px', padding: '8px 14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11.5px', color: '#92400e' }}>
          <span style={{ fontSize: '14px' }}>⚠️</span>
          <span><strong>Report generated but not saved to patient records.</strong> {saveError}</span>
        </div>
      )}

      {/* ── HIPAA Notice ── */}
      <div className="no-print" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderLeft: '4px solid #3b82f6', borderRadius: '8px', padding: '8px 14px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11.5px', color: '#1e40af' }}>
        <span>🔒</span>
        <span><strong>HIPAA PHI.</strong> Intended solely for the authorized treating practitioner. Handle per your facility's PHI policies (45 CFR §§ 164.502–164.514).</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: '10.5px', color: '#93c5fd', flexShrink: 0 }}>Report ID: {reportId}</span>
      </div>

      {/* ── PATIENT SUMMARY TAB ── */}
      {reportTab === 'patient' && (
        <div>
          {cgQ && (
            <div style={{ background: cgQ.bg, border: `1px solid ${cgQ.color}30`, borderLeft: `4px solid ${cgQ.color}`, borderRadius: '8px', padding: '16px 20px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: cgQ.color, marginBottom: '5px' }}>
                Your Health Quadrant: {r.crisgoldQuadrant} — {cgQ.label}
              </div>
              <div style={{ fontSize: '13.5px', color: 'var(--navy2)', lineHeight: '1.8' }}>{cgQ.description}</div>
            </div>
          )}
          {r.patientFriendlySummary ? (
            <div style={{ background: '#f0fdf4', border: '1px solid rgba(14,122,85,.2)', borderLeft: '4px solid var(--green)', borderRadius: '8px', padding: '18px 22px', marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--green)', marginBottom: '8px' }}>Summary for You</div>
              <div style={{ fontSize: '14px', color: 'var(--navy2)', lineHeight: '1.85' }}>{r.patientFriendlySummary}</div>
            </div>
          ) : (
            <div style={{ fontSize: '13px', color: 'var(--text2)', padding: '16px', textAlign: 'center' }}>
              No patient summary available for this report.
            </div>
          )}
          {r.therapeuticSelections && (
            <div className="card" style={{ marginBottom: '16px' }}>
              <div className="card-hdr"><span className="card-title">💊 Your Recommended Supplements</span></div>
              <div style={{ padding: '16px 22px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {[
                  { key: 'drainage',              icon: '🚿', label: 'Drainage' },
                  { key: 'cellMembraneSupport',   icon: '🧬', label: 'Cell Membrane' },
                  { key: 'mitochondrialSupport',  icon: '⚡', label: 'Mitochondrial' },
                  { key: 'neurocognitiveSupport', icon: '🧠', label: 'Neurocognitive' },
                  { key: 'oxidativeStressSupport',icon: '⚗️', label: 'Oxidative Stress' },
                  { key: 'cardiovascularSupport', icon: '💓', label: 'Cardiovascular' },
                ].map(({ key, icon, label }) => {
                  const items = r.therapeuticSelections[key] || [];
                  if (!items.length) return null;
                  return (
                    <div key={key}>
                      <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '8px' }}>{icon} {label}</div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {items.map((item, i) => (
                          <li key={i} style={{ fontSize: '12.5px', color: 'var(--navy)', padding: '3px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                            • {item.split(' — ')[0]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {r.recommendedFollowUp && (
            <div style={{ marginTop: '4px', background: 'var(--teal-lt)', border: '1px solid rgba(14,138,122,.2)', borderLeft: '4px solid var(--teal)', borderRadius: '8px', padding: '16px 20px', marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--teal)', marginBottom: '6px' }}>📅 Next Steps</div>
              <div style={{ fontSize: '13.5px', color: 'var(--navy2)', lineHeight: '1.7' }}>{r.recommendedFollowUp}</div>
            </div>
          )}
          <DisclaimerSection />
        </div>
      )}

      {/* ── CLINICIAN VIEW TAB ── */}
      {reportTab === 'clinician' && <div>

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
      <div className="sum">
        <div className="sum-lbl">🤖 AI Clinical Summary</div>
        <div className="sum-txt">{r.aiSummary}</div>
      </div>

      {/* ── §2 CRI Score ── */}
      {r.criScore != null && <><SectionLabel number={2} title="Cardiovascular Risk Index (CRI)" /><CRICard cri={cri} score={r.criScore} category={r.criCategory} /></>}

      {/* ── §3 CRIS GOLD™ Quadrant + CV Quadrant ── */}
      {(cgQ || cvQ) && <SectionLabel number={3} title="Quadrant Placement" />}
      {(cgQ || cvQ) && (
        <div className="rg" style={{ gridTemplateColumns: cgQ && cvQ ? '1fr 1fr' : '1fr' }}>
          {cgQ && (
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
          )}
          {cvQ && (
            <QuadrantCard
              title="Cardiovascular Risk Quadrant"
              subtitle="Cardiovascular system classification"
              quadrant={r.cvQuadrant}
              meta={cvQ}
              qDefs={CV_QUADRANTS}
            />
          )}
        </div>
      )}

      {/* ── §4 HRV Markers Chart ── */}
      {chartData.length > 0 && <SectionLabel number={4} title="HRV Markers & Reference Ranges" />}
      {chartData.length > 0 && (
        <div className="rg">
          <div className="cc">
            <div className="ct">HRV / Lab Values vs. Reference Range</div>
            <div className="cs">% of upper reference limit — dashed line = 100% (upper normal)</div>
            <ResponsiveContainer width="100%" height={248}>
              <BarChart data={chartData} margin={{ top: 4, right: 0, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={100} stroke="var(--border2)" strokeDasharray="5 3" />
                <Bar dataKey="pct" radius={[4, 4, 0, 0]} maxBarSize={34}>
                  {chartData.map((e, i) => <Cell key={i} fill={STATUS_COLOR[e.status]} fillOpacity={0.72} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="cc">
            <div className="ct">Marker Detail</div>
            <div className="cs">Values with reference intervals</div>
            <div className="ml">
              {markers.map((m, i) => {
                const pct = Math.min(Math.max(((m.value - m.low) / ((m.high - m.low) || 1)) * 100, 0), 100);
                return (
                  <div key={i} className="mr">
                    <div className="mn">{m.name}</div>
                    <div>
                      <div className="mb"><div className="mbi" style={{ width: `${pct}%`, background: STATUS_COLOR[m.status], opacity: .7 }} /></div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text3)', marginTop: '2px' }}>{m.low}–{m.high} {m.unit}</div>
                    </div>
                    <div className="mv" style={{ color: STATUS_COLOR[m.status] }}>{m.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── §5 HRV Summary ── */}
      {r.hrvSummary && <SectionLabel number={5} title="Autonomic Nervous System Interpretation" />}
      {r.hrvSummary && (
        <InfoCard icon="🫀" title="Autonomic Nervous System Summary" color="var(--blue)" bg="var(--blue-lt)">
          {r.hrvSummary}
        </InfoCard>
      )}

      {/* ── §6 Polyvagal + Adrenal ── */}
      {(r.polyvagalInterpretation || r.adrenalSummary) && <SectionLabel number={6} title="Polyvagal & Adrenal Assessment" />}
      {(r.polyvagalInterpretation || r.adrenalSummary) && (
        <div className="rg" style={{ gridTemplateColumns: r.polyvagalInterpretation && r.adrenalSummary ? '1fr 1fr' : '1fr' }}>
          {r.polyvagalInterpretation && (
            <InfoCard
              icon={r.polyvagalRuleOf3Met ? '🔴' : '🟡'}
              title={`Polyvagal Rule of 3: ${r.polyvagalRuleOf3Met ? 'MET — True Freeze Pattern' : 'Not Met — Exhausted System'}`}
              color={r.polyvagalRuleOf3Met ? 'var(--red)' : 'var(--amber)'}
              bg={r.polyvagalRuleOf3Met ? 'var(--red-lt)' : 'var(--amber-lt)'}
            >
              {r.polyvagalInterpretation}
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
      {r.therapeuticSelections && <SectionLabel number={9} title="Therapeutic Selections" />}
      {r.therapeuticSelections && <TherapeuticCard selections={r.therapeuticSelections} quadrant={r.crisgoldQuadrant} />}

      {/* ── NeuroVIZR ── */}
      {r.neuroVizrPrograms && <NeuroVizrCard programs={r.neuroVizrPrograms} />}

      {/* ── Psychosomatic Energetics ── */}
      {r.psychosomaticFindings && (
        <InfoCard icon="🔮" title="Psychosomatic Energetics" color="var(--teal)" bg="var(--teal-lt)">
          {r.psychosomaticFindings}
        </InfoCard>
      )}

      {/* ── Patient-Friendly Summary ── */}
      {r.patientFriendlySummary && (
        <div style={{ background: '#f0fdf4', border: '1px solid rgba(14,122,85,.2)', borderLeft: '4px solid var(--green)', borderRadius: '8px', padding: '18px 22px', marginTop: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--green)', marginBottom: '8px' }}>👤 Patient-Friendly Summary</div>
          <div style={{ fontSize: '14px', color: 'var(--navy2)', lineHeight: '1.85' }}>{r.patientFriendlySummary}</div>
        </div>
      )}

      {/* ── Follow-up ── */}
      {r.recommendedFollowUp && (
        <div style={{ marginTop: '16px', background: 'var(--teal-lt)', border: '1px solid rgba(14,138,122,.2)', borderLeft: '4px solid var(--teal)', borderRadius: '8px', padding: '16px 20px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--teal)', marginBottom: '6px' }}>📅 Recommended Follow-Up</div>
          <div style={{ fontSize: '13.5px', color: 'var(--navy2)', lineHeight: '1.7' }}>{r.recommendedFollowUp}</div>
        </div>
      )}

      <DisclaimerSection />

      </div>} {/* end clinician tab */}
    </div>
  );
}

/* ── CRI Score Card ─────────────────────────────────────── */
function CRICard({ cri, score, category }) {
  const bands = [
    { label: '9–12', color: '#7b1111', range: [9, 12] },
    { label: '6–8',  color: '#c0392b', range: [6, 8]  },
    { label: '3–5',  color: '#b45309', range: [3, 5]  },
    { label: '0–2',  color: '#0e7a55', range: [0, 2]  },
  ];
  const pct = Math.min((score / 12) * 100, 100);

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
            Cardiovascular Risk Index (CRI)
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
            CRI of <strong>{score}</strong> — <strong style={{ color: cri.color }}>{category || cri.label}</strong>.
            {score >= 9 && ' Urgent cardiovascular evaluation recommended.'}
            {score >= 6 && score < 9 && ' Cardiovascular intervention and close monitoring recommended.'}
            {score >= 3 && score < 6 && ' Lifestyle modifications and periodic monitoring advised.'}
            {score < 3 && ' Continue healthy habits and routine monitoring.'}
          </div>
        </div>
      </div>
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
        <div style={{ background: meta.bg, border: `1px solid ${meta.color}30`, borderLeft: `4px solid ${meta.color}`, borderRadius: '8px', padding: '12px 16px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: meta.color, marginBottom: '5px' }}>
            {quadrant}: {meta.label}
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--navy2)', lineHeight: '1.7' }}>{meta.description}</div>
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

/* ── Psychosomatic Energetics — Rubimed Card (PSE Guide verbatim) ─────────── */
function RubimedCard({ chavita, emvita, method, chavitaText, emvitaText, acuteRemedies, acuteRemedyTexts }) {
  const chavitaInfo = chavita ? CHAVITA_CHAKRAS[chavita] : null;
  const emvitaInfo  = emvita  ? EMVITA_CONFLICTS[emvita]  : null;
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
        <strong>What is Psychosomatic Energetics (PSE)?</strong> PSE is a method that addresses repressed emotional traumas — called <em>conflicts</em> — that store life energy and block its normal flow. Using the RebaPad Test Device, four energy levels are tested: <strong>Vital</strong> (physical &amp; regenerative powers), <strong>Emotional</strong> (mood, resilience), <strong>Mental</strong> (concentration, focus), and <strong>Causal</strong> (intuition, inner sensitivity). Conflicts are treated with homeopathic compound remedies (Emvita 1–28), always paired with the corresponding Chakra remedy (Chavita 1–7).
      </div>

      {/* Chavita + Emvita Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>

        {/* Chavita — Chakra Remedy */}
        {chavita && (
          <div style={{ borderRadius: '10px', border: `2px solid ${chakraColor}40`, overflow: 'hidden' }}>
            <div style={{ background: chakraColor, padding: '10px 14px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.8)', marginBottom: '2px' }}>
                Chavita {chavita} — Chakra Remedy
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
                {chavitaInfo ? `Chakra ${chavita}: ${chavitaInfo.name}` : `Chakra #${chavita}`}
              </div>
            </div>
            <div style={{ background: 'var(--bg3)', padding: '12px 14px' }}>
              {chavitaInfo && (
                <div style={{ fontSize: '12.5px', color: 'var(--navy2)', lineHeight: '1.75', marginBottom: '8px' }}>
                  {chavitaInfo.description}
                </div>
              )}
              {chavitaText && chavitaText !== chavitaInfo?.description && (
                <div style={{ fontSize: '12.5px', color: 'var(--navy2)', lineHeight: '1.75', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '4px' }}>
                  {chavitaText}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Emvita — Emotional Conflict Remedy */}
        {emvita && (
          <div style={{ borderRadius: '10px', border: `2px solid ${chakraColor}40`, overflow: 'hidden' }}>
            <div style={{ background: `${chakraColor}dd`, padding: '10px 14px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.8)', marginBottom: '2px' }}>
                Emvita {emvita} — Emotional Conflict
                {emvitaInfo && <span style={{ marginLeft: '6px', fontWeight: '400' }}>(Chakra {emvitaInfo.chakra})</span>}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
                Conflict: {emvitaInfo ? emvitaInfo.name : `Pattern #${emvita}`}
              </div>
            </div>
            <div style={{ background: 'var(--bg3)', padding: '12px 14px' }}>
              {emvitaInfo && (
                <div style={{ fontSize: '12.5px', color: 'var(--navy2)', lineHeight: '1.75', marginBottom: '8px' }}>
                  {emvitaInfo.description}
                </div>
              )}
              {emvitaText && emvitaText !== emvitaInfo?.description && (
                <div style={{ fontSize: '12.5px', color: 'var(--navy2)', lineHeight: '1.75', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '4px' }}>
                  {emvitaText}
                </div>
              )}
            </div>
          </div>
        )}
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

/* ── Therapeutic Selections Card (Editable + Master List) ── */
function TherapeuticCard({ selections, quadrant }) {
  const categories = [
    { key: 'drainage',              icon: '🚿', label: 'Drainage (First Priority)' },
    { key: 'cellMembraneSupport',   icon: '🧬', label: 'Cell Membrane Support' },
    { key: 'mitochondrialSupport',  icon: '⚡', label: 'Mitochondrial Support' },
    { key: 'neurocognitiveSupport', icon: '🧠', label: 'Neurocognitive Support' },
    { key: 'oxidativeStressSupport',icon: '⚗️', label: 'Oxidative Stress Support' },
    { key: 'cardiovascularSupport', icon: '💓', label: 'Cardiovascular Support' },
  ];

  const [editSels, setEditSels]         = useState(() => {
    const s = {};
    categories.forEach(c => { s[c.key] = [...(selections?.[c.key] || [])]; });
    return s;
  });
  const [editCols, setEditCols]         = useState({});        // per-category edit open state
  const [addTab, setAddTab]             = useState({});        // 'browse' | 'custom' per category
  const [customInput, setCustomInput]   = useState({});
  const [searchText, setSearchText]     = useState({});

  const isEditing  = (key) => !!editCols[key];
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

  const hasAny    = categories.some(c => editSels[c.key]?.length > 0);
  const anyEditing = categories.some(c => isEditing(c.key));
  if (!hasAny && !anyEditing) return null;

  return (
    <div className="card" style={{ marginBottom: '16px' }}>
      <div className="card-hdr">
        <span className="card-title">💊 Therapeutic Selections</span>
        {quadrant && <span className="badge b-bl">{quadrant} Protocol</span>}
      </div>

      <div style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {categories.map(({ key, icon, label }) => {
          const items      = editSels[key];
          const tab        = addTab[key] || 'browse';
          const masterList = getMasterList(key);
          const editing    = isEditing(key);
          if (!items?.length && !editing) return null;

          return (
            <div key={key}>
              {/* Category header with per-column edit button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)' }}>
                  {icon} {label}
                </div>
                <button
                  onClick={() => toggleEdit(key)}
                  title={editing ? 'Done editing' : 'Edit this category'}
                  style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '5px', border: `1px solid ${editing ? 'var(--navy)' : 'var(--border)'}`, background: editing ? 'var(--navy)' : 'var(--bg3)', color: editing ? '#fff' : 'var(--text3)', cursor: 'pointer', fontWeight: '600', flexShrink: 0 }}
                >
                  {editing ? '✓ Done' : '✏️'}
                </button>
              </div>

              {/* Current items */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12.5px', color: 'var(--navy)', padding: '4px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ flex: 1, lineHeight: '1.5' }}>• {item}</span>
                    {editing && (
                      <button
                        onClick={() => removeItem(key, i)}
                        title="Remove"
                        style={{ flexShrink: 0, fontSize: '11px', lineHeight: 1, padding: '2px 6px', borderRadius: '4px', border: '1px solid #e3342f40', background: '#fef2f2', color: '#e3342f', cursor: 'pointer' }}
                      >✕</button>
                    )}
                  </li>
                ))}
              </ul>

              {/* Add panel — edit mode only */}
              {editing && (
                <div style={{ marginTop: '10px', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                  {/* Tab switcher */}
                  <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg3)' }}>
                    {[{ id: 'browse', lbl: '📋 Master List' }, { id: 'custom', lbl: '✏️ Custom' }].map(({ id, lbl }) => (
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

                  {/* Browse tab */}
                  {tab === 'browse' && (
                    <div>
                      <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--border)' }}>
                        <input
                          placeholder="🔍 Filter products…"
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
                        ) : masterList.map((p, i) => {
                          const added = isAdded(key, p);
                          return (
                            <div
                              key={i}
                              onClick={() => !added && addFromList(key, p)}
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
                                <div style={{ fontWeight: '600', color: added ? 'var(--text3)' : 'var(--navy)', lineHeight: '1.3' }}>{p.product}</div>
                                <div style={{ color: 'var(--text3)', fontSize: '10.5px', marginTop: '1px' }}>{p.dose} · {p.brand}</div>
                              </div>
                              {added
                                ? <span style={{ fontSize: '10px', color: 'var(--green)', fontWeight: '700', flexShrink: 0 }}>✓</span>
                                : <span style={{ fontSize: '10px', color: 'var(--blue)', flexShrink: 0 }}>+ Add</span>
                              }
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Custom tab */}
                  {tab === 'custom' && (
                    <div style={{ padding: '8px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <input
                          value={customInput[key] || ''}
                          onChange={e => setCustomInput(prev => ({ ...prev, [key]: e.target.value }))}
                          onKeyDown={e => { if (e.key === 'Enter') addCustom(key); }}
                          placeholder="Type custom item…"
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
          );
        })}
      </div>

      {anyEditing && (
        <div style={{ padding: '0 22px 14px', fontSize: '11px', color: 'var(--text3)' }}>
          ⚠️ Changes are session-only and not saved to the patient record.
        </div>
      )}
    </div>
  );
}

/* ── NeuroVIZR Card ─────────────────────────────────────── */
function NeuroVizrCard({ programs }) {
  const hasBgf = programs.brainGymFoundation?.length > 0;
  const hasQp  = programs.quadrantPrograms?.length > 0;
  if (!hasBgf && !hasQp) return null;

  return (
    <div className="cc" style={{ marginBottom: '16px' }}>
      <div className="ct">🎧 NeuroVIZR Program Recommendations</div>
      <div className="cs">Recommended sessions based on quadrant placement</div>
      <div style={{ display: 'grid', gridTemplateColumns: hasBgf && hasQp ? '1fr 1fr' : '1fr', gap: '16px' }}>
        {hasBgf && (
          <div>
            <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '8px' }}>
              🏋️ Brain Gym Foundation (Required First)
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {programs.brainGymFoundation.map((p, i) => (
                <span key={i} style={{ padding: '4px 10px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '20px', fontSize: '12px', color: 'var(--navy)' }}>
                  {i + 1}. {p}
                </span>
              ))}
            </div>
          </div>
        )}
        {hasQp && (
          <div>
            <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '8px' }}>
              📋 Quadrant Programs
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {programs.quadrantPrograms.map((p, i) => (
                <li key={i} style={{ fontSize: '12.5px', color: 'var(--navy)', padding: '4px 0', borderBottom: i < programs.quadrantPrograms.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  • {p}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
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
