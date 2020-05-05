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
        if (
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
}