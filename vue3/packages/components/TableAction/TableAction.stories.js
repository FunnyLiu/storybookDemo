import '../../storybook'
import TableAction from './index.vue'
export default {
  title: 'Data数据处理/TableAction表格菜单',
  component: TableAction
}

const Template = (args, { argTypes }) => ({
  setup() {
    return {
      args
    }
  },
  components: { TableAction },
  template: `<table-action
    v-bind="args"
    @action="action"
/>`
})

export const 基础用法 = Template.bind({})
基础用法.args = {
  icon: 'faxian',
  actions: [
    { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
    { id: 'svn', name: 'svn', hidden: false, icon: 'svn' },
    { id: 'chart', name: '数据报表', hidden: false, icon: 'chart' }
  ],
  row: {
  },
  status: 0,
  dropdownDisable: false,
  clickHide: true
}

export const 分割线 = Template.bind({})
分割线.args = {
  icon: 'faxian',
  actions: [
    { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
    { id: 'svn', name: 'svn', hidden: false, icon: 'svn', divided: true },
    { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', divided: true }
  ],
  row: {
  },
  status: 0,
  dropdownDisable: false,
  clickHide: true
}
分割线.parameters = {
  docs: {
    storyDescription: '分隔线'
  }
}
export const 不可点击 = Template.bind({})
不可点击.args = {
  icon: 'faxian',
  actions: [
    { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
    { id: 'svn', name: 'svn', hidden: false, icon: 'svn', disabled: true },
    { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', disabled: true }
  ],
  row: {
  },
  status: 0,
  dropdownDisable: false,
  clickHide: true
}
不可点击.parameters = {
  docs: {
    storyDescription: '不可点击'
  }
}

export const 小提示 = Template.bind({})
小提示.args = {
  icon: 'caidans',
  actions: [
    { id: 'intoProject', name: '进入项目', hidden: false, icon: 'faxian', explain: '进入项目详情，查看项目内容' },
    { id: 'svn', name: 'svn', hidden: false, icon: 'svn', disabled: true },
    { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', disabled: true, explain: '进入报表，查看项目内容' }
  ],
  row: {
  },
  status: 0,
  dropdownDisable: false,
  clickHide: true
}
小提示.parameters = {
  docs: {
    storyDescription: '描述信息'
  }
}

export const 带子菜单 = Template.bind({})
带子菜单.args = {
  icon: 'caidans',
  actions: [
    { id: 'intoProject', name: '进入项目', hidden: false, icon: 'faxian', explain: '进入项目详情，查看项目内容' },
    { id: 'svn', name: 'svn', hidden: false, icon: 'svn', disabled: true },
    { id: 'chart', name: '数据报表', hidden: false, icon: 'chart',
      children: [
        { id: 'intoProject', name: '进入项目', hidden: false, icon: 'faxian', explain: '进入项目详情，查看项目内容' },
        { id: 'svn', name: 'svn', hidden: false, icon: 'svn', disabled: true }
      ] }
  ],
  row: {
  },
  status: 0,
  dropdownDisable: false,
  clickHide: true
}
带子菜单.parameters = {
  docs: {
    storyDescription: '带子菜单'
  }
}
