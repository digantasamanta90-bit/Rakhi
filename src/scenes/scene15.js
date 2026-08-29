/**
 * BEAT 15 — THE APOLOGY (GOLDEN HOUR SANCTUARY)
 * Golden hour afternoon warmth, quiet stillness, and sincere thoughts appearing one by one.
 * Accountable, honest, free from emotional pressure.
 * Builds up with golden radiance leading directly into the Rakhi Finale (Beat 16).
 */

export class Scene15Apology {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      container.innerHTML = `
        <div class="apology-golden-env" id="s15-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%, #451a03 0%, #1e1b4b 60%, #0f172a 100%);">
          
          <!-- Golden Hour Light Beam -->
          <div class="golden-hour-beam" style="opacity:0.45;filter:blur(30px);"></div>

          <!-- Paced thought lines (Single focal area) -->
          <div id="a-text-chamber" style="position:relative;width:100%;max-width:320px;min-height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 20px;z-index:10;">
            <p class="text-dialogue" id="at-1" style="opacity:0;font-size:clamp(1.02rem,3.5vw,1.2rem);color:#cbd5e1;margin-bottom:8px;font-style:italic;">
              "I ruined Friday"
            </p>
            <p class="text-dialogue" id="at-2" style="opacity:0;font-size:clamp(1.05rem,3.6vw,1.24rem);color:#f8fafc;margin-bottom:14px;font-style:italic;font-weight:600;">
              "I'm sorry for that."
            </p>
            <p class="text-dialogue" id="at-3" style="opacity:0;font-size:clamp(0.98rem,3.4vw,1.15rem);color:#94a3b8;margin-bottom:8px;">
              "Not exactly how I imagined that day."
            </p>
            <p class="text-emotional" id="at-4" style="opacity:0;font-size:clamp(1.08rem,3.8vw,1.3rem);color:var(--rakhi-gold);margin-bottom:8px;font-style:italic;">
              "But maybe that's okay."
            </p>
            <p class="text-dialogue" id="at-5" style="opacity:0;font-size:clamp(0.98rem,3.4vw,1.15rem);color:#cbd5e1;margin-bottom:6px;">
              "Some moments don't happen the way you planned."
            </p>
            <p class="text-emotional" id="at-6" style="opacity:0;font-size:clamp(1.15rem,4vw,1.4rem);color:var(--rakhi-gold);font-weight:700;text-shadow:0 0 25px rgba(251,191,36,0.6);">
              "But I'll make sure the next one does."
            </p>
          </div>
        </div>
      `;

      const at1 = container.querySelector('#at-1');
      const at2 = container.querySelector('#at-2');
      const at3 = container.querySelector('#at-3');
      const at4 = container.querySelector('#at-4');
      const at5 = container.querySelector('#at-5');
      const at6 = container.querySelector('#at-6');
      const chamber = container.querySelector('#a-text-chamber');
      const viewport = container.querySelector('#s15-viewport');

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      this.tl
        .to({}, { duration: 0.4 })
        // Thought 1: "I ruined Friday"
        .to(at1, { opacity: 1, duration: 0.6, ease: 'power2.out' })
        .to({}, { duration: 0.9 })
        // Thought 2: "I'm sorry for that."
        .to(at2, { opacity: 1, duration: 0.6, ease: 'power2.out' })
        .to({}, { duration: 1.1 })
        // Fade first two lines slightly to focus on resolution
        .to([at1, at2], { opacity: 0.3, duration: 0.4 })
        // Thought 3: "Not exactly how I imagined that day."
        .to(at3, { opacity: 1, duration: 0.6, ease: 'power2.out' })
        .to({}, { duration: 0.9 })
        // Thought 4: "But maybe that's okay."
        .to(at4, { opacity: 1, duration: 0.7, ease: 'power2.out' })
        .to({}, { duration: 0.9 })
        // Thought 5: "Some moments don't happen the way you planned."
        .to(at5, { opacity: 1, duration: 0.6, ease: 'power2.out' })
        .to({}, { duration: 0.8 })
        // Thought 6: "But I'll make sure the next one does."
        .to(at6, { opacity: 1, scale: 1.03, duration: 0.9, ease: 'power2.out' })
        .to({}, { duration: 1.6 }) // breathe and hold
        // Golden bloom transition directly into Beat 16 (The Rakhi Finale)
        .to(chamber, { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.inOut' })
        .to(viewport, { opacity: 0, duration: 0.5, ease: 'power2.in' }, "-=0.2");
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


