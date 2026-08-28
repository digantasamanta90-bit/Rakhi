/**
 * BEAT 12 — SIBLING ROOM (SEQUENTIAL OBJECT-REVEAL ARCHITECTURE)
 * Built strictly on the sequential object-reveal temporal grammar:
 * 
 * OBJECT A ENTERS -> SETTLES -> BECOMES SOLE FOCAL OBJECT -> REVEALS CONTENT
 * -> HAS ITS MOMENT -> RECEDES -> SPACE RESETS
 * -> OBJECT B ENTERS -> BECOMES SOLE FOCAL OBJECT -> repeat.
 * 
 * SHOT 1: Quiet Sibling Room atmosphere settles.
 * SHOT 2: Diganta (The Brother) hero object.
 * SHOT 3: Anwesha (The Sister) keepsake portrait hero object.
 * SHOT 4: Monojit (The Catalyst) tribute hero object.
 * SHOT 5: Brother Status official verification hero object.
 * SHOT 6: Suspicious "DO NOT PRESS" emergency switch enters LAST with 4 escalating presses & hidden achievement.
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
        <div class="sibling-seq-viewport" id="sz-viewport">
          <!-- Ambient Room Stage Backdrop -->
          <div id="sz-bg" style="position:absolute;inset:0;background:radial-gradient(circle at 50% 38%, rgba(200,130,148,0.09) 0%, rgba(92,61,46,0.06) 45%, rgba(10,6,8,0.98) 85%);pointer-events:none;transition:background 0.5s;"></div>

          <!-- Environment Ambient Subtitle Tag -->
          <div id="sz-env-tag" style="position:absolute;top:calc(env(safe-area-inset-top, 10px) + 16px);text-align:center;opacity:0;z-index:5;pointer-events:none;">
            <span class="text-whisper" style="color:var(--cinema-accent);letter-spacing:0.18em;font-size:0.65rem;">BEAT 12 // THE SIBLING REALM</span>
          </div>

          <!-- Master Sequential Stage (Only ONE focal object active at any moment) -->
          <div class="sibling-seq-stage" id="sz-stage">

            <!-- SHOT 2: DIGANTA (THE BROTHER) -->
            <div class="sibling-focal-item" id="sz-focal-diganta">
              <div class="sibling-focal-card" style="border-color:rgba(200,130,148,0.35);">
                <div style="width:48px;height:48px;margin:0 auto 10px auto;border-radius:50%;background:rgba(200,130,148,0.12);border:1px solid var(--cinema-accent);display:flex;align-items:center;justify-content:center;font-size:1.5rem;">
                  👦
                </div>
                <div class="text-whisper" style="color:var(--cinema-accent);font-size:0.62rem;letter-spacing:0.14em;margin-bottom:4px;">THE ARCHETYPE</div>
                <h3 style="font-family:var(--font-display);font-size:1.15rem;color:var(--cinema-text);margin:0 0 8px 0;font-style:italic;">Diganta (Brother)</h3>
                <div style="font-size:0.78rem;color:var(--cinema-text-muted);line-height:1.45;margin-bottom:8px;">
                  "Professional overthinker. Occasional nuisance. Effort: unnecessarily high."
                </div>
                <div style="padding:4px 8px;background:rgba(250,245,238,0.04);border-radius:6px;font-size:0.68rem;color:var(--cinema-gold);display:inline-block;">
                  Will build entire apps instead of texting 🫡
                </div>
              </div>
            </div>

            <!-- SHOT 3: ANWESHA (THE SISTER) -->
            <div class="sibling-focal-item" id="sz-focal-anwesha">
              <div class="sibling-polaroid-frame" style="transform:rotate(-2deg);">
                <div style="width:100%;height:180px;border-radius:2px;overflow:hidden;background:#1a1216;margin-bottom:8px;">
                  <img src="assets/portraits/anwesha6.png" alt="Anwesha" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='assets/portraits/anwesha1.png';">
                </div>
                <div style="display:flex;justify-content:space-between;align-items:baseline;padding:0 2px;">
                  <span style="font-family:var(--font-display);font-size:0.95rem;font-weight:700;color:#2b1726;">Anwesha 🧿</span>
                  <span style="font-size:0.62rem;font-weight:700;color:#c84b5c;letter-spacing:0.04em;">THREAT: HIGH 🍫</span>
                </div>
                <div style="font-size:0.66rem;color:#6b4d63;margin-top:2px;font-style:italic;">
                  Will demand chocolate. Probably judging this scene.
                </div>
              </div>
            </div>

            <!-- SHOT 4: MONOJIT (THE CATALYST) -->
            <div class="sibling-focal-item" id="sz-focal-monojit">
              <div class="sibling-focal-card" style="border-color:rgba(200,162,72,0.4);background:rgba(26,18,22,0.96);">
                <div style="width:48px;height:48px;margin:0 auto 10px auto;border-radius:50%;background:rgba(200,162,72,0.12);border:1px solid var(--cinema-gold);display:flex;align-items:center;justify-content:center;font-size:1.5rem;">
                  🤝
                </div>
                <div class="text-whisper" style="color:var(--cinema-gold);font-size:0.62rem;letter-spacing:0.14em;margin-bottom:4px;">CATALYST OF RECORD</div>
                <h3 style="font-family:var(--font-display);font-size:1.15rem;color:var(--cinema-text);margin:0 0 8px 0;font-style:italic;">Monojit</h3>
                <div style="font-size:0.78rem;color:var(--cinema-text-muted);line-height:1.45;margin-bottom:8px;">
                  "The mastermind behind all of it. Found the photos, approved the chocolate, and started this whole sister story."
                </div>
                <div style="font-size:0.66rem;color:var(--cinema-text-subtle);font-style:italic;">
                  Credit given. Don't let it go to his head 💀
                </div>
              </div>
            </div>

            <!-- SHOT 5: SIBLING STATUS DIAGNOSIS -->
            <div class="sibling-focal-item" id="sz-focal-status">
              <div class="sibling-focal-card" style="border-color:rgba(200,130,148,0.3);">
                <div class="text-whisper" style="color:var(--cinema-gold);font-size:0.64rem;letter-spacing:0.16em;margin-bottom:6px;border-bottom:1px dashed var(--cinema-border);padding-bottom:6px;">
                  OFFICIAL SIBLING DOSSIER // EVALUATION
                </div>
                <div style="font-size:0.82rem;color:var(--cinema-text);margin:8px 0 10px 0;line-height:1.4;">
                  Brother Status: <strong style="color:var(--cinema-accent);">PERMANENT 💀</strong>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;font-size:0.72rem;text-align:left;background:rgba(250,245,238,0.03);padding:8px 10px;border-radius:6px;border:1px solid rgba(250,245,238,0.05);">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--cinema-text-subtle);">Reliability</span>
                    <span style="color:var(--cinema-gold);">Questionable 🤔</span>
                  </div>
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--cinema-text-subtle);">Refund Policy</span>
                    <span style="color:#e06c75;">0% Available ❌</span>
                  </div>
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--cinema-text-subtle);">Sister Care</span>
                    <span style="color:#3d8b59;">100% Guaranteed ❤️</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- SHOT 6: THE SUSPICIOUS "DO NOT PRESS" SWITCH (ENTERS LAST) -->
            <div class="sibling-focal-item" id="sz-focal-switch" style="z-index:20;">
              <div class="sibling-switch-box" id="sz-switch-card">
                <div id="sz-switch-tag" class="text-whisper" style="color:#e06c75;font-size:0.62rem;letter-spacing:0.18em;margin-bottom:8px;">
                  ⚠️ EMERGENCY LEVEL 0 // DO NOT TOUCH
                </div>
                <div id="sz-switch-status" style="font-size:0.8rem;color:var(--cinema-text-muted);margin-bottom:16px;line-height:1.4;min-height:2.2em;display:flex;align-items:center;justify-content:center;">
                  "${c.doNotPress.stage0}"
                </div>

                <div id="sz-btn-wrapper" style="margin-bottom:6px;">
                  <button class="emergency-btn" id="sz-emergency-btn">
                    <span>${c.doNotPress.buttonText}</span>
                  </button>
                </div>

                <!-- Hidden Gag / Reveal Container (Appears after 4th press) -->
                <div id="sz-reveal-panel" style="display:none;opacity:0;margin-top:12px;padding-top:12px;border-top:1px dashed rgba(200,130,148,0.3);">
                  <div class="text-whisper" style="color:var(--cinema-gold);font-size:0.66rem;letter-spacing:0.12em;margin-bottom:6px;">
                    ✨ MAXIMUM SIBLING CHAOS UNLOCKED
                  </div>
                  <p style="font-size:0.75rem;color:var(--cinema-text-muted);margin-bottom:12px;line-height:1.35;">
                    Alright, you've completely destroyed the warning protocol. Now comes the quiet part.
                  </p>
                  
                  <!-- Secret Motifs -->
                  <div style="font-size:1.3rem;gap:1.2rem;display:flex;justify-content:center;margin-bottom:14px;">
                    ${c.motifs.map(m => `<span class="secret-item" data-msg="${m.label}" role="button" aria-label="${m.icon}" style="cursor:pointer;display:inline-block;transition:transform 0.2s;">${m.icon}</span>`).join('')}
                  </div>

                  <button class="btn-primary" id="sz-proceed-btn" style="font-size:0.82rem;padding:10px 24px;">
                    <span>A quiet note for you →</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Narrative Lines Overlay (Syncs with the active focal object) -->
            <div id="sz-narrative" style="position:absolute;bottom:24px;left:0;right:0;text-align:center;padding:0 24px;pointer-events:none;z-index:15;min-height:3em;display:flex;align-items:center;justify-content:center;">
              <p id="sz-narrative-line" class="text-dialogue" style="opacity:0;font-size:clamp(0.88rem,3.2vw,1.05rem);color:var(--cinema-text);margin:0;transition:opacity 0.4s;">
              </p>
            </div>

          </div>
        </div>
      `;

      const viewport = container.querySelector('#sz-viewport');
      const envTag = container.querySelector('#sz-env-tag');
      const narrativeLine = container.querySelector('#sz-narrative-line');
      const bg = container.querySelector('#sz-bg');

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

      // Sequential GSAP Timeline
      this.tl = gsap.timeline();

      this.tl
        // ----------------------------------------------------
        // SHOT 1: Environment Settles
        // ----------------------------------------------------
        .to(envTag, { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 })
        .to({}, { duration: 0.6 })

        // ----------------------------------------------------
        // SHOT 2: DIGANTA OBJECT ENTERS (Hero Focus)
        // ----------------------------------------------------
        .call(() => {
          focalDiganta.classList.add('active');
          setNarrative("Technically your brother. No refunds available.");
          try { this.audio.playChime(350, 0.18); } catch(e) {}
        })
        .fromTo(focalDiganta, 
          { opacity: 0, y: -30, scale: 0.88 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.3)' }
        )
        .to({}, { duration: 2.2 }) // Diganta's moment
        // Diganta recedes & space resets
        .to(focalDiganta, { opacity: 0, y: 25, scale: 0.85, duration: 0.55, ease: 'power2.in' })
        .call(() => {
          focalDiganta.classList.remove('active');
          setNarrative("");
        })
        .to({}, { duration: 0.4 }) // Quiet stage breather

        // ----------------------------------------------------
        // SHOT 3: ANWESHA PORTRAIT ENTERS (Hero Focus)
        // ----------------------------------------------------
        .call(() => {
          focalAnwesha.classList.add('active');
          setNarrative("Will demand KitKat. Probably judging this website right now.");
          try { this.audio.playSparkleSfx(); } catch(e) {}
        })
        .fromTo(focalAnwesha,
          { opacity: 0, y: 35, scale: 0.85, rotation: 6 },
          { opacity: 1, y: 0, scale: 1, rotation: -2, duration: 0.9, ease: 'power2.out' }
        )
        .to({}, { duration: 2.4 }) // Anwesha's moment
        // Anwesha recedes & space resets
        .to(focalAnwesha, { opacity: 0, scale: 0.8, duration: 0.55, ease: 'power2.in' })
        .call(() => {
          focalAnwesha.classList.remove('active');
          setNarrative("");
        })
        .to({}, { duration: 0.4 }) // Quiet stage breather

        // ----------------------------------------------------
        // SHOT 4: MONOJIT CATALYST TOKEN ENTERS (Hero Focus)
        // ----------------------------------------------------
        .call(() => {
          focalMonojit.classList.add('active');
          setNarrative("Don't let the credit go to his head though. 💀");
          try { this.audio.playChime(523, 0.2); } catch(e) {}
        })
        .fromTo(focalMonojit,
          { opacity: 0, scale: 0.85, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'back.out(1.2)' }
        )
        .to({}, { duration: 2.3 }) // Monojit's moment
        // Monojit recedes & space resets
        .to(focalMonojit, { opacity: 0, scale: 0.8, duration: 0.55, ease: 'power2.in' })
        .call(() => {
          focalMonojit.classList.remove('active');
          setNarrative("");
        })
        .to({}, { duration: 0.4 }) // Quiet stage breather

        // ----------------------------------------------------
        // SHOT 5: SIBLING STATUS DOSSIER ENTERS (Hero Focus)
        // ----------------------------------------------------
        .call(() => {
          focalStatus.classList.add('active');
          setNarrative("Diagnosis confirmed. You're stuck with me forever.");
          try { this.audio.playChime(440, 0.2); } catch(e) {}
        })
        .fromTo(focalStatus,
          { opacity: 0, scale: 0.85, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'back.out(1.2)' }
        )
        .to({}, { duration: 2.2 }) // Status moment
        // Status recedes & space resets
        .to(focalStatus, { opacity: 0, scale: 0.8, duration: 0.55, ease: 'power2.in' })
        .call(() => {
          focalStatus.classList.remove('active');
          setNarrative("");
        })
        .to({}, { duration: 0.4 }) // Quiet stage breather

        // ----------------------------------------------------
        // SHOT 6: THE SUSPICIOUS "DO NOT PRESS" SWITCH ENTERS LAST
        // ----------------------------------------------------
        .call(() => {
          focalSwitch.classList.add('active');
          try { this.audio.playGlitchSfx(); } catch(e) {}
        })
        .fromTo(focalSwitch,
          { opacity: 0, y: -40, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: 'back.out(1.5)' }
        );

      // Tactile physical taps on individual hero cards
      focalDiganta.addEventListener('click', () => {
        try { this.audio.playSparkleSfx(); } catch(e) {}
        gsap.fromTo(focalDiganta, { scale: 1.06 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
      });

      focalAnwesha.addEventListener('click', () => {
        try { this.audio.playSparkleSfx(); } catch(e) {}
        gsap.fromTo(focalAnwesha, { scale: 1.06, rotation: 3 }, { scale: 1, rotation: -2, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
      });

      focalMonojit.addEventListener('click', () => {
        try { this.audio.playSparkleSfx(); } catch(e) {}
        gsap.fromTo(focalMonojit, { scale: 1.06 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
      });

      focalStatus.addEventListener('click', () => {
        try { this.audio.playSparkleSfx(); } catch(e) {}
        gsap.fromTo(focalStatus, { scale: 1.05 }, { scale: 1, duration: 0.3 });
      });

      // ----------------------------------------------------
      // SHOT 6: 4-STAGE ESCALATING BUTTON PRESS INTERACTION
      // ----------------------------------------------------
      if (emergencyBtn) {
        emergencyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.pressCount++;

          if (this.pressCount === 1) {
            // PRESS 1: Mild twitch + warning
            try { this.audio.playGlitchSfx(); } catch(e) {}
            switchTag.textContent = "⚠️ WARNING LEVEL 1 // DISOBEDIENCE DETECTED";
            switchStatus.textContent = `"${c.doNotPress.stage1}"`;
            switchStatus.style.color = "var(--cinema-text)";
            gsap.fromTo(viewport, { x: -4 }, { x: 4, duration: 0.05, repeat: 4, yoyo: true });
            gsap.fromTo(emergencyBtn, { scale: 0.92 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.3)' });
          } 
          else if (this.pressCount === 2) {
            // PRESS 2: Moderate room tremor + amber strobe
            try { this.audio.playAlarmBeep(); } catch(e) {}
            switchTag.textContent = "🚨 WARNING LEVEL 2 // SIBLING RETALIATION IMMINENT";
            switchTag.style.color = "var(--cinema-gold)";
            switchStatus.textContent = `"${c.doNotPress.stage2}"`;
            switchStatus.style.color = "var(--cinema-accent)";
            bg.style.background = "radial-gradient(circle at 50% 38%, rgba(200,162,72,0.2) 0%, rgba(92,61,46,0.12) 45%, rgba(10,6,8,0.98) 85%)";
            gsap.fromTo(viewport, { x: -8, y: -4 }, { x: 8, y: 4, duration: 0.04, repeat: 6, yoyo: true });
            gsap.fromTo(emergencyBtn, { scale: 0.88 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.3)' });
          } 
          else if (this.pressCount === 3) {
            // PRESS 3: Full room chaos gag + red alert strobe
            try { this.audio.playGlitchSfx(); this.audio.playAlarmBeep(); } catch(e) {}
            switchTag.textContent = "🔥 EMERGENCY LEVEL 3 // CHAOS OVERLOAD";
            switchStatus.textContent = `"${c.doNotPress.stage3}"`;
            switchStatus.style.color = "#e06c75";
            bg.classList.add('chaos-mode-bg');

            if (this.particles) {
              const rect = switchCard.getBoundingClientRect();
              this.particles.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
            }

            gsap.fromTo(viewport, { x: -14, y: -8 }, { x: 14, y: 8, duration: 0.03, repeat: 10, yoyo: true });
            emergencyBtn.querySelector('span').textContent = "DO NOT PRESS (FINAL WARNING 🚨)";
          } 
          else {
            // PRESS 4: CLIMAX GAG EXPLOSION & HIDDEN REVEAL
            try { 
              this.audio.playCelebrateSfx();
              this.audio.playSparkleSfx();
            } catch(e) {}

            bg.classList.remove('chaos-mode-bg');
            bg.style.background = "radial-gradient(circle at 50% 38%, rgba(200,130,148,0.14) 0%, rgba(200,162,72,0.1) 45%, rgba(10,6,8,0.98) 85%)";

            if (this.particles) {
              const rect = switchCard.getBoundingClientRect();
              this.particles.triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 45);
            }

            if (this.achievements) {
              this.achievements.show('Cannot Follow Instructions 🚨', 'Max sibling chaos unlocked!', '🚨');
            }

            // Hide the emergency button and reveal the secret calm transition panel
            emergencyBtn.style.display = 'none';
            switchTag.textContent = "✨ SIBLING CONTRACT RATIFIED";
            switchTag.style.color = "var(--cinema-gold)";
            switchStatus.style.display = 'none';

            revealPanel.style.display = 'block';
            gsap.fromTo(revealPanel, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
          }
        });
      }

      // Secret Motif Taps for bonus feedback
      secretItems.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          try { this.audio.playSparkleSfx(); } catch(e) {}
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
