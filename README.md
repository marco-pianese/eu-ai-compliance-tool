# EU AI Compliance Tool

> Automated Gap Analysis for the EU Artificial Intelligence Act — Regulation (EU) 2024/1689

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![Regulation](https://img.shields.io/badge/EU%20AI%20Act-2024%2F1689-blue)
![Status](https://img.shields.io/badge/status-active-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## What This Does

EU AI Compliance Tool analyzes AI systems against the EU AI Act through a three-step automated process:

1. **Classification** — identifies risk category, sector, and affected persons
2. **Normative Mapping** — cross-references the system against relevant articles
3. **Gap Analysis** — produces prioritized compliance gaps with specific actions

The analysis is grounded in the official EU AI Act text (Regulation EU 2024/1689, published 12.07.2024) embedded as a structured, modular knowledge base.

---

## Who It's For

| Profile | Use Case |
|---|---|
| **Compliance Officer** | Assess an internal AI system against EU AI Act obligations |
| **AI Vendor** | Verify product compliance before commercializing in Europe |
| **Procurement / Buyer** | Evaluate supplier AI risk before purchasing a system |

---

## Key Features

- **Plain language input** — describe your AI system in natural language, no legal expertise required
- **Role-adapted output** — same analysis engine, output calibrated to the user's role
- **Grounded in official sources** — every gap finding links directly to the EUR-Lex official article
- **Prioritized actions** — each gap includes specific remediation actions with deadlines
- **Modular knowledge base** — articles stored as separate blocks, ready for v2 automated updates

---

## Tech Stack

- **Frontend**: React 18 + Vite
- **AI Engine**: Anthropic Claude (claude-sonnet) via API
- **Styling**: Pure CSS-in-JS, no external UI libraries
- **Deploy**: Vercel (Hobby plan — free)
- **Data**: EU AI Act articles as structured JS modules (`src/data/articles.js`)

---

## EU AI Act Coverage

| Article | Topic | Status |
|---|---|---|
| Art. 5 | Prohibited AI Practices | ✅ In force (Feb 2025) |
| Art. 6 + Annex III | High-Risk Classification | ⏳ August 2026 |
| Art. 9 | Risk Management System | ⏳ August 2026 |
| Art. 10 | Data Governance | ⏳ August 2026 |
| Art. 13 | Transparency | ⏳ August 2026 |
| Art. 14 | Human Oversight | ⏳ August 2026 |
| Art. 17 | Quality Management | ⏳ August 2026 |
| Art. 99 | Penalties | ⏳ August 2026 |

**Official source**: [EUR-Lex — Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)

---

## Getting Started

### Prerequisites
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/eu-ai-compliance-tool.git
cd eu-ai-compliance-tool

# Install dependencies
npm install

# Add your Anthropic API key
# Create a .env file at the root:
echo "VITE_ANTHROPIC_API_KEY=your_key_here" > .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for production

```bash
npm run build
```

---

## Deploy to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variable: `VITE_ANTHROPIC_API_KEY`
4. Deploy

That's it. Vercel auto-deploys on every push to `main`.

---

## Project Structure

```
eu-ai-compliance-tool/
├── src/
│   ├── App.jsx              # Main application — UI + analysis flow
│   ├── main.jsx             # React entry point
│   └── data/
│       └── articles.js      # EU AI Act knowledge base (modular, per-article)
├── public/
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Roadmap

### v1.0 (current)
- Three user profiles (compliance, vendor, procurement)
- 8-article EU AI Act knowledge base
- Multi-step gap analysis with prioritized actions
- Direct links to official EUR-Lex sources

### v2.0 (planned)
- **Automated normative monitoring** — weekly scan of EUR-Lex for updates to AI Act articles, delegated acts, and Commission guidelines
- **Change alerts** — notify users when articles relevant to their saved profile are amended
- **PDF report export** — downloadable gap analysis report
- **Multi-language support** — Italian, French, German
- **Expanded coverage** — GPAI model obligations (Art. 51–56), national implementation decrees

---

## Normative Disclaimer

This tool is designed for informational and educational purposes. It does not constitute legal advice. Gap analysis results should be reviewed by a qualified legal professional before making compliance decisions.

All normative content is sourced from the official EU Official Journal:
**Regulation (EU) 2024/1689 — OJ L, 2024/1689, 12.7.2024**
ELI: http://data.europa.eu/eli/reg/2024/1689/oj

---

## License

MIT — free to use, fork, and adapt with attribution.

---

## Author

Built as a portfolio project demonstrating applied AI consulting capabilities.
Combining EU regulatory knowledge, prompt engineering, and browser-based AI application development.

*Contributions and feedback welcome via Issues and Pull Requests.*
