# Babyloon · Web

Web integral de Babyloon (landing + boutique + academia + paneles + checkout),
conectada al **mismo Supabase** que las apps. 11 idiomas. Diseño de lujo minimalista.

---

## 1. Contenido

| Archivo | Qué es |
|---|---|
| `index.html` | Landing: hero, concepto, cómo funciona, mundos, boutique, testimonios, la app, FAQ, acceso (login/registro con puerta Cliente/Profesional) |
| `boutique.html` | Boutique completa: catálogo real, filtros, buscador, carrito, banner |
| `checkout.html` | Pago real con **Stripe** (Payment Element) + registro del pedido |
| `cliente.html` | Panel del cliente: servicios, pedidos, garantías, cartera, favoritos, perfil |
| `profesional.html` | Panel del profesional: servicios, cartera, inventario, academy, certificados, perfil |
| `academia.html` | Academia: tutoriales (autocuidado + profesional), reproductor, likes y comentarios |
| `privacidad.html` · `terminos.html` · `contacto.html` | Páginas legales + contacto |
| `i18n.js` · `i18n-index.js` · `i18n-academia.js` | Sistema de 11 idiomas (es, en, pt, de, fr, sv, ja, ar, zh, ko, ru) |
| `app-link.js` | Abre la app (deep link) con fallback a las stores |

---

## 2. Configurar (solo 2 cosas)

### a) Clave de Stripe — `checkout.html`
Busca esta línea y pon tu **clave publicable** (la de `stripe_service.dart`):
```js
const STRIPE_PK="pk_live_TU_CLAVE_PUBLICABLE_DE_STRIPE";
```
Es pública (va en el navegador). Sin ella, el pago no se monta.

### b) IDs de las apps — `app-link.js`
```js
androidPackage : "com.babyloon.app",   // tu applicationId de Android
iosAppStoreId  : "0000000000",          // tu ID de App Store (cuando publiques)
deepLinkScheme : "babyloon://open"      // tu esquema de deep link (opcional)
```

> Supabase ya está conectado (URL + clave anon pública incrustadas). No hay que tocar nada más.

---

## 3. Desplegar

La web es estática (HTML/CSS/JS). Cualquiera de estas opciones:

**Netlify (lo más fácil):**
1. Entra en app.netlify.com → "Add new site" → "Deploy manually".
2. Arrastra **toda la carpeta** `babyloon-web/`.
3. Listo: tendrás una URL pública. Conecta tu dominio en "Domain settings".

**Vercel:** vercel.com → "Add New" → sube la carpeta (framework: "Other").

**Tu propio hosting:** sube todos los archivos a la raíz (o a una subcarpeta) por FTP.

> **Importante:** la web debe abrirse por **http(s)** (dominio o localhost), no por
> `file://`. Si la abres con doble clic desde el disco, el navegador bloquea la
> conexión a Supabase y la boutique/academia saldrán vacías. Al desplegar funciona.

---

## 4. Ajustes recomendados en Supabase

- **Auth → URL Configuration:** añade la URL de tu web (p.ej. `https://babyloon.app`)
  a *Site URL* y *Redirect URLs*, para que la confirmación de correo redirija bien.
- **Auth → Email:** si quieres que el registro entre directo sin confirmar correo,
  desactiva "Confirm email" (o deja la confirmación y el usuario entra tras confirmar).

---

## 5. Ya aplicado en tu base de datos

Estas migraciones ya se ejecutaron (no hay que repetirlas):
- `academy_web_public_catalog` — vistas públicas de catálogo de la academia (sin exponer URLs de vídeo de pago).
- `academy_social_insert_policies` — permite dar like y comentar a usuarios autenticados (solo lo suyo).

---

## 6. Notas

- **Boutique:** carga los 495 productos reales al desplegar.
- **Academia:** los vídeos gratis se reproducen en la web; los premium llevan a la app.
- **Idiomas:** el selector (arriba a la derecha) cambia toda la web y recuerda la elección.
- **Solicitar servicio:** abre la app (o la store si no está instalada); en escritorio lleva a la sección de descarga.

© 2026 Babyloon
