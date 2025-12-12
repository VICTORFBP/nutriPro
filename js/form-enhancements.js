// ========================================
// FORM ENHANCEMENTS
// Mejoras visuales y UX adicionales
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initFormEnhancements();
  initFloatingLabels();
  initCharacterCounter();
  initPasswordToggle();
  initFormProgress();
});

// ========================================
// FLOATING LABELS (OPCIONAL)
// ========================================

function initFloatingLabels() {
  const inputs = document.querySelectorAll('.form__input, .form__textarea');
  
  inputs.forEach(input => {
    // Check if already has value on load
    if (input.value) {
      input.classList.add('has-value');
    }
    
    // Add class on focus
    input.addEventListener('focus', () => {
      input.classList.add('is-focused');
    });
    
    // Remove class on blur if empty
    input.addEventListener('blur', () => {
      input.classList.remove('is-focused');
      if (input.value) {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    });
    
    // Update on input
    input.addEventListener('input', () => {
      if (input.value) {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    });
  });
}

// ========================================
// CHARACTER COUNTER FOR TEXTAREA
// ========================================

function initCharacterCounter() {
  const messageInput = document.getElementById('message');
  if (!messageInput) return;
  
  const maxLength = 1000;
  const formGroup = messageInput.closest('.form__group');
  
  // Create counter element
  const counter = document.createElement('div');
  counter.className = 'form__counter';
  counter.innerHTML = `<span class="current">0</span> / ${maxLength} caracteres`;
  
  formGroup.appendChild(counter);
  
  // Update counter
  messageInput.addEventListener('input', () => {
    const currentLength = messageInput.value.length;
    const currentSpan = counter.querySelector('.current');
    currentSpan.textContent = currentLength;
    
    // Add warning/error classes
    counter.classList.remove('warning', 'error');
    if (currentLength > maxLength * 0.9) {
      counter.classList.add('warning');
    }
    if (currentLength > maxLength) {
      counter.classList.add('error');
    }
  });
}

// ========================================
// FORM PROGRESS INDICATOR
// ========================================

function initFormProgress() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  const requiredFields = form.querySelectorAll('[required]');
  
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'form__progress';
  progressBar.innerHTML = `
    <div class="form__progress-bar">
      <div class="form__progress-fill"></div>
    </div>
    <div class="form__progress-text">
      <span class="current">0</span> de <span class="total">${requiredFields.length}</span> campos completados
    </div>
  `;
  
  form.insertBefore(progressBar, form.firstChild);
  
  const progressFill = progressBar.querySelector('.form__progress-fill');
  const currentText = progressBar.querySelector('.current');
  
  // Update progress
  function updateProgress() {
    let completed = 0;
    
    requiredFields.forEach(field => {
      if (field.value.trim() && !field.hasAttribute('aria-invalid')) {
        completed++;
      }
    });
    
    const percentage = (completed / requiredFields.length) * 100;
    progressFill.style.width = `${percentage}%`;
    currentText.textContent = completed;
    
    // Change color based on progress
    if (percentage === 100) {
      progressFill.style.background = '#4CAF50';
    } else if (percentage >= 50) {
      progressFill.style.background = '#FF9800';
    } else {
      progressFill.style.background = '#2196F3';
    }
  }
  
  // Listen to all required fields
  requiredFields.forEach(field => {
    field.addEventListener('input', updateProgress);
    field.addEventListener('blur', updateProgress);
  });
  
  // Initial update
  updateProgress();
}

// ========================================
// INPUT ANIMATIONS
// ========================================

function initFormEnhancements() {
  const inputs = document.querySelectorAll('.form__input, .form__textarea');
  
  inputs.forEach(input => {
    // Add ripple effect on focus
    input.addEventListener('focus', (e) => {
      createRipple(e, input);
    });
    
    // Auto-resize textarea
    if (input.tagName === 'TEXTAREA') {
      input.addEventListener('input', () => {
        autoResizeTextarea(input);
      });
    }
  });
}

function createRipple(event, element) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function autoResizeTextarea(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

// ========================================
// PASSWORD TOGGLE (SI SE AGREGA CAMPO DE CONTRASEÑA)
// ========================================

function initPasswordToggle() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  
  passwordInputs.forEach(input => {
    const wrapper = document.createElement('div');
    wrapper.className = 'password-wrapper';
    
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'password-toggle';
    toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    toggleBtn.setAttribute('aria-label', 'Mostrar contraseña');
    
    wrapper.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', () => {
      const type = input.type === 'password' ? 'text' : 'password';
      input.type = type;
      
      const icon = toggleBtn.querySelector('i');
      if (type === 'text') {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        toggleBtn.setAttribute('aria-label', 'Ocultar contraseña');
      } else {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        toggleBtn.setAttribute('aria-label', 'Mostrar contraseña');
      }
    });
  });
}

