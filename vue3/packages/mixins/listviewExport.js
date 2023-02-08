/**
 * listview导出功能的相关mixin
 */
import { json2excel } from '../utils/excel'
export default {
  methods: {
    exportFile({
      filename,
      filetype = 'xlsx',
      list
    }) {
      // 不传list，则是使用本地模式下的过滤筛选后数据
      const myList = list || this.$refs.list.getValidData()
      const { columns } = this.$refs.list
      const tHeader = []
      const filterVal = []
      const tableDatas = []
      const sheetName = filename
      myList.forEach((item, index) => {
        const exportItem = { ...item }
        columns.forEach(column => {
          if (column.exportable) {
            exportItem[column.prop] = column.exportable({ row: item, index: index }).exportText || item[column.prop]
            // 利用第一行来初始化行信息
            if (index == 0) {
              tHeader.push(column.exportable({ row: item, index: 0 }).exportHeader || column.label)
              filterVal.push(column.prop)
            }
          }
        })
        tableDatas.push(exportItem)
      })
      const excelDatas = []
      excelDatas.push({
        tHeader,
        filterVal,
        tableDatas,
        sheetName
      })
      json2excel(excelDatas, filename, true, filetype)
    }
  }
}

