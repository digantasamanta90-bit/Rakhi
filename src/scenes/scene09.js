/**
 * BEAT 09 — THE CEILING (EMOTIONAL STILLNESS & PIVOT)
 * Dim grey-blue room, soft atmospheric haze, slow rotating ceiling fan shadow,
 * diffused window light beam, and still camera.
 * Dialogue: "I messed up." → "I'm sorry." → "But I didn't make this for one morning."
 * Introduces subtle warm light on the turning point line, leading directly into Memories (Scene 10).
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
        <div class="ceiling-depressed-env" id="s9-viewport" style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;">
          
          <!-- Diffused Window Sunbeam / Haze Beam -->
          <div class="golden-hour-beam" id="s9-sunbeam" style="opacity:0.25;filter:blur(30px);"></div>

          <!-- Ambient Moving Fog Haze Layer -->
          <div class="gloom-fog-layer"></div>

          <!-- Ceiling Fan & Moving Shadow -->
          <div class="fan-shadow" id="s9-fan" style="opacity:0.65;width:140px;height:140px;"></div>

          <!-- Subtle Ceiling Light Source (Becomes warmer on turning point) -->
          <div id="s9-light" style="position:absolute;top:15%;left:50%;transform:translateX(-50%);width:12px;height:12px;border-radius:50%;background:rgba(254,240,138,0.25);box-shadow:0 0 45px 16px rgba(254,240,138,0.08);transition:all 1.5s ease;"></div>

          <!-- Text Sequence Container -->
          <div id="s9-text-wrap" style="z-index:10;display:flex;flex-direction:column;align-items:center;padding:0 24px;max-width:320px;text-align:center;">
            <div class="text-dialogue" id="c-msg1" style="opacity:0;margin-bottom:22px;color:var(--cinema-text-muted);font-size:1.18rem;font-style:italic;">
              "I messed up."
            </div>
            <div class="text-dialogue" id="c-msg2" style="opacity:0;margin-bottom:22px;color:var(--cinema-text);font-size:1.24rem;font-style:italic;">
              "I'm sorry."
            </div>
            <div class="text-emotional" id="c-msg3" style="opacity:0;font-size:clamp(1.15rem,4vw,1.4rem);color:var(--rakhi-gold);font-style:italic;font-weight:600;text-shadow:0 0 20px rgba(251,191,36,0.35);">
              "But I didn't make this for one morning."
            </div>
          </div>
        </div>
      `;

      const viewport = container.querySelector('#s9-viewport');
      const fan = container.querySelector('#s9-fan');
      const sunbeam = container.querySelector('#s9-sunbeam');
      const light = container.querySelector('#s9-light');
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
        .to({}, { duration: 1.2 })
        
        // Line 1: "I messed up."
        .to(msg1, { opacity: 1, y: -4, duration: 1.6, ease: 'power2.out' })
        .to({}, { duration: 1.8 }) // stillness
        
        // Line 2: "I'm sorry."
        .to(msg2, { opacity: 1, y: -4, duration: 1.6, ease: 'power2.out' })
        .to({}, { duration: 2.2 }) // heavy pause
        
        // Emotional Turning Point: "But I didn't make this for one morning."
        // Subtle warm light enters
        .call(() => {
          if (viewport) {
            viewport.style.background = 'radial-gradient(circle at 50% 45%, #2a1b1b 0%, #171118 55%, #0a080d 100%)';
          }
          if (light) {
            light.style.background = 'rgba(254,240,138,0.6)';
            light.style.boxShadow = '0 0 60px 24px rgba(251,191,36,0.2)';
          }
          if (sunbeam) {
            sunbeam.style.opacity = '0.5';
          }
        }, [], 6.6)
        .to(msg3, { opacity: 1, y: -4, duration: 1.8, ease: 'power2.out' }, 6.8)
        .to({}, { duration: 2.6 }) // let the pivot breathe
        
        // Camera descent into warm memory dust (Scene 10)
        .to([msg1, msg2], { opacity: 0, y: -18, duration: 1.2, ease: 'power2.in' }, 11.2)
        .to(fan, { opacity: 0, scale: 0.7, duration: 1.4, ease: 'power2.in' }, '<')
        .to(msg3, { opacity: 0, y: -12, duration: 1.2, ease: 'power2.in' }, '<')
        .to(viewport, { opacity: 0, scale: 0.96, duration: 1.0, ease: 'power2.inOut' });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


