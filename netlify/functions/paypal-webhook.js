/**
 * CRIS GOLD™ — PayPal Subscription Webhook Handler
 * POST /.netlify/functions/paypal-webhook
 *
 * Handles lifecycle events from PayPal:
 * - BILLING.SUBSCRIPTION.ACTIVATED  → set status = 'active'
 * - BILLING.SUBSCRIPTION.CANCELLED  → set status = 'cancelled'
 * - BILLING.SUBSCRIPTION.SUSPENDED  → set status = 'suspended'
 * - PAYMENT.SALE.COMPLETED          → log payment (future: update next billing date)
 *
 * Configure this URL in PayPal Developer → Webhooks:
 *   https://kesslercris.com/.netlify/functions/paypal-webhook
 */

import { createClient } from '@supabase/supabase-js';

const PAYPAL_BASE = 'https://api-m.paypal.com'; // live
// const PAYPAL_BASE = 'https://api-m.sandbox.paypal.com'; // sandbox

// ── Verify PayPal webhook signature ─────────────────────────────────────────
async function verifyWebhookSignature(event, webhookId) {
  try {
    const creds = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');
    const tokenRes = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials',
    });
    const { access_token } = await tokenRes.json();

    const verifyRes = await fetch(`${PAYPAL_BASE}/v1/notifications/verify-webhook-signature`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_algo:         event.headers['paypal-auth-algo'],
        cert_url:          event.headers['paypal-cert-url'],
        client_metadata_id: event.headers['paypal-client-metadata-id'] || '',
        transmission_id:   event.headers['paypal-transmission-id'],
        transmission_sig:  event.headers['paypal-transmission-sig'],
        transmission_time: event.headers['paypal-transmission-time'],
        webhook_id:        webhookId,
        webhook_event:     JSON.parse(event.body),
      }),
    });
    const { verification_status } = await verifyRes.json();
    return verification_status === 'SUCCESS';
  } catch {
    return false;
  }
}

export const handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // ── Verify signature if webhook ID is configured ─────────────────────
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (webhookId) {
    const valid = await verifyWebhookSignature(event, webhookId);
    if (!valid) {
      console.warn('PayPal webhook signature verification failed');
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid signature' }) };
    }
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const eventType     = payload.event_type;
  const subscriptionId = payload.resource?.id || payload.resource?.billing_agreement_id;

  console.log(JSON.stringify({ event: 'paypal-webhook', eventType, subscriptionId, timestamp: new Date().toISOString() }));

  if (!subscriptionId) {
    return { statusCode: 200, headers, body: JSON.stringify({ received: true }) };
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const STATUS_MAP = {
    'BILLING.SUBSCRIPTION.ACTIVATED': 'active',
    'BILLING.SUBSCRIPTION.CANCELLED': 'cancelled',
    'BILLING.SUBSCRIPTION.SUSPENDED': 'suspended',
    'BILLING.SUBSCRIPTION.EXPIRED':   'expired',
  };

  const newStatus = STATUS_MAP[eventType];

  if (newStatus) {
    const { error } = await supabase
      .from('doctor_profiles')
      .update({ subscription_status: newStatus, ...(newStatus === 'cancelled' ? { plan_end_date: new Date().toISOString() } : {}) })
      .eq('paypal_subscription_id', subscriptionId);

    if (error) console.error('Webhook DB update failed:', error);
  }

  return { statusCode: 200, headers, body: JSON.stringify({ received: true }) };
};
