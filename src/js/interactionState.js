/**
 * INTERACTION STATE MODULE
 * Manages runtime session state, achievements, discoveries, and non-blocking exploration.
 */

export const PLAYBACK_STATE = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
};

class InteractionState {
  constructor() {
    this.currentScene = 1;
    this.isTransitioning = false;
    this.audioStarted = false;
    this.audioMuted = false;
    this.playbackState = PLAYBACK_STATE.IDLE;
    
    this.discoveries = new Set();
    this.achievements = new Set();
    this.doNotPressCount = 0;
    this.finaleCompleted = false;

    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(event, data) {
    this.listeners.forEach(cb => cb(event, data));
  }

  setPlaybackState(newState) {
    if (this.playbackState === newState) return;
    const oldState = this.playbackState;
    this.playbackState = newState;
    if (newState === PLAYBACK_STATE.PLAYING) {
      this.audioStarted = true;
    }
    this.notify('playback_state_changed', { state: newState, oldState });
  }

  showToast(title, description, icon = '✨') {
    this.notify('toast_triggered', { title, description, icon });
  }

  unlockAchievement(id, title, description, icon = '🏆', repeatable = false) {
    if (!repeatable && this.achievements.has(id)) return false;
    this.achievements.add(id);
    this.notify('achievement_unlocked', { id, title, description, icon });
    return true;
  }

  recordDiscovery(name) {
    this.discoveries.add(name);
    this.notify('discovery_recorded', { name, total: this.discoveries.size });
  }

  hasDiscovery(name) {
    return this.discoveries.has(name);
  }

  resetForReplay() {
    this.currentScene = 1;
    this.isTransitioning = false;
    this.audioStarted = false;
    this.playbackState = PLAYBACK_STATE.IDLE;
    this.doNotPressCount = 0;
    this.finaleCompleted = false;
    this.achievements.clear();
    this.discoveries.clear();
    this.notify('replay_reset');
  }
}

export const state = new InteractionState();
