/* ═══════════════════════════════════════════════════════════════════
   cookies.js · bloque 17.A8

   El aviso de antes estaba bien hecho por fuera y no servía de nada por
   dentro:

     · La decisión se guardaba en `localStorage` y NADIE LA LEÍA. Pulsar
       «Rechazar» no cambiaba una sola petición.
     · No caducaba. Un «sí» de hace dos años seguía valiendo.
     · No quedaba registro en ninguna parte: si alguien reclama, no hay
       nada que enseñar.
     · Once idiomas de dieciséis. Los otros cinco veían español.
     · Y no había forma de aceptar una cosa y no la otra, que es lo que
       la norma llama granularidad.

   Ahora:
     · Dos categorías de verdad: lo necesario (siempre) y la medición.
     · Mientras no se decide, NO SE MIDE Y NO SE ESCRIBE NADA en el
       dispositivo. El estado «todavía no ha contestado» no es un sí.
     · Caduca —12 meses, lo dice la base— y se vuelve a preguntar si
       cambia la versión del aviso.
     · Cada decisión se registra en el servidor con su versión, sin IP
       ni huella: montar un rastreador para demostrar que no se rastrea
       sería una broma cara.

   Quien quiera saber si puede medir pregunta:  BBLCookies.permite('medicion')
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  var T = {
    "es": {
      "titulo": "Tus cookies",
      "texto": "Usamos lo imprescindible para que la web funcione. Para saber cómo se usa y mejorarla, necesitamos tu permiso.",
      "acc": "Aceptar todo",
      "rej": "Sólo lo necesario",
      "cfg": "Elegir",
      "guardar": "Guardar mi elección",
      "volver": "Volver",
      "c_nec": "Necesarias",
      "c_nec_d": "Mantienen tu sesión, tu idioma y tu carrito. Sin ellas la web no funciona.",
      "c_med": "Medición",
      "c_med_d": "Nos dicen qué páginas se visitan y desde dónde se llega, para mejorar la web. Sin esto no medimos nada.",
      "siempre": "Siempre activas",
      "mas": "Más información",
      "cerrar": "Cerrar"
    },
    "en": {
      "titulo": "Your cookies",
      "texto": "We use only what the site needs to work. To learn how it is used and improve it, we need your permission.",
      "acc": "Accept all",
      "rej": "Only what's needed",
      "cfg": "Choose",
      "guardar": "Save my choice",
      "volver": "Back",
      "c_nec": "Necessary",
      "c_nec_d": "They keep your session, your language and your cart. Without them the site does not work.",
      "c_med": "Measurement",
      "c_med_d": "They tell us which pages are visited and where people arrive from, so we can improve. Without this we measure nothing.",
      "siempre": "Always on",
      "mas": "Learn more",
      "cerrar": "Close"
    },
    "pt": {
      "titulo": "As tuas cookies",
      "texto": "Usamos só o indispensável para o site funcionar. Para saber como é usado e melhorá-lo, precisamos da tua permissão.",
      "acc": "Aceitar tudo",
      "rej": "Só o necessário",
      "cfg": "Escolher",
      "guardar": "Guardar a minha escolha",
      "volver": "Voltar",
      "c_nec": "Necessárias",
      "c_nec_d": "Mantêm a tua sessão, o teu idioma e o teu carrinho. Sem elas o site não funciona.",
      "c_med": "Medição",
      "c_med_d": "Dizem-nos que páginas são visitadas e de onde se chega, para melhorar. Sem isto não medimos nada.",
      "siempre": "Sempre ativas",
      "mas": "Saber mais",
      "cerrar": "Fechar"
    },
    "fr": {
      "titulo": "Vos cookies",
      "texto": "Nous utilisons le strict nécessaire au fonctionnement du site. Pour savoir comment il est utilisé et l'améliorer, il nous faut votre accord.",
      "acc": "Tout accepter",
      "rej": "Seulement le nécessaire",
      "cfg": "Choisir",
      "guardar": "Enregistrer mon choix",
      "volver": "Retour",
      "c_nec": "Nécessaires",
      "c_nec_d": "Elles conservent votre session, votre langue et votre panier. Sans elles le site ne fonctionne pas.",
      "c_med": "Mesure",
      "c_med_d": "Elles nous indiquent quelles pages sont visitées et d'où viennent les visiteurs, pour améliorer le site. Sans cela nous ne mesurons rien.",
      "siempre": "Toujours actives",
      "mas": "En savoir plus",
      "cerrar": "Fermer"
    },
    "de": {
      "titulo": "Ihre Cookies",
      "texto": "Wir nutzen nur das Nötigste, damit die Website funktioniert. Um zu erfahren, wie sie genutzt wird, und sie zu verbessern, brauchen wir Ihre Zustimmung.",
      "acc": "Alle annehmen",
      "rej": "Nur das Nötige",
      "cfg": "Auswählen",
      "guardar": "Auswahl speichern",
      "volver": "Zurück",
      "c_nec": "Notwendig",
      "c_nec_d": "Sie halten Ihre Sitzung, Ihre Sprache und Ihren Warenkorb. Ohne sie funktioniert die Website nicht.",
      "c_med": "Messung",
      "c_med_d": "Sie sagen uns, welche Seiten besucht werden und woher die Besucher kommen. Ohne dies messen wir nichts.",
      "siempre": "Immer aktiv",
      "mas": "Mehr erfahren",
      "cerrar": "Schließen"
    },
    "it": {
      "titulo": "I tuoi cookie",
      "texto": "Usiamo solo l'indispensabile perché il sito funzioni. Per sapere come viene usato e migliorarlo, ci serve il tuo permesso.",
      "acc": "Accetta tutto",
      "rej": "Solo il necessario",
      "cfg": "Scegli",
      "guardar": "Salva la mia scelta",
      "volver": "Indietro",
      "c_nec": "Necessari",
      "c_nec_d": "Mantengono la tua sessione, la tua lingua e il tuo carrello. Senza di essi il sito non funziona.",
      "c_med": "Misurazione",
      "c_med_d": "Ci dicono quali pagine vengono visitate e da dove si arriva, per migliorare. Senza questo non misuriamo nulla.",
      "siempre": "Sempre attivi",
      "mas": "Maggiori informazioni",
      "cerrar": "Chiudi"
    },
    "nl": {
      "titulo": "Je cookies",
      "texto": "We gebruiken alleen wat de site nodig heeft om te werken. Om te weten hoe hij gebruikt wordt en hem te verbeteren, hebben we je toestemming nodig.",
      "acc": "Alles accepteren",
      "rej": "Alleen het nodige",
      "cfg": "Kiezen",
      "guardar": "Mijn keuze bewaren",
      "volver": "Terug",
      "c_nec": "Noodzakelijk",
      "c_nec_d": "Ze bewaren je sessie, je taal en je winkelwagen. Zonder deze werkt de site niet.",
      "c_med": "Meting",
      "c_med_d": "Ze vertellen ons welke pagina's bezocht worden en waar bezoekers vandaan komen. Zonder dit meten we niets.",
      "siempre": "Altijd aan",
      "mas": "Meer informatie",
      "cerrar": "Sluiten"
    },
    "pl": {
      "titulo": "Twoje pliki cookie",
      "texto": "Używamy tylko tego, co niezbędne, aby strona działała. Aby wiedzieć, jak jest używana, i ją ulepszać, potrzebujemy Twojej zgody.",
      "acc": "Akceptuj wszystko",
      "rej": "Tylko niezbędne",
      "cfg": "Wybierz",
      "guardar": "Zapisz mój wybór",
      "volver": "Wróć",
      "c_nec": "Niezbędne",
      "c_nec_d": "Utrzymują Twoją sesję, język i koszyk. Bez nich strona nie działa.",
      "c_med": "Pomiary",
      "c_med_d": "Mówią nam, które strony są odwiedzane i skąd przychodzą użytkownicy. Bez tego niczego nie mierzymy.",
      "siempre": "Zawsze włączone",
      "mas": "Więcej informacji",
      "cerrar": "Zamknij"
    },
    "el": {
      "titulo": "Τα cookies σου",
      "texto": "Χρησιμοποιούμε μόνο ό,τι χρειάζεται για να λειτουργεί ο ιστότοπος. Για να μάθουμε πώς χρησιμοποιείται και να τον βελτιώσουμε, χρειαζόμαστε την άδειά σου.",
      "acc": "Αποδοχή όλων",
      "rej": "Μόνο τα απαραίτητα",
      "cfg": "Επιλογή",
      "guardar": "Αποθήκευση επιλογής",
      "volver": "Πίσω",
      "c_nec": "Απαραίτητα",
      "c_nec_d": "Κρατούν τη συνεδρία, τη γλώσσα και το καλάθι σου. Χωρίς αυτά ο ιστότοπος δεν λειτουργεί.",
      "c_med": "Μέτρηση",
      "c_med_d": "Μας λένε ποιες σελίδες επισκέπτονται και από πού έρχονται, για να βελτιωθούμε. Χωρίς αυτό δεν μετράμε τίποτα.",
      "siempre": "Πάντα ενεργά",
      "mas": "Περισσότερα",
      "cerrar": "Κλείσιμο"
    },
    "hu": {
      "titulo": "A sütijeid",
      "texto": "Csak azt használjuk, ami a működéshez kell. Ahhoz, hogy megtudjuk, hogyan használják, és jobbá tegyük, kell az engedélyed.",
      "acc": "Mindet elfogadom",
      "rej": "Csak a szükséges",
      "cfg": "Választok",
      "guardar": "Választás mentése",
      "volver": "Vissza",
      "c_nec": "Szükséges",
      "c_nec_d": "Megőrzik a munkameneted, a nyelvedet és a kosaradat. Nélkülük az oldal nem működik.",
      "c_med": "Mérés",
      "c_med_d": "Megmondják, mely oldalakat látogatják és honnan érkeznek, hogy fejleszthessünk. Enélkül semmit nem mérünk.",
      "siempre": "Mindig aktív",
      "mas": "További információ",
      "cerrar": "Bezárás"
    },
    "ru": {
      "titulo": "Ваши файлы cookie",
      "texto": "Мы используем только то, что нужно для работы сайта. Чтобы понять, как им пользуются, и улучшить его, нам нужно ваше разрешение.",
      "acc": "Принять всё",
      "rej": "Только необходимое",
      "cfg": "Выбрать",
      "guardar": "Сохранить выбор",
      "volver": "Назад",
      "c_nec": "Необходимые",
      "c_nec_d": "Хранят вашу сессию, язык и корзину. Без них сайт не работает.",
      "c_med": "Измерения",
      "c_med_d": "Сообщают, какие страницы посещают и откуда приходят, чтобы мы могли улучшать сайт. Без этого мы ничего не измеряем.",
      "siempre": "Всегда включены",
      "mas": "Подробнее",
      "cerrar": "Закрыть"
    },
    "ar": {
      "titulo": "ملفات تعريف الارتباط الخاصة بك",
      "texto": "نستخدم فقط ما يلزم لعمل الموقع. ولمعرفة كيفية استخدامه وتحسينه، نحتاج إلى إذنك.",
      "acc": "قبول الكل",
      "rej": "الضروري فقط",
      "cfg": "اختيار",
      "guardar": "حفظ اختياري",
      "volver": "رجوع",
      "c_nec": "ضرورية",
      "c_nec_d": "تحفظ جلستك ولغتك وسلّتك. بدونها لا يعمل الموقع.",
      "c_med": "القياس",
      "c_med_d": "تخبرنا بالصفحات التي تُزار ومن أين يأتي الزوار، لنحسّن الموقع. بدون ذلك لا نقيس شيئًا.",
      "siempre": "مفعّلة دائمًا",
      "mas": "مزيد من المعلومات",
      "cerrar": "إغلاق"
    },
    "zh": {
      "titulo": "您的 Cookie",
      "texto": "我们只使用网站运行所必需的部分。若要了解网站的使用情况并加以改进，需要您的同意。",
      "acc": "全部接受",
      "rej": "仅必需",
      "cfg": "自行选择",
      "guardar": "保存我的选择",
      "volver": "返回",
      "c_nec": "必需",
      "c_nec_d": "保持您的登录状态、语言和购物车。没有它们网站无法运行。",
      "c_med": "统计",
      "c_med_d": "告诉我们哪些页面被访问、访客从何而来，以便改进网站。不同意则我们不做任何统计。",
      "siempre": "始终启用",
      "mas": "了解更多",
      "cerrar": "关闭"
    },
    "ja": {
      "titulo": "Cookie の設定",
      "texto": "サイトの動作に必要なものだけを使用しています。利用状況を把握して改善するには、お客さまの同意が必要です。",
      "acc": "すべて同意する",
      "rej": "必要なものだけ",
      "cfg": "選ぶ",
      "guardar": "この設定で保存",
      "volver": "戻る",
      "c_nec": "必須",
      "c_nec_d": "ログイン状態、言語、カートを保持します。これがないとサイトは動きません。",
      "c_med": "計測",
      "c_med_d": "どのページが見られ、どこから来られたかを把握し、改善に役立てます。同意がなければ何も計測しません。",
      "siempre": "常に有効",
      "mas": "詳しく見る",
      "cerrar": "閉じる"
    },
    "ko": {
      "titulo": "쿠키 설정",
      "texto": "사이트 작동에 꼭 필요한 것만 사용합니다. 이용 방식을 파악하고 개선하려면 동의가 필요합니다.",
      "acc": "모두 동의",
      "rej": "필요한 것만",
      "cfg": "선택하기",
      "guardar": "선택 저장",
      "volver": "뒤로",
      "c_nec": "필수",
      "c_nec_d": "로그인 상태, 언어, 장바구니를 유지합니다. 없으면 사이트가 작동하지 않습니다.",
      "c_med": "측정",
      "c_med_d": "어떤 페이지를 보는지, 어디에서 오는지 알려 주어 개선에 씁니다. 동의하지 않으면 아무것도 측정하지 않습니다.",
      "siempre": "항상 켜짐",
      "mas": "자세히 보기",
      "cerrar": "닫기"
    },
    "sv": {
      "titulo": "Dina kakor",
      "texto": "Vi använder bara det som krävs för att webbplatsen ska fungera. För att veta hur den används och förbättra den behöver vi ditt samtycke.",
      "acc": "Godkänn alla",
      "rej": "Bara det nödvändiga",
      "cfg": "Välj",
      "guardar": "Spara mitt val",
      "volver": "Tillbaka",
      "c_nec": "Nödvändiga",
      "c_nec_d": "De håller din session, ditt språk och din varukorg. Utan dem fungerar inte webbplatsen.",
      "c_med": "Mätning",
      "c_med_d": "De berättar vilka sidor som besöks och varifrån besökarna kommer, så att vi kan förbättra. Utan detta mäter vi ingenting.",
      "siempre": "Alltid på",
      "mas": "Läs mer",
      "cerrar": "Stäng"
    }
  };

  var RTL = ['ar'];
  var K_DEC = 'bbl_cookie_consent';   // 'all' | 'necessary' | 'custom'
  var K_CAT = 'bbl_cookie_cats';      // {"medicion":true}
  var K_VER = 'bbl_cookie_ver';
  var K_EXP = 'bbl_cookie_exp';
  var K_TOK = 'bbl_cookie_token';

  var VERSION = null, MESES = 12, el = null, panel = false;

  function idioma() {
    var l;
    try { l = localStorage.getItem('bbl_lang'); } catch (_) {}
    if (!l) { try { l = (navigator.language || 'es').slice(0, 2).toLowerCase(); } catch (_) {} }
    return T[l] ? l : 'es';
  }
  function leer(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }
  function escribir(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }

  /* La decisión vale si existe, no ha caducado y es sobre ESTA versión
     del aviso. Cualquiera de las tres cosas que falle vuelve a
     preguntar: un «sí» a un texto que ya no es el que se aplica no es
     un sí a nada. */
  function decision() {
    var d = leer(K_DEC);
    if (!d) return null;
    var exp = parseInt(leer(K_EXP) || '0', 10);
    if (exp && Date.now() > exp) return null;
    var ver = leer(K_VER);
    if (VERSION && ver && ver !== VERSION) return null;
    return d;
  }
  function categorias() {
    var d = decision();
    if (d === 'all') return { medicion: true };
    if (d === 'necessary') return { medicion: false };
    if (d === 'custom') {
      try { return JSON.parse(leer(K_CAT) || '{}'); } catch (_) { return { medicion: false }; }
    }
    return { medicion: false };   // sin decidir: no se mide
  }
  function permite(cat) { return categorias()[cat] === true; }

  function token() {
    var t = leer(K_TOK);
    if (t) return t;
    try {
      var a = new Uint8Array(16); crypto.getRandomValues(a);
      t = Array.from(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    } catch (_) { t = String(Date.now()) + Math.random().toString(36).slice(2, 10); }
    escribir(K_TOK, t);
    return t;
  }

  function guardar(dec, cats) {
    escribir(K_DEC, dec);
    escribir(K_CAT, JSON.stringify(cats || {}));
    if (VERSION) escribir(K_VER, VERSION);
    escribir(K_EXP, String(Date.now() + MESES * 30 * 24 * 3600 * 1000));
    /* Se avisa ANTES de mandarlo al servidor: quien esperaba para medir
       no tiene que esperar además a la red. */
    try { document.dispatchEvent(new CustomEvent('bbl:cookies', { detail: dec })); } catch (_) {}
    try {
      if (typeof sb !== 'undefined' && sb && sb.rpc) {
        sb.rpc('registrar_consentimiento', {
          p_token: token(), p_decision: dec, p_categorias: cats || {},
          p_idioma: idioma(),
          p_pagina: (location.pathname || '').slice(0, 120),
        }).then(function () {}, function () {});
      }
    } catch (_) {}
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function estilo() {
    if (document.getElementById('bbl-ck-css')) return;
    var s = document.createElement('style');
    s.id = 'bbl-ck-css';
    s.textContent =
      '#bbl-ck{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:2147483000;' +
      'width:min(660px,calc(100% - 32px));max-height:calc(100vh - 44px);overflow-y:auto;' +
      'background:linear-gradient(160deg,#241820,#0D0B0F);border:1px solid rgba(200,169,106,.22);' +
      'border-radius:10px;padding:22px;box-shadow:0 30px 70px -25px rgba(0,0,0,.85);' +
      "font-family:'Jost',system-ui,sans-serif;color:#E8E0D5;font-size:13.5px;line-height:1.55;" +
      'animation:bblckup .45s ease}' +
      '@keyframes bblckup{from{opacity:0;transform:translate(-50%,16px)}to{opacity:1;transform:translate(-50%,0)}}' +
      '#bbl-ck.rtl{direction:rtl}' +
      '#bbl-ck h4{margin:0 0 8px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#C8A96A;font-weight:500}' +
      '#bbl-ck p{margin:0 0 14px}' +
      '#bbl-ck a{color:#C8A96A;text-decoration:none}#bbl-ck a:hover{text-decoration:underline}' +
      '#bbl-ck .bt{display:flex;gap:10px;flex-wrap:wrap}' +
      '#bbl-ck button{font-family:inherit;font-size:12px;letter-spacing:.06em;cursor:pointer;' +
      'border-radius:3px;padding:11px 18px;transition:.2s;border:1px solid rgba(200,169,106,.3);' +
      'background:none;color:#E8E0D5;flex:1 1 auto;min-width:0}' +
      '#bbl-ck button:hover{border-color:#C8A96A;color:#C8A96A}' +
      '#bbl-ck .acc{background:linear-gradient(135deg,#8E723F,#F3E0BC 42%,#C9A96E 72%,#9C8050);' +
      'color:#0D0B0F;border:none;font-weight:500;background-size:180% 180%}' +
      '#bbl-ck .acc:hover{background-position:100% 0;color:#0D0B0F}' +
      '#bbl-ck .cat{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-top:1px solid rgba(200,169,106,.12)}' +
      '#bbl-ck .cat b{display:block;color:#F9F5EE;font-weight:400;font-size:13px}' +
      '#bbl-ck .cat small{display:block;opacity:.7;font-size:12px;margin-top:2px}' +
      '#bbl-ck .cat .sw{flex:0 0 auto;margin-top:2px}' +
      '#bbl-ck .cat input{width:17px;height:17px;accent-color:#C8A96A;cursor:pointer}' +
      '#bbl-ck .fija{font-size:11px;color:#8C7482;white-space:nowrap;margin-top:3px}' +
      'body.bbl-ck-visible{padding-bottom:var(--bbl-ck-alto,200px)}' +
      '@supports(padding:env(safe-area-inset-bottom)){#bbl-ck{bottom:calc(22px + env(safe-area-inset-bottom))}}' +
      '@media(max-width:420px){#bbl-ck{padding:18px}#bbl-ck button{flex:1 1 100%}}';
    document.head.appendChild(s);
  }

  function pinta() {
    if (!el) return;
    var l = idioma(), t = T[l] || T.es;
    el.className = RTL.indexOf(l) >= 0 ? 'rtl' : '';

    if (!panel) {
      el.innerHTML =
        '<h4>' + esc(t.titulo) + '</h4>' +
        '<p>' + esc(t.texto) + ' <a href="privacidad.html">' + esc(t.mas) + '</a></p>' +
        '<div class="bt">' +
          '<button id="ck-cfg">' + esc(t.cfg) + '</button>' +
          '<button id="ck-rej">' + esc(t.rej) + '</button>' +
          '<button class="acc" id="ck-acc">' + esc(t.acc) + '</button>' +
        '</div>';
      el.querySelector('#ck-cfg').onclick = function () { panel = true; pinta(); };
      el.querySelector('#ck-rej').onclick = function () { guardar('necessary', { medicion: false }); oculta(); };
      el.querySelector('#ck-acc').onclick = function () { guardar('all', { medicion: true }); oculta(); };
    } else {
      var c = categorias();
      el.innerHTML =
        '<h4>' + esc(t.titulo) + '</h4>' +
        '<div class="cat"><span class="sw"><input type="checkbox" checked disabled /></span>' +
          '<span><b>' + esc(t.c_nec) + '</b><small>' + esc(t.c_nec_d) + '</small>' +
          '<span class="fija">' + esc(t.siempre) + '</span></span></div>' +
        '<div class="cat"><span class="sw"><input type="checkbox" id="ck-med"' +
          (c.medicion ? ' checked' : '') + ' /></span>' +
          '<span><b>' + esc(t.c_med) + '</b><small>' + esc(t.c_med_d) + '</small></span></div>' +
        '<div class="bt" style="margin-top:14px">' +
          '<button id="ck-back">' + esc(t.volver) + '</button>' +
          '<button class="acc" id="ck-save">' + esc(t.guardar) + '</button>' +
        '</div>';
      el.querySelector('#ck-back').onclick = function () { panel = false; pinta(); };
      el.querySelector('#ck-save').onclick = function () {
        var med = !!el.querySelector('#ck-med').checked;
        guardar(med ? 'all' : 'necessary', { medicion: med });
        oculta();
      };
    }
    if (el.style.display !== 'none') requestAnimationFrame(reservar);
  }

  /* El aviso va fijo abajo y tapaba de forma permanente la última fila
     de productos: en móvil eran dos tarjetas que no se podían ni ver ni
     tocar hasta aceptar. Se mide ya pintado, porque crece con el idioma
     y con el panel abierto. */
  function reservar() {
    if (!el) return;
    var alto = Math.ceil(el.getBoundingClientRect().height) + 44;
    document.documentElement.style.setProperty('--bbl-ck-alto', alto + 'px');
    document.body.classList.add('bbl-ck-visible');
  }
  function muestra() {
    estilo();
    if (!el) { el = document.createElement('div'); el.id = 'bbl-ck'; document.body.appendChild(el); }
    el.style.display = 'block';
    pinta();
  }
  function oculta() {
    if (el) el.style.display = 'none';
    panel = false;
    document.body.classList.remove('bbl-ck-visible');
    document.documentElement.style.removeProperty('--bbl-ck-alto');
  }

  window.BBLCookies = {
    // Se mantiene el contrato de antes: presencia.js compara con
    // 'all' / 'necessary'. Sin decidir devuelve null, y eso YA NO
    // quiere decir «adelante».
    consent: decision,
    permite: permite,
    categorias: categorias,
    open: function () { panel = true; muestra(); },
    reset: function () {
      [K_DEC, K_CAT, K_VER, K_EXP].forEach(function (k) {
        try { localStorage.removeItem(k); } catch (_) {}
      });
      panel = false; muestra();
    },
  };

  document.addEventListener('bbl:lang', function () {
    if (el && el.style.display !== 'none') pinta();
  });

  function arranca() {
    /* La versión y la caducidad las dice el servidor. Si no contesta se
       pregunta igual: ante la duda, se pregunta. */
    function decidir() {
      if (!decision()) muestra();
    }
    try {
      if (typeof sb !== 'undefined' && sb && sb.rpc) {
        sb.rpc('aviso_de_cookies').then(function (r) {
          if (r && !r.error && r.data) {
            VERSION = r.data.version || null;
            MESES = Number(r.data.meses) || 12;
          }
          decidir();
        }, decidir);
        return;
      }
    } catch (_) {}
    decidir();
  }
  if (document.readyState !== 'loading') arranca();
  else document.addEventListener('DOMContentLoaded', arranca);
})();
