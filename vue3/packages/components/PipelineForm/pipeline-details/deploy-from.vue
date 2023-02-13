<!--
 * 流水线编译打包相关配置信息表单
-->
<template>
  <el-form
    ref="elForm"
    :model="formData"
    label-width="80px"
    size="small"
    @validate="handleValidate"
  >
    <el-table
      :data="formData.deployData.deploy"
      style="width: 100%">
      <el-table-column label="部署" width="60">
        <template #default="scope">
          <el-checkbox v-model="scope.row.checked" :disabled="formDisabled" />
        </template>
      </el-table-column>
      <el-table-column prop="env" label="环境" />
      <el-table-column prop="scale" label="实例数" />
      <el-table-column prop="resource" label="资源" />
      <el-table-column prop="healthCheck.type" label="访问方式" />
      <el-table-column prop="healthCheck.port" label="访问端口" />
      <el-table-column
        label="操作"
        width="120">
        <template #default="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="open(scope.row, scope.$index)" />
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="formDisabled" />
        </template>
      </el-table-column>
    </el-table>
    <main-form v-if="showMainForm"
               form-title="部署信息"
               :form-type="formType"
               :data="deployFormData"
               append-to-body
               @submit="handleSubmit"
               @closed="showMainForm = false" />
  </el-form>
</template>

<script>
import MainForm from '../index.vue'
import SubFormMixin from '../../../mixins/subForm'
import SubFormComps from './deploy-details/index'

export default {
  name: 'DeployForm',
  components: { MainForm },
  mixins: [SubFormMixin],
  data() {
    return {
      // 部署详情相关字段
      deployFormData: [],
      showMainForm: false,
      currentIndex: -1
    }
  },
  watch: {
    'linkChannel.appType': {
      handler(v) {
        console.log(v)
      }
    }
  },
  mounted() {
  },
  methods: {
    open(deployDetails, index) {
      this.currentIndex = index
      this.deployFormData = this.resolveDataToList(deployDetails)
      // this.formType = this.formDisabled ? 'detail' : 'edit'
      this.showMainForm = true
    },
    resolveDataToList(data) {
      // 将数据按照子表单独立封装，互补干扰
      // key：表单key，相当于本表单逐渐，必须唯一
      // name：表单名称，用于当前Tab页面名称，尽量控制在6个字以内
      // component：通过import引入的子表单模块
      // hidden：是否展示本子表，hidden为true时，该表单数据不会汇总提交
      //         如果表单是否隐藏收到表单数据影响，通过watch该数据修改
      // valid：表单验证是否通过，默认为true
      return [
        {
          key: 'baseinfo',
          name: '基础信息',
          component: SubFormComps.BaseForm,
          data: {
            checked: data.checked,
            env: data.env,
            deployType: data.deployType,
            resource: data.resource,
            scale: data.scale
          },
          hidden: false,
          valid: true
        }
      ]
    },
    handleSubmit(data) {
      console.log(data)
      Object.assign(this.formData.deployData.deploy[this.currentIndex], data)

      // 这里需要开发人员提交完数据后主动关闭表单
      this.showMainForm = false
    }
  }
}
</script>

<style lang="scss">
.el-select {
    width: 100%;
}
</style>
