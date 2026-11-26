/* ═══════════════════════════════════════════════════════════════
   Babyloon · La entrada — «portal sensorial»
   ───────────────────────────────────────────────────────────────
   Andrés (26-nov), sobre la propuesta «portal sensorial»: niebla
   nocturna, polvo de oro, un horizonte orbital y la doble O hecha de
   filamentos de seda que ondulan y reaccionan al cursor o al dedo.
   Se entra con «Entrar», manteniendo pulsada la doble O, deslizando
   hacia arriba o con la rueda del ratón.

   DECISIONES (sobre la propuesta original)
   · La doble O es la de la marca: dos óvalos que se tocan en el
     centro, como el logo, no dos círculos solapados.
   · Las ciudades del rótulo inferior son las del plan de apertura.
   · Tipografías y dorado de la web (Cormorant Garamond y Jost).
   · Una vez por visita (sessionStorage). Quien llega con un ancla
     (#acceso, #app…) o desde otra página de la web no la ve.
   · Se carga justo después de <body>: no se ve la página antes.
   · La web sigue debajo, entera: Google la lee igual.
   · «Saltar», Intro y Escape cierran. Quien prefiere que nada se
     mueva ve el portal quieto.
   · El aviso de cookies queda por encima, a propósito.
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
  //        entrar, saltar, estado, pista (ratón), pista (táctil)
  var TXT = {
    es: ['Entrar', 'Saltar', 'Concierge global · 24/7', 'Mueve el cursor o mantén pulsada la doble O para entrar', 'Mantén pulsada la doble O o desliza hacia arriba'],
    en: ['Enter', 'Skip', 'Global concierge · 24/7', 'Move the cursor or press and hold the double O to enter', 'Press and hold the double O or swipe up'],
    pt: ['Entrar', 'Saltar', 'Concierge global · 24/7', 'Move o cursor ou mantém premido o duplo O para entrar', 'Mantém premido o duplo O ou desliza para cima'],
    fr: ['Entrer', 'Passer', 'Concierge mondial · 24/7', 'Bougez le curseur ou maintenez le double O pour entrer', 'Maintenez le double O ou glissez vers le haut'],
    de: ['Eintreten', 'Überspringen', 'Globaler Concierge · 24/7', 'Bewegen Sie den Cursor oder halten Sie das Doppel-O gedrückt', 'Doppel-O gedrückt halten oder nach oben wischen'],
    it: ['Entra', 'Salta', 'Concierge globale · 24/7', 'Muovi il cursore o tieni premuta la doppia O per entrare', 'Tieni premuta la doppia O o scorri verso l’alto'],
    nl: ['Binnengaan', 'Overslaan', 'Wereldwijde concierge · 24/7', 'Beweeg de cursor of houd de dubbele O ingedrukt', 'Houd de dubbele O ingedrukt of veeg omhoog'],
    sv: ['Gå in', 'Hoppa över', 'Global concierge · 24/7', 'Rör markören eller håll in dubbel-O för att gå in', 'Håll in dubbel-O eller svep uppåt'],
    pl: ['Wejdź', 'Pomiń', 'Globalny concierge · 24/7', 'Porusz kursorem lub przytrzymaj podwójne O, aby wejść', 'Przytrzymaj podwójne O lub przesuń w górę'],
    el: ['Είσοδος', 'Παράλειψη', 'Παγκόσμιος concierge · 24/7', 'Κινήστε τον κέρσορα ή κρατήστε πατημένο το διπλό O', 'Κρατήστε πατημένο το διπλό O ή σύρετε προς τα πάνω'],
    hu: ['Belépés', 'Kihagyás', 'Globális concierge · 24/7', 'Mozgasd a kurzort, vagy tartsd lenyomva a dupla O-t', 'Tartsd lenyomva a dupla O-t, vagy húzd felfelé'],
    ru: ['Войти', 'Пропустить', 'Глобальный консьерж · 24/7', 'Двигайте курсор или удерживайте двойное O, чтобы войти', 'Удерживайте двойное O или проведите вверх'],
    ar: ['دخول', 'تخطي', 'كونسيرج عالمي · 24/7', 'حرّك المؤشر أو اضغط مطولاً على الحرفين O للدخول', 'اضغط مطولاً على الحرفين O أو اسحب للأعلى'],
    zh: ['进入', '跳过', '全球礼宾 · 24/7', '移动光标或长按双 O 进入', '长按双 O 或向上滑动'],
    ja: ['入る', 'スキップ', 'グローバル・コンシェルジュ · 24/7', 'カーソルを動かすか、ダブルOを長押しして入る', 'ダブルOを長押しするか、上にスワイプ'],
    ko: ['입장', '건너뛰기', '글로벌 컨시어지 · 24/7', '커서를 움직이거나 더블 O를 길게 눌러 입장', '더블 O를 길게 누르거나 위로 밀기']
  };
  var tx = TXT[lang] || TXT.en;

  // ciudades del plan de apertura, con sus coordenadas
  var CIUDADES = [
    ['Marbella', "36°30'N 04°53'W"], ['Madrid', "40°25'N 03°42'W"],
    ['Palma', "39°34'N 02°39'E"], ['Lisboa', "38°43'N 09°08'W"],
    ['Barcelona', "41°23'N 02°10'E"], ['Málaga', "36°43'N 04°25'W"],
    ['Miami', "25°45'N 80°11'W"], ['Ibiza', "38°54'N 01°26'E"]
  ];

  /* ── el vestido ── */
  var css = document.createElement('style');
  css.textContent = [
    '#bblEntrada{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;justify-content:space-between;',
      'align-items:center;overflow:hidden;font-family:Jost,system-ui,sans-serif;',
      'background:radial-gradient(circle at 50% 42%,#160B14 0%,#08070B 72%);',
      'transition:opacity 1.15s cubic-bezier(.22,1,.36,1),visibility 1.15s ease}',
    '#bblEntrada.fuera{opacity:0;visibility:hidden;pointer-events:none}',
    '#bblEntrada canvas{position:absolute;inset:0;width:100%;height:100%;display:block;z-index:1;touch-action:none}',
    '#bblEntrada .be-grano{position:absolute;inset:0;pointer-events:none;z-index:2;opacity:.026;',
      'background-image:url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")}',
    '#bblEntrada .be-arriba{position:relative;z-index:10;width:100%;max-width:1380px;padding:24px 28px;',
      'display:flex;align-items:center;justify-content:space-between}',
    '#bblEntrada .be-estado{display:inline-flex;align-items:center;gap:9px;font-size:10px;letter-spacing:.26em;',
      'text-transform:uppercase;color:rgba(246,243,238,.42)}',
    '#bblEntrada .be-punto{width:6px;height:6px;border-radius:50%;background:#DFC28D;box-shadow:0 0 10px #DFC28D;',
      'animation:bePunto 2.8s infinite ease-in-out}',
    '@keyframes bePunto{0%,100%{opacity:.45}50%{opacity:1}}',
    '#bblEntrada .be-saltar{background:transparent;border:0;color:rgba(246,243,238,.64);font-family:inherit;',
      'font-size:10.5px;letter-spacing:.28em;text-transform:uppercase;padding:10px 14px;cursor:pointer;',
      'transition:color .35s,transform .35s}',
    '#bblEntrada .be-saltar:hover{color:#DFC28D;transform:translateX(2px)}',
    '#bblEntrada .be-centro{position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;',
      'text-align:center;padding:0 24px;margin-top:175px;pointer-events:none;',
      'transition:transform 1s cubic-bezier(.22,1,.36,1),opacity .85s ease}',
    '#bblEntrada.abre .be-centro{transform:translateY(18px) scale(.96);opacity:0}',
    '#bblEntrada .be-wm{font-family:"Cormorant Garamond",Georgia,serif;font-size:clamp(3.1rem,7vw,4.9rem);font-weight:300;',
      'letter-spacing:.03em;color:#F6F3EE;line-height:1;margin:0 0 12px;text-shadow:0 10px 35px rgba(0,0,0,.85)}',
    '#bblEntrada .be-lema{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:clamp(1.18rem,2.4vw,1.55rem);',
      'font-weight:300;color:#DFC28D;letter-spacing:.02em;margin:0 0 30px}',
    '#bblEntrada .be-btn{pointer-events:auto;position:relative;background:rgba(8,7,11,.52);',
      '-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border:1px solid rgba(223,194,141,.55);',
      'color:#F6F3EE;font-family:inherit;font-size:11px;font-weight:400;letter-spacing:.32em;text-transform:uppercase;',
      'padding:15px 44px;border-radius:9999px;cursor:pointer;overflow:hidden;transition:all .45s cubic-bezier(.22,1,.36,1);',
      'box-shadow:0 12px 35px rgba(0,0,0,.75),inset 0 0 20px rgba(223,194,141,.06)}',
    '#bblEntrada .be-btn::before{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;',
      'background:linear-gradient(90deg,transparent,rgba(223,194,141,.22),transparent);transition:left .75s cubic-bezier(.22,1,.36,1)}',
    '#bblEntrada .be-btn:hover{border-color:#DFC28D;color:#DFC28D;box-shadow:0 0 32px rgba(223,194,141,.25);transform:translateY(-1px)}',
    '#bblEntrada .be-btn:hover::before{left:100%}',
    '#bblEntrada .be-btn:active{transform:scale(.97)}',
    '#bblEntrada .be-abajo{position:relative;z-index:10;width:100%;max-width:1380px;padding:20px 28px 26px;',
      'display:flex;flex-direction:column;align-items:center;gap:10px;pointer-events:none}',
    '#bblEntrada .be-ciudad{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#DFC28D;min-height:16px;',
      'transition:opacity .6s ease,transform .6s ease;text-align:center}',
    '#bblEntrada .be-ciudad.cambia{opacity:0;transform:translateY(4px)}',
    '#bblEntrada .be-pista{font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(246,243,238,.42);text-align:center}',
    'html.be-abierta,html.be-abierta body{overflow:hidden}',
    'html.be-abierta #bbl-baby-btn{opacity:0;pointer-events:none}',
    '@media (max-width:640px){#bblEntrada .be-arriba{padding:18px 20px}#bblEntrada .be-centro{margin-top:140px}',
      '#bblEntrada .be-btn{padding:14px 36px}}',
    '@media (prefers-reduced-motion: reduce){#bblEntrada,#bblEntrada .be-centro,#bblEntrada .be-btn{transition:none}',
      '#bblEntrada .be-punto{animation:none}}'
  ].join('');
  document.head.appendChild(css);

  /* ── el hueso ── */
  var el = document.createElement('section');
  el.id = 'bblEntrada';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'Babyloon');
  el.innerHTML =
    '<canvas aria-hidden="true"></canvas><div class="be-grano" aria-hidden="true"></div>' +
    '<div class="be-arriba"><div class="be-estado"><span class="be-punto"></span><span>' + tx[2] + '</span></div>' +
      '<button type="button" class="be-saltar" data-be-saltar>' + tx[1] + '</button></div>' +
    '<div class="be-centro"><div class="be-wm">Babyloon</div>' +
      '<p class="be-lema" id="beLema">La belleza, donde tú estés.</p>' +
      '<button type="button" class="be-btn" data-be-entrar>' + tx[0] + '</button></div>' +
    '<div class="be-abajo"><div class="be-ciudad" id="beCiudad">' + CIUDADES[0][0] + ' · ' + CIUDADES[0][1] + '</div>' +
      '<span class="be-pista">' + (tactil ? tx[4] : tx[3]) + '</span></div>';
  document.body.insertBefore(el, document.body.firstChild);
  document.documentElement.classList.add('be-abierta');

  /* ── el lema en el idioma de la web, cuando el diccionario esté ── */
  function lema() {
    try {
      if (!window.BBL || !BBL.t) return;
      var a = BBL.t('hero_h1a'), b = BBL.t('hero_h1b');
      if (a && b && a !== 'hero_h1a') document.getElementById('beLema').textContent = a + ' ' + b;
    } catch (_) {}
  }
  document.addEventListener('DOMContentLoaded', lema);
  document.addEventListener('bbl:lang', lema);

  /* ── estado ── */
  var activo = true, abriendo = false, progresoAbre = 0, pulsacion = 0, pulsando = false;

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

  /* ── el lienzo ── */
  var cv = el.querySelector('canvas'), ctx = cv.getContext('2d');
  var w = 0, h = 0, dpr = 1;
  var px = .5, py = .42, objX = .5, objY = .42, hayPuntero = false;

  // niebla: un sprite pintado una vez, reutilizado (60 fps)
  var niebla = document.createElement('canvas');
  niebla.width = niebla.height = 256;
  var nc = niebla.getContext('2d'), ng = nc.createRadialGradient(128, 128, 12, 128, 128, 128);
  ng.addColorStop(0, 'rgba(42,20,38,.34)'); ng.addColorStop(.45, 'rgba(22,11,20,.18)');
  ng.addColorStop(.78, 'rgba(158,126,67,.05)'); ng.addColorStop(1, 'rgba(8,7,11,0)');
  nc.fillStyle = ng; nc.fillRect(0, 0, 256, 256);

  var nubes = [], polvo = [], i;
  for (i = 0; i < 14; i++) nubes.push({ x: Math.random(), y: .25 + Math.random() * .65, s: 1.4 + Math.random() * 2.1,
    vx: (Math.random() - .5) * .018, vy: -.004 - Math.random() * .008, f: i * .9 });
  for (i = 0; i < 75; i++) polvo.push({ x: Math.random(), y: Math.random(), r: .6 + Math.random() * 1.5,
    vy: -.012 - Math.random() * .022, vx: (Math.random() - .5) * .01, a: .18 + Math.random() * .55, t: Math.random() * 6.283 });

  function medir() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (quieto) pintar(0, 0);
  }
  addEventListener('resize', medir, { passive: true });

  function centroO() { return { x: w * .5, y: w < 640 ? h * .34 : h * .355 }; }

  /* ── tocar, mantener, deslizar ── */
  function apuntar(x, y) { objX = x / Math.max(1, w); objY = y / Math.max(1, h); hayPuntero = true; }
  cv.addEventListener('pointermove', function (e) { apuntar(e.clientX, e.clientY); });
  cv.addEventListener('pointerdown', function (e) {
    apuntar(e.clientX, e.clientY);
    var c = centroO();
    if (Math.hypot(e.clientX - c.x, e.clientY - c.y) < 165) pulsando = true;
  });
  addEventListener('pointerup', function () { pulsando = false; });
  addEventListener('pointercancel', function () { pulsando = false; });
  var y0 = 0;
  el.addEventListener('touchstart', function (e) { if (e.touches.length) y0 = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchmove', function (e) {
    if (activo && !abriendo && e.touches.length && (y0 - e.touches[0].clientY) > 55) entrar(false);
  }, { passive: true });
  el.addEventListener('wheel', function (e) { if (activo && !abriendo && e.deltaY > 28) entrar(false); }, { passive: true });

  /* ── entrar ── */
  function cerrar() {
    activo = false;
    el.classList.add('fuera');
    document.documentElement.classList.remove('be-abierta');
    try { sessionStorage.setItem('bbl_entrada', '1'); } catch (_) {}
    if (reloj) clearInterval(reloj);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1300);
  }
  function entrar(ya) {
    if (!activo || abriendo) return;
    if (ya || quieto) { cerrar(); return; }
    abriendo = true;
    el.classList.add('abre');
    setTimeout(cerrar, 980);
  }
  el.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-be-entrar],[data-be-saltar]');
    if (t) entrar(t.hasAttribute('data-be-saltar'));
  });
  addEventListener('keydown', function (e) {
    if (activo && (e.key === 'Enter' || e.key === 'Escape')) entrar(e.key === 'Escape');
  });

  /* ── pintar un fotograma ── */
  function pintar(tiempo, dt) {
    px += (objX - px) * .08; py += (objY - py) * .08;
    if (pulsando && !abriendo) { pulsacion = Math.min(1, pulsacion + dt * 1.45); if (pulsacion >= 1) entrar(false); }
    else if (!abriendo) pulsacion = Math.max(0, pulsacion - dt * 1.8);
    if (abriendo) progresoAbre = Math.min(1, progresoAbre + dt * 1.15);
    var desv = 1 - progresoAbre;

    ctx.clearRect(0, 0, w, h);

    // 1 · niebla nocturna
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = Math.max(0, 1 - progresoAbre * .9);
    nubes.forEach(function (n) {
      n.x += n.vx * dt; n.y += n.vy * dt;
      if (n.x < -.2) n.x = 1.2; if (n.x > 1.2) n.x = -.2; if (n.y < .05) n.y = .95;
      var x = (n.x + (px - .5) * .06) * w, y = (n.y + Math.sin(tiempo * .4 + n.f) * .03) * h;
      var s = Math.max(w, h) * .42 * n.s;
      ctx.drawImage(niebla, x - s / 2, y - s / 2, s, s);
    });
    ctx.restore();

    // 2 · polvo de oro
    polvo.forEach(function (p) {
      p.y += p.vy * dt; p.x += p.vx * dt;
      if (p.y < 0) { p.y = 1; p.x = Math.random(); }
      var a = p.a * (.55 + .45 * Math.sin(tiempo * 2.2 + p.t)) * desv;
      ctx.fillStyle = 'rgba(223,194,141,' + a + ')';
      ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, 6.283); ctx.fill();
    });

    // 3 · horizonte orbital con un pulso que lo recorre
    var hr = Math.max(w * .95, 720), hy = h * .88 + hr;
    ctx.beginPath(); ctx.arc(w * .5, hy, hr, Math.PI * 1.32, Math.PI * 1.68);
    ctx.strokeStyle = 'rgba(223,194,141,' + (.24 * desv) + ')'; ctx.lineWidth = .85; ctx.stroke();
    var pa = Math.PI * 1.35 + ((tiempo * .06) % .3);
    var pX = w * .5 + Math.cos(pa) * hr, pY = hy + Math.sin(pa) * hr;
    var pg = ctx.createRadialGradient(pX, pY, 0, pX, pY, 18);
    pg.addColorStop(0, 'rgba(223,194,141,' + (.85 * desv) + ')'); pg.addColorStop(1, 'rgba(223,194,141,0)');
    ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(pX, pY, 18, 0, 6.283); ctx.fill();

    // 4 · la doble O de Babyloon, en filamentos de seda
    var c = centroO();
    var esc = 1 + Math.pow(progresoAbre, 2.2) * 8.5 + pulsacion * .22;
    var R = (w < 640 ? 46 : 62) * esc;      // radio horizontal de cada óvalo
    var RY = R * .846;                       // proporción del logo (22/26)
    var alfaO = Math.max(0, 1 - Math.pow(progresoAbre, 1.6));

    var nucleo = ctx.createRadialGradient(c.x, c.y, 2, c.x, c.y, R * 1.65);
    nucleo.addColorStop(0, 'rgba(223,194,141,' + ((.18 + pulsacion * .25) * alfaO) + ')');
    nucleo.addColorStop(.55, 'rgba(26,13,22,' + (.22 * alfaO) + ')');
    nucleo.addColorStop(1, 'rgba(8,7,11,0)');
    ctx.fillStyle = nucleo; ctx.beginPath(); ctx.arc(c.x, c.y, R * 1.65, 0, 6.283); ctx.fill();

    var mx = px * w, my = py * h;
    var amp = w < 640 ? .6 : 1;   // en móvil la O es más pequeña: ondas más suaves
    [{ cx: c.x - R, dir: 1 }, { cx: c.x + R, dir: -1 }].forEach(function (o, k) {
      for (var s = 0; s < 6; s++) {
        var principal = s === 0;
        var alfa = (principal ? .92 : (.14 + (1 - s / 6) * .22)) * alfaO;
        ctx.beginPath();
        for (var j = 0; j <= 120; j++) {
          var th = (j / 120) * Math.PI * 2, co = Math.cos(th), si = Math.sin(th);
          var o1 = Math.sin(th * 5 + tiempo * 1.9 * o.dir + s * 1.1) * (1.8 + s * .65) * amp;
          var o2 = Math.cos(th * 3 - tiempo * 1.3 + k) * (1.2 + pulsacion * 4.5) * amp;
          var rx = o.cx + co * R, ry = c.y + si * RY;
          var fuerza = hayPuntero ? Math.max(0, 1 - Math.hypot(rx - mx, ry - my) / 150) * 7.5 : 0;
          var d = (principal ? o1 * .32 : o1 + o2) + fuerza * Math.sin(th * 4 + tiempo * 4);
          var x = o.cx + co * (R + d), y = c.y + si * (RY + d * .846);
          if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(223,194,141,' + alfa + ')';
        ctx.lineWidth = principal ? 1.55 : .75;
        ctx.stroke();
      }
      // una chispa orbitando cada óvalo
      var ang = tiempo * 1.15 * o.dir + k * Math.PI;
      ctx.beginPath(); ctx.arc(o.cx + Math.cos(ang) * R, c.y + Math.sin(ang) * RY, 2.2, 0, 6.283);
      ctx.fillStyle = 'rgba(246,243,238,' + (.9 * alfaO) + ')';
      ctx.shadowColor = '#DFC28D'; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
    });
  }

  medir();
  if (quieto) { pintar(0, 0); return; }
  var antes = 0;
  function bucle(ahora) {
    if (!activo) return;
    var dt = Math.min(.05, (ahora - antes) / 1000 || .016);
    antes = ahora;
    if (!document.hidden) pintar(ahora * .001, dt);
    requestAnimationFrame(bucle);
  }
  requestAnimationFrame(bucle);
})();
