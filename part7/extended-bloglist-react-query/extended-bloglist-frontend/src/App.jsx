import { useState, useEffect, useImperativeHandle } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginServices from "./services/login";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import CreateBlogForm from "./components/CreateBlogForm";
import { useNotificationDispatch } from "../NotificationContext";
//import { useBlogsValue, useBlogsDispatch } from "../BlogContext";
import { createContext, useContext, useReducer } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// const useInitBlogs = () => {
//   const blogs = useBlogsValue()
//   const blogDispatch = useBlogsDispatch()

//   const result = useQuery({
//     queryKey: ["blogs"],
//     queryFn: blogService.getAll,
//     initialData: [],
//   });

//   if (result.data) {
//     blogDispatch({ type: "SET", payload: result.data })
//   }

//   return {blogs, blogDispatch}
// }

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient()

  //const {blogs, blogDispatch} = useInitBlogs() 

  const notificationDispatch = useNotificationDispatch();
  const newBlogMutation = useMutation({ 
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  const setNotification = (content, time) => {
    notificationDispatch({ type: "SET", payload: content });
    setTimeout(() => {
      notificationDispatch({ type: "RESET" });
    }, time * 1000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });

      setNotification(`Welcome ${user.name}`, 5);

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotification("tried to log in with wrong credentials", 5);
      console.log("Wrong credentials");
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {

      //blogObject.user = user

      newBlogMutation.mutate( blogObject )
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} was added`,
        5,
      );
    } catch (error) {
      console.log("error adding blog: ", error);

      setNotification(`Error occured: ${error.response.data.message}`, 5);
    }
  };

  const addLike = async (blogObject, id) => {
    try {
      await blogService.updateBlog(blogObject, id);
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: blogObject.likes } : blog,
      );
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id);
      const newBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(newBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const loginForm = () => (
    <form data-testid="login-form" onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="text"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">log in</button>
    </form>
  );

  const createBlogForm = () => (
    <Togglable buttonLable="create a new blog">
      <CreateBlogForm createBlog={addBlog} user={user} />
    </Togglable>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} is logged in{" "}
            <button onClick={handleLogout}> log out </button>{" "}
          </p>
          {createBlogForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id || blog.title}
              blog={blog}
              updateBlog={addLike}
              user={user}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
