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

  /* ---- before/after compare ----
     The range drives two things: --x, the clip position both panels share, and
     --f, the fade on the Before text. Dimming Before as the handle travels is
     what moves the attention onto After rather than leaving two equally loud
     columns. Both panels carry their full text either way, so with JS off the
     control simply sits at 0 and the page shows Before in full, which is the
     state the brief asks it to load in. */
  Array.prototype.forEach.call(document.querySelectorAll(".cmp"), function (cmp) {
    var range = cmp.querySelector(".cmp-range");
    if (!range) return;
    var apply = function () {
      var x = +range.value;
      /* Set on .cmp rather than .cmp-stack: as of 2026-08-18 the label lives
         under the slider, which is a sibling of the stack, and both need the
         position. Custom properties inherit, so the stack still reads them.
         --p is the same value unitless, which is what lets the label track the
         range thumb: a thumb's centre travels one thumb-width short of the
         full track, so the offset cannot be expressed as a bare percentage. */
      cmp.style.setProperty("--x", x + "%");
      cmp.style.setProperty("--f", (1 - x / 100).toFixed(3));
      cmp.style.setProperty("--p", (x / 100).toFixed(4));
    };
    range.addEventListener("input", apply);
    apply();

    /* 2026-08-24: the client asked to be able to grab the After label itself
       and pull it right, not only the range thumb. The native input stays
       exactly as it is and keeps the keyboard, the focus ring and clicks on
       the track; this only adds a second pointer target that drives it.

       The maths is the same one .cmp-hint uses to sit under the thumb: a
       thumb's centre travels from half a thumb in to half a thumb short of the
       end, so the usable track is (width - THUMB) and the pointer has to be
       measured from (left + THUMB/2). Using a bare percentage of the width
       makes the label run ahead of the thumb at one end and behind it at the
       other. THUMB matches --tw in the stylesheet; they have to move together.

       Pointer capture is what keeps the drag alive when the pointer leaves the
       label, which it does immediately, since the label is much smaller than
       the distance being dragged. */
    var hint = cmp.querySelector(".cmp-hint");
    if (!hint || !window.PointerEvent) return;
    var THUMB = 18;
    var track = function (clientX) {
      var r = range.getBoundingClientRect();
      var span = r.width - THUMB;
      if (span <= 0) return;
      var pct = ((clientX - r.left - THUMB / 2) / span) * 100;
      range.value = Math.max(0, Math.min(100, pct));
      apply();
    };
    /* move/up are on window, not on the label. The pointer leaves the label
       almost immediately once a drag starts, and a listener on the label alone
       would stop tracking there. Pointer capture would also solve it, but it
       throws on some inputs and would take the drag with it, so it is set as a
       best effort and nothing depends on it. */
    var dragging = false;
    hint.addEventListener("pointerdown", function (e) {
      /* The label is decorative to assistive tech and the input is the real
         control, so never take focus off it here. */
      e.preventDefault();
      dragging = true;
      try { hint.setPointerCapture(e.pointerId); } catch (err) {}
      hint.classList.add("dragging");
      track(e.clientX);
    });
    window.addEventListener("pointermove", function (e) {
      if (dragging) track(e.clientX);
    });
    var end = function (e) {
      if (!dragging) return;
      dragging = false;
      try { hint.releasePointerCapture(e.pointerId); } catch (err) {}
      hint.classList.remove("dragging");
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  });

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

  /* ---- testimonial slider (client 2026-08-25) ----
     A vertical wheel: one card highlighted, its neighbours dimmed above and
     below. The track moves in whole steps of (card height + gap), which is
     why --tsi-h in the CSS has to match the real card height. Both are read
     back from the DOM here rather than duplicated as numbers in JS.

     Every card stays in the DOM and in the accessibility tree. This is
     decoration over a list, not a way of hiding six testimonials from a
     screen reader or from Google.

     WITH JS OFF none of this runs and the CSS shows the plain stack, which is
     why the `html.js` scope exists on those rules. */
  var slider = document.querySelector("[data-tslide]");
  if (slider) {
    var list = slider.querySelector(".tslide-list");
    var items = slice(slider.querySelectorAll(".tsi"));
    var quoteBox = document.querySelector("[data-tq]");
    var quotes = quoteBox ? slice(quoteBox.querySelectorAll(".tq-i")) : [];
    var wrapEl = slider.closest(".tsplit-r") || slider.parentNode;
    var prevBtn = document.querySelector("[data-t-prev]");
    var nextBtn = document.querySelector("[data-t-next]");
    var countEl = document.querySelector("[data-t-count]");
    var at = 0;
    var timer = null;
    var HOLD = 5200;

    /* --tsi-h is SET HERE, not trusted from the stylesheet.
       Every card has to be the same height or the track cannot move in whole
       steps, but that height depends on the longest quote at the current
       width, and the quotes get edited. Hard-coding it clipped four of seven
       cards the first time this shipped. So: let them size naturally, measure
       the tallest, and fix them all to that. The CSS value is only a starting
       guess for the moment before this runs. */
    var fit = function () {
      wrapEl.style.setProperty("--tsi-h", "auto");
      var max = 0;
      items.forEach(function (el) {
        var h = el.getBoundingClientRect().height;
        if (h > max) max = h;
      });
      if (max) wrapEl.style.setProperty("--tsi-h", Math.ceil(max) + "px");

      /* Same problem in the other column: the quotes are different lengths,
         so without a floor the left half jumps every time one swaps and the
         buttons move under the cursor. Reserve the tallest. Measured with
         every quote shown, then put back the way it was. */
      if (quoteBox && quotes.length) {
        var was = quotes.map(function (q) { return q.hidden; });
        quotes.forEach(function (q) { q.hidden = false; });
        quoteBox.style.minHeight = "0px";

        /* Centring the block is not the same as centring the quote. The block
           is the mark, the words and the "What we did" pill, and the reader
           looks only at the words, so a centred block still reads as
           misaligned. Shift each one so its WORDS sit on the block's centre
           line, which the CSS then centres on the card.

           MEASURED, not derived. This started as "half the pill", which was
           right until the quote mark moved inside the block and made the
           arithmetic wrong in the other direction. Taking the real distance
           between the two centres cannot go stale when the contents change
           again. Per quote, because pills wrap on some and not others; that
           causes no jump, since a taller block and a bigger shift cancel. */
        var sideBySide = getComputedStyle(quoteBox.parentNode).display === "grid";
        var maxShift = 0;
        quotes.forEach(function (q) { q.style.setProperty("--tq-shift", "0px"); });
        quotes.forEach(function (q) {
          var bq = q.querySelector("blockquote");
          var shift = 0;
          if (sideBySide && bq) {
            var qb = q.getBoundingClientRect(), tb = bq.getBoundingClientRect();
            shift = (qb.top + qb.height / 2) - (tb.top + tb.height / 2);
          }
          shift = Math.round(shift);
          q.style.setProperty("--tq-shift", shift + "px");
          if (Math.abs(shift) > maxShift) maxShift = Math.abs(shift);
        });

        var qmax = 0;
        quotes.forEach(function (q) {
          var h = q.getBoundingClientRect().height;
          if (h > qmax) qmax = h;
        });
        quotes.forEach(function (q, i) { q.hidden = was[i]; });
        /* Plus the shift: the nudge moves the pill down past the bottom of
           the box it was measured in, and without the extra it can reach the
           buttons underneath. */
        if (qmax) quoteBox.style.minHeight = Math.ceil(qmax + maxShift) + "px";
      }
    };

    var step = function () {
      if (items.length < 2) return 0;
      /* Measured, not computed from the CSS variable: if the two ever
         disagree the measurement is the one that matches what the user
         sees. */
      return items[1].getBoundingClientRect().top -
             items[0].getBoundingClientRect().top;
    };

    /* How many cards the window shows, read back from the rendered height
       rather than assumed. Three at desktop, one under 620px where three came
       to most of two phone screens. Keeping it a measurement means the
       breakpoint lives in the CSS alone. */
    var slots = function () {
      var s = step();
      if (!s) return 1;
      return Math.max(1, Math.round(slider.getBoundingClientRect().height / s));
    };

    var paint = function () {
      items.forEach(function (el, i) {
        el.classList.toggle("is-on", i === at);
        el.classList.toggle("is-prev", i === at - 1);
        el.classList.toggle("is-next", i === at + 1);
      });
      /* The quote lives in the other column and swaps with the card.
         `hidden` rather than a class, so the six that are not showing leave
         the accessibility tree as well as the layout: a screen reader should
         hear the one quote that is on screen, not all seven. Re-adding the
         node is what restarts the fade. */
      quotes.forEach(function (q, i) {
        if (i === at) {
          q.hidden = false;
          if (!reduced) {
            q.style.animation = "none";
            void q.offsetWidth;
            q.style.animation = "";
          }
        } else {
          q.hidden = true;
        }
      });
      /* Put the active card in the middle slot: offset by however many slots
         sit above it. One slot means no offset at all. */
      var lead = Math.floor((slots() - 1) / 2);
      list.style.transform = "translateY(" + (-(at - lead) * step()) + "px)";
      if (countEl) countEl.textContent = (at + 1) + " / " + items.length;
    };

    var go = function (i) {
      at = (i + items.length) % items.length;
      paint();
    };

    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    var start = function () {
      /* No auto-advance under prefers-reduced-motion. A carousel that moves
         on its own is exactly what that setting is asking us not to do; the
         buttons still work. */
      if (reduced || timer || items.length < 2) return;
      timer = setInterval(function () { go(at + 1); }, HOLD);
    };
    var bump = function (d) { stop(); go(at + d); start(); };

    if (prevBtn) prevBtn.addEventListener("click", function () { bump(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { bump(1); });

    /* Pause while someone is reading it or tabbing through it. Scoped to the
       whole split, not just the slider: the quote someone is actually reading
       is in the other column, and pausing only when the cursor is over the
       names would move the text out from under them. */
    var hoverEl = slider.closest(".tsplit") || wrapEl;
    ["mouseenter", "focusin"].forEach(function (ev) {
      hoverEl.addEventListener(ev, stop);
    });
    ["mouseleave", "focusout"].forEach(function (ev) {
      hoverEl.addEventListener(ev, start);
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    /* The step depends on the card height, which changes at the two
       breakpoints, so recompute on resize. */
    var rt = null;
    var remeasure = function () { fit(); paint(); };
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(remeasure, 120);
    });

    fit();
    paint();
    /* A webfont swapping in after this point rewraps the quotes and changes
       the tallest card, so measure again once the fonts are settled. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(remeasure);
    }
    start();
  }
})();
