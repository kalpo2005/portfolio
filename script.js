/* ═══════════════════════════════════════════════════════
   KALPESH BAVALIYA – PORTFOLIO JS v3
   Reads from data.js (KB object) · Vanilla JS only
═══════════════════════════════════════════════════════ */
'use strict';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const on = (el, ev, fn, o) => el && el.addEventListener(ev, fn, o);
const ce = (tag, cls = '', html = '') => { const el = document.createElement(tag); if (cls) el.className = cls; if (html) el.innerHTML = html; return el };

/* ════ LOADER ════ */
function initLoader() {
  const l = $('#loader');
  if (!l) return;
  on(window, 'load', () => setTimeout(() => l.classList.add('hidden'), 1800));
}

/* ════ CANVAS PARTICLES ════ */
function initCanvas() {
  const canvas = $('#hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: null, y: null }, animId;
  const N = 65, SP = .3, CR = 1.7, CD = 125;

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }

  class P {
    constructor() { this.reset() }
    reset() { this.x = Math.random() * W; this.y = Math.random() * H; this.vx = (Math.random() - .5) * SP; this.vy = (Math.random() - .5) * SP; this.r = Math.random() * CR + .4 }
    update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > W) this.vx *= -1; if (this.y < 0 || this.y > H) this.vy *= -1 }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,113,227,.65)'; ctx.fill() }
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.hypot(dx, dy);
        if (d < CD) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(0,113,227,${(1 - d / CD) * .3})`; ctx.lineWidth = .5; ctx.stroke() }
      }
      if (mouse.x) { const dx = particles[i].x - mouse.x, dy = particles[i].y - mouse.y, d = Math.hypot(dx, dy); if (d < 170) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.strokeStyle = `rgba(41,151,255,${(1 - d / 170) * .5})`; ctx.lineWidth = .65; ctx.stroke() } }
    }
  }

  function loop() { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.update(); p.draw() }); connect(); animId = requestAnimationFrame(loop) }

  const hero = $('#hero');
  on(window, 'resize', resize);
  on(hero, 'mousemove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top });
  on(hero, 'mouseleave', () => { mouse.x = null });
  const obs = new IntersectionObserver(([e]) => { e.isIntersecting ? loop() : cancelAnimationFrame(animId) }, { threshold: 0 });
  obs.observe(hero);
  resize(); particles = Array.from({ length: N }, () => new P());
}

/* ════ TYPEWRITER ════ */
function initTypewriter() {
  const el = $('#typewriter');
  if (!el) return;
  const phrases = KB.taglines || ['Full Stack Apps.'];
  let pi = 0, ci = 0, del = false;
  function tick() {
    const ph = phrases[pi];
    if (!del) { el.textContent = ph.slice(0, ++ci); if (ci === ph.length) { del = true; setTimeout(tick, 2200); return } }
    else { el.textContent = ph.slice(0, --ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 480); return } }
    setTimeout(tick, del ? 36 : 62);
  }
  setTimeout(tick, 900);
}

/* ════ HERO SLIDER ════ */
function initHeroSlider() {
  const track = $('#hero-track');
  const dots = $('#slide-dots');
  const prev = $('#slide-prev');
  const next = $('#slide-next');
  const prog = $('#slide-prog');
  if (!track) return;
  const slides = $$('.hero-slide', track);
  const TOTAL = slides.length;
  const DUR = 5800;
  let cur = 0, animF, startTs;

  // Render hero stats
  const statsEl = $('#hero-stats');
  if (statsEl && KB.heroStats) {
    KB.heroStats.forEach(s => {
      const d = ce('div', 'stat');
      d.innerHTML = `<div><span class="stat-num" data-count="${s.count}">0</span><span class="stat-suffix">${s.suffix}</span></div><span class="stat-label">${s.label}</span>`;
      statsEl.appendChild(d);
    });
  }

  // Render tech pills
  const pillsEl = $('#tech-pills');
  if (pillsEl && KB.techPills) {
    KB.techPills.forEach(p => {
      const s = ce('span', 'tech-pill', p);
      pillsEl.appendChild(s);
    });
  }

  // Build dots
  slides.forEach((_, i) => {
    const b = ce('button', 'slide-dot' + (i === 0 ? ' active' : ''));
    b.setAttribute('role', 'tab'); b.setAttribute('aria-label', `Slide ${i + 1}`);
    on(b, 'click', () => goTo(i));
    dots.appendChild(b);
  });

  function updateDots(i) { $$('.slide-dot', dots).forEach((d, j) => d.classList.toggle('active', j === i)) }

  function goTo(idx) {
    slides[cur].setAttribute('aria-hidden', 'true');
    cur = (idx + TOTAL) % TOTAL;
    track.style.transform = `translateX(-${cur * 100}%)`;
    slides[cur].removeAttribute('aria-hidden');
    updateDots(cur);
    resetAuto();
  }

  function resetAuto() {
    cancelAnimationFrame(animF); startTs = null;
    function step(ts) {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / DUR, 1);
      if (prog) prog.style.width = (p * 100) + '%';
      if (p < 1) animF = requestAnimationFrame(step);
      else goTo(cur + 1);
    }
    animF = requestAnimationFrame(step);
  }

  on(prev, 'click', () => goTo(cur - 1));
  on(next, 'click', () => goTo(cur + 1));
  on(document, 'keydown', e => {
    if (window.scrollY < window.innerHeight * .6) {
      if (e.key === 'ArrowRight') goTo(cur + 1);
      if (e.key === 'ArrowLeft') goTo(cur - 1);
    }
  });

  // Drag on hero
  addDragSupport(track, () => goTo(cur - 1), () => goTo(cur + 1));

  slides[0].removeAttribute('aria-hidden');
  updateDots(0); resetAuto();
}

/* ════ DRAG SUPPORT UTILITY ════ */
function addDragSupport(el, onLeft, onRight, threshold = 50) {
  let startX = 0, isDrag = false;
  on(el, 'pointerdown', e => { startX = e.clientX; isDrag = true; el.setPointerCapture(e.pointerId) });
  on(el, 'pointermove', e => { if (!isDrag) return });
  on(el, 'pointerup', e => {
    if (!isDrag) return; isDrag = false;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > threshold) { dx < 0 ? onRight() : onLeft() }
  });
  on(el, 'pointercancel', () => { isDrag = false });
}

/* ════ CUSTOM CURSOR ════ */
function initCursor() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  const dot = $('#cursor-dot'), ring = $('#cursor-ring');
  if (!dot || !ring) return;
  let mx = -200, my = -200, rx = -200, ry = -200;
  on(document, 'mousemove', e => { mx = e.clientX; my = e.clientY });
  (function loop() {
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    rx += (mx - rx) * .13; ry += (my - ry) * .13;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  const hEls = 'a,button,[role="tab"],input,textarea,.sc-card,.project-card,.life-card,.test-card';
  on(document, 'mouseover', e => { if (e.target.closest(hEls)) document.body.classList.add('ch') });
  on(document, 'mouseout', e => { if (e.target.closest(hEls)) document.body.classList.remove('ch') });
  on(document, 'mousedown', () => document.body.classList.add('cc'));
  on(document, 'mouseup', () => document.body.classList.remove('cc'));
}

/* ════ SCROLL PROGRESS STRIP ════ */
function initScrollBar() {
  const fill = $('#scroll-fill');
  if (!fill) return;
  on(window, 'scroll', () => {
    const d = document.documentElement;
    fill.style.width = Math.round(d.scrollTop / (d.scrollHeight - d.clientHeight) * 100) + '%';
  }, { passive: true });
}

/* ════ NAVBAR ════ */
function initNavbar() {
  const nav = $('#navbar'), ham = $('#hamburger'), menu = $('#nav-links');
  on(window, 'scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    const sy = window.scrollY + 130;
    $$('section[id]').forEach(sec => {
      const link = menu.querySelector(`a[href="#${sec.id}"]`);
      if (link) link.classList.toggle('active', sy >= sec.offsetTop && sy < sec.offsetTop + sec.offsetHeight);
    });
    const btt = $('#back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 380);
  }, { passive: true });
  on(ham, 'click', () => { const o = menu.classList.toggle('open'); ham.classList.toggle('open', o); ham.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : '' });
  $$('.nav-link', menu).forEach(l => on(l, 'click', () => { menu.classList.remove('open'); ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '' }));
  on(document, 'click', e => { if (menu.classList.contains('open') && !menu.contains(e.target) && !ham.contains(e.target)) { menu.classList.remove('open'); ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '' } });
}

/* ════ REVEAL ════ */
function initReveal() {
  const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }) }, { threshold: .1, rootMargin: '0px 0px -35px 0px' });
  $$('.reveal-up,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
}

/* ════ COUNTERS ════ */
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count;
      let s = 0;
      (function step(ts) { if (!s) s = ts; const p = Math.min((ts - s) / 1700, 1), v = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(v * target); if (p < 1) requestAnimationFrame(step); else el.textContent = target })(0);
      requestAnimationFrame(ts => { let s = 0; (function step(ts) { if (!s) s = ts; const p = Math.min((ts - s) / 1700, 1), v = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(v * target); if (p < 1) requestAnimationFrame(step); else el.textContent = target })(ts) });
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  $$('.stat-num[data-count]').forEach(el => obs.observe(el));
}

/* ════ RENDER ABOUT ════ */
function renderAbout() {
  const cardsEl = $('#about-cards');
  const textEl = $('#about-text');
  if (!KB.about) return;

  if (cardsEl && KB.about.cards) {
    KB.about.cards.forEach((c, i) => {
      const d = ce('div', 'about-card glass');
      d.style.setProperty('--delay', `.${i * 2}s`);
      d.innerHTML = `<span class="about-card-icon">${c.icon}</span><div><strong>${c.title}</strong><small>${c.sub}</small></div>`;
      d.className += ' reveal-left';
      cardsEl.appendChild(d);
    });
  }

  if (textEl) {
    let html = `<p class="about-lead">${KB.about.lead}</p><div class="about-body">`;
    KB.about.body.forEach(p => { html += `<p>${p}</p>`; });
    html += `</div><div class="about-highlights">`;
    KB.about.highlights.forEach(h => { html += `<div class="highlight"><span class="h-icon">${h.icon}</span><span>${h.text}</span></div>`; });
    html += `</div><a href="#contact" class="btn btn-primary mt-2">Get In Touch</a>`;
    textEl.innerHTML = html;
  }
}

/* ════ SKILLS CAROUSEL ════ */
function renderSkills() {
  const track = $('#skills-track');
  if (!track || !KB.skills) return;
  KB.skills.forEach(s => {
    const card = ce('div', 'sc-card glass');
    card.innerHTML = `<i class="${s.icon} colored" aria-hidden="true"></i><h3>${s.name}</h3><div class="sc-bar"><span style="--w:${s.pct}%"></span></div><small>${s.pct}%</small>`;
    track.appendChild(card);
  });
}

function initSkillsCarousel() {
  const track = $('#skills-track');
  const vp = $('#skills-viewport');
  const prev = $('#skill-prev');
  const next = $('#skill-next');
  const dotsEl = $('#skills-dots');
  if (!track) return;

  const cards = $$('.sc-card', track);
  let cur = 0, pv = perView();
  let pages = Math.ceil(cards.length / pv);

  function perView() {
    const w = vp?.offsetWidth || window.innerWidth;
    if (w >= 1100) return 6; if (w >= 850) return 5; if (w >= 640) return 4; if (w >= 440) return 3; return 2;
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const b = ce('button', 'c-dot' + (i === cur ? ' active' : ''));
      b.setAttribute('role', 'tab'); b.setAttribute('aria-label', `Skills page ${i + 1}`);
      on(b, 'click', () => goTo(i));
      dotsEl.appendChild(b);
    }
  }

  function goTo(idx) {
    cur = Math.max(0, Math.min(idx, pages - 1));
    const cardW = cards[0] ? cards[0].offsetWidth + 16 : 186; // 170 + 1rem gap
    track.style.transform = `translateX(-${cur * pv * cardW}px)`;
    // Animate bars
    const st = cur * pv;
    cards.forEach((c, i) => {
      const bar = c.querySelector('.sc-bar span');
      if (!bar) return;
      bar.classList.remove('animated'); void bar.offsetWidth;
      if (i >= st && i < st + pv) setTimeout(() => bar.classList.add('animated'), 80);
    });
    $$('.c-dot', dotsEl).forEach((d, i) => d.classList.toggle('active', i === cur));
    if (prev) prev.disabled = cur === 0;
    if (next) next.disabled = cur >= pages - 1;
  }

  on(prev, 'click', () => goTo(cur - 1));
  on(next, 'click', () => goTo(cur + 1));

  // Drag
  addDragSupport(track, () => goTo(cur - 1), () => goTo(cur + 1), 40);
  track.addEventListener('pointerdown', () => track.classList.add('dragging'));
  track.addEventListener('pointerup', () => track.classList.remove('dragging'));

  on(window, 'resize', () => { const p = perView(); if (p !== pv) { pv = p; pages = Math.ceil(cards.length / pv); cur = 0; buildDots(); goTo(0) } });

  // Animate on scroll into view
  const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) goTo(0) }, { threshold: .2 });
  const sec = $('#skills'); if (sec) obs.observe(sec);

  buildDots(); if (prev) prev.disabled = true;
}

/* ════ RENDER PROJECTS ════ */
function renderProjects() {
  const grid = $('#projects-grid');
  if (!grid || !KB.projects) return;
  KB.projects.forEach((p, i) => {
    const a = ce('article', 'project-card glass reveal-up');
    a.dataset.category = p.category;
    if (i > 0) a.style.setProperty('--delay', `${(i % 3) * .1}s`);
    a.innerHTML = `
      <div class="proj-img-wrap">
        <div class="proj-img" style="background:${p.grad}">${p.emoji}</div>
        <div class="proj-overlay">
          <a href="${p.live}" class="btn btn-ghost btn-sm" target="_blank">Live ↗</a>
          <a href="${p.repo}" class="btn btn-ghost btn-sm" target="_blank">GitHub ↗</a>
        </div>
      </div>
      <div class="proj-body">
        <div class="proj-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>`;
    grid.appendChild(a);
  });
}

