import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('calls event handler with right details', async () => {
    const createBlog = vi.fn()
    const exampleUser = userEvent.setup()

    const user = {
        username: 'david',
        name: 'David Olsson',
        id: '671e131abcdbd7c7a4295670',
    }

    render(<CreateBlogForm user={user} createBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await exampleUser.type(inputs[0], 'test title')
    await exampleUser.type(inputs[1], 'test author')
    await exampleUser.type(inputs[2], 'test url')

    await exampleUser.click(sendButton)

    console.log('test: ', createBlog.mock.calls)
    console.log('test2: ', createBlog.mock.calls[0][0])

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test title')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('test url')
})