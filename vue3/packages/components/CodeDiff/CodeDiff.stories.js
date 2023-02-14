import { initProps } from '../../storybook/index'
import VueDiffToHtml from './index.vue'

export default {
  title: 'Editor编辑器/CodeDiff代码对比',
  component: VueDiffToHtml
}

const Template = (args, { argTypes }) => {
  return {
    props: initProps(args),
    components: { VueDiffToHtml },
    template: `<div>
        <vue-diff-to-html v-bind="$props" />
      </div>`
  }
}
export const 基础用法 = Template.bind({})
基础用法.args = {
  oldString: 'test\nbb\ncc\n',
  newString: 'test1\nbb\ncc1\n'
}
基础用法.parameters = {
  docs: {
    storyDescription: '传入字符串类型，默认line-by-line,直接进行对比，逐行排列'
  }
}

const ObjTemplate = (args, { argTypes }) => {
  return {
    props: initProps(args),
    components: { VueDiffToHtml },
    template: `<div>
        <vue-diff-to-html v-bind="$props" />
      </div>`
  }
}
export const Json数据 = ObjTemplate.bind({})
Json数据.args = {
  oldString: JSON.stringify({
    name: '小红',
    age: 14
  }, null, 2),
  newString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  outputFormat: 'side-by-side'
}
Json数据.parameters = {
  docs: {
    storyDescription: '传入JSON字符串，则需要JSON.stringify(obj, null, 2)转换一次，直接进行对比，并行排列'
  }
}

const HiddenTemplate = (args, { argTypes }) => {
  return {
    props: initProps(args),
    components: { VueDiffToHtml },
    template: `<div>
        <vue-diff-to-html v-bind="$props" />
      </div>`
  }
}
export const 隐藏内容 = HiddenTemplate.bind({})
隐藏内容.args = {
  oldString: JSON.stringify({
    name: '小红',
    age: 14,
    job: 'engineer',
    school: 'Tsinghua',
    adress: 'moon',
    tool: 'saw',
    game: 'wow',
    interests: 'sing',
    b: 'sing',
    c: 'sing',
    d: 'sing',
    e: 'sing',
    food: 'apple',
    sex: 'male'
  }, null, 2),
  newString: JSON.stringify({
    name: '小黄',
    age: 14,
    job: 'cook',
    school: 'Tsinghua',
    adress: 'sun',
    tool: 'saw',
    game: 'wow',
    interests: 'sing',
    b: 'sing',
    c: 'sing',
    d: 'sing',
    e: 'sing',
    food: 'orange',
    sex: 'male'
  }, null, 2),
  outputFormat: 'side-by-side',
  context: 2
}
隐藏内容.parameters = {
  docs: {
    storyDescription: '不同地方上下间隔多少行不隐藏，默认5行，当前设置为2，并行排列，设置的数值越大，可以把所有没有改变的行数全部显示出来'
  }
}

const NoObjTemplate = (args, { argTypes }) => {
  return {
    props: initProps(args),
    components: { VueDiffToHtml },
    template: `<div>
        <vue-diff-to-html v-bind="$props" />
      </div>`
  }
}
export const 无数据不渲染 = NoObjTemplate.bind({})
无数据不渲染.args = {
  oldString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  newString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  outputFormat: 'side-by-side',
  renderNothingWhenEmpty: true
}
无数据不渲染.parameters = {
  docs: {
    storyDescription: '当比较对象无对比时，默认为false渲染，此处为true的效果不渲染'
  }
}

const CompareLevleTemplate = (args, { argTypes }) => {
  return {
    props: initProps(args),
    components: { VueDiffToHtml },
    template: `<div>
        <vue-diff-to-html v-bind="$props" />
      </div>`
  }
}
export const 对比级别 = CompareLevleTemplate.bind({})
对比级别.args = {
  oldString: JSON.stringify({
    name: '小红',
    age: 14,
    job: 'engineer',
    school: 'Tsinghua',
    adress: 'moon',
    tool: 'saw',
    game: 'wow',
    interests: {
      a: '我恨你',
      b: '我不爱你'
    },
    food: 'apple',
    sex: 'male'
  }, null, 2),
  newString: JSON.stringify({
    name: '小黄',
    age: 14,
    job: 'cook',
    school: 'Tsinghua',
    adress: 'sun',
    tool: 'saw',
    game: 'wow',
    interests: {
      a: '我爱你',
      b: '我不爱你'
    },
    food: 'orange',
    sex: 'male'
  }, null, 2),
  outputFormat: 'side-by-side',
  diffStyle: 'char'
}
对比级别.parameters = {
  docs: {
    storyDescription: '每行中对比差异级别'
  }
}

const ShowNoChangeTemplate = (args, { argTypes }) => {
  return {
    props: initProps(args),
    components: { VueDiffToHtml },
    template: `<div>
        <vue-diff-to-html v-bind="$props" />
      </div>`
  }
}
export const ShowNoChangeData = ShowNoChangeTemplate.bind({})
ShowNoChangeData.args = {
  oldString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  newString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  outputFormat: 'side-by-side',
  isShowNoChange: true
}
ShowNoChangeData.parameters = {
  docs: {
    storyDescription: '当比较对象无对比时，默认为false，此处为true的效果，展示源代码'
  }
}

const ShowNoChangeCustomizeTemplate = (args, { argTypes }) => {
  return {
    props: initProps(args),
    components: { VueDiffToHtml },
    template: `<div>
        <vue-diff-to-html v-bind="$props" />
      </div>`
  }
}
export const ShowNoChangeCustomizeData = ShowNoChangeCustomizeTemplate.bind({})
ShowNoChangeCustomizeData.args = {
  oldString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  newString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  outputFormat: 'side-by-side',
  isShowNoChange: true,
  noChangeOldText: '我是对比的旧文件',
  noChangeNewText: '我是对比的新文件'
}
ShowNoChangeCustomizeData.parameters = {
  docs: {
    storyDescription: '当比较对象无对比时，默认为false，此处为true的效果，展示源代码，并改变顶部的文字'
  }
}

const FileNameTemplate = (args, { argTypes }) => {
  return {
    props: initProps(args),
    components: { VueDiffToHtml },
    template: `<div>
        <vue-diff-to-html v-bind="$props" />
      </div>`
  }
}
export const 文件名展示 = FileNameTemplate.bind({})
文件名展示.args = {
  oldString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  newString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  outputFormat: 'side-by-side',
  fileName: 'test.yml',
  isShowNoChange: true
}
文件名展示.parameters = {
  docs: {
    storyDescription: '展示文件名'
  }
}

const HideFileHeaderTemplate = (args, { argTypes }) => {
  return {
    props: initProps(args),
    components: { VueDiffToHtml },
    template: `<div>
        <vue-diff-to-html v-bind="$props" />
      </div>`
  }
}
export const 隐藏头部 = HideFileHeaderTemplate.bind({})
隐藏头部.args = {
  oldString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  newString: JSON.stringify({
    name: '小黄',
    age: 18
  }, null, 2),
  outputFormat: 'side-by-side',
  isShowNoChange: true,
  hideFileNameHeader: true
}
隐藏头部.parameters = {
  docs: {
    storyDescription: '隐藏文件头部'
  }
}
