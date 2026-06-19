import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173');
  
  // Wait for app to load
  await page.waitForSelector('textarea');
  
  // Type a citation
  await page.fill('textarea', 'The court held in Roe v. Wade, 410 U.S. 113, that privacy is fundamental.');
  
  // Click scan
  await page.click('button.scan-button');
  
  // Wait a bit for the backend
  await page.waitForTimeout(4000);
  
  // Take screenshot
  await page.screenshot({ path: 'screenshot.png' });
  
  // Get all text on the page
  const text = await page.evaluate(() => document.body.innerText);
  console.log(text);
  
  await browser.close();
})();
