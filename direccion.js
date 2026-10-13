/* ═══════════════════════════════════════════════════════════════════════
   direccion.js · Babyloon · bloque 24.1

   POR QUÉ EXISTE
   El checkout cargaba el JavaScript de Google Maps para autocompletar la
   dirección. Andrés retiró Google del proyecto, así que esa etiqueta pasó
   a contestar con un cartel encima del formulario:

       «Esta página no puede cargar Google Maps correctamente»

   …y el campo de dirección dejó de sugerir nada. Lo mismo, a la vez, en
   las dos apps.

   QUÉ HACE AHORA
   Habla con la MISMA función del servidor que usan las apps,
   `places-autocomplete`, que por dentro ya no pregunta a Google sino a
   Photon —el buscador de direcciones de OpenStreetMap—. Una sola puerta
   para las tres superficies: el día que cambiemos de proveedor se cambia
   ahí y aquí no hay que tocar nada.

   TRES DECISIONES QUE NO SON OBVIAS

   1. NO SE BUSCA EN CADA TECLA. Se espera a que pare de escribir (300 ms)
      y se pide a partir de tres letras. Escribir una dirección entera son
      unas treinta pulsaciones; sin freno serían treinta búsquedas para
      una sola dirección, y la instancia pública que usamos es de
      cortesía.

   2. LAS RESPUESTAS LLEGAN DESORDENADAS. Si escribes rápido, la búsqueda
      de «Ricardo» puede llegar DESPUÉS que la de «Ricardo Soriano» y
      pisarla. Cada petición lleva número y sólo se pinta la última: es un
      fallo que no se ve en pruebas y sí en un móvil con mala cobertura.

   3. NO PISA LO QUE YA HAY ESCRITO. Al elegir una sugerencia se rellenan
      ciudad, provincia y código postal, pero si alguien ya había escrito
      algo ahí, se respeta. Corregir un formulario que te borra lo que
      acabas de escribir es peor que no tener autocompletado.

   ACCESIBLE DE VERDAD: flechas para moverse, Enter para elegir, Esc para
   cerrar, `aria-activedescendant` para que un lector de pantalla diga en
   voz alta la sugerencia marcada. El campo sigue siendo un `input`
   normal: quien no quiera sugerencias escribe y ya está.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ESTILOS_PUESTOS = false;

  function ponEstilos() {
    if (ESTILOS_PUESTOS) return;
    ESTILOS_PUESTOS = true;
    var st = document.createElement('style');
    st.id = 'bbl-dir-estilos';
    st.textContent =
      '.bbl-dir-caja{position:relative}' +
      '.bbl-dir-lista{position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:80;' +
        'background:var(--plum,#241820);border:1px solid var(--line,rgba(200,169,106,.22));' +
        'border-radius:10px;padding:5px;margin:0;list-style:none;' +
        'box-shadow:0 24px 60px -24px rgba(0,0,0,.85);' +
        'max-height:min(52vh,320px);overflow-y:auto;-webkit-overflow-scrolling:touch}' +
      '.bbl-dir-lista[hidden]{display:none}' +
      '.bbl-dir-op{padding:9px 11px;border-radius:7px;cursor:pointer;' +
        'font-family:var(--sans,system-ui,sans-serif);line-height:1.3}' +
      '.bbl-dir-op b{display:block;font-weight:500;font-size:13.5px;color:var(--cream,#F9F5EE)}' +
      '.bbl-dir-op span{display:block;font-size:11.5px;color:var(--mauve,#9B8AA0);margin-top:2px}' +
      '.bbl-dir-op.on,.bbl-dir-op:hover{background:rgba(200,169,106,.10)}' +
      '.bbl-dir-op.on b,.bbl-dir-op:hover b{color:var(--gold,#C8A96A)}' +
      '.bbl-dir-nota{padding:9px 11px;font-size:12px;color:var(--mauve,#9B8AA0);' +
        'font-family:var(--sans,system-ui,sans-serif)}' +
      /* El renglón de «sigo buscando» va DEBAJO de las sugerencias, así que
         tiene que leerse como un pie y no como una opción más: más pequeño,
         separado por una línea, y con el cursor normal para que no invite a
         pulsarlo. Bloque 52.6. */
      '.bbl-dir-mas{border-top:1px solid var(--line,rgba(200,169,106,.14));' +
        'margin-top:3px;padding-top:8px;font-size:11px;letter-spacing:.02em;' +
        'opacity:.85;cursor:default}';
    document.head.appendChild(st);
  }

  function esc(s) {
    if (window.escAttr) return window.escAttr(s);
    return (s === null || s === undefined ? '' : String(s))
      .replace(/[<>&"']/g, function (c) {
        return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c];
      });
  }

  function t(clave, respaldo) {
    try {
      var s = window.BBL && BBL.t && BBL.t(clave);
      return (s && s !== clave) ? s : respaldo;
    } catch (_) { return respaldo; }
  }

  /* opciones:
       sb        cliente de supabase (obligatorio)
       input     el <input> de la calle (obligatorio)
       ciudad / provincia / cp / pais   elementos donde volcar el resto
       paisActual()  función que devuelve el ISO al que se envía, si se sabe  */
  function monta(op) {
    if (!op || !op.input || !op.sb) return;
    var input = op.input;
    if (input.dataset.bblDir) return;      // no montarlo dos veces
    input.dataset.bblDir = '1';
    ponEstilos();

    var caja = document.createElement('div');
    caja.className = 'bbl-dir-caja';
    input.parentNode.insertBefore(caja, input);
    caja.appendChild(input);

    var lista = document.createElement('ul');
    lista.className = 'bbl-dir-lista';
    lista.id = 'bbl-dir-' + Math.random().toString(36).slice(2, 8);
    lista.hidden = true;
    lista.setAttribute('role', 'listbox');
    caja.appendChild(lista);

    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-controls', lista.id);
    input.setAttribute('aria-autocomplete', 'list');
    // El navegador ofrecería su propia lista encima de la nuestra.
    input.setAttribute('autocomplete', 'off');

    var sugerencias = [], marcada = -1, temporizador = null, contador = 0, ultima = 0;

    /* ── Bloque 52.6 · adelantar lo que ya sabemos ──────────────────────
       Photon tarda lo que tarda —medido: de 1,9 a 6,2 segundos, y no está
       en nuestra mano—. Pero al escribir una dirección, cada tecla nueva
       casi nunca cambia la respuesta: quien ha buscado «Avenida Ricardo» y
       escribe « Sor» sigue queriendo las mismas dos calles. Así que la
       última respuesta buena se guarda y, mientras vuela la siguiente, se
       enseña filtrada por lo que hay escrito ahora. No es una promesa: son
       las MISMAS sugerencias del servidor, con su `place_id` bueno, así que
       si se pulsa una funciona igual. Lo que se gana es que la lista no se
       vacíe entre tecla y tecla.
       Cuando ninguna casa, no hay nada que adelantar y vuelve el cartel. */
    var ultimasBuenas = null;   // { q: '…', lista: [...] }

    function normaliza(s) {
      s = (s === null || s === undefined ? '' : String(s)).toLowerCase().replace(/\s+/g, ' ').trim();
      // Los acentos SÍ se quitan aquí, al contrario que en la clave de la
      // caché del servidor: esto sólo decide qué se enseña mientras se
      // espera, y quien escribe «malaga» sin tilde debe seguir viendo la
      // sugerencia de «Málaga» que ya tenía delante.
      try { return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (_) { return s; }
    }

    function adelanta(q) {
      if (!ultimasBuenas) return [];
      var n = normaliza(q);
      // Sólo si se está ALARGANDO lo de antes. Si ha borrado o ha cambiado
      // de calle, lo de antes no tiene nada que ver con lo de ahora.
      if (n.length <= ultimasBuenas.q.length || n.indexOf(ultimasBuenas.q) !== 0) return [];
      var palabras = n.split(' ').filter(Boolean);
      return ultimasBuenas.lista.filter(function (s) {
        var texto = normaliza((s.main_text || '') + ' ' + (s.secondary_text || ''));
        for (var i = 0; i < palabras.length; i++)
          if (texto.indexOf(palabras[i]) === -1) return false;
        return true;
      });
    }
    // Al elegir una sugerencia se escribe en el propio campo, y eso
    // dispara `input`, que vuelve a buscar y REABRE la lista con la
    // dirección recién elegida dentro. Medido: se elegía una dirección y
    // la lista saltaba otra vez, tapando el resto del formulario. Esta
    // bandera distingue lo que escribe la persona de lo que escribimos
    // nosotros.
    var escribiendoNosotros = false;

    function cerrar() {
      lista.hidden = true;
      marcada = -1;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    }

    /* `buscando` pinta un renglón de espera AL FINAL de la lista, no en vez
       de ella: es la diferencia entre «hay esto, y sigo buscando» y «no hay
       nada». Bloque 52.6. */
    function pinta(buscando) {
      if (!sugerencias.length) { cerrar(); return; }
      var html = sugerencias.map(function (s, i) {
        return '<li class="bbl-dir-op" role="option" id="' + lista.id + '-' + i +
               '" data-i="' + i + '" aria-selected="false">' +
               '<b>' + esc(s.main_text) + '</b>' +
               (s.secondary_text ? '<span>' + esc(s.secondary_text) + '</span>' : '') +
               '</li>';
      }).join('');
      if (buscando)
        html += '<li class="bbl-dir-nota bbl-dir-mas">' +
                esc(t('dir_buscando', 'Buscando direcciones…')) + '</li>';
      lista.innerHTML = html;
      // Repintar mueve los renglones de sitio, así que la marca del teclado
      // deja de valer: si no se borrara, Enter elegiría otra dirección de la
      // que se estaba señalando.
      marcada = -1;
      input.removeAttribute('aria-activedescendant');
      lista.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    function nota(txt) {
      lista.innerHTML = '<li class="bbl-dir-nota">' + esc(txt) + '</li>';
      lista.hidden = false;
      sugerencias = []; marcada = -1;
    }

    function marca(i) {
      var ops = lista.querySelectorAll('.bbl-dir-op');
      if (!ops.length) return;
      if (marcada >= 0 && ops[marcada]) {
        ops[marcada].classList.remove('on');
        ops[marcada].setAttribute('aria-selected', 'false');
      }
      marcada = (i + ops.length) % ops.length;
      ops[marcada].classList.add('on');
      ops[marcada].setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', ops[marcada].id);
      if (ops[marcada].scrollIntoView) ops[marcada].scrollIntoView({ block: 'nearest' });
    }

    async function buscar(q) {
      var mio = ++contador;
      /* 52.5 · AVISAR DE QUE SE ESTÁ BUSCANDO. Medido contra producción el
         28-sep: la instancia pública de Photon tarda entre 1,9 y 6,2
         segundos para la MISMA consulta, según el momento. Con los 300 ms
         de freno, eso son hasta seis segundos y medio mirando un campo
         quieto, y seis segundos sin señal no se leen como «está buscando»
         sino como «esto no funciona».
         Con sugerencias delante, el aviso va al final de la lista y no en
         su lugar: pisar unas opciones que se pueden pulsar con un cartel de
         espera sería peor que el silencio. */
      if (!lista.hidden && sugerencias.length) pinta(true);
      else nota(t('dir_buscando', 'Buscando direcciones…'));
      try {
        var cuerpo = { action: 'autocomplete', input: q };
        var pais = op.paisActual && op.paisActual();
        if (pais) cuerpo.country = String(pais).toUpperCase();
        var idioma = (window.BBL && BBL.lang) || document.documentElement.lang;
        if (idioma) cuerpo.lang = String(idioma).slice(0, 2);

        var r = await op.sb.functions.invoke('places-autocomplete', { body: cuerpo });

        // Llegó tarde: ya hay una búsqueda más nueva en camino. No se toca
        // la lista: la que viene detrás la va a escribir de todas formas, y
        // borrarla aquí haría parpadear el cartel de «Buscando…».
        if (mio < ultima) return;
        ultima = mio;

        if (r.error || !r.data || !r.data.success) {
          /* Antes aquí sólo había `cerrar()`. Sin sugerencias se puede
             vivir —se escribe la dirección a mano— pero cerrando la lista
             sin decir nada la pantalla queda exactamente igual que cuando
             el autocompletado no está montado, y quien mira no tiene cómo
             distinguir «el buscador está caído» de «esto está roto». */
          nota(t('dir_no_disponible',
            'El buscador de direcciones no responde ahora mismo. Escribe la dirección a mano.'));
          try { console.warn('[Babyloon] direcciones:', (r.error && r.error.message) || r.data); } catch (_) {}
          return;
        }
        sugerencias = r.data.predictions || [];
        if (!sugerencias.length) {
          ultimasBuenas = null;
          nota(t('dir_sin_resultados', 'Sin resultados. Escribe la dirección a mano.'));
          return;
        }
        // Se guardan para poder adelantarlas en la siguiente tecla (52.6).
        ultimasBuenas = { q: normaliza(q), lista: sugerencias.slice() };

        /* Escribir una calle entera lanza varias consultas, y con el
           servidor a segundos las respuestas llegan con retraso: la de
           «Avenida R» puede aterrizar cuando en el campo ya dice «Avenida
           Ricardo S». `mio < ultima` sólo descarta lo que llega DESORDENADO;
           esto descarta lo que llega TARDE. Sin ello la prueba vio tres
           sugerencias de «Avenida R» pintadas encima de un campo que decía
           otra cosa. No se tira la respuesta —sirve para adelantar— pero lo
           que se pinta es lo que casa con lo que hay escrito ahora. */
        var actual = input.value.trim();
        if (actual !== q && contador > mio) {
          var ya = adelanta(actual);
          if (ya.length) { sugerencias = ya; pinta(true); }
          return;
        }

        // Y si todavía hay otra consulta en vuelo, el renglón de «Buscando…»
        // se queda: lo que hay en pantalla puede no ser lo último.
        pinta(contador > mio);
      } catch (e) {
        // Se cayó la red a mitad. Mismo razonamiento que arriba: decirlo.
        if (mio >= ultima) {
          ultima = mio;
          nota(t('dir_no_disponible',
            'El buscador de direcciones no responde ahora mismo. Escribe la dirección a mano.'));
        }
        try { console.warn('[Babyloon] direcciones:', e); } catch (_) {}
      }
    }

    async function elegir(i) {
      var s = sugerencias[i];
      if (!s) return;
      cerrar();
      try {
        var r = await op.sb.functions.invoke('places-autocomplete',
          { body: { action: 'details', place_id: s.place_id } });
        if (r.error || !r.data || !r.data.success) return;
        var d = r.data.address || {};

        escribiendoNosotros = true;
        if (d.line1) input.value = d.line1;

        // Rellenar SIN pisar lo que ya hubiera escrito.
        function pon(el, valor) {
          if (!el || !valor) return;
          if (el.value && el.value.trim()) return;
          el.value = valor;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        pon(op.ciudad, d.city);
        pon(op.provincia, d.province || d.province_code);
        pon(op.cp, d.postal_code);

        // El país sí se fija, porque de él dependen el envío y el impuesto.
        if (op.pais && d.country_code) {
          var sel = op.pais;
          if (sel.tagName === 'SELECT') {
            var hay = false;
            for (var k = 0; k < sel.options.length; k++)
              if (sel.options[k].value === d.country_code) hay = true;
            if (hay && sel.value !== d.country_code) {
              sel.value = d.country_code;
              sel.dispatchEvent(new Event('change', { bubbles: true }));
            }
          } else if (!sel.value) {
            sel.value = d.country_code;
          }
        }

        // Se avisa igualmente a quien escuche el campo —el checkout guarda
        // borradores— pero sin que nuestro propio buscador se dé por aludido.
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        escribiendoNosotros = false;
        clearTimeout(temporizador);
        cerrar();
        if (op.alElegir) { try { op.alElegir(d); } catch (_) {} }
      } catch (_) { escribiendoNosotros = false; }
    }

    input.addEventListener('input', function () {
      if (escribiendoNosotros) return;
      var q = input.value.trim();
      clearTimeout(temporizador);
      if (q.length < 3) { ultimasBuenas = null; cerrar(); return; }
      /* 52.6 · antes de esperar los 300 ms del freno y lo que tarde el
         servidor, se enseña lo que ya se tiene filtrado por lo escrito.

         Y si no casa NADA, la lista se cierra. La primera versión la dejaba
         puesta «para que la pantalla no parpadee», y la prueba lo cazó:
         borrando «Avenida Ricardo Soriano» y escribiendo «Calle Mayor 1»
         seguían en pantalla las dos sugerencias de la avenida. Pulsar una
         habría rellenado una dirección que nadie ha pedido. Un parpadeo es
         molesto; una dirección equivocada en un envío es un paquete que no
         llega. */
      var ya = adelanta(q);
      if (ya.length) { sugerencias = ya; pinta(true); }
      else { sugerencias = []; nota(t('dir_buscando', 'Buscando direcciones…')); }
      temporizador = setTimeout(function () { buscar(q); }, 300);
    });

    input.addEventListener('keydown', function (e) {
      if (lista.hidden) {
        if (e.key === 'ArrowDown' && sugerencias.length) { e.preventDefault(); pinta(); marca(0); }
        return;
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); marca(marcada + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); marca(marcada - 1); }
      else if (e.key === 'Enter') {
        if (marcada >= 0) { e.preventDefault(); elegir(marcada); }
      } else if (e.key === 'Escape') { e.preventDefault(); cerrar(); }
    });

    // `mousedown` y no `click`: al hacer clic, el `blur` del campo llega
    // antes que el `click` y cerraría la lista debajo del dedo.
    lista.addEventListener('mousedown', function (e) {
      var li = e.target.closest ? e.target.closest('.bbl-dir-op') : null;
      if (!li) return;
      e.preventDefault();
      elegir(Number(li.dataset.i));
    });

    input.addEventListener('blur', function () { setTimeout(cerrar, 120); });
    document.addEventListener('click', function (e) {
      if (!caja.contains(e.target)) cerrar();
    });
  }

  window.BBL = window.BBL || {};
  window.BBL.direccion = monta;
})();
