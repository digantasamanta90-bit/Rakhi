/**
 * BEAT 17 — POST-CREDITS (PLAYFUL EPILOGUE)
 * Playful post-credits moment after the emotional climax.
 * Replay confirmation, humorous easter egg, and option to restart the film.
 * Styled in the Velvet Night × Antique Memory aesthetic.
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
      const c = content.scene8;

      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;text-align:center;">
          <!-- Ambient quiet midnight backdrop -->
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%, rgba(42,20,29,0.18) 0%, rgba(10,7,9,0.98) 75%);pointer-events:none;"></div>

          <!-- Post-Credits Card Container -->
          <div id="pc-card" style="opacity:0;transform:scale(0.92);background:rgba(26,13,20,0.94);border:1px solid var(--cinema-border);border-radius:18px;padding:26px 22px;max-width:320px;width:100%;box-shadow:0 16px 45px rgba(0,0,0,0.7);z-index:10;backdrop-filter:blur(10px);">
            <div class="text-whisper" style="color:var(--cinema-gold);letter-spacing:0.14em;margin-bottom:8px;">EPILOGUE // POST-CREDITS</div>
            
            <h3 class="font-display" style="font-size:1.25rem;color:var(--cinema-text);margin-bottom:8px;font-style:italic;">
              And that's the whole story. 🧿
            </h3>

            <p style="font-size:0.84rem;color:var(--cinema-accent);margin-bottom:18px;font-style:italic;line-height:1.45;">
              ${c.easterEgg}
            </p>

            <div style="display:flex;flex-direction:column;gap:8px;">
              <button class="btn-primary" id="pc-replay-btn" style="padding:10px 20px;font-size:0.84rem;width:100%;">
                <span>Replay the Journey ↻</span>
              </button>
              <button class="btn-secondary" id="pc-restart-btn" style="font-size:0.75rem;padding:7px 14px;border-color:var(--cinema-border);color:var(--cinema-text-muted);background:transparent;">
                <span>Start from 4:30 AM</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Replay Modal -->
        <div class="modal-overlay" id="pc-replay-modal" role="dialog" aria-modal="true" aria-label="Replay Confirmation">
          <div class="modal-content" style="background:rgba(26,13,20,0.98);color:var(--cinema-text);border:1px solid var(--cinema-border);text-align:center;">
            <h3 class="font-display" style="font-size:1.2rem;color:var(--cinema-text);margin-bottom:6px;">
              ${c.replayModal.title}
            </h3>
            <p class="text-dialogue" style="font-size:0.86rem;margin-bottom:16px;color:var(--cinema-text-muted);">
              ${c.replayModal.question}
            </p>
            <div style="display:flex;gap:10px;justify-content:center;">
              <button class="btn-primary" id="pc-confirm-replay" style="margin:0;padding:8px 18px;font-size:0.82rem;">
                ${c.replayModal.confirm}
              </button>
              <button class="btn-secondary" id="pc-cancel-replay" style="font-size:0.82rem;padding:8px 16px;border-color:var(--cinema-border);color:var(--cinema-text-muted);background:transparent;">
                ${c.replayModal.cancel}
              </button>
            </div>
          </div>
        </div>
      `;

      const card = container.querySelector('#pc-card');
      const replayBtn = container.querySelector('#pc-replay-btn');
      const restartBtn = container.querySelector('#pc-restart-btn');
      const replayModal = container.querySelector('#pc-replay-modal');
      const confirmReplay = container.querySelector('#pc-confirm-replay');
      const cancelReplay = container.querySelector('#pc-cancel-replay');

      this.tl = gsap.timeline();

      this.tl
        .to(card, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', delay: 0.2 });

      if (replayBtn && replayModal) {
        replayBtn.addEventListener('click', () => {
          try { this.audio.playSparkleSfx(); } catch(e) {}
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
