/**
 * KITKAT RICH VISUAL COMPONENT — WARM & CHARMING ILLUSTRATION
 * Soft milk chocolate and warm ruby packaging with antique gold accents.
 */

export function renderKitKatSvg(options = {}) {
  const { width = 240, height = 150, id = 'kitkat-svg' } = options;

  return `
    <svg id="${id}" viewBox="0 0 320 200" width="${width}" height="${height}" class="kitkat-graphic anim-float" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="KitKat Rich Chocolate Bar">
      <defs>
        <!-- Warm Ruby Wrapper Gradient -->
        <linearGradient id="kitkatRuby" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#b82e3d" />
          <stop offset="50%" stop-color="#941e2b" />
          <stop offset="100%" stop-color="#6e121d" />
        </linearGradient>

        <!-- Antique Gold Ribbon -->
        <linearGradient id="richGoldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#a6832b" />
          <stop offset="35%" stop-color="#f5e6b8" />
          <stop offset="70%" stop-color="#c8a248" />
          <stop offset="100%" stop-color="#8c6a1e" />
        </linearGradient>
      </defs>

      <!-- Main Wrapper -->
      <g transform="translate(20, 20)">
        <!-- Wrapper Body -->
        <rect x="10" y="15" width="260" height="120" rx="8" fill="url(#kitkatRuby)" />

        <!-- Crimped Left Edge -->
        <path d="M 10 15 L 4 20 L 10 25 L 4 30 L 10 35 L 4 40 L 10 45 L 4 50 L 10 55 L 4 60 L 10 65 L 4 70 L 10 75 L 4 80 L 10 85 L 4 90 L 10 95 L 4 100 L 10 105 L 4 110 L 10 115 L 4 120 L 10 125 L 4 130 L 10 135 Z" fill="#751520" />

        <!-- Crimped Right Edge -->
        <path d="M 270 15 L 276 20 L 270 25 L 276 30 L 270 35 L 276 40 L 270 45 L 276 50 L 270 55 L 276 60 L 270 65 L 276 70 L 270 75 L 276 80 L 270 85 L 276 90 L 270 95 L 276 100 L 270 105 L 276 110 L 270 115 L 276 120 L 270 125 L 276 130 L 270 135 Z" fill="#520d14" />

        <!-- Gold 'Rich' Ribbon -->
        <rect x="10" y="82" width="260" height="28" fill="url(#richGoldRibbon)" opacity="0.95" />

        <!-- Light Sheen -->
        <path d="M 40 15 L 80 15 L 45 135 L 5 135 Z" fill="#ffffff" opacity="0.07" />

        <!-- KitKat Oval Emblem -->
        <ellipse cx="140" cy="50" rx="52" ry="24" fill="#ffffff" stroke="#a62432" stroke-width="2" />
        
        <!-- KitKat Text -->
        <text x="140" y="57" 
              font-family="'Manrope', Arial, sans-serif" 
              font-weight="900" 
              font-style="italic" 
              font-size="20" 
              fill="#a62432" 
              text-anchor="middle" 
              letter-spacing="-0.5px">KitKat</text>

        <!-- 'RICH' Elegant Gold Tag -->
        <text x="140" y="101" 
              font-family="'Fraunces', Georgia, serif" 
              font-weight="600" 
              font-size="14" 
              fill="#2e1a12" 
              text-anchor="middle" 
              letter-spacing="3.5px">RICH</text>

        <!-- Subtitle -->
        <text x="140" y="124" 
              font-family="'Manrope', sans-serif" 
              font-weight="600" 
              font-size="8" 
              fill="#faebd7" 
              text-anchor="middle" 
              letter-spacing="1.2px">CRISPY WAFER IN RICH CHOCOLATE</text>
      </g>
    </svg>
  `;
}
