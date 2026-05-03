import { useState } from "react";
import { ARTICLES, ARTICLES_BY_PROFILE, EU_AI_ACT_META } from "./data/articles.js";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#0D0F14",
  surface: "#13161E",
  surfaceHover: "#1A1E29",
  border: "#1F2433",
  borderLight: "#2A3045",
  gold: "#C9A84C",
  goldLight: "#E2C97E",
  goldFaint: "rgba(201,168,76,0.08)",
  text: "#E8EAF0",
  textSub: "#8892A4",
  textMuted: "#4A5468",
  red: "#E05252",
  redFaint: "rgba(224,82,82,0.08)",
  amber: "#D4822A",
  amberFaint: "rgba(212,130,42,0.08)",
  blue: "#4A8FD4",
  blueFaint: "rgba(74,143,212,0.08)",
  green: "#4CAF7D",
  greenFaint: "rgba(76,175,125,0.08)",
};

const PROFILES = [
  {
    id: "compliance",
    icon: "⚖",
    label: "Compliance Officer",
    sublabel: "Ho un sistema AI interno da valutare",
    description:
      "Valuta la conformità di un sistema AI già in uso o in sviluppo nella tua organizzazione rispetto all'EU AI Act.",
    placeholder:
      "Descrivi il tuo sistema AI. Es: 'Utilizziamo un algoritmo di machine learning per lo scoring del credito dei nostri clienti retail. Il sistema analizza storico pagamenti, dati demografici e comportamento di acquisto per determinare il limite di credito...'",
  },
  {
    id: "vendor",
    icon: "⬡",
    label: "AI Vendor",
    sublabel: "Sto sviluppando/vendendo un prodotto AI in Europa",
    description:
      "Verifica se il tuo prodotto AI è conforme prima di commercializzarlo nel mercato europeo.",
    placeholder:
      "Descrivi il tuo prodotto AI. Es: 'Stiamo sviluppando un software SaaS per la selezione automatica dei CV nelle aziende. Il sistema utilizza NLP per analizzare i profili dei candidati e assegna uno score di compatibilità con la posizione aperta...'",
  },
  {
    id: "procurement",
    icon: "◈",
    label: "Acquirente / Procurement",
    sublabel: "Sto valutando l'acquisto di un prodotto AI",
    description:
      "Prima di acquistare un sistema AI, verifica se espone la tua organizzazione a rischi di non conformità.",
    placeholder:
      "Descrivi il prodotto AI che stai valutando. Es: 'Stiamo valutando l'acquisto di una piattaforma di video-interviste AI che analizza le espressioni facciali, il tono della voce e il linguaggio del corpo dei candidati per fornire una valutazione automatica...'",
  },
];

