import Vue from 'vue'
import { getAction, putAction } from '@/api/manage'
import store from '@/store'
import { USER_INFO } from "@/store/mutation-types"

export function loadList() {
  return new Promise((resolve, reject) => {
    getAction('/sys/user/getCurrentUserDeparts')
      .then(res => {
        if (res.success) {
          resolve(res.result)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function selectDepart(orgCode, username = '') {
  let obj = {
    orgCode,
    username,
  }
  return new Promise((resolve, reject) => {
    putAction("/sys/selectDepart", obj).then(res => {
      if (!res.success) {
        reject(res)
        return
      }
      const userInfo = res.result.userInfo;
      Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000);
      store.commit('SET_INFO', userInfo);
      store.dispatch('industrialPark/setPark', { parkId: res.result.parkId, parkName: res.result.parkName })
      resolve(res)
    })
  })
}

