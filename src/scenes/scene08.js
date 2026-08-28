/**
 * BEAT 08 — GOING HOME
 * Slowing journey. Reduced speed. Warmer tones.
 * Transition toward bedroom stillness.
 */

export class Scene08GoingHome {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <!-- Warm gradient background -->
          <div id="going-home-bg" style="position:absolute;inset:0;background:linear-gradient(180deg, #1a1216 0%, #2b1f24 100%);"></div>

          <!-- Distant fading lights -->
          <div style="position:absolute;width:100%;height:100%;overflow:hidden;">
            ${Array.from({length:8}).map((_, i) =>
              `<div class="going-home-light" style="position:absolute;width:${3+Math.random()*4}px;height:${3+Math.random()*4}px;border-radius:50%;background:rgba(255,220,150,${0.1+Math.random()*0.15});top:${30+Math.random()*30}%;left:${10+i*12}%;"></div>`
            ).join('')}
          </div>

          <!-- Text sequence -->
          <div style="z-index:10;display:flex;flex-direction:column;align-items:center;gap:20px;padding:20px;text-align:center;">
            <div class="text-timestamp-sm" id="gh-time" style="opacity:0;">THE RIDE BACK</div>
            <div class="text-dialogue" id="gh-msg1" style="opacity:0;">
              The world outside slowed down.
            </div>
            <div class="text-dialogue" id="gh-msg2" style="opacity:0;">
              Or maybe I just stopped noticing it.
            </div>
            <div class="text-whisper" id="gh-arrival" style="opacity:0;color:var(--cinema-accent);">HOME</div>
          </div>
        </div>
      `;

      const bg = container.querySelector('#going-home-bg');
      const lights = container.querySelectorAll('.going-home-light');
      const time = container.querySelector('#gh-time');
      const msg1 = container.querySelector('#gh-msg1');
      const msg2 = container.querySelector('#gh-msg2');
      const arrival = container.querySelector('#gh-arrival');

      this.tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            this.manager.next();
            resolve();
          }, 1500);
        }
      });

      lights.forEach(l => {
        this.tl.to(l, { x: -60, opacity: 0, duration: 4, ease: 'none' }, 0);
      });

      this.tl.call(() => {
        bg.style.background = 'linear-gradient(180deg, #1f1822 0%, #2b2025 100%)';
      }, [], 1.5);

      this.tl
        .to(time, { opacity: 0.6, duration: 1 }, 0.5)
        .to(msg1, { opacity: 1, duration: 1.2 }, 1.2)
        .to(msg2, { opacity: 1, duration: 1.2 }, 2.6)
        .to([time, msg1, msg2], { opacity: 0, duration: 1 }, 4.8)
        .to(arrival, { opacity: 1, duration: 1 }, 5.5)
        .to({}, { duration: 1 });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
