/**
 * BEAT 15 — THE APOLOGY
 * Dedicated quiet emotional chamber. Stillness and darkness.
 * Restrained, sincere thoughts appearing one by one with deliberate pauses.
 * Accountable, honest, free from emotional pressure. Leads naturally into Beat 16 (The Rakhi).
 * Styled in the Velvet Night × Antique Memory aesthetic.
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
        <div style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <!-- Quiet velvet dark ambient space -->
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%, rgba(26,13,20,0.5) 0%, rgba(10,7,9,0.98) 75%);pointer-events:none;"></div>

          <!-- Paced thought lines (Single focal area) -->
          <div id="a-text-chamber" style="position:relative;width:100%;max-width:320px;min-height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 20px;z-index:10;">
            <p class="text-dialogue" id="at-1" style="opacity:0;font-size:clamp(0.95rem,3.5vw,1.15rem);color:var(--cinema-text-muted);margin-bottom:8px;">
              I messed up.
            </p>
            <p class="text-dialogue" id="at-2" style="opacity:0;font-size:clamp(0.98rem,3.6vw,1.18rem);color:var(--cinema-text);margin-bottom:12px;">
              I'm sorry.
            </p>
            <p class="text-dialogue" id="at-3" style="opacity:0;font-size:clamp(0.92rem,3.4vw,1.1rem);color:var(--cinema-text-muted);margin-bottom:6px;">
              Not exactly how I imagined this day.
            </p>
            <p class="text-emotional" id="at-4" style="opacity:0;font-size:clamp(1.02rem,3.8vw,1.25rem);color:var(--cinema-accent);margin-bottom:6px;">
              But maybe that's okay.
            </p>
            <p class="text-dialogue" id="at-5" style="opacity:0;font-size:clamp(0.92rem,3.4vw,1.1rem);color:var(--cinema-text-muted);margin-bottom:4px;">
              Some moments don't happen the way you planned.
            </p>
            <p class="text-emotional" id="at-6" style="opacity:0;font-size:clamp(1.05rem,4vw,1.28rem);color:var(--cinema-gold);font-weight:600;">
              You just make sure the next one does.
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

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      this.tl
        .to({}, { duration: 1.2 })
        // Thought 1: "I messed up."
        .to(at1, { opacity: 1, duration: 1.2, ease: 'power2.out' })
        .to({}, { duration: 1.6 })
        // Thought 2: "I'm sorry."
        .to(at2, { opacity: 1, duration: 1.2, ease: 'power2.out' })
        .to({}, { duration: 1.8 })
        // Fade first two lines slightly to bring in perspective
        .to([at1, at2], { opacity: 0.35, duration: 0.8 })
        // Thought 3: "Not exactly how I imagined this day."
        .to(at3, { opacity: 1, duration: 1.2, ease: 'power2.out' })
        .to({}, { duration: 1.4 })
        // Thought 4: "But maybe that's okay."
        .to(at4, { opacity: 1, duration: 1.4, ease: 'power2.out' })
        .to({}, { duration: 1.6 })
        // Thought 5 & 6: Resolution
        .to(at5, { opacity: 1, duration: 1.2, ease: 'power2.out' })
        .to({}, { duration: 1.2 })
        .to(at6, { opacity: 1, duration: 1.4, ease: 'power2.out' })
        .to({}, { duration: 2.8 }) // breathe and hold
        // Smooth transition into Beat 16 (The Rakhi Finale)
        .to(chamber, { opacity: 0, scale: 0.94, duration: 1.2, ease: 'power2.inOut' });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
