/* ═══════════════════════════════════════════════════════════════
   Babyloon Web · descargar/abrir la app correcta (cliente o pro)
   con detección de iOS / Android y fallback a las stores.
   ▸ Reemplaza los IDs de APPS con los reales cuando publiques.
   ▸ Uso:
       data-app-open [data-role]      → abre la app (deep link)
       data-download="client|pro"     → descarga la app correcta según OS
       data-store="ios|android" data-app="client|pro" → enlace directo a store
   ═══════════════════════════════════════════════════════════════ */
(function(){
  const APPS = {
    client : { android:"com.babyloon.app", ios:"0000000000", scheme:"babyloon://open" },
    pro    : { android:"com.babyloon.pro", ios:"0000000000", scheme:"babyloonpro://open" }
  };
  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);

  function iosUrl(role){ return "https://apps.apple.com/app/id" + (APPS[role]||APPS.client).ios; }
  function androidUrl(role){ return "https://play.google.com/store/apps/details?id=" + (APPS[role]||APPS.client).android; }
  function storeUrl(role){ if(isIOS) return iosUrl(role); if(isAndroid) return androidUrl(role); return null; }

  function download(role){
    const url = storeUrl(role);
    if(url){ window.location.href = url; return; }        // móvil → store correcta
    window.open(androidUrl(role), "_blank");              // escritorio → Google Play en pestaña nueva
  }

  function openApp(role){
    role = role || "client";
    const store = storeUrl(role);
    if(!isIOS && !isAndroid){
      const app = document.getElementById("app");
      if(app) app.scrollIntoView({behavior:"smooth"});
      else if(store) window.open(store, "_blank");
      return;
    }
    let fb = setTimeout(function(){ if(store) window.location.href = store; }, 1200);
    document.addEventListener("visibilitychange", function once(){
      if(document.hidden) clearTimeout(fb);
      document.removeEventListener("visibilitychange", once);
    });
    try { window.location.href = (APPS[role]||APPS.client).scheme; }
    catch(_){ if(store) window.location.href = store; }
  }

  function wire(){
    document.querySelectorAll("[data-app-open]").forEach(function(el){
      el.addEventListener("click", function(e){ e.preventDefault(); openApp(el.getAttribute("data-role")||"client"); });
    });
    document.querySelectorAll("[data-download]").forEach(function(el){
      el.addEventListener("click", function(e){ e.preventDefault(); download(el.getAttribute("data-download")); });
    });
    document.querySelectorAll('[data-store="ios"]').forEach(function(a){
      a.href = iosUrl(a.getAttribute("data-app")||"client"); a.target = "_blank";
    });
    document.querySelectorAll('[data-store="android"]').forEach(function(a){
      a.href = androidUrl(a.getAttribute("data-app")||"client"); a.target = "_blank";
    });
  }

  window.BBLApp = { openApp:openApp, download:download, storeUrl:storeUrl, isIOS:isIOS, isAndroid:isAndroid, cfg:APPS };
  if(document.readyState !== "loading") wire();
  else document.addEventListener("DOMContentLoaded", wire);
})();
