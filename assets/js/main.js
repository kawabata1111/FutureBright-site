// Initialize Lenis (Smooth Scroll)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Loading Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to('.loading__text', {
        y: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .to('.loading__overlay', {
        y: 0,
        duration: 1,
        ease: 'expo.inOut',
        delay: 0.5
    })
    .set('.loading', { autoAlpha: 0 })
    .from('.t-line', {
        y: '-100%',
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero__sub-vertical', {
        opacity: 0,
        height: 0,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=1.0');
});

// Mobile Menu
const menuTrigger = document.querySelector('.menu-trigger');
const mobileMenu = document.querySelector('.mobile-menu');
const headerObj = document.querySelector('.header'); // Named to avoid conflict if 'header' var exists

if(menuTrigger) {
    menuTrigger.addEventListener('click', () => {
        menuTrigger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        headerObj.classList.toggle('menu-open'); // Toggle class for color change
    });
    
    // Close menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuTrigger.classList.remove('active');
            mobileMenu.classList.remove('active');
            headerObj.classList.remove('menu-open');
        });
    });
}

// Scroll Animations (Fade Up)
const fadeElements = document.querySelectorAll('.concept__content, .service-card, .service-detail-row');

fadeElements.forEach(el => {
    gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 85%'
        }
    });
});

// Image Reveal (Wipe Effect)
const imgWrappers = document.querySelectorAll('.concept__img-wrapper');

imgWrappers.forEach(wrapper => {
    ScrollTrigger.create({
        trigger: wrapper,
        start: 'top 70%',
        onEnter: () => wrapper.classList.add('is-inview')
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
    }
});

// Fixed CTA Banner Visibility
const fixedCta = document.getElementById('fixedCta');
if (fixedCta) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            fixedCta.classList.add('is-visible');
        } else {
            fixedCta.classList.remove('is-visible');
        }
    });
}
