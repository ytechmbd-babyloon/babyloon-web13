/* ═══════════════════════════════════════════════════════════════════════
   Babyloon · La boutique, visible para Google (27-nov-2026, tarea 26)

   La boutique de la web es una sola página que carga los productos con
   JavaScript: Google no los ve uno a uno. Esto le da a cada producto y a
   cada categoría una página propia, hecha en el servidor, indexable y en
   el idioma pedido, y publica:

     /boutique/p/<nombre>-<id8>      la página de cada producto
     /boutique/c/<categoría>         la página de cada categoría
     /sitemap-boutique.xml           todas, para los buscadores
     /feeds/merchant-<país>.xml      el catálogo para Google Merchant Center
                                     y Bing (pestaña Shopping), y para los
                                     catálogos de Instagram, Facebook y
                                     Pinterest (mismo formato)

   EL PRECIO es el mismo que enseña la boutique y cobra el checkout: la
   misma conversión que money.js (tipos de exchange_rates, 3 % de colchón y
   redondeo a ,99). Si no coincidieran, Google retiraría el producto.
   Cada feed va en la moneda de su país y enlaza con ?pais=XX, para que la
   página que ve Google tenga exactamente ese precio.

   LOS DATOS se leen con la clave pública, igual que la boutique (no hay
   nada que no se vea ya en babyloon.app/boutique.html), y se guardan
   30 minutos en la caché de Cloudflare.
   ═══════════════════════════════════════════════════════════════════════ */

let SUPABASE = 'https://qphatjblvojnfyghwmjy.supabase.co';
/** Solo para pruebas en local (wrangler dev): otra fuente de datos. */
export const fijarFuente = (u) => { if (u) SUPABASE = u; };
const BASE = 'https://babyloon.app';
const CACHE_SEG = 1800;

/* Países donde se vende y su moneda (paises_de_venta en la base). */
export const PAISES = {
  ES: { moneda: 'EUR', lang: 'es' }, FR: { moneda: 'EUR', lang: 'fr' }, PT: { moneda: 'EUR', lang: 'pt' },
  DE: { moneda: 'EUR', lang: 'de' }, IT: { moneda: 'EUR', lang: 'it' }, AT: { moneda: 'EUR', lang: 'de' },
  GB: { moneda: 'GBP', lang: 'en' }, US: { moneda: 'USD', lang: 'en' }, SE: { moneda: 'SEK', lang: 'sv' },
};
const LANGS_DESC = ['es', 'en', 'de', 'fr', 'pt', 'it', 'sv', 'ar', 'ja', 'ru', 'zh', 'ko'];
const SIMBOLO = { EUR: '€', USD: '$', GBP: '£', SEK: 'kr' };
const COLS = 'id,name,name_en,name_de,name_fr,name_pt,name_it,name_sv,name_ar,name_ja,name_ru,name_zh,name_ko,brand,category,price,original_price,currency,image_url,images,in_stock,is_featured,is_luxury,sku,paises_de_venta,shipping_days_min,shipping_days_max,updated_at,'
  + LANGS_DESC.map((l) => 'description_' + l).join(',') + ',description';

