const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png' },

  followings: [{ // Подписки
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],

  followers: [{ // Подписчики
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],

  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }],
})

module.exports = mongoose.model('user', schema)
