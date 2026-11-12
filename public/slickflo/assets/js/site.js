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
/* ---------------------------------------------- capabilities slider ---
   A drifting card row with arrows and click-drag. Client 2026-11-12.

   The track scrolls natively, so everything here is enhancement: without
   this file the row still moves by touch, trackpad, scrollbar and keyboard,
   and the arrows stay hidden because the stylesheet only shows them under
   html.js.

   Pointer Events, not mouse plus touch: one code path covers mouse, pen and
   touch, and setPointerCapture keeps a drag alive when the cursor leaves the
   track mid-swipe. Touch scrolling is left to the browser, which does it
   better than any script, so only mouse and pen are dragged by hand. */
(function () {
  var slider = document.querySelector(".cslide");
  if (!slider) return;
  var track = slider.querySelector(".cslide-track");
  var btns = slider.querySelectorAll(".cslide-btn");
  if (!track || !btns.length) return;

  /* Trusted By runs at 39.9px/s, measured off its own keyframes, and 40 was
     the first answer to "move it like the logos do". He read it as too slow,
     and he is right: a marquee is judged by how often something NEW arrives,
     not by pixels. A logo and its gap are 128px, so one goes by every 3.2s;
     a card and its gap are 374px, so at the same 40px/s a card takes 9.4s.
     Matching the logos' rate exactly would mean 117px/s, which for objects
     this size is a conveyor belt. 90 is the compromise: a card every 4.2s,
     a bit over twice what it was. */
  var SPEED = 90;
  var reduce = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };
  var loop = false, raf = null, timer = null, last = 0;
  var hovering = false, onscreen = false;
  var down = false, startX = 0, startLeft = 0, moved = 0;

  /* One card plus one gap, measured rather than assumed: the card width
     changes at three breakpoints and the gap at one. */
  function step() {
    var card = track.querySelector(".card");
    if (!card) return track.clientWidth;
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  /* How far the row travels before it is back where it started: the width
     of one set of cards, the duplicates not counted. */
  function setWidth() {
    return track.querySelectorAll(".card:not([aria-hidden])").length * step();
  }

  /* Looping, the row has no ends, so neither arrow is ever spent. Checked
     first because the drift writes scrollLeft sixty times a second and
     every write fires this: the branch below reads the stylesheet, which is
     not something to do per frame. */
  function paint() {
    if (loop) {
      btns[0].disabled = false;
      btns[1].disabled = false;
      return;
    }
    /* Standing still, the ends are real. The leading gutter is a flex
       spacer inside the scroller rather than padding on it, so home is a
       plain 0; the padding is still read because that is a tuning value,
       and the day it stops being zero this should still be right. */
    var max = track.scrollWidth - track.clientWidth;
    var pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    btns[0].disabled = track.scrollLeft <= pad + 1;
    btns[1].disabled = track.scrollLeft >= max - 1;
  }

  /* --------------------------------------------------------- the drift ---
     A marquee needs its content twice over, and the cards are duplicated in
     the markup for it: aria-hidden, no id of their own, out of the tab
     order. Once the row has travelled exactly one set's width it jumps back
     by that width, and because the duplicate is pixel for pixel the
     original there is nothing to see.

     This moves by writing scrollLeft rather than by animating a transform
     the way Trusted By does, because the row is still a real scroller that
     can be dragged, swiped and nudged. The price is that this code then
     owns every kind of motion the row has, and two CSS properties have to
     come off while it runs (`.rolling`): `scroll-behavior:smooth` turns
     each frame's write into an animation of its own, so the row crawls
     instead of moving, and mandatory snapping hauls it back to the card
     edge it is trying to leave. */
  /* Keyboard focus inside the row holds it still, so that somebody tabbing
     through the cards is not reading a moving target. CLICKING a button
     also focuses it, though, and that is what froze the row for good after
     an arrow press: the button kept the focus, the guard below kept saying
     no, and nothing short of a reload ever gave it back. Moving the mouse
     away did not help, because focus does not follow the mouse.

     `:focus-visible` is the distinction the browser already draws: it is
     set when focus arrives by keyboard and not when it arrives by click,
     which is exactly the line this wants.

     The fallback cannot be the old test, because the old test IS the bug:
     a browser too old for the selector would go on freezing. So it watches
     what happened immediately before focus moved instead, which is the
     same question asked by hand. Capture phase, so a handler that stops
     propagation cannot hide it. */
  var viaKey = false;
  document.addEventListener("keydown", function () { viaKey = true; }, true);
  document.addEventListener("pointerdown", function () { viaKey = false; }, true);
  document.addEventListener("mousedown", function () { viaKey = false; }, true);

  function keyboardInside() {
    try { return !!slider.querySelector(":focus-visible"); }
    catch (e) { return viaKey && slider.contains(document.activeElement); }
  }

  function canRun() {
    return loop && onscreen && !document.hidden && !hovering && !down &&
      !keyboardInside();
  }

  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    if (timer) { clearTimeout(timer); timer = null; }
    last = 0;
  }

  function run() {
    stop();
    if (!canRun()) return;
    raf = requestAnimationFrame(function frame(now) {
      if (!last) last = now;
      /* Capped, so a tab that has been in the background for a minute
         picks up where it left off instead of lurching. */
      var dt = Math.min(now - last, 50) / 1000;
      last = now;
      var w = setWidth();
      var x = track.scrollLeft + SPEED * dt;
      track.scrollLeft = x >= w ? x - w : x;
      if (canRun()) { raf = requestAnimationFrame(frame); return; }
      raf = null;
      last = 0;
    });
  }

  function play(delay) {
    stop();
    if (canRun()) timer = setTimeout(run, delay);
  }

  /* An arrow nudge, eased in and out over half a second. Going left from
     within one card of the start, the row is first shifted a whole set to
     the right, which is invisible and leaves it somewhere to go. */
  function nudge(d) {
    stop();
    var pitch = step(), from = track.scrollLeft, to = from + d * pitch;
    if (to < 0) { var w = setWidth(); from += w; to += w; track.scrollLeft = from; }
    var t0 = 0;
    raf = requestAnimationFrame(function frame(now) {
      if (!t0) t0 = now;
      var p = Math.min(1, (now - t0) / 520);
      var e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      track.scrollLeft = from + (to - from) * e;
      if (p < 1) { raf = requestAnimationFrame(frame); return; }
      raf = null;
      play(900);
    });
  }

  for (var i = 0; i < btns.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        var d = parseInt(btn.getAttribute("data-dir"), 10) || 1;
        if (loop) { nudge(d); return; }
        track.scrollBy({ left: d * step(), behavior: "smooth" });
      });
    })(btns[i]);
  }

  track.addEventListener("scroll", paint, { passive: true });
  window.addEventListener("resize", paint);

  track.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "touch") return;      /* let the browser do touch */
    down = true; moved = 0;
    stop();
    startX = e.clientX;
    startLeft = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener("pointermove", function (e) {
    if (!down) return;
    var dx = e.clientX - startX;
    if (!moved && Math.abs(dx) < 4) return;     /* a click is not a drag */
    moved = 1;
    /* Added once the drag is real, so a plain click never disables the
       links underneath it. */
    track.classList.add("dragging");
    var want = startLeft - dx;
    /* Dragged off either end of the set, the row comes round again rather
       than hitting a wall. startLeft moves with it, so the card stays under
       the cursor. */
    if (loop) {
      var w = setWidth();
      while (want < 0) { want += w; startLeft += w; }
      while (want >= w) { want -= w; startLeft -= w; }
    }
    track.scrollLeft = want;
  });

  function end(e) {
    if (!down) return;
    down = false;
    track.classList.remove("dragging");
    if (track.hasPointerCapture && track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
    paint();
    play(900);
  }
  track.addEventListener("pointerup", end);
  track.addEventListener("pointercancel", end);

  /* A drag that ends on top of a card must not also follow its link. */
  track.addEventListener("click", function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = 0; }
  }, true);

  /* Anything the reader does wins, but only what the reader actually DID.
     Both of these were too quick to take offence, which is what he saw as
     the row being over-sensitive:

     `mouseenter` fires when the row arrives under a cursor that has not
     moved, which is exactly what happens every time somebody scrolls down
     the page: the section slides up under the pointer and freezes on
     arrival, so it looks broken before it has moved at all. A hover now
     has to involve the pointer MOVING inside the row.

     A wheel over the row is almost always aimed at the page, not at this.
     Only a sideways wheel, from a trackpad swipe or a tilt wheel, is
     addressed to a horizontal scroller, so only that counts. */
  /* On the TRACK, not on the whole slider. The slider also contains the
     band under the cards that holds the arrows, the full width of the page,
     and a cursor crossing that band was stopping the row: "people hover
     cursors fast normally and it should not disrupt movement unless the
     cursor is on top of a card or that moving area". The track is exactly
     that moving area. */
  track.addEventListener("mousemove", function () {
    if (!hovering) { hovering = true; stop(); }
  });
  track.addEventListener("mouseleave", function () { hovering = false; play(400); });
  /* Both go through play(), which asks canRun() rather than assuming: a
     keyboard focus stops it, a click's focus does not. */
  slider.addEventListener("focusin", function () { play(400); });
  slider.addEventListener("focusout", function () { play(400); });
  track.addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) play(1500);
  }, { passive: true });
  track.addEventListener("touchstart", function () { stop(); }, { passive: true });
  track.addEventListener("touchend", function () { play(1500); }, { passive: true });

  function setLoop() {
    loop = !reduce.matches && !!track.querySelector(".card[aria-hidden]");
    if (loop) track.classList.add("rolling");
    else track.classList.remove("rolling");
    paint();
    /* Just long enough for the cards to finish revealing before the row
       starts moving under them. */
    play(700);
  }

  if (window.IntersectionObserver) {
    new IntersectionObserver(function (entries) {
      onscreen = entries[0].isIntersecting;
      play(onscreen ? 700 : 0);
    }, { threshold: .2 }).observe(slider);
  } else {
    onscreen = true;
  }
  document.addEventListener("visibilitychange", function () { play(1200); });
  if (reduce.addEventListener) reduce.addEventListener("change", setLoop);

  setLoop();
})();


