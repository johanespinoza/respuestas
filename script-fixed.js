// Script para la landing page

document.addEventListener('DOMContentLoaded', function() {
    // Animación de scroll suave
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.section-header, .problem-card, .benefit-card, .content-item, .objection-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Efecto parallax suave en el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animación de contador para el precio
    const priceElement = document.querySelector('.price');
    if (priceElement) {
        const priceObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(priceElement, 0, 6.99, 2000);
                    priceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        priceObserver.observe(priceElement);
    }

    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * progress;
            element.textContent = current.toFixed(2);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Efecto hover en cards con animación suave
    const cards = document.querySelectorAll('.problem-card, .benefit-card, .content-item, .objection-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Validación de formulario (si se agrega en el futuro)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Efecto de typing en el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid #f59e0b';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Las imágenes se cargan normalmente sin efectos de fade-in

    // Efecto de partículas sutiles en el fondo
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = '#f59e0b';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.opacity = '0.6';
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        const duration = Math.random() * 3000 + 2000;
        const endY = startY - (Math.random() * 200 + 100);
        
        particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 0.6 },
            { transform: `translateY(-${endY}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }

    // Crear partículas periódicamente
    setInterval(createParticle, 500);

    // Efecto de onda en botones
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Agregar estilos para la animación de ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);

    console.log('Landing page cargada correctamente');
});
