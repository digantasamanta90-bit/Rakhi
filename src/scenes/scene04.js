import { content } from '../content/content.js';

export class Scene04MissedCall {
  constructor({ manager, audio, particles }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.tl = null;
    this.ringInterval = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene04;

      container.innerHTML = `
        <div class="morning-sky-env" id="s4-viewport" style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;">
          
          <!-- Morning Sunlight Corona & Drifting Clouds -->
          <div class="morning-sun-corona"></div>
          <div class="drifting-cloud" style="top:12%;left:0;width:300px;height:90px;animation-duration:22s;"></div>
          <div class="drifting-cloud" style="top:25%;left:0;width:340px;height:100px;animation-duration:30s;animation-delay:-10s;opacity:0.6;"></div>

          <!-- Main Call Stage -->
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10;gap:18px;padding:20px;width:100%;max-width:340px;">
            <div class="text-timestamp" id="s4-clock" style="font-size:clamp(2.2rem,8.5vw,3.6rem);color:#ffffff;text-shadow:0 0 25px rgba(251,191,36,0.4);">7:29:58</div>

            <!-- Phone UI Card -->
            <div class="phone-mockup" id="phone-ui" style="opacity:0;transform:translateY(35px) scale(0.92);background:linear-gradient(145deg, #1e293b, #0f172a);border:1px solid rgba(255,255,255,0.18);">
              <div class="caller-avatar" style="border:2px solid var(--rakhi-gold);box-shadow:0 0 20px rgba(251,191,36,0.3);">
                <img src="assets/portraits/anwesha1.png" alt="Anwesha" onerror="this.src='assets/portraits/anwesha_hero.png'">
              </div>
              <div class="incoming-tag" style="color:var(--rakhi-gold);">Incoming Call</div>
              <div class="caller-name" style="color:#ffffff;">Anwesha </div>

              <div class="call-actions" id="call-actions">
                <button class="call-btn decline" id="decline-call" aria-label="Decline Call" style="background:#dc2626;">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1 0-1.41C2.5 9.4 6.95 8 12 8s9.5 1.4 11.71 3.67c.39.39.39 1.02 0 1.41l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>
                </button>
                <button class="call-btn accept" id="accept-call" aria-label="Accept Call" style="background:#16a34a;">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1.01A11.36 11.36 0 0 1 8.57 3.99c0-.55-.45-1-1-1H4.07c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c-.01-.55-.46-1.01-1.06-1.12z"/></svg>
                </button>
              </div>

              <div class="chat-bubble" id="chat-msg" style="display:none;opacity:0;transform:translateY(15px);background:rgba(15,23,42,0.92);border:1px solid rgba(255,255,255,0.15);">
                <div class="text-whisper" style="color:var(--rakhi-gold);margin-bottom:6px;font-size:0.62rem;">UTTER DISAPPOINTMENT • 7:30 AM</div>
                <p class="text-dialogue" style="font-size:1.08rem;text-align:left;max-width:none;color:#f8fafc;font-style:italic;">
                  "${c.promptText}"
                </p>
              </div>
            </div>
          </div>
        </div>
      `;

      const clockEl = container.querySelector('#s4-clock');
      const phoneUi = container.querySelector('#phone-ui');
      const acceptBtn = container.querySelector('#accept-call');
      const declineBtn = container.querySelector('#decline-call');
      const callActions = container.querySelector('#call-actions');
      const chatMsg = container.querySelector('#chat-msg');

      this.tl = gsap.timeline();

      this.tl
        .to({}, { duration: 0.9 })
        .call(() => { clockEl.textContent = '7:29:59'; })
        .to({}, { duration: 0.9 })
        .call(() => {
          clockEl.textContent = '7:30:00';
          clockEl.style.color = '#dc2626';
        })
        .to({}, { duration: 0.4 })
        .to(phoneUi, { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'back.out(1.3)' })
        .call(() => { this.startRinging(phoneUi); });

      const handleAnswer = () => {
        this.stopRinging(true);
        callActions.style.display = 'none';
        chatMsg.style.display = 'block';

        gsap.to(chatMsg, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          onComplete: () => {
            setTimeout(() => {
              this.manager.next();
              resolve();
            }, 1800);
          }
        });
      };

      acceptBtn.addEventListener('click', handleAnswer);
      declineBtn.addEventListener('click', handleAnswer);
    });
  }

  startRinging(phoneUi) {
    // Start actual local ringtone audio with automatic BGM ducking
    try {
      if (typeof this.audio.playRingtoneSound === 'function') {
        this.audio.playRingtoneSound();
      }
    } catch (e) {}

    const triggerPhoneVibrateAnim = () => {
      if (phoneUi) {
        gsap.fromTo(phoneUi, { x: -4 }, { x: 4, duration: 0.05, repeat: 7, yoyo: true });
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate([180, 100, 180]); } catch (e) {}
      }
    };

    triggerPhoneVibrateAnim();
    this.ringInterval = setInterval(triggerPhoneVibrateAnim, 1300);
  }

  stopRinging(unduck = true) {
    if (this.ringInterval) clearInterval(this.ringInterval);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(0); } catch (e) {}
    }
    try {
      if (typeof this.audio.stopRingtoneSound === 'function') {
        this.audio.stopRingtoneSound(unduck);
      }
    } catch (e) {}
  }

  exit() {
    this.stopRinging(true);
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}


