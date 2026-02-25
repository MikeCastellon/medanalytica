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
import Badge from './Badge';

export default function PatientReport({ patient, report, onBack }) {
  if (!report) return null;
  const r = report;
  const markers = r.hrvMarkers?.length ? r.hrvMarkers : (r.markers || []);
  const patName = `${patient.first_name} ${patient.last_name}`;
  const overallStatus = r.overallStatus || (r.criScore >= 6 ? 'critical' : r.criScore >= 3 ? 'warning' : 'normal');
  const cri = criMeta(r.criScore);
  const cgQ = r.crisgoldQuadrant ? CRISGOLD_QUADRANTS[r.crisgoldQuadrant] : null;
  const cvQ = r.cvQuadrant       ? CV_QUADRANTS[r.cvQuadrant]             : null;

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

  return (
    <div className="fade-in">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>

      {/* ── Patient Header ── */}
      <div className="ph">
        <div className="p-av">{ini(patName)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2px' }}>
            <div className="p-name">{patName}</div>
            <Badge status={overallStatus} />
          </div>
          <div className="p-meta">
            {patient.mrn       && <div className="p-mi">📋 {patient.mrn}</div>}
            {patient.dob       && <div className="p-mi">🎂 Age {age(patient.dob)}</div>}
            {patient.gender    && <div className="p-mi">⚧ {patient.gender}</div>}
            {r.collection_date && <div className="p-mi">📅 {fmtDate(r.collection_date)}</div>}
            {r.report_type     && <div className="p-mi">🧬 {r.report_type}</div>}
            {r.bloodPressure   && <div className="p-mi">💓 BP: {r.bloodPressure}</div>}
            {r.pulsePressure   && <div className="p-mi">〰️ PP: {r.pulsePressure}</div>}
          </div>
          {r.chiefComplaints && (
            <div style={{ marginTop: '6px', fontSize: '12.5px', color: 'var(--text2)' }}>
              <strong>Chief Complaints:</strong> {r.chiefComplaints}
            </div>
          )}
        </div>
        <button className="btn btn-ot" style={{ fontSize: '12.5px' }} onClick={() => window.print()}>
          ⬇ Export PDF
        </button>
      </div>

      {/* ── AI Clinical Summary ── */}
      <div className="sum">
        <div className="sum-lbl">🤖 AI Clinical Summary</div>
        <div className="sum-txt">{r.aiSummary}</div>
      </div>

      {/* ── CRI Score ── */}
      {r.criScore != null && <CRICard cri={cri} score={r.criScore} category={r.criCategory} />}

      {/* ── CRIS GOLD™ Quadrant + CV Quadrant ── */}
      {(cgQ || cvQ) && (
        <div className="rg" style={{ gridTemplateColumns: cgQ && cvQ ? '1fr 1fr' : '1fr' }}>
          {cgQ && (
            <QuadrantCard
              title="CRIS GOLD™ Quadrant"
              subtitle="Emotional Load Index (ELI) vs Autonomic Regulation Index (ARI)"
              quadrant={r.crisgoldQuadrant}
              meta={cgQ}
              qDefs={CRISGOLD_QUADRANTS}
              ari={r.hrqAri}
              eli={r.hrqEli}
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

      {/* ── HRV Markers Chart ── */}
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

      {/* ── HRV Summary ── */}
      {r.hrvSummary && (
        <InfoCard icon="🫀" title="Autonomic Nervous System Summary" color="var(--blue)" bg="var(--blue-lt)">
          {r.hrvSummary}
        </InfoCard>
      )}

      {/* ── Polyvagal + Adrenal ── */}
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

      {/* ── Brain Gauge ── */}
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

      {/* ── Therapeutic Selections ── */}
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
function QuadrantCard({ title, subtitle, quadrant, meta, qDefs, ari, eli }) {
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
      {(eli != null || ari != null) && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          {eli != null && (
            <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: '6px', padding: '8px 12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.07em' }}>ELI Score</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--navy)' }}>{eli}</div>
            </div>
          )}
          {ari != null && (
            <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: '6px', padding: '8px 12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.07em' }}>ARI Score</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--navy)' }}>{ari}</div>
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

/* ── Therapeutic Selections Card ────────────────────────── */
function TherapeuticCard({ selections, quadrant }) {
  const categories = [
    { key: 'drainage',              icon: '🚿', label: 'Drainage (First Priority)' },
    { key: 'cellMembraneSupport',   icon: '🧬', label: 'Cell Membrane Support' },
    { key: 'mitochondrialSupport',  icon: '⚡', label: 'Mitochondrial Support' },
    { key: 'neurocognitiveSupport', icon: '🧠', label: 'Neurocognitive Support' },
    { key: 'cardiovascularSupport', icon: '💓', label: 'Cardiovascular Support' },
  ];
  const hasAny = categories.some(c => selections[c.key]?.length > 0);
  if (!hasAny) return null;

  return (
    <div className="card" style={{ marginBottom: '16px' }}>
      <div className="card-hdr">
        <span className="card-title">Therapeutic Selections</span>
        {quadrant && <span className="badge b-bl">{quadrant} Protocol</span>}
      </div>
      <div style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '20px' }}>
        {categories.map(({ key, icon, label }) => {
          const items = selections[key];
          if (!items?.length) return null;
          return (
            <div key={key}>
              <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '8px' }}>
                {icon} {label}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {items.map((item, i) => (
                  <li key={i} style={{ fontSize: '12.5px', color: 'var(--navy)', padding: '3px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
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
