/* ═══════════════════════════════════════════════════════════════════════
   modelos-es.js · Los modelos de la AEAT, casilla a casilla, en el mismo
   orden y con el mismo texto que el formulario oficial (ejercicio 2026).
   Lo usa modelo.html. Las etiquetas van en español a propósito: son las
   que la profesional ve en la sede y tiene que localizar para copiar.
   La explicación de cada casilla (ayuda) va traducida en i18n-modelos.js.

   Cada casilla: { n: número, k: clase, h: clave de ayuda, v?: variables }
     k = 'in'   blanca: se escribe (la marcamos en oro si lleva importe)
         'auto' amarilla: la calcula el formulario
         'off'  amarilla vacía: no se puede usar en este régimen
         'pre'  la rellena la AEAT con sus datos (se comprueba)
   Para añadir otro país o modelo: otro objeto con la misma forma.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  function base(n, p, cuota) {                 // base / tipo / cuota de un tipo de IVA
    return { tipo: true, celdas: [
      { n: n[0], k: 'in',   h: function (V) { return V[n[0]] ? ['md_h_base', { p: p }] : ['md_h_tipo_vacio']; }, movs: 'ing' + p },
      { n: n[1], k: 'auto', h: ['md_h_tipo'], fijo: p },
      { n: n[2], k: 'in',   h: function (V) { return V[n[2]] ? ['md_h_cuota', { b: n[0], p: p }] : ['md_h_tipo_vacio']; }, movs: 'ing' + p }
    ] };
  }
  function apagado(n, p) {                     // tipos que el formulario 2026 trae deshabilitados
    return { tipo: true, celdas: [
      { n: n[0], k: 'off', h: ['md_h_tipo_vacio'] }, { n: n[1], k: 'off', h: ['md_h_tipo'], fijo: p },
      { n: n[2], k: 'off', h: ['md_h_tipo_vacio'] }] };
  }
  function par(b, c, h) { return { celdas: [{ n: b, k: 'in', h: h || ['md_h_vacia'] }, null, { n: c, k: 'in', h: h || ['md_h_vacia'] }] }; }
  function una(n, k, h, extra) { var o = { n: n, k: k || 'in', h: h || ['md_h_vacia'] }; if (extra) for (var x in extra) o[x] = extra[x]; return o; }
  var NO = function () { return 'NO'; };

  var M303 = {
    id: '303', titulo: 'md_t303', impuesto: 'IVA',
    paginas: [
      { id: 'ident', nombre: 'Identificación', secciones: [{ titulo: 'Identificación', flags: [
        { txt: 'Sujeto pasivo que tributa exclusivamente a una Administración tributaria Foral con IVA a la importación liquidado por la Aduana pendiente de ingreso', v: NO, h: 'md_h_no' },
        { txt: 'Sujeto pasivo inscrito en el Registro de devolución mensual (art. 30 RIVA)', v: NO, h: 'md_h_no' },
        { txt: 'Sujeto pasivo que tributa exclusivamente en régimen general', v: function () { return 'SI'; }, h: 'md_h_general', escribir: true },
        { txt: 'Sujeto pasivo que tributa exclusivamente en régimen simplificado', v: NO, h: 'md_h_no' },
        { txt: 'Autoliquidación conjunta', v: NO, h: 'md_h_no' },
        { txt: 'Sujeto pasivo acogido al régimen especial del criterio de Caja (art. 163 undecies LIVA)', v: NO, h: 'md_h_no' },
        { txt: 'Sujeto pasivo destinatario de operaciones acogidas al régimen especial del criterio de caja', v: NO, h: 'md_h_no' },
        { txt: 'Opción por la aplicación de la prorrata especial (art. 103.Dos.1º LIVA)', v: function () { return ''; }, h: 'md_h_vacia' },
        { txt: 'Revocación de la opción por la aplicación de la prorrata especial (art. 103.Dos.1º LIVA)', v: function () { return ''; }, h: 'md_h_vacia' },
        { txt: 'Sujeto pasivo declarado en concurso de acreedores en el presente período de liquidación', v: NO, h: 'md_h_no' },
        { txt: 'Fecha en que se dictó el auto de declaración de concurso', v: function () { return ''; }, h: 'md_h_vacia' },
        { txt: 'Sujeto pasivo acogido voluntariamente al SII', v: NO, h: 'md_h_no' },
        { txt: 'Sujeto pasivo exonerado de la Declaración-resumen anual del IVA, modelo 390', v: function (V, ctx) { return ctx.trim === 4 ? 'NO' : ''; }, h: 'md_h_390', escribir: function (ctx) { return ctx.trim === 4; } }
      ] }] },
      { id: 'rg', nombre: 'Liquidación: Régimen general', secciones: [
        { titulo: 'IVA devengado', cab: ['Base imponible', 'Tipo %', 'Cuota'], grupos: [
          { txt: 'Régimen general', filas: [
            apagado(['150', '151', '152'], 0), apagado(['165', '166', '167'], ''),
            base(['01', '02', '03'], 4), apagado(['153', '154', '155'], ''),
            base(['04', '05', '06'], 10), base(['07', '08', '09'], 21)] },
          { txt: 'Adquisiciones intracomunitarias de bienes y servicios', filas: [par('10', '11')] },
          { txt: 'Otras operaciones con inversión del sujeto pasivo (excepto adq. intracom.)', filas: [par('12', '13')] },
          { txt: 'Modificación bases y cuotas', filas: [par('14', '15')] },
          { txt: 'Recargo equivalencia', filas: [
            { tipo: true, celdas: [una('156'), una('157', 'auto', ['md_h_tipo'], { fijo: '1,75' }), una('158')] },
            { tipo: true, celdas: [una('168'), una('169', 'auto', ['md_h_tipo'], { fijo: '0,50' }), una('170')] },
            apagado(['16', '17', '18'], ''),
            { tipo: true, celdas: [una('19'), una('20', 'auto', ['md_h_tipo'], { fijo: '1,40' }), una('21')] },
            { tipo: true, celdas: [una('22'), una('23', 'auto', ['md_h_tipo'], { fijo: '5,20' }), una('24')] }] },
          { txt: 'Modificaciones bases y cuotas del recargo de equivalencia', filas: [par('25', '26')] }
        ], total: { txt: 'Total cuota devengada (152 + 167 + 03 + 155 + 06 + 09 + 11 + 13 + 15 + 158 + 170 + 18 + 21 + 24 + 26)', c: una('27', 'auto', ['md_h_27'], { movs: 'ing' }) } },
        { titulo: 'IVA deducible', cab: ['Base', '', 'Cuota'], grupos: [
          { txt: 'Por cuotas soportadas en operaciones interiores corrientes', filas: [
            { celdas: [una('28', 'in', ['md_h_28'], { movs: 'gas' }), null, una('29', 'in', ['md_h_29'], { movs: 'gas' })] }] },
          { txt: 'Por cuotas soportadas en operaciones interiores con bienes de inversión', filas: [par('30', '31')] },
          { txt: 'Por cuotas soportadas en las importaciones de bienes corrientes', filas: [par('32', '33')] },
          { txt: 'Por cuotas soportadas en las importaciones de bienes de inversión', filas: [par('34', '35')] },
          { txt: 'En adquisiciones intracomunitarias de bienes y servicios corrientes', filas: [par('36', '37')] },
          { txt: 'En adquisiciones intracomunitarias de bienes de inversión', filas: [par('38', '39')] },
          { txt: 'Rectificación de deducciones', filas: [par('40', '41')] }
        ], lineas: [
          { txt: 'Compensaciones Régimen especial A.G. y P.', c: una('42') },
          { txt: 'Regularización bienes de inversión', c: una('43') },
          { txt: 'Regularización por aplicación del porcentaje definitivo de prorrata', c: una('44') },
          { txt: 'Total a deducir (29 + 31 + 33 + 35 + 37 + 39 + 41 + 42 + 43 + 44)', c: una('45', 'auto', ['md_h_45'], { movs: 'gas' }) },
          { txt: 'Resultado régimen general (27 - 45)', c: una('46', 'auto', ['md_h_46']), fuerte: true }
        ] }
      ] },
      { id: 'adic', nombre: 'Información adicional', secciones: [
        { titulo: 'Información adicional', lineas: [
          { txt: 'Entregas intracomunitarias de bienes y servicios', c: una('59') },
          { txt: 'Exportaciones y operaciones asimiladas', c: una('60') },
          { txt: 'Operaciones no sujetas por reglas de localización (excepto las incluidas en la casilla 123)', c: una('120') },
          { txt: 'Operaciones sujetas con inversión del sujeto pasivo', c: una('122') },
          { txt: 'Operaciones no sujetas por reglas de localización acogidas a los regímenes especiales de ventanilla única', c: una('123') },
          { txt: 'Operaciones sujetas y acogidas a los regímenes especiales de ventanilla única', c: una('124') }
        ] },
        { titulo: 'Exclusivamente para sujetos pasivos acogidos al régimen especial del criterio de caja y para aquéllos que sean destinatarios de operaciones afectadas por el mismo', cab: ['Base imponible', '', 'Cuota'], grupos: [
          { txt: 'Importes de las entregas de bienes y prestaciones de servicio a las que habiéndoles sido aplicado el régimen especial del criterio de caja hubieran resultado devengadas conforme a la regla general de devengo contenida en el art. 75 LIVA', filas: [
            { celdas: [una('62', 'off'), null, una('63', 'off')] }] },
          { txt: 'Importes de las adquisiciones de bienes y servicios a las que sea de aplicación o afecte el régimen especial de criterio de caja', filas: [
            { celdas: [una('74', 'off'), null, una('75', 'off')] }] }
        ] }
      ] },
      { id: 'res', nombre: 'Resultado', secciones: [
        { titulo: 'Resultado', lineas: [
          { txt: 'Regularización cuotas art. 80.Cinco.5ª LIVA', c: una('76') },
          { txt: 'Suma de resultados (46 + 58 + 76)', c: una('64', 'auto', ['md_h_64']) },
          { txt: 'Atribuible a la Administración del Estado', pct: una('65', 'in', ['md_h_65'], { fijo: '100,00' }), c: una('66', 'auto', ['md_h_66']) },
          { txt: 'IVA a la importación liquidado por la Aduana pendiente de ingreso', c: una('77', 'off') },
          { txt: 'Cuotas a compensar pendientes de periodos anteriores', c: una('110', 'pre', ['md_h_110'], { movs: 'comp' }) },
          { txt: 'Cuotas a compensar de periodos anteriores aplicadas en este periodo', c: una('78', 'auto', ['md_h_78'], { movs: 'comp' }) },
          { txt: 'Cuotas a compensar de periodos previos pendientes para periodos posteriores (110 - 78)', c: una('87', 'auto', ['md_h_87']) },
          { txt: 'Exclusivamente para sujetos pasivos que tributan conjuntamente a la Administración del Estado y a las Diputaciones Forales. Resultado de la regularización anual', c: una('68') },
          { txt: 'Exclusivamente para determinados supuestos de autoliquidación rectificativa por discrepancia de criterio administrativo que no deban incluirse en otras casillas. Otros ajustes', c: una('108', 'off') },
          { txt: 'Resultado de la autoliquidación (66 + 77 - 78 + 68 + 108)', c: una('69', 'auto', ['md_h_69']) },
          { txt: 'Resultados a ingresar de anteriores autoliquidaciones o liquidaciones administrativas correspondientes al ejercicio y período objeto de la autoliquidación', c: una('70') },
          { txt: 'Devoluciones acordadas por la Agencia Tributaria como consecuencia de la tramitación de anteriores autoliquidaciones correspondientes al ejercicio y período objeto de la autoliquidación', c: una('109') },
          { txt: 'Resultado (69 - 70 + 109 - 112)', c: una('71', 'auto', ['md_h_71']), fuerte: true }
        ] }
      ] }
    ]
  };

  var M130 = {
    id: '130', titulo: 'md_t130', impuesto: 'IRPF',
    paginas: [
      { id: 'liq', nombre: 'Liquidación', secciones: [
        { titulo: 'I. Actividades económicas en estimación directa, modalidad normal o simplificada, distintas de las agrícolas, ganaderas, forestales y pesqueras', lineas: [
          { txt: 'Ingresos computables', c: una('01', 'in', ['md_h130_01'], { movs: 'ytd_ing' }) },
          { txt: 'Gastos fiscalmente deducibles', c: una('02', 'in', ['md_h130_02'], { movs: 'ytd_gas' }) },
          { txt: 'Rendimiento neto (01 - 02)', c: una('03', 'auto', ['md_h130_03']) },
          { txt: '20 por 100 del importe de la casilla 03, si es positivo', c: una('04', 'auto', function (V) { return ['md_h130_04', { p: Math.round(Number(V.tipo || 0.2) * 100) }]; }) },
          { txt: 'A deducir: de los trimestres anteriores del mismo ejercicio, por pagos fraccionados anteriores', c: una('05', 'in', ['md_h130_05'], { movs: 'prev130' }) },
          { txt: 'Retenciones e ingresos a cuenta soportados', c: una('06', 'in', ['md_h130_06']) },
          { txt: 'Pago fraccionado previo del trimestre (04 - 05 - 06)', c: una('07', 'auto', ['md_h130_07']) }
        ] },
        { titulo: 'II. Actividades agrícolas, ganaderas, forestales y pesqueras en estimación directa, modalidad normal o simplificada', lineas: [
          { txt: 'Volumen de ingresos del trimestre', c: una('08', 'off', ['md_h130_agri']) },
          { txt: '2 por 100 del importe de la casilla 08', c: una('09', 'off', ['md_h130_agri']) },
          { txt: 'A deducir: retenciones e ingresos a cuenta soportados', c: una('10', 'off', ['md_h130_agri']) },
          { txt: 'Pago fraccionado previo del trimestre (09 - 10)', c: una('11', 'off', ['md_h130_agri']) }
        ] },
        { titulo: 'III. Total liquidación', lineas: [
          { txt: 'Suma de pagos fraccionados previos del trimestre (07 + 11)', c: una('12', 'auto', ['md_h130_12']) },
          { txt: 'Minoración por aplicación de la deducción del art. 110.3.c) del Reglamento del Impuesto', c: una('13', 'in', function (V, ctx) { return ['md_h130_13', { r: ctx.eur(V.rendimiento_anio_anterior) }]; }) },
          { txt: 'Diferencia (12 - 13)', c: una('14', 'auto', ['md_h130_14']) },
          { txt: 'A deducir: resultados negativos de trimestres anteriores del mismo ejercicio', c: una('15', 'in', ['md_h130_15'], { movs: 'prev130neg' }) },
          { txt: 'Pago de préstamos para la adquisición o rehabilitación de la vivienda habitual', c: una('16', 'in', ['md_h130_16']) },
          { txt: 'Total (14 - 15 - 16)', c: una('17', 'auto', ['md_h130_17']) },
          { txt: 'A deducir: resultado a ingresar de anteriores autoliquidaciones por el mismo concepto, ejercicio y período (complementaria)', c: una('18', 'in', ['md_h130_18']) },
          { txt: 'Resultado de la autoliquidación (17 - 18)', c: una('19', 'auto', ['md_h130_19']), fuerte: true }
        ] }
      ] }
    ]
  };

  window.BBLModelos = window.BBLModelos || {};
  window.BBLModelos.ES = {
    pais: 'ES', modelos: { '303': M303, '130': M130 },
    // Plazo general de presentación (sin domiciliación): 20 del mes siguiente al trimestre; el 4T, 30 de enero
    plazo: function (anio, trim) { return trim === 4 ? new Date(anio + 1, 0, 30) : new Date(anio, trim * 3, 20); },
    resultado: { '303': '71', '130': '19' }
  };
})();
