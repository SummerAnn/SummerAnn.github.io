/**
 * Performance Optimizer
 * Adds lazy loading, image optimization, and reduces initial load time
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    lazyLoadRootMargin: '100px',
    lazyLoadThreshold: 0.1,
    imagePlaceholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231a1a2e" width="400" height="300"/%3E%3C/svg%3E',
    preloadCount: 3 // Number of images to preload
  };

  /**
   * Add native lazy loading to all images
   */
  function addNativeLazyLoading() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach((img, index) => {
      // Don't lazy load first few images (above the fold)
      if (index < CONFIG.preloadCount) {
        img.loading = 'eager';
        img.fetchPriority = 'high';
      } else {
        img.loading = 'lazy';
        img.decoding = 'async';
      }
    });
  }

  /**
   * Use IntersectionObserver for lazy loading with fade-in effect
   */
  function setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      return; // Fallback: all images load normally
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Handle lazy images with data-src
          if (element.tagName === 'IMG' && element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }

          // Add visible class for animations
          element.classList.add('lazy-loaded');
          observer.unobserve(element);
        }
      });
    }, {
      rootMargin: CONFIG.lazyLoadRootMargin,
      threshold: CONFIG.lazyLoadThreshold
    });

    // Observe all images and lazy elements
    document.querySelectorAll('img[data-src], .lazy-load').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Defer non-critical CSS
   */
  function deferNonCriticalCSS() {
    // Find external stylesheets that can be deferred
    const nonCriticalSheets = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
    nonCriticalSheets.forEach(link => {
      link.media = 'print';
      link.onload = function() {
        this.media = 'all';
      };
    });
  }

  /**
   * Preload critical resources
   */
  function preloadCriticalResources() {
    // Preload hero image
    const heroImg = document.querySelector('.hero img, #home img, .profile-image');
    if (heroImg && heroImg.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImg.src;
      document.head.appendChild(link);
    }

    // Preload fonts (if not already)
    const fonts = [
      { family: 'Space Grotesk', weight: '600' },
      { family: 'Inter', weight: '400' }
    ];
    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = `https://fonts.gstatic.com/s/${font.family.toLowerCase().replace(' ', '')}/v1/${font.weight}.woff2`;
      // Don't add if already exists
      if (!document.querySelector(`link[href*="${font.family.toLowerCase()}"]`)) {
        // Skip for now - fonts are handled by Google Fonts
      }
    });
  }

  /**
   * Add placeholder backgrounds to images while loading
   */
  function addImagePlaceholders() {
    const images = document.querySelectorAll('img:not([data-placeholder-added])');
    images.forEach(img => {
      if (!img.complete && !img.style.backgroundColor) {
        img.style.backgroundColor = '#1a1a2e';
        img.dataset.placeholderAdded = 'true';

        img.addEventListener('load', function() {
          this.style.backgroundColor = '';
        }, { once: true });
      }
    });
  }

  /**
   * Optimize scroll performance
   */
  function optimizeScrollPerformance() {
    // Add will-change to scrolling containers
    const scrollContainers = document.querySelectorAll('.portfolio-items, .timeline, [class*="grid"]');
    scrollContainers.forEach(container => {
      container.style.willChange = 'transform';
    });

    // Remove will-change after initial render
    setTimeout(() => {
      scrollContainers.forEach(container => {
        container.style.willChange = 'auto';
      });
    }, 3000);
  }

  /**
   * Reduce animation jank and improve rendering performance
   */
  function optimizeAnimations() {
    // Add CSS to prefer transforms and optimize rendering
    const style = document.createElement('style');
    style.textContent = `
      .lazy-loaded {
        animation: fadeInLazy 0.3s ease forwards;
      }

      @keyframes fadeInLazy {
        from { opacity: 0.6; }
        to { opacity: 1; }
      }

      /* Optimize images during scroll */
      .is-scrolling img {
        pointer-events: none;
      }

      /* GPU acceleration for animated elements */
      [class*="animate"], .parallax, .scroll-reveal {
        transform: translateZ(0);
        backface-visibility: hidden;
      }

      /* Content-visibility for below-the-fold sections (major perf boost) */
      #portfolio, #resume, #skills {
        content-visibility: auto;
        contain-intrinsic-size: auto 800px;
      }

      /* Reduce paint complexity for heavy sections */
      .portfolio-items, .timeline {
        contain: content;
      }

      /* Optimize project cards */
      .project-card, .portfolio-item {
        contain: layout style;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Debounce scroll events for better performance
   */
  function setupScrollOptimization() {
    let scrollTimeout;
    let isScrolling = false;

    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        document.body.classList.add('is-scrolling');
        isScrolling = true;
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
        isScrolling = false;
      }, 150);
    }, { passive: true });
  }

  /**
   * Reduce DOM queries by caching selectors
   */
  function cacheSelectors() {
    window._cachedSelectors = window._cachedSelectors || {};

    // Cache commonly used selectors
    const selectors = ['#portfolio', '#about', '#skills', '.project-card', '.timeline-card'];
    selectors.forEach(selector => {
      window._cachedSelectors[selector] = document.querySelectorAll(selector);
    });
  }

  /**
   * Initialize all optimizations
   */
  function init() {
    // Run immediately
    addNativeLazyLoading();
    optimizeAnimations();
    deferNonCriticalCSS();

    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setupIntersectionObserver();
        addImagePlaceholders();
        preloadCriticalResources();
        setupScrollOptimization();
        cacheSelectors();
      });
    } else {
      setupIntersectionObserver();
      addImagePlaceholders();
      preloadCriticalResources();
      setupScrollOptimization();
      cacheSelectors();
    }

    // Run after full load
    window.addEventListener('load', () => {
      optimizeScrollPerformance();

      // Re-run image optimization for React-loaded content
      setTimeout(() => {
        addNativeLazyLoading();
        addImagePlaceholders();
        setupIntersectionObserver();
      }, 1000);
    });

    // Watch for dynamically added content (React) - LIMITED to reduce overhead
    let mutationCount = 0;
    const maxMutations = 50; // Stop observing after React finishes rendering

    const mutationObserver = new MutationObserver((mutations) => {
      mutationCount++;

      // Stop observing after initial page load to reduce overhead
      if (mutationCount > maxMutations) {
        mutationObserver.disconnect();
        console.log('[Performance Optimizer] MutationObserver disconnected after initial load');
        return;
      }

      let hasNewImages = false;
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName === 'IMG' || (node.querySelectorAll && node.querySelectorAll('img').length > 0)) {
            hasNewImages = true;
          }
        });
      });

      if (hasNewImages) {
        // Debounce the optimization
        clearTimeout(window._imgOptTimeout);
        window._imgOptTimeout = setTimeout(() => {
          addNativeLazyLoading();
          addImagePlaceholders();
        }, 100);
      }
    });

    if (document.body) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    // Auto-disconnect after 5 seconds regardless (page should be loaded by then)
    setTimeout(() => {
      mutationObserver.disconnect();
    }, 5000);

    console.log('[Performance Optimizer] Initialized');
  }

  // Start optimization
  init();

})();
