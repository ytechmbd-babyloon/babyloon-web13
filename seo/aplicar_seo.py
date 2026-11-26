# Babyloon · SEO de lanzamiento (26-nov-2026)
# Aplica cabeceras, datos estructurados, robots, sitemap y llms.txt sobre
# la copia de la web. Idempotente: los bloques nuevos van entre marcas
# <!-- SEO:INICIO --> ... <!-- SEO:FIN --> y se reescriben si se vuelve a ejecutar.
import json, re, sys, pathlib, datetime

# Uso: python seo/aplicar_seo.py   (desde la carpeta de la web)
# Orden: si se regeneran las ciudades, primero generar_ciudades.py y DESPUÉS
# este script, que parte del sitemap que deja aquel y lo completa.
WEB = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parent.parent
HOY = '2026-11-26'
BASE = 'https://babyloon.app'
LANGS = ['es', 'en', 'pt', 'fr', 'de', 'it', 'nl', 'pl', 'el', 'hu', 'ru', 'ar', 'zh', 'ja', 'ko', 'sv']
OG_LOCALES = {'es': 'es_ES', 'en': 'en_US', 'pt': 'pt_PT', 'fr': 'fr_FR', 'de': 'de_DE', 'it': 'it_IT', 'nl': 'nl_NL',
              'pl': 'pl_PL', 'el': 'el_GR', 'hu': 'hu_HU', 'ru': 'ru_RU', 'ar': 'ar_AE', 'zh': 'zh_CN', 'ja': 'ja_JP',
              'ko': 'ko_KR', 'sv': 'sv_SE'}

# ── Etapas de apertura (plan base) ─────────────────────────────────────
ETAPAS = [
    ('Etapa 1 · 2027', [('Marbella', 'ES', 'marbella'), ('Madrid', 'ES', 'madrid'), ('Palma', 'ES', 'palma'),
                        ('Lisboa', 'PT', 'lisboa'), ('Barcelona', 'ES', 'barcelona'), ('Málaga', 'ES', 'malaga'),
                        ('Miami', 'US', 'miami'), ('Ibiza', 'ES', 'ibiza')]),
    ('Etapa 2 · 2028', [('Sevilla', 'ES', 'sevilla'), ('Valencia', 'ES', 'valencia'), ('Chicago', 'US', 'chicago'),
                        ('Londres', 'GB', 'londres'), ('Oporto', 'PT', 'oporto'), ('Algarve', 'PT', None),
                        ('Bilbao', 'ES', 'bilbao'), ('Dublín', 'IE', 'dublin')]),
    ('Etapa 3 · desde 2029', [('Berlín', 'DE', 'berlin'), ('Múnich', 'DE', 'munich'), ('Nueva York', 'US', 'nueva-york')]),
]
PLAN_SLUGS = {s for _, cs in ETAPAS for _, _, s in cs if s}

def ciudad(n, pais, slug):
    c = {'@type': 'City', 'name': n, 'address': {'@type': 'PostalAddress', 'addressCountry': pais}}
    if slug and (WEB / f'ciudad-{slug}.html').exists():
        c['url'] = f'{BASE}/ciudad-{slug}.html'
    return c

AREA = [ciudad(*c) for _, cs in ETAPAS[:2] for c in cs]

UNIDADES = [
    ('Belleza a domicilio y en destino',
     'Peluquería, maquillaje, uñas, barbería, estética y masajes en casa, en el hotel, en la villa o en el evento. Se pide en modalidad AHORA, HOY o PRIVÉE y profesionales verificados pujan por el servicio.'),
    ('Reservas Privée: bodas y eventos',
     'Novias, invitados y eventos con depósito al reservar y equipo de profesionales para el día señalado.'),
    ('Boutique',
     'Productos de belleza seleccionados para clientas y para profesionales, con envío a domicilio.'),
    ('Academia y clases en vivo',
     'Cursos en vídeo, masterclasses en directo y rutinas de autocuidado creadas por profesionales de la belleza.'),
    ('Membresías',
     'Cliente Privée para clientas (descuentos, monedero con cashback, prioridad y regalos) y Privée Pro y Élite para profesionales (comisión reducida y herramientas de gestión y marketing).'),
    ('Tarjetas regalo',
     'Saldo Babyloon para regalar servicios, productos de la boutique y membresías.'),
    ('Modo Viaje',
     'La clienta encuentra en su destino a profesionales con la misma formación y técnicas que su profesional de siempre, y la profesional puede trabajar mientras viaja.'),
    ('Babyloon para empresas',
     'Equipos completos de belleza para wedding planners, productoras de cine y televisión y empresas de eventos (próximamente).'),
]

