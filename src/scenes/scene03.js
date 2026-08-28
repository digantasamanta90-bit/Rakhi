/**
 * BEAT 03 — THREE ALARMS
 * Total darkness. Three alarm dismissals. Silence.
 * Hardware device vibration & audio synthesis on alarms.
 * "…but my eyes never opened."
 * Styled in the Velvet Night × Antique Memory aesthetic.
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
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;gap:16px;">
          <svg class="alarm-icon-svg" id="alarm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="13" r="8"></circle>
            <path d="M12 9v4l2 2"></path>
            <path d="M5 3L2 6"></path>
            <path d="M22 6l-3-3"></path>
          </svg>
          <div class="text-timestamp" id="alarm-time">5:30 AM</div>
          <div class="text-whisper" id="alarm-label" style="color:var(--cinema-accent);">ALARM 1 OF 3</div>
          <button class="alarm-dismiss-btn" id="dismiss-btn">Dismiss</button>
          <div class="text-dialogue" id="eyes-msg" style="opacity:0;margin-top:24px;font-style:italic;color:var(--cinema-accent);">
            "…but my eyes never opened."
          </div>
        </div>
      `;

      const icon = container.querySelector('#alarm-icon');
      const timeEl = container.querySelector('#alarm-time');
      const labelEl = container.querySelector('#alarm-label');
      const dismissBtn = container.querySelector('#dismiss-btn');
      const eyesMsg = container.querySelector('#eyes-msg');

      const startVibrate = () => {
        this.vibrateInterval = setInterval(() => {
          if (icon) {
            gsap.fromTo(icon, { rotation: -12 }, { rotation: 12, duration: 0.06, repeat: 6, yoyo: true, ease: 'power1.inOut' });
          }
          try {
            this.audio.playAlarmBeep();
            this.audio.playPhoneVibrate();
          } catch(e) {}
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try {
              navigator.vibrate([140, 80, 140]);
            } catch(e) {}
          }
        }, 600);
      };

      const stopVibrate = () => {
        if (this.vibrateInterval) clearInterval(this.vibrateInterval);
        gsap.killTweensOf(icon);
        gsap.set(icon, { rotation: 0 });
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try {
            navigator.vibrate(0);
          } catch(e) {}
        }
      };

      const alarmTimes = ['5:30 AM', '5:45 AM', '6:00 AM'];
      const alarmLabels = ['ALARM 1 OF 3', 'ALARM 2 OF 3', 'ALARM 3 OF 3'];

      startVibrate();

      dismissBtn.addEventListener('click', () => {
        this.alarmCount++;
        stopVibrate();

        if (this.alarmCount < 3) {
          gsap.to([icon, timeEl, labelEl], { opacity: 0.2, duration: 0.3 });
          setTimeout(() => {
            timeEl.textContent = alarmTimes[this.alarmCount];
            labelEl.textContent = alarmLabels[this.alarmCount];
            gsap.to([icon, timeEl, labelEl], { opacity: 1, duration: 0.4 });
            startVibrate();
          }, 800);
        } else {
          dismissBtn.style.display = 'none';
          gsap.to([icon, timeEl, labelEl], {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
              gsap.to(eyesMsg, {
                opacity: 1,
                duration: 1.5,
                delay: 0.6,
                onComplete: () => {
                  setTimeout(() => {
                    this.manager.next();
                    resolve();
                  }, 2500);
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
      try {
        navigator.vibrate(0);
      } catch(e) {}
    }
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
