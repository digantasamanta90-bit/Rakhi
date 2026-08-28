/**
 * BEAT 02 — BUILDING SOMETHING FOR HER
 * Animated composition: `rakhi_protocol.sh` log lines, overthinking calculation,
 * photographs, code tags, and Rakhi symbols assemble.
 * Timestamps accelerate. Ends with "FOR ANWESHA".
 * Styled in the Velvet Night × Antique Memory aesthetic.
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
        <div style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;">
          <!-- Floating creation fragments with warm parchment frames -->
          <div id="frag-photo1" style="position:absolute;opacity:0;width:65px;height:75px;background:var(--parchment);padding:3px;box-shadow:0 6px 18px rgba(0,0,0,0.6);transform:rotate(-8deg);top:15%;left:10%;border-radius:2px;">
            <img src="assets/portraits/anwesha3.png" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha_hero.png'">
          </div>
          <div id="frag-photo2" style="position:absolute;opacity:0;width:60px;height:70px;background:var(--parchment);padding:3px;box-shadow:0 6px 18px rgba(0,0,0,0.6);transform:rotate(6deg);top:20%;right:10%;border-radius:2px;">
            <img src="assets/portraits/anwesha7.png" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha_calm.png'">
          </div>
          <div id="frag-rakhi" style="position:absolute;opacity:0;bottom:20%;left:12%;font-size:2.2rem;">🧿</div>
          <div id="frag-gift" style="position:absolute;opacity:0;bottom:18%;right:12%;font-size:1.8rem;">🎁</div>
          <div id="frag-terminal" style="position:absolute;opacity:0;top:28%;left:6%;font-family:var(--font-mono);font-size:0.62rem;color:var(--cinema-accent);background:rgba(26,13,20,0.88);padding:4px 8px;border-radius:4px;border:1px solid var(--cinema-border);">
            ./rakhi_protocol.sh --target=Anwesha
          </div>
          <div id="frag-overthink" style="position:absolute;opacity:0;bottom:30%;right:6%;font-family:var(--font-mono);font-size:0.62rem;color:var(--cinema-gold);background:rgba(26,13,20,0.88);padding:4px 8px;border-radius:4px;border:1px solid var(--antique-gold-border);">
            Calculating overthinking level: ∞
          </div>

          <!-- Timestamps -->
          <div id="timestamps" style="position:absolute;top:8%;right:8%;text-align:right;">
            <div class="text-timestamp-sm" id="ts1" style="opacity:0;">11:48 PM</div>
            <div class="text-timestamp-sm" id="ts2" style="opacity:0;">01:17 AM</div>
            <div class="text-timestamp-sm" id="ts3" style="opacity:0;">02:53 AM</div>
            <div class="text-timestamp-sm" id="ts4" style="opacity:0;color:var(--cinema-accent);">04:30 AM</div>
          </div>

          <!-- Center reveal -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px;z-index:10;text-align:center;padding:0 20px;">
            <div class="text-whisper" id="s2-building" style="opacity:0;">BUILDING SOMETHING</div>
            <div class="text-impact" id="s2-for" style="opacity:0;font-size:clamp(1.8rem,7vw,3rem);">FOR ANWESHA</div>
            <div class="text-emotional" id="s2-sub" style="opacity:0;font-size:clamp(0.95rem,3.2vw,1.15rem);">Every detail crafted with intention.</div>
          </div>
        </div>
      `;

      const frags = ['frag-photo1', 'frag-photo2', 'frag-rakhi', 'frag-gift', 'frag-terminal', 'frag-overthink'];
      const timestamps = ['ts1', 'ts2', 'ts3', 'ts4'];
      const building = container.querySelector('#s2-building');
      const forEl = container.querySelector('#s2-for');
      const sub = container.querySelector('#s2-sub');

      this.tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            this.manager.next();
            resolve();
          }, 2500);
        }
      });

      // Fragments fly in
      frags.forEach((id, i) => {
        const el = container.querySelector(`#${id}`);
        if (el) {
          this.tl.to(el, {
            opacity: 1,
            y: -10 + Math.random() * 20,
            duration: 0.5,
            ease: 'back.out(1.2)'
          }, 0.3 + i * 0.25);
        }
      });

      // Timestamps appear rapidly
      timestamps.forEach((id, i) => {
        const el = container.querySelector(`#${id}`);
        if (el) {
          this.tl.to(el, { opacity: 0.7, duration: 0.3 }, 1.8 + i * 0.35);
        }
      });

      // Center text reveal
      this.tl
        .to(building, { opacity: 1, duration: 0.8 }, 3.2)
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} }, [], 3.8)
        .to(forEl, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, 3.8)
        .to(sub, { opacity: 1, duration: 0.8 }, 4.8)
        .to(frags.map(id => container.querySelector(`#${id}`)).filter(Boolean), {
          opacity: 0.2, y: '+=15', duration: 1, stagger: 0.1
        }, 5.2);
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
