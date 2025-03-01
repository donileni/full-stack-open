import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import loginServices from "./services/login";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import CreateBlogForm from "./components/CreateBlogForm";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUserState } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUserState(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });

      dispatch(setNotification(`Welcome ${user.name}`, 5));

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(setUserState(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification("tried to log in with wrong credentials"));
      console.log("Wrong credentials");
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    window.localStorage.clear();
    dispatch(setUserState(null));
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
      <CreateBlogForm user={user} />
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
          <Blogs />
        </div>
      )}
    </div>
  );
};

export default App;
