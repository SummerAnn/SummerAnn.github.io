/**
 * UI Theme Manager v2.0
 * 6 themes: default = no-video (content focus), then G/A/B/C/D with videos
 * no-video = default, no background video
 * G = graphite (섬머님.mp4) | A = atelier (YouTube) | B = studio | C = arcade | D = Chinatown
 */

(function() {
  'use strict';

  const THEMES = {
    'no-video': {
      name: 'Focus',
      cssTheme: 'graphite',
      videoType: 'none'
    },
    'youtube-1': {
      name: 'Graphite',
      cssTheme: 'graphite',
      videoType: 'local',
      videoUrl: '/static/섬머님.mp4'
    },
    'youtube-2': {
      name: 'Atelier',
      cssTheme: 'atelier',
      videoType: 'youtube',
      videoUrl: 'https://www.youtube.com/embed/SlssfnVdLlA?autoplay=1&mute=1&loop=1&playlist=SlssfnVdLlA&controls=0&showinfo=0&autohide=1&modestbranding=1&vq=hd720&rel=0&iv_load_policy=3&playsinline=1'
    },
    'saved-1': {
      name: 'Studio',
      cssTheme: 'studio',
      videoType: 'local',
      videoUrl: '/static/images/Intro.mp4'
    },
    'saved-2': {
      name: 'Arcade',
      cssTheme: 'arcade',
      videoType: 'local',
      videoUrl: '/static/Summer%20Arcade%20H.MP4'
    },
    'saved-3': {
      name: 'Chinatown',
      cssTheme: 'arcade',
      videoType: 'local',
      videoUrl: '/static/summer%20chinatown%20h.MP4'
    }
  };

  let currentThemeId = null;
  let videoContainer = null;

  function getCurrentTheme() {
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    if (themeParam && THEMES[themeParam]) {
      return themeParam;
    }
    const stored = localStorage.getItem('portfolio-theme');
    if (stored && THEMES[stored]) {
      return stored;
    }
    return 'no-video';
  }

  function findOrCreateVideoContainer() {
    // First try to find existing video elements
    const existingIframe = document.querySelector('iframe[src*="youtube"]');
    const existingVideo = document.querySelector('video.bg-video, video[src*="Intro"], #intro-video-bg');

    if (existingIframe && existingIframe.parentElement) {
      return existingIframe.parentElement;
    }
    if (existingVideo && existingVideo.parentElement) {
      return existingVideo.parentElement;
    }

    // Try common selectors
    const selectors = [
      '.video-container',
      '.video-wrapper',
      '[class*="video-container"]',
      '[class*="VideoContainer"]',
      '.hero-video',
      '#video-background'
    ];

    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el) return el;
    }

    // Create one if none exists
    const container = document.createElement('div');
    container.className = 'video-container';
    container.id = 'theme-video-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      overflow: hidden;
      pointer-events: none;
    `;

    // Insert at the beginning of body
    if (document.body.firstChild) {
      document.body.insertBefore(container, document.body.firstChild);
    } else {
      document.body.appendChild(container);
    }

    console.log('Created new video container');
    return container;
  }

  function removeAllVideos() {
    // Remove ALL video elements and iframes from the page
    const toRemove = document.querySelectorAll(`
      iframe[src*="youtube"],
      iframe[src*="youtu.be"],
      video.bg-video,
      video#intro-video-bg,
      video[src*="Intro"],
      .video-container iframe,
      .video-container video,
      #theme-video-container iframe,
      #theme-video-container video
    `);

    toRemove.forEach(el => {
      console.log('Removing video element:', el.tagName, el.src || el.querySelector('source')?.src);
      el.remove();
    });
  }

  function applyCSSTheme(cssThemeName) {
    // Set the data-theme attribute on body
    document.body.setAttribute('data-theme', cssThemeName);
    console.log('Applied CSS theme:', cssThemeName);

    // Also dispatch a custom event for other scripts
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: cssThemeName }
    }));
  }

  function createYouTubeVideo(url, container) {
    const iframe = document.createElement('iframe');
    iframe.className = 'bg-video theme-video';
    iframe.id = 'youtube-bg-video';
    iframe.src = url;
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.setAttribute('playsinline', '');
    iframe.title = 'Background Video';
    iframe.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100vw;
      height: 100vh;
      min-width: 100%;
      min-height: 100%;
      transform: translate(-50%, -50%) scale(1.2);
      border: none;
      z-index: -1;
      pointer-events: none;
    `;

    container.appendChild(iframe);
    console.log('Created YouTube iframe');
    return iframe;
  }

  function createLocalVideo(url, container) {
    const video = document.createElement('video');
    video.className = 'bg-video theme-video';
    video.id = 'intro-video-bg';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    // Optimize loading: use 'metadata' for large files to start faster
    video.preload = 'metadata';
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    // Optimize for performance
    video.style.willChange = 'transform';
    video.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100vw;
      height: 100vh;
      min-width: 100%;
      min-height: 100%;
      transform: translate(-50%, -50%);
      object-fit: cover;
      z-index: -1;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.6s ease-in-out;
    `;

    const source = document.createElement('source');
    source.src = url;
    // Set MIME type based on file extension
    const ext = url.split('.').pop()?.toLowerCase();
    if (ext === 'mov') {
      source.type = 'video/quicktime';
    } else if (ext === 'webm') {
      source.type = 'video/webm';
    } else {
      source.type = 'video/mp4';
    }
    video.appendChild(source);

    // Error handling with fallback paths (fall back to Intro if theme video fails)
    const altPaths = [
      '/static/images/Intro.mp4',
      '/images/Intro.mp4',
      './static/images/Intro.mp4'
    ];
    let pathIndex = 0;

    // Optimize video loading - show video as soon as enough data is loaded
    video.addEventListener('loadedmetadata', function() {
      // Video metadata loaded, start playing when ready
      if (video.readyState >= 1) {
        video.play().catch(() => {});
      }
    }, { once: true });
    
    video.addEventListener('canplay', function() {
      // Enough data loaded to start playing
      video.style.opacity = '1';
      video.play().catch(() => {});
    }, { once: true });
    
    video.addEventListener('canplaythrough', function() {
      // Entire video can play without buffering
      video.style.opacity = '1';
      video.play().catch(() => {});
    }, { once: true });
    
    video.addEventListener('loadeddata', function() {
      if (video.readyState >= 2) {
        video.style.opacity = '1';
      }
    }, { once: true });
    
    // Start loading immediately
    video.load();
    
    video.addEventListener('error', function(e) {
      const errorMsg = video.error ? `Code ${video.error.code}: ${video.error.message}` : 'Unknown error';
      console.warn('Video load failed:', source.src, errorMsg);
      
      // If .mov file fails, it's likely a browser compatibility issue
      if (ext === 'mov') {
        console.warn('⚠️ .mov files have limited browser support. Consider converting to MP4 for better compatibility.');
      }
      
      if (pathIndex < altPaths.length) {
        source.src = altPaths[pathIndex];
        source.type = 'video/mp4'; // Fallback videos are MP4
        pathIndex++;
        video.load();
      } else {
        console.error('All video fallbacks failed. Video may not play in this browser.');
      }
    });

    video.addEventListener('loadeddata', () => {
      console.log('Local video loaded successfully');
      video.play().catch(() => {});
    });

    container.appendChild(video);

    // Force play
    setTimeout(() => video.play().catch(() => {}), 100);

    console.log('Created local video element');
    return video;
  }

  function applyTheme(themeId) {
    const theme = THEMES[themeId];
    if (!theme) {
      console.warn('Invalid theme:', themeId);
      return false;
    }

    console.log('=== Applying theme:', theme.name, '(', themeId, ') ===');

    // 1. Apply CSS theme FIRST
    applyCSSTheme(theme.cssTheme);

    // 2. Remove all existing videos
    removeAllVideos();

    // 3. Find or create video container
    videoContainer = findOrCreateVideoContainer();

    // 4. Create the appropriate video element (skip if no video)
    if (theme.videoType === 'youtube') {
      videoContainer.style.display = '';
      videoContainer.style.visibility = '';
      createYouTubeVideo(theme.videoUrl, videoContainer);
    } else if (theme.videoType === 'local') {
      videoContainer.style.display = '';
      videoContainer.style.visibility = '';
      createLocalVideo(theme.videoUrl, videoContainer);
    } else {
      videoContainer.style.display = 'none';
      videoContainer.style.visibility = 'hidden';
    }

    // 5. Save state
    currentThemeId = themeId;
    localStorage.setItem('portfolio-theme', themeId);

    console.log('Theme applied successfully:', theme.name);
    return true;
  }

  // Global theme switch function
  window.switchPortfolioTheme = function(themeId) {
    console.log('switchPortfolioTheme called:', themeId);

    if (!THEMES[themeId]) {
      console.error('Invalid theme ID:', themeId, 'Available:', Object.keys(THEMES));
      return false;
    }

    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('theme', themeId);
    window.history.pushState({ theme: themeId }, '', url);

    // Apply the theme
    const success = applyTheme(themeId);

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('portfolioThemeChanged', {
      detail: { themeId, theme: THEMES[themeId] }
    }));

    return success;
  };

  // Get theme info
  window.getPortfolioThemeInfo = function() {
    return {
      current: currentThemeId,
      themes: THEMES
    };
  };

  function init() {
    console.log('UI Theme Manager v2.0 initializing...');

    // Apply theme on load
    const themeId = getCurrentTheme();

    // Wait for DOM to be ready
    const tryApply = () => {
      if (document.body) {
        applyTheme(themeId);
      } else {
        setTimeout(tryApply, 50);
      }
    };

    tryApply();

    // Listen for navigation changes
    window.addEventListener('popstate', (e) => {
      const newTheme = getCurrentTheme();
      if (newTheme !== currentThemeId) {
        applyTheme(newTheme);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also try after delays for React
  setTimeout(init, 500);
  setTimeout(init, 1500);
})();
