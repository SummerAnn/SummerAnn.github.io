/**
 * Avatar/Profile Image Fix v2.0
 * Ensures the profile image loads correctly at /images/myProfile.jpg
 */

(function() {
  'use strict';

  const CORRECT_PATH = '/images/myProfile.jpg';
  const FALLBACK_PATHS = [
    '/images/myProfile.jpg',
    '/images/portfolio/actingprofile.jpeg',
    '/images/portfolio/summer.JPG'
  ];

  function isAvatarImage(img) {
    const src = (img.src || img.getAttribute('src') || '').toLowerCase();
    const alt = (img.alt || '').toLowerCase();
    const classes = (img.className || '').toLowerCase();

    return src.includes('myprofile') ||
           src.includes('avatar') ||
           alt.includes('avatar') ||
           alt.includes('profile') ||
           classes.includes('avatar') ||
           classes.includes('profile');
  }

  function fixAvatarImage(img) {
    if (!img) return;

    const currentSrc = img.getAttribute('src') || '';

    // Skip if already correct
    if (currentSrc === CORRECT_PATH) return;

    // Check if this looks like an avatar image
    if (isAvatarImage(img) || currentSrc.toLowerCase().includes('myprofile')) {
      console.log('Fixing avatar image:', currentSrc, '->', CORRECT_PATH);
      img.setAttribute('src', CORRECT_PATH);
      img.setAttribute('data-avatar-fixed', 'true');

      // Ensure visibility
      img.style.display = 'block';
      img.style.visibility = 'visible';
      img.style.opacity = '1';

      // Add error handler with fallbacks
      img.onerror = function() {
        const currentFallbackSrc = this.getAttribute('src');
        const fallbackIndex = FALLBACK_PATHS.indexOf(currentFallbackSrc);

        if (fallbackIndex < FALLBACK_PATHS.length - 1) {
          const nextFallback = FALLBACK_PATHS[fallbackIndex + 1];
          console.log('Avatar fallback:', nextFallback);
          this.setAttribute('src', nextFallback);
        }
      };
    }
  }

  function findAndFixAvatars() {
    // Find by selectors
    const selectors = [
      'img[alt*="Avatar" i]',
      'img[alt*="Profile" i]',
      'img[src*="myProfile" i]',
      'img[src*="avatar" i]',
      '.polaroid img',
      '[class*="avatar" i] img',
      '[class*="profile" i] img'
    ];

    const avatars = new Set();
    selectors.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(img => avatars.add(img));
      } catch (e) {}
    });

    avatars.forEach(fixAvatarImage);

    // Also look for placeholder text
    const placeholders = document.querySelectorAll('*');
    placeholders.forEach(el => {
      if (el.childNodes.length === 1 &&
          el.textContent &&
          el.textContent.toLowerCase().includes('avatar placeholder')) {
        // Replace with actual image
        const img = document.createElement('img');
        img.src = CORRECT_PATH;
        img.alt = 'Summer Ann Profile';
        img.style.cssText = 'width: 100%; height: auto; border-radius: 8px; display: block;';
        img.setAttribute('data-avatar-fixed', 'true');
        el.innerHTML = '';
        el.appendChild(img);
        console.log('Replaced avatar placeholder with image');
      }
    });

    console.log(`Fixed ${avatars.size} avatar images`);
  }

  function init() {
    findAndFixAvatars();

    // Re-run after delays for React content
    setTimeout(findAndFixAvatars, 500);
    setTimeout(findAndFixAvatars, 1500);
    setTimeout(findAndFixAvatars, 3000);

    // Watch for new images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.tagName === 'IMG') {
              fixAvatarImage(node);
            } else if (node.querySelectorAll) {
              node.querySelectorAll('img').forEach(fixAvatarImage);
            }
          }
        });
      });
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
})();
