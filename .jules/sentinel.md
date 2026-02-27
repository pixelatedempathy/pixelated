## 2025-05-15 - [XSS in Custom Markdown Parser]
**Vulnerability:** The `simpleMarkdownToHtml` utility was transforming markdown to HTML and being rendered via `dangerouslySetInnerHTML` without escaping raw HTML tags or sanitizing link protocols (e.g., `javascript:`).
**Learning:** Naive regex-based markdown parsers are inherently unsafe for use with `dangerouslySetInnerHTML` unless they implement a strict security pipeline: HTML escaping -> Markdown transformations -> URL sanitization.
**Prevention:** Always escape all HTML special characters (`&`, `<`, `>`, `"`, `'`) before applying markdown regexes, and use an allow-list for URL protocols (whitelisting `http`, `https`, `mailto`, `tel` and relative paths).
