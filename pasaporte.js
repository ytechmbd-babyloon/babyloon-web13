/* ═══════════════════════════════════════════════════════════════════════
   pasaporte.js · Babyloon · el pasaporte de belleza de la clienta
   «Tu estilista viaja contigo»: alergias, lo que ella declara, el historial
   de todas sus profesionales (fórmulas de color, oxidante, productos…) y
   sus fichas técnicas. Lo dibujan el panel de la clienta y el del
   profesional (agenda, clientela y pujas) con el mismo componente.

   BBLPasaporte.html(pasaporte, {esquema, modo})   → HTML del pasaporte
   BBLPasaporte.imprimir(pasaporte, {esquema, titulo, nombre})
   BBLPasaporte.esquema(sb)                         → esquema de la ficha técnica (y carga el catálogo)
   BBLPasaporte.catalogo(sb)                        → catálogo único de belleza (catalogo_belleza)
   BBLPasaporte.sel(dominio, valor, {id, proponer}) → HTML de un selector del catálogo
   BBLPasaporte.montar(raiz, sb)                    → activa los selectores de esa zona
   BBLPasaporte.valor(elemento|id)                  → los códigos elegidos ("ppd,latex")
   Todo lo que se elige sale del catálogo: nadie escribe una alergia o una marca a su manera.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var T = function (k, alt) { try { var v = window.BBL && BBL.t(k); return (v && v !== k) ? v : alt; } catch (_) { return alt; } };
  var esc = function (s) { return (s == null ? '' : String(s)).replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; }); };
  var lang = function () { return (window.BBL && BBL.lang) || 'es'; };
  var dia = function (f) { if (!f) return ''; try { return new Date(String(f).slice(0, 10) + 'T12:00:00').toLocaleDateString(lang(), { day: 'numeric', month: 'short', year: 'numeric' }); } catch (_) { return String(f).slice(0, 10); } };

  var ESTILO = '\
  .pp{font-size:14px}\
  .pp h3.pp-t{font-family:var(--serif,Georgia,serif);font-weight:500;font-size:19px;margin:22px 0 10px}\
  .pp-alertas{border:1px solid rgba(214,92,92,.45);background:rgba(214,92,92,.08);border-radius:10px;padding:14px 16px;margin:6px 0 4px}\
  .pp-alertas b{color:#F0A0A0;font-weight:500;letter-spacing:.06em;text-transform:uppercase;font-size:11px}\
  .pp-alertas ul{margin:8px 0 0 18px;padding:0}.pp-alertas li{margin:4px 0}\
  .pp-fuente{color:var(--mauve,#9A8A95);font-size:12px}\
  .pp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px}\
  .pp-dato{border:1px solid var(--line,rgba(200,169,106,.2));border-radius:8px;padding:10px 12px}\
  .pp-dato small{display:block;color:var(--mauve,#9A8A95);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px}\
  .pp-ap{border-left:2px solid var(--gold,#C8A96A);padding:4px 0 4px 14px;margin:0 0 16px}\
  .pp-ap .pp-cab{font-size:12.5px;color:var(--mauve,#9A8A95);margin-bottom:4px}\
  .pp-ap .pp-cab b{color:var(--cream,#F2EAE0);font-weight:500;font-size:14px}\
  .pp-formula{background:rgba(200,169,106,.1);border:1px solid rgba(200,169,106,.35);border-radius:6px;padding:8px 10px;margin:6px 0;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px}\
  .pp-linea{margin:3px 0}.pp-linea span{color:var(--mauve,#9A8A95)}\
  .pp-ficha{border:1px solid var(--line,rgba(200,169,106,.2));border-radius:10px;padding:14px;margin:0 0 12px}\
  .pp-ficha h4{margin:0 0 8px;font-size:14px;font-weight:500}\
  .pp-disc{color:var(--gold,#C8A96A);font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin:10px 0 4px}\
  .pp-vacio{color:var(--mauve,#9A8A95);padding:10px 0}\
  .pp-aviso{border:1px solid var(--line,rgba(200,169,106,.2));border-radius:10px;padding:14px 16px;margin:12px 0;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;font-size:13px}\
  .pp-aviso.oro{border-color:rgba(200,169,106,.5);background:rgba(200,169,106,.07)}\
  .pp-consent{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--line,rgba(200,169,106,.2));border-radius:10px;padding:14px 16px;margin:14px 0;cursor:pointer;font-size:13px;line-height:1.5}\
  .pp-consent input{accent-color:var(--gold,#C8A96A);width:18px;height:18px;margin-top:2px;flex:none}\
  .pp-consent small{display:block;color:var(--mauve,#9A8A95);font-size:12px;margin-top:4px}\
  .pp-form{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px 14px}\
  .pp-form label{display:block;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--mauve,#9A8A95);margin-bottom:5px}\
  .pp-form input[type=text],.pp-form select{width:100%;box-sizing:border-box;background:rgba(0,0,0,.28);border:1px solid var(--line,rgba(200,169,106,.2));border-radius:6px;padding:10px 12px;color:var(--cream,#F2EAE0);font:inherit;font-size:13.5px}\
  .pp-form input:focus,.pp-form select:focus{outline:none;border-color:var(--gold,#C8A96A)}\
  .pp-grupo{grid-column:1/-1;color:var(--gold,#C8A96A);font-size:11px;letter-spacing:.12em;text-transform:uppercase;margin-top:10px}\
  .pp-chk{display:flex!important;align-items:center;gap:8px;text-transform:none!important;letter-spacing:0!important;font-size:13px!important;color:var(--cream,#F2EAE0)!important;margin-top:24px}\
  .pp-pro{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 0;border-bottom:1px solid var(--line,rgba(200,169,106,.15));font-size:13.5px}\
  .pp-sel{position:relative}\
  .pp-pills{display:flex;flex-wrap:wrap;gap:6px}\
  .pp-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border:1px solid var(--line,rgba(200,169,106,.25));border-radius:999px;background:rgba(255,255,255,.02);color:var(--cream,#F2EAE0);font:inherit;font-size:12.5px;line-height:1.2;cursor:pointer;transition:border-color .15s,background .15s}\
  .pp-pill:hover{border-color:rgba(200,169,106,.6)}\
  .pp-pill.on{border-color:var(--gold,#C8A96A);background:rgba(200,169,106,.16)}\
  .pp-pill.mas{border-style:dashed;color:var(--gold,#C8A96A)}\
  .pp-pill i{font-style:normal;opacity:.7}\
  .pp-pill .pend{font-size:10px;color:var(--mauve,#9A8A95)}\
  .pp-combo{display:flex;flex-wrap:wrap;gap:6px;align-items:center;min-height:44px;box-sizing:border-box;background:rgba(0,0,0,.28);border:1px solid var(--line,rgba(200,169,106,.2));border-radius:6px;padding:6px 8px;cursor:text}\
  .pp-combo:focus-within{border-color:var(--gold,#C8A96A)}\
  .pp-combo input{flex:1;min-width:120px;background:transparent;border:0;outline:0;color:var(--cream,#F2EAE0);font:inherit;font-size:13.5px;padding:4px}\
  .pp-combo .pp-pill{padding:4px 10px;cursor:default}\
  .pp-combo .pp-pill b{cursor:pointer;font-weight:400;opacity:.75}\
  .pp-lista{position:absolute;z-index:60;left:0;right:0;top:calc(100% + 4px);max-height:280px;overflow:auto;background:#1A1219;border:1px solid rgba(200,169,106,.4);border-radius:8px;box-shadow:0 12px 30px rgba(0,0,0,.45);padding:4px 0}\
  .pp-lista .g{padding:8px 12px 4px;color:var(--gold,#C8A96A);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase}\
  .pp-lista button{display:flex;justify-content:space-between;width:100%;text-align:left;background:none;border:0;color:var(--cream,#F2EAE0);font:inherit;font-size:13px;padding:8px 14px;cursor:pointer}\
  .pp-lista button:hover,.pp-lista button.act{background:rgba(200,169,106,.12)}\
  .pp-lista button.on::after{content:"✓";color:var(--gold,#C8A96A)}\
  .pp-lista .otra{color:var(--gold,#C8A96A);border-top:1px solid var(--line,rgba(200,169,106,.15));margin-top:4px}\
  .pp-lista .vacia{padding:10px 14px;color:var(--mauve,#9A8A95);font-size:12.5px}\
  .pp-prop{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}\
  .pp-sel [hidden]{display:none!important}\
  .pp-prop input{flex:1;min-width:160px;box-sizing:border-box;background:rgba(0,0,0,.28);border:1px solid var(--gold,#C8A96A);border-radius:6px;padding:9px 12px;color:var(--cream,#F2EAE0);font:inherit;font-size:13px}\
  .pp-prop button{border:1px solid var(--gold,#C8A96A);background:transparent;color:var(--gold,#C8A96A);border-radius:999px;padding:8px 14px;font:inherit;font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}\
  .pp-prop small{flex-basis:100%;color:var(--mauve,#9A8A95);font-size:11.5px}\
  .pp-proxima{display:inline-block;margin-top:6px;padding:4px 10px;border-radius:999px;background:rgba(200,169,106,.12);color:var(--gold,#C8A96A);font-size:12px}\
  .pp-priv{font-size:10px;letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--line,#555);border-radius:20px;padding:1px 8px;margin-left:6px;color:var(--mauve,#9A8A95)}';
  function estilo() { if (document.getElementById('ppEstilo')) return; var s = document.createElement('style'); s.id = 'ppEstilo'; s.textContent = ESTILO; document.head.appendChild(s); }

  // Lo que declara la clienta, en este orden (las alergias van arriba, en las alertas)
  var DECL = [['color_cabello', 'Color de pelo'], ['textura', 'Textura del cabello'], ['porosidad', 'Porosidad'], ['historial_cabello', 'Historial del cabello'],
    ['corte', 'Corte'], ['peinado', 'Peinado'], ['cabello_notas', 'Notas del cabello'], ['cuero_sensible', 'Cuero cabelludo sensible'],
    ['tipo_piel', 'Tipo de piel'], ['subtono', 'Subtono'], ['tono_base', 'Tono de base'], ['maquillaje', 'Maquillaje'], ['acabado', 'Acabado'],
    ['forma_unas', 'Forma de uñas'], ['sistema_unas', 'Sistema de uñas'], ['pestanas', 'Pestañas'], ['cejas', 'Cejas'],
    ['presion_masaje', 'Presión del masaje'], ['masaje', 'Masaje'], ['notas', 'Otras notas']];

  /* Cada campo del perfil y de la ficha técnica, con la lista del catálogo de la que sale */
  var CAMPO_DOM = { alergias: 'alergeno', contraindicaciones: 'contraindicacion', color_cabello: 'color_cabello', corte: 'corte',
    peinado: 'peinado', textura: 'textura', porosidad: 'porosidad', historial_cabello: 'historial_cabello', tipo_piel: 'tipo_piel',
    subtono: 'subtono', tono_base: 'tono_base', maquillaje: 'maquillaje', acabado: 'acabado', forma_unas: 'forma_unas',
    sistema_unas: 'sistema_unas', pestanas: 'pestanas', cejas: 'cejas', presion_masaje: 'presion_masaje', cuidados: 'cuidado',
    // ficha técnica
    marca: 'marca_producto', marca_base: 'marca_producto', marcas_favoritas: 'marca_producto', producto: 'marca_producto',
    laminado_producto: 'marca_producto', productos: 'marca_producto' };
  var CAT = {};
  function cat() { return CAT[lang()] || null; }
  function catalogo(sb) {
    var l = lang(); if (CAT[l]) return Promise.resolve(CAT[l]);
    if (!sb) return Promise.resolve(null);
    return sb.rpc('catalogo_belleza', { p_lang: l }).then(function (r) { if (r && r.data) CAT[l] = r.data; return CAT[l] || null; }, function () { return null; });
  }
  // Nombre de un código: aprobado, propuesto (pendiente) o unido a otro. Si no está en el catálogo
  // (un texto antiguo escrito a mano), se enseña tal cual.
  function nombre(dom, cod) {
    var k = String(cod).trim(); if (!k) return '';
    if (dom === 'alergeno' && k.toLowerCase() === 'none') return T('pp_ninguna', 'Ninguna');
    var D = cat() && cat()[dom]; if (!D) return k;
    if (D.fus && D.fus[k]) k = D.fus[k];
    for (var i = 0; i < D.opciones.length; i++) if (D.opciones[i].c === k) return D.opciones[i].l;
    if (D.pend && D.pend[k]) return D.pend[k];
    return k;
  }
  function partes(v) { return Array.isArray(v) ? v : String(v == null ? '' : v).split(',').map(function (x) { return x.trim(); }).filter(Boolean); }
  function legibleDom(dom, v) { return partes(v).map(function (x) { return nombre(dom, x); }).join(', '); }
  function legible(campo, v) {
    if (v == null || v === '') return '';
    var dom = CAMPO_DOM[campo];
    return dom ? legibleDom(dom, v) : valor(v);
  }

  function valor(v) {
    if (v === true || v === 'true') return T('pp_si', 'Sí');
    if (v === false || v === 'false') return T('pp_no', 'No');
    if (Array.isArray(v)) return v.join(', ');
    if (v && typeof v === 'object') return Object.keys(v).map(function (k) { return k + ': ' + v[k]; }).join(' · ');
    return String(v);
  }
  function rotulos(esquema) {
    var r = { disc: {}, campo: {} };
    ((esquema && esquema.disciplinas) || []).forEach(function (d) {
      r.disc[d.clave] = d.nombre || d.clave;
      (d.campos || []).forEach(function (c) { r.campo[d.clave + '.' + c.c] = c.rotulo || c.c; });
    });
    return r;
  }

  function html(p, o) {
    estilo(); o = o || {}; p = p || {};
    var R = rotulos(o.esquema), h = '<div class="pp">';
    var ver = function (s) { return !o.solo || o.solo.indexOf(s) >= 0; };
    var al = ver('alertas') ? (p.alertas || []) : [];
    if (al.length) {
      h += '<div class="pp-alertas"><b>' + esc(T('pp_alertas', 'Antes de empezar')) + '</b><ul>' + al.map(function (a) {
        var txt = a.tipo === 'alergia' ? T('pp_alergia', 'Alergia') + ': ' + legibleDom('alergeno', a.texto)
          : a.tipo === 'contraindicacion' ? T('pp_contra', 'Contraindicación') + ': ' + legibleDom('contraindicacion', a.texto)
          : a.tipo === 'embarazo' ? T('pp_embarazo', 'Embarazo o lactancia')
          : T('pp_parche', 'Prueba de parche') + ': ' + dia(a.texto);
        return '<li>' + esc(txt) + (a.fuente ? ' <span class="pp-fuente">· ' + esc(a.fuente) + '</span>' : '') + '</li>';
      }).join('') + '</ul></div>';
    }
    var d = ver('declarado') ? (p.declarado || {}) : {}, filas = DECL.filter(function (x) { return d[x[0]] != null && d[x[0]] !== ''; });
    if (filas.length) {
      h += '<h3 class="pp-t">' + esc(T('pp_declara', 'Lo que dice de sí misma')) + '</h3><div class="pp-grid">' + filas.map(function (x) {
        return '<div class="pp-dato"><small>' + esc(T('pp_d_' + x[0], x[1])) + '</small>' + esc(legible(x[0], d[x[0]])) + '</div>';
      }).join('') + '</div>';
    }
    var hi = p.historial || [];
    if (ver('historial') && p.proxima) h += '<p style="margin:14px 0 0"><span class="pp-proxima">' + esc(T('pp_proxima', 'Próxima cita recomendada')) + ': ' + esc(dia(p.proxima)) + '</span></p>';
    if (ver('historial')) h += '<h3 class="pp-t">' + esc(T('pp_historial', 'Historial de belleza')) + '</h3>';
    if (ver('historial')) h += hi.length ? hi.map(function (a) {
      return '<div class="pp-ap"><div class="pp-cab"><b>' + esc(a.servicio || T('pp_servicio', 'Servicio')) + '</b>' +
        (a.privada ? '<span class="pp-priv">' + esc(T('pp_privada', 'Sólo para ti')) + '</span>' : '') +
        '<br>' + esc([dia(a.fecha), a.profesional, a.ciudad].filter(Boolean).join(' · ')) + '</div>' +
        (a.formula ? '<div class="pp-formula">' + esc(a.formula) + '</div>' : '') +
        (a.productos ? '<div class="pp-linea"><span>' + esc(T('pp_productos', 'Productos')) + ':</span> ' + esc(legibleDom('marca_producto', a.productos)) + '</div>' : '') +
        (a.procedimiento ? '<div class="pp-linea"><span>' + esc(T('pp_proced', 'Procedimiento')) + ':</span> ' + esc(a.procedimiento) + '</div>' : '') +
        (a.maquillaje ? '<div class="pp-linea"><span>' + esc(T('pp_maquillaje', 'Maquillaje')) + ':</span> ' + esc(a.maquillaje) + '</div>' : '') +
        (a.resultado ? '<div class="pp-linea"><span>' + esc(T('pp_resultado', 'Resultado')) + ':</span> ' + esc(a.resultado) + '</div>' : '') +
        (a.cuidados ? '<div class="pp-linea"><span>' + esc(T('pp_cuidados', 'Cuidados en casa')) + ':</span> ' + esc(legibleDom('cuidado', a.cuidados)) + '</div>' : '') +
        (a.proxima ? '<span class="pp-proxima">' + esc(T('pp_proxima', 'Próxima cita recomendada')) + ': ' + esc(dia(a.proxima)) + '</span>' : '') + '</div>';
    }).join('') : '<p class="pp-vacio">' + esc(T('pp_sin_hist', 'Todavía no hay servicios apuntados.')) + '</p>';
    var fi = ver('fichas') ? (p.fichas || []) : [];
    if (fi.length) {
      h += '<h3 class="pp-t">' + esc(T('pp_fichas', 'Fichas técnicas')) + '</h3>' + fi.map(function (f) {
        var ficha = f.ficha || {}, cuerpo = '';
        Object.keys(ficha).forEach(function (dk) {
          var campos = ficha[dk] || {}, ks = Object.keys(campos).filter(function (k) { var v = campos[k]; return v != null && v !== '' && !(Array.isArray(v) && !v.length); });
          if (!ks.length) return;
          cuerpo += '<div class="pp-disc">' + esc(R.disc[dk] || dk) + '</div>' + ks.map(function (k) {
            var v = campos[k], txt;
            if (k === 'formula' && Array.isArray(v)) txt = v.map(function (x) { return [nombre('marca_producto', x.marca || ''), x.tono, x.partes].filter(Boolean).join(' '); }).join(' + ');
            else txt = (CAMPO_DOM[k] && (typeof v !== 'object' || Array.isArray(v))) ? legible(k, v) : valor(v);
            return '<div class="pp-linea"><span>' + esc(R.campo[dk + '.' + k] || k) + ':</span> ' + esc(txt) + '</div>';
          }).join('');
        });
        return cuerpo ? '<div class="pp-ficha"><h4>' + esc([f.profesional, f.ciudad].filter(Boolean).join(' · ')) +
          ' <span class="pp-fuente">· ' + esc(T('pp_actualizada', 'actualizada el')) + ' ' + esc(dia(f.actualizada)) + '</span></h4>' + cuerpo + '</div>' : '';
      }).join('');
    }
    return h + '</div>';
  }

  function imprimir(p, o) {
    o = o || {};
    var w = window.open('', '_blank'); if (!w) return false;
    var cuerpo = html(p, o);
    w.document.write('<!DOCTYPE html><html lang="' + esc(lang()) + '"><head><meta charset="utf-8"><title>' + esc(o.titulo || 'Babyloon') + '</title><style>' +
      ':root{--serif:Georgia,serif;--gold:#9C7A3C;--mauve:#6B5E66;--cream:#1B1219;--line:#E4DCD3}' +
      'body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1B1219;max-width:780px;margin:30px auto;padding:0 24px}' +
      'h1{font-family:Georgia,serif;font-weight:500;margin:0}.marca{color:#9C7A3C;letter-spacing:.2em;font-size:12px}' +
      '.nota{color:#6B5E66;font-size:12px;margin:6px 0 18px}@media print{body{margin:0}}' + ESTILO.replace(/F0A0A0/g, 'B23B3B') +
      '</style></head><body><div class="marca">BABYLOON</div><h1>' + esc(o.titulo || T('pp_titulo', 'Pasaporte de belleza')) + '</h1>' +
      '<div class="nota">' + esc([o.nombre, new Date().toLocaleDateString(lang())].filter(Boolean).join(' · ')) + '</div>' + cuerpo + '</body></html>');
    w.document.close(); w.focus(); setTimeout(function () { try { w.print(); } catch (_) {} }, 350);
    return true;
  }

  var CACHE = {};
  function esquema(sb) {
    var l = lang();
    return Promise.all([catalogo(sb), CACHE[l] ? Promise.resolve(CACHE[l])
      : sb.rpc('esquema_ficha_tecnica', { p_lang: l }).then(function (r) { CACHE[l] = r.data || null; return CACHE[l]; }, function () { return null; })])
      .then(function (x) { return x[1]; });
  }

  /* ═══ EL SELECTOR DEL CATÁLOGO ═══════════════════════════════════
     Listas cortas de varias opciones (alergias…): pastillas que se marcan.
     Listas largas (marcas…) o de una sola opción: buscador con desplegable.
     «No encuentro mi opción»: lo propone; queda pendiente de que el equipo
     lo apruebe o lo una a uno que ya existe, y mientras se guarda igual. */
  // Los grupos del catálogo se guardan en español: aquí se dicen en el idioma de cada cual
  function grupoNombre(g) {
    var k = 'pp_gr_' + String(g).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    return T(k, g);
  }
  function sel(dom, val, o) {
    o = o || {};
    return '<div class="pp-sel" data-dom="' + esc(dom) + '" data-valor="' + esc(partes(val).join(',')) + '"' +
      (o.id ? ' id="' + esc(o.id) + '"' : '') + (o.multi != null ? ' data-multi="' + (o.multi ? 1 : 0) + '"' : '') +
      (o.proponer === false ? ' data-proponer="0"' : '') + (o.ph ? ' data-ph="' + esc(o.ph) + '"' : '') + '></div>';
  }
  function valorDe(el) { if (typeof el === 'string') el = document.getElementById(el); return el ? (el.dataset.valor || '') : ''; }
  function listaDe(el) { return partes(valorDe(el)); }
  function montar(raiz, sb) {
    estilo(); raiz = raiz || document;
    return catalogo(sb).then(function () {
      raiz.querySelectorAll('.pp-sel').forEach(function (el) { if (!el.dataset.montado) montarUno(el, sb); });
    });
  }
  function montarUno(el, sb) {
    el.dataset.montado = '1';
    var dom = el.dataset.dom, D = (cat() && cat()[dom]) || { multi: true, opciones: [] };
    var multi = el.dataset.multi != null ? el.dataset.multi === '1' : !!D.multi;
    var ops = D.opciones.slice();
    if (dom === 'alergeno') ops.unshift({ c: 'none', l: T('pp_ninguna', 'Ninguna') });
    var proponer = el.dataset.proponer !== '0' && !!sb;
    var corto = ops.length <= 18 && !ops.some(function (x) { return x.g; });
    var elegidos = function () { return partes(el.dataset.valor); };
    var poner = function (arr) {
      if (dom === 'alergeno') { var i = arr.indexOf('none'); if (i >= 0 && arr.length > 1) arr = i === arr.length - 1 ? ['none'] : arr.filter(function (x) { return x !== 'none'; }); }
      el.dataset.valor = arr.join(','); pintar(); el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    var alternar = function (c) {
      var a = elegidos(), i = a.indexOf(c);
      if (multi) { if (i >= 0) a.splice(i, 1); else a.push(c); } else a = i >= 0 ? [] : [c];
      poner(a);
    };
    var esPend = function (c) { var DD = cat() && cat()[dom]; return !!(DD && DD.pend && DD.pend[c]); };
    var pill = function (c, on, quitar) {
      return '<button type="button" class="pp-pill' + (on ? ' on' : '') + '" data-c="' + esc(c) + '">' + esc(nombre(dom, c)) +
        (esPend(c) && c !== 'none' ? ' <span class="pend">' + esc(T('pp_pendiente_rev', 'en revisión')) + '</span>' : '') +
        (quitar ? ' <b data-q="' + esc(c) + '" aria-label="×">×</b>' : '') + '</button>';
    };
    var proponerHtml = function () {
      return '<div class="pp-prop" hidden><input maxlength="80" placeholder="' + esc(T('pp_prop_ph', 'Escríbelo como se llama')) + '">' +
        '<button type="button">' + esc(T('pp_prop_btn', 'Proponer')) + '</button>' +
        '<small>' + esc(T('pp_prop_nota', 'Lo revisará el equipo de Babyloon para que todas lo llamemos igual. Mientras tanto, queda guardado.')) + '</small></div>';
    };
    function pintar() {
      var a = elegidos();
      if (corto) {
        var extra = a.filter(function (c) { return !ops.some(function (x) { return x.c === c; }); });
        el.innerHTML = '<div class="pp-pills">' + ops.map(function (x) { return pill(x.c, a.indexOf(x.c) >= 0); }).join('') +
          extra.map(function (c) { return pill(c, true); }).join('') +
          (proponer ? '<button type="button" class="pp-pill mas" data-otra="1">+ ' + esc(T('pp_otra', 'No encuentro mi opción')) + '</button>' : '') + '</div>' + (proponer ? proponerHtml() : '');
      } else {
        el.innerHTML = '<div class="pp-combo">' + a.map(function (c) { return pill(c, true, true); }).join('') +
          '<input type="text" autocomplete="off" placeholder="' + esc(a.length && !multi ? '' : (el.dataset.ph || T('pp_buscar', 'Buscar o elegir…'))) + '"' + (a.length && !multi ? ' style="min-width:40px"' : '') + '></div>' +
          '<div class="pp-lista" hidden></div>' + (proponer ? proponerHtml() : '');
      }
      enganchar();
    }
    function abrirLista(q) {
      var L = el.querySelector('.pp-lista'); if (!L) return;
      q = (q || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      var a = elegidos(), g = null, h = '', n = 0;
      ops.forEach(function (x) {
        var t = (x.l + ' ' + x.c).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        if (q && t.indexOf(q) < 0) return;
        if (n >= 120) return; n++;
        if (x.g && x.g !== g) { g = x.g; h += '<div class="g">' + esc(grupoNombre(g)) + '</div>'; }
        h += '<button type="button" data-c="' + esc(x.c) + '"' + (a.indexOf(x.c) >= 0 ? ' class="on"' : '') + '>' + esc(x.l) + '</button>';
      });
      if (!n) h += '<div class="vacia">' + esc(T('pp_sin_resultados', 'No está en la lista.')) + '</div>';
      if (proponer) h += '<button type="button" class="otra" data-otra="1">+ ' + esc(T('pp_otra', 'No encuentro mi opción')) + '</button>';
      L.innerHTML = h; L.hidden = false;
    }
    function cerrar() { var L = el.querySelector('.pp-lista'); if (L) L.hidden = true; }
    function enganchar() {
      el.querySelectorAll('.pp-pills .pp-pill[data-c]').forEach(function (b) { b.onclick = function () { alternar(b.dataset.c); }; });
      el.querySelectorAll('[data-q]').forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); alternar(b.dataset.q); }; });
      var inp = el.querySelector('.pp-combo input');
      if (inp) {
        el.querySelector('.pp-combo').onclick = function () { inp.focus(); };
        inp.onfocus = function () { abrirLista(inp.value); };
        inp.oninput = function () { abrirLista(inp.value); };
        inp.onkeydown = function (e) {
          if (e.key === 'Escape') { cerrar(); inp.blur(); }
          else if (e.key === 'Enter') { e.preventDefault(); var b = el.querySelector('.pp-lista button[data-c]'); if (b) { alternar(b.dataset.c); } }
          else if (e.key === 'Backspace' && !inp.value) { var a = elegidos(); if (a.length) { a.pop(); poner(a); el.querySelector('.pp-combo input').focus(); } }
        };
      }
      var L = el.querySelector('.pp-lista');
      if (L) L.onmousedown = function (e) {
        var b = e.target.closest('button'); if (!b) return; e.preventDefault();
        if (b.dataset.otra) { cerrar(); abrirPropuesta(inp ? inp.value : ''); return; }
        alternar(b.dataset.c); if (multi) { var i2 = el.querySelector('.pp-combo input'); if (i2) { i2.focus(); } } else cerrar();
      };
      var mas = el.querySelector('.pp-pills [data-otra]'); if (mas) mas.onclick = function () { abrirPropuesta(''); };
    }
    function abrirPropuesta(txt) {
      var P = el.querySelector('.pp-prop'); if (!P) return;
      P.hidden = false; var i = P.querySelector('input'); i.value = txt || ''; i.focus();
      var enviar = function () {
        var t = i.value.trim(); if (t.length < 2) { i.focus(); return; }
        var b = P.querySelector('button'); b.disabled = true;
        sb.rpc('proponer_termino_belleza', { p_dominio: dom, p_texto: t }).then(function (r) {
          b.disabled = false; var d = r && r.data;
          if (!d || !d.ok) { P.querySelector('small').textContent = T('pp_prop_error', 'No se pudo proponer. Inténtalo de nuevo.'); return; }
          if (!d.existia) { var DD = cat() && cat()[dom]; if (DD) { DD.pend = DD.pend || {}; DD.pend[d.codigo] = t; } }
          P.hidden = true; var a = elegidos(); if (a.indexOf(d.codigo) < 0) { if (multi) a.push(d.codigo); else a = [d.codigo]; } poner(a);
        });
      };
      P.querySelector('button').onclick = enviar;
      i.onkeydown = function (e) { if (e.key === 'Enter') { e.preventDefault(); enviar(); } if (e.key === 'Escape') P.hidden = true; };
    }
    // Un clic dentro redibuja el selector: su botón ya no está en la página y no cuenta como «fuera»
    document.addEventListener('mousedown', function (e) { if (e.target.isConnected && !el.contains(e.target)) cerrar(); });
    pintar();
  }

  window.BBLPasaporte = { html: html, imprimir: imprimir, esquema: esquema, estilo: estilo, legible: legible, legibleDom: legibleDom,
    catalogo: catalogo, nombre: nombre, sel: sel, montar: montar, valor: valorDe, lista: listaDe, CAMPO_DOM: CAMPO_DOM };
})();
