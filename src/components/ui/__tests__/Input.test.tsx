import { render, screen } from '@testing-library/react'
import { Input } from '../input'

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="test input" />)
    const input = screen.getByPlaceholderText('test input')
    expect(input).toBeInTheDocument()
  })

  it('applies custom classes', () => {
    render(<Input className="custom-class" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('custom-class')
  })

  it('applies aria-invalid styles', () => {
    render(<Input aria-invalid="true" data-testid="input-invalid" />)
    const input = screen.getByTestId('input-invalid')

    // Check for the classes we added to support aria-invalid styling
    expect(input).toHaveClass('aria-invalid:ring-destructive/20')
    expect(input).toHaveClass('dark:aria-invalid:ring-destructive/40')
    expect(input).toHaveClass('aria-invalid:border-destructive')
  })
})
