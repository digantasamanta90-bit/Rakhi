/**
 * RAKHI VISUAL COMPONENT
 * Renders an intricate, multi-layered SVG Rakhi with gold filigree,
 * beads, silk thread, and protective evil-eye center.
 */

export function renderRakhiSvg(options = {}) {
  const { size = 260, isInteractive = true, id = 'rakhi-svg' } = options;

  return `
    <svg id="${id}" viewBox="0 0 300 300" width="${size}" height="${size}" class="rakhi-graphic anim-breathe" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sacred Rakhi Thread">
      <defs>
        <!-- Gold Gradients -->
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff8db" />
          <stop offset="40%" stop-color="#d4af37" />
          <stop offset="80%" stop-color="#997a23" />
          <stop offset="100%" stop-color="#e8ca68" />
        </linearGradient>

        <!-- Silk Red Thread Gradient -->
        <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b31217" />
          <stop offset="50%" stop-color="#e52d27" />
          <stop offset="100%" stop-color="#b31217" />
        </linearGradient>

        <!-- Evil Eye Gradients -->
        <radialGradient id="evilEyeOuter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1e90ff" />
          <stop offset="70%" stop-color="#0047ab" />
          <stop offset="100%" stop-color="#002244" />
        </radialGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Silk Threads (Left and Right braided strands) -->
      <g class="rakhi-threads">
        <path d="M 0 150 Q 75 140 150 150 Q 225 160 300 150" stroke="url(#threadGrad)" stroke-width="4.5" fill="none" stroke-linecap="round" />
        <path d="M 0 150 Q 75 160 150 150 Q 225 140 300 150" stroke="url(#goldGrad)" stroke-width="2" fill="none" stroke-dasharray="6,4" />
      </g>

      <!-- Golden Bead Accents along thread -->
      <g class="rakhi-beads" fill="url(#goldGrad)" filter="url(#glow)">
        <circle cx="65" cy="148" r="5" />
        <circle cx="85" cy="149" r="6.5" />
        <circle cx="105" cy="150" r="8" />
        <circle cx="195" cy="150" r="8" />
        <circle cx="215" cy="151" r="6.5" />
        <circle cx="235" cy="152" r="5" />
      </g>

      <!-- Outer Sunburst / Petals Base -->
      <g class="rakhi-petals" transform="translate(150, 150)">
        ${Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return `
            <path d="M 0 -70 Q 12 -45 0 0 Q -12 -45 0 -70" 
                  fill="url(#goldGrad)" 
                  transform="rotate(${angle})" 
                  opacity="0.88" />
            <circle cx="0" cy="-68" r="2.5" fill="#fff7d6" transform="rotate(${angle})" />
          `;
        }).join('')}
      </g>

      <!-- Middle Floral Ring -->
      <g class="rakhi-mid-ring" transform="translate(150, 150)">
        <circle r="44" fill="#2b1022" stroke="url(#goldGrad)" stroke-width="3.5" />
        ${Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return `
            <circle cx="0" cy="-38" r="3" fill="url(#goldGrad)" transform="rotate(${angle})" />
          `;
        }).join('')}
      </g>

      <!-- Central Sacred Evil Eye Medallion 🧿 -->
      <g class="rakhi-center-medallion" transform="translate(150, 150)" filter="url(#glow)">
        <circle r="28" fill="url(#evilEyeOuter)" stroke="url(#goldGrad)" stroke-width="2" />
        <circle r="19" fill="#ffffff" />
        <circle r="11" fill="#0077be" />
        <circle r="5.5" fill="#111111" />
        <circle cx="-2" cy="-2" r="2" fill="#ffffff" opacity="0.9" />
      </g>
    </svg>
  `;
}
