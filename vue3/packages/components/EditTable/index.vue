<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-07-13 15:16:24
 * @Description: 表格组件
-->
<template>
  <div class="do-edit-table">
    <el-form
      ref="form"
      :model="form"
      size="mini"
    >
      <el-table
        ref="table"
        v-loading="loading"
        :class="className"
        :data="form.realList"
        :border="border"
        :size="size"
        :span-method="spanMethod"
        :stripe="stripe"
        :height="height"
        :max-height="maxHeight"
        :fit="fit"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :row-key="rowKey"
        :empty-text="emptyText"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :tree-props="treeProps"
        :style="tableStyle"
        @select="(selection, row) => emitEventHandler('select', selection, row)"
        @select-all="(selection) => emitEventHandler('select-all', selection)"
        @selection-change="
          (selection) => emitEventHandler('selection-change', selection)
        "
        @cell-mouse-enter="
          (row, column, cell, event) =>
            emitEventHandler('cell-mouse-enter', row, column, cell, event)
        "
        @cell-mouse-leave="
          (row, column, cell, event) =>
            emitEventHandler('cell-mouse-leave', row, column, cell, event)
        "
        @cell-click="
          (row, column, cell, event) =>
            emitEventHandler('cell-click', row, column, cell, event)
        "
        @cell-dblclick="
          (row, column, cell, event) =>
            emitEventHandler('cell-dblclick', row, column, cell, event)
        "
        @row-click="
          (row, event, column) =>
            emitEventHandler('row-click', row, event, column)
        "
        @row-dblclick="
          (row, event) => emitEventHandler('row-dblclick', row, event)
        "
        @row-contextmenu="
          (row, event) => emitEventHandler('row-contextmenu', row, event)
        "
        @header-click="
          (column, event) => emitEventHandler('header-click', column, event)
        "
        @sort-change="(args) => emitEventHandler('sort-change', args)"
        @filter-change="(filters) => emitEventHandler('filter-change', filters)"
        @current-change="
          (currentRow, oldCurrentRow) =>
            emitEventHandler('current-change', currentRow, oldCurrentRow)
        "
        @header-dragend="
          (newWidth, oldWidth, column, event) =>
            emitEventHandler('header-dragend', newWidth, oldWidth, column, event)
        "
        @expand-change="
          (row, expanded) => emitEventHandler('expand-change', row, expanded)
        "
      >
        <!-- 对空态的处理 -->
        <template
          v-if="(emptyType !== -1)"
          #empty
        >
          <do-empty
            :type="emptyType"
            :text="emptyText"
          />
        </template>
        <slot name="prepend" />

        <template v-for="(column, columnIndex) in columns">
          <!-- 非多选框的正常情况下 -->
          <el-table-column
            v-if="column.type !== 'selection'"
            :key="columnIndex"
            :type="column.type"
            :column-key="column.columnKey"
            :prop="column.prop"
            :label="column.label"
            :width="column.minWidth"
            :min-width="column.minWidth"
            :fixed="column.fixed"
            :render-header="
              column.renderHeader
                ? column.renderHeader
                : column.explain
                  ? (h) => {
                    return renderExplain({ h, column });
                  }
                  : undefined
            "
            :sortable="column.sortable"
            :sort-by="column.sortBy"
            :sort-method="column.method"
            :resizable="column.resizable"
            :formatter="column.formatter"
            :align="column.align"
            :header-align="column.headerAlign || column.align"
            :class-name="column.className"
            :label-class-name="column.labelClassName"
            :selectable="column.selectable"
            :reserve-selection="column.reserveSelection"
            :filters="column.filters"
            :filter-placement="column.filterPlacement"
            :filter-multiple="column.filterMultiple"
            :filter-method="column.filterMethod"
            :filtered-value="column.filteredValue"
          >
            <!-- 表格 -->
            <template #default="scope">
              <!-- 校验prop的拼接需要特别注意，只有可编辑表格才需要表单的prop -->
              <el-form-item
                :rules="column.rules"
                :prop="editable ? 'realList.' + scope.$index + `.${editingDataKey}.${column.prop}` : ''"
              >
                <!-- 输入框组件 -->
                <el-input
                  v-if="
                    editable &&
                      scope.row[editingKey] &&
                      column.editStatus &&
                      column.editStatus.type === 'input'
                  "
                  v-model="scope.row[editingDataKey][column.prop]"
                  size="mini"
                  :readonly="column.editStatus.readonly"
                  :disabled="column.editStatus.disabled"
                  :clearable="column.editStatus.clearable"
                  :placeholder="column.editStatus.placeholder"
                  :show-password="column.editStatus.showPassword"
                  class="filter-field"
                  :style="
                    column.editStatus.style"
                  @input="(event) => handleInput(column, event, scope)"
                >
                  <template
                    v-if="column.editStatus.icon"
                    #prefix
                  >
                    <em
                      v-if="column.editStatus.icon"
                      class="el-input__icon"
                    >
                      <icon icon-class="search" />
                    </em>
                  </template>
                </el-input>
                <!-- 时间选择器组件 -->
                <el-date-picker
                  v-else-if="
                    editable &&
                      scope.row[editingKey] &&
                      column.editStatus &&
                      isDatePicker(column.editStatus.type)
                  "
                  :key="'dataRange-' + columnIndex"
                  v-model="scope.row[editingDataKey][column.prop]"
                  :style="
                    column.editStatus.style
                      ? column.editStatus.style
                      : 'width: 100%'
                  "
                  :type="column.editStatus.type"
                  :clearable="column.editStatus.clearable"
                  :placeholder="column.editStatus.placeholder"
                  :disabled="column.editStatus.disabled"
                  :readonly="column.editStatus.readonly"
                  :editable="column.editStatus.editable"
                  :prefix-icon="column.editStatus.prefixIcon"
                  :range-separator="column.editStatus.rangeSeparator!=null ? column.editStatus.rangeSeparator :'-'"
                  size="mini"
                  start-placeholder="开始日期"
                  class="dateRange-picker"
                  end-placeholder="结束日期"
                  :format="column.editStatus.format || 'YYYY-MM-DD'"
                  :value-format="column.editStatus.valueFormat || 'YYYY-MM-DD'"
                  :picker-options="column.editStatus.pickerOptions || {
                    firstDayOfWeek: 1
                  }"
                  @change="(date) => handleInput(column, date, scope)"
                />
                <!-- 下拉框组件 -->
                <el-select
                  v-else-if="
                    editable &&
                      scope.row[editingKey] &&
                      column.editStatus &&
                      column.editStatus.type === 'select'
                  "
                  :key="'select-' + columnIndex"
                  v-model="scope.row[editingDataKey][column.prop]"
                  :clearable="column.editStatus.clearable"
                  :disabled="column.editStatus.disabled"
                  :multiple="column.editStatus.multiple"
                  :autocomplete="column.editStatus.autocomplete"
                  :filterable="column.editStatus.filterable"
                  :style="column.editStatus.style"
                  :placeholder="column.editStatus.name"
                  size="mini"
                  class="filter-field"
                  @change="(date) => handleInput(column, date, scope)"
                >
                  <async-options
                    ref="asyncOptions"
                    :column="column"
                    :scope="scope"
                  />
                </el-select>
                <!-- 可以通过slot自定义复杂内容 -->
                <slot
                  v-else-if="column.slot"
                  :name="column.slot"
                />
                <do-render
                  v-else-if="column.render"
                  :render="column.render"
                  :params="{ row: scope.row, index: scope.$index }"
                />
                <el-tooltip
                  v-else-if="column.tooltip"
                  class="item"
                  effect="light"
                  :content="column.tooltip({ row: scope.row, index: scope.$index })"
                  placement="top"
                >
                  <span>{{ scope.row[column.prop] }}</span>
                </el-tooltip>
                <!-- 可复制 -->
                <el-tooltip
                  v-else-if="column.copyable"
                  class="item"
                  effect="light"
                  :content="column.copyable({ row: scope.row, index: scope.$index }).showText || scope.row[column.prop]"
                  placement="top"
                >
                  <table-clipboard
                    :copy-id="`${scope.row[column.prop]}-${scope.$index}`"
                    :show-text="column.copyable({ row: scope.row, index: scope.$index }).showText || scope.row[column.prop]"
                    :copy-text="column.copyable({ row: scope.row, index: scope.$index }).copyText || scope.row[column.prop]"
                  />
                </el-tooltip>
                <span v-else>
                  {{ scope.row[column.prop] }}
                </span>
              </el-form-item>
            </template>
          </el-table-column>
          <!-- 多选框，直接透传即可 -->
          <el-table-column
            v-else
            :key="`else_${columnIndex}`"
            v-bind="column"
          />
        </template>

        <slot name="append" />
      </el-table>
    </el-form>
  </div>
