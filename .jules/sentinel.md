## 2025-05-15 - [XSS in Custom Markdown Parser]
**Vulnerability:** The `simpleMarkdownToHtml` function in `src/lib/markdown.ts` was vulnerable to XSS as it performed direct regex replacements on unsanitized user input and didn't validate link protocols.
**Learning:** Even a "simple" markdown parser needs to escape HTML entities first. URL validation must be careful not to over-sanitize legitimate characters like `&` in query parameters, which can happen if escaping is done before URL extraction.
**Prevention:** Always use a standard HTML escaping function before processing text with custom regexes. For URLs, use a whitelist of safe protocols (http, https, mailto, tel) and avoid overly strict character blacklists that might break valid URLs.
