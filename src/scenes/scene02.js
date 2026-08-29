/**
 * BEAT 02 — BUILDING SOMETHING FOR HER
 * Animated composition in early morning transitional light.
 * `rakhi_protocol.sh` log lines, overthinking calculation, photographs of Anwesha,
 * code fragments, and Rakhi motifs assemble in depth.
 * Timestamps accelerate. Centerpiece: "FOR ANWESHA".
 */

export class Scene02Creation {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;perspective:900px;background:linear-gradient(180deg, #0d1527 0%, #1e1b4b 60%, #311e38 100%);">
          <!-- Floating creation fragments with warm parchment frames -->
          <div id="frag-photo1" style="position:absolute;opacity:0;width:78px;height:92px;background:var(--surface-parchment);padding:5px;box-shadow:0 10px 25px rgba(0,0,0,0.6);transform:rotate(-7deg) translateZ(30px);top:13%;left:8%;border-radius:4px;z-index:4;">
            <img src="assets/portraits/anwesha15.png" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha_hero.png'">
          </div>
          
          <div id="frag-photo2" style="position:absolute;opacity:0;width:72px;height:86px;background:var(--surface-parchment);padding:5px;box-shadow:0 10px 25px rgba(0,0,0,0.6);transform:rotate(6deg) translateZ(20px);top:17%;right:8%;border-radius:4px;z-index:4;">
            <img src="assets/portraits/anwesha7.png" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha_calm.png'">
          </div>
          
          <div id="frag-rakhi" style="position:absolute;opacity:0;bottom:18%;left:12%;font-size:2.4rem;filter:drop-shadow(0 4px 14px rgba(251,191,36,0.4));">🧿</div>
          <div id="frag-gift" style="position:absolute;opacity:0;bottom:16%;right:12%;font-size:2.0rem;filter:drop-shadow(0 4px 14px rgba(220,38,38,0.4));">🎁</div>
          
          <div id="frag-terminal" style="position:absolute;opacity:0;top:26%;left:6%;font-family:var(--font-mono);font-size:0.64rem;color:var(--sky-morning-cyan);background:rgba(15,23,42,0.92);padding:6px 12px;border-radius:6px;border:1px solid var(--surface-card-border);box-shadow:0 8px 20px rgba(0,0,0,0.5);">
            ./rakhi_protocol.sh --target=Anwesha
          </div>
          
          <div id="frag-overthink" style="position:absolute;opacity:0;bottom:26%;right:6%;font-family:var(--font-mono);font-size:0.64rem;color:var(--rakhi-gold);background:rgba(15,23,42,0.92);padding:6px 12px;border-radius:6px;border:1px solid rgba(251,191,36,0.3);box-shadow:0 8px 20px rgba(0,0,0,0.5);">
            Calculating overthinking level: ∞
          </div>

          <!-- Accelerating Timestamps -->
          <div id="timestamps" style="position:absolute;top:8%;right:8%;text-align:right;z-index:6;">
            <div class="text-timestamp-sm" id="ts1" style="opacity:0;">11:48 PM</div>
            <div class="text-timestamp-sm" id="ts2" style="opacity:0;">01:17 AM</div>
            <div class="text-timestamp-sm" id="ts3" style="opacity:0;">02:53 AM</div>
            <div class="text-timestamp-sm" id="ts4" style="opacity:0;color:var(--cinema-gold);font-weight:600;">04:30 AM</div>
          </div>

          <!-- Center reveal -->
          <div id="s2-center-block" style="display:flex;flex-direction:column;align-items:center;gap:12px;z-index:10;text-align:center;padding:0 20px;">
            <div class="text-whisper" id="s2-building" style="opacity:0;letter-spacing:0.18em;color:var(--cinema-text-muted);">BUILDING SOMETHING</div>
            <div class="text-impact" id="s2-for" style="opacity:0;font-size:clamp(2rem,7.5vw,3.2rem);color:var(--cinema-text);">FOR ANWESHA</div>
            <div class="text-emotional" id="s2-sub" style="opacity:0;font-size:clamp(0.95rem,3.4vw,1.2rem);color:var(--cinema-accent);">Every detail crafted with intention.</div>
          </div>
        </div>
      `;

      const frags = ['frag-photo1', 'frag-photo2', 'frag-rakhi', 'frag-gift', 'frag-terminal', 'frag-overthink'];
      const timestamps = ['ts1', 'ts2', 'ts3', 'ts4'];
      const building = container.querySelector('#s2-building');
      const forEl = container.querySelector('#s2-for');
      const sub = container.querySelector('#s2-sub');
      const centerBlock = container.querySelector('#s2-center-block');

      this.tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            this.manager.next();
            resolve();
          }, 2200);
        }
      });

      // Fragments assemble from different spatial depths
      frags.forEach((id, i) => {
        const el = container.querySelector(`#${id}`);
        if (el) {
          this.tl.fromTo(el,
            { opacity: 0, scale: 0.7, y: -20 + Math.random() * 40 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.3)' },
            0.2 + i * 0.22
          );
        }
      });

      // Timestamps appear rapidly
      timestamps.forEach((id, i) => {
        const el = container.querySelector(`#${id}`);
        if (el) {
          this.tl.to(el, { opacity: 0.75, duration: 0.25 }, 1.6 + i * 0.3);
        }
      });

      // Center text reveal with warm bloom
      this.tl
        .to(building, { opacity: 1, duration: 0.8 }, 2.8)
        .to(forEl, { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' }, 3.3)
        .to(sub, { opacity: 1, duration: 0.8 }, 4.0)
        
        // Settle background fragments gently
        .to(frags.map(id => container.querySelector(`#${id}`)).filter(Boolean), {
          opacity: 0.25, y: '+=12', duration: 1, stagger: 0.08
        }, 4.6)
        
        // Dissolve into Scene 03 (Bedroom Alarms)
        .to(centerBlock, { opacity: 0, y: -15, scale: 0.95, duration: 1.0, ease: 'power2.in' }, 6.0);
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


