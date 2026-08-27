/**
 * SCENE 1 — 01_INTRO_INVITATION
 * Twilight warmth mystery, editorial typography, delicate system note artifact,
 * and seamless light palette invitation CTA.
 */

import { delay, createElement } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { content } from '../content/content.js';

export function createScene01(sceneManager) {
  const container = document.getElementById('scene-01');
  const c = content.scene1;

  container.innerHTML = `
    <div class="scene-content">
      <div class="intro-glow-point" id="s1-glow"></div>

      <div class="s1-intro-wrapper">
        <h1 class="font-display s1-greeting" id="s1-greeting">
          ${c.greeting}
        </h1>
        <p class="body-lead s1-subtext" id="s1-subtext">
          ${c.subtextLine1}<br>
          <span class="s1-subtext-highlight">${c.subtextLine2}</span>
        </p>
      </div>

      <div class="terminal-card" id="s1-terminal">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">${c.systemHeader}</span>
        </div>
        <div class="terminal-body font-mono" id="s1-terminal-logs">
          <!-- Terminal lines injected sequentially -->
        </div>
      </div>

      <div class="s1-cta-wrapper" id="s1-cta-wrapper">
        <button class="btn-primary" id="s1-cta-btn" aria-label="${c.ctaText}">
          <span>${c.ctaText}</span>
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

    // 0.0 - 1.2s: Twilight warm glow point
    await delay(400);
    if (glow) glow.classList.add('visible');

    // 1.2 - 2.8s: "Hey, Anwesha..."
    await delay(900);
    if (greeting) greeting.classList.add('visible');

    // 2.8 - 4.5s: "Before you open anything else..."
    await delay(1200);
    if (subtext) subtext.classList.add('visible');

    // Personal System Note Sequence
    await delay(1400);
    if (terminal) {
      terminal.classList.add('visible');
    }

    for (const item of c.systemLogs) {
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
    await delay(600);
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

        await delay(450);
        sceneManager.nextScene();
      });
    }
  }

  return { enter };
}
