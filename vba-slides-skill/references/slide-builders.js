/**
 * VBA Slide Builders — Claymorphism Design System (v2)
 * Reusable library of slide builder functions for Vibe Building Academy presentations.
 *
 * Translated from the VBA web app's claymorphism design system:
 * soft pastel backgrounds, rounded white "clay" cards with colored shadows,
 * rounded typography, and the 4 E's week color system.
 *
 * FONT STRATEGY:
 *   The VBA web app uses Nunito — a lovely rounded sans-serif. The .pptx
 *   format only supports family name + bold on/off, so the heaviest weight
 *   we can reliably access is Nunito Bold (700) via bold: true. This still
 *   looks rounded and friendly, just slightly thinner than the app's Black (900).
 *
 *   Install Nunito from: https://fonts.google.com/specimen/Nunito
 *
 * Usage:
 *   const builders = require("./vba-builders");
 *   builders.addTitleSlide(pres, { ... });
 *
 * IMPORTANT — pptxgenjs rules:
 *   - Colors are 6-char hex WITHOUT '#' (e.g., "7C3AED" not "#7C3AED")
 *   - Never reuse options objects (pptxgenjs mutates them)
 *   - Use breakLine: true between text array items
 *   - Layout must be LAYOUT_16x9
 */

// ─── DESIGN SYSTEM CONSTANTS ────────────────────────────────────────

const C = {
  bg:         "F0EAFF",   // lavender background
  bgDark:     "1C1040",   // dark mode / contrast slides
  white:      "FFFFFF",
  text:       "1C1040",   // deep purple-black
  textMid:    "4A3A80",   // body text
  textMuted:  "8070B0",   // captions
  purple:     "7C3AED",
  purpleSh:   "5221B5",
  purpleLt:   "EDE9FE",
  purpleMid:  "C4B5FD",
  green:      "10B981",
  greenSh:    "047857",
  greenLt:    "D1FAE5",
  greenMid:   "A7F3D0",
  amber:      "F59E0B",
  amberSh:    "B45309",
  amberLt:    "FEF3C7",
  amberMid:   "FDE68A",
  pink:       "EC4899",
  pinkSh:     "BE185D",
  pinkLt:     "FCE7F3",
  pinkMid:    "FBCFE8",
  blue:       "3B82F6",
  blueSh:     "1D4ED8",
  blueLt:     "DBEAFE",
  blueMid:    "BFDBFE",
  coral:      "F97316",
  coralLt:    "FFEDD5",
};

// Week-based accent color sets (index 0 = Week 1, etc.)
const WEEK_COLORS = [
  { accent: C.purple,  light: C.purpleLt,  mid: C.purpleMid,  dark: C.purpleSh,  emoji: "\uD83D\uDD2D" },  // Week 1 · EXPLORE
  { accent: C.green,   light: C.greenLt,   mid: C.greenMid,   dark: C.greenSh,   emoji: "\uD83E\uDEC2" },  // Week 2 · EMBRACE
  { accent: C.amber,   light: C.amberLt,   mid: C.amberMid,   dark: C.amberSh,   emoji: "\u2697\uFE0F" },  // Week 3 · EXPERIMENT
  { accent: C.pink,    light: C.pinkLt,    mid: C.pinkMid,    dark: C.pinkSh,    emoji: "\uD83E\uDD8B" },  // Week 4 · EVOLVE
];

function weekColor(weekNumber) {
  return WEEK_COLORS[(weekNumber - 1) % WEEK_COLORS.length];
}

// Typography — Nunito is the VBA web app font (rounded, friendly, geometric).
// The .pptx format only supports family name + bold on/off, so we can't
// target specific weights like Black (900) or ExtraBold (800). macOS groups
// all Nunito weights under one "Nunito" family — Keynote/PowerPoint won't
// find "Nunito Black" as a separate family.
//
// Using "Nunito" + bold: true → Nunito Bold (700), the heaviest accessible weight.
// Install from: https://fonts.google.com/specimen/Nunito
// Fallback: change all to "Poppins" if Nunito is not available.
const F = {
  title:   "Nunito",   // Titles, big statements — use with bold: true
  heading: "Nunito",   // Section headers — use with bold: true
  body:    "Nunito",   // Body text, regular weight; bold: true for emphasis
  label:   "Nunito",   // Small labels, tags — use with bold: true
};

const SLIDE_W = 10;
const SLIDE_H = 5.625;
const MARGIN = 0.6;   // slightly more breathing room than v1
const PANEL_W = 3.3;
const CONTENT_X = PANEL_W + 0.4;
const CONTENT_W = SLIDE_W - CONTENT_X - MARGIN;
const FOOTER_Y = 5.2;
const FOOTER_H = 0.35;
const CARD_RADIUS = 0.18;

