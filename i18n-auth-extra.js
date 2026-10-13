/* ═══════════════════════════════════════════════════════════════
   Babyloon · La puerta, lo que le faltaba — 16 idiomas
   ───────────────────────────────────────────────────────────────
   Seis claves que no existían porque no existía la función:
   ver la contraseña, recuperarla, y el subtítulo nuevo de «Entrar»,
   que ahora tiene que explicar para qué sirve el selector.

   Sobre `au_r_enviado`: dice lo mismo exista la cuenta o no. No es
   torpeza de redacción, es a propósito. Contestar «ese correo no
   está registrado» le regala a cualquiera una forma de averiguar
   quién tiene cuenta en Babyloon: se prueban correos y se mira cuál
   contesta distinto.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({

    es:{ lg_version:'Versión', lg_vigor:'en vigor desde el', lg_firmado:'revisado por', lg_otro_idioma:'Todavía no hay una versión firmada en tu idioma. Esta es la que rige mientras tanto.', lg_provisional:'Documento provisional. La versión definitiva, con su fecha de entrada en vigor, se publicará aquí.', au_r_titulo:'Nueva contraseña', au_r_sub:'Elige una contraseña nueva para tu cuenta.', au_r_nueva:'Contraseña nueva', au_r_repite:'Repítela', au_r_guardar:'Guardar', au_r_distintas:'Las dos contraseñas no coinciden.', au_r_caducado:'Este enlace ya no vale. Los enlaces de recuperación caducan por seguridad: pide uno nuevo desde «Acceder».', au_r_hecho:'Contraseña cambiada. Ya puedes entrar con la nueva.', au_entrar_s2:'Entra con tu correo. Si tu cuenta es las dos cosas, elige por dónde quieres entrar.',
      au_olvide:'¿Has olvidado tu contraseña?', au_ver:'Ver contraseña', au_ocultar:'Ocultar contraseña',
      au_r_falta:'Escribe tu correo arriba y vuelve a pulsar.',
      au_r_enviado:'Si ese correo tiene cuenta, te hemos enviado un enlace para cambiar la contraseña. Mira también el correo no deseado.' },

    en:{ lg_version:'Version', lg_vigor:'in force since', lg_firmado:'reviewed by', lg_otro_idioma:'There is no signed version in your language yet. This is the one that applies in the meantime.', lg_provisional:'Provisional document. The definitive version, with its date of entry into force, will be published here.', au_r_titulo:'New password', au_r_sub:'Choose a new password for your account.', au_r_nueva:'New password', au_r_repite:'Repeat it', au_r_guardar:'Save', au_r_distintas:'The two passwords do not match.', au_r_caducado:'This link is no longer valid. Recovery links expire for security: ask for a new one from “Sign in”.', au_r_hecho:'Password changed. You can sign in with the new one.', au_entrar_s2:'Sign in with your email. If your account is both, choose which way in.',
      au_olvide:'Forgotten your password?', au_ver:'Show password', au_ocultar:'Hide password',
      au_r_falta:'Type your email above and press again.',
      au_r_enviado:'If that email has an account, we have sent a link to change the password. Check your spam folder too.' },

    pt:{ lg_version:'Versão', lg_vigor:'em vigor desde', lg_firmado:'revisto por', lg_otro_idioma:'Ainda não há uma versão assinada no seu idioma. Esta é a que vigora entretanto.', lg_provisional:'Documento provisório. A versão definitiva, com a sua data de entrada em vigor, será publicada aqui.', au_r_titulo:'Nova palavra-passe', au_r_sub:'Escolhe uma nova palavra-passe para a tua conta.', au_r_nueva:'Nova palavra-passe', au_r_repite:'Repete-a', au_r_guardar:'Guardar', au_r_distintas:'As duas palavras-passe não coincidem.', au_r_caducado:'Este link já não é válido. Os links de recuperação expiram por segurança: pede um novo em «Entrar».', au_r_hecho:'Palavra-passe alterada. Já podes entrar com a nova.', au_entrar_s2:'Entra com o teu email. Se a tua conta é as duas coisas, escolhe por onde queres entrar.',
      au_olvide:'Esqueceste-te da palavra-passe?', au_ver:'Ver palavra-passe', au_ocultar:'Ocultar palavra-passe',
      au_r_falta:'Escreve o teu email acima e volta a carregar.',
      au_r_enviado:'Se esse email tiver conta, enviámos um link para mudar a palavra-passe. Vê também o spam.' },

    fr:{ lg_version:'Version', lg_vigor:'en vigueur depuis le', lg_firmado:'révisé par', lg_otro_idioma:'Il n\'existe pas encore de version signée dans votre langue. Voici celle qui s\'applique en attendant.', lg_provisional:'Document provisoire. La version définitive, avec sa date d\'entrée en vigueur, sera publiée ici.', au_r_titulo:'Nouveau mot de passe', au_r_sub:'Choisissez un nouveau mot de passe pour votre compte.', au_r_nueva:'Nouveau mot de passe', au_r_repite:'Répétez-le', au_r_guardar:'Enregistrer', au_r_distintas:'Les deux mots de passe ne correspondent pas.', au_r_caducado:'Ce lien n’est plus valable. Les liens de récupération expirent par sécurité : demandez-en un nouveau depuis « Se connecter ».', au_r_hecho:'Mot de passe modifié. Vous pouvez vous connecter avec le nouveau.', au_entrar_s2:'Connectez-vous avec votre email. Si votre compte est les deux, choisissez par où entrer.',
      au_olvide:'Mot de passe oublié ?', au_ver:'Afficher le mot de passe', au_ocultar:'Masquer le mot de passe',
      au_r_falta:'Saisissez votre email ci-dessus puis réessayez.',
      au_r_enviado:'Si cet email a un compte, nous avons envoyé un lien pour changer le mot de passe. Vérifiez aussi les indésirables.' },

    de:{ lg_version:'Fassung', lg_vigor:'in Kraft seit', lg_firmado:'geprüft von', lg_otro_idioma:'Es gibt noch keine unterzeichnete Fassung in Ihrer Sprache. Bis dahin gilt diese.', lg_provisional:'Vorläufiges Dokument. Die endgültige Fassung mit ihrem Inkrafttreten wird hier veröffentlicht.', au_r_titulo:'Neues Passwort', au_r_sub:'Wählen Sie ein neues Passwort für Ihr Konto.', au_r_nueva:'Neues Passwort', au_r_repite:'Wiederholen', au_r_guardar:'Speichern', au_r_distintas:'Die beiden Passwörter stimmen nicht überein.', au_r_caducado:'Dieser Link gilt nicht mehr. Wiederherstellungslinks laufen aus Sicherheitsgründen ab: Fordern Sie über „Anmelden“ einen neuen an.', au_r_hecho:'Passwort geändert. Sie können sich jetzt mit dem neuen anmelden.', au_entrar_s2:'Melden Sie sich mit Ihrer E-Mail an. Ist Ihr Konto beides, wählen Sie den Eingang.',
      au_olvide:'Passwort vergessen?', au_ver:'Passwort anzeigen', au_ocultar:'Passwort verbergen',
      au_r_falta:'Tragen Sie oben Ihre E-Mail ein und drücken Sie erneut.',
      au_r_enviado:'Falls zu dieser E-Mail ein Konto gehört, haben wir einen Link zum Ändern des Passworts geschickt. Sehen Sie auch im Spam nach.' },

    it:{ lg_version:'Versione', lg_vigor:'in vigore dal', lg_firmado:'revisionato da', lg_otro_idioma:'Non esiste ancora una versione firmata nella tua lingua. Nel frattempo vale questa.', lg_provisional:'Documento provvisorio. La versione definitiva, con la sua data di entrata in vigore, sarà pubblicata qui.', au_r_titulo:'Nuova password', au_r_sub:'Scegli una nuova password per il tuo account.', au_r_nueva:'Nuova password', au_r_repite:'Ripetila', au_r_guardar:'Salva', au_r_distintas:'Le due password non coincidono.', au_r_caducado:'Questo link non è più valido. I link di recupero scadono per sicurezza: chiedine uno nuovo da «Accedi».', au_r_hecho:'Password cambiata. Ora puoi accedere con quella nuova.', au_entrar_s2:'Accedi con la tua email. Se il tuo account è entrambe le cose, scegli da dove entrare.',
      au_olvide:'Hai dimenticato la password?', au_ver:'Mostra la password', au_ocultar:'Nascondi la password',
      au_r_falta:'Scrivi la tua email qui sopra e premi di nuovo.',
      au_r_enviado:'Se quell’email ha un account, ti abbiamo inviato un link per cambiare la password. Controlla anche la posta indesiderata.' },

    nl:{ lg_version:'Versie', lg_vigor:'van kracht sinds', lg_firmado:'beoordeeld door', lg_otro_idioma:'Er is nog geen ondertekende versie in uw taal. Deze geldt in de tussentijd.', lg_provisional:'Voorlopig document. De definitieve versie, met de datum van inwerkingtreding, verschijnt hier.', au_r_titulo:'Nieuw wachtwoord', au_r_sub:'Kies een nieuw wachtwoord voor je account.', au_r_nueva:'Nieuw wachtwoord', au_r_repite:'Herhaal het', au_r_guardar:'Opslaan', au_r_distintas:'De twee wachtwoorden komen niet overeen.', au_r_caducado:'Deze link is niet meer geldig. Herstellinks verlopen om veiligheidsredenen: vraag een nieuwe aan via “Inloggen”.', au_r_hecho:'Wachtwoord gewijzigd. Je kunt nu inloggen met het nieuwe.', au_entrar_s2:'Log in met je e-mail. Is je account allebei, kies dan hoe je binnenkomt.',
      au_olvide:'Wachtwoord vergeten?', au_ver:'Wachtwoord tonen', au_ocultar:'Wachtwoord verbergen',
      au_r_falta:'Vul hierboven je e-mailadres in en druk opnieuw.',
      au_r_enviado:'Als dat e-mailadres een account heeft, hebben we een link gestuurd om het wachtwoord te wijzigen. Kijk ook in je spam.' },

    pl:{ lg_version:'Wersja', lg_vigor:'obowiązuje od', lg_firmado:'zweryfikowane przez', lg_otro_idioma:'Nie ma jeszcze podpisanej wersji w Twoim języku. Tymczasem obowiązuje ta.', lg_provisional:'Dokument tymczasowy. Wersja ostateczna, z datą wejścia w życie, zostanie opublikowana tutaj.', au_r_titulo:'Nowe hasło', au_r_sub:'Wybierz nowe hasło do swojego konta.', au_r_nueva:'Nowe hasło', au_r_repite:'Powtórz je', au_r_guardar:'Zapisz', au_r_distintas:'Oba hasła nie są takie same.', au_r_caducado:'Ten link już nie działa. Linki do odzyskiwania wygasają ze względów bezpieczeństwa: poproś o nowy w „Zaloguj się”.', au_r_hecho:'Hasło zmienione. Możesz zalogować się nowym.', au_entrar_s2:'Zaloguj się swoim e-mailem. Jeśli Twoje konto jest jednym i drugim, wybierz, którędy wejść.',
      au_olvide:'Nie pamiętasz hasła?', au_ver:'Pokaż hasło', au_ocultar:'Ukryj hasło',
      au_r_falta:'Wpisz wyżej swój e-mail i naciśnij ponownie.',
      au_r_enviado:'Jeśli ten e-mail ma konto, wysłaliśmy link do zmiany hasła. Sprawdź też spam.' },

    el:{ lg_version:'Έκδοση', lg_vigor:'σε ισχύ από', lg_firmado:'ελέγχθηκε από', lg_otro_idioma:'Δεν υπάρχει ακόμη υπογεγραμμένη έκδοση στη γλώσσα σας. Στο μεταξύ ισχύει αυτή.', lg_provisional:'Προσωρινό έγγραφο. Η οριστική έκδοση, με την ημερομηνία έναρξης ισχύος, θα δημοσιευτεί εδώ.', au_r_titulo:'Νέος κωδικός', au_r_sub:'Διάλεξε νέο κωδικό για τον λογαριασμό σου.', au_r_nueva:'Νέος κωδικός', au_r_repite:'Επανάλαβέ τον', au_r_guardar:'Αποθήκευση', au_r_distintas:'Οι δύο κωδικοί δεν ταιριάζουν.', au_r_caducado:'Αυτός ο σύνδεσμος δεν ισχύει πια. Οι σύνδεσμοι ανάκτησης λήγουν για λόγους ασφαλείας: ζήτα νέον από τη «Σύνδεση».', au_r_hecho:'Ο κωδικός άλλαξε. Μπορείς να μπεις με τον νέο.', au_entrar_s2:'Σύνδεση με το email σου. Αν ο λογαριασμός σου είναι και τα δύο, διάλεξε από πού θα μπεις.',
      au_olvide:'Ξέχασες τον κωδικό σου;', au_ver:'Εμφάνιση κωδικού', au_ocultar:'Απόκρυψη κωδικού',
      au_r_falta:'Γράψε το email σου πιο πάνω και πάτα ξανά.',
      au_r_enviado:'Αν αυτό το email έχει λογαριασμό, σου στείλαμε σύνδεσμο για αλλαγή κωδικού. Δες και τα ανεπιθύμητα.' },

    hu:{ lg_version:'Változat', lg_vigor:'hatályos ettől', lg_firmado:'ellenőrizte', lg_otro_idioma:'Az Ön nyelvén még nincs aláírt változat. Addig ez az irányadó.', lg_provisional:'Ideiglenes dokumentum. A végleges változat a hatálybalépés dátumával itt jelenik meg.', au_r_titulo:'Új jelszó', au_r_sub:'Válassz új jelszót a fiókodhoz.', au_r_nueva:'Új jelszó', au_r_repite:'Írd be újra', au_r_guardar:'Mentés', au_r_distintas:'A két jelszó nem egyezik.', au_r_caducado:'Ez a link már nem érvényes. A helyreállító linkek biztonsági okból lejárnak: kérj újat a „Bejelentkezés” felől.', au_r_hecho:'A jelszó megváltozott. Most már az újjal léphetsz be.', au_entrar_s2:'Lépj be az e-mail-címeddel. Ha a fiókod mindkettő, válaszd ki, melyik felől lépsz be.',
      au_olvide:'Elfelejtetted a jelszavad?', au_ver:'Jelszó megjelenítése', au_ocultar:'Jelszó elrejtése',
      au_r_falta:'Írd be fent az e-mail-címed, és nyomd meg újra.',
      au_r_enviado:'Ha ehhez az e-mail-címhez tartozik fiók, küldtünk egy linket a jelszó módosításához. Nézd meg a levélszemetet is.' },

    ru:{ lg_version:'Версия', lg_vigor:'действует с', lg_firmado:'проверено', lg_otro_idioma:'Подписанной версии на вашем языке пока нет. Пока действует эта.', lg_provisional:'Предварительный документ. Окончательная версия с датой вступления в силу будет опубликована здесь.', au_r_titulo:'Новый пароль', au_r_sub:'Выберите новый пароль для вашего аккаунта.', au_r_nueva:'Новый пароль', au_r_repite:'Повторите', au_r_guardar:'Сохранить', au_r_distintas:'Пароли не совпадают.', au_r_caducado:'Эта ссылка больше не действует. Ссылки для восстановления истекают в целях безопасности: запросите новую через «Войти».', au_r_hecho:'Пароль изменён. Теперь можно войти с новым.', au_entrar_s2:'Войдите по электронной почте. Если ваш аккаунт — и то и другое, выберите, куда войти.',
      au_olvide:'Забыли пароль?', au_ver:'Показать пароль', au_ocultar:'Скрыть пароль',
      au_r_falta:'Впишите почту выше и нажмите ещё раз.',
      au_r_enviado:'Если у этой почты есть аккаунт, мы отправили ссылку для смены пароля. Загляните и в спам.' },

    ar:{ lg_version:'الإصدار', lg_vigor:'ساري منذ', lg_firmado:'روجع بواسطة', lg_otro_idioma:'لا توجد بعد نسخة موقَّعة بلغتك. هذه هي النسخة السارية في الوقت الحالي.', lg_provisional:'مستند مؤقت. ستُنشر هنا النسخة النهائية مع تاريخ بدء سريانها.', au_r_titulo:'كلمة مرور جديدة', au_r_sub:'اختيار كلمة مرور جديدة للحساب.', au_r_nueva:'كلمة المرور الجديدة', au_r_repite:'أعيدي كتابتها', au_r_guardar:'حفظ', au_r_distintas:'كلمتا المرور غير متطابقتين.', au_r_caducado:'لم يعد هذا الرابط صالحًا. روابط الاسترجاع تنتهي صلاحيتها لأسباب أمنية: يمكن طلب رابط جديد من «الدخول».', au_r_hecho:'تم تغيير كلمة المرور. يمكنك الدخول بالجديدة.', au_entrar_s2:'الدخول بالبريد الإلكتروني. إن كان حسابك الاثنين معًا، يمكنك اختيار من أين تدخل.',
      au_olvide:'هل نسيت كلمة المرور؟', au_ver:'إظهار كلمة المرور', au_ocultar:'إخفاء كلمة المرور',
      au_r_falta:'اكتب البريد في الأعلى ثم اضغط مرة أخرى.',
      au_r_enviado:'إن كان لهذا البريد حساب، فقد أرسلنا رابطًا لتغيير كلمة المرور. تحقّقي من البريد غير المرغوب أيضًا.' },

    zh:{ lg_version:'版本', lg_vigor:'生效日期', lg_firmado:'审阅人', lg_otro_idioma:'目前还没有您所用语言的签署版本。在此期间以本版本为准。', lg_provisional:'临时文件。最终版本及其生效日期将在此发布。', au_r_titulo:'新密码', au_r_sub:'为您的账户设置新密码。', au_r_nueva:'新密码', au_r_repite:'再输入一次', au_r_guardar:'保存', au_r_distintas:'两次输入的密码不一致。', au_r_caducado:'此链接已失效。出于安全考虑，找回链接会过期：请从“登录”重新获取。', au_r_hecho:'密码已更改，现在可以用新密码登录。', au_entrar_s2:'使用邮箱登录。如果您的账户兼具两种身份，请选择从哪一侧进入。',
      au_olvide:'忘记密码？', au_ver:'显示密码', au_ocultar:'隐藏密码',
      au_r_falta:'请在上方填写邮箱后再次点击。',
      au_r_enviado:'如果该邮箱已注册，我们已发送修改密码的链接。也请查看垃圾邮件。' },

    ja:{ lg_version:'版', lg_vigor:'発効日', lg_firmado:'確認者', lg_otro_idioma:'お使いの言語で署名済みの版はまだありません。それまではこちらが適用されます。', lg_provisional:'暫定版の文書です。発効日を記した最終版はこちらに掲載します。', au_r_titulo:'新しいパスワード', au_r_sub:'アカウントの新しいパスワードを設定してください。', au_r_nueva:'新しいパスワード', au_r_repite:'もう一度入力', au_r_guardar:'保存', au_r_distintas:'パスワードが一致しません。', au_r_caducado:'このリンクは無効になりました。安全のため再設定リンクには期限があります。「ログイン」から新しいリンクをご請求ください。', au_r_hecho:'パスワードを変更しました。新しいパスワードでログインできます。', au_entrar_s2:'メールアドレスでログインします。アカウントが両方の場合は、どちらから入るか選んでください。',
      au_olvide:'パスワードをお忘れですか？', au_ver:'パスワードを表示', au_ocultar:'パスワードを隠す',
      au_r_falta:'上にメールアドレスを入力してもう一度押してください。',
      au_r_enviado:'そのメールアドレスのアカウントがあれば、パスワード変更のリンクをお送りしました。迷惑メールもご確認ください。' },

    ko:{ lg_version:'버전', lg_vigor:'시행일', lg_firmado:'검토자', lg_otro_idioma:'아직 귀하의 언어로 서명된 버전이 없습니다. 그때까지는 이 문서가 적용됩니다.', lg_provisional:'임시 문서입니다. 시행일이 기재된 최종본을 여기에 게시합니다.', au_r_titulo:'새 비밀번호', au_r_sub:'계정에 사용할 새 비밀번호를 선택하세요.', au_r_nueva:'새 비밀번호', au_r_repite:'다시 입력', au_r_guardar:'저장', au_r_distintas:'두 비밀번호가 일치하지 않습니다.', au_r_caducado:'이 링크는 더 이상 유효하지 않습니다. 보안을 위해 복구 링크는 만료됩니다. ‘로그인’에서 새로 요청하세요.', au_r_hecho:'비밀번호가 변경되었습니다. 새 비밀번호로 로그인할 수 있습니다.', au_entrar_s2:'이메일로 로그인하세요. 계정이 두 가지 모두라면 어느 쪽으로 들어갈지 선택하세요.',
      au_olvide:'비밀번호를 잊으셨나요?', au_ver:'비밀번호 표시', au_ocultar:'비밀번호 숨기기',
      au_r_falta:'위에 이메일을 입력한 뒤 다시 누르세요.',
      au_r_enviado:'해당 이메일로 가입된 계정이 있다면 비밀번호 변경 링크를 보냈습니다. 스팸함도 확인해 주세요.' },

    sv:{ lg_version:'Version', lg_vigor:'gäller sedan', lg_firmado:'granskad av', lg_otro_idioma:'Det finns ännu ingen undertecknad version på ditt språk. Tills vidare gäller denna.', lg_provisional:'Preliminärt dokument. Den slutliga versionen, med datum för ikraftträdande, publiceras här.', au_r_titulo:'Nytt lösenord', au_r_sub:'Välj ett nytt lösenord för ditt konto.', au_r_nueva:'Nytt lösenord', au_r_repite:'Upprepa det', au_r_guardar:'Spara', au_r_distintas:'De två lösenorden stämmer inte överens.', au_r_caducado:'Den här länken gäller inte längre. Återställningslänkar går ut av säkerhetsskäl: begär en ny via ”Logga in”.', au_r_hecho:'Lösenordet är ändrat. Du kan logga in med det nya.', au_entrar_s2:'Logga in med din e-post. Om ditt konto är båda delarna, välj vilken väg in.',
      au_olvide:'Har du glömt lösenordet?', au_ver:'Visa lösenord', au_ocultar:'Dölj lösenord',
      au_r_falta:'Skriv din e-post ovan och tryck igen.',
      au_r_enviado:'Om den e-posten har ett konto har vi skickat en länk för att ändra lösenordet. Kolla även skräpposten.' }

  });
})();

/* Recuperar el acceso con el código de 6 dígitos (recuperar.html), el acceso a él desde
   la portada, la Boutique y auth.js, y el aviso del límite de envíos. */
