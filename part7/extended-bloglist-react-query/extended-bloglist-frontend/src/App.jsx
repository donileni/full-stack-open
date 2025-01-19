import "./index.css";
import { useEffect } from "react";
import blogService from "./services/blogs";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Users from "./components/Users"
import User from "./components/User";
import { useNotificationDispatch } from "../NotificationContext";
import { useUserDispatch, useUserValue } from "./UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

  const handleLogout = async (event) => {
    event.preventDefault();

    window.localStorage.clear();
    userDispatch({ type: "RESET_USER" });
  };

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
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs/:id" element={<Blog />}/>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      )}
    </div>
    </Router>
  );
};

export default App;
