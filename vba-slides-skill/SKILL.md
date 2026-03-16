---
name: vba-slides
description: >
  Create presentation slides (.pptx) for the Vibe Building Academy (VBA) programme
  using the claymorphism design system extracted from the VBA learning platform.
  Use this skill whenever the user asks for VBA slides, VBA presentation, Vibe Building Academy
  slides, lesson slides, lesson deck, or any presentation related to VBA.
  Also trigger when the user mentions "VBA", "Vibe Building Academy", "vibe builder slides",
  "lesson slides", "4 E's slides", "Range Wheel presentation", "competency slides",
  or wants to create/update a slide deck for any VBA lesson, week, or cohort.
  This skill MUST be used instead of generic pptx creation whenever VBA content is involved.
  Even if the user just says "make slides for lesson X" or "create a deck for Week 2",
  use this skill — VBA slides must always match the claymorphism design system.
---

# VBA Slides — Claymorphism Design System

This skill generates Vibe Building Academy presentation decks that match the VBA
learning platform's visual language: soft pastel backgrounds, rounded "clay" cards
with colored shadows, Nunito typography, and the 4 E's week color system.

## When to use this skill

Any time Marco (or anyone) asks for slides related to Vibe Building Academy — whether
it's a lesson deck, a week overview, a full programme deck, competency presentations,
or modifications to an existing VBA presentation.

## Quick start

1. Read `references/design-system.md` for the complete color/font/layout reference
2. Read `references/slide-builders.js` — the **complete, tested** code with all
   11 slide builder functions plus helpers
3. Copy `slide-builders.js` into your working directory, then write a script that
   `require()`s the builders and calls them to compose the requested deck
4. Run with `node your-script.js`
5. QA the output (see QA section below)

## Architecture

### Layer 1: Slide Builders (reusable library)
`references/slide-builders.js` exports:

- **Design constants**: `C` (colors), `F` (fonts), `WEEK_COLORS`, layout dimensions
- **Helpers**: `addFooter()`, `addClayCard()`, `addAccentPanel()`, `addCompetencyTags()`
- **`weekColor(n)`** — returns the accent/light/mid/dark color set for week N
- **12 slide builders** — each maps to a VBA layout template

### Layer 2: Deck Composition (per-request)
Write a short script that imports the builders and calls them in sequence for
the specific deck. This changes per request.

## The 12 Slide Types

| Builder | Layout | When to Use |
|---------|--------|-------------|
| `addLessonTitleSlide` | Lavender bg + clay card | Opening slide of any lesson |
| `addWeekIntroSlide` | Week-colored bg, centered | Week overview / phase intro |
| `addContentSlide` | Lavender bg + clay card | Teaching a concept or topic |
| `addTwoColumnSlide` | Two clay cards side by side | Comparing ideas, before/after |
| `addBuilderVsCoderSlide` | Purple vs amber cards | Showing builder > coder gap |
| `addActivitySlide` | Accent panel + white | Hands-on exercise instructions |
| `addReflectionSlide` | Accent panel + questions | Session debrief, closing questions |
| `addStatementSlide` | Bold text on accent bg | Provocations, key takeaways, quotes |
| `addPhotoSplitSlide` | Image + text split view | Screenshots, illustrations, demos |
| `addCompetencyWheelSlide` | 2x5 grid of competencies | Range Wheel overview |
| `addBreakSlide` | Centered emoji + text | Breaks, transitions |
| `addClosingSlide` | Purple bg, white text | Thank you, closing |

## Design System Summary

(Full reference in `references/design-system.md`)

### Colors (6-char hex, NO `#` prefix)
- **Lavender BG** `F0EAFF` — default slide background (~60% of slides)
- **Purple** `7C3AED` — primary accent, Week 1 / EXPLORE
- **Green** `10B981` — Week 2 / EMBRACE
- **Amber** `F59E0B` — Week 3 / EXPERIMENT
- **Pink** `EC4899` — Week 4 / EVOLVE
- **White** `FFFFFF` — clay card surfaces
- **Text** `1C1040` — deep purple-black for titles
- **Text Mid** `4A3A80` — body text
- **Text Muted** `8070B0` — captions, footer

### Fonts
- **Primary**: Nunito — the VBA web app font. Rounded, friendly, geometric.
- All four font roles (`F.title`, `F.heading`, `F.body`, `F.label`) use `"Nunito"`.
- Titles and headings use `bold: true` → renders as **Nunito Bold** (weight 700).
- Body text uses regular weight; add `bold: true` for emphasis.
- **Note**: The .pptx format only supports family name + bold on/off — heavier weights
  like Black (900) or ExtraBold (800) cannot be targeted. Nunito Bold (700) is the
  heaviest accessible weight and still looks rounded and friendly.
- **Fallback**: Change all `F.*` values to `"Poppins"` if Nunito is not available.
- Install Nunito from https://fonts.google.com/specimen/Nunito

