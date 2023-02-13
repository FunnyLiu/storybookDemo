<!--
 * 流水线编译打包相关配置信息表单
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
    <el-form-item label="部署方式" prop="build.deployKindof">
      <el-select v-model="formData.build.deployKindof" placeholder="选择部署方式">
        <el-option label="代码部署" value="code" />
        <el-option label="镜像部署" value="container" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="formData.build.deployKindof==='code'" label="代码分支" prop="build.branch">
      <el-select v-model="formData.build.branch" placeholder="选择代码分支">
        <el-option label="master" value="origin/master" />
        <el-option label="dev" value="origin/dev" />
        <el-option label="feature" value="origin/feature" />
        <el-option label="hotfix" value="origin/hotfix" />
        <el-option label="release" value="origin/release" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="formData.build.deployKindof==='container'" label="镜像版本" prop="build.imageVersion">
      <el-select v-model="formData.build.imageVersion" placeholder="选择镜像版本">
        <el-option label="1.0.0" value="1.0.0" />
        <el-option label="1.0.1" value="1.0.1" />
        <el-option label="1.1.0" value="1.1.0" />
        <el-option label="1.1.1" value="1.1.1" />
        <el-option label="2.0.0" value="2.0.0" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="formData.build.deployKindof==='code'" label="编译工具" prop="build.buildBy">
      <el-select v-model="formData.build.buildBy" placeholder="选择编译工具">
        <el-option label="npm" :value="1" />
        <el-option label="maven" :value="2" />
        <el-option label="gradle" :value="3" />
        <el-option label="python" :value="4" />
        <el-option label="golang" :value="5" />
        <el-option label="cplusplus" :value="6" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import SubFormMixin from '../../../mixins/subForm'
export default {
  name: 'BuildForm',
  mixins: [SubFormMixin],
  data() {
    return {
      appType: '',
      rules: {
        'build.deployKindof': [{ required: true, message: '请选择部署方式', trigger: 'blur' }],
        'build.branch': [{ required: true, message: '请选择代码分支', trigger: 'blur' }],
        'build.imageVersion': [{ required: true, message: '请选择镜像版本', trigger: 'blur' }],
        'build.buildBy': [{ required: true, message: '请选择编译工具', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'linkChannel.appTpe': {
      handler(v) {
        this.appType = v
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
