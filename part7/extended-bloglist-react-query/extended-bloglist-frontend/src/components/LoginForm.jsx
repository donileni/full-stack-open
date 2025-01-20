import "../index.css";
import loginServices from "../services/login";
import blogService from "../services/blogs";
import { useUserDispatch } from "../UserContext";
import { useNotificationDispatch } from "../../NotificationContext";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
    <Form data-testid="login-form" onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control 
          data-testid="username"
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password</Form.Label>
        <Form.Control 
          data-testid="password"
          type="text"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <div style={{paddingTop: 5}}>
        <Button variant="primary" type="submit">
          login
        </Button>
      </div>

    </Form>
  );
};

export default LoginForm;