const STEPS = [
  { id: "classify", label: "Classificazione", icon: "◎" },
  { id: "map", label: "Mapping Normativo", icon: "◈" },
  { id: "gap", label: "Gap Analysis", icon: "⬡" },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  root: {
    background: C.bg,
    minHeight: "100vh",
    color: C.text,
    fontFamily: "'DM Mono', 'Fira Code', 'Courier New', monospace",
    padding: "0",
  },
  header: {
    borderBottom: `1px solid ${C.border}`,
    padding: "1.5rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoMark: {
    width: 32,
    height: 32,
    border: `1.5px solid ${C.gold}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    color: C.gold,
    transform: "rotate(45deg)",
  },
  logoMarkInner: {
    transform: "rotate(-45deg)",
  },
  logoText: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: C.text,
  },
  logoSub: {
    fontSize: 10,
    color: C.textMuted,
    letterSpacing: "0.08em",
    marginTop: 2,
    textTransform: "uppercase",
  },
  badge: {
    fontSize: 10,
    padding: "3px 8px",
    border: `1px solid ${C.borderLight}`,
    color: C.textMuted,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  main: {
    maxWidth: 820,
    margin: "0 auto",
    padding: "3rem 2rem",
  },
  hero: {
    marginBottom: "3rem",
  },
  heroLabel: {
    fontSize: 10,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: C.gold,
    marginBottom: "1rem",
  },
  heroTitle: {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: 700,
    lineHeight: 1.2,
    color: C.text,
    marginBottom: "1rem",
  },
  heroSub: {
    fontSize: 14,
    color: C.textSub,
    lineHeight: 1.7,
    maxWidth: 560,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: C.textMuted,
    marginBottom: "1rem",
  },
  profileGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
    marginBottom: "2.5rem",
  },
  profileCard: (active) => ({
    padding: "1.25rem",
    border: `1px solid ${active ? C.gold : C.border}`,
    background: active ? C.goldFaint : C.surface,
    cursor: "pointer",
    transition: "all 0.2s",
    position: "relative",
  }),
  profileIcon: (active) => ({
    fontSize: 20,
    color: active ? C.gold : C.textMuted,
    marginBottom: "0.75rem",
    display: "block",
  }),
  profileLabel: (active) => ({
    fontSize: 13,
    fontWeight: 600,
    color: active ? C.goldLight : C.text,
    marginBottom: 4,
    letterSpacing: "0.02em",
  }),
  profileSublabel: {
    fontSize: 11,
    color: C.textMuted,
    lineHeight: 1.5,
  },
  inputArea: {
    marginBottom: "2rem",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    background: C.surface,
    border: `1px solid ${C.border}`,
    color: C.text,
    fontSize: 13,
    lineHeight: 1.7,
    padding: "1rem",
    fontFamily: "inherit",
    resize: "vertical",
    minHeight: 140,
    outline: "none",
  },
  charCount: {
    fontSize: 10,
    color: C.textMuted,
    textAlign: "right",
    marginTop: 6,
    letterSpacing: "0.06em",
  },
  analyzeBtn: (disabled) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 24px",
    background: disabled ? "transparent" : C.goldFaint,
    border: `1px solid ${disabled ? C.border : C.gold}`,
    color: disabled ? C.textMuted : C.gold,
    fontSize: 12,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  }),
  stepsBar: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    marginBottom: "2rem",
    borderBottom: `1px solid ${C.border}`,
    paddingBottom: "1.5rem",
  },
  step: (active, done) => ({
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11,
    color: done ? C.gold : active ? C.text : C.textMuted,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  }),
  stepDot: (active, done) => ({
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: done ? C.gold : active ? C.text : C.textMuted,
    animation: active ? "pulse 1.5s infinite" : "none",
  }),
  stepLine: {
    flex: 1,
    height: 1,
    background: C.border,
    margin: "0 12px",
  },
  streamBlock: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    padding: "1.25rem",
    marginBottom: "1rem",
    fontSize: 12,
    lineHeight: 1.8,
    color: C.textSub,
  },
  streamLabel: {
    fontSize: 10,
    color: C.gold,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "0.5rem",
  },
  resultCard: {
    border: `1px solid ${C.border}`,
    marginBottom: 12,
    overflow: "hidden",
  },
  resultHeader: (risk) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.875rem 1rem",
    background: risk === "HIGH" ? C.redFaint : risk === "MEDIUM" ? C.amberFaint : C.greenFaint,
    borderBottom: `1px solid ${C.border}`,
  }),
  resultArticle: {
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: C.textSub,
  },
  riskBadge: (risk) => ({
    fontSize: 10,
    padding: "2px 8px",
    border: `1px solid ${risk === "HIGH" ? C.red : risk === "MEDIUM" ? C.amber : C.green}`,
    color: risk === "HIGH" ? C.red : risk === "MEDIUM" ? C.amber : C.green,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  }),
  resultBody: {
    padding: "1rem",
  },
  resultTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: C.text,
    marginBottom: "0.5rem",
  },
  resultText: {
    fontSize: 12,
    color: C.textSub,
    lineHeight: 1.7,
    marginBottom: "0.75rem",
  },
  gapList: {
    margin: 0,
    padding: "0 0 0 1rem",
    fontSize: 12,
    color: C.textSub,
    lineHeight: 1.8,
  },
  actionItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    fontSize: 12,
    color: C.textSub,
    lineHeight: 1.6,
    marginBottom: 6,
  },
  actionDot: (priority) => ({
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: priority === "HIGH" ? C.red : priority === "MEDIUM" ? C.amber : C.green,
    flexShrink: 0,
    marginTop: 5,
  }),
  summaryBox: {
    border: `1px solid ${C.gold}`,
    background: C.goldFaint,
    padding: "1.25rem",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
  summaryTitle: {
    fontSize: 10,
    color: C.gold,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: "0.75rem",
  },
  summaryText: {
    fontSize: 13,
    color: C.text,
    lineHeight: 1.75,
  },
  sourceLink: {
    fontSize: 10,
    color: C.textMuted,
    textDecoration: "none",
    letterSpacing: "0.04em",
    borderBottom: `1px solid ${C.border}`,
    paddingBottom: 1,
  },
  errorBox: {
    background: C.redFaint,
    border: `1px solid ${C.red}`,
    padding: "1rem",
    fontSize: 12,
    color: C.red,
    marginTop: "1rem",
  },
  resetBtn: {
    fontSize: 11,
    color: C.textMuted,
    background: "none",
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "inherit",
    padding: 0,
    marginTop: "2rem",
    textDecoration: "underline",
  },
  footer: {
    borderTop: `1px solid ${C.border}`,
    padding: "1.5rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 10,
    color: C.textMuted,
    letterSpacing: "0.06em",
  },
};

// ─── API Call ────────────────────────────────────────────────────────────────
async function runGapAnalysis(profile, description, articleIds) {
  const relevantArticles = articleIds.map((id) => ARTICLES[id]);

  const systemPrompt = `You are a senior EU AI Act compliance expert with deep legal and technical expertise.
Your task is to perform a structured gap analysis of an AI system against specific EU AI Act articles.

The user is a "${profile}" — tailor your analysis accordingly:
- "compliance": Focus on internal compliance gaps and remediation roadmap
- "vendor": Focus on product certification requirements and go-to-market blockers  
- "procurement": Focus on supplier risk and contract/due diligence requirements

You MUST respond ONLY with valid JSON, no markdown, no backticks, exactly this structure:
{
  "classification": {
    "systemType": "brief technical classification of the AI system",
    "riskCategory": "UNACCEPTABLE | HIGH | LIMITED | MINIMAL",
    "riskRationale": "2-3 sentence explanation of risk classification",
    "sector": "identified sector/domain",
    "affectedPersons": "who is impacted by this AI system"
  },
  "executiveSummary": "3-4 sentence executive summary of the overall compliance posture",
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
      "estimatedEffort": "LOW | MEDIUM | HIGH",
      "sourceUrl": "article URL"
    }
  ],
  "priorityActions": [
    { "priority": "HIGH | MEDIUM | LOW", "action": "top priority action", "deadline": "IMMEDIATE | BEFORE_2026-08-02 | ONGOING" }
  ],
  "redFlags": ["critical issue 1", "critical issue 2"]
}