// ─── CONFIGURABLE FOOTER TEXT ───────────────────────────────────────

let FOOTER_LEFT_TITLE = "Vibe Building Academy";
let FOOTER_LEFT_EXTRA = "";  // e.g., "· Cohort 1"
let FOOTER_RIGHT = "marcovanhout.com";

/**
 * Call before building slides to customize the footer.
 */
function setFooter(opts) {
  if (opts.title) FOOTER_LEFT_TITLE = opts.title;
  if (opts.extra !== undefined) FOOTER_LEFT_EXTRA = opts.extra;
  if (opts.right) FOOTER_RIGHT = opts.right;
}

// ─── HELPER FUNCTIONS ───────────────────────────────────────────────

function addFooter(slide, dark = false) {
  const color = dark ? C.white : C.textMuted;
  slide.addText([
    { text: FOOTER_LEFT_TITLE, options: { fontFace: F.label, bold: true, fontSize: 8, color } },
    ...(FOOTER_LEFT_EXTRA ? [{ text: `  ${FOOTER_LEFT_EXTRA}`, options: { fontFace: F.body, fontSize: 8, color } }] : []),
  ], { x: MARGIN, y: FOOTER_Y, w: 5, h: FOOTER_H, margin: 0, valign: "bottom" });

  slide.addText(FOOTER_RIGHT, {
    x: 5.5, y: FOOTER_Y, w: SLIDE_W - 5.5 - MARGIN, h: FOOTER_H,
    fontFace: F.body, fontSize: 8, color, margin: 0, align: "right", valign: "bottom",
  });
}

/**
 * Add a clay card — white rounded rectangle with a colored bottom shadow.
 * The shadow offset and radius give the signature soft 3D "toy" feel.
 */
function addClayCard(slide, pres, { x, y, w, h, shadowColor, fillColor }) {
  const fill = fillColor || C.white;
  const shadow = shadowColor || C.purpleMid;
  const shadowOffset = 0.12;

  // Shadow layer (slightly offset down)
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y: y + shadowOffset, w, h,
    fill: { color: shadow },
    rectRadius: CARD_RADIUS,
  });
  // Main card
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: fill },
    rectRadius: CARD_RADIUS,
  });
}

/**
 * Add an accent-colored left panel with rounded right edge.
 */
function addAccentPanel(slide, pres, accentColor, x, y, w, h) {
  // Main panel rectangle
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x || 0, y: y || 0, w: w || PANEL_W, h: h || SLIDE_H,
    fill: { color: accentColor },
  });
}

/**
 * Add competency tag chips: small colored pills with icon + short name.
 */
function addCompetencyTags(slide, pres, competencies, x, y, accentColor) {
  if (!competencies || competencies.length === 0) return;

  const tags = competencies.map((c) => ({
    text: ` ${c.icon} ${c.short}  `,
    options: {
      fontFace: F.label, bold: true, fontSize: 10,
      color: accentColor || C.purple,
    },
  }));

  slide.addText(tags, {
    x, y, w: SLIDE_W - x - MARGIN, h: 0.35,
    margin: 0, valign: "middle",
  });
}


// ─── SLIDE BUILDERS ─────────────────────────────────────────────────

/**
 * LESSON TITLE SLIDE
 * Opening slide for any lesson. Week/phase label, title, subtitle,
 * type badge, duration, and competency tags on lavender bg.
 */
