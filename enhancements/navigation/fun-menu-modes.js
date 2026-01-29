/**
 * Fun Menu Modes
 * Makes the menu UI fun and different for 4 different modes (G, A, B, C themes)
 */

(function() {
  'use strict';

  const MENU_MODES = {
    'no-video': {
      name: 'Focus',
      navBg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
      linkColor: '#818cf8',
      linkHover: '#a5b4fc',
      borderGlow: '0 0 20px rgba(99, 102, 241, 0.4)',
      animation: 'pulse'
    },
    'youtube-1': { // G mode
      name: 'Gradient Glow',
      navBg: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
      linkColor: '#667eea',
      linkHover: '#764ba2',
      borderGlow: '0 0 20px rgba(102, 126, 234, 0.5)',
      animation: 'pulse'
    },
    'youtube-2': { // A mode
      name: 'Pink Pulse',
      navBg: 'linear-gradient(135deg, rgba(240, 147, 251, 0.15) 0%, rgba(245, 87, 108, 0.15) 100%)',
      linkColor: '#f5576c',
      linkHover: '#f093fb',
      borderGlow: '0 0 20px rgba(245, 87, 108, 0.5)',
      animation: 'bounce'
    },
    'saved-1': { // B mode
      name: 'Cyan Flow',
      navBg: 'linear-gradient(135deg, rgba(79, 172, 254, 0.15) 0%, rgba(0, 242, 254, 0.15) 100%)',
      linkColor: '#00f2fe',
      linkHover: '#4facfe',
      borderGlow: '0 0 20px rgba(0, 242, 254, 0.5)',
      animation: 'wave'
    },
    'saved-2': { // C mode
      name: 'Green Energy',
      navBg: 'linear-gradient(135deg, rgba(67, 233, 123, 0.15) 0%, rgba(56, 249, 215, 0.15) 100%)',
      linkColor: '#38f9d7',
      linkHover: '#43e97b',
      borderGlow: '0 0 20px rgba(56, 249, 215, 0.5)',
      animation: 'glow'
    },
    'saved-3': {
      name: 'Chinatown',
      navBg: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 201, 75, 0.15) 100%)',
      linkColor: '#ff6b35',
      linkHover: '#f7c94b',
      borderGlow: '0 0 20px rgba(255, 107, 53, 0.5)',
      animation: 'glow'
    }
  };

  function getCurrentTheme() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('theme') || localStorage.getItem('portfolio-theme') || 'no-video';
  }

  function applyMenuMode(themeId) {
    const mode = MENU_MODES[themeId] || MENU_MODES['no-video'];
    const nav = document.getElementById('enhanced-nav') || document.querySelector('nav');
    
    if (!nav) return;

    // Remove previous mode classes (themeId prefix: no-video->no, youtube-1/2->youtube, saved-1/2/3->saved)
    nav.classList.remove('mode-no', 'mode-youtube', 'mode-saved');
    nav.classList.add(`mode-${themeId.split('-')[0]}`);

    // Create or update style
    let style = document.getElementById('fun-menu-modes-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'fun-menu-modes-style';
      document.head.appendChild(style);
    }

    style.textContent = `
      #enhanced-nav.mode-${themeId.split('-')[0]},
      nav.mode-${themeId.split('-')[0]} {
        background: ${mode.navBg} !important;
        backdrop-filter: blur(20px) saturate(180%);
        border-bottom: 2px solid ${mode.linkColor};
        box-shadow: ${mode.borderGlow};
      }
      
      #enhanced-nav.mode-${themeId.split('-')[0]} a,
      nav.mode-${themeId.split('-')[0]} a {
        color: ${mode.linkColor} !important;
        transition: all 0.3s ease;
      }
      
      #enhanced-nav.mode-${themeId.split('-')[0]} a:hover,
      nav.mode-${themeId.split('-')[0]} a:hover {
        color: ${mode.linkHover} !important;
        text-shadow: 0 0 10px ${mode.linkColor};
        transform: translateY(-2px);
      }
      
      #enhanced-nav.mode-${themeId.split('-')[0]} .nav-logo,
      nav.mode-${themeId.split('-')[0]} .nav-logo {
        background: linear-gradient(135deg, ${mode.linkColor} 0%, ${mode.linkHover} 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 8px ${mode.linkColor});
      }
      
      /* Animation based on mode */
      @keyframes pulse-${themeId} {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      
      @keyframes bounce-${themeId} {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      
      @keyframes wave-${themeId} {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes glow-${themeId} {
        0%, 100% { box-shadow: ${mode.borderGlow}; }
        50% { box-shadow: 0 0 30px ${mode.linkColor}; }
      }
      
      #enhanced-nav.mode-${themeId.split('-')[0]} {
        animation: ${mode.animation}-${themeId} 3s ease-in-out infinite;
      }
    `;

    console.log('🎨 Applied menu mode:', mode.name);
  }

  function init() {
    const themeId = getCurrentTheme();
    applyMenuMode(themeId);

    // Watch for theme changes
    let lastTheme = themeId;
    setInterval(() => {
      const currentTheme = getCurrentTheme();
      if (currentTheme !== lastTheme) {
        lastTheme = currentTheme;
        applyMenuMode(currentTheme);
      }
    }, 500);

    // Also apply after nav is created
    setTimeout(() => applyMenuMode(getCurrentTheme()), 1000);
    setTimeout(() => applyMenuMode(getCurrentTheme()), 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Listen for theme changes
  window.addEventListener('popstate', () => {
    applyMenuMode(getCurrentTheme());
  });
})();
