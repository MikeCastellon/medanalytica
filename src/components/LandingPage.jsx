import { useNavigate } from 'react-router-dom';
import CrisLogo from './CrisLogo';

/* ─── Inline style tokens matching index.css variables exactly ──────────── */
const C = {
  navy:    '#0f2744',
  navy2:   '#1a3a5c',
  blue:    '#1a6fb5',
  blueLt:  '#e8f2fc',
  teal:    '#0e8a7a',
  tealLt:  '#e4f5f2',
  green:   '#0e7a55',
  greenLt: '#e6f5ef',
  text:    '#1a2535',
  text2:   '#4a5a72',
  text3:   '#8896aa',
  bg:      '#f4f6f9',
  bg3:     '#eef1f5',
  border:  '#dde2ea',
  white:   '#ffffff',
  footerBg:'#0a1628',
};

const serif  = "'Libre Baskerville', Georgia, serif";
const sans   = "'IBM Plex Sans', system-ui, sans-serif";

export default function LandingPage() {
  const nav = useNavigate();
  const goToDashboard = () => nav('/dashboard');

  return (
    <div style={{ fontFamily: sans, color: C.text, background: C.white, overflowX: 'hidden' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }

        .lp-nav-link {
          font-size: 14px; font-weight: 500; color: rgba(255,255,255,.75);
          padding: 6px 4px; cursor: pointer; transition: color .18s;
        }
        .lp-nav-link:hover { color: #fff; }

        .lp-btn-primary {
          display: inline-flex; align-items: center; gap: 6px;
          background: ${C.blue}; color: #fff;
          padding: 13px 28px; border-radius: 7px; font-size: 15px; font-weight: 600;
          font-family: ${sans}; border: none; cursor: pointer;
          transition: background .18s, transform .15s, box-shadow .18s;
          box-shadow: 0 2px 12px rgba(26,111,181,.25);
        }
        .lp-btn-primary:hover {
          background: #1561a0; transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(26,111,181,.35);
        }

        .lp-btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          background: transparent; color: rgba(255,255,255,.85);
          padding: 10px 20px; border-radius: 7px; font-size: 14px; font-weight: 500;
          font-family: ${sans}; border: 1.5px solid rgba(255,255,255,.25); cursor: pointer;
          transition: all .18s;
        }
        .lp-btn-ghost:hover {
          background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.5); color: #fff;
        }

        .lp-btn-outline {
          display: inline-flex; align-items: center; gap: 6px;
          background: transparent; color: ${C.blue};
          padding: 10px 20px; border-radius: 7px; font-size: 14px; font-weight: 600;
          font-family: ${sans}; border: 1.5px solid ${C.blue}; cursor: pointer;
          transition: all .18s;
        }
        .lp-btn-outline:hover { background: ${C.blueLt}; }

        .feat-card {
          background: ${C.white}; border: 1px solid ${C.border};
          border-radius: 12px; padding: 24px 22px;
          transition: box-shadow .2s, transform .2s;
        }
        .feat-card:hover {
          box-shadow: 0 8px 32px rgba(15,39,68,.10); transform: translateY(-2px);
        }

        .step-circle {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(255,255,255,.12); border: 2px solid rgba(255,255,255,.3);
          display: flex; align-items: center; justify-content: center;
          font-family: ${serif}; font-size: 22px; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }

        .test-card {
          background: ${C.white}; border: 1px solid ${C.border};
          border-radius: 12px; padding: 24px;
        }

        .price-card {
          background: ${C.white}; border: 2px solid ${C.border};
          border-radius: 14px; padding: 32px 28px; text-align: center;
          transition: box-shadow .2s;
        }
        .price-card.featured {
          border-color: ${C.blue}; box-shadow: 0 0 0 4px ${C.blueLt};
        }
        .price-card:hover { box-shadow: 0 8px 32px rgba(15,39,68,.10); }

        .footer-link {
          display: block; font-size: 13.5px; color: rgba(255,255,255,.5);
          padding: 3px 0; transition: color .15s; cursor: pointer;
        }
        .footer-link:hover { color: rgba(255,255,255,.85); }

        @keyframes lp-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lp-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: .5; }
        }
        .lp-fade-up { animation: lp-fade-up .55s ease both; }
        .lp-delay-1 { animation-delay: .1s; }
        .lp-delay-2 { animation-delay: .22s; }
        .lp-delay-3 { animation-delay: .34s; }

        @media (max-width: 900px) {
          .lp-feat-grid { grid-template-columns: 1fr 1fr !important; }
          .lp-steps-grid { grid-template-columns: 1fr !important; }
          .lp-price-grid { grid-template-columns: 1fr 1fr !important; }
          .lp-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .lp-hero-h1 { font-size: 38px !important; }
          .lp-test-grid { grid-template-columns: 1fr !important; }
          .lp-security-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .lp-feat-grid { grid-template-columns: 1fr !important; }
          .lp-nav-links { display: none !important; }
          .lp-hero-h1 { font-size: 30px !important; }
          .lp-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .lp-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: C.navy,
        borderBottom: '1px solid rgba(255,255,255,.08)',
        boxShadow: '0 2px 16px rgba(10,22,40,.25)',
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 32 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <CrisLogo size={46} showSub={false} />
          </div>

          {/* Nav links */}
          <div className="lp-nav-links" style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center' }}>
            {[['#features', 'Features'], ['#how-it-works', 'How It Works'], ['#security', 'Security'], ['#pricing', 'Pricing'], ['/contact', 'Contact']].map(([href, label]) => (
              <a key={href} href={href} className="lp-nav-link">{label}</a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginLeft: 'auto' }}>
            <button className="lp-btn-ghost" onClick={goToDashboard}>
              Log In →
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{ background: C.white, padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Badge */}
          <div className="lp-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.tealLt, border: `1px solid ${C.teal}30`, borderRadius: 99, padding: '6px 16px', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.teal, animation: 'lp-pulse 2s infinite', flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.teal, letterSpacing: '.04em' }}>
              AI-Powered Clinical Reporting · HIPAA Compliant
            </span>
          </div>

          {/* Headline */}
          <h1 className="lp-fade-up lp-delay-1 lp-hero-h1" style={{ fontFamily: serif, fontSize: 52, fontWeight: 700, lineHeight: 1.15, color: C.navy, letterSpacing: '-.02em', marginBottom: 10 }}>
            CRIS GOLD™ Reports.
          </h1>
          <h1 className="lp-fade-up lp-delay-1 lp-hero-h1" style={{ fontFamily: serif, fontSize: 52, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.15, color: C.blue, letterSpacing: '-.02em', marginBottom: 28 }}>
            Generated in Minutes.
          </h1>

          {/* Sub */}
          <p className="lp-fade-up lp-delay-2" style={{ fontSize: 18, color: C.text2, lineHeight: 1.75, marginBottom: 36, maxWidth: 580, margin: '0 auto 36px' }}>
            Upload your patient's HRV data or lab results — CRIS GOLD™ AI generates a complete 9-section clinical report with quadrant analysis, Rubimed PSE insights, and personalized therapeutic selections.
          </p>

          {/* CTA */}
          <div className="lp-fade-up lp-delay-3" style={{ display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
            <button className="lp-btn-primary" style={{ fontSize: 16, padding: '15px 32px' }} onClick={goToDashboard}>
              Start Generating Reports →
            </button>
          </div>
          <p className="lp-fade-up lp-delay-3" style={{ fontSize: 12.5, color: C.text3, marginBottom: 16 }}>
            For licensed practitioners only · HIPAA compliant · No PHI stored in AI
          </p>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <section style={{ background: C.bg3, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '32px 24px' }}>
        <div className="lp-stats-grid" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 0 }}>
          {[
            { num: '28', label: 'Conflict Patterns Mapped' },
            { num: '9',  label: 'Report Sections Generated' },
            { num: 'HIPAA', label: 'Secure & Compliant' },
            { num: '<60s', label: 'Average Report Generation' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 16px', borderRight: i < 3 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontFamily: serif, fontSize: 36, fontWeight: 700, color: C.navy, lineHeight: 1.1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: C.text3, marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section id="features" style={{ background: C.bg, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: C.teal, marginBottom: 10 }}>Platform Features</div>
            <h2 style={{ fontFamily: serif, fontSize: 36, fontWeight: 700, color: C.navy, marginBottom: 14 }}>Everything a Practitioner Needs</h2>
            <p style={{ fontSize: 16, color: C.text2, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Built on the locked CRIS GOLD™ v1.0 protocol — every section generated with clinical precision and practitioner intent.
            </p>
          </div>
          <div className="lp-feat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {[
              { icon: '🫀', color: C.blueLt,  iconBg: C.blue,  title: 'HRV & Autonomic Analysis',       body: 'Full autonomic nervous system analysis: SDNN, RMSSD, LF/HF ratio, Polyvagal Rule of 3, adrenal axis interpretation, and cardiovascular risk scoring.' },
              { icon: '🔮', color: C.tealLt,  iconBg: C.teal,  title: 'Rubimed PSE',                     body: 'All 28 Emvita Conflicts mapped verbatim from the Practitioner Guide. Chavita chakra pairings, acute remedies, and standard dosage always included.' },
              { icon: '📊', color: C.blueLt,  iconBg: C.navy,  title: 'CRIS GOLD™ Quadrant',            body: 'Locked ELI × ARI quadrant logic generates Q1–Q4 placement. Cardiovascular risk index (CRI 0–12) and CV quadrant layered on top.' },
              { icon: '💊', color: C.greenLt, iconBg: C.green, title: 'Therapeutic Selections',          body: 'Drainage-first protocol across 6 categories: Cell Membrane, Mitochondrial, Neurocognitive, Oxidative Stress, and Cardiovascular Support. Fully editable by the practitioner.' },
              { icon: '🧠', color: '#f3e8ff', iconBg: '#7c3aed',title: 'Brain Gauge + NeuroVIZR',       body: 'Cortical performance metrics (Speed, Accuracy, Plasticity, Focus) paired with personalized NeuroVIZR Brain Gym Foundation and quadrant program recommendations.' },
              { icon: '🔒', color: C.bg3,     iconBg: C.text2, title: 'HIPAA Compliant',                body: 'PHI notice on every report, 15-minute inactivity auto-logout, Content Security Policy headers, rate limiting, input sanitization, and encrypted data transit.' },
            ].map((f, i) => (
              <div key={i} className="feat-card">
                <div style={{ width: 44, height: 44, borderRadius: 10, background: f.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16, flexShrink: 0 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: C.text2, lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: C.navy, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: C.teal, marginBottom: 10 }}>Simple Workflow</div>
            <h2 style={{ fontFamily: serif, fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 14 }}>From Data to Report in 3 Steps</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.6)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              No training required. Upload, analyze, and deliver a complete CRIS GOLD™ report in under a minute.
            </p>
          </div>

          <div className="lp-steps-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, position: 'relative' }}>
            {[
              { n: '1', title: 'Upload Patient Data',   body: 'Upload HRV screenshots from the HQP device, lab PDFs, or enter clinical data manually — including blood pressure, questionnaire score, Chavita/Emvita, and ARI.' },
              { n: '2', title: 'AI Analyzes',            body: 'GPT-4o reads your data against the locked CRIS GOLD™ v1.0 protocol — extracting markers, calculating quadrant placement, and applying PSE conflict matching.' },
              { n: '3', title: 'Full Report Ready',      body: 'A complete 9-section CRIS GOLD™ report: charts, quadrant maps, HRV analysis, Rubimed PSE, therapeutic selections, Brain Gauge, and a patient-friendly summary.' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                <div style={{ position: 'relative' }}>
                  <div className="step-circle">{s.n}</div>
                  {i < 2 && (
                    <div style={{
                      position: 'absolute', top: 26, left: '100%', width: 'calc(100% + 32px)',
                      borderTop: '2px dashed rgba(255,255,255,.15)',
                      pointerEvents: 'none',
                    }} className="lp-step-line" />
                  )}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: '#fff' }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.55)', lineHeight: 1.75 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section style={{ background: C.bg3, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: C.teal, marginBottom: 10 }}>Practitioners Say</div>
            <h2 style={{ fontFamily: serif, fontSize: 36, fontWeight: 700, color: C.navy }}>Trusted by Integrative Clinicians</h2>
          </div>
          <div className="lp-test-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {[
              { quote: "The Rubimed PSE section alone saves me 20 minutes per patient. Every conflict is mapped exactly as I'd write it myself — the guide verbiage is all there.", name: 'Dr. Rachel T.', title: 'Integrative Medicine, Denver CO' },
              { quote: 'Finally a platform that understands the CRIS GOLD protocol. The quadrant logic is locked correctly and the therapeutic drainage-first order is exactly right.', name: 'Dr. Marcus B.', title: 'Functional Medicine, Austin TX' },
              { quote: 'My patients love the patient-friendly summary. It bridges the gap between complex HRV data and what they actually need to understand about their health.', name: 'Dr. Sandra K.', title: 'Naturopathic Physician, Portland OR' },
            ].map((t, i) => (
              <div key={i} className="test-card">
                <div style={{ color: '#f59e0b', fontSize: 16, marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: 13.5, color: C.text2, lineHeight: 1.8, fontStyle: 'italic', marginBottom: 18 }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {t.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.text3 }}>{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY ───────────────────────────────────────────────────────── */}
      <section id="security" style={{ background: C.white, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div className="lp-security-grid" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: C.teal, marginBottom: 10 }}>Compliance & Security</div>
            <h2 style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: C.navy, marginBottom: 16, lineHeight: 1.3 }}>Built for PHI. Designed for Practitioners.</h2>
            <p style={{ fontSize: 14.5, color: C.text2, lineHeight: 1.8, marginBottom: 24 }}>
              Your patients' health information never leaves your control. Nothing is stored in the AI — clinical data is processed securely and returned directly to you.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Every report clearly marked as protected health information',
                'Session automatically closes after 15 minutes of inactivity',
                'Your account is protected against unauthorized access attempts',
                'Patient data is never used to train any AI model',
                'All information is encrypted during transmission',
                'No patient records stored in the AI layer — ever',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: C.text2 }}>
                  <span style={{ color: C.green, fontWeight: 700, fontSize: 15, flexShrink: 0, marginTop: 1 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: C.bg3, borderRadius: 14, padding: '28px 24px', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.09em', color: C.blue, marginBottom: 16 }}>🔒 Your Patients Are Protected</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '🕐', title: 'Auto Sign-Out',       body: 'Your session closes automatically if left idle, so no one else can access patient records on a shared or unattended device.' },
                { icon: '🚫', title: 'Zero AI Retention',   body: 'The AI reads your data to generate a report and immediately discards it. Nothing is saved, logged, or used for any other purpose.' },
                { icon: '🔐', title: 'Encrypted End-to-End', body: 'All data travels over a secure, encrypted connection — the same standard used by banks and healthcare systems.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.7 }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ background: C.bg, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: C.teal, marginBottom: 10 }}>Pricing</div>
            <h2 style={{ fontFamily: serif, fontSize: 36, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Simple, Transparent Pricing</h2>
            <p style={{ fontSize: 16, color: C.text2, maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>
              Plans designed for solo practitioners to enterprise clinics. Cancel anytime.
            </p>
          </div>
          <div className="lp-price-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 18 }}>
            {[
              {
                tier: 'Starter',
                subtitle: 'Basic ERM + Limited AI Reports',
                price: '$97',
                period: '/ month',
                featured: false,
                cta: 'Get Started',
                features: [
                  'Basic ERM access',
                  'Limited AI report generation',
                  'HRV & autonomic analysis',
                  'HIPAA compliant',
                  'Email support',
                ],
              },
              {
                tier: 'Professional',
                subtitle: 'Full ERM + HQP + AI Report Generator',
                price: '$197',
                period: '/ month',
                featured: true,
                cta: 'Get Started',
                features: [
                  'Full ERM access',
                  'Unlimited AI reports',
                  'HQP device integration',
                  'Rubimed PSE full mapping',
                  'Brain Gauge + NeuroVIZR',
                  'Priority support',
                ],
              },
              {
                tier: 'Clinic',
                subtitle: 'Multi-Practitioner + White Label',
                price: '$497',
                period: '/ month',
                featured: false,
                cta: 'Get Started',
                features: [
                  'Up to 5 practitioners',
                  'White label reports',
                  'All Professional features',
                  'Team dashboard',
                  'Dedicated onboarding',
                  'Phone support',
                ],
              },
              {
                tier: 'Enterprise',
                subtitle: 'Custom AI Build + API + Dedicated Support',
                price: 'Custom',
                period: 'contract',
                featured: false,
                cta: 'Contact Us',
                features: [
                  'Unlimited practitioners',
                  'Custom AI build',
                  'Full API access',
                  'EHR integrations',
                  'SLA & compliance docs',
                  'Dedicated support manager',
                ],
              },
            ].map((p, i) => (
              <div key={i} className={`price-card${p.featured ? ' featured' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
                {p.featured && (
                  <div style={{ display: 'inline-block', background: C.blue, color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 99, letterSpacing: '.05em', marginBottom: 14 }}>
                    MOST POPULAR
                  </div>
                )}
                <h3 style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 6 }}>{p.tier}</h3>
                <p style={{ fontSize: 12, color: C.text3, marginBottom: 20, minHeight: 32, lineHeight: 1.5 }}>{p.subtitle}</p>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontFamily: serif, fontSize: 36, fontWeight: 700, color: C.navy }}>{p.price}</span>
                  <span style={{ fontSize: 13, color: C.text3, marginLeft: 4 }}>{p.period}</span>
                </div>
                <div style={{ height: 1, background: C.border, margin: '20px 0' }} />
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, flex: 1 }}>
                  {p.features.map((f, fi) => (
                    <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: C.text2 }}>
                      <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={p.featured ? 'lp-btn-primary' : 'lp-btn-outline'}
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={p.cta === 'Contact Us' ? () => nav('/contact') : goToDashboard}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────────────────────── */}
      <section style={{ background: C.navy, padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: serif, fontSize: 38, fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.25 }}>
            Ready to Transform<br />Your Practice?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.6)', marginBottom: 36, lineHeight: 1.7 }}>
            Join practitioners using CRIS GOLD™ AI to deliver faster, deeper clinical insights to their patients.
          </p>
          <button className="lp-btn-primary" style={{ fontSize: 16, padding: '15px 36px' }} onClick={goToDashboard}>
            Start Generating Reports →
          </button>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', marginTop: 18 }}>
            For licensed practitioners only · HIPAA compliant
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: C.footerBg, padding: '56px 24px 32px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="lp-footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>

            {/* Brand col */}
            <div>
              <div style={{ marginBottom: 16 }}>
                <CrisLogo size={42} showSub={true} />
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.8, maxWidth: 240 }}>
                AI-powered CRIS GOLD™ clinical reporting for licensed integrative and functional medicine practitioners.
              </p>
            </div>

            {/* Platform */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.3)', marginBottom: 14 }}>Platform</div>
              {['Dashboard', 'New Report', 'Settings', 'Log In'].map(l => (
                <span key={l} className="footer-link" onClick={goToDashboard}>{l}</span>
              ))}
            </div>

            {/* Compliance */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.3)', marginBottom: 14 }}>Compliance</div>
              {[
                { label: 'HIPAA Aligned',  href: '#security' },
                { label: 'PHI Protection', href: '#security' },
                { label: 'Data Security',  href: '#security' },
                { label: 'Privacy Policy', href: '#security' },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="footer-link">{label}</a>
              ))}
            </div>

            {/* About */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.3)', marginBottom: 14 }}>About</div>
              {[
                { label: 'About CRIS GOLD™', href: '#features'    },
                { label: 'Rubimed PSE',       href: '#features'    },
                { label: 'HRV Protocol',      href: '#how-it-works'},
                { label: 'Contact',           href: '/contact'     },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="footer-link">{label}</a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.25)' }}>
              © {new Date().getFullYear()} MedAnalytica. All rights reserved.
            </span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)', textAlign: 'right' }}>
              CRIS GOLD™ is intended for use by licensed practitioners only. Not for patient self-diagnosis.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
