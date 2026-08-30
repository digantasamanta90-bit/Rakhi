/**
 * CINEMATIC AUDIO CONTROLLER — RAKHI V4.1
 * Pure audio discipline:
 * 1. Background Music: assets/music/monta re instrumental bgm.mp3 (Continuous emotional backbone)
 * 2. Real Alarm: assets/music/alarm.mp3 (Foreground audio with smooth BGM ducking)
 * 3. Real Ringtone: assets/music/ringtone.mp3 (Foreground audio with smooth BGM ducking)
 *
 * NO synthesized clutter, NO random chimes, NO beeps, NO sparkle sounds.
 * BGM plays continuously from Scene 01 starter tap across scenes without resetting or stacking.
 */

import { state } from './interactionState.js';
import { content } from '../content/content.js';

class AudioController {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.audioUnlocked = false;

    // Real Local Audio Elements
    this.bgmAudio = null;
    this.alarmAudio = null;
    this.ringtoneAudio = null;

    // Target volume settings from Single Source of Truth
    const cfg = (content && content.audio) || {};
    this.bgmTargetVolume = cfg.bgmTargetVolume ?? 0.70;
    this.bgmDuckedVolume = cfg.bgmDuckedVolume ?? 0.12;

    // Track active states
    this.isBgmPlaying = false;
    this.isAlarmPlaying = false;
    this.isRingtonePlaying = false;
    this.isDucked = false;

