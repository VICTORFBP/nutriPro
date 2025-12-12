// ========================================
// MAIN JAVASCRIPT FILE
// Optimizado para performance y UX
// ========================================

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ NutriPro Landing Page loaded successfully');
  
  // Inicializar módulos
  initAnimations();
  initLazyLoading();
  initPerformanceOptimizations();
  preventZoomOnDoubleTap();
  handleIOSInputZoom();
  initAccessibility();
  
  // Log del viewport para debugging
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
    console.log(`Device Pixel Ratio: ${window.devicePixelRatio}`);
  }
});

// ========================================
// ANIMATIONS CON INTERSECTION OBSERVER
// ========================================

function initAnimations() {
  const animatedElements = document.querySelectorAll(
    '.service-card, .testimonial-card, .credential, .hero__stat'
  );
  
  if (!animatedElements.length) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Animación escalonada
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ========================================
// LAZY LOADING DE IMÁGENES
// ========================================

function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Navegadores que soportan lazy loading nativo
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback con Intersection Observer
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ========================================
// OPTIMIZACIONES DE PERFORMANCE
// ========================================

function initPerformanceOptimizations() {
  // Prefetch links importantes
  const importantLinks = document.querySelectorAll('a[href^="#"]');
  importantLinks.forEach(link => {
    link.rel = 'prefetch';
  });
  
  // Preload fuentes críticas
  if (document.fonts) {
    document.fonts.ready.then(() => {
      console.log('✓ Fuentes cargadas');
    });
  }
  
  // Detectar conexión lenta
  if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      console.log('⚠ Conexión lenta detectada');
      // Aquí podrías reducir la calidad de imágenes o deshabilitar animaciones
      document.body.classList.add('slow-connection');
    }
  }
}

// ========================================
// PREVENIR ZOOM EN DOUBLE TAP (iOS)
// ========================================

function preventZoomOnDoubleTap() {
  let lastTouchEnd = 0;
  
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });
}

// ========================================
// FIX ZOOM EN INPUTS (iOS)
// ========================================

function handleIOSInputZoom() {
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Asegurar que el font-size sea al menos 16px
      const computedStyle = window.getComputedStyle(input);
      const fontSize = parseFloat(computedStyle.fontSize);
      
      if (fontSize < 16) {
        input.style.fontSize = '16px';
      }
    });
  }
}

// ========================================
// ACCESIBILIDAD
// ========================================

function initAccessibility() {
  // Skip to main content
  const skipLink = document.createElement('a');
  skipLink.href = '#inicio';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Saltar al contenido principal';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #4CAF50;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Mejorar contraste de focus
  const style = document.createElement('style');
  style.textContent = `
    .user-is-tabbing *:focus {
      outline: 3px solid #4CAF50 !important;
      outline-offset: 2px !important;
    }
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
    
    .slow-connection img {
      filter: blur(10px);
      transition: filter 0.3s;
    }
    
    .slow-connection img.loaded {
      filter: blur(0);
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Muestra una notificación temporal
 */
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
  
  console.log(`[${type.toUpperCase()}]: ${message}`);
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
  const phoneRegex = /^(\+?57\s?)?[3][0-9]{9}$/;
  const cleanPhone = phone.replace(/\s/g, '');
  return phoneRegex.test(cleanPhone);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Detecta si es dispositivo móvil
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detecta si es iOS
 */
function isIOS() {
  return /iPhone|iPad|iPod/.test(navigator.userAgent);
}

/**
 * Obtiene el viewport actual
 */
function getViewportSize() {
  return {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  };
}

// ========================================
// MANEJO DE ERRORES GLOBAL
// ========================================

window.addEventListener('error', (e) => {
  console.error('Error global:', e.error);
  // Aquí podrías enviar el error a un servicio de logging
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Promise rechazado:', e.reason);
  // Aquí podrías enviar el error a un servicio de logging
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;
      
      console.log('Performance Metrics:');
      console.log(`- Page Load Time: ${pageLoadTime}ms`);
      console.log(`- Connect Time: ${connectTime}ms`);
      console.log(`- Render Time: ${renderTime}ms`);
      
      // Enviar métricas a analytics si es necesario
      if (pageLoadTime > 3000) {
        console.warn('⚠ Tiempo de carga alto detectado');
      }
    }, 0);
  });
}

// ========================================
// SERVICE WORKER (PWA)
// ========================================

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✓ Service Worker registrado:', reg.scope))
      .catch(err => console.log('✗ Service Worker error:', err));
  });
}

// ========================================
// EXPORTAR FUNCIONES PARA USO GLOBAL
// ========================================

window.NutriPro = {
  showNotification,
  isValidEmail,
  isValidPhone,
  debounce,
  throttle,
  isMobileDevice,
  isIOS,
  getViewportSize
};

// Exportar para módulos si están disponibles
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.NutriPro;
}