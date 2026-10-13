/* ═══════════════════════════════════════════════════════════════
   Babyloon · Las quince que faltaban
   ───────────────────────────────────────────────────────────────
   Medido con el diccionario cargado de verdad en Node, no leyendo
   el fichero con expresiones regulares —que con comillas dentro
   del texto se equivoca—: `i18n-index.js` tenía 308 claves en
   es, en, pt, fr y de, y sólo 293 en sv, ja, ar, zh, ko y ru.

   Las quince ausentes eran todas de la tarjeta regalo y de las
   ocasiones. Es decir: una sueca, una japonesa o una rusa abría
   la página de regalo y le salía media pantalla en español.

   Van en fichero aparte en lugar de dentro de los 176 KB de
   `i18n-index.js` por una razón práctica: `BBL.extend` fusiona, y
   un parche que se lee de un vistazo es más fácil de revisar —y
   de retirar cuando se integre— que quince inserciones repartidas
   por seis bloques de un fichero enorme.

   Se carga DESPUÉS de i18n-index.js.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({

    sv: {
      gc_card:'Presentkort',
      gc_share:'Dela koden med mottagaren så att hen kan lösa in den.',
      gc_for:'TILL', gc_endless:'SKÖNHET UTAN SLUT',
      occChristmas:'Jul', occBirthday:'Födelsedag',
      occWomen:'Till henne', occMen:'Till honom',
      occWedding:'Bröllop', occMother:'Mors dag',
      gc_share_text:'En gåva av skönhet till dig ✨ Lös in ditt Babyloon-presentkort med koden',
      gc_copy:'Kopiera koden', gc_copied:'Kopierad!',
      gc_more:'Dela', gc_wa:'WhatsApp'
    },

    ja: {
      gc_card:'ギフトカード',
      gc_share:'受け取る方にこのコードをお伝えください。',
      gc_for:'宛先', gc_endless:'終わりなき美しさ',
      occChristmas:'クリスマス', occBirthday:'誕生日',
      occWomen:'彼女へ', occMen:'彼へ',
      occWedding:'ウェディング', occMother:'母の日',
      gc_share_text:'美しさを贈ります ✨ Babyloon のギフトカードはこちらのコードで',
      gc_copy:'コードをコピー', gc_copied:'コピーしました',
      gc_more:'共有', gc_wa:'WhatsApp'
    },

    ar: {
      gc_card:'بطاقة هدية',
      gc_share:'شارك هذا الرمز مع من يستلمه ليتمكّن من استخدامه.',
      gc_for:'إلى', gc_endless:'جمال بلا نهاية',
      occChristmas:'عيد الميلاد', occBirthday:'عيد ميلاد',
      occWomen:'لها', occMen:'له',
      occWedding:'زفاف', occMother:'عيد الأم',
      gc_share_text:'أهديك جمالًا ✨ استخدمي بطاقة Babyloon بهذا الرمز',
      gc_copy:'نسخ الرمز', gc_copied:'تم النسخ',
      gc_more:'مشاركة', gc_wa:'واتساب'
    },

    zh: {
      gc_card:'礼品卡',
      gc_share:'把这个代码分享给收礼的人，即可使用。',
      gc_for:'赠予', gc_endless:'无尽之美',
      occChristmas:'圣诞节', occBirthday:'生日',
      occWomen:'送给她', occMen:'送给他',
      occWedding:'婚礼', occMother:'母亲节',
      gc_share_text:'送你一份美的礼物 ✨ 用这个代码兑换你的 Babyloon 礼品卡',
      gc_copy:'复制代码', gc_copied:'已复制',
      gc_more:'分享', gc_wa:'WhatsApp'
    },

    ko: {
      gc_card:'기프트 카드',
      gc_share:'받는 분에게 이 코드를 전달하면 사용할 수 있습니다.',
      gc_for:'받는 분', gc_endless:'끝없는 아름다움',
      occChristmas:'크리스마스', occBirthday:'생일',
      occWomen:'그녀에게', occMen:'그에게',
      occWedding:'웨딩', occMother:'어버이날',
      gc_share_text:'아름다움을 선물합니다 ✨ 이 코드로 Babyloon 기프트 카드를 사용하세요',
      gc_copy:'코드 복사', gc_copied:'복사했습니다',
      gc_more:'공유', gc_wa:'WhatsApp'
    },

    ru: {
      gc_card:'Подарочная карта',
      gc_share:'Передайте этот код получателю, чтобы он активировал карту.',
      gc_for:'КОМУ', gc_endless:'КРАСОТА БЕЗ КОНЦА',
      occChristmas:'Рождество', occBirthday:'День рождения',
      occWomen:'Для неё', occMen:'Для него',
      occWedding:'Свадьба', occMother:'День матери',
      gc_share_text:'Дарю вам красоту ✨ Активируйте подарочную карту Babyloon по коду',
      gc_copy:'Скопировать код', gc_copied:'Скопировано',
      gc_more:'Поделиться', gc_wa:'WhatsApp'
    }

  });
})();
