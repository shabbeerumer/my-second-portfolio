// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Check if device is touch-enabled
const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Contact Form Handling
const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('.form-control');

    // Initialize form inputs
    inputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        // Remove focus effect if input is empty
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Handle input validation
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.classList.add('is-invalid');
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('is-invalid')) {
                input.classList.remove('is-invalid');
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        const isValid = form.checkValidity();
        if (!isValid) {
            form.classList.add('was-validated');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Sending...
        `;

        try {
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
            form.classList.remove('was-validated');
        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
};

// Info Card Animation
const initInfoCards = () => {
    const cards = document.querySelectorAll('.info-card');

    // Only add hover effects on non-touch devices
    if (!isTouchDevice()) {
        cards.forEach(card => {
            const icon = card.querySelector('.info-icon');

            card.addEventListener('mouseenter', () => {
                icon.style.transform = 'rotateY(180deg)';
            });

            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'rotateY(0)';
            });
        });
    } else {
        // For touch devices, add a small animation on click
        cards.forEach(card => {
            const icon = card.querySelector('.info-icon');

            card.addEventListener('click', () => {
                icon.style.transform = 'rotateY(180deg)';
                setTimeout(() => {
                    icon.style.transform = 'rotateY(0)';
                }, 500);
            });
        });
    }
};

// Social Card Animation
const initSocialCards = () => {
    const cards = document.querySelectorAll('.social-card');

    // Only add hover effects on non-touch devices
    if (!isTouchDevice()) {
        cards.forEach(card => {
            const icon = card.querySelector('.social-icon');

            card.addEventListener('mouseenter', () => {
                icon.style.transform = 'rotateY(180deg)';
            });

            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'rotateY(0)';
            });
        });
    }
};

// Notification System
const showNotification = (message, type = 'success') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
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
    if (window.innerWidth > 768 && !isTouchDevice()) {
        const hero = document.querySelector('.contact-hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            });
        }
    }
};

// Stats Animation
const initStatsAnimation = () => {
    const stats = document.querySelectorAll('.stat-item');

    // Only add hover effects on non-touch devices
    if (!isTouchDevice()) {
        stats.forEach(stat => {
            const icon = stat.querySelector('.stat-icon');

            stat.addEventListener('mouseenter', () => {
                icon.style.transform = 'rotateY(180deg)';
            });

            stat.addEventListener('mouseleave', () => {
                icon.style.transform = 'rotateY(0)';
            });
        });
    }
};

// Handle viewport resize
const handleResize = () => {
    // Reinitialize any size-dependent features
    if (window.innerWidth <= 768) {
        // Mobile specific adjustments
        document.querySelectorAll('.stat-item, .info-card, .social-card').forEach(item => {
            item.classList.add('mobile-optimized');
        });
    } else {
        document.querySelectorAll('.mobile-optimized').forEach(item => {
            item.classList.remove('mobile-optimized');
        });
    }
};

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initInfoCards();
    initSocialCards();
    initSmoothScroll();
    initParallax();
    initStatsAnimation();

    // Call once at start
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);
}); 