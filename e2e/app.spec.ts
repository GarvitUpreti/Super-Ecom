import { test, expect } from '@playwright/test';

test('home page loads and displays products', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toHaveText('Browse Products');

  // Wait for product cards to load from API
  await page.waitForSelector('a[aria-label]', { timeout: 15000 });

  const productCards = page.locator('a[aria-label^="View details"]');
  const count = await productCards.count();
  expect(count).toBeGreaterThan(0);
});

test('clicking a product navigates to detail page and shows info', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('a[aria-label^="View details"]', { timeout: 15000 });

  const firstCard = page.locator('a[aria-label^="View details"]').first();
  await firstCard.click();

  // Should navigate to /product/:id and fetch product from API
  await expect(page).toHaveURL(/\/product\/\d+/);
  await expect(page.locator('h1')).not.toBeEmpty();
  await expect(page.locator('button', { hasText: 'Add to Cart' })).toBeVisible();
});

test('add to cart and remove from cart work correctly', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('a[aria-label^="View details"]', { timeout: 15000 });

  // Navigate to first product
  await page.locator('a[aria-label^="View details"]').first().click();
  await expect(page).toHaveURL(/\/product\/\d+/);

  // Add to cart
  await page.locator('button', { hasText: 'Add to Cart' }).click();
  await expect(page.locator('button', { hasText: 'Added to Cart' })).toBeVisible();

  // Navbar badge should show 1
  const badge = page.locator('nav span').last();
  await expect(badge).toHaveText('1');

  // Go to cart page
  await page.locator('a', { hasText: 'Cart' }).click();
  await expect(page).toHaveURL('/cart');

  // Product should be in the cart
  await expect(page.locator('article')).toHaveCount(1);
  await expect(page.locator('text=1 item in cart')).toBeVisible();

  // Remove from cart
  await page.locator('button', { hasText: 'Remove' }).click();
  await expect(page.locator('text=Your cart is empty')).toBeVisible();
});
