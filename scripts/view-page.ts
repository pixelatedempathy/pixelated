#!/usr/bin/env tsx
/**
 * Playwright page viewer - Opens a page in a browser for visual inspection
 * 
 * Usage:
 *   pnpm tsx scripts/view-page.ts <url>
 *   pnpm tsx scripts/view-page.ts http://localhost:4321
 *   pnpm tsx scripts/view-page.ts http://localhost:4321 --screenshot=/tmp/page.png
 */

import { chromium, type Browser, type Page } from '@playwright/test'
import { resolve } from 'node:path'

interface ViewOptions {
  url: string
  screenshotPath?: string
  viewport?: { width: number; height: number }
  darkMode?: boolean
  headless?: boolean
  waitForSelector?: string
}

async function viewPage(options: ViewOptions): Promise<void> {
  const {
    url,
    screenshotPath,
    viewport = { width: 1920, height: 1080 },
    darkMode = false,
    headless = false,
    waitForSelector,
  } = options

  console.log(`🌐 Opening browser to view: ${url}`)
  console.log(`   Headless: ${headless}`)
  console.log(`   Viewport: ${viewport.width}x${viewport.height}`)

  const browser: Browser = await chromium.launch({
    headless: headless,
  })

  try {
    const context = await browser.newContext({
      viewport: viewport,
      colorScheme: darkMode ? 'dark' : 'light',
    })

    const page: Page = await context.newPage()

    console.log(`\n� navigation to: ${url}`)
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
    })

    if (waitForSelector) {
      console.log(`⏳ Waiting for selector: ${waitForSelector}`)
      await page.waitForSelector(waitForSelector, { timeout: 10000 })
    } else {
      await page.waitForTimeout(2000)
    }

    console.log(`✅ Page loaded!`)

    // Take screenshot if requested
    if (screenshotPath) {
      const finalPath = resolve(process.cwd(), screenshotPath)
      await page.screenshot({
        path: finalPath,
        fullPage: true,
        type: 'png',
      })
      console.log(`📸 Screenshot saved to: ${finalPath}`)
    }

    if (!headless) {
      console.log(`\n👀 Browser window is open. Press Ctrl+C to close.`)
      console.log(`   The page will remain open until you close the browser or press Ctrl+C.\n`)

      // Keep the browser open
      await new Promise<void>((resolve) => {
        process.on('SIGINT', () => {
          console.log(`\n\n👋 Closing browser...`)
          resolve()
        })
        // Also listen for page close
        page.on('close', () => resolve())
      })
    } else {
      console.log(`\n✅ Page viewed (headless mode)`)
    }
  } finally {
    await browser.close()
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: tsx scripts/view-page.ts <url> [options]')
    console.error('\nOptions:')
    console.error('  --screenshot=PATH     Take screenshot and save to path')
    console.error('  --viewport=WxH       Set viewport (e.g., 1920x1080)')
    console.error('  --wait-for=SELECTOR   Wait for selector before showing')
    console.error('  --dark-mode          Use dark mode')
    console.error('  --headless           Run in headless mode (no visible browser)')
    console.error('\nExamples:')
    console.error('  tsx scripts/view-page.ts http://localhost:4321')
    console.error('  tsx scripts/view-page.ts http://localhost:4321 --screenshot=/tmp/page.png')
    console.error('  tsx scripts/view-page.ts http://localhost:4321 --headless --screenshot=page.png')
    process.exit(1)
  }

  const url = args[0]
  let screenshotPath: string | undefined
  let viewport: { width: number; height: number } | undefined
  let waitForSelector: string | undefined
  let darkMode = false
  let headless = false

  // Parse arguments
  for (let i = 1; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      if (arg === '--dark-mode') {
        darkMode = true
      } else if (arg === '--headless') {
        headless = true
      } else if (arg.startsWith('--screenshot=')) {
        screenshotPath = arg.split('=')[1]
      } else if (arg.startsWith('--viewport=')) {
        const [width, height] = arg.split('=')[1].split('x').map(Number)
        viewport = { width, height }
      } else if (arg.startsWith('--wait-for=')) {
        waitForSelector = arg.split('=')[1]
      }
    }
  }

  try {
    await viewPage({
      url,
      screenshotPath,
      viewport,
      waitForSelector,
      darkMode,
      headless,
    })
  } catch (error) {
    console.error('❌ Error viewing page:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { viewPage, type ViewOptions }
