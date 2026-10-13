/* ═══════════════════════════════════════════════════════════════════════
   consejos.js · Babyloon · «Tu gestor te aconseja»

   Banner de consejos en el gestor de la profesional. Dos fuentes:
     · los que escribe el equipo (generales por país, o para ella sola),
       desde el panel de administración → gestor_consejos;
     · los que salen de sus números (tickets sin su NIF, taxis, comidas,
       la tele en la factura del teléfono, plazos…) → _consejos_auto.
   Todo llega con mis_consejos_gestor(p_lang). «Hecho», «Más tarde» y
   «No me interesa» se guardan con consejo_gestor_marcar: un consejo
   automático vuelve sólo si aparecen movimientos nuevos.

   Uso:   BBLConsejos.montar(document.getElementById('gsConsejos'), sb)
   Textos: i18n-consejos.js (16 idiomas). Sin dependencias.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var T = function (k, alt) { try { var s = BBL.t(k); return (s && s !== k) ? s : (alt == null ? '' : alt); } catch (_) { return alt == null ? '' : alt; } };
  var con = function (t, v) { return String(t).replace(/\{(\w+)\}/g, function (_, k) { return v && v[k] != null ? v[k] : ''; }); };
  var esc = function (s) { return (s == null ? '' : String(s)).replace(/[<>&"']/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var lang = function () { return (window.BBL && BBL.lang) || 'es'; };
  var eur = function (v, dec) { var n = Number(v); if (!isFinite(n)) return '—';
    try { return new Intl.NumberFormat(lang(), { style: 'currency', currency: 'EUR', maximumFractionDigits: dec == null ? 2 : dec, minimumFractionDigits: dec == null ? 2 : dec }).format(n); } catch (_) { return n.toFixed(dec == null ? 2 : dec) + ' €'; } };
  var num = function (v, d) { try { return new Intl.NumberFormat(lang(), { maximumFractionDigits: d || 0 }).format(Number(v) || 0); } catch (_) { return String(v); } };
  var fecha = function (f) { var p = String(f || '').slice(0, 10).split('-'); if (p.length !== 3) return '';
    try { return new Intl.DateTimeFormat(lang(), { day: 'numeric', month: 'short' }).format(new Date(+p[0], +p[1] - 1, +p[2])); } catch (_) { return p[2] + '/' + p[1]; } };
  var fechaLarga = function (f) { var p = String(f || '').slice(0, 10).split('-'); if (p.length !== 3) return '';
    try { return new Intl.DateTimeFormat(lang(), { day: 'numeric', month: 'long' }).format(new Date(+p[0], +p[1] - 1, +p[2])); } catch (_) { return p[2] + '/' + p[1]; } };

  /* ── Estilos (con prefijo, para no tocar los de la página) ── */
  var CSS = '' +
    '.bc{margin:0 0 18px}' +
    '.bc-cab{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin:0 0 10px}' +
    '.bc-cab h2{margin:0;font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;font-size:26px;line-height:1.1}' +
    '.bc-cab p{margin:4px 0 0;color:#6B5E66;font-size:13.5px}' +
    '.bc-lista{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}' +
    '.bc-c{position:relative;display:flex;flex-direction:column;gap:8px;background:#fff;border:1px solid #E4DCD3;border-radius:10px;padding:16px 16px 12px}' +
    '.bc-c.ti{border-color:#C8A96A;box-shadow:0 0 0 1px #C8A96A inset;background:linear-gradient(180deg,#FFFBF2,#fff 60%)}' +
    '.bc-chip{align-self:flex-start;font-size:11px;letter-spacing:.06em;text-transform:uppercase;border-radius:999px;padding:3px 9px;background:#F3EEE7;color:#6B5E66}' +
    '.bc-c.ti .bc-chip{background:#C8A96A;color:#1B1219}' +
    '.bc-chip.pat{background:#EEF1F6;color:#3E4A5C}' +
    '.bc-c h3{margin:0;font-size:16px;line-height:1.3;font-weight:600;color:#1B1219;padding-right:22px}' +
    '.bc-c p{margin:0;font-size:13.5px;line-height:1.5;color:#3A2F36;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}' +
    '.bc-acc{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:auto;padding-top:6px}' +
    '.bc-b{font:inherit;font-size:13px;border-radius:999px;padding:8px 14px;border:1px solid #1B1219;background:#1B1219;color:#fff;cursor:pointer;text-decoration:none}' +
    '.bc-b.l{background:transparent;color:#1B1219;border-color:#D8CEC3}' +
    '.bc-b.t{background:none;border:none;color:#6B5E66;padding:8px 6px;text-decoration:underline}' +
    '.bc-x{position:absolute;top:8px;right:8px;width:28px;height:28px;border-radius:50%;border:none;background:transparent;color:#8A7D84;font-size:18px;cursor:pointer}' +
    '.bc-x:hover{background:#F3EEE7}' +
    '.bc-mas{margin-top:10px}' +
    /* móvil: carrusel horizontal, se desliza con el dedo */
    '@media(max-width:600px){.bc-lista.carrusel{grid-auto-flow:column;grid-auto-columns:86%;grid-template-columns:none;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 -16px;padding:2px 16px 8px;scrollbar-width:none}' +
    '.bc-lista.carrusel::-webkit-scrollbar{display:none}.bc-lista.carrusel .bc-c{scroll-snap-align:start}}' +
    '.bc-puntos{display:none}@media(max-width:600px){.bc-puntos{display:block;text-align:center;font-size:12px;color:#6B5E66;margin-top:4px}}' +
    /* modal */
    '.bc-velo{position:fixed;inset:0;background:rgba(27,18,25,.45);z-index:9998;display:flex;align-items:flex-end;justify-content:center}' +
    '@media(min-width:720px){.bc-velo{align-items:center}}' +
    '.bc-mod{background:#FBF8F4;color:#1B1219;width:100%;max-width:760px;max-height:92vh;overflow:auto;border-radius:14px 14px 0 0;padding:20px 18px 24px;box-sizing:border-box}' +
    '@media(min-width:720px){.bc-mod{border-radius:14px;padding:26px 28px}}' +
    '.bc-mod h2{font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;font-size:26px;margin:0 36px 6px 0;line-height:1.15}' +
    '.bc-mod .sub{color:#6B5E66;font-size:14px;margin:0 0 14px}' +
    '.bc-mod .cerrar{position:sticky;top:0;float:right;font:inherit;font-size:13px;border:1px solid #D8CEC3;background:#fff;border-radius:999px;padding:6px 12px;cursor:pointer}' +
    '.bc-mod table{width:100%;border-collapse:collapse;font-size:13.5px;margin:8px 0 14px;background:#fff}' +
    '.bc-mod th,.bc-mod td{text-align:left;padding:8px 8px;border-bottom:1px solid #EDE6DD;vertical-align:top}' +
    '.bc-mod th{font-weight:600;font-size:12px;color:#6B5E66}' +
    '.bc-mod td.n,.bc-mod th.n{text-align:right;white-space:nowrap}' +
    '.bc-nota{font-size:13px;color:#6B5E66;background:#F3EEE7;border-radius:8px;padding:10px 12px;margin:12px 0 0}' +
    '.bc-frase{background:#fff;border-left:3px solid #C8A96A;padding:10px 12px;margin:12px 0;font-size:14.5px}' +
    '.bc-frase b{display:block;font-size:12px;color:#6B5E66;font-weight:600;margin-bottom:4px}' +
    /* factura modelo */
    '.bc-fl{display:grid;grid-template-columns:1fr;gap:14px}@media(min-width:640px){.bc-fl{grid-template-columns:1.35fr 1fr}}' +
    '.bc-doc{background:#fff;border:1px solid #E4DCD3;border-radius:8px;padding:14px 14px 12px;font-size:12.5px;position:relative}' +
    '.bc-doc h4{margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase}' +
    '.bc-doc .r{display:flex;justify-content:space-between;gap:8px;padding:3px 0}' +
    '.bc-doc .m{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:50%;background:#C8A96A;color:#1B1219;font-size:11px;font-weight:700;margin-right:6px;flex:none}' +
    '.bc-doc .gr{color:#8A7D84}' +
    '.bc-doc .falta{border:1.5px dashed #B23B3B;border-radius:6px;padding:6px 8px;color:#B23B3B;margin:6px 0}' +
    '.bc-doc .linea{border-top:1px solid #EDE6DD;margin:6px 0}' +
    '.bc-ok,.bc-ko{font-size:13px;font-weight:600;margin-top:8px;display:flex;gap:6px;align-items:center}' +
    '.bc-ok{color:#2E7D57}.bc-ko{color:#B23B3B}' +
    '.bc-leyenda{list-style:none;margin:10px 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;font-size:13px}' +
    '.bc-leyenda li{display:flex;align-items:flex-start}' +
    /* calendario */
    '.bc-cal{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:6px 0 4px}@media(max-width:520px){.bc-cal{grid-template-columns:1fr 1fr}}' +
    '.bc-cal div{background:#fff;border:1px solid #E4DCD3;border-radius:10px;padding:12px;text-align:center}' +
    '.bc-cal div.ya{opacity:.55}.bc-cal div.ahora{border-color:#C8A96A;box-shadow:0 0 0 2px #C8A96A inset}' +
    '.bc-cal b{display:block;font-size:20px;font-family:"Cormorant Garamond",Georgia,serif}' +
    '.bc-cal span{display:block;font-size:12.5px;color:#6B5E66}' +
    '.bc-cal i{display:inline-block;margin-top:6px;font-style:normal;font-size:11px;background:#C8A96A;border-radius:999px;padding:2px 8px}' +
    /* reglas sí / no */
    '.bc-reglas{display:grid;grid-template-columns:1fr;gap:10px}@media(min-width:560px){.bc-reglas{grid-template-columns:1fr 1fr}}' +
    '.bc-reglas ul{list-style:none;margin:0;padding:12px 14px;background:#fff;border:1px solid #E4DCD3;border-radius:10px}' +
    '.bc-reglas li{padding:5px 0 5px 24px;position:relative;font-size:13.5px}' +
    '.bc-reglas li:before{position:absolute;left:0;top:4px;font-weight:700}' +
    '.bc-reglas .si li:before{content:"✓";color:#2E7D57}.bc-reglas .no li:before{content:"✕";color:#B23B3B}' +
    /* barras gasto mixto */
    '.bc-barras{background:#fff;border:1px solid #E4DCD3;border-radius:10px;padding:12px 14px}' +
    '.bc-barra{display:grid;grid-template-columns:minmax(110px,1fr) 2fr auto;gap:10px;align-items:center;font-size:13px;padding:6px 0}' +
    '.bc-barra .b{height:12px;border-radius:6px;background:#EDE6DD;position:relative;overflow:hidden}' +
    '.bc-barra .b span{position:absolute;inset:0 auto 0 0;background:#2E7D57;border-radius:6px}' +
    '.bc-barra .b.no span{background:#B23B3B}' +
    /* pasos */
    '.bc-pasos{counter-reset:p;list-style:none;margin:6px 0;padding:0}' +
    '.bc-pasos li{counter-increment:p;position:relative;padding:8px 0 8px 38px;font-size:14px}' +
    '.bc-pasos li:before{content:counter(p);position:absolute;left:0;top:6px;width:26px;height:26px;border-radius:50%;background:#1B1219;color:#fff;font-size:13px;display:flex;align-items:center;justify-content:center}' +
    /* simulador */
    '.bc-sim{display:grid;grid-template-columns:1fr;gap:10px 14px}@media(min-width:640px){.bc-sim{grid-template-columns:1fr 1fr}}' +
    '.bc-sim label{display:flex;flex-direction:column;gap:4px;font-size:12.5px;color:#6B5E66}' +
    '.bc-sim input,.bc-sim select{font:inherit;font-size:15px;color:#1B1219;padding:9px 10px;border:1px solid #D8CEC3;border-radius:8px;background:#fff;width:100%;box-sizing:border-box}' +
    '.bc-sim .chk{flex-direction:row;align-items:flex-start;gap:8px;color:#1B1219;font-size:13.5px;grid-column:1/-1}' +
    '.bc-sim .chk input{width:auto;margin-top:3px}' +
    '.bc-sim .chk small{display:block;color:#6B5E66;font-size:12px;margin-top:2px}' +
    '.bc-sim fieldset{grid-column:1/-1;border:1px solid #E4DCD3;border-radius:10px;padding:10px 12px 12px;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;background:#fff}' +
    '@media(max-width:520px){.bc-sim fieldset{grid-template-columns:1fr}}' +
    '.bc-sim legend{font-size:12px;font-weight:600;color:#1B1219;padding:0 4px}' +
    '.bc-res tr.mejor td{background:#F4FAF6;font-weight:600}' +
    '.bc-res-txt{font-size:15px;margin:10px 0 0}.bc-res-txt b{color:#2E7D57}' +
    '.bc-scroll{overflow-x:auto}';

  function estilos() {
    if (document.getElementById('bc-css')) return;
    var s = document.createElement('style'); s.id = 'bc-css'; s.textContent = CSS; document.head.appendChild(s);
  }

  /* ── Textos de los consejos automáticos ── */
  function textoAuto(c) {
    var d = c.datos || {}, k = c.codigo;
    if (k === 'tickets') return { t: con(T('cj_tickets_t'), { n: d.n, iva: eur(d.iva) }), x: T('cj_tickets_x'), b: T('cj_tickets_b') };
    if (k === 'taxis') {
      // Lo que paga de verdad (con IVA), llevado a un año con lo que lleva gastado
      var anual = (Number(d.base) + Number(d.iva || 0)) * 365 / Math.max(Number(d.dias) || 0, 30);
      var x = d.eur_km ? con(T('cj_taxis_x'), { a: eur(anual, 0), k: eur(Number(d.eur_km) * 1.1) }) : con(T('cj_taxis_x2'), { a: eur(anual, 0) });
      return { t: con(T('cj_taxis_t'), { n: d.n, d: d.dias }), x: x, b: T('cj_taxis_b') };
    }
    if (k === 'comidas') return { t: T('cj_comidas_t'), x: con(T('cj_comidas_x'), { n: d.n, total: eur(d.total) }), b: T('cj_ver_reglas') };
    if (k === 'tv_telefono') return { t: T('cj_tv_t'), x: con(T('cj_tv_x'), { n: d.n, base: eur(d.base) }), b: T('cj_ver_ejemplo') };
    if (k === 'sin_justificante') return { t: con(T('cj_sinjust_t'), { n: d.n }), x: con(T('cj_sinjust_x'), { total: eur(d.total) }), b: T('cj_ver_mas') };
    if (k === 'sin_extractos') return { t: T('cj_sinext_t'), x: T('cj_sinext_x'), b: T('cj_ver_mas') };
    if (k === 'plazo') {
      var t = Number(d.dias) <= 0 ? con(T('cj_plazo_t1'), { q: d.trimestre }) : con(T('cj_plazo_t'), { d: d.dias, q: d.trimestre });
      return { t: t, x: con(T('cj_plazo_x'), { r303: eur(d.r303), r130: eur(d.r130), f: fechaLarga(d.fecha) }), b: T('cj_ver_mas') };
    }
    if (k === 'casa_afecta') return { t: T('cj_casa_t'), x: con(T(d.alquiler ? 'cj_casa_x' : 'cj_casa_x2'), { p: num(d.pct), s: num(d.pct_sum, 1), a: eur(d.alquiler, 0) }), b: T('cj_como') };
    if (k === 'facturas_tarde') return { t: T('cj_tarde_t'), x: con(T('cj_tarde_x'), { n: d.n, d: d.dias }), b: T('cj_ver_mas') };
    if (k === 'financiacion') {
      var bancos = Array.isArray(d.bancos) ? d.bancos.filter(Boolean) : [];
      return { t: T('cj_fin_t'), x: con(T(bancos.length ? 'cj_fin_xb' : 'cj_fin_x'), { r: eur(d.rend, 0), b: bancos[0] || '' }), b: T('cj_fin_b') };
    }
    return null;
  }

  /* ── Componentes visuales de los modales ── */
  function vFactura(c) {
    var d = (c && c.datos) || {};
    var h = '<div class="bc-fl"><div>' +
      '<div class="bc-doc"><h4>' + esc(T('cj_fl_completa')) + '</h4>' +
        '<div class="r"><span><span class="m">1</span>F-2026/0142</span><span><span class="m">2</span>14/09/2026</span></div>' +
        '<div class="r"><span><span class="m">3</span>Distribuciones Ejemplo, S.L. · B00000000</span></div>' +
        '<div class="r"><span><span class="m">4</span><span class="gr">' + esc(T('cj_fl_tu')) + '</span></span></div>' +
        '<div class="linea"></div>' +
        '<div class="r"><span><span class="m">5</span>' + esc(T('cj_fl_ej_concepto')) + '</span></div>' +
        '<div class="r"><span><span class="m">6</span>' + esc(T('cj_fl_base')) + '</span><span>40,00 €</span></div>' +
        '<div class="r"><span><span class="m">7</span>IVA 21 %</span><span>8,40 €</span></div>' +
        '<div class="r"><b><span class="m">8</span>' + esc(T('cj_fl_total')) + '</b><b>48,40 €</b></div>' +
        '<div class="bc-ok">✓ ' + esc(T('cj_fl_si')) + '</div></div>' +
      '</div><div>' +
      '<div class="bc-doc"><h4>' + esc(T('cj_fl_ticket')) + '</h4>' +
        '<div class="r"><span>T-88213</span><span>14/09/2026</span></div>' +
        '<div class="r"><span>Distribuciones Ejemplo, S.L. · B00000000</span></div>' +
        '<div class="falta">' + esc(T('cj_fl_falta')) + '</div>' +
        '<div class="r"><span>' + esc(T('cj_fl_total')) + ' (IVA incl.)</span><b>48,40 €</b></div>' +
        '<div class="bc-ko">✕ ' + esc(T('cj_fl_no')) + '</div></div>' +
      '</div></div>' +
      '<ul class="bc-leyenda">' + [1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return '<li><span class="m" style="display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:50%;background:#C8A96A;font-size:11px;font-weight:700;margin-right:6px;flex:none">' + i + '</span>' + esc(T('cj_fl_' + i)) + '</li>'; }).join('') + '</ul>' +
      '<div class="bc-frase"><b>' + esc(T('cj_fl_pide')) + '</b>«¿Me puede hacer factura completa a mi nombre? Le doy mi NIF.»</div>';
    if (Array.isArray(d.lista) && d.lista.length) {
      h += '<h3 style="margin:16px 0 4px;font-size:15px">' + esc(T('cj_tk_lista')) + '</h3><div class="bc-scroll"><table><thead><tr><th>' + esc(T('cj_c_fecha')) + '</th><th>' + esc(T('cj_c_tienda')) + '</th><th>' + esc(T('cj_c_numero')) + '</th><th class="n">IVA</th></tr></thead><tbody>' +
        d.lista.map(function (x) { return '<tr><td>' + esc(fecha(x.fecha)) + '</td><td>' + esc(x.proveedor) + '</td><td>' + esc(x.numero || '—') + '</td><td class="n">' + esc(eur(x.iva)) + '</td></tr>'; }).join('') +
        '</tbody></table></div><p class="bc-nota">' + esc(T('cj_tk_nota')) + '</p>';
    }
    return h;
  }
  function vPlazos(c) {
    var d = (c && c.datos) || {}, hoy = new Date(), y = hoy.getFullYear();
    var mes = function (m) { try { return new Intl.DateTimeFormat(lang(), { month: 'long' }).format(new Date(2026, m, 1)); } catch (_) { return String(m + 1); } };
    var cal = [[3, 20, 1, y], [6, 20, 2, y], [9, 20, 3, y], [0, 30, 4, y + 1]];
    var ahora = d.trimestre ? Number(d.trimestre) : null;
    var h = '<div class="bc-cal">' + cal.map(function (x) {
      var limite = new Date(x[3], x[0], x[1], 23, 59), ya = limite < hoy && !(ahora === x[2]);
      return '<div class="' + (ahora === x[2] ? 'ahora' : ya ? 'ya' : '') + '"><b>' + x[2] + 'T</b><span>1–' + x[1] + ' ' + esc(mes(x[0])) + '</span>' +
        (ahora === x[2] ? '<i>' + esc(T('cj_pl_ahora')) + '</i>' : '') + '</div>'; }).join('') + '</div>';
    if (d.trimestre) {
      var p = 'anio=' + encodeURIComponent(d.anio) + '&trim=' + encodeURIComponent(d.trimestre);
      h += '<table><tbody><tr><td>' + esc(T('cj_pl_303')) + '</td><td class="n"><b>' + esc(eur(d.r303)) + '</b></td><td class="n"><a class="bc-b l" target="_blank" rel="noopener" href="modelo.html?m=303&' + p + '">' + esc(T('cj_plazo_b303')) + '</a></td></tr>' +
        '<tr><td>' + esc(T('cj_pl_130')) + '</td><td class="n"><b>' + esc(eur(d.r130)) + '</b></td><td class="n"><a class="bc-b l" target="_blank" rel="noopener" href="modelo.html?m=130&' + p + '">' + esc(T('cj_plazo_b130')) + '</a></td></tr></tbody></table>';
      if (Number(d.r130) < 0) h += '<p class="bc-nota">' + esc(T('cj_pl_neg130')) + '</p>';
    }
    h += '<p class="bc-nota">' + esc(T('cj_pl_cero')) + '</p>';
    return h;
  }
  function vComidas(c) {
    var d = (c && c.datos) || {};
    var h = '<div class="bc-reglas"><ul class="si">' + [1, 2, 3, 4].map(function (i) { return '<li>' + esc(T('cj_cm_si' + i)) + '</li>'; }).join('') + '</ul>' +
      '<ul class="no">' + [1, 2, 3].map(function (i) { return '<li>' + esc(T('cj_cm_no' + i)) + '</li>'; }).join('') + '</ul></div>';
    if (Array.isArray(d.lista) && d.lista.length) {
      h += '<h3 style="margin:16px 0 4px;font-size:15px">' + esc(T('cj_cm_tuyos')) + '</h3><div class="bc-scroll"><table><tbody>' +
        d.lista.map(function (x) { var mucho = Number(x.importe) > 26.67;
          return '<tr><td>' + esc(fecha(x.fecha)) + '</td><td>' + esc(x.proveedor) + '</td><td class="n">' + esc(eur(x.importe)) + (mucho ? ' <span style="color:#B23B3B">· ' + esc(T('cj_cm_supera')) + '</span>' : '') + '</td></tr>'; }).join('') +
        '</tbody></table></div>';
    }
    return h;
  }
  function vMixtos(c) {
    var d = (c && c.datos) || {};
    var fila = function (t, v, pct, no) { return '<div class="bc-barra"><span>' + esc(t) + '</span><span class="b' + (no ? ' no' : '') + '"><span style="width:' + pct + '%"></span></span><span>' + esc(no ? T('cj_gm_no') : con(T('cj_gm_resta'), { p: pct })) + '</span></div>'; };
    var h = '<h3 style="margin:4px 0 6px;font-size:15px">' + esc(T('cj_gm_titulo')) + '</h3><div class="bc-barras">' +
      fila(T('cj_gm_linea'), 40, 50) + fila(T('cj_gm_internet'), 35, 50) + fila(T('cj_gm_tv'), 65, 100, true) + '</div>' +
      '<p class="bc-nota">' + esc(T('cj_gm_pista')) + '</p>';
    if (d.n) h += '<p class="bc-nota">' + esc(con(T('cj_tv_x'), { n: d.n, base: eur(d.base) })) + '</p>';
    return h;
  }
  // {sec}: el nombre real del apartado del banco en la página (cb_titulo, de i18n-gestor.js)
  function vPasos(claves) { return '<ol class="bc-pasos">' + claves.map(function (k) { return '<li>' + esc(con(T(k), { sec: T('cb_titulo', 'Conciliación bancaria') })) + '</li>'; }).join('') + '</ol>'; }

  /* ── Simulador: taxi, comprar con préstamo, renting o leasing ──
     Reglas de España (2026):
     · IVA de turismos: se presume afecto al 50 % (art. 95.Tres LIVA). Taxi: IVA del 10 %, deducible entero con factura completa.
     · IRPF: un turismo sólo es gasto si se usa EXCLUSIVAMENTE para la actividad (art. 22 RIRPF). Si no, nada.
       Amortización máxima de elementos de transporte: 16 % al año.
     · El taxi del trabajo, con factura, es gasto entero en IRPF. */
  function simular(v) {
    var IVA = 0.21, kmT = Math.max(0, v.kmT), K = v.exclusivo ? kmT : kmT + Math.max(0, v.kmP), t = v.tramo / 100, n = Math.max(1, v.anios);
    var neto = function (o) { o.neto = o.coste - o.iva - o.irpf; o.km = kmT ? o.neto / kmT : null; return o; };
    var r = [];
    // Taxi
    var ct = kmT * v.taxiKm, ivt = v.factura ? ct * 0.10 / 1.10 : 0;
    r.push(neto({ id: 'taxi', coste: ct, iva: ivt, irpf: (ct - ivt) * t }));
    // Comprar con préstamo
    var P = v.precio, prin = P * (1 - v.entrada / 100), i = v.tin / 1200, N = n * 12;
    var cuota = i ? prin * i / (1 - Math.pow(1 + i, -N)) : prin / N, inter = cuota * N - prin;
    var comb = v.gasolina * K, ivaP = P * IVA / (1 + IVA) * 0.5, ivaC = comb * IVA / (1 + IVA) * 0.5, ivaM = v.mant * IVA / (1 + IVA) * 0.5;
    var cc = P * (1 - v.reventa / 100) / n + inter / n + v.seguro + v.mant + comb;
    var dedC = v.exclusivo ? ((P - ivaP) * Math.min(0.16, 1 / n) + inter / n + v.seguro + (v.mant - ivaM) + (comb - ivaC)) : 0;
    r.push(neto({ id: 'compra', coste: cc, iva: ivaP / n + ivaC + ivaM, irpf: dedC * t, cuota: cuota }));
    // Renting (seguro y mantenimiento incluidos)
    var cr = v.renting * 12 + comb, ivr = v.renting * 12 * IVA / (1 + IVA) * 0.5 + ivaC;
    r.push(neto({ id: 'renting', coste: cr, iva: ivr, irpf: v.exclusivo ? (cr - ivr) * t : 0 }));
    // Leasing
    var cl = v.leasing * 12 + v.seguro + v.mant + comb, ivl = v.leasing * 12 * IVA / (1 + IVA) * 0.5 + ivaM + ivaC;
    r.push(neto({ id: 'leasing', coste: cl, iva: ivl, irpf: v.exclusivo ? (cl - ivl) * t : 0 }));
    var mejor = r.reduce(function (a, b) { return b.neto < a.neto ? b : a; });
    return { filas: r, mejor: mejor.id };
  }
  function vSimulador(c) {
    var d = (c && c.datos) || {};
    var kmAnual = d.km && d.dias ? Math.round(Number(d.km) * 365 / Math.max(Number(d.dias), 30) / 50) * 50 : 3000;
    var def = { kmT: Math.max(kmAnual, 100), kmP: 8000, taxiKm: d.eur_km ? Math.round(Number(d.eur_km) * 110) / 100 : 1.5, factura: true,
      precio: 20000, entrada: 20, tin: 7.5, anios: 6, reventa: 35, renting: 360, leasing: 330, gasolina: 0.09, seguro: 500, mant: 400, exclusivo: false, tramo: 24 };
    var campo = function (id, k, paso) { return '<label>' + esc(T(k)) + '<input type="number" inputmode="decimal" step="' + (paso || 1) + '" min="0" id="sv_' + id + '" value="' + def[id] + '"></label>'; };
    var h = '<div id="sv_res"></div><h3 style="margin:18px 0 8px;font-size:15px">' + esc(T('cj_sv_datos')) + '</h3><div class="bc-sim">' +
      campo('kmT', 'cj_sv_km', 50) + campo('kmP', 'cj_sv_kmper', 500) +
      '<fieldset><legend>' + esc(T('cj_sv_o_taxi')) + '</legend>' + campo('taxiKm', 'cj_sv_taxi_km', 0.05) +
        '<label class="chk" style="grid-column:auto"><input type="checkbox" id="sv_factura" checked><span>' + esc(T('cj_sv_factura')) + '</span></label></fieldset>' +
      '<fieldset><legend>' + esc(T('cj_sv_coche')) + '</legend>' + campo('precio', 'cj_sv_precio', 500) + campo('entrada', 'cj_sv_entrada', 5) + campo('tin', 'cj_sv_tin', 0.1) + campo('anios', 'cj_sv_anios', 1) +
        campo('reventa', 'cj_sv_reventa', 5) + campo('gasolina', 'cj_sv_gasolina', 0.01) + campo('seguro', 'cj_sv_seguro', 50) + campo('mant', 'cj_sv_mant', 50) + '</fieldset>' +
      '<fieldset><legend>' + esc(T('cj_sv_o_renting')) + ' · ' + esc(T('cj_sv_o_leasing')) + '</legend>' + campo('renting', 'cj_sv_renting', 10) + campo('leasing', 'cj_sv_leasing', 10) + '</fieldset>' +
      '<label>' + esc(T('cj_sv_tramo')) + '<select id="sv_tramo">' + [19, 24, 30, 37, 45].map(function (x) { return '<option value="' + x + '"' + (x === def.tramo ? ' selected' : '') + '>' + x + ' %</option>'; }).join('') + '</select></label>' +
      '<label class="chk"><input type="checkbox" id="sv_exclusivo"><span>' + esc(T('cj_sv_exclusivo')) + '<small>' + esc(T('cj_sv_exclusivo_n')) + '</small></span></label>' +
      '</div>';
    return h;
  }
  function pintarSim(raiz) {
    var g = function (id) { var e = raiz.querySelector('#sv_' + id); return e.type === 'checkbox' ? e.checked : Number(String(e.value).replace(',', '.')) || 0; };
    var v = {}; ['kmT', 'kmP', 'taxiKm', 'factura', 'precio', 'entrada', 'tin', 'anios', 'reventa', 'renting', 'leasing', 'gasolina', 'seguro', 'mant', 'exclusivo', 'tramo'].forEach(function (k) { v[k] = g(k); });
    var s = simular(v), nom = { taxi: T('cj_sv_o_taxi'), compra: T('cj_sv_o_compra'), renting: T('cj_sv_o_renting'), leasing: T('cj_sv_o_leasing') };
    var h = '<div class="bc-scroll"><table class="bc-res"><thead><tr><th>' + esc(T('cj_sv_opcion')) + '</th><th class="n">' + esc(T('cj_sv_coste')) + '</th><th class="n">' + esc(T('cj_sv_ahorro')) + '</th><th class="n">' + esc(T('cj_sv_neto')) + '</th><th class="n">' + esc(T('cj_sv_porkm')) + '</th></tr></thead><tbody>' +
      s.filas.map(function (f) { return '<tr' + (f.id === s.mejor ? ' class="mejor"' : '') + '><td>' + esc(nom[f.id]) + '</td><td class="n">' + esc(eur(f.coste, 0)) + '</td><td class="n">' + esc(eur(f.iva + f.irpf, 0)) + '</td><td class="n">' + esc(eur(f.neto, 0)) + '</td><td class="n">' + (f.km == null ? '—' : esc(eur(f.km))) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<p class="bc-res-txt">' + con(esc(T('cj_sv_mejor')), { o: '<b>' + esc(nom[s.mejor]) + '</b>' }) + '</p>' +
      (v.exclusivo ? '' : '<p class="bc-nota">' + esc(T('cj_sv_personal')) + '</p>') +
      '<p class="bc-nota">' + esc(T('cj_sv_aviso')) + '</p>';
    raiz.querySelector('#sv_res').innerHTML = h;
  }

  /* ── Modal ── */
  function modal(titulo, sub, cuerpo, alAbrir) {
    var velo = document.createElement('div'); velo.className = 'bc-velo'; velo.setAttribute('role', 'dialog'); velo.setAttribute('aria-modal', 'true');
    velo.innerHTML = '<div class="bc-mod"><button type="button" class="cerrar">' + esc(T('cj_cerrar')) + '</button><h2>' + esc(titulo) + '</h2>' +
      (sub ? '<p class="sub">' + esc(sub) + '</p>' : '') + cuerpo + '</div>';
    var cerrar = function () { velo.remove(); document.removeEventListener('keydown', tecla); };
    var tecla = function (e) { if (e.key === 'Escape') cerrar(); };
    velo.addEventListener('click', function (e) { if (e.target === velo) cerrar(); });
    velo.querySelector('.cerrar').onclick = cerrar; document.addEventListener('keydown', tecla);
    document.body.appendChild(velo); velo.querySelector('.cerrar').focus();
    if (alAbrir) alAbrir(velo.querySelector('.bc-mod'));
  }
  function abrir(c, tx) {
    var vis = c.visual, k = c.codigo, d = c.datos || {};
    if (k === 'casa_afecta') return modal(tx.t, tx.x, vPasos(['cj_casa_p1', 'cj_casa_p2', 'cj_casa_p3']) + '<p class="bc-nota">' + esc(T('cj_casa_nota')) + '</p>');
    if (k === 'facturas_tarde') return modal(tx.t, tx.x, vPasos(['cj_tarde_p1', 'cj_tarde_p2', 'cj_tarde_p3']));
    if (k === 'financiacion') return modal(tx.t, tx.x, vPasos(['cj_fin_p1', 'cj_fin_p2', 'cj_fin_p3']) +
      '<p><a class="bc-b" target="_blank" rel="noopener" href="informe.html?anio=' + encodeURIComponent(d.anio || '') + '">' + esc(T('cj_fin_b')) + '</a></p>');
    if (k === 'sin_justificante') return modal(tx.t, tx.x, vPasos(['cj_js_1', 'cj_js_2', 'cj_js_3']));
    if (vis === 'factura_legal') return modal(T('cj_fl_titulo'), k ? tx.x : '', vFactura(c));
    if (vis === 'plazos' || vis === 'sin_actividad') return modal(tx.t, tx.x, vPlazos(c));
    if (vis === 'comidas') return modal(tx.t, tx.x, vComidas(c));
    if (vis === 'gastos_mixtos') return modal(tx.t, tx.x, vMixtos(c));
    if (vis === 'justificantes') return modal(tx.t, tx.x, vPasos(['cj_js_1', 'cj_js_2', 'cj_js_3']));
    if (vis === 'cuenta_trabajo') return modal(tx.t, tx.x, vPasos(['cj_ct_1', 'cj_ct_2', 'cj_ct_3']));
    if (vis === 'simulador_vehiculo') return modal(T('cj_sv_titulo'), T('cj_sv_sub'), vSimulador(c), function (m) {
      pintarSim(m); m.querySelectorAll('input,select').forEach(function (e) { e.addEventListener('input', function () { pintarSim(m); }); e.addEventListener('change', function () { pintarSim(m); }); });
    });
    return modal(tx.t, tx.x, '');
  }

  /* ── Banner ── */
  function montar(raiz, sb, opciones) {
    if (!raiz || !sb) return Promise.resolve();
    estilos();
    var abierto = false, lista = [];
    function marcar(c, estado, tarjeta) {
      if (tarjeta) { tarjeta.style.transition = 'opacity .25s'; tarjeta.style.opacity = '0'; }
      lista = lista.filter(function (x) { return x !== c; });
      setTimeout(pintar, 260);
      return sb.rpc('consejo_gestor_marcar', { p_clave: c.clave, p_estado: estado }).then(function () {}, function () {});
    }
    function pintar() {
      if (!lista.length) { raiz.innerHTML = ''; return; }
      var movil = window.matchMedia && window.matchMedia('(max-width:600px)').matches;
      var ver = (abierto || movil) ? lista : lista.slice(0, 3);
      raiz.innerHTML = '<section class="bc" aria-label="' + esc(T('cj_titulo')) + '"><div class="bc-cab"><div><h2>' + esc(T('cj_titulo')) + '</h2><p>' + esc(T('cj_sub')) + '</p></div></div>' +
        '<div class="bc-lista' + (movil ? ' carrusel' : '') + '">' + ver.map(function (c, i) {
          var tx = c.origen === 'auto' ? textoAuto(c) : { t: c.titulo, x: c.texto, b: c.boton };
          var ti = c.origen !== 'general';
          var chip = c.patrocinado ? '<span class="bc-chip pat">' + esc(T('cj_patrocinado')) + '</span>' : '<span class="bc-chip">' + esc(ti ? T('cj_para_ti') : T('cj_general')) + '</span>';
          var tieneModal = c.visual || (c.origen === 'auto');
          var principal = tieneModal ? '<button type="button" class="bc-b" data-a="abrir" data-i="' + i + '">' + esc(tx.b || T('cj_ver_mas')) + '</button>'
            : (c.enlace ? '<a class="bc-b" target="_blank" rel="noopener' + (c.patrocinado ? ' sponsored' : '') + '" href="' + esc(c.enlace) + '">' + esc(tx.b || T('cj_abrir')) + '</a>' : '');
          return '<article class="bc-c' + (ti ? ' ti' : '') + '" data-i="' + i + '">' + chip +
            '<button type="button" class="bc-x" data-a="quitar" data-i="' + i + '" aria-label="' + esc(T('cj_quitar')) + '" title="' + esc(T('cj_quitar')) + '">×</button>' +
            '<h3>' + esc(tx.t) + '</h3><p>' + esc(tx.x) + '</p><div class="bc-acc">' + principal +
            '<button type="button" class="bc-b l" data-a="hecho" data-i="' + i + '">✓ ' + esc(T('cj_hecho')) + '</button>' +
            '<button type="button" class="bc-b t" data-a="luego" data-i="' + i + '">' + esc(T('cj_luego')) + '</button></div></article>';
        }).join('') + '</div>' +
        (movil && lista.length > 1 ? '<div class="bc-puntos">' + esc(con(T('cj_desliza'), { n: lista.length })) + '</div>' : '') +
        (!movil && lista.length > 3 ? '<div class="bc-mas"><button type="button" class="bc-b l" data-a="mas">' + esc(abierto ? T('cj_ver_menos') : con(T('cj_ver_todos'), { n: lista.length })) + '</button></div>' : '') + '</section>';
      raiz.querySelectorAll('[data-a]').forEach(function (b) {
        b.onclick = function () {
          var a = b.dataset.a, c = ver[Number(b.dataset.i)], tarjeta = b.closest('.bc-c');
          if (a === 'mas') { abierto = !abierto; pintar(); return; }
          if (!c) return;
          if (a === 'abrir') { var tx = c.origen === 'auto' ? textoAuto(c) : { t: c.titulo, x: c.texto, b: c.boton }; abrir(c, tx); return; }
          if (a === 'hecho') marcar(c, 'hecho', tarjeta);
          if (a === 'luego') marcar(c, 'luego', tarjeta);
          if (a === 'quitar') marcar(c, 'descartado', tarjeta);
        };
      });
    }
    function cargar() {
      return sb.rpc('mis_consejos_gestor', { p_lang: lang() }).then(function (r) {
        var d = r && r.data;
        if (!d || !d.ok || !Array.isArray(d.consejos)) { raiz.innerHTML = ''; return; }
        // Si hay uno personal con el mismo dibujo, el general sobra
        var auto = {}; d.consejos.forEach(function (c) { if (c.origen === 'auto' && c.visual) auto[c.visual] = 1; });
        if (auto.plazos) auto.sin_actividad = 1;
        lista = d.consejos.filter(function (c) { return !(c.origen === 'general' && c.visual && auto[c.visual]); })
          .filter(function (c) { return c.origen !== 'auto' || textoAuto(c); });
        pintar();
      }, function () { raiz.innerHTML = ''; });
    }
    // Al cambiar de idioma: los consejos del equipo vienen traducidos del servidor
    if (!raiz.__bcIdioma) { raiz.__bcIdioma = true; document.addEventListener('bbl:lang', function () { if (raiz.isConnected) cargar(); }); }
    return cargar();
  }

  window.BBLConsejos = { montar: montar, simular: simular, _textoAuto: textoAuto };
})();
