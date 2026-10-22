(function () {
  "use strict";

  var CFG = window.AKYEGET;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  document.documentElement.classList.add("js");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function parseDate(iso) {
    var p = iso.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ddmm(d) { return pad(d.getDate()) + "." + pad(d.getMonth() + 1); }

  var concerts = CFG.concerts
    .slice()
    .sort(function (a, b) { return a.date < b.date ? -1 : 1; })
    .map(function (c) { return { c: c, d: parseDate(c.date) }; });

  /* ---------------- Ticker ---------------- */
  function renderTicker() {
    var track = document.getElementById("ticker");
    var items = ['<span class="ticker__item ticker__item--accent">AKYEGET × IRDAN — тур 2026—2027</span>'].concat(
      concerts.map(function (it) {
        return '<span class="ticker__item"><b>' + ddmm(it.d) + "</b> " + esc(it.c.place) + "</span>";
      })
    ).join('<span class="ticker__sep" aria-hidden="true">/</span>') + '<span class="ticker__sep" aria-hidden="true">/</span>';
    // две копии — для бесшовной прокрутки
    track.innerHTML = '<div class="ticker__group">' + items + '</div><div class="ticker__group" aria-hidden="true">' + items + "</div>";
    var w = track.firstChild.offsetWidth;
    track.style.setProperty("--dur", Math.max(20, w / 70) + "s");
  }

  /* ---------------- Schedule ---------------- */
  function renderSchedule() {
    var groups = [];
    concerts.forEach(function (it) {
      var key = it.d.getFullYear() + "-" + it.d.getMonth();
      var g = groups[groups.length - 1];
      if (!g || g.key !== key) groups.push(g = { key: key, month: it.d.getMonth(), year: it.d.getFullYear(), items: [] });
      g.items.push(it);
    });

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var i = 0;

    document.getElementById("schedule").innerHTML = groups.map(function (g) {
      var rows = g.items.map(function (it) {
        var c = it.c;
        var past = it.d < today;
        var btn;
        var url = c.ticketUrl || CFG.ticketsUrl;
        var aria = ' aria-label="Купить билет — ' + esc(c.place) + ", " + ddmm(it.d) + '"';
        if (past) {
          btn = '<span class="gig__btn is-past">Прошёл</span>';
        } else if (url) {
          btn = '<a class="gig__btn" href="' + esc(url) + '" target="_blank" rel="noopener"' + aria + ">Купить билет</a>";
        } else {
          // ссылки ещё нет — по клику показываем окно «продажа скоро откроется»
          btn = '<button type="button" class="gig__btn" data-notice="' + concerts.indexOf(it) + '"' + aria + ">Купить билет</button>";
        }
        return (
          '<li class="gig' + (past ? " is-past" : "") + '" style="--i:' + i++ + '">' +
          '<time class="gig__date" datetime="' + esc(c.date) + '">' + ddmm(it.d) + "</time>" +
          '<span class="gig__district">' + esc(c.district) + "</span>" +
          '<span class="gig__place">' + esc(c.place) + "</span>" +
          '<span class="gig__venue' + (c.venue ? " has-venue" : "") + '">' + (c.venue ? esc(c.venue) : "—") + "</span>" +
          btn +
          "</li>"
        );
      }).join("");

      return (
        '<div class="month reveal-group">' +
        '<div class="month__label"><span>' + MONTHS[g.month] + '</span><span class="month__year">' + g.year + "</span></div>" +
        '<ul class="month__list">' + rows + "</ul>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------------- Photo reel ---------------- */
  function renderReel() {
    var reel = document.getElementById("reel");
    var photos = CFG.photos;
    var half = Math.ceil(photos.length / 2);
    var rows = [
      photos.map(function (p, i) { return i; }),
      photos.map(function (p, i) { return (i + half) % photos.length; }).reverse()
    ];

    function shot(idx, hidden) {
      var p = photos[idx];
      return (
        '<div class="shot"' + (hidden ? ' aria-hidden="true"' : "") + ">" +
        '<img src="' + esc(p.src) + '-sm.webp" srcset="' + esc(p.src) + "-sm.webp 800w, " + esc(p.src) + '.webp 1800w" sizes="(max-width: 900px) 420px, 640px"' +
        ' width="' + p.w + '" height="' + p.h + '" alt="' + (hidden ? "" : esc(p.alt)) + '" loading="lazy" decoding="async" style="aspect-ratio:' + p.w + "/" + p.h + '">' +
        "</div>"
      );
    }

    reel.innerHTML = rows.map(function (order, r) {
      var set = order.map(function (idx) { return shot(idx, false); }).join("");
      var copy = order.map(function (idx) { return shot(idx, true); }).join("");
      return '<div class="reel__row reel__row--' + (r ? "right" : "left") + '"><div class="reel__track">' + set + copy + "</div></div>";
    }).join("");

    function setSpeed() {
      reel.querySelectorAll(".reel__track").forEach(function (t) {
        t.style.setProperty("--dur", Math.max(30, t.scrollWidth / 2 / 45) + "s");
      });
    }
    setSpeed();
    reel.querySelectorAll("img").forEach(function (img) { img.addEventListener("load", setSpeed, { once: true }); });
  }

  /* ---------------- Socials & contacts ---------------- */
  function renderContacts() {
    document.getElementById("socials").innerHTML = CFG.socials.map(function (s) {
      return s.url
        ? '<li><a class="social" href="' + esc(s.url) + '" target="_blank" rel="noopener"><span>' + esc(s.label) + '</span><span class="social__go">Перейти</span></a></li>'
        : '<li><span class="social is-soon"><span>' + esc(s.label) + '</span><span class="social__go">Скоро</span></span></li>';
    }).join("");

    document.getElementById("contact-list").innerHTML = CFG.contacts
      .filter(function (c) { return c.value; })
      .map(function (c) {
        var val = c.href ? '<a href="' + esc(c.href) + '">' + esc(c.value) + "</a>" : "<p>" + esc(c.value) + "</p>";
        return "<li><span>" + esc(c.label) + "</span>" + val + "</li>";
      }).join("");
  }

  /* ---------------- Music ---------------- */
  function initMusic() {
    var audio = document.getElementById("music");
    var btn = document.getElementById("sound");
    var label = btn.querySelector(".sound__label");
    var KEY = "akyeget-sound";
    var target = CFG.music.volume == null ? 0.6 : CFG.music.volume;
    var fadeTimer = null;
    var resumeOnShow = false;

    audio.src = CFG.music.src;
    btn.title = "AKYEGET — " + CFG.music.title;

    function pref() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
    function savePref(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

    function fadeTo(v, done) {
      clearInterval(fadeTimer);
      fadeTimer = setInterval(function () {
        var next = audio.volume + (v > audio.volume ? 0.04 : -0.06);
        if ((v > audio.volume && next >= v) || (v <= audio.volume && next <= v)) {
          audio.volume = Math.max(0, Math.min(1, v));
          clearInterval(fadeTimer);
          if (done) done();
        } else {
          audio.volume = Math.max(0, Math.min(1, next));
        }
      }, 60);
    }
    function render() {
      var on = !audio.paused;
      btn.classList.toggle("is-playing", on);
      btn.setAttribute("aria-pressed", String(on));
      label.textContent = on ? "Звук вкл" : "Звук выкл";
    }
    function play() {
      audio.volume = 0;
      var p = audio.play();
      if (p && p.then) {
        return p.then(function () { fadeTo(target); render(); return true; }, function () { render(); return false; });
      }
      fadeTo(target);
      render();
      return Promise.resolve(true);
    }
    function pause() {
      fadeTo(0, function () { audio.pause(); render(); });
    }

    btn.addEventListener("click", function () {
      if (audio.paused) { savePref("on"); play(); }
      else { savePref("off"); pause(); render(); btn.classList.remove("is-playing"); label.textContent = "Звук выкл"; }
    });
    audio.addEventListener("play", render);
    audio.addEventListener("pause", render);

    // Если браузер не дал включить звук сразу — включаем с первого действия на странице
    function armFirstGesture() {
      var events = ["pointerdown", "keydown", "touchstart"];
      function onGesture(e) {
        if (btn.contains(e.target)) return cleanup();
        cleanup();
        if (pref() !== "off" && audio.paused) play();
      }
      function cleanup() { events.forEach(function (ev) { removeEventListener(ev, onGesture, true); }); }
      events.forEach(function (ev) { addEventListener(ev, onGesture, true); });
    }

    // На телефоне при сворачивании вкладки — пауза, при возврате — продолжаем
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        resumeOnShow = !audio.paused;
        if (resumeOnShow) audio.pause();
      } else if (resumeOnShow) {
        audio.play().catch(function () {});
      }
    });

    render();
    if (pref() !== "off") {
      play().then(function (ok) { if (!ok) armFirstGesture(); });
    }
  }

  /* ---------------- Reveal on scroll ---------------- */
  var io = "IntersectionObserver" in window && !reduceMotion
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    : null;

  function observeReveals() {
    document.querySelectorAll(".reveal:not(.is-in), .reveal-group:not(.is-in)").forEach(function (el) {
      if (io) io.observe(el);
      else el.classList.add("is-in");
    });
  }

  /* ---------------- Header / nav ---------------- */
  function initHeader() {
    var header = document.getElementById("header");
    var burger = document.getElementById("burger");
    var nav = document.getElementById("nav");

    function onScroll() { header.classList.toggle("is-scrolled", scrollY > 40); }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function setMenu(open) {
      burger.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    }
    burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

    // подсветка активного пункта меню
    if ("IntersectionObserver" in window) {
      var links = {};
      nav.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var a = links[e.target.id];
          if (a) a.classList.toggle("is-active", e.isIntersecting);
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(links).forEach(function (id) {
        var s = document.getElementById(id);
        if (s) spy.observe(s);
      });
    }
  }

  /* ---------------- Hero parallax ---------------- */
  function initParallax() {
    if (reduceMotion) return;
    var logo = document.querySelector(".hero__logo");
    var artist = document.querySelector(".hero__artist img");
    var smoke = document.querySelector(".hero .smoke");
    var hero = document.querySelector(".hero");
    var desktop = matchMedia("(min-width: 901px)");
    var mx = 0, my = 0, ticking = false;

    function update() {
      ticking = false;
      if (!desktop.matches) {
        logo.style.transform = artist.style.transform = smoke.style.transform = "";
        return;
      }
      var y = Math.min(scrollY, hero.offsetHeight);
      logo.style.transform = "translate3d(" + mx * -10 + "px," + (y * 0.25 + my * -6) + "px,0)";
      artist.style.transform = "translate3d(" + mx * 8 + "px," + y * 0.08 + "px,0)";
      smoke.style.transform = "translate3d(" + mx * -18 + "px," + (y * 0.15 + my * -12) + "px,0)";
    }
    function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    addEventListener("scroll", request, { passive: true });
    if (matchMedia("(pointer: fine)").matches) {
      hero.addEventListener("pointermove", function (e) {
        mx = e.clientX / innerWidth - 0.5;
        my = e.clientY / innerHeight - 0.5;
        request();
      });
    }
  }

  /* ---------------- Ticket notice ---------------- */
  function initNotice() {
    var box = document.getElementById("notice");
    var lastFocus = null;

    function open(it) {
      lastFocus = document.activeElement;
      document.getElementById("notice-date").textContent = ddmm(it.d) + "." + it.d.getFullYear() + " · " + it.c.district;
      document.getElementById("notice-title").textContent = it.c.place;
      box.hidden = false;
      document.body.classList.add("menu-open");
      setTimeout(function () { box.classList.add("is-open"); }, 10);
      box.querySelector(".notice__close").focus();
    }
    function close() {
      if (box.hidden) return;
      box.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      setTimeout(function () { box.hidden = true; }, 300);
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }

    document.getElementById("schedule").addEventListener("click", function (e) {
      var b = e.target.closest("[data-notice]");
      if (b) open(concerts[Number(b.dataset.notice)]);
    });
    box.querySelector(".notice__close").addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------------- Init ---------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
  renderTicker();
  renderSchedule();
  renderReel();
  renderContacts();
  initHeader();
  initNotice();
  initParallax();
  initMusic();
  observeReveals();

  // шрифты меняют ширину бегущей строки — пересчитываем скорость
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderTicker);

  var heroImg = document.querySelector(".hero__artist img");
  function loaded() { setTimeout(function () { document.body.classList.add("is-loaded"); }, 30); }
  if (heroImg.complete) loaded();
  else { heroImg.addEventListener("load", loaded); heroImg.addEventListener("error", loaded); setTimeout(loaded, 2500); }
})();