(function () {
  if (!window.BBL || !BBL.extend) return;
  BBL.extend({
    es:{"au_r_cod_falta":"Escribe tu correo y el código.","au_r_cod_mal":"El código no es correcto o ha caducado. Pide otro.","au_r_cod_sub":"Escribe tu correo y el código de 6 dígitos que te hemos enviado.","au_r_cod_titulo":"Recupera tu acceso","au_r_codigo":"Código","au_r_email":"Correo electrónico","au_r_enviado_v2":"Si ese correo tiene cuenta, te hemos enviado un correo para cambiar la contraseña. Mira también el correo no deseado.","au_r_espera":"Espera un minuto antes de pedir otro.","au_r_reenviado":"Te hemos enviado otro correo. Mira también el correo no deseado.","au_r_reenviar":"¿No te ha llegado? Enviar otro","au_r_tengo":"Ya tengo el código","au_r_verificar":"Verificar código"},
    en:{"au_r_cod_falta":"Enter your email and the code.","au_r_cod_mal":"The code is wrong or has expired. Request another.","au_r_cod_sub":"Enter your email and the 6-digit code we sent you.","au_r_cod_titulo":"Recover your access","au_r_codigo":"Code","au_r_email":"Email","au_r_enviado_v2":"If that email has an account, we've sent you an email to change your password. Check your spam folder too.","au_r_espera":"Wait a minute before requesting another.","au_r_reenviado":"We've sent you another email. Check your spam folder too.","au_r_reenviar":"Didn't get it? Send another","au_r_tengo":"I have the code","au_r_verificar":"Verify code"},
    pt:{"au_r_cod_falta":"Escreve o teu email e o código.","au_r_cod_mal":"O código não está correto ou expirou. Pede outro.","au_r_cod_sub":"Escreve o teu email e o código de 6 dígitos que te enviámos.","au_r_cod_titulo":"Recupera o teu acesso","au_r_codigo":"Código","au_r_email":"Email","au_r_enviado_v2":"Se esse email tiver conta, enviámos-te um email para mudares a palavra-passe. Vê também o correio não solicitado.","au_r_espera":"Espera um minuto antes de pedir outro.","au_r_reenviado":"Enviámos-te outro email. Vê também o correio não solicitado.","au_r_reenviar":"Não chegou? Enviar outro","au_r_tengo":"Já tenho o código","au_r_verificar":"Verificar código"},
    fr:{"au_r_cod_falta":"Saisis ton e-mail et le code.","au_r_cod_mal":"Le code est incorrect ou a expiré. Demandes-en un autre.","au_r_cod_sub":"Saisis ton e-mail et le code à 6 chiffres que nous t'avons envoyé.","au_r_cod_titulo":"Récupère ton accès","au_r_codigo":"Code","au_r_email":"E-mail","au_r_enviado_v2":"Si cet e-mail a un compte, nous t'avons envoyé un e-mail pour changer ton mot de passe. Regarde aussi dans les spams.","au_r_espera":"Attends une minute avant d'en demander un autre.","au_r_reenviado":"Nous t'avons envoyé un autre e-mail. Regarde aussi dans les spams.","au_r_reenviar":"Rien reçu ? En envoyer un autre","au_r_tengo":"J'ai le code","au_r_verificar":"Vérifier le code"},
    de:{"au_r_cod_falta":"Gib deine E-Mail und den Code ein.","au_r_cod_mal":"Der Code ist falsch oder abgelaufen. Fordere einen neuen an.","au_r_cod_sub":"Gib deine E-Mail und den 6-stelligen Code ein, den wir dir geschickt haben.","au_r_cod_titulo":"Zugang wiederherstellen","au_r_codigo":"Code","au_r_email":"E-Mail","au_r_enviado_v2":"Wenn diese E-Mail ein Konto hat, haben wir dir eine E-Mail zum Ändern des Passworts geschickt. Sieh auch im Spam nach.","au_r_espera":"Warte eine Minute, bevor du einen neuen anforderst.","au_r_reenviado":"Wir haben dir eine weitere E-Mail geschickt. Sieh auch im Spam nach.","au_r_reenviar":"Nicht erhalten? Neu senden","au_r_tengo":"Ich habe den Code","au_r_verificar":"Code prüfen"},
    it:{"au_r_cod_falta":"Scrivi la tua email e il codice.","au_r_cod_mal":"Il codice non è corretto o è scaduto. Richiedine un altro.","au_r_cod_sub":"Scrivi la tua email e il codice di 6 cifre che ti abbiamo inviato.","au_r_cod_titulo":"Recupera il tuo accesso","au_r_codigo":"Codice","au_r_email":"Email","au_r_enviado_v2":"Se questa email ha un account, ti abbiamo inviato un'email per cambiare la password. Controlla anche lo spam.","au_r_espera":"Attendi un minuto prima di richiederne un altro.","au_r_reenviado":"Ti abbiamo inviato un'altra email. Controlla anche lo spam.","au_r_reenviar":"Non ti è arrivato? Inviane un altro","au_r_tengo":"Ho già il codice","au_r_verificar":"Verifica codice"},
    nl:{"au_r_cod_falta":"Vul je e-mail en de code in.","au_r_cod_mal":"De code is onjuist of verlopen. Vraag een nieuwe aan.","au_r_cod_sub":"Vul je e-mail en de 6-cijferige code in die we je stuurden.","au_r_cod_titulo":"Herstel je toegang","au_r_codigo":"Code","au_r_email":"E-mail","au_r_enviado_v2":"Als dit e-mailadres een account heeft, hebben we je een e-mail gestuurd om je wachtwoord te wijzigen. Kijk ook bij je spam.","au_r_espera":"Wacht een minuut voordat je een nieuwe aanvraagt.","au_r_reenviado":"We hebben je nog een e-mail gestuurd. Kijk ook bij je spam.","au_r_reenviar":"Niet ontvangen? Stuur een nieuwe","au_r_tengo":"Ik heb de code","au_r_verificar":"Code controleren"},
    pl:{"au_r_cod_falta":"Wpisz e-mail i kod.","au_r_cod_mal":"Kod jest nieprawidłowy lub wygasł. Poproś o nowy.","au_r_cod_sub":"Wpisz e-mail i 6-cyfrowy kod, który ci wysłaliśmy.","au_r_cod_titulo":"Odzyskaj dostęp","au_r_codigo":"Kod","au_r_email":"E-mail","au_r_enviado_v2":"Jeśli ten adres ma konto, wysłaliśmy wiadomość do zmiany hasła. Sprawdź też folder spam.","au_r_espera":"Odczekaj minutę, zanim poprosisz o kolejny.","au_r_reenviado":"Wysłaliśmy kolejną wiadomość. Sprawdź też folder spam.","au_r_reenviar":"Nie dotarł? Wyślij ponownie","au_r_tengo":"Mam już kod","au_r_verificar":"Zweryfikuj kod"},
    el:{"au_r_cod_falta":"Γράψε το email σου και τον κωδικό.","au_r_cod_mal":"Ο κωδικός είναι λάθος ή έληξε. Ζήτησε άλλον.","au_r_cod_sub":"Γράψε το email σου και τον 6ψήφιο κωδικό που σου στείλαμε.","au_r_cod_titulo":"Ανάκτησε την πρόσβασή σου","au_r_codigo":"Κωδικός","au_r_email":"Email","au_r_enviado_v2":"Αν αυτό το email έχει λογαριασμό, σου στείλαμε email για να αλλάξεις τον κωδικό. Κοίτα και στα ανεπιθύμητα.","au_r_espera":"Περίμενε ένα λεπτό πριν ζητήσεις άλλο.","au_r_reenviado":"Σου στείλαμε άλλο email. Κοίτα και στα ανεπιθύμητα.","au_r_reenviar":"Δεν σου ήρθε; Στείλε άλλον","au_r_tengo":"Έχω ήδη τον κωδικό","au_r_verificar":"Επαλήθευση κωδικού"},
    hu:{"au_r_cod_falta":"Add meg az e-mail-címed és a kódot.","au_r_cod_mal":"A kód hibás vagy lejárt. Kérj újat.","au_r_cod_sub":"Add meg az e-mail-címed és a 6 jegyű kódot, amit elküldtünk.","au_r_cod_titulo":"Hozzáférés visszaállítása","au_r_codigo":"Kód","au_r_email":"E-mail-cím","au_r_enviado_v2":"Ha ehhez az e-mailhez tartozik fiók, küldtünk egy e-mailt a jelszó módosításához. Nézd meg a spam mappát is.","au_r_espera":"Várj egy percet, mielőtt újat kérsz.","au_r_reenviado":"Küldtünk még egy e-mailt. Nézd meg a spam mappát is.","au_r_reenviar":"Nem érkezett meg? Új küldése","au_r_tengo":"Megvan a kód","au_r_verificar":"Kód ellenőrzése"},
    ru:{"au_r_cod_falta":"Введите адрес почты и код.","au_r_cod_mal":"Код неверный или истёк. Запросите новый.","au_r_cod_sub":"Введите адрес почты и 6-значный код, который мы отправили.","au_r_cod_titulo":"Восстановите доступ","au_r_codigo":"Код","au_r_email":"Электронная почта","au_r_enviado_v2":"Если для этого адреса есть аккаунт, мы отправили письмо для смены пароля. Проверьте также папку «Спам».","au_r_espera":"Подождите минуту, прежде чем запросить ещё раз.","au_r_reenviado":"Мы отправили ещё одно письмо. Проверьте также папку «Спам».","au_r_reenviar":"Не пришло? Отправить ещё раз","au_r_tengo":"У меня есть код","au_r_verificar":"Проверить код"},
    ar:{"au_r_cod_falta":"اكتبي بريدك الإلكتروني والرمز.","au_r_cod_mal":"الرمز غير صحيح أو انتهت صلاحيته. اطلبي رمزاً آخر.","au_r_cod_sub":"اكتبي بريدك الإلكتروني والرمز المكوّن من 6 أرقام الذي أرسلناه إليك.","au_r_cod_titulo":"استعيدي الوصول إلى حسابك","au_r_codigo":"الرمز","au_r_email":"البريد الإلكتروني","au_r_enviado_v2":"إذا كان لهذا البريد حساب، فقد أرسلنا إليك بريداً لتغيير كلمة المرور. تحققي أيضاً من البريد غير المرغوب فيه.","au_r_espera":"انتظري دقيقة قبل طلب رسالة أخرى.","au_r_reenviado":"أرسلنا إليك بريداً آخر. تحققي أيضاً من البريد غير المرغوب فيه.","au_r_reenviar":"لم يصلك؟ أرسلي رمزاً آخر","au_r_tengo":"لديّ الرمز","au_r_verificar":"تحقق من الرمز"},
    zh:{"au_r_cod_falta":"请输入你的邮箱和验证码。","au_r_cod_mal":"验证码错误或已过期，请重新获取。","au_r_cod_sub":"请输入你的邮箱和我们发送的 6 位验证码。","au_r_cod_titulo":"找回你的账户","au_r_codigo":"验证码","au_r_email":"电子邮箱","au_r_enviado_v2":"如果该邮箱已注册，我们已发送更改密码的邮件。也请查看垃圾邮件。","au_r_espera":"请等待一分钟后再重新请求。","au_r_reenviado":"我们已再发送一封邮件。也请查看垃圾邮件。","au_r_reenviar":"没收到？重新发送","au_r_tengo":"我已有验证码","au_r_verificar":"验证"},
    ja:{"au_r_cod_falta":"メールアドレスとコードを入力してください。","au_r_cod_mal":"コードが正しくないか期限切れです。新しいコードを請求してください。","au_r_cod_sub":"メールアドレスと、お送りした6桁のコードを入力してください。","au_r_cod_titulo":"アクセスを復旧する","au_r_codigo":"コード","au_r_email":"メールアドレス","au_r_enviado_v2":"このメールアドレスにアカウントがあれば、パスワード変更用のメールを送りました。迷惑メールも確認してください。","au_r_espera":"もう一度リクエストする前に1分お待ちください。","au_r_reenviado":"別のメールを送りました。迷惑メールも確認してください。","au_r_reenviar":"届きませんか？再送信","au_r_tengo":"コードを持っています","au_r_verificar":"コードを確認"},
    ko:{"au_r_cod_falta":"이메일과 코드를 입력하세요.","au_r_cod_mal":"코드가 올바르지 않거나 만료되었습니다. 새 코드를 요청하세요.","au_r_cod_sub":"이메일과 보내 드린 6자리 코드를 입력하세요.","au_r_cod_titulo":"계정 접근 복구","au_r_codigo":"코드","au_r_email":"이메일","au_r_enviado_v2":"해당 이메일에 계정이 있으면 비밀번호 변경 메일을 보냈습니다. 스팸함도 확인하세요.","au_r_espera":"1분 후에 다시 요청하세요.","au_r_reenviado":"메일을 다시 보냈습니다. 스팸함도 확인하세요.","au_r_reenviar":"받지 못했나요? 다시 보내기","au_r_tengo":"코드가 있어요","au_r_verificar":"코드 확인"},
    sv:{"au_r_cod_falta":"Ange din e-post och koden.","au_r_cod_mal":"Koden är fel eller har gått ut. Begär en ny.","au_r_cod_sub":"Ange din e-post och den sexsiffriga koden vi skickade.","au_r_cod_titulo":"Återställ din åtkomst","au_r_codigo":"Kod","au_r_email":"E-post","au_r_enviado_v2":"Om e-postadressen har ett konto har vi skickat ett mejl för att byta lösenord. Titta även i skräpposten.","au_r_espera":"Vänta en minut innan du begär ett nytt.","au_r_reenviado":"Vi har skickat ett nytt mejl. Titta även i skräpposten.","au_r_reenviar":"Fick du inget? Skicka en ny","au_r_tengo":"Jag har koden","au_r_verificar":"Verifiera koden"}
  });
})();
(function () {
  if (!window.BBL || !BBL.extend) return;
  BBL.extend({
    es:{"au_r_volver":"Volver a Babyloon"},
    en:{"au_r_volver":"Back to Babyloon"},
    pt:{"au_r_volver":"Voltar à Babyloon"},
    fr:{"au_r_volver":"Retour à Babyloon"},
    de:{"au_r_volver":"Zurück zu Babyloon"},
    it:{"au_r_volver":"Torna a Babyloon"},
    nl:{"au_r_volver":"Terug naar Babyloon"},
    pl:{"au_r_volver":"Wróć do Babyloon"},
    el:{"au_r_volver":"Επιστροφή στη Babyloon"},
    hu:{"au_r_volver":"Vissza a Babyloonhoz"},
    ru:{"au_r_volver":"Вернуться в Babyloon"},
    ar:{"au_r_volver":"العودة إلى Babyloon"},
    zh:{"au_r_volver":"返回 Babyloon"},
    ja:{"au_r_volver":"Babyloonに戻る"},
    ko:{"au_r_volver":"Babyloon으로 돌아가기"},
    sv:{"au_r_volver":"Tillbaka till Babyloon"}
  });
})();
