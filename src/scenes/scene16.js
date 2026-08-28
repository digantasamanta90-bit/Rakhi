/**
 * BEAT 16 — FINAL RAKHI (SEQUENTIAL CINEMATIC Payoff)
 * 
 * STEP 1: Rakhi completes & becomes sole focal object.
 * STEP 2: Portrait enters & settles. Tap to tie knot.
 * STEP 3: "RAKHI TIED. FOREVER." (appears -> holds -> disappears)
 * STEP 4: "FESTIVE BLESSINGS. FOREVER BOND." (appears -> holds -> disappears)
 * STEP 5: "HAPPY RAKHI," -> pause -> "ANWESHA ❤️" (emotional centerpiece, holds, recedes)
 * STEP 6: "A little late." -> pause -> "Still from the heart." (callback, holds, recedes)
 * STEP 7: "— Diganta" (signature, holds, fades)
 * STEP 8: Quiet visual breath: focus on Portrait + Rakhi in warm light
 * STEP 9: Gradual celebration release (light bloom -> particles -> musical peak)
 * STEP 10: Post-credits transition appears cleanly.
 * Styled in the Velvet Night × Antique Memory aesthetic.
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
          <!-- Ambient gold festive backdrop glow (Starts dark/subtle, blooms after emotional sequence) -->
          <div id="f-glow" style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%, rgba(212,176,106,0.05) 0%, rgba(10,7,9,0.98) 75%);pointer-events:none;transition:background 2.4s ease;"></div>

          <!-- Staged Hero Container -->
          <div id="f-hero-stage" style="position:relative;width:100%;max-width:340px;display:flex;flex-direction:column;align-items:center;z-index:10;">
            
            <!-- STEP 2: Anwesha Hero Portrait (Enters AFTER Rakhi settles) -->
            <div id="f-portrait-badge" style="opacity:0;transform:scale(0.8) translateY(-20px);width:75px;height:75px;border-radius:50%;border:2px solid var(--cinema-gold);overflow:hidden;box-shadow:0 0 25px rgba(212,176,106,0.25);margin-bottom:12px;cursor:pointer;">
              <img src="assets/portraits/anwesha12.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha12.png';">
            </div>

            <!-- STEP 1: The Master Rakhi Medallion (Sole focal object first) -->
            <div class="rakhi-finale-wrap" id="f-rakhi-wrap" role="button" aria-label="Sacred Rakhi" tabindex="0" style="opacity:0;transform:scale(0.75) translateY(30px);z-index:10;position:relative;cursor:pointer;">
              ${renderRakhiSvg({ size: 155, id: 'finale-master-rakhi-svg' })}
              <div id="f-rakhi-tap-hint" style="position:absolute;bottom:-24px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:0.72rem;letter-spacing:0.14em;color:var(--cinema-gold);text-transform:uppercase;font-weight:600;opacity:0;transition:opacity 0.4s;">
                TAP TO TIE RAKHI 🧿
              </div>
            </div>

            <!-- Sequential Cinematic Text Stage (Only ONE dialogue beat visible at any time) -->
            <div id="f-text-stage" style="position:relative;width:100%;min-height:120px;margin-top:28px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
              
              <!-- STEP 3: First Dialogue Line -->
              <p id="f-line-1" class="text-whisper" style="opacity:0;transform:translateY(10px);color:var(--rakhi-red);letter-spacing:0.18em;font-size:0.78rem;position:absolute;margin:0;">
                RAKHI TIED. FOREVER. 🧿
              </p>

              <!-- STEP 4: Second Dialogue Line -->
              <p id="f-line-2" class="text-whisper" style="opacity:0;transform:translateY(10px);color:var(--cinema-gold);letter-spacing:0.18em;font-size:0.78rem;position:absolute;margin:0;">
                FESTIVE BLESSINGS • FOREVER BOND
              </p>

              <!-- STEP 5: Main Centerpiece Greeting -->
              <div id="f-greeting-group" style="position:absolute;display:flex;flex-direction:column;align-items:center;width:100%;">
                <div id="f-greet-lead" class="finale-greeting" style="opacity:0;transform:translateY(8px);font-size:clamp(1.4rem,5.5vw,2.2rem);color:var(--cinema-text);margin-bottom:2px;">
                  HAPPY RAKHI,
                </div>
                <div id="f-greet-name" class="finale-greeting" style="opacity:0;transform:scale(0.85);font-size:clamp(1.75rem,6.8vw,2.8rem);color:var(--cinema-accent);font-weight:700;">
                  To You 💝
                </div>
              </div>

              <!-- STEP 6: Supporting Apology Callback -->
              <div id="f-apology-group" style="position:absolute;display:flex;flex-direction:column;align-items:center;width:100%;">
                <p id="f-apol-1" class="finale-sub" style="opacity:0;transform:translateY(8px);font-size:clamp(0.95rem,3.4vw,1.15rem);color:var(--cinema-text-muted);margin:0 0 4px 0;">
                  A little late.
                </p>
                <p id="f-apol-2" class="finale-sub" style="opacity:0;transform:translateY(8px);font-size:clamp(1.05rem,3.8vw,1.25rem);color:var(--cinema-accent);margin:0;">
                  Still from the heart.
                </p>
              </div>

              <!-- STEP 7: Signature -->
              <div id="f-signature" class="text-emotional" style="opacity:0;transform:translateY(8px);font-size:1rem;color:var(--cinema-gold);font-style:italic;position:absolute;letter-spacing:0.06em;">
                — Diganta 🧿
              </div>

            </div>

            <!-- STEP 10: Post-Credits Epilogue Action (Appears strictly after celebration) -->
            <div id="f-postcredits-wrap" style="opacity:0;transform:translateY(12px);margin-top:20px;z-index:15;">
              <button class="btn-secondary" id="f-postcredits-btn" style="font-size:0.78rem;padding:8px 20px;border-color:var(--cinema-border);color:var(--cinema-text-muted);background:transparent;">
                <span>Post-Credits Epilogue →</span>
              </button>
            </div>

          </div>
        </div>
      `;

      const rakhiWrap = container.querySelector('#f-rakhi-wrap');
      const portraitBadge = container.querySelector('#f-portrait-badge');
      const rakhiTapHint = container.querySelector('#f-rakhi-tap-hint');
      const glow = container.querySelector('#f-glow');
      const postcreditsWrap = container.querySelector('#f-postcredits-wrap');
      const postcreditsBtn = container.querySelector('#f-postcredits-btn');

      // Sequential Text Elements
      const line1 = container.querySelector('#f-line-1');
      const line2 = container.querySelector('#f-line-2');
      const greetLead = container.querySelector('#f-greet-lead');
      const greetName = container.querySelector('#f-greet-name');
      const apol1 = container.querySelector('#f-apol-1');
      const apol2 = container.querySelector('#f-apol-2');
      const signature = container.querySelector('#f-signature');

      this.tl = gsap.timeline();

      // STEP 1: Rakhi completes as sole focal object
      this.tl
        .to(rakhiWrap, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'bounce.out', delay: 0.2 })
        .call(() => { try { this.audio.playChime(523, 0.2); } catch(e) {} }, [], 0.4)
        .to({}, { duration: 1.2 }) // Allow viewer to look at Rakhi alone

        // STEP 2: Portrait enters & settles
        .to(portraitBadge, { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'back.out(1.2)' })
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} })
        .to(rakhiTapHint, { opacity: 1, duration: 0.6 }, "+=0.3");

      // Interactive / Earned Tying Sequence
      const executeSequence = () => {
        if (this.celebrated) return;
        this.celebrated = true;

        const seqTl = gsap.timeline();

        seqTl
          // Knot tightens on user tap
          .to(rakhiTapHint, { opacity: 0, duration: 0.3 })
          .to(rakhiWrap, { scale: 1.14, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.inOut' })
          .call(() => {
            try { this.audio.playChime(659, 0.25); } catch(e) {}
            const flare = document.getElementById('screen-flare');
            if (flare) {
              flare.classList.remove('trigger');
              void flare.offsetWidth;
              flare.classList.add('trigger');
            }
          })
          .to({}, { duration: 0.5 })

          // STEP 3: "RAKHI TIED. FOREVER." (appears -> holds -> recedes)
          .to(line1, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
          .to({}, { duration: 1.8 })
          .to(line1, { opacity: 0, y: -10, duration: 0.5, ease: 'power2.in' })
          .to({}, { duration: 0.3 })

          // STEP 4: "FESTIVE BLESSINGS • FOREVER BOND" (appears -> holds -> recedes)
          .to(line2, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
          .to({}, { duration: 1.8 })
          .to(line2, { opacity: 0, y: -10, duration: 0.5, ease: 'power2.in' })
          .to({}, { duration: 0.4 })

          // STEP 5: MAIN GREETING ("HAPPY RAKHI," -> pause -> "ANWESHA ❤️")
          .to(greetLead, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
          .to({}, { duration: 0.9 }) // Deliberate emotional pause
          .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} })
          .to(greetName, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.3)' })
          .to({}, { duration: 2.6 }) // Emotional centerpiece holds together
          .to([greetLead, greetName], { opacity: 0, y: -14, duration: 0.7, ease: 'power2.in' })
          .to({}, { duration: 0.4 })

          // STEP 6: SUPPORTING APOLOGY CALLBACK ("A little late." -> "Still from the heart.")
          .to(apol1, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
          .to({}, { duration: 0.8 })
          .to(apol2, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
          .to({}, { duration: 2.2 })
          .to([apol1, apol2], { opacity: 0, duration: 0.6, ease: 'power2.in' })
          .to({}, { duration: 0.3 })

          // STEP 7: SIGNATURE ("— Diganta 🧿")
          .to(signature, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' })
          .to({}, { duration: 2.2 })
          .to(signature, { opacity: 0, duration: 0.8, ease: 'power2.in' })
          .to({}, { duration: 0.4 })

          // STEP 8: FINAL VISUAL BREATH (Portrait + Rakhi in quiet focus)
          .to({}, { duration: 1.8 })

          // STEP 9: GRADUAL CELEBRATION RELEASE
          .call(() => {
            // Warm golden backdrop bloom
            if (glow) {
              glow.style.background = 'radial-gradient(circle at 50% 40%, rgba(212,176,106,0.28) 0%, rgba(155,93,112,0.18) 45%, rgba(10,7,9,0.95) 85%)';
            }
            try {
              this.audio.playCelebrateSfx();
              this.audio.startMusic();
            } catch(e) {}
            if (this.achievements) {
              this.achievements.show('Surprise Complete 🎉', 'Happy Rakhi, Anwesha! 🧿❤️', '🎉');
            }
          })
          .to({}, { duration: 0.4 })
          // Staggered celebratory particle bursts
          .call(() => {
            if (this.particles) {
              this.particles.triggerBurst(window.innerWidth / 2, window.innerHeight * 0.35, 55);
            }
          })
          .to({}, { duration: 0.35 })
          .call(() => {
            if (this.particles) {
              this.particles.triggerBurst(window.innerWidth * 0.25, window.innerHeight * 0.4, 30);
              this.particles.triggerBurst(window.innerWidth * 0.75, window.innerHeight * 0.4, 30);
            }
          })
          .to({}, { duration: 1.4 })

          // STEP 10: POST-CREDITS EPILOGUE BUTTON
          .to(postcreditsWrap, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
      };

      if (rakhiWrap) rakhiWrap.addEventListener('click', executeSequence);
      if (portraitBadge) portraitBadge.addEventListener('click', executeSequence);

      if (postcreditsBtn) {
        postcreditsBtn.addEventListener('click', () => {
          gsap.to(container.querySelector('#f-hero-stage'), {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              this.manager.next();
              resolve();
            }
          });
        });
      }
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
