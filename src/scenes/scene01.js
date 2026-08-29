/**
 * BEAT 01 — 4:30 AM (CINEMATIC LIVING NIGHT SKY + STARTER GATEWAY)
 * Deep night atmosphere with glowing moon, twinkling starfield, drifting clouds,
 * gentle camera drift, continuous BGM, and the transition from 4:27 to 4:30 AM.
 * Includes a restrained Cinematic Starter Gateway ("Tap to begin") that unlocks audio
 * and begins BGM from the start.
 * Typewriter "Finally." appears with an inline cursor attached directly to the text.
 */

import { content } from '../content/content.js';
import { state } from '../js/interactionState.js';

export class Scene01Clock {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
    this.typeInterval = null;
    this.started = false;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene01;

      // Procedural Stars
      const starCount = 48;
      let starsHTML = '';
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 75;
        const size = (Math.random() * 2 + 1).toFixed(1);
        const opacity = (Math.random() * 0.65 + 0.25).toFixed(2);
        const animDelay = (Math.random() * 4).toFixed(1);
        const duration = (2.5 + Math.random() * 2).toFixed(1);
        starsHTML += `
          <div style="position:absolute;top:${y}%;left:${x}%;width:${size}px;height:${size}px;border-radius:50%;background:#ffffff;opacity:${opacity};box-shadow:0 0 6px rgba(255,255,255,0.9);animation:starTwinkle ${duration}s ${animDelay}s infinite ease-in-out;"></div>
        `;
      }

      container.innerHTML = `
        <div class="night-sky-env" id="s1-viewport" style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;background:radial-gradient(ellipse at 50% 30%, #0f1c3f 0%, #070c18 65%, #020612 100%);">
          
          <!-- Moving Starfield Layer -->
          <div id="s1-stars" style="position:absolute;inset:0;pointer-events:none;">
            ${starsHTML}
          </div>

          <!-- Procedural Glowing Moon with Surface Detail & Corona -->
          <div class="moon-wrapper" id="s1-moon" style="position:absolute;top:14%;left:50%;transform:translateX(-50%);z-index:2;">
            <div class="moon-corona"></div>
            <div class="moon-disc">
              <div class="moon-crater" style="top:22%;left:30%;width:16px;height:16px;"></div>
              <div class="moon-crater" style="top:48%;left:52%;width:20px;height:20px;"></div>
              <div class="moon-crater" style="top:60%;left:22%;width:12px;height:12px;"></div>
              <div class="moon-crater" style="top:32%;left:66%;width:10px;height:10px;"></div>
            </div>
          </div>

          <!-- Multi-Speed Drifting Clouds Layer (Visibly moving across the living scene) -->
          <div class="clouds-drift-layer" id="s1-clouds" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3;will-change:transform;">
            <div class="drifting-cloud" id="s1-cloud-1" style="top:8%;left:-15%;width:420px;height:130px;opacity:0.65;background:radial-gradient(ellipse at 50% 50%, rgba(148,163,184,0.45) 0%, rgba(15,23,42,0) 70%);"></div>
            <div class="drifting-cloud" id="s1-cloud-2" style="top:22%;left:10%;width:480px;height:150px;opacity:0.55;background:radial-gradient(ellipse at 50% 50%, rgba(203,213,225,0.4) 0%, rgba(15,23,42,0) 70%);"></div>
            <div class="drifting-cloud" id="s1-cloud-3" style="top:40%;left:-10%;width:440px;height:120px;opacity:0.45;background:radial-gradient(ellipse at 50% 50%, rgba(148,163,184,0.35) 0%, rgba(15,23,42,0) 70%);"></div>
          </div>

          <!-- Cinematic Starter Gateway Invitation Overlay (Soft Ivory Film Style) -->
          <div id="s1-starter-gate" class="starter-gate-overlay" style="position:absolute;inset:0;z-index:30;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:rgba(7,12,24,0.4);backdrop-filter:blur(4px);transition:opacity 0.4s ease;">
            <div class="starter-play-pulse">
              <div class="starter-play-ring" style="border-color:rgba(255,255,255,0.3);"></div>
              <div class="starter-play-disc" style="width:62px;height:62px;border-radius:50%;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.4);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 30px rgba(0,0,0,0.6);backdrop-filter:blur(8px);">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#ffffff" style="margin-left:3px;">
                  <polygon points="6 3 20 12 6 21 6 3"></polygon>
                </svg>
              </div>
            </div>
            <div class="starter-whisper-text" style="margin-top:16px;font-family:var(--font-mono);font-size:0.72rem;letter-spacing:0.22em;color:#f8fafc;text-transform:uppercase;font-weight:500;text-shadow:0 2px 10px rgba(0,0,0,0.8);opacity:0.9;">
              ${c.starterText}
            </div>
          </div>

          <!-- Center Atmospheric Staging -->
          <div id="s1-content-box" style="display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10;text-align:center;padding:24px;max-width:380px;width:90%;">
            <div class="text-whisper" id="s1-date" style="opacity:0;letter-spacing:0.22em;color:var(--cinema-text-muted);font-size:0.72rem;font-weight:600;">
              ${c.dateHeader}
            </div>
            
            <div class="text-timestamp" id="s1-clock" style="margin:16px 0 10px 0;opacity:0;text-shadow:0 0 25px rgba(255,255,255,0.2);font-size:clamp(2.5rem,8.5vw,3.8rem);font-family:var(--font-mono);font-weight:700;color:#f8fafc;letter-spacing:0.04em;">
              ${c.clockSequence[0]}
            </div>
            
            <!-- Typewriter Container (Zero cursor) -->
            <div id="s1-text-wrap" style="opacity:0;min-height:1.8em;display:flex;align-items:center;justify-content:center;">
              <span class="text-dialogue" id="s1-msg" style="color:var(--cinema-text);font-size:1.35rem;font-style:italic;font-family:var(--font-display);line-height:1.2;"></span>
            </div>
          </div>
        </div>
      `;

      const viewport = container.querySelector('#s1-viewport');
      const moon = container.querySelector('#s1-moon');
      const cloud1 = container.querySelector('#s1-cloud-1');
      const cloud2 = container.querySelector('#s1-cloud-2');
      const cloud3 = container.querySelector('#s1-cloud-3');
      const starterGate = container.querySelector('#s1-starter-gate');
      const dateEl = container.querySelector('#s1-date');
      const clockEl = container.querySelector('#s1-clock');
      const textWrap = container.querySelector('#s1-text-wrap');
      const msgEl = container.querySelector('#s1-msg');

      const startSequence = () => {
        if (this.started) return;
        this.started = true;

        // 1. Unlock Audio and Start Continuous BGM Immediately from 0:00
        try {
          this.audio.startMusic(1.5);
        } catch (e) {}

        // 2. Dissolve Starter Gateway Invitation
        if (starterGate) {
          starterGate.style.pointerEvents = 'none';
          gsap.to(starterGate, {
            opacity: 0,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => {
              starterGate.style.display = 'none';
            }
          });
        }

        // 3. Build & Run Cinematic Timeline (Living sky, deliberate time passing)
        const totalDuration = 4.4;
        this.tl = gsap.timeline({
          onComplete: () => {
            this.manager.next();
            resolve();
          }
        });

        const cadence = c.timing.clockCadence || 0.65;

        this.tl
          // Active environmental cloud movement across the entire shot
          .to(cloud1, { x: 220, duration: totalDuration, ease: 'none' }, 0)
          .to(cloud2, { x: 180, duration: totalDuration, ease: 'none' }, 0)
          .to(cloud3, { x: 240, duration: totalDuration, ease: 'none' }, 0)

          // Moon & Camera gentle breath
          .fromTo(moon, { scale: 0.95, opacity: 0.8 }, { scale: 1.0, opacity: 1, duration: 2.0, ease: 'power2.out' }, 0)
          .fromTo(viewport, { scale: 1.02 }, { scale: 1.0, duration: totalDuration, ease: 'power1.out' }, 0)
          
          // Date Whisper
          .to(dateEl, { opacity: 0.85, y: 0, duration: 0.4, ease: 'power2.out' }, 0.05)
          
          // Clock enters at 4:27 AM
          .to(clockEl, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.15)
          
          // Deliberate, living time passing: 4:27 -> 4:28 -> 4:29 -> 4:30 AM
          .call(() => { clockEl.textContent = c.clockSequence[1]; }, [], 0.15 + cadence * 1)
          .call(() => { clockEl.textContent = c.clockSequence[2]; }, [], 0.15 + cadence * 2)
          .call(() => { 
            clockEl.textContent = c.clockSequence[3]; 
            clockEl.style.transform = 'scale(1.04)';
          }, [], 0.15 + cadence * 3)
          
          // "Finally." appears with time to register
          .to(textWrap, { opacity: 1, duration: 0.3 }, 0.15 + cadence * 3 + 0.25)
          .call(() => {
            const text = c.finallyText;
            let i = 0;
            this.typeInterval = setInterval(() => {
              if (i < text.length) {
                msgEl.textContent += text[i];
                i++;
              } else {
                clearInterval(this.typeInterval);
                this.typeInterval = null;
              }
            }, 60);
          }, [], 0.15 + cadence * 3 + 0.3)
          
          // Hold for reading while sky continues to live
          .to({}, { duration: c.timing.finallyHold || 1.4 }, 0.15 + cadence * 3 + 0.6)
          
          // Cinematic dissolve directly into Beat 02
          .to([dateEl, clockEl, textWrap], { opacity: 0, y: -8, duration: 0.4, ease: 'power2.in' }, totalDuration - 0.4)
          .to(moon, { opacity: 0.3, scale: 0.92, duration: 0.4, ease: 'power2.in' }, totalDuration - 0.4);
      };

      // If audio already started (e.g. replaying), auto proceed quickly
      if (state.audioStarted) {
        if (starterGate) starterGate.style.display = 'none';
        startSequence();
      } else {
        // Wait for single tap anywhere or on starter gateway
        starterGate.addEventListener('click', (e) => {
          e.stopPropagation();
          startSequence();
        });
        viewport.addEventListener('click', (e) => {
          startSequence();
        }, { once: true });
      }
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


