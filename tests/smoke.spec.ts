import { expect, test, type Page } from '@playwright/test';

/** Opens a page and waits until the islands that hydrate without scrolling are interactive. */
async function open(page: Page, path: string) {
  await page.goto(path);
  await page.waitForFunction(
    () => !document.querySelector('astro-island[ssr]:is([client=load], [client=idle])'),
  );
}

test('loads in French, with a link to the English version', async ({ page }) => {
  await open(page, './');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('h1')).toContainText("Je mets l'IA en production");
  await page.locator('.lang a[hreflang=en]').click();
  await expect(page.locator('h1')).toContainText('I put AI into production');
});

test('loads in English', async ({ page }) => {
  await open(page, './en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#work h2')).toHaveText('Real AI systems, with their results');
});

test('the matching demo scores a job description as it is typed', async ({ page }) => {
  await open(page, './');
  await expect(page.locator('#match .pct')).toHaveText(/^\d+ %$/);
  await page.locator('#jd').fill('Python, Kafka, Airflow, Snowflake');
  await expect(page.locator('#match .pct')).toHaveText('25 %');
  await expect(page.locator('.guide .bubble')).toContainText('25 %');
});

test('a case study window opens and closes', async ({ page }) => {
  await open(page, './');
  await page.locator('[data-case=scoreia]').click();
  const dialog = page.locator('#dlg-scoreia');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('6 tests unitaires');
  await dialog.locator('.x').click();
  await expect(dialog).toBeHidden();
});

test('a project matched by the demo opens its case study', async ({ page }) => {
  await open(page, './');
  await page.locator('#match .bars button', { hasText: 'LOCAM' }).click();
  await expect(page.locator('#dlg-scoreia')).toBeVisible();
});

test('the domain filter hides the other cases', async ({ page }) => {
  await open(page, './');
  await page.locator('[data-f=finance]').click();
  await expect(page.locator('.cases .case')).toHaveCount(1);
  await expect(page.locator('.cases .mini')).toHaveCount(0);
});
