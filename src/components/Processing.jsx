import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { fileToBase64 } from '../lib/utils';
import { hasTier } from '../lib/tiers';

const STEPS = [
  'Uploading screenshots securely…',
  'Reading HQP screen captures…',
  'Extracting HRV & laboratory markers…',
  'Calculating CRI score & quadrant placement…',
  'Applying clinical rules engine…',
  'Generating report & visualizations…',
];

export default function Processing({ user, form, files = [], customRules, onDone, onError }) {
  // files is now an array of File objects (screenshots)
  const [step, setStep]       = useState(0);
  const [stepDone, setStepDone] = useState([]);

  useEffect(() => {
    run();
  }, []);

  const advance = (i) => {
    setStep(i);
    setStepDone(d => [...d, i - 1]);
  };

  const run = async () => {
    let saveError = null;
    try {
      // Force-refresh the Supabase session before any DB operations.
      // getSession() can return a cached/expired JWT that passes the null check
      // but fails RLS. Always refreshSession() to get a valid token.
      if (user.id !== 'demo') {
        const { data: refreshed, error: refreshErr } = await supabase.auth.refreshSession();
        if (refreshErr || !refreshed?.session) {
          onError?.('Your session has expired. Please sign out and sign back in.');
          return;
        }
      }

      advance(1);
      // Convert all screenshots to base64
      const screenshotBase64s = files.length > 0
        ? await Promise.all(files.map(f => fileToBase64(f)))
        : [];

      advance(2);
      // Upload screenshots to Supabase Storage (if not demo)
      // Uses a 10s timeout per file so a hanging upload never blocks the analysis.
      let filePaths = [];
      if (user.id !== 'demo' && files.length > 0) {
        const uploadWithTimeout = (f) => {
          const path = `${user.id}/${Date.now()}-${f.name}`;
          const uploadPromise = supabase.storage.from('reports').upload(path, f)
            .then(() => path)
            .catch(() => null);
          const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 10000));
          return Promise.race([uploadPromise, timeoutPromise]);
        };
        const results = await Promise.all(files.map(uploadWithTimeout));
        filePaths = results.filter(Boolean);
      }

      advance(3);

      // All Supabase DB operations are wrapped in a 12s timeout.
      // If the connection hangs (CORS/network issue), the AI analysis still proceeds.
      let patientId = null;
      let isReturningPatient = false;

      await Promise.race([
        (async () => {
          // Starter tier: enforce 50 stored reports limit
          if (user.id !== 'demo' && user.tier === 'starter') {
            const { count: reportCount } = await supabase
              .from('reports')
              .select('id', { count: 'exact', head: true })
              .eq('doctor_id', user.id);
            if (reportCount != null && reportCount >= 50) {
              throw new Error('REPORT_LIMIT_REACHED');
            }
          }

          // Create or reuse patient record in Supabase
          if (user.id !== 'demo') {
            try {
              if (form.mrn) {
                const { data: byMrn } = await supabase
                  .from('patients')
                  .select('id')
                  .eq('doctor_id', user.id)
                  .eq('mrn', form.mrn)
                  .limit(1)
                  .maybeSingle();
                if (byMrn) { patientId = byMrn.id; isReturningPatient = true; }
              }
              if (!patientId && form.firstName && form.lastName && form.dob) {
                const { data: byName } = await supabase
                  .from('patients')
                  .select('id')
                  .eq('doctor_id', user.id)
                  .eq('first_name', form.firstName)
                  .eq('last_name', form.lastName)
                  .eq('dob', form.dob)
                  .limit(1)
                  .maybeSingle();
                if (byName) { patientId = byName.id; isReturningPatient = true; }
              }
            } catch (lookupErr) {
              console.warn('Patient lookup failed, will create new:', lookupErr);
            }

            if (!patientId) {
              const { data: pat, error: patError } = await supabase.from('patients').insert({
                doctor_id:  user.id,
                first_name: form.firstName,
                last_name:  form.lastName,
                dob:        form.dob || null,
                gender:     form.gender || null,
                mrn:        form.mrn || null,
                phone:      form.phone || null,
                notes:      form.notes || null,
              }).select().single();
              if (patError) {
                console.error('Patient insert failed:', patError);
                saveError = `Patient record could not be created: ${patError.message}`;
              }
              patientId = pat?.id ?? null;
            }
          }
        })(),
        // Safety valve: if Supabase hangs for any reason, continue after 12s
        new Promise(resolve => setTimeout(resolve, 12000)),
      ]);

      advance(4);
      // Call the Netlify AI analysis function
      const apiBase = import.meta.env.DEV ? 'http://localhost:8888' : '';
      const payload = {
        mode: 'async', // Request background processing (falls back to sync if unavailable)
        doctorId: user.id,
        screenshots: screenshotBase64s,
        fileCount: screenshotBase64s.length,
        reportType: form.reportType,
        patientInfo: { firstName: form.firstName, lastName: form.lastName, dob: form.dob, gender: form.gender },
        clinicalData: {
          sbp:                  form.sbp ? Number(form.sbp) : null,
          dbp:                  form.dbp ? Number(form.dbp) : null,
          filtrationRejections: form.filtrationRejections ? Number(form.filtrationRejections) : null,
          questionnaireScore:       form.questionnaireScore !== '' && form.questionnaireScore != null ? Number(form.questionnaireScore) : null,
          stressQuestionnaireScore: form.stressQuestionnaireScore != null ? Number(form.stressQuestionnaireScore) : null,
          ari:                      form.ari !== '' && form.ari != null ? Number(form.ari) : null,
          chavita:              form.chavita ? Number(form.chavita) : null,
          emvita:               form.emvita ? Number(form.emvita) : null,
          ermMethod:            form.ermMethod || null,
          acuteRemedies:        form.acuteRemedies || null,
          rjlPhaseAngle:        form.rjlPhaseAngle || null,
          rjlIcw:               form.rjlIcw || null,
          rjlEcw:               form.rjlEcw || null,
          rjlTbw:               form.rjlTbw || null,
          oxidativeStressScore: form.oxidativeStressScore || null,
          adrenalTested:        form.adrenalTested === true,
          brainGaugeTested:     form.brainGaugeTested === true,
        },
        customRules,
      };

      // Step 1: Create job record (small request — no screenshots)
      const jobRes = await fetch(`${apiBase}/.netlify/functions/analyze-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'async', doctorId: user.id }),
      });

      let jobJson;
      try { jobJson = await jobRes.json(); } catch { jobJson = null; }

      let aiData;
      if (jobJson?.mode === 'async' && jobJson?.jobId) {
        // ── ASYNC MODE: call background function directly, then poll ──────
        const jobId = jobJson.jobId;

        // Fire background function (returns 202 immediately)
        fetch(`${apiBase}/.netlify/functions/analyze-report-background`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, jobId }),
        }).catch(() => {}); // fire-and-forget from client side

        const POLL_INTERVAL = 3000;
        const MAX_POLL_TIME = 180000; // 3 minutes
        const startTime = Date.now();

        while (Date.now() - startTime < MAX_POLL_TIME) {
          await new Promise(r => setTimeout(r, POLL_INTERVAL));
          try {
            const statusRes = await fetch(`${apiBase}/.netlify/functions/analysis-status?jobId=${jobId}`);
            const statusJson = await statusRes.json();

            if (statusJson.status === 'complete') {
              aiData = statusJson.data;
              break;
            }
            if (statusJson.status === 'error') {
              throw new Error(statusJson.error || 'Analysis failed');
            }
          } catch (pollErr) {
            if (pollErr.message && !pollErr.message.includes('fetch')) throw pollErr;
            // Network hiccup — keep polling
          }
        }
        if (!aiData) {
          throw new Error('Analysis took too long. Please try again with fewer screenshots.');
        }
      } else {
        // ── SYNC FALLBACK: send full payload directly ─────────────────────
        const res = await fetch(`${apiBase}/.netlify/functions/analyze-report`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        let json;
        try { json = await res.json(); } catch {
          throw new Error(
            res.status === 502 || res.status === 504
              ? 'The AI analysis timed out. Try uploading fewer screenshots or try again.'
              : `Server error (${res.status}). The analysis function may have crashed or timed out.`
          );
        }
        if (!json.success) throw new Error(json.error || 'Analysis failed');
        aiData = json.data;
      }

      advance(5);
      // Save report to Supabase
      if (user.id !== 'demo' && patientId) {
        const { error: repError } = await supabase.from('reports').insert({
          patient_id:               patientId,
          doctor_id:                user.id,
          report_type:              aiData.reportType || form.reportType,
          collection_date:          form.collectionDate || null,
          file_path:                filePaths[0] || null,
          file_name:                files[0]?.name || null,
          status:                   'complete',
          cri_score:                aiData.criScore,
          hrq_ari:                  aiData.ari ?? aiData.hrqAri,
          hrq_eli:                  aiData.eli ?? aiData.hrqEli,
          hrq_quadrant:             aiData.crisgoldQuadrant ?? aiData.hrqQuadrant,
          cv_quadrant:              aiData.cvQuadrant,
          ai_summary:               aiData.aiSummary,
          markers:                  aiData.hrvMarkers || aiData.markers,
          // Extended CRIS GOLD™ fields
          blood_pressure:           aiData.bloodPressure,
          pulse_pressure:           aiData.pulsePressure,
          chief_complaints:         aiData.chiefComplaints,
          polyvagal_rule_of_3:      aiData.polyvagalRuleOf3Met,
          polyvagal_interpretation: aiData.polyvagalInterpretation,
          adrenal_urine_drops:      aiData.adrenalUrineDrops,
          adrenal_summary:          aiData.adrenalSummary,
          brain_gauge:              aiData.brainGauge,
          brain_gauge_summary:      aiData.brainGaugeSummary,
          therapeutic_selections:   aiData.therapeuticSelections,
          neurovizr_programs:       aiData.neuroVizrPrograms,
          patient_friendly_summary: aiData.patientFriendlySummary,
          cri_category:             aiData.criCategory,
          overall_status:           aiData.overallStatus,
          raw_extraction:           aiData,
        });
        if (repError) {
          console.error('Report save failed:', repError);
          saveError = saveError || `Report could not be saved: ${repError.message}`;
        }
      } else if (user.id !== 'demo' && !patientId) {
        saveError = saveError || 'Report could not be saved: patient record creation failed.';
      }

      advance(6);
      // Short pause then done
      setTimeout(() => {
        onDone({
          patient: {
            id: patientId || 'demo-' + Date.now(),
            first_name: form.firstName,
            last_name:  form.lastName,
            dob:        form.dob,
            gender:     form.gender,
            mrn:        form.mrn,
          },
          report: {
            ...aiData,
            report_type: aiData.reportType || form.reportType,
            file_name:   files.length > 0 ? `${files.length} screenshot(s)` : null,
            collection_date: form.collectionDate,
          },
          saveError: saveError || null,
        });
      }, 800);

    } catch (err) {
      console.error('Processing error:', err);

      // Starter tier report limit reached
      if (err.message === 'REPORT_LIMIT_REACHED') {
        onError?.('You\'ve reached the 50 stored report limit on the Starter plan. Upgrade to Professional or Clinic for unlimited reports.');
        return;
      }

      // Only fall back to demo mock data in true demo mode or if AI service not configured
      if (user.id === 'demo' || err.message?.includes('not configured') || err.message?.includes('503')) {
        advance(6);
        setTimeout(() => {
          onDone({
            patient: { id: 'demo-1', first_name: form.firstName, last_name: form.lastName, dob: form.dob, gender: form.gender, mrn: form.mrn },
            report: getMockReport(form),
            saveError: null,
          });
        }, 800);
      } else {
        // Real error — surface it to the user
        onError?.(err.message || 'Analysis failed. Please check your connection and try again.');
      }
    }
  };

  return (
    <div className="fade-in pw">
      <div className="pc">
        <div className="spin" />
        <div className="pt">Analyzing Report</div>
        <p className="ps">Please wait while AI extracts and interprets the clinical data…</p>
        <div className="sl">
          {STEPS.map((s, i) => (
            <div key={i} className={`si${stepDone.includes(i) ? ' done' : i === step ? ' act' : ''}`}>
              <div className="sd" />{stepDone.includes(i) ? '✓ ' : ''}{s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getMockReport(form) {
  // Demo patient: Uses revised 5-input ELI formula
  // VLF%=38, TP=1320, Polyvagal=0, SI=85 (<100→0pts), Q=31 (31-40→15pts)
  // ELI = (38×0.5) + (0×30) + ((1-1320/3500)×20) + 0 + 15 = 19 + 0 + 12.46 + 0 + 15 = 46
  const questionnaireScore = 31;
  const ari = 22;
  const eli = 46; // Computed from revised formula: VLF%=38, TP=1320, poly=0, SI=85, Q=31
  return {
    reportType: form.reportType || 'CRIS GOLD HRV',
    sbp: 138, dbp: 86, pulsePressure: 52,
    filtrationRejections: 6, filtrationWarning: false,
    questionnaireScore, eli, ari,
    hrqEli: eli, hrqAri: ari,
    criScore: 7,
    criCategory: 'Moderate Cardiovascular Risk Pattern',
    criBreakdown: {
      pulsePressure: { value: 62, score: 2, note: 'High — suggests arterial stiffness' },
      lfPercent:     { value: 48, score: 1, note: 'Increased vascular sympathetic stabilization effort' },
      vlfPercent:    { value: 38, score: 1, note: 'Increased vascular/renal-hormonal tension' },
      stressIndex:   { value: 85, score: 2, note: 'High sympathetic dominance' },
      totalPower:    { value: 1320, score: 1, note: 'Reduced resilience' },
      sdnn:          { value: 52, score: 0, note: 'Balanced' },
    },
    // CRIS GOLD™ quadrant (ELI=46 < 50 = Low ELI + ARI=22 < 60 = Low ARI → Q3)
    crisgoldQuadrant: 'Q3',
    crisgoldQuadrantLabel: 'Physiological Exhaustion',
    crisgoldQuadrantDescription: 'Emotional load is not the primary issue, but autonomic regulation is weak. Focus is on building resilience, energy reserves, and recovery capacity.',
    // CV Quadrant removed — only CRIS GOLD™ Quadrant shown
    // Rubimed (demo)
    chavita: 7, emvita: 27, ermMethod: 'Questionnaire',
    chavitaText: 'Chavita 7 — Crown Chakra: Themes of meaning, purpose, and spiritual integration. Chronic stress related to existential questions, safety, and deep life meaning. Supports reconnection with inner purpose and systemic nervous system regulation.',
    emvitaText: 'Emvita 27 — Long-standing disorientation and emotional strain. Pattern of chronic overwhelm, loss of direction, and difficulty finding ground. Supports reorientation and emotional stabilization.',
    acuteRemedies: null,
    // HRV markers
    hrvMarkers: [
      { name: 'Heart Rate',   value: 61,  unit: 'bpm',   low: 60,   high: 84,   status: 'normal', clinicalNote: 'Normal resting heart rate' },
      { name: 'SDNN',         value: 20,  unit: 'ms',    low: 49,   high: 70,   status: 'low',    clinicalNote: 'Severely reduced HRV — impaired autonomic resilience' },
      { name: 'RMSSD',        value: 16,  unit: 'ms',    low: 25,   high: 50,   status: 'low',    clinicalNote: 'Low parasympathetic tone — poor recovery capacity' },
      { name: 'LF/HF Ratio',  value: 1.09,unit: 'ratio', low: 1.0,  high: 3.0,  status: 'normal', clinicalNote: 'Balanced sympathovagal ratio despite systemic stress' },
      { name: 'Total Power',  value: 356, unit: 'ms²',   low: 1500, high: 3500, status: 'low',    clinicalNote: 'Very low energy reserves — autonomic depletion' },
      { name: 'Stress Index', value: 372, unit: '',      low: 10,   high: 100,  status: 'high',   clinicalNote: 'High autonomic load — chronic stress pattern' },
      { name: 'VLF%',         value: 57,  unit: '%',     low: 25,   high: 40,   status: 'high',   clinicalNote: 'Elevated chronic emotional/neurohormonal load' },
      { name: 'HF%',          value: 21,  unit: '%',     low: 30,   high: 50,   status: 'low',    clinicalNote: 'Low parasympathetic tone — reduced rest & repair' },
      { name: 'LF%',          value: 23,  unit: '%',     low: 30,   high: 50,   status: 'low',    clinicalNote: 'Relative sympathetic activation pattern' },
    ],
    hrvSummary: 'The autonomic nervous system shows severe depletion of energy reserves with high stress load. SDNN of 20ms and Total Power of 356ms² indicate a significantly exhausted system. This pattern commonly presents as poor sleep, digestive sluggishness, gallbladder tension, thyroid stress, and episodic racing heart sensations.',
    // Polyvagal
    polyvagalRuleOf3Met: false,
    polyvagalInterpretation: 'Although some markers trend toward dorsal vagal influence, the Polyvagal Rule of 3 is NOT met — all three parameters are not simultaneously in the red zone (SDNN <20, RMSSD <15, Total Power <200). This does NOT represent true freeze physiology. This is an exhausted, stressed system — NOT shutdown. The focus is stabilization, safety, and energy restoration.',
    // Adrenal
    adrenalUrineDrops: 2,
    adrenalInterpretation: 'Severe hyper-adrenal stress',
    thyroidFunctionalIndex: -0.06,
    adrenalSummary: 'The adrenal system is overactivated despite low overall energy. This mismatch explains insomnia, anxiety, and difficulty calming the nervous system. TFI of -0.06 is consistent with a Hashimoto\'s-type pattern.',
    // Brain Gauge
    brainGauge: {
      speed: 21,
      accuracy: 67,
      timeOrderJudgment: 5,
      timePerception: 97,
      plasticity: 55,
      fatigue: 12,
      focus: 79,
      overallCorticalMetric: 48,
    },
    brainGaugeSummary: 'Cognitive fatigue is present with preserved focus and time perception. This reflects an overworked but still responsive brain that needs recovery support rather than stimulation.',
    // Therapeutic selections — 6 categories (CRIS GOLD™ v1.0)
    therapeuticSelections: {
      drainage: ['Mundipur 1-2 tsp BID', 'Stress Buster Kit (Psy-stabil, Dalectro, Neu-regen)'],
      cellMembraneSupport: ['Membrane Mend', 'OmegaAvail Ultra DHA', 'Phosphatidylcholine (Quicksilver)'],
      mitochondrialSupport: ['The ONE', 'ATP 360', 'IntraMIN and IntraMAX'],
      neurocognitiveSupport: ['BDNF Essentials', 'Neuropregnenolone', 'Cognizin CDP-Choline'],
      oxidativeStressSupport: ['Liposomal Glutathione (Quicksilver)', 'Liposomal Vitamin C', 'Superoxide Dismutase (SOD)'],
      cardiovascularSupport: ['Carditone', 'Nano-emulsified D3/K2', 'Lumbrokinase (Bolouke) with Nattokinase'],
    },
    // NeuroVIZR
    neuroVizrPrograms: {
      brainGymFoundation: ['Coordination 1', 'Flexibility 1', 'Strength 1', 'Endurance 1'],
      quadrantPrograms: ['Gentle Movers', 'Peaceful Heart', 'Calm Your Mind Routine', 'Sleep Success Routine'],
    },
    psychosomaticFindings: 'Chavita 7 (Crown): Chronic stress related to meaning, safety, and integration. Emvita 27: Disorientation and long-standing emotional strain. These findings align with long-term stress, insomnia, and autonomic instability.',
    aiSummary: 'Patient presents with severely compromised autonomic function: SDNN 20ms (ref 49–70ms) and Total Power 356ms² (ref 1500–3500ms²) indicate significant energy reserve depletion. Stress Index of 372 (ref 10–100) and VLF% of 57% (ref 25–40%) confirm chronic emotional and neurohormonal overload. CRI score of 7 (High Cardiovascular Stress) combined with CRIS GOLD™ Q1 placement (High Emotional Load + Low Autonomic Resilience) indicates an exhausted system requiring foundational support. Adrenal testing shows severe hyper-adrenal stress. Brain Gauge reveals significant cognitive fatigue (score 12) with preserved focus. Priority is drainage, calming, and restoring cellular and mitochondrial function.',
    patientFriendlySummary: 'Your results show a body under high stress with very low energy reserves. This explains your sleep issues, digestive discomfort, gallbladder pain, thyroid strain, and racing heart sensations. The plan focuses on calming and supporting your system first — not pushing it. As your nervous system stabilizes, improvements in sleep, digestion, and heart rhythm are expected.',
    overallStatus: 'critical',
    recommendedFollowUp: 'Reassess HRV and adrenal markers in 6–8 weeks following drainage and foundational support protocol. Prioritize sleep quality and nervous system calming before advancing to stimulatory therapies.',
    collection_date: form.collectionDate,
    file_name: form.fileName || 'report.pdf',
  };
}
