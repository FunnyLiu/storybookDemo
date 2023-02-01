import { initProps } from '../../storybook/index'
import DoObjectDetail from './index.vue'

export default {
  title: 'Show展示/ObjectDetail对象内容展示',
  component: DoObjectDetail
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  methods: {},
  components: { DoObjectDetail },
  template: `<div>
      <do-object-detail v-bind="args" />
    </div>`
})

export const 基础用法 = Template.bind({})
基础用法.args = {
  list: [
    {
      key: '名称',
      value: '刘放'
    },
    {
      key: '名称2',
      value: '陈奕壮'
    },
    {
      key: '名称3',
      value: '李如美'
    },
    {
      key: '名称4',
      value: '刘博文'
    },
    {
      key: '隐藏的名称',
      value: '刘放'
    }
  ]
}

export const 复杂多层级数据 = Template.bind({})
复杂多层级数据.args = {
  list: [
    {
      key: '名称',
      value: '刘放'
    },
    {
      key: '名称2',
      value: '陈奕壮'
    },
    {
      key: '名称3',
      value: '李如美'
    },
    {
      key: '名称4',
      value: '刘博文'
    },
    {
      key: '隐藏的名称',
      value: '刘放',
      show: false
    }
  ],
  complexList: [
    {
      key: '复杂数据key1',
      value: [
        {
          key: '复杂列1',
          value: '复杂列数据'
        },
        {
          key: '复杂列2',
          value: '复杂列数据2'
        },
        {
          key: '复杂列3',
          value: '复杂列数据3'
        }
      ]
    },
    {
      key: '复杂数据key2',
      value: [
        {
          key: '复杂列1',
          value: '复杂列数据'
        },
        {
          key: '复杂列2',
          value: '复杂列数据2'
        },
        {
          key: '复杂列3',
          value: '复杂列数据3'
        },
        {
          key: '复杂列4',
          value: '复杂列数据4'
        }
      ]
    },
    {
      key: '复杂数据key3',
      value: [
        {
          key: '复杂列1',
          value: '复杂列数据'
        }
      ]
    },
    {
      key: '复杂数据key4',
      value: []
    }
  ]
}
复杂多层级数据.parameters = {
  docs: {
    storyDescription: '通过complexList来展示多层级的数据结构'
  }
}
