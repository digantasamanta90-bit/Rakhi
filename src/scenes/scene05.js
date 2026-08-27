/**
 * SCENE 5 — 05_THE_MESSAGE
 * Calm, spacious personal letter, full editorial portrait illustration (anwesha_calm.png),
 * warm paper card, handwritten signature, and seamless light aesthetic.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { content } from '../content/content.js';
import { renderPortrait } from '../components/PortraitFrame.js';

export function createScene05(sceneManager) {
  const container = document.getElementById('scene-05');
  const c = content.scene5;

  container.innerHTML = `
    <div class="scene-content">
      <!-- Title Header -->
      <div class="s5-header">
        <h2 class="font-display s5-title">
          ${c.header}
        </h2>
      </div>

      <!-- Full Editorial Portrait (Complete illustration visible, uncropped natural aspect ratio) -->
      <div class="s5-portrait-container">
        ${renderPortrait('assets/portraits/anwesha_calm.png', 'Anwesha', '', 'editorial')}
      </div>

      <!-- Sincere Letter Card -->
      <div class="scrapbook-card s5-letter-card">
        <div class="s5-message-body">
          <p class="s5-lead-quote">
            ${c.leadQuote}
          </p>
          ${c.messageParagraphs.map(p => `
            <p class="message-paragraph">${p}</p>
          `).join('')}
          <p class="s5-closing-joke">
            ${c.closingJoke}
          </p>
        </div>

        <!-- Handwritten Signature Block -->
        <div class="signature-block">
          <div class="s5-keep-wrapper">
            <button class="btn-secondary" id="s5-keep-btn" style="font-size: 0.76rem; padding: 0.35rem 0.8rem;">
              <span>${c.keepButton}</span>
            </button>
            <div id="s5-keep-feedback" class="s5-keep-feedback">
              ${c.keepSuccess}
            </div>
          </div>
          <div class="s5-sig-author">
            <span class="s5-sig-prefix">${c.signature.prefix}</span><br>
            <span class="handwritten-sig" style="font-size: 1.15rem;">${c.signature.author}</span>
          </div>
        </div>
      </div>

      <!-- Tone Reset & Primary CTA -->
      <div class="s5-cta-section">
        <p class="body-subtle s5-cta-lead">
          ${c.ctaLead}
        </p>
        <button class="btn-primary" id="s5-cta-btn">
          <span>${c.ctaText}</span>
          <i class="fa-solid fa-arrow-right" style="font-size: 0.8rem;" aria-hidden="true"></i> 💀
        </button>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const keepBtn = document.getElementById('s5-keep-btn');
    const keepFeedback = document.getElementById('s5-keep-feedback');
    const ctaBtn = document.getElementById('s5-cta-btn');

    if (keepBtn && keepFeedback) {
      keepBtn.addEventListener('click', () => {
        audio.playSparkleSfx();
        keepBtn.style.display = 'none';
        keepFeedback.style.display = 'block';
        state.recordDiscovery('kept_message');
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
