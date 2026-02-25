import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ini, age, fmtDate } from '../lib/utils';
import Badge from './Badge';

// Demo fallback patients
const DEMO_PATIENTS = [
  { id: 1, first_name: 'Maria', last_name: 'Gonzalez', dob: '1985-03-14', gender: 'Female', mrn: 'MRN-0041', updated_at: '2026-02-18', status: 'critical', report_count: 3, report_type: 'HRV Analysis' },
  { id: 2, first_name: 'James', last_name: 'Whitfield',  dob: '1972-07-29', gender: 'Male',   mrn: 'MRN-0042', updated_at: '2026-02-20', status: 'normal',   report_count: 1, report_type: 'Lipid Panel' },
  { id: 3, first_name: 'Aisha', last_name: 'Patel',      dob: '1990-11-05', gender: 'Female', mrn: 'MRN-0043', updated_at: '2026-02-22', status: 'warning',  report_count: 2, report_type: 'HRV Analysis' },
];

export default function Dashboard({ user, onNew, onView, sessionPatients = [] }) {
  const [dbPatients, setDbPatients] = useState([]);
  const [loading, setLoading]   = useState(true);

  // Merge session patients on top of DB/demo patients, deduplicating by id
  const patients = [
    ...sessionPatients.map(p => ({
      ...p,
      status: p.latestReport?.overallStatus || 'normal',
      report_count: 1,
      report_type: p.latestReport?.report_type || 'CRIS GOLD HRV',
    })),
    ...dbPatients.filter(p => !sessionPatients.find(s => s.id === p.id)),
  ];

  useEffect(() => {
    const load = async () => {
      if (user.id === 'demo') { setDbPatients(DEMO_PATIENTS); setLoading(false); return; }
      const { data } = await supabase
        .from('patients')
        .select(`id, first_name, last_name, dob, gender, mrn, updated_at,
                 reports(id, report_type, status, cri_score, hrq_quadrant, created_at)`)
        .eq('doctor_id', user.id)
        .order('updated_at', { ascending: false });
      if (data) {
        setDbPatients(data.map(p => ({
          ...p,
          status: deriveStatus(p.reports),
          report_count: p.reports?.length || 0,
          report_type: p.reports?.[0]?.report_type || '—',
        })));
      }
      setLoading(false);
    };
    load();
  }, [user.id]);

  const deriveStatus = (reports = []) => {
    if (!reports.length) return 'pending';
    const latest = reports.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
    return latest.status === 'complete' ? (latest.cri_score >= 6 ? 'critical' : latest.cri_score >= 3 ? 'warning' : 'normal') : latest.status;
  };

  const tot  = patients.length;
  const crit = patients.filter(p => p.status === 'critical').length;
  const warn = patients.filter(p => p.status === 'warning').length;
  const reps = patients.reduce((a, p) => a + (p.report_count || 0), 0);

  return (
    <div className="fade-in">
      <div className="pg-hdr">
        <div>
          <div className="pg-title">Patient Overview</div>
          <div className="pg-sub">Manage records and analyze incoming HRV and laboratory reports</div>
        </div>
        <button className="btn btn-nv" onClick={onNew}>+ New Patient</button>
      </div>

      <div className="stats-row">
        <div className="sc"><div className="sc-top"><div className="sc-lbl">Total Patients</div><div className="sc-ico">👤</div></div><div className="sc-val">{tot}</div><div className="sc-chg up">Active records</div></div>
        <div className="sc"><div className="sc-top"><div className="sc-lbl">Reports Analyzed</div><div className="sc-ico">📋</div></div><div className="sc-val">{reps}</div><div className="sc-chg">All patients</div></div>
        <div className="sc"><div className="sc-top"><div className="sc-lbl">Critical Flags</div><div className="sc-ico">🔴</div></div><div className="sc-val" style={{ color: 'var(--red)' }}>{crit}</div><div className="sc-chg alert">Needs review</div></div>
        <div className="sc"><div className="sc-top"><div className="sc-lbl">Under Review</div><div className="sc-ico">🟡</div></div><div className="sc-val" style={{ color: 'var(--amber)' }}>{warn}</div><div className="sc-chg warn">Follow-up needed</div></div>
      </div>

      <div className="card">
        <div className="card-hdr">
          <span className="card-title">Patient Records</span>
          <span className="tag-bl">Live</span>
        </div>
        <div className="tw">
          {loading ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text3)' }}>Loading patients…</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Patient</th><th>MRN</th><th>Report Type</th>
                  <th>Last Visit</th><th>Reports</th><th>Status</th><th></th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id} onClick={() => onView(p)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="av-sm">{ini(`${p.first_name} ${p.last_name}`)}</div>
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--navy)' }}>{p.first_name} {p.last_name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{p.gender} · {age(p.dob)} yrs</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '12.5px', color: 'var(--text2)' }}>{p.mrn}</td>
                    <td style={{ color: 'var(--text2)' }}>{p.report_type}</td>
                    <td style={{ color: 'var(--text2)' }}>{fmtDate(p.updated_at)}</td>
                    <td><span className="badge b-gr">{p.report_count}</span></td>
                    <td><Badge status={p.status} /></td>
                    <td><button className="btn-lk" onClick={e => { e.stopPropagation(); onView(p); }}>Open →</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
