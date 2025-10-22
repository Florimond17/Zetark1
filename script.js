// ========================================
// CAROUSEL FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Carousel Partners
    const partners = [
        { logo: '🇫🇷', name: 'La French Tech' },
        { logo: '🏢', name: 'Bpifrance' },
        { logo: '🌟', name: 'France Num' },
        { logo: '🔷', name: 'CCI Hauts-de-France' },
        { logo: '💼', name: 'Réseau Entreprendre' }
    ];
    
    let currentPartnerIndex = 0;
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselSlide = document.querySelector('.carousel-slide');
    
    function updateCarousel() {
        const partner = partners[currentPartnerIndex];
        const partnerLogo = carouselSlide.querySelector('.partner-logo');
        const partnerName = carouselSlide.querySelector('.partner-name');
        
        if (partnerLogo && partnerName) {
            // Animation de sortie
            carouselSlide.style.opacity = '0';
            carouselSlide.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                partnerLogo.textContent = partner.logo;
                partnerName.textContent = partner.name;
                
                // Animation d'entrée
                carouselSlide.style.opacity = '1';
                carouselSlide.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentPartnerIndex = (currentPartnerIndex - 1 + partners.length) % partners.length;
            updateCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentPartnerIndex = (currentPartnerIndex + 1) % partners.length;
            updateCarousel();
        });
    }
    
    // Style pour les transitions du carousel
    if (carouselSlide) {
        carouselSlide.style.transition = 'all 0.3s ease';
    }
    
    // Auto-play carousel (optionnel)
    setInterval(() => {
        if (nextBtn) {
            currentPartnerIndex = (currentPartnerIndex + 1) % partners.length;
            updateCarousel();
        }
    }, 5000);
    
});

// ========================================
// SMOOTH SCROLL
// ========================================
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

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de services et autres éléments
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .why-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroBackground = document.querySelector('.hero-background-placeholder');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ========================================
// HEADER SHRINK ON SCROLL
// ========================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '0.5rem 2rem';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.padding = '1rem 2rem';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// MOBILE MENU TOGGLE (si nécessaire)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Détection mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const nav = document.querySelector('nav');
        
        // Créer un bouton hamburger si nécessaire
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.8rem 1rem;
            font-size: 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            z-index: 1001;
        `;
        
        // Toggle menu sur mobile
        let menuOpen = false;
        mobileMenuBtn.addEventListener('click', function() {
            menuOpen = !menuOpen;
            if (menuOpen) {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'fixed';
                nav.style.top = '0';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.height = '100vh';
                nav.style.background = 'var(--dark-bg)';
                nav.style.paddingTop = '5rem';
                mobileMenuBtn.innerHTML = '✕';
            } else {
                nav.style.display = 'flex';
                nav.style.position = 'static';
                nav.style.height = 'auto';
                mobileMenuBtn.innerHTML = '☰';
            }
        });
        
        // Ajouter le bouton au header uniquement sur mobile
        if (isMobile && !document.querySelector('.mobile-menu-btn')) {
            mobileMenuBtn.classList.add('mobile-menu-btn');
            document.body.appendChild(mobileMenuBtn);
        }
    }
});

// ========================================
// CLIENTS SCROLL - DUPLICATION DYNAMIQUE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const clientsTrack = document.querySelector('.clients-track');
    
    if (clientsTrack) {
        // Dupliquer les éléments pour un défilement infini fluide
        const items = clientsTrack.innerHTML;
        clientsTrack.innerHTML += items;
    }
});

// ========================================
// FORMULAIRE CONTACT (si ajouté plus tard)
// ========================================
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Exemple de validation
    const form = e.target;
    const formData = new FormData(form);
    
    // Simuler l'envoi
    console.log('Formulaire soumis:', Object.fromEntries(formData));
    
    // Afficher un message de confirmation
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
    form.reset();
}

// ========================================
// ANIMATION NUMBERS (pour statistiques futures)
// ========================================
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateNumber();
                observer.disconnect();
            }
        });
        
        observer.observe(number);
    });
}

// Appeler au chargement
document.addEventListener('DOMContentLoaded', animateNumbers);

// ========================================
// ACCESSIBILITY - KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', function(e) {
    // ESC pour fermer les menus déroulants
    if (e.key === 'Escape') {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
});

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});