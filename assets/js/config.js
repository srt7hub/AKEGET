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
     district  — район / город
     place     — населённый пункт
     venue     — площадка (если пусто, в таблице будет «—»)
     ticketUrl — ссылка на мероприятие в QTICKETS,
                 например "https://<город>.qtickets.events/12345-..."  */
  concerts: [
    { date: "2026-11-20", district: "Дуванский район",       place: "Месягутово",        venue: "", ticketUrl: "" },
    { date: "2026-11-21", district: "Салаватский район",     place: "Малояз",            venue: "", ticketUrl: "" },
    { date: "2026-11-27", district: "Стерлибашевский район", place: "Стерлибашево",      venue: "", ticketUrl: "" },
    { date: "2026-11-28", district: "г. Салават",            place: "Салават",           venue: "", ticketUrl: "" },
    { date: "2026-12-11", district: "Бурзянский район",      place: "Старосубхангулово", venue: "", ticketUrl: "" },
    { date: "2026-12-12", district: "Белорецкий район",      place: "Белорецк",          venue: "", ticketUrl: "" },
    { date: "2026-12-13", district: "Учалинский район",      place: "Учалы",             venue: "", ticketUrl: "" },
    { date: "2027-01-03", district: "Баймакский район",      place: "Темясово",          venue: "", ticketUrl: "" },
    { date: "2027-01-04", district: "Баймакский район",      place: "Сайгафар",          venue: "", ticketUrl: "" },
    { date: "2027-01-05", district: "Абзелиловский район",   place: "Аскарово",          venue: "", ticketUrl: "" },
    { date: "2027-01-06", district: "Абзелиловский район",   place: "Халилово",          venue: "", ticketUrl: "" },
    { date: "2027-01-07", district: "Белорецкий район",      place: "Шигаево",           venue: "", ticketUrl: "" },
    { date: "2027-01-08", district: "Учалинский район",      place: "Уральск",           venue: "", ticketUrl: "" },
    { date: "2027-01-09", district: "Учалинский район",      place: "Ильчино",           venue: "", ticketUrl: "" }
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