CLIENTES = [
    'Pide en minutos (AHORA), a una hora concreta (HOY) o para una fecha y evento (PRIVÉE).',
    'Subasta inversa: profesionales cercanos y verificados envían su oferta y eliges por precio, perfil y Babyloon Score.',
    'Identidad y certificados verificados con inteligencia artificial y revisión humana.',
    'Pago retenido por Stripe hasta que se presta el servicio y garantía en cada servicio.',
    'Seguimiento en el mapa del trayecto del profesional hacia la reserva.',
    'Pasaporte de belleza: tus fórmulas, alergias y preferencias viajan contigo.',
    'Modo Viaje para encontrar profesional en tu destino.',
    'Baby, asistente con inteligencia artificial, en la app y en la web.',
    'Boutique, tarjetas regalo, rutinas de autocuidado y membresía Cliente Privée con cashback.',
]
PROFESIONALES = [
    'Solicitudes de clientes cercanos y ofertas con tu propio precio.',
    'Agenda que reúne las reservas de Babyloon y las citas conseguidas por tu cuenta.',
    'Gestor financiero: facturas descargables, gastos escaneados y borradores fiscales.',
    'Cobro protegido con Stripe Connect y monedero.',
    'Portafolio, reseñas y Babyloon Score para destacar.',
    'Academia para vender cursos y masterclasses.',
    'Modo Viaje para trabajar durante tus viajes.',
    'Laboratorio de marketing con inteligencia artificial para reels, historias y publicaciones (en desarrollo).',
    'Membresías Privée Pro y Élite con comisión reducida.',
]

FAQ = [
    ('¿Qué es Babyloon?',
     'Un marketplace de belleza y bienestar de lujo a domicilio y en destino, con app para clientas, app para profesionales (Babyloon Pro) y web, más boutique, academia, membresías y tarjetas regalo.'),
    ('¿Dónde está disponible Babyloon?',
     'Las profesionales pueden registrarse en todo el mundo desde febrero de 2027. Las reservas abren por etapas: en 2027 Marbella, Madrid, Palma, Lisboa, Barcelona, Málaga, Miami e Ibiza; en 2028 Sevilla, Valencia, Chicago, Londres, Oporto, el Algarve, Bilbao y Dublín; y desde 2029 Berlín, Múnich, Nueva York y más ciudades.'),
    ('¿Cómo se solicita un servicio?',
     'Desde la app o la web: eliges el servicio y la modalidad (AHORA, HOY o PRIVÉE), recibes ofertas de profesionales verificados cercanos y pagas de forma segura.'),
    ('¿Los profesionales están verificados?',
     'Sí. Verificamos identidad y certificados con inteligencia artificial y revisión humana, y cada profesional tiene su Babyloon Score.'),
    ('¿Cómo se paga?',
     'Con tarjeta, de forma segura con Stripe. El pago queda retenido hasta que el servicio se presta.'),
    ('¿Puedo comprar productos sin reservar un servicio?',
     'Sí. La Boutique está abierta a todos, igual que las tarjetas regalo.'),
    ('¿Soy profesional de la belleza, cómo me uno?',
     'Descarga Babyloon Pro o regístrate en la web: verificamos tu identidad y certificados y empiezas a recibir solicitudes cuando abre tu ciudad.'),
]

def app(nombre, desc, url):
    return {'@type': 'MobileApplication', 'name': nombre, 'operatingSystem': 'Android, iOS, Web',
            'applicationCategory': 'LifestyleApplication', 'description': desc, 'url': url,
            'publisher': {'@id': BASE + '/#organization'},
            'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR'}}

