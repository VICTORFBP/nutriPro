// ========================================
// MAIN JAVASCRIPT FILE
// ========================================

/**
 * Este archivo coordina la inicialización de todos los módulos
 * y contiene funcionalidades generales
 */

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ NutriPro Landing Page loaded successfully');
  
  // Inicializar animaciones si se desea agregar en el futuro
  initAnimations();
});

// ========================================
// ANIMATIONS (Opcional - para mejoras futuras)
// ========================================

/**
 * Inicializa animaciones básicas con Intersection Observer
 */
function initAnimations() {
  const animatedElements = document.querySelectorAll('.service-card, .testimonial-card');
  
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
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Muestra una notificación temporal
 */
function showNotification(message, type = 'success') {
  // Esta función puede ser usada por otros módulos
  console.log(`[${type.toUpperCase()}]: ${message}`);
  // En el futuro se puede implementar un toast notification
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida formato de teléfono (Colombia)
 */
function isValidPhone(phone) {
  // Acepta formatos: +57 300 123 4567, 300 123 4567, 3001234567
  const phoneRegex = /^(\+?57\s?)?[3][0-9]{9}$/;
  const cleanPhone = phone.replace(/\s/g, '');
  return phoneRegex.test(cleanPhone);
}

// Exportar funciones para uso en otros módulos (si se usa ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showNotification,
    isValidEmail,
    isValidPhone
  };
}