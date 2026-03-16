import { useState } from "react";

const COMPETENCIES = [
  {
    id: "problem-framing",
    name: "Problem Framing",
    short: "Frame",
    description: "See the right problem before jumping to solutions. Wicked problems, not homework assignments.",
    question: "Can I define the real problem — not just the obvious one?",
    vibeCoderGap: "Vibe coders accept the brief. Vibe builders rewrite it.",
    week: "EMBRACE",
    color: "#7C5CFC",
    icon: "🎯",
  },
  {
    id: "design-sense",
    name: "Design Sense",
    short: "Design",
    description: "Does this feel right? Layout, hierarchy, whitespace, accessibility, emotional response.",
    question: "Would someone enjoy using what I built — not just tolerate it?",
    vibeCoderGap: "Vibe coders ship functional. Vibe builders ship delightful.",
    week: "EMBRACE",
    color: "#E85D9B",
    icon: "🎨",
  },
  {
    id: "prompt-craft",
    name: "Prompt Craft",
    short: "Prompt",
    description: "The new literacy. Communicating intent to AI in ways that produce what you actually mean.",
    question: "Can I direct AI like a film director — not just ask it questions?",
    vibeCoderGap: "Vibe coders type commands. Vibe builders direct collaborators.",
    week: "EXPLORE",
    color: "#5B9FE4",
    icon: "💬",
  },
  {
    id: "systems-thinking",
    name: "Systems Thinking",
    short: "Systems",
    description: "How things connect. Data flows, user journeys, automations, feedback loops.",
    question: "Do I see the whole system — or just the screen in front of me?",
    vibeCoderGap: "Vibe coders build pages. Vibe builders build systems.",
    week: "EXPERIMENT",
    color: "#4ECDC4",
    icon: "🔗",
  },
  {
    id: "ethical-awareness",
    name: "Ethical Awareness",
    short: "Ethics",
    description: "AI bias, privacy, inclusion, sustainability. Who benefits? Who gets left out?",
    question: "Have I thought about who this affects — beyond the happy path?",
    vibeCoderGap: "Vibe coders ship fast. Vibe builders ship responsibly.",
    week: "EMBRACE",
    color: "#9B59B6",
    icon: "⚖️",
  },
  {
    id: "trend-literacy",
    name: "Trend Literacy",
    short: "Trends",
    description: "Pattern recognition across AI, culture, and your industry. Knowing which wave to ride.",
    question: "Am I building for today — or for where things are heading?",
    vibeCoderGap: "Vibe coders follow tutorials. Vibe builders read signals.",
    week: "EXPLORE",
    color: "#F39C12",
    icon: "📡",
  },
  {
    id: "storytelling",
    name: "Storytelling",
    short: "Story",
    description: "Your build is only as good as your ability to explain why it exists. Narrative is product.",
    question: "Can I make someone care about what I built — in 30 seconds?",
    vibeCoderGap: "Vibe coders demo features. Vibe builders tell stories.",
    week: "EVOLVE",
    color: "#E74C3C",
    icon: "📖",
  },
  {
    id: "domain-bridging",
    name: "Domain Bridging",
    short: "Domain",
    description: "Your unfair advantage. The teacher who builds ed-tech. The nurse who builds patient tools.",
    question: "Am I using my unique background as a superpower — not ignoring it?",
    vibeCoderGap: "Vibe coders build generic. Vibe builders build from lived experience.",
    week: "EMBRACE",
    color: "#1ABC9C",
    icon: "🌉",
  },
  {
    id: "experimentation-velocity",
    name: "Experimentation",
    short: "Velocity",
    description: "How fast you try, fail, learn, try again. Not code quality — learning speed.",
    question: "Did I try three things this week — or perfect one?",
    vibeCoderGap: "Vibe coders debug. Vibe builders restart.",
    week: "EXPERIMENT",
    color: "#FF6B6B",
    icon: "⚡",
  },
  {
    id: "ship-discipline",
    name: "Ship Discipline",
    short: "Ship",
    description: "Actually finishing. The gap between 'I have an idea' and 'here's the link.'",
    question: "Is it live? Can someone use it right now?",
    vibeCoderGap: "Vibe coders have repos. Vibe builders have URLs.",
    week: "EVOLVE",
    color: "#2ECC71",
    icon: "🚀",
  },
];

