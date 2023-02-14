<!--
 * @FileName: index.vue
 * @Author: fujintao
 * @Date: 2022-06-29 10:30:24
 * @LastEditors: fujintao
 * @LastEditTime: 2022-06-29 10:30:24
 * @Description: json差异对比组件
-->
<template>
  <div id="diff-app">
    <div
      v-highlight
      class="diff-code-container"
      :class="{ 'no-file-name-header': hideFileNameHeader }"
      v-html="html"
    />
  </div>
</template>

<script>

import { createPatch } from '../../utils/diff.js'
import { Diff2Html } from '../../utils/diff2html.js'
import { hljs } from '../../utils/highlight.js'
import 'highlight.js/styles/googlecode.css'
import 'diff2html/bundles/css/diff2html.min.css'

/**
 * 差异对比json、字符串
 *
 * 可上下或者左右显示的组件
 *
 * 结合highlight.js进行代码对比添加或删除的高亮提示
 *
 * 组件内已引入 'highlight.js/styles/googlecode.css' 和 'diff2html/bundles/css/diff2html.min.css'
 *
 * 无需重复引入
 */
export default {
  name: 'CodeDiff',
  directives: {
    /**
     * 把相应的code高亮显示
     */
    highlight: function(el) {
      const blocks = el.querySelectorAll('code')
      blocks.forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  },
  props: {
    /**
     * 对比的旧的字符串
     */
    oldString: {
      type: String,
      default: ''
    },
    /**
     * 对比的新的字符串
     */
    newString: {
      type: String,
      default: ''
    },
    /**
     * 不同地方上下间隔多少行不隐藏
     * 默认为5行，类型传Number
     */
    context: {
      type: Number,
      default: 5
    },
    /**
     * 展示的方式
     * line-by-line（默认），side-by-side
     */
    outputFormat: {
      type: String,
      default: 'line-by-line'
    },
    /**
     * 展示对比文件列表
     * 默认为false
     */
    drawFileList: {
      type: Boolean,
      defalut: false
    },
    /**
     * 当无对比时不渲染
     * 默认为false
     */
    renderNothingWhenEmpty: {
      type: Boolean,
      default: false
    },
    /**
     * 每行中对比差异级别
     * word（默认）, char
     */
    diffStyle: {
      type: String,
      default: 'word'
    },
    /**
     * 文件名
     */
    fileName: {
      type: String,
      default: ''
    },
    /**
     * 当无对比时展示源代码
     * 默认false
     */
    isShowNoChange: {
      type: Boolean,
      default: false
    },

    /**
     * 当无对比时展示源代码
     * 默认false
     */
    hideFileNameHeader: {
      type: Boolean,
      default: false
    },

    /**
     * 当无对比时展示源代码的顶部文字
     * 默认为空
     */
    noChangeOldText: {
      type: String,
      default: ''
    },
    noChangeNewText: {
      type: String,
      default: ''
    }
  },
  computed: {
    html() {
      return this.createdHtml(this.oldString, this.newString, this.context, this.outputFormat, this.drawFileList, this.renderNothingWhenEmpty, this.fileName, this.isShowNoChange, this.noChangeOldText, this.noChangeNewText)
    }
  },
  methods: {
    createdHtml(oldString, newString, context, outputFormat, drawFileList, renderNothingWhenEmpty, fileName, isShowNoChange, noChangeOldText, noChangeNewText) {
      function hljs(html) {
        return html.replace(/<span class="d2h-code-line-ctn">(.+?)<\/span>/g, '<span class="d2h-code-line-ctn"><code>$1</code></span>')
      }
      if (isShowNoChange) {
        oldString = noChangeOldText ? noChangeOldText + '\n' + oldString : oldString
        newString = noChangeNewText ? noChangeNewText + '\n' + newString : newString + '\n'
      }
      const args = [fileName, oldString, newString, '', '', { context: context }]
      const dd = createPatch(...args)
      const outStr = Diff2Html.parse(dd, {
        inputFormat: 'diff',
        outputFormat: outputFormat,
        drawFileList: drawFileList,
        matching: 'lines',
        renderNothingWhenEmpty: renderNothingWhenEmpty
      })
      const html = Diff2Html.html(outStr, {
        inputFormat: 'json',
        outputFormat: outputFormat,
        drawFileList: drawFileList,
        matching: 'lines',
        renderNothingWhenEmpty: renderNothingWhenEmpty
      })
      return hljs(html)
    }
  }
}
</script>

<style lang="scss">
.diff-code-container{
  .hljs{
    display: inline-block;
    padding: 0;
    background: transparent;
    vertical-align: middle;
    height: 17px;
  }

  .d2h-wrapper{
    position: relative;
  }

  .d2h-wrapper .d2h-files-diff{
    position: relative;
  }

  .d2h-wrapper .d2h-file-side-diff{
    margin-bottom: -5px;
  }

  .d2h-file-side-diff:first-child {
    float: left;
  }

  .d2h-wrapper .d2h-files-diff > .d2h-file-side-diff ~ .d2h-file-side-diff{
    position: relative;
  }

  .d2h-wrapper .d2h-code-side-emptyplaceholder{
    max-height: 19px;
  }

  .d2h-wrapper .d2h-code-side-line,
  .d2h-wrapper .d2h-code-line{
    display: block;
    width: auto;
  }

  .d2h-wrapper .d2h-code-side-line.d2h-info{
    height: 18px;
  }

  .d2h-wrapper .d2h-code-linenumber,
  .d2h-code-side-linenumber{
    height: 19px;
  }
}
.no-file-name-header{
  .d2h-wrapper .d2h-file-header{
    display: none;
  }
}
</style>
