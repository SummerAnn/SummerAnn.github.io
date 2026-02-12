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
        webcamLink: { id: 'webcam-gaming', label: 'Webcam Lab', url: '/demos/webcam-gaming/', icon: 'fas fa-video' },
        demoLinks: [
          { id: 'scibook', label: 'SciBook', url: '/demos/scibook/', icon: 'fas fa-flask' },
          { id: 'devseccode', label: 'DevSecCode', url: '/demos/devseccode/', icon: 'fas fa-shield-alt' },
          { id: 'webcam-gaming', label: 'Webcam Lab', url: '/demos/webcam-gaming/', icon: 'fas fa-video' },
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
   * Initialize all enhancement modules - OPTIMIZED for parallel loading
   */
  async function initializeModules() {
    console.log('Initializing Summer Ann Portfolio Enhancements v2.1 (Optimized)...');

    // CRITICAL modules - load first (sequential, small set)
    const criticalModules = [
      '/enhancements/core/performance-optimizer.js',
      '/enhancements/navigation/enhanced-nav.js'
    ];

    // HIGH PRIORITY - load in parallel after critical
    const highPriorityModules = [
      '/enhancements/core/image-loader-fix.js',
      '/enhancements/core/avatar-fix.js',
      '/enhancements/core/text-contrast-fix.js',
      '/enhancements/core/project-sorter.js',
      '/enhancements/core/about-reactive.js'
    ];

    // DEFERRED modules - load after initial render (non-blocking)
    const deferredModules = [
      '/enhancements/core/image-lock.js',
      '/enhancements/core/model-profile-carousel.js',
      '/enhancements/core/carousel-debug.js',
      '/enhancements/core/art-carousel.js',
      '/enhancements/core/demo-fix.js',
      '/enhancements/core/visibility-debugger.js',
      '/enhancements/core/ui-theme-manager.js',
      '/enhancements/core/gabc-theme-switcher.js',
      '/enhancements/core/dynamic-ui-components.js',
      '/enhancements/core/lenis-init.js',
      '/enhancements/navigation/fun-menu-modes.js',
      '/enhancements/navigation/scroll-indicators.js',
      '/enhancements/motion/gsap-animations.js',
      '/enhancements/motion/magnetic-buttons.js'
    ];

    // LAZY modules - load on idle or user interaction
    const lazyModules = [
      '/enhancements/motion/particle-canvas.js',
      '/enhancements/games/game-hub.js'
    ];

    // Step 1: Load critical modules sequentially (fast)
    for (const modulePath of criticalModules) {
      await loadModule(modulePath);
    }

    // Step 2: Load high priority modules in PARALLEL
    await Promise.all(highPriorityModules.map(loadModule));

    SAE.initialized = true;
    console.log('Core enhancement modules loaded');

    // Dispatch event early so UI is responsive
    window.dispatchEvent(new CustomEvent('enhancementsReady', { detail: SAE }));

    // Step 3: Load deferred modules in parallel (non-blocking)
    requestIdleCallback(() => {
      Promise.all(deferredModules.map(loadModule)).then(() => {
        console.log('Deferred modules loaded');
      });
    }, { timeout: 2000 });

    // Step 4: Load lazy modules only when browser is idle
    requestIdleCallback(() => {
      Promise.all(lazyModules.map(loadModule)).then(() => {
        console.log('Lazy modules loaded');
      });
    }, { timeout: 5000 });
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
