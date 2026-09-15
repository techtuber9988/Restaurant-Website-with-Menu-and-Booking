/* =====================================================
   LA MAISON D'OR — Main JavaScript
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initThemeToggle();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCursorGlow();
  initCounters();
  initMenuFilters();
  initFormValidation();
  initReservationEnhancements();
  initSmoothScroll();
  initParallax();
});
/* ── Page Loader ── */
function initLoader() {
  const loader = document.querySelector('.loader');

  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 800);
  });
  // Fallback: hide loader after 3 seconds
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 3000);
}
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');

  if (!toggle) return;

  // Load saved theme
  const savedTheme = localStorage.getItem('lmo-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('lmo-theme', next);

    // Add a cool rotate animation
    toggle.style.transform = 'rotate(180deg) scale(0.8)';

    setTimeout(() => {
      toggle.style.transform = 'rotate(0deg) scale(1)';
    }, 200);
  });
}


/* ── Navbar Scroll Effect ── */

function initNavbar() {
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, {
    passive: true
  });

  handleScroll();
}


/* ── Mobile Menu ── */

function initMobileMenu() {
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');
  const overlay = document.querySelector('.menu-overlay');

  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.classList.remove('active');
    menu.classList.remove('open');

    if (overlay) {
      overlay.classList.remove('visible');
    }

    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');

    if (isOpen) {
      closeMenu();
    } else {
      toggle.classList.add('active');
      menu.classList.add('open');

      if (overlay) {
        overlay.classList.add('visible');
      }

      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on nav link click
  menu.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on escape
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}


/* ── Scroll Reveal Animation ── */

function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealElements.forEach(element => observer.observe(element));
}


/* ── Cursor Glow Effect ── */

function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');

  if (!glow || window.matchMedia('(hover: none)').matches) {
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    requestAnimationFrame(animate);
  }

  animate();
}


/* ── Counter Animation ── */

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  if (!counters.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  counters.forEach(element => observer.observe(element));
}


function animateCounter(element) {
  const target = parseInt(
    element.getAttribute('data-counter'),
    10
  );

  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic animation
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    element.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}


/* ── Menu Filters ── */

function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  const menuItems = document.querySelectorAll('.menu-category');

  if (!filterBtns.length || !menuItems.length) return;

  filterBtns.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
      });

      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      menuItems.forEach(item => {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          item.style.display = '';

          // Re-trigger animation
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';

          setTimeout(() => {
            item.style.transition =
              'opacity 0.5s ease, transform 0.5s ease';

            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}


/* ── Form Validation ── */

function initFormValidation() {
  // Booking Form
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    setupFormValidation(bookingForm, 'booking');
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    setupFormValidation(contactForm, 'contact');
  }
}


function setupFormValidation(form, type) {
  const inputs = form.querySelectorAll('[data-validate]');

  // Real-time validation on blur
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    // Clear error on focus
    input.addEventListener('focus', () => {
      clearFieldError(input);
    });

    // Real-time validation while typing
    input.addEventListener('input', () => {
      if (
        input.classList.contains('error') ||
        input.classList.contains('success')
      ) {
        validateField(input);
      }
    });

    // Validate select fields when changed
    input.addEventListener('change', () => {
      validateField(input);
    });
  });

  // Form submission
  form.addEventListener('submit', event => {
    event.preventDefault();

    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      handleSuccessfulFormSubmission(form, type);
    } else {
      // Shake the form
      form.style.animation = 'none';
      form.offsetHeight;
      form.style.animation = 'shake 0.5s ease';

      // Focus the first invalid field
      const firstInvalidField = form.querySelector('.error');

      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    }
  });
}


/* ── Successful Form Submission ── */

