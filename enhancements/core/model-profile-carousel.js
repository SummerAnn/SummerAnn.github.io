/**
 * Model Profile Carousel v2.0
 * Creates a carousel for the Modeling & Fashion section
 * Images: actingprofile.jpeg (first), summer.JPG (second)
 * Fixes: Forces visibility even when parent has opacity: 0
 */

(function() {
  'use strict';

  const CAROUSEL_IMAGES = [
    '/images/portfolio/actingprofile.jpeg',
    '/images/portfolio/summer.JPG'
  ];

  const MODELING_KEYWORDS = ['modeling', 'fashion', 'model', 'profile', 'acting'];
  let carouselCreated = false;

  function injectCarouselStyles() {
    if (document.getElementById('model-carousel-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'model-carousel-styles';
    styles.textContent = `
      /* Force carousel visibility regardless of parent opacity */
      .model-carousel,
      #modeling-profile-carousel {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        z-index: 100 !important;
        width: 100% !important;
        height: 250px !important;
        overflow: hidden !important;
        border-radius: 12px !important;
        background: #111 !important;
      }

      /* Force parent card visibility */
      .foto:has(.model-carousel),
      [class*="portfolio"]:has(.model-carousel),
      [class*="project"]:has(.model-carousel),
      .model-carousel-parent {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
        transform: none !important;
      }

      .model-carousel .carousel-container {
        display: flex !important;
        height: 100% !important;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }

      .model-carousel .carousel-slide {
        flex-shrink: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }

      .model-carousel .carousel-slide img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center top !important;
        display: block !important;
      }

      .model-carousel .carousel-dots {
        position: absolute !important;
        bottom: 12px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        display: flex !important;
        gap: 10px !important;
        z-index: 20 !important;
      }

      .model-carousel .carousel-dot {
        width: 10px !important;
        height: 10px !important;
        border-radius: 50% !important;
        border: 2px solid rgba(255, 255, 255, 0.8) !important;
        background: transparent !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        padding: 0 !important;
      }

      .model-carousel .carousel-dot.active,
      .model-carousel .carousel-dot:hover {
        background: rgba(255, 255, 255, 0.9) !important;
        transform: scale(1.2) !important;
      }

      /* Navigation arrows - Enhanced and always visible */
      .model-carousel .carousel-nav {
        position: absolute !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        width: 44px !important;
        height: 44px !important;
        background: rgba(0, 0, 0, 0.7) !important;
        border: 2px solid rgba(255, 255, 255, 0.4) !important;
        border-radius: 50% !important;
        color: white !important;
        font-size: 24px !important;
        font-weight: bold !important;
        cursor: pointer !important;
        z-index: 100 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: all 0.3s ease !important;
        opacity: 0.85 !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3) !important;
      }

      .model-carousel:hover .carousel-nav {
        opacity: 1 !important;
        border-color: rgba(255, 255, 255, 0.7) !important;
      }

      .model-carousel .carousel-nav:hover {
        background: rgba(0, 0, 0, 0.9) !important;
        transform: translateY(-50%) scale(1.15) !important;
        border-color: rgba(255, 255, 255, 0.9) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
      }

      .model-carousel .carousel-nav:active {
        transform: translateY(-50%) scale(1.05) !important;
      }

      .model-carousel .carousel-prev {
        left: 15px !important;
      }

      .model-carousel .carousel-next {
        right: 15px !important;
      }
      
      /* Enhanced dots */
      .model-carousel .carousel-dots {
        position: absolute !important;
        bottom: 15px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        display: flex !important;
        gap: 12px !important;
        z-index: 100 !important;
        padding: 8px 14px !important;
        background: rgba(0, 0, 0, 0.5) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border-radius: 25px !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
      }

      .model-carousel .carousel-dot {
        width: 12px !important;
        height: 12px !important;
        border-radius: 50% !important;
        border: 2px solid rgba(255, 255, 255, 0.9) !important;
        background: transparent !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        padding: 0 !important;
      }

      .model-carousel .carousel-dot.active {
        background: rgba(255, 255, 255, 0.95) !important;
        transform: scale(1.3) !important;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.6) !important;
      }

      .model-carousel .carousel-dot:hover {
        background: rgba(255, 255, 255, 0.6) !important;
        transform: scale(1.2) !important;
      }

      /* Hide original image when carousel exists */
      .model-carousel-parent > img:not(.carousel-slide img),
      .carousel-original-hidden {
        display: none !important;
        visibility: hidden !important;
        width: 0 !important;
        height: 0 !important;
        position: absolute !important;
        left: -9999px !important;
      }
    `;
    document.head.appendChild(styles);
  }

  function findModelingCard() {
    // Strategy 1: Find by image source
    const allImages = document.querySelectorAll('img');
    for (const img of allImages) {
      const src = (img.src || '').toLowerCase();
      if (src.includes('actingprofile') || src.includes('summer.jpg') || src.includes('summer.jpeg')) {
        // Don't match if already in carousel
        if (img.closest('.model-carousel')) continue;

        const card = findParentCard(img);
        if (card) {
          return { card, image: img };
        }
      }
    }

    // Strategy 2: Find by text content
    const allCards = document.querySelectorAll('.foto, [class*="portfolio-item"], [class*="project"], [class*="card"]');
    for (const card of allCards) {
      if (card === document.body || card === document.documentElement) continue;
      if (card.querySelector('.model-carousel')) continue;

      const text = (card.textContent || '').toLowerCase();
      const hasKeyword = MODELING_KEYWORDS.some(k => text.includes(k));

      if (hasKeyword) {
        const img = card.querySelector('img');
        if (img) {
          return { card, image: img };
        }
      }
    }

    return null;
  }

  function findParentCard(element) {
    let parent = element.parentElement;
    let depth = 0;

    while (parent && depth < 10) {
      if (parent === document.body || parent === document.documentElement) {
        parent = parent.parentElement;
        depth++;
        continue;
      }

      // Check for card-like characteristics
      const classes = Array.from(parent.classList || []).join(' ').toLowerCase();
      const isCard = classes.includes('foto') ||
                     classes.includes('portfolio') ||
                     classes.includes('project') ||
                     classes.includes('card') ||
                     classes.includes('item');

      const hasSize = parent.offsetWidth > 150 && parent.offsetHeight > 100;

      if (isCard && hasSize) {
        return parent;
      }

      parent = parent.parentElement;
      depth++;
    }

    // Fallback: return a reasonable parent
    parent = element.parentElement;
    for (let i = 0; i < 5 && parent; i++) {
      if (parent.offsetWidth > 150 && parent.offsetHeight > 100 &&
          parent !== document.body && parent !== document.documentElement) {
        return parent;
      }
      parent = parent.parentElement;
    }

    return null;
  }

  function createCarousel(container, originalImage) {
    if (carouselCreated) return;
    if (container.querySelector('.model-carousel')) return;

    console.log('Creating model carousel in:', container);

    // Create carousel element with forced visibility
    const carousel = document.createElement('div');
    carousel.className = 'model-carousel';
    carousel.id = 'modeling-profile-carousel';
    
    // Force visibility with inline styles (highest priority)
    carousel.style.cssText = `
      position: relative !important;
      width: 100% !important;
      height: 230px !important;
      overflow: hidden !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 9999 !important;
      background: #000 !important;
      margin: 0 !important;
      padding: 0 !important;
    `;

    carousel.innerHTML = `
      <div class="carousel-container" style="width: ${CAROUSEL_IMAGES.length * 100}%;">
        ${CAROUSEL_IMAGES.map((src, idx) => `
          <div class="carousel-slide" style="width: ${100 / CAROUSEL_IMAGES.length}%;">
            <img src="${src}" alt="Model Profile ${idx + 1}" loading="lazy">
          </div>
        `).join('')}
      </div>
      <button class="carousel-nav carousel-prev" aria-label="Previous">‹</button>
      <button class="carousel-nav carousel-next" aria-label="Next">›</button>
      <div class="carousel-dots">
        ${CAROUSEL_IMAGES.map((_, idx) => `
          <button class="carousel-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}" aria-label="Go to slide ${idx + 1}"></button>
        `).join('')}
      </div>
    `;

    // Hide original image
    if (originalImage) {
      originalImage.classList.add('carousel-original-hidden');
    }

    // Mark parent for CSS targeting
    container.classList.add('model-carousel-parent');

    // Force parent visibility
    forceVisibility(container);

    // Insert carousel
    if (originalImage && originalImage.parentElement === container) {
      container.insertBefore(carousel, originalImage);
    } else {
      container.insertBefore(carousel, container.firstChild);
    }

    // Initialize carousel functionality
    initCarouselLogic(carousel);

    // Force visibility again after insertion
    setTimeout(() => {
      forceVisibility(carousel);
      forceVisibility(container);
      
      // Double-check carousel is visible
      const rect = carousel.getBoundingClientRect();
      const computed = window.getComputedStyle(carousel);
      console.log('Carousel visibility check:', {
        exists: !!carousel,
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        width: rect.width,
        height: rect.height,
        inViewport: rect.width > 0 && rect.height > 0
      });
      
      if (rect.width === 0 || rect.height === 0 || computed.display === 'none') {
        console.warn('⚠️ Carousel still not visible, trying more aggressive fix...');
        // Try removing and re-adding
        const parent = carousel.parentElement;
        if (parent) {
          carousel.remove();
          parent.insertBefore(carousel, parent.firstChild);
          forceVisibility(carousel);
          forceVisibility(parent);
        }
      }
    }, 100);

    carouselCreated = true;
    console.log('✅ Model carousel created successfully');
  }

  function forceVisibility(element) {
    // Walk up the DOM tree and force visibility - VERY AGGRESSIVE
    let current = element;
    let depth = 0;

    while (current && depth < 15) {
      if (current === document.body || current === document.documentElement) break;

      // Force inline styles - use both setProperty AND direct assignment
      current.style.opacity = '1';
      current.style.visibility = 'visible';
      current.style.display = current.style.display === 'none' ? 'block' : (current.style.display || 'block');
      
      // Also use setProperty for !important
      current.style.setProperty('opacity', '1', 'important');
      current.style.setProperty('visibility', 'visible', 'important');
      current.style.setProperty('display', 'block', 'important');
      current.style.setProperty('z-index', '10', 'important');

      // Check computed styles to see if React is overriding
      const computed = window.getComputedStyle(current);
      if (computed.opacity === '0' || computed.display === 'none' || computed.visibility === 'hidden') {
        console.warn('⚠️ Element still hidden after forcing:', {
          element: current,
          tag: current.tagName,
          class: current.className,
          computedOpacity: computed.opacity,
          computedDisplay: computed.display,
          inlineOpacity: current.style.opacity,
          inlineDisplay: current.style.display
        });
        
        // Try removing the style attribute entirely and re-adding
        const originalStyle = current.getAttribute('style');
        current.removeAttribute('style');
        current.style.opacity = '1';
        current.style.visibility = 'visible';
        current.style.display = 'block';
      }

      // Remove any transform that might hide it
      const transform = computed.transform;
      if (transform && transform !== 'none') {
        const currentTransform = current.style.transform;
        if (currentTransform && (currentTransform.includes('-9999') || currentTransform.includes('scale(0)') || currentTransform.includes('translateY(9999'))) {
          current.style.setProperty('transform', 'none', 'important');
          current.style.transform = 'none';
        }
      }

      current = current.parentElement;
      depth++;
    }
    
    console.log('✅ Forced visibility for element and', depth, 'ancestors');
  }

  function initCarouselLogic(carousel) {
    const container = carousel.querySelector('.carousel-container');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const slideCount = CAROUSEL_IMAGES.length;
    let currentSlide = 0;
    let autoAdvanceTimer = null;

    function goToSlide(index) {
      currentSlide = ((index % slideCount) + slideCount) % slideCount;
      container.style.transform = `translateX(-${currentSlide * (100 / slideCount)}%)`;

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoAdvance() {
      stopAutoAdvance();
      autoAdvanceTimer = setInterval(nextSlide, 4000);
    }

    function stopAutoAdvance() {
      if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
      }
    }

    // Event listeners for navigation
    if (dots && dots.length > 0) {
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(idx);
          stopAutoAdvance();
          startAutoAdvance();
        });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
        stopAutoAdvance();
        startAutoAdvance();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
        stopAutoAdvance();
        startAutoAdvance();
      });
    }

    // Keyboard navigation (when carousel is focused/visible)
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        stopAutoAdvance();
        startAutoAdvance();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        stopAutoAdvance();
        startAutoAdvance();
      }
    });

    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
    
    // Ensure buttons are visible
    if (prevBtn) {
      prevBtn.style.opacity = '0.85';
      prevBtn.style.display = 'flex';
      prevBtn.style.visibility = 'visible';
    }
    if (nextBtn) {
      nextBtn.style.opacity = '0.85';
      nextBtn.style.display = 'flex';
      nextBtn.style.visibility = 'visible';
    }
    
    console.log('✅ Carousel navigation initialized:', {
      prevBtn: !!prevBtn,
      nextBtn: !!nextBtn,
      dots: dots.length,
      slides: slideCount
    });

    // Touch support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoAdvance();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoAdvance();
    }, { passive: true });

    // Start auto-advance
    startAutoAdvance();
  }

  function tryCreateCarousel() {
    if (carouselCreated) return;

    const result = findModelingCard();
    if (result) {
      createCarousel(result.card, result.image);
    }
  }

  function init() {
    injectCarouselStyles();

    // Try multiple times with increasing delays
    const delays = [100, 500, 1000, 2000, 3000, 5000];
    delays.forEach(delay => {
      setTimeout(tryCreateCarousel, delay);
    });

    // Watch for new elements
    const observer = new MutationObserver(() => {
      if (!carouselCreated) {
        setTimeout(tryCreateCarousel, 100);
      }
    });

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
  }

  // Expose for debugging
  window.createModelProfileCarousel = tryCreateCarousel;
  window.forceModelCarouselVisibility = () => {
    const carousel = document.querySelector('.model-carousel');
    if (carousel) {
      forceVisibility(carousel.parentElement);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
