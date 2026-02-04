import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { toast } from '../toast'
import { toast as hotToast } from 'react-hot-toast'
import * as React from 'react'

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

// Mock Icons
vi.mock('../icons', () => ({
  IconX: (props: any) => <div data-testid="icon-x" {...props} />,
}))

describe('Toast Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('custom toast renders close button with accessibility attributes', () => {
    // Call the custom toast method
    toast.custom({ message: 'Test Message' })

    // Verify hotToast.custom was called
    expect(hotToast.custom).toHaveBeenCalled()

    // Get the render function passed to hotToast.custom
    // usage: hotToast.custom((t) => JSX, options)
    const renderFn = vi.mocked(hotToast.custom).mock.calls[0][0] as (t: any) => JSX.Element

    // Render the toast content
    // The render function expects a toast object (t)
    const mockToast = { id: 'test-id', visible: true }

    render(renderFn(mockToast))

    // Check for the close button via aria-label
    const closeButton = screen.getByLabelText('Dismiss')
    expect(closeButton).toBeInTheDocument()

    // Check for focus styles
    expect(closeButton.className).toContain('focus-visible:ring-2')
    expect(closeButton.className).toContain('focus-visible:ring-ring')

    // Check if IconX is rendered inside the button
    const icon = screen.getByTestId('icon-x')
    expect(closeButton).toContainElement(icon)
  })
})
