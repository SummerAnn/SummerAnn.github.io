/**
 * Summer Ann Portfolio - Enhanced Navigation
 * Sticky navigation with section indicators and mobile hamburger menu
 */

(function() {
  'use strict';

  const SAE = window.SummerAnnEnhancements || {};

  // Configuration
  const config = SAE.config?.navigation || {
        sections: [
          { id: 'home', label: 'Home', icon: 'fas fa-home' },
          { id: 'about', label: 'About', icon: 'fas fa-user' },
          { id: 'portfolio', label: 'Projects', icon: 'fas fa-code' },
          { id: 'resume', label: 'Experience', icon: 'fas fa-briefcase' },
          { id: 'skills', label: 'Skills', icon: 'fas fa-tools' },
          { id: 'art', label: 'Art', icon: 'fas fa-palette' }
        ],
        webcamLink: { id: 'webcam-gaming', label: 'Webcam Lab', url: '/demos/webcam-gaming/index.html', icon: 'fas fa-video' },
        demoLinks: [
          { id: 'webcam-gaming', label: 'Webcam Lab', url: '/demos/webcam-gaming/index.html', icon: 'fas fa-video' },
          { id: 'intro-cinematic', label: 'Intro Cinematic', url: '/demos/intro-cinematic/index.html', icon: 'fas fa-film' },
          { id: 'yammoing', label: 'Yammoing', url: '/demos/yammoing/index.html', icon: 'fas fa-heartbeat' },
          { id: 'wanderlust', label: 'Wanderlust', url: '/demos/wanderlust/index.html', icon: 'fas fa-map-marked-alt' },
          { id: 'my-kitchen', label: 'My Kitchen', url: '/demos/my-kitchen/index.html', icon: 'fas fa-utensils' },
          { id: 'college-connect', label: 'College Connect', url: '/demos/college-connect/index.html', icon: 'fas fa-university' },
          { id: 'creatorrag', label: 'CreatorRAG', url: '/demos/creatorrag/index.html', icon: 'fas fa-brain' }
        ]
  };

  let nav = null;
  let hamburger = null;
  let navLinks = null;
  let currentSection = 'home';
  let isNavVisible = false;
  let heroHeight = 0;
  const alwaysVisible = SAE.config?.navigation?.alwaysVisible ?? true;

  /**
   * Create the navigation HTML
   */
  function createNav() {
    // Check if nav already exists
    if (document.getElementById('enhanced-nav')) {
      nav = document.getElementById('enhanced-nav');
      return;
    }

    nav = document.createElement('nav');
    nav.id = 'enhanced-nav';
    nav.setAttribute('aria-label', 'Main navigation');

    const sectionsHtml = config.sections.map(section =>
      `<li>
        <a href="#${section.id}" data-section="${section.id}" data-magnetic>
          <i class="${section.icon}"></i>
          <span>${section.label}</span>
        </a>
      </li>`
    ).join('');

    const webcamLinkHtml = config.webcamLink ? `
      <li class="nav-webcam">
        <a href="${config.webcamLink.url}" data-magnetic>
          <i class="${config.webcamLink.icon}"></i>
          <span>${config.webcamLink.label}</span>
        </a>
      </li>
    ` : '';

    const demosHtml = config.demoLinks.length > 0 ? `
      <li class="nav-dropdown">
        <a href="#" class="dropdown-trigger" data-magnetic>
          <i class="fas fa-rocket"></i>
          <span>Demos</span>
          <i class="fas fa-chevron-down dropdown-arrow"></i>
        </a>
        <ul class="dropdown-menu">
          ${config.demoLinks.map(demo => {
            // Ensure demo URLs point to index.html explicitly
            let demoUrl = demo.url;
            if (demoUrl.endsWith('/')) {
              demoUrl = demoUrl + 'index.html';
            } else if (!demoUrl.endsWith('.html')) {
              demoUrl = demoUrl + '/index.html';
            }
            return `<li>
              <a href="${demoUrl}" target="_self">
                <i class="${demo.icon}"></i>
                <span>${demo.label}</span>
              </a>
            </li>`;
          }).join('')}
        </ul>
      </li>
    ` : '';

    nav.innerHTML = `
      <div class="nav-container">
        <a href="#home" class="nav-logo" data-magnetic>
          <span class="logo-text">SA</span>
          <span class="logo-full">Summer Ann</span>
        </a>

        <ul class="nav-links">
          ${sectionsHtml}
          ${webcamLinkHtml}
          ${demosHtml}
          <li class="nav-games">
            <a href="#" id="nav-games-btn" data-magnetic>
              <i class="fas fa-gamepad"></i>
              <span>Games</span>
            </a>
          </li>
        </ul>

        <div id="nav-hamburger" aria-label="Toggle menu" role="button" tabindex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;

    // Add dropdown styles
    const dropdownStyles = `
      .nav-dropdown {
        position: relative;
      }
      .dropdown-trigger {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
      }
      .dropdown-arrow {
        font-size: 0.7em;
        transition: transform var(--duration-normal) var(--ease-out-quart);
      }
      .nav-dropdown:hover .dropdown-arrow {
        transform: rotate(180deg);
      }
      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        border: var(--glass-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--glass-shadow);
        padding: var(--space-sm);
        min-width: 160px;
        opacity: 0;
        visibility: hidden;
        transition: all var(--duration-normal) var(--ease-out-quart);
        list-style: none;
      }
      .nav-dropdown:hover .dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
      }
      .dropdown-menu li {
        margin: 0;
      }
      .dropdown-menu a {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-sm) var(--space-md) !important;
        border-radius: var(--radius-md);
        white-space: nowrap;
      }
      .dropdown-menu a:hover {
        background: rgba(108, 99, 255, 0.1);
      }
      .nav-webcam a {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-lg);
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: linear-gradient(120deg, rgba(125, 92, 255, 0.12), rgba(34, 211, 238, 0.1));
        transition: border-color var(--duration-normal) var(--ease-out-quart);
      }
      .nav-webcam a:hover {
        border-color: rgba(125, 92, 255, 0.6);
      }
      .nav-games a {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
      }
      #enhanced-nav .nav-links a i {
        font-size: 0.9em;
      }
      #enhanced-nav .nav-links a span {
        display: inline;
      }
      @media (max-width: 1024px) {
        #enhanced-nav .nav-links a span {
          display: none;
        }
        #enhanced-nav .nav-links a i {
          font-size: 1.2em;
        }
      }
      @media (max-width: 768px) {
        #enhanced-nav .nav-links a span {
          display: inline;
        }
        #enhanced-nav .nav-links a i {
          font-size: 1em;
        }
        .dropdown-menu {
          position: static;
          transform: none;
          opacity: 1;
          visibility: visible;
          background: transparent;
          backdrop-filter: none;
          border: none;
          box-shadow: none;
          padding-left: var(--space-lg);
        }
      }
    `;

    const style = document.createElement('style');
    style.textContent = dropdownStyles;
    document.head.appendChild(style);

    document.body.prepend(nav);
    navLinks = nav.querySelector('.nav-links');
    hamburger = nav.querySelector('#nav-hamburger');
  }

  /**
   * Set up event listeners
   */
  function setupEventListeners() {
    // Hamburger menu toggle
    if (hamburger) {
      hamburger.addEventListener('click', toggleMobileMenu);
      hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMobileMenu();
        }
      });
    }

    // Demo dropdown - make it work on click too, not just hover
    const dropdownTrigger = nav.querySelector('.dropdown-trigger');
    const dropdownMenu = nav.querySelector('.dropdown-menu');
    if (dropdownTrigger && dropdownMenu) {
      dropdownTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdownMenu.style.display === 'block';
        dropdownMenu.style.display = isOpen ? 'none' : 'block';
        dropdownMenu.style.visibility = isOpen ? 'hidden' : 'visible';
        dropdownMenu.style.opacity = isOpen ? '0' : '1';
      });
      
      // Ensure dropdown is visible on hover
      const navDropdown = nav.querySelector('.nav-dropdown');
      if (navDropdown) {
        navDropdown.addEventListener('mouseenter', function() {
          dropdownMenu.style.display = 'block';
          dropdownMenu.style.visibility = 'visible';
          dropdownMenu.style.opacity = '1';
        });
      }
      
      // Fix demo links to actually navigate
      dropdownMenu.querySelectorAll('a[href*="/demos/"]').forEach(link => {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          console.log('🔗 Demo link clicked:', href);
          // Force navigation
          if (href && href !== '#') {
            window.location.href = href;
          }
        });
      });
    }

    // Navigation link clicks
    if (navLinks) {
      navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', handleNavClick);
      });
    }

    const webcamLink = nav.querySelector('.nav-webcam a');
    if (webcamLink) {
      webcamLink.addEventListener('click', () => closeMobileMenu());
    }

    // Games button
    const gamesBtn = document.getElementById('nav-games-btn');
    if (gamesBtn) {
      gamesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Trigger game hub if available
        const gameHubTrigger = document.getElementById('game-hub-trigger');
        if (gameHubTrigger) {
          gameHubTrigger.click();
        } else if (SAE.modules?.gameHub?.openHub) {
          SAE.modules.gameHub.openHub();
        } else {
          // Fallback to whackamole
          const wamBtn = document.getElementById('wam-btn');
          if (wamBtn) wamBtn.click();
        }
        // Close mobile menu if open
        closeMobileMenu();
      });
    }

    // Scroll listener for showing/hiding nav
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (navLinks && navLinks.classList.contains('open')) {
        if (!nav.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });

    // Close mobile menu on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /**
   * Handle navigation link click
   */
  function handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');
    if (!href || href === '#') return;

    e.preventDefault();
    const targetId = href.replace('#', '');
    
    // Special handling for Art section - create it if it doesn't exist
    if (targetId === 'art') {
      createArtSection();
      const target = document.getElementById('art');
      if (target) {
        if (SAE.scrollTo) {
          SAE.scrollTo(target);
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        closeMobileMenu();
        updateActiveLink(targetId);
      }
      return;
    }
    
    const target = document.getElementById(targetId);

    if (target) {
      // Use Lenis smooth scroll if available
      if (SAE.scrollTo) {
        SAE.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Close mobile menu
      closeMobileMenu();

      // Update active state
      updateActiveLink(targetId);
    }
  }

  /**
   * Create Art section with carousel if it doesn't exist
   */
  function createArtSection() {
    let artSection = document.getElementById('art');
    
    if (!artSection) {
      // Find where to insert (after skills or before footer)
      const skillsSection = document.getElementById('skills');
      const footer = document.querySelector('footer');
      const insertBefore = footer || document.body.lastElementChild;
      
      artSection = document.createElement('section');
      artSection.id = 'art';
      artSection.setAttribute('data-section', 'art');
      artSection.style.cssText = `
        min-height: 100vh;
        padding: 100px 20px 80px;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
      `;
      
      const artContainer = document.createElement('div');
      artContainer.style.cssText = 'max-width: 1200px; margin: 0 auto;';
      
      const artTitle = document.createElement('h2');
      artTitle.textContent = 'Art & Creative Work';
      artTitle.style.cssText = `
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(32px, 5vw, 48px);
        text-align: center;
        margin: 0 0 60px;
        color: white;
        font-weight: 700;
      `;
      
      artContainer.appendChild(artTitle);
      artSection.appendChild(artContainer);
      
      if (insertBefore && insertBefore.parentNode) {
        insertBefore.parentNode.insertBefore(artSection, insertBefore);
      } else {
        document.body.appendChild(artSection);
      }
      
      console.log('✅ Created Art section');
    }
    
    // Trigger carousel creation with multiple attempts
    const createCarouselAttempts = [100, 300, 500, 1000, 2000];
    createCarouselAttempts.forEach(delay => {
      setTimeout(() => {
        if (window.createArtCarousel) {
          console.log('🎨 Navigation: Attempting to create carousel at', delay, 'ms');
          window.createArtCarousel();
        } else {
          console.warn('⚠️ createArtCarousel function not available yet');
        }
      }, delay);
    });
  }

  /**
   * Toggle mobile menu
   */
  function toggleMobileMenu() {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('nav-open');

    // Stop/start scroll
    if (navLinks.classList.contains('open')) {
      if (SAE.stopScroll) SAE.stopScroll();
    } else {
      if (SAE.startScroll) SAE.startScroll();
    }
  }

  /**
   * Close mobile menu
   */
  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
    document.body.classList.remove('nav-open');
    if (SAE.startScroll) SAE.startScroll();
  }

  /**
   * Handle scroll events
   */
  function handleScroll() {
    const scrollY = window.scrollY;

    // Calculate hero height if not set
    if (heroHeight === 0) {
      const hero = document.querySelector('.video-container, .hero, #home, header');
      heroHeight = hero ? hero.offsetHeight : window.innerHeight * 0.8;
    }

    if (alwaysVisible) {
      if (!isNavVisible) {
        nav.classList.add('visible');
        isNavVisible = true;
      }
      updateActiveSection();
      return;
    }

    // Show/hide navigation
    if (scrollY > heroHeight * 0.5) {
      if (!isNavVisible) {
        nav.classList.add('visible');
        isNavVisible = true;
      }
    } else {
      if (isNavVisible) {
        nav.classList.remove('visible');
        isNavVisible = false;
      }
    }

    // Update active section
    updateActiveSection();
  }

  /**
   * Update active section based on scroll position
   */
  function updateActiveSection() {
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
      updateActiveLink(currentSection);

      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('sectionChange', {
        detail: { section: currentSection }
      }));
    }
  }

  /**
   * Update active link styling
   */
  function updateActiveLink(sectionId) {
    if (!navLinks) return;

    navLinks.querySelectorAll('a').forEach(link => {
      const linkSection = link.dataset.section;
      if (linkSection === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Initialize navigation
   */
  function init() {
    createNav();
    setupEventListeners();

    // Initial check
    handleScroll();

    console.log('Enhanced navigation initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 400));
  } else {
    setTimeout(init, 400);
  }

  // Export for manual use
  SAE.modules = SAE.modules || {};
  SAE.modules.enhancedNav = {
    init,
    updateActiveLink,
    closeMobileMenu
  };
})();
