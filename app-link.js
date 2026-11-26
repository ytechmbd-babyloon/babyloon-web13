/* ═══════════════════════════════════════════════════════════════
   Babyloon Web · llevar a cada visitante a SU app (cliente o pro)
   26-nov-2026 · antes de publicar en las tiendas

   ▸ Android  → descarga el APK (cuando APPS.x.apk tenga dirección);
                si aún no hay APK, la versión web.
   ▸ iPhone   → la versión web en Safari, con los pasos para dejarla
                en la pantalla de inicio (no hay App Store todavía).
   ▸ Ordenador→ código QR para pasarla al móvil, o la versión web.
   ▸ Aviso discreto en el móvil, de vez en cuando, para recordar la
     descarga (ver «Aviso» más abajo).

   Cuando las apps estén en las tiendas: rellenar ios/android y poner
   TIENDAS = true. Todo lo demás sigue igual.

   Uso (sin cambios para las páginas):
     data-app-open [data-role]          → abre / instala la app
     data-download="client|pro"         → instala la app correcta
     data-store="ios|android" data-app  → botón de cada sistema
     https://babyloon.app/?descargar=cliente|pro → abre la ficha
   ═══════════════════════════════════════════════════════════════ */
(function(){
  const TIENDAS = false;            // true cuando estén en App Store y Google Play
  const APPS = {
    client : { nombre:"Babyloon",     web:"https://app.babyloon.app", apk:"https://descargas.babyloon.app/babyloon.apk", apkMB:54,
               android:"com.babyloon.app", ios:null, scheme:"babyloon://open" },
    pro    : { nombre:"Babyloon Pro", web:"https://pro.babyloon.app", apk:"https://descargas.babyloon.app/babyloon-pro.apk", apkMB:null,
               android:"com.babyloon.pro", ios:null, scheme:"babyloonpro://open" }
  };
  const QR = {"client": "M0 0.5h7m3 0h3m1 0h1m2 0h2m3 0h7m-29 1h1m5 0h1m1 0h1m2 0h4m1 0h1m3 0h1m1 0h1m5 0h1m-29 1h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m2 0h2m1 0h3m1 0h1m1 0h3m1 0h1m-29 1h1m1 0h3m1 0h1m1 0h2m2 0h2m2 0h2m1 0h1m2 0h1m1 0h3m1 0h1m-29 1h1m1 0h3m1 0h1m4 0h2m1 0h1m1 0h1m1 0h2m2 0h1m1 0h3m1 0h1m-29 1h1m5 0h1m2 0h1m1 0h1m2 0h1m1 0h1m3 0h1m1 0h1m5 0h1m-29 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-21 1h1m1 0h2m7 0h2m-21 1h1m5 0h1m1 0h4m1 0h2m2 0h1m1 0h1m1 0h2m2 0h3m-28 1h1m1 0h1m4 0h1m1 0h2m3 0h2m3 0h2m2 0h2m1 0h2m-28 1h2m2 0h4m2 0h2m2 0h2m1 0h2m3 0h3m-25 1h4m1 0h1m1 0h1m2 0h3m1 0h1m1 0h1m8 0h1m-25 1h1m3 0h2m5 0h3m1 0h1m2 0h1m2 0h1m5 0h1m-25 1h2m1 0h1m1 0h3m3 0h2m1 0h3m1 0h3m2 0h2m-28 1h6m1 0h3m4 0h4m3 0h1m2 0h2m-24 1h3m4 0h1m3 0h3m3 0h2m2 0h1m1 0h1m1 0h1m-29 1h1m3 0h3m1 0h4m3 0h1m1 0h1m2 0h1m4 0h2m-27 1h1m1 0h2m1 0h1m2 0h2m2 0h2m1 0h2m1 0h3m1 0h3m1 0h3m-29 1h2m4 0h2m1 0h4m2 0h1m1 0h3m4 0h2m2 0h1m-29 1h1m2 0h2m5 0h4m2 0h1m4 0h2m1 0h1m-25 1h1m2 0h8m3 0h1m1 0h2m2 0h5m1 0h3m-21 1h2m2 0h1m1 0h3m3 0h1m3 0h2m-26 1h7m2 0h3m3 0h1m1 0h4m1 0h1m1 0h3m-27 1h1m5 0h1m2 0h1m4 0h2m2 0h3m3 0h1m2 0h2m-29 1h1m1 0h3m1 0h1m2 0h2m2 0h3m3 0h7m2 0h1m-29 1h1m1 0h3m1 0h1m4 0h1m2 0h3m1 0h1m1 0h2m3 0h2m1 0h1m-29 1h1m1 0h3m1 0h1m3 0h1m1 0h1m1 0h4m1 0h9m-28 1h1m5 0h1m2 0h2m1 0h3m1 0h1m4 0h1m3 0h2m1 0h1m-29 1h7m1 0h2m1 0h2m2 0h1m1 0h1m3 0h2m1 0h1m1 0h1", "pro": "M0 0.5h7m1 0h2m2 0h1m1 0h5m3 0h7m-29 1h1m5 0h1m1 0h2m1 0h1m7 0h1m2 0h1m5 0h1m-29 1h1m1 0h3m1 0h1m1 0h1m1 0h2m3 0h2m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1m-29 1h1m1 0h3m1 0h1m2 0h1m6 0h2m1 0h1m2 0h1m1 0h3m1 0h1m-29 1h1m1 0h3m1 0h1m1 0h2m4 0h2m1 0h4m1 0h1m1 0h3m1 0h1m-29 1h1m5 0h1m4 0h2m4 0h1m2 0h1m1 0h1m5 0h1m-29 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-20 1h5m1 0h2m-17 1h1m2 0h6m1 0h4m2 0h2m3 0h1m2 0h1m1 0h3m-29 1h4m3 0h1m1 0h1m1 0h1m1 0h1m1 0h1m3 0h2m2 0h2m1 0h2m-27 1h1m3 0h2m1 0h1m1 0h1m1 0h2m1 0h1m2 0h1m1 0h1m1 0h1m1 0h1m1 0h1m-27 1h2m1 0h3m1 0h1m1 0h1m1 0h3m1 0h3m4 0h2m1 0h1m2 0h1m-29 1h2m2 0h1m1 0h1m3 0h1m2 0h1m1 0h1m3 0h1m2 0h1m5 0h1m-27 1h3m2 0h1m4 0h5m1 0h1m3 0h7m-28 1h1m4 0h2m1 0h1m1 0h3m1 0h5m6 0h1m1 0h1m-29 1h2m1 0h3m3 0h3m4 0h1m3 0h2m2 0h1m1 0h1m1 0h1m-23 1h2m1 0h1m1 0h1m2 0h3m6 0h1m1 0h1m-26 1h4m1 0h1m3 0h2m2 0h3m1 0h4m3 0h1m1 0h2m-28 1h2m4 0h2m3 0h1m3 0h1m1 0h3m4 0h2m2 0h1m-29 1h3m1 0h1m2 0h4m1 0h1m1 0h1m1 0h1m2 0h4m1 0h3m-27 1h2m1 0h2m1 0h1m2 0h3m1 0h2m2 0h1m1 0h9m-20 1h2m4 0h3m3 0h1m3 0h2m-26 1h7m1 0h2m4 0h2m2 0h3m1 0h1m1 0h2m-26 1h1m5 0h1m1 0h4m2 0h7m3 0h1m2 0h1m-28 1h1m1 0h3m1 0h1m1 0h1m4 0h3m3 0h7m1 0h2m-29 1h1m1 0h3m1 0h1m1 0h2m1 0h1m3 0h2m1 0h2m1 0h1m6 0h1m-29 1h1m1 0h3m1 0h1m2 0h4m1 0h2m1 0h1m2 0h2m1 0h2m1 0h3m-29 1h1m5 0h1m2 0h1m4 0h1m1 0h1m4 0h1m3 0h2m1 0h1m-29 1h7m1 0h1m1 0h1m2 0h3m4 0h5"};

  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const enApp = /FBAN|FBAV|Instagram|Line\/|Twitter|TikTok|Snapchat|Pinterest|LinkedInApp|WhatsApp/i.test(ua);
  const instalada = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;

  /* ── Textos (16 idiomas, los de la web) ───────────────────────── */
  const T = {
es:{bt:"{app} en tu móvil",bsC:"Reserva en segundos con la app",bsP:"Recibe solicitudes al instante",bc:"Descargar",x:"Cerrar",at:"Instalar en Android",ab:"Descargar el APK",as:["Abre el archivo descargado.","Si Android lo pide, permite instalar desde tu navegador.","Pulsa Instalar."],sn:"Muy pronto en Google Play. Mientras tanto, úsala en el navegador: funciona igual.",it:"Instalar en iPhone",is:["Abre {app} en Safari.","Toca el botón Compartir.","Elige «Añadir a pantalla de inicio»."],ib:"Abrir {app}",ia:"Si estás dentro de Instagram u otra app, abre este enlace en Safari.",dt:"Llévala a tu móvil",dp:"Escanea el código con la cámara del móvil.",w:"Usar en el navegador",o:"o",pr:"Próximamente en",dp:"Disponible en"},
en:{bt:"{app} on your phone",bsC:"Book in seconds with the app",bsP:"Get requests instantly",bc:"Download",x:"Close",at:"Install on Android",ab:"Download the APK",as:["Open the downloaded file.","If Android asks, allow installs from your browser.","Tap Install."],sn:"Coming soon to Google Play. In the meantime, use it in your browser: it works the same.",it:"Install on iPhone",is:["Open {app} in Safari.","Tap the Share button.","Choose “Add to Home Screen”."],ib:"Open {app}",ia:"If you are inside Instagram or another app, open this link in Safari.",dt:"Take it to your phone",dp:"Scan the code with your phone camera.",w:"Use in the browser",o:"or",pr:"Coming soon on",dp:"Download on"},
pt:{bt:"{app} no teu telemóvel",bsC:"Reserva em segundos com a app",bsP:"Recebe pedidos na hora",bc:"Descarregar",x:"Fechar",at:"Instalar no Android",ab:"Descarregar o APK",as:["Abre o ficheiro descarregado.","Se o Android pedir, permite instalar a partir do navegador.","Toca em Instalar."],sn:"Em breve no Google Play. Entretanto, usa-a no navegador: funciona igual.",it:"Instalar no iPhone",is:["Abre {app} no Safari.","Toca no botão Partilhar.","Escolhe «Adicionar ao ecrã principal»."],ib:"Abrir {app}",ia:"Se estás dentro do Instagram ou de outra app, abre esta ligação no Safari.",dt:"Leva-a para o telemóvel",dp:"Lê o código com a câmara do telemóvel.",w:"Usar no navegador",o:"ou",pr:"Brevemente na",dp:"Disponível na"},
fr:{bt:"{app} sur votre mobile",bsC:"Réservez en quelques secondes avec l’app",bsP:"Recevez les demandes en direct",bc:"Télécharger",x:"Fermer",at:"Installer sur Android",ab:"Télécharger l’APK",as:["Ouvrez le fichier téléchargé.","Si Android le demande, autorisez l’installation depuis votre navigateur.","Touchez Installer."],sn:"Bientôt sur Google Play. En attendant, utilisez-la dans le navigateur : elle fonctionne pareil.",it:"Installer sur iPhone",is:["Ouvrez {app} dans Safari.","Touchez le bouton Partager.","Choisissez « Sur l’écran d’accueil »."],ib:"Ouvrir {app}",ia:"Si vous êtes dans Instagram ou une autre app, ouvrez ce lien dans Safari.",dt:"Emportez-la sur votre mobile",dp:"Scannez le code avec l’appareil photo du mobile.",w:"Utiliser dans le navigateur",o:"ou",pr:"Bientôt sur",dp:"Disponible sur"},
de:{bt:"{app} auf deinem Handy",bsC:"In Sekunden buchen mit der App",bsP:"Anfragen sofort erhalten",bc:"Herunterladen",x:"Schließen",at:"Auf Android installieren",ab:"APK herunterladen",as:["Öffne die heruntergeladene Datei.","Falls Android fragt, erlaube Installationen aus deinem Browser.","Tippe auf Installieren."],sn:"Bald bei Google Play. Bis dahin nutzt du sie im Browser: Sie funktioniert genauso.",it:"Auf dem iPhone installieren",is:["Öffne {app} in Safari.","Tippe auf Teilen.","Wähle „Zum Home-Bildschirm“."],ib:"{app} öffnen",ia:"Wenn du in Instagram oder einer anderen App bist, öffne diesen Link in Safari.",dt:"Aufs Handy holen",dp:"Scanne den Code mit der Handykamera.",w:"Im Browser nutzen",o:"oder",pr:"Bald im",dp:"Laden im"},
it:{bt:"{app} sul tuo telefono",bsC:"Prenota in pochi secondi con l’app",bsP:"Ricevi le richieste all’istante",bc:"Scarica",x:"Chiudi",at:"Installa su Android",ab:"Scarica l’APK",as:["Apri il file scaricato.","Se Android lo chiede, consenti l’installazione dal browser.","Tocca Installa."],sn:"Presto su Google Play. Nel frattempo usala nel browser: funziona allo stesso modo.",it:"Installa su iPhone",is:["Apri {app} in Safari.","Tocca il pulsante Condividi.","Scegli «Aggiungi alla schermata Home»."],ib:"Apri {app}",ia:"Se sei dentro Instagram o un’altra app, apri questo link in Safari.",dt:"Portala sul telefono",dp:"Inquadra il codice con la fotocamera del telefono.",w:"Usa nel browser",o:"oppure",pr:"Presto su",dp:"Disponibile su"},
nl:{bt:"{app} op je telefoon",bsC:"Boek in seconden met de app",bsP:"Ontvang aanvragen direct",bc:"Downloaden",x:"Sluiten",at:"Installeren op Android",ab:"De APK downloaden",as:["Open het gedownloade bestand.","Als Android erom vraagt, sta installeren vanuit je browser toe.","Tik op Installeren."],sn:"Binnenkort in Google Play. Gebruik hem tot dan in de browser: hij werkt hetzelfde.",it:"Installeren op iPhone",is:["Open {app} in Safari.","Tik op de deelknop.","Kies ‘Zet op beginscherm’."],ib:"{app} openen",ia:"Zit je in Instagram of een andere app, open deze link dan in Safari.",dt:"Zet hem op je telefoon",dp:"Scan de code met de camera van je telefoon.",w:"Gebruiken in de browser",o:"of",pr:"Binnenkort in",dp:"Download in"},
pl:{bt:"{app} w Twoim telefonie",bsC:"Rezerwuj w kilka sekund w aplikacji",bsP:"Otrzymuj zlecenia od razu",bc:"Pobierz",x:"Zamknij",at:"Instalacja na Androidzie",ab:"Pobierz plik APK",as:["Otwórz pobrany plik.","Jeśli Android zapyta, zezwól na instalację z przeglądarki.","Stuknij Zainstaluj."],sn:"Wkrótce w Google Play. Do tego czasu korzystaj w przeglądarce: działa tak samo.",it:"Instalacja na iPhonie",is:["Otwórz {app} w Safari.","Stuknij przycisk Udostępnij.","Wybierz „Do ekranu początkowego”."],ib:"Otwórz {app}",ia:"Jeśli jesteś w Instagramie lub innej aplikacji, otwórz ten link w Safari.",dt:"Przenieś ją na telefon",dp:"Zeskanuj kod aparatem telefonu.",w:"Użyj w przeglądarce",o:"lub",pr:"Wkrótce w",dp:"Pobierz z"},
el:{bt:"Το {app} στο κινητό σου",bsC:"Κράτηση σε δευτερόλεπτα με την εφαρμογή",bsP:"Λάβε αιτήματα αμέσως",bc:"Λήψη",x:"Κλείσιμο",at:"Εγκατάσταση σε Android",ab:"Λήψη του APK",as:["Άνοιξε το αρχείο που κατέβηκε.","Αν το ζητήσει το Android, επίτρεψε την εγκατάσταση από τον browser.","Πάτησε Εγκατάσταση."],sn:"Σύντομα στο Google Play. Μέχρι τότε, χρησιμοποίησέ το στον browser: λειτουργεί το ίδιο.",it:"Εγκατάσταση σε iPhone",is:["Άνοιξε το {app} στο Safari.","Πάτησε Κοινοποίηση.","Διάλεξε «Προσθήκη σε οθόνη Αφετηρίας»."],ib:"Άνοιγμα {app}",ia:"Αν είσαι μέσα στο Instagram ή σε άλλη εφαρμογή, άνοιξε τον σύνδεσμο στο Safari.",dt:"Πάρ’ το στο κινητό",dp:"Σάρωσε τον κωδικό με την κάμερα του κινητού.",w:"Χρήση στον browser",o:"ή",pr:"Σύντομα στο",dp:"Διαθέσιμο στο"},
hu:{bt:"{app} a telefonodon",bsC:"Foglalj másodpercek alatt az appal",bsP:"Kapd meg azonnal a megkereséseket",bc:"Letöltés",x:"Bezárás",at:"Telepítés Androidra",ab:"Az APK letöltése",as:["Nyisd meg a letöltött fájlt.","Ha az Android kéri, engedélyezd a telepítést a böngészőből.","Koppints a Telepítés gombra."],sn:"Hamarosan a Google Playen. Addig használd a böngészőben: ugyanúgy működik.",it:"Telepítés iPhone-ra",is:["Nyisd meg a(z) {app} oldalt a Safariban.","Koppints a Megosztás gombra.","Válaszd a „Főképernyőhöz adás” lehetőséget."],ib:"{app} megnyitása",ia:"Ha az Instagramban vagy más appban vagy, nyisd meg ezt a linket a Safariban.",dt:"Vidd át a telefonodra",dp:"Olvasd be a kódot a telefon kamerájával.",w:"Használat böngészőben",o:"vagy",pr:"Hamarosan:",dp:"Letöltés:"},
ru:{bt:"{app} в вашем телефоне",bsC:"Бронируйте за секунды в приложении",bsP:"Получайте заявки сразу",bc:"Скачать",x:"Закрыть",at:"Установка на Android",ab:"Скачать APK",as:["Откройте скачанный файл.","Если Android попросит, разрешите установку из браузера.","Нажмите «Установить»."],sn:"Скоро в Google Play. А пока пользуйтесь в браузере: всё работает так же.",it:"Установка на iPhone",is:["Откройте {app} в Safari.","Нажмите «Поделиться».","Выберите «На экран „Домой“»."],ib:"Открыть {app}",ia:"Если вы в Instagram или другом приложении, откройте эту ссылку в Safari.",dt:"Перенесите на телефон",dp:"Отсканируйте код камерой телефона.",w:"Открыть в браузере",o:"или",pr:"Скоро в",dp:"Загрузите в"},
ar:{bt:"{app} على هاتفك",bsC:"احجز في ثوانٍ عبر التطبيق",bsP:"تلقَّ الطلبات فورًا",bc:"تنزيل",x:"إغلاق",at:"التثبيت على أندرويد",ab:"تنزيل ملف APK",as:["افتح الملف الذي نزّلته.","إذا طلب أندرويد ذلك، اسمح بالتثبيت من المتصفح.","اضغط تثبيت."],sn:"قريبًا على Google Play. حتى ذلك الحين استخدمه في المتصفح: يعمل بالطريقة نفسها.",it:"التثبيت على iPhone",is:["افتح {app} في Safari.","اضغط زر المشاركة.","اختر «إضافة إلى الشاشة الرئيسية»."],ib:"افتح {app}",ia:"إذا كنت داخل إنستغرام أو تطبيق آخر، افتح هذا الرابط في Safari.",dt:"انقله إلى هاتفك",dp:"امسح الرمز بكاميرا الهاتف.",w:"الاستخدام في المتصفح",o:"أو",pr:"قريبًا على",dp:"متوفر على"},
zh:{bt:"把 {app} 装进手机",bsC:"用 App 几秒完成预约",bsP:"即时接收订单请求",bc:"下载",x:"关闭",at:"在 Android 上安装",ab:"下载 APK",as:["打开下载的文件。","如果系统提示，请允许从浏览器安装。","点按“安装”。"],sn:"即将上架 Google Play。在此之前可在浏览器中使用，功能相同。",it:"在 iPhone 上安装",is:["在 Safari 中打开 {app}。","点按“分享”按钮。","选择“添加到主屏幕”。"],ib:"打开 {app}",ia:"如果你在 Instagram 或其他 App 内，请在 Safari 中打开此链接。",dt:"传到手机上",dp:"用手机相机扫描二维码。",w:"在浏览器中使用",o:"或",pr:"即将登陆",dp:"下载于"},
ja:{bt:"{app} をスマートフォンに",bsC:"アプリなら数秒で予約",bsP:"依頼をすぐに受け取れます",bc:"ダウンロード",x:"閉じる",at:"Android にインストール",ab:"APK をダウンロード",as:["ダウンロードしたファイルを開きます。","求められたら、ブラウザからのインストールを許可します。","「インストール」をタップします。"],sn:"まもなく Google Play に登場。それまではブラウザでお使いください。機能は同じです。",it:"iPhone にインストール",is:["Safari で {app} を開きます。","共有ボタンをタップします。","「ホーム画面に追加」を選びます。"],ib:"{app} を開く",ia:"Instagram などのアプリ内で見ている場合は、このリンクを Safari で開いてください。",dt:"スマートフォンへ",dp:"スマートフォンのカメラでコードを読み取ってください。",w:"ブラウザで使う",o:"または",pr:"近日公開",dp:"ダウンロード"},
ko:{bt:"휴대폰에 {app}",bsC:"앱으로 몇 초 만에 예약",bsP:"요청을 바로 받아보세요",bc:"다운로드",x:"닫기",at:"Android에 설치",ab:"APK 다운로드",as:["다운로드한 파일을 엽니다.","Android가 요청하면 브라우저에서 설치를 허용합니다.","설치를 누릅니다."],sn:"곧 Google Play에 출시됩니다. 그 전까지는 브라우저에서 똑같이 이용하세요.",it:"iPhone에 설치",is:["Safari에서 {app}을(를) 엽니다.","공유 버튼을 누릅니다.","‘홈 화면에 추가’를 선택합니다."],ib:"{app} 열기",ia:"Instagram 등 다른 앱 안이라면 이 링크를 Safari에서 여세요.",dt:"휴대폰으로 옮기기",dp:"휴대폰 카메라로 코드를 스캔하세요.",w:"브라우저에서 사용",o:"또는",pr:"출시 예정",dp:"다운로드"},
sv:{bt:"{app} i mobilen",bsC:"Boka på sekunder i appen",bsP:"Få förfrågningar direkt",bc:"Ladda ner",x:"Stäng",at:"Installera på Android",ab:"Ladda ner APK-filen",as:["Öppna den nedladdade filen.","Om Android frågar, tillåt installation från webbläsaren.","Tryck på Installera."],sn:"Snart på Google Play. Använd den i webbläsaren så länge: den fungerar likadant.",it:"Installera på iPhone",is:["Öppna {app} i Safari.","Tryck på Dela.","Välj ”Lägg till på hemskärmen”."],ib:"Öppna {app}",ia:"Om du är i Instagram eller en annan app, öppna länken i Safari.",dt:"Ta den till mobilen",dp:"Skanna koden med mobilkameran.",w:"Använd i webbläsaren",o:"eller",pr:"Snart på",dp:"Hämta på"}
  };
  function lang(){
    let l = (window.BBL && BBL.lang) || "";
    if(!l){ try{ l = localStorage.getItem("bbl_lang") || ""; }catch(_){} }
    if(!l) l = (document.documentElement.lang || navigator.language || "es").slice(0,2);
    return T[l] ? l : "es";
  }
  function tx(k, role){ const v = T[lang()][k]; const n = (APPS[role]||APPS.client).nombre;
    return Array.isArray(v) ? v.map(s=>s.replace("{app}", n)) : String(v).replace("{app}", n); }
  function esc(s){ return String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

  function iosUrl(role){ const a = APPS[role]||APPS.client; return (TIENDAS && a.ios) ? "https://apps.apple.com/app/id" + a.ios : a.web; }
  function androidUrl(role){ const a = APPS[role]||APPS.client;
    return TIENDAS ? "https://play.google.com/store/apps/details?id=" + a.android : (a.apk || a.web); }
  function storeUrl(role){ if(isIOS) return iosUrl(role); if(isAndroid) return androidUrl(role); return null; }

  /* ── Estilos (los de la marca; la web es oscura en todas sus páginas) ── */
  function estilos(){
    if(document.getElementById("bbl-app-css")) return;
    const s = document.createElement("style"); s.id = "bbl-app-css";
    s.textContent =
'.bbl-ficha-velo{position:fixed;inset:0;z-index:2147483000;background:rgba(8,6,9,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:flex-end;justify-content:center;opacity:0;transition:opacity .3s}'+
'.bbl-ficha-velo.on{opacity:1}'+
'.bbl-ficha{position:relative;width:100%;max-width:420px;margin:0 12px calc(12px + env(safe-area-inset-bottom,0px));padding:26px 22px 22px;border-radius:22px;background:linear-gradient(160deg,#1F1320,#0D0B0F 70%);border:1px solid rgba(200,169,106,.24);color:#F6EFE3;font-family:Jost,"Avenir Next","Segoe UI",system-ui,sans-serif;font-weight:300;box-shadow:0 24px 60px rgba(0,0,0,.6);transform:translateY(24px);transition:transform .4s cubic-bezier(.22,1,.36,1)}'+
'.bbl-ficha-velo.on .bbl-ficha{transform:none}.bbl-ficha:focus{outline:none}'+
'@media(min-width:700px){.bbl-ficha-velo{align-items:center}.bbl-ficha{margin:0 16px}}'+
'.bbl-ficha h3{margin:0 0 6px;font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;font-size:26px;line-height:1.15}'+
'.bbl-ficha .bf-ojo{display:flex;align-items:center;gap:12px;margin-bottom:14px}'+
'.bbl-ficha .bf-ico{width:46px;height:46px;border-radius:12px;flex-shrink:0;box-shadow:0 6px 16px rgba(0,0,0,.45)}'+
'.bbl-ficha .bf-sub{font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#C8A96A}'+
'.bbl-ficha ol{margin:6px 0 18px;padding-left:20px;display:flex;flex-direction:column;gap:7px;font-size:14px;line-height:1.5;color:rgba(246,239,227,.85)}'+
'.bbl-ficha p{margin:0 0 16px;font-size:14px;line-height:1.55;color:rgba(246,239,227,.8)}'+
'.bbl-ficha .bf-nota{font-size:12px;color:#9A8090;margin:-6px 0 14px}'+
'.bbl-ficha .bf-btn{display:flex;align-items:center;justify-content:center;width:100%;box-sizing:border-box;padding:14px 18px;border-radius:999px;border:0;cursor:pointer;font:inherit;font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;text-decoration:none;color:#0D0B0F;background:linear-gradient(110deg,#8E723F,#C9A96E 40%,#F3E0BC 70%,#C9A96E)}'+
'.bbl-ficha .bf-alt{display:block;text-align:center;margin-top:12px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#E8D4A0;text-decoration:none}'+
'.bbl-ficha .bf-alt:hover,.bbl-ficha .bf-alt:focus-visible{text-decoration:underline}'+
'.bbl-ficha .bf-x{position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(200,169,106,.22);background:transparent;color:#F6EFE3;font-size:18px;line-height:1;cursor:pointer}'+
'.bbl-ficha .bf-qr{display:flex;justify-content:center;margin:4px 0 16px}'+
'.bbl-ficha .bf-qr svg{width:168px;height:168px;padding:12px;border-radius:14px;background:#F6EFE3}'+
'.bbl-ficha button:focus-visible,.bbl-ficha a:focus-visible{outline:2px solid #F0DCB4;outline-offset:3px}'+
'[dir="rtl"] .bbl-ficha .bf-x{right:auto;left:12px}[dir="rtl"] .bbl-ficha ol{padding-left:0;padding-right:20px}'+
/* Aviso */
'.bbl-aviso{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:2147482500;display:flex;align-items:center;gap:12px;max-width:440px;margin:0 auto;padding:10px 10px 10px 12px;border-radius:18px;background:rgba(22,13,19,.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(200,169,106,.28);box-shadow:0 14px 40px rgba(0,0,0,.5);color:#F6EFE3;font-family:Jost,"Avenir Next","Segoe UI",system-ui,sans-serif;font-weight:300;transform:translateY(140%);transition:transform .55s cubic-bezier(.22,1,.36,1)}'+
'.bbl-aviso.on{transform:none}'+
'.bbl-aviso .ba-ico{width:40px;height:40px;border-radius:10px;flex-shrink:0}'+
'.bbl-aviso .ba-txt{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}'+
'.bbl-aviso b{font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;font-size:17px;line-height:1.1}'+
'.bbl-aviso small{font-size:11.5px;line-height:1.35;color:rgba(246,239,227,.66)}'+
'.bbl-aviso .ba-go{flex-shrink:0;padding:10px 14px;border-radius:999px;border:0;cursor:pointer;font:inherit;font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#0D0B0F;background:linear-gradient(110deg,#C9A96E,#F3E0BC)}'+
'.bbl-aviso .ba-x{flex-shrink:0;width:32px;height:32px;border-radius:50%;border:0;background:transparent;color:rgba(246,239,227,.6);font-size:18px;cursor:pointer}'+
'.bbl-aviso button:focus-visible{outline:2px solid #F0DCB4;outline-offset:2px}'+
'html.bbl-aviso-on #bbl-baby-btn{opacity:0;pointer-events:none}'+
'@media(prefers-reduced-motion:reduce){.bbl-aviso,.bbl-ficha,.bbl-ficha-velo{transition:none}}';
    document.head.appendChild(s);
  }

  // Miniatura del icono de cada app (el mismo de la tienda)
  const INF = "M60 30C60 16 48 8 34 8C18 8 8 18 8 30C8 42 18 52 34 52C48 52 60 44 60 30C60 16 72 8 86 8C102 8 112 18 112 30C112 42 102 52 86 52C72 52 60 44 60 30Z";
  function icono(role, cls){
    const pro = role === "pro", id = "bi" + Math.random().toString(36).slice(2,7);
    return '<svg class="'+cls+'" viewBox="0 0 100 100" aria-hidden="true"><defs>'+
      '<radialGradient id="'+id+'b" cx=".5" cy=".42" r=".75"><stop offset="0" stop-color="'+(pro?"#262A35":"#3A2436")+'"/><stop offset="1" stop-color="'+(pro?"#0A0B0F":"#120A10")+'"/></radialGradient>'+
      '<linearGradient id="'+id+'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8E723F"/><stop offset=".45" stop-color="#F3E0BC"/><stop offset="1" stop-color="#9C8050"/></linearGradient></defs>'+
      '<rect width="100" height="100" fill="url(#'+id+'b)"/>'+
      '<g transform="translate('+(pro?"22,30) scale(.4667)":"20,35.5) scale(.5)")+'"><path d="'+INF+'" fill="none" stroke="url(#'+id+'g)" stroke-width="6" stroke-linecap="round"/></g>'+
      (pro?'<text x="51.6" y="67.5" text-anchor="middle" font-family="Jost,sans-serif" font-weight="500" font-size="8.4" letter-spacing="3.2" fill="#E8D4A0">PRO</text>':'')+'</svg>';
  }

  /* ── Ficha de instalación ─────────────────────────────────────── */
  let velo = null, antes = null;
  function cerrar(){
    if(!velo) return; const v = velo; velo = null;
    v.classList.remove("on"); setTimeout(()=>v.remove(), 320);
    document.removeEventListener("keydown", tecla);
    if(antes && antes.focus) try{ antes.focus(); }catch(_){}
  }
  function tecla(e){ if(e.key === "Escape") cerrar(); }

  function ficha(role, so){
    role = APPS[role] ? role : "client"; estilos(); cerrar();
    const a = APPS[role];
    so = so || (isIOS ? "ios" : isAndroid ? "android" : "desk");
    const dir = lang() === "ar" ? ' dir="rtl"' : "";
    const enc = '<div class="bf-ojo">'+icono(role,"bf-ico")+'<span class="bf-sub">'+esc(a.nombre)+'</span></div>';
    let cuerpo;
    if(so === "ios"){
      cuerpo = '<h3>'+esc(tx("it",role))+'</h3><ol>'+tx("is",role).map(s=>'<li>'+esc(s)+'</li>').join("")+'</ol>'+
        (enApp ? '<p class="bf-nota">'+esc(tx("ia",role))+'</p>' : '')+
        '<a class="bf-btn" href="'+a.web+'" target="_blank" rel="noopener">'+esc(tx("ib",role))+'</a>';
    } else if(so === "android"){
      cuerpo = '<h3>'+esc(tx("at",role))+'</h3>'+
        (a.apk ? '<ol>'+tx("as",role).map(s=>'<li>'+esc(s)+'</li>').join("")+'</ol>'+
                 '<a class="bf-btn" href="'+a.apk+'" rel="noopener">'+esc(tx("ab",role))+(a.apkMB?' · '+a.apkMB+' MB':'')+'</a>'+
                 '<a class="bf-alt" href="'+a.web+'" target="_blank" rel="noopener">'+esc(tx("o",role))+' '+esc(tx("w",role).toLowerCase())+'</a>'
               : '<p>'+esc(tx("sn",role))+'</p><a class="bf-btn" href="'+a.web+'" target="_blank" rel="noopener">'+esc(tx("ib",role))+'</a>');
    } else {
      cuerpo = '<h3>'+esc(tx("dt",role))+'</h3><p>'+esc(tx("dp",role))+'</p>'+
        '<div class="bf-qr"><svg viewBox="-1 -1 31 31" role="img" aria-label="QR"><path d="'+QR[role]+'" stroke="#0D0B0F" fill="none"/></svg></div>'+
        '<a class="bf-btn" href="'+a.web+'" target="_blank" rel="noopener">'+esc(tx("w",role))+'</a>'+
        (a.apk ? '<a class="bf-alt" href="'+a.apk+'" rel="noopener">'+esc(tx("ab",role))+'</a>' : '');
    }
    antes = document.activeElement;
    velo = document.createElement("div"); velo.className = "bbl-ficha-velo";
    velo.innerHTML = '<div class="bbl-ficha" role="dialog" aria-modal="true" tabindex="-1"'+dir+'>'+
      '<button type="button" class="bf-x" aria-label="'+esc(tx("x",role))+'">×</button>'+enc+cuerpo+'</div>';
    velo.addEventListener("click", e=>{ if(e.target === velo || e.target.closest(".bf-x")) cerrar(); });
    document.body.appendChild(velo);
    requestAnimationFrame(()=>{ if(!velo) return; velo.classList.add("on"); velo.querySelector(".bbl-ficha").focus({preventScroll:true}); });
    document.addEventListener("keydown", tecla);
    pospone(45);
  }

  function download(role, so){
    if(TIENDAS){ const u = so === "ios" ? iosUrl(role) : so === "android" ? androidUrl(role) : storeUrl(role);
      if(u){ window.location.href = u; return; } }
    ficha(role, so);
  }

  function openApp(role){
    role = role || "client";
    if(instalada) return;                           // ya estamos dentro de la app web
    if(!TIENDAS){ ficha(role); return; }            // sin tiendas no hay app nativa que abrir
    const store = storeUrl(role);
    if(!isIOS && !isAndroid){ const app = document.getElementById("app");
      if(app) app.scrollIntoView({behavior:"smooth"}); else if(store) window.open(store, "_blank"); return; }
    let fb = setTimeout(function(){ if(store) window.location.href = store; }, 1200);
    document.addEventListener("visibilitychange", function once(){
      if(document.hidden) clearTimeout(fb); document.removeEventListener("visibilitychange", once); });
    try { window.location.href = (APPS[role]||APPS.client).scheme; }
    catch(_){ if(store) window.location.href = store; }
  }

  /* ── Aviso discreto en el móvil ───────────────────────────────────
     Solo en móvil, nunca dentro de la app web instalada, nunca encima
     de la entrada, del aviso de cookies ni del viaje a pantalla
     completa. Como mucho una vez por visita; si se cierra, vuelve en
     14 días; si se pulsa «Descargar», en 45. */
  const K_HASTA = "bbl_app_aviso_hasta", K_VISTO = "bbl_app_aviso_visto";
  function leer(s,k){ try{ return s.getItem(k); }catch(_){ return null; } }
  function poner(s,k,v){ try{ s.setItem(k,v); }catch(_){} }
  function pospone(dias){ poner(localStorage, K_HASTA, String(Date.now() + dias*864e5)); }
  function rolDePagina(){ return /para-profesionales|profesional\.html|academia|masterclass/.test(location.pathname) ? "pro" : "client"; }
  function aviso(){
    if(!(isIOS || isAndroid) || instalada) return;
    if(/checkout|recuperar|bienvenida|informe|escanear|modelo/.test(location.pathname)) return;
    if(leer(sessionStorage, K_VISTO)) return;
    if(Date.now() < parseInt(leer(localStorage, K_HASTA) || "0", 10)) return;
    const t0 = Date.now(); let listo = false;
    const ocupado = () => { const h = document.documentElement.classList;
      return h.contains("be-abierta") || h.contains("mvv-abierto") || document.getElementById("bbl-ck") || velo; };
    const quiere = () => (window.scrollY > innerHeight * .6) || (Date.now() - t0 > 18000);
    const iv = setInterval(()=>{
      if(listo) return;
      if(ocupado() || !quiere()) return;
      listo = true; clearInterval(iv); mostrarAviso(rolDePagina());
    }, 1200);
  }
  function mostrarAviso(role){
    estilos(); poner(sessionStorage, K_VISTO, "1");
    const el = document.createElement("div"); el.className = "bbl-aviso"; el.setAttribute("role","region");
    el.setAttribute("aria-label", tx("bt",role));
    if(lang() === "ar") el.dir = "rtl";
    el.innerHTML = icono(role,"ba-ico")+
      '<div class="ba-txt"><b>'+esc(tx("bt",role))+'</b><small>'+esc(tx(role === "pro" ? "bsP" : "bsC", role))+'</small></div>'+
      '<button type="button" class="ba-go">'+esc(tx("bc",role))+'</button>'+
      '<button type="button" class="ba-x" aria-label="'+esc(tx("x",role))+'">×</button>';
    document.body.appendChild(el);
    document.documentElement.classList.add("bbl-aviso-on");
    requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add("on")));
    const quitar = dias => { pospone(dias); el.classList.remove("on");
      document.documentElement.classList.remove("bbl-aviso-on"); setTimeout(()=>el.remove(), 600); };
    el.querySelector(".ba-x").addEventListener("click", ()=>quitar(14));
    el.querySelector(".ba-go").addEventListener("click", ()=>{ quitar(45); download(role); });
  }

  /* ── Botones de las páginas ───────────────────────────────────── */
  const ICO_ANDROID = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 9.48l1.84-3.18a.38.38 0 00-.66-.38l-1.87 3.23A11.4 11.4 0 0012 8.1c-1.77 0-3.43.4-4.91 1.05L5.22 5.92a.38.38 0 00-.66.38L6.4 9.48A10.8 10.8 0 001 18h22a10.8 10.8 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/></svg>';
  function wire(){
    document.querySelectorAll("[data-app-open]").forEach(function(el){
      el.addEventListener("click", function(e){ e.preventDefault(); openApp(el.getAttribute("data-role")||"client"); });
    });
    document.querySelectorAll("[data-download]").forEach(function(el){
      el.addEventListener("click", function(e){ e.preventDefault(); download(el.getAttribute("data-download")); });
    });
    document.querySelectorAll("[data-store]").forEach(function(a){
      const so = a.getAttribute("data-store"), role = a.getAttribute("data-app")||"client";
      if(TIENDAS){ a.href = so === "ios" ? iosUrl(role) : androidUrl(role); a.target = "_blank"; a.rel = "noopener"; return; }
      // Sin tiendas: los botones dicen el sistema, no la tienda, y abren su ficha
      a.href = "#app"; a.setAttribute("role","button");
      if(so === "ios") a.lastChild.textContent = " iPhone";
      else { a.innerHTML = ICO_ANDROID + " Android"; }
      a.addEventListener("click", function(e){ e.preventDefault(); download(role, so); });
    });
    // Distintivos oficiales de las tiendas: visibles ya, activos cuando TIENDAS = true
    document.querySelectorAll("[data-tienda]").forEach(function(a){
      const so = a.getAttribute("data-tienda"), role = a.getAttribute("data-app")||"client", cfg = APPS[role]||APPS.client;
      const lista = TIENDAS && (so === "android" || cfg.ios);
      const pre = a.querySelector("[data-tienda-pre]");
      if(pre) pre.textContent = tx(lista ? "dp" : "pr", role);
      if(lista){
        a.href = so === "ios" ? iosUrl(role) : androidUrl(role); a.target = "_blank"; a.rel = "noopener";
        a.classList.remove("pronto"); a.removeAttribute("aria-disabled");
      } else {
        a.removeAttribute("href"); a.setAttribute("aria-disabled","true");
        a.addEventListener("click", function(e){ e.preventDefault(); });
      }
    });
    // Con las tiendas activas, los botones «iPhone / Android» sobran
    if(TIENDAS) document.querySelectorAll(".dl-stores").forEach(el => el.hidden = true);
    const q = new URLSearchParams(location.search).get("descargar");
    if(q === "cliente" || q === "pro") setTimeout(()=>download(q === "pro" ? "pro" : "client"), 400);
    aviso();
    document.addEventListener("bbl:lang", function(){
      document.querySelectorAll("[data-tienda]").forEach(function(a){
        const pre = a.querySelector("[data-tienda-pre]"); if(!pre) return;
        pre.textContent = tx(a.classList.contains("pronto") ? "pr" : "dp", a.getAttribute("data-app")||"client");
      });
    });
  }

  window.BBLApp = { openApp:openApp, download:download, ficha:ficha, storeUrl:storeUrl, isIOS:isIOS, isAndroid:isAndroid, cfg:APPS };
  if(document.readyState !== "loading") wire();
  else document.addEventListener("DOMContentLoaded", wire);
})();
