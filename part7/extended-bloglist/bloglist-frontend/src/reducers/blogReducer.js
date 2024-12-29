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

    }, 
    deleteBlog(state, action) {
      
    }
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

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
    dispatch(setBlogs(blogs))
  };
};

export default blogSlice.reducer;
