const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'David Olsson',
                username: 'david',
                password: '123'
            }
        })

        await page.goto('http://localhost:5173/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(await page.getByTestId('login-form')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'david', '123')

            await expect(page.getByText('David Olsson is logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'david', 'wrong')

            const errorDiv = await page.locator('.error')

            await expect(errorDiv).toHaveText('tried to log in with wrong credentials')
            await expect(page.getByText('David Olsson is logged in')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'david', '123')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'test title', 'test author', 'test url')
            await expect(page.getByText('test title test author')).toBeVisible()
        })

        test('Blog can be liked', async ({ page }) => {
            await createBlog(page, 'blog to be liked', 'test author', 'test url')

            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('Blog can be deleted', async ({ page }) => {
            page.on('dialog', dialog => dialog.accept())
            await createBlog(page, 'test title', 'test author', 'test url')
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'remove'}).click()

            await expect(page.getByText('test title test author')).not.toBeVisible()
        })
    })
})