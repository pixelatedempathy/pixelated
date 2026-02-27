## 2025-05-15 - [Password Strength Accessibility and Error Label Visibility]
**Learning:** Progress-based components like password strength meters should use `aria-valuetext` to provide screen reader users with human-readable status (e.g., "Strong") rather than just raw percentages.
**Action:** Always include `aria-valuetext` when using `role="progressbar"` for qualitative data.

**Learning:** Floating error labels that rely on CSS sibling selectors (e.g., `input:focus + .error-label`) fail when interactive elements like "Show Password" buttons are inserted between the input and the label.
**Action:** Use the general sibling selector `~` instead of `+` to ensure labels remain visible regardless of intermediate siblings.
