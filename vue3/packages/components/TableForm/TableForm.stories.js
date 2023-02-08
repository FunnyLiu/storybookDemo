import { initProps } from '../../storybook/index'
import DoTableForm from './index.vue'
import { sleep } from '../../utils/async'

export default {
  title: 'Data数据处理/TableForm多行编辑器',
  component: DoTableForm
}

const Template = (args, { argTypes }) => ({
  props: initProps(args),
  data() {
    return {
      list: [],
      filters: [
        {
          type: 'primary',
          id: 'add',
          name: '新增'
        },
        {
          type: 'primary',
          id: 'submit',
          name: '提交（true为通过，false为有待保存数据）'
        },
        {
          type: 'primary',
          id: 'getList',
          name: '获取列表数据，先校验通过再用（看控制台）'
        }
      ],
      columns: [
        {
          prop: 'name', label: '名称', showOverflowTooltip: true,
          editStatus: {
            type: 'input',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入名称',
            trigger: ['blur', 'change']
          }]
        },
        {
          prop: 'age', label: '年龄', showOverflowTooltip: true,
          editStatus: {
            type: 'input',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入年龄',
            trigger: ['blur', 'change']
          }]
        },
        {
          prop: 'date', label: '时间', showOverflowTooltip: true,
          editStatus: {
            type: 'date',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入时间',
            trigger: ['blur', 'change']
          }]
        }
      ]
    }
  },
  methods: {
    onAction: function({ key, row, params }) {
      switch (key) {
        case 'add':
          this.$refs.list.add({
            name: '',
            age: '',
            date: undefined
          })
          break
        case 'submit':
          this.$refs.list.validateAll().then(valid => {
            console.log(valid, 'valid')
          })
          break
        case 'getList':
          console.log(this.$refs.list.getList(), 'getList')
          break
        default:
          break
      }
    }
  },
  components: { DoTableForm },
  template: `<div>
    <do-table-form ref="list" :filters="filters" :columns="columns" :list="list" v-on:action="onAction" />
  </div>`
})
export const 基础用法 = Template.bind({})
基础用法.args = {}

const TemplateDefaultList = (args, { argTypes }) => ({
  props: initProps(args),
  data() {
    return {
      list: [
        { name: '刘放', age: 30, date: '1992-07-22' },
        { name: '刘放2', age: 31, date: '1992-07-22' },
        { name: '刘放3', age: 28, date: '1992-07-22' }
      ],
      filters: [
        {
          type: 'primary',
          id: 'add',
          name: '新增'
        },
        {
          type: 'primary',
          id: 'submit',
          name: '提交（true为通过，false为有待保存数据）'
        },
        {
          type: 'primary',
          id: 'getList',
          name: '获取列表数据，先校验通过再用（看控制台）'
        }
      ],
      columns: [
        {
          prop: 'name', label: '名称', showOverflowTooltip: true,
          editStatus: {
            type: 'input',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入名称',
            trigger: ['blur', 'change']
          }]
        },
        {
          prop: 'age', label: '年龄', showOverflowTooltip: true,
          editStatus: {
            type: 'input',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入年龄',
            trigger: ['blur', 'change']
          }]
        },
        {
          prop: 'date', label: '时间', showOverflowTooltip: true,
          editStatus: {
            type: 'date',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入时间',
            trigger: ['blur', 'change']
          }]
        }
      ]
    }
  },
  methods: {
    onAction: function({ key, row, params }) {
      switch (key) {
        case 'add':
          this.$refs.list.add({
            name: '',
            age: '',
            date: undefined
          })
          break
        case 'submit':
          this.$refs.list.validateAll().then(valid => {
            console.log(valid, 'valid')
          })
          break
        case 'getList':
          console.log(this.$refs.list.getList(), 'getList')
          break
        default:
          break
      }
    }
  },
  components: { DoTableForm },
  template: `<div>
    <do-table-form ref="list" :filters="filters" :columns="columns" :list="list" v-on:action="onAction" />
  </div>`
})
export const 带默认数据 = TemplateDefaultList.bind({})
带默认数据.args = {}
带默认数据.parameters = {
  docs: {
    storyDescription: '带有初始化list的流程'
  }
}

