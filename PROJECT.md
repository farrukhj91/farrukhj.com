# Farrukh Jamal — Portfolio · Project Scope (SSOT)

**Last updated:** 2026-06-13 (Phase 4 Round 1)
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
| `/` | Home — wordmark + positioning + curated front door | live |
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
| `<StillInFlight>` | Quiet appendix wrapper |
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
10. `**Still in flight — what would lift this case study further**` appendix

Layout (`/work/[...slug]`) renders: H1 + mono meta line + ExecutiveSummary, then markdown Content, sticky TOC rail on the right.

### 12.2 Side projects

Same schema (lighter), `<empty-state>` until populated. First candidates: Competitive Intelligence Agent, Daily Competitor Changelog Agent (both Claude Code-built).

### 12.3 About / CV / Contact / Writing

About + CV + Contact scaffolded with `[TODO]` slots. Writing hidden until first post.

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

---

## 17. Open items

- Vercel deploy auth flow — needs Farrukh-side `npx vercel login` first time. Subsequent deploys are non-interactive.
- About / CV / Contact copy — Farrukh writes.
- Convert markdown Figma-placeholder blockquotes to `<FramePending>` components — phase 4 R2.
- Convert "By the numbers" blockquote in LMS Redesign to `<KeyStats>` numerals — phase 4 R2.
- `process-problem-matrix-full.jpg` is 1.09 MB — re-encode in phase 5.

---

## 18. References — tech

- [Astro docs](https://docs.astro.build/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Fontsource Geist](https://fontsource.org/fonts/geist) · [Geist Mono](https://fontsource.org/fonts/geist-mono)
- [remark-unwrap-images](https://github.com/remarkjs/remark-unwrap-images)
- [Vercel deployment for Astro](https://vercel.com/docs/frameworks/astro)
