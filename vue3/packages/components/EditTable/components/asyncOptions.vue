<!--
 * @FileName: asyncOptions.vue
 * @Author: liufang
 * @Date: 2022-10-31 15:16:24
 * @Description: 动态options
-->
<template>
  <div>
    <el-option
      v-for="(option, idx) in options"
      :key="idx"
      :label="option.display||option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
  </div>
</template>

<script>
/**
   * 对象内容展示组件
   */
export default {
  name: 'DoAsyncOptions',
  props: {
    column: {
      type: Object,
      default: () => {}
    },
    scope: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      options: undefined
    }
  },
  created() {
    this.initOptions()
  },
  mounted() {
  },
  methods: {
    async initOptions() {
      if (typeof this.column.editStatus.options === 'function') {
        this.options = await this.column.editStatus.options({
          row: this.scope.row,
          index: this.scope.$index
        })
        return
      }
      this.options = this.column.editStatus.options
    },
    /**
     * 对外暴露，用来刷新option的列表
     * @public
     */
    async refresh() {
      await this.initOptions()
    }
  }
}
</script>
  <style lang="scss" scoped>

  </style>

