const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemNames = page.locator('.cart_item .inventory_item_name');
    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
  }

  async enterInformation() {
    await this.firstName.fill('Test');
    await this.lastName.fill('User');
    await this.postalCode.fill('1000');
    await this.continueButton.click();
  }

  async verifyFinalCheckout(expectedNames, expectedSubtotal) {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    const actualNames = (await this.itemNames.allTextContents()).map(x => x.trim());
    expect(actualNames.sort()).toEqual([...expectedNames].sort());
    const subtotalText = await this.subtotal.innerText();
    const subtotal = Number(subtotalText.replace('Item total: $', ''));
    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
    const taxText = await this.tax.innerText();
    const tax = Number(taxText.replace('Tax: $', ''));
    const totalText = await this.total.innerText();
    const total = Number(totalText.replace('Total: $', ''));
    expect(total).toBeCloseTo(subtotal + tax, 2);
    return { names: actualNames, subtotal, tax, total };
  }

  async finishOrder() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/checkout-complete.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
module.exports = { CheckoutPage };