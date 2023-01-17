import { debounce } from '../utils/func'
const shouldExecCallback = ({ strategy, entry, width, height }) => {
  if (strategy == 'width' && width !== entry.contentRect.width) {
    return true
  }
  if (strategy == 'height' && height !== entry.contentRect.height) {
    return true
  }
  if (strategy == 'widthAndHeight' && (height !== entry.contentRect.height && width !== entry.contentRect.width)) {
    return true
  }
  if (strategy == 'widthOrHeight' && (height !== entry.contentRect.height || width !== entry.contentRect.width)) {
    return true
  }
  return false
}
// 自动注册到全局
const resizeDirective = {
  inserted(el, binding) {
    // 放到最前面判断，不需要多余执行额外逻辑
    if (!window.ResizeObserver) {
      console.warn('该浏览器不支持ResizeObserver(API),故而v-resizeDirective指令使用无效')
      return
    }
    // 策略
    // width为只考虑宽度
    // height为只考虑高度
    // widthAndHeight为宽度、高度均需改变才执行
    // widthOrHeight为宽度、高度某个改变就执行
    const strategy = binding.value.stargegy || 'width'
    const time = binding.value.time || 500
    let width = el.scrollWidth
    let height = el.scrollHeight
    const callback = debounce(entries => {
      entries.forEach(entry => {
        if (shouldExecCallback({ strategy, entry, width, height })) {
          // 关键(这传入的是函数,所以执行此函数)
          binding.value.callback({ width: entry.contentRect.width, height: entry.contentRect.height })
        }
        width = entry.contentRect.width
        height = entry.contentRect.height
      })
    }, time)
    const myObserver = new ResizeObserver(callback)
    myObserver.observe(el)
  }
}

export {
  resizeDirective
}
