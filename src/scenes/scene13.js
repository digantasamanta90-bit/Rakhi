/**
 * BEAT 13 — THE LETTER (TABLETOP DESK AMBIANCE)
 * Intimate tabletop desk environment with warm wood grain and gentle morning sunlight beam.
 * Physical sheet of warm stationery paper unrolls in 3D perspective.
 * Thought-by-thought reveal with deliberate breathing room, handwritten signature,
 * and glowing thread unspooling from the corner into Scene 14.
 */

import { content } from '../content/content.js';

export class Scene13Letter {
  constructor({ manager, audio, particles, achievements }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.achievements = achievements;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene13;

      container.innerHTML = `
        <div class="tabletop-desk-env" id="s13-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;perspective:1000px;background:radial-gradient(circle at 50% 30%, #451a03 0%, #1e293b 60%, #070c18 100%);">
          
          <!-- Wooden Desk Grain & Sunlight Spot -->
          <div class="golden-hour-beam" style="opacity:0.3;filter:blur(25px);"></div>

          <!-- Physical Parchment Sheet (Compact to fit perfectly inside viewport) -->
          <div class="letter-paper" id="l-paper" style="opacity:0;transform:translateY(30px) rotateX(8deg);z-index:10;position:relative;background:var(--surface-parchment);color:#1c1917;padding:16px 18px 14px 18px;border-radius:8px;box-shadow:0 16px 45px rgba(0,0,0,0.7);max-width:350px;width:94%;">
            <!-- Paper Header -->
            <div style="text-align:center;margin-bottom:8px;border-bottom:1px solid rgba(0,0,0,0.1);padding-bottom:6px;">
              <div class="text-whisper" style="color:var(--rakhi-red);font-size:0.62rem;letter-spacing:0.14em;font-weight:700;">${c.tag}</div>
              <h2 style="font-family:var(--font-serif);font-size:1.18rem;color:#78350f;font-style:italic;margin-top:2px;margin-bottom:0;">${c.header}</h2>
            </div>

            <!-- Letter Body with Thought-by-Thought Staggered Reveal -->
            <div style="font-size:0.78rem;line-height:1.42;color:#292524;display:flex;flex-direction:column;gap:6px;">
              <p id="l-p0" style="opacity:0;font-style:italic;color:#b45309;font-weight:600;margin:0;">
                ${c.leadQuote}
              </p>
              <p id="l-p1" style="opacity:0;margin:0;">
                ${c.messageParagraphs[0]}
              </p>
              <p id="l-p2" style="opacity:0;margin:0;">
                ${c.messageParagraphs[1]}
              </p>
              <p id="l-p3" style="opacity:0;margin:0;">
                ${c.messageParagraphs[2]}
              </p>
              <p id="l-p4" style="opacity:0;font-weight:600;color:#78350f;margin:0;">
                ${c.messageParagraphs[3]}
              </p>
              <p id="l-p5" style="opacity:0;font-style:italic;color:#78716c;font-size:0.75rem;margin:0;">
                ${c.closingJoke}
              </p>
            </div>

            <!-- Handwritten Signature Block -->
            <div id="l-sig" style="opacity:0;margin-top:10px;padding-top:8px;border-top:1px dashed rgba(0,0,0,0.2);display:flex;justify-content:space-between;align-items:flex-end;">
              <div>
                <button class="btn-secondary" id="l-keep-btn" style="font-size:0.68rem;padding:4px 10px;border-radius:16px;border:1px solid #b45309;color:#b45309;background:transparent;cursor:pointer;font-weight:600;">
                  <span>${c.keepButton}</span>
                </button>
                <div id="l-keep-msg" style="display:none;font-size:0.7rem;color:#b45309;font-style:italic;margin-top:2px;">
                  ${c.keepSuccess}
                </div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:0.68rem;color:#78716c;">${c.signature.prefix}</div>
                <div class="handwritten-sig" style="font-size:1.15rem;color:#78350f;font-family:var(--font-serif);font-style:italic;font-weight:700;">${c.signature.author}</div>
              </div>
            </div>

            <!-- Unspooling Thread Strand from corner -->
            <svg style="position:absolute;bottom:-12px;right:18px;width:110px;height:35px;overflow:visible;pointer-events:none;" viewBox="0 0 110 35">
              <defs>
                <linearGradient id="threadGradScene13" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#dc2626" />
                  <stop offset="100%" stop-color="#fbbf24" />
                </linearGradient>
              </defs>
              <path id="l-thread-tail" d="M 10 5 Q 55 30 100 15" stroke="url(#threadGradScene13)" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-dasharray="140" stroke-dashoffset="140" opacity="0.9" filter="drop-shadow(0 2px 6px rgba(220,38,38,0.5))" />
            </svg>
          </div>

          <!-- Unobtrusive Thread Trigger -->
          <div id="l-cta-wrap" style="opacity:0;margin-top:12px;text-align:center;z-index:10;">
            <button class="btn-primary" id="l-next-btn" style="padding:8px 22px;font-size:0.82rem;background:var(--rakhi-red);color:#ffffff;border-radius:24px;border:none;cursor:pointer;font-weight:600;box-shadow:0 6px 18px rgba(220,38,38,0.4);">
              <span>${c.nextBtnText}</span>
              <span style="font-size:0.8rem;">→ 🧿</span>
            </button>
          </div>
        </div>
      `;

      const paper = container.querySelector('#l-paper');
      const p0 = container.querySelector('#l-p0');
      const p1 = container.querySelector('#l-p1');
      const p2 = container.querySelector('#l-p2');
      const p3 = container.querySelector('#l-p3');
      const p4 = container.querySelector('#l-p4');
      const p5 = container.querySelector('#l-p5');
      const sig = container.querySelector('#l-sig');
      const threadTail = container.querySelector('#l-thread-tail');
      const ctaWrap = container.querySelector('#l-cta-wrap');
      const nextBtn = container.querySelector('#l-next-btn');
      const keepBtn = container.querySelector('#l-keep-btn');
      const keepMsg = container.querySelector('#l-keep-msg');

      this.tl = gsap.timeline();

      this.tl
        // Paper unrolls and enters in 3D perspective
        .to(paper, { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'power2.out', delay: 0.2 })
        // Thought-by-thought progressive reveal
        .to(p0, { opacity: 1, duration: 0.7 }, 0.7)
        .to(p1, { opacity: 1, duration: 0.7 }, 1.3)
        .to(p2, { opacity: 1, duration: 0.7 }, 1.9)
        .to(p3, { opacity: 1, duration: 0.7 }, 2.5)
        .to(p4, { opacity: 1, duration: 0.7 }, 3.1)
        .to(p5, { opacity: 1, duration: 0.7 }, 3.7)
        // Signature appears
        .to(sig, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 4.2)
        // Sacred thread unspools
        .to(threadTail, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, 4.6)
        .to(ctaWrap, { opacity: 1, duration: 0.8 }, 5.0);

      // Keep this message interaction
      if (keepBtn && keepMsg) {
        keepBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          keepBtn.style.display = 'none';
          keepMsg.style.display = 'block';
          if (this.particles) {
            this.particles.triggerBurst(window.innerWidth / 2, window.innerHeight * 0.7, 18);
          }
          if (this.achievements) {
            this.achievements.show('Memory Saved', 'Saved forever in memory 🧿', '🧿');
          }
        });
      }

      // Transition smoothly into Scene 14 (The Thread)
      const proceedToThread = () => {
        gsap.to(paper, {
          opacity: 0,
          y: -25,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            this.manager.next();
            resolve();
          }
        });
      };

      if (nextBtn) nextBtn.addEventListener('click', proceedToThread);
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


