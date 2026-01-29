/**
 * Dynamic UI Components
 * Makes UI components actually change, not just colors - adds animations, layouts, and interactions
 */

(function() {
  'use strict';

  const UI_MODES = {
    'no-video': {
      name: 'Focus',
      navStyle: 'glassmorphism',
      cardStyle: 'floating',
      animation: 'pulse',
      layout: 'grid'
    },
    'youtube-1': { // G mode
      name: 'Gradient Glow',
      navStyle: 'glassmorphism',
      cardStyle: 'floating',
      animation: 'pulse',
      layout: 'grid'
    },
    'youtube-2': { // A mode
      name: 'Pink Pulse',
      navStyle: 'neon',
      cardStyle: 'glow',
      animation: 'bounce',
      layout: 'masonry'
    },
    'saved-1': { // B mode
      name: 'Cyan Flow',
      navStyle: 'minimal',
      cardStyle: 'flat',
      animation: 'wave',
      layout: 'list'
    },
    'saved-2': { // C mode
      name: 'Green Energy',
      navStyle: 'bold',
      cardStyle: 'elevated',
      animation: 'glow',
      layout: 'carousel'
    },
    'saved-3': {
      name: 'Chinatown',
      navStyle: 'bold',
      cardStyle: 'elevated',
      animation: 'glow',
      layout: 'carousel'
    }
  };

  function getCurrentTheme() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('theme') || localStorage.getItem('portfolio-theme') || 'no-video';
  }

  function applyDynamicComponents(themeId) {
    const mode = UI_MODES[themeId] || UI_MODES['no-video'];
    
    // Create or update style
    let style = document.getElementById('dynamic-ui-components-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'dynamic-ui-components-style';
      document.head.appendChild(style);
    }

    // Different card styles based on mode
    const cardStyles = {
      'floating': `
        .portfolio-item, .foto {
          transform: translateY(0);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .portfolio-item:hover, .foto:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
      `,
      'glow': `
        .portfolio-item, .foto {
          border: 2px solid transparent;
          background: linear-gradient(135deg, rgba(245, 87, 108, 0.1), rgba(240, 147, 251, 0.1));
          transition: all 0.3s ease;
        }
        .portfolio-item:hover, .foto:hover {
          border-color: #f5576c;
          box-shadow: 0 0 30px rgba(245, 87, 108, 0.5);
        }
      `,
      'flat': `
        .portfolio-item, .foto {
          border-radius: 0;
          border-left: 4px solid #00f2fe;
          transition: all 0.3s ease;
        }
        .portfolio-item:hover, .foto:hover {
          border-left-width: 8px;
          background: rgba(0, 242, 254, 0.05);
        }
      `,
      'elevated': `
        .portfolio-item, .foto {
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .portfolio-item:hover, .foto:hover {
          box-shadow: 0 12px 24px rgba(56, 249, 215, 0.3);
          border: 2px solid #38f9d7;
        }
      `
    };

    // Different nav styles
    const navStyles = {
      'glassmorphism': `
        #enhanced-nav, nav {
          backdrop-filter: blur(20px) saturate(180%);
          background: rgba(102, 126, 234, 0.1);
          border-bottom: 1px solid rgba(102, 126, 234, 0.3);
        }
      `,
      'neon': `
        #enhanced-nav, nav {
          background: rgba(245, 87, 108, 0.15);
          border-bottom: 2px solid #f5576c;
          box-shadow: 0 0 20px rgba(245, 87, 108, 0.3);
        }
        #enhanced-nav a, nav a {
          text-shadow: 0 0 10px rgba(245, 87, 108, 0.5);
        }
      `,
      'minimal': `
        #enhanced-nav, nav {
          background: rgba(0, 242, 254, 0.05);
          border-bottom: 1px solid rgba(0, 242, 254, 0.2);
        }
        #enhanced-nav a, nav a {
          border-bottom: 2px solid transparent;
          transition: border-color 0.3s;
        }
        #enhanced-nav a:hover, nav a:hover {
          border-bottom-color: #00f2fe;
        }
      `,
      'bold': `
        #enhanced-nav, nav {
          background: rgba(56, 249, 215, 0.1);
          border-bottom: 3px solid #38f9d7;
        }
        #enhanced-nav a, nav a {
          font-weight: 700;
          letter-spacing: 1px;
        }
      `
    };

    style.textContent = `
      /* Dynamic Card Styles - ${mode.name} */
      ${cardStyles[mode.cardStyle] || cardStyles['floating']}
      
      /* Dynamic Nav Styles - ${mode.name} */
      ${navStyles[mode.navStyle] || navStyles['glassmorphism']}
      
      /* Animation based on mode */
      @keyframes pulse-${themeId} {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.9; transform: scale(1.01); }
      }
      
      @keyframes bounce-${themeId} {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes wave-${themeId} {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(3px); }
      }
      
      @keyframes glow-${themeId} {
        0%, 100% { box-shadow: 0 0 10px rgba(56, 249, 215, 0.3); }
        50% { box-shadow: 0 0 25px rgba(56, 249, 215, 0.6); }
      }
      
      body[data-theme-mode="${themeId}"] .portfolio-item,
      body[data-theme-mode="${themeId}"] .foto {
        animation: ${mode.animation}-${themeId} 3s ease-in-out infinite;
      }
    `;

    // Apply theme mode to body
    document.body.setAttribute('data-theme-mode', themeId);
    
    console.log('🎨 Applied dynamic UI components for:', mode.name);
  }

  function init() {
    const themeId = getCurrentTheme();
    applyDynamicComponents(themeId);

    // Watch for theme changes
    let lastTheme = themeId;
    setInterval(() => {
      const currentTheme = getCurrentTheme();
      if (currentTheme !== lastTheme) {
        lastTheme = currentTheme;
        applyDynamicComponents(currentTheme);
      }
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
