# Vibe Building Academy — Slide Design System
## Derived from the VBA Claymorphism Web Design System

---

## Color Palette

The VBA palette is pastel-forward with bold accent colors and soft shadows —
the opposite of the typical corporate dark-bg deck. Slides should feel warm,
playful, and energising — like the web app.

| Role | Hex | CSS Var | Usage |
|------|-----|---------|-------|
| **Background** | `F0EAFF` | `--bg` | Default slide background — light lavender |
| **Purple** | `7C3AED` | `--purple` | Primary accent, titles, CTA elements |
| **Purple Dark** | `5221B5` | `--purple-sh` | Shadows, pressed states |
| **Purple Light** | `EDE9FE` | `--purple-lt` | Card/panel fills, soft highlights |
| **Purple Mid** | `C4B5FD` | `--purple-mid` | Clay shadow color, borders |
| **Green** | `10B981` | `--green` | Success, completed, Week 2 accent |
| **Green Light** | `D1FAE5` | `--green-lt` | Week 2 backgrounds |
| **Green Mid** | `A7F3D0` | `--green-mid` | Week 2 shadows |
| **Amber** | `F59E0B` | `--amber` | Highlight, callouts, Week 3 accent |
| **Amber Light** | `FEF3C7` | `--amber-lt` | Week 3 backgrounds |
| **Amber Mid** | `FDE68A` | `--amber-mid` | Week 3 shadows |
| **Pink** | `EC4899` | `--pink` | Emphasis, Week 4 accent |
| **Pink Light** | `FCE7F3` | `--pink-lt` | Week 4 backgrounds |
| **Pink Mid** | `FBCFE8` | `--pink-mid` | Week 4 shadows |
| **Blue** | `3B82F6` | `--blue` | Links, secondary actions |
| **Blue Light** | `DBEAFE` | `--blue-lt` | Info panels |
| **Coral** | `F97316` | `--coral` | Warm emphasis |
| **Text** | `1C1040` | `--text` | Primary text — deep purple-black |
| **Text Mid** | `4A3A80` | `--text-mid` | Body text, descriptions |
| **Text Muted** | `8070B0` | `--text-muted` | Captions, labels |
| **White** | `FFFFFF` | — | Card surfaces, text on dark |

### Week Color Map (slide accent per week)

| Week | Phase | Accent | Light BG | Shadow |
|------|-------|--------|----------|--------|
| 1 | EXPLORE | `7C3AED` purple | `EDE9FE` | `C4B5FD` |
| 2 | EMBRACE | `10B981` green | `D1FAE5` | `A7F3D0` |
| 3 | EXPERIMENT | `F59E0B` amber | `FEF3C7` | `FDE68A` |
| 4 | EVOLVE | `EC4899` pink | `FCE7F3` | `FBCFE8` |

### Usage Rules
- **Light backgrounds dominate** — most slides use `F0EAFF` or white. This is the opposite of BSA.
- **Week accent color** drives the visual identity of each lesson deck.
- **No gradients in shapes** — solid fills only (the web app uses gradient buttons, but slides stay flat).
- **"Clay" shadows** are represented by a second, slightly offset shape with the mid-tone color.
- **White cards** on lavender backgrounds — the signature VBA look.

---

## Typography

### Font
- **Nunito** for everything — headers bold/black, body semibold/regular.
- Fallback in PowerPoint: **Nunito** (if installed), otherwise **Calibri Rounded** or **Calibri**.

### Size Scale

| Element | Size | Weight | Case |
|---------|------|--------|------|
| Slide title | 36–44pt | Black (900) | Mixed case |
| Week/phase label | 14–18pt | ExtraBold (800) | UPPERCASE |
| Section header | 24–28pt | Black (900) | Mixed case |
| Body text | 14–16pt | SemiBold (600) | Mixed case |
| Caption/meta | 10–12pt | Bold (700) | Mixed case |
| Large emoji | 48–72pt | — | — |
| Competency tag | 10–11pt | Bold (700) | Mixed case |

### Text Color Rules
- Light slides: `1C1040` (deep purple) for titles, `4A3A80` for body, `8070B0` for muted
- On accent-colored panels: `FFFFFF` white text
- Keywords/emphasis: accent color of the current week

