// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// 1. GENERAL FADE-IN ANIMATION
const sections = document.querySelectorAll('.fade-on-scroll');

sections.forEach(section => {
    gsap.fromTo(section, 
        { opacity: 0, y: 50 }, 
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// 2. DRAMATIC TRACTOR PARALLAX ZOOM
if (document.querySelector('.tractor-section')) {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".tractor-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
        }
    });

    tl.to(".tractor-still", { scale: 1.2, y: 50, ease: "none" }, 0);
    tl.to(".bg-text-layer", { y: 150, opacity: 0.1, ease: "none" }, 0);
    tl.to(".showcase-overlay", { y: -30, ease: "none" }, 0);
}

// 3. SMART DISPLAY TILT ANIMATION
// When .case-image comes into view, tilt it from right to center
if (document.querySelector('.case-image img')) {
    gsap.fromTo(".case-image img", 
        { 
            rotation: 15,  // Start tilted 15 degrees to the right
            scale: 0.9,    // Slightly smaller
            opacity: 0,
            x: 50          // Slightly to the right
        },
        {
            rotation: 0,   // End perfectly straight
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power3.out", // Smooth "settling" feel
            scrollTrigger: {
                trigger: ".case-study-section",
                start: "top 70%", // Start animation when section is 70% in view
                toggleActions: "play none none reverse"
            }
        }
    );
}

// 4. HEADER BACKGROUND TOGGLE ON SCROLL
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
