const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = () => ({
  configureWebpack: config => {
    if (process.env.ENV === 'analyze') {
      // 打包分析插件
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerHost: 'localhost',
          analyzerPort: '8182'
        })
      )
    }
  },
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      // 拆包，减少首次加载vendor文件的大小，减少首屏事件
      // npm run analyze 可以查看打包情况
      config.optimization.splitChunks({
        // 如果是initial，仅针对初始化需要用到的代码进行切割，此时的模块都会被打包到app.js中，node_modules则是chunk-vendor.js。非首页的公共包不会被抽取
        // 如果是async，node_modules将会被打包到app.js，并且如果初始化用到的都被打包到app.js中，非初始化需要用到的文件，只要满足minSize就会被抽取出来
        // 如果是all，只需要满足minSize就会被抽取出来
        chunks: 'all',
        minSize: 10000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 5,
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 30,
        name: true,
        cacheGroups: {
          // 将体积较大的包单独分离出来，减少vendor的体积，加快首屏速度
          vendors: {
            name: 'chunk-vendors', // enforce默认为false下不能直接设置name值，否则打包会失败
            test: /[\\/]node_modules[\\/]/,
            priority: -10, // 表示缓存的优先级；
            enforce: true
          }
        }
      })
    })
  }
})
