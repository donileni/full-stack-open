import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none': ''}
  const showWhenVisible = { display: visible ? '': 'none'}

  const handleVisible = () => {
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()

    console.log('blog: ', blog)

    updateBlog({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
  }

  return (
    <div>
      <div style={{...blogStyle, ...hideWhenVisible}}>
        {blog.title} {blog.author}
        <button onClick={handleVisible}>view</button>
      </div>
      <div style={{...blogStyle, ...showWhenVisible}}>
        <div>{blog.title} {blog.author} <button onClick={handleVisible}>hide</button></div>
        
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={addLike}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>

  )
}
  


export default Blog