#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generar_ciudades.py · Babyloon
Genera una página por ciudad abierta, y el sitemap, desde la base.

POR QUÉ EXISTE
    La web se escribió para un lanzamiento por ciudades: tres páginas a
    mano y la portada diciendo «Comenzamos en Málaga, Madrid y Miami».
    La base tiene 43 ciudades en 19 países, todas con 75 servicios
    tarifados y su moneda.

    Tres páginas a mano no escalan a 43, y 43 páginas clon con el nombre
    cambiado son páginas puerta: Google las penaliza y con razón. Lo que
    sí aporta es el precio REAL de esa ciudad: en Bogotá la depilación de
    labio empieza en 31.699 COP y en Ámsterdam no.

CÓMO SE USA
    1) Sacar los datos de la base (una consulta, sin credenciales aquí):

         select jsonb_build_object(
           'generado', to_char(now(),'YYYY-MM-DD'),
           'ciudades', (select jsonb_agg(cp || jsonb_build_object(
                                  'productos_boutique',
                                  (select count(*) from boutique_products bp
                                    where bp.is_active and bp.image_url is not null
                                      and bp.paises_de_venta @> array[cp->>'pais_iso']))
                                  order by cp->>'slug')
                          from jsonb_array_elements(ciudades_publicas()) x,
                               lateral (select ciudad_publica(x->>'slug') as cp) l)
         )::text;

       Guardar el resultado como `ciudades.json`.

       `productos_boutique` es lo mismo que enseña `boutique.html` con
       «Envío a» ese país (activos, con foto y vendibles allí): si es 0,
       la página no promete boutique (61.89, más abajo).

    2) python3 generar_ciudades.py ciudades.json <carpeta-de-la-web>

    3) MIRAR EL DIFF antes de subir nada.

       Y no es una formalidad. El 30-sep resultó que este generador
       llevaba desde el 25 sin poder ejecutarse sin estropear la web:
       seis semanas de arreglos habían entrado en las 43 páginas y no
       aquí, así que regenerar habría devuelto las tipografías a Google
       Fonts y bajado cinco rompe-cachés. Cada vez que se toque una
       hoja de estilos, un script o su versión en las páginas de ciudad,
       HAY QUE TOCARLO TAMBIÉN AQUÍ, o este fichero se convierte otra
       vez en código muerto de 24 KB con instrucciones de uso.

    Necesita, en esta misma carpeta, `plantilla_estilos.txt` y
    `plantilla_header.txt`.

    Escribe las páginas, `sitemap.xml` y `paginas-de-ciudad.js`.

LAS CIUDADES QUE TIENEN PÁGINA (61.89)
    `paginas-de-ciudad.js` es la lista de las ciudades con página, y la
    portada enseña solo esas. Una ciudad recién añadida en el panel está
    en la base desde ese momento, pero su página no existe hasta que se
    genera y se publica la web: antes, la portada la enseñaba con un
    enlace que no llevaba a ninguna parte. Ahora aparece en la portada
    cuando su página está publicada, ni antes ni después.

    Si ese fichero no llegara, la portada enseña todas, como antes: se
    degrada, no se rompe. Si llegara uno viejo, faltan las últimas: llega
    tarde, pero nunca a una página que no existe.

LA BOUTIQUE, SOLO DONDE VENDE (61.89)
    «Boutique con envío a Ámsterdam» era falso: la boutique vende en ocho
    países y los Países Bajos no son uno de ellos. Y lo mismo en Dubái,
    Bogotá, Tokio y otras quince, y lo habría sido en Toronto, Vancouver
    y Dublín. Ahora el bloque de la boutique —y el «Ver boutique» de una
    ciudad abierta— salen solo si hay productos que se vendan en ese
    país. Si el volcado no trae
    `productos_boutique` (una consulta vieja), salen como antes y el
    generador lo avisa.

