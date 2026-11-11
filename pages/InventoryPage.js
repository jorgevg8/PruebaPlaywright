export class InventoryPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.getByTestId('title');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
  }

  async addProductToCart(productId) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}
