// Initialize AOS
AOS.init({
    duration: 800,
    offset: 50,
    once: true
});

// Initialize Particles.js
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
    particles: {
        number: {
                value: 40,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
                value: '#ffffff'
        },
        shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
        },
        opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
        },
        line_linked: {
            enable: true,
            distance: 150,
                color: '#ffffff',
                opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
                speed: 3,
                direction: 'none',
                random: false,
            straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
        }
    },
    interactivity: {
            detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                    mode: 'grab'
            },
            onclick: {
                enable: true,
                    mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
            push: {
                particles_nb: 4
                },
                remove: {
                    particles_nb: 2
            }
        }
    },
    retina_detect: true
});
}

// Initialize masonry layout
function initMasonry() {
    // Select all project items
    const projectItems = document.querySelectorAll('.masonry-item');

    // Apply random heights within a range to create visual interest
    projectItems.forEach((item, index) => {
        // Handle image loading to prevent layout issues
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('load', function () {
                // Fade in the item after image loads
                item.style.opacity = 1;
            });
        }

        // Add touch support for mobile devices
        item.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                const overlay = this.querySelector('.project-overlay');
                const detailsBox = this.querySelector('.project-details');

                // If clicking on links, don't prevent default behavior
                if (e.target.closest('.project-links a')) {
                    return;
                }

                e.preventDefault();
                overlay.style.opacity = 1;
                detailsBox.style.opacity = 1;
                detailsBox.style.transform = 'translateY(0)';
            }
        });
    });
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectItems = document.querySelectorAll('.project-item');

    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter projects
            projectItems.forEach((item, index) => {
                item.style.opacity = 0;
                item.style.transform = 'translateY(20px)';

                setTimeout(() => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.transform = 'translateY(0)';
                        }, 50 * index);
                } else {
                        item.style.display = 'none';
                    }
                    }, 300);
            });
        });
    });

    // Set default filter
    if (filterButtons.length > 0) {
        filterButtons[0].click();
    }
}

// Counter Animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // milliseconds
        const step = Math.ceil(target / (duration / 30)); // update every 30ms
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(interval);
        } else {
                counter.textContent = current;
        }
        };

        const interval = setInterval(updateCounter, 30);
    });
};

// Scroll Animation for Counter
const observeCounters = () => {
    const countersSection = document.querySelector('.project-stats');

    if (countersSection) {
        const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

        observer.observe(countersSection);
    }
};

