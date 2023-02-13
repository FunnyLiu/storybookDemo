// 批量导入本目录下所有.vue结尾的组件
// 注意：所有子组件名不可重复，不遍历子目录
const requireComponent = require.context('./', false, /\w+\.vue$/)
const comps = {}
requireComponent.keys().map(fileName => {
  const comp = requireComponent(fileName).default
  comps[comp.name] = comp
})

export default comps
