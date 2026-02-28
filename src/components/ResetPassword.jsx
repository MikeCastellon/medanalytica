import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import CrisLogo from './CrisLogo';

export default function ResetPassword() {
  const [pass, setPass]       = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr]         = useState('');
  const [msg, setMsg]         = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady]     = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase sends a PASSWORD_RECOVERY event when user lands here from email link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
      }
    });
    // Also check if we already have a session (user may have clicked link)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async () => {
    setErr('');
    setMsg('');
    if (pass.length < 6) { setErr('Password must be at least 6 characters.'); return; }
    if (pass !== confirm) { setErr('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pass });
      if (error) { setErr(error.message); return; }
      setMsg('Password updated successfully! Redirecting to dashboard…');
      setTimeout(() => navigate('/dashboard'), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-left">
        <div className="ll-bg" /><div className="ll-grid" />
        <div className="ll-content">
          <div className="l-brand">
            <CrisLogo size={54} showSub={true} />
          </div>
          <div className="l-tagline">Clinical Report<br /><em>Intelligence</em></div>
          <p className="l-desc">
            AI-powered analysis of patient HRV and lab reports. Extract scores,
            visualize quadrant placement, and flag anomalies automatically.
          </p>
        </div>
      </div>
      <div className="login-right">
        <div className="lf-wrap fade-in">
          <div className="lf-title">Set new password</div>
          <p className="lf-sub">Enter your new password below</p>
          {err && <div className="l-err">⚠ {err}</div>}
          {msg && <div className="l-msg">✓ {msg}</div>}
          {!ready ? (
            <p style={{ fontSize: '13px', color: 'var(--text2)', textAlign: 'center', padding: '20px 0' }}>
              Verifying reset link…
            </p>
          ) : (
            <>
              <div className="fg">
                <label className="fl">New Password</label>
                <input className="fi" type="password" placeholder="••••••••"
                  value={pass} onChange={e => setPass(e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl">Confirm Password</label>
                <input className="fi" type="password" placeholder="••••••••"
                  value={confirm} onChange={e => setConfirm(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleReset()} />
              </div>
              <button className="btn-login" onClick={handleReset} disabled={loading}>
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </>
          )}
          <button className="btn-forgot" onClick={() => navigate('/dashboard')}>
            ← Back to sign in
          </button>
        </div>
      </div>
    </div>
  );
}
