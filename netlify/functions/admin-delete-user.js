/**
 * CRIS GOLD™ — Admin Delete User
 * POST /.netlify/functions/admin-delete-user
 *
 * Deletes a Supabase Auth user + their doctor_profiles row.
 * Only callable by super_admin users.
 *
 * Body: { userId }
 * Auth: Bearer <supabase_access_token>
 */

import { createClient } from '@supabase/supabase-js';

const SUPER_ADMIN_EMAILS = ['mike.castellon5@gmail.com'];

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  // ── Verify the caller is a super admin ─────────────────
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

  // Check if caller is super admin
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

  const { userId } = body;
  if (!userId) {
    return new Response(JSON.stringify({ error: 'userId is required' }), { status: 400 });
  }

  // Prevent self-deletion
  if (userId === caller.id) {
    return new Response(JSON.stringify({ error: 'Cannot delete your own account' }), { status: 400 });
  }

  // ── Delete doctor_profiles row first (FK constraint) ──
  const { error: profileError } = await supabaseAdmin
    .from('doctor_profiles')
    .delete()
    .eq('id', userId);

  if (profileError) {
    console.error('Profile delete error:', profileError);
    // Continue — auth user might still need deleting
  }

  // ── Delete auth user ──
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (deleteError) {
    return new Response(JSON.stringify({ error: deleteError.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
