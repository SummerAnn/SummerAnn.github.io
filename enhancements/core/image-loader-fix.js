/**
 * Image Loader Fix
 * Ensures all portfolio images load correctly and handles 404s gracefully
 * This fixes the issue where p3.jpg and p4.jpg are requested from root instead of /images/portfolio/App/
 */

(function() {
  'use strict';

  // Map of known broken image names to their correct paths
  const imagePathMap = {
    'p3.jpg': '/images/portfolio/App/p3.jpg',
    'p4.jpg': '/images/portfolio/App/p4.jpg',
    'p0.jpg': '/images/portfolio/App/p0.jpg',
    'p1.jpg': '/images/portfolio/App/p1.jpg',
    'p2.jpg': '/images/portfolio/App/p2.jpg',
    'p5.jpg': '/images/portfolio/App/p5.jpg',
    'p6.jpg': '/images/portfolio/App/p6.jpg',
    'p7.jpg': '/images/portfolio/App/p7.jpg',
    'p8.jpg': '/images/portfolio/App/p8.jpg',
    'p9.jpg': '/images/portfolio/App/p9.jpg',
    'p10.jpg': '/images/portfolio/App/p10.jpg',
    'p11.jpg': '/images/portfolio/App/p11.jpg',
    'p12.jpg': '/images/portfolio/App/p12.jpg'
  };

  function fixImageSrc(img) {
    // DON'T change images that are already locked or correct
    if (img.hasAttribute('data-locked') || img.hasAttribute('data-locked-project')) {
      return false; // Don't touch locked images
    }

    const src = img.getAttribute('src');
    if (!src) return false;

    // Don't change images that are already correct absolute paths
    if (src.startsWith('/images/portfolio/') && src.match(/\.(png|jpg|jpeg|JPG|JPEG)$/)) {
      return false; // Already correct, don't change
    }

    let fixedSrc = src;

    // If it's just a filename like "p3.jpg", fix it
    if (imagePathMap[src]) {
      fixedSrc = imagePathMap[src];
    }
    // If it's a relative path starting with images/ but missing leading /
    else if (src.startsWith('images/') && !src.startsWith('/images/')) {
      fixedSrc = '/' + src;
    }
    // Fix double /images/ paths - be very aggressive
    else if (src.includes('/images//images/') || src.includes('images//images/') || src.match(/images\/\/images/)) {
      fixedSrc = src.replace(/\/?images\/\/images\//g, '/images/').replace(/images\/\/images/g, 'images');
      // Also fix if it starts with /images//images
      if (fixedSrc.startsWith('/images//images')) {
        fixedSrc = fixedSrc.replace('/images//images', '/images');
      }
    }
    // Fix myProfile specifically
    else if (src.includes('myProfile') && (src.includes('//images') || src.includes('images//'))) {
      fixedSrc = '/images/myProfile.jpg';
    }
    // If it's just a filename and we can infer it's from App folder
    else if (src.match(/^p\d+\.jpg$/)) {
      fixedSrc = '/images/portfolio/App/' + src;
    }

    if (fixedSrc !== src) {
      console.log('Fixing image path:', src, '->', fixedSrc);
      img.setAttribute('src', fixedSrc);
      return true;
    }

    return false;
  }

  function fixImagePaths() {
    // Find all images
    const images = document.querySelectorAll('img');
    let fixedCount = 0;
    
    images.forEach(function(img) {
      if (fixImageSrc(img)) {
        fixedCount++;
      }

      // Add error handler to catch and fix broken images
      img.addEventListener('error', function() {
        const currentSrc = this.getAttribute('src');
        console.warn('Image failed to load:', currentSrc);
        
        // Try to fix it
        if (fixImageSrc(this)) {
          console.log('Attempted to fix broken image:', currentSrc);
        }
      }, { once: true });

      // Log successful loads in dev mode
      img.addEventListener('load', function() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          // Only log if it was a problematic image
          const src = this.getAttribute('src');
          if (src && (src.includes('p3.jpg') || src.includes('p4.jpg'))) {
            console.log('✓ Image loaded successfully:', src);
          }
        }
      }, { once: true });
    });

    if (fixedCount > 0) {
      console.log('Fixed', fixedCount, 'image path(s)');
    }
  }

  // Intercept fetch requests for images to fix them before they're requested
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const url = args[0];
    if (typeof url === 'string' && (url.includes('p3.jpg') || url.includes('p4.jpg'))) {
      // If it's a root-level request, fix it
      if (url.match(/^\/?p[34]\.jpg/)) {
        const fixedUrl = url.replace(/^\/?p([34])\.jpg/, '/images/portfolio/App/p$1.jpg');
        console.log('Intercepting fetch request:', url, '->', fixedUrl);
        args[0] = fixedUrl;
      }
    }
    return originalFetch.apply(this, args);
  };

  function init() {
    // Fix images immediately
    fixImagePaths();

    // Watch for dynamically added images (React might add them later)
    const observer = new MutationObserver(function(mutations) {
      let shouldFix = false;
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            if (node.tagName === 'IMG' || node.querySelector('img')) {
              shouldFix = true;
            }
          }
        });
      });
      if (shouldFix) {
        setTimeout(fixImagePaths, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Also fix after React renders (multiple attempts)
    setTimeout(fixImagePaths, 500);
    setTimeout(fixImagePaths, 1000);
    setTimeout(fixImagePaths, 2000);
    setTimeout(fixImagePaths, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also run immediately
  setTimeout(init, 0);
})();
