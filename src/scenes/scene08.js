import { content } from '../content/content.js';

export class Scene08GoingHome {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
    this.wheelTweens = [];
    this.vibrationTween = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene08;

      // 1. Procedural Distant Hills / Horizon
      let hillsSVG = `
        <svg viewBox="0 0 1200 160" preserveAspectRatio="none" style="width:100%;height:100%;">
          <path d="M 0 120 Q 150 40 300 110 T 600 80 T 900 120 T 1200 90 L 1200 160 L 0 160 Z" fill="#15803d" opacity="0.5"/>
          <path d="M 0 135 Q 200 80 400 130 T 800 100 T 1200 130 L 1200 160 L 0 160 Z" fill="#166534" opacity="0.8"/>
        </svg>
      `;

      // 2. Procedural Progressive Midground (City Buildings -> Outskirt Poles -> Village Trees & Huts)
      let environmentHTML = '';
      
      // Phase A: City (Items 0 to 8)
      for (let i = 0; i < 9; i++) {
        const h = 80 + Math.random() * 60;
        const w = 35 + Math.random() * 25;
        environmentHTML += `
          <div style="flex-shrink:0;width:${w}px;height:${h}px;background:#1e293b;border:1px solid rgba(255,255,255,0.1);margin-right:16px;align-self:flex-end;position:relative;display:flex;flex-direction:column;justify-content:space-around;padding:4px;">
            <div style="width:60%;height:4px;background:#f59e0b;opacity:0.7;margin:0 auto;"></div>
            <div style="width:60%;height:4px;background:rgba(255,255,255,0.1);margin:0 auto;"></div>
          </div>
        `;
      }

      // Phase B: Outskirts (Items 9 to 16 - Telephone Poles & Greenery)
      for (let i = 0; i < 8; i++) {
        environmentHTML += `
          <div style="flex-shrink:0;width:24px;height:120px;margin-right:40px;align-self:flex-end;position:relative;display:flex;flex-direction:column;align-items:center;">
            <div style="width:4px;height:100%;background:#78350f;"></div>
            <div style="position:absolute;top:15px;width:32px;height:3px;background:#475569;"></div>
            <div style="position:absolute;top:25px;width:24px;height:3px;background:#475569;"></div>
          </div>
        `;
      }

      // Phase C: Rural & Village (Items 17 to 30 - Trees & Thatched Huts)
      for (let i = 0; i < 14; i++) {
        const isHut = i === 3 || i === 8 || i === 12;
        if (isHut) {
          environmentHTML += `
            <div style="flex-shrink:0;width:75px;height:55px;background:#78350f;margin-right:32px;border-radius:4px;position:relative;align-self:flex-end;box-shadow:0 6px 16px rgba(0,0,0,0.4);">
              <div style="position:absolute;top:-22px;left:-8px;right:-8px;height:26px;background:#b45309;clip-path:polygon(50% 0%, 0% 100%, 100% 100%);border-radius:2px;"></div>
              <div style="position:absolute;bottom:0;left:28px;width:18px;height:28px;background:#451a03;border-radius:2px 2px 0 0;"></div>
            </div>
          `;
        } else {
          const h = 75 + Math.random() * 45;
          const w = 45 + Math.random() * 25;
          environmentHTML += `
            <div style="flex-shrink:0;width:${w}px;height:${h}px;background:radial-gradient(circle at 40% 30%, #22c55e 0%, #15803d 70%, #166534 100%);border-radius:50% 50% 15% 15%;margin-right:24px;align-self:flex-end;box-shadow:0 8px 18px rgba(0,0,0,0.35);position:relative;">
              <div style="position:absolute;bottom:-12px;left:50%;transform:translateX(-50%);width:10px;height:18px;background:#78350f;"></div>
            </div>
          `;
        }
      }

