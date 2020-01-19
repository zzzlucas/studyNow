import Axios from 'axios'
import Store from '../vuex'
import {Modal, Notice} from 'view-design'

// 创建 Axios 实例
const service = Axios.create({
  baseURL: window._CONFIG.domianURL,
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    let data = error.response.data
    console.log('------异常响应------', error.response.status)
    switch (error.response.status) {
      case 403:
        Notice.error({message: '系统提示', desc: '拒绝访问', duration: 4})
        break
      case 500:
        if (Store.getters.token && data.message.indexOf('Token失效,请重新登录') !== -1) {
          Modal.error({
            title: '登录已过期',
            content: '很抱歉，登录已过期，请重新登录',
            'ok-text': '重新登录',
            mask: false,
            onOk: async () => {
              await Store.dispatch('User/logout')
              window.location.reload()
            }
          })
        }
        break
      case 404:
        Notice.error({message: '系统提示', desc: '很抱歉，资源未找到!', duration: 4})
        break
      case 504:
        Notice.error({message: '系统提示', desc: '网络超时'})
        break
      case 401:
        Notice.error({message: '系统提示', desc: '未授权，请重新登录', duration: 4})
        if (token) {
          localStorage.removeItem('AccessToken')
          window.location.reload()
        }
        break
      default:
        Notice.error({
          message: '系统提示',
          desc: data.message,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Store.state.App.token
  if (token) {
    config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(response => {
  return response.data
}, err)

export {
  service as axios
}
