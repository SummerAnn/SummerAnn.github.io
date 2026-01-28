// ========================================
// MOTION+ SYSTEM - Premium Scroll Choreography
// Inspired by Linear, Raycast, Vercel, Apple
// ========================================

(() => {
    'use strict';

    // Check for GSAP
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP not loaded. Falling back to CSS animations.');
        document.documentElement.classList.add('no-gsap');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
        document.documentElement.classList.add('reduce-motion');
        return;
    }

    // ========================================
    // 1. SMOOTH SCROLL (Lenis - buttery 120fps)
    // ========================================
    let lenis = null;

    function initSmoothScroll() {
        if (typeof Lenis === 'undefined') return;

        lenis = new Lenis({
            lerp: 0.12,           // Balanced smoothness (slightly faster)
            smoothWheel: true,
            wheelMultiplier: 1.2, // Faster wheel response
            touchMultiplier: 1.5, // Better touch response
            infinite: false,
            duration: 1.1,        // Consistent scroll duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
            smoothTouch: true,    // Enable smooth touch
        });

        // Connect to GSAP ticker for perfect sync
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Connect to ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
    }

    // ========================================
    // 2. TEXT SPLITTING (letter-by-letter reveals)
    // ========================================
    function splitText(element) {
        const text = element.textContent;
        const words = text.split(' ');

        element.innerHTML = words.map(word => {
            const letters = word.split('').map(letter =>
                `<span class="char">${letter}</span>`
            ).join('');
            return `<span class="word">${letters}</span>`;
        }).join('<span class="space"> </span>');

        return {
            chars: element.querySelectorAll('.char'),
            words: element.querySelectorAll('.word')
        };
    }

    // ========================================
    // 3. HERO CINEMATIC ENTRANCE
    // ========================================
    function initHeroEntrance() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Split the headline for letter animation
        const headline = hero.querySelector('.hero-title');
        let chars = null;

        if (headline && !headline.dataset.split) {
            const split = splitText(headline);
            chars = split.chars;
            headline.dataset.split = 'true';
        }

        // Master timeline - feels like a movie trailer
        const tl = gsap.timeline({
            defaults: { ease: "power4.out" },
            delay: 0.3
        });

        // Navbar slides down
        tl.from(".navbar", {
            y: -30,
            opacity: 0,
            duration: 1,
        });

        // Ensure hero content starts visible, then animate
        gsap.set(".hero .kicker, .hero-title, .hero .sub, .hero-subtitle, .hero-cta, .hero-stats", {
            opacity: 1,
            visibility: "visible"
        });

        // Kicker fades in
        tl.from(".hero .kicker", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            immediateRender: false,
        }, "-=0.5");

        // Headline - letters cascade in
        if (chars && chars.length > 0) {
            tl.from(chars, {
                y: 40,
                opacity: 0,
                rotateX: -90,
                stagger: 0.02,
                duration: 0.8,
                ease: "back.out(1.7)",
                immediateRender: false,
            }, "-=0.4");
        } else if (headline) {
            tl.from(headline, {
                y: 30,
                opacity: 0,
                duration: 1,
                immediateRender: false,
            }, "-=0.4");
        }

        // Subtitle
        tl.from(".hero .sub, .hero-subtitle", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            immediateRender: false,
        }, "-=0.5");

        // CTAs stagger in
        tl.from(".hero-cta .btn", {
            y: 20,
            opacity: 0,
            scale: 0.9,
            stagger: 0.1,
            duration: 0.6,
            immediateRender: false,
        }, "-=0.4");

        // Credibility chips cascade
        tl.from(".credibility-chip", {
            y: 15,
            opacity: 0,
            scale: 0.95,
            stagger: 0.08,
            duration: 0.5,
        }, "-=0.3");

        // Stats count up and reveal
        tl.from(".hero-stats", {
            y: 20,
            opacity: 0,
            duration: 0.6,
        }, "-=0.3");

        // Phone floats up with depth
        tl.from(".device, .phone-mockup", {
            y: 60,
            opacity: 0,
            scale: 0.9,
            rotateY: -10,
            duration: 1.2,
            ease: "power3.out",
        }, "-=0.8");

        // Glass cards pop in (but ensure they start visible)
        gsap.set(".glass-card", { opacity: 1, visibility: "visible" });
        tl.from(".glass-card", {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.7)",
            immediateRender: false,
        }, "-=0.5");
    }

    // ========================================
    // 4. SCROLL-LINKED PARALLAX LAYERS
    // ========================================
    function initParallax() {
        // Hero background parallax
        const heroBg = document.querySelector("#bg-canvas");
        if (heroBg) {
            gsap.to(heroBg, {
                y: 150,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                }
            });
        }

        // Phone parallax (slower than scroll)
        const device = document.querySelector(".device, .phone-mockup");
        if (device) {
            gsap.to(device, {
                y: -80,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.3,
                }
            });
        }

        // Glass cards float at different speeds
        document.querySelectorAll(".glass-card").forEach((card, i) => {
            gsap.to(card, {
                y: -30 - (i * 10),
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.2 + (i * 0.1),
                }
            });
        });
    }

    // ========================================
    // 5. SECTION REVEALS (Staggered + Blur)
    // ========================================
    function initSectionReveals() {
        // Each section with data-reveal gets cinematic treatment
        document.querySelectorAll("[data-reveal]").forEach(section => {
            const items = section.querySelectorAll(".fx-reveal");
            if (items.length === 0) return;

            // Set initial state
            gsap.set(items, {
                y: 40,
                opacity: 0,
                filter: "blur(10px)",
            });

            // Animate with stagger
            ScrollTrigger.create({
                trigger: section,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to(items, {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                    });
                }
            });
        });

        // Cards get special hover-ready reveal
        // Note: domain-card excluded to not interfere with carousel
        const cards = document.querySelectorAll(".scan-category, .feature-card, .source-card, .privacy-item, .score-range");

        cards.forEach((card, i) => {
            gsap.set(card, {
                y: 50,
                opacity: 0,
                scale: 0.95,
            });

            ScrollTrigger.create({
                trigger: card,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    gsap.to(card, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        delay: (i % 5) * 0.08, // Stagger within row
                        ease: "power3.out",
                    });
                }
            });
        });
    }

    // ========================================
    // 6. MAGNETIC BUTTONS & CARDS
    // ========================================
    function initMagneticElements() {
        const magneticEls = document.querySelectorAll('.btn, .fx-hover');

        magneticEls.forEach(el => {
            const strength = el.classList.contains('btn') ? 0.3 : 0.15;

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(el, {
                    x: x * strength,
                    y: y * strength,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)",
                });
            });
        });
    }

    // ========================================
    // 7. SCROLL PROGRESS INDICATOR
    // ========================================
    function initScrollProgress() {
        // Create progress bar if doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);
        }

        gsap.to(progressBar, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
            }
        });
    }

    // ========================================
    // 8. HORIZONTAL SCROLL SECTION (Features)
    // ========================================
    function initHorizontalScroll() {
        const section = document.querySelector('.horizontal-scroll-section');
        if (!section) return;

        const track = section.querySelector('.horizontal-track');
        if (!track) return;

        const items = track.children;
        const totalWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${totalWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });
    }

    // ========================================
    // 9. NUMBER COUNTER ANIMATION
    // ========================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const text = counter.textContent;
            const match = text.match(/(\d+)/);
            if (!match) return;

            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], '');

            counter.textContent = '0' + suffix;

            ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: function() {
                            const progress = this.progress();
                            const current = Math.floor(target * progress);
                            counter.textContent = current + suffix;
                        }
                    });
                }
            });
        });
    }

    // ========================================
    // 10. SCORE RING ANIMATION + NUMBER COUNT
    // ========================================
    function initScoreRing() {
        const progressCircle = document.querySelector('.score-circle .progress-circle');
        const scoreNumber = document.querySelector('.score-number');
        if (!progressCircle) return;

        const radius = 65; // Updated to match CSS
        const circumference = 2 * Math.PI * radius; // ≈ 408.41
        const targetProgress = 87;
        const targetOffset = circumference - (targetProgress / 100) * circumference; // ≈ 53.09

        // Set initial state
        gsap.set(progressCircle, {
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
        });

        ScrollTrigger.create({
            trigger: '.score-display',
            start: "top 80%",
            once: true,
            onEnter: () => {
                // Animate the circle
                gsap.to(progressCircle, {
                    strokeDashoffset: targetOffset,
                    duration: 2.5,
                    ease: "power3.out",
                });

                // Animate the number count-up
                if (scoreNumber) {
                    gsap.fromTo(scoreNumber, 
                        { textContent: 0 },
                        {
                            textContent: targetProgress,
                            duration: 2.5,
                            ease: "power2.out",
                            snap: { textContent: 1 },
                            stagger: 0.05,
                            onUpdate: function() {
                                scoreNumber.textContent = Math.ceil(this.targets()[0].textContent);
                            }
                        }
                    );
                }
            }
        });
    }

    // ========================================
    // 11. PINNED FEATURES SHOWCASE
    // ========================================
    function initPinnedFeatures() {
        const section = document.querySelector('.pinned-features');
        if (!section) return;

        const items = section.querySelectorAll('.pinned-feature-item');
        if (items.length === 0) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${items.length * 100}%`,
                scrub: 1,
                pin: true,
            }
        });

        items.forEach((item, i) => {
            if (i === 0) {
                tl.from(item, { opacity: 0, y: 50, duration: 1 });
            } else {
                tl.to(items[i - 1], { opacity: 0, y: -50, duration: 0.5 });
                tl.from(item, { opacity: 0, y: 50, duration: 0.5 }, "<");
            }
        });
    }

    // ========================================
    // 12. STEPS REVEAL (How It Works)
    // ========================================
    function initStepsReveal() {
        const steps = document.querySelectorAll('.step');

        steps.forEach((step, i) => {
            const number = step.querySelector('.step-number');
            const content = step.querySelector('.step-content');
            const line = step.querySelector('::after');

            gsap.set([number, content], {
                opacity: 0,
                y: 30,
            });

            if (number) {
                gsap.set(number, { scale: 0.5, rotation: -180 });
            }

            ScrollTrigger.create({
                trigger: step,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline();

                    if (number) {
                        tl.to(number, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotation: 0,
                            duration: 0.6,
                            ease: "back.out(1.7)",
                        });
                    }

                    tl.to(content, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                    }, number ? "-=0.3" : 0);
                }
            });
        });
    }

    // ========================================
    // 13. DOMAIN CARDS 3D TILT
    // ========================================
    function initCardTilt() {
        // Note: domain-card excluded to not interfere with carousel transforms
        const cards = document.querySelectorAll('.feature-card, .scan-category');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(card, {
                    rotateY: x * 10,
                    rotateX: -y * 10,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        });
    }

    // ========================================
    // 14. CAROUSEL WITH GSAP (Enhanced)
    // ========================================
    function initEnhancedCarousel() {
        const root = document.querySelector("[data-yam-stack]");
        if (!root) return;

        const items = Array.from(root.querySelectorAll(".yam-stack__item"));
        const prev = root.querySelector(".yam-stack__btn--prev");
        const next = root.querySelector(".yam-stack__btn--next");
        const dotsWrap = document.querySelector("[data-yam-dots]");

        if (items.length === 0) return;

        let index = 0;
        const N = items.length;

        // Create dots
        if (dotsWrap) {
            dotsWrap.innerHTML = "";
            items.forEach((_, i) => {
                const b = document.createElement("button");
                b.type = "button";
                b.className = "yam-dot";
                b.addEventListener("click", () => goTo(i));
                dotsWrap.appendChild(b);
            });
        }

        function mod(n, m) { return ((n % m) + m) % m; }

        function goTo(newIndex) {
            index = newIndex;
            render();
        }

        function render() {
            items.forEach((el, i) => {
                el.classList.remove("is-active");

                let d = i - index;
                const half = Math.floor(N / 2);
                if (d > half) d -= N;
                if (d < -half) d += N;

                const ad = Math.abs(d);

                // Use GSAP for smooth transitions
                if (ad > 2) {
                    gsap.to(el, {
                        opacity: 0,
                        filter: "blur(12px)",
                        scale: 0.85,
                        x: d > 0 ? 300 : -300,
                        zIndex: 0,
                        duration: 0.6,
                        ease: "power3.out",
                    });
                } else {
                    const x = d * 180;
                    const scale = 1 - ad * 0.1;
                    const rotY = d * -12;
                    const blur = ad * 2;
                    const opacity = ad === 0 ? 1 : Math.max(0.3, 1 - ad * 0.4);
                    const z = 10 - ad;

                    gsap.to(el, {
                        opacity,
                        filter: `blur(${blur}px)`,
                        scale,
                        x,
                        rotateY: rotY,
                        zIndex: z,
                        duration: 0.7,
                        ease: "power3.out",
                    });

                    if (ad === 0) el.classList.add("is-active");
                }
            });

            // Update dots
            if (dotsWrap) {
                Array.from(dotsWrap.children).forEach((d, i) => {
                    d.classList.toggle("is-active", i === index);
                });
            }
        }

        function goNext() { goTo(mod(index + 1, N)); }
        function goPrev() { goTo(mod(index - 1, N)); }

        if (next) next.addEventListener("click", goNext);
        if (prev) prev.addEventListener("click", goPrev);

        // Auto-play
        let autoplayInterval = setInterval(goNext, 5000);

        root.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        root.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(goNext, 5000);
        });

        // Initial render
        render();
    }

    // ========================================
    // 15. CURSOR TRAIL (Subtle luxury)
    // ========================================
    function initCursorTrail() {
        // Create cursor element
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows immediately
            gsap.set(cursorDot, { x: mouseX, y: mouseY });
        });

        // Smooth follow for main cursor
        gsap.ticker.add(() => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            gsap.set(cursor, { x: cursorX, y: cursorY });
        });

        // Scale on hover
        document.querySelectorAll('a, button, .fx-hover').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1.5, duration: 0.3 });
                gsap.to(cursorDot, { scale: 0, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
                gsap.to(cursorDot, { scale: 1, duration: 0.3 });
            });
        });
    }

    // ========================================
    // 16. DEMO SECTION ANIMATIONS
    // ========================================
    function initDemoAnimations() {
        const demoSection = document.querySelector('.interactive-demo');
        if (!demoSection) return;

        // Animate demo tabs on scroll reveal
        const tabs = demoSection.querySelectorAll('.demo-tab');
        gsap.set(tabs, { y: 20, opacity: 0 });

        ScrollTrigger.create({
            trigger: demoSection,
            start: "top 80%",
            once: true,
            onEnter: () => {
                gsap.to(tabs, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                });
            }
        });

        // Tab switching animation
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Bounce effect on click
                gsap.to(tab, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                });
            });
        });

        // Demo phone entrance animation
        const demoPhone = demoSection.querySelector('.demo-phone');
        if (demoPhone) {
            gsap.set(demoPhone, { y: 40, opacity: 0, scale: 0.95 });

            ScrollTrigger.create({
                trigger: demoPhone,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to(demoPhone, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                    });
                }
            });
        }

        // Product buttons hover effect
        const productBtns = demoSection.querySelectorAll('.product-btn');
        productBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });
    }

    // ========================================
    // 17. PAIN POINTS SECTION ANIMATIONS
    // ========================================
    function initPainPointsAnimations() {
        const painPointsSection = document.querySelector('.pain-points');
        if (!painPointsSection) return;

        const cards = painPointsSection.querySelectorAll('.problem-solution-card');

        cards.forEach((card, i) => {
            const problem = card.querySelector('.problem-side');
            const arrow = card.querySelector('.solution-arrow');
            const solution = card.querySelector('.solution-side');

            gsap.set([problem, arrow, solution], { opacity: 0 });
            gsap.set(problem, { x: -30 });
            gsap.set(arrow, { scale: 0 });
            gsap.set(solution, { x: 30 });

            ScrollTrigger.create({
                trigger: card,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline();

                    tl.to(problem, {
                        x: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power3.out",
                    })
                    .to(arrow, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)",
                    }, "-=0.3")
                    .to(solution, {
                        x: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power3.out",
                    }, "-=0.2");
                }
            });

            // Hover animation
            card.addEventListener('mouseenter', () => {
                gsap.to(arrow, {
                    x: 5,
                    scale: 1.2,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(arrow, {
                    x: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });
    }

    // ========================================
    // 18. FLOATING ELEMENTS
    // ========================================
    function initFloatingElements() {
        // Add subtle floating to glass cards
        const glassCards = document.querySelectorAll('.glass-card');
        glassCards.forEach((card, i) => {
            gsap.to(card, {
                y: "random(-8, 8)",
                x: "random(-3, 3)",
                rotation: "random(-2, 2)",
                duration: "random(3, 5)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.2,
            });
        });

        // Floating animation for category icons
        const categoryIcons = document.querySelectorAll('.category-icon');
        categoryIcons.forEach((icon, i) => {
            gsap.to(icon, {
                y: -5,
                duration: 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.3,
            });
        });
    }

    // ========================================
    // 19. SECTION BACKGROUND PARALLAX
    // ========================================
    function initSectionParallax() {
        // Subtle parallax for sections
        document.querySelectorAll('section').forEach(section => {
            const bg = section.querySelector('.section-bg');
            if (bg) {
                gsap.to(bg, {
                    y: 50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                    }
                });
            }
        });

        // Note: Domain cards excluded from parallax to not interfere with carousel
    }

    // ========================================
    // 20. INTERACTIVE STAT COUNTERS
    // ========================================
    function initInteractiveStats() {
        const stats = document.querySelectorAll('.stat');

        stats.forEach(stat => {
            stat.addEventListener('mouseenter', () => {
                gsap.to(stat, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                });
                gsap.to(stat.querySelector('.stat-number'), {
                    color: 'var(--forest)',
                    duration: 0.3,
                });
            });

            stat.addEventListener('mouseleave', () => {
                gsap.to(stat, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
                gsap.to(stat.querySelector('.stat-number'), {
                    color: 'var(--paper)',
                    duration: 0.3,
                });
            });
        });
    }

    // ========================================
    // 21. SCROLL-TRIGGERED TEXT REVEAL
    // ========================================
    function initTextReveal() {
        const titles = document.querySelectorAll('.section-title:not(.hero-title)');

        titles.forEach(title => {
            gsap.set(title, {
                backgroundSize: "0% 100%",
            });

            ScrollTrigger.create({
                trigger: title,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to(title, {
                        backgroundSize: "200% 100%",
                        duration: 1.5,
                        ease: "power2.out",
                    });
                }
            });
        });
    }

    // ========================================
    // 22. ENHANCED NAVBAR SCROLL EFFECT
    // ========================================
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        ScrollTrigger.create({
            start: "top -100",
            end: 99999,
            onUpdate: (self) => {
                if (self.direction === -1) {
                    // Scrolling up
                    gsap.to(navbar, {
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                } else if (self.scroll() > 200) {
                    // Scrolling down and past threshold
                    gsap.to(navbar, {
                        y: -100,
                        duration: 0.3,
                        ease: "power2.in",
                    });
                }
            }
        });

        // Add shadow on scroll
        ScrollTrigger.create({
            start: "top -50",
            onEnter: () => {
                gsap.to(navbar, {
                    boxShadow: "0 4px 20px rgba(11, 15, 14, 0.1)",
                    duration: 0.3,
                });
            },
            onLeaveBack: () => {
                gsap.to(navbar, {
                    boxShadow: "none",
                    duration: 0.3,
                });
            }
        });
    }

    // ========================================
    // 23. COMPARISON TOOL ANIMATIONS
    // ========================================
    function initComparisonAnimations() {
        const compareSection = document.querySelector('.product-compare');
        if (!compareSection) return;

        // Animate VS circle
        const vsCircle = compareSection.querySelector('.vs-circle');
        if (vsCircle) {
            gsap.set(vsCircle, { scale: 0, rotation: -180 });

            ScrollTrigger.create({
                trigger: compareSection,
                start: "top 70%",
                once: true,
                onEnter: () => {
                    gsap.to(vsCircle, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                    });
                }
            });
        }

        // Animate compare columns sliding in from sides
        const columnA = compareSection.querySelector('.compare-a');
        const columnB = compareSection.querySelector('.compare-b');

        if (columnA && columnB) {
            gsap.set(columnA, { x: -60, opacity: 0 });
            gsap.set(columnB, { x: 60, opacity: 0 });

            ScrollTrigger.create({
                trigger: compareSection,
                start: "top 75%",
                once: true,
                onEnter: () => {
                    gsap.to(columnA, {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                    });
                    gsap.to(columnB, {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: 0.15,
                    });
                }
            });
        }

        // Compare button hover effects
        const compareBtns = compareSection.querySelectorAll('.compare-btn');
        compareBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (!btn.classList.contains('active')) {
                    gsap.to(btn, {
                        scale: 1.03,
                        y: -2,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });

        // Winner badge pulse
        const winnerBadge = compareSection.querySelector('.winner-badge');
        if (winnerBadge) {
            gsap.to(winnerBadge, {
                boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                duration: 1.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        }
    }

    // ========================================
    // 24. ENHANCED PARALLAX LAYERS
    // ========================================
    function initEnhancedParallax() {
        // Multi-layer parallax for sections
        document.querySelectorAll('section').forEach((section, i) => {
            // Create subtle depth on section titles
            const title = section.querySelector('.section-title');
            if (title) {
                gsap.to(title, {
                    y: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                    }
                });
            }

            // Parallax on eyebrow text
            const eyebrow = section.querySelector('.eyebrow');
            if (eyebrow) {
                gsap.to(eyebrow, {
                    y: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.3,
                    }
                });
            }
        });

        // Depth parallax for cards - different speeds create depth
        const cards = document.querySelectorAll('.scan-category, .feature-card, .source-card');
        cards.forEach((card, i) => {
            const speed = 0.1 + (i % 3) * 0.05; // Vary speed for depth effect

            gsap.to(card, {
                y: -30 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: speed,
                }
            });
        });
    }

    // ========================================
    // 25. SCROLL-TRIGGERED SCALE EFFECTS
    // ========================================
    function initScrollScale() {
        // Scale up hero phone on scroll for dramatic effect
        const heroPhone = document.querySelector('.hero .device, .hero .phone-mockup');
        if (heroPhone) {
            gsap.to(heroPhone, {
                scale: 1.05,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                }
            });
        }

        // Demo phone subtle scale
        const demoPhone = document.querySelector('.demo-phone');
        if (demoPhone) {
            gsap.to(demoPhone, {
                scale: 1.02,
                ease: "none",
                scrollTrigger: {
                    trigger: demoPhone,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 0.3,
                }
            });
        }
    }

    // ========================================
    // 26. REVEAL ON SCROLL WITH STAGGER GRID
    // ========================================
    function initStaggerGrid() {
        // For grids of cards - stagger based on position
        const grids = [
            { selector: '.scan-categories', items: '.scan-category' },
            { selector: '.sources-grid', items: '.source-card' },
            { selector: '.compare-products', items: '.compare-btn' },
        ];

        grids.forEach(({ selector, items }) => {
            const grid = document.querySelector(selector);
            if (!grid) return;

            const gridItems = grid.querySelectorAll(items);
            gsap.set(gridItems, { y: 40, opacity: 0, scale: 0.95 });

            ScrollTrigger.create({
                trigger: grid,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to(gridItems, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: {
                            amount: 0.4,
                            from: "start",
                        },
                        ease: "power3.out",
                    });
                }
            });
        });
    }

    // ========================================
    // 27. INTERACTIVE SECTION BACKGROUNDS
    // ========================================
    function initSectionBackgrounds() {
        // Subtle gradient shift on scroll
        const sections = document.querySelectorAll('.pain-points, .product-compare, .data-sources');

        sections.forEach(section => {
            gsap.to(section, {
                backgroundPosition: "50% 100%",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        });
    }

    // ========================================
    // 28. INTERACTIVE FLIP CARDS (Pain Points)
    // ========================================
    function initFlipCardsAnimations() {
        const painSection = document.querySelector('.pain-points-interactive');
        if (!painSection) return;

        const cards = painSection.querySelectorAll('.pain-card');

        // Staggered entrance animation
        gsap.set(cards, { y: 60, opacity: 0, rotateX: -10 });

        ScrollTrigger.create({
            trigger: painSection,
            start: "top 80%",
            once: true,
            onEnter: () => {
                gsap.to(cards, {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                });
            }
        });

        // Hover effects for cards (not the flip, but extra polish)
        cards.forEach(card => {
            if (card.classList.contains('cta-card')) return;

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });

        // CTA card pulsing glow effect
        const ctaCard = painSection.querySelector('.cta-card');
        if (ctaCard) {
            gsap.to(ctaCard, {
                boxShadow: "0 0 40px rgba(15, 61, 46, 0.3)",
                duration: 1.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        }
    }

    // ========================================
    // INITIALIZE EVERYTHING
    // ========================================
    function init() {
        initSmoothScroll();
        initHeroEntrance();
        initParallax();
        initSectionReveals();
        initMagneticElements();
        initScrollProgress();
        initCounters();
        initScoreRing();
        initStepsReveal();
        initCardTilt();
        initDemoAnimations();
        initPainPointsAnimations();
        initFloatingElements();
        initSectionParallax();
        initInteractiveStats();
        initTextReveal();
        initNavbarScroll();
        initComparisonAnimations();
        initEnhancedParallax();
        initScrollScale();
        initStaggerGrid();
        initSectionBackgrounds();
        initFlipCardsAnimations();
        // initEnhancedCarousel(); // Disabled - using inline version
        // initCursorTrail(); // Optional - uncomment for custom cursor
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Refresh ScrollTrigger on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });

})();
