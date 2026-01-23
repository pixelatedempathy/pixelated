import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import SearchBox from '../SearchBox'

// Extend window interface for searchClient
declare global {
  interface Window {
    searchClient: any
  }
}

describe('SearchBox', () => {
  beforeEach(() => {
    // Mock searchClient
    window.searchClient = {
      search: vi.fn().mockReturnValue([]),
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
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
