/* 2S Labs — interakcje: język, motyw, menu, animacje */
(function () {
  'use strict';

  var root = document.documentElement;

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Tłumaczenia ----------
     Polski tekst jest w index.html (to wersja domyślna, czytana przez wyszukiwarki).
     Tutaj jest tylko angielski — klucze odpowiadają atrybutom data-i18n. */
  var EN = {
    'skip': 'Skip to content',
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cta': "Let's talk",

    'hero.title': 'From idea<br>to working product<span class="accent">.</span>',
    'hero.lead': "2S Labs is an engineering studio. We design and build web applications, backend systems and AI-powered solutions — solid, fast and with no middlemen.",
    'hero.cta1': "Let's talk",
    'hero.cta2': 'See what we do',

    'services.label': 'What we do',
    'services.title': 'Three disciplines.<br>One team.',
    's1.desc': 'Web apps, backends, APIs and cloud infrastructure. Clean code, tests and an architecture built to grow.',
    's1.tags': 'Web · Backend · Cloud · DevOps',
    's2.desc': 'LLM integrations, agents, RAG and process automation. We ship AI where it creates measurable value — not for the hype.',
    's2.tags': 'LLM · RAG · Agents · Automation',
    's3.desc': 'From workshops and prototypes, through MVP, to ongoing product development. We help you decide what to build — before we build it.',
    's3.tags': 'Discovery · UX · MVP · Iteration',

    'process.label': 'How we work',
    'process.title': 'Simple, transparent,<br>iterative.',
    'p1.title': 'Discovery',
    'p1.desc': "We learn the problem, goals and constraints — and tell you straight what makes sense and what doesn't.",
    'p2.title': 'Plan',
    'p2.desc': 'Scope, architecture, estimate and timeline — in writing, no fine print.',
    'p3.title': 'Build',
    'p3.desc': 'Short iterations and regular demos. You get access to the code from day one.',
    'p4.title': 'Grow',
    'p4.desc': 'Launch, monitoring and continuous improvement. We stay as your product grows.',

    'about.label': 'About',
    'about.title': 'Two founders.<br>Zero layers in between.',
    'about.lead': "We started 2S Labs to build software the way we'd want to buy it: direct contact, clear rules and full ownership of the outcome.",
    'v1.title': 'Direct contact',
    'v1.desc': 'You talk to the people who write the code — not a salesperson.',
    'v2.title': 'Transparency',
    'v2.desc': 'Clear estimates, regular demos and full access to the repository.',
    'v3.title': 'Ownership',
    'v3.desc': 'What counts is a working product, not hours billed.',

    'contact.label': 'Contact',
    'contact.title': "Got an idea?<br>Let's talk<span class=\"accent\">.</span>",
    'contact.lead': "Tell us a few words about your project — we'll get back to you with questions or a concrete proposal.",
    'contact.copy': 'Copy',
    'contact.copied': 'Copied',
    'theme': 'Toggle theme',
    'meta.description': '2S Labs is an engineering studio. We design and build web applications, backend systems and AI-powered solutions.'
  };

  var PL_EXTRA = {
    'contact.copied': 'Skopiowano',
    'meta.description': document.querySelector('meta[name="description"]').getAttribute('content')
  };

  // Słownik PL budujemy z treści HTML, żeby nie duplikować tekstów.
  var PL = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    PL[el.getAttribute('data-i18n')] = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
    PL[el.getAttribute('data-i18n-aria')] = el.getAttribute('aria-label');
  });
  Object.keys(PL_EXTRA).forEach(function (k) { PL[k] = PL_EXTRA[k]; });

  var DICTS = { pl: PL, en: EN };
  var lang = 'pl';
  var langBtn = document.getElementById('lang-btn');

  function setLang(next) {
    var dict = DICTS[next];
    if (!dict) return;
    lang = next;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-aria')];
      if (v != null) el.setAttribute('aria-label', v);
    });

    root.lang = next;
    document.querySelector('meta[name="description"]').setAttribute('content', dict['meta.description']);
    langBtn.textContent = next === 'pl' ? 'EN' : 'PL';
    langBtn.setAttribute('aria-label', next === 'pl' ? 'Switch to English' : 'Przełącz na polski');
  }

  var storedLang = store.get('lang');
  var browserLang = (navigator.language || 'pl').toLowerCase();
  setLang(storedLang || (browserLang.indexOf('pl') === 0 ? 'pl' : 'en'));

  langBtn.addEventListener('click', function () {
    var next = lang === 'pl' ? 'en' : 'pl';
    setLang(next);
    store.set('lang', next);
  });

  /* ---------- Motyw ---------- */
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyThemeMeta() {
    var light = root.getAttribute('data-theme') === 'light';
    themeMeta.setAttribute('content', light ? '#f7f8fa' : '#0a1120');
  }
  applyThemeMeta();

  document.getElementById('theme-btn').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    store.set('theme', next);
    applyThemeMeta();
  });

  /* ---------- Nawigacja ---------- */
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menu-btn');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- Kopiowanie e-maila ---------- */
  var copyBtn = document.getElementById('copy-btn');
  var email = document.getElementById('email');
  var copyTimer;

  copyBtn.addEventListener('click', function () {
    var text = email.textContent.trim();
    var done = function () {
      copyBtn.textContent = DICTS[lang]['contact.copied'];
      copyBtn.classList.add('done');
      clearTimeout(copyTimer);
      copyTimer = setTimeout(function () {
        copyBtn.textContent = DICTS[lang]['contact.copy'];
        copyBtn.classList.remove('done');
      }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {});
    }
  });

  /* ---------- Animacje przy przewijaniu ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Rok w stopce ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