LOS DIECISÉIS IDIOMAS (bloque 22.4)
    Hasta hoy estas páginas no tenían NI UNA frase traducible. Elegías
    inglés en la portada, pulsabas «Ver precios» y aterrizabas en una
    página entera en español. Y como `i18n.js` sí cambiaba el atributo
    `lang`, un móvil en árabe la volteaba de derecha a izquierda con el
    texto en castellano.

    Ahora cada frase lleva su clave, y el diccionario está en
    `i18n-ciudad.js`. Hay dos marcas distintas, y la diferencia importa:

      · `data-i18n`   — frases sin huecos. Las traduce `i18n.js` solo.
      · `data-i18n-v` — frases con {ciudad}, {n}, {moneda} o {fecha}.
        Las rellena la propia página: si las tocara `i18n.js`, al
        cambiar de idioma borraría el hueco ya relleno.

    El nombre del PAÍS no se traduce a mano: lo dice el navegador con
    `Intl.DisplayNames` a partir del ISO. Son 19 países y el navegador
    ya sabe decirlos, en los dieciséis idiomas.

    El `<title>` y la `<meta description>` se actualizan en el navegador
    al cambiar de idioma —para la pestaña y para compartir—, pero Google
    lee el HTML servido, que sigue en español. Eso exige una URL por
    idioma: es el bloque 22.1 y no se hace aquí.

QUÉ NO HACE
    No convierte precios. Los trae ya convertidos `ciudad_publica()`, que
    usa `convert_price()` —la misma del backend, con su colchón del 3 %
    y su redondeo—. Si la conversión se copiara aquí, el día que cambie
    el colchón habría dos precios distintos para lo mismo.
"""
import json
import os
import re
import sys
import unicodedata
from datetime import date

SITIO = "https://babyloon.app"

# Cómo se escribe un importe en cada moneda. Las de sin decimales son las
# mismas que en money.js y en convert_price: si divergen, el precio que se
# enseña deja de ser el que se cobra.
SIN_DECIMALES = {"COP", "CLP", "JPY", "KRW", "HUF", "ISK", "VND"}
SIMBOLO = {
    "EUR": "€", "USD": "$", "GBP": "£", "JPY": "¥", "CHF": "CHF",
    "AED": "AED", "MXN": "$", "COP": "$", "ARS": "$", "BRL": "R$",
    "HUF": "Ft", "PLN": "zł", "SEK": "kr",
    # 61.89 · Toronto y Vancouver. «C$» y no «$» pelado: en una web con
    # nueve ciudades de EE. UU., un «$» canadiense se lee como dólar
    # estadounidense.
    "CAD": "C$",
}


def importe(valor, moneda):
    """14.0 EUR → «14 €» · 31699.0 COP → «31.699 $»"""
    if valor is None:
        return "—"
    v = float(valor)
    sim = SIMBOLO.get(moneda, moneda)
    if moneda in SIN_DECIMALES or v == int(v):
        txt = f"{int(round(v)):,}".replace(",", ".")
    else:
        txt = f"{v:,.2f}".replace(",", "@").replace(".", ",").replace("@", ".")
    # El símbolo detrás es lo que se usa en España y en la mayoría de
    # Europa; delante, en América. No es un detalle: un precio con el
    # símbolo en el sitio equivocado se lee como de otro país.
    return f"{txt} {sim}" if moneda in ("EUR", "PLN", "SEK", "HUF") else f"{sim}{txt}"


def esc(s):
    return (str(s).replace("&", "&amp;").replace("<", "&lt;")
            .replace(">", "&gt;").replace('"', "&quot;"))


def clave(s):
    """«Cejas y Pestañas» → «cejas_y_pestanas».
    La misma regla con la que se generó `i18n-ciudad.js`. Si cambia aquí,
    hay que cambiarla allí o la tabla se queda sin traducir."""
    s = unicodedata.normalize("NFKD", str(s)).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "_", s.lower()).strip("_")


EXTRA_CSS = """
.tarifa{width:100%;border-collapse:collapse;font-size:14px}
.tarifa th{text-align:left;font-weight:400;color:var(--gold);font-size:11px;letter-spacing:.2em;text-transform:uppercase;padding:0 12px 12px;border-bottom:1px solid var(--line)}
.tarifa td{padding:13px 12px;border-bottom:1px solid rgba(249,245,238,.06);color:var(--smoke)}
.tarifa td.n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--cream)}
.tarifa td.ej{color:var(--mauve);font-size:13px}
.tarifa tr:last-child td{border-bottom:0}
.nota{color:var(--mauve);font-size:12px;text-align:center;margin-top:18px}
.estado{color:var(--gold);font-size:14px;margin:0 auto 26px;max-width:560px;position:relative}
.otras{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.otras a{border:1px solid var(--line);border-radius:999px;padding:7px 14px;font-size:12.5px;color:var(--smoke)}
.otras a:hover{border-color:var(--gold);color:var(--gold)}
/* En árabe la tabla se lee de derecha a izquierda, y las dos columnas de
   números tienen que cambiar de lado: si no, el precio queda pegado al
   texto y se lee como parte de él. */
[dir="rtl"] .tarifa th{text-align:right}
[dir="rtl"] .tarifa td.n,[dir="rtl"] .tarifa th:nth-child(2),[dir="rtl"] .tarifa th:nth-child(3){text-align:left}
/* La tabla no puede sacar la PÁGINA de sitio. Medido a 360 px en
   húngaro —palabras largas y precios de cinco cifras en HUF— se salía
   28 px. Con el contenedor, si algún idioma no cabe, se desliza la
   tabla y no la página. */
.tabla-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;max-width:100%}
@media(max-width:760px){.tarifa td.ej{display:none}.tarifa th:nth-child(4){display:none}}
@media(max-width:430px){.tarifa{font-size:13px}.tarifa td,.tarifa th{padding-left:8px;padding-right:8px}}
"""

# El relleno de los huecos. Se escribe aparte para que el f-string de la
# página no tenga que escapar cada llave de JavaScript.
SCRIPT_HUECOS = """
<script>
/* ── Los huecos de esta ciudad ─────────────────────────────────────
   `i18n.js` traduce lo que lleva `data-i18n` cambiando el texto entero.
   Eso no sirve para las frases con hueco —«Tarifas en {ciudad}»—,
   porque al cambiar de idioma borraría el nombre de la ciudad ya
   puesto. Esas llevan `data-i18n-v` y las rellena esto.

   El país NO está en el diccionario: lo dice el navegador a partir del
   ISO, que lo sabe en los dieciséis idiomas. Si el navegador es viejo y
   no tiene `Intl.DisplayNames`, se queda el nombre en español, que es
   exactamente lo que había antes: se degrada, no se rompe.

   La fecha se escribe en el formato de cada idioma. Una fecha en
   formato ajeno se lee mal y, con día y mes por debajo de 13, se lee
   AL REVÉS. */
