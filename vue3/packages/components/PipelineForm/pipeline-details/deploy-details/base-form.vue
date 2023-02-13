<!--
 * 部署信息基础配置信息表单
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
    <el-form-item label="部署" prop="checked">
      <el-checkbox v-model="formData.checked" />
    </el-form-item>
    <el-form-item label="环境" prop="env">
      <el-select v-model="formData.env" placeholder="选择部署环境">
        <el-option label="dev" value="dev" />
        <el-option label="sit" value="sit" />
        <el-option label="uat" value="uat" />
        <el-option label="prod" value="prod" />
      </el-select>
    </el-form-item>
    <el-form-item label="实例" prop="scale">
      <el-input-number v-model="formData.scale" :min="1" :max="10" />
    </el-form-item>
    <el-form-item label="资源" prop="resource">
      <el-select v-model="formData.resource" placeholder="选择资源">
        <el-option label="1C1G" value="1核CPU，1G内存" />
        <el-option label="1C2G" value="1核CPU，2G内存" />
      </el-select>
    </el-form-item>
    <el-form-item label="部署类型" prop="deployType">
      <el-select v-model="formData.deployType" placeholder="选择部署类型">
        <el-option label="KUBERNETES" value="KUBERNETES" />
        <el-option label="OWBE" value="OWBE" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import SubFormMixin from '../../../../mixins/subForm'
export default {
  name: 'BaseForm',
  mixins: [SubFormMixin],
  data() {
    return {
      pipelineType: [],
      rules: {
        env: [{ required: true, message: '请选择部署环境', trigger: 'blur' }],
        resource: [{ required: true, message: '请选分配资源', trigger: 'blur' }],
        deployType: [{ required: true, message: '请选择部署类型', trigger: 'blur' }]
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

  },
  methods: {
  }
}
</script>

<style lang="scss">
.el-select {
    width: 100%;
}
</style>
