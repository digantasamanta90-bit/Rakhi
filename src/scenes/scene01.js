/**
 * SCENE 1 — 01_INTRO_INVITATION
 * Cinematic mystery, exact copy, fake system joke, user-controlled CTA.
 */

import { delay, createElement } from '../js/utils.js';
import { audio } from '../js/audioController.js';

export function createScene01(sceneManager) {
  const container = document.getElementById('scene-01');

  container.innerHTML = `
    <div class="scene-content">
      <div class="intro-glow-point" id="s1-glow"></div>

      <div class="intro-text-wrapper" style="min-height: 120px;">
        <h1 class="font-display" id="s1-greeting" style="font-size: clamp(1.8rem, 6vw, 2.8rem); opacity: 0; transition: opacity 1.2s ease; margin-bottom: 0.8rem;">
          Hey, Anwesha...
        </h1>
        <p class="body-lead" id="s1-subtext" style="opacity: 0; transition: opacity 1.2s ease;">
          Before you open anything else...<br>
          <span style="font-style: italic; color: var(--rose-light);">There’s something I wanted you to see first.</span>
        </p>
      </div>

      <div class="terminal-card" id="s1-terminal" style="opacity: 0; transform: translateY(12px); transition: opacity 0.8s, transform 0.8s;">
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

      <div id="s1-cta-wrapper" style="opacity: 0; transition: opacity 0.8s ease; margin-top: 1rem;">
        <button class="btn-primary" id="s1-cta-btn" aria-label="Open your surprise">
          OPEN YOUR SURPRISE ✨
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

    // 0.0 - 1.5s: Mystery dark glow
    await delay(600);
    if (glow) glow.classList.add('visible');

    // 1.5 - 3.5s: "Hey, Anwesha..."
    await delay(1200);
    if (greeting) greeting.style.opacity = '1';

    // 3.5 - 6.0s: "Before you open anything else..."
    await delay(1800);
    if (subtext) subtext.style.opacity = '1';

    // Terminal System Sequence
    await delay(2200);
    if (terminal) {
      terminal.style.opacity = '1';
      terminal.style.transform = 'translateY(0)';
    }

    const logLines = [
      { text: 'Initializing surprise...', delayMs: 700, color: 'var(--text-ivory-light)' },
      { text: 'Finding Anwesha... ✓', delayMs: 800, color: 'var(--terminal-green)' },
      { text: 'Checking sibling status... ✓', delayMs: 800, color: 'var(--terminal-green)' },
      { text: 'Preparing Rakhi protocol... ✓', delayMs: 900, color: 'var(--terminal-green)' },
      { text: 'Calculating how annoying your brother is...', delayMs: 1400, color: 'var(--gold-light)' },
      { text: 'ERROR 💀', delayMs: 900, color: 'var(--terminal-error)', isGlitch: true },
      { text: 'Status: Still your brother.', delayMs: 800, color: 'var(--text-ivory-light)' },
      { text: 'No refunds available.', delayMs: 700, color: 'var(--rose-light)' },
      { text: 'SURPRISE SUCCESSFULLY PREPARED ✨', delayMs: 600, color: 'var(--gold-light)', isBold: true }
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
    await delay(800);
    if (ctaWrapper) {
      ctaWrapper.style.opacity = '1';
    }

    // CTA Tap Action
    if (ctaBtn) {
      ctaBtn.addEventListener('click', async () => {
        ctaBtn.disabled = true;
        
        // Play subtle unlock audio & start persistent soundtrack
        audio.playUnlockSfx();
        audio.startMusic();

        // Reveal the global music toggle button
        const musicToggle = document.getElementById('music-toggle');
        if (musicToggle) musicToggle.classList.add('visible');

        // Central light flare animation
        const flare = document.getElementById('screen-flare');
        if (flare) flare.classList.add('trigger');

        await delay(600);
        sceneManager.nextScene();
      });
    }
  }

  return { enter };
}
