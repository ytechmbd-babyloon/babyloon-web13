/* ═══════════════════════════════════════════════════════════════════════
   lector-extractos.js · Babyloon · gestor contable (conciliación bancaria)

   Lee el extracto que la profesional descarga de su banco y lo convierte
   en movimientos limpios: { fecha:'YYYY-MM-DD', concepto, importe:'-12.50', saldo }.

   POR QUÉ ESTÁ ESCRITO A MANO Y NO CON UNA LIBRERÍA
   La CSP de la web sólo deja ejecutar código propio ('self'): se quitaron
   las dependencias externas a propósito. Además, cada banco exporta a su
   manera, y aquí se tratan sus manías concretas:
     · CSV con ; , o tabulador, comillas, y en UTF-8 o Windows-1252
     · Excel .xlsx (es un zip de XML: se descomprime con la API del navegador)
     · 1.234,56 · 1,234.56 · -12,50 · 12,50- · (12,50) · "12,50 €"
     · 03/10/2026 · 3-10-26 · 2026-10-03 · números de serie de Excel
     · una columna de Importe con signo, o Cargo y Abono por separado
     · la cabecera no está en la primera fila (logos, titular, IBAN...)
   El .xls antiguo (formato binario de Excel 97) no se lee: se pide
   guardarlo como .xlsx o CSV, que todos los bancos permiten.
   ═══════════════════════════════════════════════════════════════════════ */
