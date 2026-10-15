const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectProducts(expectedNames) {
    const actual = await this.items.locator('.inventory_item_name').allTextContents();
    expect(actual.map(x => x.trim()).sort()).toEqual([...expectedNames].sort());
  }

  async getProductNames() {
    return (await this.items.locator('.inventory_item_name').allTextContents()).map(x => x.trim());
  }

  async checkout() { await this.checkoutButton.click(); }
}
module.exports = { CartPage };