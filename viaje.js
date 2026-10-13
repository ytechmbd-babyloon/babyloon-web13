/* ═══════════════════════════════════════════════════════════════
   Babyloon · Modo Viaje — el bloque que cuenta el negocio
   ───────────────────────────────────────────────────────────────
   Andrés, sobre qué debe ser la web: «hay algo que es la base del
   negocio, los profesionales pueden trabajar mientras viajan, los
   clientes llevan a su estilista en su teléfono a donde vayan».

   Eso no es una función de la app: es la idea. Y hasta hoy la web
   no la contaba en ninguna parte. Contaba «belleza a domicilio»,
   que es lo que dice cualquiera.

   Cómo se cuenta aquí: eligiendo dos ciudades. Dónde estás y a
   dónde vas. Se dibuja el arco entre ellas y aparece lo que hay al
   otro lado — servicios, precio en la moneda de allí, profesionales
   disponibles. La idea no se explica: se toca.

   DECISIONES
   · El mundo está DIBUJADO, no fotografiado. Puntos y meridianos
     sobre fondo oscuro. Ni un banco de imágenes, ni una cara
     inventada. Lo pidió Andrés y además envejece mejor.
   · Los datos son de verdad: `ciudades_publicas()` trae las 43 con
     sus coordenadas, su moneda y su horquilla de precio. Si el
     bloque miente, se nota; si dice la verdad, convence.
   · Se dibuja en canvas y no en SVG porque son 43 puntos que
     laten y un arco que se traza: eso en SVG son cientos de nodos.
   · Quien prefiera que nada se mueva, no ve nada moverse.
   · El texto de verdad está en el HTML, no en el canvas: el canvas
     es el decorado. Google tiene que poder leer esta sección.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var raiz = document.getElementById('modoViaje');
  if (!raiz) return;

  var T = function (k, d) {
    try { var v = window.BBL && BBL.t(k); return (v && v !== k) ? v : (d || ''); }
    catch (_) { return d || ''; }
  };
  var esc = function (s) {
    return (s == null ? '' : String(s)).replace(/[<>&"]/g, function (c) {
      return ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c];
    });
  };
  /* 61.60 · Si un mercado abre: abierto, o con su fecha de apertura —la
     regla con la que el servidor admite una petición—. Profesionales
     y «Abrimos pronto», solo ahí. */
  var abre = function (c) { return !!c && (c.abierta === true || !!c.abre_el); };
  var quieto = window.matchMedia &&
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── el vestido ──────────────────────────────────────────── */
  var css = document.createElement('style');
  css.textContent = [
    '#modoViaje{position:relative;overflow:hidden;padding-block:clamp(78px,9vw,130px)}',
    '#modoViaje .mv-lienzo{position:absolute;inset:0;width:100%;height:100%;',
      'opacity:.85;pointer-events:none}',
    '#modoViaje .mv-velo{position:absolute;inset:0;pointer-events:none;',
      'background:radial-gradient(70% 60% at 50% 45%,transparent,rgba(13,11,15,.82) 78%)}',
    '#modoViaje .mv-dentro{position:relative;z-index:2;max-width:1180px;margin:0 auto;padding:0 28px}',
    '#modoViaje .mv-cab{max-width:30ch}',
    '#modoViaje h2{font-family:var(--serif,serif);font-weight:300;line-height:1.02;',
      'font-size:clamp(38px,5.6vw,72px);margin:16px 0 18px;text-wrap:balance}',
    '#modoViaje .mv-lead{color:var(--mauve,#8C7482);font-size:clamp(15px,1.5vw,17px);max-width:46ch}',

    /* el selector: dos ciudades y una flecha entre ellas */
    '#modoViaje .mv-ruta{display:flex;align-items:stretch;gap:0;margin-top:40px;',
      'border:1px solid var(--line,rgba(200,169,106,.16));border-radius:30px;',
      'background:rgba(13,11,15,.55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);max-width:680px;overflow:hidden}',
    '#modoViaje .mv-lado{flex:1;padding:16px 24px;min-width:0}',
    '#modoViaje .mv-lado label{display:block;font-size:10.5px;letter-spacing:.3em;',
      'text-transform:uppercase;color:var(--gold,#C8A96A);margin-bottom:6px}',
    '#modoViaje .mv-lado select{width:100%;background:none;border:none;color:var(--cream,#F9F5EE);',
      'font-family:var(--sans,sans-serif);font-size:17px;font-weight:300;cursor:pointer;',
      'appearance:none;-webkit-appearance:none;text-overflow:ellipsis}',
    '#modoViaje .mv-lado select:focus{outline:none}',
    '#modoViaje .mv-lado select option{background:#1B1219;color:#F9F5EE}',
    '#modoViaje .mv-flecha{display:flex;align-items:center;padding:0 6px;color:var(--gold,#C8A96A);',
      'font-size:19px;opacity:.75}',

    /* lo que hay al otro lado */
    '#modoViaje .mv-res{display:grid;grid-template-columns:1fr 1fr;gap:1px;margin-top:26px;',
      'max-width:680px;background:var(--line,rgba(200,169,106,.16));',
      'border:1px solid var(--line,rgba(200,169,106,.16));border-radius:24px;overflow:hidden}',
    '#modoViaje .mv-celda{background:rgba(13,11,15,.72);padding:22px 24px}',
    '#modoViaje .mv-celda .mv-donde{font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;',
      'color:var(--mauve-dim,#6B5766)}',
    '#modoViaje .mv-celda .mv-ciudad{font-family:var(--serif,serif);font-size:26px;font-weight:400;',
      'margin:5px 0 10px;color:var(--cream,#F9F5EE)}',
    '#modoViaje .mv-celda .mv-dato{font-size:14px;color:var(--smoke,#E8E0D5);line-height:1.65}',
    '#modoViaje .mv-celda .mv-dato b{color:var(--gold,#C8A96A);font-weight:500}',

    /* las dos caras de la misma moneda */
    '#modoViaje .mv-dos{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:38px;max-width:820px}',
    '#modoViaje .mv-cara{border-left:1px solid var(--line,rgba(200,169,106,.16));padding:4px 0 4px 20px}',
    '#modoViaje .mv-cara h3{font-family:var(--serif,serif);font-size:20px;font-weight:400;margin-bottom:7px}',
    '#modoViaje .mv-cara p{color:var(--mauve,#8C7482);font-size:14px;line-height:1.65}',

    '@media(max-width:760px){',
      '#modoViaje .mv-ruta{flex-direction:column;border-radius:26px}',
      '#modoViaje .mv-flecha{padding:0 24px 4px;transform:rotate(90deg);width:28px}',
      '#modoViaje .mv-res{grid-template-columns:1fr}',
      '#modoViaje .mv-dos{grid-template-columns:1fr;gap:22px}',
    '}'
  ].join('');
  document.head.appendChild(css);

  /* ── el hueso ────────────────────────────────────────────── */
  raiz.innerHTML =
    '<canvas class="mv-lienzo" id="mvLienzo" aria-hidden="true"></canvas>' +
    '<div class="mv-velo" aria-hidden="true"></div>' +
    '<div class="mv-dentro">' +
      '<div class="mv-cab">' +
        '<p class="eyebrow" data-i18n="mv_eyebrow">Modo Viaje</p>' +
        '<h2 id="mvH2"></h2>' +
        '<p class="mv-lead" data-i18n="mv_lead">La belleza no se queda en casa. Tu profesional de confianza viaja contigo, y quien te atiende puede trabajar allá donde vaya.</p>' +
      '</div>' +
      '<div class="mv-ruta">' +
        '<div class="mv-lado">' +
          '<label for="mvDe" data-i18n="mv_de">Dónde estás</label>' +
          '<select id="mvDe"></select>' +
        '</div>' +
        '<div class="mv-flecha" aria-hidden="true">→</div>' +
        '<div class="mv-lado">' +
          '<label for="mvA" data-i18n="mv_a">A dónde vas</label>' +
          '<select id="mvA"></select>' +
        '</div>' +
      '</div>' +
      '<div class="mv-res" id="mvRes" hidden aria-live="polite"></div>' +
      '<div class="mv-dos">' +
        '<div class="mv-cara">' +
          '<h3 data-i18n="mv_cli_t">Si eres cliente</h3>' +
          '<p data-i18n="mv_cli_d">Llevas a tu estilista en el teléfono. En tu destino te enseñamos a quien tiene su misma formación y sus mismas técnicas.</p>' +
        '</div>' +
        '<div class="mv-cara">' +
          '<h3 data-i18n="mv_pro_t">Si eres profesional</h3>' +
          '<p data-i18n="mv_pro_d">Tu agenda viaja contigo. Abres tu disponibilidad un par de tardes en tu destino y tus vacaciones se pagan solas.</p>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* El titular se arma aquí y no en el HTML: dorar «viaja contigo»
     con un <span> fijo se rompe en los otros diez idiomas, donde esa
     frase ni existe ni ocupa el mismo sitio. Se dora la última
     palabra, que en todos es la que cierra la idea. */
  function pintarTitular() {
    var el = document.getElementById('mvH2'); if (!el) return;
    var t = T('mv_h2', 'Tu belleza viaja contigo');
    var p = t.trim().split(' ');
    el.innerHTML = p.length > 1
      ? esc(p.slice(0, -1).join(' ')) + ' <span class="gold-text">' + esc(p[p.length - 1]) + '</span>'
      : '<span class="gold-text">' + esc(t) + '</span>';
  }
  pintarTitular();
  // 61.60 · La web avisa del cambio de idioma con «bbl:lang»; «bbl:idioma»
  // no lo lanza nadie, y el titular y las dos celdas se quedaban en el
  // idioma de entrada. Se escuchan los dos.
  ['bbl:lang', 'bbl:idioma'].forEach(function (ev) {
    document.addEventListener(ev, function () { pintarTitular(); pintarResultado(); });
  });

  /* ── el mundo, dibujado ──────────────────────────────────── */
  var lienzo = document.getElementById('mvLienzo');
  var ctx = lienzo.getContext('2d');
  var CIUDADES = [], DE = null, A = null, t0 = 0;

  // Equirectangular, encogida: el mundo entero deja los polos
  // vacíos y aquí sólo estorban. Se recorta a la banda habitada.
  function proyectar(lat, lng, an, al) {
    return {
      x: ((Number(lng) + 180) / 360) * an,
      y: ((62 - Number(lat)) / 110) * al
    };
  }

  function medir() {
    var r = raiz.getBoundingClientRect();
    var d = Math.min(window.devicePixelRatio || 1, 2);
    lienzo.width = Math.max(1, Math.round(r.width * d));
    lienzo.height = Math.max(1, Math.round(r.height * d));
    ctx.setTransform(d, 0, 0, d, 0, 0);
    return { an: r.width, al: r.height };
  }

  function dibujar(ts) {
    var m = medir(), an = m.an, al = m.al;
    ctx.clearRect(0, 0, an, al);
    if (!t0) t0 = ts || 0;
    var t = quieto ? 0 : ((ts || 0) - t0) / 1000;

    // Meridianos: cuatro arcos muy tenues. Dan sensación de globo
    // sin dibujar un globo, que sería ruido.
    ctx.strokeStyle = 'rgba(200,169,106,.07)';
    ctx.lineWidth = 1;
    for (var i = 1; i <= 4; i++) {
      var y = (al / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(an * .3, y - al * .04, an * .7, y + al * .04, an, y);
      ctx.stroke();
    }

    // Las ciudades
    for (var j = 0; j < CIUDADES.length; j++) {
      var c = CIUDADES[j];
      var p = proyectar(c.lat, c.lng, an, al);
      if (p.y < -20 || p.y > al + 20) continue;
      var vivo = abre(c) && Number(c.profesionales) > 0;
      // Cada punto late a su ritmo, desfasado por su longitud: si
      // laten a la vez parece un cartel de neón, no un mundo.
      var late = quieto ? .55 : .55 + .45 * Math.sin(t * 1.15 + j * .7);
      var r = vivo ? 2.6 : 1.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = vivo
        ? 'rgba(243,224,188,' + (.42 + .38 * late) + ')'
        : 'rgba(200,169,106,' + (.13 + .12 * late) + ')';
      ctx.fill();
      if (vivo) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 5 + late * 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(200,169,106,' + (.16 * (1 - late)) + ')';
        ctx.stroke();
      }
    }

    // El arco entre las dos elegidas, trazándose
    if (DE && A && DE.slug !== A.slug) {
      var a = proyectar(DE.lat, DE.lng, an, al);
      var b = proyectar(A.lat, A.lng, an, al);
      var cx = (a.x + b.x) / 2;
      var cy = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * .26 - 18;
      var avance = quieto ? 1 : Math.min(1, (t - (DE._t || 0)) / 1.1);
      avance = avance < 0 ? 0 : avance;
      var e = 1 - Math.pow(1 - avance, 3);   // frena al llegar

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      // Se dibuja el trozo recorrido, no la curva entera: así el
      // arco «vuela» en vez de aparecer.
      var pasos = 60, k;
      for (k = 1; k <= Math.max(1, Math.round(pasos * e)); k++) {
        var u = k / pasos, iu = 1 - u;
        ctx.lineTo(iu * iu * a.x + 2 * iu * u * cx + u * u * b.x,
                   iu * iu * a.y + 2 * iu * u * cy + u * u * b.y);
      }
      var grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      grad.addColorStop(0, 'rgba(200,169,106,.15)');
      grad.addColorStop(.5, 'rgba(243,224,188,.75)');
      grad.addColorStop(1, 'rgba(200,169,106,.95)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      [[a, .62], [b, e >= .98 ? .95 : 0]].forEach(function (par) {
        if (!par[1]) return;
        ctx.beginPath();
        ctx.arc(par[0].x, par[0].y, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(243,224,188,' + par[1] + ')';
        ctx.fill();
      });
    }

    if (!quieto) requestAnimationFrame(dibujar);
  }

  /* ── los datos ───────────────────────────────────────────── */
  function dinero(v, mon) {
    try { return window.Money ? Money.format(Number(v) || 0, mon || 'EUR')
                              : (Number(v) || 0).toFixed(0) + ' ' + (mon || 'EUR'); }
    catch (_) { return (Number(v) || 0).toFixed(0) + ' ' + (mon || 'EUR'); }
  }

  function celda(c, clave, porDefecto) {
    var libres = abre(c) ? (Number(c.profesionales) || 0) : 0;
    var linea = libres > 0
      ? T('mv_hay', '<b>{n}</b> profesionales').replace('{n}', libres)
      : abre(c) ? T('mv_pronto', 'Abrimos pronto')
      : esc(T('mv_no_abre', 'Todavía no hemos abierto aquí: vamos a abrir muchas más ciudades'));
    return '<div class="mv-celda">' +
      '<div class="mv-donde">' + esc(T(clave, porDefecto)) + '</div>' +
      '<div class="mv-ciudad">' + esc(c.ciudad) + '</div>' +
      '<div class="mv-dato">' + linea + '<br>' +
        esc(T('mv_desde', 'Servicios desde')) + ' <b>' +
        esc(dinero(c.desde_local, c.moneda)) + '</b>' +
      '</div></div>';
  }

  function pintarResultado() {
    var caja = document.getElementById('mvRes');
    if (!caja || !DE || !A) return;
    caja.innerHTML = celda(DE, 'mv_sales', 'Sales de') + celda(A, 'mv_llegas', 'Llegas a');
    caja.hidden = false;
  }

  function elegir() {
    var de = document.getElementById('mvDe').value;
    var a  = document.getElementById('mvA').value;
    DE = CIUDADES.filter(function (c) { return c.slug === de; })[0] || null;
    A  = CIUDADES.filter(function (c) { return c.slug === a;  })[0] || null;
    if (DE) DE._t = t0 ? (performance.now() - t0) / 1000 : 0;
    pintarResultado();
    if (quieto) dibujar(0);
  }

  function rellenar() {
    var sDe = document.getElementById('mvDe'), sA = document.getElementById('mvA');
    var ops = CIUDADES.map(function (c) {
      return '<option value="' + esc(c.slug) + '">' + esc(c.ciudad) + ' · ' + esc(c.pais) + '</option>';
    }).join('');
    sDe.innerHTML = ops; sA.innerHTML = ops;

    // Por defecto, dos ciudades que se parezcan a un viaje de verdad
    // y no la primera con la segunda del alfabeto.
    var pref = ['marbella', 'dubai', 'miami', 'madrid'];
    var hay = function (s) { return CIUDADES.some(function (c) { return c.slug === s; }); };
    var d = pref.filter(hay)[0] || (CIUDADES[0] && CIUDADES[0].slug);
    var h = pref.filter(function (s) { return hay(s) && s !== d; })[0] ||
            (CIUDADES[1] && CIUDADES[1].slug);
    if (d) sDe.value = d;
    if (h) sA.value = h;

    sDe.addEventListener('change', elegir);
    sA.addEventListener('change', elegir);
    elegir();
  }

  function arrancar() {
    if (!quieto) requestAnimationFrame(dibujar); else dibujar(0);
    addEventListener('resize', function () { if (quieto) dibujar(0); }, { passive: true });

    var sb = window.__sbClient;
    if (!sb) return;                       // sin cliente, queda el texto
    sb.rpc('ciudades_publicas').then(function (r) {
      if (r.error || !r.data) return;
      var d = r.data;
      CIUDADES = (d.ciudades || d || []).filter(function (c) {
        return c && c.lat != null && c.lng != null;
      });
      if (CIUDADES.length) rellenar();
    }).catch(function () {});
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
