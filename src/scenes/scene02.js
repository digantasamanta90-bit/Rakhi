/**
 * SCENE 2 — 02_RAKHI_REVEAL
 * Thread drawing, Rakhi assembly, title reveal, hero portrait, exact acknowledgement copy.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { renderRakhiSvg } from '../components/RakhiVisual.js';
import { renderPortrait } from '../components/PortraitFrame.js';

export function createScene02(sceneManager) {
  const container = document.getElementById('scene-02');

  container.innerHTML = `
    <div class="scene-content">
      <div class="scene-header" style="width: 100%;">
        <div class="title-sub" id="s2-title-top" style="opacity: 0; transition: opacity 0.8s ease;">HAPPY</div>
        <h1 class="title-grand" id="s2-title-main" style="opacity: 0; transition: opacity 0.8s ease;">RAKSHA BANDHAN</h1>
        <div class="hero-name" id="s2-title-name" style="opacity: 0; transform: scale(0.95); transition: all 1s var(--ease-spring);">ANWESHA 🧿</div>
      </div>

      <div class="s2-visual-grid" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 2rem; margin: 1.5rem 0; width: 100%;">
        <!-- Rakhi Hero Graphic -->
        <div class="rakhi-hero-wrapper" id="s2-rakhi-wrap" role="button" aria-label="Tap the Rakhi for a surprise" tabindex="0">
          ${renderRakhiSvg({ size: 240, id: 's2-rakhi' })}
        </div>

        <!-- Hero Portrait -->
        <div id="s2-portrait-wrap" style="opacity: 0; transform: translateY(16px); transition: all 1s var(--ease-cinematic);">
          ${renderPortrait('assets/portraits/anwesha_hero.png', 'Anwesha', 'Best Sister')}
        </div>
      </div>

      <!-- Exact Personal Acknowledgement Copy -->
      <div class="scrapbook-card" id="s2-copy-card" style="max-width: 520px; opacity: 0; transform: translateY(12px); transition: all 0.9s var(--ease-cinematic);">
        <p class="body-lead" style="margin-bottom: 0.6rem; font-weight: 500;">
          Yes. This entire thing is for you. 😭
        </p>
        <p class="body-lead" style="color: var(--gold-light); margin-bottom: 0.6rem; font-family: var(--font-display); font-size: 1.25rem;">
          Happy Raksha Bandhan, Anwesha. 🧿
        </p>
        <p class="body-subtle" style="font-style: italic;">
          Because apparently a normal Rakhi message was not enough. 💀
        </p>
      </div>

      <div id="s2-cta-wrap" style="opacity: 0; transition: opacity 0.8s ease; margin-top: 1.2rem;">
        <button class="btn-primary" id="s2-cta-btn">
          CONTINUE THE ADVENTURE →
        </button>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const titleTop = document.getElementById('s2-title-top');
    const titleMain = document.getElementById('s2-title-main');
    const titleName = document.getElementById('s2-title-name');
    const portraitWrap = document.getElementById('s2-portrait-wrap');
    const copyCard = document.getElementById('s2-copy-card');
    const ctaWrap = document.getElementById('s2-cta-wrap');
    const ctaBtn = document.getElementById('s2-cta-btn');
    const rakhiWrap = document.getElementById('s2-rakhi-wrap');

    // Staged Title Reveal
    await delay(300);
    if (titleTop) titleTop.style.opacity = '1';

    await delay(500);
    if (titleMain) titleMain.style.opacity = '1';

    await delay(700);
    if (titleName) {
      titleName.style.opacity = '1';
      titleName.style.transform = 'scale(1)';
    }

    // Portrait & Copy Reveal
    await delay(800);
    if (portraitWrap) {
      portraitWrap.style.opacity = '1';
      portraitWrap.style.transform = 'translateY(0)';
    }

    await delay(600);
    if (copyCard) {
      copyCard.style.opacity = '1';
      copyCard.style.transform = 'translateY(0)';
    }

    // Interactive Rakhi Tap
    let tapCount = 0;
    if (rakhiWrap) {
      const handleRakhiTap = (e) => {
        tapCount++;
        audio.playSparkleSfx();
        
        // Trigger canvas particle burst
        if (window.appParticleCanvas) {
          const rect = rakhiWrap.getBoundingClientRect();
          window.appParticleCanvas.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
        }

        if (tapCount === 1) {
          state.unlockAchievement(
            'best_sister',
            'Achievement Unlocked',
            'Best Sister Detected 🏆',
            '🏆'
          );
        }
      };

      rakhiWrap.addEventListener('click', handleRakhiTap);
      rakhiWrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') handleRakhiTap(e);
      });
    }

    // Delayed CTA Reveal
    await delay(1200);
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
