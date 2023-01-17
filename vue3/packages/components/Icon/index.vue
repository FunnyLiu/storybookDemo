<!--
 * @FileName:
 * @Author: fujintao
 * @Date: 2020-09-29 19:16:24
 * @LastEditors: huzhifu
 * @LastEditTime: 2021-07-22 15:24:57
 * @Description:
-->
<template>
  <svg
    class="do-icon"
    aria-hidden="true"
    :style="innerStyle"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
/**
 * svg图标组件，依赖阿里巴巴的iconfont来管理图片
 *
 * 普通图标库：https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3398388&keyword=&project_type=&page=
 *
 * 需要保证新上传的图标，在系统上去色，这次才能保证color属性可用
 *
 * 彩色图标库：https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3413631&keyword=&project_type=&page=
 *
 * 这里只存放彩色的svg
 *
 * 使用该组件前，将对应图标库里的javascript，以Symbol的内联的方式引入到工程中即可
 *
 * <img src="https://raw.githubusercontent.com/brizer/graph-bed/master/img/20220527103406.png"/>
 *
 * 从理论上来说，该组件和图标库是完全解耦的，搭配不同的图标库，都可以使用该组件，只需要满足图标前缀do-icon-即可
 */
export default {
  name: 'DoIcon',
  props: {
    /**
     * 图标class，在All里面寻找是否存在，没有的话就新增图片
     */
    iconClass: {
      type: String,
      required: true
    },
    /**
     * 颜色，如果不生效，则去iconfont平台进行去色操作，再更新install.js，即可成功
     */
    color: {
      type: String,
      default: 'currentColor'
    },
    /**
     * 大小，设置图标大小，比如30px或者2rem等
     */
    size: {
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
    iconName() {
      return `#do-icon-${this.iconClass}`
    },
    innerStyle() {
      return {
        fill: this.color,
        fontSize: this.size,
        ...this.customStyle
      }
    }
  }
}
</script>

<style scoped>
   .do-icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       overflow: hidden;
    }
</style>
