/**
 * BEAT 10 — ANWESHA / MEMORIES
 * Enforces the One-Focal-Object Rule: Each memory photograph has its own cinematic shot.
 * Photographs develop from soft blur, take center stage with intimate line-by-line reflections,
 * and recede gracefully for the next memory.
 * Thread weaves across the final memory, seamlessly leading into Scene 11.
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

      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;perspective:1000px;">
          <!-- Ambient warm memory atmosphere -->
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%, rgba(200,130,148,0.1) 0%, rgba(200,162,72,0.05) 45%, rgba(10,6,8,0.98) 85%);pointer-events:none;"></div>

          <!-- Central Memory Stage (One-Focal-Object) -->
          <div id="m-stage" style="position:relative;width:100%;max-width:340px;height:420px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
            
            <!-- Shot 1: First Memory (Hero Portrait) -->
            <div class="photo-memory" id="m-shot-1" style="width:160px;height:200px;position:absolute;opacity:0;filter:blur(14px);transform:scale(0.85) rotate(-3deg);z-index:5;cursor:pointer;">
              <div class="photo-tape" style="background:rgba(228,181,192,0.6);width:50px;height:12px;top:-7px;"></div>
              <img src="assets/portraits/anwesha_hero.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha1.png';">
              <div class="photo-caption" style="font-size:0.68rem;color:var(--cinema-red,#a63d57);font-weight:600;margin-top:3px;">Chotokhuki 🧿</div>
            </div>

            <!-- Shot 2: Second Memory (Intimate smile) -->
            <div class="photo-memory" id="m-shot-2" style="width:160px;height:200px;position:absolute;opacity:0;filter:blur(14px);transform:scale(0.85) rotate(4deg);z-index:5;cursor:pointer;">
              <div class="photo-tape" style="background:rgba(200,162,72,0.55);width:50px;height:12px;top:-7px;"></div>
              <img src="assets/portraits/anwesha2.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha5.png';">
              <div class="photo-caption" style="font-size:0.68rem;color:var(--cinema-accent);margin-top:3px;">the favorite 🌸</div>
            </div>

            <!-- Shot 3: Third Memory (Radiant portrait with woven thread) -->
            <div class="photo-memory" id="m-shot-3" style="width:165px;height:210px;position:absolute;opacity:0;filter:blur(14px);transform:scale(0.85) rotate(-2deg);z-index:5;cursor:pointer;box-shadow:0 12px 35px rgba(0,0,0,0.65);">
              <div class="photo-tape" style="background:rgba(200,130,148,0.7);width:55px;height:14px;top:-8px;"></div>
              <img src="assets/portraits/anwesha11.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha12.png';">
              <div class="photo-caption" style="font-weight:600;color:var(--cinema-gold);font-size:0.72rem;margin-top:3px;">Anwesha ❤️</div>
            </div>

            <!-- Thread Weaving SVG for Shot 3 -->
            <svg id="m-thread-wrap" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:6;opacity:0;" viewBox="0 0 340 420">
              <path id="m-thread-line" d="M 40 210 Q 170 120 300 210" stroke="url(#threadGrad)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="350" stroke-dashoffset="350" />
            </svg>

            <!-- Memory Reflections (Single focused line per shot) -->
            <div style="position:absolute;bottom:20px;left:0;right:0;text-align:center;padding:0 20px;pointer-events:none;z-index:10;min-height:3.5em;display:flex;align-items:center;justify-content:center;">
              <p id="m-line-1" class="text-dialogue" style="opacity:0;font-size:clamp(0.92rem,3.4vw,1.1rem);color:var(--cinema-text);position:absolute;">
                ${c.chosenSiblingLines[0]}
              </p>
              <p id="m-line-2" class="text-emotional" style="opacity:0;font-size:clamp(0.98rem,3.6vw,1.16rem);color:var(--cinema-accent);position:absolute;">
                ${c.chosenSiblingLines[1]} ${c.chosenSiblingLines[2]}
              </p>
              <p id="m-line-3" class="text-whisper" style="opacity:0;font-size:0.75rem;color:var(--cinema-gold);letter-spacing:0.12em;position:absolute;">
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

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      this.tl
        // --- SEQUENCE SHOT 1: Chotokhuki Hero Memory ---
        .to(shot1, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.4, ease: 'power2.out', delay: 0.3 })
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} }, [], 0.6)
        .to(line1, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 0.8)
        .to({}, { duration: 2.2 }) // breathe
        // Shot 1 recedes gracefully
        .to(shot1, { opacity: 0, scale: 0.75, y: -20, filter: 'blur(8px)', duration: 0.9, ease: 'power2.in' }, 3.5)
        .to(line1, { opacity: 0, duration: 0.6 }, 3.5)

        // --- SEQUENCE SHOT 2: Chosen Sibling Memory ---
        .to(shot2, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.3, ease: 'power2.out' }, 4.3)
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} }, [], 4.5)
        .to(line2, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 4.7)
        .to({}, { duration: 2.4 }) // breathe
        // Shot 2 recedes gracefully
        .to(shot2, { opacity: 0, scale: 0.75, y: -20, filter: 'blur(8px)', duration: 0.9, ease: 'power2.in' }, 7.4)
        .to(line2, { opacity: 0, duration: 0.6 }, 7.4)

        // --- SEQUENCE SHOT 3: Radiant Memory + Thread Weaving ---
        .to(shot3, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.4, ease: 'back.out(1.2)' }, 8.2)
        .to(threadWrap, { opacity: 1, duration: 0.5 }, 8.4)
        .to(threadLine, { strokeDashoffset: 0, duration: 2.0, ease: 'power1.inOut' }, 8.4)
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} }, [], 8.6)
        .to(line3, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 8.8)
        .to({}, { duration: 2.6 }) // breathe
        // Smooth transition out into the physical gifts
        .to([shot3, threadWrap, line3], { opacity: 0, y: -20, scale: 0.9, duration: 1.2, ease: 'power2.inOut' }, 12.0);

      // Tactile photo tap response
      [shot1, shot2, shot3].forEach(p => {
        p.addEventListener('click', (e) => {
          e.stopPropagation();
          try { this.audio.playSparkleSfx(); } catch(e) {}
          if (this.particles) {
            const rect = p.getBoundingClientRect();
            this.particles.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
          }
          gsap.fromTo(p, { scale: 1.1 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        });
      });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
