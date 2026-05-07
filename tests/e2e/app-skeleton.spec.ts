import { expect, test } from '@playwright/test'

test('main routes render and navigation works', async ({ page }) => {
    await page.goto('/')
    const primaryNav = page.getByRole('navigation', { name: 'Primary' })

    await expect(page.getByRole('heading', { name: 'Germán Cocca' })).toBeVisible()
    await expect(primaryNav.getByRole('link', { name: 'Projects' })).toBeVisible()

    await primaryNav.getByRole('link', { name: 'Projects' }).click()
    await expect(page).toHaveURL(/\/projects$/)
    await expect(page.getByRole('heading', { name: /Selected work that shows how I design/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Aggendia' })).toBeVisible()

    await primaryNav.getByRole('link', { name: 'Blog' }).click()
    await expect(page).toHaveURL(/\/blog$/)
    await expect(page.getByRole('heading', { name: 'Articles and handbooks published on freeCodeCamp.' })).toBeVisible()
    await expect(page.getByLabel('Search articles')).toBeVisible()

    const firstArticle = page.getByRole('link', { name: 'Read article' }).first()
    const firstArticleTitle = page.locator('article h2 a').first()
    const expectedTitle = await firstArticleTitle.textContent()

    await firstArticle.click()
    await expect(page).toHaveURL(/\/blog\//)
    await expect(page.getByRole('heading', { name: expectedTitle ?? '' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Originally published on freeCodeCamp' })).toBeVisible()

    await primaryNav.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page.getByText('coccagerman@gmail.com')).toBeVisible()
})

test('blog search updates the URL and filters the list', async ({ page }) => {
    await page.goto('/blog')

    await page.getByLabel('Search articles').fill('nestjs')

    await expect(page).toHaveURL(/\/blog\?q=nestjs/)
    await expect(page.getByRole('heading', { name: /nestjs/i })).toBeVisible()
})
