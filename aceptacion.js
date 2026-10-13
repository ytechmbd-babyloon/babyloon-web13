/* ═══════════════════════════════════════════════════════════════
   Babyloon Web · La edad y la aceptación · bloque 61.5
   ───────────────────────────────────────────────────────────────
   El asesor legal, el 1 de octubre: 18 años para todo el mundo,
   aceptación expresa con hora, IP, versiones, idioma y país, y para
   las cuentas que ya existen, un aviso que no se puede cerrar cuando
   un texto cambia de forma sustancial.

   El servidor ya lo sabe todo (61.4e):
     · `necesita_aceptar()` dice si a esta cuenta hay que pedírselo,
       por qué —la edad, o un texto nuevo— y qué textos.
     · `declarar_alta(...)` lo registra: una fila que no se puede
       editar, con la IP sacada de la propia petición.

   Esto es la pantalla. Hace UNA cosa y por eso va en su fichero:
   enganchado a `auth.js` habría traído consigo el botón de «Acceder»
   a las páginas de panel, que no lo quieren.

       BBLAceptacion.asegurar({ casillaYaMarcada })  → Promise<boolean>

   Devuelve `true` si se puede seguir —ya estaba aceptado, o se acaba
   de aceptar— y `false` si la persona ha elegido salir.

   CUATRO DECISIONES
   1. Al cargar cualquier página con sesión se pregunta. Sin sesión, no
      se pregunta nada: no hay a quién.
   2. Si el servidor no contesta, NO se bloquea la página. Este aviso es
      la pantalla, no la cerradura: la cerradura va en el servidor, en lo
      que de verdad compromete (reservar, pagar), y está en la lista.
   3. En las páginas de los textos legales no se tapa nada: el aviso
      manda a leerlos, y taparlos con el propio aviso sería absurdo.
   4. Quien acaba de marcar la casilla al crear la cuenta no la vuelve a
      ver: se registra directamente, en el mismo instante.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.BBLAceptacion) return;

  var DOC = {
    terminos: 'terminos.html',
    privacidad: 'privacidad.html',
    condiciones_profesionales: 'condiciones-profesionales.html'
  };
  var NOMBRE = {
    terminos: ['ac_l_terminos', 'Términos y condiciones'],
    privacidad: ['ac_l_privacidad', 'Política de privacidad'],
    condiciones_profesionales: ['ac_l_condiciones', 'Condiciones para profesionales']
  };
  var CACHE = 'bbl_acept_ok';            // sessionStorage: { u, t }
  var CACHE_MS = 30 * 60 * 1000;          // media hora sin volver a preguntar

  function t(k, alt) {
    try { var v = window.BBL && BBL.t(k); return (v && v !== k) ? v : alt; }
    catch (_) { return alt; }
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[<>&"]/g, function (c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
    });
  }
  function idioma() { try { return (window.BBL && BBL.lang) || 'es'; } catch (_) { return 'es'; } }

  /* El cliente de Supabase lo crea cada página. En algunas nace un poco
     más tarde que este fichero: se le espera tres segundos, no más. */
  function cliente() {
    return new Promise(function (ok) {
      var n = 0;
      (function mira() {
        if (window.__sbClient) return ok(window.__sbClient);
        if (++n > 15) return ok(null);
        setTimeout(mira, 200);
      })();
    });
  }

  /* El país, como ya lo averigua `i18n.js`: la traza de Cloudflare. Sin
     ella, nulo: el servidor guarda la aceptación igual. */
  var paisPromesa = null;
  function pais() {
    if (paisPromesa) return paisPromesa;
    paisPromesa = new Promise(function (ok) {
      try {
        var ctrl = window.AbortController ? new AbortController() : null;
        var to = setTimeout(function () { try { ctrl && ctrl.abort(); } catch (_) {} ok(null); }, 2500);
        fetch('/cdn-cgi/trace', ctrl ? { signal: ctrl.signal } : {})
          .then(function (r) { return r.text(); })
          .then(function (txt) {
            clearTimeout(to);
            var m = /loc=([A-Z]{2})/.exec(txt || '');
            ok(m ? m[1] : null);
          })
          .catch(function () { clearTimeout(to); ok(null); });
      } catch (_) { ok(null); }
    });
    return paisPromesa;
  }

  function recordar(uid) {
    try { sessionStorage.setItem(CACHE, JSON.stringify({ u: uid, t: Date.now() })); } catch (_) {}
  }
  function recordado(uid) {
    try {
      var x = JSON.parse(sessionStorage.getItem(CACHE) || 'null');
      return !!(x && x.u === uid && (Date.now() - x.t) < CACHE_MS);
    } catch (_) { return false; }
  }

  async function declarar(c) {
    var p = await pais();
    var r = await c.rpc('declarar_alta', {
      p_mayor_edad: true, p_acepta: true,
      p_pais: p, p_idioma: idioma(), p_desde: 'web'
    });
    return !r.error && r.data && r.data.ok === true;
  }

  /* ── El aviso ──────────────────────────────────────────────── */
  /* Por encima de todo lo demás. El aviso de cookies y la barra de
     «sin conexión» están en 2147483000; si este estuviera a la misma
     altura, el que se pinta después taparía al otro, y el de cookies
     puede pintarse después y quedar encima del botón de aceptar. */
  var CSS = [
    '.bac-ov{position:fixed;inset:0;z-index:2147483500;display:flex;align-items:center;justify-content:center;',
    '  padding:20px;background:rgba(6,5,7,.9);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}',
    '.bac-card{width:100%;max-width:440px;max-height:92vh;max-height:calc(100dvh - 40px);overflow-y:auto;overscroll-behavior:contain;font-family:\'Jost\',system-ui,sans-serif;',
    '  background:linear-gradient(165deg,#241820,#0D0B0F);border:1px solid rgba(200,169,106,.22);',
    '  border-radius:12px;padding:30px 28px 24px;box-shadow:0 40px 90px -30px rgba(0,0,0,.9);color:#F9F5EE}',
    '.bac-eyebrow{font-size:10.5px;letter-spacing:.4em;text-transform:uppercase;color:#C8A96A;font-weight:500}',
    '.bac-card h2{font-family:\'Cormorant Garamond\',serif;font-weight:400;font-size:29px;line-height:1.1;',
    '  color:#F9F5EE;margin:10px 0 8px;text-wrap:balance}',
    '.bac-sub{color:#E8E0D5;font-size:13.5px;line-height:1.55;margin:0 0 16px}',
    '.bac-docs{list-style:none;margin:0 0 16px;padding:0}',
    '.bac-docs li{padding:9px 0;border-bottom:1px solid rgba(249,245,238,.07);font-size:14px;line-height:1.4}',
    '.bac-docs li:last-child{border-bottom:0}',
    '.bac-docs a{color:#C8A96A;text-decoration:underline;text-underline-offset:3px;overflow-wrap:anywhere}',
    '.bac-docs small{color:#8C7482;font-size:11.5px;margin-left:6px;white-space:nowrap}',
    '.bac-check{display:flex;gap:10px;align-items:flex-start;font-size:13px;color:#E8E0D5;line-height:1.5;',
    '  margin:4px 0 14px;cursor:pointer}',
    '.bac-check input{margin:3px 0 0;width:17px;height:17px;flex:0 0 auto;accent-color:#C8A96A;cursor:pointer}',
    '.bac-go{width:100%;border:none;border-radius:4px;padding:14px;cursor:pointer;font-family:inherit;',
    '  font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:#0D0B0F;',
    '  background:linear-gradient(135deg,#8E723F,#F3E0BC 42%,#C9A96E 72%,#9C8050)}',
    '.bac-go:disabled{opacity:.55;cursor:default}',
    '.bac-go:focus-visible,.bac-out:focus-visible,.bac-check input:focus-visible,.bac-docs a:focus-visible{outline:2px solid #C8A96A;outline-offset:3px}',
    '.bac-out{display:block;margin:12px auto 0;background:none;border:none;color:#8C7482;font-family:inherit;',
    '  font-size:12px;cursor:pointer;text-decoration:underline;text-underline-offset:3px}',
    '.bac-out:hover{color:#C8A96A}',
    '.bac-msg{font-size:13px;line-height:1.5;margin-top:12px;min-height:1px;color:#E0857C}',
    '@media(max-width:420px){.bac-card{padding:24px 20px 20px}.bac-card h2{font-size:25px}}'
  ].join('');

  var abierto = null;   // una sola promesa a la vez: dos pestañas del mismo aviso no

  function pintarAviso(d) {
    if (!document.getElementById('bacCss')) {
      var st = document.createElement('style'); st.id = 'bacCss'; st.textContent = CSS;
      document.head.appendChild(st);
    }
    // Qué textos. Siempre términos y privacidad —aunque aún no estén
    // firmados: lo que se acepta entonces es el texto publicado— y los
    // que el servidor diga, con su versión.
    var lista = [], ver = {};
    (d.documentos || []).forEach(function (x) {
      if (x && x.documento) { ver[x.documento] = x.version || null; if (lista.indexOf(x.documento) < 0) lista.push(x.documento); }
    });
    ['privacidad', 'terminos'].forEach(function (s) { if (lista.indexOf(s) < 0) lista.unshift(s); });
    lista.sort(function (a, b) {
      var o = ['terminos', 'privacidad', 'condiciones_profesionales'];
      return o.indexOf(a) - o.indexOf(b);
    });

    var cambio = !d.edad && (d.documentos || []).length > 0;
    var ov = document.createElement('div');
    ov.className = 'bac-ov'; ov.id = 'bacOverlay';
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-labelledby', 'bacT');
    ov.innerHTML =
      '<div class="bac-card">' +
        '<span class="bac-eyebrow">Babyloon</span>' +
        '<h2 id="bacT">' + esc(t('ac_t', 'Antes de seguir')) + '</h2>' +
        '<p class="bac-sub">' + esc(cambio
          ? t('ac_s_cambio', 'Hemos actualizado estos textos. Léelos y acéptalos para seguir.')
          : t('ac_s', 'Para usar Babyloon, confirma que tienes 18 años o más y acepta los textos que rigen el servicio.')) + '</p>' +
        '<ul class="bac-docs">' + lista.map(function (s) {
          var n = NOMBRE[s] ? t(NOMBRE[s][0], NOMBRE[s][1]) : s;
          var url = DOC[s];
          var v = ver[s] ? ' <small>' + esc(t('ac_version', 'versión {v}').replace('{v}', ver[s])) + '</small>' : '';
          return '<li>' + (url
            ? '<a href="' + url + '" target="_blank" rel="noopener">' + esc(n) + '</a>'
            : esc(n)) + v + '</li>';
        }).join('') + '</ul>' +
        '<label class="bac-check"><input type="checkbox" id="bacC" />' +
          '<span>' + esc(t('ac_check', 'Tengo 18 años o más y he leído y acepto estos textos.')) + '</span></label>' +
        '<button class="bac-go" id="bacOk" type="button">' + esc(t('ac_ok', 'Aceptar y seguir')) + '</button>' +
        '<button class="bac-out" id="bacSalir" type="button">' + esc(t('ac_salir', 'Salir')) + '</button>' +
        '<div class="bac-msg" id="bacMsg" aria-live="polite"></div>' +
      '</div>';
    document.body.appendChild(ov);
    var antes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(function () { try { document.getElementById('bacC').focus(); } catch (_) {} }, 60);
    return { ov: ov, cerrar: function () {
      try { ov.parentNode.removeChild(ov); } catch (_) {}
      document.body.style.overflow = antes;
    } };
  }

  function aviso(c, d, uid) {
    return new Promise(function (resolver) {
      var a = pintarAviso(d);
      var ok = document.getElementById('bacOk');
      var msg = document.getElementById('bacMsg');
      // Bloqueante: ni Escape ni pulsar fuera lo cierran. Se queda con
      // el foco dentro mientras esté abierto.
      a.ov.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); }
        if (e.key !== 'Tab') return;
        var f = a.ov.querySelectorAll('a,button,input');
        if (!f.length) return;
        var pri = f[0], ult = f[f.length - 1];
        if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
        else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
      });
      ok.addEventListener('click', async function () {
        msg.textContent = '';
        if (!document.getElementById('bacC').checked) {
          msg.textContent = t('ac_falta', 'Marca la casilla para seguir.');
          return;
        }
        ok.disabled = true;
        var bien = false;
        try { bien = await declarar(c); } catch (_) { bien = false; }
        if (!bien) {
          ok.disabled = false;
          msg.textContent = t('ac_err', 'No hemos podido guardarlo. Inténtalo de nuevo.');
          return;
        }
        recordar(uid);
        a.cerrar();
        resolver(true);
      });
      document.getElementById('bacSalir').addEventListener('click', async function () {
        try { await c.auth.signOut(); } catch (_) {}
        try { sessionStorage.removeItem(CACHE); } catch (_) {}
        a.cerrar();
        resolver(false);
        location.reload();
      });
    });
  }

  async function asegurar(opts) {
    opts = opts || {};
    var c = await cliente();
    if (!c) return true;
    var s = null;
    try { var g = await c.auth.getSession(); s = g.data && g.data.session; } catch (_) { s = null; }
    if (!s) return true;
    var uid = s.user && s.user.id;
    if (!opts.forzar && recordado(uid)) return true;

    var r;
    try { r = await c.rpc('necesita_aceptar'); } catch (_) { return true; }
    if (r.error || !r.data || r.data.ok !== true) return true;   // decisión 2
    var d = r.data;
    if (!d.necesita) { recordar(uid); return true; }

    // Decisión 4: la casilla del alta, marcada hace un segundo, cuenta —
    // siempre que lo que haya que aceptar sean los textos de esa casilla.
    var soloBase = (d.documentos || []).every(function (x) {
      return x && (x.documento === 'terminos' || x.documento === 'privacidad');
    });
    if (opts.casillaYaMarcada && soloBase) {
      try { if (await declarar(c)) { recordar(uid); return true; } } catch (_) {}
    }

    if (abierto) return abierto;
    abierto = aviso(c, d, uid).then(function (v) { abierto = null; return v; });
    return abierto;
  }

  /* La frase de la casilla del alta, con sus dos enlaces. Se sustituyen
     los HUECOS {terminos} y {privacidad}, nunca una palabra: así vale en
     los dieciséis idiomas. Todo lo demás va escapado. */
  function casilla() {
    var frase = esc(t('ac_casilla', 'Tengo 18 años o más y acepto los {terminos} y la {privacidad}.'));
    function enlace(s) {
      return '<a href="' + DOC[s] + '" target="_blank" rel="noopener">' +
        esc(t(NOMBRE[s][0], NOMBRE[s][1])) + '</a>';
    }
    return frase.replace('{terminos}', enlace('terminos')).replace('{privacidad}', enlace('privacidad'));
  }

  window.BBLAceptacion = { asegurar: asegurar, casilla: casilla };

  // Decisión 1 y 3: al cargar, con sesión, salvo en las páginas legales.
  function alCargar() {
    if (document.querySelector('#lgCuerpo[data-legal]')) return;
    asegurar({}).catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', alCargar);
  else alCargar();
})();
