/**
 * CINEMATIC SCENE MANAGER
 * Coordinates 17-beat cinematic scene progression, enter/exit lifecycle,
 * global pause/resume architecture, gesture hold-to-pause, and forward/backward navigation.
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
    this.onPauseChangeCallbacks = [];

    // Global Pause State Machine
    this.isPersistentPaused = false;
    this.isHoldPaused = false;
    this.holdTimer = null;
    this.holdStartX = 0;
    this.holdStartY = 0;
    this.isHolding = false;

    // Navigation and Pause UI References
    this.pauseBtn = null;
    this.navPrevBtn = null;
    this.navNextBtn = null;

    this.initHoldToPause();
  }

  get isPaused() {
    return this.isPersistentPaused || this.isHoldPaused;
  }

  registerScenes(sceneDefs) {
    this.scenes = sceneDefs.map(d => d.SceneClass);
    this.sceneNames = sceneDefs.map(d => d.name);
  }

  onChange(cb) {
    this.onChangeCallbacks.push(cb);
  }

  onPauseChange(cb) {
    this.onPauseChangeCallbacks.push(cb);
  }

  get totalScenes() {
    return this.scenes.length;
  }

  // --- DUAL PAUSE / RESUME ARCHITECTURE ---

  pausePersistent() {
    if (this.isPersistentPaused) return;
    this.isPersistentPaused = true;
    this._applyPauseState();
  }

  resumePersistent() {
    if (!this.isPersistentPaused) return;
    this.isPersistentPaused = false;
    if (!this.isHoldPaused) {
      this._applyResumeState();
    }
  }

  togglePause() {
    if (this.isPersistentPaused) {
      this.resumePersistent();
    } else {
      this.pausePersistent();
    }
  }

  pauseHold() {
    if (this.isHoldPaused) return;
    this.isHoldPaused = true;
    this._applyPauseState();
  }

  resumeHold() {
    if (!this.isHoldPaused) return;
    this.isHoldPaused = false;
    if (!this.isPersistentPaused) {
      this._applyResumeState();
    }
  }

  _applyPauseState() {
    // 1. Pause global GSAP timeline
    if (window.gsap && gsap.globalTimeline) {
      gsap.globalTimeline.pause();
    }

    // 2. Pause active scene's specific timeline if present
    if (this.currentInstance && this.currentInstance.tl) {
      this.currentInstance.tl.pause();
    }

    // 3. Pause background audio & active sounds
    if (this.audio && typeof this.audio.pauseMusic === 'function') {
      this.audio.pauseMusic();
    }

    // 4. Update pause button UI icon immediately (⏸ -> ▶)
    this.updatePauseButtonUI();

    // 5. Notify listeners
    this.onPauseChangeCallbacks.forEach(cb => cb(true));
  }

  _applyResumeState() {
    // 1. Resume global GSAP timeline
    if (window.gsap && gsap.globalTimeline) {
      gsap.globalTimeline.resume();
    }

    // 2. Resume active scene's specific timeline
    if (this.currentInstance && this.currentInstance.tl) {
      this.currentInstance.tl.resume();
    }

    // 3. Resume background audio & active sounds from same position
    if (this.audio && typeof this.audio.resumeMusic === 'function') {
      this.audio.resumeMusic();
    }

    // 4. Update pause button UI icon immediately (▶ -> ⏸)
    this.updatePauseButtonUI();

    // 5. Notify listeners
    this.onPauseChangeCallbacks.forEach(cb => cb(false));
  }

  // Backwards compatibility methods
  pause() {
    this.pausePersistent();
  }

  resume() {
    this.resumePersistent();
  }

  updatePauseButtonUI() {
    if (!this.pauseBtn) {
      this.pauseBtn = document.getElementById('pause-btn');
    }
    if (this.pauseBtn) {
      const pauseIcon = this.pauseBtn.querySelector('.icon-pause');
      const playIcon = this.pauseBtn.querySelector('.icon-play');
      const isPaused = this.isPaused;
      if (pauseIcon) pauseIcon.style.display = isPaused ? 'none' : 'inline-block';
      if (playIcon) playIcon.style.display = isPaused ? 'inline-block' : 'none';
      this.pauseBtn.setAttribute('aria-label', isPaused ? 'Resume film' : 'Pause film');
      this.pauseBtn.setAttribute('title', isPaused ? 'Resume film' : 'Pause film');
      this.pauseBtn.classList.toggle('active-paused', isPaused);
    }
  }

  bindPauseControl({ pauseBtn }) {
    this.pauseBtn = pauseBtn;
    if (this.pauseBtn) {
      this.pauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePause();
      });
      this.pauseBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
      });
      this.updatePauseButtonUI();
    }
  }

  // --- HOLD-TO-PAUSE GESTURE HANDLING ---
  initHoldToPause() {
    const handlePointerDown = (e) => {
      // 1. Ignore if target is an interactive UI element or viewport control
      const interactiveTarget = e.target.closest(
        'button, a, input, select, textarea, [role="button"], [role="dialog"], ' +
        '.cinema-viewport-ctrl, .cinema-control-btn, .cinema-pause-btn, .cinema-nav-group, .cinema-nav-btn, ' +
        '.emergency-btn, .alarm-dismiss-btn, .secret-item, .call-btn, ' +
        '.debug-nav, .audio-toggle, .modal-overlay, .photo-memory, .starter-gate-overlay'
      );
      if (interactiveTarget) return;

      this.isHolding = true;
      this.holdStartX = e.clientX;
      this.holdStartY = e.clientY;

      if (this.holdTimer) clearTimeout(this.holdTimer);

      // Start hold threshold timer (350ms)
      this.holdTimer = setTimeout(() => {
        if (this.isHolding && !this.isPersistentPaused) {
          this.pauseHold();
        }
      }, 350);
    };

    const handlePointerMove = (e) => {
      if (!this.isHolding) return;

      const dx = e.clientX - this.holdStartX;
      const dy = e.clientY - this.holdStartY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Movement threshold (12px) cancels the hold to preserve native gestures
      if (dist > 12) {
        this.isHolding = false;
        if (this.holdTimer) {
          clearTimeout(this.holdTimer);
          this.holdTimer = null;
        }
        if (this.isHoldPaused) {
          this.resumeHold();
        }
      }
    };

    const handlePointerUpOrCancel = () => {
      this.isHolding = false;
      if (this.holdTimer) {
        clearTimeout(this.holdTimer);
        this.holdTimer = null;
      }
      if (this.isHoldPaused) {
        this.resumeHold();
      }
    };

    // Attach listeners with passive: true so browser scrolling is never blocked
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUpOrCancel, { passive: true });
    window.addEventListener('pointercancel', handlePointerUpOrCancel, { passive: true });
  }

  // --- SCENE NAVIGATION & TRANSITIONS ---
  async goTo(index) {
    if (index < 0 || index >= this.scenes.length) return;

    // If currently paused, resume before transitioning
    if (this.isPaused) {
      this.resume();
    }

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

    // Update navigation controls state
    this.updateNavControls();

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

  bindNavControls({ prevBtn, nextBtn }) {
    this.navPrevBtn = prevBtn;
    this.navNextBtn = nextBtn;

    if (this.navPrevBtn) {
      this.navPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
      this.navPrevBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
      });
    }

    if (this.navNextBtn) {
      this.navNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
      this.navNextBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
      });
    }

    this.updateNavControls();
  }

  updateNavControls() {
    if (this.navPrevBtn) {
      const isFirst = this.currentIndex <= 0;
      this.navPrevBtn.disabled = isFirst;
      this.navPrevBtn.classList.toggle('disabled', isFirst);
      this.navPrevBtn.setAttribute('aria-disabled', String(isFirst));
    }
    if (this.navNextBtn) {
      const isLast = this.currentIndex >= this.scenes.length - 1;
      this.navNextBtn.disabled = isLast;
      this.navNextBtn.classList.toggle('disabled', isLast);
      this.navNextBtn.setAttribute('aria-disabled', String(isLast));
    }
  }
}
