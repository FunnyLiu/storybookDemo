import { initProps } from '../../storybook/index'
import PipelineForm from './index.vue'
import SubFormComps from './pipeline-details/index'
import request from './mockData/mock-request'
export default {
  title: 'Dialog弹框/PipelineForm流水线弹框',
  component: PipelineForm
}
const Template = (args, { argTypes }) => {
  return {
    props: initProps(args),

    components: { PipelineForm },
    data() {
      return {
        showMainForm: false,
        pipelineData: [],
        formType: ''
      }
    },
    methods: {
      open(type) {
        request.getPipelineData().then(resp => {
          this.pipelineData = this.resolveDataToList(resp.data)
          this.formType = type
          this.showMainForm = true
        })
      },
      resolveDataToList(data) {
        return [
          {
            key: 'baseinfo',
            name: '基础信息',
            component: SubFormComps.BaseForm,
            data: {
              name: data.name,
              type: data.type
            },
            hidden: false,
            valid: true
          },
          {
            key: 'application',
            name: '选择应用',
            component: SubFormComps.AppForm,
            data: {
              application: data.application
            },
            hidden: false,
            valid: true
          },
          {
            key: 'build',
            name: '代码编译',
            component: SubFormComps.BuildForm,
            data: {
              build: data.build
            },
            hidden: linkChannel => (linkChannel.appType === 'container'),
            valid: true
          },
          {
            key: 'deploy',
            name: '部署信息',
            component: SubFormComps.DeployForm,
            data: {
              deployData: data.deployData
            },
            hidden: false,
            valid: true
          }
        ]
      },
      handleSubmit(formData) {
        console.log(formData)

        // 这里需要开发人员提交完数据后主动关闭表单
        this.showMainForm = false
      }
    },
    template: `<el-card class="box-card">
    <el-button type="primary" @click="open('add')">新建</el-button>
    <el-button type="primary" @click="open('edit')">编辑</el-button>
    <el-button type="primary" @click="open('clone')">克隆</el-button>
    <el-button type="primary" @click="open('detail')">详情</el-button>
    <pipeline-form v-if="showMainForm"
               form-title="流水线"
               :form-type="formType"
               :data="pipelineData"
               @submit="handleSubmit"
               @closed="showMainForm = false" />
  </el-card>`
  }
}

export const 基础用法 = Template.bind({})
