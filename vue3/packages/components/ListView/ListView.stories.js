import { initProps } from '../../storybook/index'
import DoTableAction from '../TableAction/index.vue'
import DoTableTextAction from '../TableTextAction'
import DoListView from './index.vue'
import ListviewExport from '../../mixins/listviewExport'

export default {
  title: 'Data数据处理/ListView增删改查',
  component: DoListView
}

const Template = (args, { argTypes }) => {
  return {
    setup() {
      return {
        args
      }
    },
    methods: {
      filtered({ key }) {
        if (key === 'clear') {
          this.$refs.list.resetFilter()
        }
      }
    },
    components: { DoListView },
    template: `<div>
          <do-list-view v-bind="args"  ref="list" @filtered="filtered"  />
        </div>`
  }
}
export const 基础用法 = Template.bind({})
基础用法.args = {
  type: 'local',
  filters: [
    {
      type: 'select',
      name: '项目类型',
      placeholder: '项目类型',
      prop: 'type',
      options: [
        {
          value: 'LHT',
          display: 'LHT'
        },
        {
          value: '类型',
          display: '类型'
        }
      ]
    },
    {
      type: 'input',
      name: '项目名',
      placeholder: '项目名',
      prop: 'name'
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
  ],
  className: 'change-cell-color change-cell-padding change-height',
  highlightCurrentRow: true,
  tooltipEffect: 'light',
  fit: true,
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true },
    { prop: 'status', label: '状态', width: 100, showOverflowTooltip: true },
    {
      prop: '',
      label: '设置',
      width: 80,
      showOverflowTooltip: true,
      render: function(createElement, { row }) {
        return createElement(
          DoTableAction,
          {
            // props: {
              icon: 'caidans',
              actions: [
                { id: 'intoProject', name: '进入项目', hidden: false, icon: 'caidans' },
                { id: 'svn', name: 'svn', hidden: false, icon: 'caidans', divided: true },
                { id: 'chart', name: '数据报表', hidden: false, icon: 'caidans', divided: true }
              ],
              row: row,
              status: 0,
              dropdownDisable: false,
              clickHide: true,
            // },
            // 事件监听
            // on: {
              onAction: function(event) {
                console.log(event)
              }
            // }
          }
        )
      }
    }
  ],
  list: [
    {
      id: 93,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '高精度定位平台性能提升研发',
      subCode: 'rtlsrfid',
      status: '已立项'
    },
    {
      id: 94,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '北斗室内外融合定位算法研发',
      subCode: 'K21001351005',
      status: '已立项'
    },
    {
      id: 138,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '4',
      status: '编写中'
    },
    {
      id: 139,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名A',
      code: 'AABBCC12345',
      type: '类型ABCDEFG',
      subName: '这是王杰测试数据',
      subCode: '5',
      status: '编写中'
    },
    {
      id: 140,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名AB',
      code: 'AABBCC12345',
      type: '类型ABCDEF',
      subName: '这是王杰测试数据',
      subCode: '6',
      status: '编写中'
    },
    {
      id: 141,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABC',
      code: 'AABBCC12345',
      type: '类型ABCDE',
      subName: '这是王杰测试数据',
      subCode: '7',
      status: '编写中'
    },
    {
      id: 142,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCD',
      code: 'AABBCC12345',
      type: '类型ABCD',
      subName: '这是王杰测试数据',
      subCode: '8',
      status: '编写中'
    },
    {
      id: 143,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDE',
      code: 'AABBCC12345',
      type: '类型ABC',
      subName: '这是王杰测试数据',
      subCode: '9',
      status: '编写中'
    },
    {
      id: 144,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEF',
      code: 'AABBCC12345',
      type: '类型AB',
      subName: '这是王杰测试数据',
      subCode: '10',
      status: '编写中'
    },
    {
      id: 146,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    },
    {
      id: 147,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    }
  ]
}

