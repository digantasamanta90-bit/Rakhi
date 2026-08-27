/**
 * SCENE 7 — 07_THE_FINALE
 * Emotional and visual culmination, Master Rakhi connecting brother and sister bond,
 * sincere closing signature, celebration burst, replay modal, and post-credits easter egg.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { renderRakhiSvg } from '../components/RakhiVisual.js';

export function createScene07(sceneManager) {
  const container = document.getElementById('scene-07');

  container.innerHTML = `
    <div class="scene-content">
      <!-- Recap Sequence -->
      <div id="s7-recap" style="margin-bottom: 0.8rem; text-align: center; max-width: 480px;">
        <p class="body-lead" style="color: var(--rose-primary); font-style: italic; margin-bottom: 0.3rem;">
          Okay. This time, for real.
        </p>
        <h2 class="font-display" style="font-size: clamp(1.3rem, 4.2vw, 1.8rem); color: var(--text-plum-dark); margin-bottom: 0.6rem;">
          Thank you for staying till the end. 😭
        </h2>
        <div id="s7-recap-lines" style="font-size: 0.88rem; color: var(--text-plum-muted); line-height: 1.55;">
          <p>You scanned a QR code.</p>
          <p>You found a Rakhi website.</p>
          <p>There was chocolate research (Monojit got involved).</p>
          <p>I lost sleep.</p>
          <p style="color: var(--text-plum-dark); font-weight: 600; margin-top: 3px; font-family: var(--font-display); font-style: italic;">And somehow... we made it to the end.</p>
        </div>
      </div>

      <!-- Sibling Bond & Final Master Rakhi -->
      <div class="bond-wrapper">
        <!-- Diganta Node -->
        <div class="bond-node">
          <div class="bond-avatar">👦</div>
          <span class="bond-label">Diganta</span>
        </div>

        <!-- Center Master Rakhi -->
        <div class="rakhi-hero-wrapper" id="s7-rakhi-wrap" role="button" aria-label="Tap final Rakhi for celebration" tabindex="0" style="width: 160px; height: 160px;">
          ${renderRakhiSvg({ size: 160, id: 's7-rakhi' })}
        </div>

        <!-- Anwesha Node -->
        <div class="bond-node">
          <div class="bond-avatar">👧</div>
          <span class="bond-label">Anwesha 🧿</span>
        </div>

        <!-- Bond Connecting Thread SVG -->
        <svg class="bond-thread-svg" viewBox="0 0 440 160">
          <path d="M 40 80 Q 220 40 400 80" stroke="url(#antiqueGoldGrad)" stroke-width="2.5" fill="none" />
          <path class="bond-pulse-line" d="M 40 80 Q 220 40 400 80" stroke="#c88294" stroke-width="3" fill="none" />
        </svg>
      </div>

      <!-- Final Greeting & Sincere Closing -->
      <div class="scrapbook-card" style="max-width: 480px; margin-top: 0.6rem; text-align: center; background: #fffdfa;">
        <h3 class="font-display" style="font-size: 1.3rem; color: var(--text-plum-dark); margin-bottom: 0.4rem; font-style: italic;">
          Happy Raksha Bandhan, Anwesha. 🧿
        </h3>
        <p class="body-lead" style="font-size: 0.95rem; margin-bottom: 0.3rem;">
          I’m glad you’re my sister.
        </p>
        <p class="body-subtle" style="font-style: italic; color: var(--rose-primary); margin-bottom: 0.8rem;">
          And unfortunately for you... you’re permanently stuck with me as your brother. 💀❤️
        </p>

        <div style="font-size: 0.88rem; color: var(--text-plum-muted); line-height: 1.55; margin-bottom: 0.8rem;">
          <p>I hope you liked the chocolate.</p>
          <p>I hope you liked the website.</p>
          <p style="color: var(--text-plum-dark); font-weight: 500; font-family: var(--font-display); font-style: italic;">And I hope this made you smile at least once. That’s honestly all I wanted. 🧿</p>
        </div>

        <hr style="border: none; border-top: 1px dashed var(--border-delicate); margin: 0.8rem 0;">

        <div style="font-size: 0.82rem; color: var(--text-plum-subtle);">
          <strong style="color: var(--text-plum-dark);">Made for Anwesha ❤️</strong><br>
          By your sleep-deprived brother, Diganta<br>
          <span style="font-size: 0.72rem; font-style: italic;">Made with HTML, CSS, JavaScript, questionable decisions, and very little sleep. 😭</span>
        </div>
      </div>

      <!-- Finale Interactive Trigger -->
      <div style="margin-top: 1rem; display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: center;">
        <button class="btn-primary" id="s7-celebrate-btn">
          <span>TAP THE RAKHI ONE LAST TIME</span> 🧿
        </button>
        <button class="btn-secondary" id="s7-replay-btn">
          <span>REPLAY THE CHAOS</span> ↻
        </button>
      </div>

      <!-- Inactivity Post-Credits Easter Egg -->
      <div id="s7-easter-egg" style="margin-top: 0.8rem; opacity: 0; transition: opacity 1s; font-size: 0.82rem; color: var(--rose-primary); font-style: italic;">
        Psst... Go eat the KitKat before it melts. 🍫😭
      </div>
    </div>

    <!-- Replay Confirmation Modal -->
    <div class="modal-overlay" id="s7-replay-modal" role="dialog" aria-modal="true" aria-label="Replay Confirmation">
      <div class="modal-content" style="text-align: center;">
        <h3 class="font-display" style="font-size: 1.25rem; color: var(--text-plum-dark); margin-bottom: 0.6rem;">
          Replay the Chaos? ↻
        </h3>
        <p class="body-lead" style="font-size: 0.92rem; margin-bottom: 1.2rem;">
          Are you sure? I had to build all of this. 😭
        </p>
        <div style="display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn-primary" id="s7-confirm-replay" style="margin: 0; padding: 0.6rem 1.2rem; font-size: 0.85rem;">
            YES, AGAIN →
          </button>
          <button class="btn-secondary" id="s7-cancel-replay">
            NO, LET ME EAT THE CHOCOLATE 🍫
          </button>
        </div>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const rakhiWrap = document.getElementById('s7-rakhi-wrap');
    const celebrateBtn = document.getElementById('s7-celebrate-btn');
    const replayBtn = document.getElementById('s7-replay-btn');
    const replayModal = document.getElementById('s7-replay-modal');
    const confirmReplay = document.getElementById('s7-confirm-replay');
    const cancelReplay = document.getElementById('s7-cancel-replay');
    const easterEgg = document.getElementById('s7-easter-egg');

    const triggerFinaleCelebration = () => {
      audio.playCelebrateSfx();
      if (window.appParticleCanvas) {
        window.appParticleCanvas.triggerBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
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
        state.resetForReplay();
        sceneManager.goToScene(1);
      });
    }

    setTimeout(() => {
      if (easterEgg) easterEgg.style.opacity = '1';
    }, 8000);
  }

  return { enter };
}
