import { describe, it, expect } from 'vitest'
import { simpleMarkdownToHtml } from '../markdown'

describe('simpleMarkdownToHtml XSS reproduction', () => {
  it('should escape HTML tags to prevent XSS', () => {
    const input = '<img src=x onerror=alert(1)>'
    const output = simpleMarkdownToHtml(input)
    expect(output).not.toContain('<img')
    expect(output).toContain('&lt;img')
  })

  it('should sanitize link protocols', () => {
    const input = '[click me](javascript:alert(1))'
    const output = simpleMarkdownToHtml(input)
    expect(output).not.toContain('href="javascript:alert(1)"')
  })

  it('should not allow XSS in headings', () => {
    const input = '# <script>alert(1)</script>'
    const output = simpleMarkdownToHtml(input)
    expect(output).not.toContain('<script>')
  })

  it('should not wrap headings in paragraph tags', () => {
    const input = '# Heading\n\nSome text'
    const output = simpleMarkdownToHtml(input)
    expect(output).toBe('<h1>Heading</h1><p>Some text</p>')
  })
})
