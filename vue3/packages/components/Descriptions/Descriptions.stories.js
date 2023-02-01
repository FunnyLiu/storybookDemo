import { initProps } from '../../storybook/index'
import Descriptions from './index'
import DescriptionsItem from '../DescriptionsItem/index'

export default {
  title: 'Show展示/Descriptions描述组件',
  component: Descriptions
}
const Template = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },
    components: { Descriptions, DescriptionsItem },
    template: `<descriptions title="用户信息">
    <descriptions-item label="用户名">kooriookami</descriptions-item>
    <descriptions-item label="手机号">18100000000</descriptions-item>
    <descriptions-item label="居住地">苏州市</descriptions-item>
    <descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </descriptions-item>
    <descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</descriptions-item>
</descriptions>`
  }
}
export const 基础用法 = Template.bind({})

const SizeTemplate = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },
    components: { Descriptions, DescriptionsItem },
    data() {
      return {
        size: ''
      }
    },
    template: `<div>
    <el-radio-group v-model="size">
      <el-radio label="">默认</el-radio>
      <el-radio label="medium">中等</el-radio>
      <el-radio label="small">小型</el-radio>
      <el-radio label="mini">超小</el-radio>
    </el-radio-group>
  
    <descriptions class="margin-top" title="带边框列表" :column="3" :size="size" border>
      <template #extra>
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <descriptions-item>
      <template #label>
        <div>
          <el-icon>
            <User />
          </el-icon>
          用户名
        </div>
      </template>
      kooriookami
      </descriptions-item>
      <descriptions-item>
      <template #label>
        <div>
          <el-icon>
            <Phone />
          </el-icon>
          手机号
        </div>
      </template>
        18100000000
      </descriptions-item>
      <descriptions-item>
      <template #label>
        <div>
          <el-icon>
            <Location />
          </el-icon>
          居住地
        </div>
      </template>
        苏州市
      </descriptions-item>
      <descriptions-item>
      <template #label>
        <div>
          <el-icon>
            <Tickets />
          </el-icon>
          备注
        </div>
      </template>
        <el-tag size="small">学校</el-tag>
      </descriptions-item>
      <descriptions-item>
      <template #label>
        <div>
          <el-icon>
            <OfficeBuilding />
          </el-icon>
          联系地址
        </div>
      </template>
        江苏省苏州市吴中区吴中大道 1188 号
      </descriptions-item>
    </descriptions>
  
    <descriptions class="margin-top" title="无边框列表" :column="3" :size="size">
      <template #extra>
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <descriptions-item label="用户名">kooriookami</descriptions-item>
      <descriptions-item label="手机号">18100000000</descriptions-item>
      <descriptions-item label="居住地">苏州市</descriptions-item>
      <descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </descriptions-item>
      <descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</descriptions-item>
    </descriptions>
  </div>`
  }
}
export const 不同尺寸 = SizeTemplate.bind({})
不同尺寸.parameters = {
  docs: {
    storyDescription: '不同尺寸'
  }
}

const VerticalTemplate = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },
    components: { Descriptions, DescriptionsItem },
    template: `<div>
    <descriptions title="垂直带边框列表" direction="vertical" :column="4" border>
      <descriptions-item label="用户名">kooriookami</descriptions-item>
      <descriptions-item label="手机号">18100000000</descriptions-item>
      <descriptions-item label="居住地" :span="2">苏州市</descriptions-item>
      <descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </descriptions-item>
      <descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</descriptions-item>
    </descriptions>
    
    <descriptions class="margin-top" title="垂直无边框列表" :column="4" direction="vertical">
      <descriptions-item label="用户名">kooriookami</descriptions-item>
      <descriptions-item label="手机号">18100000000</descriptions-item>
      <descriptions-item label="居住地" :span="2">苏州市</descriptions-item>
      <descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </descriptions-item>
      <descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</descriptions-item>
    </descriptions>
</div>`
  }
}
export const 垂直列表 = VerticalTemplate.bind({})
垂直列表.parameters = {
  docs: {
    storyDescription: '垂直列表，设置direction为"vertical"'
  }
}

const CustomStyleTemplate = (args, { argTypes }) => {
  return {
    setup() {
      return { args }
    },
    components: { Descriptions, DescriptionsItem },
    template: `<descriptions title="自定义样式列表" :column="3" border>
    <descriptions-item label="用户名" label-class-name="my-label" content-class-name="my-content">kooriookami</descriptions-item>
    <descriptions-item label="手机号">18100000000</descriptions-item>
    <descriptions-item label="居住地">苏州市</descriptions-item>
    <descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </descriptions-item>
    <descriptions-item label="联系地址" :contentStyle="{'text-align': 'right'}">江苏省苏州市吴中区吴中大道 1188 号</descriptions-item>
  </descriptions>`
  }
}
export const 自定义样式 = CustomStyleTemplate.bind({})
自定义样式.parameters = {
  docs: {
    storyDescription: '自定义样式，通过label-class-name和content-class-name来控制'
  }
}

