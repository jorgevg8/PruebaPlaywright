export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
  }

  getItemByName(productName) {
    return this.cartItems.filter({
      has: this.page.getByTestId('inventory-item-name').filter({
        hasText: productName,
      }),
    });
  }
}
