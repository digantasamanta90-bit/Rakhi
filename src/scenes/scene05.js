/**
 * BEAT 05 — PANIC
 * Fast kinetic montage. Objects fly. Timer counts down.
 * Ends with "BUS".
 */

export class Scene05Panic {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      const items = ['📱', '👕', '🎒', '💻', '🔌', '👛', '🎁', '👟'];
      const labels = ['PHONE', 'SHIRT', 'BAG', 'LAPTOP', 'CHARGER', 'WALLET', 'GIFT', 'SHOES'];

      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;overflow:hidden;">
          <div class="text-timestamp" id="panic-timer" style="position:absolute;top:10%;left:50%;transform:translateX(-50%);font-size:clamp(1.5rem,5vw,2.5rem);color:var(--cinema-accent);z-index:10;">15:00</div>
          ${items.map((emoji, i) => `
            <div class="panic-object" id="panic-${i}" style="font-size:clamp(1.5rem,5vw,2.5rem);top:${20 + Math.random() * 55}%;left:${10 + Math.random() * 75}%;">
              ${emoji}
              <div style="font-size:0.55rem;text-align:center;color:var(--cinema-text-subtle);font-family:var(--font-mono);margin-top:2px;">${labels[i]}</div>
            </div>
          `).join('')}
          <div class="text-impact" id="panic-bus" style="opacity:0;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20;font-size:clamp(2.5rem,10vw,4.5rem);">BUS</div>
        </div>
      `;

      const timerEl = container.querySelector('#panic-timer');
      const busEl = container.querySelector('#panic-bus');

      this.tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            this.manager.next();
            resolve();
          }, 1500);
        }
      });

      // Objects fly in rapidly
      items.forEach((_, i) => {
        const el = container.querySelector(`#panic-${i}`);
        if (!el) return;

        const startX = (Math.random() - 0.5) * 200;
        const startY = (Math.random() > 0.5 ? -1 : 1) * 150;

        this.tl.fromTo(el,
          { opacity: 0, x: startX, y: startY, scale: 0.3, rotation: Math.random() * 90 - 45 },
          { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(1.5)' },
          0.2 + i * 0.15
        );
      });

      // Timer countdown
      const times = ['14:32', '12:06', '09:47', '06:21', '03:15', '01:08', '00:23', '00:00'];
      times.forEach((t, i) => {
        this.tl.call(() => {
          timerEl.textContent = t;
          try { this.audio.playChime(600 - i * 30, 0.08); } catch(e) {}
        }, [], 1.5 + i * 0.35);
      });

      // Screen shake
      this.tl.to(container, {
        x: 4, duration: 0.04, repeat: 8, yoyo: true, ease: 'power1.inOut'
      }, 2);

      // Objects scatter outward
      items.forEach((_, i) => {
        const el = container.querySelector(`#panic-${i}`);
        if (!el) return;
        const angle = (i / items.length) * Math.PI * 2;
        this.tl.to(el, {
          x: Math.cos(angle) * 300,
          y: Math.sin(angle) * 300,
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: 'power2.in'
        }, 4.3);
      });

      // BUS impact
      this.tl
        .to(timerEl, { opacity: 0, duration: 0.3 }, 4.5)
        .call(() => { try { this.audio.playGlitchSfx(); } catch(e) {} }, [], 4.9)
        .fromTo(busEl, { opacity: 0, scale: 3 }, { opacity: 1, scale: 1, duration: 0.2, ease: 'power4.out' }, 5)
        .to({}, { duration: 1 });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
