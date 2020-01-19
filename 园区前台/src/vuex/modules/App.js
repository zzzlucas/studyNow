export default {
  namespaced: 'App',
  state: {
    token: '',
    isLogin: false
  },
  mutations: {
    'SET_TOKEN' (state, payload) {
      state.token = payload
    },
    'SET_IS_LOGIN' (state, payload) {
      state.isLogin = payload
    },
  },
  actions: {
    setToken ({commit}, payload) {
      commit('SET_TOKEN', payload)
    },
    signIn ({commit}) {
      commit('SET_IS_LOGIN', true)
    },
    signOut ({commit}) {
      commit('SET_IS_LOGIN', false)
    },
  }
}
