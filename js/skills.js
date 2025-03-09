// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Circular Progress Animation
const animateCircularProgress = () => {
    const circles = document.querySelectorAll('.skill-circle');

    circles.forEach(circle => {
        const percentage = circle.getAttribute('data-percentage');
        const circumference = 2 * Math.PI * 50; // radius = 50
        const offset = circumference - (percentage / 100) * circumference;

        // Create SVG circle if it doesn't exist
        if (!circle.querySelector('svg')) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            svg.setAttribute('width', '120');
            svg.setAttribute('height', '120');
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.transform = 'rotate(-90deg)';

            path.setAttribute('cx', '60');
            path.setAttribute('cy', '60');
            path.setAttribute('r', '50');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'white');
            path.setAttribute('stroke-width', '8');
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

    cards.forEach(card => {
        const icon = card.querySelector('.skill-icon');

        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0)';
        });
    });
};

// Tool Card Animation
const initToolCards = () => {
    const cards = document.querySelectorAll('.tool-card');

    cards.forEach(card => {
        const icon = card.querySelector('.tool-icon');

        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(180deg) scale(1.1)';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0) scale(1)';
        });
    });
};

// Smooth Scrolling
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
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
    const hero = document.querySelector('.skills-hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
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
    observeProgress();
    initSkillCards();
    initToolCards();
    initSmoothScroll();
    initParallax();
    initRevealAnimation();
}); 