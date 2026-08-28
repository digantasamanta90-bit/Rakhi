/**
 * BEAT 01 — 4:30 AM
 * Near-total darkness. Clock ticks. "Finally."
 * Opening film shot. No navigation visible.
 */

export class Scene01Clock {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      container.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;padding:20px;">
          <div class="text-whisper" id="s1-date" style="opacity:0;">AUGUST 28, 2026, FRIDAY • LATE NIGHT</div>
          <div class="text-timestamp" id="s1-clock" style="margin:24px 0;opacity:0;">4:27 AM</div>
          <div id="s1-text" style="opacity:0;min-height:2em;">
            <span class="text-dialogue" id="s1-msg"></span><span class="cursor-blink"></span>
          </div>
        </div>
      `;

      const dateEl = container.querySelector('#s1-date');
      const clockEl = container.querySelector('#s1-clock');
      const textEl = container.querySelector('#s1-text');
      const msgEl = container.querySelector('#s1-msg');

      this.tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            this.manager.next();
            resolve();
          }, 2000);
        }
      });

      this.tl
        .to(dateEl, { opacity: 0.5, duration: 1.5, ease: 'power2.out', delay: 0.8 })
        .to(clockEl, { opacity: 1, duration: 1, ease: 'power2.out' })
        .to({}, { duration: 1.5 })
        .call(() => {
          clockEl.textContent = '4:29 AM';
          try { this.audio.playChime(320, 0.2); } catch(e) {}
        })
        .to({}, { duration: 1.2 })
        .call(() => {
          clockEl.textContent = '4:30 AM';
          try { this.audio.playChime(440, 0.3); } catch(e) {}
        })
        .to(clockEl, { scale: 1.05, duration: 0.8, ease: 'power1.inOut' })
        .to({}, { duration: 0.8 })
        .to(textEl, { opacity: 1, duration: 0.6 })
        .call(() => {
          const text = 'Finally.';
          let i = 0;
          const typeInterval = setInterval(() => {
            if (i < text.length) {
              msgEl.textContent += text[i];
              i++;
            } else {
              clearInterval(typeInterval);
            }
          }, 80);
        })
        .to({}, { duration: 1.5 });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
