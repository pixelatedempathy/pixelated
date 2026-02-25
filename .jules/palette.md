## 2025-05-15 - [Accessibility & Micro-UX in Password Inputs]
**Learning:** For password strength meters, providing real-time feedback requires 'aria-live="polite"' on the text description and 'aria-valuetext' on the progress bar to ensure screen reader users receive the same context as visual users. Additionally, Caps Lock detection is a high-value micro-UX touch that prevents failed login/signup attempts.
**Action:** Always include ARIA live regions and semantic value text for progress-based indicators. Implement Caps Lock detection in security-sensitive inputs.

## 2025-05-15 - [Persistent Form Feedback]
**Learning:** Users often lose context when error messages disappear upon focusing an input field. Keeping 'role="alert"' elements visible during focus improves the experience by allowing users to reference the error while correcting it.
**Action:** Avoid hiding error labels or alerts when an input gains focus; maintain visibility until the error is resolved.

## 2025-05-15 - [Controlled vs Uncontrolled Component Patterns]
**Learning:** Defaulting a 'value' prop to an empty string ('') in a component that aims to support both controlled and uncontrolled modes can break the uncontrolled logic, as the presence of a string value (even empty) is often used to detect controlled mode.
**Action:** Use 'undefined' as the default for optional 'value' props in hybrid components to correctly detect when to fall back to internal state.
