/**
 * AUDIO CONTROLLER MODULE
 * Web Audio API synthesizer for ambient festive music + SFX + melodic ringtone
 * Calibrated with full, rich default BGM and sound effect volumes.
 * Supports external audio file (assets/audio/rakhi_theme.mp3) with automatic fallback.
 */

import { state } from './interactionState.js';

class AudioController {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.synthInterval = null;
    this.customAudio = null;
    this.customAudioLoaded = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.ctx = new AudioContext();

    // Master Output Gain (Full headroom: 1.0)
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Music Channel Gain (Full, rich background score: 1.0)
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
    this.musicGain.connect(this.masterGain);

    // SFX Channel Gain (Tactile interactive effects: 1.0)
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);

    // Attempt to preload custom MP3 if available
    this.customAudio = new Audio('assets/audio/rakhi_theme.mp3');
    this.customAudio.loop = true;
    this.customAudio.volume = 1.0;
    this.customAudio.addEventListener('canplaythrough', () => {
      this.customAudioLoaded = true;
    });
  }

  async startMusic() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.isPlaying = true;
    state.audioStarted = true;

    if (this.customAudioLoaded && this.customAudio) {
      try {
        await this.customAudio.play();
        return;
      } catch (e) {
        console.warn('Custom audio playback failed, falling back to Web Audio synth', e);
      }
    }

    // Web Audio Synthesizer: Generative warm lofi ambient soundtrack
    this.startAmbientSynth();
  }

  startAmbientSynth() {
    if (this.synthInterval) clearInterval(this.synthInterval);

    // Pentatonic / Raag Yaman-inspired warm notes (MIDI / frequencies in Hz)
    // C4, D4, E4, G4, A4, B4, C5, D5, E5, G5
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 783.99];
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 261.63, 329.63, 392.00], // Fmaj7
      [196.00, 246.94, 293.66, 392.00]  // G6
    ];

    let chordIdx = 0;

    const playChordPad = () => {
      if (!this.ctx || !this.isPlaying || this.isMuted) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, this.ctx.currentTime);

        // Rich, warm pad volume curve (peak: 0.26)
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.26, this.ctx.currentTime + 1.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 5.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 5.6);
      });
    };

    const playKalimbaNote = () => {
      if (!this.ctx || !this.isPlaying || this.isMuted) return;
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Distinct, resonant pluck volume curve (peak: 0.34)
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.34, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.musicGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.3);
    };

    playChordPad();
    this.synthInterval = setInterval(() => {
      playChordPad();
      setTimeout(playKalimbaNote, 800);
      setTimeout(playKalimbaNote, 1800);
      setTimeout(playKalimbaNote, 2700);
    }, 4800);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    state.audioMuted = this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1.0, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  pauseMusic() {
    if (this.customAudio && this.customAudioLoaded && !this.customAudio.paused) {
      this.customAudio.pause();
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
  }

  async resumeMusic() {
    if (this.isMuted) return;
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    if (this.customAudio && this.customAudioLoaded && this.isPlaying) {
      try {
        await this.customAudio.play();
      } catch (e) {}
    }
  }

  // --- MELODIC PHONE RINGTONE ---
  playPhoneRingtone() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate([180, 100, 180]); } catch(e) {}
    }
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      // Melodic modern phone marimba chime sequence (E5 -> G#5 -> B5 -> E6 -> D#6 -> B5)
      const notes = [
        { freq: 659.25, time: 0 },       // E5
        { freq: 830.61, time: 0.11 },    // G#5
        { freq: 987.77, time: 0.22 },    // B5
        { freq: 1318.51, time: 0.33 },   // E6
        { freq: 1244.51, time: 0.48 },   // D#6
        { freq: 987.77, time: 0.62 }     // B5
      ];

      notes.forEach(({ freq, time }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.exponentialRampToValueAtTime(0.32, now + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + 0.38);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + time);
        osc.stop(now + time + 0.4);
      });

      // Synchronized vibration buzz harmonic
      const buzzOsc = this.ctx.createOscillator();
      const buzzGain = this.ctx.createGain();
      buzzOsc.type = 'triangle';
      buzzOsc.frequency.setValueAtTime(95, now);
      buzzGain.gain.setValueAtTime(0.20, now);
      buzzGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      buzzOsc.connect(buzzGain);
      buzzGain.connect(this.sfxGain);
      buzzOsc.start(now);
      buzzOsc.stop(now + 0.35);
    } catch (e) {}
  }

  // --- SOUND EFFECTS ---
  playUnlockSfx() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.001, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.24, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.65);
    });
  }

  playGlitchSfx() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(60, now + 0.15);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playSparkleSfx() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    [880, 1174.66, 1318.51, 1760].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime(0.001, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.20, now + i * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.45);
    });
  }

  playCelebrateSfx() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const majorChord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    majorChord.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.001, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.28, now + i * 0.04 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 1.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 1.5);
    });
  }

  playChime(freq = 440, duration = 0.2, type = 'sine') {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.24, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch (e) {
      console.warn('playChime error', e);
    }
  }

  playAlarmBeep() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate([90, 40, 90]); } catch(e) {}
    }
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(440, now + 0.08);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {}
  }

  playPhoneVibrate() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(120); } catch(e) {}
    }
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {}
  }
}

export const audio = new AudioController();
