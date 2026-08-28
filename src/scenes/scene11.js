/**
 * BEAT 11 — THE PHYSICAL GIFTS & CASE FILE 04 INVESTIGATION
 * 1. KitKat Rich PNG descends with physical weight.
 * 2. Animated mini-cinematic investigation: Case File 04, candidates rejected,
 *    KitKat Rich approved, Monojit consultation on record.
 * 3. Bellavita fragrance box slides in with warm lighting sweep.
 * 4. "I still wanted to give these to you myself. So here they are."
 * 5. Seamless transition into the Sibling Zone.
 */

import { content } from '../content/content.js';

export class Scene11Gifts {
  constructor({ manager, audio, particles, achievements }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.achievements = achievements;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene4;

      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;perspective:900px;">
          <!-- Ambient warm stage backdrop -->
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 35%, rgba(200,162,72,0.1) 0%, rgba(92,61,46,0.1) 45%, rgba(10,6,8,0.98) 85%);pointer-events:none;"></div>

          <!-- Section A: Main Gift Stage Container -->
          <div id="g-main-stage" style="position:relative;width:100%;max-width:360px;height:440px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
            
            <!-- Shot 1: KitKat Hero Object -->
            <div id="g-kitkat-view" style="position:absolute;display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(-50px) scale(0.9);z-index:10;cursor:pointer;">
              <div style="position:relative;width:170px;height:125px;display:flex;align-items:center;justify-content:center;">
                <img src="assets/gifts/kitkat.png" alt="KitKat Rich" id="g-kitkat-img" style="width:100%;height:auto;object-fit:contain;filter:drop-shadow(0 14px 25px rgba(0,0,0,0.7));" />
              </div>
              <div class="gift-label" style="font-size:0.95rem;color:var(--cinema-accent);margin-top:6px;">KitKat Rich 🍫</div>
              <div class="text-whisper" style="font-size:0.65rem;color:var(--cinema-text-subtle);margin-top:2px;">THE OFFICIAL SELECTION</div>
            </div>

            <!-- Shot 2: Case File 04 Investigation Board -->
            <div id="g-casefile-board" style="position:absolute;width:300px;background:rgba(26,18,22,0.95);border:1px solid var(--cinema-border);border-radius:12px;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,0.6);opacity:0;transform:scale(0.85);z-index:20;pointer-events:none;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;border-bottom:1px dashed var(--cinema-border);padding-bottom:6px;">
                <span class="text-timestamp-sm" style="color:var(--cinema-gold);font-size:0.65rem;">CASE FILE 04 // CHOCOLATE</span>
                <span class="text-whisper" style="font-size:0.58rem;color:#e06c75;">CLASSIFIED</span>
              </div>
              
              <div style="font-size:0.75rem;color:var(--cinema-text-muted);margin-bottom:8px;line-height:1.35;">
                "Selecting this was not as simple as it should've been."
              </div>

              <!-- Candidate Evaluations -->
              <div style="display:flex;flex-direction:column;gap:5px;font-size:0.72rem;">
                <div id="g-cand-1" style="display:flex;justify-content:space-between;padding:3px 6px;background:rgba(250,245,238,0.03);border-radius:4px;opacity:0;">
                  <span>Dark Chocolate 85%</span>
                  <span style="color:#e06c75;font-weight:700;">REJECTED ❌</span>
                </div>
                <div id="g-cand-2" style="display:flex;justify-content:space-between;padding:3px 6px;background:rgba(250,245,238,0.03);border-radius:4px;opacity:0;">
                  <span>Overpriced Truffles</span>
                  <span style="color:var(--cinema-gold);font-weight:700;">SUSPICIOUS 🤔</span>
                </div>
                <div id="g-cand-3" style="display:flex;justify-content:space-between;padding:3px 6px;background:rgba(200,130,148,0.1);border-radius:4px;border:1px solid var(--cinema-accent);opacity:0;">
                  <span style="color:var(--cinema-text);font-weight:600;">KitKat Rich</span>
                  <span style="color:#3d8b59;font-weight:700;">APPROVED 🏆</span>
                </div>
              </div>

              <div id="g-case-footer" style="margin-top:10px;padding-top:6px;border-top:1px dashed var(--cinema-border);font-size:0.65rem;color:var(--cinema-text-subtle);display:flex;justify-content:space-between;opacity:0;">
                <span>Consultant: <strong>Monojit</strong></span>
                <span style="color:var(--cinema-accent);font-style:italic;">Professional Overthinker 🫡</span>
              </div>
            </div>

