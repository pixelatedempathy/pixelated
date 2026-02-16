import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../button'

describe('Button Component', () => {
  it('renders a disabled link correctly', () => {
    const handleClick = vi.fn()

    render(
      <Button href="#" disabled onClick={handleClick}>
        Disabled Link
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Disabled Link' })
    expect(link).not.toHaveAttribute('disabled')
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('tabIndex', '-1')

    fireEvent.click(link)
    expect(handleClick).not.toHaveBeenCalled()
  })
})