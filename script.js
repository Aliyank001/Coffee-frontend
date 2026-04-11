// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE NAV TOGGLE =====
function openMobileNav() {
    if (mobileNav) {
        mobileNav.classList.add('open');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileNav() {
    if (mobileNav) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (mobileNav && mobileNav.classList.contains('open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });
}

if (mobileClose) {
    mobileClose.addEventListener('click', () => {
        closeMobileNav();
    });
}

// Close mobile nav when clicking a mobile link
document.addEventListener('click', (e) => {
    if (!e.target.closest) return;
    const link = e.target.closest('.mobile-menu a');
    if (link) closeMobileNav();
});

// Close on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
});

// ===== SMOOTH SCROLLING FOR NAV LINKS =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAV CTA BUTTON (ORDER NOW) =====
const navCtaBtn = document.querySelector('.nav-cta');
if (navCtaBtn) {
    navCtaBtn.addEventListener('click', () => {
        const reservationSection = document.querySelector('.reservation');
        if (reservationSection) {
            reservationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ===== HERO BUTTONS FUNCTIONALITY =====
const orderOnlineBtn = document.getElementById('orderOnlineBtn');
const viewMenuBtn = document.getElementById('viewMenuBtn');

if (orderOnlineBtn) {
    orderOnlineBtn.addEventListener('click', () => {
        const reservationSection = document.querySelector('.reservation');
        if (reservationSection) {
            reservationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

if (viewMenuBtn) {
    viewMenuBtn.addEventListener('click', () => {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ===== BUTTON CLICK EFFECTS =====
const allButtons = document.querySelectorAll('.btn, .nav-cta');

allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== HERO CONTENT FADE IN ON LOAD =====
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease-out';
        heroContent.style.opacity = '1';
    }, 100);
});

// ===== PARALLAX EFFECT FOR HERO BACKGROUND =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            } else if (hero) {
                hero.style.transform = 'translateY(0)';
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// ===== ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section');

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
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== MENU TABS FUNCTIONALITY =====
const tabButtons = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all tabs and categories
        tabButtons.forEach(btn => btn.classList.remove('active'));
        menuCategories.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to clicked tab
        button.classList.add('active');
        
        // Show corresponding category
        const category = button.getAttribute('data-category');
        const targetCategory = document.getElementById(category);
        if (targetCategory) {
            targetCategory.classList.add('active');
        }
    });
});

// ===== SCROLL ANIMATIONS (INTERSECTION OBSERVER) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.about-content, .bestseller-card, .menu-item, .gallery-item, .testimonial-card, .info-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===== RESERVATION FORM HANDLING =====
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(reservationForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const date = formData.get('date');
        const time = formData.get('time');
        const guests = formData.get('guests');
        
        // Show success message
        alert(`Thank you, ${name}! Your table for ${guests} guest(s) has been reserved for ${date} at ${time}. We'll contact you at ${phone} to confirm.`);
        
        // Reset form
        reservationForm.reset();
    });
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        
        // Show success message
        alert(`Thank you for reaching out, ${name}! We've received your message and will get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// ===== ADD TO CART FUNCTIONALITY =====
const addToCartButtons = document.querySelectorAll('.add-btn');
let cart = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const card = this.closest('.bestseller-card');
        const itemName = card.querySelector('h3').textContent;
        const itemPrice = card.querySelector('.price').textContent;
        
        // Add to cart array
        cart.push({ name: itemName, price: itemPrice });
        
        // Visual feedback
        this.textContent = 'Added ✓';
        this.style.background = '#4CAF50';
        this.style.color = 'white';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = '';
            this.style.color = '';
        }, 1500);
        
        // Log cart (in real app, this would update cart UI)
        console.log('Cart:', cart);
    });
});

// ===== GALLERY LIGHTBOX EFFECT =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const imgSrc = img.getAttribute('src');
        
        // Create lightbox (simple version)
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = imgSrc;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.2);
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Close on click
        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
    });
});

// ===== SET MINIMUM DATE FOR RESERVATION =====
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ===== SMOOTH REVEAL ON SCROLL =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-title, .section-subtitle, .section-label');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial styles for reveal elements
document.querySelectorAll('.section-title, .section-subtitle, .section-label').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial call

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c☕ Welcome to Café Aroma', 'font-size: 20px; font-weight: bold; color: #6F4E37;');
console.log('%cEnjoy our premium coffee experience!', 'font-size: 14px; color: #D4A574;');

// ===== PERFORMANCE: LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

