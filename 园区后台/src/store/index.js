import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import industrialPark from './modules/industrialPark'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    industrialPark,
    user,
    permission,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters,
})
