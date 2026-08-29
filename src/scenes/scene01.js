/**
 * BEAT 01 — 4:30 AM (CINEMATIC LIVING NIGHT SKY)
 * Deep night atmosphere with glowing moon, twinkling starfield, drifting clouds,
 * gentle camera drift, continuous BGM, and the transition from 4:27 to 4:30 AM.
 * Typewriter "Finally." appears with an inline cursor attached directly to the text.
 */

export class Scene01Clock {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
    this.typeInterval = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      // Start continuous background score
      try {
        this.audio.startMusic(1.5);
      } catch (e) {}

      // Procedural Stars
      const starCount = 42;
      let starsHTML = '';
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 75;
        const size = (Math.random() * 2 + 1).toFixed(1);
        const opacity = (Math.random() * 0.6 + 0.25).toFixed(2);
        const animDelay = (Math.random() * 4).toFixed(1);
        starsHTML += `
          <div style="position:absolute;top:${y}%;left:${x}%;width:${size}px;height:${size}px;border-radius:50%;background:#ffffff;opacity:${opacity};box-shadow:0 0 5px rgba(255,255,255,0.8);animation:starTwinkle 3s ${animDelay}s infinite ease-in-out;"></div>
        `;
      }

      container.innerHTML = `
        <div class="night-sky-env" id="s1-viewport" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;">
          
          <!-- Moving Starfield Layer -->
          <div id="s1-stars" style="position:absolute;inset:0;pointer-events:none;">
            ${starsHTML}
          </div>

          <!-- Procedural Glowing Moon with Surface Detail -->
          <div class="moon-wrapper" id="s1-moon" style="opacity:0;transform:scale(0.8);">
            <div class="moon-disc">
              <div class="moon-crater" style="top:22%;left:30%;width:16px;height:16px;"></div>
              <div class="moon-crater" style="top:48%;left:52%;width:20px;height:20px;"></div>
              <div class="moon-crater" style="top:60%;left:22%;width:12px;height:12px;"></div>
              <div class="moon-crater" style="top:32%;left:66%;width:10px;height:10px;"></div>
            </div>
          </div>

          <!-- Multi-Speed Drifting Clouds -->
          <div class="clouds-drift-layer">
            <div class="drifting-cloud" id="s1-cloud-1" style="top:14%;left:0;width:320px;height:110px;animation-duration:26s;"></div>
            <div class="drifting-cloud" id="s1-cloud-2" style="top:38%;left:0;width:380px;height:130px;animation-duration:34s;animation-delay:-12s;opacity:0.6;"></div>
          </div>

          <!-- Center Atmospheric Staging -->
          <div id="s1-content-box" style="display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10;text-align:center;padding:24px;max-width:360px;">
            <div class="text-whisper" id="s1-date" style="opacity:0;letter-spacing:0.2em;color:var(--cinema-text-muted);font-size:0.72rem;">
              AUGUST 28, 2026 • LATE NIGHT
            </div>
            
            <div class="text-timestamp" id="s1-clock" style="margin:24px 0 16px 0;opacity:0;text-shadow:0 0 35px rgba(251,191,36,0.3);font-size:clamp(2.4rem,8vw,3.6rem);">
              4:27 AM
            </div>
            
            <!-- Typewriter with Inline-Attached Cursor -->
            <div id="s1-text" style="opacity:0;min-height:2.2em;display:inline-flex;align-items:center;justify-content:center;">
              <span class="text-dialogue" id="s1-msg" style="color:var(--cinema-text);font-size:1.3rem;display:inline;"></span><span class="cursor-blink" id="s1-cursor" style="display:inline-block;width:2px;height:1.2em;background:var(--cinema-gold);margin-left:2px;"></span>
            </div>
          </div>
        </div>
      `;

      const viewport = container.querySelector('#s1-viewport');
      const moon = container.querySelector('#s1-moon');
      const dateEl = container.querySelector('#s1-date');
      const clockEl = container.querySelector('#s1-clock');
      const textEl = container.querySelector('#s1-text');
      const msgEl = container.querySelector('#s1-msg');
      const cursorEl = container.querySelector('#s1-cursor');

      this.tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            this.manager.next();
            resolve();
          }, 1600);
        }
      });

      this.tl
        // 1. Moon & Stars reveal with soft camera drift
        .to(moon, { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out' }, 0.2)
        .fromTo(viewport, { scale: 1.05 }, { scale: 1.0, duration: 8.5, ease: 'power1.out' }, 0)
        
        // 2. Date Whisper
        .to(dateEl, { opacity: 0.75, duration: 1.4, ease: 'power2.out' }, 0.8)
        
        // 3. Clock enters
        .to(clockEl, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 1.4)
        .to({}, { duration: 1.2 })
        
        // 4. Tick to 4:29 AM
        .call(() => {
          clockEl.textContent = '4:29 AM';
        })
        .to(clockEl, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut' })
        .to({}, { duration: 1.1 })
        
        // 5. Tick to 4:30 AM (The milestone)
        .call(() => {
          clockEl.textContent = '4:30 AM';
        })
        .to(clockEl, { scale: 1.08, color: 'var(--cinema-gold)', duration: 0.6, ease: 'power2.out' })
        .to({}, { duration: 0.8 })
        
        // 6. Typewriter dialogue: "Finally."
        .to(textEl, { opacity: 1, duration: 0.4 })
        .call(() => {
          const text = 'Finally.';
          let i = 0;
          this.typeInterval = setInterval(() => {
            if (i < text.length) {
              msgEl.textContent += text[i];
              i++;
            } else {
              clearInterval(this.typeInterval);
              this.typeInterval = null;
            }
          }, 95);
        })
        .to({}, { duration: 1.8 })
        
        // 7. Cinematic dissolve into Scene 02
        .to([dateEl, clockEl, textEl, cursorEl], { opacity: 0, y: -12, duration: 1.0, ease: 'power2.in' }, 8.0)
        .to(moon, { opacity: 0.35, scale: 0.9, duration: 1.0, ease: 'power2.in' }, 8.0);
    });
  }

  exit() {
    if (this.typeInterval) {
      clearInterval(this.typeInterval);
      this.typeInterval = null;
    }
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