const TemplateComplexForm = (args, { argTypes }) => ({
  props: initProps(args),
  data() {
    return {
      list: [
        { name: '刘放', age: 30, date: '1992-07-22', city: '0' },
        { name: '刘放2', age: 31, date: '1992-07-22', city: '1' },
        { name: '刘放3', age: 28, date: '1992-07-22', city: undefined }
      ],
      filters: [
        {
          type: 'primary',
          id: 'add',
          name: '新增'
        },
        {
          type: 'primary',
          id: 'submit',
          name: '提交（true为通过，false为有待保存数据）'
        },
        {
          type: 'primary',
          id: 'getList',
          name: '获取列表数据，先校验通过再用（看控制台）'
        }
      ],
      columns: [
        {
          prop: 'name', label: '名称', showOverflowTooltip: true,
          editStatus: {
            type: 'input',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入名称',
            trigger: ['blur', 'change']
          }]
        },
        {
          prop: 'age', label: '年龄', showOverflowTooltip: true,
          editStatus: {
            type: 'input',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入年龄',
            trigger: ['blur', 'change']
          }]
        },
        {
          prop: 'date', label: '时间', showOverflowTooltip: true,
          editStatus: {
            type: 'date',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入时间',
            trigger: ['blur', 'change']
          }]
        },
        {
          prop: 'city',
          label: '城市',
          render: (createElement, { row }) => {
            return createElement(
              'div',
              row.city == 0 ? '上海' : '北京'
            )
          },
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
          prop: 'pwd', label: '密码', showOverflowTooltip: true,
          editStatus: {
            type: 'input',
            clearable: true,
            showPassword: true
          },
          rules: [{
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          }]
        }
      ]
    }
  },
  methods: {
    onAction: function({ key, row, params }) {
      switch (key) {
        case 'add':
          this.$refs.list.add({
            name: '',
            age: '',
            date: undefined,
            city: '1'
          })
          break
        case 'submit':
          this.$refs.list.validateAll().then(valid => {
            console.log(valid, 'valid')
          })
          break
        case 'getList':
          console.log(this.$refs.list.getList(), 'getList')
          break
        default:
          break
      }
    }
  },
  components: { DoTableForm },
  template: `<div>
    <do-table-form ref="list" :filters="filters" :columns="columns" :list="list" v-on:action="onAction" />
  </div>`
})
export const 复杂表单 = TemplateComplexForm.bind({})
复杂表单.args = {}
复杂表单.parameters = {
  docs: {
    storyDescription: '复杂的表单样式'
  }
}

const TemplateComplexForm2 = (args, { argTypes }) => ({
  props: initProps(args),
  data() {
    return {
      list: [
        { name: '李如美', age: 31, date: '1992-07-22', city: '0' },
        { name: '李如美2', age: 32, date: '1992-07-22', city: '1' },
        { name: '李如美3', age: 23, date: '1992-07-22', city: undefined }
      ],
      filters: [
        {
          type: 'primary',
          id: 'add',
          name: '新增'
        },
        {
          type: 'primary',
          id: 'submit',
          name: '提交（true为通过，false为有待保存数据）'
        },
        {
          type: 'primary',
          id: 'getList',
          name: '获取列表数据，先校验通过再用（看控制台）'
        }
      ],
      columns: [
        {
          prop: 'name', label: '名称', showOverflowTooltip: true
        },
        {
          prop: 'age', label: '年龄', showOverflowTooltip: true
        },
        {
          prop: 'date', label: '时间', showOverflowTooltip: true,
          editStatus: {
            type: 'date',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入时间',
            trigger: ['blur', 'change']
          }]
        },
        {
          prop: 'city',
          label: '城市',
          render: (createElement, { row }) => {
            return createElement(
              'div',
              row.city == 0 ? '上海' : '北京'
            )
          },
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
          prop: 'pwd', label: '密码', showOverflowTooltip: true
        }
      ]
    }
  },
  methods: {
    onAction: function({ key, row, params }) {
      switch (key) {
        case 'add':
          this.$refs.list.add({
            name: '',
            age: '',
            date: undefined,
            city: '1'
          })
          break
        case 'submit':
          this.$refs.list.validateAll().then(valid => {
            console.log(valid, 'valid')
          })
          break
        case 'getList':
          console.log(this.$refs.list.getList(), 'getList')
          break
        default:
          break
      }
    }
  },
  components: { DoTableForm },
  template: `<div>
    <do-table-form ref="list" :filters="filters" :columns="columns" :list="list" v-on:action="onAction" />
  </div>`
})
export const 部分可编辑 = TemplateComplexForm2.bind({})
部分可编辑.args = {}
部分可编辑.parameters = {
  docs: {
    storyDescription: '如果只需要其中几列编辑，几列不可编辑，则不可编辑的column不设置editable即可。'
  }
}

