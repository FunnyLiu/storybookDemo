import { initProps } from '../../storybook/index'
import DoEmpty from './index.vue'

export default {
  title: 'Show展示/Empty空态',
  component: DoEmpty
}
const Template = (args, { argTypes }) => ({
  props: initProps(args),
  components: { DoEmpty },
  template: `<div>
        <do-empty v-bind="$props"/>
    </div>`
})

export const 基础用法 = Template.bind({})
基础用法.args = {}

export const 自定义文案 = Template.bind({})
自定义文案.args = {
  text: '自定义文案，通过text属性传入即可'
}
自定义文案.parameters = {
  docs: {
    storyDescription: '自定义文案，通过text属性传入即可'
  }
}

const Template2 = (args, { argTypes }) => ({
  props: initProps(args),
  components: { DoEmpty },
  template: `<div style="height: 400px; width: 400px; background: yellow">
          <do-empty v-bind="$props"/>
      </div>`
})

export const 自定义宽高 = Template2.bind({})
自定义宽高.args = {}
自定义宽高.parameters = {
  docs: {
    storyDescription: '组件宽高是百分百的，故而通过样式控制外层容器宽高即可'
  }
}

const Template3 = (args, { argTypes }) => ({
  props: initProps(args),
  components: { DoEmpty },
  data() {
    return {
      list: [
        { text: 'type为0，也就是默认值，办公室场景', type: 0 },
        { text: 'type为1，数据场景', type: 1 },
        { text: 'type为2，手机场景', type: 2 },
        { text: 'type为3，数据场景1', type: 3 },
        { text: 'type为4，404类型', type: 4 }
      ]
    }
  },
  template: `<div style="display:flex;flex-wrap: wrap">
    <div v-for="item in list">
        <do-empty v-bind="item"/>
    </div></div>`
})

export const 全量type = Template3.bind({})
全量type.args = {}
全量type.parameters = {
  docs: {
    storyDescription: '不同type不同图片'
  }
}

