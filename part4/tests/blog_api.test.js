const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const supertest = require("supertest");
const helper = require("./test_helper")
const app = require("../app");
const assert = require("node:assert");
const blog = require("../models/blog");
const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

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

    beforeEach(async () => {
      await User.deleteMany()
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
  
    })
    
    test("a valid blog can be added", async () => {
      const user = await User.findOne({ username: 'root' })

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      const newBlog = {
        "title": "Test blog x",
        "author": "test author", 
        "url": "www.test-url.com",
        "likes": 100
      }
  
      await api
        .post("/api/blogs")
        .set({ Authorization: token })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
      
      const titles = blogsAtEnd.map(blog => blog.title)
      assert(titles.includes("Test blog x"))
  
    })
  
    test("note without likes equals zero", async () => {
      const user = await User.findOne({ username: 'root' })

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.SECRET)


      const newBlog = {
        "title": "Test blog witout likes",
        "author": "test author", 
        "url": "www.test-url.com",
      }
  
      await api
      .post("/api/blogs")
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
    })
  
    test("blog without title fails", async () => {

      const user = await User.findOne({ username: 'root' })

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      const newBlog = {
        "author": "test author", 
        "url": "www.test-url.com",
        "likes": 100
      }
      await api
      .post("/api/blogs")
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    })
  
    test("blog without url fails", async () => {

      const user = await User.findOne({ username: 'root' })

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      const newBlog = {
        "title": "blablbla",
        "author": "test author", 
        "likes": 100
      }
      await api
      .post("/api/blogs")
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    })
  })


  describe("deleting blogs", () => {

    beforeEach(async () => {
      await User.deleteMany()
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()

    })

    test("succeds with status code 204 if id is valid", async () => {

      const user = await User.findOne({ username: 'root' })

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      const newBlog = {
        "title": "Test blog x",
        "author": "test author", 
        "url": "www.test-url.com",
        "likes": 100
      }
  
      const response = await api
        .post("/api/blogs")
        .set({ Authorization: token })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      await api
      .delete(`/api/blogs/${response._body.id}`)
      .set({ Authorization: token })
      .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  
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

describe("when there's initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany()

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'David',
      name: 'David Olsson',
      password: '123',
    }


    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('creating fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Root Mac Rooter',
      password: '123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creating fails when username is less than three characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'do',
      name: 'David Olsson',
      password: '123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes('`username` (`do`) is shorter than the minimum allowed length (3)'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  
  test('creating fails when username does not exist', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'David Olsson',
      password: '123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('`username` is required.'))

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('creating fails when password does not exist or is not specified', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'david',
      name: 'David Olsson',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password must exist'))

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('creating fails when password is shorter than three characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'david',
      name: 'David Olsson',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password must be longer than three characters'))

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })


})

after(async () => {
  await mongoose.connection.close();
})
