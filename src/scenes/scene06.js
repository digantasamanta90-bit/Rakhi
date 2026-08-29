/**
 * BEAT 06 — THE JOURNEY (REAL ANIMATED METRO CARRIAGE)
 * Stylized animated Metro carriage interior with panoramic window view of passing city,
 * ceiling LED lights, handrails, straps, tunnel light flashes, and carriage sway.
 * Dialogue: "You were waiting but I never made it till there."
 * Background music score continues seamlessly.
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
      // Procedural City Skyline (Outside Window)
      const buildingCount = 32;
      let buildingsHTML = '';
      for (let i = 0; i < buildingCount; i++) {
        const h = 55 + Math.random() * 95;
        const w = 22 + Math.random() * 32;
        const windowCount = Math.floor(h / 12);
        let windows = '';
        for (let j = 0; j < windowCount; j++) {
          const lit = Math.random() > 0.5;
          windows += `<div style="width:4px;height:3px;background:${lit ? '#f59e0b' : 'rgba(255,255,255,0.05)'};margin:2px auto;border-radius:1px;"></div>`;
        }
        buildingsHTML += `
          <div style="flex-shrink:0;width:${w}px;height:${h}px;background:#1e293b;border:1px solid rgba(255,255,255,0.08);align-self:flex-end;margin-right:4px;display:flex;flex-direction:column;padding-top:4px;box-shadow:0 0 10px rgba(0,0,0,0.5);">
            ${windows}
          </div>
        `;
      }

      container.innerHTML = `
        <div class="metro-carriage-env" id="s6-viewport">
          
          <!-- Outside Window Panoramic View -->
          <div class="metro-window-viewport" id="s6-window">
            <!-- Sky Gradient (Morning Horizon) -->
            <div style="position:absolute;inset:0;background:linear-gradient(180deg, #0369a1 0%, #38bdf8 60%, #fdba74 100%);"></div>

            <!-- Distant City Silhouette -->
            <div id="m-skyline" class="metro-city-skyline" style="display:flex;align-items:flex-end;width:300%;height:100%;">
              ${buildingsHTML}
            </div>

            <!-- Rapid Light Streaks on Window -->
            <div id="m-streaks" style="position:absolute;bottom:15%;left:0;width:300%;height:10%;display:flex;gap:35px;pointer-events:none;">
              ${Array.from({ length: 18 }).map(() => `
                <div style="flex-shrink:0;width:${80 + Math.random() * 120}px;height:2.5px;background:rgba(254,240,138,0.7);border-radius:1px;align-self:center;box-shadow:0 0 8px #fef08a;"></div>
              `).join('')}
            </div>

            <!-- Tunnel Flash Overlay -->
            <div id="m-flash" style="position:absolute;inset:0;background:#ffffff;opacity:0;pointer-events:none;mix-blend-mode:overlay;"></div>

            <!-- Glass Reflection Glare -->
            <div style="position:absolute;inset:0;background:linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%, rgba(254,240,138,0.06) 80%);pointer-events:none;"></div>
          </div>

          <!-- Metro Carriage Interior Foreground -->
          <div class="metro-carriage-interior" id="s6-interior">
            <!-- Ceiling Panel with Lights -->
            <div class="metro-ceiling-light"></div>

            <!-- Handrails and Straps -->
            <div class="metro-handrail-top"></div>
            <div class="metro-strap" style="left:20%;"></div>
            <div class="metro-strap" style="left:50%;"></div>
            <div class="metro-strap" style="left:80%;"></div>

            <!-- Metro Carriage Doors & Floor -->
            <div style="position:absolute;bottom:0;left:0;width:100%;height:22%;background:linear-gradient(180deg, #1e293b 0%, #0f172a 100%);border-top:3px solid #64748b;"></div>
          </div>

          <!-- Thought Dialogue in Metro -->
          <div style="position:absolute;bottom:24%;left:50%;transform:translateX(-50%);z-index:20;text-align:center;width:88%;max-width:320px;">
            <p class="text-dialogue" id="s6-thought" style="opacity:0;font-size:clamp(1.02rem,3.5vw,1.22rem);color:#f8fafc;text-shadow:0 2px 14px rgba(0,0,0,0.9);margin:0 auto;font-style:italic;">
              "You were waiting but I never made it till there."
            </p>
          </div>
        </div>
      `;

      const viewport = container.querySelector('#s6-viewport');
      const skyline = container.querySelector('#m-skyline');
      const streaks = container.querySelector('#m-streaks');
      const flash = container.querySelector('#m-flash');
      const thought = container.querySelector('#s6-thought');

      // Continuous BGM score
      try {
        this.audio.startMusic(1.5);
      } catch (e) {}

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      // Metro Parallax Motion & Carriage Sway
      this.tl
        .to(skyline, { x: '-60%', duration: 7.5, ease: 'none' }, 0)
        .to(streaks, { x: '-60%', duration: 2.8, ease: 'none' }, 0)
        
        // Carriage gentle rhythmic sway
        .to(viewport, { y: 2.5, rotation: 0.3, duration: 1.6, yoyo: true, repeat: 4, ease: 'sine.inOut' }, 0)
        
        // Occasional tunnel light flash
        .to(flash, { opacity: 0.5, duration: 0.15, yoyo: true, repeat: 1 }, 2.0)
        .to(flash, { opacity: 0.35, duration: 0.15, yoyo: true, repeat: 1 }, 4.5)
        
        // Reflection thought reveals
        .to(thought, { opacity: 1, y: -6, duration: 1.4, ease: 'power2.out' }, 1.8)
        .to({}, { duration: 2.6 }) // let thought sink in
        .to(thought, { opacity: 0, duration: 0.9 }, 5.8)
        .to(viewport, { opacity: 0, duration: 0.8, ease: 'power2.in' }, 6.8);
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


