/**
 * CRIS GOLD™ — Team Management
 * Clinic tier feature: Invite/remove practitioners, manage team settings.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const C = {
  navy: '#0a1628',
  blue: '#1a73e8',
  teal: '#0e8a7a',
  green: '#22c55e',
  red: '#ef4444',
  text2: '#4b5563',
  text3: '#9ca3af',
  border: 'rgba(0,0,0,.09)',
  bg: '#fff',
  bg2: '#f8fafc',
};
const serif = "'Libre Baskerville', Georgia, serif";

export default function TeamManagement({ user }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState(''); // 'success' | 'error'

  const isOwner = user.team?.userRole === 'owner';
  const maxMembers = user.team?.maxMembers || 5;

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    if (!user.team?.id) {
      setLoading(false);
      return;
    }

    const { data: mems, error } = await supabase
      .from('team_members')
      .select('id, user_id, role, joined_at')
      .eq('team_id', user.team.id)
      .order('joined_at', { ascending: true });

    if (error) {
      console.error('Failed to load team members:', error);
      setLoading(false);
      return;
    }

    // Enrich with profiles
    const userIds = (mems || []).map(m => m.user_id);
    const { data: profiles } = await supabase
      .from('doctor_profiles')
      .select('id, full_name, billing_email, role, initials')
      .in('id', userIds);

    const enriched = (mems || []).map(m => ({
      ...m,
      profile: profiles?.find(p => p.id === m.user_id) || {},
    }));

    setMembers(enriched);
    setLoading(false);
  };

  const showMsg = (text, type) => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(''), 5000);
  };

  const handleInvite = async () => {
    if (!inviteEmail.includes('@')) {
      showMsg('Please enter a valid email address', 'error');
      return;
    }
    if (members.length >= maxMembers) {
      showMsg(`Team is full (${maxMembers} members max). Upgrade to add more.`, 'error');
      return;
    }

    setInviting(true);
    try {
      // Look up the user by email in doctor_profiles
      const { data: profile, error: lookupErr } = await supabase
        .from('doctor_profiles')
        .select('id, full_name')
        .eq('billing_email', inviteEmail.trim().toLowerCase())
        .maybeSingle();

      if (lookupErr) throw lookupErr;

      if (!profile) {
        showMsg('No account found with that email. They need to sign up first.', 'error');
        setInviting(false);
        return;
      }

      // Check if already a member
      const alreadyMember = members.find(m => m.user_id === profile.id);
      if (alreadyMember) {
        showMsg(`${profile.full_name || inviteEmail} is already on the team.`, 'error');
        setInviting(false);
        return;
      }

      // Add to team
      const { error: insertErr } = await supabase
        .from('team_members')
        .insert({
          team_id: user.team.id,
          user_id: profile.id,
          role: 'practitioner',
          invited_by: user.id,
        });

      if (insertErr) throw insertErr;

      showMsg(`${profile.full_name || inviteEmail} added to the team!`, 'success');
      setInviteEmail('');
      await loadMembers();
    } catch (err) {
      console.error('Invite error:', err);
      showMsg(err.message || 'Failed to invite member', 'error');
    }
    setInviting(false);
  };

  const handleRemove = async (memberId, memberName) => {
    if (!confirm(`Remove ${memberName} from the team?`)) return;

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId);

    if (error) {
      showMsg(`Failed to remove: ${error.message}`, 'error');
    } else {
      showMsg(`${memberName} removed from the team`, 'success');
      await loadMembers();
    }
  };

  if (!user.team) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: C.text3 }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏥</div>
        <h2 style={{ fontFamily: serif, color: C.navy, marginBottom: '8px' }}>No Team Yet</h2>
        <p style={{ fontSize: '13px' }}>Your team will be created when your Clinic subscription is activated.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 0 40px', maxWidth: '720px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: serif, fontSize: '28px', fontWeight: 700, color: C.navy, marginBottom: '4px' }}>
          🏥 Team Settings
        </h1>
        <p style={{ fontSize: '13px', color: C.text3 }}>
          {user.team.name} · {members.length}/{maxMembers} practitioners
        </p>
      </div>

      {/* Message */}
      {msg && (
        <div style={{
          padding: '10px 16px', borderRadius: '8px', marginBottom: '16px',
          background: msgType === 'error' ? '#fef2f2' : '#f0fdf4',
          color: msgType === 'error' ? '#b91c1c' : '#166534',
          fontSize: '13px', border: `1px solid ${msgType === 'error' ? '#fecaca' : '#bbf7d0'}`,
        }}>
          {msg}
        </div>
      )}

      {/* Invite Section (owner only) */}
      {isOwner && (
        <div style={{
          background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px',
          padding: '20px 24px', marginBottom: '24px',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: C.navy, marginBottom: '12px' }}>
            Invite Practitioner
          </h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="email"
              placeholder="practitioner@clinic.com"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleInvite()}
              style={{
                flex: 1, padding: '10px 14px', borderRadius: '8px',
                border: `1px solid ${C.border}`, fontSize: '13px', color: C.navy,
                background: C.bg2,
              }}
            />
            <button
              onClick={handleInvite}
              disabled={inviting || members.length >= maxMembers}
              style={{
                padding: '10px 22px', borderRadius: '8px', border: 'none',
                background: members.length >= maxMembers ? C.text3 : C.blue,
                color: '#fff', fontSize: '13px', fontWeight: 700, cursor: inviting ? 'default' : 'pointer',
              }}
            >
              {inviting ? 'Adding…' : '+ Add'}
            </button>
          </div>
          {members.length >= maxMembers && (
            <p style={{ fontSize: '11px', color: C.red, marginTop: '8px' }}>
              Team is full ({maxMembers} members). Contact support to increase limit.
            </p>
          )}
        </div>
      )}

      {/* Members List */}
      <div style={{
        background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: C.navy }}>Team Members</h3>
        </div>

        {loading ? (
          <div style={{ padding: '32px', textAlign: 'center', color: C.text3 }}>Loading…</div>
        ) : (
          <div>
            {members.map((m, idx) => (
              <div
                key={m.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '14px 24px',
                  borderBottom: idx < members.length - 1 ? `1px solid ${C.border}` : 'none',
                }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: m.role === 'owner' ? `${C.teal}15` : `${C.blue}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700,
                  color: m.role === 'owner' ? C.teal : C.blue,
                }}>
                  {m.profile?.initials || '??'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: C.navy }}>
                    {m.profile?.full_name || 'Unknown'}
                  </div>
                  <div style={{ fontSize: '12px', color: C.text3 }}>
                    {m.profile?.billing_email || ''}
                    {m.role === 'owner' && (
                      <span style={{
                        marginLeft: '8px', padding: '1px 6px', borderRadius: '8px',
                        fontSize: '10px', fontWeight: 700, background: `${C.teal}15`, color: C.teal,
                      }}>
                        Owner
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: C.text3 }}>
                  Joined {new Date(m.joined_at).toLocaleDateString()}
                </div>
                {isOwner && m.role !== 'owner' && (
                  <button
                    onClick={() => handleRemove(m.id, m.profile?.full_name || 'this member')}
                    style={{
                      padding: '5px 12px', borderRadius: '6px', border: `1px solid ${C.border}`,
                      background: C.bg2, color: C.red, fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