(function () {
  var C = __DATOS__;

  function idioma() {
    return (window.BBL && BBL.lang) || document.documentElement.lang || 'es';
  }

  function fechaLocal() {
    try {
      var p = String(C.fecha).split('-');
      return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]))
        .toLocaleDateString(idioma(), { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
    } catch (_) { return C.fecha; }
  }

  /* 60.6 · El mes de apertura. Se dice MES Y AÑO, no día: lo que se
     promete es «enero de 2027», y un día exacto que luego se mueve es
     una promesa rota escrita en una página estática.
     61.89 · Y en UTC, las dos fechas. `Date.UTC` es la medianoche EN UTC,
     y sin `timeZone: 'UTC'` el navegador la escribe en su hora: al oeste
     de Greenwich, el día anterior. Quien miraba Chicago desde Chicago leía
     «Babyloon abre en Chicago en diciembre de 2026». */
  function aperturaLocal() {
    if (!C.abre) return '';
    try {
      var p = String(C.abre).split('-');
      return new Date(Date.UTC(+p[0], +p[1] - 1, 1))
        .toLocaleDateString(idioma(), { year: 'numeric', month: 'long', timeZone: 'UTC' });
    } catch (_) { return String(C.abre); }
  }

  function pais() {
    try {
      if (!C.iso || typeof Intl === 'undefined' || !Intl.DisplayNames) return C.pais;
      return new Intl.DisplayNames([idioma()], { type: 'region' }).of(C.iso) || C.pais;
    } catch (_) { return C.pais; }
  }

  /* 32.1 · Y la ciudad, igual. El país lo sabe el navegador por el ISO;
     una ciudad no tiene ISO, así que las 43 están escritas en
     `i18n-ciudad-nombres.js`. Si ese fichero no llegara, `BBL.ciudad`
     no existe y se queda el nombre en español: se degrada, no se rompe. */
  function ciudad() {
    if (!(window.BBL && BBL.ciudad)) return C.ciudad;
    /* 61.89 · `BBL.ciudad` devuelve lo que le des si no la conoce, y aquí
       se le da el slug: una ciudad nueva sin su nombre en el diccionario
       salía «a domicilio en dallas», en minúsculas. Entonces, el de la base. */
    var n = BBL.ciudad(C.slug || C.ciudad);
    return (n && n !== C.slug) ? n : C.ciudad;
  }

  function rellena() {
    var f = fechaLocal();
    var a = aperturaLocal();
    var cd = ciudad();
    var els = document.querySelectorAll('[data-i18n-v]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i], k = el.getAttribute('data-i18n-v');
      var s = (window.BBL && BBL.t) ? BBL.t(k) : k;
      if (!s || s === k) continue;        // sin traducción, se deja lo que hay
      el.textContent = s
        .split('{ciudad}').join(cd)
        .split('{n}').join(C.n)
        .split('{moneda}').join(C.moneda)
        .split('{fecha}').join(f)
        .split('{apertura}').join(a);
    }
    var p = document.getElementById('cdPais');
    if (p) p.textContent = pais();

    /* El nombre suelto: la cejilla de arriba y el pie. No llevan
       `data-i18n` porque el `<span>` del país va dentro de la cejilla, y
       `data-i18n` borraría el elemento entero. */
    var els = document.querySelectorAll('[data-cd-nombre]');
    for (var j = 0; j < els.length; j++) els[j].textContent = cd;

    /* La pestaña del navegador y lo que se ve al compartir. Google lee el
       HTML servido, así que esto NO es SEO: es cortesía con quien tiene
       ocho pestañas abiertas. El SEO por idioma es el bloque 22.1. */
    try {
      var t = (window.BBL && BBL.t) ? BBL.t('cd_h1b') : null;
      if (t && t !== 'cd_h1b')
        document.title = 'Babyloon · ' + t.split('{ciudad}').join(cd);
    } catch (_) {}
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', rellena);
  else rellena();
  document.addEventListener('bbl:lang', rellena);
})();
</script>
"""


# Los doce meses en español. El HTML servido va en español, así que el mes
# de apertura se escribe aquí; los otros quince idiomas los pone el
# navegador con `Intl`, que los sabe mejor. No se usa `locale` porque el
# del ordenador que genera no es un dato del que deba depender la web.
MESES_ES = ("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
            "agosto", "septiembre", "octubre", "noviembre", "diciembre")


def mes_es(iso):
    """'2027-01-01' -> 'enero de 2027'. Mes y año: lo que se promete es el
    mes, y un día exacto escrito en una página estática es una promesa
    que se rompe sola en cuanto se mueve."""
    try:
        p = str(iso).split("-")
        return f"{MESES_ES[int(p[1]) - 1]} de {int(p[0])}"
    except Exception:
        return str(iso)


def pagina(c, estilos, header, cuando):
    ciudad, pais, mon = c["ciudad"], c["pais"], c["moneda"]
    slug = c["slug"]
    desde = importe(c.get("desde_local"), mon)
    url = f"{SITIO}/ciudad-{slug}.html"
    iso = (c.get("pais_iso") or "").upper()

    titulo = f"Belleza a domicilio en {ciudad} | Babyloon"
    desc = (f"Peluquería, maquillaje, uñas, barbería y estética a domicilio en "
            f"{ciudad}. {c['servicios']} servicios con precio cerrado desde {desde}, "
            f"con identidad verificada que van a ti.")

    # 61.89 · La boutique, solo donde vende. Sin el dato (volcado viejo),
    # como antes.
    pb = c.get("productos_boutique")
    hay_boutique = pb is None or int(pb) > 0

    cats = c.get("categorias") or []
    filas = "\n".join(
        f'<tr><td data-i18n="cat_{clave(x["categoria"])}">{esc(x["categoria"])}</td>'
        f'<td class="n">{x["servicios"]}</td>'
        f'<td class="n">{esc(importe(x.get("desde_local"), mon))}</td>'
        + (f'<td class="ej" data-i18n="ej_{clave(x["mas_asequible"])}">'
           f'{esc(x["mas_asequible"])}</td>'
           if x.get("mas_asequible") else '<td class="ej"></td>')
        + "</tr>"
        for x in cats)

    # La llamada a la acción dice la verdad sobre lo que hay en esa ciudad.
    # Prometer «pide ahora» donde todavía no trabaja nadie es la forma más
    # rápida de quemar una ciudad antes de abrirla.
    #
    # 60.6 · Y hasta hoy esto lo decidía `hay_pros`: si había UNA
    # profesional apuntada, la página anunciaba «Babyloon ya trabaja aquí»
    # y ofrecía «Pedir en la app». Que alguien se dé de alta no es que el
    # mercado esté abierto: son dos hechos distintos y sólo uno es una
    # decisión. Marbella llevaba semanas anunciando que Babyloon ya
    # trabajaba allí con una profesional apuntada y el mercado sin abrir,
    # y un solo alta en Tokio —ciudad descartada— habría puesto lo mismo
    # en su página. Ahora manda el estado de apertura.
    est = c.get("estado") or "sin_decidir"
    if est == "abierta":
        cta = ('<a href="index.html#app" class="btn btn-gold" data-app-open '
               'data-i18n="cd_cta_app">Pedir en la app</a>'
               + ('<a href="boutique.html" class="btn btn-ghost" '
                  'data-i18n="cd_cta_boutique">Ver boutique</a>' if hay_boutique else ''))
        estado = (f'<p class="estado" data-i18n-v="cd_estado_si">'
                  f'Babyloon ya trabaja en {esc(ciudad)}.</p>')
    elif est == "enero_2027" and c.get("abre_el"):
        # La fecha NO se escribe aquí: se escribe en el navegador, en el
        # idioma de quien mira. Una fecha en formato ajeno se lee mal y,
        # con día y mes por debajo de 13, se lee AL REVÉS — es la misma
        # razón por la que la fecha de las tarifas tampoco se escribe aquí.
        # Y se dice el MES, no el día: lo que se promete es el mes.
        cta = ('<a href="lista-espera.html" class="btn btn-gold" '
               'data-i18n="cd_cta_trabajar">Quiero trabajar aquí</a>'
               '<a href="index.html#app" class="btn btn-ghost" '
               'data-i18n="cd_cta_avisame">Avísame cuando abra</a>')
        estado = (f'<p class="estado" data-i18n-v="cd_estado_abre">'
                  f'Babyloon abre en {esc(ciudad)} en {esc(mes_es(c["abre_el"]))}. '
                  f'Las tarifas ya están calculadas y buscamos a quien '
                  f'preste los primeros servicios.</p>')
    else:
        # `en_espera`, `en_la_nevera` y `sin_decidir` dicen lo mismo de
        # cara afuera, y es lo único cierto de las tres: hay tarifas y no
        # hay fecha. La distinción es una decisión interna que puede
        # cambiar, y anunciar «hemos decidido no abrir aquí» cierra una
        # puerta que el panel deja abierta.
        #
        # Lo que YA NO se dice es «buscamos a quien preste los primeros
        # servicios»: eso afirma una búsqueda activa, y en 25 ciudades no
        # la hay. El botón se queda —el interés de una profesional ayuda a
        # decidir si se abre— pero deja de ser la llamada principal.
        cta = ('<a href="index.html#app" class="btn btn-gold" '
               'data-i18n="cd_cta_avisame">Avísame cuando abra</a>'
               '<a href="lista-espera.html" class="btn btn-ghost" '
               'data-i18n="cd_cta_trabajar">Quiero trabajar aquí</a>')
        #
        # 61.60 · Y lo que SÍ se dice es que vamos a abrir más (decisión de
        # Andrés, 10). En estas ciudades no se puede pedir nada —el servidor
        # no crea la petición: `_mercado_abre`, la misma regla que aquí—, y
        # la página no se queda en «no hay fecha»: empezamos por otras
        # ciudades y vamos a abrir muchas más.
        estado = (f'<p class="estado" data-i18n-v="cd_estado_no">'
                  f'Babyloon todavía no ha abierto en {esc(ciudad)}: '
                  f'empezamos por otras ciudades y vamos a abrir muchas más. '
                  f'Las tarifas de {esc(ciudad)} ya están calculadas.</p>')

    jsonld = json.dumps({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": f"Babyloon {ciudad}",
        "image": f"{SITIO}/og-image.png",
        "url": url,
        "description": desc,
        "areaServed": {"@type": "City", "name": ciudad,
                       "address": {"@type": "PostalAddress", "addressCountry": iso}},
        "geo": ({"@type": "GeoCoordinates",
                 "latitude": c.get("lat"), "longitude": c.get("lng")}
                if c.get("lat") else None),
        "priceRange": "€€€",
        "currenciesAccepted": mon,
    }, ensure_ascii=False, separators=(",", ":"))
    jsonld = jsonld.replace(',"geo":null', "")

    estilos_c = estilos.replace("</style>", EXTRA_CSS + "</style>")

    boutique = (f'''<section class="blk shopblk"><div class="wrap">
<h2 data-i18n-v="cd_bq_h">Boutique con envío a {esc(ciudad)}</h2>
<p data-i18n-v="cd_bq_p">Productos de belleza seleccionados, con entrega en {esc(ciudad)}.</p>
<a href="boutique.html" class="btn btn-gold" data-i18n="cd_cta_boutique">Ver boutique</a>
</div></section>

''' if hay_boutique else "")

    datos_js = json.dumps({
        # El SLUG viaja también: es la clave con la que se busca el nombre
        # de la ciudad traducido (`cd_n_<slug>`). Sin él, la página sólo
        # sabría decirlo en español.
        "ciudad": ciudad, "slug": slug, "n": c["servicios"], "moneda": mon,
        "iso": iso, "pais": pais, "fecha": cuando,
        # 60.6 · En ISO, para que el navegador la escriba en su idioma.
        "abre": c.get("abre_el"),
    }, ensure_ascii=False)
    script = SCRIPT_HUECOS.replace("__DATOS__", datos_js)

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(desc)}" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#0D0B0F" />
<link rel="canonical" href="{url}" />
<link rel="icon" href="favicon.svg" type="image/svg+xml" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Babyloon" />
<meta property="og:title" content="{esc(titulo)}" />
<meta property="og:description" content="{esc(desc)}" />
<meta property="og:url" content="{url}" />
<meta property="og:image" content="{SITIO}/og-image.png" />
<!-- 17.A8c · Las tipografías se sirven desde nuestro dominio, no desde
     Google Fonts. Dos razones y las dos valen: la IP de quien entra no se
     le manda a un tercero antes de que acepte nada, y una web que abre en
     2027 no depende de que un CDN ajeno esté en pie. NO volver a poner
     `fonts.googleapis.com` aquí. -->
<link href="fuentes.css?v=1" rel="stylesheet" />
<script type="application/ld+json">{jsonld}</script>
{estilos_c}
<link rel="stylesheet" href="movil.css?v=1" />
<link rel="stylesheet" href="estetica.css?v=2" />
</head>
{header}<main>
<section class="hero"><div class="wrap">
<span class="eyebrow"><span data-cd-nombre>{esc(ciudad)}</span> · <span id="cdPais">{esc(pais)}</span></span>
<h1><span data-i18n="cd_h1a">Belleza de lujo</span> <span class="gold-text" data-i18n-v="cd_h1b">a domicilio en {esc(ciudad)}</span></h1>
<p data-i18n-v="cd_lead">{c['servicios']} servicios con precio cerrado, identidad verificada y pago protegido. Tú eliges dónde y cuándo.</p>
{estado}
<div class="cta">{cta}</div>
</div></section>

<section class="blk"><div class="wrap">
<h2 data-i18n-v="cd_tarifas">Tarifas en {esc(ciudad)}</h2>
<div class="tabla-scroll">
<table class="tarifa">
<thead><tr><th data-i18n="cd_th_cat">Categoría</th><th style="text-align:right" data-i18n="cd_th_serv">Servicios</th><th style="text-align:right" data-i18n="cd_th_desde">Desde</th><th data-i18n="cd_th_ej">Por ejemplo</th></tr></thead>
<tbody>
{filas}
</tbody>
</table>
</div>
<p class="nota" data-i18n-v="cd_nota">Precios orientativos en {esc(mon)}, medidos para {esc(ciudad)} y actualizados el {cuando}. El importe exacto lo fija el servidor al reservar, según el servicio, la hora y el desplazamiento.</p>
</div></section>

<section class="blk"><div class="wrap">
<h2 data-i18n-v="cd_como">Cómo funciona en {esc(ciudad)}</h2>
<div class="steps">
<div><span class="n">01</span><h3 data-i18n="cd_p1t">Solicita</h3><p data-i18n="cd_p1d">Elige el servicio y la hora en la app.</p></div>
<div><span class="n">02</span><h3 data-i18n="cd_p2t">Recibe</h3><p data-i18n="cd_p2d">Tu profesional llega a tu casa, hotel u oficina.</p></div>
<div><span class="n">03</span><h3 data-i18n="cd_p3t">Disfruta</h3><p data-i18n="cd_p3d">Vive la experiencia con pago protegido.</p></div>
</div>
</div></section>

{boutique}<section class="blk"><div class="wrap">
<h2 data-i18n="cd_otras">Otras ciudades</h2>
<div class="otras">__OTRAS__</div>
</div></section>
</main>
<footer><div class="wrap">Babyloon · <span data-cd-nombre>{esc(ciudad)}</span> — <a href="index.html" data-i18n="cd_pie_inicio">Inicio</a> · <a href="lista-espera.html" data-i18n="cd_pie_trabaja">Trabajar en Babyloon</a> · © {date.today().year}</div></footer>
<script src="app-link.js"></script>
<script src="cookies.js?v=2"></script>
<script src="presencia.js?v=2"></script>
<script src="supabase-js-2.117.1.min.js"></script>
<script src="conexion.js?v=1"></script>
<script src="i18n.js?v=10"></script>
<script src="i18n-ciudad.js?v=2"></script>
<script src="i18n-ciudad-nombres.js?v=3"></script>
<script src="i18n-baby.js?v=1"></script>
<script src="baby.js?v=1"></script>
{script}
</body>
</html>
"""


