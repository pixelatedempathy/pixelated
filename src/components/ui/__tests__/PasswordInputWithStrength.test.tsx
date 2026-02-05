// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { PasswordInputWithStrength } from '../PasswordInputWithStrength'

describe('PasswordInputWithStrength', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders correctly', () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        data-testid="password-input"
      />
    )

    expect(screen.getByLabelText(/^Password$/)).toBeInTheDocument()
    // password inputs don't have role="textbox" by default, checking by display value or type
    expect(screen.getByLabelText(/^Password$/)).toHaveAttribute('type', 'password')
  });

  it('toggles password visibility', () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
      />
    )

    const input = screen.getByLabelText(/^Password$/) as HTMLInputElement
    const toggleButton = screen.getByRole('button', { name: /Show password/i })

    // Initial state: password
    expect(input.type).toBe('password')

    // Click toggle
    fireEvent.click(toggleButton)

    // New state: text
    expect(input.type).toBe('text')
    expect(screen.getByRole('button', { name: /Hide password/i })).toBeInTheDocument()

    // Click toggle again
    fireEvent.click(toggleButton)

    // Back to password
    expect(input.type).toBe('password')
    expect(screen.getByRole('button', { name: /Show password/i })).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        error="Invalid password"
      />
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid password')
  })
})
