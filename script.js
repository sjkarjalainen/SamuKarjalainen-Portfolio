// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// 1. GENERAL FADE-IN ANIMATION FOR SECTIONS
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

// 2. DRAMATIC TRACTOR PARALLAX ZOOM
// Only run if the element exists
if (document.querySelector('.tractor-section')) {
    
    // Timeline allows us to sync multiple movements
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".tractor-section",
            start: "top bottom",   // Start when top of section hits bottom of screen
            end: "bottom top",     // End when bottom of section hits top of screen
            scrub: 0.5             // Smooth scrubbing effect (0.5s lag for weight)
        }
    });

    // A. The Tractor: Zooms IN and moves slightly DOWN (for weight)
    tl.to(".tractor-still", {
        scale: 1.2,  // Grows 20% larger
        y: 50,       // Moves down slightly
        ease: "none" // Linear movement tied to scroll
    }, 0);           // "0" means start at beginning of timeline

    // B. The Background Text: Moves DOWN faster (Parallax depth)
    tl.to(".bg-text-layer", {
        y: 150,      // Moves down 150px
        opacity: 0.1, // Fades in slightly more
        ease: "none"
    }, 0);

    // C. The Floating Card: Moves UP slightly (Counter-movement)
    tl.to(".showcase-overlay", {
        y: -30,      // Floats up
        ease: "none"
    }, 0);
}
