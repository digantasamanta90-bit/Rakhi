/**
 * BEAT 13 — THE LETTER
 * Intimate quietness. Visual noise stripped away.
 * Physical sheet of warm stationery paper unrolls in 3D perspective.
 * Thought-by-thought reveal with deliberate breathing room, handwritten signature,
 * and glowing thread unspooling from the corner into Scene 14.
 * Styled in the Velvet Night × Antique Memory aesthetic.
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
      const c = content.scene5;

      container.innerHTML = `
        <div style="position:relative;width:100%;height:100%;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:calc(env(safe-area-inset-top,10px) + 20px) 16px 28px 16px;perspective:1000px;">
          <!-- Quiet velvet dark ambient backdrop -->
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 30%, rgba(42,20,29,0.15) 0%, rgba(10,7,9,0.98) 80%);pointer-events:none;"></div>

          <!-- Physical Parchment Sheet (Floating in warm darkness) -->
          <div class="letter-paper" id="l-paper" style="opacity:0;transform:translateY(40px) rotateX(15deg);z-index:10;position:relative;">
            <!-- Paper Header -->
            <div style="text-align:center;margin-bottom:14px;">
              <div class="text-whisper" style="color:var(--faded-wine-text);font-size:0.65rem;letter-spacing:0.14em;">FOR ANWESHA // FROM DIGANTA</div>
              <h2 class="font-display" style="font-size:1.35rem;color:var(--wine);font-style:italic;margin-top:2px;">${c.header}</h2>
            </div>

            <!-- Letter Body with Thought-by-Thought Staggered Reveal -->
            <div style="font-size:0.84rem;line-height:1.68;color:var(--wine);display:flex;flex-direction:column;gap:11px;">
              <p id="l-p0" style="opacity:0;font-style:italic;color:var(--muted-rose);font-weight:500;">
                ${c.leadQuote}
              </p>
              <p id="l-p1" style="opacity:0;">
                ${c.messageParagraphs[0]}
              </p>
              <p id="l-p2" style="opacity:0;">
                ${c.messageParagraphs[1]}
              </p>
              <p id="l-p3" style="opacity:0;">
                ${c.messageParagraphs[2]}
              </p>
              <p id="l-p4" style="opacity:0;font-weight:500;color:var(--wine);">
                ${c.messageParagraphs[3]}
              </p>
              <p id="l-p5" style="opacity:0;font-style:italic;color:var(--soft-muted-text);font-size:0.8rem;">
                ${c.closingJoke}
              </p>
            </div>

            <!-- Handwritten Signature Block -->
            <div id="l-sig" style="opacity:0;margin-top:18px;padding-top:12px;border-top:1px dashed var(--parchment-border);display:flex;justify-content:space-between;align-items:flex-end;">
              <div>
                <button class="btn-secondary" id="l-keep-btn" style="font-size:0.72rem;padding:4px 12px;min-height:28px;border-color:var(--muted-rose);color:var(--muted-rose);background:rgba(155,93,112,0.08);">
                  <span>${c.keepButton}</span>
                </button>
                <div id="l-keep-msg" style="display:none;font-size:0.72rem;color:var(--muted-rose);font-style:italic;margin-top:4px;">
                  ${c.keepSuccess}
                </div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:0.7rem;color:var(--faded-wine-text);">${c.signature.prefix}</div>
                <div class="handwritten-sig" style="font-size:1.15rem;color:var(--muted-rose);font-family:var(--font-display);font-style:italic;">${c.signature.author}</div>
              </div>
            </div>

            <!-- Unspooling Thread Strand from corner -->
            <svg style="position:absolute;bottom:-15px;right:20px;width:120px;height:40px;overflow:visible;pointer-events:none;" viewBox="0 0 120 40">
              <path id="l-thread-tail" d="M 10 5 Q 60 35 110 20" stroke="url(#threadGrad)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="160" stroke-dashoffset="160" opacity="0.9" />
            </svg>
          </div>

          <!-- Unobtrusive Thread Trigger -->
          <div id="l-cta-wrap" style="opacity:0;margin-top:16px;text-align:center;z-index:10;">
            <button class="btn-primary" id="l-next-btn" style="padding:9px 24px;font-size:0.86rem;">
              <span>The Sacred Thread</span>
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
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} }, [], 4.2)
        .to(sig, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 4.2)
        // Sacred thread unspools
        .to(threadTail, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, 4.6)
        .to(ctaWrap, { opacity: 1, duration: 0.8 }, 5.0);

      // Keep this message interaction
      if (keepBtn && keepMsg) {
        keepBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          try { this.audio.playSparkleSfx(); } catch(e) {}
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
        try { this.audio.playSparkleSfx(); } catch(e) {}
        gsap.to(paper, {
          opacity: 0,
          y: -25,
          scale: 0.95,
          duration: 0.9,
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
