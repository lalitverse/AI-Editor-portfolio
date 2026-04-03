/**
 * Main Script File for Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Load Animation
    // Trigger the hero section animations after a tiny delay
    setTimeout(() => {
        const heroContents = document.querySelectorAll('.hero .fade-in-up');
        heroContents.forEach(el => el.classList.add('visible'));
    }, 100);

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Get all elements with the fade-in-up class that aren't in the hero
    const animElements = document.querySelectorAll('section .fade-in-up');
    animElements.forEach(el => scrollObserver.observe(el));
});