(function (raiz) {
  'use strict';

  /* ── CSV ─────────────────────────────────────────────────────────── */
  function detectarSeparador(texto) {
    var lineas = texto.split(/\r?\n/).filter(function (l) { return l.trim(); }).slice(0, 40);
    var mejor = ';', puntos = -1;
    [';', ',', '\t', '|'].forEach(function (sep) {
      var cuentas = lineas.map(function (l) { return contarFuera(l, sep); });
      var maxi = Math.max.apply(null, cuentas.concat([0]));
      // el separador bueno se repite igual en muchas líneas
      var iguales = cuentas.filter(function (c) { return c === maxi && c > 0; }).length;
      var p = iguales * maxi;
      if (p > puntos) { puntos = p; mejor = sep; }
    });
    return mejor;
  }
  function contarFuera(linea, sep) {
    var n = 0, dentro = false;
    for (var i = 0; i < linea.length; i++) {
      var ch = linea[i];
      if (ch === '"') dentro = !dentro;
      else if (ch === sep && !dentro) n++;
    }
    return n;
  }
  function leerTexto(texto) {
    texto = String(texto || '').replace(/^\uFEFF/, '');
    var sep = detectarSeparador(texto);
    var filas = [], fila = [], campo = '', dentro = false;
    for (var i = 0; i < texto.length; i++) {
      var ch = texto[i];
      if (dentro) {
        if (ch === '"') {
          if (texto[i + 1] === '"') { campo += '"'; i++; } else dentro = false;
        } else campo += ch;
      } else if (ch === '"') dentro = true;
      else if (ch === sep) { fila.push(campo); campo = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && texto[i + 1] === '\n') i++;
        fila.push(campo); campo = '';
        if (fila.some(function (c) { return c.trim() !== ''; })) filas.push(fila);
        fila = [];
      } else campo += ch;
    }
    fila.push(campo);
    if (fila.some(function (c) { return c.trim() !== ''; })) filas.push(fila);
    return filas.map(function (f) { return f.map(function (c) { return c.trim(); }); });
  }

  /* ── XLSX (zip + XML) ────────────────────────────────────────────── */
  function u16(b, o) { return b[o] | (b[o + 1] << 8); }
  function u32(b, o) { return (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0; }
  function utf8(bytes) { return new TextDecoder('utf-8').decode(bytes); }

  function entradasZip(b) {
    var eocd = -1;
    for (var i = b.length - 22; i >= Math.max(0, b.length - 66000); i--) {
      if (u32(b, i) === 0x06054b50) { eocd = i; break; }
    }
    if (eocd < 0) throw new Error('xlsx_danado');
    var total = u16(b, eocd + 10), off = u32(b, eocd + 16), out = {};
    for (var k = 0; k < total; k++) {
      if (u32(b, off) !== 0x02014b50) throw new Error('xlsx_danado');
      var metodo = u16(b, off + 10), comp = u32(b, off + 20), largoN = u16(b, off + 28),
          largoE = u16(b, off + 30), largoC = u16(b, off + 32), local = u32(b, off + 42);
      var nombre = utf8(b.subarray(off + 46, off + 46 + largoN));
      out[nombre] = { metodo: metodo, comp: comp, local: local };
      off += 46 + largoN + largoE + largoC;
    }
    return out;
  }
  function datosEntrada(b, e) {
    if (u32(b, e.local) !== 0x04034b50) throw new Error('xlsx_danado');
    var ini = e.local + 30 + u16(b, e.local + 26) + u16(b, e.local + 28);
    return b.subarray(ini, ini + e.comp);
  }
  async function inflarNavegador(bytes) {
    var ds = new DecompressionStream('deflate-raw');
    var flujo = new Blob([bytes]).stream().pipeThrough(ds);
    return new Uint8Array(await new Response(flujo).arrayBuffer());
  }
  function desXml(s) {
    return String(s).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'").replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(+n); })
      .replace(/&#x([0-9a-f]+);/gi, function (_, n) { return String.fromCharCode(parseInt(n, 16)); })
      .replace(/&amp;/g, '&');
  }
  function textosT(xml) {
    var out = '', re = /<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g, m;
    while ((m = re.exec(xml))) out += m[1];
    return desXml(out);
  }
  function colIndice(ref) {
    var letras = (ref.match(/^[A-Z]+/) || ['A'])[0], n = 0;
    for (var i = 0; i < letras.length; i++) n = n * 26 + (letras.charCodeAt(i) - 64);
    return n - 1;
  }
  async function leerXlsx(bytes, inflar) {
    inflar = inflar || inflarNavegador;
    var zip = entradasZip(bytes);
    async function archivo(nombre) {
      var e = zip[nombre];
      if (!e) return null;
      var d = datosEntrada(bytes, e);
      return utf8(e.metodo === 0 ? d : await inflar(d));
    }
    // Primera hoja según el libro (no siempre es sheet1.xml)
    var ruta = 'xl/worksheets/sheet1.xml';
    var libro = await archivo('xl/workbook.xml'), rels = await archivo('xl/_rels/workbook.xml.rels');
    if (libro && rels) {
      var hoja = libro.match(/<sheet\b[^>]*?r:id="([^"]+)"/);
      if (hoja) {
        var re = new RegExp('<Relationship\\b[^>]*Id="' + hoja[1] + '"[^>]*Target="([^"]+)"');
        var t = rels.match(re) || rels.match(new RegExp('<Relationship\\b[^>]*Target="([^"]+)"[^>]*Id="' + hoja[1] + '"'));
        if (t) ruta = t[1].replace(/^\/?(xl\/)?/, 'xl/');
      }
    }
    var compartidos = [], sst = await archivo('xl/sharedStrings.xml');
    if (sst) {
      var reSi = /<si>([\s\S]*?)<\/si>/g, mSi;
      while ((mSi = reSi.exec(sst))) compartidos.push(textosT(mSi[1]));
    }
    var xml = await archivo(ruta);
    if (!xml) throw new Error('xlsx_sin_hoja');
    var filas = [], reFila = /<row\b[^>]*>([\s\S]*?)<\/row>/g, mF;
    while ((mF = reFila.exec(xml))) {
      var fila = [], reC = /<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g, mC;
      while ((mC = reC.exec(mF[1]))) {
        var attrs = mC[1], cuerpo = mC[2] || '';
        var ref = (attrs.match(/\br="([A-Z]+\d+)"/) || [])[1];
        var tipo = (attrs.match(/\bt="([^"]+)"/) || [])[1] || 'n';
        var v = (cuerpo.match(/<v>([\s\S]*?)<\/v>/) || [])[1];
        var valor = '';
        if (tipo === 's') valor = v != null ? (compartidos[+v] || '') : '';
        else if (tipo === 'inlineStr') valor = textosT(cuerpo);
        else valor = v != null ? desXml(v) : '';
        var idx = ref ? colIndice(ref) : fila.length;
        while (fila.length < idx) fila.push('');
        fila[idx] = String(valor).trim();
      }
      if (fila.some(function (c) { return c !== ''; })) filas.push(fila);
    }
    return filas;
  }

  /* ── Lectura del archivo (navegador) ─────────────────────────────── */
  async function leer(file) {
    var buf = new Uint8Array(await file.arrayBuffer());
    if (buf.length > 15 * 1024 * 1024) throw new Error('archivo_demasiado_grande');
    if (buf[0] === 0xD0 && buf[1] === 0xCF && buf[2] === 0x11 && buf[3] === 0xE0) throw new Error('xls_antiguo');
    if (buf[0] === 0x50 && buf[1] === 0x4B) return { tipo: 'xlsx', filas: await leerXlsx(buf) };
    var texto;
    try { texto = new TextDecoder('utf-8', { fatal: true }).decode(buf); }
    catch (_) { texto = new TextDecoder('windows-1252').decode(buf); }
    return { tipo: 'csv', filas: leerTexto(texto) };
  }

  /* ── Detección de columnas ───────────────────────────────────────── */
  function sinTildes(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim(); }
  var PATRONES = {
    fecha:    [/^f(echa)?\.? ?(de )?(operacion|oper|contable|movimiento)/, /^fecha$/, /^date$/, /^booking date/, /^f\. ?valor|^fecha valor|^value date/],
    concepto: [/concepto|descripcion|detalle|movimiento|description|details|referencia|beneficiario/],
    importe:  [/^importe|^amount|^cantidad|^importe \(?eur|^monto/],
    cargo:    [/^cargo|^debe$|^debito|^debit|^salidas?$|^gastos?$|^pagos?$/],
    abono:    [/^abono|^haber$|^credito|^credit|^entradas?$|^ingresos?$/],
    saldo:    [/^saldo|^balance/]
  };
  function detectar(filas) {
    var cab = -1, enc = [];
    for (var i = 0; i < Math.min(filas.length, 40); i++) {
      var f = filas[i].map(sinTildes);
      var tieneFecha = f.some(function (c) { return /fecha|date|^f\.? ?(valor|oper|contable)/.test(c); });
      var tieneImporte = f.some(function (c) { return /importe|amount|cargo|abono|debe|haber|cantidad|debit|credit/.test(c); });
      if (tieneFecha && tieneImporte) { cab = i; enc = filas[i]; break; }
    }
    var col = { fecha: -1, concepto: -1, importe: -1, cargo: -1, abono: -1, saldo: -1 };
    if (cab >= 0) {
      var normal = enc.map(sinTildes);
      Object.keys(PATRONES).forEach(function (clave) {
        // los patrones van por orden de preferencia (p. ej. fecha de operación antes que fecha valor)
        for (var p = 0; p < PATRONES[clave].length && col[clave] < 0; p++) {
          for (var j = 0; j < normal.length; j++) {
            var usado = Object.keys(col).some(function (k) { return col[k] === j; });
            if (!usado && PATRONES[clave][p].test(normal[j])) { col[clave] = j; break; }
          }
        }
      });
    }
    return { cabecera: cab, encabezados: enc, columnas: col };
  }

  /* ── Números y fechas ────────────────────────────────────────────── */
  function estiloDecimal(valores) {
    // ¿la columna usa coma decimal? Basta con un valor tipo 12,50 al final
    var coma = 0, punto = 0;
    valores.forEach(function (v) {
      v = String(v || '');
      if (/,\d{1,2}(\D*)$/.test(v)) coma++;
      else if (/\.\d{1,2}(\D*)$/.test(v)) punto++;
    });
    return coma > punto ? ',' : '.';
  }
  function numero(v, dec) {
    var s = String(v == null ? '' : v).trim();
    if (!s) return null;
    var negativo = false;
    if (/^\(.*\)$/.test(s)) { negativo = true; s = s.slice(1, -1); }
    if (/-\s*$/.test(s)) { negativo = true; s = s.replace(/-\s*$/, ''); }
    s = s.replace(/[^\d,.\-+]/g, '');
    if (s.charAt(0) === '-') { negativo = !negativo; s = s.slice(1); }
    s = s.replace(/^\+/, '');
    if (!/\d/.test(s)) return null;
    if (/^\d+(\.\d+)?(e-?\d+)?$/i.test(s) && dec === 'xlsx') {
      var n0 = Number(s); return isFinite(n0) ? (negativo ? -n0 : n0) : null;
    }
    if (dec === ',') s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(/,/g, '');
    if (!/^\d*\.?\d+$/.test(s)) return null;
    var n = Number(s);
    return isFinite(n) ? (negativo ? -n : n) : null;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fechaValida(y, m, d) {
    var dt = new Date(Date.UTC(y, m - 1, d));
    return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
  }
  function fecha(v) {
    var s = String(v == null ? '' : v).trim();
    if (!s) return null;
    var m;
    if (/^\d{5}(\.\d+)?$/.test(s)) {                         // número de serie de Excel
      var serie = Math.floor(Number(s));
      if (serie > 20000 && serie < 80000) {
        var d = new Date(Date.UTC(1899, 11, 30) + serie * 86400000);
        return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
      }
      return null;
    }
    if ((m = s.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/))) {
      if (fechaValida(+m[1], +m[2], +m[3])) return m[1] + '-' + pad(+m[2]) + '-' + pad(+m[3]);
      return null;
    }
    if ((m = s.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{2,4})/))) {  // día primero (España)
      var y = +m[3]; if (y < 100) y += 2000;
      if (fechaValida(y, +m[2], +m[1])) return y + '-' + pad(+m[2]) + '-' + pad(+m[1]);
      return null;
    }
    return null;
  }

  /* ── Normalizar ──────────────────────────────────────────────────── */
  function normalizar(filas, det, opciones) {
    opciones = opciones || {};
    var c = det.columnas, datos = filas.slice(det.cabecera + 1);
    var origen = opciones.tipo === 'xlsx' ? 'xlsx' : null;
    var decImp = origen || estiloDecimal(datos.map(function (f) { return f[c.importe]; }));
    var decCar = origen || estiloDecimal(datos.map(function (f) { return f[c.cargo]; }));
    var decAbo = origen || estiloDecimal(datos.map(function (f) { return f[c.abono]; }));
    var decSal = origen || estiloDecimal(datos.map(function (f) { return f[c.saldo]; }));
    var movimientos = [], rechazadas = 0;
    datos.forEach(function (f) {
      var fe = c.fecha >= 0 ? fecha(f[c.fecha]) : null;
      var imp = null;
      if (c.importe >= 0) imp = numero(f[c.importe], decImp);
      else if (c.cargo >= 0 || c.abono >= 0) {
        var car = c.cargo >= 0 ? numero(f[c.cargo], decCar) : null;
        var abo = c.abono >= 0 ? numero(f[c.abono], decAbo) : null;
        if (car !== null || abo !== null) imp = (abo ? Math.abs(abo) : 0) - (car ? Math.abs(car) : 0);
      }
      if (!fe || imp === null || imp === 0) { rechazadas++; return; }
      if (opciones.invertirSigno) imp = -imp;
      var sal = c.saldo >= 0 ? numero(f[c.saldo], decSal) : null;
      movimientos.push({
        fecha: fe,
        concepto: (c.concepto >= 0 ? String(f[c.concepto] || '') : '').replace(/\s+/g, ' ').trim().slice(0, 300),
        importe: (Math.round(imp * 100) / 100).toFixed(2),
        saldo: sal === null ? null : (Math.round(sal * 100) / 100).toFixed(2)
      });
    });
    return { movimientos: movimientos, rechazadas: rechazadas };
  }

  var api = { leer: leer, leerTexto: leerTexto, leerXlsx: leerXlsx, detectar: detectar,
              normalizar: normalizar, numero: numero, fecha: fecha };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else raiz.LectorExtractos = api;
})(typeof window !== 'undefined' ? window : this);