function addLessonTitleSlide(pres, opts) {
  const slide = pres.addSlide();
  const wc = weekColor(opts.weekNumber);
  slide.background = { color: C.bg };

  // Week/phase label — smaller, tighter tracking
  slide.addText(`WEEK ${opts.weekNumber}  ·  ${opts.phase}`, {
    x: MARGIN, y: 0.5, w: 9, h: 0.35,
    fontFace: F.label, bold: true, fontSize: 12, color: wc.accent,
    margin: 0, charSpacing: 1.5,
  });

  // Phase tagline pill
  const taglineW = Math.max(2.0, (opts.phaseTagline || opts.phase).length * 0.12 + 0.6);
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: MARGIN, y: 0.95, w: taglineW, h: 0.32,
    fill: { color: C.white }, rectRadius: 0.16,
  });
  slide.addText(opts.phaseTagline || opts.phase, {
    x: MARGIN + 0.15, y: 0.95, w: taglineW - 0.3, h: 0.32,
    fontFace: F.label, bold: true, fontSize: 10, color: wc.accent, margin: 0, valign: "middle",
  });

  // Lesson emoji — bigger, more playful
  slide.addText(opts.emoji || "", {
    x: MARGIN, y: 1.55, w: 0.9, h: 0.9,
    fontSize: 44, margin: 0, valign: "middle", align: "center",
  });

  // Lesson title — big and bold
  slide.addText(opts.title, {
    x: MARGIN + 1.05, y: 1.5, w: 8, h: 1.0,
    fontFace: F.title, bold: true, fontSize: 34, color: C.text,
    margin: 0, valign: "middle",
  });

  // Subtitle
  if (opts.subtitle) {
    slide.addText(opts.subtitle, {
      x: MARGIN, y: 2.65, w: 8.8, h: 0.6,
      fontFace: F.body, fontSize: 15, color: C.textMid, margin: 0,
    });
  }

  // Metadata clay card — taller for better padding
  const cardY = 3.5;
  addClayCard(slide, pres, {
    x: MARGIN, y: cardY, w: 8.8, h: 1.0,
    shadowColor: wc.mid,
  });

  // Type badge + duration inside card
  const typeLabel = opts.type === "build" ? "\uD83D\uDD28 Build Session"
    : opts.type === "live" ? "\uD83D\uDD34 Live Session"
    : "\uD83D\uDCD6 Self-study";

  slide.addText(`${typeLabel}  ·  ${opts.duration || ""}`, {
    x: MARGIN + 0.35, y: cardY + 0.1, w: 4, h: 0.35,
    fontFace: F.label, bold: true, fontSize: 11, color: C.textMid, margin: 0, valign: "middle",
  });

  // Competency tags inside card
  if (opts.competencies && opts.competencies.length > 0) {
    addCompetencyTags(slide, pres, opts.competencies, MARGIN + 0.35, cardY + 0.55, wc.accent);
  }

  addFooter(slide);
  return slide;
}

/**
 * WEEK / SECTION INTRO SLIDE
 * Full-width intro for a week. Uses the week's light background,
 * large emoji, bold title, and description.
 */
function addWeekIntroSlide(pres, opts) {
  const slide = pres.addSlide();
  const wc = weekColor(opts.weekNumber);
  slide.background = { color: wc.light };

  // Large centered emoji
  slide.addText(opts.emoji || "", {
    x: 0, y: 0.25, w: SLIDE_W, h: 1.3,
    fontSize: 64, align: "center", margin: 0, valign: "middle",
  });

  // Week label — clean, tighter
  slide.addText(`WEEK ${opts.weekNumber}`, {
    x: MARGIN, y: 1.6, w: SLIDE_W - MARGIN * 2, h: 0.3,
    fontFace: F.label, bold: true, fontSize: 13, color: wc.accent,
    margin: 0, align: "center", charSpacing: 3,
  });

  // Phase tagline pill — auto-sized
  const tagText = opts.phaseTagline || opts.phase;
  const pillW = Math.max(2.0, tagText.length * 0.11 + 0.6);
  const pillX = (SLIDE_W - pillW) / 2;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: pillX, y: 2.0, w: pillW, h: 0.32,
    fill: { color: C.white }, rectRadius: 0.16,
  });
  slide.addText(tagText, {
    x: pillX, y: 2.0, w: pillW, h: 0.32,
    fontFace: F.label, bold: true, fontSize: 10, color: wc.accent,
    margin: 0, align: "center", valign: "middle",
  });

  // Title — generous size
  slide.addText(opts.title, {
    x: 0.8, y: 2.55, w: 8.4, h: 0.85,
    fontFace: F.title, bold: true, fontSize: 34, color: C.text,
    margin: 0, align: "center", valign: "middle",
  });

  // Description
  if (opts.description) {
    slide.addText(opts.description, {
      x: 1.2, y: 3.45, w: 7.6, h: 1.0,
      fontFace: F.body, fontSize: 13, color: C.textMid,
      margin: 0, align: "center", valign: "top",
    });
  }

  // Build project badge
  if (opts.buildProject) {
    const badgeW = Math.max(3, opts.buildProject.length * 0.1 + 1.5);
    const badgeX = (SLIDE_W - badgeW) / 2;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: badgeX, y: 4.55, w: badgeW, h: 0.38,
      fill: { color: C.white }, rectRadius: 0.16,
    });
    slide.addText(`\uD83D\uDD28  ${opts.buildProject}`, {
      x: badgeX, y: 4.55, w: badgeW, h: 0.38,
      fontFace: F.label, bold: true, fontSize: 10, color: wc.accent,
      margin: 0, align: "center", valign: "middle",
    });
  }

  addFooter(slide);
  return slide;
}

