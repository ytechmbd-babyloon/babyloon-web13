/* ═══════════════════════════════════════════════════════════════════
   politicas.js · bloque 35.6

   Pinta las condiciones de la Boutique donde haya un
   `<div id="bblPoliticas">`. Todo sale de `politicas_de_la_boutique()`,
   que devuelve dos cosas separadas a propósito:

     datos  · las cifras, sin idioma. Se pintan con el formateador de
              quien mira y con los nombres de país que da el navegador,
              así que valen para los dieciséis idiomas.
     texto  · los párrafos, con sus huecos SIN rellenar. Los rellena
              esta función con `datos`.

   Por qué así: hasta hoy las mismas promesas estaban escritas en cuatro
   sitios, y tres decían cosas distintas. El fichero compilado en las
   dos apps prometía 14 días de devolución donde la clienta acepta 30.
   Un número dentro de un párrafo no se actualiza solo, y nadie lo
   revisa hasta que alguien reclama.

   Si el servidor no contesta, no se pinta nada. No hay texto de
   reserva: un texto de reserva en una condición de venta es la manera
   de volver a tener dos versiones.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  var caja = document.getElementById('bblPoliticas');
  if (!caja) return;
  if (typeof sb === 'undefined') {
    console.warn('[politicas] falta `sb`: las condiciones no se pintan.');
    return;
  }

  function T(clave, respaldo) {
    try {
      var v = (window.BBL && BBL.t) ? BBL.t(clave) : '';
      return (v && v !== clave) ? v : (respaldo || '');
    } catch (_) { return respaldo || ''; }
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  }
  /* Los huecos se rellenan sobre la frase ya traducida. Partirla en
     trozos deja frases que en otros idiomas no encajan. */
  function con(s, v) {
    return String(s).replace(/\{(\w+)\}/g, function (_, k) {
      return v[k] != null ? v[k] : '';
    });
  }
  function num(x) {
    try { return new Intl.NumberFormat(BBL.lang).format(x); }
    catch (_) { return String(x); }
  }
  function dinero(x, moneda) {
    var n = Number(x);
    if (!isFinite(n)) return '—';
    try {
      return new Intl.NumberFormat(BBL.lang, {
        style: 'currency', currency: moneda || 'EUR',
      }).format(n);
    } catch (_) { return n.toFixed(2) + ' ' + (moneda || 'EUR'); }
  }
  function pais(iso) {
    try {
      var n = new Intl.DisplayNames([BBL.lang], { type: 'region' }).of(iso);
      return n && n !== iso ? n : iso;
    } catch (_) { return iso; }
  }
  function fecha(v) {
    try {
      return new Intl.DateTimeFormat(BBL.lang, {
        year: 'numeric', month: 'long', day: 'numeric',
      }).format(new Date(v));
    } catch (_) { return String(v || '').slice(0, 10); }
  }

  var DATOS = null, PAIS = null;

  /* El país que se está mirando. Lo elige quien mira; se empieza por el
     suyo si lo sabemos, porque lo que se quiere saber es cuánto tarda
     A CASA DE UNA, no la tabla entera. */
  function paisesDisponibles(d) {
    var s = {};
    (d.envio || []).forEach(function (p) {
      (p.destinos || []).forEach(function (x) { s[x.pais] = true; });
    });
    return Object.keys(s).sort(function (a, b) {
      return pais(a).localeCompare(pais(b), BBL.lang);
    });
  }

  function tablaEnvios(d) {
    var moneda = d.moneda || 'EUR';
    var filas = (d.envio || []).map(function (p) {
      var dest = (p.destinos || []).filter(function (x) { return x.pais === PAIS; })[0];
      if (!dest) return '';
      var prep = (p.procesar_min != null && p.procesar_max != null)
        ? con(T('pb_dias', '{min}–{max} días'),
              { min: num(p.procesar_min), max: num(p.procesar_max) })
        : '—';
      var tran = (dest.dias_min != null && dest.dias_max != null)
        ? con(T('pb_dias', '{min}–{max} días'),
              { min: num(dest.dias_min), max: num(dest.dias_max) })
        : ((p.dias_min != null && p.dias_max != null)
            ? con(T('pb_dias', '{min}–{max} días'),
                  { min: num(p.dias_min), max: num(p.dias_max) })
            : '—');
      var envio = Number(dest.coste) > 0 ? dinero(dest.coste, moneda)
                                         : T('pb_gratis', 'Gratis');
      var gratis = dest.gratis_desde != null ? dinero(dest.gratis_desde, moneda)
                 : (p.siempre_gratis ? T('pb_gratis', 'Gratis') : '—');
      return '<tr><td>' + esc(p.proveedor) + '</td>' +
        '<td>' + esc(prep) + '</td><td>' + esc(tran) + '</td>' +
        '<td>' + esc(envio) + '</td><td>' + esc(gratis) + '</td></tr>';
    }).filter(Boolean).join('');

    if (!filas) {
      return '<p class="pb-vacio">' + esc(T('pb_no_envia',
        'Todavía no enviamos a este país.')) + '</p>';
    }
    return '<div class="pb-tabla-env"><table><thead><tr>' +
      '<th>' + esc(T('pb_c_prov', 'Proveedor')) + '</th>' +
      '<th>' + esc(T('pb_c_prep', 'Preparación')) + '</th>' +
      '<th>' + esc(T('pb_c_transito', 'Tránsito')) + '</th>' +
      '<th>' + esc(T('pb_c_envio', 'Envío')) + '</th>' +
      '<th>' + esc(T('pb_c_gratis', 'Gratis desde')) + '</th>' +
      '</tr></thead><tbody>' + filas + '</tbody></table></div>';
  }

  function pinta() {
    if (!DATOS) { caja.innerHTML = ''; return; }
    var d = DATOS.datos || {};
    var v = d.ventanas || {};
    var paises = paisesDisponibles(d);
    if (!PAIS) {
      var mio = '';
      try { mio = (BBL.pais || '').toUpperCase(); } catch (_) {}
      PAIS = paises.indexOf(mio) >= 0 ? mio
           : (paises.indexOf('ES') >= 0 ? 'ES' : paises[0] || null);
    }

    var aviso = DATOS.hay_traduccion ? '' :
      '<p class="pb-aviso">' + esc(T('pb_aviso_idioma',
        'Este texto está escrito en español e inglés. Estás viendo la versión en inglés.')) + '</p>';

    var selector = paises.length ? '<div class="pb-pais">' +
      '<label for="pbPais">' + esc(T('pb_pais', 'Plazos y costes para')) + '</label>' +
      '<select id="pbPais">' + paises.map(function (p) {
        return '<option value="' + esc(p) + '"' + (p === PAIS ? ' selected' : '') +
               '>' + esc(pais(p)) + '</option>';
      }).join('') + '</select></div>' : '';

    /* Los bloques 1 y 2 hablan de plazos y de costes: la tabla va
       justo detrás de su párrafo, no en un apartado aparte. */
    var bloques = (DATOS.texto || []).map(function (t) {
      var cuerpo = con(t.cuerpo || '', {
        devolver_dias: num(v.devolver_dias),
        cancelar_horas: num(v.cancelar_horas),
        incidencia_horas: num(v.incidencia_horas),
        reembolso_dias_min: num(v.reembolso_dias_min),
        reembolso_dias_max: num(v.reembolso_dias_max),
      });
      var parrafos = cuerpo.split('\n\n').map(function (p) {
        if (/^·/m.test(p)) {
          return '<ul>' + p.split('\n').map(function (l) {
            return '<li>' + esc(l.replace(/^·\s*/, '')) + '</li>';
          }).join('') + '</ul>';
        }
        return '<p>' + esc(p).replace(/\n/g, '<br/>') + '</p>';
      }).join('');
      var extra = (Number(t.orden) === 1 || Number(t.orden) === 2) ? tablaEnvios(d) : '';
      return '<section class="pb-b"><h2>' + esc(t.titulo || '') + '</h2>' +
             parrafos + extra + '</section>';
    }).join('');

    var sello = DATOS.version
      ? '<p class="pb-sello">' + esc(con(T('pb_actualizado', 'Actualizado el {fecha}'),
          { fecha: fecha(DATOS.version) })) + '</p>' : '';

    caja.innerHTML = aviso + selector + sello + bloques;

    var sel = document.getElementById('pbPais');
    if (sel) sel.addEventListener('change', function () { PAIS = sel.value; pinta(); });
  }

  function cargar() {
    var lang = 'es';
    try { lang = BBL.lang || 'es'; } catch (_) {}
    sb.rpc('politicas_de_la_boutique', { p_lang: lang, p_pais: null })
      .then(function (r) {
        DATOS = (r && !r.error && r.data && r.data.ok) ? r.data : null;
        if (!DATOS) console.warn('[politicas] el servidor no ha devuelto las condiciones.');
        pinta();
      })
      .catch(function (e) { console.warn('[politicas]', e); DATOS = null; pinta(); });
  }

  cargar();
  /* Al cambiar de idioma hay que volver a PEDIRLO, no sólo repintar:
     el texto largo viene del servidor en el idioma que toque. */
  document.addEventListener('bbl:lang', cargar);
})();
