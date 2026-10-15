const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test('Q2 - standard user buys three products, verifies order, resets and logs out', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.open();
  await login.login('standard_user');
  await inventory.expectLoaded();

  await inventory.resetAppState();
  // Use the first three products currently shown; capture names/prices before adding.
  const expected = [];
  for (let i = 0; i < 3; i++) {
    const item = inventory.inventoryItems.nth(i);
    expected.push({
      name: (await item.locator('.inventory_item_name').innerText()).trim(),
      price: Number((await item.locator('.inventory_item_price').innerText()).replace('$', ''))
    });
    await item.locator('button').click();
  }
  await inventory.openCart();
  await expect(page).toHaveURL(/cart.html/);
  await cart.expectProducts(expected.map(p => p.name));
  await cart.checkout();
  await checkout.enterInformation();
  const result = await checkout.verifyFinalCheckout(expected.map(p => p.name), expected.reduce((s, p) => s + p.price, 0));
  console.log('Q2 verified checkout:', JSON.stringify(result));
  await checkout.finishOrder();

  // Reset app state from inventory, then log out as required.
  await page.goto('/inventory.html');
  await inventory.resetAppState();
  await inventory.logout();
});