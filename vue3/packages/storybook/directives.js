import { app } from '@storybook/vue3'
// 和业务数据耦合的指令是不纯的，故而在此mock
app.directive('permission', {
  acceptStatement: true,
  inserted(el, binding) { return }
})
