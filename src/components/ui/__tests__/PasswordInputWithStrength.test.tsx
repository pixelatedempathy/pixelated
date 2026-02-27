import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PasswordInputWithStrength } from '../PasswordInputWithStrength'
import * as passwordStrengthHook from '../../../hooks/usePasswordStrength'

vi.mock('../../../hooks/usePasswordStrength', () => ({
  usePasswordStrength: vi.fn(),
}))

describe('PasswordInputWithStrength', () => {
  it('renders with label and required asterisk', () => {
    vi.mocked(passwordStrengthHook.usePasswordStrength).mockReturnValue({
      strength: 'empty',
      score: 0,
      feedback: '',
      color: '#e2e8f0',
    })

    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        required
      />
    )

    // Using queryByLabelText to avoid potential multiple matches issue in basic render
    expect(screen.getByLabelText(/Password/i, { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('shows/hides password when toggle button is clicked', () => {
    vi.mocked(passwordStrengthHook.usePasswordStrength).mockReturnValue({
      strength: 'empty',
      score: 0,
      feedback: '',
      color: '#e2e8f0',
    })

    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
      />
    )

    const input = screen.getByLabelText(/Password/i, { selector: 'input' }) as HTMLInputElement
    const toggleButton = screen.getByRole('button', { name: /show password/i })

    expect(input.type).toBe('password')

    fireEvent.click(toggleButton)
    expect(input.type).toBe('text')
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument()

    fireEvent.click(toggleButton)
    expect(input.type).toBe('password')
  })

  it('displays strength meter when password is provided', () => {
    vi.mocked(passwordStrengthHook.usePasswordStrength).mockReturnValue({
      strength: 'weak',
      score: 1,
      feedback: 'Weak - easy to crack',
      color: '#e53e3e',
    })

    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        value="123"
        onChange={() => {}}
      />
    )

    const strengthMeter = screen.getByRole('progressbar', { name: /password strength: weak/i })
    expect(strengthMeter).toBeInTheDocument()
    expect(strengthMeter).toHaveAttribute('aria-valuenow', '25')
    expect(strengthMeter).toHaveAttribute('aria-valuetext', 'Weak')
    expect(screen.getByText('Weak - easy to crack')).toBeInTheDocument()
  })

  it('displays error message and sets aria-invalid when error is present and not focused', () => {
    vi.mocked(passwordStrengthHook.usePasswordStrength).mockReturnValue({
      strength: 'empty',
      score: 0,
      feedback: '',
      color: '#e2e8f0',
    })

    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        error="Password is too short"
      />
    )

    const input = screen.getByLabelText(/Password/i, { selector: 'input' })
    expect(input).toHaveAttribute('aria-invalid', 'true')
    // There are two elements with this text now: the .error-label and the #password-error div
    const errorMessages = screen.getAllByText('Password is too short')
    expect(errorMessages.length).toBeGreaterThan(0)
  })
})
