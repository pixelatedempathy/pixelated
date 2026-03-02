export const CODE_REGEX = /`([^`]+)`/g;
export const HEADING_REGEX = /^(#+)\s+(.+)$/gm;
export const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

export function escapeHtml(str: string): string {
  const entityMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return str.replace(/[&<>"']/g, (s) => entityMap[s] || s);
}

export function sanitizeUrl(url: string): string {
  if (!url) return '#';

  // Normalize and decode
  const normalizedUrl = url.trim().toLowerCase();

  // Allow safe protocols (http, https, mailto, tel)
  if (normalizedUrl.startsWith('http://') ||
      normalizedUrl.startsWith('https://') ||
      normalizedUrl.startsWith('mailto:') ||
      normalizedUrl.startsWith('tel:')) {
    return url;
  }

  // Allow absolute local paths (starting with / but NOT //)
  if (normalizedUrl.startsWith('/') && !normalizedUrl.startsWith('//')) {
    return url;
  }

  // Allow fragments
  if (normalizedUrl.startsWith('#')) {
    return url;
  }

  return '#';
}

export function simpleMarkdownToHtml(text: string): string {
  if (!text) return '';

  // 1. Escape HTML entities to prevent XSS
  const escapedText = escapeHtml(text);

  // 2. Apply markdown regexes and sanitize links
  return escapedText
    .replace(HEADING_REGEX, (match, level, content) => `<h${level.length}>${content}</h${level.length}>`)
    .replace(CODE_REGEX, '<code>$1</code>')
    .replace(LINK_REGEX, (match, alt, url) => {
      const sanitizedUrl = sanitizeUrl(url);
      return `<a href="${sanitizedUrl}" rel="noopener noreferrer">${alt}</a>`;
    })
    .split('\n\n')
    .map(p => p.startsWith('<h') || p.startsWith('<code>') ? p : `<p>${p}</p>`)
    .join('\n');
}
