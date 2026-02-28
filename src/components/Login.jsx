import { useState } from 'react';
import { supabase } from '../lib/supabase';
import CrisLogo from './CrisLogo';

export default function Login({ onLogin }) {
  const [email, setEmail]   = useState('');
  const [pass, setPass]     = useState('');
  const [err, setErr]       = useState('');
  const [loading, setLoading] = useState(false);

  const go = async () => {
    setErr('');
    setLoading(true);
    try {
      const isDemo = email === 'doctor@clinic.com' && pass === 'demo1234';
      const hasSupabase = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co';

      // Try Supabase auth for all accounts (including demo)
      if (hasSupabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });

        // If demo creds fail Supabase (user not created yet), fall back to mock
        if (error && isDemo) {
          const demoUser = { id: 'demo', name: 'Dr. Sarah Chen', role: 'Chief of Medicine', initials: 'SC', tier: 'professional', subscriptionStatus: 'active', isAdmin: false };
          sessionStorage.setItem('cris_demo_session', JSON.stringify(demoUser));
          onLogin(demoUser);
          return;
        }
        if (error) { setErr(error.message); return; }

        // Fetch doctor profile
        const { data: profile } = await supabase
          .from('doctor_profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        const tier   = (profile?.subscription_tier   || 'starter').toLowerCase();
        const status = (profile?.subscription_status || 'active').toLowerCase();
        const isAdmin = (profile?.role === 'super_admin') || (data.user.email === 'mike.castellon5@gmail.com');
        onLogin({
          id: data.user.id,
          name: profile?.full_name || data.user.email,
          title: profile?.title || '',
          role: profile?.role || 'Physician',
          initials: profile?.initials || data.user.email?.[0]?.toUpperCase() || 'DR',
          clinicName: profile?.clinic_name || '',
          tier: isAdmin ? 'clinic' : tier,
          subscriptionStatus: isAdmin ? 'active' : status,
          isAdmin,
        });
      } else if (isDemo) {
        // No Supabase configured — pure offline demo mode
        const demoUser = { id: 'demo', name: 'Dr. Sarah Chen', role: 'Chief of Medicine', initials: 'SC', tier: 'professional', subscriptionStatus: 'active', isAdmin: false };
        sessionStorage.setItem('cris_demo_session', JSON.stringify(demoUser));
        onLogin(demoUser);
      } else {
        setErr('Invalid credentials. (Demo: doctor@clinic.com / demo1234)');
      }
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
        <div className="l-features">
          {[
            'HRV analysis with CRI score & quadrant placement',
            'Automatic marker extraction from any lab report',
            'Patient-friendly cardiovascular risk reports',
            'Secure, HIPAA-ready infrastructure on Supabase',
          ].map((f, i) => (
            <div key={i} className="l-feat"><div className="f-dot" />{f}</div>
          ))}
        </div>
      </div>
      <div className="login-right">
        <div className="lf-wrap fade-in">
          <div className="lf-title">Welcome back</div>
          <p className="lf-sub">Sign in to your clinical dashboard</p>
          {err && <div className="l-err">⚠ {err}</div>}
          <div className="fg">
            <label className="fl">Email Address</label>
            <input className="fi" type="email" placeholder="doctor@clinic.com"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="fg">
            <label className="fl">Password</label>
            <input className="fi" type="password" placeholder="••••••••"
              value={pass} onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && go()} />
          </div>
          <button className="btn-login" onClick={go} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
          <div className="demo-hint">
            <strong>Demo mode:</strong> doctor@clinic.com &nbsp;/&nbsp; demo1234
          </div>
        </div>
      </div>
    </div>
  );
}
