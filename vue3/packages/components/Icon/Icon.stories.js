import { initProps } from '../../storybook/index'
import doIcon from './index.vue'

export default {
  title: 'Basic基础/Icon图标',
  component: doIcon
}

const Template = (args, { argTypes }) => ({
  // props: initProps(args),
  components: { doIcon },
  setup() {
    return { args }
  },
  template: `<do-icon
    v-bind="args"
    >
  </do-icon>`
})
export const 基础用法 = Template.bind({})
基础用法.args = {
  iconClass: 'faxian'
}
export const 颜色 = Template.bind({})
颜色.args = {
  iconClass: 'faxian',
  color: 'blue'
}
颜色.parameters = {
  docs: {
    storyDescription: '自定义颜色'
  }
}
export const 尺寸 = Template.bind({})
尺寸.args = {
  iconClass: 'faxian',
  size: '40px'
}
尺寸.parameters = {
  docs: {
    storyDescription: '自定义大小'
  }
}
export const 自定义样式 = Template.bind({})
自定义样式.args = {
  iconClass: 'faxian',
  customStyle: {
    backgroundColor: 'green',
    height: '20px',
    width: '40px'
  }
}
自定义样式.parameters = {
  docs: {
    storyDescription: '深度自定义样式'
  }
}
export const 彩色 = Template.bind({})
彩色.args = {
  iconClass: 'color-music',
  size: '40px'
}
彩色.parameters = {
  docs: {
    storyDescription: '彩色图标'
  }
}
