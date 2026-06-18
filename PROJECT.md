# Farrukh Jamal — Portfolio · Project Scope (SSOT)

**Last updated:** 2026-06-15 (Phase 4 Round 5)
**Current phase:** Phase 4 — Styling + content wiring, iterating
**Domain:** farrukhj.com (Namecheap; git connected to Vercel)
**Owner:** Farrukh Jamal · farrukh.jamal91@gmail.com

This file is the single source of truth. All scope, decisions, references, and styling rules live here. Update on every direction or scope change; stamp the date in the section header.

---

## 1. Project overview

Senior product portfolio for Farrukh Jamal. Long-form, content-first, image-heavy, type-led. Cool, neutral dark — Linear / Vercel refinement, Chimero discipline. Built to read as a portfolio of thinking.

## 2. Audience and positioning

**Audience:** hiring managers for senior PM roles (especially AI PM), product teams, freelance clients.

**Positioning statement:** Senior product practitioner with deep design fluency, currently pointing at AI product work. Trajectory: Product Design (UX) → Product Management → AI Product Management. Stated as a direction, not a transition.

**What the site avoids saying with branding:** the word "AI" in nav or headings. Signal comes from the work, not the labels.

## 3. Voice

- First person throughout. Exception: the CV page is timeline-format.
- Farrukh writes all narrative and marketing copy. Claude only writes structural text and flags the rest.
- Tone is declarative and specific. No marketing posture.

## 4. Hard "no" list

Standing rules:
- No third-person voice anywhere except CV.
- No card grids — typographic lists only.
- No parallax, scroll-jacking, heavy animation.
- No AI-stock illustrations, gradient hero, "Hi I'm Farrukh 👋" energy.
- No long marketing copy Claude writes on Farrukh's behalf.
- No auto-deploy to production. Vercel preview first, then promote on approval.

**Extended hard-no list (locked 2026-06-13):**
- No literary pull quotes with oversized quotation marks.
- No em-dash-as-design-ornament.
- No italic captions under every image — only when they add information.
- No "Currently / Now / Reading / Listening" sections.
- No generic section labels ("Selected Work," "Featured Projects," "Recent Writing"). Write something specific or skip the label.
- No tagline persona under name ("PM • Designer • Thinker").
- No greeting opener; one-line positioning statement only.
- No 64px+ display headlines. H1 capped at 28px desktop / 24px mobile.
- No editorial serifs (Newsreader, Spectral, Instrument Serif).
- No warm-editorial palettes (cream, terracotta, sage, gold, dusty teal).
- **No flagship/feature visual hierarchy.** All case studies are equal-weight typographic items; relationships expressed via metadata (`company · product · role · years`) and inline prose cross-references.

## 5. Reference triangle (locked 2026-06-13)

