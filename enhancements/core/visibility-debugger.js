/**
 * Visibility Debugger
 * Checks what's blocking carousel, demos, and other elements from showing
 */

(function() {
  'use strict';

  function checkVisibilityIssues() {
    console.log('🔍 === VISIBILITY DEBUG REPORT ===');
    
    // Check carousel
    const carousel = document.querySelector('.model-carousel, #modeling-profile-carousel');
    if (carousel) {
      console.log('✅ Carousel element exists in DOM');
      const styles = window.getComputedStyle(carousel);
      console.log('Carousel computed styles:', {
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity,
        position: styles.position,
        zIndex: styles.zIndex,
        width: styles.width,
        height: styles.height,
        overflow: styles.overflow
      });
      
      // Check parent chain
      let parent = carousel.parentElement;
      let depth = 0;
      while (parent && depth < 10) {
        const parentStyles = window.getComputedStyle(parent);
        if (parentStyles.opacity === '0' || parentStyles.display === 'none' || parentStyles.visibility === 'hidden') {
          console.warn('⚠️ Parent element blocking visibility:', {
            element: parent,
            tagName: parent.tagName,
            className: parent.className,
            opacity: parentStyles.opacity,
            display: parentStyles.display,
            visibility: parentStyles.visibility
          });
        }
        parent = parent.parentElement;
        depth++;
      }
      
      // Check if carousel is actually visible
      const rect = carousel.getBoundingClientRect();
      console.log('Carousel bounding rect:', {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        visible: rect.width > 0 && rect.height > 0
      });
    } else {
      console.warn('❌ Carousel element NOT found in DOM');
    }
    
    // Check demo links
    const demoLinks = document.querySelectorAll('a[href*="/demos/"], a[href*="demo"]');
    console.log('Demo links found:', demoLinks.length);
    demoLinks.forEach((link, idx) => {
      const href = link.getAttribute('href');
      const styles = window.getComputedStyle(link);
      console.log(`Demo link ${idx + 1}:`, {
        href: href,
        display: styles.display,
        visibility: styles.visibility,
        pointerEvents: styles.pointerEvents,
        zIndex: styles.zIndex,
        inViewport: link.getBoundingClientRect().width > 0
      });
    });
    
    // Check video container
    const videoContainer = document.querySelector('.video-container, [class*="video"]');
    if (videoContainer) {
      const styles = window.getComputedStyle(videoContainer);
      console.log('Video container:', {
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity,
        zIndex: styles.zIndex
      });
      
      const videos = videoContainer.querySelectorAll('video, iframe');
      console.log('Videos in container:', videos.length);
      videos.forEach((video, idx) => {
        const vidStyles = window.getComputedStyle(video);
        console.log(`Video ${idx + 1}:`, {
          tagName: video.tagName,
          src: video.src || video.getAttribute('src'),
          display: vidStyles.display,
          visibility: vidStyles.visibility,
          opacity: vidStyles.opacity
        });
      });
    }
    
    // Check for React overlays or blocking elements
    const highZIndex = Array.from(document.querySelectorAll('*')).filter(el => {
      const z = window.getComputedStyle(el).zIndex;
      return z && parseInt(z) > 1000;
    });
    console.log('High z-index elements (potential blockers):', highZIndex.length);
    highZIndex.slice(0, 5).forEach(el => {
      console.log('High z-index element:', {
        tag: el.tagName,
        class: el.className,
        zIndex: window.getComputedStyle(el).zIndex,
        position: window.getComputedStyle(el).position
      });
    });
    
    // Check for CSS that might be hiding things
    const hiddenElements = Array.from(document.querySelectorAll('.model-carousel, #modeling-profile-carousel, a[href*="demo"]')).filter(el => {
      const styles = window.getComputedStyle(el);
      return styles.display === 'none' || styles.visibility === 'hidden' || styles.opacity === '0';
    });
    console.log('Hidden elements found:', hiddenElements.length);
    
    console.log('🔍 === END DEBUG REPORT ===');
  }

  function init() {
    // Run after page loads
    setTimeout(checkVisibilityIssues, 2000);
    setTimeout(checkVisibilityIssues, 5000);
    
    // Also run when carousel is created
    const observer = new MutationObserver(function() {
      const carousel = document.querySelector('.model-carousel, #modeling-profile-carousel');
      if (carousel) {
        setTimeout(checkVisibilityIssues, 500);
      }
    });
    
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose globally for manual checking
  window.debugVisibility = checkVisibilityIssues;
})();
