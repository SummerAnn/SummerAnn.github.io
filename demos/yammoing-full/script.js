// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// ========================================
// Navbar Background on Scroll
// ========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// ========================================
// Luxury Scroll Reveals (Intersection Observer)
// ========================================
const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
        if (e.isIntersecting) {
            e.target.classList.add("is-in");
        }
    }
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Also observe cards and sections with stagger
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("is-in");
            }, index * 50); // Stagger delay
        }
    });
}, { threshold: 0.1 });

// Add reveal class to cards
document.querySelectorAll(`
    .scan-category,
    .feature-card,
    .step,
    .score-range,
    .domain-card,
    .source-card,
    .privacy-item
`).forEach(el => {
    el.classList.add("reveal");
    cardObserver.observe(el);
});

// ========================================
// Animated Score Counter
// ========================================
const scoreNumber = document.querySelector('.score-number');

if (scoreNumber) {
    const animateScore = () => {
        const target = 87;
        let current = 0;
        const increment = target / 50; // 50 frames
        const duration = 2000; // 2 seconds
        const interval = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            scoreNumber.textContent = Math.floor(current);
        }, interval);
    };

    // Observe score display
    const scoreObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateScore();
                scoreObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const scoreDisplay = document.querySelector('.score-display');
    if (scoreDisplay) {
        scoreObserver.observe(scoreDisplay);
    }
}