/* ════ PROJECT FILTER ════ */
function initProjectFilter() {
  const btns = $$('.filter-btn');
  on(document, 'click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    btns.forEach(b => b.classList.remove('active')); btn.classList.add('active');
    const f = btn.dataset.filter;
    $$('.project-card').forEach(c => {
      const show = f === 'all' || c.dataset.category === f;
      if (show) { c.style.opacity = '0'; c.classList.remove('hidden'); setTimeout(() => c.style.opacity = '1', 10) }
      else { c.style.opacity = '0'; setTimeout(() => c.classList.add('hidden'), 280) }
    });
  });
}

/* ════ RENDER EXPERIENCE ════ */
function renderExperience() {
  const tl = $('#timeline');
  if (!tl || !KB.experience) return;
  KB.experience.forEach((e, i) => {
    const d = ce('div', 'tl-item reveal-up');
    if (i > 0) d.style.setProperty('--delay', `${i * .1}s`);
    d.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-card glass">
        <div class="tl-head">
          <div><h3>${e.title}</h3><p class="tl-company">${e.company}</p></div>
          <div class="tl-meta">
            <span class="tl-date">${e.period}</span>
            ${e.current ? '<span class="tl-badge">Current</span>' : ''}
          </div>
        </div>
        <ul class="tl-points">${e.points.map(p => `<li>${p}</li>`).join('')}</ul>
        <div class="tl-tech">${e.tech.map(t => `<span>${t}</span>`).join('')}</div>
      </div>`;
    tl.appendChild(d);
  });
}

/* ════ RENDER EDUCATION ════ */
function renderEducation() {
  const grid = $('#edu-grid');
  if (!grid) return;
  (KB.education || []).forEach((e, i) => {
    const d = ce('div', 'edu-card glass reveal-up');
    if (i > 0) d.style.setProperty('--delay', `${i * .1}s`);
    d.innerHTML = `
      <div class="edu-icon">${e.icon}</div>
      <div class="edu-body">
        <h3>${e.degree}</h3>
        <p class="edu-inst">${e.institute}</p>
        <div class="edu-meta"><span>${e.period}</span><span class="edu-grade">${e.grade}</span></div>
        <ul class="edu-pts">${e.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>`;
    grid.appendChild(d);
  });
  // Certs card
  if (KB.certifications) {
    const d = ce('div', 'edu-card glass reveal-up');
    d.style.setProperty('--delay', `.${(KB.education || []).length}s`);
    d.innerHTML = `
      <div class="edu-icon">📜</div>
      <div class="edu-body">
        <h3>Certifications</h3>
        <p class="edu-inst">Professional Certifications</p>
        <ul class="cert-list">${KB.certifications.map(c => `<li><span class="cert-badge">${c.badge}</span>${c.title}</li>`).join('')}</ul>
      </div>`;
    grid.appendChild(d);
  }
}

/* ════ RENDER LIFE AT ════ */
function renderLifeAt() {
  const tl = $('#life-timeline');
  if (!tl || !KB.lifeAt) return;
  KB.lifeAt.forEach((l, i) => {
    const d = ce('div', 'life-item');
    d.innerHTML = `
      <div class="life-icon-col">
        <div class="life-icon">${l.icon}</div>
        ${l.last ? '' : '<div class="life-line"></div>'}
      </div>
      <div class="life-card glass reveal-up" style="--delay:${i * .15}s">
        <div class="life-head">
          <div>
            <span class="life-tag">${l.period}</span>
            <h3>${l.title}</h3>
            <p class="life-place">${l.place}</p>
          </div>
          <div class="life-emoji">${l.emoji}</div>
        </div>
        ${l.body.map(p => `<p>${p}</p>`).join('')}
        <div class="life-h">${l.highlights.map(h => `<span>${h}</span>`).join('')}</div>
      </div>`;
    tl.appendChild(d);
  });
}

/* ════ RENDER TESTIMONIALS ════ */
function renderTestimonials() {
  const track = $('#test-track');
  if (!track || !KB.testimonials) return;
  KB.testimonials.forEach(t => {
    const d = ce('div', 'test-card glass');
    d.innerHTML = `
      <div class="test-quote">❝</div>
      <p>${t.text}</p>
      <div class="test-author">
        <div class="test-avatar" style="background:${t.grad}">${t.initials}</div>
        <div><strong>${t.name}</strong><small>${t.role}</small></div>
        <div class="test-stars">★★★★★</div>
      </div>`;
    track.appendChild(d);
  });
}

/* ════ TESTIMONIALS CAROUSEL ════ */
function initTestimonials() {
  const track = $('#test-track');
  const dots = $('#test-dots');
  const prev = $('#test-prev');
  const next = $('#test-next');
  if (!track) return;
  const cards = $$('.test-card', track);
  let cur = 0, pv = perV(), pages = Math.ceil(cards.length / pv), autoT;

  function perV() { if (window.innerWidth >= 1024) return 3; if (window.innerWidth >= 640) return 2; return 1 }

  function buildDots() {
    dots.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const b = ce('button', 'c-dot' + (i === cur ? ' active' : ''));
      b.setAttribute('role', 'tab'); b.setAttribute('aria-label', `Testimonial ${i + 1}`);
      on(b, 'click', () => goTo(i)); dots.appendChild(b);
    }
  }

  function goTo(idx) {
    cur = (idx + pages) % pages;
    const cw = track.scrollWidth / cards.length;
    track.style.transform = `translateX(-${cur * pv * cw}px)`;
    $$('.c-dot', dots).forEach((d, i) => d.classList.toggle('active', i === cur));
    clearInterval(autoT); autoT = setInterval(() => goTo(cur + 1), 4500);
  }

  on(prev, 'click', () => goTo(cur - 1));
  on(next, 'click', () => goTo(cur + 1));

  // Drag
  addDragSupport(track, () => goTo(cur - 1), () => goTo(cur + 1));
  track.addEventListener('pointerdown', () => track.classList.add('dragging'));
  track.addEventListener('pointerup', () => track.classList.remove('dragging'));

  on(window, 'resize', () => { const p = perV(); if (p !== pv) { pv = p; pages = Math.ceil(cards.length / pv); cur = 0; buildDots(); goTo(0) } });
  buildDots(); goTo(0);
}

/* ════ CONTACT FORM ════ */
function initContactForm() {
  const form = $('#contact-form');
  const btn = $('#submit-btn');
  const suc = $('#form-success');
  if (!form) return;

  const v = id => ($(id, form)?.value || '').trim();
  const err = (id, msg) => { const inp = $(id, form), e = inp?.parentElement?.querySelector('.form-error'); if (inp) inp.classList.toggle('error', !!msg); if (e) e.textContent = msg; return !!msg };

  function validate() {
    let bad = false;
    if (!v('#cf-name')) bad |= err('#cf-name', 'Name is required.'); else err('#cf-name', '');
    const em = v('#cf-email');
    if (!em) bad |= err('#cf-email', 'Email required.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) bad |= err('#cf-email', 'Enter a valid email.');
    else err('#cf-email', '');
    if (!v('#cf-subject')) bad |= err('#cf-subject', 'Subject is required.'); else err('#cf-subject', '');
    if (v('#cf-msg').length < 10) bad |= err('#cf-msg', 'Message must be at least 10 characters.'); else err('#cf-msg', '');
    return !bad;
  }

  on(form, 'submit', async e => {
    e.preventDefault(); if (!validate()) return;
    btn.classList.add('loading'); btn.disabled = true; suc.classList.remove('visible');
    await new Promise(r => setTimeout(r, 1700));
    btn.classList.remove('loading'); btn.disabled = false; form.reset();
    suc.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
    suc.classList.add('visible');
    setTimeout(() => suc.classList.remove('visible'), 5000);
  });

  $$('input,textarea', form).forEach(el => on(el, 'input', () => { el.classList.remove('error'); const e = el.parentElement.querySelector('.form-error'); if (e) e.textContent = '' }));
}

/* ════ MISC ════ */
function initMisc() {
  on(document, 'click', e => {
    const lnk = e.target.closest('a[href^="#"]');
    if (!lnk) return;
    const t = $(lnk.getAttribute('href'));
    if (!t) return; e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  on($('#back-to-top'), 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
}

/* ════ BOOT ════ */
document.addEventListener('DOMContentLoaded', () => {
  // Render dynamic sections from data.js first
  renderAbout();
  renderSkills();
  renderProjects();
  renderExperience();
  renderEducation();
  renderLifeAt();
  renderTestimonials();

  // Then init all interactions
  initLoader();
  initCursor();
  initScrollBar();
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