      container.innerHTML = `
        <div class="road-journey-env" id="s8-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;background:#070c18;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          
          <!-- Dynamic Sky (Shifts from Morning Cyan -> Golden Rural Sun) -->
          <div id="s8-sky" style="position:absolute;inset:0;background:linear-gradient(180deg, #0284c7 0%, #38bdf8 55%, #fef08a 100%);transition:background 2.0s ease;"></div>

          <!-- Distant Rolling Hills Layer -->
          <div id="s8-hills" style="position:absolute;bottom:30%;left:0;width:300%;height:35%;pointer-events:none;will-change:transform;">
            ${hillsSVG}
          </div>

          <!-- Progressive Midground Scenery (City -> Outskirts -> Village) -->
          <div id="s8-scenery-layer" style="position:absolute;bottom:26%;left:0;width:400%;height:45%;display:flex;align-items:flex-end;pointer-events:none;will-change:transform;">
            ${environmentHTML}
          </div>

          <!-- Road Surface Layer -->
          <div class="landscape-road" style="position:absolute;bottom:0;left:0;width:100%;height:28%;background:linear-gradient(180deg, #334155 0%, #1e293b 40%, #0f172a 100%);border-top:4px solid #64748b;">
            <!-- Dashed White Centerline -->
            <div id="s8-road-dashes" style="position:absolute;top:45%;left:0;width:300%;height:6px;display:flex;gap:35px;will-change:transform;">
              ${Array.from({ length: 32 }).map(() => `<div style="flex-shrink:0;width:55px;height:6px;background:#ffffff;border-radius:2px;box-shadow:0 0 6px rgba(255,255,255,0.8);"></div>`).join('')}
            </div>
          </div>

          <!-- Animated Realistic Vehicles -->
          <div id="s8-vehicle-stage" style="position:absolute;bottom:18%;left:22%;z-index:25;will-change:transform;">
            
            <!-- 1. Stylized Animated BUS (🚌) -->
            <div id="s8-bus-vehicle" style="display:block;filter:drop-shadow(0 14px 25px rgba(0,0,0,0.7));">
              <svg width="170" height="85" viewBox="0 0 170 85">
                <!-- Bus Body -->
                <rect x="5" y="10" width="155" height="52" rx="10" fill="#f59e0b" stroke="#b45309" stroke-width="2.5"/>
                <!-- Bus Roof Curve -->
                <path d="M 5 24 L 5 18 Q 5 10 18 10 L 145 10 Q 160 10 160 20 L 160 24 Z" fill="#fbbf24"/>
                <!-- Windscreen -->
                <rect x="135" y="18" width="20" height="26" rx="3" fill="#38bdf8" opacity="0.9"/>
                <!-- Passenger Windows -->
                <rect x="18" y="18" width="22" height="20" rx="3" fill="#e0f2fe" opacity="0.9"/>
                <rect x="46" y="18" width="22" height="20" rx="3" fill="#e0f2fe" opacity="0.9"/>
                <rect x="74" y="18" width="22" height="20" rx="3" fill="#e0f2fe" opacity="0.9"/>
                <rect x="102" y="18" width="22" height="20" rx="3" fill="#e0f2fe" opacity="0.9"/>
                <!-- Side Stripe -->
                <rect x="5" y="44" width="155" height="6" fill="#dc2626"/>
                <!-- Headlight -->
                <circle cx="158" cy="48" r="4" fill="#fef08a" filter="drop-shadow(0 0 6px #fef08a)"/>
                
                <!-- Bus Front Wheel (Origin (0,0) isolated in local group) -->
                <g transform="translate(130, 64)">
                  <g id="s8-bus-wheel-front">
                    <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#475569" stroke-width="2"/>
                    <circle cx="0" cy="0" r="5" fill="#94a3b8"/>
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" stroke-width="1.5"/>
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" stroke-width="1.5"/>
                    <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#ffffff" stroke-width="1.2"/>
                    <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#ffffff" stroke-width="1.2"/>
                  </g>
                </g>

                <!-- Bus Back Wheel (Origin (0,0) isolated in local group) -->
                <g transform="translate(42, 64)">
                  <g id="s8-bus-wheel-back">
                    <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#475569" stroke-width="2"/>
                    <circle cx="0" cy="0" r="5" fill="#94a3b8"/>
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" stroke-width="1.5"/>
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" stroke-width="1.5"/>
                    <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="#ffffff" stroke-width="1.2"/>
                    <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#ffffff" stroke-width="1.2"/>
                  </g>
                </g>
              </svg>
            </div>

            <!-- 2. Stylized Animated AUTO-RICKSHAW (🛺) -->
            <div id="s8-auto-vehicle" style="display:none;filter:drop-shadow(0 14px 25px rgba(0,0,0,0.7));">
              <svg width="135" height="85" viewBox="0 0 135 85">
                <!-- Auto Yellow Canopy Roof -->
                <path d="M 8 38 L 8 20 Q 20 8 55 10 L 95 14 Q 108 18 112 36 L 102 38 Z" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
                <!-- Auto Green Body Lower Panel -->
                <path d="M 8 38 L 108 38 L 115 56 L 98 62 L 12 62 Z" fill="#15803d" stroke="#166534" stroke-width="2"/>
                <!-- Windshield Window -->
                <path d="M 68 20 L 104 22 L 98 38 L 68 38 Z" fill="#bae6fd" opacity="0.9"/>
                <!-- Front Mudguard & Headlamp -->
                <path d="M 106 48 L 125 54 L 118 64 Z" fill="#0f172a"/>
                <circle cx="122" cy="52" r="4" fill="#fef08a" filter="drop-shadow(0 0 6px #fef08a)"/>

                <!-- Auto Rear Wheel (Origin (0,0) isolated) -->
                <g transform="translate(32, 64)">
                  <g id="s8-auto-wheel-back">
                    <circle cx="0" cy="0" r="13" fill="#0f172a" stroke="#475569" stroke-width="2"/>
                    <circle cx="0" cy="0" r="5" fill="#94a3b8"/>
                    <line x1="0" y1="-11" x2="0" y2="11" stroke="#ffffff" stroke-width="1.5"/>
                    <line x1="-11" y1="0" x2="11" y2="0" stroke="#ffffff" stroke-width="1.5"/>
                  </g>
                </g>

                <!-- Auto Front Wheel (Origin (0,0) isolated) -->
                <g transform="translate(105, 64)">
                  <g id="s8-auto-wheel-front">
                    <circle cx="0" cy="0" r="13" fill="#0f172a" stroke="#475569" stroke-width="2"/>
                    <circle cx="0" cy="0" r="5" fill="#94a3b8"/>
                    <line x1="0" y1="-11" x2="0" y2="11" stroke="#ffffff" stroke-width="1.5"/>
                    <line x1="-11" y1="0" x2="11" y2="0" stroke="#ffffff" stroke-width="1.5"/>
                  </g>
                </g>
              </svg>
            </div>

          </div>

          <!-- Journey Route Stage Badge -->
          <div id="s8-badge" style="position:absolute;top:10%;left:50%;transform:translateX(-50%);z-index:30;background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.18);padding:6px 16px;border-radius:20px;color:#f8fafc;font-family:var(--font-mono);font-size:0.72rem;letter-spacing:0.14em;font-weight:600;box-shadow:0 6px 20px rgba(0,0,0,0.5);">
            ${c.stages[0].mode} // ${c.stages[0].tag}
          </div>

          <!-- Dialogue Overlays -->
          <div style="position:absolute;top:22%;left:50%;transform:translateX(-50%);z-index:30;display:flex;flex-direction:column;align-items:center;gap:12px;padding:20px;text-align:center;width:90%;max-width:360px;pointer-events:none;">
            <div class="text-dialogue" id="gh-msg1" style="opacity:0;font-size:1.15rem;color:#f8fafc;font-style:italic;text-shadow:0 2px 14px rgba(0,0,0,0.9);">
              "The world outside slowed down."
            </div>
            <div class="text-dialogue" id="gh-msg2" style="opacity:0;font-size:1.15rem;color:#f8fafc;font-style:italic;text-shadow:0 2px 14px rgba(0,0,0,0.9);">
              "Or maybe I just stopped noticing it."
            </div>
            <div class="text-whisper" id="gh-arrival" style="opacity:0;color:var(--rakhi-gold);font-size:1.45rem;letter-spacing:0.25em;font-weight:800;text-shadow:0 0 25px rgba(251,191,36,0.75);font-family:var(--font-serif);">
              ${c.stages[3].tag}
            </div>
          </div>
        </div>
      `;