export const 空 = Template.bind({})
空.args = {
  type: 'local',
  emptyType: 3,
  emptyText: '自定义空态文案',
  filters: [
    {
      type: 'select',
      name: '项目类型',
      placeholder: '项目类型',
      prop: 'type',
      options: [
        {
          value: 'LHT',
          display: 'LHT'
        },
        {
          value: '类型',
          display: '类型'
        }
      ]
    },
    {
      type: 'input',
      name: '项目名',
      placeholder: '项目名',
      prop: 'name'
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
  ],
  className: 'change-cell-color change-cell-padding change-height',
  highlightCurrentRow: true,
  tooltipEffect: 'light',
  fit: true,
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true },
    { prop: 'status', label: '状态', width: 100, showOverflowTooltip: true },
    {
      prop: '',
      label: '设置',
      width: 80,
      showOverflowTooltip: true,
      render: function(createElement, { row }) {
        return createElement(
          DoTableAction,
          {
            props: {
              actions: [
                { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
                { id: 'svn', name: 'svn', hidden: false, icon: 'svn', divided: true },
                { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', divided: true }
              ],
              row: row,
              status: 0,
              dropdownDisable: false,
              clickHide: true
            },
            // 事件监听
            on: {
              action: function(event) {
                console.log(event)
              }
            }
          }
        )
      }
    }
  ],
  list: []
}

function sleep(ms, options = {}) {
  const { value = undefined } = options
  return new Promise(resolve => setTimeout(() => resolve(value), ms))
}
function sampleSize([...arr], n = 1) {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr.slice(0, n)
}
const Template2 = (args, { argTypes }) => {
  return {
    setup() {
      return {
        args
      }
    },
    methods: {
      async filtered({ key }) {
        if (key === 'clear') {
          this.$refs.list.resetFilter()
        }
        if (key === 'search') {
          this.loading = true
          await sleep(2000)
          const list = [
            {
              id: 93,
              createdTime: '2022-07-01T17:20:48+08:00',
              updatedTime: '2022-07-01T17:20:48+08:00',
              name: '5G+北斗高精度定位LHT项目',
              code: 'R21481010O12001',
              type: 'LHT',
              subName: '高精度定位平台性能提升研发',
              subCode: 'rtlsrfid',
              status: '已立项'
            },
            {
              id: 94,
              createdTime: '2022-07-01T17:20:48+08:00',
              updatedTime: '2022-07-01T17:20:48+08:00',
              name: '5G+北斗高精度定位LHT项目',
              code: 'R21481010O12001',
              type: 'LHT',
              subName: '北斗室内外融合定位算法研发',
              subCode: 'K21001351005',
              status: '已立项'
            },
            {
              id: 138,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名',
              code: 'AABBCC12345',
              type: '类型',
              subName: '这是王杰测试数据',
              subCode: '4',
              status: '编写中'
            },
            {
              id: 139,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名A',
              code: 'AABBCC12345',
              type: '类型ABCDEFG',
              subName: '这是王杰测试数据',
              subCode: '5',
              status: '编写中'
            },
            {
              id: 140,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名AB',
              code: 'AABBCC12345',
              type: '类型ABCDEF',
              subName: '这是王杰测试数据',
              subCode: '6',
              status: '编写中'
            },
            {
              id: 141,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABC',
              code: 'AABBCC12345',
              type: '类型ABCDE',
              subName: '这是王杰测试数据',
              subCode: '7',
              status: '编写中'
            },
            {
              id: 142,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABCD',
              code: 'AABBCC12345',
              type: '类型ABCD',
              subName: '这是王杰测试数据',
              subCode: '8',
              status: '编写中'
            },
            {
              id: 143,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABCDE',
              code: 'AABBCC12345',
              type: '类型ABC',
              subName: '这是王杰测试数据',
              subCode: '9',
              status: '编写中'
            },
            {
              id: 144,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABCDEF',
              code: 'AABBCC12345',
              type: '类型AB',
              subName: '这是王杰测试数据',
              subCode: '10',
              status: '编写中'
            },
            {
              id: 146,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABCDEFG',
              code: 'AABBCC12345',
              type: '类型A',
              subName: '这是王杰测试数据',
              subCode: '12',
              status: '编写中'
            },
            {
              id: 147,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABCDEFG',
              code: 'AABBCC12345',
              type: '类型A',
              subName: '这是王杰测试数据',
              subCode: '12',
              status: '编写中'
            }
          ]
          this.list = sampleSize(list, 10)
          this.total = list.length
          this.loading = false
        }
      }
    },
    data() {
      return {
        list: [],
        total: 0,
        loading: false
      }
    },
    components: { DoListView },
    template: `<div>
            <do-list-view v-bind="args"  ref="list" :loading="loading" :total="total" :list="list" @filtered="filtered"  />
          </div>`
  }
}
export const 后端搜索分页 = Template2.bind({})
后端搜索分页.args = {
  type: 'remote',
  filters: [
    {
      type: 'select',
      name: '项目类型',
      placeholder: '项目类型',
      prop: 'type',
      options: [
        {
          value: 'LHT',
          display: 'LHT'
        },
        {
          value: '类型',
          display: '类型'
        }
      ]
    },
    {
      type: 'input',
      name: '项目名',
      placeholder: '项目名',
      prop: 'name'
    },
    {
      type: 'primary',
      id: 'search',
      name: '假装在请求'
    },
    {
      type: 'button',
      id: 'clear',
      name: '清除'
    }
  ],
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true },
    { prop: 'status', label: '状态', width: 100, showOverflowTooltip: true },
    {
      prop: '',
      label: '设置',
      width: 80,
      showOverflowTooltip: true,
      render: function(createElement, { row }) {
        return createElement(
          DoTableAction,
          {
            // props: {
              actions: [
                { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
                { id: 'svn', name: 'svn', hidden: false, icon: 'svn', divided: true },
                { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', divided: true }
              ],
              row: row,
              status: 0,
              dropdownDisable: false,
              clickHide: true,
            // },
            // 事件监听
            // on: {
              onAction: function(event) {
                console.log(event)
              }
            // }
          }
        )
      }
    }
  ]
}
const LocalTemplate = (args, { argTypes }) => {
  return {
    setup() {
      return {
        args
      }
    },
    mixins: [ListviewExport],
    methods: {
      filtered({ key }) {
        if (key === 'clear') {
          this.$refs.list.resetFilter()
          return
        }
        if (key === 'export') {
          this.exportFile({
            filename: '测试用文档'
          })
        }
      }
    },
    components: { DoListView },
    template: `<div>
          <do-list-view v-bind="args"  ref="list" @filtered="filtered"  />
        </div>`
  }
}
export const 前端分页导出Excel = LocalTemplate.bind({})
前端分页导出Excel.args = {
  type: 'local',
  filters: [
    {
      type: 'select',
      name: '项目类型',
      placeholder: '项目类型',
      prop: 'type',
      options: [
        {
          value: 'LHT',
          display: 'LHT'
        },
        {
          value: '类型',
          display: '类型'
        }
      ]
    },
    {
      type: 'input',
      name: '项目名',
      placeholder: '项目名',
      prop: 'name'
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
    },
    {
      type: 'primary',
      id: 'export',
      name: '导出'
    }
  ],
  className: 'change-cell-color change-cell-padding change-height',
  highlightCurrentRow: true,
  tooltipEffect: 'light',
  fit: true,
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true, exportable: () => ({}) },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true, exportable: () => ({}) },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true, exportable: () => ({}) },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true, exportable: () => ({}) },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true, exportable: () => ({}) },
    { prop: 'status', label: '状态', width: 100, showOverflowTooltip: true,
      exportable: ({ row, index }) => {
        return {
          exportText: `${row.status}-${index}`,
          exportHeader: '自定义状态Header'
        }
      }
    },
    {
      prop: '',
      label: '设置',
      width: 80,
      showOverflowTooltip: true,
      render: function(createElement, { row }) {
        return createElement(
          DoTableAction,
          {
            // props: {
              actions: [
                { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
                { id: 'svn', name: 'svn', hidden: false, icon: 'svn', divided: true },
                { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', divided: true }
              ],
              row: row,
              status: 0,
              dropdownDisable: false,
              clickHide: true,
            // },
            // 事件监听
            // on: {
              onAction: function(event) {
                console.log(event)
              }
            // }
          }
        )
      }
    }
  ],
  list: [
    {
      id: 93,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '高精度定位平台性能提升研发',
      subCode: 'rtlsrfid',
      status: '已立项'
    },
    {
      id: 94,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '北斗室内外融合定位算法研发',
      subCode: 'K21001351005',
      status: '已立项'
    },
    {
      id: 138,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '4',
      status: '编写中'
    },
    {
      id: 139,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名A',
      code: 'AABBCC12345',
      type: '类型ABCDEFG',
      subName: '这是王杰测试数据',
      subCode: '5',
      status: '编写中'
    },
    {
      id: 140,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名AB',
      code: 'AABBCC12345',
      type: '类型ABCDEF',
      subName: '这是王杰测试数据',
      subCode: '6',
      status: '编写中'
    },
    {
      id: 141,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABC',
      code: 'AABBCC12345',
      type: '类型ABCDE',
      subName: '这是王杰测试数据',
      subCode: '7',
      status: '编写中'
    },
    {
      id: 142,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCD',
      code: 'AABBCC12345',
      type: '类型ABCD',
      subName: '这是王杰测试数据',
      subCode: '8',
      status: '编写中'
    },
    {
      id: 143,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDE',
      code: 'AABBCC12345',
      type: '类型ABC',
      subName: '这是王杰测试数据',
      subCode: '9',
      status: '编写中'
    },
    {
      id: 144,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEF',
      code: 'AABBCC12345',
      type: '类型AB',
      subName: '这是王杰测试数据',
      subCode: '10',
      status: '编写中'
    },
    {
      id: 146,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    },
    {
      id: 147,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    }
  ]
}
前端分页导出Excel.parameters = {
  docs: {
    storyDescription: '前端分页（local）模式上的导出Excel，根据当前的筛选条件进行导出，需要给待导出的column，配置exporatble函数，具体可以查看demo。使用该功能需要依赖ListviewExport这个mixin。'
  }
}

