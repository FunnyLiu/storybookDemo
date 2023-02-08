/**
 * 对象相关
 * @module object
 */
import { assign, clone, cloneDeep, groupBy, hasIn, isEmpty, isEqual, merge, omit } from 'lodash-es'
/**
 * 通过id，获取树状结构祖先id列表，一般用于级联组件初始化
 * @param {string|number} id 需要寻找的id
 * @param {object} tree 树形结构
 * @example
 * import { findParentIdListInTree } from "@ccpow/devopslib/packages/utils/object";
 * findParentIdListInTree({
 *   id: 1,
 *   children: [
 *     {
 *       id: 2
 *     }
 *   ]
 * })// [1, 2]
 */
const findParentIdListInTree = (id, tree) => {
  let nodes = []
  function getParentNodes(id, tree) {
    _getParentNodes([], id, tree)
    return [...nodes, id]
  }

  function _getParentNodes(his, targetId, tree) {
    tree.some((list) => {
      const children = list.children || []
      if (list.id == targetId) {
        nodes = his
        return true
      } else if (children.length > 0) {
        const history = [...his]
        history.push(list.id)
        return _getParentNodes(history, targetId, children)
      }
    })
  }
  return getParentNodes(id, tree)
}
/**
 * 对象转url参数
 *
 * @example
 * import { obj2url } from '@ccpow/devopslib/packages/utils/object'
 * obj2url({ a: 123, b: 'fang' }); // a=123&b=fang
 *
 * @param {object} 对象
 * @returns {string} url后缀字符串
 */
const obj2url = (data, isPrefix) => {
  const prefix = isPrefix ? '?' : ''

  const _result = []
  for (const key in data) {
    const value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue
    }
    if (value.constructor === Array) {
      value.forEach((_value) => {
        _result.push(
          encodeURIComponent(key) + '[]=' + encodeURIComponent(_value)
        )
      })
    } else {
      _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
  }

  return _result.length ? prefix + _result.join('&') : ''
}
export {
  /**
   * 对象赋值，封装lodash.assign
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.assign#_assignobject-sources}
   */
  assign,
  /**
   * 浅拷贝，封装lodash.clone
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.clone#_clonevalue}
   */
  clone,
  /**
   * 深拷贝，封装lodash.cloneDeep
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.cloneDeep#_clonedeepvalue}
   */
  cloneDeep,
  findParentIdListInTree,
  /**
   * 返回一个组成聚合的对象，封装lodash.groupBy
   * @function
   * @see {@link https://www.lodashjs.com/docs/lodash.groupBy#_groupbycollection-iteratee_identity}
   */
  groupBy,
  /**
  * 检查 path 是否是object对象的直接或继承属性，封装lodash.hasIn
  * @function
  * @see {@link https://www.lodashjs.com/docs/lodash.hasIn}
  */
  hasIn,
  /**
  * 检查是否为一个空对象，集合，映射或者set，封装lodash.isEmpty
  * @function
  * @see {@link https://www.lodashjs.com/docs/lodash.isEmpty#_isemptyvalue}
  */
  isEmpty,
  /**
  * 执行深比较来确定两者的值是否相等，封装lodash.isEqual
  * @function
  * @see {@link https://www.lodashjs.com/docs/lodash.isEqual#_isequalvalue-other}
  */
  isEqual,
  /**
  * 数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性，封装lodash.merge
  * @function
  * @see {@link https://www.lodashjs.com/docs/lodash.merge}
  */
  merge,
  obj2url,
  /**
  * 这个方法一个对象，这个对象由忽略属性之外的object自身和继承的可枚举属性组成。（注：可以理解为删除object对象的属性），封装lodash.omit
  * @function
  * @see {@link https://www.lodashjs.com/docs/lodash.omit}
  */
  omit
}
