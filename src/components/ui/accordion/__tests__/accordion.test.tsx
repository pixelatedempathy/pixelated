// @vitest-environment jsdom
import * as React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

describe('Accordion', () => {
  it('should have proper accessibility attributes', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger = screen.getByText('Trigger 1').closest('button')

    // Check initial state
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // Trigger ID and Content ID linking
    const triggerId = trigger?.getAttribute('id')
    const contentId = trigger?.getAttribute('aria-controls')

    expect(triggerId).toBeTruthy()
    expect(contentId).toBeTruthy()

    if (contentId) {
      // Find by ID directly to ensure the ID is actually on the element
      // Using querySelector because getById might throw if not found, and we want to assert
      const contentRegion = document.getElementById(contentId)
      expect(contentRegion).toBeInTheDocument()
      expect(contentRegion).toHaveAttribute('role', 'region')
      expect(contentRegion).toHaveAttribute('aria-labelledby', triggerId)
    }

    // Expand
    if (trigger) {
        fireEvent.click(trigger)
        expect(trigger).toHaveAttribute('aria-expanded', 'true')
    }
  })
})
