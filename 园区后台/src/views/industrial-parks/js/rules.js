import { phone } from '@/config/regex'

/**
 * 经纬度校验
 * @param type
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
const validateLngLat = (type, rule, value, callback) => {
  if (!value) {
    console.log('!value');
    callback()
  }
  const num = Number(value)
  if (isNaN(num)) {
    return callback(new Error('请输入数字'))
  }
  if (/\.$/.test(value)) {
    return callback(new Error('请输入正确的小数'))
  }
  switch (type) {
    case 'lng':
      if (num > 180 || num < -180) {
        return callback(new Error('请输入正确的经度'))
      }
      break
    case 'lat':
      if (num > 90 || num < -90) {
        return callback(new Error('请输入正确的纬度'))
      }
      break
  }
  callback()
}

export default {
  parkName: [
    { required: true, message: '请输入园区名称' }
  ],
  totalBulidingArea: [
    { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字，最多两位小数' }
  ],
  totalWorkstation: [
    { pattern: /^\d+$/, message: '请输入数字' }
  ],
  feeScale: [
    { pattern: /^\d+\.\d{2}$/, message: '请输入金额，补齐两位小数' }
  ],
  totalRoom: [
    { pattern: /^\d+$/, message: '请输入数字' }
  ],
  feeScaleRoom: [
    { pattern: /^\d+\.\d{2}$/, message: '请输入金额，补齐两位小数' }
  ],
  lng: [
    {
      validator: (rule, value, callback) => {
        validateLngLat('lng', rule, value, callback)
      }
    }
  ],
  lat: [
    {
      validator: (rule, value, callback) => {
        validateLngLat('lat', rule, value, callback)
      }
    }
  ],
  roomRate: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
        }
        const num = Number(value)
        if (isNaN(num)) {
          return callback(new Error('请输入数字'))
        }
        if (/\.$/.test(value)) {
          return callback(new Error('请输入正确的小数'))
        }
        if (num > 100 || num < 0) {
          return callback(new Error('不能大于 100 或小于 0'))
        }
        callback()
      }
    }
  ],
  telephone: [
    { pattern: phone, message: '请输入正确的手机号' }
  ]
}