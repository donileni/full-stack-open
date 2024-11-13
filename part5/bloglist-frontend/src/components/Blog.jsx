import { useState } from 'react'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const hideWhenVisible = { display: visible ? 'none': '' }
    const showWhenVisible = { display: visible ? '': 'none' }

    let hideButton

    if (user.username !== blog.user.username) {
        hideButton = { display: 'none' }
    }

    const handleVisible = () => {
        setVisible(!visible)
    }

    const addLike = (event) => {
        event.preventDefault()

        updateBlog({
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }, blog.id)
    }

    const removeBlog = (event) => {
        event.preventDefault()
        if(window.confirm(`remove blog ${blog.title} by ${blog.user.name}`)) {
            deleteBlog(blog.id)
        }
    }

    return (
        <div>
            <div style={{ ...blogStyle, ...hideWhenVisible }} className='defaultBlog'>
                {blog.title} {blog.author}
                <button onClick={handleVisible}>view</button>
            </div>
            <div style={{ ...blogStyle, ...showWhenVisible }} className='extendedBlog'>
                <div>{blog.title} {blog.author} <button onClick={handleVisible}>hide</button></div>

                <div>{blog.url}</div>
                <div>likes {blog.likes} <button onClick={addLike}>like</button></div>
                <div>{blog.user.name}</div>
                <div style={hideButton}> <button onClick={removeBlog}>remove</button></div>
            </div>
        </div>

    )
}



export default Blog