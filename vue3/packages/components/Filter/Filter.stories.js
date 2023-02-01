import { initProps } from '../../storybook/index'
import DoFilter from './index.vue'
import dayjs from 'dayjs'
export default {
  title: 'Data数据处理/Filter搜索操作条',
  component: DoFilter
}

const Template = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },

    components: { DoFilter },
    methods: {
      filtered(query) {
        if (query.key === 'clear') {
          this.$refs.filter.reset()
        }
        console.log(query.key, 'key')
      }
    },
    template: `<div>
          <do-filter ref="filter" v-bind="args" @filtered="filtered" />
        </div>`
  }
}

export const 基础用法 = Template.bind({})
基础用法.args = {
  filters: [
    {
      type: 'select',
      prop: 'myCity',
      options: [
        {
          value: '上海',
          display: '上海'
        },
        {
          value: '北京',
          display: '北京'
        },
        {
          value: '武汉',
          display: '武汉'
        }
      ]
    },
    {
      type: 'input',
      prop: 'myLocation',
      label: '地址',
      placeholder: '地址',
      icon: true
    },
    {
      type: 'date',
      prop: 'myDate'
    },
    {
      type: 'primary',
      id: 'search',
      name: '查询'
    },
    {
      type: 'button',
      id: 'clear',
      name: '清除'
    }
  ]
}

export const 下拉选择 = Template.bind({})
下拉选择.args = {
  filters: [
    {
      type: 'select',
      value: '武汉',
      name: '城市名称',
      prop: 'cityName1',
      clearable: true,
      disabled: true,
      options: [
        {
          value: '上海',
          display: '上海'
        },
        {
          value: '北京',
          display: '北京'
        },
        {
          value: '武汉',
          display: '武汉'
        }
      ]
    },
    {
      type: 'select',
      value: '武汉',
      name: '城市名称',
      prop: 'cityName2',
      clearable: true,
      options: [
        {
          value: '上海',
          display: '上海'
        },
        {
          value: '北京',
          display: '北京',
          disabled: true
        },
        {
          value: '武汉',
          display: '武汉'
        }
      ]
    },
    {
      type: 'select',
      value: '中国',
      name: '国家名称',
      prop: 'countryName',
      label: '国家名称',
      clearable: true,
      options: [
        {
          value: '美国',
          display: '美国'
        },
        {
          value: '中国',
          display: '中国'
        },
        {
          value: '法国',
          display: '法国'
        }
      ]
    }
  ]
}
下拉选择.parameters = {
  docs: {
    storyDescription: 'Select类型'
  }
}

export const 级联 = Template.bind({})
级联.args = {
  filters: [
    {
      type: 'cascader',
      value: '武汉',
      name: '城市名称',
      prop: 'cascader3',
      clearable: true,
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }, {
      type: 'cascader',
      value: '武汉',
      name: '城市名称',
      prop: 'cascader1',
      props: {
        checkStrictly: true
      },
      clearable: true,
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }, {
      type: 'cascader',
      value: '武汉',
      props: {
        checkStrictly: true,
        multiple: true
      },
      name: '城市名称',
      prop: 'cascader2',
      clearable: true,
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }
  ]
}
级联.parameters = {
  docs: {
    storyDescription: 'Cascader类型'
  }
}
export const 日期 = Template.bind({})
日期.args = {
  filters: [
    {
      type: 'daterange',
      prop: 'date1'
    },
    {
      type: 'daterange',
      label: '第二个时间范围选择器',
      valueFormat: 'yyyy年-MM月-dd日',
      prop: 'date3'
    },
    {
      type: 'daterange',
      label: '带快速选择器',
      prop: 'date5',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    },
    {
      type: 'monthrange',
      label: '月度范围选择器',
      prop: 'month1'
    },
    {
      type: 'datetimerange',
      label: '时间点范围选择',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
      prop: 'time1'
    },
    {
      type: 'year',
      label: '年份选择',
      valueFormat: 'yyyy',
      prop: 'year1'
    },
    {
      type: 'month',
      label: '月份选择',
      valueFormat: 'yyyy-MM',
      prop: 'month1'
    },
    {
      type: 'date',
      label: '日期选择',
      valueFormat: 'yyyy-MM-dd',
      prop: 'dateSingle1'
    },
    {
      type: 'dates',
      label: '日期多个选择',
      valueFormat: 'yyyy-MM-dd',
      prop: 'dateSingle2'
    },
    {
      type: 'week',
      label: '星期选择',
      valueFormat: 'yyyy-MM-dd',
      prop: 'week1'
    },
    {
      type: 'datetime',
      label: '时间选择',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
      prop: 'datetime1'
    }
  ]
}
日期.parameters = {
  docs: {
    storyDescription: '各种时间选择'
  }
}

const Template2 = (args, { argTypes }) => {
  return {
    props: initProps(args),
    data() {
      return {}
    },
    components: { DoFilter },
    methods: {
      filtered(query) {
        if (query.key === 'clear') {
          this.$refs.filter.reset()
        }
      }
    },
    template: `<div>
          <do-filter ref="filter" :filters="filters" @filtered="filtered" />
        </div>`
  }
}

