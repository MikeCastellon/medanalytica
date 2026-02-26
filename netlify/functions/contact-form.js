/**
 * MedAnalytica — Contact Form Handler
 * POST /.netlify/functions/contact-form
 *
 * Sends contact form submissions via Postmark.
 * Requires POSTMARK_API_KEY set in Netlify environment variables.
 * Set POSTMARK_FROM_EMAIL to your verified sender address.
 * Set POSTMARK_TO_EMAIL to where you want to receive submissions.
 */

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, practice, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const POSTMARK_API_KEY  = process.env.POSTMARK_API_KEY;
  const FROM_EMAIL        = process.env.POSTMARK_FROM_EMAIL || 'noreply@medanalytica.com';
  const TO_EMAIL          = process.env.POSTMARK_TO_EMAIL   || 'support@medanalytica.com';

  if (!POSTMARK_API_KEY) {
    return new Response(JSON.stringify({ error: 'Mail service not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const subjectMap = {
    general:    'General Inquiry',
    demo:       'Request a Demo',
    pricing:    'Pricing & Plans',
    technical:  'Technical Support',
    billing:    'Billing',
    enterprise: 'Enterprise / Clinic Plan',
  };
  const subjectLabel = subjectMap[subject] || subject;

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; color: #1a2535;">
      <div style="background: #0f2744; padding: 24px 28px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #fff; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
        <p style="color: rgba(255,255,255,.6); margin: 6px 0 0; font-size: 13px;">MedAnalytica / CRIS GOLD™</p>
      </div>
      <div style="border: 1px solid #dde2ea; border-top: none; border-radius: 0 0 8px 8px; padding: 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #8896aa; width: 130px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #8896aa;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a6fb5;">${email}</a></td></tr>
          ${practice ? `<tr><td style="padding: 8px 0; color: #8896aa;">Practice</td><td style="padding: 8px 0;">${practice}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #8896aa;">Subject</td><td style="padding: 8px 0;">${subjectLabel}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #dde2ea; margin: 20px 0;" />
        <p style="color: #8896aa; font-size: 13px; margin-bottom: 8px;">Message</p>
        <p style="font-size: 14px; line-height: 1.75; white-space: pre-wrap;">${message}</p>
      </div>
      <p style="font-size: 11px; color: #8896aa; margin-top: 16px; text-align: center;">
        Sent from MedAnalytica contact form · ${new Date().toUTCString()}
      </p>
    </div>
  `;

  try {
    const res = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept':                  'application/json',
        'Content-Type':            'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_KEY,
      },
      body: JSON.stringify({
        From:        FROM_EMAIL,
        To:          TO_EMAIL,
        ReplyTo:     email,
        Subject:     `[CRIS GOLD™ Contact] ${subjectLabel} — ${name}`,
        HtmlBody:    htmlBody,
        TextBody:    `Name: ${name}\nEmail: ${email}\nPractice: ${practice || 'N/A'}\nSubject: ${subjectLabel}\n\n${message}`,
        MessageStream: 'outbound',
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Postmark error:', err);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = { path: '/api/contact' };
