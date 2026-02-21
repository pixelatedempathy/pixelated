import { describe, it, expect } from 'vitest';
import { markdownToHtml } from '../markdown';

describe('markdownToHtml security', () => {
  it('should escape HTML tags to prevent XSS', () => {
    const input = '<script>alert("xss")</script><img src=x onerror=alert(1)>';
    const output = markdownToHtml(input);
    expect(output).not.toContain('<script');
    expect(output).not.toContain('<img');
    expect(output).toContain('&lt;script&gt;');
  });

  it('should block dangerous protocols in links', () => {
    const input = '[click](javascript:alert(1))';
    const output = markdownToHtml(input);
    expect(output).toContain('href="#"');
    expect(output).not.toContain('javascript:');
  });

  it('should preserve safe links', () => {
    const input = '[safe](https://example.com)';
    const output = markdownToHtml(input);
    expect(output).toContain('href="https://example.com"');
  });

  it('should preserve basic markdown formatting', () => {
    const input = '**bold** and *italic*';
    const output = markdownToHtml(input);
    expect(output).toContain('<strong>bold</strong>');
    expect(output).toContain('<em>italic</em>');
  });
});
