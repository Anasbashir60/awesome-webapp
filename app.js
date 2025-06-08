// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initProgressBar();
    initSmoothScrolling();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initChart();
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
    // Add smooth scroll behavior to navigation links
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

// Smooth scroll function
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
            const sectionHeight = section.clientHeight;
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
                
                // Trigger specific animations based on element type
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
    
    // Observe elements for animation
    document.querySelectorAll('.market-stat, .impact-stat, .financial-stat, .founder-skills, .service-card, .niche-card').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initCounters() {
    // Hero section counter
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
        
        // Format the number based on its size
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

// Chart Initialization
function initChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2'],
            datasets: [{
                label: 'Revenue',
                data: [43200, 53140],
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8B5CF6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }, {
                label: 'Profit',
                data: [41220, 50100],
                borderColor: '#A78BFA',
                backgroundColor: 'rgba(167, 139, 250, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#A78BFA',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#F9FAFB',
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(107, 114, 128, 0.3)'
                    },
                    ticks: {
                        color: '#9CA3AF',
                        callback: function(value) {
                            return '€' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(107, 114, 128, 0.3)'
                    },
                    ticks: {
                        color: '#9CA3AF'
                    }
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Particle Animation
function initParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    // Create additional floating particles
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

// Add CSS for floating particles
const floatingParticleCSS = `
@keyframes float {
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = floatingParticleCSS;
document.head.appendChild(style);

// Add CSS for animation states
const animationCSS = `
.animate-in {
    animation: slideInUp 0.8s ease-out forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.service-card, .niche-card, .market-stat, .impact-stat {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
}

.service-card.animate-in, .niche-card.animate-in, .market-stat.animate-in, .impact-stat.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.nav-link.active {
    color: #8B5CF6;
}

.nav-link.active::after {
    width: 100%;
}
`;

const animationStyle = document.createElement('style');
animationStyle.textContent = animationCSS;
document.head.appendChild(animationStyle);

// Contact CTA functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactCTA = document.querySelector('.contact-cta');
    if (contactCTA) {
        contactCTA.addEventListener('click', function() {
            // Create email subject and body
            const subject = encodeURIComponent('Professional Card Application - Zapmation');
            const body = encodeURIComponent(`Dear Professional Card Committee,

I am writing to request the approval of my professional card application for Zapmation, an AI automation agency focused on serving Belgian SMEs.

Company Details:
- Name: Zapmation
- Applicant: Anas Bashir
- Business Focus: AI Automation Solutions for Belgian SMEs
- Projected 2-Year Revenue: €96,340
- Expected Tax Contribution: €13,700+ over 2 years

I have prepared a comprehensive business plan demonstrating strong market opportunity, technical capability, and positive economic impact for Brussels.

Please review my application at your earliest convenience. I am available for any additional information or documentation required.

Best regards,
Anas Bashir
Founder, Zapmation
anas@zapmation.com`);
            
            // Open email client
            window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
        });
    }
});

// Add hover effects for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Tech item hover effects
document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(31, 41, 55, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(31, 41, 55, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
});

// Loading animation for the page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(function() {
    // Scroll-related functions are already called above
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);