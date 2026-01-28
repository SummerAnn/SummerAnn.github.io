(function() {
  'use strict';

  const plans = {
    quick: {
      title: 'Quick Weeknight Rotation',
      subtitle: 'Fast recipes that reuse pantry staples and fresh produce.',
      menu: ['Teriyaki Tofu Bowls', 'Garlic Shrimp Pasta', 'Sheet Pan Veggie Tacos'],
      list: ['Baby spinach', 'Rice noodles', 'Lime + ginger'],
      time: '22 min avg',
      budget: '$58 total'
    },
    balanced: {
      title: 'Balanced Prep Plan',
      subtitle: 'Protein-forward meals with simple batch prep for the week.',
      menu: ['Herb Chicken + Farro', 'Roasted Veggie Grain Bowls', 'Miso Salmon Salad'],
      list: ['Chicken thighs', 'Farro', 'Miso paste'],
      time: '35 min avg',
      budget: '$71 total'
    },
    adventure: {
      title: 'Weekend Adventure Menu',
      subtitle: 'Longer cook time, bold flavors, and new techniques to try.',
      menu: ['Citrus Braised Short Rib', 'Homemade Gnocchi', 'Shakshuka Brunch'],
      list: ['Short rib', 'San Marzano tomatoes', 'Fresh basil'],
      time: '55 min avg',
      budget: '$92 total'
    }
  };

  function updatePlan(key) {
    const plan = plans[key];
    if (!plan) return;

    document.getElementById('plan-title').textContent = plan.title;
    document.getElementById('plan-subtitle').textContent = plan.subtitle;
    document.getElementById('plan-time').textContent = plan.time;
    document.getElementById('plan-budget').textContent = plan.budget;

    const menu = document.getElementById('plan-menu');
    const list = document.getElementById('plan-list');

    menu.innerHTML = plan.menu.map(item => `<li>${item}</li>`).join('');
    list.innerHTML = plan.list.map(item => `<li>${item}</li>`).join('');
  }

  function initPlanButtons() {
    const buttons = document.querySelectorAll('.mode-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        updatePlan(btn.dataset.plan);
      });
    });
  }

  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('section, .hero-card').forEach((section) => {
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
    initPlanButtons();
    initScrollAnimations();
  });
})();
