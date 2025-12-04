// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================

/**
 * Maneja la apertura y cierre del menú móvil
 */

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Abrir menú
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

// Cerrar menú con botón X
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});

// Cerrar menú al hacer click fuera de él (solo en mobile)
document.addEventListener('click', (e) => {
  const isClickInsideMenu = navMenu.contains(e.target);
  const isClickOnToggle = navToggle.contains(e.target);
  
  if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
  }
});

// ========================================
// ACTIVE LINK ON SCROLL
// ========================================

/**
 * Activa el link del menú correspondiente a la sección visible
 */

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100; // Offset para el header sticky
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      correspondingLink?.classList.add('active-link');
    } else {
      correspondingLink?.classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);