/**
 * 数组相关
 * @module array
 */
import { chunk, difference, differenceBy, find, findIndex, flattenDeep, forEach, last, map, remove, sortBy, unionBy, uniq, uniqBy, uniqWith } from 'lodash-es'
/**
 * 数组随机乱序
 *
 * @example
 * import { shuffle } from '@ccpow/devopslib/packages/utils/array'
 * shuffle([1, 3, 5, 7, 4, 3]); // -> [3,1,5,7,3,4]
 *
 * @param {array} arr =数组
 * @returns {array} 新的乱序数组
 */
const shuffle = ([...arr]) => arr.sort(() => 0.5 - Math.random())

export {
  /**
   * 返回一个包含拆分区块的新数组，封装lodash.chunk
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.chunk}
   */
  chunk,
  /**
   * 返回一个过滤值后的新数组，封装lodash.difference
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.difference#_differencearray-values}
   */
  difference,
  /**
   * 返回一个过滤值后的新数组，封装lodash.differenceBy
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.differenceBy}
   */
  differenceBy,
  /**
   * 找到对应子项，封装lodash.find
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.find#_findcollection-predicate_identity-fromindex0}
   */
  find,
  /**
   * 找到对应子项索引，封装lodash.findIndex
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.findIndex#_findindexarray-predicate_identity-fromindex0}
   */
  findIndex,
  /**
   * 将array递归为一维数组，封装lodash.flattenDeep
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.flattenDeep#_flattendeeparray}
   */
  flattenDeep,
  /**
   * 调用 iteratee 遍历 collection(集合) 中的每个元素，封装lodash.flattenDeep
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.forEach}
   */
  forEach,
  /**
   * 找到最后一个子项，封装lodash.forEach
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.last#_lastarray}
   */
  last,
  /**
   * 创建一个数组, 遍历 collection（集合）中的每个元素后返回的结果，封装lodash.map
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.map}
   */
  map,
  /**
   * 移除数组中返回为真值的所有元素，并返回移除元素组成的数组，封装lodash.remove
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.remove#_removearray-predicate_identity}
   */
  remove,
  /**
   * 返回排序后的数组，封装lodash.sortBy
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.sortBy#_sortbycollection-iteratees_identity}
   */
  sortBy,
  /**
   * 返回一个新的联合数组，封装lodash.unionBy
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.unionBy}
   */
  unionBy,
  /**
   * 返回新的去重后的数组，封装lodash.uniq
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.uniq#_uniqarray}
   */
  uniq,
  /**
   * 返回新的去重后的数组，封装lodash.uniqBy
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.uniqBy#_uniqbyarray-iteratee_identity}
   */
  uniqBy,
  /**
   * 返回新的去重后的数组，封装lodash.uniqWith
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.uniqWith#_uniqwitharray-comparator}
   */
  uniqWith,
  shuffle
}
