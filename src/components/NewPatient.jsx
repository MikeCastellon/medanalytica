import { useState } from 'react';

export default function NewPatient({ onBack, onSubmit }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', gender: '',
    mrn: '', phone: '', reportType: '', collectionDate: '', notes: '',
  });
  const [file, setFile]   = useState(null);
  const [drag, setDrag]   = useState(false);
  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const canSubmit = file && form.firstName && form.lastName;

  return (
    <div className="fade-in">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="pg-hdr">
        <div>
          <div className="pg-title">New Patient</div>
          <div className="pg-sub">Complete patient details and upload their report for AI analysis</div>
        </div>
      </div>

      {/* Patient Information */}
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

      {/* Report Information */}
      <div className="fc">
        <div className="fc-hdr">
          <div className="fc-title">Report Information</div>
          <div className="fc-badge">Step 2</div>
        </div>
        <div className="fg2">
          <div className="fg">
            <label className="fl">Report Type</label>
            <select className="fi" value={form.reportType} onChange={e => s('reportType', e.target.value)}>
              <option value="">Select…</option>
              <option>HRV Analysis</option>
              <option>Complete Blood Count (CBC)</option>
              <option>Lipid Panel</option>
              <option>Thyroid Function Panel</option>
              <option>Comprehensive Metabolic Panel</option>
              <option>Cardiology</option>
              <option>Urinalysis</option>
              <option>Other</option>
            </select>
          </div>
          <div className="fg"><label className="fl">Collection Date</label><input className="fi" type="date" value={form.collectionDate} onChange={e => s('collectionDate', e.target.value)} /></div>
          <div className="fg fs">
            <label className="fl">Clinical Notes</label>
            <textarea className="fi" placeholder="Presenting symptoms, relevant history, physician observations…"
              value={form.notes} onChange={e => s('notes', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Upload */}
      <div className="fc">
        <div className="fc-hdr">
          <div className="fc-title">Upload Report</div>
          <div className="fc-badge">Step 3</div>
        </div>
        <div
          className={`uz${drag ? ' drag' : ''}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }}
          onClick={() => document.getElementById('fup').click()}
        >
          <input id="fup" type="file" accept=".pdf,.png,.jpg,.jpeg,.tiff"
            style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setFile(e.target.files[0]); }} />
          {!file ? (
            <>
              <div className="uz-ico">📄</div>
              <div className="uz-title">Drop report here or click to browse</div>
              <div className="uz-sub">PDF, PNG, JPG or TIFF — AI extracts all values automatically</div>
            </>
          ) : (
            <div className="fp">
              <span style={{ fontSize: '24px' }}>{file.name.endsWith('.pdf') ? '📕' : '🖼️'}</span>
              <div style={{ flex: 1 }}>
                <div className="fn">{file.name}</div>
                <div className="fsz">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready</div>
              </div>
              <button style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}
                onClick={e => { e.stopPropagation(); setFile(null); }}>×</button>
            </div>
          )}
        </div>
        <p className="hint">⚡ Powered by Claude AI — HRV scores, CRI, quadrants, and markers extracted automatically.</p>
      </div>

      <div className="fa">
        <button className="btn btn-ot" onClick={onBack}>Cancel</button>
        <button className="btn btn-nv" onClick={() => onSubmit(form, file)} disabled={!canSubmit}>
          Run Analysis →
        </button>
      </div>
    </div>
  );
}
