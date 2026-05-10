import { useState } from "react";
import { ARTICLES, ARTICLES_BY_PROFILE, EU_AI_ACT_META } from "./data/articles.js";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#F4F6F9",
  surface: "#FFFFFF",
  surfaceHover: "#F0F2F5",
  border: "#DDE2EC",
  borderLight: "#C8D0DF",
  gold: "#8B6914",
  goldLight: "#A07820",
  goldFaint: "rgba(139,105,20,0.08)",
  text: "#111827",
  textSub: "#374151",
  textMuted: "#6B7280",
  red: "#B91C1C",
  redFaint: "rgba(185,28,28,0.07)",
  amber: "#B45309",
  amberFaint: "rgba(180,83,9,0.07)",
  blue: "#1D4ED8",
  blueFaint: "rgba(29,78,216,0.07)",
  green: "#166534",
  greenFaint: "rgba(22,101,52,0.07)",
};

const PROFILES = [
  {
    id: "compliance",
    icon: "⚖",
    label: "Compliance Officer",
    sublabel: "I have an internal AI system to assess",
    placeholder: "Describe your AI system. E.g.: 'We use a machine learning algorithm for credit scoring of our retail customers. The system analyzes payment history, demographic data and purchase behavior to determine credit limits...'",
  },
  {
    id: "vendor",
    icon: "⬡",
    label: "AI Vendor",
    sublabel: "I am developing/selling an AI product in Europe",
    placeholder: "Describe your AI product. E.g.: 'We are developing a SaaS software for automated CV screening in companies. The system uses NLP to analyze candidate profiles and assigns a compatibility score with the open position...'",
  },
  {
    id: "procurement",
    icon: "◈",
    label: "Procurement / Buyer",
    sublabel: "I am evaluating the purchase of an AI product",
    placeholder: "Describe the AI product you are evaluating. E.g.: 'We are evaluating the purchase of an AI video-interview platform that analyzes facial expressions, tone of voice and body language of candidates to provide an automated evaluation...'",
  },
];

