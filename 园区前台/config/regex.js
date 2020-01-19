/**
 * 手机号正则
 * 号段覆盖率 97% 以上，提前过滤大部分非手机号
 * @author Violet_Ice紫冰 <violetice@aliyun.com>
 * @see https://learnku.com/articles/31543
 * @type {RegExp}
 */
export const phone = /^1(3\d|4[5-7]|5[0-35-9]|7[0135-8]|8\d|9[89])\d{8}$/

/**
 * 邮箱正则
 * 支持：数字邮箱，中文邮箱，中文域名，多级域名，以及带有 “._-” 的邮箱名
 * 真·全匹配邮箱正则
 * @author Violet_Ice紫冰 <violetice@aliyun.com>
 * @see 过几天补上
 * @type {RegExp}
 */
export const email = /^[\u4e00-\u9fa5\da-z]+[\u4e00-\u9fa5\w-.]*[\u4e00-\u9fa5\da-z]@[\u4e00-\u9fa5\da-z]+[\u4e00-\u9fa5\w-.]*[\u4e00-\u9fa5\da-z]\.([a-z]+|\u4e00-\u9fa5+)$/i