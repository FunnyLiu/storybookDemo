<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-07-13 15:16:24
 * @Description: 表格组件
-->
<template>
  <div class="do-table">
    <virtual-scroll
      ref="scroller"
      :data="list"
      :key-prop="(rowKey || dataKey)"
      @changeList="changeList"
    >
      <el-table
        ref="table"
        v-loading="loading"
        :class="className"
        :data="virtualList"
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
        :row-key="(rowKey || dataKey)"
        :empty-text="emptyText"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :tree-props="treeProps"
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
                  ? (h)=> { return renderExplain({h, column})}
                  : undefined
            "
            :sortable="column.sortable"
            :sort-by="column.sortBy"
            :sort-method="column.method"
            :resizable="column.resizable"
            :formatter="column.formatter"
            :show-overflow-tooltip="column.showOverflowTooltip"
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
            <template #default="scope">
              <do-render
                v-if="column.render"
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
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="`else_${columnIndex}`"
            v-bind="column"
            :type="column.type"
            :width="column.width"
          />
        </template>

        <slot name="append" />
        <template
          v-if="loadMore"
          #append
        >
          <InfiniteLoading
            force-use-infinite-wrapper=".el-table__body-wrapper"
            @infinite="loadMore"
          >
            <div slot="no-more" />
            <div slot="no-results" />
          </InfiniteLoading>
        </template>
      </el-table>
    </virtual-scroll>
  </div>
</template>

<script>
import { h } from 'vue'
import DoRender from '../Render'
import DoExplain from '../Explain'
import DoEmpty from '../Empty'
import InfiniteLoading from '../InfiniteLoading'
import TableClipboard from '../Table/components/TableClipboard'
import VirtualScroll from './components/el-table-virtual-scroll.vue'

/**
 * 表格组件，基于element table，通过json配置表格
 *
 * 建议直接使用ListView组件
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
  name: 'DoInfiniteTable',
  components: {
    DoRender,
    DoEmpty,
    TableClipboard,
    VirtualScroll,
    InfiniteLoading
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
     * 加载更多
     */
    loadMore: {
      type: Function,
      default: undefined
    },
    /**
     * 唯一标识的key，默认为id
     */
    dataKey: {
      type: String,
      default: 'id'
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
      virtualList: []
    }
  },
  methods: {
    changeList(renderData) {
      this.virtualList = renderData
    },
    async refresh() {

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
.do-table {
  margin-bottom: 20px;
  :deep(.el-table__body-wrapper) {
    overflow: auto
  }
}
</style>
