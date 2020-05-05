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
  actions: { // Todo register
    login: async ({ commit }, data) =>
      await Vue.prototype.$http.login(data)
        .then(() => {
          commit('setAuthorized')
        })
        .catch(e => Promise.reject(e)),

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
          .catch(e => Promise.reject(e))
  }
}