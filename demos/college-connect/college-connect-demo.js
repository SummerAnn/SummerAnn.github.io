(function() {
  'use strict';

  const views = {
    events: {
      title: 'Tonight on Campus',
      subtitle: 'Join events that are already buzzing nearby.',
      list: [
        'Design + Donuts at the Innovation Lab',
        'Midnight coding marathon in the CS lounge',
        'Basketball watch party at Union Hall'
      ],
      highlight: 'Design Sprint: 6:30 PM'
    },
    study: {
      title: 'Find Your Study Squad',
      subtitle: 'Auto-matched groups based on your classes and pace.',
      list: [
        'Data Structures sprint group (3 seats left)',
        'Organic Chem review pod',
        'Intro Econ problem set jam'
      ],
      highlight: 'CS 225 Review: 7:00 PM'
    },
    clubs: {
      title: 'Student Orgs for You',
      subtitle: 'Discover clubs that match your interests.',
      list: [
        'Product Builders Collective meeting',
        'Women in AI social night',
        'Outdoor Adventures hike signup'
      ],
      highlight: 'Product Builders: 5:30 PM'
    }
  };

  function updateView(key) {
    const view = views[key];
    if (!view) return;

    document.getElementById('live-title').textContent = view.title;
    document.getElementById('live-subtitle').textContent = view.subtitle;
    document.getElementById('live-highlight').textContent = view.highlight;

    const list = document.getElementById('live-list');
    list.innerHTML = view.list.map(item => `<li>${item}</li>`).join('');
  }

  function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(btn => btn.classList.remove('active'));
        tab.classList.add('active');
        updateView(tab.dataset.view);
      });
    });
  }

  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('section, .hero-dashboard').forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%'
          }
        }
      );
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initScrollAnimations();
  });
})();
