/**
 * SCENE 5 — 05_THE_MESSAGE
 * Calm, spacious personal letter, full editorial portrait illustration,
 * warm paper card, handwritten signature, and seamless light aesthetic.
 */

import { delay } from '../js/utils.js';
import { audio } from '../js/audioController.js';
import { state } from '../js/interactionState.js';
import { renderPortrait } from '../components/PortraitFrame.js';

export function createScene05(sceneManager) {
  const container = document.getElementById('scene-05');

  container.innerHTML = `
    <div class="scene-content">
      <!-- Title Header -->
      <div class="s5-header">
        <h2 class="font-display s5-title">
          A Note for Anwesha 🧿
        </h2>
      </div>

      <!-- Full Editorial Portrait (Complete illustration visible, no avatar circle) -->
      <div class="s5-portrait-container">
        ${renderPortrait('assets/portraits/anwesha_calm.png', 'Anwesha', '', 'editorial')}
      </div>

      <!-- Sincere Letter Card -->
      <div class="scrapbook-card s5-letter-card">
        <div class="s5-message-body">
          <p class="message-paragraph s5-lead-quote">
            Okay... jokes aside for a second. There actually is something I wanted to say.
          </p>
          <p class="message-paragraph">
            This is actually the first time I’ve bought you a gift like this for Rakhi. And honestly, I wasn’t completely sure what I was supposed to do. 😭
          </p>
          <p class="message-paragraph">
            So I did what any completely normal person would do... I bought chocolate and built a website. 😭
          </p>
          <p class="message-paragraph s5-wish-highlight font-display">
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
          <p class="message-paragraph s5-closing-joke">
            And unfortunately for you, you’re still stuck with me as your brother. 💀🧿
          </p>
        </div>

        <!-- Handwritten Signature Block -->
        <div class="signature-block">
          <div class="s5-keep-wrapper">
            <button class="btn-secondary" id="s5-keep-btn">
              <span>KEEP THIS MESSAGE</span> 🧿
            </button>
            <div id="s5-keep-feedback" class="s5-keep-feedback">
              Saved forever. No refunds. 💀
            </div>
          </div>
          <div class="s5-sig-author">
            <span class="s5-sig-prefix">With love,</span><br>
            <span class="handwritten-sig">Your brother, Diganta 🧿</span>
          </div>
        </div>
      </div>

      <!-- Tone Reset & Primary CTA -->
      <div class="s5-cta-section">
        <p class="body-subtle s5-cta-lead">
          Okay, enough emotional nonsense. 😭 There’s still more.
        </p>
        <button class="btn-primary" id="s5-cta-btn">
          <span>LET’S GET BACK TO BEING NORMAL</span>
          <i class="fa-solid fa-arrow-right s5-arrow-icon" aria-hidden="true"></i> 💀
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