---

## Layout Templates

All slides are 16:9 (10" x 5.625"). Margins 0.5" minimum.

### 1. TITLE SLIDE (Lesson opener)
```
┌──────────────────────────────────────────┐
│          F0EAFF (lavender bg)            │
│                                          │
│  [Week emoji - 48pt]                     │
│  WEEK N · PHASE           [accent color] │
│  Lesson Title        [36pt black weight] │
│  Subtitle              [16pt text-mid]   │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │ WHITE CLAY CARD (rounded, shadow)   │ │
│  │ 🔨 Build Session · 45 min          │ │
│  │ Competency tags: 🎯 Frame 🎨 Design│ │
│  └─────────────────────────────────────┘ │
│                                          │
│ ── FOOTER ─────────────────────────────  │
│ Vibe Building Academy     marcovanhout.com│
└──────────────────────────────────────────┘
```

### 2. SECTION SLIDE (Phase intro / week opener)
```
┌──────────────────────────────────────────┐
│     ACCENT-LIGHT BG (e.g., EDE9FE)      │
│                                          │
│  [Phase emoji - 72pt, centered]          │
│                                          │
│  WEEK N · PHASE TAG     [accent color]   │
│  Week Title          [44pt black weight] │
│  Week description      [16pt text-mid]   │
│                                          │
│ ── FOOTER ─────────────────────────────  │
└──────────────────────────────────────────┘
```

### 3. CONTENT SLIDE (Main teaching content)
```
┌──────────────────────────────────────────┐
│          F0EAFF (lavender bg)            │
│                                          │
│  Section Header        [28pt text color] │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │ WHITE CLAY CARD                     │ │
│  │                                     │ │
│  │ Body text with key concepts...      │ │
│  │                                     │ │
│  └─────────────────────────────────────┘ │
│                                          │
│ ── FOOTER ─────────────────────────────  │
└──────────────────────────────────────────┘
```

### 4. TWO-COLUMN CARD SLIDE
```
┌──────────────────────────────────────────┐
│          F0EAFF (lavender bg)            │
│                                          │
│  Section Header        [28pt text color] │
│                                          │
│  ┌──────────────┐  ┌──────────────────┐ │
│  │ CLAY CARD 1  │  │ CLAY CARD 2      │ │
│  │ (accent-lt)  │  │ (white)          │ │
│  │ Key idea     │  │ Supporting       │ │
│  │              │  │ detail           │ │
│  └──────────────┘  └──────────────────┘ │
│                                          │
│ ── FOOTER ─────────────────────────────  │
└──────────────────────────────────────────┘
```

### 5. BUILDER VS CODER SLIDE (Competency comparison)
```
┌──────────────────────────────────────────┐
│          F0EAFF (lavender bg)            │
│                                          │
│  [Competency icon] Competency Name       │
│                                          │
│  ┌──────────────┐  ┌──────────────────┐ │
│  │ PURPLE CARD  │  │ AMBER CARD       │ │
│  │ Vibe Builder │  │ Vibe Coder       │ │
│  │ "Builders    │  │ "Coders          │ │
│  │  rewrite it" │  │  accept it"      │ │
│  └──────────────┘  └──────────────────┘ │
│                                          │
│ ── FOOTER ─────────────────────────────  │
└──────────────────────────────────────────┘
```

### 6. ACTIVITY SLIDE (Accent panel + white)
```
┌──────────────────────────────────────────┐
│ ACCENT PANEL │ WHITE AREA (~67%)         │
│ (~33%)       │                           │
│              │ Activity Title    [28pt]  │
│ Activity N   │                           │
│ [bold white  │ Instructions / steps      │
│ instruction] │ with bullet points        │
│              │                           │
│ ── FOOTER ─────────────────────────────  │
└──────────────────────────────────────────┘
```

### 7. REFLECTION SLIDE (Accent panel + questions)
```
┌──────────────────────────────────────────┐
│ ACCENT PANEL │ WHITE AREA               │
│              │                           │
│ REFLECTION   │ Bold question 1?         │
│ (white text) │                           │
│              │ Bold question 2?         │
│              │                           │
│              │ Bold question 3?         │
│              │                           │
│ ── FOOTER ─────────────────────────────  │
└──────────────────────────────────────────┘
```

