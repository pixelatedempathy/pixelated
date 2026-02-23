## 2026-02-23 - [XSS in Custom Markdown Parser]
**Vulnerability:** The `simpleMarkdownToHtml` function in `src/lib/markdown.ts` was directly concatenating Markdown transformations into HTML strings without escaping the input text, allowing arbitrary HTML and script execution. It also lacked URL protocol sanitization for links.
**Learning:** Custom, lightweight Markdown parsers often miss critical security steps like HTML escaping and protocol whitelisting. Relying on simple regex replacements is dangerous if not preceded by a strict escaping phase.
**Prevention:** Always escape HTML special characters BEFORE applying Markdown transformations. Use a strict whitelist for allowed URL protocols (e.g., http, https, mailto) and sanitize the URL string to prevent protocol bypasses (like `java\nscript:`).

## 2026-02-23 - [Role Escalation in Registration]
**Vulnerability:** The `/api/auth/signup` endpoint accepted a `role` field from the request body and passed it directly to the user creation service, allowing any user to register with elevated privileges (e.g., 'admin', 'therapist').
**Learning:** Defaulting to a safe role in code is insufficient if the API still allows the client to override it without authorization checks.
**Prevention:** Hardcode the role to the lowest possible privilege level (e.g., 'patient') for public registration endpoints, or strictly validate the requested role against an allow-list that excludes administrative roles.
