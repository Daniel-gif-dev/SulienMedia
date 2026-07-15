document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('.main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksAll = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinksAll.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Scroll Fade-in Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // 4. Sunrise Theme Background Warmth Transition
    const sections = document.querySelectorAll('section');
    
    const themeObserverOptions = {
        root: null,
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '-10% 0px -40% 0px' // Adjust bounds for smoother entry triggers
    };

    const themeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Reset body classes
                document.body.classList.remove('warm-1', 'warm-2', 'warm-3');
                
                // Add class matching scroll depth
                if (sectionId === 'services') {
                    document.body.classList.add('warm-1');
                } else if (sectionId === 'how-it-works') {
                    document.body.classList.add('warm-2');
                } else if (sectionId === 'pricing' || sectionId === 'results') {
                    document.body.classList.add('warm-3');
                }
            }
        });
    }, themeObserverOptions);

    sections.forEach(section => {
        themeObserver.observe(section);
    });

    // 5. Connect Pricing Cards and SVG Path Highlight
    const pricingCards = document.querySelectorAll('.price-card');
    const sunPathElement = document.getElementById('sun-path');

    pricingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            if (sunPathElement) {
                sunPathElement.style.strokeWidth = '2.5px';
                sunPathElement.style.opacity = '1';
                
                if (index === 0) sunPathElement.style.stroke = 'var(--accent-gold)';
                if (index === 1) sunPathElement.style.stroke = 'var(--accent-amber)';
                if (index === 2) sunPathElement.style.stroke = 'var(--text-primary)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (sunPathElement) {
                sunPathElement.style.strokeWidth = '1.5px';
                sunPathElement.style.opacity = '0.6';
                sunPathElement.style.stroke = 'var(--accent-gold)';
            }
        });
    });
});
