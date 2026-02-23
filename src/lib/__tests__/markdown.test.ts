import { describe, it, expect } from 'vitest';
import { simpleMarkdownToHtml } from '../markdown';

describe('simpleMarkdownToHtml XSS Protection', () => {
  it('should escape HTML tags to prevent XSS', () => {
    const input = '<script>alert("xss")</script> **bold**';
    const output = simpleMarkdownToHtml(input);
    expect(output).not.toContain('<script>');
    expect(output).toContain('&lt;script&gt;');
    expect(output).toContain('<strong>bold</strong>');
  });

  it('should escape attributes to prevent XSS', () => {
    const input = '<img src=x onerror=alert(1)>';
    const output = simpleMarkdownToHtml(input);
    // It's okay if it contains the text 'onerror=' as long as it's escaped
    expect(output).toContain('&lt;img src=x onerror=alert(1)&gt;');
    // Ensure the raw tag is not present
    expect(output).not.toContain('<img src=x');
  });

  it('should block dangerous link protocols', () => {
    const input = '[click me](javascript:alert(1))';
    const output = simpleMarkdownToHtml(input);
    expect(output).not.toContain('href="javascript:');
    expect(output).toContain('click me (javascript:alert(1))');
  });

  it('should block dangerous link protocols with spaces/newlines', () => {
    const input = '[click me]( java\nscript:alert(1))';
    const output = simpleMarkdownToHtml(input);
    expect(output).not.toContain('href="javascript:');
    // The regex might capture the space and newline depending on how it's written
    // but it definitely shouldn't be an <a> tag with that href
    expect(output).not.toContain('<a href=');
  });

  it('should allow safe link protocols', () => {
    const input = '[safe link](https://example.com)';
    const output = simpleMarkdownToHtml(input);
    expect(output).toContain('<a href="https://example.com"');
    expect(output).toContain('target="_blank"');
  });

  it('should allow relative links', () => {
    const input = '[relative](/dashboard)';
    const output = simpleMarkdownToHtml(input);
    expect(output).toContain('<a href="/dashboard"');
  });

  it('should handle escaped characters in URLs correctly', () => {
    const input = '[complex](https://example.com?a=1&b=2)';
    const output = simpleMarkdownToHtml(input);
    // & should be escaped to &amp;
    expect(output).toContain('href="https://example.com?a=1&amp;b=2"');
  });

  it('should prevent breaking out of href attribute', () => {
    const input = '[evil](https://example.com" onmouseover="alert(1))';
    const output = simpleMarkdownToHtml(input);
    // It's okay if it contains the text 'onmouseover=' as long as it's part of the escaped URL
    expect(output).toContain('href="https://example.com&quot; onmouseover=&quot;alert(1"');
    // Ensure it didn't break out into a real attribute
    expect(output).not.toContain('" onmouseover=');
  });
});
