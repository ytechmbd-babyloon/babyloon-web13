/* ═══════════════════════════════════════════════════════════════
   Babyloon · El panel del cliente — puntos y ventajas
   ───────────────────────────────────────────────────────────────
   Veintiséis claves en los dieciséis idiomas. (61.73: diez más, la tercera
   bolsa y adónde vuelven las devoluciones.) (61.64: «Invita y ahorra»
   y «Personas invitadas», y neutras las cinco frases que tenían género.)

   DOS AVISOS SOBRE EL TEXTO, porque aquí se promete algo:

   1. El BOTÓN DE PÁNICO se describe como lo que es: algo que se
      pulsa DESDE LA APP durante el servicio. No se pone un botón
      aquí. Una persona en apuros no abre el portátil.

      Y hasta hoy no avisaba a nadie: la tabla existía, el permiso
      de escritura existía, y no había ni disparador ni función ni
      pantalla que lo leyera. Se arregló antes de escribir esta
      línea (`lanzar_panico`, migración del 23 de septiembre), y se
      comprobó que avisa a las 3 personas del equipo. Sin eso, esta
      clave no se habría escrito.

   2. El SEGURO se enuncia igual que en la portada, porque es la
      promesa comercial de Babyloon y las tres superficies tienen
      que decir lo mismo. Pero no hay modelo de datos detrás: ni
      póliza, ni reclamación, ni rastro en el administrador. Está
      anotado en el proyecto para resolverlo antes del lanzamiento.

   El resto —puntos, bolsas, referidos, escrow, garantía— sale de
   funciones que existen y se han probado con datos reales.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({

    es: {
      cargando:'Cargando…', p_puntos:'Puntos y ventajas',
      ly_h1:'Puntos y ventajas',
      ly_sub:'Lo que has ganado por reservar con Babyloon, y lo que cubre cada servicio.',
      ly_saldo:'Tus puntos', ly_equivalen:'Equivalen a',
      ly_bolsa_regalo:'De regalo', ly_bolsa_regalo_d:'Valen para cualquier servicio o producto.',
      ly_bolsa_compra:'Comprados', ly_bolsa_compra_d:'Sólo para producto de la Boutique.',
      ly_invita:'Invita y ahorra', ly_copiar:'Copiar', ly_copiado:'Copiado',
      ly_referidas:'Personas invitadas', ly_descuento:'Tu descuento', ly_ganado:'Ganado',
      ly_cubre:'Qué cubre cada servicio',
      ly_v_seguro:'Seguro incluido',
      ly_v_seguro_d:'Cada servicio va con un seguro para daños accidentales en el lugar de la cita.',
      ly_v_escrow:'El pago, retenido',
      ly_v_escrow_d:'Tu dinero no llega a quien presta el servicio hasta que el servicio está terminado.',
      ly_v_panico:'Botón de pánico',
      ly_v_panico_d:'Durante el servicio, desde la app, avisas al equipo de Babyloon al instante.',
      ly_v_garantia:'Garantía posterior',
      ly_v_garantia_d:'Si algo no quedó bien, la reclamas desde la app dentro del plazo del servicio.',
      ly_v_verificados:'Identidad verificada',
      ly_v_verificados_d:'Identidad, titulación y datos fiscales comprobados antes de poder trabajar.',
      ly_pie:'Los servicios se reservan en la app. Aquí puedes verlo y seguirlo todo.'
    },

    en: {
      cargando:'Loading…', p_puntos:'Points and benefits',
      ly_h1:'Points and benefits',
      ly_sub:'What you have earned by booking with Babyloon, and what every service covers.',
      ly_saldo:'Your points', ly_equivalen:'Worth',
      ly_bolsa_regalo:'Gifted', ly_bolsa_regalo_d:'Valid for any service or product.',
      ly_bolsa_compra:'Purchased', ly_bolsa_compra_d:'Boutique products only.',
      ly_invita:'Invite and save', ly_copiar:'Copy', ly_copiado:'Copied',
      ly_referidas:'People invited', ly_descuento:'Your discount', ly_ganado:'Earned',
      ly_cubre:'What every service covers',
      ly_v_seguro:'Insurance included',
      ly_v_seguro_d:'Every service carries insurance for accidental damage at the appointment location.',
      ly_v_escrow:'Payment held',
      ly_v_escrow_d:'Your money does not reach the professional until the service is complete.',
      ly_v_panico:'Panic button',
      ly_v_panico_d:'During the service, from the app, you alert the Babyloon team instantly.',
      ly_v_garantia:'After-service guarantee',
      ly_v_garantia_d:'If something was not right, you claim it from the app within the service window.',
      ly_v_verificados:'Verified professionals',
      ly_v_verificados_d:'Identity, qualifications and tax details checked before they can work.',
      ly_pie:'Services are booked in the app. Here you can see and follow everything.'
    },

    pt: {
      cargando:'A carregar…', p_puntos:'Pontos e vantagens',
      ly_h1:'Pontos e vantagens',
      ly_sub:'O que ganhou por reservar com a Babyloon, e o que cada serviço cobre.',
      ly_saldo:'Os seus pontos', ly_equivalen:'Equivalem a',
      ly_bolsa_regalo:'Oferecidos', ly_bolsa_regalo_d:'Válidos para qualquer serviço ou produto.',
      ly_bolsa_compra:'Comprados', ly_bolsa_compra_d:'Só para produtos da Boutique.',
      ly_invita:'Convide e poupe', ly_copiar:'Copiar', ly_copiado:'Copiado',
      ly_referidas:'Pessoas convidadas', ly_descuento:'O seu desconto', ly_ganado:'Ganho',
      ly_cubre:'O que cada serviço cobre',
      ly_v_seguro:'Seguro incluído',
      ly_v_seguro_d:'Cada serviço tem seguro para danos acidentais no local da marcação.',
      ly_v_escrow:'Pagamento retido',
      ly_v_escrow_d:'O seu dinheiro não chega a quem presta o serviço até o serviço estar concluído.',
      ly_v_panico:'Botão de pânico',
      ly_v_panico_d:'Durante o serviço, a partir da app, avisa a equipa Babyloon de imediato.',
      ly_v_garantia:'Garantia pós-serviço',
      ly_v_garantia_d:'Se algo não ficou bem, reclama pela app dentro do prazo do serviço.',
      ly_v_verificados:'Identidade verificada',
      ly_v_verificados_d:'Identidade, formação e dados fiscais verificados antes de poderem trabalhar.',
      ly_pie:'Os serviços reservam-se na app. Aqui pode ver e acompanhar tudo.'
    },

    fr: {
      cargando:'Chargement…', p_puntos:'Points et avantages',
      ly_h1:'Points et avantages',
      ly_sub:'Ce que vous avez gagné en réservant avec Babyloon, et ce que couvre chaque prestation.',
      ly_saldo:'Vos points', ly_equivalen:'Équivalent à',
      ly_bolsa_regalo:'Offerts', ly_bolsa_regalo_d:'Valables pour toute prestation ou tout produit.',
      ly_bolsa_compra:'Achetés', ly_bolsa_compra_d:'Uniquement pour les produits de la Boutique.',
      ly_invita:'Parrainez et économisez', ly_copiar:'Copier', ly_copiado:'Copié',
      ly_referidas:'Personnes invitées', ly_descuento:'Votre remise', ly_ganado:'Gagné',
      ly_cubre:'Ce que couvre chaque prestation',
      ly_v_seguro:'Assurance incluse',
      ly_v_seguro_d:'Chaque prestation est assurée contre les dommages accidentels sur le lieu du rendez-vous.',
      ly_v_escrow:'Paiement bloqué',
      ly_v_escrow_d:'Votre argent ne parvient au compte professionnel qu’une fois la prestation terminée.',
      ly_v_panico:'Bouton d’urgence',
      ly_v_panico_d:'Pendant la prestation, depuis l’application, vous alertez l’équipe Babyloon immédiatement.',
      ly_v_garantia:'Garantie après prestation',
      ly_v_garantia_d:'Si quelque chose n’allait pas, vous le signalez depuis l’application dans le délai prévu.',
      ly_v_verificados:'Identité vérifiée',
      ly_v_verificados_d:'Identité, diplômes et données fiscales vérifiés avant de pouvoir travailler.',
      ly_pie:'Les prestations se réservent dans l’application. Ici, vous pouvez tout voir et tout suivre.'
    },

    de: {
      cargando:'Wird geladen…', p_puntos:'Punkte und Vorteile',
      ly_h1:'Punkte und Vorteile',
      ly_sub:'Was Sie mit Ihren Buchungen bei Babyloon verdient haben und was jede Leistung abdeckt.',
      ly_saldo:'Ihre Punkte', ly_equivalen:'Entspricht',
      ly_bolsa_regalo:'Geschenkt', ly_bolsa_regalo_d:'Gültig für jede Leistung und jedes Produkt.',
      ly_bolsa_compra:'Gekauft', ly_bolsa_compra_d:'Nur für Produkte der Boutique.',
      ly_invita:'Einladen und sparen', ly_copiar:'Kopieren', ly_copiado:'Kopiert',
      ly_referidas:'Eingeladene Personen', ly_descuento:'Ihr Rabatt', ly_ganado:'Verdient',
      ly_cubre:'Was jede Leistung abdeckt',
      ly_v_seguro:'Versicherung inklusive',
      ly_v_seguro_d:'Jede Leistung ist gegen versehentliche Schäden am Terminort versichert.',
      ly_v_escrow:'Zahlung einbehalten',
      ly_v_escrow_d:'Ihr Geld erreicht die Fachkraft erst, wenn die Leistung abgeschlossen ist.',
      ly_v_panico:'Notfallknopf',
      ly_v_panico_d:'Während der Leistung alarmieren Sie über die App sofort das Babyloon-Team.',
      ly_v_garantia:'Garantie danach',
      ly_v_garantia_d:'War etwas nicht in Ordnung, melden Sie es fristgerecht über die App.',
      ly_v_verificados:'Geprüfte Fachkräfte',
      ly_v_verificados_d:'Identität, Qualifikation und Steuerdaten werden vor der Arbeit geprüft.',
      ly_pie:'Leistungen werden in der App gebucht. Hier sehen und verfolgen Sie alles.'
    },

    it: {
      cargando:'Caricamento…', p_puntos:'Punti e vantaggi',
      ly_h1:'Punti e vantaggi',
      ly_sub:'Quello che hai guadagnato prenotando con Babyloon, e quello che copre ogni servizio.',
      ly_saldo:'I tuoi punti', ly_equivalen:'Equivalgono a',
      ly_bolsa_regalo:'In regalo', ly_bolsa_regalo_d:'Validi per qualsiasi servizio o prodotto.',
      ly_bolsa_compra:'Acquistati', ly_bolsa_compra_d:'Solo per i prodotti della Boutique.',
      ly_invita:'Invita e risparmia', ly_copiar:'Copia', ly_copiado:'Copiato',
      ly_referidas:'Persone invitate', ly_descuento:'Il tuo sconto', ly_ganado:'Guadagnato',
      ly_cubre:'Cosa copre ogni servizio',
      ly_v_seguro:'Assicurazione inclusa',
      ly_v_seguro_d:'Ogni servizio ha un’assicurazione per i danni accidentali nel luogo dell’appuntamento.',
      ly_v_escrow:'Pagamento trattenuto',
      ly_v_escrow_d:'Il tuo denaro non arriva a chi presta il servizio finché il servizio non è concluso.',
      ly_v_panico:'Pulsante di emergenza',
      ly_v_panico_d:'Durante il servizio, dall’app, avvisi il team Babyloon all’istante.',
      ly_v_garantia:'Garanzia successiva',
      ly_v_garantia_d:'Se qualcosa non è andato bene, lo segnali dall’app entro i termini del servizio.',
      ly_v_verificados:'Identità verificata',
      ly_v_verificados_d:'Identità, titoli e dati fiscali verificati prima di poter lavorare.',
      ly_pie:'I servizi si prenotano nell’app. Qui puoi vedere e seguire tutto.'
    },

    nl: {
      cargando:'Laden…', p_puntos:'Punten en voordelen',
      ly_h1:'Punten en voordelen',
      ly_sub:'Wat je hebt verdiend door bij Babyloon te boeken, en wat elke behandeling dekt.',
      ly_saldo:'Jouw punten', ly_equivalen:'Ter waarde van',
      ly_bolsa_regalo:'Cadeau', ly_bolsa_regalo_d:'Geldig voor elke behandeling of elk product.',
      ly_bolsa_compra:'Gekocht', ly_bolsa_compra_d:'Alleen voor producten uit de Boetiek.',
      ly_invita:'Nodig uit en bespaar', ly_copiar:'Kopiëren', ly_copiado:'Gekopieerd',
      ly_referidas:'Uitgenodigde personen', ly_descuento:'Jouw korting', ly_ganado:'Verdiend',
      ly_cubre:'Wat elke behandeling dekt',
      ly_v_seguro:'Verzekering inbegrepen',
      ly_v_seguro_d:'Elke behandeling is verzekerd tegen onbedoelde schade op de locatie.',
      ly_v_escrow:'Betaling vastgehouden',
      ly_v_escrow_d:'Je geld bereikt de professional pas als de behandeling is afgerond.',
      ly_v_panico:'Paniekknop',
      ly_v_panico_d:'Tijdens de behandeling waarschuw je via de app meteen het Babyloon-team.',
      ly_v_garantia:'Nazorggarantie',
      ly_v_garantia_d:'Was er iets niet goed, dan meld je dat via de app binnen de termijn.',
      ly_v_verificados:'Geverifieerde professionals',
      ly_v_verificados_d:'Identiteit, diploma’s en fiscale gegevens gecontroleerd voordat ze mogen werken.',
      ly_pie:'Behandelingen boek je in de app. Hier zie en volg je alles.'
    },

    pl: {
      cargando:'Wczytywanie…', p_puntos:'Punkty i korzyści',
      ly_h1:'Punkty i korzyści',
      ly_sub:'To, co zyskujesz, rezerwując w Babyloon, i to, co obejmuje każda usługa.',
      ly_saldo:'Twoje punkty', ly_equivalen:'Odpowiadają',
      ly_bolsa_regalo:'W prezencie', ly_bolsa_regalo_d:'Ważne na każdą usługę i każdy produkt.',
      ly_bolsa_compra:'Kupione', ly_bolsa_compra_d:'Tylko na produkty z Butiku.',
      ly_invita:'Zaproś i oszczędzaj', ly_copiar:'Kopiuj', ly_copiado:'Skopiowano',
      ly_referidas:'Zaproszone osoby', ly_descuento:'Twój rabat', ly_ganado:'Zarobione',
      ly_cubre:'Co obejmuje każda usługa',
      ly_v_seguro:'Ubezpieczenie w cenie',
      ly_v_seguro_d:'Każda usługa ma ubezpieczenie od przypadkowych szkód w miejscu wizyty.',
      ly_v_escrow:'Płatność zablokowana',
      ly_v_escrow_d:'Twoje pieniądze trafiają na konto zawodowe dopiero po zakończeniu usługi.',
      ly_v_panico:'Przycisk alarmowy',
      ly_v_panico_d:'W trakcie usługi, z aplikacji, natychmiast powiadamiasz zespół Babyloon.',
      ly_v_garantia:'Gwarancja pousługowa',
      ly_v_garantia_d:'Jeśli coś było nie tak, zgłaszasz to w aplikacji w terminie usługi.',
      ly_v_verificados:'Zweryfikowana tożsamość',
      ly_v_verificados_d:'Tożsamość, dyplomy i dane podatkowe sprawdzone, zanim zaczną pracować.',
      ly_pie:'Usługi rezerwuje się w aplikacji. Tutaj wszystko zobaczysz i prześledzisz.'
    },

    el: {
      cargando:'Φόρτωση…', p_puntos:'Πόντοι και προνόμια',
      ly_h1:'Πόντοι και προνόμια',
      ly_sub:'Όσα κέρδισες κλείνοντας με το Babyloon, και τι καλύπτει κάθε υπηρεσία.',
      ly_saldo:'Οι πόντοι σου', ly_equivalen:'Αντιστοιχούν σε',
      ly_bolsa_regalo:'Δώρο', ly_bolsa_regalo_d:'Ισχύουν για κάθε υπηρεσία ή προϊόν.',
      ly_bolsa_compra:'Αγορασμένοι', ly_bolsa_compra_d:'Μόνο για προϊόντα της Μπουτίκ.',
      ly_invita:'Κάλεσε και εξοικονόμησε', ly_copiar:'Αντιγραφή', ly_copiado:'Αντιγράφηκε',
      ly_referidas:'Άτομα που προσκάλεσες', ly_descuento:'Η έκπτωσή σου', ly_ganado:'Κερδισμένα',
      ly_cubre:'Τι καλύπτει κάθε υπηρεσία',
      ly_v_seguro:'Ασφάλιση συμπεριλαμβάνεται',
      ly_v_seguro_d:'Κάθε υπηρεσία έχει ασφάλιση για τυχαίες ζημιές στον χώρο του ραντεβού.',
      ly_v_escrow:'Η πληρωμή δεσμευμένη',
      ly_v_escrow_d:'Τα χρήματά σου δεν μεταφέρονται πριν ολοκληρωθεί η υπηρεσία.',
      ly_v_panico:'Κουμπί έκτακτης ανάγκης',
      ly_v_panico_d:'Κατά την υπηρεσία, από την εφαρμογή, ειδοποιείς αμέσως την ομάδα Babyloon.',
      ly_v_garantia:'Εγγύηση μετά την υπηρεσία',
      ly_v_garantia_d:'Αν κάτι δεν πήγε καλά, το δηλώνεις από την εφαρμογή μέσα στην προθεσμία.',
      ly_v_verificados:'Πιστοποιημένες επαγγελματίες',
      ly_v_verificados_d:'Ταυτότητα, τίτλοι και φορολογικά στοιχεία ελεγμένα πριν μπορέσουν να εργαστούν.',
      ly_pie:'Οι υπηρεσίες κλείνονται στην εφαρμογή. Εδώ τα βλέπεις και τα παρακολουθείς όλα.'
    },

    hu: {
      cargando:'Betöltés…', p_puntos:'Pontok és előnyök',
      ly_h1:'Pontok és előnyök',
      ly_sub:'Amit a Babyloon-foglalásaiddal szereztél, és amit minden szolgáltatás fedez.',
      ly_saldo:'A pontjaid', ly_equivalen:'Ennyit érnek:',
      ly_bolsa_regalo:'Ajándékba', ly_bolsa_regalo_d:'Bármely szolgáltatásra és termékre érvényes.',
      ly_bolsa_compra:'Vásárolt', ly_bolsa_compra_d:'Csak a Butik termékeire.',
      ly_invita:'Hívd meg és spórolj', ly_copiar:'Másolás', ly_copiado:'Másolva',
      ly_referidas:'Meghívott személyek', ly_descuento:'A kedvezményed', ly_ganado:'Megkeresve',
      ly_cubre:'Mit fedez minden szolgáltatás',
      ly_v_seguro:'Biztosítás az árban',
      ly_v_seguro_d:'Minden szolgáltatáshoz biztosítás tartozik a helyszínen okozott véletlen károkra.',
      ly_v_escrow:'A fizetés zárolva',
      ly_v_escrow_d:'A pénzed csak a szolgáltatás befejezése után jut el a szakemberhez.',
      ly_v_panico:'Vészgomb',
      ly_v_panico_d:'A szolgáltatás alatt az appból azonnal riasztod a Babyloon csapatát.',
      ly_v_garantia:'Utólagos garancia',
      ly_v_garantia_d:'Ha valami nem sikerült jól, az appból jelzed a szolgáltatás határidején belül.',
      ly_v_verificados:'Ellenőrzött szakemberek',
      ly_v_verificados_d:'Személyazonosság, képesítés és adóadatok ellenőrizve, mielőtt dolgozhatnának.',
      ly_pie:'A szolgáltatásokat az appban foglalod. Itt mindent láthatsz és követhetsz.'
    },

    ru: {
      cargando:'Загрузка…', p_puntos:'Баллы и преимущества',
      ly_h1:'Баллы и преимущества',
      ly_sub:'То, что вы заработали, бронируя в Babyloon, и то, что покрывает каждая услуга.',
      ly_saldo:'Ваши баллы', ly_equivalen:'Эквивалент',
      ly_bolsa_regalo:'Подаренные', ly_bolsa_regalo_d:'Действуют на любую услугу и любой товар.',
      ly_bolsa_compra:'Купленные', ly_bolsa_compra_d:'Только на товары Бутика.',
      ly_invita:'Приглашайте и экономьте', ly_copiar:'Копировать', ly_copiado:'Скопировано',
      ly_referidas:'Приглашено', ly_descuento:'Ваша скидка', ly_ganado:'Заработано',
      ly_cubre:'Что покрывает каждая услуга',
      ly_v_seguro:'Страховка включена',
      ly_v_seguro_d:'Каждая услуга застрахована от случайного ущерба на месте встречи.',
      ly_v_escrow:'Платёж удерживается',
      ly_v_escrow_d:'Ваши деньги дойдут до мастера только после завершения услуги.',
      ly_v_panico:'Тревожная кнопка',
      ly_v_panico_d:'Во время услуги из приложения вы мгновенно оповещаете команду Babyloon.',
      ly_v_garantia:'Гарантия после услуги',
      ly_v_garantia_d:'Если что-то пошло не так, вы заявляете об этом в приложении в срок.',
      ly_v_verificados:'Проверенные мастера',
      ly_v_verificados_d:'Личность, дипломы и налоговые данные проверены до начала работы.',
      ly_pie:'Услуги бронируются в приложении. Здесь вы всё видите и отслеживаете.'
    },

    ar: {
      cargando:'جارٍ التحميل…', p_puntos:'النقاط والمزايا',
      ly_h1:'النقاط والمزايا',
      ly_sub:'ما كسبته من حجوزاتك مع بابيلون، وما تغطّيه كل خدمة.',
      ly_saldo:'نقاطك', ly_equivalen:'تعادل',
      ly_bolsa_regalo:'هدية', ly_bolsa_regalo_d:'صالحة لأي خدمة أو منتج.',
      ly_bolsa_compra:'مشتراة', ly_bolsa_compra_d:'لمنتجات البوتيك فقط.',
      ly_invita:'دعوة وتوفير', ly_copiar:'نسخ', ly_copiado:'تم النسخ',
      ly_referidas:'التسجيلات برمزك', ly_descuento:'خصمك', ly_ganado:'المكتسب',
      ly_cubre:'ما تغطّيه كل خدمة',
      ly_v_seguro:'التأمين مشمول',
      ly_v_seguro_d:'كل خدمة مؤمَّنة ضد الأضرار العرضية في مكان الموعد.',
      ly_v_escrow:'الدفع محتجز',
      ly_v_escrow_d:'لا تصل أموالك إلى الحساب المهني قبل اكتمال الخدمة.',
      ly_v_panico:'زر الطوارئ',
      ly_v_panico_d:'أثناء الخدمة، ومن التطبيق، تنبّه فريق بابيلون فورًا.',
      ly_v_garantia:'ضمان ما بعد الخدمة',
      ly_v_garantia_d:'إذا لم يكن شيء على ما يرام، تطالب به من التطبيق ضمن المهلة.',
      ly_v_verificados:'هوية موثّقة',
      ly_v_verificados_d:'الهوية والشهادات والبيانات الضريبية مُتحقَّق منها قبل السماح بالعمل.',
      ly_pie:'تُحجز الخدمات في التطبيق. وهنا يمكن متابعة كل شيء.'
    },

    zh: {
      cargando:'加载中…', p_puntos:'积分与权益',
      ly_h1:'积分与权益',
      ly_sub:'您在 Babyloon 预约所累积的收益，以及每次服务所涵盖的保障。',
      ly_saldo:'您的积分', ly_equivalen:'价值',
      ly_bolsa_regalo:'赠送', ly_bolsa_regalo_d:'可用于任何服务或商品。',
      ly_bolsa_compra:'购买', ly_bolsa_compra_d:'仅限精品店商品。',
      ly_invita:'邀请好友，享受折扣', ly_copiar:'复制', ly_copiado:'已复制',
      ly_referidas:'已邀请人数', ly_descuento:'您的折扣', ly_ganado:'已获得',
      ly_cubre:'每次服务涵盖什么',
      ly_v_seguro:'含保险',
      ly_v_seguro_d:'每次服务均投保，涵盖预约地点的意外损失。',
      ly_v_escrow:'款项暂存',
      ly_v_escrow_d:'服务完成之前，款项不会支付给专业人员。',
      ly_v_panico:'紧急按钮',
      ly_v_panico_d:'服务期间可在应用内一键通知 Babyloon 团队。',
      ly_v_garantia:'售后保障',
      ly_v_garantia_d:'若有不满意之处，可在服务期限内通过应用提出。',
      ly_v_verificados:'已认证专业人员',
      ly_v_verificados_d:'上岗前已核验身份、资质与税务资料。',
      ly_pie:'服务在应用内预约。您可在此查看并跟踪全部记录。'
    },

    ja: {
      cargando:'読み込み中…', p_puntos:'ポイントと特典',
      ly_h1:'ポイントと特典',
      ly_sub:'Babyloon のご予約で得られたものと、各サービスに含まれる保証です。',
      ly_saldo:'お客様のポイント', ly_equivalen:'相当額',
      ly_bolsa_regalo:'プレゼント分', ly_bolsa_regalo_d:'すべてのサービス・商品にご利用いただけます。',
      ly_bolsa_compra:'購入分', ly_bolsa_compra_d:'ブティック商品のみにご利用いただけます。',
      ly_invita:'紹介して割引', ly_copiar:'コピー', ly_copiado:'コピーしました',
      ly_referidas:'紹介人数', ly_descuento:'お客様の割引', ly_ganado:'獲得額',
      ly_cubre:'各サービスに含まれるもの',
      ly_v_seguro:'保険つき',
      ly_v_seguro_d:'すべてのサービスに、施術場所での偶発的な損害を補償する保険が付きます。',
      ly_v_escrow:'お支払いは一時保留',
      ly_v_escrow_d:'サービス完了までプロにお支払いは渡りません。',
      ly_v_panico:'緊急ボタン',
      ly_v_panico_d:'施術中はアプリから Babyloon チームへ即座に通知できます。',
      ly_v_garantia:'アフター保証',
      ly_v_garantia_d:'仕上がりにご不満があれば、期間内にアプリから申請できます。',
      ly_v_verificados:'認証済みのプロ',
      ly_v_verificados_d:'本人確認・資格・税務情報を確認してから稼働しています。',
      ly_pie:'サービスのご予約はアプリから。ここではすべてを確認・追跡できます。'
    },

    ko: {
      cargando:'불러오는 중…', p_puntos:'포인트와 혜택',
      ly_h1:'포인트와 혜택',
      ly_sub:'Babyloon 예약으로 쌓은 혜택과 모든 서비스에 포함된 보장입니다.',
      ly_saldo:'내 포인트', ly_equivalen:'상당액',
      ly_bolsa_regalo:'적립', ly_bolsa_regalo_d:'모든 서비스와 상품에 사용할 수 있습니다.',
      ly_bolsa_compra:'구매', ly_bolsa_compra_d:'부티크 상품에만 사용할 수 있습니다.',
      ly_invita:'초대하고 할인받기', ly_copiar:'복사', ly_copiado:'복사됨',
      ly_referidas:'초대한 사람', ly_descuento:'내 할인', ly_ganado:'획득',
      ly_cubre:'모든 서비스에 포함된 것',
      ly_v_seguro:'보험 포함',
      ly_v_seguro_d:'모든 서비스에는 방문 장소에서의 우발적 손해를 보장하는 보험이 포함됩니다.',
      ly_v_escrow:'결제 보류',
      ly_v_escrow_d:'서비스가 완료되기 전까지 대금은 전문가에게 전달되지 않습니다.',
      ly_v_panico:'긴급 버튼',
      ly_v_panico_d:'서비스 중 앱에서 Babyloon 팀에 즉시 알릴 수 있습니다.',
      ly_v_garantia:'사후 보증',
      ly_v_garantia_d:'문제가 있었다면 서비스 기간 내에 앱에서 접수할 수 있습니다.',
      ly_v_verificados:'인증된 전문가',
      ly_v_verificados_d:'신분, 자격, 세무 정보를 확인한 뒤에만 일할 수 있습니다.',
      ly_pie:'서비스 예약은 앱에서 합니다. 여기서는 모두 확인하고 추적할 수 있습니다.'
    },

    sv: {
      cargando:'Laddar…', p_puntos:'Poäng och förmåner',
      ly_h1:'Poäng och förmåner',
      ly_sub:'Det du tjänat på att boka med Babyloon, och vad varje tjänst täcker.',
      ly_saldo:'Dina poäng', ly_equivalen:'Motsvarar',
      ly_bolsa_regalo:'Skänkta', ly_bolsa_regalo_d:'Gäller för alla tjänster och produkter.',
      ly_bolsa_compra:'Köpta', ly_bolsa_compra_d:'Endast för produkter i Boutiquen.',
      ly_invita:'Bjud in och spara', ly_copiar:'Kopiera', ly_copiado:'Kopierat',
      ly_referidas:'Inbjudna personer', ly_descuento:'Din rabatt', ly_ganado:'Intjänat',
      ly_cubre:'Vad varje tjänst täcker',
      ly_v_seguro:'Försäkring ingår',
      ly_v_seguro_d:'Varje tjänst är försäkrad mot oavsiktliga skador på platsen för bokningen.',
      ly_v_escrow:'Betalningen hålls kvar',
      ly_v_escrow_d:'Dina pengar når inte proffset förrän tjänsten är klar.',
      ly_v_panico:'Panikknapp',
      ly_v_panico_d:'Under tjänsten larmar du Babyloons team direkt från appen.',
      ly_v_garantia:'Garanti efteråt',
      ly_v_garantia_d:'Blev något inte bra anmäler du det i appen inom tjänstens tidsfrist.',
      ly_v_verificados:'Verifierade proffs',
      ly_v_verificados_d:'Identitet, utbildning och skatteuppgifter kontrolleras innan de får arbeta.',
      ly_pie:'Tjänster bokas i appen. Här kan du se och följa allt.'
    }

  });
})();

/* ═══════════════════════════════════════════════════════════════
   Babyloon · Los pedidos de la boutique — bloque 15.7
   ───────────────────────────────────────────────────────────────
   Catorce claves más, en los dieciséis idiomas.

   POR QUÉ HAY QUE TRADUCIRLAS AHORA
   Hasta hoy `cliente.html` leía la tabla `boutique_orders` y
   pintaba los estados con literales en español dentro del propio
   fichero. Daba igual que estuvieran sin traducir, porque esa
   lista SIEMPRE SALÍA VACÍA: los pedidos de verdad viven en
   `boutique_orders_pro`, una fila por producto, que es lo que
   mueve el envío y lo que lee la app.

   Medido el 23 de septiembre contra producción, con la clienta
   `196483c2`: la app le enseña 14 pedidos; la web le decía «Aún
   no tienes pedidos».

   Ahora la web llama a `boutique_my_orders`, la MISMA función que
   la app. Y en cuanto la lista enseña algo, tiene que enseñarlo
   en el idioma de quien mira.

   SOBRE «Llega entre el … y el …»
   La ventana la calcula el servidor sumando los días de envío del
   producto a la fecha de compra. Sólo se enseña mientras la fecha
   final esté por delante: prometer una entrega para una fecha ya
   pasada es peor que no decir nada.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({
    /* español */
    es: {
      pd_pagado:'Pagado',
      pd_preparando:'Preparando',
      pd_enviado:'Enviado',
      pd_entregado:'Entregado',
      pd_cancelado:'Cancelado',
      pd_reembolsado:'Reembolsado',
      pd_seguir:'Seguir envío',
      pd_track:'Seguimiento',
      pd_llega:'Llega entre el {a} y el {b}',
      pd_vacio:'Aún no tienes pedidos.',
      pd_ir:'Ir a la Boutique',
      pd_error:'No pudimos cargar tus pedidos.',
      pd_uds:'uds.',
      pd_prep:'En preparación'
    },

    /* English */
    en: {
      pd_pagado:'Paid',
      pd_preparando:'Preparing',
      pd_enviado:'Shipped',
      pd_entregado:'Delivered',
      pd_cancelado:'Cancelled',
      pd_reembolsado:'Refunded',
      pd_seguir:'Track shipment',
      pd_track:'Tracking',
      pd_llega:'Arrives between {a} and {b}',
      pd_vacio:'You have no orders yet.',
      pd_ir:'Go to the Boutique',
      pd_error:'We could not load your orders.',
      pd_uds:'units',
      pd_prep:'Being prepared'
    },

    /* português */
    pt: {
      pd_pagado:'Pago',
      pd_preparando:'A preparar',
      pd_enviado:'Enviado',
      pd_entregado:'Entregue',
      pd_cancelado:'Cancelado',
      pd_reembolsado:'Reembolsado',
      pd_seguir:'Seguir envio',
      pd_track:'Rastreio',
      pd_llega:'Chega entre {a} e {b}',
      pd_vacio:'Ainda não tens encomendas.',
      pd_ir:'Ir à Boutique',
      pd_error:'Não conseguimos carregar as tuas encomendas.',
      pd_uds:'un.',
      pd_prep:'Em preparação'
    },

    /* français */
    fr: {
      pd_pagado:'Payé',
      pd_preparando:'En préparation',
      pd_enviado:'Expédié',
      pd_entregado:'Livré',
      pd_cancelado:'Annulé',
      pd_reembolsado:'Remboursé',
      pd_seguir:'Suivre l’envoi',
      pd_track:'Suivi',
      pd_llega:'Arrive entre le {a} et le {b}',
      pd_vacio:'Vous n’avez pas encore de commande.',
      pd_ir:'Aller à la Boutique',
      pd_error:'Nous n’avons pas pu charger vos commandes.',
      pd_uds:'unités',
      pd_prep:'En préparation'
    },

    /* Deutsch */
    de: {
      pd_pagado:'Bezahlt',
      pd_preparando:'In Vorbereitung',
      pd_enviado:'Versandt',
      pd_entregado:'Zugestellt',
      pd_cancelado:'Storniert',
      pd_reembolsado:'Erstattet',
      pd_seguir:'Sendung verfolgen',
      pd_track:'Sendungsnummer',
      pd_llega:'Kommt zwischen {a} und {b}',
      pd_vacio:'Du hast noch keine Bestellungen.',
      pd_ir:'Zur Boutique',
      pd_error:'Deine Bestellungen konnten nicht geladen werden.',
      pd_uds:'Stk.',
      pd_prep:'In Vorbereitung'
    },

    /* italiano */
    it: {
      pd_pagado:'Pagato',
      pd_preparando:'In preparazione',
      pd_enviado:'Spedito',
      pd_entregado:'Consegnato',
      pd_cancelado:'Annullato',
      pd_reembolsado:'Rimborsato',
      pd_seguir:'Segui la spedizione',
      pd_track:'Tracciamento',
      pd_llega:'Arriva tra il {a} e il {b}',
      pd_vacio:'Non hai ancora ordini.',
      pd_ir:'Vai alla Boutique',
      pd_error:'Non siamo riusciti a caricare i tuoi ordini.',
      pd_uds:'pz.',
      pd_prep:'In preparazione'
    },

    /* Nederlands */
    nl: {
      pd_pagado:'Betaald',
      pd_preparando:'In voorbereiding',
      pd_enviado:'Verzonden',
      pd_entregado:'Bezorgd',
      pd_cancelado:'Geannuleerd',
      pd_reembolsado:'Terugbetaald',
      pd_seguir:'Zending volgen',
      pd_track:'Track & trace',
      pd_llega:'Komt tussen {a} en {b}',
      pd_vacio:'Je hebt nog geen bestellingen.',
      pd_ir:'Naar de Boutique',
      pd_error:'We konden je bestellingen niet laden.',
      pd_uds:'stuks',
      pd_prep:'In voorbereiding'
    },

    /* polski */
    pl: {
      pd_pagado:'Opłacone',
      pd_preparando:'W przygotowaniu',
      pd_enviado:'Wysłane',
      pd_entregado:'Dostarczone',
      pd_cancelado:'Anulowane',
      pd_reembolsado:'Zwrócone',
      pd_seguir:'Śledź przesyłkę',
      pd_track:'Numer przesyłki',
      pd_llega:'Dotrze między {a} a {b}',
      pd_vacio:'Nie masz jeszcze zamówień.',
      pd_ir:'Przejdź do Boutique',
      pd_error:'Nie udało się wczytać Twoich zamówień.',
      pd_uds:'szt.',
      pd_prep:'W przygotowaniu'
    },

    /* ελληνικά */
    el: {
      pd_pagado:'Πληρωμένη',
      pd_preparando:'Σε προετοιμασία',
      pd_enviado:'Απεστάλη',
      pd_entregado:'Παραδόθηκε',
      pd_cancelado:'Ακυρώθηκε',
      pd_reembolsado:'Επιστροφή χρημάτων',
      pd_seguir:'Παρακολούθηση αποστολής',
      pd_track:'Κωδικός αποστολής',
      pd_llega:'Φτάνει μεταξύ {a} και {b}',
      pd_vacio:'Δεν έχετε παραγγελίες ακόμη.',
      pd_ir:'Στη Boutique',
      pd_error:'Δεν μπορέσαμε να φορτώσουμε τις παραγγελίες σας.',
      pd_uds:'τεμ.',
      pd_prep:'Σε προετοιμασία'
    },

    /* magyar */
    hu: {
      pd_pagado:'Kifizetve',
      pd_preparando:'Előkészítés alatt',
      pd_enviado:'Elküldve',
      pd_entregado:'Kézbesítve',
      pd_cancelado:'Törölve',
      pd_reembolsado:'Visszatérítve',
      pd_seguir:'Küldemény követése',
      pd_track:'Nyomkövetés',
      pd_llega:'{a} és {b} között érkezik',
      pd_vacio:'Még nincs rendelésed.',
      pd_ir:'Irány a Boutique',
      pd_error:'Nem sikerült betölteni a rendeléseidet.',
      pd_uds:'db',
      pd_prep:'Előkészítés alatt'
    },

    /* русский */
    ru: {
      pd_pagado:'Оплачен',
      pd_preparando:'Готовится',
      pd_enviado:'Отправлен',
      pd_entregado:'Доставлен',
      pd_cancelado:'Отменён',
      pd_reembolsado:'Возвращён',
      pd_seguir:'Отследить посылку',
      pd_track:'Трек-номер',
      pd_llega:'Придёт между {a} и {b}',
      pd_vacio:'У вас пока нет заказов.',
      pd_ir:'Перейти в Boutique',
      pd_error:'Не удалось загрузить ваши заказы.',
      pd_uds:'шт.',
      pd_prep:'Готовится'
    },

    /* العربية */
    ar: {
      pd_pagado:'مدفوع',
      pd_preparando:'قيد التحضير',
      pd_enviado:'تم الشحن',
      pd_entregado:'تم التسليم',
      pd_cancelado:'ملغى',
      pd_reembolsado:'مُسترد',
      pd_seguir:'تتبّع الشحنة',
      pd_track:'رقم التتبّع',
      pd_llega:'يصل بين {a} و{b}',
      pd_vacio:'ليس لديك طلبات بعد.',
      pd_ir:'إلى البوتيك',
      pd_error:'تعذّر تحميل طلباتك.',
      pd_uds:'قطعة',
      pd_prep:'قيد التحضير'
    },

    /* 中文 */
    zh: {
      pd_pagado:'已付款',
      pd_preparando:'备货中',
      pd_enviado:'已发货',
      pd_entregado:'已送达',
      pd_cancelado:'已取消',
      pd_reembolsado:'已退款',
      pd_seguir:'查看物流',
      pd_track:'运单号',
      pd_llega:'预计 {a} 至 {b} 送达',
      pd_vacio:'你还没有订单。',
      pd_ir:'前往精品店',
      pd_error:'无法加载你的订单。',
      pd_uds:'件',
      pd_prep:'备货中'
    },

    /* 日本語 */
    ja: {
      pd_pagado:'支払い済み',
      pd_preparando:'準備中',
      pd_enviado:'発送済み',
      pd_entregado:'配達済み',
      pd_cancelado:'キャンセル',
      pd_reembolsado:'返金済み',
      pd_seguir:'配送を追跡',
      pd_track:'追跡番号',
      pd_llega:'{a}〜{b}に到着予定',
      pd_vacio:'まだご注文はありません。',
      pd_ir:'ブティックへ',
      pd_error:'ご注文を読み込めませんでした。',
      pd_uds:'点',
      pd_prep:'準備中'
    },

    /* 한국어 */
    ko: {
      pd_pagado:'결제 완료',
      pd_preparando:'준비 중',
      pd_enviado:'발송됨',
      pd_entregado:'배송 완료',
      pd_cancelado:'취소됨',
      pd_reembolsado:'환불됨',
      pd_seguir:'배송 조회',
      pd_track:'운송장 번호',
      pd_llega:'{a}~{b} 도착 예정',
      pd_vacio:'아직 주문이 없습니다.',
      pd_ir:'부티크로 가기',
      pd_error:'주문을 불러오지 못했습니다.',
      pd_uds:'개',
      pd_prep:'준비 중'
    },

    /* svenska */
    sv: {
      pd_pagado:'Betald',
      pd_preparando:'Förbereds',
      pd_enviado:'Skickad',
      pd_entregado:'Levererad',
      pd_cancelado:'Avbruten',
      pd_reembolsado:'Återbetald',
      pd_seguir:'Följ försändelsen',
      pd_track:'Spårning',
      pd_llega:'Kommer mellan {a} och {b}',
      pd_vacio:'Du har inga beställningar än.',
      pd_ir:'Till Boutique',
      pd_error:'Vi kunde inte ladda dina beställningar.',
      pd_uds:'st.',
      pd_prep:'Förbereds'
    }

  });
})();

