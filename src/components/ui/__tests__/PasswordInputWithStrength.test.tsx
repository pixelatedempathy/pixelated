import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { PasswordInputWithStrength } from '../PasswordInputWithStrength'
import React from 'react'

describe('PasswordInputWithStrength', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with label and helper text', () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        helperText="Must be strong"
      />
    )
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument()
    expect(screen.getByText('Must be strong')).toBeInTheDocument()
  })

  it('shows error message when provided', () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        error="Password is too short"
      />
    )
    expect(screen.getAllByText('Password is too short')[0]).toBeInTheDocument()
  })

  it('toggles password visibility', () => {
    render(<PasswordInputWithStrength label="Password" name="password" />)
    const input = screen.getByLabelText(/^Password$/i) as HTMLInputElement
    expect(input.type).toBe('password')

    const toggleButton = screen.getByLabelText(/Show password/i)
    fireEvent.click(toggleButton)
    expect(input.type).toBe('text')
    expect(screen.getByLabelText(/Hide password/i)).toBeInTheDocument()
  })

  it('keeps error visible when focused (improved behavior)', () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        error="Password is too short"
      />
    )
    const input = screen.getByLabelText(/^Password$/i)
    expect(screen.getAllByText('Password is too short')[0]).toBeInTheDocument()

    fireEvent.focus(input)
    // In the new implementation, it should REMAIN visible
    expect(screen.getAllByText('Password is too short')[0]).toBeInTheDocument()
  })

  it('detects Caps Lock', () => {
    render(<PasswordInputWithStrength label="Password" name="password" />)
    const input = screen.getByLabelText(/^Password$/i)

    // Simulate Caps Lock being on using a more robust way to mock getModifierState
    const eventOn = new KeyboardEvent('keydown', { bubbles: true })
    Object.defineProperty(eventOn, 'getModifierState', {
      value: (key: string) => key === 'CapsLock',
    })
    fireEvent(input, eventOn)
    expect(screen.getByText(/Caps Lock/i)).toBeInTheDocument()

    // Simulate Caps Lock being off
    const eventOff = new KeyboardEvent('keydown', { bubbles: true })
    Object.defineProperty(eventOff, 'getModifierState', {
      value: (key: string) => key !== 'CapsLock',
    })
    fireEvent(input, eventOff)
    expect(screen.queryByText(/Caps Lock/i)).not.toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    render(<PasswordInputWithStrength label="Password" name="password" />)
    const input = screen.getByLabelText(/^Password$/i)
    fireEvent.change(input, { target: { value: 'password123' } })

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuetext')
    expect(progressbar.getAttribute('aria-valuetext')).toMatch(/Weak|Fair|Good|Strong/i)

    const feedback = screen.getByText(/Very weak|Weak|Fair|Good|Strong/i)
    expect(feedback).toHaveAttribute('aria-live', 'polite')
  })

  it('works as an uncontrolled component (bug fix verification)', () => {
    render(<PasswordInputWithStrength label="Password" name="password" />)
    const input = screen.getByLabelText(/^Password$/i) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'newpassword' } })
    expect(input.value).toBe('newpassword')
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
