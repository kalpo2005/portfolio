/* ═══════════════════════════════════════════════════════
   KALPESH BAVALIYA – PORTFOLIO JS v4
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

/* ════ GLOBAL PARTICLE CANVAS (fixed, full-page) ════ */
function initCanvas() {
  const canvas = $('#particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: null, y: null }, animId;
  const N = 80, SP = .25, CR = 1.5, CD = 130;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class P {
    constructor() { this.reset() }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - .5) * SP;
      this.vy = (Math.random() - .5) * SP;
      this.r = Math.random() * CR + .4;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,113,227,.55)';
      ctx.fill();
    }
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.hypot(dx, dy);
        if (d < CD) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,113,227,${(1 - d / CD) * .25})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x, dy = particles[i].y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 180) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(41,151,255,${(1 - d / 180) * .45})`;
          ctx.lineWidth = .65;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    animId = requestAnimationFrame(loop);
  }

  on(window, 'resize', resize);
  on(document, 'mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  on(document, 'mouseleave', () => { mouse.x = null; });

  // Pause when tab hidden to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else loop();
  });

  resize();
  particles = Array.from({ length: N }, () => new P());
  loop();
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

/* ════ HERO TEXT CAROUSEL (right-side only, image stays pinned) ════ */
function initHeroTextSlider() {
  const slides = $$('.hero-text-slide');
  const dotsEl = $('#hts-dots');
  const prev = $('#hts-prev');
  const next = $('#hts-next');
  const prog = $('#hts-prog');
  if (!slides.length) return;

  const TOTAL = slides.length;
  const DUR = 6200;
  let cur = 0, animF, startTs;

  // Render hero stats (slide 2)
  const statsEl = $('#hero-stats');
  if (statsEl && KB.heroStats) {
    KB.heroStats.forEach(s => {
      const d = ce('div', 'stat');
      d.innerHTML = `<div><span class="stat-num" data-count="${s.count}">0</span><span class="stat-suffix">${s.suffix}</span></div><span class="stat-label">${s.label}</span>`;
      statsEl.appendChild(d);
    });
  }

  // Render tech pills (slide 3)
  const pillsEl = $('#tech-pills');
  if (pillsEl && KB.techPills) {
    KB.techPills.forEach(p => {
      pillsEl.appendChild(ce('span', 'tech-pill', p));
    });
  }

  // Build dots
  slides.forEach((_, i) => {
    const b = ce('button', 'slide-dot' + (i === 0 ? ' active' : ''));
    b.setAttribute('role', 'tab'); b.setAttribute('aria-label', `Slide ${i + 1}`);
    on(b, 'click', () => goTo(i));
    dotsEl.appendChild(b);
  });

  function updateDots(i) {
    $$('.slide-dot', dotsEl).forEach((d, j) => d.classList.toggle('active', j === i));
  }

  function goTo(idx) {
    // Fade out current
    slides[cur].classList.remove('active');
    cur = (idx + TOTAL) % TOTAL;
    // Fade in next
    slides[cur].classList.add('active');
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

  // Drag on the text column
  const wrapper = $('#hero-text-track');
  if (wrapper) addDragSupport(wrapper, () => goTo(cur - 1), () => goTo(cur + 1));

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

/* ════ NAVBAR + SIDE NAV ════ */
function initNavbar() {
  const nav = $('#navbar');
  const ham = $('#hamburger');
  const sideNav = $('#side-nav');
  const overlay = $('#nav-overlay');
  const closeBtn = $('#nav-close');
  const allLinks = $$('.nav-link, .side-nav-link');

  // Scroll state – active link + hide-on-scroll behaviour
  let lastScrollY = window.scrollY;
  on(window, 'scroll', () => {
    const sy = window.scrollY;
    // Hide navbar when scrolling down, reveal when scrolling up
    if (sy > lastScrollY && sy > 120) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastScrollY = sy;

    nav.classList.toggle('scrolled', sy > 50);
    const activeY = sy + 130;
    $$('section[id]').forEach(sec => {
      const link = document.querySelector(`.nav-link[href="#${sec.id}"], .side-nav-link[href="#${sec.id}"]`);
      if (link) link.classList.toggle('active', activeY >= sec.offsetTop && activeY < sec.offsetTop + sec.offsetHeight);
    });
    const btt = $('#back-to-top');
    if (btt) btt.classList.toggle('visible', sy > 380);
  }, { passive: true });

  function openNav() {
    sideNav.classList.add('open');
    overlay.classList.add('open');
    sideNav.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    ham.setAttribute('aria-expanded', 'true');
    ham.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    sideNav.classList.remove('open');
    overlay.classList.remove('open');
    sideNav.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    ham.setAttribute('aria-expanded', 'false');
    ham.classList.remove('open');
    document.body.style.overflow = '';
  }

  on(ham, 'click', () => sideNav.classList.contains('open') ? closeNav() : openNav());
  on(closeBtn, 'click', closeNav);
  on(overlay, 'click', closeNav);
  on(document, 'keydown', e => { if (e.key === 'Escape' && sideNav.classList.contains('open')) closeNav() });

  // Close on nav link click
  $$('.side-nav-link').forEach(l => on(l, 'click', closeNav));
}

/* ════ REVEAL ════ */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
  }, { threshold: .1, rootMargin: '0px 0px -35px 0px' });
  $$('.reveal-up,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
}

/* ════ COUNTERS ════ */
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count;
      requestAnimationFrame(ts => {
        let s = 0;
        (function step(ts) {
          if (!s) s = ts;
          const p = Math.min((ts - s) / 1700, 1), v = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(v * target);
          if (p < 1) requestAnimationFrame(step); else el.textContent = target;
        })(ts);
      });
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

/* ════ SKILLS – HORIZONTAL DRAG SCROLL ════ */
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
  const vp = $('#skills-viewport');
  const track = $('#skills-track');
  const prev = $('#skill-prev');
  const next = $('#skill-next');
  const dotsEl = $('#skills-dots');
  if (!vp || !track) return;

  // Animate bars when scrolled into view
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target.querySelector('.sc-bar span');
        if (bar) { bar.classList.remove('animated'); void bar.offsetWidth; setTimeout(() => bar.classList.add('animated'), 80); }
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px' });
  $$('.sc-card', track).forEach(c => barObs.observe(c));

  // Scroll step = width of 3 cards
  function cardWidth() {
    const c = track.firstElementChild;
    return c ? c.offsetWidth + 16 : 186;
  }

  function scrollBy(dir) {
    const step = cardWidth() * 3;
    vp.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  on(prev, 'click', () => scrollBy(-1));
  on(next, 'click', () => scrollBy(1));

  // Dot indicators based on scroll position
  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    const pages = Math.ceil(track.scrollWidth / vp.offsetWidth);
    for (let i = 0; i < pages; i++) {
      const b = ce('button', 'c-dot' + (i === 0 ? ' active' : ''));
      b.setAttribute('role', 'tab'); b.setAttribute('aria-label', `Skills page ${i + 1}`);
      on(b, 'click', () => { vp.scrollTo({ left: i * vp.offsetWidth, behavior: 'smooth' }); });
      dotsEl.appendChild(b);
    }
  }

  on(vp, 'scroll', () => {
    const idx = Math.round(vp.scrollLeft / vp.offsetWidth);
    $$('.c-dot', dotsEl).forEach((d, i) => d.classList.toggle('active', i === idx));
    if (prev) prev.disabled = vp.scrollLeft < 10;
    if (next) next.disabled = vp.scrollLeft + vp.offsetWidth >= track.scrollWidth - 10;
  }, { passive: true });

  // Pointer drag (desktop)
  let isDragging = false, dragStartX = 0, scrollStart = 0;
  on(vp, 'pointerdown', e => {
    isDragging = true; dragStartX = e.clientX; scrollStart = vp.scrollLeft;
    vp.setPointerCapture(e.pointerId); vp.classList.add('dragging');
  });
  on(vp, 'pointermove', e => {
    if (!isDragging) return;
    vp.scrollLeft = scrollStart - (e.clientX - dragStartX);
  });
  on(vp, 'pointerup', () => { isDragging = false; vp.classList.remove('dragging'); });
  on(vp, 'pointercancel', () => { isDragging = false; vp.classList.remove('dragging'); });

  on(window, 'resize', buildDots);
  buildDots();
  if (prev) prev.disabled = true;
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
// Default placeholder SVG avatar
function placeholderAvatar(initials, grad) {
  return `<div class="test-avatar-wrap" style="background:${grad}" aria-label="${initials}">
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="18" r="10" fill="rgba(255,255,255,0.3)"/>
      <ellipse cx="24" cy="40" rx="16" ry="10" fill="rgba(255,255,255,0.2)"/>
    </svg>
    <span class="test-initials">${initials}</span>
  </div>`;
}

function renderTestimonials() {
  const track = $('#test-track');
  if (!track || !KB.testimonials) return;
  KB.testimonials.forEach(t => {
    const d = ce('div', 'test-card glass');
    const avatarHTML = t.image
      ? `<div class="test-avatar-wrap img-avatar"><img src="${t.image}" alt="${t.name}" loading="lazy" /></div>`
      : placeholderAvatar(t.initials, t.grad);

    d.innerHTML = `
      <div class="test-quote">❝</div>
      <p>${t.text}</p>
      <div class="test-author">
        ${avatarHTML}
        <div><strong>${t.name}</strong><small>${t.role}</small></div>
        <div class="test-stars">★★★★★</div>
      </div>`;
    track.appendChild(d);
  });
}

/* ════ RENDER & INIT ACHIEVEMENTS ════ */
function renderAchievements() {
  const track = $('#ach-track');
  if (!track || !KB.achievements) return;
  KB.achievements.forEach((a, i) => {
    const card = ce('div', 'ach-card');
    card.dataset.achType = a.type;
    if (i > 0) card.style.setProperty('--delay', `${(i % 4) * .08}s`);
    // Banner
    const banner = ce('div', 'ach-banner');
    banner.style.background = a.color;
    if (a.image) {
      banner.innerHTML = `<img src="${a.image}" alt="${a.title}" loading="lazy" />`;
    } else {
      banner.innerHTML = `<span class="ach-banner-emoji">${a.badge}</span>`;
    }
    banner.innerHTML += `<span class="ach-type-badge ${a.type}">${a.type === 'certificate' ? 'Certificate' : 'Award'}</span>`;
    // Body
    const body = ce('div', 'ach-body');
    body.innerHTML = `<span class="ach-year">${a.year}</span><h3>${a.title}</h3><p class="ach-issuer">${a.issuer}</p><p class="ach-desc">${a.desc}</p>`;
    card.appendChild(banner);
    card.appendChild(body);
    track.appendChild(card);
  });
}

function initAchievementsSlider() {
  const vp = $('#ach-viewport');
  const track = $('#ach-track');
  const prev = $('#ach-prev');
  const next = $('#ach-next');
  const dotsEl = $('#ach-dots');
  if (!vp || !track) return;

  function cardWidth() {
    const c = track.firstElementChild;
    return c ? c.offsetWidth + 20 : 300;
  }

  function scrollBy(dir) {
    const pv = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    vp.scrollBy({ left: dir * cardWidth() * pv, behavior: 'smooth' });
  }

  on(prev, 'click', () => scrollBy(-1));
  on(next, 'click', () => scrollBy(1));

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    const cards = $$('.ach-card:not(.hidden)', track);
    const pv = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const pages = Math.ceil(cards.length / pv);
    for (let i = 0; i < pages; i++) {
      const b = ce('button', 'c-dot' + (i === 0 ? ' active' : ''));
      b.setAttribute('role', 'tab'); b.setAttribute('aria-label', `Achievement ${i + 1}`);
      on(b, 'click', () => { vp.scrollTo({ left: i * vp.offsetWidth, behavior: 'smooth' }); });
      dotsEl.appendChild(b);
    }
  }

  on(vp, 'scroll', () => {
    const visible = $$('.ach-card:not(.hidden)', track);
    if (!visible.length) return;
    const pv = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const idx = Math.round(vp.scrollLeft / cardWidth());
    const page = Math.floor(idx / pv);
    $$('.c-dot', dotsEl).forEach((d, i) => d.classList.toggle('active', i === page));
    if (prev) prev.disabled = vp.scrollLeft < 10;
    if (next) next.disabled = vp.scrollLeft + vp.offsetWidth >= track.scrollWidth - 10;
  }, { passive: true });

  // Pointer drag (desktop)
  let isDragging = false, dragStartX = 0, scrollStart = 0;
  on(vp, 'pointerdown', e => {
    isDragging = true; dragStartX = e.clientX; scrollStart = vp.scrollLeft;
    vp.setPointerCapture(e.pointerId); vp.classList.add('dragging');
  });
  on(vp, 'pointermove', e => {
    if (!isDragging) return;
    vp.scrollLeft = scrollStart - (e.clientX - dragStartX);
  });
  on(vp, 'pointerup', () => { isDragging = false; vp.classList.remove('dragging'); });
  on(vp, 'pointercancel', () => { isDragging = false; vp.classList.remove('dragging'); });

  // Filter logic
  on(document, 'click', e => {
    const btn = e.target.closest('.ach-filter-btn');
    if (!btn) return;
    $$('.ach-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.achFilter;
    $$('.ach-card', track).forEach(c => {
      const show = f === 'all' || c.dataset.achType === f;
      c.classList.toggle('hidden', !show);
    });
    vp.scrollTo({ left: 0, behavior: 'smooth' });
    buildDots();
  });

  on(window, 'resize', buildDots);
  buildDots();
  if (prev) prev.disabled = true;
}

/* ════ TESTIMONIALS – HORIZONTAL DRAG SCROLL ════ */
function initTestimonials() {
  const vp = $('#test-viewport');
  const track = $('#test-track');
  const prev = $('#test-prev');
  const next = $('#test-next');
  const dotsEl = $('#test-dots');
  if (!vp || !track) return;

  function cardWidth() {
    const c = track.firstElementChild;
    return c ? c.offsetWidth + 24 : 360;
  }

  function scrollBy(dir) {
    const pv = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    vp.scrollBy({ left: dir * cardWidth() * pv, behavior: 'smooth' });
  }

  on(prev, 'click', () => scrollBy(-1));
  on(next, 'click', () => scrollBy(1));

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    const cards = $$('.test-card', track);
    const pv = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const pages = Math.ceil(cards.length / pv);
    for (let i = 0; i < pages; i++) {
      const b = ce('button', 'c-dot' + (i === 0 ? ' active' : ''));
      b.setAttribute('role', 'tab'); b.setAttribute('aria-label', `Testimonial ${i + 1}`);
      on(b, 'click', () => { vp.scrollTo({ left: i * vp.offsetWidth, behavior: 'smooth' }); });
      dotsEl.appendChild(b);
    }
  }

  on(vp, 'scroll', () => {
    const idx = Math.round(vp.scrollLeft / (cardWidth()));
    const pv = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const page = Math.floor(idx / pv);
    $$('.c-dot', dotsEl).forEach((d, i) => d.classList.toggle('active', i === page));
    if (prev) prev.disabled = vp.scrollLeft < 10;
    if (next) next.disabled = vp.scrollLeft + vp.offsetWidth >= track.scrollWidth - 10;
  }, { passive: true });

  // Pointer drag (desktop)
  let isDragging = false, dragStartX = 0, scrollStart = 0;
  on(vp, 'pointerdown', e => {
    isDragging = true; dragStartX = e.clientX; scrollStart = vp.scrollLeft;
    vp.setPointerCapture(e.pointerId); vp.classList.add('dragging');
  });
  on(vp, 'pointermove', e => {
    if (!isDragging) return;
    vp.scrollLeft = scrollStart - (e.clientX - dragStartX);
  });
  on(vp, 'pointerup', () => { isDragging = false; vp.classList.remove('dragging'); });
  on(vp, 'pointercancel', () => { isDragging = false; vp.classList.remove('dragging'); });

  // Auto-advance
  let autoT = setInterval(() => {
    const maxScroll = track.scrollWidth - vp.offsetWidth;
    if (vp.scrollLeft >= maxScroll - 10) vp.scrollTo({ left: 0, behavior: 'smooth' });
    else vp.scrollBy({ left: cardWidth(), behavior: 'smooth' });
  }, 4500);

  on(vp, 'pointerdown', () => clearInterval(autoT));

  on(window, 'resize', buildDots);
  buildDots();
  if (prev) prev.disabled = true;
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
  // Render dynamic sections first
  renderAbout();
  renderSkills();
  renderProjects();
  renderExperience();
  renderEducation();
  renderLifeAt();
  renderTestimonials();
  renderAchievements();

  // Init interactions
  initLoader();
  initCursor();
  initScrollBar();
  initCanvas();
  initTypewriter();
  initHeroTextSlider();
  initNavbar();
  initReveal();
  initCounters();
  initSkillsCarousel();
  initProjectFilter();
  initTestimonials();
  initAchievementsSlider();
  initContactForm();
  initMisc();
});
