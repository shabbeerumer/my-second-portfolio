// Typing effect
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['Full Stack Developer', 'Web Designer', 'Problem Solver'];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Particles effect
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
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
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
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
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Custom cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

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

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const updateNav = () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateNav);

// Newsletter form handling
document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    if (emailInput.value) {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
            submitBtn.style.background = '#28a745';
            emailInput.value = '';

            // Reset button after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    }
});

// Enhanced contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const inputs = contactForm.querySelectorAll('.form-control');

    // Add focus effects to form inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('input-focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('input-focused');
            }
        });
    });

    // Form submission handling
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate form
        if (!this.checkValidity()) {
            this.classList.add('was-validated');
            return;
        }

        // Show loading state
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Sending...
        `;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            showNotification('Message sent successfully!', 'success');

            // Reset form
            this.reset();
            this.classList.remove('was-validated');
            inputs.forEach(input => {
                input.parentElement.classList.remove('input-focused');
            });

        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Contact info items animation
document.querySelectorAll('.contact-info-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.icon-box');
        const iconInner = this.querySelector('.icon-box i');

        icon.style.transform = 'rotate(0deg)';
        iconInner.style.transform = 'rotate(0deg)';
    });

    item.addEventListener('mouseleave', function () {
        const icon = this.querySelector('.icon-box');
        const iconInner = this.querySelector('.icon-box i');

        icon.style.transform = 'rotate(45deg)';
        iconInner.style.transform = 'rotate(-45deg)';
    });
});

// Social links hover effect
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: var(--card-bg);
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 9999;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification i {
        font-size: 1.2rem;
    }

    .notification-success {
        border-left: 4px solid #28a745;
    }

    .notification-success i {
        color: #28a745;
    }

    .notification-error {
        border-left: 4px solid #dc3545;
    }

    .notification-error i {
        color: #dc3545;
    }
`;
document.head.appendChild(style);

// Footer links hover animation
document.querySelectorAll('.footer-links ul li a').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateX(10px)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateX(0)';
    });
});

// Add data-text attribute to section titles for background effect
document.querySelectorAll('.section-title').forEach(title => {
    title.setAttribute('data-text', title.textContent);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Project image hover effect
document.querySelectorAll('.project-card').forEach(card => {
    const img = card.querySelector('.project-img');

    card.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
    });

    card.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Animate skill progress bars when in view
const animateSkills = () => {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        const progressBars = card.querySelectorAll('.progress-bar');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('aria-valuenow') + '%';
                        bar.style.width = width;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(card);
    });
};

// Animate stats counter
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-info h4');

    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50; // Adjust speed of counting

        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(stat);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
    animateStats();
});

// Experience tabs functionality
document.addEventListener('DOMContentLoaded', () => {
    const expTabs = document.querySelectorAll('.exp-tab');
    const expContents = document.querySelectorAll('.exp-content');

    expTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            expTabs.forEach(t => t.classList.remove('active'));
            expContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('show');
                }, 100);
            } else {
                item.classList.remove('show');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize project items
window.addEventListener('load', () => {
    projectItems.forEach(item => {
        item.classList.add('show');
    });
});