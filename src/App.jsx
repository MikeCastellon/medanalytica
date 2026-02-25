import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NewPatient from './components/NewPatient';
import Processing from './components/Processing';
import PatientReport from './components/PatientReport';
import Settings from './components/Settings';
import Topbar from './components/Topbar';
import { ini } from './lib/utils';
import './App.css';

export default function App() {
  const [user, setUser]   = useState(null);
  const [view, setView]   = useState('dashboard');
  const [pending, setPending] = useState(null); // { form, file }
  const [result, setResult]   = useState(null); // { patient, report }

  // Restore Supabase session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, name: session.user.email, role: 'Physician', initials: 'DR' });
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') setUser(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (u) => setUser(u);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setView('dashboard');
  };

  const handleSubmit = (form, file) => {
    setPending({ form, file });
    setView('processing');
  };

  const handleDone = (data) => {
    setResult(data);
    setView('patient-report');
  };

  const handleViewPatient = (patient) => {
    // For existing patients load their latest report
    setResult({ patient, report: patient.latestReport || null });
    setView('patient-report');
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const isActive = (id) =>
    view === id || (id === 'dashboard' && ['processing', 'patient-report'].includes(view));

  const renderPage = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard user={user} onNew={() => setView('new-patient')} onView={handleViewPatient} />;
      case 'new-patient':
        return <NewPatient onBack={() => setView('dashboard')} onSubmit={handleSubmit} />;
      case 'processing':
        return (
          <Processing
            user={user}
            form={pending?.form}
            file={pending?.file}
            onDone={handleDone}
            onError={() => setView('dashboard')}
          />
        );
      case 'patient-report':
        return result
          ? <PatientReport patient={result.patient} report={result.report} onBack={() => setView('dashboard')} />
          : <div style={{ padding: '32px', color: 'var(--text3)' }}>No report loaded.</div>;
      case 'settings':
        return <Settings user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sb-hdr">
          <div className="sb-brand">
            <div className="sb-icon">⚕</div>
            <span className="sb-name">MedAnalytica</span>
          </div>
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