// ========================================
// FORM FIELD VALIDATION VISUAL FEEDBACK
// ========================================

export function addValidationFeedback(input, isValid) {
  const formGroup = input.closest('.form__group');
  if (!formGroup) return;
  
  // Remove previous feedback
  const existingIcon = formGroup.querySelector('.validation-icon');
  if (existingIcon) {
    existingIcon.remove();
  }
  
  // Add new feedback icon
  const icon = document.createElement('span');
  icon.className = 'validation-icon';
  
  if (isValid) {
    icon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    icon.style.color = '#4CAF50';
    input.classList.add('valid');
    input.classList.remove('invalid');
  } else {
    icon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    icon.style.color = '#f44336';
    input.classList.add('invalid');
    input.classList.remove('valid');
  }
  
  input.parentNode.insertBefore(icon, input.nextSibling);
}

// ========================================
// FORM AUTO-SAVE (LOCALSTORAGE)
// ========================================

export function initFormAutoSave() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  const formId = 'nutriPro_contact_form';
  
  // Load saved data
  const savedData = localStorage.getItem(formId);
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      Object.keys(data).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
          input.value = data[key];
        }
      });
      
      // Show notification
      showAutoSaveNotification('Formulario restaurado desde borrador');
    } catch (e) {
      console.error('Error loading form data:', e);
    }
  }
  
  // Save on input
  const inputs = form.querySelectorAll('input, textarea');
  let saveTimeout;
  
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveFormData(form, formId);
      }, 1000); // Save after 1 second of inactivity
    });
  });
  
  // Clear on successful submit
  form.addEventListener('submit', () => {
    localStorage.removeItem(formId);
  });
}

function saveFormData(form, formId) {
  const formData = new FormData(form);
  const data = {};
  
  formData.forEach((value, key) => {
    data[key] = value;
  });
  
  localStorage.setItem(formId, JSON.stringify(data));
  showAutoSaveNotification('Borrador guardado', 'info');
}

function showAutoSaveNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `auto-save-notification auto-save-notification--${type}`;
  notification.innerHTML = `
    <i class="fa-solid fa-floppy-disk"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}

// ========================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ========================================

document.addEventListener('keydown', (e) => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  // Submit with Ctrl/Cmd + Enter in textarea
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'TEXTAREA') {
      e.preventDefault();
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  }
});

// ========================================
// EXPORT FUNCTIONS
// ========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    addValidationFeedback,
    initFormAutoSave
  };
}

// ========================================
// CSS ADICIONAL NECESARIO
// ========================================

const enhancementStyles = document.createElement('style');
enhancementStyles.textContent = `
  /* Progress Bar */
  .form__progress {
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(76, 175, 80, 0.05);
    border-radius: 10px;
  }
  
  .form__progress-bar {
    height: 6px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  
  .form__progress-fill {
    height: 100%;
    background: #2196F3;
    transition: width 0.3s ease, background 0.3s ease;
    border-radius: 10px;
  }
  
  .form__progress-text {
    font-size: 0.875rem;
    color: #666;
    text-align: center;
  }
  
  /* Validation Icons */
  .validation-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.25rem;
    pointer-events: none;
    animation: scaleIn 0.3s ease;
  }
  
  @keyframes scaleIn {
    from {
      transform: translateY(-50%) scale(0);
    }
    to {
      transform: translateY(-50%) scale(1);
    }
  }
  
  /* Ripple Effect */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(76, 175, 80, 0.3);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  /* Auto-save Notification */
  .auto-save-notification {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  }
  
  .auto-save-notification.show {
    transform: translateY(0);
    opacity: 1;
  }
  
  .auto-save-notification i {
    color: #4CAF50;
    font-size: 1.25rem;
  }
  
  .auto-save-notification--info i {
    color: #2196F3;
  }
  
  /* Password Toggle */
  .password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .password-toggle {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.3s ease;
  }
  
  .password-toggle:hover {
    color: #4CAF50;
  }
  
  /* Character Counter Styles */
  .form__counter {
    font-size: 0.8125rem;
    color: #999;
    text-align: right;
    margin-top: 0.25rem;
    transition: color 0.3s ease;
  }
  
  .form__counter.warning {
    color: #FF9800;
    font-weight: 600;
  }
  
  .form__counter.error {
    color: #f44336;
    font-weight: 700;
  }
  
  /* Mobile Adjustments */
  @media (max-width: 768px) {
    .auto-save-notification {
      bottom: 1rem;
      right: 1rem;
      left: 1rem;
      width: auto;
    }
    
    .validation-icon {
      right: 0.75rem;
      font-size: 1rem;
    }
  }
`;

document.head.appendChild(enhancementStyles);