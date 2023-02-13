<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2023-01-09 09:29:15
 * @Description: 右键菜单
-->
<template>
  <transition name="contextmenu-submenu-fade">
    <div
      v-if="visible"
      ref="menu"
      :class="[CLASS_MENU, 'menu', customClass]"
      :style="cusStyle"
      @contextmenu="(e) => e.preventDefault()"
    >
      <div class="menu_body">
        <template v-for="(item, index) of items">
          <template v-if="!item.hidden">
            <div
              v-if="item.disabled"
              :key="index + '_disabled'"
              :class="[
                CLASS_MENU_ITEM, CLASS_MENU_ITEM_UNCLICKABLE,
                'menu_item', 'menu_item__disabled',
                item.divided ? 'menu_item__divided' : null
              ]"
            >
              <div
                v-if="hasIcon"
                class="menu_item_icon"
              >
                <i
                  v-if="item.icon"
                  :class="item.icon"
                />
              </div>
              <span class="menu_item_label">{{ item.label }}</span>
              <div class="menu_item_expand_icon" />
            </div>
            <div
              v-else-if="item.children"
              :key="index + '_children'"
              :class="[
                CLASS_MENU_ITEM, CLASS_MENU_ITEM_UNCLICKABLE,
                'menu_item', 'menu_item__available',
                activeSubmenu.index === index ? 'menu_item_expand' : null,
                item.divided ? 'menu_item__divided' : null
              ]"
              @mouseenter="($event) => enterItem($event, item, index)"
            >
              <div
                v-if="hasIcon"
                class="menu_item_icon"
              >
                <i
                  v-if="item.icon"
                  :class="item.icon"
                />
              </div>
              <span class="menu_item_label">{{ item.label }}</span>
              <div class="menu_item_expand_icon">▶</div>
            </div>
            <div
              v-else
              :key="index"
              :class="[
                CLASS_MENU_ITEM, CLASS_MENU_ITEM_CLICKABLE,
                'menu_item', 'menu_item__available',
                item.divided ? 'menu_item__divided' : null
              ]"
              @mouseenter="($event) => enterItem($event, item, index)"
              @click="itemClick(item)"
            >
              <div
                v-if="hasIcon"
                class="menu_item_icon"
              >
                <i
                  v-if="item.icon"
                  :class="item.icon"
                />
              </div>
              <span class="menu_item_label">{{ item.label }}</span>
              <div class="menu_item_expand_icon" />
            </div>
          </template>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import { createApp } from 'vue'
import {
  component,
  lastArray
} from '../../utils/contextmenu'

