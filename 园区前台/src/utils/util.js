
/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
    if (!(typeof obj == 'object')) {
      return
    }
  
    for (var key in obj) {
      if (obj.hasOwnProperty(key)
        && (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
        delete obj[key]
      }
    }
    return obj
  }


  /**
 * 获取表单字段promise
 * 对表单进行验证，不通过则抛出错误
 * @param form
 * @param fields
 * @returns {Promise}
 */
export function promiseForm(form, fields) {
  return new Promise((resolve, reject) => {
    let callback = (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(new Error('没有通过表单校验'))
      }
    }
    if (fields) {
      form.validateFields(fields, callback)
    } else {
      form.validateFields(callback)
    }
  })
}