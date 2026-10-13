/* ═══════════════════════════════════════════════════════════════════════
   legal.js · Babyloon · bloque 17.B0c

   POR QUÉ EXISTE
   `privacidad.html` y `terminos.html` eran las dos únicas páginas de la
   web con el texto escrito dentro, en español y sin una sola clave de
   traducción. Noventa y cuatro líneas y noventa y ocho, fijas.

   Mientras tanto, la base tenía desde el bloque 17.B0 la tabla
   `legal_documents` —documento · idioma · país, con versión, fecha y
   firma de asesor— y el lector `documento_legal()` con sus cuatro
   saltos. Se podían firmar los dieciséis idiomas y la web no habría
   cambiado ni una letra, porque nadie los leía.

   Esto los lee.

   TRES DECISIONES

   1. EL TEXTO DE HOY SE QUEDA COMO RESPALDO. No se borra. Mientras
      `documento_legal()` diga `hay:false` —que es lo que dice hoy, con
      la tabla vacía— la página enseña lo que ya enseñaba. Vaciar la
      política de privacidad a la espera de que alguien firme algo
      habría sido peor que no tocar nada: una web sin política de
      privacidad no es discreta, es ilegal.

   2. SI SE LE DA OTRO IDIOMA, SE DICE. `documento_legal()` devuelve
      `es_el_que_pediste`. Una alemana que recibe el texto en español
      porque todavía no hay alemán tiene derecho a saber que eso es lo
      que ha pasado, en vez de creer que el alemán dice eso.

   3. EL CUERPO SE PINTA COMO TEXTO, NUNCA COMO HTML. Lo escribe un
      asesor y lo pega una persona en un formulario. Un `<script>` en un
      documento legal sería gracioso una sola vez. Se escapa todo y se
      admite una única marca: una línea que empiece por `## ` es un
      encabezado.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var caja = document.getElementById('lgCuerpo');
  if (!caja) return;
  var SLUG = caja.getAttribute('data-legal');
  if (!SLUG || typeof sb === 'undefined') return;

  var titulo  = document.getElementById('lgTitulo');
  var sello   = document.getElementById('lgSello');
  var respald = caja.innerHTML;          // lo que ya había, por si no hay nada firmado
  var D = null;

  function t(k, alt) { try { var s = BBL.t(k); return (s && s !== k) ? s : alt; } catch (_) { return alt; } }
  var esc = (window.escAttr) || function (x) {
    return String(x == null ? '' : x)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  function dia(d) {
    if (!d) return '';
    try {
      return new Intl.DateTimeFormat(BBL.lang, { day: 'numeric', month: 'long', year: 'numeric' })
        .format(new Date(String(d).slice(0, 10) + 'T00:00:00'));
    } catch (_) { return String(d); }
  }

  /* El cuerpo, tal cual lo pegó el asesor: párrafos en las líneas en
     blanco, y `## ` para un encabezado. Nada más.

     Se recorre LÍNEA A LÍNEA, no por bloques separados por líneas en
     blanco. La primera versión hacía lo segundo, y entonces esto

         ## 1. Responsable
         Babyloon es responsable de…

     —que es como escribe cualquiera— se convertía en un encabezado con
     el párrafo dentro. Un encabezado se acaba en su propia línea. */
  function aHtml(txt) {
    var lineas = String(txt == null ? '' : txt).replace(/\r\n/g, '\n').split('\n');
    var out = '', parrafo = [];

    function cierra() {
      if (parrafo.length) out += '<p>' + parrafo.join('<br>') + '</p>';
      parrafo = [];
    }

    for (var i = 0; i < lineas.length; i++) {
      var l = lineas[i].trim();
      if (!l) { cierra(); continue; }
      if (l.indexOf('## ') === 0) {
        cierra();
        out += '<h2>' + esc(l.slice(3).trim()) + '</h2>';
      } else {
        parrafo.push(esc(l));
      }
    }
    cierra();
    return out;
  }

  function pinta() {
    if (!D || D.hay !== true) return;

    if (titulo && D.titulo) titulo.textContent = D.titulo;
    caja.innerHTML = aHtml(D.cuerpo);

    if (!sello) return;
    var partes = [];
    if (D.version) partes.push(esc(t('lg_version', 'Versión') + ' ' + D.version));
    if (D.desde)   partes.push(esc(t('lg_vigor', 'en vigor desde el') + ' ' + dia(D.desde)));
    if (D.firmado_por) partes.push(esc(t('lg_firmado', 'revisado por') + ' ' + D.firmado_por));
    var linea = partes.join(' · ');

    // Honesto: si se le ha dado otro idioma o el texto de otro país, se
    // dice. Callarlo es dejarle creer que su idioma dice esto.
    if (D.es_el_que_pediste === false) {
      linea += (linea ? '<br>' : '') + '<b>' +
        esc(t('lg_otro_idioma',
              'Todavía no hay una versión firmada en tu idioma. Esta es la que rige mientras tanto.')) + '</b>';
    }
    sello.innerHTML = linea;
    sello.style.display = linea ? '' : 'none';
  }

  function nada() {
    // Sin texto firmado: se queda lo de siempre, y el sello dice la
    // verdad —que es provisional— sin publicar una nota interna.
    caja.innerHTML = respald;
    if (!sello) return;
    sello.innerHTML = esc(t('lg_provisional',
      'Documento provisional. La versión definitiva, con su fecha de entrada en vigor, se publicará aquí.'));
    sello.style.display = '';
  }

  function pedir() {
    sb.rpc('documento_legal', { p_slug: SLUG, p_lang: BBL.lang, p_country: null })
      .then(function (r) {
        // Un fallo de red no vacía la página: se queda el respaldo.
        if (r.error || !r.data) { nada(); return; }
        D = r.data;
        if (D.hay === true) pinta(); else nada();
      })
      .catch(function () { nada(); });
  }

  /* 61.5 · Las dos apps enlazan aquí desde su pantalla de aceptación con
     ?lang=xx: el texto que se acepta en la app se tiene que poder leer en
     el idioma en que se acepta. Se aplica antes de pedir el texto, y sólo
     si la web tiene ese idioma; si no, se queda el que había. */
  try {
    var pedido = (new URLSearchParams(location.search).get('lang') || '').toLowerCase();
    if (pedido && window.BBL && BBL.setLang && pedido !== BBL.lang) BBL.setLang(pedido);
  } catch (_) {}

  pedir();
  // Al cambiar de idioma hay que volver a preguntar: puede haber texto
  // firmado en el idioma nuevo y no en el viejo, o al revés.
  document.addEventListener('bbl:lang', pedir);
})();
