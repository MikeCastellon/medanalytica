import { useState } from 'react';
import { computeELI, computeQuadrant, CRISGOLD_QUADRANTS } from '../lib/utils';
import { ELI_QUESTIONS, ELI_SCALE } from '../lib/protocols';

export default function NewPatient({ onBack, onSubmit }) {
  const [form, setForm] = useState({
    // Patient info
    firstName: '', lastName: '', dob: '', gender: '',
    mrn: '', phone: '',
    // Report
    reportType: 'CRIS GOLD HRV', collectionDate: '', notes: '',
    // CV inputs
    sbp: '', dbp: '',
    // HQP clinical data
    filtrationRejections: '',
    questionnaireScore: '',  // 0–40
    ari: '',                 // 0–100, from HQP device
    // Emotional Regulation (Rubimed)
    chavita: '', emvita: '', ermMethod: '', acuteRemedies: '',
    // Optional add-ons
    rjlPhaseAngle: '', rjlIcw: '', rjlEcw: '', rjlTbw: '',
    oxidativeStressScore: '',
  });
  const [files, setFiles]     = useState([]); // multiple screenshots
  const [drag, setDrag]       = useState(false);
  const [eliAnswers, setEliAnswers] = useState(Array(10).fill(null));
  const [showEli, setShowEli] = useState(false);

  const addFiles = (incoming) => {
    const arr = Array.from(incoming).filter(f => f.type.startsWith('image/') || f.name.match(/\.(png|jpg|jpeg|tiff|webp|heic)$/i));
    setFiles(prev => {
      const names = new Set(prev.map(f => f.name));
      return [...prev, ...arr.filter(f => !names.has(f.name))];
    });
  };
  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));
  const [showOptional, setShowOptional] = useState(false);

  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const num = (k) => (e) => s(k, e.target.value.replace(/[^0-9.]/g, ''));
  const canSubmit = form.firstName && form.lastName;

  // ELI questionnaire computed score (0–40)
  const eliAnswered = eliAnswers.filter(v => v !== null).length;
  const eliQScore   = eliAnswered === 10 ? eliAnswers.reduce((a, v) => a + v, 0) : null;

  // Use questionnaire score if available, fall back to manual entry
  const effectiveQScore = eliQScore !== null ? eliQScore
    : (form.questionnaireScore !== '' ? Number(form.questionnaireScore) : null);

  // Live ELI / quadrant preview
  const qScore   = effectiveQScore;
  const ariVal   = form.ari !== '' ? Number(form.ari) : null;
  const eli      = computeELI(qScore);
  const quad     = computeQuadrant(qScore, ariVal);
  const quadMeta = quad ? CRISGOLD_QUADRANTS[quad] : null;

  return (
    <div className="fade-in">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="pg-hdr">
        <div>
          <div className="pg-title">New Patient</div>
          <div className="pg-sub">Complete patient details — upload an HQP report for full AI analysis (optional)</div>
        </div>
      </div>

      {/* ── Step 1: Patient Information ── */}
      <div className="fc">
        <div className="fc-hdr">
          <div className="fc-title">Patient Information</div>
          <div className="fc-badge">Step 1</div>
        </div>
        <div className="fg2">
          <div className="fg"><label className="fl">First Name *</label><input className="fi" placeholder="John" value={form.firstName} onChange={e => s('firstName', e.target.value)} /></div>
          <div className="fg"><label className="fl">Last Name *</label><input className="fi" placeholder="Smith" value={form.lastName} onChange={e => s('lastName', e.target.value)} /></div>
          <div className="fg"><label className="fl">Date of Birth</label><input className="fi" type="date" value={form.dob} onChange={e => s('dob', e.target.value)} /></div>
          <div className="fg">
            <label className="fl">Biological Sex</label>
            <select className="fi" value={form.gender} onChange={e => s('gender', e.target.value)}>
              <option value="">Select…</option>
              <option>Male</option><option>Female</option>
              <option>Other</option><option>Prefer not to say</option>
            </select>
          </div>
          <div className="fg"><label className="fl">Medical Record No.</label><input className="fi" placeholder="MRN-0044" value={form.mrn} onChange={e => s('mrn', e.target.value)} /></div>
          <div className="fg"><label className="fl">Contact Phone</label><input className="fi" placeholder="(555) 000-0000" value={form.phone} onChange={e => s('phone', e.target.value)} /></div>
        </div>
      </div>

      {/* ── Step 2: CRIS Clinical Inputs ── */}
      <div className="fc">
        <div className="fc-hdr">
          <div className="fc-title">CRIS GOLD™ Clinical Inputs</div>
          <div className="fc-badge">Step 2</div>
        </div>
        <div style={{ fontSize: '12.5px', color: 'var(--text3)', marginBottom: '16px', lineHeight: '1.6' }}>
          Enter values from the HQP device and questionnaire. These are used to calculate ELI, lock the quadrant, and guide the AI report.
          Type these even if you are uploading screenshots.
        </div>

        {/* Report type + Date */}
        <div className="fg2" style={{ marginBottom: '12px' }}>
          <div className="fg">
            <label className="fl">Report Type</label>
            <select className="fi" value={form.reportType} onChange={e => s('reportType', e.target.value)}>
              <option>CRIS GOLD HRV</option>
              <option>Complete Blood Count (CBC)</option>
              <option>Lipid Panel</option>
              <option>Thyroid Function Panel</option>
              <option>Comprehensive Metabolic Panel</option>
              <option>Cardiology</option>
              <option>Other</option>
            </select>
          </div>
          <div className="fg"><label className="fl">Collection Date</label><input className="fi" type="date" value={form.collectionDate} onChange={e => s('collectionDate', e.target.value)} /></div>
        </div>

        {/* Cardiovascular */}
        <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '8px' }}>
          Cardiovascular (Required for CV Analysis)
        </div>
        <div className="fg2" style={{ marginBottom: '16px' }}>
          <div className="fg">
            <label className="fl">Systolic BP (SBP) mmHg</label>
            <input className="fi" placeholder="e.g. 130" value={form.sbp} onChange={num('sbp')} />
          </div>
          <div className="fg">
            <label className="fl">Diastolic BP (DBP) mmHg</label>
            <input className="fi" placeholder="e.g. 82" value={form.dbp} onChange={num('dbp')} />
          </div>
          {form.sbp && form.dbp && (
            <div className="fg" style={{ gridColumn: '1 / -1' }}>
              <div style={{ padding: '8px 12px', background: 'var(--bg3)', borderRadius: '6px', fontSize: '12.5px', color: 'var(--navy)' }}>
                <strong>Pulse Pressure (PP):</strong> {Number(form.sbp) - Number(form.dbp)} mmHg
              </div>
            </div>
          )}
          <div className="fg">
            <label className="fl">Filtration Rejections (from HQP)</label>
            <input className="fi" placeholder="e.g. 6" value={form.filtrationRejections} onChange={num('filtrationRejections')} />
            {form.filtrationRejections && Number(form.filtrationRejections) > 20 && (
              <div style={{ marginTop: '4px', fontSize: '11.5px', color: 'var(--amber)', fontWeight: '600' }}>
                ⚠️ &gt;20 — ask about coffee/stimulants before interpreting
              </div>
            )}
          </div>
        </div>

        {/* ELI / ARI / Quadrant */}
        <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '8px' }}>
          ELI / ARI — Quadrant Determinism
        </div>
        <div className="fg2" style={{ marginBottom: '4px' }}>
          <div className="fg">
            <label className="fl">Stress Index Questionnaire Score (0–40)</label>
            <input className="fi" placeholder="e.g. 28" value={form.questionnaireScore} onChange={num('questionnaireScore')} />
            {eli != null && (
              <div style={{ marginTop: '4px', fontSize: '11.5px', color: 'var(--text2)' }}>
                ELI = {eli} — {qScore >= 20 ? <strong style={{ color: '#c0392b' }}>HIGH ELI (score ≥20)</strong> : <strong style={{ color: '#0e7a55' }}>LOW ELI (score &lt;20)</strong>}
              </div>
            )}
          </div>
          <div className="fg">
            <label className="fl">ARI — Autonomic Regulation Index (0–100, from HQP)</label>
            <input className="fi" placeholder="e.g. 35" value={form.ari} onChange={num('ari')} />
            {ariVal != null && (
              <div style={{ marginTop: '4px', fontSize: '11.5px', color: 'var(--text2)' }}>
                {ariVal >= 60 ? <strong style={{ color: '#0e7a55' }}>HIGH ARI (≥60)</strong> : <strong style={{ color: '#c0392b' }}>LOW ARI (&lt;60)</strong>}
              </div>
            )}
          </div>
        </div>

        {/* Live quadrant preview */}
        {quadMeta && (
          <div style={{ margin: '12px 0 16px', padding: '12px 16px', background: quadMeta.bg, border: `2px solid ${quadMeta.color}`, borderRadius: '8px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: quadMeta.color, marginBottom: '3px' }}>
              {quad}: {quadMeta.label}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--navy2)' }}>{quadMeta.sub}</div>
          </div>
        )}

        {/* ── ELI Questionnaire ── */}
        <div
          style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}
        >
          <div
            onClick={() => setShowEli(v => !v)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg3)', cursor: 'pointer' }}
          >
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy)' }}>
                📋 Emotional Load Index (ELI) Questionnaire
              </span>
              {eliQScore !== null && (
                <span style={{ marginLeft: '10px', fontSize: '11px', color: 'var(--green)', fontWeight: '600' }}>
                  ✓ Score: {eliQScore}/40
                </span>
              )}
              {eliAnswered > 0 && eliQScore === null && (
                <span style={{ marginLeft: '10px', fontSize: '11px', color: 'var(--amber)' }}>
                  {eliAnswered}/10 answered
                </span>
              )}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text3)', transform: showEli ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform .2s' }}>▾</span>
          </div>

          {showEli && (
            <div style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: '12px', color: 'var(--text3)', margin: '0 0 12px', lineHeight: '1.6' }}>
                Rate each item 0–4: <strong>0 = Never · 1 = Rarely · 2 = Sometimes · 3 = Often · 4 = Almost Always</strong>
              </p>
              {ELI_QUESTIONS.map((q, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12.5px', color: 'var(--navy)', marginBottom: '6px', fontWeight: '500' }}>
                    {i + 1}. {q}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {ELI_SCALE.map((label, score) => {
                      const selected = eliAnswers[i] === score;
                      return (
                        <button
                          key={score}
                          type="button"
                          onClick={() => setEliAnswers(prev => { const a = [...prev]; a[i] = score; return a; })}
                          style={{
                            padding: '4px 10px', fontSize: '11.5px', borderRadius: '20px',
                            border: `1.5px solid ${selected ? 'var(--blue)' : 'var(--border)'}`,
                            background: selected ? 'var(--blue)' : 'var(--bg3)',
                            color: selected ? '#fff' : 'var(--text2)',
                            cursor: 'pointer', fontWeight: selected ? '700' : '400',
                            transition: 'all .1s',
                          }}
                        >
                          {score} – {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {eliQScore !== null && (
                <div style={{ marginTop: '8px', padding: '10px 14px', background: eliQScore >= 20 ? '#fef2f2' : '#f0fdf4', border: `1px solid ${eliQScore >= 20 ? '#c0392b40' : '#0e7a5540'}`, borderRadius: '8px' }}>
                  <strong style={{ color: eliQScore >= 20 ? '#c0392b' : '#0e7a55' }}>
                    ELI Questionnaire Score: {eliQScore}/40 — {eliQScore >= 20 ? 'HIGH Emotional Load' : 'LOW Emotional Load'}
                  </strong>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '3px' }}>
                    This score feeds into the ELI formula for quadrant determination
                  </div>
                </div>
              )}
              {eliQScore !== null && (
                <button
                  type="button"
                  onClick={() => setEliAnswers(Array(10).fill(null))}
                  style={{ marginTop: '10px', fontSize: '11px', padding: '4px 12px', borderRadius: '5px', border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text3)', cursor: 'pointer' }}
                >
                  Clear Questionnaire
                </button>
              )}
            </div>
          )}
        </div>

        {/* Emotional Regulation (Rubimed) */}
        <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '8px' }}>
          Emotional Regulation — Rubimed (Tested Results Only)
        </div>
        <div className="fg2" style={{ marginBottom: '12px' }}>
          <div className="fg">
            <label className="fl">Chavita # (1–7)</label>
            <input className="fi" placeholder="e.g. 4" value={form.chavita} onChange={num('chavita')} />
          </div>
          <div className="fg">
            <label className="fl">Emvita # (1–28) — required with Chavita</label>
            <input className="fi" placeholder="e.g. 13" value={form.emvita} onChange={num('emvita')} />
          </div>
          <div className="fg">
            <label className="fl">Testing Method</label>
            <select className="fi" value={form.ermMethod} onChange={e => s('ermMethod', e.target.value)}>
              <option value="">Select…</option>
              <option>Questionnaire</option>
              <option>Muscle testing</option>
              <option>Arm-length testing</option>
            </select>
          </div>
          <div className="fg">
            <label className="fl">Acute Remedies (if tested)</label>
            <input className="fi" placeholder="e.g. Anxiovita, Neurovita" value={form.acuteRemedies} onChange={e => s('acuteRemedies', e.target.value)} />
          </div>
        </div>

        <div className="fg fs">
          <label className="fl">Clinical Notes</label>
          <textarea className="fi" placeholder="Chief complaints, relevant history, physician observations…"
            value={form.notes} onChange={e => s('notes', e.target.value)} />
        </div>
      </div>

      {/* ── Step 3: Optional Add-Ons ── */}
      <div className="fc">
        <div className="fc-hdr" style={{ cursor: 'pointer' }} onClick={() => setShowOptional(v => !v)}>
          <div className="fc-title">Optional Add-On Data {showOptional ? '▲' : '▼'}</div>
          <div className="fc-badge">Step 3 — Optional</div>
        </div>
        {showOptional && (
          <div>
            <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '8px' }}>
              RJL BIA (Bioimpedance Analysis)
            </div>
            <div className="fg2" style={{ marginBottom: '16px' }}>
              <div className="fg"><label className="fl">Phase Angle</label><input className="fi" placeholder="e.g. 5.2" value={form.rjlPhaseAngle} onChange={num('rjlPhaseAngle')} /></div>
              <div className="fg"><label className="fl">ICW (Intracellular Water)</label><input className="fi" placeholder="e.g. 22.4" value={form.rjlIcw} onChange={num('rjlIcw')} /></div>
              <div className="fg"><label className="fl">ECW (Extracellular Water)</label><input className="fi" placeholder="e.g. 14.1" value={form.rjlEcw} onChange={num('rjlEcw')} /></div>
              <div className="fg"><label className="fl">TBW (Total Body Water)</label><input className="fi" placeholder="e.g. 36.5" value={form.rjlTbw} onChange={num('rjlTbw')} /></div>
            </div>
            <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '8px' }}>
              Oxidative Stress Test (Osumex)
            </div>
            <div className="fg2">
              <div className="fg"><label className="fl">Score / Category (e.g. 4 = high)</label><input className="fi" placeholder="e.g. 4" value={form.oxidativeStressScore} onChange={num('oxidativeStressScore')} /></div>
            </div>
          </div>
        )}
      </div>

      {/* ── Step 4: Upload HQP Screenshots ── */}
      <div className="fc">
        <div className="fc-hdr">
          <div className="fc-title">
            HQP Report Screenshots
            <span style={{ fontWeight: 400, fontSize: '12px', color: 'var(--text3)', marginLeft: '8px' }}>(optional — upload as many as needed)</span>
          </div>
          <div className="fc-badge">Step 4</div>
        </div>

        {/* Drop zone */}
        <div
          className={`uz${drag ? ' drag' : ''}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
          onClick={() => document.getElementById('fup').click()}
        >
          <input id="fup" type="file" accept="image/*,.png,.jpg,.jpeg,.tiff,.webp,.heic"
            multiple style={{ display: 'none' }}
            onChange={e => addFiles(e.target.files)} />
          <div className="uz-ico">📸</div>
          <div className="uz-title">Drop screenshots here or click to browse</div>
          <div className="uz-sub">Upload multiple HQP screen captures — PNG, JPG, TIFF, WEBP accepted. GPT-4o reads all screens and extracts every marker.</div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '2px' }}>
              {files.length} screenshot{files.length > 1 ? 's' : ''} queued
            </div>
            {files.map((f, i) => (
              <div key={i} className="fp" style={{ padding: '8px 12px' }}>
                <span style={{ fontSize: '18px' }}>🖼️</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="fn" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                  <div className="fsz">{(f.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                <button style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '0 4px' }}
                  onClick={e => { e.stopPropagation(); removeFile(i); }}>×</button>
              </div>
            ))}
          </div>
        )}

        <p className="hint">⚡ Powered by GPT-4o vision — all screenshots are read together. Manually entered clinical values always take priority over extracted values.</p>
      </div>

      <div className="fa">
        <button className="btn btn-ot" onClick={onBack}>Cancel</button>
        <button
          className="btn btn-nv"
          onClick={() => onSubmit({
            ...form,
            stressQuestionnaireScore: eliQScore !== null ? eliQScore : (form.questionnaireScore !== '' ? Number(form.questionnaireScore) : null),
            questionnaireScore: effectiveQScore,
          }, files)}
          disabled={!canSubmit}
        >
          Run Analysis →
        </button>
      </div>
    </div>
  );
}