Be specific. Base every gap finding directly on the AI system description provided. Do not add generic gaps not supported by the description.`;

  const userMessage = `AI System Description:
"${description}"

Analyze against these EU AI Act articles:
${relevantArticles
  .map(
    (a) => `
${a.number} — ${a.title}
Summary: ${a.summary}
Key Obligations: ${a.keyObligations.join("; ")}
Application Date: ${a.applicationDate}
`
  )
  .join("\n---\n")}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  const data = await response.json();
  const raw = data.content
    .map((i) => i.text || "")
    .join("")
    .replace(/```json|```/g, "")
    .trim();
  return JSON.parse(raw);
}

// ─── Components ───────────────────────────────────────────────────────────────
function StepsBar({ currentStep }) {
  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);
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

function GapCard({ gap }) {
  const article = ARTICLES[gap.articleId];
  return (
    <div style={s.resultCard}>
      <div style={s.resultHeader(gap.gapLevel)}>
        <span style={s.resultArticle}>{gap.articleNumber} — {gap.gapTitle}</span>
        <span style={s.riskBadge(gap.gapLevel)}>
          {gap.gapLevel === "NONE" ? "✓ Compliant" : `Gap: ${gap.gapLevel}`}
        </span>
      </div>
      <div style={s.resultBody}>
        <div style={s.resultText}>{gap.gapDescription}</div>
        {gap.actions?.length > 0 && gap.gapLevel !== "NONE" && (
          <div>
            <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
              Azioni richieste
            </div>
            {gap.actions.map((a, i) => (
              <div key={i} style={s.actionItem}>
                <div style={s.actionDot(a.priority)} />
                <span>{a.action} <span style={{ color: C.textMuted }}>— {a.deadline}</span></span>
              </div>
            ))}
          </div>
        )}
        {article && (
          <div style={{ marginTop: "0.75rem" }}>
            <a href={article.source} target="_blank" rel="noopener noreferrer" style={s.sourceLink}>
              → {article.number} — Official Source EUR-Lex
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [profile, setProfile] = useState(null);
  const [description, setDescription] = useState("");
  const [phase, setPhase] = useState("input"); // input | analyzing | result
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
      setError("Errore durante l'analisi. Verifica la descrizione e riprova.");
      setPhase("input");
    }
  }

  function reset() {
    setPhase("input");
    setResult(null);
    setError("");
    setDescription("");
    setProfile(null);
    setCurrentStep("classify");
  }

  const READINESS_LABELS = {
    NOT_COMPLIANT: { label: "Non Conforme", color: C.red },
    PARTIALLY_COMPLIANT: { label: "Parzialmente Conforme", color: C.amber },
    LARGELY_COMPLIANT: { label: "Largamente Conforme", color: C.blue },
    COMPLIANT: { label: "Conforme", color: C.green },
  };

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        textarea:focus { border-color: ${C.gold} !important; }
        textarea::placeholder { color: ${C.textMuted}; }
      `}</style>

      {/* Header */}
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
        {/* Input Phase */}
        {phase === "input" && (
          <>
            <div style={s.hero}>
              <div style={s.heroLabel}>// EU AI Act Compliance</div>
              <h1 style={s.heroTitle}>
                Gap Analysis<br />
                <span style={{ color: C.gold }}>Automatica</span>
              </h1>
              <p style={s.heroSub}>
                Descrivi il tuo sistema AI in linguaggio naturale. Lo strumento lo
                classifica, lo mappa sugli articoli rilevanti dell'EU AI Act, e
                identifica i gap di conformità con azioni prioritizzate.
              </p>
            </div>

            <div style={s.sectionLabel}>// 01 — Seleziona il tuo profilo</div>
            <div style={s.profileGrid}>
              {PROFILES.map((p) => (
                <div
                  key={p.id}
                  style={s.profileCard(profile === p.id)}
                  onClick={() => setProfile(p.id)}
                >
                  <span style={s.profileIcon(profile === p.id)}>{p.icon}</span>
                  <div style={s.profileLabel(profile === p.id)}>{p.label}</div>
                  <div style={s.profileSublabel}>{p.sublabel}</div>
                </div>
              ))}
            </div>

            {profile && (
              <div style={s.inputArea}>
                <div style={s.sectionLabel}>// 02 — Descrivi il sistema AI</div>
                <textarea
                  style={s.textarea}
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={selectedProfile?.placeholder}
                />
                <div style={s.charCount}>{description.length} / min. 30 caratteri</div>
              </div>
            )}

            {error && <div style={s.errorBox}>{error}</div>}

            {profile && (
              <button
                style={s.analyzeBtn(!profile || description.trim().length < 30)}
                onClick={runAnalysis}
                disabled={!profile || description.trim().length < 30}
              >
                <span>→</span>
                <span>Avvia Gap Analysis</span>
              </button>
            )}
          </>
        )}

        {/* Analyzing Phase */}
        {phase === "analyzing" && (
          <>
            <div style={s.hero}>
              <div style={s.heroLabel}>// Analisi in corso</div>
              <h1 style={s.heroTitle}>Elaborazione<br /><span style={{ color: C.gold }}>del sistema</span></h1>
            </div>
            <StepsBar currentStep={currentStep} />
            <div style={s.streamBlock}>
              <div style={s.streamLabel}>
                {currentStep === "classify" && "// Classificazione sistema AI"}
                {currentStep === "map" && "// Mapping articoli EU AI Act"}
                {currentStep === "gap" && "// Analisi gap di conformità"}
              </div>
              <div>
                {currentStep === "classify" && "Identificazione categoria di rischio, settore di applicazione e soggetti coinvolti..."}
                {currentStep === "map" && "Incrocio del profilo con gli articoli rilevanti dell'EU AI Act in base al contesto..."}
                {currentStep === "gap" && "Valutazione dello stato di conformità articolo per articolo e generazione azioni prioritizzate..."}
              </div>
            </div>
          </>
        )}

        {/* Result Phase */}
        {phase === "result" && result && (
          <>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={s.heroLabel}>// Risultato Gap Analysis</div>
                <h2 style={{ ...s.heroTitle, fontSize: "clamp(22px,3vw,32px)", marginBottom: 0 }}>
                  {result.classification?.systemType}
                </h2>
              </div>
              {result.overallReadiness && (
                <div style={{
                  border: `1px solid ${READINESS_LABELS[result.overallReadiness]?.color || C.border}`,
                  padding: "0.5rem 1rem",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: READINESS_LABELS[result.overallReadiness]?.color || C.text,
                }}>
                  {READINESS_LABELS[result.overallReadiness]?.label}
                </div>
              )}
            </div>

            {/* Classification */}
            <div style={s.streamBlock}>
              <div style={s.streamLabel}>// Classificazione</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: "0.75rem" }}>
                {[
                  ["Categoria Rischio", result.classification?.riskCategory],
                  ["Settore", result.classification?.sector],
                  ["Soggetti Coinvolti", result.classification?.affectedPersons],
                ].map(([k, v]) => v && (
                  <div key={k}>
                    <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{k}</div>
                    <div style={{ fontSize: 12, color: C.text }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.7, marginTop: "0.5rem" }}>
                {result.classification?.riskRationale}
              </div>
            </div>

            {/* Executive Summary */}
            <div style={s.summaryBox}>
              <div style={s.summaryTitle}>// Executive Summary</div>
              <div style={s.summaryText}>{result.executiveSummary}</div>
            </div>

            {/* Red Flags */}
            {result.redFlags?.length > 0 && (
              <div style={{ ...s.streamBlock, background: C.redFaint, border: `1px solid ${C.red}`, marginBottom: "1.5rem" }}>
                <div style={{ ...s.streamLabel, color: C.red }}>// ⚠ Red Flags</div>
                {result.redFlags.map((f, i) => (
                  <div key={i} style={{ ...s.actionItem, color: C.red }}>
                    <div style={{ ...s.actionDot("HIGH") }} />
                    {f}
                  </div>
                ))}
              </div>
            )}

            {/* Gap Cards */}
            <div style={s.sectionLabel}>// Analisi per Articolo</div>
            {result.gaps?.map((gap, i) => <GapCard key={i} gap={gap} />)}

            {/* Priority Actions */}
            {result.priorityActions?.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <div style={s.sectionLabel}>// Piano d'Azione Prioritizzato</div>
                <div style={s.streamBlock}>
                  {result.priorityActions.map((a, i) => (
                    <div key={i} style={{ ...s.actionItem, marginBottom: 10 }}>
                      <div style={s.actionDot(a.priority)} />
                      <span>
                        <span style={{ color: a.priority === "HIGH" ? C.red : a.priority === "MEDIUM" ? C.amber : C.green, marginRight: 6, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          [{a.priority}]
                        </span>
                        {a.action}
                        <span style={{ color: C.textMuted, marginLeft: 8 }}>— {a.deadline}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source */}
            <div style={{ marginTop: "1.5rem", fontSize: 11, color: C.textMuted, lineHeight: 1.8 }}>
              <div>Fonte normativa: <a href={EU_AI_ACT_META.source} target="_blank" rel="noopener noreferrer" style={s.sourceLink}>Regulation (EU) 2024/1689 — EUR-Lex Official</a></div>
              <div>Versione: {EU_AI_ACT_META.published} · Profilo: {selectedProfile?.label}</div>
            </div>

            <button style={s.resetBtn} onClick={reset}>← Nuova analisi</button>
          </>
        )}
      </main>

      <footer style={s.footer}>
        <span>EU AI Compliance Tool · Regulation (EU) 2024/1689</span>
        <a href={EU_AI_ACT_META.source} target="_blank" rel="noopener noreferrer" style={{ ...s.sourceLink, color: C.textMuted }}>
          EUR-Lex Official Source →
        </a>
      </footer>
    </div>
  );
}