/* ------------------------------------------------- business outcomes ---
   Four outcomes in one pinned frame, dragged upward by the scroll. The
   stylesheet does all the positioning; this works out one number.

   `--f` is where the scroll has got to, counted in outcomes: 0 at the top
   of the section, 3 at the bottom, every fraction in between. Everything
   else follows from it, which is the point: one write moves both strips and
   nothing here knows where anything is on the page.

   It is read off the stage's own position rather than from page offsets.
   `top` on the sticky stage is the line it parks at, so the distance the
   section has travelled past that line is the scroll position, and it
   needs no measuring of document offsets that go stale when an image
   settles or a font swaps.

   Additive, like the rest: without this file nothing writes `--f`, and the
   stylesheet without `html.js` leaves the section as four photographs each
   beside its own outcome. Under prefers-reduced-motion this does not run at
   all and the stylesheet falls back to the same thing. */
(function () {
  var bo = document.querySelector(".bo");
  if (!bo) return;
  var stage = bo.querySelector(".bo-stage");
  var items = bo.querySelectorAll(".bo-item");
  var n = items.length;
  if (!stage || n < 2) return;

  var reduce = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  var park = 0, travel = 1, at = -1, ticking = false;

  /* The tallest outcome. Everything vertical in the stylesheet is built off
     it: the gap between outcomes, the height of the rule, and where the
     column hangs so the outcome being read sits on the reading line. The
     gap itself stays in CSS, where it can differ by breakpoint; all this
     has to know is how tall an outcome is, which CSS cannot work out. */
  function measure() {
    if (reduce.matches) return;
    park = parseFloat(getComputedStyle(stage).top) || 0;
    travel = Math.max(1, bo.offsetHeight - stage.offsetHeight);
    var tall = 0;
    for (var i = 0; i < n; i++) {
      var h = items[i].offsetHeight;
      if (h > tall) tall = h;
    }
    if (tall) bo.style.setProperty("--itemh", tall + "px");
  }

  /* The photographs after the first are deferred, which is right for four
     pictures below the fold and wrong the moment the section is nearly in
     view: a deferred picture only starts loading as it comes near the
     window, and these come near it by sliding into a frame the reader is
     already looking at, so the second one would arrive as a white card and
     fill in afterwards. Two screens out is early enough to have them.

     Once only, and it undoes nothing: a picture already loaded ignores it. */
  var fetched = false;
  function fetchAll() {
    fetched = true;
    var imgs = bo.querySelectorAll(".bo-fig img");
    for (var i = 0; i < imgs.length; i++) imgs[i].loading = "eager";
  }

  function paint() {
    ticking = false;
    if (reduce.matches) return;
    var box = bo.getBoundingClientRect();
    if (!fetched && box.top < window.innerHeight * 2) fetchAll();
    var p = (park - box.top) / travel;
    if (p < 0) p = 0;
    else if (p > 1) p = 1;
    var f = p * (n - 1);
    if (Math.abs(f - at) < 0.001) return;
    at = f;
    bo.style.setProperty("--f", f);
    /* The fade is NOT symmetrical, and that is the whole of it. Client
       2026-11-13: "when 2nd image comes in frame fully with 2nd point, the
       point above it should disappear fully." So an outcome that has been
       read is gone by the time the next one is in place, while the one
       still to come sits under it, legible, waiting.

       `u` is how far past an outcome the reading line has got. Reading the
       curve by its corners: at 0 the outcome is being read and is at full
       strength; at +1 it has been read and is at nothing; at -1 it is the
       one underneath, at 0.42; at -2 and beyond it is out of sight. Every
       step between is a straight line, so nothing jumps. An earlier version
       picked a winner with Math.round and snapped it to full strength,
       which flashed at the halfway point of every handover. */
    for (var i = 0; i < n; i++) {
      var u = f - i;
      var o;
      if (u >= 0) o = u >= 1 ? 0 : 1 - u;
      else if (u >= -1) o = 1 + 0.58 * u;
      else o = u <= -2 ? 0 : 0.42 * (u + 2);
      items[i].style.opacity = o;
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(paint);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { measure(); at = -1; paint(); });
  if (reduce.addEventListener) {
    reduce.addEventListener("change", function () {
      if (reduce.matches) {
        bo.style.removeProperty("--f");
        bo.style.removeProperty("--itemh");
        for (var i = 0; i < n; i++) items[i].style.opacity = "";
      } else { measure(); at = -1; paint(); }
    });
  }
  /* A picture that arrives late changes nothing about the column, but a
     font that swaps changes how tall every outcome is, and the measurement
     taken at parse time is of the fallback face. Measured again when the
     font is ready and again at load, because the two do not always settle
     in that order and a column measured 7px short is a column whose gap is
     7px wrong for as long as the page is open. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { measure(); at = -1; paint(); });
  }
  window.addEventListener("load", function () { measure(); at = -1; paint(); });

  measure();
  paint();
})();
