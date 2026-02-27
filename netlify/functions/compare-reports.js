/**
 * CRIS GOLD™ — AI Report Comparison
 * POST /.netlify/functions/compare-reports
 *
 * Compares 2+ patient reports over time using OpenAI GPT-4o.
 * Returns improvements, regressions, unchanged markers, and a clinical summary.
 */

export const handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 503, headers, body: JSON.stringify({ success: false, error: 'AI service not configured' }) };
  }

  try {
    const { reports, patientInfo } = JSON.parse(event.body || '{}');

    if (!reports || reports.length < 2) {
      return { statusCode: 400, headers, body: JSON.stringify({ success: false, error: 'At least 2 reports required for comparison' }) };
    }

    // Build comparison context for the AI
    const reportSummaries = reports.map((r, i) => {
      const ext = r.rawExtraction || {};
      return `
REPORT ${i + 1} (${r.date || 'Unknown date'}):
- CRI Score: ${r.criScore ?? 'N/A'}/12
- CRIS GOLD Quadrant: ${r.quadrant || ext.crisgoldQuadrant || 'N/A'}
- CV Quadrant: ${ext.cvQuadrant || 'N/A'}
- HRV Markers: ${JSON.stringify(ext.hrvMarkers || [], null, 1)}
- Blood Pressure: ${ext.bloodPressure || ext.sbp ? `${ext.sbp}/${ext.dbp}` : 'N/A'}
- Pulse Pressure: ${ext.pulsePressure || 'N/A'}
- Polyvagal Rule of 3 Met: ${ext.polyvagalRuleOf3Met ?? 'N/A'}
- Adrenal Urine Drops: ${ext.adrenalUrineDrops ?? 'N/A'}
- Brain Gauge: ${ext.brainGauge ? JSON.stringify(ext.brainGauge) : 'N/A'}
- Therapeutic Selections: ${ext.therapeuticSelections ? Object.keys(ext.therapeuticSelections).join(', ') : 'N/A'}
- AI Summary: ${ext.aiSummary || 'N/A'}
`;
    });

    const prompt = `You are a clinical report comparison specialist for integrative medicine. Compare the following ${reports.length} CRIS GOLD™ reports for patient ${patientInfo?.firstName || ''} ${patientInfo?.lastName || ''}, ordered from oldest to newest.

${reportSummaries.join('\n---\n')}

Analyze the progression and return ONLY valid JSON (no markdown, no code fences) in this exact format:
{
  "improvements": ["List specific markers/scores that improved with values"],
  "worsened": ["List specific markers/scores that worsened with values"],
  "unchanged": ["List markers that stayed roughly the same"],
  "summary": "A 2-3 sentence clinical narrative describing the overall trajectory, key changes, and recommended focus for the next visit."
}

Focus on:
- CRI score changes
- HRV marker changes (SDNN, RMSSD, Total Power, Stress Index, LF/HF ratio)
- Quadrant shifts
- Blood pressure and pulse pressure trends
- Adrenal and brain gauge changes if available
- Whether therapeutic protocols appear to be working`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OpenAI error:', errText);
      throw new Error('AI comparison service error');
    }

    const completion = await res.json();
    const content = completion.choices?.[0]?.message?.content || '';

    // Parse the JSON response
    let data;
    try {
      // Strip any markdown code fences if present
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      data = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('Failed to parse AI response:', content);
      data = {
        improvements: [],
        worsened: [],
        unchanged: [],
        summary: content,
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (err) {
    console.error('compare-reports error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: err.message || 'Internal server error' }),
    };
  }
};