// Initialize 3D card hover effects
function init3DCardEffects() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            // Skip effect on mobile
            if (window.innerWidth <= 768) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element

            // Calculate rotation based on mouse position
            // Divide by 10 to tone down the effect (less extreme rotation)
            const rotateY = -((x / rect.width - 0.5) * 20);
            const rotateX = (y / rect.height - 0.5) * 10;

            // Apply the 3D rotation effect
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

            // Create a subtle light reflection effect
            const shine = ((x / rect.width) * 100 + (y / rect.height) * 100) / 2;
            card.style.background = `linear-gradient(120deg, rgba(255,255,255,${shine * 0.003}) 0%, rgba(255,255,255,0.05) 100%)`;

            // Move image slightly to enhance 3D effect
            const imageX = (x / rect.width - 0.5) * -10;
            const imageY = (y / rect.height - 0.5) * -10;
            const image = card.querySelector('.project-image img');
            if (image) {
                image.style.transform = `translateX(${imageX}px) translateY(${imageY}px) scale(1.1)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            // Reset the transform on mouse leave
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.background = 'rgba(255, 255, 255, 0.05)';

            const image = card.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'translateX(0) translateY(0) scale(1)';
            }
        });
    });
}

// Animate section header text typing effect
function animateSectionTitle() {
    const sectionTitle = document.querySelector('.section-title');
    if (!sectionTitle) return;

    // Add animation classes
    sectionTitle.classList.add('animate-title');

    // Add subtle floating animation to highlight
    const highlight = sectionTitle.querySelector('.highlight');
    if (highlight) {
        highlight.style.animation = 'float 3s ease-in-out infinite';
    }
}

// Add glowing effect to filter buttons
function enhanceFilterButtons() {
    const buttons = document.querySelectorAll('.filter-button');

    buttons.forEach(button => {
        // Add inner span for text if not already there
        if (!button.querySelector('span')) {
            const text = button.textContent;
            button.innerHTML = `<span>${text}</span>`;
        }

        // Add glow effect on hover
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 0 15px rgba(255, 0, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '';
        });

        // Click ripple effect
        button.addEventListener('click', e => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Animate tech stack tags with staggered appearance
function animateTechStack() {
    const techStacks = document.querySelectorAll('.tech-stack');

    techStacks.forEach(stack => {
        const tags = stack.querySelectorAll('span');

        tags.forEach((tag, index) => {
            tag.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
        });
    });
}

// Add particle effects to the project grid section
function addParticleEffects() {
    const section = document.querySelector('.project-grid');
    if (!section) return;

    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    section.appendChild(canvas);

    // Only initialize if we're not on mobile
    if (window.innerWidth > 768) {
        initParticles(canvas);
    }
}

// Initialize the particle effect
function initParticles(canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Particle properties
    const particles = [];
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: getRandomColor()
        });
    }

    function getRandomColor() {
        const colors = [
            'rgba(255, 0, 255, 0.5)',
            'rgba(0, 255, 255, 0.5)',
            'rgba(255, 255, 255, 0.5)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.x += p.speedX;
            p.y += p.speedY;

            // Boundary check
            if (p.x > width) p.x = 0;
            if (p.x < 0) p.x = width;
            if (p.y > height) p.y = 0;
            if (p.y < 0) p.y = height;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    });

    // Start animation
    animate();
}

// Enhance social media links with custom animations
function enhanceSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');

    // Define brand colors for each social platform
    const brandColors = {
        'fa-github': '#6e5494',
        'fa-linkedin': '#0077b5',
        'fa-youtube': '#ff0000',
        'fa-instagram': '#e1306c',
        'fa-facebook': '#3b5998'
    };

    socialLinks.forEach(link => {
        // Find which icon is used
        const icon = link.querySelector('i');
        let brandColor = 'rgba(255, 255, 255, 0.8)';

        // Check which platform icon is used and set appropriate color
        for (const [className, color] of Object.entries(brandColors)) {
            if (icon.classList.contains(className)) {
                brandColor = color;
                break;
            }
        }

        // Apply random slight delay for floating animation to create staggered effect
        const randomDelay = Math.random() * 2; // 0-2s delay
        link.style.animation = `float 3s ease-in-out ${randomDelay}s infinite`;

        // Custom hover effect with brand-specific color
        link.addEventListener('mouseenter', () => {
            // Apply brand-specific glow
            link.style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.3), 0 0 20px ${brandColor}`;

            // Create particle burst effect on hover
            createParticleBurst(link, brandColor);
        });

        link.addEventListener('mouseleave', () => {
            link.style.boxShadow = '';
        });
    });
}

// Create particle burst effect when hovering social links
function createParticleBurst(element, color) {
    // Number of particles to create
    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
        // Create a particle
        const particle = document.createElement('span');
        particle.classList.add('social-particle');

        // Set styles for particle
        particle.style.position = 'absolute';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '0';

        // Position at center of element
        const rect = element.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Append to element
        element.appendChild(particle);

        // Random angle and distance
        const angle = Math.random() * Math.PI * 2; // 0 to 2π
        const distance = 30 + Math.random() * 20; // 30-50px

        // Calculate end position
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        // Animate with CSS
        particle.animate([
            {
                transform: `translate(${centerX}px, ${centerY}px) scale(0)`,
                opacity: 1
            },
            {
                transform: `translate(${endX}px, ${endY}px) scale(1)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fill: 'forwards'
        });

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode === element) {
                element.removeChild(particle);
            }
        }, 800);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }

    // Initialize masonry layout and filters
    initMasonry();
    initProjectFilters();
    observeCounters();

    // Initialize new effects
    init3DCardEffects();
    animateSectionTitle();
    enhanceFilterButtons();
    animateTechStack();
    addParticleEffects();
    enhanceSocialLinks();

    // Add animation classes to project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.setAttribute('data-aos', 'fade-up');
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Floating Tech Stack Animation
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) translateY(-10px)';
        this.style.background = 'var(--gradient-1)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// Smooth Scrolling
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

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.projects-hero');
    if (hero) {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.reveal');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Smooth hover effect for feature icons
document.querySelectorAll('.feature').forEach(feature => {
    const icon = feature.querySelector('i');
    if (icon) {
    feature.addEventListener('mouseenter', () => {
        icon.style.transform = 'rotateY(180deg)';
    });

    feature.addEventListener('mouseleave', () => {
        icon.style.transform = 'rotateY(0)';
    });
    }
}); 