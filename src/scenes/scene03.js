/**
 * SCENE 3 — 03_WHY_A_WEBSITE
 * Conversational staging, web development joke, artistic code motifs, evidence modal.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';

export function createScene03(sceneManager) {
  const container = document.getElementById('scene-03');

  container.innerHTML = `
    <!-- Floating Artistic Code Motifs Backdrop -->
    <div class="code-backdrop" aria-hidden="true">
      <div class="floating-code-tag" style="top: 15%; left: 8%;">const siblingBond = Infinity;</div>
      <div class="floating-code-tag" style="top: 25%; right: 10%;">npm run rakhi-surprise</div>
      <div class="floating-code-tag" style="bottom: 22%; left: 12%;">&lt;sister name="Anwesha" /&gt;</div>
      <div class="floating-code-tag" style="bottom: 14%; right: 14%;">{ love: 100%, sleep: 0% }</div>
    </div>

    <div class="scene-content">
      <div class="scrapbook-card" style="max-width: 580px; text-align: left; position: relative; z-index: 2;">
        <h2 class="font-display" style="font-size: clamp(1.3rem, 4vw, 1.8rem); color: var(--gold-light); margin-bottom: 0.8rem;">
          Okay... but why is there an entire website attached to a chocolate?
        </h2>
        <p class="body-lead" style="margin-bottom: 1.2rem; font-style: italic; color: var(--rose-light);">
          Fair question. 😭
        </p>

        <div class="staged-text-sequence" id="s3-story-lines">
          <p class="body-lead s3-line" style="margin-bottom: 0.5rem;">I could’ve just given you the chocolate.</p>
          <p class="body-lead s3-line" style="margin-bottom: 0.5rem;">And written a normal note.</p>
          <p class="body-lead s3-line" style="margin-bottom: 0.8rem; color: var(--text-ivory-subtle);">That would’ve been completely normal.</p>
          
          <p class="body-lead s3-line" style="margin-bottom: 0.4rem; color: var(--gold-light);">But apparently...</p>
          <p class="body-lead s3-line" style="margin-bottom: 0.4rem; font-weight: 600;">I recently started learning web development.</p>
          <p class="body-lead s3-line" style="margin-bottom: 0.8rem; color: var(--text-ivory-subtle);">So naturally, my brain decided...</p>
          <p class="body-lead s3-line" style="font-family: var(--font-display); font-size: 1.3rem; color: var(--rose-light); margin-bottom: 1.2rem;">
            “Let’s make her a whole damn website.” 💀
          </p>

          <hr style="border: none; border-top: 1px solid var(--bg-plum-border); margin: 1.2rem 0;">

          <p class="body-lead s3-line" style="margin-bottom: 0.5rem; color: var(--gold-light);">But honestly...</p>
          <p class="body-lead s3-line" style="margin-bottom: 0.5rem;">I wanted to make something a little different for you.</p>
          <p class="body-lead s3-line" style="margin-bottom: 0.5rem;">Something that isn’t just a message you read once and forget.</p>
          <p class="body-lead s3-line" style="margin-bottom: 1rem; color: var(--rose-light); font-style: italic;">Something you can come back to.</p>

          <p class="body-subtle s3-line" style="font-family: var(--font-display); font-size: 1.1rem; color: var(--text-ivory-muted);">
            Jokes apart... You are my sister. And I wanted this Rakhi to be a little more memorable.
          </p>
        </div>

        <div style="margin-top: 1.4rem; display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <button class="btn-secondary" id="s3-evidence-btn">
            WANT TO SEE THE EVIDENCE? 👀
          </button>
        </div>
      </div>

      <div id="s3-cta-wrap" style="margin-top: 1.4rem;">
        <button class="btn-primary" id="s3-cta-btn">
          SO... WHAT DID I GET YOU? → 🍫
        </button>
      </div>
    </div>

    <!-- Evidence Modal -->
    <div class="modal-overlay" id="s3-evidence-modal" role="dialog" aria-modal="true" aria-label="Evidence Report">
      <div class="modal-content">
        <button class="modal-close-btn" id="s3-modal-close" aria-label="Close modal">✕</button>
        <h3 class="font-display" style="font-size: 1.4rem; color: var(--gold-light); margin-bottom: 1rem;">
          EXHIBIT A: THE EVIDENCE 📊
        </h3>
        
        <div class="evidence-comparison">
          <div class="evidence-col">
            <h4 style="font-size: 0.85rem; color: var(--text-ivory-subtle); margin-bottom: 0.6rem;">NORMAL BROTHER</h4>
            <p style="font-size: 0.9rem; margin-bottom: 4px;">✓ Buys chocolate</p>
            <p style="font-size: 0.9rem; color: var(--text-ivory-subtle);">✓ Writes card</p>
            <p style="font-size: 0.9rem; color: var(--text-ivory-subtle);">✓ Sleeps 8 hours</p>
          </div>
          <div class="evidence-col highlight">
            <h4 style="font-size: 0.85rem; color: var(--gold-light); margin-bottom: 0.6rem;">ME (DIGANTA)</h4>
            <p style="font-size: 0.9rem; margin-bottom: 4px;">✓ Buys chocolate</p>
            <p style="font-size: 0.9rem; margin-bottom: 4px;">✓ Overthinks gift</p>
            <p style="font-size: 0.9rem; margin-bottom: 4px;">✓ Makes website</p>
            <p style="font-size: 0.9rem; margin-bottom: 4px;">✓ Loses sleep</p>
            <p style="font-size: 0.9rem; color: var(--rose-light);">✓ Questions life choices</p>
          </div>
        </div>

        <p class="body-lead" style="text-align: center; margin-top: 1rem; color: var(--gold-light); font-weight: 600;">
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

    // Evidence Modal Toggle
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
