// @vitest-environment jsdom
import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { Input } from '../input'

// Explicit cleanup just in case
afterEach(() => {
  cleanup()
})

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="test input" />)
    const input = screen.getByPlaceholderText('test input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('flex', 'h-10', 'w-full', 'rounded-md', 'border', 'border-input')
  })

  it('applies invalid styles when aria-invalid is true', () => {
    render(<Input aria-invalid={true} placeholder="invalid input" />)
    const input = screen.getByPlaceholderText('invalid input')

    // These are the classes we expect to be added for valid visual feedback
    // We expect failure here initially
    expect(input).toHaveClass('aria-invalid:ring-destructive/20')
    expect(input).toHaveClass('aria-invalid:border-destructive')

    // Check that it actually has the attribute
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })
})
