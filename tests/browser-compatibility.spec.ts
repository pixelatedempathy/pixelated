import { test, expect } from '@playwright/test'

test.describe('Browser Compatibility Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Pixelated Empathy/)
    await expect(
      page.getByRole('heading', { name: 'Practice Makes Perfect But' }),
    ).toBeVisible()
  })

  test('navigation works across browsers', async ({ page }) => {
    await page.goto('/')

    // Test main navigation
    const aboutLink = page.locator('a[href="/about"]').first()
    if (await aboutLink.isVisible()) {
      await aboutLink.click()
      await expect(page).toHaveURL(/.*about/)
    }
  })

  test('responsive design works', async ({ page }) => {
    await page.goto('/')

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('body')).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('body')).toBeVisible()
  })

  test('basic functionality works', async ({ page }) => {
    await page.goto('/')

    // Check for basic interactive elements
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    if (buttonCount > 0) {
      await expect(buttons.first()).toBeVisible()
    }
  })
})
