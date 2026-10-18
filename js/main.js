/* ============================================================
   DERMATALES — Main JavaScript
   Vanilla JS, no dependencies beyond Bootstrap 5
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initPage();
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

  // ---- Disallow URL in Message Fields (Typing, Pasting, Drag-Drop, Form Submit) ----
  function initUrlBlocker() {
    var urlPattern = /(?:[a-zA-Z]+:\/\/|www\.)[^\s]*|(?<!@)\b[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.(?:com|org|net|in|co|io|ai|biz|info|xyz|me|online|site|tech|store|app|dev|cloud|pro|link|top|vip|icu|live|click|mobi|ly|gl|be|tv|to|cc|edu|gov)\b(?:\/[^\s]*)?/gi;

    function hasUrl(text) {
      if (!text) return false;
      urlPattern.lastIndex = 0;
      return urlPattern.test(text);
    }

    function removeUrls(text) {
      if (!text) return '';
      urlPattern.lastIndex = 0;
      return text.replace(urlPattern, '');
    }

    function getWarningElement(field) {
      var parent = field.closest('.mb-3') || field.closest('.mb-4') || field.closest('.mb-5') || field.closest('.col-12') || field.parentNode;
      var warning = parent ? parent.querySelector('.url-warning-msg') : null;
      if (!warning && parent) {
        warning = document.createElement('div');
        warning.className = 'url-warning-msg invalid-feedback';
        warning.style.display = 'none';
        field.parentNode.insertBefore(warning, field.nextSibling);
      }
      return warning;
    }

    function showWarning(field, message) {
      field.classList.add('is-invalid');
      var warning = getWarningElement(field);
      if (warning) {
        warning.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-1"></i> ' + (message || 'URLs and website links are not allowed in the message field.');
        warning.style.display = 'block';
      }

      if (field._urlWarningTimer) {
        clearTimeout(field._urlWarningTimer);
      }
      field._urlWarningTimer = setTimeout(function () {
        if (!hasUrl(field.value)) {
          field.classList.remove('is-invalid');
          if (warning) warning.style.display = 'none';
        }
      }, 4000);
    }

    function hideWarning(field) {
      field.classList.remove('is-invalid');
      var warning = getWarningElement(field);
      if (warning) {
        warning.style.display = 'none';
      }
    }

    var messageFields = document.querySelectorAll(
      'textarea[name="message"], #formMessage, textarea.form-control, input[name="message"]'
    );

    messageFields.forEach(function (field) {
      // 1. Disallow Pasting URLs
      field.addEventListener('paste', function (e) {
        var clipboardData = e.clipboardData || window.clipboardData;
        if (!clipboardData) return;
        var pastedText = clipboardData.getData('text') || '';

        if (hasUrl(pastedText)) {
          e.preventDefault();
          showWarning(field, 'Links and website URLs cannot be pasted in the message field.');
        }
      });

      // 2. Disallow Drag & Drop URLs
      field.addEventListener('drop', function (e) {
        var droppedText = (e.dataTransfer && e.dataTransfer.getData('text')) || '';
        if (hasUrl(droppedText)) {
          e.preventDefault();
          showWarning(field, 'Links and website URLs are not allowed in the message field.');
        }
      });

      // 3. Disallow Typing URLs (real-time input event)
      field.addEventListener('input', function () {
        if (hasUrl(this.value)) {
          var cursorPos = this.selectionStart;
          var originalLength = this.value.length;
          this.value = removeUrls(this.value);
          var newLength = this.value.length;
          var diff = originalLength - newLength;
          if (cursorPos !== null) {
            var newPos = Math.max(0, cursorPos - diff);
            this.setSelectionRange(newPos, newPos);
          }
          showWarning(this, 'Typing URLs and website links is not allowed in the message field.');
        } else {
          hideWarning(this);
        }
      });
    });

    // 4. Form Submit Protection on all forms
    var allForms = document.querySelectorAll('form');
    allForms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        var msg = form.querySelector('textarea[name="message"], #formMessage, textarea');
        if (msg && hasUrl(msg.value)) {
          e.preventDefault();
          msg.value = removeUrls(msg.value);
          showWarning(msg, 'Please remove any website links or URLs before submitting.');
          msg.focus();
          return false;
        }
      });
    });
  }

  initUrlBlocker();



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
