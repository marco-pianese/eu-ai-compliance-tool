# EU AI Compliance Tool

**Automated Gap Analysis · Regulation (EU) 2024/1689 — EU AI Act**

→ **[Live Demo](https://eu-ai-compliance-tool-omega.vercel.app)**

---

## Overview

This is an **educational portfolio project** exploring the intersection of applied AI and regulatory compliance. It was built to demonstrate how large language models can be used to structure and automate complex legal analysis tasks — in this case, compliance assessment against the EU Artificial Intelligence Act (Regulation EU 2024/1689).

The tool allows anyone to describe an AI system in plain language and receive a structured gap analysis in seconds, including a compliance score, prioritized action plan, and article-by-article breakdown — output that would typically require hours of manual legal and technical review.

> **Disclaimer**: This tool is intended for educational and portfolio purposes only. It does not constitute legal advice. For formal EU AI Act compliance assessments, always consult qualified legal counsel.

---

## What it does

The user selects a profile, describes their AI system in plain language, and receives a full compliance report structured in three sections:

### Section 1 — Executive Dashboard
- **Compliance Score** (0–100) displayed as an animated gauge
- **Overall Readiness** label: Non-Compliant / Partially Compliant / Largely Compliant / Compliant
- **Risk Classification**: category, sector, affected persons, risk rationale
- **Executive Summary**: 3–4 sentence synthesis of the compliance posture
- **Critical Red Flags**: immediate blockers requiring urgent attention

### Section 2 — Priority Action Plan
- All required actions sorted by criticality (HIGH → MEDIUM → LOW)
- Each action includes a priority badge and deadline (Immediate / Before Aug 2026 / Ongoing)
- Designed to be directly actionable for compliance teams

### Section 3 — Article-by-Article Analysis
- Collapsible cards for each relevant EU AI Act article
- Each card shows: gap level, gap description, required actions, official EUR-Lex source link

---

## User Profiles

The analysis is tailored to three distinct use cases:

| Profile | Who it's for | Focus |
|---|---|---|
| **Compliance Officer** | Organizations with internal AI systems | Internal gaps and remediation roadmap |
| **AI Vendor** | Companies building AI products for the EU market | Certification requirements and go-to-market blockers |
| **Procurement / Buyer** | Organizations evaluating AI purchases | Supplier risk and due diligence requirements |

---

## EU AI Act Articles Covered

| Article | Topic | Status |
|---|---|---|
| **Art. 5** | Prohibited AI Practices | ✅ In force since Feb 2, 2025 |
| **Art. 6 + Annex III** | High-Risk AI System Classification | Applies Aug 2, 2026 |
| **Art. 9** | Risk Management System | Applies Aug 2, 2026 |
| **Art. 10** | Data and Data Governance | Applies Aug 2, 2026 |
| **Art. 13** | Transparency and Information Provision | Applies Aug 2, 2026 |
| **Art. 14** | Human Oversight | Applies Aug 2, 2026 |
| **Art. 17** | Quality Management System | Applies Aug 2, 2026 |
| **Art. 99** | Penalties | Applies Aug 2, 2026 |

All article summaries and key obligations are stored in `src/data/articles.js` and can be extended independently of the application logic.

---

## Compliance Score Calibration

The scoring model was validated across 9 test scenarios covering all three profiles at low, medium, and high compliance levels:

| Compliance Level | Score Range | Example |
|---|---|---|
| 🔴 Low | 5–25 | Predictive policing software with no documentation |
| 🟡 Medium | 36–55 | Employee monitoring with basic docs but no formal QMS |
| 🟢 High | 62–78 | Medical imaging tool with full conformity assessment |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| AI Engine | Claude Sonnet (Anthropic API) |
| API Proxy | Vercel Serverless Function |
| Hosting | Vercel (Hobby — free tier) |
| Fonts | DM Mono + Playfair Display (Google Fonts) |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser (React)                   │
│  - Renders UI                                        │
│  - Sends POST to /api/analyze with system description│
└──────────────────────┬──────────────────────────────┘
                       │ POST /api/analyze
                       ▼
┌─────────────────────────────────────────────────────┐
│         Vercel Serverless Function (api/analyze.js)  │
│  - Reads ANTHROPIC_API_KEY from environment          │
│  - Forwards request to Anthropic API                 │
│  - Returns response to browser                       │
└──────────────────────┬──────────────────────────────┘
                       │ POST /v1/messages
                       ▼
┌─────────────────────────────────────────────────────┐
│                  Anthropic API                       │
│  - claude-sonnet-4-20250514                          │
│  - Returns structured JSON gap analysis              │
└─────────────────────────────────────────────────────┘
```

The serverless proxy is a critical security layer: the API key lives exclusively on the server and is never included in the client-side JavaScript bundle.

---

## How to Replicate This Project

This section explains everything you need to build and deploy your own instance from scratch.

### Prerequisites

You will need:
- A **GitHub account** (free) — to host the code
- A **Vercel account** (free Hobby plan) — to deploy the app
- An **Anthropic account** — to access the Claude API
  - Sign up at [console.anthropic.com](https://console.anthropic.com)
  - Create an API key under **API Keys**
  - Note: API usage is pay-per-use. Each analysis call costs approximately $0.03–0.05 with the current model and token settings. Set a monthly spending limit in the Anthropic console to cap costs.

### Step 1 — Fork or clone the repository

```bash
git clone https://github.com/marco-pianese/eu-ai-compliance-tool
cd eu-ai-compliance-tool
npm install
```

### Step 2 — Set up local environment

Create a file called `.env.local` in the root of the project:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

This file is listed in `.gitignore` and will never be committed to GitHub.

### Step 3 — Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note on local API calls**: When running locally, the serverless function at `api/analyze.js` does not execute automatically. For local development you can temporarily revert the fetch URL in `App.jsx` from `/api/analyze` back to `https://api.anthropic.com/v1/messages` with the browser-access headers, then revert before deploying.

### Step 4 — Deploy to Vercel

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and create a new project
3. Import your GitHub repository
4. In **Project Settings → Environment Variables**, add:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: your Anthropic API key
   - **Environment**: Production, Preview, Development
5. Deploy — Vercel will automatically detect the Vite framework and configure the build

Every subsequent `git push` to `main` will trigger an automatic redeploy.

### Step 5 — Extend the knowledge base

To add or modify EU AI Act articles, edit `src/data/articles.js`. Each article follows this structure:

```js
art_XX: {
  id: "art_XX",
  number: "Article XX",
  title: "Article Title",
  applicationDate: "YYYY-MM-DD",
  status: "IN_FORCE | UPCOMING",
  source: "https://eur-lex.europa.eu/...",
  summary: "Plain-language summary of the article",
  keyObligations: [
    "Obligation 1",
    "Obligation 2",
  ],
  riskIfNonCompliant: "Fine description",
  relevantProfiles: ["compliance", "vendor", "procurement"],
}
```

Then add the article ID to the relevant profile arrays in `ARTICLES_BY_PROFILE`.

---

## Project Structure

```
eu-ai-compliance-tool/
├── api/
│   └── analyze.js          # Vercel serverless function (API proxy)
├── src/
│   ├── App.jsx             # Main application — UI, logic, API call
│   ├── main.jsx            # React entry point
│   └── data/
│       └── articles.js     # EU AI Act knowledge base
├── index.html              # HTML shell
├── package.json
├── vite.config.js
└── README.md
```

---

## Regulatory Source

All analysis is grounded in the official text of the EU Artificial Intelligence Act:

**Regulation (EU) 2024/1689 of the European Parliament and of the Council**
Published in the Official Journal of the European Union on July 12, 2024.

→ [Full text on EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)

---

## Roadmap (v2 ideas)

- [ ] Export analysis as PDF report
- [ ] Rate limiting on the serverless function to prevent abuse
- [ ] Automated normative monitoring via EUR-Lex API
- [ ] Coverage of GPAI model obligations (Art. 51–56)
- [ ] Multi-language support (IT, DE, FR)

---

*Built as an applied AI consulting portfolio project — May 2026*
*Author: Marco Pianese · [LinkedIn](https://www.linkedin.com/in/marco-pianese-40b3901b6/)*