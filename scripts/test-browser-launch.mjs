import { chromium } from 'playwright';

async function test() {
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    console.log("Playwright browser launched successfully!");
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    const title = await page.title();
    console.log("Page title:", title);
    await browser.close();
  } catch (err) {
    console.error("Browser launch error:", err);
  }
}
test();
