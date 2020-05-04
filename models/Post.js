const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: { type: Date, default: () => (new Date()) },

  comments: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    content: { type: String, required: true },
    date: { type: Date, default: () => (new Date()) }
  }]
})

module.exports = mongoose.model('post', schema)