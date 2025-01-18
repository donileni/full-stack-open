import "./index.css";
import { useEffect } from "react";
import blogService from "./services/blogs";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import CreateBlogForm from "./components/CreateBlogForm";
import Users from "./components/Users"
import { useNotificationDispatch } from "../NotificationContext";
import { useUserDispatch, useUserValue } from "./UserContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const App = () => {
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

  const handleLogout = async (event) => {
    event.preventDefault();

    window.localStorage.clear();
    userDispatch({ type: "RESET_USER" });
  };

  const createBlogForm = () => (
    <Togglable buttonLable="create a new blog">
      <CreateBlogForm />
    </Togglable>
  );

  return (
    <Router>
      <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>{user.name} is logged in{" "}</p>
          <p><button onClick={handleLogout}> log out </button>{" "}</p>
          
          <Routes>
            <Route path="/users" element={<Users />} />
          </Routes>

        </div>
      )}
    </div>
    </Router>
  );
};

export default App;
