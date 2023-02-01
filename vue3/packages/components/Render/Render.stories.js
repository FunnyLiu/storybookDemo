import { initProps } from '../../storybook/index'
import DoRender from './index'

export default {
  title: 'Basic基础/Render渲染器',
  component: DoRender
}

const Template = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },
    components: { DoRender },
    data() {
      return {
        renderContent: (createElement, { name, age }) => {
          return createElement('span', `${name} ${age}，通过jsx自定义内容`)
        },
        params: {
          name: 'liufang',
          age: 30
        }
      }
    },
    template: `<div>
          <do-render :render="renderContent" :params="params"/>
        </div>`
  }
}

export const 基础用法 = Template.bind({})
基础用法.args = {
}