/**
 * CONTENT SLIDE — Clay card with teaching content on lavender bg.
 */
function addContentSlide(pres, opts) {
  const slide = pres.addSlide();
  const wc = weekColor(opts.weekNumber);
  slide.background = { color: C.bg };

  // Heading with optional emoji
  const headingParts = [];
  if (opts.emoji) {
    headingParts.push({ text: `${opts.emoji}  `, options: { fontSize: 22 } });
  }
  headingParts.push({
    text: opts.heading,
    options: { fontFace: F.heading, bold: true, fontSize: 22, color: C.text },
  });
  slide.addText(headingParts, {
    x: MARGIN, y: 0.35, w: SLIDE_W - MARGIN * 2, h: 0.65, margin: 0, valign: "middle",
  });

  // Clay card with body content
  const cardY = 1.2;
  const cardH = 3.6;
  addClayCard(slide, pres, {
    x: MARGIN, y: cardY, w: SLIDE_W - MARGIN * 2, h: cardH,
    shadowColor: wc.mid,
  });

  if (opts.bodyItems && opts.bodyItems.length > 0) {
    const textArr = opts.bodyItems.map((item, i) => ({
      text: item,
      options: {
        bullet: true, breakLine: i < opts.bodyItems.length - 1,
        fontFace: F.body, fontSize: 13, color: C.textMid,
      },
    }));
    slide.addText(textArr, {
      x: MARGIN + 0.45, y: cardY + 0.3, w: SLIDE_W - MARGIN * 2 - 0.9, h: cardH - 0.6,
      margin: 0, valign: "top", paraSpaceAfter: 8,
    });
  } else if (opts.body) {
    slide.addText(opts.body, {
      x: MARGIN + 0.45, y: cardY + 0.3, w: SLIDE_W - MARGIN * 2 - 0.9, h: cardH - 0.6,
      fontFace: F.body, fontSize: 13, color: C.textMid, margin: 0, valign: "top",
    });
  }

  addFooter(slide);
  return slide;
}

/**
 * TWO-COLUMN CARD SLIDE — Two clay cards side by side.
 */
function addTwoColumnSlide(pres, opts) {
  const slide = pres.addSlide();
  const wc = weekColor(opts.weekNumber);
  slide.background = { color: C.bg };

  const startY = opts.heading ? 1.25 : 0.6;

  if (opts.heading) {
    slide.addText(opts.heading, {
      x: MARGIN, y: 0.35, w: SLIDE_W - MARGIN * 2, h: 0.65,
      fontFace: F.heading, bold: true, fontSize: 22, color: C.text, margin: 0, valign: "middle",
    });
  }

  const totalW = SLIDE_W - MARGIN * 2;
  const gap = 0.35;
  const cardW = (totalW - gap) / 2;
  const cardH = opts.heading ? 3.4 : 4.2;

  // Left card
  addClayCard(slide, pres, {
    x: MARGIN, y: startY, w: cardW, h: cardH,
    shadowColor: opts.leftColor || wc.mid,
    fillColor: opts.leftColor ? undefined : wc.light,
  });

  const leftTitleParts = [];
  if (opts.leftEmoji) leftTitleParts.push({ text: `${opts.leftEmoji}  `, options: { fontSize: 18 } });
  leftTitleParts.push({ text: opts.leftTitle, options: { fontFace: F.heading, bold: true, fontSize: 16, color: C.text } });
  slide.addText(leftTitleParts, {
    x: MARGIN + 0.35, y: startY + 0.25, w: cardW - 0.7, h: 0.45, margin: 0, valign: "middle",
  });
  slide.addText(opts.leftBody, {
    x: MARGIN + 0.35, y: startY + 0.8, w: cardW - 0.7, h: cardH - 1.2,
    fontFace: F.body, fontSize: 12, color: C.textMid, margin: 0, valign: "top",
  });

  // Right card
  const rightX = MARGIN + cardW + gap;
  addClayCard(slide, pres, {
    x: rightX, y: startY, w: cardW, h: cardH,
    shadowColor: opts.rightColor || wc.mid,
  });

  const rightTitleParts = [];
  if (opts.rightEmoji) rightTitleParts.push({ text: `${opts.rightEmoji}  `, options: { fontSize: 18 } });
  rightTitleParts.push({ text: opts.rightTitle, options: { fontFace: F.heading, bold: true, fontSize: 16, color: C.text } });
  slide.addText(rightTitleParts, {
    x: rightX + 0.35, y: startY + 0.25, w: cardW - 0.7, h: 0.45, margin: 0, valign: "middle",
  });
  slide.addText(opts.rightBody, {
    x: rightX + 0.35, y: startY + 0.8, w: cardW - 0.7, h: cardH - 1.2,
    fontFace: F.body, fontSize: 12, color: C.textMid, margin: 0, valign: "top",
  });

  addFooter(slide);
  return slide;
}

