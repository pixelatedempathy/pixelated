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
  // Trim whitespace and handle null/undefined
  const rawUrl = url ?? ''
  const trimmed = rawUrl.trim()
  if (!trimmed) return '#'

  // Normalise for protocol checking by removing whitespace and control characters
  const normalized = trimmed
    .replace(/[\s\u00A0\u200B]+/g, '') // remove spaces, NBSP, zero-width spaces
    .replace(/[\x00-\x1F\x7F]/g, '')   // remove control characters
  const lower = normalized.toLowerCase()

  // Whitelist safe protocols and relative paths
  if (
    lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('mailto:') ||
    lower.startsWith('tel:') ||
    (trimmed.startsWith('/') && !trimmed.startsWith('//')) ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../')
  ) {
    return trimmed
  }

  // Default fallback
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
    .replace(CODE_REGEX, '<code>$1