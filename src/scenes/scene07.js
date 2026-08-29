/**
 * BEAT 07 — THE BROKEN KITKAT (COMIC TRAGEDY)
 * Spotlight hero presentation of KitKat Rich.
 * Slow-motion rotation → sudden slip/fall → CRACK impact → silence → comedic reveal.
 * "Of all the things."
 */

export class Scene07BrokenKitkat {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      container.innerHTML = `
        <div id="s7-viewport" style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle at 50% 40%, #070c18 0%, #0f172a 65%, #020617 100%);">
          
          <!-- Golden Spotlight Cone -->
          <div style="position:absolute;top:-10%;left:50%;transform:translateX(-50%);width:280px;height:360px;background:radial-gradient(ellipse at 50% 0%, rgba(254,240,138,0.18) 0%, transparent 70%);pointer-events:none;filter:blur(16px);"></div>

          <!-- Staged KitKat Presentation Area -->
          <div id="kitkat-stage" style="position:relative;width:260px;height:160px;display:flex;align-items:center;justify-content:center;z-index:10;">
            
            <!-- Whole KitKat (Real PNG Asset) -->
            <div id="kitkat-whole-wrap" style="position:relative;width:210px;height:130px;display:flex;align-items:center;justify-content:center;">
              <img src="assets/gifts/kitkat.png" id="kitkat-whole-img" alt="KitKat Rich" style="width:100%;height:auto;object-fit:contain;filter:drop-shadow(0 14px 30px rgba(0,0,0,0.85));" />
            </div>

            <!-- Broken KitKat Pieces (Real PNG Asset with precise fracture clipping) -->
            <div id="kitkat-broken-wrap" style="display:none;position:relative;width:230px;height:140px;">
              <!-- Left piece -->
              <div id="kitkat-piece-left" style="position:absolute;left:0;top:0;width:120px;height:140px;overflow:hidden;">
                <img src="assets/gifts/kitkat.png" alt="KitKat Left" style="width:210px;height:auto;object-fit:contain;filter:drop-shadow(0 12px 24px rgba(0,0,0,0.85));position:absolute;left:0;top:8px;clip-path:polygon(0 0, 53% 0, 43% 100%, 0 100%);" />
              </div>
              <!-- Right piece -->
              <div id="kitkat-piece-right" style="position:absolute;right:0;top:0;width:120px;height:140px;overflow:hidden;">
                <img src="assets/gifts/kitkat.png" alt="KitKat Right" style="width:210px;height:auto;object-fit:contain;filter:drop-shadow(0 12px 24px rgba(0,0,0,0.85));position:absolute;right:0;top:8px;clip-path:polygon(43% 0, 100% 0, 100% 100%, 53% 100%);" />
              </div>
            </div>
          </div>

          <!-- Impact Typography -->
          <div class="text-impact" id="crack-text" style="opacity:0;color:#ef4444;font-size:clamp(2.4rem,10vw,4.2rem);letter-spacing:0.16em;margin-top:16px;z-index:10;text-shadow:0 0 25px rgba(239,68,68,0.7);">
            BROKE
          </div>

          <!-- Comedic Deadpan Dialogue -->
          <div class="text-dialogue" id="kitkat-msg" style="opacity:0;margin-top:12px;font-size:1.18rem;color:#f8fafc;z-index:10;font-style:italic;">
            "Of all the things."
          </div>
        </div>
      `;

      const viewport = container.querySelector('#s7-viewport');
      const wholeWrap = container.querySelector('#kitkat-whole-wrap');
      const wholeImg = container.querySelector('#kitkat-whole-img');
      const brokenWrap = container.querySelector('#kitkat-broken-wrap');
      const pieceLeft = container.querySelector('#kitkat-piece-left');
      const pieceRight = container.querySelector('#kitkat-piece-right');
      const crackText = container.querySelector('#crack-text');
      const msg = container.querySelector('#kitkat-msg');

      this.tl = gsap.timeline({
        onComplete: () => {
          gsap.set(viewport, { clearProps: 'x,y,transform' });
          this.manager.next();
          resolve();
        }
      });

      this.tl
        // 1. Hero presentation floating gently in spotlight
        .fromTo(wholeImg, 
          { opacity: 0, scale: 0.85, y: -20 }, 
          { opacity: 1, scale: 1, y: -10, duration: 0.6, ease: 'back.out(1.2)' }, 
          0.1
        )
        .to(wholeImg, { y: -15, rotation: 2, duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: 1 })
        
        // 2. Sudden slip and drop
        .to(wholeImg, { y: 48, rotation: 8, duration: 0.22, ease: 'power2.in' })
        
        // 3. Impact & Fracture Switch with clean shake reset
        .call(() => {
          wholeWrap.style.display = 'none';
          brokenWrap.style.display = 'block';
          gsap.to(viewport, {
            x: 6, duration: 0.03, repeat: 6, yoyo: true, ease: 'power1.inOut',
            onComplete: () => { gsap.set(viewport, { x: 0, y: 0 }); }
          });
        })
        
        // 4. Fracture pieces bounce and tilt
        .fromTo(pieceLeft, { x: 0, y: 0, rotation: 0 }, { x: -20, y: 5, rotation: -7, duration: 0.3, ease: 'power2.out' })
        .fromTo(pieceRight, { x: 0, y: 0, rotation: 0 }, { x: 20, y: -3, rotation: 6, duration: 0.3, ease: 'power2.out' }, '<')
        
        // 5. CRACK slams onto screen
        .fromTo(crackText, { opacity: 0, scale: 2.2 }, { opacity: 1, scale: 1, duration: 0.15, ease: 'power4.out' })
        
        // 6. Comedic deadpan dialogue reveals quickly
        .to(crackText, { opacity: 0.25, duration: 0.35 }, "+=0.2")
        .to(msg, { opacity: 1, duration: 0.5 }, "<")
        .to({}, { duration: 1.1 }) // brief comedic hold to read
        
        // 7. Fade out directly into Scene 08 (Going Home)
        .to(viewport, { opacity: 0, duration: 0.45, ease: 'power2.in' });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


