/**
 * Art Gallery 3D Card Carousel v4.0
 * Stunning 3D perspective carousel with smooth animations
 * Inspired by modern card carousel designs
 */

(function() {
  'use strict';

  // All gallery images with gradients for cards
  const GALLERY_IMAGES = [
    {
      src: '/images/portfolio/modeling/p1.jpg',
      title: 'Acting Portfolio',
      category: 'Acting',
      gradient: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
      link: 'https://www.imdb.com/name/nm9520569/',
      linkLabel: 'IMDb',
      focus: 'top center'
    },
    {
      src: '/images/portfolio/modeling/p6.jpg',
      title: 'Acting Portfolio',
      category: 'Acting',
      gradient: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
      link: 'https://www.imdb.com/name/nm9520569/',
      linkLabel: 'IMDb',
      focus: 'top center'
    },
    { src: '/images/portfolio/summer.JPG', title: 'Fashion Editorial', category: 'Fashion', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    {
      src: '/images/myProfile.jpg',
      title: 'S U M M E R on Apple Music',
      category: 'Music',
      gradient: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
      link: 'https://music.apple.com/us/artist/s-u-m-m-e-r/1602559220',
      linkLabel: 'Listen on Apple Music'
    },
    { src: '/images/myProfile.jpg', title: 'Profile', category: 'Portrait', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { src: '/images/portfolio/App/acting%20profile/1%20Large.jpeg', title: 'Editorial 1', category: 'Editorial', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { src: '/images/portfolio/App/acting%20profile/2%20Large.jpeg', title: 'Editorial 2', category: 'Editorial', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { src: '/images/portfolio/App/acting%20profile/3%20Large.jpeg', title: 'Fashion 1', category: 'Fashion', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { src: '/images/portfolio/App/acting%20profile/4%20Large.jpeg', title: 'Fashion 2', category: 'Fashion', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { src: '/images/portfolio/App/acting%20profile/5%20Large.jpeg', title: 'Portrait 1', category: 'Portrait', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
    { src: '/images/portfolio/App/acting%20profile/6%20Large.jpeg', title: 'Portrait 2', category: 'Portrait', gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' },
    { src: '/images/portfolio/App/acting%20profile/7%20Large.jpeg', title: 'Lifestyle 1', category: 'Lifestyle', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
    { src: '/images/portfolio/App/acting%20profile/9%20Large.jpeg', title: 'Lifestyle 2', category: 'Lifestyle', gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)' },
    { src: '/images/portfolio/App/acting%20profile/10%20Large.jpeg', title: 'Creative 1', category: 'Creative', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
    { src: '/images/portfolio/App/acting%20profile/11%20Large.jpeg', title: 'Creative 2', category: 'Creative', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { src: '/images/portfolio/App/acting%20profile/12%20Large.jpeg', title: 'Studio 1', category: 'Studio', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { src: '/images/portfolio/App/acting%20profile/13%20Large.jpeg', title: 'Studio 2', category: 'Studio', gradient: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)' },
    { src: '/images/portfolio/App/acting%20profile/14%20Large.jpeg', title: 'Outdoor 1', category: 'Outdoor', gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' },
    { src: '/images/portfolio/App/acting%20profile/15%20Large.jpeg', title: 'Outdoor 2', category: 'Outdoor', gradient: 'linear-gradient(135deg, #eea2a2 0%, #bbc1bf 50%, #57c6e1 100%)' },
    { src: '/images/portfolio/App/acting%20profile/16%20Large.jpeg', title: 'Artistic 1', category: 'Artistic', gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)' },
    { src: '/images/portfolio/App/acting%20profile/17%20Large.jpeg', title: 'Artistic 2', category: 'Artistic', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
    { src: '/images/portfolio/App/acting%20profile/18%20Large.jpeg', title: 'Mood 1', category: 'Mood', gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
    { src: '/images/portfolio/App/acting%20profile/19%20Large.jpeg', title: 'Mood 2', category: 'Mood', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { src: '/images/portfolio/App/acting%20profile/20%20Large.jpeg', title: 'Cinematic 1', category: 'Cinematic', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { src: '/images/portfolio/App/acting%20profile/21%20Large.jpeg', title: 'Cinematic 2', category: 'Cinematic', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { src: '/images/portfolio/App/acting%20profile/22%20Large.jpeg', title: 'Expression 1', category: 'Expression', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { src: '/images/portfolio/App/acting%20profile/23%20Large.jpeg', title: 'Expression 2', category: 'Expression', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { src: '/images/portfolio/App/acting%20profile/24%20Large.jpeg', title: 'Movement 1', category: 'Movement', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { src: '/images/portfolio/App/acting%20profile/25%20Large.jpeg', title: 'Movement 2', category: 'Movement', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { src: '/images/portfolio/App/acting%20profile/26%20Large.jpeg', title: 'Final Look', category: 'Portfolio', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' }
  ];

  // Apple Music artist link
  const APPLE_MUSIC_ARTIST_ID = '1602559220';
  const APPLE_MUSIC_ARTIST_URL = 'https://music.apple.com/us/artist/s-u-m-m-e-r/1602559220';

  // Social links
  const SOCIAL_LINKS = [
    {
      url: 'https://open.spotify.com/artist/2LCLnET4J0BsEbwztWl7OL',
      title: 'Spotify',
      description: 'Listen to my music',
      icon: 'fab fa-spotify',
      color: '#1DB954'
    },
    {
      url: 'https://www.instagram.com/summereunann/',
      title: 'Instagram',
      description: '@summereunann',
      icon: 'fab fa-instagram',
      color: '#E4405F'
    },
    {
      url: 'https://summerann.onuniverse.com/',
      title: 'Universe',
      description: 'Creative Portfolio',
      icon: 'fas fa-globe',
      color: '#6366f1'
    },
    {
      url: APPLE_MUSIC_ARTIST_URL,
      title: 'Apple Music',
      description: 'Artist Page',
      icon: 'fab fa-apple',
      color: '#ffffff'
    }
  ];

  function injectGalleryStyles() {
    if (document.getElementById('art-gallery-3d-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'art-gallery-3d-styles';
    styles.textContent = `
      /* Art Gallery 3D Carousel Container */
      #art-section,
      #art {
        padding: 80px 20px 100px;
        min-height: 100vh;
        background: #050505;
        position: relative;
        overflow: hidden;
      }

      #art::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
          radial-gradient(ellipse at 20% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 45%),
          radial-gradient(ellipse at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
        pointer-events: none;
      }

      .art-carousel-wrapper {
        max-width: 1400px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      .art-carousel-header {
        text-align: center;
        margin-bottom: 60px;
      }

      .art-carousel-header h2 {
        font-family: 'Playfair Display', serif;
        font-size: clamp(2.5rem, 6vw, 4rem);
        font-weight: 700;
        background: linear-gradient(135deg, #fff 0%, #6366f1 50%, #f43f5e 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 16px;
        letter-spacing: -0.02em;
      }

      .art-carousel-header p {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.2rem;
        font-weight: 400;
      }

      /* 3D Carousel Container */
      .carousel-3d-container {
        position: relative;
        height: 420px;
        perspective: 1400px;
        margin: 0 auto 40px;
        max-width: 1200px;
      }

      .carousel-3d-track {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Individual Card Styles */
      .carousel-3d-card {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 260px;
        height: 360px;
        margin-left: -130px;
        margin-top: -180px;
        border-radius: 28px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
        transform-style: preserve-3d;
        backface-visibility: hidden;
      }

      .carousel-3d-card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 28px;
        padding: 2px;
        background: linear-gradient(140deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        z-index: 2;
      }

      .carousel-3d-card.active {
        z-index: 100;
        box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55), 0 0 30px rgba(255, 255, 255, 0.12);
      }

      .carousel-3d-card.active:hover {
        transform: translateZ(30px) scale(1.02);
      }

      /* Card Image */
      .card-image-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-size: cover;
        background-position: center;
      }

      .card-image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .carousel-3d-card:hover .card-image-wrapper img {
        transform: scale(1.08);
      }

      .card-image-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%);
        pointer-events: none;
      }

      /* Card Content */
      .card-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 18px 20px;
        background: rgba(6, 6, 6, 0.72);
        backdrop-filter: blur(12px);
        text-align: center;
      }

      .card-category {
        display: inline-block;
        padding: 4px 12px;
        background: rgba(255, 255, 255, 0.16);
        border-radius: 20px;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: rgba(255, 255, 255, 0.85);
        margin-bottom: 8px;
      }

      .card-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
        color: #f9fafb;
        margin: 0;
      }

      .card-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 8px;
        font-size: 12px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.85);
        text-decoration: none;
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.08);
      }

      .card-link:hover {
        background: rgba(255, 255, 255, 0.16);
      }

      /* Navigation Arrows */
      .carousel-3d-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        color: white;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 200;
      }

      .carousel-3d-nav:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }

      .carousel-3d-nav:active {
        transform: translateY(-50%) scale(0.95);
      }

      .carousel-3d-prev { left: 20px; }
      .carousel-3d-next { right: 20px; }

      /* Dots Navigation */
      .carousel-3d-dots {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 30px;
      }

      .carousel-3d-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
      }

      .carousel-3d-dot:hover {
        background: rgba(255, 255, 255, 0.5);
        transform: scale(1.2);
      }

      .carousel-3d-dot.active {
        background: linear-gradient(135deg, #6366f1, #f43f5e);
        width: 30px;
        border-radius: 5px;
      }

      /* Current Info Display */
      .carousel-current-info {
        text-align: center;
        margin-top: 20px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }

      .music-embed-panel {
        margin: 32px auto 0;
        max-width: 720px;
        padding: 18px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
      }

      .music-embed-panel h3 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.2rem;
        font-weight: 600;
        color: #f9fafb;
        margin-bottom: 10px;
        text-align: center;
      }

      .instagram-embed-panel {
        margin: 24px auto 0;
        max-width: 720px;
        padding: 18px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
      }

      .instagram-embed-panel h3 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
        color: #f9fafb;
        margin-bottom: 12px;
        text-align: center;
      }

      .current-category {
        display: inline-block;
        padding: 6px 16px;
        background: linear-gradient(135deg, #6366f1, #f43f5e);
        border-radius: 20px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: white;
        margin-bottom: 10px;
      }

      .current-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.5rem;
        font-weight: 600;
        color: white;
        margin: 0 0 8px;
      }

      .current-counter {
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
      }

      /* Social Links */
      .gallery-social-links {
        display: flex;
        gap: 16px;
        justify-content: center;
        margin-top: 50px;
        flex-wrap: wrap;
      }

      .social-link-card {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 16px 28px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 50px;
        color: white;
        text-decoration: none;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .social-link-card:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-4px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      }

      .social-link-card i {
        font-size: 26px;
        transition: transform 0.3s ease;
      }

      .social-link-card:hover i {
        transform: scale(1.15);
      }

      .social-link-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .social-link-title {
        font-weight: 600;
        font-size: 15px;
      }

      .social-link-desc {
        font-size: 12px;
        opacity: 0.7;
      }

      /* Lightbox */
      .carousel-lightbox {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s ease;
        backdrop-filter: blur(20px);
      }

      .carousel-lightbox.active {
        opacity: 1;
        visibility: visible;
      }

      .carousel-lightbox img {
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 16px;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
        transform: scale(0.9);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .carousel-lightbox.active img {
        transform: scale(1);
      }

      .lightbox-close-btn {
        position: absolute;
        top: 30px;
        right: 30px;
        width: 56px;
        height: 56px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        color: white;
        font-size: 28px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .lightbox-close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: rotate(90deg);
      }

      .lightbox-nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        color: white;
        font-size: 28px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .lightbox-nav-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .lightbox-prev { left: 30px; }
      .lightbox-next { right: 30px; }

      /* Responsive */
      @media (max-width: 1024px) {
        .carousel-3d-container {
          height: 380px;
        }
        .carousel-3d-card {
          width: 230px;
          height: 320px;
          margin-left: -115px;
          margin-top: -160px;
        }
      }

      @media (max-width: 768px) {
        .carousel-3d-container {
          height: 340px;
        }
        .carousel-3d-card {
          width: 210px;
          height: 290px;
          margin-left: -105px;
          margin-top: -145px;
        }
        .carousel-3d-nav {
          width: 48px;
          height: 48px;
          font-size: 20px;
        }
        .carousel-3d-prev { left: 10px; }
        .carousel-3d-next { right: 10px; }
        .gallery-social-links {
          gap: 12px;
        }
        .social-link-card {
          padding: 12px 20px;
        }
        .social-link-desc {
          display: none;
        }
      }

      @media (max-width: 480px) {
        .carousel-3d-container {
          height: 320px;
        }
        .carousel-3d-card {
          width: 190px;
          height: 260px;
          margin-left: -95px;
          margin-top: -130px;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  let currentIndex = 0;
  let galleryCreated = false;
  let autoPlayInterval = null;
  let lightboxOpen = false;
  let appleMusicLoaded = false;

  function formatArtwork(url, size = 600) {
    if (!url) return url;
    return url.replace(/\\d+x\\d+bb/g, `${size}x${size}bb`);
  }

  function fetchAppleMusicAlbums() {
    if (appleMusicLoaded) return Promise.resolve([]);

    const endpoint = `https://itunes.apple.com/lookup?id=${APPLE_MUSIC_ARTIST_ID}&entity=album&limit=12`;

    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.results?.length) return [];
        const albums = data.results
          .filter((item) => item.wrapperType === 'collection')
          .map((item) => ({
            src: formatArtwork(item.artworkUrl100, 600),
            title: item.collectionName,
            category: 'Album',
            gradient: 'linear-gradient(135deg, #0f172a 0%, #1f2937 100%)',
            link: item.collectionViewUrl || APPLE_MUSIC_ARTIST_URL,
            linkLabel: 'Listen'
          }));
        return albums;
      })
      .catch(() => {
        // JSONP fallback if CORS blocks
        return new Promise((resolve) => {
          const callbackName = `itunesCallback_${Date.now()}`;
          window[callbackName] = (payload) => {
            try {
              const albums = (payload?.results || [])
                .filter((item) => item.wrapperType === 'collection')
                .map((item) => ({
                  src: formatArtwork(item.artworkUrl100, 600),
                  title: item.collectionName,
                  category: 'Album',
                  gradient: 'linear-gradient(135deg, #0f172a 0%, #1f2937 100%)',
                  link: item.collectionViewUrl || APPLE_MUSIC_ARTIST_URL,
                  linkLabel: 'Listen'
                }));
              resolve(albums);
            } catch (err) {
              resolve([]);
            } finally {
              delete window[callbackName];
            }
          };

          const script = document.createElement('script');
          script.src = `${endpoint}&callback=${callbackName}`;
          script.onload = () => {
            script.remove();
          };
          script.onerror = () => {
            delete window[callbackName];
            script.remove();
            resolve([]);
          };
          document.body.appendChild(script);
        });
      })
      .finally(() => {
        appleMusicLoaded = true;
      });
  }

  function findArtSection() {
    return document.getElementById('art')
      || document.querySelector('#Art')
      || document.querySelector('section[id*="art" i]')
      || Array.from(document.querySelectorAll('section')).find(s => {
        const h = s.querySelector('h1, h2, .section-title');
        return h && /art|portfolio\s*artistique|kunst|arte/i.test(h.textContent || '');
      });
  }

  function createGallery() {
    const artSection = findArtSection();
    if (!artSection) {
      if (!window._artSectionNotFoundLogged) {
        window._artSectionNotFoundLogged = true;
        console.log('Art section not found (looked for #art, #Art, section[id*="art"], or section with Art heading)');
      }
      return;
    }

    if (artSection.querySelector('.art-carousel-wrapper')) {
      console.log('Gallery already exists');
      return;
    }

    if (galleryCreated) return;
    galleryCreated = true;

    console.log('Creating 3D Art Gallery with', GALLERY_IMAGES.length, 'images');

    const wrapper = document.createElement('div');
    wrapper.className = 'art-carousel-wrapper';

    // Generate cards HTML
    const cardsHtml = GALLERY_IMAGES.map((img, idx) => `
      <div class="carousel-3d-card ${idx === 0 ? 'active' : ''}" data-index="${idx}" ${img.link ? `data-link="${img.link}" data-link-label="${img.linkLabel || 'Open'}"` : ''}>
        <div class="card-image-wrapper" style="background: ${img.gradient}">
          <img src="${img.src}" alt="${img.title}" loading="lazy" style="object-position:${img.focus || 'center'}" onerror="this.style.display='none'">
          <div class="card-image-overlay"></div>
        </div>
        <div class="card-content">
          <span class="card-category">${img.category}</span>
          <h3 class="card-title">${img.title}</h3>
          ${img.link ? `<a class="card-link" href="${img.link}" target="_blank" rel="noopener">${img.linkLabel || 'Open'}</a>` : ''}
        </div>
      </div>
    `).join('');

    // Generate dots HTML (show max 10 dots for usability)
    const maxDots = Math.min(10, GALLERY_IMAGES.length);
    const dotsHtml = Array.from({ length: maxDots }, (_, i) =>
      `<button class="carousel-3d-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');

    wrapper.innerHTML = `
      <div class="art-carousel-header">
        <h2>Art & Creative</h2>
        <p>Acting, Modeling, Music & Beyond</p>
      </div>

      <div class="carousel-3d-container">
        <div class="carousel-3d-track">
          ${cardsHtml}
        </div>

        <button class="carousel-3d-nav carousel-3d-prev" aria-label="Previous">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="carousel-3d-nav carousel-3d-next" aria-label="Next">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <div class="carousel-3d-dots">${dotsHtml}</div>

      <div class="carousel-current-info">
        <span class="current-category">${GALLERY_IMAGES[0].category}</span>
        <h3 class="current-title">${GALLERY_IMAGES[0].title}</h3>
        <p class="current-counter">1 / ${GALLERY_IMAGES.length}</p>
      </div>

      <div class="music-embed-panel">
        <h3>Listen to “Blue Skies”</h3>
        <iframe
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          frameborder="0"
          height="175"
          style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src="https://embed.music.apple.com/us/song/blue-skies/1728708127"
        ></iframe>
      </div>

      <div class="instagram-embed-panel">
        <h3>Latest on Instagram</h3>
        <div style="max-width:540px; margin:0 auto;">
          <blockquote
            class="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/p/DS9HcpiDCQF/"
            data-instgrm-version="14">
          </blockquote>
        </div>
      </div>

      <div class="gallery-social-links">
        ${SOCIAL_LINKS.map(link => `
          <a href="${link.url}" target="_blank" rel="noopener" class="social-link-card">
            <i class="${link.icon}" style="color: ${link.color}"></i>
            <div class="social-link-text">
              <span class="social-link-title">${link.title}</span>
              <span class="social-link-desc">${link.description}</span>
            </div>
          </a>
        `).join('')}
      </div>

      <div class="carousel-lightbox">
        <button class="lightbox-close-btn" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
        <button class="lightbox-nav-btn lightbox-prev" aria-label="Previous">
          <i class="fas fa-chevron-left"></i>
        </button>
        <img src="" alt="Lightbox Image">
        <button class="lightbox-nav-btn lightbox-next" aria-label="Next">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    `;

    // Clear existing content and add gallery
    const existingContent = artSection.querySelector('div');
    if (existingContent) {
      existingContent.remove();
    }
    artSection.appendChild(wrapper);

    // Initialize functionality
    initCarouselLogic(wrapper);
    ensureInstagramEmbedScript()
      .then(() => {
        if (window.instgrm?.Embeds?.process) {
          window.instgrm.Embeds.process();
        }
      })
      .catch(() => {});

    console.log('3D Art Gallery created successfully');
  }

  function appendAppleMusicAlbums() {
    if (appleMusicLoaded) return;

    fetchAppleMusicAlbums().then((albums) => {
      if (!albums.length) return;

      const existingIds = new Set(GALLERY_IMAGES.map((item) => `${item.title}-${item.src}`));
      albums.forEach((album) => {
        const key = `${album.title}-${album.src}`;
        if (!existingIds.has(key)) {
          GALLERY_IMAGES.push(album);
        }
      });

      if (galleryCreated) {
        galleryCreated = false;
        createGallery();
      }
    });
  }

  function ensureInstagramEmbedScript() {
    if (document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  function initCarouselLogic(wrapper) {
    const track = wrapper.querySelector('.carousel-3d-track');
    const cards = wrapper.querySelectorAll('.carousel-3d-card');
    const dots = wrapper.querySelectorAll('.carousel-3d-dot');
    const prevBtn = wrapper.querySelector('.carousel-3d-prev');
    const nextBtn = wrapper.querySelector('.carousel-3d-next');
    const currentCategory = wrapper.querySelector('.current-category');
    const currentTitle = wrapper.querySelector('.current-title');
    const currentCounter = wrapper.querySelector('.current-counter');
    const lightbox = wrapper.querySelector('.carousel-lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close-btn');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    const totalCards = GALLERY_IMAGES.length;
    const visibleCards = 5; // Number of cards visible at once
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltRaf = null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function positionCards() {
      cards.forEach((card, i) => {
        // Calculate position relative to current index
        let offset = i - currentIndex;

        // Handle wrapping for infinite feel
        if (offset < -Math.floor(visibleCards / 2)) {
          offset += totalCards;
        } else if (offset > Math.floor(visibleCards / 2)) {
          offset -= totalCards;
        }

        const absOffset = Math.abs(offset);

        // Only show cards within visible range
        if (absOffset > Math.floor(visibleCards / 2)) {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          card.style.transform = `translateX(${offset * 420}px) translateZ(-520px) scale(0.45)`;
          card.style.filter = 'blur(6px)';
        } else {
          // Calculate 3D transforms
          const translateX = offset * 230; // Horizontal spacing
          const translateZ = -absOffset * 140; // Depth
          const rotateY = offset * -18; // Rotation
          const scale = 1 - absOffset * 0.1; // Scale
          const opacity = Math.max(0, 1 - absOffset * 0.22);
          const blur = Math.min(absOffset * 1.4, 5);

          const baseTransform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
          card.dataset.baseTransform = baseTransform;
          card.style.transform = baseTransform;
          card.style.opacity = opacity;
          card.style.filter = absOffset === 0 ? 'none' : `blur(${blur}px)`;
          card.style.zIndex = visibleCards - absOffset;
          card.style.pointerEvents = 'auto';

          // Update active class
          card.classList.toggle('active', offset === 0);
        }
      });

      // Update info
      const current = GALLERY_IMAGES[currentIndex];
      currentCategory.textContent = current.category;
      currentTitle.textContent = current.title;
      currentCounter.textContent = `${currentIndex + 1} / ${totalCards}`;

      // Update dots
      const dotIndex = Math.floor(currentIndex * dots.length / totalCards);
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === dotIndex);
      });
    }

    function updateTilt() {
      tiltX += (targetTiltX - tiltX) * 0.12;
      tiltY += (targetTiltY - tiltY) * 0.12;

      const activeCard = wrapper.querySelector('.carousel-3d-card.active');
      if (activeCard) {
        const base = activeCard.dataset.baseTransform || '';
        activeCard.style.transform = `${base} rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      }

      tiltRaf = requestAnimationFrame(updateTilt);
    }

    function goToSlide(index) {
      currentIndex = ((index % totalCards) + totalCards) % totalCards;
      positionCards();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    function openLightbox() {
      lightboxImg.src = GALLERY_IMAGES[currentIndex].src;
      lightbox.classList.add('active');
      lightboxOpen = true;
      stopAutoPlay();
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightboxOpen = false;
      startAutoPlay();
      document.body.style.overflow = '';
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const targetIndex = Math.floor(i * totalCards / dots.length);
        goToSlide(targetIndex);
        stopAutoPlay();
        startAutoPlay();
      });
    });

    // Card clicks
    cards.forEach((card, i) => {
      const link = card.dataset.link;
      const linkEl = card.querySelector('.card-link');
      if (linkEl) {
        linkEl.addEventListener('click', (event) => {
          event.stopPropagation();
        });
      }

      card.addEventListener('click', () => {
        if (i === currentIndex) {
          if (link) {
            window.open(link, '_blank', 'noopener');
          } else {
            openLightbox();
          }
        } else {
          goToSlide(i);
          stopAutoPlay();
          startAutoPlay();
        }
      });
    });

    // Lightbox events
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      lightboxImg.src = GALLERY_IMAGES[currentIndex].src;
    });

    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      lightboxImg.src = GALLERY_IMAGES[currentIndex].src;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
          prevSlide();
          lightboxImg.src = GALLERY_IMAGES[currentIndex].src;
        }
        if (e.key === 'ArrowRight') {
          nextSlide();
          lightboxImg.src = GALLERY_IMAGES[currentIndex].src;
        }
      }
    });

    // Touch support
    let touchStartX = 0;
    const container = wrapper.querySelector('.carousel-3d-container');

    if (!prefersReducedMotion.matches) {
      container.addEventListener('pointermove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetTiltY = Math.max(-6, Math.min(6, x * 12));
        targetTiltX = Math.max(-5, Math.min(5, -y * 10));
      });

      container.addEventListener('pointerleave', () => {
        targetTiltX = 0;
        targetTiltY = 0;
      });

      tiltRaf = requestAnimationFrame(updateTilt);
    }

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoPlay();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      startAutoPlay();
    }, { passive: true });

    // Mouse wheel support
    container.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 0) nextSlide();
        else prevSlide();
        stopAutoPlay();
        startAutoPlay();
      }
    }, { passive: false });

    // Pause on hover
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    // Initial position
    positionCards();
    startAutoPlay();

    console.log('3D Carousel logic initialized');
  }

  function init() {
    injectGalleryStyles();
    appendAppleMusicAlbums();

    // Try multiple times to create gallery
    const delays = [100, 500, 1000, 2000, 3000, 5000];
    delays.forEach(delay => {
      setTimeout(() => {
        if (!galleryCreated) {
          createGallery();
        }
      }, delay);
    });

    // Watch for art section
    const observer = new MutationObserver(() => {
      if (!galleryCreated) {
        createGallery();
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

  window.createArtGallery = createGallery;
})();
