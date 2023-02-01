<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-08-02 15:16:24
 * @Description: 动画组件（基于lottie）
-->
<template>
  <div
    ref="lavContainer"
    class="do-animate"
    :style="style"
  />
</template>

<script>
import lottie from 'lottie-web'
/**
 * 动画组件
 *
 * 基于lottie来完成动画
 *
 * 使用说明参考：http://airbnb.io/lottie/#/web?id=usage
 *
 */
export default {
  name: 'DoAnimate',
  props: {
    /**
     * 透传给lottie的参数
     * 参考：http://airbnb.io/lottie/#/web?id=other-loading-options
     */
    options: {
      type: Object,
      default: () => {}
    },
    /**
     * 动画区域高度
     */
    height: {
      type: Number,
      default: 0
    },
    /**
     * 动画区域宽度
     */
    width: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      style: {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '100%',
        overflow: 'hidden',
        margin: '0 auto'
      }
    }
  },

  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.lavContainer,
      renderer: 'canvas',
      ...this.options
    })
    /**
     * 动画初始化完成，可以拿到动画对象进行api调用
     */
    this.$emit('animCreated', this.anim)
  }
}
</script>
