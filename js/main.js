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

/* ── Theme Toggle ── */
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

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load
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
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      toggle.classList.add('active');
      menu.classList.add('open');
      if (overlay) overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
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
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ── Scroll Reveal Animation ── */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ── Cursor Glow Effect ── */
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow || window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

/* ── Counter Animation ── */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-counter'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;

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

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      menuItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          // Re-trigger animation
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
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

    // Real-time validation while typing (after first blur)
    input.addEventListener('input', () => {
      if (input.classList.contains('error') || input.classList.contains('success')) {
        validateField(input);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Show success
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;">✓ Submitted!</span>';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // Show success modal
      showSuccessModal(type);

      // Reset form after delay
      setTimeout(() => {
        form.reset();
        inputs.forEach(input => {
          input.classList.remove('success');
        });
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
      }, 3000);
    } else {
      // Shake the form
      form.style.animation = 'none';
      form.offsetHeight; // trigger reflow
      form.style.animation = 'shake 0.5s ease';
    }
  });
}

function validateField(input) {
  const rules = input.getAttribute('data-validate').split(',');
  const errorEl = input.parentElement.querySelector('.form-error');
  let errorMsg = '';

  for (const rule of rules) {
    const trimmed = rule.trim();

    if (trimmed === 'required' && !input.value.trim()) {
      errorMsg = 'This field is required';
      break;
    }

    if (trimmed === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        errorMsg = 'Please enter a valid email address';
        break;
      }
    }

    if (trimmed === 'phone' && input.value.trim()) {
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(input.value.trim())) {
        errorMsg = 'Please enter a valid phone number';
        break;
      }
    }

    if (trimmed === 'date' && input.value) {
      const selectedDate = new Date(input.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errorMsg = 'Please select a future date';
        break;
      }
    }

    if (trimmed.startsWith('min:') && input.value.trim()) {
      const min = parseInt(trimmed.split(':')[1]);
      if (input.value.trim().length < min) {
        errorMsg = `Must be at least ${min} characters`;
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
    return false;
  } else {
    input.classList.remove('error');
    if (input.value.trim()) {
      input.classList.add('success');
    }
    if (errorEl) {
      errorEl.classList.remove('visible');
    }
    return true;
  }
}

function clearFieldError(input) {
  input.classList.remove('error');
  const errorEl = input.parentElement.querySelector('.form-error');
  if (errorEl) {
    errorEl.classList.remove('visible');
  }
}

function showSuccessModal(type) {
  const modal = document.getElementById('success-modal');
  if (!modal) {
    showToast('success', type === 'booking'
      ? 'Your reservation has been confirmed! We look forward to welcoming you.'
      : 'Your message has been sent! We\'ll get back to you shortly.'
    );
    return;
  }

  const title = modal.querySelector('.modal__title');
  const text = modal.querySelector('.modal__text');

  if (type === 'booking') {
    title.textContent = 'Reservation Confirmed!';
    text.textContent = 'Thank you for choosing La Maison d\'Or. We have received your reservation and will send a confirmation to your email shortly.';
  } else {
    title.textContent = 'Message Sent!';
    text.textContent = 'Thank you for reaching out. Our team will review your message and get back to you within 24 hours.';
  }

  modal.classList.add('visible');

  // Close modal
  const closeBtn = modal.querySelector('.modal__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('visible');
    }, { once: true });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('visible');
    }
  });

  // Auto close after 5 seconds
  setTimeout(() => {
    modal.classList.remove('visible');
  }, 5000);
}

/* ── Toast Notifications ── */
function showToast(type, message) {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${type === 'success' ? '✓' : '✕'}</span>
    <span class="toast__message">${message}</span>
    <button class="toast__close" aria-label="Close notification">×</button>
  `;

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  // Close button
  toast.querySelector('.toast__close').addEventListener('click', () => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 500);
  });

  // Auto dismiss
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 500);
  }, 5000);
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = 80;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── Parallax Effect ── */
function initParallax() {
  const parallaxBgs = document.querySelectorAll('.parallax-section__bg');
  if (!parallaxBgs.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxBgs.forEach(bg => {
      const section = bg.parentElement;
      const rect = section.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const speed = 0.3;
        const yPos = (rect.top * speed);
        bg.style.transform = `translateY(${yPos}px)`;
      }
    });
  }, { passive: true });
}

/* ── Shake Animation (inline for form) ── */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ── Set Active Nav Link ── */
(function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── Newsletter Form ── */
document.addEventListener('click', (e) => {
  if (e.target.matches('.footer__newsletter-input button') || e.target.closest('.footer__newsletter-input button')) {
    const input = document.querySelector('.footer__newsletter-input input');
    if (input && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(input.value.trim())) {
        showToast('success', 'Thank you for subscribing to our newsletter!');
        input.value = '';
      } else {
        showToast('error', 'Please enter a valid email address.');
      }
    }
  }
});

/* ── Mark Today in Hours Widget ── */
(function markToday() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  const rows = document.querySelectorAll('.hours-widget__row');
  rows.forEach(row => {
    if (row.getAttribute('data-day') === today) {
      row.classList.add('today');
    }
  });
})();
