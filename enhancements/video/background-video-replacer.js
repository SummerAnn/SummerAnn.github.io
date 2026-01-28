/**
 * Background Video Replacer
 * Replaces YouTube iframe with Intro.mp4 video
 */

(function() {
  'use strict';

  function replaceBackgroundVideo() {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) {
      return false;
    }

    const iframe = videoContainer.querySelector('iframe.bg-video');
    if (!iframe) {
      return false;
    }

    // Create video element
    const video = document.createElement('video');
    video.className = 'bg-video';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;';
    
    const source = document.createElement('source');
    source.src = '/static/images/Intro.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);

    // Keep the text overlay
    const textOverlay = videoContainer.querySelector('.text-overlay');
    
    // Replace iframe with video
    iframe.replaceWith(video);
    
    // Handle video load errors
    video.addEventListener('error', function() {
      console.warn('Intro.mp4 failed to load, keeping YouTube fallback');
      // Optionally restore iframe or show error
    });

    video.addEventListener('loadeddata', function() {
      console.log('Intro.mp4 loaded successfully');
    });

    return true;
  }

  function init() {
    // Try immediately
    if (replaceBackgroundVideo()) {
      console.log('Background video replaced with Intro.mp4');
      return;
    }

    // Wait for React to render
    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(function() {
      attempts++;
      if (replaceBackgroundVideo()) {
        console.log('Background video replaced with Intro.mp4');
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        console.warn('Could not find video container after', maxAttempts, 'attempts');
        clearInterval(interval);
      }
    }, 500);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also try after a delay in case React renders late
  setTimeout(init, 1000);
})();
