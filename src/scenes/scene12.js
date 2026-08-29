/**
 * BEAT 12 — SIBLING ROOM (SEQUENTIAL OBJECT-REVEAL ARCHITECTURE)
 * Built strictly on the sequential object-reveal temporal grammar:
 * 
 * OBJECT A ENTERS -> SETTLES -> BECOMES SOLE FOCAL OBJECT -> REVEALS CONTENT
 * -> HAS ITS MOMENT -> RECEDES -> SPACE RESETS
 * -> OBJECT B ENTERS -> BECOMES SOLE FOCAL OBJECT -> repeat.
 * 
 * Features viewport-stable DO NOT PRESS button with 4 escalating chaos stages.
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
    this.resolved = false;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene6;
      this.resolveScene = resolve;

      container.innerHTML = `
        <div class="sibling-seq-viewport" id="sz-viewport" style="position:relative;width:100%;height:100%;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 38%, #311e38 0%, #1e1b4b 50%, #0f172a 100%);padding:calc(env(safe-area-inset-top, 10px) + 16px) 16px 28px 16px;box-sizing:border-box;">
          <!-- Ambient Room Stage Backdrop -->
          <div id="sz-bg" style="position:absolute;inset:0;pointer-events:none;transition:background 0.5s;"></div>

          <!-- Environment Ambient Subtitle Tag -->
          <div id="sz-env-tag" style="position:relative;margin-bottom:12px;text-align:center;opacity:0;z-index:5;pointer-events:none;">
            <span class="text-whisper" style="color:var(--rakhi-gold);letter-spacing:0.18em;font-size:0.68rem;font-weight:700;">BEAT 12 // THE SIBLING REALM</span>
          </div>

          <!-- Master Sequential Stage (Only ONE focal object active at any moment) -->
          <div class="sibling-seq-stage" id="sz-stage" style="position:relative;width:100%;max-width:340px;min-height:380px;display:flex;flex-direction:column;align-items:center;justify-content:center;">

            <!-- SHOT 2: ME -->
            <div class="sibling-focal-item" id="sz-focal-diganta" style="position:absolute;opacity:0;width:100%;">
              <div class="sibling-focal-card" style="border:1px solid rgba(251,191,36,0.3);background:rgba(15,23,42,0.96);border-radius:16px;padding:20px;text-align:center;box-shadow:0 14px 40px rgba(0,0,0,0.7);">
                <div style="width:52px;height:52px;margin:0 auto 10px auto;border-radius:50%;background:rgba(251,191,36,0.15);border:2px solid var(--rakhi-gold);overflow:hidden;box-shadow:0 0 15px rgba(251,191,36,0.3);display:flex;align-items:center;justify-content:center;">
                  <img src="assets/portraits/diganta1.png" alt="Diganta" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/diganta1.png';">
                </div>
                <div class="text-whisper" style="color:var(--rakhi-gold);font-size:0.65rem;letter-spacing:0.14em;margin-bottom:4px;">THE ARCHETYPE</div>
                <h3 style="font-family:var(--font-serif);font-size:1.25rem;color:#ffffff;margin:0 0 8px 0;font-style:italic;">ME</h3>
                <div style="font-size:0.8rem;color:#cbd5e1;line-height:1.45;margin-bottom:8px;">
                  "Professional overthinker. Occasional nuisance. Effort: unnecessarily high."
                </div>
                <div style="padding:4px 10px;background:rgba(251,191,36,0.15);border-radius:6px;font-size:0.72rem;color:var(--rakhi-gold);display:inline-block;font-weight:600;">
                  Will build entire apps instead of texting 🫡
                </div>
              </div>
            </div>

            <!-- SHOT 3: ANWESHA (THE SISTER) -->
            <div class="sibling-focal-item" id="sz-focal-anwesha" style="position:absolute;opacity:0;width:100%;">
              <div class="sibling-polaroid-frame" style="transform:rotate(-2deg);background:var(--surface-parchment);padding:8px 8px 14px 8px;border-radius:4px;box-shadow:0 14px 40px rgba(0,0,0,0.75);margin:0 auto;">
                <div style="width:100%;height:190px;border-radius:2px;overflow:hidden;background:#0f172a;margin-bottom:8px;">
                  <img src="assets/portraits/anwesha6.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha1.png';">
                </div>
                <div style="display:flex;justify-content:space-between;align-items:baseline;padding:0 4px;">
                  <span style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--rakhi-red);">Anwesha 🧿</span>
                  <span style="font-size:0.68rem;font-weight:700;color:var(--rakhi-red);letter-spacing:0.04em;">THREAT: HIGH 🍫</span>
                </div>
                <div style="font-size:0.72rem;color:#64748b;margin-top:3px;font-style:italic;">
                  Will demand chocolate. Probably judging this scene.
                </div>
              </div>
            </div>

            <!-- SHOT 4: MONOJIT (THE CATALYST) -->
            <div class="sibling-focal-item" id="sz-focal-monojit" style="position:absolute;opacity:0;width:100%;">
              <div class="sibling-focal-card" style="border:1px solid rgba(251,191,36,0.3);background:rgba(15,23,42,0.96);border-radius:16px;padding:20px;text-align:center;box-shadow:0 14px 40px rgba(0,0,0,0.7);">
                <div style="width:52px;height:52px;margin:0 auto 10px auto;border-radius:50%;background:rgba(251,191,36,0.15);border:1px solid var(--rakhi-gold);display:flex;align-items:center;justify-content:center;font-size:1.6rem;">
                  🤝
                </div>
                <div class="text-whisper" style="color:var(--rakhi-gold);font-size:0.65rem;letter-spacing:0.14em;margin-bottom:4px;">CATALYST OF RECORD</div>
                <h3 style="font-family:var(--font-serif);font-size:1.25rem;color:#ffffff;margin:0 0 8px 0;font-style:italic;">Monojit</h3>
                <div style="font-size:0.8rem;color:#cbd5e1;line-height:1.45;margin-bottom:8px;">
                  "The mastermind behind all of it. Found the photos, approved the chocolate, and started this whole sister story."
                </div>
                <div style="font-size:0.72rem;color:#94a3b8;font-style:italic;">
                  Credit given. Don't let it go to his head 💀
                </div>
              </div>
            </div>

            <!-- SHOT 5: SIBLING STATUS DIAGNOSIS -->
            <div class="sibling-focal-item" id="sz-focal-status" style="position:absolute;opacity:0;width:100%;">
              <div class="sibling-focal-card" style="border:1px solid rgba(255,255,255,0.15);background:rgba(15,23,42,0.96);border-radius:16px;padding:20px;text-align:center;box-shadow:0 14px 40px rgba(0,0,0,0.7);">
                <div class="text-whisper" style="color:var(--rakhi-gold);font-size:0.66rem;letter-spacing:0.16em;margin-bottom:6px;border-bottom:1px dashed rgba(255,255,255,0.2);padding-bottom:6px;">
                  OFFICIAL SIBLING DOSSIER // EVALUATION
                </div>
                <div style="font-size:0.88rem;color:#ffffff;margin:8px 0 10px 0;line-height:1.4;">
                  Brother Status: <strong style="color:var(--rakhi-red);">PERMANENT 💀</strong>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;font-size:0.75rem;text-align:left;background:rgba(255,255,255,0.05);padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:#94a3b8;">Reliability</span>
                    <span style="color:var(--rakhi-gold);">Questionable 🤔</span>
                  </div>
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:#94a3b8;">Refund Policy</span>
                    <span style="color:#ef4444;font-weight:700;">0% Available ❌</span>
                  </div>
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:#94a3b8;">Sister Care</span>
                    <span style="color:#22c55e;font-weight:700;">100% Guaranteed ❤️</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- SHOT 6: THE VIEWPORT-ANCHORED "DO NOT PRESS" SWITCH (ENTERS LAST) -->
            <div class="sibling-focal-item" id="sz-focal-switch" style="position:absolute;opacity:0;width:100%;z-index:25;pointer-events:none;">
              <div class="sibling-switch-box" id="sz-switch-card" style="background:rgba(15,23,42,0.96);border:2px solid rgba(239,68,68,0.5);border-radius:18px;padding:22px;text-align:center;box-shadow:0 16px 45px rgba(0,0,0,0.8);position:relative;width:100%;box-sizing:border-box;">
                <div id="sz-switch-tag" class="text-whisper" style="color:#ef4444;font-size:0.68rem;letter-spacing:0.18em;margin-bottom:10px;font-weight:700;">
                  ⚠️ EMERGENCY LEVEL 0 // DO NOT TOUCH
                </div>
                <div id="sz-switch-status" style="font-size:0.88rem;color:#cbd5e1;margin-bottom:18px;line-height:1.4;min-height:2.2em;display:flex;align-items:center;justify-content:center;font-style:italic;">
                  "${c.doNotPress.stage0}"
                </div>

                <div id="sz-btn-wrapper" style="margin-bottom:4px;">
                  <button class="emergency-btn" id="sz-emergency-btn" style="background:linear-gradient(135deg,#dc2626 0%,#991b1b 100%);color:#ffffff;border:none;padding:12px 28px;border-radius:30px;font-weight:700;font-size:0.95rem;box-shadow:0 6px 20px rgba(220,38,38,0.5);cursor:pointer;pointer-events:auto;">
                    <span>${c.doNotPress.buttonText}</span>
                  </button>
                </div>

                <!-- Hidden Gag / Reveal Container (Appears after 4th press) -->
                <div id="sz-reveal-panel" style="display:none;opacity:0;margin-top:14px;padding-top:14px;border-top:1px dashed rgba(251,191,36,0.3);">
                  <div class="text-whisper" style="color:var(--rakhi-gold);font-size:0.75rem;letter-spacing:0.12em;margin-bottom:8px;font-weight:700;">
                    ✨ MAXIMUM SIBLING CHAOS UNLOCKED
                  </div>
                  <p style="font-size:0.84rem;color:#cbd5e1;margin-bottom:14px;line-height:1.4;">
                    Alright, you've completely destroyed the warning protocol. Now comes the quiet part.
                  </p>
                  
                  <!-- Secret Motifs -->
                  <div style="font-size:1.5rem;gap:1.2rem;display:flex;justify-content:center;margin-bottom:16px;">
                    ${c.motifs.map(m => `<span class="secret-item" data-msg="${m.label}" role="button" aria-label="${m.icon}" style="cursor:pointer;display:inline-block;transition:transform 0.2s;user-select:none;">${m.icon}</span>`).join('')}
                  </div>

                  <button class="btn-primary" id="sz-proceed-btn" style="font-size:0.9rem;padding:10px 26px;background:var(--rakhi-red);color:#ffffff;border-radius:24px;border:none;cursor:pointer;font-weight:600;box-shadow:0 6px 20px rgba(220,38,38,0.4);">
                    <span>A quiet note for you →</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- Narrative Lines Overlay -->
          <div id="sz-narrative" style="position:relative;margin-top:14px;text-align:center;padding:0 20px;pointer-events:none;z-index:15;min-height:2.4em;display:flex;align-items:center;justify-content:center;">
            <p id="sz-narrative-line" class="text-dialogue" style="opacity:0;font-size:clamp(0.92rem,3.4vw,1.1rem);color:#f8fafc;margin:0;font-style:italic;">
            </p>
          </div>
        </div>
      `;

      const viewport = container.querySelector('#sz-viewport');
      const envTag = container.querySelector('#sz-env-tag');
      const narrativeLine = container.querySelector('#sz-narrative-line');

      // Focal Objects
      const focalDiganta = container.querySelector('#sz-focal-diganta');
      const focalAnwesha = container.querySelector('#sz-focal-anwesha');
      const focalMonojit = container.querySelector('#sz-focal-monojit');
      const focalStatus = container.querySelector('#sz-focal-status');
      const focalSwitch = container.querySelector('#sz-focal-switch');

      // Switch elements
      const switchCard = container.querySelector('#sz-switch-card');
      const switchTag = container.querySelector('#sz-switch-tag');
      const switchStatus = container.querySelector('#sz-switch-status');
      const emergencyBtn = container.querySelector('#sz-emergency-btn');
      const revealPanel = container.querySelector('#sz-reveal-panel');
      const proceedBtn = container.querySelector('#sz-proceed-btn');
      const secretItems = container.querySelectorAll('.secret-item');

      // Helper to update narrative text cleanly
      const setNarrative = (text) => {
        gsap.to(narrativeLine, {
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            narrativeLine.textContent = text;
            if (text) gsap.to(narrativeLine, { opacity: 1, duration: 0.4 });
          }
        });
      };

      // Shake helper that ALWAYS resets transform to 0,0
      const triggerCardShake = (level) => {
        gsap.killTweensOf(switchCard);
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(switchCard, { x: 0, y: 0, clearProps: 'transform' });
          }
        });

        if (level === 1) {
          tl.to(switchCard, { x: -6, duration: 0.04, yoyo: true, repeat: 5 })
            .to(switchCard, { x: 0, duration: 0.04 });
        } else if (level === 2) {
          tl.to(switchCard, { x: -10, y: -3, duration: 0.035, yoyo: true, repeat: 7 })
            .to(switchCard, { x: 0, y: 0, duration: 0.04 });
        } else if (level === 3) {
          tl.to(switchCard, { x: -14, y: -6, duration: 0.03, yoyo: true, repeat: 9 })
            .to(switchCard, { x: 0, y: 0, duration: 0.04 });
        }
      };

      // Sequential GSAP Timeline
      this.tl = gsap.timeline();

      this.tl
        // SHOT 1: Environment Settles
        .to(envTag, { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 })
        .to({}, { duration: 0.4 })

        // SHOT 2: DIGANTA OBJECT ENTERS
        .call(() => {
          focalDiganta.classList.add('active');
          focalDiganta.style.pointerEvents = 'auto';
          setNarrative("Technically your brother. No refunds available.");
        })
        .fromTo(focalDiganta, 
          { opacity: 0, y: -30, scale: 0.88 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'back.out(1.3)' }
        )
        .to({}, { duration: 2.0 })
        .to(focalDiganta, { 
          opacity: 0, 
          y: 25, 
          scale: 0.85, 
          duration: 0.5, 
          ease: 'power2.in',
          onComplete: () => {
            focalDiganta.classList.remove('active');
            focalDiganta.style.pointerEvents = 'none';
          }
        })
        .call(() => { setNarrative(""); })
        .to({}, { duration: 0.3 })

        // SHOT 3: ANWESHA PORTRAIT ENTERS
        .call(() => {
          focalAnwesha.classList.add('active');
          focalAnwesha.style.pointerEvents = 'auto';
          setNarrative("Will demand KitKat. Probably judging this website right now.");
        })
        .fromTo(focalAnwesha,
          { opacity: 0, y: 35, scale: 0.85, rotation: 6 },
          { opacity: 1, y: 0, scale: 1, rotation: -2, duration: 0.85, ease: 'power2.out' }
        )
        .to({}, { duration: 2.2 })
        .to(focalAnwesha, { 
          opacity: 0, 
          scale: 0.8, 
          duration: 0.5, 
          ease: 'power2.in',
          onComplete: () => {
            focalAnwesha.classList.remove('active');
            focalAnwesha.style.pointerEvents = 'none';
          }
        })
        .call(() => { setNarrative(""); })
        .to({}, { duration: 0.3 })

        // SHOT 4: MONOJIT CATALYST TOKEN ENTERS
        .call(() => {
          focalMonojit.classList.add('active');
          focalMonojit.style.pointerEvents = 'auto';
          setNarrative("Don't let the credit go to his head though. 💀");
        })
        .fromTo(focalMonojit,
          { opacity: 0, scale: 0.85, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }
        )
        .to({}, { duration: 2.0 })
        .to(focalMonojit, { 
          opacity: 0, 
          scale: 0.8, 
          duration: 0.5, 
          ease: 'power2.in',
          onComplete: () => {
            focalMonojit.classList.remove('active');
            focalMonojit.style.pointerEvents = 'none';
          }
        })
        .call(() => { setNarrative(""); })
        .to({}, { duration: 0.3 })

        // SHOT 5: SIBLING STATUS DOSSIER ENTERS
        .call(() => {
          focalStatus.classList.add('active');
          focalStatus.style.pointerEvents = 'auto';
          setNarrative("Diagnosis confirmed. You're stuck with me forever.");
        })
        .fromTo(focalStatus,
          { opacity: 0, scale: 0.85, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }
        )
        .to({}, { duration: 2.0 })
        .to(focalStatus, { 
          opacity: 0, 
          scale: 0.8, 
          duration: 0.5, 
          ease: 'power2.in',
          onComplete: () => {
            focalStatus.classList.remove('active');
            focalStatus.style.pointerEvents = 'none';
          }
        })
        .call(() => { setNarrative(""); })
        .to({}, { duration: 0.3 })

        // SHOT 6: THE SUSPICIOUS "DO NOT PRESS" SWITCH ENTERS LAST
        .call(() => {
          focalSwitch.classList.add('active');
          focalSwitch.style.pointerEvents = 'auto';
        })
        .fromTo(focalSwitch,
          { opacity: 0, y: -30, scale: 0.85 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.9, 
            ease: 'back.out(1.4)',
            onComplete: () => {
              focalSwitch.classList.add('active');
              focalSwitch.style.pointerEvents = 'auto';
              gsap.set(focalSwitch, { clearProps: 'transform' });
            }
          }
        );

      // Tactile taps on hero cards
      focalDiganta.addEventListener('click', () => {
        gsap.fromTo(focalDiganta, { scale: 1.05 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
      });

      focalAnwesha.addEventListener('click', () => {
        gsap.fromTo(focalAnwesha, { scale: 1.05, rotation: 2 }, { scale: 1, rotation: -2, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
      });

      focalMonojit.addEventListener('click', () => {
        gsap.fromTo(focalMonojit, { scale: 1.05 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
      });

      focalStatus.addEventListener('click', () => {
        gsap.fromTo(focalStatus, { scale: 1.04 }, { scale: 1, duration: 0.3 });
      });

      // 4-STAGE ESCALATING BUTTON PRESS INTERACTION
      if (emergencyBtn) {
        emergencyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.pressCount++;

          if (this.pressCount === 1) {
            // PRESS 1: Mild twitch + warning
            switchTag.textContent = "⚠️ WARNING LEVEL 1 // DISOBEDIENCE DETECTED";
            switchStatus.textContent = `"${c.doNotPress.stage1}"`;
            switchStatus.style.color = "#f8fafc";
            triggerCardShake(1);
            gsap.fromTo(emergencyBtn, { scale: 0.92 }, { scale: 1, duration: 0.25, ease: 'elastic.out(1, 0.4)' });
          } 
          else if (this.pressCount === 2) {
            // PRESS 2: Moderate room tremor + amber strobe
            switchTag.textContent = "🚨 WARNING LEVEL 2 // SIBLING RETALIATION IMMINENT";
            switchTag.style.color = "var(--rakhi-gold)";
            switchStatus.textContent = `"${c.doNotPress.stage2}"`;
            switchStatus.style.color = "var(--rakhi-gold)";
            triggerCardShake(2);
            gsap.fromTo(emergencyBtn, { scale: 0.88 }, { scale: 1, duration: 0.25, ease: 'elastic.out(1, 0.4)' });
          } 
          else if (this.pressCount === 3) {
            // PRESS 3: Full chaos gag + red alert strobe
            switchTag.textContent = "🔥 EMERGENCY LEVEL 3 // CHAOS OVERLOAD";
            switchTag.style.color = "#ef4444";
            switchStatus.textContent = `"${c.doNotPress.stage3}"`;
            switchStatus.style.color = "#ef4444";

            if (this.particles) {
              const rect = switchCard.getBoundingClientRect();
              this.particles.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
            }

            triggerCardShake(3);
            emergencyBtn.querySelector('span').textContent = "DO NOT PRESS (FINAL WARNING 🚨)";
          } 
          else {
            // PRESS 4: CLIMAX GAG EXPLOSION & HIDDEN REVEAL
            gsap.killTweensOf(switchCard);
            gsap.set(switchCard, { x: 0, y: 0, clearProps: 'transform' });

            if (this.particles) {
              const rect = switchCard.getBoundingClientRect();
              this.particles.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 45);
            }

            if (this.achievements) {
              this.achievements.show('Cannot Follow Instructions 🚨', 'Max sibling chaos unlocked!', '🚨');
            }

            // Hide emergency button & status smoothly
            emergencyBtn.style.display = 'none';
            switchStatus.style.display = 'none';

            switchTag.textContent = "✨ SIBLING CONTRACT RATIFIED";
            switchTag.style.color = "var(--rakhi-gold)";

            revealPanel.style.display = 'block';
            gsap.fromTo(revealPanel, 
              { opacity: 0, y: 12 }, 
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
          }
        });
      }

      // Secret Motif Taps
      secretItems.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          gsap.fromTo(item,
            { scale: 1.4, rotation: -12 },
            { scale: 1, rotation: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
          );
          const msg = item.getAttribute('data-msg');
          if (this.achievements) {
            this.achievements.show('Secret Discovered', msg, item.textContent);
          }
        });
      });

      // Transition smoothly into Scene 13 (The Letter)
      const proceedToNext = () => {
        if (this.resolved) return;
        this.resolved = true;
        gsap.to(viewport, {
          opacity: 0,
          scale: 0.94,
          y: -15,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            this.manager.next();
            this.resolveScene();
          }
        });
      };

      if (proceedBtn) proceedBtn.addEventListener('click', proceedToNext);
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}

