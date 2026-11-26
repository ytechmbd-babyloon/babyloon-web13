/* ═══════════════════════════════════════════════════════════════
   Babyloon · La entrada
   ───────────────────────────────────────────────────────────────
   Andrés (26-nov): «me gusta, pero hay que adaptarlo más a lo que es
   Babyloon: fuente, colores, diseño, minimalista y elegante, no tan
   disruptivo, con un toque de innovación… quiero que Babyloon esté
   presente todo el tiempo».

   Qué es: el logo de doble O se dibuja en dorado sobre la noche de la
   marca (ciruela y tinta), con una niebla muy suave, polvo de oro y un
   horizonte fino. El toque de innovación vive DENTRO del logo: una luz
   lo recorre sin parar, el dorado responde al cursor y, si se mantiene
   pulsado, el oro va llenando el trazo hasta entrar.

   DECISIONES
   · El logo es el SVG oficial y no se deforma nunca: Babyloon se
     reconoce en todo momento. Arriba, la firma de la marca.
   · Colores y tipografías de la web (tinta #0D0B0F, ciruela, dorado
     #C8A96A / #F3E0BC; Cormorant Garamond y Jost).
   · Se entra con «Entrar», manteniendo pulsada la doble O, deslizando
     hacia arriba o con la rueda.
   · Una vez por visita (sessionStorage). Quien llega con un ancla
     (#acceso, #app…) o desde otra página de la web no la ve.
   · Se carga justo después de <body>: no se ve la página antes.
     La web sigue debajo, entera: Google la lee igual.
   · «Saltar», Intro y Escape cierran. Con «reducir movimiento», quieta.
   · El aviso de cookies queda por encima, a propósito; «Hablar con
     Baby» se oculta mientras la entrada está abierta.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  try { if (sessionStorage.getItem('bbl_entrada') === '1') return; } catch (_) {}
  if (location.hash && location.hash.length > 1) return;
  try {
    if (document.referrer && new URL(document.referrer).host === location.host) return;
  } catch (_) {}

  var quieto = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tactil = window.matchMedia && matchMedia('(pointer: coarse)').matches;

  /* ── textos en el idioma de la web ── */
  var lang = 'es';
  try { lang = localStorage.getItem('bbl_lang') || ''; } catch (_) {}
  if (!lang) lang = ((navigator.languages && navigator.languages[0]) || navigator.language || 'es').slice(0, 2);
  //        entrar, saltar, pista (ratón), pista (táctil)
  var TXT = {
    es: ['Entrar', 'Saltar', 'Mantén pulsada la doble O para entrar', 'Mantén pulsada la doble O o desliza hacia arriba'],
    en: ['Enter', 'Skip', 'Press and hold the double O to enter', 'Press and hold the double O or swipe up'],
    pt: ['Entrar', 'Saltar', 'Mantém premido o duplo O para entrar', 'Mantém premido o duplo O ou desliza para cima'],
    fr: ['Entrer', 'Passer', 'Maintenez le double O pour entrer', 'Maintenez le double O ou glissez vers le haut'],
    de: ['Eintreten', 'Überspringen', 'Halten Sie das Doppel-O gedrückt', 'Doppel-O gedrückt halten oder nach oben wischen'],
    it: ['Entra', 'Salta', 'Tieni premuta la doppia O per entrare', 'Tieni premuta la doppia O o scorri verso l’alto'],
    nl: ['Binnengaan', 'Overslaan', 'Houd de dubbele O ingedrukt om binnen te gaan', 'Houd de dubbele O ingedrukt of veeg omhoog'],
    sv: ['Gå in', 'Hoppa över', 'Håll in dubbel-O för att gå in', 'Håll in dubbel-O eller svep uppåt'],
    pl: ['Wejdź', 'Pomiń', 'Przytrzymaj podwójne O, aby wejść', 'Przytrzymaj podwójne O lub przesuń w górę'],
    el: ['Είσοδος', 'Παράλειψη', 'Κρατήστε πατημένο το διπλό O για είσοδο', 'Κρατήστε πατημένο το διπλό O ή σύρετε προς τα πάνω'],
    hu: ['Belépés', 'Kihagyás', 'Tartsd lenyomva a dupla O-t a belépéshez', 'Tartsd lenyomva a dupla O-t, vagy húzd felfelé'],
    ru: ['Войти', 'Пропустить', 'Удерживайте двойное O, чтобы войти', 'Удерживайте двойное O или проведите вверх'],
    ar: ['دخول', 'تخطي', 'اضغط مطولاً على الحرفين O للدخول', 'اضغط مطولاً على الحرفين O أو اسحب للأعلى'],
    zh: ['进入', '跳过', '长按双 O 进入', '长按双 O 或向上滑动'],
    ja: ['入る', 'スキップ', 'ダブルOを長押しして入る', 'ダブルOを長押しするか、上にスワイプ'],
    ko: ['입장', '건너뛰기', '더블 O를 길게 눌러 입장', '더블 O를 길게 누르거나 위로 밀기']
  };
  var tx = TXT[lang] || TXT.en;

  // ciudades del plan de apertura, con sus coordenadas
  var CIUDADES = [
    ['Marbella', "36°30'N 04°53'W"], ['Madrid', "40°25'N 03°42'W"],
    ['Palma', "39°34'N 02°39'E"], ['Lisboa', "38°43'N 09°08'W"],
    ['Barcelona', "41°23'N 02°10'E"], ['Málaga', "36°43'N 04°25'W"],
    ['Miami', "25°45'N 80°11'W"], ['Ibiza', "38°54'N 01°26'E"]
  ];
  var LOGO = 'M60 30C60 16 48 8 34 8C18 8 8 18 8 30C8 42 18 52 34 52C48 52 60 44 60 30C60 16 72 8 86 8C102 8 112 18 112 30C112 42 102 52 86 52C72 52 60 44 60 30Z';

  /* ── el vestido ── */
  var css = document.createElement('style');
  css.textContent = [
    '#bblEntrada{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;justify-content:space-between;',
      'align-items:center;overflow:hidden;font-family:Jost,system-ui,sans-serif;',
      'background:radial-gradient(120% 90% at 50% 40%,#1b1419 0%,#0D0B0F 62%);',
      'transition:opacity 1.2s cubic-bezier(.22,1,.36,1),visibility 1.2s ease}',
    '#bblEntrada.fuera{opacity:0;visibility:hidden;pointer-events:none}',
    '#bblEntrada canvas{position:absolute;inset:0;width:100%;height:100%;display:block;z-index:1}',
    '#bblEntrada .be-grano{position:absolute;inset:0;pointer-events:none;z-index:2;opacity:.02;',
      'background-image:url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")}',

    /* arriba: la firma de la marca y «saltar» */
    '#bblEntrada .be-arriba{position:relative;z-index:10;width:100%;max-width:1380px;padding:24px 28px;',
      'display:flex;align-items:center;justify-content:space-between;opacity:0;transition:opacity 1.2s ease .4s}',
    '#bblEntrada.lista .be-arriba{opacity:1}',
    '#bblEntrada .be-firma{display:inline-flex;align-items:center;gap:10px;font-family:"Cormorant Garamond",serif;',
      'font-size:19px;letter-spacing:.02em;color:#F9F5EE}',
    '#bblEntrada .be-firma svg{width:34px;height:17px}',
    '#bblEntrada .be-saltar{background:transparent;border:0;color:#8C7482;font-family:inherit;font-size:11px;',
      'letter-spacing:.28em;text-transform:uppercase;padding:10px 14px;cursor:pointer;transition:color .35s}',
    '#bblEntrada .be-saltar:hover{color:#F3E0BC}',

    /* centro: el logo protagonista, la palabra, el lema y entrar */
    '#bblEntrada .be-centro{position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;',
      'text-align:center;padding:0 24px;transition:transform 1.1s cubic-bezier(.22,1,.36,1),opacity .9s ease}',
    '#bblEntrada.abre .be-centro{transform:scale(1.06);opacity:0}',
    '#bblEntrada .be-logo{position:relative;width:min(300px,62vw);aspect-ratio:2/1;cursor:pointer;',
      'touch-action:none;-webkit-tap-highlight-color:transparent;transition:transform .9s cubic-bezier(.22,1,.36,1)}',
    '#bblEntrada .be-logo svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}',
    '#bblEntrada .be-trazo{fill:none;stroke:url(#beOro);stroke-width:2.2;stroke-linecap:round;',
      'filter:drop-shadow(0 0 var(--brillo,8px) rgba(243,224,188,.38))}',
    '#bblEntrada .be-eco{fill:none;stroke:#C8A96A;stroke-width:.6;opacity:0;transform-origin:60px 30px}',
    '#bblEntrada.lista .be-eco{animation:beEco 6s ease-in-out infinite}',
    '#bblEntrada.lista .be-eco.e2{animation-delay:3s}',
    '@keyframes beEco{0%{opacity:0;transform:scale(1)}25%{opacity:.28}100%{opacity:0;transform:scale(1.22)}}',
    '#bblEntrada .be-carga{fill:none;stroke:#F3E0BC;stroke-width:3;stroke-linecap:round;opacity:.95;',
      'filter:drop-shadow(0 0 6px rgba(243,224,188,.8))}',
    '#bblEntrada .be-wm{font-family:"Cormorant Garamond",Georgia,serif;font-weight:300;color:#F9F5EE;',
      'font-size:clamp(46px,8vw,92px);letter-spacing:.06em;line-height:1;margin-top:26px;opacity:0;transform:translateY(14px);',
      'transition:opacity 1.2s ease,transform 1.2s ease,letter-spacing 2.4s ease}',
    '#bblEntrada .be-lema{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;color:#C8A96A;',
      'font-size:clamp(20px,2.6vw,29px);margin-top:12px;opacity:0;transition:opacity 1.2s ease .3s}',
    '#bblEntrada .be-btn{margin-top:42px;position:relative;overflow:hidden;border:1px solid rgba(200,169,106,.7);',
      'background:transparent;color:#F3E0BC;padding:15px 46px;border-radius:999px;font-family:inherit;font-size:13px;',
      'font-weight:500;letter-spacing:.36em;text-transform:uppercase;cursor:pointer;opacity:0;',
      'transition:opacity 1s ease .7s,background .35s,color .35s,border-color .35s}',
    '#bblEntrada .be-btn::before{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;',
      'background:linear-gradient(90deg,transparent,rgba(243,224,188,.18),transparent);transition:left .8s cubic-bezier(.22,1,.36,1)}',
    '#bblEntrada .be-btn:hover{background:#C8A96A;color:#0D0B0F;border-color:#C8A96A}',
    '#bblEntrada .be-btn:hover::before{left:100%}',
    '#bblEntrada.lista .be-wm{opacity:1;transform:none;letter-spacing:.02em}',
    '#bblEntrada.lista .be-lema,#bblEntrada.lista .be-btn{opacity:1}',

    /* abajo: las ciudades y la pista */
    '#bblEntrada .be-abajo{position:relative;z-index:10;width:100%;max-width:1380px;padding:20px 28px 26px;',
      'display:flex;flex-direction:column;align-items:center;gap:10px;pointer-events:none;opacity:0;transition:opacity 1.2s ease 1s}',
    '#bblEntrada.lista .be-abajo{opacity:1}',
    '#bblEntrada .be-ciudad{font-size:10.5px;letter-spacing:.3em;text-transform:uppercase;color:#C8A96A;min-height:16px;',
      'transition:opacity .6s ease,transform .6s ease}',
    '#bblEntrada .be-ciudad.cambia{opacity:0;transform:translateY(4px)}',
    '#bblEntrada .be-pista{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6B5766;text-align:center}',

    'html.be-abierta,html.be-abierta body{overflow:hidden}',
    'html.be-abierta #bbl-baby-btn{opacity:0;pointer-events:none}',
    '@media (max-width:640px){#bblEntrada .be-arriba{padding:18px 20px}#bblEntrada .be-btn{padding:14px 38px}}',
    '@media (prefers-reduced-motion: reduce){#bblEntrada,#bblEntrada *{transition:none!important;animation:none!important}}'
  ].join('');
  document.head.appendChild(css);

  /* ── el hueso ── */
  var grad = '<defs><linearGradient id="beOro" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#8E723F"/><stop offset=".42" stop-color="#F3E0BC"/>' +
    '<stop offset=".72" stop-color="#C9A96E"/><stop offset="1" stop-color="#9C8050"/></linearGradient></defs>';
  var el = document.createElement('section');
  el.id = 'bblEntrada';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'Babyloon');
  el.innerHTML =
    '<canvas aria-hidden="true"></canvas><div class="be-grano" aria-hidden="true"></div>' +
    '<div class="be-arriba">' +
      '<div class="be-firma"><svg viewBox="0 0 120 60" aria-hidden="true"><path d="' + LOGO + '" fill="none" stroke="url(#beOro)" stroke-width="5" stroke-linecap="round"/></svg>Babyloon</div>' +
      '<button type="button" class="be-saltar" data-be-saltar>' + tx[1] + '</button></div>' +
    '<div class="be-centro">' +
      '<div class="be-logo" id="beLogo" aria-hidden="true"><svg viewBox="0 0 120 60">' + grad +
        '<path class="be-eco" d="' + LOGO + '"/><path class="be-eco e2" d="' + LOGO + '"/>' +
        '<path class="be-trazo" id="beTrazo" d="' + LOGO + '"/>' +
        '<path class="be-carga" id="beCarga" d="' + LOGO + '"/>' +
        '<circle id="beLuz" r="1.9" fill="#FFF8EA" style="filter:drop-shadow(0 0 4px #F3E0BC)" opacity="0"/>' +
      '</svg></div>' +
      '<div class="be-wm">Babyloon</div>' +
      '<div class="be-lema" id="beLema">La belleza, donde tú estés.</div>' +
      '<button type="button" class="be-btn" data-be-entrar>' + tx[0] + '</button>' +
    '</div>' +
    '<div class="be-abajo"><div class="be-ciudad" id="beCiudad">' + CIUDADES[0][0].toUpperCase() + ' · ' + CIUDADES[0][1] + '</div>' +
      '<span class="be-pista">' + (tactil ? tx[3] : tx[2]) + '</span></div>';
  document.body.insertBefore(el, document.body.firstChild);
  document.documentElement.classList.add('be-abierta');

  /* ── el lema en el idioma de la web ── */
  function lema() {
    try {
      if (!window.BBL || !BBL.t) return;
      var a = BBL.t('hero_h1a'), b = BBL.t('hero_h1b');
      if (a && b && a !== 'hero_h1a') document.getElementById('beLema').textContent = a + ' ' + b;
    } catch (_) {}
  }
  document.addEventListener('DOMContentLoaded', lema);
  document.addEventListener('bbl:lang', lema);

  /* ── el logo: trazo, luz que lo recorre y oro que lo llena ── */
  var trazo = document.getElementById('beTrazo'), carga = document.getElementById('beCarga');
  var luz = document.getElementById('beLuz'), logo = document.getElementById('beLogo');
  var L = 330;
  try { L = trazo.getTotalLength() || L; } catch (_) {}
  trazo.style.strokeDasharray = L; carga.style.strokeDasharray = L;
  carga.style.strokeDashoffset = L;
  var t0 = performance.now(), DIBUJO = 2600;
  if (quieto) trazo.style.strokeDashoffset = 0; else trazo.style.strokeDashoffset = L;

  /* ── estado ── */
  var activo = true, abriendo = false, pulsacion = 0, pulsando = false;
  setTimeout(function () { el.classList.add('lista'); }, quieto ? 0 : 1900);

  /* ── el rótulo de ciudades ── */
  var iCiudad = 0, rotulo = document.getElementById('beCiudad');
  var reloj = quieto ? null : setInterval(function () {
    if (!activo) return;
    rotulo.classList.add('cambia');
    setTimeout(function () {
      iCiudad = (iCiudad + 1) % CIUDADES.length;
      rotulo.textContent = CIUDADES[iCiudad][0].toUpperCase() + ' · ' + CIUDADES[iCiudad][1];
      rotulo.classList.remove('cambia');
    }, 550);
  }, 3400);

  /* ── el fondo: niebla muy suave, polvo de oro y un horizonte fino ── */
  var cv = el.querySelector('canvas'), ctx = cv.getContext('2d');
  var w = 0, h = 0, dpr = 1, px = .5, py = .45, objX = .5, objY = .45;
  var niebla = document.createElement('canvas');
  niebla.width = niebla.height = 256;
  var nc = niebla.getContext('2d'), ng = nc.createRadialGradient(128, 128, 12, 128, 128, 128);
  ng.addColorStop(0, 'rgba(36,24,32,.30)'); ng.addColorStop(.5, 'rgba(36,24,32,.12)');
  ng.addColorStop(.8, 'rgba(200,169,106,.025)'); ng.addColorStop(1, 'rgba(13,11,15,0)');
  nc.fillStyle = ng; nc.fillRect(0, 0, 256, 256);
  var nubes = [], polvo = [], i;
  for (i = 0; i < 8; i++) nubes.push({ x: Math.random(), y: .2 + Math.random() * .7, s: 1.4 + Math.random() * 1.8,
    vx: (Math.random() - .5) * .012, f: i * 1.3 });
  for (i = 0; i < 48; i++) polvo.push({ x: Math.random(), y: Math.random(), r: .5 + Math.random() * 1.2,
    vy: -.008 - Math.random() * .016, a: .12 + Math.random() * .4, t: Math.random() * 6.283 });

  function medir() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  addEventListener('resize', function () { medir(); if (quieto) fondo(0, 0); }, { passive: true });

  function fondo(tiempo, dt) {
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    nubes.forEach(function (n) {
      n.x += n.vx * dt; if (n.x < -.2) n.x = 1.2; if (n.x > 1.2) n.x = -.2;
      var x = (n.x + (px - .5) * .04) * w, y = (n.y + Math.sin(tiempo * .3 + n.f) * .025) * h;
      var s = Math.max(w, h) * .4 * n.s;
      ctx.drawImage(niebla, x - s / 2, y - s / 2, s, s);
    });
    ctx.restore();
    polvo.forEach(function (p) {
      p.y += p.vy * dt; if (p.y < 0) { p.y = 1; p.x = Math.random(); }
      var a = p.a * (.55 + .45 * Math.sin(tiempo * 1.8 + p.t));
      ctx.fillStyle = 'rgba(243,224,188,' + (a * .6) + ')';
      ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, 6.283); ctx.fill();
    });
    var hr = Math.max(w * .95, 720), hy = h * .9 + hr;
    ctx.beginPath(); ctx.arc(w * .5, hy, hr, Math.PI * 1.34, Math.PI * 1.66);
    ctx.strokeStyle = 'rgba(200,169,106,.16)'; ctx.lineWidth = .8; ctx.stroke();
    var pa = Math.PI * 1.36 + ((tiempo * .05) % .28);
    var pX = w * .5 + Math.cos(pa) * hr, pY = hy + Math.sin(pa) * hr;
    var pg = ctx.createRadialGradient(pX, pY, 0, pX, pY, 14);
    pg.addColorStop(0, 'rgba(243,224,188,.6)'); pg.addColorStop(1, 'rgba(243,224,188,0)');
    ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(pX, pY, 14, 0, 6.283); ctx.fill();
  }

  /* ── tocar, mantener, deslizar ── */
  addEventListener('pointermove', function (e) {
    if (!activo) return;
    objX = e.clientX / Math.max(1, w); objY = e.clientY / Math.max(1, h);
  }, { passive: true });
  logo.addEventListener('pointerdown', function (e) {
    pulsando = true;
    try { logo.setPointerCapture(e.pointerId); } catch (_) {}
  });
  addEventListener('pointerup', function () { pulsando = false; });
  addEventListener('pointercancel', function () { pulsando = false; });
  var y0 = 0;
  el.addEventListener('touchstart', function (e) { if (e.touches.length) y0 = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchmove', function (e) {
    if (activo && !abriendo && !pulsando && e.touches.length && (y0 - e.touches[0].clientY) > 55) entrar(false);
  }, { passive: true });
  el.addEventListener('wheel', function (e) { if (activo && !abriendo && e.deltaY > 28) entrar(false); }, { passive: true });

  /* ── entrar ── */
  function cerrar() {
    activo = false;
    el.classList.add('fuera');
    document.documentElement.classList.remove('be-abierta');
    try { sessionStorage.setItem('bbl_entrada', '1'); } catch (_) {}
    if (reloj) clearInterval(reloj);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1400);
  }
  function entrar(ya) {
    if (!activo || abriendo) return;
    if (ya || quieto) { cerrar(); return; }
    abriendo = true;
    el.classList.add('abre');
    setTimeout(cerrar, 900);
  }
  el.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-be-entrar],[data-be-saltar]');
    if (t) entrar(t.hasAttribute('data-be-saltar'));
  });
  addEventListener('keydown', function (e) {
    if (activo && (e.key === 'Enter' || e.key === 'Escape')) entrar(e.key === 'Escape');
  });

  /* ── un fotograma ── */
  function cuadro(ahora, dt) {
    var tiempo = ahora * .001;
    px += (objX - px) * .06; py += (objY - py) * .06;
    fondo(tiempo, dt);

    // 1 · el logo se dibuja
    var d = Math.min(1, (ahora - t0) / DIBUJO);
    var e = d < .5 ? 4 * d * d * d : 1 - Math.pow(-2 * d + 2, 3) / 2;
    trazo.style.strokeDashoffset = L * (1 - e);

    // 2 · el dorado responde al cursor (un leve giro de luz, sin deformar)
    var dx = px - .5, dy = py - .45;
    logo.style.transform = 'translate(' + (dx * 10).toFixed(2) + 'px,' + (dy * 8).toFixed(2) + 'px)';
    var cerca = Math.max(0, 1 - Math.hypot(dx, dy) * 2.2);
    trazo.style.setProperty('--brillo', (8 + cerca * 10 + pulsacion * 14).toFixed(1) + 'px');

    // 3 · una luz recorre el logo sin parar
    if (d >= 1) {
      var pos = ((tiempo * .14) % 1) * L, p = trazo.getPointAtLength(pos);
      luz.setAttribute('cx', p.x); luz.setAttribute('cy', p.y);
      luz.setAttribute('opacity', (.55 + .45 * Math.sin(tiempo * 2.4)).toFixed(2));
    }

    // 4 · mantener pulsado: el oro llena el trazo hasta entrar
    if (pulsando && !abriendo && d >= 1) {
      pulsacion = Math.min(1, pulsacion + dt * .9);
      if (pulsacion >= 1) entrar(false);
    } else if (!abriendo) pulsacion = Math.max(0, pulsacion - dt * 1.6);
    carga.style.strokeDashoffset = L * (1 - pulsacion);
  }

  medir();
  if (quieto) {
    fondo(0, 0);
    try { var p0 = trazo.getPointAtLength(0); luz.setAttribute('cx', p0.x); luz.setAttribute('cy', p0.y); } catch (_) {}
    return;
  }
  var antes = 0;
  function bucle(ahora) {
    if (!activo) return;
    var dt = Math.min(.05, (ahora - antes) / 1000 || .016);
    antes = ahora;
    if (!document.hidden) cuadro(ahora, dt);
    requestAnimationFrame(bucle);
  }
  requestAnimationFrame(bucle);
})();
