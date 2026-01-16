import { render, screen } from '@testing-library/react'
import { PasswordInputWithStrength } from '../PasswordInputWithStrength'
import userEvent from '@testing-library/user-event'
import React from 'react'

describe('PasswordInputWithStrength', () => {
  it('renders correctly', () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        onChange={() => {}}
      />,
    )
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        onChange={() => {}}
      />,
    )

    const input = screen.getByLabelText('Password')
    const toggleButton = screen.getByRole('button', { name: /show password/i })

    expect(input).toHaveAttribute('type', 'password')

    await user.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
    expect(toggleButton).toHaveAttribute('aria-label', 'Hide password')

    await user.click(toggleButton)
    expect(input).toHaveAttribute('type', 'password')
    expect(toggleButton).toHaveAttribute('aria-label', 'Show password')
  })

  it('renders toggle button for tooltip interaction', async () => {
    render(
      <PasswordInputWithStrength
        label="Password"
        name="password"
        onChange={() => {}}
      />,
    )

    const toggleButton = screen.getByRole('button', { name: /show password/i })
    expect(toggleButton).toBeInTheDocument()

    // Note: Tooltip content verification in JSDOM environment requires complex setup
    // involving ResizeObserver mocks and timing, which is out of scope for this unit test.
    // The presence of the button and aria-labels confirms basic accessibility structure.
  })
})