def paginas_js(ciudades):
    """61.89 · La lista de las ciudades que tienen página, para la portada."""
    slugs = json.dumps([c["slug"] for c in ciudades], ensure_ascii=False)
    return ("/* paginas-de-ciudad.js · lo escribe generar_ciudades.py: no se edita a mano.\n"
            "   Las ciudades que tienen página. La portada enseña solo estas, para\n"
            "   que ningún enlace lleve a una página que todavía no se ha publicado. */\n"
            f"window.BBL_PAGINAS_DE_CIUDAD = {slugs};\n")


def sitemap(ciudades, cuando):
    fijas = ["index.html", "como-funciona.html", "boutique.html", "academia.html",
             "regalo.html", "profesionales.html", "lista-espera.html",
             "contacto.html", "terminos.html", "privacidad.html",
             "novias.html", "masterclass.html", "para-profesionales.html"]
    urls = [f"<url><loc>{SITIO}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>"]
    for f in fijas:
        if f == "index.html":
            continue
        # La lista de espera es el único embudo de captación de
        # profesionales que tiene la web. Y novias es la página con más
        # intención de compra del sitio.
        # `para-profesionales` es, con la lista de espera, el otro
        # embudo de captación de profesionales.
        pri = ("0.95" if f == "novias.html"
               else "0.9" if f in ("lista-espera.html", "para-profesionales.html")
               else "0.7")
        urls.append(f"<url><loc>{SITIO}/{f}</loc><changefreq>monthly</changefreq>"
                    f"<priority>{pri}</priority></url>")
    for c in ciudades:
        urls.append(f"<url><loc>{SITIO}/ciudad-{c['slug']}.html</loc>"
                    f"<lastmod>{cuando}</lastmod><changefreq>monthly</changefreq>"
                    f"<priority>0.8</priority></url>")
    cuerpo = "\n".join(urls)
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            f"{cuerpo}\n</urlset>\n")


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    datos = json.load(open(sys.argv[1], encoding="utf-8"))
    destino = sys.argv[2]
    ciudades = [c for c in datos["ciudades"] if c.get("ok")]
    cuando = datos.get("generado") or date.today().isoformat()

    aqui = os.path.dirname(os.path.abspath(__file__))
    estilos = open(os.path.join(aqui, "plantilla_estilos.txt"), encoding="utf-8").read()
    header = open(os.path.join(aqui, "plantilla_header.txt"), encoding="utf-8").read()

    for c in ciudades:
        html = pagina(c, estilos, header, cuando)
        # Las «otras ciudades» son las del mismo país primero: quien busca
        # Marbella probablemente también mire Málaga, no Tokio.
        mismas = [o for o in ciudades if o["pais"] == c["pais"] and o["slug"] != c["slug"]]
        otras = [o for o in ciudades if o["pais"] != c["pais"]]
        lista = (mismas + otras)[:14]
        # 32.1 · Cada chip lleva su clave: es texto suelto dentro de un
        # <a>, así que `data-i18n` puede reescribirlo entero sin romper
        # nada. En español se ve igual que antes; en inglés pone
        # «Stockholm» donde ponía «Estocolmo».
        chips = "".join(
            f'<a href="ciudad-{o["slug"]}.html" data-i18n="cd_n_{o["slug"]}">'
            f'{esc(o["ciudad"])}</a>' for o in lista)
        html = html.replace("__OTRAS__", chips)
        open(os.path.join(destino, f"ciudad-{c['slug']}.html"), "w",
             encoding="utf-8").write(html)

    open(os.path.join(destino, "sitemap.xml"), "w", encoding="utf-8").write(
        sitemap(ciudades, cuando))

    open(os.path.join(destino, "paginas-de-ciudad.js"), "w", encoding="utf-8").write(
        paginas_js(ciudades))

    print(f"{len(ciudades)} páginas de ciudad + sitemap.xml + paginas-de-ciudad.js en {destino}")
    # 60.6 · El recuento por estado, que es lo que decide qué dice cada
    # página. Las absorbidas no salen de `ciudades_publicas`, así que si
    # el total no cuadra con el catálogo es que falta alguna decisión.
    por = {}
    for c in ciudades:
        e = c.get("estado") or "sin_decidir"
        por[e] = por.get(e, 0) + 1
    for e in sorted(por):
        que = {"abierta": "«Babyloon ya trabaja aquí» · Pedir en la app",
               "enero_2027": "«abre en <mes>» · Quiero trabajar aquí",
               }.get(e, "«todavía no ha abierto; vamos a abrir muchas más» · Avísame cuando abra")
        print(f"  {por[e]:>3} {e:<14} {que}")
    sin_dato = [c["ciudad"] for c in ciudades if c.get("productos_boutique") is None]
    if sin_dato:
        print(f"  ATENCIÓN · el volcado no trae `productos_boutique` en {len(sin_dato)} "
              f"ciudades: salen con el bloque de la boutique, venda o no allí. "
              f"La consulta buena está arriba, en CÓMO SE USA.")
    sin_bq = [c["ciudad"] for c in ciudades if c.get("productos_boutique") == 0]
    if sin_bq:
        print(f"  {len(sin_bq):>3} sin boutique (no se vende en su país): {', '.join(sin_bq)}")
    mudas = [c["ciudad"] for c in ciudades
             if (c.get("estado") == "enero_2027" and not c.get("abre_el"))]
    if mudas:
        print(f"  ATENCIÓN · {len(mudas)} ciudades prometen apertura SIN FECHA "
              f"y saldrán como «todavía no ha abierto»: {', '.join(mudas)}")


if __name__ == "__main__":
    main()
