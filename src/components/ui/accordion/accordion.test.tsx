// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion'

describe('Accordion Accessibility', () => {
  afterEach(() => {
    cleanup()
  })

  it('has proper ARIA attributes linking trigger and content', async () => {
    const user = userEvent.setup()

    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByRole('button', { name: 'Is it accessible?' })

    // Check for aria-expanded
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // Click to open
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // Check for aria-controls
    const controlsId = trigger.getAttribute('aria-controls')
    expect(controlsId).toBeTruthy()

    // Check if the content exists and is linked
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const content = document.getElementById(controlsId!)
    expect(content).toBeInTheDocument()

    // Check content role and labelling
    expect(content).toHaveAttribute('role', 'region')
    expect(content).toHaveAttribute('aria-labelledby', trigger.id)
  })
})
