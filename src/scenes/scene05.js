/**
 * SCENE 5 — 05_THE_MESSAGE
 * Sincere emotional center, personal letter draft, calm portrait, handwritten signature.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { renderPortrait } from '../components/PortraitFrame.js';

export function createScene05(sceneManager) {
  const container = document.getElementById('scene-05');

  container.innerHTML = `
    <div class="scene-content">
      <div class="scrapbook-card" style="max-width: 580px; text-align: left; padding: 1.8rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem;">
          <h2 class="font-display" style="font-size: 1.4rem; color: var(--gold-light);">
            A Note for Anwesha 🧿
          </h2>
          <div style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; border: 1px solid var(--gold-light);">
            ${renderPortrait('assets/portraits/anwesha_calm.png', 'Anwesha', '')}
          </div>
        </div>

        <div class="message-body" style="font-size: 0.95rem; line-height: 1.7; color: var(--text-ivory-muted);">
          <p class="message-paragraph" style="font-style: italic; color: var(--rose-light);">
            Okay... jokes aside for a second. There actually is something I wanted to say.
          </p>
          <p class="message-paragraph">
            This is actually the first time I’ve bought you a gift like this for Rakhi. And honestly, I wasn’t completely sure what I was supposed to do. 😭
          </p>
          <p class="message-paragraph">
            So I did what any completely normal person would do... I bought chocolate and built a website. 😭
          </p>
          <p class="message-paragraph" style="color: var(--gold-light); font-weight: 500;">
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
          <p class="message-paragraph" style="font-style: italic;">
            And unfortunately for you, you’re still stuck with me as your brother. 💀🧿
          </p>
        </div>

        <!-- Handwritten Signature Block -->
        <div class="signature-block">
          <div>
            <button class="btn-secondary" id="s5-keep-btn" style="font-size: 0.8rem; padding: 0.4rem 0.9rem;">
              KEEP THIS MESSAGE 🧿
            </button>
            <div id="s5-keep-feedback" style="font-size: 0.75rem; color: var(--gold-light); margin-top: 4px; display: none;">
              Saved forever. No refunds. 💀
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.8rem; color: var(--text-ivory-subtle);">With love,</span><br>
            <span class="handwritten-sig">Your brother, Diganta 🧿</span>
          </div>
        </div>
      </div>

      <!-- Tone Reset & Primary CTA -->
      <div style="margin-top: 1.2rem; text-align: center;">
        <p class="body-subtle" style="margin-bottom: 0.6rem; color: var(--rose-light);">
          Okay, enough emotional nonsense. 😭 There’s still more.
        </p>
        <button class="btn-primary" id="s5-cta-btn">
          LET’S GET BACK TO BEING NORMAL → 💀
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
