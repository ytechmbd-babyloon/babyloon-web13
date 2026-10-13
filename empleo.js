/* ═══════════════════════════════════════════════════════════════════
   empleo.js · bloque 49.4

   La lista no vive aquí: vive en `vacantes`, se gestiona en Panel →
   Contratación, y esta página la lee:

       vacantes_publicas(idioma)   la lista, ya resuelta al idioma
       vacante_publica(codigo, …)  la ficha entera de una
       condiciones_publicas(…)     «cómo trabajamos»
       candidatura (edge function) la candidatura y el currículum
       aviso_vacante_alta(…)       el aviso de vacantes nuevas

   LO QUE AÑADE EL 49.4, Y POR QUÉ CADA COSA

   1. UN BUSCADOR DE VERDAD. Texto, área y modalidad, con el número de
      puestos al lado de cada filtro y el estado EN LA DIRECCIÓN. Esto
      último no es un lujo: sin ello, «mira este puesto» no se puede
      mandar por escrito, y mandar un puesto por escrito es la mitad de
      cómo se llena una vacante.

   2. LOS CONTADORES DE CADA FILTRO SE CALCULAN CON LOS OTROS FILTROS
      PUESTOS. Un filtro que dice «Producto 4» cuando al pulsarlo salen
      cero es peor que no tener contador.

   3. UN SISTEMA DE MOVIMIENTO, NO EFECTOS SUELTOS. Una clase `.rv` y un
      observador. Y lo primero que hace este fichero es ponerle `.js` al
      `<body>`: el CSS sólo esconde lo que va a revelar SI el JavaScript
      llegó. Una página de empleo en blanco porque falló un script es
      una página de empleo que no existe.

   4. EL VÍDEO DE PORTADA SE COMPRUEBA ANTES DE ENSEÑARLO. La portada
      nace con `.sin-video` y sólo se la quita cuando el navegador dice
      que puede reproducirlo. Al revés —enseñar y quitar si falla— deja
      un rectángulo negro el tiempo que tarde en fallar, que con una
      conexión mala son segundos.

   LO QUE NO CAMBIA

   · UNA LISTA VACÍA NO ES LO MISMO QUE UN FALLO. Si la consulta se cae,
     esta página NO dice «no hay puestos abiertos»: dice que no ha
     podido cargarlos y ofrece reintentar.
   · EL CURRÍCULUM NO LO SUBE EL NAVEGADOR A UNA CARPETA ABIERTA. La
     función de borde comprueba tipo y tamaño, crea la candidatura y
     devuelve una URL firmada para UNA ruta concreta.
   · EL TIPO Y EL TAMAÑO SE MIRAN TAMBIÉN AQUÍ, no para fiarnos, sino
     para no hacerle subir cinco megas a alguien para decírselo después.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://qphatjblvojnfyghwmjy.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaGF0amJsdm9qbmZ5Z2h3bWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTUyNTksImV4cCI6MjA5NDMzMTI1OX0.fd_maoPBLGKAGHqOcsmcAKWbTl_a0962TpV57f7u0ik';

  var TIPOS = {
    'application/pdf': 1, 'application/msword': 1,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 1
  };
  var MAX_BYTES = 5 * 1024 * 1024;

  var sbCache = null;
  function cliente() {
    if (sbCache) return sbCache;
    try {
      if (window.BBL && BBL.sb) { sbCache = BBL.sb; return sbCache; }
      if (window.supabase && window.supabase.createClient) {
        sbCache = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        return sbCache;
      }
    } catch (_) {}
    return null;
  }

  function t(k, d) {
    try { if (window.BBL && BBL.t) { var v = BBL.t(k); if (v) return v; } } catch (_) {}
    return d;
  }
  function idioma() {
    try { if (window.BBL && BBL.lang) return BBL.lang; } catch (_) {}
    return 'es';
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function $(id) { return document.getElementById(id); }
  function quieto() {
    try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (_) { return false; }
  }

  var MODALIDAD = { presencial: 'ep_m_presencial', remoto: 'ep_m_remoto', hibrido: 'ep_m_hibrido' };
  var JORNADA = { completa: 'ep_j_completa', parcial: 'ep_j_parcial', freelance: 'ep_j_freelance', practicas: 'ep_j_practicas' };
  var POR_DEFECTO = {
    ep_m_presencial: 'Presencial', ep_m_remoto: 'Remoto', ep_m_hibrido: 'Híbrido',
    ep_j_completa: 'Jornada completa', ep_j_parcial: 'Jornada parcial',
    ep_j_freelance: 'Por cuenta propia', ep_j_practicas: 'Prácticas'
  };
  function etiqueta(mapa, valor) {
    var k = mapa[valor];
    if (!k) return valor || '';
    return t(k, POR_DEFECTO[k] || valor);
  }

  var estado = { lista: null, fallo: false, filtro: '', modo: '', texto: '',
                 fichas: {}, abierta: null, vuelta: 0, vueltaCond: 0, arrancado: false };

  /* ═══════════════════════════════════════════════════════════════════
     LA BANDA DEL DÍA Y LAS CIUDADES

     Siete ciudades con la hora que es AHÍ ahora mismo, y encendidas las
     que tienen luz. No se marcan «horas de trabajo»: las condiciones de
     jornada las escribe Andrés en el administrador y todavía no están
     firmadas, así que pintarlas aquí sería inventarlas. Se marca el DÍA,
     que es un hecho astronómico y no una política de empresa.

     LOS NOMBRES NO SE VUELVEN A TRADUCIR. `i18n-ciudad-nombres.js` ya
     tiene las cuarenta y tres en los dieciséis idiomas, con la clave
     `cd_n_<slug>`. Reescribirlas aquí sería una segunda versión de lo
     mismo que mañana diverge.
     ═══════════════════════════════════════════════════════════════════ */
  var CIUDADES = [                       // de oeste a este, como el sol
    { slug: 'los-angeles',  zona: 'America/Los_Angeles', res: 'Los Angeles', pais: 'US' },
    { slug: 'nueva-york',   zona: 'America/New_York',    res: 'Nueva York',  pais: 'US' },
    { slug: 'sao-paulo',    zona: 'America/Sao_Paulo',   res: 'São Paulo',   pais: 'BR' },
    { slug: 'londres',      zona: 'Europe/London',       res: 'Londres',     pais: 'GB' },
    { slug: 'marbella',     zona: 'Europe/Madrid',       res: 'Marbella',    pais: 'ES' },
    { slug: 'dubai',        zona: 'Asia/Dubai',          res: 'Dubái',       pais: 'AE' },
    { slug: 'tokio',        zona: 'Asia/Tokyo',          res: 'Tokio',       pais: 'JP' }
  ];
  /* La rejilla lleva una más que la banda: ocho entra en cuatro columnas
     sin dejar una fila coja, y París es la que más se busca de las que
     faltaban. Cada tarjeta trae su foto en tres tamaños. */
  var CIUDADES_REJ = CIUDADES.slice(0, 5).concat([
    { slug: 'paris', zona: 'Europe/Paris', res: 'París', pais: 'FR' }
  ]).concat(CIUDADES.slice(5));
  var relojTic = null;

  function nombreCiudad(c) {
    try {
      if (window.BBL && BBL.ciudad) { var n = BBL.ciudad(c.slug); if (n) return n; }
      var k = t('cd_n_' + c.slug, '');
      if (k) return k;
    } catch (_) {}
    return c.res;
  }
  function nombrePais(iso) {
    try {
      var d = new Intl.DisplayNames([idioma()], { type: 'region' });
      return d.of(iso) || iso;
    } catch (_) { return iso; }
  }

  /* La hora de cada zona, y si ahí es de día. `Intl` lo sabe hacer sin
     tablas de husos ni una biblioteca de fechas: hay que pedirle las
     PARTES, no una cadena, porque el formato cambia con el idioma y de la
     cadena no se puede sacar la hora en número. */
  function horaEn(zona, lang) {
    try {
      var f = new Intl.DateTimeFormat(lang || 'es', {
        timeZone: zona, hour: '2-digit', minute: '2-digit', hour12: false
      });
      var p = f.formatToParts(new Date());
      var h = '', m = '';
      for (var i = 0; i < p.length; i++) {
        if (p[i].type === 'hour') h = p[i].value;
        if (p[i].type === 'minute') m = p[i].value;
      }
      // Medianoche sale como «24» en algunos motores con hour12:false.
      var n = parseInt(h, 10); if (n === 24) { n = 0; h = '00'; }
      return { txt: h + ':' + m, h: n };
    } catch (_) { return null; }
  }

  function pintarReloj() {
    var caja = $('reloj');
    if (!caja) return;
    var lang = idioma(), html = '';
    for (var i = 0; i < CIUDADES.length; i++) {
      var c = CIUDADES[i], r = horaEn(c.zona, lang);
      if (!r) continue;                       // sin `Intl`, esa columna no sale
      var dia = r.h >= 7 && r.h < 21;
      html += '<div class="reloj-c' + (dia ? ' dia' : '') + '">' +
                '<span class="ciu">' + esc(nombreCiudad(c)) + '</span>' +
                '<span class="hora">' + esc(r.txt) + '</span>' +
              '</div>';
    }
    // Si `Intl` no da ni una, no se deja el hueco: se quita la banda entera.
    var banda = caja.closest ? caja.closest('.hero-reloj') : caja.parentNode;
    if (!html) { if (banda) banda.style.display = 'none'; return; }
    if (banda) banda.style.display = '';
    caja.innerHTML = html;
  }

  function pintarCiudades() {
    /* `ciudadesRej`, no `ciudades`: el `id` de la SECCIÓN es `ciudades`
       —lo usa el ancla de la navegación— y tenerlos iguales hacía que
       `getElementById` devolviera la sección y las tarjetas se pintaran
       fuera de la cuadrícula, a 1.180 px de ancho cada una. La sección
       medía 14.609 px. No se ve leyendo: se ve midiendo. */
    var caja = $('ciudadesRej');
    if (!caja) return;
    var lang = idioma(), html = '';
    for (var i = 0; i < CIUDADES_REJ.length; i++) {
      var c = CIUDADES_REJ[i], r = horaEn(c.zona, lang), sl = esc(c.slug);
      var dia = r && r.h >= 7 && r.h < 21;
      /* La foto entra como `<img>` y no como fondo de CSS, y no es un
         capricho: un fondo no sabe de `srcset`, así que un móvil se
         bajaba exactamente la misma imagen que una pantalla de escritorio.
         Con `<picture>` cada quien se trae su tamaño, y sólo cuando se
         acerca a mirarla. El `alt` va vacío a propósito: el nombre de la
         ciudad está aquí al lado en texto, y repetirlo sólo sirve para
         que un lector de pantalla lo diga dos veces. */
      html += '<a class="ciu-c' + (dia ? ' dia' : '') + '" id="ciu-' + sl + '"' +
                ' href="ciudad-' + sl + '.html">' +
                '<picture>' +
                  '<source type="image/webp" sizes="(min-width:1000px) 23vw, (min-width:620px) 31vw, 46vw"' +
                    ' srcset="img/ciudad-' + sl + '-480.webp 480w, img/ciudad-' + sl + '-960.webp 960w" />' +
                  /* Todas perezosas, también las dos primeras: la sección de
                     ciudades está muy por debajo del pliegue, así que traerlas
                     con prisa es descargar dos fotos para quien quizá no baje
                     hasta aquí. Medido: de cuatro peticiones al entrar a dos. */
                  '<img class="ciu-f" src="img/ciudad-' + sl + '-720.jpg" alt=""' +
                    ' loading="lazy" decoding="async" width="480" height="640" />' +
                '</picture>' +
                '<span class="punto" aria-hidden="true"></span>' +
                '<span class="ciu-t">' +
                  '<span class="n">' + esc(nombreCiudad(c)) + '</span>' +
                  (r ? '<span class="h">' + esc(r.txt) + '</span>' : '') +
                  '<span class="p">' + esc(nombrePais(c.pais)) + '</span>' +
                '</span>' +
              '</a>';
    }
    caja.innerHTML = html;
  }

  function arrancarReloj() {
    pintarReloj();
    pintarCiudades();
    if (relojTic) clearInterval(relojTic);
    // Cada veinte segundos: un minuto de desfase en un reloj de portada no
    // lo nota nadie, y despertar la página cada segundo sí se nota en la
    // batería de un móvil.
    relojTic = setInterval(function () { pintarReloj(); pintarCiudades(); }, 20000);
  }

  /* ── Los días que faltan para abrir ───────────────────────────────
     No está escrito en el HTML: se cuenta. Un número escrito a mano en una
     página de empleo es la primera cifra que se queda vieja. */
  function diasQueFaltan() {
    var apertura = Date.UTC(2027, 0, 1);
    var hoy = new Date();
    var d = Math.ceil((apertura - Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), hoy.getUTCDate())) / 86400000);
    return d > 0 ? d : 0;
  }
  function pintarDias() {
    var e = $('cfDias');
    if (!e) return;
    e.setAttribute('data-cuenta', String(diasQueFaltan()));
    ponerCifra(e, diasQueFaltan());
  }
  function ponerCifra(e, n) {
    try { e.textContent = new Intl.NumberFormat(idioma()).format(n); }
    catch (_) { e.textContent = String(n); }
  }

  /* ── Cómo trabajamos · sale del administrador ─────────────────────
     Seis apartados sembrados con su rótulo en los dieciséis idiomas y el
     cuerpo vacío: el rótulo es una etiqueta y lo pusimos nosotros, el
     cuerpo es un hecho sobre la empresa y lo escribe Andrés. Mientras no
     estén publicados, `condiciones_publicas` devuelve una lista vacía y
     aquí NO se pinta un texto de relleno: se dice qué falta. */
  function cargarCondiciones() {
    var caja = $('cond');
    if (!caja) return;
    var sb = cliente();
    if (!sb) { condVacio(caja); return; }
    var mia = ++estado.vueltaCond;
    sb.rpc('condiciones_publicas', { p_idioma: idioma() }).then(function (r) {
      if (mia !== estado.vueltaCond) return;
      var l = (r && !r.error && Array.isArray(r.data)) ? r.data : [];
      if (!l.length) { condVacio(caja); return; }
      var html = '';
      l.forEach(function (c) {
        if (!c || !c.texto) return;
        html += '<div class="cond-i"><h3>' + esc(c.titulo || '') + '</h3>' +
                '<p>' + esc(c.texto) + '</p></div>';
      });
      if (!html) { condVacio(caja); return; }
      caja.innerHTML = html;
      caja.classList.remove('cond-uno');
    });
  }

  function condVacio(caja) {
    caja.classList.add('cond-uno');
    caja.innerHTML = '<div class="emp-aviso" style="margin-top:32px"><p>' +
      esc(t('ep_cond_vacio',
        'Estamos escribiendo estas condiciones y no vamos a publicar un texto de relleno mientras tanto. Cuando estén, aparecen aquí en los dieciséis idiomas. Si te presentas antes, te las mandamos por escrito en la primera conversación.')) +
      '</p></div>';
  }

  /* ── Leer la lista ────────────────────────────────────────────── */
  function cargar() {
    var sb = cliente(), caja = $('vacantes');
    if (!caja) return;
    estado.fallo = false;
    caja.innerHTML = '<p class="emp-cargando">' + esc(t('ep_cargando', 'Cargando los puestos…')) + '</p>';
    if (!sb) { estado.fallo = true; pintar(); return; }

    /* `cargar()` se llama al arrancar y otra vez con `bbl:lang`, que llega
       cuando el diccionario ya está. Dos peticiones en vuelo y la primera
       puede contestar la última: sin este número de vuelta, la página se
       quedaría con la lista del idioma viejo. */
    var mia = ++estado.vuelta;
    sb.rpc('vacantes_publicas', { p_idioma: idioma() }).then(function (r) {
      if (mia !== estado.vuelta) return;
      if (r && r.error) { estado.fallo = true; estado.lista = null; }
      else { estado.lista = Array.isArray(r && r.data) ? r.data : []; estado.fallo = false; }
      pintar();
      pintarSelector();
      pintarAreasAviso();
      pintarCifra();
      abrirDeLaDireccion();
    });
  }

  function pintarCifra() {
    var c = $('cfPuestos');
    if (!c) return;
    var n = estado.fallo || !estado.lista ? null : estado.lista.length;
    if (n == null) { c.textContent = '—'; c.setAttribute('data-cuenta', '0'); return; }
    c.setAttribute('data-cuenta', String(n));
    ponerCifra(c, n);
  }

  /* ── Filtrar ───────────────────────────────────────────────────────
     Tres facetas: texto, área y modalidad. Los contadores de cada botón se
     calculan con las OTRAS facetas puestas —no sobre la lista entera—
     porque un botón que promete cuatro y da cero miente. */
  function normaliza(s) {
    s = String(s == null ? '' : s).toLowerCase();
    try { s = s.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (_) {}
    return s;
  }
  function casaTexto(v, q) {
    if (!q) return true;
    var heno = normaliza([v.titulo, v.resumen, v.departamento, v.ciudad].join(' '));
    var agujas = normaliza(q).split(/\s+/).filter(Boolean);
    for (var i = 0; i < agujas.length; i++) if (heno.indexOf(agujas[i]) === -1) return false;
    return true;
  }
  function filtrar(op) {
    op = op || {};
    var q = op.texto != null ? op.texto : estado.texto;
    var area = op.area != null ? op.area : estado.filtro;
    var modo = op.modo != null ? op.modo : estado.modo;
    return (estado.lista || []).filter(function (v) {
      if (area && v.departamento !== area) return false;
      if (modo && v.modalidad !== modo) return false;
      return casaTexto(v, q);
    });
  }

  function pintarFiltros() {
    var caja = $('filtros'), cajaM = $('filtrosModo');
    if (!caja || !cajaM) return;
    var lista = estado.lista || [];
    if (!lista.length) { caja.innerHTML = ''; cajaM.innerHTML = ''; return; }

    var deps = [], modos = [];
    lista.forEach(function (v) {
      if (v.departamento && deps.indexOf(v.departamento) === -1) deps.push(v.departamento);
      if (v.modalidad && modos.indexOf(v.modalidad) === -1) modos.push(v.modalidad);
    });

    caja.innerHTML = deps.length < 2 ? '' : boton('dep', '', t('ep_f_todas', 'Todas'),
        filtrar({ area: '' }).length, estado.filtro === '') +
      deps.map(function (d) {
        return boton('dep', d, d, filtrar({ area: d }).length, estado.filtro === d);
      }).join('');

    cajaM.innerHTML = modos.length < 2 ? '' : boton('modo', '', t('ep_m_todas', 'Cualquier modalidad'),
        filtrar({ modo: '' }).length, estado.modo === '') +
      modos.map(function (m) {
        return boton('modo', m, etiqueta(MODALIDAD, m), filtrar({ modo: m }).length, estado.modo === m);
      }).join('');

    var lim = $('limpiar');
    if (lim) lim.hidden = !(estado.texto || estado.filtro || estado.modo);
  }
  function boton(tipo, valor, rotulo, n, puesto) {
    return '<button type="button" data-' + tipo + '="' + esc(valor) + '" aria-pressed="' + puesto + '">' +
      esc(rotulo) + '<i>' + n + '</i></button>';
  }

  function pintarCuenta(n) {
    var e = $('cuentaRes');
    if (!e) return;
    if (estado.fallo || !estado.lista) { e.textContent = ''; return; }
    var txt = n === 0 ? t('ep_res_0', 'Ningún puesto')
            : n === 1 ? t('ep_res_1', '1 puesto')
                      : t('ep_res_n', '{n} puestos').replace('{n}', String(n));
    e.textContent = txt;
  }

  /* ── La lista ─────────────────────────────────────────────────── */
  function pintar() {
    var caja = $('vacantes');
    if (!caja) return;
    pintarFiltros();

    if (estado.fallo) {
      caja.innerHTML =
        '<div class="emp-fallo"><p>' + esc(t('ep_fallo', 'No hemos podido cargar los puestos ahora mismo. No significa que no haya ninguno: significa que no hemos podido preguntarlo.')) +
        '</p><button type="button" id="reintentar">' + esc(t('ep_reintentar', 'Reintentar')) + '</button></div>';
      var b = $('reintentar');
      if (b) b.addEventListener('click', cargar);
      pintarCuenta(0);
      return;
    }

    var lista = filtrar();
    pintarCuenta(lista.length);

    if (lista.length === 0) {
      /* Una lista vacía era un renglón gris. Es la pantalla que más gente
         va a ver —hoy no hay ni un puesto publicado— así que es la que
         tiene que trabajar más: dice que está vacía, dice que eso no
         significa que no se contrate, y ofrece la salida. */
      if (estado.filtro || estado.modo || estado.texto) {
        caja.innerHTML = '<div class="emp-vacio"><p style="margin:0 auto 18px">' +
          esc(t('ep_vacio_filtro', 'Ningún puesto abierto con esos filtros ahora mismo. Quítalos, o pídenos que te avisemos cuando abramos uno.')) +
          '</p><a class="ir" href="#avisarme">' + esc(t('ep_vacio_avisar', 'Que me avisen')) + '</a></div>';
      } else {
        caja.innerHTML =
          '<div class="emp-vacio">' +
            '<h3>' + esc(t('ep_vacio_t', 'Ahora mismo no hay ningún puesto publicado')) + '</h3>' +
            '<p>' + esc(t('ep_vacio_p', 'No es una forma elegante de decir que no contratamos: es que hoy la lista está vacía. Preséntate igualmente y dinos qué sabes hacer. Las candidaturas espontáneas se leen, y cuando abrimos un puesto escribimos primero a quien ya encaja.')) + '</p>' +
            '<a class="ir" href="#presentarme" data-presentarme="">' + esc(t('ep_vacio_cta', 'Presentar candidatura espontánea')) + '</a>' +
          '</div>';
      }
      return;
    }

    var html = '';
    lista.forEach(function (v) {
      var id = 'vac-' + esc(v.codigo), meta = [];
      /* El orden importa: primero la modalidad, porque «remoto» es el
         argumento de esta página; la ciudad sólo si el puesto NO es
         remoto, que es la excepción y no la regla desde el bloque 49.1. */
      meta.push(esc(etiqueta(MODALIDAD, v.modalidad)));
      if (v.ciudad && v.modalidad !== 'remoto') meta.push(esc(v.ciudad));
      meta.push(esc(etiqueta(JORNADA, v.jornada)));
      if (v.departamento) meta.push(esc(v.departamento));

      html +=
        '<article class="vac-i" id="p-' + esc(v.codigo) + '">' +
          '<button type="button" aria-expanded="false" aria-controls="' + id + '" data-codigo="' + esc(v.codigo) + '">' +
            '<span style="min-width:0">' +
              '<span class="tit">' + esc(v.titulo || v.codigo) + '</span>' +
              (v.resumen ? '<span class="res">' + esc(v.resumen) + '</span>' : '') +
            '</span>' +
            '<span class="meta">' + meta.map(function (m) { return '<span>' + m + '</span>'; }).join('') + '</span>' +
          '</button>' +
          '<div class="detalle" id="' + id + '"></div>' +
        '</article>';
    });
    caja.innerHTML = html;
  }

  /* ── La ficha entera, sólo cuando se abre ─────────────────────── */
  function abrir(boton, sinMover) {
    var codigo = boton.getAttribute('data-codigo');
    var art = boton.parentNode;
    var det = art.querySelector('.detalle');
    var abierto = boton.getAttribute('aria-expanded') === 'true';

    if (abierto) {
      boton.setAttribute('aria-expanded', 'false');
      det.classList.remove('visible');
      estado.abierta = null;
      direccion();
      return;
    }
    boton.setAttribute('aria-expanded', 'true');
    det.classList.add('visible');
    estado.abierta = codigo;
    direccion();
    if (!sinMover) {
      try { art.scrollIntoView({ behavior: quieto() ? 'auto' : 'smooth', block: 'nearest' }); } catch (_) {}
    }

    var cache = estado.fichas[codigo + '|' + idioma()];
    if (cache) { pintarFicha(det, codigo, cache); return; }

    det.innerHTML = '<div><p class="emp-cargando">' + esc(t('ep_cargando_ficha', 'Cargando la descripción…')) + '</p></div>';
    var sb = cliente();
    if (!sb) { det.innerHTML = '<div><p class="emp-cargando">' + esc(t('ep_fallo_ficha', 'No hemos podido cargar la descripción.')) + '</p></div>'; return; }

    sb.rpc('vacante_publica', { p_codigo: codigo, p_idioma: idioma() }).then(function (r) {
      var d = r && r.data;
      if ((r && r.error) || !d || d.error) {
        det.innerHTML = '<div><p class="emp-cargando">' + esc(t('ep_fallo_ficha', 'No hemos podido cargar la descripción.')) + '</p></div>';
        return;
      }
      estado.fichas[codigo + '|' + idioma()] = d;
      pintarFicha(det, codigo, d);
    });
  }

  function pintarFicha(det, codigo, d) {
    var html = '<div>';
    if (d.descripcion) html += '<h4>' + esc(t('ep_d_descripcion', 'El trabajo')) + '</h4><p>' + esc(d.descripcion) + '</p>';
    if (d.requisitos) html += '<h4>' + esc(t('ep_d_requisitos', 'Lo que pedimos')) + '</h4><p>' + esc(d.requisitos) + '</p>';
    html += '<div class="acciones">' +
      '<button type="button" class="ir" data-presentarme="' + esc(codigo) + '">' +
        esc(t('ep_d_presentarme', 'Presentarme a este puesto')) + '</button>' +
      '<button type="button" class="compartir" data-compartir="' + esc(codigo) + '">' +
        esc(t('ep_compartir', 'Copiar el enlace')) + '</button>' +
      '</div></div>';
    det.innerHTML = html;
  }

  /* ── El estado en la dirección ─────────────────────────────────────
     `replaceState`, no `pushState`: si cada letra escrita en el buscador
     dejara una entrada en el historial, el botón de atrás del navegador
     tendría que pulsarse treinta veces para salir de esta página. */
  function direccion() {
    try {
      var p = new URLSearchParams();
      if (estado.texto) p.set('q', estado.texto);
      if (estado.filtro) p.set('area', estado.filtro);
      if (estado.modo) p.set('m', estado.modo);
      if (estado.abierta) p.set('p', estado.abierta);
      var s = p.toString();
      history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + (estado.abierta ? '#puestos' : ''));
    } catch (_) {}
  }
  function leerDireccion() {
    try {
      var p = new URLSearchParams(location.search);
      estado.texto = p.get('q') || '';
      estado.filtro = p.get('area') || '';
      estado.modo = p.get('m') || '';
      estado.abierta = p.get('p') || null;
      var c1 = $('q'), c2 = $('qHero');
      if (c1) c1.value = estado.texto;
      if (c2) c2.value = estado.texto;
    } catch (_) {}
  }
  /* Un enlace a un puesto concreto tiene que ABRIRLO, no dejar a quien
     llega delante de una lista con el puesto cerrado en algún sitio. */
  function abrirDeLaDireccion() {
    if (!estado.abierta) return;
    var art = document.getElementById('p-' + estado.abierta);
    if (!art) { estado.abierta = null; return; }
    var b = art.querySelector('button[data-codigo]');
    if (!b || b.getAttribute('aria-expanded') === 'true') return;
    abrir(b, true);
    setTimeout(function () {
      try { art.scrollIntoView({ behavior: quieto() ? 'auto' : 'smooth', block: 'center' }); } catch (_) {}
    }, 120);
  }

  function copiarEnlace(codigo, boton) {
    var url = location.origin + location.pathname + '?p=' + encodeURIComponent(codigo);
    var listo = function () {
      var antes = boton.textContent;
      boton.textContent = t('ep_compartido', 'Enlace copiado');
      setTimeout(function () { boton.textContent = antes; }, 2200);
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(listo, function () { pedirACano(url, boton); });
        return;
      }
    } catch (_) {}
    pedirACano(url, boton);
  }
  /* Sin portapapeles —contexto no seguro, o permiso denegado— no se deja
     el botón muerto: se enseña el enlace para copiarlo a mano. */
  function pedirACano(url, boton) {
    boton.textContent = url;
    try {
      var r = document.createRange(); r.selectNodeContents(boton);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    } catch (_) {}
  }

  /* ── El selector del formulario y el del aviso ─────────────────── */
  function pintarSelector() {
    var sel = $('cPuesto');
    if (!sel) return;
    var antes = sel.value;
    var html = '<option value="">' + esc(t('ep_f_espontanea', 'Candidatura espontánea')) + '</option>';
    (estado.lista || []).forEach(function (v) {
      html += '<option value="' + esc(v.codigo) + '">' + esc(v.titulo || v.codigo) + '</option>';
    });
    sel.innerHTML = html;
    if (antes) sel.value = antes;
  }
  /* Las cuatro áreas del aviso son las de la página, no las de la lista:
     si hoy no hay ni un puesto publicado, un selector sacado de la lista
     estaría vacío justo cuando más falta hace. */
  var AREAS_AVISO = [
    ['producto',     'ep_a1_t', 'Producto y tecnología'],
    ['atencion',     'ep_a2_t', 'Atención en dieciséis idiomas'],
    ['cumplimiento', 'ep_a3_t', 'Cumplimiento y pagos'],
    ['crecimiento',  'ep_a4_t', 'Crecimiento y contenido']
  ];
  function pintarAreasAviso() {
    var sel = $('avArea');
    if (!sel) return;
    var antes = sel.value;
    var html = '<option value="">' + esc(t('ep_al_cualquiera', 'Cualquier área')) + '</option>';
    AREAS_AVISO.forEach(function (a) {
      html += '<option value="' + a[0] + '">' + esc(t(a[1], a[2])) + '</option>';
    });
    sel.innerHTML = html;
    if (antes) sel.value = antes;
  }

  function presentarme(codigo) {
    var sel = $('cPuesto');
    if (sel) sel.value = codigo || '';
    var destino = $('presentarme');
    if (destino) destino.scrollIntoView({ behavior: quieto() ? 'auto' : 'smooth', block: 'start' });
    var n = $('cNombre');
    if (n) setTimeout(function () { try { n.focus({ preventScroll: true }); } catch (_) { n.focus(); } }, quieto() ? 0 : 520);
  }

  /* ── Enviar la candidatura ────────────────────────────────────── */
  function decir(txt, clase) {
    var e = $('cEstado');
    if (!e) return;
    e.textContent = txt;
    e.className = 'estado' + (clase ? ' ' + clase : '');
  }
  function razon(error) {
    if (error === 'faltan_datos')          return t('ep_e_faltan', 'Necesitamos al menos tu nombre y tu correo.');
    if (error === 'correo_invalido')       return t('ep_e_correo', 'Ese correo no parece correcto. Revísalo y vuelve a enviarlo.');
    if (error === 'vacante_no_disponible') return t('ep_e_cerrada', 'Ese puesto se ha cerrado mientras rellenabas. Vuelve a elegir arriba.');
    if (error === 'demasiadas_hoy')        return t('ep_e_demasiadas', 'Ya hemos recibido tres candidaturas con este correo hoy. Escríbenos si necesitas mandar otra.');
    return t('ep_e_general', 'No hemos podido enviarla. Inténtalo otra vez en un momento.');
  }

  function enviar(ev) {
    ev.preventDefault();
    var boton = $('cEnviar'), sb = cliente();
    var fichero = ($('cCv') && $('cCv').files && $('cCv').files[0]) || null;

    var nombre = ($('cNombre').value || '').trim();
    var email = ($('cEmail').value || '').trim();
    if (!nombre || !email) { decir(razon('faltan_datos'), 'mal'); return; }
    if (!/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(email)) { decir(razon('correo_invalido'), 'mal'); return; }

    if (fichero) {
      if (!TIPOS[fichero.type]) { decir(t('ep_e_tipo', 'El currículum tiene que ser PDF, DOC o DOCX.'), 'mal'); return; }
      if (fichero.size > MAX_BYTES) { decir(t('ep_e_grande', 'El currículum pasa de 5 MB.'), 'mal'); return; }
    }
    if (!sb) { decir(razon(''), 'mal'); return; }

    boton.disabled = true;
    decir(t('ep_enviando', 'Enviando…'), '');

    var cuerpo = {
      vacante: ($('cPuesto') && $('cPuesto').value) || null,
      nombre: nombre, email: email,
      telefono: ($('cTel').value || '').trim() || null,
      enlace: ($('cEnlace').value || '').trim() || null,
      mensaje: ($('cMensaje').value || '').trim() || null,
      idioma: idioma()
    };
    if (fichero) cuerpo.cv = { nombre: fichero.name, tipo: fichero.type, bytes: fichero.size };

    sb.functions.invoke('candidatura', { body: cuerpo }).then(function (r) {
      var d = r && r.data;
      if ((r && r.error) || !d || !d.ok) {
        boton.disabled = false;
        decir(razon(d && d.error), 'mal');
        return;
      }
      if (!fichero || !d.cv || !d.cv.ok) {
        // La candidatura está guardada. Si el currículum no ha podido ir,
        // se dice — no se calla ni se da por enviado.
        terminar(d.cv && !d.cv.ok
          ? t('ep_ok_sin_cv', 'Candidatura recibida, pero el currículum no se ha podido adjuntar. Puedes mandárnoslo por correo.')
          : t('ep_ok', 'Recibida. Te contestamos, tanto si seguimos adelante como si no.'));
        return;
      }
      decir(t('ep_subiendo', 'Subiendo el currículum…'), '');
      sb.storage.from('cv').uploadToSignedUrl(d.cv.ruta, d.cv.token, fichero).then(function (s) {
        if (s && s.error) {
          terminar(t('ep_ok_sin_cv', 'Candidatura recibida, pero el currículum no se ha podido adjuntar. Puedes mandárnoslo por correo.'));
          return;
        }
        sb.functions.invoke('candidatura', { body: { confirmar: d.id, ruta: d.cv.ruta } })
          .then(function () {
            terminar(t('ep_ok_cv', 'Recibida, con tu currículum. Te contestamos, tanto si seguimos adelante como si no.'));
          });
      });
    });

    function terminar(txt) {
      decir(txt, 'bien');
      var f = $('fCandidatura');
      if (f) f.reset();
      pintarSelector();
      var nota = $('cCvNota');
      if (nota) nota.textContent = t('ep_f_cv_nota', 'PDF, DOC o DOCX. Hasta 5 MB. Opcional, pero ayuda.');
      // El botón NO vuelve a habilitarse: mandarla dos veces no ayuda a
      // nadie, y el freno de la base son tres por correo y día.
    }
  }

  /* ── El aviso de vacantes ─────────────────────────────────────── */
  function avisar(ev) {
    ev.preventDefault();
    var b = $('avEnviar'), e = $('avEstado'), sb = cliente();
    function di(txt, clase) { if (e) { e.textContent = txt; e.className = 'estado' + (clase ? ' ' + clase : ''); } }

    var email = (($('avEmail') && $('avEmail').value) || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(email)) { di(t('ep_e_correo', 'Ese correo no parece correcto. Revísalo y vuelve a enviarlo.'), 'mal'); return; }
    if (!sb) { di(t('ep_al_error', 'No hemos podido guardarlo ahora mismo. Inténtalo en un momento.'), 'mal'); return; }

    b.disabled = true;
    di(t('ep_enviando', 'Enviando…'), '');
    sb.rpc('aviso_vacante_alta', {
      p_email: email,
      p_area: (($('avArea') && $('avArea').value) || null) || null,
      p_idioma: idioma()
    }).then(function (r) {
      var d = r && r.data;
      if ((r && r.error) || !d || !d.ok) {
        b.disabled = false;
        di(d && d.error === 'ya_estaba'
          ? t('ep_al_ya', 'Ese correo ya estaba apuntado. No lo apuntamos dos veces.')
          : t('ep_al_error', 'No hemos podido guardarlo ahora mismo. Inténtalo en un momento.'),
          d && d.error === 'ya_estaba' ? '' : 'mal');
        return;
      }
      di(t('ep_al_ok', 'Apuntado. Te escribimos el día que se publique un puesto de esa área, y nada más.'), 'bien');
      var f = $('fAviso'); if (f) f.reset();
      pintarAreasAviso();
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     EL SISTEMA DE MOVIMIENTO

     Lo primero: `.js` al `<body>`. El CSS sólo esconde lo que va a
     revelar si esta línea llegó a ejecutarse.
     ═══════════════════════════════════════════════════════════════════ */
  function movimiento() {
    document.body.classList.add('js');
    if (quieto() || !('IntersectionObserver' in window)) {
      // Sin observador —o con movimiento reducido— se enseña todo de
      // golpe. Nunca se deja nada escondido.
      [].forEach.call(document.querySelectorAll('.rv'), function (e) { e.classList.add('visto'); });
      [].forEach.call(document.querySelectorAll('.paso-e'), function (e) { e.classList.add('visto'); });
      contarTodo();
      return;
    }
    var obs = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) {
        if (!f.isIntersecting) return;
        f.target.classList.add('visto');
        if (f.target.hasAttribute('data-cuenta')) contar(f.target);
        obs.unobserve(f.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    [].forEach.call(document.querySelectorAll('.rv,.paso-e,[data-cuenta]'), function (e) { obs.observe(e); });
  }

  /* Las cifras cuentan al entrar en pantalla. Con `—` no se cuenta nada:
     un guion que se convierte en 0 y luego en el número de verdad parece
     que hubiera cero puestos durante medio segundo. */
  function contar(e) {
    var fin = parseInt(e.getAttribute('data-cuenta') || '0', 10);
    if (!fin || e.textContent === '—') return;
    var t0 = 0, dur = 900;
    function paso(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      ponerCifra(e, Math.round(fin * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }
  function contarTodo() {
    [].forEach.call(document.querySelectorAll('[data-cuenta]'), function (e) {
      var n = parseInt(e.getAttribute('data-cuenta') || '0', 10);
      if (n && e.textContent !== '—') ponerCifra(e, n);
    });
  }

  /* La cabecera y el vídeo, en un solo oyente de scroll con
     `requestAnimationFrame`: dos oyentes sueltos hacen dos veces el
     trabajo en cada píxel de recorrido. */
  function scrollear() {
    var cab = $('cab'), hero = $('portada'), video = $('heroVideo');
    var pedido = false;
    function mirar() {
      pedido = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (cab) cab.classList.toggle('pegada', y > 40);
      if (video && hero && !quieto()) {
        var alto = hero.offsetHeight || 1;
        if (y < alto) hero.style.setProperty('--par', Math.round(y * 0.28) + 'px');
      }
    }
    window.addEventListener('scroll', function () {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(mirar);
    }, { passive: true });
    mirar();
  }

  /* El apartado en el que estás, marcado en la navegación. */
  function navegacion() {
    if (!('IntersectionObserver' in window)) return;
    var enlaces = [].slice.call(document.querySelectorAll('.emp-nav a[href^="#"]'));
    if (!enlaces.length) return;
    var porId = {};
    enlaces.forEach(function (a) { porId[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) {
        var a = porId[f.target.id];
        if (!a) return;
        if (f.isIntersecting) {
          enlaces.forEach(function (x) { x.classList.remove('activo'); });
          a.classList.add('activo');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(porId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) obs.observe(s);
    });
  }

  /* El vídeo: la portada nace con `.sin-video` y sólo se la quita cuando
     el navegador dice que puede reproducirlo. Al revés se vería un
     rectángulo negro el tiempo que tarde en fallar. */
  function video() {
    var v = $('heroVideo'), hero = $('portada');
    if (!v || !hero) return;
    if (quieto()) return;                   // con movimiento reducido, ni se pide
    var puesto = false;
    function vale() {
      if (puesto) return;
      puesto = true;
      hero.classList.remove('sin-video');
      var p = v.play();
      if (p && p.catch) p.catch(function () { hero.classList.add('sin-video'); });
    }
    v.addEventListener('loadeddata', vale);
    v.addEventListener('canplay', vale);
    v.addEventListener('error', function () { hero.classList.add('sin-video'); });
    // `<source>` con un fichero que no existe no dispara `error` en el
    // vídeo en todos los navegadores: se mira también el estado.
    try { v.load(); } catch (_) {}
    setTimeout(function () { if (!puesto && v.readyState < 2) hero.classList.add('sin-video'); }, 2500);
  }

  /* `data-i18n-al` no lo conoce `i18n.js` —que lo cargan sesenta y cinco
     páginas— así que se resuelve aquí en vez de tocar el motor común por
     dos etiquetas. */
  function etiquetasAria() {
    [].forEach.call(document.querySelectorAll('[data-i18n-al]'), function (e) {
      var v = t(e.getAttribute('data-i18n-al'), '');
      if (v) e.setAttribute('aria-label', v);
    });
  }

  /* ── Enganches ────────────────────────────────────────────────── */
  /* ═══════════════════════════════════════════════════════════════════
     LA PORTADA DE CIUDADES  ·  bloque 49.6

     Ocho fotos que se suceden detrás del titular, con un acercamiento
     lento. No es un carrusel: no hay flechas, no hay puntos, no se puede
     parar. Es un fondo.

     Tres cosas que la sostienen cuando algo falla:

     1. La primera foto se pide con `fetchpriority=high` y las demás no
        se piden hasta que les toca. Entrar en la página descarga UNA
        foto, no ocho.
     2. Si una no llega, se salta y se sigue. Una portada no se queda en
        negro porque falte un fichero.
     3. Con movimiento reducido no se sucede nada: se queda la primera y
        ya está. Y sin JavaScript el CSS ya pinta la primera de fondo.
     ═══════════════════════════════════════════════════════════════════ */
  var PORTADA = ['marbella', 'nueva-york', 'tokio', 'dubai',
                 'londres', 'los-angeles', 'paris', 'sao-paulo'];
  var portadaTic = null, portadaActual = null;

  function zonaDe(slug) {
    for (var i = 0; i < CIUDADES_REJ.length; i++)
      if (CIUDADES_REJ[i].slug === slug) return CIUDADES_REJ[i];
    return null;
  }

  /* El rótulo de la portada vive fuera de `portada()` porque hay que
     poder repintarlo desde otros sitios: al cambiar de idioma cambia el
     nombre de la ciudad y el formato de la hora, y al volver a la pestaña
     la hora lleva minutos parada. */
  function rotuloPortada() {
    var et = $('heroCiudad');
    if (!et || !portadaActual) return;
    var c = zonaDe(portadaActual);
    if (!c) return;
    var r = horaEn(c.zona, idioma());
    et.innerHTML = '<span class="n">' + esc(nombreCiudad(c)) + '</span>' +
                   (r ? '<span class="h">' + esc(r.txt) + '</span>' : '');
  }

  function portada() {
    var caja = $('heroFotos');
    if (!caja) return;

    var capas = [], i;
    for (i = 0; i < PORTADA.length; i++) {
      var d = document.createElement('div');
      d.className = 'hero-foto';
      d.setAttribute('aria-hidden', 'true');
      caja.appendChild(d);
      capas.push({ el: d, slug: PORTADA[i], puesta: false, rota: false });
    }

    /* Pide la foto de verdad y sólo la pone cuando ha llegado. Así una
       que falle no deja un hueco negro a mitad de la sucesión: se marca
       `rota` y el turno pasa de largo. */
    function traer(c, prioridad) {
      if (c.puesta || c.rota) return;
      var im = new Image();
      im.decoding = 'async';
      if (prioridad) { try { im.fetchPriority = 'high'; } catch (_) {} }
      im.onload = function () {
        c.puesta = true;
        c.el.style.backgroundImage = 'url(img/ciudad-' + c.slug + '-960.webp)';
      };
      im.onerror = function () { c.rota = true; };
      im.src = 'img/ciudad-' + c.slug + '-960.webp';
    }

    var n = 0;
    function poner(k) {
      for (var j = 0; j < capas.length; j++) capas[j].el.classList.toggle('visible', j === k);
      portadaActual = capas[k].slug;
      rotuloPortada();
    }

    traer(capas[0], true);
    poner(0);
    var hero = $('portada');
    if (hero) hero.classList.remove('sin-fotos');

    if (quieto() || capas.length < 2) return;   // sin movimiento, una y basta

    traer(capas[1]);
    portadaTic = setInterval(function () {
      if (document.hidden) return;              // en segundo plano no se gasta
      var intentos = 0, k = n;
      do { k = (k + 1) % capas.length; intentos++; }
      while (capas[k].rota && intentos < capas.length);
      if (capas[k].rota) return;                // todas rotas: se deja la que hay
      n = k;
      poner(n);
      traer(capas[(n + 1) % capas.length]);     // la siguiente, con tiempo
    }, 6200);
  }

  /* ═══════════════════════════════════════════════════════════════════
     EL GLOBO  ·  bloque 49.6

     No es el globo de Uber con otros colores. Ahí el globo es un adorno
     con chinchetas; aquí dibuja EL DATO que esta página lleva contando
     desde la portada: dónde es de día ahora mismo.

     La esfera son puntos, no un mapa. Un mapa de costas obligaría a
     traerse la geometría del mundo —decenas de kilobytes— para decir
     algo que no viene al caso: Babyloon no abre en países, abre en
     ciudades. Los puntos dicen «esfera» sin afirmar fronteras.

     El brillo de cada punto sale de la posición real del sol:

         declinación δ  del día del año
         longitud subsolar  λs = (12 − hora UTC) × 15
         luz = sin δ · sin φ  +  cos δ · cos φ · cos(λ − λs)

     `luz > 0` es de día. La frontera entre claro y oscuro que se ve
     cruzando la esfera es el terminador de verdad, el mismo que separa
     el día de la noche ahí fuera mientras se lee esto.

     Degrada en tres escalones:
       · sin canvas          → el lienzo se quita y quedan las tarjetas
       · movimiento reducido → se dibuja una vez y no gira
       · pestaña de fondo    → se para el bucle
     ═══════════════════════════════════════════════════════════════════ */
  var COORD = {
    'los-angeles': [34.05, -118.24], 'nueva-york': [40.71, -74.01],
    'sao-paulo':   [-23.55, -46.63], 'londres':    [51.51,  -0.13],
    'marbella':    [36.51,   -4.89], 'paris':      [48.86,   2.35],
    'dubai':       [25.20,   55.27], 'tokio':      [35.68, 139.69]
  };
  var RAD = Math.PI / 180;
  var globoEstado = { ra: 0, giro: 0, parado: false, ultima: 0, sobre: null, lienzo: null };

  /* Dónde está el sol, ahora. Fórmula de declinación con el error de un
     cuarto de grado: para pintar una sombra de trescientos píxeles sobra,
     y ahorra traerse efemérides. */
  function sol() {
    var hoy = new Date();
    var ini = Date.UTC(hoy.getUTCFullYear(), 0, 0);
    var dia = (Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), hoy.getUTCDate()) - ini) / 86400000;
    var dec = -23.44 * Math.cos(RAD * (360 / 365) * (dia + 10));
    var utc = hoy.getUTCHours() + hoy.getUTCMinutes() / 60 + hoy.getUTCSeconds() / 3600;
    return { dec: dec * RAD, lon: (12 - utc) * 15 * RAD };
  }

  /* Proyección ortográfica: la Tierra como se ve de lejos. Devuelve la
     posición en el lienzo y `z`, que es lo cerca que está de mirarnos de
     frente. `z <= 0` es la cara de atrás y no se dibuja. */
  function proyectar(latG, lonG, giro, lat0, R) {
    var f = latG * RAD, l = (lonG + giro) * RAD, f0 = lat0 * RAD;
    var cf = Math.cos(f), sf = Math.sin(f), cl = Math.cos(l), sl = Math.sin(l);
    var z = Math.sin(f0) * sf + Math.cos(f0) * cf * cl;
    return { x: R * cf * sl,
             y: -R * (Math.cos(f0) * sf - Math.sin(f0) * cf * cl),
             z: z };
  }

  function luzEn(latG, lonG, s) {
    var f = latG * RAD, l = lonG * RAD;
    return Math.sin(s.dec) * Math.sin(f) + Math.cos(s.dec) * Math.cos(f) * Math.cos(l - s.lon);
  }

  function dibujarGlobo() {
    var g = globoEstado, cv = g.lienzo;
    if (!cv) return;
    var ctx = g.ctx, R = g.R, cx = g.cx, cy = g.cy, s = sol(), lat0 = 16;

    ctx.clearRect(0, 0, g.w, g.h);

    /* el cuerpo de la esfera: casi negro, con una luz rasante que es lo
       único que la hace parecer redonda. Suave a propósito — con más
       contraste se leía como una mancha de grasa en mitad del globo */
    var gr = ctx.createRadialGradient(cx - R * 0.42, cy - R * 0.46, R * 0.04, cx, cy, R * 1.05);
    gr.addColorStop(0, 'rgba(34,30,28,.92)');
    gr.addColorStop(0.55, 'rgba(19,17,21,.93)');
    gr.addColorStop(1, 'rgba(9,8,11,.97)');
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fillStyle = gr; ctx.fill();

    /* la retícula de puntos. El paso en longitud se abre según se sube en
       latitud —si no, los puntos se amontonan en los polos y la esfera
       parece un ovillo— */
    for (var lat = -84; lat <= 84; lat += 4) {
      var paso = 4 / Math.max(0.17, Math.cos(lat * RAD));
      for (var lon = -180; lon < 180; lon += paso) {
        var p = proyectar(lat, lon, g.giro, lat0, R);
        if (p.z <= 0.02) continue;
        var luz = luzEn(lat, lon, s);
        /* del día a la noche sin escalón: el terminador se ve como un
           degradado de unos pocos grados, que es como se ve de verdad */
        var d = Math.max(0, Math.min(1, (luz + 0.14) / 0.28));
        /* El suelo de la noche NO puede ser casi cero. Con 0,04 de opacidad
           la cara oscura desaparecía y la esfera se leía como una astilla
           de luna: a medianoche en Europa el sol está sobre el Pacífico, o
           sea que lo que mira de frente es de noche casi siempre. La noche
           es media página y tiene que verse; el contraste con el día es lo
           que dibuja el terminador, no la ausencia de noche. */
        var a = (0.17 + 0.62 * d) * Math.min(1, p.z * 2.4);
        if (a < 0.02) continue;
        ctx.fillStyle = d > 0.5
          ? 'rgba(206,176,116,' + a.toFixed(3) + ')'
          : 'rgba(126,122,146,' + (a * 0.88).toFixed(3) + ')';
        var t = 1 + p.z * 0.7;
        ctx.fillRect(cx + p.x - t / 2, cy + p.y - t / 2, t, t);
      }
    }

    /* el filo: una línea fina que cierra la esfera contra el fondo */
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832);
    ctx.strokeStyle = 'rgba(200,169,106,.20)'; ctx.lineWidth = 1; ctx.stroke();

    /* Las ciudades, CON SU NOMBRE. Sin el nombre el globo es un adorno con
       lucecitas: bonito y mudo. Con el nombre dice lo que tiene que decir
       —dónde va a estar Babyloon y qué hora es ahí—, que es exactamente
       la diferencia entre ilustrar y contar.

       El rótulo se apaga con la curvatura: cerca del filo el punto está
       casi de perfil y un nombre ahí se lee torcido y encima se pisa con
       el de al lado. Se desvanece antes de llegar. */
    g.puntos = [];
    ctx.textBaseline = 'middle';
    for (var i = 0; i < CIUDADES_REJ.length; i++) {
      var c = CIUDADES_REJ[i], co = COORD[c.slug];
      if (!co) continue;
      var q = proyectar(co[0], co[1], g.giro, lat0, R);
      if (q.z <= 0) continue;
      var x = cx + q.x, y = cy + q.y;
      var dia = luzEn(co[0], co[1], s) > 0;
      var act = g.sobre === c.slug;
      var op = Math.min(1, q.z * 2.2);
      g.puntos.push({ slug: c.slug, x: x, y: y, r: 15 });

      var halo = act ? 19 : (dia ? 13 : 9);
      var h = ctx.createRadialGradient(x, y, 0, x, y, halo);
      h.addColorStop(0, (dia || act ? 'rgba(200,169,106,' : 'rgba(150,146,170,') +
                        ((dia || act ? 0.46 : 0.26) * op).toFixed(3) + ')');
      h.addColorStop(1, (dia || act ? 'rgba(200,169,106,0)' : 'rgba(150,146,170,0)'));
      ctx.beginPath(); ctx.arc(x, y, halo, 0, 6.2832);
      ctx.fillStyle = h; ctx.fill();

      ctx.beginPath(); ctx.arc(x, y, act ? 4.6 : 3.4, 0, 6.2832);
      ctx.fillStyle = dia ? 'rgba(246,231,200,' + op.toFixed(3) + ')'
                          : 'rgba(176,172,196,' + (op * 0.95).toFixed(3) + ')';
      ctx.fill();

      /* el nombre: sólo en la parte central de la cara visible */
      var opN = Math.max(0, Math.min(1, (q.z - 0.34) / 0.3));
      if (opN <= 0.02) continue;
      var izq = q.x < 0;                       // hacia dentro, nunca hacia el filo
      ctx.font = (act ? '600 ' : '') + '12px ui-sans-serif,system-ui,-apple-system,sans-serif';
      ctx.textAlign = izq ? 'right' : 'left';
      var tx = x + (izq ? -10 : 10);
      var nom = nombreCiudad(c);
      ctx.fillStyle = 'rgba(13,11,15,' + (0.5 * opN).toFixed(3) + ')';
      ctx.fillText(nom, tx + 0.7, y + 0.7);    // una sombra corta, que el fondo es ruidoso
      ctx.fillStyle = (dia ? 'rgba(243,229,203,' : 'rgba(198,194,214,')
                      + ((act ? 1 : dia ? 0.92 : 0.66) * opN).toFixed(3) + ')';
      ctx.fillText(nom, tx, y);
    }
  }

  /* ═══════════════════════════════════════════════════════════════════
     EL CONTADOR DE PASOS

     Marca cuál de los cuatro se está leyendo. Con `IntersectionObserver`
     y un margen que deja activo el que cruza la mitad de la pantalla, no
     con la posición del scroll: el scroll obliga a calcular en cada píxel
     y el observador avisa sólo cuando algo cambia.

     Sin observador no se rompe nada: el contador se queda en 01 y los
     cuatro pasos siguen leyéndose enteros, con su número cada uno.
     ═══════════════════════════════════════════════════════════════════ */
  function contadorPasos() {
    var caja = $('pasosCuenta'), lista = $('pasos');
    if (!caja || !lista) return;
    var pasos = lista.querySelectorAll('.paso-e');
    if (!pasos.length) { caja.hidden = true; return; }

    var n = caja.querySelector('b'), tot = caja.querySelector('span');
    if (tot) tot.textContent = ('0' + pasos.length).slice(-2);

    if (!('IntersectionObserver' in window)) return;
    var visto = -1, dentro = [];
    /* No vale quedarse con la última entrada del lote. En un salto de
       scroll entran dos pasos a la vez y ganaría el que avisó el último,
       que no tiene por qué ser el que se está leyendo: medido, al saltar
       al tercero marcaba el cuarto. Se apunta quién está dentro y se
       elige el que cae más cerca del centro de la pantalla. */
    var ob = new IntersectionObserver(function (ent) {
      for (var i = 0; i < ent.length; i++) {
        var k = Array.prototype.indexOf.call(pasos, ent[i].target);
        if (k < 0) continue;
        var pos = dentro.indexOf(k);
        if (ent[i].isIntersecting) { if (pos < 0) dentro.push(k); }
        else if (pos >= 0) dentro.splice(pos, 1);
      }
      if (!dentro.length) return;
      var medio = window.innerHeight / 2, mejor = dentro[0], dm = Infinity;
      for (var j = 0; j < dentro.length; j++) {
        var r = pasos[dentro[j]].getBoundingClientRect();
        var d = Math.abs(r.top + r.height / 2 - medio);
        if (d < dm) { dm = d; mejor = dentro[j]; }
      }
      if (mejor === visto) return;
      visto = mejor;
      if (n) n.textContent = ('0' + (mejor + 1)).slice(-2);
      for (var q = 0; q < pasos.length; q++) pasos[q].classList.toggle('activo', q === mejor);
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    for (var i = 0; i < pasos.length; i++) ob.observe(pasos[i]);

    /* El contador sólo se enseña mientras la sección está en pantalla:
       flotando fuera de ella sería un número sin pregunta. */
    var sec = lista.closest ? lista.closest('section') : null;
    if (sec) {
      new IntersectionObserver(function (e) {
        caja.classList.toggle('visible', e[0].isIntersecting);
      }, { rootMargin: '-20% 0px -20% 0px' }).observe(sec);
    }
  }

  function medirGlobo() {
    var g = globoEstado, cv = g.lienzo;
    var caja = cv.parentNode;
    var lado = Math.max(200, Math.min(caja.clientWidth, 520));
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    g.w = lado; g.h = lado;
    cv.style.width = lado + 'px'; cv.style.height = lado + 'px';
    cv.width = Math.round(lado * dpr); cv.height = Math.round(lado * dpr);
    g.ctx = cv.getContext('2d');
    g.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.R = lado * 0.42; g.cx = lado / 2; g.cy = lado / 2;
  }

  function globo() {
    var cv = $('globo');
    if (!cv) return;
    /* fail-closed: si el navegador no da contexto 2D, fuera el lienzo y
       que manden las tarjetas, que siempre están debajo */
    var ok = false;
    try { ok = !!(cv.getContext && cv.getContext('2d')); } catch (_) {}
    if (!ok) { var s = $('globoCaja'); if (s) s.hidden = true; return; }

    globoEstado.lienzo = cv;
    medirGlobo();

    var fijo = quieto();
    /* Sin movimiento: se dibuja una vez, con Marbella de frente. Gira
       igualmente si alguien arrastra, que es una acción suya. */
    globoEstado.giro = fijo ? 4.89 : 0;
    dibujarGlobo();

    if (!fijo) {
      var paso = function (ts) {
        if (!globoEstado.parado && !document.hidden) {
          if (!globoEstado.ultima) globoEstado.ultima = ts;
          var dt = Math.min(64, ts - globoEstado.ultima);
          globoEstado.ultima = ts;
          globoEstado.giro = (globoEstado.giro + dt * 0.0042) % 360;
          dibujarGlobo();
        } else { globoEstado.ultima = 0; }
        requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    }

    /* Elegir una ciudad. El lienzo no es accesible por sí mismo, y no se
       intenta: las mismas ciudades están debajo como enlaces de verdad,
       con su texto y su foco. Esto es el atajo del ratón, no la puerta. */
    function enQue(ev) {
      var r = cv.getBoundingClientRect();
      var x = (ev.clientX - r.left), y = (ev.clientY - r.top);
      var ps = globoEstado.puntos || [], mejor = null, dm = 1e9;
      for (var i = 0; i < ps.length; i++) {
        var d = (ps[i].x - x) * (ps[i].x - x) + (ps[i].y - y) * (ps[i].y - y);
        if (d < ps[i].r * ps[i].r && d < dm) { dm = d; mejor = ps[i].slug; }
      }
      return mejor;
    }
    cv.addEventListener('mousemove', function (ev) {
      var s = enQue(ev);
      if (s !== globoEstado.sobre) {
        globoEstado.sobre = s;
        cv.style.cursor = s ? 'pointer' : '';
        globoEstado.parado = !!s;             // se para donde se mira
        if (quieto()) dibujarGlobo();
      }
    });
    cv.addEventListener('mouseleave', function () {
      globoEstado.sobre = null; globoEstado.parado = false;
      if (quieto()) dibujarGlobo();
    });
    cv.addEventListener('click', function (ev) {
      var s = enQue(ev);
      if (!s) return;
      var t = document.getElementById('ciu-' + s);
      if (t) { t.scrollIntoView({ behavior: quieto() ? 'auto' : 'smooth', block: 'center' });
               t.classList.add('senalada');
               setTimeout(function () { t.classList.remove('senalada'); }, 1800); }
    });

    var rt = null;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { medirGlobo(); dibujarGlobo(); }, 160);
    });
  }

  function arrancar() {
    if (estado.arrancado) return;
    estado.arrancado = true;

    movimiento();
    scrollear();
    navegacion();
    portada();
    /* El hueco del vídeo sigue enchufado aunque hoy no haya ninguno:
       `video()` se va sola si no encuentra `#heroVideo`. Cuando llegue
       metraje nuevo basta con poner el `<video>` en el HTML; si falla
       o si el sistema pide quietud, manda la portada de ciudades. */
    video();
    globo();
    contadorPasos();
    leerDireccion();

    var caja = $('vacantes');
    if (caja) {
      caja.addEventListener('click', function (e) {
        /* `a` además de `button`: el botón de la lista vacía es un enlace
           a `#presentarme`, para que funcione también con el JavaScript a
           medio cargar. */
        var b = e.target.closest ? e.target.closest('button,a[data-presentarme]') : null;
        if (!b) return;
        if (b.hasAttribute('data-compartir')) { copiarEnlace(b.getAttribute('data-compartir'), b); return; }
        if (b.hasAttribute('data-presentarme')) {
          if (b.tagName === 'A') e.preventDefault();
          presentarme(b.getAttribute('data-presentarme'));
          return;
        }
        if (b.hasAttribute('data-codigo')) abrir(b);
      });
    }

    function filtroPulsado(e, clave, campo) {
      var b = e.target.closest ? e.target.closest('button[data-' + clave + ']') : null;
      if (!b) return;
      estado[campo] = b.getAttribute('data-' + clave) || '';
      estado.abierta = null;
      pintar();
      direccion();
    }
    var fa = $('filtros'), fm = $('filtrosModo');
    if (fa) fa.addEventListener('click', function (e) { filtroPulsado(e, 'dep', 'filtro'); });
    if (fm) fm.addEventListener('click', function (e) { filtroPulsado(e, 'modo', 'modo'); });

    /* El buscador. Con freno de 180 ms: pintar la lista en cada tecla con
       treinta puestos en pantalla se nota en un móvil. */
    var tic = null;
    function escribir(v, otro) {
      estado.texto = v;
      if (otro && otro.value !== v) otro.value = v;
      if (tic) clearTimeout(tic);
      tic = setTimeout(function () { estado.abierta = null; pintar(); direccion(); }, 180);
    }
    var q = $('q'), qh = $('qHero');
    if (q) q.addEventListener('input', function () { escribir(q.value, qh); });
    if (qh) qh.addEventListener('input', function () { escribir(qh.value, q); });

    var fb = $('fBuscar');
    if (fb) fb.addEventListener('submit', function (e) { e.preventDefault(); });
    var fbh = $('fBuscarHero');
    if (fbh) fbh.addEventListener('submit', function (e) {
      e.preventDefault();
      estado.texto = (qh && qh.value) || '';
      if (q) q.value = estado.texto;
      pintar(); direccion();
      var d = $('puestos');
      if (d) d.scrollIntoView({ behavior: quieto() ? 'auto' : 'smooth', block: 'start' });
    });

    var lim = $('limpiar');
    if (lim) lim.addEventListener('click', function () {
      estado.texto = ''; estado.filtro = ''; estado.modo = ''; estado.abierta = null;
      if (q) q.value = ''; if (qh) qh.value = '';
      pintar(); direccion();
    });

    var cv = $('cCv');
    if (cv) {
      cv.addEventListener('change', function () {
        var f = cv.files && cv.files[0], nota = $('cCvNota');
        if (!nota) return;
        if (!f) { nota.textContent = t('ep_f_cv_nota', 'PDF, DOC o DOCX. Hasta 5 MB. Opcional, pero ayuda.'); return; }
        nota.textContent = f.name + ' · ' + (f.size / 1048576).toFixed(1) + ' MB';
      });
    }
    var form = $('fCandidatura');
    if (form) form.addEventListener('submit', enviar);
    var fav = $('fAviso');
    if (fav) fav.addEventListener('submit', avisar);

    etiquetasAria();
    cargar();
    cargarCondiciones();
    pintarDias();
    pintarAreasAviso();
    arrancarReloj();

    /* Al cambiar de idioma se vuelve a pedir: los títulos y las
       descripciones los resuelve el servidor, no el diccionario. Y el
       reloj también, que lleva los nombres de las ciudades y el formato
       de hora del idioma de quien mira. */
    document.addEventListener('bbl:lang', function () {
      estado.fichas = {};
      cargar();
      cargarCondiciones();
      pintarDias();
      pintarReloj();
      pintarCiudades();
      pintarAreasAviso();
      etiquetasAria();
      rotuloPortada();
    });

    /* En una pestaña de fondo el navegador estira los temporizadores, así
       que al volver la hora puede llevar minutos parada. Se repinta al
       volver en vez de subir la frecuencia, que costaría batería a todo el
       mundo para arreglar el caso de unos pocos. */
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) { pintarReloj(); pintarCiudades(); rotuloPortada(); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
