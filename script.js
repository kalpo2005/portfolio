/* ═══════════════════════════════════════════════════════════════
   KALPESH BAVALIYA – PORTFOLIO JS v2
   Vanilla JS · No dependencies
   ═══════════════════════════════════════════════════════════════ */

'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

/* ══════════════════════════════════════════
   LOADER
══════════════════════════════════════════ */
function initLoader() {
  const loader = $('#loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1800);
  });
}

/* ══════════════════════════════════════════
   CANVAS PARTICLE NETWORK
══════════════════════════════════════════ */
function initCanvas() {
  const canvas = $('#hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: null, y: null };
  const COUNT = 70, RADIUS = 1.8, SPEED = 0.32, CONNECT = 130;

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }

  class P {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - .5) * SPEED;
      this.vy = (Math.random() - .5) * SPEED;
      this.r = Math.random() * RADIUS + .5;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,113,227,.7)'; ctx.fill();
    }
  }

  function init() { particles = Array.from({ length: COUNT }, () => new P()); }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const d = Math.hypot(dx, dy);
        if (d < CONNECT) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,113,227,${(1 - d / CONNECT) * .35})`; ctx.lineWidth = .5; ctx.stroke();
        }
      }
      if (mouse.x) {
        const dx = particles[i].x - mouse.x, dy = particles[i].y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 180) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(41,151,255,${(1 - d / 180) * .5})`; ctx.lineWidth = .7; ctx.stroke();
        }
      }
    }
  }

  let animId;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    animId = requestAnimationFrame(loop);
  }

  const hero = $('#hero');
  on(window, 'resize', resize);
  on(hero, 'mousemove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  on(hero, 'mouseleave', () => { mouse.x = null; });

  const obs = new IntersectionObserver(([e]) => { e.isIntersecting ? loop() : cancelAnimationFrame(animId); }, { threshold: 0 });
  obs.observe(hero);

  resize(); init();
}

/* ══════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════ */
function initTypewriter() {
  const el = $('#typewriter');
  if (!el) return;
  const phrases = ['Full Stack Apps.', 'RESTful APIs.', 'Flutter Apps.', 'React Dashboards.', 'Scalable Systems.', 'Fast Experiences.'];
  let pi = 0, ci = 0, del = false;
  function tick() {
    const ph = phrases[pi];
    if (!del) { el.textContent = ph.slice(0, ++ci); if (ci === ph.length) { del = true; setTimeout(tick, 2200); return; } }
    else { el.textContent = ph.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 500); return; } }
    setTimeout(tick, del ? 38 : 65);
  }
  setTimeout(tick, 800);
}

/* ══════════════════════════════════════════
   HERO SLIDER
══════════════════════════════════════════ */
function initHeroSlider() {
  const track = $('#hero-track');
  const slides = $$('.hero-slide', track);
  const dotsWrap = $('#slide-dots');
  const prevBtn = $('#slide-prev');
  const nextBtn = $('#slide-next');
  const progress = $('#slide-progress-fill');
  if (!slides.length) return;

  const TOTAL = slides.length;
  const AUTO_DUR = 5500; // ms per slide
  let current = 0, autoTimer, startTs, animFrame;

  /* Build dots */
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'slide-dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', `Slide ${i + 1}`);
    on(btn, 'click', () => goTo(i));
    dotsWrap.appendChild(btn);
  });

  function updateDots(idx) {
    $$('.slide-dot', dotsWrap).forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function goTo(idx) {
    slides[current].setAttribute('aria-hidden', 'true');
    slides[current].classList.remove('active');

    current = (idx + TOTAL) % TOTAL;

    slides[current].removeAttribute('aria-hidden');
    slides[current].classList.add('active');

    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots(current);
    resetAuto();
  }

  /* Auto progress bar */
  function resetAuto() {
    clearInterval(autoTimer);
    cancelAnimationFrame(animFrame);
    startTs = null;

    function animProgress(ts) {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const pct = Math.min(elapsed / AUTO_DUR, 1);
      if (progress) progress.style.width = (pct * 100) + '%';
      if (pct < 1) animFrame = requestAnimationFrame(animProgress);
      else { goTo(current + 1); }
    }
    animFrame = requestAnimationFrame(animProgress);
  }

  /* Keyboard / arrow */
  on(prevBtn, 'click', () => goTo(current - 1));
  on(nextBtn, 'click', () => goTo(current + 1));
  on(document, 'keydown', e => {
    if (window.scrollY < window.innerHeight * .5) {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
    }
  });

  /* Touch swipe */
  let touchStartX = 0;
  on(track, 'touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  on(track, 'touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  });

  // Init first slide
  slides[0].classList.add('active');
  updateDots(0);
  resetAuto();
}

