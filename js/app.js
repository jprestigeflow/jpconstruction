/* J Prestige Construction — v3 behaviour */
(function () {
  const PHONE = '2892371389';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const hasGsap = typeof gsap !== 'undefined';
  if (hasGsap && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduce && typeof Lenis !== 'undefined' && hasGsap) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollTo = (target) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      e.preventDefault();
      closeMenu();
      setTimeout(() => scrollTo(id), document.body.classList.contains('menu-open') ? 400 : 0);
    });
  });

  /* ---------- preloader ---------- */
  const loader = document.getElementById('loader');
  const heroSpans = document.querySelectorAll('.hero h1 .ln span');
  const heroKicker = document.getElementById('heroKicker');
  const heroFoot = document.getElementById('heroFoot');
  const introHero = () => {
    if (!hasGsap || reduce) {
      heroSpans.forEach((s) => (s.style.transform = 'none'));
      heroKicker.style.opacity = 1; heroFoot.style.opacity = 1; return;
    }
    const tl = gsap.timeline();
    tl.to(heroSpans, { y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.12 }, 0)
      .to(heroKicker, { opacity: 1, duration: .8 }, 0.5)
      .to(heroFoot, { opacity: 1, duration: .9 }, 0.8);
  };
  if (loader) {
    if (!hasGsap || reduce) { loader.remove(); introHero(); }
    else {
      lenis && lenis.stop();
      const num = document.getElementById('lNum');
      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: () => { loader.classList.add('done'); lenis && lenis.start(); introHero(); setTimeout(() => loader.remove(), 900); } });
      tl.to('#lMark', { opacity: 1, y: 0, duration: .9, ease: 'power3.out' })
        .to('#lWord', { opacity: 1, duration: .7 }, '-=.4')
        .to('#lLine', { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, '-=.6')
        .to(counter, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, '0')) }, '<')
        .to('#loader .l-in, #lNum', { opacity: 0, duration: .4 }, '+=.15')
        .to(loader, { yPercent: -100, duration: .9, ease: 'power4.inOut' }, '-=.1');
    }
  } else introHero();

  /* ---------- menu ---------- */
  const burger = document.getElementById('burger');
  const openMenu = () => { document.body.classList.add('menu-open'); burger.setAttribute('aria-expanded', 'true'); lenis && lenis.stop(); };
  function closeMenu() { if (!document.body.classList.contains('menu-open')) return; document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); lenis && lenis.start(); }
  burger && burger.addEventListener('click', () => (document.body.classList.contains('menu-open') ? closeMenu() : openMenu()));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

  /* ---------- cursor + magnetic ---------- */
  if (fine && !reduce && hasGsap) {
    const c1 = document.querySelector('.cur'), c2 = document.querySelector('.cur2');
    const x1 = gsap.quickTo(c1, 'x', { duration: .08 }), y1 = gsap.quickTo(c1, 'y', { duration: .08 });
    const x2 = gsap.quickTo(c2, 'x', { duration: .35, ease: 'power3' }), y2 = gsap.quickTo(c2, 'y', { duration: .35, ease: 'power3' });
    window.addEventListener('pointermove', (e) => { x1(e.clientX); y1(e.clientY); x2(e.clientX); y2(e.clientY); }, { passive: true });
    document.querySelectorAll('[data-hover]').forEach((el) => {
      el.addEventListener('pointerenter', () => document.body.classList.add('hovering'));
      el.addEventListener('pointerleave', () => document.body.classList.remove('hovering'));
    });
    document.querySelectorAll('[data-magnet]').forEach((el) => {
      const mx = gsap.quickTo(el, 'x', { duration: .4, ease: 'power3' }), my = gsap.quickTo(el, 'y', { duration: .4, ease: 'power3' });
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * .25); my((e.clientY - r.top - r.height / 2) * .35); });
      el.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  }

  /* ---------- scroll choreography ---------- */
  if (hasGsap && !reduce) {
    // hero parallax + fade
    gsap.to('#heroMedia', { yPercent: 18, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('#hero .wrap', { yPercent: -10, opacity: 0, ease: 'none', scrollTrigger: { trigger: '#hero', start: '40% top', end: 'bottom top', scrub: true } });

    // line reveals
    document.querySelectorAll('.line-rev > span').forEach((s) => {
      gsap.to(s, { y: 0, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: s, start: 'top 88%' } });
    });

    // manifesto word-by-word
    const m = document.getElementById('manifestoText');
    if (m) {
      const frag = document.createDocumentFragment();
      m.childNodes.forEach((node) => {
        const gold = node.nodeType === 1 && node.classList.contains('gold');
        node.textContent.split(/\s+/).filter(Boolean).forEach((w) => {
          const s = document.createElement('span'); s.className = 'w' + (gold ? ' gold' : ''); s.textContent = w; frag.appendChild(s); frag.appendChild(document.createTextNode(' '));
        });
      });
      m.innerHTML = ''; m.appendChild(frag);
      const words = m.querySelectorAll('.w');
      ScrollTrigger.create({
        trigger: m, start: 'top 75%', end: 'bottom 45%', scrub: true,
        onUpdate: (self) => { const n = Math.round(self.progress * words.length); words.forEach((w, i) => w.classList.toggle('on', i < n)); }
      });
    }

    // numbers count
    document.querySelectorAll('[data-count]').forEach((el) => {
      const end = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
      const o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => (el.textContent = pre + Math.round(o.v) + suf) }) });
    });

    // services horizontal pin (desktop)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', () => {
      const track = document.getElementById('svcTrack'), pin = document.getElementById('svcPin');
      const dist = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: pin, start: 'center center', end: () => '+=' + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (s) => { document.getElementById('svcBar').style.width = (25 + s.progress * 75) + '%'; }
        }
      });
    });

    // standard list gold lines
    document.querySelectorAll('.std').forEach((el) => ScrollTrigger.create({ trigger: el, start: 'top 80%', onEnter: () => el.classList.add('on') }));

    // process timeline
    const tlEl = document.getElementById('tl');
    if (tlEl) {
      const steps = tlEl.querySelectorAll('.step');
      ScrollTrigger.create({ trigger: tlEl, start: 'top 70%', end: 'bottom 60%', scrub: true, onUpdate: (s) => { tlEl.style.setProperty('--p', (s.progress * 100) + '%'); steps.forEach((st, i) => st.classList.toggle('on', s.progress >= i / steps.length + 0.05)); } });
    }

    // marquees (scroll-linked speed)
    document.querySelectorAll('.mq').forEach((mq) => {
      const speed = parseFloat(mq.dataset.speed || '1');
      const half = () => mq.scrollWidth / 2;
      let x = 0, vel = 0;
      ScrollTrigger.create({ trigger: mq, start: 'top bottom', end: 'bottom top', onUpdate: (s) => { vel = s.getVelocity() / 600; } });
      gsap.ticker.add(() => {
        x -= (0.6 + Math.min(Math.abs(vel), 6)) * speed;
        vel *= 0.9;
        const h = half(); if (x < -h) x += h; if (x > 0) x -= h;
        mq.style.transform = 'translate3d(' + x + 'px,0,0)';
      });
    });
  } else {
    document.querySelectorAll('.line-rev > span').forEach((s) => (s.style.transform = 'none'));
    document.querySelectorAll('.std, .step').forEach((el) => el.classList.add('on'));
    const tlEl = document.getElementById('tl'); tlEl && tlEl.style.setProperty('--p', '100%');
    document.querySelectorAll('[data-count]').forEach((el) => (el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '')));
  }

  /* ---------- testimonials ---------- */
  const quotes = document.querySelectorAll('.quote'), dots = document.querySelectorAll('#qnav button');
  let qi = 0, qt;
  const showQ = (i) => { qi = i; quotes.forEach((q, k) => q.classList.toggle('on', k === i)); dots.forEach((d, k) => d.classList.toggle('on', k === i)); };
  const autoQ = () => { clearInterval(qt); qt = setInterval(() => showQ((qi + 1) % quotes.length), 6500); };
  dots.forEach((d, i) => d.addEventListener('click', () => { showQ(i); autoQ(); }));
  if (quotes.length) autoQ();

  /* ---------- year ---------- */
  const yr = document.getElementById('yr'); if (yr) yr.textContent = String(new Date().getFullYear());

  /* ---------- quote form ---------- */
  const form = document.getElementById('quoteForm');
  if (!form) return;
  const msg = document.getElementById('formMsg'), btn = document.getElementById('submitBtn');
  const keyInput = form.querySelector('input[name="access_key"]');
  const hasKey = keyInput && keyInput.value && keyInput.value !== 'WEB3FORMS_KEY';
  const show = (kind, text) => { msg.className = 'msg ' + kind; msg.textContent = text; };
  const summary = (fd) => {
    const g = (k) => (fd.get(k) || '').toString().trim();
    return ['Hi Roman, quote request from the website.', 'Name: ' + g('name'), 'Phone: ' + g('phone'), g('email') ? 'Email: ' + g('email') : '', 'City: ' + g('city'), 'Project: ' + g('project_type'), g('budget') ? 'Budget: ' + g('budget') : '', g('message') ? 'Details: ' + g('message') : ''].filter(Boolean).join('\n');
  };
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    if (!hasKey) {
      const body = summary(fd);
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const sep = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? '&' : '?';
      window.location.href = isMobile
        ? 'sms:+1' + PHONE + sep + 'body=' + encodeURIComponent(body)
        : 'mailto:romanojano78@gmail.com?subject=' + encodeURIComponent('Quote request - J Prestige Construction') + '&body=' + encodeURIComponent(body);
      show('ok', isMobile ? 'Opening your messages app with the details filled in. Hit send and Roman will call you back today.' : 'Opening your email with the details filled in. Send it and Roman will reply today.');
      return;
    }
    btn.disabled = true; btn.textContent = 'SENDING';
    try {
      const res = await fetch(form.action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) { form.reset(); show('ok', 'Sent. Roman will call you back today. If it is urgent, call 289-237-1389 now.'); }
      else throw new Error(data.message || 'Send failed');
    } catch (err) {
      show('err', 'The form could not send. Call or text 289-237-1389 and Roman will take the details directly.');
    } finally { btn.disabled = false; btn.textContent = 'REQUEST A QUOTE'; }
  });
})();
