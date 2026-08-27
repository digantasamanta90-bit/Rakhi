/**
 * ACHIEVEMENT TOAST COMPONENT
 * Displays playful, floating notifications when easter eggs or milestones are triggered.
 */

export class AchievementManager {
  constructor() {
    this.toastEl = document.getElementById('achievement-toast');
    this.titleEl = document.getElementById('toast-title');
    this.descEl = document.getElementById('toast-desc');
    this.iconEl = document.getElementById('toast-icon');
    this.hideTimeout = null;
  }

  show(title, description, icon = '🏆') {
    if (!this.toastEl) return;
    if (this.iconEl) this.iconEl.textContent = icon;
    if (this.titleEl) this.titleEl.textContent = title;
    if (this.descEl) this.descEl.textContent = description;

    // Reset animation if already showing so user sees immediate feedback
    this.toastEl.classList.remove('show');
    void this.toastEl.offsetWidth; // force DOM reflow
    this.toastEl.classList.add('show');

    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 4000);
  }
}
