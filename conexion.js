/* ═══════════════════════════════════════════════════════════════════════
   conexion.js · Babyloon · bloque 15.5

   POR QUÉ EXISTE
   Once páginas empezaban así:

       <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
       <script>
         const sb = window.supabase.createClient(URL, CLAVE);   // ← línea 1

   Si ese fichero no llegaba —red de hotel, proxy de empresa, bloqueador
   que filtra por nombre, o el CDN caído— `window.supabase` era
   `undefined`, la línea 1 lanzaba

       Cannot read properties of undefined (reading 'createClient')

   y AHÍ SE PARABA TODO EL SCRIPT DE LA PÁGINA. No sólo lo que necesita
   el servidor: también el menú, el buscador, el cambio de idioma, el
   aviso de cookies y el modal de acceso, porque viven debajo en el mismo
   bloque. Medido el 23-sep con el CDN bloqueado:

       recuperar.html ....... 113 letras visibles  (en blanco)
       masterclass.html ..... 174
       profesionales.html ... 392
       cliente.html ......... 397
       checkout.html ........ 459
       regalo.html .......... 509
       profesional.html ..... 522
       academia.html ........ 576
       novias.html .......... 648
       boutique.html ........ 789
       index.html .......... 5783  (el texto queda; lo vivo, no)

   Y sin un solo mensaje. La visitante ve una página rota y se va.

   `checkout.html` tenía el mismo fallo con Stripe, dos líneas más abajo:

         const stripe = Stripe(STRIPE_PK);                      // ← línea 3

   Ése es peor, porque es la página donde se paga.

   DOS ARREGLOS, NO UNO

   1. supabase-js ya no viene de fuera. Se sirve desde nuestro propio
      dominio (`supabase-js-2.117.1.min.js`), que es el mismo fichero que
      daba jsDelivr —el `package.json` de Supabase apunta justo ahí— pero
      con la versión fijada y sin un tercero por medio. Una página
      servida es una página con su biblioteca.

      Stripe NO se puede copiar: exige cargarse desde `js.stripe.com`, y
      hacer una copia rompe su seguridad y sus condiciones. Ahí sólo cabe
      el segundo arreglo.

   2. Este fichero. Si al llegar aquí falta alguna de las dos:
        · se pone en su sitio un objeto de mentira que NO lanza
          excepciones, para que el resto del script de la página se
          ejecute entero —menú, idioma, textos legales, todo lo que no
          necesita servidor—,
        · y se pinta un aviso arriba, en el idioma de la página, que dice
          lo que pasa y ofrece reintentar.

   El falso cliente devuelve siempre `{data:…, error:{…}}`. Eso es lo que
   el código de la web ya sabe manejar: mira `error` y avisa. Lo que no
   sabía manejar era que no existiera.

   No se carga solo. Va en las mismas páginas, DESPUÉS de las bibliotecas
   y ANTES del script de la página.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var falta = [];

  /* ── El «data» que devuelve todo ─────────────────────────────────────
     Tiene que servir a dos formas de llamar que conviven en la web:

         const { data } = await sb.from('x').select('*');
         (data || []).forEach(…)                      ← quiere una lista

         const { data: { session } } = await sb.auth.getSession();
         if (session) …                               ← quiere un objeto

     Con `data:null` la segunda revienta al desestructurar. Con `data:{}`
     revienta la primera al recorrer. Así que es una lista vacía CON las
     tres propiedades que el código de sesión busca colgadas encima:
     recorrerla da cero vueltas y `data.session` da null. Las dos formas
     salen vivas. */
  function datos() {
    var d = [];
    d.session = null;
    d.user = null;
    d.subscription = { unsubscribe: function () {} };
    return d;
  }

  function respuesta() {
    return {
      data: datos(),
      error: { message: 'Sin conexion con el servidor', name: 'SinConexion', code: 'sin_conexion' }
    };
  }

  /* ── El objeto que no rompe ──────────────────────────────────────────
     Se puede encadenar hasta el infinito
     —`sb.from('x').select('*').eq('a',1).order('b').limit(5)`— y al
     esperarlo da la respuesta de arriba. Con Proxy son diez líneas y
     cubre CUALQUIER método, incluidos los que Supabase añada mañana. */
  function inerteConProxy() {
    var p = new Proxy(function () {}, {
      get: function (_, clave) {
        if (clave === 'then')    return function (ok) { return Promise.resolve(respuesta()).then(ok); };
        if (clave === 'catch')   return function () { return Promise.resolve(respuesta()); };
        if (clave === 'finally') return function (f) { try { f && f(); } catch (_) {} return Promise.resolve(respuesta()); };
        if (typeof clave === 'symbol') return undefined;
        return p;
      },
      apply: function () { return p; }
    });
    return p;
  }

  /* Navegador sin Proxy (IE11 y poco más). Se cubre a mano la superficie
     que usa la web. Si se escapa algún método el aviso ya está puesto, y
     la visitante sabe que la página no está completa. */
  var METODOS = ('from select insert update upsert delete eq neq gt gte lt lte like ilike is in ' +
    'contains containedBy overlaps textSearch match not or filter order limit range abortSignal ' +
    'single maybeSingle csv geojson explain rollback returns rpc auth storage functions channel ' +
    'removeChannel removeAllChannels getChannels on subscribe unsubscribe send track untrack ' +
    'getSession getUser signUp signInWithPassword signInWithOtp signInWithOAuth verifyOtp ' +
    'signOut resetPasswordForEmail updateUser refreshSession setSession exchangeCodeForSession ' +
    'onAuthStateChange mfa admin invoke upload download remove list move copy createSignedUrl ' +
    'createSignedUrls getPublicUrl createBucket getBucket listBuckets emptyBucket ' +
    'elements confirmCardPayment confirmPayment createPaymentMethod redirectToCheckout mount ' +
    'unmount destroy create').split(' ');

  function inerteAMano() {
    var o = {};
    function yo() { return o; }
    for (var i = 0; i < METODOS.length; i++) o[METODOS[i]] = yo;
    var r = respuesta();
    o.data = r.data;
    o.error = r.error;
    o.session = null;
    o.user = null;
    o.subscription = { unsubscribe: function () {} };
    o.then = function (ok) { return Promise.resolve(respuesta()).then(ok); };
    o.catch = function () { return Promise.resolve(respuesta()); };
    return o;
  }

  var inerte = (typeof Proxy === 'function') ? inerteConProxy : inerteAMano;

  /* ── 1. supabase-js ──────────────────────────────────────────────── */
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    window.supabase = { createClient: function () { return inerte(); }, __sinConexion: true };
    falta.push('supabase-js');
  }

  /* ── 2. Stripe, sólo donde la página lo pide ─────────────────────────
     No se busca a ciegas: se mira si esta página tiene la etiqueta de
     `js.stripe.com`. Así `conexion.js` sirve igual en las 55 páginas sin
     tener que saber cuál es cuál. */
  var pideStripe = false;
  try {
    pideStripe = !!document.querySelector('script[src*="js.stripe.com"]');
  } catch (_) {}

  if (pideStripe && typeof window.Stripe !== 'function') {
    window.Stripe = function () { return inerte(); };
    window.Stripe.__sinConexion = true;
    falta.push('stripe.js');
  }

  if (!falta.length) return;

  /* ── 3. El aviso ─────────────────────────────────────────────────────
     Los textos van aquí dentro y no en `i18n.js` a propósito: este
     fichero tiene que servir precisamente cuando algo no ha cargado, y
     depender de otro fichero para decirlo sería repetir el fallo. */
  var T = {
    es: ['No hemos podido cargar una parte de la página.', 'Reintentar'],
    en: ['We could not load part of this page.', 'Try again'],
    pt: ['Não conseguimos carregar uma parte da página.', 'Tentar de novo'],
    fr: ['Nous n’avons pas pu charger une partie de la page.', 'Réessayer'],
    de: ['Ein Teil der Seite konnte nicht geladen werden.', 'Erneut versuchen'],
    it: ['Non siamo riusciti a caricare una parte della pagina.', 'Riprova'],
    nl: ['We konden een deel van de pagina niet laden.', 'Opnieuw proberen'],
    pl: ['Nie udało się wczytać części strony.', 'Spróbuj ponownie'],
    el: ['Δεν μπορέσαμε να φορτώσουμε ένα μέρος της σελίδας.', 'Δοκιμάστε ξανά'],
    hu: ['Az oldal egy részét nem sikerült betölteni.', 'Újrapróbálkozás'],
    ru: ['Не удалось загрузить часть страницы.', 'Повторить'],
    ar: ['تعذّر تحميل جزء من الصفحة.', 'إعادة المحاولة'],
    zh: ['页面的部分内容未能加载。', '重试'],
    ja: ['ページの一部を読み込めませんでした。', '再読み込み'],
    ko: ['페이지의 일부를 불러오지 못했습니다.', '다시 시도'],
    sv: ['Vi kunde inte ladda en del av sidan.', 'Försök igen']
  };

  function idioma() {
    var l = (window.BBL && window.BBL.lang) ||
            document.documentElement.getAttribute('lang') ||
            (navigator.language || 'es');
    l = String(l).slice(0, 2).toLowerCase();
    return T[l] ? l : 'es';
  }

  function pinta() {
    if (document.getElementById('bblSinConexion')) return;
    var l = idioma(), txt = T[l];

    var barra = document.createElement('div');
    barra.id = 'bblSinConexion';
    barra.setAttribute('role', 'status');
    barra.dir = (l === 'ar') ? 'rtl' : 'ltr';
    barra.style.cssText = [
      'position:fixed', 'left:0', 'right:0', 'top:0', 'z-index:2147483000',
      'display:flex', 'flex-wrap:wrap', 'gap:10px 14px',
      'align-items:center', 'justify-content:center',
      'box-sizing:border-box', 'width:100%', 'max-width:100%',
      'padding:11px 16px', 'padding-top:calc(11px + env(safe-area-inset-top,0px))',
      'background:#1B1219', 'border-bottom:1px solid rgba(200,169,106,.45)',
      'color:#EDE5DA', 'font:500 14px/1.35 system-ui,-apple-system,Segoe UI,Roboto,sans-serif',
      'text-align:center'
    ].join(';');

    var frase = document.createElement('span');
    frase.textContent = txt[0];
    frase.style.cssText = 'max-width:46ch';

    var boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = txt[1];
    boton.style.cssText = [
      'flex:none', 'cursor:pointer', 'border:1px solid #C8A96A', 'border-radius:999px',
      'background:transparent', 'color:#C8A96A', 'padding:6px 18px',
      'font:600 13px/1 inherit', 'letter-spacing:.04em'
    ].join(';');
    boton.addEventListener('click', function () { location.reload(); });

    barra.appendChild(frase);
    barra.appendChild(boton);
    document.body.appendChild(barra);

    /* La barra taparía la cabecera fija. Se empuja el cuerpo hacia abajo
       exactamente lo que ella mide, ni un píxel más. */
    var alto = barra.offsetHeight;
    document.documentElement.style.scrollPaddingTop = alto + 'px';
    document.body.style.paddingTop =
      (parseFloat(getComputedStyle(document.body).paddingTop) || 0) + alto + 'px';
  }

  if (document.body) pinta();
  else document.addEventListener('DOMContentLoaded', pinta);

  /* Que quede en la consola, para cuando lo mires tú. */
  try {
    console.error('[Babyloon] no ha cargado: ' + falta.join(', ') +
                  '. La página funciona, pero lo que necesita esos ficheros está apagado.');
  } catch (_) {}
})();
