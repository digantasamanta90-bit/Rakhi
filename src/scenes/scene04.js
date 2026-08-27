/**
 * SCENE 4 — 04_THE_GIFT
 * Dual physical gifts reveal (KitKat Rich + Bellavita),
 * Research report with Monojit consultation credit, and real-world physical handoff.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { content } from '../content/content.js';

export function createScene04(sceneManager) {
  const container = document.getElementById('scene-04');
  const c = content.scene4;

  container.innerHTML = `
    <div class="scene-content">
      <div class="scrapbook-card">
        <div style="text-align: center; margin-bottom: 0.4rem;">
          <p class="body-lead" style="font-size: 0.8rem; color: var(--rose-primary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px;">
            ${c.introLead}
          </p>
          <h2 class="font-display" style="font-size: clamp(1.15rem, 3.8vw, 1.45rem); color: var(--text-plum-dark); margin-bottom: 2px; font-style: italic;">
            ${c.giftCountTease}
          </h2>
        </div>

        <!-- Dual Gift Cards Container -->
        <div class="gift-cards-container">
          <!-- Gift 01: KitKat Rich -->
          <div class="gift-feature-card chocolate" id="s4-kitkat-card" role="button" aria-label="Inspect KitKat Rich" tabindex="0">
            <img src="assets/gifts/kitkat.png" alt="KitKat Rich" class="gift-img-thumb" onerror="this.src='assets/portraits/anwesha8.png';" />
            <div class="gift-info">
              <div class="gift-tag">${c.gift1.tag}</div>
              <div class="gift-title">${c.gift1.title}</div>
              <div class="gift-desc">Crispy wafer in rich chocolate. Selection verified by research. 🏆</div>
              <button class="btn-secondary" id="s4-report-btn" style="font-size: 0.72rem; padding: 0.25rem 0.6rem; margin-top: 4px; border-color: var(--choco-border);">
                <span>${c.gift1.reportButton}</span>
              </button>
            </div>
          </div>

          <!-- Gift 02: Bellavita -->
          <div class="gift-feature-card perfume" id="s4-bellavita-card" role="button" aria-label="Inspect Bellavita" tabindex="0">
            <img src="assets/gifts/bellavita.png" alt="Bellavita" class="gift-img-thumb" onerror="this.src='assets/portraits/anwesha10.png';" />
            <div class="gift-info">
              <div class="gift-tag" style="color: #a64b6e;">${c.gift2.tag}</div>
              <div class="gift-title">${c.gift2.title}</div>
              <div class="gift-desc">${c.gift2.shortSummary} ${c.gift2.punchline}</div>
            </div>
          </div>
        </div>

        <!-- Real-World Physical Handoff -->
        <div style="background: var(--rose-pale); border-left: 3px solid var(--rose-primary); padding: 0.55rem 0.75rem; border-radius: 0 8px 8px 0; margin-top: 0.5rem; text-align: left;">
          <p class="body-lead" style="font-weight: 600; color: var(--text-plum-dark); font-size: 0.84rem; margin-bottom: 2px;">
            ${c.physicalHandoff.lead}
          </p>
          <p class="body-lead" style="color: var(--rose-primary); font-size: 0.88rem; margin-bottom: 2px; font-family: var(--font-display); font-style: italic;">
            ${c.physicalHandoff.action}
          </p>
          <p class="body-subtle" style="font-size: 0.78rem;">
            ${c.physicalHandoff.affirmation} ${c.physicalHandoff.closing}
          </p>
        </div>
      </div>

      <div id="s4-cta-wrap" style="margin-top: 0.6rem;">
        <button class="btn-primary" id="s4-cta-btn">
          <span>${c.ctaText}</span>
          <i class="fa-solid fa-arrow-right" style="font-size: 0.8rem;" aria-hidden="true"></i> 🧿
        </button>
      </div>
    </div>

    <!-- Chocolate Research Report Modal -->
    <div class="modal-overlay" id="s4-report-modal" role="dialog" aria-modal="true" aria-label="Gift Research Report">
      <div class="modal-content">
        <button class="modal-close-btn" id="s4-modal-close" aria-label="Close modal">✕</button>
        <h3 class="font-display" style="font-size: 1.2rem; color: var(--text-plum-dark); margin-bottom: 0.3rem; text-align: center;">
          ${c.report.title}
        </h3>
        <p style="text-align: center; font-size: 0.72rem; letter-spacing: 0.1em; color: var(--text-plum-subtle); margin-bottom: 0.6rem;">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </p>

        <table class="report-table">
          <tr>
            <td>Subject:</td>
            <td><strong>${c.report.subject}</strong></td>
          </tr>
          <tr>
            <td>Requirements:</td>
            <td>
              ${c.report.requirements.join('<br>')}
            </td>
          </tr>
          <tr>
            <td>Candidates:</td>
            <td>
              ${c.report.candidates.join('<br>')}<br>
              <strong style="color: var(--rose-primary);">${c.report.finalSelection}</strong>
            </td>
          </tr>
          <tr>
            <td>Lead Researcher:</td>
            <td><strong>${c.report.researcher}</strong></td>
          </tr>
          <tr>
            <td>Research Assistant:</td>
            <td>
              <strong style="color: var(--rose-primary);">${c.report.assistant}</strong><br>
              <span style="font-size: 0.74rem; color: var(--text-plum-subtle);">Best friend & Anwesha’s boyfriend</span>
            </td>
          </tr>
        </table>

        <div style="background: var(--rose-pale); padding: 0.5rem 0.65rem; border-radius: 8px; margin: 0.5rem 0; font-size: 0.78rem; font-style: italic; color: var(--text-plum-dark);">
          ${c.report.assistantNote}
        </div>

        <p style="text-align: center; font-weight: 700; color: var(--text-plum-dark); font-size: 0.88rem; margin-top: 0.4rem; font-family: var(--font-display);">
          Final Verdict: Both Gifts Approved for Rakhi 🧿
        </p>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const kitkatCard = document.getElementById('s4-kitkat-card');
    const bellavitaCard = document.getElementById('s4-bellavita-card');
    const reportBtn = document.getElementById('s4-report-btn');
    const reportModal = document.getElementById('s4-report-modal');
    const modalClose = document.getElementById('s4-modal-close');
    const ctaBtn = document.getElementById('s4-cta-btn');

    if (kitkatCard) {
      kitkatCard.addEventListener('click', (e) => {
        if (e.target.closest('#s4-report-btn')) return;
        audio.playSparkleSfx();
        if (window.appParticleCanvas) {
          const rect = kitkatCard.getBoundingClientRect();
          window.appParticleCanvas.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
        }
        state.unlockAchievement(
          'chocolate_verified',
          'Note Unlocked',
          'KitKat Rich Approved 🍫',
          '🍫'
        );
      });
    }

    if (bellavitaCard) {
      bellavitaCard.addEventListener('click', () => {
        audio.playSparkleSfx();
        if (window.appParticleCanvas) {
          const rect = bellavitaCard.getBoundingClientRect();
          window.appParticleCanvas.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
        }
        state.unlockAchievement(
          'bellavita_verified',
          'Note Unlocked',
          'Bellavita Fragrance Set Approved 🌸',
          '🌸'
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
