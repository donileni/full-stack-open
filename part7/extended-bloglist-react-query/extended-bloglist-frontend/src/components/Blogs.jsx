import Blog from "./Blog";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs"

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

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id || blog.title} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs