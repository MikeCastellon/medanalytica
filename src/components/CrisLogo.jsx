/**
 * CrisLogo — SVG heart + circuit icon with "CRIS GOLD™" text to the right.
 * Props:
 *   size      — icon height in px (default 44)
 *   textColor — color for the text (default '#ffffff' for dark backgrounds)
 *   subColor  — color for the sub-label (default 'rgba(255,255,255,.45)')
 *   showSub   — show "by MedAnalytica" sub-line (default false)
 *   customUrl — if set, use this image URL instead of the SVG (from Settings)
 */
export default function CrisLogo({
  size = 44,
  textColor = '#ffffff',
  subColor = 'rgba(255,255,255,.45)',
  showSub = false,
  customUrl = null,
}) {
  const serif = "'Libre Baskerville', Georgia, serif";
  const sans  = "'IBM Plex Sans', system-ui, sans-serif";

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Icon */}
      {customUrl ? (
        <img
          src={customUrl}
          alt="CRIS GOLD™ Logo"
          style={{ height: size, width: size, objectFit: 'contain', borderRadius: 6, flexShrink: 0 }}
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          {/* Gold background circle */}
          <circle cx="40" cy="40" r="40" fill="#7a5209" />

          {/* Outer gold glow ring */}
          <circle cx="40" cy="40" r="36" stroke="#f5c842" strokeWidth="1.2" strokeOpacity="0.45" fill="none" />

          {/* Heart shape — outer shell */}
          <path
            d="M40 62 C40 62 12 46 12 28 C12 20 18 14 26 14 C31 14 36 17 40 21 C44 17 49 14 54 14 C62 14 68 20 68 28 C68 46 40 62 40 62Z"
            fill="#3d2800"
            stroke="#f5c842"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Central golden spine */}
          <line x1="40" y1="20" x2="40" y2="58" stroke="#d4a017" strokeWidth="1.8" strokeLinecap="round" />

          {/* Golden glow on spine */}
          <line x1="40" y1="20" x2="40" y2="58" stroke="#f5c842" strokeWidth="0.6" strokeLinecap="round" strokeOpacity="0.6" />

          {/* Left circuit branches */}
          <line x1="40" y1="29" x2="27" y2="29" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="27" y1="29" x2="27" y2="35" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="27" y1="35" x2="21" y2="35" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.8" />

          <line x1="40" y1="38" x2="25" y2="38" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="25" y1="38" x2="25" y2="44" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.8" />

          <line x1="40" y1="47" x2="30" y2="47" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="30" y1="47" x2="30" y2="51" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.6" />

          {/* Right circuit branches */}
          <line x1="40" y1="29" x2="53" y2="29" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="53" y1="29" x2="53" y2="35" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="53" y1="35" x2="59" y2="35" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.8" />

          <line x1="40" y1="38" x2="55" y2="38" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="55" y1="38" x2="55" y2="44" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.8" />

          <line x1="40" y1="47" x2="50" y2="47" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="50" y1="47" x2="50" y2="51" stroke="#d4a017" strokeWidth="1" strokeOpacity="0.6" />

          {/* Node dots — left */}
          <circle cx="21" cy="35" r="1.8" fill="#d4a017" opacity="0.9" />
          <circle cx="27" cy="29" r="1.5" fill="#d4a017" opacity="0.7" />
          <circle cx="25" cy="44" r="1.5" fill="#d4a017" opacity="0.7" />
          <circle cx="30" cy="51" r="1.2" fill="#d4a017" opacity="0.5" />

          {/* Node dots — right */}
          <circle cx="59" cy="35" r="1.8" fill="#d4a017" opacity="0.9" />
          <circle cx="53" cy="29" r="1.5" fill="#d4a017" opacity="0.7" />
          <circle cx="55" cy="44" r="1.5" fill="#d4a017" opacity="0.7" />
          <circle cx="50" cy="51" r="1.2" fill="#d4a017" opacity="0.5" />

          {/* Center glow dot */}
          <circle cx="40" cy="38" r="3" fill="#f5c842" opacity="0.9" />
          <circle cx="40" cy="38" r="5" fill="#f5c842" opacity="0.15" />

          {/* Top sparkle dot */}
          <circle cx="40" cy="20" r="1.5" fill="#f5c842" opacity="0.7" />
          {/* Bottom tip sparkle */}
          <circle cx="40" cy="58" r="1.2" fill="#f5c842" opacity="0.5" />
        </svg>
      )}

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.1 }}>
        <span style={{
          fontFamily: serif,
          fontSize: size * 0.38,
          fontWeight: 700,
          color: textColor,
          letterSpacing: '-.01em',
          whiteSpace: 'nowrap',
        }}>
          CRIS GOLD™
        </span>
        {showSub && (
          <span style={{
            fontFamily: sans,
            fontSize: size * 0.22,
            fontWeight: 500,
            color: subColor,
            letterSpacing: '.02em',
            marginTop: 2,
          }}>
            by MedAnalytica
          </span>
        )}
      </div>
    </div>
  );
}
