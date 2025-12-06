// ========================================
// SMOOTH SCROLL
// ========================================

/**
 * Navegación suave entre secciones
 */

const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    // Ignore si el href es solo "#"
    if (targetId === '#') return;
    
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

/**
 * Muestra/oculta el botón de scroll to top
 * y maneja el click para volver arriba
 */

const scrollTopBtn = document.getElementById('scroll-top');
const SCROLL_THRESHOLD = 500; // Píxeles antes de mostrar el botón

function toggleScrollTopButton() {
  if (window.scrollY >= SCROLL_THRESHOLD) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}

// Mostrar/ocultar botón al hacer scroll
window.addEventListener('scroll', toggleScrollTopButton);

// Click para volver arriba
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// HEADER SHADOW ON SCROLL
// ========================================

/**
 * Añade sombra al header cuando se hace scroll
 */

const header = document.getElementById('header');

function addHeaderShadow() {
  if (window.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}

window.addEventListener('scroll', addHeaderShadow);