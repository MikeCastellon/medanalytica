/**
 * CRIS GOLD™ — Team Dashboard
 * Clinic tier feature: View all patients across all team practitioners.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Badge from './Badge';
import { ini } from '../lib/utils';

const C = {
  navy: '#0a1628',
  blue: '#1a73e8',
  teal: '#0e8a7a',
  green: '#22c55e',
  red: '#ef4444',
  amber: '#f59e0b',
  text2: '#4b5563',
  text3: '#9ca3af',
  border: 'rgba(0,0,0,.09)',
  bg: '#fff',
  bg2: '#f8fafc',
};
const serif = "'Libre Baskerville', Georgia, serif";

export default function TeamDashboard({ user, onView }) {
  const [patients, setPatients] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDoctor, setFilterDoctor] = useState('all');

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    setLoading(true);

    // Load team members
    if (user.team?.id) {
      const { data: mems } = await supabase
        .from('team_members')
        .select('user_id, role, joined_at')
        .eq('team_id', user.team.id);

      if (mems) {
        // Load profiles for each member
        const userIds = mems.map(m => m.user_id);
        const { data: profiles } = await supabase
          .from('doctor_profiles')
          .select('id, full_name, role, initials')
          .in('id', userIds);

        const enriched = mems.map(m => ({
          ...m,
          profile: profiles?.find(p => p.id === m.user_id) || {},
        }));
        setMembers(enriched);
      }
    }

    // Load all patients (RLS will scope to team)
    const { data: pats, error } = await supabase
      .from('patients')
      .select('id, doctor_id, first_name, last_name, mrn, dob, gender, updated_at, reports(id, report_type, status, cri_score, created_at)')
      .order('updated_at', { ascending: false });

    if (error) console.error('Team dashboard load error:', error);
    setPatients(pats || []);
    setLoading(false);
  };

  const deriveStatus = (reports = []) => {
    if (!reports.length) return 'pending';
    const latest = [...reports].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
    return latest.status === 'complete'
      ? (latest.cri_score >= 6 ? 'critical' : latest.cri_score >= 3 ? 'warning' : 'normal')
      : latest.status;
  };

  const getDoctorName = (doctorId) => {
    const member = members.find(m => m.user_id === doctorId);
    return member?.profile?.full_name || 'Unknown';
  };

  const filtered = filterDoctor === 'all'
    ? patients
    : patients.filter(p => p.doctor_id === filterDoctor);

  // Stats
  const totalPatients = filtered.length;
  const totalReports = filtered.reduce((sum, p) => sum + (p.reports?.length || 0), 0);
  const criticalCount = filtered.filter(p => deriveStatus(p.reports) === 'critical').length;

  return (
    <div style={{ padding: '0 0 40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontFamily: serif, fontSize: '28px', fontWeight: 700, color: C.navy, marginBottom: '4px' }}>
            👥 Team Dashboard
          </h1>
          <p style={{ fontSize: '13px', color: C.text3 }}>
            {user.team?.name || 'Your Clinic'} · {members.length} practitioner{members.length !== 1 ? 's' : ''}
          </p>
        </div>
        <select
          value={filterDoctor}
          onChange={e => setFilterDoctor(e.target.value)}
          style={{
            padding: '8px 14px', borderRadius: '8px', border: `1px solid ${C.border}`,
            fontSize: '13px', color: C.navy, background: C.bg,
          }}
        >
          <option value="all">All Practitioners</option>
          {members.map(m => (
            <option key={m.user_id} value={m.user_id}>
              {m.profile?.full_name || 'Unknown'}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Team Patients" value={totalPatients} icon="👤" />
        <StatCard label="Total Reports" value={totalReports} icon="📊" />
        <StatCard label="Critical Flags" value={criticalCount} icon="🔴" color={criticalCount > 0 ? C.red : C.green} />
        <StatCard label="Practitioners" value={members.length} icon="🩺" />
      </div>

      {/* Patient Table */}
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: C.text3 }}>Loading team data…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: C.text3 }}>
            <p>No patients found.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: C.bg2, borderBottom: `1px solid ${C.border}` }}>
                <th style={thStyle}>Patient</th>
                <th style={thStyle}>MRN</th>
                <th style={thStyle}>Practitioner</th>
                <th style={thStyle}>Reports</th>
                <th style={thStyle}>Last Visit</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const status = deriveStatus(p.reports);
                return (
                  <tr key={p.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%', background: `${C.blue}12`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '11px', fontWeight: 700, color: C.blue,
                        }}>
                          {ini(`${p.first_name} ${p.last_name}`)}
                        </div>
                        <span style={{ fontWeight: 600, color: C.navy }}>
                          {p.first_name} {p.last_name}
                        </span>
                      </div>
                    </td>
                    <td style={tdStyle}>{p.mrn || '—'}</td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: '12px', color: C.teal, fontWeight: 600 }}>
                        {getDoctorName(p.doctor_id)}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 700,
                        background: `${C.blue}12`, color: C.blue,
                      }}>
                        {p.reports?.length || 0}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      {p.updated_at ? new Date(p.updated_at).toLocaleDateString() : '—'}
                    </td>
                    <td style={tdStyle}><Badge status={status} /></td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => onView(p)}
                        style={{
                          padding: '5px 14px', borderRadius: '6px', border: `1px solid ${C.border}`,
                          background: C.bg2, color: C.blue, fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                        }}
                      >
                        Open →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid rgba(0,0,0,.09)', borderRadius: '12px',
      padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.05em' }}>{label}</span>
        <span style={{ fontSize: '18px' }}>{icon}</span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: color || '#0a1628' }}>{value}</div>
    </div>
  );
}

const thStyle = {
  padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 600,
  color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.05em',
};
const tdStyle = { padding: '12px 14px', color: '#4b5563' };
