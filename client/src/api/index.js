import axios from "axios"

const baseURL = '/api'

export default class Api {
  constructor(options = {}) {
    this.client = axios.create()
    this.accessToken = options.accessToken || localStorage.accessToken || ''
    this.refreshToken = options.refreshToken || localStorage.refreshToken || ''
    this.refreshRequest = null

    this.client.interceptors.request.use(
      config => {
        if (!this.accessToken) {
          return config
        }

        const newConfig = {
          headers: {},
          ...config
        }
        newConfig.headers.Authorization = `Bearer ${this.accessToken}`
        return newConfig;
      },
      e => Promise.reject(e)
    );

    this.client.interceptors.response.use(
      r => r,
      async error => {
        if (error.response.status === 401 && error.config.retry) { // Todo: 322
          this.setAccessToken(null)
          this.setRefreshToken(null)
        }

        else if (
          !this.refreshToken ||
          error.response.status !== 401 ||
          error.config.retry
        ) {
          throw error
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post(`${baseURL}/users/refresh`, {
            refreshToken: this.refreshToken
          })
        }
        const { data } = await this.refreshRequest
        this.setAccessToken(data.accessToken)
        this.setRefreshToken(data.refreshToken)
        const newRequest = {
          ...error.config,
          retry: true
        }

        return this.client(newRequest)
      }
    )
  }

  setAccessToken(accessToken) {
    if (!accessToken) {
      delete localStorage.accessToken
    } else {
      localStorage.accessToken = accessToken
    }
    this.accessToken = accessToken
  }

  setRefreshToken(refreshToken) {
    if (!refreshToken) {
      delete localStorage.refreshToken
    } else {
      localStorage.refreshToken = refreshToken
    }
    this.refreshToken = refreshToken
  }

  async login({ email, password }) {
    const { data } = await this.client.post(`${baseURL}/users/login`, { email, password })
    this.setAccessToken(data.accessToken)
    this.setRefreshToken(data.refreshToken)
    return data
  }

  async register(data) {
    await this.client.post('/api/users/register', data)
  }

  async logout() {
    await this.client.post('/api/users/logout')
    this.setAccessToken(null)
    this.setRefreshToken(null)
  }

  async getCurrentUserData() {
    const { data } = await this.client.get('/api/users/data')
    return data
  }

  async getFeed() {
    const { data } = await this.client.get('/api/posts/feed')
    return data
  }

  async getFollowers() {
    const { data } = await this.client.get('/api/users/followers')
    return data
  }

  async getFollowings() {
    const { data } = await this.client.get('/api/users/followings')
    return data
  }

  async getUserById(userId) {
    const { data } = await this.client.get(`/api/users/data/${userId}`)
    return data
  }

  async postComment({ postId, content }) {
    const { data } = await this.client.post(`/api/posts/${postId}/comments`, { content })
    return data
  }

  async imageUpload({ formData }) {
    const { data } = await this.client.post('/api/posts/image', formData)
    return data
  }

  async postNewPost(data) {
    await this.client.post('/api/posts', data)
  }

  async search({ email }) {
    const { data } = await this.client.get(`/api/users/search/${email}`)
    return data
  }

  async followById({ userId }) {
    return await this.client.post(`/api/users/follow/${userId}`)
  }

  async unfollowById({ userId }) {
    return await this.client.post(`/api/users/unfollow/${userId}`)
  }

  async deleteComment({ postId, commentId }) {
    return await this.client.delete(`/api/posts/${postId}/comments/${commentId}`)
  }

  async avatarUpload({ formData }) {
    const { data } = await this.client.post('/api/users/avatar', formData)
    return data
  }

  async editUser(data) {
    console.log(data)
    return await this.client.patch('/api/users/data', data)
  }
}