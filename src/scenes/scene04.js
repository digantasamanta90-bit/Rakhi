/**
 * BEAT 04 — 7:30 AM / THE CALL
 * Clock counts to 7:30. Phone lights up. ANWESHA calling.
 * User taps to answer. Message reveals.
 */

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
      container.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;gap:16px;">
          <div class="text-timestamp" id="s4-clock" style="font-size:clamp(2rem,8vw,3.5rem);">7:29:58</div>

          <div class="phone-mockup" id="phone-ui" style="opacity:0;transform:translateY(30px) scale(0.92);">
            <div class="caller-avatar">
              <img src="assets/portraits/anwesha_calm.png" alt="Anwesha" onerror="this.src='assets/portraits/anwesha_hero.png'">
            </div>
            <div class="incoming-tag">Incoming Call</div>
            <div class="caller-name">Anwesha</div>

            <div class="call-actions" id="call-actions">
              <button class="call-btn decline" id="decline-call" aria-label="Decline">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1 0-1.41C2.5 9.4 6.95 8 12 8s9.5 1.4 11.71 3.67c.39.39.39 1.02 0 1.41l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>
              </button>
              <button class="call-btn accept" id="accept-call" aria-label="Accept">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1.01A11.36 11.36 0 0 1 8.57 3.99c0-.55-.45-1-1-1H4.07c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c-.01-.55-.46-1.01-1.06-1.12z"/></svg>
              </button>
            </div>

            <div class="chat-bubble" id="chat-msg" style="display:none;opacity:0;transform:translateY(15px);">
              <div class="text-whisper" style="color:var(--cinema-gold);margin-bottom:6px;">UNREAD MESSAGE • 7:30 AM</div>
              <p class="text-dialogue" style="font-size:0.95rem;text-align:left;max-width:none;">
                "Where are you? I'm standing in front of the metro gate, waiting."
              </p>
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

      // Show audio toggle
      const audioToggle = document.getElementById('audio-toggle');
      if (audioToggle) audioToggle.classList.add('visible');

      this.tl = gsap.timeline();

      this.tl
        .to({}, { duration: 1 })
        .call(() => { clockEl.textContent = '7:29:59'; })
        .to({}, { duration: 1 })
        .call(() => {
          clockEl.textContent = '7:30:00';
          try { this.audio.playUnlockSfx(); } catch(e) {}
        })
        .to({}, { duration: 0.5 })
        .to(phoneUi, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.3)' })
        .call(() => { this.startRinging(phoneUi); });

      const handleAnswer = () => {
        this.stopRinging();
        try { this.audio.playChime(440, 0.2); } catch(e) {}
        callActions.style.display = 'none';
        chatMsg.style.display = 'block';

        gsap.to(chatMsg, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          onComplete: () => {
            setTimeout(() => {
              this.manager.next();
              resolve();
            }, 3000);
          }
        });
      };

      acceptBtn.addEventListener('click', handleAnswer);
      declineBtn.addEventListener('click', handleAnswer);
    });
  }

  startRinging(phoneUi) {
    this.ringInterval = setInterval(() => {
      if (phoneUi) {
        gsap.fromTo(phoneUi, { x: -3 }, { x: 3, duration: 0.05, repeat: 6, yoyo: true });
      }
      try { this.audio.playPhoneVibrate(); } catch(e) {}
    }, 700);
  }

  stopRinging() {
    if (this.ringInterval) clearInterval(this.ringInterval);
  }

  exit() {
    this.stopRinging();
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
