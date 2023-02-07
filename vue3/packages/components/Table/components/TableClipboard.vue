<!--
 * @FileName:
 * @Author: fujintao
 * @Date: 2022-06-02 09:51:00
 * @LastEditors: fujintao
 * @LastEditTime: 2022-06-02 09:51:00
 * @Descripttion:
-->
<template>
  <div class="copy-show-container">
    <div
      class="copy-show-text"
      v-html="showText"
    />
    <div
      :id="id"
      class="copy-hidden-btn"
      :data-clipboard-text="copyText"
      @click="copy"
    >
      <em>
        <icon icon-class="document-copy" />
      </em>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import Icon from '../../Icon'
export default {
  components: {
    Icon
  },
  props: {
    copyId: {
      // 复制数据的独有id
      type: String,
      required: true,
      default() {
        return ''
      }
    },
    showText: {
      // 显示的数据
      type: String,
      required: false,
      default() {
        return ''
      }
    },
    copyText: {
      // 复制的数据
      type: String,
      required: false,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      tagInputVisible: false,
      tagInputKey: '',
      tagInputValue: ''
    }
  },
  computed: {
    id: {
      get() {
        return 'a' + this.trimSpecial(this.copyId)
      },
      set() {}
    }
  },
  methods: {
    copy(id) {
      const clipboard = new Clipboard(`#${this.id}`)
      clipboard.on('success', (e) => {
        this.$message.success('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        this.$message.error('复制失败')
        clipboard.destroy()
      })
    },
    trimSpecial(string) {
      // 替换字符串中的所有特殊字符（包含空格）
      if (string != '') {
        const pattern =
          /[`~!@#$^\-&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g
        string = string.replace(pattern, '')
      }
      return string
    }
  }
}
</script>

<style lang="scss" scoped>
// 表格中 template的赋值文字的容器
.copy-show-container {
  display: flex;
  width: 100%;
  float: left;
  .copy-show-text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
    white-space: nowrap;
  }
  .copy-hidden-btn {
    display: none;
    cursor: pointer;
    float: left;
    margin-left: 5px;
  }
}
.copy-show-container:hover > .copy-hidden-btn {
  display: block;
}
.copy-show-container:hover > .copy-show-text {
  width: auto;
  // width: calc(100% - 25px);
  max-width: 100%;
}
</style>
