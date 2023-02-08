/**
 * Excel相关
 * @module excel
 */
import XLSX from 'xlsx'
import { saveAs } from './file'
function datenum(v, date1904) {
  if (date1904) v += 1462
  const epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}
function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}
function sheet_from_array_of_arrays(data, opts) {
  const ws = {}
  const range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  }
  for (let R = 0; R != data.length; ++R) {
    for (let C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      const cell = {
        v: data[R][C]
      }
      if (cell.v == null) continue
      const cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      })

      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else cell.t = 's'

      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}
// 主要修改此函数内的方法
function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}
function export_json_to_excel({
  multiHeader = [],
  header,
  data,
  sheetname,
  filename,
  merges = [],
  autoWidth = true,
  bookType = 'xlsx',
  notDownload = false

} = {}) {
  /* original data */
  filename = filename || 'excel-list'
  data = [...data]

  for (let i = 0; i < header.length; i++) {
    data[i].unshift(header[i])
  }

  // data.unshift(header)

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  const ws_name = sheetname
  const wb = new Workbook()
  const ws = []
  for (let j = 0; j < header.length; j++) {
    ws.push(sheet_from_array_of_arrays(data[j]))
  }

  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = []
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }
  // console.log("width", autoWidth)
  if (autoWidth) {
    /* 设置worksheet每列的最大宽度*/
    const colWidth = []
    for (let k = 0; k < header.length; k++) {
      colWidth.push(
        data[k].map(row =>
          row.map(val => {
            /* 先判断是否为null/undefined*/
            if (val == null) {
              return {
                wch: 10
              }
            } else if (val.toString().charCodeAt(0) > 255) {
              /* 再判断是否为中文*/
              return {
                wch: val.toString().length * 2
              }
            } else {
              return {
                wch: val.toString().length
              }
            }
          })
        )
      )
    }

    /* 以第一行为初始值*/
    const result = []
    for (let k = 0; k < colWidth.length; k++) {
      result[k] = colWidth[k][0]
      for (let i = 1; i < colWidth[k].length; i++) {
        for (let j = 0; j < colWidth[k][i].length; j++) {
          if (result[k][j]['wch'] < colWidth[k][i][j]['wch']) {
            result[k][j]['wch'] = colWidth[k][i][j]['wch']
          }
        }
      }
    }
    // 分别给sheet表设置宽度
    for (let l = 0; l < result.length; l++) {
      ws[l]['!cols'] = result[l]
    }
  }

  /* add worksheet to workbook */
  for (let k = 0; k < header.length; k++) {
    wb.SheetNames.push(ws_name[k])
    wb.Sheets[ws_name[k]] = ws[k]
  }

  const wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })
  if (notDownload) {
    return s2ab(wbout)
  }
  saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }),
    `${filename}.${bookType}`
  )
}

// 数据过滤
function formatJson(filterVal, jsonData) {
  return jsonData.map(v =>
    filterVal.map(j => {
      return v[j]
    })
  )
}
/**
  * 将json导出为excel或csv
  * @param {Array} tableJson 导出数据
  * @param {string} filenames 导出表的名字
  * @param {boolean} autowidth 表格宽度自动
  * @param {string} bookTypes xlsx & csv & txt
  * @example
  * import { json2excel } from "@ccpow/devopslib/packages/utils/excel";
  * const excelDatas = []
  * excelDatas.push({
  *   tHeader: [
  *     '登记人',
  *     '归属部门'
  *   ],
  *   filterVal: [
  *     'author',
  *     'department'
  *   ],
  *   tableDatas: [{
  *     author: 'liufang',
  *     department: '部门来了部门来了'
  *   }],
  *   sheetName: '工时审计'
  * })
  * json2excel(excelDatas, '工时审计', true, 'xlsx')
  */
function json2excel(tableJson, filenames, autowidth, bookTypes, notDownload) {
  const tHeader = []
  const dataArr = []
  const sheetnames = []
  for (const i in tableJson) {
    tHeader.push(tableJson[i].tHeader)
    dataArr.push(formatJson(tableJson[i].filterVal, tableJson[i].tableDatas))
    sheetnames.push(tableJson[i].sheetName)
  }
  return export_json_to_excel({
    header: tHeader,
    data: dataArr,
    sheetname: sheetnames,
    filename: filenames,
    autoWidth: autowidth,
    bookType: bookTypes,
    notDownload
  })
}
export {
  json2excel
}

