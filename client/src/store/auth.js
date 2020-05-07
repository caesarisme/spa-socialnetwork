import Vue from 'vue'

export default {
  state: {
    isAuthorized: !!localStorage.refreshToken,
    currentUser: null
  },
  getters: {
    isAuthorized: s => s.isAuthorized,
    currentUser: s => s.currentUser
  },
  mutations: {
    setAuthorized: s => s.isAuthorized = true,
    setUnauthorized: s => s.isAuthorized = true,
    setCurrentUser: (s, p) => s.currentUser = p
  },
  actions: {
    login: async ({ commit }, data) =>
      await Vue.prototype.$http.login(data)
        .then(() => {
          commit('setAuthorized')
        })
        .catch(e => Promise.reject(e)),

    async register({}, data) {
      return this._vm.$http.register(data)
    },

    getCurrentUserData: async ({commit}) =>
      await Vue.prototype.$http.getCurrentUserData()
        .then(res => {
          commit('setCurrentUser', res)
        })
        .catch(e => Promise.reject(e)),

    logout: async ({ commit }) =>
      await Vue.prototype.$http.logout()
          .then(() => {
              commit('setUnauthorized')
          })
          .catch(e => Promise.reject(e)),

    async editUser({ dispatch }, data) {
      return await this._vm.$http.editUser(data)
        .then(async res => {
          await dispatch('getCurrentUserData')
          return res
        })
        .catch(e => Promise.reject(e))
    }
  }
}