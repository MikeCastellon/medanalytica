import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CrisLogo from './CrisLogo';
import PublicNav from './PublicNav';
import CheckoutModal from './CheckoutModal';

const C = {
  navy:    '#0f2744',
  blue:    '#1a6fb5',
  blueLt:  '#e8f2fc',
  teal:    '#0e8a7a',
  tealLt:  '#e4f5f2',
  gold:    '#c8982c',
  goldLt:  '#fdf6e3',
  text:    '#1a2535',
  text2:   '#4a5a72',
  text3:   '#8896aa',
  bg:      '#f4f6f9',
  border:  '#dde2ea',
  white:   '#ffffff',
  footerBg:'#0a1628',
};
const serif = "'Libre Baskerville', Georgia, serif";
const sans  = "'IBM Plex Sans', system-ui, sans-serif";

const PLANS = [
  {
    tier: 'Starter',
    subtitle: 'Full AI Reporting · 50 Stored Reports',
    price: '$97',
    period: '/ month',
    featured: false,
    features: [
      'Full AI clinical reporting',
      'HQP + Brain Gauge + NeuroVIZR analysis',
      'Rubimed PSE mapping',
      'Up to 50 stored reports',
      'HIPAA compliant',
      'Email support',
    ],
  },
  {
    tier: 'Professional',
    subtitle: 'Unlimited Reports + Patient Profiles',
    price: '$197',
    period: '/ month',
    featured: true,
    features: [
      'Everything in Starter',
      'Unlimited stored reports',
      'Patient profiles & history tracking',
      'AI report comparison over time',
      'Improvement tracking & summaries',
      'Priority support',
    ],
  },
  {
    tier: 'Clinic',
    subtitle: 'Multi-Practitioner + Team Dashboard',
    price: '$497',
    period: '/ month',
    featured: false,
    features: [
      'Everything in Professional',
      'Up to 5 practitioners',
      'Team dashboard & shared patients',
      'White label reports with your branding',
      'Dedicated onboarding',
      'Phone support',
    ],
  },
];

