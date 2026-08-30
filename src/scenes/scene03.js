import { content } from '../content/content.js';

export class Scene03Alarms {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
    this.alarmCount = 0;
    this.vibrateInterval = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene03;

      container.innerHTML = `
        <div class="bedroom-dawn-env" id="s3-viewport" style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background:#070c18;">
          
          <!-- Master Architectural Panoramic Window -->
          <div id="s3-window-frame" style="position:absolute;top:4%;left:6%;right:6%;bottom:10%;border-radius:12px;overflow:hidden;border:6px solid #1e293b;box-shadow:inset 0 0 50px rgba(0,0,0,0.85), 0 20px 60px rgba(0,0,0,0.9);background:#070c18;">
            
            <!-- Sky Gradient Layer (Continuously shifts from Deep Night -> Dawn -> Radiant Day) -->
            <div id="s3-sky-gradient" style="position:absolute;inset:0;background:linear-gradient(180deg, #020617 0%, #0f172a 40%, #0f1c3f 75%, #334155 100%);transition:background 1.5s ease;"></div>

            <!-- Rising Sun Disc -->
            <div id="s3-rising-sun" style="position:absolute;bottom:-60px;left:52%;transform:translateX(-50%);width:95px;height:95px;border-radius:50%;background:radial-gradient(circle, #fef08a 0%, #fbbf24 60%, rgba(245,158,11,0) 85%);box-shadow:0 0 50px #fbbf24;opacity:0.25;transition:all 1.6s ease;z-index:2;"></div>

            <!-- Moving Exterior Clouds Layer -->
            <div class="clouds-drift-layer" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3;opacity:0.55;">
              <div class="drifting-cloud cloud-speed-1" style="top:12%;left:-15%;width:340px;height:100px;background:radial-gradient(ellipse at 50% 50%, rgba(203,213,225,0.4) 0%, rgba(15,23,42,0) 70%);"></div>
              <div class="drifting-cloud cloud-speed-2" style="top:28%;left:15%;width:380px;height:110px;background:radial-gradient(ellipse at 50% 50%, rgba(254,240,138,0.3) 0%, rgba(15,23,42,0) 70%);"></div>
            </div>

            <!-- Distant Horizon Silhouettes (Buildings, Rooftops, Tree Canopies, Antennae) -->
            <div id="s3-horizon-silhouettes" style="position:absolute;bottom:0;left:0;right:0;height:35%;z-index:4;pointer-events:none;opacity:0.85;">
              <svg viewBox="0 0 800 160" preserveAspectRatio="none" style="width:100%;height:100%;">
                <!-- Far distant skyline -->
                <path d="M 0 160 L 0 110 L 40 110 L 40 85 L 75 85 L 75 110 L 120 110 L 140 70 L 165 70 L 180 110 L 240 110 L 260 95 L 300 95 L 320 120 L 380 120 L 400 65 L 430 65 L 445 110 L 520 110 L 550 90 L 580 90 L 610 120 L 680 120 L 710 80 L 740 80 L 760 115 L 800 115 L 800 160 Z" fill="#090d16" opacity="0.75"/>
                <!-- Near rooftop silhouettes & lush tree curves -->
                <path d="M 0 160 L 0 130 Q 30 100 70 125 L 110 125 L 130 95 L 170 95 L 190 130 Q 230 90 280 135 L 350 135 L 370 105 L 420 105 L 450 140 Q 490 95 550 130 L 620 130 L 650 110 L 700 110 L 730 140 Q 770 115 800 130 L 800 160 Z" fill="#020617"/>
              </svg>
            </div>

            <!-- Architectural Window Mullions / Panes Structure -->
            <div style="position:absolute;top:0;bottom:0;left:50%;width:5px;background:#1e293b;transform:translateX(-50%);z-index:6;box-shadow:0 0 8px rgba(0,0,0,0.6);"></div>
            <div style="position:absolute;left:0;right:0;top:48%;height:5px;background:#1e293b;z-index:6;box-shadow:0 0 8px rgba(0,0,0,0.6);"></div>

            <!-- Glass Diagonal Morning Light Sheen -->
            <div style="position:absolute;inset:0;background:linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 42%, rgba(254,240,138,0.06) 80%);pointer-events:none;z-index:7;"></div>
          </div>

          <!-- Bottom Room Sill Shadow -->
          <div style="position:absolute;bottom:0;width:100%;height:18%;background:linear-gradient(180deg, transparent 0%, #070c18 80%);z-index:10;pointer-events:none;"></div>

          <!-- Center Digital Clock & Alarm Interactive Floating Display (Completely Transparent / See-Through Window) -->
          <div id="s3-clock-box" style="position:relative;z-index:20;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:12px;background:transparent;border:none;box-shadow:none;backdrop-filter:none;max-width:320px;width:88%;">
            
            <div class="alarm-icon-wrap" id="alarm-icon-box" style="position:relative;display:flex;align-items:center;justify-content:center;">
              <svg class="alarm-icon-svg" id="alarm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:42px;height:42px;color:#f8fafc;filter:drop-shadow(0 2px 14px rgba(0,0,0,0.85));">
                <circle cx="12" cy="13" r="8"></circle>
                <path d="M12 9v4l2 2"></path>
                <path d="M5 3L2 6"></path>
                <path d="M22 6l-3-3"></path>
              </svg>
            </div>

            <!-- Time Display (Neutral Ivory with Strong Contrast Text Shadow) -->
            <div class="text-timestamp" id="alarm-time" style="font-size:clamp(2.4rem,8.5vw,3.4rem);color:#f8fafc;font-family:var(--font-mono);font-weight:700;letter-spacing:0.04em;text-shadow:0 3px 20px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.8);">
              ${c.alarms[0].time}
            </div>
            
            <div class="text-whisper" id="alarm-label" style="color:rgba(255,255,255,0.85);letter-spacing:0.2em;font-size:0.75rem;font-weight:700;text-shadow:0 2px 12px rgba(0,0,0,0.9);">
              ${c.alarms[0].label}
            </div>

            <button class="cinema-control-btn alarm-dismiss-btn" id="dismiss-btn" style="width:auto;height:auto;margin-top:6px;padding:9px 26px;border-radius:24px;background:rgba(15,23,42,0.45);border:1.5px solid rgba(255,255,255,0.4);color:#f8fafc;font-size:0.86rem;font-weight:600;box-shadow:0 6px 24px rgba(0,0,0,0.7);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);cursor:pointer;transition:transform 0.15s ease, background 0.2s ease;">
              <span>${c.dismissBtnText}</span>
            </button>
          </div>

          <!-- Emotional Reflection Dialogue -->
          <div id="eyes-msg-box" style="position:absolute;bottom:12%;z-index:25;text-align:center;width:90%;max-width:340px;pointer-events:none;">
            <div class="text-dialogue" id="eyes-msg" style="opacity:0;font-style:italic;color:#f8fafc;font-size:clamp(1.1rem,3.8vw,1.3rem);text-shadow:0 2px 14px rgba(0,0,0,0.9);">
              "${c.dialogue}"
            </div>
          </div>

        </div>
      `;

