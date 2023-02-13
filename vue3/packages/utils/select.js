/**
 * 选中
 * @module select
 */
/**
 * 获取光标选中内容
 * @return {string} 光标选中的字符串
 * @example
 * import { getSelectedText } from "@ccpow/devopslib/packages/utils/select";
 * getSelectedText()
 */
const getSelectedText = () => {
  let text = ''
  if (window.getSelection) {
    text = window.getSelection().toString()
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text
  }
  return text
}
export {
  getSelectedText
}
