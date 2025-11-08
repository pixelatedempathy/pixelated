import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.setViewportSize({ width: 1920, height: 1080 });
await page.goto('http://localhost:4321');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/homepage-desktop.png', fullPage: true });
console.log('✓ Desktop screenshot saved');

await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:4321');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/homepage-mobile.png', fullPage: true });
console.log('✓ Mobile screenshot saved');

await browser.close();
