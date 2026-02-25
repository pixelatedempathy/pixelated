import { describe, it, expect } from 'vitest';
import { simpleMarkdownToHtml } from '../markdown';

describe('markdown utility', () => {
  describe('simpleMarkdownToHtml', () => {
    it('should convert basic markdown to HTML', () => {
      expect(simpleMarkdownToHtml('**bold**')).toBe('<p><strong>bold</strong></p>');
      expect(simpleMarkdownToHtml('*italic*')).toBe('<p><em>italic</em></p>');
      expect(simpleMarkdownToHtml('`code`')).toBe('<p><code>code</code></p>');
      expect(simpleMarkdownToHtml('# Heading 1')).toBe('<h1>Heading 1</h1>');
      expect(simpleMarkdownToHtml('## Heading 2')).toBe('<h2>Heading 2</h2>');
    });

    it('should handle paragraphs', () => {
      const input = 'Paragraph 1\n\nParagraph 2';
      const output = simpleMarkdownToHtml(input);
      expect(output).toBe('<p>Paragraph 1</p><p>Paragraph 2</p>');
    });

    it('should convert links', () => {
      const input = '[Google](https://google.com)';
      const output = simpleMarkdownToHtml(input);
      expect(output).toBe('<p><a href="https://google.com" target="_blank" rel="noopener noreferrer">Google</a></p>');
    });

    it('should escape HTML tags to prevent XSS', () => {
      const input = '<script>alert("xss")</script>';
      const output = simpleMarkdownToHtml(input);
      expect(output).not.toContain('<script>');
      expect(output).toContain('&lt;script&gt;');
    });

    it('should escape img tags with onerror', () => {
      const input = '<img src=x onerror=alert(1)>';
      const output = simpleMarkdownToHtml(input);
      expect(output).not.toContain('<img');
      expect(output).toContain('&lt;img');
    });

    it('should block malicious link protocols', () => {
      const input = '[Click me](javascript:alert("xss"))';
      const output = simpleMarkdownToHtml(input);
      expect(output).not.toContain('href="javascript:');
      expect(output).toContain('href="#"');
    });

    it('should allow safe link protocols', () => {
      const protocols = ['https://', 'http://', 'mailto:', 'tel:', '/', '#'];
      protocols.forEach(proto => {
        const input = `[Link](${proto}example.com)`;
        const output = simpleMarkdownToHtml(input);
        expect(output).toContain(`href="${proto}example.com"`);
      });
    });
  });
});
