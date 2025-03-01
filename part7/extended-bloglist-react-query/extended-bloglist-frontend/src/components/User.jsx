import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import userService from "../services/users";
import { useParams } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const User = () => {
  const id = useParams().id;

  const userResult = useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getUser(id),
    retry: 1,
  });

  const blogResult = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (blogResult.isLoading || userResult.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = blogResult.data.filter((blog) => blog.user.id === id);

  const user = userResult.data;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs === 0 ? (
        <></>
      ) : (
        <ListGroup>
          {blogs.map((blog) => (
            <ListGroupItem key={blog.id}>{blog.title}</ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default User;
