import { initProps } from '../../storybook/index'
import SeamlessScrollList from './index.vue'

export default {
  title: 'List列表/SeamlessScrollList自动滚动列表',
  component: SeamlessScrollList
}

const listData = [{
  'title': '无缝滚动第一行无缝滚动第一行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第二行无缝滚动第二行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第三行无缝滚动第三行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第四行无缝滚动第四行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第五行无缝滚动第五行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第六行无缝滚动第六行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第七行无缝滚动第七行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第八行无缝滚动第八行',
  'date': '2017-12-16'
}, {
  'title': '无缝滚动第九行无缝滚动第九行',
  'date': '2017-12-16'
}]

const Template = (args, { argTypes }) => {
  return {
    setup() {
      return {
        args
      }
    },
    data() {
      return {
        listData,
        style: {
          wrap: {
            height: '200px',
            overflow: 'hidden'
          }
        }
      }
    },
    components: { SeamlessScrollList },
    template: `<seamless-scroll-list ref="list" v-bind="args" :style="style.wrap">
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span class="title" v-text="item.title"></span>
          <span class="date" v-text="item.date"></span>
        </li>
      </ul>
    </seamless-scroll-list>`
  }
}

export const 基础用法 = Template.bind({})
基础用法.args = {
  data: listData
}

export const 控制速度 = Template.bind({})
控制速度.args = {
  data: listData,
  params: {
    step: 2
  }
}
控制速度.parameters = {
  docs: {
    storyDescription: '速度变快'
  }
}

export const 悬停控制 = Template.bind({})
悬停控制.args = {
  data: listData,
  params: {
    hoverStop: false
  }
}
悬停控制.parameters = {
  docs: {
    storyDescription: 'hover后不再停止'
  }
}

export const 方向控制 = Template.bind({})
方向控制.args = {
  data: listData,
  params: {
    direction: 0
  }
}
方向控制.parameters = {
  docs: {
    storyDescription: '向下滚动 direction控制方向'
  }
}
const UpdateTemplate = (args, { argTypes }) => {
  return {
    setup() {
      return {
        args
      }
    },
    data() {
      return {
        listData: [...listData],
        style: {
          wrap: {
            height: '200px',
            overflow: 'hidden'
          }
        }
      }
    },
    methods: {
      update() {
        this.listData[0] = {
          title: '我的第一条的title，我被更新了。',
          date: 'date1'
        }
        this.listData[1] = {
          title: '我的第二条的title，我被更新了。',
          date: 'date2'
        }
        this.listData[2] = {
          title: '我的第三条的title，我被更新了。',
          date: 'date3'
        }
        this.listData[3] = {
          title: '我的第四条的title，我被更新了。',
          date: 'date4'
        }
        this.listData.push({
          title: 'newwwwwwwwwww',
          date: 'new'
        })
        this.$refs.list.reset()
      }
    },
    components: { SeamlessScrollList },
    template: `
    <div>
    <button @click="update()" >修改数据</button>
    <seamless-scroll-list ref="list" v-bind="args" :style="style.wrap">
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span class="title" v-text="item.title"></span>
          <span class="date" v-text="item.date"></span>
        </li>
      </ul>
    </seamless-scroll-list>
    </div>`
  }
}
export const 数据更新 = UpdateTemplate.bind({})
数据更新.args = {
  data: listData
}
数据更新.parameters = {
  docs: {
    storyDescription: '数据更新，需要手动调用reset方法进行重载'
  }
}
