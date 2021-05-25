module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = 'vue长列表优化'
        return args
      })
  },
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
