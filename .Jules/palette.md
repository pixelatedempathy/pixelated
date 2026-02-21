## 2026-02-21 - [Icon-only Button Accessibility]
**Learning:** Icon-only buttons in both React and Astro components frequently lack `aria-label` even when wrapped in tooltips. Adding these labels improves both screen-reader accessibility and the reliability of testing with `getByRole`.
**Action:** Always check icon-only buttons for `aria-label` and add them using descriptive text like 'Close notifications' or 'Remove goal'.