grafo = {
    '@context': 'https://schema.org',
    '@graph': [
        {'@type': 'Organization', '@id': BASE + '/#organization', 'name': 'Babyloon', 'url': BASE,
         'logo': BASE + '/og-image.png', 'image': BASE + '/og-image.png', 'slogan': 'La belleza, donde tú estés.',
         'description': 'Marketplace de belleza y bienestar de lujo a domicilio y en destino: peluquería, maquillaje, uñas, barbería, estética, masajes y novias, con profesionales verificados, pago retenido hasta el servicio, boutique, academia, membresías, tarjetas regalo y Modo Viaje. App para clientas, app Babyloon Pro para profesionales y web en 16 idiomas.',
         'founder': {'@type': 'Person', 'name': 'Andrés Arias', 'jobTitle': 'Fundador y CEO'},
         'knowsLanguage': LANGS, 'areaServed': AREA},
        {'@type': 'WebSite', '@id': BASE + '/#website', 'name': 'Babyloon', 'url': BASE, 'inLanguage': LANGS,
         'publisher': {'@id': BASE + '/#organization'},
         'potentialAction': {'@type': 'SearchAction',
                             'target': {'@type': 'EntryPoint', 'urlTemplate': BASE + '/profesionales.html?postal={search_term_string}'},
                             'query-input': 'required name=search_term_string'}},
        {'@type': 'Service', '@id': BASE + '/#servicio', 'name': 'Belleza y bienestar de lujo a domicilio y en destino',
         'serviceType': ['Peluquería a domicilio', 'Maquillaje a domicilio', 'Uñas a domicilio', 'Barbería a domicilio',
                         'Estética a domicilio', 'Masajes a domicilio', 'Maquillaje y peinado de novia'],
         'provider': {'@id': BASE + '/#organization'}, 'areaServed': AREA,
         'hasOfferCatalog': {'@type': 'OfferCatalog', 'name': 'Unidades de negocio de Babyloon',
                             'itemListElement': [{'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': n, 'description': d}}
                                                 for n, d in UNIDADES]}},
        app('Babyloon', 'App para clientas: belleza de lujo a domicilio y en destino con subasta inversa, pago retenido, seguimiento en el mapa, pasaporte de belleza, Modo Viaje, boutique y academia. Funciones: ' + ' '.join(CLIENTES), BASE + '/#app'),
        app('Babyloon Pro', 'App para profesionales de la belleza: solicitudes y pujas, agenda, gestor financiero, cobro protegido, portafolio, academia y Modo Viaje. Funciones: ' + ' '.join(PROFESIONALES), BASE + '/para-profesionales.html'),
        {'@type': 'ItemList', '@id': BASE + '/#ciudades', 'name': 'Ciudades de lanzamiento de Babyloon por etapas',
         'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': f'{e}: ' + ', '.join(n for n, _, _ in cs)}
                             for i, (e, cs) in enumerate(ETAPAS)]},
        {'@type': 'FAQPage', '@id': BASE + '/#faq',
         'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in FAQ]},
    ]
}

TITULO = 'Babyloon · Belleza de lujo a domicilio y en destino | App y web'
DESC = ('Peluquería, maquillaje, uñas, barbería, estética y novias a domicilio, en tu hotel o en tu destino. '
        'Profesionales verificados, pago retenido hasta el servicio, boutique, academia y Modo Viaje. App Babyloon y Babyloon Pro.')
KEYW = ('belleza a domicilio, peluquería a domicilio, maquillaje a domicilio, uñas a domicilio, barbería a domicilio, '
        'estética a domicilio, masajes a domicilio, maquillaje de novia, peinado de novia, belleza de lujo, belleza en el hotel, '
        'belleza para viajeros, app de belleza, app para profesionales de la belleza, Marbella, Madrid, Palma, Lisboa, Barcelona, '
        'Málaga, Miami, Ibiza')

def bloque_index():
    alt = '\n'.join(f'<link rel="alternate" hreflang="{l}" href="{BASE}/{"" if l == "es" else "?lang=" + l}" />' for l in LANGS)
    alt += f'\n<link rel="alternate" hreflang="x-default" href="{BASE}/" />'
    loc = '\n'.join(f'<meta property="og:locale:alternate" content="{OG_LOCALES[l]}" />' for l in LANGS if l != 'es')
    return ('<!-- SEO:INICIO · generado por seo/aplicar_seo.py (26-nov-2026); se gestionará desde el panel de marketing -->\n'
            f'<title>{TITULO}</title>\n'
            f'<meta name="description" content="{DESC}" />\n'
            f'<meta name="keywords" content="{KEYW}" />\n'
            '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n'
            '<meta name="theme-color" content="#0D0B0F" />\n'
            '<meta name="application-name" content="Babyloon" />\n'
            '<meta name="apple-mobile-web-app-title" content="Babyloon" />\n'
            f'<link rel="canonical" href="{BASE}/" />\n'
            f'{alt}\n'
            '<link rel="icon" href="favicon.svg" type="image/svg+xml" />\n'
            '<meta property="og:type" content="website" />\n'
            '<meta property="og:site_name" content="Babyloon" />\n'
            f'<meta property="og:title" content="{TITULO}" />\n'
            f'<meta property="og:description" content="{DESC}" />\n'
            f'<meta property="og:url" content="{BASE}/" />\n'
            f'<meta property="og:image" content="{BASE}/og-image.png" />\n'
            '<meta property="og:image:alt" content="Babyloon · La belleza, donde tú estés" />\n'
            '<meta property="og:locale" content="es_ES" />\n'
            f'{loc}\n'
            '<meta name="twitter:card" content="summary_large_image" />\n'
            f'<meta name="twitter:title" content="{TITULO}" />\n'
            f'<meta name="twitter:description" content="{DESC}" />\n'
            f'<meta name="twitter:image" content="{BASE}/og-image.png" />\n'
            '<script type="application/ld+json">\n' + json.dumps(grafo, ensure_ascii=False, separators=(',', ':')) + '\n</script>\n'
            '<!-- SEO:FIN -->\n')

def aplicar_index():
    p = WEB / 'index.html'; s = p.read_text(encoding='utf-8')
    if '<!-- SEO:INICIO' in s:
        s = re.sub(r'<!-- SEO:INICIO.*?<!-- SEO:FIN -->\n', lambda m: bloque_index(), s, flags=re.S)
    else:
        a = s.index('<title>'); b = s.index('<link href="fuentes.css')
        viejo = s[a:b]
        assert viejo.count('application/ld+json') == 2, 'cabecera inesperada'
        s = s[:a] + bloque_index() + s[b:]
    p.write_text(s, encoding='utf-8')

# ── páginas públicas a las que les faltaba cabecera ────────────────────
PAGINAS = {
    'contacto.html': 'Contacta con Babyloon: dudas sobre reservas, la boutique, la academia, las membresías o cómo unirte como profesional de la belleza.',
    'privacidad.html': 'Política de privacidad de Babyloon: qué datos tratamos, para qué, durante cuánto tiempo y cómo ejercer tus derechos.',
    'terminos.html': 'Términos y condiciones de uso de Babyloon para clientas: reservas, pagos retenidos, cancelaciones, boutique y tarjetas regalo.',
    'condiciones-profesionales.html': 'Condiciones para profesionales de la belleza en Babyloon Pro: verificación, comisiones, cobros, membresías y uso de la plataforma.',
    'envios-y-devoluciones.html': 'Envíos y devoluciones de la Boutique Babyloon: plazos de entrega, gastos de envío, devoluciones y reembolsos por país.',
    'novias.html': None, 'profesionales.html': None, 'regalo.html': None,
}

