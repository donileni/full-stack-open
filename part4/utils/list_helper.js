const { formToJSON } = require("axios")
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

const mostBlogs = (blogs) => {

    const authors = blogs.reduce((counter, blog) => {
        counter[blog.author] = ++counter[blog.author] || 1; 
        return counter; 
    }, {})

    const nameOfAuthorWithMostBlogs = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b, {})

    const authorWithMostBlogs = {
        author: nameOfAuthorWithMostBlogs,
        blogs: authors[nameOfAuthorWithMostBlogs]
    }

    return authorWithMostBlogs; 
}

const listWithMultipleBlogs = [
    {
        author: 'Filip Kalle',
        likes: 20,
    },   
    {
        author: 'Edsger W. Dijkstra',
        likes: 5,
    },
    {
        author: 'Edsger W. Dijkstra',
        likes: 20,
    }, 
    {
        author: 'Filip',
        likes: 20,
    },
    {
        author: 'Edsger W. Dijkstra',
        likes: 20,
    }, 
    {
        author: 'anton',
        likes: 20,
    }, 
]

const mostLikes = (blogs) => {
    
    const authors = blogs.reduce((counter, blog) => {
        counter[blog.author] = (counter[blog.author] || 0) + blog.likes
        return counter;
    }, {})

    const nameOfAuthorWithMostLikes = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b, {})

    const authorWithMostLikes = {
        author: nameOfAuthorWithMostLikes,
        likes: authors[nameOfAuthorWithMostLikes]
    } 

    return(authorWithMostLikes)

}


  module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
  }