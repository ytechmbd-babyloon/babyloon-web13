/* ═══════════════════════════════════════════════════════════════
   Babyloon · La edad y la aceptación de los textos — 16 idiomas
   ───────────────────────────────────────────────────────────────
   61.5 · El asesor legal lo pidió así: 18 años para todo el mundo,
   aceptación expresa al darse de alta, y un aviso que no se puede
   cerrar para las cuentas que ya existen cuando un texto cambia de
   forma sustancial. El servidor ya lo registra (61.4e); esto es lo
   que se lee en pantalla.

   Tres cosas que no se pueden perder al traducir:
     · `ac_casilla` lleva DOS huecos, `{terminos}` y `{privacidad}`,
       que se convierten en enlaces. Se sustituye el hueco, nunca una
       palabra de la frase: en dieciséis idiomas ningún `replace`
       sobre el texto acierta, y el que falla deja el enlace sin poner
       justo donde hay que poder pulsarlo.
     · En polaco, griego, ruso, húngaro y árabe la frase dice «los
       textos: X y Y» para que los enlaces vayan en nominativo, que es
       como se leen también sueltos en la lista del aviso.
     · Sin género. Donde el idioma marca el género en el pasado
       («przeczytałem/am», «прочитал/а») se ha dado la vuelta a la
       frase. Nada de imperativos en femenino en árabe.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({

    es:{ ac_casilla:'Tengo 18 años o más y acepto los {terminos} y la {privacidad}.',
      ac_l_terminos:'Términos y condiciones', ac_l_privacidad:'Política de privacidad',
      ac_l_condiciones:'Condiciones para profesionales',
      ac_e_alta:'Para crear la cuenta hay que tener 18 años o más y aceptar los términos.',
      ac_t:'Antes de seguir',
      ac_s:'Para usar Babyloon, confirma que tienes 18 años o más y acepta los textos que rigen el servicio.',
      ac_s_cambio:'Hemos actualizado estos textos. Léelos y acéptalos para seguir.',
      ac_check:'Tengo 18 años o más y he leído y acepto estos textos.',
      ac_ok:'Aceptar y seguir', ac_salir:'Salir',
      ac_falta:'Marca la casilla para seguir.',
      ac_err:'No hemos podido guardarlo. Inténtalo de nuevo.', ac_version:'versión {v}' },

    en:{ ac_casilla:'I am 18 or older and I accept the {terminos} and the {privacidad}.',
      ac_l_terminos:'Terms and conditions', ac_l_privacidad:'Privacy policy',
      ac_l_condiciones:'Terms for professionals',
      ac_e_alta:'To create an account you must be 18 or older and accept the terms.',
      ac_t:'Before you continue',
      ac_s:'To use Babyloon, confirm that you are 18 or older and accept the texts that govern the service.',
      ac_s_cambio:'We have updated these texts. Read and accept them to continue.',
      ac_check:'I am 18 or older and I have read and accept these texts.',
      ac_ok:'Accept and continue', ac_salir:'Sign out',
      ac_falta:'Tick the box to continue.',
      ac_err:'We could not save it. Please try again.', ac_version:'version {v}' },

    pt:{ ac_casilla:'Tenho 18 anos ou mais e aceito os {terminos} e a {privacidad}.',
      ac_l_terminos:'Termos e condições', ac_l_privacidad:'Política de privacidade',
      ac_l_condiciones:'Condições para profissionais',
      ac_e_alta:'Para criar a conta é preciso ter 18 anos ou mais e aceitar os termos.',
      ac_t:'Antes de continuar',
      ac_s:'Para usar a Babyloon, confirma que tens 18 anos ou mais e aceita os textos que regem o serviço.',
      ac_s_cambio:'Atualizámos estes textos. Lê-os e aceita-os para continuar.',
      ac_check:'Tenho 18 anos ou mais, li estes textos e aceito-os.',
      ac_ok:'Aceitar e continuar', ac_salir:'Sair',
      ac_falta:'Marca a caixa para continuar.',
      ac_err:'Não foi possível guardar. Tenta de novo.', ac_version:'versão {v}' },

    fr:{ ac_casilla:'J’ai 18 ans ou plus et j’accepte les {terminos} et la {privacidad}.',
      ac_l_terminos:'Conditions générales', ac_l_privacidad:'Politique de confidentialité',
      ac_l_condiciones:'Conditions professionnelles',
      ac_e_alta:'Pour créer un compte, il faut avoir 18 ans ou plus et accepter les conditions.',
      ac_t:'Avant de continuer',
      ac_s:'Pour utiliser Babyloon, confirmez que vous avez 18 ans ou plus et acceptez les textes qui régissent le service.',
      ac_s_cambio:'Nous avons mis à jour ces textes. Lisez-les et acceptez-les pour continuer.',
      ac_check:'J’ai 18 ans ou plus, j’ai lu ces textes et je les accepte.',
      ac_ok:'Accepter et continuer', ac_salir:'Se déconnecter',
      ac_falta:'Cochez la case pour continuer.',
      ac_err:'Impossible de l’enregistrer. Réessayez.', ac_version:'version {v}' },

    de:{ ac_casilla:'Ich bin mindestens 18 Jahre alt und akzeptiere die {terminos} und die {privacidad}.',
      ac_l_terminos:'Nutzungsbedingungen', ac_l_privacidad:'Datenschutzerklärung',
      ac_l_condiciones:'Bedingungen für Fachkräfte',
      ac_e_alta:'Um ein Konto zu erstellen, müssen Sie mindestens 18 Jahre alt sein und die Bedingungen akzeptieren.',
      ac_t:'Bevor es weitergeht',
      ac_s:'Um Babyloon zu nutzen, bestätigen Sie bitte, dass Sie mindestens 18 Jahre alt sind, und akzeptieren Sie die Texte, die den Dienst regeln.',
      ac_s_cambio:'Wir haben diese Texte aktualisiert. Lesen und akzeptieren Sie sie, um fortzufahren.',
      ac_check:'Ich bin mindestens 18 Jahre alt, habe diese Texte gelesen und akzeptiere sie.',
      ac_ok:'Akzeptieren und weiter', ac_salir:'Abmelden',
      ac_falta:'Setzen Sie das Häkchen, um fortzufahren.',
      ac_err:'Das konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.', ac_version:'Fassung {v}' },

    it:{ ac_casilla:'Ho almeno 18 anni e accetto i {terminos} e l’{privacidad}.',
      ac_l_terminos:'Termini e condizioni', ac_l_privacidad:'Informativa sulla privacy',
      ac_l_condiciones:'Condizioni professionali',
      ac_e_alta:'Per creare un account bisogna avere almeno 18 anni e accettare i termini.',
      ac_t:'Prima di continuare',
      ac_s:'Per usare Babyloon, conferma di avere almeno 18 anni e accetta i testi che regolano il servizio.',
      ac_s_cambio:'Abbiamo aggiornato questi testi. Leggili e accettali per continuare.',
      ac_check:'Ho almeno 18 anni, ho letto questi testi e li accetto.',
      ac_ok:'Accetta e continua', ac_salir:'Esci',
      ac_falta:'Spunta la casella per continuare.',
      ac_err:'Non è stato possibile salvarlo. Riprova.', ac_version:'versione {v}' },

    nl:{ ac_casilla:'Ik ben 18 jaar of ouder en ga akkoord met de {terminos} en het {privacidad}.',
      ac_l_terminos:'Algemene voorwaarden', ac_l_privacidad:'Privacybeleid',
      ac_l_condiciones:'Voorwaarden voor professionals',
      ac_e_alta:'Om een account aan te maken moet je 18 jaar of ouder zijn en akkoord gaan met de voorwaarden.',
      ac_t:'Voordat je verdergaat',
      ac_s:'Bevestig om Babyloon te gebruiken dat je 18 jaar of ouder bent, en ga akkoord met de teksten die de dienst regelen.',
      ac_s_cambio:'We hebben deze teksten bijgewerkt. Lees ze en ga akkoord om verder te gaan.',
      ac_check:'Ik ben 18 jaar of ouder, heb deze teksten gelezen en ga ermee akkoord.',
      ac_ok:'Akkoord en verder', ac_salir:'Uitloggen',
      ac_falta:'Vink het vakje aan om verder te gaan.',
      ac_err:'Opslaan is niet gelukt. Probeer het opnieuw.', ac_version:'versie {v}' },

    pl:{ ac_casilla:'Mam co najmniej 18 lat i akceptuję dokumenty: {terminos} oraz {privacidad}.',
      ac_l_terminos:'Regulamin', ac_l_privacidad:'Polityka prywatności',
      ac_l_condiciones:'Warunki dla profesjonalistów',
      ac_e_alta:'Aby utworzyć konto, trzeba mieć co najmniej 18 lat i zaakceptować regulamin.',
      ac_t:'Zanim przejdziesz dalej',
      ac_s:'Aby korzystać z Babyloon, potwierdź, że masz co najmniej 18 lat, i zaakceptuj teksty regulujące usługę.',
      ac_s_cambio:'Zaktualizowaliśmy te teksty. Przeczytaj je i zaakceptuj, aby kontynuować.',
      ac_check:'Mam co najmniej 18 lat i akceptuję te teksty.',
      ac_ok:'Akceptuję i kontynuuję', ac_salir:'Wyloguj się',
      ac_falta:'Zaznacz pole, aby kontynuować.',
      ac_err:'Nie udało się zapisać. Spróbuj ponownie.', ac_version:'wersja {v}' },

    el:{ ac_casilla:'Έχω συμπληρώσει τα 18 έτη και αποδέχομαι τα κείμενα: {terminos} και {privacidad}.',
      ac_l_terminos:'Όροι και προϋποθέσεις', ac_l_privacidad:'Πολιτική απορρήτου',
      ac_l_condiciones:'Όροι για επαγγελματίες',
      ac_e_alta:'Για να δημιουργήσεις λογαριασμό πρέπει να έχεις συμπληρώσει τα 18 και να αποδεχτείς τους όρους.',
      ac_t:'Πριν συνεχίσεις',
      ac_s:'Για να χρησιμοποιήσεις το Babyloon, επιβεβαίωσε ότι έχεις συμπληρώσει τα 18 και αποδέξου τα κείμενα που διέπουν την υπηρεσία.',
      ac_s_cambio:'Ενημερώσαμε αυτά τα κείμενα. Διάβασέ τα και αποδέξου τα για να συνεχίσεις.',
      ac_check:'Έχω συμπληρώσει τα 18 έτη, διάβασα αυτά τα κείμενα και τα αποδέχομαι.',
      ac_ok:'Αποδοχή και συνέχεια', ac_salir:'Αποσύνδεση',
      ac_falta:'Σημείωσε το πλαίσιο για να συνεχίσεις.',
      ac_err:'Δεν ήταν δυνατή η αποθήκευση. Δοκίμασε ξανά.', ac_version:'έκδοση {v}' },

    hu:{ ac_casilla:'Elmúltam 18 éves, és elfogadom a következőket: {terminos} és {privacidad}.',
      ac_l_terminos:'Felhasználási feltételek', ac_l_privacidad:'Adatvédelmi tájékoztató',
      ac_l_condiciones:'Feltételek szakembereknek',
      ac_e_alta:'Fiók létrehozásához legalább 18 évesnek kell lenned, és el kell fogadnod a feltételeket.',
      ac_t:'Mielőtt továbblépsz',
      ac_s:'A Babyloon használatához erősítsd meg, hogy elmúltál 18 éves, és fogadd el a szolgáltatásra vonatkozó szövegeket.',
      ac_s_cambio:'Frissítettük ezeket a szövegeket. Olvasd el és fogadd el őket a folytatáshoz.',
      ac_check:'Elmúltam 18 éves, elolvastam és elfogadom ezeket a szövegeket.',
      ac_ok:'Elfogadom és tovább', ac_salir:'Kijelentkezés',
      ac_falta:'A folytatáshoz jelöld be a négyzetet.',
      ac_err:'Nem sikerült menteni. Próbáld újra.', ac_version:'változat: {v}' },

    ru:{ ac_casilla:'Мне исполнилось 18 лет, и я принимаю документы: {terminos} и {privacidad}.',
      ac_l_terminos:'Условия использования', ac_l_privacidad:'Политика конфиденциальности',
      ac_l_condiciones:'Условия для специалистов',
      ac_e_alta:'Чтобы создать аккаунт, вам должно исполниться 18 лет и нужно принять условия.',
      ac_t:'Прежде чем продолжить',
      ac_s:'Чтобы пользоваться Babyloon, подтвердите, что вам исполнилось 18 лет, и примите тексты, регулирующие сервис.',
      ac_s_cambio:'Мы обновили эти тексты. Прочитайте и примите их, чтобы продолжить.',
      ac_check:'Мне исполнилось 18 лет, и, ознакомившись с этими текстами, я их принимаю.',
      ac_ok:'Принять и продолжить', ac_salir:'Выйти',
      ac_falta:'Отметьте поле, чтобы продолжить.',
      ac_err:'Не удалось сохранить. Попробуйте ещё раз.', ac_version:'версия {v}' },

    ar:{ ac_casilla:'عمري 18 عامًا أو أكثر، وأوافق على النصوص: {terminos} و{privacidad}.',
      ac_l_terminos:'الشروط والأحكام', ac_l_privacidad:'سياسة الخصوصية',
      ac_l_condiciones:'شروط الشراكة المهنية',
      ac_e_alta:'لإنشاء حساب، يلزم أن يكون العمر 18 عامًا أو أكثر مع الموافقة على الشروط.',
      ac_t:'قبل المتابعة',
      ac_s:'لاستخدام Babyloon، يلزم تأكيد أن العمر 18 عامًا أو أكثر والموافقة على النصوص التي تحكم الخدمة.',
      ac_s_cambio:'حدّثنا هذه النصوص. تلزم قراءتها والموافقة عليها للمتابعة.',
      ac_check:'عمري 18 عامًا أو أكثر، وقد قرأت هذه النصوص وأوافق عليها.',
      ac_ok:'الموافقة والمتابعة', ac_salir:'تسجيل الخروج',
      ac_falta:'يلزم تحديد المربع للمتابعة.',
      ac_err:'تعذّر الحفظ. تُرجى المحاولة مرة أخرى.', ac_version:'الإصدار {v}' },

    zh:{ ac_casilla:'我已年满18周岁，并接受{terminos}和{privacidad}。',
      ac_l_terminos:'条款和条件', ac_l_privacidad:'隐私政策',
      ac_l_condiciones:'专业人士条款',
      ac_e_alta:'创建账户须年满18周岁并接受相关条款。',
      ac_t:'继续之前',
      ac_s:'使用 Babyloon 前，请确认您已年满18周岁，并接受适用于本服务的文本。',
      ac_s_cambio:'我们更新了这些文本。请阅读并接受后继续。',
      ac_check:'我已年满18周岁，已阅读并接受这些文本。',
      ac_ok:'接受并继续', ac_salir:'退出登录',
      ac_falta:'请勾选方框后继续。',
      ac_err:'无法保存，请重试。', ac_version:'版本 {v}' },

    ja:{ ac_casilla:'18歳以上であり、{terminos}と{privacidad}に同意します。',
      ac_l_terminos:'利用規約', ac_l_privacidad:'プライバシーポリシー',
      ac_l_condiciones:'プロフェッショナル向け規約',
      ac_e_alta:'アカウントを作成するには、18歳以上であり、規約に同意する必要があります。',
      ac_t:'続ける前に',
      ac_s:'Babyloon をご利用いただくには、18歳以上であることを確認し、本サービスに適用される文書に同意してください。',
      ac_s_cambio:'これらの文書を更新しました。内容をお読みのうえ、同意して続けてください。',
      ac_check:'18歳以上であり、これらの文書を読み、同意します。',
      ac_ok:'同意して続ける', ac_salir:'ログアウト',
      ac_falta:'続けるにはチェックを入れてください。',
      ac_err:'保存できませんでした。もう一度お試しください。', ac_version:'バージョン {v}' },

    ko:{ ac_casilla:'만 18세 이상이며 {terminos} 및 {privacidad}에 동의합니다.',
      ac_l_terminos:'이용약관', ac_l_privacidad:'개인정보 처리방침',
      ac_l_condiciones:'전문가 이용 조건',
      ac_e_alta:'계정을 만들려면 만 18세 이상이어야 하며 약관에 동의해야 합니다.',
      ac_t:'계속하기 전에',
      ac_s:'Babyloon을 이용하려면 만 18세 이상임을 확인하고 서비스에 적용되는 문서에 동의해 주세요.',
      ac_s_cambio:'이 문서들을 업데이트했습니다. 읽고 동의하신 후 계속하세요.',
      ac_check:'만 18세 이상이며 이 문서들을 읽었고 동의합니다.',
      ac_ok:'동의하고 계속', ac_salir:'로그아웃',
      ac_falta:'계속하려면 체크박스를 선택하세요.',
      ac_err:'저장하지 못했습니다. 다시 시도하세요.', ac_version:'버전 {v}' },

    sv:{ ac_casilla:'Jag är 18 år eller äldre och godkänner {terminos} och {privacidad}.',
      ac_l_terminos:'Användarvillkoren', ac_l_privacidad:'Integritetspolicyn',
      ac_l_condiciones:'Villkoren för yrkesverksamma',
      ac_e_alta:'För att skapa ett konto måste du vara 18 år eller äldre och godkänna villkoren.',
      ac_t:'Innan du fortsätter',
      ac_s:'För att använda Babyloon behöver du bekräfta att du är 18 år eller äldre och godkänna texterna som gäller för tjänsten.',
      ac_s_cambio:'Vi har uppdaterat de här texterna. Läs och godkänn dem för att fortsätta.',
      ac_check:'Jag är 18 år eller äldre och har läst och godkänner de här texterna.',
      ac_ok:'Godkänn och fortsätt', ac_salir:'Logga ut',
      ac_falta:'Kryssa i rutan för att fortsätta.',
      ac_err:'Det gick inte att spara. Försök igen.', ac_version:'version {v}' }

  });
})();
