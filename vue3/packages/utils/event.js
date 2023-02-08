/**
 * 事件基础类
 * @module event
 */
/**
 * 事件基础类
 * @class
 * @example
 * import { Events } from '@ccpow/devopslib/packages/utils/event'
 * const e = new Events();
 * e.once('foo',data=>data);//只监听一次
 * function foo() {}
 * function bar() {}
 * function baz() {}
 * e.on('foo', foo);
 * e.on('bar', bar);
 * e.on('bar', baz);
 * e.clear('foo');//清除一个key上所有事件回调
 * e.clear('bar',bar);//清除一个key上指定事件回调
 * e.clear();//清除所有key所有事件回调
 * @returns {Object} 事件实例
 */
class Events {
  constructor() {
    this.events = new Map()
    this.eventsCount = 0
  }
  on(event, fn, context = this) {
    return this.addEventListener(event, fn, context, false)
  }
  once(event, fn, context = this) {
    return this.addEventListener(event, fn, context, true)
  }
  addEventListener(event, fn, context, once) {
    if (typeof fn != 'function') {
      throw new TypeError('The listener must be a function')
    }
    const listeners = this.events.get(event) || []
    listeners.push({
      fn,
      context,
      once
    })
    this.eventsCount++
    this.events.set(event, listeners)
  }
  removeListener(event, fn) {
    if (!this.events.has(event)) return false
    const alreadyListeners = this.events.get(event) || []
    let newListeners = []
    if (!fn) {
      this.events.delete(event)
      this.eventsCount = this.eventsCount - alreadyListeners.length
    } else {
      newListeners = alreadyListeners.filter((listener) => {
        return listener.fn !== fn
      })
      if (newListeners.length === 0) {
        this.events.delete(event)
        this.eventsCount = this.eventsCount - alreadyListeners.length
      } else {
        this.events.set(event, newListeners)
        this.eventsCount =
          this.eventsCount - (alreadyListeners.length - newListeners.length)
      }
    }
    return true
  }
  emit(event, ...args) {
    if (!this.events.has(event)) return false
    const listeners = this.events.get(event)
    listeners === null || listeners === void 0
      ? void 0
      : listeners.map((listener) => {
        if (listener === null || listener === void 0 ? void 0 : listener.fn) {
          if (listener.once) {
            this.removeListener(event, listener.fn)
          }
          listener.fn.call(listener.context, ...args)
        }
      })
  }
  listeners(event) {
    const listeners = this.events.get(event) || []
    return listeners.map((listener) => listener.fn)
  }
  clear(event, fn) {
    if (event) {
      this.removeListener(event, fn)
      return true
    }
    this.clearAll()
    return true
  }
  clearAll() {
    this.events.clear()
  }
  size() {
    return this.eventsCount
  }
}

export { Events }
