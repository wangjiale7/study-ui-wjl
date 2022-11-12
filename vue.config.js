module.exports = {
  outputDir: 'lib',
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 公用scss
          resources: './src/styles/_global.scss',
        })
        .end()
    })
  },
}
