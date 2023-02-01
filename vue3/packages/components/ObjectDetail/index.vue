<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-10-28 15:16:24
 * @Description: 对象内容展示组件
-->
<template>
  <div class="do-object-detail">
    <el-table
      :data="list"
      fit
      stripe
    >
      <el-table-column
        prop="key"
        label="键"
      />
      <el-table-column
        prop="value"
        label="值"
      />
    </el-table>
    <div
      v-for="complex in complexList"
      :key="complex.key"
    >
      <div class="do-object-detail-complex-title">{{ complex.key }}</div>
      <el-table
        :data="complex.value"
        fit
        stripe
      >
        <el-table-column
          v-for="column in complex.value"
          :key="column.key"
          prop="value"
          align="center"
          :label="column.key"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
/**
 * 对象内容展示组件
 */
export default {
  name: 'DoObjectDetail',
  props: {
    /**
     * 展示的列表
     */
    list: {
      type: Array,
      default: () => []
    },
    /**
     * 复杂数据结构
     */
    complexList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'background-color:#FAFAFA;'
    }
  }
}
</script>
<style lang="scss" scoped>
.do-object-detail {
    &-complex {
        &-title {
            margin: 10px 0;
        }
    }
    :deep(.el-table thead tr th) {
       background-color:#FAFAFA;
    }
}
</style>

