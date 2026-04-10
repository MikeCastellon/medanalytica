/**
 * CRIS GOLD™ Final Summary Screen — §12 Patient Action Plan
 * Converts clinical findings into a structured, prioritized patient execution plan.
 * Locked spec: CRIS_GOLD_Final_Summary_Screen_Dev_Spec.docx
 */

import { useState } from 'react';
import { CHAVITA_DESCRIPTIONS, EMVITA_DESCRIPTIONS } from '../lib/rubimed';

// ── Patient-friendly remedy summaries ────────────────────────────────────────
const ACUTE_SUMMARY = {
  Anxiovita: 'Helps ease anxiety, panic, and fearful states. Supports the nervous system in re-establishing calm.',
  Neurovita: 'Calms nervous system overstimulation and emotional tension. Helps you relax and unwind.',
  Simvita:   'Supports the nervous system when overdrive causes restlessness, rapid heart rate, or digestive upset.',
  Paravita:  'Supports the nervous system when sluggishness, cramping, or constipation patterns are present.',
  Geovita:   'Supports recovery from chronic exhaustion and sensitivity to environmental stressors.',
};

const PEKANA_KIT = {
  name: 'Pekana Detox Kit',
  detail: 'apo-HEPAT · Renelix · Itires — all 3 taken together in one glass of water',
  summary: 'Supports your body\'s natural drainage pathways — liver, kidney, and lymphatic system. Taken together in one glass of water.',
};

const PRIORITY_LABELS = {
  mitochondrialSupport:  'Mitochondrial Support',
  cardiovascularSupport: 'Cardiovascular Support',
  neurocognitiveSupport: 'Neurocognitive Support',
  oxidativeStressSupport:'Oxidative Stress Support',
  cellMembrane:          'Cell Membrane Support',
};

const PRIORITY_SUMMARIES = {
  mitochondrialSupport:  'Supports cellular energy production to reduce fatigue and improve stamina.',
  cardiovascularSupport: 'Supports heart and vascular function to improve circulation and resilience.',
  neurocognitiveSupport: 'Supports brain clarity, focus, and nervous system recovery.',
  oxidativeStressSupport:'Helps neutralize oxidative load and protect cellular health.',
  cellMembrane:          'Supports healthy cell membrane function for improved nutrient delivery.',
};

const BRAIN_GYM_LEVELS = [
  { level: 1, sessions: ['Coordination 1', 'Flexibility 1', 'Strength 1', 'Endurance 1'] },
  { level: 2, sessions: ['Coordination 2', 'Flexibility 2', 'Strength 2', 'Endurance 2'] },
  { level: 3, sessions: ['Coordination 3', 'Flexibility 3', 'Strength 3', 'Endurance 3'] },
];

// ── Styles ───────────────────────────────────────────────────────────────────
const card = {
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  padding: '14px 16px',
  marginBottom: '10px',
};

const sectionHead = {
  fontSize: '10px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '.09em',
  color: 'var(--text3)',
  marginBottom: '10px',
};

const timeSlot = (color) => ({
  background: color + '10',
  border: `1px solid ${color}30`,
  borderLeft: `3px solid ${color}`,
  borderRadius: '8px',
  padding: '10px 14px',
  marginBottom: '8px',
});

const timeLabel = (color) => ({
  fontSize: '10px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '.07em',
  color,
  marginBottom: '6px',
});

const itemRow = {
  fontSize: '12.5px',
  color: 'var(--text2)',
  lineHeight: '1.5',
  marginBottom: '3px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '6px',
};

const dot = { color: 'var(--text3)', flexShrink: 0, marginTop: '2px' };

const spacingNote = {
  fontSize: '10.5px',
  color: 'var(--text3)',
  fontStyle: 'italic',
  marginTop: '6px',
};

const toggleBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '10px',
  color: 'var(--text3)',
  padding: '0 4px',
  flexShrink: 0,
};

const pillTag = (bg, text) => ({
  display: 'inline-block',
  padding: '1px 8px',
  background: bg,
  color: text,
  borderRadius: '12px',
  fontSize: '10px',
  fontWeight: '600',
  marginLeft: '6px',
});

