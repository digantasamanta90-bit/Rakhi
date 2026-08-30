import { content } from '../content/content.js';

export class Scene05Panic {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene05;
      const t = c.timing || {};
      const items = c.items;

      container.innerHTML = `
        <div id="panic-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;background:linear-gradient(180deg, #070c18 0%, #31102f 50%, #450a0a 100%);">
          
          <!-- Motion Speed Streaks -->
          <div id="panic-streaks" style="position:absolute;inset:0;pointer-events:none;opacity:0.45;">
            ${Array.from({ length: 12 }).map((_, i) => `
              <div style="position:absolute;top:${i * 8}%;left:-10%;width:120%;height:2px;background:linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent);transform:rotate(${i % 2 === 0 ? 5 : -5}deg);"></div>
            `).join('')}
          </div>

          <!-- Isolated Tremor Stage (Keeps outer viewport 100% stable and aligned) -->
          <div id="panic-inner-stage" style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;">

            <!-- Countdown Timer -->
            <div class="text-timestamp" id="panic-timer" style="position:absolute;top:10%;left:50%;transform:translateX(-50%);font-size:clamp(1.8rem,6vw,2.8rem);color:#f87171;z-index:10;letter-spacing:0.06em;text-shadow:0 0 20px rgba(239,68,68,0.7);">
              ${c.timerStart}
            </div>
            
            <!-- Whirlwind Objects -->
            ${items.map((item, i) => `
              <div class="panic-object" id="panic-${i}" style="position:absolute;font-size:clamp(1.6rem,5.5vw,2.6rem);top:${20 + (i % 4) * 16}%;left:${12 + (i % 3) * 32}%;z-index:5;display:flex;flex-direction:column;align-items:center;">
                <span style="filter:drop-shadow(0 6px 16px rgba(0,0,0,0.8));">${item.emoji}</span>
                <span style="font-size:0.58rem;text-align:center;color:var(--rakhi-gold);font-family:var(--font-mono);margin-top:2px;font-weight:600;letter-spacing:0.06em;background:rgba(15,23,42,0.85);padding:2px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);">${item.label}</span>
              </div>
            `).join('')}

            <!-- Impact Reveal Banner -->
            <div class="text-impact" id="panic-rush" style="opacity:0;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20;font-size:clamp(2.8rem,11vw,4.8rem);color:#ffffff;letter-spacing:0.08em;text-shadow:0 0 35px rgba(220,38,38,0.9);">
              ${c.climaxBanner}
            </div>

          </div>
        </div>
      `;

      const viewport = container.querySelector('#panic-viewport');
      const innerStage = container.querySelector('#panic-inner-stage');
      const timerEl = container.querySelector('#panic-timer');
      const rushEl = container.querySelector('#panic-rush');

      const objStagger = t.objectStagger ?? 0.12;
      const tickInt = t.tickInterval ?? 0.22;
      const rushDur = t.rushDuration ?? 0.7;
      const transDur = t.transitionDuration ?? 0.4;

      this.tl = gsap.timeline({
        onComplete: () => {
          gsap.set([viewport, innerStage], { clearProps: 'all' });
          this.manager.next();
          resolve();
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
          { opacity: 1, x: 0, y: 0, scale: 1, rotation: (Math.random() - 0.5) * 16, duration: 0.28, ease: 'back.out(1.6)' },
          0.1 + i * objStagger
        );
      });

      // Accelerated Countdown ticks from content.js
      const times = c.timerTicks || ['14:32', '11:15', '08:40', '05:22', '02:08', '00:45', '00:10', '00:00'];
      times.forEach((tick, i) => {
        this.tl.call(() => {
          timerEl.textContent = tick;
        }, [], 1.1 + i * tickInt);
      });

      // Screen tremor choreography isolated strictly to inner stage
      this.tl
        .to(innerStage, { x: 5, y: -3, duration: 0.04, repeat: 8, yoyo: true, ease: 'power1.inOut' }, 1.5)
        .to(innerStage, { x: 0, y: 0, duration: 0.05 }, 1.9)
        .set(innerStage, { clearProps: 'transform' }, 1.95);

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
          duration: 0.4,
          ease: 'power2.in'
        }, 2.9);
      });

      // Whip-pan climax impact: "METRO"
      this.tl
        .to(timerEl, { opacity: 0, duration: 0.2 }, 3.1)
        .fromTo(rushEl, 
          { opacity: 0, scale: 2.8 }, 
          { opacity: 1, scale: 1, duration: 0.25, ease: 'power4.out' }, 
          3.2
        )
        .to(rushEl, { scale: 1.04, duration: rushDur, ease: 'sine.inOut' }, 3.45)
        .to(viewport, { opacity: 0, duration: transDur, ease: 'power2.in' }, 3.45 + rushDur);
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
