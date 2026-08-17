/* SlickFlo — scroll reveal, sticky header state, mobile nav.
   Everything degrades gracefully: with JS off, all content is visible. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- staggered scroll reveal (Stripe-style: fade up, once) ---- */
  var slice = function (list) { return Array.prototype.slice.call(list); };
  var reveal = function (el) {
    var delay = parseInt(el.getAttribute("data-rv-delay") || "0", 10);
    if (delay) setTimeout(function () { el.classList.add("in"); }, delay);
    else el.classList.add("in");
  };

  var all = slice(document.querySelectorAll(".rv"));
  /* A [data-rv-group] container is one trigger for everything inside it, so a
     row set moves as a single gesture instead of each card waiting to scroll
     in on its own (Business Outcomes, client 2026-08-17). Its children are
     taken out of the per-element list — observed both ways, the top row would
     fire on its own entry and the "at the same time" would be luck. */
  var groups = slice(document.querySelectorAll("[data-rv-group]"));
  var grouped = [];
  groups.forEach(function (g) { grouped = grouped.concat(slice(g.querySelectorAll(".rv"))); });
  var singles = all.filter(function (el) { return grouped.indexOf(el) === -1; });

  if (reduced || !("IntersectionObserver" in window)) {
    all.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    singles.forEach(function (el) { io.observe(el); });

    /* A group fires later than a lone element, and deliberately. At the shared
       -8% / 0.08 the group tripped while it was still a sliver at the bottom of
       the screen, roughly a viewport before the reader was looking at it, so
       the movement was over by the time they got there — it read as "so fast
       not even visible" (client, 2026-08-17) when the speed was only half of
       it. -22% raises the trigger line well up the viewport and 0.2 waits for a
       fifth of the group to clear it, so the animation runs while it is being
       watched. */
    var gio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        slice(entry.target.querySelectorAll(".rv")).forEach(reveal);
        gio.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -22% 0px", threshold: 0.2 });
    groups.forEach(function (g) { gio.observe(g); });

    /* Failsafe: if neither observer fires (odd viewports, embedded webviews),
       reveal everything rather than leaving the page blank.

       Guarded on nothing having been revealed at all, which is the actual
       failure being insured against. Unconditional, it revealed every .rv on
       the page 1.6s after load — so anything below the first screen was
       already shown by the time the reader scrolled to it and its reveal
       never ran. Every page opens with .rv content in view, so a working
       observer always trips this check within a frame. */
    setTimeout(function () {
      var working = all.some(function (el) { return el.classList.contains("in"); });
      if (!working) all.forEach(function (el) { el.classList.add("in"); });
    }, 1600);
  }

  /* ---- header shadow once scrolled ---- */
  var top = document.querySelector(".top");
  if (top) {
    var onScroll = function () {
      top.classList.toggle("stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- mobile nav ---- */
  var burger = document.querySelector(".burger");
  var mnav = document.querySelector(".mnav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = mnav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- header menu button (About / Careers / Blog / Contact Us) ----
     Click-toggled, per the brief. Closes on outside click and on Escape,
     because a panel you can only shut by hitting the same small button again
     is the usual complaint about this pattern. */
  var mbtn = document.querySelector(".mbtn");
  var hmenu = document.querySelector(".hmenu");
  if (mbtn && hmenu) {
    var setMenu = function (open) {
      hmenu.classList.toggle("open", open);
      mbtn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    mbtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenu(!hmenu.classList.contains("open"));
    });
    document.addEventListener("click", function (e) {
      if (hmenu.classList.contains("open") && !hmenu.contains(e.target)) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && hmenu.classList.contains("open")) {
        setMenu(false);
        mbtn.focus();
      }
    });
  }
})();
