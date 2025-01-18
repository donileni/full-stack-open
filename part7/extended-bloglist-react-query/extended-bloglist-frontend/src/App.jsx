import "./index.css";
import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginServices from "./services/login";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import CreateBlogForm from "./components/CreateBlogForm";
import { useNotificationDispatch } from "../NotificationContext";
import { useUserDispatch, useUserValue } from "./UserContext";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const user = useUserValue();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SET_USER", payload: user });
      blogService.setToken(user.token);
    }
  }, []);

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
      userDispatch({ type: "SET_USER", payload: user });
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
    userDispatch({ type: "RESET_USER" });
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
      <CreateBlogForm />
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
