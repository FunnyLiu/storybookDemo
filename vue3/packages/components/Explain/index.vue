 <!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-08-08 15:16:24
 * @Description: 描述组件，用于详细解释某个难以理解的字段或场景
-->
<template>
  <span
    class="do-explain"
  >
    <el-tooltip
      class="item"
      effect="light"
      placement="top"
      :popper-class="popperClass"
    >
      <template #content>
        <div :style="tooltipStyle">{{ explain }}</div>
      </template>
      <em
        :style="innerStyle"
      >
        <icon icon-class="question" />
      </em>
    </el-tooltip>
  </span>
</template>

<script>
import Icon from '../Icon'
/**
 * 描述组件
 *
 * 用于详细解释某个难以理解的字段或场景
 *
 */
export default {
  name: 'DoExplain',
  components: {
    Icon
  },
  props: {
    /**
     * 动画区域高度
     */
    explain: {
      type: String,
      default: '这里是描述文案'
    },
    /**
     * 	为 Tooltip 的 popper 添加类名,可以Tooltip文字的样式
     */
    popperClass: {
      type: String,
      default: undefined
    },
    /**
     * 大小，设置图标大小，比如30px或者2rem等
     */
    size: {
      type: String,
      default: 'inherit'
    },
    /**
     * 颜色，设置图标颜色
     */
    color: {
      type: String,
      default: 'inherit'
    },
    /**
     * tooltip的最大宽度
     */
    maxWidth: {
      type: String,
      default: 'inherit'
    },
    /**
     * 灵活的设置样式
     */
    customStyle: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    innerStyle() {
      return {
        fontSize: this.size,
        color: this.color,
        ...this.customStyle
      }
    },
    tooltipStyle() {
      return {
        maxWidth: this.maxWidth
      }
    }
  },
  mounted() {}
}
</script>