/* ══════════════════════════════════════════
   SKILLS CAROUSEL
══════════════════════════════════════════ */
function initSkillsCarousel() {
  const track = $('#skills-track');
  const viewport = $('#skills-viewport');
  const prevBtn = $('#skill-prev');
  const nextBtn = $('#skill-next');
  const dotsWrap = $('#skills-dots');
  if (!track) return;

  const cards = $$('.sc-card', track);
  let current = 0, cardsPerView = getPerView();
  let totalPages = Math.ceil(cards.length / cardsPerView);

  function getPerView() {
    const vw = viewport?.offsetWidth || window.innerWidth;
    if (vw >= 1000) return 5;
    if (vw >= 768) return 4;
    if (vw >= 500) return 3;
    return 2;
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = 'skills-dot' + (i === current ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Skills page ${i + 1}`);
      on(btn, 'click', () => goTo(i));
      dotsWrap.appendChild(btn);
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, totalPages - 1));
    const cardW = cards[0].offsetWidth;
    const gapPx = 20; // matches gap:1.25rem
    const offset = current * cardsPerView * (cardW + gapPx);
    track.style.transform = `translateX(-${offset}px)`;

    // Animate bars for visible cards
    const start = current * cardsPerView;
    cards.forEach((card, i) => {
      const bar = card.querySelector('.sc-bar span');
      if (!bar) return;
      bar.classList.remove('animated');
      void bar.offsetWidth;
      if (i >= start && i < start + cardsPerView) setTimeout(() => bar.classList.add('animated'), 80);
    });

    // Update dots
    $$('.skills-dot', dotsWrap).forEach((d, i) => d.classList.toggle('active', i === current));

    // Arrow states
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= totalPages - 1;
  }

  on(prevBtn, 'click', () => goTo(current - 1));
  on(nextBtn, 'click', () => goTo(current + 1));

  on(window, 'resize', () => {
    const pv = getPerView();
    if (pv !== cardsPerView) {
      cardsPerView = pv;
      totalPages = Math.ceil(cards.length / cardsPerView);
      current = 0;
      buildDots();
      goTo(0);
    }
  });

  // Animate when section scrolls in
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) goTo(0);
  }, { threshold: .2 });
  const sec = $('#skills');
  if (sec) obs.observe(sec);

  buildDots();
  if (prevBtn) prevBtn.disabled = true;
}

/* ══════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════ */
function initCursor() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  const dot = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100, rx = -100, ry = -100;

  on(document, 'mousemove', e => { mx = e.clientX; my = e.clientY; });

  function loop() {
    // Dot follows instantly
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    // Ring lerps
    rx += (mx - rx) * .14;
    ry += (my - ry) * .14;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  // Hover on interactive
  const hoverEls = 'a, button, [role="tab"], input, textarea, .sc-card, .project-card, .life-card';
  on(document, 'mouseover', e => {
    if (e.target.closest(hoverEls)) document.body.classList.add('cursor-hover');
  });
  on(document, 'mouseout', e => {
    if (e.target.closest(hoverEls)) document.body.classList.remove('cursor-hover');
  });
  on(document, 'mousedown', () => document.body.classList.add('cursor-click'));
  on(document, 'mouseup', () => document.body.classList.remove('cursor-click'));
}

/* ══════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════ */
function initScrollProgress() {
  const fill = $('#scroll-fill');
  const pct = $('#scroll-pct');
  const bar = $('#scroll-progress-bar');
  if (!fill) return;

  on(window, 'scroll', () => {
    const doc = document.documentElement;
    const prog = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
    const p = Math.round(prog * 100);
    fill.style.width = p + '%';
    if (pct) pct.textContent = p + '%';
    bar.classList.toggle('active', p > 2);
  }, { passive: true });
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function initNavbar() {
  const nav = $('#navbar');
  const ham = $('#hamburger');
  const menu = $('#nav-links');

  on(window, 'scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    // Active link
    const sy = window.scrollY + 120;
    $$('section[id]').forEach(sec => {
      const link = menu.querySelector(`a[href="#${sec.id}"]`);
      if (link) link.classList.toggle('active', sy >= sec.offsetTop && sy < sec.offsetTop + sec.offsetHeight);
    });
    // Back to top
    const btt = $('#back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  on(ham, 'click', () => {
    const open = menu.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  $$('.nav-link', menu).forEach(l => on(l, 'click', () => {
    menu.classList.remove('open'); ham.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  }));
}

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal-up, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════
   COUNTERS
══════════════════════════════════════════ */
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count;
      let start = 0;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1800, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(step); else el.textContent = target;
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  $$('.stat-num[data-count]').forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════
   PROJECT FILTER
══════════════════════════════════════════ */
function initProjectFilter() {
  const btns = $$('.filter-btn');
  const cards = $$('.project-card');
  btns.forEach(btn => {
    on(btn, 'click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        const show = f === 'all' || card.dataset.category === f;
        card.style.transition = 'opacity .3s, transform .3s';
        if (show) { card.style.opacity = '0'; card.classList.remove('hidden'); setTimeout(() => { card.style.opacity = '1'; }, 10); }
        else { card.style.opacity = '0'; setTimeout(() => card.classList.add('hidden'), 300); }
      });
    });
  });
}

/* ══════════════════════════════════════════
   TESTIMONIALS CAROUSEL
══════════════════════════════════════════ */
function initTestimonials() {
  const track = $('#testimonials-track');
  const dotsWrap = $('#test-dots');
  const prev = $('#test-prev');
  const next_btn = $('#test-next');
  if (!track) return;

  const cards = $$('.testimonial-card', track);
  let current = 0, autoTimer;

  function perView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }
  let pv = perView(), total = Math.ceil(cards.length / pv);

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.className = 'test-dot' + (i === current ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Testimonial page ${i + 1}`);
      on(btn, 'click', () => goTo(i));
      dotsWrap.appendChild(btn);
    }
  }

  function goTo(idx) {
    current = (idx + total) % total;
    const cardW = track.scrollWidth / cards.length;
    track.style.transform = `translateX(-${current * pv * cardW}px)`;
    $$('.test-dot', dotsWrap).forEach((d, i) => d.classList.toggle('active', i === current));
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }

  on(prev, 'click', () => goTo(current - 1));
  on(next_btn, 'click', () => goTo(current + 1));
  on(window, 'resize', () => {
    const p = perView();
    if (p !== pv) { pv = p; total = Math.ceil(cards.length / pv); current = 0; buildDots(); goTo(0); }
  });

  buildDots(); goTo(0);
}

