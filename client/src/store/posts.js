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
    getFeed: async ({ commit }) =>
      Vue.prototype.$http.getFeed()
          .then(res => {
            commit('setFeed', res)
          })
          .catch(e => Promise.reject(e)),

    async postComment ({}, { postId, content }) {
      return this._vm.$http.postComment({ postId, content })
        .then(res => {
          return res
        })
        .catch(e => Promise.reject(e))
    },

    async postNewPost({ dispatch }, data) {
      return this._vm.$http.postNewPost(data)
        .then(async () => {
          await dispatch('getFeed')
        })
        .catch(e => Promise.reject(e))
    },

    async deleteComment({ dispatch }, data) {
      return this._vm.$http.deleteComment(data)
        .then(async res => {
          await dispatch('getFeed')
          return res
        })
    }
  }
}