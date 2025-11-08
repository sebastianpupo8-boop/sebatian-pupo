// Smooth scroll para los enlaces del menú
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

// Cambiar estilo del navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animación al hacer scroll - elementos aparecen
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

// Aplicar animación a las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .project-card, .skill-category');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Manejo del formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ahora solo mostraremos un mensaje
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        // Simular envío
        setTimeout(() => {
            button.textContent = '¡Mensaje Enviado! ✓';
            button.style.background = '#48bb78';
            
            // Resetear formulario
            this.reset();
            
            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 2000);
    });
}

// Efecto de escritura en el hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Contador animado para las estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Activar contadores cuando sean visibles
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statItems = document.querySelectorAll('.stat-item h4');
            statItems.forEach((item, index) => {
                const targets = [3, 50, 30]; // Valores de tus estadísticas
                animateCounter(item, targets[index]);
            });
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Menú responsive (hamburguesa) - opcional
function createMobileMenu() {
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar .container');
        if (!document.querySelector('.menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--dark);
            `;
            
            navbar.appendChild(menuToggle);
            
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = 'none';
            
            menuToggle.addEventListener('click', function() {
                if (navLinks.style.display === 'none') {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '60px';
                    navLinks.style.right = '20px';
                    navLinks.style.background = 'white';
                    navLinks.style.padding = '20px';
                    navLinks.style.borderRadius = '10px';
                    navLinks.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
                } else {
                    navLinks.style.display = 'none';
                }
            });
        }
    }
}

window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

console.log('🚀 Portafolio cargado exitosamente!');