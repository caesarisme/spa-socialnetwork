const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')
const config = require('config')

// Model imports
const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')

const { issueToken } = require('../helpers/jwt.helpers')

// Actions
module.exports = {
  register: async (req, res) => {
    const { email, password, firstName, lastName } = req.validated.body

    const newUser = new User({
      email,
      password: bcrypt.hashSync(password, 10),
      firstName,
      lastName
    })
    await newUser.save()

    res.sendStatus(201)
  },

  login: async (req, res) => {
    const { email, password } = req.validated.body
    const candidate = await User.findOne({ email })
    if (candidate && bcrypt.compareSync(password, candidate.password)) {
      const { _id: sub } = candidate
      const accessToken = issueToken({ sub }, { expiresIn: config.get('ACCESS_TOKEN_EXP') })
      const refreshToken = uuid()

      await (new RefreshToken({ sub, token: refreshToken })).save()

      return res.status(200).json({ accessToken, refreshToken })
    }

    res.sendStatus(403)
  },

  refresh: async (req, res) => {
    const { refreshToken } = req.validated.body
    const dbToken = await RefreshToken.findOne({ token: refreshToken })

    if (dbToken) {
      await dbToken.remove()
      const { _id: sub } = await User.findById(dbToken.sub)

      const accessToken = issueToken({ sub }, { expiresIn: config.get('ACCESS_TOKEN_EXP') })
      const refreshToken = uuid()

      await (new RefreshToken({ sub, token: refreshToken })).save()

      return res.status(200).json({ accessToken, refreshToken })
    }

    res.sendStatus(403)
  },

  logout: async (req, res) => {
    const { _id: sub } = req.user
    await RefreshToken.deleteMany({ sub })
    res.sendStatus(200)
  },

  followById: async (req, res) => {
    const follower = req.user
    const { followingId } = req.params
    const following = await User.findById(followingId)

    if (!following) {
      return res.sendStatus(404)
    }

    if (following._id.toString() === follower._id.toString()) { // Can not follow to himself
      return res.sendStatus(400)
    }

    if (following.followers.find(f => f._id.toString() === follower._id.toString())
      || follower.followings.find(f => f._id.toString() === following._id.toString())) {
      return res.sendStatus(400)
    }

    follower.followings.push(following)
    await follower.save()

    following.followers.push(follower)
    await following.save()

    res.sendStatus(201)
  },

  unfollowById: async (req, res) => {
    const me = req.user
    const { followingId: hisId } = req.params
    const he = await User.findById(hisId)

    console.log(`${me.firstName} unfollows from ${ he.firstName }`)

    if (!he) {
      return res.sendStatus(404)
    }

    if (he._id.toString() === me._id.toString()) { // Can not follow to himself
      return res.sendStatus(400)
    }

    if (!he.followers.find(f => f._id.toString() === me._id.toString())
      || !me.followings.find(f => f._id.toString() === he._id.toString())) {
      return res.sendStatus(400)
    }

    me.followings = me.followings.filter(f => f._id.toString() !== he._id.toString())
    await me.save()

    he.followers = he.followings.filter(f => f._id.toString() !== me._id.toString())
    await he.save()

    res.sendStatus(201)
  },

  postAvatar: async (req, res) => {
    const user = req.user
    const { path: filePath } = req.file

    user.avatar = filePath
    await user.save()

    res.status(201).json({ path: `/${filePath}` })
  },

  getCurrentUser: async (req, res) => {
    const user = req.user

    const userData = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      followings: user.followings,
      followers: user.followers,
      posts: user.posts
    }

    res.status(200).json(userData)
  },

  editCurrentUser: async (req, res) => {
    const user = req.user
    const { firstName, lastName, avatar } = req.body

    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.avatar = avatar || user.avatar
    await user.save()

    res.sendStatus(200)
  },

  getCurrentUserFollowers: async (req, res) => {
    const user = req.user
    const { _id: userId } = user
    const { followers } = await User.findById(userId, { followers: 1 }).populate('followers', '-password')

    res.status(200).json(followers)
  },

  getCurrentUserFollowings: async (req, res) => {
    const user = req.user
    const { _id: userId } = user
    const { followings } = await User.findById(userId, { followings: 1 }).populate('followings', '-password')

    res.status(200).json(followings)
  },

  getUserById: async (req, res) => {
    const { userId } = req.validated.params
    const user = await User.findById(userId, '-password')
      .populate({ path: 'posts', options: { sort: { date: -1 } }})
      .populate({path: 'posts', populate: { path: 'author' }})
      .populate({path: 'posts', populate: { path: 'comments.author' }})

    res.status(200).json(user)
  },

  searchByEmail: async (req, res) => {
    const { email } = req.validated.params
    const user = await User.findOne({ email }, '-password')

    res.status(200).json(user)
  }
}