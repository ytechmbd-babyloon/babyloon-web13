/* ═══════════════════════════════════════════════════════════════
   Babyloon · Información legal: el texto que faltaba — 16 idiomas
   ───────────────────────────────────────────────────────────────
   61.5c · Las dos apps abren `informacion-legal.html` desde el perfil.
   La página decía dónde está cada texto legal y se dejaba uno: las
   Condiciones para profesionales, que existen desde el 61.5 y que
   acepta cada profesional al entrar.

   El nombre del documento es el mismo que lleva la casilla de la
   aceptación (`ac_l_condiciones`, en i18n-aceptacion.js): quien lo
   acepta con un nombre lo tiene que encontrar con ese nombre. En sueco
   va sin artículo (`Villkor`, no `Villkoren`), como el resto de la
   lista de esta página.

   Sin género: «quien ofrece», «les personnes qui», «κάθε πρόσωπο»,
   «كل جهة» en vez del masculino genérico.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({
    es: { li_cond: '<strong>Condiciones para profesionales</strong> — lo que rige la relación entre Babyloon y quien ofrece sus servicios a través de la plataforma.',
          li_cond_link: 'Condiciones para profesionales' },
    en: { li_cond: '<strong>Terms for professionals</strong> — what governs the relationship between Babyloon and anyone offering their services through the platform.',
          li_cond_link: 'Terms for professionals' },
    pt: { li_cond: '<strong>Condições para profissionais</strong> — o que rege a relação entre a Babyloon e quem oferece os seus serviços através da plataforma.',
          li_cond_link: 'Condições para profissionais' },
    fr: { li_cond: '<strong>Conditions professionnelles</strong> — ce qui régit la relation entre Babyloon et les personnes qui proposent leurs services via la plateforme.',
          li_cond_link: 'Conditions professionnelles' },
    de: { li_cond: '<strong>Bedingungen für Fachkräfte</strong> — was für die Beziehung zwischen Babyloon und allen gilt, die ihre Dienstleistungen über die Plattform anbieten.',
          li_cond_link: 'Bedingungen für Fachkräfte' },
    it: { li_cond: '<strong>Condizioni professionali</strong> — ciò che regola il rapporto tra Babyloon e chi offre i propri servizi tramite la piattaforma.',
          li_cond_link: 'Condizioni professionali' },
    nl: { li_cond: '<strong>Voorwaarden voor professionals</strong> — wat de relatie regelt tussen Babyloon en iedereen die via het platform diensten aanbiedt.',
          li_cond_link: 'Voorwaarden voor professionals' },
    pl: { li_cond: '<strong>Warunki dla profesjonalistów</strong> — zasady relacji między Babyloon a osobami, które oferują swoje usługi za pośrednictwem platformy.',
          li_cond_link: 'Warunki dla profesjonalistów' },
    el: { li_cond: '<strong>Όροι για επαγγελματίες</strong> — ό,τι διέπει τη σχέση της Babyloon με κάθε πρόσωπο που προσφέρει υπηρεσίες μέσω της πλατφόρμας.',
          li_cond_link: 'Όροι για επαγγελματίες' },
    hu: { li_cond: '<strong>Feltételek szakembereknek</strong> — ami a Babyloon és a platformon keresztül szolgáltatást nyújtók kapcsolatát szabályozza.',
          li_cond_link: 'Feltételek szakembereknek' },
    ru: { li_cond: '<strong>Условия для специалистов</strong> — то, что регулирует отношения между Babyloon и теми, кто предлагает свои услуги через платформу.',
          li_cond_link: 'Условия для специалистов' },
    sv: { li_cond: '<strong>Villkor för yrkesverksamma</strong> — det som gäller för relationen mellan Babyloon och den som erbjuder sina tjänster via plattformen.',
          li_cond_link: 'Villkor för yrkesverksamma' },
    ar: { li_cond: '<strong>شروط الشراكة المهنية</strong> — ما يحكم العلاقة بين Babyloon وكل جهة مهنية تقدّم خدماتها عبر المنصة.',
          li_cond_link: 'شروط الشراكة المهنية' },
    zh: { li_cond: '<strong>专业人士条款</strong> — 规范 Babyloon 与通过平台提供服务的专业人士之间的关系。',
          li_cond_link: '专业人士条款' },
    ja: { li_cond: '<strong>プロフェッショナル向け規約</strong> — Babyloon と、プラットフォームを通じてサービスを提供する方との関係を定めるもの。',
          li_cond_link: 'プロフェッショナル向け規約' },
    ko: { li_cond: '<strong>전문가 이용 조건</strong> — Babyloon과 플랫폼을 통해 서비스를 제공하는 분 사이의 관계를 정하는 조건.',
          li_cond_link: '전문가 이용 조건' }
  });
})();