// ========================================
// Stats Counter Animation
// ========================================
const animateStatCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const interval = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format the number
        if (target >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else if (target >= 1000) {
            element.textContent = Math.floor(current / 1000) + 'K+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, interval);
};

// Observe stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            const targets = [2000000, 1000, 9]; // 2M+, 1000+, 9

            statNumbers.forEach((stat, index) => {
                animateStatCounter(stat, targets[index]);
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ========================================
// Score Ring Animation (SVG stroke-dash)
// ========================================
const animateScoreRing = () => {
    const progressCircle = document.querySelector('.score-circle .progress-circle');
    if (!progressCircle) return;

    const radius = 82;
    const circumference = 2 * Math.PI * radius;
    const targetProgress = 87; // 87%
    const targetOffset = circumference - (targetProgress / 100) * circumference;

    // Set stroke-dasharray
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    // Animate to target
    requestAnimationFrame(() => {
        progressCircle.style.transition = 'stroke-dashoffset 2s ease-out';
        progressCircle.style.strokeDashoffset = targetOffset;
    });
};

// Trigger when score display is visible
const scoreRingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateScoreRing();
            scoreRingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const scoreDisplay = document.querySelector('.score-display');
if (scoreDisplay) {
    scoreRingObserver.observe(scoreDisplay);
}

// ========================================
// Dynamic Year in Footer
// ========================================
const updateFooterYear = () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} Yammoing. All rights reserved.`;
    }
};

updateFooterYear();

// ========================================
// Feature Card Hover Effects
// ========================================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-4px)';
    });
});

// ========================================
// Mobile Menu Improvements
// ========================================
if (window.innerWidth <= 768) {
    // Add mobile-specific styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 24px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            gap: 16px;
        }

        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Lazy Loading for Images (if you add them later)
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// Console Welcome Message
// ========================================
console.log('%cYammoing', 'color: #00B894; font-size: 24px; font-weight: bold;');
console.log('%cYour Personal Health Detective', 'color: #636E72; font-size: 14px;');
console.log('%cInterested in joining our team? Email us at hello@yammoing.com', 'color: #2D3436; font-size: 12px;');

// ========================================
// Track Download Button Clicks (Analytics Placeholder)
// ========================================
const downloadButtons = document.querySelectorAll('.btn-download, .btn-primary');
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Placeholder for analytics tracking
        console.log('Download button clicked');

        // You can add Google Analytics, Mixpanel, or other tracking here
        // Example: gtag('event', 'download_button_click', { location: button.textContent });
    });
});

// ========================================
// Preload Critical Resources
// ========================================
const preloadFont = () => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    // Add font URL when you have custom fonts
};

// ========================================
// Performance Monitoring
// ========================================
window.addEventListener('load', () => {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ========================================
// Interactive Product Comparison Tool
// ========================================
const comparisonData = {
    'cereal-healthy': {
        name: 'Whole Grain Oats',
        brand: "Nature's Best",
        emoji: '🥣',
        score: 82,
        label: 'Good Choice',
        labelClass: '',
        domains: {
            nutrient: 85,
            processing: 75,
            additives: 90,
            sugar: 70
        },
        highlights: [
            { text: 'High Fiber', class: 'good' },
            { text: 'Whole Grains', class: 'good' },
            { text: 'Added Sugar', class: 'moderate' }
        ]
    },
    'cereal-sugary': {
        name: 'Frosted Flakes',
        brand: "Kellogg's",
        emoji: '🥣',
        score: 34,
        label: 'Poor Choice',
        labelClass: 'poor',
        domains: {
            nutrient: 25,
            processing: 30,
            additives: 55,
            sugar: 20
        },
        highlights: [
            { text: 'High Sugar', class: 'bad' },
            { text: 'Ultra-Processed', class: 'bad' },
            { text: 'Fortified', class: 'moderate' }
        ]
    },
    'yogurt-greek': {
        name: 'Greek Yogurt',
        brand: 'Fage',
        emoji: '🥛',
        score: 91,
        label: 'Excellent Choice',
        labelClass: '',
        domains: {
            nutrient: 95,
            processing: 85,
            additives: 98,
            sugar: 80
        },
        highlights: [
            { text: 'High Protein', class: 'good' },
            { text: 'Probiotics', class: 'good' },
            { text: 'Low Sugar', class: 'good' }
        ]
    },
    'drink-soda': {
        name: 'Cola Soda',
        brand: 'Generic',
        emoji: '🥤',
        score: 12,
        label: 'Very Poor',
        labelClass: 'poor',
        domains: {
            nutrient: 5,
            processing: 15,
            additives: 40,
            sugar: 5
        },
        highlights: [
            { text: 'Very High Sugar', class: 'bad' },
            { text: 'No Nutrients', class: 'bad' },
            { text: 'Artificial Colors', class: 'bad' }
        ]
    }
};

function initComparisonTool() {
    const compareSection = document.querySelector('.product-compare');
    if (!compareSection) return;

    const buttonsA = compareSection.querySelectorAll('[data-compare-a]');
    const buttonsB = compareSection.querySelectorAll('[data-compare-b]');

    let selectedA = 'cereal-healthy';
    let selectedB = 'cereal-sugary';

    // Button click handlers for Product A
    buttonsA.forEach(btn => {
        btn.addEventListener('click', () => {
            buttonsA.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedA = btn.dataset.compareA;
            updateComparison('a', selectedA);
            updateWinner(selectedA, selectedB);
        });
    });

    // Button click handlers for Product B
    buttonsB.forEach(btn => {
        btn.addEventListener('click', () => {
            buttonsB.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedB = btn.dataset.compareB;
            updateComparison('b', selectedB);
            updateWinner(selectedA, selectedB);
        });
    });

    // Initialize score rings
    initCompareScoreRings();
}

function updateComparison(side, productKey) {
    const data = comparisonData[productKey];
    if (!data) return;

    // Update product header
    document.getElementById(`compare-name-${side}`).textContent = data.name;
    document.getElementById(`compare-brand-${side}`).textContent = data.brand;

    // Update emoji
    const emojiEl = document.querySelector(`#compare-result-${side} .compare-emoji`);
    if (emojiEl) emojiEl.textContent = data.emoji;

    // Update score
    const scoreEl = document.getElementById(`compare-score-${side}`);
    animateNumber(scoreEl, parseInt(scoreEl.textContent), data.score, 500);

    // Update score ring
    updateScoreRing(side, data.score);

    // Update label
    const labelEl = document.getElementById(`compare-label-${side}`);
    labelEl.textContent = data.label;
    labelEl.className = `compare-label ${data.labelClass}`;

    // Update domain bars with animation
    const domains = ['nutrient', 'processing', 'additives', 'sugar'];
    domains.forEach(domain => {
        const bar = document.getElementById(`${domain}-${side}`);
        if (bar) {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = `${data.domains[domain]}%`;
                // Update bar color class
                bar.className = 'compare-fill';
                if (data.domains[domain] < 40) {
                    bar.classList.add('poor');
                } else if (data.domains[domain] < 60) {
                    bar.classList.add('moderate');
                }
            }, 50);
        }
    });

    // Update highlights
    const highlightsEl = document.getElementById(`highlights-${side}`);
    if (highlightsEl) {
        highlightsEl.innerHTML = data.highlights.map(h =>
            `<span class="highlight-tag ${h.class}">${h.text}</span>`
        ).join('');
    }
}

