<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-12-02 15:16:24
 * @Description: 空态组件
-->
<template>
  <div class="do-empty">
    <div :class="['do-empty-img', typeClass]" />
    <div class="do-empty-text">{{ text }}</div>
  </div>
</template>
<script>
/**
 * 空态组件
 */
export default {
  name: 'DoEmpty',
  props: {
    type: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: '暂无数据'
    }
  },
  computed: {
    typeClass() {
      return `do-empty-img-${this.type}`
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/index.scss";

.do-empty {
  width: 100%;
  height: 100%;
  @include center();
  flex-flow: column;
  &-img {
    width: 214px;
    height: 151px;
    background-size: 100% 100%;
    &-0 {
      background-image: url('./assets/kongshuju.png')
    }
    &-1 {
      background-image: url('./assets/shaoshuju.png')
    }
    &-2 {
      background-image: url('./assets/exception-pwd.png')
    }
    &-3 {
      background-image: url('./assets/exception-key.png')
    }
    &-4 {
      background-image: url('./assets/404.png')
    }
  }
  &-text {
    font-size: $medium;
    color: #999;
    @include txtCenter(50px);
  }
}
</style>
