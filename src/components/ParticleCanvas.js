/**
 * PARTICLE CANVAS COMPONENT — VELVET NIGHT & ANTIQUE MEMORY
 * Subtle warm dust motes, delicate gold flecks, and restrained celebration bursts.
 */

export class ParticleCanvas {
  constructor(canvasId = 'particle-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.bursts = [];
    this.width = 0;
    this.height = 0;
    this.animationFrame = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    if (!this.reducedMotion) {
      this.initParticles();
      this.animate();
    }
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initParticles() {
    // Restrained particle density (Subtle floating dust motes in warm amber & rose)
    const count = window.innerWidth < 768 ? 14 : 24;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.5,
        color: Math.random() > 0.5 ? 'rgba(212, 176, 106, ' : 'rgba(155, 93, 112, ',
        alpha: Math.random() * 0.18 + 0.06,
        speedY: Math.random() * 0.25 + 0.08,
        speedX: (Math.random() - 0.5) * 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }
  }

  triggerBurst(x, y, count = 20) {
    if (this.reducedMotion) return;
    const colors = ['#D4B06A', '#B7474D', '#E8DCCB', '#9B5D70'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.8 + 1.2;
      this.bursts.push({
        x: x || this.width / 2,
        y: y || this.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2.2 + 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.018 + 0.012
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Ambient floating dust motes
    for (const p of this.particles) {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.pulseAngle += p.pulseSpeed;
      const currentAlpha = p.alpha + Math.sin(p.pulseAngle) * 0.04;

      if (p.y < -10) p.y = this.height + 10;
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color}${Math.max(0.02, currentAlpha)})`;
      this.ctx.fill();
    }

    // Celebration burst particles
    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.05; // gentle gravity
      b.life -= b.decay;

      if (b.life <= 0) {
        this.bursts.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, b.life);
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = b.color;
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}
