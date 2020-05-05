// Model imports
const Post = require('../models/Post')

// Actions
module.exports = {
  createPost: async (req, res) => {
    const { title, content, image = '' } = req.validated.body
    const user = req.user

    const newPost = new Post({ title, content, image })

    user.posts.push(newPost)
    await user.save()

    newPost.author = user
    await newPost.save()

    res.status(201).json(newPost)
  },

  uploadImageForPost: async (req, res) => {
    const { path } = req.file || { path: '' }

    if (!path) {
      return res.sendStatus(422)
    }

    res.status(201).json({ path })
  },

  editPostById: async (req, res) => {
    const { postId } = req.validated.params
    const newPostData = req.validated.body
    const user = req.user
    const post = await Post.findById(postId)

    if (!post) {
      return res.sendStatus(404)
    }

    if (user._id.toString() === post.author.toString()) {
      const newPost = await Post.findByIdAndUpdate(postId, newPostData, { new: true })
      return res.status(200).json(newPost)
    }

    res.sendStatus(403)
  },

  deletePostById: async (req, res) => {
    const { postId } = req.validated.params
    const user = req.user
    const post = await Post.findById(postId)

    if (!post) {
      return res.sendStatus(404)
    }

    if (user._id.toString() === post.author.toString()) {
      await post.remove()
      user.posts = user.posts.filter(p => p.toString() !== post._id.toString())
      await user.save()
      return res.sendStatus(200)
    }

    res.sendStatus(403)
  },

  addCommentToPostWithId: async (req, res) => {
    const { content } = req.validated.body
    const { postId } = req.validated.params
    const user = req.user
    const post = await Post.findById(postId)

    if (!post) {
      return res.sendStatus(404)
    }

    const comment = {
      content,
      author: user
    }

    post.comments.push(comment)
    await post.save()

    res.status(201).json(comment)
  },

  deleteCommentFromPostWithId: async (req, res) => {
    const { postId, commentId } = req.validated.params
    const user = req.user
    const post = await Post.findById(postId)

    if (!post) {
      return res.sendStatus(404)
    }

    const comment = post.comments.find(c => c._id.toString() === commentId)

    if (!comment) {
      return res.sendStatus(404)
    }

    if (user._id.toString() === comment.author.toString() || user._id.toString() === post.author.toString()) {
      post.comments = post.comments.filter(c => c !== comment)
      await post.save()
      return res.sendStatus(200)
    }

    res.sendStatus(403)
  },

  getFeed: async (req, res) => {
    const user = req.user
    const posts = []

    const allPosts = await Post.find({}, null, { sort: { date: -1 } })
      .populate('author', { firstName: 1, lastName: 1, avatar: 1, email: 1 })

    allPosts.forEach(p => {
      const isFeedPost = !!user.followings.find(f => f._id.toString() === p.author._id.toString())
        || user._id.toString() === p.author._id.toString() // Is it my or my followers's post

      if (isFeedPost) {
        posts.push(p)
      }
    })

    res.json(posts)
  }
}