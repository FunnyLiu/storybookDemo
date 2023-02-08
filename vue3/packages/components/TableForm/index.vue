<!--
 * @FileName: index.vue
 * @Author: liufang
 * @Date: 2022-08-29 16:16:24
 * @Description: 表格表单组件
-->
<template>
  <div class="do-table-form">
    <do-list-view
      ref="list"
      v-bind="$attrs"
      :list="list"
      :total="list.length"
      size="mini"
      type="remote"
      editable
      :filters="handledFilters"
      :columns="handledColumns"
      :show-pagination="false"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import { cloneDeep } from '../../utils/object'
import DoListView from '../ListView/index'
import DoTableTextAction from '../TableTextAction/index'

/**
 * 表格表单组件
 *
 * 用于编辑较为复杂的数据结构表单
 *
 */
export default {
  name: 'DoTableForm',
  components: {
    DoListView
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    handledColumns: function() {
      return [
        ...this.columns,
        {
          prop: 'action',
          label: '操作',
          minWidth: 120,
          showOverflowTooltip: true,
          render: (createElement, { row, index }) => {
            return createElement('div', [
              createElement(DoTableTextAction, {
                // props: {
                  row,
                  index,
                  actions: [
                    ...(!row.isEditing
                      ? [
                        {
                          name: '编辑',
                          type: 'primary',
                          id: 'edit',
                          underline: false
                        }
                      ]
                      : []),
                    ...(!row.isEditing
                      ? [
                        {
                          name: '删除',
                          type: 'danger',
                          id: 'remove',
                          underline: false
                        }
                      ]
                      : []),
                    ...(row.isEditing
                      ? [
                        {
                          name: '保存',
                          type: 'primary',
                          id: 'save',
                          underline: false
                        }
                      ]
                      : []),
                    ...(row.isEditing
                      ? [
                        {
                          name: '取消',
                          type: 'primary',
                          id: 'cancel',
                          underline: false
                        }
                      ]
                      : [])
                  ],
                // },
                // 事件监听
                // on: {
                  onAction: this.onAction
                // }
              }),
              [createElement('div',
                {
                  class: 'validMessage'
                }
                , row.validMessage)]

            ])
          }
        }
      ]
    },
    handledFilters: function() {
      return [
        ...this.filters
      ]
    }
  },

  mounted() {},
  methods: {
    async refresh() {
      await this.$refs.list.refresh()
    },
    /**
     * 提供给外部增加用，仅可编辑表格可用
     * @public
     *
     */
    add(item) {
      this.$refs.list.add(item)
    },
    /**
     * 提供给外部增加用，仅可编辑表格可用
     * @public
     *
     */
    delete(index) {
      this.$refs.list.delete(index)
    },
    /**
     * 获取用户真正填写完毕的数据
     * @public
     */
    getList() {
      const list = cloneDeep(this.$refs.list.getList())
      // 删除内置的各种字段，还原最纯洁的数据给外部
      return list.filter(item => !item.isNew).map(item => {
        delete item.isEditing
        delete item.row_editing
        delete item.isNew
        delete item.validMessage
        return item
      })
    },
    /**
     * 校验，如果有编辑状态，则不通过
     * @public
     * @async
     * @return {boolean} true为校验通过
     */
    async validateAll() {
      return new Promise((resolve, reject) => {
        const list = this.$refs.list.getList()
        let errorCount = 0
        list.forEach(item => {
          if (item.isEditing) {
            item.validMessage = '未保存'
            errorCount++
          } else {
            item.validMessage = ''
          }
        })
        if (errorCount > 0) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    },
    async onAction({ key, row, index }) {
      // 需要校验的列
      const validColumns = this.columns.filter((column) => {
        return column.rules
      })
      let errorCount = 0
      const needValidCount = validColumns.length
      const asyncValidFileds = async() => {
        let count = 0
        return new Promise((resolve, reject) => {
          this.$refs.list.$refs.table.$refs.form.validateField(validColumns.map(column => {
            return `realList.${index}.row_editing.${column.prop}`
          }), isValid => {
            if (isValid) {
              resolve()
            }
          })
          // this.$refs.list.$refs.table.$refs.form.validateField(
          //   validColumns.map((column) => {
          //     return `realList.${index}.row_editing.${column.prop}`
          //   }),
          //   (error) => {
          //     if (error) {
          //       errorCount++
          //     }
          //     count++
          //     // 做异步的数据判断，检验均callback了才执行下一步
          //     if (needValidCount === count) {
          //       resolve()
          //     }
          //   }
          // )
        })
      }
      switch (key) {
        case 'edit':
          row.isEditing = true
          break
        case 'remove':
          this.$confirm(`是否删除?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$refs.list.delete(index)
          })
          break
        case 'save':
          // 此处改成异步校验，从而兼容异步校验
          await asyncValidFileds()
          // 当前行每个校验都通过才能切换状态
          this.$nextTick(() => {
            if (errorCount > 0) return
            row.isEditing = false
            row.isNew = false
            row.validMessage = ''
            // 保存的时候值互换
            Object.keys(row.row_editing).forEach((rowKey) => {
              row[rowKey] = row.row_editing[rowKey]
            })
          })
          break
        case 'cancel':
          // 新建的点击取消，采用删除操作即可
          if (row.isNew) {
            this.$refs.list.delete(index)
            return
          }
          row.isEditing = false
          row.validMessage = ''
          // 取消的时候值重置
          Object.keys(row).forEach((rowKey) => {
            if (rowKey == 'isEditing') return
            row.row_editing[rowKey] = row[rowKey]
          })
          // 触发一下校验，归位
          this.$refs.list.$refs.table.$refs.form.clearValidate(
            validColumns.map((column) => {
              return `realList.${index}.row_editing.${column.prop}`
            })
          )
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.do-table-form {
  ::v-deep .validMessage {
    position: absolute;
    top: 22px;
    color: #f56c6c;
    font-size: 12px;
  }
}
</style>
