/* ═══════════════════════════════════════════════════════════════
   KALPESH BAVALIYA – PORTFOLIO JAVASCRIPT
   Vanilla JS · No dependencies
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── UTILITY ─── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

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

  const CONFIG = {
    count: 80,
    radius: 1.8,
    speed: .35,
    connectDist: 140,
    color: 'rgba(0,113,227,',
  };

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - .5) * CONFIG.speed;
      this.vy = (Math.random() - .5) * CONFIG.speed;
      this.r  = Math.random() * CONFIG.radius + .5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.color + '.7)';
      ctx.fill();
    }
  }

  function init() {
    particles = Array.from({ length: CONFIG.count }, () => new Particle());
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONFIG.connectDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = CONFIG.color + (1 - d / CONFIG.connectDist) * .4 + ')';
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
      // Connect to mouse
      if (mouse.x) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 180) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = CONFIG.color + (1 - d / 180) * .6 + ')';
          ctx.lineWidth = .8;
          ctx.stroke();
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

  on(window, 'resize', () => { resize(); });
  on(canvas.parentElement, 'mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  on(canvas.parentElement, 'mouseleave', () => { mouse.x = null; });

  // Pause when not visible
  const heroObs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) loop();
    else cancelAnimationFrame(animId);
  }, { threshold: 0 });
  heroObs.observe(canvas.parentElement);

  resize();
  init();
}

/* ══════════════════════════════════════════
   TYPEWRITER EFFECT
══════════════════════════════════════════ */
function initTypewriter() {
  const el = $('#typewriter');
  if (!el) return;

  const phrases = [
    'Full Stack Apps.',
    'RESTful APIs.',
    'Flutter Apps.',
    'React Dashboards.',
    'Scalable Systems.',
    'Fast Experiences.',
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;
  const PAUSE_BEFORE_DELETE = 2200;
  const PAUSE_BEFORE_TYPE   = 500;
  const TYPE_SPEED   = 65;
  const DELETE_SPEED = 38;

  function tick() {
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(tick, PAUSE_BEFORE_DELETE);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, PAUSE_BEFORE_TYPE);
        return;
      }
    }
    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }
  setTimeout(tick, 600);
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function initNavbar() {
  const nav  = $('#navbar');
  const ham  = $('#hamburger');
  const menu = $('#nav-links');
  const links = $$('.nav-link', menu);

  /* Scroll-based styling */
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);

    // Active link
    const scrollY = window.scrollY + 120;
    $$('section[id]').forEach(sec => {
      const top = sec.offsetTop;
      const bot = top + sec.offsetHeight;
      const link = menu.querySelector(`a[href="#${sec.id}"]`);
      if (link) link.classList.toggle('active', scrollY >= top && scrollY < bot);
    });

    // Back to top
    const btt = $('#back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  }
  on(window, 'scroll', onScroll, { passive: true });
  onScroll();

  /* Hamburger */
  function toggleMenu() {
    const open = menu.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  on(ham, 'click', toggleMenu);

  /* Close on link click */
  links.forEach(l => on(l, 'click', () => {
    menu.classList.remove('open');
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  /* Close on outside click */
  on(document, 'click', e => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !ham.contains(e.target)) {
      menu.classList.remove('open');
      ham.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
function initReveal() {
  const els = $$('.reveal-up, .reveal-left, .reveal-right');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════ */
function initCounters() {
  const els = $$('.stat-num[data-count]');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const duration = 1800;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: .5 });

  els.forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════
   SKILL BARS ANIMATION
══════════════════════════════════════════ */
function initSkillBars() {
  function animateBars(panel) {
    $$('.skill-bar span', panel).forEach(bar => {
      bar.classList.remove('animated');
      void bar.offsetWidth; // reflow
      setTimeout(() => bar.classList.add('animated'), 50);
    });
  }

  /* Animate bars when tab panel becomes visible */
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      const activePanel = $('.tab-panel.active');
      if (activePanel) animateBars(activePanel);
    }
  }, { threshold: .2 });
  const skillsSection = $('#skills');
  if (skillsSection) obs.observe(skillsSection);

  // Also animate when tab changes
  window.__animateSkillBars = animateBars;
}

/* ══════════════════════════════════════════
   SKILLS TABS
══════════════════════════════════════════ */
function initTabs() {
  const buttons = $$('.tab-btn');
  const panels  = $$('.tab-panel');

  buttons.forEach(btn => {
    on(btn, 'click', () => {
      const target = btn.dataset.tab;

      buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const panel = $(`#panel-${target}`);
      if (panel) {
        panel.classList.add('active');
        // Animate skill bars
        setTimeout(() => {
          $$('.skill-bar span', panel).forEach(bar => {
            bar.classList.remove('animated');
            void bar.offsetWidth;
            bar.classList.add('animated');
          });
        }, 50);
      }
    });
  });
}

/* ══════════════════════════════════════════
   PROJECT FILTER
══════════════════════════════════════════ */
function initProjectFilter() {
  const btns  = $$('.filter-btn');
  const cards = $$('.project-card');

  btns.forEach(btn => {
    on(btn, 'click', () => {
      const filter = btn.dataset.filter;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;
        card.style.transition = 'opacity .3s, transform .3s';
        if (show) {
          card.style.opacity = '0';
          card.classList.remove('hidden');
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.classList.add('hidden'); }, 300);
        }
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
  const next = $('#test-next');
  if (!track) return;

  const cards = $$('.testimonial-card', track);
  let current = 0;
  let perView = getPerView();
  let total = Math.ceil(cards.length / perView);
  let autoTimer;

  function getPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640)  return 2;
    return 1;
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.className = 'test-dot' + (i === current ? ' active' : '');
      btn.setAttribute('aria-label', `Testimonial ${i + 1}`);
      btn.setAttribute('role', 'tab');
      on(btn, 'click', () => goTo(i));
      dotsWrap.appendChild(btn);
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    const cardW = track.scrollWidth / cards.length;
    track.style.transform = `translateX(-${current * perView * cardW}px)`;
    dotsWrap.querySelectorAll('.test-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo((current + 1) % total), 4500);
  }

  on(prev, 'click', () => goTo((current - 1 + total) % total));
  on(next, 'click', () => goTo((current + 1) % total));

  on(window, 'resize', () => {
    const pv = getPerView();
    if (pv !== perView) {
      perView = pv;
      total = Math.ceil(cards.length / perView);
      current = 0;
      buildDots();
      goTo(0);
    }
  });

  buildDots();
  goTo(0);
}

/* ══════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════ */
function initContactForm() {
  const form    = $('#contact-form');
  const btn     = $('#submit-btn');
  const success = $('#form-success');
  if (!form) return;

  function getVal(id) { return ($(id, form)?.value || '').trim(); }

  function setError(id, msg) {
    const input = $(id, form);
    const err   = input?.parentElement?.querySelector('.form-error');
    if (input) input.classList.toggle('error', !!msg);
    if (err)   err.textContent = msg;
    return !!msg;
  }

  function validate() {
    let invalid = false;
    const name  = getVal('#name');
    const email = getVal('#email');
    const subj  = getVal('#subject');
    const msg   = getVal('#message');

    if (!name)          invalid |= setError('#name',    'Name is required.');
    else                          setError('#name',    '');

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email)         invalid |= setError('#email',   'Email is required.');
    else if (!emailRe.test(email)) invalid |= setError('#email', 'Enter a valid email.');
    else                           setError('#email',   '');

    if (!subj)          invalid |= setError('#subject', 'Subject is required.');
    else                          setError('#subject', '');

    if (!msg || msg.length < 10) invalid |= setError('#message', 'Message must be at least 10 characters.');
    else                                    setError('#message', '');

    return !invalid;
  }

  on(form, 'submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    btn.classList.add('loading');
    btn.disabled = true;
    success.classList.remove('visible');

    // Simulate async send (replace with actual fetch to your API)
    await new Promise(r => setTimeout(r, 1800));

    btn.classList.remove('loading');
    btn.disabled = false;
    form.reset();
    success.textContent = '✓ Message sent! I\'ll be in touch within 24 hours.';
    success.classList.add('visible');
    setTimeout(() => success.classList.remove('visible'), 5000);
  });

  // Live clear errors on input
  $$('input, textarea', form).forEach(el => {
    on(el, 'input', () => {
      el.classList.remove('error');
      const err = el.parentElement.querySelector('.form-error');
      if (err) err.textContent = '';
    });
  });
}

/* ══════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════ */
function initSmoothScroll() {
  on(document, 'click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = $(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ══════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════ */
function initBackToTop() {
  const btn = $('#back-to-top');
  on(btn, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ══════════════════════════════════════════
   FOOTER YEAR
══════════════════════════════════════════ */
function initYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════
   CURSOR GLOW (desktop only)
══════════════════════════════════════════ */
function initCursorGlow() {
  if (window.matchMedia('(pointer:coarse)').matches) return; // skip touch

  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;pointer-events:none;z-index:9998;
    width:400px;height:400px;
    border-radius:50%;
    background:radial-gradient(circle, rgba(0,113,227,.06) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition:left .1s,top .1s;
    will-change:left,top;
  `;
  document.body.appendChild(glow);

  on(document, 'mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ══════════════════════════════════════════
   INIT ALL
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCanvas();
  initTypewriter();
  initNavbar();
  initReveal();
  initCounters();
  initSkillBars();
  initTabs();
  initProjectFilter();
  initTestimonials();
  initContactForm();
  initSmoothScroll();
  initBackToTop();
  initYear();
  initCursorGlow();
});
