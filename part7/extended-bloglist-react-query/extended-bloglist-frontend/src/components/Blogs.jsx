import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs"
import { Link } from "react-router-dom";

const Blogs = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={{...blogStyle}}> <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author} </Link></div>
      ))}
    </div>
  );
};

export default Blogs