def meta_pagina(nombre, desc_nueva):
    p = WEB / nombre; s = p.read_text(encoding='utf-8')
    if '<!-- SEO:INICIO' in s:
        s = re.sub(r'<!-- SEO:INICIO.*?<!-- SEO:FIN -->\n', '', s, flags=re.S)
    titulo = re.search(r'<title>([^<]*)</title>', s).group(1).strip()
    m = re.search(r'<meta name="description" content="([^"]*)"', s)
    desc = m.group(1) if m else desc_nueva
    lineas = []
    if not m: lineas.append(f'<meta name="description" content="{desc}" />')
    if 'rel="canonical"' not in s: lineas.append(f'<link rel="canonical" href="{BASE}/{nombre}" />')
    if 'name="robots"' not in s: lineas.append('<meta name="robots" content="index, follow" />')
    if 'og:title' not in s:
        lineas += ['<meta property="og:type" content="website" />', '<meta property="og:site_name" content="Babyloon" />',
                   f'<meta property="og:title" content="{titulo}" />', f'<meta property="og:description" content="{desc}" />',
                   f'<meta property="og:url" content="{BASE}/{nombre}" />', f'<meta property="og:image" content="{BASE}/og-image.png" />',
                   '<meta name="twitter:card" content="summary_large_image" />']
    if not lineas: return False
    bloque = '<!-- SEO:INICIO · seo/aplicar_seo.py -->\n' + '\n'.join(lineas) + '\n<!-- SEO:FIN -->\n'
    i = s.index('</title>') + len('</title>')
    s = s[:i] + '\n' + bloque + s[i:].lstrip('\n')
    p.write_text(s, encoding='utf-8'); return True

PRIVADAS = ['cliente.html', 'profesional.html', 'checkout.html']
def noindex(nombre):
    p = WEB / nombre; s = p.read_text(encoding='utf-8')
    if 'name="robots"' in s: return False
    i = s.index('</title>') + len('</title>')
    s = s[:i] + '\n<meta name="robots" content="noindex, nofollow" />' + s[i:]
    p.write_text(s, encoding='utf-8'); return True

# ── robots.txt ─────────────────────────────────────────────────────────
ROBOTS = """# Babyloon · robots.txt (26-nov-2026)
# Todo lo público se puede rastrear, también por buscadores y asistentes
# de IA, para que Babyloon aparezca en sus respuestas.
# Las páginas privadas (cuenta, panel, pago, herramientas internas) NO se
# bloquean aquí a propósito: llevan <meta name="robots" content="noindex">
# y el buscador tiene que poder leerla para sacarlas del índice.

User-agent: *
Allow: /

# Buscadores
User-agent: Googlebot
User-agent: Bingbot
User-agent: Applebot
User-agent: DuckDuckBot
User-agent: YandexBot
User-agent: Baiduspider
Allow: /

# Buscadores y asistentes de IA
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
User-agent: Applebot-Extended
Allow: /

Sitemap: https://babyloon.app/sitemap.xml
"""
def robots():
    (WEB / 'robots.txt').write_text(ROBOTS, encoding='utf-8')

# ── sitemap.xml ────────────────────────────────────────────────────────
def sitemap():
    viejo = (WEB / 'sitemap.xml').read_text(encoding='utf-8')
    locs = re.findall(r'<loc>([^<]+)</loc>', viejo)
    extra = ['condiciones-profesionales.html', 'envios-y-devoluciones.html', 'informacion-legal.html', 'seguridad.html',
             'sostenibilidad.html', 'empleo.html']
    for e in extra:
        u = f'{BASE}/{e}'
        if u not in locs and ((WEB / e).exists() or (WEB / (e + '.html')).exists()): locs.append(u)
    privadas = {f'{BASE}/{p}' for p in ['cliente.html', 'profesional.html', 'checkout.html', 'recuperar.html', 'bienvenida.html',
                                         'informe.html', 'escanear.html', 'modelo.html', 'madrid.html', 'malaga.html', 'miami.html',
                                         'ciudad-miami-beach.html']}
    filas = []
    for u in locs:
        if u in privadas: continue
        ruta = u.replace(BASE, '').lstrip('/')
        if ruta == '':
            pri, freq = '1.0', 'weekly'
        elif ruta.startswith('ciudad-'):
            slug = ruta[len('ciudad-'):-len('.html')]
            pri, freq = ('0.9' if slug in PLAN_SLUGS else '0.5'), 'monthly'
        elif ruta == 'novias.html':
            pri, freq = '0.95', 'monthly'
        elif ruta in ('para-profesionales.html', 'lista-espera.html'):
            pri, freq = '0.9', 'monthly'
        elif ruta in ('boutique.html', 'academia.html', 'masterclass.html', 'regalo.html', 'como-funciona.html', 'profesionales.html', 'empleo.html'):
            pri, freq = '0.8', 'monthly'
        else:
            pri, freq = '0.4', 'yearly'
        alt = ''
        if ruta == '':
            alt = ''.join(f'<xhtml:link rel="alternate" hreflang="{l}" href="{BASE}/{"" if l == "es" else "?lang=" + l}"/>' for l in LANGS)
            alt += f'<xhtml:link rel="alternate" hreflang="x-default" href="{BASE}/"/>'
        filas.append(f'<url><loc>{u}</loc><lastmod>{HOY}</lastmod><changefreq>{freq}</changefreq><priority>{pri}</priority>{alt}</url>')
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
           + '\n'.join(filas) + '\n</urlset>\n')
    (WEB / 'sitemap.xml').write_text(xml, encoding='utf-8')
    return len(filas)

