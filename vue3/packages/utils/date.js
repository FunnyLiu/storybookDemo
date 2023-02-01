/**
 * @module date
 */
/**
 * 工时日期格式化，从秒生成X天X小时X分钟X秒
 *
 * @example
 * import { secondToWorktime } from '@ccpow/devopslib/packages/utils/date'
 * secondToWorktime(30) // 30秒
 * secondToWorktime(301) // 5分1秒
 * secondToWorktime(3661) // 1小时时1分1秒
 * secondToWorktime(288061) // 10天1分1秒
 *
 * @async
 * @param {number} s - 秒
 * @returns 延迟Promise
 */
export function secondToWorktime(time) {
  let h = parseInt(time / 3600)
  const minute = parseInt(time / 60 % 60)
  const second = Math.ceil(time % 60)
  const d = parseInt(h / 8)
  h = h % 8
  return `${d > 0 ? `${d}天` : ''}${h > 0 ? `${h}小时` : ''}${minute > 0 ? `${minute}分` : ''}${second > 0 ? `${second}秒` : ''}`
}
/**
 * 时间格式化
 *
 * @example
 * import { formatDate } from '@ccpow/devopslib/packages/utils/date'
 * formatDate(new Date().getTime()); //2021-11-12 10:05:30
 * formatDate(new Date().getTime(), 'YYYY年MM月DD日'); //2021年11月12日
 * formatDate(new Date().getTime(), '今天是YYYY/MM/DD hh:mm:ss'); //今天是2021/11/12
 *
 * @param {number} time - 时间字符串
 * @param {number} format - 需要format出来的格式
 * @returns 格式化后的字符串
 */
export function formatDate(time, format = 'YYYY-MM-DD hh:mm:ss') {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 月份是从0开始的
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  const preArr = Array.apply(null, Array(10)).map(function(elem, index) {
    return '0' + index
  })

  return format
    .replace(/YYYY/g, String(year))
    .replace(/MM/g, String(preArr[month] || month))
    .replace(/DD/g, String(preArr[day] || day))
    .replace(/hh/g, String(preArr[hour] || hour))
    .replace(/mm/g, String(preArr[min] || min))
    .replace(/ss/g, String(preArr[sec] || sec))
}
