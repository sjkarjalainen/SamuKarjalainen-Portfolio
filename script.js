// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// --- 1. GENERAL FADE-IN ANIMATION ---
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
                start: 'top 85%', // Triggers when top of section hits 85% viewport height
                toggleActions: 'play none none none'
            }
        }
    );
});

// --- 2. TRACTOR SECTION PARALLAX ---
if (document.querySelector('.tractor-section')) {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".tractor-section",
            start: "top bottom",   // Start when top of section hits bottom of screen
            end: "bottom top",     // End when bottom of section hits top of screen
            scrub: 0.5             // Smooth scrubbing
        }
    });

    // The Tractor grows and sinks slightly
    tl.to(".tractor-still", { scale: 1.2, y: 50, ease: "none" }, 0);
    //Background text moves faster (parallax)
    tl.to(".bg-text-layer", { y: 150, opacity: 0.1, ease: "none" }, 0);
    // Floating card moves opposite direction
    tl.to(".showcase-overlay", { y: -30, ease: "none" }, 0);
}

// --- 3. SMART DISPLAY SUBTLE TILT (SCRUBBED) ---
if (document.querySelector('.case-image img')) {
    // We use a timeline coupled with a scrubbed ScrollTrigger
    let tiltTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".case-study-section",
            // Start animation immediately when the section enters viewport
            start: "top bottom",
            // Finish the animation exactly when the image is centered on screen
            end: "center center",
            // Link animation progress directly to scrollbar with a 1 second smooth lag
            scrub: 1
        }
    });

    tiltTl.fromTo(".case-image img",
        {
            rotation: 8,      // Subtle start: Tilted 8 degrees right
            scale: 0.95,      // Subtle start: Slightly smaller
            opacity: 0.6,     // Start partially visible
            x: 30,            // Subtle offset right
            transformOrigin: "center center"
        },
        {
            rotation: 0,   // End: Perfectly straight
            scale: 1,      // End: Full size
            opacity: 1,    // End: Fully visible
            x: 0,          // End: Centered
            ease: "none"   // Linear ease is best for scrubbing
        }
    );
}


// --- 4. HEADER BACKGROUND TOGGLE ON SCROLL ---
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
