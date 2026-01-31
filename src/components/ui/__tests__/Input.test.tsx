// @vitest-environment jsdom
import { expect, test, describe, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { Input } from '../input'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

describe('Input', () => {
  test('renders correctly', () => {
    const { getByRole } = render(<Input />)
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  test('applies aria-invalid classes when aria-invalid is true', () => {
    const { getByRole } = render(<Input aria-invalid="true" />)
    const input = getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    // Check for the class that we added
    expect(input.className).toContain('aria-invalid:border-destructive')
    expect(input.className).toContain('aria-invalid:ring-destructive/20')
  })
})
