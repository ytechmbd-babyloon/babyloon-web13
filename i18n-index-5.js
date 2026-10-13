/* ═══════════════════════════════════════════════════════════════
   Babyloon · El cargador de los cinco idiomas nuevos
   ───────────────────────────────────────────────────────────────
   POR QUÉ EXISTE ESTE FICHERO

   `i18n-index.js` pesa 176 KB: son 308 claves por once idiomas, y
   se los descargan los dieciséis, incluido quien sólo va a leer
   español. Meter ahí dentro los cinco nuevos —italiano, neerlandés,
   polaco, griego y húngaro— lo habría dejado en 246 KB para todo
   el mundo. Con 100.000 visitas previstas en el lanzamiento, eso es
   pagar siete megas de tráfico por cada cien visitas, en diccionarios
   que nadie lee.

   Así que los cinco van en cinco ficheros de ~15 KB y este cargador
   trae sólo el que hace falta. Un visitante griego se lleva 15 KB;
   uno francés, cero.

   POR QUÉ NO HAY CARRERA CONTRA EL RELOJ

   `BBL.extend` ya termina con:
       if (document.readyState !== 'loading') this.applyDOM();
   Es decir, un diccionario que llega tarde se aplica solo. Y si
   llega pronto, lo recoge el `applyDOM` del DOMContentLoaded. No
   hace falta ningún gancho: las dos puertas están puestas.

   Y EL SELECTOR

   Si alguien entra en inglés y luego elige «HU» en el menú,
   `setLang` lanza el evento `bbl:lang`. Lo escuchamos: sin eso, el
   húngaro se quedaría con las 63 claves base y la portada entera
   caería al respaldo inglés. Es exactamente el agujero que tendría
   una carga hecha sólo al arrancar.

   NOTA PARA LA PRÓXIMA VEZ: lo que falta por hacer es partir
   `i18n-index.js` igual que esto —un fichero por idioma— y bajar de
   176 KB a 16 KB para todos. Es un trabajo acotado y vale la pena
   antes del lanzamiento.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (!window.BBL) return;

  var CINCO = { it: 1, nl: 1, pl: 1, el: 1, hu: 1 };
  var pedido = {};

  // La ruta se calcula desde la de este propio script, no desde la
  // de la página: así sigue funcionando si algún día la web sirve
  // los .js desde una carpeta o desde el CDN.
  var yo = document.currentScript;
  var base = yo ? yo.src.replace(/[^/]*$/, '') : '';

  function traer(l) {
    if (!CINCO[l] || pedido[l]) return;
    pedido[l] = 1;
    var s = document.createElement('script');
    s.src = base + 'i18n-index-' + l + '.js?v=1';
    s.onerror = function () { pedido[l] = 0; };   // que un fallo de red no lo deje bloqueado

    /* BLOQUE 15.8 · lo que faltaba aquí.
       Arriba pone que no hay carrera contra el reloj, y es verdad para
       las etiquetas `data-i18n`: `BBL.extend` llama a `applyDOM` al
       terminar y las repinta. Pero NO es verdad para lo que la página
       escribe a mano con `BBL.t(...)` en un momento cualquiera —la nota
       de las opiniones, la baldosa de la prueba social, el mes de cada
       testimonio—. Eso se pinta cuando llega su dato del servidor, y si
       este fichero todavía no ha aterrizado, `BBL.t` devuelve el
       respaldo INGLÉS.

       Medido el 23 de septiembre: la portada en húngaro pintaba
       «Average rating · from 128 reviews» en medio de una página por lo
       demás húngara.

       El arreglo es una línea: al aterrizar, se relanza `bbl:lang`. Es
       el evento que TODOS esos bloques ya escuchan para repintarse, así
       que no hay que tocar ninguno. Y no se hace un bucle: el listener
       de aquí abajo llama a `traer(l)`, que sale por `pedido[l]`. */
    s.onload = function () {
      try {
        document.dispatchEvent(new CustomEvent('bbl:lang', { detail: l }));
      } catch (_) {
        var ev = document.createEvent('CustomEvent');
        ev.initCustomEvent('bbl:lang', false, false, l);
        document.dispatchEvent(ev);
      }
    };

    document.head.appendChild(s);
  }

  traer(BBL.lang);
  document.addEventListener('bbl:lang', function (e) { traer(e.detail); });
})();