export const 时间段按钮 = Template2.bind({})
时间段按钮.args = {
  filters: [
    {
      type: 'daterange',
      prop: 'date1'
    },
    {
      type: 'daterange',
      prop: 'date2',
      subType: 'datepickerButton',
      name: '最近一周',
      pickerOptions: {
        firstDayOfWeek: 1,
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [dayjs(start).format('YYYY-MM-DD'), dayjs(end).format('YYYY-MM-DD'), '最近一周'])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [dayjs(start).format('YYYY-MM-DD'), dayjs(end).format('YYYY-MM-DD'), '最近一个月'])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [dayjs(start).format('YYYY-MM-DD'), dayjs(end).format('YYYY-MM-DD'), '最近三个月'])
            }
          }
        ]
      }
    }
  ]
}
时间段按钮.parameters = {
  docs: {
    storyDescription: '时间按钮'
  }
}

export const 输入框 = Template.bind({})
输入框.args = {
  filters: [
    {
      type: 'input',
      prop: 'value1'
    },
    {
      type: 'input',
      prop: 'value2',
      clearable: true,
      placeholder: '占位字符',
      label: '第二个'
    },
    {
      type: 'input',
      prop: 'value3',
      icon: true
    }
  ]
}
输入框.parameters = {
  docs: {
    storyDescription: '各种输入框'
  }
}

export const 按钮 = Template.bind({})
按钮.args = {
  filters: [
    {
      id: 'btn1',
      type: 'primary',
      name: '按钮1'
    },
    {
      id: 'btn2',
      type: 'success',
      plain: true,
      name: '按钮2'
    },
    {
      id: 'btn3',

      type: 'info',
      round: true,
      name: '按钮3'
    },
    {
      id: 'btn4',

      type: 'warning',
      circle: true,
      name: '按钮4'
    },
    {
      id: 'btn5',

      type: 'danger',
      name: '按钮5'
    },
    {
      id: 'btn6',

      type: 'primary',
      plain: true,
      name: '按钮6'
    },
    {
      id: 'btn7',

      type: 'button',
      name: '按钮7'
    },
    {
      id: 'btn8',
      type: 'button',
      name: '按钮8带图标',
      icon: 'el-icon-edit'
    },
    {
      id: 'btn9',
      type: 'primary',
      name: '按钮组更多',
      icon: 'el-icon-edit',
      options: [
        {
          id: 'value1',
          display: '子操作1',
          icon: 'el-icon-edit'
        },
        {
          id: 'value2',
          display: '子操作2',
          disabled: true
        },
        {
          id: 'value3',
          display: '子操作3'
        },
        {
          id: 'value4',
          display: '子操作4',
          divided: true
        }
      ]
    }, {
      id: 'btn10',
      type: 'primary',
      name: '按钮组更多',
      splitButton: true,
      icon: 'el-icon-edit',
      options: [
        {
          id: 'btn10-value1',
          display: '子操作1',
          icon: 'el-icon-edit'
        },
        {
          id: 'btn10-value2',
          display: '子操作2',
          disabled: true
        },
        {
          id: 'btn10-value3',
          display: '子操作3'
        },
        {
          id: 'btn10-value4',
          display: '子操作4',
          divided: true
        }
      ]
    }
  ]
}
按钮.parameters = {
  docs: {
    storyDescription: '各种按钮'
  }
}

export const 复杂布局 = Template.bind({})
复杂布局.args = {
  filters: [
    {
      type: 'select',
      prop: 'myCity',
      options: [
        {
          value: '上海',
          display: '上海'
        },
        {
          value: '北京',
          display: '北京'
        },
        {
          value: '武汉',
          display: '武汉'
        }
      ]
    },
    {
      type: 'input',
      prop: 'myLocation',
      label: '地址',
      placeholder: '地址',
      icon: true
    },
    {
      type: 'date',
      prop: 'myDate'
    },
    {
      type: 'daterange',
      label: '时间范围选择器',
      valueFormat: 'yyyy年-MM月-dd日',
      prop: 'dateComplex1'
    },
    {
      type: 'primary',
      id: 'search',
      name: '查询'
    },
    {
      id: 'btn5',

      type: 'danger',
      name: '按钮5'
    },
    {
      id: 'btn6',

      type: 'primary',
      plain: true,
      name: '按钮6'
    },
    {
      type: 'button',
      id: 'clear',
      name: '清除'
    },
    {
      type: 'input',
      prop: 'value2',
      clearable: true,
      placeholder: '占位字符',
      label: '第二个'
    },
    {
      type: 'input',
      prop: 'value3',
      icon: true
    },
    {
      type: 'primary',
      id: 'search2',
      name: '在右边，注意顺序',
      wrapStyle: {
        float: 'right'
      }
    },
    {
      id: 'search3',
      type: 'danger',
      icon: 'el-icon-edit',
      name: '在右边，注意顺序我其实是第二个',
      wrapStyle: {
        float: 'right'
      },
      options: [
        {
          display: '更多',
          id: 'search-btn1'
        }
      ]
    }
  ]
}

