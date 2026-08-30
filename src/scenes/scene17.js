/**
 * BEAT 17 — POST-CREDITS (PLAYFUL EPILOGUE)
 * The broken KitKat resting peacefully on the tabletop.
 * A single crumb falls with comedic deadpan timing.
 * Post-credits card with replay journey, easter egg, and restart option.
 */

import { content } from '../content/content.js';

export class Scene17PostCredits {
  constructor({ manager, audio, particles, achievements }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.achievements = achievements;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene17;
      const t = c.timing || {};
      const assets = c.assets || {};
      const kitkatImg = assets.kitkat || 'assets/gifts/kitkat.png';

      container.innerHTML = `
        <div class="epilogue-desk-env" id="s17-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;background:radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 60%, #070c18 100%);">
          
          <!-- Tabletop Ambient Grain -->
          <div class="golden-hour-beam" style="opacity:0.25;filter:blur(30px);"></div>

          <!-- The Broken KitKat Resting on Tabletop -->
          <div id="pc-kitkat-rest" style="position:relative;width:160px;height:95px;margin-bottom:18px;opacity:0;">
            <!-- Left piece -->
            <div style="position:absolute;left:0;top:0;width:85px;height:95px;overflow:hidden;transform:rotate(-6deg);">
              <img src="${kitkatImg}" alt="KitKat Piece" style="width:150px;height:auto;object-fit:contain;position:absolute;left:0;top:5px;clip-path:polygon(0 0, 53% 0, 43% 100%, 0 100%);filter:drop-shadow(0 6px 14px rgba(0,0,0,0.8));" />
            </div>
            <!-- Right piece -->
            <div style="position:absolute;right:0;top:4px;width:85px;height:95px;overflow:hidden;transform:rotate(5deg);">
              <img src="${kitkatImg}" alt="KitKat Piece" style="width:150px;height:auto;object-fit:contain;position:absolute;right:0;top:5px;clip-path:polygon(43% 0, 100% 0, 100% 100%, 53% 100%);filter:drop-shadow(0 6px 14px rgba(0,0,0,0.8));" />
            </div>
            <!-- Falling Crumb -->
            <div id="pc-crumb" style="position:absolute;bottom:8px;left:48%;width:4px;height:4px;border-radius:50%;background:#ef4444;opacity:0;"></div>
          </div>

          <!-- Post-Credits Card Container -->
          <div id="pc-card" style="opacity:0;transform:scale(0.92);background:rgba(15,23,42,0.96);border:1px solid rgba(251,191,36,0.3);border-radius:18px;padding:24px 20px;max-width:320px;width:100%;box-shadow:0 16px 45px rgba(0,0,0,0.8);z-index:10;backdrop-filter:blur(10px);">
            <div class="text-whisper" style="color:var(--rakhi-gold);letter-spacing:0.16em;margin-bottom:8px;font-size:0.68rem;font-weight:700;">${c.tag}</div>
            
            <h3 style="font-family:var(--font-serif);font-size:1.35rem;color:#ffffff;margin-bottom:8px;font-style:italic;">
              ${c.title}
            </h3>

            <p style="font-size:0.86rem;color:#f8fafc;margin-bottom:18px;font-style:italic;line-height:1.45;">
              ${c.easterEgg}
            </p>

            <div style="display:flex;flex-direction:column;gap:10px;">
              <button class="btn-primary" id="pc-replay-btn" style="padding:12px 20px;font-size:0.9rem;width:100%;background:var(--rakhi-red);color:#ffffff;border:none;border-radius:24px;cursor:pointer;font-weight:700;box-shadow:0 6px 20px rgba(220,38,38,0.4);">
                <span>${c.replayBtn}</span>
              </button>
              <button class="btn-secondary" id="pc-restart-btn" style="font-size:0.8rem;padding:8px 16px;border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;background:transparent;border-radius:20px;cursor:pointer;">
                <span>${c.restartBtn}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Replay Modal -->
        <div class="modal-overlay" id="pc-replay-modal" role="dialog" aria-modal="true" aria-label="Replay Confirmation">
          <div class="modal-content" style="background:rgba(15,23,42,0.98);color:#f8fafc;border:1px solid rgba(251,191,36,0.3);text-align:center;padding:24px;border-radius:16px;">
            <h3 style="font-family:var(--font-serif);font-size:1.3rem;color:var(--rakhi-gold);margin-bottom:8px;">
              ${c.replayModal.title}
            </h3>
            <p class="text-dialogue" style="font-size:0.9rem;margin-bottom:18px;color:#cbd5e1;">
              ${c.replayModal.question}
            </p>
            <div style="display:flex;gap:10px;justify-content:center;">
              <button class="btn-primary" id="pc-confirm-replay" style="margin:0;padding:10px 20px;font-size:0.86rem;background:var(--rakhi-red);color:#ffffff;border-radius:20px;border:none;cursor:pointer;font-weight:600;">
                ${c.replayModal.confirm}
              </button>
              <button class="btn-secondary" id="pc-cancel-replay" style="font-size:0.86rem;padding:10px 18px;border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;background:transparent;border-radius:20px;cursor:pointer;">
                ${c.replayModal.cancel}
              </button>
            </div>
          </div>
        </div>
      `;

      const kitkatRest = container.querySelector('#pc-kitkat-rest');
      const crumb = container.querySelector('#pc-crumb');
      const card = container.querySelector('#pc-card');
      const replayBtn = container.querySelector('#pc-replay-btn');
      const restartBtn = container.querySelector('#pc-restart-btn');
      const replayModal = container.querySelector('#pc-replay-modal');
      const confirmReplay = container.querySelector('#pc-confirm-replay');
      const cancelReplay = container.querySelector('#pc-cancel-replay');

      const enterDel = t.kitkatEnterDelay ?? 0.2;
      const crumbDel = t.crumbDropDelay ?? 0.9;
      const cardDel = t.cardEnterDelay ?? 1.4;

      this.tl = gsap.timeline();

      this.tl
        // 1. Broken KitKat on tabletop appears softly
        .to(kitkatRest, { opacity: 1, duration: 1.0, ease: 'power2.out', delay: enterDel })
        // 2. Single crumb drops
        .fromTo(crumb, { opacity: 0, y: -8 }, { opacity: 1, y: 4, duration: 0.4, ease: 'power2.in' }, crumbDel)
        // 3. Post-credits card appears
        .to(card, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.2)' }, cardDel);

      if (replayBtn && replayModal) {
        replayBtn.addEventListener('click', () => {
          replayModal.classList.add('active');
        });
      }

      if (cancelReplay && replayModal) {
        cancelReplay.addEventListener('click', () => {
          replayModal.classList.remove('active');
        });
      }

      if (confirmReplay) {
        confirmReplay.addEventListener('click', () => {
          if (replayModal) replayModal.classList.remove('active');
          this.manager.restart();
        });
      }

      if (restartBtn) {
        restartBtn.addEventListener('click', () => {
          this.manager.restart();
        });
      }
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
