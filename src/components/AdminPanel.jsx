/**
 * CRIS GOLD™ — Super Admin Panel
 * Full management: Users, Clinics/Practices, Subscriptions, Stats.
 * Only accessible to super admin users.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TIER_LABELS, TIER_COLORS, TIER_RANK } from '../lib/tiers';

const C = {
  navy: '#0a1628',
  blue: '#1a73e8',
  teal: '#0e8a7a',
  green: '#22c55e',
  red: '#ef4444',
  orange: '#f59e0b',
  purple: '#7c3aed',
  text: '#111827',
  text2: '#4b5563',
  text3: '#9ca3af',
  border: 'rgba(0,0,0,.09)',
  bg: '#fff',
  bg2: '#f8fafc',
};
const serif = "'Libre Baskerville', Georgia, serif";

export default function AdminPanel({ user }) {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('dashboard');
  const [editingId, setEditingId] = useState(null);
  const [editTier, setEditTier] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editClinic, setEditClinic] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '', fullName: '', clinicName: '', tier: 'none', role: 'Physician' });
  const [creating, setCreating] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState('all');

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    const [docRes, patRes, repRes, teamRes, tmRes] = await Promise.all([
      supabase.from('doctor_profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('patients').select('id, name, dob, mrn, doctor_id, created_at').order('created_at', { ascending: false }),
      supabase.from('reports').select('id, patient_id, doctor_id, created_at').order('created_at', { ascending: false }),
      supabase.from('teams').select('*').order('created_at', { ascending: false }),
      supabase.from('team_members').select('*'),
    ]);
    setDoctors(docRes.data || []);
    setPatients(patRes.data || []);
    setReports(repRes.data || []);
    setTeams(teamRes.data || []);
    setTeamMembers(tmRes.data || []);
    setLoading(false);
  };

  const showMsg = (text, type = 'success') => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(''), 4000);
  };

  const startEdit = (doc) => {
    setEditingId(doc.id);
    setEditTier(doc.subscription_tier || 'none');
    setEditStatus(doc.subscription_status || 'inactive');
    setEditRole(doc.role || 'Physician');
    setEditClinic(doc.clinic_name || '');
  };

  const cancelEdit = () => { setEditingId(null); };

  const saveEdit = async (docId) => {
    setSaving(true);
    const { error } = await supabase
      .from('doctor_profiles')
      .update({
        subscription_tier: editTier,
        subscription_status: editStatus,
        role: editRole,
        clinic_name: editClinic,
      })
      .eq('id', docId);
    if (error) {
      showMsg(`Error: ${error.message}`, 'error');
    } else {
      showMsg('User updated successfully');
      setEditingId(null);
      await loadAll();
    }
    setSaving(false);
  };

  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.password) {
      showMsg('Email and password are required', 'error');
      return;
    }
    if (newUser.password.length < 6) {
      showMsg('Password must be at least 6 characters', 'error');
      return;
    }
    setCreating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/.netlify/functions/admin-create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password,
          fullName: newUser.fullName,
          clinicName: newUser.clinicName,
          tier: newUser.tier,
          role: newUser.role,
        }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        showMsg(`Server error (${res.status}). Check that SUPABASE_SERVICE_ROLE_KEY is set in Netlify env vars.`, 'error');
        setCreating(false);
        return;
      }
      if (!res.ok) {
        showMsg(data.error || 'Failed to create user', 'error');
      } else {
        showMsg(`User "${data.user.email}" created successfully!`);
        setShowCreateUser(false);
        setNewUser({ email: '', password: '', fullName: '', clinicName: '', tier: 'starter', role: 'Physician' });
        await loadAll();
      }
    } catch (err) {
      showMsg(`Error: ${err.message}`, 'error');
    }
    setCreating(false);
  };

  const statusColor = (status) => {
    switch (status) {
      case 'active': return C.green;
      case 'cancelled': return C.red;
      case 'suspended': return C.orange;
      default: return C.text3;
    }
  };

  // ── Computed stats ──────────────────────────────────
  const totalUsers = doctors.length;
  const activeUsers = doctors.filter(d => d.subscription_status === 'active').length;
  const totalPatients = patients.length;
  const totalReports = reports.length;
  const totalTeams = teams.length;

  const tierCounts = {};
  doctors.forEach(d => {
    const t = d.subscription_tier || 'none';
    tierCounts[t] = (tierCounts[t] || 0) + 1;
  });

  // Clinics: group doctors by clinic_name
  const clinics = {};
  doctors.forEach(d => {
    const cn = d.clinic_name || 'Unassigned';
    if (!clinics[cn]) clinics[cn] = { name: cn, doctors: [], patients: 0, reports: 0 };
    clinics[cn].doctors.push(d);
  });
  // Count patients/reports per clinic
  Object.values(clinics).forEach(clinic => {
    const docIds = clinic.doctors.map(d => d.id);
    clinic.patients = patients.filter(p => docIds.includes(p.doctor_id)).length;
    clinic.reports = reports.filter(r => docIds.includes(r.doctor_id)).length;
  });

  // Filter doctors by search
  const filteredDoctors = doctors.filter(d => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || (d.full_name || '').toLowerCase().includes(q)
      || (d.billing_email || '').toLowerCase().includes(q)
      || (d.clinic_name || '').toLowerCase().includes(q);
    const matchClinic = selectedClinic === 'all' || (d.clinic_name || 'Unassigned') === selectedClinic;
    return matchSearch && matchClinic;
  });

  // Recent activity: last 10 reports
  const recentReports = reports.slice(0, 10).map(r => {
    const doc = doctors.find(d => d.id === r.doctor_id);
    const pat = patients.find(p => p.id === r.patient_id);
    return { ...r, doctorName: doc?.full_name || '—', patientName: pat?.name || '—' };
  });

  // Per-doctor report counts
  const doctorReportCounts = {};
  reports.forEach(r => { doctorReportCounts[r.doctor_id] = (doctorReportCounts[r.doctor_id] || 0) + 1; });
  const doctorPatientCounts = {};
  patients.forEach(p => { doctorPatientCounts[p.doctor_id] = (doctorPatientCounts[p.doctor_id] || 0) + 1; });

  if (!user?.isAdmin) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: C.text3 }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
        <h2 style={{ fontFamily: serif, color: C.navy }}>Access Denied</h2>
        <p>You do not have admin privileges.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'users',     icon: '👥', label: 'Users' },
    { id: 'clinics',   icon: '🏥', label: 'Clinics' },
    { id: 'subs',      icon: '💳', label: 'Subscriptions' },
    { id: 'activity',  icon: '📋', label: 'Activity' },
  ];

  return (
    <div style={{ padding: '0 0 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: serif, fontSize: '28px', fontWeight: 700, color: C.navy, marginBottom: '4px' }}>
          🛡 Super Admin Panel
        </h1>
        <p style={{ fontSize: '13px', color: C.text3 }}>
          Manage users, clinics, subscriptions, and monitor platform activity
        </p>
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${tab === t.id ? C.blue : C.border}`,
              background: tab === t.id ? C.blue : C.bg,
              color: tab === t.id ? '#fff' : C.text2,
            }}>
            {t.icon} {t.label}
          </button>
        ))}
        <button onClick={loadAll} style={{
          marginLeft: 'auto', padding: '8px 14px', borderRadius: '8px', border: `1px solid ${C.border}`,
          background: C.bg2, color: C.text2, fontSize: '12px', cursor: 'pointer',
        }}>
          ↻ Refresh
        </button>
      </div>

      {/* Message */}
      {msg && (
        <div style={{
          padding: '10px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px',
          background: msgType === 'error' ? '#fef2f2' : '#f0fdf4',
          color: msgType === 'error' ? '#b91c1c' : '#166534',
          border: `1px solid ${msgType === 'error' ? '#fecaca' : '#bbf7d0'}`,
        }}>
          {msg}
        </div>
      )}

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: C.text3 }}>Loading admin data…</div>
      ) : (
        <>
          {/* ═══ DASHBOARD ═══ */}
          {tab === 'dashboard' && (
            <div>
              {/* Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '28px' }}>
                <StatCard label="Total Users" value={totalUsers} icon="👥" color={C.blue} />
                <StatCard label="Active Subs" value={activeUsers} icon="✅" color={C.green} />
                <StatCard label="Patients" value={totalPatients} icon="🩺" color={C.teal} />
                <StatCard label="Reports" value={totalReports} icon="📄" color={C.purple} />
                <StatCard label="Clinics" value={Object.keys(clinics).filter(c => c !== 'Unassigned').length} icon="🏥" color={C.orange} />
                <StatCard label="Teams" value={totalTeams} icon="👨‍⚕️" color={C.navy} />
              </div>

              {/* Tier Breakdown */}
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: C.navy, marginBottom: '14px' }}>Subscription Tiers</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['none', 'starter', 'professional', 'clinic'].map(t => (
                    <div key={t} style={{
                      flex: '1 1 120px', padding: '14px 18px', borderRadius: '10px',
                      background: `${TIER_COLORS[t] || C.text3}10`, border: `1px solid ${TIER_COLORS[t] || C.text3}30`,
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: TIER_COLORS[t] || C.text3 }}>
                        {tierCounts[t] || 0}
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: C.text2, textTransform: 'uppercase' }}>
                        {TIER_LABELS[t] || 'None'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: C.navy, marginBottom: '14px' }}>Recent Reports</h3>
                {recentReports.length === 0 ? (
                  <div style={{ color: C.text3, fontSize: '13px' }}>No reports yet</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {recentReports.map(r => (
                      <div key={r.id} style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px',
                        background: C.bg2, borderRadius: '8px', fontSize: '13px',
                      }}>
                        <span style={{ color: C.text3, fontSize: '11px', minWidth: '80px' }}>
                          {new Date(r.created_at).toLocaleDateString()}
                        </span>
                        <span style={{ fontWeight: 600, color: C.navy }}>{r.doctorName}</span>
                        <span style={{ color: C.text3 }}>→</span>
                        <span style={{ color: C.text2 }}>{r.patientName}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══ USERS ═══ */}
          {tab === 'users' && (
            <div>
              {/* Search + Filter bar */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search by name, email, or clinic…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    flex: '1 1 260px', padding: '9px 14px', borderRadius: '8px', fontSize: '13px',
                    border: `1px solid ${C.border}`, background: C.bg,
                  }}
                />
                <select value={selectedClinic} onChange={e => setSelectedClinic(e.target.value)}
                  style={{ padding: '9px 14px', borderRadius: '8px', fontSize: '13px', border: `1px solid ${C.border}`, background: C.bg }}>
                  <option value="all">All Clinics</option>
                  {Object.keys(clinics).sort().map(cn => (
                    <option key={cn} value={cn}>{cn} ({clinics[cn].doctors.length})</option>
                  ))}
                </select>
                <div style={{ fontSize: '12px', color: C.text3 }}>{filteredDoctors.length} users</div>
              </div>

              {/* Users Table */}
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ background: C.bg2, borderBottom: `1px solid ${C.border}` }}>
                      <th style={thStyle}>Name</th>
                      <th style={thStyle}>Email</th>
                      <th style={thStyle}>Clinic</th>
                      <th style={thStyle}>Role</th>
                      <th style={thStyle}>Tier</th>
                      <th style={thStyle}>Status</th>
                      <th style={thStyle}>Patients</th>
                      <th style={thStyle}>Reports</th>
                      <th style={thStyle}>Joined</th>
                      <th style={thStyle}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctors.map(doc => (
                      <tr key={doc.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={tdStyle}>
                          <span style={{ fontWeight: 600, color: C.navy }}>{doc.full_name || '—'}</span>
                        </td>
                        <td style={tdStyle}>{doc.billing_email || '—'}</td>
                        <td style={tdStyle}>
                          {editingId === doc.id ? (
                            <input value={editClinic} onChange={e => setEditClinic(e.target.value)}
                              style={{ ...inputStyle, width: '120px' }} placeholder="Clinic name" />
                          ) : doc.clinic_name || '—'}
                        </td>
                        <td style={tdStyle}>
                          {editingId === doc.id ? (
                            <select value={editRole} onChange={e => setEditRole(e.target.value)} style={selectStyle}>
                              <option value="Physician">Physician</option>
                              <option value="Practitioner">Practitioner</option>
                              <option value="Chief of Medicine">Chief of Medicine</option>
                              <option value="super_admin">Super Admin</option>
                            </select>
                          ) : (
                            <span style={{ color: doc.role === 'super_admin' ? C.purple : C.text2 }}>
                              {doc.role === 'super_admin' ? '⭐ Admin' : doc.role || '—'}
                            </span>
                          )}
                        </td>
                        <td style={tdStyle}>
                          {editingId === doc.id ? (
                            <select value={editTier} onChange={e => setEditTier(e.target.value)} style={selectStyle}>
                              <option value="none">None</option>
                              <option value="starter">Starter</option>
                              <option value="professional">Professional</option>
                              <option value="clinic">Clinic</option>
                            </select>
                          ) : (
                            <TierBadge tier={doc.subscription_tier} />
                          )}
                        </td>
                        <td style={tdStyle}>
                          {editingId === doc.id ? (
                            <select value={editStatus} onChange={e => setEditStatus(e.target.value)} style={selectStyle}>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="suspended">Suspended</option>
                            </select>
                          ) : (
                            <StatusBadge status={doc.subscription_status} />
                          )}
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                          {doctorPatientCounts[doc.id] || 0}
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                          {doctorReportCounts[doc.id] || 0}
                        </td>
                        <td style={tdStyle}>
                          {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : '—'}
                        </td>
                        <td style={tdStyle}>
                          {editingId === doc.id ? (
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => saveEdit(doc.id)} disabled={saving}
                                style={{ ...btnStyle, background: C.green, color: '#fff' }}>
                                {saving ? '…' : '✓ Save'}
                              </button>
                              <button onClick={cancelEdit}
                                style={{ ...btnStyle, background: C.bg2, color: C.text2 }}>
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => startEdit(doc)}
                              style={{ ...btnStyle, background: C.bg2, color: C.blue, border: `1px solid ${C.border}` }}>
                              ✏️ Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Create User Button */}
              {!showCreateUser && (
                <button onClick={() => setShowCreateUser(true)} style={{
                  marginTop: '16px', padding: '10px 20px', borderRadius: '8px', border: 'none',
                  background: C.blue, color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  ➕ Create New User
                </button>
              )}

              {/* Create User Form */}
              {showCreateUser && (
                <div style={{
                  marginTop: '16px', padding: '24px', borderRadius: '12px',
                  background: C.bg, border: `1px solid ${C.border}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: C.navy }}>Create New User</h3>
                    <button onClick={() => setShowCreateUser(false)}
                      style={{ ...btnStyle, background: C.bg2, color: C.text2, fontSize: '14px' }}>✕</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" value={newUser.email}
                        onChange={e => setNewUser(u => ({ ...u, email: e.target.value }))}
                        placeholder="doctor@clinic.com" style={formInputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Temporary Password *</label>
                      <input type="text" value={newUser.password}
                        onChange={e => setNewUser(u => ({ ...u, password: e.target.value }))}
                        placeholder="Min 6 characters" style={formInputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input type="text" value={newUser.fullName}
                        onChange={e => setNewUser(u => ({ ...u, fullName: e.target.value }))}
                        placeholder="Dr. Jane Smith" style={formInputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Clinic / Practice</label>
                      <input type="text" value={newUser.clinicName}
                        onChange={e => setNewUser(u => ({ ...u, clinicName: e.target.value }))}
                        placeholder="Wellness Clinic" style={formInputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Subscription Tier</label>
                      <select value={newUser.tier}
                        onChange={e => setNewUser(u => ({ ...u, tier: e.target.value }))}
                        style={formInputStyle}>
                        <option value="none">No Subscription</option>
                        <option value="starter">Starter ($97/mo)</option>
                        <option value="professional">Professional ($197/mo)</option>
                        <option value="clinic">Clinic ($497/mo)</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Role</label>
                      <select value={newUser.role}
                        onChange={e => setNewUser(u => ({ ...u, role: e.target.value }))}
                        style={formInputStyle}>
                        <option value="Physician">Physician</option>
                        <option value="Practitioner">Practitioner</option>
                        <option value="Chief of Medicine">Chief of Medicine</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: '18px', display: 'flex', gap: '10px' }}>
                    <button onClick={handleCreateUser} disabled={creating}
                      style={{
                        padding: '10px 24px', borderRadius: '8px', border: 'none',
                        background: C.green, color: '#fff', fontSize: '13px', fontWeight: 600,
                        cursor: creating ? 'wait' : 'pointer', opacity: creating ? 0.7 : 1,
                      }}>
                      {creating ? 'Creating…' : '✓ Create User'}
                    </button>
                    <button onClick={() => setShowCreateUser(false)}
                      style={{ padding: '10px 20px', borderRadius: '8px', border: `1px solid ${C.border}`,
                        background: C.bg2, color: C.text2, fontSize: '13px', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>

                  <div style={{
                    marginTop: '12px', fontSize: '11px', color: C.text3,
                  }}>
                    The user will be created with email confirmed. Share the temporary password with them — they can change it after logging in.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ CLINICS ═══ */}
          {tab === 'clinics' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {Object.values(clinics).sort((a, b) => b.doctors.length - a.doctors.length).map(clinic => (
                  <div key={clinic.name} style={{
                    background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px',
                    padding: '20px', position: 'relative',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: C.navy, marginBottom: '2px' }}>
                          {clinic.name === 'Unassigned' ? '📋 Unassigned' : `🏥 ${clinic.name}`}
                        </h3>
                        <p style={{ fontSize: '11px', color: C.text3 }}>
                          {clinic.doctors.length} practitioner{clinic.doctors.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Clinic stats row */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: C.teal }}>{clinic.patients}</div>
                        <div style={{ fontSize: '10px', color: C.text3, textTransform: 'uppercase' }}>Patients</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: C.purple }}>{clinic.reports}</div>
                        <div style={{ fontSize: '10px', color: C.text3, textTransform: 'uppercase' }}>Reports</div>
                      </div>
                    </div>

                    {/* Practitioners list */}
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '10px' }}>
                      {clinic.doctors.map(doc => (
                        <div key={doc.id} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '6px 0', fontSize: '12px',
                        }}>
                          <span style={{ fontWeight: 600, color: C.text }}>{doc.full_name || doc.billing_email || '—'}</span>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <TierBadge tier={doc.subscription_tier} />
                            <StatusBadge status={doc.subscription_status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {Object.keys(clinics).length === 0 && (
                <div style={{ textAlign: 'center', color: C.text3, padding: '40px' }}>No clinics yet</div>
              )}
            </div>
          )}

          {/* ═══ SUBSCRIPTIONS ═══ */}
          {tab === 'subs' && (
            <div>
              {/* Revenue Overview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                <StatCard label="Starter ($97/mo)" value={tierCounts.starter || 0} icon="🥉"
                  color={TIER_COLORS.starter} sub={`$${(tierCounts.starter || 0) * 97}/mo`} />
                <StatCard label="Professional ($197/mo)" value={tierCounts.professional || 0} icon="🥈"
                  color={TIER_COLORS.professional} sub={`$${(tierCounts.professional || 0) * 197}/mo`} />
                <StatCard label="Clinic ($497/mo)" value={tierCounts.clinic || 0} icon="🥇"
                  color={TIER_COLORS.clinic} sub={`$${(tierCounts.clinic || 0) * 497}/mo`} />
                <StatCard label="Est. MRR" value={`$${((tierCounts.starter || 0) * 97) + ((tierCounts.professional || 0) * 197) + ((tierCounts.clinic || 0) * 497)}`}
                  icon="💰" color={C.green} />
              </div>

              {/* Subscriptions Table */}
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ background: C.bg2, borderBottom: `1px solid ${C.border}` }}>
                      <th style={thStyle}>User</th>
                      <th style={thStyle}>Tier</th>
                      <th style={thStyle}>Status</th>
                      <th style={thStyle}>PayPal Sub ID</th>
                      <th style={thStyle}>Start Date</th>
                      <th style={thStyle}>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.filter(d => d.subscription_tier && d.subscription_tier !== 'none').length === 0 ? (
                      <tr><td colSpan={6} style={{ ...tdStyle, textAlign: 'center', color: C.text3 }}>No active subscriptions</td></tr>
                    ) : (
                      doctors.filter(d => d.subscription_tier && d.subscription_tier !== 'none')
                        .sort((a, b) => (TIER_RANK[b.subscription_tier] || 0) - (TIER_RANK[a.subscription_tier] || 0))
                        .map(doc => (
                          <tr key={doc.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                            <td style={tdStyle}>
                              <div style={{ fontWeight: 600, color: C.navy }}>{doc.full_name || '—'}</div>
                              <div style={{ fontSize: '11px', color: C.text3 }}>{doc.billing_email || '—'}</div>
                            </td>
                            <td style={tdStyle}><TierBadge tier={doc.subscription_tier} /></td>
                            <td style={tdStyle}><StatusBadge status={doc.subscription_status} /></td>
                            <td style={tdStyle}>
                              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: C.text3 }}>
                                {doc.paypal_subscription_id || '—'}
                              </span>
                            </td>
                            <td style={tdStyle}>
                              {doc.plan_start_date ? new Date(doc.plan_start_date).toLocaleDateString() : '—'}
                            </td>
                            <td style={tdStyle}>
                              {doc.plan_end_date ? new Date(doc.plan_end_date).toLocaleDateString() : '—'}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ ACTIVITY ═══ */}
          {tab === 'activity' && (
            <div>
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: C.navy, marginBottom: '16px' }}>
                  Recent Platform Activity
                </h3>

                {/* New Users */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 600, color: C.text3, textTransform: 'uppercase', marginBottom: '10px' }}>
                    Newest Users
                  </h4>
                  {doctors.slice(0, 5).map(doc => (
                    <div key={doc.id} style={{
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px',
                      background: C.bg2, borderRadius: '8px', marginBottom: '6px', fontSize: '13px',
                    }}>
                      <span style={{ color: C.text3, fontSize: '11px', minWidth: '80px' }}>
                        {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : '—'}
                      </span>
                      <span style={{ fontWeight: 600, color: C.navy }}>{doc.full_name || '—'}</span>
                      <TierBadge tier={doc.subscription_tier} />
                      {doc.clinic_name && (
                        <span style={{ fontSize: '11px', color: C.text3 }}>@ {doc.clinic_name}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Recent Reports */}
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 600, color: C.text3, textTransform: 'uppercase', marginBottom: '10px' }}>
                    Latest Reports Generated
                  </h4>
                  {recentReports.length === 0 ? (
                    <div style={{ color: C.text3, fontSize: '13px' }}>No reports yet</div>
                  ) : (
                    recentReports.map(r => (
                      <div key={r.id} style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px',
                        background: C.bg2, borderRadius: '8px', marginBottom: '6px', fontSize: '13px',
                      }}>
                        <span style={{ color: C.text3, fontSize: '11px', minWidth: '80px' }}>
                          {new Date(r.created_at).toLocaleDateString()}
                        </span>
                        <span style={{ fontWeight: 600, color: C.navy }}>{r.doctorName}</span>
                        <span style={{ color: C.text3 }}>→</span>
                        <span style={{ color: C.text2 }}>{r.patientName}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Sub-components ──────────────────────────────────

function StatCard({ label, value, icon, color, sub }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid rgba(0,0,0,.09)', borderRadius: '12px',
      padding: '18px', textAlign: 'center',
    }}>
      <div style={{ fontSize: '20px', marginBottom: '6px' }}>{icon}</div>
      <div style={{ fontSize: '28px', fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.04em', marginTop: '2px' }}>
        {label}
      </div>
      {sub && <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600, marginTop: '4px' }}>{sub}</div>}
    </div>
  );
}

function TierBadge({ tier }) {
  return (
    <span style={{
      padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700,
      background: `${TIER_COLORS[tier] || '#9ca3af'}18`,
      color: TIER_COLORS[tier] || '#9ca3af',
    }}>
      {TIER_LABELS[tier] || 'None'}
    </span>
  );
}

function StatusBadge({ status }) {
  const colors = { active: '#22c55e', cancelled: '#ef4444', suspended: '#f59e0b', inactive: '#9ca3af' };
  const c = colors[status] || colors.inactive;
  return (
    <span style={{
      padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700,
      background: `${c}18`, color: c,
    }}>
      {status || 'inactive'}
    </span>
  );
}

// ── Styles ──────────────────────────────────

const thStyle = {
  padding: '10px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 600,
  color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.05em',
};
const tdStyle = { padding: '12px 14px', color: '#4b5563' };
const selectStyle = {
  padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,.15)',
  fontSize: '12px', background: '#fff',
};
const inputStyle = {
  padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(0,0,0,.15)',
  fontSize: '12px', background: '#fff',
};
const btnStyle = {
  padding: '5px 12px', borderRadius: '6px', border: 'none',
  fontSize: '12px', fontWeight: 600, cursor: 'pointer',
};
const labelStyle = {
  display: 'block', fontSize: '11px', fontWeight: 600, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '4px',
};
const formInputStyle = {
  width: '100%', padding: '9px 12px', borderRadius: '8px',
  border: '1px solid rgba(0,0,0,.15)', fontSize: '13px', background: '#fff',
  boxSizing: 'border-box',
};
