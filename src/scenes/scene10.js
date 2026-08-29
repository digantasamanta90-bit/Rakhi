/**
 * BEAT 10 — ANWESHA / MEMORIES (ANTIQUE PHOTOGRAPH MEMORY BOX)
 * One-Focal-Object Rule: Each memory photograph has its own cinematic shot.
 * Photographs develop from soft blur, take center stage with intimate line-by-line reflections,
 * and recede gracefully for the next memory.
 * Golden & crimson silk thread weaves across the final memory, seamlessly leading into Gifts (Scene 11).
 */

import { content } from '../content/content.js';

export class Scene10Memories {
  constructor({ manager, audio, particles, achievements }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.achievements = achievements;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene2;

      // Generate soft floating memory dust specks
      let dustHTML = '';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = (Math.random() * 2.5 + 1).toFixed(1);
        const opacity = (Math.random() * 0.4 + 0.15).toFixed(2);
        dustHTML += `<div style="position:absolute;top:${y}%;left:${x}%;width:${size}px;height:${size}px;border-radius:50%;background:rgba(251,191,36,${opacity});box-shadow:0 0 6px rgba(251,191,36,0.6);pointer-events:none;"></div>`;
      }

      container.innerHTML = `
        <div id="s10-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;perspective:1000px;background:radial-gradient(circle at 50% 40%, #451a03 0%, #1e1b4b 60%, #0f172a 100%);">
          
          <!-- Memory Dust Atmosphere -->
          <div style="position:absolute;inset:0;pointer-events:none;">
            ${dustHTML}
          </div>

          <!-- Central Memory Stage (One-Focal-Object) -->
          <div id="m-stage" style="position:relative;width:100%;max-width:340px;height:420px;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10;">
            
            <!-- Shot 1: First Memory (Hero Portrait) -->
            <div class="photo-memory" id="m-shot-1" style="width:165px;height:205px;position:absolute;opacity:0;filter:blur(14px);transform:scale(0.85) rotate(-3deg);z-index:5;cursor:pointer;background:var(--surface-parchment);padding:6px;box-shadow:0 14px 35px rgba(0,0,0,0.7);border-radius:4px;">
              <div class="photo-tape" style="background:rgba(220,38,38,0.7);width:52px;height:13px;top:-7px;"></div>
              <img src="assets/portraits/anwesha_hero.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;border-radius:2px;" onerror="this.src='assets/portraits/anwesha1.png';">
              <div class="photo-caption" style="font-size:0.75rem;color:var(--rakhi-red);font-weight:700;margin-top:6px;text-align:center;">Chotokhuki 🧿</div>
            </div>

            <!-- Shot 2: Second Memory (Intimate smile) -->
            <div class="photo-memory" id="m-shot-2" style="width:165px;height:205px;position:absolute;opacity:0;filter:blur(14px);transform:scale(0.85) rotate(4deg);z-index:5;cursor:pointer;background:var(--surface-parchment);padding:6px;box-shadow:0 14px 35px rgba(0,0,0,0.7);border-radius:4px;">
              <div class="photo-tape" style="background:rgba(251,191,36,0.7);width:52px;height:13px;top:-7px;"></div>
              <img src="assets/portraits/anwesha2.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;border-radius:2px;" onerror="this.src='assets/portraits/anwesha5.png';">
              <div class="photo-caption" style="font-size:0.75rem;color:var(--rakhi-gold);font-weight:700;margin-top:6px;text-align:center;">the favorite 🌸</div>
            </div>

            <!-- Shot 3: Third Memory (Radiant portrait with woven thread) -->
            <div class="photo-memory" id="m-shot-3" style="width:170px;height:215px;position:absolute;opacity:0;filter:blur(14px);transform:scale(0.85) rotate(-2deg);z-index:5;cursor:pointer;background:var(--surface-parchment);padding:6px;box-shadow:0 16px 40px rgba(0,0,0,0.8);border-radius:4px;">
              <div class="photo-tape" style="background:rgba(220,38,38,0.8);width:58px;height:14px;top:-8px;"></div>
              <img src="assets/portraits/anwesha11.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;border-radius:2px;" onerror="this.src='assets/portraits/anwesha12.png';">
              <div class="photo-caption" style="font-weight:700;color:var(--rakhi-red);font-size:0.8rem;margin-top:6px;text-align:center;">Anwesha ❤️</div>
            </div>

            <!-- Thread Weaving SVG for Shot 3 -->
            <svg id="m-thread-wrap" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:6;opacity:0;" viewBox="0 0 340 420">
              <defs>
                <linearGradient id="threadGradScene10" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#dc2626" />
                  <stop offset="50%" stop-color="#fbbf24" />
                  <stop offset="100%" stop-color="#dc2626" />
                </linearGradient>
              </defs>
              <path id="m-thread-line" d="M 30 210 Q 170 110 310 210" stroke="url(#threadGradScene10)" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="350" stroke-dashoffset="350" filter="drop-shadow(0 2px 8px rgba(220,38,38,0.6))" />
            </svg>

            <!-- Memory Reflections (Single focused line per shot) -->
            <div style="position:absolute;bottom:15px;left:0;right:0;text-align:center;padding:0 20px;pointer-events:none;z-index:10;min-height:3.8em;display:flex;align-items:center;justify-content:center;">
              <p id="m-line-1" class="text-dialogue" style="opacity:0;font-size:clamp(1.02rem,3.5vw,1.18rem);color:#f8fafc;position:absolute;margin:0;font-style:italic;">
                ${c.chosenSiblingLines[0]}
              </p>
              <p id="m-line-2" class="text-emotional" style="opacity:0;font-size:clamp(1.05rem,3.6vw,1.22rem);color:var(--rakhi-gold);position:absolute;margin:0;font-style:italic;">
                ${c.chosenSiblingLines[1]} ${c.chosenSiblingLines[2]}
              </p>
              <p id="m-line-3" class="text-whisper" style="opacity:0;font-size:0.82rem;color:var(--rakhi-gold);letter-spacing:0.18em;position:absolute;margin:0;font-weight:700;">
                WORTH MAKING RIDICULOUS WEBSITES FOR.
              </p>
            </div>
          </div>
        </div>
      `;

