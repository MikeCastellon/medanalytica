/**
 * MedAnalytica / CRIS GOLD™ — Analysis Status Check
 * GET /.netlify/functions/analysis-status?jobId=xxx
 *
 * Client polls this endpoint to check if the background analysis is complete.
 * Returns { status: 'processing' | 'complete' | 'error', data?: {...}, error?: string }
 */

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export const handler = async (event) => {
  const requestOrigin = event.headers['origin'] || '';
  const allowedOrigins = [
    'https://kesslercris.com',
    'https://www.kesslercris.com',
    'https://medanalytica-cris.netlify.app',
    ...(process.env.ALLOWED_ORIGIN ? [process.env.ALLOWED_ORIGIN] : []),
  ];
  const allowedOrigin = allowedOrigins.includes(requestOrigin)
    ? requestOrigin
    : allowedOrigins[0];

  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const jobId = event.queryStringParameters?.jobId;
  if (!jobId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing jobId parameter' }) };
  }

  // Sanitize jobId (should be a UUID)
  if (!/^[a-f0-9-]{36}$/i.test(jobId)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid jobId format' }) };
  }

  try {
    const { data: job, error } = await supabaseAdmin
      .from('analysis_jobs')
      .select('status, result, error')
      .eq('job_id', jobId)
      .single();

    if (error || !job) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: 'Job not found' }) };
    }

    if (job.status === 'complete') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: 'complete', success: true, data: job.result }),
      };
    }

    if (job.status === 'error') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: 'error', success: false, error: job.error }),
      };
    }

    // Still processing
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: 'processing' }),
    };
  } catch (err) {
    console.error('analysis-status error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
