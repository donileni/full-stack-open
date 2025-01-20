import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { useUserValue } from "../UserContext";
import { useNotificationDispatch } from "../../NotificationContext";
import { Form, Button } from "react-bootstrap";

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
    <div style={{paddingTop: 5}}>
      <h2>Create a new blog</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control 
            data-testid="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control 
            data-testid="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url</Form.Label>
          <Form.Control 
            data-testid="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <div style={{paddingTop: 5, paddingBottom: 5}}>
        <Button variant="primary" type="submit">
          create
        </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateBlogForm;
