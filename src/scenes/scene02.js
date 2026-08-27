/**
 * SCENE 2 — 02_RAKHI_REVEAL
 * Morning light reveal, Fraunces typography, handcrafted Rakhi, portrait frame,
 * exact acknowledgement copy, and editorial invitation CTA.
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
        <div class="title-sub" id="s2-title-top" style="opacity: 0; transition: opacity 0.8s ease;">Happy</div>
        <h1 class="title-grand" id="s2-title-main" style="opacity: 0; transition: opacity 0.8s ease;">Raksha Bandhan</h1>
        <div class="hero-name" id="s2-title-name" style="opacity: 0; transform: scale(0.96); transition: all 1s var(--ease-spring);">Anwesha 🧿</div>
      </div>

      <div class="s2-visual-grid" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 1.5rem; margin: 1rem 0; width: 100%;">
        <!-- Rakhi Hero Graphic -->
        <div class="rakhi-hero-wrapper" id="s2-rakhi-wrap" role="button" aria-label="Tap the Rakhi for a note" tabindex="0">
          ${renderRakhiSvg({ size: 200, id: 's2-rakhi' })}
        </div>

        <!-- Hero Portrait -->
        <div id="s2-portrait-wrap" style="opacity: 0; transform: translateY(12px); transition: all 0.9s var(--ease-soft);">
          ${renderPortrait('assets/portraits/anwesha_hero.png', 'Anwesha', 'Best Sister')}
        </div>
      </div>

      <!-- Exact Personal Acknowledgement Copy -->
      <div class="scrapbook-card" id="s2-copy-card" style="max-width: 480px; opacity: 0; transform: translateY(10px); transition: all 0.8s var(--ease-soft);">
        <p class="body-lead" style="margin-bottom: 0.5rem; font-weight: 500; color: var(--text-plum-dark);">
          Yes. This entire thing is for you. 😭
        </p>
        <p class="body-lead" style="color: var(--rose-primary); margin-bottom: 0.5rem; font-family: var(--font-display); font-size: 1.15rem; font-style: italic;">
          Happy Raksha Bandhan, Anwesha. 🧿
        </p>
        <p class="body-subtle">
          Because apparently a normal Rakhi message was not enough. 💀
        </p>
      </div>

      <div id="s2-cta-wrap" style="opacity: 0; transition: opacity 0.8s ease; margin-top: 1rem;">
        <button class="btn-primary" id="s2-cta-btn">
          <span>CONTINUE THE ADVENTURE</span>
          <i class="fa-solid fa-arrow-right" style="font-size: 0.85rem;" aria-hidden="true"></i>
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

    await delay(450);
    if (titleMain) titleMain.style.opacity = '1';

    await delay(600);
    if (titleName) {
      titleName.style.opacity = '1';
      titleName.style.transform = 'scale(1)';
    }

    // Portrait & Copy Reveal
    await delay(700);
    if (portraitWrap) {
      portraitWrap.style.opacity = '1';
      portraitWrap.style.transform = 'translateY(0)';
    }

    await delay(500);
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
          window.appParticleCanvas.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
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
    await delay(1000);
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
