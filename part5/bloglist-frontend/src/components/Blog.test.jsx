import { render, screen } from '@testing-library/react'
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