# SEO desde el panel · programa de Cloudflare (27-nov-2026)

`worker.js` va delante de babyloon.app y pone en cada página el SEO **publicado** desde el panel
(Marketing → SEO). Si Supabase no contesta o no hay versión publicada, la web se sirve tal cual
está en la carpeta. Detalle en la cabecera de `worker.js`.

## Instalar (una sola vez)
En el `wrangler.jsonc` de la carpeta `BABYLOON` (la que publica flat-thunder-70f8) hay que añadir,
sin quitar nada de lo que ya tiene:

```jsonc
  "main": "babyloon-web13/_seo/worker.js",
  "compatibility_date": "2026-11-01",
```

y, dentro de `"assets"`, el nombre del enlace y las rutas que pasan por el programa (las páginas
y los tres archivos de texto; imágenes, estilos y scripts van directos):

```jsonc
    "binding": "ASSETS",
    "run_worker_first": [
      "/*",
      "!/*.js",
      "!/*.css",
      "!/*.map",
      "!/*.json",
      "!/*.webmanifest",
      "!/*.png",
      "!/*.jpg",
      "!/*.jpeg",
      "!/*.webp",
      "!/*.avif",
      "!/*.gif",
      "!/*.svg",
      "!/*.ico",
      "!/*.woff",
      "!/*.woff2",
      "!/*.ttf",
      "!/*.otf",
      "!/*.mp4",
      "!/*.webm",
      "!/*.mp3",
      "!/*.pdf",
      "!/*.wasm",
      "!/img/*",
      "!/fuentes/*",
      "!/bimi/*"
    ]
```

Después, `npx wrangler deploy` desde `BABYLOON`, como siempre.

## Comprobar
- `curl -I https://babyloon.app/` debe traer la cabecera `X-Babyloon-SEO: <número de versión>`.
- `https://babyloon.app/robots.txt` empieza por «publicado desde el panel de administración».

## Deshacer
Quitar `main` y `run_worker_first` del `wrangler.jsonc` y volver a publicar: la web vuelve a servir
solo los archivos.
