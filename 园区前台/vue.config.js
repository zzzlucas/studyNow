const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    //生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@page', resolve('src/pages'))
      .set('@utils', resolve('src/utils'))
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true, // View Ui need this
      }
    },
  },
  devServer: {
    port: 3000,
    proxy: {
      '/jeecg-boot': {
        // target: 'http://139.155.126.195:8080',
        target: 'http://192.168.89.31:8080',
        // target: 'http://127.0.0.1:8080',
        ws: false,
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}
