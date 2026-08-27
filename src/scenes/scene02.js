/**
 * SCENE 2 — 02_RAKHI_REVEAL
 * Morning light reveal, Fraunces typography, handcrafted Rakhi, anwesha_hero,
 * chosen-sibling acknowledgement copy, and Monojit credit.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { content } from '../content/content.js';
import { renderRakhiSvg } from '../components/RakhiVisual.js';
import { renderPortrait } from '../components/PortraitFrame.js';

export function createScene02(sceneManager) {
  const container = document.getElementById('scene-02');
  const c = content.scene2;

  container.innerHTML = `
    <div class="scene-content">
      <div class="scene-header" style="width: 100%;">
        <div class="title-sub" id="s2-title-top" style="opacity: 0; transition: opacity 0.8s ease;">${c.preTitle} ${c.subTitle}</div>
        <h1 class="hero-name" id="s2-title-name" style="opacity: 0; transform: scale(0.96); transition: all 0.9s var(--ease-spring); margin: 0.2rem 0;">${c.name} 🧿</h1>
        <div class="title-grand" id="s2-title-main" style="opacity: 0; font-size: clamp(1.2rem, 4vw, 1.6rem); transition: opacity 0.8s ease; color: var(--rose-primary); font-style: italic;">${c.greeting}</div>
      </div>

      <div class="s2-visual-grid">
        <!-- Rakhi Hero Graphic -->
        <div class="rakhi-hero-wrapper" id="s2-rakhi-wrap" role="button" aria-label="Tap the Rakhi" tabindex="0">
          ${renderRakhiSvg({ size: 150, id: 's2-rakhi' })}
        </div>

        <!-- Hero Portrait -->
        <div id="s2-portrait-wrap" style="opacity: 0; transform: translateY(10px); transition: all 0.8s var(--ease-soft);">
          ${renderPortrait('assets/portraits/anwesha_hero.png', 'Anwesha', 'Hero Portrait', 'framed')}
        </div>
      </div>

      <!-- Sincere Chosen-Sibling & Monojit Credit Card -->
      <div class="scrapbook-card" id="s2-copy-card" style="opacity: 0; transform: translateY(10px); transition: all 0.8s var(--ease-soft);">
        <p class="body-lead" style="margin-bottom: 0.35rem; font-weight: 600; color: var(--text-plum-dark);">
          ${c.chosenSiblingLines[0]}
        </p>
        <p class="body-lead" style="color: var(--rose-primary); margin-bottom: 0.45rem; font-family: var(--font-display); font-size: 1.05rem; font-style: italic;">
          ${c.chosenSiblingLines[1]} ${c.chosenSiblingLines[2]}
        </p>
        <div style="font-size: 0.84rem; color: var(--text-plum-muted); line-height: 1.5; border-top: 1px dashed var(--border-delicate); padding-top: 0.4rem; margin-top: 0.4rem;">
          <p style="margin-bottom: 2px;">${c.monojitCreditLines[0]}</p>
          <p style="margin-bottom: 2px;">${c.monojitCreditLines[1]}</p>
          <p style="font-style: italic; color: var(--rose-primary); font-weight: 500;">${c.monojitCreditLines[2]} ${c.monojitCreditLines[3]}</p>
        </div>
      </div>

      <div id="s2-cta-wrap" style="opacity: 0; transition: opacity 0.8s ease; margin-top: 0.6rem;">
        <button class="btn-primary" id="s2-cta-btn">
          <span>${c.ctaText}</span>
          <i class="fa-solid fa-arrow-right" style="font-size: 0.8rem;" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const titleTop = document.getElementById('s2-title-top');
    const titleName = document.getElementById('s2-title-name');
    const titleMain = document.getElementById('s2-title-main');
    const portraitWrap = document.getElementById('s2-portrait-wrap');
    const copyCard = document.getElementById('s2-copy-card');
    const ctaWrap = document.getElementById('s2-cta-wrap');
    const ctaBtn = document.getElementById('s2-cta-btn');
    const rakhiWrap = document.getElementById('s2-rakhi-wrap');

    // Staged Title Reveal
    await delay(250);
    if (titleTop) titleTop.style.opacity = '1';

    await delay(400);
    if (titleName) {
      titleName.style.opacity = '1';
      titleName.style.transform = 'scale(1)';
    }

    await delay(350);
    if (titleMain) titleMain.style.opacity = '1';

    // Portrait & Copy Reveal
    await delay(500);
    if (portraitWrap) {
      portraitWrap.style.opacity = '1';
      portraitWrap.style.transform = 'translateY(0)';
    }

    await delay(400);
    if (copyCard) {
      copyCard.style.opacity = '1';
      copyCard.style.transform = 'translateY(0)';
    }

    // Interactive Rakhi Tap
    let tapCount = 0;
    if (rakhiWrap) {
      const handleRakhiTap = () => {
        tapCount++;
        audio.playSparkleSfx();
        
        if (window.appParticleCanvas) {
          const rect = rakhiWrap.getBoundingClientRect();
          window.appParticleCanvas.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
        }

        if (tapCount === 1) {
          state.unlockAchievement(
            'best_sister',
            'Note Unlocked',
            'Best Sister Detected 🏆',
            '🏆'
          );
        }
      };

      rakhiWrap.addEventListener('click', handleRakhiTap);
      rakhiWrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') handleRakhiTap();
      });
    }

    // Delayed CTA Reveal
    await delay(800);
    if (ctaWrap) {
      ctaWrap.style.opacity = '1';
    }

    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        sceneManager.nextScene();
      });
    }
  }

  return { enter };
}
