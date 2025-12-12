// ========================================
// MOBILE MENU FUNCTIONALITY
// Optimizado para touch devices
// ========================================

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const body = document.body;

// Prevenir scroll cuando menu está abierto
function toggleBodyScroll(shouldLock) {
  if (shouldLock) {
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
  } else {
    body.style.overflow = '';
    body.style.position = '';
    body.style.width = '';
  }
}

// Abrir menú
if (navToggle) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.add('show-menu');
    if (window.innerWidth < 768) {
      toggleBodyScroll(true);
    }
  });
}

// Cerrar menú con botón X
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    toggleBodyScroll(false);
  });
}

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    toggleBodyScroll(false);
  });
});

// Cerrar menú al hacer click fuera de él
document.addEventListener('click', (e) => {
  const isClickInsideMenu = navMenu.contains(e.target);
  const isClickOnToggle = navToggle && navToggle.contains(e.target);
  
  if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
    toggleBodyScroll(false);
  }
});

// Cerrar menú con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
    toggleBodyScroll(false);
  }
});

// Cerrar menú al cambiar orientación
window.addEventListener('orientationchange', () => {
  if (navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
    toggleBodyScroll(false);
  }
});

// Cerrar menú al redimensionar ventana
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth >= 768 && navMenu.classList.contains('show-menu')) {
      navMenu.classList.remove('show-menu');
      toggleBodyScroll(false);
    }
  }, 250);
});

// ========================================
// ACTIVE LINK ON SCROLL
// ========================================

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      correspondingLink?.classList.add('active-link');
    } else {
      correspondingLink?.classList.remove('active-link');
    }
  });
}

// Throttle scroll event para mejor performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      scrollActive();
      scrollTimeout = null;
    }, 100);
  }
});

// Ejecutar al cargar
scrollActive();