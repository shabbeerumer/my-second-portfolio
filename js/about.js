// Scroll reveal animation
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Parallax effect for shapes
const handleParallax = (e) => {
    const shapes = document.querySelectorAll('.about-shapes .shape');
    const speed = 0.5;

    shapes.forEach((shape, index) => {
        const x = (window.innerWidth - e.pageX * (index + 1) * speed) / 100;
        const y = (window.innerHeight - e.pageY * (index + 1) * speed) / 100;

        shape.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
};

// Tech items hover effect with description
const initTechItems = () => {
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        const tech = item.getAttribute('data-tech');
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = tech;
        item.appendChild(tooltip);

        item.addEventListener('mouseenter', function () {
            this.style.background = 'var(--gradient-1)';
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.animationPlayState = 'running';
            this.style.transform = '';
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
        });
    });
};

// Animated text reveal
const initTextReveal = () => {
    const title = document.querySelector('.hero-title');
    const words = title.textContent.trim().split(' ');
    title.textContent = '';

    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.animationDelay = `${index * 0.1}s`;
        span.className = 'reveal-text';
        title.appendChild(span);
    });
};

// Stats counter animation with easing
const animateStats = () => {
    const stats = document.querySelectorAll('.counter');

    const easeOutQuart = x => 1 - Math.pow(1 - x, 4);

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const updateCounter = currentTime => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Apply easing function
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(easedProgress * target);

            stat.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    });
};

// Enhanced stat card animations
const initStatCards = () => {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach(card => {
        const icon = card.querySelector('.stat-icon i');

        // Add hover animations
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotateY(180deg)';
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotateY(0)';
            card.style.transform = 'translateY(0)';
        });

        // Add intersection observer for reveal animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.classList.add('active');
                    observer.unobserve(card);

                    // Start counter animation when card is visible
                    const counter = card.querySelector('.counter');
                    if (counter) {
                        setTimeout(() => {
                            animateStats();
                        }, 300);
                    }
                }
            });
        }, { threshold: 0.2 });

        observer.observe(card);
    });
};

// Skill progress bars animation
const animateSkills = () => {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const progress = item.getAttribute('data-progress');
        const progressBar = item.querySelector('.progress-bar');

        progressBar.style.transform = `scaleX(${progress / 100})`;
    });
};

// Trigger skills animation when in view
const skillsSection = document.querySelector('.skills-section');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Smooth scrolling for navigation links
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

// Tech stack hover effect
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) translateY(-10px)';
        this.style.background = 'var(--gradient-1)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// Timeline marker animation
document.querySelectorAll('.timeline-marker').forEach(marker => {
    marker.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.2) rotate(360deg)';
    });

    marker.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Skill card icon animation
document.querySelectorAll('.skill-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        this.style.transform = 'rotateY(180deg)';
    });

    icon.addEventListener('mouseleave', function () {
        this.style.transform = 'rotateY(0)';
    });
});

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    reveal();
    initTechItems();
    initTextReveal();

    // Add parallax effect
    document.addEventListener('mousemove', handleParallax);

    // Animate stats when they come into view
    const statsSection = document.querySelector('.about-stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Add parallax effect to about header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.about-header');
        const scrolled = window.pageYOffset;
        header.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    initStatCards();
    initTimeline();
});

// Add this CSS for the tech tooltips
const style = document.createElement('style');
style.textContent = `
    .tech-tooltip {
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.8rem;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        white-space: nowrap;
        z-index: 10;
    }

    .reveal-text {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        animation: revealText 0.5s forwards;
    }

    @keyframes revealText {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add these styles for enhanced animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .stat-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .stat-card.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stat-icon i {
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes floatAnimation {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(additionalStyles);

// Timeline animations and interactions
const initTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineMarkers = document.querySelectorAll('.timeline-marker');

    // Initialize timeline reveal animation
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.2 });

    // Apply initial styles and observe timeline items
    timelineItems.forEach(item => {
        item.style.transform = 'translateX(-50px)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        timelineObserver.observe(item);
    });

    // Add hover animations for timeline markers
    timelineMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            marker.style.transform = 'scale(1.2) rotate(360deg)';
            marker.style.boxShadow = '0 0 0 8px var(--dark-color), 0 0 20px rgba(99, 102, 241, 0.4)';
        });

        marker.addEventListener('mouseleave', () => {
            marker.style.transform = 'scale(1) rotate(0deg)';
            marker.style.boxShadow = '0 0 0 6px var(--dark-color)';
        });
    });

    // Add hover effects for timeline tags and tech stack
    const tags = document.querySelectorAll('.timeline-tags span, .tech-stack span');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px)';
            tag.style.background = 'var(--gradient-1)';
            tag.style.borderColor = 'transparent';
            tag.style.color = 'white';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
            tag.style.background = 'rgba(99, 102, 241, 0.1)';
            tag.style.borderColor = 'rgba(99, 102, 241, 0.2)';
            tag.style.color = 'var(--text-secondary)';
        });
    });

    // Add parallax effect to timeline decorations
    const decorations = document.querySelectorAll('.decoration-item');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        decorations.forEach((decoration, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX * speed);
            const y = (mouseY * speed);
            decoration.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
};