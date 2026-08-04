/*!
 * Remeni Rugs — interaction layer
 * Vanilla JS, no dependencies. Every control is keyboard operable and
 * announces state changes through aria-live regions.
 */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- nav --*/
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && window.innerWidth <= 860) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* --------------------------------------------- collection search/filter --*/
  var cards = Array.prototype.slice.call(document.querySelectorAll('#collection-grid .card'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var searchInput = document.getElementById('q');
  var searchForm = document.querySelector('.hero-search');
  var countEl = document.getElementById('result-count');
  var emptyEl = document.getElementById('empty-state');
  var clearBtn = document.getElementById('clear-search');

  var activeFilter = 'all';

  function applyFilters() {
    var term = (searchInput && searchInput.value || '').trim().toLowerCase();
    var shown = 0;

    cards.forEach(function (card) {
      var matchesFilter =
        activeFilter === 'all' || card.dataset.construction === activeFilter;
      var matchesTerm =
        !term || (card.dataset.terms || '').indexOf(term) !== -1;
      var visible = matchesFilter && matchesTerm;

      card.hidden = !visible;
      if (visible) { shown++; }
    });

    if (countEl) {
      countEl.textContent =
        'Showing ' + shown + ' collection' + (shown === 1 ? '' : 's');
    }
    if (emptyEl) { emptyEl.hidden = shown !== 0; }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) {
        c.classList.remove('is-active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
      activeFilter = chip.dataset.filter;
      applyFilters();
    });
  });

  if (searchInput) { searchInput.addEventListener('input', applyFilters); }

  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      applyFilters();
      var target = document.getElementById('collections');
      if (target) { target.scrollIntoView({ behavior: 'smooth' }); }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (searchInput) { searchInput.value = ''; }
      activeFilter = 'all';
      chips.forEach(function (c, i) {
        c.classList.toggle('is-active', i === 0);
        c.setAttribute('aria-pressed', String(i === 0));
      });
      applyFilters();
      if (searchInput) { searchInput.focus(); }
    });
  }

  /* ----------------------------------------------------------- carousel --*/
  /* No auto-advance: WCAG 2.2.2 requires a pause control for anything that
     moves on its own, and dealers scan showrooms at their own pace. */
  var carousel = document.querySelector('[data-carousel]');

  if (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.slide'));
    var prev = carousel.querySelector('[data-prev]');
    var next = carousel.querySelector('[data-next]');
    var status = carousel.querySelector('[data-status]');
    var index = 0;

    function render() {
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      slides.forEach(function (s, i) {
        s.setAttribute('aria-hidden', String(i !== index));
        Array.prototype.slice.call(s.querySelectorAll('a, button')).forEach(function (el) {
          if (i === index) { el.removeAttribute('tabindex'); }
          else { el.setAttribute('tabindex', '-1'); }
        });
      });
      if (status) {
        status.textContent = 'Showroom ' + (index + 1) + ' of ' + slides.length;
      }
      if (prev) { prev.disabled = index === 0; }
      if (next) { next.disabled = index === slides.length - 1; }
    }

    if (prev) { prev.addEventListener('click', function () { if (index > 0) { index--; render(); } }); }
    if (next) { next.addEventListener('click', function () { if (index < slides.length - 1) { index++; render(); } }); }

    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' && index > 0) { index--; render(); }
      if (e.key === 'ArrowRight' && index < slides.length - 1) { index++; render(); }
    });

    render();
  }

  /* ------------------------------------------------------ form validation --*/
  /* Validates on submit, not on every keystroke — error messages that appear
     while a field is still being typed into test badly. */
  var form = document.getElementById('dealer-form');

  if (form) {
    var success = document.getElementById('form-success');

    var rules = [
      { id: 'business', test: function (v) { return v.trim().length > 0; } },
      { id: 'contact-name', test: function (v) { return v.trim().length > 0; } },
      { id: 'email', test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
      { id: 'volume', test: function (v) { return v !== ''; } }
    ];

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;

      rules.forEach(function (rule) {
        var field = document.getElementById(rule.id);
        var error = document.getElementById(rule.id + '-error');
        var ok = rule.test(field.value);

        field.setAttribute('aria-invalid', String(!ok));
        if (error) { error.hidden = ok; }
        if (!ok && !firstInvalid) { firstInvalid = field; }
      });

      if (firstInvalid) {
        if (success) { success.hidden = true; }
        firstInvalid.focus();
        return;
      }

      if (success) { success.hidden = false; }
      form.reset();
      rules.forEach(function (rule) {
        document.getElementById(rule.id).removeAttribute('aria-invalid');
      });
    });
  }
})();
