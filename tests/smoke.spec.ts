import { expect, test } from '@playwright/test';

test('loads in French, with a link to the English version', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('h1')).toContainText("Je mets l'IA en production");
  await page.locator('.lang a[hreflang=en]').click();
  await expect(page.locator('h1')).toContainText('I put AI into production');
});

test('loads in English', async ({ page }) => {
  await page.goto('./en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#work h2')).toHaveText('Real AI systems, with their results');
});

test('the matching demo returns a score', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#result .pct')).toHaveText(/^\d+ %$/);
  await page.locator('#jd').fill('Python, Kafka, Airflow, Snowflake');
  await page.locator('#run').click();
  await expect(page.locator('#result .pct')).toHaveText('25 %');
});

test('a case study window opens and closes', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-case=scoreia]').click();
  const dialog = page.locator('#dlg-scoreia');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('6 tests unitaires');
  await dialog.locator('[data-close]').click();
  await expect(dialog).toBeHidden();
});

test('the domain filter hides the other cases', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-f=finance]').click();
  await expect(page.locator('#cases .case:visible')).toHaveCount(1);
});