const RemoteExportTemplate = (args, { argTypes }) => {
  return {
    setup() {
      return {
        args
      }
    },
    mixins: [ListviewExport],
    methods: {
      async filtered({ key }) {
        if (key === 'clear') {
          this.$refs.list.resetFilter()
        }
        if (key === 'search') {
          this.loading = true
          await sleep(2000)
          const list = [
            {
              id: 93,
              createdTime: '2022-07-01T17:20:48+08:00',
              updatedTime: '2022-07-01T17:20:48+08:00',
              name: '5G+北斗高精度定位LHT项目',
              code: 'R21481010O12001',
              type: 'LHT',
              subName: '高精度定位平台性能提升研发',
              subCode: 'rtlsrfid',
              status: '已立项'
            },
            {
              id: 94,
              createdTime: '2022-07-01T17:20:48+08:00',
              updatedTime: '2022-07-01T17:20:48+08:00',
              name: '5G+北斗高精度定位LHT项目',
              code: 'R21481010O12001',
              type: 'LHT',
              subName: '北斗室内外融合定位算法研发',
              subCode: 'K21001351005',
              status: '已立项'
            },
            {
              id: 138,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名',
              code: 'AABBCC12345',
              type: '类型',
              subName: '这是王杰测试数据',
              subCode: '4',
              status: '编写中'
            },
            {
              id: 139,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名A',
              code: 'AABBCC12345',
              type: '类型ABCDEFG',
              subName: '这是王杰测试数据',
              subCode: '5',
              status: '编写中'
            },
            {
              id: 140,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名AB',
              code: 'AABBCC12345',
              type: '类型ABCDEF',
              subName: '这是王杰测试数据',
              subCode: '6',
              status: '编写中'
            },
            {
              id: 141,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABC',
              code: 'AABBCC12345',
              type: '类型ABCDE',
              subName: '这是王杰测试数据',
              subCode: '7',
              status: '编写中'
            },
            {
              id: 142,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABCD',
              code: 'AABBCC12345',
              type: '类型ABCD',
              subName: '这是王杰测试数据',
              subCode: '8',
              status: '编写中'
            },
            {
              id: 143,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABCDE',
              code: 'AABBCC12345',
              type: '类型ABC',
              subName: '这是王杰测试数据',
              subCode: '9',
              status: '编写中'
            },
            {
              id: 144,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABCDEF',
              code: 'AABBCC12345',
              type: '类型AB',
              subName: '这是王杰测试数据',
              subCode: '10',
              status: '编写中'
            },
            {
              id: 146,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABCDEFG',
              code: 'AABBCC12345',
              type: '类型A',
              subName: '这是王杰测试数据',
              subCode: '12',
              status: '编写中'
            },
            {
              id: 147,
              createdTime: '2022-07-04T14:56:21+08:00',
              updatedTime: '2022-07-04T14:56:21+08:00',
              name: '项目名ABCDEFG',
              code: 'AABBCC12345',
              type: '类型A',
              subName: '这是王杰测试数据',
              subCode: '12',
              status: '编写中'
            }
          ]
          this.list = sampleSize(list, 10)
          this.total = list.length
          this.loading = false
        }
        if (key === 'export') {
          await sleep(2000)
          // 远程模式下，需要自己负责list的组装
          this.exportFile({
            filename: '测试导出远端数据',
            list: this.list
          })
        }
      }
    },
    data() {
      return {
        list: [],
        total: 0,
        loading: false
      }
    },
    components: { DoListView },
    template: `<div>
            <do-list-view v-bind="args"  ref="list" :loading="loading" :total="total" :list="list" @filtered="filtered"  />
          </div>`
  }
}
export const 后端分页导出Excel = RemoteExportTemplate.bind({})
后端分页导出Excel.args = {
  type: 'remote',
  filters: [
    {
      type: 'select',
      name: '项目类型',
      placeholder: '项目类型',
      prop: 'type',
      options: [
        {
          value: 'LHT',
          display: 'LHT'
        },
        {
          value: '类型',
          display: '类型'
        }
      ]
    },
    {
      type: 'input',
      name: '项目名',
      placeholder: '项目名',
      prop: 'name'
    },
    {
      type: 'primary',
      id: 'search',
      name: '假装在请求'
    },
    {
      type: 'button',
      id: 'clear',
      name: '清除'
    },
    {
      type: 'primary',
      id: 'export',
      name: '导出'
    }
  ],
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true, exportable: () => ({}) },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true, exportable: () => ({}) },
    { prop: 'status', label: '状态', width: 100, showOverflowTooltip: true },
    {
      prop: '',
      label: '设置',
      width: 80,
      showOverflowTooltip: true,
      render: function(createElement, { row }) {
        return createElement(
          DoTableAction,
          {
            // props: {
              actions: [
                { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
                { id: 'svn', name: 'svn', hidden: false, icon: 'svn', divided: true },
                { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', divided: true }
              ],
              row: row,
              status: 0,
              dropdownDisable: false,
              clickHide: true,
            // },
            // 事件监听
            // on: {
              onAction: function(event) {
                console.log(event)
              }
            // }
          }
        )
      }
    }
  ]
}
后端分页导出Excel.parameters = {
  docs: {
    storyDescription: '后端分页（remote）模式上的导出Excel，需要自己转入list，需要给待导出的column，配置exporatble函数，具体可以查看demo。使用该功能需要依赖ListviewExport这个mixin。'
  }
}

