import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';
const VALID_USERNAME = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('Sauce Demo - authentication and shopping cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('allows a valid user to sign in', async ({ page }) => {
    await page.getByTestId('username').fill(VALID_USERNAME);
    await page.getByTestId('password').fill(VALID_PASSWORD);
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('inventory-container')).toBeVisible();
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('shows an error when credentials are invalid', async ({ page }) => {
    await page.getByTestId('username').fill(VALID_USERNAME);
    await page.getByTestId('password').fill('wrong-password');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('error')).toBeVisible();
    await expect(page.getByTestId('error')).toContainText(
      'Username and password do not match'
    );
    await expect(page).toHaveURL(BASE_URL);
  });

  test('adds a product to the cart and validates the cart contents', async ({ page }) => {
    await page.getByTestId('username').fill(VALID_USERNAME);
    await page.getByTestId('password').fill(VALID_PASSWORD);
    await page.getByTestId('login-button').click();

    const productName = 'Sauce Labs Backpack';
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    await page.getByTestId('shopping-cart-link').click();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByTestId('inventory-item-name')).toHaveText(productName);
    await expect(page.getByTestId('item-quantity')).toHaveText('1');
  });
});