            <!-- Shot 3: Bellavita Fragrance Object -->
            <div id="g-bellavita-view" style="position:absolute;display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(50px) scale(0.9);z-index:10;cursor:pointer;">
              <div style="position:relative;width:170px;height:130px;display:flex;align-items:center;justify-content:center;">
                <img src="assets/gifts/bellavita.png" alt="Bellavita" id="g-bellavita-img" style="width:100%;height:auto;object-fit:contain;filter:drop-shadow(0 14px 25px rgba(0,0,0,0.7));" />
              </div>
              <div class="gift-label" style="font-size:0.95rem;color:var(--cinema-gold);margin-top:6px;">Bellavita Collection 🌸</div>
              <div class="text-whisper" style="font-size:0.65rem;color:var(--cinema-text-subtle);margin-top:2px;">BECAUSE YOU DESERVE THE BEST</div>
            </div>

            <!-- Narrative Lines (Bottom) -->
            <div id="g-narrative-zone" style="position:absolute;bottom:20px;text-align:center;padding:0 20px;z-index:15;pointer-events:none;">
              <p id="g-line-1" class="text-dialogue" style="opacity:0;font-size:clamp(0.92rem,3.4vw,1.1rem);color:var(--cinema-text);">
                "I still wanted to give these to you myself."
              </p>
              <p id="g-line-2" class="text-emotional" style="opacity:0;font-size:clamp(1rem,3.6vw,1.18rem);color:var(--cinema-accent);margin-top:4px;">
                "So here they are."
              </p>
            </div>
          </div>
        </div>
      `;

      const kitkatView = container.querySelector('#g-kitkat-view');
      const kitkatImg = container.querySelector('#g-kitkat-img');
      const casefileBoard = container.querySelector('#g-casefile-board');
      const cand1 = container.querySelector('#g-cand-1');
      const cand2 = container.querySelector('#g-cand-2');
      const cand3 = container.querySelector('#g-cand-3');
      const caseFooter = container.querySelector('#g-case-footer');
      const bellavitaView = container.querySelector('#g-bellavita-view');
      const bellavitaImg = container.querySelector('#g-bellavita-img');
      const line1 = container.querySelector('#g-line-1');
      const line2 = container.querySelector('#g-line-2');
      const mainStage = container.querySelector('#g-main-stage');

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      this.tl
        // --- 1. KitKat Hero Entrance ---
        .to(kitkatView, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'bounce.out', delay: 0.2 })
        .call(() => { try { this.audio.playChime(320, 0.15); } catch(e) {} }, [], 0.3)
        .to(line1, { opacity: 1, duration: 0.8 }, 0.6)
        .to({}, { duration: 1.2 })

        // --- 2. Case File 04 Investigation Reveal ---
        .to(kitkatView, { scale: 0.75, y: -60, opacity: 0.4, duration: 0.7, ease: 'power2.inOut' }, 2.4)
        .to(casefileBoard, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }, 2.5)
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} }, [], 2.6)
        // Candidate stamps
        .to(cand1, { opacity: 1, x: 0, duration: 0.4 }, 3.0)
        .to(cand2, { opacity: 1, x: 0, duration: 0.4 }, 3.4)
        .to(cand3, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.4)' }, 3.8)
        .call(() => { try { this.audio.playChime(523, 0.2); } catch(e) {} }, [], 3.9)
        .to(caseFooter, { opacity: 1, duration: 0.6 }, 4.3)
        .to({}, { duration: 2.2 }) // let investigation breathe

        // --- 3. Case File closes -> KitKat recedes -> Bellavita emerges ---
        .to(casefileBoard, { opacity: 0, scale: 0.8, duration: 0.6, ease: 'power2.in' }, 6.8)
        .to(kitkatView, { opacity: 0, duration: 0.5 }, 6.8)
        .to(bellavitaView, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power2.out' }, 7.2)
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} }, [], 7.4)
        .to(line1, { opacity: 0, duration: 0.4 }, 7.2)
        .to(line2, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 7.6)
        .to({}, { duration: 2.6 }) // hold

        // --- 4. Transition toward Sibling Zone ---
        .to(mainStage, { opacity: 0, scale: 0.92, y: -20, duration: 1.1, ease: 'power2.inOut' }, 11.0);

      // Tactile physical taps
      if (kitkatView) {
        kitkatView.addEventListener('click', (e) => {
          e.stopPropagation();
          try { this.audio.playSparkleSfx(); } catch(e) {}
          gsap.fromTo(kitkatImg, { scale: 1.15 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        });
      }

      if (bellavitaView) {
        bellavitaView.addEventListener('click', (e) => {
          e.stopPropagation();
          try { this.audio.playSparkleSfx(); } catch(e) {}
          gsap.fromTo(bellavitaImg, { scale: 1.15 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        });
      }
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
