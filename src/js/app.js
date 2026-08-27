/**
 * MAIN APP ENTRY POINT
 * Initializes the background canvas, audio toggle, achievement system, and scenes.
 */

import { ParticleCanvas } from '../components/ParticleCanvas.js';
import { AchievementManager } from '../components/AchievementToast.js';
import { audio } from './audioController.js';
import { state } from './interactionState.js';
import { SceneController } from './sceneController.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Ambient Particle Canvas
  window.appParticleCanvas = new ParticleCanvas('particle-canvas');

  // Initialize Achievement Notification Manager
  const achievementManager = new AchievementManager();
  state.subscribe((event, data) => {
    if (event === 'achievement_unlocked' || event === 'toast_triggered') {
      achievementManager.show(data.title, data.description, data.icon);
    }
  });

  // Music Toggle Control
  const musicToggle = document.getElementById('music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      const isMuted = audio.toggleMute();
      musicToggle.classList.toggle('muted', isMuted);
      musicToggle.setAttribute('aria-label', isMuted ? 'Unmute music' : 'Mute music');
    });
  }

  // Initialize Scenes
  const sceneController = new SceneController();
  sceneController.init();

  // Global Slide Navigation
  const navPrev = document.getElementById('nav-prev');
  const navNext = document.getElementById('nav-next');
  if (navPrev) {
    navPrev.addEventListener('click', () => sceneController.prevScene());
  }
  if (navNext) {
    navNext.addEventListener('click', () => sceneController.nextScene());
  }
});