</template>

<script>
import { h } from 'vue'
import DoRender from '../Render'
import DoExplain from '../Explain'
import Icon from '../Icon'
import DoEmpty from '../Empty'
import TableClipboard from '../Table/components/TableClipboard'
import AsyncOptions from './components/asyncOptions'

/**
 * 可编辑表格组件，基于element table，通过json配置表格
 *
 * 建议直接使用TableForm组件
 *
 * 参数基本继承element的table
 *
 * 部分功能如合并单元格暂时未实现，请自己参考下面的例子来确定可用性
 *
 * 最重要的属性为columns，支持简单的值对应以及通过createElement来自定义列内容
 *
 * 例子：
 *
 * <img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20220726155302.png"/>
 *
 * <pre>
 * columns: [
 *   {
 *     prop: 'project',
 *     label: '项目',
 *     showOverflowTooltip: true
 *   },
 *   {
 *     prop: 'worklogType',
 *     label: '工时类型',
 *     showOverflowTooltip: true
 *   },
 *   {
 *     prop: 'timeSpentSeconds',
 *     label: '记录工时',
 *     showOverflowTooltip: true,
 *     render: (createElement, { row }) => {
 *       return createElement('span',
 *         secondToWorktime(row.timeSpentSeconds)
 *       )
 *     }
 *   },
 *   {
 *     prop: 'logDate',
 *     label: '登记日期',
 *     showOverflowTooltip: true
 *   },
 *   {
 *     prop: 'createdTime',
 *     label: '提交时间',
 *     showOverflowTooltip: true
 *   },
 *   {
 *     prop: 'updatedTime',
 *     label: '更新时间',
 *     showOverflowTooltip: true
 *   },
 *   {
 *     prop: 'status',
 *     label: '状态',
 *     showOverflowTooltip: true,
 *     render: (createElement, { row }) => {
 *       return createElement('span',
 *         row.status == 0 ? '正常' : '异常'
 *       )
 *     }
 *   },
 *   {
 *     prop: '',
 *     label: '操作',
 *     showOverflowTooltip: true,
 *     render: (createElement, { row }) => {
 *       return createElement(TableAction, {
 *         props: {
 *           icon: 'utfe-qiantaicaidan',
 *           actions: [
 *             {
 *               id: 'edit',
 *               name: '修改',
 *               hidden: false,
 *               icon: 'utfe-edit'
 *             },
 *             {
 *               id: 'history',
 *               name: '历史',
 *               hidden: false,
 *               icon: 'utfe-details'
 *             },
 *             {
 *               id: 'remove',
 *               name: '删除',
 *               hidden: false,
 *               icon: 'utfe-delete'
 *             }
 *           ],
 *           row: row,
 *           status: 0,
 *           dropdownDisable: false,
 *           clickHide: true
 *         },
 *         // 事件监听
 *         on: {
 *           action: this.onAction
 *         }
 *       })
 *     }
 *   }
 * ],
 * </pre>
 *
 */
