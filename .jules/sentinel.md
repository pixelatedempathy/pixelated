## 2026-03-02 - [Mass Assignment / Role Escalation in Signup]
**Vulnerability:** The unified signup endpoint (`src/pages/api/auth/signup.ts`) allowed clients to provide a `role` field in the request body, which was passed directly to the user creation service, enabling arbitrary privilege escalation (e.g., to 'admin').
**Learning:** External API request bodies should never be trusted for sensitive fields like roles or permissions. Even if the frontend doesn't send them, a direct API call can.
**Prevention:** Always hardcode default roles in public-facing registration endpoints or use a whitelist/validation logic that prevents unauthorized role selection.

## 2026-03-02 - [XSS in Simple Markdown Parser]
**Vulnerability:** The `simpleMarkdownToHtml` function in `src/lib/markdown.ts` was corrupted and lacked basic XSS protections (escaping and sanitization).
**Learning:** Simple regex-based markdown parsers are high-risk for XSS. They must follow a strict pipeline: Escape -> Transform -> Sanitize.
**Prevention:** Always escape HTML entities before applying regex transformations. Specifically sanitize URLs in `<a>` and `<img>` tags to block `javascript:` and other malicious protocols.
