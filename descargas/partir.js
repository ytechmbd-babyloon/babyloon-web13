// Parte cada APK en trozos de 20 MB dentro de public/ y escribe su índice.
// Uso: node partir.js C:\ruta\babyloon.apk C:\ruta\babyloon-pro.apk
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const TROZO = 20 * 1024 * 1024;
const destino = path.join(__dirname, "public");
fs.mkdirSync(destino, { recursive: true });
const archivos = process.argv.slice(2);
if (!archivos.length) { console.log("Uso: node partir.js babyloon.apk babyloon-pro.apk"); process.exit(1); }
for (const ruta of archivos) {
  const nombre = path.basename(ruta).toLowerCase();
  if (!["babyloon.apk", "babyloon-pro.apk"].includes(nombre)) {
    console.log("✗ " + nombre + ": tiene que llamarse babyloon.apk o babyloon-pro.apk"); process.exit(1);
  }
  // Borra los trozos de la versión anterior de este APK
  for (const f of fs.readdirSync(destino)) if (f.startsWith(nombre + ".")) fs.unlinkSync(path.join(destino, f));
  const datos = fs.readFileSync(ruta);
  const version = crypto.createHash("sha256").update(datos).digest("hex").slice(0, 12);
  const partes = [];
  for (let i = 0, n = 1; i < datos.length; i += TROZO, n++) {
    const parte = `${nombre}.${version}.parte${n}`;
    fs.writeFileSync(path.join(destino, parte), datos.subarray(i, i + TROZO));
    partes.push(parte);
  }
  fs.writeFileSync(path.join(destino, nombre + ".json"),
    JSON.stringify({ size: datos.length, version, partes }, null, 2));
  console.log(`✓ ${nombre}: ${(datos.length / 1048576).toFixed(1)} MB en ${partes.length} trozos (versión ${version})`);
}
