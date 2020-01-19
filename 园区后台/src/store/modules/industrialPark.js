import Vue from 'vue'
import {
  INDUSTRIAL_PARK_ID,
  INDUSTRIAL_PARK_NAME
} from '@/store/mutation-types'

const park = {
  namespaced: 'industrialPark',
  state: {
    ready: false,
    id: '',
    name: '',
  },
  mutations: {
    SET_PARK_ID: (state, id) => {
      state.id = id
      Vue.ls.set(INDUSTRIAL_PARK_ID, id)
    },
    SET_PARK_NAME: (state, name) => {
      state.name = name
      Vue.ls.set(INDUSTRIAL_PARK_NAME, name)
    },
    SET_PARK_READY: (state, val = true) => {
      state.ready = val
    },
  },
  actions: {
    setPark: ({ commit }, { parkId, parkName }) => {
      console.log(`Switch to park: id: ${parkId} name: ${parkName}`)
      commit('SET_PARK_ID', parkId)
      commit('SET_PARK_NAME', parkName)
    },
    setupParkFromStorage: ({ dispatch, commit }) => {
      const parkName = Vue.ls.get(INDUSTRIAL_PARK_NAME, '')
      const parkId = Vue.ls.get(INDUSTRIAL_PARK_ID, '')
      if (!parkId) {
        return
      }
      dispatch('setPark', { parkId, parkName })
      commit('SET_PARK_READY')
    },
  }
}

export default park
