import { ElRadio } from 'element-plus'
import { initProps } from '../../storybook/index'
import DoTable from './index.vue'
import DoTableAction from '../TableAction/index.vue'

export default {
  title: 'Data数据处理/InfiniteTable无限表格',
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
    { name: 'Sam', mobile: '15299xxxx', sex: 0, id: 1 },
    { name: 'Jean', mobile: '13452xxxx', sex: 1, id: 2 },
    { name: 'Tony', mobile: '187233xxxx', sex: 0, id: 3 }
  ]
}

export const 复杂表格 = Template.bind({})
复杂表格.args = {
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
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '5',
      status: '编写中'
    },
    {
      id: 140,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '6',
      status: '编写中'
    },
    {
      id: 141,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '7',
      status: '编写中'
    },
    {
      id: 142,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '8',
      status: '编写中'
    },
    {
      id: 143,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '9',
      status: '编写中'
    },
    {
      id: 144,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '10',
      status: '编写中'
    },
    {
      id: 146,
      createdTime: '2022-07-04T14:56:21+08:00',
      updatedTime: '2022-07-04T14:56:21+08:00',
      name: '项目名',
      code: 'AABBCC12345',
      type: '类型',
      subName: '这是王杰测试数据',
      subCode: '12',
      status: '编写中'
    }
  ]
}
复杂表格.parameters = {
  docs: {
    storyDescription: '复杂真实数据的表格'
  }
}
export const 斑马纹理 = Template.bind({})
斑马纹理.args = {
  dataKey: 'date',
  stripe: true,
  columns: [
    { prop: 'name', label: '姓名', width: 140 },
    { prop: 'date', label: '日期', minWidth: 180 },
    { prop: 'address', label: '地址', minWidth: 180 }
  ],
  list: [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }]
}

斑马纹理.parameters = {
  docs: {
    storyDescription: '带斑马纹表格，stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。'
  }
}

export const 边框 = Template.bind({})
边框.args = {
  dataKey: 'date',
  border: true,
  columns: [
    { prop: 'name', label: '姓名', width: 140 },
    { prop: 'date', label: '日期', minWidth: 180 },
    { prop: 'address', label: '地址', minWidth: 180 }
  ],
  list: [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }]
}

边框.parameters = {
  docs: {
    storyDescription: '默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用border属性，它接受一个Boolean，设置为true即可启用。'
  }
}

