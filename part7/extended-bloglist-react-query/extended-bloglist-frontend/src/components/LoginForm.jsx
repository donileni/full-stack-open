import "../index.css";
import loginServices from "../services/login";
import blogService from "../services/blogs";
import { useUserDispatch } from "../UserContext";
import { useNotificationDispatch } from "../../NotificationContext";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();

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

  return (
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
};

export default LoginForm;
