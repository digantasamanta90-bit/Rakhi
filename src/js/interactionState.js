/**
 * INTERACTION STATE MODULE
 * Manages runtime session state, achievements, discoveries, and non-blocking exploration.
 */

class InteractionState {
  constructor() {
    this.currentScene = 1;
    this.isTransitioning = false;
    this.audioStarted = false;
    this.audioMuted = false;
    
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

  unlockAchievement(id, title, description, icon = '🏆') {
    if (this.achievements.has(id)) return false;
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
    this.doNotPressCount = 0;
    this.finaleCompleted = false;
    this.notify('replay_reset');
  }
}

export const state = new InteractionState();
