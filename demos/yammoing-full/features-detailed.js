// Accordion functionality for domains
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');

        // Close all accordions
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked accordion if it wasn't active
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// Open first accordion by default
if (accordionHeaders.length > 0) {
    accordionHeaders[0].parentElement.classList.add('active');
}

// Smooth scroll animations for detail items
const detailItems = document.querySelectorAll('.detail-item, .methodology-item, .tracking-category');

const detailObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

detailItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    detailObserver.observe(item);
});

// Animate flow steps
const flowSteps = document.querySelectorAll('.flow-step');

flowSteps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'scale(0.8)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    step.style.transitionDelay = `${index * 0.1}s`;

    const flowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                step.style.opacity = '1';
                step.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.1 });

    flowObserver.observe(step);
});
