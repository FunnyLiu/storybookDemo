<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-07-13 19:16:24
 * @Description: 通用列表（带搜索、表格、分页功能）
-->
<template>
  <div class="do-list-view">
    <do-filter
      v-if="filters && filters.length > 0"
      ref="filter"
      :complex-search="complexSearch"
      :default-complex-search-open="defaultComplexSearchOpen"
      :filters="filters"
      @filtered="filtered"
    >
      <template v-for="filter in filters">
        <template
          v-if="filter.slot"
          :slot="filter.slot"
        >
          <slot :name="filter.slot" />
        </template>
      </template>
    </do-filter>
    <slot name="preTable" />
    <do-render
      v-if="renderBetweenFilterAndTable"
      :render="renderBetweenFilterAndTable"
    />
    <el-card class="box-card">
      <!-- 可编辑表格 -->
      <do-edit-table
        v-if="editable"
        ref="table"
        v-bind="$attrs"
        :columns="showColumns"
        :editable="editable"
        :list="showList"
        v-on="$listeners"
      />
      <!-- 无限表格 -->
      <do-infinite-table
        v-else-if="infinite"
        ref="table"
        :key="tableKey"
        v-bind="$attrs"
        :columns="showColumns"
        :list="showList"
        :load-more="type === 'local' ? undefined : loadMore"
        v-on="$listeners"
      />
      <!-- 纯展示表格 -->
      <do-table
        v-else
        ref="table"
        v-bind="$attrs"
        :columns="showColumns"
        :list="showList"
        v-on="$listeners"
      />
      <div class="do-list-view-footer">
        <el-pagination
          v-if="showPagination"
          ref="elPagination"
          :current-page="currentPage"
          :page-sizes="initPageSizes"
          :page-size="newPagesize"
          background
          layout="total, prev, pager, next, sizes, jumper"
          :total="showTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <do-tools
          :columns="columns"
          :cache-key="cacheKey"
          @getNewColumns="getNewColumns"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import DoRender from '../Render'
import DoFilter from '../Filter/index.vue'
import DoTable from '../Table/index.vue'
import DoEditTable from '../EditTable/index.vue'
import DoInfiniteTable from '../InfiniteTable/index.vue'
import DoTools from '../Tools/index.vue'
import { random } from '../../utils/string'

