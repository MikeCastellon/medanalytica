import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PLAN_IDS = {
  Starter:      import.meta.env.VITE_PAYPAL_STARTER_PLAN_ID,
  Professional: import.meta.env.VITE_PAYPAL_PRO_PLAN_ID,
  Clinic:       import.meta.env.VITE_PAYPAL_CLINIC_PLAN_ID,
};

const C = {
  navy:   '#0a1628',
  blue:   '#1a73e8',
  teal:   '#0e8a7a',
  green:  '#22c55e',
  text2:  '#4b5563',
  text3:  '#9ca3af',
  border: 'rgba(0,0,0,.09)',
  bg:     '#fff',
  bg2:    '#f8fafc',
};
const serif = "'Libre Baskerville', Georgia, serif";

export default function CheckoutModal({ plan, onClose }) {
  const nav = useNavigate();
  const [step, setStep]         = useState('form'); // 'form' | 'paypal' | 'processing' | 'success' | 'error'
  const [form, setForm]         = useState({ name: '', email: '', password: '', clinic: '' });
  const [errors, setErrors]     = useState({});
  const [errMsg, setErrMsg]     = useState('');
  const [sdkReady, setSdkReady] = useState(false);
  const paypalContainerRef      = useRef(null);
  const paypalRendered          = useRef(false);

  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // ── Load PayPal SDK when step = 'paypal' ───────────────────────────────
  useEffect(() => {
    if (step !== 'paypal') return;
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    if (!clientId) {
      setErrMsg('PayPal is not configured yet. Please contact support.');
      setStep('error');
      return;
    }
    if (document.getElementById('paypal-sdk')) {
      setSdkReady(true);
      return;
    }
    const script = document.createElement('script');
    script.id  = 'paypal-sdk';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`;
    script.onload = () => setSdkReady(true);
    script.onerror = () => {
      setErrMsg('Failed to load PayPal. Please check your connection and try again.');
      setStep('error');
    };
    document.head.appendChild(script);
  }, [step]);

  // ── Render PayPal Buttons once SDK is ready ───────────────────────────
  useEffect(() => {
    if (!sdkReady || !paypalContainerRef.current || paypalRendered.current) return;
    if (step !== 'paypal') return;
    const planId = PLAN_IDS[plan.tier];
    if (!planId) {
      setErrMsg(`No PayPal plan configured for ${plan.tier}. Please contact support.`);
      setStep('error');
      return;
    }
    paypalRendered.current = true;
    window.paypal.Buttons({
      style: {
        shape:  'rect',
        color:  'blue',
        layout: 'vertical',
        label:  'subscribe',
      },
      createSubscription: (data, actions) => {
        return actions.subscription.create({ plan_id: planId });
      },
      onApprove: async (data) => {
        setStep('processing');
        try {
          const apiBase = import.meta.env.DEV ? 'http://localhost:8888' : '';
          const res = await fetch(`${apiBase}/.netlify/functions/verify-subscription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              subscriptionId: data.subscriptionID,
              name:           form.name.trim(),
              email:          form.email.trim().toLowerCase(),
              password:       form.password,
              clinicName:     form.clinic.trim(),
              tier:           plan.tier,
            }),
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || 'Account creation failed');
          // Store session token so App.jsx can restore it
          if (json.session?.access_token) {
            sessionStorage.setItem('cris_paypal_session', JSON.stringify(json.session));
          }
          setStep('success');
          setTimeout(() => nav('/dashboard'), 2000);
        } catch (err) {
          setErrMsg(err.message);
          setStep('error');
        }
      },
      onError: (err) => {
        console.error('PayPal error:', err);
        setErrMsg('PayPal encountered an error. Please try again.');
        setStep('error');
        paypalRendered.current = false;
      },
      onCancel: () => {
        paypalRendered.current = false;
        setStep('paypal');
      },
    }).render(paypalContainerRef.current);
  }, [sdkReady, step]);

  // ── Form validation ───────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim())                          e.name     = 'Required';
    if (!form.email.includes('@'))                  e.email    = 'Valid email required';
    if (form.password.length < 8)                  e.password = 'Min 8 characters';
    if (!form.clinic.trim())                        e.clinic   = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      paypalRendered.current = false;
      setStep('paypal');
    }
  };

  // ── Overlay click to close (only on 'form' step) ──────────────────────
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && step === 'form') onClose();
  };

  // ── Styles ────────────────────────────────────────────────────────────
  const overlay = {
    position: 'fixed', inset: 0, background: 'rgba(10,22,40,.65)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '16px',
  };
  const modal = {
    background: C.bg, borderRadius: '16px', width: '100%', maxWidth: '480px',
    boxShadow: '0 24px 80px rgba(0,0,0,.25)', overflow: 'hidden',
    maxHeight: '95vh', overflowY: 'auto',
  };
  const header = {
    background: C.navy, padding: '24px 28px 20px',
  };
  const body = { padding: '28px' };
  const fieldStyle = {
    display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '16px',
  };
  const labelStyle = { fontSize: '12px', fontWeight: '600', color: C.text2, textTransform: 'uppercase', letterSpacing: '.05em' };
  const inputStyle = (err) => ({
    border: `1px solid ${err ? '#ef4444' : C.border}`, borderRadius: '8px',
    padding: '10px 14px', fontSize: '14px', color: C.navy, outline: 'none',
    width: '100%', boxSizing: 'border-box',
    background: err ? '#fef2f2' : C.bg2,
  });
  const errStyle = { fontSize: '11px', color: '#ef4444', marginTop: '2px' };

  return (
    <div style={overlay} onClick={handleOverlayClick}>
      <div style={modal}>

        {/* ── Header ── */}
        <div style={header}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.5)', marginBottom: '6px' }}>
                CRIS GOLD™ Subscription
              </div>
              <div style={{ fontFamily: serif, fontSize: '22px', fontWeight: '700', color: '#fff' }}>
                {plan.tier} Plan
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.55)', marginTop: '4px' }}>
                {plan.price}{plan.period !== 'contract' ? ` ${plan.period}` : ''} · {plan.subtitle}
              </div>
            </div>
            {step === 'form' && (
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.45)', fontSize: '22px', cursor: 'pointer', lineHeight: 1, padding: '0 0 0 12px' }}>×</button>
            )}
          </div>
        </div>

        <div style={body}>

          {/* ── Step 1: Registration Form ── */}
          {step === 'form' && (
            <>
              <div style={{ fontSize: '13px', color: C.text2, marginBottom: '22px', lineHeight: '1.6' }}>
                Create your account, then complete checkout via PayPal.
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle(errors.name)} placeholder="Dr. Jane Smith" value={form.name}
                  onChange={e => s('name', e.target.value)} />
                {errors.name && <span style={errStyle}>{errors.name}</span>}
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Email Address</label>
                <input style={inputStyle(errors.email)} type="email" placeholder="jane@clinic.com" value={form.email}
                  onChange={e => s('email', e.target.value)} />
                {errors.email && <span style={errStyle}>{errors.email}</span>}
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Password</label>
                <input style={inputStyle(errors.password)} type="password" placeholder="Min 8 characters" value={form.password}
                  onChange={e => s('password', e.target.value)} />
                {errors.password && <span style={errStyle}>{errors.password}</span>}
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Practice / Clinic Name</label>
                <input style={inputStyle(errors.clinic)} placeholder="Integrative Wellness Clinic" value={form.clinic}
                  onChange={e => s('clinic', e.target.value)} />
                {errors.clinic && <span style={errStyle}>{errors.clinic}</span>}
              </div>
              <button
                onClick={handleContinue}
                style={{
                  width: '100%', padding: '13px', borderRadius: '8px', border: 'none',
                  background: C.blue, color: '#fff', fontSize: '15px', fontWeight: '700',
                  cursor: 'pointer', marginTop: '4px',
                }}
              >
                Continue to Payment →
              </button>
              <p style={{ fontSize: '11px', color: C.text3, textAlign: 'center', marginTop: '14px', lineHeight: '1.6' }}>
                Secure checkout via PayPal · Cancel anytime · HIPAA compliant
              </p>
            </>
          )}

          {/* ── Step 2: PayPal Buttons ── */}
          {step === 'paypal' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', color: C.text2, marginBottom: '4px' }}>Subscribing as:</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: C.navy }}>{form.name}</div>
                <div style={{ fontSize: '13px', color: C.text3 }}>{form.email}</div>
              </div>
              <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '18px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: C.text2 }}>CRIS GOLD™ {plan.tier}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: C.navy }}>{plan.price}/mo</span>
                </div>
                <div style={{ fontSize: '11px', color: C.text3 }}>Recurring monthly · Cancel anytime</div>
              </div>
              {!sdkReady && (
                <div style={{ textAlign: 'center', padding: '24px', color: C.text3, fontSize: '13px' }}>
                  <div style={{ marginBottom: '8px' }}>Loading PayPal…</div>
                  <div style={{ width: '28px', height: '28px', border: '3px solid #e5e7eb', borderTopColor: C.blue, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
                </div>
              )}
              <div ref={paypalContainerRef} style={{ minHeight: sdkReady ? '50px' : '0' }} />
              <button onClick={() => { paypalRendered.current = false; setStep('form'); }}
                style={{ background: 'none', border: 'none', color: C.text3, fontSize: '12px', cursor: 'pointer', marginTop: '12px', width: '100%', textAlign: 'center' }}>
                ← Back
              </button>
            </>
          )}

          {/* ── Step 3: Processing ── */}
          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ width: '40px', height: '40px', border: '4px solid #e5e7eb', borderTopColor: C.blue, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
              <div style={{ fontFamily: serif, fontSize: '18px', fontWeight: '700', color: C.navy, marginBottom: '8px' }}>Setting up your account…</div>
              <div style={{ fontSize: '13px', color: C.text3 }}>Please wait, this only takes a moment.</div>
            </div>
          )}

          {/* ── Step 4: Success ── */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <div style={{ fontFamily: serif, fontSize: '20px', fontWeight: '700', color: C.navy, marginBottom: '8px' }}>
                Welcome to CRIS GOLD™!
              </div>
              <div style={{ fontSize: '14px', color: C.text2, lineHeight: '1.6' }}>
                Your {plan.tier} subscription is active.<br />Redirecting to your dashboard…
              </div>
            </div>
          )}

          {/* ── Error State ── */}
          {step === 'error' && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: '40px', marginBottom: '14px' }}>⚠️</div>
              <div style={{ fontFamily: serif, fontSize: '17px', fontWeight: '700', color: C.navy, marginBottom: '10px' }}>
                Something went wrong
              </div>
              <div style={{ fontSize: '13px', color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', lineHeight: '1.6' }}>
                {errMsg}
              </div>
              <button onClick={() => { paypalRendered.current = false; setStep('form'); setErrMsg(''); }}
                style={{ padding: '10px 24px', borderRadius: '8px', border: `1px solid ${C.border}`, background: C.bg2, color: C.navy, fontSize: '14px', cursor: 'pointer' }}>
                Try Again
              </button>
            </div>
          )}

        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
