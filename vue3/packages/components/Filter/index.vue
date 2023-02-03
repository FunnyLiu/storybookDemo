<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-07-12 15:16:24
 * @Description: 搜索过滤器组件
-->
<template>
  <div
    class="filter"
  >
    <el-form
      ref="form"
      v-resizeDirective="{callback:resizeDirective,stargegy:'width'}"
      :model="params"
      inline="inline"
      :class="{ complex: complexSearch}"
      @submit.native.prevent
    >
      <el-form-item
        v-for="(filter, index) in filters"
        ref="items"
        :key="index"
        v-permission
        :class="{ action: isButton(filter.type)}"
        :data-permission="filter.permission"
        :prop="filter.prop"
        :label="filter.label"
        :rules="filter.rules || []"
        :style="filter.wrapStyle"
        :label-width="filter.labelWidth ? filter.labelWidth + 'px' : ''"
      >
        <!-- 下拉框组件 -->
        <el-select
          v-if="filter.type == 'select'"
          :key="'select-' + index"
          v-model="params[filter.modelValue]"
          :clearable="filter.clearable"
          :disabled="filter.disabled"
          :multiple="filter.multiple"
          :autocomplete="filter.autocomplete"
          :filterable="filter.filterable"
          :style="filter.style ? filter.style : 'width: 200px;'"
          :placeholder="filter.name"
          class="filter-field"
          @change="(event) => handleFilter(filter, event)"
        >
          <el-option
            v-for="(option, idx) in filter.options"
            :key="idx"
            :label="option.display||option.label"
            :value="option.value"
            :disabled="option.disabled"
          />
        </el-select>
        <!-- 级联选择组件 -->
        <el-cascader
          v-if="filter.type == 'cascader'"
          :key="'cascader-' + index"
          :value="params[filter.modelValue]"
          :clearable="filter.clearable"
          :disabled="filter.disabled"
          :filterable="filter.filterable"
          :style="filter.style ? filter.style : 'width: 200px;'"
          :placeholder="filter.name"
          :props="filter.props"
          :options="filter.options"
          class="filter-field"
          @change="changeDate(filter, $event)"
        />
        <!-- 时间选择按钮组件 -->
        <do-date-picker-button
          v-else-if="filter.subType === 'datepickerButton'"
          :key="'datepickerButton-' + index"
          :ref="'datepickerButton-' + index"
          :value="params[filter.modelValue]"
          :text="filter.name"
          :style="filter.style"
          :type="filter.type"
          :clearable="filter.clearable"
          :placeholder="filter.placeholder"
          :disabled="filter.disabled"
          :readonly="filter.readonly"
          :editable="filter.editable"
          :prefix-icon="filter.prefixIcon"
          :range-separator="filter.rangeSeparator!=null ? filter.rangeSeparator :'-'"
          start-placeholder="开始日期"
          class="dateRange-picker"
          end-placeholder="结束日期"
          :format="filter.format || 'YYYY-MM-DD'"
          :value-format="filter.valueFormat || 'YYYY-MM-DD'"
          :picker-options="filter.pickerOptions"
          :shortcuts="(filter.pickerOptions || {}).shortcuts"
          @change="changeDateButton(filter, $event, index)"
        />
        <!-- 时间选择器组件 -->
        <el-date-picker
          v-else-if="isDatePicker(filter.type)"
          :key="'dataRange-' + index"
          v-model="params[filter.modelValue]"
          :style="
            filter.style
              ? filter.style
              : isMultiProps(filter.type)
                ? 'width: 400px;'
                : 'width: 200px;'
          "
          :type="filter.type"
          :clearable="filter.clearable"
          :placeholder="filter.placeholder"
          :disabled="filter.disabled"
          :readonly="filter.readonly"
          :editable="filter.editable"
          :prefix-icon="filter.prefixIcon"
          :range-separator="filter.rangeSeparator!=null ? filter.rangeSeparator :'-'"
          start-placeholder="开始日期"
          class="dateRange-picker"
          end-placeholder="结束日期"
          :format="filter.format || 'YYYY-MM-DD'"
          :value-format="filter.valueFormat || 'YYYY-MM-DD'"
          :picker-options="filter.pickerOptions"
          :shortcuts="(filter.pickerOptions || {}).shortcuts"
          @change="(date) => changeDate(filter, date)"
        />
        <!-- 输入框组件 -->
        <el-input
          v-if="filter.type === 'input'"
          v-model.trim="params[filter.modelValue]"
          :readonly="filter.readonly"
          :disabled="filter.disabled"
          :clearable="filter.clearable"
          :placeholder="filter.placeholder"
          class="filter-field"
          :style="filter.style ? filter.style : 'width: 200px;'"
          @input="(event) => handleFilter(filter, event)"
        >
          <template
            v-if="filter.icon"
            #prefix
          >
            <em
              v-if="filter.icon"
              class="el-input__icon"
            >
              <icon icon-class="search" />
            </em>
          </template>
        </el-input>
        <!-- 按钮下拉菜单 ,也称为按钮组-->
        <el-dropdown
          v-if="isButtonGroup(filter)"
          :split-button="filter.splitButton"
          :type="filter.type"
          @click="() => handleFilter(filter, filter.id)"
          @command="(event) => handleFilter(filter, event)"
        >
          <el-button
            v-if="!filter.splitButton"
            :key="filter.id"
            :type="filter.type === 'button'?'': filter.type"
            :plain="filter.plain"
            :round="filter.round"
            :circle="filter.circle"
            :style="filter.style"
            :icon="filter.icon ? formatIconName(filter.icon): undefined"
            :disabled="filter.disabled"
          >
            {{ filter.name }}
            <em>
              <icon icon-class="arrow-down" />
            </em>
          </el-button>
          <template
            v-else
          >
            {{ filter.name }}
          </template>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(option, idx) in filter.options"
                :key="idx"
                :disabled="option.disabled"
                :divided="option.divided"
                :icon="option.icon ? formatIconName(option.icon): undefined"
                :command="option.id"
              >{{ option.display||option.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 普通按钮而不是按钮组 -->
        <el-button
          v-else-if="isButton(filter.type)"
          :key="filter.id"
          :type="filter.type === 'button'?'': filter.type"
          :plain="filter.plain"
          :round="filter.round"
          :circle="filter.circle"
          :style="filter.style"
          :icon="filter.icon"
          :disabled="filter.disabled"
          class="filter-field"
          @click="(event) => handleFilter(filter, event)"
        >
          {{ filter.name }}
        </el-button>
        <do-render
          v-if="filter.render"
          :render="filter.render"
          :params="filter"
        />
        <!-- 可以通过slot自定义复杂内容 -->
        <slot
          v-if="filter.slot"
          :name="filter.slot"
        />
      </el-form-item>
    </el-form>
    <!-- 开启复杂搜索模式，可以自动缩放 -->
    <div
      v-if="complexSearch && shouldShowComplexSearch"
      class="filter-search"
    >
      <div class="line1" />
      <div class="line2" />
      <span
        v-if="isComplexSearchOpen"
        class="el-dropdown-link"
        @click="toggleSearch"
      >
        收起搜索
        <em>
          <icon icon-class="arrow-up" />
        </em>
      </span>
      <span
        v-else
        class="el-dropdown-link"
        @click="toggleSearch"
      >
        展开搜索
        <em>
          <icon icon-class="arrow-down" />
        </em>
      </span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import DoRender from '../Render'
import Icon from '../Icon'
import DoDatePickerButton from '../DatePickerButton'
import { debounce } from '../../utils/func'
import { formatDate } from '../../utils/date'
import { resizeDirective } from '../../directives/resizeDirective'
/**
 * 搜索过滤器组件，基于element的表单元素，通过json配置查询条
 *
 * 建议使用ListView组件
 *
 * 部分表单子组件暂时未实现，请自己参考下面的例子来确定可行性
 *
 * 最重要的属性为filters，支持简单的值对应以及通过createElement来自定义内容
 *
 * 例子：
 *
 * <img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20220726155533.png"/>
 *
 * <pre>
 * filters: [
 *   {
 *     type: 'cascader',
 *     name: '归属项目',
 *     placeholder: '归属项目',
 *     prop: 'project',
 *     props: {
 *       checkStrictly: true,
 *       value: 'id',
 *       label: 'name'
 *     },
 *     clearable: true,
 *     options: []
 *   },
 *   {
 *     type: 'daterange',
 *     prop: 'logDate',
 *     compareMethod: ({ event, col }) => {
 *       if (event) {
 *         const [from, to] = event
 *         if (moment(col).isBetween(from, to, null, '[]')) {
 *           return true
 *         }
 *       }
 *       return false
 *     },
 *     name: '时间段',
 *     clearable: true
 *   },
 *   {
 *     type: 'select',
 *     name: '状态',
 *     placeholder: '状态',
 *     prop: 'status',
 *     clearable: true,
 *     options: [
 *       {
 *         value: '0',
 *         display: '正常'
 *       },
 *       {
 *         value: '1',
 *         display: '异常'
 *       }
 *     ]
 *   },
 *   {
 *     type: 'button',
 *     id: 'clear',
 *     name: '清除'
 *   },
 *   {
 *     type: 'primary',
 *     id: 'register',
 *     icon: 'el-icon-plus',
 *     name: '登记工时',
 *     wrapStyle: {
 *       float: 'right'
 *     }
 *   },
 *   {
 *     type: 'primary',
 *     id: 'refresh',
 *     plain: true,
 *     icon: 'el-icon-refresh',
 *     name: '刷新',
 *     wrapStyle: {
 *       float: 'right'
 *     }
 *   }
 * ],
 * </pre>
 */
export default {
  name: 'DoFilter',
  directives: {
    resizeDirective
  },
  components: {
    DoRender,
    DoDatePickerButton,
    Icon
  },
  props: {
    /**
     * 过滤字段，支持多种type如
     */
    filters: {
      type: Array,
      default: () => []
    },
    /**
     * 防抖时间
     */
    filterDebounceTime: {
      type: Number,
      default: 300
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
    }
  },
  data() {
    const params = {}
    this.filters.map((v, i) => {
      // 操作类比如按钮等不需要指定prop，故而不算在params中
      if (!v.prop) return
      v.modelValue = v.prop
      params[v.prop] = v.value
    })
    return {
      params,
      allItemsWidthList: [],
      filterDebounce: null,
      isComplexSearchOpen: !this.defaultComplexSearchOpen,
      shouldShowComplexSearch: true // 如果计算发现压根不需要，则不管如何设置，均不展示
    }
  },
  watch: {
    filters: {
      handler: function(val) {
        this.filters.map((v, i) => {
          // 操作类比如按钮等不需要指定prop，故而不算在params中
          if (!v.prop) return
          v.modelValue = v.prop
          this.params[v.prop] = v.value
        })
        // 如果开启了复杂搜索功能，就根据defaultComplexSearchOpen来初始化
        this.init()
      },
      deep: true
    }
  },
  created() {
    this.filterDebounce = debounce(this.emitFiltered, this.filterDebounceTime)
  },
  mounted() {
    // 如果开启了复杂搜索功能，就根据defaultComplexSearchOpen来初始化
    this.init()
  },
  methods: {
    // 初始化
    init() {
      // 如果开启了复杂搜索功能，就根据defaultComplexSearchOpen来初始化
      if (this.complexSearch) {
        this.$refs.items.forEach(ele => {
          this.allItemsWidthList.push(ele.$el.scrollWidth)
        })
        this.initSearch()
        this.toggleSearch()
      }
    },
    // 宽度变化后触发
    resizeDirective({ width, height }) {
      if (this.complexSearch) {
        this.initSearch()
        // this.toggleSearch()
      }
    },
    // 判断是否需要启用高级搜索
    initSearch() {
      const totalWidth = this.$refs.form.$el.scrollWidth
      const itemNodeList = this.$refs.items
      let allItemsWidth = 0
      let allActionWidth = 0
      itemNodeList.forEach((ele, index) => {
        allItemsWidth = allItemsWidth + this.allItemsWidthList[index]
        if (ele.$el.className.includes('action')) {
          allActionWidth = allActionWidth + ele.$el.scrollWidth
        }
      })
      // 如果所有元素加起来还不够一行，那不需要展开收起功能
      if (allItemsWidth <= totalWidth) {
        this.shouldShowComplexSearch = false
      } else {
        this.shouldShowComplexSearch = true
      }
    },
    // 切换展开收起
    toggleSearch() {
      const totalWidth = this.$refs.form.$el.scrollWidth
      const itemNodeList = this.$refs.items
      let allItemsWidth = 0
      let allActionWidth = 0
      itemNodeList.forEach(ele => {
        allItemsWidth = allItemsWidth + ele.$el.scrollWidth
        if (ele.$el.className.includes('action')) {
          allActionWidth = allActionWidth + ele.$el.scrollWidth
        }
      })
      const allowMaxWidth = totalWidth - allActionWidth
      let width = 0
      itemNodeList.forEach((itemNode, index) => {
        if (itemNode.$el.className.includes('action')) return
        const node = itemNode.$el
        if (this.isComplexSearchOpen) {
          width = width + this.allItemsWidthList[index]
          // 如果是开启情况下点击了收起
          if (width >= allowMaxWidth) {
            node.style.display = 'none'
            width = width + this.allItemsWidthList[index]
          }
        } else {
          // 如果是收起情况下点击了展开
          node.style.display = 'inline-block'
        }
      })
      this.isComplexSearchOpen = !this.isComplexSearchOpen
    },
    /**
     * 兼容element和element-plus的icon名称
     */
    formatIconName(str) {
      if (str.startsWith('el-icon-')) {
        let result = str.substring(8)
        result = result.replace(/-(\w)/g, (match, letter) => letter.toUpperCase());
        return result;
      }
      return str;
    },
    /**
     * 对外暴露的清空操作
     */
    reset(params) {
      Object.keys(this.params).map(key => {
        // 可以指定不reset的列
        if (params && params.exclude) {
          if (params.exclude.includes(key)) return
        }
        this.params[key] = null
      })
    },
    /**
     * 对外暴露获取查询参数值
     */
    getParams() {
      return this.params
    },
    /**
     * 统一的change事件处理
     */
    handleFilter(filter, event) {
      /**
       * 抛出筛选事件
       * @param {string} key 对应属性的key
       * @param {*} event 控件抛出的数据
       * @param {Object} params 完整的filter数据
       */
      const { type } = filter
      let result = {
        filter,
        filters: this.filters,
        key: filter.prop,
        event,
        params: this.params
      }
      if (this.isButton(type)) {
        result = {
          ...result,
          key: filter.id
        }
      }
      if (this.isButtonGroup(filter)) {
        result = {
          ...result,
          key: event
        }
      }
      // this.$emit('filtered', key, event, this.params)
      // this.emitFiltered(result)
      this.filterDebounce(result)
    },
    emitFiltered(result) {
      this.$emit('filtered', result)
    },
    /**
     * 针对时间范围组件，进行额外的处理流程
     * @param {*} date
     * @param {*} startDate
     * @param {*} endDate
     */
    changeDate(filter, date) {
      const { prop } = filter
      this.params[prop] = date
      this.handleFilter(filter, date)
    },
    /**
     * 针对时间按钮范围组件，进行额外的处理流程
     * @param {*} date
     * @param {*} startDate
     * @param {*} endDate
     */
    changeDateButton(filter, date, index) {
      const { prop, valueFormat } = filter
      this.params[prop] = date && date.length > 2 ? date.slice(0, 2) : date
      this.handleFilter(filter, date)
      let name
      if (!date) {
        name = '选择时间'
      } else {
        name = `${formatDate(date[0], valueFormat || 'YYYY-MM-DD')} - ${formatDate(date[1], valueFormat || 'YYYY-MM-DD')}`
        // 这里只能手动比较并赋值了，因为element-plus里没有暴露以前的model数组后续参数了
        filter.pickerOptions.shortcuts.forEach(( shortcut ) => {
          const [start, end] = shortcut.value() 
          if(dayjs(date[0]).format('YYYY-MM-DD') == start && dayjs(date[1]).format('YYYY-MM-DD') == end) {
            name = shortcut.text
          }
        })
      }
      this.$refs[`datepickerButton-${index}`][0].setText(name)
    },
    /**
     * 判断是否是多个prop的情况
     */
    isMultiProps(type) {
      return ['daterange', 'monthrange', 'datetimerange'].includes(type)
    },
    /**
     * 是否使用时间控件
     */
    isDatePicker(type) {
      return ['year', 'month', 'date', 'dates', 'week', 'datetime', 'daterange', 'monthrange', 'datetimerange'].includes(type)
    },
    /**
     * 是否使用按钮控件
     * @param {string} type 类型
     */
    isButton(type) {
      return ['button', 'primary', 'success', 'info', 'warning', 'danger'].includes(type)
    },
    /**
     * 是否使用按钮组流程
     * @param {Object} filter 信息
     */
    isButtonGroup({ type, options }) {
      return this.isButton(type) && options && options.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  display: flow-root;
  position: relative;
  :deep(.el-form-item) {
    margin-right: 10px;
    vertical-align: top;
  }
  :deep(.el-form-item__label) {
    display: inline-block;
  }
  :deep(.el-form-item__content) {
    display: inline-block;
  }
  :deep(.el-input__icon) {
    height: 14px;
  }
  .complex {
    display: flex;
    flex-wrap: wrap;
  }
  .filter-field {
    margin-right: 10px;
    svg {
      height: 100%;
      margin-left: 5px;
    }
    .btn-icon {
      height: 1em;
    }
  }
  &-search {
    position: absolute;
    bottom: 2px;
    width: 100%;
    text-align:center;
    font-size: 12px;
    color: #409EFF;
    cursor:pointer;
    .line1 {
      position: absolute;
      width: calc(50% - 40px);
      top: 8px;
      border-top: 1px dotted #409eff;
    }
    .line2 {
      position: absolute;
      width: calc(50% - 40px);
      top: 8px;
      right: 0;
      border-top: 1px dotted #409eff;
    }
  }
}
</style>
