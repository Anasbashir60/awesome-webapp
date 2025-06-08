// DOM Content Loaded Event
// Removed initChart call and contact CTA functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality except chart and contact
    initProgressBar();
    initSmoothScrolling();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initParticles();
    initNavHighlight();
});

// Progress Bar
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                smoothScrollTo(targetId.substring(1));
            }
        });
    });
}

function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navigation Active State
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('market-stat')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
                if (entry.target.classList.contains('impact-stat')) {
                    animateCounter(entry.target.querySelector('.impact-value'));
                }
                if (entry.target.classList.contains('financial-stat')) {
                    animateCounter(entry.target.querySelector('.stat-value'));
                }
                if (entry.target.classList.contains('founder-skills')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);
    document.querySelectorAll('.market-stat, .impact-stat, .financial-stat, .founder-skills, .service-card, .niche-card').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initCounters() {
    const heroCounter = document.querySelector('.hero .stat-value');
    if (heroCounter) {
        setTimeout(() => {
            animateCounter(heroCounter);
        }, 1000);
    }
}

function animateCounter(element) {
    if (!element || element.dataset.animated) return;
    const target = parseInt(element.dataset.value);
    if (isNaN(target)) return;
    element.dataset.animated = 'true';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        let displayValue;
        if (target >= 1000000) {
            displayValue = '€' + (current / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
            displayValue = '€' + Math.floor(current).toLocaleString();
        } else if (element.textContent.includes('%')) {
            displayValue = Math.floor(current) + '%';
        } else if (element.textContent.includes('+')) {
            displayValue = '€' + Math.floor(current).toLocaleString() + '+';
        } else {
            displayValue = Math.floor(current) + '+';
        }
        element.textContent = displayValue;
    }, 16);
}

// Skill Bar Animation
function initSkillBars() {
    // This will be triggered by intersection observer
}

function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.dataset.width;
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 300);
    });
}

// Particle Animation
function initParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: #8B5CF6;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        particles.appendChild(particle);
    }
}

// Add CSS for floating particles and animations as before...

// The rest of your code remains unchanged, just ensure all chart and contact us logic is removed.
