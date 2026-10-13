/* ═══════════════════════════════════════════════════════════════════════
   libros-aeat.js · Babyloon · Libros registro para importar en la AEAT

   POR QUÉ EXISTE
     El Pre130 (y el Pre303 y Renta Web) de la AEAT rellenan las casillas
     solos si les subes los libros registro en su Excel normalizado.
     Este archivo construye ese Excel en el navegador con los movimientos
     de la profesional: un único libro UNIFICADO (IVA + IRPF, tipo «T»),
     acumulado del 1 de enero al final del trimestre, como pide la AEAT.

   FORMATO (Formatos electrónicos de los Libros Registro, AEAT, v. 18-02-2026)
     · XLSX, máx. 4 MB, una hoja por libro:
         EXPEDIDAS_INGRESOS  ·  RECIBIDAS_GASTOS
     · Nombre: Ejercicio + NIF + «T» + Nombre  →  2026Y7782653LTNOMBRE.xlsx
     · Las COLUMNAS están todas en COLUMNAS_INGRESOS / COLUMNAS_GASTOS:
       si la plantilla oficial cambia, sólo se toca esa tabla.

   Datos: libros_registro_aeat(p_token, p_anio, p_trim) — mismo acceso que
   informe_contable (sesión de la profesional o enlace del gestor).
   Sin dependencias: el .xlsx se empaqueta con zip-ligero.js.
   ═══════════════════════════════════════════════════════════════════════ */