/**
 * BUILDER VS CODER SLIDE — Competency comparison with two cards.
 * Purple card (builder) vs amber card (coder).
 */
function addBuilderVsCoderSlide(pres, opts) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  const comp = opts.competency;

  // Competency icon + name
  slide.addText([
    { text: `${comp.icon}  `, options: { fontSize: 26 } },
    { text: comp.name, options: { fontFace: F.heading, bold: true, fontSize: 24, color: C.text } },
  ], { x: MARGIN, y: 0.3, w: 9, h: 0.55, margin: 0, valign: "middle" });

  slide.addText(comp.description, {
    x: MARGIN, y: 0.9, w: SLIDE_W - MARGIN * 2, h: 0.45,
    fontFace: F.body, fontSize: 12, color: C.textMid, margin: 0, valign: "top",
  });

  const totalW = SLIDE_W - MARGIN * 2;
  const gap = 0.35;
  const cardW = (totalW - gap) / 2;
  const cardH = 2.5;
  const cardY = 1.55;

  // Builder card (purple)
  addClayCard(slide, pres, { x: MARGIN, y: cardY, w: cardW, h: cardH, shadowColor: C.purpleMid, fillColor: C.purpleLt });
  slide.addText([
    { text: "\uD83D\uDE80  ", options: { fontSize: 18 } },
    { text: "Vibe Builder", options: { fontFace: F.heading, bold: true, fontSize: 15, color: C.purple } },
  ], { x: MARGIN + 0.35, y: cardY + 0.2, w: cardW - 0.7, h: 0.4, margin: 0, valign: "middle" });

  // Extract builder/coder text
  const gapParts = comp.vibeCoderGap.split(". ");
  const builderText = gapParts.find(p => p.toLowerCase().includes("builder")) || gapParts[1] || "";
  const coderText = gapParts.find(p => p.toLowerCase().includes("coder")) || gapParts[0] || "";

  slide.addText(builderText.replace(/^Vibe builders /i, ""), {
    x: MARGIN + 0.35, y: cardY + 0.7, w: cardW - 0.7, h: 1.5,
    fontFace: F.body, fontSize: 16, color: C.purple, bold: true, margin: 0, valign: "top",
  });

  // Coder card (amber)
  const rightX = MARGIN + cardW + gap;
  addClayCard(slide, pres, { x: rightX, y: cardY, w: cardW, h: cardH, shadowColor: C.amberMid, fillColor: C.amberLt });
  slide.addText([
    { text: "\uD83D\uDCBB  ", options: { fontSize: 18 } },
    { text: "Vibe Coder", options: { fontFace: F.heading, bold: true, fontSize: 15, color: C.amberSh } },
  ], { x: rightX + 0.35, y: cardY + 0.2, w: cardW - 0.7, h: 0.4, margin: 0, valign: "middle" });

  slide.addText(coderText.replace(/^Vibe coders /i, ""), {
    x: rightX + 0.35, y: cardY + 0.7, w: cardW - 0.7, h: 1.5,
    fontFace: F.body, fontSize: 16, color: C.amberSh, bold: true, margin: 0, valign: "top",
  });

  // Reflection question at bottom
  slide.addText(`\u201C${comp.question}\u201D`, {
    x: 1.5, y: 4.3, w: 7, h: 0.5,
    fontFace: F.body, fontSize: 12, color: C.textMuted, italic: true, align: "center", margin: 0,
  });

  addFooter(slide);
  return slide;
}

/**
 * ACTIVITY SLIDE — Accent panel left + white right with instructions.
 */
