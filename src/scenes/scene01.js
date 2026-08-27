/**
 * SCENE 1 — 01_INTRO_INVITATION
 * Twilight warmth mystery, editorial typography, delicate system note artifact,
 * and seamless light palette invitation CTA.
 */

import { delay, createElement } from '../js/utils.js';
import { audio } from '../js/audioController.js';

export function createScene01(sceneManager) {
  const container = document.getElementById('scene-01');

  container.innerHTML = `
    <div class="scene-content">
      <div class="intro-glow-point" id="s1-glow"></div>

      <div class="s1-intro-wrapper">
        <h1 class="font-display s1-greeting" id="s1-greeting">
          Hey, Anwesha...
        </h1>
        <p class="body-lead s1-subtext" id="s1-subtext">
          Before you open anything else...<br>
          <span class="s1-subtext-highlight">There’s something I wanted you to see first.</span>
        </p>
      </div>

      <div class="terminal-card" id="s1-terminal">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">rakhi_protocol.sh</span>
        </div>
        <div class="terminal-body font-mono" id="s1-terminal-logs">
          <!-- Terminal lines injected sequentially -->
        </div>
      </div>

      <div class="s1-cta-wrapper" id="s1-cta-wrapper">
        <button class="btn-primary" id="s1-cta-btn" aria-label="Open your surprise">
          <span>OPEN YOUR SURPRISE</span>
          <span class="btn-icon" aria-hidden="true">✨</span>
        </button>
      </div>
    </div>
  `;

  let hasExecuted = false;

  async function enter() {
    if (hasExecuted) return;
    hasExecuted = true;

    const glow = document.getElementById('s1-glow');
    const greeting = document.getElementById('s1-greeting');
    const subtext = document.getElementById('s1-subtext');
    const terminal = document.getElementById('s1-terminal');
    const terminalLogs = document.getElementById('s1-terminal-logs');
    const ctaWrapper = document.getElementById('s1-cta-wrapper');
    const ctaBtn = document.getElementById('s1-cta-btn');

    // 0.0 - 1.5s: Twilight warm glow point
    await delay(600);
    if (glow) glow.classList.add('visible');

    // 1.5 - 3.5s: "Hey, Anwesha..."
    await delay(1200);
    if (greeting) greeting.classList.add('visible');

    // 3.5 - 6.0s: "Before you open anything else..."
    await delay(1800);
    if (subtext) subtext.classList.add('visible');

    // Personal System Note Sequence
    await delay(2000);
    if (terminal) {
      terminal.classList.add('visible');
    }

    const logLines = [
      { text: 'Initializing surprise...', delayMs: 600, color: 'var(--text-plum-muted)' },
      { text: 'Finding Anwesha... ✓', delayMs: 700, color: '#3d8b59' },
      { text: 'Checking sibling status... ✓', delayMs: 700, color: '#3d8b59' },
      { text: 'Preparing Rakhi protocol... ✓', delayMs: 800, color: '#3d8b59' },
      { text: 'Calculating how annoying your brother is...', delayMs: 1300, color: 'var(--gold-dark)' },
      { text: 'ERROR 💀', delayMs: 800, color: '#c84b5c', isGlitch: true },
      { text: 'Status: Still your brother.', delayMs: 700, color: 'var(--text-plum-dark)' },
      { text: 'No refunds available.', delayMs: 600, color: 'var(--rose-primary)' },
      { text: 'SURPRISE SUCCESSFULLY PREPARED ✨', delayMs: 600, color: 'var(--gold-dark)', isBold: true }
    ];

    for (const item of logLines) {
      await delay(item.delayMs);
      const line = createElement('div', 'terminal-line visible');
      line.style.color = item.color;
      if (item.isBold) line.style.fontWeight = '700';
      line.textContent = `> ${item.text}`;
      
      if (item.isGlitch) {
        line.classList.add('anim-glitch');
        audio.playGlitchSfx();
      }

      if (terminalLogs) {
        terminalLogs.appendChild(line);
      }
    }

    // CTA Reveal
    await delay(700);
    if (ctaWrapper) {
      ctaWrapper.classList.add('visible');
    }

    // CTA Tap Action
    if (ctaBtn) {
      ctaBtn.addEventListener('click', async () => {
        ctaBtn.disabled = true;
        
        audio.playUnlockSfx();
        audio.startMusic();

        const musicToggle = document.getElementById('music-toggle');
        if (musicToggle) musicToggle.classList.add('visible');

        const flare = document.getElementById('screen-flare');
        if (flare) flare.classList.add('trigger');

        await delay(500);
        sceneManager.nextScene();
      });
    }
  }

  return { enter };
}
