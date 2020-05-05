import Vue from 'vue'

export default {
  state: {
    feed: {}
  },
  getters: {
    feed: s => s.feed
  },
  mutations: {
    setFeed: (s, p) => s.feed = p
  },
  actions: {
    getFeed: ({ commit }) =>
      Vue.prototype.$http.getFeed()
          .then(res => {
            commit('setFeed', res)
          })
          .catch(e => Promise.reject(e))
  }
}