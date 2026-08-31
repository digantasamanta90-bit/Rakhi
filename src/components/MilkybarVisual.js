/**
 * MILKYBAR VISUAL COMPONENT — CLEAN & PLAYFUL ILLUSTRATION & INLINE ICONS
 * Soft white chocolate and cheerful yellow wrapper with royal blue accents.
 */

/**
 * Detailed SVG illustration of a Milkybar chocolate bar.
 * @param {Object} options
 * @param {number} [options.width=240]
 * @param {number} [options.height=150]
 * @param {string} [options.id='milkybar-svg']
 * @returns {string} SVG HTML string
 */
export function renderMilkybarSvg(options = {}) {
  const { width = 240, height = 150, id = 'milkybar-svg' } = options;

  return `
    <svg id="${id}" viewBox="0 0 320 200" width="${width}" height="${height}" class="milkybar-graphic anim-float" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Milkybar White Chocolate Bar">
      <defs>
        <!-- Cheerful Milkybar Yellow Wrapper Gradient -->
        <linearGradient id="mbYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="25%" stop-color="#facc15" />
          <stop offset="85%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#ca8a04" />
        </linearGradient>

        <!-- Royal Blue Ribbon Gradient -->
        <linearGradient id="mbBlueRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1e40af" />
          <stop offset="50%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>

        <!-- Creamy White Chocolate Shading -->
        <linearGradient id="mbWhiteChoc" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="70%" stop-color="#fefce8" />
          <stop offset="100%" stop-color="#fef08a" />
        </linearGradient>

        <filter id="mbSoftShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="rgba(0,0,0,0.35)" />
        </filter>
      </defs>

      <!-- Main Milkybar Group -->
      <g transform="translate(20, 20)" filter="url(#mbSoftShadow)">
        <!-- Exposed White Chocolate Bar Segment at Top Right -->
        <rect x="180" y="8" width="80" height="40" rx="4" fill="url(#mbWhiteChoc)" stroke="#fef08a" stroke-width="1.5" />
        <!-- Chocolate Chunks Grid Lines -->
        <line x1="220" y1="8" x2="220" y2="48" stroke="#fde047" stroke-width="1.5" />
        <line x1="180" y1="28" x2="260" y2="28" stroke="#fde047" stroke-width="1.5" />

        <!-- Main Wrapper Body -->
        <rect x="10" y="18" width="260" height="120" rx="10" fill="url(#mbYellowGrad)" stroke="#eab308" stroke-width="1.5" />

        <!-- Crimped Left Edge -->
        <path d="M 10 18 L 4 23 L 10 28 L 4 33 L 10 38 L 4 43 L 10 48 L 4 53 L 10 58 L 4 63 L 10 68 L 4 73 L 10 78 L 4 83 L 10 88 L 4 93 L 10 98 L 4 103 L 10 108 L 4 113 L 10 118 L 4 123 L 10 128 L 4 133 L 10 138 Z" fill="#ca8a04" />

        <!-- Crimped Right Edge -->
        <path d="M 270 18 L 276 23 L 270 28 L 276 33 L 270 38 L 276 43 L 270 48 L 276 53 L 270 58 L 276 63 L 270 68 L 276 73 L 270 78 L 276 83 L 270 88 L 276 93 L 270 98 L 276 103 L 270 108 L 276 113 L 270 118 L 276 123 L 270 128 L 276 133 L 270 138 Z" fill="#a16207" />

        <!-- Soft Milk Splash / Cloud Wave Motif -->
        <path d="M 10 95 Q 60 75 110 90 T 210 85 T 270 92 L 270 138 L 10 138 Z" fill="#ffffff" opacity="0.92" />

        <!-- Royal Blue Brand Banner -->
        <rect x="25" y="38" width="230" height="38" rx="6" fill="url(#mbBlueRibbon)" stroke="rgba(255,255,255,0.4)" stroke-width="1" />

        <!-- Milkybar Bold Brand Typography -->
        <text x="140" y="64" 
              font-family="'Manrope', Arial, sans-serif" 
              font-weight="900" 
              font-size="22" 
              fill="#ffffff" 
              text-anchor="middle" 
              letter-spacing="0.8px"
              style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));">Milkybar</text>

        <!-- Creamy White Chocolate Subtext in Cloud Area -->
        <text x="140" y="112" 
              font-family="'Fraunces', Georgia, serif" 
              font-weight="700" 
              font-size="12" 
              fill="#1e3a8a" 
              text-anchor="middle" 
              letter-spacing="1.5px">CREAMY WHITE CHOCOLATE</text>

        <text x="140" y="128" 
              font-family="'Manrope', sans-serif" 
              font-weight="600" 
              font-size="8" 
              fill="#3b82f6" 
              text-anchor="middle" 
              letter-spacing="1px">WITH GOODNESS OF MILK</text>

        <!-- Subtle Top Sheen Highlight -->
        <path d="M 25 22 L 95 22 L 75 130 L 15 130 Z" fill="#ffffff" opacity="0.12" />
      </g>
    </svg>
  `;
}

/**
 * Lightweight, ultra-crisp inline SVG icon (emoji-sized, ~1.1em).
 * @param {Object} options
 * @param {number} [options.size=18]
 * @param {string} [options.className='milkybar-icon-inline']
 * @returns {string} SVG HTML string
 */
export function renderMilkybarIconSvg(options = {}) {
  const { size = 18, className = 'milkybar-icon-inline' } = options;

  return `<span class="${className}" style="display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;margin:0 2px;position:relative;top:-1px;line-height:1;" aria-hidden="true"><svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Milkybar"><rect x="5" y="2" width="14" height="6" rx="2" fill="#FFFDF5" stroke="#FDE047" stroke-width="0.8"/><line x1="12" y1="2" x2="12" y2="7" stroke="#FEF08A" stroke-width="0.8"/><rect x="2" y="6" width="20" height="15" rx="3.5" fill="#FACC15" stroke="#EAB308" stroke-width="0.9"/><path d="M 2 15 Q 7 12 12 14 T 22 13 L 22 21 L 2 21 Z" fill="#FFFDF5" opacity="0.95"/><rect x="4" y="9" width="16" height="5" rx="1.5" fill="#2563EB"/><circle cx="8" cy="11.5" r="1" fill="#FFFFFF"/><rect x="10.5" y="10.5" width="5.5" height="2" rx="0.8" fill="#FFFFFF"/><path d="M 2 7 L 0.8 9 L 2 11 L 0.8 13 L 2 15 L 0.8 17 L 2 19 Z" fill="#CA8A04"/><path d="M 22 7 L 23.2 9 L 22 11 L 23.2 13 L 22 15 L 23.2 17 L 22 19 Z" fill="#A16207"/></svg></span>`;
}

/**
 * Replaces chocolate emojis in a string with the custom Milkybar icon SVG.
 * @param {string} text 
 * @param {number} [size=18]
 * @returns {string}
 */
export function replaceMilkybarIcon(text, size = 18) {
  if (!text || typeof text !== 'string') return text;
  return text.replace(/🍫/g, renderMilkybarIconSvg({ size }));
}

