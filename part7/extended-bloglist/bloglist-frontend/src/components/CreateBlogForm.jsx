import { useState } from "react";
import { createBlog, initializeBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const CreateBlogForm = ({ user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();    

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user,
    };

    try {
      dispatch(setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} was added`,
        5,
      ));
      dispatch(createBlog(blogObject));
    } catch (error) {
      console.log("error adding blog: ", error);
      dispatch(
        setNotification(`Error occured: ${error.response.data.message}`, 5),
      );
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