      const viewport = container.querySelector('#s8-viewport');
      const sky = container.querySelector('#s8-sky');
      const hills = container.querySelector('#s8-hills');
      const scenery = container.querySelector('#s8-scenery-layer');
      const dashes = container.querySelector('#s8-road-dashes');
      const vehicleStage = container.querySelector('#s8-vehicle-stage');
      const busVehicle = container.querySelector('#s8-bus-vehicle');
      const autoVehicle = container.querySelector('#s8-auto-vehicle');
      const badge = container.querySelector('#s8-badge');
      const msg1 = container.querySelector('#gh-msg1');
      const msg2 = container.querySelector('#gh-msg2');
      const arrival = container.querySelector('#gh-arrival');

      // Wheel continuous spinning around exact (0, 0) hub
      const wheels = [
        container.querySelector('#s8-bus-wheel-front'),
        container.querySelector('#s8-bus-wheel-back'),
        container.querySelector('#s8-auto-wheel-front'),
        container.querySelector('#s8-auto-wheel-back')
      ].filter(Boolean);

      this.wheelTweens = wheels.map(w => {
        return gsap.to(w, {
          rotation: 360,
          duration: 0.4,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%'
        });
      });

      // Vehicle continuous engine vibration and suspension bounce
      this.vibrationTween = gsap.to(vehicleStage, {
        y: 2,
        rotation: 0.6,
        duration: 0.12,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      this.tl
        // 1. Vehicle moves forward onto the road with travel inertia
        .fromTo(vehicleStage, { x: -20 }, { x: 25, duration: 4.8, ease: 'sine.inOut' }, 0)

        // 2. Scenery and road dashing high-speed parallax
        .to(dashes, { x: '-60%', duration: 0.8, ease: 'none', repeat: 5 }, 0)
        .to(hills, { x: '-35%', duration: 4.8, ease: 'none' }, 0)
        .to(scenery, { x: '-65%', duration: 4.6, ease: 'none' }, 0)
        
        // 3. First Dialogue: "The world outside slowed down."
        .to(msg1, { opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.3)
        
        // 4. Outskirts Transition: Bus transitions to Auto-Rickshaw
        .call(() => {
          gsap.to(busVehicle, {
            opacity: 0, scale: 0.85, duration: 0.2,
            onComplete: () => {
              busVehicle.style.display = 'none';
              autoVehicle.style.display = 'block';
              gsap.fromTo(autoVehicle, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(1.2)' });
              badge.textContent = `${c.stages[1].mode} // ${c.stages[1].tag}`;
            }
          });
        }, [], 1.8)
        
        // 5. Color grading shifts into rural greenery & warm sunlight
        .to(sky, {
          background: 'linear-gradient(180deg, #0284c7 0%, #7dd3fc 45%, #fef08a 100%)',
          duration: 1.2
        }, 2.0)
        
        // 6. Second Dialogue: "Or maybe I just stopped noticing it."
        .to(msg2, { opacity: 1, duration: 0.7, ease: 'power2.out' }, 2.2)
        
        // 7. Village road arrival
        .call(() => {
          badge.textContent = `${c.stages[2].mode} // ${c.stages[2].tag}`;
        }, [], 3.4)
        
        // 8. Clear dialogue and reveal HOME milestone
        .to([msg1, msg2, badge], { opacity: 0, duration: 0.4 }, 3.6)
        .to(arrival, { opacity: 1, scale: 1.05, duration: 0.6, ease: 'power2.out' }, 3.8)
        .to({}, { duration: 0.9 })
        
        // 9. Dissolve directly into Scene 09 (The Ceiling)
        .to(viewport, { opacity: 0, scale: 0.96, duration: 0.5, ease: 'power2.in' }, 4.7);
    });
  }

  exit() {
    if (this.wheelTweens) {
      this.wheelTweens.forEach(t => t.kill());
      this.wheelTweens = [];
    }
    if (this.vibrationTween) {
      this.vibrationTween.kill();
      this.vibrationTween = null;
    }
    if (this.tl) {
      this.tl.kill();
      this.tl = null;
    }
    return Promise.resolve();
  }
}