      const shot1 = container.querySelector('#m-shot-1');
      const shot2 = container.querySelector('#m-shot-2');
      const shot3 = container.querySelector('#m-shot-3');
      const threadWrap = container.querySelector('#m-thread-wrap');
      const threadLine = container.querySelector('#m-thread-line');
      const line1 = container.querySelector('#m-line-1');
      const line2 = container.querySelector('#m-line-2');
      const line3 = container.querySelector('#m-line-3');
      const viewport = container.querySelector('#s10-viewport');

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      this.tl
        // --- SEQUENCE SHOT 1: Chotokhuki Hero Memory ---
        .to(shot1, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.4, ease: 'power2.out', delay: 0.3 })
        .to(line1, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 0.8)
        .to({}, { duration: 2.2 }) // breathe
        // Shot 1 recedes gracefully
        .to(shot1, { opacity: 0, scale: 0.75, y: -20, filter: 'blur(8px)', duration: 0.9, ease: 'power2.in' }, 3.5)
        .to(line1, { opacity: 0, duration: 0.6 }, 3.5)

        // --- SEQUENCE SHOT 2: Chosen Sibling Memory ---
        .to(shot2, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.3, ease: 'power2.out' }, 4.3)
        .to(line2, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 4.7)
        .to({}, { duration: 2.4 }) // breathe
        // Shot 2 recedes gracefully
        .to(shot2, { opacity: 0, scale: 0.75, y: -20, filter: 'blur(8px)', duration: 0.9, ease: 'power2.in' }, 7.4)
        .to(line2, { opacity: 0, duration: 0.6 }, 7.4)

        // --- SEQUENCE SHOT 3: Radiant Memory + Thread Weaving ---
        .to(shot3, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.4, ease: 'back.out(1.2)' }, 8.2)
        .to(threadWrap, { opacity: 1, duration: 0.5 }, 8.4)
        .to(threadLine, { strokeDashoffset: 0, duration: 2.0, ease: 'power1.inOut' }, 8.4)
        .to(line3, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 8.8)
        .to({}, { duration: 2.6 }) // breathe
        // Smooth transition out into the physical gifts
        .to([shot3, threadWrap, line3], { opacity: 0, y: -20, scale: 0.9, duration: 1.2, ease: 'power2.inOut' }, 12.0)
        .to(viewport, { opacity: 0, duration: 0.8, ease: 'power2.in' }, 12.4);

      // Tactile photo tap response
      [shot1, shot2, shot3].forEach(p => {
        p.addEventListener('click', (e) => {
          e.stopPropagation();
          if (this.particles) {
            const rect = p.getBoundingClientRect();
            this.particles.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
          }
          gsap.fromTo(p, { scale: 1.08 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        });
      });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


