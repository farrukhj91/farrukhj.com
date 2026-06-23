---
title: "Stakeholder Dashboards"
role: "Product Lead"
company: "Knowledge Platform"
product: "Coach LMS"
years: "2023"
markets: ["Pakistan"]
problem: "Designing for principals who already do the job. A 47-principal survey shaped the brief."
summary:
  problem: "Most LMSes treat school dashboards as decoration. We surveyed 47 principals across Pakistan and found 94% were already tracking school performance — just not with our tool. The design problem wasn't convincing them; it was being better than what they were already using."
  approach: "<a href='https://www.linkedin.com/in/toobamalick/'>Tooba</a> and I built the new dashboards around what the survey told us directly: subject-wise performance as a first-class card, three design iterations before any engineering investment, financial features deliberately cut to protect product identity."
  outcome: "The dashboards rolled out to every Network Head and principal in the Pakistani market. The first version where principals asked for more features, not fewer."
order: 3
collaborators: ["Tooba Malik (Product Designer)"]
featured: true
draft: false
---
---

## Context

Coach (KP's LMS) serves two stakeholders who run the schools using it. **Principals** operate at the level of a single campus. **Network Heads** run a chain of campuses — typically a Pakistani school network like Beaconhouse, Aspire Grammar, or The Educators with branches across several cities. Both need to see what's happening, fast enough to act on it. The Stakeholder Dashboards are the surface that lets them do that.

This case study covers the dashboard rebuild we did as a follow-on to the [main LMS redesign](/work/lms-redesign). It shipped at the product level but saw its primary use in the Pakistani market. I led product direction, prioritization, and the cross-functional decisions on hierarchy and scope, and worked alongside the designer through the entire design process. **[Tooba Malik](https://www.linkedin.com/in/toobamalick/) led the design discovery, requirements synthesis, IA, and UI execution as the designer of record.** The decisions we landed at came out of working sessions we ran together — I directed, she designed.

---

## The Problem

The starting assumption inside the team was that we needed to *convince* principals to start tracking school performance. The research told us a different story.

**Roughly <span class="num">94%</span> of principals we surveyed were already tracking school performance.** They had the will. They had the digital access — over <span class="num">80%</span> had both a smartphone and a computer or laptop on hand. What they didn't have was a tool that fit the job.

The frustration showed up in their own words. Across 47 principals from networks like Beaconhouse, Aspire Grammar, The Educators, United Charter Schools, and others, the challenges they described circled the same gap:

> *"I don't have appropriate tools and strategies to document the observations and data about school performance. It's difficult to evaluate the school performance."*
> — Principal at UCS, Allama Iqbal Town

> *"Data is huge so time management to evaluate is always the issue."*
> — Principal at United Charter Schools

> *"Lack of digitalization."*
> — Principal at Aspire Grammar School Samundri Campus

> *"There is no proper record system in which we can have proper record of a child in one place and quickly review it when required. In paper system, it's hard to find each and every student file."*
> — Principal at Aspire Grammar School Canal Campus

> *"Needs any software."*
> — Principal at HDF Secondary School Ainu Bhatti, Lahore

About half were tracking weekly. A quarter were doing it every two to three months. Most were working on paper, in custom-built proformas, in spreadsheets, in WhatsApp groups, or in the heads of their staff. **And 28% were openly dissatisfied with how they were tracking** — another 4% unsure. Almost a third of the addressable population was a clear candidate for a better tool.

We'd built a first-pass dashboard in earlier design iterations — hero metrics for the network, a single trend line for performance, a link to "view all schools." It was a friendly product surface. It wasn't a tool. A principal who needed to compare campuses, drill into a specific student, or surface academic weaknesses by subject couldn't do any of those things without leaving the dashboard. A Network Head couldn't see the chain at the level of granularity that actually drove their decisions — *which schools, which subjects, which teachers, which trend.*

So the brief became: build a dashboard that's better than what they're currently using. Not novel. Better.

---

## The Research

[Tooba](https://www.linkedin.com/in/toobamalick/) ran the discovery as a structured FigJam workspace, mapping four parallel investigations: what principals are *responsible for*, what *challenges* they hit, what *data points and features* they actually need, and how they *already communicate and collaborate*. Every sticky on those boards was authored by her. The synthesis below sits on top of her work.

**Methodology shift.** Same approach we'd brought into the [main redesign research](/work/lms-redesign): open-ended, non-leading questions. Where most surveys would ask *"Rate the importance of subject-wise reporting from 1 to 10,"* we asked *"How do you think subject-wise information and reports may help you in improving the performance of the students?"* The answers were longer, messier, and far more useful.

**The sample.** 47 principals across schools in cities including Karachi, Lahore, Islamabad, Multan, Jhelum, Khairpur, Larkana, and Faisalabad. Education skew was high — 30 of 47 held a Master's degree, one held a PhD.

**The single clearest finding.** When asked what data visualizations would help them assess their school's overall performance, the response distribution was unusually one-sided:

<figure><img src="/assets/dashboards/research-q12-survey-results.svg" alt="Q12 survey results showing the principal-cohort preferences for dashboard data visualizations. 93.5% asked for academic results analysis and 71.7% specifically asked for subject-wise performance, with a long tail of lower-priority items behind them." /><figcaption>Principal-cohort responses on what data visualizations would help. The top two — academic results analysis and subject-wise performance — defined the structural shape of the FINAL design.</figcaption></figure>

The top two bars were the entire design brief. **<span class="num">93.5%</span> asked for academic results analysis. <span class="num">71.7%</span> specifically asked for subject-wise performance.** Consensus that high on a multi-select question is rare — it doesn't tell you what direction to go in, it tells you exactly what to build.

**A second striking finding, from a separate question.** When we asked what data on *teacher* performance would help, the strongest result was <span class="num">73.9%</span> asking for teachers' class performance — and notably, no principal asked for teacher attendance as a top dashboard metric. Principals do not care, at this level, when teachers show up. They care whether teachers' classes are working. That's a counter-intuitive finding, and a useful one — it told us what *not* to build as much as it told us what to.

The qualitative responses pointed to the *why.* Several principals talked about intervention as the real point of tracking:

> *"Tracking the performance helps in identifying the gaps on time. This allows you to intervene early and provide the necessary resources to fill those gaps."*
> — Principal at The Educators Bharakahu

> *"Easy to identify their strengths and areas for improvement so they can be given guidance according to it."*
> — Principal at Beaconhouse School System

> *"Timely Data analysis of individual students to identify their needs."*
> — Principal at Beaconhouse School System

The job wasn't analytical curiosity. It was timely, actionable insight that could be acted on before the term ended.

**[Tooba's](https://www.linkedin.com/in/toobamalick/) brief, in her own words.** After the discovery work was synthesized, [Tooba](https://www.linkedin.com/in/toobamalick/) wrote a six-line product brief directly on the FigJam board — what the dashboard should let the user do:

> *The dashboard should allow us to:*
>
> *— Know that they are achieving success*
> *— Understand the depth of the success*
> *— See how that success aligns with other schools in the network*
> *— Set realistic goals*
> *— Develop strategies to reach goals*
> *— Track yearly, monthly, weekly, and daily progress*

Those six lines became the design north star. Every major surface in the FINAL design ladders back to one of them.

<figure><img src="/assets/dashboards/brief-to-surface-mapping.svg" alt="Diagram mapping each of Tooba's six brief principles to its corresponding surface in the FINAL Network Head Dashboard" /><figcaption>The six-line brief, mapped to the FINAL design surfaces that deliver it. Each principle has a dedicated surface — or, in one case, a combination of two — that carries the load.</figcaption></figure>

---

## Process — three design iterations before any engineering investment

One process discipline shaped this entire project. We followed our standard rule of never handing a design to engineering until it had been signed off internally — which on this project meant we iterated through three full versions of the dashboard in design before any code was written. V1 and V2 were design iterations. V3, what we called FINAL, was what eventually moved to engineering.

That's a discipline with a cost: it slows the visible delivery cadence. It's also a discipline with a benefit: when you change your mind about the structure of a screen, the cost of the change is a Figma file, not a sprint. Most of the structural moves below — the sidebar nav, the calendar-month picker, the dedicated My Schools table, the Subject Performance card — would have been expensive to introduce if engineering had already shipped V1 or V2.

> 🖼 *Figma screen placeholder: V1 → V2 → V3 (FINAL) comparison — showing the structural evolution of the Network Head dashboard from "hero metrics + single chart" to a full app-shell with sidebar nav, subject-level analytics, and a dedicated schools comparison table.*

A specific decision moment is worth naming. On October 4, 2023, I sat down with the engineering leads — Tayyab (backend lead), Kashif and Saddam (backend engineers), Basit (frontend lead) — to settle the data hierarchy for the dashboards. Region tags would live at the school-family level. When a campus is created under a family, the available regions auto-populate. Cities auto-populate from regions. That meeting made the My Schools filter UX and the regional rollups buildable. It's the kind of cross-functional alignment work that case studies often skip and shouldn't — design that doesn't fit the data model is just expensive Figma.

A second trade-off shaped the My Schools screen. The filters had originally been designed *inside* the table itself. After a conversation with Adeel Azad on implementation complexity, we moved them outside into a separate filter strip. Cleaner to build, easier for QA to verify, same UX intent. That's the kind of trade-off the design absorbs when engineering says "this is harder than it looks." The answer wasn't "ship anyway." It was "what's the equivalent design that's actually buildable."

---

## Key Decisions

### 1. One product, two stakeholders.

The principal experience and the network-head experience share the same design system, the same content model, and the same drill-in surfaces. There is no separate "Principal Dashboards" app.

Principals see two summary surfaces:

- **Teacher-level performance** — how each teacher is performing in a class and how all their classes are performing overall. For classes that aren't performing well, the surface drills into which subjects, areas, or lessons are weak.
- **Student-level performance** — how each student is performing overall and by subject. For struggling students, the surface highlights specific areas so the principal can intervene and discuss with parents.

Network Heads get everything a principal can do, plus one additional level: a network-level rollup showing which schools and principals are performing well, which are struggling, and which grades or subjects are weakest or strongest across the chain. That extra level is what turns the same product into a strategic tool for the network and a tactical tool for each campus.

> 🖼 *Figma screen placeholder: FINAL Network Head landing dashboard — sidebar nav (Dashboard / My Schools / Settings), Network Summary KPIs (150 schools / 50,000 students / 500 teachers), Performance Trends card with month-axis, and the new Subject Performance card with per-subject tiles.*

### 2. Subject Performance as a first-class card.

71.7% of principals explicitly asked for subject-wise performance. We made it a first-class card on the Network Head landing dashboard — its own labeled surface, a two-series view (current performance vs. trend), horizontally scrollable across the subjects taught in the network. Of every change between earlier iterations and the FINAL, this is the one that mapped most directly to the survey. The design followed the data.

### 3. Build to needs, not wants.

Several features that *individual* principals requested didn't make the FINAL — the most prominent being "remarks on each student's performance," which one principal explicitly asked for as a feature. We held back. The decision principle was a clear one: *build to needs first, wants second.* Every feature has a design and engineering cost. A request from 1% of users doesn't get prioritized until it's validated as a need across a larger group. The remarks feature would have made every assessment review screen meaningfully more complex; we deferred it pending broader signal.

The same logic applied at the dashboard surface level. Teacher attendance went unbuilt because nobody asked for it. Personalization (per-principal custom layouts) was kept simple — strong filters that let each principal view the same dashboard their own way, rather than a heavier customization system.

### 4. The Financial cut.

[Tooba's](https://www.linkedin.com/in/toobamalick/) FEATURES grid had "Financial Metrics" appearing twice. A handful of principals — and internal voices — had asked whether the dashboards could include fee collection, payables, financial-management reporting. We deliberately cut all of it.

The reasoning wasn't about complexity. It was about product identity. Coach is a Learning Management System — its job is learning, performance visibility, and concept improvement for learners, teachers, and the people running their schools. Adding financial management would have pulled the product into School Management System territory: fee challan generation, payment tracking, debtor reports, accounting integrations. A different product, a different market, a different team. We chose not to follow that gravity well.

### 5. Calendar-month time picker over relative time.

The earlier iterations used a "Last 6 months" relative-time selector. The FINAL switched to a calendar-month picker — "January 2024." Principals talk about performance in calendar terms. *"How did January look?" "What happened in March?"* The academic year is divided into months and terms, not into rolling windows. The picker shifted to match how principals already think.

### 6. WhatsApp without WhatsApp integration.

About half the survey respondents mentioned WhatsApp as their primary communication channel — with staff, with parents, with regional offices. We didn't build a WhatsApp integration. Instead, two enabling decisions:

- The dashboards are mobile-responsive, accessible through the mobile app and any mobile browser. A principal can pull up the data on their phone in a meeting.
- Every report — at the learner level — has a downloadable PDF version. The PDF moves through WhatsApp, email, or whichever channel the principal already uses.

We didn't try to be WhatsApp. We made sure we played nicely with it. Integrations are an investment that has to earn its place against alternatives, and an exportable PDF is cheaper and works wherever the user already works.

---

## Outcome

The dashboards rolled out to every existing principal and Network Head in the Pakistani market.

The qualitative reception was positive, primarily because the new dashboards surfaced *actionable* information quickly. Principals didn't have to dig through dozens of KPIs and assemble their own narrative from the components, the way the old product had asked them to. The information was structured around the questions they were already asking: *how are my subjects doing, which schools are struggling, which students need intervention.* The contrast with the older LMS dashboard — which the [flagship redesign](/work/lms-redesign) had also addressed — was visible.

> **Designed-for target on the original brief:** the dashboards were built to let a principal go from opening the app to identifying a candidate for intervention in under a minute, without needing a manual or asking a sales engineer what a KPI meant. The observed reception suggests the target was hit qualitatively. The quantitative measurement — weekly active principals, time-on-dashboard, action-rate from dashboard to intervention, dashboard usage in renewal conversations — is still being pulled by the outreach team and isn't yet a number I can publish here.

What I can say from the qualitative side: this was the first version of the dashboard product where principals started asking for *more* features rather than asking us to remove the existing ones. That's a leading indicator on the direction of fit.

---

## Reflection

Five principles I carry forward from this work.

- **When most of your users already do the job, your design problem is not "convince them" — it's "be better than what they're using."** A market that's actively dissatisfied with paper-and-spreadsheet tools is ready to switch. You don't need to teach them the value of the category.
- **Survey consensus this tight is a brief, not a signal.** 93.5% asking for academic results analysis and 71.7% asking for subject-wise performance isn't a hint of direction — it's a specification. Build to it.
- **What people don't ask for matters as much as what they do.** Nobody asked for teacher attendance. Listening to the absence is a senior research skill — and it kept a metric off the dashboard that several internal voices had assumed would be there.
- **Vision discipline costs you features. It saves you the wrong product.** The Financial Insights cut wasn't a scope decision; it was a product-identity decision. Once you start adding fee management, you stop being a learning platform and start being a school administration platform — a different market with a different long game.
- **Iterate in design before you iterate in engineering.** Three design versions before any engineering investment is slower up front and dramatically cheaper across the project arc. The cost of changing a Figma file is not the cost of changing a shipped feature.

The Stakeholder Dashboards were the work that fit the research the most directly across the LMS suite. When the people you're designing for tell you precisely what they want, the most senior thing you can do is build it.

---

*Role: Product Lead — led product direction, prioritization, hierarchy and scope decisions, and was actively involved across the design process • Designer of record: **[Tooba Malik](https://www.linkedin.com/in/toobamalick/)** — led discovery, requirements synthesis, IA, and UI execution • Cross-functional partners: Tayyab (backend lead), Adeel Azad / Kashif / Saddam (backend engineering), Basit Siddiqui (frontend lead) • Status: shipped at product level, used primarily in the Pakistani market • Companion case study to the [LMS flagship redesign](/work/lms-redesign)*
