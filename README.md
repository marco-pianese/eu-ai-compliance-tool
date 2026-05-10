# EU AI Compliance Tool — Project Recap

## Progetto
**EU AI Act Gap Analysis Tool** — portfolio project di AI consulting.
- Repo: `github.com/marco-pianese/eu-ai-compliance-tool` (public)
- Live: `https://eu-ai-compliance-tool-omega.vercel.app`
- Deploy: Vercel Hobby (free), trigger automatico su push a `main`

## Stack
- React 18 + Vite
- Anthropic API (claude-sonnet-4-20250514, max_tokens 4000)
- Vercel Serverless Function come proxy API (key protetta server-side)

## Struttura file
```
eu-ai-compliance-tool/
├── api/
│   └── analyze.js          ← serverless proxy Anthropic
├── src/
│   ├── App.jsx             ← tutto il frontend + logica
│   ├── main.jsx            ← entry point React
│   └── data/
│       └── articles.js     ← knowledge base EU AI Act (Art. 5,6,9,10,13,14,17,99)
├── index.html
├── package.json
└── vite.config.js
```

## Variabili d'ambiente Vercel
- `ANTHROPIC_API_KEY` — API key Anthropic (server-side, NON prefissata VITE_)

## Funzionalità implementate
- 3 profili utente: Compliance Officer, AI Vendor, Procurement/Buyer
- Compliance Score 0–100 con gauge SVG animato
- Executive Summary + Red Flags
- Priority Action Plan (ordinato HIGH→MEDIUM→LOW)
- Article-by-article analysis collapsible con link EUR-Lex
- UI completamente in inglese, tema light professionale

## Output struttura
1. Dashboard: score gauge + classification grid + executive summary + red flags
2. Priority Action Plan: azioni ordinate per criticità con deadline
3. Article Detail: card collapsibili per articolo con gap, azioni e fonte

## Calibrazione score validata su 9 scenari
- LOW compliance → score 5–25 (es. predictive policing: 15, loan no oversight: 8)
- MEDIUM compliance → score 36–55 (es. employee monitoring: 42, content moderation: 42)
- HIGH compliance → score 62–78 (es. medical imaging: 75, AI tutoring: 65)

## Prossimi step da fare
1. **README aggiornato** su GitHub (file pronto)
2. **Post LinkedIn** per visibilità portfolio
3. **v2 roadmap**: 
   - Rate limiting sulla serverless function (prevenire abusi)
   - Export PDF del report
   - Monitoraggio automatico aggiornamenti normativi EUR-Lex
   - Aggiunta articoli GPAI (Art. 51-56) per modelli foundation