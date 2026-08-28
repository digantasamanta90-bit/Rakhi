/**
 * CINEMATIC SCENE MANAGER
 * Coordinates 14-beat cinematic scene progression, enter/exit lifecycle,
 * GSAP timeline cleanup, and debug panel synchronization.
 */

export class CinematicSceneManager {
  constructor({ stageElement, audioController, particleCanvas, achievementManager }) {
    this.stage = stageElement;
    this.audio = audioController;
    this.particles = particleCanvas;
    this.achievements = achievementManager;

    this.scenes = [];
    this.sceneNames = [];
    this.currentIndex = -1;
    this.currentInstance = null;
    this.onChangeCallbacks = [];
  }

  registerScenes(sceneDefs) {
    this.scenes = sceneDefs.map(d => d.SceneClass);
    this.sceneNames = sceneDefs.map(d => d.name);
  }

  onChange(cb) {
    this.onChangeCallbacks.push(cb);
  }

  get totalScenes() {
    return this.scenes.length;
  }

  async goTo(index) {
    if (index < 0 || index >= this.scenes.length) return;

    // Exit and clean up previous scene
    if (this.currentInstance) {
      try {
        if (typeof this.currentInstance.exit === 'function') {
          await this.currentInstance.exit();
        }
      } catch (e) {
        console.warn('Scene exit error:', e);
      }
      this.currentInstance = null;
    }

    // Clear stage content
    this.stage.innerHTML = '';

    // Set new index
    this.currentIndex = index;
    const SceneClass = this.scenes[index];
    const sceneNumberStr = String(index + 1).padStart(2, '0');

    // Create scene container wrapper
    const wrapper = document.createElement('div');
    wrapper.className = `scene-wrapper scene-${sceneNumberStr} active`;
    this.stage.appendChild(wrapper);

    // Instantiate new scene
    this.currentInstance = new SceneClass({
      manager: this,
      audio: this.audio,
      particles: this.particles,
      achievements: this.achievements
    });

    // Notify listeners (e.g. debug navigator)
    this.onChangeCallbacks.forEach(cb => cb(this.currentIndex, this.sceneNames[this.currentIndex]));

    // Enter and animate new scene
    try {
      this.currentInstance.enter(wrapper);
    } catch (e) {
      console.warn('Scene enter error:', e);
    }
  }

  next() {
    if (this.currentIndex < this.scenes.length - 1) {
      this.goTo(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.goTo(this.currentIndex - 1);
    }
  }

  restart() {
    this.goTo(0);
  }
}
