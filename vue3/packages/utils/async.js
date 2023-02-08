/**
 * @module async
 */
import { Events } from './event'
/**
 * 延迟
 *
 * @example
 * import { sleep } from '@ccpow/devopslib/packages/utils/async'
 * async function sleepyWork() {
 *   console.log("I'm going to sleep for 1 second.");
 *   await sleep(1000);
 *   console.log('I woke up after 1 second.');
 * }
 *
 * @param {number} ms - 延迟毫秒数
 * @returns 延迟Promise
 */
export function sleep(ms, options = {}) {
  const { value = undefined } = options
  return new Promise(resolve => setTimeout(() => resolve(value), ms))
}
/**
 * 异步Promise队列
 * @class
 * @example
 * import { PQueue, sleep } from '@ccpow/devopslib/packages/utils/async'
 * const queue = new PQueue({
 *   autoStart:true, // 是否自动开始执行队列
 *   concurrency: 1 //队列执行并发数
 * });
 * let str = "";
 * queue.add(async () => {
 *   await sleep(20);
 *   str = str + 1;
 * });
 * queue.add(async () => {
 *   await sleep(30);
 *   str = str + 2;
 * });
 * queue.add(async () => {
 *   await sleep(10);
 *   str = str + 3;
 * });
 * // 同步方法监听
 * await queue.onIdle()//str=123;
 * // 通过事件监听
 * queue.on('idle',()=>str)//123
 * @param {Object} options 初始化参数
 * @param {boolean} options.autoStart 自动开始执行，默认为true
 * @param {number} options.concurrency 并发执行数，默认为Infinity
 * @returns {Object} 事件实例
 */
export class PQueue extends Events {
  constructor(options) {
    super()
    this.pendingCount = 0
    this.intervalCount = 0
    this.intervalEnd = 0
    options = Object.assign({ autoStart: true, concurrency: Infinity, intervalCap: Infinity, interval: 0 }, options)
    this.isPaused = options.autoStart === false
    this.concurrency = options.concurrency
    this.queue = []
    this.isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0
    this.intervalCap = options.intervalCap
    this.interval = options.interval
  }
  get doesIntervalAllowAnother() {
    return this.isIntervalIgnored || this.intervalCount < this.intervalCap
  }
  get doesConcurrentAllowAnother() {
    return this.pendingCount < this.concurrency
  }
  isIntervalPaused() {
    const now = Date.now()
    if (this.intervalId === undefined) {
      const delay = this.intervalEnd - now
      if (delay < 0) {
        this.intervalCount = 0
      } else {
        if (this.timeoutId === undefined) {
          this.timeoutId = setTimeout(() => {
            this.onResumeInterval()
          }, delay)
        }
        return true
      }
    }
    return false
  }
  onResumeInterval() {
    this.onInterval()
    this.initializeIntervalIfNeeded()
    this.timeoutId = undefined
  }
  initializeIntervalIfNeeded() {
    if (this.isIntervalIgnored || this.intervalId !== undefined) {
      return
    }
    this.intervalId = setInterval(() => {
      this.onInterval()
    }, this.interval)
    this.intervalEnd = Date.now() + this.interval
  }
  onInterval() {
    if (this.intervalCount === 0 && this.pendingCount === 0 && this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }
    this.intervalCount = 0
    this.processQueue()
  }
  tryToStartAnother() {
    if (this.queue.length === 0) {
      if (this.pendingCount === 0) {
        this.emit('idle')
      }
      return false
    }
    // 未暂停则继续执行
    if (!this.isPaused) {
      const canInitializeInterval = !this.isIntervalPaused()
      if (this.doesIntervalAllowAnother && this.doesConcurrentAllowAnother) {
        this.emit('active')
        this.dequeue()()
        // 如果开启了节流
        if (canInitializeInterval) {
          this.initializeIntervalIfNeeded()
        }
        return true
      }
    }
    return false
  }
  next() {
    this.pendingCount--
    this.tryToStartAnother()
  }
  enqueue({ run }) {
    this.queue.push({ run })
  }
  dequeue() {
    const item = this.queue.shift()
    return item === null || item === void 0 ? void 0 : item.run
  }
  // while的调用tryToStartAnother，直到其返回false
  processQueue() {
    // eslint-disable-next-line no-empty
    while (this.tryToStartAnother()) { }
  }
  start() {
    if (!this.isPaused) {
      return this
    }
    // 将暂停置为false
    this.isPaused = false
    this.processQueue()
    return this
  }
  // 设置暂停
  pause() {
    this.isPaused = true
  }
  add(fn) {
    return new Promise((resolve, reject) => {
      const run = async() => {
        // 未决的promise数量+1
        this.pendingCount++
        this.intervalCount++
        try {
          // 执行传入的promise
          resolve(await fn())
        } catch (error) {
          reject(error)
        }
        // 调用next
        this.next()
      }
      // 将封装好的函数加入queue
      this.enqueue({ run })
      this.tryToStartAnother()
    })
  }
  addAll(fns) {
    return Promise.all(fns.map(async(fn) => this.add(fn)))
  }
  onIdle() {
    return new Promise((resolve, reject) => {
      this.on('idle', () => resolve())
    })
  }
  clear() {
    this.queue = []
    this.pendingCount = 0
    return true
  }
  size() {
    return this.queue.length
  }
  get pending() {
    return this.pendingCount
  }
}
