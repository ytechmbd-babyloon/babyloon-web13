/* ═══════════════════════════════════════════════════════════════
   Babyloon · Modo Viaje — el globo en 3D
   ───────────────────────────────────────────────────────────────
   Andrés (26-nov): «algo que sea más real, más moderno… un logo de
   Babyloon viajando de la ciudad que se elija al destino».

   Qué es: un globo oscuro con los continentes en puntos dorados,
   las ciudades encendidas, un arco de luz entre origen y destino
   y la doble O recorriéndolo.

   DECISIONES
   · Sólo decorado. Los datos, los selectores y el texto siguen en
     viaje.js y en el HTML: si esto no carga, la sección funciona.
   · three.js se pide a cdn.jsdelivr.net (ya admitido en la CSP de
     _headers) y SÓLO cuando la sección se acerca a la pantalla:
     quien no baja hasta aquí no descarga nada.
   · Sin WebGL, o si falla la carga, `montar` devuelve null y
     viaje.js sigue con su dibujo plano de siempre.
   · Quien prefiere que nada se mueva ve el globo quieto, con el
     arco ya trazado.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
  var TIERRA_URL = 'globo-tierra.js?v=1';
  var LOGO_D = 'M60 30C60 16 48 8 34 8C18 8 8 18 8 30C8 42 18 52 34 52C48 52 60 44 60 30C60 16 72 8 86 8C102 8 112 18 112 30C112 42 102 52 86 52C72 52 60 44 60 30Z';

  function cargar(src) {
    return new Promise(function (ok, mal) {
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = ok; s.onerror = mal;
      document.head.appendChild(s);
    });
  }

  function hayWebGL() {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (_) { return false; }
  }

  /* montar(canvas, {quieto}) → Promise<api|null>
     api.ciudades(lista)  lista = [{lat, lng, vivo}]
     api.ruta(de, a)      de/a = {lat, lng} */
  function montar(canvas, op) {
    op = op || {};
    if (!canvas || !hayWebGL()) return Promise.resolve(null);
    var pasos = [];
    if (!window.THREE) pasos.push(cargar(THREE_URL));
    if (!window.BBL_TIERRA) pasos.push(cargar(TIERRA_URL));
    return Promise.all(pasos).then(function () {
      if (!window.THREE) return null;
      try { return crear(canvas, !!op.quieto); } catch (e) { return null; }
    }).catch(function () { return null; });
  }

  function crear(canvas, quieto) {
    var THREE = window.THREE, R = 1, DEG = Math.PI / 180;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 4.6);
    // el reloj y el pedir-cuadro van primero: ajustar() y ruta() los usan
    var visible = true, enMarcha = false, reloj = new THREE.Clock();
    function pedir() { if (!enMarcha) { enMarcha = true; reloj.getDelta(); requestAnimationFrame(cuadro); } }
    var inclina = new THREE.Group(); scene.add(inclina);
    var mundo = new THREE.Group(); inclina.add(mundo);

    function vec(lat, lng, r) {
      r = r || R;
      var ph = (90 - lat) * DEG, th = (Number(lng) + 180) * DEG;
      return new THREE.Vector3(-r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th));
    }

    var VS = 'varying vec3 vN;varying vec3 vP;void main(){vN=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);vP=mv.xyz;gl_Position=projectionMatrix*mv;}';

    // esfera, halo y borde
    mundo.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.995, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x120e13 })));
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.07, 64, 64), new THREE.ShaderMaterial({
      uniforms: { c: { value: new THREE.Color(0xC8A96A) } }, vertexShader: VS,
      fragmentShader: 'uniform vec3 c;varying vec3 vN;varying vec3 vP;void main(){float f=pow(clamp(1.0-abs(dot(normalize(-vP),vN)),0.,1.),4.5);gl_FragColor=vec4(c,f*0.32);}',
      side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })));
    mundo.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.001, 64, 64), new THREE.ShaderMaterial({
      uniforms: { c: { value: new THREE.Color(0xF3E0BC) } }, vertexShader: VS,
      fragmentShader: 'uniform vec3 c;varying vec3 vN;varying vec3 vP;void main(){float f=pow(1.0-max(dot(normalize(-vP),vN),0.),4.);gl_FragColor=vec4(c,f*0.22);}',
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })));

    // continentes
    var L = window.BBL_TIERRA || [];
    var pos = new Float32Array(L.length / 2 * 3), tw = new Float32Array(L.length / 2);
    for (var i = 0, j = 0; i < L.length; i += 2, j++) {
      var v = vec(L[i], L[i + 1], R * 1.003);
      pos[j * 3] = v.x; pos[j * 3 + 1] = v.y; pos[j * 3 + 2] = v.z; tw[j] = Math.random();
    }
    var lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    lg.setAttribute('tw', new THREE.BufferAttribute(tw, 1));
    var matTierra = new THREE.ShaderMaterial({
      uniforms: { t: { value: 0 }, px: { value: renderer.getPixelRatio() } },
      vertexShader: 'attribute float tw;uniform float t;uniform float px;varying float vA;varying float vF;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vec3 n=normalize((modelMatrix*vec4(position,0.)).xyz);vF=clamp(dot(n,normalize(cameraPosition)),0.,1.);vA=.55+.45*sin(t*1.2+tw*6.28);gl_PointSize=px*2.9*(3.2/-mv.z);gl_Position=projectionMatrix*mv;}',
      fragmentShader: 'varying float vA;varying float vF;void main(){vec2 d=gl_PointCoord-.5;if(dot(d,d)>.25)discard;vec3 col=mix(vec3(.61,.50,.31),vec3(.95,.88,.74),vF*.6);gl_FragColor=vec4(col,(.30+.70*vF)*vA);}',
      transparent: true, depthWrite: false });
    mundo.add(new THREE.Points(lg, matTierra));

    function textura(dibuja, s) {
      s = s || 128;
      var c = document.createElement('canvas'); c.width = c.height = s;
      dibuja(c.getContext('2d'), s);
      return new THREE.CanvasTexture(c);
    }
    var brillo = textura(function (g, s) {
      var r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      r.addColorStop(0, 'rgba(255,240,210,1)'); r.addColorStop(.18, 'rgba(243,224,188,.9)');
      r.addColorStop(.45, 'rgba(200,169,106,.25)'); r.addColorStop(1, 'rgba(200,169,106,0)');
      g.fillStyle = r; g.fillRect(0, 0, s, s);
    });
    var logo = textura(function (g, s) {
      g.beginPath(); g.arc(s / 2, s / 2, s * .46, 0, 6.283); g.fillStyle = '#0D0B0F'; g.fill();
      var gr = g.createLinearGradient(0, 0, s, s);
      gr.addColorStop(0, '#8E723F'); gr.addColorStop(.42, '#F3E0BC'); gr.addColorStop(.72, '#C9A96E'); gr.addColorStop(1, '#9C8050');
      g.lineWidth = s * .022; g.strokeStyle = gr; g.stroke();
      g.save(); g.translate(s * .2, s * .36); g.scale(s * .6 / 120, s * .6 / 120);
      g.lineWidth = 7; g.lineCap = 'round'; g.strokeStyle = gr; g.stroke(new Path2D(LOGO_D)); g.restore();
    }, 256);
    function chispa(tam) {
      var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: brillo, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      s.scale.setScalar(tam); return s;
    }

    // ciudades
    var luces = [];
    function ciudades(lista) {
      luces.forEach(function (s) { mundo.remove(s); s.material.dispose(); });
      luces = (lista || []).map(function (c, k) {
        var s = chispa(c.vivo ? .07 : .035);
        s.position.copy(vec(c.lat, c.lng, R * 1.01));
        s.userData = { base: c.vivo ? .07 : .035, fase: k * 1.7 };
        if (!c.vivo) s.material.opacity = .55;
        mundo.add(s); return s;
      });
    }

    // ruta
    var SEGS = 160, RAD = 6, curva = null, tubo = null, estela = null, tRuta = 1;
    var matTubo = new THREE.MeshBasicMaterial({ color: 0xF3E0BC, transparent: true, opacity: .85, blending: THREE.AdditiveBlending, depthWrite: false });
    var matEstela = new THREE.MeshBasicMaterial({ color: 0xC8A96A, transparent: true, opacity: .22, blending: THREE.AdditiveBlending, depthWrite: false });
    var viajero = new THREE.Sprite(new THREE.SpriteMaterial({ map: logo, transparent: true, depthTest: false }));
    viajero.scale.setScalar(.17); viajero.renderOrder = 10; viajero.visible = false; mundo.add(viajero);
    var halo = chispa(.42); halo.visible = false; mundo.add(halo);
    var marcaA = chispa(.18), marcaB = chispa(.001); marcaA.visible = marcaB.visible = false;
    mundo.add(marcaA, marcaB);
    var objetivo = { x: .3, y: 0 };

    function ruta(de, a) {
      if (!de || !a) return;
      if (tubo) { mundo.remove(tubo); tubo.geometry.dispose(); }
      if (estela) { mundo.remove(estela); estela.geometry.dispose(); }
      var A = vec(de.lat, de.lng).normalize(), B = vec(a.lat, a.lng).normalize();
      var ang = A.angleTo(B), alto = .08 + .42 * (ang / Math.PI), sn = Math.sin(ang), pts = [];
      for (var k = 0; k <= 64; k++) {
        var t = k / 64, p;
        if (sn > 1e-4) p = A.clone().multiplyScalar(Math.sin((1 - t) * ang) / sn).add(B.clone().multiplyScalar(Math.sin(t * ang) / sn));
        else p = A.clone();
        p.multiplyScalar(R * (1.01 + alto * Math.sin(Math.PI * t))); pts.push(p);
      }
      curva = new THREE.CatmullRomCurve3(pts);
      tubo = new THREE.Mesh(new THREE.TubeGeometry(curva, SEGS, .0055, RAD, false), matTubo);
      estela = new THREE.Mesh(new THREE.TubeGeometry(curva, SEGS, .016, RAD, false), matEstela);
      mundo.add(estela, tubo);
      marcaA.position.copy(vec(de.lat, de.lng, R * 1.012)); marcaB.position.copy(vec(a.lat, a.lng, R * 1.012));
      marcaA.visible = marcaB.visible = viajero.visible = halo.visible = true;
      tRuta = quieto ? 1 : 0;
      var mid = A.clone().add(B).normalize();
      if (mid.lengthSq() < 1e-6) mid = A.clone();
      var lat = Math.asin(mid.y) / DEG, lng = Math.atan2(mid.z, -mid.x) / DEG - 180;
      objetivo.y = -(lng + 90) * DEG;
      objetivo.x = Math.max(-.5, Math.min(.9, (lat - 15) * DEG));
      while (objetivo.y - mundo.rotation.y > Math.PI) objetivo.y -= 2 * Math.PI;
      while (objetivo.y - mundo.rotation.y < -Math.PI) objetivo.y += 2 * Math.PI;
      if (quieto) { mundo.rotation.y = objetivo.y; inclina.rotation.x = objetivo.x; }
      pedir();
    }

    function ajustar() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w / h < 1 ? 4.6 / Math.max(.62, w / h) * .92 : 4.6;
      camera.updateProjectionMatrix(); pedir();
    }
    addEventListener('resize', ajustar, { passive: true }); ajustar();

    // girar con el dedo o el ratón
    var arrastra = false, px0 = 0, py0 = 0;
    canvas.addEventListener('pointerdown', function (e) {
      arrastra = true; px0 = e.clientX; py0 = e.clientY;
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      if (api.alTocar) api.alTocar();
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!arrastra) return;
      objetivo.y += (e.clientX - px0) * .006;
      objetivo.x = Math.max(-.6, Math.min(1, objetivo.x + (e.clientY - py0) * .004));
      px0 = e.clientX; py0 = e.clientY; pedir();
    });
    addEventListener('pointerup', function () { arrastra = false; });

    // sólo se anima mientras se ve
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting; if (visible) pedir();
      }, { rootMargin: '120px' }).observe(canvas);
    }

    mundo.rotation.y = objetivo.y; inclina.rotation.x = objetivo.x;
    function cuadro() {
      enMarcha = false;
      var dt = Math.min(.05, reloj.getDelta()), t = reloj.elapsedTime;
      matTierra.uniforms.t.value = quieto ? 0 : t;
      var k = quieto ? 1 : 1 - Math.pow(.0016, dt);
      mundo.rotation.y += (objetivo.y - mundo.rotation.y) * k;
      inclina.rotation.x += (objetivo.x - inclina.rotation.x) * k;
      if (!arrastra && !quieto) objetivo.y += dt * .012;
      for (var i = 0; i < luces.length; i++) {
        var s = luces[i]; s.scale.setScalar(s.userData.base * (quieto ? 1 : 1 + .35 * Math.sin(t * 2 + s.userData.fase)));
      }
      if (curva) {
        tRuta = Math.min(1, tRuta + dt / 2.6);
        var e = tRuta < .5 ? 4 * tRuta * tRuta * tRuta : 1 - Math.pow(-2 * tRuta + 2, 3) / 2;
        var n = Math.floor(e * SEGS) * RAD * 6;
        tubo.geometry.setDrawRange(0, n); estela.geometry.setDrawRange(0, n);
        var P = curva.getPointAt(Math.max(.001, e));
        viajero.position.copy(P); halo.position.copy(P);
        halo.material.opacity = quieto ? .7 : .55 + .25 * Math.sin(t * 4);
        marcaB.scale.setScalar(e > .97 ? .18 * (quieto ? 1 : 1 + .25 * Math.sin(t * 3)) : .001);
        marcaA.scale.setScalar(.18 * (quieto ? 1 : 1 + .15 * Math.sin(t * 3 + 1)));
      }
      renderer.render(scene, camera);
      if (visible && !quieto) pedir();
    }
    pedir();

    var api = { ciudades: function (l) { ciudades(l); pedir(); }, ruta: ruta, alTocar: null };
    return api;
  }

  window.BBLGlobo = { montar: montar };
})();
