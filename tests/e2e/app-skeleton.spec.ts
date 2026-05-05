import { expect, test } from '@playwright/test'

test('main routes render and navigation works', async ({ page }) => {
    await page.goto('/')
    const primaryNav = page.getByRole('navigation', { name: 'Primary' })

    await expect(page.getByRole('heading', { name: 'Germán Cocca' })).toBeVisible()
    await expect(primaryNav.getByRole('link', { name: 'Projects' })).toBeVisible()

    await primaryNav.getByRole('link', { name: 'Projects' }).click()
    await expect(page).toHaveURL(/\/projects$/)
    await expect(page.getByRole('heading', { name: 'Selected projects will live here.' })).toBeVisible()

    await primaryNav.getByRole('link', { name: 'Blog' }).click()
    await expect(page).toHaveURL(/\/blog$/)
    await expect(page.getByRole('heading', { name: 'Articles will be listed here.' })).toBeVisible()

    await page.getByRole('link', { name: 'Open post placeholder' }).first().click()
    await expect(page).toHaveURL(/\/blog\/post-placeholder$/)
    await expect(page.getByRole('heading', { name: 'Post in progress' })).toBeVisible()

    await primaryNav.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page.getByText('coccagerman@gmail.com')).toBeVisible()
})
