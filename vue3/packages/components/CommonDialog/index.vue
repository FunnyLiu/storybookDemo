<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-07-30 15:16:24
 * @Description: 通用弹框组件
-->
<template>
  <el-dialog
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    class="do-common-dialog"
    v-bind="$attrs"
    :fullscreen="false"
    visible
    top="0"
    :draggable="true"
    align-center
    v-on="$listeners"
    @open="onOpen"
    @close="onClose"
  >
    <slot />
    <template #footer>
      <el-button
        v-for="action in actions"
        :key="action.id"
        v-permission
        :data-permission="action.permission"
        :type="action.type === 'button' ? '' : action.type"
        :plain="action.plain"
        :round="action.round"
        :circle="action.circle"
        :style="action.style"
        :icon="action.icon"
        :disabled="action.disabled"
        :loading="action.loading"
        class="filter-field"
        @click="(event) => handleClick(action, event)"
      >
        {{ action.name }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
/**
 * 通用弹框组件
 */
export default {
  name: "DoCommonDialog",
  inheritAttrs: false,
  props: {
    /**
     * 操作列表
     */
    actions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // draggable:true
    };
  },
  methods: {
    onOpen() {
      this.$emit("action", {
        key: "open",
      });
    },
    onClose() {
      this.$emit("action", {
        key: "close",
      });
    },
    handleClick(action, event) {
      const result = {
        action,
        key: action.id,
        event,
      };
      this.$emit("action", result);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.el-dialog.do-common-dialog) {
  max-height: 100vh;
    overflow: auto;
    margin: 0 auto;
}
</style>
