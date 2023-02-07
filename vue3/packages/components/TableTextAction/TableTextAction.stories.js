import { initProps } from '../../storybook/index'
import TableTextAction from './index.vue'

export default {
  title: 'Data数据处理/TableTextAction表格文字菜单',
  component: TableTextAction
}

const Template = (args, { argTypes }) => {
  return {
    setup() {
      return {
        args
      }
    },
    components: { TableTextAction },
    methods: {
      onAction(params) {
        console.log(params)
      }
    },
    template: `<table-text-action
        v-bind="args"
        @action="onAction"
    >
    </table-text-action>`
  }
}

export const 基础用法 = Template.bind({})
基础用法.args = {
  actions: [
    {
      name: '主要链接',
      type: 'primary',
      id: 'btn1'
    },
    {
      name: '成功链接',
      type: 'success',
      id: 'btn2'
    },
    {
      name: '警告链接',
      type: 'warning',
      id: 'btn3'
    },
    {
      name: '危险链接',
      type: 'danger',
      id: 'btn4'
    },
    {
      name: '信息链接',
      type: 'info',
      id: 'btn5'
    }
  ]
}

export const 不可点击 = Template.bind({})
不可点击.args = {
  actions: [
    {
      name: '主要链接',
      type: 'primary',
      id: 'btn1',
      disabled: true
    },
    {
      name: '成功链接',
      type: 'success',
      id: 'btn2',
      disabled: true
    },
    {
      name: '警告链接',
      type: 'warning',
      id: 'btn3',
      disabled: true
    },
    {
      name: '危险链接',
      type: 'danger',
      id: 'btn4',
      disabled: true
    },
    {
      name: '信息链接',
      type: 'info',
      id: 'btn5',
      disabled: true
    }
  ]
}
不可点击.parameters = {
  docs: {
    storyDescription: '不可点击'
  }
}

export const 下划线 = Template.bind({})
下划线.args = {
  actions: [
    {
      name: '主要链接',
      type: 'primary',
      id: 'btn1',
      underline: false
    },
    {
      name: '成功链接',
      type: 'success',
      id: 'btn2',
      underline: false
    },
    {
      name: '警告链接',
      type: 'warning',
      id: 'btn3',
      underline: false
    },
    {
      name: '危险链接',
      type: 'danger',
      id: 'btn4',
      underline: false
    },
    {
      name: '信息链接',
      type: 'info',
      id: 'btn5',
      underline: false
    }
  ]
}
下划线.parameters = {
  docs: {
    storyDescription: '无下划线'
  }
}

export const 图标 = Template.bind({})
图标.args = {
  actions: [
    {
      name: '主要链接',
      type: 'primary',
      id: 'btn1',
      icon: 'el-icon-edit'
    },
    {
      name: '成功链接',
      type: 'success',
      id: 'btn2',
      icon: 'el-icon-view'
    }
  ]
}
图标.parameters = {
  docs: {
    storyDescription: '带图标'
  }
}
