import { describe, it, expect } from 'vitest'
import { simpleMarkdownToHtml } from '../markdown'

describe('simpleMarkdownToHtml security', () => {
  it('should escape HTML tags to prevent XSS', () => {
    const pwned = '<script>alert("xss")</script>'
    const result = simpleMarkdownToHtml(pwned)
    expect(result).not.toContain('<script>')
    expect(result).toContain('&lt;script&gt;')
  })

  it('should not allow XSS in links', () => {
    const pwned = '[click me](javascript:alert("xss"))'
    const result = simpleMarkdownToHtml(pwned)
    expect(result).not.toContain('href="javascript:')
    expect(result).toContain('href="#"')
  })

  it('should not allow XSS in image tags pretending to be links', () => {
    const pwned = '![xss](x" onerror="alert(\'xss\'))'
    const result = simpleMarkdownToHtml(pwned)
    expect(result).not.toContain('onerror="')
    expect(result).toContain('onerror=&quot;')
  })

  it('should correctly handle legitimate markdown while escaping raw HTML', () => {
    const input = 'This is **bold** and <div>this is raw</div>'
    const result = simpleMarkdownToHtml(input)
    expect(result).toContain('<strong>bold</strong>')
    expect(result).toContain('&lt;div&gt;this is raw&lt;/div&gt;')
  })

  it('should allow safe protocols in links', () => {
    const links = [
      '[https](https://example.com)',
      '[http](http://example.com)',
      '[mailto](mailto:test@example.com)',
      '[tel](tel:+1234567890)',
      '[relative](/path/to/page)',
      '[anchor](#section)',
    ]
    links.forEach(link => {
      const result = simpleMarkdownToHtml(link)
      expect(result).not.toContain('href="#"')
    })
  })

  it('should block unsafe protocols in links', () => {
    const unsafeLinks = [
      '[js](javascript:alert(1))',
      '[data](data:text/html,<script>alert(1)</script>)',
      '[vb](vbscript:msgbox("Hi"))',
    ]
    unsafeLinks.forEach(link => {
      const result = simpleMarkdownToHtml(link)
      expect(result).toContain('href="#"')
    })
  })

  it('should handle nested formatting correctly', () => {
    const input = 'Normal **bold *italic* bold**'
    const result = simpleMarkdownToHtml(input)
    expect(result).toContain('<strong>bold <em>italic</em> bold</strong>')
  })

  it('should handle headings correctly and not wrap them in p tags', () => {
    const input = '# Heading 1\n\nParagraph'
    const result = simpleMarkdownToHtml(input)
    expect(result).toContain('<h1>Heading 1</h1>')
    expect(result).toContain('<p>Paragraph</p>')
    expect(result).not.toMatch(/<p>\s*<h1>/)
  })

  it('should not treat middle-of-line # as headings', () => {
    const input = 'This is not a # heading'
    const result = simpleMarkdownToHtml(input)
    expect(result).toContain('<p>This is not a # heading</p>')
    expect(result).not.toContain('<h1>')
  })

  it('should handle multiple paragraphs', () => {
    const input = 'Para 1\n\nPara 2'
    const result = simpleMarkdownToHtml(input)
    expect(result).toContain('<p>Para 1</p><p>Para 2</p>')
  })

  it('should escape double quotes in link text', () => {
    const input = '[Click "here"](https://example.com)'
    const result = simpleMarkdownToHtml(input)
    expect(result).toContain('Click &quot;here&quot;')
  })
})
