/**
 * BEAT 14 — THE THREAD
 * Pure visual storytelling.
 * Morning fragments (4:30 AM, 5:30 AM, 7:30 AM, MISSED CALL, BUS, KITKAT) return along the thread.
 * Fragments dissolve one by one, leaving only the unbroken sacred thread connecting Diganta & Anwesha.
 * Zero buttons, zero paragraph clutter. Transitions smoothly into Beat 15 (The Apology).
 * Styled in the Velvet Night × Antique Memory aesthetic.
 */

export class Scene14Thread {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;perspective:900px;">
          <!-- Ambient velvet deep space -->
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%, rgba(42,20,29,0.14) 0%, rgba(26,13,20,0.06) 50%, rgba(10,7,9,0.98) 85%);pointer-events:none;"></div>

          <!-- Morning Memory Fragments drifting in along the path -->
          <div id="t-frags-layer" style="position:relative;width:100%;max-width:340px;height:120px;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;z-index:10;margin-bottom:20px;">
            <span class="text-timestamp-sm" id="tf-1" style="opacity:0;background:rgba(232,220,203,0.04);padding:4px 8px;border-radius:5px;border:1px solid var(--cinema-border);">4:30 AM</span>
            <span class="text-timestamp-sm" id="tf-2" style="opacity:0;background:rgba(232,220,203,0.04);padding:4px 8px;border-radius:5px;border:1px solid var(--cinema-border);">5:30 AM</span>
            <span class="text-timestamp-sm" id="tf-3" style="opacity:0;background:rgba(232,220,203,0.04);padding:4px 8px;border-radius:5px;border:1px solid var(--cinema-border);">7:30 AM</span>
            <span class="text-timestamp-sm" id="tf-4" style="opacity:0;background:rgba(183,71,77,0.12);color:var(--rakhi-red);padding:4px 8px;border-radius:5px;border:1px solid rgba(183,71,77,0.25);">MISSED CALL</span>
            <span class="text-timestamp-sm" id="tf-5" style="opacity:0;background:rgba(232,220,203,0.04);padding:4px 8px;border-radius:5px;border:1px solid var(--cinema-border);">BUS</span>
            <span class="text-timestamp-sm" id="tf-6" style="opacity:0;background:rgba(232,220,203,0.04);padding:4px 8px;border-radius:5px;border:1px solid var(--cinema-border);">BROKEN KITKAT</span>
          </div>

          <!-- Connection Node Staging (Diganta <---> Anwesha) -->
          <div id="t-bond-stage" style="opacity:0;position:relative;width:100%;max-width:340px;height:120px;display:flex;align-items:center;justify-content:space-between;z-index:10;">
            <!-- Diganta Node -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;z-index:5;">
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(232,220,203,0.06);border:1.5px solid var(--cinema-accent);overflow:hidden;box-shadow:0 4px 14px rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;">
                <img src="assets/portraits/diganta1.png" alt="Diganta" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/diganta1.png';">
              </div>
              <span style="font-size:0.7rem;font-family:var(--font-mono);color:var(--cinema-text-muted);">Diganta</span>
            </div>

            <!-- Anwesha Node -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;z-index:5;">
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(232,220,203,0.06);border:1.5px solid var(--cinema-gold);display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 4px 14px rgba(0,0,0,0.6);">
                <img src="assets/portraits/anwesha_hero.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha12.png';">
              </div>
              <span style="font-size:0.7rem;font-family:var(--font-mono);color:var(--cinema-gold);">Anwesha 🧿</span>
            </div>

            <!-- Flowing Sacred Thread SVG -->
            <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;" viewBox="0 0 340 120">
              <path id="t-sacred-thread" d="M 40 60 Q 170 15 300 60" stroke="url(#threadGrad)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="350" stroke-dashoffset="350" />
            </svg>
          </div>
        </div>
      `;

      const frags = [
        container.querySelector('#tf-1'),
        container.querySelector('#tf-2'),
        container.querySelector('#tf-3'),
        container.querySelector('#tf-4'),
        container.querySelector('#tf-5'),
        container.querySelector('#tf-6')
      ];
      const fragsLayer = container.querySelector('#t-frags-layer');
      const bondStage = container.querySelector('#t-bond-stage');
      const sacredThread = container.querySelector('#t-sacred-thread');

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      this.tl
        // 1. Morning fragments drift in along the thread
        .fromTo(frags, { opacity: 0, y: 10 }, { opacity: 0.85, y: 0, duration: 0.6, stagger: 0.12, delay: 0.2 })
        .to({}, { duration: 1.8 }) // breathe
        // 2. Fragments dissolve into the unbroken thread
        .to(frags, { opacity: 0, scale: 0.7, duration: 0.7, stagger: 0.08 })
        .to(fragsLayer, { display: 'none', duration: 0.1 })
        // 3. Thread draws connecting Diganta & Anwesha
        .to(bondStage, { opacity: 1, duration: 1.0, ease: 'power2.out' })
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} }, [], 3.5)
        .to(sacredThread, { strokeDashoffset: 0, duration: 2.0, ease: 'power1.inOut' }, 3.5)
        .to({}, { duration: 2.2 }) // hold
        // 4. Smooth transition into Beat 15 (The Apology)
        .to(bondStage, { opacity: 0, scale: 0.92, duration: 1.0, ease: 'power2.inOut' });
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
