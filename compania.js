/* ═══════════════════════════════════════════════════════════════════
   compania.js · bloque 46.9b

   Las tres piezas que se tocan en seguridad, información legal y
   sostenibilidad. Un fichero para las tres porque comparten la forma
   —elegir una cosa, enseñar lo que corresponde— y separarlas en tres
   habría sido repetir el mismo esqueleto tres veces.

   Se monta sola: cada bloque sólo existe si su contenedor está en la
   página, así que las tres páginas cargan el mismo fichero y cada una
   enciende lo suyo.

   NINGUNA CIFRA ESTÁ INVENTADA. El marcador de envíos calcula lo que
   hace el carrito de verdad desde el bloque 23: un pedido al proveedor
   por proveedor, no uno por línea de producto. Si algún día eso cambia,
   cambia aquí y se nota.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── La conexión, una sola vez para las tres páginas ──────────────
     `seguridad.html` cargaba `supabase-js` y `conexion.js` y NADIE
     llamaba a `createClient`, así que `window.sb` no existía y el
     bloque del seguro se iba en su primera línea: `if (!window.sb)
     return;`. Resultado: la sección del seguro no habría aparecido
     nunca, ni el día de firmar la póliza, y nadie habría sabido por
     qué. Es el fallo del 32.7 —«llamaba a `sb` sin crearlo»— repetido
     en otra página, y es de la misma familia que `is_slot_free`: algo
     construido, correcto y sin el escalón de en medio.

     Se crea aquí y no en cada página para no repartir la URL y la
     clave por más sitios de los que ya están. Y se respeta lo que
     hubiera: `como-funciona.html` ya usa `__sbClient`.
     ──────────────────────────────────────────────────────────────── */
  var SUPABASE_URL = 'https://qphatjblvojnfyghwmjy.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaGF0amJsdm9qbmZ5Z2h3bWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTUyNTksImV4cCI6MjA5NDMzMTI1OX0.fd_maoPBLGKAGHqOcsmcAKWbTl_a0962TpV57f7u0ik';

  function conectar() {
    try {
      if (window.__sbClient) return window.__sbClient;
      if (window.supabase && typeof window.supabase.createClient === 'function') {
        window.__sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        return window.__sbClient;
      }
    } catch (_) {}
    return null;
  }

  function t(k, d) {
    try { var v = window.BBL && window.BBL.t(k); return (v && v !== k) ? v : d; }
    catch (_) { return d; }
  }
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[<>&"']/g, function (c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 1 · El viaje de un servicio (seguridad) ──────────────────── */
  var PASOS = ['solicitud', 'subasta', 'confirmacion', 'servicio', 'pago'];

  function montarViaje() {
    var caja = $('viaje');
    if (!caja) return;
    var elegido = 0;

    function pintar() {
      var botones = '';
      PASOS.forEach(function (p, i) {
        botones += '<button type="button" role="tab" aria-selected="' + (i === elegido) + '" data-i="' + i + '">' +
          '<b>0' + (i + 1) + '</b>' + esc(t('cq_v_' + p + '_t', p)) + '</button>';
      });
      caja.innerHTML =
        '<div class="pasos" role="tablist">' + botones + '</div>' +
        '<div class="barra"><i style="width:' + Math.round((elegido + 1) / PASOS.length * 100) + '%"></i></div>' +
        '<div class="cuenta" role="tabpanel">' +
          '<h3>' + esc(t('cq_v_' + PASOS[elegido] + '_t', '')) + '</h3>' +
          '<p>' + esc(t('cq_v_' + PASOS[elegido] + '_d', '')) + '</p>' +
        '</div>';
    }
    caja.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-i]') : null;
      if (!b) return;
      elegido = Number(b.getAttribute('data-i')) || 0;
      pintar();
    });
    pintar();
    document.addEventListener('bbl:lang', pintar);
  }

  /* ── 2 · A quién escribes (información legal) ──────────────────── */
  var CASOS = ['consumo', 'datos', 'profesional', 'prensa', 'propiedad'];

  function montarRuta() {
    var caja = $('ruta');
    if (!caja) return;
    var elegido = 0;

    function pintar() {
      var lista = '';
      CASOS.forEach(function (c, i) {
        lista += '<button type="button" role="tab" aria-selected="' + (i === elegido) + '" data-i="' + i + '">' +
          esc(t('cq_r_' + c + '_t', c)) + '</button>';
      });
      var c = CASOS[elegido];
      caja.innerHTML =
        '<div class="casos" role="tablist">' + lista + '</div>' +
        '<div class="respuesta" role="tabpanel">' +
          '<h3>' + esc(t('cq_r_' + c + '_t', '')) + '</h3>' +
          '<p>' + esc(t('cq_r_' + c + '_d', '')) + '</p>' +
          '<p>' + esc(t('cq_r_' + c + '_q', '')) + '</p>' +
          '<span class="plazo">' + esc(t('cq_r_' + c + '_p', '')) + '</span>' +
        '</div>';
    }
    caja.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-i]') : null;
      if (!b) return;
      elegido = Number(b.getAttribute('data-i')) || 0;
      pintar();
    });
    pintar();
    document.addEventListener('bbl:lang', pintar);
  }

  /* ── 3 · Cuántos envíos salen de un carrito (sostenibilidad) ───── */
  function montarEnvios() {
    var caja = $('envios');
    if (!caja) return;
    /* Cada proveedor con el número de líneas de producto que lleva en
       este ejemplo. Lo que se demuestra es que los envíos los marca el
       número de PROVEEDORES, no el de productos. */
    var PROV = [
      { k: 'a', lineas: 2 }, { k: 'b', lineas: 1 },
      { k: 'c', lineas: 2 }, { k: 'd', lineas: 3 }
    ];
    var puestos = { a: true, b: true, c: true, d: false };

    function pintar() {
      var activos = PROV.filter(function (p) { return puestos[p.k]; });
      var lineas = activos.reduce(function (n, p) { return n + p.lineas; }, 0);
      var envios = activos.length;

      var bot = '';
      PROV.forEach(function (p) {
        bot += '<button type="button" aria-pressed="' + !!puestos[p.k] + '" data-k="' + p.k + '">' +
          esc(t('cq_e_prov_' + p.k, p.k)) + '</button>';
      });
      caja.innerHTML =
        '<p>' + esc(t('cq_e_p', '')) + '</p>' +
        '<div class="prov">' + bot + '</div>' +
        '<div class="marcador">' +
          '<div><b>' + lineas + '</b><span>' + esc(t('cq_e_antes', 'Pedidos al proveedor, uno por producto')) + '</span></div>' +
          '<div><b>' + envios + '</b><span>' + esc(t('cq_e_ahora', 'Pedidos al proveedor hoy, uno por proveedor')) + '</span></div>' +
        '</div>' +
        '<p class="pie">' + esc(
          envios === 0 ? t('cq_e_vacio', 'Elige al menos un proveedor.')
                       : t('cq_e_pie', '')) + '</p>';
    }
    caja.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-k]') : null;
      if (!b) return;
      var k = b.getAttribute('data-k');
      puestos[k] = !puestos[k];
      pintar();
    });
    pintar();
    document.addEventListener('bbl:lang', pintar);
  }

  /* ── 4 · Dónde está tu dinero (seguridad) · bloque 54.1 ──────────
     La pieza principal de la página, y la que más cuesta copiar.

     El argumento no se lee: se ve. El dinero se queda quieto en
     «retenido» durante TRES de los cinco momentos —incluido todo el
     servicio— y sólo se mueve cuando la clienta confirma. Contarlo en
     una viñeta es una frase más; enseñarlo parado mientras pasa el
     servicio es el argumento entero.

     Los tres sitios donde puede estar el dinero son los de verdad:
     la tarjeta (autorizado, no cobrado), la retención, y la cuenta de
     quien presta el servicio. No hay una cuarta bolsa nuestra.

     Sin JavaScript no queda un hueco: el HTML trae los cinco momentos
     escritos y esto los sustituye. Un bloque vacío en la página que
     explica dónde está tu dinero sería el peor sitio posible para un
     hueco.
     ──────────────────────────────────────────────────────────────── */
  var DINERO = [
    { k: 'reserva',  donde: 0 },
    { k: 'acepta',   donde: 1 },
    { k: 'servicio', donde: 1 },
    { k: 'confirma', donde: 1 },
    { k: 'pago',     donde: 2 }
  ];
  var LUGARES = ['tarjeta', 'retenido', 'cuenta'];

  function montarDinero() {
    var caja = $('dinero');
    if (!caja) return;
    var elegido = 0, tic = null;

    function pintar() {
      var d = DINERO[elegido], bot = '', lug = '';

      DINERO.forEach(function (p, i) {
        bot += '<button type="button" role="tab" aria-selected="' + (i === elegido) + '"' +
               ' data-i="' + i + '"><b>0' + (i + 1) + '</b>' +
               '<span>' + esc(t('sg_din_' + p.k + '_t', p.k)) + '</span></button>';
      });

      LUGARES.forEach(function (l, i) {
        var aqui = d.donde === i;
        lug += '<div class="lug' + (aqui ? ' aqui' : '') + '">' +
                 '<span class="pt" aria-hidden="true"></span>' +
                 '<span class="lt">' + esc(t('sg_din_lug_' + l, l)) + '</span>' +
               '</div>';
      });

      caja.innerHTML =
        '<div class="din-pasos" role="tablist">' + bot + '</div>' +
        '<div class="din-via" aria-hidden="true">' +
          '<div class="din-riel"><i style="inline-size:' +
            Math.round(elegido / (DINERO.length - 1) * 100) + '%"></i></div>' +
          '<div class="din-lugares">' + lug + '</div>' +
        '</div>' +
        '<div class="din-cuenta" role="tabpanel" aria-live="polite">' +
          '<h3>' + esc(t('sg_din_' + d.k + '_t', '')) + '</h3>' +
          '<p>' + esc(t('sg_din_' + d.k + '_d', '')) + '</p>' +
        '</div>';
    }

    function ir(i, manual) {
      elegido = ((i % DINERO.length) + DINERO.length) % DINERO.length;
      if (manual && tic) { clearInterval(tic); tic = null; }   // toca quien mira: manda quien mira
      pintar();
    }

    caja.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-i]') : null;
      if (b) ir(Number(b.getAttribute('data-i')) || 0, true);
    });
    /* Teclado: es una lista de pestañas de verdad, no botones sueltos. */
    caja.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      ir(elegido + (e.key === 'ArrowRight' ? 1 : -1), true);
      var n = caja.querySelector('button[data-i="' + elegido + '"]');
      if (n) n.focus();
    });

    pintar();
    document.addEventListener('bbl:lang', pintar);

    /* Avanza solo, para que se vea la parada larga sin tener que tocar.
       Con movimiento reducido no avanza: quien lo pide no quiere que se
       le mueva nada, y los cinco momentos siguen siendo pulsables. */
    if (!quieto() && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (ent) {
        if (ent[0].isIntersecting && !tic) {
          tic = setInterval(function () {
            if (!document.hidden) ir(elegido + 1);
          }, 2600);
        } else if (!ent[0].isIntersecting && tic) {
          clearInterval(tic); tic = null;
        }
      }, { threshold: 0.4 }).observe(caja);
    }
  }

  /* ── 5 · El botón de pánico (seguridad) · bloque 54.2 ─────────────
     Qué pasa exactamente al pulsarlo. Cuatro pasos, y el cuarto es el
     que importa y el que nadie cuenta: **cerrarlo exige escribir qué se
     hizo**. Un aviso cerrado sin explicación no es un aviso atendido,
     y esa regla está en el servidor desde el bloque 20.3.

     No lleva números —ni minutos de respuesta ni gente de guardia—
     porque hoy no hay ninguno medido. Prometer «respuesta en X
     minutos» sin un dato detrás es lo mismo que el ★ 4.9 inventado.
     ──────────────────────────────────────────────────────────────── */
  var PANICO = ['pulsa', 'entra', 'mira', 'cierra'];

  function montarPanico() {
    var caja = $('panico');
    if (!caja) return;

    function pintar() {
      var html = '';
      PANICO.forEach(function (p, i) {
        html += '<li class="pan-p rv">' +
                  '<span class="n" aria-hidden="true">0' + (i + 1) + '</span>' +
                  '<h3>' + esc(t('sg_pan_' + p + '_t', p)) + '</h3>' +
                  '<p>' + esc(t('sg_pan_' + p + '_d', '')) + '</p>' +
                '</li>';
      });
      caja.innerHTML = '<ol class="pan-lista">' + html + '</ol>';
      revelar(caja);
    }
    pintar();
    document.addEventListener('bbl:lang', pintar);
  }

  /* ── El movimiento, compartido ────────────────────────────────────
     Mismo sistema que `empleo.js`: la clase `.js` la pone este fichero,
     así que sin JavaScript no se oculta nada. Y con movimiento reducido
     —o sin observador— se revela todo de golpe en vez de no revelarse
     nunca, que es el fallo que deja una página en blanco.
     ──────────────────────────────────────────────────────────────── */
  function quieto() {
    try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (_) { return false; }
  }

  var observador = null;
  function revelar(raiz) {
    var ns = (raiz || document).querySelectorAll('.rv:not(.visto)');
    if (!ns.length) return;
    if (quieto() || !('IntersectionObserver' in window)) {
      for (var i = 0; i < ns.length; i++) ns[i].classList.add('visto');
      return;
    }
    if (!observador) {
      observador = new IntersectionObserver(function (ent) {
        for (var j = 0; j < ent.length; j++) {
          if (!ent[j].isIntersecting) continue;
          ent[j].target.classList.add('visto');
          observador.unobserve(ent[j].target);
        }
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    }
    for (var k = 0; k < ns.length; k++) observador.observe(ns[k]);
  }

  function arrancar() {
    document.body.classList.add('js');
    conectar();
    montarViaje(); montarRuta(); montarEnvios();
    montarDinero(); montarPanico();
    revelar(document);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
