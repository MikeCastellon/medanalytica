# MedAnalytica — Clinical Report Intelligence

AI-powered platform for doctors to upload HRV and lab reports and instantly receive structured reports with graphs, CRI scores, quadrant placements, and clinical summaries.

**Stack:** React + Vite · Supabase (auth, database, storage) · Netlify (hosting + serverless functions) · OpenAI GPT-4o

---

## What It Does

1. Doctor uploads a patient's HRV or lab report (PDF/image)
2. Claude AI extracts all markers, calculates:
   - **CRI Score** (Cardiovascular Risk Index, 0–12) with pyramid visualization
   - **HRQ Quadrant** (Health Resiliency Quotient — Emotional Load vs Autonomic Regulation)
   - **CV Risk Quadrant** (cardiovascular system classification)
   - All individual lab markers with reference ranges and flags
3. A full visual report is generated instantly

---

## Quick Start (Local Dev)

### 1. Install dependencies
```bash
npm install
cd netlify/functions && npm install && cd ../..
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Fill in your Supabase and Anthropic keys
```

### 3. Set up Supabase
- Create a project at [supabase.com](https://supabase.com)
- Go to **Database > SQL Editor** and paste the contents of `supabase/migrations/001_initial_schema.sql`
- Get your **Project URL** and **anon key** from **Settings > API**
- Enable **Email Auth** in **Authentication > Providers**

### 4. Run locally with Netlify CLI
```bash
npm install -g netlify-cli
netlify dev
```
This starts both the Vite dev server and Netlify functions at `http://localhost:8888`.

---

## Deploy to Netlify

### Option A: Via GitHub (recommended)
1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select your repo, configure build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add environment variables in **Site settings > Environment variables**:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   OPENAI_API_KEY=sk-your-openai-key
   ```
5. Deploy! Netlify auto-deploys on every push to main.

### Option B: Netlify CLI
```bash
netlify deploy --prod
```

---

## Project Structure

```
MedicalDashboard/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Supabase auth login
│   │   ├── Dashboard.jsx      # Patient list + stats
│   │   ├── NewPatient.jsx     # Patient form + file upload
│   │   ├── Processing.jsx     # AI analysis pipeline
│   │   ├── PatientReport.jsx  # Full report: CRI, quadrants, charts
│   │   ├── Settings.jsx       # Clinical rules + config
│   │   ├── Badge.jsx          # Status badge
│   │   └── Topbar.jsx         # Navigation bar
│   ├── lib/
│   │   ├── supabase.js        # Supabase client
│   │   └── utils.js           # Helpers, quadrant metadata
│   ├── App.jsx                # Root component + routing
│   ├── App.css                # All component styles
│   └── index.css              # Global styles + CSS vars
├── netlify/
│   └── functions/
│       └── analyze-report.js  # Claude AI analysis (server-side)
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # DB schema + RLS policies
├── netlify.toml               # Netlify build config
├── vite.config.js
└── .env.example
```

---

## Demo Mode

Without Supabase/Anthropic keys configured, the app runs in **demo mode**:
- Login: `doctor@clinic.com` / `demo1234`
- Uploads use mock AI-extracted data (realistic HRV report)
- No data is saved to any database

---

## Environment Variables

| Variable | Where Used | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | Frontend | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Frontend | Supabase public anon key |
| `ANTHROPIC_API_KEY` | Netlify Function only | Claude API key (never exposed to browser) |

---

## Adding a Doctor Account

In Supabase Dashboard → **Authentication → Users → Invite user**, or use the Supabase auth API to create accounts. The DB trigger automatically creates a `doctor_profiles` row on signup.

---

## Supported Report Types

- **HRV Analysis** — extracts SDNN, RMSSD, LF/HF, calculates CRI + quadrants
- **Complete Blood Count (CBC)**
- **Lipid Panel**
- **Thyroid Function Panel**
- **Comprehensive Metabolic Panel**
- **Cardiology**
- Any other lab report (Claude extracts whatever markers are present)
