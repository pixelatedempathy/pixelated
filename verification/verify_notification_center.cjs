const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  try {
    console.log('Navigating to test page...');
    await page.goto('http://localhost:4321/test-notifications', { timeout: 60000 });

    // Wait for the bell button
    console.log('Waiting for bell button...');
    const bellButton = page.locator('button:has(.lucide-bell)');
    await bellButton.waitFor({ state: 'visible' });

    // Click it
    console.log('Clicking bell button...');
    await bellButton.click();

    // Wait a bit
    await page.waitForTimeout(2000);

    // Screenshot of the whole page
    await page.screenshot({ path: 'verification/after_click.png' });

    // Check if the panel is in the DOM at all
    const panelExists = await page.locator('text=Notifications').count() > 0;
    console.log('Panel exists in DOM:', panelExists);

    if (panelExists) {
        console.log('Verification successful');
    } else {
        console.log('Verification failed: Panel not found');
    }
  } catch (e) {
    console.error('Verification failed with exception:', e);
    await page.screenshot({ path: 'verification/error.png' });
  } finally {
    await browser.close();
  }
})();
