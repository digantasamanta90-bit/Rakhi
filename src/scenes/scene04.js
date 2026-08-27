/**
 * SCENE 4 — 04_THE_GIFT
 * KitKat Rich visual reveal, selection research report with Monojit credit,
 * and the crucial physical gift handoff moment.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { renderKitKatSvg } from '../components/KitKatVisual.js';

export function createScene04(sceneManager) {
  const container = document.getElementById('scene-04');

  container.innerHTML = `
    <div class="scene-content">
      <div class="scrapbook-card" style="max-width: 580px; text-align: left; margin-bottom: 1.2rem;">
        <p class="body-lead" style="margin-bottom: 0.4rem; color: var(--rose-light); font-weight: 600;">
          You might have noticed something sitting beside you. 👀
        </p>
        <h2 class="font-display" style="font-size: clamp(1.4rem, 4.5vw, 2rem); color: var(--gold-light); margin-bottom: 0.6rem;">
          Yes. THAT.
        </h2>

        <!-- Stylized KitKat Rich 3D Visual -->
        <div class="kitkat-hero-wrapper" id="s4-kitkat-wrap" role="button" aria-label="Tap KitKat for chocolate approval" tabindex="0">
          ${renderKitKatSvg({ width: 260, height: 160, id: 's4-kitkat' })}
        </div>

        <div style="text-align: center; margin: 0.6rem 0 1.2rem;">
          <span style="font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold-light); font-weight: 700;">
            YOUR OFFICIAL RAKHI GIFT 🍫
          </span>
          <h3 class="font-display" style="font-size: 1.6rem; color: #ffffff;">KitKat Rich</h3>
        </div>

        <!-- Selection Story Sequence -->
        <div class="selection-story" style="font-size: 0.95rem; line-height: 1.65; color: var(--text-ivory-muted);">
          <p style="margin-bottom: 0.4rem;">Now, before you think I randomly picked a chocolate...</p>
          <p style="margin-bottom: 0.4rem; font-weight: 600; color: var(--gold-light);">No.</p>
          <p style="margin-bottom: 0.8rem; font-style: italic; color: var(--rose-light);">There was research involved. 😭</p>

          <ul style="list-style: none; padding-left: 0; margin-bottom: 1rem;">
            <li style="margin-bottom: 4px;">• Question 1: What does Anwesha like?</li>
            <li style="margin-bottom: 4px;">• Question 2: What should I get her?</li>
            <li style="margin-bottom: 4px;">• Question 3: What won’t be too sweet? 👀</li>
          </ul>

          <p style="margin-bottom: 0.4rem;">After extremely serious and completely unnecessary research...</p>
          <p style="font-family: var(--font-display); font-size: 1.2rem; color: var(--gold-light); font-weight: 600;">
            KitKat Rich won. 🏆
          </p>
        </div>

        <div style="margin-top: 1.2rem;">
          <button class="btn-secondary" id="s4-report-btn">
            VIEW THE RESEARCH 📊
          </button>
        </div>

        <hr style="border: none; border-top: 1px solid var(--bg-plum-border); margin: 1.4rem 0;">

        <!-- Physical Handoff Instruction -->
        <div class="handoff-box" style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid var(--gold-light); padding: 0.8rem 1rem; border-radius: 0 10px 10px 0;">
          <p class="body-lead" style="font-weight: 600; color: var(--text-ivory-light); margin-bottom: 0.4rem;">
            Now look away from the screen for a second.
          </p>
          <p class="body-lead" style="color: var(--gold-light); margin-bottom: 0.4rem;">
            Look at your actual gift. 😭🍫
          </p>
          <p class="body-subtle" style="font-style: italic;">
            Yep. That’s the one. Go on. It’s yours.
          </p>
        </div>
      </div>

      <div id="s4-cta-wrap" style="margin-top: 1rem;">
        <button class="btn-primary" id="s4-cta-btn">
          ONE MORE THING... → 🧿
        </button>
      </div>
    </div>

    <!-- Chocolate Research Report Modal -->
    <div class="modal-overlay" id="s4-report-modal" role="dialog" aria-modal="true" aria-label="Chocolate Research Report">
      <div class="modal-content">
        <button class="modal-close-btn" id="s4-modal-close" aria-label="Close modal">✕</button>
        <h3 class="font-display" style="font-size: 1.35rem; color: var(--gold-light); margin-bottom: 0.5rem; text-align: center;">
          RAKHI GIFT SELECTION REPORT
        </h3>
        <p style="text-align: center; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--text-ivory-subtle); margin-bottom: 1.2rem;">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </p>

        <table class="report-table">
          <tr>
            <td>Subject:</td>
            <td>Anwesha 🧿</td>
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
              <strong style="color: var(--gold-light);">One survived 🏆 (KITKAT RICH)</strong>
            </td>
          </tr>
          <tr>
            <td>Lead Researcher:</td>
            <td><strong>Diganta</strong><br><span style="font-size: 0.8rem; color: var(--text-ivory-subtle);">Professional Overthinker</span></td>
          </tr>
          <tr>
            <td>Consultant:</td>
            <td>
              <strong style="color: var(--rose-light);">Monojit</strong><br>
              <span style="font-size: 0.8rem; color: var(--text-ivory-subtle);">Chocolate Selection Consultant, Best Friend & Anwesha’s Boyfriend</span>
            </td>
          </tr>
        </table>

        <div style="background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px; margin: 1rem 0; font-size: 0.85rem; font-style: italic; color: var(--rose-light);">
          Special thanks to Monojit for preventing me from making a questionable chocolate decision. 😭
        </div>

        <p style="text-align: center; font-weight: 700; color: var(--gold-light); font-size: 1rem; margin-top: 0.8rem;">
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

    // Interactive KitKat Tap
    if (kitkatWrap) {
      kitkatWrap.addEventListener('click', () => {
        audio.playSparkleSfx();
        if (window.appParticleCanvas) {
          const rect = kitkatWrap.getBoundingClientRect();
          window.appParticleCanvas.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
        }
        state.unlockAchievement(
          'chocolate_verified',
          'Achievement Unlocked',
          'Chocolate Verified: KitKat Rich approved 🍫',
          '🍫'
        );
      });
    }

    // Modal Events
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
