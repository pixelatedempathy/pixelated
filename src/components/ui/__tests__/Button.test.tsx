import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../button'

describe('Button Component', () => {
  it('renders a disabled link correctly', () => {
    const handleClick = vi.fn(e => e.preventDefault()) // prevent navigation
    render(
      <Button href="#" disabled onClick={handleClick}>
        Disabled Link
      </Button>
    )

    // It should still be technically a link (or we might decide to remove href, but let's see current behavior)
    // If it has href, it's a link.
    const link = screen.getByText('Disabled Link').closest('a')
    expect(link).toBeInTheDocument()

    if (!link) return

    // Check that 'disabled' attribute is NOT present (invalid HTML5 for anchors)
    // Currently this is expected to FAIL because the bug exists
    expect(link).not.toHaveAttribute('disabled')

    // Check for aria-disabled
    expect(link).toHaveAttribute('aria-disabled', 'true')

    // Check for tabIndex
    // Currently this is expected to FAIL
    expect(link).toHaveAttribute('tabIndex', '-1')

    // Check click behavior
    fireEvent.click(link)
    // Currently this might FAIL if pointer-events-none is not respected by fireEvent or handled by logic
    expect(handleClick).not.toHaveBeenCalled()
  })
})
