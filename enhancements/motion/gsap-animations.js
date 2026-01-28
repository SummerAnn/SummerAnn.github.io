/**
 * Summer Ann Portfolio - GSAP Animations
 * Scroll reveal animations, parallax effects, and stagger animations
 */

(function() {
  'use strict';

  const SAE = window.SummerAnnEnhancements || {};
  const config = SAE.config?.animations || {
    scrollRevealDuration: 0.8,
    scrollRevealDistance: 60,
    staggerDelay: 0.1,
    parallaxStrength: 0.3
  };

  function readCssNumber(varName, fallback) {
    if (!document.body) return fallback;
    const value = getComputedStyle(document.body).getPropertyValue(varName).trim();
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function syncConfigFromCss() {
    config.scrollRevealDuration = readCssNumber('--motion-reveal-duration', config.scrollRevealDuration);
    config.scrollRevealDistance = readCssNumber('--motion-reveal-distance', config.scrollRevealDistance);
    config.staggerDelay = readCssNumber('--motion-stagger-delay', config.staggerDelay);
  }

  /**
   * Initialize GSAP animations
   */
  function init() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded, animations disabled');
      return;
    }

    if (typeof ScrollTrigger === 'undefined') {
      console.warn('ScrollTrigger not loaded, scroll animations disabled');
      return;
    }

    syncConfigFromCss();

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all animations
    initScrollReveal();
    initProjectCardAnimations();
    initTimelineAnimations();
    initSkillsAnimations();
    initParallaxEffects();
    initTextSplitAnimations();

    console.log('GSAP animations initialized');
  }

  /**
   * Generic scroll reveal for sections
   */
  function initScrollReveal() {
    // Reveal section titles
    gsap.utils.toArray('.section-title, .section-title-holder h2, h1, h2').forEach(title => {
      gsap.fromTo(title,
        {
          opacity: 0,
          y: config.scrollRevealDistance,
          skewY: 2
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: config.scrollRevealDuration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Reveal paragraphs and text blocks
    gsap.utils.toArray('.about-text, .description, p:not(.no-animate)').forEach((text, i) => {
      gsap.fromTo(text,
        {
          opacity: 0,
          y: Math.max(10, config.scrollRevealDistance * 0.6)
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  /**
   * Project card stagger animations
   */
  function initProjectCardAnimations() {
    // Target project cards in portfolio section
    const portfolioSection = document.getElementById('portfolio');
    if (!portfolioSection) return;

    const cards = portfolioSection.querySelectorAll('.foto, .foto div, .project-card, [class*="project"]');

    if (cards.length === 0) {
      // Try finding cards after a short delay (React may still be rendering)
      setTimeout(() => {
        const delayedCards = portfolioSection.querySelectorAll('.foto, .foto div, .project-card');
        if (delayedCards.length > 0) {
          animateCards(delayedCards);
        }
      }, 500);
    } else {
      animateCards(cards);
    }
  }

  function animateCards(cards) {
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: config.scrollRevealDistance,
        scale: 0.95,
        rotateX: 5
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: config.scrollRevealDuration,
        stagger: {
          each: config.staggerDelay,
          from: 'start'
        },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards[0]?.parentElement || cards[0],
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Add hover animations
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }

  /**
   * Timeline/Experience animations
   */
  function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll(
      '.vertical-timeline-element, .timeline-item, [class*="timeline"], .experience-item'
    );

    if (timelineItems.length === 0) return;

    timelineItems.forEach((item, index) => {
      const isLeft = index % 2 === 0;

      gsap.fromTo(item,
        {
          opacity: 0,
          x: isLeft ? -50 : 50,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Hover effect
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          x: isLeft ? 8 : -8,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }

  /**
   * Skills icons stagger animation
   */
  function initSkillsAnimations() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const skillIcons = skillsSection.querySelectorAll(
      '.skill-icon, [class*="skill"], .devicon, [class*="devicon"], i[class*="devicon"]'
    );

    if (skillIcons.length === 0) return;

    // Create a timeline for skills
    const skillsTl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsSection,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    skillsTl.fromTo(skillIcons,
      {
        opacity: 0,
        y: 30,
        scale: 0.5,
        rotation: -10
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: {
          each: 0.05,
          from: 'random'
        },
        ease: 'back.out(1.7)'
      }
    );

    // Hover effect for skill icons
    skillIcons.forEach(icon => {
      icon.style.cursor = 'pointer';
      icon.style.transition = 'transform 0.3s ease';

      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.2,
          y: -5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }

  /**
   * Parallax effects on sections
   */
  function initParallaxEffects() {
    // Parallax on images
    const parallaxImages = document.querySelectorAll('.polaroid img, .profile-img, [class*="hero"] img');

    parallaxImages.forEach(img => {
      gsap.to(img, {
        y: -50 * config.parallaxStrength,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Parallax on background elements
    const bgElements = document.querySelectorAll('[class*="background"], [class*="bg-"]');

    bgElements.forEach(el => {
      gsap.to(el, {
        y: 30 * config.parallaxStrength,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    });
  }

  /**
   * Text split animations for headings
   */
  function initTextSplitAnimations() {
    // Find main headings that should have split text animation
    const headings = document.querySelectorAll('.hero-title, .main-title, h1.title');

    headings.forEach(heading => {
      const text = heading.textContent;
      heading.innerHTML = '';
      heading.style.opacity = 1;

      // Split text into spans
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = 0;
        heading.appendChild(span);
      });

      // Animate characters
      gsap.to(heading.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 300));
  } else {
    setTimeout(init, 300);
  }

  // Also listen for enhancements ready event
  window.addEventListener('enhancementsReady', init);

  // Export for manual initialization
  SAE.modules = SAE.modules || {};
  SAE.modules.gsapAnimations = {
    init,
    refresh: () => {
      syncConfigFromCss();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }
  };
})();
