import { useState } from 'react'

const CreateBlogForm = ( { createBlog, user }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            user: user
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        data-testid='title'
                        type='text'
                        value={title}
                        name='title'
                        onChange={( { target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        data-testid='author'
                        type='text'
                        value={author}
                        name='author'
                        onChange={( { target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        data-testid='url'
                        type='text'
                        value={url}
                        name='url'
                        onChange={( { target }) => setUrl(target.value)}
                    />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm