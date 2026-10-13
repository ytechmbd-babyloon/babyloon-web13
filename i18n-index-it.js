/* ═══════════════════════════════════════════════════════════════
   Babyloon · La portada en italiano
   ───────────────────────────────────────────────────────────────
   Las 308 claves de `i18n-index.js`, menos seis.

   LAS SEIS QUE FALTAN, A PROPÓSITO: tst1_q, tst1_n, tst2_q, tst2_n,
   tst3_q y tst3_n son los testimonios inventados —«Lucía · Málaga»,
   «Elena · Málaga», «Marco · Estepona»— que se quitaron de la
   portada y se sustituyeron por `opiniones_publicas()`, que trae
   reseñas de verdad. Traducirlos sería multiplicar por cinco unas
   frases que no dijo nadie. Si algún día se vuelven a usar, que sea
   con personas que existan.

   Se respetan los marcadores donde el código los espera: {n}, {p},
   {c}, {ciudad}. Y las flechas ↑ ↓ → de los ordenadores y botones,
   que son parte del diseño y no del idioma.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({ it: {

    nav_concepto:'Concetto',
    hero_eyebrow:'Bellezza di lusso, su richiesta',
    hero_h1a:'La bellezza,', hero_h1b:'ovunque tu sia.',
    hero_lead:'Professionisti della bellezza di lusso, a domicilio e su richiesta. Un solo mondo per chi riceve e per chi crea.',
    hero_cta1:'Crea account', hero_cta2:'Prenota un servizio', hero_scroll:'Scopri',

    con_eyebrow:'Il concetto', con_h2:'Un rito, non un appuntamento',
    con_sub:'Babyloon porta il salone a casa tua, in hotel o al tuo evento. Scegli, prenoti e ricevi — solo l’esperienza.',
    con1_t:'A casa tua',
    con1_d:'Capelli, trucco, unghie, barbiere e cura della pelle dove preferisci. Il professionista viene da te.',
    con2_t:'Su misura per te',
    con2_d:'Descrivi il look che vuoi e ricevi una proposta curata. Ogni servizio si adatta a te.',
    con3_t:'Con garanzia',
    con3_d:'Professionisti verificati, pagamento protetto e traccia del tuo percorso di bellezza.',

    worlds_eyebrow:'Due mondi, una casa', worlds_h2:'Scegli il tuo ingresso',
    cli_eyebrow:'Per te', cli_h3:'Cliente',
    cli_p:'Prenota bellezza di lusso ovunque ti trovi e goditi il servizio come vuoi tu.',
    cli_l1:'Richiedi servizi a domicilio, subito o programmati',
    cli_l2:'Boutique di prodotti selezionati',
    cli_l3:'Il tuo percorso di bellezza e le garanzie',
    cli_l4:'Modalità silenziosa, produttiva o consulenza',
    cli_cta:'Entra come cliente',
    pro_eyebrow:'Per professionisti', pro_h3:'Professionista',
    pro_p:'Il tuo talento, i tuoi orari, i tuoi clienti. Babyloon ti porta il lavoro.',
    pro_l1:'Ricevi richieste e fai offerte sui servizi vicino a te',
    pro_l2:'Agenda, chilometri e inventario con margine reale',
    pro_l3:'Accademia, masterclass e certificati',
    pro_l4:'Portafoglio, pagamenti protetti e modalità viaggio',
    pro_cta:'Entra come professionista',

    shop_h2:'Prodotti selezionati',
    shop_sub:'La stessa boutique dell’app, ora sul web. Scelti dai professionisti.',
    shop_cta:'Vedi tutta la boutique',
    app_eyebrow:'Prenota un servizio', app_h2:'Tutta Babyloon, in mano',
    app_p:'Prenota, chatta, paga e segui la tua bellezza in tempo reale. Il web è la tua casa; l’app, la tua chiave.',
    store1_s:'Scarica su', store2_s:'Disponibile su',

    foot_tag:'Bellezza di lusso su richiesta, ovunque tu sia.',
    foot_explora:'Esplora', foot_cuenta:'Account', foot_legal:'Legale',
    foot_priv:'Privacy', foot_terms:'Termini', foot_contact:'Contatti',
    foot_made:'Fatto con ∞ sulla Costa del Sol',

    m_welcome:'Benvenuta in Babyloon', m_welcome_sub:'Scegli come vuoi entrare',
    m_join:'Unisciti a Babyloon', m_join_sub:'Crea il tuo account come cliente o professionista',
    tab_login:'Accedi', tab_register:'Crea account',
    role_client:'Cliente', role_client_sub:'Ricevi bellezza',
    role_pro:'Professionista', role_pro_sub:'Offri servizi',
    f_name:'Nome completo', f_name_ph:'Il tuo nome', f_email:'Email', f_pass:'Password',

    how_eyebrow:'Come funziona', how_h2:'Semplice come dovrebbe essere',
    how1_t:'Scegli', how1_d:'Esplora servizi e prodotti e scegli quello che vuoi.',
    how2_t:'Prenota', how2_d:'Fissa luogo e ora. Il pagamento resta protetto.',
    how3_t:'Ricevi', how3_d:'Il tuo professionista viene da te, puntuale e verificato.',
    how4_t:'Goditela', how4_d:'Vivi l’esperienza, valutala e segui il tuo percorso.',

    tst_eyebrow:'Voci di Babyloon', tst_h2:'Cosa dice chi la vive',

    faq_eyebrow:'Domande', faq_h2:'Tutto chiaro, senza righe in piccolo',
    faq1_q:'Dove è disponibile Babyloon?',
    faq1_a:'In {n} città di {p} paesi, ognuna con i suoi 75 servizi e le sue tariffe già calcolate. Qui sopra ti diciamo quali sono attive e quali aprono presto.',
    faq2_q:'Come prenoto un servizio?',
    faq2_a:'Nell’app. Scegli cosa e quando, e i professionisti della tua città ti mandano la loro offerta. Scegli chi, e il prezzo è fissato prima di confermare.',
    faq3_q:'I professionisti sono verificati?',
    faq3_a:'Sì, prima di poter lavorare: documento d’identità, titoli e dati fiscali. E finché il loro conto per gli incassi non è pronto, non possono nemmeno farti un’offerta.',
    faq4_q:'Come si paga?',
    faq4_a:'Con carta, tramite Stripe: Babyloon non conserva mai la tua carta. Anche con il saldo del portafoglio o con una carta regalo. L’importo lo calcola sempre il server, mai l’app.',
    faq5_q:'E se qualcosa va storto?',
    faq5_a:'Il pagamento resta trattenuto finché il servizio non è completato. Ogni servizio ha inoltre un’assicurazione che copre i danni accidentali nel luogo dell’appuntamento, e una garanzia post-servizio che richiedi dall’app.',
    faq6_q:'Posso comprare prodotti senza prenotare un servizio?',
    faq6_a:'Sì. La Boutique è aperta a chiunque, con consegna a casa e prezzi nella tua valuta.',
    faq_cta:'Altre domande? Scrivici',

    g_continue:'Continua con Google', g_or:'oppure',
    bq_categories:'Esplora per categoria',

    p_inicio:'Home', p_solicitar:'Richiedi servizio', p_abrirapp:'Apri l’app',
    p_resumen:'Riepilogo', p_misservicios:'I miei servizi', p_servicios:'Servizi',
    p_pedidos:'Ordini', p_facturas:'Fatture', p_autocuidado:'Cura di sé',
    p_garantias:'Garanzie', p_cartera:'Portafoglio', p_favoritos:'Preferiti',
    p_perfil:'Profilo', p_inventario:'Inventario', p_academy:'Accademia',
    p_certificados:'Certificati',

    hs_service:'Cosa ti serve', hs_where:'Dove', hs_when:'Quando',
    hs_where_ph:'Indirizzo o codice postale', hs_btn:'Vedi i prezzi',
    hs_alt:'o scarica l’app',
    hs_desde:'Da', hs_servicios:'Servizi', hs_hasta:'Fino a',
    hs_en:'{c} a {ciudad}', hs_viva:'con professionisti proprio ora',
    hs_pronto:'apre presto',

    pr_verif:'Professionisti verificati', pr_verif_s:'Identità e credenziali',
    pr_pay:'Pagamento protetto', pr_pay_s:'Con Stripe',
    pr_guar:'Garanzia post-servizio', pr_guar_s:'La tua soddisfazione',
    pr_rating_s:'Valutazione media',

    p_svc_eyebrow:'Servizi', p_svc_h2:'Ogni gesto, un’opera',
    p_svc_sub:'Professionisti d’élite per ogni arte della bellezza, dove vuoi tu.',
    svc_n1:'Trucco', svc_n2:'Capelli', svc_n3:'Unghie',
    svc_n4:'Estetica', svc_n5:'Massaggi', svc_n6:'Privée',
    svc_d1:'Editoriale, sposa, cerimonia o passerella. L’arte del trucco per ogni occasione, a casa tua.',
    svc_d2:'Raccolti, onde, lisciature e acconciature da sposa o da evento. I tuoi capelli, una dichiarazione.',
    svc_d3:'Manicure, pedicure, nail art e smalti a lunga tenuta con finitura impeccabile.',
    svc_d4:'Trattamenti viso, sopracciglia, ciglia e cura della pelle, a domicilio.',
    svc_d5:'Rilassante, profondo o drenaggio linfatico. Benessere professionale ovunque tu sia.',
    svc_d6:'Prenotazione privata per matrimoni ed eventi con data futura. Servizio totalmente individuale con consegna garantita: se arriva una disdetta all’ultimo, attiviamo una lista di riserva. Disponibile anche nel paese dove viaggi.',
    svc_book:'Prenota nell’app →',

    sort_featured:'In evidenza', sort_price_asc:'Prezzo ↑',
    sort_price_desc:'Prezzo ↓', sort_new:'Novità', ship_to:'Spedisci a',

    pf_eyebrow:'Professionisti', pf_h1a:'Trova il tuo', pf_h1b:'professionista',
    pf_sub:'Verificati, valutati e vicino a te.',
    pf_service:'Cosa ti serve', pf_all:'Tutti', pf_postal:'Codice postale',
    pf_search:'Cerca', pf_loading:'Caricamento professionisti…',
    pf_empty:'Nessun professionista trovato con questi criteri. Prova senza filtri o scarica l’app per la disponibilità in tempo reale.',
    pf_verified:'Verificato', pf_beauty:'Bellezza', pf_about:'Chi sono',
    pf_specialties:'Specialità', pf_portfolio:'Portfolio',
    pf_no_portfolio:'Questo professionista non ha ancora un portfolio.',
    pf_rating:'Valutazione', pf_services:'Servizi', pf_zone:'Zona',
    pf_book_note:'La prenotazione si completa nell’app, con pagamento protetto e garanzia.',
    pf_book:'Prenota nell’app', pf_one:'professionista', pf_many:'professionisti',
    pf_error:'Non siamo riusciti a caricare i professionisti.',

    cities_eyebrow:'Presenza', cities_h2:'Dove la bellezza ti trova',
    cities_sub:'Tariffe misurate città per città, su tre continenti. E questo è solo l’inizio.',
    cities_live:'Qui lavoriamo già', cities_soon:'Tariffe pronte',
    cities_count:'{n} città · {p} paesi', cities_all:'Vedi tutte le città',
    brands_label:'Marchi selezionati',

    gc_eyebrow:'Carta regalo', gc_design:'Design',
    gc_h1a:'Regala', gc_h1b:'bellezza',
    gc_sub:'Il regalo perfetto: servizi di bellezza di lusso a domicilio e boutique.',
    gc_buy:'Compra', gc_redeem:'Riscatta', gc_card:'Carta regalo',
    gc_custom:'Oppure importo libero (€)', gc_rname:'Nome di chi la riceve',
    gc_remail:'Email di chi la riceve', gc_sname:'Il tuo nome',
    gc_msg:'Messaggio (facoltativo)', gc_pay:'Paga e invia',
    gc_secure:'Pagamento sicuro con Stripe. Dopo il pagamento ricevi il codice da condividere.',
    gc_share:'Condividi questo codice con chi la riceve per riscattarla.',
    gc_code:'Codice della carta regalo', gc_redeem_btn:'Riscatta sul mio account',
    gc_redeem_hint:'Devi accedere. Il saldo si aggiunge al tuo portafoglio Babyloon.',
    gc_occasion:'Occasione', gc_amount_l:'Importo',
    gc_for:'PER', gc_endless:'BELLEZZA SENZA FINE',
    occChristmas:'Natale', occBirthday:'Compleanno', occWomen:'Per lei',
    occMen:'Per lui', occWedding:'Matrimonio', occMother:'Festa della mamma',
    gc_share_text:'Ti regalo bellezza ✨ Riscatta la tua carta Babyloon con il codice',
    gc_copy:'Copia il codice', gc_copied:'Copiato!', gc_more:'Condividi', gc_wa:'WhatsApp',

    edu_eyebrow:'Impara e brilla', edu_h2:'Due strade, una sola eccellenza',
    sc_tag:'Per te', sc_title:'Cura di sé',
    sc_desc:'Routine di bellezza, guide e masterclass per brillare ogni giorno.',
    sc_cta:'Esplora la cura di sé',
    ac_tag:'Per professionisti', ac_title:'Accademia Babyloon',
    ac_desc:'Formazione d’élite per portare il tuo mestiere e la tua attività a un altro livello.',
    ac_cta:'Entra nell’Accademia',

    num_eyebrow:'Babyloon in essenza', num_h2:'Il lusso, misurato nel dettaglio',
    n1_l:'Servizi per città', n1_d:'Ognuno con un prezzo fisso prima di prenotare.',
    n2_l:'Città con tariffe', n2_d:'Ogni città, con i suoi prezzi misurati. Da Marbella a Tokyo.',
    n3_l:'Lingue', n3_d:'Bellezza senza confini, nella tua lingua.',
    n4_l:'Paesi', n4_d:'Ognuno con la sua valuta, le sue imposte e le sue tariffe.',

    mom_eyebrow:'Momenti', mom_h2:'L’arte, in ogni gesto',
    how_ins_t:'Assicurazione inclusa',
    how_ins_d:'Ogni servizio ha un’assicurazione che copre i danni accidentali nel luogo dell’appuntamento. Tranquillità totale, inclusa.',

    perk_ins:'Assicurazione inclusa', perk_disc:'Sconti in boutique',
    perk_24:'Pronti in 24 ore', perk_att:'Attenzione personalizzata',
    perk_easy:'Prenoti in 3 tocchi',

    privee_eyebrow:'Prenotazioni Privée',
    privee_h3:'Matrimoni ed eventi, nulla lasciato al caso',
    privee_p:'Prenotazione privata con data futura, servizio totalmente individuale con consegna garantita e lista di riserva per gli imprevisti dell’ultimo minuto. Disponibile anche nel paese dove viaggi.',

    dl_client_t:'Cliente', dl_client_d:'Prenota bellezza di lusso ovunque tu sia.',
    dl_client_cta:'Scarica per clienti',
    dl_pro_t:'Professionista', dl_pro_d:'Trova clienti e fai crescere la tua attività.',
    dl_pro_cta:'Scarica per professionisti',

    wl_eyebrow:'Professionisti · Lista d’attesa',
    wl_h1a:'Babyloon apre', wl_h1b:'in tutto il mondo',
    wl_lead:'Partiamo da un primo gruppo di città e da lì apriamo le altre. Se la tua non c’è ancora, iscriviti: le prossime si scelgono guardando dove ci sono professionisti in attesa, non a intuito.',
    wl_live_title:'Già qui', wl_form_title:'Iscriviti',
    wl_form_lead:'Due minuti. Ti scriviamo nel momento in cui apre la tua città.',
    wl_name:'Nome completo', wl_email:'Email', wl_city:'Città', wl_country:'Paese',
    wl_phone:'Telefono (facoltativo)', wl_instagram:'Instagram (facoltativo)',
    wl_services:'Cosa fai', wl_years:'Anni di esperienza', wl_years_more:'Più di 10',
    wl_clients:'Hai già i tuoi clienti?', wl_choose:'Scegli…', wl_yes:'Sì', wl_no:'No',
    wl_consent:'Acconsento a che Babyloon conservi questi dati per avvisarmi quando apre la mia città. Posso chiederne la cancellazione in qualsiasi momento.',
    wl_submit:'Entra nella lista', wl_sending:'Invio…',
    wl_no_spam:'Niente marketing. Ti scriviamo solo per questo.',
    wl_done_title:'Ci sei',
    wl_done_text:'Ti scriviamo appena apriamo la tua città. Intanto comincia a mettere insieme il tuo portfolio: è la prima cosa che guardano i clienti.',
    wl_done_cta:'Torna alla home',
    wl_already_title:'Ti avevamo già',
    wl_already_text:'Quella email era già in lista. Non devi fare altro.',
    wl_city_open:'Quella città è già aperta: puoi iscriverti oggi stesso.',
    wl_open_note_a:'Una cosa: a',
    wl_open_note_b:'siamo già operativi. Non serve aspettare: scarica l’app e iscriviti oggi.',
    wl_err_consent:'Ci serve il tuo permesso per conservare i dati.',
    wl_err_cats:'Dicci almeno un servizio che offri.',
    wl_err_send:'Non siamo riusciti a salvarlo. Riprova tra un momento.',
    wl_err_offline:'Non riusciamo a connetterci ora. Controlla la connessione e riprova.',
    wl_privacy:'Privacy',
    wl_cat_barberia:'Barbiere', wl_cat_pestanas:'Ciglia', wl_cat_depilacion:'Depilazione',
    wl_cat_facial_h:'Viso uomo', wl_cat_depilacion_h:'Depilazione uomo',

    cat_depilacion:'Depilazione', cat_grooming:'Grooming',
    cat_barberia:'Barbiere', cat_cejas_pestanas:'Sopracciglia e ciglia',

    tst_nota:'su {n} recensioni'

  }});
})();