function addActivitySlide(pres, opts) {
  const slide = pres.addSlide();
  const wc = weekColor(opts.weekNumber);
  slide.background = { color: C.white };

  addAccentPanel(slide, pres, wc.accent);

  // Panel content — activity number and brief instruction
  slide.addText([
    { text: `Activity ${opts.number || ""}`, options: { fontFace: F.body, fontSize: 12, color: C.white, breakLine: true } },
    { text: "\n", options: { fontSize: 6, breakLine: true } },
    { text: opts.instruction || "", options: { fontFace: F.heading, bold: true, fontSize: 15, color: C.white } },
  ], { x: 0.4, y: 0.8, w: 2.5, h: 3.5, margin: 0, valign: "top" });

  // Right side: title
  if (opts.title) {
    slide.addText(opts.title, {
      x: CONTENT_X, y: 0.45, w: CONTENT_W, h: 0.85,
      fontFace: F.heading, bold: true, fontSize: 24, color: C.text, margin: 0, valign: "middle",
    });
  }

  // Right side: body / items
  if (opts.bodyItems && opts.bodyItems.length > 0) {
    const textArr = opts.bodyItems.map((item, i) => ({
      text: item,
      options: {
        bullet: true, breakLine: i < opts.bodyItems.length - 1,
        fontFace: F.body, fontSize: 13, color: C.textMid,
      },
    }));
    slide.addText(textArr, {
      x: CONTENT_X, y: 1.5, w: CONTENT_W, h: 3.3,
      margin: 0, valign: "top", paraSpaceAfter: 6,
    });
  } else if (opts.body) {
    slide.addText(opts.body, {
      x: CONTENT_X, y: 1.5, w: CONTENT_W, h: 3.3,
      fontFace: F.body, fontSize: 13, color: C.textMid, margin: 0, valign: "top",
    });
  }

  addFooter(slide, false);
  return slide;
}

/**
 * REFLECTION SLIDE — Accent panel left + bold questions on white.
 */
function addReflectionSlide(pres, opts) {
  const slide = pres.addSlide();
  const wc = weekColor(opts.weekNumber);
  slide.background = { color: C.white };

  addAccentPanel(slide, pres, wc.accent);

  slide.addText(opts.label || "REFLECTION", {
    x: 0.4, y: 1.5, w: 2.5, h: 1.5,
    fontFace: F.heading, bold: true, fontSize: 18, color: C.white,
    margin: 0, valign: "middle", charSpacing: 1,
  });

  const textArr = opts.questions.map((q, i) => ({
    text: q,
    options: {
      fontFace: F.body, fontSize: 16, color: C.text, bold: true,
      breakLine: i < opts.questions.length - 1, paraSpaceAfter: 16,
    },
  }));
  slide.addText(textArr, {
    x: CONTENT_X, y: 0.6, w: CONTENT_W, h: 4.2,
    margin: 0, valign: "middle",
  });

  addFooter(slide, false);
  return slide;
}

/**
 * STATEMENT SLIDE — Bold text on a solid accent-colored background.
 * Perfect for provocations, key takeaways, David Epstein quotes, etc.
 */
function addStatementSlide(pres, opts) {
  const slide = pres.addSlide();
  const wc = weekColor(opts.weekNumber);
  slide.background = { color: opts.bgColor || wc.accent };

  slide.addText(opts.text, {
    x: 1.0, y: 0.8, w: 8.0, h: 3.2,
    fontFace: F.title, bold: true, fontSize: 30, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });

  if (opts.attribution) {
    slide.addText(`\u2014 ${opts.attribution}`, {
      x: 1.5, y: 4.15, w: 7, h: 0.5,
      fontFace: F.body, fontSize: 13, color: C.white, italic: true,
      align: "center", margin: 0,
    });
  }

  addFooter(slide, true);
  return slide;
}

/**
 * PHOTO / ILLUSTRATION SPLIT SLIDE
 * Left side: image (photo, illustration, or screenshot)
 * Right side: text content in a clay card
 * OR: reversed (image right, text left) via opts.imageRight
 *
 * @param {{
 *   weekNumber: number,
 *   imagePath: string,           // file path or URL to image
 *   imageAlt?: string,           // accessibility text
 *   heading: string,
 *   body?: string,
 *   bodyItems?: string[],
 *   caption?: string,            // image caption
 *   imageRight?: boolean,        // flip layout: text left, image right
 *   imageBg?: string,            // background color behind image area (default: week light)
 * }} opts
 */