const TemplateLink = (args, { argTypes }) => ({
  props: initProps(args),
  data() {
    return {
      loading: false,
      list: [
        { city: '0', area: undefined },
        { city: '1', area: undefined },
        { city: undefined, area: undefined }
      ],
      filters: [
        {
          type: 'primary',
          id: 'add',
          name: '新增'
        },
        {
          type: 'primary',
          id: 'submit',
          name: '提交（true为通过，false为有待保存数据）'
        },
        {
          type: 'primary',
          id: 'getList',
          name: '获取列表数据，先校验通过再用（看控制台）'
        }
      ],
      columns: [
        {
          prop: 'city',
          label: '城市',
          render: (createElement, { row }) => {
            return createElement(
              'div',
              row.city == 0 ? '上海' : '北京'
            )
          },
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
          prop: 'area',
          label: '城市',
          render: (createElement, { row }) => {
            let label = ''
            if (row.city == 1) {
              if (row.area == 1) {
                label = '雄安区'
              } else {
                label = '朝阳区'
              }
            } else {
              if (row.area == 1) {
                label = '浦东新区'
              } else {
                label = '徐汇区'
              }
            }
            return createElement(
              'div',
              label

            )
          },
          editStatus: {
            type: 'select',
            name: '城市',
            options: async({ row }) => {
              this.loading = true
              await sleep(2000)
              this.loading = false
              if (row.row_editing.city == '1') {
                return [
                  {
                    value: '0',
                    display: '朝阳区'
                  },
                  {
                    value: '1',
                    display: '雄安区'
                  }
                ]
              } else {
                return [
                  {
                    value: '0',
                    display: '徐汇区'
                  },
                  {
                    value: '1',
                    display: '浦东新区'
                  }
                ]
              }
            }
          },
          rules: [{
            required: true,
            message: '请输入地址',
            trigger: ['blur', 'change']
          }]
        }
      ]
    }
  },
  methods: {
    onAction: function({ key, row, params }) {
      switch (key) {
        case 'add':
          this.$refs.list.add({
            city: '1',
            area: undefined
          })
          break
        case 'submit':
          this.$refs.list.validateAll().then(valid => {
            console.log(valid, 'valid')
          })
          break
        case 'getList':
          console.log(this.$refs.list.getList(), 'getList')
          break
        default:
          break
      }
    },
    // 监听选择的事件
    tableEditingInput(event) {
      console.log(event, '表单变化')
      if (event.column.prop === 'city') {
        // 刷新内部状态，强制再render一遍options函数
        this.$refs.list.refresh()
        // 将第二列置空
        event.list[event.scope.$index].row_editing.area = undefined
      }
    }
  },
  components: { DoTableForm },
  template: `<div>
    <do-table-form v-loading="loading" ref="list" :filters="filters" :columns="columns" :list="list" v-on:action="onAction" v-on:tableEditingInput="tableEditingInput" />
  </div>`
})
export const 数据联动及事件 = TemplateLink.bind({})
数据联动及事件.args = {}
数据联动及事件.parameters = {
  docs: {
    storyDescription: '通过tableEditingInput事件监听变化，通过将options设置为函数，来控制不同情况先展示不同内容'
  }
}

const AsyncValidateTemplate = (args, { argTypes }) => ({
  props: initProps(args),
  data() {
    return {
      list: [],
      filters: [
        {
          type: 'primary',
          id: 'add',
          name: '新增'
        },
        {
          type: 'primary',
          id: 'submit',
          name: '提交（true为通过，false为有待保存数据）'
        },
        {
          type: 'primary',
          id: 'getList',
          name: '获取列表数据，先校验通过再用（看控制台）'
        }
      ],
      columns: [
        {
          prop: 'name', label: '名称', showOverflowTooltip: true,
          editStatus: {
            type: 'input',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入名称',
            trigger: ['blur', 'change']
          }]
        },
        {
          prop: 'age', label: '年龄', showOverflowTooltip: true,
          editStatus: {
            type: 'input',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入年龄',
            trigger: ['blur', 'change']
          }, {
            trigger: ['blur', 'change'],
            validator: async(rule, value, callback) => {
              if (value) {
                // value存在的时候
                await sleep(3000)
                if (value != '18') {
                  callback('假装后端校验不通过，除非你输入18')
                } else {
                  // 通过了不要忘记了callback
                  callback()
                }
              } else {
                callback(new Error('密码不能为空，请输入'))
              }
            }
          }]
        },
        {
          prop: 'date', label: '时间', showOverflowTooltip: true,
          editStatus: {
            type: 'date',
            clearable: true
          },
          rules: [{
            required: true,
            message: '请输入时间',
            trigger: ['blur', 'change']
          }]
        }
      ]
    }
  },
  methods: {
    onAction: function({ key, row, params }) {
      switch (key) {
        case 'add':
          this.$refs.list.add({
            name: '',
            age: '',
            date: undefined
          })
          break
        case 'submit':
          this.$refs.list.validateAll().then(valid => {
            console.log(valid, 'valid')
          })
          break
        case 'getList':
          console.log(this.$refs.list.getList(), 'getList')
          break
        default:
          break
      }
    }
  },
  components: { DoTableForm },
  template: `<div>
    <do-table-form ref="list" :filters="filters" :columns="columns" :list="list" v-on:action="onAction" />
  </div>`
})
export const 异步校验 = AsyncValidateTemplate.bind({})
异步校验.args = {}
