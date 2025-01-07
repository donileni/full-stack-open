import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { useUserValue } from "../UserContext";
import { useNotificationDispatch } from "../../NotificationContext";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  
  const user = useUserValue();
  const notificationDispatch = useNotificationDispatch();

  const setNotification = (content, time) => {
    notificationDispatch({ type: "SET", payload: content });
    setTimeout(() => {
      notificationDispatch({ type: "RESET" });
    }, time * 1000);
  };

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user,
    };

    try {
      newBlogMutation.mutate(newBlog);
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} was added`,
        5,
      );
    } catch (error) {
      console.log("error adding blog: ", error);
      setNotification(`Error occured: ${error.response.data.message}`, 5);
    }

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
