// @vitest-environment jsdom
import { render, screen, fireEvent, waitFor, cleanup, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Header } from '../HeaderReact'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

// Mock child components
vi.mock('../../ui/SearchBox', () => ({
  default: vi.fn(({ autoFocus }) => (
    <div data-testid="search-box" data-autofocus={autoFocus ? 'true' : 'false'}>
      Mock SearchBox
    </div>
  )),
}))

vi.mock('../../ui/UserMenu', () => ({
  UserMenu: () => <div data-testid="user-menu">UserMenu</div>,
}))

vi.mock('../Navigation', () => ({
  Navigation: () => <div data-testid="navigation">Navigation</div>,
}))

describe('HeaderReact', () => {
  it('opens search on Cmd+K', async () => {
    await act(async () => {
      render(<Header />)
    })

    // Wait for client-side hydration (useEffect)
    await waitFor(() => {
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
    })

    // Search should be closed initially
    expect(screen.queryByTestId('search-box')).not.toBeInTheDocument()

    // Press Cmd+K
    await act(async () => {
      fireEvent.keyDown(window, { key: 'k', metaKey: true })
    })

    // Search should be open
    await waitFor(() => {
      expect(screen.getByTestId('search-box')).toBeInTheDocument()
    })

    // Check autoFocus prop
    expect(screen.getByTestId('search-box')).toHaveAttribute('data-autofocus', 'true')
  })

  it('opens search on Ctrl+K', async () => {
    await act(async () => {
      render(<Header />)
    })

    await waitFor(() => {
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
    })

    expect(screen.queryByTestId('search-box')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    })

    await waitFor(() => {
      expect(screen.getByTestId('search-box')).toBeInTheDocument()
    })
  })
})
