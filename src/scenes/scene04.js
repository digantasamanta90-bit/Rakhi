/**
 * SCENE 4 — 04_THE_GIFT
 * Warm cocoa atmosphere, KitKat Rich illustration, Research report with Monojit credit,
 * and the physical handoff moment.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { renderKitKatSvg } from '../components/KitKatVisual.js';

export function createScene04(sceneManager) {
  const container = document.getElementById('scene-04');

  container.innerHTML = `
    <div class="scene-content">
      <div class="scrapbook-card" style="max-width: 500px; text-align: left; background: #fffdf9;">
        <p class="body-lead" style="margin-bottom: 0.3rem; color: var(--rose-primary); font-weight: 600;">
          You might have noticed something sitting beside you. 👀
        </p>
        <h2 class="font-display" style="font-size: clamp(1.3rem, 4.2vw, 1.8rem); color: var(--text-plum-dark); margin-bottom: 0.4rem; font-style: italic;">
          Yes. THAT.
        </h2>

        <!-- KitKat Rich Vector Illustration -->
        <div class="kitkat-hero-wrapper" id="s4-kitkat-wrap" role="button" aria-label="Tap KitKat for chocolate approval" tabindex="0">
          ${renderKitKatSvg({ width: 230, height: 145, id: 's4-kitkat' })}
        </div>

        <div style="text-align: center; margin: 0.4rem 0 1rem;">
          <span style="font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--choco-primary); font-weight: 700;">
            YOUR OFFICIAL RAKHI GIFT 🍫
          </span>
          <h3 class="font-display" style="font-size: 1.45rem; color: var(--text-plum-dark);">KitKat Rich</h3>
        </div>

        <!-- Selection Story Sequence -->
        <div style="font-size: 0.92rem; line-height: 1.6; color: var(--text-plum-muted);">
          <p style="margin-bottom: 0.3rem;">Now, before you think I randomly picked a chocolate...</p>
          <p style="margin-bottom: 0.3rem; font-weight: 600; color: var(--text-plum-dark);">No.</p>
          <p style="margin-bottom: 0.6rem; font-style: italic; color: var(--rose-primary);">There was research involved. 😭</p>

          <ul style="list-style: none; padding-left: 0; margin-bottom: 0.8rem; font-size: 0.88rem;">
            <li style="margin-bottom: 3px;">• Question 1: What does Anwesha like?</li>
            <li style="margin-bottom: 3px;">• Question 2: What should I get her?</li>
            <li style="margin-bottom: 3px;">• Question 3: What won’t be too sweet? 👀</li>
          </ul>

          <p style="margin-bottom: 0.3rem;">After extremely serious and completely unnecessary research...</p>
          <p style="font-family: var(--font-display); font-size: 1.15rem; color: var(--text-plum-dark); font-weight: 600; font-style: italic;">
            KitKat Rich won. 🏆
          </p>
        </div>

        <div style="margin-top: 1rem;">
          <button class="btn-secondary" id="s4-report-btn">
            <span>VIEW THE RESEARCH</span> 📊
          </button>
        </div>

        <hr style="border: none; border-top: 1px dashed var(--border-delicate); margin: 1.2rem 0;">

        <!-- Physical Handoff Instruction -->
        <div style="background: var(--rose-pale); border-left: 3px solid var(--rose-primary); padding: 0.7rem 0.9rem; border-radius: 0 8px 8px 0;">
          <p class="body-lead" style="font-weight: 600; color: var(--text-plum-dark); margin-bottom: 0.3rem;">
            Now look away from the screen for a second.
          </p>
          <p class="body-lead" style="color: var(--rose-primary); margin-bottom: 0.3rem; font-family: var(--font-display); font-style: italic;">
            Look at your actual gift. 😭🍫
          </p>
          <p class="body-subtle">
            Yep. That’s the one. Go on. It’s yours.
          </p>
        </div>
      </div>

      <div id="s4-cta-wrap" style="margin-top: 1rem;">
        <button class="btn-primary" id="s4-cta-btn">
          <span>ONE MORE THING...</span>
          <i class="fa-solid fa-arrow-right" style="font-size: 0.85rem;" aria-hidden="true"></i> 🧿
        </button>
      </div>
    </div>

    <!-- Chocolate Research Report Modal -->
    <div class="modal-overlay" id="s4-report-modal" role="dialog" aria-modal="true" aria-label="Chocolate Research Report">
      <div class="modal-content">
        <button class="modal-close-btn" id="s4-modal-close" aria-label="Close modal">✕</button>
        <h3 class="font-display" style="font-size: 1.3rem; color: var(--text-plum-dark); margin-bottom: 0.4rem; text-align: center;">
          Rakhi Gift Selection Report
        </h3>
        <p style="text-align: center; font-size: 0.75rem; letter-spacing: 0.1em; color: var(--text-plum-subtle); margin-bottom: 1rem;">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </p>

        <table class="report-table">
          <tr>
            <td>Subject:</td>
            <td><strong>Anwesha 🧿</strong></td>
          </tr>
          <tr>
            <td>Requirements:</td>
            <td>
              ✓ Must be chocolate<br>
              ✓ Must taste good<br>
              ✓ Must not be overly sweet
            </td>
          </tr>
          <tr>
            <td>Candidates:</td>
            <td>
              Multiple options considered 🤔<br>
              Several rejected ❌<br>
              <strong style="color: var(--rose-primary);">One survived 🏆 (KITKAT RICH)</strong>
            </td>
          </tr>
          <tr>
            <td>Lead Researcher:</td>
            <td><strong>Diganta</strong><br><span style="font-size: 0.78rem; color: var(--text-plum-subtle);">Professional Overthinker</span></td>
          </tr>
          <tr>
            <td>Consultant:</td>
            <td>
              <strong style="color: var(--rose-primary);">Monojit</strong><br>
              <span style="font-size: 0.78rem; color: var(--text-plum-subtle);">Chocolate Selection Consultant, Best Friend & Anwesha’s Boyfriend</span>
            </td>
          </tr>
        </table>

        <div style="background: var(--rose-pale); padding: 0.7rem; border-radius: 8px; margin: 0.8rem 0; font-size: 0.82rem; font-style: italic; color: var(--text-plum-dark);">
          Special thanks to Monojit for preventing me from making a questionable chocolate decision. 😭
        </div>

        <p style="text-align: center; font-weight: 700; color: var(--text-plum-dark); font-size: 0.95rem; margin-top: 0.6rem; font-family: var(--font-display);">
          Final Verdict: Approved for Rakhi Delivery 🧿
        </p>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const kitkatWrap = document.getElementById('s4-kitkat-wrap');
    const reportBtn = document.getElementById('s4-report-btn');
    const reportModal = document.getElementById('s4-report-modal');
    const modalClose = document.getElementById('s4-modal-close');
    const ctaBtn = document.getElementById('s4-cta-btn');

    if (kitkatWrap) {
      kitkatWrap.addEventListener('click', () => {
        audio.playSparkleSfx();
        if (window.appParticleCanvas) {
          const rect = kitkatWrap.getBoundingClientRect();
          window.appParticleCanvas.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
        }
        state.unlockAchievement(
          'chocolate_verified',
          'Note Unlocked',
          'Chocolate Verified: KitKat Rich approved 🍫',
          '🍫'
        );
      });
    }

    if (reportBtn && reportModal) {
      reportBtn.addEventListener('click', () => {
        audio.playSparkleSfx();
        reportModal.classList.add('active');
        state.recordDiscovery('chocolate_report');
      });
    }

    const closeModal = () => {
      if (reportModal) reportModal.classList.remove('active');
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (reportModal) {
      reportModal.addEventListener('click', (e) => {
        if (e.target === reportModal) closeModal();
      });
    }

    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        sceneManager.nextScene();
      });
    }
  }

  return { enter };
}
