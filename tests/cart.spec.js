import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { LoginPage } from '../pages/LoginPage.js';

test('adds a product to the cart and validates its contents', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(inventoryPage.pageTitle).toHaveText('Products');

  const productId = 'sauce-labs-backpack';
  const productName = 'Sauce Labs Backpack';

  await inventoryPage.addProductToCart(productId);
  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

  await inventoryPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);

  const cartPage = new CartPage(page);
  const selectedItem = cartPage.getItemByName(productName);

  await expect(selectedItem).toHaveCount(1);
  await expect(selectedItem.getByTestId('inventory-item-name')).toHaveText(productName);
  await expect(selectedItem.getByTestId('item-quantity')).toHaveText('1');
});
