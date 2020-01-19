import keyBy from 'lodash/keyBy'
import { isURL } from '@/utils/validate'
import { axios } from '@utils/request'
import _ from 'lodash'
import { assetsRegisterEditForm } from '@/config/pick-fields'

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  let index = Math.floor((Math.random() * arr.length))
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  let event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

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
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function formatDate(value, fmt) {
  var regPos = /^\d+(\.\d+)?$/
  if (regPos.test(value)) {
    //如果是数字
    let getDate = new Date(value)
    let o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      'S': getDate.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  } else {
    //TODO
    value = value.trim()
    return value.substr(0, fmt.length)
  }
}

// 生成首页路由
export function generateIndexRouter(data) {
  let indexRouter = [{
    path: '/',
    name: 'dashboard',
    //component: () => import('@/components/layouts/BasicLayout'),
    component: resolve => require(['@/components/layouts/TabLayout'], resolve),
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      ...generateChildRouters(data)
    ]
  }, {
    'path': '*', 'redirect': '/404', 'hidden': true
  }]
  return indexRouter
}

// 生成嵌套路由（子路由）

function generateChildRouters(data) {
  const routers = []
  for (var item of data) {
    let component = ''
    if (item.component.indexOf('layouts') >= 0) {
      component = 'components/' + item.component
    } else {
      component = 'views/' + item.component
    }

    // eslint-disable-next-line
    let URL = (item.meta.url || '').replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)) // URL支持{{ window.xxx }}占位符变量
    if (isURL(URL)) {
      item.meta.url = URL
    }

    let menu = {
      path: item.path,
      name: item.name,
      redirect: item.redirect,
      hidden: item.hidden,
      component: resolve => require([`@/${component}.vue`], resolve), // Pack every views into the chunk (bad)
      // component:()=> import(`@/${component}.vue`), // Pack by every view files (still bad)
      meta: {
        title: item.meta.title,
        icon: item.meta.icon,
        url: item.meta.url,
        permissionList: item.meta.permissionList,
        keepAlive: item.meta.keepAlive
      }
    }
    if (item.alwaysShow) {
      menu.alwaysShow = true
      menu.redirect = menu.path
    }
    if (item.children && item.children.length > 0) {
      menu.children = [...generateChildRouters(item.children)]
    }
    //--update-begin----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
    //判断是否生成路由
    if (item.route && item.route === '0') {
      //console.log(' 不生成路由 item.route：  '+item.route);
      //console.log(' 不生成路由 item.path：  '+item.path);
    } else {
      routers.push(menu)
    }
    //--update-end----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
  }
  return routers
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber() {
  // 生成 最小值 到 最大值 区间的随机数
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  if (arguments.length === 1) {
    let [length] = arguments
    // 生成指定长度的随机数字，首位一定不是 0
    let nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
    return parseInt(nums.join(''))
  } else if (arguments.length >= 2) {
    let [min, max] = arguments
    return random(min, max)
  } else {
    return Number.NaN
  }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
  if (!length) length = 1
  if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let str = ''
  for (let i = 0; i < length; i++) {
    let num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID() {
  let chats = '0123456789abcdef'
  return randomString(32, chats)
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {*}
 */
export function underLine2CamelCase(string) {
  return string.replace(/_([a-z])/g, function(all, letter) {
    return letter.toUpperCase()
  })
}

/**
 * 判断是否显示办理按钮
 * @param bpmStatus
 * @returns {*}
 */
export function showDealBtn(bpmStatus) {
  if (bpmStatus != '1' && bpmStatus != '3' && bpmStatus != '4') {
    return true
  }
  return false
}

/**
 * 增强CSS，可以在页面上输出全局css
 * @param css 要增强的css
 * @param id style标签的id，可以用来清除旧样式
 */
export function cssExpand(css, id) {
  let style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = `@charset "UTF-8"; ${css}`
  // 清除旧样式
  if (id) {
    let $style = document.getElementById(id)
    if ($style != null) $style.outerHTML = ''
    style.id = id
  }
  // 应用新样式
  document.head.appendChild(style)
}

/**
 * 获取表单字段promise
 * 对表单进行验证，不通过则抛出错误。
 *
 * fields不填或者为空数组，则验证全部字段。
 * fields是数组，则只验证在数组中的字段。
 * fields是true，则只验证被标记为required的字段。
 *
 * @param form
 * @param {array|boolean} fields
 * @returns {Promise}
 */
export function promiseForm(form, fields = []) {
  return new Promise((resolve, reject) => {
    let callback = (err, data) => {
      if (!err) {
        for (let key in data) {
          if (data.hasOwnProperty(key)){
            data[key] = data[key] === undefined ? '' : data[key]
          }
        }
        resolve(data)
      } else {
        reject(new Error('没有通过表单校验'))
      }
    }
    // Rules process
    const items = form.formItems
    let _fields = []
    Object.keys(items).forEach(key => {
      const item = items[key]
      // Not empty or required fields
      if (fields === true && (item.isRequired() || item.getField().value != null)) {
        _fields.push(key)
      }
    })
    if (fields === true) {
      fields = _fields
    }
    // Validate
    if (fields.length) {
      form.validateFields(fields, callback)
    } else {
      form.validateFields(callback)
    }
  })
}

/**
 * 上传文件，不知道为什么进度条没出来
 * @param request a-upload pros beforeUpload 的第一个参数
 */
export function uploadFile(request) {
  const data = new FormData
  data.append('file', request.file)

  axios({
    url: '/sys/common/upload',
    method: 'post',
    data,
    onUploadProgress(e) {
      request.onProgress(e)
    }
  }).then(res => {
    if (res.code === 0 && res.success) {
      request.onSuccess({ url: window._CONFIG['imgDomainURL'] + res.message, old: res.message })
    } else {
      request.onError(res.message)
    }
  })
}

/**
 * 提取 fileList 主要数据
 * @param fileList
 * @returns {[]}
 */
export function getFileListData(fileList) {
  return _.map(fileList, obj => {
    return {
      url: obj.response.old,
      name: obj.name,
      uid: obj.uid,
      status: 'done'
    }
  })
}

/**
 * 列表 json 解析
 * @param list
 * @param fields
 * @returns {*}
 */
export function listJsonFields(list, fields) {
  for (const i in list) {
    if (list.hasOwnProperty(i)) {
      list[i] = objectJsonFields(list[i], fields)
    }
  }

  return list
}

/**
 * 对象 json 解析
 * @param obj
 * @param fields
 * @returns {*}
 */
export function objectJsonFields(obj, fields) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (fields.indexOf(key) !== -1) {
        obj[key] = JSON.parse(obj[key])
      }
    }
  }

  return obj
}

