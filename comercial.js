/* ═══════════════════════════════════════════════════════════════
   Babyloon Web · Lo comercial, con su consentimiento · bloque 61.91
   ───────────────────────────────────────────────────────────────
   La decisión cruzada 36 (el asesor legal, 9-oct): lo transaccional
   va sin consentimiento —reservas, cancelaciones, seguridad— y lo
   comercial, con él —promociones, cupones, novedades—. Con la hora,
   la IP, la cuenta y el texto exacto de la casilla, sin marcar de
   antemano. Y a quien ya tiene cuenta, un aviso opcional.

   El servidor lo hace todo (61.91a): da el texto de la casilla en el
   idioma de la página (texto_del_consentimiento_comercial), guarda
   cada sí y cada no por canal con el texto que da él mismo
   (consentir_comercial) y dice lo de cada cuenta
   (mis_consentimientos_comerciales). Esto son las pantallas, las
   mismas que en las apps (consentimiento_comercial.dart):

       BBLComercial.casilla(campo, finalidad)    la casilla del alta
       BBLComercial.apuntarAlta(correo, finalidad, marcada)
       BBLComercial.guardarAlta(finalidad)       ya con sesión
       BBLComercial.enPanel(finalidad, caja)     el bloque del perfil
                                                 y el aviso opcional

   CUATRO DECISIONES, las de las apps
   1. La casilla del alta nace sin marcar, y si su texto no llega del
      servidor no se enseña: no se guarda un «no» a un texto que nadie
      vio. Entonces se pregunta en el panel.
   2. Lo marcado se guarda con la cuenta recién creada, en el idioma en
      que se enseñó, sin volver a preguntar. Se ata al correo con el que
      se creó la cuenta.
   3. El aviso del panel sale una vez en este navegador: «Sí» guarda un
      sí; «Ahora no», un no; cerrarlo sin contestar no guarda nada.
   4. En el perfil, un interruptor por canal. Cada cambio se guarda con
      el texto que se enseña encima; si el servidor no lo guarda, vuelve
      a como estaba y se dice.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.BBLComercial) return;

  var CANALES = { cliente: ['push', 'email'], profesional: ['push', 'email', 'whatsapp'] };
  var NOMBRE_CANAL = {
    push: ['com_canal_push', 'Notificaciones'],
    email: ['com_canal_email', 'Correo electrónico'],
    whatsapp: ['com_canal_whatsapp', 'WhatsApp']
  };

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
  function correo(s) { return String(s || '').trim().toLowerCase(); }

  /* El cliente de Supabase lo crea cada página; a veces, un poco más
     tarde que este fichero. Se le espera tres segundos, no más. */
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
  async function sesion(c) {
    try { var g = await c.auth.getSession(); return (g && g.data && g.data.session) || null; }
    catch (_) { return null; }
  }

  /* El país, como en aceptacion.js: la traza de Cloudflare. */
  var paisPromesa = null;
  function pais() {
    if (paisPromesa) return paisPromesa;
    paisPromesa = new Promise(function (ok) {
      try {
        var ctrl = window.AbortController ? new AbortController() : null;
        var to = setTimeout(function () { try { ctrl && ctrl.abort(); } catch (_) {} ok(null); }, 2500);
        fetch('/cdn-cgi/trace', ctrl ? { signal: ctrl.signal } : {})
          .then(function (r) { return r.text(); })
          .then(function (txt) { clearTimeout(to); var m = /loc=([A-Z]{2})/.exec(txt || ''); ok(m ? m[1] : null); })
          .catch(function () { clearTimeout(to); ok(null); });
      } catch (_) { ok(null); }
    });
    return paisPromesa;
  }

  async function rpc(fn, params) {
    var c = await cliente();
    if (!c) throw new Error('sin_cliente');
    var r = await c.rpc(fn, params || {});
    if (r.error) throw r.error;
    return r.data;
  }

  /* El texto de la casilla, en el idioma de la página. Null si no llega. */
  async function texto(fin) {
    try {
      var d = await rpc('texto_del_consentimiento_comercial',
        { p_finalidad: fin, p_idioma: idioma(), p_pais: await pais() });
      if (d && d.ok === true && String(d.texto || '').trim()) return d;
    } catch (_) {}
    return null;
  }

  function deLaFinalidad(d, fin) {
    if (!d || d.ok !== true || !Array.isArray(d.finalidades)) return null;
    for (var i = 0; i < d.finalidades.length; i++) {
      if (d.finalidades[i] && d.finalidades[i].finalidad === fin) return d.finalidades[i];
    }
    return null;
  }
  async function mio(fin) {
    try { return deLaFinalidad(await rpc('mis_consentimientos_comerciales', {}), fin); }
    catch (_) { return null; }
  }

  /* Dar o retirar, con su prueba. Sin canales, todos los de la finalidad.
     El idioma es el del texto que se enseñó: el servidor guarda el texto
     de ese idioma, el mismo. */
  async function dar(fin, otorgado, desde, canales, idiomaTexto) {
    try {
      return deLaFinalidad(await rpc('consentir_comercial', {
        p_finalidad: fin, p_otorgado: !!otorgado, p_idioma: idiomaTexto || idioma(),
        p_pais: await pais(), p_desde: desde, p_canales: canales || null
      }), fin);
    } catch (_) { return null; }
  }
  function otorgado(d, canal) {
    return !!(d && d.canales && d.canales[canal] && d.canales[canal].otorgado === true);
  }

  /* ── La casilla del alta ───────────────────────────────────── */
  // La que se ve ahora mismo, con qué texto: hay una casilla por formulario.
  var ensenada = null;      // { campo, fin, idioma }
  var alta = null;          // { correo, fin, valor, idioma }

  // `campo` es un <label> con un <input type="checkbox"> y un <span>.
  async function casilla(campo, fin) {
    if (!campo) return;
    var input = campo.querySelector('input'), span = campo.querySelector('span');
    var peticion = (campo._comPeticion = (campo._comPeticion || 0) + 1);
    var mismo = ensenada && ensenada.campo === campo && ensenada.fin === fin && ensenada.idioma === idioma();
    if (!mismo) {
      // Otra finalidad u otro idioma: otro texto, y la casilla vuelve a estar sin marcar.
      if (input) input.checked = false;
      if (ensenada && ensenada.campo === campo) ensenada = null;
      campo.classList.add('hide');
    }
    var d = await texto(fin);
    if (peticion !== campo._comPeticion) return;          // ya se pidió otra
    if (!d) { ocultar(campo); return; }
    if (span) span.textContent = d.texto;
    campo.classList.remove('hide');
    ensenada = { campo: campo, fin: fin, idioma: d.idioma || idioma() };
  }
  function ocultar(campo) {
    if (!campo) return;
    campo._comPeticion = (campo._comPeticion || 0) + 1;
    campo.classList.add('hide');
    var input = campo.querySelector('input'); if (input) input.checked = false;
    if (ensenada && ensenada.campo === campo) ensenada = null;
  }

  /* Al pulsar «crear cuenta». Si la casilla no se ve, no se apunta nada. */
  function apuntarAlta(email, fin, marcada) {
    if (!ensenada || ensenada.fin !== fin) { alta = null; return; }
    alta = { correo: correo(email), fin: fin, valor: !!marcada, idioma: ensenada.idioma };
  }
  function retirarAlta() { alta = null; }

  /* Ya con sesión: lo marcado en el alta, si es de esta cuenta. */
  async function guardarAlta(fin) {
    if (!alta || alta.fin !== fin) return false;
    var c = await cliente(); if (!c) return false;
    var s = await sesion(c);
    if (!s || !s.user || correo(s.user.email) !== alta.correo) return false;
    var a = alta; alta = null;
    return !!(await dar(fin, a.valor, 'alta_web', null, a.idioma));
  }

  /* ── Estilos del aviso y del bloque ────────────────────────── */
  var CSS = [
    '.bco-ov{position:fixed;inset:0;z-index:2147483300;display:flex;align-items:center;justify-content:center;',
    '  padding:20px;background:rgba(6,5,7,.82);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}',
    '.bco-card{position:relative;width:100%;max-width:440px;max-height:92vh;max-height:calc(100dvh - 40px);overflow-y:auto;',
    '  overscroll-behavior:contain;font-family:\'Jost\',system-ui,sans-serif;color:#F9F5EE;',
    '  background:linear-gradient(165deg,#241820,#0D0B0F);border:1px solid rgba(200,169,106,.22);',
    '  border-radius:12px;padding:30px 28px 22px;box-shadow:0 40px 90px -30px rgba(0,0,0,.9)}',
    '.bco-x{position:absolute;top:10px;right:12px;background:none;border:none;color:#8C7482;font-size:26px;',
    '  line-height:1;cursor:pointer;padding:4px 8px}',
    '.bco-x:hover{color:#F9F5EE}',
    '.bco-eyebrow{font-size:10.5px;letter-spacing:.4em;text-transform:uppercase;color:#C8A96A;font-weight:500}',
    '.bco-card h2{font-family:\'Cormorant Garamond\',serif;font-weight:400;font-size:28px;line-height:1.12;',
    '  color:#F9F5EE;margin:10px 0 10px;text-wrap:balance;overflow-wrap:anywhere}',
    '.bco-txt{color:#E8E0D5;font-size:13.5px;line-height:1.55;margin:0 0 10px;overflow-wrap:anywhere}',
    '.bco-nota{color:#8C7482;font-size:12px;line-height:1.5;margin:0 0 18px;overflow-wrap:anywhere}',
    '.bco-si{width:100%;border:none;border-radius:4px;padding:14px 12px;cursor:pointer;font-family:inherit;',
    '  font-size:13.5px;font-weight:600;color:#0D0B0F;background:linear-gradient(135deg,#8E723F,#F3E0BC 42%,#C9A96E 72%,#9C8050)}',
    '.bco-no{display:block;margin:12px auto 0;background:none;border:none;color:#8C7482;font-family:inherit;',
    '  font-size:13px;cursor:pointer;text-decoration:underline;text-underline-offset:3px}',
    '.bco-no:hover{color:#C8A96A}',
    '.bco-si:focus-visible,.bco-no:focus-visible,.bco-x:focus-visible{outline:2px solid #C8A96A;outline-offset:3px}',
    '.bco-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483301;max-width:calc(100% - 32px);',
    '  background:#1A1520;border:1px solid rgba(200,169,106,.3);color:#F9F5EE;border-radius:8px;padding:12px 16px;',
    '  font-family:\'Jost\',system-ui,sans-serif;font-size:13.5px;line-height:1.45;box-shadow:0 18px 40px -18px rgba(0,0,0,.8)}',
    '.bco-blq h2{margin-bottom:8px}',
    '.bco-blq .bco-txt{margin-bottom:14px}',
    '.bco-fila{display:flex;align-items:center;gap:12px;padding:11px 14px;margin-bottom:8px;border-radius:10px;',
    '  border:1px solid rgba(249,245,238,.1);background:rgba(255,255,255,.03)}',
    '.bco-fila.on{border-color:rgba(200,169,106,.35)}',
    '.bco-fila span{flex:1;min-width:0;font-size:14px;color:#F9F5EE;overflow-wrap:anywhere}',
    '.bco-sw{position:relative;width:42px;height:24px;flex:0 0 auto}',
    '.bco-sw input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer;z-index:1}',
    '.bco-sw i{position:absolute;inset:0;border-radius:24px;background:rgba(249,245,238,.18);transition:.2s}',
    '.bco-sw i:after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#F9F5EE;transition:.2s}',
    '.bco-sw input:checked+i{background:#C8A96A}',
    '.bco-sw input:checked+i:after{left:21px;background:#0D0B0F}',
    '.bco-sw input:disabled{cursor:default}.bco-sw input:disabled+i{opacity:.55}',
    '.bco-sw input:focus-visible+i{outline:2px solid #C8A96A;outline-offset:3px}',
    '.bco-msg{font-size:13px;line-height:1.5;color:#E0857C;min-height:1px;margin-top:6px}',
    '.bco-re{background:none;border:none;color:#C8A96A;font-family:inherit;font-size:13px;cursor:pointer;',
    '  text-decoration:underline;text-underline-offset:3px;padding:0;margin-left:6px}',
    '[dir=rtl] .bco-x{right:auto;left:12px}',
    '@media(max-width:420px){.bco-card{padding:26px 20px 20px}.bco-card h2{font-size:24px}}',
    '@media(prefers-reduced-motion:reduce){.bco-sw i,.bco-sw i:after{transition:none}}'
  ].join('');
  function estilos() {
    if (document.getElementById('bcoCss')) return;
    var st = document.createElement('style'); st.id = 'bcoCss'; st.textContent = CSS;
    document.head.appendChild(st);
  }
  function aviso(msg) {
    estilos();
    var v = document.getElementById('bcoToast');
    if (v) v.parentNode.removeChild(v);
    var d = document.createElement('div');
    d.className = 'bco-toast'; d.id = 'bcoToast'; d.setAttribute('role', 'status');
    d.textContent = msg;
    document.body.appendChild(d);
    setTimeout(function () { try { d.parentNode.removeChild(d); } catch (_) {} }, 4500);
  }
  function nota(fin) {
    return fin === 'profesional'
      ? t('com_nota_pro', 'Lo de tus servicios, tus reservas y tus pagos te llega siempre. Esto es solo lo comercial, y puedes cambiarlo cuando quieras.')
      : t('com_nota', 'Lo de tus reservas y tus pagos te llega siempre. Esto es solo lo comercial, y puedes cambiarlo cuando quieras.');
  }

  /* ── El aviso opcional (decisión 3) ─────────────────────────── */
  // Resuelve true («Sí»), false («Ahora no») o null (cerrado sin contestar).
  function preguntar(d, fin) {
    estilos();
    return new Promise(function (resolver) {
      var ov = document.createElement('div');
      ov.className = 'bco-ov'; ov.id = 'bcoOverlay';
      ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-labelledby', 'bcoT');
      ov.innerHTML =
        '<div class="bco-card">' +
          '<button class="bco-x" id="bcoX" type="button" aria-label="' + esc(t('com_cerrar', 'Cerrar')) + '">&times;</button>' +
          '<span class="bco-eyebrow">Babyloon</span>' +
          '<h2 id="bcoT">' + esc(t('com_aviso_t', '¿Te enviamos promociones y novedades?')) + '</h2>' +
          '<p class="bco-txt" id="bcoTexto">' + esc(d.texto) + '</p>' +
          '<p class="bco-nota">' + esc(nota(fin)) + '</p>' +
          '<button class="bco-si" id="bcoSi" type="button">' + esc(t('com_si', 'Sí, quiero recibirlas')) + '</button>' +
          '<button class="bco-no" id="bcoNo" type="button">' + esc(t('com_ahora_no', 'Ahora no')) + '</button>' +
        '</div>';
      document.body.appendChild(ov);
      var hecho = false;
      function fin_(v) {
        if (hecho) return; hecho = true;
        document.removeEventListener('keydown', tecla, true);
        try { ov.parentNode.removeChild(ov); } catch (_) {}
        resolver(v);
      }
      function tecla(e) { if (e.key === 'Escape') { e.preventDefault(); fin_(null); } }
      document.addEventListener('keydown', tecla, true);
      ov.addEventListener('click', function (e) { if (e.target === ov) fin_(null); });
      document.getElementById('bcoX').addEventListener('click', function () { fin_(null); });
      document.getElementById('bcoSi').addEventListener('click', function () { fin_(true); });
      document.getElementById('bcoNo').addEventListener('click', function () { fin_(false); });
      setTimeout(function () { try { document.getElementById('bcoSi').focus(); } catch (_) {} }, 60);
    });
  }

  function claveVisto(uid, fin) { return 'bbl_com_aviso_' + fin + '_' + uid; }
  function visto(uid, fin) { try { return localStorage.getItem(claveVisto(uid, fin)) === '1'; } catch (_) { return false; } }
  function marcarVisto(uid, fin) { try { localStorage.setItem(claveVisto(uid, fin), '1'); } catch (_) {} }

  async function avisoSiToca(fin) {
    var c = await cliente(); if (!c) return;
    var s = await sesion(c); if (!s || !s.user) return;
    var uid = s.user.id;
    if (visto(uid, fin)) return;
    var m = await mio(fin);
    if (!m || m.preguntar !== true) return;
    var tx = await texto(fin);
    if (tx) { m.texto = tx.texto; m.idioma = tx.idioma; }
    if (!String(m.texto || '').trim()) return;
    marcarVisto(uid, fin);
    var r = await preguntar(m, fin);
    if (r === null) return;                               // cerrado sin contestar: nada
    var ok = await dar(fin, r, 'aviso_web', null, m.idioma);
    aviso(!ok ? t('com_err_guardar', 'No se ha podido guardar. Inténtalo de nuevo.')
      : (r ? t('com_hecho_si', 'Hecho. Puedes cambiarlo en tu perfil cuando quieras.')
           : t('com_hecho_no', 'De acuerdo. Si cambias de idea, está en tu perfil.')));
  }

  /* ── El bloque del perfil (decisión 4) ──────────────────────── */
  // Todo lo de dentro se busca en la propia caja: si la página la quita
  // (el panel Pro, a quien aún no tiene ficha, pinta otra pantalla), no
  // se pinta nada ni falla nada.
  async function bloque(caja, fin) {
    if (!caja || !document.body.contains(caja)) return;
    estilos();
    caja.classList.add('bco-blq');
    var tit = '<h2 class="display">' + esc(t('com_titulo', 'Promociones y novedades')) + '</h2>';
    caja.innerHTML = tit + '<div class="loading">' + esc(t('cargando', 'Cargando…')) + '</div>';
    var todo = null, fallo = false;
    try { todo = await rpc('mis_consentimientos_comerciales', {}); } catch (_) { fallo = true; }
    var d = fallo ? null : deLaFinalidad(todo, fin);
    var tx = d ? await texto(fin) : null;
    if (!document.body.contains(caja)) return;
    if (!fallo && !d) { caja.innerHTML = ''; caja.classList.add('hide'); return; }   // no es de esta cuenta
    caja.classList.remove('hide');
    if (!d) {
      caja.innerHTML = tit + '<p class="bco-txt">' + esc(t('com_err_cargar', 'No se ha podido cargar. Inténtalo de nuevo.')) +
        '<button type="button" class="bco-re">' + esc(t('com_reintentar', 'Reintentar')) + '</button></p>';
      caja.querySelector('.bco-re').addEventListener('click', function () { bloque(caja, fin); });
      return;
    }
    if (tx) { d.texto = tx.texto; d.idioma = tx.idioma; }
    var canales = CANALES[fin] || CANALES.cliente;
    caja.innerHTML = tit +
      '<p class="bco-txt bco-btxt">' + esc(d.texto) + '</p>' +
      canales.map(function (c) {
        var on = otorgado(d, c);
        return '<label class="bco-fila' + (on ? ' on' : '') + '" data-canal="' + c + '">' +
          '<span>' + esc(t(NOMBRE_CANAL[c][0], NOMBRE_CANAL[c][1])) + '</span>' +
          '<span class="bco-sw"><input type="checkbox" role="switch" data-sw="' + c + '"' + (on ? ' checked' : '') + ' />' +
          '<i aria-hidden="true"></i></span></label>';
      }).join('') +
      '<p class="bco-nota" style="margin:8px 0 0">' + esc(nota(fin)) + '</p>' +
      '<div class="bco-msg" aria-live="polite"></div>';
    canales.forEach(function (c) {
      var input = caja.querySelector('[data-sw="' + c + '"]');
      input.addEventListener('change', async function () {
        var quiere = input.checked, msg = caja.querySelector('.bco-msg');
        msg.textContent = '';
        input.disabled = true;
        var r = await dar(fin, quiere, 'perfil_web', [c], d.idioma);
        input.disabled = false;
        if (!r) {
          input.checked = !quiere;                          // vuelve a como estaba
          msg.textContent = t('com_err_guardar', 'No se ha podido guardar. Inténtalo de nuevo.');
          return;
        }
        d.canales = r.canales;
        canales.forEach(function (x) {
          var on = otorgado(d, x), i = caja.querySelector('[data-sw="' + x + '"]');
          if (i) i.checked = on;
          var fila = caja.querySelector('[data-canal="' + x + '"]');
          if (fila) fila.classList.toggle('on', on);
        });
      });
    });
  }

  /* En un panel: espera a la edad y los textos (aceptacion.js), pinta el
     bloque del perfil y, si toca, el aviso. */
  async function enPanel(fin, caja) {
    if (window.BBLAceptacion) {
      try { if (!(await BBLAceptacion.asegurar({}))) return; } catch (_) {}
    }
    var c = await cliente(); if (!c) return;
    var s = await sesion(c); if (!s) return;
    if (caja) {
      bloque(caja, fin);
      // Otro idioma, otro texto: el bloque se vuelve a pintar con el suyo.
      document.addEventListener('bbl:lang', function () { bloque(caja, fin); });
    }
    avisoSiToca(fin);
  }

  window.BBLComercial = {
    canales: function (fin) { return (CANALES[fin] || []).slice(); },
    texto: texto, mio: mio, dar: dar,
    casilla: casilla, ocultar: ocultar,
    apuntarAlta: apuntarAlta, retirarAlta: retirarAlta, guardarAlta: guardarAlta,
    avisoSiToca: avisoSiToca, bloque: bloque, enPanel: enPanel
  };
  // Las páginas que cargan este fichero después de abrir el formulario
  // de acceso (auth.js lo trae cuando hace falta) se enteran así.
  try { document.dispatchEvent(new CustomEvent('bbl:comercial')); } catch (_) {}
})();
