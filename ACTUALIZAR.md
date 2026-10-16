# Cómo subir babyloon.app

**Un comando.** Abre una terminal en `…\Desktop\BABYLOON` (la carpeta de
arriba, no `babyloon-web13`) y:

```
npx wrangler deploy
```

Tarda unos diez segundos. Ya está.

---

## Lo que tiene que decir

```
✨ Read 252 files from the assets directory …\babyloon-web13
🌀 Found N new or modified static assets to upload…
✨ Success! Uploaded N files (2.55 sec)
   Uploaded flat-thunder-70f8
   Current Version ID: …
```

**El número que importa es el de «Read»: unos 250** (16-oct, con las 50
páginas de ciudad). Si baja de 240, falta algo; si pasa de 300, se está
colando algo que no es web: hasta el 16-oct se publicaba `.git/` entero.
Sólo sube los que han cambiado, así que el segundo número será
pequeño o cero — eso es normal y es lo que hace que tarde nada.

Si dice `No targets deployed`, **no pasa nada**: es un aviso sobre las
URL de vista previa de `workers.dev`, que están apagadas a propósito.
`babyloon.app` recibe la versión nueva igual.

---

## Si te pide iniciar sesión

```
npx wrangler login
```

Se abre el navegador. **Comprueba que pone `Ytechmbd@gmail.com`** antes
de aceptar. Luego `npx wrangler whoami` tiene que devolver esa cuenta y
el id `0ebbeace8f18ae309cf3df5aeb0307f5`, que es el que está fijado en
`wrangler.toml`. Si no coincidiera, wrangler daría error en vez de subir
a la cuenta equivocada: está puesto justo para eso.

---

## Comprobar después de subir

En **incógnito** (Ctrl+Shift+N) sobre `babyloon.app`, con F12:

```js
typeof BBLPresencia      // "object"
BBLPresencia.modo()      // "audiencia", "completo" o "minimo"
```

Si dice `undefined`, la web no está midiendo y marketing se queda en
cero. Es el primer sitio donde mirar.

Y a ojo:

- La portada dice **cuántas ciudades** hay, sacadas de la base. Si dice
  tres, es que `index.html` es viejo.
- `babyloon.app/madrid.html` lleva a la página de Madrid nueva.
- La boutique enseña sus portadas y los productos del país que toca.
- Cambia el idioma del navegador (alemán, francés) y recarga.

En el panel, **Marketing → Visitantes**: en un par de minutos tiene que
aparecer al menos tu propia visita.

---

## ⚠️ Por qué ya no se usa el subidor del panel de Cloudflare

Hasta el 22 de septiembre de 2026 esto se hacía a mano: entrar en
Cloudflare, «Remove all», arrastrar los archivos. Dos cosas salieron mal
con ese método, y las dos costaron caro:

**1. Se colgaba.** 74 archivos y poco más de un mega, y el navegador se
quedaba dando vueltas varios minutos sin terminar. Con wrangler son dos
segundos y medio.

**2. Y lo peor: se dejaba archivos fuera sin avisar.** Al seleccionar
con Ctrl+A dentro de la carpeta, el navegador ignora las subcarpetas, así
que `img/` —las nueve fotos de la portada— nunca subía. Y como la lista
de «Archivos del sitio» que había en esta guía se escribió una vez y se
quedó vieja, tampoco subía `presencia.js`. Resultado: **la web estuvo
meses sin medir una sola visita**, y el panel de marketing en cero, sin
que nadie supiera por qué.

Con `npx wrangler deploy` no hay lista que mantener ni selección que
hacer: `wrangler.toml` apunta a la carpeta y sube lo que haya dentro.

---

## Los dos archivos de configuración

| | |
|---|---|
| `…\BABYLOON\wrangler.toml` | **Fuera** de `babyloon-web13`, a propósito: dentro se publicaría en `babyloon.app/wrangler.toml` con el id de cuenta a la vista |
| `…\babyloon-web13\.assetsignore` | Deja fuera las notas internas (este archivo y `LEEME.md`), el generador de las páginas de ciudad y sus plantillas y, desde el 16-oct, lo que no es web: `.git/`, `.claude/`, `.mcp.json` y `supabase/` |

El `wrangler.toml` **no lleva ninguna clave `route`**. Es deliberado: así
las rutas y el dominio los gobierna el panel de Cloudflare y un
despliegue nunca puede mover `babyloon.app`.

---

## Reglas que siguen valiendo

- ❌ Nunca subas una carpeta `functions/`: rompe el despliegue en Workers.
- ✅ `_headers` y `_redirects` empiezan por guion bajo y son
  imprescindibles. `_redirects` es lo que manda las URL viejas de ciudad
  (`madrid.html`, `malaga.html`, `miami.html`) a las nuevas; sin él,
  Google pierde lo que esas páginas tenían ganado.
- ⚠️ En `_redirects` **no se pone `301!`**. El signo de admiración es de
  Netlify; Cloudflare lo lee como código de estado 0 y **tumba el
  despliegue entero**. Tampoco hace falta: aquí los redirects se siguen
  siempre, exista o no un archivo con esa ruta.

---

## Qué hay en la carpeta

No hace falta comprobarlo archivo a archivo —se sube todo—, pero para
saber qué es cada cosa:

| | |
|---|---|
| `index.html` | portada. Las ciudades y su recuento los lee de la base |
| `ciudad-*.html` | 50 páginas de ciudad, generadas con `generar_ciudades.py`, que está en esta carpeta y no se publica |
| `paginas-de-ciudad.js` | la lista de las ciudades que tienen página: la portada solo enseña esas. La escribe el generador |
| `madrid/malaga/miami.html` | sólo red de seguridad: manda el `_redirects` |
| `boutique.html` · `checkout.html` | tienda y pago |
| `cliente.html` · `profesional.html` · `profesionales.html` | cuentas y escaparate |
| `lista-espera.html` | **la única puerta de captación de profesionales** |
| `academia.html` · `regalo.html` · `como-funciona.html` · `contacto.html` | contenido |
| `privacidad.html` · `terminos.html` | legales |
| `presencia.js` | **mide el tráfico.** Sin él, marketing está ciego |
| `cookies.js` | el banner de cookies. `presencia.js` le obedece |
| `money.js` | convierte los precios a la moneda de quien mira |
| `i18n.js` · `i18n-index.js` · `i18n-academia.js` | los once idiomas |
| `app-link.js` | enlaces a las apps, con detección de iOS/Android |
| `_headers` · `_redirects` · `robots.txt` · `sitemap.xml` | configuración y SEO |
| `favicon.svg` · `og-image.png` · `img/` | imágenes |
