import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    addLike(state, action) {
      const id = action.payload;
      const blogToChange = state.find((blog) => blog.id === id);
      const updatedBlog = { ...blogToChange, likes: blogToChange.likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    deleteBlogFromState(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, addBlog, addLike, deleteBlogFromState } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blogObject);
    dispatch(addBlog(newBlog));
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (blogObject, id) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blogObject,
      user: blogObject.user.id,
      likes: blogObject.likes + 1,
    };
    await blogService.updateBlog(updatedBlog, id);
    dispatch(addLike(id));
    dispatch(initializeBlogs());
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlogFromState(id));
  };
};

export default blogSlice.reducer;