const WEEK_COLORS = {
  EXPLORE: { bg: "#EDE9FE", accent: "#7C5CFC" },
  EMBRACE: { bg: "#FCE7F3", accent: "#E85D9B" },
  EXPERIMENT: { bg: "#FEF3C7", accent: "#F39C12" },
  EVOLVE: { bg: "#D1FAE5", accent: "#2ECC71" },
};

export default function VibeBuilderWheel() {
  const [selected, setSelected] = useState(null);
  const [scores, setScores] = useState(
    Object.fromEntries(COMPETENCIES.map((c) => [c.id, 2]))
  );
  const [mode, setMode] = useState("explore"); // explore | assess

  const cx = 250;
  const cy = 250;
  const maxR = 200;
  const levels = 5;
  const n = COMPETENCIES.length;
  const angleStep = (2 * Math.PI) / n;

  const getPoint = (index, level) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (level / levels) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const getLabelPoint = (index) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = maxR + 35;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const points = Array.from({ length: n }, (_, i) => getPoint(i, level + 1));
    return points.map((p) => `${p.x},${p.y}`).join(" ");
  });

  const dataPoints = COMPETENCIES.map((c, i) => getPoint(i, scores[c.id]));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const handleScore = (id, val) => {
    setScores((prev) => ({ ...prev, [id]: val }));
  };

  const avgScore = (
    Object.values(scores).reduce((a, b) => a + b, 0) / COMPETENCIES.length
  ).toFixed(1);

  const selectedComp = COMPETENCIES.find((c) => c.id === selected);

  return (
    <div
      style={{
        fontFamily: "'Nunito', sans-serif",
        background: "#FEFCF9",
        minHeight: "100vh",
        padding: "32px 24px",
        color: "#1a1a2e",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: 20,
            background: "#EDE9FE",
            color: "#7C5CFC",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          VIBE BUILDER ≠ VIBE CODER
        </div>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          The Vibe Builder Competencies
        </h1>
        <p
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#6B7280",
            maxWidth: 560,
            margin: "0 auto 24px",
            lineHeight: 1.6,
          }}
        >
          Ten skills that separate someone who prompts AI to write code from
          someone who builds things that matter. Range is the point.
        </p>

        {/* Mode toggle */}
        <div
          style={{
            display: "inline-flex",
            gap: 4,
            padding: 4,
            borderRadius: 16,
            background: "#F3F4F6",
          }}
        >
          {[
            { key: "explore", label: "Explore" },
            { key: "assess", label: "Self-assess" },
          ].map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              style={{
                padding: "8px 20px",
                borderRadius: 12,
                border: "none",
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                background: mode === m.key ? "white" : "transparent",
                color: mode === m.key ? "#7C5CFC" : "#9CA3AF",
                boxShadow:
                  mode === m.key ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 32,
          alignItems: "start",
        }}
      >
        {/* Radar Chart */}
        <div
          style={{
            background: "white",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 8px 0 #E5E7EB",
            border: "2px solid #F3F4F6",
          }}
        >
          <svg viewBox="0 0 500 500" style={{ width: "100%", maxWidth: 460, display: "block", margin: "0 auto" }}>
            {/* Grid */}
            {gridPaths.map((points, i) => (
              <polygon
                key={i}
                points={points}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth={i === levels - 1 ? 1.5 : 0.8}
                strokeDasharray={i < levels - 1 ? "4,4" : "none"}
              />
            ))}

            {/* Axes */}
            {COMPETENCIES.map((c, i) => {
              const end = getPoint(i, levels);
              return (
                <line
                  key={c.id}
                  x1={cx}
                  y1={cy}
                  x2={end.x}
                  y2={end.y}
                  stroke="#E5E7EB"
                  strokeWidth={0.8}
                />
              );
            })}

            {/* Data polygon */}
            <polygon
              points={dataPath}
              fill="rgba(124, 92, 252, 0.12)"
              stroke="#7C5CFC"
              strokeWidth={2.5}
              strokeLinejoin="round"
            />

            {/* Data points */}
            {COMPETENCIES.map((c, i) => {
              const p = getPoint(i, scores[c.id]);
              const isSelected = selected === c.id;
              return (
                <g key={c.id}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isSelected ? 8 : 6}
                    fill={c.color}
                    stroke="white"
                    strokeWidth={2.5}
                    style={{ cursor: "pointer", transition: "r 0.2s" }}
                    onClick={() => setSelected(selected === c.id ? null : c.id)}
                  />
                </g>
              );
            })}

            {/* Labels */}
            {COMPETENCIES.map((c, i) => {
              const lp = getLabelPoint(i);
              const isSelected = selected === c.id;
              return (
                <g
                  key={`label-${c.id}`}
                  onClick={() => setSelected(selected === c.id ? null : c.id)}
                  style={{ cursor: "pointer" }}
                >
                  <text
                    x={lp.x}
                    y={lp.y - 8}
                    textAnchor="middle"
                    fontSize={16}
                  >
                    {c.icon}
                  </text>
                  <text
                    x={lp.x}
                    y={lp.y + 8}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={isSelected ? 900 : 700}
                    fill={isSelected ? c.color : "#6B7280"}
                  >
                    {c.short}
                  </text>
                </g>
              );
            })}

            {/* Center score */}
            <text
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              fontSize={28}
              fontWeight={900}
              fill="#7C5CFC"
            >
              {avgScore}
            </text>
            <text
              x={cx}
              y={cy + 14}
              textAnchor="middle"
              fontSize={9}
              fontWeight={700}
              fill="#9CA3AF"
              textTransform="uppercase"
              letterSpacing={1}
            >
              RANGE SCORE
            </text>
          </svg>
        </div>

        {/* Detail Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Selected competency detail */}
          {selectedComp ? (
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                boxShadow: `0 8px 0 ${selectedComp.color}22`,
                border: `2px solid ${selectedComp.color}33`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 28 }}>{selectedComp.icon}</span>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 900 }}>
                    {selectedComp.name}
                  </h3>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: WEEK_COLORS[selectedComp.week].accent,
                      background: WEEK_COLORS[selectedComp.week].bg,
                      padding: "2px 8px",
                      borderRadius: 8,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {selectedComp.week}
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#4B5563",
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                {selectedComp.description}
              </p>

              <div
                style={{
                  background: "#FEFCE8",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#92400E",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  Reflection question
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#78350F",
                    fontStyle: "italic",
                  }}
                >
                  {selectedComp.question}
                </p>
              </div>

              <div
                style={{
                  background: "#FDF2F8",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: mode === "assess" ? 16 : 0,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#9D174D",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  Builder &gt; Coder
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#831843",
                  }}
                >
                  {selectedComp.vibeCoderGap}
                </p>
              </div>

              {mode === "assess" && (
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#6B7280",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Your level (1–5)
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleScore(selectedComp.id, val)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          border: "2px solid",
                          borderColor:
                            scores[selectedComp.id] >= val
                              ? selectedComp.color
                              : "#E5E7EB",
                          background:
                            scores[selectedComp.id] >= val
                              ? selectedComp.color
                              : "white",
                          color:
                            scores[selectedComp.id] >= val
                              ? "white"
                              : "#9CA3AF",
                          fontSize: 14,
                          fontWeight: 900,
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 8px 0 #E5E7EB",
                border: "2px solid #F3F4F6",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>👆</div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#9CA3AF" }}>
                Click any competency on the wheel to explore it
              </p>
            </div>
          )}

          {/* Competency list */}
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: 16,
              boxShadow: "0 8px 0 #E5E7EB",
              border: "2px solid #F3F4F6",
            }}
          >
            <h4
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#9CA3AF",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 12,
                paddingLeft: 4,
              }}
            >
              All 10 Competencies
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {COMPETENCIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() =>
                    setSelected(selected === c.id ? null : c.id)
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderRadius: 12,
                    border: "none",
                    background:
                      selected === c.id ? `${c.color}11` : "transparent",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{c.icon}</span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: selected === c.id ? 900 : 700,
                      color: selected === c.id ? c.color : "#4B5563",
                      flex: 1,
                    }}
                  >
                    {c.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: WEEK_COLORS[c.week].accent,
                      background: WEEK_COLORS[c.week].bg,
                      padding: "2px 8px",
                      borderRadius: 8,
                    }}
                  >
                    {c.week}
                  </span>
                  {mode === "assess" && (
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 900,
                        color: c.color,
                        minWidth: 20,
                        textAlign: "right",
                      }}
                    >
                      {scores[c.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
