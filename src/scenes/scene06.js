/**
 * SCENE 6 — 06_THE_SIBLING_ZONE
 * Sibling Mode hub, Diganta status card, Monojit research team credit,
 * Do Not Press escalation, and hidden secret discoveries.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';

export function createScene06(sceneManager) {
  const container = document.getElementById('scene-06');

  container.innerHTML = `
    <div class="scene-content">
      <!-- Title & Mode Activation -->
      <div style="margin-bottom: 1.2rem; text-align: center;">
        <h2 class="font-display" style="font-size: clamp(1.4rem, 5vw, 2.2rem); color: var(--gold-light); margin-bottom: 0.4rem;">
          WELCOME TO THE SIBLING ZONE.
        </h2>
        <p class="body-lead" style="color: var(--rose-light); font-style: italic; font-size: 1rem; margin-bottom: 0.8rem;">
          Normal behaviour is no longer guaranteed. 😭
        </p>
        
        <div style="display: inline-block; background: rgba(0,0,0,0.4); border: 1px solid var(--bg-plum-border); border-radius: 8px; padding: 0.5rem 0.9rem; font-size: 0.8rem; font-family: var(--font-code);">
          <span style="color: var(--terminal-green);">SIBLING MODE ACTIVATED</span> | 
          <span style="color: var(--rose-light);">Nonsense: ENABLED ✓</span>
        </div>
      </div>

      <!-- Interaction Hub Cards -->
      <div class="sibling-grid">
        <!-- Card A: How this started -->
        <div class="sibling-card" id="s6-card-started">
          <div class="sibling-card-header">
            <span>💀 HOW THIS STARTED</span>
          </div>
          <div style="font-size: 0.85rem; line-height: 1.5; color: var(--text-ivory-muted);">
            <p><strong>Step 1:</strong> Buy a Rakhi gift.</p>
            <p><strong>Step 2:</strong> Buy chocolate.</p>
            <p><strong>Step 3:</strong> Think about adding a note.</p>
            <p><strong>Step 4:</strong> Think, “What if I made a website?”</p>
            <p><strong>Step 5:</strong> Why did I actually make a website?</p>
            <p style="color: var(--gold-light); margin-top: 6px; font-weight: 600;">Current situation: You are reading it.</p>
          </div>
        </div>

        <!-- Card B: Research Team -->
        <div class="sibling-card" id="s6-card-team">
          <div class="sibling-card-header">
            <span>🧪 THE RESEARCH TEAM</span>
          </div>
          <div style="font-size: 0.85rem; line-height: 1.5; color: var(--text-ivory-muted);">
            <p><strong style="color: var(--gold-light);">Diganta:</strong> Lead Researcher (Overthinking everything, making websites).</p>
            <p><strong style="color: var(--rose-light);">Monojit:</strong> Chocolate Consultant & Best Friend (Prevented questionable decisions).</p>
            <p style="margin-top: 6px; font-style: italic; color: var(--text-ivory-subtle);">Special thanks to Monojit. 🫡</p>
          </div>
        </div>

        <!-- Card C: Brother Status -->
        <div class="sibling-card" id="s6-card-status">
          <div class="sibling-card-header">
            <span>🤖 YOUR BROTHER’S STATUS</span>
          </div>
          <div style="font-size: 0.85rem; line-height: 1.5; color: var(--text-ivory-muted);">
            <p><strong>Name:</strong> Diganta</p>
            <p><strong>Condition:</strong> Sleep deprived 💀</p>
            <p><strong>Recent:</strong> SIH research, classes, web dev & building this at 3 AM.</p>
            <p style="color: var(--gold-light); margin-top: 4px;">Would probably do it again. 😭</p>
          </div>
        </div>

        <!-- Card D: Do Not Press -->
        <div class="sibling-card" id="s6-card-btn" style="border-color: rgba(255, 92, 87, 0.4);">
          <div class="sibling-card-header">
            <span style="color: var(--terminal-error);">🚨 DO NOT PRESS THIS BUTTON</span>
          </div>
          <p id="s6-press-text" style="font-size: 0.85rem; color: var(--text-ivory-muted); min-height: 40px;">
            Seriously. Do not press it.
          </p>
          <button class="btn-secondary" id="s6-press-action" style="font-size: 0.8rem; padding: 0.35rem 0.8rem; border-color: var(--terminal-error); margin-top: 6px;">
            PRESS BUTTON ⚠️
          </button>
        </div>
      </div>

      <!-- Secret Clickables -->
      <div style="margin: 1rem 0; text-align: center;">
        <span style="font-size: 0.75rem; letter-spacing: 0.1em; color: var(--text-ivory-subtle);">SECRET MOTIFS:</span>
        <div class="secret-clickables">
          <span class="secret-item" data-msg="Protection against bad vibes activated. 🧿" role="button" aria-label="Evil Eye Secret">🧿</span>
          <span class="secret-item" data-msg="Yes, the KitKat is still real. Go eat it! 🍫" role="button" aria-label="Chocolate Secret">🍫</span>
          <span class="secret-item" data-msg="This is what happens when your brother learns HTML. 💻" role="button" aria-label="Code Secret">💻</span>
          <span class="secret-item" data-msg="Achievement unlocked: Survived the sibling website! 🏆" role="button" aria-label="Trophy Secret">🏆</span>
        </div>
      </div>

      <!-- Final Setup & CTA -->
      <div style="margin-top: 1rem; text-align: center;">
        <p class="body-subtle" style="margin-bottom: 0.6rem; color: var(--text-ivory-muted);">
          Okay... seriously, this is the last thing. Promise. Probably. 💀
        </p>
        <button class="btn-primary" id="s6-cta-btn">
          ONE LAST SURPRISE → 🧿
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

    // Escalating Button Interaction
    let pressCount = 0;
    if (pressBtn && pressText) {
      pressBtn.addEventListener('click', () => {
        pressCount++;
        audio.playGlitchSfx();

        if (pressCount === 1) {
          pressText.textContent = 'I literally told you not to press it.';
          pressText.style.color = 'var(--gold-light)';
        } else if (pressCount === 2) {
          pressText.textContent = 'Okay, now I’m impressed by your commitment.';
          pressText.style.color = 'var(--rose-light)';
        } else {
          pressText.textContent = 'Fine. You win. Hidden surprise: Happy Rakhi again, idiot. 🧿😭';
          pressText.style.color = 'var(--gold-light)';
          pressBtn.style.display = 'none';
          state.unlockAchievement(
            'button_presser',
            'Achievement Unlocked',
            'Button Presser: Defied all warnings 🚨',
            '🚨'
          );
        }
      });
    }

    // Secret Items Tap
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
