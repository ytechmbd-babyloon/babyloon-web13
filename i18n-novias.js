/* ═══════════════════════════════════════════════════════════════
   Babyloon · El espacio de novias — 26 claves × 16 idiomas
   ───────────────────────────────────────────────────────────────
   Una novia de Londres que se casa en Marbella en 2028 busca en
   inglés; una de Budapest que se casa en Santorini, en húngaro. Esta
   página no tiene sentido en un solo idioma.

   Dos decisiones de redacción que no son de traducción:

   · «Guardar» y no «Añadir a favoritos». Un favorito es un gusto; lo
     que hace aquí es armar el equipo de su boda. El verbo tiene que
     sonar a eso.
   · La barbería se nombra siempre en relación al novio. Es lo que
     pidió Andrés y es lo que ninguna web del sector hace: dar por
     hecho que la novia también organiza a quien se casa con ella.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({

    es:{ nv_entra_titulo:'Guarda tu lista', nv_entra_sub:'Crea tu cuenta o entra y guardamos a quien acabas de elegir.', nv_desde:'desde', nv_f_servicios:'Lo que hace', nv_f_portafolio:'Su trabajo', nv_f_opiniones:'Lo que dicen de ella', nv_f_nota:'La reserva se completa en la app, con pago protegido y garantía. Aquí no aparecen datos de contacto: el trato se cierra dentro de Babyloon, y por eso está protegido.', nv_aviso_verificando:'Hay {n} profesional(es) más en esta zona a la espera de verificación. Solo enseñamos a quien ya la ha pasado.', nv_aviso_otras:'Aquí todavía no, pero ya hay {n} en otras ciudades. Muchas viajan: prueba sin filtrar por ciudad.', nv_entrar:'Entrar al espacio de novias', nv_eyebrow:'Novias', nv_h1a:'Tu equipo', nv_h1b:'para ese día',
      nv_lead:'Maquillaje, peinado y uñas para ti, barbería para él. Búscalos donde te cases, guárdalos en tu lista y reserva Privée cuando lo tengas claro.',
      nv_ciudad:'Dónde te casas', nv_todas:'Todas las ciudades', nv_fecha:'Fecha de la boda',
      nv_invitados:'Invitados', nv_novio:'También barbería para el novio',
      nv_of_maquillaje:'Maquillaje', nv_of_peinado:'Peinado', nv_of_unas:'Uñas', nv_of_barberia:'Barbería · Él',
      nv_verificada:'Verificada', nv_certificada:'Certificada', nv_anios:'años',
      nv_servicios_boda:'servicios de boda', nv_guardar:'Guardar', nv_guardada:'Guardada ✓',
      nv_ver:'Ver ficha', nv_tu_lista:'Tu lista', nv_lista_vacia:'Aún no has guardado a nadie.',
      nv_entra_para_guardar:'Entra para guardar tu lista.', nv_reservar:'Reservar Privée en la app',
      nv_sin_resultados:'Todavía no hay profesionales de este oficio aquí. Prueba en otra ciudad o sin filtro.',
      nv_error:'No hemos podido cargar los perfiles. Inténtalo de nuevo.' },

    en:{ nv_entra_titulo:'Save your list', nv_entra_sub:'Create an account or sign in and we will keep the one you just chose.', nv_desde:'from', nv_f_servicios:'What she does', nv_f_portafolio:'Her work', nv_f_opiniones:'What clients say', nv_f_nota:'Booking is completed in the app, with protected payment and a guarantee. No contact details appear here: the deal closes inside Babyloon, which is what protects it.', nv_aviso_verificando:'There are {n} more professionals in this area awaiting verification. We only show those who have passed it.', nv_aviso_otras:'None here yet, but there are already {n} in other cities. Many travel: try without the city filter.', nv_entrar:'Enter the bridal space', nv_eyebrow:'Brides', nv_h1a:'Your team', nv_h1b:'for the day',
      nv_lead:'Make-up, hair and nails for you, barbering for him. Find them where you are marrying, save them to your list and book Privée when you are sure.',
      nv_ciudad:'Where you are marrying', nv_todas:'All cities', nv_fecha:'Wedding date',
      nv_invitados:'Guests', nv_novio:'Barbering for the groom too',
      nv_of_maquillaje:'Make-up', nv_of_peinado:'Hair', nv_of_unas:'Nails', nv_of_barberia:'Barber · Him',
      nv_verificada:'Verified', nv_certificada:'Certified', nv_anios:'years',
      nv_servicios_boda:'wedding services', nv_guardar:'Save', nv_guardada:'Saved ✓',
      nv_ver:'View profile', nv_tu_lista:'Your list', nv_lista_vacia:'You have not saved anyone yet.',
      nv_entra_para_guardar:'Sign in to save your list.', nv_reservar:'Book Privée in the app',
      nv_sin_resultados:'No professionals for this craft here yet. Try another city, or no filter.',
      nv_error:'We could not load the professionals. Please try again.' },

    pt:{ nv_entra_titulo:'Guarda a tua lista', nv_entra_sub:'Cria conta ou entra e guardamos quem acabaste de escolher.', nv_desde:'desde', nv_f_servicios:'O que faz', nv_f_portafolio:'O trabalho dela', nv_f_opiniones:'O que dizem dela', nv_f_nota:'A reserva conclui-se na app, com pagamento protegido e garantia. Aqui não aparecem contactos: o negócio fecha-se dentro da Babyloon, e é isso que o protege.', nv_aviso_verificando:'Há mais {n} profissionais nesta zona a aguardar verificação. Só mostramos quem já a passou.', nv_aviso_otras:'Aqui ainda não, mas já há {n} noutras cidades. Muitas viajam: tenta sem filtrar por cidade.', nv_entrar:'Entrar no espaço das noivas', nv_eyebrow:'Noivas', nv_h1a:'A tua equipa', nv_h1b:'para esse dia',
      nv_lead:'Maquilhagem, cabelo e unhas para ti, barbearia para ele. Procura-os onde te casas, guarda-os na tua lista e reserva Privée quando tiveres a certeza.',
      nv_ciudad:'Onde te casas', nv_todas:'Todas as cidades', nv_fecha:'Data do casamento',
      nv_invitados:'Convidados', nv_novio:'Também barbearia para o noivo',
      nv_of_maquillaje:'Maquilhagem', nv_of_peinado:'Cabelo', nv_of_unas:'Unhas', nv_of_barberia:'Barbearia · Ele',
      nv_verificada:'Verificada', nv_certificada:'Certificada', nv_anios:'anos',
      nv_servicios_boda:'serviços de casamento', nv_guardar:'Guardar', nv_guardada:'Guardada ✓',
      nv_ver:'Ver perfil', nv_tu_lista:'A tua lista', nv_lista_vacia:'Ainda não guardaste ninguém.',
      nv_entra_para_guardar:'Entra para guardar a tua lista.', nv_reservar:'Reservar Privée na app',
      nv_sin_resultados:'Ainda não há profissionais deste ofício aqui. Tenta noutra cidade ou sem filtro.',
      nv_error:'Não conseguimos carregar os perfis. Tenta de novo.' },

    fr:{ nv_entra_titulo:'Enregistrez votre liste', nv_entra_sub:'Créez un compte ou connectez-vous : nous gardons celle que vous venez de choisir.', nv_desde:'à partir de', nv_f_servicios:'Ce qu’elle fait', nv_f_portafolio:'Son travail', nv_f_opiniones:'Ce qu’on dit d’elle', nv_f_nota:'La réservation se termine dans l’application, avec paiement protégé et garantie. Aucune coordonnée n’apparaît ici : l’accord se conclut chez Babyloon, et c’est ce qui le protège.', nv_aviso_verificando:'{n} autre(s) profil(s) de cette zone attendent leur vérification. Nous n’affichons que ceux qui l’ont passée.', nv_aviso_otras:'Pas encore ici, mais il y en a déjà {n} dans d’autres villes. Beaucoup se déplacent : essayez sans filtre de ville.', nv_entrar:'Entrer dans l\u2019espace mariées', nv_eyebrow:'Mariées', nv_h1a:'Votre équipe', nv_h1b:'pour ce jour-là',
      nv_lead:'Maquillage, coiffure et ongles pour vous, barbier pour lui. Trouvez-les là où vous vous mariez, ajoutez-les à votre liste et réservez Privée quand ce sera clair pour vous.',
      nv_ciudad:'Où vous vous mariez', nv_todas:'Toutes les villes', nv_fecha:'Date du mariage',
      nv_invitados:'Invités', nv_novio:'Barbier pour le marié aussi',
      nv_of_maquillaje:'Maquillage', nv_of_peinado:'Coiffure', nv_of_unas:'Ongles', nv_of_barberia:'Barbier · Lui',
      nv_verificada:'Vérifiée', nv_certificada:'Certifiée', nv_anios:'ans',
      nv_servicios_boda:'prestations mariage', nv_guardar:'Enregistrer', nv_guardada:'Enregistrée ✓',
      nv_ver:'Voir le profil', nv_tu_lista:'Votre liste', nv_lista_vacia:'Vous n’avez encore enregistré personne.',
      nv_entra_para_guardar:'Connectez-vous pour enregistrer votre liste.', nv_reservar:'Réserver Privée dans l’app',
      nv_sin_resultados:'Pas encore de profils de ce métier ici. Essayez une autre ville, ou sans filtre.',
      nv_error:'Nous n’avons pas pu charger les profils. Réessayez.' },

    de:{ nv_entra_titulo:'Speichern Sie Ihre Liste', nv_entra_sub:'Konto erstellen oder anmelden – wir behalten die gerade Gewählte.', nv_desde:'ab', nv_f_servicios:'Was sie macht', nv_f_portafolio:'Ihre Arbeit', nv_f_opiniones:'Was man über sie sagt', nv_f_nota:'Die Buchung wird in der App abgeschlossen, mit geschützter Zahlung und Garantie. Hier erscheinen keine Kontaktdaten: Der Abschluss findet bei Babyloon statt, und genau das schützt ihn.', nv_aviso_verificando:'In dieser Gegend warten {n} weitere Fachkräfte auf die Prüfung. Wir zeigen nur geprüfte.', nv_aviso_otras:'Hier noch nicht, aber es gibt schon {n} in anderen Städten. Viele reisen: Versuchen Sie es ohne Stadtfilter.', nv_entrar:'Zum Bräute-Bereich', nv_eyebrow:'Bräute', nv_h1a:'Ihr Team', nv_h1b:'für diesen Tag',
      nv_lead:'Make-up, Haare und Nägel für Sie, Barbier für ihn. Finden Sie sie dort, wo Sie heiraten, speichern Sie sie in Ihrer Liste und buchen Sie Privée, wenn Sie sicher sind.',
      nv_ciudad:'Wo Sie heiraten', nv_todas:'Alle Städte', nv_fecha:'Hochzeitsdatum',
      nv_invitados:'Gäste', nv_novio:'Auch Barbier für den Bräutigam',
      nv_of_maquillaje:'Make-up', nv_of_peinado:'Haare', nv_of_unas:'Nägel', nv_of_barberia:'Barbier · Er',
      nv_verificada:'Geprüft', nv_certificada:'Zertifiziert', nv_anios:'Jahre',
      nv_servicios_boda:'Hochzeitsleistungen', nv_guardar:'Speichern', nv_guardada:'Gespeichert ✓',
      nv_ver:'Profil ansehen', nv_tu_lista:'Ihre Liste', nv_lista_vacia:'Sie haben noch niemanden gespeichert.',
      nv_entra_para_guardar:'Melden Sie sich an, um Ihre Liste zu speichern.', nv_reservar:'Privée in der App buchen',
      nv_sin_resultados:'Hier gibt es noch keine Fachkräfte für dieses Handwerk. Versuchen Sie eine andere Stadt oder ohne Filter.',
      nv_error:'Die Fachkräfte konnten nicht geladen werden. Bitte erneut versuchen.' },

    it:{ nv_entra_titulo:'Salva la tua lista', nv_entra_sub:'Crea un account o accedi e teniamo quella che hai appena scelto.', nv_desde:'da', nv_f_servicios:'Cosa fa', nv_f_portafolio:'Il suo lavoro', nv_f_opiniones:'Cosa dicono di lei', nv_f_nota:'La prenotazione si conclude nell’app, con pagamento protetto e garanzia. Qui non compaiono contatti: l’accordo si chiude dentro Babyloon, ed è questo che lo protegge.', nv_aviso_verificando:'Ci sono altri {n} profili in questa zona in attesa di verifica. Mostriamo solo chi l’ha superata.', nv_aviso_otras:'Qui non ancora, ma ce ne sono già {n} in altre città. Molte viaggiano: prova senza filtro città.', nv_entrar:'Entra nello spazio spose', nv_eyebrow:'Spose', nv_h1a:'La tua squadra', nv_h1b:'per quel giorno',
      nv_lead:'Trucco, capelli e unghie per te, barbiere per lui. Cercali dove ti sposi, salvali nella tua lista e prenota Privée quando ti sarà chiaro.',
      nv_ciudad:'Dove ti sposi', nv_todas:'Tutte le città', nv_fecha:'Data del matrimonio',
      nv_invitados:'Invitati', nv_novio:'Anche barbiere per lo sposo',
      nv_of_maquillaje:'Trucco', nv_of_peinado:'Capelli', nv_of_unas:'Unghie', nv_of_barberia:'Barbiere · Lui',
      nv_verificada:'Verificata', nv_certificada:'Certificata', nv_anios:'anni',
      nv_servicios_boda:'servizi da matrimonio', nv_guardar:'Salva', nv_guardada:'Salvata ✓',
      nv_ver:'Vedi profilo', nv_tu_lista:'La tua lista', nv_lista_vacia:'Non hai ancora salvato nessuno.',
      nv_entra_para_guardar:'Accedi per salvare la tua lista.', nv_reservar:'Prenota Privée nell’app',
      nv_sin_resultados:'Qui non c’è ancora nessuno di questo mestiere. Prova un’altra città, o senza filtro.',
      nv_error:'Non siamo riusciti a caricare i profili. Riprova.' },

    nl:{ nv_entra_titulo:'Bewaar je lijst', nv_entra_sub:'Maak een account of log in; we bewaren wie je net koos.', nv_desde:'vanaf', nv_f_servicios:'Wat ze doet', nv_f_portafolio:'Haar werk', nv_f_opiniones:'Wat men over haar zegt', nv_f_nota:'De boeking rond je af in de app, met beschermde betaling en garantie. Hier staan geen contactgegevens: de afspraak wordt binnen Babyloon gesloten, en dat is wat haar beschermt.', nv_aviso_verificando:'Er zijn nog {n} professionals in deze omgeving die op verificatie wachten. We tonen alleen wie die heeft doorstaan.', nv_aviso_otras:'Hier nog niet, maar er zijn er al {n} in andere steden. Velen reizen: probeer het zonder stadsfilter.', nv_entrar:'Naar de bruidenruimte', nv_eyebrow:'Bruiden', nv_h1a:'Jouw team', nv_h1b:'voor die dag',
      nv_lead:'Make-up, haar en nagels voor jou, barbier voor hem. Zoek ze waar je trouwt, zet ze op je lijst en boek Privée zodra je het zeker weet.',
      nv_ciudad:'Waar je trouwt', nv_todas:'Alle steden', nv_fecha:'Trouwdatum',
      nv_invitados:'Gasten', nv_novio:'Ook barbier voor de bruidegom',
      nv_of_maquillaje:'Make-up', nv_of_peinado:'Haar', nv_of_unas:'Nagels', nv_of_barberia:'Barbier · Hij',
      nv_verificada:'Geverifieerd', nv_certificada:'Gecertificeerd', nv_anios:'jaar',
      nv_servicios_boda:'bruiloftsbehandelingen', nv_guardar:'Bewaren', nv_guardada:'Bewaard ✓',
      nv_ver:'Profiel bekijken', nv_tu_lista:'Jouw lijst', nv_lista_vacia:'Je hebt nog niemand bewaard.',
      nv_entra_para_guardar:'Log in om je lijst te bewaren.', nv_reservar:'Privée boeken in de app',
      nv_sin_resultados:'Hier zijn nog geen professionals voor dit vak. Probeer een andere stad, of zonder filter.',
      nv_error:'We konden de professionals niet laden. Probeer het opnieuw.' },

    pl:{ nv_entra_titulo:'Zapisz swoją listę', nv_entra_sub:'Załóż konto lub zaloguj się, a zachowamy tę, którą właśnie wybrałaś.', nv_desde:'od', nv_f_servicios:'Czym się zajmuje', nv_f_portafolio:'Jej prace', nv_f_opiniones:'Co o niej mówią', nv_f_nota:'Rezerwację kończysz w aplikacji, z chronioną płatnością i gwarancją. Nie ma tu danych kontaktowych: umowa zawiera się wewnątrz Babyloon i to właśnie ją chroni.', nv_aviso_verificando:'W tej okolicy jest jeszcze {n} profili czekających na weryfikację. Pokazujemy tylko te, które ją przeszły.', nv_aviso_otras:'Tutaj jeszcze nie, ale jest już {n} w innych miastach. Wiele podróżuje: spróbuj bez filtra miasta.', nv_entrar:'Wejdź do strefy panien młodych', nv_eyebrow:'Panny młode', nv_h1a:'Twój zespół', nv_h1b:'na ten dzień',
      nv_lead:'Makijaż, fryzura i paznokcie dla Ciebie, barber dla niego. Znajdź ich tam, gdzie bierzesz ślub, zapisz na swojej liście i zarezerwuj Privée, gdy będzie to dla Ciebie jasne.',
      nv_ciudad:'Gdzie bierzesz ślub', nv_todas:'Wszystkie miasta', nv_fecha:'Data ślubu',
      nv_invitados:'Goście', nv_novio:'Także barber dla pana młodego',
      nv_of_maquillaje:'Makijaż', nv_of_peinado:'Fryzura', nv_of_unas:'Paznokcie', nv_of_barberia:'Barber · On',
      nv_verificada:'Zweryfikowana', nv_certificada:'Certyfikowana', nv_anios:'lat',
      nv_servicios_boda:'usług ślubnych', nv_guardar:'Zapisz', nv_guardada:'Na liście ✓',
      nv_ver:'Zobacz profil', nv_tu_lista:'Twoja lista', nv_lista_vacia:'Nikogo jeszcze nie zapisałaś.',
      nv_entra_para_guardar:'Zaloguj się, aby zapisać listę.', nv_reservar:'Zarezerwuj Privée w aplikacji',
      nv_sin_resultados:'Nie ma tu jeszcze profili z tego fachu. Spróbuj w innym mieście albo bez filtra.',
      nv_error:'Nie udało się wczytać profili. Spróbuj ponownie.' },

    el:{ nv_entra_titulo:'Κράτησε τη λίστα σου', nv_entra_sub:'Δημιούργησε λογαριασμό ή σύνδεσου και κρατάμε αυτήν που μόλις διάλεξες.', nv_desde:'από', nv_f_servicios:'Τι κάνει', nv_f_portafolio:'Η δουλειά της', nv_f_opiniones:'Τι λένε γι’ αυτήν', nv_f_nota:'Η κράτηση ολοκληρώνεται στην εφαρμογή, με προστατευμένη πληρωμή και εγγύηση. Εδώ δεν εμφανίζονται στοιχεία επικοινωνίας: η συμφωνία κλείνει μέσα στο Babyloon, και αυτό είναι που την προστατεύει.', nv_aviso_verificando:'Υπάρχουν άλλες {n} επαγγελματίες σε αυτή την περιοχή σε αναμονή πιστοποίησης. Δείχνουμε μόνο όσες την έχουν περάσει.', nv_aviso_otras:'Εδώ όχι ακόμη, αλλά υπάρχουν ήδη {n} σε άλλες πόλεις. Πολλές ταξιδεύουν: δοκίμασε χωρίς φίλτρο πόλης.', nv_entrar:'Μπες στον χώρο των νυφών', nv_eyebrow:'Νύφες', nv_h1a:'Η ομάδα σου', nv_h1b:'για εκείνη τη μέρα',
      nv_lead:'Μακιγιάζ, μαλλιά και νύχια για σένα, κούρεμα για εκείνον. Βρες τους εκεί που παντρεύεσαι, κράτησέ τους στη λίστα σου και κλείσε Privée όταν το αποφασίσεις.',
      nv_ciudad:'Πού παντρεύεσαι', nv_todas:'Όλες οι πόλεις', nv_fecha:'Ημερομηνία γάμου',
      nv_invitados:'Καλεσμένοι', nv_novio:'Και κούρεμα για τον γαμπρό',
      nv_of_maquillaje:'Μακιγιάζ', nv_of_peinado:'Μαλλιά', nv_of_unas:'Νύχια', nv_of_barberia:'Κουρείο · Αυτός',
      nv_verificada:'Πιστοποιημένη', nv_certificada:'Με δίπλωμα', nv_anios:'χρόνια',
      nv_servicios_boda:'υπηρεσίες γάμου', nv_guardar:'Αποθήκευση', nv_guardada:'Αποθηκεύτηκε ✓',
      nv_ver:'Δες το προφίλ', nv_tu_lista:'Η λίστα σου', nv_lista_vacia:'Δεν έχεις αποθηκεύσει ακόμη κανέναν.',
      nv_entra_para_guardar:'Σύνδεσου για να κρατήσεις τη λίστα σου.', nv_reservar:'Κλείσε Privée στην εφαρμογή',
      nv_sin_resultados:'Δεν υπάρχουν ακόμη επαγγελματίες αυτής της τέχνης εδώ. Δοκίμασε άλλη πόλη ή χωρίς φίλτρο.',
      nv_error:'Δεν μπορέσαμε να φορτώσουμε τις επαγγελματίες. Δοκίμασε ξανά.' },

    hu:{ nv_entra_titulo:'Mentsd el a listád', nv_entra_sub:'Hozz létre fiókot vagy lépj be, és megőrizzük, akit épp kiválasztottál.', nv_desde:'ettől', nv_f_servicios:'Amit csinál', nv_f_portafolio:'A munkái', nv_f_opiniones:'Amit mondanak róla', nv_f_nota:'A foglalást az appban fejezed be, védett fizetéssel és garanciával. Itt nem jelennek meg elérhetőségek: a megállapodás a Babyloonon belül születik, és épp ez védi.', nv_aviso_verificando:'Ebben a körzetben még {n} szakember vár ellenőrzésre. Csak azokat mutatjuk, akik már átmentek rajta.', nv_aviso_otras:'Itt még nincs, de más városokban már van {n}. Sokan utaznak: próbáld városszűrő nélkül.', nv_entrar:'Belépés a menyasszonyok terébe', nv_eyebrow:'Menyasszonyok', nv_h1a:'A csapatod', nv_h1b:'arra a napra',
      nv_lead:'Smink, haj és köröm neked, borbély neki. Keresd meg őket ott, ahol esküszöl, tedd a listádra, és foglalj Privée-t, amikor biztos vagy benne.',
      nv_ciudad:'Hol esküsztök', nv_todas:'Minden város', nv_fecha:'Az esküvő napja',
      nv_invitados:'Vendégek', nv_novio:'Borbély a vőlegénynek is',
      nv_of_maquillaje:'Smink', nv_of_peinado:'Haj', nv_of_unas:'Köröm', nv_of_barberia:'Borbély · Ő',
      nv_verificada:'Ellenőrzött', nv_certificada:'Minősített', nv_anios:'év',
      nv_servicios_boda:'esküvői szolgáltatás', nv_guardar:'Mentés', nv_guardada:'Elmentve ✓',
      nv_ver:'Profil megtekintése', nv_tu_lista:'A listád', nv_lista_vacia:'Még senkit sem mentettél el.',
      nv_entra_para_guardar:'Jelentkezz be a lista mentéséhez.', nv_reservar:'Privée foglalás az appban',
      nv_sin_resultados:'Itt még nincs ilyen szakember. Próbálj másik várost, vagy szűrő nélkül.',
      nv_error:'Nem sikerült betölteni a szakembereket. Próbáld újra.' },

    ru:{ nv_entra_titulo:'Сохраните свой список', nv_entra_sub:'Создайте аккаунт или войдите — мы сохраним ту, которую вы только что выбрали.', nv_desde:'от', nv_f_servicios:'Что она делает', nv_f_portafolio:'Её работы', nv_f_opiniones:'Что о ней говорят', nv_f_nota:'Бронирование завершается в приложении, с защищённой оплатой и гарантией. Здесь нет контактов: сделка заключается внутри Babyloon, и именно это её защищает.', nv_aviso_verificando:'В этом районе ещё {n} мастеров ожидают проверки. Мы показываем только прошедших её.', nv_aviso_otras:'Здесь пока нет, но в других городах уже {n}. Многие выезжают: попробуйте без фильтра по городу.', nv_entrar:'В раздел для невест', nv_eyebrow:'Невестам', nv_h1a:'Ваша команда', nv_h1b:'на этот день',
      nv_lead:'Макияж, причёска и маникюр для вас, барбер для него. Найдите их там, где вы женитесь, сохраните в свой список и забронируйте Privée, когда будете уверены.',
      nv_ciudad:'Где вы женитесь', nv_todas:'Все города', nv_fecha:'Дата свадьбы',
      nv_invitados:'Гости', nv_novio:'Барбер и для жениха',
      nv_of_maquillaje:'Макияж', nv_of_peinado:'Причёска', nv_of_unas:'Ногти', nv_of_barberia:'Барбер · Он',
      nv_verificada:'Проверена', nv_certificada:'С сертификатом', nv_anios:'лет',
      nv_servicios_boda:'свадебных услуг', nv_guardar:'Сохранить', nv_guardada:'Сохранена ✓',
      nv_ver:'Смотреть профиль', nv_tu_lista:'Ваш список', nv_lista_vacia:'Вы ещё никого не сохранили.',
      nv_entra_para_guardar:'Войдите, чтобы сохранить список.', nv_reservar:'Забронировать Privée в приложении',
      nv_sin_resultados:'Здесь пока нет мастеров этого профиля. Попробуйте другой город или снимите фильтр.',
      nv_error:'Не удалось загрузить мастеров. Попробуйте ещё раз.' },

    ar:{ nv_entra_titulo:'احفظي قائمتك', nv_entra_sub:'أنشئ حسابًا أو ادخل وسنحتفظ بمن اخترته للتو.', nv_desde:'ابتداءً من', nv_f_servicios:'ما تقدّمه', nv_f_portafolio:'أعمالها', nv_f_opiniones:'ما يُقال عنها', nv_f_nota:'يكتمل الحجز في التطبيق، بدفع محمي وضمان. لا تظهر هنا بيانات اتصال: الاتفاق يُبرم داخل بابيلون، وهذا ما يحميه.', nv_aviso_verificando:'هناك {n} ملفات أخرى في هذه المنطقة بانتظار التوثيق. نعرض فقط من اجتازه.', nv_aviso_otras:'ليس هنا بعد، لكن هناك {n} في مدن أخرى. كثيرون يسافرون: جرّب بدون تصفية المدينة.', nv_entrar:'الدخول إلى ركن العرائس', nv_eyebrow:'العرائس', nv_h1a:'فريقك', nv_h1b:'ليوم زفافك',
      nv_lead:'مكياج وتصفيف وأظافر وحلاقة لمن يتزوج ولمن يرافقه. ابحث عنهم حيث تتزوج، احفظهم في قائمتك، واحجز Privée عندما تقرر.',
      nv_ciudad:'أين تتزوج', nv_todas:'كل المدن', nv_fecha:'تاريخ الزفاف',
      nv_invitados:'المدعوّون', nv_novio:'وحلاقة للعريس أيضًا',
      nv_of_maquillaje:'مكياج', nv_of_peinado:'تصفيف', nv_of_unas:'أظافر', nv_of_barberia:'حلاقة · له',
      nv_verificada:'موثّقة', nv_certificada:'معتمدة', nv_anios:'سنة',
      nv_servicios_boda:'خدمات زفاف', nv_guardar:'حفظ', nv_guardada:'محفوظة ✓',
      nv_ver:'عرض الملف', nv_tu_lista:'قائمتك', nv_lista_vacia:'لم تحفظي أحدًا بعد.',
      nv_entra_para_guardar:'تسجيل الدخول لحفظ القائمة.', nv_reservar:'حجز Privée في التطبيق',
      nv_sin_resultados:'لا توجد ملفات لهذه المهنة هنا بعد. جرّب مدينة أخرى أو بدون تصفية.',
      nv_error:'تعذّر تحميل الملفات. حاول مرة أخرى.' },

    zh:{ nv_entra_titulo:'保存你的清单', nv_entra_sub:'创建账户或登录，我们会保留你刚选择的这一位。', nv_desde:'起价', nv_f_servicios:'她的服务', nv_f_portafolio:'她的作品', nv_f_opiniones:'客户评价', nv_f_nota:'预约在应用内完成，付款受保护并附带保障。此处不显示联系方式：交易在 Babyloon 内完成，这正是保障的来源。', nv_aviso_verificando:'本地区还有 {n} 位专业人员正在等待认证。我们只展示已通过认证的。', nv_aviso_otras:'此地暂时还没有，但其他城市已有 {n} 位。许多人可以出行：请尝试取消城市筛选。', nv_entrar:'进入新娘专区', nv_eyebrow:'新娘', nv_h1a:'属于你的团队', nv_h1b:'为了那一天',
      nv_lead:'为你准备妆容、发型与美甲，为他安排理容。在你举办婚礼的城市寻找他们，收进你的清单，确定后在应用内预约 Privée。',
      nv_ciudad:'婚礼城市', nv_todas:'所有城市', nv_fecha:'婚礼日期',
      nv_invitados:'宾客人数', nv_novio:'也为新郎安排理容',
      nv_of_maquillaje:'妆容', nv_of_peinado:'发型', nv_of_unas:'美甲', nv_of_barberia:'理容 · 新郎',
      nv_verificada:'已认证', nv_certificada:'持证', nv_anios:'年',
      nv_servicios_boda:'项婚礼服务', nv_guardar:'收藏', nv_guardada:'已收藏 ✓',
      nv_ver:'查看资料', nv_tu_lista:'你的清单', nv_lista_vacia:'你还没有收藏任何人。',
      nv_entra_para_guardar:'登录后即可保存清单。', nv_reservar:'在应用内预约 Privée',
      nv_sin_resultados:'此地暂无该门类的专业人员。请换一个城市，或取消筛选。',
      nv_error:'未能加载专业人员，请重试。' },

    ja:{ nv_entra_titulo:'リストを保存', nv_entra_sub:'アカウントを作成またはログインすると、今選んだ方を保存します。', nv_desde:'〜から', nv_f_servicios:'できること', nv_f_portafolio:'これまでの仕事', nv_f_opiniones:'お客様の声', nv_f_nota:'ご予約はアプリで完了します。お支払いは保護され、保証が付きます。ここに連絡先は表示されません。取引は Babyloon の中で完結し、それが保護の理由です。', nv_aviso_verificando:'このエリアには認証待ちのプロがあと {n} 名います。認証を通過した方のみを掲載しています。', nv_aviso_otras:'この街にはまだいませんが、他の都市にはすでに {n} 名います。出張可能な方も多いので、都市の絞り込みを外してお試しください。', nv_entrar:'花嫁のためのページへ', nv_eyebrow:'花嫁の方へ', nv_h1a:'あなたのチーム', nv_h1b:'その日のために',
      nv_lead:'あなたにはメイク・ヘア・ネイルを、彼にはバーバーを。挙式される街で探し、リストに保存し、決まったらアプリで Privée をご予約ください。',
      nv_ciudad:'挙式される街', nv_todas:'すべての都市', nv_fecha:'挙式日',
      nv_invitados:'ご列席人数', nv_novio:'新郎のバーバーも',
      nv_of_maquillaje:'メイク', nv_of_peinado:'ヘア', nv_of_unas:'ネイル', nv_of_barberia:'バーバー · 新郎',
      nv_verificada:'認証済み', nv_certificada:'資格保有', nv_anios:'年',
      nv_servicios_boda:'件のブライダルメニュー', nv_guardar:'保存', nv_guardada:'保存済み ✓',
      nv_ver:'プロフィールを見る', nv_tu_lista:'あなたのリスト', nv_lista_vacia:'まだ誰も保存されていません。',
      nv_entra_para_guardar:'ログインするとリストを保存できます。', nv_reservar:'アプリで Privée を予約',
      nv_sin_resultados:'この街にはまだこの分野のプロがいません。別の都市を試すか、絞り込みを外してください。',
      nv_error:'プロを読み込めませんでした。もう一度お試しください。' },

    ko:{ nv_entra_titulo:'리스트 저장', nv_entra_sub:'계정을 만들거나 로그인하면 방금 선택한 분을 저장해 드립니다.', nv_desde:'부터', nv_f_servicios:'하는 일', nv_f_portafolio:'작업물', nv_f_opiniones:'고객 후기', nv_f_nota:'예약은 앱에서 완료되며, 결제는 보호되고 보증이 함께합니다. 여기에는 연락처가 표시되지 않습니다. 거래는 Babyloon 안에서 이루어지고, 그것이 보호의 이유입니다.', nv_aviso_verificando:'이 지역에 인증을 기다리는 전문가가 {n}명 더 있습니다. 인증을 통과한 분만 보여드립니다.', nv_aviso_otras:'이곳에는 아직 없지만 다른 도시에는 이미 {n}명이 있습니다. 출장 가능한 분이 많으니 도시 필터를 해제해 보세요.', nv_entrar:'신부 전용 공간으로', nv_eyebrow:'신부님께', nv_h1a:'당신의 팀', nv_h1b:'그날을 위해',
      nv_lead:'신부에게는 메이크업과 헤어, 네일을, 신랑에게는 바버를. 결혼하실 도시에서 찾아 리스트에 저장하고, 확신이 서면 앱에서 Privée를 예약하세요.',
      nv_ciudad:'결혼하는 도시', nv_todas:'모든 도시', nv_fecha:'결혼식 날짜',
      nv_invitados:'하객 수', nv_novio:'신랑 바버도 함께',
      nv_of_maquillaje:'메이크업', nv_of_peinado:'헤어', nv_of_unas:'네일', nv_of_barberia:'바버 · 신랑',
      nv_verificada:'인증됨', nv_certificada:'자격 보유', nv_anios:'년',
      nv_servicios_boda:'개의 웨딩 서비스', nv_guardar:'저장', nv_guardada:'저장됨 ✓',
      nv_ver:'프로필 보기', nv_tu_lista:'내 리스트', nv_lista_vacia:'아직 저장한 분이 없습니다.',
      nv_entra_para_guardar:'로그인하면 리스트를 저장할 수 있습니다.', nv_reservar:'앱에서 Privée 예약',
      nv_sin_resultados:'이 도시에는 아직 해당 분야의 전문가가 없습니다. 다른 도시를 선택하거나 필터를 해제해 보세요.',
      nv_error:'전문가를 불러오지 못했습니다. 다시 시도해 주세요.' },

    sv:{ nv_entra_titulo:'Spara din lista', nv_entra_sub:'Skapa ett konto eller logga in – vi behåller den du just valde.', nv_desde:'från', nv_f_servicios:'Vad hon gör', nv_f_portafolio:'Hennes arbete', nv_f_opiniones:'Vad man säger om henne', nv_f_nota:'Bokningen slutförs i appen, med skyddad betalning och garanti. Inga kontaktuppgifter visas här: avtalet sluts inom Babyloon, och det är det som skyddar det.', nv_aviso_verificando:'Det finns {n} proffs till i det här området som väntar på verifiering. Vi visar bara dem som har klarat den.', nv_aviso_otras:'Inte här än, men det finns redan {n} i andra städer. Många reser: prova utan stadsfilter.', nv_entrar:'Till brudrummet', nv_eyebrow:'Brudar', nv_h1a:'Ditt team', nv_h1b:'för den dagen',
      nv_lead:'Smink, hår och naglar för dig, barberare för honom. Hitta dem där ni gifter er, spara dem i din lista och boka Privée när du är säker.',
      nv_ciudad:'Var ni gifter er', nv_todas:'Alla städer', nv_fecha:'Bröllopsdatum',
      nv_invitados:'Gäster', nv_novio:'Barberare för brudgummen också',
      nv_of_maquillaje:'Smink', nv_of_peinado:'Hår', nv_of_unas:'Naglar', nv_of_barberia:'Barberare · Han',
      nv_verificada:'Verifierad', nv_certificada:'Certifierad', nv_anios:'år',
      nv_servicios_boda:'bröllopstjänster', nv_guardar:'Spara', nv_guardada:'Sparad ✓',
      nv_ver:'Visa profil', nv_tu_lista:'Din lista', nv_lista_vacia:'Du har inte sparat någon än.',
      nv_entra_para_guardar:'Logga in för att spara din lista.', nv_reservar:'Boka Privée i appen',
      nv_sin_resultados:'Inga proffs inom detta yrke här än. Prova en annan stad, eller utan filter.',
      nv_error:'Vi kunde inte ladda proffsen. Försök igen.' }

  });

  /* ── Bloque 20.2c · el permiso para escribirle ──────────────────────
     Sin casilla marcada no se guarda ni su nombre ni su correo: la
     función del servidor tira el correo si `acepta_contacto` viene a
     false. Esto no es sólo el RGPD; escribir a quien no lo pidió quema
     la marca, y una novia habla con veinte amigas.
     El texto dice para qué es y que se puede borrar. Nada de «acepto
     las condiciones» en letra pequeña. */
  BBL.extend({
    es:{ nv_c_titulo:'¿Te echamos una mano?', nv_c_texto:'Quiero que Babyloon me escriba con ideas y profesionales para mi día.', nv_c_nombre:'Tu nombre', nv_c_email:'Tu correo', nv_c_boton:'Avisadme', nv_c_hecho:'Hecho. Te escribimos pronto con ideas para tu boda.', nv_c_error:'Revisa el correo, por favor.', nv_c_legal:'Solo para esto. Puedes pedirnos que lo borremos cuando quieras.' },
    en:{ nv_c_titulo:'Want a hand?', nv_c_texto:'I would like Babyloon to write to me with ideas and professionals for my day.', nv_c_nombre:'Your name', nv_c_email:'Your email', nv_c_boton:'Keep me posted', nv_c_hecho:'Done. We will write soon with ideas for your wedding.', nv_c_error:'Please check the email address.', nv_c_legal:'For this only. You can ask us to delete it whenever you like.' },
    pt:{ nv_c_titulo:'Quer uma ajuda?', nv_c_texto:'Quero que a Babyloon me escreva com ideias e profissionais para o meu dia.', nv_c_nombre:'O seu nome', nv_c_email:'O seu email', nv_c_boton:'Avisem-me', nv_c_hecho:'Feito. Escrevemos em breve com ideias para o seu casamento.', nv_c_error:'Verifique o email, por favor.', nv_c_legal:'Só para isto. Pode pedir-nos que o apaguemos quando quiser.' },
    fr:{ nv_c_titulo:'On vous donne un coup de main ?', nv_c_texto:'Je souhaite que Babyloon m’écrive avec des idées et des professionnels pour mon grand jour.', nv_c_nombre:'Votre nom', nv_c_email:'Votre e-mail', nv_c_boton:'Tenez-moi au courant', nv_c_hecho:'C’est fait. Nous vous écrirons bientôt avec des idées pour votre mariage.', nv_c_error:'Vérifiez l’adresse e-mail, s’il vous plaît.', nv_c_legal:'Uniquement pour cela. Vous pouvez nous demander de l’effacer quand vous voulez.' },
    de:{ nv_c_titulo:'Sollen wir helfen?', nv_c_texto:'Ich möchte, dass Babyloon mir Ideen und Profis für meinen Tag schickt.', nv_c_nombre:'Dein Name', nv_c_email:'Deine E-Mail', nv_c_boton:'Haltet mich auf dem Laufenden', nv_c_hecho:'Erledigt. Wir schreiben dir bald mit Ideen für deine Hochzeit.', nv_c_error:'Bitte prüfe die E-Mail-Adresse.', nv_c_legal:'Nur dafür. Du kannst jederzeit verlangen, dass wir sie löschen.' },
    it:{ nv_c_titulo:'Ti diamo una mano?', nv_c_texto:'Voglio che Babyloon mi scriva con idee e professionisti per il mio giorno.', nv_c_nombre:'Il tuo nome', nv_c_email:'La tua email', nv_c_boton:'Avvisatemi', nv_c_hecho:'Fatto. Ti scriveremo presto con idee per il tuo matrimonio.', nv_c_error:'Controlla l’indirizzo email, per favore.', nv_c_legal:'Solo per questo. Puoi chiederci di cancellarla quando vuoi.' },
    nl:{ nv_c_titulo:'Zullen we meedenken?', nv_c_texto:'Ik wil dat Babyloon mij schrijft met ideeën en professionals voor mijn dag.', nv_c_nombre:'Je naam', nv_c_email:'Je e-mail', nv_c_boton:'Hou me op de hoogte', nv_c_hecho:'Gelukt. We schrijven je snel met ideeën voor je bruiloft.', nv_c_error:'Controleer het e-mailadres.', nv_c_legal:'Alleen hiervoor. Je kunt ons altijd vragen het te wissen.' },
    pl:{ nv_c_titulo:'Pomożemy Ci?', nv_c_texto:'Chcę, żeby Babyloon napisał do mnie z pomysłami i specjalistami na mój dzień.', nv_c_nombre:'Twoje imię', nv_c_email:'Twój e-mail', nv_c_boton:'Dajcie znać', nv_c_hecho:'Gotowe. Wkrótce napiszemy z pomysłami na Twoje wesele.', nv_c_error:'Sprawdź adres e-mail.', nv_c_legal:'Tylko do tego. Możesz poprosić o usunięcie w dowolnej chwili.' },
    el:{ nv_c_titulo:'Να σε βοηθήσουμε;', nv_c_texto:'Θέλω να μου γράψει η Babyloon με ιδέες και επαγγελματίες για τη μέρα μου.', nv_c_nombre:'Το όνομά σου', nv_c_email:'Το email σου', nv_c_boton:'Ενημερώστε με', nv_c_hecho:'Έγινε. Θα σου γράψουμε σύντομα με ιδέες για τον γάμο σου.', nv_c_error:'Έλεγξε το email, παρακαλώ.', nv_c_legal:'Μόνο για αυτό. Μπορείς να ζητήσεις να το διαγράψουμε όποτε θέλεις.' },
    hu:{ nv_c_titulo:'Segítsünk?', nv_c_texto:'Szeretném, ha a Babyloon írna nekem ötletekkel és szakemberekkel a nagy napomhoz.', nv_c_nombre:'A neved', nv_c_email:'Az e-mail címed', nv_c_boton:'Szóljatok', nv_c_hecho:'Kész. Hamarosan írunk ötletekkel az esküvődödhöz.', nv_c_error:'Kérlek, ellenőrizd az e-mail címet.', nv_c_legal:'Csak erre. Bármikor kérheted, hogy töröljük.' },
    ru:{ nv_c_titulo:'Помочь вам?', nv_c_texto:'Хочу, чтобы Babyloon написал мне с идеями и мастерами для моего дня.', nv_c_nombre:'Ваше имя', nv_c_email:'Ваш e-mail', nv_c_boton:'Сообщите мне', nv_c_hecho:'Готово. Скоро напишем с идеями для вашей свадьбы.', nv_c_error:'Проверьте адрес почты.', nv_c_legal:'Только для этого. Вы можете попросить удалить в любой момент.' },
    ar:{ nv_c_titulo:'هل نساعدك؟', nv_c_texto:'أودّ أن تراسلني Babyloon بأفكار وملفات ليومي.', nv_c_nombre:'اسمك', nv_c_email:'بريدك الإلكتروني', nv_c_boton:'أبلغوني', nv_c_hecho:'تمّ. سنراسلك قريبًا بأفكار لزفافك.', nv_c_error:'راجعي البريد من فضلك.', nv_c_legal:'لهذا فقط. يمكنك طلب حذفه متى شئت.' },
    zh:{ nv_c_titulo:'需要我们帮忙吗？', nv_c_texto:'我希望 Babyloon 向我推送婚礼当天的创意与专业人员。', nv_c_nombre:'你的姓名', nv_c_email:'你的邮箱', nv_c_boton:'请通知我', nv_c_hecho:'完成。我们会尽快向你发送婚礼创意。', nv_c_error:'请检查邮箱地址。', nv_c_legal:'仅用于此。你可以随时要求我们删除。' },
    ja:{ nv_c_titulo:'お手伝いしましょうか？', nv_c_texto:'Babyloon から当日のアイデアやプロの情報を受け取りたいです。', nv_c_nombre:'お名前', nv_c_email:'メールアドレス', nv_c_boton:'知らせてください', nv_c_hecho:'完了です。結婚式のアイデアを近いうちにお送りします。', nv_c_error:'メールアドレスをご確認ください。', nv_c_legal:'この目的にのみ使います。いつでも削除を依頼できます。' },
    ko:{ nv_c_titulo:'도와드릴까요?', nv_c_texto:'Babyloon이 결혼식 당일을 위한 아이디어와 전문가를 보내주면 좋겠어요.', nv_c_nombre:'이름', nv_c_email:'이메일', nv_c_boton:'알려주세요', nv_c_hecho:'완료입니다. 결혼식 아이디어를 곧 보내드릴게요.', nv_c_error:'이메일 주소를 확인해 주세요.', nv_c_legal:'이 용도로만 사용합니다. 언제든 삭제를 요청할 수 있어요.' },
    sv:{ nv_c_titulo:'Vill du ha hjälp?', nv_c_texto:'Jag vill att Babyloon skriver till mig med idéer och proffs för min dag.', nv_c_nombre:'Ditt namn', nv_c_email:'Din e-post', nv_c_boton:'Hör av er', nv_c_hecho:'Klart. Vi hör av oss snart med idéer till ditt bröllop.', nv_c_error:'Kontrollera e-postadressen.', nv_c_legal:'Bara för detta. Du kan be oss radera den när du vill.' }
  });

})();
