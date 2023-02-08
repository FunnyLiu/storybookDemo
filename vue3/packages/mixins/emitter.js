function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function(child) {
    const name = child.$options.componentName

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
/**
 * 透传事件通信，实现参考了element，慎用（这种通信，会增加组合和父子的耦合程度）
 */
export default {
  methods: {
    /**
     * 往祖先某个组件抛出事件通信
     * @param {string} componentName 祖先组件名称
     * @param {string} eventName 事件名称
     * @param  {...any} rest 参数
     */
    dispatch(componentName, eventName, ...rest) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(rest))
      }
    },
    /**
     * 往后代某个子组件抛出事件通信
     * @param {string} componentName 后代组件名称
     * @param {string} eventName 事件名称
     * @param  {...any} rest 参数
     */
    broadcast: function broadcast(componentName, eventName, ...rest) {
      _broadcast.call(this, componentName, eventName, ...rest)
    }
  }
}
