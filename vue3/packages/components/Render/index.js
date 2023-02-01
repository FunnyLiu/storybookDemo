/*
 * @FileName: Render.js
 * @Author: liufang
 * @Date: 2022-07-12 17:58:49
 * @Description: 自定义渲染组件，用来渲染任何组件
 */
import { h } from 'vue'
/**
 * 无缝滚动列表组件
 *
 * 数据改变后，手动调用reset来重载动画
 *
 * @example
 * ```
 *{
 *    props: initProps(args),
 *
 *    components: { DoRender },
 *    data() {
 *      return {
 *        renderContent: (createElement, { name, age }) => {
 *          return createElement('span', `${name} ${age}，通过jsx自定义内容`)
 *        },
 *        params: {
 *          name: 'liufang',
 *          age: 30
 *        }
 *      }
 *    },
 *    template: `<div>
 *          <do-render :render="renderContent" :params="params"/>
 *        </div>`
 *  }
 *}
 * ```
 */
export default {
  name: 'Render',
  functional: true,
  props: {
    render: Function,
    params: Object
  },
  render: ({ render, params }) => {
    return render(h, params)
  }
}
