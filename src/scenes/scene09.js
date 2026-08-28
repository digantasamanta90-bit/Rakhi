/**
 * BEAT 09 — THE CEILING
 * One of the most important moments. Near-still.
 * Fan shadow. "I messed up." → "I'm sorry." → "But I didn't make this for one morning."
 * Seamless camera descent into memory darkness for Scene 10.
 * Styled in the Velvet Night × Antique Memory aesthetic.
 */

export class Scene09Ceiling {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      container.innerHTML = `
        <div class="ceiling-scene" id="s9-viewport" style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;">
          <!-- Fan shadow -->
          <div class="fan-shadow" id="s9-fan"></div>

          <!-- Subtle ceiling light source -->
          <div id="s9-light" style="position:absolute;top:18%;left:50%;transform:translateX(-50%);width:8px;height:8px;border-radius:50%;background:rgba(212,176,106,0.22);box-shadow:0 0 35px 12px rgba(212,176,106,0.06);"></div>

          <!-- Text sequence -->
          <div id="s9-text-wrap" style="z-index:10;display:flex;flex-direction:column;align-items:center;padding:0 24px;max-width:320px;text-align:center;">
            <div class="text-dialogue" id="c-msg1" style="opacity:0;margin-bottom:20px;">
              I messed up.
            </div>
            <div class="text-dialogue" id="c-msg2" style="opacity:0;margin-bottom:20px;">
              I'm sorry.
            </div>
            <div class="text-emotional" id="c-msg3" style="opacity:0;font-size:clamp(1.05rem,3.8vw,1.25rem);color:var(--cinema-accent);">
              But I didn't make this for one morning.
            </div>
          </div>
        </div>
      `;

      const fan = container.querySelector('#s9-fan');
      const light = container.querySelector('#s9-light');
      const textWrap = container.querySelector('#s9-text-wrap');
      const msg1 = container.querySelector('#c-msg1');
      const msg2 = container.querySelector('#c-msg2');
      const msg3 = container.querySelector('#c-msg3');

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      this.tl
        .to({}, { duration: 1.5 })
        // First line: "I messed up."
        .to(msg1, { opacity: 1, duration: 1.5, ease: 'power2.out' })
        .to({}, { duration: 1.8 })
        // Second line: "I'm sorry."
        .to(msg2, { opacity: 1, duration: 1.5, ease: 'power2.out' })
        .to({}, { duration: 2.2 })
        // Turning point line: "But I didn't make this for one morning."
        .to(msg3, { opacity: 1, duration: 1.8, ease: 'power2.out' })
        .to({}, { duration: 2.2 })
        // Cinematic Camera Descent: words and fan recede into warm memory darkness
        .to([msg1, msg2], { opacity: 0, y: -20, duration: 1.2, ease: 'power2.in' })
        .to(fan, { opacity: 0, scale: 0.6, duration: 1.5, ease: 'power2.in' }, '<')
        .to(msg3, { y: -10, opacity: 0.4, duration: 1.2 }, '<')
        .to(light, { scale: 3, opacity: 0.15, duration: 1.2 }, '<')
        .to(textWrap, { opacity: 0, scale: 0.95, duration: 1.0 });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
