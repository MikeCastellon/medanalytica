import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CrisLogo from './CrisLogo';

const C = {
  navy:    '#0f2744',
  navy2:   '#1a3a5c',
  blue:    '#1a6fb5',
  blueLt:  '#e8f2fc',
  teal:    '#0e8a7a',
  tealLt:  '#e4f5f2',
  green:   '#0e7a55',
  text:    '#1a2535',
  text2:   '#4a5a72',
  text3:   '#8896aa',
  bg:      '#f4f6f9',
  bg3:     '#eef1f5',
  border:  '#dde2ea',
  white:   '#ffffff',
  footerBg:'#0a1628',
};

const serif = "'Libre Baskerville', Georgia, serif";
const sans  = "'IBM Plex Sans', system-ui, sans-serif";

export default function ContactPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', practice: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: sans, color: C.text, background: C.white, minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
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

        .contact-input {
          width: 100%; padding: 11px 14px; border-radius: 8px;
          border: 1.5px solid ${C.border}; font-size: 14px; font-family: ${sans};
          color: ${C.text}; background: ${C.white}; outline: none;
          transition: border-color .18s, box-shadow .18s;
        }
        .contact-input:focus {
          border-color: ${C.blue}; box-shadow: 0 0 0 3px ${C.blueLt};
        }
        .contact-input::placeholder { color: ${C.text3}; }

        .contact-label {
          display: block; font-size: 13px; font-weight: 600;
          color: ${C.text}; margin-bottom: 6px;
        }

        .info-card {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 20px; border-radius: 12px;
          background: ${C.bg}; border: 1px solid ${C.border};
        }

        .footer-link {
          display: block; font-size: 13.5px; color: rgba(255,255,255,.5);
          padding: 3px 0; transition: color .15s; cursor: pointer;
        }
        .footer-link:hover { color: rgba(255,255,255,.85); }

        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-hero-h1 { font-size: 32px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: C.navy,
        borderBottom: '1px solid rgba(255,255,255,.08)',
        boxShadow: '0 2px 16px rgba(10,22,40,.25)',
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => nav('/')}>
            <CrisLogo size={46} showSub={false} />
          </div>
          <div style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center' }}>
            {[['/#features', 'Features'], ['/#how-it-works', 'How It Works'], ['/#security', 'Security'], ['/#pricing', 'Pricing'], ['/contact', 'Contact']].map(([href, label]) => (
              <a key={href} href={href} className="lp-nav-link">{label}</a>
            ))}
          </div>
          <button
            style={{ background: 'transparent', color: 'rgba(255,255,255,.85)', padding: '10px 20px', borderRadius: 7, fontSize: 14, fontWeight: 500, fontFamily: sans, border: '1.5px solid rgba(255,255,255,.25)', cursor: 'pointer' }}
            onClick={() => nav('/dashboard')}
          >
            Log In →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: C.navy, padding: '64px 24px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(14,138,122,.15)', border: '1px solid rgba(14,138,122,.3)', borderRadius: 99, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.teal, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.teal, letterSpacing: '.04em' }}>We're Here to Help</span>
          </div>
          <h1 className="contact-hero-h1" style={{ fontFamily: serif, fontSize: 44, fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
            Contact Us
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.6)', lineHeight: 1.75 }}>
            Questions about CRIS GOLD™, your account, or getting started? Our team is ready to help.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ background: C.bg, padding: '72px 24px', borderTop: `1px solid ${C.border}` }}>
        <div className="contact-grid" style={{ maxWidth: 1060, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48, alignItems: 'start' }}>

          {/* ── LEFT: Contact Info ── */}
          <div>
            <h2 style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, color: C.navy, marginBottom: 8 }}>Get in Touch</h2>
            <p style={{ fontSize: 14.5, color: C.text2, lineHeight: 1.75, marginBottom: 32 }}>
              Reach out directly or fill in the form and we'll get back to you within one business day.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="info-card">
                <div style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>📞</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 3 }}>Phone</div>
                  <div style={{ fontSize: 14, color: C.text2 }}>(555) 800-2024</div>
                  <div style={{ fontSize: 12, color: C.text3, marginTop: 2 }}>Mon – Fri, 9am – 5pm EST</div>
                </div>
              </div>

              <div className="info-card">
                <div style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>✉️</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 3 }}>Email</div>
                  <div style={{ fontSize: 14, color: C.blue }}>support@medanalytica.com</div>
                  <div style={{ fontSize: 12, color: C.text3, marginTop: 2 }}>We reply within 1 business day</div>
                </div>
              </div>

              <div className="info-card">
                <div style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>🏢</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 3 }}>Office</div>
                  <div style={{ fontSize: 14, color: C.text2, lineHeight: 1.6 }}>
                    123 Medical Plaza, Suite 400<br />
                    Austin, TX 78701
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>💬</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 3 }}>Sales Inquiries</div>
                  <div style={{ fontSize: 14, color: C.blue }}>sales@medanalytica.com</div>
                  <div style={{ fontSize: 12, color: C.text3, marginTop: 2 }}>Clinic & Enterprise plans</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Contact Form ── */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: '36px 32px', boxShadow: '0 4px 24px rgba(15,39,68,.07)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ fontSize: 15, color: C.text2, lineHeight: 1.7, marginBottom: 28 }}>
                  Thanks for reaching out. We'll get back to you within one business day.
                </p>
                <button className="lp-btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', practice: '', subject: '', message: '' }); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Send Us a Message</h3>
                <p style={{ fontSize: 13.5, color: C.text3, marginBottom: 28 }}>All fields marked * are required.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label className="contact-label">Full Name *</label>
                      <input
                        className="contact-input"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Dr. Jane Smith"
                        required
                      />
                    </div>
                    <div>
                      <label className="contact-label">Email Address *</label>
                      <input
                        className="contact-input"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@clinic.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="contact-label">Practice / Clinic Name</label>
                    <input
                      className="contact-input"
                      name="practice"
                      value={form.practice}
                      onChange={handleChange}
                      placeholder="Integrative Health Clinic"
                    />
                  </div>

                  <div>
                    <label className="contact-label">Subject *</label>
                    <select
                      className="contact-input"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a topic…</option>
                      <option value="general">General Inquiry</option>
                      <option value="demo">Request a Demo</option>
                      <option value="pricing">Pricing & Plans</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing</option>
                      <option value="enterprise">Enterprise / Clinic Plan</option>
                    </select>
                  </div>

                  <div>
                    <label className="contact-label">Message *</label>
                    <textarea
                      className="contact-input"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help…"
                      rows={5}
                      required
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  {error && (
                    <p style={{ fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 7, padding: '10px 14px' }}>
                      {error}
                    </p>
                  )}
                  <button className="lp-btn-primary" type="submit" disabled={loading} style={{ alignSelf: 'flex-start', padding: '13px 32px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                    {loading ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.footerBg, padding: '40px 24px 28px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <CrisLogo size={38} showSub={false} />
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.25)' }}>
            © {new Date().getFullYear()} MedAnalytica. All rights reserved.
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>
            For licensed practitioners only · HIPAA compliant
          </span>
        </div>
      </footer>
    </div>
  );
}
