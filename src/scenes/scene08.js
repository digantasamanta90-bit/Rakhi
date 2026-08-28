/**
 * SCENE 8 — 08_THE_FINALE
 * Emotional and visual culmination, Master Rakhi connecting brother and sister bond,
 * sincere closing signature, celebration burst, replay modal, and post-credits easter egg.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { content } from '../content/content.js';
import { renderRakhiSvg } from '../components/RakhiVisual.js';

export function createScene08(sceneManager) {
  const container = document.getElementById('scene-08');
  const c = content.scene8;

  container.innerHTML = `
    <div class="scene-content">
      <!-- Recap Sequence -->
      <div id="s8-recap" style="margin-bottom: 0.4rem; text-align: center; max-width: 440px;">
        <p class="body-lead" style="color: var(--rose-primary); font-style: italic; margin-bottom: 2px; font-size: 0.82rem;">
          ${c.recapIntro}
        </p>
        <div id="s8-recap-lines" style="font-size: 0.82rem; color: var(--text-plum-muted); line-height: 1.5;">
          <p style="font-weight: 600; color: var(--text-plum-dark); font-size: 0.9rem; font-family: var(--font-display);">${c.recapLines[0]}</p>
          <p>${c.recapLines[1]}</p>
          <p style="color: var(--rose-primary); font-weight: 500;">${c.recapLines[2]}</p>
          <p style="font-size: 0.76rem; color: var(--text-plum-subtle); margin-top: 2px;">${c.recapLines[3]} ${c.recapLines[4]}</p>
        </div>
      </div>

      <!-- Sibling Bond & Final Master Rakhi -->
      <div class="bond-wrapper">
        <!-- Diganta Node -->
        <div class="bond-node">
          <div class="bond-avatar">👦</div>
          <span class="bond-label">Me</span>
        </div>

        <!-- Center Master Rakhi -->
        <div class="rakhi-hero-wrapper" id="s8-rakhi-wrap" role="button" aria-label="Tap final Rakhi for celebration" tabindex="0" style="width: 120px; height: 120px;">
          ${renderRakhiSvg({ size: 120, id: 's8-rakhi' })}
        </div>

        <!-- Anwesha Node -->
        <div class="bond-node">
          <div class="bond-avatar">
            <img src="assets/portraits/anwesha12.png" alt="Anwesha" onerror="this.src='assets/portraits/anwesha_calm.png';" />
          </div>
          <span class="bond-label">You 🧿</span>
        </div>

        <!-- Bond Connecting Thread SVG -->
        <svg class="bond-thread-svg" viewBox="0 0 400 120">
          <defs>
            <linearGradient id="antiqueGoldGradBond" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f5e6b8" />
              <stop offset="45%" stop-color="#c8a248" />
              <stop offset="100%" stop-color="#a6832b" />
            </linearGradient>
          </defs>
          <path d="M 35 60 Q 200 20 365 60" stroke="url(#antiqueGoldGradBond)" stroke-width="2.5" fill="none" />
          <path class="bond-pulse-line" d="M 35 60 Q 200 20 365 60" stroke="#c88294" stroke-width="3" fill="none" />
        </svg>
      </div>

      <!-- Final Greeting & Sincere Closing -->
      <div class="scrapbook-card" style="max-width: 440px; margin-top: 0.3rem; text-align: center; background: #fffdfa;">
        <h3 class="font-display" style="font-size: 1.2rem; color: var(--text-plum-dark); margin-bottom: 0.2rem; font-style: italic;">
          ${c.greeting}
        </h3>
        <p class="body-lead" style="font-size: 0.88rem; margin-bottom: 2px;">
          ${c.subtext}
        </p>
        <p class="body-lead" style="font-weight: 600; color: var(--rose-primary); font-size: 0.84rem; margin-bottom: 0.4rem; font-family: var(--font-display); font-style: italic;">
          ${c.realRakhiNote}
        </p>

        <hr style="border: none; border-top: 1px dashed var(--border-delicate); margin: 0.4rem 0;">

        <div style="font-size: 0.78rem; color: var(--text-plum-subtle);">
          <strong style="color: var(--text-plum-dark); font-size: 0.86rem;">${c.signature}</strong><br>
          <span style="font-size: 0.7rem; font-style: italic;">${c.footnote}</span>
        </div>
      </div>

      <!-- Finale Interactive Trigger -->
      <div style="margin-top: 0.6rem; display: flex; gap: 0.4rem; flex-wrap: wrap; justify-content: center;">
        <button class="btn-primary" id="s8-celebrate-btn" style="padding: 0.65rem 1.4rem; font-size: 0.86rem;">
          <span>${c.celebrateCta}</span>
        </button>
        <button class="btn-secondary" id="s8-replay-btn" style="font-size: 0.8rem;">
          <span>${c.replayButton}</span>
        </button>
      </div>

      <!-- Inactivity Post-Credits Easter Egg -->
      <div id="s8-easter-egg" style="margin-top: 0.4rem; opacity: 0; transition: opacity 1s; font-size: 0.78rem; color: var(--rose-primary); font-style: italic;">
        ${c.easterEgg}
      </div>
    </div>

    <!-- Replay Confirmation Modal -->
    <div class="modal-overlay" id="s8-replay-modal" role="dialog" aria-modal="true" aria-label="Replay Confirmation">
      <div class="modal-content" style="text-align: center;">
        <h3 class="font-display" style="font-size: 1.2rem; color: var(--text-plum-dark); margin-bottom: 0.4rem;">
          ${c.replayModal.title}
        </h3>
        <p class="body-lead" style="font-size: 0.86rem; margin-bottom: 1rem;">
          ${c.replayModal.question}
        </p>
        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-primary" id="s8-confirm-replay" style="margin: 0; padding: 0.55rem 1.1rem; font-size: 0.82rem;">
            ${c.replayModal.confirm}
          </button>
          <button class="btn-secondary" id="s8-cancel-replay" style="font-size: 0.82rem;">
            ${c.replayModal.cancel}
          </button>
        </div>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const rakhiWrap = document.getElementById('s8-rakhi-wrap');
    const celebrateBtn = document.getElementById('s8-celebrate-btn');
    const replayBtn = document.getElementById('s8-replay-btn');
    const replayModal = document.getElementById('s8-replay-modal');
    const confirmReplay = document.getElementById('s8-confirm-replay');
    const cancelReplay = document.getElementById('s8-cancel-replay');
    const easterEgg = document.getElementById('s8-easter-egg');

    const triggerFinaleCelebration = () => {
      audio.playCelebrateSfx();
      if (window.appParticleCanvas) {
        window.appParticleCanvas.triggerBurst(window.innerWidth / 2, window.innerHeight / 2, 45);
      }
      state.unlockAchievement(
        'finale_done',
        'Rakhi Surprise Complete! 🎉',
        'See you next year. Maybe with version 2.0. 💀😭',
        '🎉'
      );
    };

    if (rakhiWrap) rakhiWrap.addEventListener('click', triggerFinaleCelebration);
    if (celebrateBtn) celebrateBtn.addEventListener('click', triggerFinaleCelebration);

    if (replayBtn && replayModal) {
      replayBtn.addEventListener('click', () => {
        replayModal.classList.add('active');
      });
    }

    if (cancelReplay && replayModal) {
      cancelReplay.addEventListener('click', () => {
        replayModal.classList.remove('active');
      });
    }

    if (confirmReplay) {
      confirmReplay.addEventListener('click', () => {
        if (replayModal) replayModal.classList.remove('active');
        sceneManager.reset();
      });
    }

    setTimeout(() => {
      if (easterEgg) easterEgg.style.opacity = '1';
    }, 6000);
  }

  return { enter };
}
