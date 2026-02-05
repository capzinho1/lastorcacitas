// ========================================
// SISTEMA DE TEMAS
// ========================================

function setTheme(themeName) {
    // Remover todas las clases de tema
    document.body.classList.remove('theme-rustic', 'theme-minimal', 'theme-colorful');
    
    // Agregar la clase del tema seleccionado
    document.body.classList.add('theme-' + themeName);
    
    // Guardar preferencia en localStorage
    localStorage.setItem('selectedTheme', themeName);
    
    // Feedback visual
    console.log('Tema cambiado a:', themeName);
}

// Cargar tema guardado al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'rustic';
    setTheme(savedTheme);
});


// ========================================
// SLIDERS
// ========================================

// Variables globales para sliders
let cabinSliderIndex = 0;
let poolSliderIndex = 0;
let restaurantSliderIndex = 0;
let campingSliderIndex = 0; // Agregado para el camping

// --- Slider de Cabañas ---
function moveCabinSlider(direction) {
    const track = document.getElementById('cabinSliderTrack');
    if (!track) return;

    const slides = track.querySelectorAll('.slider-slide');
    const totalSlides = slides.length;
    
    cabinSliderIndex += direction;
    
    if (cabinSliderIndex < 0) {
        cabinSliderIndex = totalSlides - 1;
    } else if (cabinSliderIndex >= totalSlides) {
        cabinSliderIndex = 0;
    }
    
    const offset = -cabinSliderIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    updateSliderDots('cabinSliderDots', cabinSliderIndex, totalSlides);
}

// --- Slider de Piscinas ---
function movePoolSlider(direction) {
    const track = document.getElementById('poolSliderTrack');
    if (!track) return;
    
    const slides = track.querySelectorAll('.slider-slide');
    const totalSlides = slides.length;
    
    // Detectar si estamos en móvil (1 imagen) o escritorio (3 imágenes)
    const isMobile = window.innerWidth <= 768;
    const slidesPerView = isMobile ? 1 : 3;
    const slideWidth = isMobile ? 100 : 33.333;
    
    poolSliderIndex += direction;
    
    // Calcular el máximo índice permitido
    const maxIndex = Math.max(0, totalSlides - slidesPerView);
    
    if (poolSliderIndex < 0) {
        poolSliderIndex = maxIndex;
    } else if (poolSliderIndex > maxIndex) {
        poolSliderIndex = 0;
    }
    
    const offset = -poolSliderIndex * slideWidth;
    track.style.transform = `translateX(${offset}%)`;
    
    updateSliderDots('poolSliderDots', poolSliderIndex, totalSlides);
}

// --- Slider de Restaurante ---
// --- Slider de Restaurante (CORREGIDO PARA 1 IMAGEN) ---
function moveRestaurantSlider(direction) {
    const track = document.getElementById('restaurantSliderTrack');
    if (!track) return;
    
    const slides = track.querySelectorAll('.slider-slide');
    const totalSlides = slides.length;
    
    // Eliminamos la lógica de "isMobile ? 1 : 2". Ahora siempre es 1.
    
    restaurantSliderIndex += direction;
    
    if (restaurantSliderIndex < 0) {
        restaurantSliderIndex = totalSlides - 1;
    } else if (restaurantSliderIndex >= totalSlides) {
        restaurantSliderIndex = 0;
    }
    
    // El desplazamiento siempre es del 100% del ancho
    const offset = -restaurantSliderIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    updateSliderDots('restaurantSliderDots', restaurantSliderIndex, totalSlides);
}
// --- Slider de Camping (NUEVO) ---
function moveCampingSlider(direction) {
    const track = document.getElementById('campingSliderTrack');
    if (!track) return;
    
    const slides = track.querySelectorAll('.slider-slide');
    const totalSlides = slides.length;
    
    campingSliderIndex += direction;
    
    if (campingSliderIndex < 0) {
        campingSliderIndex = totalSlides - 1;
    } else if (campingSliderIndex >= totalSlides) {
        campingSliderIndex = 0;
    }
    
    const offset = -campingSliderIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    updateSliderDots('campingSliderDots', campingSliderIndex, totalSlides);
}

// --- Ir a slide específico (Dots) ---
function goToSlide(sliderType, index) {
    if (sliderType === 'cabin') {
        const track = document.getElementById('cabinSliderTrack');
        if (!track) return;
        const slides = track.querySelectorAll('.slider-slide');
        cabinSliderIndex = index;
        const offset = -cabinSliderIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        updateSliderDots('cabinSliderDots', cabinSliderIndex, slides.length);

    } else if (sliderType === 'pool') {
        const track = document.getElementById('poolSliderTrack');
        if (!track) return;
        const slides = track.querySelectorAll('.slider-slide');
        const isMobile = window.innerWidth <= 768;
        const slidesPerView = isMobile ? 1 : 3;
        const slideWidth = isMobile ? 100 : 33.333;
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        
        poolSliderIndex = Math.min(index, maxIndex);
        const offset = -poolSliderIndex * slideWidth;
        track.style.transform = `translateX(${offset}%)`;
        updateSliderDots('poolSliderDots', poolSliderIndex, slides.length);

    } else if (sliderType === 'restaurant') {
    } else if (sliderType === 'restaurant') {
        const track = document.getElementById('restaurantSliderTrack');
        if (!track) return;
        const slides = track.querySelectorAll('.slider-slide');
        
        // Simplificado para comportarse igual que las cabañas (1 imagen)
        restaurantSliderIndex = index;
        const offset = -restaurantSliderIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        updateSliderDots('restaurantSliderDots', restaurantSliderIndex, slides.length);

    } else if (sliderType === 'camping') { // Agregado Camping
        const track = document.getElementById('campingSliderTrack');
        if (!track) return;
        const slides = track.querySelectorAll('.slider-slide');
        campingSliderIndex = index;
        const offset = -campingSliderIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        updateSliderDots('campingSliderDots', campingSliderIndex, slides.length);
    }
}

