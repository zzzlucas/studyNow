export default {
  namespaced: 'User',
  state: {
    id: '',
    name: '',
    avatar: '',
    email: '',
    phone: '',
    sex: '',
    parkId: '',
    custId: '',
  },
  mutations: {
    'SET_ID'(state, payload) {
      state.id = payload
    },
    'SET_NAME'(state, payload) {
      state.name = payload
    },
    'SET_AVATAR'(state, payload) {
      state.avatar = payload
    },
    'SET_EMAIL'(state, payload) {
      state.email = payload
    },
    'SET_PHONE'(state, payload) {
      state.phone = payload
    },
    'SET_SEX'(state, payload) {
      state.sex = payload
    },
    'SET_PARK_ID'(state, payload) {
      state.parkId = payload
    },
    'SET_CUST_ID'(state, payload) {
      state.custId = payload
    },
  },
  actions: {
    setPark: ({ commit }, { parkId }) => {
      console.log(`Switch to park: id: ${parkId}`)
      commit('SET_PARK_ID', parkId)
    },
    login({ dispatch, commit }, payload) {
      const user = payload.userInfo
      commit('SET_ID', user.id)
      commit('SET_NAME', user.realname)
      commit('SET_AVATAR', user.avatar)
      commit('SET_EMAIL', user.email)
      commit('SET_PHONE', user.phone)
      commit('SET_SEX', user.sex)
      commit('SET_PARK_ID', payload.parkId)
      commit('SET_CUST_ID', payload.custId)
      dispatch('App/signIn', null, { root: true })
    },
    logout({ dispatch, commit }) {
      commit('SET_ID', '')
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_EMAIL', '')
      commit('SET_PHONE', '')
      commit('SET_SEX', '')
      commit('SET_PARK_ID', '')
      commit('SET_CUST_ID', '')
      dispatch('App/setToken', '', { root: true })
      dispatch('App/signOut', null, { root: true })
    },
  }
}
