/**
 * CRIS GOLD™ — Patient Profile with Report History
 * Professional+ feature: Shows all reports for a patient over time,
 * with AI-powered comparison of improvements/regressions.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const C = {
  navy: '#0a1628',
  blue: '#1a73e8',
  teal: '#0e8a7a',
  green: '#22c55e',
  red: '#ef4444',
  amber: '#f59e0b',
  text2: '#4b5563',
  text3: '#9ca3af',
  border: 'rgba(0,0,0,.09)',
  bg: '#fff',
  bg2: '#f8fafc',
};
const serif = "'Libre Baskerville', Georgia, serif";

export default function PatientProfile({ patient, user, onViewReport, onBack }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comparison, setComparison] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [compError, setCompError] = useState('');

  useEffect(() => {
    loadReports();
  }, [patient.id]);

  const loadReports = async () => {
    setLoading(true);
    if (user.id === 'demo') {
      // Demo mode — show mock timeline
      setReports([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('reports')
      .select('id, report_type, status, cri_score, hrq_quadrant, cv_quadrant, ai_summary, created_at, collection_date, overall_status, cri_category, raw_extraction')
      .eq('patient_id', patient.id)
      .order('created_at', { ascending: false });

    if (error) console.error('Failed to load reports:', error);
    setReports(data || []);
    setLoading(false);
  };

  const runComparison = async () => {
    if (reports.length < 2) return;
    setComparing(true);
    setCompError('');
    try {
      const apiBase = import.meta.env.DEV ? 'http://localhost:8888' : '';
      const res = await fetch(`${apiBase}/.netlify/functions/compare-reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reports: reports.map(r => ({
            date: r.collection_date || r.created_at,
            criScore: r.cri_score,
            quadrant: r.hrq_quadrant,
            rawExtraction: r.raw_extraction,
          })),
          patientInfo: {
            firstName: patient.first_name,
            lastName: patient.last_name,
          },
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Comparison failed');
      setComparison(json.data);
    } catch (err) {
      console.error('Comparison error:', err);
      setCompError(err.message);
    }
    setComparing(false);
  };

  const handleViewReport = async (report) => {
    // Build the full report object from raw_extraction + top-level fields
    const fullReport = {
      ...(report.raw_extraction || {}),
      report_type: report.report_type,
      collection_date: report.collection_date,
      cri_score: report.cri_score,
      crisgoldQuadrant: report.hrq_quadrant ?? report.raw_extraction?.crisgoldQuadrant,
    };
    onViewReport({
      patient,
      report: fullReport,
    });
  };

  const statusColor = (status) => {
    switch (status) {
      case 'critical': return C.red;
      case 'warning': return C.amber;
      case 'normal': return C.green;
      default: return C.text3;
    }
  };

  const criColor = (score) => {
    if (score == null) return C.text3;
    if (score >= 6) return C.red;
    if (score >= 3) return C.amber;
    return C.green;
  };

  const age = patient.dob
    ? Math.floor((Date.now() - new Date(patient.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  return (
    <div style={{ padding: '0 0 40px', maxWidth: '960px' }}>
      {/* Back button */}
      <button onClick={onBack} style={{
        background: 'none', border: 'none', color: C.blue, fontSize: '13px',
        cursor: 'pointer', padding: '0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '4px',
      }}>
        ← Back to Dashboard
      </button>

      {/* Patient Header */}
      <div style={{
        background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px',
        padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px',
      }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%', background: `${C.blue}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', fontWeight: 700, color: C.blue,
        }}>
          {(patient.first_name?.[0] || '') + (patient.last_name?.[0] || '')}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: serif, fontSize: '24px', fontWeight: 700, color: C.navy, marginBottom: '4px' }}>
            {patient.first_name} {patient.last_name}
          </h1>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: C.text3 }}>
            {patient.mrn && <span>MRN: {patient.mrn}</span>}
            {patient.dob && <span>DOB: {new Date(patient.dob).toLocaleDateString()}{age != null ? ` (${age}y)` : ''}</span>}
            {patient.gender && <span>{patient.gender}</span>}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: C.navy }}>{reports.length}</div>
          <div style={{ fontSize: '11px', color: C.text3, textTransform: 'uppercase', letterSpacing: '.05em' }}>Reports</div>
        </div>
      </div>

      {/* CRI Score Trend (if multiple reports) */}
      {reports.length >= 2 && (
        <div style={{
          background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px',
          padding: '20px 24px', marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: serif, fontSize: '16px', fontWeight: 700, color: C.navy }}>
              CRI Score Trend
            </h2>
            <button
              onClick={runComparison}
              disabled={comparing}
              style={{
                padding: '8px 18px', borderRadius: '8px', border: 'none',
                background: comparing ? C.text3 : C.teal, color: '#fff',
                fontSize: '12px', fontWeight: 700, cursor: comparing ? 'default' : 'pointer',
              }}
            >
              {comparing ? 'Analyzing…' : '🧠 AI Compare Reports'}
            </button>
          </div>

          {/* Simple score bar chart */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '80px' }}>
            {[...reports].reverse().map((r, i) => {
              const score = r.cri_score ?? 0;
              const maxH = 70;
              const h = Math.max(8, (score / 12) * maxH);
              return (
                <div key={r.id} style={{ flex: 1, textAlign: 'center', maxWidth: '80px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: criColor(score), marginBottom: '4px' }}>
                    {score}
                  </div>
                  <div style={{
                    height: `${h}px`, background: criColor(score), borderRadius: '4px 4px 0 0',
                    opacity: 0.7, transition: 'height .3s',
                  }} />
                  <div style={{ fontSize: '9px', color: C.text3, marginTop: '4px' }}>
                    {new Date(r.collection_date || r.created_at).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}
                  </div>
                </div>
              );
            })}
          </div>

          {compError && (
            <div style={{
              marginTop: '12px', padding: '10px 14px', borderRadius: '8px',
              background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '12px',
            }}>
              {compError}
            </div>
          )}
        </div>
      )}

      {/* AI Comparison Results */}
      {comparison && (
        <div style={{
          background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px',
          padding: '24px', marginBottom: '24px',
        }}>
          <h2 style={{ fontFamily: serif, fontSize: '16px', fontWeight: 700, color: C.navy, marginBottom: '16px' }}>
            🧠 AI Report Comparison
          </h2>

          {comparison.summary && (
            <p style={{ fontSize: '14px', color: C.text2, lineHeight: '1.7', marginBottom: '20px' }}>
              {comparison.summary}
            </p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {/* Improvements */}
            <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: C.green, textTransform: 'uppercase', marginBottom: '10px' }}>
                ✅ Improved
              </div>
              {(comparison.improvements || []).length > 0 ? (
                <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: '#166534', lineHeight: '1.8' }}>
                  {comparison.improvements.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              ) : (
                <p style={{ fontSize: '12px', color: C.text3 }}>No improvements noted</p>
              )}
            </div>

            {/* Worsened */}
            <div style={{ background: '#fef2f2', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: C.red, textTransform: 'uppercase', marginBottom: '10px' }}>
                ⚠️ Worsened
              </div>
              {(comparison.worsened || []).length > 0 ? (
                <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: '#b91c1c', lineHeight: '1.8' }}>
                  {comparison.worsened.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              ) : (
                <p style={{ fontSize: '12px', color: C.text3 }}>No regressions noted</p>
              )}
            </div>

            {/* Unchanged */}
            <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: C.text2, textTransform: 'uppercase', marginBottom: '10px' }}>
                ➖ Unchanged
              </div>
              {(comparison.unchanged || []).length > 0 ? (
                <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: C.text2, lineHeight: '1.8' }}>
                  {comparison.unchanged.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              ) : (
                <p style={{ fontSize: '12px', color: C.text3 }}>—</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Report History Timeline */}
      <div style={{
        background: C.bg, border: `1px solid ${C.border}`, borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.border}` }}>
          <h2 style={{ fontFamily: serif, fontSize: '16px', fontWeight: 700, color: C.navy }}>
            Report History
          </h2>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: C.text3, fontSize: '13px' }}>
            Loading reports…
          </div>
        ) : reports.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: C.text3 }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
            <p style={{ fontSize: '13px' }}>No reports yet for this patient.</p>
          </div>
        ) : (
          <div>
            {reports.map((report, idx) => (
              <div
                key={report.id}
                onClick={() => handleViewReport(report)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '16px 24px',
                  borderBottom: idx < reports.length - 1 ? `1px solid ${C.border}` : 'none',
                  cursor: 'pointer',
                  transition: 'background .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.bg2}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Timeline dot */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: statusColor(report.overall_status),
                    border: `2px solid ${C.bg}`,
                    boxShadow: `0 0 0 2px ${statusColor(report.overall_status)}40`,
                  }} />
                  {idx < reports.length - 1 && (
                    <div style={{
                      position: 'absolute', left: '5px', top: '16px',
                      width: '2px', height: '32px', background: C.border,
                    }} />
                  )}
                </div>

                {/* Report info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: C.navy }}>
                      {report.report_type || 'CRIS GOLD™ Report'}
                    </span>
                    {idx === 0 && (
                      <span style={{
                        padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700,
                        background: `${C.blue}15`, color: C.blue,
                      }}>
                        Latest
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: C.text3 }}>
                    {new Date(report.collection_date || report.created_at).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                    {report.cri_category && ` · ${report.cri_category}`}
                  </div>
                </div>

                {/* CRI Score */}
                <div style={{ textAlign: 'center', minWidth: '60px' }}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: criColor(report.cri_score) }}>
                    {report.cri_score ?? '—'}
                  </div>
                  <div style={{ fontSize: '9px', color: C.text3, textTransform: 'uppercase' }}>CRI</div>
                </div>

                {/* Quadrant badge */}
                {report.hrq_quadrant && (
                  <div style={{
                    padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700,
                    background: `${C.teal}15`, color: C.teal,
                  }}>
                    {report.hrq_quadrant}
                  </div>
                )}

                {/* Arrow */}
                <span style={{ color: C.text3, fontSize: '16px' }}>→</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
