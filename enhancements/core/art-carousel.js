/**
 * Art Carousel
 * Creates a carousel for the Art section showing modeling photos, Instagram, Spotify, etc.
 */

(function() {
  'use strict';

  const ART_ITEMS = [
    // All images from acting profile directory (Large versions for best quality)
    // Note: myProfile.jpg removed - already displayed in profile/avatar section
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/1 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/2 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/3 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/4 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/5 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/6 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/7 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/9 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/10 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/11 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/12 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/13 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/14 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/15 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/16 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/17 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/18 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/19 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/20 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/21 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/22 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/23 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/24 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/25 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/App/acting profile/26 Large.jpeg',
      alt: 'Acting Portfolio',
      title: 'Acting Portfolio',
      description: 'Professional acting and modeling work'
    },
    {
      type: 'image',
      src: '/images/portfolio/actingprofile.jpeg',
      alt: 'Acting Profile',
      title: 'Acting & Modeling Portfolio',
      description: 'Professional modeling and acting composite'
    },
    {
      type: 'image',
      src: '/images/portfolio/summer.JPG',
      alt: 'Summer Modeling',
      title: 'Fashion & Editorial',
      description: 'Fashion photography and editorial work'
    },
    {
      type: 'spotify',
      artistId: '2LCLnET4J0BsEbwztWl7OL',
      title: 'Spotify',
      description: 'Listen to my music',
      icon: 'fab fa-spotify',
      color: '#1DB954',
      url: 'https://open.spotify.com/artist/2LCLnET4J0BsEbwztWl7OL?si=D-Bl8oKkTGCH9tBn0ni9qw'
    },
    {
      type: 'link',
      url: 'https://www.instagram.com/summereunann/?hl=en',
      title: 'Instagram',
      description: '@summereunann - Follow my creative journey',
      icon: 'fab fa-instagram',
      color: '#E4405F'
    },
    {
      type: 'link',
      url: 'https://summerann.onuniverse.com/',
      title: 'Universe',
      description: 'My creative universe',
      icon: 'fas fa-globe',
      color: '#6366f1'
    }
  ];

  function injectArtCarouselStyles() {
    if (document.getElementById('art-carousel-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'art-carousel-styles';
    styles.textContent = `
      #art-section {
        padding: 80px 20px;
        min-height: 100vh;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
      }

      .art-carousel {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
        height: 500px;
        overflow: hidden;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
      }

      .art-carousel-container {
        display: flex;
        width: ${ART_ITEMS.length * 100}%;
        height: 100%;
        transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        will-change: transform;
        position: relative;
        transform: translateX(0) !important;
        left: 0 !important;
        margin-left: 0 !important;
        top: 0;
      }

      .art-carousel-slide {
        width: ${100 / ART_ITEMS.length}%;
        height: 100%;
        flex-shrink: 0;
        display: flex !important;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: visible;
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.6s ease, transform 0.6s ease;
        min-width: ${100 / ART_ITEMS.length}%;
        visibility: visible !important;
      }

      .art-carousel-slide.active {
        opacity: 1;
        transform: scale(1);
        z-index: 2;
      }
      
      .art-carousel-slide img {
        display: block;
        min-width: 100%;
        min-height: 100%;
      }

      .art-carousel-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        will-change: transform;
        display: block;
        min-width: 100%;
        min-height: 100%;
      }

      .art-carousel-slide:hover img {
        transform: scale(1.05);
      }

      .art-carousel-slide.art-link,
      .art-carousel-slide.art-spotify,
      .art-carousel-slide.art-iframe {
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255, 255, 255, 0.1);
        min-height: 100%;
        display: flex !important;
        align-items: center;
        justify-content: center;
      }

      .art-carousel-slide iframe {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 0;
        display: block;
      }

      .art-spotify-embed {
        width: 100%;
        height: 100%;
        display: flex !important;
        align-items: center;
        justify-content: center;
        padding: 20px;
        min-height: 100%;
      }

      .art-spotify-embed iframe {
        max-width: 100%;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }

      .art-link-content {
        text-align: center;
        padding: 40px;
        color: white;
        animation: fadeInUp 0.6s ease-out;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100%;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .art-link-content .art-icon {
        font-size: 64px;
        margin-bottom: 20px;
        display: block;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .art-link-content:hover .art-icon {
        transform: scale(1.15) rotate(5deg);
      }

      .art-link-content h3 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 32px;
        margin: 0 0 12px;
        font-weight: 700;
        transition: transform 0.3s ease;
      }

      .art-link-content:hover h3 {
        transform: translateY(-3px);
      }

      .art-link-content p {
        font-size: 18px;
        margin: 0 0 24px;
        opacity: 0.9;
      }

      .art-link-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 28px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        border: 2px solid rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.1);
        color: white;
        backdrop-filter: blur(10px);
      }

      .art-link-btn:hover {
        transform: translateY(-3px) scale(1.05);
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      }

      .art-link-btn:active {
        transform: translateY(-1px) scale(1.02);
      }

      .art-carousel-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 56px;
        height: 56px;
        background: rgba(0, 0, 0, 0.6);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        color: white;
        font-size: 28px;
        cursor: pointer;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }

      .art-carousel-nav:hover {
        background: rgba(0, 0, 0, 0.85);
        border-color: rgba(255, 255, 255, 0.7);
        transform: translateY(-50%) scale(1.15);
        box-shadow: 0 6px 25px rgba(255, 255, 255, 0.2);
      }

      .art-carousel-nav:active {
        transform: translateY(-50%) scale(1.05);
      }

      .art-carousel-prev {
        left: 20px;
      }

      .art-carousel-next {
        right: 20px;
      }

      .art-carousel-dots {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 12px;
        z-index: 10;
        padding: 10px 16px;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        border-radius: 25px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .art-carousel-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.6);
        background: transparent;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        position: relative;
      }

      .art-carousel-dot::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transition: transform 0.4s ease;
      }

      .art-carousel-dot.active {
        background: rgba(255, 255, 255, 0.95);
        transform: scale(1.4);
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.9);
      }

      .art-carousel-dot.active::before {
        transform: translate(-50%, -50%) scale(1.5);
      }

      .art-carousel-dot:hover {
        background: rgba(255, 255, 255, 0.6);
        transform: scale(1.3);
        border-color: rgba(255, 255, 255, 0.8);
      }
    `;
    document.head.appendChild(styles);
  }

  // Global flag to prevent multiple initializations
  let carouselCreating = false;
  let carouselCreated = false;

  function createArtCarousel() {
    const artSection = document.getElementById('art');
    if (!artSection) {
      console.log('⚠️ Art section not found');
      return;
    }

    // Check if carousel already exists
    const existingCarousel = artSection.querySelector('.art-carousel');
    if (existingCarousel) {
      console.log('✅ Art carousel already exists, skipping creation');
      // Reset position in case it's off-screen
      const container = existingCarousel.querySelector('.art-carousel-container');
      if (container) {
        container.style.transform = 'translateX(0)';
        console.log('✅ Reset carousel position to 0');
      }
      carouselCreated = true;
      return;
    }

    // Prevent multiple simultaneous creations
    if (carouselCreating) {
      console.log('⏳ Carousel creation already in progress, skipping...');
      return;
    }

    if (carouselCreated) {
      console.log('✅ Carousel was already created, skipping...');
      return;
    }

    carouselCreating = true;
    
    console.log('🎨 Creating art carousel with', ART_ITEMS.length, 'items');

    const carousel = document.createElement('div');
    carousel.className = 'art-carousel';
    carousel.id = 'art-carousel';

    const container = document.createElement('div');
    container.className = 'art-carousel-container';
    container.style.transform = 'translateX(0)'; // Start at position 0

    console.log('📋 Creating slides for', ART_ITEMS.length, 'items');
    const createdSlides = [];
    ART_ITEMS.forEach((item, idx) => {
      const slide = document.createElement('div');
      let slideClass = 'art-carousel-slide';
      if (item.type === 'link') slideClass += ' art-link';
      else if (item.type === 'spotify') slideClass += ' art-spotify';
      else if (item.type === 'iframe') slideClass += ' art-iframe';
      slide.className = slideClass;
      slide.dataset.index = idx;
      slide.dataset.type = item.type;
      slide.dataset.src = item.src || item.url || '';
      slide.id = `art-slide-${idx}`; // Unique ID for each slide

      if (item.type === 'image') {
        const img = document.createElement('img');
        // Encode URL to handle spaces in filenames - use encodeURI for full path
        const encodedSrc = encodeURI(item.src);
        img.src = encodedSrc;
        img.alt = item.alt || 'Art image';
        img.loading = 'lazy';
        img.style.display = 'block';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        img.onerror = function() {
          console.error('❌ Failed to load image:', item.src, 'Encoded:', encodedSrc);
          // Try alternative encoding methods
          const altSrc1 = item.src.replace(/ /g, '%20');
          const altSrc2 = item.src.replace(/ /g, '+');
          if (altSrc1 !== encodedSrc && this.src === encodedSrc) {
            console.log('🔄 Trying alternative encoding 1:', altSrc1);
            this.src = altSrc1;
          } else if (altSrc2 !== encodedSrc && this.src === altSrc1) {
            console.log('🔄 Trying alternative encoding 2:', altSrc2);
            this.src = altSrc2;
          } else {
            console.error('❌ All encoding attempts failed for:', item.src);
            // Show error placeholder instead of hiding
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.backgroundColor = 'rgba(0,0,0,0.3)';
            this.alt = 'Image failed to load: ' + item.src;
            this.style.color = 'white';
            this.style.fontSize = '14px';
            this.style.padding = '20px';
            this.style.textAlign = 'center';
          }
        };
        img.onload = function() {
          console.log('✅ Successfully loaded image:', item.src);
        };
        slide.appendChild(img);
        console.log('📸 Created image slide for:', item.src);
      } else if (item.type === 'spotify') {
        const spotifyContainer = document.createElement('div');
        spotifyContainer.className = 'art-spotify-embed';
        const iframe = document.createElement('iframe');
        iframe.src = `https://open.spotify.com/embed/artist/${item.artistId}?utm_source=generator&theme=0`;
        iframe.width = '100%';
        iframe.height = '352';
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
        iframe.loading = 'lazy';
        iframe.style.maxWidth = '100%';
        iframe.style.display = 'block';
        spotifyContainer.appendChild(iframe);
        slide.appendChild(spotifyContainer);
        console.log('🎵 Created Spotify slide for:', item.artistId);
      } else if (item.type === 'iframe') {
        const iframe = document.createElement('iframe');
        iframe.src = item.url;
        iframe.allow = 'fullscreen';
        iframe.loading = 'lazy';
        iframe.onerror = function() {
          // Fallback to link if iframe fails
          const linkContent = document.createElement('div');
          linkContent.className = 'art-link-content';
          linkContent.innerHTML = `
            <i class="${item.icon} art-icon" style="color: ${item.color};"></i>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.url}" target="_blank" class="art-link-btn" style="border-color: ${item.color};">
              Visit <i class="fas fa-external-link-alt"></i>
            </a>
          `;
          slide.innerHTML = '';
          slide.appendChild(linkContent);
        };
        slide.appendChild(iframe);
      } else if (item.type === 'link') {
        const linkContent = document.createElement('div');
        linkContent.className = 'art-link-content';
        linkContent.innerHTML = `
          <i class="${item.icon} art-icon" style="color: ${item.color};"></i>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.url}" target="_blank" class="art-link-btn" style="border-color: ${item.color}; background: linear-gradient(135deg, ${item.color}20, ${item.color}10);">
            Visit <i class="fas fa-external-link-alt"></i>
          </a>
        `;
        slide.appendChild(linkContent);
        console.log('🔗 Created link slide for:', item.url);
        console.log('   Link content HTML:', linkContent.innerHTML.substring(0, 100));
      }

      // Verify slide has content before appending
      const hasContent = slide.querySelector('img, .art-link-content, .art-spotify-embed, iframe');
      if (!hasContent) {
        console.error(`❌ Slide ${idx + 1} (${item.type}) has NO content!`, slide);
      } else {
        createdSlides.push({ index: idx, type: item.type, hasContent: true });
      }
      
      container.appendChild(slide);
      if (idx < 5 || idx === ART_ITEMS.length - 1) {
        console.log(`📦 Created slide ${idx + 1}/${ART_ITEMS.length}: ${item.type} - ${item.src || item.url || 'N/A'}`);
      }
    });
    
    console.log('✅ All slides created. Total slides in container:', container.children.length);
    console.log('📊 Created slides summary:', createdSlides.length, 'slides with content');
    
    // Verify no duplicates
    const slideIds = Array.from(container.children).map(s => s.id);
    const uniqueIds = new Set(slideIds);
    if (slideIds.length !== uniqueIds.size) {
      console.error('❌ DUPLICATE SLIDES DETECTED!', slideIds);
    }

    carousel.appendChild(container);

    // Add navigation arrows
    const prevBtn = document.createElement('button');
    prevBtn.className = 'art-carousel-nav art-carousel-prev';
    prevBtn.innerHTML = '‹';
    prevBtn.setAttribute('aria-label', 'Previous');
    carousel.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'art-carousel-nav art-carousel-next';
    nextBtn.innerHTML = '›';
    nextBtn.setAttribute('aria-label', 'Next');
    carousel.appendChild(nextBtn);

    // Add dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'art-carousel-dots';
    ART_ITEMS.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `art-carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.dataset.slide = idx;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dotsContainer.appendChild(dot);
    });
    carousel.appendChild(dotsContainer);

    // Insert carousel into art section - find the container div or create one
    let artContainer = artSection.querySelector('div[style*="max-width"]');
    if (!artContainer) {
      // If no container exists, check if there's already a div structure
      artContainer = artSection.querySelector('div:first-child');
      if (!artContainer || artContainer.classList.contains('art-carousel')) {
        // Create a new container
        artContainer = document.createElement('div');
        artContainer.style.cssText = 'max-width: 1200px; margin: 0 auto;';
        // If there's a title, insert after it, otherwise just append
        const title = artSection.querySelector('h2');
        if (title && title.parentNode) {
          title.parentNode.appendChild(artContainer);
        } else {
          artSection.appendChild(artContainer);
        }
      }
    }
    artContainer.appendChild(carousel);
    
    // Force a reflow to ensure positioning is correct
    void carousel.offsetHeight;
    
    // CRITICAL: Ensure carousel and container are positioned correctly
    const carouselContainer = carousel.querySelector('.art-carousel-container');
    if (carouselContainer) {
      carouselContainer.style.left = '0';
      carouselContainer.style.marginLeft = '0';
      carouselContainer.style.transform = 'translateX(0)';
      console.log('✅ Forced container positioning to 0');
    }
    
    console.log('✅ Art carousel appended to section. Total slides:', ART_ITEMS.length);
    console.log('✅ Carousel element:', carousel);
    console.log('✅ Container element:', container);
    console.log('✅ First slide:', container.querySelector('.art-carousel-slide'));

    // Initialize carousel logic
    initArtCarouselLogic(carousel);
    
    // Set initial active slide
    const firstSlide = carousel.querySelector('.art-carousel-slide');
    if (firstSlide) {
      firstSlide.classList.add('active');
      console.log('✅ First slide activated');
    } else {
      console.warn('⚠️ No slides found in carousel!');
    }

    console.log('✅ Art carousel created and initialized');
  }

    function initArtCarouselLogic(carousel) {
    const container = carousel.querySelector('.art-carousel-container');
    const slides = carousel.querySelectorAll('.art-carousel-slide');
    const dots = carousel.querySelectorAll('.art-carousel-dot');
    const prevBtn = carousel.querySelector('.art-carousel-prev');
    const nextBtn = carousel.querySelector('.art-carousel-next');
    
    if (!container || !slides.length) {
      console.error('⚠️ Art carousel container or slides not found!');
      return;
    }
    
    // Ensure container starts at position 0 - CRITICAL for visibility
    container.style.transform = 'translateX(0)';
    container.style.left = '0';
    container.style.marginLeft = '0';
    container.style.position = 'relative';
    
    // Force a reflow to ensure positioning is applied
    void container.offsetHeight;
    
    console.log('🎨 Container initialized. Computed left:', window.getComputedStyle(container).left);
    
    let currentSlide = 0;
    let autoAdvanceTimer = null;

    function goToSlide(index) {
      if (!slides || slides.length === 0) {
        console.error('❌ No slides found!');
        return;
      }
      
      const prevSlide = currentSlide;
      currentSlide = ((index % slides.length) + slides.length) % slides.length;
      
      // Only skip if we're explicitly trying to go to the same slide (not on first load)
      if (currentSlide === prevSlide && index === prevSlide && prevSlide !== 0) {
        console.log('⚠️ Already on slide', currentSlide, ', skipping update');
        return;
      }
      
      // Update active states
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
      });
      
      // Calculate transform - each slide is 100/slides.length % of container width
      const slideWidthPercent = 100 / slides.length;
      const translateX = currentSlide * slideWidthPercent;
      
      // CRITICAL: Reset left/margin before applying transform
      container.style.left = '0';
      container.style.marginLeft = '0';
      container.style.transform = `translateX(-${translateX}%)`;

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
      
      const currentSlideElement = slides[currentSlide];
      const slideType = currentSlideElement?.dataset?.type || 'unknown';
      const slideContent = currentSlideElement?.querySelector('img, .art-link-content, .art-spotify-embed, iframe');
      const slideId = currentSlideElement?.id || 'no-id';
      console.log(`🎨 Moved to slide ${currentSlide + 1}/${slides.length} (ID: ${slideId}), translateX: -${translateX}%`);
      console.log(`   Slide type: ${slideType}, Has content: ${!!slideContent}`);
      console.log(`   Slide element:`, currentSlideElement);
      console.log(`   Container transform:`, container.style.transform);
    }
    
    // Log initial state
    console.log('📊 Carousel stats:', {
      totalSlides: slides.length,
      expectedSlides: ART_ITEMS.length,
      containerWidth: container.style.width,
      firstSlide: slides[0]?.id,
      lastSlide: slides[slides.length - 1]?.id
    });
    
    // Initialize to slide 0
    goToSlide(0);

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoAdvance() {
      stopAutoAdvance();
      autoAdvanceTimer = setInterval(() => {
        nextSlide();
      }, 6000); // 6 seconds for smoother experience
    }

    function stopAutoAdvance() {
      if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
      }
    }

    // Event listeners
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

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(idx);
        stopAutoAdvance();
        startAutoAdvance();
      });
    });

    // Keyboard navigation
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
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      startAutoAdvance();
    }, { passive: true });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);

    // Start auto-advance
    startAutoAdvance();

    console.log('✅ Art carousel navigation initialized');
    
    // Mark as created
    carouselCreated = true;
    carouselCreating = false;
  }

  function init() {
    injectArtCarouselStyles();

    // Try to create carousel multiple times with longer delays
    const delays = [100, 500, 1000, 2000, 3000, 5000];
    delays.forEach(delay => {
      setTimeout(() => {
        const artSection = document.getElementById('art');
        if (artSection && !artSection.querySelector('.art-carousel')) {
          console.log('🎨 Attempting to create art carousel at', delay, 'ms');
          createArtCarousel();
        }
      }, delay);
    });

    // Watch for art section with more aggressive observation
    const observer = new MutationObserver(() => {
      const artSection = document.getElementById('art');
      if (artSection && !artSection.querySelector('.art-carousel')) {
        console.log('🎨 Art section detected, creating carousel...');
        createArtCarousel();
      }
    });

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // Also listen for hash changes (when navigating to #art)
    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#art') {
        setTimeout(() => {
          const artSection = document.getElementById('art');
          if (artSection && !artSection.querySelector('.art-carousel')) {
            console.log('🎨 Hash changed to #art, creating carousel...');
            createArtCarousel();
          }
        }, 300);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose globally
  window.createArtCarousel = createArtCarousel;
})();
