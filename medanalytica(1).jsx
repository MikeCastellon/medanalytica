import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --bg:#f4f6f9;--bg2:#ffffff;--bg3:#eef1f5;
    --border:#dde2ea;--border2:#c8d0dc;
    --navy:#0f2744;--navy2:#1a3a5c;
    --blue:#1a6fb5;--blue-lt:#e8f2fc;
    --teal:#0e8a7a;--teal-lt:#e4f5f2;
    --text:#1a2535;--text2:#4a5a72;--text3:#8896aa;
    --red:#c0392b;--red-lt:#fdecea;
    --amber:#b45309;--amber-lt:#fef3e2;
    --green:#0e7a55;--green-lt:#e6f5ef;
    --shadow:0 1px 3px rgba(15,39,68,.08),0 4px 16px rgba(15,39,68,.06);
    --shadow2:0 2px 8px rgba(15,39,68,.10),0 8px 32px rgba(15,39,68,.08);
  }
  html,body{height:100%;}
  body{background:var(--bg);font-family:'IBM Plex Sans',sans-serif;color:var(--text);font-size:14px;line-height:1.6;-webkit-font-smoothing:antialiased;}
  ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:var(--bg);}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px;}

  .login-wrap{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;}
  .login-left{background:var(--navy);display:flex;flex-direction:column;justify-content:space-between;padding:48px;position:relative;overflow:hidden;}
  .ll-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 10% 90%,rgba(26,111,181,.4) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 90% 10%,rgba(14,138,122,.25) 0%,transparent 55%);}
  .ll-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);background-size:32px 32px;}
  .ll-content{position:relative;z-index:1;}
  .l-brand{display:flex;align-items:center;gap:12px;margin-bottom:72px;}
  .l-brand-icon{width:42px;height:42px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;}
  .l-brand-name{font-family:'Libre Baskerville',serif;font-size:20px;color:#fff;}
  .l-tagline{font-family:'Libre Baskerville',serif;font-size:34px;line-height:1.25;color:#fff;margin-bottom:20px;}
  .l-tagline em{font-style:italic;color:rgba(255,255,255,.55);}
  .l-desc{font-size:14px;color:rgba(255,255,255,.5);line-height:1.75;max-width:340px;}
  .l-features{position:relative;z-index:1;display:flex;flex-direction:column;gap:11px;}
  .l-feat{display:flex;align-items:center;gap:10px;font-size:13px;color:rgba(255,255,255,.55);}
  .f-dot{width:6px;height:6px;border-radius:50%;background:rgba(14,138,122,.9);flex-shrink:0;}
  .login-right{background:var(--bg2);display:flex;align-items:center;justify-content:center;padding:48px;}
  .lf-wrap{width:100%;max-width:380px;}
  .lf-title{font-family:'Libre Baskerville',serif;font-size:26px;color:var(--navy);margin-bottom:6px;}
  .lf-sub{font-size:14px;color:var(--text2);margin-bottom:36px;}

  .fg{margin-bottom:20px;}
  .fl{display:block;font-size:11.5px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--text2);margin-bottom:7px;}
  .fi{width:100%;background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:11px 14px;color:var(--text);font-family:'IBM Plex Sans',sans-serif;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s,background .2s;}
  .fi:focus{border-color:var(--blue);background:#fff;box-shadow:0 0 0 3px rgba(26,111,181,.1);}
  .fi::placeholder{color:var(--text3);}
  select.fi{appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238896aa' d='M6 8L1 3h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px;}
  textarea.fi{resize:vertical;min-height:80px;}
  .btn-login{width:100%;padding:12px;background:var(--navy);border:none;border-radius:8px;color:#fff;font-family:'IBM Plex Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;margin-top:4px;transition:background .2s,transform .1s;}
  .btn-login:hover{background:var(--navy2);transform:translateY(-1px);}
  .l-err{background:var(--red-lt);border:1px solid rgba(192,57,43,.2);border-radius:8px;padding:10px 14px;color:var(--red);font-size:13px;margin-bottom:18px;}
  .demo-hint{margin-top:20px;font-size:12px;color:var(--text3);text-align:center;padding:12px;background:var(--bg);border-radius:8px;border:1px solid var(--border);}
  .demo-hint strong{color:var(--text2);}

  .app-layout{display:grid;grid-template-columns:220px 1fr;min-height:100vh;}
  .sidebar{background:var(--navy);display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;}
  .sb-hdr{padding:22px 20px 18px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:6px;}
  .sb-brand{display:flex;align-items:center;gap:10px;}
  .sb-icon{width:34px;height:34px;background:rgba(255,255,255,.12);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;}
  .sb-name{font-family:'Libre Baskerville',serif;font-size:17px;color:#fff;}
  .nav-lbl{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.28);padding:14px 20px 5px;}
  .nav-item{display:flex;align-items:center;gap:10px;padding:10px 20px;color:rgba(255,255,255,.52);font-size:13.5px;font-weight:500;cursor:pointer;transition:all .15s;border:none;background:none;width:100%;text-align:left;font-family:'IBM Plex Sans',sans-serif;border-left:3px solid transparent;margin-bottom:1px;}
  .nav-item:hover{color:rgba(255,255,255,.85);background:rgba(255,255,255,.05);}
  .nav-item.active{color:#fff;background:rgba(26,111,181,.25);border-left-color:var(--blue);}
  .n-ico{font-size:15px;width:18px;text-align:center;}
  .sb-bot{margin-top:auto;padding:16px;border-top:1px solid rgba(255,255,255,.08);}
  .u-chip{display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,.07);border-radius:8px;}
  .u-av{width:32px;height:32px;background:var(--blue);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0;}
  .u-name{font-weight:600;color:#fff;font-size:13px;}
  .u-role{color:rgba(255,255,255,.38);font-size:11px;}

  .topbar{background:var(--bg2);border-bottom:1px solid var(--border);padding:0 32px;height:54px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;}
  .tb-bc{font-size:13px;color:var(--text2);display:flex;align-items:center;gap:6px;}
  .tb-bc strong{color:var(--text);font-weight:600;}
  .tb-r{display:flex;align-items:center;gap:16px;}
  .tb-date{font-size:12px;color:var(--text3);}
  .s-pill{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:var(--teal-lt);border-radius:20px;font-size:11px;font-weight:600;color:var(--teal);border:1px solid rgba(14,138,122,.15);}
  .s-dot{width:6px;height:6px;border-radius:50%;background:var(--teal);}

  .main-wrap{display:flex;flex-direction:column;min-height:100vh;background:var(--bg);}
  .main-content{padding:28px 32px;flex:1;}
  .pg-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;}
  .pg-title{font-family:'Libre Baskerville',serif;font-size:24px;color:var(--navy);line-height:1.2;}
  .pg-sub{color:var(--text2);font-size:13px;margin-top:3px;}

  .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;}
  .sc{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:18px 20px;box-shadow:var(--shadow);}
  .sc-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
  .sc-lbl{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--text3);}
  .sc-ico{font-size:17px;}
  .sc-val{font-family:'Libre Baskerville',serif;font-size:28px;color:var(--navy);line-height:1;margin-bottom:4px;}
  .sc-chg{font-size:12px;color:var(--text3);}
  .sc-chg.up{color:var(--green);}
  .sc-chg.warn{color:var(--amber);}
  .sc-chg.alert{color:var(--red);}

  .card{background:var(--bg2);border:1px solid var(--border);border-radius:10px;overflow:hidden;box-shadow:var(--shadow);}
  .card-hdr{display:flex;align-items:center;justify-content:space-between;padding:15px 22px;border-bottom:1px solid var(--border);}
  .card-title{font-size:13.5px;font-weight:600;color:var(--navy);}
  .tw{overflow-x:auto;}
  table{width:100%;border-collapse:collapse;}
  th{padding:10px 20px;text-align:left;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--text3);background:var(--bg);border-bottom:1px solid var(--border);}
  td{padding:13px 20px;font-size:13.5px;border-bottom:1px solid var(--border);color:var(--text);vertical-align:middle;}
  tr:last-child td{border-bottom:none;}
  tr:hover td{background:#fafbfd;cursor:pointer;}

  .badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:11.5px;font-weight:600;}
  .badge::before{content:'';width:5px;height:5px;border-radius:50%;}
  .b-g{background:var(--green-lt);color:var(--green);border:1px solid rgba(14,122,85,.15);}  .b-g::before{background:var(--green);}
  .b-r{background:var(--red-lt);color:var(--red);border:1px solid rgba(192,57,43,.15);}      .b-r::before{background:var(--red);}
  .b-a{background:var(--amber-lt);color:var(--amber);border:1px solid rgba(180,83,9,.15);}   .b-a::before{background:var(--amber);}
  .b-gr{background:var(--bg3);color:var(--text2);border:1px solid var(--border);}            .b-gr::before{background:var(--text3);}
  .b-bl{background:var(--blue-lt);color:var(--blue);border:1px solid rgba(26,111,181,.15);} .b-bl::before{background:var(--blue);}

  .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:7px;font-family:'IBM Plex Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;border:none;}
  .btn-nv{background:var(--navy);color:#fff;} .btn-nv:hover{background:var(--navy2);transform:translateY(-1px);}
  .btn-ot{background:#fff;color:var(--navy);border:1.5px solid var(--border2);} .btn-ot:hover{border-color:var(--navy);}
  .btn-lk{background:none;border:none;color:var(--blue);font-family:'IBM Plex Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;padding:0;} .btn-lk:hover{color:var(--navy);}
  .btn:disabled{opacity:.4;cursor:not-allowed;transform:none !important;}
  .back-btn{display:inline-flex;align-items:center;gap:6px;color:var(--text2);font-size:13px;cursor:pointer;margin-bottom:16px;background:none;border:none;font-family:'IBM Plex Sans',sans-serif;transition:color .15s;} .back-btn:hover{color:var(--navy);}

  .fc{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:22px 24px;margin-bottom:16px;box-shadow:var(--shadow);}
  .fc-hdr{display:flex;align-items:center;gap:10px;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid var(--border);}
  .fc-title{font-size:13.5px;font-weight:600;color:var(--navy);}
  .fc-badge{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:2px 7px;background:var(--blue-lt);color:var(--blue);border-radius:4px;}
  .fg2{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
  .fs{grid-column:1/-1;}
  .fa{display:flex;gap:10px;justify-content:flex-end;padding-top:8px;}
  .hint{font-size:12px;color:var(--text3);margin-top:8px;}

  .uz{border:2px dashed var(--border2);border-radius:10px;padding:36px;text-align:center;cursor:pointer;transition:all .2s;background:var(--bg);}
  .uz:hover,.uz.drag{border-color:var(--blue);background:var(--blue-lt);}
  .uz-ico{font-size:32px;margin-bottom:10px;}
  .uz-title{font-size:14px;font-weight:600;color:var(--navy);margin-bottom:5px;}
  .uz-sub{font-size:13px;color:var(--text2);}
  .fp{display:flex;align-items:center;gap:12px;background:var(--blue-lt);border:1.5px solid rgba(26,111,181,.2);border-radius:8px;padding:12px 16px;margin-top:12px;text-align:left;}
  .fn{font-size:13px;font-weight:600;color:var(--navy);}
  .fsz{font-size:12px;color:var(--text2);}

  .pw{max-width:500px;margin:48px auto;}
  .pc{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:56px 48px;text-align:center;box-shadow:var(--shadow2);}
  .spin{width:44px;height:44px;border:3px solid var(--bg3);border-top-color:var(--blue);border-radius:50%;margin:0 auto 24px;animation:spin .8s linear infinite;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .pt{font-family:'Libre Baskerville',serif;font-size:22px;color:var(--navy);margin-bottom:8px;}
  .ps{color:var(--text2);font-size:14px;}
  .sl{display:flex;flex-direction:column;gap:10px;max-width:290px;margin:28px auto 0;text-align:left;}
  .si{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text3);}
  .si.done{color:var(--green);} .si.act{color:var(--navy);font-weight:500;}
  .sd{width:8px;height:8px;border-radius:50%;background:var(--border2);flex-shrink:0;}
  .si.done .sd{background:var(--green);} .si.act .sd{background:var(--blue);animation:pulse 1s ease infinite;}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}

  .ph{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:20px 24px;margin-bottom:18px;display:flex;align-items:center;gap:18px;box-shadow:var(--shadow);}
  .p-av{width:50px;height:50px;background:var(--navy);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Libre Baskerville',serif;font-size:18px;color:#fff;flex-shrink:0;}
  .p-name{font-family:'Libre Baskerville',serif;font-size:20px;color:var(--navy);}
  .p-meta{display:flex;gap:18px;margin-top:5px;flex-wrap:wrap;}
  .p-mi{font-size:12.5px;color:var(--text2);}
  .rg{display:grid;grid-template-columns:1.15fr .85fr;gap:16px;margin-bottom:16px;}
  .cc{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:20px 22px;box-shadow:var(--shadow);}
  .ct{font-size:13.5px;font-weight:600;color:var(--navy);margin-bottom:3px;}
  .cs{font-size:12px;color:var(--text3);margin-bottom:18px;}
  .ml{display:flex;flex-direction:column;gap:13px;}
  .mr{display:grid;grid-template-columns:120px 1fr 52px;align-items:center;gap:10px;}
  .mn{font-size:12.5px;color:var(--text2);}
  .mb{height:5px;background:var(--bg3);border-radius:3px;overflow:hidden;}
  .mbi{height:100%;border-radius:3px;}
  .mv{font-size:12.5px;font-weight:700;text-align:right;}
  .sum{background:var(--blue-lt);border:1px solid rgba(26,111,181,.18);border-left:4px solid var(--blue);border-radius:8px;padding:16px 20px;margin-bottom:16px;}
  .sum-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:var(--blue);margin-bottom:8px;}
  .sum-txt{font-size:13.5px;color:var(--navy2);line-height:1.8;}

  .re{background:var(--bg);border:1.5px solid var(--border);border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:12.5px;color:var(--navy);min-height:220px;width:100%;resize:vertical;outline:none;line-height:1.8;}
  .re:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(26,111,181,.1);}

  .av-sm{width:32px;height:32px;border-radius:50%;background:var(--navy);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;}
  .tag-bl{display:inline-flex;align-items:center;padding:3px 9px;background:var(--blue-lt);border:1px solid rgba(26,111,181,.2);border-radius:4px;font-size:11px;font-weight:700;color:var(--blue);letter-spacing:.05em;text-transform:uppercase;}
  .sv{color:var(--green);font-size:13px;font-weight:600;}
  .fade-in{animation:fi .22s ease;}
  @keyframes fi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
`;

const PATIENTS = [
  {id:1,name:'Maria Gonzalez', dob:'1985-03-14',gender:'Female',mrn:'MRN-0041',lastVisit:'2026-02-18',status:'critical',reportCount:3,reportType:'Complete Blood Count'},
  {id:2,name:'James Whitfield',dob:'1972-07-29',gender:'Male',  mrn:'MRN-0042',lastVisit:'2026-02-20',status:'normal',  reportCount:1,reportType:'Lipid Panel'},
  {id:3,name:'Aisha Patel',    dob:'1990-11-05',gender:'Female',mrn:'MRN-0043',lastVisit:'2026-02-22',status:'warning', reportCount:2,reportType:'Thyroid Function'},
];
const REPORT = {
  summary:'Patient presents with elevated LDL cholesterol (168 mg/dL, ref <130) and borderline fasting glucose of 112 mg/dL indicating pre-diabetic range. CBC reveals mild normocytic anemia with hemoglobin of 10.8 g/dL. Thyroid and renal function markers within normal limits. Recommend dietary counseling, lipid management, and CBC follow-up in 8 weeks.',
  markers:[
    {name:'Hemoglobin',     value:10.8,unit:'g/dL', low:12.0,high:17.5,status:'low'},
    {name:'LDL Cholesterol',value:168, unit:'mg/dL',low:0,   high:130, status:'high'},
    {name:'HDL Cholesterol',value:42,  unit:'mg/dL',low:40,  high:90,  status:'normal'},
    {name:'Triglycerides',  value:198, unit:'mg/dL',low:0,   high:200, status:'normal'},
    {name:'TSH',            value:2.4, unit:'mIU/L',low:0.4, high:4.0, status:'normal'},
    {name:'Glucose',        value:112, unit:'mg/dL',low:70,  high:100, status:'high'},
    {name:'Creatinine',     value:0.9, unit:'mg/dL',low:0.6, high:1.2, status:'normal'},
    {name:'WBC',            value:7.2, unit:'K/uL', low:4.5, high:11.0,status:'normal'},
  ]
};
const SC = {high:'#c0392b',low:'#b45309',normal:'#0e7a55'};
const ini = n => n.split(' ').map(x=>x[0]).join('');
const age = d => new Date().getFullYear()-new Date(d).getFullYear();
const tod = () => new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});

function Badge({status}){
  const m={normal:['b-g','Normal'],warning:['b-a','Review'],critical:['b-r','Critical'],pending:['b-gr','Pending'],high:['b-r','High'],low:['b-a','Low']};
  const[c,l]=m[status]||m.normal;
  return <span className={`badge ${c}`}>{l}</span>;
}

function Login({onLogin}){
  const[email,setEmail]=useState('');
  const[pass,setPass]=useState('');
  const[err,setErr]=useState('');
  const go=()=>{
    if(email.trim()==='doctor@clinic.com'&&pass==='demo1234') onLogin({name:'Dr. Sarah Chen',role:'Chief of Medicine',initials:'SC'});
    else setErr('Invalid credentials. Please try again.');
  };
  return(
    <div className="login-wrap">
      <div className="login-left">
        <div className="ll-bg"/><div className="ll-grid"/>
        <div className="ll-content">
          <div className="l-brand"><div className="l-brand-icon">⚕</div><span className="l-brand-name">MedAnalytica</span></div>
          <div className="l-tagline">Clinical Report<br/><em>Intelligence</em></div>
          <p className="l-desc">AI-powered analysis of patient lab reports. Extract, visualize, and flag anomalies automatically across all report types.</p>
        </div>
        <div className="l-features">
          {['Automatic marker extraction from any lab report','Configurable clinical rules and thresholds','Patient record management with full history','Secure, HIPAA-ready infrastructure'].map((f,i)=>(
            <div key={i} className="l-feat"><div className="f-dot"/>{f}</div>
          ))}
        </div>
      </div>
      <div className="login-right">
        <div className="lf-wrap fade-in">
          <div className="lf-title">Welcome back</div>
          <p className="lf-sub">Sign in to your clinical dashboard</p>
          {err&&<div className="l-err">⚠ {err}</div>}
          <div className="fg"><label className="fl">Email Address</label><input className="fi" type="email" placeholder="doctor@clinic.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div className="fg"><label className="fl">Password</label><input className="fi" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&go()}/></div>
          <button className="btn-login" onClick={go}>Sign In</button>
          <div className="demo-hint"><strong>Demo:</strong> doctor@clinic.com &nbsp;/&nbsp; demo1234</div>
        </div>
      </div>
    </div>
  );
}

function Topbar({page}){
  const lbl={dashboard:'Dashboard','new-patient':'New Patient',settings:'Rules & Configuration','patient-report':'Patient Report',processing:'Analyzing Report'};
  return(
    <div className="topbar">
      <div className="tb-bc">MedAnalytica &rsaquo; <strong>{lbl[page]||page}</strong></div>
      <div className="tb-r"><div className="tb-date">{tod()}</div><div className="s-pill"><div className="s-dot"/>System Online</div></div>
    </div>
  );
}

function Dashboard({patients,onNew,onView}){
  const tot=patients.length,crit=patients.filter(p=>p.status==='critical').length;
  const warn=patients.filter(p=>p.status==='warning').length,reps=patients.reduce((a,p)=>a+p.reportCount,0);
  return(
    <div className="fade-in">
      <div className="pg-hdr"><div><div className="pg-title">Patient Overview</div><div className="pg-sub">Manage records and analyze incoming laboratory reports</div></div><button className="btn btn-nv" onClick={onNew}>+ New Patient</button></div>
      <div className="stats-row">
        <div className="sc"><div className="sc-top"><div className="sc-lbl">Total Patients</div><div className="sc-ico">👤</div></div><div className="sc-val">{tot}</div><div className="sc-chg up">↑ 2 this month</div></div>
        <div className="sc"><div className="sc-top"><div className="sc-lbl">Reports Analyzed</div><div className="sc-ico">📋</div></div><div className="sc-val">{reps}</div><div className="sc-chg">All patients</div></div>
        <div className="sc"><div className="sc-top"><div className="sc-lbl">Critical Flags</div><div className="sc-ico">🔴</div></div><div className="sc-val" style={{color:'var(--red)'}}>{crit}</div><div className="sc-chg alert">Needs review</div></div>
        <div className="sc"><div className="sc-top"><div className="sc-lbl">Under Review</div><div className="sc-ico">🟡</div></div><div className="sc-val" style={{color:'var(--amber)'}}>{warn}</div><div className="sc-chg warn">Follow-up needed</div></div>
      </div>
      <div className="card">
        <div className="card-hdr"><span className="card-title">Patient Records</span><span className="tag-bl">Live</span></div>
        <div className="tw">
          <table>
            <thead><tr><th>Patient</th><th>MRN</th><th>Report Type</th><th>Last Visit</th><th>Reports</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {patients.map(p=>(
                <tr key={p.id} onClick={()=>onView(p)}>
                  <td><div style={{display:'flex',alignItems:'center',gap:'10px'}}><div className="av-sm">{ini(p.name)}</div><div><div style={{fontWeight:'600',color:'var(--navy)'}}>{p.name}</div><div style={{fontSize:'12px',color:'var(--text3)'}}>{p.gender} · {age(p.dob)} yrs</div></div></div></td>
                  <td style={{fontFamily:'monospace',fontSize:'12.5px',color:'var(--text2)'}}>{p.mrn}</td>
                  <td style={{color:'var(--text2)'}}>{p.reportType}</td>
                  <td style={{color:'var(--text2)'}}>{p.lastVisit}</td>
                  <td><span className="badge b-gr">{p.reportCount}</span></td>
                  <td><Badge status={p.status}/></td>
                  <td><button className="btn-lk" onClick={e=>{e.stopPropagation();onView(p);}}>Open →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function NewPatient({onBack,onSubmit}){
  const[form,setForm]=useState({firstName:'',lastName:'',dob:'',gender:'',mrn:'',reportType:'',notes:''});
  const[file,setFile]=useState(null);
  const[drag,setDrag]=useState(false);
  const s=(k,v)=>setForm(f=>({...f,[k]:v}));
  return(
    <div className="fade-in">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="pg-hdr"><div><div className="pg-title">New Patient</div><div className="pg-sub">Complete patient details and upload their medical report for AI analysis</div></div></div>
      <div className="fc">
        <div className="fc-hdr"><div className="fc-title">Patient Information</div><div className="fc-badge">Step 1</div></div>
        <div className="fg2">
          <div className="fg"><label className="fl">First Name *</label><input className="fi" placeholder="John" value={form.firstName} onChange={e=>s('firstName',e.target.value)}/></div>
          <div className="fg"><label className="fl">Last Name *</label><input className="fi" placeholder="Smith" value={form.lastName} onChange={e=>s('lastName',e.target.value)}/></div>
          <div className="fg"><label className="fl">Date of Birth</label><input className="fi" type="date" value={form.dob} onChange={e=>s('dob',e.target.value)}/></div>
          <div className="fg"><label className="fl">Biological Sex</label><select className="fi" value={form.gender} onChange={e=>s('gender',e.target.value)}><option value="">Select...</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></div>
          <div className="fg"><label className="fl">Medical Record No.</label><input className="fi" placeholder="MRN-0044" value={form.mrn} onChange={e=>s('mrn',e.target.value)}/></div>
          <div className="fg"><label className="fl">Contact Phone</label><input className="fi" placeholder="(555) 000-0000"/></div>
        </div>
      </div>
      <div className="fc">
        <div className="fc-hdr"><div className="fc-title">Report Information</div><div className="fc-badge">Step 2</div></div>
        <div className="fg2">
          <div className="fg"><label className="fl">Report Type</label><select className="fi" value={form.reportType} onChange={e=>s('reportType',e.target.value)}><option value="">Select...</option><option>Complete Blood Count (CBC)</option><option>Lipid Panel</option><option>Thyroid Function Panel</option><option>Comprehensive Metabolic Panel</option><option>Urinalysis</option><option>Radiology / Imaging</option><option>Cardiology</option><option>Other</option></select></div>
          <div className="fg"><label className="fl">Visit / Collection Date</label><input className="fi" type="date"/></div>
          <div className="fg fs"><label className="fl">Clinical Notes</label><textarea className="fi" placeholder="Presenting symptoms, relevant history, physician observations..." value={form.notes} onChange={e=>s('notes',e.target.value)}/></div>
        </div>
      </div>
      <div className="fc">
        <div className="fc-hdr"><div className="fc-title">Upload Lab Report</div><div className="fc-badge">Step 3</div></div>
        <div className={`uz${drag?' drag':''}`} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);if(e.dataTransfer.files[0])setFile(e.dataTransfer.files[0]);}} onClick={()=>document.getElementById('fup').click()}>
          <input id="fup" type="file" accept=".pdf,.png,.jpg,.jpeg,.tiff" style={{display:'none'}} onChange={e=>{if(e.target.files[0])setFile(e.target.files[0]);}}/>
          {!file?(<><div className="uz-ico">📄</div><div className="uz-title">Drop report here or click to browse</div><div className="uz-sub">PDF, PNG, JPG or TIFF — AI extracts all values automatically</div></>):(
            <div className="fp"><span style={{fontSize:'24px'}}>{file.name.endsWith('.pdf')?'📕':'🖼️'}</span><div style={{flex:1}}><div className="fn">{file.name}</div><div className="fsz">{(file.size/1024/1024).toFixed(2)} MB · Ready</div></div><button style={{background:'none',border:'none',color:'var(--text3)',cursor:'pointer',fontSize:'20px',lineHeight:1}} onClick={e=>{e.stopPropagation();setFile(null);}}>×</button></div>
          )}
        </div>
        <p className="hint">⚡ Powered by Claude AI — markers, reference ranges, and flags extracted automatically.</p>
      </div>
      <div className="fa"><button className="btn btn-ot" onClick={onBack}>Cancel</button><button className="btn btn-nv" onClick={()=>onSubmit(form,file)} disabled={!file||!form.firstName||!form.lastName}>Run Analysis →</button></div>
    </div>
  );
}

function Processing({onDone}){
  const[step,setStep]=useState(0);
  const steps=['Uploading document securely...','Parsing document structure...','Extracting laboratory markers...','Applying clinical rules engine...','Generating report & visualizations...'];
  useEffect(()=>{const t=setInterval(()=>setStep(s=>{if(s>=steps.length-1){clearInterval(t);setTimeout(onDone,700);return s;}return s+1;}),950);return()=>clearInterval(t);},[]);
  return(
    <div className="fade-in pw">
      <div className="pc">
        <div className="spin"/>
        <div className="pt">Analyzing Report</div>
        <p className="ps">Please wait while AI extracts and interprets the clinical data...</p>
        <div className="sl">
          {steps.map((s,i)=>(
            <div key={i} className={`si${i<step?' done':i===step?' act':''}`}>
              <div className="sd"/>{i<step?'✓ ':''}{s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PatientReport({patient,onBack}){
  const r=REPORT;
  const cd=r.markers.map(m=>({name:m.name.split(' ').slice(-1)[0],fullName:m.name,value:m.value,pct:Math.min(Math.max(((m.value-m.low)/((m.high-m.low)||1))*100,0),140),status:m.status,unit:m.unit,low:m.low,high:m.high}));
  const CT=({active,payload})=>{
    if(!active||!payload?.length)return null;
    const d=payload[0].payload;
    return <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'8px',padding:'10px 14px',boxShadow:'var(--shadow2)',fontSize:'12.5px'}}><div style={{fontWeight:'600',color:'var(--navy)',marginBottom:'4px'}}>{d.fullName}</div><div style={{color:SC[d.status]}}>Value: <strong>{d.value} {d.unit}</strong></div><div style={{color:'var(--text2)'}}>Range: {d.low}–{d.high} {d.unit}</div></div>;
  };
  return(
    <div className="fade-in">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="ph">
        <div className="p-av">{ini(patient.name)}</div>
        <div style={{flex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'2px'}}><div className="p-name">{patient.name}</div><Badge status={patient.status}/></div>
          <div className="p-meta">
            <div className="p-mi">📋 {patient.mrn}</div>
            <div className="p-mi">📅 {patient.lastVisit}</div>
            <div className="p-mi">🧬 {patient.reportType}</div>
            <div className="p-mi">⚧ {patient.gender} · {age(patient.dob)} yrs</div>
          </div>
        </div>
        <button className="btn btn-ot" style={{fontSize:'12.5px'}}>⬇ Export PDF</button>
      </div>
      <div className="sum"><div className="sum-lbl">🤖 AI Clinical Summary</div><div className="sum-txt">{r.summary}</div></div>
      <div className="rg">
        <div className="cc">
          <div className="ct">Laboratory Values vs. Reference Range</div>
          <div className="cs">% of upper reference limit — dashed line = 100% (upper normal)</div>
          <ResponsiveContainer width="100%" height={248}>
            <BarChart data={cd} margin={{top:4,right:0,left:-22,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="name" tick={{fill:'var(--text3)',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'var(--text3)',fontSize:11}} axisLine={false} tickLine={false} unit="%"/>
              <Tooltip content={<CT/>}/>
              <ReferenceLine y={100} stroke="var(--border2)" strokeDasharray="5 3"/>
              <Bar dataKey="pct" radius={[4,4,0,0]} maxBarSize={34}>
                {cd.map((e,i)=><Cell key={i} fill={SC[e.status]} fillOpacity={0.72}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="cc">
          <div className="ct">Marker Detail</div>
          <div className="cs">Values with reference intervals</div>
          <div className="ml">
            {r.markers.map((m,i)=>{
              const pct=Math.min(Math.max(((m.value-m.low)/((m.high-m.low)||1))*100,0),100);
              return(
                <div key={i} className="mr">
                  <div className="mn">{m.name}</div>
                  <div><div className="mb"><div className="mbi" style={{width:`${pct}%`,background:SC[m.status],opacity:.7}}/></div><div style={{fontSize:'10.5px',color:'var(--text3)',marginTop:'2px'}}>{m.low}–{m.high} {m.unit}</div></div>
                  <div className="mv" style={{color:SC[m.status]}}>{m.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-hdr"><span className="card-title">Flagged Results</span><span className="badge b-r">{r.markers.filter(m=>m.status!=='normal').length} flags</span></div>
        <table>
          <thead><tr><th>Marker</th><th>Result</th><th>Reference Interval</th><th>Units</th><th>Flag</th><th>Clinical Note</th></tr></thead>
          <tbody>
            {r.markers.filter(m=>m.status!=='normal').map((m,i)=>(
              <tr key={i}>
                <td style={{fontWeight:'600',color:'var(--navy)'}}>{m.name}</td>
                <td style={{color:SC[m.status],fontWeight:'700'}}>{m.value}</td>
                <td style={{color:'var(--text2)',fontFamily:'monospace',fontSize:'12.5px'}}>{m.low} – {m.high}</td>
                <td style={{color:'var(--text3)'}}>{m.unit}</td>
                <td><Badge status={m.status}/></td>
                <td style={{color:'var(--text2)',fontSize:'12.5px'}}>{m.status==='high'?'Above upper reference limit':'Below lower reference limit'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Settings(){
  const dr=`# MedAnalytica — Clinical Extraction Rules
# Injected into AI prompt during analysis.

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
  const[rules,setRules]=useState(dr);
  const[saved,setSaved]=useState(false);
  return(
    <div className="fade-in">
      <div className="pg-hdr"><div><div className="pg-title">Rules & Configuration</div><div className="pg-sub">Customize how AI interprets and flags laboratory report values</div></div></div>
      <div className="fc">
        <div className="fc-hdr"><div className="fc-title">AI Extraction & Flagging Rules</div><div className="fc-badge">Required</div></div>
        <p style={{fontSize:'13px',color:'var(--text2)',marginBottom:'14px',lineHeight:'1.7'}}>Define which markers to extract per report type and set clinical thresholds. Rules are injected into the Claude AI prompt at analysis time.</p>
        <textarea className="re" value={rules} onChange={e=>setRules(e.target.value)} rows={18}/>
        <div className="fa" style={{marginTop:'14px'}}>{saved&&<span className="sv">✓ Rules saved</span>}<button className="btn btn-nv" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2500);}}>Save Rules</button></div>
      </div>
      <div className="fc">
        <div className="fc-hdr"><div className="fc-title">API & System Configuration</div><div className="fc-badge">Required</div></div>
        <div className="fg2">
          <div className="fg"><label className="fl">Anthropic API Key</label><input className="fi" type="password" placeholder="sk-ant-••••••••••••••••"/></div>
          <div className="fg"><label className="fl">AI Model</label><select className="fi"><option>claude-sonnet-4-6 (Recommended)</option><option>claude-opus-4-6 (Highest accuracy)</option></select></div>
          <div className="fg"><label className="fl">Institution / Clinic Name</label><input className="fi" placeholder="Sunrise Medical Center"/></div>
          <div className="fg"><label className="fl">Supabase Project URL</label><input className="fi" placeholder="https://xxxxxxxx.supabase.co"/></div>
          <div className="fg"><label className="fl">Supabase Anon Key</label><input className="fi" type="password" placeholder="eyJhbGci..."/></div>
        </div>
        <div className="fa"><button className="btn btn-nv">Save Configuration</button></div>
      </div>
    </div>
  );
}