复杂布局.parameters = {
  docs: {
    storyDescription: '复杂定制布局'
  }
}

export const 自定义渲染 = Template.bind({})
自定义渲染.args = {
  filters: [
    {
      render: (createElement, { name, age }) => {
        return createElement('span', `${name} ${age} 自定通过jsx定义`)
      },
      name: 'liufang',
      age: 30
    },
    {
      id: 'btn7',
      type: 'button',
      name: '按钮7'
    },
    {
      type: 'input',
      prop: 'value1'
    },
    {
      render: (createElement) => {
        return createElement(
          'div',
          {},
          [
            '先写一些文字',
            createElement('h1', '一则头条')
          ]
        )
      }
    }
  ]
}

自定义渲染.parameters = {
  docs: {
    storyDescription: '自定义渲染组件'
  }
}

export const 展开收起 = Template.bind({})
展开收起.args = {
  complexSearch: true,
  filters: [
    {
      type: 'select',
      prop: 'myCity',
      options: [
        {
          value: '上海',
          display: '上海'
        },
        {
          value: '北京',
          display: '北京'
        },
        {
          value: '武汉',
          display: '武汉'
        }
      ]
    },
    {
      type: 'input',
      prop: 'myLocation',
      label: '地址',
      placeholder: '地址',
      icon: true
    },
    {
      type: 'date',
      prop: 'myDate'
    },
    {
      type: 'daterange',
      label: '时间范围选择器',
      valueFormat: 'yyyy年-MM月-dd日',
      prop: 'dateComplex1'
    },
    {
      type: 'input',
      prop: 'value2',
      clearable: true,
      placeholder: '占位字符',
      label: '第二个'
    },
    {
      type: 'input',
      prop: 'value3',
      clearable: true,
      placeholder: '占位字符',
      label: '第三个'
    },
    {
      type: 'input',
      prop: 'value3',
      icon: true
    },
    {
      type: 'button',
      id: 'clear',
      name: '清除'
    },
    {
      id: 'create',
      type: 'primary',
      name: '创建',
      wrapStyle: {
        marginLeft: 'auto'
      }
    },
    {
      id: 'refresh',
      type: 'primary',
      name: '刷新'
    }
  ]
}

展开收起.parameters = {
  docs: {
    storyDescription: '查询条件过多时可以展开收起，设置complexSearch为true，但是需要注意这种情况下启用了flex布局，故而需要右置的按钮，第一个设置marginLeft为auto'
  }
}

export const 展开收起默认收起 = Template.bind({})
展开收起默认收起.args = {
  complexSearch: true,
  defaultComplexSearchOpen: false,
  filters: [
    {
      type: 'select',
      prop: 'myCity',
      options: [
        {
          value: '上海',
          display: '上海'
        },
        {
          value: '北京',
          display: '北京'
        },
        {
          value: '武汉',
          display: '武汉'
        }
      ]
    },
    {
      type: 'input',
      prop: 'myLocation',
      label: '地址',
      placeholder: '地址',
      icon: true
    },
    {
      type: 'date',
      prop: 'myDate'
    },
    {
      type: 'daterange',
      label: '时间范围选择器',
      valueFormat: 'yyyy年-MM月-dd日',
      prop: 'dateComplex1'
    },
    {
      type: 'input',
      prop: 'value2',
      clearable: true,
      placeholder: '占位字符',
      label: '第二个'
    },
    {
      type: 'input',
      prop: 'value3',
      clearable: true,
      placeholder: '占位字符',
      label: '第三个'
    },
    {
      type: 'input',
      prop: 'value3',
      icon: true
    },
    {
      type: 'button',
      id: 'clear',
      name: '清除'
    },
    {
      id: 'create',
      type: 'primary',
      name: '创建',
      wrapStyle: {
        marginLeft: 'auto'
      }
    },
    {
      id: 'refresh',
      type: 'primary',
      name: '刷新'
    }
  ]
}

展开收起默认收起.parameters = {
  docs: {
    storyDescription: '设置defaultComplexSearchOpen为false，使其默认是收起状态'
  }
}

export const 展开收起自适应宽度 = Template.bind({})
展开收起自适应宽度.args = {
  complexSearch: true,
  filters: [
    {
      type: 'select',
      prop: 'myCity',
      options: [
        {
          value: '上海',
          display: '上海'
        },
        {
          value: '北京',
          display: '北京'
        },
        {
          value: '武汉',
          display: '武汉'
        }
      ]
    },
    {
      type: 'input',
      prop: 'value3',
      clearable: true,
      placeholder: '占位字符',
      label: '第三个'
    },
    {
      type: 'input',
      prop: 'value3',
      icon: true
    },
    {
      type: 'button',
      id: 'clear',
      name: '清除'
    },
    {
      id: 'create',
      type: 'primary',
      name: '创建',
      wrapStyle: {
        marginLeft: 'auto'
      }
    },
    {
      id: 'refresh',
      type: 'primary',
      name: '刷新'
    }
  ]
}

展开收起自适应宽度.parameters = {
  docs: {
    storyDescription: '查询条件不多，即使设置了complexSearch为true，也会自动不启用'
  }
}