/**
 * 获取单张图片
 * @param url
 * @returns {*}
 */
export function getOneImage(url) {
  return window._CONFIG.imgDomainURL + url
}

/**
 * 打开文件用到的 Url
 * @param fileUrl
 * @returns {*}
 */
export function openFileUrl(fileUrl) {
  if (/\.(jpg|png)$/.test(fileUrl)) {
    return getOneImage(fileUrl)
  } else if (/\.pdf$/.test(fileUrl)) {
    return window._CONFIG.domianURL + '/generic/web/viewer.html?file='
      + window._CONFIG.downloadURL + fileUrl
  } else {
    return window._CONFIG.downloadURL + fileUrl
  }
}

/**
 * 替换列表对象的键名
 * @param list
 * @param fields
 * @param callback
 * @returns {*}
 */
export function listReplace(list, fields, callback) {
  list = Object.assign([], list)
  for (const i in list) {
    if (list.hasOwnProperty(i)) {
      list[i] = objectReplace(list[i], fields)

      if (typeof callback === 'function') {
        list[i] = callback(list[i])
      }
    }
  }

  return list
}

/**
 * 替换对象的键名
 * @param obj
 * @param fields
 * @returns {*}
 */
export function objectReplace(obj, fields) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (fields[key]) {
        obj[fields[key]] = obj[key]
      }
    }
  }

  return obj
}

/**
 * 获取 Tree 的路径
 * @param list
 * @param key
 * @param keyName
 * @param path
 * @returns {Array}
 */
export function getTreeNodeOfKey(list, key, keyName, path = []) {
  _.map(list, (obj, index) => {
    if (obj[keyName] === key) {
      path.push(index)
      return obj
    }
    if (obj.children) {
      path.push(index)
      path = getTreeNodeOfKey(obj.children, key, keyName, path)
    }
    return obj
  })

  return path
}

/**
 * Promisify
 * Converts NodeJS async style functions to native JS promises.
 *
 * @param {Function} fun
 * @param {Array} args Optional
 * @param {*} ctx Optional
 * @link https://github.com/pensierinmusica/js-promisify
 * @return Promise
 */
export function promisify(fun, args = [], ctx = undefined) {
  return new Promise((resolve, reject) => {
    args.push((err, data) => {
      err && reject(err)
      resolve(data)
    })
    fun.apply(ctx, args)
  })
}

/**
 * Build tree relation
 * @param {Object[]} objectMap Can use lodash.pick(list, objectKey) generate
 * @param {String} parentKey
 * @return Object Relation map
 */
export function buildTreeRelation(objectMap, parentKey = 'parentId') {
  const relationMap = {}
  // Clone
  Object.keys(objectMap).forEach(objectId => {
    relationMap[objectId] = Object.assign({}, objectMap[objectId])
  })
  Object.keys(relationMap).forEach(objectId => {
    const object = relationMap[objectId]
    if (!object[parentKey]) {
      return
    }
    const parentId = object[parentKey]
    const parentObject = relationMap[parentId]
    if (!parentObject) {
      return
    }
    if (!parentObject.children) {
      parentObject.children = []
    }
    parentObject.children.push(object)
  })
  return relationMap
}

/**
 * Build tree nodes
 * @param {Object[]} relationMap
 * @param {String} key relationMap row key
 * @param {String} name relationMap row name
 * @param {String} parentKey
 * @return Array Tree nodes
 */
export function buildTreeNodes(relationMap, key = 'id', name = 'name', parentKey = 'parentId') {
  const resolveNode = function(item) {
    const node = { key: item[key], title: item[name], value: item[key] }
    if (!item.children) {
      return node
    }
    node.children = item.children.map(resolveNode)
    return node
  }
  let nodes = []
  Object.keys(relationMap).forEach(relationKey => {
    const _ = relationMap[relationKey]
    // Only keep head relation
    if (_[parentKey]) {
      return
    }
    nodes.push(resolveNode(_))
  })
  return nodes
}

/**
 * Build ant tree data
 * @param {Object[]} list Dataset
 * @param {String} key Dataset row key
 * @param {String} name Dataset row name
 * @param {String} parentKey Dataset row parent Key
 * @param {Boolean} includeRoot Is have tree nodes root
 * @return Array tree data
 */
export function buildTreeData(list, key = 'id', name = 'name', parentKey = 'parentId', includeRoot = false) {
  const map = keyBy(list, key)
  let nodes = buildTreeNodes(buildTreeRelation(map, parentKey), key, name, parentKey)
  if (includeRoot) {
    nodes = [{ title: '全部', key: '', children: nodes }]
  }
  return nodes
}
