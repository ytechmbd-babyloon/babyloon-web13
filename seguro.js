/* ═══════════════════════════════════════════════════════════════════════
   seguro.js · Babyloon · bloque 16.6

   POR QUÉ EXISTE
   En la auditoría del 23 de septiembre salieron once sitios donde un dato
   del servidor se metía dentro de un atributo HTML sin escapar. El peor,
   `cliente.html`: la foto de perfil de UNA PROFESIONAL pintada en la
   pantalla de UNA CLIENTA.

       <img class="ic" src="${p.avatar_url}">

   La profesional edita su propio perfil. Si pone de avatar

       x" onerror="...

   la comilla cierra el atributo y lo que venga después se ejecuta en el
   navegador de la clienta. Eso es XSS almacenado de un usuario a otro, y
   no lo para la Content-Security-Policy, porque las páginas llevan sus
   scripts escritos dentro y por eso la CSP conserva 'unsafe-inline'.
   Esto sí lo para.

   Y había una prueba de que el descuido no era sistemático: el MISMO
   campo, `tracking_url`, iba escapado en `profesional.html` y sin escapar
   en `cliente.html`.

   DOS FUNCIONES, Y LA DIFERENCIA IMPORTA

   · esc(t)  — para TEXTO. Escapa < > & " y '.
   · url(u)  — para lo que va en src= o href=. Escapar NO BASTA aquí:
     `javascript:alert(1)` no lleva ningún carácter especial y se ejecuta
     igual al pulsar el enlace. Así que primero se mira el ESQUEMA y sólo
     después se escapa.

   Se permiten: rutas relativas, http, https, mailto, tel, y `data:` sólo
   si es una imagen. Todo lo demás devuelve cadena vacía — una foto que no
   carga es un problema pequeño; ejecutar código ajeno no lo es.

   Se publica también como `window.safeUrl` y `window.escAttr` para poder
   usarlo desde las plantillas sin depender de que BBL exista ya. Este
   fichero no depende de nada y puede cargarse el primero.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var MAPA = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' };

  function esc(t) {
    if (t === null || t === undefined) return '';
    return String(t).replace(/[<>&"']/g, function (c) { return MAPA[c]; });
  }

  // Esquemas que pueden ir en un src o un href sin miedo.
  var BUENOS = /^(https?:|mailto:|tel:)/i;
  var IMAGEN_EN_LINEA = /^data:image\/(png|jpe?g|gif|webp|avif|svg\+xml);/i;

  function url(u) {
    if (u === null || u === undefined) return '';
    var s = String(u).trim();
    if (!s) return '';

    // Los navegadores ignoran los caracteres de control al leer el
    // esquema, así que `java\nscript:` cuela si no se limpian antes.
    var limpio = s.replace(/[\u0000-\u001F\u007F\s]/g, '').toLowerCase();

    // Ruta relativa o absoluta del propio sitio: no lleva esquema.
    var tieneEsquema = /^[a-z][a-z0-9+.-]*:/i.test(limpio);
    if (!tieneEsquema) {
      // `//otro-dominio.com` también es una URL absoluta.
      if (limpio.indexOf('//') === 0) return '';
      return esc(s);
    }
    if (BUENOS.test(limpio) || IMAGEN_EN_LINEA.test(s)) return esc(s);
    return '';
  }

  window.escAttr = esc;
  window.safeUrl = url;
  window.BBL = window.BBL || {};
  window.BBL.esc = esc;
  window.BBL.url = url;
})();
