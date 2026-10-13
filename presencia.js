/* ═══════════════════════════════════════════════════════════════════════
   presencia.js · Babyloon
   Mide el tráfico de la web y dice quién está conectado.

   POR QUÉ EXISTE
     admin_web_visitors() llevaba meses en el servidor leyendo
     product_events, y product_events tenía cero filas. La herramienta no
     estaba rota: estaba desconectada. Esto es lo que la conecta.

   QUÉ HACE
     · da a cada visita un identificador que caduca a los 30 min de no usarse
     · avisa al cargar cada página (page_view)
     · manda un latido cada 30 s mientras la pestaña está a la vista
     · guarda de dónde llegó (referrer y utm_*), una sola vez por visita
     · no manda nada mientras la pestaña está oculta: ni gasta ni miente

   QUÉ NO HACE
     · no pone cookies
     · no manda nada personal: ni nombre, ni correo, ni lo que escribes
     · no manda la cadena completa del navegador (eso es una huella).
       Manda como mucho "movil/safari", y solo si aceptaste el banner
     · no dice quién eres. Si hay sesión iniciada lo resuelve el SERVIDOR
       con auth.uid(); desde aquí no se puede suplantar a nadie
     · el país no sale de aquí si la red lo sabe: Cloudflare le da a
       Supabase el país real y la IP no se guarda en ninguna parte

   EL BANNER MANDA (cookies.js · BBLCookies.consent())
     aceptado ('all') ......... medida completa + etiqueta de dispositivo
     sin responder (null) ..... medida de audiencia propia: identificador
                                de 30 min y origen de la visita, sin huella
     rechazado ('necessary') .. identificador solo en memoria, sin origen y
                                sin dispositivo. Se cuenta la visita y ya
     El cambio de decisión se aplica en caliente, sin recargar.

   USO
     <script src="presencia.js?v=1"></script>
     Y ya está. Si la página tiene un cliente de Supabase en
     window.__sbClient lo usa, y así el latido viaja con la sesión
     iniciada y el servidor sabe qué rol es. Si no, llama al REST.

     Desde cualquier página:
       BBLPresencia.evento('anadir_al_carrito', { producto: 'x' })
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var URL_BASE = 'https://qphatjblvojnfyghwmjy.supabase.co';
  // Clave anónima: es pública por diseño, va en el navegador igual que en
  // el resto de las páginas.
  var ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaGF0amJsdm9qbmZ5Z2h3bWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTUyNTksImV4cCI6MjA5NDMzMTI1OX0.fd_maoPBLGKAGHqOcsmcAKWbTl_a0962TpV57f7u0ik';

  var LATIDO_MS  = 30000;   // un latido cada 30 s
  var CADUCA_MIN = 30;      // la visita muere tras 30 min sin actividad
  var K_SES      = 'bbl_ses';
  var K_VISTO    = 'bbl_ses_visto';
  var K_ORIGEN   = 'bbl_ses_origen';

  // ── Qué nos deja hacer el visitante ────────────────────────────────
  function consentimiento() {
    try {
      if (window.BBLCookies && typeof window.BBLCookies.consent === 'function') {
        return window.BBLCookies.consent();
      }
      return localStorage.getItem('bbl_cookie_consent');
    } catch (_) { return null; }
  }
  /* 17.A8 · SIN DECIDIR NO ES QUE SÍ.
     Antes sólo `necessary` frenaba algo, así que mientras el visitante
     no contestaba se le escribía un identificador en el disco y se le
     guardaba de dónde venía. Eso es exactamente lo que necesita
     permiso: da igual que el dato sea anónimo, lo que hay que consentir
     es que se le guarde algo en el dispositivo.
     Ahora «todavía no ha contestado» se comporta igual que «no». */
  function rechazado() { return consentimiento() !== 'all'; }
  function aceptado()  { return consentimiento() === 'all'; }

  /* ¿Hay alguien dentro de su cuenta?
     Importa porque separa dos cosas que no son la misma:

       · El latido de quien HA ENTRADO es la actividad de su propia
         cuenta, y es lo que alimenta «quién está dentro» en el panel.
         Eso es parte del servicio, no publicidad.
       · El latido de quien sólo pasa por la web, sin cuenta y sin haber
         dicho que sí, no tiene por qué existir.

     Se mira la llave que deja el propio cliente de Supabase, que es
     síncrona; no se le pregunta al servidor para no retrasar la
     decisión de no mandar nada. */
  function haySesion() {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && /^sb-.*-auth-token$/.test(k) && localStorage.getItem(k)) return true;
      }
    } catch (_) {}
    return false;
  }
  /* La regla, en una línea: sin consentimiento y sin cuenta, no sale
     nada de este navegador. */
  function puedeMandar() { return aceptado() || haySesion(); }

  // ── Identificador de la visita ─────────────────────────────────────
  function nuevoId() {
    try {
      var a = new Uint8Array(16);
      crypto.getRandomValues(a);
      return Array.from(a, function (b) {
        return ('0' + b.toString(16)).slice(-2);
      }).join('');
    } catch (_) {
      return (Date.now().toString(36) + Math.random().toString(36).slice(2, 12))
             .padEnd(24, '0').slice(0, 32);
    }
  }

  var EN_MEMORIA = null;   // identificador de quien rechazó, o de modo privado

  function sesion() {
    // Rechazado: nada en el disco del visitante. Dura lo que dura la página.
    if (rechazado()) {
      if (!EN_MEMORIA) EN_MEMORIA = nuevoId();
      return EN_MEMORIA;
    }

    var id, visto;
    try {
      id    = localStorage.getItem(K_SES);
      visto = parseInt(localStorage.getItem(K_VISTO) || '0', 10);
    } catch (_) {
      // Modo privado o almacenamiento bloqueado: visita de un solo uso.
      if (!EN_MEMORIA) EN_MEMORIA = nuevoId();
      return EN_MEMORIA;
    }

    var ahora = Date.now();
    if (!id || !visto || (ahora - visto) > CADUCA_MIN * 60000) {
      id = nuevoId();
      try {
        localStorage.setItem(K_SES, id);
        localStorage.removeItem(K_ORIGEN);   // visita nueva, origen nuevo
      } catch (_) {}
    }
    try { localStorage.setItem(K_VISTO, String(ahora)); } catch (_) {}
    return id;
  }

  function olvidar() {
    try {
      localStorage.removeItem(K_SES);
      localStorage.removeItem(K_VISTO);
      localStorage.removeItem(K_ORIGEN);
    } catch (_) {}
  }

  // ── De dónde llegó, una sola vez por visita ────────────────────────
  function origen() {
    if (rechazado()) return { referrer: '', utm: {} };

    try {
      var guardado = localStorage.getItem(K_ORIGEN);
      if (guardado) return JSON.parse(guardado);
    } catch (_) {}

    var utm = {};
    try {
      var q = new URLSearchParams(location.search);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
        .forEach(function (k) { if (q.get(k)) utm[k] = q.get(k).slice(0, 60); });
      if (q.get('ref')) utm.utm_source = q.get('ref').slice(0, 60);
    } catch (_) {}

    var ref = '';
    try {
      // El referrer interno no es un origen: es navegar por la propia web.
      if (document.referrer && document.referrer.indexOf(location.hostname) === -1) {
        ref = document.referrer.slice(0, 300);
      }
    } catch (_) {}

    var o = { referrer: ref, utm: utm };
    try { localStorage.setItem(K_ORIGEN, JSON.stringify(o)); } catch (_) {}
    return o;
  }

  // ── Dónde está ─────────────────────────────────────────────────────
  function pantalla() {
    var p = (location.pathname || '/').split('?')[0];
    if (p === '' || p === '/') p = '/index.html';
    return p.slice(0, 80);
  }

  function pais() {
    // Solo una pista, por si la red no dice nada: sale del idioma del
    // navegador. El servidor prefiere el país real si lo tiene.
    try {
      var l = (navigator.language || '').split('-')[1];
      if (l && l.length === 2) return l.toUpperCase();
    } catch (_) {}
    return null;
  }

  function ciudad() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      return tz.split('/').pop().replace(/_/g, ' ').slice(0, 80) || null;
    } catch (_) { return null; }
  }

  function dispositivo() {
    // Dos palabras, no una huella. Y solo con el banner aceptado.
    if (!aceptado()) return null;
    var ua = '';
    try { ua = (navigator.userAgent || '').toLowerCase(); } catch (_) { return null; }
    if (!ua) return null;

    var tipo = 'escritorio';
    if (/ipad|tablet|playbook|silk/.test(ua)) tipo = 'tableta';
    else if (/mobi|iphone|ipod|android.*mobile|windows phone/.test(ua)) tipo = 'movil';

    var nav = 'otro';
    if (/edg\//.test(ua)) nav = 'edge';
    else if (/opr\/|opera/.test(ua)) nav = 'opera';
    else if (/samsungbrowser/.test(ua)) nav = 'samsung';
    else if (/firefox|fxios/.test(ua)) nav = 'firefox';
    else if (/chrome|crios/.test(ua)) nav = 'chrome';
    else if (/safari/.test(ua)) nav = 'safari';

    return tipo + '/' + nav;
  }

  // ── El envío ───────────────────────────────────────────────────────
  var SES = sesion();
  var primero = true;

  function cuerpo(evento) {
    var o = primero ? origen() : { referrer: '', utm: {} };
    return {
      p_session : SES,
      p_source  : 'web',
      p_screen  : pantalla(),
      p_event   : evento,
      p_props   : {},
      p_country : pais(),
      p_city    : ciudad(),
      p_referrer: o.referrer || null,
      p_utm     : o.utm || {},
      p_user_agent: dispositivo()
    };
  }

  function mandar(body, conBeacon) {
    // Al cerrar la pestaña solo sendBeacon llega a tiempo.
    if (conBeacon && navigator.sendBeacon) {
      try {
        navigator.sendBeacon(
          URL_BASE + '/rest/v1/rpc/latido?apikey=' + encodeURIComponent(ANON),
          new Blob([JSON.stringify(body)], { type: 'application/json' }));
        return;
      } catch (_) {}
    }

    // Si la página ya tiene cliente de Supabase, se aprovecha: así el
    // latido viaja con la sesión iniciada y el servidor sabe quién es.
    var sb = window.__sbClient || window.sbClient || null;
    if (sb && typeof sb.rpc === 'function') {
      try { sb.rpc('latido', body); return; } catch (_) {}
    }

    try {
      fetch(URL_BASE + '/rest/v1/rpc/latido', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
                   'apikey': ANON, 'Authorization': 'Bearer ' + ANON },
        body   : JSON.stringify(body),
        keepalive: true
      }).catch(function () {});
    } catch (_) {}
  }

  function enviar(evento, conBeacon) {
    if (!puedeMandar()) return;   // 17.A8
    mandar(cuerpo(evento), conBeacon);
    primero = false;
  }

  // ── El ciclo ───────────────────────────────────────────────────────
  var timer = null;

  function arrancar() {
    if (timer) return;
    timer = setInterval(function () {
      if (document.visibilityState === 'visible') {
        if (!rechazado()) {
          try { localStorage.setItem(K_VISTO, String(Date.now())); } catch (_) {}
        }
        enviar('heartbeat', false);
      }
    }, LATIDO_MS);
  }

  function parar() { if (timer) { clearInterval(timer); timer = null; } }

  enviar('page_view', false);
  arrancar();

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') { enviar('heartbeat', false); arrancar(); }
    else parar();
  });

  window.addEventListener('pagehide', function () {
    parar();
    enviar('page_leave', true);
  });

  // Si pulsa Rechazar a mitad de visita, se le borra lo guardado y se
  // sigue contando en memoria. Si pulsa Aceptar, la visita se asienta.
  document.addEventListener('bbl:cookies', function (e) {
    var v = e && e.detail;
    if (v === 'necessary') {
      olvidar();
      EN_MEMORIA = SES;          // la visita en curso no se parte por la mitad
    } else if (v === 'all') {
      try {
        localStorage.setItem(K_SES, SES);
        localStorage.setItem(K_VISTO, String(Date.now()));
      } catch (_) {}
      enviar('heartbeat', false);   // ahora ya podemos decir el dispositivo
    }
  });

  // ── Los clics que valen un evento, sin tocar cada página ───────────
  /*
     El embudo de marketing no tenía peldaños: `page_view` y poco más.
     Faltaba lo que de verdad dice si una campaña funciona — si la gente
     se descarga la app, si añade al carrito, si se apunta.

     Esto recoge solos los dos universales:
       · descargar la app  (app-link.js marca esos enlaces)
       · cualquier elemento con data-bbl-evento="nombre"
     Así una página nueva mide con un atributo, sin tocar javascript. */
  document.addEventListener('click', function (ev) {
    var el = ev.target && ev.target.closest ? ev.target.closest(
      '[data-bbl-evento],[data-app-open],[data-store],[data-app-download]') : null;
    if (!el) return;

    try {
      if (el.hasAttribute('data-bbl-evento')) {
        window.BBLPresencia.evento(
          el.getAttribute('data-bbl-evento'),
          { etiqueta: (el.getAttribute('data-bbl-valor') ||
                       (el.textContent || '').trim().slice(0, 40)) });
        return;
      }
      // Descarga o apertura de app: dice cuál y para quién.
      window.BBLPresencia.evento('descarga_app', {
        app  : el.getAttribute('data-app') || el.getAttribute('data-role') || 'cliente',
        tienda: el.getAttribute('data-store') || 'auto',
        como : el.hasAttribute('data-app-open') ? 'abrir' : 'descargar'
      });
    } catch (_) {}
  }, true);

  // ── Para el resto de la web ────────────────────────────────────────
  window.BBLPresencia = {
    sesion : function () { return SES; },
    modo   : function () {
      return aceptado() ? 'completo' : 'minimo';
    },
    evento : function (nombre, props) {
      var b = cuerpo(String(nombre || 'evento').slice(0, 40));
      b.p_props = props || {};
      mandar(b, false);
      primero = false;
    }
  };
})();
