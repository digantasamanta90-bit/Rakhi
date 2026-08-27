/**
 * SCENE 3 — 03_WHY_A_WEBSITE
 * Conversational paper journal, whimsical creative code notes, evidence modal.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';

export function createScene03(sceneManager) {
  const container = document.getElementById('scene-03');

  container.innerHTML = `
    <!-- Floating Whimsical Code Fragments Backdrop -->
    <div class="code-backdrop" aria-hidden="true">
      <div class="floating-code-tag" style="top: 12%; left: 6%;">const siblingBond = Infinity;</div>
      <div class="floating-code-tag" style="top: 22%; right: 8%;">&lt;sister name="Anwesha" /&gt;</div>
      <div class="floating-code-tag" style="bottom: 20%; left: 10%;">{ love: 100%, sleep: 0% }</div>
    </div>

    <div class="scene-content">
      <div class="scrapbook-card" style="max-width: 500px; text-align: left;">
        <h2 class="font-display" style="font-size: clamp(1.25rem, 3.8vw, 1.6rem); color: var(--text-plum-dark); margin-bottom: 0.6rem;">
          Okay... but why is there an entire website attached to a chocolate?
        </h2>
        <p class="body-lead" style="margin-bottom: 1rem; font-style: italic; color: var(--rose-primary);">
          Fair question. 😭
        </p>

        <div class="staged-text-sequence">
          <p class="body-lead" style="margin-bottom: 0.4rem;">I could’ve just given you the chocolate.</p>
          <p class="body-lead" style="margin-bottom: 0.4rem;">And written a normal note.</p>
          <p class="body-lead" style="margin-bottom: 0.8rem; color: var(--text-plum-subtle);">That would’ve been completely normal.</p>
          
          <p class="body-lead" style="margin-bottom: 0.3rem; color: var(--rose-primary); font-weight: 500;">But apparently...</p>
          <p class="body-lead" style="margin-bottom: 0.3rem; font-weight: 600;">I recently started learning web development.</p>
          <p class="body-lead" style="margin-bottom: 0.6rem; color: var(--text-plum-subtle);">So naturally, my brain decided...</p>
          <p class="body-lead" style="font-family: var(--font-display); font-size: 1.2rem; color: var(--text-plum-dark); margin-bottom: 1rem; font-style: italic;">
            “Let’s make her a whole damn website.” 💀
          </p>

          <hr style="border: none; border-top: 1px dashed var(--border-delicate); margin: 1rem 0;">

          <p class="body-lead" style="margin-bottom: 0.4rem; color: var(--rose-primary); font-weight: 500;">But honestly...</p>
          <p class="body-lead" style="margin-bottom: 0.4rem;">I wanted to make something a little different for you.</p>
          <p class="body-lead" style="margin-bottom: 0.4rem;">Something that isn’t just a message you read once and forget.</p>
          <p class="body-lead" style="margin-bottom: 0.8rem; color: var(--rose-primary); font-style: italic;">Something you can come back to.</p>

          <p class="body-subtle" style="font-family: var(--font-display); font-size: 1.05rem; color: var(--text-plum-dark);">
            Jokes apart... You are my sister. And I wanted this Rakhi to be a little more memorable.
          </p>
        </div>

        <div style="margin-top: 1.2rem;">
          <button class="btn-secondary" id="s3-evidence-btn">
            <span>WANT TO SEE THE EVIDENCE?</span> 👀
          </button>
        </div>
      </div>

      <div id="s3-cta-wrap" style="margin-top: 1.2rem;">
        <button class="btn-primary" id="s3-cta-btn">
          <span>SO... WHAT DID I GET YOU?</span>
          <i class="fa-solid fa-arrow-right" style="font-size: 0.85rem;" aria-hidden="true"></i> 🍫
        </button>
      </div>
    </div>

    <!-- Evidence Modal -->
    <div class="modal-overlay" id="s3-evidence-modal" role="dialog" aria-modal="true" aria-label="Evidence Report">
      <div class="modal-content">
        <button class="modal-close-btn" id="s3-modal-close" aria-label="Close modal">✕</button>
        <h3 class="font-display" style="font-size: 1.3rem; color: var(--text-plum-dark); margin-bottom: 0.8rem; text-align: center;">
          Exhibit A: The Evidence 📊
        </h3>
        
        <div class="evidence-comparison">
          <div class="evidence-col">
            <h4 style="font-size: 0.8rem; color: var(--text-plum-subtle); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Normal Brother</h4>
            <p style="font-size: 0.85rem; margin-bottom: 3px;">✓ Buys chocolate</p>
            <p style="font-size: 0.85rem; color: var(--text-plum-subtle);">✓ Writes card</p>
            <p style="font-size: 0.85rem; color: var(--text-plum-subtle);">✓ Sleeps 8 hours</p>
          </div>
          <div class="evidence-col highlight">
            <h4 style="font-size: 0.8rem; color: var(--rose-primary); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Me (Diganta)</h4>
            <p style="font-size: 0.85rem; margin-bottom: 3px;">✓ Buys chocolate</p>
            <p style="font-size: 0.85rem; margin-bottom: 3px;">✓ Overthinks gift</p>
            <p style="font-size: 0.85rem; margin-bottom: 3px;">✓ Makes website</p>
            <p style="font-size: 0.85rem; margin-bottom: 3px;">✓ Loses sleep</p>
            <p style="font-size: 0.85rem; color: var(--rose-primary); font-weight: 600;">✓ Questions life choices</p>
          </div>
        </div>

        <p class="body-lead" style="text-align: center; margin-top: 0.8rem; color: var(--text-plum-dark); font-weight: 600; font-family: var(--font-display); font-style: italic;">
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
