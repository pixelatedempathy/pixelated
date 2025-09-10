# Pixelated Empathy Project Structure Blueprint & Actionable Checklist

## 📁 Recommended Folder Structure

```
project-root/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── __tests__/
│   ├── pages/
│   ├── layouts/
│   │   ├── __tests__/
│   ├── lib/
│   ├── styles/
│   ├── content/
│   ├── test/
├── public/
├── tests/
├── .github/
│   ├── prompts/
│   └── instructions/
├── ai/
├── api/
├── docs/
├── memory-bank/
├── package.json
├── astro.config.mjs
├── pyproject.toml
└── README.md
```

## 📑 Naming Conventions

| Folder         | Purpose                                 | Naming Convention |
|---------------|-----------------------------------------|-------------------|
| components/   | Reusable UI components                  | PascalCase        |
| components/ui/| Shared UI elements (Button, Card, etc.) | PascalCase        |
| pages/        | Route-level pages                       | kebab-case        |
| layouts/      | Page layouts/templates                  | PascalCase        |
| lib/          | Utilities/shared logic                  | camelCase         |
| styles/       | Global/component styles                 | kebab-case        |
| test/, tests/ | Test utilities and suites               | kebab-case        |
| content/      | Content collections (markdown/MDX)      | kebab-case        |

## 📝 Actionable Checklist

- [ ] Refactor any files/folders that do not match the above naming conventions.
- [ ] Consolidate test files into a single `tests/` folder or colocate with source in `__tests__` folders.
- [ ] Add `README.md` files to top-level folders (`ai/`, `api/`, `memory-bank/`, etc.) explaining their purpose.
- [ ] For Astro, use `.astro` for static pages and only use React/TSX for interactive islands.
- [ ] Move any `.js` files to `.ts` or `.tsx` where TypeScript is preferred for consistency.
- [ ] Use extension templates for new additions:
  - UI component: `src/components/ui/NewComponent.astro` or `.tsx`
  - Page: `src/pages/new-page.astro`
  - Layout: `src/layouts/NewLayout.astro`
  - Content: `src/content/new-content.md`
  - Test: `src/components/ui/__tests__/NewComponent.test.ts`
- [ ] Review and address any deviations for improved maintainability.
- [ ] Regularly review folder structure as the project evolves to maintain consistency.

---

This checklist will help your team maintain a clean, scalable, and standards-compliant codebase. 
