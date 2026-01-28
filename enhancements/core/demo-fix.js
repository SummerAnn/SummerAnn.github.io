/**
 * Demo Fix v2.0
 * Ensures demo links navigate correctly
 * Demos: college-connect, creatorrag, intro-cinematic, my-kitchen, wanderlust, yammoing
 */

(function() {
  'use strict';

  const DEMO_PAGES = [
    { slug: 'college-connect', name: 'College Connect' },
    { slug: 'creatorrag', name: 'CreatorRAG' },
    { slug: 'intro-cinematic', name: 'Intro Cinematic' },
    { slug: 'my-kitchen', name: 'My Kitchen' },
    { slug: 'wanderlust', name: 'Wanderlust' },
    { slug: 'yammoing', name: 'Yammoing' }
  ];

  function fixDemoLink(link) {
    const href = link.getAttribute('href');
    if (!href) return;

    // Check if it's a demo link
    const isDemo = href.includes('/demos/') || href.includes('demo');
    if (!isDemo) return;

    // Remove target="_blank" - open in same window
    link.removeAttribute('target');

    // Ensure the link is properly formatted
    let fixedHref = href;

    // If it's a relative path without leading slash, fix it
    if (href.startsWith('demos/')) {
      fixedHref = '/' + href;
      link.setAttribute('href', fixedHref);
    }

    // Add click handler for guaranteed navigation
    if (!link.hasAttribute('data-demo-fixed')) {
      link.setAttribute('data-demo-fixed', 'true');

      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const targetHref = this.getAttribute('href');
        console.log('✅ Demo link clicked:', targetHref);

        // Extract demo slug and navigate to index.html explicitly
        const demoSlug = targetHref.match(/\/demos\/([^\/]+)/)?.[1];
        if (demoSlug) {
          // Try index.html explicitly (Python server needs this)
          const demoPath = `/demos/${demoSlug}/index.html`;
          console.log('🔗 Navigating to demo:', demoPath);
          // Force navigation immediately
          window.location.href = demoPath;
        } else if (targetHref.includes('/demos/')) {
          // If it already has a path, try adding index.html if it ends with /
          let finalPath = targetHref;
          if (targetHref.endsWith('/')) {
            finalPath = targetHref + 'index.html';
          } else if (!targetHref.endsWith('.html')) {
            finalPath = targetHref + '/index.html';
          }
          console.log('🔗 Navigating directly to:', finalPath);
          window.location.href = finalPath;
        });
    }

    console.log('Fixed demo link:', fixedHref);
  }

  function findAndFixDemoLinks() {
    // Find all potential demo links
    const selectors = [
      'a[href*="/demos/"]',
      'a[href*="demo"]',
      '.dropdown-menu a',
      'nav a',
      '#enhanced-nav a',
      '[class*="nav"] a',
      '[class*="menu"] a'
    ];

    const allLinks = new Set();
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.includes('demo') || href.includes('/demos/')) {
          allLinks.add(link);
        }
      });
    });

    allLinks.forEach(fixDemoLink);
    console.log(`Fixed ${allLinks.size} demo links`);
  }

  function setupDemoPage() {
    // Check if we're on a demo page
    const path = window.location.pathname;
    const isDemo = path.includes('/demos/');

    if (isDemo) {
      console.log('On demo page:', path);

      // Ensure page is visible
      document.body.style.display = 'block';
      document.body.style.visibility = 'visible';
      document.body.style.opacity = '1';

      // Make sure content is visible
      const containers = document.querySelectorAll('main, .demo-content, [class*="demo"], #root, #root > div');
      containers.forEach(el => {
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      });

      // Add back button if not present
      if (!document.querySelector('.demo-back-btn')) {
        const backBtn = document.createElement('a');
        backBtn.className = 'demo-back-btn';
        backBtn.href = '/';
        backBtn.textContent = '← Back to Portfolio';
        backBtn.style.cssText = `
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 10000;
          padding: 10px 20px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-family: system-ui, sans-serif;
          font-size: 14px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        `;
        backBtn.addEventListener('mouseenter', () => {
          backBtn.style.background = 'rgba(0, 0, 0, 0.9)';
          backBtn.style.transform = 'translateX(5px)';
        });
        backBtn.addEventListener('mouseleave', () => {
          backBtn.style.background = 'rgba(0, 0, 0, 0.7)';
          backBtn.style.transform = 'none';
        });
        document.body.appendChild(backBtn);
      }
    }
  }

  function init() {
    findAndFixDemoLinks();
    setupDemoPage();

    // Re-run after delays for React content
    setTimeout(findAndFixDemoLinks, 500);
    setTimeout(findAndFixDemoLinks, 1500);
    setTimeout(findAndFixDemoLinks, 3000);

    // Watch for new links
    const observer = new MutationObserver((mutations) => {
      let hasNewLinks = false;
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.tagName === 'A' || node.querySelector?.('a')) {
              hasNewLinks = true;
            }
          }
        });
      });
      if (hasNewLinks) {
        setTimeout(findAndFixDemoLinks, 50);
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
})();
