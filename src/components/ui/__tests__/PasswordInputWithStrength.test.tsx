import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { PasswordInputWithStrength } from '../PasswordInputWithStrength'
import { afterEach } from 'vitest'

describe('PasswordInputWithStrength', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders correctly', () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        value=""
        onChange={() => {}}
      />
    )
    expect(screen.getByText(/Password/)).toBeInTheDocument()
  })

  it('shows strength meter when value is present', () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        value="password123"
        onChange={() => {}}
      />
    )
    const meter = screen.getByRole('progressbar')
    expect(meter).toBeInTheDocument()
  })

  it('provides accessible text for strength value', () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        value="123456" // Weak
        onChange={() => {}}
      />
    )

    const meter = screen.getByRole('progressbar')

    // This expects the component to have aria-valuetext="Weak"
    // We capitalize the first letter of the strength
    expect(meter).toHaveAttribute('aria-valuetext', 'Weak')
  })
})
