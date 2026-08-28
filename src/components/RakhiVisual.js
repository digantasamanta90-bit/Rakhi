/**
 * RAKHI VISUAL COMPONENT — HANDCRAFTED ANTIQUE GOLD & SILK
 * Delicate filigree, fine silk cords, and protective evil-eye medallion.
 * Styled in the Velvet Night × Antique Memory aesthetic.
 */

export function renderRakhiSvg(options = {}) {
  const { size = 220, id = 'rakhi-svg' } = options;

  return `
    <svg id="${id}" viewBox="0 0 300 300" width="${size}" height="${size}" class="rakhi-graphic anim-breathe" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sacred Rakhi Thread">
      <defs>
        <!-- Soft Antique Gold Metallic Gradient -->
        <linearGradient id="antiqueGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F5E8D5" />
          <stop offset="45%" stop-color="#D4B06A" />
          <stop offset="100%" stop-color="#9E7E2C" />
        </linearGradient>

        <!-- Soft Silk Thread Gradient (Rakhi Red / Muted Rose) -->
        <linearGradient id="silkCordGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#B7474D" />
          <stop offset="50%" stop-color="#9B5D70" />
          <stop offset="100%" stop-color="#B7474D" />
        </linearGradient>

        <!-- Evil Eye Gradients -->
        <radialGradient id="softEvilEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#2b7cb0" />
          <stop offset="75%" stop-color="#144d75" />
          <stop offset="100%" stop-color="#0a2a42" />
        </radialGradient>
      </defs>

      <!-- Silk Cords (Flowing organic strands) -->
      <g class="rakhi-threads">
        <path d="M 0 150 Q 75 138 150 150 Q 225 162 300 150" stroke="url(#silkCordGrad)" stroke-width="3.5" fill="none" stroke-linecap="round" />
        <path d="M 0 150 Q 75 158 150 150 Q 225 142 300 150" stroke="url(#antiqueGoldGrad)" stroke-width="1.8" fill="none" stroke-dasharray="5,4" />
      </g>

      <!-- Delicate Gold Beads -->
      <g class="rakhi-beads" fill="url(#antiqueGoldGrad)">
        <circle cx="70" cy="148" r="4.5" />
        <circle cx="90" cy="149" r="6" />
        <circle cx="110" cy="150" r="7.5" />
        <circle cx="190" cy="150" r="7.5" />
        <circle cx="210" cy="151" r="6" />
        <circle cx="230" cy="152" r="4.5" />
      </g>

      <!-- Outer Filigree Petals -->
      <g class="rakhi-petals" transform="translate(150, 150)">
        ${Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return `
            <path d="M 0 -64 Q 10 -42 0 0 Q -10 -42 0 -64" 
                  fill="url(#antiqueGoldGrad)" 
                  transform="rotate(${angle})" 
                  opacity="0.85" />
            <circle cx="0" cy="-62" r="2" fill="#F3E8D5" transform="rotate(${angle})" />
          `;
        }).join('')}
      </g>

      <!-- Middle Ring -->
      <g class="rakhi-mid-ring" transform="translate(150, 150)">
        <circle r="40" fill="#F3E8D5" stroke="url(#antiqueGoldGrad)" stroke-width="2.5" />
        ${Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return `
            <circle cx="0" cy="-34" r="2.5" fill="url(#antiqueGoldGrad)" transform="rotate(${angle})" />
          `;
        }).join('')}
      </g>

      <!-- Central Sacred Evil Eye Medallion 🧿 -->
      <g class="rakhi-center-medallion" transform="translate(150, 150)">
        <circle r="26" fill="url(#softEvilEye)" stroke="url(#antiqueGoldGrad)" stroke-width="1.8" />
        <circle r="18" fill="#F3E8D5" />
        <circle r="10" fill="#2b7cb0" />
        <circle r="5" fill="#0A0709" />
        <circle cx="-2" cy="-2" r="1.8" fill="#ffffff" opacity="0.9" />
      </g>
    </svg>
  `;
}
