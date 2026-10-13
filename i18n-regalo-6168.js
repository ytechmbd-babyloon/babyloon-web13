/* Babyloon Web · Tarjeta regalo · 61.68
   ------------------------------------------------------------------
   La tarjeta, en la moneda de quien la compra (y, si no se sabe dónde
   está, en dólares). Antes, euros para todo el mundo.
   · `gc_custom_m`: el importe personalizado con el símbolo de su moneda
     en el hueco `{moneda}`. No se redefine `gc_custom` («(€)»), porque
     los ficheros de italiano, neerlandés, polaco, griego y húngaro se
     cargan al elegir el idioma —después de éste— y volverían a poner el
     euro.
   · `gc_max`: el máximo, como ya decía `gc_min` el mínimo, con el
     importe en el hueco `{max}`.
   Todas las claves de aquí son nuevas: nadie más las define. */
BBL.extend({
 es:{gc_custom_m:'O importe personalizado ({moneda})', gc_max:'El importe máximo es {max}.'},
 en:{gc_custom_m:'Or custom amount ({moneda})', gc_max:'The maximum amount is {max}.'},
 pt:{gc_custom_m:'Ou valor personalizado ({moneda})', gc_max:'O valor máximo é {max}.'},
 fr:{gc_custom_m:'Ou montant personnalisé ({moneda})', gc_max:'Le montant maximum est de {max}.'},
 de:{gc_custom_m:'Oder eigener Betrag ({moneda})', gc_max:'Der Höchstbetrag beträgt {max}.'},
 it:{gc_custom_m:'Oppure importo libero ({moneda})', gc_max:'L\'importo massimo è {max}.'},
 nl:{gc_custom_m:'Of een vrij bedrag ({moneda})', gc_max:'Het maximumbedrag is {max}.'},
 pl:{gc_custom_m:'Albo dowolna kwota ({moneda})', gc_max:'Maksymalna kwota to {max}.'},
 el:{gc_custom_m:'Ή ελεύθερο ποσό ({moneda})', gc_max:'Το μέγιστο ποσό είναι {max}.'},
 hu:{gc_custom_m:'Vagy szabad összeg ({moneda})', gc_max:'A legnagyobb összeg {max}.'},
 ru:{gc_custom_m:'Или своя сумма ({moneda})', gc_max:'Максимальная сумма — {max}.'},
 ar:{gc_custom_m:'أو مبلغ من اختيارك ({moneda})', gc_max:'الحد الأقصى للمبلغ هو {max}.'},
 zh:{gc_custom_m:'或自定义金额（{moneda}）', gc_max:'最高金额为 {max}。'},
 ja:{gc_custom_m:'または金額を指定（{moneda}）', gc_max:'最高金額は {max} です。'},
 ko:{gc_custom_m:'또는 직접 입력 ({moneda})', gc_max:'최대 금액은 {max}입니다.'},
 sv:{gc_custom_m:'Eller eget belopp ({moneda})', gc_max:'Högsta belopp är {max}.'}
});
