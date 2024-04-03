const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {

    if (blogs.length === 0) {
        return 0
    }

    const allLikes = blogs.map(x => x.likes) 
    const sum = allLikes.reduce((a,b) => a + b, 0)
    return sum
}

const favouriteBlog = (blogs) => {
    let topBlog = blogs[0]

    blogs.forEach(blog => {
        if (blog.likes > topBlog.likes) {
            topBlog = blog
        }
    });

    return topBlog
}

  module.exports = {
    dummy, totalLikes, favouriteBlog
  }