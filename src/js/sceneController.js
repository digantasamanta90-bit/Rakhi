/**
 * SCENE CONTROLLER MODULE
 * Coordinates deterministic scene progression (1 to 7),
 * transitions, and progress bar state.
 */

import { state } from './interactionState.js';
import { createScene01 } from '../scenes/scene01.js';
import { createScene02 } from '../scenes/scene02.js';
import { createScene03 } from '../scenes/scene03.js';
import { createScene04 } from '../scenes/scene04.js';
import { createScene05 } from '../scenes/scene05.js';
import { createScene06 } from '../scenes/scene06.js';
import { createScene07 } from '../scenes/scene07.js';

export class SceneController {
  constructor() {
    this.totalScenes = 7;
    this.sceneFactories = {
      1: createScene01,
      2: createScene02,
      3: createScene03,
      4: createScene04,
      5: createScene05,
      6: createScene06,
      7: createScene07
    };
    this.sceneInstances = {};
  }

  init() {
    // Initialize all scenes
    for (let i = 1; i <= this.totalScenes; i++) {
      if (this.sceneFactories[i]) {
        this.sceneInstances[i] = this.sceneFactories[i](this);
      }
    }

    this.renderProgressBar();
    this.goToScene(1, false);
  }

  renderProgressBar() {
    const container = document.getElementById('progress-bar');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 1; i <= this.totalScenes; i++) {
      const dot = document.createElement('div');
      dot.className = `progress-dot ${i === 1 ? 'active' : ''}`;
      dot.id = `pdot-${i}`;
      container.appendChild(dot);
    }
  }

  updateProgressBar(targetScene) {
    for (let i = 1; i <= this.totalScenes; i++) {
      const dot = document.getElementById(`pdot-${i}`);
      if (!dot) continue;
      dot.className = 'progress-dot';
      if (i === targetScene) {
        dot.classList.add('active');
      } else if (i < targetScene) {
        dot.classList.add('passed');
      }
    }

    // Update global navigation arrows state
    const navPrev = document.getElementById('nav-prev');
    const navNext = document.getElementById('nav-next');
    if (navPrev) navPrev.disabled = targetScene === 1;
    if (navNext) navNext.disabled = targetScene === this.totalScenes;
  }

  async goToScene(sceneNumber, animate = true) {
    if (sceneNumber < 1 || sceneNumber > this.totalScenes) return;
    if (state.isTransitioning && animate) return;

    state.isTransitioning = true;
    const prevScene = state.currentScene;
    state.currentScene = sceneNumber;

    const prevEl = document.getElementById(`scene-0${prevScene}`);
    const nextEl = document.getElementById(`scene-0${sceneNumber}`);

    if (prevEl && prevScene !== sceneNumber && animate) {
      prevEl.classList.remove('active');
      prevEl.classList.add('exiting');
      await new Promise(r => setTimeout(r, 400));
      prevEl.classList.remove('exiting');
    }

    // Ensure all other scenes are completely inactive to avoid any overlap
    document.querySelectorAll('.scene-container').forEach(el => {
      if (el !== nextEl) {
        el.classList.remove('active', 'exiting');
      }
    });

    if (nextEl) {
      nextEl.classList.add('active');
      this.updateProgressBar(sceneNumber);

      // Trigger scene entrance choreography
      if (this.sceneInstances[sceneNumber] && this.sceneInstances[sceneNumber].enter) {
        this.sceneInstances[sceneNumber].enter();
      }
    }

    state.isTransitioning = false;
  }

  nextScene() {
    if (state.currentScene < this.totalScenes) {
      this.goToScene(state.currentScene + 1);
    }
  }

  prevScene() {
    if (state.currentScene > 1) {
      this.goToScene(state.currentScene - 1);
    }
  }

  reset() {
    state.resetForReplay();

    // Immediately remove active/exiting state from all scene containers
    document.querySelectorAll('.scene-container').forEach(el => {
      el.classList.remove('active', 'exiting');
    });

    // Re-instantiate all scenes fresh with fresh event handlers and resets
    for (let i = 1; i <= this.totalScenes; i++) {
      if (this.sceneFactories[i]) {
        this.sceneInstances[i] = this.sceneFactories[i](this);
      }
    }

    this.renderProgressBar();
    this.goToScene(1, false);
  }
}
