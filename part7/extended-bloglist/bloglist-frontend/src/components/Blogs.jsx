import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  console.log("blogs: ", blogs);
  const user = useSelector((state) => state.user);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id || blog.title} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default Blogs;
