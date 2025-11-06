const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const sites = [
  { name: 'current', url: 'https://pixelatedempathy.com' },
  { name: 'mizu', url: 'https://mizu-theme.netlify.app/' },
  { name: 'flabbergasted', url: 'https://lexingtonthemes.com/viewports/flabbergasted' },
  { name: 'antfustyle', url: 'https://astro-antfustyle-theme.vercel.app/' },
  { name: 'astromaxx', url: 'https://astromaxx.netlify.app/' },
];

async function inspectSite(site) {
  console.log(`\n🔍 Inspecting ${site.name}: ${site.url}`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'dark',
  });
  const page = await context.newPage();

  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000); // Wait for animations

    // Capture layout information
    const layout = await page.evaluate(() => {
      const header = document.querySelector('header');
      const hero = document.querySelector('section.hero-section, .hero, [class*="hero"]');
      const footer = document.querySelector('footer');
      const main = document.querySelector('main, [role="main"]');

      return {
        header: header ? {
          height: header.offsetHeight,
          visible: header.offsetHeight > 0,
          hasContent: header.textContent.trim().length > 0,
          styles: window.getComputedStyle(header).cssText,
        } : null,
        hero: hero ? {
          height: hero.offsetHeight,
          visible: hero.offsetHeight > 0,
          position: window.getComputedStyle(hero).position,
          top: hero.offsetTop,
          styles: window.getComputedStyle(hero).cssText,
        } : null,
        footer: footer ? {
          height: footer.offsetHeight,
          visible: footer.offsetHeight > 0,
          position: window.getComputedStyle(footer).position,
          styles: window.getComputedStyle(footer).cssText,
        } : null,
        main: main ? {
          height: main.offsetHeight,
          paddingTop: window.getComputedStyle(main).paddingTop,
        } : null,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        bodyStyles: {
          fontSize: window.getComputedStyle(document.body).fontSize,
          lineHeight: window.getComputedStyle(document.body).lineHeight,
          color: window.getComputedStyle(document.body).color,
        },
      };
    });

    // Capture CSS variables
    const cssVars = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const vars = {};
      for (let i = 0; i < root.length; i++) {
        const prop = root[i];
        if (prop.startsWith('--')) {
          vars[prop] = root.getPropertyValue(prop);
        }
      }
      return vars;
    });

    // Capture typography
    const typography = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('h2');
      const p = document.querySelector('p');
      
      return {
        h1: h1 ? {
          fontSize: window.getComputedStyle(h1).fontSize,
          fontWeight: window.getComputedStyle(h1).fontWeight,
          lineHeight: window.getComputedStyle(h1).lineHeight,
          margin: window.getComputedStyle(h1).margin,
        } : null,
        h2: h2 ? {
          fontSize: window.getComputedStyle(h2).fontSize,
          fontWeight: window.getComputedStyle(h2).fontWeight,
          lineHeight: window.getComputedStyle(h2).lineHeight,
        } : null,
        p: p ? {
          fontSize: window.getComputedStyle(p).fontSize,
          lineHeight: window.getComputedStyle(p).lineHeight,
        } : null,
      };
    });

    // Capture spacing patterns
    const spacing = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section, main > *'));
      return sections.slice(0, 5).map(section => ({
        paddingTop: window.getComputedStyle(section).paddingTop,
        paddingBottom: window.getComputedStyle(section).paddingBottom,
        marginTop: window.getComputedStyle(section).marginTop,
        marginBottom: window.getComputedStyle(section).marginBottom,
      }));
    });

    const report = {
      site: site.name,
      url: site.url,
      layout,
      cssVars,
      typography,
      spacing,
      timestamp: new Date().toISOString(),
    };

    // Save report
    const reportPath = path.join(__dirname, `inspection-${site.name}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`✅ Saved inspection report: ${reportPath}`);

    return report;
  } catch (error) {
    console.error(`❌ Error inspecting ${site.name}:`, error.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🚀 Starting site inspections...\n');
  
  const reports = [];
  for (const site of sites) {
    const report = await inspectSite(site);
    if (report) reports.push(report);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Rate limiting
  }

  // Create summary
  const summary = {
    timestamp: new Date().toISOString(),
    sites: reports.map(r => ({
      name: r.site,
      url: r.url,
      headerHeight: r.layout?.header?.height || 0,
      heroHeight: r.layout?.hero?.height || 0,
      footerHeight: r.layout?.footer?.height || 0,
      hasHeaderContent: r.layout?.header?.hasContent || false,
    })),
  };

  const summaryPath = path.join(__dirname, 'inspection-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\n✅ Summary saved: ${summaryPath}`);
}

main().catch(console.error);
