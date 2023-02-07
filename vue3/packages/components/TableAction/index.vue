<!--
 * @Descripttion: 修改支持二级选择
 * @version:
 * @Author: huzhifu
 * @Date: 2020-09-04 11:28:14
 * @LastEditors: huzhifu
 * @LastEditTime: 2022-01-18 11:32:27
-->
<template>
  <el-dropdown :show-timeout="50" class="table-action" trigger="click" :hide-on-click="clickHide" size="medium"
    @click.native="stopProp">
    <span class="el-dropdown-link table-cell-icon">
      <do-icon :icon-class="icon" />
    </span>
    <template v-if="showDropDown" #dropdown>
      <el-dropdown-menu>
        <template v-for="(action, index) in actions.filter((item) => !item.hidden)" v-permission>
          <el-dropdown-item v-if="!action.children" :key="index" :divided="index > 0 && action.divided"
            :data-permission="action.permission" :data-projectid="action.projectId" :disabled="action.disabled"
            @click.native="handleCommand(action.id)">
            <!-- 兼容提示框explain -->
            <template v-if="action.explain">
              <el-tooltip class="item" effect="light" placement="left" :content="action.explain">
                <span>
                  <do-icon :icon-class="action.icon" />
                  {{ action.name }}
                </span>
              </el-tooltip>
            </template>
            <template v-else>
              <do-icon :icon-class="action.icon" />
              {{ action.name }}
            </template>
          </el-dropdown-item>
          <!-- 带子菜单的模式 -->
          <el-dropdown-item v-else :key="`${index}`" :divided="index > 0 && action.divided"
            :data-permission="action.permission" :data-projectid="action.projectId" :disabled="action.disabled">
            <el-dropdown placement="right-start" class="personalization" trigger="hover">
              <span class="el-dropdown-link personalization">
                <do-icon :icon-class="action.icon" />
                {{ action.name }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <div v-for="(child, index) in action.children.filter(
                    (item) => !item.hidden
                  )" v-permission
                  :key="index"
                  >
                    <el-dropdown-item :data-permission="child.permission" :divided="index > 0 && child.divided"
                      :data-projectid="child.projectId" :disabled="child.disabled"
                      @click.native="handleCommand(child.id)">
                      <do-icon :icon-class="child.icon" />
                      {{ child.name }}
                    </el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
/**
 * 表格菜单
 * action.id：菜单id，在当前菜单中必须唯一，action handler 通过id确认点击的是那个菜单按钮
 * action.name：菜单显示名称
 * action.icon：菜单显示图标SVG
 * action.projectId: 项目ID，和permission配合使用
 * action.permission：菜单按钮权限，没有权限是不显示
 * action.hidden：菜单是否隐藏
 * action.disabled：菜单是否禁用
 *
 * row：当前行数据
 */
import { envcolStatus as envStatus } from "./src/config";
import doIcon from "../Icon";
/**
 * 表格菜单组件
 */
export default {
  name: "DoTableAction",
  components: { doIcon },
  props: {
    /** 操作列表
     *
     *  <code>id</code> 在当前菜单中必须唯一，action handler 通过id确认点击的是那个菜单按钮
     *  <br>
     *  <code>icon</code> 菜单显示名称
     *  <br>
     *  <code>projectId</code> 项目ID，和permission配合使用
     *  <br>
     *  <code>permission</code> 菜单按钮权限，没有权限是不显示
     *  <br>
     *  <code>divided</code> 分隔线
     *  <br>
     *  <code>hidden</code> 菜单是否隐藏
     *  <br>
     *  <code>disabled</code> 菜单不可点击
     */
    actions: {
      type: Array,
      required: true,
    },
    /**
     * 每一行的数据，用来点击后回调使用
     */
    row: {
      type: Object,
      required: true,
    },
    /**
     * 状态枚举，用来做一些逻辑判断
     */
    status: {
      type: Number,
      default: 0,
    },
    /**
     * 弃用
     */
    dropdownDisable: {
      type: Boolean,
      default() {
        return false;
      },
    },
    /**
     * 是否在点击菜单项后隐藏菜单
     */
    clickHide: {
      type: Boolean,
      default() {
        return true;
      },
    },
    /**
     * 按钮图标
     */
    icon: {
      type: String,
      default: "caidans",
    },
    /**
     * 索引
     */
    index: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      // 0 未注册 1 已注册2 未知3 上线4 离线5 无服务6 已释放
      envStatus: envStatus,
      showDropDown: true, // 判断是否显示下拉
    };
  },
  watch: {
    actions: {
      handler(newV, oldV) {
        let num = 0;
        newV.forEach((item) => {
          if (item.hidden) {
            num += 1;
          }
        });
        if (num === newV.length) {
          this.showDropDown = false;
        } else {
          this.showDropDown = true;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() { },
  methods: {
    buildCommand(id) {
      const command = {
        key: id,
        row: this.row,
        index: this.index,
      };
      return command;
    },
    handleCommand(id) {
      const action = this.buildCommand(id);
      /**
       * 点击子菜单
       */
      this.$emit("action", action);
    },
    stopProp(e) {
      e.stopPropagation();
    },
  },
};
</script>
<style>

</style>
<style lang="scss" scoped>
.table-action {
  .el-dropdown-link {
    font-size: 22px;
    cursor: pointer;
  }
}

.menu-btn {
  cursor: pointer;
  width: 22px !important;
  height: 22px !important;
}

.menu-btn:hover {
  color: rgb(58, 142, 230);
}

.common-scale:hover {
  transform: scale(1.1, 1.1);
}

.el-dropdown-link {
  display: inline-block;
  width: 100%;
}

.personalization {
  width: 100%;
}
</style>
