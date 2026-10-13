/* ═══════════════════════════════════════════════════════════════
   Babyloon · Lujo — cuatro gestos, ninguno decorativo
   ───────────────────────────────────────────────────────────────
   Andrés: «que siga siendo lujosa, minimalista, pero también
   divertida y novedosa».

   Lo difícil de esa frase es que «divertido» y «minimalista» tiran
   en direcciones opuestas en cuanto uno se descuida. La regla que
   se ha seguido aquí: el efecto tiene que responder a lo que hace
   la persona, no ocurrir por su cuenta. Una animación que se
   dispara sola es decoración y cansa a la segunda visita; una que
   reacciona al dedo o al cursor se siente como un material caro
   —la puerta de un coche bueno— y no cansa nunca.

   Los cuatro:

     1. PAN DE ORO. Un rastro de partículas doradas siguiendo al
        cursor. Lento, tenue, se apaga en medio segundo. Es lo
        primero que se nota y lo que nadie más tiene.
     2. BOTONES MAGNÉTICOS. Al acercarte, el botón se inclina hacia
        ti unos píxeles. No se ve; se siente. Es el gesto que
        separa un estudio caro de una plantilla.
     3. TELÓN DE ORO. Las fotos no aparecen con un `fade`: las
        descubre una línea dorada que barre de abajo arriba.
     4. CIFRAS QUE CUENTAN. 43 ciudades, 75 servicios, 19 países:
        suben desde cero cuando entran en pantalla. Dura poco y
        subraya que los números son de verdad.

   NADA de esto se ejecuta si:
     · el sistema pide menos movimiento (`prefers-reduced-motion`),
     · es un dispositivo táctil sin ratón —ahí el oro no tendría a
       quién seguir y sólo gastaría batería—,
     · o el equipo declara pocos núcleos.

   Y todo va con `requestAnimationFrame` y escuchadores pasivos:
   el plan de lanzamiento cuenta con 100.000 visitas y la mitad
   llegarán desde un móvil en una terraza.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var quieto = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fino   = window.matchMedia && matchMedia('(pointer: fine)').matches;
  // El umbral estuvo en 4 y fue un error: un portátil normal declara
  // 4 núcleos, así que habría apagado el efecto justo en la máquina
  // de quien lo pidió. 160 partículas no tumban nada moderno; lo que
  // hay que proteger es un equipo de verdad justo.
  var flojo  = (navigator.hardwareConcurrency || 8) <= 2;

  /* ── 1. Pan de oro ───────────────────────────────────────── */
  function panDeOro() {
    if (quieto || !fino || flojo) return;

    var c = document.createElement('canvas');
    c.setAttribute('aria-hidden', 'true');
    c.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;' +
      'pointer-events:none;z-index:9998;mix-blend-mode:screen';
    document.body.appendChild(c);
    var x = c.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2);

    function medir() {
      c.width = Math.round(innerWidth * dpr);
      c.height = Math.round(innerHeight * dpr);
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    medir();
    addEventListener('resize', medir, { passive: true });

    var motas = [], px = null, py = null;

    addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      // Se siembra en proporción a lo rápido que va el cursor: si no,
      // quedarse quieto acumula un montón de oro en un punto y parece
      // una mancha en vez de un rastro.
      var d = (px == null) ? 0 : Math.hypot(e.clientX - px, e.clientY - py);
      px = e.clientX; py = e.clientY;
      var n = Math.min(3, Math.round(d / 14));
      for (var i = 0; i < n; i++) {
        motas.push({
          x: e.clientX + (Math.random() - .5) * 10,
          y: e.clientY + (Math.random() - .5) * 10,
          vx: (Math.random() - .5) * .28,
          vy: -Math.random() * .34 - .05,   // el oro sube, no cae
          v: 1,
          r: Math.random() * 1.5 + .5
        });
      }
      if (motas.length > 160) motas.splice(0, motas.length - 160);
    }, { passive: true });

    (function pintar() {
      x.clearRect(0, 0, innerWidth, innerHeight);
      for (var i = motas.length - 1; i >= 0; i--) {
        var m = motas[i];
        m.x += m.vx; m.y += m.vy; m.v -= .022;
        if (m.v <= 0) { motas.splice(i, 1); continue; }
        x.beginPath();
        x.arc(m.x, m.y, m.r * m.v, 0, Math.PI * 2);
        // Del oro pálido al oro profundo según se apaga.
        x.fillStyle = 'rgba(' +
          Math.round(200 + 43 * m.v) + ',' +
          Math.round(169 + 55 * m.v) + ',' +
          Math.round(106 + 82 * m.v) + ',' + (m.v * .55) + ')';
        x.fill();
      }
      requestAnimationFrame(pintar);
    })();
  }

  /* ── 2. Botones magnéticos ───────────────────────────────── */
  function magneticos() {
    if (quieto || !fino) return;

    var sel = '.btn-gold, .btn-ghost, .hs-btn, .b-oro, .b-fan, .nav-cta';
    var campo = 70;   // a partir de aquí empieza a notarse

    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var botones = document.querySelectorAll(sel);
      for (var i = 0; i < botones.length; i++) {
        var b = botones[i], r = b.getBoundingClientRect();
        if (r.width === 0) continue;
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = e.clientX - cx, dy = e.clientY - cy;
        var d = Math.hypot(dx, dy);
        var alcance = Math.max(r.width, r.height) / 2 + campo;
        if (d < alcance) {
          var f = (1 - d / alcance) * .26;   // nunca más de ~7 px
          b.style.transform = 'translate(' + (dx * f) + 'px,' + (dy * f) + 'px)';
          b.style.willChange = 'transform';
        } else if (b.style.transform) {
          b.style.transform = '';
          b.style.willChange = '';
        }
      }
    }, { passive: true });

    // Al salir con el cursor de la ventana, todo vuelve a su sitio.
    document.addEventListener('pointerleave', function () {
      var bs = document.querySelectorAll(sel);
      for (var i = 0; i < bs.length; i++) { bs[i].style.transform = ''; }
    }, { passive: true });
  }

  /* ── 3. Telón de oro — RETIRADO ─────────────────────────────
     Estaba y se quitó el mismo día, porque tapó media portada.

     El fallo: la web YA tenía su propio sistema de revelado
     (`.reveal` → `.in`, con `opacity`). El telón añadía encima un
     `clip-path: inset(100%)` a las mismas tarjetas. Resultado: cada
     foto quedaba oculta por DOS motivos a la vez, y bastaba con que
     uno de los dos observadores no disparase —scroll rápido, una
     tarjeta ya pasada, cualquier cosa— para que no volviera nunca.
     Andrés abrió la portada y vio un agujero negro donde van los
     seis servicios.

     La regla que rompí, y que vale para cualquier efecto futuro:
     lo que hay que leer tiene que estar visible cuando la página
     carga. Un contenido aparcado en opacidad cero esperando a un
     observador es un contenido que algún día no aparece. Y sobre
     todo: no se ponen dos sistemas de revelado sobre el mismo
     elemento.

     Los otros tres efectos son aditivos —pintan por encima o
     mueven unos píxeles— y ninguno puede esconder nada. Por eso
     se quedan. */

  /* ── 4. Cifras que cuentan ───────────────────────────────── */
  function cifras() {
    if (!('IntersectionObserver' in window)) return;

    var ojo = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) {
        if (!f.isIntersecting) return;
        var el = f.target;
        ojo.unobserve(el);

        var fin = parseInt((el.textContent || '').replace(/\D/g, ''), 10);
        if (!fin || fin > 100000) return;      // ∞ y otros símbolos, quietos
        var sufijo = (el.textContent || '').replace(/[\d\s.,]/g, '');

        if (quieto) return;                     // se queda el número final
        var t0 = null, dur = 1100;
        function paso(ts) {
          if (!t0) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur);
          var e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(fin * e) + sufijo;
          if (p < 1) requestAnimationFrame(paso);
        }
        requestAnimationFrame(paso);
      });
    }, { threshold: .6 });

    document.querySelectorAll('.sc-num').forEach(function (el) { ojo.observe(el); });
  }

  /* ── Red de seguridad ────────────────────────────────────────
     Después de lo del telón, esto no es paranoia. Si pasados cuatro
     segundos queda algo con el revelado a medias y dentro de la
     pantalla, se destapa. Más vale una aparición sin gracia que un
     hueco negro donde iba el catálogo. */
  function redDeSeguridad() {
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < innerHeight * 1.5) el.classList.add('in');
      });
      document.querySelectorAll('[style*="clip-path"], .bbl-telon').forEach(function (el) {
        el.style.clipPath = 'none';
        el.classList.remove('bbl-telon');
      });
    }, 4000);
  }

  function arrancar() { panDeOro(); magneticos(); cifras(); redDeSeguridad(); }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
