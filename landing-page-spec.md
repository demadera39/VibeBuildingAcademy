# VibeBuildingAcademy — Landing Page Build Spec
> Feed this file directly to Claude Code to build the landing page.

---

## Project Overview

Build a single-page landing page for **VibeBuildingAcademy** — a professional learning programme helping corporate and non-profit employees become "vibe builders": people who use AI tools to create software, tools, and products without needing to write code.

**Goal of the page:** Capture email signups / waitlist registrations for the first cohort.

**Primary audience:** Corporate and non-profit employees who can access employer L&D budgets.

**Tone:** Confident, energetic, and human. Not corporate-speak. Not hype. Grounded in real data and real examples.

---

## Tech Stack

- **Single HTML file** — no build tools, no frameworks, no dependencies except what's loaded from CDN
- Vanilla HTML + CSS + JavaScript
- **Fonts:** Load `Inter` from Google Fonts (primary body), `Sora` for headings (bold, geometric — matches the vibe)
- **Icons:** Use Lucide icons via CDN (`https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`)
- **Form handling:** Use [Tally.so](https://tally.so) embed for the signup form (embed as iframe or Tally popup button). Tally form ID = `TO BE REPLACED` — use a placeholder `YOUR_TALLY_FORM_ID` so the owner can swap it in
- **Analytics:** Include a placeholder comment `<!-- Add your analytics snippet here -->` in `<head>`
- **Output:** Single file `index.html`, self-contained

---

## Design System

### Colors
```
--color-dark:     #1E1B4B   /* Deep indigo — main dark */
--color-accent:   #4F46E5   /* Electric indigo — primary CTA, links */
--color-teal:     #0D9488   /* Teal — secondary accents */
--color-amber:    #F59E0B   /* Amber — highlights, warnings */
--color-green:    #10B981   /* Emerald — positive stats */
--color-red:      #EF4444   /* Red — problem framing */
--color-white:    #FFFFFF
--color-light:    #F8FAFC   /* Section backgrounds */
--color-card:     #EEF2FF   /* Card backgrounds */
--color-ink:      #1E1B4B   /* Body text */
--color-muted:    #64748B   /* Secondary text */
--color-border:   #E2E8F0   /* Card borders */
```

### Typography
```
Headings (h1, h2, h3): "Sora", sans-serif — bold, tight letter-spacing
Body: "Inter", sans-serif
```

### Sizing scale
- Max content width: `1100px`, centered with auto margins
- Section padding: `80px 24px` desktop, `56px 20px` mobile
- Border radius on cards: `12px`
- Card shadows: `0 2px 16px rgba(0,0,0,0.07)`

### Responsive breakpoints
- Desktop: `> 900px`
- Mobile: `≤ 900px` — all multi-column grids collapse to single column

---

## Page Sections (in order)

---

### SECTION 1 — Navigation Bar (sticky)

**Layout:** Sticky top nav, white background with subtle `box-shadow`.

**Left:** Logo text — `Vibe` in `--color-accent` bold + `Building` in `--color-dark` bold + `Academy` in `--color-muted` normal weight. Use font-size ~20px.

**Right:** Two items:
- `How it works` — smooth-scroll anchor link to `#how-it-works`
- `Join the first cohort →` — CTA button in `--color-accent` with white text, rounded, scrolls to `#signup`

**Mobile:** Collapse nav links, keep just the logo and the CTA button.

---

### SECTION 2 — Hero

**Background:** Dark (`--color-dark`) with a subtle radial gradient towards bottom-right in indigo tones. Add 2–3 decorative blurred circles (CSS `blur`, semi-transparent indigo/teal) in the background as abstract shapes, positioned top-right and bottom-right.

**Layout:** Centered, max-width 780px

**Content (top to bottom):**

1. Small pill/badge above heading:
   - Text: `🚀  First cohort — limited seats`
   - Style: pill with border, `--color-accent` border, light indigo background, small text (~13px)

2. **H1 heading** (large, white):
   ```
   Build What You Never
   Could Before
   ```
   Font size: `clamp(40px, 6vw, 72px)`. "Never Could Before" on its own line. Consider making "Never Could Before" in `--color-accent` (lighter indigo tone `#818CF8`) to differentiate.

3. **Subheading** (below H1, ~18px, muted white `#A5B4FC`):
   ```
   VibeBuildingAcademy is a blended learning programme that guides
   corporate and non-profit employees to become AI-powered builders —
   creating tools, products, and solutions that matter in their work.
   ```

4. **Two CTA buttons** side by side:
   - Primary: `Join the first cohort →` — solid `--color-accent`, white text, large padding
   - Secondary: `How it works` — outlined, white border, white text, transparent background
   - Both scroll to their respective anchor sections

5. **Social proof line** below buttons (small, muted):
   - Text: `Accessible via your employer's L&D budget · No personal cost required`
   - Style: small italic text in `#6366F1`

6. **Stat strip** — horizontal row of 3 quick stats, slightly below hero text, with a subtle divider above:
   - `$400B` / corporate training market being disrupted
   - `85%` / of organisations increasing upskilling spend
   - `$874` / average L&D budget per employee per year
   - Each stat: large bold number in `--color-teal`, label below in muted white

---

### SECTION 3 — The Moment (Origin Story)

**Background:** White (`--color-white`)

**Layout:** Two-column — left 55%, right 45% — on desktop. Stack on mobile.

**Left column:**

Small eyebrow label (uppercase, spaced, `--color-accent`): `THE INFLECTION POINT`

**H2:** `February 2025: A New Era Began`

Body text (~16px, `--color-ink`):
```
Andrej Karpathy — co-founder of OpenAI, former AI Director at Tesla —
coined a phrase that changed everything: "vibe coding."

He described a new way of building software where you "fully give in
to the vibes, embrace exponentials, and forget that the code even exists."
Within weeks, it went viral. Within months, it reshaped how the world thinks
about who can build software.
```

Large pull-quote block (styled like a blockquote with a left border in `--color-accent`):
```
"I just see stuff, say stuff, run stuff, and it mostly works."
— Andrej Karpathy
```

**Right column:**

4 small cards (stacked vertically), each with:
- Bold label (e.g. `Collins Dictionary`)
- Fact below it (e.g. `Named "vibe coding" Word of the Year, 2025`)
- Light indigo card background (`--color-card`), border `#C7D2FE`

Card data:
1. `Collins Dictionary` → `Word of the Year 2025`
2. `Y Combinator` → `25% of its Winter 2025 startups had 95% AI-generated codebases`
3. `Merriam-Webster` → `Listed "vibe coding" as slang & trending`
4. `Bolt.new` → `Reached $40M ARR in just 5 months — non-technical builders flooding in`

---

### SECTION 4 — From Vibe Coding to Vibe Building

**Background:** Light (`--color-light`)

**Layout:** Centered heading, then two cards side by side.

**Eyebrow:** `THE EVOLUTION`

**H2:** `This Isn't Just for Developers Anymore`

Body paragraph (centered, max-width 640px):
```
Vibe coding accelerated how developers write software. Vibe building is
something bigger: it gives non-technical people — for the first time ever —
the ability to create working products and services from scratch. No CS degree.
No dev team. No six-month procurement cycle.
```

**Two comparison cards:**

Left card (border top `--color-accent`):
- Label: `VIBE CODING`
- Subtitle: `AI as a coding accelerator`
- 4 bullet points:
  - Developers write code 10× faster
  - Natural language drives code generation
  - Still primarily for technical users
  - Accelerates existing workflows

Right card (border top `--color-teal`):
- Label: `VIBE BUILDING`
- Subtitle: `AI as a creation superpower`
- 4 bullet points:
  - Non-technical people build working products
  - Ideas become apps, tools, services — fast
  - No code required — open to everyone
  - Creates businesses and solutions that never existed

**Below cards:** A single bold call-out line (centered, ~20px, `--color-dark`):
```
VibeBuildingAcademy exists to unlock this superpower for professionals
who have never written a line of code.
```

---

### SECTION 5 — The Problem

**Background:** White

**Layout:** Centered heading, then 3 cards in a row.

**Eyebrow:** `THE PROBLEM`

**H2:** `Existing Training Is Missing the Mark`

Intro text (centered):
```
The tools are ready. The market is ready. But corporate training hasn't caught up.
Here's what's missing:
```

**3 problem cards** (red top border accent, white background, shadow):

Each card has:
- A red `✕` icon in a light red circle at top
- Bold title
- Paragraph description

Card 1:
- Title: `Generic AI Literacy`
- Desc: `Most training teaches "what is AI" or "how to use ChatGPT." It doesn't teach people to BUILD — to go from an idea to a working product that solves a real problem in their organisation.`

Card 2:
- Title: `No Professional Context`
- Desc: `Bootcamps target developers or general audiences. Nothing is designed around what corporate or non-profit employees actually need to create: tools for their team, automations for their workflow, products for their customers.`

Card 3:
- Title: `No Output, No Community`
- Desc: `Traditional e-learning has no accountability, no peer group, and no real deliverable. Learners disengage within days. Learning budgets are wasted on certificates nobody uses.`

**Below cards:** Red italic line:
```
Result: Employees leave training unchanged. Organisations lose L&D budget with no visible ROI.
```

---

### SECTION 6 — Introducing VibeBuildingAcademy

**Background:** Dark (`--color-dark`) with decorative blurred circles (indigo, teal) in top-right and bottom-left

**Layout:** Centered, max-width 820px

**Eyebrow:** `THE SOLUTION` (light indigo, `#A5B4FC`)

**H2** (white, large):
```
VibeBuildingAcademy
```

**Subheading** (lighter indigo, `#A5B4FC`, ~18px):
```
The first professional learning programme built specifically for vibe building.
```

Body text (soft white `#CBD5E1`):
```
We guide working professionals and non-profit employees to become vibe builders —
using AI to create tools, products, and solutions that matter in their work.
Every participant works on something they could immediately use in their job,
or start a business with.
```

**3 pillar boxes** (dark navy card `#2D2B5B`, teal top border, arranged in a row):

Box 1:
- Title: `Work on what matters`
- Desc: `Participants build something immediately useful in their own professional context — not a generic exercise.`

Box 2:
- Title: `Truly blended learning`
- Desc: `Live kickoffs, peer circles, async video, and assignments. Not just another video course you'll never finish.`

Box 3:
- Title: `Real output, every time`
- Desc: `Every participant leaves with a working tool, prototype, or business concept. Visible ROI your L&D team can report on.`

---

### SECTION 7 — How It Works

**ID:** `how-it-works` (anchor target for nav link)

**Background:** Light (`--color-light`)

**Eyebrow:** `THE PROGRAMME`

**H2:** `A Blended Experience That Actually Works`

**4 numbered steps** in a horizontal row (collapse to vertical on mobile). Each step is a card:

Step card structure:
- Dark header block with large number (`01`, `02`, etc.) in electric indigo `#818CF8`
- White card body below
- Bold step name
- Italic sub-label (tool/format used)
- Description paragraph

Steps:
1. `01` / `Live Kickoff` / *Webinar · Zoom* / `Cohort formation, goal-setting, and expert framing. Meet your peers and define exactly what YOU will build over the programme.`
2. `02` / `Peer Circle` / *Community (Circle)* / `Accountability groups of 4–6 peers. Weekly check-ins, feedback, and mutual support from kickoff to final project.`
3. `03` / `Async Learning` / *Video · Podcast* / `Short, focused modules on tools, techniques, and mindset shifts. Learn at your own pace, on your own schedule.`
4. `04` / `Build & Ship` / *Assignments* / `Hands-on projects tied directly to your work context. You leave with a real, working output — not just a completion certificate.`

**Below steps:** Horizontal scrolling row of tool logos (text-only pill badges, no actual images needed):
Label: `Powered by:`
Pills: `Lovable` · `Bolt.new` · `Replit` · `Claude` · `n8n` · `v0` · `Cursor`
Style: rounded pill, light indigo background, `--color-accent` text

---

### SECTION 8 — Who Is This For

**Background:** White

**Eyebrow:** `WHO IT'S FOR`

**H2:** `Built for the Ambitious Professional`

**3 profile cards** side by side (collapse on mobile):

Each card:
- Colored top bar (20px height): accent/teal/amber respectively
- Title (bold, ~16px)
- Organisation type (italic, colored)
- Description paragraph
- 3 checkbox-style tag pills at bottom (`✓ tag text`)

Card 1 (accent/indigo):
- Title: `The Idea-Rich Employee`
- Org: `Corporate · Non-profit`
- Desc: `Has great ideas for improving workflows, products, or customer experiences — but was always told "wait for IT." Now they can build it themselves, on their own timeline.`
- Tags: `Learning budget available` · `Employer-sponsored` · `Uses internal tools`

Card 2 (teal):
- Title: `The Aspiring Intrapreneur`
- Org: `Mid to senior professional`
- Desc: `Wants to launch a new initiative, internal product, or side project but lacks technical skills. Ready to use AI to close the gap — permanently.`
- Tags: `Budget holder or influencer` · `Innovation-minded` · `Results-oriented`

Card 3 (amber):
- Title: `The Career Adapter`
- Org: `Any industry · Any role`
- Desc: `Sees AI disruption coming and wants to stay ahead. Understands that building capability — not just using AI — is the real competitive edge.`
- Tags: `L&D budget user` · `Self-motivated` · `Future-focused`

**Below cards:** Bold indigo line (centered):
```
Accessible via your employer's L&D budget or learning allowance — no personal investment required.
```

---

### SECTION 9 — What You'll Build

**Background:** Light (`--color-light`)

**Eyebrow:** `REAL OUTCOMES`

**H2:** `What Participants Actually Build`

**Layout:** Two columns — left has 4 example rows, right has a dark principle box.

**Left — 4 example rows** (each with teal left border, light background):

Row 1:
- Category: `Internal Tools`
- Examples: `Org chart apps · Onboarding assistants · Reporting automations · Dashboard builders`

Row 2:
- Category: `Customer-Facing Products`
- Examples: `Client portals · Patient journey apps · Quote generators · Intake forms`

Row 3:
- Category: `Workflow Automations`
- Examples: `Document processors · Email assistants · Data pipelines · Scheduling tools`

Row 4:
- Category: `New Business Ventures`
- Examples: `SaaS micro-apps · Niche platforms · Marketplace tools — fully AI-built`

**Right — Principle box** (dark `--color-dark` background, white text):
- Small label: `The Principle` (light indigo)
- Quote: *"Every participant works on something they could immediately use in their work — or start a business with."*
- Body: `Not generic exercises. Not artificial case studies. Your real problem. Your real solution.`

---

### SECTION 10 — Social Proof / Vibe Builder Stories

**Background:** White

**Eyebrow:** `PROOF IT WORKS`

**H2:** `People Are Already Building at Scale`

Intro:
```
These are real people who built real things — without a developer in sight.
VibeBuildingAcademy gives you the guidance, structure, and community to do the same.
```

**4 story cards in a 2×2 grid** (collapse to single column mobile):

Each card:
- Bold name + role
- Italic small outcome stat (right side of card, highlighted)
- Short story paragraph
- Left accent border in `--color-accent`

Card 1:
- Name: `Maor Shlomo` / Role: `Solo Founder → Acquired by Wix`
- Stat: `$80M exit`
- Story: `Built startup Base44 in 6 months, reached $1M ARR in 3 weeks, grew to 250,000 users — then sold to Wix for $80 million cash. No engineering team.`

Card 2:
- Name: `Jack Dorsey` / Role: `CEO, Block`
- Stat: `1-day prototype`
- Story: `Built Bitchat, a peer-to-peer messaging app, almost entirely with AI. Described the features in natural language and had a working prototype the same day.`

Card 3:
- Name: `Pieter Levels` / Role: `Indie developer`
- Stat: `$1M/year revenue`
- Story: `Created a multiplayer game earning $1 million annually — and built it in just 17 days using AI-driven coding tools. No team, no VC, no prior game experience.`

Card 4:
- Name: `Kelsey (HR team)` / Role: `Non-technical employee at Replit`
- Stat: `3-day build`
- Story: `Replaced enterprise org chart software in 3 days with a custom solution that had every feature they needed. Zero engineering resources consumed.`

---

### SECTION 11 — Market Urgency / Why Now

**Background:** Light (`--color-light`)

**Eyebrow:** `WHY NOW`

**H2:** `The Window Is Open`

**3 horizontal rows**, each with left green border, bold title, description, and a right-aligned stat callout.

Row 1:
- Title: `The Tools Are Finally Ready`
- Desc: `Lovable, Bolt.new, Replit, and others have crossed the threshold. Non-technical users can now build production-grade tools without writing a single line of code.`
- Stat: `2024–2025` / `when the tools matured`

Row 2:
- Title: `Awareness Has Gone Mainstream`
- Desc: `"Vibe coding" is a Collins Dictionary Word of the Year. CEOs, HR leaders, and L&D managers are asking: how do we bring this into our organisation?`
- Stat: `4.5M+` / `views on Karpathy's original post`

Row 3:
- Title: `The Education Category Is Empty`
- Desc: `No one has yet built a professional-grade, employer-sponsored programme specifically for vibe building. First movers define the category — and their careers.`
- Stat: `First` / `programme of its kind`

---

### SECTION 12 — Signup / Waitlist

**ID:** `signup` (anchor target for all CTA buttons)

**Background:** Dark (`--color-dark`) with decorative blurred circles

**Eyebrow:** `JOIN US` (light indigo)

**H2** (white, large):
```
Join the First Cohort
```

**Subheading** (muted white):
```
Limited seats. Designed for professionals who are ready to start building.
```

**3 feature bullets** (horizontal row, centered):
- `✓ Employer L&D budget eligible`
- `✓ Real output guaranteed`
- `✓ Live + community + async`

Each bullet: small, white text with checkmark in `--color-teal`

**Signup form block** (centered card, white background, `border-radius: 16px`, `max-width: 520px`):

Form fields:
1. `First name` — text input
2. `Last name` — text input
3. `Work email` — email input
4. `Organisation` — text input
5. `Role / function` — text input (e.g. Marketing, HR, Product, Operations, etc.)
6. `What would you build?` — textarea (placeholder: `e.g. An automation for our onboarding process, a client-facing dashboard, a new product idea...`)
7. `How did you hear about us?` — select dropdown with options: LinkedIn, Google, Word of mouth, Other

Submit button: full-width, `--color-accent` background, white text, large, `→ Reserve my spot`

Small disclaimer text below button:
```
We'll be in touch within 48 hours to discuss fit and budget options.
No obligation to enrol.
```

**Note for implementation:** This can either be:
- A real HTML form (add `action` attribute for a form service like Formspree: `https://formspree.io/f/YOUR_FORM_ID`)
- OR replaced with a Tally embed (comment in code indicates where to swap)
- Default: use Formspree with placeholder ID

**Below the form card:** Text line:
```
Questions? Email us at demadera@marcovanhout.com
```
Styled as a clickable mailto link in `--color-teal`.

---

### SECTION 13 — FAQ

**Background:** White

**H2:** `Frequently Asked Questions`

**Accordion-style** (click to expand/collapse) — pure CSS + minimal JS. One question open at a time.

Questions and answers:

Q1: `Who is this programme designed for?`
A: `VibeBuildingAcademy is designed for corporate and non-profit employees who want to use AI to build tools, products, or automations in their professional context — without needing to write code. No technical background required. If you have ideas and want to make them real, this is for you.`

Q2: `Can my employer pay for this?`
A: `Yes — that's our primary model. The programme is designed to be accessed through employer L&D budgets and learning allowances. We can provide all documentation needed for budget approval, including learning objectives, expected outcomes, and invoicing details.`

Q3: `Do I need any technical skills?`
A: `None. The programme is built for non-technical professionals. You will learn to use AI tools (like Lovable, Bolt.new, Replit, and Claude) through guided exercises, step-by-step assignments, and peer support. If you can use a spreadsheet, you can vibe build.`

Q4: `What will I actually build?`
A: `You will work on a real project connected to your own work or business idea — not a generic exercise. Past examples include internal dashboards, customer-facing tools, onboarding automations, and even early-stage product prototypes. You leave with something working.`

Q5: `What's the time commitment?`
A: `Approximately 3–4 hours per week, including the live kickoff session, peer circle check-in, async module watching, and working on your project. The programme runs over [X weeks — to be confirmed]. Everything except the live kickoff is async and on your schedule.`

Q6: `How big are cohorts?`
A: `We deliberately keep cohorts small — maximum [X participants — to be confirmed] — to ensure quality peer connections and personalised support. Peer circles are 4–6 people.`

Q7: `What happens after I sign up?`
A: `We'll review your application and reach out within 48 hours to discuss fit, cohort timing, and budget options. There's no obligation to enrol at the sign-up stage.`

Q8: `Is there a certificate?`
A: `Yes. Participants who complete the programme receive a VibeBuildingAcademy certificate of completion, along with their finished project as evidence of real capability — which we believe is far more valuable than the certificate itself.`

---

### SECTION 14 — Footer

**Background:** Dark (`--color-dark`)

**Layout:** Two columns — left is branding, right is links.

**Left:**
- Logo text: `VibeBuildingAcademy` in white bold
- Tagline: `Build What You Never Could Before` — muted indigo
- Email link: `demadera@marcovanhout.com` in teal
- © 2025 VibeBuildingAcademy. All rights reserved.

**Right:**
- Small nav links (muted white, hover to white):
  - How it works
  - Who it's for
  - Sign up
  - Contact

---

## Behaviour & Interactions

- **Sticky nav** scrolls away on scroll-down, reappears on scroll-up (or just always sticky, simpler)
- **Smooth scroll** for all anchor links
- **FAQ accordion** — clicking a question toggles its answer. Clicking another closes the currently open one.
- **Form validation** — basic HTML5 validation on required fields. On submit show a simple inline success message: `"Thanks! We'll be in touch within 48 hours."`
- **Scroll-triggered fade-in** — sections fade in with a subtle `opacity: 0 → 1` and `translateY(20px → 0)` as they enter the viewport. Use `IntersectionObserver`. Keep it subtle — not distracting.

---

## SEO & Meta

In the `<head>`:

```html
<title>VibeBuildingAcademy — Build What You Never Could Before</title>
<meta name="description" content="A blended learning programme helping corporate and non-profit employees become vibe builders — using AI to create tools, products, and solutions. No code required.">
<meta name="keywords" content="vibe building, AI learning, no-code, corporate training, upskilling, L&D, vibe coding">
<meta property="og:title" content="VibeBuildingAcademy — Build What You Never Could Before">
<meta property="og:description" content="The first professional learning programme for vibe building. Accessible via employer L&D budgets.">
<meta property="og:image" content="https://vibebuilding.academy/og-image.png">
<meta property="og:url" content="https://vibebuilding.academy">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://vibebuilding.academy">
```

---

## Things to Replace / Configure Before Going Live

| Placeholder | Replace with |
|---|---|
| `YOUR_TALLY_FORM_ID` | Your actual Tally.so form ID |
| Formspree `YOUR_FORM_ID` | Your Formspree form endpoint |
| `[X weeks — to be confirmed]` | Actual programme duration |
| `[X participants — to be confirmed]` | Actual cohort size cap |
| `demadera@marcovanhout.com` | Confirm this is the right contact email |
| `og-image.png` | Create a 1200×630px OG image for social sharing |
| Analytics snippet | Google Analytics / Plausible / Fathom code |

---

## Implementation Notes for Claude Code

1. Build as a single `index.html` file — all CSS in a `<style>` block in `<head>`, all JS at bottom of `<body>`
2. Do not use any npm packages, build tools, or external CSS frameworks
3. Keep the file well-commented with section labels matching the spec section names
4. Mobile-first CSS — write base styles for mobile, use `@media (min-width: 900px)` for desktop overrides
5. The scroll-triggered animation should use `IntersectionObserver` with `{ threshold: 0.1 }` — add class `visible` to trigger the transition
6. Use CSS custom properties (variables) for all colours so they're easy to change globally
7. The FAQ accordion should work with zero dependencies — CSS + minimal vanilla JS
8. Ensure all text is selectable (don't use `user-select: none` anywhere important)
9. All CTA buttons should have `:hover` state with slightly darker background
10. The decorative circles in dark sections should use `pointer-events: none` so they don't block clicks
