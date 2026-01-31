import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import SearchBox from '../SearchBox'

describe('SearchBox', () => {
  beforeEach(() => {
    // Mock searchClient
    // Use type assertion to bypass strict type checking for the mock
    Object.defineProperty(window, 'searchClient', {
      writable: true,
      configurable: true,
      value: {
        search: vi.fn().mockReturnValue([]),
        importDocuments: vi.fn(),
      },
    })
  })

  afterEach(() => {
    cleanup() // Explicit cleanup required in this environment
    vi.clearAllMocks()
    // Clean up global mock
    // @ts-ignore
    delete window.searchClient
  })

  it('renders search input', () => {
    render(<SearchBox />)
    const input = screen.getByPlaceholderText('Search...')
    expect(input).toBeInTheDocument()
  })

  it('focuses input on Cmd+K', () => {
    render(<SearchBox />)
    const input = screen.getByPlaceholderText('Search...')

    // Input should not be focused initially
    expect(document.activeElement).not.toBe(input)

    // Simulate Cmd+K
    fireEvent.keyDown(document, { key: 'k', metaKey: true })

    // Input should be focused
    expect(document.activeElement).toBe(input)
  })

  it('focuses input on Ctrl+K', () => {
    render(<SearchBox />)
    const input = screen.getByPlaceholderText('Search...')

    // Input should not be focused initially
    expect(document.activeElement).not.toBe(input)

    // Simulate Ctrl+K
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })

    // Input should be focused
    expect(document.activeElement).toBe(input)
  })
})
