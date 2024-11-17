import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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
            setNotification('tried to log in with wrong credentials')
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

    const addBlog = async (blogObject) => {
        try {
            const newBlog = await blogService.createBlog(blogObject)
            newBlog.user = user

            setNotification(`a new blog ${blogObject.title} by ${blogObject.author} was added`)
            setBlogs(blogs.concat(newBlog))

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
    }

    const addLike = async (blogObject, id) => {
        try {
            await blogService.updateBlog(blogObject, id)
            const newBlogs = blogs.map(blog => blog.id === id ? { ...blog, likes: blogObject.likes } : blog)
            setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))

        } catch (error) {
            console.log(error)
        }
    }

    const deleteBlog = async (id) => {
        try {
            await blogService.deleteBlog(id)
            const newBlogs = blogs.filter(blog => blog.id !== id)
            setBlogs(newBlogs)
        } catch (error) {
            console.log(error)
        }
    }

    const loginForm = () => (
        <form data-testid='login-form' onSubmit={handleLogin}>
            <div>
      username
                <input
                    type='text'
                    value={username}
                    name='username'
                    onChange={( { target } ) => setUsername(target.value)}
                />
            </div>
            <div>
      password
                <input
                    type='text'
                    value={password}
                    name='password'
                    onChange={( { target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>log in</button>
        </form>
    )

    const createBlogForm = () => (
        <Togglable buttonLable='create a new blog'>
            <CreateBlogForm createBlog={addBlog} user={user}/>
        </Togglable>
    )

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={notification} />
            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} is logged in <button onClick={handleLogout}> log out </button> </p>
                    {createBlogForm()}
                    {blogs.map(blog =>
                        <Blog key={blog.id || blog.title} blog={blog} updateBlog={addLike} user={user} deleteBlog={deleteBlog} />
                    )}
                </div>
            }
        </div>
    )
}

export default App