    // Initialize local audio assets
    this.preloadLocalAudio();
  }

  /**
   * Preloads the local master audio files safely
   */
  preloadLocalAudio() {
    try {
      if (typeof window === 'undefined' || typeof Audio === 'undefined') return;
      const cfg = (content && content.audio) || {};

      // 1. Cinematic Background Score (Continuous Backbone)
      const bgmPath = encodeURI(cfg.bgm || 'assets/music/monta re instrumental bgm.mp3');
      this.bgmAudio = new Audio(bgmPath);
      this.bgmAudio.preload = 'auto';
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = this.bgmTargetVolume;
      this.bgmAudio.onerror = (e) => {
        console.warn('BGM audio load warning:', e);
      };

      // Native audio element event listeners for authoritative state
      this.bgmAudio.addEventListener('pause', () => {
        this.isBgmPlaying = false;
        if (typeof this.onPause === 'function') {
          this.onPause();
        }
      });
      this.bgmAudio.addEventListener('play', () => {
        this.isBgmPlaying = true;
        if (typeof this.onPlay === 'function') {
          this.onPlay();
        }
      });
      this.bgmAudio.addEventListener('ended', () => {
        this.isBgmPlaying = false;
        if (typeof this.onEnded === 'function') {
          this.onEnded();
        }
      });

      // 2. Local Alarm Audio
      const alarmPath = encodeURI(cfg.alarm || 'assets/music/alarm.mp3');
      this.alarmAudio = new Audio(alarmPath);
      this.alarmAudio.preload = 'auto';
      this.alarmAudio.loop = true;
      this.alarmAudio.volume = cfg.alarmVolume ?? 1.0;
      this.alarmAudio.onerror = (e) => {
        console.warn('Alarm audio load warning:', e);
      };

      // 3. Local Ringtone Audio
      const ringtonePath = encodeURI(cfg.ringtone || 'assets/music/ringtone.mp3');
      this.ringtoneAudio = new Audio(ringtonePath);
      this.ringtoneStartTime = cfg.ringtoneStartTime ?? 2.0;
      this.ringtoneAudio.preload = 'auto';
      this.ringtoneAudio.loop = true;
      this.ringtoneAudio.volume = cfg.ringtoneVolume ?? 1.0;
      this.ringtoneAudio.onerror = (e) => {
        console.warn('Ringtone audio load warning:', e);
      };
    } catch (e) {
      console.warn('Audio preloading error:', e);
    }
  }

  /**
   * Initializes or resumes the Web Audio context upon user interaction
   */
  init() {
    if (this.audioUnlocked && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext && !this.ctx) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1.0, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }

      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      this.audioUnlocked = true;
    } catch (e) {
      console.warn('AudioContext init failed:', e);
    }
  }

  // --- BGM PLAYBACK & CINEMATIC DUCKING ---

  async startMusic(fadeInDuration = 1.2) {
    this.init();
    if (!this.bgmAudio) return;

    this.isPlaying = true;
    state.audioStarted = true;

    // Never restart or duplicate BGM if already playing
    if (this.isBgmPlaying && !this.bgmAudio.paused) return;

    try {
      this.bgmAudio.muted = this.isMuted;
      const targetVol = this.isDucked ? this.bgmDuckedVolume : this.bgmTargetVolume;

      if (fadeInDuration > 0 && window.gsap && this.bgmAudio.currentTime === 0) {
        this.bgmAudio.volume = 0.001;
        await this.bgmAudio.play();
        this.isBgmPlaying = true;
        gsap.to(this.bgmAudio, {
          volume: targetVol,
          duration: fadeInDuration,
          ease: 'power1.out'
        });
      } else {
        this.bgmAudio.volume = targetVol;
        await this.bgmAudio.play();
        this.isBgmPlaying = true;
      }
    } catch (e) {
      console.warn('BGM playback deferred until user interaction:', e);
    }
  }

  pauseMusic() {
    if (this.bgmAudio && !this.bgmAudio.paused) {
      this.bgmAudio.pause();
      this.isBgmPlaying = false;
    }
    if (this.alarmAudio && !this.alarmAudio.paused) {
      this.alarmAudio.pause();
    }
    if (this.ringtoneAudio && !this.ringtoneAudio.paused) {
      this.ringtoneAudio.pause();
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  async resumeMusic() {
    if (this.isMuted) return;
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume().catch(() => {});
    }
    if (this.alarmAudio && this.isAlarmPlaying && this.alarmAudio.paused) {
      try { await this.alarmAudio.play(); } catch (e) {}
    }
    if (this.ringtoneAudio && this.isRingtonePlaying && this.ringtoneAudio.paused) {
      try { await this.ringtoneAudio.play(); } catch (e) {}
    }
    if (this.bgmAudio && this.isPlaying && this.bgmAudio.paused) {
      try {
        await this.bgmAudio.play();
        this.isBgmPlaying = true;
      } catch (e) {
        console.warn('BGM resume error:', e);
      }
    }
  }

  /**
   * Smoothly ducks BGM volume (300–700ms) when foreground sound (alarm/ringtone) begins
   */
  duckBgm(duckVolume = 0.12, duration = 0.45) {
    this.isDucked = true;
    if (this.bgmAudio) {
      if (window.gsap) {
        gsap.killTweensOf(this.bgmAudio);
        gsap.to(this.bgmAudio, {
          volume: duckVolume,
          duration: duration,
          ease: 'power2.out'
        });
      } else {
        this.bgmAudio.volume = duckVolume;
      }
    }
  }

  /**
   * Smoothly restores BGM volume (400–1000ms) after foreground audio concludes
   */
  unduckBgm(targetVolume = 0.70, duration = 0.7) {
    this.isDucked = false;
    if (this.bgmAudio && !this.isMuted) {
      if (window.gsap) {
        gsap.killTweensOf(this.bgmAudio);
        gsap.to(this.bgmAudio, {
          volume: targetVolume,
          duration: duration,
          ease: 'power2.out'
        });
      } else {
        this.bgmAudio.volume = targetVolume;
      }
    }
  }

  // --- LOCAL ALARM AUDIO ---

  playAlarmSound() {
    this.init();
    this.duckBgm(this.bgmDuckedVolume, 0.4);
    if (!this.alarmAudio) return;

    try {
      this.alarmAudio.muted = this.isMuted;
      this.alarmAudio.currentTime = 0;
      this.alarmAudio.volume = 1.0;
      this.alarmAudio.play().catch((e) => console.warn('Alarm play error:', e));
      this.isAlarmPlaying = true;
    } catch (e) {
      console.warn('Alarm audio error:', e);
    }
  }

  stopAlarmSound(unduck = true) {
    if (this.alarmAudio) {
      try {
        this.alarmAudio.pause();
        this.alarmAudio.currentTime = 0;
      } catch (e) {}
    }
    this.isAlarmPlaying = false;
    if (unduck) {
      this.unduckBgm(this.bgmTargetVolume, 0.7);
    }
  }

  // --- LOCAL RINGTONE AUDIO ---

  playRingtoneSound() {
    this.init();
    this.duckBgm(this.bgmDuckedVolume, 0.4);
    if (!this.ringtoneAudio) return;

    try {
      this.ringtoneAudio.muted = this.isMuted;
      this.ringtoneAudio.currentTime = this.ringtoneStartTime || 2.0;
      this.ringtoneAudio.volume = 1.0;
      this.ringtoneAudio.play().catch((e) => console.warn('Ringtone play error:', e));
      this.isRingtonePlaying = true;
    } catch (e) {
      console.warn('Ringtone audio error:', e);
    }
  }

  playPhoneRingtone() {
    this.playRingtoneSound();
  }

  stopRingtoneSound(unduck = true) {
    if (this.ringtoneAudio) {
      try {
        this.ringtoneAudio.pause();
        this.ringtoneAudio.currentTime = this.ringtoneStartTime || 2.0;
      } catch (e) {}
    }
    this.isRingtonePlaying = false;
    if (unduck) {
      this.unduckBgm(this.bgmTargetVolume, 0.7);
    }
  }

  // --- GLOBAL MUTE TOGGLE ---

  toggleMute() {
    this.isMuted = !this.isMuted;
    state.audioMuted = this.isMuted;

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1.0, this.ctx.currentTime);
    }
    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
    }
    if (this.alarmAudio) {
      this.alarmAudio.muted = this.isMuted;
    }
    if (this.ringtoneAudio) {
      this.ringtoneAudio.muted = this.isMuted;
    }

    return this.isMuted;
  }

  // --- SILENCED NO-OP SFX HANDLERS (Prevent clutter and crashes) ---
  playChime() {}
  playSparkleSfx() {}
  playGlitchSfx() {}
  playCelebrateSfx() {}
  playUnlockSfx() {}
  playAlarmBeep() {}

  playPhoneVibrate() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(120);
      } catch (e) {}
    }
  }
}

export const audio = new AudioController();