- **[linear.app](https://linear.app)** — refinement: sizing, restraint, cool-dark palette, hierarchy from weight not scale.
- **[vercel.com](https://vercel.com)** — refinement: Geist in context, no-chromatic-accent discipline, subtle grid + gradient signature, mono for metadata.
- **[frankchimero.com](https://frankchimero.com)** — feel: whitespace discipline, typographic confidence, personality through voice. We take the discipline; not the warm editorial aesthetic.

Explicitly NOT references: rauno.me (light mode), AI-generated portfolio templates.

---

## 6. Tech stack

**Astro + raw CSS (custom properties) + MDX + Vercel.**

Plugins / dependencies in use:
- `astro` 5.x
- `@astrojs/mdx` — MDX rendering for components inline (deferred phase-4 round 2 swap of Figma placeholders to `<FramePending>`)
- `@astrojs/sitemap` — sitemap, excludes `/writing/*`
- `@fontsource-variable/geist` — sans, all type roles
- `@fontsource-variable/geist-mono` — mono, metadata only
- `remark-unwrap-images` — lets `<img>` / `<figure>` escape paragraph wrappers so figures can render up to 1000px
- `sharp` — Astro built-in image processing

CMS-ready future: TinaCMS or Keystatic (git-based, edits MDX in place, no DB).

---

## 7. Sitemap and routing

| Route | Purpose | Status |
|---|---|---|
| `/` | Home — wordmark + positioning + curated front door (top 3 by order, with "All work →" link when more exist) | live |
| `/work` | Case studies index — flat typographic list | live |
| `/work/[slug]` | Case study (LMS Redesign, Coach Offline, Stakeholder Dashboards) | live |
| `/side-projects` | Empty-state index | live |
| `/side-projects/[slug]` | Side project pages | scaffolded |
| `/about` | About | live (TODO copy) |
| `/cv` | CV / timeline | live (TODO timeline) |
| `/resume.pdf` | Downloadable PDF | live |
| `/contact` | Contact | live |
| `/writing` | Essays index | scaffolded, `noindex`, not in nav |
| `/writing/[slug]` | Essay pages | scaffolded, `noindex` |
| `/sitemap-index.xml`, `/robots.txt`, `/404` | SEO + error | auto-generated / live |

URL structure is **flat** — `/work/offline-lms`, not nested.

---

## 8. Navigation model

- Top, left wordmark "Farrukh Jamal" + right nav (Work · Side Projects · About · CV).
- Contact in footer. Writing hidden.
- Current page in `--ink` (default text); other items in `--muted` until hover.
- No logo, no avatar, no underlines.

---

## 9. Design tokens (locked 2026-06-13 Phase 4 R1)

### 9.1 Typography — Geist Sans (body) + Geist Mono (metadata only)

| Role | Family | Size (desktop / mobile) | Weight | Notes |
|---|---|---|---|---|
| H1 | Sans | 28 / 24px | 600 | -0.01em tracking, lh 1.2 |
| H2 | Sans | 22 / 20px | 600 | -0.005em |
| H3 | Sans | 17px | 600 | 0 |
| Body | Sans | 16 / 15px | 400 | lh 1.6 |
| UI / nav | Sans | 14px | 500 | |
| Metadata | **Mono** | 13px | 400 | `.meta` class globally |
| Caption | **Mono** | 13px | 400 | `<figcaption>` |
| Small / appendix | Sans | 13 / 12px | 400 | opacity 0.55 |

Hierarchy from weight + opacity, never scale alone. Mono ONLY for metadata + captions + dates — not nav, not wordmark, not headings.

### 9.2 Color tokens

| Token | Dark (default) | Light (future) | Used for |
|---|---|---|---|
| `--bg` | `#0B0B0D` | `#FAFAFA` | Body background |
| `--bg-elevated` | `#141417` | `#F1F1F3` | Elevation |
| `--ink` | `#E5E5E7` | `#1A1A1F` | Body text |
| `--ink-bright` | `#FFFFFF` | `#000000` | Emphasis: current nav, hover, ↗ glyph |
| `--muted` | `#8A8A92` | `#6E6E76` | Metadata, captions |
| `--border` | `#1F1F23` | `#E8E8EC` | Hairline dividers |
| `--grid-dot` | `rgba(255,255,255,0.07)` | `rgba(0,0,0,0.05)` | Home dot grid |
| `--glow-color` | `rgba(120,140,200,0.10)` | `rgba(80,100,160,0.08)` | Home radial glow |

Brightness gap is the accent; no chromatic color. (Bumped grid/glow opacity in R1 for Vercel-level visibility.)

### 9.3 Spacing scale

4, 8, 12, 16, 24, 32, 48, 64, 96, 128px (tokens `--s-1` through `--s-10`). No 192.

### 9.4 Layout widths

| Token | Value |
|---|---|
| `--w-text` | 68ch (~640px) — prose paragraphs |
| `--w-figure` | 800px — standard figures |
| `--w-wide` | 1000px — case-study figures (max width via figure container) |
| `--w-page` | 1080px — page max |
| `--pad-side` | 96px / 48px tablet / 24px mobile |

---

## 10. Home page atmospheric layer

**Dot grid:**
- 1px dots, 28px spacing, `--grid-dot` color (`rgba(255,255,255,0.07)` — visible against `#0B0B0D`)
- Behind home-page upper region only
- Masked fade to transparent over 100vh

**Radial gradient glow:**
- Ellipse 900×600px at 35% / 18%
- `--glow-color` (`rgba(120,140,200,0.10)` — barely-blue cool tint, visibly present)
- Behind wordmark slot

**Restraint rules:**
- Home page only. NOT on /work, case studies, /about, /cv, /contact.
- Fade out over first viewport.
- Light-mode-ready via tokens.

---

## 11. MDX / Astro component inventory

| Component | Purpose |
|---|---|
| `<Hero>` | Opening figure for a case study — content-width |
| `<Figure>` | In-content figure with optional `wide` prop |
| `<Quote>` | Clean blockquote with optional attribution |
| `<KeyStats>` | "By the numbers" — numerals, no emoji |
| `<RoleFooter>` | Metadata strip at end of case study |
| `<FramePending>` | Designed placeholder for missing Figma exports |
| `<ExecutiveSummary>` | Block before Context section: kicker (`Role · Timeframe`) + 3 lines (problem, approach, outcome). Renders from frontmatter `summary` object. |
| `<CaseStudyToc>` | Sticky right-rail TOC. Reads H2 headings via Astro's `render()` API. Low-opacity until hover; IntersectionObserver scroll-spy highlights current section. Hidden below 1100px. |
| `<HomeBackground>` | Home-page dot grid + radial glow layer |

Layout / chrome components: `Nav`, `Footer`, `BaseLayout`.

---

## 12. Content types

### 12.1 Case studies

Long-form markdown. Schema (in `src/content/config.ts`):

```ts
{
  title, role, company, product, years,
  markets: string[],
  problem: string,         // one-liner for indexes
  summary: { problem, approach, outcome } | undefined,
  order: number,
  collaborators?: string[],
  draft: boolean,
}
```

Stable template (markdown body):
1. Hero figure (`<figure><img><figcaption>`) — H1 + byline come from frontmatter via layout, NOT in markdown body
2. `---` horizontal rule
3. `## Context`
4. `## The Problem` / `## The Research` / `## The Reframe`
5. `## The Process` / `## The Solution`
6. `## Key Decisions` (numbered H3s)
7. `## Outcome`
8. `## Reflection`
9. Role footer line (italic metadata)

Layout (`/work/[...slug]`) renders: H1 + mono meta line + ExecutiveSummary, then markdown Content, sticky TOC rail on the right.

### 12.2 Side projects

Same schema (lighter), `<empty-state>` until populated. First candidates: Competitive Intelligence Agent, Daily Competitor Changelog Agent (both Claude Code-built).

### 12.3 About / CV / Contact / Writing

- **About** (`src/pages/about.astro`): first-person narrative populated from resume + case-study material. Trajectory: Discretelogix Scrum→PO → KP Design Engineer→PM → Lead Pursuits AI PM. Principles list pulled verbatim from his own LMS/Offline reflection sections. Farrukh edits next.
- **CV** (`src/pages/cv.astro`): two-column timeline (140px year column + content), single-col stack ≤720px. Sections: Summary, Experience, Education, Certifications, Skills. Skills section appears here only — NOT on home/About.
- **Contact**: short page; primary contact in footer.
- **Writing**: hidden until first post.

---

## 13. Case-study index — FLAT typographic list

**Round 1 change:** Dropped flagship/feature visual hierarchy entirely. All case studies render at equal weight in `/work` and on the home page curated front door.

```
Rebuilding Knowledge Platform's LMS
Knowledge Platform · Coach LMS · Product Design Lead · 2022–2023
A six-month rebuild of an LMS used by schools across Pakistan, the UK,
and Afghanistan. Collapsed two brands into one product. Shifted unit
economics by designing against time-to-first-lesson.

Coach Offline
Knowledge Platform · Coach LMS · Product Lead · 2023
Same product, second front. Rebuilding the on-premise deployment for
low-bandwidth schools. WhatsApp-class internet as the floor.

Stakeholder Dashboards
Knowledge Platform · Coach LMS · Product Lead · 2023
Designing for principals who already do the job. A 47-principal survey
shaped the brief.
```

Metadata carries product context: `company · product · role · years` in mono. Readers cluster by product mentally. When Bonzo + Studio CMS work is added, their metadata reads `Knowledge Platform · Bonzo · ...` and the grouping continues to work.

Cross-linking happens in prose: inline links inside case study bodies where contextually relevant (e.g., `[covered in Coach Offline](/work/offline-lms)`). NO related-case-studies widget.

---

## 14. Performance and accessibility targets

- Lighthouse 95+ on all four categories.
- No CLS. `<figure><img>` patterns + dimension preservation via figure CSS.
- Semantic HTML; skip-to-content link; visible focus rings (2px white, 3px offset).
- WCAG AA contrast minimum.
- Responsive 360px floor → 1080px+ desktop.
- `remark-unwrap-images` lets images escape `<p>` wrappers for proper figure rendering at up to 1000px.

---

## 15. Phased process — status

| Phase | What | Status |
|---|---|---|
| 1 | Research + written POV | ✅ 2026-06-12 |
| 2 | Direction proposal (cool-dark, Geist, no-accent) | ✅ 2026-06-13 |
| 3 | Skeleton build (routing, layout, MDX pipeline, content migrated) | ✅ 2026-06-13 |
| 4 R1 | Flat index, exec summaries, sticky TOC, mono metadata, dialed-up grid/glow, image figures, visible focus | ✅ 2026-06-13 |
| 4 R2+ | About + CV + Contact copy, swap markdown to `<FramePending>` / `<KeyStats>` components, iterate | ⏳ ongoing |
| 5 | Polish, a11y audit, perf pass, Vercel preview → custom domain | not started |

---

## 16. Decision log

| Date | Decision | Notes |
|---|---|---|
| 2026-06-12 | Reference principles distilled from Chimero + 4 senior portfolios | Phase 1 |
| 2026-06-13 | Locked phase 2 direction: Geist Sans, no chromatic accent, cool-dark `#0B0B0D` bg | |
| 2026-06-13 | Reference triangle: Linear + Vercel (refinement) + Chimero (feel) | |
| 2026-06-13 | Phase 3 skeleton complete; site builds 11 pages | |
| 2026-06-13 R1 | Flatten case-study index — drop flagship/feature visual hierarchy | Metadata carries context |
| 2026-06-13 R1 | Add `summary` to schema; render `<ExecutiveSummary>` before Content | |
| 2026-06-13 R1 | Sticky right-rail TOC on case study pages (IntersectionObserver scroll spy) | |
| 2026-06-13 R1 | Geist Mono for metadata, captions, dates only | NOT nav, not headings |
| 2026-06-13 R1 | Grid opacity 0.03 → 0.07; glow 0.04 → 0.10, slight cool tint | Vercel-calibrated |
| 2026-06-13 R1 | H1 size 32px → 28px desktop, 28px → 24px mobile | Linear-calibrated |
| 2026-06-13 R1 | Image markdown converted to `<figure><figcaption>`; remark-unwrap-images installed | Lets figures render up to 1000px |
| 2026-06-13 R1 | Visible focus rings: 2px `--ink-bright`, 3px offset, 2px radius | |
| 2026-06-13 R1 | Strip H1 + byline from case study markdown bodies (now rendered by layout from frontmatter) | |
| 2026-06-14 R2 | Home page caps to 3 case studies by `order` + conditional "All work →" link | Avoids infinite-scroll as case studies grow |
| 2026-06-14 R2 | TOC sticky fix — moved `position: sticky` from inner `.toc` to outer `.cs-rail` grid item | Inner sticky had no track inside short rail; rail now sticks within content column |
| 2026-06-14 R2 | TOC always visible (dropped opacity-fade) with refined left-rule indicator per item | Active section has brighter, longer left dash |
| 2026-06-14 R2 | TOC kept on **right rail** (editorial convention — Stripe / Tailwind / Astro / Linear docs) | Reversible if user prefers left |
| 2026-06-14 R2 | Nav wrapped in `<header class="site-header">` with full-width bottom hairline | Structural separation from content |
| 2026-06-14 R2 | List items (home + /work) gain hover state — `--bg-elevated` background + 1px border + slide-in `→` arrow + title brightens to `--ink-bright` | Linear-style tactile feedback |
| 2026-06-14 R2 | Exec summary block: `--bg-elevated` bg + 1px border + 2px left `--ink-bright` accent + bottom-ruled kicker | Adds depth without violating no-card-grid |
| 2026-06-14 R2 | `/work` page kicker: mono-uppercase label with trailing extending hairline rule (max 320px) | Linear-style structural decoration |
| 2026-06-14 R2 | Home page section label "Selected work" removed (violated extended hard-no list — generic section labels) | List speaks for itself |
| 2026-06-14 R2 | Decision: no skills section (recommendation) — expertise framing goes into About narrative as a sentence | Senior portfolios don't list skills |
| 2026-06-14 R2 | Decision: testimonials handled inline in case study reflections (recommendation) — `/endorsements` page reserved if Farrukh wants a dedicated showcase later | Avoids "trusted by" marketing posture |
| 2026-06-14 R3 | Locked: TOC stays on right rail | Editorial-convention rationale |
| 2026-06-14 R3 | Locked: skip testimonials for now | LinkedIn handles for now |
| 2026-06-14 R3 | Schema: added `featured: boolean` (default false) to work collection | Explicit home-page curation |
| 2026-06-14 R3 | Home page filters by `featured === true` instead of slicing `order` | All three KP case studies set `featured: true` |
| 2026-06-14 R3 | CV page populated from `_inbox/resume_extracted.md` — full timeline: summary, experience, education, certifications, skills | Two-column timeline (140px year + content); stacks single-col on ≤720px |
| 2026-06-14 R3 | About page drafted from resume + case-study material — first-person narrative, trajectory, principles | Farrukh edits next; not Claude-default voice — pulls his own reflection-section principles verbatim |
| 2026-06-14 R3 | Skills appear ONLY on CV page (standard resume content). NOT on home, About, or anywhere else | Maintains senior-portfolio posture |
| 2026-06-14 R4 | Renamed `/cv` → `/experience`. `Experience` nav label. 301 redirect via vercel.json | Cleaner register, less British-formal |
| 2026-06-14 R4 | Location corrected Rawalpindi → Islamabad across CV and About | |
| 2026-06-14 R4 | New `.num` utility class — Geist Mono + `--ink-bright` for in-prose numerical anchors | Applied across About metrics ($70K, 100K+, 30+, 100+, 252K+, 50+, 71K+, 4.5M+, 10+) |
| 2026-06-14 R4 | About learnings rendered as numbered aphorisms (counter `decimal-leading-zero`) with mono kicker + hairline top/bottom rules per row | User-picked treatment from mockup |
| 2026-06-14 R4 | Home positioning sentence shipped: "Product manager with a design-led background. Eight years in, currently building AI-native product at Lead Pursuits." | Improved version of option 2 (dropped inaccurate "writing about the work") |
| 2026-06-15 R5 | About narrative rewritten in Farrukh's voice from his raw answers to §17B prompts. Replaces Claude-voiced career walkthrough that overlapped Experience. Six paragraphs + retained learnings list + new outside-of-work paragraph before contact close. Lead Pursuits intentionally not named (Experience carries it) | Voice samples: Farrukh's Medium/LinkedIn posts (financial literacy, NPS critique, UX fellowship grad). Calibrated tone: longer sentences, plain connectives, no em-dashes, direct emotional statements, source-name visibility (Fahim Akhter, Attabad lake) |
| 2026-06-15 R5 | Monogram pick (§17A) deferred — Farrukh designing externally and will provide SVG | Three text-stroke variants (A/B/C) rejected; faceted geometric direction (v1 with 14 triangles, v2 with solid letterforms + 4 seams) also rejected. Farrukh handling offline |
| 2026-06-15 R5 | About: 5 personal photos staged + wired. Header portrait (rooftop café) at top of page, 220px wide, 3:4; outside-of-work 4-photo square strip (football pitch at night, mountain valley dawn, mountain vertical, peaks/waterfalls) after the outside-work paragraph. Sharp pipeline `tools/process-about-photos.mjs` (mozjpeg, attention-based cover-crop) — total ~230KB across 5 files | Pushed back on 4 photos: 2 with a child, 2 with a partner — not portfolio-appropriate. Mobile: strip collapses 4-col → 2-col under 640px |
| 2026-06-15 R5 | Offline LMS case study: 1 add + 3 replacements from the 82-file `_inbox/LMS - Offline Desktop App/` set. Added `process-user-journey-mapping.jpg` at end of "The Reframe" (Ms. Ayesha 12-step flow). Replaced teacher row → `design-teacher-my-classes.jpg`, clicker assignment → `design-clicker-assignment-v2.jpg` (cleaner UI with explicit Active/Inactive handshake column), clicker result → `design-assessment-live-results.jpg` (live in-class response grid replaces the post-assessment view; body text updated to introduce live moment + post view together). Sharp pipeline `tools/process-offline-screens.mjs` | Two candidate screens skipped (`Admin Setup - Download...` and `Learners - Lesson Listing View` rendered blank/white in the source PNGs). Old replaced JPGs left in `/public/assets/offline/` — unreferenced but kept for git history visibility |
| 2026-06-15 R5 | Removed "Still in flight" appendix from all three case studies (offline-lms, lms-redesign, stakeholder-dashboards). Read as AI-generated leftover — listing what a case study lacks signals incompleteness, not transparency. `<StillInFlight>` component dropped from inventory and template (case study structure now ends at role footer line) | Internal "what would lift this" tracking moves out of the public site — keep in PROJECT.md §17 / per-case-study scratch notes if needed |
| 2026-06-15 R5 | About strip: replaced `outside-peaks-waterfalls.jpg` with `outside-stargazing.jpg` (Milky Way + cabin window) to anchor the Attabad stargazing line in the outside-work paragraph. Strip arc: football night → valley dawn → bright mountain → Milky Way — balanced day/night. Second new stargazing candidate (snow peaks under stars) skipped: at 200px square it would have read as near-black | Old peaks-waterfalls asset left unreferenced in `public/assets/about/` |

---

## 17. Open items (next session priorities)

### A. Monogram pick — DEFERRED (2026-06-15)

Farrukh is designing the monogram himself and will provide the SVG when ready. When it lands: replace text wordmark in `Nav.astro`, drop into `public/favicon.svg`, regenerate OG image. Aesthetic direction is a constructed geometric mark (faceted triangulation), not a typographic wordmark — confirmed via reference image Farrukh shared.

### B. Personal About writeup — DONE (2026-06-15)

Rewrite shipped: six narrative paragraphs in Farrukh's voice, calibrated from his raw answers to all five prompts plus voice samples from his Medium/LinkedIn posts. Learnings list retained verbatim. New outside-of-work paragraph (Attabad lake, finance reading, spirituality, football) inserted between learnings list and Islamabad/contact close.

### C. Liveliness package — discuss before shipping

Five proposed moves; Farrukh has released the no-chromatic-accent rule for this. Hold for explicit go-ahead per move:

1. **One restrained accent — Linear violet `#5E6AD2`** on link hover, focus rings, active TOC indicator, `→` / `↳` glyphs, status dot. Tokens: add `--accent: #5E6AD2` (dark), `--accent: #4F46C7` (light).
2. **Mouse-aware spotlight glow on home hero** — cursor-tracked radial gradient `rgba(94, 106, 210, 0.10)` behind wordmark slot. Disabled below 1100px (no hover on touch). Pointer-events: none. RAF-throttled.
3. **Reveal-on-scroll micro-animation** — sections fade up 250ms (opacity 0→1, translateY 6px→0) via IntersectionObserver. Honor `prefers-reduced-motion: reduce`.
4. **Hover lift on case-study list rows** — extend R2 hover state with 1–2px translateY + soft violet outer-glow `0 0 24px -8px rgba(94, 106, 210, 0.25)`.
5. **`● Currently building at Lead Pursuits` status pill in nav** — small, mono, hairline-bordered. Bullet pulses violet 0.4→1.0 over 2.4s. Single config field controls the text.

### D. Personal photos — DONE (2026-06-15)

Header portrait + 4-photo outside-of-work strip wired. Sharp pipeline at `tools/process-about-photos.mjs`. Source candids staged in `_inbox/Pictures of Me/`.

### E. Deferred from earlier rounds

- Convert markdown Figma-placeholder blockquotes in case studies to `<FramePending>` components.
- Convert "By the numbers" blockquote in LMS Redesign to `<KeyStats>` numerals.
- Re-encode `public/assets/offline/process-problem-matrix-full.jpg` (1.09 MB) for performance pass.

---

## 18. References — tech

- [Astro docs](https://docs.astro.build/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Fontsource Geist](https://fontsource.org/fonts/geist) · [Geist Mono](https://fontsource.org/fonts/geist-mono)
- [remark-unwrap-images](https://github.com/remarkjs/remark-unwrap-images)
- [Vercel deployment for Astro](https://vercel.com/docs/frameworks/astro)