function updateScoreRing(side, score) {
    const ring = document.getElementById(`compare-progress-${side}`);
    if (!ring) return;

    const circumference = 2 * Math.PI * 42; // radius = 42
    const offset = circumference - (score / 100) * circumference;

    // Update color based on score
    ring.className = 'compare-progress-ring';
    if (score >= 70) {
        ring.classList.add('good');
    } else if (score >= 40) {
        ring.classList.add('moderate');
    } else {
        ring.classList.add('poor');
    }

    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;
}

function initCompareScoreRings() {
    ['a', 'b'].forEach(side => {
        const ring = document.getElementById(`compare-progress-${side}`);
        if (!ring) return;

        const circumference = 2 * Math.PI * 42;
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = circumference;
    });

    // Animate on scroll into view
    const compareSection = document.querySelector('.product-compare');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    updateScoreRing('a', 82);
                    updateScoreRing('b', 34);
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (compareSection) {
        observer.observe(compareSection);
    }
}

function updateWinner(keyA, keyB) {
    const dataA = comparisonData[keyA];
    const dataB = comparisonData[keyB];

    const winnerNameEl = document.getElementById('winner-name');
    const winnerReasonEl = document.getElementById('winner-reason');

    if (dataA.score > dataB.score) {
        winnerNameEl.textContent = dataA.name;
        const diff = dataA.score - dataB.score;
        winnerReasonEl.textContent = `Scores ${diff} points higher with better nutrient density, less processing, and better ingredients overall.`;
    } else if (dataB.score > dataA.score) {
        winnerNameEl.textContent = dataB.name;
        const diff = dataB.score - dataA.score;
        winnerReasonEl.textContent = `Scores ${diff} points higher with better nutrient density, less processing, and better ingredients overall.`;
    } else {
        winnerNameEl.textContent = "It's a tie!";
        winnerReasonEl.textContent = 'Both products have the same health score.';
    }
}

function animateNumber(element, from, to, duration) {
    const start = performance.now();
    const update = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(from + (to - from) * easeOutCubic(progress));
        element.textContent = current;
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };
    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Initialize comparison tool when DOM is ready
document.addEventListener('DOMContentLoaded', initComparisonTool);

// ========================================
// Enhanced Scroll Reveal Animations
// ========================================
function initEnhancedScrollReveals() {
    // Observe elements with new animation classes
    const revealClasses = [
        'scale-reveal', 'slide-left', 'slide-right',
        'blur-reveal', 'rotate-reveal', 'stagger-reveal'
    ];

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    revealClasses.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(el => {
            revealObserver.observe(el);
        });
    });

    // Add float animations to specific elements
    document.querySelectorAll('.glass-card').forEach((card, i) => {
        card.classList.add(i % 2 === 0 ? 'float-animation' : 'float-animation-delayed');
    });
}

document.addEventListener('DOMContentLoaded', initEnhancedScrollReveals);

// ========================================
// Scroll Indicator
// ========================================
function initScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
        <div class="scroll-indicator-mouse">
            <div class="scroll-indicator-wheel"></div>
        </div>
    `;
    document.body.appendChild(indicator);

    // Hide after scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            indicator.classList.add('hidden');
        } else {
            indicator.classList.remove('hidden');
        }
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', initScrollIndicator);

// ========================================
// Interactive Pain Points Flip Cards
// ========================================
function initPainPointsFlipCards() {
    const painCards = document.querySelectorAll('.pain-card:not(.cta-card)');

    painCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        // Also flip on Enter key for accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });

    // Observe for reveal animation
    const painSection = document.querySelector('.pain-points-interactive');
    if (painSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(painSection);
    }

    // Auto-flip demo: flip first card after 3 seconds to show users they can interact
    setTimeout(() => {
        const firstCard = document.querySelector('.pain-card:not(.cta-card)');
        if (firstCard && !firstCard.classList.contains('flipped')) {
            firstCard.classList.add('flipped');
            // Flip back after 2 seconds
            setTimeout(() => {
                firstCard.classList.remove('flipped');
            }, 2500);
        }
    }, 3000);
}

document.addEventListener('DOMContentLoaded', initPainPointsFlipCards);
