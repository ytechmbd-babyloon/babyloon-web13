/* ═══════════════════════════════════════════════════════════════════════
   Babyloon · SEO desde el panel (27-nov-2026)

   Programa de Cloudflare delante de babyloon.app. Pone en cada página el
   SEO PUBLICADO desde el panel de administración (Marketing → SEO): título,
   descripción, palabras clave, robots, canónica, hreflang, etiquetas para
   redes y, en la portada, los datos estructurados. Y genera robots.txt,
   sitemap.xml y llms.txt.

   Lo publicado se lee de Supabase con la clave PÚBLICA de la web (la misma
   que usan las páginas) llamando a `seo_publicado()`, y se guarda 5 minutos
   en la caché de Cloudflare: Supabase recibe, como mucho, una consulta cada
   5 minutos por centro de datos, no una por visita.

   SI ALGO FALLA (Supabase no contesta, no hay versión publicada, la página
   no está en la lista), la página se sirve EXACTAMENTE como está en la
   carpeta: con el SEO de siempre. Este programa nunca deja la web caída.

   Solo se ejecuta para las rutas que dice `run_worker_first` en
   wrangler.jsonc (la portada, las .html y los tres archivos de texto): las
   imágenes, los estilos y los scripts van directos, sin pasar por aquí.
   ═══════════════════════════════════════════════════════════════════════ */

import { boutique, fijarFuente } from './boutique.js';

const SUPABASE = 'https://qphatjblvojnfyghwmjy.supabase.co';
// Clave pública (rol anon), la misma que llevan las páginas de la web.
const CLAVE_PUBLICA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaGF0amJsdm9qbmZ5Z2h3bWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTUyNTksImV4cCI6MjA5NDMzMTI1OX0.fd_maoPBLGKAGHqOcsmcAKWbTl_a0962TpV57f7u0ik';
const CACHE_SEG = 300;
const CLAVE_CACHE = 'https://babyloon.app/__seo/publicado.json';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') return env.ASSETS.fetch(request);

    const ruta = url.pathname;

    // 27-nov · La boutique, visible para Google (páginas de producto y de
    // categoría, su sitemap y los feeds de Shopping). Ver boutique.js.
    if (ruta.startsWith('/boutique/p/') || ruta.startsWith('/boutique/c/') || ruta === '/sitemap-boutique.xml' || ruta.startsWith('/feeds/merchant-')) {
      try {
        fijarFuente(env && env.BOUTIQUE_FUENTE);
        const seo = await publicado(env, ctx);
        if (!seo || !seo.datos.boutique || seo.datos.boutique.activa !== false) {
          const r = await boutique(request, url, ctx, CLAVE_PUBLICA, seo ? seo.datos.idiomas : null);
          if (r) return r;
        }
      } catch (e) { console.error('seo · boutique', ruta, e); }
      return env.ASSETS.fetch(request);
    }

    if (ruta === '/robots.txt' || ruta === '/sitemap.xml' || ruta === '/llms.txt') {
      const seo = await publicado(env, ctx);
      if (!seo) return env.ASSETS.fetch(request);
      try {
        const [cuerpo, tipo] = ruta === '/robots.txt' ? [robots(seo.datos), 'text/plain']
          : ruta === '/sitemap.xml' ? [sitemap(seo), 'application/xml'] : [llms(seo.datos), 'text/plain'];
        return new Response(request.method === 'HEAD' ? null : cuerpo, {
          headers: { 'Content-Type': `${tipo}; charset=utf-8`, 'Cache-Control': 'public, max-age=300',
                     'X-Babyloon-SEO': String(seo.numero) },
        });
      } catch (e) {
        console.error('seo · archivo', ruta, e);
        return env.ASSETS.fetch(request);
      }
    }

    const res = await env.ASSETS.fetch(request);
    if (res.status !== 200 || !(res.headers.get('Content-Type') || '').includes('text/html')) return res;

    const seo = await publicado(env, ctx);
    if (!seo) return res;
    const d = seo.datos;
    const clave = ruta === '/' || ruta === '/index.html' ? '/' : ruta.endsWith('.html') ? ruta : ruta.replace(/\/$/, '') + '.html';
    const pagina = (d.paginas || []).find((p) => p.ruta === clave);
    if (!pagina) return res;

    const pedido = url.searchParams.get('lang');
    const lang = pedido && (d.idiomas || []).includes(pedido) ? pedido : 'es';
    let bloque;
    try { bloque = cabecera(d, pagina, lang); } catch (e) { console.error('seo · cabecera', clave, e); return res; }

    const quitar = { element(el) { el.remove(); } };
    let rw = new HTMLRewriter()
      .on('title', quitar)
      .on('meta[name="description"]', quitar)
      .on('meta[name="keywords"]', quitar)
      .on('meta[name="robots"]', quitar)
      .on('meta[property^="og:"]', quitar)
      .on('meta[name^="twitter:"]', quitar)
      .on('link[rel="canonical"]', quitar)
      .on('link[rel="alternate"][hreflang]', quitar)
      .on('head', { element(el) { el.append(bloque, { html: true }); } });
    if (pagina.portada) {
      rw = rw.on('script[type="application/ld+json"]', quitar)
             .on('meta[name="theme-color"]', quitar)
             .on('meta[name="application-name"]', quitar)
             .on('meta[name="apple-mobile-web-app-title"]', quitar);
    }
    if (pedido && lang === pedido) rw = rw.on('html', { element(el) { el.setAttribute('lang', lang); if (lang === 'ar') el.setAttribute('dir', 'rtl'); } });

    const salida = rw.transform(res);
    const h = new Headers(salida.headers);
    h.set('X-Babyloon-SEO', String(seo.numero));
    return new Response(salida.body, { status: salida.status, headers: h });
  },
};

