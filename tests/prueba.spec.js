import { test, expect } from '@playwright/test';

test('displays the challenging DOM table and its rows', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/challenging_dom');

  await expect(
    page.getByRole('heading', { name: 'Challenging DOM' })
  ).toBeVisible();

  const table = page.locator('table');
  await expect(table).toBeVisible();

  const rows = table.locator('tbody tr');
  await expect(rows).toHaveCount(10);

  await expect(rows.first()).toBeVisible();
});
