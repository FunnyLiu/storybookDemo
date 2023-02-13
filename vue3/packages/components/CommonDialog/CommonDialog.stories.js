import { initProps } from '../../storybook/index'
import CommonDialog from './index.vue'

export default {
  title: 'Dialog弹框/CommonDialog通用弹框',
  component: CommonDialog
}

const Template = (args, { argTypes }) => ({
  // props: initProps(argTypes),
  setup(){
    return {
      args
    }
  },
  data() {
    return {
      isDialogShow: false,
      header:'标题'
    }
  },
  methods: {
    test() {
      this.isDialogShow = true
    },
    close() {
      this.isDialogShow = false
    }
  },
  components: { CommonDialog },
  template: `<div>
    <button @click="test()" >打开弹框</button>
    <common-dialog :model-value="isDialogShow" v-bind="args" @close="close">
      <div>it is content here</div>
    </common-dialog>
  </div>`
})

export const 基础用法 = Template.bind({})
基础用法.args = {
  title: '标题'
}

const TemplateForm = (args, { argTypes }) => ({
  // props: Object.keys(argTypes),
  setup(){
   return {
    args
   }
  },
  data() {
    return {
      isDialogShow: false,
      formData: {
        name: undefined,
        departmentId: undefined,
        owner: undefined,
        description: undefined,
        onBoardDay: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入组名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ],
        departmentId: [
          {
            required: true,
            message: '请选择部门',
            trigger: 'change'
          }
        ],
        owner: [
          {
            required: true,
            message: '请选择组长',
            trigger: 'change'
          }
        ],
        onBoardDay: [
          {
            required: true,
            message: '请选择日期选择入职日期',
            trigger: 'change'
          }
        ],
        description: [
          {
            min: 0,
            max: 300,
            message: '长度在 0 到 300 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    test() {
      this.isDialogShow = true
    },
    onAction({ key }) {
      switch (key) {
        case 'sure':
          break
        case 'cancel':
          this.isDialogShow = false
          break
        case 'close':
          this.isDialogShow = false
          break
        default:
          break
      }
    }
  },
  components: { CommonDialog },
  template: `<div>
    <button @click="test()" >打开弹框</button>
    <common-dialog :modelValue="isDialogShow" v-bind="args" @action="onAction">
    <el-form
    ref="elForm"
    :model="formData"
    :rules="rules"
    size="default"
    label-width="100px"
  >
    <el-form-item label="组名" prop="name">
      <el-input
        v-model="formData.name"
        placeholder="请输入组名"
        clearable
        :style="{ width: '100%' }"
      />
    </el-form-item>
    <el-form-item label="部门" prop="departmentId">
      <el-select
        v-model="formData.departmentId"
        placeholder="请选择部门"
        clearable
        :teleported="false"
        :style="{ width: '100%' }"
      >
        <el-option
          v-for="(item, index) in departmentIdOptions"
          :key="index"
          :label="item.name"
          :value="item.id"
          :disabled="item.disabled"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="组长" prop="owner">
      <el-select
        v-model="formData.owner"
        placeholder="请选择组长"
        :disabled="ownerDisabled"
        filterable
        clearable
        :teleported="false"
        :style="{ width: '100%' }"
      >
        <el-option
          v-for="(item, index) in ownerOptions"
          :key="index"
          :label="item.name"
          :value="item.id"
          :disabled="item.disabled"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="入职日期" prop="onBoardDay">
      <el-date-picker
        v-model="formData.onBoardDay"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        :style="{width: '100%'}"
        :teleported="false"
        placeholder="请选择日期选择入职日期"
        clearable
      />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input
        v-model="formData.description"
        type="textarea"
        placeholder="请输入描述"
        :maxlength="300"
        :autosize="{ minRows: 4, maxRows: 4 }"
        :style="{ width: '100%' }"
      />
    </el-form-item>
  </el-form>
    </common-dialog>
  </div>`
})

export const 表单弹框 = TemplateForm.bind({})
表单弹框.args = {
  title: '新增组',
  actions: [
    {
      name: '取消',
      id: 'cancel'
    },
    {
      name: '确定',
      id: 'sure',
      type: 'primary'
    }
  ]
}
表单弹框.parameters = {
  docs: {
    storyDescription: '自定义表单，自定义action的弹框'
  }
}

export const 按钮loading = TemplateForm.bind({})
按钮loading.args = {
  title: '新增组',
  actions: [
    {
      name: '取消',
      id: 'cancel'
    },
    {
      name: '确定',
      id: 'sure',
      type: 'primary',
      loading: true
    }
  ]
}
按钮loading.parameters = {
  docs: {
    storyDescription: '按钮loading'
  }
}