export default function PlansPage() {
  const nav = useNavigate();
  const [checkoutPlan, setCheckoutPlan] = useState(null);

  return (
    <div style={{ fontFamily: sans, color: C.text, background: C.white, minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .plans-btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          background: ${C.blue}; color: #fff;
          padding: 13px 28px; border-radius: 7px; font-size: 15px; font-weight: 600;
          font-family: ${sans}; border: none; cursor: pointer; width: 100%;
          transition: background .18s, transform .15s, box-shadow .18s;
          box-shadow: 0 2px 12px rgba(26,111,181,.25);
        }
        .plans-btn-primary:hover {
          background: #1561a0; transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(26,111,181,.35);
        }
        .plans-btn-gold {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          background: linear-gradient(135deg, #c8982c, #e6b84f); color: #fff;
          padding: 14px 28px; border-radius: 7px; font-size: 15px; font-weight: 700;
          font-family: ${sans}; border: none; cursor: pointer; width: 100%;
          transition: all .18s;
          box-shadow: 0 2px 16px rgba(200,152,44,.35);
        }
        .plans-btn-gold:hover {
          background: linear-gradient(135deg, #b8891f, #d4a63e);
          transform: translateY(-1px); box-shadow: 0 4px 24px rgba(200,152,44,.5);
        }
        .plans-btn-outline {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          background: transparent; color: ${C.blue};
          padding: 13px 28px; border-radius: 7px; font-size: 15px; font-weight: 600;
          font-family: ${sans}; border: 1.5px solid ${C.border}; cursor: pointer; width: 100%;
          transition: all .18s;
        }
        .plans-btn-outline:hover {
          border-color: ${C.blue}; background: ${C.blueLt};
        }

        .plans-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          max-width: 1060px; margin: 0 auto;
        }

        .plan-card {
          background: ${C.white}; border: 1.5px solid ${C.border}; border-radius: 16px;
          padding: 32px 28px; display: flex; flex-direction: column;
          transition: transform .2s, box-shadow .2s;
        }
        .plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(15,39,68,.1);
        }
        .plan-featured {
          border-color: ${C.gold}; position: relative;
          box-shadow: 0 8px 32px rgba(200,152,44,.15);
        }

        .faq-item {
          padding: 20px 0; border-bottom: 1px solid ${C.border};
        }

        .footer-link {
          display: block; font-size: 13.5px; color: rgba(255,255,255,.5);
          padding: 3px 0; transition: color .15s; cursor: pointer;
        }
        .footer-link:hover { color: rgba(255,255,255,.85); }

        @media (max-width: 768px) {
          .plans-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto !important; }
          .plans-hero-h1 { font-size: 28px !important; }
          .contact-row { grid-template-columns: 1fr !important; max-width: 420px !important; margin: 0 auto !important; }
          .plans-enterprise { flex-direction: column !important; text-align: center; }
        }
        @media (max-width: 400px) {
          .plans-hero-h1 { font-size: 24px !important; }
        }
      `}</style>

      <PublicNav />

      {/* ── HERO ── */}
      <section style={{ background: C.navy, padding: '64px 24px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,152,44,.15)', border: '1px solid rgba(200,152,44,.3)', borderRadius: 99, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.gold, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.gold, letterSpacing: '.04em' }}>Choose Your Plan</span>
          </div>
          <h1 className="plans-hero-h1" style={{ fontFamily: serif, fontSize: 44, fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
            Start Generating AI Clinical Reports Today
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.6)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
            All plans include full AI-powered clinical reporting. Choose the level that fits your practice.
          </p>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section style={{ background: C.bg, padding: '72px 24px 60px', borderTop: `1px solid ${C.border}` }}>
        <div className="plans-grid">
          {PLANS.map(plan => (
            <div key={plan.tier} className={`plan-card ${plan.featured ? 'plan-featured' : ''}`}>
              {plan.featured && (
                <div style={{
                  position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                  background: `linear-gradient(135deg, ${C.gold}, #e6b84f)`, color: '#fff',
                  padding: '5px 18px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '.08em',
                  boxShadow: '0 2px 8px rgba(200,152,44,.3)',
                }}>
                  Most Popular
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 4 }}>
                  {plan.tier}
                </h3>
                <p style={{ fontSize: 13, color: C.text3, lineHeight: 1.5 }}>{plan.subtitle}</p>
              </div>

              <div style={{ marginBottom: 24 }}>
                <span style={{ fontFamily: serif, fontSize: 42, fontWeight: 700, color: C.navy }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: C.text3, marginLeft: 4 }}>{plan.period}</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28, flex: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '7px 0', fontSize: 13.5, color: C.text2, lineHeight: 1.5 }}>
                    <span style={{ color: C.teal, fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={plan.featured ? 'plans-btn-gold' : 'plans-btn-outline'}
                onClick={() => setCheckoutPlan(plan)}
              >
                Get Started →
              </button>
            </div>
          ))}
        </div>

        {/* Enterprise callout */}
        <div className="plans-enterprise" style={{
          maxWidth: 1060, margin: '40px auto 0', background: C.white,
          border: `1.5px solid ${C.border}`, borderRadius: 14,
          padding: '28px 36px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <h4 style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 4 }}>
              Enterprise / Custom AI Build
            </h4>
            <p style={{ fontSize: 13.5, color: C.text2 }}>
              Unlimited practitioners, custom AI models, full API access, and EHR integrations.
            </p>
          </div>
          <button className="plans-btn-primary" style={{ width: 'auto', padding: '12px 28px' }} onClick={() => nav('/contact')}>
            Contact Sales →
          </button>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: C.white, padding: '72px 24px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 700, color: C.navy, marginBottom: 8 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 14.5, color: C.text2 }}>Everything you need to know about getting started.</p>
          </div>

          {[
            { q: 'Can I change my plan later?', a: 'Yes! You can upgrade or downgrade your plan anytime. Changes take effect at the start of your next billing cycle.' },
            { q: 'Is there a free trial?', a: 'We offer a demo mode so you can explore the platform before subscribing. Contact us for a personalized walkthrough.' },
            { q: 'What payment methods do you accept?', a: 'We accept PayPal, all major credit cards (via PayPal), and bank transfers for Enterprise plans.' },
            { q: 'Is my patient data secure?', a: 'Absolutely. CRIS GOLD™ is HIPAA compliant with end-to-end encryption, SOC 2 certified infrastructure, and zero data sharing.' },
            { q: 'Can I cancel anytime?', a: 'Yes. There are no long-term contracts. Cancel anytime from your account settings and you won\'t be billed again.' },
            { q: 'What devices does CRIS GOLD™ support?', a: 'Our AI analysis supports HQP (Heart Quest Pro), Brain Gauge, NeuroVIZR, and standard lab reports. More integrations coming soon.' },
          ].map((faq, i) => (
            <div key={i} className="faq-item">
              <div style={{ fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 6 }}>{faq.q}</div>
              <div style={{ fontSize: 13.5, color: C.text2, lineHeight: 1.7 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT / QUESTIONS ── */}
      <section style={{ background: C.bg, padding: '64px 24px', borderTop: `1px solid ${C.border}` }}>
        <div className="contact-row" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>📞</div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Call Us</h4>
            <p style={{ fontSize: 13.5, color: C.text2, marginBottom: 4 }}>+1 (415) 646-6112</p>
            <p style={{ fontSize: 12, color: C.text3 }}>Mon – Fri, 9am – 5pm EST</p>
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>✉️</div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Email</h4>
            <p style={{ fontSize: 13.5, color: C.blue, marginBottom: 4 }}>support@kesslercris.com</p>
            <p style={{ fontSize: 12, color: C.text3 }}>We reply within 1 business day</p>
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>💬</div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Sales</h4>
            <p style={{ fontSize: 13.5, color: C.blue, marginBottom: 4 }}>sales@kesslercris.com</p>
            <p style={{ fontSize: 12, color: C.text3 }}>Clinic & Enterprise inquiries</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <button className="plans-btn-primary" style={{ width: 'auto', padding: '13px 32px' }} onClick={() => nav('/contact')}>
            Send Us a Message →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.footerBg, padding: '40px 24px 28px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <CrisLogo size={38} showSub={false} />
          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.25)' }}>
            © {new Date().getFullYear()} CRIS GOLD™. All rights reserved.
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>
            For licensed practitioners only · HIPAA compliant
          </span>
        </div>
      </footer>

      {/* ── Checkout Modal ── */}
      {checkoutPlan && (
        <CheckoutModal plan={checkoutPlan} onClose={() => setCheckoutPlan(null)} />
      )}
    </div>
  );
}
