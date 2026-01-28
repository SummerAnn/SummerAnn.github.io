(function() {
  'use strict';

  const modes = {
    tutorial: {
      title: 'How to Build an On-Device AI Workflow',
      text: 'CreatorRAG surfaces sources on model quantization, privacy tradeoffs, and edge deployment to craft a step-by-step tutorial with inline citations.',
      list: [
        'On-device AI reduces latency by 42% (Apple Dev Notes)',
        'Quantization keeps accuracy within 2% (Meta AI blog)',
        'Edge inference lowers cloud costs by 31% (AWS study)'
      ]
    },
    product: {
      title: 'Launch Messaging for a Creator Platform',
      text: 'Pulls competitive positioning, pricing data, and founder interviews to write a product launch narrative with evidence-backed claims.',
      list: [
        'Creators want unified analytics (Creator Economy Report)',
        'Audience growth accelerates with email (HubSpot study)',
        'Short-form video drives 2x retention (TikTok insights)'
      ]
    },
    story: {
      title: 'Founder Story: From Research to Studio',
      text: 'Combines interviews, papers, and market data to craft a narrative arc that feels personal, credible, and grounded in research.',
      list: [
        'Market demand grew 28% YoY (State of AI)',
        'User interviews reveal trust gaps (Internal research)',
        'Community launch increased activation by 19% (Case study)'
      ]
    }
  };

  function updateMode(key) {
    const mode = modes[key];
    if (!mode) return;

    document.getElementById('demo-title').textContent = mode.title;
    document.getElementById('demo-text').textContent = mode.text;

    const list = document.getElementById('demo-list');
    list.innerHTML = mode.list.map(item => `<li>${item}</li>`).join('');
  }

  function initButtons() {
    const buttons = document.querySelectorAll('.demo-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        updateMode(btn.dataset.mode);
      });
    });
  }

  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('section, .hero-terminal').forEach((section) => {
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
    initButtons();
    initScrollAnimations();
  });
})();