export const 固定表头 = Template.bind({})
固定表头.args = {
  dataKey: 'date',
  height: 200,
  columns: [
    { prop: 'name', label: '姓名', width: 140 },
    { prop: 'date', label: '日期', minWidth: 180 },
    { prop: 'address', label: '地址', minWidth: 180 }
  ],
  list: [{
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-08',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-06',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-07',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }]
}

固定表头.parameters = {
  docs: {
    storyDescription: '定义了height属性，即可实现固定表头的表格，而不需要额外的代码。'
  }
}

export const 固定列 = Template.bind({})
固定列.args = {
  height: 200,
  dataKey: 'date',
  columns: [
    { prop: 'date', label: '日期', minWidth: 180, fixed: 'left' },
    { prop: 'name', label: '姓名', width: 140 },
    { prop: 'province', label: '省份', minWidth: 180 },
    { prop: 'city', label: '市区', minWidth: 180 },
    { prop: 'address', label: '地址', minWidth: 180 },
    { prop: 'zip', label: '邮编', minWidth: 180 },
    {
      prop: '', label: '操作', fixed: 'right',
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
  list: [{
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1517 弄',
    zip: 200333
  }, {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1519 弄',
    zip: 200333
  }, {
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1516 弄',
    zip: 200333
  }]
}

固定列.parameters = {
  docs: {
    storyDescription: '固定列需要使用fixed属性，它接受 Boolean 值或者leftright，表示左边固定还是右边固定。'
  }
}

export const 展开行 = Template.bind({})
展开行.args = {
  dataKey: 'date',
  columns: [
    {
      type: 'expand',
      render: function(createElement, { row }) {
        return createElement(
          'div', `自定义内容：${row.date} ${row.name} ${row.province} ${row.city}`
        )
      }
    },
    { prop: 'date', label: '日期' },
    { prop: 'name', label: '姓名' },
    { prop: 'province', label: '省份' },
    { prop: 'city', label: '市区' },
    { prop: 'address', label: '地址' },
    { prop: 'zip', label: '邮编' }
  ],
  list: [{
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-04',
    name: '王小虎2',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1517 弄',
    zip: 200333
  }, {
    date: '2016-05-01',
    name: '王小虎3',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1519 弄',
    zip: 200333
  }, {
    date: '2016-05-03',
    name: '王小虎4',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1516 弄',
    zip: 200333
  }]
}

展开行.parameters = {
  docs: {
    storyDescription: '当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。'
  }
}

export const 多选 = Template.bind({})
多选.args = {
  dataKey: 'date',
  columns: [
    { prop: '', type: 'selection', width: 55 },
    { prop: 'name', label: '姓名', width: 140 },
    { prop: 'date', label: '日期', minWidth: 180 },
    { prop: 'address', label: '地址', minWidth: 180 }
  ],
  list: [{
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-08',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-06',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-07',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }]
}

多选.parameters = {
  docs: {
    storyDescription: '选择多行数据。'
  }
}

export const 排序 = Template.bind({})
排序.args = {
  dataKey: 'date',
  columns: [
    { prop: 'name', label: '姓名', width: 140, sortable: true },
    { prop: 'date', label: '日期', minWidth: 180, sortable: true },
    { prop: 'address', label: '地址', minWidth: 180 }
  ],
  list: [{
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-08',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-06',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-07',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }]
}

排序.parameters = {
  docs: {
    storyDescription: '对表格进行排序，可快速查找或对比数据。'
  }
}

export const 树状表格 = Template.bind({})
树状表格.args = {
  rowKey: 'id',
  dataKey: 'id',
  defaultExpandAll: true,
  treeProps: { children: 'children', hasChildren: 'hasChildren' },
  columns: [
    { prop: 'name', label: '姓名', width: 140, sortable: true, explain: '可以排序哦' },
    { prop: 'date', label: '日期', minWidth: 180, sortable: true },
    { prop: 'address', label: '地址', minWidth: 180 }
  ],
  list: [{
    id: 1,
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: 2,
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    id: 3,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    children: [{
      id: 31,
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      id: 32,
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }]
  }, {
    id: 4,
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }]
}

树状表格.parameters = {
  docs: {
    storyDescription: '树形数据。当 row 中包含 children 字段时，被视为树形数据。渲染树形数据时，必须要指定 row-key。支持子节点数据异步加载。设置 Table 的 lazy 属性为 true 与加载函数 load 。通过指定 row 中的 hasChildren 字段来指定哪些行是包含子节点。children 与 hasChildren 都可以通过 tree-props 配置。'
  }
}
const TemplateSpanMethod = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },

    components: { DoTable },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2]
          } else if (columnIndex === 1) {
            return [0, 0]
          }
        }
      }
    },
    template: `<div>
          <do-table :span-method="arraySpanMethod" v-bind="args" />
        </div>`
  }
}
export const 合并行列 = TemplateSpanMethod.bind({})
合并行列.args = {
  columns: [
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: '姓名' },
    { prop: 'amount1', label: '数值1' },
    { prop: 'amount2', label: '数值2' },
    { prop: 'amount3', label: '数值3' }
  ],
  list: [{
    id: '12987122',
    name: '王小虎',
    amount1: '234',
    amount2: '3.2',
    amount3: 10
  }, {
    id: '12987123',
    name: '王小虎',
    amount1: '165',
    amount2: '4.43',
    amount3: 12
  }, {
    id: '12987124',
    name: '王小虎',
    amount1: '324',
    amount2: '1.9',
    amount3: 9
  }, {
    id: '12987125',
    name: '王小虎',
    amount1: '621',
    amount2: '2.2',
    amount3: 17
  }, {
    id: '12987126',
    name: '王小虎',
    amount1: '539',
    amount2: '4.1',
    amount3: 15
  }]
}

