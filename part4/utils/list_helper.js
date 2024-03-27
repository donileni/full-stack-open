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
  
  module.exports = {
    dummy, totalLikes
  }