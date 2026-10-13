/* ═══════════════════════════════════════════════════════════════════════
   i18n-direccion.js · Babyloon · bloque 52.5

   POR QUÉ EXISTE
   `direccion.js` pedía tres frases al diccionario y ninguna de las tres
   estaba definida en ningún idioma:

       dir_sin_resultados   ← usada desde el bloque 24.1, nunca definida
       dir_buscando         ← nueva
       dir_no_disponible    ← nueva

   El respaldo de `t()` es la frase en español, así que una japonesa que
   escribía una calle que Photon no conoce leía «Sin resultados. Escribe
   la dirección a mano.» en español, dentro de una página que por lo demás
   está entera en japonés. Eso contradice la regla de la casa —«todo, todo
   en el idioma de quien mira»— y encima en el peor momento: cuando algo
   no ha funcionado.

   LAS DOS NUEVAS NO SON ADORNO
   Medido contra producción el 28-sep, la instancia pública de Photon que
   usamos tarda entre 2,5 y 4,2 segundos en contestar. Con los 300 ms de
   freno de `direccion.js`, quien escribe una calle espera hasta cuatro
   segundos y medio mirando un campo que no hace nada. Cuatro segundos sin
   una señal no se leen como «está buscando»: se leen como «esto está
   roto». Que es, literalmente, lo que nos dijo Andrés.

   Y si el buscador no contesta, antes se cerraba la lista y ya: el mismo
   silencio. Ahora lo dice.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (!window.BBL || !BBL.extend) return;

  BBL.extend({
    es: { dir_buscando:'Buscando direcciones…',
          dir_sin_resultados:'Sin resultados. Escribe la dirección a mano.',
          dir_no_disponible:'El buscador de direcciones no responde ahora mismo. Escribe la dirección a mano.' },
    en: { dir_buscando:'Looking up addresses…',
          dir_sin_resultados:'No matches. Type the address by hand.',
          dir_no_disponible:'The address lookup isn’t responding right now. Type the address by hand.' },
    pt: { dir_buscando:'A procurar endereços…',
          dir_sin_resultados:'Sem resultados. Escreva o endereço à mão.',
          dir_no_disponible:'A pesquisa de endereços não responde neste momento. Escreva o endereço à mão.' },
    fr: { dir_buscando:'Recherche d’adresses…',
          dir_sin_resultados:'Aucun résultat. Saisissez l’adresse à la main.',
          dir_no_disponible:'La recherche d’adresses ne répond pas pour le moment. Saisissez l’adresse à la main.' },
    de: { dir_buscando:'Adressen werden gesucht…',
          dir_sin_resultados:'Keine Treffer. Bitte Adresse manuell eingeben.',
          dir_no_disponible:'Die Adresssuche antwortet gerade nicht. Bitte Adresse manuell eingeben.' },
    it: { dir_buscando:'Ricerca indirizzi…',
          dir_sin_resultados:'Nessun risultato. Scrivi l’indirizzo a mano.',
          dir_no_disponible:'La ricerca degli indirizzi non risponde in questo momento. Scrivi l’indirizzo a mano.' },
    nl: { dir_buscando:'Adressen zoeken…',
          dir_sin_resultados:'Geen resultaten. Typ het adres handmatig.',
          dir_no_disponible:'De adreszoeker reageert nu niet. Typ het adres handmatig.' },
    pl: { dir_buscando:'Szukanie adresów…',
          dir_sin_resultados:'Brak wyników. Wpisz adres ręcznie.',
          dir_no_disponible:'Wyszukiwanie adresów w tej chwili nie odpowiada. Wpisz adres ręcznie.' },
    el: { dir_buscando:'Αναζήτηση διευθύνσεων…',
          dir_sin_resultados:'Κανένα αποτέλεσμα. Γράψτε τη διεύθυνση με το χέρι.',
          dir_no_disponible:'Η αναζήτηση διευθύνσεων δεν απαντά αυτή τη στιγμή. Γράψτε τη διεύθυνση με το χέρι.' },
    hu: { dir_buscando:'Címek keresése…',
          dir_sin_resultados:'Nincs találat. Írja be a címet kézzel.',
          dir_no_disponible:'A címkereső most nem válaszol. Írja be a címet kézzel.' },
    ru: { dir_buscando:'Поиск адресов…',
          dir_sin_resultados:'Ничего не найдено. Введите адрес вручную.',
          dir_no_disponible:'Поиск адресов сейчас не отвечает. Введите адрес вручную.' },
    ar: { dir_buscando:'جارٍ البحث عن العناوين…',
          dir_sin_resultados:'لا توجد نتائج. اكتب العنوان يدويًا.',
          dir_no_disponible:'خدمة البحث عن العناوين لا تستجيب الآن. اكتب العنوان يدويًا.' },
    zh: { dir_buscando:'正在查找地址…',
          dir_sin_resultados:'没有结果。请手动输入地址。',
          dir_no_disponible:'地址查询暂时没有响应。请手动输入地址。' },
    ja: { dir_buscando:'住所を検索しています…',
          dir_sin_resultados:'該当する住所がありません。手入力してください。',
          dir_no_disponible:'住所検索がただいま応答していません。手入力してください。' },
    ko: { dir_buscando:'주소를 찾고 있습니다…',
          dir_sin_resultados:'결과가 없습니다. 주소를 직접 입력해 주세요.',
          dir_no_disponible:'주소 검색이 지금 응답하지 않습니다. 주소를 직접 입력해 주세요.' },
    sv: { dir_buscando:'Söker adresser…',
          dir_sin_resultados:'Inga träffar. Skriv adressen för hand.',
          dir_no_disponible:'Adressökningen svarar inte just nu. Skriv adressen för hand.' },
  });
})();
