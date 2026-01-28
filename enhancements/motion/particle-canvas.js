/**
 * Summer Ann Portfolio - Particle Canvas
 * Ambient floating particles with neon colors
 */

(function() {
  'use strict';

  const SAE = window.SummerAnnEnhancements || {};

  // Configuration
  const config = {
    particleCount: 50,
    colors: ['#6c63ff', '#00ffe7', '#a1c4fd', '#c2e9fb'],
    minSize: 2,
    maxSize: 6,
    minSpeed: 0.2,
    maxSpeed: 0.8,
    connectionDistance: 150,
    connectionOpacity: 0.15,
    mouseInfluenceRadius: 200,
    mouseInfluenceStrength: 0.02
  };

  let canvas, ctx;
  let particles = [];
  let animationId = null;
  let mouseX = null;
  let mouseY = null;
  let isVisible = true;

  function readCssNumber(varName, fallback) {
    if (!document.body) return fallback;
    const value = getComputedStyle(document.body).getPropertyValue(varName).trim();
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function readCssColor(varName, fallback) {
    if (!document.body) return fallback;
    const value = getComputedStyle(document.body).getPropertyValue(varName).trim();
    return value || fallback;
  }

  function syncConfigFromCss() {
    const colors = [
      readCssColor('--particle-1', config.colors[0]),
      readCssColor('--particle-2', config.colors[1]),
      readCssColor('--particle-3', config.colors[2]),
      readCssColor('--particle-4', config.colors[3])
    ].filter(Boolean);

    if (colors.length) {
      config.colors = colors;
    }

    const count = readCssNumber('--particle-count', config.particleCount);
    if (Number.isFinite(count)) {
      config.particleCount = Math.max(0, Math.round(count));
    }
  }

  /**
   * Particle class
   */
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = config.minSize + Math.random() * (config.maxSize - config.minSize);
      this.speedX = (Math.random() - 0.5) * config.maxSpeed;
      this.speedY = (Math.random() - 0.5) * config.maxSpeed;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      this.opacity = 0.3 + Math.random() * 0.5;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.02 + Math.random() * 0.02;
    }

    update() {
      // Mouse influence
      if (mouseX !== null && mouseY !== null) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseInfluenceRadius) {
          const force = (config.mouseInfluenceRadius - distance) / config.mouseInfluenceRadius;
          this.speedX -= dx * force * config.mouseInfluenceStrength;
          this.speedY -= dy * force * config.mouseInfluenceStrength;
        }
      }

      // Apply speed limits
      const maxSpeed = config.maxSpeed * 2;
      this.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, this.speedX));
      this.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, this.speedY));

      // Friction
      this.speedX *= 0.99;
      this.speedY *= 0.99;

      // Move
      this.x += this.speedX;
      this.y += this.speedY;

      // Pulse
      this.pulse += this.pulseSpeed;
      const pulseFactor = 0.3 + (Math.sin(this.pulse) + 1) * 0.35;
      this.currentOpacity = this.opacity * pulseFactor;

      // Wrap around screen
      if (this.x < -50) this.x = canvas.width + 50;
      if (this.x > canvas.width + 50) this.x = -50;
      if (this.y < -50) this.y = canvas.height + 50;
      if (this.y > canvas.height + 50) this.y = -50;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.currentOpacity;
      ctx.fill();

      // Glow effect
      ctx.shadowColor = this.color;
      ctx.shadowBlur = this.size * 2;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /**
   * Draw connections between nearby particles
   */
  function drawConnections() {
    ctx.globalAlpha = config.connectionOpacity;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * config.connectionOpacity;
          ctx.globalAlpha = opacity;

          // Gradient line
          const gradient = ctx.createLinearGradient(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y
          );
          gradient.addColorStop(0, particles[i].color);
          gradient.addColorStop(1, particles[j].color);

          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  /**
   * Animation loop
   */
  function animate() {
    if (!isVisible) {
      animationId = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections
    drawConnections();

    ctx.globalAlpha = 1;

    animationId = requestAnimationFrame(animate);
  }

  /**
   * Handle window resize
   */
  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /**
   * Handle mouse movement
   */
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function handleMouseLeave() {
    mouseX = null;
    mouseY = null;
  }

  /**
   * Handle visibility change (pause when tab is hidden)
   */
  function handleVisibilityChange() {
    isVisible = !document.hidden;
  }

  /**
   * Initialize particle canvas
   */
  function init() {
    // Check if canvas already exists
    if (document.getElementById('particle-canvas')) {
      console.log('Particle canvas already exists');
      return;
    }

    // Create canvas
    canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    ctx = canvas.getContext('2d');

    // Set size
    handleResize();

    syncConfigFromCss();

    // Create particles
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start animation
    animate();

    console.log('Particle canvas initialized');
  }

  function setColors(colors) {
    if (!Array.isArray(colors) || colors.length === 0) return;
    config.colors = colors;
    particles.forEach(particle => {
      particle.color = config.colors[Math.floor(Math.random() * config.colors.length)];
    });
  }

  function setCount(count) {
    const nextCount = Math.max(0, Math.round(count));
    config.particleCount = nextCount;

    if (nextCount > particles.length) {
      for (let i = particles.length; i < nextCount; i++) {
        particles.push(new Particle());
      }
    } else if (nextCount < particles.length) {
      particles = particles.slice(0, nextCount);
    }
  }

  /**
   * Destroy particle canvas
   */
  function destroy() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseleave', handleMouseLeave);
    document.removeEventListener('visibilitychange', handleVisibilityChange);

    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }

    particles = [];
    canvas = null;
    ctx = null;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
  } else {
    setTimeout(init, 100);
  }

  // Export for manual use
  SAE.modules = SAE.modules || {};
  SAE.modules.particleCanvas = {
    init,
    destroy,
    config,
    setColors,
    setCount
  };
})();
