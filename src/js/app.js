/**
 * CINEMATIC APP ENTRY POINT
 * Bootstraps the 17-beat cinematic interactive film with CinematicSceneManager.
 */

import { ParticleCanvas } from '../components/ParticleCanvas.js';
import { AchievementManager } from '../components/AchievementToast.js';
import { audio } from './audioController.js';
import { state } from './interactionState.js';
import { CinematicSceneManager } from './CinematicSceneManager.js';

// Import all 17 cinematic scenes
import { Scene01Clock } from '../scenes/scene01.js';
import { Scene02Creation } from '../scenes/scene02.js';
import { Scene03Alarms } from '../scenes/scene03.js';
import { Scene04MissedCall } from '../scenes/scene04.js';
import { Scene05Panic } from '../scenes/scene05.js';
import { Scene06Journey } from '../scenes/scene06.js';
import { Scene07BrokenKitkat } from '../scenes/scene07.js';
import { Scene08GoingHome } from '../scenes/scene08.js';
import { Scene09Ceiling } from '../scenes/scene09.js';
import { Scene10Memories } from '../scenes/scene10.js';
import { Scene11Gifts } from '../scenes/scene11.js';
import { Scene12SiblingZone } from '../scenes/scene12.js';
import { Scene13Letter } from '../scenes/scene13.js';
import { Scene14Thread } from '../scenes/scene14.js';
import { Scene15Apology } from '../scenes/scene15.js';
import { Scene16RakhiFinale } from '../scenes/scene16.js';
import { Scene17PostCredits } from '../scenes/scene17.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Ambient Particle Canvas
  const particleCanvas = new ParticleCanvas('particle-canvas');
  window.appParticleCanvas = particleCanvas;

  // 2. Achievement Notification Manager
  const achievementManager = new AchievementManager();
  state.subscribe((event, data) => {
    if (event === 'achievement_unlocked' || event === 'toast_triggered') {
      achievementManager.show(data.title, data.description, data.icon);
    }
  });

  // 3. Audio Controller & Toggle Button
  const audioToggle = document.getElementById('audio-toggle');
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      const isMuted = audio.toggleMute();
      const onIcon = audioToggle.querySelector('.audio-icon-on');
      const offIcon = audioToggle.querySelector('.audio-icon-off');
      if (onIcon) onIcon.style.display = isMuted ? 'none' : 'block';
      if (offIcon) offIcon.style.display = isMuted ? 'block' : 'none';
      audioToggle.setAttribute('aria-label', isMuted ? 'Unmute music' : 'Mute music');
    });
  }

  // Auto-init audio context on first user interaction anywhere
  const enableAudioOnFirstTap = () => {
    audio.init();
    window.removeEventListener('click', enableAudioOnFirstTap);
    window.removeEventListener('touchstart', enableAudioOnFirstTap);
  };
  window.addEventListener('click', enableAudioOnFirstTap, { once: true });
  window.addEventListener('touchstart', enableAudioOnFirstTap, { once: true });

  // 4. Mount Master Scene Stage & Cinematic Scene Manager
  const stageEl = document.getElementById('scene-stage');
  const sceneManager = new CinematicSceneManager({
    stageElement: stageEl,
    audioController: audio,
    particleCanvas: particleCanvas,
    achievementManager: achievementManager
  });
  window.sceneManager = sceneManager;

  // Register all 17 cinematic story beats
  sceneManager.registerScenes([
    { name: '4:30 AM', SceneClass: Scene01Clock },
    { name: 'Building It', SceneClass: Scene02Creation },
    { name: 'Three Alarms', SceneClass: Scene03Alarms },
    { name: '7:30 AM — The Call', SceneClass: Scene04MissedCall },
    { name: 'Panic', SceneClass: Scene05Panic },
    { name: 'The Journey', SceneClass: Scene06Journey },
    { name: 'Broken KitKat', SceneClass: Scene07BrokenKitkat },
    { name: 'Going Home', SceneClass: Scene08GoingHome },
    { name: 'The Ceiling', SceneClass: Scene09Ceiling },
    { name: 'Memories', SceneClass: Scene10Memories },
    { name: 'The Gifts & Case File', SceneClass: Scene11Gifts },
    { name: 'Sibling Playground', SceneClass: Scene12SiblingZone },
    { name: 'The Letter', SceneClass: Scene13Letter },
    { name: 'The Thread', SceneClass: Scene14Thread },
    { name: 'The Apology', SceneClass: Scene15Apology },
    { name: 'Happy Rakhi ❤️', SceneClass: Scene16RakhiFinale },
    { name: 'Post-Credits', SceneClass: Scene17PostCredits }
  ]);

  // 5. Bind Pause Button & Backward / Forward Navigation Controls
  const pauseBtn = document.getElementById('pause-btn');
  const navPrevBtn = document.getElementById('nav-btn-prev');
  const navNextBtn = document.getElementById('nav-btn-next');
  sceneManager.bindPauseControl({ pauseBtn });
  sceneManager.bindNavControls({ prevBtn: navPrevBtn, nextBtn: navNextBtn });

  // 6. Debug Navigation Panel
  const debugToggle = document.getElementById('debug-toggle');
  const debugPanel = document.getElementById('debug-panel');
  const debugList = document.getElementById('debug-scene-list');
  const debugRestart = document.getElementById('debug-restart');

  if (debugToggle && debugPanel) {
    debugToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', (e) => {
      if (!debugPanel.contains(e.target) && e.target !== debugToggle) {
        debugPanel.style.display = 'none';
      }
    });
  }

  if (debugList) {
    sceneManager.sceneNames.forEach((name, i) => {
      const btn = document.createElement('button');
      btn.className = 'debug-scene-btn';
      btn.textContent = `${String(i + 1).padStart(2, '0')} ${name}`;
      btn.addEventListener('click', () => {
        sceneManager.goTo(i);
        if (debugPanel) debugPanel.style.display = 'none';
      });
      debugList.appendChild(btn);
    });
  }

  if (debugRestart) {
    debugRestart.addEventListener('click', () => {
      if (debugPanel) debugPanel.style.display = 'none';
      sceneManager.restart();
    });
  }

  // Keep debug navigator active indicator updated
  sceneManager.onChange((index) => {
    if (debugList) {
      debugList.querySelectorAll('.debug-scene-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
    }
  });

  // 6. Launch from Scene 01 (4:30 AM)
  sceneManager.goTo(0);
});
