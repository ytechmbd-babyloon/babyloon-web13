/* Babyloon Web · Tarjeta regalo · los avisos de la compra y el canje
   ------------------------------------------------------------------
   28-sep · Estas trece claves no existían en NINGÚN diccionario, ni
   siquiera en español: se llamaban con `t('clave','respaldo')` y el
   respaldo las tapaba. O sea que una sueca comprando una tarjeta regalo
   leía «Redirigiendo al pago seguro…» y, al canjearla, «Código no válido
   o ya canjeado». Son justo los mensajes del momento en que se paga y en
   que algo sale mal, que es cuando peor sienta no entender la pantalla.

   No lo cazaba ninguna comprobación anterior: el barrido busca claves
   que se pinten EN CRUDO, y éstas nunca se pintan en crudo porque su
   propio respaldo, bien escrito y en español, ocupa su sitio. Detector
   nuevo: `herramientas/tapadas.mjs`.

   Van en fichero aparte, con su prefijo, por lo de siempre: `BBL.extend`
   fusiona y gana la última definición de cada clave.

   Dos detalles que no se pueden perder al traducir:
     · `gc_redeemed` termina en ESPACIO: la cifra se pega detrás, FUERA
       de la llamada, y así estaba ya escrito.
     · `gc_min` lleva hueco `{min}`. Antes no hacía falta porque la
       cifra iba concatenada DENTRO del respaldo —
       `T('gc_min','El importe mínimo es '+Money.format(10,'EUR')+'.')`—
       y ese respaldo sólo se usa si la clave no existe. Al crear la
       clave, el importe habría desaparecido de la pantalla: el
       diccionario gana. Con hueco, lo pone quien llama.
     · `gc_login` lleva un enlace dentro. El texto cambia; el `<a href>`
       y su estilo, no. */
/* 1-oct · `gc_no_expira`: la tarjeta NO caduca (61.4a), y en EEUU la ley
   federal pide decirlo cuando no hay fecha (Reg E, 12 CFR 1005.20). */
