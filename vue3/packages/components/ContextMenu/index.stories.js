import { initProps } from '../../storybook/index'
import DoContextMenu from './index.vue'
import { contextmenu } from '../../utils/contextmenu'
import { getSelectedText } from '../../utils/select'
// import { copy } from '../../utils/copy'

export default {
  title: 'Show展示/ContextMenu右键菜单',
  component: DoContextMenu
}
const Template = (args, { argTypes }) => ({
  props: initProps(args),
  components: { DoContextMenu },
  template: `<div>
        <div @contextmenu="contextmenu">在我身上点击右键试试</div>
    </div>`,
  methods: {
    contextmenu(event) {
      event.preventDefault()
      contextmenu({
        items: [
          {
            label: '返回(B)',
            onClick: () => {
              console.log('返回(B)')
            }
          },
          { label: '前进(F)', disabled: true },
          { label: '重新加载(R)', divided: true, icon: 'el-icon-refresh' },
          { label: '另存为(A)...' },
          { label: '打印(P)...', hidden: true, icon: 'el-icon-printer' },
          { label: '投射(C)...', hidden: true, divided: true },
          {
            label: '使用网页翻译(T)',
            divided: true,
            minWidth: 0,
            children: [{ label: '翻译成简体中文' }, { label: '翻译成繁体中文' }]
          },
          {
            label: '截取网页(R)',
            minWidth: 0,
            children: [
              {
                label: '返回(B)',
                onClick: () => {
                  this.message = '返回(B)'
                  console.log('返回(B)')
                }
              },
              { label: '前进(F)', disabled: true },
              { label: '重新加载(R)', divided: true, icon: 'el-icon-refresh' },
              { label: '另存为(A)...' },
              { label: '打印(P)...', icon: 'el-icon-printer' },
              { label: '投射(C)...', divided: true },
              {
                label: '使用网页翻译(T)',
                divided: true,
                minWidth: 0,
                children: [
                  { label: '翻译成简体中文' },
                  { label: '翻译成繁体中文' }
                ]
              },
              {
                label: '截取网页(R)',
                minWidth: 0,
                children: [
                  {
                    label: '截取可视化区域',
                    onClick: () => {
                      this.message = '截取可视化区域'
                      console.log('截取可视化区域')
                    }
                  },
                  { label: '截取全屏' }
                ]
              },
              { label: '查看网页源代码(V)', icon: 'el-icon-view' },
              { label: '检查(N)' }
            ]
          },
          { label: '查看网页源代码(V)', icon: 'el-icon-view' },
          { label: '检查(N)' }
        ],
        event,
        customClass: 'class-a',
        zIndex: 3,
        minWidth: 230
      })
      return false
    }
  }
})

export const 基础用法 = Template.bind({})
基础用法.args = {}

const Template2 = (args, { argTypes }) => ({
  props: initProps(args),
  components: { DoContextMenu },
  template: `<div class="content">
  <div class="block">
    <h2>复制区</h2>
    <div class="area">
      <textarea style="width:400px;height:200px" class="area-body" @contextmenu="onCopy">
中国移动通信集团有限公司是按照
国家电信体制改革的总体部署，于2000年
组建成立的中央企业，注册资本 3000 亿元人民币，
资产规模 2.1 万亿元人民币。自成立以来，在党中央、
国务院的正确领导和上级部门的大力支持下，
始终致力于推动信息通信技术服务经济社会民生，
以创世界一流企业、做网络强国、数字中国、
智慧社会主力军为目标，坚持创新驱动发展，
加快转型升级步伐，已成为全球网络规模最大、
客户数量最多、盈利能力和品牌价值领先、市值排名前列的
电信运营企业。连续十八年获国资委中央企业负责人经营业绩
考核A级，连续两次获评国资委科技创新突出贡献企业，
连续二十二年入选财富世界五百强企业
      </textarea>
    </div>
  </div>
  <div class="block">
    <h2>粘贴区</h2>
    <div class="area">
      <textarea style="width:400px;height:200px"  class="area-body" @contextmenu="onPaste">{{pasteContent}}</textarea>
    </div>
  </div>
</div>`,
  data() {
    return {
      clipboardContent: '',
      pasteContent: ''
    }
  },
  methods: {
    onCopy(event) {
      const content = getSelectedText()
      // copy({ text: content })
      contextmenu({
        items: [
          {
            label: '复制',
            disabled: !content,
            onClick: () => {
              this.clipboardContent = content
            }
          },
          { label: '粘贴', disabled: true }
        ],
        event,
        zIndex: 3,
        minWidth: 140
      })
      event.preventDefault()
    },
    onPaste(event) {
      const content = getSelectedText()
      contextmenu({
        items: [
          {
            label: '复制',
            disabled: !content,
            onClick: () => {
              this.clipboardContent = content
            }
          },
          {
            label: '粘贴',
            disabled: !this.clipboardContent,
            onClick: () => {
              this.pasteContent += this.clipboardContent
            }
          }
        ],
        event,
        zIndex: 3,
        minWidth: 140
      })
      event.preventDefault()
    }
  }
})

export const 复制粘贴 = Template2.bind({})
复制粘贴.args = {}
复制粘贴.parameters = {
  docs: {
    storyDescription: '选中后右键复制，到另一个区域内右键粘贴'
  }
}
