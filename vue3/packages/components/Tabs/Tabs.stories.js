import { initProps } from '../../storybook/index'
import DoTabs from './index.vue'

export default {
  title: 'Data数据处理/Tabs标签切换',
  component: DoTabs
}

const Template = (args, { argTypes }) => ({
  setup(){
    return {
      args
    }
  },  
  // props: initProps(args),
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  components: { DoTabs },
  template: `<div>
    <do-tabs  v-bind="args" @tab-click="handleClick"/>
  </div>`
})
export const 基础用法 = Template.bind({})
基础用法.args = {
  modelValue: 'first',
  tabs: [
    {
      label: '用户管理',
      name: 'first',
      content: '用户管理'
    },
    {
      label: '配置管理',
      name: 'second',
      content: '配置管理'
    },
    {
      label: '角色管理',
      name: 'third',
      content: '角色管理'
    },
    {
      label: '定时任务补偿',
      name: 'fourth',
      content: '定时任务补偿'
    }
  ]
}

export const 卡片样式 = Template.bind({})
卡片样式.args = {
  type: 'card',
  modelValue: 'first',
  tabs: [
    {
      label: '用户管理',
      name: 'first',
      content: '用户管理'
    },
    {
      label: '配置管理',
      name: 'second',
      content: '配置管理'
    },
    {
      label: '角色管理',
      name: 'third',
      content: '角色管理'
    },
    {
      label: '定时任务补偿',
      name: 'fourth',
      content: '定时任务补偿'
    }
  ]
}
卡片样式.parameters = {
  docs: {
    storyDescription:
      '选项卡样式的标签页。只需要设置 type 属性为 card 就可以使选项卡改变为标签风格。'
  }
}

export const 边框卡片 = Template.bind({})
边框卡片.args = {
  type: 'border-card',
  modelValue: 'first',
  tabs: [
    {
      label: '用户管理',
      name: 'first',
      content: '用户管理'
    },
    {
      label: '配置管理',
      name: 'second',
      content: '配置管理'
    },
    {
      label: '角色管理',
      name: 'third',
      content: '角色管理'
    },
    {
      label: '定时任务补偿',
      name: 'fourth',
      content: '定时任务补偿'
    }
  ]
}
边框卡片.parameters = {
  docs: {
    storyDescription: '卡片化的标签页。将type设置为border-card。'
  }
}

export const 标签位置 = Template.bind({})
标签位置.args = {
  tabPosition: 'left',
  modelValue: 'first',
  tabs: [
    {
      label: '用户管理',
      name: 'first',
      content: '用户管理'
    },
    {
      label: '配置管理',
      name: 'second',
      content: '配置管理'
    },
    {
      label: '角色管理',
      name: 'third',
      content: '角色管理'
    },
    {
      label: '定时任务补偿',
      name: 'fourth',
      content: '定时任务补偿'
    }
  ]
}
标签位置.parameters = {
  docs: {
    storyDescription:
      '可以通过 tab-position 设置标签的位置。标签一共有四个方向的设置 tabPosition="left|right|top|bottom"'
  }
}

export const 自定义标签 = Template.bind({})
自定义标签.args = {
  modelValue: 'first',
  tabs: [
    {
      label: '用户管理',
      name: 'first',
      render: (createElement) => {
        return createElement(
          'span',
          {
            slot: 'label'
          },
          [
            createElement('i', {
              class: 'el-icon-date'
            }),
            '自定义tabname'
          ]
        )
      }
    },
    {
      label: '配置管理',
      name: 'second',
      content: '配置管理'
    },
    {
      label: '角色管理',
      name: 'third',
      content: '角色管理'
    },
    {
      label: '定时任务补偿',
      name: 'fourth',
      content: '定时任务补偿'
    }
  ]
}
自定义标签.parameters = {
  docs: {
    storyDescription: '可以通过具名 slot 来实现自定义标签页的内容'
  }
}
const Template2 = (args, { argTypes }) => ({
  // props: initProps(args),
  setup(){
    return {
      args
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  components: { DoTabs },
  template: `<div>
    <do-tabs  v-bind="args" @tab-click="handleClick">
      <template #label1>
        这里是自定义的slot内容
      </template>
    </do-tabs>

    </div>`
})

export const 自定义内容Render = Template.bind({})
自定义内容Render.args = {
  modelValue: 'first',
  tabs: [
    {
      label: '用户管理',
      name: 'first',
      render: (createElement) => {
        return createElement(
          'span',
          [
            createElement('i', {
              class: 'el-icon-date'
            }),
            '自定义tabContent，最推荐的用法，最好是每个tab内容都封装为子组件来解耦'
          ]
        )
      }
    },
    {
      label: '配置管理',
      name: 'second',
      content: '配置管理'
    },
    {
      label: '角色管理',
      name: 'third',
      content: '角色管理'
    },
    {
      label: '定时任务补偿',
      name: 'fourth',
      content: '定时任务补偿'
    }
  ]
}
自定义内容Render.parameters = {
  docs: {
    storyDescription: '通过render函数自定义tab内容，最推荐的用法，最好是每个tab内容都封装为子组件来解耦'
  }
}
export const 自定义内容Slot = Template2.bind({})
自定义内容Slot.args = {
  type: 'border-card',
  modelValue: 'first',
  tabs: [
    {
      label: '用户管理',
      name: 'first',
      slot: 'label1'
    },
    {
      label: '配置管理',
      name: 'second',
      content: '配置管理'
    },
    {
      label: '角色管理',
      name: 'third',
      content: '角色管理'
    },
    {
      label: '定时任务补偿',
      name: 'fourth',
      content: '定时任务补偿'
    }
  ]
}
自定义内容Slot.parameters = {
  docs: {
    storyDescription: '通过slot自定义tab内容'
  }
}
const Template3 = (args, { argTypes }) => ({
  // props: initProps(args),
  setup(){
    return {args}
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        const newTabName = ++this.tabIndex + ''
        this.tabs.push({
          label: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        })
        this.modelValue = newTabName
      }
      if (action === 'remove') {
        const tabs = this.tabs
        let modelValue = this.modelValue
        if (modelValue === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                modelValue = nextTab.name
              }
            }
          })
        }

        this.modelValue = modelValue
        this.tabs = tabs.filter(tab => tab.name !== targetName)
      }
    }
  },
  data() {
    return {
      type: 'card',
      modelValue: '1',
      tabIndex: 2,
      tabs: [
        {
          label: 'Tab1',
          name: '1',
          content: 'Tab1 content'
        }, {
          label: 'Tab2',
          name: '2',
          content: 'Tab2 content'
        }
      ]
    }
  },
  components: { DoTabs },
  template: `<div>
      <do-tabs type="card" :model-value="modelValue" :tabs="tabs" editable @edit="handleTabsEdit" @tab-click="handleClick"/>
    </div>`
})
export const 增减标签 = Template3.bind({})
增减标签.args = {}
增减标签.parameters = {
  docs: {
    storyDescription: '增减标签页按钮只能在选项卡样式的标签页下使用。'
  }
}
