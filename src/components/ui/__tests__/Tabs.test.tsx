// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs'

expect.extend(matchers)

describe('Tabs Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders correctly with expected structure', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )

    // Check for role="tablist"
    const tablists = screen.getAllByRole('tablist')
    // Ideally, there should be only ONE tablist (the TabsList), but currently there are two.
    // We expect this to fail or we assert the current buggy state.
    // Let's assert the correct state we WANT, so it fails now.
    expect(tablists).toHaveLength(1)

    // Check tabs
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(2)
    expect(tabs[0]).toHaveTextContent('Tab 1')
    expect(tabs[1]).toHaveTextContent('Tab 2')

    // Check content
    expect(screen.getByText('Content 1')).toBeVisible()
    expect(screen.queryByText('Content 2')).toBeNull()
  })

  it('supports keyboard navigation', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    )

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    const tab3 = screen.getByRole('tab', { name: 'Tab 3' })

    // Click tab 1 to focus it (or simulate focus)
    tab1.focus()
    expect(document.activeElement).toBe(tab1)

    // Arrow Right -> Tab 2
    fireEvent.keyDown(tab1, { key: 'ArrowRight' })
    // We expect focus to move to Tab 2 and it to be selected
    expect(document.activeElement).toBe(tab2)
    expect(tab2).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 2')).toBeVisible()

    // Arrow Down -> Tab 3
    fireEvent.keyDown(tab2, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(tab3)
    expect(tab3).toHaveAttribute('aria-selected', 'true')

    // Arrow Right (loop) -> Tab 1
    fireEvent.keyDown(tab3, { key: 'ArrowRight' })
    expect(document.activeElement).toBe(tab1)
    expect(tab1).toHaveAttribute('aria-selected', 'true')

    // End -> Tab 3
    fireEvent.keyDown(tab1, { key: 'End' })
    expect(document.activeElement).toBe(tab3)

    // Home -> Tab 1
    fireEvent.keyDown(tab3, { key: 'Home' })
    expect(document.activeElement).toBe(tab1)
  })
})
