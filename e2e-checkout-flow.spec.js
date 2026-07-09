const { test, expect } = require('@playwright/test');

test('E-Commerce End to End Checkout Flow', async ({ page }) => {
  // 1. Go to the website
  await page.goto('https://saucedemo.com');

  // 2. Log in automatically
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // 3. Verify user landed on products page
  await expect(page).toHaveURL('https://saucedemo.cominventory.html');

  // 4. Add an item to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // 5. Go to checkout and fill details
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();

  // 6. Finish checkout and verify success message
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});
