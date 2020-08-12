export default { // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
  install: function (Vue) {
    Vue.prototype.global_func = (param) => {
      alert(param)
    }
    Vue.prototype.toInt = (param) => {
      return parseInt(param)
    }
    Vue.prototype.getImg = (url) => {
      return url;
    }

    Vue.prototype.convertRes2Blob = (response) => {
      console.log(response)
      // 提取文件名
      const fileName = response.headers['content-disposition'].match(
        /filename=[\'|\"](.*)[\'|\"]/
      )[1]
      // 将二进制流转为blob
      const blob = new Blob([response.data], {type: 'application/octet-stream'})
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
        window.navigator.msSaveBlob(blob, decodeURI(fileName))
      } else {
        // 创建新的URL并指向File对象或者Blob对象的地址
        const blobURL = window.URL.createObjectURL(blob)
        // 创建a标签，用于跳转至下载链接
        const tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.href = blobURL
        tempLink.setAttribute('download', decodeURI(fileName))
        // 兼容：某些浏览器不支持HTML5的download属性
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank')
        }
        // 挂载a标签
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        // 释放blob URL地址
        window.URL.revokeObjectURL(blobURL)
      }
    }
  }
}
