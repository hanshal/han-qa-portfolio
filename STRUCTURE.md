# Portfolio Structure Guide

## 📁 Repository Organization

```
han-qa-portfolio/
├── README.md                          # Quick navigation hub
├── PORTFOLIO_OVERVIEW.md              # Complete professional overview
├── LICENSE                           # MIT license
├── CONTRIBUTING.md                   # Contribution guidelines
└── E-commerce Platform/              # Featured QA automation project
    ├── PROJECT_SETUP_GUIDE.md        # Technical setup and documentation
    ├── QA Automation/                # Cypress test framework
    │   ├── cypress/
    │   │   ├── e2e/                  # Test files (.cy.js + .feature)
    │   │   │   ├── auth/             # Authentication tests
    │   │   │   └── workflow/         # E-commerce workflows
    │   │   ├── fixtures/             # Test data (JSON)
    │   │   ├── support/
    │   │   │   ├── pages/            # Page Object Models
    │   │   │   ├── step_definitions/ # BDD step implementations
    │   │   │   ├── commands.js       # Custom Cypress commands
    │   │   │   └── e2e.js           # Global configuration
    │   │   └── output/               # Test execution results
    ├── cypress.config.js         # Cypress configuration
    └── package.json              # Dependencies and scripts
    └── QA_Artifacts/                 # Test documentation
        ├── 1. High_Level_Requirements.md
        ├── 2. Test_Plan_Summary.md
        ├── 3. Test_Cases.md
        ├── 4. End_to_End_Functional_Flow_E2E_01.md
        └── 5. Test_Pyramid_and_Automation_Strategy.md
```

## 🚀 Quick Navigation

**For Employers/Recruiters:**
- Start with: [Main README](../README.md) - Quick navigation
- Full overview: [Portfolio Overview](../PORTFOLIO_OVERVIEW.md) - Complete details
- Technical project: [E-commerce Platform Setup](../E-commerce%20Platform/PROJECT_SETUP_GUIDE.md)
- See documentation: [QA Artifacts](../E-commerce%20Platform/QA_Artifacts/) - Multiple test documents

**For Developers:**
- Clone and explore: `git clone https://github.com/hanshal/han-qa-portfolio.git`
- Run tests: Navigate to `E-commerce Platform/QA Automation` and follow README
- Contribute: See [CONTRIBUTING.md](../CONTRIBUTING.md)

## 📋 Key Files

| File | Purpose |
|------|---------|
| `README.md` | Quick navigation hub and contact info |
| `PORTFOLIO_OVERVIEW.md` | Complete professional portfolio |
| `PROJECT_SETUP_GUIDE.md` | Technical setup and project details |
| `QA_Artifacts/*.md` | Test plans, cases, strategy documents |
| `cypress.config.js` | Test framework configuration |
| `package.json` | Dependencies and npm scripts |

---

*This structure provides clear separation between portfolio presentation and technical implementation.*