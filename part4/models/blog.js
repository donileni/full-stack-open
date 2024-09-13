const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

blogSchema.set('toJSON', {
  transform: (document, returnedObjec) => {
    returnedObjec.id = returnedObjec._id.toString()
    delete returnedObjec._id
    delete returnedObjec.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)