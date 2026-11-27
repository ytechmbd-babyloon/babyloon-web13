/* Babyloon · descargas.babyloon.app
   Junta los trozos de cada APK y los entrega como un solo archivo.
   /babyloon.apk      → app de clientas
   /babyloon-pro.apk  → Babyloon Pro
   /version.json      → última versión de cada app (lo leen las apps para
                        avisar de una actualización; 27-nov-2026)
   Cualquier otra dirección → babyloon.app/#app */
const APKS = new Set(["babyloon.apk", "babyloon-pro.apk"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const nombre = url.pathname.replace(/^\/+/, "");
    if (nombre === "version.json" && ["GET", "HEAD"].includes(request.method)) {
      return versiones(url.origin + "/", env);
    }
    if (!APKS.has(nombre) || !["GET", "HEAD"].includes(request.method)) {
      return Response.redirect("https://babyloon.app/#app", 302);
    }

    const base = url.origin + "/";
    const indice = await env.ASSETS.fetch(new Request(base + nombre + ".json"));
    if (!indice.ok) return Response.redirect("https://babyloon.app/#app", 302);
    const { size, partes, version } = await indice.json();

    const cabeceras = {
      "Content-Type": "application/vnd.android.package-archive",
      "Content-Disposition": `attachment; filename="${nombre}"`,
      "Content-Length": String(size),
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
      "X-Babyloon-Version": version || "",
    };
    if (request.method === "HEAD") return new Response(null, { headers: cabeceras });

    // Los trozos se leen y se escriben uno detrás de otro, sin cargarlos en memoria.
    const { readable, writable } = new FixedLengthStream(size);
    (async () => {
      try {
        for (const parte of partes) {
          const r = await env.ASSETS.fetch(new Request(base + parte));
          if (!r.ok || !r.body) throw new Error("falta " + parte);
          await r.body.pipeTo(writable, { preventClose: true });
        }
        await writable.close();
      } catch (e) {
        await writable.abort(e);
      }
    })();
    return new Response(readable, { headers: cabeceras });
  },
};

// { cliente: { build, minimo, apk }, pro: { … } } a partir de los índices
// que escribe partir.js. Sin build (APK subido antes del 27-nov) → build 0:
// las apps no avisan de nada.
async function versiones(base, env) {
  const salida = {};
  for (const [app, apk] of [["cliente", "babyloon.apk"], ["pro", "babyloon-pro.apk"]]) {
    try {
      const r = await env.ASSETS.fetch(new Request(base + apk + ".json"));
      if (!r.ok) continue;
      const i = await r.json();
      salida[app] = {
        build: Number(i.build) || 0,
        minimo: Number(i.minimo) || 0,
        apk: "https://descargas.babyloon.app/" + apk,
      };
    } catch { /* sin índice: esa app no avisa */ }
  }
  return new Response(JSON.stringify(salida), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      "X-Robots-Tag": "noindex",
    },
  });
}
