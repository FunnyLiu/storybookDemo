<!--
 * 流水线应用相关信息表单
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
    <el-form-item label="应用" prop="application.id">
      <el-select v-model="formData.application.id"
                 placeholder="选择应用"
                 @change="handleAppChange">
        <el-option
          v-for="app in applications"
          :key="app.id"
          :label="app.showName"
          :value="app.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="模板" prop="application.templateId">
      <el-select v-model="formData.application.templateId" placeholder="选择应用流水线模板">
        <el-option
          v-for="item in pipelineTemplates"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { find } from '../../../utils/array'
import request from '../mockData/mock-request'
import SubFormMixin from '../../../mixins/subForm'
export default {
  name: 'AppForm',
  mixins: [SubFormMixin],
  data() {
    return {
      applications: [],
      pipelineTemplates: [],
      rules: {
        'application.id': [{ required: true, message: '请选择应用', trigger: 'blur' }]
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
    this.getApplications()
    this.getPipelineTemplates(this.formData.application.type)
  },
  methods: {
    getPipelineTemplates(type) {
      request.getPipelineTemplates(type).then(resp => {
        this.pipelineTemplates = resp.data
      })
    },
    getApplications() {
      request.getApplications().then(resp => {
        this.applications = resp.data
      })
    },
    handleAppChange(appId) {
      const app = find(this.applications, ['id', appId])
      this.formData.application.typeId = app.typeId
      this.formData.application.type = app.type
      this.formData.application.templateId = null

      this.getPipelineTemplates(app.type)

      this.$emit('field-change', 'appType', app.type)
    }
  }
}
</script>

<style lang="scss">
.el-select {
    width: 100%;
}
</style>
