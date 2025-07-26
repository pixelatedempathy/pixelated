/**
 * Test setup for React Testing Library
 * This file is automatically loaded by Vitest before tests are run
 */

import '@testing-library/jest-dom'

// Add type declarations for DOM testing matchers
declare module 'vitest' {
  interface Assertion<T = unknown> {
    toBeInTheDocument(): T
    toHaveAttribute(attr: string, value?: string): T
    toHaveClass(...classNames: string[]): T
    toHaveValue(value?: string | number): T
    toBeVisible(): T
    toBeDisabled(): T
    toBeEnabled(): T
    toHaveTextContent(text: string | RegExp): T
    toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): T
    toBeChecked(): T
    toHaveFocus(): T
    toBeRequired(): T
    toBeInvalid(): T
    toBeValid(): T
    toHaveStyle(css: string | Record<string, unknown>): T
    toHaveAccessibleName(name?: string | RegExp): T
    toHaveAccessibleDescription(description?: string | RegExp): T
  }
}

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  document.body.innerHTML = ''
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root = null
  rootMargin = '0px'
  thresholds = [0]

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
} as any

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
})

// Mock URL methods
global.URL.createObjectURL = vi.fn()
global.URL.revokeObjectURL = vi.fn()

// Mock console methods to reduce noise in tests
beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(console, 'info').mockImplementation(() => {})
  vi.spyOn(console, 'debug').mockImplementation(() => {})
})
