import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginServices.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      await blogService.createBlog(newBlog)

    } catch (error) {
      console.log('error adding blog: ', error)
    }

    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  const loginForm = () => (   
  <form onSubmit={handleLogin}>
    <div>
      username
      <input 
      type='text'
      value={username}
      name='username'
      onChange={( {target} ) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input 
      type='text'
      value={password}
      name='password'
      onChange={( {target }) => setPassword(target.value)}
      />
    </div>
    <button type='submit'>log in</button>
  </form>
  )

  const createBlogForm = () => (
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
  )

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? 
      loginForm() : 
      <div>
        <p>{user.name} is logged in <button onClick={handleLogout}> log out </button> </p>
        <h2>create new blog</h2>
        {createBlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id || blog.title} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App