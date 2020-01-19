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

/**
 * 身份证号验证
 */
export const idCard = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

/**
 * 比例验证
 */
export const rate = [
    {
        validator: (rule, value, callback) => {
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
]
export const ratePart = {
    validator: (rule, value, callback) => {
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
