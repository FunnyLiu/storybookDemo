<template>
  <div
    class="do-fix-buttons"
    :style="[
      {
        right: styleRight,
        bottom: styleBottom,
        opacity: styleOpacity,
      },
    ]"
    @mouseleave="isMouseOnArea = false"
  >
    <div class="do-fix-buttons-list">
      <div
        v-for="(action, index) in actions"
        :key="action.id"
      >
        <div
          size="small"
          :class="[
            isMouseOnArea
              ? `animated pulse animate-delay-${actions.length - index}`
              : 'animated pulseHidden',
          ]"
          @click="(event) => handleCommand(action)"
        >
          <div
            v-if="action.icon"
            class="icon do-fix-buttons-button small"
          >
            <div
              v-if="action.name"
              class="icon-name"
            >
              <el-tag>{{ action.name }}</el-tag>
            </div>
            <icon :icon-class="action.icon" />
          </div>
          <span
            v-else
            class="do-fix-buttons-button small"
            :style="action.style || ''"
          >{{ action.name }}</span>
        </div>
      </div>
    </div>
    <div
      :class="[shouldButtonsShow ? 'animated pulse' : 'animated pulseHidden']"
      class="do-fix-buttons-button"
      @click.stop="handleClick"
      @mouseenter="isMouseOnArea = true"
    >
      <slot>
        <el-icon><CaretTop /></el-icon>
      </slot>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { throttle } from '../../utils/func'

const cubic = (value) => Math.pow(value, 3)
const easeInOutCubic = (value) =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export default {
  name: 'DoFixButtons',
  components: {
    Icon
  },
  props: {
    /**
     * 操作按钮列表
     */
    actions: {
      type: Array,
      default: () => []
    },
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: {
      type: String,
      default: ''
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },

  data() {
    return {
      el: null,
      styleOpacity: 0,
      container: null,
      visible: false, // 滑动是否超过第一屏，超过了就为true，暂时不用
      isMouseMoving: false, // 鼠标是否在屏幕上移动
      mouseMovintTimer: null,
      isMouseOnArea: false // 鼠标是否在按钮区域，是否应该展示上面的按钮列表
    }
  },

  computed: {
    styleBottom() {
      return `${this.bottom}px`
    },
    styleRight() {
      return `${this.right}px`
    },
    // 是否应该展示回到顶部的按钮
    shouldButtonsShow() {
      return this.isMouseOnArea || this.isMouseMoving
    }
  },
  mounted() {
    this.init()
    this.throttledScrollHandler = throttle(this.onScroll, 300)
    this.throttledMouseMoveHander = throttle(this.onMouseMove, 300)
    this.container.addEventListener('scroll', this.throttledScrollHandler)
    this.container.addEventListener('mousemove', this.throttledMouseMoveHander)
  },

  beforeDestroy() {
    this.container.removeEventListener('scroll', this.throttledScrollHandler)
    this.container.removeEventListener(
      'mousemove',
      this.throttledMouseMoveHander
    )
  },

  methods: {
    init() {
      setTimeout(() => {
        this.styleOpacity = 1
      }, 1000)
      this.container = document
      this.el = document.documentElement
      if (this.target) {
        this.el = document.querySelector(this.target)
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`)
        }
        this.container = this.el
      }
    },
    onScroll() {
      const scrollTop = this.el.scrollTop
      this.visible = scrollTop >= this.visibilityHeight
    },
    onMouseMove(e) {
      this.isMouseMoving = true
      clearTimeout(this.mouseMovintTimer)
      this.mouseMovintTimer = setTimeout(() => {
        this.isMouseMoving = false
      }, 1000)
    },
    handleClick(e) {
      this.scrollToTop()
      this.$emit('click', e)
    },
    scrollToTop() {
      const el = this.el
      const beginTime = Date.now()
      const beginValue = el.scrollTop
      const rAF =
        window.requestAnimationFrame || ((func) => setTimeout(func, 16))
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress))
          rAF(frameFunc)
        } else {
          el.scrollTop = 0
        }
      }
      rAF(frameFunc)
    },
    handleCommand(act) {
      if (act.disabled) return
      const action = act
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
<style lang="scss" scoped>
.do-fix-buttons {
  position: fixed;
  z-index: 5;
  &-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-button {
    margin-bottom: 10px;
    background-color: #409eff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 6px rgb(0 0 0 / 12%);
    cursor: pointer;
  }
  .small {
    width: 32px;
    height: 32px;
  }
  .icon {
    display: flex;
    position: relative;
  }
  .icon-name {
    position: absolute;
    right: 40px;
  }

  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }
  .animate-delay-1 {
    animation-delay: 100ms;
  }
  .animate-delay-2 {
    animation-delay: 200ms;
  }
  .animate-delay-3 {
    animation-delay: 300ms;
  }
  .animate-delay-4 {
    animation-delay: 400ms;
  }
  .animate-delay-5 {
    animation-delay: 500ms;
  }
  .animate-delay-6 {
    animation-delay: 600ms;
  }
  .animate-delay-7 {
    animation-delay: 700ms;
  }
  .animate-delay-8 {
    animation-delay: 800ms;
  }

  @keyframes pulse {
    0% {
      transform: scale3d(0.2, 0.2, 0.2);
      opacity: 0;
    }

    50% {
      transform: scale3d(1.2, 1.2, 1.2);
      opacity: 1;
    }

    100% {
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes pulseHidden {
    0% {
      transform: scale3d(1, 1, 1);
      opacity: 1;
    }
    100% {
      transform: scale3d(0, 0, 0);
      opacity: 0;
    }
  }

  .pulse {
    animation-name: pulse;
  }
  .pulseHidden {
    animation-name: pulseHidden;
  }
}
</style>
