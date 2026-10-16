/* ═══════════════════════════════════════════════════════════════════════
   formula.js · Babyloon · la fórmula de color por zonas
   (pasaporte de belleza v2)

   Una fórmula ya no es un texto suelto: es una lista de ZONAS —raíz,
   medios, puntas, balayage, matiz…— y cada zona dice con qué se hizo:
     marca y línea · varios tonos con sus gramos · oxidante (vol y gramos,
     o la proporción) · aditivo · cómo se aplicó · tiempo · si hubo calor.
   Así la próxima vez —ella o cualquier profesional a la que la clienta dé
   permiso— repite el color exacto.

   La misma forma la guarda la ficha (cabello.formulas) y cada visita del
   cuaderno (pro_client_history.formula_json); el servidor la limpia en
   _formula_limpia. Las listas (zonas, aplicación, vol, proporción) y sus
   rótulos vienen del esquema (esquema_ficha_tecnica → formula).

   API (window.BBLFormula):
     html(lista, F)        el editor (F = esquema.formula)
     montar(caja, sb)      engancha botones y el buscador de marcas
     leer(caja)            la lista limpia, lista para guardar
     poner(caja, lista, F) sustituye lo que hay (repetir la última)
     texto(lista, F)       una línea por zona, para leer
     lectura(lista, F)     HTML de lectura (pasaporte, cuaderno)
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var T = function (k, alt) { try { var s = window.BBL && BBL.t && BBL.t(k); return (s && s !== k) ? s : alt; } catch (_) { return alt; } };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var PCT = { '5': '1,5', '10': '3', '20': '6', '30': '9', '40': '12' };
  var num = function (v) { var n = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isFinite(n) ? n : null; };
  var fmt = function (n) { return (Math.round(n * 10) / 10).toLocaleString((window.BBL && BBL.lang) || 'es'); };

  var ESTILO = '.bfx-z{border:1px solid var(--line,rgba(200,169,106,.16));border-radius:6px;padding:12px 12px 4px;margin:0 0 10px;background:rgba(0,0,0,.18)}' +
    '.bfx-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px 10px;margin-bottom:8px}' +
    '.bfx-g label{display:block;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--mauve,#8C7482);margin:0 0 4px}' +
    '.bfx-g input,.bfx-g select{width:100%;box-sizing:border-box}' +
    '.bfx-c2{grid-column:span 2}.bfx-c4{grid-column:1/-1}' +
    '.bfx-t{display:flex;gap:6px;align-items:center;margin:0 0 6px}.bfx-t .bfx-tono{flex:2}.bfx-t .bfx-gr{flex:1;max-width:90px}' +
    '.bfx-x{background:none;border:0;color:var(--mauve,#8C7482);cursor:pointer;font-size:16px;line-height:1;padding:4px 6px}' +
    '.bfx-x:hover{color:#E07A7A}' +
    '.bfx-cab{display:flex;gap:8px;align-items:center;margin-bottom:8px}.bfx-cab select{flex:1}.bfx-cab input{flex:2}' +
    '.bfx-mez{font-size:11px;color:var(--gold,#C8A96A);margin:2px 0 8px}' +
    '.bfx-acc{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 0}' +
    '.bfx-g label.bfx-chk{display:flex;align-items:center;gap:8px;font-size:12px;letter-spacing:0;text-transform:none;color:var(--smoke,#E8E0D5);margin:24px 0 0;cursor:pointer}' +
    '.bfx-g .bfx-chk input[type=checkbox]{width:16px!important;height:16px;padding:0!important;margin:0;flex:none;accent-color:var(--gold,#C8A96A)}' +
    '.bfx-lz{margin:4px 0 8px;padding:8px 10px;border-left:2px solid var(--gold,#C8A96A);background:rgba(200,169,106,.06);font-size:12.5px;line-height:1.5}' +
    '.bfx-lz b{color:var(--gold,#C8A96A);font-weight:500}' +
    '@media (max-width:640px){.bfx-g{grid-template-columns:1fr 1fr}.bfx-c2{grid-column:1/-1}}';
  function estilo() { if (document.getElementById('bfxEstilo')) return; var s = document.createElement('style'); s.id = 'bfxEstilo'; s.textContent = ESTILO; document.head.appendChild(s); }

  function opciones(lista, val, vacia) {
    return (vacia ? '<option value="">—</option>' : '') + (lista || []).map(function (o) {
      var v = typeof o === 'string' ? o : o.v, t = typeof o === 'string' ? o : o.txt;
      return '<option value="' + esc(v) + '"' + (String(val) === String(v) ? ' selected' : '') + '>' + esc(t) + '</option>';
    }).join('');
  }
  function volTxt(v) { return v + ' vol' + (PCT[v] ? ' (' + PCT[v] + ' %)' : ''); }

  function filaTono(t) {
    t = t || {};
    return '<div class="bfx-t"><input class="bfx-tono" maxlength="30" placeholder="' + esc(T('fx_tono', 'Tono')) + '" value="' + esc(t.tono || '') + '">' +
      '<input class="bfx-gr" type="number" min="0" max="1000" step="0.5" inputmode="decimal" placeholder="' + esc(T('fx_g', 'g')) + '" value="' + esc(t.g != null ? t.g : '') + '">' +
      '<button type="button" class="bfx-x" data-fx="tono-x" aria-label="' + esc(T('fx_quitar', 'Quitar')) + '">×</button></div>';
  }

  function zona(z, F) {
    z = z || {}; F = F || {};
    var tonos = (z.tonos && z.tonos.length) ? z.tonos : [{}];
    var marca = window.BBLPasaporte && BBLPasaporte.sel
      ? BBLPasaporte.sel('marca_producto', z.marca || '', { multi: false, ph: T('fx_marca', 'Marca') }).replace('class="pp-sel"', 'class="pp-sel bfx-marca"')
      : '<input class="bfx-marca-txt" maxlength="80" value="' + esc(z.marca || '') + '">';
    return '<div class="bfx-z">' +
      '<div class="bfx-cab"><select class="bfx-zona" aria-label="' + esc(T('fx_zona', 'Zona')) + '">' + opciones(F.zonas, z.zona, true) + '</select>' +
      '<input class="bfx-nombre" maxlength="60" placeholder="' + esc(T('fx_nombre_ph', 'Nombre')) + '" value="' + esc(z.nombre || '') + '">' +
      '<button type="button" class="bfx-x" data-fx="zona-x" aria-label="' + esc(T('fx_quitar', 'Quitar')) + '">×</button></div>' +
      '<div class="bfx-g">' +
        '<div class="bfx-c2"><label>' + esc(T('fx_marca', 'Marca')) + '</label>' + marca + '</div>' +
        '<div class="bfx-c2"><label>' + esc(T('fx_linea', 'Línea')) + '</label><input class="bfx-linea" maxlength="60" value="' + esc(z.linea || '') + '"></div>' +
        '<div class="bfx-c4"><label>' + esc(T('fx_tono', 'Tono')) + ' · ' + esc(T('fx_g', 'g')) + '</label><div class="bfx-tonos">' + tonos.map(filaTono).join('') + '</div>' +
          '<button type="button" class="btn btn-line mini" data-fx="tono">' + esc(T('fx_mas_tono', '+ Tono')) + '</button></div>' +
        '<div><label>' + esc(T('fx_oxidante', 'Oxidante')) + '</label><select class="bfx-vol">' + opciones((F.vol || []).map(function (v) { return { v: v, txt: '\u2066' + volTxt(v) + '\u2069' }; }), z.vol, true) + '</select></div>' +
        '<div><label>' + esc(T('fx_ox_g', 'Oxidante (g)')) + '</label><input class="bfx-oxg" type="number" min="0" max="2000" step="1" inputmode="decimal" value="' + esc(z.ox_g != null ? z.ox_g : '') + '"></div>' +
        '<div><label>' + esc(T('fx_proporcion', 'Proporción')) + '</label><select class="bfx-prop">' + opciones((F.proporcion || []).map(function (v) { return { v: v, txt: v.replace('.', ',') }; }), z.proporcion, true) + '</select></div>' +
        '<div><label>' + esc(T('fx_tiempo', 'Pose (min)')) + '</label><input class="bfx-tiempo" type="number" min="0" max="300" step="5" value="' + esc(z.tiempo != null ? z.tiempo : '') + '"></div>' +
        '<div class="bfx-c2"><label>' + esc(T('fx_aditivo', 'Aditivo')) + '</label><input class="bfx-aditivo" maxlength="120" value="' + esc(z.aditivo || '') + '"></div>' +
        '<div><label>' + esc(T('fx_aplicacion', 'Aplicación')) + '</label><select class="bfx-apl">' + opciones(F.aplicacion, z.aplicacion, true) + '</select></div>' +
        '<div><label class="bfx-chk"><input type="checkbox" class="bfx-calor"' + (z.calor ? ' checked' : '') + '> ' + esc(T('fx_calor', 'Con calor')) + '</label></div>' +
        '<div class="bfx-c4"><label>' + esc(T('fx_notas', 'Notas')) + '</label><input class="bfx-notas" maxlength="300" value="' + esc(z.notas || '') + '"></div>' +
      '</div><div class="bfx-mez"></div></div>';
  }

  function html(lista, F) {
    estilo();
    var zs = (lista && lista.length) ? lista : [{}];
    return '<div class="bfx" data-bfx>' + '<div class="bfx-zonas">' + zs.map(function (z) { return zona(z, F); }).join('') + '</div>' +
      '<div class="bfx-acc"><button type="button" class="btn btn-line mini" data-fx="zona">' + esc(T('fx_mas_zona', '+ Añadir zona')) + '</button></div></div>';
  }

  function leerZona(el) {
    var q = function (s) { return el.querySelector(s); };
    var marcaEl = q('.bfx-marca');
    var marca = marcaEl ? ((window.BBLPasaporte && BBLPasaporte.valor(marcaEl)) || '') : ((q('.bfx-marca-txt') || {}).value || '');
    var tonos = Array.prototype.map.call(el.querySelectorAll('.bfx-t'), function (r) {
      return { tono: r.querySelector('.bfx-tono').value.trim(), g: num(r.querySelector('.bfx-gr').value) };
    }).filter(function (t) { return t.tono; }).map(function (t) { var o = { tono: t.tono }; if (t.g != null) o.g = t.g; return o; });
    var z = {
      zona: q('.bfx-zona').value || undefined, nombre: q('.bfx-nombre').value.trim() || undefined,
      marca: marca || undefined, linea: q('.bfx-linea').value.trim() || undefined,
      tonos: tonos.length ? tonos : undefined, vol: q('.bfx-vol').value || undefined,
      ox_g: num(q('.bfx-oxg').value), proporcion: q('.bfx-prop').value || undefined,
      tiempo: num(q('.bfx-tiempo').value), aditivo: q('.bfx-aditivo').value.trim() || undefined,
      aplicacion: q('.bfx-apl').value || undefined, calor: q('.bfx-calor').checked || undefined,
      notas: q('.bfx-notas').value.trim() || undefined
    };
    Object.keys(z).forEach(function (k) { if (z[k] == null) delete z[k]; });
    return (z.tonos || z.marca || z.linea || z.notas) ? z : null;
  }
  function leer(caja) {
    if (!caja) return [];
    var raiz = caja.matches && caja.matches('[data-bfx]') ? caja : caja.querySelector('[data-bfx]');
    if (!raiz) return [];
    return Array.prototype.map.call(raiz.querySelectorAll('.bfx-z'), leerZona).filter(Boolean);
  }

  // Lo que pesa la mezcla: si hay gramos de oxidante, ésos; si no, los de la proporción
  function mezcla(el) {
    var c = 0;
    el.querySelectorAll('.bfx-gr').forEach(function (i) { var n = num(i.value); if (n) c += n; });
    var ox = num(el.querySelector('.bfx-oxg').value);
    var p = el.querySelector('.bfx-prop').value;
    if (ox == null && p && c) { var r = num(p.split(':')[1]); if (r) ox = c * r; }
    var out = el.querySelector('.bfx-mez');
    out.textContent = c ? T('fx_mezcla', 'Mezcla: {c} g de color + {o} g de oxidante').replace('{c}', fmt(c)).replace('{o}', ox != null ? fmt(ox) : '—') : '';
  }

  function montar(caja, sb) {
    estilo();
    var raiz = caja && (caja.matches && caja.matches('[data-bfx]') ? caja : caja.querySelector('[data-bfx]'));
    if (!raiz || raiz.dataset.montado) { if (raiz && window.BBLPasaporte) BBLPasaporte.montar(raiz, sb); return; }
    raiz.dataset.montado = '1';
    var F = raiz._F || {};
    raiz.addEventListener('click', function (e) {
      var b = e.target.closest('[data-fx]'); if (!b) return;
      var z = b.closest('.bfx-z');
      if (b.dataset.fx === 'tono') { z.querySelector('.bfx-tonos').insertAdjacentHTML('beforeend', filaTono({})); }
      else if (b.dataset.fx === 'tono-x') { var r = b.closest('.bfx-t'); if (z.querySelectorAll('.bfx-t').length > 1) r.remove(); else { r.querySelector('.bfx-tono').value = ''; r.querySelector('.bfx-gr').value = ''; } mezcla(z); }
      else if (b.dataset.fx === 'zona') { raiz.querySelector('.bfx-zonas').insertAdjacentHTML('beforeend', zona({}, raiz._F)); if (window.BBLPasaporte) BBLPasaporte.montar(raiz, sb); }
      else if (b.dataset.fx === 'zona-x') { if (raiz.querySelectorAll('.bfx-z').length > 1) z.remove(); else { var n = document.createElement('div'); n.innerHTML = zona({}, raiz._F); z.replaceWith(n.firstChild); if (window.BBLPasaporte) BBLPasaporte.montar(raiz, sb); } }
    });
    raiz.addEventListener('input', function (e) { var z = e.target.closest('.bfx-z'); if (z) mezcla(z); });
    raiz.addEventListener('change', function (e) { var z = e.target.closest('.bfx-z'); if (z) mezcla(z); });
    raiz.querySelectorAll('.bfx-z').forEach(mezcla);
    if (window.BBLPasaporte) BBLPasaporte.montar(raiz, sb);
  }
  // html() no guarda F en el DOM: quien monta se lo pasa así
  function preparar(caja, F) {
    var raiz = caja && (caja.matches && caja.matches('[data-bfx]') ? caja : caja.querySelector('[data-bfx]'));
    if (raiz) raiz._F = F || {};
  }
  function poner(caja, lista, F, sb) {
    var raiz = caja.matches && caja.matches('[data-bfx]') ? caja : caja.querySelector('[data-bfx]');
    if (!raiz) return;
    raiz.querySelector('.bfx-zonas').innerHTML = ((lista && lista.length) ? lista : [{}]).map(function (z) { return zona(z, F); }).join('');
    raiz.querySelectorAll('.bfx-z').forEach(mezcla);
    if (window.BBLPasaporte) BBLPasaporte.montar(raiz, sb);
  }

  function rot(lista, v) { for (var i = 0; i < (lista || []).length; i++) if (lista[i].v === v) return lista[i].txt; return v; }
  function marcaTxt(m) { return m ? ((window.BBLPasaporte && BBLPasaporte.nombre) ? BBLPasaporte.nombre('marca_producto', m) : m) : ''; }
  function partesZona(z, F, iso) {
    // iso: en pantalla, «20 vol (6 %)» no se desordena dentro de un texto en árabe
    var I = function (t) { return iso ? '\u2066' + t + '\u2069' : t; };
    F = F || {};
    var p = [];
    var prod = [marcaTxt(z.marca), z.linea].filter(Boolean).join(' ');
    var tonos = (z.tonos || []).map(function (t) { return t.tono + (t.g != null ? ' ' + fmt(t.g) + ' ' + T('fx_g', 'g') : ''); }).join(' + ');
    if (prod || tonos) p.push([prod, tonos].filter(Boolean).join(': '));
    var ox = [];
    if (z.vol) ox.push(I(volTxt(z.vol)));
    if (z.ox_g != null) ox.push(fmt(z.ox_g) + ' ' + T('fx_g', 'g'));
    if (z.proporcion) ox.push(I(z.proporcion.replace('.', ',')));
    if (ox.length) p.push(T('fx_oxidante', 'Oxidante') + ' ' + ox.join(' · '));
    if (z.aditivo) p.push(z.aditivo);
    if (z.aplicacion) p.push(rot(F.aplicacion, z.aplicacion));
    if (z.tiempo != null) p.push(z.tiempo + ' ' + T('fx_u_min', 'min') + (z.calor ? ' · ' + T('fx_calor', 'Con calor').toLowerCase() : ''));
    else if (z.calor) p.push(T('fx_calor', 'Con calor'));
    if (z.notas) p.push(z.notas);
    return p;
  }
  // «Raíz · Raíz» no: si el nombre repite la zona, se dice una vez
  function titulo(z, F) {
    var zt = z.zona ? rot((F || {}).zonas, z.zona) : '', n = z.nombre || '';
    var igual = function (a, b) { return String(a).trim().toLowerCase() === String(b).trim().toLowerCase(); };
    return [zt, (n && !igual(n, zt)) ? n : ''].filter(Boolean).join(' · ');
  }
  function texto(lista, F) {
    return (lista || []).map(function (z) { var t = titulo(z, F); return (t ? t + ' — ' : '') + partesZona(z, F).join(' · '); }).join('\n');
  }
  function lectura(lista, F) {
    estilo();
    return (lista || []).map(function (z) {
      var t = titulo(z, F);
      return '<div class="bfx-lz">' + (t ? '<b>' + esc(t) + '</b><br>' : '') + esc(partesZona(z, F, true).join(' · ')) + '</div>';
    }).join('');
  }

  window.BBLFormula = { html: html, montar: montar, preparar: preparar, leer: leer, poner: poner, texto: texto, lectura: lectura };
})();