/* ── Lo publicado, con caché de 5 minutos ─────────────────────────────── */
async function publicado(env, ctx) {
  const cache = caches.default;
  try {
    const guardado = await cache.match(CLAVE_CACHE);
    if (guardado) { const j = await guardado.json(); return valido(j) ? j : null; }
  } catch (_) { /* sin caché: se pregunta */ }

  const fuente = (env && env.SEO_FUENTE) || `${SUPABASE}/rest/v1/rpc/seo_publicado`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 2500);
  try {
    const r = await fetch(fuente, {
      method: 'POST', signal: ctrl.signal,
      headers: { apikey: CLAVE_PUBLICA, Authorization: `Bearer ${CLAVE_PUBLICA}`, 'Content-Type': 'application/json' },
      body: '{}',
    });
    if (!r.ok) return null;
    const j = await r.json();
    if (!valido(j)) return null;
    ctx.waitUntil(cache.put(CLAVE_CACHE, new Response(JSON.stringify(j), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${CACHE_SEG}` },
    })));
    return j;
  } catch (_) {
    return null;
  } finally {
    clearTimeout(t);
  }
}
const valido = (j) => !!(j && j.datos && Array.isArray(j.datos.paginas) && Array.isArray(j.datos.idiomas) && j.datos.base);

/* ── Utilidades ───────────────────────────────────────────────────────── */
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const xml = esc;
/** El texto en ese idioma; si no lo hay, en español. */
const t = (m, l) => (m && (m[l] || m.es)) || '';
const tl = (m, l) => (m && ((m[l] && m[l].length ? m[l] : null) || m.es)) || [];

function canonica(d, pagina, lang) {
  if (pagina.portada) return `${d.base}/${lang === 'es' ? '' : '?lang=' + lang}`;
  return d.base + pagina.ruta;
}

/* ── La cabecera de cada página ───────────────────────────────────────── */
function cabecera(d, pagina, lang) {
  const titulo = t(pagina.titulo, lang) || 'Babyloon';
  const desc = t(pagina.descripcion, lang);
  const kw = t(pagina.palabras, lang);
  const url = canonica(d, pagina, lang);
  const img = d.base + (d.marca.imagen || '/og-image.png');
  const lema = t(d.marca.lema, lang);
  const loc = (d.og_locales || {})[lang] || 'es_ES';
  const L = [];
  L.push('<!-- SEO · publicado desde el panel de administración -->');
  L.push(`<title>${esc(titulo)}</title>`);
  if (desc) L.push(`<meta name="description" content="${esc(desc)}" />`);
  if (kw) L.push(`<meta name="keywords" content="${esc(kw)}" />`);
  L.push(`<meta name="robots" content="${pagina.indexar ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow'}" />`);
  if (pagina.indexar) {
    L.push(`<link rel="canonical" href="${esc(url)}" />`);
    if (pagina.portada) {
      for (const l of d.idiomas) L.push(`<link rel="alternate" hreflang="${l}" href="${esc(`${d.base}/${l === 'es' ? '' : '?lang=' + l}`)}" />`);
      L.push(`<link rel="alternate" hreflang="x-default" href="${esc(d.base + '/')}" />`);
    }
  }
  if (pagina.portada) {
    L.push(`<meta name="theme-color" content="${esc(d.marca.color_tema || '#0D0B0F')}" />`);
    L.push(`<meta name="application-name" content="${esc(d.marca.nombre)}" />`);
    L.push(`<meta name="apple-mobile-web-app-title" content="${esc(d.marca.nombre)}" />`);
  }
  L.push('<meta property="og:type" content="website" />');
  L.push(`<meta property="og:site_name" content="${esc(d.marca.nombre)}" />`);
  L.push(`<meta property="og:title" content="${esc(titulo)}" />`);
  if (desc) L.push(`<meta property="og:description" content="${esc(desc)}" />`);
  L.push(`<meta property="og:url" content="${esc(url)}" />`);
  L.push(`<meta property="og:image" content="${esc(img)}" />`);
  if (lema) L.push(`<meta property="og:image:alt" content="${esc(d.marca.nombre + ' · ' + lema.replace(/\.$/, ''))}" />`);
  L.push(`<meta property="og:locale" content="${esc(loc)}" />`);
  if (pagina.portada) for (const l of d.idiomas) if (l !== lang) L.push(`<meta property="og:locale:alternate" content="${esc((d.og_locales || {})[l] || l)}" />`);
  L.push('<meta name="twitter:card" content="summary_large_image" />');
  L.push(`<meta name="twitter:title" content="${esc(titulo)}" />`);
  if (desc) L.push(`<meta name="twitter:description" content="${esc(desc)}" />`);
  L.push(`<meta name="twitter:image" content="${esc(img)}" />`);
  if (pagina.portada) {
    // `<` dentro del JSON se escribe como < para que nada cierre el <script>.
    L.push('<script type="application/ld+json">' + JSON.stringify(grafo(d, lang)).replace(/</g, '\\u003c') + '</script>');
  }
  return '\n' + L.join('\n') + '\n';
}

/* ── Datos estructurados (schema.org), en el idioma pedido ────────────── */
function grafo(d, lang) {
  const B = d.base;
  const tieneCiudad = new Set(d.paginas.map((p) => p.ruta));
  const ciudad = (c) => {
    const o = { '@type': 'City', name: c.nombre, address: { '@type': 'PostalAddress', addressCountry: c.pais } };
    if (c.slug && tieneCiudad.has(`/ciudad-${c.slug}.html`)) o.url = `${B}/ciudad-${c.slug}.html`;
    return o;
  };
  const area = (d.etapas || []).slice(0, 2).flatMap((e) => e.ciudades.map(ciudad));
  const benef = (k) => (d.beneficios[k] || []).map((b) => t(b, lang)).filter(Boolean).join(' ');
  const app = (a, extra, url) => ({
    '@type': 'MobileApplication', name: a.nombre, operatingSystem: 'Android, iOS, Web',
    applicationCategory: 'LifestyleApplication', description: [t(a.descripcion, lang), extra].filter(Boolean).join(' '),
    url, publisher: { '@id': B + '/#organization' }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  });
  const g = [
    { '@type': 'Organization', '@id': B + '/#organization', name: d.marca.nombre, url: B,
      logo: B + d.marca.imagen, image: B + d.marca.imagen, slogan: t(d.marca.lema, lang),
      description: t(d.marca.descripcion, lang),
      founder: { '@type': 'Person', name: d.marca.fundador, jobTitle: t(d.marca.cargo_fundador, lang) },
      knowsLanguage: d.idiomas, areaServed: area },
    { '@type': 'WebSite', '@id': B + '/#website', name: d.marca.nombre, url: B, inLanguage: d.idiomas,
      publisher: { '@id': B + '/#organization' },
      potentialAction: { '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: B + '/profesionales.html?postal={search_term_string}' },
        'query-input': 'required name=search_term_string' } },
    { '@type': 'Service', '@id': B + '/#servicio', name: t(d.servicio.nombre, lang), serviceType: tl(d.servicio.tipos, lang),
      provider: { '@id': B + '/#organization' }, areaServed: area,
      hasOfferCatalog: { '@type': 'OfferCatalog', name: d.marca.nombre,
        itemListElement: (d.unidades || []).map((u) => ({ '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: t(u.nombre, lang), description: t(u.descripcion, lang) } })) } },
  ];
  if (d.apps && d.apps.cliente) g.push(app(d.apps.cliente, benef('clientas'), B + d.apps.cliente.url));
  if (d.apps && d.apps.pro) g.push(app(d.apps.pro, benef('profesionales'), B + d.apps.pro.url));
  if ((d.etapas || []).length) g.push({ '@type': 'ItemList', '@id': B + '/#ciudades',
    itemListElement: d.etapas.map((e, i) => ({ '@type': 'ListItem', position: i + 1,
      name: `${t(e.nombre, lang)}: ${e.ciudades.map((c) => c.nombre).join(', ')}` })) });
  if ((d.faq || []).length) g.push({ '@type': 'FAQPage', '@id': B + '/#faq',
    mainEntity: d.faq.filter((f) => t(f.pregunta, lang)).map((f) => ({ '@type': 'Question', name: t(f.pregunta, lang),
      acceptedAnswer: { '@type': 'Answer', text: t(f.respuesta, lang) } })) });
  return { '@context': 'https://schema.org', '@graph': g };
}

/* ── robots.txt ───────────────────────────────────────────────────────── */
function robots(d) {
  const L = ['# Babyloon · robots.txt · publicado desde el panel de administración',
    '# Las páginas privadas NO se bloquean aquí a propósito: llevan <meta name="robots" content="noindex">',
    '# y el buscador tiene que poder leerla para sacarlas del índice.', ''];
  for (const g of d.bots || []) {
    if (!g.agentes || !g.agentes.length) continue;
    L.push(`# ${g.grupo}`);
    for (const a of g.agentes) L.push(`User-agent: ${a}`);
    L.push(g.permitir ? 'Allow: /' : 'Disallow: /', '');
  }
  L.push(`Sitemap: ${d.base}/sitemap.xml`);
  if (!d.boutique || d.boutique.activa !== false) L.push(`Sitemap: ${d.base}/sitemap-boutique.xml`);
  L.push('');
  return L.join('\n');
}

/* ── sitemap.xml ──────────────────────────────────────────────────────── */
function sitemap(seo) {
  const d = seo.datos;
  const hoy = String(seo.publicada_en || new Date().toISOString()).slice(0, 10);
  const filas = d.paginas.filter((p) => p.indexar && p.en_sitemap).map((p) => {
    const loc = p.portada ? d.base + '/' : d.base + p.ruta;
    let alt = '';
    if (p.portada) {
      alt = d.idiomas.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${xml(`${d.base}/${l === 'es' ? '' : '?lang=' + l}`)}"/>`).join('')
        + `<xhtml:link rel="alternate" hreflang="x-default" href="${xml(d.base + '/')}"/>`;
    }
    const pri = Math.max(0, Math.min(1, Number(p.prioridad) || 0.5));
    return `<url><loc>${xml(loc)}</loc><lastmod>${hoy}</lastmod><changefreq>${xml(p.frecuencia || 'monthly')}</changefreq><priority>${pri.toFixed(pri * 100 % 10 ? 2 : 1)}</priority>${alt}</url>`;
  });
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    + filas.join('\n') + '\n</urlset>\n';
}

/* ── llms.txt (para buscadores y asistentes de IA) ────────────────────── */
function llms(d) {
  const es = (m) => t(m, 'es');
  const etapas = (d.etapas || []).map((e, i, a) => `- ${es(e.nombre)}: ${e.ciudades.map((c) => c.nombre).join(', ')}${i === a.length - 1 ? ' y más ciudades.' : '.'}`).join('\n');
  const enlaces = d.paginas.filter((p) => p.indexar && p.en_sitemap && !p.ruta.startsWith('/ciudad-'))
    .slice(0, 20).map((p) => `- ${es(p.titulo).split(/[·|]/)[0].trim() || p.ruta}: ${p.portada ? d.base + '/' : d.base + p.ruta}`).join('\n');
  return `# ${d.marca.nombre}

> ${es(d.llms.resumen)} Lema: «${es(d.marca.lema).replace(/\.$/, '')}».

## Qué es
- Naturaleza: plataforma digital de doble cara (marketplace) con app para clientas (${d.apps.cliente ? d.apps.cliente.nombre : 'Babyloon'}), app para profesionales (${d.apps.pro ? d.apps.pro.nombre : 'Babyloon Pro'}) y web (${d.base}) en ${d.idiomas.length} idiomas.
- Fundador: ${d.marca.fundador} (${es(d.marca.cargo_fundador)}).

## Unidades de negocio
${(d.unidades || []).map((u) => `- **${es(u.nombre)}.** ${es(u.descripcion)}`).join('\n')}

## Funciones y beneficios para clientas
${(d.beneficios.clientas || []).map((b) => `- ${es(b)}`).join('\n')}

## Funciones y beneficios para profesionales
${(d.beneficios.profesionales || []).map((b) => `- ${es(b)}`).join('\n')}

## Lanzamiento por etapas
- Profesionales: ${es(d.llms.registro_profesionales)}
- Reservas, por ciudades:
${etapas}

## Escalabilidad
${(d.llms.escalabilidad || []).map((x) => `- ${es(x)}`).join('\n')}

## Preguntas frecuentes
${(d.faq || []).map((f) => `- **${es(f.pregunta)}** ${es(f.respuesta)}`).join('\n')}

## Enlaces
${enlaces}
`;
}
