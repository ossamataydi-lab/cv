/* ===========================
   MODERN CV - JAVASCRIPT INTERACTIVITY
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
    initSmoothScroll();
    initFormValidation();
    initScrollAnimations();
    initHoverEffects();
});

// ===========================
// SCROLL TO TOP FUNCTIONALITY
// ===========================
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ===========================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const closeButton = document.querySelector('.navbar-toggler');
                    closeButton.click();
                }
            }
        });
    });
}

// ===========================
// FORM VALIDATION & SUBMISSION
// ===========================
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: contactForm.querySelector('input[placeholder="Your Name"]').value,
                email: contactForm.querySelector('input[placeholder="Your Email"]').value,
                subject: contactForm.querySelector('input[placeholder="Subject"]').value,
                message: contactForm.querySelector('textarea[placeholder="Your Message"]').value
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

// ===========================
// EMAIL VALIDATION
// ===========================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    notification.setAttribute('role', 'alert');
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.style.animation = 'slideInRight 0.3s ease-out';

    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// ===========================
// SCROLL ANIMATIONS
// ===========================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and content items
    document.querySelectorAll('.skill-card, .project-card, .timeline-content, .stat-box').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ===========================
// HOVER EFFECTS
// ===========================
function initHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
        });
    });

    // Add glow effect to cards on hover
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// ===========================
// DYNAMIC TYPING EFFECT
// ===========================
function initTypingEffect() {
    const subtitles = [
        'Full Stack Developer',
        'Web Designer',
        'Digital Innovator',
        'Problem Solver'
    ];

    let subtitleIndex = 0;
    const subtitleElement = document.querySelector('.subtitle');

    if (subtitleElement) {
        setInterval(() => {
            subtitleElement.textContent = subtitles[subtitleIndex];
            subtitleIndex = (subtitleIndex + 1) % subtitles.length;
        }, 4000);
    }
}

// ===========================
// SKILLS PROGRESS ANIMATION
// ===========================
function animateProgressBars() {
    const skillItems = document.querySelectorAll('.skill-progress');

    skillItems.forEach(item => {
        const progress = item.getAttribute('data-progress');
        const progressBar = item.querySelector('.progress-bar');

        if (progressBar && isElementInViewport(item)) {
            progressBar.style.width = progress + '%';
        }
    });
}

// ===========================
// UTILITY FUNCTION: CHECK IF ELEMENT IN VIEWPORT
// ===========================
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===========================
// PARALLAX EFFECT ON SCROLL
// ===========================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===========================
// NAVIGATION ACTIVE STATE
// ===========================
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===========================
// STATISTICS COUNTER
// ===========================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        if (isElementInViewport(counter)) {
            updateCounter();
        }
    });
}

// ===========================
// THEME TOGGLE (OPTIONAL)
// ===========================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });

        // Load saved theme
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
        }
    }
}

// ===========================
// ENHANCED PAGE PERFORMANCE
// ===========================
// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-lazy]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.getAttribute('data-lazy');
                    entry.target.removeAttribute('data-lazy');
                    imageObserver.unobserve(entry.target);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.getAttribute('data-lazy');
        });
    }
}

// ===========================
// MOBILE MENU CLOSE ON LINK CLICK
// ===========================
function initMobileMenuClose() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// ===========================
// INITIALIZE ALL ON LOAD
// ===========================
window.addEventListener('load', function() {
    initTypingEffect();
    initParallax();
    initActiveNavigation();
    animateCounters();
    lazyLoadImages();
    initMobileMenuClose();
});

// ===========================
// CSS ANIMATIONS INJECTION
// ===========================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav-link.active {
        color: #6366f1 !important;
        background: rgba(99, 102, 241, 0.1);
    }

    .light-mode {
        background: #f5f5f5 !important;
        color: #333 !important;
    }

    .light-mode .navbar {
        background: rgba(255, 255, 255, 0.9) !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
    }

    .light-mode .navbar-nav .nav-link {
        color: #333 !important;
    }

    .light-mode .section-light {
        background: rgba(240, 240, 240, 0.8) !important;
    }

    .light-mode .skill-card,
    .light-mode .project-card,
    .light-mode .timeline-content {
        background: rgba(255, 255, 255, 0.9) !important;
        color: #333 !important;
    }

    .light-mode .skill-card:hover,
    .light-mode .project-card:hover {
        background: rgba(255, 255, 255, 1) !important;
    }
`;
document.head.appendChild(styleSheet);

console.log('✨ Modern CV loaded successfully!');
