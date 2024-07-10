const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { create } = require('domain')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: { 
        username: 'root',
        password: 'pwd1234',
        name: 'rootuser'
      }
    })
    await request.post('/api/users', {
      data: { 
        username: 'fake',
        password: 'fake1234',
        name: 'fakeuser'
      }
    })
    
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()

  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'pwd1234')

      await expect(page.getByText('rootuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrongpassword')

      await expect(page.getByText('Wrong credentials')).toBeVisible()
      await expect(page.getByText('rootuser logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'pwd1234')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')

      await expect(page.getByText('test title test author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'blog to be liked', 'test author', 'test url')

      const blog = await page.getByText('blog to be liked test author')

      await blog.getByRole('button', { name: 'view' }).click()
      const like = await page.getByText('Likes 0')
      await like.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('Likes 1')).toBeVisible()
    })

    test('the user who added the blog can delete the blog', async ({ page }) => {
      await createBlog(page, 'blog to be deleted', 'test author', 'test url')

      const blog = await page.getByText('blog to be deleted test author')

      await blog.getByRole('button', { name: 'view' }).click()
      const blog2 = await page.getByText('User rootuser')
      await expect(blog2.getByRole('button', { name: 'remove' })).toBeVisible()

      page.on('dialog', async (dialog) => await dialog.accept())
      await blog2.getByRole('button', { name: 'remove' }).click()

      await page.goto('/')

      

      await expect(page.getByText('blog to be deleted test author')).not.toBeVisible()
    })

    test('only the user who added the blog can see the blogs delete button', async ({ page }) => {
      await createBlog(page, 'blog to be deleted', 'test author', 'test url')

      
      const blog = await page.getByText('blog to be deleted test author')

      await blog.getByRole('button', { name: 'view' }).click()
      const blog2 = await page.getByText('User rootuser')
      await expect(blog2.getByRole('button', { name: 'remove' })).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()

      await loginWith(page, 'fake', 'fake1234')
      await expect(page.getByText('blog to be deleted test author')).not.toBeVisible()
    })


  })

})