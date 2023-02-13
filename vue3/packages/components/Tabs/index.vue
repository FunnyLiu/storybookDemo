<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-08-11 15:16:24
 * @Description: Tab切换组件，通过配置生成
-->
<template>
  <div class="do-tabs">
    <el-tabs
      :model-value="activeTab"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :disabled="tab.disabled"
        :name="tab.name"
        :closable="tab.closable"
        :lazy="tab.lazy"
      >
        <div v-if="tab.content">
          {{ tab.content }}
        </div>
        <!-- 可以通过render函数自定义复杂内容 -->
        <do-render v-if="tab.render" :render="tab.render" :params="tab" />
        <!-- 可以通过slot自定义复杂内容 -->
        <slot v-if="tab.slot" :name="tab.slot" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DoRender from "../Render";

/**
 * Tab切换组件
 *
 * 通过配置生成
 *
 */
export default {
  name: "DoTabs",
  components: {
    DoRender,
  },
  props: {
    /**
     * 外部配置的tab
     */
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeTab: "",
    };
  },
  computed: {},
  methods: {
    /**
     * 获取当前激活的tab的name
     * @public
     */
    getActiveTabName() {
      console.log("1111", this.activeTab);
      return this.activeTab;
    },
  },
};
</script>
