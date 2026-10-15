const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

test('Q3 - performance glitch user buys first Z-to-A product, verifies order, resets and logs out', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.open();
  await login.login('performance_glitch_user');
  await inventory.expectLoaded();
  await inventory.resetAppState();
  await inventory.sortNameDescending();

  const selected = await inventory.addFirstProduct();
  await inventory.openCart();
  await cart.expectProducts([selected.name]);
  await cart.checkout();
  await checkout.enterInformation();
  const result = await checkout.verifyFinalCheckout([selected.name], selected.price);
  console.log('Q3 verified checkout:', JSON.stringify(result));
  await checkout.finishOrder();

  await page.goto('/inventory.html');
  await inventory.resetAppState();
  await inventory.logout();
});