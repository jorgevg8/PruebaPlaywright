import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

const VALID_USERNAME = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('Sauce Demo - authentication', () => {
  test('allows a valid user to sign in', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('inventory-container')).toBeVisible();
  });

  test('shows an error when credentials are invalid', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, 'wrong-password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match'
    );
    await expect(page).toHaveURL('/');
  });
});
