// @vitest-environment jsdom
import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { toast } from '../toast'
import { toast as hotToast } from 'react-hot-toast'

expect.extend(matchers)

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: {
    custom: vi.fn(),
    dismiss: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    promise: vi.fn(),
  },
  Toaster: () => null,
}))

describe('Toast Accessibility', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders dismiss button with correct accessibility attributes', () => {
    // Call our wrapper
    toast.custom({ message: 'Test message' })

    // Verify hotToast.custom was called
    expect(hotToast.custom).toHaveBeenCalledTimes(1)

    // Get the renderer function passed to hotToast.custom
    const renderer = (hotToast.custom as any).mock.calls[0][0]

    // Call the renderer with a mock toast object
    const mockToast = { id: 'test-id', visible: true }
    const result = renderer(mockToast)

    // Render the result
    render(result)

    // Check for accessibility attributes
    const dismissButton = screen.getByRole('button', { name: /dismiss/i })
    expect(dismissButton).toBeInTheDocument()
    expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss')

    // Check SVG
    const svg = dismissButton.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')

    // Check focus styles (class names)
    expect(dismissButton).toHaveClass('focus:ring-2')
    expect(dismissButton).toHaveClass('focus:ring-primary-500')
  })
})
