import { useUserValue } from "../UserContext";
import blogService from "../services/blogs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../main";
import { useParams, useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";
import { Button } from "react-bootstrap";


const Blog = () => {
  const user = useUserValue();
  const id = useParams().id;
  const navigate = useNavigate()

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

  const result = useQuery({
    queryKey: ["blog"],
    queryFn: () => blogService.getBlog(id),
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blog = result.data;

  let hideButton;

  if (user.username !== blog.user.username) {
    hideButton = { display: "none" };
  }

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
      deleteBlogMutation.mutate(blog.id);
      navigate("/")
    }
  };

  return (
    <div>
      <h2>{`${blog.title} ${blog.author}`}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {`${blog.likes} likes `} 
        <Button onClick={addLike}>
          like
        </Button>
      </div>
      <div>{`added by ${blog.user.name}`}</div>
      <div style={hideButton}>
        {" "}
        <Button onClick={removeBlog}>
          remove
        </Button>
      </div>
      <CommentSection blog={blog} />
    </div>
  );
};

export default Blog;
