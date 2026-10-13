/* ═══════════════════════════════════════════════════════════════
   Babyloon Web · La puerta
   ───────────────────────────────────────────────────────────────
   Hasta hoy sólo se podía entrar desde la portada: el modal de
   acceso vivía escrito dentro de index.html. Cualquier otra página
   que necesitara una sesión — la Academia, la Boutique, el regalo —
   tenía que mandar a la gente al inicio y perderla por el camino.

   Esto es ese mismo modal, una vez, para toda la web:

       BBLAuth.abrir({ modo:'entrar'|'alta', rol:'cliente'|'pro',
                       titulo:'…', sub:'…', alEntrar:fn })

   · Si se pasa `alEntrar`, se llama con la sesión y la página decide
     qué hacer (la Academia, por ejemplo, se recarga sola).
   · Si no, lleva al panel que le toque a esa cuenta.
   · Usa el cliente de Supabase que la página ya creó
     (window.__sbClient). No crea uno nuevo.
   · Los textos salen de BBL.t(): los 11 idiomas, como el resto.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (window.BBLAuth) return;

  var CSS = [
    '.bau-ov{position:fixed;inset:0;z-index:200;display:none;align-items:center;justify-content:center;',
    '  padding:20px;background:rgba(6,5,7,.86);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}',
    '.bau-ov.open{display:flex}',
    '.bau-card{width:100%;max-width:430px;max-height:92vh;overflow-y:auto;',
    '  background:linear-gradient(165deg,#241820,#0D0B0F);border:1px solid rgba(200,169,106,.22);',
    '  border-radius:12px;padding:30px 28px 26px;box-shadow:0 40px 90px -30px rgba(0,0,0,.9)}',
    '.bau-x{float:right;background:none;border:none;color:#8C7482;font-size:26px;line-height:1;cursor:pointer;margin:-8px -6px 0 0}',
    '.bau-x:hover{color:#F9F5EE}',
    '.bau-eyebrow{font-size:10.5px;letter-spacing:.4em;text-transform:uppercase;color:#C8A96A;font-weight:500}',
    '.bau-card h2{font-family:\'Cormorant Garamond\',serif;font-weight:400;font-size:29px;line-height:1.1;',
    '  color:#F9F5EE;margin:10px 0 6px;text-wrap:balance}',
    '.bau-card .bau-sub{color:#E8E0D5;font-size:13.5px;line-height:1.55;margin-bottom:20px}',
    '.bau-tabs{display:flex;gap:4px;background:rgba(0,0,0,.3);border:1px solid rgba(200,169,106,.16);',
    '  border-radius:24px;padding:4px;margin-bottom:18px}',
    '.bau-tabs button{flex:1;background:none;border:none;color:#E8E0D5;font-family:inherit;font-size:11.5px;',
    '  letter-spacing:.11em;text-transform:uppercase;padding:9px 6px;border-radius:20px;cursor:pointer;transition:.22s}',
    '.bau-tabs button.on{background:linear-gradient(135deg,#8E723F,#F3E0BC 42%,#C9A96E 72%,#9C8050);color:#0D0B0F;font-weight:600}',
    '.bau-roles{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}',
    '.bau-role{border:1px solid rgba(200,169,106,.16);border-radius:8px;padding:11px 12px;cursor:pointer;',
    '  background:rgba(0,0,0,.2);text-align:left;font-family:inherit;color:#E8E0D5;transition:.22s}',
    '.bau-role b{display:block;font-size:13px;color:#F9F5EE;font-weight:500;margin-bottom:2px}',
    '.bau-role span{font-size:11px;color:#8C7482;line-height:1.35;display:block}',
    '.bau-role.sel{border-color:#C8A96A;background:rgba(200,169,106,.09)}',
    '.bau-pass{position:relative;display:block}',
    '.bau-pass input{width:100%;padding-right:46px}',
    '.bau-ojo{position:absolute;top:50%;right:6px;transform:translateY(-50%);width:34px;height:34px;',
    '  background:none;border:none;cursor:pointer;color:#8C7482;display:flex;align-items:center;',
    '  justify-content:center;border-radius:50%;transition:.2s;padding:0}',
    '.bau-ojo:hover{color:#C8A96A}',
    '.bau-ojo svg{width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:1.6}',
    '.bau-olvide{background:none;border:none;color:#8C7482;font-family:inherit;font-size:12px;',
    '  cursor:pointer;padding:2px 0 0;text-align:left;display:block;text-decoration:underline;',
    '  text-underline-offset:3px}',
    '.bau-olvide:hover{color:#C8A96A}',
    '.bau-olvide.hide{display:none}',
    '.bau-f{margin-bottom:12px}',
    '.bau-f.hide{display:none}',
    '.bau-f label{display:block;font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:#8C7482;margin-bottom:6px}',
    '.bau-f input{width:100%;background:rgba(0,0,0,.3);border:1px solid rgba(200,169,106,.16);border-radius:6px;',
    '  padding:12px 13px;color:#F9F5EE;font-family:inherit;font-size:14.5px}',
    '.bau-f input:focus{outline:none;border-color:#C8A96A}',
    '.bau-go{width:100%;margin-top:6px;border:none;border-radius:4px;padding:14px;cursor:pointer;',
    '  font-family:inherit;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:#0D0B0F;',
    '  background:linear-gradient(135deg,#8E723F,#F3E0BC 42%,#C9A96E 72%,#9C8050);background-size:180% 180%;transition:.28s}',
    '.bau-go:hover{background-position:100% 0}',
    '.bau-go:disabled{opacity:.55;cursor:default}',
    '.bau-or{display:flex;align-items:center;gap:12px;margin:16px 0 12px;color:#6B5766;font-size:11px;',
    '  letter-spacing:.14em;text-transform:uppercase}',
    '.bau-or::before,.bau-or::after{content:"";flex:1;height:1px;background:rgba(249,245,238,.09)}',
    '.bau-g{width:100%;display:flex;align-items:center;justify-content:center;gap:9px;background:none;',
    '  border:1px solid rgba(200,169,106,.16);border-radius:4px;padding:12px;cursor:pointer;color:#E8E0D5;',
    '  font-family:inherit;font-size:13px;transition:.22s}',
    '.bau-g:hover{border-color:#C8A96A;color:#C8A96A}',
    '.bau-msg{font-size:13px;line-height:1.5;margin-top:14px;min-height:1px}',
    '.bau-msg.err{color:#E0857C}.bau-msg.ok{color:#9BC8A2}',
    '.bau-legal{font-size:11px;color:#6B5766;line-height:1.5;margin-top:14px}',
    '.bau-check{display:flex;gap:10px;align-items:flex-start;font-size:12.5px;color:#E8E0D5;line-height:1.5;',
    '  margin:2px 0 12px;cursor:pointer}',
    '.bau-check.hide{display:none}',
    '.bau-check input{margin:3px 0 0;width:16px;height:16px;flex:0 0 auto;accent-color:#C8A96A;cursor:pointer}',
    '.bau-check a{color:#C8A96A;text-decoration:underline;text-underline-offset:3px}',
    '.bau-legal a{color:#8C7482;text-decoration:underline}',
    '@media(max-width:420px){.bau-card{padding:24px 20px 22px}.bau-card h2{font-size:25px}.bau-roles{grid-template-columns:1fr}}',
    '@media(prefers-reduced-motion:reduce){.bau-ov *{transition:none!important}}'
  ].join('');

  var OJO_CERRADO = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
  var OJO_ABIERTO = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M2 12s3.8-7 10-7c2 0 3.7.6 5.1 1.4M22 12s-3.8 7-10 7c-2 0-3.7-.6-5.1-1.4"/>' +
    '<path d="M4 4l16 16"/></svg>';

  var ov = null, estado = { modo: 'entrar', rol: 'cliente', alEntrar: null, titulo: null, sub: null };

  function t(k, porDefecto) {
    try { var v = window.BBL && BBL.t(k); return (v && v !== k) ? v : porDefecto; }
    catch (_) { return porDefecto; }
  }

  function escapar(s) {
    return String(s == null ? '' : s).replace(/[<>&"]/g, function (c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
    });
  }

  function montar() {
    if (ov) return ov;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    ov = document.createElement('div');
    ov.className = 'bau-ov'; ov.id = 'bauOverlay';
    ov.innerHTML =
      '<div class="bau-card" role="dialog" aria-modal="true" aria-labelledby="bauTitle">' +
        '<button class="bau-x" id="bauClose" aria-label="Cerrar">&times;</button>' +
        '<span class="bau-eyebrow" id="bauEyebrow">Babyloon</span>' +
        '<h2 id="bauTitle"></h2>' +
        '<p class="bau-sub" id="bauSub"></p>' +
        '<div class="bau-tabs" id="bauTabs">' +
          '<button type="button" data-modo="entrar"></button>' +
          '<button type="button" data-modo="alta"></button>' +
        '</div>' +
        '<div class="bau-roles" id="bauRoles">' +
          '<button type="button" class="bau-role" data-rol="cliente"><b id="bauRolClienteT"></b><span id="bauRolClienteS"></span></button>' +
          '<button type="button" class="bau-role" data-rol="pro"><b id="bauRolProT"></b><span id="bauRolProS"></span></button>' +
        '</div>' +
        // Un <form> de verdad, y no tres campos sueltos. Esto no es
        // cosmética: los gestores de contraseñas del navegador —y el
        // de iOS y Android— sólo ofrecen GUARDAR la contraseña cuando
        // hay un formulario con `autocomplete` correcto que se envía.
        // Sin él, Andrés podía escribir la contraseña cien veces y el
        // teléfono no le ofrecía recordarla nunca. Eso es «recordar
        // contraseña» de verdad; lo demás es un checkbox decorativo.
        '<form id="bauForm" autocomplete="on" novalidate>' +
        '<div class="bau-f hide" id="bauNameF"><label for="bauName"></label><input id="bauName" type="text" autocomplete="name" /></div>' +
        '<div class="bau-f"><label for="bauEmail" id="bauEmailL"></label><input id="bauEmail" type="email" autocomplete="username email" inputmode="email" /></div>' +
        '<div class="bau-f"><label for="bauPass" id="bauPassL"></label>' +
          '<div class="bau-pass"><input id="bauPass" type="password" autocomplete="current-password" />' +
          '<button type="button" class="bau-ojo" id="bauOjo" aria-label="Ver contraseña"></button></div></div>' +
        '<button type="button" class="bau-olvide" id="bauOlvide"></button>' +
        // 61.5 · Crear la cuenta exige marcarla: 18 años y los dos textos.
        '<label class="bau-check hide" id="bauAceptaF"><input type="checkbox" id="bauAcepta" />' +
          '<span id="bauAceptaT"></span></label>' +
        '<button class="bau-go" id="bauGo" type="submit"></button>' +
        '</form>' +
        '<div class="bau-or" id="bauOr"></div>' +
        '<button class="bau-g" id="bauGoogle">' +
          '<svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">' +
          '<path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.8 2.6 13.6l7.8 6C12.3 13.6 17.6 9.5 24 9.5z"/>' +
          '<path fill="#4285F4" d="M46.5 24.5c0-1.6-.15-3.2-.44-4.7H24v9h12.7c-.55 2.9-2.2 5.4-4.7 7.1l7.4 5.7c4.3-4 6.8-9.9 6.8-17.1z"/>' +
          '<path fill="#FBBC05" d="M10.4 28.4a14.5 14.5 0 0 1 0-8.8l-7.8-6a23.5 23.5 0 0 0 0 20.8l7.8-6z"/>' +
          '<path fill="#34A853" d="M24 47.5c6.2 0 11.5-2 15.4-5.6l-7.4-5.7c-2 1.4-4.7 2.3-8 2.3-6.4 0-11.7-4.1-13.6-9.9l-7.8 6C6.5 42.2 14.6 47.5 24 47.5z"/>' +
          '</svg><span id="bauGoogleT"></span>' +
        '</button>' +
        '<div class="bau-msg" id="bauMsg"></div>' +
        '<div class="bau-legal" id="bauLegal"></div>' +
      '</div>';
    document.body.appendChild(ov);

    ov.addEventListener('click', function (e) { if (e.target === ov) cerrar(); });
    document.getElementById('bauClose').addEventListener('click', cerrar);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ov.classList.contains('open')) cerrar();
    });
    document.getElementById('bauTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-modo]'); if (!b) return; setModo(b.dataset.modo);
    });
    document.getElementById('bauRoles').addEventListener('click', function (e) {
      var b = e.target.closest('[data-rol]'); if (!b) return;
      estado.rol = b.dataset.rol;
      ov.querySelectorAll('.bau-role').forEach(function (x) { x.classList.toggle('sel', x === b); });
    });
    // El formulario se envía con Enter y con el botón. Un `submit` de
    // verdad es también lo que hace que el navegador ofrezca guardar
    // la contraseña.
    document.getElementById('bauForm').addEventListener('submit', function (e) {
      e.preventDefault(); enviar();
    });

    // Ver la contraseña. Con teclados de móvil y contraseñas largas,
    // escribir a ciegas es donde la gente se rinde.
    var ojo = document.getElementById('bauOjo');
    ojo.innerHTML = OJO_CERRADO;
    ojo.addEventListener('click', function () {
      var i = document.getElementById('bauPass');
      var ver = i.type === 'password';
      i.type = ver ? 'text' : 'password';
      ojo.innerHTML = ver ? OJO_ABIERTO : OJO_CERRADO;
      ojo.setAttribute('aria-label', t(ver ? 'au_ocultar' : 'au_ver', ver ? 'Ocultar contraseña' : 'Ver contraseña'));
      i.focus();
    });

    document.getElementById('bauOlvide').addEventListener('click', recuperar);
    ['bauEmail', 'bauPass', 'bauName'].forEach(function (id) {
      document.getElementById(id).addEventListener('keydown', function (e) {
        if (e.key === 'Enter') enviar();
      });
    });
    document.getElementById('bauGoogle').addEventListener('click', google);
    document.addEventListener('bbl:lang', function () { if (ov) pintar(); });
    return ov;
  }

  function pintar() {
    var alta = estado.modo === 'alta';
    var $ = function (id) { return document.getElementById(id); };
    $('bauTabs').children[0].textContent = t('au_tab_entrar', 'Entrar');
    $('bauTabs').children[1].textContent = t('au_tab_alta', 'Crear cuenta');
    Array.prototype.forEach.call($('bauTabs').children, function (b) {
      b.classList.toggle('on', b.dataset.modo === estado.modo);
    });
    $('bauTitle').textContent = estado.titulo || (alta ? t('au_alta_t', 'Crea tu cuenta') : t('au_entrar_t', 'Bienvenida de vuelta'));
    $('bauSub').textContent = estado.sub || (alta
      ? t('au_alta_s', 'Elige qué eres. Podrás cambiar de idea, pero cada puerta lleva a un sitio distinto.')
      : t('au_entrar_s2', 'Entra con tu correo. Si tu cuenta es las dos cosas, elige por dónde quieres entrar.'));
    // El selector se enseña también al entrar. Antes sólo salía al
    // registrarse, porque al entrar no se usaba para nada. Ahora sí:
    // es lo que decide a qué panel se va cuando la cuenta puede ser
    // las dos cosas.
    $('bauRoles').style.display = 'grid';
    $('bauRolClienteT').textContent = t('au_rol_cliente', 'Soy cliente');
    $('bauRolClienteS').textContent = t('au_rol_cliente_s', 'Quiero reservar servicios a domicilio.');
    $('bauRolProT').textContent = t('au_rol_pro', 'Soy profesional');
    $('bauRolProS').textContent = t('au_rol_pro_s', 'Trabajo en belleza y quiero clientes.');
    ov.querySelectorAll('.bau-role').forEach(function (x) {
      x.classList.toggle('sel', x.dataset.rol === estado.rol);
    });
    $('bauNameF').classList.toggle('hide', !alta);
    $('bauNameF').querySelector('label').textContent = t('au_nombre', 'Nombre');
    $('bauEmailL').textContent = t('auth_email', 'Correo');
    $('bauPassL').textContent = t('auth_pass', 'Contraseña');
    $('bauGo').textContent = alta ? t('au_tab_alta', 'Crear cuenta') : t('auth_enter', 'Entrar');
    // «He olvidado la contraseña» sólo tiene sentido al entrar.
    $('bauOlvide').classList.toggle('hide', alta);
    $('bauOlvide').textContent = t('au_olvide', '¿Has olvidado tu contraseña?');
    // Al crear cuenta la contraseña es NUEVA: decírselo al navegador
    // es lo que hace que ofrezca generar una y guardarla.
    $('bauPass').setAttribute('autocomplete', alta ? 'new-password' : 'current-password');
    $('bauOr').textContent = t('au_o', 'o');
    $('bauGoogleT').textContent = t('au_google', 'Continuar con Google');
    // El aviso legal se arma con piezas, no con un `replace` sobre la
    // frase: en 11 idiomas ningún replace acierta, y el que falla deja
    // el enlace sin poner justo donde hay que poderlo pulsar.
    // 61.5 · «Al crear la cuenta aceptas…» no era una aceptación: era un
    // aviso. Ahora es una casilla que hay que marcar, con los dos textos
    // enlazados, y se registra en el servidor con su hora y su IP.
    $('bauAceptaF').classList.toggle('hide', !alta);
    $('bauAceptaT').innerHTML = window.BBLAceptacion
      ? BBLAceptacion.casilla()
      : escapar(t('au_legal', 'Al crear la cuenta aceptas nuestras condiciones.')) +
        ' <a href="terminos.html" target="_blank" rel="noopener">' + escapar(t('au_terminos', 'Términos')) + '</a>' +
        ' · <a href="privacidad.html" target="_blank" rel="noopener">' + escapar(t('au_privacidad', 'Privacidad')) + '</a>';
    $('bauLegal').innerHTML = '';
  }

  function setModo(m) {
    estado.modo = (m === 'alta' || m === 'register') ? 'alta' : 'entrar';
    document.getElementById('bauMsg').textContent = '';
    document.getElementById('bauMsg').className = 'bau-msg';
    pintar();
  }

  function abrir(opts) {
    opts = opts || {};
    montar();
    estado.rol = opts.rol || estado.rol || 'cliente';
    estado.alEntrar = opts.alEntrar || null;
    estado.titulo = opts.titulo || null;
    estado.sub = opts.sub || null;
    setModo(opts.modo || 'entrar');
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { document.getElementById('bauEmail').focus(); }, 60);
    try { window.BBLPresencia && BBLPresencia.evento('acceso_abierto', { modo: estado.modo, rol: estado.rol }); } catch (_) {}
  }

  function cerrar() {
    if (!ov) return;
    ov.classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('bauMsg').textContent = '';
  }

  function sb() { return window.__sbClient || null; }

  function decir(texto, clase) {
    var m = document.getElementById('bauMsg');
    m.textContent = texto; m.className = 'bau-msg' + (clase ? ' ' + clase : '');
  }

  // Los errores de Supabase llegan en inglés. Aquí se dicen en el idioma
  // de quien mira, y sin contar de más: "correo o contraseña" nunca dice
  // cuál de los dos ha fallado.
  function traducir(m) {
    m = String(m || '');
    if (/Invalid login|Invalid credentials/i.test(m)) return t('auth_bad', 'Correo o contraseña incorrectos.');
    if (/already registered|already been registered/i.test(m)) return t('au_e_existe', 'Ese correo ya tiene cuenta. Entra con ella.');
    if (/Password should be|at least 6/i.test(m)) return t('au_e_pass', 'La contraseña necesita al menos 6 caracteres.');
    if (/Email not confirmed/i.test(m)) return t('au_e_sinconfirmar', 'Confirma tu correo antes de entrar. Mira tu bandeja.');
    if (/rate limit|too many/i.test(m)) return t('au_e_espera', 'Demasiados intentos. Prueba dentro de un minuto.');
    if (/valid email/i.test(m)) return t('au_e_correo', 'Ese correo no parece válido.');
    return m;
  }

  // A dónde va una cuenta cuando no hay `alEntrar`.
  //
  // Esto decía «al panel que le corresponde de verdad, no al que
  // eligió en el formulario», y era una decisión tomada a medias: en
  // Babyloon una cuenta PUEDE ser las dos cosas —la de Andrés lo es—,
  // y entonces elegir «Cliente» y aterrizar en el panel profesional no
  // es corregir al usuario, es contradecirlo sin decírselo.
  //
  // Ahora: si la cuenta puede ser las dos, manda lo que eligió. Si
  // sólo puede ser una, va a la que puede ser, porque no hay panel
  // profesional que enseñar a quien no tiene ficha.
  //
  // La sesión de una profesional puede ser su id en `professionals` o
  // su `user_id`, y `user_id` puede estar vacío: se preguntan los dos.
  /* ── EL FALLO GRAVE DEL 24 DE SEPTIEMBRE ──────────────────────────
     Andres entro con Google eligiendo CLIENTE, aterrizo bien en el panel
     de cliente, pulso un enlace del menu y su cuenta paso a ser la de
     PROFESIONAL. Sin avisar, y para siempre.

     La cadena, entera:

       1. El boton de Google mandaba a /cliente.html pero NO apuntaba en
          ningun sitio que habia elegido cliente.
       2. En la pagina siguiente, `montarBoton()` leia esa nota. No habia.
       3. Al no haberla, pasaba 'pro' por defecto.
       4. Y esta funcion, que solo tenia que CONTESTAR a donde iria,
          escribia la respuesta en `localStorage` como si el usuario la
          hubiera elegido.

     El error de fondo no es ninguno de los cuatro pasos: es que una
     funcion que se llama «destino» —una pregunta— tuviera efecto. Una
     funcion que contesta no cambia nada. Quien apunta la eleccion es
     quien la recibe del usuario, y solo esos dos sitios: el formulario
     de acceso y el boton de Google.

     Y el defecto de «no lo se» pasa a ser CLIENTE. Una cuenta que es las
     dos cosas y no ha elegido va a la parte que no tiene datos fiscales,
     ni saldo, ni agenda ajena. Equivocarse hacia el lado que ve menos. */
  async function destino(uid, elegido) {
    var c = sb(); if (!c) return 'cliente.html';
    var esPro = false;
    try {
      var r = await c.from('professionals').select('id').eq('id', uid).maybeSingle();
      if (r.data) esPro = true;
      if (!esPro) {
        r = await c.from('professionals').select('id').eq('user_id', uid).maybeSingle();
        if (r.data) esPro = true;
      }
    } catch (_) {}
    /* Quien ha pedido «Profesional» va a profesional.html: si tiene ficha, a su
       panel; si no, a la pantalla que se lo explica y le ofrece darse de alta.
       La ficha NUNCA se crea por elegir aquí (hace falta el formulario y aceptar
       las condiciones). Y se deja dicho si la ficha existe, para que lo que se
       RECUERDA sólo sea el panel profesional cuando lo es de verdad. */
    destino.esPro = esPro;
    return elegido === 'pro' ? 'profesional.html' : 'cliente.html';
  }

  /* Apuntar por donde entro. Se llama SOLO desde donde el usuario elige
     de verdad. Se expone para que lo use el boton de Google de la
     portada, que sale de la pagina antes de poder apuntar nada. */
  function recordarPanel(d) {
    try { localStorage.setItem('bbl_panel', d === 'profesional.html' ? 'profesional.html' : 'cliente.html'); }
    catch (_) {}
  }

  /* Recuperar la contraseña.
     Supabase manda un correo con un enlace que devuelve a la web con
     un token; `recuperar.html` es la pantalla que recoge ese token y
     pide la nueva. Aquí sólo se dispara el correo.

     Se dice SIEMPRE lo mismo, exista o no la cuenta. Contestar «ese
     correo no está registrado» le regala a cualquiera una forma de
     averiguar quién tiene cuenta en Babyloon probando correos. */
  async function recuperar() {
    var c = sb();
    if (!c) { decir(t('au_e_conn', 'No podemos conectar ahora mismo. Inténtalo en un momento.'), 'err'); return; }
    var email = document.getElementById('bauEmail').value.trim();
    if (!email) {
      decir(t('au_r_falta', 'Escribe tu correo arriba y vuelve a pulsar.'), 'err');
      document.getElementById('bauEmail').focus();
      return;
    }
    var b = document.getElementById('bauOlvide');
    b.disabled = true;
    decir(t('au_espera', 'Un momento…'), '');
    var espera = false;
    try {
      var r = await c.auth.resetPasswordForEmail(email, {
        redirectTo: location.origin + '/recuperar.html'
      });
      espera = !!(r && r.error && /second|seconds|rate|security purposes/i.test(r.error.message || ''));
    } catch (_) {}
    b.disabled = false;
    if (espera) { decir(t('au_r_espera', 'Espera un minuto antes de pedir otro.'), 'err'); return; }
    decir(t('au_r_enviado_v2', 'Si ese correo tiene cuenta, te hemos enviado un correo para cambiar la contraseña. Mira también el correo no deseado.') + ' ', 'ok');
    /* El correo trae un enlace y un código de 6 dígitos. El enlace sólo vale en
       el mismo navegador; el código, en cualquiera: se le deja el camino abierto. */
    var a = document.createElement('a');
    a.href = 'recuperar.html?email=' + encodeURIComponent(email);
    a.textContent = t('au_r_tengo', 'Ya tengo el código');
    a.style.cssText = 'color:#C8A96A;text-decoration:underline;text-underline-offset:3px';
    document.getElementById('bauMsg').appendChild(a);
  }

  async function enviar() {
    var c = sb();
    if (!c) { decir(t('au_e_conn', 'No podemos conectar ahora mismo. Inténtalo en un momento.'), 'err'); return; }
    var email = document.getElementById('bauEmail').value.trim();
    var pass = document.getElementById('bauPass').value;
    var go = document.getElementById('bauGo');
    if (!email || !pass) { decir(t('au_e_faltan', 'Introduce correo y contraseña.'), 'err'); return; }
    var alta = estado.modo === 'alta';
    if (alta && !document.getElementById('bauAcepta').checked) {
      decir(t('ac_e_alta', 'Para crear la cuenta hay que tener 18 años o más y aceptar los términos.'), 'err');
      document.getElementById('bauAcepta').focus();
      return;
    }
    go.disabled = true; decir(t('au_espera', 'Un momento…'), '');
    try {
      if (!alta) {
        var r = await c.auth.signInWithPassword({ email: email, password: pass });
        if (r.error) throw r.error;
        try { window.BBLPresencia && BBLPresencia.evento('sesion_iniciada', { desde: location.pathname }); } catch (_) {}
        await terminar(r.data.session);
      } else {
        var nombre = document.getElementById('bauName').value.trim();
        var s = await c.auth.signUp({
          email: email, password: pass,
          options: { data: { full_name: nombre, role: estado.rol === 'pro' ? 'pro' : 'client' } }
        });
        if (s.error) throw s.error;
        try { window.BBLPresencia && BBLPresencia.evento('registro', { rol: estado.rol, desde: location.pathname }); } catch (_) {}
        if (s.data.session) { await terminar(s.data.session); return; }
        decir(t('au_confirma', 'Cuenta creada. Confirma tu correo y vuelve a entrar.'), 'ok');
      }
    } catch (e) {
      decir(traducir(e && e.message), 'err');
    } finally {
      go.disabled = false; pintar();
    }
  }

  async function terminar(sesion) {
    // 61.5 · Antes de llevarla a ningún sitio: ¿le falta la edad o un
    // texto por aceptar? Si acaba de marcar la casilla del alta, se
    // registra sin volver a preguntar. Si elige salir, no se sigue.
    if (window.BBLAceptacion) {
      var acepta = document.getElementById('bauAcepta');
      var sigue = await BBLAceptacion.asegurar({
        forzar: true,
        casillaYaMarcada: estado.modo === 'alta' && !!(acepta && acepta.checked)
      });
      if (!sigue) return;
    }
    if (estado.alEntrar) {
      decir(t('au_entrando', 'Entrando…'), 'ok');
      var fn = estado.alEntrar;
      cerrar();
      try { await fn(sesion); } catch (_) {}
      return;
    }
    decir(t('au_entrando', 'Entrando…'), 'ok');
    var d = await destino(sesion && sesion.user && sesion.user.id, estado.rol);
    // Aqui SI se apunta: el usuario acaba de elegir con el selector.
    // (El panel profesional sólo se recuerda si la ficha ya existe.)
    recordarPanel(destino.esPro ? d : 'cliente.html');
    setTimeout(function () { location.href = d; }, 350);
  }

  async function google() {
    var c = sb();
    if (!c) { decir(t('au_e_conn', 'No podemos conectar ahora mismo. Inténtalo en un momento.'), 'err'); return; }
    /* SE APUNTA ANTES DE IRSE. Con Google el navegador abandona la
       pagina: si la eleccion no queda escrita aqui, al volver no hay
       forma de saber que eligio, y ese hueco es justo por donde se colo
       el cambio de cuenta del 24 de septiembre. */
    recordarPanel(estado.rol === 'pro' ? 'profesional.html' : 'cliente.html');
    try {
      // Google vuelve a ESTA página: quien entró desde la Academia se
      // queda en la Academia, ya con la puerta abierta.
      await c.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: location.origin + location.pathname }
      });
    } catch (_) {
      decir(t('au_e_google', 'Google no está disponible ahora mismo. Usa tu correo.'), 'err');
    }
  }

  window.BBLAuth = {
    abrir: abrir,
    cerrar: cerrar,
    // La usa el boton de Google de la portada, que tiene su propio
    // formulario pero el mismo problema: se va de la pagina.
    recordarPanel: recordarPanel,
    // Devuelve la sesión si la hay, sin abrir nada.
    sesion: async function () {
      var c = sb(); if (!c) return null;
      try { var r = await c.auth.getSession(); return r.data.session || null; } catch (_) { return null; }
    },
    salir: async function () {
      var c = sb(); if (!c) return;
      try { await c.auth.signOut(); } catch (_) {}
      location.reload();
    },
    // Pone "Entrar" o "Mi cuenta" en un botón, según haya sesión.
    montarBoton: async function (el) {
      if (!el) return;
      var s = await window.BBLAuth.sesion();
      if (!s) {
        el.textContent = t('nav_entrar', 'Acceder');
        el.onclick = function (e) { e.preventDefault(); abrir({ modo: 'entrar' }); };
        return;
      }
      el.textContent = t('nav_micuenta', 'Mi cuenta');
      var guardado = null; try { guardado = localStorage.getItem('bbl_panel'); } catch (_) {}
      // Solo 'pro' si esta escrito que eligio 'pro'. Antes era al reves:
      // cualquier cosa que no fuera exactamente 'cliente.html' —incluido
      // no haber nada— valia por 'pro'. Ahi empezaba el cambio de cuenta.
      var d = await destino(s.user.id, guardado === 'profesional.html' ? 'pro' : 'cliente');
      el.onclick = function (e) { e.preventDefault(); location.href = d; };
    }
  };

  /* ── El acceso, en todas las páginas ──────────────────────────────
     Medido a 390 px: de ocho páginas, SEIS no tenían forma de entrar.
     Ni en la cabecera ni en el menú de móvil. Novias, profesionales,
     regalo, lista de espera, academia y masterclass: se podía navegar
     entero el sitio desde el teléfono sin encontrar dónde iniciar
     sesión. Y dos de esas páginas ya cargaban este fichero: tenían el
     modal cargado y ningún botón que lo abriera.

     Se monta desde aquí y no página por página, por lo mismo que el
     selector de idioma: nueve cabeceras con la misma forma, un solo
     sitio donde arreglarlo.

     No se toca la página que ya tiene su propio acceso —portada y
     boutique tienen el suyo—: si hay un `[data-auth]` en la cabecera,
     este código no hace nada. */
  function montarAcceso() {
    try {
      if (document.querySelector('header [data-auth], header #loginBtn')) return;

      var grupo = document.querySelector('header .nav-right')
               || document.querySelector('header .nav-actions');
      var barra = grupo
               || document.querySelector('header .nav')
               || document.querySelector('header .wrap')
               || document.querySelector('header > div');
      if (!barra) return;

      var b = document.createElement('button');
      b.type = 'button';
      b.id = 'bblAcceso';
      b.className = 'bau-acceso';
      b.textContent = t('nav_entrar', 'Acceder');
      if (!grupo) b.style.marginLeft = 'auto';
      barra.appendChild(b);

      // Mismo cuidado que con el selector de idioma: si la barra no
      // podía con otro hijo, que se reparta en dos filas en vez de
      // salirse por el borde.
      // Se mide contra la PANTALLA, no contra el contenedor donde
      // acabamos de meterlo: si lo metemos dentro de `.nav-right`, el
      // botón nunca va a "salirse" de `.nav-right`, porque está
      // dentro. La primera versión hacía justo eso y por eso la
      // academia seguía desbordando 15 px a 390.
      // Y se envuelve la barra EXTERIOR, que es la que puede partirse
      // en dos filas; `.nav-right` es sólo el grupo de la derecha.
      var fuera = grupo ? (document.querySelector('header .nav')
                        || document.querySelector('header .wrap')
                        || barra.parentElement || barra) : barra;

      /* 32.7 · Esto se medía UNA VEZ, al montar el botón, con la
         etiqueta de ese instante: «Acceder». Al cambiar de idioma se le
         reescribía el texto y nadie volvía a medir, así que en griego
         —«Ο λογαριασμός μου»— la academia desbordaba 14 px y nadie se
         enteraba. Es el mismo error que los estados de las cuentas:
         medir una vez, en el momento equivocado.

         Ahora se mide al montar y en CADA cambio de idioma. Y si aun
         partiendo la barra en dos filas no cabe, el botón deja de ser
         `nowrap` y se parte él: mejor un botón de dos líneas que una
         página que se va de lado. */
      function acomodar() {
        try {
          b.style.whiteSpace = '';
          var ancho = document.documentElement.clientWidth;
          if (b.getBoundingClientRect().right <= ancho - 6) return;
          if (getComputedStyle(fuera).display.indexOf('flex') >= 0) {
            fuera.style.flexWrap = 'wrap';
            if (!fuera.style.rowGap) fuera.style.rowGap = '8px';
          }
          if (grupo && getComputedStyle(grupo).display.indexOf('flex') >= 0) {
            grupo.style.flexWrap = 'wrap';
            grupo.style.justifyContent = 'flex-end';
          }
          b.style.marginLeft = '';
          // Segunda medida: ya en dos filas. Si sigue sin caber, que el
          // botón se parta.
          if (b.getBoundingClientRect().right > ancho - 6) {
            b.style.whiteSpace = 'normal';
            b.style.maxWidth = '100%';
          }
        } catch (_) { /* la caja nunca tumba la página */ }
      }

      window.BBLAuth.montarBoton(b);
      acomodar();
      document.addEventListener('bbl:lang', function () {
        window.BBLAuth.montarBoton(b);
        // El texto lo cambia `montarBoton`, así que se mide después.
        setTimeout(acomodar, 0);
      });
      window.addEventListener('resize', acomodar);
    } catch (_) { /* nunca por un botón se cae una página */ }
  }

  var CSS_ACCESO =
    '.bau-acceso{font-family:\'Jost\',system-ui,sans-serif;font-size:12px;letter-spacing:.12em;' +
    '  text-transform:uppercase;color:#E8E0D5;background:none;cursor:pointer;white-space:nowrap;' +
    '  border:1px solid rgba(200,169,106,.3);padding:9px 16px;border-radius:22px;transition:.25s}' +
    '.bau-acceso:hover{border-color:#C8A96A;color:#C8A96A}';

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', function () {
      var s = document.createElement('style'); s.textContent = CSS_ACCESO;
      document.head.appendChild(s); montarAcceso();
    });
  else {
    var s0 = document.createElement('style'); s0.textContent = CSS_ACCESO;
    document.head.appendChild(s0); montarAcceso();
  }
})();
