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
    // Background text moves faster (parallax)
    tl.to(".bg-text-layer", { y: 150, opacity: 0.1, ease: "none" }, 0);
    // Floating card moves opposite direction
    tl.to(".showcase-overlay", { y: -30, ease: "none" }, 0);
}

// --- 3. SMART DISPLAY ULTRA-SUBTLE TILT (SCRUBBED) ---
if (document.querySelector('.case-image img')) {
    let tiltTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".case-study-section",
            start: "top bottom",    // Start when top of section enters viewport
            end: "center center",   // End when image is dead center
            scrub: 1                // Smooth lag for weight
        }
    });

    tiltTl.fromTo(".case-image img",
        {
            rotation: 4,      // VERY SUBTLE: Only 4 degrees
            scale: 0.98,      // Almost full size already
            opacity: 0.8,     // Mostly visible already
            x: 20,            // Tiny shift from right
            transformOrigin: "center center"
        },
        {
            rotation: 0,   // End: Perfectly straight
            scale: 1,      // End: Full size
            opacity: 1,    // End: Fully visible
            x: 0,          // End: Centered
            ease: "none"   // Linear ease for scrubbing
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

// --- 5. LIGHTBOX FUNCTIONALITY ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');

// Select all images inside Project cards and Hobby cards
const zoomableImages = document.querySelectorAll('.project-thumb img, .hobby-thumb img');

zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        
        lightboxImg.src = src;
        lightboxCaption.textContent = alt; // Uses the Alt text as a caption
        lightbox.classList.add('active');
        
        // Disable page scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    });
});

// Close Lightbox functions
const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scroll
    // Clear src after fade out to prevent flickering next time
    setTimeout(() => { lightboxImg.src = ''; }, 300);
};

closeBtn.addEventListener('click', closeLightbox);

// Close when clicking outside the image (on the background)
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});
