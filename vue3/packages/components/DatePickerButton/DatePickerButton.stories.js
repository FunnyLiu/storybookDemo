import { initProps } from '../../storybook/index'
import DoDatePickerButton from './index.vue'
import dayjs from 'dayjs'
export default {
  title: 'Data数据处理/DatePickerButton时间段按钮',
  component: DoDatePickerButton
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  data() {
    return {
      durationText: '过去七天',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [dayjs(start).format('YYYY-MM-DD'), dayjs(end).format('YYYY-MM-DD')]
            }
          },
          {
            text: '最近一个月',
            value: () => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [dayjs(start).format('YYYY-MM-DD'), dayjs(end).format('YYYY-MM-DD')]
            }
          },
          {
            text: '最近三个月',
            value: ()=> {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [dayjs(start).format('YYYY-MM-DD'), dayjs(end).format('YYYY-MM-DD')]
            }
          }
        ]
      },
      duration: ''
    }
  },
  methods: {
    changeDurationPicker(val) {
      this.duration = val
      if (!val) {
        this.durationText = '选择时间'
        return
      }
      this.durationText = `${this.$moment(val[0]).format('YYYY-MM-DD')} - ${this.$moment(val[1]).format('YYYY-MM-DD')}`
      // 这里只能手动比较并赋值了，因为element-plus里没有暴露以前的model数组后续参数了
      this.pickerOptions.shortcuts.forEach(( shortcut ) => {
        const [start, end] = shortcut.value() 
        if(dayjs(val[0]).format('YYYY-MM-DD') == start && dayjs(val[1]).format('YYYY-MM-DD') == end) {
          this.durationText = shortcut.text
        }
      })
      // -------------------------------------------------------------------
    }
  },
  components: { DoDatePickerButton },
  template: `<div>
  <do-date-picker-button
    :value="duration"
    type="daterange"
    size="small"
    range-separator=""
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="YYYY-MM-DD"
    :text="durationText"
    :shortcuts="pickerOptions.shortcuts"
    @change="changeDurationPicker"
  />
  </div>`
})
export const 基础用法 = Template.bind({})
基础用法.args = {}
