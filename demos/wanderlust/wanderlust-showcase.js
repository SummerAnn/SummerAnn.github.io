/**
 * Wanderlust Showcase - Interactive JavaScript
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initScrollAnimations();
    initParallax();
    initInteractiveElements();
    console.log('Wanderlust showcase initialized');
  }

  /**
   * Scroll-triggered animations
   */
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP not available, using fallback');
      addFallbackAnimations();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Animate feature cards
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate tech badges
    gsap.utils.toArray('.tech-badge').forEach((badge, i) => {
      gsap.fromTo(badge,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: i * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate gallery items
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
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

    // CTA section
    gsap.fromTo('.cta-content',
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  /**
   * Fallback animations
   */
  function addFallbackAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .tech-badge, .gallery-item, .section-header, .cta-content')
      .forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });
  }

  /**
   * Parallax background effect
   */
  function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }, { passive: true });
  }

  /**
   * Interactive elements
   */
  function initInteractiveElements() {
    // Feature card hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
          icon.style.transition = 'transform 0.3s ease';
        }
      });

      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });

    // Gallery item click
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        // Could open a lightbox here
        item.style.transform = 'scale(1.1)';
        setTimeout(() => {
          item.style.transform = '';
        }, 300);
      });
    });

    // Tech badge hover
    document.querySelectorAll('.tech-badge').forEach(badge => {
      badge.addEventListener('mouseenter', () => {
        const icon = badge.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1.2)';
          icon.style.transition = 'transform 0.3s ease';
        }
      });

      badge.addEventListener('mouseleave', () => {
        const icon = badge.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1)';
        }
      });
    });
  }
})();