/* ══════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════ */
function initContactForm() {
  const form = $('#contact-form');
  const btn = $('#submit-btn');
  const success = $('#form-success');
  if (!form) return;

  function val(id) { return ($(id, form)?.value || '').trim(); }
  function setErr(id, msg) {
    const inp = $(id, form), err = inp?.parentElement?.querySelector('.form-error');
    if (inp) inp.classList.toggle('error', !!msg);
    if (err) err.textContent = msg;
    return !!msg;
  }
  function validate() {
    let bad = false;
    if (!val('#name')) bad |= setErr('#name', 'Name is required.'); else setErr('#name', '');
    const em = val('#email');
    if (!em) bad |= setErr('#email', 'Email is required.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) bad |= setErr('#email', 'Enter a valid email.');
    else setErr('#email', '');
    if (!val('#subject')) bad |= setErr('#subject', 'Subject is required.'); else setErr('#subject', '');
    if (val('#message').length < 10) bad |= setErr('#message', 'Message must be at least 10 characters.'); else setErr('#message', '');
    return !bad;
  }

  on(form, 'submit', async e => {
    e.preventDefault();
    if (!validate()) return;
    btn.classList.add('loading'); btn.disabled = true; success.classList.remove('visible');
    await new Promise(r => setTimeout(r, 1800));
    btn.classList.remove('loading'); btn.disabled = false;
    form.reset();
    success.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
    success.classList.add('visible');
    setTimeout(() => success.classList.remove('visible'), 5000);
  });

  $$('input, textarea', form).forEach(el => on(el, 'input', () => {
    el.classList.remove('error');
    const e = el.parentElement.querySelector('.form-error');
    if (e) e.textContent = '';
  }));
}

/* ══════════════════════════════════════════
   MISC
══════════════════════════════════════════ */
function initMisc() {
  // Smooth scroll
  on(document, 'click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const t = $(link.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Back to top
  on($('#back-to-top'), 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Footer year
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════
   BOOT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initScrollProgress();
  initCanvas();
  initTypewriter();
  initHeroSlider();
  initNavbar();
  initReveal();
  initCounters();
  initSkillsCarousel();
  initProjectFilter();
  initTestimonials();
  initContactForm();
  initMisc();
});
