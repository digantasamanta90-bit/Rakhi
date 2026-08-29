/**
 * BEAT 16 — FINAL RAKHI (GRAND FESTIVE CELEBRATION)
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
        <div style="position:relative;width:100%;height:100%;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:calc(env(safe-area-inset-top,10px) + 20px) 16px 36px 16px;background:linear-gradient(180deg, #1e1b4b 0%, #450a0a 50%, #78350f 100%);">
          <!-- Ambient gold festive backdrop glow -->
          <div id="f-glow" style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%, rgba(251,191,36,0.15) 0%, rgba(15,23,42,0.95) 75%);pointer-events:none;transition:background 2.4s ease;"></div>

          <!-- Staged Hero Container -->
          <div id="f-hero-stage" style="position:relative;width:100%;max-width:340px;display:flex;flex-direction:column;align-items:center;z-index:10;">
            
            <!-- STEP 2: Anwesha Hero Portrait -->
            <div id="f-portrait-badge" style="opacity:0;transform:scale(0.8) translateY(-20px);width:80px;height:80px;border-radius:50%;border:3px solid var(--rakhi-gold);overflow:hidden;box-shadow:0 0 25px rgba(251,191,36,0.4);margin-bottom:12px;cursor:pointer;">
              <img src="assets/portraits/anwesha12.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha12.png';">
            </div>

            <!-- STEP 1: The Master Rakhi Medallion -->
            <div class="rakhi-finale-wrap" id="f-rakhi-wrap" role="button" aria-label="Sacred Rakhi" tabindex="0" style="opacity:0;transform:scale(0.75) translateY(30px);z-index:10;position:relative;cursor:pointer;">
              ${renderRakhiSvg({ size: 160, id: 'finale-master-rakhi-svg' })}
              <div id="f-rakhi-tap-hint" style="position:absolute;bottom:-26px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:0.75rem;letter-spacing:0.16em;color:var(--rakhi-gold);text-transform:uppercase;font-weight:700;opacity:0;transition:opacity 0.4s;text-shadow:0 0 10px rgba(251,191,36,0.6);">
                TAP TO TIE RAKHI 🧿
              </div>
            </div>

            <!-- Sequential Cinematic Text Stage -->
            <div id="f-text-stage" style="position:relative;width:100%;min-height:120px;margin-top:28px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
              
              <!-- STEP 3: First Dialogue Line -->
              <p id="f-line-1" class="text-whisper" style="opacity:0;transform:translateY(10px);color:var(--rakhi-red);letter-spacing:0.18em;font-size:0.85rem;position:absolute;margin:0;font-weight:700;">
                RAKHI TIED. FOREVER. 🧿
              </p>

              <!-- STEP 4: Second Dialogue Line -->
              <p id="f-line-2" class="text-whisper" style="opacity:0;transform:translateY(10px);color:var(--rakhi-gold);letter-spacing:0.18em;font-size:0.85rem;position:absolute;margin:0;font-weight:700;">
                FESTIVE BLESSINGS • FOREVER BOND
              </p>

              <!-- STEP 5: Main Centerpiece Greeting -->
              <div id="f-greeting-group" style="position:absolute;display:flex;flex-direction:column;align-items:center;width:100%;">
                <div id="f-greet-lead" class="finale-greeting" style="opacity:0;transform:translateY(8px);font-size:clamp(1.5rem,5.5vw,2.3rem);color:#ffffff;margin-bottom:2px;font-family:var(--font-serif);font-weight:700;">
                  HAPPY RAKHI,
                </div>
                <div id="f-greet-name" class="finale-greeting" style="opacity:0;transform:scale(0.85);font-size:clamp(1.85rem,6.8vw,3.0rem);color:var(--rakhi-gold);font-weight:800;text-shadow:0 0 30px rgba(251,191,36,0.8);font-family:var(--font-serif);">
                  Anwesha ❤️
                </div>
              </div>

              <!-- STEP 6: Supporting Apology Callback -->
              <div id="f-apology-group" style="position:absolute;display:flex;flex-direction:column;align-items:center;width:100%;">
                <p id="f-apol-1" class="finale-sub" style="opacity:0;transform:translateY(8px);font-size:clamp(1.0rem,3.4vw,1.2rem);color:#cbd5e1;margin:0 0 4px 0;font-style:italic;">
                  A little late.
                </p>
                <p id="f-apol-2" class="finale-sub" style="opacity:0;transform:translateY(8px);font-size:clamp(1.1rem,3.8vw,1.35rem);color:#f8fafc;margin:0;font-style:italic;font-weight:600;">
                  Still from the heart.
                </p>
              </div>

              <!-- STEP 7: Signature -->
              <div id="f-signature" class="text-emotional" style="opacity:0;transform:translateY(8px);font-size:1.15rem;color:var(--rakhi-gold);font-style:italic;position:absolute;letter-spacing:0.06em;font-weight:700;">
                — Diganta 🧿
              </div>

            </div>

            <!-- STEP 10: Post-Credits Epilogue Action -->
            <div id="f-postcredits-wrap" style="opacity:0;transform:translateY(12px);margin-top:24px;z-index:15;">
              <button class="btn-secondary" id="f-postcredits-btn" style="font-size:0.85rem;padding:10px 24px;border:1.5px solid rgba(251,191,36,0.5);color:var(--rakhi-gold);background:rgba(15,23,42,0.8);border-radius:24px;cursor:pointer;font-weight:600;">
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
        .to({}, { duration: 1.2 })

        // STEP 2: Portrait enters & settles
        .to(portraitBadge, { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'back.out(1.2)' })
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
            const flare = document.getElementById('screen-flare');
            if (flare) {
              flare.classList.remove('trigger');
              void flare.offsetWidth;
              flare.classList.add('trigger');
            }
          })
          .to({}, { duration: 0.5 })

          // STEP 3: "RAKHI TIED. FOREVER."
          .to(line1, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
          .to({}, { duration: 1.2 })
          .to(line1, { opacity: 0, y: -8, duration: 0.4, ease: 'power2.in' })
          .to({}, { duration: 0.2 })

          // STEP 4: "FESTIVE BLESSINGS • FOREVER BOND"
          .to(line2, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
          .to({}, { duration: 1.2 })
          .to(line2, { opacity: 0, y: -8, duration: 0.4, ease: 'power2.in' })
          .to({}, { duration: 0.25 })

          // STEP 5: MAIN GREETING ("HAPPY RAKHI," -> pause -> "ANWESHA ❤️")
          .to(greetLead, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
          .to({}, { duration: 0.6 })
          .to(greetName, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.3)' })
          .to({}, { duration: 1.8 })
          .to([greetLead, greetName], { opacity: 0, y: -10, duration: 0.5, ease: 'power2.in' })
          .to({}, { duration: 0.25 })

          // STEP 6: SUPPORTING APOLOGY CALLBACK ("A little late." -> "Still from the heart.")
          .to(apol1, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
          .to({}, { duration: 0.6 })
          .to(apol2, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
          .to({}, { duration: 1.4 })
          .to([apol1, apol2], { opacity: 0, duration: 0.5, ease: 'power2.in' })
          .to({}, { duration: 0.25 })

          // STEP 7: SIGNATURE ("— Diganta 🧿")
          .to(signature, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
          .to({}, { duration: 1.5 })
          .to(signature, { opacity: 0, duration: 0.6, ease: 'power2.in' })
          .to({}, { duration: 0.3 })

          // STEP 8: FINAL VISUAL BREATH
          .to({}, { duration: 1.0 })

          // STEP 9: GRADUAL CELEBRATION RELEASE
          .call(() => {
            // Warm golden festive bloom
            if (glow) {
              glow.style.background = 'radial-gradient(circle at 50% 40%, rgba(251,191,36,0.35) 0%, rgba(220,38,38,0.25) 45%, rgba(15,23,42,0.95) 85%)';
            }
            if (this.achievements) {
              this.achievements.show('Surprise Complete 🎉', 'Happy Rakhi, Anwesha! 🧿❤️', '🎉');
            }
          })
          .to({}, { duration: 0.3 })
          // Staggered celebratory particle bursts
          .call(() => {
            if (this.particles) {
              this.particles.triggerBurst(window.innerWidth / 2, window.innerHeight * 0.35, 55);
            }
          })
          .to({}, { duration: 0.3 })
          .call(() => {
            if (this.particles) {
              this.particles.triggerBurst(window.innerWidth * 0.25, window.innerHeight * 0.4, 30);
              this.particles.triggerBurst(window.innerWidth * 0.75, window.innerHeight * 0.4, 30);
            }
          })
          .to({}, { duration: 1.0 })

          // STEP 10: POST-CREDITS EPILOGUE BUTTON
          .to(postcreditsWrap, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
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

