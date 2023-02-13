/**
 * 右键菜单
 * @module contextmenu
 */
import { createApp } from 'vue'
import component from '../components/ContextMenu'
import { CLASS_MENU, CLASS_MENU_ITEM, CLASS_MENU_ITEM_UNCLICKABLE } from '../components/ContextMenu/constant'
function getElementsByClassName(className) {
  const els = []
  for (const el of document.getElementsByClassName(className) || []) {
    els.push(el)
  }
  return els
}
class Contextmenu {
  constructor(options) {
    this.instance = createApp(component, {
      items: options.items,
      position: {
        x: options.event && options.event.clientX || options.x || 0,
        y: options.event && options.event.clientY || options.y || 0,
        width: 0,
        height: 0
      },
      outStyle: {
        left: 0,
        top: 0,
        zIndex: options.zIndex || 2,
        minWidth: options.minWidth || 150
      },
      customClass: options.customClass
    })
    this.dom = document.createElement('div')
    document.body.appendChild(this.dom)
    this.instance.mount(this.dom)
    this.addListener()
  }

  mousewheelListener(e) {
    this.close()
  }

  mouseDownListener(e) {
    let el = e.target
    const menus = getElementsByClassName(CLASS_MENU)
    while (!menus.find(m => m === el) && el.parentElement) {
      el = el.parentElement
    }
    if (!menus.find(m => m === el)) {
      this.close()
    }
  }

  mouseClickListener(e) {
    let el = e.target
    const menus = getElementsByClassName(CLASS_MENU)
    const menuItems = getElementsByClassName(CLASS_MENU_ITEM)
    const unclickableMenuItems = getElementsByClassName(CLASS_MENU_ITEM_UNCLICKABLE)
    while (
      !menus.find(m => m === el) &&
      !menuItems.find(m => m === el) &&
      el.parentElement
    ) {
      el = el.parentElement
    }
    if (menuItems.find(m => m === el)) {
      if (e.button !== 0 || unclickableMenuItems.find(m => m === el)) {
        return
      }
      this.close()
      return
    }
    if (!menus.find(m => m === el)) {
      this.close()
    }
  }

  addListener() {
    this.mouseClickListenerProxy = (e) => this.mouseClickListener(e)
    this.mouseDownListenerProxy = (e) => this.mouseDownListener(e)
    this.mousewheelListenerProxy = (e) => this.mousewheelListener(e)

    document.addEventListener('click', this.mouseClickListenerProxy)
    document.addEventListener('mousedown', this.mouseDownListenerProxy)
    document.addEventListener('mousewheel', this.mousewheelListenerProxy)
  }

  removeListener() {
    document.removeEventListener('click', this.mouseClickListenerProxy)
    document.removeEventListener('mousedown', this.mouseDownListenerProxy)
    document.removeEventListener('mousewheel', this.mousewheelListenerProxy)
  }

  close() {
    this.removeListener()
    // this.instance.unmount()
    contextmenu.destroy()
  }
}
let last = null
let lastArray = []
/**
 * 右键菜单（需要配合dom的contextmenu事件完成）
 * @param {Object} options 初始化参数
 * @param {Object[]} options.items 菜单列表
 * @param {string} options.items.label 名称
 * @param {boolean} options.items.disabled 是否禁用
 * @param {function} options.items.onClick 点击事件
 * @param {Object} options.event 时间透传
 * @param {number} options.zIndex 索引
 * @param {number} options.minWidth 最小宽度
 * @example
 * import { contextmenu } from "@ccpow/devopslib/packages/utils/contextmenu";
 * // 指定dom的右键事件
 * dom.oncontextmenu = (event) => {
 *   event.preventDefault()
 *   // 唤起菜单
 *   contextmenu({
 *     items: [
 *       {
 *         label: '复制',
 *         disabled: !content,
 *         onClick: () => {
 *           // do something
 *         }
 *       },
 *       {
 *         label: '粘贴',
 *         disabled: !this.clipboardContent,
 *         onClick: () => {
 *           // do something
 *         }
 *       }
 *     ],
 *     event,
 *     zIndex: 3,
 *     minWidth: 140
 *   })
 * }
 */
const contextmenu = function(options) {
  contextmenu.destroy()
  last = new Contextmenu(options)
  lastArray.push(last.instance)
}
contextmenu.destroy = function() {
  if(lastArray && lastArray.length) {
    lastArray.forEach(item => {
      item.unmount()
    })
    lastArray = []
  }
}
export {
  contextmenu,
  lastArray,
  component
}