### The Clay Card Effect
The VBA signature visual. Two stacked rounded rectangles:
1. Shadow shape (week's mid color) offset 0.12" down
2. Main card (white) on top with `rectRadius: 0.15`

### Week Color System
Each week has its own accent palette driven by `weekColor(weekNumber)`:
- Week 1 (EXPLORE): purple palette
- Week 2 (EMBRACE): green palette
- Week 3 (EXPERIMENT): amber palette
- Week 4 (EVOLVE): pink palette

### Layout Rules
- Slide size: 16:9 (10" x 5.625")
- Margins: 0.5" minimum
- Light backgrounds dominate (opposite of typical dark corporate decks)
- Footer on every slide: "Vibe Building Academy" left, "marcovanhout.com" right
- No gradients in shapes — solid fills only

### Critical pptxgenjs Rules
- Colors: 6-char hex WITHOUT `#`
- Never reuse options objects across calls
- Use `breakLine: true` between text array items
- Layout: `LAYOUT_16x9`

## Typical Lesson Deck Sequence

A lesson deck usually follows this pattern (6-10 slides):

1. **Lesson title** → `addLessonTitleSlide` — lesson name, week, type, competencies
2. **Content slides** → `addContentSlide` × 2-4 — teaching the topic
3. **Activity** → `addActivitySlide` — hands-on exercise
4. **Builder vs Coder** → `addBuilderVsCoderSlide` — (optional) competency comparison
5. **Reflection** → `addReflectionSlide` — 2-3 closing questions
6. **Statement/close** → `addStatementSlide` — key takeaway

A **week overview** deck:
1. **Week intro** → `addWeekIntroSlide`
2. **Competency wheel** → `addCompetencyWheelSlide`
3. **Lesson overviews** → series of `addLessonTitleSlide`
4. **Statement** → `addStatementSlide` with phase philosophy
5. **Closing** → `addClosingSlide`

## Building a New Deck

### Step 1: Set up
```bash
npm install pptxgenjs 2>/dev/null || npm install --prefix . pptxgenjs
```

### Step 2: Copy the builders
```bash
cp /path/to/skill/references/slide-builders.js ./vba-builders.js
```

### Step 3: Write your deck script
```javascript
const pptxgen = require("pptxgenjs");
const vba = require("./vba-builders");

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Vibe Building Academy";
  pres.title = "VBA — Lesson Title";

  // Optional: customize footer for specific cohort
  vba.setFooter({ extra: "· Cohort 1", right: "marcovanhout.com" });

  vba.addLessonTitleSlide(pres, {
    weekNumber: 1,
    phase: "EXPLORE",
    phaseTagline: "Sampling Period",
    emoji: "🔭",
    title: "Meet Your AI Co-Builder",
    subtitle: "First contact with Claude, ChatGPT, and Cursor",
    type: "self-study",
    duration: "30 min",
    competencies: [
      { icon: "💬", short: "Prompt" },
      { icon: "📡", short: "Trends" },
    ],
  });

  // ... add more slides ...

  await pres.writeFile({ fileName: "lesson-deck.pptx" });
}

build();
```

### Step 4: Using programme data
The VBA programme structure lives in the learning platform at `src/lib/data.ts`
and competencies at `src/lib/competencies.ts`. When generating a lesson deck,
use the lesson's metadata (title, subtitle, emoji, type, duration, competencies,
week number) to populate the slides.

## VBA Programme Reference

### The 4 E's Framework (mapped from David Epstein's Range)

| Week | Phase | Tagline | Epstein Concept |
|------|-------|---------|-----------------|
| 1 | EXPLORE | Sampling Period | Sampling period — try everything |
| 2 | EMBRACE | Match Quality | Match quality — find your problem |
| 3 | EXPERIMENT | Interleaving | Interleaving — connect across domains |
| 4 | EVOLVE | Test in the Open | Outsider advantage + test-and-learn |

### The 10 Vibe Builder Competencies

| # | Competency | Icon | Phase |
|---|-----------|------|-------|
| 1 | Problem Framing | 🎯 | EMBRACE |
| 2 | Design Sense | 🎨 | EMBRACE |
| 3 | Prompt Craft | 💬 | EXPLORE |
| 4 | Systems Thinking | 🔗 | EXPERIMENT |
| 5 | Ethical Awareness | ⚖️ | EMBRACE |
| 6 | Trend Literacy | 📡 | EXPLORE |
| 7 | Storytelling | 📖 | EVOLVE |
| 8 | Domain Bridging | 🌉 | EMBRACE |
| 9 | Experimentation | ⚡ | EXPERIMENT |
| 10 | Ship Discipline | 🚀 | EVOLVE |

## QA Pipeline

After generating a deck, always verify:

### Content QA
```bash
pip install markitdown --break-system-packages 2>/dev/null
python3 -c "from markitdown import MarkItDown; m=MarkItDown(); r=m.convert('output.pptx'); print(r.text_content)" | head -200
```
Check: all slide titles present, no missing content, correct sequence.

### Visual QA
```bash
python3 scripts/office/soffice.py output.pptx output.pdf
pdftoppm -jpeg -r 150 output.pdf slide
```
Then inspect the generated JPGs. Use a subagent for fresh-eyes review if available.

### Common Issues
- **Clay cards**: Verify shadow shape is behind the main card (draw order matters)
- **Nunito font**: If not installed on the system, PowerPoint substitutes Calibri — this is expected
- **Emoji rendering**: Renders correctly in PowerPoint/Keynote, may show as boxes in LibreOffice
- **Week colors**: Verify the correct accent color is used for the lesson's week number
- **Competency tags**: Keep to 3-4 per slide max to avoid overflow
