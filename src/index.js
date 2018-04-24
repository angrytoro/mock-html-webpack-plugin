
class MockHtml {
  constructor (options = {data: {}}) {
    this.options = options
  }

  mock (tpl, data) {
    return tpl.replace(/\${([^\${}]+)}/g, ($0, $1) => {
      return typeof data[$1] === 'object' && data[$1] ? JSON.stringify(data[$1]) : data[$1]
    })
  }

  apply (compiler) {
    compiler.plugin('compilation' , compilation => {
      compilation.plugin('html-webpack-plugin-before-html-processing', (data, cb)  => {
        data.html = this.mock(data.html, this.options.data)
        cb(null, data)
      })
    })
  }
}

export default MockHtml