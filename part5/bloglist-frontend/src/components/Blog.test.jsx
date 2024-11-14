import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('only renders title and author by default', () => {
    const blog = {
        title: 'test title',
        author: 'ada',
        url: 'https//:test.com',
        likes: 0,
        user: {
            username: 'david',
            name: 'David Olsson',
            id: '671e131abcdbd7c7a4295670',
        }
    }

    const user = {
        username: 'david',
        name: 'David Olsson',
        id: '671e131abcdbd7c7a4295670',
    }

    const { container } = render(<Blog blog={blog} user={user} />)

    const defaultDiv = container.querySelector('.defaultBlog')
    
    expect(defaultDiv).toHaveTextContent('test title ada')

})

test('render extended content when button is clicked', async () => {
    const blog = {
        title: 'test title',
        author: 'ada',
        url: 'https//:test.com',
        likes: 0,
        user: {
            username: 'david',
            name: 'David Olsson',
            id: '671e131abcdbd7c7a4295670',
        }
    }

    const user = {
        username: 'david',
        name: 'David Olsson',
        id: '671e131abcdbd7c7a4295670',
    }

    const { container } = render(<Blog blog={blog} user={user} />)

    const exampleUser = userEvent.setup()
    const button = screen.getByText('view')
    await exampleUser.click(button)

    const url = container.querySelector('.extended-url')
    console.log('url', url)
    const likes = container.querySelector('.extended-likes')

    expect(url).toHaveTextContent('https//:test.com')
    expect(likes).toHaveTextContent('0')

})