export default {
  name: 'DoEditTable',
  components: {
    DoRender,
    DoEmpty,
    TableClipboard,
    Icon,
    AsyncOptions
  },
  props: {
    /**
     * 空态类型
     */
    emptyType: {
      type: Number,
      default: -1
    },
    /**
     * 是否为可编辑表格
     */
    editable: {
      type: Boolean,
      default: false
    },
    // 标识标记状态的key，可以替换为自己的
    editingKey: {
      type: String,
      default: 'isEditing'
    },
    // 标识标记数据的key，可以替换为自己的
    editingDataKey: {
      type: String,
      default: 'row_editing'
    },
    // 标识标记状态的key，新增的行会用到，可以替换为自己的
    editingNewKey: {
      type: String,
      default: 'isNew'
    },
    // 标识标记状态的key，校验会用到，可以替换为自己的
    editingValidKey: {
      type: String,
      default: 'validMessage'
    },
    /**
     * 加载loading，设为true即可
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 表格class
     */
    className: {
      type: String,
      default: ''
    },
    /**
     * 表头字段
     */
    columns: {
      type: Array,
      default: () => []
    },
    /**
     * 表格数据
     */
    list: {
      type: Array,
      default: () => []
    },

    // Element UI Table attributes
    // eslint-disable-next-line vue/require-default-prop
    height: [String, Number],
    // eslint-disable-next-line vue/require-default-prop
    maxHeight: [String, Number],
    // eslint-disable-next-line vue/require-default-prop
    size: String,
    stripe: Boolean,
    border: Boolean,
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    /**
     * 树形表格
     */
    // eslint-disable-next-line vue/require-default-prop
    treeProps: Object,
    highlightCurrentRow: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    currentRowKey: [String, Number],
    // eslint-disable-next-line vue/require-default-prop
    rowClassName: [String, Function],
    // eslint-disable-next-line vue/require-default-prop
    rowStyle: [String, Function],
    // eslint-disable-next-line vue/require-default-prop
    rowKey: [String, Function],
    // eslint-disable-next-line vue/require-default-prop
    emptyText: String,
    defaultExpandAll: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    expandRowKeys: Array,
    // eslint-disable-next-line vue/require-default-prop
    defaultSort: Object,
    // eslint-disable-next-line vue/require-default-prop
    tooltipEffect: String,
    // eslint-disable-next-line vue/require-default-prop
    showSummary: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    sumText: String,
    // eslint-disable-next-line vue/require-default-prop
    summaryMethod: Function,
    /**
     * 合并单元格列方法
     */
    // eslint-disable-next-line vue/require-default-prop
    spanMethod: Function,
    // custom attributes
    tableStyle: {
      type: String,
      default: 'width:100%;'
    }
  },
  data() {
    return {
      // 表单
      form: {
        realList: []
      }
    }
  },
  watch: {
    list: {
      immediate: true,
      handler: function(val, oldVal) {
        // 如果是可编辑表格，需要在第一次时加强一些隐藏字段
        if (this.editable) {
          this.initEditStatus()
        } else {
          this.form.realList = val
        }
      }
    }
  },
  methods: {
    /**
     * 对外暴露，用于刷新内部状态
     * @public
     */
    async refresh() {
      for (const item of this.$refs.asyncOptions || []) {
        await item.refresh()
      }
    },
    /**
     * 提供给外部增加用，仅可编辑表格可用
     * @public
     *
     */
    add(item) {
      if (!this.editable) return
      // 新增正在编辑状态、且标识为新的数据
      this.form.realList.push({
        ...item,
        [this.editingKey]: true,
        [this.editingNewKey]: true,
        [this.editingValidKey]: '',
        [this.editingDataKey]: {
          ...item
        }
      })
    },
    /**
     * 提供给外部增加用，仅可编辑表格可用
     * @public
     *
     */
    delete(index) {
      if (!this.editable) return
      this.form.realList.splice(index, 1)
    },
    /**
     * 提供给外部增加用
     * @public
     *
     */
    getList() {
      return this.form.realList
    },
    /**
     * 是否使用时间控件
     */
    isDatePicker(type) {
      return ['year', 'month', 'date', 'dates', 'week', 'datetime', 'daterange', 'monthrange', 'datetimerange'].includes(type)
    },
    // 编辑表单的处理，事件外抛
    handleInput(column, event, scope) {
      this.$emit('tableEditingInput', {
        column,
        event,
        scope,
        list: this.form.realList
      })
    },
    // 初始化可编辑表格
    initEditStatus() {
      this.form.realList = this.list.map((item) => {
        return {
          ...item,
          [this.editingKey]: false,
          [this.editingNewKey]: false,
          [this.editingValidKey]: '',
          [this.editingDataKey]: {
            ...item
          }
        }
      })
    },
    emitEventHandler(event, ...params) {
      this.$emit(event, ...params)
    },
    renderExplain({ column }) {
      return h('span', [
        h('span', column.label),
        h(DoExplain, {
          style: {
            marginLeft: '4px'
          },
          props: {
            explain: column.explain
          }
        })
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.do-edit-table {
  margin-bottom: 20px;
}
</style>