export default function App(){
  const[user,setUser]=useState(null);
  const[view,setView]=useState('dashboard');
  const[patients,setPatients]=useState(PATIENTS);
  const[sel,setSel]=useState(null);
  const[pend,setPend]=useState(null);
  if(!user)return <><style>{styles}</style><Login onLogin={setUser}/></>;
  const sub=(form,file)=>{setPend(form);setView('processing');};
  const done=()=>{
    const p={id:patients.length+1,name:`${pend.firstName} ${pend.lastName}`,dob:pend.dob||'1990-01-01',gender:pend.gender||'Unknown',mrn:pend.mrn||`MRN-00${patients.length+44}`,lastVisit:new Date().toISOString().split('T')[0],status:'warning',reportCount:1,reportType:pend.reportType||'Blood Work'};
    setPatients(ps=>[p,...ps]);setSel(p);setView('patient-report');
  };
  const act=id=>view===id||(id==='dashboard'&&['processing','patient-report'].includes(view));
  const pg=()=>{
    switch(view){
      case 'dashboard':      return <Dashboard patients={patients} onNew={()=>setView('new-patient')} onView={p=>{setSel(p);setView('patient-report');}}/>;
      case 'new-patient':    return <NewPatient onBack={()=>setView('dashboard')} onSubmit={sub}/>;
      case 'processing':     return <Processing onDone={done}/>;
      case 'patient-report': return <PatientReport patient={sel} onBack={()=>setView('dashboard')}/>;
      case 'settings':       return <Settings/>;
      default:               return null;
    }
  };
  return(
    <>
      <style>{styles}</style>
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sb-hdr"><div className="sb-brand"><div className="sb-icon">⚕</div><span className="sb-name">MedAnalytica</span></div></div>
          <div className="nav-lbl">Navigation</div>
          {[{id:'dashboard',i:'▦',l:'Dashboard'},{id:'new-patient',i:'+',l:'New Patient'},{id:'settings',i:'⚙',l:'Rules & Config'}].map(n=>(
            <button key={n.id} className={`nav-item${act(n.id)?' active':''}`} onClick={()=>setView(n.id)}>
              <span className="n-ico">{n.i}</span>{n.l}
            </button>
          ))}
          <div className="sb-bot">
            <div className="u-chip"><div className="u-av">{user.initials}</div><div><div className="u-name">{user.name}</div><div className="u-role">{user.role}</div></div></div>
          </div>
        </aside>
        <div className="main-wrap">
          <Topbar page={view}/>
          <main className="main-content">{pg()}</main>
        </div>
      </div>
    </>
  );
}
