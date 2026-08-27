/**
 * SCENE 6 — 06_THE_SIBLING_ZONE
 * Sibling Mode hub, Diganta status note, Monojit research team credit,
 * Do Not Press escalation, and secret easter eggs.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';

export function createScene06(sceneManager) {
  const container = document.getElementById('scene-06');

  container.innerHTML = `
    <div class="scene-content">
      <!-- Title & Mode Activation -->
      <div style="margin-bottom: 0.8rem; text-align: center;">
        <h2 class="font-display" style="font-size: clamp(1.3rem, 4.5vw, 1.8rem); color: var(--text-plum-dark); margin-bottom: 0.2rem; font-style: italic;">
          Welcome to the Sibling Zone.
        </h2>
        <p class="body-lead" style="color: var(--rose-primary); font-size: 0.92rem; margin-bottom: 0.6rem;">
          Normal behaviour is no longer guaranteed. 😭
        </p>
        
        <div style="display: inline-block; background: var(--rose-pale); border: 1px solid var(--border-delicate); border-radius: 6px; padding: 0.35rem 0.75rem; font-size: 0.75rem; font-family: var(--font-mono);">
          <span style="color: var(--text-plum-dark); font-weight: 600;">SIBLING MODE ACTIVATED</span> | 
          <span style="color: var(--rose-primary);">Nonsense: ENABLED ✓</span>
        </div>
      </div>

      <!-- Interaction Hub Cards -->
      <div class="sibling-grid">
        <!-- Card A: How this started -->
        <div class="sibling-card" id="s6-card-started">
          <div class="sibling-card-header">
            <span>💀 HOW THIS STARTED</span>
          </div>
          <div style="font-size: 0.82rem; line-height: 1.5; color: var(--text-plum-muted);">
            <p><strong>Step 1:</strong> Buy a Rakhi gift.</p>
            <p><strong>Step 2:</strong> Buy chocolate.</p>
            <p><strong>Step 3:</strong> Think about adding a note.</p>
            <p><strong>Step 4:</strong> Think, “What if I made a website?”</p>
            <p><strong>Step 5:</strong> Why did I actually make a website?</p>
            <p style="color: var(--rose-primary); margin-top: 4px; font-weight: 600;">Current situation: You are reading it.</p>
          </div>
        </div>

        <!-- Card B: Research Team -->
        <div class="sibling-card" id="s6-card-team">
          <div class="sibling-card-header">
            <span>🧪 THE RESEARCH TEAM</span>
          </div>
          <div style="font-size: 0.82rem; line-height: 1.5; color: var(--text-plum-muted);">
            <p><strong style="color: var(--text-plum-dark);">Diganta:</strong> Lead Researcher (Overthinking everything).</p>
            <p><strong style="color: var(--rose-primary);">Monojit:</strong> Chocolate Consultant & Best Friend (Prevented questionable decisions).</p>
            <p style="margin-top: 4px; font-style: italic; color: var(--text-plum-subtle);">Special thanks to Monojit. 🫡</p>
          </div>
        </div>

        <!-- Card C: Brother Status -->
        <div class="sibling-card" id="s6-card-status">
          <div class="sibling-card-header">
            <span>🤖 YOUR BROTHER’S STATUS</span>
          </div>
          <div style="font-size: 0.82rem; line-height: 1.5; color: var(--text-plum-muted);">
            <p><strong>Name:</strong> Diganta</p>
            <p><strong>Condition:</strong> Sleep deprived 💀</p>
            <p><strong>Recent:</strong> SIH research, classes, web dev & building this at 3 AM.</p>
            <p style="color: var(--text-plum-dark); margin-top: 3px; font-weight: 600;">Would probably do it again. 😭</p>
          </div>
        </div>

        <!-- Card D: Do Not Press -->
        <div class="sibling-card" id="s6-card-btn" style="border-color: rgba(224, 108, 117, 0.4);">
          <div class="sibling-card-header">
            <span style="color: #e06c75;">🚨 DO NOT PRESS THIS BUTTON</span>
          </div>
          <p id="s6-press-text" style="font-size: 0.82rem; color: var(--text-plum-muted); min-height: 36px;">
            Seriously. Do not press it.
          </p>
          <button class="btn-secondary" id="s6-press-action" style="font-size: 0.78rem; padding: 0.3rem 0.7rem; border-color: rgba(224, 108, 117, 0.4); margin-top: 4px;">
            PRESS BUTTON ⚠️
          </button>
        </div>
      </div>

      <!-- Secret Clickables -->
      <div style="margin: 0.6rem 0; text-align: center;">
        <span style="font-size: 0.72rem; letter-spacing: 0.08em; color: var(--text-plum-subtle); text-transform: uppercase;">Secret Motifs:</span>
        <div class="secret-clickables">
          <span class="secret-item" data-msg="Protection against bad vibes activated. 🧿" role="button" aria-label="Evil Eye Secret">🧿</span>
          <span class="secret-item" data-msg="Yes, the KitKat is still real. Go eat it! 🍫" role="button" aria-label="Chocolate Secret">🍫</span>
          <span class="secret-item" data-msg="This is what happens when your brother learns HTML. 💻" role="button" aria-label="Code Secret">💻</span>
          <span class="secret-item" data-msg="Achievement unlocked: Survived the sibling website! 🏆" role="button" aria-label="Trophy Secret">🏆</span>
        </div>
      </div>

      <!-- Final Setup & CTA -->
      <div style="margin-top: 0.8rem; text-align: center;">
        <p class="body-subtle" style="margin-bottom: 0.4rem; color: var(--text-plum-subtle);">
          Okay... seriously, this is the last thing. Promise. Probably. 💀
        </p>
        <button class="btn-primary" id="s6-cta-btn">
          <span>ONE LAST SURPRISE</span>
          <i class="fa-solid fa-arrow-right" style="font-size: 0.85rem;" aria-hidden="true"></i> 🧿
        </button>
      </div>
    </div>
  `;

  let hasEntered = false;

  async function enter() {
    if (hasEntered) return;
    hasEntered = true;

    const pressBtn = document.getElementById('s6-press-action');
    const pressText = document.getElementById('s6-press-text');
    const ctaBtn = document.getElementById('s6-cta-btn');
    const secretItems = container.querySelectorAll('.secret-item');

    let pressCount = 0;
    if (pressBtn && pressText) {
      pressBtn.addEventListener('click', () => {
        pressCount++;
        audio.playGlitchSfx();

        if (pressCount === 1) {
          pressText.textContent = 'I literally told you not to press it.';
          pressText.style.color = 'var(--text-plum-dark)';
        } else if (pressCount === 2) {
          pressText.textContent = 'Okay, now I’m impressed by your commitment.';
          pressText.style.color = 'var(--rose-primary)';
        } else {
          pressText.textContent = 'Fine. You win. Hidden surprise: Happy Rakhi again, idiot. 🧿😭';
          pressText.style.color = 'var(--text-plum-dark)';
          pressBtn.style.display = 'none';
          state.unlockAchievement(
            'button_presser',
            'Note Unlocked',
            'Button Presser: Defied all warnings 🚨',
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
