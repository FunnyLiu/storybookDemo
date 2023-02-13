<!--
 * 流水线基础配置信息表单
-->
<template>
  <el-form
    ref="elForm"
    :model="formData"
    :disabled="formDisabled"
    :rules="formDisabled?{}:rules"
    label-width="80px"
    size="small"
    @validate="handleValidate"
  >
    <el-form-item label="名称" prop="name">
      <el-input v-model="formData.name" placeholder="流水线名称" />
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-select v-model="formData.type" placeholder="流水线类型">
        <el-option
          v-for="item in pipelineType"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import request from '../mockData/mock-request'
import SubFormMixin from '../../../mixins/subForm'

export default {
  name: 'BaseForm',
  mixins: [SubFormMixin],
  data() {
    return {
      pipelineType: [],
      rules: {
        name: [{ required: true, message: '请输入流水线名称', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'linkChannel.education': {
      handler(v) {
        console.log(v)
      }
    }
  },
  mounted() {
    this.getPipelineTypes()
  },
  methods: {
    getPipelineTypes() {
      request.getPipelineTypes().then(resp => {
        this.pipelineType = resp.data
      })
    }
  }
}
</script>

<style lang="scss">
.el-select {
    width: 100%;
}
</style>
