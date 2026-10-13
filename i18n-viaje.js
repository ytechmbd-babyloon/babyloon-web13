/* ═══════════════════════════════════════════════════════════════
   Babyloon · Modo Viaje — diccionario
   ───────────────────────────────────────────────────────────────
   `mv_hay` lleva <b> dentro a propósito: se inserta con innerHTML
   para que el número vaya en dorado. El valor sale de este fichero
   —código nuestro— y el {n} se sustituye por un Number(), así que
   no hay nada de fuera que pueda colarse por ahí.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({

    es: {
      mv_eyebrow:'Modo Viaje', mv_h2:'Tu belleza viaja contigo',
      mv_lead:'La belleza no se queda en casa. Tu profesional de confianza viaja contigo, y quien te atiende puede trabajar allá donde vaya.',
      mv_de:'Dónde estás', mv_a:'A dónde vas',
      mv_sales:'Sales de', mv_llegas:'Llegas a',
      mv_hay:'<b>{n}</b> profesionales', mv_pronto:'Abrimos pronto',
      mv_desde:'Servicios desde',
      mv_cli_t:'Si eres cliente',
      mv_cli_d:'Llevas a tu estilista en el teléfono. En tu destino te enseñamos a quien tiene su misma formación y sus mismas técnicas.',
      mv_pro_t:'Si eres profesional',
      mv_pro_d:'Tu agenda viaja contigo. Abres tu disponibilidad un par de tardes en tu destino y tus vacaciones se pagan solas.'
    },

    en: {
      mv_eyebrow:'Travel Mode', mv_h2:'Your beauty travels with you',
      mv_lead:'Beauty does not stay at home. The professional you trust travels with you, and the one who looks after you can work wherever she goes.',
      mv_de:'Where you are', mv_a:'Where you are going',
      mv_sales:'Leaving', mv_llegas:'Arriving in',
      mv_hay:'<b>{n}</b> professionals', mv_pronto:'Opening soon',
      mv_desde:'Services from',
      mv_cli_t:'If you are a client',
      mv_cli_d:'You carry your stylist in your pocket. At your destination we show you the ones trained in the same techniques.',
      mv_pro_t:'If you are a professional',
      mv_pro_d:'Your calendar travels with you. Open a couple of afternoons at your destination and your holiday pays for itself.'
    },

    pt: {
      mv_eyebrow:'Modo Viagem', mv_h2:'A tua beleza viaja contigo',
      mv_lead:'A beleza não fica em casa. O profissional da tua confiança viaja contigo, e quem te atende pode trabalhar onde quer que vá.',
      mv_de:'Onde estás', mv_a:'Para onde vais',
      mv_sales:'Sais de', mv_llegas:'Chegas a',
      mv_hay:'<b>{n}</b> profissionais', mv_pronto:'Abrimos em breve',
      mv_desde:'Serviços desde',
      mv_cli_t:'Se és cliente',
      mv_cli_d:'Levas o teu cabeleireiro no telemóvel. No teu destino mostramos-te quem tem a mesma formação e as mesmas técnicas.',
      mv_pro_t:'Se és profissional',
      mv_pro_d:'A tua agenda viaja contigo. Abres a disponibilidade umas tardes no destino e as férias pagam-se sozinhas.'
    },

    de: {
      mv_eyebrow:'Reisemodus', mv_h2:'Deine Schönheit reist mit',
      mv_lead:'Schönheit bleibt nicht zu Hause. Die Fachkraft deines Vertrauens reist mit dir – und wer dich betreut, kann überall arbeiten.',
      mv_de:'Wo du bist', mv_a:'Wohin du reist',
      mv_sales:'Abreise aus', mv_llegas:'Ankunft in',
      mv_hay:'<b>{n}</b> Fachkräfte', mv_pronto:'Bald verfügbar',
      mv_desde:'Leistungen ab',
      mv_cli_t:'Wenn du buchst',
      mv_cli_d:'Du hast deine Stylistin im Handy. Am Zielort zeigen wir dir, wer dieselbe Ausbildung und dieselben Techniken hat.',
      mv_pro_t:'Als Profi',
      mv_pro_d:'Dein Kalender reist mit. Öffne ein paar Nachmittage am Zielort – und dein Urlaub zahlt sich selbst.'
    },

    fr: {
      mv_eyebrow:'Mode Voyage', mv_h2:'Ta beauté voyage avec toi',
      mv_lead:'La beauté ne reste pas à la maison. La personne en qui tu as confiance voyage avec toi, et peut travailler partout.',
      mv_de:'Où tu es', mv_a:'Où tu vas',
      mv_sales:'Départ de', mv_llegas:'Arrivée à',
      mv_hay:'<b>{n}</b> profils', mv_pronto:'Bientôt disponible',
      mv_desde:'Services à partir de',
      mv_cli_t:'Si tu réserves',
      mv_cli_d:'Tu emportes ta styliste dans ton téléphone. À destination, nous te montrons celles qui ont la même formation et les mêmes techniques.',
      mv_pro_t:'Si tu travailles dans la beauté',
      mv_pro_d:'Ton agenda voyage avec toi. Ouvre deux après-midis à destination et tes vacances se paient toutes seules.'
    },

    sv: {
      mv_eyebrow:'Reseläge', mv_h2:'Din skönhet reser med dig',
      mv_lead:'Skönhet stannar inte hemma. Proffset du litar på reser med dig, och den som tar hand om dig kan jobba var som helst.',
      mv_de:'Var du är', mv_a:'Vart du ska',
      mv_sales:'Från', mv_llegas:'Till',
      mv_hay:'<b>{n}</b> proffs', mv_pronto:'Öppnar snart',
      mv_desde:'Tjänster från',
      mv_cli_t:'Är du kund',
      mv_cli_d:'Du har din stylist i mobilen. På resmålet visar vi dig dem med samma utbildning och samma tekniker.',
      mv_pro_t:'Är du proffs',
      mv_pro_d:'Din kalender följer med. Öppna ett par eftermiddagar på resmålet – semestern betalar sig själv.'
    },

    ja: {
      mv_eyebrow:'トラベルモード', mv_h2:'美しさは、あなたと旅する',
      mv_lead:'美しさは家に置いていくものではありません。信頼するプロはあなたと一緒に旅し、施術する側もどこへ行っても働けます。',
      mv_de:'現在地', mv_a:'行き先',
      mv_sales:'出発', mv_llegas:'到着',
      mv_hay:'<b>{n}</b>人のプロ', mv_pronto:'まもなく開始',
      mv_desde:'サービス料金',
      mv_cli_t:'お客さまなら',
      mv_cli_d:'スタイリストをポケットに。旅先では、同じ教育と同じ技術を持つプロをご紹介します。',
      mv_pro_t:'プロの方なら',
      mv_pro_d:'予定表も一緒に移動します。旅先で数回の午後を開ければ、旅費はそれでまかなえます。'
    },

    ar: {
      mv_eyebrow:'وضع السفر', mv_h2:'جمالك يسافر معك',
      mv_lead:'الجمال لا يبقى في البيت. من تثق به يسافر معك ويستطيع العمل أينما ذهبت.',
      mv_de:'أين أنت', mv_a:'إلى أين تسافر',
      mv_sales:'المغادرة من', mv_llegas:'الوصول إلى',
      mv_hay:'<b>{n}</b> ملفات', mv_pronto:'نفتح قريبًا',
      mv_desde:'الخدمات ابتداءً من',
      mv_cli_t:'إن كان حسابك للحجز',
      mv_cli_d:'تحمل التصفيف الذي تثق به في هاتفك. وفي وجهتك نعرض عليك من يحمل التدريب نفسه والتقنيات نفسها.',
      mv_pro_t:'إن كنت تعمل في التجميل',
      mv_pro_d:'جدولك يسافر معك. افتحي بعض فترات بعد الظهر في وجهتك وستدفع إجازتك تكاليفها بنفسها.'
    },

    zh: {
      mv_eyebrow:'旅行模式', mv_h2:'你的美，随你同行',
      mv_lead:'美不会留在家里。你信任的专业人士与你同行，而为你服务的人，走到哪里都能工作。',
      mv_de:'你在哪里', mv_a:'你要去哪里',
      mv_sales:'出发地', mv_llegas:'目的地',
      mv_hay:'<b>{n}</b> 位专业人士', mv_pronto:'即将开放',
      mv_desde:'服务起价',
      mv_cli_t:'如果你是顾客',
      mv_cli_d:'把造型师装进口袋。到了目的地，我们为你找到受过同样训练、掌握同样技法的人。',
      mv_pro_t:'如果你是专业人士',
      mv_pro_d:'你的日程与你同行。在目的地开放几个下午，假期便能自己买单。'
    },

    ko: {
      mv_eyebrow:'트래블 모드', mv_h2:'당신의 아름다움도 함께 떠납니다',
      mv_lead:'아름다움은 집에 두고 가는 것이 아닙니다. 신뢰하는 전문가가 함께 이동하고, 당신을 돌보는 사람은 어디서든 일할 수 있습니다.',
      mv_de:'현재 위치', mv_a:'가는 곳',
      mv_sales:'출발', mv_llegas:'도착',
      mv_hay:'<b>{n}</b>명의 전문가', mv_pronto:'곧 오픈',
      mv_desde:'서비스 시작가',
      mv_cli_t:'고객이시라면',
      mv_cli_d:'스타일리스트를 주머니에 넣고 떠나세요. 도착지에서 같은 교육과 같은 기술을 가진 전문가를 보여드립니다.',
      mv_pro_t:'전문가시라면',
      mv_pro_d:'일정도 함께 움직입니다. 여행지에서 오후 몇 번만 열어두면 휴가는 스스로 값을 합니다.'
    },

    ru: {
      mv_eyebrow:'Режим путешествия', mv_h2:'Ваша красота едет с вами',
      mv_lead:'Красота не остаётся дома. Мастер, которому вы доверяете, едет с вами, а тот, кто вас обслуживает, может работать где угодно.',
      mv_de:'Где вы сейчас', mv_a:'Куда едете',
      mv_sales:'Отправление из', mv_llegas:'Прибытие в',
      mv_hay:'<b>{n}</b> мастеров', mv_pronto:'Скоро откроем',
      mv_desde:'Услуги от',
      mv_cli_t:'Если вы клиент',
      mv_cli_d:'Ваш мастер — в телефоне. В месте назначения покажем тех, кто прошёл ту же школу и владеет теми же техниками.',
      mv_pro_t:'Если вы мастер',
      mv_pro_d:'Ваш график едет с вами. Откройте пару вечеров на месте отдыха — и отпуск окупит себя сам.'
    }

  });
})();