(function (raiz) {
  'use strict';

  /* ── Códigos de la AEAT (LSI.xlsx, diseños de registro normalizados) ── */
  // Concepto de gasto (IRPF) por categoría de gasto de Babyloon
  var CONCEPTO_GASTO = {
    material: 'G01',        // Compra de existencias (productos que se usan en los servicios)
    equipos: 'G03',         // Otros consumos de explotación (herramientas de poco valor)
    transporte: 'G22',      // Otros servicios exteriores (taxi, parking, combustible)
    formacion: 'G22',
    cuota_autonomo: 'G45',  // Seguridad Social del titular (G06 sólo hasta 1T 2024)
    seguros: 'G20',         // Primas de seguros
    telefono: 'G17',        // Suministro de telefonía e internet
    publicidad: 'G22',
    asesoria: 'G19',        // Servicios de profesionales independientes
    banco: 'G24',           // Otros gastos financieros
    local: 'G12',           // Arrendamientos y cánones
    suministros: 'GY4',     // Suministros (luz, agua…)
    vestuario: 'G03',
    platform_fee: 'G22',
    otros: 'G37'            // Otros conceptos fiscalmente deducibles
  };
  var SIN_FACTURA = { cuota_autonomo: 1 };   // justificante, no factura (F6, sin IVA)
  // Quién emite el justificante cuando no lo sabemos: la cuota de autónomos la cobra la TGSS
  var EMISOR_POR_DEFECTO = { cuota_autonomo: { nif: 'Q2827003A', nombre: 'TESORERIA GENERAL DE LA SEGURIDAD SOCIAL' } };
  var emisor = function (x) { var e = !x.nif && EMISOR_POR_DEFECTO[x.categoria]; return e ? e : { nif: x.nif, nombre: x.nombre }; };
  var CONCEPTO_INGRESO = 'I01';   // Ingresos de explotación
  var CLAVE_OPERACION = '01';     // Operación de régimen general
  var CALIFICACION = 'S1';        // Sujeta y no exenta, sin inversión del sujeto pasivo
  // Las cabeceras ocupan las filas 7 y 8, como en el diseño; los asientos empiezan en la 9.
  var FILA_CAB = 7, FILA_DATOS = 9;

  /* ── Ayudas ─────────────────────────────────────────────────────────── */
  var r2 = function (v) { var n = Number(v); return isFinite(n) ? Math.round(n * 100) / 100 : 0; };
  // Importes como pide la AEAT: sin separador de miles y con coma decimal (135,00 · -502,36)
  var dec = function (v) { return r2(v).toFixed(2).replace('.', ','); };
  var fechaAeat = function (iso) { var p = String(iso || '').slice(0, 10).split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : ''; };
  var periodo = function (f) { var m = Number(String(f || '').slice(5, 7)); return m ? Math.ceil(m / 3) + 'T' : ''; };
  var ejercicio = function (f) { return String(f || '').slice(0, 4); };
  var limpioNif = function (s) { return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); };
  // NIF español: 9 posiciones, letra al principio o al final y 8 cifras ([L]99999999[L])
  var esNifEs = function (s) { return /^([0-9]{8}[A-Z]|[A-Z][0-9]{7}[0-9A-Z])$/.test(limpioNif(s)); };
  // Serie y número: lo último que lleva cifras es el número; lo anterior, la serie
  function serieNumero(id) {
    var s = String(id || '').trim(); if (!s) return ['', ''];
    // Si no cabe en 20 + 20 (los números de Babyloon tienen 38), se parte en dos tal cual:
    // serie + número reproducen el número completo de la factura.
    if (s.length > 20) return [s.slice(0, 20), s.slice(20, 40)];
    var m = s.match(/^(.*?)[\s\-\/]*([0-9]+)$/);
    return m && m[1] ? [m[1].replace(/[\s\-\/]+$/, ''), m[2]] : ['', s];
  }
  // Código «A» (incluida en el IAE) · Tipo «03» (empresarial; peluquería y belleza son sección 1)
  // · Grupo o epígrafe en 4 posiciones: 972.1 → 9721
  function actividad(iae) {
    var e = String(iae || '').replace(/[^0-9]/g, '').slice(0, 4);
    return { codigo: 'A', tipo: '03', epigrafe: e };
  }
  var tipoIva = function (x) { return Number(x.base) ? Math.round(Number(x.iva) / Number(x.base) * 100) : 0; };
  // Gastos: F1 factura completa a su nombre · F2 ticket/simplificada · F6 justificante (cuota de autónomos…)
  var tipoFacturaGasto = function (x) { return SIN_FACTURA[x.categoria] && !Number(x.iva) ? 'F6' : x.completa === true ? 'F1' : 'F2'; };
  // En F2 la AEAT exige cuota deducible cero (sin tu NIF no se puede restar ese IVA)
  var cuotaDeducible = function (x) { return tipoFacturaGasto(x) === 'F2' ? 0 : Number(x.iva_deducible) || 0; };

  /* ── Columnas, en el orden del diseño (EXPEDIDAS_INGRESOS A…AJ · RECIBIDAS_GASTOS A…AP) ── */
  // [grupo, campo, función(fila, D, n) → valor, longitud máxima]
  var v0 = function () { return ''; };
  var COLUMNAS_INGRESOS = [
    ['Autoliquidación', 'Ejercicio', function (x) { return ejercicio(x.fecha_op || x.fecha_exp); }],
    ['Autoliquidación', 'Periodo', function (x) { return periodo(x.fecha_op || x.fecha_exp); }],
    ['Actividad', 'Código', function (x, D) { return D._act.codigo; }],
    ['Actividad', 'Tipo', function (x, D) { return D._act.tipo; }],
    ['Actividad', 'Grupo o Epígrafe del IAE', function (x, D) { return D._act.epigrafe; }],
    ['Tipo de Factura', '', function (x) { var id = x.nif && esNifEs(x.nif); return x.rectificativa ? (id ? 'R1' : 'R5') : (id ? 'F1' : 'F2'); }],
    ['Concepto de Ingreso', '', function () { return CONCEPTO_INGRESO; }],
    ['Ingreso Computable', '', function (x) { return dec(x.base); }],
    ['Fecha Expedición', '', function (x) { return fechaAeat(x.fecha_exp); }],
    ['Fecha Operación', '', function (x) { return x.fecha_op && x.fecha_op !== x.fecha_exp ? fechaAeat(x.fecha_op) : ''; }],
    ['Identificación de la Factura', 'Serie', function (x) { return serieNumero(x.numero)[0]; }, 20],
    ['Identificación de la Factura', 'Número', function (x) { return serieNumero(x.numero)[1]; }, 20],
    ['Identificación de la Factura', 'Número-Final', v0],
    ['NIF Destinatario', 'Tipo', function (x) { return x.nif && !esNifEs(x.nif) ? '06' : ''; }],
    ['NIF Destinatario', 'Código País', v0],
    ['NIF Destinatario', 'Identificación', function (x) { return x.nif ? limpioNif(x.nif) : ''; }, 20],
    ['Nombre Destinatario', '', function (x) { return x.nif ? (x.nombre || '') : 'VENTAS A CONSUMIDOR FINAL'; }, 40],
    ['Clave de Operación', '', function () { return CLAVE_OPERACION; }],
    ['Calificación de la Operación', '', function () { return CALIFICACION; }],
    ['Operación Exenta', '', v0],
    ['Total Factura', '', function (x) { return dec(r2(x.base) + r2(x.iva)); }],
    ['Base Imponible', '', function (x) { return dec(x.base); }],
    ['Tipo de IVA', '', function (x) { return dec(tipoIva(x)); }],
    ['Cuota IVA Repercutida', '', function (x) { return dec(x.iva); }],
    ['Tipo de Recargo Eq.', '', v0],
    ['Cuota Recargo Eq.', '', v0],
    ['Cobro', 'Fecha', v0], ['Cobro', 'Importe', v0], ['Cobro', 'Medio Utilizado', v0], ['Cobro', 'Identificación Medio Utilizado', v0],
    ['Tipo Retención del IRPF', '', v0],
    ['Importe Retenido del IRPF', '', v0],
    ['Registro Acuerdo Facturación', '', v0],
    ['Inmueble', 'Situación', v0], ['Inmueble', 'Referencia Catastral', v0],
    ['Referencia Externa', '', v0]
  ];
  var COLUMNAS_GASTOS = [
    ['Autoliquidación', 'Ejercicio', function (x) { return ejercicio(x.fecha_exp); }],
    ['Autoliquidación', 'Periodo', function (x) { return periodo(x.fecha_exp); }],
    ['Actividad', 'Código', function (x, D) { return D._act.codigo; }],
    ['Actividad', 'Tipo', function (x, D) { return D._act.tipo; }],
    ['Actividad', 'Grupo o Epígrafe del IAE', function (x, D) { return D._act.epigrafe; }],
    ['Tipo de Factura', '', tipoFacturaGasto],
    ['Concepto de Gasto', '', function (x) { return Number(x.gasto_deducible) ? (CONCEPTO_GASTO[x.categoria] || 'G37') : ''; }],
    ['Gasto Deducible', '', function (x) { return Number(x.gasto_deducible) ? dec(Math.min(r2(x.gasto_deducible), r2(x.base))) : ''; }],
    ['Fecha Expedición', '', function (x) { return fechaAeat(x.fecha_exp); }],
    ['Fecha Operación', '', function (x) { return x.fecha_op && x.fecha_op !== x.fecha_exp ? fechaAeat(x.fecha_op) : ''; }],
    ['Identificación Factura del Expedidor', '(Serie-Número)', function (x) { return x.numero || ''; }, 40],
    ['Identificación Factura del Expedidor', 'Número-Final', v0],
    ['Fecha Recepción', '', function (x) { return fechaAeat(x.fecha_exp); }],
    ['Número Recepción', '', function (x, D, n) { return String(n + 1); }],
    ['Número Recepción Final', '', v0],
    ['NIF Expedidor', 'Tipo', function (x) { var n = emisor(x).nif; return n && !esNifEs(n) ? '06' : ''; }],
    ['NIF Expedidor', 'Código País', v0],
    ['NIF Expedidor', 'Identificación', function (x) { var n = emisor(x).nif; return n ? limpioNif(n) : ''; }, 20],
    ['Nombre Expedidor', '', function (x) { return emisor(x).nombre || ''; }, 40],
    ['Clave de Operación', '', function () { return CLAVE_OPERACION; }],
    ['Bien de Inversión', '', function () { return 'N'; }],
    ['Inversión del Sujeto Pasivo', '', function () { return 'N'; }],
    ['Deducible en Periodo Posterior', '', function () { return 'N'; }],
    ['Periodo Deducción', 'Ejercicio', v0], ['Periodo Deducción', 'Periodo', v0],
    ['Total Factura', '', function (x) { return dec(r2(x.base) + r2(x.iva)); }],
    ['Base Imponible', '', function (x) { return dec(x.base); }],
    ['Tipo de IVA', '', function (x) { return dec(tipoIva(x)); }],
    ['Cuota IVA Soportado', '', function (x) { return dec(x.iva); }],
    ['Cuota Deducible', '', function (x) { return dec(cuotaDeducible(x)); }],
    ['Tipo de Recargo Eq.', '', v0],
    ['Cuota Recargo Eq.', '', v0],
    ['Pago', 'Fecha', v0], ['Pago', 'Importe', v0], ['Pago', 'Medio Utilizado', v0], ['Pago', 'Identificación Medio Utilizado', v0],
    ['Tipo Retención del IRPF', '', v0],
    ['Importe Retenido del IRPF', '', v0],
    ['Registro Acuerdo Facturación', '', v0],
    ['Inmueble', 'Situación', v0], ['Inmueble', 'Referencia Catastral', v0],
    ['Referencia Externa', '', v0]
  ];

  /* ── Escritor de .xlsx mínimo (OOXML) ───────────────────────────────── */
  var xmlEsc = function (s) { return String(s).replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; })
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ''); };
  function letra(i) { var s = ''; i++; while (i > 0) { var m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; }

  // estilos: 0 normal · 1 cabecera · 2 texto (todo se escribe como texto: 135,00 · 02/05/2018)
  var txt = function (ref, v, st) { return '<c r="' + ref + '" t="inlineStr" s="' + st + '"><is><t xml:space="preserve">' + xmlEsc(v) + '</t></is></c>'; };
  function hoja(cols, filas, D, titulo, letraLibro) {
    var f7 = '', f8 = '', merges = [], i = 0, h = FILA_CAB, h2 = FILA_CAB + 1;
    while (i < cols.length) { // cabecera de grupo: se combina sobre sus columnas (como en el diseño)
      var j = i; while (j + 1 < cols.length && cols[j + 1][0] === cols[i][0] && cols[i][1]) j++;
      f7 += txt(letra(i) + h, cols[i][0], 1);
      if (j > i) merges.push(letra(i) + h + ':' + letra(j) + h);
      else if (!cols[i][1]) merges.push(letra(i) + h + ':' + letra(i) + h2);
      i = j + 1;
    }
    cols.forEach(function (c, k) { if (c[1]) f8 += txt(letra(k) + h2, c[1], 1); });
    // Nada encima de las cabeceras: el validador de la AEAT lee cualquier fila con contenido como
    // un asiento (probado el 8-oct-2026: el título y «Ejercicio/NIF/Nombre» daban error).
    var cab = '';
    var cuerpo = filas.map(function (x, n) {
      var r = n + FILA_DATOS;
      return '<row r="' + r + '">' + cols.map(function (c, k) {
        var v = c[2](x, D, n); if (v === '' || v == null) return '';
        v = String(v); if (c[3]) v = v.slice(0, c[3]);
        return txt(letra(k) + r, v, 2);
      }).join('') + '</row>';
    }).join('');
    var anchos = cols.map(function (c, k) { var w = Math.max(10, Math.min(36, (c[1] || c[0]).length + 4)); return '<col min="' + (k + 1) + '" max="' + (k + 1) + '" width="' + w + '" customWidth="1"/>'; }).join('');
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
      '<sheetViews><sheetView workbookViewId="0"><pane ySplit="' + (FILA_DATOS - 1) + '" topLeftCell="A' + FILA_DATOS + '" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' +
      '<cols>' + anchos + '</cols><sheetData>' + cab + '<row r="' + h + '" ht="30" customHeight="1">' + f7 + '</row><row r="' + h2 + '">' + f8 + '</row>' + cuerpo + '</sheetData>' +
      (merges.length ? '<mergeCells count="' + merges.length + '">' + merges.map(function (m) { return '<mergeCell ref="' + m + '"/>'; }).join('') + '</mergeCells>' : '') +
      '</worksheet>';
  }
  function libro(hojas) { // hojas: [[nombre, xml]]
    var z = raiz.ZipLigero.crear(), x = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
    z.agregar('[Content_Types].xml', x + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' +
      '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>' +
      hojas.map(function (h, i) { return '<Override PartName="/xl/worksheets/sheet' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'; }).join('') + '</Types>');
    z.agregar('_rels/.rels', x + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
      '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>');
    z.agregar('docProps/core.xml', x + '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
      '<dc:creator>Babyloon</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">' + new Date().toISOString().slice(0, 19) + 'Z</dcterms:created></cp:coreProperties>');
    z.agregar('docProps/app.xml', x + '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Microsoft Excel</Application></Properties>');
    z.agregar('xl/workbook.xml', x + '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' +
      hojas.map(function (h, i) { return '<sheet name="' + xmlEsc(h[0]) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>'; }).join('') + '</sheets></workbook>');
    z.agregar('xl/_rels/workbook.xml.rels', x + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      hojas.map(function (h, i) { return '<Relationship Id="rId' + (i + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + (i + 1) + '.xml"/>'; }).join('') +
      '<Relationship Id="rId' + (hojas.length + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>');
    z.agregar('xl/styles.xml', x + '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      '<numFmts count="1"><numFmt numFmtId="164" formatCode="dd/mm/yyyy"/></numFmts>' +
      '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>' +
      '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>' +
      '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>' +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
      '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>' +
      '<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>' +
      '<xf numFmtId="2" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>' +
      '<xf numFmtId="49" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs>' +
      '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>');
    hojas.forEach(function (h, i) { z.agregar('xl/worksheets/sheet' + (i + 1) + '.xml', h[1]); });
    return z.generar();
  }

  /* ── Construir el libro con los datos de libros_registro_aeat ───────── */
  function construir(D) {
    D = Object.assign({}, D); D._act = actividad(D.iae);
    var ing = (D.ingresos || []).filter(function (x) { return Number(x.base) || Number(x.iva); });
    var gas = (D.gastos || []).filter(function (x) { return Number(x.base) || Number(x.iva); });
    var tit = D.titular || {}, nif = limpioNif(tit.nif);
    var nombre = String(tit.nombre || '').replace(/[\\\/:*?"<>|@]/g, '').replace(/\s+/g, ' ').trim();
    D.titular = Object.assign({}, tit, { nombre: nombre });
    var avisos = [];
    if (!nif) avisos.push({ k: 'lb_av_nif' });
    if (!D._act.epigrafe) avisos.push({ k: 'lb_av_iae' });
    var sinNif = gas.filter(function (x) { return !emisor(x).nif; }).length;
    if (sinNif) avisos.push({ k: 'lb_av_gas_nif', v: { n: sinNif } });
    var tk = gas.filter(function (x) { return tipoFacturaGasto(x) === 'F2' && Number(x.iva_deducible); });
    var suma = function (a, k) { return r2(a.reduce(function (s, x) { return s + (typeof k === 'function' ? k(x) : Number(x[k]) || 0); }, 0)); };
    if (tk.length) avisos.push({ k: 'lb_av_tickets', v: { n: tk.length, i: suma(tk, 'iva_deducible') } });
    var blob = libro([
      ['EXPEDIDAS_INGRESOS', hoja(COLUMNAS_INGRESOS, ing, D, 'LIBRO REGISTRO FACTURAS EXPEDIDAS Y LIBRO REGISTRO DE VENTAS E INGRESOS', 'T')],
      ['RECIBIDAS_GASTOS', hoja(COLUMNAS_GASTOS, gas, D, 'LIBRO REGISTRO FACTURAS RECIBIDAS Y LIBRO REGISTRO DE COMPRAS Y GASTOS', 'T')]]);
    return {
      nombre: String(D.anio) + nif + 'T' + nombre + '.xlsx',
      blob: new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      avisos: avisos,
      resumen: { ingresos: ing.length, gastos: gas.length, base: suma(ing, 'base'), deducible: suma(gas, 'gasto_deducible'),
                 iva: suma(ing, 'iva'), iva_ded: suma(gas, cuotaDeducible), iva_tickets: suma(tk, 'iva_deducible'), desde: D.desde, hasta: D.hasta }
    };
  }

  function descargar(sb, op) {
    return sb.rpc('libros_registro_aeat', { p_token: op.token || null, p_anio: op.anio, p_trim: op.trim }).then(function (r) {
      var d = r && r.data;
      if (r.error || !d || !d.ok) return { ok: false, error: (d && d.error) || (r.error && r.error.message) || 'error' };
      var L = construir(d);
      var a = document.createElement('a'); a.href = URL.createObjectURL(L.blob); a.download = L.nombre;
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
      return { ok: true, nombre: L.nombre, avisos: L.avisos, resumen: L.resumen };
    });
  }

  var api = { construir: construir, descargar: descargar, CONCEPTO_GASTO: CONCEPTO_GASTO,
              COLUMNAS_INGRESOS: COLUMNAS_INGRESOS, COLUMNAS_GASTOS: COLUMNAS_GASTOS, _serieNumero: serieNumero, _esNifEs: esNifEs, FILA_DATOS: FILA_DATOS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else raiz.BBLLibros = api;
})(typeof window !== 'undefined' ? window : this);