### 8. STATEMENT SLIDE (Bold provocation on accent bg)
```
┌──────────────────────────────────────────┐
│         ACCENT COLOR BG (solid)          │
│                                          │
│     "Large bold white text               │
│      centered on slide"     [36pt]       │
│                                          │
│     — Optional attribution  [14pt]       │
│                                          │
│ ── FOOTER ─────────────────────────────  │
└──────────────────────────────────────────┘
```

### 9. COMPETENCY WHEEL SLIDE (Range Wheel overview)
```
┌──────────────────────────────────────────┐
│          F0EAFF (lavender bg)            │
│                                          │
│  🎯 Your Range Wheel      [28pt title]  │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │ 10 competency items in 2x5 grid    │ │
│  │ Each: icon + name + short desc     │ │
│  │ Colored by their competency color  │ │
│  └─────────────────────────────────────┘ │
│                                          │
│ ── FOOTER ─────────────────────────────  │
└──────────────────────────────────────────┘
```

### 10. BREAK / TRANSITION SLIDE
```
┌──────────────────────────────────────────┐
│              WHITE                        │
│                                          │
│     [Large emoji - 72pt]                 │
│     Break text         [28pt bold]       │
│     Time indication    [14pt muted]      │
│                                          │
│ ── FOOTER ─────────────────────────────  │
└──────────────────────────────────────────┘
```

### 11. THANK YOU / CLOSING SLIDE
```
┌──────────────────────────────────────────┐
│         PURPLE BG (7C3AED)               │
│                                          │
│     Vibe Building Academy                │
│     [44pt white bold]                    │
│                                          │
│     tagline / URL       [16pt white]     │
│                                          │
│ ── FOOTER ─────────────────────────────  │
└──────────────────────────────────────────┘
```

---

## Clay Card Effect in PowerPoint

The VBA signature is the "clay card" — a white rounded rectangle with a colored
bottom shadow that gives a soft 3D, toy-like feel.

Implementation in pptxgenjs:
1. Add a shadow rectangle first (offset down ~0.12"):
   `ROUNDED_RECTANGLE` with `fill: { color: "C4B5FD" }` (or week mid color)
2. Add the main card on top:
   `ROUNDED_RECTANGLE` with `fill: { color: "FFFFFF" }`, `rectRadius: 0.15`

Alternatively, use pptxgenjs shadow:
```javascript
shadow: { type: "outer", color: weekMid, blur: 0, offset: 8, angle: 180, opacity: 1 }
```
Note: pptxgenjs shadow with blur:0 and full opacity at 180° angle gives the
closest clay effect, but test carefully as shadow rendering varies.

**Recommended approach**: Use two stacked shapes for reliability.

---

## Footer (Every Slide)

- Left: "Vibe Building Academy" (semibold) + "· Cohort [N]" (regular)
- Right: "marcovanhout.com" (muted)
- Font: Nunito 8pt, color `8070B0` on light slides, `FFFFFF` on dark/accent slides
- Position: bottom of slide, 0.15" from edge

---

## Spacing & Margins

| Element | Value |
|---------|-------|
| Slide margins | 0.5" minimum all sides |
| Accent panel width | ~33% (3.3") on activity/reflection slides |
| Between content blocks | 0.3–0.5" |
| Clay card padding | 0.4" internal |
| Card border radius | 0.15" (rectRadius) |
| Footer from bottom | 0.15" |
| Title from top | 0.5–0.8" |

---

## Competency Tag Chips

Small rounded pill shapes showing which competencies a lesson covers:

```javascript
// Each chip: colored rounded rect + icon + short name
// Background: competency color at ~15% opacity (use light version)
// Text: competency color, 10pt bold
// Size: auto-width, 0.3" height
```

---

## Lesson Deck Sequence

A typical VBA lesson deck follows this pattern:

1. **Title slide** — Lesson name, week, type, competencies
2. **Context/concept slides** — 2-4 content slides explaining the topic
3. **Activity slide** — Hands-on exercise instructions
4. **Builder vs Coder** — (optional) Competency comparison
5. **Reflection slide** — 2-3 reflection questions
6. **Closing** — Key takeaway or statement slide
