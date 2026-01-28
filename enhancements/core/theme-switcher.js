/**
 * Summer Ann Portfolio - Theme Switcher
 * Allows switching between Atelier, Studio, and Arcade themes.
 */

(function() {
  'use strict';

  const THEME_KEY = 'saTheme';
  const DEFAULT_THEME = 'graphite';
  const THEMES = [
    { id: 'graphite', label: 'G' },
    { id: 'atelier', label: 'A' },
    { id: 'studio', label: 'B' },
    { id: 'arcade', label: 'C' }
  ];

  const SAE = window.SummerAnnEnhancements || {};

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (err) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (err) {
      // ignore storage errors
    }
  }

  function setTheme(theme) {
    const nextTheme = THEMES.find(item => item.id === theme) ? theme : DEFAULT_THEME;
    document.body.setAttribute('data-theme', nextTheme);
    setStoredTheme(nextTheme);
    updateActiveButton(nextTheme);
    updateEnhancementConfig(nextTheme);

    window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: nextTheme } }));
  }

  function updateActiveButton(theme) {
    const buttons = document.querySelectorAll('.theme-switch button');
    buttons.forEach(button => {
      if (button.dataset.theme === theme) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  function updateEnhancementConfig(theme) {
    const styles = getComputedStyle(document.body);
    const particleColors = [
      styles.getPropertyValue('--particle-1').trim(),
      styles.getPropertyValue('--particle-2').trim(),
      styles.getPropertyValue('--particle-3').trim(),
      styles.getPropertyValue('--particle-4').trim()
    ].filter(Boolean);

    SAE.config = SAE.config || {};
    SAE.config.colors = SAE.config.colors || {};
    SAE.config.animations = SAE.config.animations || {};

    SAE.config.colors.primary = styles.getPropertyValue('--accent').trim();
    SAE.config.colors.secondary = styles.getPropertyValue('--accent-2').trim();
    SAE.config.colors.gradient = styles.getPropertyValue('--accent-gradient').trim();

    SAE.config.animations.scrollRevealDuration = parseFloat(styles.getPropertyValue('--motion-reveal-duration')) || 0.8;
    SAE.config.animations.scrollRevealDistance = parseFloat(styles.getPropertyValue('--motion-reveal-distance')) || 40;
    SAE.config.animations.staggerDelay = parseFloat(styles.getPropertyValue('--motion-stagger-delay')) || 0.08;

    if (SAE.modules?.particleCanvas?.setColors && particleColors.length) {
      SAE.modules.particleCanvas.setColors(particleColors);
    }

    if (SAE.modules?.particleCanvas?.setCount) {
      const count = parseInt(styles.getPropertyValue('--particle-count'), 10);
      if (!Number.isNaN(count)) {
        SAE.modules.particleCanvas.setCount(count);
      }
    }

    if (SAE.modules?.gsapAnimations?.refresh) {
      SAE.modules.gsapAnimations.refresh();
    }

    if (SAE.modules?.magneticButtons?.setStrength) {
      const strength = theme === 'atelier' ? 0.18 : theme === 'studio' ? 0.32 : theme === 'graphite' ? 0.28 : 0.38;
      SAE.modules.magneticButtons.setStrength(strength);
    }
  }

  function createSwitcher() {
    if (document.querySelector('.theme-switch')) return;

    const navLinks = document.querySelector('#enhanced-nav .nav-links');
    if (!navLinks) return;

    const wrapper = document.createElement('li');
    wrapper.className = 'nav-theme-toggle';

    const switcher = document.createElement('div');
    switcher.className = 'theme-switch';

    switcher.innerHTML = THEMES.map(theme => (
      `<button type="button" data-theme="${theme.id}" aria-label="${theme.id} theme">
        ${theme.label}
      </button>`
    )).join('');

    switcher.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => setTheme(button.dataset.theme));
    });

    wrapper.appendChild(switcher);
    navLinks.appendChild(wrapper);
  }

  function init() {
    const stored = getStoredTheme();
    const initialTheme = stored || document.body.getAttribute('data-theme') || DEFAULT_THEME;
    setTheme(initialTheme);

    if (document.getElementById('enhanced-nav')) {
      createSwitcher();
      updateActiveButton(initialTheme);
    }

    // Wait for nav if it is injected later
    const navObserver = new MutationObserver(() => {
      if (document.getElementById('enhanced-nav')) {
        createSwitcher();
        updateActiveButton(document.body.getAttribute('data-theme'));
        navObserver.disconnect();
      }
    });

    navObserver.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  SAE.modules = SAE.modules || {};
  SAE.modules.themeSwitcher = {
    setTheme,
    getStoredTheme
  };
})();
