// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Counter Animation
const animateCounter = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(), 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Trigger counter animation when stats are in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Timeline Marker Animation
const initTimelineMarkers = () => {
    const markers = document.querySelectorAll('.timeline-marker');

    markers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            marker.style.transform = 'scale(1.2) rotate(360deg)';
        });

        marker.addEventListener('mouseleave', () => {
            marker.style.transform = 'scale(1) rotate(0)';
        });
    });
};

// Experience Card Animation
const initExperienceCards = () => {
    const cards = document.querySelectorAll('.experience-card');

    cards.forEach(card => {
        const icon = card.querySelector('.card-icon');

        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0)';
        });
    });
};

// Certification Card Animation
const initCertificationCards = () => {
    const cards = document.querySelectorAll('.certification-card');

    cards.forEach(card => {
        const icon = card.querySelector('.cert-icon');

        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0)';
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
    const hero = document.querySelector('.experience-hero');
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

// Timeline Animation
const initTimelineAnimation = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        item.style.transform = 'translateX(-50px)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.8s ease';
        timelineObserver.observe(item);
    });
};

// Stats Hover Effect
const initStatsHover = () => {
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach(item => {
        const icon = item.querySelector('.stat-icon');

        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(180deg)';
        });

        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0)';
        });
    });
};

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    initTimelineMarkers();
    initExperienceCards();
    initCertificationCards();
    initSmoothScroll();
    initParallax();
    initRevealAnimation();
    initTimelineAnimation();
    initStatsHover();
}); 