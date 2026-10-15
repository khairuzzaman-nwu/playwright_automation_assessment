const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.resetLink = page.locator('#reset_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  async resetAppState() {
    await this.menuButton.click();
    await expect(this.resetLink).toBeVisible();
    await this.resetLink.click();
    // Reset link leaves the menu open and clears cart/app state.
    await this.page.locator('#inventory_container').click({ position: { x: 5, y: 5 } }).catch(() => {});
    await expect(this.page.locator('.shopping_cart_badge')).toHaveCount(0);
  }

  async addFirstNProducts(count) {
    const items = this.inventoryItems;
    const n = await items.count();
    if (n < count) throw new Error(`Expected at least ${count} products, found ${n}`);
    for (let i = 0; i < count; i++) {
      await items.nth(i).locator('button').click();
    }
  }

  async sortNameDescending() {
    await this.sortDropdown.selectOption('za');
    await expect(this.sortDropdown).toHaveValue('za');
  }

  async addFirstProduct() {
    const first = this.inventoryItems.first();
    const name = (await first.locator('.inventory_item_name').innerText()).trim();
    const priceText = (await first.locator('.inventory_item_price').innerText()).trim();
    const price = Number(priceText.replace('$', ''));
    await first.locator('button').click();
    return { name, price };
  }

  async openCart() { await this.cartLink.click(); }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
    await expect(this.page).toHaveURL(/\/$/);
  }
}
module.exports = { InventoryPage };