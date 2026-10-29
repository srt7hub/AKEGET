/* =====================================================================
   AKYEGET — настройки сайта
   ---------------------------------------------------------------------
   Здесь редактируются концерты, ссылки на билеты, фото, соцсети,
   контакты и музыка. Пустая строка "" = информации пока нет:
   на сайте покажется «скоро».
   ===================================================================== */

window.AKYEGET = {
  /* ---------- Музыка ----------
     Включается при открытии сайта (если браузер запрещает автозапуск —
     с первого клика/касания по странице). */
  music: {
    src: "assets/audio/akyeget-bashkort-atly-aryslan.mp3",
    title: "Башкорт атлы арыслан",
    volume: 0.6
  },

  /* ---------- Общая ссылка на билеты ----------
     Например, страница всех мероприятий в QTICKETS. Используется для концертов,
     у которых нет своей ticketUrl. Если пусто и своей ссылки нет —
     по кнопке «Купить билет» откроется окно «продажа скоро откроется». */
  ticketsUrl: "",

  /* ---------- Концерты ----------
     date      — "ГГГГ-ММ-ДД"
     time      — начало концерта
     district  — район / город
     place     — населённый пункт
     venue     — площадка (если пусто, в таблице показывается время начала)
     qtId      — номер мероприятия в QTICKETS: по нему кнопка «Купить билет»
                 открывает покупку (https://qtickets.ru/event/<номер>)
     ticketUrl — своя ссылка на билеты вместо QTICKETS (обычно пусто)  */
  concerts: [
    { date: "2026-11-20", time: "19:00", district: "Дуванский район",        place: "Месягутово",          venue: "", qtId: 270367, ticketUrl: "" },
    { date: "2026-11-21", time: "19:00", district: "Салаватский район",      place: "Малояз",              venue: "", qtId: 270369, ticketUrl: "" },
    { date: "2026-11-22", time: "19:00", district: "Мечетлинский район",     place: "Большеустьикинское",  venue: "", qtId: 270371, ticketUrl: "" },
    { date: "2026-11-27", time: "19:00", district: "Стерлибашевский район",  place: "Стерлибашево",        venue: "", qtId: 270373, ticketUrl: "" },
    { date: "2026-11-28", time: "19:00", district: "г. Салават",             place: "Салават",             venue: "", qtId: 270374, ticketUrl: "" },
    { date: "2026-12-04", time: "19:00", district: "г. Архангельск",         place: "Архангельск",         venue: "", qtId: 270375, ticketUrl: "" },
    { date: "2026-12-05", time: "19:00", district: "Кырмыскалинский район",  place: "Кырмыскалы",          venue: "", qtId: 270377, ticketUrl: "" },
    { date: "2026-12-11", time: "19:00", district: "Бурзянский район",       place: "Старосубхонгулово",   venue: "", qtId: 270379, ticketUrl: "" },
    { date: "2026-12-12", time: "19:00", district: "г. Белорецк",            place: "Белорецк",            venue: "", qtId: 270380, ticketUrl: "" },
    { date: "2026-12-13", time: "19:00", district: "г. Учалы",               place: "Учалы",               venue: "", qtId: 270381, ticketUrl: "" },
    { date: "2027-01-03", time: "19:00", district: "Баймакский район",       place: "Темясово",            venue: "", qtId: 270382, ticketUrl: "" },
    { date: "2027-01-04", time: "19:00", district: "Баймакский район",       place: "Сайгафар",            venue: "", qtId: 270384, ticketUrl: "" },
    { date: "2027-01-05", time: "19:00", district: "Абзелиловский район",    place: "Аскарово",            venue: "", qtId: 270385, ticketUrl: "" },
    { date: "2027-01-06", time: "19:00", district: "Абзелиловский район",    place: "Халилово",            venue: "", qtId: 270386, ticketUrl: "" },
    { date: "2027-01-07", time: "19:00", district: "Белорецкий район",       place: "Шигаево",             venue: "", qtId: 270387, ticketUrl: "" },
    { date: "2027-01-08", time: "19:00", district: "Учалинский район",       place: "Уральск",             venue: "", qtId: 270388, ticketUrl: "" },
    { date: "2027-01-09", time: "19:00", district: "Учалинский район",       place: "Ильчино",             venue: "", qtId: 270389, ticketUrl: "" }
  ],

  /* ---------- Фото для карусели ---------- */
  photos: [
    { src: "assets/img/g-crowd",       w: 1800, h: 1012, alt: "AKYEGET на сцене" },
    { src: "assets/img/g-white-2",     w: 1200, h: 1800, alt: "AKYEGET, портрет" },
    { src: "assets/img/g-bw-mic",      w: 1800, h: 1200, alt: "AKYEGET с микрофоном" },
    { src: "assets/img/g-stage-arm",   w: 1012, h: 1800, alt: "AKYEGET на концерте" },
    { src: "assets/img/g-red",         w: 1800, h: 1440, alt: "AKYEGET, портрет" },
    { src: "assets/img/g-stage-light", w: 1800, h: 1200, alt: "AKYEGET в свете прожекторов" },
    { src: "assets/img/g-white-1",     w: 1800, h: 1200, alt: "AKYEGET, портрет" },
    { src: "assets/img/g-live",        w: 1012, h: 1800, alt: "AKYEGET на концерте" },
    { src: "assets/img/g-stage-wide",  w: 1800, h: 1200, alt: "AKYEGET на сцене" },
    { src: "assets/img/g-white-3",     w: 1800, h: 1730, alt: "AKYEGET, портрет" }
  ],

  /* ---------- Соцсети ---------- */
  socials: [
    { label: "Яндекс Музыка", url: "https://music.yandex.ru/artist/8927489" },
    { label: "VK",            url: "https://vk.ru/akyeget_group" },
    { label: "YouTube",       url: "https://www.youtube.com/@AKYEGET" },
    { label: "Instagram",     url: "https://www.instagram.com/akyeget" }
  ],

  /* ---------- Контакты ----------
     Пустые контакты на сайте не показываются. */
  contacts: [
    { label: "Концертный директор — Ганиев Фадис · по любым вопросам", value: "+7 937 356-80-59", href: "tel:+79373568059" }
  ]
};
