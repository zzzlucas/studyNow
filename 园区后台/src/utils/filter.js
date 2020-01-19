import Vue from 'vue'
import * as dayjs from 'dayjs'
import ResizeObserver from 'resize-observer-polyfill'

Vue.filter('NumberFormat', function(value) {
  if (!value) {
    return '0'
  }
  let intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') //将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(dataStr).format(pattern)
})

Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(dataStr).format(pattern)
})

/** 字符串超长截取省略号显示 */
Vue.filter('ellipsis', function(value, vlength = 25) {
  if (!value) {
    return ''
  }
  console.log('vlength: ' + vlength)
  if (value.length > vlength) {
    return value.slice(0, vlength) + '...'
  }
  return value
})

Vue.directive('resize', {
  bind(el, binding) {
    let observer = new ResizeObserver(entries => {
      if (entries[0].contentRect) {
        binding.value(entries[0].contentRect)
      }
    })

    observer.observe(el)
    el.__observer = observer
  },
  unbind(el) {
    el.__observer.unobserve(el)
    el.__observer.disconnect()
  }
})