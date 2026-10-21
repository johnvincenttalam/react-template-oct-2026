import { expect, test, type Page } from '@playwright/test'

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
}

test.describe('navigation', () => {
  test('moves between public pages and the dashboard', async ({ page, isMobile }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1, name: /cohesive foundation/i })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    await page.getByRole('link', { name: /browse components/i }).click()
    await expect(page).toHaveURL(/\/components$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Component gallery' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    if (isMobile) {
      await page.getByRole('button', { name: 'Open navigation menu' }).click()
      await page.getByRole('dialog').getByRole('link', { name: 'Forms' }).click()
    } else {
      await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Forms' }).click()
    }
    await expect(page.getByRole('heading', { level: 1, name: 'Forms' })).toBeVisible()

    await page.goto('/dashboard')
    await expect(page.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeVisible()
    await expectNoHorizontalOverflow(page)
  })

  test('shows a 404 page for unknown routes', async ({ page }) => {
    await page.goto('/nope')
    await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
    await page.getByRole('link', { name: /back to home/i }).click()
    await expect(page).toHaveURL(/\/$/)
  })
})

test.describe('interactions', () => {
  test('theme choice applies and survives a reload', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /change theme/i }).click()
    await page.getByRole('menuitemradio', { name: 'Dark' }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)

    await page.reload()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('registration form shows validation errors', async ({ page }) => {
    await page.goto('/forms')
    await page.getByRole('button', { name: 'Create account' }).click()
    await expect(page.getByText('Full name is required')).toBeVisible()
    await expect(page.getByRole('textbox', { name: /full name/i })).toHaveAttribute('aria-invalid', 'true')

    await page.getByRole('textbox', { name: /full name/i }).fill('Jordan Rivera')
    await expect(page.getByText('Full name is required')).toBeHidden()
  })

  test('dashboard search filters the customer table', async ({ page, isMobile }) => {
    await page.goto('/dashboard')
    const search = page.getByRole('searchbox', { name: 'Search customers' })
    await search.fill('zzz-no-match')
    // Desktop shows the table, mobile shows the card list; each has its own empty state.
    await expect(page.getByText('No matching customers').filter({ visible: true })).toBeVisible()

    await page.getByRole('button', { name: /reset filters/i }).click()
    await expect(search).toHaveValue('')
    if (!isMobile) await expect(page.getByRole('table')).toBeVisible()
  })
})
