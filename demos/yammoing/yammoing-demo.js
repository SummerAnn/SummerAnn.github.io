/**
 * Yammoing Demo - Interactive JavaScript
 */

(function() {
  'use strict';

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initScrollAnimations();
    initParticles();
    initScanAnimation();
    console.log('Yammoing demo initialized');
  }

  /**
   * Scroll-triggered animations
   */
  function initScrollAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP not available, using fallback animations');
      addFallbackAnimations();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Animate flip cards
    gsap.utils.toArray('.flip-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.fromTo(header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate demo section
    const demoVisual = document.querySelector('.demo-visual');
    const demoContent = document.querySelector('.demo-content');

    if (demoVisual) {
      gsap.fromTo(demoVisual,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: demoVisual,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    if (demoContent) {
      gsap.fromTo(demoContent,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: demoContent,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Animate CTA section
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
      gsap.fromTo(ctaContent,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaContent,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }

  /**
   * Fallback animations for when GSAP isn't available
   */
  function addFallbackAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.flip-card, .section-header, .demo-visual, .demo-content, .cta-content')
      .forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
      .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Hero particles effect
   */
  function initParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const particles = [];
    const particleCount = 30;
    const colors = ['#6c63ff', '#00ffe7', '#a1c4fd'];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.color;
            ctx.globalAlpha = (120 - distance) / 120 * 0.2;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    });
  }

  /**
   * Interactive scan animation
   */
  function initScanAnimation() {
    const scanCircle = document.querySelector('.scan-circle');
    const scanLine = document.querySelector('.scan-line');

    if (!scanCircle) return;

    // Add data visualization dots
    const dataPoints = [];
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--neon-secondary);
        border-radius: 50%;
        animation: pulse 1.5s ease-in-out infinite;
        animation-delay: ${i * 0.2}s;
        box-shadow: 0 0 10px var(--neon-secondary);
      `;

      const angle = (i / 8) * Math.PI * 2;
      const radius = 80;
      dot.style.left = `calc(50% + ${Math.cos(angle) * radius}px - 4px)`;
      dot.style.top = `calc(50% + ${Math.sin(angle) * radius}px - 4px)`;

      scanCircle.appendChild(dot);
      dataPoints.push(dot);
    }

    // Pulse animation on hover
    const scanAnimation = document.querySelector('.scan-animation');
    if (scanAnimation) {
      scanAnimation.addEventListener('mouseenter', () => {
        dataPoints.forEach((dot, i) => {
          dot.style.animationDuration = '0.8s';
        });
      });

      scanAnimation.addEventListener('mouseleave', () => {
        dataPoints.forEach(dot => {
          dot.style.animationDuration = '1.5s';
        });
      });
    }
  }
})();
