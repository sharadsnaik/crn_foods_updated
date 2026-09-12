// CRN Foods — shared interactions
document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Mobile submenu accordions (tap to expand on small screens) */
  document.querySelectorAll('.main-nav li.has-sub > a.nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        var parent = link.parentElement;
        var wasOpen = parent.classList.contains('open');
        document.querySelectorAll('.main-nav li.has-sub.open').forEach(function (li) {
          if (li !== parent) li.classList.remove('open');
        });
        parent.classList.toggle('open', !wasOpen);
      }
    });
  });

  /* Close mobile nav when a plain link is tapped */
  document.querySelectorAll('.main-nav a.nav-link:not(.has-sub > a)').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 980 && nav) {
        nav.classList.remove('open');
      }
    });
  });

  /* Mark current page in nav */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* Product filter (products.html) */
  var filterBar = document.querySelector('.filter-bar');
  var grid = document.querySelector('.product-grid');
  if (filterBar && grid) {
    var buttons = filterBar.querySelectorAll('.filter-btn');
    var cards = grid.querySelectorAll('.product-card');
    var countEl = filterBar.querySelector('.filter-count');

    function applyFilter(cat) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = cat === 'all' || card.dataset.category === cat;
        card.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (countEl) countEl.textContent = shown + ' item' + (shown === 1 ? '' : 's');
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
      });
    });

    var params = new URLSearchParams(window.location.search);
    var wanted = params.get('cat');
    var initialBtn = wanted ? filterBar.querySelector('.filter-btn[data-filter="' + wanted + '"]') : null;
    if (!initialBtn) initialBtn = filterBar.querySelector('.filter-btn.active') || buttons[0];

    buttons.forEach(function (b) { b.classList.remove('active'); });
    if (initialBtn) initialBtn.classList.add('active');
    applyFilter(initialBtn ? initialBtn.dataset.filter : 'all');
  }
});
