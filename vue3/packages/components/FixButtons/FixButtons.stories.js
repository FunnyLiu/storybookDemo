import { initProps } from '../../storybook/index'
import FixButtons from './index.vue'

export default {
  title: 'Show展示/FixButtons悬浮按钮',
  component: FixButtons
}

const Template = (args, { argTypes }) => {
  return {
    // props: initProps(args),
    setup() {
      return { args }
    },
    components: { FixButtons },
    data() {
      return {
      }
    },
    template: `<div style="height:3900px;background:red;">
          <fix-buttons v-bind="args" />
        </div>`
  }
}

export const 基础用法 = Template.bind({})
基础用法.args = {
  actions: [
    {
      id: 'change',
      name: '切换迭代',
      style: 'font-size: 12px;width: 30px;text-align: center;'
    }
  ]
}

export const 多个按钮 = Template.bind({})
多个按钮.args = {
  actions: [
    {
      id: 'change',
      name: '切换',
      style: 'font-size: 12px;width: 30px;text-align: center;'
    },
    {
      id: 'change',
      name: '切换1',
      style: 'font-size: 12px;width: 30px;text-align: center;'
    },
    {
      id: 'change',
      name: '切换2',
      style: 'font-size: 12px;width: 30px;text-align: center;'
    }
  ]
}
多个按钮.parameters = {
  docs: {
    storyDescription: '多个按钮存在串行动画效果'
  }
}

export const 图标 = Template.bind({})
图标.args = {
  actions: [
    {
      id: 'change',
      name: '切换',
      icon: 'refresh'
    },
    {
      id: 'change',
      name: '切换1',
      icon: 'refresh'
    },
    {
      id: 'change',
      icon: 'refresh'
    }
  ]
}
图标.parameters = {
  docs: {
    storyDescription: '通过icon字段指定图标'
  }
}
