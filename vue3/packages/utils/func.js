/**
 * 工具函数
 * @module func
 */
import { debounce, throttle } from 'lodash-es'
/**
 * 对异步函数进行防抖
 * @function
 * @example
 * import { asyncDebounce } from '@ccpow/devopslib/packages/utils/func'
 * const funcDebounced = asyncDebounce(asyncFunc, 400)
 * @param {Function} func 异步函数
 * @param {Number} wait 防抖时间
 * @returns {Function} 经过防抖封装的函数
 */
const asyncDebounce = (func, wait) => {
  const debounced = debounce((resolve, reject, args) => {
    func(...args).then(resolve).catch(reject)
  }, wait)
  return (...args) =>
    new Promise((resolve, reject) => {
      debounced(resolve, reject, args)
    })
}
export {
  /**
   * 函数防抖，封装lodash.debounce
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.debounce#_debouncefunc-wait0-options}
   */
  debounce,
  /**
   * 函数节流，封装lodash.throttle
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.throttle#_throttlefunc-wait0-options}
   */
  throttle,
  asyncDebounce
}
