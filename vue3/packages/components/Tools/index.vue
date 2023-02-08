<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-09-29 14:12:47
 * @Description: 工具栏
-->
<template>
  <div class="do-list-view-tools">
    <!-- 选择列展示 -->
    <el-popover
      v-if="showableColumns.length > 0"
      placement="bottom"
      trigger="click"
    >
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <el-checkbox-group
        v-model="checkedShowableColumns"
        size="small"
        class="do-list-view-tools-checkgroup"
        @change="handleCheckedShowableColumnsChange"
      >
        <el-checkbox
          v-for="column in showableColumns"
          :key="column.prop"
          :label="column.label"
        >{{ column.label }}</el-checkbox>
      </el-checkbox-group>
      <!-- 该版本element里逻辑写死了，如果换成新api，取不到dom，故而暂时不改 -->
      <template #reference>
        <em
          class="setting"
        >
          <icon icon-class="setting" />
        </em>
      </template>
    </el-popover>
  </div>
</template>

<script>
import Icon from '../Icon'
export default {
  name: 'ToolsCom',
  components: {
    Icon
  },
  props: {
    /**
     * 缓存用的key，每个创建传单独的
     */
    cacheKey: {
      type: String,
      default: 'listview'
    },
    /**
     * 表格列
     */
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      checkedShowableColumns: []
    }
  },
  computed: {
    /**
     * 可以用来切换是否展示的列是哪些
     */
    showableColumns() {
      return this.columns.filter((column) => {
        return column.showable && column.showable()
      })
    }
  },
  created() {
    this.initShowColumns()
  },
  mounted() {},
  methods: {
    handleCheckedShowableColumnsChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.showableColumns.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.showableColumns.length
      this.emitShowColumns()
    },
    handleCheckAllChange(val) {
      if (val) {
        this.checkedShowableColumns = this.showableColumns.map((column) => {
          return column.label
        })
      } else {
        this.checkedShowableColumns = []
      }
      this.isIndeterminate = false
      this.emitShowColumns()
    },
    initShowColumns() {
      let columnsInCache
      // listview设置了cacheKey，才会启用缓存功能
      if (this.cacheKey) {
        // 如果发现表格的列有任何更新（顺序变化或增减列），清除缓存
        if (localStorage.getItem(`listview_${this.cacheKey}_columns`) !== JSON.stringify(this.columns.map(item => item.prop))) {
          localStorage.removeItem(`listview_${this.cacheKey}_checkedShowableColumns`)
          localStorage.removeItem(`listview_${this.cacheKey}_columns`)
        }
        columnsInCache = JSON.parse(
          localStorage.getItem(`listview_${this.cacheKey}_checkedShowableColumns`)
        )
      }
      // 如果从缓存中取到了值，则将选中的设置为缓存中的值
      if (columnsInCache) {
        this.checkedShowableColumns = columnsInCache
        this.emitShowColumns()
        return
      }
      this.checkedShowableColumns = this.showableColumns.map((column) => {
        return column.label
      })
    },
    emitShowColumns() {
      const newColumns = []
      this.columns.forEach((column) => {
        // 针对可以筛选可见的，进行判断
        if (column.showable && column.showable()) {
          this.checkedShowableColumns.forEach((showableColumn) => {
            if (column.label === showableColumn) {
              newColumns.push(column)
            }
          })
        } else {
          // 不可筛选的，原样返回
          newColumns.push(column)
        }
      })
      if (this.cacheKey) {
        localStorage.setItem(
          `listview_${this.cacheKey}_checkedShowableColumns`,
          JSON.stringify(this.checkedShowableColumns)
        )
        localStorage.setItem(
          `listview_${this.cacheKey}_columns`,
          JSON.stringify(this.columns.map(item => item.prop))
        )
      }
      this.$emit('getNewColumns', newColumns)
    }
  }
}
</script>

<style lang="scss" scoped>
.do-list-view-tools {
  cursor: pointer;
  &-checkgroup {
    ::v-deep {
      .el-checkbox {
        display: block;
      }
    }
  }
  .setting {
    font-size: 20px;
  }
}
</style>

