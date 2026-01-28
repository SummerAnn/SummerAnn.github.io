/**
 * Summer Ann Portfolio - Magnetic Buttons
 * Creates magnetic hover effects on interactive elements
 */

(function() {
  'use strict';

  const SAE = window.SummerAnnEnhancements || {};

  // Configuration
  const config = {
    strength: 0.3,
    ease: 0.15,
    threshold: 100
  };

  // Store active magnets
  const magnets = new Map();

  /**
   * Magnetic element class
   */
  class MagneticElement {
    constructor(element) {
      this.element = element;
      this.boundingRect = null;
      this.x = 0;
      this.y = 0;
      this.targetX = 0;
      this.targetY = 0;
      this.isAnimating = false;
      this.strength = parseFloat(element.dataset.magneticStrength) || config.strength;

      this.init();
    }

    init() {
      this.element.style.transition = 'none';
      this.element.style.willChange = 'transform';

      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.updatePosition = this.updatePosition.bind(this);

      this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      this.element.addEventListener('mousemove', this.handleMouseMove);
      this.element.addEventListener('mouseleave', this.handleMouseLeave);

      // Touch support
      this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
      this.element.addEventListener('touchend', this.handleMouseLeave);
    }

    handleMouseEnter() {
      this.boundingRect = this.element.getBoundingClientRect();
      this.startAnimation();
    }

    handleMouseMove(e) {
      if (!this.boundingRect) return;

      const centerX = this.boundingRect.left + this.boundingRect.width / 2;
      const centerY = this.boundingRect.top + this.boundingRect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      this.targetX = deltaX * this.strength;
      this.targetY = deltaY * this.strength;
    }

    handleTouchMove(e) {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        this.handleMouseMove({
          clientX: touch.clientX,
          clientY: touch.clientY
        });
      }
    }

    handleMouseLeave() {
      this.targetX = 0;
      this.targetY = 0;
      this.boundingRect = null;
    }

    startAnimation() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      this.updatePosition();
    }

    updatePosition() {
      // Lerp towards target
      this.x += (this.targetX - this.x) * config.ease;
      this.y += (this.targetY - this.y) * config.ease;

      // Apply transform
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;

      // Continue animation if not at rest
      if (Math.abs(this.targetX - this.x) > 0.01 || Math.abs(this.targetY - this.y) > 0.01) {
        requestAnimationFrame(this.updatePosition);
      } else {
        this.isAnimating = false;
        if (this.targetX === 0 && this.targetY === 0) {
          this.element.style.transform = '';
        }
      }
    }

    destroy() {
      this.element.removeEventListener('mouseenter', this.handleMouseEnter);
      this.element.removeEventListener('mousemove', this.handleMouseMove);
      this.element.removeEventListener('mouseleave', this.handleMouseLeave);
      this.element.style.transform = '';
      this.element.style.transition = '';
    }
  }

  /**
   * Initialize magnetic effect on an element
   */
  function initMagnetic(element) {
    if (magnets.has(element)) return;

    const magnet = new MagneticElement(element);
    magnets.set(element, magnet);
    return magnet;
  }

  /**
   * Initialize all magnetic elements
   */
  function init() {
    // Find all elements with data-magnetic attribute
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    magneticElements.forEach(initMagnetic);

    // Auto-apply to common interactive elements
    const autoMagneticSelectors = [
      '.social-links a',
      '.social-icons a',
      'nav a',
      '#enhanced-nav a',
      '.btn',
      'button:not(#wam-btn):not(#chatbox-toggle)',
      '.neon-btn',
      '.icon-link'
    ];

    autoMagneticSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        // Add magnetic attribute for styling
        el.setAttribute('data-magnetic', '');
        initMagnetic(el);
      });
    });

    console.log('Magnetic buttons initialized:', magnets.size, 'elements');
  }

  // Mutation observer to catch dynamically added elements
  function observeNewElements() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;

          // Check if the node itself has data-magnetic
          if (node.hasAttribute && node.hasAttribute('data-magnetic')) {
            initMagnetic(node);
          }

          // Check children
          if (node.querySelectorAll) {
            node.querySelectorAll('[data-magnetic]').forEach(initMagnetic);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        init();
        observeNewElements();
      }, 500);
    });
  } else {
    setTimeout(() => {
      init();
      observeNewElements();
    }, 500);
  }

  // Export for manual use
  SAE.modules = SAE.modules || {};
  SAE.modules.magneticButtons = {
    init,
    initMagnetic,
    magnets,
    setStrength: (value) => {
      const next = Number.isFinite(value) ? value : config.strength;
      config.strength = next;
      magnets.forEach(magnet => {
        magnet.strength = next;
      });
    }
  };
})();
