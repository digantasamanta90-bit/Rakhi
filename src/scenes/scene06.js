/**
 * BEAT 06 — THE JOURNEY
 * Atmospheric travel illusion. Parallax buildings, light streaks, window frame.
 * Distance + regret + movement.
 * Styled in the Velvet Night × Antique Memory aesthetic.
 */

export class Scene06Journey {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      // Generate city buildings
      let buildingsHTML = '';
      for (let i = 0; i < 30; i++) {
        const h = 40 + Math.random() * 80;
        const w = 15 + Math.random() * 30;
        const windowCount = Math.floor(h / 16);
        let windows = '';
        for (let j = 0; j < windowCount; j++) {
          const lit = Math.random() > 0.6;
          windows += `<div style="width:4px;height:4px;background:${lit ? 'rgba(212,176,106,0.6)' : 'rgba(232,220,203,0.03)'};margin:3px auto;"></div>`;
        }
        buildingsHTML += `<div style="flex-shrink:0;width:${w}px;height:${h}px;background:var(--wine);border:1px solid rgba(232,220,203,0.03);align-self:flex-end;margin-right:2px;display:flex;flex-direction:column;justify-content:flex-start;padding-top:4px;">${windows}</div>`;
      }

      container.innerHTML = `
        <div class="journey-container">
          <!-- Sky gradient (Velvet night into warm brown-plum) -->
          <div style="position:absolute;inset:0;background:linear-gradient(180deg, #1A0D14 0%, #2A141D 40%, #3A211F 70%, #0A0709 100%);"></div>

          <!-- Stars/lights far layer -->
          <div id="j-stars" style="position:absolute;top:0;left:0;width:200%;height:30%;">
            ${Array.from({length:20}).map(() =>
              `<div style="position:absolute;width:2px;height:2px;background:rgba(232,220,203,${0.1+Math.random()*0.3});border-radius:50%;top:${Math.random()*100}%;left:${Math.random()*100}%;"></div>`
            ).join('')}
          </div>

          <!-- Buildings mid layer -->
          <div id="j-buildings" style="position:absolute;bottom:25%;left:0;width:200%;height:35%;display:flex;align-items:flex-end;">
            ${buildingsHTML}
          </div>

          <!-- Ground/road -->
          <div style="position:absolute;bottom:0;left:0;width:100%;height:25%;background:linear-gradient(180deg, #1A0D14, #0A0709);"></div>

          <!-- Light streaks (Warm Antique Gold highlights) -->
          <div id="j-streaks" style="position:absolute;bottom:15%;left:0;width:200%;height:8%;display:flex;gap:30px;">
            ${Array.from({length:15}).map(() =>
              `<div style="flex-shrink:0;width:${40+Math.random()*80}px;height:2px;background:rgba(212,176,106,${0.1+Math.random()*0.25});border-radius:1px;align-self:center;"></div>`
            ).join('')}
          </div>

          <!-- Window frame -->
          <div class="journey-window-frame" style="border-color:#1A0D14;"></div>

          <!-- Reflection text -->
          <div style="position:absolute;bottom:32%;left:50%;transform:translateX(-50%);z-index:12;text-align:center;width:90%;">
            <div class="text-dialogue" id="j-thought" style="opacity:0;font-size:clamp(0.85rem,3vw,1rem);margin:auto;">
              She was waiting. And I wasn't there.
            </div>
          </div>

          <!-- Window reflection glare -->
          <div style="position:absolute;top:0;right:0;width:40%;height:100%;background:linear-gradient(135deg, rgba(232,220,203,0.02) 0%, transparent 60%);pointer-events:none;z-index:11;"></div>
        </div>
      `;

      const buildings = container.querySelector('#j-buildings');
      const streaks = container.querySelector('#j-streaks');
      const stars = container.querySelector('#j-stars');
      const thought = container.querySelector('#j-thought');

      this.tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            this.manager.next();
            resolve();
          }, 1500);
        }
      });

      // Parallax motion
      this.tl
        .to(buildings, { x: '-50%', duration: 7, ease: 'none' }, 0)
        .to(streaks, { x: '-50%', duration: 4.5, ease: 'none' }, 0)
        .to(stars, { x: '-15%', duration: 7, ease: 'none' }, 0)
        .to(container, { y: 2, duration: 2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0)
        .to(thought, { opacity: 1, duration: 1.5 }, 2.5)
        .to(thought, { opacity: 0, duration: 1 }, 5.5);
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