function addPhotoSplitSlide(pres, opts) {
  const slide = pres.addSlide();
  const wc = weekColor(opts.weekNumber);
  slide.background = { color: C.bg };

  const imgW = 4.5;
  const textW = SLIDE_W - imgW - 0.3;
  const imgX = opts.imageRight ? (SLIDE_W - imgW) : 0;
  const textX = opts.imageRight ? MARGIN : (imgW + 0.3);

  // Image area background — week's light color for visual unity
  slide.addShape(pres.shapes.RECTANGLE, {
    x: imgX, y: 0, w: imgW, h: SLIDE_H,
    fill: { color: opts.imageBg || wc.light },
  });

  // Image — centered in the image area with padding
  const imgPad = 0.3;
  const imgDisplayW = imgW - imgPad * 2;
  const imgDisplayH = SLIDE_H - 1.2;  // room for caption + footer
  slide.addImage({
    path: opts.imagePath,
    x: imgX + imgPad,
    y: 0.3,
    w: imgDisplayW,
    h: imgDisplayH,
    sizing: { type: "contain", w: imgDisplayW, h: imgDisplayH },
    altText: opts.imageAlt || opts.heading,
    rounding: false,
  });

  // Image caption
  if (opts.caption) {
    slide.addText(opts.caption, {
      x: imgX + imgPad, y: SLIDE_H - 0.85, w: imgDisplayW, h: 0.35,
      fontFace: F.label, bold: true, fontSize: 9, color: C.textMuted, italic: true,
      margin: 0, align: "center",
    });
  }

  // Text side — heading
  slide.addText(opts.heading, {
    x: textX, y: 0.5, w: textW - MARGIN, h: 0.65,
    fontFace: F.heading, bold: true, fontSize: 22, color: C.text, margin: 0, valign: "middle",
  });

  // Text side — body in a clay card
  const cardY = 1.35;
  const cardH = 3.4;
  addClayCard(slide, pres, {
    x: textX, y: cardY, w: textW - MARGIN, h: cardH,
    shadowColor: wc.mid,
  });

  if (opts.bodyItems && opts.bodyItems.length > 0) {
    const textArr = opts.bodyItems.map((item, i) => ({
      text: item,
      options: {
        bullet: true, breakLine: i < opts.bodyItems.length - 1,
        fontFace: F.body, fontSize: 12, color: C.textMid,
      },
    }));
    slide.addText(textArr, {
      x: textX + 0.35, y: cardY + 0.25, w: textW - MARGIN - 0.7, h: cardH - 0.5,
      margin: 0, valign: "top", paraSpaceAfter: 7,
    });
  } else if (opts.body) {
    slide.addText(opts.body, {
      x: textX + 0.35, y: cardY + 0.25, w: textW - MARGIN - 0.7, h: cardH - 0.5,
      fontFace: F.body, fontSize: 12, color: C.textMid, margin: 0, valign: "top",
    });
  }

  addFooter(slide);
  return slide;
}

/**
 * COMPETENCY WHEEL OVERVIEW SLIDE — All 10 competencies in a 2x5 grid.
 */
function addCompetencyWheelSlide(pres, opts) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };

  slide.addText([
    { text: "\uD83C\uDFAF  ", options: { fontSize: 22 } },
    { text: "Your Range Wheel", options: { fontFace: F.heading, bold: true, fontSize: 22, color: C.text } },
  ], { x: MARGIN, y: 0.25, w: 9, h: 0.55, margin: 0, valign: "middle" });

  slide.addText("10 competencies that make a vibe builder.", {
    x: MARGIN, y: 0.78, w: 9, h: 0.3,
    fontFace: F.body, fontSize: 12, color: C.textMid, margin: 0,
  });

  const comps = opts.competencies || [];
  const cols = 2;
  const totalW = SLIDE_W - MARGIN * 2;
  const gapX = 0.3;
  const cardW = (totalW - gapX) / cols;
  const cardH = 0.68;
  const gapY = 0.12;
  const startY = 1.25;

  comps.forEach((comp, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MARGIN + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);

    // Mini clay card with subtle shadow
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: y + 0.06, w: cardW, h: cardH,
      fill: { color: C.purpleMid }, rectRadius: 0.1,
    });
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: C.white }, rectRadius: 0.1,
    });

    // Competency color accent bar (left edge)
    const compColor = (comp.color || "7C3AED").replace("#", "");
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: y + 0.05, w: 0.06, h: cardH - 0.1,
      fill: { color: compColor },
    });

    // Icon + name + description
    slide.addText([
      { text: `${comp.icon}  `, options: { fontSize: 13 } },
      { text: comp.name, options: { fontFace: F.heading, bold: true, fontSize: 10, color: C.text } },
      { text: `   ${comp.description.substring(0, 45)}${comp.description.length > 45 ? "\u2026" : ""}`,
        options: { fontFace: F.body, fontSize: 8.5, color: C.textMid } },
    ], { x: x + 0.18, y, w: cardW - 0.35, h: cardH, margin: 0, valign: "middle" });
  });

  addFooter(slide);
  return slide;
}

/**
 * BREAK / TRANSITION SLIDE — Simple centered emoji + text on white.
 */
