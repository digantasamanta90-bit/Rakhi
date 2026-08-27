/**
 * SCENE 5 — 05_THE_MESSAGE
 * Calm, spacious personal letter, warm paper card, calm portrait, handwritten signature.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { renderPortrait } from '../components/PortraitFrame.js';

export function createScene05(sceneManager) {
  const container = document.getElementById('scene-05');

  container.innerHTML = `
    <div class="scene-content">
      <div class="scrapbook-card" style="max-width: 500px; text-align: left; background: #fffdfa;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <h2 class="font-display" style="font-size: 1.35rem; color: var(--text-plum-dark); font-style: italic;">
            A Note for Anwesha 🧿
          </h2>
          <div style="width: 44px; height: 44px; border-radius: 50%; overflow: hidden; border: 1px solid var(--border-delicate);">
            ${renderPortrait('assets/portraits/anwesha_calm.png', 'Anwesha', '')}
          </div>
        </div>

        <div style="font-size: 0.92rem; line-height: 1.7; color: var(--text-plum-primary);">
          <p class="message-paragraph" style="font-style: italic; color: var(--rose-primary);">
            Okay... jokes aside for a second. There actually is something I wanted to say.
          </p>
          <p class="message-paragraph">
            This is actually the first time I’ve bought you a gift like this for Rakhi. And honestly, I wasn’t completely sure what I was supposed to do. 😭
          </p>
          <p class="message-paragraph">
            So I did what any completely normal person would do... I bought chocolate and built a website. 😭
          </p>
          <p class="message-paragraph" style="color: var(--text-plum-dark); font-weight: 600; font-family: var(--font-display); font-size: 1.05rem;">
            Happy Raksha Bandhan, Anwesha. 🧿
          </p>
          <p class="message-paragraph">
            I hope you like this little surprise. I know it’s probably a bit unnecessary to make an entire website for Rakhi, but I wanted to make something a little different for you.
          </p>
          <p class="message-paragraph">
            The chocolate is small, and this website is admittedly a completely overengineered way of giving it to you 😭, but the thought behind it is genuine.
          </p>
          <p class="message-paragraph">
            I’m glad you’re my sister, and I’m glad I got to make something for you this time. Stay happy, take care of yourself, and don’t change too much.
          </p>
          <p class="message-paragraph" style="font-style: italic; color: var(--text-plum-muted);">
            And unfortunately for you, you’re still stuck with me as your brother. 💀🧿
          </p>
        </div>

        <!-- Handwritten Signature Block -->
        <div class="signature-block">
          <div>
            <button class="btn-secondary" id="s5-keep-btn" style="font-size: 0.78rem; padding: 0.35rem 0.8rem;">
              <span>KEEP THIS MESSAGE</span> 🧿
            </button>
            <div id="s5-keep-feedback" style="font-size: 0.75rem; color: var(--rose-primary); margin-top: 4px; display: none; font-style: italic;">
              Saved forever. No refunds. 💀
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.78rem; color: var(--text-plum-subtle);">With love,</span><br>
            <span class="handwritten-sig">Your brother, Diganta 🧿</span>
          </div>
        </div>
      </div>

      <!-- Tone Reset & Primary CTA -->
      <div style="margin-top: 1rem; text-align: center;">
        <p class="body-subtle" style="margin-bottom: 0.4rem; color: var(--text-plum-subtle);">
          Okay, enough emotional nonsense. 😭 There’s still more.
        </p>
        <button class="btn-primary" id="s5-cta-btn">
          <span>LET’S GET BACK TO BEING NORMAL</span>
          <i class="fa-solid fa-arrow-right" style="font-size: 0.85rem;" aria-hidden="true"></i> 💀
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
