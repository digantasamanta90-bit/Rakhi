/**
 * BEAT 06 — THE JOURNEY (REAL ANIMATED METRO CARRIAGE & PARALLAX)
 * Stylized animated Metro carriage with authentic interior architecture:
 * arched ceiling LEDs, route map, grab poles, hanging straps swaying with train inertia,
 * passenger seats, and broad panoramic window with multi-layer high-speed city parallax.
 * Dialogue: "You were waiting but I never made it till there."
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
      // 1. Procedural Distant High-Rise Skyline (Layer 2)
      const distantBuildingsCount = 28;
      let distantBuildingsHTML = '';
      for (let i = 0; i < distantBuildingsCount; i++) {
        const h = 70 + Math.random() * 80;
        const w = 26 + Math.random() * 30;
        distantBuildingsHTML += `
          <div style="flex-shrink:0;width:${w}px;height:${h}px;background:#172554;margin-right:6px;align-self:flex-end;opacity:0.6;border-top:1px solid rgba(255,255,255,0.08);"></div>
        `;
      }

      // 2. Procedural Midground City Buildings & Windows (Layer 3)
      const midBuildingsCount = 36;
      let midBuildingsHTML = '';
      for (let i = 0; i < midBuildingsCount; i++) {
        const h = 85 + Math.random() * 110;
        const w = 32 + Math.random() * 38;
        const floors = Math.floor(h / 14);
        let winRows = '';
        for (let f = 0; f < floors; f++) {
          const lit1 = Math.random() > 0.45;
          const lit2 = Math.random() > 0.45;
          winRows += `
            <div style="display:flex;justify-content:space-around;margin:3px 0;">
              <div style="width:5px;height:4px;background:${lit1 ? '#fef08a' : 'rgba(255,255,255,0.06)'};border-radius:1px;"></div>
              <div style="width:5px;height:4px;background:${lit2 ? '#fef08a' : 'rgba(255,255,255,0.06)'};border-radius:1px;"></div>
            </div>
          `;
        }
        midBuildingsHTML += `
          <div style="flex-shrink:0;width:${w}px;height:${h}px;background:#1e293b;border:1px solid rgba(255,255,255,0.12);align-self:flex-end;margin-right:8px;padding-top:4px;box-shadow:0 0 12px rgba(0,0,0,0.6);">
            ${winRows}
          </div>
        `;
      }

      // 3. Fast Foreground Tunnel Girders & Light Streaks (Layer 4)
      const girdersHTML = Array.from({ length: 16 }).map(() => `
        <div style="flex-shrink:0;width:14px;height:100%;background:linear-gradient(90deg, #334155 0%, #0f172a 100%);margin-right:120px;border-right:1px solid rgba(255,255,255,0.15);"></div>
      `).join('');

      const streaksHTML = Array.from({ length: 22 }).map(() => `
        <div style="flex-shrink:0;width:${90 + Math.random() * 130}px;height:2.5px;background:#fef08a;border-radius:2px;box-shadow:0 0 10px #fbbf24;margin-right:45px;align-self:center;"></div>
      `).join('');

      container.innerHTML = `
        <div class="metro-cinematic-stage" id="s6-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;background:#070c18;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          
          <!-- Outer Metro Train Body Frame -->
          <div class="metro-train-structure" id="m-train" style="position:relative;width:100%;max-width:420px;height:92%;background:linear-gradient(180deg, #1e293b 0%, #0f172a 100%);border-radius:20px;border:2px solid #334155;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 18px 50px rgba(0,0,0,0.9);">
            
            <!-- 1. Metro Ceiling & Route Map -->
            <div class="metro-ceiling-section" style="position:relative;width:100%;height:68px;background:linear-gradient(180deg, #334155 0%, #1e293b 100%);border-bottom:3px solid #475569;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px 16px;box-sizing:border-box;">
              <!-- LED Ceiling Recessed Light Bar -->
              <div id="m-ceiling-led" style="width:78%;height:5px;background:#ffffff;border-radius:3px;box-shadow:0 0 16px 4px rgba(255,255,255,0.85);margin-bottom:6px;"></div>
              
              <!-- Digital Route Line -->
              <div style="display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:0.62rem;color:var(--rakhi-gold);letter-spacing:0.1em;">
                <span style="color:#22c55e;">●</span><span>DEPARTURE</span>
                <span style="color:#64748b;">───</span>
                <span style="color:var(--rakhi-gold);animation:pulseGlow 1.2s infinite;">● CITY METRO</span>
                <span style="color:#64748b;">───</span>
                <span style="color:#94a3b8;">○ HOME</span>
              </div>
            </div>

            <!-- 2. Overhead Handrail & Swinging Straps -->
            <div class="metro-handrail-bar" style="position:absolute;top:70px;left:8%;right:8%;height:4px;background:#cbd5e1;border-radius:2px;z-index:25;box-shadow:0 2px 6px rgba(0,0,0,0.6);">
              <!-- Strap 1 -->
              <div class="metro-strap" id="m-strap-1" style="position:absolute;left:20%;top:0;width:12px;height:45px;transform-origin:top center;">
                <div style="width:3px;height:32px;background:#94a3b8;margin:0 auto;"></div>
                <div style="width:14px;height:14px;border:2.5px solid #fbbf24;border-radius:50%;margin:-2px auto 0 auto;"></div>
              </div>
              <!-- Strap 2 -->
              <div class="metro-strap" id="m-strap-2" style="position:absolute;left:50%;top:0;width:12px;height:45px;transform-origin:top center;">
                <div style="width:3px;height:32px;background:#94a3b8;margin:0 auto;"></div>
                <div style="width:14px;height:14px;border:2.5px solid #fbbf24;border-radius:50%;margin:-2px auto 0 auto;"></div>
              </div>
              <!-- Strap 3 -->
              <div class="metro-strap" id="m-strap-3" style="position:absolute;left:80%;top:0;width:12px;height:45px;transform-origin:top center;">
                <div style="width:3px;height:32px;background:#94a3b8;margin:0 auto;"></div>
                <div style="width:14px;height:14px;border:2.5px solid #fbbf24;border-radius:50%;margin:-2px auto 0 auto;"></div>
              </div>
            </div>

            <!-- 3. Panoramic Carriage Window (The Viewport to the World) -->
            <div class="metro-window-frame" style="position:relative;flex:1;margin:12px 14px;border-radius:12px;overflow:hidden;border:4px solid #475569;box-shadow:inset 0 0 25px rgba(0,0,0,0.85);background:#0284c7;">
              
              <!-- Sky Gradient Background (Layer 1) -->
              <div style="position:absolute;inset:0;background:linear-gradient(180deg, #0369a1 0%, #38bdf8 55%, #fed7aa 100%);"></div>

              <!-- Distant Skyline (Layer 2) -->
              <div id="m-distant-skyline" style="position:absolute;bottom:0;left:0;width:350%;height:65%;display:flex;align-items:flex-end;pointer-events:none;will-change:transform;">
                ${distantBuildingsHTML}
              </div>

              <!-- Midground Passing City (Layer 3) -->
              <div id="m-mid-city" style="position:absolute;bottom:0;left:0;width:350%;height:85%;display:flex;align-items:flex-end;pointer-events:none;will-change:transform;">
                ${midBuildingsHTML}
              </div>

              <!-- Passing Tunnel Girders (Layer 4) -->
              <div id="m-girders" style="position:absolute;inset:0;width:350%;display:flex;pointer-events:none;will-change:transform;opacity:0.65;">
                ${girdersHTML}
              </div>

              <!-- Rapid Light Streaks on Window -->
              <div id="m-streaks" style="position:absolute;bottom:25%;left:0;width:350%;height:15%;display:flex;pointer-events:none;will-change:transform;">
                ${streaksHTML}
              </div>

              <!-- Tunnel Flash Glare Overlay -->
              <div id="m-tunnel-flash" style="position:absolute;inset:0;background:#ffffff;opacity:0;pointer-events:none;mix-blend-mode:overlay;"></div>

              <!-- Glass Diagonal Reflection -->
              <div style="position:absolute;inset:0;background:linear-gradient(130deg, rgba(255,255,255,0.18) 0%, transparent 45%, rgba(254,240,138,0.08) 85%);pointer-events:none;"></div>
            </div>

            <!-- 4. Lower Carriage Walls & Passenger Seats -->
            <div class="metro-lower-carriage" style="position:relative;width:100%;height:64px;background:linear-gradient(180deg, #1e293b 0%, #0f172a 100%);border-top:3px solid #64748b;display:flex;justify-content:space-between;align-items:center;padding:0 24px;box-sizing:border-box;">
              <!-- Left Seat Silhouette -->
              <div style="width:65px;height:38px;background:#0284c7;border-radius:6px 6px 0 0;border:1px solid rgba(255,255,255,0.2);box-shadow:inset 0 4px 10px rgba(0,0,0,0.5);"></div>
              <!-- Vertical Stanchion Pole -->
              <div style="width:5px;height:100%;background:#cbd5e1;border-radius:2px;box-shadow:0 0 6px rgba(0,0,0,0.5);"></div>
              <!-- Right Seat Silhouette -->
              <div style="width:65px;height:38px;background:#0284c7;border-radius:6px 6px 0 0;border:1px solid rgba(255,255,255,0.2);box-shadow:inset 0 4px 10px rgba(0,0,0,0.5);"></div>
            </div>

          </div>

          <!-- Thought Dialogue Overlay -->
          <div style="position:absolute;bottom:16%;left:50%;transform:translateX(-50%);z-index:40;text-align:center;width:88%;max-width:340px;pointer-events:none;">
            <p class="text-dialogue" id="s6-thought" style="opacity:0;font-size:clamp(1.05rem,3.6vw,1.25rem);color:#f8fafc;text-shadow:0 3px 16px rgba(0,0,0,0.95);margin:0 auto;font-style:italic;">
              "You were waiting but I never made it till there."
            </p>
          </div>
        </div>
      `;

      const viewport = container.querySelector('#s6-viewport');
      const train = container.querySelector('#m-train');
      const distantSkyline = container.querySelector('#m-distant-skyline');
      const midCity = container.querySelector('#m-mid-city');
      const girders = container.querySelector('#m-girders');
      const streaks = container.querySelector('#m-streaks');
      const flash = container.querySelector('#m-tunnel-flash');
      const led = container.querySelector('#m-ceiling-led');
      const strap1 = container.querySelector('#m-strap-1');
      const strap2 = container.querySelector('#m-strap-2');
      const strap3 = container.querySelector('#m-strap-3');
      const thought = container.querySelector('#s6-thought');

      this.ambientTweens = [];

      // Continuous train track vibration physics
      this.ambientTweens.push(
        gsap.to(train, { y: 2.2, duration: 0.14, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      );

      // Continuous swinging strap inertia physics
      this.ambientTweens.push(
        gsap.to([strap1, strap2, strap3], {
          rotation: 6,
          duration: 1.4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          stagger: 0.15
        })
      );

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      // Metro Multi-Layer Parallax Travel Choreography
      this.tl
        // Distant Skyline moves moderately
        .to(distantSkyline, { x: '-40%', duration: 3.8, ease: 'none' }, 0)
        
        // Midground City moves fast
        .to(midCity, { x: '-55%', duration: 3.6, ease: 'none' }, 0)
        
        // Foreground Girders & Light Streaks rush past rapidly
        .to(girders, { x: '-60%', duration: 1.8, ease: 'none', repeat: 1 }, 0)
        .to(streaks, { x: '-65%', duration: 1.2, ease: 'none', repeat: 2 }, 0)
        
        // Occasional tunnel flashes & LED light flickers
        .to(flash, { opacity: 0.5, duration: 0.1, yoyo: true, repeat: 1 }, 1.0)
        .to(led, { opacity: 0.45, duration: 0.06, yoyo: true, repeat: 2 }, 1.0)
        .to(flash, { opacity: 0.4, duration: 0.1, yoyo: true, repeat: 1 }, 2.2)
        
        // Emotional dialogue reveals
        .to(thought, { opacity: 1, y: -4, duration: 0.7, ease: 'power2.out' }, 0.6)
        .to({}, { duration: 1.4 }) // let thought register
        
        // Dissolve into Broken KitKat (Scene 07)
        .to(thought, { opacity: 0, duration: 0.4 }, 2.9)
        .to(viewport, { opacity: 0, scale: 0.96, duration: 0.5, ease: 'power2.in' }, 3.3);
    });
  }

  exit() {
    if (this.ambientTweens) {
      this.ambientTweens.forEach(t => t.kill());
      this.ambientTweens = [];
    }
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


