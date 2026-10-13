/* ═══════════════════════════════════════════════════════════════════════
   zip-ligero.js · Babyloon · empaqueta archivos en un .zip en el navegador
   (informe contable para la gestoría: libros en CSV, informe y recibos).

   Sin compresión ("stored"): los recibos ya son JPG/PDF comprimidos y el
   formato resultante lo abre cualquier sistema. Nombres en UTF-8 (bit 11),
   así que «Gastos_3T_año.csv» llega tal cual. Escrito a mano porque la CSP
   de la web sólo admite código propio.
   ═══════════════════════════════════════════════════════════════════════ */
(function (raiz) {
  'use strict';
  var TABLA = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; }
    return t;
  })();
  function crc32(b) { var c = 0xFFFFFFFF; for (var i = 0; i < b.length; i++) c = TABLA[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  function dosFecha(d) {
    return { t: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
             f: ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate() };
  }
  function crear() {
    var archivos = [];
    return {
      // contenido: string (se guarda en UTF-8) o Uint8Array
      agregar: function (nombre, contenido) {
        var datos = typeof contenido === 'string' ? new TextEncoder().encode(contenido) : contenido;
        archivos.push({ nombre: new TextEncoder().encode(nombre), datos: datos, crc: crc32(datos) });
      },
      generar: function () {
        var partes = [], central = [], desp = 0, f = dosFecha(new Date());
        archivos.forEach(function (a) {
          var h = new DataView(new ArrayBuffer(30));
          h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true);
          h.setUint16(10, f.t, true); h.setUint16(12, f.f, true); h.setUint32(14, a.crc, true);
          h.setUint32(18, a.datos.length, true); h.setUint32(22, a.datos.length, true);
          h.setUint16(26, a.nombre.length, true); h.setUint16(28, 0, true);
          partes.push(new Uint8Array(h.buffer), a.nombre, a.datos);
          var c = new DataView(new ArrayBuffer(46));
          c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true);
          c.setUint16(10, 0, true); c.setUint16(12, f.t, true); c.setUint16(14, f.f, true); c.setUint32(16, a.crc, true);
          c.setUint32(20, a.datos.length, true); c.setUint32(24, a.datos.length, true); c.setUint16(28, a.nombre.length, true);
          c.setUint32(42, desp, true);
          central.push(new Uint8Array(c.buffer), a.nombre);
          desp += 30 + a.nombre.length + a.datos.length;
        });
        var tamCentral = central.reduce(function (s, x) { return s + x.length; }, 0);
        var e = new DataView(new ArrayBuffer(22));
        e.setUint32(0, 0x06054b50, true); e.setUint16(8, archivos.length, true); e.setUint16(10, archivos.length, true);
        e.setUint32(12, tamCentral, true); e.setUint32(16, desp, true);
        return new Blob(partes.concat(central, [new Uint8Array(e.buffer)]), { type: 'application/zip' });
      }
    };
  }
  var api = { crear: crear, crc32: crc32 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else raiz.ZipLigero = api;
})(typeof window !== 'undefined' ? window : this);
