/**
 * BEAT 07 — THE BROKEN KITKAT
 * Gift bag shifts. KitKat falls. CRACK. Silence.
 * Uses the ACTUAL KitKat PNG asset from the repository with realistic fracture masks.
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
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;gap:12px;position:relative;overflow:hidden;">
          <!-- Whole KitKat (Real PNG Asset) -->
          <div id="kitkat-whole-wrap" style="position:relative;width:220px;height:140px;display:flex;align-items:center;justify-content:center;">
            <img src="assets/gifts/kitkat.png" id="kitkat-whole-img" alt="KitKat Rich" style="width:100%;height:auto;object-fit:contain;filter:drop-shadow(0 10px 25px rgba(0,0,0,0.6));transform:translateY(-15px);" />
          </div>

          <!-- Broken KitKat Pieces (Real PNG Asset with fracture clipping) -->
          <div id="kitkat-broken-wrap" style="display:none;position:relative;width:240px;height:150px;">
            <!-- Left piece -->
            <div id="kitkat-piece-left" style="position:absolute;left:0;top:0;width:125px;height:150px;overflow:hidden;">
              <img src="assets/gifts/kitkat.png" alt="KitKat Left" style="width:220px;height:auto;object-fit:contain;filter:drop-shadow(0 10px 20px rgba(0,0,0,0.7));position:absolute;left:0;top:10px;clip-path:polygon(0 0, 52% 0, 44% 100%, 0 100%);" />
            </div>
            <!-- Right piece -->
            <div id="kitkat-piece-right" style="position:absolute;right:0;top:0;width:125px;height:150px;overflow:hidden;">
              <img src="assets/gifts/kitkat.png" alt="KitKat Right" style="width:220px;height:auto;object-fit:contain;filter:drop-shadow(0 10px 20px rgba(0,0,0,0.7));position:absolute;right:0;top:10px;clip-path:polygon(44% 0, 100% 0, 100% 100%, 52% 100%);" />
            </div>
          </div>

          <!-- CRACK Impact Typography -->
          <div class="text-impact" id="crack-text" style="opacity:0;color:var(--cinema-accent);font-size:clamp(2.2rem,9vw,4rem);letter-spacing:0.18em;margin-top:8px;">BROKE</div>

          <!-- Subtle Comic Dialogue -->
          <div class="text-dialogue" id="kitkat-msg" style="opacity:0;margin-top:14px;font-size:1.05rem;">
            "Of all the things."
          </div>
        </div>
      `;

      const wholeWrap = container.querySelector('#kitkat-whole-wrap');
      const wholeImg = container.querySelector('#kitkat-whole-img');
      const brokenWrap = container.querySelector('#kitkat-broken-wrap');
      const pieceLeft = container.querySelector('#kitkat-piece-left');
      const pieceRight = container.querySelector('#kitkat-piece-right');
      const crackText = container.querySelector('#crack-text');
      const msg = container.querySelector('#kitkat-msg');

      this.tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            this.manager.next();
            resolve();
          }, 2500);
        }
      });

      this.tl
        // Gentle hover in travel bag
        .to(wholeImg, { y: -25, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: 1 })
        // Sudden drop / fall
        .to(wholeImg, { y: 45, rotation: 6, duration: 0.28, ease: 'power2.in' })
        // Impact! Switch to broken pieces
        .call(() => {
          wholeWrap.style.display = 'none';
          brokenWrap.style.display = 'block';
          try { this.audio.playGlitchSfx(); } catch(e) {}
          gsap.to(container, { x: 6, duration: 0.03, repeat: 5, yoyo: true, ease: 'power1.inOut' });
        })
        // Fractured pieces separate and tilt
        .to(pieceLeft, { x: -18, y: 4, rotation: -6, duration: 0.4, ease: 'power2.out' })
        .to(pieceRight, { x: 18, y: -2, rotation: 5, duration: 0.4, ease: 'power2.out' }, '<')
        // CRACK slams onto screen
        .fromTo(crackText, { opacity: 0, scale: 2.2 }, { opacity: 1, scale: 1, duration: 0.12, ease: 'power4.out' })
        // Pause in shock
        .to({}, { duration: 1.6 })
        .to(crackText, { opacity: 0.25, duration: 0.8 })
        .to(msg, { opacity: 1, duration: 1.0 });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
