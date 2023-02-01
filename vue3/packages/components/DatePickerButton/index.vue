<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-08-09 15:16:24
 * @Description: 时间段按钮组件，用来简化时间段的设置
-->
<template>
  <div
    class="do-date-picker-button"
    @mousemove="mousemove"
    @mouseleave="mouseleave"
  >
    <el-date-picker
      ref="picker"
      v-model="model"
      v-bind="$attrs"
    />
    <el-button
      size="small"
      class="do-date-picker-button-btn"
      @click="showPicker"
    >{{
      realText || text
    }}</el-button>
    <!-- vue3下.native需要额外兼容，注意 -->
    <icon
      v-if="shouldClearShow"
      class="circle-close"
      icon-class="close-circle"
      @click.native="clear"
    />
  </div>
</template>

<script>
import Icon from '../Icon'
/**
 * 时间段按钮组件
 *
 * 用来简化时间段的设置，但是这种方式比较繁琐
 */
export default {
  name: 'DoDatePickerButton',
  components: {
    Icon
  },
  props: {
    /**
     * 绑定的数据，用来和外部联动
     */
    value: {
      type: [String, Array],
      default: undefined
    },
    /**
     * 按钮文案，交给外部来操控，主要和pickerOptions中的text遥相呼应
     */
    text: {
      type: String,
      default: '选择时间'
    }
  },
  data() {
    return {
      realText: '',
      shouldClearShow: false
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('change', newVal)
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        if (!val) {
          this.realText = '选择时间'
        }
      }
    }
  },
  methods: {
    mousemove() {
      if (!this.value) {
        return
      }
      this.shouldClearShow = true
    },
    mouseleave() {
      this.shouldClearShow = false
    },
    showPicker() {
      this.$refs.picker.focus()
    },
    setText(txt) {
      this.realText = txt
    },
    clear() {
      this.model = undefined
      this.shouldClearShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.do-date-picker-button {
  &-btn {
    padding-right: 25px;
  }
  :deep(.circle-close) {
    position: absolute;
    right: 5px;
    top: 14px;
    color: #c0c4cc;
    cursor: pointer;
  }
  :deep(.el-date-editor) {
    width: 0;
    padding: 0;
    border: 0;
  }
  :deep(.el-icon) {
      display: none;
  }
  :deep(.el-range-separator) {
    display: none;
  }
}
</style>
