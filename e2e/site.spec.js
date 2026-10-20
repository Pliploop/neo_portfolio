import { test, expect } from '@playwright/test';

test('player plays through to about', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Play' }).click();
  await expect(page).toHaveURL(/\/about$/, { timeout: 6000 });
  await expect(page.getByRole('heading', { level: 1, name: 'Julien Guinot' })).toBeVisible();
});

test('nav moves between pages', async ({ page }) => {
  await page.goto('/about');
  const nav = page.getByRole('navigation', { name: 'Main' });
  await nav.getByRole('link', { name: 'Research' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Research' })).toBeVisible();
  await nav.getByRole('link', { name: 'Music' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Music' })).toBeVisible();
});

test('theme survives reload', async ({ page }) => {
  await page.goto('/about');
  const before = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  await page.getByRole('button', { name: /switch to/i }).click();
  await page.reload();
  const after = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  expect(after).toBe(!before);
});

test('publication filter', async ({ page }) => {
  await page.goto('/academia');
  await page.getByRole('button', { name: 'Journal' }).click();
  await expect(page.getByRole('list', { name: 'Publications' })).toContainText('TASLP');
});

test('contact validation messages', async ({ page }) => {
  await page.goto('/about#contact');
  await page.getByRole('button', { name: /send/i }).click();
  await expect(page.getByText('Required')).toHaveCount(2);
  await page.getByLabel('email').fill('nope');
  await page.getByRole('button', { name: /send/i }).click();
  await expect(page.getByText('Invalid email address')).toBeVisible();
});

for (const path of ['/', '/about', '/academia', '/music']) {
  test(`no horizontal scroll on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const width = page.viewportSize().width;
    const clipped = await page.evaluate((w) => [...document.querySelectorAll('body *')]
      .filter((el) => !el.closest('[aria-hidden="true"], .marquee, .sr-only'))
      .filter((el) => el.getBoundingClientRect().right > w + 1)
      .map((el) => el.tagName + ' ' + (el.textContent || '').trim().slice(0, 30)), width);
    expect(clipped).toEqual([]);
  });
}
