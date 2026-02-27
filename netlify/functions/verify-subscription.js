/**
 * CRIS GOLD™ — Verify PayPal Subscription & Create Supabase Account
 * POST /.netlify/functions/verify-subscription
 *
 * 1. Verifies the PayPal subscription is ACTIVE via PayPal REST API
 * 2. Creates a Supabase auth user (email + password)
 * 3. Inserts a doctor_profiles row with subscription info
 * 4. Returns a Supabase session so the frontend can auto-login
 */

import { createClient } from '@supabase/supabase-js';

const PAYPAL_BASE = 'https://api-m.paypal.com'; // live
// const PAYPAL_BASE = 'https://api-m.sandbox.paypal.com'; // sandbox — swap for testing

const TIER_PLAN_MAP = {
  Starter:      process.env.PAYPAL_STARTER_PLAN_ID,
  Professional: process.env.PAYPAL_PRO_PLAN_ID,
  Clinic:       process.env.PAYPAL_CLINIC_PLAN_ID,
};

// ── Get PayPal OAuth token ─────────────────────────────────────────────────
async function getPayPalToken() {
  const creds = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type':  'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) throw new Error('Failed to authenticate with PayPal');
  const { access_token } = await res.json();
  return access_token;
}

// ── Verify subscription status via PayPal API ─────────────────────────────
async function verifySubscription(subscriptionId, token) {
  const res = await fetch(`${PAYPAL_BASE}/v1/billing/subscriptions/${subscriptionId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type':  'application/json',
    },
  });
  if (!res.ok) throw new Error('Could not retrieve subscription from PayPal');
  return res.json();
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin':  'https://kesslercris.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST')    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  // ── Guard: required env vars ──────────────────────────────────────────
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    return { statusCode: 503, headers, body: JSON.stringify({ error: 'PayPal not configured' }) };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 503, headers, body: JSON.stringify({ error: 'Auth service not configured' }) };
  }

  try {
    const { subscriptionId, name, email, password, clinicName, tier } = JSON.parse(event.body || '{}');

    // ── Validate inputs ────────────────────────────────────────────────
    if (!subscriptionId || !name || !email || !password || !tier) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
    }
    if (password.length < 8) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Password must be at least 8 characters' }) };
    }
    if (!email.includes('@')) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email address' }) };
    }

    // ── 1. Verify subscription with PayPal ─────────────────────────────
    const token        = await getPayPalToken();
    const subscription = await verifySubscription(subscriptionId, token);

    if (subscription.status !== 'ACTIVE') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: `Subscription is not active (status: ${subscription.status})` }),
      };
    }

    // Optional: verify plan ID matches selected tier
    const expectedPlanId = TIER_PLAN_MAP[tier];
    if (expectedPlanId && subscription.plan_id !== expectedPlanId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Subscription plan mismatch' }) };
    }

    // ── 2. Create Supabase user (service role — bypasses email confirm) ─
    const supabaseAdmin = createClient(
      process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) {
      if (createError.message?.toLowerCase().includes('already')) {
        return { statusCode: 409, headers, body: JSON.stringify({ error: 'An account with this email already exists. Please log in.' }) };
      }
      throw new Error(createError.message);
    }

    const userId = newUser.user.id;

    // ── 3. Insert doctor_profiles row ──────────────────────────────────
    const initials = name
      .split(' ')
      .map(w => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const { error: profileError } = await supabaseAdmin.from('doctor_profiles').insert({
      id:                     userId,
      full_name:              name.trim(),
      clinic_name:            (clinicName || '').trim(),
      initials,
      billing_email:          email.trim().toLowerCase(),
      subscription_tier:      tier,
      subscription_status:    'active',
      paypal_subscription_id: subscriptionId,
      plan_start_date:        new Date().toISOString(),
    });

    if (profileError) {
      console.error('Profile insert failed:', profileError);
      // User was created — still return success, profile can be fixed later
    }

    // ── 3b. Create team for Clinic tier ──────────────────────────────
    if (tier === 'Clinic') {
      try {
        const teamName = ((clinicName || '').trim() || name.trim() + "'s Clinic");
        const { data: newTeam } = await supabaseAdmin.from('teams').insert({
          name: teamName,
          owner_id: userId,
          max_members: 5,
        }).select('id').single();

        if (newTeam) {
          await supabaseAdmin.from('team_members').insert({
            team_id: newTeam.id,
            user_id: userId,
            role: 'owner',
            invited_by: userId,
          });
          console.log('Team created for Clinic subscriber:', teamName);
        }
      } catch (teamErr) {
        console.error('Team creation failed (non-fatal):', teamErr);
      }
    }

    // ── 4. Sign in to get a session the frontend can use ───────────────
    const supabasePublic = createClient(
      process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );

    const { data: sessionData, error: signInError } = await supabasePublic.auth.signInWithPassword({ email, password });
    if (signInError) {
      // Account exists and subscription is active — just tell frontend to log in manually
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, session: null, message: 'Account created. Please log in.' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, session: sessionData.session }),
    };

  } catch (err) {
    console.error('verify-subscription error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal server error' }),
    };
  }
};
