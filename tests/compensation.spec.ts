import { test, expect } from '@playwright/test';

test.describe('Airline Compensation Workflow (Manual Entry)', () => {
  
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  });

  test('EU261 Success Flow: >3h delay on EU flight', async ({ page }) => {
    await page.goto('/claim');

    // Step 1: Manual Data Entry
    await expect(page.locator('h1')).toContainText('Submit Your Claim');
    
    await page.fill('input[name="flightNumber"]', 'AF123');
    await page.fill('input[name="date"]', '2026-10-10');
    
    await page.fill('input[name="departure"]', 'CDG');
    await page.fill('input[name="arrival"]', 'JFK');
    
    await page.fill('input[name="delayInputHours"]', '4');
    await page.fill('input[name="delayInputMinutes"]', '0');
    
    await page.selectOption('select[name="disruptionReason"]', 'technical');
    
    await page.click('text=Review Claim');

    // Step 2: Review
    await expect(page.locator('.summary')).toContainText('240 mins');
    await expect(page.locator('.summary')).toContainText('CDG (FR) ➔ JFK (US)');
    await page.click('text=Submit Claim');

    // Step 3: Result
    await expect(page.locator('h2', { hasText: "You're Eligible!" })).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.amount')).toContainText('400 EUR');
  });

  test('APPR Success Flow: Cancellation on Canadian flight', async ({ page }) => {
    await page.goto('/claim');

    await page.fill('input[name="flightNumber"]', 'AC456');
    await page.fill('input[name="date"]', '2026-11-11');
    
    await page.fill('input[name="departure"]', 'YYZ');
    await page.fill('input[name="arrival"]', 'MEX');
    
    await page.fill('input[name="delayInputHours"]', '0');
    await page.fill('input[name="delayInputMinutes"]', '0');
    await page.check('input[name="isCancelled"]');
    
    await page.selectOption('select[name="disruptionReason"]', 'crew');
    
    await page.click('text=Review Claim');

    await expect(page.locator('.summary')).toContainText('(Cancelled)');
    await page.click('text=Submit Claim');

    await expect(page.locator('h2', { hasText: "You're Eligible!" })).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.amount')).toContainText('400 CAD');
  });

  test('Rejection Flow: Weather disruption', async ({ page }) => {
    await page.goto('/claim');

    await page.fill('input[name="flightNumber"]', 'BA789');
    await page.fill('input[name="date"]', '2026-12-12');
    
    await page.fill('input[name="departure"]', 'LHR');
    await page.fill('input[name="arrival"]', 'JFK');
    
    await page.fill('input[name="delayInputHours"]', '5');
    await page.fill('input[name="delayInputMinutes"]', '0');
    
    await page.selectOption('select[name="disruptionReason"]', 'weather');
    
    await page.click('text=Review Claim');
    await page.click('text=Submit Claim');

    await expect(page.locator('h2', { hasText: "Not Eligible" })).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.message')).toContainText('Extraordinary circumstances');
  });
});
