# Hanshal Nursinghdass – QA Engineering Portfolio

> **ISTQB Certified QA Engineer** with 5+ years experience building agentic AI workflows,
> scalable test automation frameworks, and delivering quality assurance across multi-domain
> digital platforms.

## 📍 Contact Information
- 🌍 **Location**: Mauritius (Open to global remote roles)
- 📧 **Email**: hanshal.hn@gmail.com
- 🔗 **LinkedIn**: [linkedin.com/in/hanshal-nursinghdass](https://linkedin.com/in/hanshal-nursinghdass)

### QA Philosophy
*"Quality engineering is evolving — and I'm building at that frontier. I design agentic AI pipelines that automate blast radius analysis, self-heal failing tests, and standardise dev-to-QA handoffs. But automation and AI are only as good as the human reasoning behind them: curiosity, critical thinking, and a genuine understanding of what the user actually experiences."*

---

## 🏆 Highlights & Achievements

- **Engineered 3 chained Claude Code commands and 9 custom AI agents** (Blast Radius, Pre-QA Review, QA Test Paths) that spawn parallel domain-scoped agents to trace PR impact across configs, feature flags, view overrides, and scheduling rules — deployed on every PR for 2+ consecutive months
- **Built and maintain a Cypress overnight regression suite of 500+ test cases** spanning regression and SEO validation, reducing full regression execution time by ~70% and eliminating manual regression cycles before each release
- **Sole QA owner across 5 live production domains** (Africa & Romania) — full lifecycle from requirements review to post-release validation, with no QA backup
- **Designed an end-to-end agentic self-healing pipeline**: Playwright MCP inspects live locators, reruns tests, diagnoses failures, applies fixes, and auto-posts summaries to Jira
- **Developed a custom Claude Code skill** for Cypress refactoring with a 3-phase workflow: discovery, Playwright MCP live validation of selectors and flows, then refactoring — enforcing project-specific rules at scale
- **Executed SEO testing** as part of every release — metadata, structured data, crawlability, and Core Web Vitals validated across all domains
- **Applied security testing** through bug bounty participation — identifying and confirming vulnerabilities on live production domains and validating fixes
- **Led Bug Bash sessions and QA sprint retrospectives** driving quality culture across engineering teams
- **Mentored interns and serve as cross-team QA point of contact**, providing guidance to QA engineers across the company on testing strategy and AI-assisted workflows
- **Built a full-stack internal security tool** (Angular + C# + .NET) replacing a fully manual process

---

## 🎓 Licenses & Certifications

### **Professional Certifications**
- **ISTQB® Certified Tester Foundation Level (CTFL)** | *ISTQB®*

### **Cloud & Technology Certifications**
- **AWS Certified Cloud Practitioner** | *Amazon Web Services*
- **Microsoft Certified: Azure Fundamentals** | *Microsoft*

### **Test Automation & AI**
- **Learn GenAI Tools & AI Agents for Software Testing** | *Udemy*
- **Cypress – Modern Automation Testing from Scratch + Frameworks** | *Udemy*
- **Automation using Ranorex** | *Rubric Quality Consultants Ltd*

### **Software Testing**
- **Software Testing Masterclass – From Novice to Expert** | *Udemy*

### **Project Management**
- **Project Management Foundations** | *LinkedIn Learning*

---

## 🎓 Education

### **BSc Hons Computer Science** — 2nd Class 1st Division
**University of Mauritius** | *2017 – 2020*

---

## 💬 Professional Recommendations

🔗 **[View LinkedIn Recommendations](https://www.linkedin.com/in/hanshal-nursinghdass/details/recommendations)**

---

## 🧰 Technical Skills & Expertise

| Category | Tools & Technologies |
|---|---|
| **QA & Testing** | Manual, Functional, Regression, Exploratory, E2E, Cross-Browser, API, UI/UX, Risk-Based, Shift-Left, Agile, SEO Testing, Security Testing |
| **Automation & Frameworks** | Cypress (JavaScript), Selenium (C#), Playwright, BDD (Gherkin/Cucumber), Ranorex |
| **AI & Agentic Tooling** | Claude Code, Agentic Workflows, Claude Cowork, GitHub Copilot, ChatGPT, OpenAI Codex, Playwright MCP |
| **Tools & Test Management** | TestRail, Jira, Postman, BrowserStack, Swagger, GitHub |
| **Analytics & Monitoring** | Datadog, Google Analytics, Microsoft Clarity, Sailthru, Google Search Console |
| **Dev & Cloud** | JavaScript, C#, Angular, ASP.NET MVC, Entity Framework, SQL, Azure DevOps, AWS, CI/CD |
| **Methodologies** | BDD, TDD, Risk-Based Testing, Shift-Left, Agile, Test Pyramid, SDLC |

---

## 🚀 Agentic AI in QA — What I've Built

### Blast Radius Analysis Pipeline (Ringier Jobs Platform)

**3 Claude Code commands + 9 custom AI agents** chained into a full QA prep workflow for a multi-tenant jobs platform serving 7 domains across Africa and Romania.

```
Developer raises PR
  → /blast_radius     → Spawns parallel domain-scoped agents → Branded PDF report
  → /pre_qa_review    → Cross-references report vs Jira ticket → Severity-rated QA comment
  → /qa_test_paths    → Generates structured, copy-pastable test cases from analysis
```

**Architecture:**
- **9 custom agents** built for the codebase: `qa-tenant-analyzer`, `qa-tenant-locator`, `codebase-analyzer`, `codebase-locator`, `codebase-pattern-finder`, `docs-analyzer`, `docs-locator`, `playwright-ui-tester`, `web-search-researcher`
- **Domain-scoped agents** independently trace execution paths through the multi-domain override chain: config overrides, view overrides, feature flags, class bindings, and data isolation — per domain (ke, ng, gh, ug, ro, rw, tz)
- **Pre-QA Review** acts as a gatekeeper between dev and QA — producing severity-rated findings (🔴 blocker, 🟡 required, 🔵 advisory) cross-referenced against the Jira ticket
- **QA Test Paths** generates domain-specific, regression, and acceptance test cases — structured and copy-pastable

**Additional commands built:**
- `/close_ticket_workflow` — Commit, push to fork, create/update PR with structured problem/solution description, and generate permanent change documentation
- `/create_handoff` — Context transfer documents for seamless session handoffs
- `/test-ui` — Interactive UI testing and design review using Playwright MCP with auto-detection of changed areas

Everything lives in `.claude/commands/`, `.claude/skills/`, and `.claude/agents/` — transparent, version-controlled, and iterable.

---

### Cypress Test Suite Optimisation Skill

A custom Claude Code skill with a strict **3-phase workflow**:

1. **Phase 1: Discovery** — Analyses the target test suite, maps all custom commands in use, and identifies reusable patterns across the project
2. **Phase 2: Playwright MCP Validation (mandatory)** — Walks through the real application in the browser, completing full end-to-end flows for each test case, validating every selector against the live DOM, and documenting any discrepancies before any code is changed
3. **Phase 3: Refactoring** — Applies changes based on both code analysis AND live validation findings. Enforces project-specific rules (Alpine.js reinitialisation, existing selectors, inline comments), eliminates redundancy, strengthens assertions, and outputs a Jira-ready change summary

---

### Agentic Self-Healing Pipeline *(in progress)*

End-to-end pipeline designed to close the loop between test failure and fix:

1. **Playwright MCP** inspects live element locators in real-time and flags stale/flaky ones
2. **Reruns** refactored and related test cases to catch regressions early
3. **Self-heals** failing tests — investigates root cause, applies fix, reruns to confirm
4. **Auto-posts** a structured change summary to the linked Jira ticket

---

## 📋 QA Approach & Methodology

- **Shift-Left by default**: QA involvement from requirements, not just test phase
- **Risk-Based Planning**: Coverage prioritised by impact and likelihood of failure
- **Agentic Automation**: AI pipelines that reduce manual overhead and standardise handoffs
- **BDD Collaboration**: Gherkin scenarios as a shared language between dev, QA, and product
- **SEO Testing**: Metadata, structured data, crawlability, and Core Web Vitals validated as part of every release sign-off
- **Security Testing**: Bug bounty participation to identify and confirm vulnerabilities on live domains; validates fixes against common web security issues
- **Analytics-Driven**: Production signals from Datadog, Clarity, and GSC feed back into test strategy

---

## 🎯 What I Bring to Your Team

✅ **ISTQB Certified** with 5+ years across multi-domain, multi-tenant platforms
✅ **Agentic AI Builder**: Designs and ships Claude Code pipelines that replace manual QA prep work — not just prompts existing tools
✅ **Sole QA ownership**: Proven ability to own full QA lifecycle across 5 live domains with no backup
✅ **500+ automated tests**: Cypress suite spanning regression and SEO validation, cutting release cycle time by ~70%
✅ **Cross-team QA leader**: Point of contact for QA engineers across the company; mentors interns and guides testing strategy
✅ **Full-stack capable**: Angular + C# + .NET beyond traditional QA scope
✅ **Shift-Left practitioner**: Risk-based, early-involvement QA embedded in sprint workflow
✅ **Team multiplier**: Mentors interns, leads Bug Bash, and drives quality culture

---

## 📞 Contact & Opportunities

- 📧 hanshal.hn@gmail.com
- 🔗 [linkedin.com/in/hanshal-nursinghdass](https://www.linkedin.com/in/hanshal-nursinghdass)

---

*Last Updated: April 2026 | Status: Actively Maintained ✅*
