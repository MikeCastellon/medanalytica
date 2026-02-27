/**
 * CRIS GOLD™ — Admin Create User
 * POST /.netlify/functions/admin-create-user
 *
 * Creates a new Supabase Auth user + doctor_profiles row.
 * Only callable by super_admin users.
 *
 * Body: { email, password, fullName, clinicName, tier, role }
 * Auth: Bearer <supabase_access_token>
 */

import { createClient } from '@supabase/supabase-js';

const SUPER_ADMIN_EMAILS = ['mike.castellon5@gmail.com'];

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  // ── Verify the caller is a super admin ─────────────────────
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const token = authHeader.replace('Bearer ', '');

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ error: 'Server config missing' }), { status: 500 });
  }

  // Client with the caller's token to verify identity
  const supabaseUser = createClient(supabaseUrl, process.env.VITE_SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: { user: caller }, error: authError } = await supabaseUser.auth.getUser();
  if (authError || !caller) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 401 });
  }

  // Check if caller is super admin (by email or by DB role)
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  const { data: callerProfile } = await supabaseAdmin
    .from('doctor_profiles')
    .select('role')
    .eq('id', caller.id)
    .single();

  const isAdmin = SUPER_ADMIN_EMAILS.includes(caller.email) || callerProfile?.role === 'super_admin';
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: 'Forbidden: admin only' }), { status: 403 });
  }

  // ── Parse body ─────────────────────────────────────────────
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const { email, password, fullName, clinicName, tier, role } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
  }

  if (password.length < 6) {
    return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400 });
  }

  // ── Create auth user ──────────────────────────────────────
  const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm email
    user_metadata: {
      full_name: fullName || 'Doctor',
      initials: (fullName || 'DR').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
    },
  });

  if (createError) {
    return new Response(JSON.stringify({ error: createError.message }), { status: 400 });
  }

  // ── Update doctor_profiles (auto-created by trigger, update tier/role/clinic) ──
  // Small delay to let the trigger fire
  await new Promise(r => setTimeout(r, 500));

  const { error: updateError } = await supabaseAdmin
    .from('doctor_profiles')
    .update({
      full_name: fullName || 'Doctor',
      clinic_name: clinicName || null,
      role: role || 'Physician',
      subscription_tier: tier || 'starter',
      subscription_status: 'active',
      billing_email: email,
      initials: (fullName || 'DR').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
    })
    .eq('id', newUser.user.id);

  if (updateError) {
    console.error('Profile update error:', updateError);
    // User was created but profile update failed — not fatal
  }

  return new Response(JSON.stringify({
    success: true,
    user: {
      id: newUser.user.id,
      email: newUser.user.email,
      fullName: fullName || 'Doctor',
      tier: tier || 'starter',
      role: role || 'Physician',
    },
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
