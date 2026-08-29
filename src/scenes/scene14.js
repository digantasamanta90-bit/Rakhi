/**
 * BEAT 14 — THE THREAD (COSMIC CONNECTION VOID)
 * Pure visual storytelling in deep atmospheric star void.
 * Morning fragments (4:30 AM, 5:30 AM, 7:30 AM, MISSED CALL, METRO, BROKEN KITKAT) orbit along the thread.
 * Fragments dissolve one by one, leaving only the unbroken sacred thread connecting Diganta & Anwesha.
 * Zero buttons, zero paragraph clutter. Transitions smoothly into Beat 15 (The Apology).
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
      // Procedural Star Nodes
      let starsHTML = '';
      for (let i = 0; i < 24; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = (Math.random() * 2 + 1).toFixed(1);
        const opacity = (Math.random() * 0.5 + 0.2).toFixed(2);
        starsHTML += `<div style="position:absolute;top:${y}%;left:${x}%;width:${size}px;height:${size}px;border-radius:50%;background:#ffffff;opacity:${opacity};box-shadow:0 0 5px #fff;"></div>`;
      }

      container.innerHTML = `
        <div class="thread-cosmos-env" id="s14-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;perspective:900px;background:radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 60%, #020617 100%);">
          
          <!-- Cosmic Starfield -->
          <div style="position:absolute;inset:0;pointer-events:none;">
            ${starsHTML}
          </div>

          <!-- Morning Memory Fragments drifting in along the path -->
          <div id="t-frags-layer" style="position:relative;width:100%;max-width:340px;height:120px;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;z-index:10;margin-bottom:20px;">
            <span class="text-timestamp-sm" id="tf-1" style="opacity:0;background:rgba(255,255,255,0.06);padding:5px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);color:#f8fafc;">4:30 AM</span>
            <span class="text-timestamp-sm" id="tf-2" style="opacity:0;background:rgba(255,255,255,0.06);padding:5px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);color:#f8fafc;">5:30 AM</span>
            <span class="text-timestamp-sm" id="tf-3" style="opacity:0;background:rgba(255,255,255,0.06);padding:5px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);color:#f8fafc;">7:30 AM</span>
            <span class="text-timestamp-sm" id="tf-4" style="opacity:0;background:rgba(220,38,38,0.2);color:#ef4444;padding:5px 10px;border-radius:6px;border:1px solid rgba(220,38,38,0.4);font-weight:700;">MISSED CALL</span>
            <span class="text-timestamp-sm" id="tf-5" style="opacity:0;background:rgba(255,255,255,0.06);padding:5px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);color:#f8fafc;">METRO</span>
            <span class="text-timestamp-sm" id="tf-6" style="opacity:0;background:rgba(255,255,255,0.06);padding:5px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);color:#f8fafc;">BROKEN KITKAT</span>
          </div>

          <!-- Connection Node Staging (Diganta <---> Anwesha) -->
          <div id="t-bond-stage" style="opacity:0;position:relative;width:100%;max-width:340px;height:140px;display:flex;align-items:center;justify-content:space-between;z-index:10;padding:0 10px;">
            <!-- Diganta Node -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px;z-index:5;">
              <div style="width:56px;height:56px;border-radius:50%;background:rgba(15,23,42,0.8);border:2px solid var(--sky-morning-cyan);overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;">
                <img src="assets/portraits/diganta1.png" alt="Diganta" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/diganta1.png';">
              </div>
              <span style="font-size:0.75rem;font-family:var(--font-mono);color:#cbd5e1;font-weight:600;">Diganta</span>
            </div>

            <!-- Anwesha Node -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px;z-index:5;">
              <div style="width:56px;height:56px;border-radius:50%;background:rgba(15,23,42,0.8);border:2px solid var(--rakhi-gold);display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.8);">
                <img src="assets/portraits/anwesha_hero.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha12.png';">
              </div>
              <span style="font-size:0.75rem;font-family:var(--font-mono);color:var(--rakhi-gold);font-weight:700;">Anwesha 🧿</span>
            </div>

            <!-- Flowing Sacred Thread SVG -->
            <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;" viewBox="0 0 340 140">
              <defs>
                <linearGradient id="threadGradScene14" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#dc2626" />
                  <stop offset="50%" stop-color="#fbbf24" />
                  <stop offset="100%" stop-color="#dc2626" />
                </linearGradient>
              </defs>
              <path id="t-sacred-thread" d="M 40 70 Q 170 20 300 70" stroke="url(#threadGradScene14)" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-dasharray="350" stroke-dashoffset="350" filter="drop-shadow(0 0 12px rgba(251,191,36,0.8))" />
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
      const viewport = container.querySelector('#s14-viewport');

      this.tl = gsap.timeline({
        onComplete: () => {
          this.manager.next();
          resolve();
        }
      });

      this.tl
        // 1. Morning fragments drift in along the thread
        .fromTo(frags, { opacity: 0, y: 12 }, { opacity: 0.85, y: 0, duration: 0.6, stagger: 0.12, delay: 0.2 })
        .to({}, { duration: 1.8 }) // breathe
        // 2. Fragments dissolve into the unbroken thread
        .to(frags, { opacity: 0, scale: 0.7, duration: 0.7, stagger: 0.08 })
        .to(fragsLayer, { display: 'none', duration: 0.1 })
        // 3. Thread draws connecting Diganta & Anwesha
        .to(bondStage, { opacity: 1, duration: 1.0, ease: 'power2.out' })
        .to(sacredThread, { strokeDashoffset: 0, duration: 2.0, ease: 'power1.inOut' }, 3.5)
        .to({}, { duration: 2.2 }) // hold
        // 4. Smooth transition into Beat 15 (The Apology)
        .to(bondStage, { opacity: 0, scale: 0.92, duration: 1.0, ease: 'power2.inOut' })
        .to(viewport, { opacity: 0, duration: 0.8, ease: 'power2.in' }, "+=0.2");
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


