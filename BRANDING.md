# MedAnalytica / CRIS GOLD™ — Branding Guidelines

---

## Brand Names

- **Platform:** MedAnalytica
- **Product:** CRIS GOLD™ — always ALL CAPS, always with ™
- **Never:** "Cris Gold" / "cris gold" / "CRIS Gold"
- **Sub-label:** "by MedAnalytica"
- **Taglines:**
  - "Clinical Reports. Generated in Minutes."
  - "AI-Powered Clinical Reporting · HIPAA Compliant"

---

## Typography

| Role | Font | Weight |
|---|---|---|
| Headings / Display / Logo text | Libre Baskerville (serif) | 700 Bold |
| Body / UI / Labels / Nav | IBM Plex Sans (sans-serif) | 400 / 500 / 600 |

Loaded via Google Fonts in `src/index.css`.

CSS reference:
```css
font-family: 'Libre Baskerville', Georgia, serif;
font-family: 'IBM Plex Sans', system-ui, sans-serif;
```

---

## Color Palette

| CSS Variable | Hex | Usage |
|---|---|---|
| `--navy` | `#0f2744` | Primary dark — sidebar, nav, headings |
| `--navy2` | `#1a3a5c` | Secondary dark — body text on light bg |
| `--blue` | `#1a6fb5` | Primary CTA buttons, active states, links |
| `--blue-lt` | `#e8f2fc` | Light blue backgrounds, hover fills |
| `--teal` | `#0e8a7a` | Accent — borders, icon highlights, success |
| `--teal-lt` | `#e4f5f2` | Light teal backgrounds, info panels |
| `--green` | `#0e7a55` | Healthy / normal status indicators |
| `--amber` | `#b45309` | Warning states |
| `--amber-lt` | `#fffbeb` | Warning panel backgrounds |
| `--red` | `#c0392b` | Critical flags, danger states |
| `--red-lt` | `#fef2f2` | Critical panel backgrounds |
| `--bg` | `#f4f6f9` | Page / app background |
| `--bg3` | `#eef1f5` | Card fills, subtle section backgrounds |
| `--border` | `#dde2ea` | Borders and dividers |
| `--text2` | (medium gray) | Secondary body text |
| `--text3` | (light gray) | Labels, captions, placeholders |

### Logo accent colors (SVG only)
| Role | Hex |
|---|---|
| Gold branches / circuit lines | `#d4a017` |
| Gold glow / sparkle | `#f5c842` |
| Icon background circle | `#0a1628` |
| Teal ring stroke | `#0e8a7a` |

---

## Logo — CRIS GOLD™

Component: `src/components/CrisLogo.jsx`

**Props:**
```jsx
<CrisLogo
  size={44}              // icon height in px
  textColor="#ffffff"    // text color (default white for dark bg)
  subColor="rgba(255,255,255,.45)"
  showSub={true}         // shows "by MedAnalytica" sub-label
  customUrl={null}       // custom clinic logo URL (from Settings)
/>
```

**Icon anatomy:**
- Dark navy circle background (`#0a1628`)
- Teal outer glow ring (`#0e8a7a`, 35% opacity)
- Heart shape fill (`#1a3a5c`) with teal stroke
- Central gold spine (`#d4a017`)
- Left + right circuit branches with node dots
- Center glow dot (`#f5c842`)

**Text:**
- "CRIS GOLD™" — Libre Baskerville Bold
- "by MedAnalytica" — IBM Plex Sans 500, `rgba(255,255,255,.45)`

**Usage rules:**
- Dashboard sidebar: always shown with `showSub={true}`
- Landing page: uses its own independent branding (not this component)
- Practitioners can replace the icon with their own clinic logo via Settings → Dashboard Logo

---

## UI Patterns

### Spacing & Shape
- Card border radius: `8px`
- Input / button border radius: `6px`
- Pill / badge border radius: `20px`
- Standard card padding: `18px 22px`
- Section header margin-bottom: `8px`

### Section Headers (inside cards)
```css
font-size: 10.5px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: .07em;
color: var(--text3);
```

### Badges
| Class | Color | Use |
|---|---|---|
| `b-bl` | Blue | Info / quadrant protocol |
| `b-r` | Red | Critical flags |
| `b-g` | Green | Normal / healthy |
| `b-a` | Amber | Warning |

### Buttons
```jsx
// Primary (navy fill)
<button className="btn btn-nv">Save</button>

// Secondary (outline)
<button className="btn btn-ot">Cancel</button>
```

### Cards
```jsx
// Standard clinical card
<div className="cc">
  <div className="ct">Card Title</div>
  <div className="cs">Card subtitle</div>
  ...
</div>

// Form card
<div className="fc">
  <div className="fc-hdr">
    <div className="fc-title">Section Title</div>
    <div className="fc-badge">Step 1</div>
  </div>
  ...
</div>
```

---

## Voice & Tone

| Context | Tone | Example |
|---|---|---|
| Marketing / Landing | Authoritative, aspirational | "Transform your practice with AI-powered clinical reporting." |
| Dashboard / UI labels | Clinical, precise, minimal | "ELI — Emotional Load Index (0–100)" |
| AI clinical summaries | Practitioner-facing, specific | "SDNN of 34 ms indicates reduced autonomic resilience." |
| Patient summaries | Plain language, warm, zero jargon | "Your body's stress response system is working harder than usual." |
| Disclaimers | Formal legal/clinical | "CRIS GOLD™ is a clinical decision-support tool intended solely for use by licensed healthcare professionals." |

**Always:**
- Refer to users as **"practitioners"** or **"licensed healthcare professionals"**
- Refer to outputs as **"clinical decision-support"** — never "diagnosis" or "prescription"
- Drainage is **always listed first** in therapeutic recommendations
- Emvita and Chavita are **always paired** — never one without the other

**Never:**
- Write "CRIS Gold", "cris gold", or omit the ™
- Claim AI can diagnose or replace clinical judgment
- Include CASP unless device-measured on the document
- Show the CRIS GOLD™ logo component on the public landing page

---

## HIPAA & Compliance Language

Every patient report must include:
> **HIPAA Protected Health Information.** This report contains PHI and is intended solely for the authorized treating practitioner. Unauthorized access, disclosure, or transmission is prohibited under HIPAA (45 CFR §§ 164.502–164.514).

Disclaimer footer (abbreviated):
> CRIS GOLD™ is a clinical decision-support tool. It is not a medical device, does not diagnose disease, and does not replace clinical judgment. The treating practitioner bears sole responsibility for all patient care decisions.

---

## File Locations

| Asset | Path |
|---|---|
| Logo component | `src/components/CrisLogo.jsx` |
| Global CSS variables + fonts | `src/index.css` |
| App-wide styles | `src/App.css` |
| Protocol / product library | `src/lib/protocols.js` |
| Quadrant definitions | `src/lib/utils.js` → `CRISGOLD_QUADRANTS` |
