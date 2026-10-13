/* ═══════════════════════════════════════════════════════════════════
   orden.js · bloque 17.A4

   Pinta «cómo se ordenan los resultados» donde haya un `<div
   id="bblOrden">`. Lo exige el Reglamento P2B (UE 2019/1150): decir
   con qué parámetros se ordena y si alguien paga por salir antes.

   Todo sale de `parametros_del_orden()`. Si la función no contesta, o
   contesta `{hay:false}`, el bloque NO SE PINTA. Es la regla de la
   casa: la base decide lo que la web puede decir. Una lista de
   parámetros escrita a mano en la página envejece sola y el día que
   cambie el algoritmo la web estaría mintiendo — y en esto mentir es
   una sanción, no una errata.

   Los pesos, las penalizaciones y «lo que no influye» vienen del
   servidor. Lo único traducido es la etiqueta de cada parámetro
   (`i18n-orden.js`).
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  var caja = document.getElementById('bblOrden');
  if (!caja) return;
  /* El `typeof x === 'undefined'` que esconde un fallo en silencio ya
     costó una tarde en `como-funciona.html`: la ficha de la empresa se
     quedó en «Cargando…» para siempre sin un error en la consola. Aquí
     se avisa. */
  if (typeof sb === 'undefined') {
    console.warn('[orden] falta `sb`: el bloque del orden no se pinta.');
    return;
  }

  /* `BBL.t` con respaldo: si el diccionario aún no está, se enseña el
     texto de reserva en vez de la clave en crudo. La cadena vacía y la
     clave devuelta son los dos fallos de siempre. */
  function T(clave, respaldo) {
    try {
      var v = (window.BBL && BBL.t) ? BBL.t(clave) : '';
      return (v && v !== clave) ? v : (respaldo || '');
    } catch (_) { return respaldo || ''; }
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pct(n) {
    var v = Number(n);
    if (!isFinite(v)) return '';
    try {
      return new Intl.NumberFormat(BBL.lang, {
        style: 'percent', maximumFractionDigits: 1,
      }).format(v / 100);
    } catch (_) { return v + ' %'; }
  }
  /* 61.62 · Los números sueltos, como los escribe cada idioma, igual que
     los porcentajes de al lado (si el árabe pone sus cifras en uno, que
     las ponga en todos). */
  function num(n) {
    var v = Number(n);
    if (!isFinite(v)) return '';
    try { return new Intl.NumberFormat(BBL.lang).format(v); }
    catch (_) { return String(v); }
  }

  var datos = null;

  function pinta() {
    if (!datos || datos.hay === false) { caja.hidden = true; caja.innerHTML = ''; return; }
    var ps = Array.isArray(datos.parametros) ? datos.parametros : [];
    if (!ps.length) { caja.hidden = true; caja.innerHTML = ''; return; }

    var ETIQ = {
      valoracion: ['or_valoracion', 'Valoración de la clientela'],
      completados: ['or_completados', 'Servicios completados'],
      google: ['or_google', 'Reseñas de Google'],
      marcas: ['or_marcas', 'Marcas que usa'],
      cercania: ['or_cercania', 'Cercanía al lugar del servicio'],
      puntualidad: ['or_puntualidad', 'Puntualidad'],
      certificados: ['or_certificados', 'Certificados verificados'],
      digital: ['or_digital', 'Presencia digital'],
      portafolio: ['or_portafolio', 'Portafolio'],
      formacion: ['or_formacion', 'Formación'],
      cancelaciones: ['or_cancelaciones', 'Cancelaciones sin motivo'],
    };
    /* Una clave que el servidor añada mañana y que aquí no esté no puede
       desaparecer de la lista: se enseña su nombre tal cual. Callar un
       parámetro del orden es justo lo que la norma prohíbe. */
    function etiqueta(clave) {
      var e = ETIQ[clave];
      return e ? T(e[0], e[1]) : String(clave).replace(/_/g, ' ');
    }

    var NO = {
      precio_de_la_puja: ['or_no_puja', 'El precio de la puja'],
      publicidad_pagada: ['or_no_publi', 'La publicidad pagada'],
      comision_pagada: ['or_no_comision', 'La comisión pagada'],
      /* Fase 59: lo que se retiró del orden. Se declara que NO influye,
         que es la mitad interesante de la lista. */
      tasa_de_aceptacion: ['or_no_aceptacion', 'La tasa de solicitudes aceptadas'],
      rechazar_un_cambio_de_hora: ['or_no_reprogramar', 'Rechazar un cambio de hora'],
      estar_o_no_conectada: ['or_no_conectada', 'Estar o no en línea'],
    };

    var filas = ps.map(function (p) {
      return '<li class="or-fila">' +
        '<span class="or-n">' + esc(etiqueta(p.clave)) + '</span>' +
        '<span class="or-b"><i style="width:' +
          Math.max(2, Math.min(100, Number(p.peso_pct) || 0)) + '%"></i></span>' +
        '<span class="or-p">' + esc(pct(p.peso_pct)) + '</span></li>';
    }).join('');

    var pen = (datos.penalizaciones || []).map(function (p) {
      return '<li class="or-fila or-menos">' +
        '<span class="or-n">' + esc(etiqueta(p.clave)) + '</span>' +
        '<span class="or-b"><i style="width:' +
          Math.max(2, Math.min(100, Number(p.peso_pct) || 0)) + '%"></i></span>' +
        '<span class="or-p">−' + esc(pct(p.peso_pct)) + '</span></li>';
    }).join('');

    var no = (datos.no_influyen || []).map(function (k) {
      var e = NO[k];
      return '<li>' + esc(e ? T(e[0], e[1]) : String(k).replace(/_/g, ' ')) + '</li>';
    }).join('');

    /* Lo que se cobra va ARRIBA, no en una nota al pie: es lo que a
       nadie le apetece leer y por eso hay una norma que obliga. */
    var antes = (datos.antes_que_la_puntuacion || []).length
      ? '<p class="or-pago">' + esc(T('or_privee',
          'Los perfiles Privée aparecen antes que el resto en las listas por ciudad, ' +
          'con independencia de su puntuación. Privée es una membresía de pago.')) + '</p>'
      : '';

    /* 61.62 · Y lo contrario: quien cancela sin motivo una y otra vez sale
       al final de las listas, también si es Privée. Los números, del
       servidor; sin ellos no se dice nada. */
    var af = datos.al_final_de_las_listas;
    var alFinal = (af && af.minimo && af.dias && af.proporcion_pct != null)
      ? '<p class="or-pago or-final">' + esc(T('or_al_final',
          'Si un perfil acumula {n} cancelaciones sin motivo en {dias} días (no presentarse, ' +
          'no confirmar una reserva Privée o cancelar sin decir por qué) y son al menos el {pct} ' +
          'de sus servicios, aparece al final de las listas hasta que caducan, también si es Privée. ' +
          'Las cancelaciones con motivo no cuentan, y el precio no cambia.')
          .replace('{n}', num(af.minimo))
          .replace('{dias}', num(af.dias))
          .replace('{pct}', pct(af.proporcion_pct))) + '</p>'
      : '';

    caja.hidden = false;
    caja.innerHTML =
      '<details class="or">' +
        '<summary>' + esc(T('or_ver', 'Cómo se ordenan los resultados')) + '</summary>' +
        '<div class="or-in">' +
          antes +
          alFinal +
          '<p class="or-int">' + esc(T('or_intro',
            'Estos son los parámetros que deciden el orden, y lo que pesa cada uno.')) + '</p>' +
          '<ul class="or-lista">' + filas + '</ul>' +
          (pen ? '<h4>' + esc(T('or_resta', 'Resta puntos')) + '</h4>' +
                 '<ul class="or-lista">' + pen + '</ul>' : '') +
          (no ? '<h4>' + esc(T('or_no', 'Lo que no influye en el orden')) + '</h4>' +
                '<ul class="or-no">' + no + '</ul>' : '') +
          (datos.en_rodaje
            ? '<p class="or-pie">' + esc(T('or_rodaje', datos.en_rodaje)) + '</p>' : '') +
        '</div>' +
      '</details>';
  }

  sb.rpc('parametros_del_orden').then(function (r) {
    datos = (r && !r.error) ? r.data : null;
    pinta();
  }).catch(function () { datos = null; pinta(); });

  /* Al cambiar de idioma se vuelve a pintar: las etiquetas son nuestras,
     los pesos no cambian. Desde 33.3 este aviso también llega al cargar. */
  document.addEventListener('bbl:lang', pinta);
})();