const STEPS = [
  { id: "classify", label: "Classification" },
  { id: "map", label: "Regulatory Mapping" },
  { id: "gap", label: "Gap Analysis" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  root: {
    background: C.bg,
    minHeight: "100vh",
    color: C.text,
    fontFamily: "'DM Mono', 'Fira Code', 'Courier New', monospace",
  },
  header: {
    borderBottom: `1px solid ${C.border}`,
    padding: "1.25rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: C.surface,
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: { display: "flex", alignItems: "center", gap: 10 },
  logoMark: {
    width: 30, height: 30,
    border: `1.5px solid ${C.gold}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, color: C.gold, transform: "rotate(45deg)", flexShrink: 0,
  },
  logoMarkInner: { transform: "rotate(-45deg)" },
  logoText: { fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.text },
  logoSub: { fontSize: 10, color: C.textMuted, letterSpacing: "0.06em", marginTop: 1, textTransform: "uppercase" },
  badge: {
    fontSize: 10, padding: "3px 10px",
    border: `1px solid ${C.borderLight}`,
    color: C.textMuted, letterSpacing: "0.06em", textTransform: "uppercase",
  },
  main: { maxWidth: 860, margin: "0 auto", padding: "3rem 2rem" },
  hero: { marginBottom: "3rem" },
  heroEyebrow: { fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: C.gold, marginBottom: "0.875rem" },
  heroTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 700, lineHeight: 1.15, color: C.text, marginBottom: "1rem",
  },
  heroSub: { fontSize: 14, color: C.textSub, lineHeight: 1.75, maxWidth: 540 },
  sectionLabel: { fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textMuted, marginBottom: "0.875rem" },
  profileGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: "2.5rem" },
  profileCard: (active) => ({
    padding: "1.25rem",
    border: `1.5px solid ${active ? C.gold : C.border}`,
    background: active ? C.goldFaint : C.surface,
    cursor: "pointer", transition: "border-color 0.15s, background 0.15s",
    boxShadow: active ? "none" : "0 1px 3px rgba(0,0,0,0.05)",
  }),
  profileIcon: (active) => ({ fontSize: 18, color: active ? C.gold : C.textMuted, marginBottom: "0.75rem", display: "block" }),
  profileLabel: (active) => ({ fontSize: 13, fontWeight: 600, color: active ? C.gold : C.text, marginBottom: 3 }),
  profileSublabel: { fontSize: 11, color: C.textMuted, lineHeight: 1.5 },
  textarea: {
    width: "100%", boxSizing: "border-box",
    background: C.surface, border: `1px solid ${C.border}`,
    color: C.text, fontSize: 13, lineHeight: 1.75,
    padding: "1rem", fontFamily: "inherit", resize: "vertical",
    minHeight: 140, outline: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  charCount: { fontSize: 10, color: C.textMuted, textAlign: "right", marginTop: 5, letterSpacing: "0.06em" },
  analyzeBtn: (disabled) => ({
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "11px 22px",
    background: disabled ? "transparent" : C.goldFaint,
    border: `1px solid ${disabled ? C.border : C.gold}`,
    color: disabled ? C.textMuted : C.gold,
    fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "inherit", transition: "all 0.15s",
  }),
  stepsBar: {
    display: "flex", alignItems: "center",
    marginBottom: "2rem", borderBottom: `1px solid ${C.border}`, paddingBottom: "1.5rem",
  },
  step: (active, done) => ({
    display: "flex", alignItems: "center", gap: 7,
    fontSize: 10, color: done ? C.gold : active ? C.text : C.textMuted,
    letterSpacing: "0.1em", textTransform: "uppercase",
  }),
  stepDot: (active, done) => ({
    width: 6, height: 6, borderRadius: "50%",
    background: done ? C.gold : active ? C.text : C.textMuted,
    animation: active ? "pulse 1.5s infinite" : "none",
  }),
  stepLine: { flex: 1, height: 1, background: C.border, margin: "0 12px" },
  card: {
    background: C.surface, border: `1px solid ${C.border}`,
    padding: "1.5rem", marginBottom: "1rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  cardLabel: { fontSize: 10, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" },
  errorBox: {
    background: C.redFaint, border: `1px solid ${C.red}`,
    padding: "1rem", fontSize: 13, color: C.red, marginTop: "1rem",
  },
  resetBtn: {
    fontSize: 11, color: C.textMuted, background: "none", border: "none",
    cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase",
    fontFamily: "inherit", padding: 0, marginTop: "2.5rem", textDecoration: "underline",
  },
  footer: {
    borderTop: `1px solid ${C.border}`, padding: "1.25rem 2rem",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    fontSize: 10, color: C.textMuted, letterSpacing: "0.06em", background: C.surface,
  },
  sourceLink: {
    fontSize: 11, color: C.blue, textDecoration: "none",
    borderBottom: `1px solid rgba(29,78,216,0.3)`, paddingBottom: 1,
  },
};

// ─── Compliance Score Gauge ───────────────────────────────────────────────────
function ScoreGauge({ score }) {
  const r = 54;
  const circumference = Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? C.green : score >= 40 ? C.amber : C.red;
  const levelLabel = score >= 70 ? "HIGH COMPLIANCE" : score >= 40 ? "MEDIUM COMPLIANCE" : "LOW COMPLIANCE";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width={144} height={82} viewBox="0 0 144 82">
        <path d="M 12 76 A 60 60 0 0 1 132 76"
          fill="none" stroke={C.border} strokeWidth={7} strokeLinecap="round" />
        <path d="M 12 76 A 60 60 0 0 1 132 76"
          fill="none" stroke={color} strokeWidth={7} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s ease" }} />
        <text x="72" y="70" textAnchor="middle"
          style={{ fontSize: 28, fontWeight: 700, fontFamily: "'DM Mono',monospace", fill: C.text }}>
          {score}
        </text>
      </svg>
      <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color, fontWeight: 700 }}>
        {levelLabel}
      </div>
    </div>
  );
}

// ─── Priority Action Item ─────────────────────────────────────────────────────
function ActionItem({ action, priority, deadline, index }) {
  const colors = { HIGH: C.red, MEDIUM: C.amber, LOW: C.green };
  const bgColors = { HIGH: C.redFaint, MEDIUM: C.amberFaint, LOW: C.greenFaint };
  const color = colors[priority] || C.textMuted;
  const deadlineLabel =
    deadline === "IMMEDIATE" ? "⚡ Immediate" :
    deadline === "BEFORE_2026-08-02" ? "📅 Before Aug 2, 2026" : "🔄 Ongoing";

  return (
    <div style={{
      display: "flex", gap: 14, padding: "0.875rem 1rem",
      borderBottom: `1px solid ${C.border}`,
      background: index === 0 ? bgColors[priority] : "transparent",
    }}>
      <div style={{ flexShrink: 0, paddingTop: 2 }}>
        <div style={{
          width: 22, height: 22, border: `1.5px solid ${color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 9, color, fontWeight: 700,
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, marginBottom: 5 }}>{action}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{
            fontSize: 9, padding: "2px 7px",
            border: `1px solid ${color}`, color, letterSpacing: "0.08em",
            textTransform: "uppercase", fontWeight: 600,
          }}>{priority}</span>
          <span style={{ fontSize: 11, color: C.textMuted }}>{deadlineLabel}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Article Detail Card (collapsible) ───────────────────────────────────────
function ArticleCard({ gap }) {
  const [open, setOpen] = useState(false);
  const gapColor = { HIGH: C.red, MEDIUM: C.amber, LOW: C.amber, NONE: C.green }[gap.gapLevel] || C.textMuted;
  const gapBg = { HIGH: C.redFaint, MEDIUM: C.amberFaint, LOW: C.amberFaint, NONE: C.greenFaint }[gap.gapLevel] || "transparent";

  return (
    <div style={{ border: `1px solid ${C.border}`, marginBottom: 8, background: C.surface, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0.875rem 1rem", cursor: "pointer", background: gapBg,
          borderBottom: open ? `1px solid ${C.border}` : "none",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 9, padding: "2px 7px", border: `1px solid ${gapColor}`,
            color: gapColor, letterSpacing: "0.08em", textTransform: "uppercase",
            fontWeight: 600, flexShrink: 0,
          }}>
            {gap.gapLevel === "NONE" ? "✓ OK" : `GAP: ${gap.gapLevel}`}
          </span>
          <span style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{gap.articleNumber}</span>
          <span style={{ fontSize: 12, color: C.textSub }}>— {gap.gapTitle}</span>
        </div>
        <span style={{ fontSize: 11, color: C.textMuted, flexShrink: 0, marginLeft: 8 }}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div style={{ padding: "1.125rem 1rem 1.25rem" }}>
          <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.75, marginBottom: "1rem" }}>
            {gap.gapDescription}
          </p>

          {gap.actions?.length > 0 && gap.gapLevel !== "NONE" && (
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Required Actions
              </div>
              {gap.actions.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%", flexShrink: 0, marginTop: 6,
                    background: a.priority === "HIGH" ? C.red : a.priority === "MEDIUM" ? C.amber : C.green,
                  }} />
                  <span style={{ fontSize: 12, color: C.textSub, lineHeight: 1.65 }}>
                    {a.action}
                    <span style={{ color: C.textMuted, marginLeft: 6 }}>
                      {a.deadline === "IMMEDIATE" ? "— ⚡ Immediate" :
                       a.deadline === "BEFORE_2026-08-02" ? "— 📅 Before Aug 2, 2026" : "— 🔄 Ongoing"}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: "0.875rem", borderTop: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 10, color: C.textMuted }}>Official source:</span>
            <a
              href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
              target="_blank"
              rel="noopener noreferrer"
              style={s.sourceLink}
            >
              Regulation (EU) 2024/1689 — {gap.articleNumber} on EUR-Lex ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Steps Bar ────────────────────────────────────────────────────────────────
function StepsBar({ currentStep }) {
  const stepIndex = STEPS.findIndex((st) => st.id === currentStep);
  return (
    <div style={s.stepsBar}>
      {STEPS.map((step, i) => (
        <div key={step.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
          <div style={s.step(i === stepIndex, i < stepIndex)}>
            <div style={s.stepDot(i === stepIndex, i < stepIndex)} />
            {step.label}
          </div>
          {i < STEPS.length - 1 && <div style={s.stepLine} />}
        </div>
      ))}
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [profile, setProfile] = useState(null);
  const [description, setDescription] = useState("");
  const [phase, setPhase] = useState("input");
  const [currentStep, setCurrentStep] = useState("classify");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const selectedProfile = PROFILES.find((p) => p.id === profile);

  async function runAnalysis() {
    if (!profile || description.trim().length < 30) return;
    setPhase("analyzing");
    setError("");
    setCurrentStep("classify");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setCurrentStep("map");
      await new Promise((r) => setTimeout(r, 700));
      setCurrentStep("gap");
      const articleIds = ARTICLES_BY_PROFILE[profile] || Object.keys(ARTICLES);
      const data = await runGapAnalysis(profile, description, articleIds);
      setResult(data);
      setPhase("result");
    } catch (e) {
      setError("Analysis error. Please check your description and try again.");
      setPhase("input");
    }
  }

  function reset() {
    setPhase("input"); setResult(null);
    setError(""); setDescription("");
    setProfile(null); setCurrentStep("classify");
  }

  const READINESS = {
    NOT_COMPLIANT:       { label: "Non-Compliant",       color: C.red },
    PARTIALLY_COMPLIANT: { label: "Partially Compliant", color: C.amber },
    LARGELY_COMPLIANT:   { label: "Largely Compliant",   color: C.blue },
    COMPLIANT:           { label: "Compliant",            color: C.green },
  };

  const sortedActions = result?.priorityActions
    ? [...result.priorityActions].sort((a, b) => {
        const o = { HIGH: 0, MEDIUM: 1, LOW: 2 };
        return (o[a.priority] ?? 3) - (o[b.priority] ?? 3);
      })
    : [];

  const sortedGaps = result?.gaps
    ? [...result.gaps].sort((a, b) => {
        const o = { HIGH: 0, MEDIUM: 1, LOW: 2, NONE: 3 };
        return (o[a.gapLevel] ?? 4) - (o[b.gapLevel] ?? 4);
      })
    : [];

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        textarea:focus { border-color: ${C.gold} !important; }
        textarea::placeholder { color: ${C.textMuted}; }
        button:hover { opacity: 0.82; }
        a:hover { opacity: 0.75; }
      `}</style>

      {/* ── Header ── */}
      <header style={s.header}>
        <div style={s.logo}>
          <div style={s.logoMark}><span style={s.logoMarkInner}>⚖</span></div>
          <div>
            <div style={s.logoText}>EU AI Compliance</div>
            <div style={s.logoSub}>Gap Analysis Tool · v1.0</div>
          </div>
        </div>
        <div style={s.badge}>Reg. EU 2024/1689</div>
      </header>

      <main style={s.main}>

        {/* ══════════════════ INPUT PHASE ══════════════════ */}
        {phase === "input" && (
          <>
            <div style={s.hero}>
              <div style={s.heroEyebrow}>// EU AI Act Compliance</div>
              <h1 style={s.heroTitle}>
                Automated<br />
                <span style={{ color: C.gold }}>Gap Analysis</span>
              </h1>
              <p style={s.heroSub}>
                Describe your AI system in plain language. The tool classifies it,
                maps it against relevant EU AI Act articles, and identifies compliance
                gaps with prioritized remediation actions.
              </p>
            </div>

            <div style={s.sectionLabel}>// 01 — Select your profile</div>
            <div style={s.profileGrid}>
              {PROFILES.map((p) => (
                <div key={p.id} style={s.profileCard(profile === p.id)} onClick={() => setProfile(p.id)}>
                  <span style={s.profileIcon(profile === p.id)}>{p.icon}</span>
                  <div style={s.profileLabel(profile === p.id)}>{p.label}</div>
                  <div style={s.profileSublabel}>{p.sublabel}</div>
                </div>
              ))}
            </div>

            {profile && (
              <div style={{ marginBottom: "2rem" }}>
                <div style={s.sectionLabel}>// 02 — Describe the AI system</div>
                <textarea
                  style={s.textarea} rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={selectedProfile?.placeholder}
                />
                <div style={s.charCount}>{description.length} / min. 30 characters</div>
              </div>
            )}

            {error && <div style={s.errorBox}>{error}</div>}

            {profile && (
              <button
                style={s.analyzeBtn(!profile || description.trim().length < 30)}
                onClick={runAnalysis}
                disabled={!profile || description.trim().length < 30}
              >
                <span>→</span><span>Run Gap Analysis</span>
              </button>
            )}
          </>
        )}

        {/* ══════════════════ ANALYZING PHASE ══════════════════ */}
        {phase === "analyzing" && (
          <>
            <div style={s.hero}>
              <div style={s.heroEyebrow}>// Analysis in progress</div>
              <h1 style={s.heroTitle}>Processing<br /><span style={{ color: C.gold }}>your system</span></h1>
            </div>
            <StepsBar currentStep={currentStep} />
            <div style={s.card}>
              <div style={s.cardLabel}>
                {currentStep === "classify" && "// AI System Classification"}
                {currentStep === "map" && "// EU AI Act Article Mapping"}
                {currentStep === "gap" && "// Compliance Gap Analysis"}
              </div>
              <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.75 }}>
                {currentStep === "classify" && "Identifying risk category, application sector and affected persons..."}
                {currentStep === "map" && "Cross-referencing your profile with relevant EU AI Act articles..."}
                {currentStep === "gap" && "Evaluating compliance status article by article and generating prioritized actions..."}
              </div>
            </div>
          </>
        )}

        {/* ══════════════════ RESULT PHASE ══════════════════ */}
        {phase === "result" && result && (
          <>
            {/* ── Section 1: Executive Summary + Score ── */}
            <div style={s.heroEyebrow}>// Assessment Result</div>
            <h2 style={{ ...s.heroTitle, fontSize: "clamp(20px,3vw,30px)", marginBottom: "2rem" }}>
              {result.classification?.systemType}
            </h2>

            {/* Dashboard row: gauge + classification */}
            <div style={{
              display: "grid", gridTemplateColumns: "auto 1fr",
              gap: 24, marginBottom: "1.5rem",
              background: C.surface, border: `1px solid ${C.border}`,
              padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}>
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                paddingRight: 24, borderRight: `1px solid ${C.border}`,
              }}>
                <ScoreGauge score={result.complianceScore ?? 0} />
                {result.overallReadiness && (
                  <div style={{
                    marginTop: 10, fontSize: 10, padding: "3px 10px",
                    border: `1px solid ${READINESS[result.overallReadiness]?.color}`,
                    color: READINESS[result.overallReadiness]?.color,
                    letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600,
                  }}>
                    {READINESS[result.overallReadiness]?.label}
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: "12px 20px", marginBottom: "1rem" }}>
                  {[
                    ["Risk Category", result.classification?.riskCategory],
                    ["Sector", result.classification?.sector],
                    ["Affected Persons", result.classification?.affectedPersons],
                    ["Profile", selectedProfile?.label],
                  ].map(([k, v]) => v && (
                    <div key={k}>
                      <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{k}</div>
                      <div style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>Risk Rationale</div>
                <p style={{ fontSize: 13, color: C.textSub, lineHeight: 1.7 }}>{result.classification?.riskRationale}</p>
              </div>
            </div>

            {/* Executive Summary */}
            <div style={{ border: `1px solid ${C.gold}`, background: C.goldFaint, padding: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: 10, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                // Executive Summary
              </div>
              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8 }}>{result.executiveSummary}</p>
            </div>

            {/* Red Flags */}
            {result.redFlags?.length > 0 && (
              <div style={{ border: `1px solid ${C.red}`, background: C.redFaint, padding: "1.25rem", marginBottom: "2rem" }}>
                <div style={{ fontSize: 10, color: C.red, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  // ⚠ Critical Red Flags
                </div>
                {result.redFlags.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "flex-start" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.red, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: C.red, lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ── Section 2: Priority Action Plan ── */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ ...s.sectionLabel, marginBottom: "0.4rem" }}>// 02 — Priority Action Plan</div>
              <p style={{ fontSize: 12, color: C.textMuted, marginBottom: "1rem" }}>
                Sorted by criticality — address HIGH priority items first.
              </p>
              <div style={{ border: `1px solid ${C.border}`, background: C.surface, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" }}>
                {sortedActions.length > 0
                  ? sortedActions.map((a, i) => (
                      <ActionItem key={i} index={i} action={a.action} priority={a.priority} deadline={a.deadline} />
                    ))
                  : <div style={{ padding: "1rem", fontSize: 13, color: C.textMuted }}>No priority actions identified.</div>
                }
              </div>
            </div>

            {/* ── Section 3: Article Detail ── */}
            <div>
              <div style={{ ...s.sectionLabel, marginBottom: "0.4rem" }}>// 03 — Article-by-Article Analysis</div>
              <p style={{ fontSize: 12, color: C.textMuted, marginBottom: "1rem" }}>
                Click any row to expand the detailed gap assessment, required actions, and official source.
              </p>
              {sortedGaps.map((gap, i) => <ArticleCard key={i} gap={gap} />)}
            </div>

            {/* Footer meta */}
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: C.surface, border: `1px solid ${C.border}`, fontSize: 11, color: C.textMuted, lineHeight: 1.9 }}>
              <div>
                Regulatory source:{" "}
                <a href={EU_AI_ACT_META.source} target="_blank" rel="noopener noreferrer" style={s.sourceLink}>
                  Regulation (EU) 2024/1689 — EUR-Lex Official ↗
                </a>
              </div>
              <div>Published: {EU_AI_ACT_META.published} · In force: {EU_AI_ACT_META.inForce} · Profile: {selectedProfile?.label}</div>
            </div>

            <button style={s.resetBtn} onClick={reset}>← New Analysis</button>
          </>
        )}
      </main>

      <footer style={s.footer}>
        <span>EU AI Compliance Tool · Regulation (EU) 2024/1689</span>
        <a href={EU_AI_ACT_META.source} target="_blank" rel="noopener noreferrer"
          style={{ ...s.sourceLink, color: C.textMuted, borderBottomColor: C.border }}>
          EUR-Lex Official Source →
        </a>
      </footer>
    </div>
  );
}

// ─── API Call ────────────────────────────────────────────────────────────────
async function runGapAnalysis(profile, description, articleIds) {
  const relevantArticles = articleIds.map((id) => ARTICLES[id]);

  const systemPrompt = `You are a senior EU AI Act compliance expert with deep legal and technical expertise.
Perform a structured gap analysis of the AI system described against specific EU AI Act articles.

The user profile is "${profile}":
- "compliance": Focus on internal compliance gaps and remediation roadmap
- "vendor": Focus on product certification requirements and go-to-market blockers
- "procurement": Focus on supplier risk and contract/due diligence requirements. 
  Score reflects the vendor's demonstrated compliance posture based on evidence provided — 
  a vendor with a technical datasheet, GDPR DPA and reference EU clients should score 
  at minimum 35 even with gaps in bias documentation and AI Act classification, 
  as these are remediable gaps, not active violations.

Respond ONLY with valid JSON, no markdown, no backticks, exactly this structure:
{
  "classification": {
    "systemType": "brief technical classification",
    "riskCategory": "UNACCEPTABLE | HIGH | LIMITED | MINIMAL",
    "riskRationale": "2-3 sentence explanation",
    "sector": "identified sector/domain",
    "affectedPersons": "who is impacted"
  },
  "complianceScore": <integer 0-100>,
  "executiveSummary": "3-4 sentence executive summary",
  "overallReadiness": "NOT_COMPLIANT | PARTIALLY_COMPLIANT | LARGELY_COMPLIANT | COMPLIANT",
  "gaps": [
    {
      "articleId": "art5",
      "articleNumber": "Article 5",
      "gapLevel": "HIGH | MEDIUM | LOW | NONE",
      "gapTitle": "brief gap title",
      "gapDescription": "specific gap identified for this AI system",
      "actions": [
        { "priority": "HIGH | MEDIUM | LOW", "action": "specific action required", "deadline": "IMMEDIATE | BEFORE_2026-08-02 | ONGOING" }
      ],
      "estimatedEffort": "LOW | MEDIUM | HIGH"
    }
  ],
  "priorityActions": [
    { "priority": "HIGH | MEDIUM | LOW", "action": "top priority action", "deadline": "IMMEDIATE | BEFORE_2026-08-02 | ONGOING" }
  ],
  "redFlags": ["critical issue 1", "critical issue 2"]
}

complianceScore mapping: 
- NOT_COMPLIANT = 5–20 (no documentation, no oversight, active violations)
- PARTIALLY_COMPLIANT = 35–55 (some practices exist but major formal gaps remain)
- LARGELY_COMPLIANT = 62–78 (solid foundations, minor procedural gaps)
- COMPLIANT = 82–95 (full documentation, QMS, conformity assessment complete)

Important: a system with documented practices, human oversight, and basic audits but missing formal frameworks should score 35–55, NOT below 30. Reserve scores below 20 for systems with zero compliance measures or active prohibited practices.
Be specific. Base every finding directly on the AI system description provided.`;

  const userMessage = `AI System Description:
"${description}"

Analyze against these EU AI Act articles:
${relevantArticles.map((a) => `
${a.number} — ${a.title}
Summary: ${a.summary}
Key Obligations: ${a.keyObligations.join("; ")}
Application Date: ${a.applicationDate}
`).join("\n---\n")}`;

  const response = await fetch("/api/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ... }),
});

  const data = await response.json();
  const raw = data.content.map((i) => i.text || "").join("").replace(/```json|```/g, "").trim();
  return JSON.parse(raw);
}
