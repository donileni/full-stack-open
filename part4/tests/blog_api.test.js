const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const supertest = require("supertest");
const helper = require("./test_helper")
const app = require("../app");
const assert = require("node:assert");

const api = supertest(app);

describe("blog api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  test("correct amount of blogs in JSON", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("blog got id parameter", async () => {
    const response = await api.get("/api/blogs")

    const blogs = response.body.map(blog => blog)

    blogs.forEach(blog => {
      assert(blog.id)
    })
  });

  test("a valid blog can be addded", async () => {
    const newBlog = {
      "title": "Test blog x",
      "author": "test author", 
      "url": "www.test-url.com",
      "likes": 100
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes("Test blog x"))

  })

});
