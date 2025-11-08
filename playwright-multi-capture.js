import { chromium } from 'playwright';

const pages = [
  { url: 'http://localhost:4321/', name: 'homepage' },
  { url: 'http://localhost:4321/about', name: 'about' },
  { url: 'http://localhost:4321/features', name: 'features' },
  { url: 'http://localhost:4321/contact', name: 'contact' },
  { url: 'http://localhost:4321/404', name: '404' },
];

const browser = await chromium.launch();
const page = await browser.newPage();

await page.setViewportSize({ width: 1920, height: 1080 });

for (const pageInfo of pages) {
  await page.goto(pageInfo.url);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `/tmp/${pageInfo.name}-desktop.png`, fullPage: true });
  console.log(`✓ ${pageInfo.name} screenshot saved`);
}

await browser.close();
