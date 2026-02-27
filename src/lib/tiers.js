/**
 * CRIS GOLD™ — Subscription Tier Helpers
 */

export const TIER_RANK = {
  none: 0,
  starter: 1,
  professional: 2,
  clinic: 3,
};

export const TIER_LABELS = {
  none: 'Free',
  starter: 'Starter',
  professional: 'Professional',
  clinic: 'Clinic',
};

export const TIER_COLORS = {
  none: '#9ca3af',
  starter: '#1a73e8',
  professional: '#0e8a7a',
  clinic: '#7c3aed',
};

/**
 * Stored report limits per tier.
 * All tiers get full features — Starter is limited to 50 stored reports.
 */
export const TIER_LIMITS = {
  starter: { maxReports: 50 },
  professional: { maxReports: Infinity },
  clinic: { maxReports: Infinity },
};

/**
 * Check if a user's tier meets or exceeds the required tier.
 * @param {string} userTier - The user's current subscription tier
 * @param {string} requiredTier - The minimum tier required
 * @returns {boolean}
 */
export const hasTier = (userTier, requiredTier) =>
  (TIER_RANK[userTier] || 0) >= (TIER_RANK[requiredTier] || 0);

/**
 * Super admin emails — these users get full access + admin panel.
 */
export const SUPER_ADMIN_EMAILS = [
  'mike.castellon5@gmail.com',
];
