#!/usr/bin/env tsx
/**
 * Playwright screenshot utility
 * 
 * Usage:
 *   pnpm tsx scripts/take-screenshot.ts <url> [output-path]
 *   pnpm tsx scripts/take-screenshot.ts http://localhost:4321 /tmp/screenshot.png
 *   pnpm tsx scripts/take-screenshot.ts http://localhost:4321/ --full-page
 */

import { chromium, type Browser, type Page } from '@playwright/test'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface ScreenshotOptions {
  url: string
  outputPath?: string
  fullPage?: boolean
  viewport?: { width: number; height: number }
  waitForSelector?: string
  waitForTimeout?: number
  darkMode?: boolean
}

async function takeScreenshot(options: ScreenshotOptions): Promise<string> {
  const {
    url,
    outputPath,
    fullPage = false,
    viewport = { width: 1920, height: 1080 },
    waitForSelector,
    waitForTimeout = 5000,
    darkMode = false,
  } = options

  const browser: Browser = await chromium.launch({
    headless: true,
  })

  try {
    const context = await browser.newContext({
      viewport: viewport,
      colorScheme: darkMode ? 'dark' : 'light',
    })

    const page: Page = await context.newPage()

    console.log(`Navigating to: ${url}`)
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
    })

    // Wait for specific selector if provided
    if (waitForSelector) {
      console.log(`Waiting for selector: ${waitForSelector}`)
      await page.waitForSelector(waitForSelector, { timeout: waitForTimeout })
    } else {
      // Default wait for page to be ready
      await page.waitForTimeout(2000)
    }

    // Generate output path if not provided
    const finalOutputPath =
      outputPath ||
      resolve(
        process.cwd(),
        'screenshots',
        `screenshot-${Date.now()}.png`,
      )

    console.log(`Taking screenshot...`)
    const screenshot = await page.screenshot({
      path: finalOutputPath,
      fullPage: fullPage,
      type: 'png',
    })

    console.log(`✅ Screenshot saved to: ${finalOutputPath}`)

    // Also return as base64 for potential display
    const base64 = screenshot.toString('base64')
    console.log(`\nBase64 preview (first 100 chars): ${base64.substring(0, 100)}...`)

    return finalOutputPath
  } finally {
    await browser.close()
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: tsx scripts/take-screenshot.ts <url> [output-path] [options]')
    console.error('\nOptions:')
    console.error('  --full-page          Take full page screenshot')
    console.error('  --viewport=WxH       Set viewport (e.g., 1920x1080)')
    console.error('  --wait-for=SELECTOR   Wait for selector before screenshot')
    console.error('  --dark-mode          Use dark mode')
    console.error('\nExamples:')
    console.error('  tsx scripts/take-screenshot.ts http://localhost:4321')
    console.error('  tsx scripts/take-screenshot.ts http://localhost:4321 /tmp/page.png --full-page')
    console.error('  tsx scripts/take-screenshot.ts http://localhost:4321 --wait-for=".main-content"')
    process.exit(1)
  }

  let url: string | undefined
  let outputPath: string | undefined
  let fullPage = false
  let viewport: { width: number; height: number } | undefined
  let waitForSelector: string | undefined
  let darkMode = false

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      if (arg === '--url' && i + 1 < args.length) {
        url = args[++i]
      } else if (arg === '--full-page') {
        fullPage = true
      } else if (arg === '--dark-mode') {
        darkMode = true
      } else if (arg.startsWith('--viewport=')) {
        const [width, height] = arg.split('=')[1].split('x').map(Number)
        viewport = { width, height }
      } else if (arg.startsWith('--wait-for=')) {
        waitForSelector = arg.split('=')[1]
      } else if (arg.startsWith('--outputPath=')) {
        outputPath = arg.split('=')[1]
      }
    } else if (!url) {
      // First non-flag argument is the URL
      url = arg
    } else if (!outputPath) {
      // Second non-flag argument is the output path
      outputPath = arg
    }
  }

  if (!url) {
    console.error('❌ Error: URL is required')
    console.error('Usage: tsx scripts/take-screenshot.ts <url> [output-path] [options]')
    console.error('   or: tsx scripts/take-screenshot.ts --url <url> --outputPath <path> [options]')
    process.exit(1)
  }

  try {
    const screenshotPath = await takeScreenshot({
      url,
      outputPath,
      fullPage,
      viewport,
      waitForSelector,
      darkMode,
    })

    console.log(`\n✨ Screenshot complete!`)
    console.log(`   File: ${screenshotPath}`)
    console.log(`   Size: ${(await import('node:fs')).promises.stat(screenshotPath).then(s => `${(s.size / 1024).toFixed(2)} KB`)}`)
  } catch (error) {
    console.error('❌ Error taking screenshot:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { takeScreenshot, type ScreenshotOptions }
