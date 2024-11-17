const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')
const { name } = require('../playwright.config')
const { log } = require('console')

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

        test('A new blog can be created', async ({ page }) => {
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

    describe('New user login', () => {
        beforeEach(async ({ request }) => {
            await request.post('http://localhost:3003/api/users', {
                data: {
                    name: 'Test user',
                    username: 'test',
                    password: '123'
                }
            })
        })
        test('only authorized user sees delete button', async ({ page }) => {
            await loginWith(page, 'david', '123')
            await createBlog(page, 'test title', 'test author', 'test url')
            await page.getByRole('button', { name: 'log out' }).click()

            await loginWith(page, 'test', '123')
            await page.getByRole('button', { name: 'view' }).click()
            
            await expect(page.getByText('remove')).not.toBeVisible()
        })
    })

    describe('More than one blog exists', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'david', '123')
            await createBlog(page, 'first blog', 'test author', 'test url')
            await page.getByRole('button', { name: 'cancel '}).click()
            await createBlog(page, 'second blog', 'test author', 'test url')
        })

        test('Blogs are arranged in order of likes', async ({ page }) => {
            const firstBlog = await page.locator('.defaultBlog').first()

            await firstBlog.getByRole('button', { name: 'view '}).click()
            await likeBlog(page, 1)
            await page.getByRole('button', { name: 'hide' }).click()

            const secondBlog = await page.locator('.defaultBlog').last()
            await secondBlog.getByRole('button', { name: 'view '}).click()
            await likeBlog(page, 2)
            await page.getByRole('button', { name: 'hide' }).click()

            const newFirstBlog = await page.locator('.defaultBlog').first()

            await expect(newFirstBlog.getByText('second blog')).toBeVisible()

        })
    })
})