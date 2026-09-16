/* J Prestige Construction — site behaviour */
(function () {
  const PHONE = '2892371389';

  // nav background after scroll
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // section reveals (one-shot)
  const rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    rv.forEach((el) => io.observe(el));
  } else {
    rv.forEach((el) => el.classList.add('in'));
  }

  // year
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());

  // quote form
  const form = document.getElementById('quoteForm');
  if (!form) return;
  const msg = document.getElementById('formMsg');
  const btn = document.getElementById('submitBtn');
  const keyInput = form.querySelector('input[name="access_key"]');
  const hasKey = keyInput && keyInput.value && keyInput.value !== 'WEB3FORMS_KEY';

  const show = (kind, text) => { msg.className = 'msg ' + kind; msg.textContent = text; };

  const summary = (fd) => {
    const g = (k) => (fd.get(k) || '').toString().trim();
    return [
      'Hi Roman, quote request from the website.',
      'Name: ' + g('name'),
      'Phone: ' + g('phone'),
      g('email') ? 'Email: ' + g('email') : '',
      'City: ' + g('city'),
      'Project: ' + g('project_type'),
      g('budget') ? 'Budget: ' + g('budget') : '',
      g('message') ? 'Details: ' + g('message') : ''
    ].filter(Boolean).join('\n');
  };

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!form.reportValidity()) return;
    const fd = new FormData(form);

    if (!hasKey) {
      // fallback until the Web3Forms key is set: hand off to SMS / email
      const body = summary(fd);
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const sep = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? '&' : '?';
      const href = isMobile
        ? 'sms:+1' + PHONE + sep + 'body=' + encodeURIComponent(body)
        : 'mailto:romanojano78@gmail.com?subject=' + encodeURIComponent('Quote request - J Prestige Construction') + '&body=' + encodeURIComponent(body);
      window.location.href = href;
      show('ok', isMobile ? 'Opening your messages app with the details filled in. Hit send and Roman will call you back today.' : 'Opening your email with the details filled in. Send it and Roman will reply today.');
      return;
    }

    btn.disabled = true; btn.textContent = 'Sending...';
    try {
      const res = await fetch(form.action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        form.reset();
        show('ok', 'Sent. Roman will call you back today. If it is urgent, call 289-237-1389 now.');
      } else {
        throw new Error(data.message || 'Send failed');
      }
    } catch (err) {
      show('err', 'The form could not send. Call or text 289-237-1389 and Roman will take the details directly.');
    } finally {
      btn.disabled = false; btn.textContent = 'Request a quote';
    }
  });
})();
