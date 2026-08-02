/* SlickFlo — scroll reveal, sticky header state, mobile nav.
   Everything degrades gracefully: with JS off, all content is visible. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- staggered scroll reveal (Stripe-style: fade up, once) ---- */
  var targets = document.querySelectorAll(".rv");
  if (reduced || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute("data-rv-delay") || "0", 10);
        setTimeout(function () { el.classList.add("in"); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
    /* Failsafe: if the observer never fires (odd viewports, embedded webviews),
       reveal anything still hidden rather than leaving the page blank. */
    setTimeout(function () {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add("in"); });
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
})();
