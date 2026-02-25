import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DEFAULT_RULES = `# MedAnalytica — Clinical Extraction Rules
# These rules are injected into the AI prompt during analysis.

[HRV_ANALYSIS]
extract: SDNN, RMSSD, pNN50, LF/HF Ratio, Heart Rate, LF Power, HF Power, Total Power
flag_low:  SDNN < 50        => "Reduced HRV — impaired autonomic regulation"
flag_low:  RMSSD < 30       => "Low parasympathetic activity"
flag_high: LF/HF > 2.0      => "Sympathetic dominance — elevated stress"
flag_high: Heart Rate > 80  => "Elevated resting heart rate"

[BLOOD_WORK]
extract: Hemoglobin, WBC, RBC, Platelets, Hematocrit, MCV, MCH
flag_low:  Hemoglobin < 12.0  => "Anemia — recommend iron studies"
flag_high: WBC > 11.0          => "Leukocytosis — possible infection"
flag_low:  Platelets < 150     => "Thrombocytopenia — hematology referral"

[LIPID_PANEL]
extract: LDL, HDL, Total Cholesterol, Triglycerides, VLDL
flag_high: LDL > 130           => "Elevated LDL — intervention needed"
flag_high: Triglycerides > 200 => "Hypertriglyceridemia"
flag_low:  HDL < 40            => "Low HDL — cardiovascular risk"

[THYROID]
extract: TSH, Free T4, Free T3, Anti-TPO
flag_high: TSH > 4.0           => "Possible hypothyroidism"
flag_low:  TSH < 0.4           => "Possible hyperthyroidism"

[METABOLIC]
extract: Glucose, BUN, Creatinine, eGFR, Sodium, Potassium
flag_high: Glucose > 100       => "Impaired fasting glucose"
flag_low:  eGFR < 60           => "Reduced kidney function"`;

export default function Settings({ user }) {
  const [rules, setRules]     = useState(DEFAULT_RULES);
  const [saved, setSaved]     = useState(false);
  const [profile, setProfile] = useState({ clinicName: '', fullName: '' });

  useEffect(() => {
    if (user.id === 'demo') return;
    const load = async () => {
      const { data } = await supabase.from('doctor_profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile({ clinicName: data.clinic_name || '', fullName: data.full_name || '' });
        if (data.custom_rules) setRules(data.custom_rules);
      }
    };
    load();
  }, [user.id]);

  const save = async () => {
    if (user.id !== 'demo') {
      await supabase.from('doctor_profiles').upsert({
        id: user.id,
        custom_rules: rules,
        clinic_name:  profile.clinicName,
        full_name:    profile.fullName,
      });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="fade-in">
      <div className="pg-hdr">
        <div>
          <div className="pg-title">Rules & Configuration</div>
          <div className="pg-sub">Customize how AI interprets and flags laboratory report values</div>
        </div>
      </div>

      <div className="fc">
        <div className="fc-hdr"><div className="fc-title">AI Extraction & Flagging Rules</div><div className="fc-badge">Required</div></div>
        <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '14px', lineHeight: '1.7' }}>
          Define which markers to extract per report type and set clinical thresholds.
          Rules are injected into the Claude AI prompt at analysis time.
        </p>
        <textarea className="re" value={rules} onChange={e => setRules(e.target.value)} rows={20} />
        <div className="fa" style={{ marginTop: '14px' }}>
          {saved && <span className="sv">✓ Rules saved</span>}
          <button className="btn btn-nv" onClick={save}>Save Rules</button>
        </div>
      </div>

      <div className="fc">
        <div className="fc-hdr"><div className="fc-title">Practice Configuration</div><div className="fc-badge">Optional</div></div>
        <div className="fg2">
          <div className="fg">
            <label className="fl">Physician Name</label>
            <input className="fi" placeholder="Dr. Sarah Chen" value={profile.fullName}
              onChange={e => setProfile(p => ({ ...p, fullName: e.target.value }))} />
          </div>
          <div className="fg">
            <label className="fl">Institution / Clinic Name</label>
            <input className="fi" placeholder="Sunrise Medical Center" value={profile.clinicName}
              onChange={e => setProfile(p => ({ ...p, clinicName: e.target.value }))} />
          </div>
        </div>
        <div className="fa"><button className="btn btn-nv" onClick={save}>Save Configuration</button></div>
      </div>

    </div>
  );
}