/**
 * 通用列表（带搜索、表格、分页功能）
 *
 * 基于Table和Filter组件封装而来，业务场景直接使用ListView组件即可
 *
 * 参数会透传给Table组件
 *
 * 同时支持前端分页+搜索的local模式和后端分页+搜索的remote模式
 *
 * 使用方式：
 *
 * remote模式：
 * <img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20220726161923.png"/>
 *
 * 模板如下：
 *
 * <br />
 * <code><list-view ref="list" type="remote" :loading="loading" :filters="filters"</code>
 * <br />
 * <code>:total="total" :columns="columns" tooltip-effect="light" :fit="true" :list="list"</code>
 * <br />
 * <code>@action="onAction" @change="onAction({ key: 'change', params: $event })" /></code>
 *
 * 脚本如下：
 *
 * <pre>
 * import { ListView, TableAction } from '@ccpow/devopslib'
 * import ListviewMixin from '@ccpow/devopslib/packages/mixins/listview'
 * import { getWorkGroupList, deleteWorkGroup } from '@/api/utbeService'
 * export default {
 *   name: 'WorkingGroup',
 *   components: {
 *     ListView
 *   },
 *   // 必须依赖该mixin
 *   mixins: [ListviewMixin],
 *   data() {
 *     return {
 *       filters: [
 *         {
 *           type: 'input',
 *           prop: 'name',
 *           placeholder: '组名',
 *           icon: true
 *         },
 *         {
 *           type: 'select',
 *           name: '归属部门',
 *           placeholder: '归属部门',
 *           prop: 'departmentId',
 *           clearable: true,
 *           options: []
 *         },
 *         this.getInnerFilter('clear'),
 *         {
 *           type: 'primary',
 *           id: 'create',
 *           name: '创建',
 *           wrapStyle: {
 *             float: 'right'
 *           }
 *         },
 *         this.getInnerFilter('refresh')
 *       ],
 *       columns: [
 *         { prop: 'name', label: '组名', showOverflowTooltip: true },
 *         {
 *           prop: 'departmentName',
 *           label: '归属部门',
 *           showOverflowTooltip: true
 *         },
 *         { prop: 'ownerName', label: '组长', showOverflowTooltip: true },
 *         { prop: 'memberCnt', label: '组员人数', showOverflowTooltip: true },
 *         {
 *           prop: '',
 *           label: '操作',
 *           minWidth: 120,
 *           showOverflowTooltip: true,
 *           render: (createElement, { row }) => {
 *             return createElement(TableAction, {
 *               props: {
 *                 icon: 'utfe-qiantaicaidan',
 *                 actions: [
 *                   {
 *                     id: 'edit',
 *                     name: '编辑',
 *                     hidden: false,
 *                     icon: 'utfe-edit'
 *                   },
 *                   {
 *                     id: 'member',
 *                     name: '成员管理',
 *                     hidden: false,
 *                     icon: 'utfe-details'
 *                   },
 *                   {
 *                     id: 'remove',
 *                     name: '删除',
 *                     hidden: false,
 *                     icon: 'utfe-delete'
 *                   }
 *                 ],
 *                 row: row,
 *                 status: 0,
 *                 dropdownDisable: false,
 *                 clickHide: true
 *               },
 *               // 事件监听
 *               on: {
 *                 action: this.onAction
 *               }
 *             })
 *           }
 *         }
 *       ]
 *     }
 *   },
 *   created() {
 *     // 如果filter内容来自远端，需要format
 *     this.initFilter()
 *     // 请求列表
 *     this.getList()
 *   },
 *   methods: {
 *     async initFilter() {
 *       // 做一下filter的format
 *       const [departments] = await Promise.all([
 *         this.$store.dispatch('working/getDepartments')
 *       ])
 *       this.filters.forEach((filter) => {
 *         if (filter.prop === 'departmentId') {
 *           filter.options = departments.map((department) => {
 *             return {
 *               value: department.id,
 *               display: department.name
 *             }
 *           })
 *         }
 *       })
 *     },
 *     async getList() {
 *       this.loading = true
 *       try {
 *         // 发起请求，或者做一下前后置的数据format
 *         const result = await getWorkGroupList(this.params)
 *         if (result.status != 200) {
 *           return
 *         }
 *         this.loading = false
 *         const { data, total } = result
 *         this.list = data
 *         this.total = total
 *       } catch (error) {
 *         this.loading = false
 *       }
 *     },
 *     // 所有的动作均在onAction中处理
 *     // 其中clear，refresh和change可以内置处理
 *     onAction({ key, params, row }) {
 *       switch (key) {
 *         case 'clear':
 *           this.getInnerActionHandler('clear')()
 *           break
 *         case 'refresh':
 *           this.getInnerActionHandler('refresh')()
 *           break
 *         case 'create':
 *           break
 *         case 'edit':
 *           break
 *         case 'change':
 *           this.getInnerActionHandler('change', params)()
 *           break
 *         case 'remove':
 *           this.$confirm('是否删除?', '提示', {
 *             confirmButtonText: '确定',
 *             cancelButtonText: '取消',
 *             type: 'warning'
 *           }).then(() => {
 *             deleteWorkGroup(row.id).then((res) => {
 *               this.$message.success('删除成功!')
 *               this.getList()
 *             })
 *           })
 *           break
 *         default:
 *           break
 *       }
 *     }
 *   }
 * }
 *
 * </pre>
 */
