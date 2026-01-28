/**
 * GABC Theme Switcher v2.0
 * G = Graphite - 섬머님.mp4 | A = Atelier - YouTube
 * B = Studio - Intro.mp4 | C = Arcade - Summer Arcade H.MP4 | D = Chinatown - summer chinatown h.MP4
 */

(function() {
  'use strict';

  const THEME_CONFIG = {
    'G': {
      themeId: 'youtube-1',
      name: 'Graphite',
      description: 'Sleek & Modern',
      colors: {
        primary: '#e2e6ec',
        secondary: '#9fa7b4',
        gradient: 'linear-gradient(135deg, #f4f6f9 0%, #9fa7b4 50%, #e7ebf0 100%)',
        glow: 'rgba(226, 230, 236, 0.6)',
        text: '#0f1114'
      },
      icon: '◆'
    },
    'A': {
      themeId: 'youtube-2',
      name: 'Atelier',
      description: 'Elegant Gallery',
      colors: {
        primary: '#2e5bff',
        secondary: '#c36a2d',
        gradient: 'linear-gradient(135deg, #f6f0e6 0%, #2e5bff 50%, #fffcf7 100%)',
        glow: 'rgba(46, 91, 255, 0.5)',
        text: '#161514'
      },
      icon: '❖'
    },
    'B': {
      themeId: 'saved-1',
      name: 'Studio',
      description: 'Dev Environment',
      colors: {
        primary: '#7cff6b',
        secondary: '#6ba6ff',
        gradient: 'linear-gradient(135deg, #0b0f14 0%, #7cff6b 50%, #6ba6ff 100%)',
        glow: 'rgba(124, 255, 107, 0.6)',
        text: '#ffffff'
      },
      icon: '⬡'
    },
    'C': {
      themeId: 'saved-2',
      name: 'Arcade',
      description: 'Summer Arcade',
      colors: {
        primary: '#ff2bd6',
        secondary: '#00e5ff',
        gradient: 'linear-gradient(135deg, #070618 0%, #ff2bd6 50%, #00e5ff 100%)',
        glow: 'rgba(255, 43, 214, 0.7)',
        text: '#ffffff'
      },
      icon: '✦'
    },
    'D': {
      themeId: 'saved-3',
      name: 'Chinatown',
      description: 'Summer Chinatown',
      colors: {
        primary: '#ff6b35',
        secondary: '#f7c94b',
        gradient: 'linear-gradient(135deg, #1a0a0a 0%, #ff6b35 40%, #f7c94b 100%)',
        glow: 'rgba(255, 107, 53, 0.6)',
        text: '#ffffff'
      },
      icon: '◈'
    }
  };

  let currentActive = null;

  function injectStyles() {
    if (document.getElementById('gabc-switcher-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'gabc-switcher-styles';
    styles.textContent = `
      #gabc-theme-switcher {
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 12px;
        z-index: 99999;
        visibility: visible;
        opacity: 1;
        pointer-events: auto;
        padding: 8px 12px;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 50px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        cursor: move;
        user-select: none;
        -webkit-user-select: none;
      }
      
      #gabc-theme-switcher.dragging {
        cursor: grabbing;
        opacity: 0.8;
      }
      
      #gabc-theme-switcher .gabc-btn {
        cursor: pointer;
      }

      .gabc-btn {
        position: relative;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        font-weight: 800;
        font-size: 18px;
        font-family: 'Space Grotesk', system-ui, sans-serif;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .gabc-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .gabc-btn::after {
        content: attr(data-icon);
        position: absolute;
        font-size: 10px;
        bottom: -2px;
        opacity: 0;
        transition: all 0.3s ease;
      }

      .gabc-btn:hover {
        transform: translateY(-4px) scale(1.1);
      }

      .gabc-btn:hover::after {
        opacity: 0.7;
        bottom: 2px;
      }

      .gabc-btn.active {
        transform: scale(1.15);
        border-width: 3px;
      }

      .gabc-btn.active::before {
        opacity: 1;
        animation: pulse-ring 2s ease-out infinite;
      }

      /* G - Graphite */
      .gabc-g {
        background: linear-gradient(135deg, #f4f6f9 0%, #b7bdc8 100%);
        color: #0f1114;
        border-color: rgba(226, 230, 236, 0.3);
      }
      .gabc-g:hover, .gabc-g.active {
        box-shadow: 0 0 30px rgba(226, 230, 236, 0.6), 0 8px 25px rgba(0, 0, 0, 0.3);
        border-color: #e2e6ec;
      }
      .gabc-g::before {
        background: radial-gradient(circle, rgba(226, 230, 236, 0.4) 0%, transparent 70%);
      }

      /* A - Atelier */
      .gabc-a {
        background: linear-gradient(135deg, #fffcf7 0%, #2e5bff 100%);
        color: #161514;
        border-color: rgba(46, 91, 255, 0.3);
      }
      .gabc-a:hover, .gabc-a.active {
        box-shadow: 0 0 30px rgba(46, 91, 255, 0.5), 0 8px 25px rgba(0, 0, 0, 0.3);
        border-color: #2e5bff;
      }
      .gabc-a::before {
        background: radial-gradient(circle, rgba(46, 91, 255, 0.3) 0%, transparent 70%);
      }

      /* B - Studio */
      .gabc-b {
        background: linear-gradient(135deg, #0b0f14 0%, #7cff6b 100%);
        color: #ffffff;
        border-color: rgba(124, 255, 107, 0.3);
        text-shadow: 0 0 10px rgba(124, 255, 107, 0.5);
      }
      .gabc-b:hover, .gabc-b.active {
        box-shadow: 0 0 30px rgba(124, 255, 107, 0.6), 0 8px 25px rgba(0, 0, 0, 0.3);
        border-color: #7cff6b;
      }
      .gabc-b::before {
        background: radial-gradient(circle, rgba(124, 255, 107, 0.4) 0%, transparent 70%);
      }

      /* C - Arcade */
      .gabc-c {
        background: linear-gradient(135deg, #070618 0%, #ff2bd6 50%, #00e5ff 100%);
        color: #ffffff;
        border-color: rgba(255, 43, 214, 0.3);
        text-shadow: 0 0 10px rgba(255, 43, 214, 0.7);
        animation: arcade-shimmer 3s ease-in-out infinite;
      }
      .gabc-c:hover, .gabc-c.active {
        box-shadow: 0 0 35px rgba(255, 43, 214, 0.7), 0 0 20px rgba(0, 229, 255, 0.5), 0 8px 25px rgba(0, 0, 0, 0.3);
        border-color: #ff2bd6;
      }
      .gabc-c::before {
        background: radial-gradient(circle, rgba(255, 43, 214, 0.5) 0%, rgba(0, 229, 255, 0.3) 50%, transparent 70%);
      }

      /* D - Chinatown */
      .gabc-d {
        background: linear-gradient(135deg, #1a0a0a 0%, #ff6b35 50%, #f7c94b 100%);
        color: #ffffff;
        border-color: rgba(255, 107, 53, 0.4);
        text-shadow: 0 0 10px rgba(255, 107, 53, 0.6);
      }
      .gabc-d:hover, .gabc-d.active {
        box-shadow: 0 0 30px rgba(255, 107, 53, 0.6), 0 8px 25px rgba(0, 0, 0, 0.3);
        border-color: #ff6b35;
      }
      .gabc-d::before {
        background: radial-gradient(circle, rgba(255, 107, 53, 0.4) 0%, rgba(247, 201, 75, 0.3) 50%, transparent 70%);
      }

      @keyframes pulse-ring {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.5; }
        100% { transform: scale(1); opacity: 1; }
      }

      @keyframes arcade-shimmer {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(15deg); }
      }

      /* Tooltip on hover */
      .gabc-btn .tooltip {
        position: absolute;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 100;
      }

      .gabc-btn:hover .tooltip {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      /* Mobile responsiveness */
      @media (max-width: 768px) {
        #gabc-theme-switcher {
          top: auto;
          bottom: 20px;
          right: 50%;
          transform: translateX(50%);
          gap: 8px;
          padding: 6px 10px;
        }
        .gabc-btn {
          width: 40px;
          height: 40px;
          font-size: 16px;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  function createButtons() {
    // Remove existing if any
    const existing = document.getElementById('gabc-theme-switcher');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.id = 'gabc-theme-switcher';
    container.setAttribute('role', 'group');
    container.setAttribute('aria-label', 'Theme Switcher');
    
    // Make container draggable
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    container.addEventListener('mousedown', function(e) {
      // Don't drag if clicking a button
      if (e.target.classList.contains('gabc-btn') || e.target.closest('.gabc-btn')) {
        return;
      }
      
      isDragging = true;
      container.classList.add('dragging');
      startX = e.clientX;
      startY = e.clientY;
      
      const rect = container.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const newLeft = startLeft + deltaX;
      const newTop = startTop + deltaY;
      
      // Keep within viewport
      const maxLeft = window.innerWidth - container.offsetWidth;
      const maxTop = window.innerHeight - container.offsetHeight;
      
      const finalLeft = Math.max(0, Math.min(newLeft, maxLeft));
      const finalTop = Math.max(0, Math.min(newTop, maxTop));
      
      container.style.left = finalLeft + 'px';
      container.style.top = finalTop + 'px';
      container.style.right = 'auto';
    });
    
    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        container.classList.remove('dragging');
        
        // Save position
        localStorage.setItem('gabc-position', JSON.stringify({
          left: container.style.left,
          top: container.style.top
        }));
      }
    });
    
    Object.entries(THEME_CONFIG).forEach(([letter, config]) => {
      const button = document.createElement('button');
      button.className = `gabc-btn gabc-${letter.toLowerCase()}`;
      button.textContent = letter;
      button.setAttribute('data-theme', config.themeId);
      button.setAttribute('data-icon', config.icon);
      button.setAttribute('aria-label', `Switch to ${config.name} theme`);
      button.setAttribute('title', config.name);

      // Add tooltip
      const tooltip = document.createElement('span');
      tooltip.className = 'tooltip';
      tooltip.textContent = config.name;
      button.appendChild(tooltip);

      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const themeId = this.getAttribute('data-theme');
        console.log('GABC Button clicked:', letter, '-> Theme:', themeId);

        // Call the theme switch function
        if (window.switchPortfolioTheme) {
          window.switchPortfolioTheme(themeId);
        } else {
          console.warn('switchPortfolioTheme not available, waiting...');
          setTimeout(() => {
            if (window.switchPortfolioTheme) {
              window.switchPortfolioTheme(themeId);
            } else {
              // Fallback: reload with theme param
              const url = new URL(window.location);
              url.searchParams.set('theme', themeId);
              window.location.href = url.toString();
            }
          }, 500);
        }

        // Update visual state immediately
        updateActiveState(letter);
      });

      container.appendChild(button);
    });

    document.body.appendChild(container);

    // Restore saved position only if it keeps the switcher in view
    try {
      const saved = localStorage.getItem('gabc-position');
      if (saved) {
        const pos = JSON.parse(saved);
        const left = parseFloat(pos.left);
        const top = parseFloat(pos.top);
        const padding = 20;
        const w = container.offsetWidth || 260;
        const h = container.offsetHeight || 64;
        const maxLeft = window.innerWidth - w - padding;
        const maxTop = window.innerHeight - h - padding;
        if (!isNaN(left) && !isNaN(top) && left >= -padding && left <= maxLeft + padding && top >= -padding && top <= maxTop + padding) {
          container.style.left = left + 'px';
          container.style.top = top + 'px';
          container.style.right = 'auto';
        }
      }
    } catch (e) {
      console.warn('Could not restore GABC position:', e);
    }

    console.log('GABC Theme Switcher created');

    // Set initial active state
    const currentTheme = getCurrentThemeId();
    const activeLetter = Object.entries(THEME_CONFIG).find(
      ([, config]) => config.themeId === currentTheme
    )?.[0];
    if (activeLetter) {
      updateActiveState(activeLetter);
    }
  }

  function getCurrentThemeId() {
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    if (themeParam) return themeParam;

    const stored = localStorage.getItem('portfolio-theme');
    if (stored) return stored;

    return 'youtube-1';
  }

  function updateActiveState(activeLetter) {
    document.querySelectorAll('.gabc-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    const activeBtn = document.querySelector(`.gabc-${activeLetter.toLowerCase()}`);
    if (activeBtn) {
      activeBtn.classList.add('active');
      currentActive = activeLetter;
    }
  }

  function init() {
    injectStyles();

    // Wait for body
    const waitForBody = () => {
      if (document.body) {
        createButtons();
      } else {
        setTimeout(waitForBody, 50);
      }
    };
    waitForBody();

    // Listen for theme changes
    window.addEventListener('portfolioThemeChanged', (e) => {
      const themeId = e.detail?.themeId;
      const activeLetter = Object.entries(THEME_CONFIG).find(
        ([, config]) => config.themeId === themeId
      )?.[0];
      if (activeLetter) {
        updateActiveState(activeLetter);
      }
    });

    // Watch for URL changes
    window.addEventListener('popstate', () => {
      const currentTheme = getCurrentThemeId();
      const activeLetter = Object.entries(THEME_CONFIG).find(
        ([, config]) => config.themeId === currentTheme
      )?.[0];
      if (activeLetter) {
        updateActiveState(activeLetter);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
