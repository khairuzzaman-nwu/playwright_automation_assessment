const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test('Q1 - locked_out_user sees the locked-out error', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login('locked_out_user');
  await login.expectLoginError('Sorry, this user has been locked out.');
});