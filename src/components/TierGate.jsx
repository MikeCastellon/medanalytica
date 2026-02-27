/**
 * CRIS GOLD™ — TierGate Component
 * Wraps features that require a specific subscription tier.
 * Shows an upgrade prompt if the user's tier is insufficient.
 */

import { hasTier, TIER_LABELS, TIER_COLORS } from '../lib/tiers';

const C = {
  navy: '#0a1628',
  text2: '#4b5563',
  text3: '#9ca3af',
  border: 'rgba(0,0,0,.09)',
  bg2: '#f8fafc',
};
const serif = "'Libre Baskerville', Georgia, serif";

export default function TierGate({ user, requiredTier, children, featureName }) {
  if (hasTier(user?.tier, requiredTier)) {
    return children;
  }

  const tierLabel = TIER_LABELS[requiredTier] || requiredTier;
  const tierColor = TIER_COLORS[requiredTier] || '#1a73e8';

  return (
    <div style={{
      border: `1px solid ${C.border}`,
      borderRadius: '12px',
      padding: '32px',
      textAlign: 'center',
      background: C.bg2,
      maxWidth: '480px',
      margin: '40px auto',
    }}>
      <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔒</div>
      <h3 style={{
        fontFamily: serif,
        fontSize: '20px',
        fontWeight: 700,
        color: C.navy,
        marginBottom: '8px',
      }}>
        {featureName || 'This Feature'} Requires {tierLabel}
      </h3>
      <p style={{
        fontSize: '14px',
        color: C.text2,
        lineHeight: '1.6',
        marginBottom: '24px',
        maxWidth: '360px',
        margin: '0 auto 24px',
      }}>
        Upgrade to the <strong style={{ color: tierColor }}>{tierLabel}</strong> plan
        or higher to unlock {featureName ? featureName.toLowerCase() : 'this feature'}.
      </p>
      <a
        href="/#pricing"
        style={{
          display: 'inline-block',
          padding: '10px 28px',
          borderRadius: '8px',
          background: tierColor,
          color: '#fff',
          fontSize: '14px',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'opacity .15s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        View Plans →
      </a>
      <p style={{ fontSize: '11px', color: C.text3, marginTop: '16px' }}>
        Currently on: {TIER_LABELS[user?.tier] || 'Free'}
      </p>
    </div>
  );
}
