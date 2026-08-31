/**
 * BEAT 12 — SIBLING ROOM (SEQUENTIAL OBJECT-REVEAL & VIEWPORT-ANCHORED SWITCH)
 * Built strictly on the sequential object-reveal temporal grammar:
 * 1. DIGANTA (ME) -> 2. ANWESHA (THE SISTER) -> 3. MONOJIT (CATALYST) -> 4. STATUS DOSSIER
 * -> 5. VIEWPORT-ANCHORED "DO NOT PRESS" SWITCH (4 escalating chaos stages)
 * 
 * Guarantees zero transform drift on DO NOT PRESS across all presses & screen sizes.
 */

import { content } from '../content/content.js';
import { renderMilkybarIconSvg, replaceMilkybarIcon } from '../components/MilkybarVisual.js';

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
      const c = content.scene12;
      const t = c.timing || {};
      const brother = c.brotherCard || {};
      const sister = c.sisterCard || {};
      const monojit = c.monojitCard || {};
      const status = c.statusCard || {};
      const dnp = c.doNotPress || {};
      const toasts = c.toasts || {};
      this.resolveScene = resolve;

      container.innerHTML = `
        <div class="sibling-seq-viewport" id="sz-viewport" style="position:relative;width:100%;height:100%;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 38%, #1e293b 0%, #0f172a 50%, #070c18 100%);padding:calc(env(safe-area-inset-top, 14px) + 24px) 16px 36px 16px;box-sizing:border-box;">
          
          <!-- Environment Ambient Subtitle Tag -->
          <div id="sz-env-tag" style="position:relative;margin-bottom:12px;text-align:center;opacity:0;z-index:5;pointer-events:none;">
            <span class="text-whisper" style="color:var(--rakhi-gold);letter-spacing:0.18em;font-size:0.7rem;font-weight:700;">${c.envTag}</span>
          </div>

          <!-- Master Sequential Stage (Only ONE focal object active at any moment) -->
          <div class="sibling-seq-stage" id="sz-stage" style="position:relative;width:100%;max-width:340px;min-height:390px;display:flex;flex-direction:column;align-items:center;justify-content:center;">

            <!-- SHOT 2: ME (DIGANTA) -->
            <div class="sibling-focal-item" id="sz-focal-diganta" style="position:absolute;opacity:0;width:100%;">
              <div class="sibling-focal-card" style="border:1px solid rgba(251,191,36,0.35);background:rgba(15,23,42,0.96);border-radius:16px;padding:20px;text-align:center;box-shadow:0 14px 40px rgba(0,0,0,0.75);">
                <div style="width:56px;height:56px;margin:0 auto 10px auto;border-radius:50%;background:rgba(251,191,36,0.15);border:2px solid var(--rakhi-gold);overflow:hidden;box-shadow:0 0 16px rgba(251,191,36,0.35);display:flex;align-items:center;justify-content:center;">
                  <img src="${brother.image || 'assets/portraits/diganta1.png'}" alt="${brother.title || 'Diganta'}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/diganta1.png';">
                </div>
                <div class="text-whisper" style="color:var(--rakhi-gold);font-size:0.65rem;letter-spacing:0.14em;margin-bottom:4px;">${brother.badge}</div>
                <h3 style="font-family:var(--font-serif);font-size:1.3rem;color:#ffffff;margin:0 0 8px 0;font-style:italic;">${brother.title}</h3>
                <div style="font-size:0.82rem;color:#cbd5e1;line-height:1.45;margin-bottom:10px;">
                  ${brother.description}
                </div>
                <div style="padding:4px 10px;background:rgba(251,191,36,0.15);border-radius:6px;font-size:0.72rem;color:var(--rakhi-gold);display:inline-block;font-weight:600;">
                  ${brother.pill}
                </div>
              </div>
            </div>

            <!-- SHOT 3: ANWESHA (THE SISTER) -->
            <div class="sibling-focal-item" id="sz-focal-anwesha" style="position:absolute;opacity:0;width:100%;">
              <div class="sibling-polaroid-frame" style="transform:rotate(-2deg);background:var(--surface-parchment);padding:8px 8px 14px 8px;border-radius:4px;box-shadow:0 16px 45px rgba(0,0,0,0.8);margin:0 auto;max-width:260px;">
                <div style="width:100%;height:195px;border-radius:2px;overflow:hidden;background:#0f172a;margin-bottom:8px;">
                  <img src="${sister.image || 'assets/portraits/anwesha6.png'}" alt="${sister.title || 'Anwesha'}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='${sister.imageFallback || 'assets/portraits/anwesha1.png'}';">
                </div>
                <div style="display:flex;justify-content:space-between;align-items:baseline;padding:0 4px;">
                  <span style="font-family:var(--font-serif);font-size:1.1rem;font-weight:700;color:var(--rakhi-red);">${sister.title}</span>
                  <span style="font-size:0.7rem;font-weight:700;color:var(--rakhi-red);letter-spacing:0.04em;">${replaceMilkybarIcon(sister.threatLevel, 14)}</span>
                </div>
                <div style="font-size:0.74rem;color:#64748b;margin-top:3px;font-style:italic;">
                  ${sister.description}
                </div>
              </div>
            </div>

            <!-- SHOT 4: MONOJIT (THE CATALYST WITH REAL PHOTO) -->
            <div class="sibling-focal-item" id="sz-focal-monojit" style="position:absolute;opacity:0;width:100%;">
              <div class="sibling-focal-card" style="border:1px solid rgba(251,191,36,0.35);background:rgba(15,23,42,0.96);border-radius:16px;padding:20px;text-align:center;box-shadow:0 14px 40px rgba(0,0,0,0.75);">
                <div style="width:56px;height:56px;margin:0 auto 10px auto;border-radius:50%;background:rgba(251,191,36,0.15);border:2px solid var(--rakhi-gold);overflow:hidden;box-shadow:0 0 16px rgba(251,191,36,0.35);display:flex;align-items:center;justify-content:center;">
                  <img src="${monojit.image}" alt="${monojit.title || 'Monojit'}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/monojit1.png';">
                </div>
                <div class="text-whisper" style="color:var(--rakhi-gold);font-size:0.65rem;letter-spacing:0.14em;margin-bottom:4px;">${monojit.badge}</div>
                <h3 style="font-family:var(--font-serif);font-size:1.3rem;color:#ffffff;margin:0 0 8px 0;font-style:italic;">${monojit.title}</h3>
                <div style="font-size:0.82rem;color:#cbd5e1;line-height:1.45;margin-bottom:8px;">
                  ${monojit.description}
                </div>
                <div style="font-size:0.74rem;color:#94a3b8;font-style:italic;">
                  ${monojit.footnote}
                </div>
              </div>
            </div>

            <!-- SHOT 5: SIBLING STATUS DIAGNOSIS -->
            <div class="sibling-focal-item" id="sz-focal-status" style="position:absolute;opacity:0;width:100%;">
              <div class="sibling-focal-card" style="border:1px solid rgba(255,255,255,0.16);background:rgba(15,23,42,0.96);border-radius:16px;padding:20px;text-align:center;box-shadow:0 14px 40px rgba(0,0,0,0.75);">
                <div class="text-whisper" style="color:var(--rakhi-gold);font-size:0.66rem;letter-spacing:0.16em;margin-bottom:6px;border-bottom:1px dashed rgba(255,255,255,0.2);padding-bottom:6px;">
                  ${status.badge}
                </div>
                <div style="font-size:0.92rem;color:#ffffff;margin:8px 0 10px 0;line-height:1.4;">
                  ${status.status}
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;font-size:0.76rem;text-align:left;background:rgba(255,255,255,0.06);padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:#94a3b8;">${status.reliabilityLabel || 'Reliability'}</span>
                    <span style="color:var(--rakhi-gold);">${status.reliability}</span>
                  </div>
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:#94a3b8;">${status.refundPolicyLabel || 'Refund Policy'}</span>
                    <span style="color:#ef4444;font-weight:700;">${status.refundPolicy}</span>
                  </div>
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:#94a3b8;">${status.sisterCareLabel || 'Sister Care'}</span>
                    <span style="color:#22c55e;font-weight:700;">${status.sisterCare}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- SHOT 6: THE VIEWPORT-ANCHORED "DO NOT PRESS" SWITCH (ENTERS LAST) -->
            <div class="sibling-focal-item" id="sz-focal-switch" style="position:relative;opacity:0;width:100%;z-index:25;pointer-events:none;">
              <div class="sibling-switch-box" id="sz-switch-card" style="background:rgba(15,23,42,0.98);border:2px solid rgba(239,68,68,0.55);border-radius:18px;padding:22px;text-align:center;box-shadow:0 16px 45px rgba(0,0,0,0.85);position:relative;width:100%;box-sizing:border-box;">
                
                <div id="sz-switch-tag" class="text-whisper" style="color:#ef4444;font-size:0.7rem;letter-spacing:0.18em;margin-bottom:10px;font-weight:700;">
                  ${dnp.tag0 || '⚠️ EMERGENCY LEVEL 0 // DO NOT TOUCH'}
                </div>
                
                <div id="sz-switch-status" style="font-size:0.9rem;color:#cbd5e1;margin-bottom:18px;line-height:1.4;min-height:2.4em;display:flex;align-items:center;justify-content:center;font-style:italic;">
                  "${dnp.stage0}"
                </div>

                <div id="sz-btn-wrapper" style="margin-bottom:4px;">
                  <button class="emergency-btn" id="sz-emergency-btn" style="background:linear-gradient(135deg,#dc2626 0%,#991b1b 100%);color:#ffffff;border:none;padding:12px 28px;border-radius:30px;font-weight:700;font-size:0.95rem;box-shadow:0 6px 20px rgba(220,38,38,0.55);cursor:pointer;pointer-events:auto;outline:none;">
                    <span>${dnp.buttonText}</span>
                  </button>
                </div>

                <!-- Hidden Climax Gag / Reveal Container (Appears after 4th press) -->
                <div id="sz-reveal-panel" style="display:none;opacity:0;margin-top:16px;padding-top:14px;border-top:1px dashed rgba(251,191,36,0.35);">
                  <div class="text-whisper" style="color:var(--rakhi-gold);font-size:0.76rem;letter-spacing:0.14em;margin-bottom:8px;font-weight:700;">
                    ${dnp.revealTitle}
                  </div>
                  <p style="font-size:0.86rem;color:#cbd5e1;margin-bottom:14px;line-height:1.45;">
                    ${dnp.revealBody}
                  </p>
                  
                  <!-- Secret Motifs -->
                  <div style="font-size:1.6rem;gap:1.2rem;display:flex;justify-content:center;align-items:center;margin-bottom:16px;">
                    ${c.motifs.map(m => {
                      const isChoc = m.icon === '🍫';
                      const iconDisplay = isChoc ? renderMilkybarIconSvg({ size: 28 }) : m.icon;
                      return `<span class="secret-item" data-msg="${m.label}" role="button" aria-label="${m.label}" style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:transform 0.2s;user-select:none;">${iconDisplay}</span>`;
                    }).join('')}
                  </div>

                  <button class="btn-primary" id="sz-proceed-btn" style="font-size:0.92rem;padding:11px 28px;background:var(--rakhi-red);color:#ffffff;border-radius:24px;border:none;cursor:pointer;font-weight:600;box-shadow:0 6px 20px rgba(220,38,38,0.45);">
                    <span>${dnp.proceedBtnText}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- Narrative Dialogue Lines -->
          <div id="sz-narrative" style="position:relative;margin-top:14px;text-align:center;padding:0 20px;pointer-events:none;z-index:15;min-height:2.4em;display:flex;align-items:center;justify-content:center;">
            <p id="sz-narrative-line" class="text-dialogue" style="opacity:0;font-size:clamp(0.95rem,3.4vw,1.12rem);color:#f8fafc;margin:0;font-style:italic;">
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

      const cardHold = t.cardHold ?? 1.3;
      const cardTrans = t.cardTransitionDuration ?? 0.4;

      // Helper to update narrative dialogue cleanly
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

      // Shake helper that ALWAYS resets transform to 0,0 immediately
      const triggerCardShake = (level) => {
        gsap.killTweensOf(switchCard);
        gsap.set(switchCard, { x: 0, y: 0, rotation: 0 });

        const shakeTl = gsap.timeline({
          onComplete: () => {
            gsap.set(switchCard, { x: 0, y: 0, rotation: 0, clearProps: 'transform' });
          }
        });

        if (level === 1) {
          shakeTl.to(switchCard, { x: -6, duration: 0.04, yoyo: true, repeat: 4 })
            .to(switchCard, { x: 0, duration: 0.04 });
        } else if (level === 2) {
          shakeTl.to(switchCard, { x: -9, y: -3, duration: 0.035, yoyo: true, repeat: 6 })
            .to(switchCard, { x: 0, y: 0, duration: 0.04 });
        } else if (level === 3) {
          shakeTl.to(switchCard, { x: -14, y: -5, rotation: -1, duration: 0.03, yoyo: true, repeat: 8 })
            .to(switchCard, { x: 0, y: 0, rotation: 0, duration: 0.04 });
        }
      };

      // Sequential GSAP Timeline
      this.tl = gsap.timeline();

      this.tl
        // Environment tag and first character card enter immediately
        .to(envTag, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
        .call(() => {
          focalDiganta.style.pointerEvents = 'auto';
          setNarrative(brother.narrative || "Technically your brother. No refunds available.");
        }, [], 0)
        .fromTo(focalDiganta,
          { opacity: 0, y: -20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' },
          0.05
        )
        .to({}, { duration: cardHold })
        .to(focalDiganta, {
          opacity: 0,
          y: 20,
          scale: 0.88,
          duration: cardTrans,
          ease: 'power2.in',
          onComplete: () => {
            focalDiganta.style.display = 'none';
          }
        })
        .call(() => { setNarrative(""); })
        .to({}, { duration: 0.15 })

        // SHOT 3: ANWESHA PORTRAIT ENTERS
        .call(() => {
          focalAnwesha.style.pointerEvents = 'auto';
          setNarrative(sister.narrative || "Will demand Milkybar. Probably judging this website right now.");
        })
        .fromTo(focalAnwesha,
          { opacity: 0, y: 30, scale: 0.88, rotation: 6 },
          { opacity: 1, y: 0, scale: 1, rotation: -2, duration: 0.6, ease: 'power2.out' }
        )
        .to({}, { duration: cardHold + 0.1 })
        .to(focalAnwesha, {
          opacity: 0,
          scale: 0.85,
          duration: cardTrans,
          ease: 'power2.in',
          onComplete: () => {
            focalAnwesha.style.display = 'none';
          }
        })
        .call(() => { setNarrative(""); })
        .to({}, { duration: 0.15 })

        // SHOT 4: MONOJIT CATALYST TOKEN ENTERS
        .call(() => {
          focalMonojit.style.pointerEvents = 'auto';
          setNarrative(monojit.narrative || "Don't let the credit go to his head though. 💀");
        })
        .fromTo(focalMonojit,
          { opacity: 0, scale: 0.88, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' }
        )
        .to({}, { duration: cardHold })
        .to(focalMonojit, {
          opacity: 0,
          scale: 0.85,
          duration: cardTrans,
          ease: 'power2.in',
          onComplete: () => {
            focalMonojit.style.display = 'none';
          }
        })
        .call(() => { setNarrative(""); })
        .to({}, { duration: 0.15 })

        // SHOT 5: SIBLING STATUS DOSSIER ENTERS
        .call(() => {
          focalStatus.style.pointerEvents = 'auto';
          setNarrative(status.narrative || "Diagnosis confirmed. You're stuck with me forever.");
        })
        .fromTo(focalStatus,
          { opacity: 0, scale: 0.88, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' }
        )
        .to({}, { duration: cardHold })
        .to(focalStatus, {
          opacity: 0,
          scale: 0.85,
          duration: cardTrans,
          ease: 'power2.in',
          onComplete: () => {
            focalStatus.style.display = 'none';
          }
        })
        .call(() => { setNarrative(""); })
        .to({}, { duration: 0.15 })

        // SHOT 6: THE STABLY ANCHORED "DO NOT PRESS" SWITCH ENTERS
        .call(() => {
          focalSwitch.style.pointerEvents = 'auto';
        })
        .fromTo(focalSwitch,
          { opacity: 0, y: -20, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.3)',
            onComplete: () => {
              focalSwitch.style.pointerEvents = 'auto';
              gsap.set(focalSwitch, { clearProps: 'transform' });
            }
          }
        );

      // Tactile taps on hero cards
      focalDiganta.addEventListener('click', () => {
        gsap.fromTo(focalDiganta, { scale: 1.04 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
      });

      focalAnwesha.addEventListener('click', () => {
        gsap.fromTo(focalAnwesha, { scale: 1.04, rotation: 2 }, { scale: 1, rotation: -2, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
      });

      focalMonojit.addEventListener('click', () => {
        gsap.fromTo(focalMonojit, { scale: 1.04 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
      });

      focalStatus.addEventListener('click', () => {
        gsap.fromTo(focalStatus, { scale: 1.04 }, { scale: 1, duration: 0.3 });
      });

      // Tactile Mobile Device Vibration Trigger
      const triggerVibration = (pattern) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try {
            navigator.vibrate(pattern);
          } catch (err) {}
        }
      };

      // 4-STAGE ESCALATING BUTTON PRESS INTERACTION
      if (emergencyBtn) {
        emergencyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.pressCount++;

          if (this.pressCount === 1) {
            // PRESS 1: Mild warning + light tactile tap
            triggerVibration([100]);
            switchTag.textContent = dnp.tag1 || "⚠️ WARNING LEVEL 1 // DISOBEDIENCE DETECTED";
            switchStatus.textContent = `"${dnp.stage1}"`;
            switchStatus.style.color = "#f8fafc";
            triggerCardShake(1);
            gsap.fromTo(emergencyBtn, { scale: 0.94 }, { scale: 1, duration: 0.25, ease: 'elastic.out(1, 0.4)' });
          }
          else if (this.pressCount === 2) {
            // PRESS 2: Moderate room tremor + amber warning + stronger vibration
            triggerVibration([140]);
            switchTag.textContent = dnp.tag2 || "🚨 WARNING LEVEL 2 // SIBLING RETALIATION IMMINENT";
            switchTag.style.color = "var(--rakhi-gold)";
            switchStatus.textContent = `"${dnp.stage2}"`;
            switchStatus.style.color = "var(--rakhi-gold)";
            triggerCardShake(2);
            gsap.fromTo(emergencyBtn, { scale: 0.90 }, { scale: 1, duration: 0.25, ease: 'elastic.out(1, 0.4)' });
          }
          else if (this.pressCount === 3) {
            // PRESS 3: Full chaos gag + red alert + multi-pulse vibration
            triggerVibration([180, 70, 180]);
            switchTag.textContent = dnp.tag3 || "🔥 EMERGENCY LEVEL 3 // CHAOS OVERLOAD";
            switchTag.style.color = "#ef4444";
            switchStatus.textContent = `"${dnp.stage3}"`;
            switchStatus.style.color = "#ef4444";

            if (this.particles) {
              const rect = switchCard.getBoundingClientRect();
              this.particles.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
            }

            triggerCardShake(3);
            emergencyBtn.querySelector('span').textContent = dnp.finalBtnText || "DO NOT PRESS (FINAL WARNING 🚨)";
          }
          else {
            // PRESS 4: CLIMAX GAG EXPLOSION & HIDDEN REVEAL + climax vibration
            triggerVibration([220, 70, 220, 70, 260]);
            gsap.killTweensOf(switchCard);
            gsap.set(switchCard, { x: 0, y: 0, rotation: 0, clearProps: 'transform' });

            if (this.particles) {
              const rect = switchCard.getBoundingClientRect();
              this.particles.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 45);
            }

            if (this.achievements) {
              const climaxToast = toasts.climaxAchievement || {
                title: 'Cannot Follow Instructions 🚨',
                description: 'Max sibling chaos unlocked!',
                icon: '🚨'
              };
              this.achievements.show(climaxToast.title, climaxToast.description, climaxToast.icon);
            }

            // Hide emergency button & status smoothly
            emergencyBtn.style.display = 'none';
            switchStatus.style.display = 'none';

            switchTag.textContent = dnp.tag4 || "✨ SIBLING CONTRACT RATIFIED";
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
            this.achievements.show(toasts.secretTitle || 'Secret Discovered', msg, item.textContent);
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
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(0); } catch (err) {}
    }
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
