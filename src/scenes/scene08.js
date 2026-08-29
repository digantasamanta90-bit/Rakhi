/**
 * BEAT 08 — GOING HOME (BUS + AUTO LANDSCAPE JOURNEY)
 * Animated vehicles traveling through continuously transforming terrain:
 * BUS (🚌) → AUTO (🛺) → City → Outskirts → Lush Greenery & Ponds → Village → HOME.
 * Multi-layer parallax (distant hills, green trees, village huts, dashed road).
 * Dialogue: "The world outside slowed down." → "Or maybe I just stopped noticing it." → "HOME".
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
      // Procedural trees and village huts
      let treesHTML = '';
      for (let i = 0; i < 24; i++) {
        const isHut = i === 6 || i === 15;
        if (isHut) {
          treesHTML += `
            <div style="flex-shrink:0;width:55px;height:45px;background:#78350f;margin-right:24px;border-radius:3px;position:relative;align-self:flex-end;">
              <div style="position:absolute;top:-16px;left:-6px;right:-6px;height:20px;background:#b45309;clip-path:polygon(50% 0%, 0% 100%, 100% 100%);"></div>
            </div>
          `;
        } else {
          const h = 45 + Math.random() * 30;
          const w = 26 + Math.random() * 16;
          treesHTML += `
            <div style="flex-shrink:0;width:${w}px;height:${h}px;background:#15803d;border-radius:50% 50% 10% 10%;margin-right:16px;align-self:flex-end;box-shadow:0 4px 10px rgba(0,0,0,0.3);"></div>
          `;
        }
      }

      container.innerHTML = `
        <div class="road-landscape-env" id="s8-viewport">
          
          <!-- Sky Layer -->
          <div class="landscape-sky" id="s8-sky"></div>

          <!-- Distant Rolling Hills Layer -->
          <div class="landscape-hills" id="s8-hills"></div>

          <!-- Middle Greenery & Village Layer -->
          <div id="s8-trees-layer" style="position:absolute;bottom:32%;left:0;width:300%;height:35%;display:flex;align-items:flex-end;pointer-events:none;will-change:transform;">
            ${treesHTML}
          </div>

          <!-- Road Surface Layer -->
          <div class="landscape-road">
            <div class="road-dashes"></div>
          </div>

          <!-- Animated Vehicle (Bus -> Auto) -->
          <div id="s8-vehicle-wrap" style="position:absolute;bottom:22%;left:25%;z-index:15;transform:scale(1);">
            <!-- Bus SVG -->
            <div id="s8-bus-svg" style="display:block;">
              <svg width="120" height="60" viewBox="0 0 120 60">
                <rect x="5" y="10" width="105" height="38" rx="8" fill="#f59e0b" stroke="#78350f" stroke-width="2"/>
                <rect x="15" y="16" width="20" height="15" rx="3" fill="#bae6fd"/>
                <rect x="42" y="16" width="20" height="15" rx="3" fill="#bae6fd"/>
                <rect x="70" y="16" width="20" height="15" rx="3" fill="#bae6fd"/>
                <rect x="96" y="16" width="10" height="22" rx="2" fill="#bae6fd"/>
                <!-- Wheels -->
                <circle cx="28" cy="48" r="9" fill="#1e293b"/>
                <circle cx="28" cy="48" r="4" fill="#94a3b8"/>
                <circle cx="86" cy="48" r="9" fill="#1e293b"/>
                <circle cx="86" cy="48" r="4" fill="#94a3b8"/>
              </svg>
            </div>

            <!-- Auto-Rickshaw SVG -->
            <div id="s8-auto-svg" style="display:none;">
              <svg width="90" height="60" viewBox="0 0 90 60">
                <path d="M 10 42 L 10 20 Q 25 8 50 10 L 75 14 L 82 35 L 75 44 Z" fill="#15803d" stroke="#166534" stroke-width="2"/>
                <rect x="10" y="10" width="55" height="14" rx="4" fill="#fef08a"/>
                <rect x="25" y="18" width="30" height="16" rx="2" fill="#bae6fd"/>
                <!-- Wheels -->
                <circle cx="22" cy="48" r="8" fill="#1e293b"/>
                <circle cx="22" cy="48" r="3" fill="#94a3b8"/>
                <circle cx="68" cy="48" r="8" fill="#1e293b"/>
                <circle cx="68" cy="48" r="3" fill="#94a3b8"/>
              </svg>
            </div>
          </div>

          <!-- Vehicle Route Tag -->
          <div id="s8-badge" style="position:absolute;top:8%;left:50%;transform:translateX(-50%);z-index:20;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.2);padding:6px 14px;border-radius:20px;color:var(--rakhi-gold);font-family:var(--font-mono);font-size:0.75rem;letter-spacing:0.1em;box-shadow:0 6px 18px rgba(0,0,0,0.4);">
            BUS // DEPARTING CITY
          </div>

          <!-- Cinematic Dialogue Overlay -->
          <div style="position:absolute;top:22%;left:50%;transform:translateX(-50%);z-index:20;display:flex;flex-direction:column;align-items:center;gap:14px;padding:20px;text-align:center;width:90%;max-width:340px;">
            <div class="text-dialogue" id="gh-msg1" style="opacity:0;font-size:1.18rem;color:#f8fafc;font-style:italic;text-shadow:0 2px 12px rgba(0,0,0,0.8);">
              "The world outside slowed down."
            </div>
            <div class="text-dialogue" id="gh-msg2" style="opacity:0;font-size:1.18rem;color:#cbd5e1;font-style:italic;text-shadow:0 2px 12px rgba(0,0,0,0.8);">
              "Or maybe I just stopped noticing it."
            </div>
            <div class="text-whisper" id="gh-arrival" style="opacity:0;color:var(--rakhi-gold);font-size:1.2rem;letter-spacing:0.25em;font-weight:700;text-shadow:0 0 20px rgba(251,191,36,0.6);">
              HOME 🏡
            </div>
          </div>
        </div>
      `;

      const viewport = container.querySelector('#s8-viewport');
      const sky = container.querySelector('#s8-sky');
      const hills = container.querySelector('#s8-hills');
      const trees = container.querySelector('#s8-trees-layer');
      const vehicleWrap = container.querySelector('#s8-vehicle-wrap');
      const busSvg = container.querySelector('#s8-bus-svg');
      const autoSvg = container.querySelector('#s8-auto-svg');
      const badge = container.querySelector('#s8-badge');
      const msg1 = container.querySelector('#gh-msg1');
      const msg2 = container.querySelector('#gh-msg2');
      const arrival = container.querySelector('#gh-arrival');

      // Vehicle continuous engine vibration
      gsap.to(vehicleWrap, { y: 2, duration: 0.12, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      this.tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            this.manager.next();
            resolve();
          }, 1800);
        }
      });

      this.tl
        // 1. Scenery scrolling
        .to(hills, { x: '-35%', duration: 8.0, ease: 'none' }, 0)
        .to(trees, { x: '-60%', duration: 7.0, ease: 'none' }, 0)
        
        // 2. Dialogue 1
        .to(msg1, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.8)
        
        // 3. Vehicle transitions from Bus to Auto in outskirts
        .call(() => {
          busSvg.style.display = 'none';
          autoSvg.style.display = 'block';
          badge.textContent = 'AUTO // GREEN OUTSKIRTS';
        }, [], 2.6)
        
        // 4. Color grading shifts into lush rural greens & warm sunlight
        .to(sky, {
          background: 'linear-gradient(180deg, #0284c7 0%, #7dd3fc 50%, #fef08a 100%)',
          duration: 1.5
        }, 2.8)
        .to(msg2, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 3.2)
        
        // 5. Village road arrival
        .call(() => {
          badge.textContent = 'VILLAGE ROAD';
        }, [], 4.6)
        
        // 6. Dialogue clears for arrival
        .to([msg1, msg2, badge], { opacity: 0, duration: 0.8 }, 5.2)
        .to(arrival, { opacity: 1, scale: 1.1, duration: 1.2, ease: 'power2.out' }, 5.8)
        .to({}, { duration: 1.2 })
        
        // 7. Dissolve toward Bedroom / Ceiling (Scene 09)
        .to(viewport, { opacity: 0, duration: 1.0, ease: 'power2.in' }, 7.2);
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


