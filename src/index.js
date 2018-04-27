
const TYPE = {
  freemarker: /\${([^\${}]+)}/g,
  velocity: /\$!?{([^\$!{}]+)}/g,
  mustache: /{{([^{}]+)}}/g,
  smarty: /{([^{}]+)}/g,
  jsp: /<%\=\s+([^<%\=>])%>/g
}

class MockHtml {
  constructor (options = {data: {}}) {
    this.options = options
  }

  mock (tpl, data) {
    return tpl.replace(TYPE[this.options.type] || this.options.test || TYPE.freemarker, ($0, $1) => {
      return typeof data[$1] === 'object' && data[$1] ? JSON.stringify(data[$1]) : data[$1]
    })
  }

  apply (compiler) {
    compiler.plugin('compilation' , compilation => {
      compilation.plugin('html-webpack-plugin-before-html-processing', (data, cb)  => {
        if (!this.options.template || this.options.template === data.outputName) {
          data.html = this.mock(data.html, this.options.data)
        }
        cb(null, data)
      })
    })
  }
}

export default MockHtml