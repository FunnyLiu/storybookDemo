<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-06-13 15:16:24
 * @LastEditors: liufang
 * @LastEditTime: 2022-06-13 15:16:24
 * @Description: 图片裁切上传组件
-->
<template>
  <div class="image-clip">
    <el-dialog
      v-dragDialog
      title="选择图片"
      :modelValue="visible"
      width="680px"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      @close="closeHandler"
    >
      <el-row :gutter="20">
        <el-col :span="18">
          <div
            ref="clipArea"
            class="clip-area"
          />
        </el-col>
        <el-col :span="6">
          <el-row class="btn-row">
            <el-button
              ref="file"
              @click="selectHandler"
            >选择图片</el-button>
          </el-row>
          <el-row class="btn-row">
            <el-button-group>
              <el-button
                icon="RefreshRight"
                @click="rotateHandler"
              />
              <el-button
                icon="Scissor"
                @click="clipHandler"
              />
            </el-button-group>
          </el-row>
          <el-row class="btn-row avatar-container">
            <el-avatar
              :size="150"
              :src="imgUrl"
              shape="square"
            />
          </el-row>
          <el-row
            v-if="imgUrl"
            class="btn-row"
          >
            <el-button
              type="primary"
              @click="submitForm"
            >选定</el-button>
          </el-row>
          <input
            ref="fileInput"
            type="file"
            style="display: none"
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import PhotoClip from 'photoclip2'
import { dragDialog } from '../../directives/index'
import { request } from '../../utils/request'
import { dataURLtoFile, generateMd5fromFile, getDateURLfromImgUrl } from '../../utils/file'

/**
 * 图片裁切上传组件
 *
 * 由于是弹框组件，故而通过ref和api来调用：
 *
 * this.$refs.dialog.show('')
 *
 * 参数为图片的base64编码，或者url
 *
 * 组件依赖动态Action：DO_UPLOAD_FILE
 *
 */
export default {
  name: 'DoImageClipUploader',
  directives: {
    dragDialog
  },
  props: {
    /**
     * 宽度，默认为80px
     */
    width: {
      type: Number,
      default: 80
    },
    /**
     * 高度，默认为80px
     */
    height: {
      type: Number,
      default: 80
    },
    /**
     * 上传类型，user为头像，project为项目
     */
    type: {
      type: String,
      default: 'user'
    },
    /**
     * 是否需要走上传的流程，默认为true，如果设置为false，则返回的不再是url而是图片的base64编码
     */
    needUpload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false, // 弹框关闭/打开
      pc: null, // PhotoClip 实例
      imgUrl: null, // 图片路径
      angle: 0 // 旋转角度
    }
  },
  methods: {
    /**
     * 打开弹框，供外部调用
     * @public
     * @param {string} imgUrl 默认图片的url或者base64编码
     */
    show(imgUrl) {
      this.imgUrl = imgUrl || ''
      this.visible = true
      this.$nextTick(function() {
        this.pc = new PhotoClip(this.$refs.clipArea, {
          size: [this.width, this.height],
          outputSize: [this.width, this.height],
          outputQuality: 0.7,
          outputType: 'png',
          file: this.$refs.fileInput,
          fail: (msg) => {
            this.$message.error(msg)
          }
        })
        if (this.imgUrl) this.pc.load(this.imgUrl)
      })
    },
    async submitForm() {
      // 不需要上传，直接走base64即可
      if (!this.needUpload) {
        this.$emit('clip', this.imgUrl) // 返回imgurl
        this.close()
        return
      }
      const formData = new FormData()
      if (this.imgUrl.startsWith('http')) {
        this.imgUrl = await getDateURLfromImgUrl(this.imgUrl)
      }
      const file = dataURLtoFile(this.imgUrl, '图片.png')
      const md5 = await generateMd5fromFile(file)
      formData.append('file', file)
      formData.append('file_name', `${md5}.png`)
      formData.append('type', this.type)
      const { data } = await request('DO_UPLOAD_FILE', {
        data: formData
      })
      /**
       * 裁切完毕提交表单
       *
       * @event clip
       * @property {string} 图片url或base64编码
       */
      this.$emit('clip', data) // 返回imgurl
      this.close()
    },
    selectHandler() {
      // this.$refs.fileInput.dispatchEvent(new MouseEvent('click'))
      this.$refs.fileInput.click()
    },
    clipHandler() {
      this.imgUrl = this.pc.clip()
    },
    rotateHandler() {
      this.angle += 90
      this.angle = this.angle > 360 ? this.angle - 360 : this.angle

      this.pc.rotate(this.angle)
    },
    closeHandler() {
      if (this.pc) {
        this.pc.clear()
        this.pc.destroy()
      }
    },
    close() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.clip-area {
  width: 100%;
  height: 330px;
}
.btn-row {
  margin-bottom: 20px;
}
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
