/* ═══════════════════════════════════════════════════════════════
   Babyloon · Clases en vivo — diccionario
   ───────────────────────────────────────────────────────────────
   Los once idiomas de la web. Se añade al diccionario base con
   BBL.extend, igual que i18n-academia.js e i18n-auth.js.

   Un detalle que no es de traducción sino de honestidad: la clave
   `mc_wallet_only` existe porque hoy la entrada de pago se cobra
   del monedero de profesional y una clienta no puede comprarla.
   Mientras eso sea así, la página lo dice en su idioma en vez de
   enseñar un botón que no va a funcionar.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({

    es: {
      mc_title:'Clases en vivo', mc_sub:'Aprende de las mejores, en directo y desde donde estés.',
      mc_live_now:'En directo ahora', mc_upcoming:'Próximas clases',
      mc_none:'No hay ninguna clase programada', mc_none_sub:'Vuelve pronto: se anuncian con días de antelación.',
      mc_free:'Gratuita', mc_paid:'De pago', mc_seats:'{n} plazas libres', mc_sold_out:'Completo',
      mc_reserve:'Reservar mi sitio', mc_reserved:'Tienes tu sitio', mc_enter:'Entrar en la sala',
      mc_teacher:'Imparte', mc_starts:'Empieza', mc_duration:'{n} min',
      mc_login:'Entra para reservar', mc_login_sub:'Necesitas una cuenta para guardar tu sitio en la sala.',
      mc_chat:'Chat de la sala', mc_chat_ph:'Escribe algo…', mc_send:'Enviar',
      mc_no_ticket:'Necesitas una entrada para esta clase.',
      mc_wallet_only:'Las entradas de pago se cobran hoy del monedero de profesional. Si eres cliente, escríbenos y te reservamos sitio.',
      mc_connecting:'Conectando con la sala…', mc_conn_err:'No hemos podido conectar con la sala. Inténtalo de nuevo.',
      mc_ended:'Esta clase ya ha terminado', mc_leave:'Salir', mc_waiting:'Esperando a que empiece…',
      mc_you:'Tú', mc_by:'con', mc_scheduled:'Programada', mc_reserving:'Reservando…',
      mc_cam_err:'No hemos podido encender tu cámara. Revisa los permisos del navegador.'
    },

    en: {
      mc_title:'Live classes', mc_sub:'Learn from the best, live, from wherever you are.',
      mc_live_now:'Live now', mc_upcoming:'Upcoming classes',
      mc_none:'No classes scheduled', mc_none_sub:'Check back soon — they are announced days in advance.',
      mc_free:'Free', mc_paid:'Paid', mc_seats:'{n} seats left', mc_sold_out:'Sold out',
      mc_reserve:'Save my seat', mc_reserved:'Your seat is saved', mc_enter:'Enter the room',
      mc_teacher:'Taught by', mc_starts:'Starts', mc_duration:'{n} min',
      mc_login:'Sign in to book', mc_login_sub:'You need an account to save your seat in the room.',
      mc_chat:'Room chat', mc_chat_ph:'Say something…', mc_send:'Send',
      mc_no_ticket:'You need a ticket for this class.',
      mc_wallet_only:'Paid tickets are currently charged to the professional wallet. If you are a client, write to us and we will save you a seat.',
      mc_connecting:'Connecting to the room…', mc_conn_err:'We could not connect to the room. Please try again.',
      mc_ended:'This class has ended', mc_leave:'Leave', mc_waiting:'Waiting for it to start…',
      mc_you:'You', mc_by:'with', mc_scheduled:'Scheduled', mc_reserving:'Booking…',
      mc_cam_err:'We could not turn on your camera. Check your browser permissions.'
    },

    pt: {
      mc_title:'Aulas ao vivo', mc_sub:'Aprende com as melhores, ao vivo, onde quer que estejas.',
      mc_live_now:'Ao vivo agora', mc_upcoming:'Próximas aulas',
      mc_none:'Não há aulas agendadas', mc_none_sub:'Volta em breve: anunciam-se com dias de antecedência.',
      mc_free:'Gratuita', mc_paid:'Paga', mc_seats:'{n} lugares livres', mc_sold_out:'Esgotada',
      mc_reserve:'Reservar o meu lugar', mc_reserved:'Tens o teu lugar', mc_enter:'Entrar na sala',
      mc_teacher:'Leccionada por', mc_starts:'Começa', mc_duration:'{n} min',
      mc_login:'Entra para reservar', mc_login_sub:'Precisas de uma conta para guardar o teu lugar na sala.',
      mc_chat:'Chat da sala', mc_chat_ph:'Escreve algo…', mc_send:'Enviar',
      mc_no_ticket:'Precisas de um bilhete para esta aula.',
      mc_wallet_only:'Os bilhetes pagos são hoje cobrados na carteira de profissional. Se és cliente, escreve-nos e reservamos-te lugar.',
      mc_connecting:'A ligar à sala…', mc_conn_err:'Não conseguimos ligar à sala. Tenta novamente.',
      mc_ended:'Esta aula já terminou', mc_leave:'Sair', mc_waiting:'À espera de começar…',
      mc_you:'Tu', mc_by:'com', mc_scheduled:'Agendada', mc_reserving:'A reservar…',
      mc_cam_err:'Não conseguimos ligar a tua câmara. Verifica as permissões do navegador.'
    },

    de: {
      mc_title:'Live-Kurse', mc_sub:'Lerne von den Besten – live, von überall.',
      mc_live_now:'Jetzt live', mc_upcoming:'Kommende Kurse',
      mc_none:'Keine Kurse geplant', mc_none_sub:'Schau bald wieder vorbei – sie werden Tage vorher angekündigt.',
      mc_free:'Kostenlos', mc_paid:'Kostenpflichtig', mc_seats:'Noch {n} Plätze', mc_sold_out:'Ausgebucht',
      mc_reserve:'Platz sichern', mc_reserved:'Dein Platz ist gesichert', mc_enter:'Raum betreten',
      mc_teacher:'Geleitet von', mc_starts:'Beginnt', mc_duration:'{n} Min.',
      mc_login:'Zum Buchen anmelden', mc_login_sub:'Du brauchst ein Konto, um deinen Platz zu sichern.',
      mc_chat:'Raum-Chat', mc_chat_ph:'Schreib etwas…', mc_send:'Senden',
      mc_no_ticket:'Für diesen Kurs brauchst du ein Ticket.',
      mc_wallet_only:'Bezahlte Tickets werden derzeit über das Profi-Guthaben abgerechnet. Wenn du buchst, schreib uns – wir halten dir einen Platz frei.',
      mc_connecting:'Verbindung zum Raum…', mc_conn_err:'Verbindung zum Raum fehlgeschlagen. Bitte erneut versuchen.',
      mc_ended:'Dieser Kurs ist beendet', mc_leave:'Verlassen', mc_waiting:'Warten auf den Beginn…',
      mc_you:'Du', mc_by:'mit', mc_scheduled:'Geplant', mc_reserving:'Wird gebucht…',
      mc_cam_err:'Deine Kamera konnte nicht gestartet werden. Prüfe die Browser-Berechtigungen.'
    },

    fr: {
      mc_title:'Cours en direct', mc_sub:'Apprends auprès des meilleures, en direct, où que tu sois.',
      mc_live_now:'En direct maintenant', mc_upcoming:'Prochains cours',
      mc_none:'Aucun cours programmé', mc_none_sub:'Reviens bientôt : ils sont annoncés plusieurs jours à l’avance.',
      mc_free:'Gratuit', mc_paid:'Payant', mc_seats:'{n} places restantes', mc_sold_out:'Complet',
      mc_reserve:'Réserver ma place', mc_reserved:'Ta place est réservée', mc_enter:'Entrer dans la salle',
      mc_teacher:'Animé par', mc_starts:'Commence', mc_duration:'{n} min',
      mc_login:'Connecte-toi pour réserver', mc_login_sub:'Il te faut un compte pour garder ta place dans la salle.',
      mc_chat:'Chat de la salle', mc_chat_ph:'Écris quelque chose…', mc_send:'Envoyer',
      mc_no_ticket:'Il te faut un billet pour ce cours.',
      mc_wallet_only:'Les billets payants sont aujourd’hui débités du portefeuille professionnel. Si tu réserves, écris-nous et nous te réservons une place.',
      mc_connecting:'Connexion à la salle…', mc_conn_err:'Connexion à la salle impossible. Réessaie.',
      mc_ended:'Ce cours est terminé', mc_leave:'Quitter', mc_waiting:'En attente du début…',
      mc_you:'Toi', mc_by:'avec', mc_scheduled:'Programmé', mc_reserving:'Réservation…',
      mc_cam_err:'Impossible d’activer ta caméra. Vérifie les autorisations du navigateur.'
    },

    sv: {
      mc_title:'Livekurser', mc_sub:'Lär av de bästa, live, var du än är.',
      mc_live_now:'Live nu', mc_upcoming:'Kommande kurser',
      mc_none:'Inga kurser inplanerade', mc_none_sub:'Kom tillbaka snart – de annonseras flera dagar i förväg.',
      mc_free:'Gratis', mc_paid:'Betald', mc_seats:'{n} platser kvar', mc_sold_out:'Fullbokad',
      mc_reserve:'Boka min plats', mc_reserved:'Din plats är bokad', mc_enter:'Gå in i rummet',
      mc_teacher:'Hålls av', mc_starts:'Börjar', mc_duration:'{n} min',
      mc_login:'Logga in för att boka', mc_login_sub:'Du behöver ett konto för att spara din plats i rummet.',
      mc_chat:'Rumschatt', mc_chat_ph:'Skriv något…', mc_send:'Skicka',
      mc_no_ticket:'Du behöver en biljett till den här kursen.',
      mc_wallet_only:'Betalda biljetter dras i dag från proffsplånboken. Är du kund, skriv till oss så sparar vi en plats åt dig.',
      mc_connecting:'Ansluter till rummet…', mc_conn_err:'Vi kunde inte ansluta till rummet. Försök igen.',
      mc_ended:'Kursen är avslutad', mc_leave:'Lämna', mc_waiting:'Väntar på start…',
      mc_you:'Du', mc_by:'med', mc_scheduled:'Inplanerad', mc_reserving:'Bokar…',
      mc_cam_err:'Vi kunde inte slå på din kamera. Kontrollera webbläsarens behörigheter.'
    },

    ja: {
      mc_title:'ライブレッスン', mc_sub:'どこにいても、一流から生で学べます。',
      mc_live_now:'ただいま配信中', mc_upcoming:'今後のレッスン',
      mc_none:'予定されているレッスンはありません', mc_none_sub:'数日前に告知されます。また見に来てください。',
      mc_free:'無料', mc_paid:'有料', mc_seats:'残り{n}席', mc_sold_out:'満席',
      mc_reserve:'席を予約する', mc_reserved:'席を確保しました', mc_enter:'ルームに入る',
      mc_teacher:'講師', mc_starts:'開始', mc_duration:'{n}分',
      mc_login:'ログインして予約', mc_login_sub:'席を確保するにはアカウントが必要です。',
      mc_chat:'ルームチャット', mc_chat_ph:'メッセージを入力…', mc_send:'送信',
      mc_no_ticket:'このレッスンにはチケットが必要です。',
      mc_wallet_only:'現在、有料チケットはプロ用ウォレットから引き落とされます。お客さまの場合はご連絡ください。お席をご用意します。',
      mc_connecting:'ルームに接続しています…', mc_conn_err:'ルームに接続できませんでした。もう一度お試しください。',
      mc_ended:'このレッスンは終了しました', mc_leave:'退出', mc_waiting:'開始をお待ちください…',
      mc_you:'あなた', mc_by:'／', mc_scheduled:'予定', mc_reserving:'予約中…',
      mc_cam_err:'カメラを起動できませんでした。ブラウザの権限をご確認ください。'
    },

    ar: {
      mc_title:'دروس مباشرة', mc_sub:'تعلّمي من الأفضل، مباشرةً، من أي مكان.',
      mc_live_now:'مباشر الآن', mc_upcoming:'الدروس القادمة',
      mc_none:'لا توجد دروس مجدولة', mc_none_sub:'عودي قريبًا: يُعلن عنها قبل أيام.',
      mc_free:'مجاني', mc_paid:'مدفوع', mc_seats:'{n} مقاعد متبقية', mc_sold_out:'اكتمل العدد',
      mc_reserve:'حجز مقعدي', mc_reserved:'مقعدك محجوز', mc_enter:'الدخول إلى الغرفة',
      mc_teacher:'تقدّمه', mc_starts:'يبدأ', mc_duration:'{n} دقيقة',
      mc_login:'تسجيل الدخول للحجز', mc_login_sub:'تحتاج حسابًا لحجز مقعدك في الغرفة.',
      mc_chat:'محادثة الغرفة', mc_chat_ph:'اكتب شيئًا…', mc_send:'إرسال',
      mc_no_ticket:'تحتاج تذكرة لهذا الدرس.',
      mc_wallet_only:'تُخصم التذاكر المدفوعة حاليًا من المحفظة المهنية. إن كان حسابك للحجز فراسلنا ونحجز لك مقعدًا.',
      mc_connecting:'جارٍ الاتصال بالغرفة…', mc_conn_err:'تعذّر الاتصال بالغرفة. حاولي مرة أخرى.',
      mc_ended:'انتهى هذا الدرس', mc_leave:'خروج', mc_waiting:'في انتظار البدء…',
      mc_you:'أنت', mc_by:'مع', mc_scheduled:'مجدول', mc_reserving:'جارٍ الحجز…',
      mc_cam_err:'تعذّر تشغيل الكاميرا. تحقّقي من أذونات المتصفح.'
    },

    zh: {
      mc_title:'直播课程', mc_sub:'无论身在何处，都能跟随顶尖专业人士实时学习。',
      mc_live_now:'正在直播', mc_upcoming:'即将开课',
      mc_none:'暂无排定的课程', mc_none_sub:'请稍后再来，课程会提前几天公布。',
      mc_free:'免费', mc_paid:'付费', mc_seats:'剩余 {n} 个名额', mc_sold_out:'已满',
      mc_reserve:'预约名额', mc_reserved:'已为你保留名额', mc_enter:'进入直播间',
      mc_teacher:'主讲', mc_starts:'开始时间', mc_duration:'{n} 分钟',
      mc_login:'登录后预约', mc_login_sub:'需要账号才能保留你的名额。',
      mc_chat:'直播间聊天', mc_chat_ph:'说点什么…', mc_send:'发送',
      mc_no_ticket:'参加这堂课需要门票。',
      mc_wallet_only:'付费门票目前从专业人士钱包扣款。如果你是顾客，请联系我们，我们为你留位。',
      mc_connecting:'正在连接直播间…', mc_conn_err:'无法连接直播间，请重试。',
      mc_ended:'本堂课已结束', mc_leave:'离开', mc_waiting:'等待开始…',
      mc_you:'你', mc_by:'·', mc_scheduled:'已排定', mc_reserving:'预约中…',
      mc_cam_err:'无法开启摄像头，请检查浏览器权限。'
    },

    ko: {
      mc_title:'라이브 클래스', mc_sub:'어디에 있든, 최고의 전문가에게 실시간으로 배우세요.',
      mc_live_now:'지금 라이브', mc_upcoming:'예정된 클래스',
      mc_none:'예정된 클래스가 없습니다', mc_none_sub:'며칠 전에 공지됩니다. 다시 확인해 주세요.',
      mc_free:'무료', mc_paid:'유료', mc_seats:'{n}자리 남음', mc_sold_out:'마감',
      mc_reserve:'자리 예약하기', mc_reserved:'자리가 예약되었습니다', mc_enter:'룸 입장',
      mc_teacher:'진행', mc_starts:'시작', mc_duration:'{n}분',
      mc_login:'로그인 후 예약', mc_login_sub:'자리를 예약하려면 계정이 필요합니다.',
      mc_chat:'룸 채팅', mc_chat_ph:'메시지를 입력하세요…', mc_send:'보내기',
      mc_no_ticket:'이 클래스에는 티켓이 필요합니다.',
      mc_wallet_only:'유료 티켓은 현재 프로 지갑에서 결제됩니다. 고객이시라면 연락 주세요. 자리를 마련해 드립니다.',
      mc_connecting:'룸에 연결 중…', mc_conn_err:'룸에 연결하지 못했습니다. 다시 시도해 주세요.',
      mc_ended:'이 클래스는 종료되었습니다', mc_leave:'나가기', mc_waiting:'시작을 기다리는 중…',
      mc_you:'나', mc_by:'·', mc_scheduled:'예정', mc_reserving:'예약 중…',
      mc_cam_err:'카메라를 켤 수 없습니다. 브라우저 권한을 확인해 주세요.'
    },

    ru: {
      mc_title:'Прямые эфиры', mc_sub:'Учитесь у лучших вживую, где бы вы ни были.',
      mc_live_now:'Сейчас в эфире', mc_upcoming:'Ближайшие занятия',
      mc_none:'Занятий пока не запланировано', mc_none_sub:'Загляните позже — о них объявляют за несколько дней.',
      mc_free:'Бесплатно', mc_paid:'Платно', mc_seats:'Осталось мест: {n}', mc_sold_out:'Мест нет',
      mc_reserve:'Забронировать место', mc_reserved:'Место забронировано', mc_enter:'Войти в комнату',
      mc_teacher:'Ведёт', mc_starts:'Начало', mc_duration:'{n} мин',
      mc_login:'Войдите, чтобы записаться', mc_login_sub:'Чтобы занять место, нужен аккаунт.',
      mc_chat:'Чат комнаты', mc_chat_ph:'Напишите что-нибудь…', mc_send:'Отправить',
      mc_no_ticket:'Для этого занятия нужен билет.',
      mc_wallet_only:'Платные билеты сейчас списываются с кошелька мастера. Если вы клиент — напишите нам, и мы оставим вам место.',
      mc_connecting:'Подключение к комнате…', mc_conn_err:'Не удалось подключиться к комнате. Попробуйте ещё раз.',
      mc_ended:'Занятие завершено', mc_leave:'Выйти', mc_waiting:'Ждём начала…',
      mc_you:'Вы', mc_by:'·', mc_scheduled:'Запланировано', mc_reserving:'Бронируем…',
      mc_cam_err:'Не удалось включить камеру. Проверьте разрешения браузера.'
    }

  });
})();