export const 高级搜索 = Template.bind({})
高级搜索.args = {
  type: 'local',
  complexSearch: true,
  filters: [
    {
      type: 'select',
      name: '项目类型',
      placeholder: '项目类型',
      prop: 'type',
      options: [
        {
          value: 'LHT',
          display: 'LHT'
        },
        {
          value: '类型',
          display: '类型'
        }
      ]
    },
    {
      type: 'input',
      name: '项目名',
      placeholder: '项目名',
      prop: 'name'
    },
    {
      type: 'input',
      name: '项目编码',
      placeholder: '项目编码',
      prop: 'code'
    },
    {
      type: 'input',
      name: '子项目名',
      placeholder: '子项目名',
      prop: 'subName'
    },
    {
      type: 'input',
      name: '子项目编码',
      placeholder: '子项目编码',
      prop: 'subCode'
    },
    {
      type: 'primary',
      id: 'search',
      name: '查询',
      wrapStyle: {
        marginLeft: 'auto'
      }
    },
    {
      type: 'button',
      id: 'clear',
      name: '清除'
    }
  ],
  className: 'change-cell-color change-cell-padding change-height',
  highlightCurrentRow: true,
  tooltipEffect: 'light',
  fit: true,
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true },
    { prop: 'status', label: '状态', width: 100, showOverflowTooltip: true },
    {
      prop: '',
      label: '设置',
      width: 80,
      showOverflowTooltip: true,
      render: function(createElement, { row }) {
        return createElement(
          DoTableAction,
          {
            // props: {
              actions: [
                { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
                { id: 'svn', name: 'svn', hidden: false, icon: 'svn', divided: true },
                { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', divided: true }
              ],
              row: row,
              status: 0,
              dropdownDisable: false,
              clickHide: true,
            // },
            // 事件监听
            // on: {
              onAction: function(event) {
                console.log(event)
              }
            // }
          }
        )
      }
    }
  ],
  list: [
    {
      id: 93,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '高精度定位平台性能提升研发',
      subCode: 'rtlsrfid',
      status: '已立项'
    },
    {
      id: 94,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '北斗室内外融合定位算法研发',
      subCode: 'K21001351005',
      status: '已立项'
    },
    {
      id: 138,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '4',
      status: '编写中'
    },
    {
      id: 139,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名A',
      code: 'AABBCC12345',
      type: '类型ABCDEFG',
      subName: '这是王杰测试数据',
      subCode: '5',
      status: '编写中'
    },
    {
      id: 140,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名AB',
      code: 'AABBCC12345',
      type: '类型ABCDEF',
      subName: '这是王杰测试数据',
      subCode: '6',
      status: '编写中'
    },
    {
      id: 141,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABC',
      code: 'AABBCC12345',
      type: '类型ABCDE',
      subName: '这是王杰测试数据',
      subCode: '7',
      status: '编写中'
    },
    {
      id: 142,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCD',
      code: 'AABBCC12345',
      type: '类型ABCD',
      subName: '这是王杰测试数据',
      subCode: '8',
      status: '编写中'
    },
    {
      id: 143,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDE',
      code: 'AABBCC12345',
      type: '类型ABC',
      subName: '这是王杰测试数据',
      subCode: '9',
      status: '编写中'
    },
    {
      id: 144,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEF',
      code: 'AABBCC12345',
      type: '类型AB',
      subName: '这是王杰测试数据',
      subCode: '10',
      status: '编写中'
    },
    {
      id: 146,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    },
    {
      id: 147,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    }
  ]
}