// ── Component ─────────────────────────────────────────────────────────────────
export default function FinalSummaryCard({ report }) {
  const r = report;

  // Derive Priority 5: top non-drainage therapeutic priority
  const topTherapeutic = (r.therapeuticPriorities?.priorities || [])
    .filter(p => p.key !== 'drainage')[0];

  // Build the 5 priority items (only include if data exists)
  const allPriorities = [
    r.chavita ? {
      id: 'chavita',
      label: `Chavita ${r.chavita}`,
      detail: CHAVITA_DESCRIPTIONS[r.chavita]?.theme || `Chakra ${r.chavita}`,
      summary: CHAVITA_DESCRIPTIONS[r.chavita]?.patientSummary || CHAVITA_DESCRIPTIONS[r.chavita]?.description?.slice(0, 120) + '…',
      slot: 'morning',
    } : null,
    r.emvita ? {
      id: 'emvita',
      label: `Emvita ${r.emvita}`,
      detail: `Emotional conflict support`,
      summary: EMVITA_DESCRIPTIONS[r.emvita]?.patientSummary || EMVITA_DESCRIPTIONS[r.emvita]?.description?.slice(0, 120) + '…',
      slot: 'morning',
    } : null,
    (r.acuteRemedies?.length > 0) ? {
      id: 'acute',
      label: r.acuteRemedies[0],
      detail: 'Acute remedy',
      summary: ACUTE_SUMMARY[r.acuteRemedies[0]] || r.acuteRemedies[0],
      slot: 'evening',
    } : null,
    {
      id: 'drainage',
      label: PEKANA_KIT.name,
      detail: PEKANA_KIT.detail,
      summary: PEKANA_KIT.summary,
      slot: 'morning',
    },
    topTherapeutic ? {
      id: 'core',
      label: PRIORITY_LABELS[topTherapeutic.key] || topTherapeutic.label || 'Core Support',
      detail: 'Core physiological support',
      summary: PRIORITY_SUMMARIES[topTherapeutic.key] || 'Supports your body\'s core physiological function.',
      slot: 'evening',
    } : null,
  ].filter(Boolean).slice(0, 5);

  // Practitioner toggle state (all on by default)
  const [active, setActive] = useState(() =>
    Object.fromEntries(allPriorities.map(p => [p.id, true]))
  );

  const toggle = (id) => setActive(prev => ({ ...prev, [id]: !prev[id] }));
  const activePriorities = allPriorities.filter(p => active[p.id]);

  const bySlot = (slot) => activePriorities.filter(p => p.slot === slot);

  // NeuroVIZR phase 2 sessions from report
  const phase2Sessions = r.neuroVizrPrograms?.quadrantPrograms || [];
  const frequency = r.neuroVizrPrograms?.frequency || '3–5x/week, 10–20 minutes per session';

  return (
    <div style={{ marginBottom: '24px' }}>

      {/* ── SECTION 1: Priority Therapeutic Action Plan ── */}
      <div style={{ ...card, borderTop: '3px solid var(--teal)' }}>
        <div style={sectionHead}>§ 1 — Priority Therapeutic Action Plan</div>
        <div style={{ fontSize: '11.5px', color: 'var(--text3)', marginBottom: '12px' }}>
          Your top priorities in order — start here and follow your practitioner's guidance.
        </div>

        {allPriorities.map((item, i) => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            padding: '8px 10px', borderRadius: '8px', marginBottom: '6px',
            background: active[item.id] ? 'var(--bg)' : 'var(--bg3)',
            border: '1px solid var(--border)',
            opacity: active[item.id] ? 1 : 0.45,
            transition: 'all .2s',
          }}>
            {/* Priority number */}
            <div style={{
              minWidth: '26px', height: '26px', borderRadius: '50%',
              background: active[item.id] ? 'var(--teal)' : 'var(--border)',
              color: active[item.id] ? '#fff' : 'var(--text3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: '700', flexShrink: 0,
            }}>{i + 1}</div>
            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--navy)', lineHeight: 1.3 }}>
                {item.label}
                <span style={pillTag('#f0fdf4', '#15803d')}>{item.detail}</span>
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text2)', marginTop: '2px', lineHeight: '1.5' }}>
                {item.summary}
              </div>
            </div>
            {/* Practitioner toggle (no-print) */}
            <button
              className="no-print"
              onClick={() => toggle(item.id)}
              title={active[item.id] ? 'Remove from plan' : 'Restore to plan'}
              style={toggleBtn}
            >
              {active[item.id] ? '✕' : '↩'}
            </button>
          </div>
        ))}

        {activePriorities.length === 0 && (
          <div style={{ fontSize: '12px', color: 'var(--text3)', fontStyle: 'italic', padding: '8px 0' }}>
            All items removed. Use ↩ to restore.
          </div>
        )}
      </div>

      {/* ── SECTION 2: Daily Patient Schedule ── */}
      <div style={card}>
        <div style={sectionHead}>§ 2 — Daily Patient Schedule</div>

        {/* Morning */}
        <div style={timeSlot('#0e7a55')}>
          <div style={timeLabel('#0e7a55')}>☀️ Morning</div>
          {[...bySlot('morning')].length > 0 ? bySlot('morning').map(p => (
            <div key={p.id} style={itemRow}>
              <span style={dot}>→</span>
              <span><strong>{p.label}</strong> — take as directed</span>
            </div>
          )) : <div style={{ fontSize: '12px', color: 'var(--text3)', fontStyle: 'italic' }}>No morning items selected</div>}
          <div style={spacingNote}>⏱ Allow 10–15 minutes between remedies</div>
        </div>

        {/* Midday */}
        <div style={timeSlot('#1a6fb5')}>
          <div style={timeLabel('#1a6fb5')}>🕛 Midday</div>
          {bySlot('midday').length > 0 ? bySlot('midday').map(p => (
            <div key={p.id} style={itemRow}>
              <span style={dot}>→</span>
              <span><strong>{p.label}</strong> — take as directed</span>
            </div>
          )) : null}
          <div style={itemRow}>
            <span style={dot}>→</span>
            <span><strong>NeuroVIZR</strong> — Brain Gym session ({frequency})</span>
          </div>
          <div style={spacingNote}>⏱ Allow 10–15 minutes between remedies</div>
        </div>

        {/* Evening */}
        <div style={timeSlot('#7c3aed')}>
          <div style={timeLabel('#7c3aed')}>🌙 Evening</div>
          {[...bySlot('evening')].length > 0 ? bySlot('evening').map(p => (
            <div key={p.id} style={itemRow}>
              <span style={dot}>→</span>
              <span><strong>{p.label}</strong> — take as directed</span>
            </div>
          )) : <div style={{ fontSize: '12px', color: 'var(--text3)', fontStyle: 'italic' }}>No evening items selected</div>}
          <div style={spacingNote}>⏱ Allow 10–15 minutes between remedies</div>
        </div>

        {/* Optional Add-Ons */}
        <div style={timeSlot('#b45309')}>
          <div style={timeLabel('#b45309')}>✚ Optional Add-Ons</div>
          <div style={{ fontSize: '12px', color: 'var(--text2)', fontStyle: 'italic' }}>
            Additional items may be added by your practitioner as your protocol progresses.
          </div>
        </div>
      </div>

      {/* ── SECTION 3: NeuroVIZR Program ── */}
      <div style={{ ...card, borderTop: '3px solid #7c3aed' }}>
        <div style={sectionHead}>§ 3 — NeuroVIZR Program</div>

        {/* Phase 1 — Brain Gym */}
        <div style={{
          background: '#f5f3ff', border: '1px solid #c4b5fd',
          borderRadius: '10px', padding: '12px 14px', marginBottom: '12px',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#5b21b6', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.06em' }}>
            🏋️ Phase 1 — Brain Gym Foundation (Mandatory First)
          </div>
          <div style={{ fontSize: '11px', color: '#6d28d9', marginBottom: '10px', fontStyle: 'italic' }}>
            Must complete ALL levels before progressing to Phase 2
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {BRAIN_GYM_LEVELS.map(({ level, sessions }) => (
              <div key={level} style={{
                background: '#fff', border: '1px solid #c4b5fd',
                borderRadius: '8px', padding: '8px 10px',
              }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#7c3aed', marginBottom: '5px' }}>
                  Level {level}
                </div>
                {sessions.map(s => (
                  <div key={s} style={{ fontSize: '11px', color: '#5b21b6', marginBottom: '2px' }}>• {s}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Phase 2 — Quadrant Sessions */}
        {phase2Sessions.length > 0 && (
          <div style={{
            background: '#eff6ff', border: '1px solid #bfdbfe',
            borderRadius: '10px', padding: '12px 14px', marginBottom: '10px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#1e40af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.06em' }}>
              🎧 Phase 2 — {r.crisgoldQuadrant ? `${r.crisgoldQuadrant} ` : ''}Quadrant Sessions
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {phase2Sessions.map((s, i) => (
                <span key={i} style={{
                  padding: '4px 12px', background: '#fff',
                  border: '1px solid #bfdbfe', borderRadius: '20px',
                  fontSize: '12px', color: '#1e40af', fontWeight: '600',
                }}>
                  {i + 1}. {s}
                </span>
              ))}
            </div>
            {r.neuroVizrPrograms?.frequency && (
              <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '8px' }}>
                📅 {r.neuroVizrPrograms.frequency}
              </div>
            )}
          </div>
        )}

        {/* Neuroplasticity phrase */}
        <div style={{
          fontSize: '12px', color: '#5b21b6', fontStyle: 'italic',
          textAlign: 'center', padding: '6px 0',
          borderTop: '1px solid #e9d5ff',
        }}>
          "Active engagement drives neuroplastic change"
        </div>
      </div>

      {/* ── SECTION 4: Remedy Summary ── */}
      {activePriorities.some(p => ['chavita', 'emvita', 'acute'].includes(p.id)) && (
        <div style={card}>
          <div style={sectionHead}>§ 4 — Remedy Summary</div>
          <div style={{ fontSize: '11.5px', color: 'var(--text3)', marginBottom: '10px' }}>
            What each remedy does — in plain language.
          </div>
          {activePriorities.filter(p => ['chavita', 'emvita', 'acute', 'drainage'].includes(p.id)).map(p => (
            <div key={p.id} style={{
              display: 'flex', gap: '10px', padding: '8px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{
                minWidth: '90px', fontSize: '11.5px', fontWeight: '700',
                color: 'var(--navy)', flexShrink: 0, paddingTop: '1px',
              }}>
                {p.label}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: '1.55' }}>
                {p.summary}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── SECTION 5: Follow Instructions ── */}
      <div style={{
        ...card,
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)',
        border: '1px solid #a7f3d0',
      }}>
        <div style={sectionHead}>§ 5 — Follow Instructions</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { icon: '🐢', title: 'Start Gradually', text: 'Introduce one item at a time. Give your body time to adjust before adding the next.' },
            { icon: '🚫', title: 'Not All at Once', text: 'Do not begin all remedies on the same day. Sequence matters for best results.' },
            { icon: '📅', title: 'Stay Consistent', text: 'Follow this plan for 3–4 weeks before making any changes or additions.' },
            { icon: '🔄', title: 'Re-Evaluate', text: 'Return to your practitioner after 3–4 weeks to assess progress and adjust the plan.' },
          ].map(({ icon, title, text }) => (
            <div key={title} style={{
              background: '#fff', border: '1px solid #d1fae5',
              borderRadius: '8px', padding: '10px 12px',
            }}>
              <div style={{ fontSize: '13px', marginBottom: '4px' }}>{icon} <strong style={{ color: 'var(--navy)' }}>{title}</strong></div>
              <div style={{ fontSize: '11.5px', color: 'var(--text2)', lineHeight: '1.5' }}>{text}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