# ── llms.txt (para buscadores y asistentes de IA) ──────────────────────
def llms():
    et = '\n'.join(f'- {e}: ' + ', '.join(n for n, _, _ in cs) + ('.' if not e.endswith('2029') else ' y más ciudades.') for e, cs in ETAPAS)
    un = '\n'.join(f'- **{n}.** {d}' for n, d in UNIDADES)
    cl = '\n'.join(f'- {x}' for x in CLIENTES)
    pr = '\n'.join(f'- {x}' for x in PROFESIONALES)
    texto = f"""# Babyloon

> Babyloon es un marketplace de belleza y bienestar de lujo a domicilio y en destino. Une a clientas exigentes con profesionales verificados de peluquería, maquillaje, uñas, barbería, estética, masajes y novias, allí donde estén: en casa, en el hotel, en una villa o en un evento. Lema: «La belleza, donde tú estés».

## Qué es
- Naturaleza: plataforma digital de doble cara (marketplace) con app para clientas (Babyloon), app para profesionales (Babyloon Pro) y web (https://babyloon.app) en 16 idiomas.
- Cómo funciona: la clienta pide un servicio en modalidad AHORA, HOY o PRIVÉE; los profesionales verificados cercanos pujan con su oferta (subasta inversa); la clienta elige y paga, y el pago queda retenido por Stripe hasta que se presta el servicio. Cada servicio tiene garantía.
- Fundador y CEO: Andrés Arias.

## Unidades de negocio
{un}

## Funciones y beneficios para clientas
{cl}

## Funciones y beneficios para profesionales
{pr}

## Lanzamiento por etapas
- Profesionales: registro abierto en todo el mundo desde febrero de 2027.
- Reservas, por ciudades:
{et}

## Escalabilidad
- Modelo digital y multiciudad: cada ciudad abre cuando alcanza suficiente densidad de profesionales, con precios y moneda locales.
- Una sola plataforma para varios países: 16 idiomas, varias monedas e impuestos por país.
- Varias fuentes de ingreso sobre la misma base de usuarios: comisión por servicio, membresías, boutique, academia, tarjetas regalo y servicios para empresas.

## Enlaces
- Web: https://babyloon.app/
- Cómo funciona: https://babyloon.app/como-funciona.html
- Para profesionales: https://babyloon.app/para-profesionales.html
- Novias y eventos: https://babyloon.app/novias.html
- Boutique: https://babyloon.app/boutique.html
- Academia: https://babyloon.app/academia.html
- Clases en vivo: https://babyloon.app/masterclass.html
- Tarjeta regalo: https://babyloon.app/regalo.html
- Contacto: https://babyloon.app/contacto.html
"""
    (WEB / 'llms.txt').write_text(texto, encoding='utf-8')

if __name__ == '__main__':
    aplicar_index()
    hechas = [n for n, d in PAGINAS.items() if meta_pagina(n, d)]
    privadas = [n for n in PRIVADAS if noindex(n)]
    robots()
    n = sitemap()
    llms()
    print('index ok · páginas:', hechas, '· noindex:', privadas, '· sitemap:', n, 'urls')