function handleSuccessfulFormSubmission(form, type) {
  const submitBtn = form.querySelector('button[type="submit"]');

  if (!submitBtn) {
    showSuccessModal(type);
    return;
  }

  const originalHTML = submitBtn.innerHTML;

  // Disable button while processing
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <span style="display:inline-flex;align-items:center;gap:8px;">
      <span class="button-spinner"></span>
      Processing...
    </span>
  `;

  submitBtn.style.opacity = '0.75';
  submitBtn.style.cursor = 'wait';

  // Simulated processing delay
  setTimeout(() => {
    showSuccessModal(type);

    // Reset form after submission
    form.reset();

    form.querySelectorAll('.success').forEach(input => {
      input.classList.remove('success');
    });

    form.querySelectorAll('.error').forEach(input => {
      input.classList.remove('error');
    });

    form.querySelectorAll('.form-error').forEach(error => {
      error.textContent = '';
      error.classList.remove('visible');
    });

    // Reset reservation helper text
    const guestHelp = document.getElementById('guest-help');

    if (guestHelp) {
      guestHelp.textContent = '';
    }

    // Restore button
    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
    submitBtn.style.cursor = '';
  }, 800);
}


/* ── Field Validation ── */

function validateField(input) {
  const validationRules = input.getAttribute('data-validate');

  if (!validationRules) {
    return true;
  }

  const rules = validationRules.split(',');
  const errorEl = input.parentElement.querySelector('.form-error');

  let errorMsg = '';

  for (const rule of rules) {
    const trimmedRule = rule.trim();

    // Required validation
    if (
      trimmedRule === 'required' &&
      !input.value.trim()
    ) {
      errorMsg = 'This field is required.';
      break;
    }

    // Email validation
    if (
      trimmedRule === 'email' &&
      input.value.trim()
    ) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(input.value.trim())) {
        errorMsg = 'Please enter a valid email address.';
        break;
      }
    }

    // Phone validation
    if (
      trimmedRule === 'phone' &&
      input.value.trim()
    ) {
      const phoneDigits = input.value.replace(/\D/g, '');

      if (phoneDigits.length < 7) {
        errorMsg = 'Please enter a valid phone number.';
        break;
      }
    }

    // Date validation
    if (
      trimmedRule === 'date' &&
      input.value
    ) {
      const selectedDate = new Date(`${input.value}T00:00:00`);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errorMsg = 'Please select today or a future date.';
        break;
      }
    }

    // Minimum length validation
    if (
      trimmedRule.startsWith('min:') &&
      input.value.trim()
    ) {
      const minLength = parseInt(
        trimmedRule.split(':')[1],
        10
      );

      if (input.value.trim().length < minLength) {
        errorMsg = `Must be at least ${minLength} characters.`;
        break;
      }
    }
  }

  if (errorMsg) {
    input.classList.add('error');
    input.classList.remove('success');

    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.classList.add('visible');
    }

    input.setAttribute('aria-invalid', 'true');

    return false;
  }

  input.classList.remove('error');
  input.removeAttribute('aria-invalid');

  if (input.value.trim()) {
    input.classList.add('success');
  }

  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }

  return true;
}


/* ── Clear Field Error ── */

function clearFieldError(input) {
  input.classList.remove('error');
  input.removeAttribute('aria-invalid');

  const errorEl = input.parentElement.querySelector('.form-error');

  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}


/* ── Smart Reservation Enhancements ── */

function initReservationEnhancements() {
  const bookingForm = document.getElementById('booking-form');

  if (!bookingForm) return;

  const dateInput = document.getElementById('booking-date');
  const timeInput = document.getElementById('booking-time');
  const guestsInput = document.getElementById('booking-guests');
  const guestHelp = document.getElementById('guest-help');

  /*
    Set today's date as the minimum selectable date.
    This prevents users from selecting previous dates
    through the browser date picker.
  */
  if (dateInput) {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedToday = `${year}-${month}-${day}`;

    dateInput.setAttribute('min', formattedToday);

    dateInput.addEventListener('change', () => {
      if (!dateInput.value) return;

      const selectedDate = new Date(
        `${dateInput.value}T00:00:00`
      );

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        showReservationFieldMessage(
          dateInput,
          'Please select today or a future date.'
        );
      } else {
        clearReservationFieldMessage(dateInput);
      }
    });
  }

  /*
    Guest-based feedback
  */
  if (guestsInput && guestHelp) {
    guestsInput.addEventListener('change', () => {
      const guests = guestsInput.value;

      if (guests === '10+') {
        guestHelp.textContent =
          'For 10 or more guests, our team will contact you regarding private dining arrangements.';
      } else if (guests === '6' || guests === '7' || guests === '8') {
        guestHelp.textContent =
          'For larger groups, we may contact you to confirm seating arrangements.';
      } else if (guests && guests !== '') {
        guestHelp.textContent =
          'Your table will be prepared according to the selected number of guests.';
      } else {
        guestHelp.textContent = '';
      }
    });
  }

  /*
    Prevent selecting unavailable Monday.
    Tuesday to Sunday are available.
  */
  if (dateInput && timeInput) {
    dateInput.addEventListener('change', () => {
      if (!dateInput.value) return;

      const selectedDate = new Date(
        `${dateInput.value}T00:00:00`
      );

      const dayOfWeek = selectedDate.getDay();

      // Monday = 1
      if (dayOfWeek === 1) {
        showReservationFieldMessage(
          dateInput,
          'We are closed on Mondays. Please choose another date.'
        );
      }
    });
  }
}


/* ── Reservation Field Message Helpers ── */

function showReservationFieldMessage(input, message) {
  if (!input) return;

  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');

  const errorEl = input.parentElement.querySelector('.form-error');

  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }
}


function clearReservationFieldMessage(input) {
  if (!input) return;

  input.classList.remove('error');
  input.removeAttribute('aria-invalid');

  const errorEl = input.parentElement.querySelector('.form-error');

  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}


/* ── Success Modal ── */

function showSuccessModal(type) {
  const modal = document.getElementById('success-modal');

  if (!modal) {
    showToast(
      'success',
      type === 'booking'
        ? 'Your reservation has been confirmed! We look forward to welcoming you.'
        : 'Your message has been sent! We will get back to you shortly.'
    );

    return;
  }

  /*
    Support both possible modal class naming systems:
    .modal__title / .modal__text
    and
    #success-modal-title / #success-modal-message
  */
  const title =
    modal.querySelector('.modal__title') ||
    modal.querySelector('#success-modal-title');

  const text =
    modal.querySelector('.modal__text') ||
    modal.querySelector('#success-modal-message');

  if (type === 'booking') {
    if (title) {
      title.textContent = 'Reservation Confirmed!';
    }

    if (text) {
      text.textContent =
        'Thank you for choosing La Maison d\'Or. We have received your reservation and will send a confirmation to your email shortly.';
    }
  } else {
    if (title) {
      title.textContent = 'Message Sent!';
    }

    if (text) {
      text.textContent =
        'Thank you for reaching out. Our team will review your message and get back to you within 24 hours.';
    }
  }

  // Support both visible and active modal classes
  modal.classList.add('visible');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');

  const closeModal = () => {
    modal.classList.remove('visible');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  };

  // Close button variations
  const closeBtn =
    modal.querySelector('.modal__close') ||
    modal.querySelector('.modal-close') ||
    modal.querySelector('#modal-close');

  const doneBtn = modal.querySelector('#modal-done');
  const overlay = modal.querySelector('.modal-overlay');

  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }

  if (doneBtn) {
    doneBtn.onclick = closeModal;
  }

  if (overlay) {
    overlay.onclick = closeModal;
  }

  // Close when clicking outside modal content
  modal.onclick = event => {
    if (
      event.target === modal ||
      event.target === overlay
    ) {
      closeModal();
    }
  };

  // Close using Escape key
  const escapeHandler = event => {
    if (event.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escapeHandler);
    }
  };

  document.addEventListener('keydown', escapeHandler);

  // Auto close after 5 seconds
  setTimeout(() => {
    closeModal();
    document.removeEventListener('keydown', escapeHandler);
  }, 5000);
}


/* ── Toast Notifications ── */

function showToast(type, message) {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(toast => {
    toast.remove();
  });

  const toast = document.createElement('div');

  toast.className = `toast toast--${type}`;

  toast.innerHTML = `
    <span class="toast__icon">
      ${type === 'success' ? '✓' : '✕'}
    </span>

    <span class="toast__message">
      ${message}
    </span>

    <button
      class="toast__close"
      aria-label="Close notification"
      type="button"
    >
      ×
    </button>
  `;

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  // Close button
  const closeButton = toast.querySelector('.toast__close');

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      toast.classList.remove('visible');

      setTimeout(() => {
        toast.remove();
      }, 500);
    });
  }

  // Auto dismiss
  setTimeout(() => {
    toast.classList.remove('visible');

    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 500);
  }, 5000);
}


/* ── Smooth Scroll ── */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const targetId = anchor.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        const offset = 80;

        const top =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          offset;

        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    });
  });
}


/* ── Parallax Effect ── */

function initParallax() {
  const parallaxBgs = document.querySelectorAll(
    '.parallax-section__bg'
  );

  if (!parallaxBgs.length) return;

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY;

      parallaxBgs.forEach(bg => {
        const section = bg.parentElement;
        const rect = section.getBoundingClientRect();

        if (
          rect.bottom > 0 &&
          rect.top < window.innerHeight
        ) {
          const speed = 0.3;
          const yPos = rect.top * speed;

          bg.style.transform = `translateY(${yPos}px)`;
        }
      });
    },
    {
      passive: true
    }
  );
}


/* ── Shake Animation ── */

const shakeStyle = document.createElement('style');

shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }

    20% {
      transform: translateX(-8px);
    }

    40% {
      transform: translateX(8px);
    }

    60% {
      transform: translateX(-4px);
    }

    80% {
      transform: translateX(4px);
    }
  }

  .button-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    display: inline-block;
    animation: buttonSpin 0.7s linear infinite;
  }

  @keyframes buttonSpin {
    to {
      transform: rotate(360deg);
    }
  }
`;

document.head.appendChild(shakeStyle);


/* ── Set Active Nav Link ── */

(function setActiveNav() {
  const currentPage =
    window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');

    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
})();


/* ── Newsletter Form ── */

document.addEventListener('click', event => {
  const newsletterButton = event.target.closest(
    '.footer__newsletter-input button'
  );

  if (!newsletterButton) return;

  const input = document.querySelector(
    '.footer__newsletter-input input'
  );

  if (!input) return;

  if (input.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(input.value.trim())) {
      showToast(
        'success',
        'Thank you for subscribing to our newsletter!'
      );

      input.value = '';
    } else {
      showToast(
        'error',
        'Please enter a valid email address.'
      );
    }
  } else {
    showToast(
      'error',
      'Please enter your email address.'
    );
  }
});


/* ── Mark Today in Hours Widget ── */

(function markToday() {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];

  const today = days[new Date().getDay()];

  const rows = document.querySelectorAll(
    '.hours-widget__row'
  );

  rows.forEach(row => {
    if (row.getAttribute('data-day') === today) {
      row.classList.add('today');
    }
  });
})();
