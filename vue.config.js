module.exports = {
  configureWebpack: config => {
    config.module.rules.push({
      // 处理markdown文件
      test: /\.md$/,
      use: [
        {
          loader: 'markdown-loader'
        },
        {
          loader: 'vue-loader'
        },
        {
          loader: 'html-loader'
        }
      ]
    }
    )
  }
}
