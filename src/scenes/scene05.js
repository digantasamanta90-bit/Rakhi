/**
 * BEAT 05 — PANIC (CINEMATIC WHIRLWIND)
 * Frantic morning rush montage before the journey.
 * Speed streaks, whip pans, rushing items (phone, shirt, bag, laptop,
 * charger, wallet, gift, shoes), rapid countdown timer, and screen tremor.
 * Climax impact leads straight into the Metro Journey (Scene 06).
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
        <div id="panic-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;background:linear-gradient(180deg, #1e1b4b 0%, #31102f 50%, #450a0a 100%);">
          
          <!-- Motion Speed Streaks -->
          <div id="panic-streaks" style="position:absolute;inset:0;pointer-events:none;opacity:0.45;">
            ${Array.from({ length: 12 }).map((_, i) => `
              <div style="position:absolute;top:${i * 8}%;left:-10%;width:120%;height:2px;background:linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent);transform:rotate(${i % 2 === 0 ? 5 : -5}deg);"></div>
            `).join('')}
          </div>

          <!-- Countdown Timer -->
          <div class="text-timestamp" id="panic-timer" style="position:absolute;top:10%;left:50%;transform:translateX(-50%);font-size:clamp(1.8rem,6vw,2.8rem);color:#f87171;z-index:10;letter-spacing:0.06em;text-shadow:0 0 20px rgba(239,68,68,0.7);">
            15:00
          </div>
          
          <!-- Whirlwind Objects -->
          ${items.map((emoji, i) => `
            <div class="panic-object" id="panic-${i}" style="position:absolute;font-size:clamp(1.6rem,5.5vw,2.6rem);top:${20 + (i % 4) * 16}%;left:${12 + (i % 3) * 32}%;z-index:5;display:flex;flex-direction:column;align-items:center;">
              <span style="filter:drop-shadow(0 6px 16px rgba(0,0,0,0.8));">${emoji}</span>
              <span style="font-size:0.58rem;text-align:center;color:var(--rakhi-gold);font-family:var(--font-mono);margin-top:2px;font-weight:600;letter-spacing:0.06em;background:rgba(15,23,42,0.85);padding:2px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);">${labels[i]}</span>
            </div>
          `).join('')}

          <!-- Impact Reveal Banner -->
          <div class="text-impact" id="panic-rush" style="opacity:0;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20;font-size:clamp(2.8rem,11vw,4.8rem);color:#ffffff;letter-spacing:0.08em;text-shadow:0 0 35px rgba(220,38,38,0.9);">
            METRO
          </div>
        </div>
      `;

      const viewport = container.querySelector('#panic-viewport');
      const timerEl = container.querySelector('#panic-timer');
      const rushEl = container.querySelector('#panic-rush');

      this.tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            this.manager.next();
            resolve();
          }, 1200);
        }
      });

      // Objects fly in rapidly from different offscreen angles
      items.forEach((_, i) => {
        const el = container.querySelector(`#panic-${i}`);
        if (!el) return;

        const startX = (Math.random() - 0.5) * 260;
        const startY = (Math.random() > 0.5 ? -1 : 1) * 180;

        this.tl.fromTo(el,
          { opacity: 0, x: startX, y: startY, scale: 0.3, rotation: Math.random() * 80 - 40 },
          { opacity: 1, x: 0, y: 0, scale: 1, rotation: (Math.random() - 0.5) * 16, duration: 0.32, ease: 'back.out(1.6)' },
          0.15 + i * 0.14
        );
      });

      // Accelerated Countdown ticks
      const times = ['14:32', '11:15', '08:40', '05:22', '02:08', '00:45', '00:10', '00:00'];
      times.forEach((t, i) => {
        this.tl.call(() => {
          timerEl.textContent = t;
        }, [], 1.4 + i * 0.28);
      });

      // Screen tremor choreography
      this.tl.to(viewport, {
        x: 6, y: -4, duration: 0.04, repeat: 10, yoyo: true, ease: 'power1.inOut'
      }, 1.8);

      // Objects scatter outward in a fast vortex
      items.forEach((_, i) => {
        const el = container.querySelector(`#panic-${i}`);
        if (!el) return;
        const angle = (i / items.length) * Math.PI * 2;
        this.tl.to(el, {
          x: Math.cos(angle) * 350,
          y: Math.sin(angle) * 350,
          opacity: 0,
          scale: 0.4,
          duration: 0.45,
          ease: 'power2.in'
        }, 3.6);
      });

      // Whip-pan climax impact: "METRO"
      this.tl
        .to(timerEl, { opacity: 0, duration: 0.25 }, 3.8)
        .fromTo(rushEl, 
          { opacity: 0, scale: 3.2 }, 
          { opacity: 1, scale: 1, duration: 0.25, ease: 'power4.out' }, 
          4.0
        )
        .to(rushEl, { scale: 1.05, duration: 0.8, ease: 'sine.inOut' })
        .to(viewport, { opacity: 0, duration: 0.5, ease: 'power2.in' }, 4.9);
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


