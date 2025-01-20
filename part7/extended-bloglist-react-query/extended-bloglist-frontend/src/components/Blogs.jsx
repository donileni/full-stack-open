import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs"
import { Link } from "react-router-dom";
import CreateBlogForm from "./CreateBlogForm";
import Togglable from "./Togglable";
import { Table } from "react-bootstrap";

const Blogs = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  const createBlogForm = () => (
    <Togglable buttonLable="create a new blog">
      <CreateBlogForm />
    </Togglable>
  );

  return (
    <div>
      {createBlogForm()}
      <Table striped>
        <tbody>
          {blogs.map(blog => 
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Blogs