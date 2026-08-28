/**
 * BEAT 12 — SIBLING ROOM (OBJECT-REVEAL ARCHITECTURE)
 * A miniature 2.5D physical stage built progressively, one object at a time:
 * 1. Desk foundation enters and settles.
 * 2. Diganta Brother object enters with tactile diagnosis.
 * 3. Anwesha Sister framed portrait enters with threat level.
 * 4. Monojit catalyst object enters with consultation tribute.
 * 5. Suspicious "DO NOT PRESS" emergency switch enters LAST as the central focal point.
 * 
 * Tactile interactions trigger physical environmental responses.
 * Escalating button presses create 3 levels of comedic room chaos.
 * Seamless camera push onto desk paper transitioning into Scene 13.
 */

import { content } from '../content/content.js';

export class Scene12SiblingZone {
  constructor({ manager, audio, particles, achievements }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.achievements = achievements;
    this.tl = null;
    this.pressCount = 0;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene6;

      container.innerHTML = `
        <div id="sz-stage-viewport" style="position:relative;width:100%;height:100%;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:calc(env(safe-area-inset-top,10px) + 16px) 16px 28px 16px;perspective:1000px;">
          
          <!-- Environment Ambient Title -->
          <div id="sz-header" style="opacity:0;text-align:center;margin-bottom:12px;transform:translateY(-10px);">
            <div class="text-whisper" style="color:var(--cinema-accent);letter-spacing:0.16em;margin-bottom:2px;">SIBLING HEADQUARTERS // CHAOS ENABLED</div>
            <h2 class="text-impact" style="font-size:clamp(1.25rem,4.2vw,1.65rem);color:var(--cinema-text);">${c.header}</h2>
          </div>

          <!-- Physical Desk Stage Container -->
          <div id="sz-desk-surface" style="position:relative;width:100%;max-width:350px;display:flex;flex-direction:column;gap:10px;transform-style:preserve-3d;">
            
            <!-- Object Row 1: Brother & Sister Physical Desk Items -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              
              <!-- OBJECT 2: Diganta Brother Terminal Item -->
              <div id="sz-obj-brother" class="sibling-card-cinema" style="opacity:0;transform:translateY(-30px) rotate(-2deg);padding:12px;cursor:pointer;border-color:var(--cinema-border);">
                <div class="sibling-card-header-cinema" style="font-size:0.76rem;">👦 Diganta (Brother)</div>
                <div class="sibling-card-body" style="font-size:0.68rem;line-height:1.35;">
                  <div>Professional Overthinker</div>
                  <div style="color:var(--cinema-text-subtle);margin-top:2px;">Reliability: Questionable</div>
                  <div id="sz-diag-text" style="display:none;color:var(--cinema-accent);font-weight:600;margin-top:4px;font-style:italic;">Status: Permanent 💀</div>
                </div>
              </div>

              <!-- OBJECT 3: Anwesha Sister Framed Portrait Item -->
              <div id="sz-obj-sister" class="sibling-card-cinema" style="opacity:0;transform:translateY(-30px) rotate(2deg);padding:12px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;">
                <div>
                  <div class="sibling-card-header-cinema" style="font-size:0.76rem;">👧 Anwesha (Sister)</div>
                  <div class="sibling-card-body" style="font-size:0.68rem;line-height:1.35;">
                    <div>Threat: <strong style="color:var(--cinema-accent);">HIGH</strong></div>
                    <div style="color:var(--cinema-text-subtle);">Will demand KitKat</div>
                  </div>
                </div>
                <div style="width:38px;height:38px;align-self:flex-end;border-radius:8px;overflow:hidden;border:1px solid var(--cinema-border);margin-top:4px;">
                  <img src="assets/portraits/anwesha6.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha1.png';">
                </div>
              </div>
            </div>

            <!-- OBJECT 4: Monojit Catalyst Pin Item -->
            <div id="sz-obj-monojit" class="sibling-card-cinema" style="opacity:0;transform:translateY(20px);border-color:rgba(200,162,72,0.3);background:rgba(200,162,72,0.04);padding:10px 14px;cursor:pointer;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="sibling-card-header-cinema" style="color:var(--cinema-gold);font-size:0.76rem;margin:0;">🤝 Monojit (Catalyst)</span>
                <span class="text-whisper" style="font-size:0.58rem;color:var(--cinema-text-subtle);">CREDIT DUE</span>
              </div>
              <div style="font-size:0.7rem;color:var(--cinema-text-muted);margin-top:2px;font-style:italic;">
                "The mastermind behind all of it."
              </div>
            </div>

            <!-- OBJECT 5: The Suspicious "DO NOT PRESS" Switch Box (Enters Last) -->
            <div id="sz-obj-switch" class="sibling-card-cinema" style="opacity:0;transform:scale(0.85) translateY(30px);border-color:rgba(224,108,117,0.45);background:rgba(224,108,117,0.07);padding:16px;text-align:center;box-shadow:0 8px 25px rgba(0,0,0,0.5);">
              <div class="sibling-card-header-cinema" style="color:#e06c75;margin-bottom:6px;font-size:0.8rem;">🚨 DO NOT PRESS THIS BUTTON</div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
                <div id="sz-switch-status" style="font-size:0.74rem;color:var(--cinema-text-muted);text-align:left;flex:1;">
                  ${c.doNotPress.stage0}
                </div>
                <button class="do-not-press-btn" id="sz-press-btn" style="flex-shrink:0;">
                  <span>${c.doNotPress.buttonText}</span>
                </button>
              </div>
            </div>

            <!-- Secret Clickables Motif Row -->
            <div id="sz-obj-motifs" style="opacity:0;text-align:center;margin-top:2px;">
              <div class="text-whisper" style="color:var(--cinema-text-subtle);font-size:0.58rem;margin-bottom:4px;">TAP SECRET MOTIFS:</div>
              <div style="font-size:1.35rem;gap:1.4rem;display:flex;justify-content:center;">
                ${c.motifs.map(m => `<span class="secret-item" data-msg="${m.label}" role="button" aria-label="${m.icon}" style="cursor:pointer;display:inline-block;transition:transform 0.2s;">${m.icon}</span>`).join('')}
              </div>
            </div>

            <!-- Flow trigger to Letter -->
            <div id="sz-continue-wrap" style="opacity:0;text-align:center;margin-top:6px;">
              <button class="btn-secondary" id="sz-letter-btn" style="font-size:0.75rem;padding:6px 18px;border-color:var(--cinema-border);color:var(--cinema-text-muted);background:transparent;">
                <span>A quiet note for you →</span>
              </button>
            </div>
          </div>
        </div>
      `;

      const header = container.querySelector('#sz-header');
      const deskSurface = container.querySelector('#sz-desk-surface');
      const objBrother = container.querySelector('#sz-obj-brother');
      const objSister = container.querySelector('#sz-obj-sister');
      const objMonojit = container.querySelector('#sz-obj-monojit');
      const objSwitch = container.querySelector('#sz-obj-switch');
      const objMotifs = container.querySelector('#sz-obj-motifs');
      const continueWrap = container.querySelector('#sz-continue-wrap');
      const diagText = container.querySelector('#sz-diag-text');
      const pressBtn = container.querySelector('#sz-press-btn');
      const switchStatus = container.querySelector('#sz-switch-status');
      const secretItems = container.querySelectorAll('.secret-item');
      const letterBtn = container.querySelector('#sz-letter-btn');

      this.tl = gsap.timeline();

      // Sequential Object-Reveal Progression
      this.tl
        // 1. Foundation enters
        .to(header, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 })
        // 2. Brother object drops in and settles with physical weight
        .to(objBrother, { opacity: 1, y: 0, rotation: 0, duration: 0.6, ease: 'bounce.out' }, 0.4)
        .call(() => { try { this.audio.playChime(350, 0.1); } catch(e) {} }, [], 0.5)
        // 3. Sister portrait drops in and settles
        .to(objSister, { opacity: 1, y: 0, rotation: 0, duration: 0.6, ease: 'bounce.out' }, 0.8)
        .call(() => { try { this.audio.playChime(440, 0.1); } catch(e) {} }, [], 0.9)
        // 4. Monojit catalyst pin glides in
        .to(objMonojit, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.3)
        // 5. Suspicious DO NOT PRESS switch slams into focus last (The Star)
        .to(objSwitch, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, 1.7)
        .call(() => { try { this.audio.playSparkleSfx(); } catch(e) {} }, [], 1.8)
        // 6. Secret motifs & continue flow appear
        .to(objMotifs, { opacity: 1, duration: 0.5 }, 2.3)
        .to(continueWrap, { opacity: 1, duration: 0.5 }, 2.7);

