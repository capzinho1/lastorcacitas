// ========================================
// SISTEMA DE TEMAS
// ========================================

function setTheme(themeName) {
    document.body.classList.remove('theme-rustic', 'theme-minimal', 'theme-colorful');
    document.body.classList.add('theme-' + themeName);
    localStorage.setItem('selectedTheme', themeName);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'colorful';
    setTheme(savedTheme);
});


// ========================================
// VARIABLES GLOBALES (INDISPENSABLES)
// ========================================
let cabinSliderIndex = 0;
let poolSliderIndex = 0;
let restaurantSliderIndex = 0;
let campingSliderIndex = 0;


// ========================================
// LÓGICA DE SLIDERS (MOVIMIENTO)
// ========================================

// 1. SLIDER CABAÑAS
function moveCabinSlider(direction) {
    const track = document.getElementById('cabinSliderTrack');
    if (!track) return;
    const slides = track.querySelectorAll('.slider-slide');
    
    cabinSliderIndex += direction;
    
    // Loop infinito
    if (cabinSliderIndex < 0) cabinSliderIndex = slides.length - 1;
    if (cabinSliderIndex >= slides.length) cabinSliderIndex = 0;
    
    const offset = -cabinSliderIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    updateSliderDots('cabinSliderDots', cabinSliderIndex, slides.length);
}

// 2. SLIDER PISCINAS (Corregido a 1 imagen)
function movePoolSlider(direction) {
    const track = document.getElementById('poolSliderTrack');
    if (!track) return;
    const slides = track.querySelectorAll('.slider-slide');
    
    poolSliderIndex += direction;
    
    // Loop infinito
    if (poolSliderIndex < 0) poolSliderIndex = slides.length - 1;
    if (poolSliderIndex >= slides.length) poolSliderIndex = 0;
    
    // Movimiento del 100% (1 imagen completa)
    const offset = -poolSliderIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    updateSliderDots('poolSliderDots', poolSliderIndex, slides.length);
}

// 3. SLIDER RESTAURANTE
function moveRestaurantSlider(direction) {
    const track = document.getElementById('restaurantSliderTrack');
    if (!track) return;
    const slides = track.querySelectorAll('.slider-slide');
    
    restaurantSliderIndex += direction;
    
    if (restaurantSliderIndex < 0) restaurantSliderIndex = slides.length - 1;
    if (restaurantSliderIndex >= slides.length) restaurantSliderIndex = 0;
    
    const offset = -restaurantSliderIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    updateSliderDots('restaurantSliderDots', restaurantSliderIndex, slides.length);
}

// 4. SLIDER CAMPING
function moveCampingSlider(direction) {
    const track = document.getElementById('campingSliderTrack');
    if (!track) return;
    const slides = track.querySelectorAll('.slider-slide');
    
    campingSliderIndex += direction;
    
    if (campingSliderIndex < 0) campingSliderIndex = slides.length - 1;
    if (campingSliderIndex >= slides.length) campingSliderIndex = 0;
    
    const offset = -campingSliderIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    updateSliderDots('campingSliderDots', campingSliderIndex, slides.length);
}


// ========================================
// CONTROL POR PUNTOS (DOTS)
// ========================================

function goToSlide(sliderType, index) {
    if (sliderType === 'cabin') {
        cabinSliderIndex = index;
        const track = document.getElementById('cabinSliderTrack');
        track.style.transform = `translateX(${-index * 100}%)`;
        updateSliderDots('cabinSliderDots', index, track.querySelectorAll('.slider-slide').length);
        
    } else if (sliderType === 'pool') {
        poolSliderIndex = index;
        const track = document.getElementById('poolSliderTrack');
        track.style.transform = `translateX(${-index * 100}%)`;
        updateSliderDots('poolSliderDots', index, track.querySelectorAll('.slider-slide').length);
        
    } else if (sliderType === 'restaurant') {
        restaurantSliderIndex = index;
        const track = document.getElementById('restaurantSliderTrack');
        track.style.transform = `translateX(${-index * 100}%)`;
        updateSliderDots('restaurantSliderDots', index, track.querySelectorAll('.slider-slide').length);
        
    } else if (sliderType === 'camping') {
        campingSliderIndex = index;
        const track = document.getElementById('campingSliderTrack');
        track.style.transform = `translateX(${-index * 100}%)`;
        updateSliderDots('campingSliderDots', index, track.querySelectorAll('.slider-slide').length);
    }
}

