/**
 * KITKAT RICH VISUAL COMPONENT
 * Stylized vector representation of the physical KitKat Rich chocolate gift.
 */

export function renderKitKatSvg(options = {}) {
  const { width = 280, height = 180, id = 'kitkat-svg' } = options;

  return `
    <svg id="${id}" viewBox="0 0 320 200" width="${width}" height="${height}" class="kitkat-graphic anim-float" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="KitKat Rich Chocolate Bar">
      <defs>
        <!-- Rich Chocolate / Red Wrapper Gradients -->
        <linearGradient id="kitkatRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#b00b13" />
          <stop offset="35%" stop-color="#d61a23" />
          <stop offset="70%" stop-color="#8a040b" />
          <stop offset="100%" stop-color="#4d0105" />
        </linearGradient>

        <!-- Gold Foil Band Gradient -->
        <linearGradient id="richGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#997a23" />
          <stop offset="30%" stop-color="#fdf3c6" />
          <stop offset="60%" stop-color="#d4af37" />
          <stop offset="100%" stop-color="#7a5d10" />
        </linearGradient>

        <filter id="chocoShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.6" />
        </filter>
      </defs>

      <!-- Main Chocolate Bar Wrapper Body -->
      <g filter="url(#chocoShadow)" transform="translate(20, 20)">
        <!-- Outer Wrapper with jagged crimped edges -->
        <path d="M 10 15 
                 L 270 15 
                 L 270 135 
                 L 10 135 Z" 
              fill="url(#kitkatRed)" 
              rx="6" />

        <!-- Crimped Left Edge -->
        <path d="M 10 15 L 2 20 L 10 25 L 2 30 L 10 35 L 2 40 L 10 45 L 2 50 L 10 55 L 2 60 L 10 65 L 2 70 L 10 75 L 2 80 L 10 85 L 2 90 L 10 95 L 2 100 L 10 105 L 2 110 L 10 115 L 2 120 L 10 125 L 2 130 L 10 135 Z" fill="#8a040b" />

        <!-- Crimped Right Edge -->
        <path d="M 270 15 L 278 20 L 270 25 L 278 30 L 270 35 L 278 40 L 270 45 L 278 50 L 270 55 L 278 60 L 270 65 L 278 70 L 270 75 L 278 80 L 270 85 L 278 90 L 270 95 L 278 100 L 270 105 L 278 110 L 270 115 L 278 120 L 270 125 L 278 130 L 270 135 Z" fill="#4d0105" />

        <!-- Gold 'Rich' Ribbon Accent -->
        <path d="M 10 85 L 270 85 L 270 115 L 10 115 Z" fill="url(#richGold)" opacity="0.95" />

        <!-- Diagonal Light Sheen -->
        <path d="M 40 15 L 90 15 L 50 135 L 0 135 Z" fill="#ffffff" opacity="0.08" />

        <!-- KitKat Oval Emblem -->
        <ellipse cx="140" cy="55" rx="55" ry="26" fill="#ffffff" stroke="#c0000a" stroke-width="2.5" />
        <ellipse cx="140" cy="55" rx="51" ry="22" fill="#ffffff" />
        
        <!-- KitKat Bold Stylized Lettering -->
        <text x="140" y="62" 
              font-family="'Plus Jakarta Sans', Arial, sans-serif" 
              font-weight="900" 
              font-style="italic" 
              font-size="22" 
              fill="#d61a23" 
              text-anchor="middle" 
              letter-spacing="-1px">KitKat</text>

        <!-- 'RICH' Elegant Gold Tag -->
        <text x="140" y="106" 
              font-family="'Playfair Display', Georgia, serif" 
              font-weight="700" 
              font-size="15" 
              fill="#220e06" 
              text-anchor="middle" 
              letter-spacing="4px">RICH</text>

        <!-- Subtitle: Dark Chocolate Crisp -->
        <text x="140" y="127" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-weight="600" 
              font-size="8.5" 
              fill="#fbead1" 
              text-anchor="middle" 
              letter-spacing="1.5px">CRISPY WAFER IN RICH CHOCOLATE</text>
      </g>
    </svg>
  `;
}
