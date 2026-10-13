/* ══════════════════════════════════════════════════════════════════
   i18n-politicas.js · bloque 35.6

   Los rótulos de «Envíos y devoluciones», en los dieciséis idiomas.

   AQUÍ NO HAY NI UNA CIFRA, y eso es el bloque entero: los días, los
   costes y los umbrales los da `politicas_de_la_boutique()` desde las
   mismas tablas con las que se cobra. Un número escrito en un
   diccionario de idiomas es un número que algún día contradice al
   cobro en quince idiomas a la vez — que es, literalmente, lo que
   pasaba en `checkout_policies.dart`: prometía 14 días de devolución
   donde la clienta acepta 30.

   El texto largo tampoco está aquí: son condiciones de venta
   vinculantes, están en `boutique_policies` y hoy existen en español e
   inglés. Cuando se sirve el inglés a quien mira en otro idioma, se
   dice (`pb_aviso_idioma`).
   ═════════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({
    es: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Envíos y devoluciones',
      pb_intro:'Lo que puedes esperar de un pedido de la Boutique: cuánto tarda, cuánto cuesta el envío y qué pasa si algo no va bien.',
      pb_pais:'Plazos y costes para',
      pb_c_prov:'Proveedor',
      pb_c_prep:'Preparación',
      pb_c_transito:'Tránsito',
      pb_c_envio:'Envío',
      pb_c_gratis:'Gratis desde',
      pb_dias:'{min}–{max} días',
      pb_gratis:'Gratis',
      pb_no_envia:'Todavía no enviamos a este país.',
      pb_aviso_idioma:'Este texto está escrito en español e inglés. Estás viendo la versión en inglés.',
      pb_actualizado:'Actualizado el {fecha}',
      pb_volver:'Inicio',
      pb_cargando:'Cargando…'
    },

    en: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Shipping and returns',
      pb_intro:'What to expect from a Boutique order: how long it takes, what shipping costs, and what happens if something goes wrong.',
      pb_pais:'Times and costs for',
      pb_c_prov:'Supplier',
      pb_c_prep:'Processing',
      pb_c_transito:'Transit',
      pb_c_envio:'Shipping',
      pb_c_gratis:'Free from',
      pb_dias:'{min}–{max} days',
      pb_gratis:'Free',
      pb_no_envia:'We don\'t ship to this country yet.',
      pb_aviso_idioma:'This text is written in Spanish and English. You are reading the English version.',
      pb_actualizado:'Updated on {fecha}',
      pb_volver:'Home',
      pb_cargando:'Loading…'
    },

    pt: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Envios e devoluções',
      pb_intro:'O que podes esperar de uma encomenda da Boutique: quanto demora, quanto custa o envio e o que acontece se algo correr mal.',
      pb_pais:'Prazos e custos para',
      pb_c_prov:'Fornecedor',
      pb_c_prep:'Preparação',
      pb_c_transito:'Trânsito',
      pb_c_envio:'Envio',
      pb_c_gratis:'Grátis a partir de',
      pb_dias:'{min}–{max} dias',
      pb_gratis:'Grátis',
      pb_no_envia:'Ainda não enviamos para este país.',
      pb_aviso_idioma:'Este texto está escrito em espanhol e inglês. Estás a ver a versão em inglês.',
      pb_actualizado:'Atualizado a {fecha}',
      pb_volver:'Início',
      pb_cargando:'A carregar…'
    },

    fr: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Livraison et retours',
      pb_intro:'Ce que vous pouvez attendre d\'une commande Boutique : les délais, le coût de la livraison et ce qui se passe en cas de problème.',
      pb_pais:'Délais et coûts pour',
      pb_c_prov:'Fournisseur',
      pb_c_prep:'Préparation',
      pb_c_transito:'Transit',
      pb_c_envio:'Livraison',
      pb_c_gratis:'Offerte dès',
      pb_dias:'{min}–{max} jours',
      pb_gratis:'Offerte',
      pb_no_envia:'Nous ne livrons pas encore dans ce pays.',
      pb_aviso_idioma:'Ce texte est rédigé en espagnol et en anglais. Vous lisez la version anglaise.',
      pb_actualizado:'Mis à jour le {fecha}',
      pb_volver:'Accueil',
      pb_cargando:'Chargement…'
    },

    de: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Versand und Rücksendungen',
      pb_intro:'Was Sie von einer Boutique-Bestellung erwarten können: Dauer, Versandkosten und was passiert, wenn etwas nicht stimmt.',
      pb_pais:'Zeiten und Kosten für',
      pb_c_prov:'Lieferant',
      pb_c_prep:'Bearbeitung',
      pb_c_transito:'Transit',
      pb_c_envio:'Versand',
      pb_c_gratis:'Kostenlos ab',
      pb_dias:'{min}–{max} Tage',
      pb_gratis:'Kostenlos',
      pb_no_envia:'In dieses Land liefern wir noch nicht.',
      pb_aviso_idioma:'Dieser Text liegt auf Spanisch und Englisch vor. Sie lesen die englische Fassung.',
      pb_actualizado:'Aktualisiert am {fecha}',
      pb_volver:'Startseite',
      pb_cargando:'Wird geladen…'
    },

    it: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Spedizioni e resi',
      pb_intro:'Cosa aspettarti da un ordine della Boutique: quanto ci mette, quanto costa la spedizione e cosa succede se qualcosa non va.',
      pb_pais:'Tempi e costi per',
      pb_c_prov:'Fornitore',
      pb_c_prep:'Preparazione',
      pb_c_transito:'Transito',
      pb_c_envio:'Spedizione',
      pb_c_gratis:'Gratis da',
      pb_dias:'{min}–{max} giorni',
      pb_gratis:'Gratis',
      pb_no_envia:'Non spediamo ancora in questo paese.',
      pb_aviso_idioma:'Questo testo è scritto in spagnolo e inglese. Stai leggendo la versione inglese.',
      pb_actualizado:'Aggiornato il {fecha}',
      pb_volver:'Home',
      pb_cargando:'Caricamento…'
    },

    nl: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Verzending en retour',
      pb_intro:'Wat je kunt verwachten van een Boutique-bestelling: hoe lang het duurt, wat verzending kost en wat er gebeurt als er iets misgaat.',
      pb_pais:'Termijnen en kosten voor',
      pb_c_prov:'Leverancier',
      pb_c_prep:'Verwerking',
      pb_c_transito:'Transport',
      pb_c_envio:'Verzending',
      pb_c_gratis:'Gratis vanaf',
      pb_dias:'{min}–{max} dagen',
      pb_gratis:'Gratis',
      pb_no_envia:'We verzenden nog niet naar dit land.',
      pb_aviso_idioma:'Deze tekst is geschreven in het Spaans en Engels. Je leest de Engelse versie.',
      pb_actualizado:'Bijgewerkt op {fecha}',
      pb_volver:'Home',
      pb_cargando:'Laden…'
    },

    pl: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Wysyłka i zwroty',
      pb_intro:'Czego możesz oczekiwać od zamówienia w Boutique: ile trwa, ile kosztuje wysyłka i co się stanie, jeśli coś pójdzie nie tak.',
      pb_pais:'Terminy i koszty dla',
      pb_c_prov:'Dostawca',
      pb_c_prep:'Przygotowanie',
      pb_c_transito:'Transport',
      pb_c_envio:'Wysyłka',
      pb_c_gratis:'Za darmo od',
      pb_dias:'{min}–{max} dni',
      pb_gratis:'Za darmo',
      pb_no_envia:'Do tego kraju jeszcze nie wysyłamy.',
      pb_aviso_idioma:'Ten tekst jest napisany po hiszpańsku i angielsku. Czytasz wersję angielską.',
      pb_actualizado:'Zaktualizowano {fecha}',
      pb_volver:'Start',
      pb_cargando:'Wczytywanie…'
    },

    el: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Αποστολές και επιστροφές',
      pb_intro:'Τι να περιμένεις από μια παραγγελία της Boutique: πόσο κάνει, πόσο κοστίζει η αποστολή και τι γίνεται αν κάτι πάει στραβά.',
      pb_pais:'Χρόνοι και κόστη για',
      pb_c_prov:'Προμηθευτής',
      pb_c_prep:'Προετοιμασία',
      pb_c_transito:'Μεταφορά',
      pb_c_envio:'Αποστολή',
      pb_c_gratis:'Δωρεάν από',
      pb_dias:'{min}–{max} ημέρες',
      pb_gratis:'Δωρεάν',
      pb_no_envia:'Δεν στέλνουμε ακόμη σε αυτή τη χώρα.',
      pb_aviso_idioma:'Αυτό το κείμενο υπάρχει στα ισπανικά και στα αγγλικά. Βλέπεις την αγγλική έκδοση.',
      pb_actualizado:'Ενημερώθηκε στις {fecha}',
      pb_volver:'Αρχική',
      pb_cargando:'Φόρτωση…'
    },

    hu: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Szállítás és visszaküldés',
      pb_intro:'Mire számíthatsz egy Boutique-rendelésnél: mennyi ideig tart, mennyibe kerül a szállítás, és mi történik, ha valami nem stimmel.',
      pb_pais:'Határidők és költségek:',
      pb_c_prov:'Beszállító',
      pb_c_prep:'Előkészítés',
      pb_c_transito:'Szállítás',
      pb_c_envio:'Szállítási díj',
      pb_c_gratis:'Ingyenes ettől',
      pb_dias:'{min}–{max} nap',
      pb_gratis:'Ingyenes',
      pb_no_envia:'Ebbe az országba még nem szállítunk.',
      pb_aviso_idioma:'Ez a szöveg spanyolul és angolul készült. Az angol változatot olvasod.',
      pb_actualizado:'Frissítve: {fecha}',
      pb_volver:'Főoldal',
      pb_cargando:'Betöltés…'
    },

    ru: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Доставка и возврат',
      pb_intro:'Чего ждать от заказа в Boutique: сколько идёт, сколько стоит доставка и что будет, если что-то пойдёт не так.',
      pb_pais:'Сроки и стоимость для',
      pb_c_prov:'Поставщик',
      pb_c_prep:'Подготовка',
      pb_c_transito:'В пути',
      pb_c_envio:'Доставка',
      pb_c_gratis:'Бесплатно от',
      pb_dias:'{min}–{max} дней',
      pb_gratis:'Бесплатно',
      pb_no_envia:'В эту страну мы пока не доставляем.',
      pb_aviso_idioma:'Этот текст написан на испанском и английском. Вы читаете английскую версию.',
      pb_actualizado:'Обновлено {fecha}',
      pb_volver:'Главная',
      pb_cargando:'Загрузка…'
    },

    ar: {
      pb_eyebrow:'Boutique',
      pb_titulo:'الشحن والإرجاع',
      pb_intro:'ما يمكن توقّعه من طلب في البوتيك: كم يستغرق، وكم يكلّف الشحن، وماذا يحدث إن حدث خطأ.',
      pb_pais:'المدد والتكاليف في',
      pb_c_prov:'المورّد',
      pb_c_prep:'التحضير',
      pb_c_transito:'الشحن',
      pb_c_envio:'تكلفة الشحن',
      pb_c_gratis:'مجاني ابتداءً من',
      pb_dias:'{min}–{max} يومًا',
      pb_gratis:'مجاني',
      pb_no_envia:'لا نشحن إلى هذا البلد بعد.',
      pb_aviso_idioma:'هذا النص مكتوب بالإسبانية والإنجليزية. أنت تقرأ النسخة الإنجليزية.',
      pb_actualizado:'حُدّث في {fecha}',
      pb_volver:'الرئيسية',
      pb_cargando:'جارٍ التحميل…'
    },

    zh: {
      pb_eyebrow:'Boutique',
      pb_titulo:'配送与退货',
      pb_intro:'在 Boutique 下单后可以预期什么：需要多久、运费多少，以及出现问题时如何处理。',
      pb_pais:'查看以下地区的时效与费用',
      pb_c_prov:'供应商',
      pb_c_prep:'备货',
      pb_c_transito:'运输',
      pb_c_envio:'运费',
      pb_c_gratis:'满额免运费',
      pb_dias:'{min}–{max} 天',
      pb_gratis:'免费',
      pb_no_envia:'我们暂不配送至该国家或地区。',
      pb_aviso_idioma:'本文仅有西班牙语和英语版本。您正在阅读英语版本。',
      pb_actualizado:'更新于 {fecha}',
      pb_volver:'首页',
      pb_cargando:'加载中…'
    },

    ja: {
      pb_eyebrow:'Boutique',
      pb_titulo:'配送と返品',
      pb_intro:'Boutique のご注文について：お届けまでの日数、送料、そして問題があった場合の対応です。',
      pb_pais:'次の国・地域の日数と送料',
      pb_c_prov:'サプライヤー',
      pb_c_prep:'準備',
      pb_c_transito:'輸送',
      pb_c_envio:'送料',
      pb_c_gratis:'送料無料ライン',
      pb_dias:'{min}〜{max} 日',
      pb_gratis:'無料',
      pb_no_envia:'この国・地域へはまだ配送していません。',
      pb_aviso_idioma:'この文章はスペイン語と英語で用意されています。英語版をご覧いただいています。',
      pb_actualizado:'{fecha} 更新',
      pb_volver:'ホーム',
      pb_cargando:'読み込み中…'
    },

    ko: {
      pb_eyebrow:'Boutique',
      pb_titulo:'배송과 반품',
      pb_intro:'Boutique 주문에서 기대할 수 있는 것: 소요 기간, 배송비, 그리고 문제가 생겼을 때의 처리입니다.',
      pb_pais:'다음 지역의 기간과 비용',
      pb_c_prov:'공급처',
      pb_c_prep:'준비',
      pb_c_transito:'배송',
      pb_c_envio:'배송비',
      pb_c_gratis:'무료 배송 기준',
      pb_dias:'{min}~{max}일',
      pb_gratis:'무료',
      pb_no_envia:'아직 이 국가로는 배송하지 않습니다.',
      pb_aviso_idioma:'이 문서는 스페인어와 영어로 작성되어 있습니다. 영어 버전을 보고 계십니다.',
      pb_actualizado:'{fecha} 업데이트',
      pb_volver:'홈',
      pb_cargando:'불러오는 중…'
    },

    sv: {
      pb_eyebrow:'Boutique',
      pb_titulo:'Frakt och returer',
      pb_intro:'Vad du kan vänta dig av en Boutique-beställning: hur lång tid det tar, vad frakten kostar och vad som händer om något blir fel.',
      pb_pais:'Tider och kostnader för',
      pb_c_prov:'Leverantör',
      pb_c_prep:'Förberedelse',
      pb_c_transito:'Transport',
      pb_c_envio:'Frakt',
      pb_c_gratis:'Gratis från',
      pb_dias:'{min}–{max} dagar',
      pb_gratis:'Gratis',
      pb_no_envia:'Vi skickar inte till det här landet ännu.',
      pb_aviso_idioma:'Den här texten finns på spanska och engelska. Du läser den engelska versionen.',
      pb_actualizado:'Uppdaterad {fecha}',
      pb_volver:'Hem',
      pb_cargando:'Laddar…'
    }

  });
})();
