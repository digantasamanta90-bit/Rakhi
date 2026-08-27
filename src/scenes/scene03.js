/**
 * SCENE 3 — 03_WHY_A_WEBSITE
 * Conversational paper journal, 4-step web dev joke sequence,
 * reaction scrapbook photo, and evidence modal.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { content } from '../content/content.js';
import { renderPortrait } from '../components/PortraitFrame.js';

export function createScene03(sceneManager) {
  const container = document.getElementById('scene-03');
  const c = content.scene3;

  container.innerHTML = `
    <!-- Floating Whimsical Code Fragments Backdrop -->
    <div class="code-backdrop" aria-hidden="true">
      <div class="floating-code-tag" style="top: 10%; left: 5%;">const siblingBond = Infinity;</div>
      <div class="floating-code-tag" style="top: 18%; right: 6%;">&lt;sister name="Anwesha" /&gt;</div>
      <div class="floating-code-tag" style="bottom: 15%; left: 8%;">{ love: 100%, sleep: 0% }</div>
    </div>

    <div class="scene-content">
      <div class="scrapbook-card">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.6rem;">
          <div style="flex: 1;">
            <p class="body-lead" style="font-size: 0.8rem; color: var(--rose-primary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">
              ${c.title}
            </p>
            <h2 class="font-display" style="font-size: clamp(1.2rem, 3.8vw, 1.5rem); color: var(--text-plum-dark); margin-bottom: 0.3rem;">
              ${c.headline}
            </h2>
          </div>
          <!-- Supporting Reaction Photo -->
          <div style="flex-shrink: 0;">
            ${renderPortrait('assets/portraits/anwesha4.png', 'Anwesha Reaction', '', 'scrapbook')}
          </div>
        </div>

        <div style="font-size: 0.84rem; line-height: 1.5; color: var(--text-plum-muted); margin-top: 0.3rem;">
          <p style="margin-bottom: 2px;">${c.alternatives[0]}</p>
          <p style="margin-bottom: 2px;">${c.alternatives[1]}</p>
          <p style="margin-bottom: 0.35rem; color: var(--text-plum-subtle);">${c.alternatives[2]}</p>
          <p style="color: var(--rose-primary); font-weight: 600; margin-bottom: 0.2rem;">${c.punchline}</p>
          <p style="font-family: var(--font-display); font-size: 1.05rem; color: var(--text-plum-dark); font-style: italic; margin-bottom: 0.5rem;">
            ${c.websiteCreated}
          </p>
        </div>

        <!-- 4 Step Development Grid -->
        <div class="step-card-grid">
          ${c.steps.map(s => `
            <div class="step-item">
              <div class="step-item-num">${s.num}</div>
              <div class="step-item-desc">${s.desc}</div>
            </div>
          `).join('')}
        </div>

        <div style="font-size: 0.82rem; line-height: 1.5; color: var(--text-plum-muted); border-top: 1px dashed var(--border-delicate); padding-top: 0.4rem; margin-top: 0.4rem;">
          <p style="margin-bottom: 0.2rem; font-style: italic; color: var(--text-plum-dark);">${c.escalation}</p>
          <p style="margin-bottom: 0.2rem;">${c.intention}</p>
          <p style="color: var(--rose-primary); font-weight: 600; font-style: italic;">${c.suffering}</p>
        </div>

        <div style="margin-top: 0.6rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem;">
          <button class="btn-secondary" id="s3-evidence-btn">
            <span>${c.evidenceButton}</span>
          </button>
          <span style="font-size: 0.76rem; color: var(--text-plum-subtle); font-style: italic;">${c.transition}</span>
        </div>
      </div>

      <div id="s3-cta-wrap" style="margin-top: 0.6rem;">
        <button class="btn-primary" id="s3-cta-btn">
          <span>${c.ctaText}</span>
        </button>
      </div>
    </div>

    <!-- Evidence Modal -->
    <div class="modal-overlay" id="s3-evidence-modal" role="dialog" aria-modal="true" aria-label="Evidence Report">
      <div class="modal-content">
        <button class="modal-close-btn" id="s3-modal-close" aria-label="Close modal">✕</button>
        <h3 class="font-display" style="font-size: 1.25rem; color: var(--text-plum-dark); margin-bottom: 0.6rem; text-align: center;">
          Exhibit A: The Evidence 📊
        </h3>
        
        <div class="evidence-comparison" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; text-align: left;">
          <div style="background: #f7f1ea; padding: 0.65rem; border-radius: 10px; border: 1px solid var(--border-paper);">
            <h4 style="font-size: 0.74rem; color: var(--text-plum-subtle); margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em;">Normal Brother</h4>
            <p style="font-size: 0.78rem; margin-bottom: 2px;">✓ Buys gift</p>
            <p style="font-size: 0.78rem; margin-bottom: 2px; color: var(--text-plum-subtle);">✓ Writes card</p>
            <p style="font-size: 0.78rem; color: var(--text-plum-subtle);">✓ Sleeps 8 hours</p>
          </div>
          <div style="background: var(--rose-pale); padding: 0.65rem; border-radius: 10px; border: 1px solid var(--rose-primary);">
            <h4 style="font-size: 0.74rem; color: var(--rose-primary); margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Me (Diganta)</h4>
            <p style="font-size: 0.78rem; margin-bottom: 2px;">✓ Buys gifts</p>
            <p style="font-size: 0.78rem; margin-bottom: 2px;">✓ Overthinks everything</p>
            <p style="font-size: 0.78rem; margin-bottom: 2px;">✓ Makes website</p>
            <p style="font-size: 0.78rem; color: var(--rose-primary); font-weight: 600;">✓ 3 AM coding</p>
          </div>
        </div>

        <p class="body-lead" style="text-align: center; margin-top: 0.6rem; color: var(--text-plum-dark); font-weight: 600; font-family: var(--font-display); font-style: italic; font-size: 0.92rem;">
          Worth it. Probably. 😭
        </p>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const evidenceBtn = document.getElementById('s3-evidence-btn');
    const evidenceModal = document.getElementById('s3-evidence-modal');
    const modalClose = document.getElementById('s3-modal-close');
    const ctaBtn = document.getElementById('s3-cta-btn');

    if (evidenceBtn && evidenceModal) {
      evidenceBtn.addEventListener('click', () => {
        audio.playSparkleSfx();
        evidenceModal.classList.add('active');
        state.recordDiscovery('evidence_modal');
      });
    }

    const closeModal = () => {
      if (evidenceModal) evidenceModal.classList.remove('active');
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (evidenceModal) {
      evidenceModal.addEventListener('click', (e) => {
        if (e.target === evidenceModal) closeModal();
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
