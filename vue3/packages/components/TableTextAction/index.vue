<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-07-29 10:49:24
 * @LastEditors: liufang
 * @Date: 2022-07-029 10:49:24
 * @Description: 表格文字操作组件
-->
<template>
  <div class="do-table-text-action">
    <el-link
      v-for="action in actions"
      :key="action.id"
      v-permission
      :data-permission="action.permission"
      :type="action.type"
      :disabled="action.disabled"
      :underline="action.underline"
      :icon="action.icon ? formatIconName(action.icon) : undefined"
      @click.native="handleCommand(action)"
    >{{ action.name }}</el-link>
  </div>
</template>

<script>
/**
 * 表格文字菜单
 */
export default {
  name: 'DoTableTextAction',
  props: {
    /** 操作列表
     *
     *  <code>id</code> 在当前菜单中必须唯一，action handler 通过id确认点击的是那个菜单按钮
     *  <br>
     *  <code>name</code> 菜单名称
     *  <br>
     *  <code>underline</code> 下划线
     *  <br>
     *  <code>type</code> 类型
     *  <br>
     *  <code>icon</code> 图标类名
     *  <br>
     *  <code>disabled</code> 菜单不可点击
     */
    actions: {
      type: Array,
      required: true
    },
    /**
     * 每一行的数据，用来点击后回调使用
     */
    row: {
      type: Object,
      required: true
    },
    /**
     * 每一行的索引，用来点击后回调使用
     */
    index: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {}
  },
  watch: {},
  mounted() {},
  methods: {
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
    buildCommand(act) {
      const command = {
        key: act.id,
        row: this.row,
        index: this.index
      }
      return command
    },
    handleCommand(act) {
      if (act.disabled) return
      const action = this.buildCommand(act)
      /**
       * 点击子菜单
       *
       * @event action
       * @property {object} action - 参数
       * @property {string} action.id - 动作的id
       */
      this.$emit('action', action)
    }
  }
}
</script>
<style>
</style>
<style lang="scss" scoped>
.do-table-text-action {
  .el-link {
    margin-right: 10px;
  }
}
</style>
