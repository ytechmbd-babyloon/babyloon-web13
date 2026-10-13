/* ═══════════════════════════════════════════════════════════════════════
   BABYLOON · money.js
   La moneda, en la web, escrita igual que en todas partes.

   Esta tabla es LA MISMA que hay en otros dos sitios. Si cambias una,
   cambia las tres o volverás a tener el mismo importe escrito de tres
   formas distintas:

     · SQL      currency_symbol() · currency_decimals() · money_fmt()
     · Flutter  currency_service.dart  (CurrencyService)
     · Web      este archivo

   Por qué los símbolos van desambiguados: entre el peso colombiano y el
   dólar hay un factor de 3.000. Un "$" pelado sirviendo para el peso
   mexicano, el colombiano, el argentino, el chileno y el dólar canadiense
   no es un detalle tipográfico, es un riesgo de leer mal el dinero.

   Uso:
     Money.format(3090.64, 'EUR')   ->  "3.090,64 €"
     Money.format(-80.99,  'MXN')   ->  "-MX$80,99"
     await Money.mine(sb)           ->  {code:'EUR', symbol:'€', decimals:2}
     await Money.pais()             ->  'GB', el país desde el que mira (o null)
     Money.formatMine(120)          ->  formatea en la moneda de quien mira

   61.68 · Si no se sabe dónde está quien mira, dólares (Andrés, 8-oct,
   13 y 22: «el precio se enseña en la moneda de donde está quien compra
   y, si no se sabe, en dólares»). Hasta hoy, euros.
   ═══════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  // ── La tabla. Una sola. ────────────────────────────────────────────
  // Los simbolos y los decimales son los mismos que currency_symbol y
  // my_currency en SQL. Si divergen, el precio que se ensena deja de
  // ser el que se cobra: ese es todo el motivo de que esta tabla este
  // en un solo sitio.
  var MONEDAS = {
    EUR: { symbol: '€',    first: false, decimals: 2 },
    USD: { symbol: 'US$',  first: true,  decimals: 2 },
    GBP: { symbol: '£',    first: true,  decimals: 2 },
    CHF: { symbol: 'CHF',  first: true,  decimals: 2 },
    MXN: { symbol: 'MX$',  first: true,  decimals: 2 },
    COP: { symbol: 'COL$', first: true,  decimals: 0 },
    ARS: { symbol: 'AR$',  first: true,  decimals: 2 },
    CLP: { symbol: 'CLP$', first: true,  decimals: 0 },
    CAD: { symbol: 'CA$',  first: true,  decimals: 2 },
    BRL: { symbol: 'R$',   first: true,  decimals: 2 },
    PEN: { symbol: 'S/',   first: true,  decimals: 2 },
    AED: { symbol: 'د.إ',  first: false, decimals: 2 },
    // Europa no euro. El forinto va sin decimales a proposito: Stripe
    // exige que el importe en HUF sea multiplo de 100 filler, o sea,
    // forintos enteros.
    SEK: { symbol: 'kr',   first: false, decimals: 2 },
    PLN: { symbol: 'zł',   first: false, decimals: 2 },
    HUF: { symbol: 'Ft',   first: false, decimals: 0 },
    DKK: { symbol: 'kr',   first: false, decimals: 2 },
    NOK: { symbol: 'kr',   first: false, decimals: 2 },
    CZK: { symbol: 'Kč',   first: false, decimals: 2 },
    RON: { symbol: 'lei',  first: false, decimals: 2 },
    // Asia
    JPY: { symbol: '¥',    first: true,  decimals: 0 },
    KRW: { symbol: '₩',    first: true,  decimals: 0 },
    SGD: { symbol: 'S$',   first: true,  decimals: 2 },
    HKD: { symbol: 'HK$',  first: true,  decimals: 2 },
    THB: { symbol: '฿',    first: true,  decimals: 2 },
    // Golfo
    SAR: { symbol: 'ر.س',  first: false, decimals: 2 },
    QAR: { symbol: 'ر.ق',  first: false, decimals: 2 },
    KWD: { symbol: 'د.ك',  first: false, decimals: 3 },
    CRC: { symbol: '₡',    first: true,  decimals: 2 }
  };

  // La moneda de un dato que no la dice: los precios base y las filas
  // viejas están en euros.
  var POR_DEFECTO = 'EUR';
  // 61.68 · La de quien mira cuando no se sabe dónde está: dólares, como
  // currency_for_country_code en SQL. Hasta hoy, euros, como los datos.
  var SIN_SABER = 'USD';

  // ── País (código ISO) -> moneda. Igual que currency_for_country_code
  //    en SQL y que _codeToCurrency en Flutter. ───────────────────────
  // Faltaban Hungria, Japon, Polonia y Suecia, y las cuatro tienen
  // ciudad abierta: Budapest, Tokio, Varsovia y Estocolmo. Hasta hoy
  // las cuatro caian al 'else EUR' y la clienta de Budapest veia el
  // precio en euros, aqui y en las dos apps.
  // Los paises sin tipo de cambio en exchange_rates (RU, CN, IN...) van
  // en dolares (61.68; antes, en euros): convert_price no convierte sin
  // tasa, y un importe sin convertir con el simbolo del pais es una mentira.
  var PAIS_MONEDA = {
    ES: 'EUR', FR: 'EUR', IT: 'EUR', DE: 'EUR', PT: 'EUR',
    NL: 'EUR', BE: 'EUR', IE: 'EUR', AT: 'EUR', GR: 'EUR',
    FI: 'EUR', LU: 'EUR', SK: 'EUR', SI: 'EUR', EE: 'EUR',
    LV: 'EUR', LT: 'EUR', MT: 'EUR', CY: 'EUR', HR: 'EUR', MC: 'EUR',
    // 61.68 · Bulgaria, en el euro desde el 1-ene-2026, y los que pagan en
    // euros sin ser de la Union.
    BG: 'EUR', AD: 'EUR', SM: 'EUR', VA: 'EUR', ME: 'EUR', XK: 'EUR',
    US: 'USD', CA: 'CAD', MX: 'MXN', CO: 'COP', AR: 'ARS',
    CL: 'CLP', PE: 'PEN', BR: 'BRL', CR: 'CRC',
    GB: 'GBP', UK: 'GBP', CH: 'CHF',
    SE: 'SEK', PL: 'PLN', HU: 'HUF', DK: 'DKK', NO: 'NOK',
    CZ: 'CZK', RO: 'RON',
    JP: 'JPY', KR: 'KRW', SG: 'SGD', HK: 'HKD', TH: 'THB',
    AE: 'AED', SA: 'SAR', QA: 'QAR',
    // 61.30 · El dinar de Kuwait no se cobra: Stripe lo cuenta en
    // milesimas. 61.68 · Como todo lo que no se cobra en su moneda, en
    // dolares (aqui decia 'KWD', que la base no daba nunca).
    KW: 'USD'
  };

  function norm(code) {
    return String(code || POR_DEFECTO).trim().toUpperCase();
  }

  function info(code) {
    var c = norm(code);
    return MONEDAS[c] || { symbol: c, first: true, decimals: 2 };
  }

  function symbol(code)   { return info(code).symbol; }
  function decimals(code) { return info(code).decimals; }

  // 61.68 · Sin pais, o con uno cuya moneda no se cobra, dolares (antes,
  // euros).
  function currencyForCountry(codigoPais) {
    if (!codigoPais) return SIN_SABER;
    return PAIS_MONEDA[String(codigoPais).trim().toUpperCase()] || SIN_SABER;
  }

  /* Miles con punto, decimales con coma, signo delante de todo.
     Tiene que dar la MISMA cadena que money_fmt() en SQL. */
  function format(amount, code) {
    var i   = info(code);
    var n   = Number(amount);
    if (!isFinite(n)) n = 0;
    var neg = n < 0;
    var fijo = Math.abs(n).toFixed(i.decimals);

    var partes = fijo.split('.');
    var enteros = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    var num = partes.length > 1 ? enteros + ',' + partes[1] : enteros;

    // Un símbolo que es letra necesita espacio: "CHF 1.234,50".
    var esLetra = /^[A-Za-z]+$/.test(i.symbol);
    var cuerpo = i.first
      ? i.symbol + (esLetra ? ' ' : '') + num
      : num + ' ' + i.symbol;

    return (neg ? '-' : '') + cuerpo;
  }

  /* Sin decimales, para tarjetas de resumen. */
  function formatShort(amount, code) {
    var i = info(code);
    var n = Number(amount) || 0;
    var neg = n < 0;
    var enteros = Math.round(Math.abs(n)).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    var esLetra = /^[A-Za-z]+$/.test(i.symbol);
    var cuerpo = i.first
      ? i.symbol + (esLetra ? ' ' : '') + enteros
      : enteros + ' ' + i.symbol;
    return (neg ? '-' : '') + cuerpo;
  }

  // ── Conversión de precios ──────────────────────────────────────────
  // Réplica EXACTA de convert_price() en SQL, comprobada contra el backend
  // en 84 conversiones. Vive aquí y no copiada en cada página: si diverge,
  // el precio que se enseña deja de ser el que se cobra.
  //
  // convert_price es el precio de ESCAPARATE: lleva colchón y redondeo a
  // .99. Para repartir dinero ya cobrado el backend usa fx_plain, que no
  // lleva ninguna de las dos cosas. La web no reparte, así que solo
  // necesita esta.
  var BUFFER_PCT = 3;                               // currency_config.buffer_pct
  var SIN_DECIMALES = ['COP', 'CLP', 'JPY', 'KRW', 'HUF']; // igual que convert_price
  var FX = { EUR: 1 };

  /* Trae los tipos de cambio de la MISMA tabla que el backend. */
  function loadFX(sb) {
    if (!sb || !sb.from) return Promise.resolve(FX);
    return sb.from('exchange_rates').select('quote,rate').eq('base', 'EUR')
      .then(function (r) {
        (r.data || []).forEach(function (x) { FX[x.quote] = Number(x.rate); });
        return FX;
      })
      .catch(function () { return FX; });
  }

  function convert(amount, fromCur, toCur) {
    if (amount == null) return null;
    var a = Number(amount);
    if (a === 0) return 0;                          // lo gratis es gratis
    var from = norm(fromCur);
    var to   = norm(toCur);
    if (from === to) return Math.round(a * 100) / 100;
    var rf = FX[from], rt = FX[to];
    // Sin tipo de cambio no se inventa nada: se devuelve tal cual, que es
    // lo que hace convert_price. Enseñar una cifra convertida a ojo es
    // peor que enseñarla sin convertir.
    if (!rf || !rt) return Math.round(a * 100) / 100;
    var v = (a / rf) * rt;
    v = v * (1 + BUFFER_PCT / 100);
    if (SIN_DECIMALES.indexOf(to) >= 0) v = Math.ceil(v / 100) * 100 - 1;
    else v = Math.ceil(v) - 0.01;
    if (a > 0 && v < 0) v = 0;
    return v;
  }

  /* Convierte y formatea de una vez, que es lo que casi siempre se quiere. */
  function priceIn(amount, fromCur, toCur) {
    var to = norm(toCur || myCode());
    return format(convert(amount, fromCur, to), to);
  }

  function rates() { return FX; }

  // ── Desde dónde mira ───────────────────────────────────────────────
  // 61.68 · El pais lo dice Cloudflare en /cdn-cgi/trace («loc=GB»), el
  // mismo que ya usan el idioma y la ciudad de la portada. Se pregunta
  // una vez por pagina y, si contesta, se guarda para la pestaña. Si no
  // contesta en 2,5 s, no se sabe (null). «XX» y «T1» (Tor) tampoco.
  var _pais;                 // undefined: sin preguntar · null: no se sabe
  var _pidiendoPais = null;

  function guarda(k, v) { try { sessionStorage.setItem(k, v); } catch (_) {} }
  function lee(k)       { try { return sessionStorage.getItem(k); } catch (_) { return null; } }

  function pais() {
    if (_pais !== undefined) return Promise.resolve(_pais);
    if (_pidiendoPais) return _pidiendoPais;
    var g = lee('bbl_pais_conexion');
    if (g && /^[A-Z]{2}$/.test(g)) { _pais = g; return Promise.resolve(_pais); }
    _pidiendoPais = new Promise(function (ok) {
      var hecho = false;
      function fin(p) {
        if (hecho) return;
        hecho = true;
        _pais = p || null;
        _pidiendoPais = null;
        if (_pais) guarda('bbl_pais_conexion', _pais);
        ok(_pais);
      }
      var reloj = setTimeout(function () { fin(null); }, 2500);
      try {
        fetch('/cdn-cgi/trace', { cache: 'no-store' })
          .then(function (r) { return r.text(); })
          .then(function (t) {
            clearTimeout(reloj);
            var m = /(?:^|\n)loc=([A-Z]{2})\s*(?:\n|$)/.exec(String(t || ''));
            var p = m ? m[1] : null;
            fin((p === 'XX' || p === 'T1') ? null : p);
          })
          .catch(function () { clearTimeout(reloj); fin(null); });
      } catch (_) { clearTimeout(reloj); fin(null); }
    });
    return _pidiendoPais;
  }

  // ── La moneda de quien está mirando ────────────────────────────────
  // 61.68 · La dice el servidor (mi_moneda), con el pais desde el que
  // mira: con cuenta, la de su direccion y, si no la ha dado, la del pais
  // desde el que se conecta, que se le anota antes de preguntar
  // (anotar_mi_pais_de_conexion); sin cuenta, la del pais que diga
  // Cloudflare; si no se sabe, dolares. Antes era my_currency, sin pais:
  // a quien no tenia cuenta, euros. Si mi_moneda no esta (un servidor de
  // antes), my_currency. Si no contesta nadie, la del pais, o dolares.
  var _mia = null;
  var _pidiendo = null;

  function fija(code) {
    var c = norm(code);
    _mia = { code: c, symbol: symbol(c), decimals: decimals(c) };
    guarda('bbl_moneda', c);
    return _mia;
  }

  function sesion(sb) {
    try {
      if (!sb.auth || typeof sb.auth.getSession !== 'function') return Promise.resolve(null);
      return Promise.resolve(sb.auth.getSession()).then(function (r) {
        var s = r && r.data && r.data.session;
        return (s && s.user && s.user.id) ? s.user.id : null;
      }).catch(function () { return null; });
    } catch (_) { return Promise.resolve(null); }
  }

  // Una vez por pestaña, por cuenta y pais: lo que la base ya sabe no se
  // vuelve a escribir.
  function anotar(sb, uid, p) {
    var clave = uid + ':' + p;
    if (lee('bbl_pais_anotado') === clave) return Promise.resolve();
    return Promise.resolve(sb.rpc('anotar_mi_pais_de_conexion', { p_pais: p }))
      .then(function (r) { if (r && !r.error) guarda('bbl_pais_anotado', clave); })
      .catch(function () {});
  }

  function codigo(r) {
    var d = r && !r.error && r.data;
    return (d && d.code && /^[A-Za-z]{3}$/.test(String(d.code))) ? d.code : null;
  }

  function mine(sb) {
    if (_mia) return Promise.resolve(_mia);
    if (_pidiendo) return _pidiendo;
    _pidiendo = pais().then(function (p) {
      if (!sb || typeof sb.rpc !== 'function') return null;
      return sesion(sb).then(function (uid) {
        return (uid && p) ? anotar(sb, uid, p) : null;
      }).then(function () {
        return Promise.resolve(sb.rpc('mi_moneda', { p_pais: p })).then(codigo);
      }).then(function (c) {
        return c || Promise.resolve(sb.rpc('my_currency')).then(codigo);
      });
    }).catch(function () { return null; })
      .then(function (c) {
        _pidiendo = null;
        return fija(c || currencyForCountry(_pais));
      });
    return _pidiendo;
  }

  // Mientras no se sabe: la que ya se vio en esta pestaña, o la del pais
  // si ya se sabe, o dolares. Antes, euros.
  function provisional() {
    var g = lee('bbl_moneda');
    if (g && /^[A-Z]{3}$/.test(g)) return g;
    return (_pais !== undefined) ? currencyForCountry(_pais) : SIN_SABER;
  }

  /* Formatea en la moneda de quien mira. Llama antes a mine() una vez;
     mientras no se sepa, usa la provisional en lugar de dejar el hueco. */
  function formatMine(amount) {
    return format(amount, myCode());
  }

  function myCode()   { return _mia ? _mia.code : provisional(); }
  function mySymbol() { return symbol(myCode()); }

  /* Para cuando la fila trae su propia moneda (un movimiento del
     monedero, una factura, un pedido). Se respeta la de la fila: ese
     importe está en esa moneda, no en la de quien mira. */
  function formatRow(amount, row, campo) {
    var c = row && (row[campo || 'currency']);
    return format(amount, c || myCode());
  }

  global.Money = {
    format: format,
    formatShort: formatShort,
    formatRow: formatRow,
    formatMine: formatMine,
    symbol: symbol,
    decimals: decimals,
    currencyForCountry: currencyForCountry,
    mine: mine,
    pais: pais,
    loadFX: loadFX,
    convert: convert,
    priceIn: priceIn,
    rates: rates,
    myCode: myCode,
    mySymbol: mySymbol,
    TABLA: MONEDAS,
    SIN_SABER: SIN_SABER
  };
})(window);
