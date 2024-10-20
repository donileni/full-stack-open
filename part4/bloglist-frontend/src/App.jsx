import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

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

      setNotification(`Welcome ${user.name}`)

      setTimeout(() => {
        setNotification(null)
      }, 5000)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification(`tried to log in with wrong credentials`)
      console.log('Wrong credentials')

      setTimeout(() => {
        setNotification(null)
      }, 5000)

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
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} was added`)

      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (error) {
      console.log('error adding blog: ', error)

      setNotification(`Error occured: ${error.response.data.message}`)

      setTimeout(() => {
        setNotification(null)
      }, 5000)

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
      <Notification message={notification} />
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