/**
 * BEAT 03 — THREE ALARMS
 * Bedroom environment transitioning from pre-dawn to early morning light.
 * Glowing clock, window blinds with dawn light, subtle curtain drift.
 * Uses real local alarm audio (assets/music/alarm.mp3) with automatic BGM ducking.
 * 3 alarms: 5:30 AM → 5:45 AM → 6:00 AM.
 * Closes on: "…but my eyes never opened."
 */

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
      container.innerHTML = `
        <div class="bedroom-dawn-env" id="s3-viewport" style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;">
          
          <!-- Background Bedroom Window with shifting dawn tint -->
          <div class="dawn-window-frame" id="s3-window">
            ${Array.from({ length: 14 }).map(() => `<div class="window-blind-slat"></div>`).join('')}
            <div class="dawn-curtain" id="s3-curtain"></div>
          </div>

          <!-- Ambient Bedside Table Shadow -->
          <div style="position:absolute;bottom:0;width:100%;height:35%;background:linear-gradient(180deg, transparent 0%, rgba(7,12,24,0.95) 60%);pointer-events:none;"></div>

          <!-- Center Digital Clock & Alarm UI -->
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10;gap:14px;padding:20px;text-align:center;">
            
            <div class="alarm-icon-wrap" id="alarm-icon-box" style="position:relative;display:flex;align-items:center;justify-content:center;">
              <svg class="alarm-icon-svg" id="alarm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:52px;height:52px;color:var(--rakhi-red);filter:drop-shadow(0 0 16px rgba(220,38,38,0.6));">
                <circle cx="12" cy="13" r="8"></circle>
                <path d="M12 9v4l2 2"></path>
                <path d="M5 3L2 6"></path>
                <path d="M22 6l-3-3"></path>
              </svg>
            </div>

            <div class="text-timestamp" id="alarm-time" style="font-size:clamp(2.4rem,9vw,4rem);color:var(--cinema-text);text-shadow:0 0 30px rgba(220,38,38,0.4);">
              5:30 AM
            </div>
            
            <div class="text-whisper" id="alarm-label" style="color:var(--rakhi-gold);letter-spacing:0.18em;">
              ALARM 1 OF 3
            </div>

            <button class="alarm-dismiss-btn" id="dismiss-btn" style="margin-top:6px;min-width:140px;background:rgba(15,23,42,0.9);border:1.5px solid rgba(251,191,36,0.35);color:var(--cinema-text);box-shadow:0 6px 20px rgba(0,0,0,0.6);">
              <span>Dismiss Alarm</span>
            </button>

            <div class="text-dialogue" id="eyes-msg" style="opacity:0;margin-top:20px;font-style:italic;color:var(--cinema-accent);font-size:1.18rem;">
              "…but my eyes never opened."
            </div>
          </div>
        </div>
      `;

      const icon = container.querySelector('#alarm-icon');
      const timeEl = container.querySelector('#alarm-time');
      const labelEl = container.querySelector('#alarm-label');
      const dismissBtn = container.querySelector('#dismiss-btn');
      const eyesMsg = container.querySelector('#eyes-msg');
      const windowFrame = container.querySelector('#s3-window');

      const startAlarmRing = () => {
        // Play actual local alarm audio with automatic BGM ducking
        try {
          if (typeof this.audio.playAlarmSound === 'function') {
            this.audio.playAlarmSound();
          }
        } catch (e) {}

        // Visual alarm ring animation & vibration
        this.vibrateInterval = setInterval(() => {
          if (icon) {
            gsap.fromTo(icon, { rotation: -14 }, { rotation: 14, duration: 0.05, repeat: 7, yoyo: true, ease: 'power1.inOut' });
          }
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate([160, 90, 160]); } catch (e) {}
          }
        }, 800);
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

      const alarmTimes = ['5:30 AM', '5:45 AM', '6:00 AM'];
      const alarmLabels = ['ALARM 1 OF 3', 'ALARM 2 OF 3', 'ALARM 3 OF 3'];
      const dawnTints = [
        'linear-gradient(180deg, #1e1b4b 0%, #be185d 60%, #f59e0b 100%)',
        'linear-gradient(180deg, #1e1b4b 0%, #d97706 60%, #fbbf24 100%)',
        'linear-gradient(180deg, #0284c7 0%, #38bdf8 60%, #fef08a 100%)'
      ];

      // Trigger first alarm after short settling
      setTimeout(() => {
        startAlarmRing();
      }, 500);

      dismissBtn.addEventListener('click', () => {
        this.alarmCount++;

        if (this.alarmCount < 3) {
          // Temporarily stop ringing between alarm dismissals
          stopAlarmRing(false);
          
          gsap.to([icon, timeEl, labelEl], { opacity: 0.25, scale: 0.95, duration: 0.3 });
          
          setTimeout(() => {
            timeEl.textContent = alarmTimes[this.alarmCount];
            labelEl.textContent = alarmLabels[this.alarmCount];
            
            // Advance dawn window light
            if (windowFrame) {
              windowFrame.style.background = dawnTints[this.alarmCount];
            }

            gsap.to([icon, timeEl, labelEl], { opacity: 1, scale: 1, duration: 0.4 });
            startAlarmRing();
          }, 850);
        } else {
          // Final dismissal
          stopAlarmRing(true);
          dismissBtn.style.display = 'none';

          gsap.to([icon, timeEl, labelEl], {
            opacity: 0,
            y: -15,
            duration: 0.8,
            onComplete: () => {
              gsap.to(eyesMsg, {
                opacity: 1,
                y: 0,
                duration: 1.6,
                delay: 0.4,
                onComplete: () => {
                  setTimeout(() => {
                    this.manager.next();
                    resolve();
                  }, 2200);
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


