import { useNavigate } from 'react-router-dom';
import CrisLogo from './CrisLogo';

const C = {
  navy: '#0f2744',
  sans: "'IBM Plex Sans', system-ui, sans-serif",
};

export default function PublicNav() {
  const nav = useNavigate();

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: C.navy,
      borderBottom: '1px solid rgba(255,255,255,.08)',
      boxShadow: '0 2px 16px rgba(10,22,40,.25)',
      fontFamily: C.sans,
    }}>
      <style>{`
        .pub-nav-link {
          font-size: 14px; font-weight: 500; color: rgba(255,255,255,.75);
          padding: 6px 4px; cursor: pointer; transition: color .18s;
          text-decoration: none;
        }
        .pub-nav-link:hover { color: #fff; }
        .pub-nav-links { display: flex; gap: 28px; flex: 1; justify-content: center; }
        .pub-nav-ghost {
          background: transparent; color: rgba(255,255,255,.85);
          padding: 10px 20px; border-radius: 7px; font-size: 14px; font-weight: 500;
          font-family: ${C.sans}; border: 1.5px solid rgba(255,255,255,.25); cursor: pointer;
          transition: all .18s;
        }
        .pub-nav-ghost:hover {
          background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.5); color: #fff;
        }
        .pub-nav-cta {
          background: linear-gradient(135deg, #c8982c, #e6b84f);
          color: #fff; padding: 10px 22px; border-radius: 7px; font-size: 14px; font-weight: 600;
          font-family: ${C.sans}; border: none; cursor: pointer;
          transition: all .18s; box-shadow: 0 2px 12px rgba(200,152,44,.3);
        }
        .pub-nav-cta:hover {
          background: linear-gradient(135deg, #b8891f, #d4a63e);
          transform: translateY(-1px); box-shadow: 0 4px 20px rgba(200,152,44,.45);
        }
        @media (max-width: 600px) {
          .pub-nav-links { display: none !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => nav('/')}>
          <CrisLogo size={46} showSub={false} />
        </div>
        <div className="pub-nav-links">
          {[
            ['/#features',     'Features'],
            ['/#how-it-works', 'How It Works'],
            ['/#security',     'Security'],
            ['/#pricing',      'Pricing'],
            ['/contact',       'Contact'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="pub-nav-link">{label}</a>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="pub-nav-ghost" onClick={() => nav('/dashboard')}>
            Log In
          </button>
          <button className="pub-nav-cta" onClick={() => nav('/get-started')}>
            Get Started →
          </button>
        </div>
      </div>
    </nav>
  );
}
