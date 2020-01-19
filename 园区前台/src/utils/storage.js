/**
 * Storage get.
 * @param {String} name
 * @param {*} defaultValue Optional.
 * @return Object|String|Array|Boolean|null
 */
export const get = (name, defaultValue = null) => {
  const value = localStorage.getItem(name)
  if (value === null) {
    return defaultValue
  }
  return JSON.parse(value)
}
/**
 * Storage set.
 * @param {String} name
 * @param {*} value
 */
export const set = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value))
}
/**
 * Storage delete.
 * @param {String} name
 */
export const remove = (name) => {
  localStorage.removeItem(name)
}
/**
 * Storage clear.
 */
export const clear = () => {
  localStorage.clear()
}
