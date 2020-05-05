import Vue from 'vue'

export default {
  state: {
    followers: [],
    followings: []
  },
  getters: {
    followers: s => s.followers,
    followings: s => s.followings
  },
  mutations: {
    setFollowers: (s, p) => s.followers = p,
    setFollowings: (s, p) => s.followings = p,
  },
  actions: {
    getFollowers: async ({ commit }) =>
      Vue.prototype.$http.getFollowers()
        .then(res => {
          commit('setFollowers', res)
        })
        .catch(e => Promise.reject(e)),

    getFollowings: async ({ commit }) =>
      Vue.prototype.$http.getFollowings()
        .then(res => {
          commit('setFollowings', res)
        })
        .catch(e => Promise.reject(e)),

    getUserData: async ({ commit }, userId) =>
      Vue.prototype.$http.getUserById(userId)
      .then(res => {
        return res
      })
      .catch(e => Promise.reject(e))
  },
}