function addBreakSlide(pres, opts) {
  const slide = pres.addSlide();
  slide.background = { color: C.white };

  slide.addText(opts.emoji || "\u2615", {
    x: 0, y: 0.7, w: SLIDE_W, h: 1.4,
    fontSize: 56, align: "center", margin: 0, valign: "middle",
  });

  slide.addText(opts.text, {
    x: 1.5, y: 2.3, w: 7, h: 0.7,
    fontFace: F.heading, bold: true, fontSize: 26, color: C.text,
    align: "center", margin: 0, valign: "middle",
  });

  if (opts.subtext) {
    slide.addText(opts.subtext, {
      x: 1.5, y: 3.1, w: 7, h: 0.5,
      fontFace: F.body, fontSize: 13, color: C.textMuted, italic: true,
      align: "center", margin: 0,
    });
  }

  addFooter(slide, false);
  return slide;
}

/**
 * CLOSING / THANK YOU SLIDE — Purple background with white text.
 */
function addClosingSlide(pres, opts) {
  const slide = pres.addSlide();
  slide.background = { color: C.purple };

  slide.addText(opts.title || "Vibe Building\nAcademy", {
    x: 1, y: 0.8, w: 8, h: 2.5,
    fontFace: F.title, bold: true, fontSize: 42, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });

  if (opts.subtitle) {
    slide.addText(opts.subtitle, {
      x: 1.5, y: 3.5, w: 7, h: 0.55,
      fontFace: F.body, fontSize: 15, color: C.white, align: "center", margin: 0,
    });
  }

  if (opts.url) {
    slide.addText(opts.url, {
      x: 1.5, y: 4.15, w: 7, h: 0.45,
      fontFace: F.body, fontSize: 13, color: C.purpleLt, align: "center", margin: 0,
    });
  }

  addFooter(slide, true);
  return slide;
}


// ─── POST-PROCESSING ───────────────────────────────────────────────

/**
 * Fix theme fonts in the generated .pptx file.
 * pptxgenjs hardcodes "Calibri" / "Calibri Light" in theme1.xml, which
 * causes a "missing font" warning on Macs without Microsoft Office.
 * This replaces all theme font references with Nunito.
 *
 * Call AFTER pres.writeFile() or pres.write():
 *   await fixThemeFonts("/path/to/output.pptx");
 *
 * Requires: fs, path, and the 'archiver' + 'unzipper' packages,
 * OR the built-in child_process for zip/unzip shell commands.
 */
async function fixThemeFonts(pptxPath, fontName) {
  const fs = require("fs");
  const path = require("path");
  const { execSync } = require("child_process");

  const font = fontName || F.title;  // default to our title font
  const tmpDir = pptxPath + "_tmp_" + Date.now();

  try {
    // Unzip
    fs.mkdirSync(tmpDir, { recursive: true });
    execSync(`unzip -o "${pptxPath}" -d "${tmpDir}"`, { stdio: "pipe" });

    // Fix theme1.xml — replace Calibri/Calibri Light with our font
    const themePath = path.join(tmpDir, "ppt", "theme", "theme1.xml");
    if (fs.existsSync(themePath)) {
      let theme = fs.readFileSync(themePath, "utf8");
      theme = theme.replace(/typeface="Calibri Light"/g, `typeface="${font}"`);
      theme = theme.replace(/typeface="Calibri"/g, `typeface="${font}"`);
      fs.writeFileSync(themePath, theme);
    }

    // Re-zip (must use -0 for mimetype-style entries, standard deflate for rest)
    const outPath = pptxPath + ".fixed.pptx";
    execSync(`cd "${tmpDir}" && zip -r "${outPath}" . -x ".*"`, { stdio: "pipe" });

    // Replace original
    fs.copyFileSync(outPath, pptxPath);
    fs.unlinkSync(outPath);
  } finally {
    // Cleanup
    execSync(`rm -rf "${tmpDir}"`, { stdio: "pipe" });
  }
}


// ─── EXPORTS ────────────────────────────────────────────────────────

module.exports = {
  // Constants
  C, F, WEEK_COLORS, weekColor,
  SLIDE_W, SLIDE_H, MARGIN, PANEL_W, CONTENT_X, CONTENT_W, CARD_RADIUS,

  // Config
  setFooter,

  // Helpers
  addFooter, addClayCard, addAccentPanel, addCompetencyTags,

  // Post-processing
  fixThemeFonts,

  // Slide builders (12 total)
  addLessonTitleSlide,
  addWeekIntroSlide,
  addContentSlide,
  addTwoColumnSlide,
  addBuilderVsCoderSlide,
  addActivitySlide,
  addReflectionSlide,
  addStatementSlide,
  addPhotoSplitSlide,       // photo/illustration + text split view
  addCompetencyWheelSlide,
  addBreakSlide,
  addClosingSlide,
};
