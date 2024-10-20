import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginServices.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('Wrong credentials')
    }
    

  }

  if (user === null) {
    return(
      <div>
        <h2>login to application</h2>
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
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App