/**
 * @module file
 */
import SparkMd5 from 'spark-md5'
import { saveAs } from 'file-saver'
import streamSaver from 'streamsaver'

// 将base64转换为文件
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
/**
 * 从图片转到base64
 * @async
 * @param {string} img 图片url
 * @returns {string} 图片base64
 */
function getDateURLfromImgUrl(img) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = img
    image.setAttribute('crossOrigin', 'Anonymous')
    image.onload = function() {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, image.width, image.height)
      const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()
      const dataURL = canvas.toDataURL('image/' + ext)
      resolve(dataURL)
    }
  })
}

/**
 * 通过文件内容生成md5值
 * @async
 * @param {*} file 文件内容File对象实例
 * @returns 文件内容的md5值
 */
function generateMd5fromFile(file) {
  return new Promise((resolve, reject) => {
    const sliceLength = 10
    const chunkSize = Math.ceil(file.size / sliceLength)
    const fileReader = new FileReader()
    const md5 = new SparkMd5()
    let index = 0
    const loadFile = () => {
      const slice = file.slice(index, index + chunkSize)
      fileReader.readAsBinaryString(slice)
    }
    loadFile()
    fileReader.onload = e => {
      md5.appendBinary(e.target.result)
      if (index < file.size) {
        index += chunkSize
        loadFile()
      } else {
        const sqlexecmd5 = md5.end()
        resolve(sqlexecmd5)
      }
    }
  })
}

/**
 * 通过streamSaver,下载文件时，点击下载后，即时显示下载进度条
 * @function
 * @param {string} data 下载文件的地址
 * @param {string} fileName 下载后显示的文件名
 */
const downloadFromUrl = (data, filename) => {
  return fetch(data, {
    method: 'GET'
  }).then(res => {
    // 创建写入流 filename为下载的文件名
    const fileStream = streamSaver.createWriteStream(filename, {
      size: res.headers.get('content-length')
    })
    const readableStream = res.body
    if (window.WritableStream && readableStream.pipeTo) {
      return readableStream.pipeTo(fileStream).then(() => {

      })
    }
    const writer = fileStream.getWriter()
    const reader = res.body.getReader()
    const pump = () => reader.read().then(res => res.done
      ? writer.close() : writer.write(res.value).then(pump))
    pump()
  })
}

export {
  dataURLtoFile,
  generateMd5fromFile,
  getDateURLfromImgUrl,
  downloadFromUrl,
  streamSaver,
  /**
   * 保存文件，封装file-saver的saveAs
   * @function
   * @see {@link https://www.npmjs.com/package/file-saver#syntax|file-saver文档}
   */
  saveAs
}
