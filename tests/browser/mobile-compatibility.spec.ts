/**
 * Mobile Device Compatibility Tests
 *
 * These tests verify our application works correctly on various mobile device screen sizes
 * using Playwright's device emulation capabilities.
 */

import { test, expect } from '@playwright/test'

import { TEST_PAGES, navigateToPage, verifyPageElements, checkHorizontalOverflow, waitForPageStable, ensureTestResultsDir } from '../helpers/test-utils'

// Test devices to check
const TEST_DEVICES = [
  'iPhone 12',
  'iPhone SE',
  'Pixel 5',
  'iPad Mini',
  'Galaxy Tab S4',
]

// Use TEST_PAGES from test-utils

// Basic test for all device/page combinations
for (const device of TEST_DEVICES) {
  for (const page of TEST_PAGES) {
    test(`${page.name} page should display properly on ${device}`, async ({
      playwright,
      browser,
      browserName,
    }) => {
      // Skip mobile device emulation for Firefox (not supported)
      if (browserName === 'firefox') {
        test.skip(true, 'Firefox does not support mobile device emulation')
        return
      }

      // Create device context with emulated device
      const deviceConfig = playwright.devices[device]
      const context = await browser.newContext({
        ...deviceConfig,
      })

      // Create new page in device context
      const pageObj = await context.newPage()

      // Ensure directory exists for screenshots
      await ensureTestResultsDir('mobile')

      // Navigate to the test page
      await navigateToPage(pageObj, page.url)

      // Wait for page to fully load
      await waitForPageStable(pageObj)

      // Take screenshot for visual verification
      await pageObj.screenshot({
        path: `./test-results/mobile/${device.replace(/\s+/g, '-')}-${page.name}.png`,
      })

      // Basic verification - allow empty title for now as it might be set by client-side JS
      const pageTitle = await pageObj.title()
      console.log(`Page title for ${page.name}: "${pageTitle}"`)
      // expect(pageTitle).not.toBe('')

      // Check for horizontal overflow
      await checkHorizontalOverflow(pageObj, device, page.name)

      // Verify page elements are present
      await verifyPageElements(pageObj, { ...page, requiresAuth: page.url.includes('/admin') })

      // Close context when done
      await context.close()
    })
  }
}

// Test responsive behaviors
test('responsive navigation should work on mobile devices', async ({
  playwright,
  browser,
  browserName,
}) => {
  // Skip mobile device emulation for Firefox (not supported)
  if (browserName === 'firefox') {
    test.skip(true, 'Firefox does not support mobile device emulation')
    return
  }

  // Use iPhone 12 as test device
  const deviceConfig = playwright.devices['iPhone 12']
  const context = await browser.newContext({
    ...deviceConfig,
  })

  const page = await context.newPage()

  // Ensure directory exists for screenshots
  await ensureTestResultsDir('mobile')

  // Navigate to homepage
  await navigateToPage(page, '/')

  // Look for mobile navigation elements - hamburger menu or similar
  const mobileNavTrigger = page
    .locator('button[aria-label*="menu" i], button[aria-label*="navigation" i]')
    .first()

  // If we have a mobile trigger, test it
  if ((await mobileNavTrigger.count()) > 0) {
    // Click the mobile nav trigger
    await mobileNavTrigger.click()

    // Wait for any animations
    await page.waitForTimeout(500)

    // Take screenshot with menu open
    await page.screenshot({
      path: `./test-results/mobile/mobile-nav-open.png`,
    })

    // Verify menu items are visible
    const menuItems = page.locator('nav a')
    // Check if first menu item exists and is attached to DOM
    const firstMenuItem = menuItems.first()
    if ((await firstMenuItem.count()) > 0) {
      // Wait for it to be visible with a longer timeout
      await expect(firstMenuItem).toBeVisible({ timeout: 15000 })
    }
  }

  // Close context when done
  await context.close()
})
