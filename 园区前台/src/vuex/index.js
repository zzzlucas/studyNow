import Vue from 'vue'
import Vuex from 'vuex'
import * as storage from '../utils/storage'
import getters from './getters'
/**
 * Modules.
 */
import App from './modules/App'
import User from './modules/User'

Vue.use(Vuex)

function handleStore (store) {
  const key = 'PublicPlatform_store'
  const cache = storage.get(key)
  if (cache) {
    // Merge cache into original state tree
    store.replaceState(Object.assign({}, store.state, cache))
  }
  store.subscribe((mutation, state) => {
    storage.set(key, state)
  })
}

// Create store instance
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    App,
    User
  },
  getters,
  plugins: [handleStore],
})

export default store
