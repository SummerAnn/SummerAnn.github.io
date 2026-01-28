/**
 * Summer Ann Portfolio - Enhancement Loader v2.0
 * Master orchestrator that initializes all enhancement modules
 */

(function() {
  'use strict';

  // Global namespace for enhancements
  window.SummerAnnEnhancements = window.SummerAnnEnhancements || {
    config: {
      colors: {
        primary: '#6c63ff',
        secondary: '#00ffe7',
        gradient: 'linear-gradient(90deg, #6c63ff 0%, #00ffe7 100%)'
      },
      animations: {
        scrollRevealDuration: 0.8,
        scrollRevealDistance: 60,
        staggerDelay: 0.1,
        parallaxStrength: 0.3
      },
      navigation: {
        sections: [
          { id: 'home', label: 'Home', icon: 'fas fa-home' },
          { id: 'about', label: 'About', icon: 'fas fa-user' },
          { id: 'portfolio', label: 'Projects', icon: 'fas fa-code' },
          { id: 'resume', label: 'Experience', icon: 'fas fa-briefcase' },
          { id: 'skills', label: 'Skills', icon: 'fas fa-tools' }
        ],
        demoLinks: [
          { id: 'intro-cinematic', label: 'Intro Cinematic', url: '/demos/intro-cinematic/', icon: 'fas fa-film' },
          { id: 'yammoing', label: 'Yammoing', url: '/demos/yammoing/', icon: 'fas fa-heartbeat' },
          { id: 'wanderlust', label: 'Wanderlust', url: '/demos/wanderlust/', icon: 'fas fa-map-marked-alt' },
          { id: 'my-kitchen', label: 'My Kitchen', url: '/demos/my-kitchen/', icon: 'fas fa-utensils' },
          { id: 'college-connect', label: 'College Connect', url: '/demos/college-connect/', icon: 'fas fa-university' },
          { id: 'creatorrag', label: 'CreatorRAG', url: '/demos/creatorrag/', icon: 'fas fa-brain' }
        ]
      }
    },
    modules: {},
    initialized: false
  };

  const SAE = window.SummerAnnEnhancements;

  /**
   * Wait for React content to be rendered
   */
  function waitForReact(callback, maxAttempts = 50) {
    let attempts = 0;

    function check() {
      attempts++;
      const aboutSection = document.getElementById('about');
      const portfolioSection = document.getElementById('portfolio');
      const skillsSection = document.getElementById('skills');

      if (aboutSection || portfolioSection || skillsSection) {
        console.log('React content detected after', attempts, 'attempts');
        callback();
      } else if (attempts < maxAttempts) {
        requestAnimationFrame(check);
      } else {
        console.warn('React content not detected, initializing anyway');
        callback();
      }
    }

    check();
  }

  /**
   * Load a module script dynamically
   */
  function loadModule(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        console.warn('Module not found (skipping):', src);
        resolve(); // Don't reject, just continue
      };
      document.body.appendChild(script);
    });
  }

  /**
   * Initialize all enhancement modules in order
   */
  async function initializeModules() {
    console.log('Initializing Summer Ann Portfolio Enhancements v2.0...');

    // Core modules - load in order
    const coreModules = [
      // Image fixes (load first)
      '/enhancements/core/image-loader-fix.js',
      '/enhancements/core/image-lock.js',
      '/enhancements/core/avatar-fix.js',
      // Content fixes
      '/enhancements/core/text-contrast-fix.js',
      '/enhancements/core/project-sorter.js',
      // Features
      '/enhancements/core/model-profile-carousel.js',
      '/enhancements/core/carousel-debug.js',
      '/enhancements/core/art-carousel.js',
      '/enhancements/core/about-reactive.js',
      '/enhancements/core/demo-fix.js',
      '/enhancements/core/visibility-debugger.js',
      // Theme system (load after content)
      '/enhancements/core/ui-theme-manager.js',
      '/enhancements/core/gabc-theme-switcher.js',
      // UI components
      '/enhancements/core/dynamic-ui-components.js',
      '/enhancements/core/lenis-init.js'
    ];

    // Navigation modules
    const navModules = [
      '/enhancements/navigation/enhanced-nav.js',
      '/enhancements/navigation/fun-menu-modes.js',
      '/enhancements/navigation/scroll-indicators.js'
    ];

    // Motion modules
    const motionModules = [
      '/enhancements/motion/gsap-animations.js',
      '/enhancements/motion/magnetic-buttons.js',
      '/enhancements/motion/particle-canvas.js'
    ];

    // Games
    const gameModules = [
      '/enhancements/games/game-hub.js'
    ];

    // Load all modules
    const allModules = [...coreModules, ...navModules, ...motionModules, ...gameModules];

    for (const modulePath of allModules) {
      try {
        await loadModule(modulePath);
      } catch (err) {
        // Continue even if a module fails
      }
    }

    SAE.initialized = true;
    console.log('All enhancement modules loaded');

    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('enhancementsReady', { detail: SAE }));
  }

  /**
   * Add Font Awesome icons if not already present
   */
  function ensureFontAwesome() {
    const existing = document.querySelector('link[href*="fontawesome"]');
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(link);
    }
  }

  /**
   * Main initialization
   */
  function init() {
    ensureFontAwesome();

    // Wait for React then initialize modules
    waitForReact(() => {
      setTimeout(initializeModules, 200);
    });
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
