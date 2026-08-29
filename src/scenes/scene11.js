/**
 * BEAT 11 — THE PHYSICAL GIFTS & CASE FILE 04 INVESTIGATION
 * Procedural morning market street atmosphere with shopfronts, awnings, wires, and sunlight.
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
      container.innerHTML = `
        <div class="market-street-env" id="s11-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;perspective:900px;background:linear-gradient(180deg, #1e1b4b 0%, #311e38 50%, #451a03 100%);">
          
          <!-- Morning Market Street Wire & Shop Backdrop -->
          <div class="overhead-wire-layer"></div>
          <div class="market-backdrop-city" style="opacity:0.4;position:absolute;bottom:0;left:0;right:0;display:flex;justify-content:space-around;pointer-events:none;">
            <div class="market-storefront"><div class="market-awning"></div><div class="market-shop-sign">SWEETS</div></div>
            <div class="market-storefront" style="height:130px;"><div class="market-awning" style="background:repeating-linear-gradient(90deg, #fbbf24 0px, #fbbf24 10px, #1e293b 10px, #1e293b 20px);"></div><div class="market-shop-sign">GIFTS</div></div>
            <div class="market-storefront"><div class="market-awning"></div><div class="market-shop-sign">BAKERY</div></div>
          </div>

          <!-- Section A: Main Gift Stage Container -->
          <div id="g-main-stage" style="position:relative;width:100%;max-width:360px;height:440px;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10;">
            
            <!-- Shot 1: KitKat Hero Object (Real PNG Asset) -->
            <div id="g-kitkat-view" style="position:absolute;display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(-50px) scale(0.9);z-index:10;cursor:pointer;">
              <div style="position:relative;width:190px;height:135px;display:flex;align-items:center;justify-content:center;">
                <img src="assets/gifts/kitkat.png" alt="KitKat Rich" id="g-kitkat-img" style="width:100%;height:auto;object-fit:contain;filter:drop-shadow(0 16px 32px rgba(0,0,0,0.8));" />
              </div>
              <div class="gift-label" style="font-size:1.05rem;color:var(--rakhi-gold);margin-top:6px;font-family:var(--font-serif);font-weight:700;">KitKat Rich 🍫</div>
              <div class="text-whisper" style="font-size:0.68rem;color:var(--cinema-text-muted);margin-top:2px;">THE OFFICIAL SELECTION</div>
            </div>

            <!-- Shot 2: Case File 04 Investigation Board (Tactile Parchment Dossier) -->
            <div id="g-casefile-board" style="position:absolute;width:310px;background:rgba(15,23,42,0.96);border:1px solid rgba(251,191,36,0.3);border-radius:14px;padding:18px 16px;box-shadow:0 16px 45px rgba(0,0,0,0.8);opacity:0;transform:scale(0.85);z-index:20;pointer-events:none;backdrop-filter:blur(10px);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;border-bottom:1px dashed rgba(255,255,255,0.2);padding-bottom:6px;">
                <span class="text-timestamp-sm" style="color:var(--rakhi-gold);font-size:0.68rem;">CASE FILE 04 // CHOCOLATE</span>
                <span class="text-whisper" style="font-size:0.6rem;color:#ef4444;font-weight:700;">CLASSIFIED</span>
              </div>
              
              <div style="font-size:0.78rem;color:#cbd5e1;margin-bottom:8px;line-height:1.35;font-style:italic;">
                "Selecting this was not as simple as it should've been."
              </div>

              <!-- Candidate Evaluations -->
              <div style="display:flex;flex-direction:column;gap:6px;font-size:0.75rem;">
                <div id="g-cand-1" style="display:flex;justify-content:space-between;padding:4px 8px;background:rgba(255,255,255,0.05);border-radius:4px;opacity:0;">
                  <span>Dark Chocolate 85%</span>
                  <span style="color:#ef4444;font-weight:700;">REJECTED ❌</span>
                </div>
                <div id="g-cand-2" style="display:flex;justify-content:space-between;padding:4px 8px;background:rgba(255,255,255,0.05);border-radius:4px;opacity:0;">
                  <span>Overpriced Truffles</span>
                  <span style="color:var(--rakhi-gold);font-weight:700;">SUSPICIOUS 🤔</span>
                </div>
                <div id="g-cand-3" style="display:flex;justify-content:space-between;padding:4px 8px;background:rgba(251,191,36,0.15);border-radius:4px;border:1px solid rgba(251,191,36,0.4);opacity:0;">
                  <span style="color:#ffffff;font-weight:700;">KitKat Rich</span>
                  <span style="color:#22c55e;font-weight:700;">APPROVED 🏆</span>
                </div>
              </div>

              <div id="g-case-footer" style="margin-top:10px;padding-top:6px;border-top:1px dashed rgba(255,255,255,0.2);font-size:0.68rem;color:#94a3b8;display:flex;justify-content:space-between;opacity:0;">
                <span>Consultant: <strong>Monojit</strong></span>
                <span style="color:var(--rakhi-gold);font-style:italic;">Professional Overthinker 🫡</span>
              </div>
            </div>

            <!-- Shot 3: Bellavita Fragrance Object (Real PNG Asset) -->
            <div id="g-bellavita-view" style="position:absolute;display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(50px) scale(0.9);z-index:10;cursor:pointer;">
              <div style="position:relative;width:190px;height:140px;display:flex;align-items:center;justify-content:center;">
                <img src="assets/gifts/bellavita.png" alt="Bellavita" id="g-bellavita-img" style="width:100%;height:auto;object-fit:contain;filter:drop-shadow(0 16px 32px rgba(0,0,0,0.8));" />
              </div>
              <div class="gift-label" style="font-size:1.05rem;color:var(--rakhi-gold);margin-top:6px;font-family:var(--font-serif);font-weight:700;">Bellavita Collection 🌸</div>
              <div class="text-whisper" style="font-size:0.68rem;color:var(--cinema-text-muted);margin-top:2px;">BECAUSE YOU DESERVE THE BEST</div>
            </div>

            <!-- Narrative Lines (Bottom) -->
            <div id="g-narrative-zone" style="position:absolute;bottom:15px;text-align:center;padding:0 20px;z-index:15;pointer-events:none;">
              <p id="g-line-1" class="text-dialogue" style="opacity:0;font-size:clamp(1.02rem,3.5vw,1.18rem);color:#f8fafc;margin:0;font-style:italic;">
                "I still wanted to give these to you myself."
              </p>
              <p id="g-line-2" class="text-emotional" style="opacity:0;font-size:clamp(1.08rem,3.6vw,1.25rem);color:var(--rakhi-gold);margin:4px 0 0 0;font-style:italic;">
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
      const viewport = container.querySelector('#s11-viewport');

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      this.tl
        // --- 1. KitKat Hero Entrance ---
        .to(kitkatView, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'bounce.out', delay: 0.2 })
        .to(line1, { opacity: 1, duration: 0.8 }, 0.6)
        .to({}, { duration: 1.2 })

        // --- 2. Case File 04 Investigation Reveal ---
        .to(kitkatView, { scale: 0.75, y: -60, opacity: 0.4, duration: 0.7, ease: 'power2.inOut' }, 2.4)
        .to(casefileBoard, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }, 2.5)
        // Candidate stamps
        .to(cand1, { opacity: 1, x: 0, duration: 0.4 }, 3.0)
        .to(cand2, { opacity: 1, x: 0, duration: 0.4 }, 3.4)
        .to(cand3, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.4)' }, 3.8)
        .to(caseFooter, { opacity: 1, duration: 0.6 }, 4.3)
        .to({}, { duration: 2.2 }) // let investigation breathe

        // --- 3. Case File closes -> KitKat recedes -> Bellavita emerges ---
        .to(casefileBoard, { opacity: 0, scale: 0.8, duration: 0.6, ease: 'power2.in' }, 6.8)
        .to(kitkatView, { opacity: 0, duration: 0.5 }, 6.8)
        .to(bellavitaView, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power2.out' }, 7.2)
        .to(line1, { opacity: 0, duration: 0.4 }, 7.2)
        .to(line2, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 7.6)
        .to({}, { duration: 2.6 }) // hold

        // --- 4. Transition toward Sibling Zone ---
        .to(mainStage, { opacity: 0, scale: 0.92, y: -20, duration: 1.1, ease: 'power2.inOut' }, 11.0)
        .to(viewport, { opacity: 0, duration: 0.8, ease: 'power2.in' }, 11.4);

      // Tactile physical taps
      if (kitkatView) {
        kitkatView.addEventListener('click', (e) => {
          e.stopPropagation();
          gsap.fromTo(kitkatImg, { scale: 1.15 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        });
      }

      if (bellavitaView) {
        bellavitaView.addEventListener('click', (e) => {
          e.stopPropagation();
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


