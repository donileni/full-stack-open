import "./index.css";
import { useEffect } from "react";
import blogService from "./services/blogs";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import { useUserDispatch, useUserValue } from "./UserContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const App = () => {
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

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div>
        {user === null ? (
          <div>
            <h2>blogs</h2>
            <LoginForm />
          </div>
        ) : (
          <div>
            <div>
              <Link style={padding} to="/">blogs</Link>
              <Link style={padding} to="/users">users</Link>
              {user.name} is logged in{" "}
              <button onClick={handleLogout}> log out </button>{" "}
              <h2>blogs</h2>
            </div>
            <Notification />
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/blogs/:id" element={<Blog />} />
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