export default {
  name: 'DoListView',
  components: {
    DoRender,
    DoFilter,
    DoTable,
    DoEditTable,
    DoInfiniteTable,
    DoTools
  },
  props: {
    /**
     * 自定义Render区域
     */
    renderBetweenFilterAndTable: {
      type: Function || undefined,
      default: undefined
    },
    /**
     * 缓存用的key，每个创建传单独的
     */
    cacheKey: {
      type: String,
      default: ''
    },
    /**
     * 复杂搜索模式，点击自动缩放搜索视图
     */
    complexSearch: {
      type: Boolean,
      default: false
    },
    /**
     * 默认展开复杂搜索
     */
    defaultComplexSearchOpen: {
      type: Boolean,
      default: true
    },
    /**
     * 无限的，使用无限列表
     */
    infinite: {
      type: Boolean,
      default: false
    },
    /**
     * 是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * 是否展示分页
     */
    showPagination: {
      type: Boolean,
      default: true
    },
    /**
     * 过滤器对象数组
     * <br />
     * 完整demo请参考Filter组件的各种Story
     * <br />
     * <code>type</code> 表单类型，支持input/select/cascader/date相关所有/button相关所有
     * <br>
     * <code>prop</code> 表单对应的值，和后端接口查询条件保持一致
     * <br>
     * <code>id</code> 按钮对应的actionId，在onAction中会抛出
     * <br>
     * <code>compareMethod</code> 计算逻辑，local模式下，筛选后的过滤方式，部分组件不是简单的模糊查询，故而需要通过该函数定制
     * <br>
     * <code>其他参数</code> 用来透传给每个子表单组件
     * <br>
     */
    filters: {
      type: Array,
      default: () => []
    },
    /**
     * 数据内容，需要和columns属性相互映射
     * <br />
     * 完整demo请参考Table组件的各种Story
     * <br>
     * 此处展示columns参数
     * <code>prop</code> 列的取值，一般情况直接展示，需要format则自己定制render函数
     * <br>
     * <code>label</code> 表头文案
     * <br>
     * <code>render</code> 自定义渲染函数，非常灵活，通过createElement方法来自定义dom
     * <br>
     * <code>其他参数</code> 用来透传给el-table-column组件
     * <br>
     */
    list: {
      type: Array,
      default: () => []
    },
    /**
     * 表格列
     */
    columns: {
      type: Array,
      default: () => []
    },
    /**
     * 总数量，local模式下不需要传，listView会自动计算，但是remote情况下需要手动传递更新
     */
    total: {
      type: Number,
      default: 0
    },
    /**
     * 自定义pagesize，请传入的initPageSize，即默认的pagesize
     */
    initPageSize: {
      type: Number,
      default: 10
    },
    /**
     * 分页数组，请传入initPageSizes，实现自定义分页
     */
    initPageSizes: {
      type: Array,
      default: () => [5, 10, 20, 30]
    },
    /**
     * 类型，local为本地数据，请传入list，所有分页和搜索就是前端完成，remote为远端数据
     */
    type: {
      type: String,
      default: 'remote',
      validator(value) {
        const types = ['remote', 'local']
        const validType = types.indexOf(value) !== -1
        if (!validType) {
          throw new Error(
            `Invalid type of '${value}', please set one type of 'remote' or 'local'.`
          )
        }
        return validType
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      newPagesize: this.initPageSize,
      // filter的参数
      params: {
        pageSize: this.initPageSize,
        pageIndex: 1
      },
      // 本地模式下用来缓存的列表组件
      cacheList: [],
      // 用来展示的列表
      showList: [],
      // 用来展示哪几列
      showColumns: [],
      // 用来展示的总个数
      showTotal: 0,
      tableKey: random(10)
    }
  },
  watch: {
    columns: {
      handler(value) {
        this.showColumns = value
      },
      immediate: true
    },
    list: function(value) {
      if (this.type === 'local') {
        this.loadLocalData(value)
        this.showTotal = this.list.length
      } else {
        // 远程请求的total，从外界传入
        this.showTotal = this.total
        this.showList = value
        // 如果当前页请求没有数据，且不是第一页，则页面应该去第一页
        if (!value || value.length == 0) {
          // 如果不在第一页，就手动触发一次
          if (this.currentPage != 1) {
            this.currentPage = 1
            // 手动触发一次刷新，帮外部刷新一次列表
            this.$emit('action', { key: 'refresh' })
          }
        }
      }
    }
  },
  mounted() {
    if (this.type === 'local') {
      this.loadLocalData(this.list)
      this.showTotal = this.list.length
    } else {
      // 远程请求的total，从外界传入
      this.showTotal = this.total
      this.showList = this.list
    }
  },
  methods: {
    /**
     * 重置表格，用于重新render复杂组件
     * @public
     */
    reset() {
      this.tableKey = random(10)
    },
    /**
     * 无限下拉列表中的分页加载更多
     */
    loadMore($state) {
      this.$emit('loadMore', {
        currentPage: this.currentPage,
        $state
      })
      this.currentPage = this.currentPage + 1
    },
    /**
     * 提供给外部增加用，刷新内部状态
     * @public
     */
    async refresh() {
      await this.$refs.table.refresh()
    },
    /**
     * 提供给外部增加用，仅可编辑表格可用
     * @public
     *
     */
    add(item) {
      this.$refs.table.add(item)
    },
    /**
     * 提供给外部增加用，仅可编辑表格可用
     * @public
     *
     */
    delete(index) {
      this.$refs.table.delete(index)
    },
    /**
     * 清空filter，对外暴露使用
     */
    resetFilter(params) {
      this.$refs.filter.reset(params)
    },
    /**
     * 获取filter参数值
     */
    getParams() {
      return {
        ...this.$refs.filter.getParams(),
        pageIndex: this.currentPage,
        pageSize: this.newPagesize
      }
    },
    loadLocalData(data) {
      data = data || []
      this.showList = this.pageFilter(data)
      const cacheData = JSON.parse(JSON.stringify(data))
      this.cacheList = cacheData
    },
    filtered(params) {
      this.$emit('filtered', params)
      // 搜索条件和清除按钮变化后，会默认将页码设为1
      if (Object.keys(this.params).concat(['clear']).includes(params.key)) {
        this.currentPage = 1
      }
      this.changeData(params)
      // filter中表单控件才触发change，按钮不需要触发
      if (Object.keys(this.params).includes(params.key)) {
        this.$emit('change', this.params)
      } else {
        // 按钮等统一触发action事件
        this.$emit('action', params)
      }
    },
    fetchLocalData() {
      // 比较函数，可以自定义扩展
      const params = this.params
      // 本地模式，自己过滤即可
      const validParamKeys = (Object.keys(params) || []).filter((v) => {
        return (
          params[v] !== undefined &&
          params[v] !== '' &&
          params[v] !== null &&
          v !== 'pageSize' &&
          v !== 'pageIndex'
        )
      })
      if (validParamKeys.length > 0) {
        const validData = this.getValidData()

        this.showList = this.pageFilter(validData)
        this.showTotal = validData.length
      } else {
        this.showTotal = this.cacheList.length
        this.showList = this.pageFilter(this.cacheList)
      }
    },
    /**
     * 获取符合搜索条件的list
     * @public
     */
    getValidData() {
      // 比较函数，可以自定义扩展
      const params = this.params
      // 本地模式，自己过滤即可
      const validParamKeys =
        (Object.keys(params) || []).filter((v) => {
          return (
            params[v] !== undefined &&
            params[v] !== '' &&
            params[v] !== null &&
            v !== 'pageSize' &&
            v !== 'pageIndex'
          )
        }) || []
      const validData = this.cacheList.filter((v) => {
        const valids = []
        validParamKeys.forEach((vv) => {
          const compareMethod = this.filters.find((item) => {
            return item.prop === vv
          }).compareMethod
          // 如果设置了自定义比较函数，则通过自定义比较函数来计算规则
          if (compareMethod) {
            valids.push(
              v[vv] == params[vv] ||
                v[vv].includes(params[vv]) ||
                compareMethod({
                  event: params[vv],
                  col: v[vv]
                })
            )
            // 否则就用传统的包含或相对来进行字符串匹配
          } else {
            valids.push(v[vv] == params[vv] || v[vv].includes(params[vv]))
          }
        })
        return valids.every((vvv) => {
          return vvv
        })
      })
      return validData
    },
    changeData({ key, event, params }) {
      this.params = {
        ...this.params,
        ...params
      }
      if (this.type === 'local') {
        this.fetchLocalData()
      }
    },
    emitPageChange() {
      this.params = {
        ...this.params,
        pageSize: this.newPagesize,
        pageIndex: this.currentPage
      }
      this.$emit('pageChange', {
        pageSize: this.newPagesize,
        pageIndex: this.currentPage
      })
      this.$emit('change', this.params)
    },
    handleSizeChange(size) {
      this.newPagesize = size
      if (this.type === 'local') {
        this.fetchLocalData()
      }
      this.emitPageChange()
    },
    handleCurrentChange(pageIndex) {
      console.log('handlerCurrentChange', pageIndex)
      this.currentPage = pageIndex
      if (this.type === 'local') {
        this.fetchLocalData()
      }
      this.emitPageChange()
    },
    pageFilter(data) {
      const { currentPage, newPagesize } = this
      return data.filter((v, i) => {
        return (
          i >= (currentPage - 1) * newPagesize && i < currentPage * newPagesize
        )
      })
    },
    /**
     * 对外暴露，灵活设置展示列表
     * @public
     * @param {array} data 列表
     */
    setShowList(data) {
      this.showList = data
    },
    /**
     * 对外暴露，获取真正的列表
     * @public
     */
    getList() {
      return this.$refs.table.getList()
    },
    /**
     * 获得新的可展示列
     */
    getNewColumns(columns) {
      this.showColumns = columns
    }
  }
}
</script>

<style  lang="scss" scoped>
.do-list-view {
  &-footer {
    display: flex;
    justify-content: space-between;
  }
}
:deep(.el-card__body) {
  position: relative;
}
:deep(.do-list-view-tools) {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
:deep(.el-select .el-input__inner) {
  height: 28px;
  line-height: 28px;
}
</style>
