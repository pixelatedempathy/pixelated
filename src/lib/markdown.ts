/**
 * Client-safe Markdown utility functions for basic parsing and manipulation.
 */

// Regular expressions for Markdown formatting
const BOLD_REGEX = /\*\*(.*?)\*\*/g
const ITALIC_REGEX = /\*(.*?)\*/g
const CODE_REGEX = /`(.*?)`/g
const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g
const HEADING_REGEX = /^(#{1,6})\s+(.+)$/gm

import { escapeHtml } from './utils'

/**
 * Sanitize URL to prevent javascript: and other malicious schemes
 * @param url URL to sanitize
 * @returns Sanitized URL
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '#'

  // Decode potential HTML entities to check the protocol
  const decodedUrl = url
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .trim()
    .toLowerCase()

  // Whitelist safe protocols
  if (
    decodedUrl.startsWith('http://') ||
    decodedUrl.startsWith('https://') ||
    decodedUrl.startsWith('mailto:') ||
    decodedUrl.startsWith('tel:') ||
    decodedUrl.startsWith('/') ||
    decodedUrl.startsWith('./') ||
    decodedUrl.startsWith('../')
  ) {
    return url
  }

  return '#'
}

/**
 * Simple Markdown to HTML conversion for basic formatting
 * @param text Markdown text
 * @returns HTML with basic formatting
 */
export function simpleMarkdownToHtml(text: string): string {
  if (!text) {
    return ''
  }

  // 1. Escape HTML to prevent XSS
  const escapedText = escapeHtml(text)

  // 2. Replace Markdown formatting with HTML
  return escapedText
    .replace(BOLD_REGEX, '<strong>$1</strong>')
    .replace(ITALIC_REGEX, '<em>$1</em>')
    .replace(CODE_REGEX, '<code>$1</code>')
    .replace(LINK_REGEX, (_, text, url) => {
      const safeUrl = sanitizeUrl(url)
      return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`
    })
    .replace(HEADING_REGEX, (_, level, content) => {
      const headingLevel = Math.min(level.length, 6)
      return `<h${headingLevel}>${content}</h${headingLevel}>`
    })
    .split('\n\n')
    .map((para) => (para ? `<p>${para}</p>` : ''))
    .join('')
}

/**
 * Strip all Markdown formatting from text
 * @param text Markdown text
 * @returns Plain text without Markdown formatting
 */
export function stripMarkdown(text: string): string {
  if (!text) {
    return ''
  }

  return text
    .replace(BOLD_REGEX, '$1')
    .replace(ITALIC_REGEX, '$1')
    .replace(CODE_REGEX, '$1')
    .replace(LINK_REGEX, '$1')
    .replace(HEADING_REGEX, '$2')
}

/**
 * Extract all headings from Markdown
 * @param content Markdown content
 * @returns Array of heading objects with level and text
 */
export function extractHeadings(
  content: string,
): Array<{ level: number; text: string }> {
  if (!content) {
    return []
  }

  const headings: Array<{ level: number; text: string }> = []
  const matches = content.matchAll(HEADING_REGEX)

  for (const match of matches) {
    headings.push({
      level: match[1].length,
      text: match[2],
    })
  }

  return headings
}

/**
 * Extract links from Markdown
 * @param content Markdown content
 * @returns Array of link objects with text and url
 */
export function extractLinks(
  content: string,
): Array<{ text: string; url: string }> {
  if (!content) {
    return []
  }

  const links: Array<{ text: string; url: string }> = []
  const matches = content.matchAll(LINK_REGEX)

  for (const match of matches) {
    links.push({
      text: match[1],
      url: match[2],
    })
  }

  return links
}

/**
 * Count words in Markdown content (excluding formatting)
 * @param content Markdown content
 * @returns Word count
 */
export function countWords(content: string): number {
  if (!content) {
    return 0
  }

  // Strip Markdown formatting first
  const plainText = stripMarkdown(content)

  // Count words (split by whitespace)
  return plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
}

/**
 * Estimate reading time for Markdown content
 * @param content Markdown content
 * @param wordsPerMinute Words per minute (default: 200)
 * @returns Reading time in minutes
 */
export function estimateReadingTime(
  content: string,
  wordsPerMinute = 200,
): number {
  if (!content) {
    return 0
  }

  const wordCount = countWords(content)
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

/**
 * Convert Markdown to HTML (alias for simpleMarkdownToHtml)
 * @param text Markdown text
 * @returns HTML with basic formatting
 */
export function markdownToHtml(text: string): string {
  return simpleMarkdownToHtml(text)
}

export default {
  simpleMarkdownToHtml,
  stripMarkdown,
  extractHeadings,
  extractLinks,
  countWords,
  estimateReadingTime,
  markdownToHtml,
}