高级搜索.parameters = {
  docs: {
    storyDescription: '查询条件过多时可以展开收起，设置complexSearch为true，但是需要注意这种情况下启用了flex布局，故而需要右置的按钮，第一个设置marginLeft为auto'
  }
}

export const 自定义待展示列 = Template.bind({})
自定义待展示列.args = {
  cacheKey: 'test',
  type: 'local',
  complexSearch: true,
  filters: [
    {
      type: 'select',
      name: '项目类型',
      placeholder: '项目类型',
      prop: 'type',
      options: [
        {
          value: 'LHT',
          display: 'LHT'
        },
        {
          value: '类型',
          display: '类型'
        }
      ]
    },
    {
      type: 'input',
      name: '项目名',
      placeholder: '项目名',
      prop: 'name'
    },
    {
      type: 'primary',
      id: 'search',
      name: '查询',
      wrapStyle: {
        marginLeft: 'auto'
      }
    },
    {
      type: 'button',
      id: 'clear',
      name: '清除'
    }
  ],
  className: 'change-cell-color change-cell-padding change-height',
  highlightCurrentRow: true,
  tooltipEffect: 'light',
  fit: true,
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true,
      showable: () => ({})
    },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true,
      showable: () => ({})
    },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true,
      showable: () => ({})
    },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true, showable: () => ({}) },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true, showable: () => ({}) },
    { prop: 'status', label: '状态', width: 100, showOverflowTooltip: true, showable: () => ({}) },
    {
      prop: '',
      label: '设置',
      width: 80,
      showOverflowTooltip: true,
      render: function(createElement, { row }) {
        return createElement(
          DoTableAction,
          {
            // props: {
              actions: [
                { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
                { id: 'svn', name: 'svn', hidden: false, icon: 'svn', divided: true },
                { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', divided: true }
              ],
              row: row,
              status: 0,
              dropdownDisable: false,
              clickHide: true,
            // },
            // 事件监听
            // on: {
              onAction: function(event) {
                console.log(event)
              }
            // }
          }
        )
      }
    }
  ],
  list: [
    {
      id: 93,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '高精度定位平台性能提升研发',
      subCode: 'rtlsrfid',
      status: '已立项'
    },
    {
      id: 94,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '北斗室内外融合定位算法研发',
      subCode: 'K21001351005',
      status: '已立项'
    },
    {
      id: 138,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '4',
      status: '编写中'
    },
    {
      id: 139,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名A',
      code: 'AABBCC12345',
      type: '类型ABCDEFG',
      subName: '这是王杰测试数据',
      subCode: '5',
      status: '编写中'
    },
    {
      id: 140,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名AB',
      code: 'AABBCC12345',
      type: '类型ABCDEF',
      subName: '这是王杰测试数据',
      subCode: '6',
      status: '编写中'
    },
    {
      id: 141,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABC',
      code: 'AABBCC12345',
      type: '类型ABCDE',
      subName: '这是王杰测试数据',
      subCode: '7',
      status: '编写中'
    },
    {
      id: 142,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCD',
      code: 'AABBCC12345',
      type: '类型ABCD',
      subName: '这是王杰测试数据',
      subCode: '8',
      status: '编写中'
    },
    {
      id: 143,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDE',
      code: 'AABBCC12345',
      type: '类型ABC',
      subName: '这是王杰测试数据',
      subCode: '9',
      status: '编写中'
    },
    {
      id: 144,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEF',
      code: 'AABBCC12345',
      type: '类型AB',
      subName: '这是王杰测试数据',
      subCode: '10',
      status: '编写中'
    },
    {
      id: 146,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    },
    {
      id: 147,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    }
  ]
}
自定义待展示列.parameters = {
  docs: {
    storyDescription: '自己定义要展示哪些列，给可以隐藏或显示的列增加showable: () => ({})，如果需要开启缓存记录，则需要传递cacheKey'
  }
}
export const 自定义分页pagesize = Template.bind({})
自定义分页pagesize.args = {
  cacheKey: 'test',
  type: 'local',
  complexSearch: true,
  initPageSize: 6,
  initPageSizes: [6, 12],
  filters: [
    {
      type: 'select',
      name: '项目类型',
      placeholder: '项目类型',
      prop: 'type',
      options: [
        {
          value: 'LHT',
          display: 'LHT'
        },
        {
          value: '类型',
          display: '类型'
        }
      ]
    },
    {
      type: 'input',
      name: '项目名',
      placeholder: '项目名',
      prop: 'name'
    },
    {
      type: 'primary',
      id: 'search',
      name: '查询',
      wrapStyle: {
        marginLeft: 'auto'
      }
    },
    {
      type: 'button',
      id: 'clear',
      name: '清除'
    }
  ],
  className: 'change-cell-color change-cell-padding change-height',
  highlightCurrentRow: true,
  tooltipEffect: 'light',
  fit: true,
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true,
      showable: () => ({})
    },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true,
      showable: () => ({})
    },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true,
      showable: () => ({})
    },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true, showable: () => ({}) },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true, showable: () => ({}) },
    { prop: 'status', label: '状态', width: 100, showOverflowTooltip: true, showable: () => ({}) },
    {
      prop: '',
      label: '设置',
      width: 80,
      showOverflowTooltip: true,
      render: function(createElement, { row }) {
        return createElement(
          DoTableAction,
          {
            // props: {
              actions: [
                { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
                { id: 'svn', name: 'svn', hidden: false, icon: 'svn', divided: true },
                { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', divided: true }
              ],
              row: row,
              status: 0,
              dropdownDisable: false,
              clickHide: true,
            // },
            // 事件监听
            // on: {
              onAction: function(event) {
                console.log(event)
              }
            // }
          }
        )
      }
    }
  ],
  list: [
    {
      id: 93,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '高精度定位平台性能提升研发',
      subCode: 'rtlsrfid',
      status: '已立项'
    },
    {
      id: 94,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '北斗室内外融合定位算法研发',
      subCode: 'K21001351005',
      status: '已立项'
    },
    {
      id: 138,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '4',
      status: '编写中'
    },
    {
      id: 139,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名A',
      code: 'AABBCC12345',
      type: '类型ABCDEFG',
      subName: '这是王杰测试数据',
      subCode: '5',
      status: '编写中'
    },
    {
      id: 140,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名AB',
      code: 'AABBCC12345',
      type: '类型ABCDEF',
      subName: '这是王杰测试数据',
      subCode: '6',
      status: '编写中'
    },
    {
      id: 141,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABC',
      code: 'AABBCC12345',
      type: '类型ABCDE',
      subName: '这是王杰测试数据',
      subCode: '7',
      status: '编写中'
    },
    {
      id: 142,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCD',
      code: 'AABBCC12345',
      type: '类型ABCD',
      subName: '这是王杰测试数据',
      subCode: '8',
      status: '编写中'
    },
    {
      id: 143,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDE',
      code: 'AABBCC12345',
      type: '类型ABC',
      subName: '这是王杰测试数据',
      subCode: '9',
      status: '编写中'
    },
    {
      id: 144,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEF',
      code: 'AABBCC12345',
      type: '类型AB',
      subName: '这是王杰测试数据',
      subCode: '10',
      status: '编写中'
    },
    {
      id: 146,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    },
    {
      id: 147,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    }
  ]
}
自定义分页pagesize.parameters = {
  docs: {
    storyDescription: '自己定义initPageSize来控制初始的pagesize为number类型的值,如果需要自己定义调整每页显示条数,通过initPageSizes来传入数组即可。'
  }
}

