/* Babyloon · descargas.babyloon.app
   Junta los trozos de cada APK y los entrega como un solo archivo.
   /babyloon.apk      → app de clientas
   /babyloon-pro.apk  → Babyloon Pro
   Cualquier otra dirección → babyloon.app/#app */
const APKS = new Set(["babyloon.apk", "babyloon-pro.apk"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const nombre = url.pathname.replace(/^\/+/, "");
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
