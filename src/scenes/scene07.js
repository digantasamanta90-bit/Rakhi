/**
 * SCENE 7 — 07_THE_APOLOGY (THE ONE THING I DIDN'T PLAN)
 * Quiet, intimate, sincere reality check.
 * Honest accountability for missing the morning meeting at the metro gate,
 * preserved in Diganta's voice, leading with warmth and hope into the finale.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { content } from '../content/content.js';

export function createScene07(sceneManager) {
  const container = document.getElementById('scene-07');
  const c = content.scene7;

  container.innerHTML = `
    <div class="scene-content s7-scene-content">
      <!-- Quiet Header Badge -->
      <div class="s7-badge-wrap" id="s7-badge-wrap">
        <span class="s7-field-tag font-mono">${c.badge}</span>
        <span class="s7-protocol-status font-mono">${c.protocolStatus}</span>
      </div>

      <!-- Sincere Letter / Apology Card -->
      <div class="scrapbook-card s7-card" id="s7-card">
        <div class="s7-card-tape" aria-hidden="true"></div>

        <div class="s7-header">
          <p class="title-sub s7-pretitle">${c.title}</p>
          <h2 class="font-display s7-title">${c.subTitle}</h2>
        </div>

        <div class="s7-story-body">
          <!-- Opening context -->
          <p class="body-lead s7-lead-quote">
            ${c.openingLines[0]}
          </p>
          <p class="s7-paragraph s7-emphasis">
            ${c.openingLines[1]}<br>
            <span class="s7-contrast">${c.openingLines[2]}</span>
          </p>

          <!-- Explanation without excuses -->
          <div class="s7-explanation-block">
            <p class="s7-paragraph">${c.explanation[0]}</p>
            <p class="s7-paragraph s7-muted-joke">${c.explanation[1]}</p>
            <p class="s7-paragraph s7-sorry-line">${c.explanation[2]}</p>
          </div>

          <!-- Direct accountability -->
          <div class="s7-accountability-block">
            <p class="s7-paragraph">${c.accountability[0]}</p>
            <p class="s7-paragraph s7-accountability-highlight">${c.accountability[1]}</p>
          </div>

          <!-- Forward-looking hope -->
          <div class="s7-forward-block">
            <p class="s7-paragraph s7-forward-line">${c.forwardLook[0]}</p>
            <p class="s7-paragraph">${c.forwardLook[1]}</p>
            <p class="s7-paragraph s7-forward-highlight">${c.forwardLook[2]}</p>
          </div>

          <!-- Subtle Footer Note -->
          <div class="s7-note-footer">
            <span class="font-mono s7-footer-text">${c.noteFooter}</span>
          </div>
        </div>
      </div>

      <!-- Forward CTA to Finale -->
      <div class="s7-cta-wrap" id="s7-cta-wrap">
        <button class="btn-primary s7-cta-btn" id="s7-cta-btn">
          <span>${c.ctaText}</span>
        </button>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const card = document.getElementById('s7-card');
    const ctaWrap = document.getElementById('s7-cta-wrap');
    const ctaBtn = document.getElementById('s7-cta-btn');
    const badgeWrap = document.getElementById('s7-badge-wrap');

    // Subtle entrance timing
    await delay(200);
    if (badgeWrap) badgeWrap.classList.add('visible');

    await delay(300);
    if (card) card.classList.add('visible');

    await delay(700);
    if (ctaWrap) ctaWrap.classList.add('visible');

    // Interactive badge discovery
    if (badgeWrap) {
      badgeWrap.addEventListener('click', () => {
        audio.playSparkleSfx();
        state.showToast('Field Note', 'Rakhi protocol: delayed, not cancelled.', '📝');
        state.recordDiscovery('apology_field_note');
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
