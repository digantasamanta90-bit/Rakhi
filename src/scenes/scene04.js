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
      const t = c.timing || {};
      const assets = c.assets || {};

      container.innerHTML = `
        <div class="morning-sky-env" id="s4-viewport" style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(180deg, #0284c7 0%, #38bdf8 55%, #fef08a 100%);">
          
          <!-- Morning Sunlight Corona & Drifting Clouds (Crisp Sky) -->
          <div class="morning-sun-corona" style="opacity:0.55;filter:none;"></div>
          <div class="drifting-cloud" style="top:12%;left:0;width:240px;height:65px;filter:none;background:radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 60%, transparent 80%);animation-duration:22s;"></div>
          <div class="drifting-cloud" style="top:25%;left:0;width:280px;height:75px;filter:none;background:radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 60%, transparent 80%);animation-duration:30s;animation-delay:-10s;opacity:0.7;"></div>

          <!-- Main Call Stage -->
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10;gap:18px;padding:20px;width:100%;max-width:340px;">
            <div class="text-timestamp" id="s4-clock" style="font-size:clamp(2.2rem,8.5vw,3.6rem);color:#ffffff;text-shadow:0 0 25px rgba(251,191,36,0.4);">${c.clockSequence[0]}</div>

            <!-- Phone UI Card (Translucent Glassmorphic Style) -->
            <div class="phone-mockup" id="phone-ui" style="opacity:0;transform:translateY(35px) scale(0.92);background:rgba(15,23,42,0.45);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.28);box-shadow:0 16px 40px rgba(0,0,0,0.35);">
              <div class="caller-avatar" style="border:2px solid var(--rakhi-gold);box-shadow:0 0 20px rgba(251,191,36,0.3);">
                <img src="${assets.callerAvatar || 'assets/portraits/anwesha1.png'}" alt="${c.callerName || 'Anwesha'}" onerror="this.src='${assets.callerAvatarFallback || 'assets/portraits/anwesha_hero.png'}'">
              </div>
              <div class="incoming-tag" style="color:var(--rakhi-gold);">${c.incomingCallTag}</div>
              <div class="caller-name" style="color:#ffffff;">${c.callerName}</div>

              <div class="call-actions" id="call-actions">
                <button class="call-btn decline" id="decline-call" aria-label="Decline Call" style="background:#dc2626;">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1 0-1.41C2.5 9.4 6.95 8 12 8s9.5 1.4 11.71 3.67c.39.39.39 1.02 0 1.41l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>
                </button>
                <button class="call-btn accept" id="accept-call" aria-label="Accept Call" style="background:#16a34a;">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1.01A11.36 11.36 0 0 1 8.57 3.99c0-.55-.45-1-1-1H4.07c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c-.01-.55-.46-1.01-1.06-1.12z"/></svg>
                </button>
              </div>

              <div class="chat-bubble" id="chat-msg" style="display:none;opacity:0;transform:translateY(15px);background:rgba(15,23,42,0.65);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.22);">
                <div class="text-whisper" style="color:var(--rakhi-gold);margin-bottom:6px;font-size:0.62rem;">${c.promptTag}</div>
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

      const tickInt = t.tickInterval ?? 0.9;
      const phoneEnter = t.phoneEnterDuration ?? 0.75;
      const reactHold = (t.reactionHold ?? 1.8) * 1000;

      this.tl = gsap.timeline();

      this.tl
        .to({}, { duration: tickInt })
        .call(() => { clockEl.textContent = c.clockSequence[1]; })
        .to({}, { duration: tickInt })
        .call(() => {
          clockEl.textContent = c.clockSequence[2];
          clockEl.style.color = '#dc2626';
        })
        .to({}, { duration: 0.4 })
        .to(phoneUi, { opacity: 1, y: 0, scale: 1, duration: phoneEnter, ease: 'back.out(1.3)' })
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
            }, reactHold);
          }
        });
      };

      acceptBtn.addEventListener('click', handleAnswer);
      declineBtn.addEventListener('click', handleAnswer);
    });
  }

  startRinging(phoneUi) {
    const c = content.scene04;
    const t = c.timing || {};
    const vibInt = t.vibrateInterval ?? 1300;

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
    this.ringInterval = setInterval(triggerPhoneVibrateAnim, vibInt);
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
