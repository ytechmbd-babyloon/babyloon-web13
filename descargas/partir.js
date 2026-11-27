// Parte cada APK en trozos de 20 MB dentro de public/ y escribe su índice.
// Uso: node partir.js --build 2 C:\ruta\babyloon.apk C:\ruta\babyloon-pro.apk
//   --build N   el número que va detrás del «+» en version: del pubspec.yaml
//               (1.0.0+2 → 2). Con él, las apps avisan de que hay versión nueva.
//   --minimo N  (opcional) las apps con un número menor no podrán decir
//               «Ahora no»: para correcciones urgentes.
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const TROZO = 20 * 1024 * 1024;
const destino = path.join(__dirname, "public");
fs.mkdirSync(destino, { recursive: true });

const args = process.argv.slice(2), archivos = [];
let build = 0, minimo = 0;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--build") build = parseInt(args[++i], 10);
  else if (args[i] === "--minimo") minimo = parseInt(args[++i], 10);
  else archivos.push(args[i]);
}
if (!archivos.length || !(build > 0) || build >= 1000) {
  console.log("Uso: node partir.js --build 2 babyloon.apk babyloon-pro.apk");
  console.log("     (--build = el número detrás del «+» en version: del pubspec.yaml, de 1 a 999)");
  process.exit(1);
}
if (minimo > build) { console.log("✗ --minimo no puede ser mayor que --build"); process.exit(1); }

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
    JSON.stringify({ size: datos.length, version, build, minimo, partes }, null, 2));
  console.log(`✓ ${nombre}: ${(datos.length / 1048576).toFixed(1)} MB en ${partes.length} trozos (build ${build}${minimo ? ", mínimo " + minimo : ""})`);
}
