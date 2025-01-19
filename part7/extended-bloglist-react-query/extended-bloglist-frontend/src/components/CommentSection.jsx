import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import blogService from "../services/blogs";
import { queryClient } from "../main";

const CommentSection = ({ blog }) => {
  const [comment, setComment] = useState("");

  const commentOnBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const addComment = async (event) => {
    event.preventDefault();

    try {
      const blogObject = {
        ...blog,
        comments: [...blog.comments, comment],
        user: blog.user.id,
      };
      const id = blog.id;

      commentOnBlogMutation.mutate({ blogObject, id });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          data-testid="comment"
          type="text"
          value={comment}
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
