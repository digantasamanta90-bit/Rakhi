/**
 * BEAT 16 — FINAL RAKHI (OBJECT-REVEAL ARCHITECTURE)
 * 1. Minimal space: thread traces path forward.
 * 2. Anwesha hero portrait enters as single focus.
 * 3. Master Rakhi medallion descends with physical weight and material presence.
 * 4. Thread connects portrait and Rakhi.
 * 5. Prompt: TAP TO TIE RAKHI.
 * 6. User interacts: knot tightens, screen blooms with warm gold light.
 * 7. Celebration unfolds: full raag musical release, festive particle confetti.
 * 8. Progressive title: # HAPPY RAKHI, ANWESHA ❤️ — A little late. Still from the heart.
 * Zero clutter, zero recap boxes. Pure earned emotional payoff.
 */

import { content } from '../content/content.js';
import { renderRakhiSvg } from '../components/RakhiVisual.js';

export class Scene16RakhiFinale {
  constructor({ manager, audio, particles, achievements }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.achievements = achievements;
    this.tl = null;
    this.celebrated = false;
  }

  enter(container) {
    return new Promise((resolve) => {
      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:calc(env(safe-area-inset-top,10px) + 20px) 16px 36px 16px;">
          <!-- Ambient gold festive backdrop glow (Hidden until interaction) -->
          <div id="f-glow" style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%, rgba(200,162,72,0.06) 0%, rgba(10,6,8,0.98) 75%);pointer-events:none;transition:background 1.8s ease;"></div>

          <!-- Staged Hero Container (One Object at a Time) -->
          <div id="f-hero-stage" style="position:relative;width:100%;max-width:340px;display:flex;flex-direction:column;align-items:center;z-index:10;">
            
            <!-- Shot 3: Anwesha Hero Portrait (Enters First) -->
            <div id="f-portrait-badge" style="opacity:0;transform:scale(0.8) translateY(-20px);width:75px;height:75px;border-radius:50%;border:2px solid var(--cinema-gold);overflow:hidden;box-shadow:0 0 25px rgba(200,162,72,0.25);margin-bottom:14px;cursor:pointer;">
              <img src="assets/portraits/anwesha_hero.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha12.png';">
            </div>

            <!-- Shot 4: The Master Rakhi Medallion (Enters with physical weight) -->
            <div class="rakhi-finale-wrap" id="f-rakhi-wrap" role="button" aria-label="Sacred Rakhi" tabindex="0" style="opacity:0;transform:scale(0.7) translateY(30px);z-index:10;position:relative;cursor:pointer;">
              ${renderRakhiSvg({ size: 155, id: 'finale-master-rakhi-svg' })}
              <div id="f-rakhi-tap-hint" style="position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:0.72rem;letter-spacing:0.14em;color:var(--cinema-gold);text-transform:uppercase;font-weight:600;opacity:0;">
                TAP TO TIE RAKHI 🧿
              </div>
            </div>

            <!-- Shot 8 & 9: Post-Interaction Celebration Message (Hidden initially) -->
            <div id="f-greeting-zone" style="opacity:0;text-align:center;max-width:320px;margin-top:32px;display:none;">
              <div class="text-whisper" style="color:var(--cinema-accent);margin-bottom:4px;letter-spacing:0.18em;">FESTIVE BLESSINGS • FOREVER BOND</div>
              <h1 class="finale-greeting" style="font-size:clamp(1.7rem,6.5vw,2.6rem);margin-bottom:4px;color:var(--cinema-text);">
                HAPPY RAKHI, ANWESHA ❤️
              </h1>
              <p class="finale-sub" style="font-size:clamp(0.95rem,3.4vw,1.15rem);margin-bottom:8px;color:var(--cinema-accent);">
                A little late. Still from the heart.
              </p>
              <div class="text-emotional" style="font-size:0.85rem;color:var(--cinema-text-muted);font-style:italic;margin-bottom:18px;">
                — Diganta 🧿
              </div>

              <!-- Single clean action trigger to post-credits -->
              <div style="display:flex;gap:10px;justify-content:center;">
                <button class="btn-secondary" id="f-postcredits-btn" style="font-size:0.78rem;padding:7px 16px;border-color:var(--cinema-border);color:var(--cinema-text-muted);background:transparent;">
                  <span>Post-Credits Epilogue →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      const portraitBadge = container.querySelector('#f-portrait-badge');
      const rakhiWrap = container.querySelector('#f-rakhi-wrap');
      const rakhiTapHint = container.querySelector('#f-rakhi-tap-hint');
      const greetingZone = container.querySelector('#f-greeting-zone');
      const glow = container.querySelector('#f-glow');
      const postcreditsBtn = container.querySelector('#f-postcredits-btn');

      this.tl = gsap.timeline();

      this.tl
        // Shot 3: Anwesha portrait enters and settles with warm glow
        .to(portraitBadge, { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'back.out(1.2)', delay: 0.3 })
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} }, [], 0.6)
        // Shot 4: Master Rakhi descends with physical weight
        .to(rakhiWrap, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'bounce.out' }, 1.0)
        .call(() => { try { this.audio.playChime(523, 0.2); } catch(e) {} }, [], 1.2)
        // Shot 6: Subtle tap hint reveals
        .to(rakhiTapHint, { opacity: 1, duration: 0.8 }, 1.8);

      // Shot 7 & 8: Rakhi Knot Tie & Earned Celebration Bloom
      const triggerCelebration = () => {
        if (this.celebrated) return;
        this.celebrated = true;

        try {
          this.audio.playCelebrateSfx();
          this.audio.startMusic();
        } catch(e) {}

        // 1. Knot tightens
        gsap.to(rakhiWrap, { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut' });

        // 2. Screen flare bloom
        const flare = document.getElementById('screen-flare');
        if (flare) {
          flare.classList.remove('trigger');
          void flare.offsetWidth;
          flare.classList.add('trigger');
        }

        // 3. Warm festive glow expands
        if (glow) {
          glow.style.background = 'radial-gradient(circle at 50% 40%, rgba(200,162,72,0.3) 0%, rgba(200,130,148,0.2) 45%, rgba(10,6,8,0.95) 85%)';
        }

        // 4. Tap hint transforms
        if (rakhiTapHint) {
          rakhiTapHint.textContent = 'RAKHI TIED FOREVER 🧿';
          rakhiTapHint.style.color = 'var(--cinema-accent)';
        }

        // 5. Multi-burst celebratory particle confetti
        if (this.particles) {
          this.particles.triggerBurst(window.innerWidth / 2, window.innerHeight * 0.35, 65);
          setTimeout(() => this.particles.triggerBurst(window.innerWidth * 0.25, window.innerHeight * 0.4, 35), 250);
          setTimeout(() => this.particles.triggerBurst(window.innerWidth * 0.75, window.innerHeight * 0.4, 35), 500);
        }

        if (this.achievements) {
          this.achievements.show('Surprise Complete 🎉', 'Happy Rakhi, Anwesha! 🧿❤️', '🎉');
        }

        // 6. Progressive final message reveal
        if (greetingZone) {
          greetingZone.style.display = 'block';
          gsap.fromTo(greetingZone,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.2, delay: 0.6, ease: 'power2.out' }
          );
        }
      };

      if (rakhiWrap) rakhiWrap.addEventListener('click', triggerCelebration);
      if (portraitBadge) portraitBadge.addEventListener('click', triggerCelebration);

      if (postcreditsBtn) {
        postcreditsBtn.addEventListener('click', () => {
          this.manager.next();
          resolve();
        });
      }
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
