document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    const progressBar = document.getElementById('progressBar');

    totalSlidesSpan.textContent = totalSlides;

    function updatePresentation() {
        // Actualizar visibilidad y animaciones
        slides.forEach((slide, index) => {
            if(index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Actualizar contadores
        currentSlideSpan.textContent = currentIndex + 1;

        // Actualizar barra de progreso (porcentaje)
        const progressPercentage = (currentIndex / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function nextSlide() {
        if(currentIndex < totalSlides - 1) {
            currentIndex++;
            updatePresentation();
        }
    }

    function prevSlide() {
        if(currentIndex > 0) {
            currentIndex--;
            updatePresentation();
        }
    }

    // Eventos de botones UI
    document.getElementById('nextBtn').addEventListener('click', nextSlide);
    document.getElementById('prevBtn').addEventListener('click', prevSlide);

    // Navegación por clics en pantalla (evitando los controles)
    document.getElementById('presentation-container').addEventListener('click', (e) => {
        if (!e.target.closest('.controls')) {
            nextSlide();
        }
    });

    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') {
            nextSlide();
        } else if(e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // --- Lógica para pantallas táctiles (Swipe) ---
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50; // Distancia mínima para considerar que fue un 'swipe'
        if (touchEndX < touchStartX - threshold) {
            // Swipe a la izquierda (Siguiente)
            nextSlide();
        }
        if (touchEndX > touchStartX + threshold) {
            // Swipe a la derecha (Anterior)
            prevSlide();
        }
    }

    // Inicializar estado
    updatePresentation();
});