合并行列.parameters = {
  docs: {
    storyDescription: '多行或多列共用一个数据时，可以合并行或列。'
  }
}

export const 可复制 = Template.bind({})
可复制.args = {
  dataKey: 'name',
  columns: [
    {
      prop: 'name', label: 'Name', minWidth: 160, explain: '这是名称',
      copyable: ({ row }) => {
        return {
          copyText: `复制字段：${row.name}`
        }
      }
    },
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
    },
    {
      prop: 'description', label: 'description',
      copyable: () => ({})
    }
  ],
  list: [
    { name: 'Sam', mobile: '15299xxxx', sex: 0 },
    { name: 'Jean', mobile: '13452xxxx', sex: 1 },
    { name: 'Tony', mobile: '187233xxxx', sex: 0 },
    { name: 'Tony2', mobile: '187233xxxx', sex: 0, description: '一段很长的文案一段很长的文案一段很长的文案一段很长的文案一段很长的文案一段很长的文案一段很长的文案一段很长的文案一段很长的文案一段很长的文案一段很长的文案一段很长的文案一段很长的文案一段很长的文案' }
  ]
}
可复制.parameters = {
  docs: {
    storyDescription: '可以复制'
  }
}

const RadioTemplate = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },

    components: { DoTable },
    data() {
      return {
        selectedId: undefined,
        columns: [
          { prop: '', minWidth: 25,
            render: (createElement, { row }) => {
              return createElement(
                ElRadio, {
                  // props: {
                    label: row.id,
                    modelValue: this.selectedId
                  // }
                }
              )
            }
          },
          { prop: 'name', label: '姓名' },
          { prop: 'date', label: '日期', minWidth: 180 },
          { prop: 'address', label: '地址', minWidth: 180 }
        ]
      }
    },
    methods: {
      rowClick(row) {
        this.selectedId = row.id
      }
    },
    template: `<div>
          当前选中的id是：{{selectedId}}
          <do-table :columns="columns" v-bind="args" @row-click="rowClick" />
        </div>`
  }
}
// 单选
export const 单选 = RadioTemplate.bind({})
单选.args = {
  list: [{
    id: '1',
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '2',
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '3',
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '4',
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '5',
    date: '2016-05-08',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '6',
    date: '2016-05-06',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '7',
    date: '2016-05-07',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }]
}

单选.parameters = {
  docs: {
    storyDescription: '单选。'
  }
}

export const 大量数据 = Template.bind({})
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
大量数据.args = {
  size: 'large',
  height: '800px',
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
  ],
  list
}
大量数据.parameters = {
  docs: {
    storyDescription: '大量数据，验证虚拟列表是否生效'
  }
}
export const 大量数据空态 = Template.bind({})
大量数据空态.args = {
  emptyType: 3,
  emptyText: '自定义空态文案',
  height: '800px',
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
大量数据空态.parameters = {
  docs: {
    storyDescription: '通用空态，可以自定义样式和文案，通过emptyType为枚举开启，文案通过emptyText定制'
  }
}

const TemplateLoadmore = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },

    components: { DoTable },
    data() {
      return {
        list: list.slice(0, 99),
        i: 0
      }
    },
    methods: {
      loadMore($state) {
        setTimeout(() => {
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
        }, 3000)
      }
    },
    template: `<div>
          <do-table :loadMore="loadMore" :list="list" v-bind="args" />
        </div>`
  }
}
export const 底部加载更多 = TemplateLoadmore.bind({})

底部加载更多.args = {
  height: '800px',
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
底部加载更多.parameters = {
  docs: {
    storyDescription: '底部加载更多，由于使用了infinite-loading，故而在Canvas面板单独查看该Demo'
  }
}