import {
  SUBMENU_X_OFFSET,
  SUBMENU_Y_OFFSET,
  SUBMENU_OPEN_TREND_LEFT,
  SUBMENU_OPEN_TREND_RIGHT,
  COMPONENT_NAME,
  CLASS_MENU,
  CLASS_MENU_ITEM,
  CLASS_MENU_ITEM_CLICKABLE,
  CLASS_MENU_ITEM_UNCLICKABLE
} from './constant'
export default {
  name: COMPONENT_NAME,
  props: ['position', 'outStyle', 'customClass', 'items', 'openTrend'],
  data() {
    return {
      CLASS_MENU,
      CLASS_MENU_ITEM,
      CLASS_MENU_ITEM_CLICKABLE,
      CLASS_MENU_ITEM_UNCLICKABLE,
      activeSubmenu: {
        index: null,
        instance: null
      },
      items: this.items || [],
      position: this.position || {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      style: this.outStyle || {
        left: 0,
        top: 0,
        zIndex: 2,
        minWidth: 150
      },
      customClass: this.customClass || null,
      visible: false,
      hasIcon: false,
      openTrend: this.openTrend || SUBMENU_OPEN_TREND_RIGHT
    }
  },
  computed: {
    cusStyle: function() {
      return `left: ${this.style.left}px;top: ${this.style.top}px;minWidth: ${this.style.minWidth}px, zIndex: ${this.style.zIndex}`
    }
  },
  mounted() {
    this.visible = true
    for (const item of this.items) {
      if (item.icon) {
        this.hasIcon = true
        break
      }
    }
    this.$nextTick(() => {
      const windowWidth = document.documentElement.clientWidth
      const windowHeight = document.documentElement.clientHeight
      const menu = this.$refs.menu
      const menuWidth = menu.offsetWidth
      const menuHeight = menu.offsetHeight;

      (this.openTrend === SUBMENU_OPEN_TREND_LEFT
        ? this.leftOpen
        : this.rightOpen)(windowWidth, windowHeight, menuWidth)

      this.style.top = this.position.y
      if (this.position.y + menuHeight > windowHeight) {
        if (this.position.height === 0) {
          this.style.top = this.position.y / windowHeight > 0.5 ? (this.position.y - menuHeight) : this.position.y
        } else {
          this.style.top = windowHeight - menuHeight
        }
      }
    })
  },
  methods: {
    leftOpen(windowWidth, windowHeight, menuWidth) {
      this.style.left = this.position.x - menuWidth
      this.openTrend = SUBMENU_OPEN_TREND_LEFT
      if (this.style.left < 0) {
        this.openTrend = SUBMENU_OPEN_TREND_RIGHT
        if (this.position.width === 0) {
          this.style.left = 0
        } else {
          this.style.left = this.position.x + this.position.width
        }
      }
    },
    rightOpen(windowWidth, windowHeight, menuWidth) {
      this.style.left = this.position.x + this.position.width
      this.openTrend = SUBMENU_OPEN_TREND_RIGHT
      if (this.style.left + menuWidth > windowWidth) {
        this.openTrend = SUBMENU_OPEN_TREND_LEFT
        if (this.position.width === 0) {
          this.style.left = windowWidth - menuWidth
        } else {
          this.style.left = this.position.x - menuWidth
        }
      }
    },
    enterItem(e, item, index) {
      if (!this.visible) {
        return
      }
      if (this.activeSubmenu.instance) {
        if (this.activeSubmenu.index === index) {
          return
        } else {
          this.activeSubmenu.instance.unmount()
          this.activeSubmenu.instance = null
          this.activeSubmenu.index = null
        }
      }
      if (!item.children) {
        return
      }
      const menuItemClientRect = e.target.getBoundingClientRect()
      this.activeSubmenu.index = index
      this.activeSubmenu.instance = createApp(component, {
        items: item.children,
        openTrend: this.openTrend,
        position: {
          x: menuItemClientRect.x + SUBMENU_X_OFFSET,
          y: menuItemClientRect.y + SUBMENU_Y_OFFSET,
          width: menuItemClientRect.width - 2 * SUBMENU_X_OFFSET,
          height: menuItemClientRect.height - 2 * SUBMENU_Y_OFFSET
        },
        outStyle: {
          left: 0,
          top: 0,
          zIndex: this.style.zIndex || 2,
          minWidth: typeof item.minWidth === 'number' ? item.minWidth : this.style.minWidth
        },
        customClass: typeof item.customClass === 'string'
          ? item.customClass
          : this.customClass
      })
      const dom = document.createElement('div')
      document.body.appendChild(dom)
      this.activeSubmenu.instance.mount(dom)
      lastArray.push(this.activeSubmenu.instance)
      // this.activeSubmenu.instance.items = item.children
      // this.activeSubmenu.instance.openTrend = this.openTrend
      // this.activeSubmenu.instance.position = {
      //   x: menuItemClientRect.x + SUBMENU_X_OFFSET,
      //   y: menuItemClientRect.y + SUBMENU_Y_OFFSET,
      //   width: menuItemClientRect.width - 2 * SUBMENU_X_OFFSET,
      //   height: menuItemClientRect.height - 2 * SUBMENU_Y_OFFSET
      // }
      // this.activeSubmenu.instance.style.minWidth =
      //   typeof item.minWidth === 'number' ? item.minWidth : this.style.minWidth
      // this.activeSubmenu.instance.style.zIndex = this.style.zIndex
      // this.activeSubmenu.instance.customClass =
      //   typeof item.customClass === 'string'
      //     ? item.customClass
      //     : this.customClass
      // this.activeSubmenu.instance.$mount()
      // document.body.appendChild(this.activeSubmenu.instance.$el)
    },
    itemClick(item) {
      if (!this.visible) {
        return
      }
      if (
        item &&
        !item.disabled &&
        !item.hidden &&
        typeof item.onClick === 'function'
      ) {
        return item.onClick()
      }
    },
    close() {
      this.visible = false
      if (this.activeSubmenu.instance) {
        this.activeSubmenu.instance.unmount()
      }
      // this.$nextTick(() => {
      //   this.$destroy()
      // })
    }
  }
}
</script>

<style scoped>
.menu {
  position: fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #fff;
  border-radius: 4px;
  padding: 8px 0;
}

.menu_body {
  display: block;
}

.menu_item {
  list-style: none;
  line-height: 32px;
  padding: 0 16px;
  margin: 0;
  font-size: 13px;
  outline: 0;
  display: flex;
  align-items: center;
  transition: 0.2s;
  border-bottom: 1px solid #00000000;
}

.menu_item__divided {
  border-bottom-color: #ebeef5;
}

.menu_item .menu_item_icon {
  margin-right: 8px;
  width: 13px;
}

.menu_item .menu_item_label {
  flex: 1;
}

.menu_item .menu_item_expand_icon {
  margin-left: 16px;
  font-size: 6px;
  width: 10px;
}

.menu_item__available {
  color: #606266;
  cursor: pointer;
}

.menu_item__available:hover {
  background: #ecf5ff;
  color: #409eff;
}

.menu_item__disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.menu_item_expand {
  background: #ecf5ff;
  color: #409eff;
}
</style>

<style>
.contextmenu-submenu-fade-enter-active,
.contextmenu-submenu-fade-leave-active {
  transition: opacity 0.1s;
}

.contextmenu-submenu-fade-enter,
.contextmenu-submenu-fade-leave-to {
  opacity: 0;
}
</style>

