/* ============================================================
   DERMATALES — Main JavaScript
   Vanilla JS, no dependencies beyond Bootstrap 5
   ============================================================ */

(function () {
  'use strict';

  // ---- Sticky Header Scroll Effect ----
  const mainHeader = document.getElementById('mainHeader');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ---- Back to Top Button ----
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Close mobile offcanvas on link click ----
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(mobileMenu);
    const mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        offcanvasInstance.hide();
      });
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]:not([data-bs-toggle])').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = mainHeader ? mainHeader.offsetHeight : 0;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset - 16,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Mega menu: close on outside click (desktop) ----
  document.addEventListener('click', function (e) {
    if (window.innerWidth >= 1200) {
      const openDropdowns = document.querySelectorAll('.navbar-nav .dropdown-menu.show');
      openDropdowns.forEach(function (menu) {
        const parent = menu.closest('.nav-item');
        if (parent && !parent.contains(e.target)) {
          const toggle = parent.querySelector('.dropdown-toggle');
          if (toggle) {
            bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
          }
        }
      });
    }
  });

  // ---- Mega menu: hover behavior on desktop ----
  if (window.innerWidth >= 1200) {
    const dropdowns = document.querySelectorAll('.navbar-nav .dropdown');

    dropdowns.forEach(function (dropdown) {
      let timeout;

      dropdown.addEventListener('mouseenter', function () {
        clearTimeout(timeout);
        const toggle = this.querySelector('.dropdown-toggle');
        if (toggle) {
          bootstrap.Dropdown.getOrCreateInstance(toggle).show();
        }
      });

      dropdown.addEventListener('mouseleave', function () {
        const toggle = this.querySelector('.dropdown-toggle');
        timeout = setTimeout(function () {
          if (toggle) {
            bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
          }
        }, 150);
      });
    });
  }

  // ---- Form Validation (basic) ----
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('formName');
      const phone = document.getElementById('formPhone');
      let isValid = true;

      // Clear previous states
      [name, phone].forEach(function (field) {
        field.classList.remove('is-invalid');
      });

      if (!name.value.trim()) {
        name.classList.add('is-invalid');
        isValid = false;
      }

      if (!phone.value.trim() || phone.value.trim().length < 10) {
        phone.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        // In production, submit to backend
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Thank you! We\'ll contact you shortly.';
        btn.disabled = true;
        btn.style.background = 'var(--dt-sage)';

        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          appointmentForm.reset();
        }, 4000);
      }
    });
  }

  // ---- Intersection Observer: Fade-in animations ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all major sections
  document.querySelectorAll('.section-padding, .hero-content').forEach(function (el) {
    el.classList.add('fade-up');
    fadeObserver.observe(el);
  });

  // Add CSS for fade-up animation
  const style = document.createElement('style');
  style.textContent = `
    .fade-up {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .fade-up.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // ---- Featured In: Duplicate logos for infinite scroll ----
  const logoSlider = document.querySelector('.featured-logos-slider');
  if (logoSlider) {
    const items = logoSlider.innerHTML;
    logoSlider.innerHTML = items + items; // duplicate for seamless loop
  }

  // ---- Counter animation for Why Choose Us stats ----
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.why-stat-number[data-count]');
        counters.forEach(function (counter) {
          const target = parseInt(counter.getAttribute('data-count'), 10);
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            if (target >= 1000) {
              counter.textContent = current.toLocaleString('en-IN');
            } else {
              counter.textContent = current;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              if (target >= 1000) {
                counter.textContent = target.toLocaleString('en-IN');
              } else {
                counter.textContent = target;
              }
            }
          }

          requestAnimationFrame(updateCounter);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const whyStats = document.querySelector('.why-stats');
  if (whyStats) {
    counterObserver.observe(whyStats);
  }

  // ---- Also fade-in the Featured In section ----
  const featuredSection = document.querySelector('.section-featured-in');
  if (featuredSection) {
    featuredSection.classList.add('fade-up');
    fadeObserver.observe(featuredSection);
  }

  // ---- Active nav link highlighting ----
  const sections = document.querySelectorAll('section[id]');
  function highlightNav() {
    const scrollY = window.scrollY + 150;
    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

})();
