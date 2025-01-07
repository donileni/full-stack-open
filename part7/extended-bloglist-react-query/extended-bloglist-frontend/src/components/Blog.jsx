import { useState } from "react";
import { useUserValue } from "../UserContext";
import blogService from "../services/blogs";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const user = useUserValue();

  const likeBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  let hideButton;

  if (user.username !== blog.user.username) {
    hideButton = { display: "none" };
  }

  const handleVisible = () => {
    setVisible(!visible);
  };

  const addLike = async (event) => {
    event.preventDefault();
    try {
      const blogObject = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
      const id = blog.id;

      likeBlogMutation.mutate({ blogObject, id });
    } catch (error) {
      console.log(error);
    }
  };

  const removeBlog = (event) => {
    event.preventDefault();
    if (window.confirm(`remove blog ${blog.title} by ${blog.user.name}`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  };

  if (!visible) {
    return (
      <div style={{ ...blogStyle, ...hideWhenVisible }} className="defaultBlog">
        {blog.title} {blog.author}
        <button onClick={handleVisible}>view</button>
      </div>
    );
  } else {
    return (
      <div
        style={{ ...blogStyle, ...showWhenVisible }}
        className="extendedBlog"
      >
        <div className="extended-title-author">
          {blog.title} {blog.author}{" "}
          <button onClick={handleVisible}>hide</button>
        </div>
        <div className="extended-url">{blog.url}</div>
        <div className="extended-likes">
          likes {blog.likes} <button onClick={addLike}>like</button>
        </div>
        <div className="extended-name">{blog.user.name}</div>
        <div style={hideButton}>
          {" "}
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    );
  }
};

export default Blog;
