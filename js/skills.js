// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Circular Progress Animation
const animateCircularProgress = () => {
    const circles = document.querySelectorAll('.skill-circle');

    // Check for mobile view - create more granular breakpoints
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const isVerySmallMobile = window.innerWidth <= 350;

    // Determine appropriate radius based on screen size
    let circleRadius, svgSize, strokeWidth;

    if (isVerySmallMobile) {
        circleRadius = 30;
        svgSize = 70;
        strokeWidth = 4;
    } else if (isSmallMobile) {
        circleRadius = 35;
        svgSize = 80;
        strokeWidth = 5;
    } else if (isMobile) {
        circleRadius = 40;
        svgSize = 90;
        strokeWidth = 6;
    } else {
        circleRadius = 50;
        svgSize = 120;
        strokeWidth = 8;
    }

    circles.forEach(circle => {
        const percentage = circle.getAttribute('data-percentage');
        const circumference = 2 * Math.PI * circleRadius;
        const offset = circumference - (percentage / 100) * circumference;

        // Create SVG circle if it doesn't exist
        if (!circle.querySelector('svg')) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            const centerPoint = svgSize / 2;

            svg.setAttribute('width', svgSize);
            svg.setAttribute('height', svgSize);
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.transform = 'rotate(-90deg)';
            svg.style.zIndex = '2';

            path.setAttribute('cx', centerPoint);
            path.setAttribute('cy', centerPoint);
            path.setAttribute('r', circleRadius);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'white');
            path.setAttribute('stroke-width', strokeWidth);
            path.style.strokeDasharray = circumference;
            path.style.strokeDashoffset = circumference;
            path.style.transition = 'stroke-dashoffset 1s ease';

            svg.appendChild(path);
            circle.querySelector('.circle-progress').appendChild(svg);

            // Trigger animation
            setTimeout(() => {
                path.style.strokeDashoffset = offset;
            }, 100);
        }
    });
};

// Handle resize events for responsive behavior
const handleResize = () => {
    // Remove existing SVGs
    document.querySelectorAll('.circle-progress svg').forEach(svg => {
        svg.remove();
    });

    // Re-initialize with correct sizes
    animateCircularProgress();
};

// Linear Progress Bar Animation
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.skill-progress');

    progressBars.forEach(container => {
        const progress = container.getAttribute('data-progress');
        const bar = container.querySelector('.progress-bar');

        bar.style.transform = `scaleX(${progress / 100})`;
    });
};

// Scroll Animation for Progress Bars
const observeProgress = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-progress')) {
                    animateProgressBars();
                } else if (entry.target.classList.contains('skills-overview')) {
                    animateCircularProgress();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-progress, .skills-overview').forEach(element => {
        observer.observe(element);
    });
};

// Skill Card Hover Effect
const initSkillCards = () => {
    const cards = document.querySelectorAll('.skill-card');

    // Only apply hover effects on non-touch devices
    if (!('ontouchstart' in window)) {
        cards.forEach(card => {
            const icon = card.querySelector('.skill-icon');

            card.addEventListener('mouseenter', () => {
                icon.style.transform = 'rotateY(180deg)';
            });

            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'rotateY(0)';
            });
        });
    }
};

// Tool Card Animation
const initToolCards = () => {
    const cards = document.querySelectorAll('.tool-card');

    // Only apply hover effects on non-touch devices
    if (!('ontouchstart' in window)) {
        cards.forEach(card => {
            const icon = card.querySelector('.tool-icon');

            card.addEventListener('mouseenter', () => {
                icon.style.transform = 'rotateY(180deg) scale(1.1)';
            });

            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'rotateY(0) scale(1)';
            });
        });
    }
};

// Smooth Scrolling
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Parallax Effect for Hero Section
const initParallax = () => {
    // Only apply parallax on non-mobile devices for performance
    if (window.innerWidth > 768) {
        const hero = document.querySelector('.skills-hero');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }
};

// Reveal Animation on Scroll
const initRevealAnimation = () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(element => revealObserver.observe(element));
};

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initial animation
    animateCircularProgress();
    observeProgress();
    initSkillCards();
    initToolCards();
    initSmoothScroll();
    initParallax();
    initRevealAnimation();

    // Handle window resize for responsiveness
    window.addEventListener('resize', () => {
        // Debounce resize events
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            handleResize();
        }, 250);
    });
}); 