export const 大量数据使用无限列表 = Template.bind({})
const list = []
Array.from(Array(1000).keys()).map(id => {
  list.push({
    id: id,
    createdTime: '2022-07-01T17:20:48+08:00',
    updatedTime: '2022-07-01T17:20:48+08:00',
    name: `5G+项目${id}`,
    code: 'R21481010O12001',
    type: 'LHT',
    subName: '高精度定位平台性能提升研发',
    subCode: 'rtlsrfid',
    status: '已立项'
  })
})
大量数据使用无限列表.args = {
  height: '800px',
  dataKey: 'id',
  infinite: true,
  type: 'local',
  initPageSize: 9999,
  showPagination: false,
  className: 'change-cell-color change-cell-padding change-height',
  highlightCurrentRow: true,
  tooltipEffect: 'light',
  fit: true,
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true },
    { prop: 'status', label: '状态', width: 180, showOverflowTooltip: true },
    {
      prop: '',
      label: '设置',
      width: 120,
      showOverflowTooltip: true,
      render: function(createElement, { row }) {
        return createElement(
          DoTableTextAction,
          {
            // props: {
              actions: [
                { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
                { id: 'svn', name: 'svn', hidden: false, icon: 'svn', divided: true },
                { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', divided: true }
              ],
              row: row,
              status: 0,
              dropdownDisable: false,
              clickHide: true,
            // },
            // 事件监听
            // on: {
              onAction: function(event) {
                console.log(event)
              }
            // }
          }
        )
      }
    }
  ],
  list
}
大量数据使用无限列表.parameters = {
  docs: {
    storyDescription: '大量数据，验证虚拟列表是否生效，需要设置infinite、dataKey、height、initPageSize来实现无限滚动列表'
  }
}
const Template3 = (args, { argTypes }) => {
  return {
    setup() {
      return {
        args
      }
    },
    methods: {
      async loadMore({
        $state
      }) {
        await sleep(2000)
        this.i = this.i + 1
        Array.from(Array(100).keys()).map(id => {
          this.list.push({
            id: (this.i * 100) + id,
            createdTime: '2022-07-01T17:20:48+08:00',
            updatedTime: '2022-07-01T17:20:48+08:00',
            name: `5G+项目${id}`,
            code: 'R21481010O12001',
            type: 'LHT',
            subName: '高精度定位平台性能提升研发',
            subCode: 'rtlsrfid',
            status: '已立项'
          })
        })
        $state && $state.loaded()
      },
      async filtered({ key }) {
        if (key === 'clear') {
          this.$refs.list.resetFilter()
        }
        if (key === 'search') {
          this.loading = true
          await sleep(2000)
          this.$refs.list.handleCurrentChange(1)
          this.list = []
          this.total = list.length
          this.loading = false
        }
      }
    },
    data() {
      return {
        list: [],
        i: 0,
        total: 0,
        loading: false
      }
    },
    components: { DoListView },
    template: `<div>
            <do-list-view v-bind="args" @loadMore="loadMore"  ref="list" :loading="loading" :total="total" :list="list" @filtered="filtered"  />
          </div>`
  }
}
export const 大量数据使用无限列表服务端分页 = Template3.bind({})
大量数据使用无限列表服务端分页.args = {
  height: '800px',
  dataKey: 'id',
  infinite: true,
  type: 'remote',
  showPagination: false,
  className: 'change-cell-color change-cell-padding change-height',
  highlightCurrentRow: true,
  tooltipEffect: 'light',
  fit: true,
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true },
    { prop: 'status', label: '状态', width: 180, showOverflowTooltip: true },
    {
      prop: '',
      label: '设置',
      width: 120,
      showOverflowTooltip: true,
      render: function(createElement, { row }) {
        return createElement(
          DoTableAction,
          {
            // props: {
              actions: [
                { id: 'intoProject', name: '进入项目', hidden: false, icon: 'into' },
                { id: 'svn', name: 'svn', hidden: false, icon: 'svn', divided: true },
                { id: 'chart', name: '数据报表', hidden: false, icon: 'chart', divided: true }
              ],
              row: row,
              status: 0,
              dropdownDisable: false,
              clickHide: true,
            // },
            // 事件监听
            // on: {
              onAction: function(event) {
                console.log(event)
              }
            // }
          }
        )
      }
    }
  ]
}