BBL.extend({
 es:{gc_min:'El importe mínimo es {min}.',gc_need_email:'Introduce el email de quien recibe.',
   gc_processing:'Redirigiendo al pago seguro…',gc_notcfg:'El pago no está configurado.',
   gc_err:'No se pudo iniciar el pago.',gc_need_code:'Introduce el código.',
   gc_login:'Debes <a href="cliente.html" style="color:var(--gold)">iniciar sesión</a> para canjear.',
   gc_redeeming:'Canjeando…',gc_invalid:'Código no válido o ya canjeado.',
   gc_redeemed:'¡Canjeado! Saldo añadido: ',gc_confirming:'Confirmando tu tarjeta…',
   gc_ready:'Tarjeta lista',gc_canceled:'Pago cancelado.',
   gc_no_expira:'Esta tarjeta regalo no caduca.'},
 en:{gc_min:'The minimum amount is {min}.',gc_need_email:'Enter the recipient\'s email.',
   gc_processing:'Taking you to secure payment…',gc_notcfg:'Payments are not set up.',
   gc_err:'We could not start the payment.',gc_need_code:'Enter the code.',
   gc_login:'You need to <a href="cliente.html" style="color:var(--gold)">sign in</a> to redeem.',
   gc_redeeming:'Redeeming…',gc_invalid:'Invalid code, or already redeemed.',
   gc_redeemed:'Redeemed! Balance added: ',gc_confirming:'Confirming your card…',
   gc_ready:'Card ready',gc_canceled:'Payment cancelled.',
   gc_no_expira:'This gift card does not expire.'},
 pt:{gc_min:'O valor mínimo é {min}.',gc_need_email:'Introduz o email de quem recebe.',
   gc_processing:'A encaminhar para o pagamento seguro…',gc_notcfg:'O pagamento não está configurado.',
   gc_err:'Não foi possível iniciar o pagamento.',gc_need_code:'Introduz o código.',
   gc_login:'Tens de <a href="cliente.html" style="color:var(--gold)">iniciar sessão</a> para resgatar.',
   gc_redeeming:'A resgatar…',gc_invalid:'Código inválido ou já resgatado.',
   gc_redeemed:'Resgatado! Saldo adicionado: ',gc_confirming:'A confirmar o teu cartão…',
   gc_ready:'Cartão pronto',gc_canceled:'Pagamento cancelado.',
   gc_no_expira:'Este cartão-presente não expira.'},
 fr:{gc_min:'Le montant minimum est de {min}.',gc_need_email:'Saisissez l\'e-mail du destinataire.',
   gc_processing:'Redirection vers le paiement sécurisé…',gc_notcfg:'Le paiement n\'est pas configuré.',
   gc_err:'Impossible de lancer le paiement.',gc_need_code:'Saisissez le code.',
   gc_login:'Vous devez <a href="cliente.html" style="color:var(--gold)">vous connecter</a> pour l\'utiliser.',
   gc_redeeming:'Utilisation en cours…',gc_invalid:'Code invalide ou déjà utilisé.',
   gc_redeemed:'Validé ! Solde ajouté : ',gc_confirming:'Confirmation de votre carte…',
   gc_ready:'Carte prête',gc_canceled:'Paiement annulé.',
   gc_no_expira:'Cette carte cadeau n’expire pas.'},
 de:{gc_min:'Der Mindestbetrag beträgt {min}.',gc_need_email:'Gib die E-Mail der empfangenden Person ein.',
   gc_processing:'Weiterleitung zur sicheren Zahlung…',gc_notcfg:'Die Zahlung ist nicht eingerichtet.',
   gc_err:'Die Zahlung konnte nicht gestartet werden.',gc_need_code:'Gib den Code ein.',
   gc_login:'Du musst dich <a href="cliente.html" style="color:var(--gold)">anmelden</a>, um einzulösen.',
   gc_redeeming:'Wird eingelöst…',gc_invalid:'Code ungültig oder bereits eingelöst.',
   gc_redeemed:'Eingelöst! Guthaben hinzugefügt: ',gc_confirming:'Deine Karte wird bestätigt…',
   gc_ready:'Karte bereit',gc_canceled:'Zahlung abgebrochen.',
   gc_no_expira:'Diese Geschenkkarte verfällt nicht.'},
 it:{gc_min:'L\'importo minimo è {min}.',gc_need_email:'Inserisci l\'email di chi riceve.',
   gc_processing:'Ti portiamo al pagamento sicuro…',gc_notcfg:'Il pagamento non è configurato.',
   gc_err:'Non è stato possibile avviare il pagamento.',gc_need_code:'Inserisci il codice.',
   gc_login:'Devi <a href="cliente.html" style="color:var(--gold)">accedere</a> per riscattare.',
   gc_redeeming:'Riscatto in corso…',gc_invalid:'Codice non valido o già riscattato.',
   gc_redeemed:'Riscattato! Saldo aggiunto: ',gc_confirming:'Stiamo confermando la tua carta…',
   gc_ready:'Carta pronta',gc_canceled:'Pagamento annullato.',
   gc_no_expira:'Questa carta regalo non scade.'},
 nl:{gc_min:'Het minimumbedrag is {min}.',gc_need_email:'Vul het e-mailadres van de ontvanger in.',
   gc_processing:'Je gaat naar de beveiligde betaling…',gc_notcfg:'Betalen is niet ingesteld.',
   gc_err:'We konden de betaling niet starten.',gc_need_code:'Vul de code in.',
   gc_login:'Je moet <a href="cliente.html" style="color:var(--gold)">inloggen</a> om te verzilveren.',
   gc_redeeming:'Bezig met verzilveren…',gc_invalid:'Ongeldige code, of al verzilverd.',
   gc_redeemed:'Verzilverd! Saldo toegevoegd: ',gc_confirming:'Je kaart wordt bevestigd…',
   gc_ready:'Kaart klaar',gc_canceled:'Betaling geannuleerd.',
   gc_no_expira:'Deze cadeaukaart verloopt niet.'},
 pl:{gc_min:'Minimalna kwota to {min}.',gc_need_email:'Podaj e-mail osoby obdarowanej.',
   gc_processing:'Przekierowanie do bezpiecznej płatności…',gc_notcfg:'Płatności nie są skonfigurowane.',
   gc_err:'Nie udało się rozpocząć płatności.',gc_need_code:'Wpisz kod.',
   gc_login:'Musisz się <a href="cliente.html" style="color:var(--gold)">zalogować</a>, aby zrealizować.',
   gc_redeeming:'Realizowanie…',gc_invalid:'Kod nieprawidłowy lub już zrealizowany.',
   gc_redeemed:'Zrealizowano! Doładowano saldo: ',gc_confirming:'Potwierdzamy Twoją kartę…',
   gc_ready:'Karta gotowa',gc_canceled:'Płatność anulowana.',
   gc_no_expira:'Ta karta podarunkowa nie traci ważności.'},
 el:{gc_min:'Το ελάχιστο ποσό είναι {min}.',gc_need_email:'Συμπλήρωσε το email του παραλήπτη.',
   gc_processing:'Μεταφορά σε ασφαλή πληρωμή…',gc_notcfg:'Η πληρωμή δεν έχει ρυθμιστεί.',
   gc_err:'Δεν ήταν δυνατή η έναρξη της πληρωμής.',gc_need_code:'Συμπλήρωσε τον κωδικό.',
   gc_login:'Πρέπει να <a href="cliente.html" style="color:var(--gold)">συνδεθείς</a> για εξαργύρωση.',
   gc_redeeming:'Γίνεται εξαργύρωση…',gc_invalid:'Μη έγκυρος κωδικός ή ήδη εξαργυρωμένος.',
   gc_redeemed:'Εξαργυρώθηκε! Προστέθηκε υπόλοιπο: ',gc_confirming:'Επιβεβαιώνουμε την κάρτα σου…',
   gc_ready:'Η κάρτα είναι έτοιμη',gc_canceled:'Η πληρωμή ακυρώθηκε.',
   gc_no_expira:'Αυτή η δωροκάρτα δεν λήγει.'},
 hu:{gc_min:'A legkisebb összeg {min}.',gc_need_email:'Add meg a megajándékozott e-mail-címét.',
   gc_processing:'Átirányítás a biztonságos fizetéshez…',gc_notcfg:'A fizetés nincs beállítva.',
   gc_err:'Nem sikerült elindítani a fizetést.',gc_need_code:'Írd be a kódot.',
   gc_login:'A beváltáshoz <a href="cliente.html" style="color:var(--gold)">be kell jelentkezned</a>.',
   gc_redeeming:'Beváltás folyamatban…',gc_invalid:'Érvénytelen vagy már beváltott kód.',
   gc_redeemed:'Beváltva! Hozzáadott egyenleg: ',gc_confirming:'Kártyád megerősítése…',
   gc_ready:'A kártya kész',gc_canceled:'A fizetés megszakadt.',
   gc_no_expira:'Ez az ajándékkártya nem jár le.'},
 ru:{gc_min:'Минимальная сумма — {min}.',gc_need_email:'Укажите email получателя.',
   gc_processing:'Переходим к безопасной оплате…',gc_notcfg:'Оплата не настроена.',
   gc_err:'Не удалось начать оплату.',gc_need_code:'Введите код.',
   gc_login:'Чтобы активировать, нужно <a href="cliente.html" style="color:var(--gold)">войти</a>.',
   gc_redeeming:'Активируем…',gc_invalid:'Код неверен или уже активирован.',
   gc_redeemed:'Активировано! Баланс пополнен: ',gc_confirming:'Подтверждаем вашу карту…',
   gc_ready:'Карта готова',gc_canceled:'Оплата отменена.',
   gc_no_expira:'Срок действия этой подарочной карты не ограничен.'},
 ar:{gc_min:'الحد الأدنى للمبلغ هو {min}.',gc_need_email:'أدخلي بريد المستلم الإلكتروني.',
   gc_processing:'جارٍ تحويلك إلى الدفع الآمن…',gc_notcfg:'الدفع غير مُهيّأ.',
   gc_err:'تعذّر بدء عملية الدفع.',gc_need_code:'أدخلي الرمز.',
   gc_login:'عليك <a href="cliente.html" style="color:var(--gold)">تسجيل الدخول</a> للاستخدام.',
   gc_redeeming:'جارٍ الاستخدام…',gc_invalid:'الرمز غير صالح أو مستخدم من قبل.',
   gc_redeemed:'تمّ! الرصيد المضاف: ',gc_confirming:'جارٍ تأكيد بطاقتك…',
   gc_ready:'البطاقة جاهزة',gc_canceled:'أُلغيت عملية الدفع.',
   gc_no_expira:'بطاقة الهدية هذه لا تنتهي صلاحيتها.'},
 zh:{gc_min:'最低金额为 {min}。',gc_need_email:'请输入收礼人的邮箱。',
   gc_processing:'正在跳转到安全支付…',gc_notcfg:'支付尚未配置。',
   gc_err:'无法发起支付。',gc_need_code:'请输入兑换码。',
   gc_login:'需要先<a href="cliente.html" style="color:var(--gold)">登录</a>才能兑换。',
   gc_redeeming:'兑换中…',gc_invalid:'兑换码无效或已被使用。',
   gc_redeemed:'兑换成功！已添加余额： ',gc_confirming:'正在确认你的礼品卡…',
   gc_ready:'礼品卡已就绪',gc_canceled:'支付已取消。',
   gc_no_expira:'此礼品卡永不过期。'},
 ja:{gc_min:'最低金額は {min} です。',gc_need_email:'受け取る方のメールアドレスを入力してください。',
   gc_processing:'安全な決済ページへ移動しています…',gc_notcfg:'決済が設定されていません。',
   gc_err:'決済を開始できませんでした。',gc_need_code:'コードを入力してください。',
   gc_login:'利用するには<a href="cliente.html" style="color:var(--gold)">ログイン</a>が必要です。',
   gc_redeeming:'処理中…',gc_invalid:'コードが無効か、すでに使用されています。',
   gc_redeemed:'完了しました。追加された残高： ',gc_confirming:'カードを確認しています…',
   gc_ready:'カードの準備ができました',gc_canceled:'決済をキャンセルしました。',
   gc_no_expira:'このギフトカードに有効期限はありません。'},
 ko:{gc_min:'최소 금액은 {min}입니다.',gc_need_email:'받는 분의 이메일을 입력하세요.',
   gc_processing:'안전한 결제로 이동 중…',gc_notcfg:'결제가 설정되지 않았습니다.',
   gc_err:'결제를 시작할 수 없습니다.',gc_need_code:'코드를 입력하세요.',
   gc_login:'사용하려면 <a href="cliente.html" style="color:var(--gold)">로그인</a>해야 합니다.',
   gc_redeeming:'사용 처리 중…',gc_invalid:'코드가 올바르지 않거나 이미 사용되었습니다.',
   gc_redeemed:'완료! 추가된 잔액: ',gc_confirming:'카드를 확인하고 있습니다…',
   gc_ready:'카드 준비 완료',gc_canceled:'결제가 취소되었습니다.',
   gc_no_expira:'이 기프트 카드는 유효기간이 없습니다.'},
 sv:{gc_min:'Minsta belopp är {min}.',gc_need_email:'Ange mottagarens e-postadress.',
   gc_processing:'Skickar dig till säker betalning…',gc_notcfg:'Betalning är inte konfigurerad.',
   gc_err:'Vi kunde inte starta betalningen.',gc_need_code:'Ange koden.',
   gc_login:'Du behöver <a href="cliente.html" style="color:var(--gold)">logga in</a> för att lösa in.',
   gc_redeeming:'Löser in…',gc_invalid:'Ogiltig kod, eller redan inlöst.',
   gc_redeemed:'Inlöst! Saldo tillagt: ',gc_confirming:'Bekräftar ditt kort…',
   gc_ready:'Kortet är klart',gc_canceled:'Betalningen avbröts.',
   gc_no_expira:'Det här presentkortet upphör inte att gälla.'}
});