function updateSliderDots(dotsId, currentIndex, totalSlides) {
    const dotsContainer = document.getElementById(dotsId);
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = ''; // Limpiar dots anteriores
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
        
        // Asignar el tipo de slider correcto al click
        let type = '';
        if (dotsId === 'cabinSliderDots') type = 'cabin';
        else if (dotsId === 'poolSliderDots') type = 'pool';
        else if (dotsId === 'restaurantSliderDots') type = 'restaurant';
        else if (dotsId === 'campingSliderDots') type = 'camping';
        
        dot.onclick = () => goToSlide(type, i);
        dotsContainer.appendChild(dot);
    }
}


// ========================================
// INICIALIZACIÓN
// ========================================

function initSliders() {
    // Configuración común para todos los sliders
    // Tiempo reducido a 4250ms como pediste
    const time = 4250; 

    // Cabañas
    const cabinTrack = document.getElementById('cabinSliderTrack');
    if (cabinTrack) {
        updateSliderDots('cabinSliderDots', 0, cabinTrack.querySelectorAll('.slider-slide').length);
        setInterval(() => moveCabinSlider(1), time);
    }

    // Piscinas
    const poolTrack = document.getElementById('poolSliderTrack');
    if (poolTrack) {
        updateSliderDots('poolSliderDots', 0, poolTrack.querySelectorAll('.slider-slide').length);
        setInterval(() => movePoolSlider(1), time);
    }

    // Restaurante
    const restTrack = document.getElementById('restaurantSliderTrack');
    if (restTrack) {
        updateSliderDots('restaurantSliderDots', 0, restTrack.querySelectorAll('.slider-slide').length);
        setInterval(() => moveRestaurantSlider(1), time);
    }

    // Camping
    const campTrack = document.getElementById('campingSliderTrack');
    if (campTrack) {
        updateSliderDots('campingSliderDots', 0, campTrack.querySelectorAll('.slider-slide').length);
        setInterval(() => moveCampingSlider(1), time);
    }
}


// ========================================
// GESTOS TÁCTILES (SWIPE)
// ========================================

function setupTouchSliders() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Seleccionar todos los sliders
    const sliders = [
        { el: document.querySelector('.cabin-slider'), type: 'cabin' },
        { el: document.querySelector('.pools-slider'), type: 'pool' },
        { el: document.querySelector('.restaurant-slider'), type: 'restaurant' },
        { el: document.querySelector('#camping .cabin-slider'), type: 'camping' }
    ];
    
    sliders.forEach(slider => {
        if (!slider.el) return;
        
        slider.el.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        slider.el.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture(slider.type);
        }, {passive: true});
    });
    
    function handleGesture(type) {
        if (touchEndX < touchStartX - 50) { // Deslizar izquierda (Siguiente)
            if (type === 'cabin') moveCabinSlider(1);
            if (type === 'pool') movePoolSlider(1);
            if (type === 'restaurant') moveRestaurantSlider(1);
            if (type === 'camping') moveCampingSlider(1);
        }
        if (touchEndX > touchStartX + 50) { // Deslizar derecha (Anterior)
            if (type === 'cabin') moveCabinSlider(-1);
            if (type === 'pool') movePoolSlider(-1);
            if (type === 'restaurant') moveRestaurantSlider(-1);
            if (type === 'camping') moveCampingSlider(-1);
        }
    }
}


// ========================================
// INTERACCIÓN UI (MENÚ, SCROLL)
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initSliders();
    setupTouchSliders();
    setupSmoothScroll();
    setupLazyLoading();
    
    // Menú Hamburguesa
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Cerrar al clickear enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    console.log('Sitio web cargado correctamente.');
});

// Sombra en Navbar al hacer scroll


// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Lazy Loading simple
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => img.src = img.dataset.src);
    } else {
        // Fallback script para navegadores viejos podría ir aquí
    }
}

// Detección Tema Oscuro del sistema
if (!localStorage.getItem('selectedTheme') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('minimal');
}