大量数据使用无限列表服务端分页.parameters = {
  docs: {
    storyDescription: '大量数据，服务端分页，验证虚拟列表是否生效，需要设置infinite、dataKey、height、initPageSize来实现无限滚动列表'
  }
}

const Template4 = (args, { argTypes }) => {
  return {
    setup() {
      return {
        args
      }
    },
    data() {
      return {
        txt: '这里是自定义jsx，试试点击某一行'
      }
    },
    methods: {
      filtered({ key }) {
        if (key === 'clear') {
          this.$refs.list.resetFilter()
        }
      },
      renderBetweenFilterAndTable(createElement) {
        return <div>{this.txt}</div>
      },
      rowClick(row, event, column) {
        this.txt = `项目名为${row.name}`
      }
    },
    components: { DoListView },
    template: `<div>
          <do-list-view v-bind="args" @row-click="rowClick" :render-between-filter-and-table="renderBetweenFilterAndTable"  ref="list" @filtered="filtered"  />
        </div>`
  }
}
export const 自定义模块位于搜索和表格中间 = Template4.bind({})
自定义模块位于搜索和表格中间.args = {
  type: 'local',
  filters: [
    {
      type: 'select',
      name: '项目类型',
      placeholder: '项目类型',
      prop: 'type',
      options: [
        {
          value: 'LHT',
          display: 'LHT'
        },
        {
          value: '类型',
          display: '类型'
        }
      ]
    },
    {
      type: 'input',
      name: '项目名',
      placeholder: '项目名',
      prop: 'name'
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
  ],
  className: 'change-cell-color change-cell-padding change-height',
  highlightCurrentRow: true,
  tooltipEffect: 'light',
  fit: true,
  columns: [
    { prop: 'name', label: '项目名', width: 200, showOverflowTooltip: true },
    { prop: 'type', label: '项目类型', showOverflowTooltip: true },
    { prop: 'code', label: '立项编码', showOverflowTooltip: true },
    { prop: 'subName', label: '子项目名', showOverflowTooltip: true },
    { prop: 'subCode', label: '子项目编码', showOverflowTooltip: true },
    { prop: 'status', label: '状态', width: 100, showOverflowTooltip: true }
  ],
  list: [
    {
      id: 93,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '高精度定位平台性能提升研发',
      subCode: 'rtlsrfid',
      status: '已立项'
    },
    {
      id: 94,
      createdTime: '2022-07-01T17:20:48+08:00',
      updatedTime: '2022-07-01T17:20:48+08:00',
      name: '5G+北斗高精度定位LHT项目',
      code: 'R21481010O12001',
      type: 'LHT',
      subName: '北斗室内外融合定位算法研发',
      subCode: 'K21001351005',
      status: '已立项'
    },
    {
      id: 138,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '4',
      status: '编写中'
    },
    {
      id: 139,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名A',
      code: 'AABBCC12345',
      type: '类型ABCDEFG',
      subName: '这是王杰测试数据',
      subCode: '5',
      status: '编写中'
    },
    {
      id: 140,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名AB',
      code: 'AABBCC12345',
      type: '类型ABCDEF',
      subName: '这是王杰测试数据',
      subCode: '6',
      status: '编写中'
    },
    {
      id: 141,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABC',
      code: 'AABBCC12345',
      type: '类型ABCDE',
      subName: '这是王杰测试数据',
      subCode: '7',
      status: '编写中'
    },
    {
      id: 142,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCD',
      code: 'AABBCC12345',
      type: '类型ABCD',
      subName: '这是王杰测试数据',
      subCode: '8',
      status: '编写中'
    },
    {
      id: 143,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDE',
      code: 'AABBCC12345',
      type: '类型ABC',
      subName: '这是王杰测试数据',
      subCode: '9',
      status: '编写中'
    },
    {
      id: 144,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEF',
      code: 'AABBCC12345',
      type: '类型AB',
      subName: '这是王杰测试数据',
      subCode: '10',
      status: '编写中'
    },
    {
      id: 146,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    },
    {
      id: 147,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名ABCDEFG',
      code: 'AABBCC12345',
      type: '类型A',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    }
  ]
}
