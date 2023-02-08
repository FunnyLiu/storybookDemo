/**
 * @module string
 */
import prettyBytes from 'pretty-bytes'
import { now } from 'lodash-es'
import SparkMD5 from 'spark-md5'
import { v4 } from 'uuid'
// 中文字符串正则
const chineseCharReg = /[^\x00-\x80]/g
/**
 * 判断字符串是否键盘三连（横着、竖着）
 * @param {String} str
 * @returns {boolean} 是否满足键盘3连键
 */
export function checkKeyboardContinuousChar(str) {
  const c1 = [
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?']
  ]
  const c2 = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ]
  // 兼容大小写都进入判断流程
  str = str.toLowerCase().split('')
  // 获取坐标位置
  const y = []
  const x = []
  for (let c = 0; c < str.length; c++) {
    y[c] = 0// 当做~`键处理
    x[c] = -1
    for (let i = 0; i < c1.length; i++) {
      for (let j = 0; j < c1[i].length; j++) {
        if (str[c] == c1[i][j]) {
          y[c] = i
          x[c] = j
        }
      }
    }
    if (x[c] != -1) continue
    for (let i = 0; i < c2.length; i++) {
      for (let j = 0; j < c2[i].length; j++) {
        if (str[c] == c2[i][j]) {
          y[c] = i
          x[c] = j
        }
      }
    }
  }
  // 匹配坐标连线
  for (let c = 1; c < str.length - 1; c++) {
    // 横着同一行
    if (y[c - 1] == y[c] && y[c] == y[c + 1]) {
      // 从左往右或者从右往左一排
      if ((x[c - 1] + 1 == x[c] && x[c] + 1 == x[c + 1]) || (x[c + 1] + 1 == x[c] && x[c] + 1 == x[c - 1])) {
        return true
      }
    }
    // 竖着同一列
    if (x[c - 1] == x[c] && x[c] == x[c + 1]) {
      // 从下往上或者从下往下同一列
      if ((y[c - 1] + 1 == y[c] && y[c] + 1 == y[c + 1]) || (y[c + 1] + 1 == y[c] && y[c] + 1 == y[c - 1])) {
        return true
      }
    }
    // 竖着同一列（类似/而不是\的一列）
    if ((x[c - 1] + 1 == x[c] && x[c] + 1 == x[c + 1]) || (x[c - 1] - 1 == x[c] && x[c] - 1 == x[c + 1])) {
      // 从下往上或者从下往下同一列
      if ((y[c - 1] + 1 == y[c] && y[c] + 1 == y[c + 1]) || (y[c + 1] + 1 == y[c] && y[c] + 1 == y[c - 1])) {
        return true
      }
    }
  }
  return false
}
/**
 * 获取字符串长度，中文长度为2
 *
 * @example
 * import { getStringLength } from '@ccpow/devopslib/packages/utils/string'
 * getStringLength('hello') //5
 * getStringLength('你好') //4
 *
 * @param {string} 字符串
 * @returns {number} 长度数值
 */
export function getStringLength(str = '') {
  const entryLen = str.length
  let entryLen2 = 0
  // 利用match方法检索出中文字符并返回一个存放中文的数组
  const chineseChar = str.match(chineseCharReg)
  if (chineseChar && chineseChar.length > 0) {
    // 算出实际的字符长度
    entryLen2 = chineseChar.length
  }
  return entryLen + entryLen2
}
/**
 * 截取字符串，处理中英文情况，中文长度为2
 *
 * @example
 * import { sliceStrByLength } from '@ccpow/devopslib/packages/utils/string'
 * sliceStrByLength('hello', 2) //he
 * sliceStrByLength('你好', 2) //你
 *
 * @param {string} 字符串
 * @param {number} 截取长度
 * @returns {string} 截取后的字符串
 */
export function sliceStrByLength(str = '', maxLen = 0) {
  let res = ''
  let readLength = 0
  for (const s of str) {
    if (s.match(chineseCharReg)) {
      readLength = readLength + 2
    } else {
      readLength = readLength + 1
    }
    if (readLength <= maxLen) {
      res = res + s
    }
  }
  return res
}
/**
 * 截取字符串，增加...，处理中英文情况，中文长度为2
 *
 * @example
 * import { ellipsisStrByLength } from '@ccpow/devopslib/packages/utils/string'
 * ellipsisStrByLength('hello', 2) //he...
 * ellipsisStrByLength('你好', 2) //你...
 *
 * @param {string} 字符串
 * @param {number} 截取长度
 * @returns {string} 截取后并增加了...的字符串
 */
export function ellipsisStrByLength(str = '', maxLen = 0) {
  if (getStringLength(str) > maxLen) {
    return `${sliceStrByLength(str, maxLen)}...`
  }
  return str
}

/**
 * 随机字符串
 *
 * @example
 * import { random } from '@ccpow/devopslib/packages/utils/string'
 * random(3); // '2xK'
 *
 * @param length - 字符串长度
 * @returns 随机字符串
 */
export function random(length) {
  const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const randomChar = () => characterSet[Math.floor(Math.random() * characterSet.length)]
  let text = ''
  let idx = 0
  while (idx < length) {
    text = text + randomChar()
    idx += 1
  }
  return text
}
/**
 * 获取文件名后缀
 *
 * @example
 * import { getFileExtension } from '@ccpow/devopslib/packages/utils/string'
 * getFileExtension('abc.pdf'); // 'pdf'
 *
 * @param {string} fileName 文件名
 * @returns {string} 文件后缀名
 */
export function getFileExtension(fileName) {
  return fileName.substring(fileName.lastIndexOf('.') + 1)
}
/**
 * 将字符串编码为md5格式
 * @param {string} string 待编码的字符串
 * @returns {string} md5值
 */
export function generateMd5fromString(string) {
  return SparkMD5.hash(string)
}
/**
 * 生成一个uuid，使用v4版本算法，基于随机字符串
 * @returns {string} uuid
 */
export function generateV4Uuid() {
  return v4()
}

export {
  /**
   * bit 转换
   * @function
   * @see {@link https://github.com/sindresorhus/pretty-bytes#api|pretty-bytes文档}
   */
  prettyBytes,
  /**
   * 返回时间戳，封装lodash.now
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.now#_now}
   */
  now
}
