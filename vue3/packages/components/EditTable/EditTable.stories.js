import { initProps } from '../../storybook/index'
import DoTable from './index.vue'
import DoTableTextAction from '../TableTextAction/index.vue'

export default {
  title: 'Data数据处理/EditTable可编辑表格',
  component: DoTable
}

const Template = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },
    components: { DoTable },
    template: `<div>
          <do-table v-bind="args" />
        </div>`
  }
}
export const 基础用法 = Template.bind({})
基础用法.args = {
  columns: [
    { prop: 'name', label: 'Name', width: 140, explain: '这是名称' },
    { prop: 'mobile', label: 'Mobile', minWidth: 180, tooltip: () => 'tooltip' },
    {
      prop: 'sex',
      label: 'Sex',
      width: 100,
      render: (createElement, { row }) => {
        const { sex } = row
        return createElement(
          'span',
          sex === 0 ? 'Male' : sex === 1 ? 'Female' : 'Unknow'
        )
      }
    }
  ],
  list: [
    { name: 'Sam', mobile: '15299xxxx', sex: 0 },
    { name: 'Jean', mobile: '13452xxxx', sex: 1 },
    { name: 'Tony', mobile: '187233xxxx', sex: 0 }
  ]
}

const TemplateEditable = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },
    data() {
      return {
        columns: [
          { prop: 'name',
            label: '姓名',
            explain: '这个表格可编辑哦',
            editStatus: {
              type: 'input',
              icon: true
            },
            rules: [{
              required: true,
              message: '请输入姓名',
              trigger: ['blur', 'change']
            }]
          },
          {
            prop: 'date',
            label: '日期',
            editStatus: {
              type: 'date'
            }
          },
          {
            prop: 'address',
            label: '地址',
            copyable: () => ({}),
            editStatus: {
              type: 'input'
            },
            rules: [{
              required: true,
              message: '请输入地址',
              trigger: ['blur', 'change']
            }]
          },
          {
            prop: 'city',
            label: '城市',
            editStatus: {
              type: 'select',
              name: '城市',
              options: [
                {
                  value: '0',
                  display: '上海'
                },
                {
                  value: '1',
                  display: '北京'
                },
                {
                  value: '2',
                  display: '武汉'
                }
              ]
            },
            rules: [{
              required: true,
              message: '请输入地址',
              trigger: ['blur', 'change']
            }]
          },
          {
            prop: '',
            label: '操作',
            width: 120,
            showOverflowTooltip: true,
            render: (createElement, { row, index }) => {
              return createElement(
                DoTableTextAction,
                {
                  // props: {
                    row,
                    index,
                    actions: [
                      ...(!row.isEditing ? [{
                        name: '编辑',
                        type: 'primary',
                        id: 'edit'
                      }] : []),
                      ...(row.isEditing ? [{
                        name: '保存',
                        type: 'primary',
                        id: 'save'
                      }] : []),
                      ...(row.isEditing ? [{
                        name: '取消',
                        type: 'primary',
                        id: 'cancel'
                      }] : [])
                    ],
                  // },
                  // 事件监听
                  onAction: this.onAction,
                  // on: {
                  //   action: this.onAction
                  // }
                }
              )
            }
          }
        ],
        list: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          city: '0'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          city: '1'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          city: '2'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          city: undefined
        }]
      }
    },
    methods: {
      onAction({ key, row, index }) {
        // 需要校验的列
        const validColumns = this.columns.filter(column => {
          return column.rules
        })
        let errorCount = 0
        switch (key) {
          case 'edit':
            row.isEditing = true
            break
          case 'save':
            this.$refs.table.$refs.form.validateField(validColumns.map(column => {
              return `realList.${index}.row_editing.${column.prop}`
            }), isValid => {
              if (isValid) {
                row.isEditing = false
                // 保存的时候值互换
                Object.keys(row.row_editing).forEach(rowKey => {
                  row[rowKey] = row.row_editing[rowKey]
                })
              }
            })
            break
          case 'cancel':
            row.isEditing = false
            // 取消的时候值重置
            Object.keys(row).forEach(rowKey => {
              if (rowKey == 'isEditing') return
              row.row_editing[rowKey] = row[rowKey]
            })
            // 触发一下校验，归位
            this.$refs.table.$refs.form.validate()
            break
          default:
            break
        }
      }
    },
    components: { DoTable },
    template: `<div>
          <do-table ref="table" v-bind="args" :columns="columns" :list="list" />
        </div>`
  }
}
export const 可编辑 = TemplateEditable.bind({})
可编辑.args = {
  editable: true
}

可编辑.parameters = {
  docs: {
    storyDescription: '可编辑表格，支持各种创建表单类型，字段的配置方法类似filter组件。'
  }
}

export const 通用空态 = Template.bind({})
通用空态.args = {
  height: '600px',
  emptyType: 2,
  emptyText: '自定义空态文案',
  columns: [
    { prop: 'name', label: 'Name', width: 140, explain: '这是名称' },
    { prop: 'mobile', label: 'Mobile', minWidth: 180, tooltip: () => 'tooltip' },
    {
      prop: 'sex',
      label: 'Sex',
      width: 100,
      render: (createElement, { row }) => {
        const { sex } = row
        return createElement(
          'span',
          sex === 0 ? 'Male' : sex === 1 ? 'Female' : 'Unknow'
        )
      }
    }
  ],
  list: []
}
通用空态.parameters = {
  docs: {
    storyDescription: '通用空态，可以自定义样式和文案，通过emptyType为枚举开启，文案通过emptyText定制'
  }
}
