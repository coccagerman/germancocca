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
    await expect(
        page.getByRole('heading', { name: 'My articles, notes, and handbooks on software engineering.' })
    ).toBeVisible()
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

test('blog cards show thumbnails and centered pagination controls work', async ({ page }) => {
    await page.goto('/blog')

    await expect(page.locator('article img[alt$="cover image"]').first()).toBeVisible()

    const pagination = page.getByRole('navigation', { name: 'Pagination' })
    await expect(pagination).toBeVisible()
    await expect(pagination.getByLabel('Go to first page')).toBeVisible()
    await expect(pagination.getByLabel('Go to previous page')).toBeVisible()

    await pagination.getByLabel('Go to next page').click()
    await expect(page).toHaveURL(/\/blog\?page=2/)

    await expect(page.getByRole('navigation', { name: 'Pagination' }).getByLabel('Go to last page')).toBeVisible()

    await page.getByRole('navigation', { name: 'Pagination' }).getByLabel('Go to last page').click()
    await expect(page).toHaveURL(/page=6/)
})

test('journey focus card stays pinned while timeline entries keep scrolling', async ({ page }) => {
    await page.goto('/')

    const journeySection = page.locator('#my-journey')
    const focusCard = page.getByTestId('journey-focus-card')
    const activeEntry = page.locator('[data-testid="journey-entry"][aria-current="step"]')

    await journeySection.scrollIntoViewIfNeeded()
    await expect(focusCard).toBeVisible()

    await expect
        .poll(
            async () => {
                const activeIndex = Number(await activeEntry.getAttribute('data-index'))

                if (activeIndex < 4) {
                    await page.mouse.wheel(0, 260)
                }

                return activeIndex
            },
            { timeout: 8000 }
        )
        .toBeGreaterThanOrEqual(4)

    const focusCardBox = await focusCard.boundingBox()

    expect(focusCardBox).not.toBeNull()
    expect(focusCardBox?.y ?? -1).toBeGreaterThanOrEqual(0)
    expect((focusCardBox?.y ?? 0) + (focusCardBox?.height ?? Number.POSITIVE_INFINITY)).toBeLessThanOrEqual(
        page.viewportSize()?.height ?? 0
    )
})
