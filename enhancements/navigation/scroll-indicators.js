/**
 * Summer Ann Portfolio - Scroll Indicators
 * Progress bar and section dots
 */

(function() {
  'use strict';

  const SAE = window.SummerAnnEnhancements || {};

  // Get sections from config
  const config = SAE.config?.navigation || {
    sections: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'portfolio', label: 'Projects' },
      { id: 'resume', label: 'Experience' },
      { id: 'skills', label: 'Skills' }
    ]
  };

  let progressBar = null;
  let sectionDots = null;
  let currentSection = 'home';

  /**
   * Create progress bar
   */
  function createProgressBar() {
    if (document.getElementById('scroll-progress')) return;

    progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-label', 'Page scroll progress');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.setAttribute('aria-valuenow', '0');
    document.body.prepend(progressBar);
  }

  /**
   * Create section dots
   */
  function createSectionDots() {
    if (document.getElementById('section-dots')) return;

    sectionDots = document.createElement('div');
    sectionDots.id = 'section-dots';
    sectionDots.setAttribute('role', 'navigation');
    sectionDots.setAttribute('aria-label', 'Page sections');

    const dotsHtml = config.sections.map(section => `
      <button
        class="dot ${section.id === 'home' ? 'active' : ''}"
        data-section="${section.id}"
        aria-label="Go to ${section.label}"
        title="${section.label}"
      ></button>
    `).join('');

    sectionDots.innerHTML = dotsHtml;
    document.body.appendChild(sectionDots);

    // Add click handlers
    sectionDots.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const sectionId = dot.dataset.section;
        const target = document.getElementById(sectionId);

        if (target) {
          if (SAE.scrollTo) {
            SAE.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  /**
   * Update progress bar
   */
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
    }
  }

  /**
   * Update active section dot
   */
  function updateActiveDot() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    let newCurrentSection = 'home';

    config.sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const top = rect.top + scrollY;

        if (scrollY >= top - windowHeight * 0.4) {
          newCurrentSection = section.id;
        }
      }
    });

    if (newCurrentSection !== currentSection) {
      currentSection = newCurrentSection;

      if (sectionDots) {
        sectionDots.querySelectorAll('.dot').forEach(dot => {
          if (dot.dataset.section === currentSection) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    }
  }

  /**
   * Handle scroll events
   */
  function handleScroll() {
    requestAnimationFrame(() => {
      updateProgress();
      updateActiveDot();
    });
  }

  /**
   * Listen for section changes from enhanced nav
   */
  function listenForSectionChanges() {
    window.addEventListener('sectionChange', (e) => {
      const { section } = e.detail;
      currentSection = section;

      if (sectionDots) {
        sectionDots.querySelectorAll('.dot').forEach(dot => {
          if (dot.dataset.section === currentSection) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }

  /**
   * Initialize scroll indicators
   */
  function init() {
    createProgressBar();
    createSectionDots();
    listenForSectionChanges();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial update
    handleScroll();

    console.log('Scroll indicators initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
  } else {
    setTimeout(init, 500);
  }

  // Export for manual use
  SAE.modules = SAE.modules || {};
  SAE.modules.scrollIndicators = {
    init,
    updateProgress,
    updateActiveDot
  };
})();
