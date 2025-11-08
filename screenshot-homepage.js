const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to homepage
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'tmp/homepage-full.png', 
    fullPage: true 
  });
  
  console.log('✓ Full page screenshot saved to tmp/homepage-full.png');
  
  // Take viewport screenshot
  await page.screenshot({ 
    path: 'tmp/homepage-viewport.png' 
  });
  
  console.log('✓ Viewport screenshot saved to tmp/homepage-viewport.png');
  
  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ 
    path: 'tmp/homepage-mobile.png',
    fullPage: true
  });
  
  console.log('✓ Mobile screenshot saved to tmp/homepage-mobile.png');
  
  await browser.close();
})();
