/**
 * Image Lock
 * Prevents images from randomly changing - locks specific images to their projects
 */

(function() {
  'use strict';

  // Lock specific images to their projects - NEVER change these
  const IMAGE_LOCKS = {
    // Yammoing/NutriScan - LOCKED, never change
    'NutriScan / Yammoing': [
      '/images/portfolio/App/yammoing.png',
      '/images/portfolio/App/yammoing2.png',
      '/images/portfolio/App/yammoing3.png'
    ],
    // CreatorFlow - LOCKED
    'CreatorFlow AI': [
      '/images/portfolio/App/creatorRAG.jpeg'
    ],
    // BreatheWithMe - LOCKED
    'BreatheWithMe': [
      '/images/portfolio/breathewithme.png'
    ],
    // Modeling & Fashion - LOCKED
    'Modeling & Fashion': [
      '/images/portfolio/actingprofile.jpeg',
      '/images/portfolio/summer.JPG'
    ],
    // My Little Chef - LOCKED
    'My Little Chef': [
      '/images/portfolio/App/mylittlekitchen2.png',
      '/images/portfolio/App/mylittlekitchen4.png',
      '/images/portfolio/App/mylittlekitchen5.png'
    ],
    // Photobooth - LOCKED
    'Photobooth': [
      '/images/portfolio/photobooth/1.png',
      '/images/portfolio/photobooth/2.png',
      '/images/portfolio/photobooth/3.png',
      '/images/portfolio/photobooth/4.png'
    ],
    // With You - LOCKED
    'With You': [
      '/images/portfolio/web_design/collegeconnect1.png',
      '/images/portfolio/web_design/collegeconnect2.png',
      '/images/portfolio/web_design/collegeconnect3.png',
      '/images/portfolio/web_design/collegeconnect4.png',
      '/images/portfolio/web_design/collegeconnect5.png',
      '/images/portfolio/web_design/collegeconnect6.png'
    ],
    // HypoGen / HypoBench - LOCKED (graph image)
    'HypoGen': [
      '/images/hypogenic.png'
    ],
    'HypoBench': [
      '/images/hypogenic.png'
    ]
  };

  function lockProjectImages() {
    // Find all project cards
    const projectCards = document.querySelectorAll('.portfolio-item, .foto, [class*="portfolio"], [class*="project"]');
    
    projectCards.forEach(function(card) {
      const title = (card.textContent || '').trim();
      const img = card.querySelector('img');
      
      if (!img) return;

      // Check if this project has locked images
      for (const [projectName, lockedImages] of Object.entries(IMAGE_LOCKS)) {
        if (title.includes(projectName) || title.toLowerCase().includes(projectName.toLowerCase())) {
          const currentSrc = img.getAttribute('src');
          
          // If image doesn't match locked images, fix it
          if (!lockedImages.some(locked => currentSrc.includes(locked.split('/').pop()))) {
            // Set to first locked image
            img.setAttribute('src', lockedImages[0]);
            img.setAttribute('data-locked', 'true');
            console.log(`🔒 Locked image for "${projectName}" to:`, lockedImages[0]);
          } else {
            // Ensure it's using the correct locked path
            const matchingLock = lockedImages.find(locked => currentSrc.includes(locked.split('/').pop()));
            if (matchingLock && currentSrc !== matchingLock) {
              img.setAttribute('src', matchingLock);
              img.setAttribute('data-locked', 'true');
            }
          }
          
          // Prevent other scripts from changing this image
          img.setAttribute('data-locked-project', projectName);
          break;
        }
      }
    });
  }

  // Prevent image changes on locked images
  function preventImageChanges() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
          const img = mutation.target;
          if (img.hasAttribute('data-locked')) {
            const projectName = img.getAttribute('data-locked-project');
            const lockedImages = IMAGE_LOCKS[projectName];
            if (lockedImages && !lockedImages.some(locked => img.src.includes(locked.split('/').pop()))) {
              // Revert to locked image
              img.setAttribute('src', lockedImages[0]);
              console.log(`🔒 Prevented image change for locked project: ${projectName}`);
            }
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['src'],
      subtree: true
    });
  }

  function init() {
    lockProjectImages();
    preventImageChanges();
    
    // Re-lock after React renders
    setTimeout(lockProjectImages, 1000);
    setTimeout(lockProjectImages, 2000);
    setTimeout(lockProjectImages, 3000);

    // Watch for new project cards
    const cardObserver = new MutationObserver(function(mutations) {
      let shouldLock = false;
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && (node.classList.contains('portfolio-item') || node.classList.contains('foto'))) {
            shouldLock = true;
          }
        });
      });
      if (shouldLock) {
        setTimeout(lockProjectImages, 100);
      }
    });

    cardObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
