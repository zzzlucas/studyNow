import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // info: {},
    menuMode: true       //   this.$store.state.menuMode
  },
  Getters: {
    // menuMode: state => state.menuMode,
  },
  mutations: {
    SET_MENUMODE(state, data) {
      state.menuMode = data
    },
  },
  actions: {
    // setInfo({ commit }, data) {
    //   commit('getInfo', data)
    // },
  },
  modules: {
  }
})
