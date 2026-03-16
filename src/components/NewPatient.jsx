import { useState, useEffect } from 'react';
import { computeELI, computeQuadrant, questionnaireToELI, eliLabel, CRISGOLD_QUADRANTS } from '../lib/utils';
import { ELI_QUESTIONS, ELI_SCALE } from '../lib/protocols';

export default function NewPatient({ onBack, onSubmit }) {
  const [form, setForm] = useState({
    // Patient info
    firstName: '', lastName: '', dob: '', gender: '',
    mrn: '', phone: '', email: '',
    // Report
    reportType: 'CRIS GOLD HRV', collectionDate: '', notes: '',
    // CV inputs
    sbp: '', dbp: '',
    // HQP clinical data
    filtrationRejections: '',
    questionnaireScore: '',  // 0–40
    ari: '',                 // 0–100, optional override (normally computed server-side from HRV)
    // Emotional Regulation (Rubimed)
    chavita: '', emvita: '', ermMethod: '', acuteRemedies: '',
    // Optional add-ons
    rjlPhaseAngle: '', rjlIcw: '', rjlEcw: '', rjlTbw: '',
    oxidativeStressScore: '',
    // Test flags — must be explicitly checked to include in report
    adrenalTested: false,
    adrenalDropCount: '',
    thyroidFunctionalIndex: '',
    brainGaugeTested: false,
    bgSpeed: '', bgAccuracy: '', bgTimeOrderJudgment: '', bgTimePerception: '',
    bgPlasticity: '', bgFatigue: '', bgFocus: '', bgOverallCortical: '',
  });
  const [files, setFiles]     = useState([]); // multiple screenshots
  const [drag, setDrag]       = useState(false);
  const [eliAnswers, setEliAnswers] = useState(Array(10).fill(null));
  const [showEli, setShowEli] = useState(false);

  // ── HQB Import state ──────────────────────────────────────────────────────
  const [hqbSearch, setHqbSearch]         = useState('');
  const [hqbLoading, setHqbLoading]       = useState(false);
  const [hqbError, setHqbError]           = useState(null);
  const [hqbResult, setHqbResult]         = useState(null);   // { patient, recordings }
  const [hqbRecordingIdx, setHqbRecordingIdx] = useState(0); // which recording is selected
  const [hqbApplied, setHqbApplied]       = useState(false);  // whether data has been applied
  const [hqbFullRecord, setHqbFullRecord] = useState(null);   // full recording for AI (no screenshots needed)

  const [pasteFlash, setPasteFlash] = useState(false);

  const addFiles = (incoming) => {
    const arr = Array.from(incoming).filter(f =>
      f.type.startsWith('image/') || f.name?.match(/\.(png|jpg|jpeg|tiff|webp|heic)$/i)
    );
    setFiles(prev => {
      const names = new Set(prev.map(f => f.name));
      return [...prev, ...arr.filter(f => !names.has(f.name))];
    });
  };
  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

  // Clipboard paste — capture images pasted anywhere on the page
  useEffect(() => {
    const handlePaste = (e) => {
      const items = Array.from(e.clipboardData?.items || []);
      const imageFiles = items
        .filter(item => item.type.startsWith('image/'))
        .map((item, idx) => {
          const file = item.getAsFile();
          if (!file) return null;
          // Give pasted files a meaningful name with timestamp
          return new File([file], `paste-${Date.now()}-${idx + 1}.png`, { type: file.type });
        })
        .filter(Boolean);
      if (imageFiles.length > 0) {
        addFiles(imageFiles);
        setPasteFlash(true);
        setTimeout(() => setPasteFlash(false), 2000);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);
  const [showOptional, setShowOptional] = useState(false);

  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const num = (k) => (e) => s(k, e.target.value.replace(/[^0-9.]/g, ''));
  const canSubmit = form.firstName && form.lastName;

  // ── HQB Import: fetch from backend ────────────────────────────────────────
  const fetchHqbData = async () => {
    const q = hqbSearch.trim();
    if (!q) return;
    setHqbLoading(true);
    setHqbError(null);
    setHqbResult(null);
    setHqbApplied(false);
    try {
      // Detect whether input looks like a UUID (patient ID) or email
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(q);
      const body   = isUuid ? { patientId: q } : { email: q };
      const res    = await fetch('/.netlify/functions/fetch-hqb-data', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'HQP lookup failed');
      setHqbResult(json);
      setHqbRecordingIdx(0);
    } catch (err) {
      setHqbError(err.message);
    } finally {
      setHqbLoading(false);
    }
  };

  // ── HQP Import: apply selected recording data to form ─────────────────────
  const applyHqbData = () => {
    if (!hqbResult) return;
    const { patient, recordings, adrenalTest, oxidativeStressTest, bodyComp } = hqbResult;
    const rec = recordings?.[hqbRecordingIdx];

    setForm(f => ({
      ...f,
      // Patient demographics — only fill if currently blank
      firstName:      f.firstName      || patient.firstName || '',
      lastName:       f.lastName       || patient.lastName  || '',
      dob:            f.dob            || (patient.dob ? patient.dob.split('T')[0] : ''),
      gender:         f.gender         || patient.gender    || '',
      phone:          f.phone          || patient.phone     || '',
      email:          f.email          || patient.email     || '',
      // Clinical fields from the selected recording
      ...(rec?.collectionDate && !f.collectionDate
        ? { collectionDate: rec.collectionDate } : {}),
      ...(rec?.filtrationRejections != null && f.filtrationRejections === ''
        ? { filtrationRejections: String(rec.filtrationRejections) } : {}),
      ...(rec?.ari != null && f.ari === ''
        ? { ari: String(rec.ari) } : {}),
      // Adrenal urine test — auto-enable + fill drop count
      ...(adrenalTest?.drops != null ? {
        adrenalTested:    true,
        adrenalDropCount: f.adrenalDropCount || String(adrenalTest.drops),
      } : {}),
      // Oxidative stress score
      ...(oxidativeStressTest?.color != null && f.oxidativeStressScore === ''
        ? { oxidativeStressScore: String(oxidativeStressTest.color) } : {}),
      // Body composition (RJL BIA equivalent)
      ...(bodyComp ? {
        rjlPhaseAngle: f.rjlPhaseAngle || (bodyComp.phaseAngle != null ? String(bodyComp.phaseAngle) : ''),
        rjlIcw:        f.rjlIcw        || (bodyComp.icw        != null ? String(bodyComp.icw)        : ''),
        rjlEcw:        f.rjlEcw        || (bodyComp.ecw        != null ? String(bodyComp.ecw)        : ''),
        rjlTbw:        f.rjlTbw        || (bodyComp.tbw        != null ? String(bodyComp.tbw)        : ''),
      } : {}),
    }));
    setHqbApplied(true);
    setHqbFullRecord(rec || null);
  };

  // The currently selected HQB recording (for display)
  const hqbRec = hqbResult?.recordings?.[hqbRecordingIdx];

  // ── Quick Test: randomize all clinical inputs ──────────────────────
  const FIRST_NAMES = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Dana', 'Riley', 'Drew'];
  const LAST_NAMES  = ['Smith', 'Johnson', 'Lee', 'Garcia', 'Brown', 'Patel', 'Kim', 'Wilson'];
  const ri = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const quickTest = () => {
    const qScore  = ri(0, 40);
    const ari     = ri(0, 100);
    const chavita = ri(1, 7);
    const emvita  = ri(1, 28);
    const sbp     = ri(100, 165);
    const dbp     = ri(60, 100);
    const filt    = ri(0, 30);
    const mrNum   = ri(1000, 9999);
    setForm(f => ({
      ...f,
      firstName:           FIRST_NAMES[ri(0, FIRST_NAMES.length - 1)],
      lastName:            LAST_NAMES[ri(0, LAST_NAMES.length - 1)],
      dob:                 `${ri(1955, 2000)}-${String(ri(1,12)).padStart(2,'0')}-${String(ri(1,28)).padStart(2,'0')}`,
      gender:              ['Male', 'Female'][ri(0, 1)],
      mrn:                 `TST-${mrNum}`,
      reportType:          'CRIS GOLD HRV',
      collectionDate:      new Date().toISOString().split('T')[0],
      sbp:                 String(sbp),
      dbp:                 String(dbp),
      filtrationRejections: String(filt),
      questionnaireScore:  String(qScore),
      ari:                 String(ari),
      chavita:             String(chavita),
      emvita:              String(emvita),
      ermMethod:           ['Questionnaire', 'Muscle testing', 'Arm-length testing'][ri(0, 2)],
      acuteRemedies:       '',
      notes:               `Quick-test patient. Q-score ${qScore}/40 | ARI ${ari} | Chavita ${chavita} | Emvita ${emvita}`,
    }));
    setEliAnswers(Array(10).fill(null));
  };

  // ELI questionnaire computed score (0–40)
  const eliAnswered = eliAnswers.filter(v => v !== null).length;
  const eliQScore   = eliAnswered === 10 ? eliAnswers.reduce((a, v) => a + v, 0) : null;

  // Use questionnaire score if available, fall back to manual entry
  const effectiveQScore = eliQScore !== null ? eliQScore
    : (form.questionnaireScore !== '' ? Number(form.questionnaireScore) : null);

  // Live ELI / quadrant preview
  // Note: Full ELI requires VLF%, Total Power, HQP Stress Index, Polyvagal (from HQP screenshots).
  // Here we only show the questionnaire contribution as a preview.
  const qScore   = effectiveQScore;
  const ariVal   = form.ari !== '' ? Number(form.ari) : null;
  const qContrib = questionnaireToELI(qScore);  // bucketed: 0/5/10/15
  const eli      = computeELI({ questionnaireScore: qScore }); // partial — full computed server-side
  const quad     = computeQuadrant(eli, ariVal);
  const quadMeta = quad ? CRISGOLD_QUADRANTS[quad] : null;

  return (
    <div className="fade-in">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="pg-hdr">
        <div>
          <div className="pg-title">New Patient</div>
          <div className="pg-sub">Complete patient details — upload an HQP report for full AI analysis (optional)</div>
        </div>
        <button
          type="button"
          onClick={quickTest}
          title="Fill all fields with random clinical values to quickly test different results"
          style={{
            padding: '8px 16px', borderRadius: '8px', border: '1.5px dashed var(--blue)',
            background: 'var(--blue-lt)', color: 'var(--blue)', fontWeight: '700', cursor: 'pointer',
            fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          ⚡ Quick Test
        </button>
      </div>

      {/* ── HQP Import ── */}
      <div className="fc" style={{ borderColor: '#1a6fa8', background: 'linear-gradient(135deg, #eaf4fd 0%, #f8fbff 100%)' }}>
        <div className="fc-hdr">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🔗</span>
            <div className="fc-title" style={{ color: '#1a6fa8' }}>Import from HQP</div>
            {hqbApplied && (
              <span style={{ fontSize: '11px', fontWeight: '700', background: '#0e7a55', color: '#fff', borderRadius: '20px', padding: '2px 10px' }}>
                ✓ Data imported
              </span>
            )}
          </div>
          <div className="fc-badge" style={{ background: '#1a6fa820', color: '#1a6fa8' }}>Auto-fill</div>
        </div>

        <p style={{ fontSize: '12.5px', color: 'var(--text3)', margin: '0 0 14px', lineHeight: '1.6' }}>
          Enter the patient's HQP email address or HQP patient ID (UUID) to automatically fill in demographics
          and clinical values from their latest HeartQuest recording.
        </p>

        {/* Search bar */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            className="fi"
            style={{ flex: 1, borderColor: '#1a6fa840' }}
            placeholder="patient@email.com  or  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            value={hqbSearch}
            onChange={e => { setHqbSearch(e.target.value); setHqbError(null); }}
            onKeyDown={e => e.key === 'Enter' && fetchHqbData()}
          />
          <button
            type="button"
            onClick={fetchHqbData}
            disabled={hqbLoading || !hqbSearch.trim()}
            style={{
              padding: '8px 20px', borderRadius: '7px', border: 'none',
              background: hqbLoading || !hqbSearch.trim() ? 'var(--border)' : '#1a6fa8',
              color: '#fff', fontWeight: '700', cursor: hqbLoading || !hqbSearch.trim() ? 'not-allowed' : 'pointer',
              fontSize: '13px', whiteSpace: 'nowrap', minWidth: '110px',
            }}
          >
            {hqbLoading ? '⏳ Searching…' : '🔍 Search HQP'}
          </button>
        </div>

        {/* Error */}
        {hqbError && (
          <div style={{ marginTop: '10px', padding: '10px 14px', background: '#fef2f2', border: '1px solid #c0392b40', borderRadius: '7px', fontSize: '12.5px', color: '#c0392b', fontWeight: '600' }}>
            ⚠️ {hqbError}
          </div>
        )}

        {/* Results panel */}
        {hqbResult && (
          <div style={{ marginTop: '14px', padding: '14px 16px', background: '#fff', border: '1.5px solid #1a6fa840', borderRadius: '8px' }}>

            {/* Patient found banner */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1a6fa820', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>👤</div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--navy)' }}>
                  {hqbResult.patient.firstName} {hqbResult.patient.lastName}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text3)' }}>
                  {hqbResult.patient.dob ? `DOB: ${hqbResult.patient.dob.split('T')[0]}` : ''}
                  {hqbResult.patient.gender ? `  ·  ${hqbResult.patient.gender}` : ''}
                  {hqbResult.patient.phone  ? `  ·  ${hqbResult.patient.phone}`  : ''}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text3)' }}>
                HQP ID: <code style={{ fontSize: '10px' }}>{hqbResult.patient.hqbPatientId?.slice(0, 8)}…</code>
              </div>
            </div>

            {/* Recording selector */}
            {hqbResult.recordings?.length > 0 ? (
              <>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '6px' }}>
                  {hqbResult.recordings.length} recording{hqbResult.recordings.length > 1 ? 's' : ''} found — select one to import
                </div>
                <select
                  className="fi"
                  style={{ marginBottom: '12px', borderColor: '#1a6fa840' }}
                  value={hqbRecordingIdx}
                  onChange={e => { setHqbRecordingIdx(Number(e.target.value)); setHqbApplied(false); }}
                >
                  {hqbResult.recordings.map((r, i) => (
                    <option key={r.id} value={i}>
                      {r.title || 'Untitled'} — {r.date ? new Date(r.date).toLocaleDateString() : 'No date'}
                    </option>
                  ))}
                </select>

                {/* Preview what will be filled */}
                {hqbRec && (
                  <div style={{ fontSize: '11.5px', color: 'var(--text2)', marginBottom: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                    {hqbRec.filtrationRejections != null && (
                      <div>📊 Filtration Rejections: <strong>{hqbRec.filtrationRejections}</strong></div>
                    )}
                    {hqbRec.ari != null && (
                      <div>💓 Health Index: <strong>{hqbRec.ari}</strong> (ARI computed from HRV)</div>
                    )}
                    {hqbRec.hrv?.sdnn != null && (
                      <div>📈 SDNN: <strong>{hqbRec.hrv.sdnn?.toFixed(1)} ms</strong></div>
                    )}
                    {hqbRec.hrv?.rmssd != null && (
                      <div>📈 RMSSD: <strong>{hqbRec.hrv.rmssd?.toFixed(1)} ms</strong></div>
                    )}
                    {hqbRec.hrv?.lfHfRatio != null && (
                      <div>⚖️ LF/HF Ratio: <strong>{hqbRec.hrv.lfHfRatio?.toFixed(2)}</strong></div>
                    )}
                    {hqbRec.hrv?.totalPower != null && (
                      <div>⚡ Total Power: <strong>{hqbRec.hrv.totalPower?.toFixed(0)} ms²</strong></div>
                    )}
                    {hqbRec.hrv?.hfPct != null && (
                      <div>🔵 HF%: <strong>{hqbRec.hrv.hfPct?.toFixed(1)}%</strong></div>
                    )}
                    {hqbRec.hrv?.vlfPct != null && (
                      <div>🟡 VLF%: <strong>{hqbRec.hrv.vlfPct?.toFixed(1)}%</strong></div>
                    )}
                    {hqbRec.hrv?.stressIndex != null && (
                      <div>🔴 Stress Index: <strong>{hqbRec.hrv.stressIndex?.toFixed(1)}</strong></div>
                    )}
                    {hqbRec.hrv?.meanHr != null && (
                      <div>❤️ Mean HR: <strong>{hqbRec.hrv.meanHr?.toFixed(0)} bpm</strong></div>
                    )}
                  </div>
                )}

                {/* Supplemental test previews */}
                {(hqbResult.adrenalTest || hqbResult.oxidativeStressTest || hqbResult.bodyComp) && (
                  <div style={{ fontSize: '11.5px', color: 'var(--text2)', marginBottom: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', padding: '8px 10px', background: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                    {hqbResult.adrenalTest?.drops != null && (
                      <div>💧 Adrenal Drops: <strong>{hqbResult.adrenalTest.drops}</strong></div>
                    )}
                    {hqbResult.oxidativeStressTest?.color != null && (
                      <div>⚗️ Oxidative Stress: <strong>{hqbResult.oxidativeStressTest.color}</strong></div>
                    )}
                    {hqbResult.bodyComp?.phaseAngle != null && (
                      <div>📐 Phase Angle: <strong>{hqbResult.bodyComp.phaseAngle}</strong></div>
                    )}
                    {hqbResult.bodyComp?.icw != null && (
                      <div>💧 ICW: <strong>{hqbResult.bodyComp.icw}</strong></div>
                    )}
                    {hqbResult.bodyComp?.ecw != null && (
                      <div>💧 ECW: <strong>{hqbResult.bodyComp.ecw}</strong></div>
                    )}
                    {hqbResult.bodyComp?.tbw != null && (
                      <div>💧 TBW: <strong>{hqbResult.bodyComp.tbw}</strong></div>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={applyHqbData}
                    style={{
                      padding: '8px 20px', borderRadius: '7px', border: 'none',
                      background: '#0e7a55', color: '#fff', fontWeight: '700',
                      cursor: 'pointer', fontSize: '13px',
                    }}
                  >
                    ✓ Apply to Form
                  </button>
                  {hqbApplied && (
                    <span style={{ fontSize: '12px', color: '#0e7a55', fontWeight: '600' }}>
                      ✓ Patient info and clinical values filled in below. Review and edit as needed.
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div style={{ fontSize: '12.5px', color: 'var(--amber)', fontWeight: '600' }}>
                ⚠️ Patient found but no recordings in HQP yet.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Step 1: Patient Information ── */}
      <div className="fc">
        <div className="fc-hdr">
          <div className="fc-title">
            Patient Information
            {hqbApplied && <span style={{ marginLeft: '8px', fontSize: '11px', fontWeight: '600', color: '#0e7a55' }}>✓ Pre-filled from HQP</span>}
          </div>
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
          <div className="fg"><label className="fl">Email</label><input className="fi" type="email" placeholder="patient@email.com" value={form.email} onChange={e => s('email', e.target.value)} /></div>
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
            {qScore != null && (
              <div style={{ marginTop: '4px', fontSize: '11.5px', color: 'var(--text2)' }}>
                Questionnaire contributes <strong>{qContrib} pts</strong> to ELI (full ELI computed after HQP analysis)
              </div>
            )}
          </div>
          <div className="fg">
            <label className="fl">ARI — Autonomic Regulation Index (optional override, 0–100)</label>
            <input className="fi" placeholder="Auto-computed from HRV" value={form.ari} onChange={num('ari')} />
            {ariVal != null && (
              <div style={{ marginTop: '4px', fontSize: '11.5px', color: 'var(--text2)' }}>
                {ariVal >= 70 ? <strong style={{ color: '#0e7a55' }}>HIGH ARI (&ge;70)</strong> : <strong style={{ color: '#c0392b' }}>LOW ARI (&lt;70)</strong>}
                {' '}(override — normally computed from SDNN, RMSSD, TP, HF%, LF%)
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
                <div style={{ marginTop: '8px', padding: '10px 14px', background: eliQScore > 20 ? '#fef2f2' : '#f0fdf4', border: `1px solid ${eliQScore > 20 ? '#c0392b40' : '#0e7a5540'}`, borderRadius: '8px' }}>
                  <strong style={{ color: eliQScore > 20 ? '#c0392b' : '#0e7a55' }}>
                    Questionnaire Score: {eliQScore}/40 → {questionnaireToELI(eliQScore)} ELI pts
                  </strong>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '3px' }}>
                    One of 5 inputs to the ELI formula. Full ELI computed after HQP screenshot analysis.
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
            <div className="fg2" style={{ marginBottom: '20px' }}>
              <div className="fg"><label className="fl">Score / Category (e.g. 4 = high)</label><input className="fi" placeholder="e.g. 4" value={form.oxidativeStressScore} onChange={num('oxidativeStressScore')} /></div>
            </div>

            <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text3)', marginBottom: '10px' }}>
              Tests Performed This Session
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--text2)' }}>
                  <input type="checkbox" checked={form.adrenalTested} onChange={e => s('adrenalTested', e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--teal)', cursor: 'pointer' }} />
                  <span>Adrenal Urine Test was performed (include adrenal section in report)</span>
                </label>
                {form.adrenalTested && (
                  <div className="fg2" style={{ marginTop: '10px', paddingLeft: '26px' }}>
                    <div className="fg"><label className="fl">Drop Count</label><input className="fi" type="number" min="0" max="50" placeholder="e.g. 8" value={form.adrenalDropCount} onChange={e => s('adrenalDropCount', e.target.value)} /></div>
                    <div className="fg"><label className="fl">Thyroid Functional Index</label><input className="fi" type="number" min="0" max="100" placeholder="e.g. 42" value={form.thyroidFunctionalIndex} onChange={e => s('thyroidFunctionalIndex', e.target.value)} /></div>
                  </div>
                )}
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--text2)' }}>
                  <input type="checkbox" checked={form.brainGaugeTested} onChange={e => s('brainGaugeTested', e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--teal)', cursor: 'pointer' }} />
                  <span>Brain Gauge test was performed (include Brain Gauge section in report)</span>
                </label>
                {form.brainGaugeTested && (
                  <div className="fg2" style={{ marginTop: '10px', paddingLeft: '26px' }}>
                    <div className="fg"><label className="fl">Speed</label><input className="fi" type="number" min="0" max="100" placeholder="0–100" value={form.bgSpeed} onChange={e => s('bgSpeed', e.target.value)} /></div>
                    <div className="fg"><label className="fl">Accuracy</label><input className="fi" type="number" min="0" max="100" placeholder="0–100" value={form.bgAccuracy} onChange={e => s('bgAccuracy', e.target.value)} /></div>
                    <div className="fg"><label className="fl">Time Order Judgment</label><input className="fi" type="number" min="0" max="100" placeholder="0–100" value={form.bgTimeOrderJudgment} onChange={e => s('bgTimeOrderJudgment', e.target.value)} /></div>
                    <div className="fg"><label className="fl">Time Perception</label><input className="fi" type="number" min="0" max="100" placeholder="0–100" value={form.bgTimePerception} onChange={e => s('bgTimePerception', e.target.value)} /></div>
                    <div className="fg"><label className="fl">Plasticity</label><input className="fi" type="number" min="0" max="100" placeholder="0–100" value={form.bgPlasticity} onChange={e => s('bgPlasticity', e.target.value)} /></div>
                    <div className="fg"><label className="fl">Fatigue</label><input className="fi" type="number" min="0" max="100" placeholder="0–100" value={form.bgFatigue} onChange={e => s('bgFatigue', e.target.value)} /></div>
                    <div className="fg"><label className="fl">Focus</label><input className="fi" type="number" min="0" max="100" placeholder="0–100" value={form.bgFocus} onChange={e => s('bgFocus', e.target.value)} /></div>
                    <div className="fg"><label className="fl">Overall Cortical Metric</label><input className="fi" type="number" min="0" max="100" placeholder="0–100" value={form.bgOverallCortical} onChange={e => s('bgOverallCortical', e.target.value)} /></div>
                  </div>
                )}
              </div>
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
          className={`uz${drag ? ' drag' : ''}${pasteFlash ? ' drag' : ''}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
          onClick={() => document.getElementById('fup').click()}
          style={pasteFlash ? { borderColor: 'var(--green)', background: 'var(--bg3)' } : {}}
        >
          <input id="fup" type="file" accept="image/*,.png,.jpg,.jpeg,.tiff,.webp,.heic"
            multiple style={{ display: 'none' }}
            onChange={e => addFiles(e.target.files)} />
          {pasteFlash ? (
            <>
              <div className="uz-ico">✅</div>
              <div className="uz-title" style={{ color: 'var(--green)' }}>Screenshot pasted!</div>
            </>
          ) : (
            <>
              <div className="uz-ico">📸</div>
              <div className="uz-title">Drop, click to browse, or <kbd style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1px 5px', fontSize: '11px', fontFamily: 'monospace' }}>Ctrl+V</kbd> to paste</div>
              <div className="uz-sub">Upload multiple HQP screen captures — PNG, JPG, TIFF, WEBP accepted. GPT-4o reads all screens and extracts every marker.</div>
            </>
          )}
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
            hqbData: hqbFullRecord || null,
          }, files)}
          disabled={!canSubmit}
        >
          Run Analysis →
        </button>
      </div>
    </div>
  );
}