      const icon = container.querySelector('#alarm-icon');
      const timeEl = container.querySelector('#alarm-time');
      const labelEl = container.querySelector('#alarm-label');
      const dismissBtn = container.querySelector('#dismiss-btn');
      const eyesMsg = container.querySelector('#eyes-msg');
      const clockBox = container.querySelector('#s3-clock-box');
      const skyGradient = container.querySelector('#s3-sky-gradient');
      const risingSun = container.querySelector('#s3-rising-sun');

      const t = c.timing || {};
      const initDelay = (t.initialDelay ?? 0.25) * 1000;
      const transDelay = (t.dismissTransition ?? 0.45) * 1000;
      const diagFade = t.dialogueFadeDuration ?? 0.9;
      const diagHold = (t.dialogueHold ?? 1.2) * 1000;

      const startAlarmRing = () => {
        // Play trimmed local alarm audio immediately with automatic BGM ducking
        try {
          if (typeof this.audio.playAlarmSound === 'function') {
            this.audio.playAlarmSound();
          }
        } catch (e) {}

        // Visual alarm ring animation & device vibration
        this.vibrateInterval = setInterval(() => {
          if (icon) {
            gsap.fromTo(icon, { rotation: -12 }, { rotation: 12, duration: 0.05, repeat: 7, yoyo: true, ease: 'power1.inOut' });
          }
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate([140, 70, 140]); } catch (e) {}
          }
        }, 750);
      };

      const stopAlarmRing = (unduck = false) => {
        if (this.vibrateInterval) clearInterval(this.vibrateInterval);
        gsap.killTweensOf(icon);
        gsap.set(icon, { rotation: 0 });
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try { navigator.vibrate(0); } catch (e) {}
        }
        try {
          if (typeof this.audio.stopAlarmSound === 'function') {
            this.audio.stopAlarmSound(unduck);
          }
        } catch (e) {}
      };

      const dawnSkyTransitions = [
        'linear-gradient(180deg, #020617 0%, #0f172a 40%, #0f1c3f 75%, #334155 100%)',
        'linear-gradient(180deg, #0f172a 0%, #be185d 40%, #ea580c 70%, #fbbf24 100%)',
        'linear-gradient(180deg, #0284c7 0%, #38bdf8 45%, #fed7aa 80%, #fef08a 100%)'
      ];
      const sunPositions = [
        { bottom: '-50px', opacity: 0.3, scale: 1.0 },
        { bottom: '25px', opacity: 0.8, scale: 1.3 },
        { bottom: '48%', opacity: 1.0, scale: 1.7 }
      ];

      // Trigger first alarm promptly after configured settling delay
      setTimeout(() => {
        startAlarmRing();
      }, initDelay);

      dismissBtn.addEventListener('click', () => {
        this.alarmCount++;

        if (this.alarmCount < 3) {
          // Temporarily pause alarm ringing between dismissals
          stopAlarmRing(false);
          
          gsap.to([icon, timeEl, labelEl], { opacity: 0.3, scale: 0.96, duration: 0.2 });
          
          setTimeout(() => {
            timeEl.textContent = c.alarms[this.alarmCount].time;
            labelEl.textContent = c.alarms[this.alarmCount].label;
            
            // Advance sky gradient and elevate rising sun
            if (skyGradient) {
              skyGradient.style.background = dawnSkyTransitions[this.alarmCount];
            }
            if (risingSun) {
              risingSun.style.bottom = sunPositions[this.alarmCount].bottom;
              risingSun.style.opacity = sunPositions[this.alarmCount].opacity;
              risingSun.style.transform = `translateX(-50%) scale(${sunPositions[this.alarmCount].scale})`;
            }

            gsap.to([icon, timeEl, labelEl], { opacity: 1, scale: 1, duration: 0.3 });
            startAlarmRing();
          }, transDelay);
        } else {
          // Final 6:00 AM dismissal -> Full bright morning daylight!
          stopAlarmRing(true);
          dismissBtn.style.display = 'none';

          if (skyGradient) {
            skyGradient.style.background = 'linear-gradient(180deg, #0284c7 0%, #38bdf8 45%, #fed7aa 100%)';
          }
          if (risingSun) {
            risingSun.style.bottom = '55%';
            risingSun.style.opacity = '1';
            risingSun.style.transform = 'translateX(-50%) scale(2.0)';
          }

          gsap.to(clockBox, {
            opacity: 0,
            y: -15,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              gsap.to(eyesMsg, {
                opacity: 1,
                y: 0,
                duration: diagFade,
                ease: 'power2.out',
                onComplete: () => {
                  setTimeout(() => {
                    this.manager.next();
                    resolve();
                  }, diagHold);
                }
              });
            }
          });
        }
      });
    });
  }

  exit() {
    if (this.vibrateInterval) clearInterval(this.vibrateInterval);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(0); } catch (e) {}
    }
    try {
      if (typeof this.audio.stopAlarmSound === 'function') {
        this.audio.stopAlarmSound(true);
      }
    } catch (e) {}
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