      // Brother object interaction
      if (objBrother && diagText) {
        objBrother.addEventListener('click', () => {
          try { this.audio.playSparkleSfx(); } catch(e) {}
          diagText.style.display = 'block';
          gsap.fromTo(objBrother, { scale: 1.06 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
          if (this.achievements) {
            this.achievements.show('Status Verified', 'Brother is permanent 💀', '👦');
          }
        });
      }

      // Sister object interaction
      if (objSister) {
        objSister.addEventListener('click', () => {
          try { this.audio.playSparkleSfx(); } catch(e) {}
          gsap.fromTo(objSister, { scale: 1.06 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
        });
      }

      // Monojit object interaction
      if (objMonojit) {
        objMonojit.addEventListener('click', () => {
          try { this.audio.playSparkleSfx(); } catch(e) {}
          gsap.fromTo(objMonojit, { scale: 1.04 }, { scale: 1, duration: 0.3 });
          if (this.achievements) {
            this.achievements.show('Catalyst Honored', 'Credit given to Monojit 🤝', '🤝');
          }
        });
      }

      // DO NOT PRESS Button with environmental escalation
      if (pressBtn && switchStatus) {
        pressBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.pressCount++;
          try { this.audio.playGlitchSfx(); } catch(e) {}

          if (this.pressCount === 1) {
            switchStatus.textContent = c.doNotPress.stage1;
            switchStatus.style.color = 'var(--cinema-text)';
            gsap.fromTo(objSwitch, { x: -4 }, { x: 4, duration: 0.05, repeat: 4, yoyo: true });
          } else if (this.pressCount === 2) {
            switchStatus.textContent = c.doNotPress.stage2;
            switchStatus.style.color = 'var(--cinema-accent)';
            gsap.fromTo(deskSurface, { x: -8 }, { x: 8, duration: 0.04, repeat: 6, yoyo: true });
          } else {
            switchStatus.textContent = c.doNotPress.stage3;
            switchStatus.style.color = '#e06c75';
            pressBtn.style.display = 'none';
            try { this.audio.playCelebrateSfx(); } catch(e) {}
            if (this.particles) {
              const rect = objSwitch.getBoundingClientRect();
              this.particles.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
            }
            if (this.achievements) {
              this.achievements.show('Achievement Unlocked', 'Cannot Follow Instructions 🚨', '🚨');
            }
          }
        });
      }

      // Secret motifs tap
      secretItems.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          try { this.audio.playSparkleSfx(); } catch(e) {}
          gsap.fromTo(item,
            { scale: 1.4, rotation: -15 },
            { scale: 1, rotation: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
          );
          const msg = item.getAttribute('data-msg');
          if (this.achievements) {
            this.achievements.show('Secret Discovered', msg, item.textContent);
          }
        });
      });

      // Camera push onto desk paper transitioning into Scene 13
      const proceedToLetter = () => {
        gsap.to(container.querySelector('#sz-stage-viewport'), {
          opacity: 0,
          scale: 0.94,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete: () => {
            this.manager.next();
            resolve();
          }
        });
      };

      if (letterBtn) letterBtn.addEventListener('click', proceedToLetter);
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
