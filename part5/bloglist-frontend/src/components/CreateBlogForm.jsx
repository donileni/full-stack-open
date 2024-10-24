import { useState } from 'react'

const CreateBlogForm = ( { createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
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
                    type='text'
                    value={title}
                    name='title'
                    onChange={( {target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input 
                    type='text'
                    value={author}
                    name='author'
                    onChange={( {target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input 
                    type='text'
                    value={url}
                    name='url'
                    onChange={( {target }) => setUrl(target.value)}
                    />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm