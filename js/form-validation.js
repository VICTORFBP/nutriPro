// ========================================
// FORM VALIDATION
// ========================================

const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

// Expresiones regulares
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+?57\s?)?[3][0-9]{9}$/;

/**
 * Valida un campo individual
 */
function validateField(input, errorId, validationFn, errorMsg) {
  const errorElement = document.getElementById(errorId);
  const value = input.value.trim();
  
  if (!value) {
    showError(errorElement, 'Este campo es requerido');
    return false;
  }
  
  if (validationFn && !validationFn(value)) {
    showError(errorElement, errorMsg);
    return false;
  }
  
  hideError(errorElement);
  return true;
}

/**
 * Muestra error en un campo
 */
function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add('show');
  errorElement.previousElementSibling.style.borderColor = '#f44336';
}

/**
 * Oculta error de un campo
 */
function hideError(errorElement) {
  errorElement.textContent = '';
  errorElement.classList.remove('show');
  errorElement.previousElementSibling.style.borderColor = '#ddd';
}

/**
 * Valida email
 */
function validateEmail(email) {
  return emailRegex.test(email);
}

/**
 * Valida telefono
 */
function validatePhone(phone) {
  const cleanPhone = phone.replace(/\s/g, '');
  return phoneRegex.test(cleanPhone);
}

/**
 * Valida todo el formulario
 */
function validateForm() {
  let isValid = true;
  
  // Validar nombre
  if (!validateField(nameInput, 'name-error', null, '')) {
    isValid = false;
  }
  
  // Validar email
  if (!validateField(emailInput, 'email-error', validateEmail, 'Por favor ingresa un email valido')) {
    isValid = false;
  }
  
  // Validar telefono
  if (!validateField(phoneInput, 'phone-error', validatePhone, 'Formato: +57 300 123 4567 o 3001234567')) {
    isValid = false;
  }
  
  // Validar mensaje
  if (!validateField(messageInput, 'message-error', null, '')) {
    isValid = false;
  }
  
  return isValid;
}

/**
 * Maneja el envio del formulario
 */
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ocultar mensajes previos
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
    
    // Validar formulario
    if (validateForm()) {
      // Simulacion de envio exitoso
      contactForm.reset();
      successMessage.classList.add('show');
      
      // Ocultar mensaje despues de 5 segundos
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 5000);
      
      console.log('Formulario enviado correctamente');
    } else {
      errorMessage.classList.add('show');
      
      // Ocultar mensaje despues de 3 segundos
      setTimeout(() => {
        errorMessage.classList.remove('show');
      }, 3000);
      
      console.log('Hay errores en el formulario');
    }
  });
  
  // Validacion en tiempo real al perder foco
  nameInput.addEventListener('blur', () => {
    validateField(nameInput, 'name-error', null, '');
  });
  
  emailInput.addEventListener('blur', () => {
    validateField(emailInput, 'email-error', validateEmail, 'Por favor ingresa un email valido');
  });
  
  phoneInput.addEventListener('blur', () => {
    validateField(phoneInput, 'phone-error', validatePhone, 'Formato: +57 300 123 4567 o 3001234567');
  });
  
  messageInput.addEventListener('blur', () => {
    validateField(messageInput, 'message-error', null, '');
  });
  
  // Limpiar error al empezar a escribir
  [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      const errorId = input.id + '-error';
      const errorElement = document.getElementById(errorId);
      if (errorElement.classList.contains('show')) {
        hideError(errorElement);
      }
    });
  });
}