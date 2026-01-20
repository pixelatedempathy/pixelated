// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { afterEach, describe, expect, it } from 'vitest'
import { Input } from '../input'

expect.extend(matchers)

describe('Input', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with default classes', () => {
    render(<Input placeholder="test input" />)
    const input = screen.getByPlaceholderText('test input')
    expect(input).toBeInTheDocument()
    // It should NOT have aria-invalid styles yet (before my change)
    // But checking for *missing* classes is fragile if I'm about to add them.
    // I'll just check basic rendering for now.
    expect(input).toHaveClass('border-input')
  })

  it('passes through aria-invalid attribute', () => {
    render(<Input placeholder="invalid input" aria-invalid={true} />)
    const input = screen.getByPlaceholderText('invalid input')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })
})
