/**
 * Summer Ann Portfolio - Lenis Smooth Scrolling
 * Provides butter-smooth scrolling experience
 */

(function() {
  'use strict';

  // Wait for Lenis library to load
  function initLenis() {
    if (typeof Lenis === 'undefined') {
      console.warn('Lenis library not loaded, smooth scrolling disabled');
      return null;
    }

    // Check if we have a valid scroll element
    const scrollElement = document.documentElement || document.body;
    if (!scrollElement) {
      console.warn('No scroll element found, Lenis disabled');
      return null;
    }

    // Create Lenis instance with error handling
    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });
    } catch (error) {
      console.warn('Failed to initialize Lenis:', error);
      return null;
    }

    // Integrate with GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      try {
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          if (lenis && lenis.raf) {
            lenis.raf(time * 1000);
          }
        });

        gsap.ticker.lagSmoothing(0);
      } catch (error) {
        console.warn('Lenis GSAP integration error:', error);
        // Fallback RAF loop
        function raf(time) {
          if (lenis && lenis.raf) {
            try {
              lenis.raf(time);
            } catch (e) {
              console.warn('Lenis RAF error:', e);
              return;
            }
          }
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } else {
      // Fallback RAF loop with error handling
      function raf(time) {
        if (lenis && lenis.raf) {
          try {
            lenis.raf(time);
          } catch (e) {
            console.warn('Lenis RAF error:', e);
            return;
          }
        }
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Handle anchor links with error handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target && lenis && lenis.scrollTo) {
          try {
            e.preventDefault();
            lenis.scrollTo(target, {
              offset: -80, // Account for fixed nav
              duration: 1.5,
            });
          } catch (error) {
            console.warn('Lenis scrollTo error:', error);
          }
        }
      });
    });

    // Expose scroll methods globally with error handling
    window.SummerAnnEnhancements = window.SummerAnnEnhancements || {};
    window.SummerAnnEnhancements.lenis = lenis;
    window.SummerAnnEnhancements.scrollTo = (target, options = {}) => {
      if (lenis && lenis.scrollTo) {
        try {
          lenis.scrollTo(target, {
            offset: -80,
            duration: 1.5,
            ...options
          });
        } catch (error) {
          console.warn('Lenis scrollTo error:', error);
        }
      }
    };

    // Stop/start scroll methods with error handling
    window.SummerAnnEnhancements.stopScroll = () => {
      if (lenis && lenis.stop) {
        try {
          lenis.stop();
        } catch (error) {
          console.warn('Lenis stop error:', error);
        }
      }
    };
    window.SummerAnnEnhancements.startScroll = () => {
      if (lenis && lenis.start) {
        try {
          lenis.start();
        } catch (error) {
          console.warn('Lenis start error:', error);
        }
      }
    };

    console.log('Lenis smooth scrolling initialized');
    return lenis;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLenis);
  } else {
    // Small delay to ensure Lenis library is loaded
    setTimeout(initLenis, 100);
  }
})();