/* ── Textos de la página (16 idiomas; los que falten, en español) ─────── */
const TX = {
  es: { boutique: 'Boutique', inicio: 'Inicio', comprar: 'Comprar en la Boutique', disponible: 'Disponible', agotado: 'Agotado', envio: 'Envío en {a}–{b} días', relacionados: 'También te puede gustar', ver: 'Ver producto', productos: 'productos', sel: 'Selección Babyloon', titulo_c: '{c} · Boutique Babyloon', desc_c: '{c}: productos de belleza seleccionados por profesionales de Babyloon, con envío a domicilio.', iva: 'Precio con impuestos incluidos.', volver: 'Ver toda la Boutique' },
  en: { boutique: 'Boutique', inicio: 'Home', comprar: 'Buy in the Boutique', disponible: 'In stock', agotado: 'Sold out', envio: 'Delivery in {a}–{b} days', relacionados: 'You may also like', ver: 'View product', productos: 'products', sel: 'Babyloon Selection', titulo_c: '{c} · Babyloon Boutique', desc_c: '{c}: beauty products chosen by Babyloon professionals, delivered to your door.', iva: 'Price includes taxes.', volver: 'See the whole Boutique' },
  pt: { boutique: 'Boutique', inicio: 'Início', comprar: 'Comprar na Boutique', disponible: 'Disponível', agotado: 'Esgotado', envio: 'Entrega em {a}–{b} dias', relacionados: 'Também podes gostar', ver: 'Ver produto', productos: 'produtos', sel: 'Seleção Babyloon', titulo_c: '{c} · Boutique Babyloon', desc_c: '{c}: produtos de beleza escolhidos por profissionais Babyloon, com entrega ao domicílio.', iva: 'Preço com impostos incluídos.', volver: 'Ver toda a Boutique' },
  fr: { boutique: 'Boutique', inicio: 'Accueil', comprar: 'Acheter dans la Boutique', disponible: 'En stock', agotado: 'Épuisé', envio: 'Livraison en {a}–{b} jours', relacionados: 'Vous aimerez aussi', ver: 'Voir le produit', productos: 'produits', sel: 'Sélection Babyloon', titulo_c: '{c} · Boutique Babyloon', desc_c: '{c} : produits de beauté choisis par les professionnels Babyloon, livrés chez vous.', iva: 'Prix toutes taxes comprises.', volver: 'Voir toute la Boutique' },
  de: { boutique: 'Boutique', inicio: 'Start', comprar: 'In der Boutique kaufen', disponible: 'Verfügbar', agotado: 'Ausverkauft', envio: 'Lieferung in {a}–{b} Tagen', relacionados: 'Das könnte dir auch gefallen', ver: 'Produkt ansehen', productos: 'Produkte', sel: 'Babyloon Auswahl', titulo_c: '{c} · Babyloon Boutique', desc_c: '{c}: Beauty-Produkte, ausgewählt von Babyloon-Profis, nach Hause geliefert.', iva: 'Preis inkl. Steuern.', volver: 'Ganze Boutique ansehen' },
  it: { boutique: 'Boutique', inicio: 'Home', comprar: 'Acquista nella Boutique', disponible: 'Disponibile', agotado: 'Esaurito', envio: 'Consegna in {a}–{b} giorni', relacionados: 'Potrebbe piacerti anche', ver: 'Vedi prodotto', productos: 'prodotti', sel: 'Selezione Babyloon', titulo_c: '{c} · Boutique Babyloon', desc_c: '{c}: prodotti di bellezza scelti dai professionisti Babyloon, consegnati a casa.', iva: 'Prezzo tasse incluse.', volver: 'Vedi tutta la Boutique' },
  nl: { boutique: 'Boutique', inicio: 'Home', comprar: 'Kopen in de Boutique', disponible: 'Op voorraad', agotado: 'Uitverkocht', envio: 'Levering in {a}–{b} dagen', relacionados: 'Misschien vind je dit ook mooi', ver: 'Product bekijken', productos: 'producten', sel: 'Babyloon Selectie', titulo_c: '{c} · Babyloon Boutique', desc_c: '{c}: beautyproducten gekozen door Babyloon-professionals, aan huis geleverd.', iva: 'Prijs inclusief belastingen.', volver: 'Bekijk de hele Boutique' },
  pl: { boutique: 'Butik', inicio: 'Start', comprar: 'Kup w Butiku', disponible: 'Dostępny', agotado: 'Wyprzedany', envio: 'Dostawa w {a}–{b} dni', relacionados: 'Może ci się spodobać', ver: 'Zobacz produkt', productos: 'produktów', sel: 'Wybór Babyloon', titulo_c: '{c} · Butik Babyloon', desc_c: '{c}: kosmetyki wybrane przez profesjonalistów Babyloon, z dostawą do domu.', iva: 'Cena zawiera podatki.', volver: 'Zobacz cały Butik' },
  el: { boutique: 'Boutique', inicio: 'Αρχική', comprar: 'Αγορά στη Boutique', disponible: 'Διαθέσιμο', agotado: 'Εξαντλήθηκε', envio: 'Παράδοση σε {a}–{b} ημέρες', relacionados: 'Μπορεί να σας αρέσει', ver: 'Δείτε το προϊόν', productos: 'προϊόντα', sel: 'Επιλογή Babyloon', titulo_c: '{c} · Boutique Babyloon', desc_c: '{c}: προϊόντα ομορφιάς επιλεγμένα από επαγγελματίες της Babyloon, με παράδοση στο σπίτι.', iva: 'Η τιμή περιλαμβάνει φόρους.', volver: 'Όλη η Boutique' },
  hu: { boutique: 'Butik', inicio: 'Kezdőlap', comprar: 'Vásárlás a Butikban', disponible: 'Raktáron', agotado: 'Elfogyott', envio: 'Szállítás {a}–{b} nap alatt', relacionados: 'Ez is tetszhet', ver: 'Termék megtekintése', productos: 'termék', sel: 'Babyloon válogatás', titulo_c: '{c} · Babyloon Butik', desc_c: '{c}: a Babyloon szakemberei által válogatott szépségápolási termékek házhoz szállítással.', iva: 'Az ár tartalmazza az adókat.', volver: 'Az egész Butik' },
  ru: { boutique: 'Бутик', inicio: 'Главная', comprar: 'Купить в Бутике', disponible: 'В наличии', agotado: 'Нет в наличии', envio: 'Доставка за {a}–{b} дн.', relacionados: 'Вам может понравиться', ver: 'Смотреть товар', productos: 'товаров', sel: 'Выбор Babyloon', titulo_c: '{c} · Бутик Babyloon', desc_c: '{c}: косметика, отобранная специалистами Babyloon, с доставкой на дом.', iva: 'Цена включает налоги.', volver: 'Весь Бутик' },
  ar: { boutique: 'البوتيك', inicio: 'الرئيسية', comprar: 'اشترِ من البوتيك', disponible: 'متوفر', agotado: 'نفد', envio: 'التوصيل خلال {a}–{b} أيام', relacionados: 'قد يعجبك أيضًا', ver: 'عرض المنتج', productos: 'منتجات', sel: 'اختيار Babyloon', titulo_c: '{c} · بوتيك Babyloon', desc_c: '{c}: منتجات تجميل يختارها محترفو Babyloon مع التوصيل إلى المنزل.', iva: 'السعر شامل الضرائب.', volver: 'كل البوتيك' },
  zh: { boutique: '精品店', inicio: '首页', comprar: '在精品店购买', disponible: '有货', agotado: '售罄', envio: '{a}–{b} 天送达', relacionados: '你可能也喜欢', ver: '查看商品', productos: '件商品', sel: 'Babyloon 精选', titulo_c: '{c} · Babyloon 精品店', desc_c: '{c}：由 Babyloon 专业人士挑选的美容产品，送货上门。', iva: '价格已含税。', volver: '查看整个精品店' },
  ja: { boutique: 'ブティック', inicio: 'ホーム', comprar: 'ブティックで購入', disponible: '在庫あり', agotado: '売り切れ', envio: '{a}〜{b}日でお届け', relacionados: 'こちらもおすすめ', ver: '商品を見る', productos: '商品', sel: 'Babyloon セレクション', titulo_c: '{c} · Babyloon ブティック', desc_c: '{c}：Babyloon のプロが選んだ美容アイテムをご自宅へお届け。', iva: '税込価格です。', volver: 'ブティックをすべて見る' },
  ko: { boutique: '부티크', inicio: '홈', comprar: '부티크에서 구매', disponible: '재고 있음', agotado: '품절', envio: '{a}–{b}일 내 배송', relacionados: '이런 상품은 어떠세요', ver: '상품 보기', productos: '개 상품', sel: 'Babyloon 셀렉션', titulo_c: '{c} · Babyloon 부티크', desc_c: '{c}: Babyloon 전문가가 고른 뷰티 제품을 집까지 배송합니다.', iva: '세금 포함 가격입니다.', volver: '부티크 전체 보기' },
  sv: { boutique: 'Boutique', inicio: 'Hem', comprar: 'Köp i Boutiquen', disponible: 'I lager', agotado: 'Slutsåld', envio: 'Leverans inom {a}–{b} dagar', relacionados: 'Du kanske också gillar', ver: 'Visa produkt', productos: 'produkter', sel: 'Babyloon-urval', titulo_c: '{c} · Babyloon Boutique', desc_c: '{c}: skönhetsprodukter utvalda av Babyloons proffs, levererade hem.', iva: 'Priset inkluderar skatt.', volver: 'Se hela Boutiquen' },
};
const tx = (l) => TX[l] || TX.es;

