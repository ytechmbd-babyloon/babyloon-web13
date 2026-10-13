/* ═══════════════════════════════════════════════════════════════
   Babyloon · «Vamos a abrir más» — la portada, en los 16 idiomas
   ───────────────────────────────────────────────────────────────
   61.60 · Decisión de Andrés (10), 8-oct-2026: «Las peticiones, solo
   en las ciudades que abren, y la web insiste en que vamos a abrir
   más; los servicios solo se piden en la app.»

   El servidor ya no crea una petición en un mercado que no abre
   (`_mercado_abre`: abierto, o con su fecha de apertura). La portada
   decía «abre pronto» y «Abrimos pronto» de CUALQUIER ciudad sin
   profesionales, también de las que no tienen fecha —Tokio, París,
   Los Ángeles—. Ahora distingue: «abre pronto» solo donde abre; en
   las demás, que todavía no hemos abierto y que vamos a abrir muchas
   más ciudades.

   · hs_no_abre · la nota del buscador del hero, tras «{c} en {ciudad} ·».
     Empieza en minúscula, como «abre pronto».
   · mv_no_abre · la línea de la ciudad en el Modo Viaje, en vez de
     «Abrimos pronto». Se inserta escapada: no lleva HTML.

   Un fichero aparte, y no dentro de i18n-index*.js, i18n-viaje.js e
   i18n-5-resto.js: son dos claves y así no se tocan seis
   diccionarios que cargan otras once páginas.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (!window.BBL || !BBL.extend) return;
  BBL.extend({
    es: { hs_no_abre:'todavía no hemos abierto aquí, pero vamos a abrir muchas más ciudades',
          mv_no_abre:'Todavía no hemos abierto aquí: vamos a abrir muchas más ciudades' },
    en: { hs_no_abre:'not open here yet, but we’ll open many more cities',
          mv_no_abre:'Not open here yet: we’ll open many more cities' },
    pt: { hs_no_abre:'ainda não abrimos aqui, mas vamos abrir muitas mais cidades',
          mv_no_abre:'Ainda não abrimos aqui: vamos abrir muitas mais cidades' },
    fr: { hs_no_abre:'pas encore ouvert ici, mais nous ouvrirons beaucoup d’autres villes',
          mv_no_abre:'Pas encore ouvert ici : nous ouvrirons beaucoup d’autres villes' },
    de: { hs_no_abre:'hier noch nicht geöffnet, aber wir eröffnen noch viele weitere Städte',
          mv_no_abre:'Hier noch nicht geöffnet: Wir eröffnen noch viele weitere Städte' },
    it: { hs_no_abre:'qui non abbiamo ancora aperto, ma apriremo in molte altre città',
          mv_no_abre:'Qui non abbiamo ancora aperto: apriremo in molte altre città' },
    nl: { hs_no_abre:'hier zijn we nog niet open, maar we openen nog in veel meer steden',
          mv_no_abre:'Hier nog niet open: we openen nog in veel meer steden' },
    pl: { hs_no_abre:'tu jeszcze nie działamy, ale otworzymy się w wielu kolejnych miastach',
          mv_no_abre:'Tu jeszcze nie działamy: otworzymy się w wielu kolejnych miastach' },
    el: { hs_no_abre:'δεν έχουμε ανοίξει ακόμη εδώ, αλλά θα ανοίξουμε σε πολλές ακόμη πόλεις',
          mv_no_abre:'Δεν έχουμε ανοίξει ακόμη εδώ: θα ανοίξουμε σε πολλές ακόμη πόλεις' },
    hu: { hs_no_abre:'itt még nem nyitottunk, de még sok városban nyitunk',
          mv_no_abre:'Itt még nem nyitottunk: még sok városban nyitunk' },
    ru: { hs_no_abre:'здесь мы ещё не открылись, но откроемся ещё во многих городах',
          mv_no_abre:'Здесь мы ещё не открылись: откроемся ещё во многих городах' },
    sv: { hs_no_abre:'inte öppet här än, men vi kommer att öppna i många fler städer',
          mv_no_abre:'Inte öppet här än: vi kommer att öppna i många fler städer' },
    ar: { hs_no_abre:'لم نفتح هنا بعد، لكننا سنفتح في مدن كثيرة أخرى',
          mv_no_abre:'لم نفتح هنا بعد: سنفتح في مدن كثيرة أخرى' },
    zh: { hs_no_abre:'这里尚未开业，但我们还会开设更多城市',
          mv_no_abre:'这里尚未开业：我们还会开设更多城市' },
    ja: { hs_no_abre:'ここはまだオープンしていませんが、これからさらに多くの都市でオープンします',
          mv_no_abre:'ここはまだオープンしていません。これからさらに多くの都市でオープンします' },
    ko: { hs_no_abre:'아직 이곳은 오픈 전이지만, 더 많은 도시에서 오픈할 예정이에요',
          mv_no_abre:'아직 이곳은 오픈 전이에요. 더 많은 도시에서 오픈할 예정이에요' }
  });
})();
