import { describe, it, expect } from 'vitest';
import { simpleMarkdownToHtml } from '../markdown';

describe('simpleMarkdownToHtml security', () => {
  it('should escape HTML tags to prevent XSS', () => {
    const input = '<img src=x onerror=alert(1)>';
    const output = simpleMarkdownToHtml(input);
    expect(output).not.toContain('<img src=x');
    expect(output).toContain('&lt;img src=x');
  });

  it('should not allow malicious javascript: links', () => {
    const input = '[malicious](javascript:alert(1))';
    const output = simpleMarkdownToHtml(input);
    expect(output).not.toContain('href="javascript:');
    // It should probably just be a plain string or use a safe protocol
  });

  it('should handle nested XSS attempts', () => {
    const input = '[**bold**](javascript:alert(1))';
    const output = simpleMarkdownToHtml(input);
    expect(output).not.toContain('href="javascript:');
  });

  it('should escape double quotes to prevent breaking attributes', () => {
    const input = '[title](https://example.com" onmouseover="alert(1))';
    const output = simpleMarkdownToHtml(input);
    expect(output).not.toContain(' onmouseover=');
  });

  it('should allow URLs with query parameters', () => {
    const input = '[click](https://example.com?a=1&b=2)';
    const output = simpleMarkdownToHtml(input);
    expect(output).toContain('href="https://example.com?a=1&amp;b=2"');
  });

  it('should still support valid markdown', () => {
    const input = '# Hello\n\nThis is **bold** and *italic* and `code`.\n\n[Google](https://google.com)';
    const output = simpleMarkdownToHtml(input);
    expect(output).toContain('<h1>Hello</h1>');
    expect(output).toContain('<p>This is <strong>bold</strong> and <em>italic</em> and <code>code</code>.</p>');
    expect(output).toContain('<a href="https://google.com"');
  });

  it('should support relative links', () => {
    const input = '[About](/about)';
    const output = simpleMarkdownToHtml(input);
    expect(output).toContain('href="/about"');
  });

  it('should support fragments', () => {
    const input = '[Top](#top)';
    const output = simpleMarkdownToHtml(input);
    expect(output).toContain('href="#top"');
  });
});
