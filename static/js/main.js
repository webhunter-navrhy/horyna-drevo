// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukázka formuláře: nic se neodesílá. Po spuštění webu bude zpráva doručena na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odesílám…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Děkujeme, zpráva byla odeslána.'; })
        .catch(function () { stav.textContent = 'Odeslání se nepodařilo. Napište nám prosím e-mailem.'; });
    });
  });
})();
// Letokruhy v hero se při scrollu pomalu rozšiřují; sekce se jemně odkryjí.
(function () {
  document.documentElement.classList.add('js');
  var k = document.querySelector('.kruhy');
  if (k && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addEventListener('scroll', function () { k.style.setProperty('--k', (1 + Math.min(scrollY, 1200) / 1200 * 0.35).toFixed(3)); }, { passive: true });
  }
  var els = document.querySelectorAll('.sekce .wrap > *, .model');
  els.forEach(function (e) { e.setAttribute('data-r', ''); });
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('v'); }); return; }
  var io = new IntersectionObserver(function (z) { z.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('v'); io.unobserve(x.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (e) { io.observe(e); });
})();
