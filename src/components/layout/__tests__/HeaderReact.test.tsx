import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from '../HeaderReact'
import React from 'react'

// Mock child components
vi.mock('../../ui/UserMenu', () => ({
  UserMenu: () => <div data-testid="user-menu">User Menu</div>
}))

vi.mock('../Navigation', () => ({
  Navigation: () => <div data-testid="navigation">Navigation</div>
}))

// Mock SearchBox
vi.mock('../../ui/SearchBox', () => ({
  default: ({ autoFocus, onResultClick }: any) => (
    <div data-testid="search-box">
      SearchBox (AutoFocus: {autoFocus ? 'true' : 'false'})
      <button onClick={() => onResultClick && onResultClick()}>Close Search</button>
    </div>
  )
}))

describe('Header', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    render(<Header />)
    expect(screen.getByText('Pixelated Empathy')).toBeInTheDocument()
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
    expect(screen.getByTestId('user-menu')).toBeInTheDocument()
  })

  it('has accessible notification button', () => {
    render(<Header />)
    const notificationButton = screen.getByLabelText('View notifications')
    expect(notificationButton).toBeInTheDocument()
  })

  it('toggles search on search button click', () => {
    render(<Header />)
    const searchButton = screen.getByLabelText('Search')

    // Initially search is closed
    expect(screen.queryByTestId('search-box')).not.toBeInTheDocument()

    // Click to open
    fireEvent.click(searchButton)
    expect(screen.getByTestId('search-box')).toBeInTheDocument()

    // Check for autoFocus prop passed to mock
    expect(screen.getByText(/AutoFocus: true/)).toBeInTheDocument()
  })

  it('toggles search on Cmd+K', () => {
    render(<Header />)

    // Initially closed
    expect(screen.queryByTestId('search-box')).not.toBeInTheDocument()

    // Press Cmd+K
    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(screen.getByTestId('search-box')).toBeInTheDocument()

    // Press Cmd+K again to close
    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(screen.queryByTestId('search-box')).not.toBeInTheDocument()
  })

  it('toggles search on Ctrl+K', () => {
    render(<Header />)

    // Press Ctrl+K
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })
    expect(screen.getByTestId('search-box')).toBeInTheDocument()
  })
})
