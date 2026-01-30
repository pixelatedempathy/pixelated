// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import SearchBox from '../SearchBox'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend vitest's expect method with testing-library matchers
expect.extend(matchers)

describe('SearchBox', () => {
  beforeEach(() => {
    // Mock window.searchClient
    (window as any).searchClient = {
      search: vi.fn().mockReturnValue([]),
    }
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('renders search input', () => {
    render(<SearchBox />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('displays correct shortcut hint for non-Mac', () => {
    Object.defineProperty(window, 'navigator', {
      value: { userAgent: 'Linux' },
      writable: true,
      configurable: true,
    })
    render(<SearchBox />)
    expect(screen.getByText('Ctrl')).toBeInTheDocument()
    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('displays correct shortcut hint for Mac', () => {
    Object.defineProperty(window, 'navigator', {
      value: { userAgent: 'Mac' },
      writable: true,
      configurable: true,
    })
    render(<SearchBox />)
    expect(screen.getByText('⌘')).toBeInTheDocument()
    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('focuses input on Ctrl+K', () => {
    render(<SearchBox />)
    const input = screen.getByPlaceholderText('Search...')

    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })
    expect(document.activeElement).toBe(input)
  })

  it('focuses input on Cmd+K', () => {
    render(<SearchBox />)
    const input = screen.getByPlaceholderText('Search...')

    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(document.activeElement).toBe(input)
  })

  it('hides hint when query is present', () => {
    render(<SearchBox />)
    const input = screen.getByPlaceholderText('Search...')

    fireEvent.change(input, { target: { value: 'test' } })
    expect(screen.queryByText('K')).not.toBeInTheDocument()
  })
})
