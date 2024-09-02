const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const supertest = require("supertest");
const helper = require("./test_helper")
const app = require("../app");
const assert = require("node:assert");
const blog = require("../models/blog");

const api = supertest(app);

describe("blog api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs)
  });

  describe("testing exsisting blogs", () => {
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
  })

  describe("adding a new blog", () => {
    test("a valid blog can be added", async () => {
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
  
    test("note without likes equals zero", async () => {
      const newBlog = {
        "title": "Test blog witout likes",
        "author": "test author", 
        "url": "www.test-url.com",
      }
  
      await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
    })
  
    test("blog without title fails", async () => {
      const newBlog = {
        "author": "test author", 
        "url": "www.test-url.com",
        "likes": 100
      }
      await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    })
  
    test("blog without url fails", async () => {
      const newBlog = {
        "title": "blablbla",
        "author": "test author", 
        "likes": 100
      }
      await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    })
  })


  describe("deleting blogs", () => {
    test("succeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  
    })
  })

  describe("updating blogs", () => {
    test("succeds with status code 204 if valid id", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        "title": "Go To Statement Considered Harmful",
        "author": "Edsger W. Dijkstra", 
        "url": "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        "likes": 20000
      }

      await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.notStrictEqual(blogsAtEnd[0].likes, helper.initialBlogs[0].likes)
    })
  })

})

after(async () => {
  await mongoose.connection.close();
})
