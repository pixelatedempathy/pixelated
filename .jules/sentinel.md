## 2025-05-22 - [XSS vulnerability in custom markdown parser]
**Vulnerability:** The `simpleMarkdownToHtml` utility in `src/lib/markdown.ts` was directly transforming markdown tokens into HTML without escaping the input text, allowing arbitrary HTML tags (including `<script>` and `<img onerror=...>`) to be rendered via `dangerouslySetInnerHTML`. It also lacked protocol whitelisting for links.
**Learning:** Even "simple" custom parsers need rigorous sanitization. Escaping input first is a safe default, provided the markdown regexes don't rely on special characters like `<` or `>`.
**Prevention:** Always escape user-generated content before rendering it as HTML. Use a robust whitelist for allowed URL protocols. Maintain unit tests that specifically target XSS payloads.
