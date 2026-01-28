/**
 * Carousel Debug & Force Display
 * Ensures the modeling carousel actually shows up
 */

(function() {
  'use strict';

  function forceCarouselDisplay() {
    // Strategy: Find by image FIRST (most reliable), then find its parent card
    let modelingCard = null;
    let modelingImage = null;
    
    // First, check if carousel already exists - if so, just ensure visibility and STOP
    const existingCarousel = document.querySelector('.model-carousel, #modeling-profile-carousel');
    if (existingCarousel) {
      // Carousel exists - force visibility even if parent is hidden
      existingCarousel.style.display = 'block !important';
      existingCarousel.style.visibility = 'visible !important';
      existingCarousel.style.opacity = '1 !important';
      existingCarousel.style.position = 'relative';
      existingCarousel.style.zIndex = '10';
      
      // Also make sure parent card is visible
      const parentCard = existingCarousel.closest('.foto, [class*="portfolio"], [class*="project"], [class*="card"]');
      if (parentCard) {
        parentCard.style.opacity = '1';
        parentCard.style.visibility = 'visible';
        parentCard.style.display = 'block';
      }
      
      return; // Don't try to create again
    }
    
    // First, find the actual images - check both src and getAttribute
    // BUT skip images that are inside carousel slides (already created)
    const allImages = document.querySelectorAll('img');
    for (const img of allImages) {
      // Skip if inside a carousel
      if (img.closest('.model-carousel, .carousel-slide, #modeling-profile-carousel')) {
        continue;
      }
      
      const src = img.src || img.getAttribute('src') || '';
      const alt = (img.alt || '').toLowerCase();
      
      // Check multiple patterns
      if (src.includes('summer.JPG') || src.includes('summer.jpg') ||
          src.includes('actingprofile') || src.includes('actingprofile.jpeg') ||
          src.includes('actingprofile.jpg') ||
          alt.includes('modeling') || alt.includes('fashion')) {
        modelingImage = img;
        console.log('🎠 Found modeling image:', src.substring(0, 50));
        break;
      }
    }
    
    if (modelingImage) {
      // Find the parent card - go up the DOM tree
      let parent = modelingImage.parentElement;
      let depth = 0;
      while (parent && depth < 10) {
        // Check if this looks like a project card
        const hasCardClass = parent.classList && (
          Array.from(parent.classList).some(c => 
            c.includes('portfolio') || c.includes('project') || c.includes('card') || c.includes('item')
          )
        );
        
        const hasReasonableSize = parent.offsetHeight > 100 && parent.offsetHeight < window.innerHeight * 0.6;
        const hasMultipleChildren = parent.children.length > 1;
        
        if (hasCardClass && hasReasonableSize && hasMultipleChildren) {
          modelingCard = parent;
          console.log('🎠 Found Modeling card by image parent:', parent);
          break;
        }
        
        parent = parent.parentElement;
        depth++;
      }
      
      // If no card found, use the image's immediate parent
      if (!modelingCard && modelingImage.parentElement) {
        modelingCard = modelingImage.parentElement;
        console.log('🎠 Using image parent as card:', modelingCard);
      }
    }
    
    // Fallback: search portfolio cards
    if (!modelingCard) {
      const portfolioCards = document.querySelectorAll('.portfolio-item, .foto, [class*="portfolio"], [class*="project"], [id="portfolio"] [class*="col-"], [class*="card"]');
      
      for (const card of portfolioCards) {
        // Skip if it's too large (likely the whole page)
        if (card === document.documentElement || card === document.body || 
            card.tagName === 'HTML' || card.tagName === 'BODY' ||
            card.offsetHeight > window.innerHeight * 0.8) {
          continue;
        }
        
        // Must have reasonable size (actual card, not whole page)
        if (card.offsetHeight < 100 || card.offsetWidth < 200) {
          continue;
        }
        
        const img = card.querySelector('img');
        const hasModelingImage = img && (img.src.includes('summer.JPG') || 
                                        img.src.includes('actingprofile'));
        
        if (hasModelingImage) {
          modelingCard = card;
          console.log('🎠 Found Modeling card by image in card:', card);
          break;
        }
      }
    }
    
    if (modelingCard) {
      const img = modelingCard.querySelector('img') || modelingImage;
      const existingCarousel = modelingCard.querySelector('.model-carousel, #modeling-profile-carousel');
      
      if (existingCarousel) {
        // Carousel already exists, just ensure it's visible
        existingCarousel.style.display = 'block';
        existingCarousel.style.visibility = 'visible';
        existingCarousel.style.opacity = '1';
        console.log('✅ Carousel already exists, made visible');
        return;
      }
      
      if (img && !img.closest('.model-carousel')) {
        console.log('🎠 Found Modeling card, triggering carousel creation...', modelingCard);
        // Call the actual carousel creation function if it exists
        if (window.createModelProfileCarousel) {
          console.log('🎠 Calling createModelProfileCarousel directly');
          window.createModelProfileCarousel();
        } else {
          // Trigger custom event for model-profile-carousel.js to listen
          const event = new CustomEvent('createModelCarousel', { detail: { card: modelingCard } });
          window.dispatchEvent(event);
          console.log('🎠 Dispatched createModelCarousel event');
          
          // Also try direct call after a delay
          setTimeout(() => {
            if (window.createModelProfileCarousel) {
              window.createModelProfileCarousel();
            }
          }, 500);
        }
      }
    } else {
      // Don't spam console - only log occasionally, but also log what we're searching for
      if (Math.random() < 0.1) { // 10% chance to log
        const allImgs = document.querySelectorAll('img');
        const modelingImgs = Array.from(allImgs).filter(img => {
          const src = (img.src || img.getAttribute('src') || '').toLowerCase();
          return src.includes('summer') || src.includes('actingprofile');
        });
        if (modelingImgs.length > 0) {
          console.log('🎠 Found', modelingImgs.length, 'modeling images but card not found:', modelingImgs[0].src.substring(0, 60));
        } else {
          console.log('⚠️ Modeling card not found yet (searching...). Images on page:', allImgs.length);
        }
      }
    }
  }

  function init() {
    // Try multiple times, but stop if carousel already exists
    let attempts = 0;
    const maxAttempts = 10;
    
    function tryCreate() {
      attempts++;
      const existingCarousel = document.querySelector('.model-carousel, #modeling-profile-carousel');
      if (existingCarousel) {
        // Carousel exists, just ensure visibility
        existingCarousel.style.display = 'block';
        existingCarousel.style.visibility = 'visible';
        existingCarousel.style.opacity = '1';
        return; // Stop trying
      }
      
      if (attempts < maxAttempts) {
        forceCarouselDisplay();
      }
    }
    
    setTimeout(tryCreate, 500);
    setTimeout(tryCreate, 1000);
    setTimeout(tryCreate, 2000);
    setTimeout(tryCreate, 3000);
    setTimeout(tryCreate, 5000);

    // Watch for new content, but stop if carousel exists
    let observerDisconnected = false;
    const observer = new MutationObserver(function() {
      if (observerDisconnected) return;
      
      const existingCarousel = document.querySelector('.model-carousel, #modeling-profile-carousel');
      if (existingCarousel) {
        // Carousel exists - force visibility and stop observing
        existingCarousel.style.setProperty('display', 'block', 'important');
        existingCarousel.style.setProperty('visibility', 'visible', 'important');
        existingCarousel.style.setProperty('opacity', '1', 'important');
        
        // Force parent card visibility
        const parentCard = existingCarousel.closest('.foto, [class*="portfolio"], [class*="project"], [class*="card"]');
        if (parentCard) {
          parentCard.style.setProperty('opacity', '1', 'important');
          parentCard.style.setProperty('visibility', 'visible', 'important');
        }
        
        observer.disconnect();
        observerDisconnected = true;
        return;
      }
      forceCarouselDisplay();
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
