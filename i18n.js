/* ═══════════════════════════════════════════════════════════════
   Babyloon Web · i18n compartido — 11 idiomas de la app
   ES · EN · PT · DE · FR · SV · JA · AR · ZH · KO · RU
   Nombres de producto: es,en,de,fr,pt (resto → base). Descripciones: los 11.
   Uso: data-i18n / data-i18n-ph · BBL.t() · BBL.prodName/prodDesc · BBL.mountSwitcher()
   ═══════════════════════════════════════════════════════════════ */
(function(){
  const DICT = {
    es:{nav_inicio:'Inicio',nav_cliente:'Cliente',nav_profesional:'Profesional',nav_boutique:'Boutique',nav_acceso:'Acceso',nav_laapp:'La app',nav_entrar:'Acceder',nav_micuenta:'Mi cuenta',nav_solicitar:'Solicitar servicio',nav_academia:'Academia',
      bq_eyebrow:'La Boutique',bq_title_a:'Belleza',bq_title_b:'seleccionada',bq_sub:'Cuidado del cabello, piel, uñas, maquillaje, fragancia y herramientas — elegidos por profesionales de Babyloon.',
      bq_banner_eyebrow:'Selección Babyloon',bq_banner_title:'Lo que usan los profesionales, en tu casa',bq_banner_sub:'Productos probados en cada servicio. Calidad de salón, entrega a domicilio.',bq_banner_cta:'Descubrir',
      search:'Buscar…',sort_featured:'Destacados',sort_price_asc:'Precio ↑',sort_price_desc:'Precio ↓',sort_new:'Novedades',
      cat_all:'Todos',cat_cabello:'Cabello',cat_maquillaje:'Maquillaje',cat_unas:'Uñas',cat_facial:'Facial',cat_fragancia:'Fragancia',cat_masajes:'Masajes',cat_cejas:'Cejas',cat_premium:'Premium',cat_belleza:'Belleza',
      featured:'Destacado',soldout:'Agotado',add:'Añadir',add_cart:'Añadir al carrito',loadmore:'Cargar más',products_one:'producto',products_many:'productos',swipe_more:'desliza para ver más',empty_search:'No encontramos productos para esta búsqueda.',err_load:'No se pudieron cargar los productos.',err_conn:'No pudimos conectar con el catálogo. Si estás en la vista previa, despliega la web y funcionará.',
      cart_title:'Tu carrito',cart_empty:'Tu carrito está vacío.',cart_empty_sub:'Descubre nuestra selección.',cart_total:'Total',cart_checkout:'Finalizar compra',cart_ship:'Envío calculado en el siguiente paso.',cart_remove:'Quitar',qty:'Cantidad',
      auth_title:'Inicia sesión',auth_sub:'Accede para completar tu compra',auth_email:'Correo',auth_pass:'Contraseña',auth_enter:'Entrar',auth_nocuenta:'¿Sin cuenta?',auth_crea:'Créala aquí',auth_bad:'Correo o contraseña incorrectos.',session_expired:'Tu sesión expiró. Inicia sesión de nuevo.',
      back_home:'volver al inicio',by_babyloon:'Babyloon Selection'},
    en:{nav_inicio:'Home',nav_cliente:'Client',nav_profesional:'Professional',nav_boutique:'Boutique',nav_acceso:'Access',nav_laapp:'The app',nav_entrar:'Sign in',nav_micuenta:'My account',nav_solicitar:'Book a service',nav_academia:'Academy',
      bq_eyebrow:'The Boutique',bq_title_a:'Curated',bq_title_b:'beauty',bq_sub:'Hair, skin, nails, make-up, fragrance and tools — chosen by Babyloon professionals.',
      bq_banner_eyebrow:'Babyloon Selection',bq_banner_title:'What the pros use, at your home',bq_banner_sub:'Products proven in every service. Salon quality, delivered to your door.',bq_banner_cta:'Discover',
      search:'Search…',sort_featured:'Featured',sort_price_asc:'Price ↑',sort_price_desc:'Price ↓',sort_new:'New',
      cat_all:'All',cat_cabello:'Hair',cat_maquillaje:'Make-up',cat_unas:'Nails',cat_facial:'Facial',cat_fragancia:'Fragrance',cat_masajes:'Massage',cat_cejas:'Brows',cat_premium:'Premium',cat_belleza:'Beauty',
      featured:'Featured',soldout:'Sold out',add:'Add',add_cart:'Add to cart',loadmore:'Load more',products_one:'product',products_many:'products',swipe_more:'scroll for more',empty_search:'No products found for this search.',err_load:'Could not load products.',err_conn:'Could not reach the catalog. If you are in the preview, deploy the site and it will work.',
      cart_title:'Your cart',cart_empty:'Your cart is empty.',cart_empty_sub:'Discover our selection.',cart_total:'Total',cart_checkout:'Checkout',cart_ship:'Shipping calculated at the next step.',cart_remove:'Remove',qty:'Quantity',
      auth_title:'Sign in',auth_sub:'Sign in to complete your purchase',auth_email:'Email',auth_pass:'Password',auth_enter:'Enter',auth_nocuenta:'No account?',auth_crea:'Create one',auth_bad:'Incorrect email or password.',session_expired:'Your session expired. Please sign in again.',
      back_home:'back to home',by_babyloon:'Babyloon Selection'},
    pt:{nav_inicio:'Início',nav_cliente:'Cliente',nav_profesional:'Profissional',nav_boutique:'Boutique',nav_acceso:'Acesso',nav_laapp:'A app',nav_entrar:'Entrar',nav_micuenta:'A minha conta',nav_solicitar:'Pedir serviço',nav_academia:'Academia',
      bq_eyebrow:'A Boutique',bq_title_a:'Beleza',bq_title_b:'selecionada',bq_sub:'Cabelo, pele, unhas, maquilhagem, perfume e ferramentas — escolhidos por profissionais Babyloon.',
      bq_banner_eyebrow:'Seleção Babyloon',bq_banner_title:'O que os profissionais usam, em tua casa',bq_banner_sub:'Comprovados em cada serviço. Qualidade de salão, entregue à tua porta.',bq_banner_cta:'Descobrir',
      search:'Pesquisar…',sort_featured:'Destaques',sort_price_asc:'Preço ↑',sort_price_desc:'Preço ↓',sort_new:'Novidades',
      cat_all:'Todos',cat_cabello:'Cabelo',cat_maquillaje:'Maquilhagem',cat_unas:'Unhas',cat_facial:'Facial',cat_fragancia:'Perfume',cat_masajes:'Massagem',cat_cejas:'Sobrancelhas',cat_premium:'Premium',cat_belleza:'Beleza',
      featured:'Destaque',soldout:'Esgotado',add:'Adicionar',add_cart:'Adicionar ao carrinho',loadmore:'Ver mais',products_one:'produto',products_many:'produtos',swipe_more:'desliza para ver mais',empty_search:'Sem produtos para esta pesquisa.',err_load:'Não foi possível carregar os produtos.',err_conn:'Catálogo inacessível. Na pré-visualização está bloqueado — depois de publicar, funciona.',
      cart_title:'O teu carrinho',cart_empty:'O teu carrinho está vazio.',cart_empty_sub:'Descobre a nossa seleção.',cart_total:'Total',cart_checkout:'Finalizar compra',cart_ship:'Envio calculado no passo seguinte.',cart_remove:'Remover',qty:'Quantidade',
      auth_title:'Entrar',auth_sub:'Entra para concluir a compra',auth_email:'Email',auth_pass:'Palavra-passe',auth_enter:'Entrar',auth_nocuenta:'Sem conta?',auth_crea:'Cria aqui',auth_bad:'Email ou palavra-passe incorretos.',session_expired:'A sessão expirou. Entra de novo.',
      back_home:'voltar ao início',by_babyloon:'Seleção Babyloon'},
    de:{nav_inicio:'Start',nav_cliente:'Kunde',nav_profesional:'Profi',nav_boutique:'Boutique',nav_acceso:'Zugang',nav_laapp:'Die App',nav_entrar:'Anmelden',nav_micuenta:'Mein Konto',nav_solicitar:'Service buchen',nav_academia:'Academy',
      bq_eyebrow:'Die Boutique',bq_title_a:'Kuratierte',bq_title_b:'Schönheit',bq_sub:'Haar, Haut, Nägel, Make-up, Duft und Werkzeuge — ausgewählt von Babyloon-Profis.',
      bq_banner_eyebrow:'Babyloon Auswahl',bq_banner_title:'Was die Profis nutzen, bei dir zu Hause',bq_banner_sub:'In jedem Service bewährt. Salonqualität, zu dir geliefert.',bq_banner_cta:'Entdecken',
      search:'Suchen…',sort_featured:'Empfohlen',sort_price_asc:'Preis ↑',sort_price_desc:'Preis ↓',sort_new:'Neu',
      cat_all:'Alle',cat_cabello:'Haar',cat_maquillaje:'Make-up',cat_unas:'Nägel',cat_facial:'Gesicht',cat_fragancia:'Duft',cat_masajes:'Massage',cat_cejas:'Brauen',cat_premium:'Premium',cat_belleza:'Beauty',
      featured:'Empfohlen',soldout:'Ausverkauft',add:'Hinzufügen',add_cart:'In den Warenkorb',loadmore:'Mehr laden',products_one:'Produkt',products_many:'Produkte',swipe_more:'weiter scrollen',empty_search:'Keine Produkte für diese Suche.',err_load:'Produkte konnten nicht geladen werden.',err_conn:'Katalog nicht erreichbar. In der Vorschau blockiert — nach dem Deployment funktioniert es.',
      cart_title:'Dein Warenkorb',cart_empty:'Dein Warenkorb ist leer.',cart_empty_sub:'Entdecke unsere Auswahl.',cart_total:'Gesamt',cart_checkout:'Zur Kasse',cart_ship:'Versand im nächsten Schritt berechnet.',cart_remove:'Entfernen',qty:'Menge',
      auth_title:'Anmelden',auth_sub:'Melde dich an, um den Kauf abzuschließen',auth_email:'E-Mail',auth_pass:'Passwort',auth_enter:'Los',auth_nocuenta:'Kein Konto?',auth_crea:'Erstellen',auth_bad:'E-Mail oder Passwort falsch.',session_expired:'Sitzung abgelaufen. Bitte erneut anmelden.',
      back_home:'zur Startseite',by_babyloon:'Babyloon Auswahl'},
    fr:{nav_inicio:'Accueil',nav_cliente:'Client',nav_profesional:'Professionnel',nav_boutique:'Boutique',nav_acceso:'Accès',nav_laapp:"L'app",nav_entrar:'Se connecter',nav_micuenta:'Mon compte',nav_solicitar:'Réserver un service',nav_academia:'Academy',
      bq_eyebrow:'La Boutique',bq_title_a:'Beauté',bq_title_b:'sélectionnée',bq_sub:'Cheveux, peau, ongles, maquillage, parfum et outils — choisis par les pros Babyloon.',
      bq_banner_eyebrow:'Sélection Babyloon',bq_banner_title:'Ce que les pros utilisent, chez vous',bq_banner_sub:'Éprouvés à chaque service. Qualité salon, livrée chez vous.',bq_banner_cta:'Découvrir',
      search:'Rechercher…',sort_featured:'En vedette',sort_price_asc:'Prix ↑',sort_price_desc:'Prix ↓',sort_new:'Nouveautés',
      cat_all:'Tous',cat_cabello:'Cheveux',cat_maquillaje:'Maquillage',cat_unas:'Ongles',cat_facial:'Visage',cat_fragancia:'Parfum',cat_masajes:'Massage',cat_cejas:'Sourcils',cat_premium:'Premium',cat_belleza:'Beauté',
      featured:'En vedette',soldout:'Épuisé',add:'Ajouter',add_cart:'Ajouter au panier',loadmore:'Voir plus',products_one:'produit',products_many:'produits',swipe_more:'faites défiler',empty_search:'Aucun produit pour cette recherche.',err_load:'Impossible de charger les produits.',err_conn:"Catalogue injoignable. En aperçu c'est bloqué — après déploiement, ça marche.",
      cart_title:'Votre panier',cart_empty:'Votre panier est vide.',cart_empty_sub:'Découvrez notre sélection.',cart_total:'Total',cart_checkout:'Commander',cart_ship:"Livraison calculée à l'étape suivante.",cart_remove:'Retirer',qty:'Quantité',
      auth_title:'Connexion',auth_sub:'Connectez-vous pour finaliser',auth_email:'E-mail',auth_pass:'Mot de passe',auth_enter:'Entrer',auth_nocuenta:'Pas de compte ?',auth_crea:'Créez-le',auth_bad:'E-mail ou mot de passe incorrect.',session_expired:'Session expirée. Reconnectez-vous.',
      back_home:"retour à l'accueil",by_babyloon:'Sélection Babyloon'},
    sv:{nav_inicio:'Hem',nav_cliente:'Kund',nav_profesional:'Proffs',nav_boutique:'Boutique',nav_acceso:'Åtkomst',nav_laapp:'Appen',nav_entrar:'Logga in',nav_micuenta:'Mitt konto',nav_solicitar:'Boka tjänst',nav_academia:'Academy',
      bq_eyebrow:'Boutiquen',bq_title_a:'Utvald',bq_title_b:'skönhet',bq_sub:'Hår, hud, naglar, smink, doft och verktyg — utvalda av Babyloons proffs.',
      bq_banner_eyebrow:'Babyloon-urval',bq_banner_title:'Det proffsen använder, hemma hos dig',bq_banner_sub:'Beprövade i varje tjänst. Salongskvalitet, levererat hem.',bq_banner_cta:'Upptäck',
      search:'Sök…',sort_featured:'Utvalda',sort_price_asc:'Pris ↑',sort_price_desc:'Pris ↓',sort_new:'Nyheter',
      cat_all:'Alla',cat_cabello:'Hår',cat_maquillaje:'Smink',cat_unas:'Naglar',cat_facial:'Ansikte',cat_fragancia:'Doft',cat_masajes:'Massage',cat_cejas:'Bryn',cat_premium:'Premium',cat_belleza:'Skönhet',
      featured:'Utvald',soldout:'Slutsåld',add:'Lägg till',add_cart:'Lägg i kundvagn',loadmore:'Ladda mer',products_one:'produkt',products_many:'produkter',swipe_more:'skrolla för mer',empty_search:'Inga produkter för denna sökning.',err_load:'Kunde inte ladda produkter.',err_conn:'Kunde inte nå katalogen. I förhandsvisningen är den blockerad — efter publicering fungerar den.',
      cart_title:'Din kundvagn',cart_empty:'Din kundvagn är tom.',cart_empty_sub:'Upptäck vårt urval.',cart_total:'Totalt',cart_checkout:'Till kassan',cart_ship:'Frakt beräknas i nästa steg.',cart_remove:'Ta bort',qty:'Antal',
      auth_title:'Logga in',auth_sub:'Logga in för att slutföra köpet',auth_email:'E-post',auth_pass:'Lösenord',auth_enter:'Logga in',auth_nocuenta:'Inget konto?',auth_crea:'Skapa ett',auth_bad:'Fel e-post eller lösenord.',session_expired:'Din session har gått ut. Logga in igen.',
      back_home:'tillbaka till start',by_babyloon:'Babyloon-urval'},
    ja:{nav_inicio:'ホーム',nav_cliente:'お客様',nav_profesional:'プロ',nav_boutique:'ブティック',nav_acceso:'アクセス',nav_laapp:'アプリ',nav_entrar:'ログイン',nav_micuenta:'マイページ',nav_solicitar:'サービスを予約',nav_academia:'アカデミー',
      bq_eyebrow:'ブティック',bq_title_a:'厳選された',bq_title_b:'美',bq_sub:'ヘア、スキン、ネイル、メイク、フレグランス、ツール — Babyloonのプロが厳選。',
      bq_banner_eyebrow:'Babyloonセレクション',bq_banner_title:'プロが使うものを、ご自宅で',bq_banner_sub:'すべてのサービスで実証済み。サロン品質を自宅までお届け。',bq_banner_cta:'見る',
      search:'検索…',sort_featured:'おすすめ',sort_price_asc:'価格 ↑',sort_price_desc:'価格 ↓',sort_new:'新着',
      cat_all:'すべて',cat_cabello:'ヘア',cat_maquillaje:'メイク',cat_unas:'ネイル',cat_facial:'フェイシャル',cat_fragancia:'フレグランス',cat_masajes:'マッサージ',cat_cejas:'眉',cat_premium:'プレミアム',cat_belleza:'ビューティー',
      featured:'おすすめ',soldout:'売り切れ',add:'追加',add_cart:'カートに追加',loadmore:'もっと見る',products_one:'商品',products_many:'商品',swipe_more:'スクロールで続き',empty_search:'該当する商品が見つかりません。',err_load:'商品を読み込めませんでした。',err_conn:'カタログに接続できません。プレビューではブロックされます。公開すると動作します。',
      cart_title:'カート',cart_empty:'カートは空です。',cart_empty_sub:'セレクションをご覧ください。',cart_total:'合計',cart_checkout:'購入手続きへ',cart_ship:'送料は次のステップで計算されます。',cart_remove:'削除',qty:'数量',
      auth_title:'ログイン',auth_sub:'購入を完了するにはログイン',auth_email:'メール',auth_pass:'パスワード',auth_enter:'入る',auth_nocuenta:'アカウントがない？',auth_crea:'作成する',auth_bad:'メールまたはパスワードが正しくありません。',session_expired:'セッションが切れました。再度ログインしてください。',
      back_home:'ホームに戻る',by_babyloon:'Babyloonセレクション'},
    ar:{nav_inicio:'الرئيسية',nav_cliente:'عميل',nav_profesional:'محترف',nav_boutique:'المتجر',nav_acceso:'الدخول',nav_laapp:'التطبيق',nav_entrar:'تسجيل الدخول',nav_micuenta:'حسابي',nav_solicitar:'احجز خدمة',nav_academia:'الأكاديمية',
      bq_eyebrow:'المتجر',bq_title_a:'جمال',bq_title_b:'مختار',bq_sub:'الشعر والبشرة والأظافر والمكياج والعطور والأدوات — من اختيار محترفي Babyloon.',
      bq_banner_eyebrow:'اختيار Babyloon',bq_banner_title:'ما يستخدمه المحترفون، في منزلك',bq_banner_sub:'مُجرّبة في كل خدمة. جودة الصالون تُوصَّل إلى بابك.',bq_banner_cta:'اكتشف',
      search:'بحث…',sort_featured:'مميّز',sort_price_asc:'السعر ↑',sort_price_desc:'السعر ↓',sort_new:'جديد',
      cat_all:'الكل',cat_cabello:'الشعر',cat_maquillaje:'مكياج',cat_unas:'أظافر',cat_facial:'الوجه',cat_fragancia:'عطور',cat_masajes:'تدليك',cat_cejas:'الحواجب',cat_premium:'بريميوم',cat_belleza:'جمال',
      featured:'مميّز',soldout:'نفد',add:'أضف',add_cart:'أضف إلى السلة',loadmore:'عرض المزيد',products_one:'منتج',products_many:'منتجات',swipe_more:'مرّر لعرض المزيد',empty_search:'لا توجد منتجات لهذا البحث.',err_load:'تعذّر تحميل المنتجات.',err_conn:'تعذّر الوصول إلى الكتالوج. في المعاينة يكون محجوبًا — بعد النشر سيعمل.',
      cart_title:'سلتك',cart_empty:'سلتك فارغة.',cart_empty_sub:'اكتشف تشكيلتنا.',cart_total:'الإجمالي',cart_checkout:'إتمام الشراء',cart_ship:'يُحتسب الشحن في الخطوة التالية.',cart_remove:'إزالة',qty:'الكمية',
      auth_title:'تسجيل الدخول',auth_sub:'سجّل الدخول لإتمام الشراء',auth_email:'البريد',auth_pass:'كلمة المرور',auth_enter:'دخول',auth_nocuenta:'ليس لديك حساب؟',auth_crea:'أنشئ حسابًا',auth_bad:'البريد أو كلمة المرور غير صحيحة.',session_expired:'انتهت الجلسة. سجّل الدخول من جديد.',
      back_home:'العودة إلى الرئيسية',by_babyloon:'اختيار Babyloon'},
    zh:{nav_inicio:'首页',nav_cliente:'客户',nav_profesional:'专业人士',nav_boutique:'精品店',nav_acceso:'登录',nav_laapp:'应用',nav_entrar:'登录',nav_micuenta:'我的账户',nav_solicitar:'预约服务',nav_academia:'学院',
      bq_eyebrow:'精品店',bq_title_a:'精选',bq_title_b:'美妆',bq_sub:'护发、护肤、美甲、彩妆、香氛与工具 — 由 Babyloon 专业人士精选。',
      bq_banner_eyebrow:'Babyloon 精选',bq_banner_title:'专业人士所用，送到你家',bq_banner_sub:'每次服务都经过验证。沙龙品质，送货上门。',bq_banner_cta:'探索',
      search:'搜索…',sort_featured:'精选',sort_price_asc:'价格 ↑',sort_price_desc:'价格 ↓',sort_new:'新品',
      cat_all:'全部',cat_cabello:'头发',cat_maquillaje:'彩妆',cat_unas:'美甲',cat_facial:'面部',cat_fragancia:'香氛',cat_masajes:'按摩',cat_cejas:'眉毛',cat_premium:'高端',cat_belleza:'美妆',
      featured:'精选',soldout:'售罄',add:'加入',add_cart:'加入购物车',loadmore:'加载更多',products_one:'件商品',products_many:'件商品',swipe_more:'滑动查看更多',empty_search:'未找到相关商品。',err_load:'无法加载商品。',err_conn:'无法连接到目录。预览中会被拦截，发布后即可正常使用。',
      cart_title:'购物车',cart_empty:'购物车是空的。',cart_empty_sub:'来看看我们的精选。',cart_total:'合计',cart_checkout:'结账',cart_ship:'运费将在下一步计算。',cart_remove:'移除',qty:'数量',
      auth_title:'登录',auth_sub:'登录以完成购买',auth_email:'邮箱',auth_pass:'密码',auth_enter:'进入',auth_nocuenta:'没有账户？',auth_crea:'创建一个',auth_bad:'邮箱或密码不正确。',session_expired:'登录已过期，请重新登录。',
      back_home:'返回首页',by_babyloon:'Babyloon 精选'},
    ko:{nav_inicio:'홈',nav_cliente:'고객',nav_profesional:'전문가',nav_boutique:'부티크',nav_acceso:'접속',nav_laapp:'앱',nav_entrar:'로그인',nav_micuenta:'내 계정',nav_solicitar:'서비스 예약',nav_academia:'아카데미',
      bq_eyebrow:'부티크',bq_title_a:'엄선한',bq_title_b:'뷰티',bq_sub:'헤어, 스킨, 네일, 메이크업, 프래그런스, 도구 — Babyloon 전문가가 엄선.',
      bq_banner_eyebrow:'Babyloon 셀렉션',bq_banner_title:'전문가가 쓰는 것을, 집에서',bq_banner_sub:'모든 서비스에서 검증됨. 살롱 품질을 집까지.',bq_banner_cta:'둘러보기',
      search:'검색…',sort_featured:'추천',sort_price_asc:'가격 ↑',sort_price_desc:'가격 ↓',sort_new:'신상품',
      cat_all:'전체',cat_cabello:'헤어',cat_maquillaje:'메이크업',cat_unas:'네일',cat_facial:'페이셜',cat_fragancia:'프래그런스',cat_masajes:'마사지',cat_cejas:'눈썹',cat_premium:'프리미엄',cat_belleza:'뷰티',
      featured:'추천',soldout:'품절',add:'담기',add_cart:'장바구니에 담기',loadmore:'더 보기',products_one:'개 상품',products_many:'개 상품',swipe_more:'스크롤하여 더 보기',empty_search:'검색 결과가 없습니다.',err_load:'상품을 불러오지 못했습니다.',err_conn:'카탈로그에 연결할 수 없습니다. 미리보기에서는 차단됩니다. 배포 후 정상 작동합니다.',
      cart_title:'장바구니',cart_empty:'장바구니가 비어 있습니다.',cart_empty_sub:'셀렉션을 둘러보세요.',cart_total:'합계',cart_checkout:'결제하기',cart_ship:'배송비는 다음 단계에서 계산됩니다.',cart_remove:'제거',qty:'수량',
      auth_title:'로그인',auth_sub:'구매를 완료하려면 로그인하세요',auth_email:'이메일',auth_pass:'비밀번호',auth_enter:'입장',auth_nocuenta:'계정이 없나요?',auth_crea:'만들기',auth_bad:'이메일 또는 비밀번호가 올바르지 않습니다.',session_expired:'세션이 만료되었습니다. 다시 로그인하세요.',
      back_home:'홈으로 돌아가기',by_babyloon:'Babyloon 셀렉션'},
    ru:{nav_inicio:'Главная',nav_cliente:'Клиент',nav_profesional:'Специалист',nav_boutique:'Бутик',nav_acceso:'Вход',nav_laapp:'Приложение',nav_entrar:'Войти',nav_micuenta:'Мой аккаунт',nav_solicitar:'Заказать услугу',nav_academia:'Академия',
      bq_eyebrow:'Бутик',bq_title_a:'Отобранная',bq_title_b:'красота',bq_sub:'Волосы, кожа, ногти, макияж, ароматы и инструменты — выбор профессионалов Babyloon.',
      bq_banner_eyebrow:'Подборка Babyloon',bq_banner_title:'То, чем пользуются профи, у вас дома',bq_banner_sub:'Проверено в каждой услуге. Салонное качество с доставкой на дом.',bq_banner_cta:'Смотреть',
      search:'Поиск…',sort_featured:'Рекомендуем',sort_price_asc:'Цена ↑',sort_price_desc:'Цена ↓',sort_new:'Новинки',
      cat_all:'Все',cat_cabello:'Волосы',cat_maquillaje:'Макияж',cat_unas:'Ногти',cat_facial:'Лицо',cat_fragancia:'Ароматы',cat_masajes:'Массаж',cat_cejas:'Брови',cat_premium:'Премиум',cat_belleza:'Красота',
      featured:'Рекомендуем',soldout:'Нет в наличии',add:'Добавить',add_cart:'В корзину',loadmore:'Показать ещё',products_one:'товар',products_many:'товаров',swipe_more:'прокрутите для ещё',empty_search:'По запросу ничего не найдено.',err_load:'Не удалось загрузить товары.',err_conn:'Не удалось подключиться к каталогу. В предпросмотре он заблокирован — после публикации всё работает.',
      cart_title:'Корзина',cart_empty:'Ваша корзина пуста.',cart_empty_sub:'Откройте нашу подборку.',cart_total:'Итого',cart_checkout:'Оформить',cart_ship:'Доставка рассчитывается на следующем шаге.',cart_remove:'Убрать',qty:'Кол-во',
      auth_title:'Вход',auth_sub:'Войдите, чтобы завершить покупку',auth_email:'Эл. почта',auth_pass:'Пароль',auth_enter:'Войти',auth_nocuenta:'Нет аккаунта?',auth_crea:'Создать',auth_bad:'Неверная почта или пароль.',session_expired:'Сессия истекла. Войдите снова.',
      back_home:'на главную',by_babyloon:'Подборка Babyloon'}
,

    /* ── Añadidos el 23 sep 2026 ────────────────────────────────
       Italia, Países Bajos, Polonia, Grecia y Hungría tienen ciudad en
       Babyloon y no tenían idioma: Milán y Roma, Ámsterdam, Varsovia,
       Santorini y Budapest. Lo que aquí falte cae ahora a INGLÉS y no a
       español, así que el resto del sitio se lee coherente mientras se
       completan los diccionarios grandes. */
    it:{nav_inicio:'Home',nav_cliente:'Cliente',nav_profesional:'Professionista',nav_boutique:'Boutique',nav_acceso:'Accesso',nav_laapp:'L\'app',nav_entrar:'Accedi',nav_micuenta:'Il mio account',nav_solicitar:'Prenota un servizio',nav_academia:'Accademia',bq_eyebrow:'La Boutique',bq_title_a:'Bellezza',bq_title_b:'selezionata',bq_sub:'Capelli, pelle, unghie, trucco, profumi e strumenti — scelti dai professionisti di Babyloon.',bq_banner_eyebrow:'Selezione Babyloon',bq_banner_title:'Ciò che usano i professionisti, a casa tua',bq_banner_sub:'Prodotti provati in ogni servizio. Qualità da salone, consegnata alla tua porta.',bq_banner_cta:'Scopri',search:'Cerca…',sort_featured:'In evidenza',sort_price_asc:'Prezzo ↑',sort_price_desc:'Prezzo ↓',sort_new:'Novità',cat_all:'Tutti',cat_cabello:'Capelli',cat_maquillaje:'Trucco',cat_unas:'Unghie',cat_facial:'Viso',cat_fragancia:'Profumi',cat_masajes:'Massaggi',cat_cejas:'Sopracciglia',cat_premium:'Premium',cat_belleza:'Bellezza',featured:'In evidenza',soldout:'Esaurito',add:'Aggiungi',add_cart:'Aggiungi al carrello',loadmore:'Carica altro',products_one:'prodotto',products_many:'prodotti',swipe_more:'scorri per vedere altro',empty_search:'Nessun prodotto trovato per questa ricerca.',err_load:'Impossibile caricare i prodotti.',err_conn:'Impossibile raggiungere il catalogo. Se sei nell\'anteprima, pubblica il sito e funzionerà.',cart_title:'Il tuo carrello',cart_empty:'Il tuo carrello è vuoto.',cart_empty_sub:'Scopri la nostra selezione.',cart_total:'Totale',cart_checkout:'Vai alla cassa',cart_ship:'Spedizione calcolata al passaggio successivo.',cart_remove:'Rimuovi',qty:'Quantità',auth_title:'Accedi',auth_sub:'Accedi per completare l\'acquisto',auth_email:'Email',auth_pass:'Password',auth_enter:'Entra',auth_nocuenta:'Non hai un account?',auth_crea:'Creane uno',auth_bad:'Email o password non corretti.',session_expired:'La sessione è scaduta. Accedi di nuovo.',back_home:'torna alla home',by_babyloon:'Selezione Babyloon'},

    nl:{nav_inicio:'Home',nav_cliente:'Klant',nav_profesional:'Professional',nav_boutique:'Boutique',nav_acceso:'Toegang',nav_laapp:'De app',nav_entrar:'Inloggen',nav_micuenta:'Mijn account',nav_solicitar:'Dienst boeken',nav_academia:'Academie',bq_eyebrow:'De Boutique',bq_title_a:'Geselecteerde',bq_title_b:'schoonheid',bq_sub:'Haar, huid, nagels, make-up, geuren en gereedschap — gekozen door de professionals van Babyloon.',bq_banner_eyebrow:'Babyloon-selectie',bq_banner_title:'Wat de professionals gebruiken, bij jou thuis',bq_banner_sub:'Producten die zich in elke behandeling bewijzen. Salonkwaliteit, thuisbezorgd.',bq_banner_cta:'Ontdekken',search:'Zoeken…',sort_featured:'Uitgelicht',sort_price_asc:'Prijs ↑',sort_price_desc:'Prijs ↓',sort_new:'Nieuw',cat_all:'Alles',cat_cabello:'Haar',cat_maquillaje:'Make-up',cat_unas:'Nagels',cat_facial:'Gezicht',cat_fragancia:'Geuren',cat_masajes:'Massage',cat_cejas:'Wenkbrauwen',cat_premium:'Premium',cat_belleza:'Schoonheid',featured:'Uitgelicht',soldout:'Uitverkocht',add:'Toevoegen',add_cart:'In winkelwagen',loadmore:'Meer laden',products_one:'product',products_many:'producten',swipe_more:'scroll voor meer',empty_search:'Geen producten gevonden voor deze zoekopdracht.',err_load:'Producten konden niet worden geladen.',err_conn:'De catalogus is niet bereikbaar. Ben je in de voorvertoning? Publiceer de site en het werkt.',cart_title:'Je winkelwagen',cart_empty:'Je winkelwagen is leeg.',cart_empty_sub:'Ontdek onze selectie.',cart_total:'Totaal',cart_checkout:'Afrekenen',cart_ship:'Verzendkosten worden in de volgende stap berekend.',cart_remove:'Verwijderen',qty:'Aantal',auth_title:'Inloggen',auth_sub:'Log in om je aankoop af te ronden',auth_email:'E-mail',auth_pass:'Wachtwoord',auth_enter:'Ga verder',auth_nocuenta:'Nog geen account?',auth_crea:'Maak er een',auth_bad:'E-mail of wachtwoord klopt niet.',session_expired:'Je sessie is verlopen. Log opnieuw in.',back_home:'terug naar home',by_babyloon:'Babyloon-selectie'},

    pl:{nav_inicio:'Start',nav_cliente:'Klientka',nav_profesional:'Profesjonalistka',nav_boutique:'Butik',nav_acceso:'Dostęp',nav_laapp:'Aplikacja',nav_entrar:'Zaloguj się',nav_micuenta:'Moje konto',nav_solicitar:'Zamów usługę',nav_academia:'Akademia',bq_eyebrow:'Butik',bq_title_a:'Wyselekcjonowane',bq_title_b:'piękno',bq_sub:'Włosy, skóra, paznokcie, makijaż, zapachy i akcesoria — wybrane przez profesjonalistki Babyloon.',bq_banner_eyebrow:'Wybór Babyloon',bq_banner_title:'To, czego używają profesjonalistki, u Ciebie w domu',bq_banner_sub:'Produkty sprawdzone w każdej usłudze. Jakość salonu z dostawą do drzwi.',bq_banner_cta:'Odkryj',search:'Szukaj…',sort_featured:'Polecane',sort_price_asc:'Cena ↑',sort_price_desc:'Cena ↓',sort_new:'Nowości',cat_all:'Wszystko',cat_cabello:'Włosy',cat_maquillaje:'Makijaż',cat_unas:'Paznokcie',cat_facial:'Twarz',cat_fragancia:'Zapachy',cat_masajes:'Masaż',cat_cejas:'Brwi',cat_premium:'Premium',cat_belleza:'Uroda',featured:'Polecane',soldout:'Wyprzedane',add:'Dodaj',add_cart:'Dodaj do koszyka',loadmore:'Pokaż więcej',products_one:'produkt',products_many:'produktów',swipe_more:'przewiń, aby zobaczyć więcej',empty_search:'Nie znaleziono produktów dla tego wyszukiwania.',err_load:'Nie udało się wczytać produktów.',err_conn:'Nie udało się połączyć z katalogiem. Jeśli jesteś w podglądzie, opublikuj stronę i zadziała.',cart_title:'Twój koszyk',cart_empty:'Twój koszyk jest pusty.',cart_empty_sub:'Odkryj naszą selekcję.',cart_total:'Razem',cart_checkout:'Do kasy',cart_ship:'Koszt dostawy obliczymy w następnym kroku.',cart_remove:'Usuń',qty:'Ilość',auth_title:'Zaloguj się',auth_sub:'Zaloguj się, aby dokończyć zakup',auth_email:'E-mail',auth_pass:'Hasło',auth_enter:'Wejdź',auth_nocuenta:'Nie masz konta?',auth_crea:'Załóż je',auth_bad:'Nieprawidłowy e-mail lub hasło.',session_expired:'Sesja wygasła. Zaloguj się ponownie.',back_home:'wróć na stronę główną',by_babyloon:'Wybór Babyloon'},

    el:{nav_inicio:'Αρχική',nav_cliente:'Πελάτισσα',nav_profesional:'Επαγγελματίας',nav_boutique:'Μπουτίκ',nav_acceso:'Πρόσβαση',nav_laapp:'Η εφαρμογή',nav_entrar:'Σύνδεση',nav_micuenta:'Ο λογαριασμός μου',nav_solicitar:'Κράτηση υπηρεσίας',nav_academia:'Ακαδημία',bq_eyebrow:'Η Μπουτίκ',bq_title_a:'Επιλεγμένη',bq_title_b:'ομορφιά',bq_sub:'Μαλλιά, δέρμα, νύχια, μακιγιάζ, αρώματα και εργαλεία — επιλεγμένα από τις επαγγελματίες της Babyloon.',bq_banner_eyebrow:'Επιλογή Babyloon',bq_banner_title:'Ό,τι χρησιμοποιούν οι επαγγελματίες, στο σπίτι σου',bq_banner_sub:'Προϊόντα δοκιμασμένα σε κάθε υπηρεσία. Ποιότητα σαλονιού, στην πόρτα σου.',bq_banner_cta:'Ανακάλυψε',search:'Αναζήτηση…',sort_featured:'Προτεινόμενα',sort_price_asc:'Τιμή ↑',sort_price_desc:'Τιμή ↓',sort_new:'Νέα',cat_all:'Όλα',cat_cabello:'Μαλλιά',cat_maquillaje:'Μακιγιάζ',cat_unas:'Νύχια',cat_facial:'Πρόσωπο',cat_fragancia:'Αρώματα',cat_masajes:'Μασάζ',cat_cejas:'Φρύδια',cat_premium:'Premium',cat_belleza:'Ομορφιά',featured:'Προτεινόμενο',soldout:'Εξαντλήθηκε',add:'Προσθήκη',add_cart:'Προσθήκη στο καλάθι',loadmore:'Φόρτωση περισσότερων',products_one:'προϊόν',products_many:'προϊόντα',swipe_more:'κύλησε για περισσότερα',empty_search:'Δεν βρέθηκαν προϊόντα για αυτήν την αναζήτηση.',err_load:'Δεν ήταν δυνατή η φόρτωση των προϊόντων.',err_conn:'Δεν ήταν δυνατή η σύνδεση με τον κατάλογο. Αν είσαι στην προεπισκόπηση, δημοσίευσε τον ιστότοπο και θα λειτουργήσει.',cart_title:'Το καλάθι σου',cart_empty:'Το καλάθι σου είναι άδειο.',cart_empty_sub:'Ανακάλυψε την επιλογή μας.',cart_total:'Σύνολο',cart_checkout:'Ολοκλήρωση',cart_ship:'Τα μεταφορικά υπολογίζονται στο επόμενο βήμα.',cart_remove:'Αφαίρεση',qty:'Ποσότητα',auth_title:'Σύνδεση',auth_sub:'Συνδέσου για να ολοκληρώσεις την αγορά',auth_email:'Email',auth_pass:'Κωδικός',auth_enter:'Είσοδος',auth_nocuenta:'Δεν έχεις λογαριασμό;',auth_crea:'Δημιούργησε έναν',auth_bad:'Λάθος email ή κωδικός.',session_expired:'Η συνεδρία έληξε. Συνδέσου ξανά.',back_home:'επιστροφή στην αρχική',by_babyloon:'Επιλογή Babyloon'},

    hu:{nav_inicio:'Kezdőlap',nav_cliente:'Ügyfél',nav_profesional:'Szakember',nav_boutique:'Butik',nav_acceso:'Belépés',nav_laapp:'Az alkalmazás',nav_entrar:'Bejelentkezés',nav_micuenta:'Fiókom',nav_solicitar:'Szolgáltatás foglalása',nav_academia:'Akadémia',bq_eyebrow:'A Butik',bq_title_a:'Válogatott',bq_title_b:'szépség',bq_sub:'Haj, bőr, köröm, smink, illatok és eszközök — a Babyloon szakemberei válogatták.',bq_banner_eyebrow:'Babyloon válogatás',bq_banner_title:'Amit a szakemberek használnak, nálad otthon',bq_banner_sub:'Minden szolgáltatásban bevált termékek. Szalonminőség, házhoz szállítva.',bq_banner_cta:'Felfedezés',search:'Keresés…',sort_featured:'Kiemelt',sort_price_asc:'Ár ↑',sort_price_desc:'Ár ↓',sort_new:'Újdonság',cat_all:'Összes',cat_cabello:'Haj',cat_maquillaje:'Smink',cat_unas:'Köröm',cat_facial:'Arc',cat_fragancia:'Illatok',cat_masajes:'Masszázs',cat_cejas:'Szemöldök',cat_premium:'Prémium',cat_belleza:'Szépség',featured:'Kiemelt',soldout:'Elfogyott',add:'Hozzáadás',add_cart:'Kosárba',loadmore:'Több betöltése',products_one:'termék',products_many:'termék',swipe_more:'görgess a többiért',empty_search:'Nincs találat erre a keresésre.',err_load:'A termékeket nem sikerült betölteni.',err_conn:'Nem értük el a katalógust. Ha előnézetben vagy, tedd közzé az oldalt és működni fog.',cart_title:'A kosarad',cart_empty:'A kosarad üres.',cart_empty_sub:'Fedezd fel a válogatásunkat.',cart_total:'Összesen',cart_checkout:'Pénztár',cart_ship:'A szállítást a következő lépésben számoljuk.',cart_remove:'Eltávolítás',qty:'Mennyiség',auth_title:'Bejelentkezés',auth_sub:'Jelentkezz be a vásárlás befejezéséhez',auth_email:'E-mail',auth_pass:'Jelszó',auth_enter:'Belépés',auth_nocuenta:'Nincs még fiókod?',auth_crea:'Hozz létre egyet',auth_bad:'Hibás e-mail vagy jelszó.',session_expired:'A munkamenet lejárt. Jelentkezz be újra.',back_home:'vissza a kezdőlapra',by_babyloon:'Babyloon válogatás'}
  };

  // Los cinco nuevos salen de cruzar las 43 ciudades con lo que se habla
  // en sus 19 países: Milán y Roma, Ámsterdam, Varsovia, Santorini y
  // Budapest no tenían su idioma. zh/ko/ru no son de ninguna ciudad y se
  // quedan: son mercados emisores de turismo de lujo hacia el triángulo.
  const LANGS=[['es','ES'],['en','EN'],['pt','PT'],['fr','FR'],['de','DE'],['it','IT'],
    ['nl','NL'],['pl','PL'],['el','EL'],['hu','HU'],['ru','RU'],['ar','AR'],['zh','ZH'],
    ['ja','JA'],['ko','KO'],['sv','SV']];
  const NAMES={es:'Español',en:'English',pt:'Português',fr:'Français',de:'Deutsch',
    it:'Italiano',nl:'Nederlands',pl:'Polski',el:'Ελληνικά',hu:'Magyar',
    ru:'Русский',ar:'العربية',zh:'中文',ja:'日本語',ko:'한국어',sv:'Svenska'};
  const RTL=['ar'];

  // País → idioma (respaldo cuando el idioma del dispositivo no es de los 11)
  const COUNTRY_LANG={ES:'es',MX:'es',AR:'es',CO:'es',CL:'es',PE:'es',VE:'es',EC:'es',GT:'es',CU:'es',BO:'es',DO:'es',HN:'es',PY:'es',SV:'es',NI:'es',CR:'es',PA:'es',UY:'es',
    US:'en',GB:'en',IE:'en',AU:'en',CA:'en',NZ:'en',ZA:'en',IN:'en',NG:'en',PH:'en',
    DE:'de',AT:'de',CH:'de', FR:'fr',BE:'fr',LU:'fr',MC:'fr', PT:'pt',BR:'pt', SE:'sv', IT:'it', NL:'nl',BE:'nl', PL:'pl', GR:'el',CY:'el', HU:'hu',
    JP:'ja', KR:'ko', CN:'zh',TW:'zh',HK:'zh',SG:'zh', RU:'ru',BY:'ru',KZ:'ru',UA:'ru',
    SA:'ar',AE:'ar',EG:'ar',QA:'ar',KW:'ar',BH:'ar',OM:'ar',JO:'ar',LB:'ar',MA:'ar',DZ:'ar',TN:'ar',IQ:'ar',LY:'ar',YE:'ar'};
  function deviceLang(){
    const navs=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||''];
    for(const nl of navs){const c=(nl||'').slice(0,2).toLowerCase(); if(DICT[c])return c;}
    return null;
  }
  let saved=null; try{saved=localStorage.getItem('bbl_lang');}catch(_){}
  let needsGeo=false, lang;
  if(saved && DICT[saved]) lang=saved;                 // 1) elección explícita del usuario
  else { const dl=deviceLang();                         // 2) idioma del dispositivo
    if(dl) lang=dl; else { lang='en'; needsGeo=true; } } // 3) sin match → inglés + refinar por ubicación
  async function refineByCountry(){
    try{
      const ctrl=new AbortController(), to=setTimeout(()=>ctrl.abort(),2500);
      const r=await fetch('/cdn-cgi/trace',{signal:ctrl.signal}); clearTimeout(to);
      const t=await r.text(), m=t.match(/loc=([A-Z]{2})/);
      if(m){ const c=COUNTRY_LANG[m[1]]; if(c && DICT[c] && c!==lang) BBL.setLang(c); }
    }catch(_){}
  }

  const BBL={
    langs:LANGS,names:NAMES,
    get lang(){return lang;},
    // El respaldo era ESPAÑOL, y eso contradecía la regla de la casa:
    // «si no tenemos el idioma del dispositivo, se muestra en inglés».
    // Una sueca a la que le faltaba una clave no veía inglés: veía
    // español. Ahora la cadena es idioma → inglés → español → la
    // propia clave, y el español queda sólo como última red.
    t(k){return (DICT[lang]&&DICT[lang][k])||DICT.en[k]||DICT.es[k]||k;},
    extend(more){for(const l in more){DICT[l]=Object.assign(DICT[l]||{},more[l]);}
      if(document.readyState!=='loading')this.applyDOM();},
    setLang(l){if(!DICT[l])return;lang=l;try{localStorage.setItem('bbl_lang',l);}catch(_){}
      document.documentElement.lang=l;document.documentElement.dir=RTL.includes(l)?'rtl':'ltr';
      this.applyDOM();document.dispatchEvent(new CustomEvent('bbl:lang',{detail:l}));},
    /* ── `data-i18n-html` · bloque 45 ───────────────────────────────
       `data-i18n` pinta con `textContent`, y está bien: una traducción
       es texto, no marcado. Pero las páginas de compañía necesitan
       resaltar el arranque de cada punto de una lista, y partir cada
       frase en dos claves —una para la negrita y otra para el resto—
       habría añadido 27 claves × 16 idiomas por un `<strong>`.

       La salida NO es `innerHTML` a pelo. Se escapa la cadena ENTERA y
       después se devuelven a la vida exactamente tres etiquetas:
       `<strong>`, `</strong>` y `<br>`. Cualquier otra cosa —un
       `<script>`, un `onerror=`, una comilla— ya ha quedado escapada y
       no hay forma de que vuelva. Es una lista blanca demostrable, no
       una confianza en el que escribe el diccionario.                */
    htmlSeguro(s){
      const esc = String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
                           .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
                           .replace(/'/g,'&#39;');
      return esc.replace(/&lt;strong&gt;/g,'<strong>')
                .replace(/&lt;\/strong&gt;/g,'</strong>')
                .replace(/&lt;br\s*\/?&gt;/g,'<br>');
    },
    applyDOM(root){(root||document).querySelectorAll('[data-i18n]').forEach(el=>{
        const v=this.t(el.getAttribute('data-i18n'));if(v)el.textContent=v;});
      (root||document).querySelectorAll('[data-i18n-html]').forEach(el=>{
        const v=this.t(el.getAttribute('data-i18n-html'));if(v)el.innerHTML=this.htmlSeguro(v);});
      (root||document).querySelectorAll('[data-i18n-ph]').forEach(el=>{
        const v=this.t(el.getAttribute('data-i18n-ph'));if(v)el.setAttribute('placeholder',v);});},
    /* ── El nombre de una ciudad es una palabra, no un dato ──────────
       `ciudades_publicas()` las devuelve como están en `city_cost_index`:
       en español. Y así salían en las cuarenta y tres páginas de ciudad,
       en la portada y en la lista de espera, con la web en inglés:
       «Estocolmo», «Ginebra», «París».

       El PAÍS no hace falta traducirlo a mano —`Intl.DisplayNames` lo
       sabe a partir del ISO—, pero una ciudad no tiene código ISO, así
       que las cuarenta y tres están escritas en `i18n-ciudad-nombres.js`
       con la clave `cd_n_<slug>`.

       Se acepta tanto el nombre («Ciudad de México») como el slug
       («ciudad-de-mexico»): sluguear un slug no lo cambia. Y si no está
       —la ciudad de una profesional que no es de las nuestras— se
       devuelve tal cual, que es justo lo que había antes.

       La regla del slug es la misma que `slug_de_ciudad()` en la base.
       Si cambia allí, cambia aquí. */
    ciudad(n){
      var s=String(n==null?'':n).normalize('NFD').replace(/[\u0300-\u036f]/g,'')
            .toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
      if(!s) return '';
      var v=DICT[lang]&&DICT[lang]['cd_n_'+s];
      return v||String(n==null?'':n);
    },
    prodName(p){return (p&&(p['name_'+lang]||p.name))||'';},
    prodDesc(p){return (p&&(p['description_'+lang]||p.description_es||p.description))||'';},
    mountSwitcher(el){if(!el)return;
      // Montar dos veces deja dos escuchadores de click en `document`
      // por cada montaje. Con el automático de abajo eso pasaría en
      // las tres páginas que además lo llaman a mano.
      if(el.dataset.bblMontado)return; el.dataset.bblMontado='1';
      // Los estilos los pone quien pinta el marcado. Hasta hoy los
      // escribía a mano cada página, y sólo tres de las cincuenta y
      // tantas los tenían: en `lista-espera` y en `masterclass` el
      // conmutador salía en crudo, con los once idiomas desparramados
      // por la cabecera. Con dieciséis habría sido peor.
      //
      // Se inyecta al PRINCIPIO del <head>, no al final: así una
      // página que tenga los suyos propios sigue ganando por orden,
      // y la que no tenga ninguno queda presentable.
      if(!document.getElementById('bbl-lang-estilos')){
        const st=document.createElement('style'); st.id='bbl-lang-estilos';
        st.textContent=
         '.bbl-lang{position:relative}'+
         '.bbl-lang-btn{display:flex;align-items:center;gap:5px;background:none;'+
           'border:1px solid var(--line,rgba(200,169,106,.16));color:var(--smoke,#E8E0D5);'+
           'font-family:var(--sans,system-ui,sans-serif);font-size:11px;letter-spacing:.1em;'+
           'padding:9px 12px;border-radius:20px;cursor:pointer;transition:.25s}'+
         '.bbl-lang-btn:hover{border-color:var(--gold,#C8A96A);color:var(--gold,#C8A96A)}'+
         /* `right:0` es una medida FÍSICA y en árabe saca el menú por
            la izquierda de la pantalla: medido en la academia, el
            desplegable empezaba en -45 px. `inset-inline-end` lo ancla
            al final de la línea de lectura —la izquierda en árabe— y
            entonces se despliega hacia dentro.

            PERO no se puede dejar `right:0` suelto de respaldo, como se
            intentó primero: conviviendo con `inset-inline-end`, en árabe
            se aplican los DOS y el menú se estira de lado a lado. Una
            física y una lógica para la misma arista no se llevan bien.

            Y sin respaldo tampoco vale (bloque 15.9): Safari no entiende
            `inset-inline-end` hasta la 14.1, y allí el menú se queda sin
            anclaje ninguno. La salida es poner el respaldo físico BIEN
            —uno para cada sentido de lectura— y anularlo con `@supports`
            en cuanto el navegador sepa la propiedad lógica. Los que la
            saben nunca ven los físicos; los que no, tienen los dos casos
            cubiertos. */
         '.bbl-lang-menu{position:absolute;top:calc(100% + 8px);right:0;'+
           'background:var(--plum,#241820);border:1px solid var(--line,rgba(200,169,106,.16));'+
           'border-radius:6px;padding:6px;min-width:150px;z-index:60;opacity:0;visibility:hidden;'+
           /* La transición era `.22s` a secas, es decir a TODAS las propiedades,
              y `acomodar()` coloca el menú con `translate`. Resultado: el
              empujón de -78 px se ANIMABA durante 220 ms, y en ese rato el
              menú cerrado asomaba por la derecha. Medido en `regalo.html` a
              390 px: 70 px de barra horizontal desde la primera pintura
              hasta los 354 ms. Invisible —el menú está oculto— pero la
              página se deslizaba de lado con el dedo. Se nombran las tres
              propiedades de la apertura y `translate` queda fuera: coloca
              de golpe, que es lo que tiene que hacer. */
           'transform:translateY(-6px);transition:opacity .22s,visibility .22s,transform .22s;'+
           'box-shadow:0 20px 50px -20px rgba(0,0,0,.8);'+
           // Con dieciséis idiomas la lista ya no cabe en pantalla.
           'max-height:min(66vh,460px);overflow-y:auto}'+
         '[dir="rtl"] .bbl-lang-menu{right:auto;left:0}'+
         '@supports (inset-inline-end:0){'+
           '.bbl-lang-menu,[dir="rtl"] .bbl-lang-menu{right:auto;left:auto;inset-inline-end:0}}'+
         '.bbl-lang.open .bbl-lang-menu{opacity:1;visibility:visible;transform:translateY(0)}'+
         '.bbl-lang-menu button{display:block;width:100%;text-align:left;background:none;'+
           'border:none;color:var(--smoke,#E8E0D5);font-family:var(--sans,system-ui,sans-serif);'+
           'font-size:13px;padding:9px 12px;border-radius:3px;cursor:pointer;transition:.2s;white-space:nowrap}'+
         '.bbl-lang-menu button:hover{background:rgba(200,169,106,.08);color:var(--cream,#F9F5EE)}'+
         '.bbl-lang-menu button.on{color:var(--gold,#C8A96A)}';
        document.head.insertBefore(st, document.head.firstChild);
      }
      el.classList.add('bbl-lang');
      el.innerHTML=`<button type="button" class="bbl-lang-btn"><span class="bbl-cur">${lang.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="bbl-lang-menu">${LANGS.map(([c])=>`<button type="button" data-l="${c}"${c===lang?' class="on"':''}>${NAMES[c]}</button>`).join('')}</div>`;
      const btn=el.querySelector('.bbl-lang-btn'),menu=el.querySelector('.bbl-lang-menu');
      /* Que el desplegable quepa SIEMPRE en la pantalla.
         Con CSS no se puede: depende de dónde haya acabado el botón,
         y eso cambia con el idioma, con el ancho y con si la cabecera
         se ha partido en dos filas. Medido con el menú abierto de
         verdad: en `regalo.html` a 390 px se salía 71 px por la
         derecha; en `profesionales.html` en árabe, 64 px por la
         izquierda. Anclarlo a un lado fijo sólo cambia por cuál de
         los dos se sale.
         Se mide al abrir y se empuja lo justo con un margen. No se
         usa `transform` porque ése ya lo ocupa la animación de
         apertura, y pisarlo dejaría el menú sin transición. */
      function acomodar(){
        // NO se borra el desplazamiento antes de medir. La primera
        // versión lo hacía, y cuando la medida salía rara —el menú a
        // mitad de la transición de apertura, con ancho 0— la función
        // se iba por el `return` y lo dejaba BORRADO: el menú volvía
        // a salirse, y encima sólo al abrirlo, que es cuando se ve.
        // Se descuenta del rectángulo lo que ya está desplazado y se
        // calcula sobre la posición natural. Así, cualquier salida
        // anticipada deja las cosas como estaban.
        const yaDx = parseFloat(menu.style.translate) || 0;
        const rr = menu.getBoundingClientRect(), borde = 8;
        const ancho = document.documentElement.clientWidth;
        if(rr.width === 0) return;
        const r = { left: rr.left - yaDx, right: rr.right - yaDx, width: rr.width };
        let dx=0;
        if(r.right > ancho-borde) dx = -(r.right-(ancho-borde));
        else if(r.left < borde)   dx = borde-r.left;
        // `translate` y no `margin`: el menú está anclado por un lado
        // (derecha en español, izquierda en árabe) y un margen del
        // lado contrario no lo mueve. Medido: con `margin-left` se
        // arreglaban los quince casos LTR y seguían rotos los tres
        // árabes. `translate` es una propiedad aparte de `transform`,
        // así que empuja sin pisar la animación de apertura.
        menu.style.translate = dx ? Math.round(dx)+'px' : '';
      }
      btn.addEventListener('click',e=>{e.stopPropagation();
        const abierto=el.classList.toggle('open');
        if(abierto) requestAnimationFrame(acomodar);});
      // También CERRADO, y esto no es manía: un elemento con
      // `visibility:hidden` no se ve pero SÍ cuenta para el ancho
      // desplazable de la página. Medido en `regalo.html`: el menú
      // cerrado se quedaba en 310..460 sobre una pantalla de 390 y la
      // página entera cogía 70 px de barra horizontal. Invisible y
      // rompiendo la maqueta a la vez, que es la peor combinación
      // porque no se ve de dónde viene.
      requestAnimationFrame(acomodar);
      addEventListener('resize', acomodar, {passive:true});
      /* Y cuando entren las tipografías · bloque 46.10
         `acomodar()` medía una vez al montar, y en ese momento el
         navegador todavía pinta con la tipografía de sistema:
         `fuentes.css` lleva `font-display:swap` desde el 17.A8c. Al
         entrar Cormorant y Jost, los rótulos de la cabecera cambian de
         ancho, la barra se recoloca y el menú CERRADO se va con ella
         — sin que nadie vuelva a medir.
         Medido en `empleo.html` a 320 px: el menú acababa en 381 y la
         página se arrastraba 61 px de lado. Y no siempre: depende de
         si la tipografía llega antes o después del primer fotograma,
         que es lo que hacía que la prueba saliera verde una vez de
         cada tres. */
      try {
        if (document.fonts && document.fonts.ready)
          document.fonts.ready.then(function(){ acomodar(); });
      } catch (_) {}
      // Y al cambiar de idioma: los nombres cambian de largo, el menú
      // cambia de ancho y la cabecera se recoloca, así que el
      // desplazamiento calculado antes se queda viejo. Medido: al
      // pasar a árabe, `regalo.html` a 390 px volvía a los 148 px de
      // desborde con el menú ya colocado para el español.
      // Dos pasadas, no una. Al cambiar de idioma la cabecera se
      // reordena, y en árabe además cambia el sentido de lectura
      // entera: el primer fotograma todavía trae medidas del idioma
      // anterior. Medido: con una sola pasada quedaban cuatro casos
      // rotos —árabe y chino en `regalo`, chino y coreano en
      // `profesionales`—; con la segunda, ninguno. Es una función que
      // sólo mide y mueve unos píxeles, así que llamarla dos veces al
      // cambiar de idioma no cuesta nada.
      document.addEventListener('bbl:lang', ()=>{
        requestAnimationFrame(acomodar);
        setTimeout(acomodar, 140);
      });
      document.addEventListener('click',()=>el.classList.remove('open'));
      menu.addEventListener('click',e=>{const b=e.target.closest('[data-l]');if(!b)return;
        this.setLang(b.dataset.l);el.querySelector('.bbl-cur').textContent=b.dataset.l.toUpperCase();
        menu.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));el.classList.remove('open');});}
  };
  /* ── Bloque 52.5 · esto era `window.BBL=BBL` a secas ──────────────────
     Y una asignación BORRA. Dos ficheros cuelgan cosas de `BBL` antes de
     que llegue este:

         seguro.js    → BBL.esc, BBL.url
         direccion.js → BBL.direccion   (el autocompletado de direcciones)

     En `checkout.html` —el formulario de envío de la boutique—
     `direccion.js` va en la línea 722 y este fichero en la 726. Así que
     `direccion.js` colgaba `BBL.direccion`, esta línea lo tiraba cuatro
     etiquetas después, y al llegar el `DOMContentLoaded` la página hacía

         if(!window.BBL || !BBL.direccion) return;

     y se rendía en silencio. Ni excepción, ni aviso, ni nada: el campo de
     la calle se quedaba siendo un campo de texto normal. En `cliente.html`
     el orden es el contrario y ahí sí funcionaba, que es por lo que la
     prueba del bloque 52.1 daba verde mientras Andrés veía que no sugería
     nada. `BBL.esc` y `BBL.url` desaparecían en las SEIS páginas que
     cargan `seguro.js`; hoy nadie las llama —ese fichero deja también
     `escAttr` y `safeUrl` como globales propias— pero el día que alguien
     escriba `BBL.esc(...)` para pintar texto ajeno se encontrará
     `undefined` donde debía haber un escapador.

     Ahora se funde en vez de reemplazar, y lo de este fichero manda: si un
     día alguien cuelga un `BBL.t` propio antes, no pisa el de aquí.

     Se copia con `getOwnPropertyDescriptor` y no con un `Object.assign` a
     la inversa por una razón concreta: `lang` es un GETTER
     (`get lang(){return lang;}`). Un `Object.assign(previo, BBL)` copiaría
     el VALOR del getter en el momento de la carga y `BBL.lang` se quedaría
     congelado en el idioma inicial para siempre: cambiar de idioma
     dejaría de cambiar lo que `direccion.js` manda al servidor. */
  /* ── Bloque 52.5 · esto era `window.BBL=BBL` a secas ──────────────────
     Y una asignación BORRA. Dos ficheros cuelgan cosas de `BBL` antes de
     que llegue este:

         seguro.js    → BBL.esc, BBL.url
         direccion.js → BBL.direccion   (el autocompletado de direcciones)

     En `checkout.html` —el formulario de envío de la boutique—
     `direccion.js` iba delante de este fichero. Así que colgaba
     `BBL.direccion`, esta línea lo tiraba cuatro etiquetas después, y al
     llegar el `DOMContentLoaded` la página hacía

         if(!window.BBL || !BBL.direccion) return;

     y se rendía en silencio. Ni excepción, ni aviso, ni nada: el campo de
     la calle se quedaba siendo un campo de texto normal. En `cliente.html`
     el orden era el contrario y ahí sí funcionaba, que es por lo que la
     prueba del bloque 52.1 daba verde mientras Andrés veía que no sugería
     nada. `BBL.esc` y `BBL.url` desaparecían en las SEIS páginas que
     cargan `seguro.js`; hoy nadie las llama —ese fichero deja también
     `escAttr` y `safeUrl` como globales propias— pero el día que alguien
     escriba `BBL.esc(...)` para pintar texto ajeno se encontrará
     `undefined` donde debía haber un escapador.

     Ahora se funde en vez de reemplazar, y lo de este fichero manda: si un
     día alguien cuelga un `BBL.t` propio antes, no pisa el de aquí.

     Se copia con `getOwnPropertyDescriptor` y no con un `Object.assign` a
     la inversa por una razón concreta: `lang` es un GETTER
     (`get lang(){return lang;}`). Un `Object.assign(previo, BBL)` copiaría
     el VALOR del getter en el momento de la carga y `BBL.lang` se quedaría
     congelado en el idioma inicial para siempre: cambiar de idioma
     dejaría de cambiar lo que `direccion.js` manda al servidor. */
  (function fundeBBL(){
    var previo = window.BBL;
    if (previo && previo !== BBL) {
      Object.getOwnPropertyNames(previo).forEach(function(k){
        if (k in BBL) return;                       // lo de i18n.js manda
        try {
          Object.defineProperty(BBL, k, Object.getOwnPropertyDescriptor(previo, k));
        } catch (_) { try { BBL[k] = previo[k]; } catch (__) {} }
      });
    }
    window.BBL = BBL;
  })();
  /* ── Bloque 15.6 · `lang` y `dir` sólo si la página está traducida ──
     Esto se ponía SIN CONDICIÓN, y 46 de las 62 páginas no tienen ni
     una clave `data-i18n`: las 43 de ciudad, más términos, privacidad
     y contacto. Con el móvil en árabe, `ciudad-dubai.html` se daba la
     vuelta entera —`dir="rtl"`— con el texto en español: los números
     saltaban al final de la frase y los puntos al principio de la
     línea. Dubái y Abu Dabi están entre esas 43 ciudades.
     Y `lang="ja"` sobre un texto español no es un detalle: es lo que
     leen el lector de pantalla, el corrector y Google.
     La condición ya existía 40 líneas más abajo, para decidir si montar
     el selector. Es la misma pregunta: ¿esta página habla otros
     idiomas? Se aplica aquí también.
     El día que se traduzcan las páginas de ciudad, esto se pone solo. */
  function paginaTraducida(){
    try{ return !!document.querySelector('[data-i18n]'); }catch(_){ return false; }
  }
  function marcarIdiomaDelDocumento(){
    if(!paginaTraducida()) return;
    document.documentElement.lang=lang;
    document.documentElement.dir=RTL.includes(lang)?'rtl':'ltr';
  }
  if(document.readyState==='loading')
    document.addEventListener('DOMContentLoaded',marcarIdiomaDelDocumento);
  else marcarIdiomaDelDocumento();
  document.addEventListener('bbl:lang',marcarIdiomaDelDocumento);

  /* ── 17.A · El aviso que sólo llegaba si cambiabas de idioma ──────
     `bbl:lang` sólo se disparaba dentro de `setLang()`. Si entras y la
     página ya está en tu idioma —el caso normal, porque se guarda— el
     aviso no salía nunca.

     Eso rompe a cualquier bloque que se pinte con datos del servidor y
     traduzca con `BBL.t()`: si su script corre ANTES de que este
     fichero esté cargado, pinta en español y ya no se entera. Le pasaba
     al checkout, cuyo script va en la línea 241 y los diccionarios en
     la 557: el IVA y los nombres de país salían en español en las
     dieciséis versiones. Y no fallaba siempre, que es lo peor: depende
     de si contesta antes el servidor o el navegador.

     Ahora se avisa una vez cuando el documento está listo, que es
     cuando ya están registrados todos los que escuchan. Todos los que
     escuchan repintan, así que oírlo de más no rompe nada. */
  function avisoInicial(){
    try{ document.dispatchEvent(new CustomEvent('bbl:lang',{detail:lang})); }catch(_){}
  }
  if(document.readyState==='loading')
    document.addEventListener('DOMContentLoaded',avisoInicial);
  else setTimeout(avisoInicial,0);
  /* ── El selector de idioma se monta solo ───────────────────────
     Medido hoy, no supuesto: de las 57 páginas, SÓLO CINCO tenían
     un hueco `#langSwitch` en el marcado, y sólo tres lo montaban.
     Las 43 páginas de ciudad —incluida `ciudad-budapest.html`— no
     tenían ninguno. Un húngaro que aterriza ahí con el móvil en
     inglés no tiene forma de llegar a su idioma, y la promesa era
     «19 países, sus lenguas nativas».

     Y en las tres que sí lo montaban, la llamada vive dentro del
     mismo <script> en línea que empieza por:
         const sb = window.supabase.createClient(...)
     Si el CDN de jsdelivr tarda, lo bloquea un cortafuegos o está
     caído —o si el visitante está en China, donde jsdelivr no
     siempre llega, y el chino es uno de nuestros idiomas—, esa
     línea lanza, el bloque entero muere y el selector no se monta.
     Ese es un segundo motivo, independiente de los estilos que
     faltaban, para la misma pantalla que me enseñó Andrés.

     Así que el montaje se hace aquí, desde el propio i18n.js, que
     no depende de ningún CDN. Las llamadas a mano siguen estando y
     no molestan: `mountSwitcher` ya no monta dos veces.

     La creación del hueco es deliberadamente tímida: sólo si no
     hay ninguno, sólo dentro de la barra de la cabecera, y
     envuelta en try/catch. Si una página no encaja, no pasa nada:
     se queda como estaba. Prefiero eso a inyectar marcado a ciegas
     en 52 cabeceras que no he mirado una por una. */
  function montarIdioma(){
    try{
      const yaHay=document.querySelectorAll('#langSwitch,#langSwitchM,[data-bbl-lang]');
      if(yaHay.length){ yaHay.forEach(el=>BBL.mountSwitcher(el)); return; }

      // Sin hueco: lo creamos —pero sólo si la página tiene algo que
      // traducir. Las 43 páginas de ciudad cargan i18n.js y no tienen
      // ni una sola clave `data-i18n`: están enteras en español. Poner
      // ahí un selector de dieciséis idiomas es ofrecer un botón que
      // no hace nada, y eso es peor que no ofrecer ninguno. Cuando esas
      // páginas se traduzcan, el selector aparecerá solo.
      if(!document.querySelector('[data-i18n]')) return;

      // Dónde meterlo importa más de lo que parece. La primera versión
      // lo colgaba de `header .nav` directamente, y esa barra es un
      // flex con `justify-content:space-between` y DOS hijos: la marca
      // y el grupo de enlaces. Al añadir un tercero, `space-between`
      // dejó el grupo de enlaces en el centro y «Babyloon» acabó
      // pegado a «INICIO», sin un pixel entre medias.
      //
      // Así que primero se busca el grupo de la derecha, que es donde
      // vive lo de este tipo en todas las páginas de la casa, y sólo
      // si no hay ninguno se cuelga de la barra.
      const grupo=document.querySelector('header .nav-right')
               || document.querySelector('header .nav-actions');
      const barra=grupo
               || document.querySelector('header .nav')
               || document.querySelector('header .wrap')
               || document.querySelector('header > div');
      if(!barra) return;                       // página sin cabecera: se deja en paz
      const hueco=document.createElement('div');
      hueco.id='langSwitch';
      hueco.className='bbl-lang-auto';   // para saber cuál hemos puesto nosotros
      // El `margin-left:auto` sólo hace falta cuando vamos sueltos en
      // la barra; dentro del grupo de la derecha sobra y descolocaría.
      if(!grupo) hueco.style.marginLeft='auto';
      barra.appendChild(hueco);

      // Si la barra no podía permitirse otro hijo, que se reparta en
      // dos filas en vez de salirse por el borde.
      //
      // Medido en `profesionales.html` a 390 px: la barra es un flex
      // con `nowrap` y dos hijos que ya sumaban 324 px de los 334
      // útiles. Al añadir el tercero —58 px— la cabecera se salía 56
      // px y con ella la página entera, en doce de los dieciséis
      // idiomas.
      //
      // Se toca sólo la barra a la que le hemos añadido algo, y sólo
      // si de verdad no cabe: una página con sitio no nota nada. Y se
      // hace aquí y no con `:has()` en la hoja de estilos porque el
      // que ha causado el problema es este código, y es aquí donde se
      // sabe con certeza que hay un hijo de más.
      try{
        const cs=getComputedStyle(barra);
        if(cs.display.indexOf('flex')>=0){
          // `scrollWidth` NO sirve aquí: en un flex con `nowrap` y
          // `overflow:visible` un hijo que se sale no lo aumenta, así
          // que la primera versión de esta comprobación daba siempre
          // que cabía. Se mide lo único que no miente: dónde ha
          // acabado de verdad el trozo que acabamos de añadir, contra
          // el borde interior de la barra.
          const rb=barra.getBoundingClientRect();
          const rh=hueco.getBoundingClientRect();
          const dentro=rb.right - parseFloat(cs.paddingRight||0);
          if(rh.right > dentro + 1 || rh.width===0){
            barra.style.flexWrap='wrap';
            if(!barra.style.rowGap) barra.style.rowGap='8px';
            hueco.style.marginLeft='';   // ya no hace falta empujarlo
          }
        }
      }catch(_){}

      BBL.mountSwitcher(hueco);
    }catch(_){ /* nunca por un selector se cae una página */ }
  }

  document.addEventListener('DOMContentLoaded',()=>{ BBL.applyDOM(); montarIdioma(); });
  if(needsGeo) refineByCountry();
})();
