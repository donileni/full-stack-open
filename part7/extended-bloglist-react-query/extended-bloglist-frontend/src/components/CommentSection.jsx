import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import blogService from "../services/blogs";
import { queryClient } from "../main";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";

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
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control 
            data-testid="comment"
            type="text"
            value={comment}
            name="comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </Form.Group>
        <div style={{paddingTop: 5, paddingBottom: 5}} >
          <Button type="submit">
            add comment
          </Button>
        </div>
      </Form>
      <ListGroup>
      {blog.comments.map((comment) => (
        <ListGroupItem key={comment}>{comment}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default CommentSection;
