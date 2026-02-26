## 2025-05-15 - [XSS Protection in Custom Markdown Parser]
**Vulnerability:** A simple custom Markdown-to-HTML function was vulnerable to Cross-Site Scripting (XSS) because it used regex replacements without escaping the input text or sanitizing link protocols.
**Learning:** Even simple "helper" functions that produce HTML from user input can be major security risks if they don't follow a strict "escape first, then transform" or "use a battle-tested sanitizer" approach.
**Prevention:** Always escape HTML special characters before applying custom regex transformations that produce HTML, and strictly whitelist allowed URL protocols for generated links.
