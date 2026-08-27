/**
 * SCENE 6 — 06_THE_SIBLING_ZONE
 * Sibling Mode hub, Brother card, Sister card with photo, Monojit catalyst card,
 * Do Not Press escalation, and secret easter eggs.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { content } from '../content/content.js';
import { renderPortrait } from '../components/PortraitFrame.js';

export function createScene06(sceneManager) {
  const container = document.getElementById('scene-06');
  const c = content.scene6;

  container.innerHTML = `
    <div class="scene-content">
      <!-- Title & Mode Activation -->
      <div style="margin-bottom: 0.4rem; text-align: center;">
        <h2 class="font-display" style="font-size: clamp(1.2rem, 4vw, 1.6rem); color: var(--text-plum-dark); margin-bottom: 2px; font-style: italic;">
          ${c.header}
        </h2>
        <p class="body-lead" style="color: var(--rose-primary); font-size: 0.84rem; margin-bottom: 0.3rem;">
          ${c.subtext}
        </p>
        
        <div style="display: inline-block; background: var(--rose-pale); border: 1px solid var(--border-delicate); border-radius: 6px; padding: 0.25rem 0.6rem; font-size: 0.72rem; font-family: var(--font-mono);">
          <span style="color: var(--text-plum-dark); font-weight: 600;">${c.modeTag}</span>
        </div>
      </div>

      <!-- Interaction Hub Cards -->
      <div class="sibling-grid">
        <!-- Card 1: The Brother -->
        <div class="sibling-card" id="s6-card-brother">
          <div class="sibling-card-header">
            <span>👦 ${c.brotherCard.title}</span>
          </div>
          <div style="font-size: 0.78rem; line-height: 1.45; color: var(--text-plum-muted);">
            <p>${c.brotherCard.description}</p>
            <p style="margin-top: 3px;"><strong>Reliability:</strong> ${c.brotherCard.reliability}</p>
            <p><strong>Effort:</strong> ${c.brotherCard.effort}</p>
            <p><strong>Refunds:</strong> ${c.brotherCard.refundPolicy}</p>
            <button class="btn-secondary" id="s6-inspect-brother" style="font-size: 0.72rem; padding: 0.2rem 0.55rem; margin-top: 4px;">
              <span>${c.brotherCard.actionText}</span>
            </button>
            <p id="s6-brother-diag" style="color: var(--rose-primary); font-weight: 600; margin-top: 3px; display: none;"></p>
          </div>
        </div>

        <!-- Card 2: The Sister -->
        <div class="sibling-card" id="s6-card-sister">
          <div class="sibling-card-header">
            <span>👧 ${c.sisterCard.title}</span>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center; font-size: 0.78rem; line-height: 1.4; color: var(--text-plum-muted);">
            <div style="flex: 1;">
              <p><strong>Known for:</strong> ${c.sisterCard.knownFor}</p>
              <p><strong>Currently:</strong> ${c.sisterCard.currently}</p>
              <p style="color: var(--text-plum-dark); margin-top: 2px;"><strong>Threat:</strong> ${c.sisterCard.threatLevel}</p>
            </div>
            <div style="width: 50px; height: 50px; flex-shrink: 0; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-delicate);">
              <img src="assets/portraits/anwesha6.png" alt="Anwesha" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none';" />
            </div>
          </div>
        </div>

        <!-- Card 3: The Friend Who Caused This (Monojit) -->
        <div class="sibling-card" id="s6-card-monojit" style="grid-column: 1 / -1;">
          <div class="sibling-card-header">
            <span>🤝 ${c.monojitCard.title}</span>
          </div>
          <div style="font-size: 0.78rem; line-height: 1.45; color: var(--text-plum-muted);">
            <p style="color: var(--text-plum-dark); font-weight: 500; margin-bottom: 2px;">${c.monojitCard.role}</p>
            <ul style="list-style: none; padding-left: 0; margin-bottom: 3px;">
              ${c.monojitCard.points.map(p => `<li>• ${p}</li>`).join('')}
            </ul>
            <p style="color: var(--rose-primary); font-style: italic; font-weight: 600;">${c.monojitCard.closing}</p>
          </div>
        </div>

        <!-- Card 4: Do Not Press -->
        <div class="sibling-card" id="s6-card-btn" style="border-color: rgba(224, 108, 117, 0.35); grid-column: 1 / -1;">
          <div class="sibling-card-header">
            <span style="color: #e06c75;">🚨 DO NOT PRESS THIS BUTTON</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
            <p id="s6-press-text" style="font-size: 0.78rem; color: var(--text-plum-muted); flex: 1;">
              ${c.doNotPress.stage0}
            </p>
            <button class="btn-secondary" id="s6-press-action" style="font-size: 0.74rem; padding: 0.25rem 0.6rem; border-color: rgba(224, 108, 117, 0.4); flex-shrink: 0;">
              ${c.doNotPress.buttonText}
            </button>
          </div>
        </div>
      </div>

      <!-- Secret Motifs -->
      <div style="margin: 0.3rem 0; text-align: center;">
        <span style="font-size: 0.7rem; letter-spacing: 0.08em; color: var(--text-plum-subtle); text-transform: uppercase;">Secret Motifs:</span>
        <div class="secret-clickables">
          ${c.motifs.map(m => `
            <span class="secret-item" data-msg="${m.label}" role="button" aria-label="Secret motif ${m.icon}">${m.icon}</span>
          `).join('')}
        </div>
      </div>

      <!-- Final Setup & CTA -->
      <div style="margin-top: 0.4rem; text-align: center;">
        <p class="body-subtle" style="margin-bottom: 0.2rem; color: var(--text-plum-subtle); font-size: 0.78rem;">
          ${c.closingLead} ${c.closingSub}
        </p>
        <button class="btn-primary" id="s6-cta-btn">
          <span>${c.ctaText}</span>
        </button>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const inspectBtn = document.getElementById('s6-inspect-brother');
    const brotherDiag = document.getElementById('s6-brother-diag');
    const pressBtn = document.getElementById('s6-press-action');
    const pressText = document.getElementById('s6-press-text');
    const ctaBtn = document.getElementById('s6-cta-btn');
    const secretItems = container.querySelectorAll('.secret-item');

    if (inspectBtn && brotherDiag) {
      inspectBtn.addEventListener('click', () => {
        audio.playSparkleSfx();
        brotherDiag.textContent = c.brotherCard.diagnosis;
        brotherDiag.style.display = 'block';
        inspectBtn.style.display = 'none';
        state.recordDiscovery('inspected_brother');
      });
    }

    let pressCount = 0;
    if (pressBtn && pressText) {
      pressBtn.addEventListener('click', () => {
        pressCount++;
        audio.playGlitchSfx();

        if (pressCount === 1) {
          pressText.textContent = c.doNotPress.stage1;
          pressText.style.color = 'var(--text-plum-dark)';
        } else if (pressCount === 2) {
          pressText.textContent = c.doNotPress.stage2;
          pressText.style.color = 'var(--rose-primary)';
        } else {
          pressText.textContent = c.doNotPress.stage3;
          pressText.style.color = 'var(--text-plum-dark)';
          pressBtn.style.display = 'none';
          state.unlockAchievement(
            'button_presser',
            'Achievement Unlocked',
            'Cannot Follow Instructions 🚨',
            '🚨'
          );
        }
      });
    }

    secretItems.forEach((item) => {
      item.addEventListener('click', () => {
        audio.playSparkleSfx();
        const msg = item.getAttribute('data-msg');
        state.unlockAchievement('secret_found', 'Secret Discovered', msg, item.textContent);
      });
    });

    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        sceneManager.nextScene();
      });
    }
  }

  return { enter };
}
