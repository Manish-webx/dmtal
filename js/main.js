/* ============================================================
   DERMATALES — Main JavaScript
   Vanilla JS, no dependencies beyond Bootstrap 5
   ============================================================ */

/* ---- Component Loader ----
   Fetches shared header.html, mobile-menu.html and footer.html
   fragments and injects them into placeholder divs on every page.
   After all components are loaded, initPage() fires the rest of the JS.
   NOTE: Requires a local web server (e.g. VS Code Live Server) — fetch()
   is blocked by the browser when opening files directly via file:// protocol.
 ---------------------------------------------------------------- */
function loadComponent(url, placeholderId, callback) {
  var placeholder = document.getElementById(placeholderId);
  if (!placeholder) {
    if (callback) callback();
    return;
  }
  fetch(url)
    .then(function (response) {
      if (!response.ok) throw new Error('Failed to load: ' + url);
      return response.text();
    })
    .then(function (html) {
      placeholder.outerHTML = html;
      if (callback) callback();
    })
    .catch(function (err) {
      console.warn('DermaTales component loader:', err);
      if (callback) callback();
    });
}

/* Determine the root path so that fragment URLs resolve correctly
   regardless of how deep the current page is. */
function getRootPath() {
  var segments = window.location.pathname.split('/');
  segments.pop(); // remove filename
  var depth = segments.filter(function (s) { return s !== ''; }).length;
  // If served from root, depth = 0 → path prefix is './'
  // Adjust if pages are nested in subdirectories later
  return './';
}

document.addEventListener('DOMContentLoaded', function () {
  var root = getRootPath();

  // Load header first, then mobile menu, then footer, then init page
  loadComponent(root + 'header.html', 'header-placeholder', function () {
    loadComponent(root + 'mobile-menu.html', 'mobile-menu-placeholder', function () {
      loadComponent(root + 'footer.html', 'footer-placeholder', function () {
        initPage();
      });
    });
  });
});

/* ---- Main page initialisation (runs after components are injected) ---- */
function initPage() {
  'use strict';

  // ---- Sticky Header Scroll Effect ----
  var mainHeader = document.getElementById('mainHeader');
  var lastScroll = 0;

  function handleHeaderScroll() {
    var currentScroll = window.scrollY;
    if (!mainHeader) return;
    if (currentScroll > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ---- Back to Top Button ----
  var backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Close mobile offcanvas on link click ----
  var mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    var offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(mobileMenu);
    var mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        offcanvasInstance.hide();
      });
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]:not([data-bs-toggle])').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerOffset = mainHeader ? mainHeader.offsetHeight : 0;
        var elementPosition = target.getBoundingClientRect().top + window.scrollY;
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
      var openDropdowns = document.querySelectorAll('.navbar-nav .dropdown-menu.show');
      openDropdowns.forEach(function (menu) {
        var parent = menu.closest('.nav-item');
        if (parent && !parent.contains(e.target)) {
          var toggle = parent.querySelector('.dropdown-toggle');
          if (toggle) {
            bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
          }
        }
      });
    }
  });

  // ---- Mega menu: hover behavior on desktop ----
  if (window.innerWidth >= 1200) {
    var dropdowns = document.querySelectorAll('.navbar-nav .dropdown');

    dropdowns.forEach(function (dropdown) {
      var timeout;

      dropdown.addEventListener('mouseenter', function () {
        clearTimeout(timeout);
        var toggle = this.querySelector('.dropdown-toggle');
        if (toggle) {
          bootstrap.Dropdown.getOrCreateInstance(toggle).show();
        }
      });

      dropdown.addEventListener('mouseleave', function () {
        var toggle = this.querySelector('.dropdown-toggle');
        timeout = setTimeout(function () {
          if (toggle) {
            bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
          }
        }, 150);
      });
    });
  }

  // ---- Form Validation (basic) ----
  var appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('formName');
      var phone = document.getElementById('formPhone');
      var isValid = true;

      [name, phone].forEach(function (field) {
        if (field) field.classList.remove('is-invalid');
      });

      if (!name || !name.value.trim()) {
        if (name) name.classList.add('is-invalid');
        isValid = false;
      }

      if (!phone || !phone.value.trim() || phone.value.trim().length < 10) {
        if (phone) phone.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        var btn = this.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = "Thank you! We'll contact you shortly.";
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



  // ---- Featured In: Duplicate logos for infinite scroll ----
  var logoSlider = document.querySelector('.featured-logos-slider');
  if (logoSlider) {
    var items = logoSlider.innerHTML;
    logoSlider.innerHTML = items + items;
  }

  // ---- Counter animation for stats ----
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var counters = entry.target.querySelectorAll('.why-stat-number[data-count]');
        counters.forEach(function (counter) {
          var target = parseInt(counter.getAttribute('data-count'), 10);
          var duration = 2000;
          var startTime = performance.now();

          function updateCounter(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);

            counter.textContent = target >= 1000 ? current.toLocaleString('en-IN') : current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target >= 1000 ? target.toLocaleString('en-IN') : target;
            }
          }

          requestAnimationFrame(updateCounter);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  var whyStats = document.querySelector('.why-stats');
  if (whyStats) {
    counterObserver.observe(whyStats);
  }



  // ---- Active nav link highlighting ----
  var sections = document.querySelectorAll('section[id]');
  function highlightNav() {
    var scrollY = window.scrollY + 150;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

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
}