/* ── Datos, con caché ─────────────────────────────────────────────────── */
async function leer(ctx, clave, ruta, publica) {
  const cache = caches.default;
  const k = `${BASE}/__boutique/${clave}`;
  try { const g = await cache.match(k); if (g) return await g.json(); } catch (_) { /* sin caché */ }
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 4000);
  try {
    const r = await fetch(`${SUPABASE}${ruta}`, { signal: ctrl.signal, headers: { apikey: publica, Authorization: `Bearer ${publica}`, Accept: 'application/json' } });
    if (!r.ok) return null;
    const j = await r.json();
    ctx.waitUntil(cache.put(k, new Response(JSON.stringify(j), { headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${CACHE_SEG}` } })));
    return j;
  } catch (_) { return null; } finally { clearTimeout(t); }
}
const productos = (ctx, k) => leer(ctx, 'productos.json',
  `/rest/v1/boutique_products?select=${COLS}&is_active=eq.true&image_url=not.is.null&order=is_luxury.desc.nullslast,is_featured.desc.nullslast,rank.asc.nullslast`, k);
const tipos = (ctx, k) => leer(ctx, 'tipos.json', '/rest/v1/exchange_rates?select=quote,rate&base=eq.EUR', k);
const categorias = (ctx, k) => leer(ctx, 'categorias.json', '/rest/v1/rpc/categorias_boutique', k);
// El envío de cada producto a un país, en su moneda, con la misma cuenta que
// cobra el carrito (envios_boutique → _envio_por_proveedor). No dice quién es
// el proveedor. Si la función aún no existe, el feed sale sin <g:shipping> y
// Merchant Center usa lo configurado en su cuenta.
const envios = (ctx, k, pais, moneda) => leer(ctx, `envios-${pais}.json`,
  `/rest/v1/rpc/envios_boutique?p_pais=${pais}&p_moneda=${moneda}`, k);

/* ── El precio: la misma cuenta que money.js ──────────────────────────── */
const BUFFER_PCT = 3;
function convertir(importe, de, a, fx) {
  if (importe == null) return null;
  const n = Number(importe);
  if (n === 0) return 0;
  de = String(de || 'USD').toUpperCase(); a = String(a || 'EUR').toUpperCase();
  if (de === a) return Math.round(n * 100) / 100;
  const rf = fx[de], rt = fx[a];
  if (!rf || !rt) return null;                 // sin tipo, no se inventa
  let v = (n / rf) * rt * (1 + BUFFER_PCT / 100);
  v = Math.ceil(v) - 0.01;
  return v < 0 ? 0 : Math.round(v * 100) / 100;
}
/** El precio de antes, solo si después de convertir sigue siendo mayor (si el redondeo los iguala, no hay rebaja). */
function rebaja(p, v, moneda, fx) {
  if (v == null || !p.original_price || Number(p.original_price) <= Number(p.price)) return null;
  const vo = convertir(p.original_price, p.currency, moneda, fx);
  return vo != null && vo > v ? vo : null;
}
const mapaFx = (filas) => { const m = { EUR: 1 }; for (const f of filas || []) m[f.quote] = Number(f.rate); return m; };
function formato(v, moneda, lang) {
  try { return new Intl.NumberFormat(lang === 'es' ? 'es-ES' : lang, { style: 'currency', currency: moneda }).format(v); }
  catch (_) { return `${v.toFixed(2)} ${SIMBOLO[moneda] || moneda}`; }
}

/* ── Nombres, textos y direcciones ────────────────────────────────────── */
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const quitarHtml = (s) => String(s ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
export const slug = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70) || 'producto';
export const rutaProducto = (p) => `/boutique/p/${slug(p.name)}-${String(p.id).slice(0, 8)}`;
function descripcion(p, l) { return quitarHtml(p['description_' + l] || (l !== 'es' && p.description_en) || p.description_es || p.description || ''); }
/** Un nombre en el idioma pedido: el suyo si lo hay; si no, la primera frase de la descripción en ese idioma. */
// El título sale de la primera frase de la descripción: sin «Nuestro…», «Este…»
// delante ni un verbo o una preposición colgando al final («…pieles oscuras está»).
const VACIAS = {
  es: { ini: ['nuestro', 'nuestra', 'nuestros', 'nuestras', 'este', 'esta', 'estos', 'estas', 'el', 'la', 'los', 'las', 'un', 'una'],
        fin: ['está', 'están', 'es', 'son', 'que', 'y', 'o', 'de', 'del', 'con', 'para', 'por', 'en', 'a', 'al', 'el', 'la', 'los', 'las', 'un', 'una', 'tu', 'su', 'sus', 'se', 'te', 'le', 'lo', 'muy', 'más', 'ha', 'han', 'hace', 'ofrece', 'proporciona', 'combina', 'contiene'] },
  pt: { ini: ['nosso', 'nossa', 'nossos', 'nossas', 'este', 'esta', 'o', 'a', 'os', 'as', 'um', 'uma'],
        fin: ['está', 'estão', 'é', 'são', 'que', 'e', 'ou', 'de', 'do', 'da', 'dos', 'das', 'com', 'para', 'por', 'em', 'no', 'na', 'o', 'a', 'os', 'as', 'um', 'uma', 'seu', 'sua', 'se', 'muito', 'mais', 'oferece', 'combina', 'contém'] },
  fr: { ini: ['notre', 'nos', 'ce', 'cet', 'cette', 'ces', 'le', 'la', 'les', 'un', 'une'],
        fin: ['est', 'sont', 'qui', 'que', 'et', 'ou', 'de', 'du', 'des', 'avec', 'pour', 'par', 'en', 'à', 'au', 'aux', 'le', 'la', 'les', 'un', 'une', 'votre', 'vos', 'son', 'sa', 'ses', 'se', 'très', 'plus', 'offre', 'combine', 'contient'] },
  it: { ini: ['il', 'nostro', 'la', 'nostra', 'questo', 'questa', 'lo', 'i', 'gli', 'le', 'un', 'una', 'uno'],
        fin: ['è', 'sono', 'che', 'e', 'o', 'di', 'del', 'della', 'dei', 'delle', 'con', 'per', 'in', 'a', 'al', 'alla', 'il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'una', 'tuo', 'tua', 'suo', 'sua', 'si', 'molto', 'più', 'offre', 'combina', 'contiene'] },
  de: { ini: ['unser', 'unsere', 'unseren', 'dieser', 'diese', 'dieses', 'der', 'die', 'das', 'ein', 'eine'],
        fin: ['ist', 'sind', 'wird', 'der', 'die', 'das', 'den', 'dem', 'des', 'und', 'oder', 'mit', 'für', 'von', 'zu', 'zum', 'zur', 'in', 'im', 'an', 'am', 'auf', 'ein', 'eine', 'einen', 'einem', 'ihr', 'ihre', 'sich', 'sehr', 'mehr', 'bietet', 'kombiniert', 'enthält'] },
  sv: { ini: ['vår', 'vårt', 'våra', 'denna', 'detta', 'dessa', 'en', 'ett'],
        fin: ['är', 'som', 'och', 'eller', 'av', 'med', 'för', 'till', 'i', 'på', 'en', 'ett', 'din', 'ditt', 'dina', 'sin', 'sitt', 'sig', 'mycket', 'mer', 'erbjuder', 'kombinerar', 'innehåller'] },
};
// Se corta en el primer verbo («Nuestro sérum de colágeno contiene glicerina» →
// «Sérum de colágeno») y se descartan las fichas técnicas («Descripción del
// producto», «Contenido neto»…): entonces vale más el nombre original.
const VERBOS = {
  es: /\s(contiene|contienen|est[áa]n?|es|son|proporciona|ofrece|combina|aporta|ayuda|cuenta|tiene|te|le|se|ha|han)\s/i,
  pt: /\s(cont[ée]m|cont[êe]m|est[áa]|est[ãa]o|[ée]|s[ãa]o|proporciona|oferece|combina|ajuda|tem|se)\s/i,
  fr: /\s(contient|contiennent|est|sont|offre|combine|apporte|aide|a|se|vous)\s/i,
  it: /\s(contiene|contengono|[èe]|sono|offre|combina|aiuta|ha|si)\s/i,
  de: /\s(enth[äa]lt|ist|sind|wird|bietet|kombiniert|hilft|hat|sorgt)\s/i,
  sv: /\s(inneh[åa]ller|[äa]r|erbjuder|kombinerar|hj[äa]lper|har)\s/i,
};
const FICHA = /^(\*|uso general|funci[óo]n|color\b|modelo|marca\b|tipo:|descrip|categor|contenido|especificaci|caracter[íi]sticas|nombre del|tipo de|d[ée]jese|material|tama[ñn]o|descri[çc][ãa]o|conte[úu]do|especifica[çc]|caract[ée]ristiques|contenu|nom du|type d|sp[ée]cification|descrizione|contenuto|specifiche|caratteristiche|nome del|beschreibung|inhalt|produktname|technische|beskrivning|inneh[åa]ll|produktnamn)/i;
function limpiarTitulo(f, l) {
  const v = VACIAS[l]; if (!v) return f;
  if (FICHA.test(f)) return '';
  const m = VERBOS[l] && VERBOS[l].exec(' ' + f + ' ');
  if (m && m.index > 0) f = f.slice(0, m.index).trim();
  const pal = f.split(/\s+/);
  while (pal.length > 1 && v.ini.includes(pal[0].toLowerCase())) pal.shift();
  while (pal.length > 1 && v.fin.includes(pal[pal.length - 1].toLowerCase())) pal.pop();
  return pal.join(' ');
}
function nombre(p, l) {
  if (p['name_' + l]) return p['name_' + l];
  const d = quitarHtml(p['description_' + l] || '');
  if (d && l !== 'en') {
    let f = d.split(/[.,;:!?。、，；]/)[0].trim();
    if (f.length > 70) f = f.slice(0, f.lastIndexOf(' ', 68) > 30 ? f.lastIndexOf(' ', 68) : 68).trim();
    f = limpiarTitulo(f, l);
    if (f.length >= 12) return f.charAt(0).toUpperCase() + f.slice(1);
  }
  return p.name;
}
const corta = (s, n) => (s.length > n ? s.slice(0, s.lastIndexOf(' ', n - 1) > n * 0.6 ? s.lastIndexOf(' ', n - 1) : n - 1).trim() + '…' : s);
const imagenes = (p) => [p.image_url, ...(Array.isArray(p.images) ? p.images : [])].filter((x, i, a) => x && /^https:\/\//.test(x) && a.indexOf(x) === i).slice(0, 10);
const vendeEn = (p, pais) => Array.isArray(p.paises_de_venta) && p.paises_de_venta.includes(pais);
function nombreCategoria(cats, cat, l) {
  const c = (cats || []).find((x) => x.categoria === cat);
  return c ? (c.nombres?.[l] || c.nombres?.en || c.nombres?.es || cat) : cat;
}
const slugCategoria = (cats, cat) => ((cats || []).find((x) => x.categoria === cat)?.slug) || slug(cat);

function elegirPais(url, request) {
  const q = (url.searchParams.get('pais') || '').toUpperCase();
  if (PAISES[q]) return q;
  const cf = (request.cf && request.cf.country) || '';
  return PAISES[cf] ? cf : 'ES';
}

/* ── Página común (cabecera, estilos de la casa) ──────────────────────── */
function pagina({ lang, titulo, desc, canonica, alternas, img, cuerpo, ld, tipoOg = 'website', extraHead = '' }) {
  const dir = lang === 'ar' ? ' dir="rtl"' : '';
  return `<!DOCTYPE html>
<html lang="${lang}"${dir}>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
<link rel="canonical" href="${esc(canonica)}" />
${alternas}
<meta name="theme-color" content="#0D0B0F" />
<meta property="og:type" content="${tipoOg}" />
<meta property="og:site_name" content="Babyloon" />
<meta property="og:title" content="${esc(titulo)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${esc(canonica)}" />
${img ? `<meta property="og:image" content="${esc(img)}" />\n<meta name="twitter:image" content="${esc(img)}" />` : ''}
<meta name="twitter:card" content="summary_large_image" />
${extraHead}
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="stylesheet" href="/fuentes.css" />
<style>
:root{--ink:#0D0B0F;--plum:#160D13;--plum2:#1F1320;--gold:#C8A96A;--gold2:#E8D4A0;--cream:#F9F5EE;--smoke:#B9AEA4;--good:#3DD68C}
*{box-sizing:border-box}body{margin:0;background:var(--ink);color:var(--cream);font-family:Jost,system-ui,sans-serif;line-height:1.55}
a{color:inherit}.wrap{max-width:1120px;margin:0 auto;padding:0 max(18px,env(safe-area-inset-left)) 64px max(18px,env(safe-area-inset-right))}
header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 0;border-bottom:1px solid rgba(255,255,255,.06);margin-bottom:22px}
.logo{font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;letter-spacing:2px;text-decoration:none}.logo b{color:var(--gold);font-weight:400}
.nav a{font-size:13px;color:var(--smoke);text-decoration:none;margin-left:16px}.nav a:hover{color:var(--gold)}
.migas{font-size:12px;color:var(--smoke);margin-bottom:18px}.migas a{text-decoration:none}.migas a:hover{color:var(--gold)}
h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;font-size:clamp(28px,4vw,42px);line-height:1.15;margin:.2em 0 .4em;text-wrap:balance}
.ficha{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px}@media(max-width:820px){.ficha{grid-template-columns:1fr;gap:22px}}
.galeria img.prin{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:18px;background:var(--plum)}
.minis{display:flex;gap:8px;margin-top:10px;overflow-x:auto}.minis img{width:68px;height:68px;object-fit:cover;border-radius:10px;opacity:.85;flex:none}
.marca{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--gold)}
.precio{font-size:28px;margin:10px 0 2px}.precio s{font-size:17px;color:var(--smoke);margin-right:10px}.iva{font-size:12px;color:var(--smoke)}
.estado{display:inline-block;font-size:12px;padding:3px 10px;border-radius:99px;border:1px solid rgba(61,214,140,.35);color:var(--good);margin:12px 0}
.estado.no{border-color:rgba(224,82,82,.35);color:#E05252}
.btn{display:inline-block;margin:14px 0 6px;padding:14px 26px;border-radius:12px;background:linear-gradient(90deg,#F0DCB4,#C8A96A);color:var(--ink);font-weight:600;text-decoration:none;letter-spacing:.5px}
.desc{color:#E8E0D5;font-size:15px;white-space:pre-line;margin-top:18px}.envio{font-size:13px;color:var(--smoke)}
h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;font-size:28px;margin:48px 0 16px}
.rejilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}
.tarjeta{background:var(--plum);border:1px solid rgba(255,255,255,.05);border-radius:16px;overflow:hidden;text-decoration:none;display:block}
.tarjeta img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block}.tarjeta div{padding:10px 12px 14px}
.tarjeta h3{font-size:14px;font-weight:400;margin:2px 0 6px;line-height:1.35}.tarjeta span{font-size:14px;color:var(--gold2)}
.intro{color:var(--smoke);max-width:65ch}
footer{margin-top:56px;padding-top:18px;border-top:1px solid rgba(255,255,255,.06);font-size:12px;color:var(--smoke)}
</style>
${ld ? `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>` : ''}
</head>
<body>
<div class="wrap">
<header><a class="logo" href="/${lang === 'es' ? '' : '?lang=' + lang}">Babyl<b>∞</b>n</a>
<nav class="nav"><a href="/boutique.html${lang === 'es' ? '' : '?lang=' + lang}">${esc(tx(lang).boutique)}</a></nav></header>
${cuerpo}
<footer>© Babyloon · <a href="/privacidad.html">Privacidad</a> · <a href="/envios-y-devoluciones.html">Envíos y devoluciones</a> · <a href="/contacto.html">Contacto</a></footer>
</div>
</body>
</html>`;
}

function tarjeta(p, lang, pais, fx, idq) {
  const v = convertir(p.price, p.currency, PAISES[pais].moneda, fx);
  return `<a class="tarjeta" href="${esc(rutaProducto(p) + idq)}"><img src="${esc(p.image_url)}" alt="${esc(nombre(p, lang))}" loading="lazy" />
<div><h3>${esc(corta(nombre(p, lang), 70))}</h3>${v != null ? `<span>${esc(formato(v, PAISES[pais].moneda, lang))}</span>` : ''}</div></a>`;
}

/* ── Las rutas ─────────────────────────────────────────────────────────── */
export async function boutique(request, url, ctx, clavePublica, idiomasWeb) {
  const ruta = url.pathname;
  const pedido = url.searchParams.get('lang');
  const lang = pedido && TX[pedido] ? pedido : 'es';
  const langsPag = (idiomasWeb && idiomasWeb.length ? idiomasWeb : Object.keys(TX)).filter((l) => TX[l]);

  if (ruta === '/sitemap-boutique.xml') return sitemapBoutique(ctx, clavePublica);
  const mf = /^\/feeds\/merchant-([a-z]{2})\.xml$/.exec(ruta);
  if (mf) return feed(ctx, clavePublica, mf[1].toUpperCase());

  const [ps, fxf, cats] = await Promise.all([productos(ctx, clavePublica), tipos(ctx, clavePublica), categorias(ctx, clavePublica)]);
  if (!Array.isArray(ps)) return null;                 // sin datos: que siga la web normal
  const fx = mapaFx(fxf);
  const pais = elegirPais(url, request);
  const moneda = PAISES[pais].moneda;
  const t = tx(lang);
  const idq = lang === 'es' ? '' : `?lang=${lang}`;
  const alt = (base) => langsPag.map((l) => `<link rel="alternate" hreflang="${l}" href="${esc(BASE + base + (l === 'es' ? '' : '?lang=' + l))}" />`).join('\n')
    + `\n<link rel="alternate" hreflang="x-default" href="${esc(BASE + base)}" />`;

  /* Producto */
  const mp = /^\/boutique\/p\/([a-z0-9-]+)-([0-9a-f]{8})$/.exec(ruta);
  if (mp) {
    const p = ps.find((x) => String(x.id).startsWith(mp[2]));
    if (!p) return null;
    const buena = rutaProducto(p);
    if (buena !== ruta) return Response.redirect(BASE + buena + url.search, 301);   // nombre cambiado: a la dirección buena
    const n = nombre(p, lang);
    const d = descripcion(p, lang);
    const imgs = imagenes(p);
    const vende = vendeEn(p, pais);
    const enStock = p.in_stock !== false && vende;
    const v = convertir(p.price, p.currency, moneda, fx);
    const vo = rebaja(p, v, moneda, fx);
    const catN = nombreCategoria(cats, p.category, lang);
    const catR = `/boutique/c/${slugCategoria(cats, p.category)}`;
    const marca = p.brand || t.sel;
    const comprar = `/boutique.html?p=${p.id}${lang === 'es' ? '' : '&lang=' + lang}`;
    const canon = BASE + buena + idq;
    const rel = ps.filter((x) => x.category === p.category && x.id !== p.id && vendeEn(x, pais)).slice(0, 8);
    const ld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'Product', name: n, description: corta(d, 4900), image: imgs, sku: p.sku || String(p.id).slice(0, 8),
        brand: { '@type': 'Brand', name: marca }, category: catN, url: canon,
        offers: v == null ? undefined : { '@type': 'Offer', url: canon, priceCurrency: moneda, price: v.toFixed(2),
          availability: enStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition', seller: { '@type': 'Organization', name: 'Babyloon', url: BASE } } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.inicio, item: BASE + '/' },
        { '@type': 'ListItem', position: 2, name: t.boutique, item: BASE + '/boutique.html' },
        { '@type': 'ListItem', position: 3, name: catN, item: BASE + catR },
        { '@type': 'ListItem', position: 4, name: n, item: canon }] }] };
    const envio = p.shipping_days_min && p.shipping_days_max ? t.envio.replace('{a}', p.shipping_days_min).replace('{b}', p.shipping_days_max) : '';
    const cuerpo = `<div class="migas"><a href="/${idq}">${esc(t.inicio)}</a> › <a href="/boutique.html${idq}">${esc(t.boutique)}</a> › <a href="${esc(catR + idq)}">${esc(catN)}</a></div>
<article class="ficha">
<div class="galeria"><img class="prin" src="${esc(imgs[0] || '')}" alt="${esc(n)}" />
${imgs.length > 1 ? `<div class="minis">${imgs.slice(1, 7).map((i) => `<img src="${esc(i)}" alt="${esc(n)}" loading="lazy" />`).join('')}</div>` : ''}</div>
<div><div class="marca">${esc(marca)}</div><h1>${esc(n)}</h1>
${v != null ? `<div class="precio">${vo ? `<s>${esc(formato(vo, moneda, lang))}</s>` : ''}${esc(formato(v, moneda, lang))}</div><div class="iva">${esc(t.iva)}</div>` : ''}
<span class="estado${enStock ? '' : ' no'}">${esc(enStock ? t.disponible : t.agotado)}</span>
${envio ? `<div class="envio">${esc(envio)}</div>` : ''}
<div><a class="btn" href="${esc(comprar)}">${esc(t.comprar)}</a></div>
<div class="desc">${esc(d)}</div></div>
</article>
${rel.length ? `<h2>${esc(t.relacionados)}</h2><div class="rejilla">${rel.map((x) => tarjeta(x, lang, pais, fx, idq)).join('')}</div>` : ''}`;
    return html(pagina({ lang, titulo: `${corta(n, 55)} · ${t.boutique} Babyloon`, desc: corta(d, 158), canonica: canon,
      alternas: alt(buena), img: imgs[0], cuerpo, ld, tipoOg: 'product',
      extraHead: v != null ? `<meta property="product:price:amount" content="${v.toFixed(2)}" />\n<meta property="product:price:currency" content="${moneda}" />` : '' }));
  }

  /* Categoría */
  const mc = /^\/boutique\/c\/([a-z0-9-]+)$/.exec(ruta);
  if (mc) {
    const c = (cats || []).find((x) => x.slug === mc[1]) || null;
    const cat = c ? c.categoria : ps.find((x) => slug(x.category) === mc[1])?.category;
    if (!cat) return null;
    const lista = ps.filter((x) => x.category === cat && vendeEn(x, pais));
    if (!lista.length) return null;
    const catN = nombreCategoria(cats, cat, lang);
    const base = `/boutique/c/${mc[1]}`;
    const canon = BASE + base + idq;
    const ld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'CollectionPage', name: catN, url: canon,
        mainEntity: { '@type': 'ItemList', itemListElement: lista.slice(0, 50).map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: BASE + rutaProducto(x) + idq, name: nombre(x, lang) })) } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.inicio, item: BASE + '/' },
        { '@type': 'ListItem', position: 2, name: t.boutique, item: BASE + '/boutique.html' },
        { '@type': 'ListItem', position: 3, name: catN, item: canon }] }] };
    const cuerpo = `<div class="migas"><a href="/${idq}">${esc(t.inicio)}</a> › <a href="/boutique.html${idq}">${esc(t.boutique)}</a></div>
<h1>${esc(catN)}</h1><p class="intro">${esc(t.desc_c.replace('{c}', catN))} · ${lista.length} ${esc(t.productos)}</p>
<div class="rejilla">${lista.map((x) => tarjeta(x, lang, pais, fx, idq)).join('')}</div>
<p><a class="btn" href="/boutique.html?cat=${encodeURIComponent(cat)}${lang === 'es' ? '' : '&lang=' + lang}">${esc(t.volver)}</a></p>`;
    return html(pagina({ lang, titulo: t.titulo_c.replace('{c}', catN), desc: corta(t.desc_c.replace('{c}', catN), 158), canonica: canon,
      alternas: alt(base), img: c?.foto || lista[0]?.image_url, cuerpo, ld }));
  }
  return null;
}

const html = (s) => new Response(s, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=600' } });
const xmlEsc = (s) => esc(s).replace(/'/g, '&apos;');

/* ── Sitemap de la boutique ────────────────────────────────────────────── */
async function sitemapBoutique(ctx, k) {
  const [ps, cats] = await Promise.all([productos(ctx, k), categorias(ctx, k)]);
  if (!Array.isArray(ps)) return null;
  const hoy = new Date().toISOString().slice(0, 10);
  const filas = [];
  const usadas = new Set();
  for (const p of ps) {
    if (!Array.isArray(p.paises_de_venta) || !p.paises_de_venta.length) continue;
    filas.push(`<url><loc>${xmlEsc(BASE + rutaProducto(p))}</loc><lastmod>${String(p.updated_at || hoy).slice(0, 10)}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority><image:image><image:loc>${xmlEsc(p.image_url)}</image:loc></image:image></url>`);
    usadas.add(p.category);
  }
  for (const cat of usadas) {
    filas.push(`<url><loc>${xmlEsc(`${BASE}/boutique/c/${slugCategoria(cats, cat)}`)}</loc><lastmod>${hoy}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`);
  }
  return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
    + filas.join('\n') + '\n</urlset>\n', { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=1800' } });
}

function envioXml(e, pais, moneda) {
  if (!e || e.envio == null || e.moneda !== moneda) return '';
  const t = Number.isInteger(e.dias_min) && Number.isInteger(e.dias_max)
    ? `<g:min_transit_time>${e.dias_min}</g:min_transit_time><g:max_transit_time>${e.dias_max}</g:max_transit_time>` : '';
  return `<g:shipping><g:country>${pais}</g:country><g:price>${Number(e.envio).toFixed(2)} ${moneda}</g:price>${t}</g:shipping>`;
}

/* ── Feed para Google Merchant Center / Bing / Meta / Pinterest ────────── */
async function feed(ctx, k, pais) {
  if (!PAISES[pais]) return null;
  const { moneda, lang } = PAISES[pais];
  const [ps, fxf, cats, env] = await Promise.all([productos(ctx, k), tipos(ctx, k), categorias(ctx, k), envios(ctx, k, pais, moneda)]);
  if (!Array.isArray(ps)) return null;
  const fx = mapaFx(fxf);
  const envioDe = new Map(Array.isArray(env) ? env.map((e) => [e.id, e]) : []);
  const items = [];
  for (const p of ps) {
    if (!vendeEn(p, pais)) continue;
    const v = convertir(p.price, p.currency, moneda, fx);
    if (v == null || v <= 0) continue;
    const vo = rebaja(p, v, moneda, fx);
    const imgs = imagenes(p);
    const link = `${BASE}${rutaProducto(p)}?pais=${pais}${lang === 'es' ? '' : '&lang=' + lang}`;
    const precio = vo ? `<g:price>${vo.toFixed(2)} ${moneda}</g:price><g:sale_price>${v.toFixed(2)} ${moneda}</g:sale_price>` : `<g:price>${v.toFixed(2)} ${moneda}</g:price>`;
    items.push(`<item><g:id>${xmlEsc(p.sku || String(p.id).slice(0, 8))}</g:id><g:title>${xmlEsc(corta(nombre(p, lang), 150))}</g:title>`
      + `<g:description>${xmlEsc(corta(descripcion(p, lang), 4900))}</g:description><g:link>${xmlEsc(link)}</g:link>`
      + `<g:image_link>${xmlEsc(imgs[0])}</g:image_link>${imgs.slice(1).map((i) => `<g:additional_image_link>${xmlEsc(i)}</g:additional_image_link>`).join('')}`
      + `<g:availability>${p.in_stock === false ? 'out_of_stock' : 'in_stock'}</g:availability>${precio}`
      + `<g:brand>${xmlEsc(p.brand || 'Babyloon Selection')}</g:brand><g:condition>new</g:condition><g:identifier_exists>no</g:identifier_exists>`
      + `<g:google_product_category>469</g:google_product_category><g:product_type>${xmlEsc(nombreCategoria(cats, p.category, lang))}</g:product_type>`
      + envioXml(envioDe.get(p.id), pais, moneda) + '</item>');
  }
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Babyloon Boutique · ${pais}</title>
<link>${BASE}/boutique.html</link>
<description>Babyloon Boutique — ${pais} (${moneda})</description>
${items.join('\n')}
</channel>
</rss>
`, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=1800' } });
}