/* ═══════════════════════════════════════════════════════════════
   Babyloon · 61.64 · El descuento de quien invita
   ───────────────────────────────────────────────────────────────
   Seis claves más, en los dieciséis idiomas.

   Decisión 31 de Andrés: quien invita gana un descuento para UN
   servicio, que se gasta al aceptar una oferta y caduca. Cuánto y
   cuántos días lo fija el equipo en el panel (de salida, un 10 %
   durante 90 días), así que la regla lleva huecos —{pct}, {dias}—
   y la página los rellena con lo que dice el servidor
   (mis_invitaciones). Antes: un 5 % por persona, para siempre y
   en todos sus servicios, hasta el 20 %.

   Neutro, como toda la web: «personas invitadas», nunca
   «invitadas»; y en árabe, sin imperativos con género.

   61.72 · Se gana cuando la persona invitada completa su primer
   servicio (decisión 45): la regla y «aquí verás tu descuento» lo
   dicen, y ly_esperan cuenta las que todavía no lo han completado.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({
    es: {
      ly_regla:'Por cada persona que se registre con tu código y complete su primer servicio, un {pct} % de descuento en uno de tus servicios. Cada uno dura {dias} días.',
      ly_para_usar:'Descuentos para usar',
      ly_usados:'Ya usados',
      ly_esperan:'Esperan su primer servicio',
      ly_dto_hasta:'{pct} % en un servicio · hasta el {fecha}',
      ly_sin_dtos:'Cuando alguien que se registró con tu código complete su primer servicio, aquí verás tu descuento.',
      ly_se_gasta:'Se gasta al aceptar una oferta en la app, y se aplica tu mejor descuento: no se suman.'
    },
    en: {
      ly_regla:'For each person who signs up with your code and completes their first service, you get {pct}% off one of your services. Each one lasts {dias} days.',
      ly_para_usar:'Discounts to use',
      ly_usados:'Already used',
      ly_esperan:'Awaiting their first service',
      ly_dto_hasta:'{pct}% off one service · until {fecha}',
      ly_sin_dtos:'When someone who signed up with your code completes their first service, your discount will appear here.',
      ly_se_gasta:'It’s used when you accept an offer in the app, and your best discount applies: they don’t stack.'
    },
    pt: {
      ly_regla:'Por cada pessoa que se registe com o seu código e conclua o primeiro serviço, recebe {pct}% de desconto num dos seus serviços. Cada um dura {dias} dias.',
      ly_para_usar:'Descontos por usar',
      ly_usados:'Já usados',
      ly_esperan:'Aguardam o primeiro serviço',
      ly_dto_hasta:'{pct}% num serviço · até {fecha}',
      ly_sin_dtos:'Quando alguém que se registou com o seu código concluir o primeiro serviço, o seu desconto aparece aqui.',
      ly_se_gasta:'É usado quando aceita uma oferta na app, e vale o seu melhor desconto: não se somam.'
    },
    fr: {
      ly_regla:'Pour chaque personne qui s’inscrit avec votre code et termine son premier service, vous obtenez {pct} % de réduction sur l’un de vos services. Chacune est valable {dias} jours.',
      ly_para_usar:'Réductions à utiliser',
      ly_usados:'Déjà utilisées',
      ly_esperan:'En attente du premier service',
      ly_dto_hasta:'{pct} % sur un service · jusqu’au {fecha}',
      ly_sin_dtos:'Quand une personne inscrite avec votre code termine son premier service, votre réduction apparaît ici.',
      ly_se_gasta:'Elle est utilisée quand vous acceptez une offre dans l’application, et c’est votre meilleure réduction qui s’applique : elles ne se cumulent pas.'
    },
    de: {
      ly_regla:'Für jede Person, die sich mit Ihrem Code registriert und ihre erste Leistung abschließt, erhalten Sie {pct} % Rabatt auf eine Ihrer Leistungen. Jeder Rabatt gilt {dias} Tage.',
      ly_para_usar:'Offene Rabatte',
      ly_usados:'Bereits eingelöst',
      ly_esperan:'Warten auf die erste Leistung',
      ly_dto_hasta:'{pct} % auf eine Leistung · bis {fecha}',
      ly_sin_dtos:'Sobald eine Person, die sich mit Ihrem Code registriert hat, ihre erste Leistung abschließt, sehen Sie Ihren Rabatt hier.',
      ly_se_gasta:'Er wird eingelöst, wenn Sie in der App ein Angebot annehmen, und es gilt Ihr bester Rabatt: Rabatte werden nicht addiert.'
    },
    it: {
      ly_regla:'Per ogni persona che si iscrive con il tuo codice e completa il primo servizio, ricevi il {pct}% di sconto su uno dei tuoi servizi. Ogni sconto vale {dias} giorni.',
      ly_para_usar:'Sconti da usare',
      ly_usados:'Già usati',
      ly_esperan:'In attesa del primo servizio',
      ly_dto_hasta:'{pct}% su un servizio · fino al {fecha}',
      ly_sin_dtos:'Quando una persona iscritta con il tuo codice completa il primo servizio, qui vedrai il tuo sconto.',
      ly_se_gasta:'Si usa quando accetti un’offerta nell’app, e vale il tuo sconto migliore: non si sommano.'
    },
    nl: {
      ly_regla:'Voor elke persoon die zich met jouw code aanmeldt en de eerste dienst afrondt, krijg je {pct}% korting op een van je diensten. Elke korting is {dias} dagen geldig.',
      ly_para_usar:'Te gebruiken kortingen',
      ly_usados:'Al gebruikt',
      ly_esperan:'Wachten op de eerste dienst',
      ly_dto_hasta:'{pct}% op één dienst · tot {fecha}',
      ly_sin_dtos:'Zodra iemand die zich met jouw code heeft aangemeld de eerste dienst afrondt, zie je hier je korting.',
      ly_se_gasta:'Je gebruikt hem als je in de app een aanbod accepteert, en je beste korting geldt: kortingen worden niet opgeteld.'
    },
    pl: {
      ly_regla:'Za każdą osobę, która zarejestruje się z Twoim kodem i skorzysta z pierwszej usługi, otrzymujesz {pct}% rabatu na jedną usługę. Każdy rabat jest ważny {dias} dni.',
      ly_para_usar:'Rabaty do wykorzystania',
      ly_usados:'Już wykorzystane',
      ly_esperan:'Czekają na pierwszą usługę',
      ly_dto_hasta:'{pct}% na jedną usługę · do {fecha}',
      ly_sin_dtos:'Gdy osoba zarejestrowana z Twoim kodem skorzysta z pierwszej usługi, tutaj zobaczysz swój rabat.',
      ly_se_gasta:'Wykorzystujesz go, akceptując ofertę w aplikacji, i obowiązuje Twój najwyższy rabat: rabaty się nie sumują.'
    },
    el: {
      ly_regla:'Για κάθε άτομο που εγγράφεται με τον κωδικό σου και ολοκληρώνει την πρώτη του υπηρεσία, παίρνεις έκπτωση {pct}% σε μία από τις υπηρεσίες σου. Κάθε έκπτωση ισχύει {dias} ημέρες.',
      ly_para_usar:'Εκπτώσεις προς χρήση',
      ly_usados:'Ήδη χρησιμοποιημένες',
      ly_esperan:'Περιμένουν την πρώτη υπηρεσία',
      ly_dto_hasta:'{pct}% σε μία υπηρεσία · έως {fecha}',
      ly_sin_dtos:'Όταν ένα άτομο που εγγράφηκε με τον κωδικό σου ολοκληρώσει την πρώτη του υπηρεσία, εδώ θα δεις την έκπτωσή σου.',
      ly_se_gasta:'Χρησιμοποιείται όταν αποδέχεσαι μια προσφορά στην εφαρμογή, και ισχύει η καλύτερη έκπτωσή σου: δεν αθροίζονται.'
    },
    hu: {
      ly_regla:'Minden személyért, aki a kódoddal regisztrál és igénybe veszi az első szolgáltatását, {pct}% kedvezményt kapsz az egyik szolgáltatásodra. Mindegyik {dias} napig érvényes.',
      ly_para_usar:'Felhasználható kedvezmények',
      ly_usados:'Már felhasznált',
      ly_esperan:'Az első szolgáltatásra várnak',
      ly_dto_hasta:'{pct}% egy szolgáltatásra · lejár: {fecha}',
      ly_sin_dtos:'Amikor valaki, aki a kódoddal regisztrált, igénybe veszi az első szolgáltatását, itt látod a kedvezményedet.',
      ly_se_gasta:'Akkor használod fel, amikor az appban elfogadsz egy ajánlatot, és mindig a legjobb kedvezményed érvényes: nem adódnak össze.'
    },
    ru: {
      ly_regla:'За каждого, кто зарегистрируется по вашему коду и получит первую услугу, вы получаете скидку {pct}% на одну услугу. Каждая скидка действует {dias} дн.',
      ly_para_usar:'Доступные скидки',
      ly_usados:'Уже использованы',
      ly_esperan:'Ждут первой услуги',
      ly_dto_hasta:'{pct}% на одну услугу · до {fecha}',
      ly_sin_dtos:'Когда по вашему коду кто-то зарегистрируется и получит первую услугу, здесь появится ваша скидка.',
      ly_se_gasta:'Скидка используется, когда вы принимаете предложение в приложении, и применяется самая большая из ваших скидок: они не суммируются.'
    },
    ar: {
      ly_regla:'عن كل شخص يسجّل برمزك ويُكمل أول خدمة: خصم {pct}% على إحدى خدماتك، صالح لمدة {dias} يومًا.',
      ly_para_usar:'خصومات متاحة',
      ly_usados:'مُستخدمة',
      ly_esperan:'بانتظار أول خدمة',
      ly_dto_hasta:'خصم {pct}% على خدمة واحدة · حتى {fecha}',
      ly_sin_dtos:'عند اكتمال أول خدمة لشخص سجّل برمزك، يظهر خصمك هنا.',
      ly_se_gasta:'يُستخدم عند قبول عرض في التطبيق، ويُطبَّق أفضل خصم لديك: الخصومات لا تُجمع.'
    },
    zh: {
      ly_regla:'每有一人使用您的邀请码注册并完成首次服务，您的一次服务即可享受 {pct}% 折扣。每个折扣有效期为 {dias} 天。',
      ly_para_usar:'可用折扣',
      ly_usados:'已使用',
      ly_esperan:'等待首次服务',
      ly_dto_hasta:'一次服务 {pct}% 折扣 · 有效期至 {fecha}',
      ly_sin_dtos:'使用您的邀请码注册的人完成首次服务后，您的折扣会显示在这里。',
      ly_se_gasta:'在应用中接受报价时使用，并只适用您最大的那个折扣：折扣不叠加。'
    },
    ja: {
      ly_regla:'あなたのコードで登録した人が初めてのサービスを完了するたびに、サービス1回分が{pct}%オフになります。有効期間はそれぞれ{dias}日です。',
      ly_para_usar:'使える割引',
      ly_usados:'使用済み',
      ly_esperan:'初回サービス待ち',
      ly_dto_hasta:'サービス1回分 {pct}%オフ · {fecha}まで',
      ly_sin_dtos:'あなたのコードで登録した人が初めてのサービスを完了すると、ここに割引が表示されます。',
      ly_se_gasta:'アプリでオファーを承諾すると使われます。割引は最も大きいものが1つだけ適用され、合算されません。'
    },
    ko: {
      ly_regla:'회원님의 코드로 가입한 사람이 첫 서비스를 완료할 때마다 서비스 1회 {pct}% 할인을 받습니다. 각 할인은 {dias}일 동안 유효합니다.',
      ly_para_usar:'사용 가능한 할인',
      ly_usados:'사용 완료',
      ly_esperan:'첫 서비스 대기',
      ly_dto_hasta:'서비스 1회 {pct}% 할인 · {fecha}까지',
      ly_sin_dtos:'회원님의 코드로 가입한 사람이 첫 서비스를 완료하면 여기에 할인이 표시됩니다.',
      ly_se_gasta:'앱에서 제안을 수락할 때 사용되며, 가장 큰 할인 하나만 적용됩니다. 할인은 합산되지 않습니다.'
    },
    sv: {
      ly_regla:'För varje person som registrerar sig med din kod och slutför sin första tjänst får du {pct} % rabatt på en av dina tjänster. Varje rabatt gäller i {dias} dagar.',
      ly_para_usar:'Rabatter att använda',
      ly_usados:'Redan använda',
      ly_esperan:'Väntar på första tjänsten',
      ly_dto_hasta:'{pct} % på en tjänst · till och med {fecha}',
      ly_sin_dtos:'När någon som registrerat sig med din kod slutför sin första tjänst visas din rabatt här.',
      ly_se_gasta:'Den används när du accepterar ett erbjudande i appen, och din bästa rabatt gäller: de läggs inte ihop.'
    }
  });

  /* 61.73 · La tercera bolsa —los puntos de sus devoluciones— y adónde
     quiere sus devoluciones si no dice otra cosa (decisión 48). Diez claves
     en los dieciséis idiomas, neutras. */
  BBL.extend({
    es: {
      ly_bolsa_devuelto:'De tus devoluciones',
      ly_bolsa_devuelto_d:'Valen para todo y se usan los primeros.',
      ly_dev_tit:'Tus devoluciones',
      ly_dev_d:'Cuando se te devuelva algo pagado con tarjeta o PayPal —una reserva cancelada o un pedido de la Boutique—, dónde lo quieres si no dices otra cosa. Al cancelar una reserva en la app también puedes elegirlo.',
      ly_dev_monedero:'En mi monedero, al momento',
      ly_dev_monedero_d:'En puntos de tus devoluciones: valen para todo y no se cambian por dinero.',
      ly_dev_tarjeta:'Por donde pagué',
      ly_dev_tarjeta_d:'A tu tarjeta o a PayPal, en 5-10 días hábiles según tu banco.',
      ly_dev_guardada:'Guardado.',
      ly_dev_error:'No se ha podido guardar. Inténtalo de nuevo.'
    },
    en: {
      ly_bolsa_devuelto:'From refunds',
      ly_bolsa_devuelto_d:'Valid for everything and used first.',
      ly_dev_tit:'Your refunds',
      ly_dev_d:'When something you paid by card or PayPal is refunded — a cancelled booking or a Boutique order — where you want it unless you say otherwise. You can also choose when cancelling a booking in the app.',
      ly_dev_monedero:'To my wallet, right away',
      ly_dev_monedero_d:'As refund points: valid for everything and not exchangeable for money.',
      ly_dev_tarjeta:'Back to how I paid',
      ly_dev_tarjeta_d:'To your card or PayPal, in 5-10 business days depending on your bank.',
      ly_dev_guardada:'Saved.',
      ly_dev_error:'Couldn’t save. Please try again.'
    },
    pt: {
      ly_bolsa_devuelto:'Das devoluções',
      ly_bolsa_devuelto_d:'Valem para tudo e são usados primeiro.',
      ly_dev_tit:'As suas devoluções',
      ly_dev_d:'Quando lhe for devolvido algo pago com cartão ou PayPal — uma reserva cancelada ou uma encomenda da Boutique —, onde o quer receber, salvo indicação em contrário. Ao cancelar uma reserva na app também pode escolher.',
      ly_dev_monedero:'Na minha carteira, de imediato',
      ly_dev_monedero_d:'Em pontos das suas devoluções: valem para tudo e não se trocam por dinheiro.',
      ly_dev_tarjeta:'Pelo meio de pagamento usado',
      ly_dev_tarjeta_d:'Para o seu cartão ou PayPal, em 5-10 dias úteis, conforme o seu banco.',
      ly_dev_guardada:'Guardado.',
      ly_dev_error:'Não foi possível guardar. Tente novamente.'
    },
    fr: {
      ly_bolsa_devuelto:'Remboursements',
      ly_bolsa_devuelto_d:'Valables pour tout et utilisés en premier.',
      ly_dev_tit:'Vos remboursements',
      ly_dev_d:'Quand quelque chose payé par carte ou PayPal vous est remboursé — une réservation annulée ou une commande de la Boutique —, où vous le souhaitez, sauf indication contraire. Vous pouvez aussi le choisir en annulant une réservation dans l’app.',
      ly_dev_monedero:'Dans mon portefeuille, tout de suite',
      ly_dev_monedero_d:'En points de remboursement : valables pour tout et non échangeables contre de l’argent.',
      ly_dev_tarjeta:'Sur mon moyen de paiement',
      ly_dev_tarjeta_d:'Sur votre carte ou PayPal, sous 5-10 jours ouvrés selon votre banque.',
      ly_dev_guardada:'Enregistré.',
      ly_dev_error:'Impossible d’enregistrer. Veuillez réessayer.'
    },
    de: {
      ly_bolsa_devuelto:'Aus Erstattungen',
      ly_bolsa_devuelto_d:'Gültig für alles und werden zuerst verwendet.',
      ly_dev_tit:'Ihre Erstattungen',
      ly_dev_d:'Wenn etwas mit Karte oder PayPal Bezahltes erstattet wird – eine stornierte Buchung oder eine Boutique-Bestellung –, wohin es gehen soll, sofern Sie nichts anderes angeben. Beim Stornieren in der App können Sie es auch wählen.',
      ly_dev_monedero:'In mein Wallet, sofort',
      ly_dev_monedero_d:'Als Punkte aus Erstattungen: gültig für alles, nicht in Geld umtauschbar.',
      ly_dev_tarjeta:'Auf meine Zahlungsart',
      ly_dev_tarjeta_d:'Auf Ihre Karte oder PayPal, je nach Bank in 5-10 Werktagen.',
      ly_dev_guardada:'Gespeichert.',
      ly_dev_error:'Konnte nicht gespeichert werden. Bitte erneut versuchen.'
    },
    it: {
      ly_bolsa_devuelto:'Dai rimborsi',
      ly_bolsa_devuelto_d:'Valgono per tutto e si usano per primi.',
      ly_dev_tit:'I tuoi rimborsi',
      ly_dev_d:'Quando ti viene rimborsato qualcosa pagato con carta o PayPal — una prenotazione annullata o un ordine della Boutique —, dove lo vuoi, salvo diversa indicazione. Puoi sceglierlo anche quando annulli una prenotazione nell’app.',
      ly_dev_monedero:'Nel mio portafoglio, subito',
      ly_dev_monedero_d:'In punti dei rimborsi: valgono per tutto e non si convertono in denaro.',
      ly_dev_tarjeta:'Sul metodo con cui ho pagato',
      ly_dev_tarjeta_d:'Sulla tua carta o su PayPal, in 5-10 giorni lavorativi a seconda della banca.',
      ly_dev_guardada:'Salvato.',
      ly_dev_error:'Impossibile salvare. Riprova.'
    },
    nl: {
      ly_bolsa_devuelto:'Uit terugbetalingen',
      ly_bolsa_devuelto_d:'Geldig voor alles en worden als eerste gebruikt.',
      ly_dev_tit:'Je terugbetalingen',
      ly_dev_d:'Als iets wat je met kaart of PayPal hebt betaald wordt terugbetaald – een geannuleerde boeking of een Boetiek-bestelling – waar je het wilt, tenzij je iets anders aangeeft. Bij het annuleren van een boeking in de app kun je het ook kiezen.',
      ly_dev_monedero:'In mijn tegoed, meteen',
      ly_dev_monedero_d:'Als terugbetalingspunten: geldig voor alles en niet in te wisselen voor geld.',
      ly_dev_tarjeta:'Terug naar mijn betaalmethode',
      ly_dev_tarjeta_d:'Naar je kaart of PayPal, binnen 5-10 werkdagen, afhankelijk van je bank.',
      ly_dev_guardada:'Opgeslagen.',
      ly_dev_error:'Opslaan is niet gelukt. Probeer het opnieuw.'
    },
    pl: {
      ly_bolsa_devuelto:'Ze zwrotów',
      ly_bolsa_devuelto_d:'Ważne na wszystko i wykorzystywane w pierwszej kolejności.',
      ly_dev_tit:'Twoje zwroty',
      ly_dev_d:'Gdy zwracamy coś opłaconego kartą lub PayPal — anulowaną rezerwację albo zamówienie z Butiku — gdzie chcesz to otrzymać, jeśli nie wskażesz inaczej. Możesz to też wybrać, anulując rezerwację w aplikacji.',
      ly_dev_monedero:'Do mojego portfela, od razu',
      ly_dev_monedero_d:'W punktach ze zwrotów: ważne na wszystko i niewymienialne na pieniądze.',
      ly_dev_tarjeta:'Na moją metodę płatności',
      ly_dev_tarjeta_d:'Na kartę lub PayPal, w ciągu 5-10 dni roboczych, zależnie od banku.',
      ly_dev_guardada:'Zapisano.',
      ly_dev_error:'Nie udało się zapisać. Spróbuj ponownie.'
    },
    el: {
      ly_bolsa_devuelto:'Από επιστροφές',
      ly_bolsa_devuelto_d:'Ισχύουν για όλα και χρησιμοποιούνται πρώτοι.',
      ly_dev_tit:'Οι επιστροφές σου',
      ly_dev_d:'Όταν σου επιστρέφεται κάτι που πληρώθηκε με κάρτα ή PayPal — μια ακυρωμένη κράτηση ή μια παραγγελία της Μπουτίκ — πού το θέλεις, αν δεν πεις κάτι άλλο. Μπορείς να το επιλέξεις και όταν ακυρώνεις μια κράτηση στην εφαρμογή.',
      ly_dev_monedero:'Στο πορτοφόλι μου, αμέσως',
      ly_dev_monedero_d:'Σε πόντους επιστροφής: ισχύουν για όλα και δεν ανταλλάσσονται με χρήματα.',
      ly_dev_tarjeta:'Στον τρόπο πληρωμής μου',
      ly_dev_tarjeta_d:'Στην κάρτα σου ή στο PayPal, σε 5-10 εργάσιμες ημέρες ανάλογα με την τράπεζά σου.',
      ly_dev_guardada:'Αποθηκεύτηκε.',
      ly_dev_error:'Δεν ήταν δυνατή η αποθήκευση. Δοκίμασε ξανά.'
    },
    hu: {
      ly_bolsa_devuelto:'Visszatérítésekből',
      ly_bolsa_devuelto_d:'Mindenre érvényesek, és elsőként használjuk fel őket.',
      ly_dev_tit:'Visszatérítéseid',
      ly_dev_d:'Ha valamit, amit kártyával vagy PayPallal fizettél, visszatérítünk – egy lemondott foglalást vagy egy Butik-rendelést –, hová kéred, ha mást nem mondasz. Foglalás lemondásakor az alkalmazásban is választhatsz.',
      ly_dev_monedero:'A pénztárcámba, azonnal',
      ly_dev_monedero_d:'Visszatérítési pontokban: mindenre érvényesek, és nem válthatók pénzre.',
      ly_dev_tarjeta:'A fizetési módomra',
      ly_dev_tarjeta_d:'A kártyádra vagy PayPalra, a bankodtól függően 5-10 munkanapon belül.',
      ly_dev_guardada:'Mentve.',
      ly_dev_error:'Nem sikerült menteni. Próbáld újra.'
    },
    ru: {
      ly_bolsa_devuelto:'За возвраты',
      ly_bolsa_devuelto_d:'Действуют на всё и списываются первыми.',
      ly_dev_tit:'Ваши возвраты',
      ly_dev_d:'Куда вернуть оплаченное картой или PayPal — отменённую бронь или заказ в Бутике, — если вы не укажете иное. Выбрать можно и при отмене брони в приложении.',
      ly_dev_monedero:'В мой кошелёк, сразу',
      ly_dev_monedero_d:'Баллами за возврат: действуют на всё и не обмениваются на деньги.',
      ly_dev_tarjeta:'Туда, откуда платили',
      ly_dev_tarjeta_d:'На карту или PayPal, за 5-10 рабочих дней — зависит от банка.',
      ly_dev_guardada:'Сохранено.',
      ly_dev_error:'Не удалось сохранить. Попробуйте ещё раз.'
    },
    ar: {
      ly_bolsa_devuelto:'مستردة',
      ly_bolsa_devuelto_d:'صالحة لكل شيء وتُستخدم أولًا.',
      ly_dev_tit:'المبالغ المستردة',
      ly_dev_d:'عند استرداد مبلغ مدفوع بالبطاقة أو PayPal — حجز ملغى أو طلب من البوتيك —: إلى أين يُعاد ما لم يُحدَّد غير ذلك. يمكن الاختيار أيضًا عند إلغاء حجز في التطبيق.',
      ly_dev_monedero:'إلى محفظتي، فورًا',
      ly_dev_monedero_d:'على شكل نقاط مستردة: صالحة لكل شيء ولا تُستبدل بالمال.',
      ly_dev_tarjeta:'إلى وسيلة الدفع',
      ly_dev_tarjeta_d:'إلى بطاقتك أو PayPal، خلال 5-10 أيام عمل حسب مصرفك.',
      ly_dev_guardada:'تم الحفظ.',
      ly_dev_error:'تعذّر الحفظ. يُرجى المحاولة مرة أخرى.'
    },
    zh: {
      ly_bolsa_devuelto:'退款',
      ly_bolsa_devuelto_d:'可用于任何消费，优先使用。',
      ly_dev_tit:'退款方式',
      ly_dev_d:'用银行卡或 PayPal 支付的款项（已取消的预约或精品店订单）退款时，若无另行指定，退到哪里。在应用中取消预约时也可以选择。',
      ly_dev_monedero:'退到我的钱包，立即到账',
      ly_dev_monedero_d:'以退款积分形式：可用于任何消费，不能兑换为现金。',
      ly_dev_tarjeta:'原路退回',
      ly_dev_tarjeta_d:'退到您的银行卡或 PayPal，视银行而定，5-10个工作日内到账。',
      ly_dev_guardada:'已保存。',
      ly_dev_error:'无法保存，请重试。'
    },
    ja: {
      ly_bolsa_devuelto:'返金分',
      ly_bolsa_devuelto_d:'すべてにご利用いただけ、最初に使われます。',
      ly_dev_tit:'返金の受け取り先',
      ly_dev_d:'カードまたはPayPalで支払ったもの（キャンセルした予約やブティックの注文）が返金されるときの、通常の受け取り先です。アプリで予約をキャンセルするときにも選べます。',
      ly_dev_monedero:'ウォレットへ（すぐに）',
      ly_dev_monedero_d:'返金ポイントで。すべてにご利用いただけ、現金には交換できません。',
      ly_dev_tarjeta:'支払い方法へ',
      ly_dev_tarjeta_d:'カードまたはPayPalへ、銀行により5〜10営業日で返金されます。',
      ly_dev_guardada:'保存しました。',
      ly_dev_error:'保存できませんでした。もう一度お試しください。'
    },
    ko: {
      ly_bolsa_devuelto:'환불',
      ly_bolsa_devuelto_d:'모든 곳에 사용할 수 있고 가장 먼저 사용됩니다.',
      ly_dev_tit:'환불 받는 곳',
      ly_dev_d:'카드나 PayPal로 결제한 금액(취소한 예약이나 부티크 주문)을 환불받을 기본 장소입니다. 앱에서 예약을 취소할 때도 선택할 수 있습니다.',
      ly_dev_monedero:'내 지갑으로, 바로',
      ly_dev_monedero_d:'환불 포인트로: 모든 곳에 사용할 수 있고 현금으로 바꿀 수 없습니다.',
      ly_dev_tarjeta:'결제한 수단으로',
      ly_dev_tarjeta_d:'카드나 PayPal로, 은행에 따라 영업일 5-10일 이내.',
      ly_dev_guardada:'저장했습니다.',
      ly_dev_error:'저장하지 못했습니다. 다시 시도해 주세요.'
    },
    sv: {
      ly_bolsa_devuelto:'Återbetalningar',
      ly_bolsa_devuelto_d:'Gäller för allt och används först.',
      ly_dev_tit:'Dina återbetalningar',
      ly_dev_d:'När något du betalat med kort eller PayPal återbetalas – en avbokad bokning eller en Boutique-beställning – vart du vill ha det, om du inte säger något annat. Du kan också välja när du avbokar i appen.',
      ly_dev_monedero:'Till min plånbok, direkt',
      ly_dev_monedero_d:'Som återbetalningspoäng: gäller för allt och kan inte växlas mot pengar.',
      ly_dev_tarjeta:'Tillbaka till hur jag betalade',
      ly_dev_tarjeta_d:'Till ditt kort eller PayPal, om 5-10 arbetsdagar beroende på din bank.',
      ly_dev_guardada:'Sparat.',
      ly_dev_error:'Det gick inte att spara. Försök igen.'
    }
  });
})();
