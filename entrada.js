/* ═══════════════════════════════════════════════════════════════
   Babyloon · La entrada
   ───────────────────────────────────────────────────────────────
   Andrés (26-nov): que el inicio tenga algo como Sublimotion Ibiza,
   con el logo de Babyloon. Una pantalla de entrada: la doble O se
   dibuja en dorado, aparece «Babyloon», el lema y «Entrar».

   DECISIONES
   · Se carga justo después de <body>, para que no se vea la página
     un instante antes de taparla.
   · Una vez por visita (sessionStorage). Quien llega con un ancla
     (#acceso, #app…) o desde otra página de la web no la ve: viene
     a algo concreto.
   · La web sigue debajo, entera: Google la lee igual.
   · «Saltar», Intro y Escape la cierran. Quien prefiere que nada se
     mueva la ve quieta.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  try {
    if (sessionStorage.getItem('bbl_entrada') === '1') return;
  } catch (_) {}
  if (location.hash && location.hash.length > 1) return;
  try {
    if (document.referrer && new URL(document.referrer).host === location.host) return;
  } catch (_) {}

  var quieto = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var lang = 'es';
  try { lang = localStorage.getItem('bbl_lang') || ''; } catch (_) {}
  if (!lang) lang = ((navigator.languages && navigator.languages[0]) || navigator.language || 'es').slice(0, 2);
  var TXT = {
    es: ['Entrar', 'Saltar'], en: ['Enter', 'Skip'], pt: ['Entrar', 'Saltar'],
    de: ['Eintreten', 'Überspringen'], fr: ['Entrer', 'Passer'], it: ['Entra', 'Salta'],
    nl: ['Binnengaan', 'Overslaan'], sv: ['Gå in', 'Hoppa över'], pl: ['Wejdź', 'Pomiń'],
    el: ['Είσοδος', 'Παράλειψη'], hu: ['Belépés', 'Kihagyás'], ru: ['Войти', 'Пропустить'],
    ar: ['دخول', 'تخطي'], zh: ['进入', '跳过'], ja: ['入る', 'スキップ'], ko: ['입장', '건너뛰기']
  };
  var tx = TXT[lang] || TXT.en;
  var LOGO_D = 'M60 30C60 16 48 8 34 8C18 8 8 18 8 30C8 42 18 52 34 52C48 52 60 44 60 30C60 16 72 8 86 8C102 8 112 18 112 30C112 42 102 52 86 52C72 52 60 44 60 30Z';

  var css = document.createElement('style');
  css.textContent = [
    '#bblEntrada{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;',
      'background:radial-gradient(120% 90% at 50% 40%,#1b1419 0%,#0D0B0F 62%);',
      'transition:opacity 1.1s ease,transform 1.4s cubic-bezier(.2,.7,.1,1),visibility 0s 1.4s}',
    '#bblEntrada.fuera{opacity:0;transform:scale(1.08);visibility:hidden;pointer-events:none}',
    '#bblEntrada canvas{position:absolute;inset:0;width:100%;height:100%}',
    '#bblEntrada .be-c{position:relative;text-align:center;display:flex;flex-direction:column;align-items:center;padding:0 16px}',
    '#bblEntrada svg{width:min(300px,62vw);height:auto;overflow:visible}',
    '#bblEntrada svg path{stroke-dasharray:420;stroke-dashoffset:420;filter:drop-shadow(0 0 10px rgba(243,224,188,.35))}',
    '#bblEntrada.dibuja svg path{animation:beTrazo 2.6s cubic-bezier(.6,.05,.3,1) forwards}',
    '@keyframes beTrazo{to{stroke-dashoffset:0}}',
    '#bblEntrada .be-wm{font-family:"Cormorant Garamond",serif;font-weight:300;color:#F9F5EE;',
      'font-size:clamp(46px,8vw,96px);letter-spacing:.06em;margin-top:22px;opacity:0;transform:translateY(14px);',
      'transition:opacity 1.2s ease,transform 1.2s ease,letter-spacing 2.4s ease}',
    '#bblEntrada .be-lema{font-family:"Cormorant Garamond",serif;font-style:italic;color:#C8A96A;',
      'font-size:clamp(20px,2.6vw,30px);margin-top:10px;opacity:0;transition:opacity 1.2s ease .3s}',
    '#bblEntrada .be-btn{margin-top:46px;border:1px solid #C8A96A;background:transparent;color:#F3E0BC;',
      'padding:15px 44px;border-radius:999px;font-family:Jost,system-ui,sans-serif;font-size:14px;font-weight:500;',
      'letter-spacing:.38em;text-transform:uppercase;cursor:pointer;opacity:0;',
      'transition:opacity 1s ease .7s,background .3s,color .3s}',
    '#bblEntrada .be-btn:hover{background:#C8A96A;color:#0D0B0F}',
    '#bblEntrada .be-saltar{position:absolute;top:22px;right:24px;background:none;border:0;color:#8C7482;',
      'font-family:Jost,system-ui,sans-serif;font-size:12px;letter-spacing:.2em;text-transform:uppercase;cursor:pointer}',
    '#bblEntrada .be-saltar:hover{color:#F3E0BC}',
    '#bblEntrada.lista .be-wm{opacity:1;transform:none;letter-spacing:.02em}',
    '#bblEntrada.lista .be-lema,#bblEntrada.lista .be-btn{opacity:1}',
    'html.be-abierta,html.be-abierta body{overflow:hidden}',
    '@media (prefers-reduced-motion: reduce){#bblEntrada svg path{stroke-dashoffset:0}',
      '#bblEntrada,#bblEntrada .be-wm,#bblEntrada .be-lema,#bblEntrada .be-btn{transition:none}}'
  ].join('');
  document.head.appendChild(css);

  var el = document.createElement('div');
  el.id = 'bblEntrada';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'Babyloon');
  el.innerHTML =
    '<canvas aria-hidden="true"></canvas>' +
    '<button class="be-saltar" type="button" data-be-entrar>' + tx[1] + '</button>' +
    '<div class="be-c">' +
      '<svg viewBox="0 0 120 60" aria-hidden="true"><defs><linearGradient id="beG" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#8E723F"/><stop offset=".42" stop-color="#F3E0BC"/>' +
        '<stop offset=".72" stop-color="#C9A96E"/><stop offset="1" stop-color="#9C8050"/></linearGradient></defs>' +
        '<path fill="none" stroke="url(#beG)" stroke-width="2.2" stroke-linecap="round" d="' + LOGO_D + '"/></svg>' +
      '<div class="be-wm">Babyloon</div>' +
      '<div class="be-lema" id="beLema">La belleza, donde tú estés.</div>' +
      '<button class="be-btn" type="button" data-be-entrar>' + tx[0] + '</button>' +
    '</div>';
  document.body.insertBefore(el, document.body.firstChild);
  document.documentElement.classList.add('be-abierta');

  // el polvo dorado del fondo
  var cv = el.querySelector('canvas'), cx = cv.getContext('2d');
  var W, H, dpr, motas = [], vivo = !quieto, t0 = performance.now();
  function medir() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    motas = [];
    var n = Math.round(Math.min(160, innerWidth * innerHeight / 9000));
    for (var i = 0; i < n; i++) motas.push({ x: Math.random() * W, y: Math.random() * H,
      r: (Math.random() * 1.4 + .3) * dpr, v: (Math.random() * .25 + .05) * dpr,
      a: Math.random() * 6.283, f: Math.random() * .6 + .2 });
  }
  medir(); addEventListener('resize', medir, { passive: true });
  function paso(ahora) {
    if (!vivo) return;
    var t = (ahora - t0) / 1000;
    cx.clearRect(0, 0, W, H);
    for (var i = 0; i < motas.length; i++) {
      var p = motas[i];
      p.y -= p.v; p.x += Math.sin(t * .4 + p.a) * .15 * dpr;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283);
      cx.fillStyle = 'rgba(243,224,188,' + (p.f * (.55 + .45 * Math.sin(t * 1.3 + p.a)) * .55) + ')';
      cx.fill();
    }
    requestAnimationFrame(paso);
  }
  if (vivo) requestAnimationFrame(paso);
  void el.offsetWidth;
  el.classList.add('dibuja');
  setTimeout(function () { el.classList.add('lista'); }, quieto ? 0 : 1900);

  // el lema en el idioma de la web, cuando el diccionario esté
  function lema() {
    try {
      if (!window.BBL || !BBL.t) return;
      var a = BBL.t('hero_h1a'), b = BBL.t('hero_h1b');
      if (a && b && a !== 'hero_h1a') document.getElementById('beLema').textContent = a + ' ' + b;
    } catch (_) {}
  }
  document.addEventListener('DOMContentLoaded', lema);
  document.addEventListener('bbl:lang', lema);

  var cerrada = false;
  function entrar() {
    if (cerrada) return; cerrada = true;
    el.classList.add('fuera');
    document.documentElement.classList.remove('be-abierta');
    try { sessionStorage.setItem('bbl_entrada', '1'); } catch (_) {}
    setTimeout(function () { vivo = false; if (el.parentNode) el.parentNode.removeChild(el); }, 1500);
  }
  el.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[data-be-entrar]')) entrar();
  });
  addEventListener('keydown', function (e) {
    if (!cerrada && (e.key === 'Enter' || e.key === 'Escape')) entrar();
  });
})();