// --- Actualizar indicadores visuales ---
function updateSliderDots(dotsId, currentIndex, totalSlides) {
    const dotsContainer = document.getElementById(dotsId);
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
        dot.onclick = () => {
            if (dotsId === 'cabinSliderDots') {
                goToSlide('cabin', i);
            } else if (dotsId === 'poolSliderDots') {
                goToSlide('pool', i);
            } else if (dotsId === 'restaurantSliderDots') {
                goToSlide('restaurant', i);
            } else if (dotsId === 'campingSliderDots') {
                goToSlide('camping', i);
            }
        };
        dotsContainer.appendChild(dot);
    }
}

// --- Inicializar todos los sliders ---
function initSliders() {
    // Cabañas
    const cabinTrack = document.getElementById('cabinSliderTrack');
    if (cabinTrack) {
        const cabinSlides = cabinTrack.querySelectorAll('.slider-slide');
        updateSliderDots('cabinSliderDots', 0, cabinSlides.length);
        // Tiempo reducido a 4250ms (15% menos de 5000)
        setInterval(() => moveCabinSlider(1), 4250); 
    }
    
    // Piscinas
    const poolTrack = document.getElementById('poolSliderTrack');
    if (poolTrack) {
        const poolSlides = poolTrack.querySelectorAll('.slider-slide');
        updateSliderDots('poolSliderDots', 0, poolSlides.length);
        
        window.addEventListener('resize', () => {
            poolSliderIndex = 0;
            movePoolSlider(0);
        });
        // Tiempo reducido a 4250ms
        setInterval(() => movePoolSlider(1), 4250);
    }
    
    // Restaurante
// Restaurante
const restaurantTrack = document.getElementById('restaurantSliderTrack');
if (restaurantTrack) {
    const restaurantSlides = restaurantTrack.querySelectorAll('.slider-slide');
    updateSliderDots('restaurantSliderDots', 0, restaurantSlides.length);
    // Tiempo reducido a 4250ms
    setInterval(() => moveRestaurantSlider(1), 4250);
}

    // Camping
    const campingTrack = document.getElementById('campingSliderTrack');
    if (campingTrack) {
        const campingSlides = campingTrack.querySelectorAll('.slider-slide');
        updateSliderDots('campingSliderDots', 0, campingSlides.length);
        // Tiempo reducido a 4250ms
        setInterval(() => moveCampingSlider(1), 4250);
    }
}

// --- Soporte táctil (Swipe) ---
function setupTouchSliders() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const cabinSlider = document.querySelector('.cabin-slider');
    const poolSlider = document.querySelector('.pools-slider');
    const restaurantSlider = document.querySelector('.restaurant-slider');
    const campingSlider = document.querySelector('#camping .cabin-slider'); // Selector específico para camping
    
    function handleSwipe(slider, sliderType) {
        if (!slider) return;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture(sliderType);
        });
    }
    
    function handleGesture(sliderType) {
        if (touchEndX < touchStartX - 50) { // Swipe Left (Siguiente)
            if (sliderType === 'cabin') moveCabinSlider(1);
            else if (sliderType === 'pool') movePoolSlider(1);
            else if (sliderType === 'restaurant') moveRestaurantSlider(1);
            else if (sliderType === 'camping') moveCampingSlider(1);
        }
        
        if (touchEndX > touchStartX + 50) { // Swipe Right (Anterior)
            if (sliderType === 'cabin') moveCabinSlider(-1);
            else if (sliderType === 'pool') movePoolSlider(-1);
            else if (sliderType === 'restaurant') moveRestaurantSlider(-1);
            else if (sliderType === 'camping') moveCampingSlider(-1);
        }
    }
    
    handleSwipe(cabinSlider, 'cabin');
    handleSwipe(poolSlider, 'pool');
    handleSwipe(restaurantSlider, 'restaurant');
    handleSwipe(campingSlider, 'camping');
}


// ========================================
// MENÚ RESPONSIVE
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        navMenu.classList.remove('active');
        if(menuToggle) menuToggle.classList.remove('active');
    }
    lastScroll = currentScroll;
});


// ========================================
// NAVBAR CON EFECTO AL SCROLL
// ========================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        navbar.style.padding = '12px 0';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '20px 0';
    }
});


// ========================================
// ANIMACIONES AL SCROLL
// ========================================

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(`
        .feature-box,
        .service-card,
        .feature-item,
        .section-header,
        .location-item,
        .pool-feature-card
    `);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        el.style.transitionDelay = `${index * 0.01}s`; // Pequeño retardo escalonado
        observer.observe(el);
    });
}


// ========================================
// SMOOTH SCROLL
// ========================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// ========================================
// LAZY LOADING
// ========================================

function setupLazyLoading() {
    // Excluir imágenes de sliders para evitar parpadeos en la animación
    const images = document.querySelectorAll('img[src]:not(.slider-slide img)');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '1'; 
        imageObserver.observe(img);
    });
}


// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initSliders();
    setupTouchSliders();
    setupScrollAnimations();
    setupSmoothScroll();
    setupLazyLoading();
    
    console.log('Las Torcacitas - Sitio web inicializado correctamente ✓');
});


// ========================================
// UTILIDADES TEMA DARK (OPCIONAL)
// ========================================

function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'minimal'; 
    }
    return 'rustic';
}

if (!localStorage.getItem('selectedTheme')) {
    const systemTheme = detectSystemTheme();
    setTheme(systemTheme);
}