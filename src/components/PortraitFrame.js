/**
 * PORTRAIT FRAME COMPONENT — EDITORIAL & HANDCRAFTED SCRAPBOOK
 * Supports full editorial portrait (uncropped natural aspect ratio for anwesha_calm.png),
 * taped polaroid/scrapbook snapshots, and framed art cards.
 */

export function renderPortrait(src = 'assets/portraits/anwesha_hero.png', alt = 'Anwesha', caption = '', mode = 'framed') {
  if (mode === 'editorial' || mode === 'full') {
    return `
      <div class="portrait-editorial" role="figure" aria-label="${alt}">
        <img src="${src}" 
             alt="${alt}" 
             class="portrait-editorial-img" 
             loading="eager"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <div class="portrait-editorial-placeholder" style="display: none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
            <path d="M12 7v4" />
            <path d="M12 15h.01" />
            <path d="M16 11c0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1.5.8 2.8 2 3.5V17h4v-2.5c1.2-.7 2-2 2-3.5Z" />
          </svg>
          <span class="portrait-placeholder-label">ANWESHA 🧿</span>
        </div>
        ${caption ? `<div class="portrait-caption">${caption}</div>` : ''}
      </div>
    `;
  }

  if (mode === 'scrapbook' || mode === 'polaroid') {
    return `
      <div class="portrait-scrapbook" role="figure" aria-label="${alt}">
        <div class="scrapbook-tape" aria-hidden="true"></div>
        <div class="scrapbook-photo-wrap">
          <img src="${src}" 
               alt="${alt}" 
               class="scrapbook-photo-img" 
               loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="portrait-placeholder" style="display: none;">
            <span class="portrait-placeholder-label">ANWESHA 🧿</span>
          </div>
        </div>
        ${caption ? `<div class="scrapbook-photo-caption">${caption}</div>` : ''}
      </div>
    `;
  }

  // Standard framed card
  return `
    <div class="portrait-frame" role="figure" aria-label="${alt}">
      <img src="${src}" 
           alt="${alt}" 
           class="portrait-img" 
           loading="lazy"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <div class="portrait-placeholder" style="display: none;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
          <path d="M12 7v4" />
          <path d="M12 15h.01" />
          <path d="M16 11c0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1.5.8 2.8 2 3.5V17h4v-2.5c1.2-.7 2-2 2-3.5Z" />
        </svg>
        <span class="portrait-placeholder-label">ANWESHA 🧿</span>
      </div>
      ${caption ? `<div class="portrait-caption">${caption}</div>` : ''}
    </div>
  `;
}
