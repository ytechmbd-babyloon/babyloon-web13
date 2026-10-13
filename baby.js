/* ═══════════════════════════════════════════════════════════════
   Babyloon Web · Baby
   ───────────────────────────────────────────────────────────────
   Baby ya vivía dentro de las dos apps. En la web no estaba, que es
   justo donde llega quien todavía no sabe qué es Babyloon.

   Aquí distingue tres personas, y la diferencia NO la decide esta
   página: la decide el servidor.

     · VISITANTE  → `baby-web`. Tres herramientas: el manual público,
       las ciudades y el catálogo. Las herramientas de datos
       personales no existen en ese archivo, así que no hay condición
       que pueda equivocarse. Su trabajo es que la persona entienda
       qué es Babyloon y, si le encaja, dé el paso.
     · CLIENTA    → `baby-chat` con su sesión. Sus reservas, sus
       pedidos, su monedero, consejo de producto.
     · PROFESIONAL→ `baby-chat` con su sesión. Su agenda, sus
       ganancias, su perfil.

   Quién es cada cual lo dice `quien_soy()`, y `baby-chat` vuelve a
   comprobarlo contra la base con el JWT en la mano: mandar
   `app:'pro'` sin ser profesional no abre ninguna puerta.

   Se cuelga sola. Basta con:  <script src="baby.js"></script>
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (window.BBLBaby) return;

  var SUPABASE_URL = "https://qphatjblvojnfyghwmjy.supabase.co";
  var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaGF0amJsdm9qbmZ5Z2h3bWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTUyNTksImV4cCI6MjA5NDMzMTI1OX0.fd_maoPBLGKAGHqOcsmcAKWbTl_a0962TpV57f7u0ik";
  var MAX = 1200;

  function t(k, d) {
    try { var v = window.BBL && BBL.t(k); return (v && v !== k) ? v : d; }
    catch (_) { return d; }
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[<>&"]/g, function (c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
    });
  }
  // Baby escribe en prosa, no en HTML. Se respetan los saltos de línea
  // y poco más: todo lo demás va escapado.
  function texto(s) {
    return esc(s).replace(/\n{2,}/g, '<br><br>').replace(/\n/g, '<br>');
  }

  function cliente() {
    if (window.__sbClient) return window.__sbClient;
    if (window.supabase && window.supabase.createClient) {
      window.__sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      return window.__sbClient;
    }
    return null;
  }

  var CSS = [
    '#bbl-baby-btn{position:fixed;right:20px;bottom:20px;z-index:2147482000;display:flex;align-items:center;',
    '  gap:9px;border:1px solid rgba(200,169,106,.4);border-radius:30px;padding:11px 18px 11px 14px;cursor:pointer;',
    '  background:rgba(13,11,15,.9);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);color:#F9F5EE;',
    "  font-family:'Jost',system-ui,sans-serif;font-size:13px;font-weight:400;letter-spacing:.04em;",
    '  box-shadow:0 16px 40px -18px rgba(0,0,0,.95);transition:.26s}',
    '#bbl-baby-btn:hover{border-color:#C8A96A;color:#C8A96A;transform:translateY(-2px)}',
    '#bbl-baby-btn .dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#F3E0BC,#C8A96A);flex-shrink:0}',
    '#bbl-baby-btn.hide{display:none}',
    '#bbl-baby{position:fixed;right:20px;bottom:20px;z-index:2147482100;width:min(390px,calc(100vw - 32px));',
    /* `dvh` es la altura de la ventana DESCONTANDO la barra del navegador,
       que es justo lo que hace falta en un movil. Pero Safari no lo
       entiende hasta la 15.4, y una unidad que el navegador no entiende
       TIRA LA DECLARACION ENTERA: la ventana de Baby se quedaria con
       `height:auto` y se desplomaria. Se pone antes la version con `vh`,
       que entiende todo el mundo, y el navegador que sepa la pisa. */
    '  height:min(600px,calc(100vh - 40px));',
    '  height:min(600px,calc(100dvh - 40px));display:none;flex-direction:column;overflow:hidden;',
    '  background:linear-gradient(168deg,#241820,#0D0B0F 58%);border:1px solid rgba(200,169,106,.22);',
    '  border-radius:14px;box-shadow:0 40px 90px -30px rgba(0,0,0,.95);',
    "  font-family:'Jost',system-ui,sans-serif;color:#F9F5EE}",
    '#bbl-baby.open{display:flex}',
    '#bbl-baby .bb-head{display:flex;align-items:center;gap:11px;padding:15px 16px;',
    '  border-bottom:1px solid rgba(249,245,238,.07);flex-shrink:0}',
    '#bbl-baby .bb-av{width:34px;height:34px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;',
    '  justify-content:center;background:radial-gradient(circle at 30% 25%,rgba(243,224,188,.35),rgba(200,169,106,.12));',
    '  border:1px solid rgba(200,169,106,.35)}',
    '#bbl-baby .bb-av svg{width:19px;height:10px}',
    '#bbl-baby .bb-av path{stroke:#F3E0BC;stroke-width:4;fill:none;stroke-linecap:round;stroke-linejoin:round}',
    "#bbl-baby .bb-who{flex:1;min-width:0;line-height:1.25}",
    "#bbl-baby .bb-who b{display:block;font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:500}",
    '#bbl-baby .bb-who span{display:block;font-size:11px;color:#8C7482;letter-spacing:.06em}',
    '#bbl-baby .bb-x{background:none;border:none;color:#8C7482;font-size:24px;line-height:1;cursor:pointer;padding:0 2px}',
    '#bbl-baby .bb-x:hover{color:#F9F5EE}',
    '#bbl-baby .bb-list{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:11px;',
    '  overscroll-behavior:contain}',
    '#bbl-baby .bb-m{max-width:88%;font-size:14px;line-height:1.55;border-radius:12px;padding:10px 13px;overflow-wrap:anywhere}',
    '#bbl-baby .bb-m.baby{align-self:flex-start;background:rgba(249,245,238,.06);border:1px solid rgba(249,245,238,.07);',
    '  border-bottom-left-radius:3px;color:#E8E0D5}',
    '#bbl-baby .bb-m.yo{align-self:flex-end;background:rgba(200,169,106,.14);border:1px solid rgba(200,169,106,.26);',
    '  border-bottom-right-radius:3px;color:#F9F5EE}',
    '#bbl-baby .bb-m.err{align-self:flex-start;color:#E0857C;background:rgba(224,133,124,.08);border-color:rgba(224,133,124,.25)}',
    '#bbl-baby .bb-dots{align-self:flex-start;display:flex;gap:4px;padding:12px 14px}',
    '#bbl-baby .bb-dots i{width:6px;height:6px;border-radius:50%;background:#8C7482;animation:bbp 1.1s infinite}',
    '#bbl-baby .bb-dots i:nth-child(2){animation-delay:.16s}#bbl-baby .bb-dots i:nth-child(3){animation-delay:.32s}',
    '@keyframes bbp{0%,60%,100%{opacity:.25}30%{opacity:1}}',
    '#bbl-baby .bb-chips{display:flex;gap:7px;flex-wrap:wrap;padding:0 16px 12px}',
    '#bbl-baby .bb-chips button{background:none;border:1px solid rgba(200,169,106,.22);border-radius:18px;',
    "  padding:8px 13px;color:#E8E0D5;font-family:'Jost',system-ui,sans-serif;font-size:12.5px;cursor:pointer;transition:.22s;text-align:left}",
    '#bbl-baby .bb-chips button:hover{border-color:#C8A96A;color:#C8A96A}',
    '#bbl-baby .bb-foot{border-top:1px solid rgba(249,245,238,.07);padding:11px 12px 12px;flex-shrink:0}',
    '#bbl-baby .bb-row{display:flex;gap:8px;align-items:flex-end}',
    '#bbl-baby textarea{flex:1;background:rgba(0,0,0,.32);border:1px solid rgba(200,169,106,.18);border-radius:9px;',
    "  padding:11px 12px;color:#F9F5EE;font-family:'Jost',system-ui,sans-serif;font-size:14px;resize:none;",
    '  min-height:44px;max-height:120px;line-height:1.4}',
    '#bbl-baby textarea:focus{outline:none;border-color:#C8A96A}',
    '#bbl-baby .bb-send{width:44px;height:44px;flex-shrink:0;border:none;border-radius:9px;cursor:pointer;',
    '  background:linear-gradient(135deg,#8E723F,#F3E0BC 42%,#C9A96E 72%,#9C8050);color:#0D0B0F;',
    '  display:flex;align-items:center;justify-content:center;transition:.24s}',
    '#bbl-baby .bb-send:disabled{opacity:.45;cursor:default}',
    '#bbl-baby .bb-legal{font-size:10.5px;color:#6B5766;text-align:center;margin-top:8px;line-height:1.4}',
    '@media(max-width:520px){',
    '  #bbl-baby{right:8px;left:8px;bottom:8px;width:auto;height:min(78vh,620px)}',
    '  #bbl-baby{height:min(78dvh,620px)}',
    '  #bbl-baby-btn{right:14px;bottom:14px}}',
    '@media(prefers-reduced-motion:reduce){#bbl-baby *,#bbl-baby-btn{animation:none!important;transition:none!important}}'
  ].join('');

  var panel = null, btn = null, listEl = null, inputEl = null, sendEl = null, chipsEl = null;
  var ROL = 'visitante', NOMBRE = '', historia = [], enviando = false, montado = false;
  var K_HIST = 'bbl_baby_hist';

  function pagina() {
    var p = (location.pathname || '').split('/').pop() || 'index.html';
    return p.replace(/\.html$/, '');
  }

  function sesionPresencia() {
    try {
      if (window.BBLPresencia && BBLPresencia.sesion()) return BBLPresencia.sesion();
    } catch (_) {}
    // Si presencia.js no está (o el visitante rechazó cookies y aún no ha
    // generado id), Baby se fabrica uno de usar y tirar: el freno de
    // `baby_puede_hablar` necesita algo con lo que contar.
    try {
      var s = sessionStorage.getItem('bbl_baby_ses');
      if (s) return s;
      var a = new Uint8Array(16); crypto.getRandomValues(a);
      s = Array.from(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
      sessionStorage.setItem('bbl_baby_ses', s);
      return s;
    } catch (_) {
      return (Date.now().toString(36) + Math.random().toString(36).slice(2, 12));
    }
  }

  function guardar() {
    try { sessionStorage.setItem(K_HIST, JSON.stringify(historia.slice(-24))); } catch (_) {}
  }
  function recuperar() {
    try {
      var h = JSON.parse(sessionStorage.getItem(K_HIST) || '[]');
      if (Array.isArray(h)) historia = h;
    } catch (_) { historia = []; }
  }

  function montar() {
    if (montado) return;
    montado = true;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

    btn = document.createElement('button');
    btn.id = 'bbl-baby-btn'; btn.type = 'button';
    btn.innerHTML = '<span class="dot"></span><span class="et"></span>';
    btn.addEventListener('click', abrir);
    document.body.appendChild(btn);

    panel = document.createElement('div');
    panel.id = 'bbl-baby';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Baby');
    panel.innerHTML =
      '<div class="bb-head">' +
        '<div class="bb-av"><svg viewBox="0 0 120 60" aria-hidden="true"><path d="M60 30C60 16 48 8 34 8C18 8 8 18 8 30C8 42 18 52 34 52C48 52 60 44 60 30C60 16 72 8 86 8C102 8 112 18 112 30C112 42 102 52 86 52C72 52 60 44 60 30Z"/></svg></div>' +
        '<div class="bb-who"><b>Baby</b><span id="bbSub"></span></div>' +
        '<button class="bb-x" id="bbX" type="button" aria-label="Cerrar">&times;</button>' +
      '</div>' +
      '<div class="bb-list" id="bbList"></div>' +
      '<div class="bb-chips" id="bbChips"></div>' +
      '<div class="bb-foot">' +
        '<div class="bb-row">' +
          '<textarea id="bbInput" rows="1" maxlength="' + MAX + '"></textarea>' +
          '<button class="bb-send" id="bbSend" type="button" aria-label="Enviar">' +
            '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="bb-legal" id="bbLegal"></div>' +
      '</div>';
    document.body.appendChild(panel);

    listEl = document.getElementById('bbList');
    inputEl = document.getElementById('bbInput');
    sendEl = document.getElementById('bbSend');
    chipsEl = document.getElementById('bbChips');

    document.getElementById('bbX').addEventListener('click', cerrar);
    sendEl.addEventListener('click', function () { enviar(inputEl.value); });
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(inputEl.value); }
    });
    inputEl.addEventListener('input', function () {
      inputEl.style.height = 'auto';
      inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) cerrar();
    });
    chipsEl.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      enviar(b.textContent);
    });
    document.addEventListener('bbl:lang', textos);
    textos();
  }

  function textos() {
    if (!montado) return;
    btn.querySelector('.et').textContent = t('bb_abrir', 'Hablar con Baby');
    document.getElementById('bbSub').textContent =
      ROL === 'profesional' ? t('bb_sub_pro', 'Tu agenda y tus ganancias')
      : ROL === 'cliente'   ? t('bb_sub_cliente', 'Tus reservas y tus pedidos')
      :                       t('bb_sub_visitante', 'Te cuento qué es Babyloon');
    inputEl.setAttribute('placeholder', t('bb_ph', 'Escribe a Baby…'));
    document.getElementById('bbLegal').textContent =
      t('bb_legal', 'Baby es una asistente automática. No le des datos de pago.');
    pintarChips();
    if (!historia.length) pintar();
  }

  function saludo() {
    if (ROL === 'profesional') {
      return NOMBRE ? t('bb_saludo_pro', 'Hola, {n}. Tengo tu agenda, tus ganancias y tu perfil a mano. ¿Por dónde empezamos?').replace('{n}', NOMBRE)
                    : t('bb_saludo_pro_sin', 'Hola. Tengo tu agenda, tus ganancias y tu perfil a mano. ¿Por dónde empezamos?');
    }
    if (ROL === 'cliente') {
      return NOMBRE ? t('bb_saludo_cliente', 'Hola, {n}. Puedo mirar tus reservas y tus pedidos, y ayudarte a elegir. ¿Qué necesitas?').replace('{n}', NOMBRE)
                    : t('bb_saludo_cliente_sin', 'Hola. Puedo mirar tus reservas y tus pedidos, y ayudarte a elegir. ¿Qué necesitas?');
    }
    return t('bb_saludo_visitante', 'Soy Baby. Te cuento qué es Babyloon en dos frases, o te resuelvo la duda que traigas.');
  }

  function chips() {
    if (ROL === 'profesional') return [
      t('bb_chip_p1', '¿Qué tengo esta semana?'),
      t('bb_chip_p2', '¿Cuánto he ganado?'),
      t('bb_chip_p3', '¿Por qué no me llegan solicitudes?')];
    if (ROL === 'cliente') return [
      t('bb_chip_c1', '¿Qué citas tengo?'),
      t('bb_chip_c2', '¿Dónde está mi pedido?'),
      t('bb_chip_c3', 'Recomiéndame algo para mi piel')];
    return [
      t('bb_chip_v1', '¿Qué es Babyloon?'),
      t('bb_chip_v2', '¿Trabajáis en mi ciudad?'),
      t('bb_chip_v3', 'Soy profesional, ¿cómo entro?')];
  }

  function pintarChips() {
    if (!chipsEl) return;
    // Los atajos sólo mientras no haya conversación: después estorban.
    chipsEl.innerHTML = historia.length ? '' :
      chips().map(function (c) { return '<button type="button">' + esc(c) + '</button>'; }).join('');
  }

  function pintar() {
    if (!listEl) return;
    var html = '<div class="bb-m baby">' + texto(saludo()) + '</div>';
    html += historia.map(function (m) {
      return '<div class="bb-m ' + (m.r === 'user' ? 'yo' : (m.r === 'err' ? 'err baby' : 'baby')) + '">' +
             texto(m.c) + '</div>';
    }).join('');
    if (enviando) html += '<div class="bb-dots"><i></i><i></i><i></i></div>';
    listEl.innerHTML = html;
    listEl.scrollTop = listEl.scrollHeight;
  }

  function abrir() {
    montar();
    panel.classList.add('open');
    btn.classList.add('hide');
    pintar(); pintarChips();
    setTimeout(function () { inputEl.focus(); }, 80);
    try { window.BBLPresencia && BBLPresencia.evento('baby_abierta', { rol: ROL, pagina: pagina() }); } catch (_) {}
  }
  function cerrar() {
    if (!panel) return;
    panel.classList.remove('open');
    btn.classList.remove('hide');
  }

  async function enviar(txt) {
    txt = (txt || '').toString().trim().slice(0, MAX);
    if (!txt || enviando) return;
    var sb = cliente();
    if (!sb) { return; }
    historia.push({ r: 'user', c: txt });
    inputEl.value = ''; inputEl.style.height = 'auto';
    enviando = true; sendEl.disabled = true;
    pintar(); pintarChips(); guardar();

    var lang = (window.BBL && BBL.lang) || 'es';
    try {
      var res;
      if (ROL === 'cliente' || ROL === 'profesional') {
        // Con sesión: baby-chat. El rol que mandamos es una pista; la
        // función vuelve a comprobarlo contra la base con el JWT.
        res = await sb.functions.invoke('baby-chat', {
          body: { message: txt, app: ROL === 'profesional' ? 'pro' : 'client', lang: lang }
        });
      } else {
        res = await sb.functions.invoke('baby-web', {
          body: { message: txt, session: sesionPresencia(), page: pagina(), lang: lang }
        });
      }
      var d = res && res.data;
      if (res && res.error) throw res.error;
      if (d && d.reply) historia.push({ r: 'baby', c: d.reply });
      else if (d && d.error) historia.push({ r: 'err', c: d.error });
      else historia.push({ r: 'err', c: t('bb_error', 'No he podido responder. Inténtalo otra vez en un momento.') });
    } catch (e) {
      historia.push({ r: 'err', c: t('bb_error', 'No he podido responder. Inténtalo otra vez en un momento.') });
    } finally {
      enviando = false; sendEl.disabled = false;
      pintar(); guardar();
      try { inputEl.focus(); } catch (_) {}
    }
  }

  // ── Quién está mirando ───────────────────────────────────────────
  async function quienSoy() {
    var sb = cliente();
    if (!sb) return;
    try {
      var r = await sb.rpc('quien_soy');
      var q = r && r.data;
      if (q && q.es_profesional) ROL = 'profesional';
      else if (q && q.es_cliente) ROL = 'cliente';
      else ROL = 'visitante';
      NOMBRE = (q && q.nombre) || '';
    } catch (_) { ROL = 'visitante'; NOMBRE = ''; }
    if (montado) textos();
  }

  function arrancar() {
    recuperar();
    montar();
    quienSoy();
    // Si la persona ya estaba hablando con Baby en esta pestaña, se le
    // devuelve la conversación abierta al cambiar de página.
    try { if (sessionStorage.getItem('bbl_baby_open') === '1') abrir(); } catch (_) {}
    window.addEventListener('beforeunload', function () {
      try { sessionStorage.setItem('bbl_baby_open',
        panel && panel.classList.contains('open') ? '1' : '0'); } catch (_) {}
    });
  }

  window.BBLBaby = {
    abrir: abrir, cerrar: cerrar,
    rol: function () { return ROL; },
    // Para abrir a Baby desde cualquier botón de la web con un mensaje ya
    // escrito: BBLBaby.preguntar('¿Trabajáis en Tokio?')
    preguntar: function (m) { abrir(); enviar(m); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arrancar);
  } else { arrancar(); }
})();
