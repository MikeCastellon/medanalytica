import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from './lib/supabase';
import CrisLogo from './components/CrisLogo';

const LOGO_KEY     = 'medanalytica_custom_logo';
const PATIENTS_KEY = 'cris_session_patients';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NewPatient from './components/NewPatient';
import Processing from './components/Processing';
import PatientReport from './components/PatientReport';
import Settings from './components/Settings';
import Topbar from './components/Topbar';
import { ini } from './lib/utils';
import './App.css';

// HIPAA: Auto-logout after 15 minutes of inactivity (900 000 ms)
const SESSION_TIMEOUT_MS = 15 * 60 * 1000;
const WARN_BEFORE_MS     = 2 * 60 * 1000; // warn 2 min before

export default function App() {
  const [user, setUser]   = useState(null);
  const [view, setView]   = useState('dashboard');
  const [pending, setPending] = useState(null); // { form, file }
  const [result, setResult]   = useState(null); // { patient, report }
  const [sessionPatients, setSessionPatients] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(PATIENTS_KEY) || '[]'); } catch { return []; }
  }); // persisted to sessionStorage so reports survive refresh
  const [sessionWarn, setSessionWarn] = useState(false); // show 2-min warning
  const [customLogo, setCustomLogo]   = useState(() => localStorage.getItem(LOGO_KEY) || '');
  const timeoutRef  = useRef(null);
  const warnRef     = useRef(null);

  // Persist session patients to sessionStorage whenever they change
  useEffect(() => {
    try { sessionStorage.setItem(PATIENTS_KEY, JSON.stringify(sessionPatients)); } catch {}
  }, [sessionPatients]);

  // Listen for logo changes saved in Settings
  useEffect(() => {
    const handler = () => setCustomLogo(localStorage.getItem(LOGO_KEY) || '');
    window.addEventListener('medanalytica_logo_change', handler);
    return () => window.removeEventListener('medanalytica_logo_change', handler);
  }, []);

  const doLogout = useCallback(async () => {
    sessionStorage.removeItem('cris_demo_session');
    sessionStorage.removeItem(PATIENTS_KEY);
    await supabase.auth.signOut();
    setUser(null);
    setSessionPatients([]);
    setView('dashboard');
    setSessionWarn(false);
  }, []);

  // Reset inactivity timer on any user activity
  const resetTimer = useCallback(() => {
    if (!user) return;
    setSessionWarn(false);
    clearTimeout(timeoutRef.current);
    clearTimeout(warnRef.current);
    warnRef.current    = setTimeout(() => setSessionWarn(true), SESSION_TIMEOUT_MS - WARN_BEFORE_MS);
    timeoutRef.current = setTimeout(doLogout, SESSION_TIMEOUT_MS);
  }, [user, doLogout]);

  // Attach activity listeners when user is logged in
  useEffect(() => {
    if (!user) return;
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      clearTimeout(timeoutRef.current);
      clearTimeout(warnRef.current);
    };
  }, [user, resetTimer]);

  // Restore session on load — demo (sessionStorage) or real Supabase session
  useEffect(() => {
    // 1. Restore demo session first (no Supabase call needed)
    const stored = sessionStorage.getItem('cris_demo_session');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }

    // Helper: build user object from Supabase session + doctor_profiles row
    const buildUser = async (supaUser) => {
      try {
        const { data: profile } = await supabase
          .from('doctor_profiles')
          .select('full_name, role, initials, clinic_name')
          .eq('id', supaUser.id)
          .single();
        return {
          id:         supaUser.id,
          name:       profile?.full_name || supaUser.email,
          role:       profile?.role      || 'Physician',
          initials:   profile?.initials  || supaUser.email?.[0]?.toUpperCase() || 'DR',
          clinicName: profile?.clinic_name || '',
        };
      } catch {
        return { id: supaUser.id, name: supaUser.email, role: 'Physician', initials: 'DR', clinicName: '' };
      }
    };

    // 2. Check real Supabase session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const u = await buildUser(session.user);
        setUser(u);
      }
    });

    // 3. Keep in sync with Supabase auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        sessionStorage.removeItem('cris_demo_session');
        sessionStorage.removeItem(PATIENTS_KEY);
        setUser(null);
        setSessionPatients([]);
      } else if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') && session?.user) {
        setUser(prev => {
          if (prev?.id === 'demo') return prev; // don't overwrite demo session
          // Kick off async profile load — update once resolved
          buildUser(session.user).then(u => setUser(u));
          return prev; // interim: keep whatever we had
        });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (u) => setUser(u);

  const handleLogout = async () => {
    sessionStorage.removeItem('cris_demo_session');
    sessionStorage.removeItem(PATIENTS_KEY);
    await supabase.auth.signOut();
    setUser(null);
    setSessionPatients([]);
    setView('dashboard');
  };

  const handleSubmit = (form, files) => {
    setPending({ form, files: files || [] });
    setView('processing');
  };

  const handleDone = (data) => {
    setResult(data);   // data may include saveError
    // Add to session patient list so it shows on dashboard immediately
    setSessionPatients(prev => {
      const exists = prev.find(p => p.id === data.patient.id);
      if (exists) return prev.map(p => p.id === data.patient.id ? { ...data.patient, latestReport: data.report } : p);
      return [{ ...data.patient, latestReport: data.report, updated_at: new Date().toISOString() }, ...prev];
    });
    setView('patient-report');
  };

  const handleViewPatient = async (patient) => {
    // Session patient — has full report data already (just processed)
    if (patient.latestReport?.hrvMarkers || patient.latestReport?.therapeuticSelections) {
      setResult({ patient, report: patient.latestReport });
      setView('patient-report');
      return;
    }

    // Real DB patient — load the full report (raw_extraction) from Supabase
    if (user.id !== 'demo' && patient.reports?.length > 0) {
      try {
        const latestId = [...patient.reports]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]?.id;
        if (latestId) {
          const { data: dbReport } = await supabase
            .from('reports')
            .select('*')
            .eq('id', latestId)
            .single();
          if (dbReport) {
            // raw_extraction holds the full AI JSON; merge top-level DB fields for display
            const report = {
              ...(dbReport.raw_extraction || {}),
              report_type:     dbReport.report_type,
              collection_date: dbReport.collection_date,
              file_name:       dbReport.file_name,
              cri_score:       dbReport.cri_score,
              crisgoldQuadrant: dbReport.hrq_quadrant ?? dbReport.raw_extraction?.crisgoldQuadrant,
            };
            setResult({ patient, report });
            setView('patient-report');
            return;
          }
        }
      } catch (e) {
        console.error('Failed to load report from DB:', e);
      }
    }

    // Fallback (demo patients or no report found)
    setResult({ patient, report: patient.latestReport || null });
    setView('patient-report');
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const isActive = (id) =>
    view === id || (id === 'dashboard' && ['processing', 'patient-report'].includes(view));

  const renderPage = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard user={user} onNew={() => setView('new-patient')} onView={handleViewPatient} sessionPatients={sessionPatients} />;
      case 'new-patient':
        return <NewPatient onBack={() => setView('dashboard')} onSubmit={handleSubmit} />;
      case 'processing':
        return (
          <Processing
            user={user}
            form={pending?.form}
            files={pending?.files || []}
            onDone={handleDone}
            onError={(msg) => {
              alert(`Analysis failed: ${msg}`);
              setView('dashboard');
            }}
          />
        );
      case 'patient-report':
        return result
          ? <PatientReport patient={result.patient} report={result.report} saveError={result.saveError || null} onBack={() => setView('dashboard')} />
          : <div style={{ padding: '32px', color: 'var(--text3)' }}>No report loaded.</div>;
      case 'settings':
        return <Settings user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      {/* HIPAA: Session timeout warning banner */}
      {sessionWarn && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, background: '#b45309', color: '#fff', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', fontSize: '13px', boxShadow: '0 2px 8px rgba(0,0,0,.3)' }}>
          <span>⚠️ <strong>HIPAA Security:</strong> Your session will expire in 2 minutes due to inactivity. Any unsaved work will be lost.</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={resetTimer} style={{ padding: '5px 14px', borderRadius: '6px', border: 'none', background: '#fff', color: '#b45309', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>Stay Logged In</button>
            <button onClick={doLogout} style={{ padding: '5px 14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,.4)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '12px' }}>Sign Out Now</button>
          </div>
        </div>
      )}
      <aside className="sidebar">
        <div className="sb-hdr">
          <CrisLogo size={40} customUrl={customLogo || null} showSub />
        </div>
        <div className="nav-lbl">Navigation</div>
        {[
          { id: 'dashboard',   icon: '▦', label: 'Dashboard' },
          { id: 'new-patient', icon: '+', label: 'New Patient' },
          { id: 'settings',    icon: '⚙', label: 'Rules & Config' },
        ].map(n => (
          <button
            key={n.id}
            className={`nav-item${isActive(n.id) ? ' active' : ''}`}
            onClick={() => setView(n.id)}
          >
            <span className="n-ico">{n.icon}</span>{n.label}
          </button>
        ))}
        <div className="sb-bot">
          <div className="u-chip">
            <div className="u-av">{ini(user.name)}</div>
            <div style={{ flex: 1 }}>
              <div className="u-name">{user.name}</div>
              <div className="u-role">{user.role}</div>
            </div>
            <button onClick={handleLogout} title="Sign out"
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.3)', cursor: 'pointer', fontSize: '14px', padding: '4px' }}>
              ⏻
            </button>
          </div>
        </div>
      </aside>

      <div className="main-wrap">
        <Topbar page={view} />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
